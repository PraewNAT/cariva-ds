#!/usr/bin/env bash
# Start bridge in foreground; open setup UI once server is ready.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

GUEST_MODE=0
for arg in "$@"; do
  [[ "$arg" == "--guest" ]] && GUEST_MODE=1
done

[[ -f .env ]] || cp .env.example .env
if [[ -f .env ]]; then set -a; source .env; set +a; fi
[[ "$GUEST_MODE" == "1" ]] || [[ "${PEER_PAIRING_MODE:-}" == "guest" ]] && GUEST_MODE=1

SETUP_PORT="${PEER_SETUP_PORT:-3848}"
SETUP_URL="http://127.0.0.1:${SETUP_PORT}/setup"
[[ "$GUEST_MODE" == "1" ]] && SETUP_URL="${SETUP_URL}?guest=1"
OPEN_BROWSER="${PEER_OPEN_BROWSER:-1}"
PIDFILE="$DIR/.peer-bridge.pid"
LOG="$DIR/.peer-bridge.log"

maybe_open_browser() {
  [[ "$OPEN_BROWSER" == "0" ]] && return 0
  bash "$DIR/scripts/open-browser.sh" "$SETUP_URL"
}

stop_background_bridge() {
  [[ -f "$PIDFILE" ]] || return 0
  local pid
  pid="$(cat "$PIDFILE")"
  if kill -0 "$pid" 2>/dev/null; then
    echo "Stopping background bridge (pid $pid)…"
    kill "$pid" 2>/dev/null || true
    sleep 1
  fi
  rm -f "$PIDFILE"
}

stop_background_bridge

if [[ "$GUEST_MODE" == "1" ]]; then
  bash "$DIR/scripts/peer-maybe-sync-guest.sh" --guest
else
  bash "$DIR/scripts/peer-maybe-sync-guest.sh"
fi

if [[ -f "$PIDFILE" ]]; then
  pid="$(cat "$PIDFILE")"
  if kill -0 "$pid" 2>/dev/null; then
    echo "Bridge already running (pid $pid)"
    maybe_open_browser
    echo "Logs: tail -f $LOG"
    exit 0
  fi
  rm -f "$PIDFILE"
fi

cleanup() {
  kill "$BRIDGE_PID" 2>/dev/null || true
}
trap cleanup INT TERM

npm start &
BRIDGE_PID=$!

if [[ "$OPEN_BROWSER" != "0" ]]; then
  (
    bash "$DIR/scripts/wait-setup-ready.sh" || true
    maybe_open_browser
  ) &
fi

if [[ "$GUEST_MODE" == "1" ]]; then
  echo "✓ Guest — ใส่รหัส 6 หลักจาก Host ในขั้น 3"
else
  echo "✓ Bridge รันอยู่ — หรือใช้ make wizard ใน terminal ก็ได้"
fi
echo "  ${SETUP_URL}"
echo "  (Ctrl+C หยุด bridge · เปิดใหม่: make setup-ui)"

wait "$BRIDGE_PID"
