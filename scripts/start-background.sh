#!/usr/bin/env bash
# Start peer bridge in background; wait until setup server responds.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

if [[ -f .env ]]; then set -a; source .env; set +a; fi

if [[ "${PEER_PAIRING_MODE:-}" == "guest" ]]; then
  bash "$DIR/scripts/peer-maybe-sync-guest.sh" --guest
else
  bash "$DIR/scripts/peer-maybe-sync-guest.sh"
fi

SETUP_PORT="${PEER_SETUP_PORT:-3848}"
PIDFILE="$DIR/.peer-bridge.pid"
LOG="$DIR/.peer-bridge.log"

if [[ -f "$PIDFILE" ]]; then
  pid="$(cat "$PIDFILE")"
  if kill -0 "$pid" 2>/dev/null; then
    if [[ "${PEER_FORCE_RESTART:-}" == "1" ]]; then
      echo "Restarting bridge (was pid $pid)…"
      kill "$pid" 2>/dev/null || true
      sleep 1
    else
      echo "Bridge already running (pid $pid)"
      exit 0
    fi
  fi
  rm -f "$PIDFILE"
fi

nohup npm start >>"$LOG" 2>&1 &
echo "$!" >"$PIDFILE"
echo "Starting bridge (pid $!) — log: $LOG"

if ! bash "$DIR/scripts/wait-setup-ready.sh"; then
  echo "WARN: setup server not up yet — check $LOG" >&2
  exit 1
fi
