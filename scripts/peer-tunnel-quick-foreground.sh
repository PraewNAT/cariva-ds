#!/usr/bin/env bash
# Run quick tunnel in foreground — keep this terminal open (most reliable).
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

if [[ -f .env ]]; then set -a; source .env; set +a; fi

SETUP_PORT="${PEER_SETUP_PORT:-3848}"

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "Install: brew install cloudflared" >&2
  exit 1
fi

if ! curl -sf --max-time 2 "http://127.0.0.1:${SETUP_PORT}/api/detect" >/dev/null; then
  echo "Run make peer-start first" >&2
  exit 1
fi

echo "Quick tunnel (foreground) → http://127.0.0.1:${SETUP_PORT}"
echo "URL จะถูกบันทึกใน .env อัตโนมัติ — terminal อื่นรัน: make peer-url"
echo "Ctrl+C เพื่อหยุด tunnel"
echo ""

LOG_DIR="$DIR/.cloudflared/quick-logs"
mkdir -p "$LOG_DIR"
SETUP_LOG="$LOG_DIR/setup.log"
: >"$SETUP_LOG"
bash "$DIR/scripts/peer-tunnel-url-watcher.sh" "$SETUP_LOG" &
WATCHER_PID=$!

cleanup() {
  kill "$WATCHER_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

exec cloudflared tunnel --no-autoupdate --url "http://127.0.0.1:${SETUP_PORT}" 2>&1 | tee -a "$SETUP_LOG"
