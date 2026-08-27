#!/usr/bin/env bash
# Print Guest install curl URL + copy-paste message for Host to send.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

if [[ -f .env ]]; then set -a; source .env; set +a; fi

# Quick tunnel URLs (make tunnel-quick) — used when .env not set yet
if [[ -f "$DIR/.cloudflared/quick-tunnel.urls" ]]; then
  # shellcheck disable=SC1091
  source "$DIR/.cloudflared/quick-tunnel.urls"
fi

SETUP_PORT="${PEER_SETUP_PORT:-3848}"
PEER_PORT="${PEER_PORT:-3847}"
JSON="${JSON:-0}"

detect_ip() {
  if command -v tailscale >/dev/null 2>&1; then
    local ts
    ts="$(tailscale ip -4 2>/dev/null | head -1 | tr -d '[:space:]')"
    if [[ -n "$ts" ]]; then
      echo "$ts"
      return
    fi
  fi
  if command -v ipconfig >/dev/null 2>&1; then
    ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true
  fi
}

HOST_IP="${PEER_GUEST_HOST:-$(detect_ip)}"
if [[ -z "$HOST_IP" ]]; then
  HOST_IP="127.0.0.1"
  WARN_IP=1
else
  WARN_IP=0
fi

if [[ -n "${PEER_PUBLIC_SETUP_URL:-}" ]]; then
  SETUP_BASE="${PEER_PUBLIC_SETUP_URL%/}"
  TUNNEL_MODE=1
else
  SETUP_BASE="http://${HOST_IP}:${SETUP_PORT}"
  TUNNEL_MODE=0
fi

if [[ -n "${PEER_PUBLIC_PEER_URL:-}" ]]; then
  PEER_JOIN_HOST="${PEER_PUBLIC_PEER_URL%/}"
elif [[ -n "${PEER_PUBLIC_SETUP_URL:-}" ]]; then
  PEER_JOIN_HOST="${PEER_PUBLIC_SETUP_URL%/}"
else
  PEER_JOIN_HOST="${HOST_IP}"
fi

INSTALL_URL="${SETUP_BASE}/install.sh"
PACK_URL="${SETUP_BASE}/pack.zip"
SETUP_URL="${SETUP_BASE}/setup"
LOCAL_SETUP="http://127.0.0.1:${SETUP_PORT}/setup"
if [[ "$SETUP_BASE" == "$PEER_JOIN_HOST" ]]; then
  CURL_CMD="curl -fsSL ${INSTALL_URL} | bash -s -- ${SETUP_BASE}"
else
  CURL_CMD="curl -fsSL ${INSTALL_URL} | bash -s -- ${SETUP_BASE} ${PEER_JOIN_HOST}"
fi

server_up=0
if curl -sf --max-time 2 "http://127.0.0.1:${SETUP_PORT}/api/detect" >/dev/null 2>&1; then
  server_up=1
fi

peer_up=0
if curl -sf --max-time 2 "http://127.0.0.1:${PEER_PORT}/health" >/dev/null 2>&1; then
  peer_up=1
fi

tunnel_alive=0
if [[ "$TUNNEL_MODE" == "1" ]]; then
  if curl -sf --max-time 8 "${SETUP_BASE}/api/detect" >/dev/null 2>&1; then
    tunnel_alive=1
  fi
fi

PAIR_CODE=""
if [[ "$server_up" == "1" ]]; then
  PAIR_BODY="$(curl -sf -X POST "http://127.0.0.1:${SETUP_PORT}/api/pairing/create" \
    -H "Content-Type: application/json" \
    -d "{\"role\":\"${PEER_ROLE:-developer}\",\"product\":\"${AGENT_PRODUCT:-cursor}\",\"mode\":\"${AGENT_MODE:-sdk}\",\"token\":\"1\"}" 2>/dev/null || true)"
  if [[ -n "$PAIR_BODY" ]]; then
    PAIR_CODE="$(python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('code',''))" <<<"$PAIR_BODY" 2>/dev/null || true)"
  fi
fi

if [[ "$JSON" == "1" ]]; then
  python3 -c "
import json
print(json.dumps({
  'hostIp': '$HOST_IP',
  'tunnelMode': $TUNNEL_MODE == 1,
  'publicSetupUrl': '${PEER_PUBLIC_SETUP_URL:-}',
  'publicPeerUrl': '${PEER_PUBLIC_PEER_URL:-}',
  'installUrl': '$INSTALL_URL',
  'packUrl': '$PACK_URL',
  'setupUrl': '$SETUP_URL',
  'peerJoinHost': '$PEER_JOIN_HOST',
  'curlCommand': '$CURL_CMD',
  'pairingCode': '$PAIR_CODE' or None,
  'serverUp': $server_up == 1,
  'peerUp': $peer_up == 1,
  'warnIp': $WARN_IP == 1,
}, indent=2))
"
  exit 0
fi

echo "Agent Peer Bridge — Guest URLs (Host)"
echo "══════════════════════════════════════"
if [[ "$TUNNEL_MODE" == "1" ]]; then
  echo "Cloudflare Tunnel: setup + install via public URL"
  if [[ "$tunnel_alive" != "1" ]]; then
    echo "❌ Tunnel URL ไม่ตอบ — รัน: make peer-tunnel-quick (หรือ make peer-tunnel-quick-stop แล้วรันใหม่)"
  else
    echo "✅ Tunnel ตอบสนอง"
  fi
else
  [[ "$WARN_IP" == "1" ]] && echo "⚠️  ไม่พบ Tailscale IP — ใส่เอง: PEER_GUEST_HOST=100.x.x.x make guest-url"
fi
echo ""
echo "Setup base:  ${SETUP_BASE}"
[[ -n "${PEER_PUBLIC_PEER_URL:-}" ]] && echo "Peer API:    ${PEER_PUBLIC_PEER_URL}"
[[ "$TUNNEL_MODE" != "1" ]] && echo "Host IP:     ${HOST_IP}"
echo "Server:      $([[ $server_up == 1 ]] && echo '✅ running' || echo '❌ not running — run: make peer-start')"
echo "Peer API:    $([[ $peer_up == 1 ]] && echo '✅ :'${PEER_PORT} || echo '❌ :'${PEER_PORT})"
echo ""
echo "── Guest ติดตั้ง (curl) ──"
echo "${CURL_CMD}"
echo ""
echo "── URLs ──"
echo "install.sh:  ${INSTALL_URL}"
echo "pack.zip:    ${PACK_URL}"
echo "setup (Host): ${LOCAL_SETUP}"
echo ""
if [[ -n "$PAIR_CODE" ]]; then
  echo "── Pairing code (ใหม่) ──"
  echo "รหัส: ${PAIR_CODE}"
  echo ""
fi
echo "── ส่งให้ Guest (copy-paste) ──"
cat <<EOF
ติดตั้ง + รัน Guest (บรรทัดเดียว — เปิด terminal ทิ้งไว้):

   ${CURL_CMD}

เมื่อ browser เปิด → ขั้น 3 ใส่รหัส 6 หลักจาก Host:
   Host URL: ${PEER_JOIN_HOST}
   รหัส: ${PAIR_CODE:-<ขอจาก Host>}

ปิด terminal / Ctrl+C = หยุด bridge + tunnel ทั้งหมด
EOF
echo ""
if [[ "$TUNNEL_MODE" == "1" ]]; then
  echo "Host: make peer-tunnel-quick (ถ้า tunnel ตาย) + make peer-url"
else
  echo "Host ต้องรัน make peer-start ก่อน Guest curl"
fi
