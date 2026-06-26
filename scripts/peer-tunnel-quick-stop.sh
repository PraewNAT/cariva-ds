#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CF_DIR="$DIR/.cloudflared"

stop_one() {
  local pidfile="$1"
  [[ -f "$pidfile" ]] || return 0
  local pid
  pid="$(cat "$pidfile")"
  if kill -0 "$pid" 2>/dev/null; then
    echo "Stopping cloudflared pid $pid…"
    kill "$pid" 2>/dev/null || true
  fi
  rm -f "$pidfile"
}

stop_one "$CF_DIR/quick-setup.pid"
stop_one "$CF_DIR/quick-peer.pid"
echo "Quick tunnels stopped."
