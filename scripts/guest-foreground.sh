#!/usr/bin/env bash
# Guest one-shot: bridge + optional tunnel + browser — ปิด terminal = หยุดทั้งหมด
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

[[ -f .env ]] || cp .env.example .env
if [[ -f .env ]]; then set -a; source .env; set +a; fi

HOST_SETUP_URL="${PEER_HOST_SETUP_URL:-${PEER_SETUP_HINT_HOST:-}}"
SETUP_PORT="${PEER_SETUP_PORT:-3848}"
SETUP_URL="http://127.0.0.1:${SETUP_PORT}/setup?guest=1"
OPEN_BROWSER="${PEER_OPEN_BROWSER:-1}"
PIDFILE="$DIR/.peer-bridge.pid"
LOG_DIR="$DIR/.cloudflared/quick-logs"
SETUP_LOG="$LOG_DIR/setup.log"

BRIDGE_PID=""
CF_PID=""
BROWSER_PID=""
CLEANED=0

stop_background_bridge() {
  [[ -f "$PIDFILE" ]] || return 0
  local pid
  pid="$(cat "$PIDFILE")"
  if kill -0 "$pid" 2>/dev/null; then
    kill "$pid" 2>/dev/null || true
    sleep 0.5
  fi
  rm -f "$PIDFILE"
}

cleanup() {
  [[ "$CLEANED" == "1" ]] && return 0
  CLEANED=1
  echo ""
  echo "หยุด Guest (bridge + tunnel)…"
  kill "$BROWSER_PID" "$CF_PID" "$BRIDGE_PID" 2>/dev/null || true
  wait "$BROWSER_PID" "$CF_PID" "$BRIDGE_PID" 2>/dev/null || true
  stop_background_bridge
}

trap cleanup EXIT INT TERM HUP

need_tunnel() {
  [[ "${PEER_GUEST_TUNNEL:-auto}" == "0" ]] && return 1
  [[ "${PEER_GUEST_TUNNEL:-auto}" == "1" ]] && return 0
  [[ "${HOST_SETUP_URL:-}" == *trycloudflare.com* ]] && return 0
  return 1
}

upsert_env() {
  local key="$1" val="$2" env_file="$DIR/.env"
  if grep -q "^${key}=" "$env_file" 2>/dev/null; then
    sed -i.bak "s|^${key}=.*|${key}=${val}|" "$env_file" && rm -f "$env_file.bak"
  else
    echo "${key}=${val}" >>"$env_file"
  fi
}

start_bridge() {
  if [[ -n "$BRIDGE_PID" ]] && kill -0 "$BRIDGE_PID" 2>/dev/null; then
    kill "$BRIDGE_PID" 2>/dev/null || true
    wait "$BRIDGE_PID" 2>/dev/null || true
  fi
  npm start >>"$DIR/.peer-bridge.log" 2>&1 &
  BRIDGE_PID=$!
}

wait_for_tunnel_url() {
  local deadline=$((SECONDS + 120))
  while (( SECONDS < deadline )); do
    if [[ -n "$CF_PID" ]] && ! kill -0 "$CF_PID" 2>/dev/null; then
      echo "❌ cloudflared หยุด — ดู ${SETUP_LOG}" >&2
      return 1
    fi
    if grep -q "Registered tunnel connection" "$SETUP_LOG" 2>/dev/null; then
      local url
      url="$(grep -oE 'https://[a-zA-Z0-9.-]+\.trycloudflare\.com' "$SETUP_LOG" 2>/dev/null | head -1 || true)"
      if [[ -n "$url" ]]; then
        echo "$url"
        return 0
      fi
    fi
    sleep 1
  done
  echo "❌ รอ tunnel URL เกินเวลา — ดู ${SETUP_LOG}" >&2
  return 1
}

bash "$DIR/scripts/peer-maybe-sync-guest.sh" --guest
stop_background_bridge
start_bridge

if ! bash "$DIR/scripts/wait-setup-ready.sh"; then
  echo "❌ bridge ไม่ขึ้น — ดู $DIR/.peer-bridge.log" >&2
  exit 1
fi

if need_tunnel; then
  if ! command -v cloudflared >/dev/null 2>&1; then
    echo "❌ Host ใช้ Cloudflare tunnel — Guest ต้องติดตั้ง cloudflared ก่อน:"
    echo "   brew install cloudflared"
    exit 1
  fi
  mkdir -p "$LOG_DIR"
  : >"$SETUP_LOG"
  echo "▶ เปิด Guest tunnel…"
  cloudflared tunnel --no-autoupdate --url "http://127.0.0.1:${SETUP_PORT}" >>"$SETUP_LOG" 2>&1 &
  CF_PID=$!
  TUNNEL_URL="$(wait_for_tunnel_url)"
  upsert_env PEER_GUEST_PUBLIC_URL "$TUNNEL_URL"
  echo "✓ Guest tunnel: ${TUNNEL_URL}"
  echo "  (Host จะใช้ URL นี้เชื่อมกลับหลัง pair)"
  set -a; source .env; set +a
  start_bridge
  bash "$DIR/scripts/wait-setup-ready.sh"
fi

if [[ "$OPEN_BROWSER" != "0" ]]; then
  bash "$DIR/scripts/open-browser.sh" "$SETUP_URL" &
  BROWSER_PID=$!
fi

echo ""
echo "══════════════════════════════════════"
echo "  Guest พร้อม — ใส่รหัส 6 หลักจาก Host"
echo "══════════════════════════════════════"
echo "  ${SETUP_URL}"
echo ""
echo "  เปิด terminal นี้ทิ้งไว้ตลอดที่ใช้งาน"
echo "  Ctrl+C หรือปิด terminal = หยุด bridge + tunnel ทั้งหมด"
echo ""

wait "$BRIDGE_PID"
