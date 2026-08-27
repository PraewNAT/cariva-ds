#!/usr/bin/env bash
# Remote install — served by Host at GET /install.sh (do not run locally)
# Guest: curl -fsSL BASE/install.sh | bash -s -- SETUP_URL [PEER_URL]
set -euo pipefail

HOST="__HOST__"
PORT="__PORT__"
INSTALL_DIR="${PEER_INSTALL_DIR:-$(pwd)}"
PEER_URL="${2:-${PEER_INSTALL_PEER_URL:-}}"

# $1 from `bash -s -- https://setup-url` — works even if Host serves unsubstituted template
BASE_URL="${1:-${PEER_INSTALL_BASE_URL:-__BASE_URL__}}"
BASE_URL="${BASE_URL%/}"

if [[ "$BASE_URL" == *__BASE_URL__* ]] || [[ -z "$BASE_URL" ]]; then
  if [[ "$HOST" != "__HOST__" && -n "$HOST" ]]; then
    if [[ "$HOST" == *trycloudflare.com ]]; then
      BASE_URL="https://${HOST%%:*}"
    else
      BASE_URL="http://${HOST}:${PORT}"
    fi
  else
    echo "❌ ไม่รู้ URL ของ Host"
    echo ""
    echo "Guest รันแบบนี้ (แทน curl | bash อย่างเดียว):"
    echo '  curl -fsSL "https://SETUP.trycloudflare.com/install.sh" | bash -s -- "https://SETUP.trycloudflare.com"'
    echo ""
    echo "หรือ Host: PEER_FORCE_RESTART=1 make peer-start แล้ว make peer-url ส่งคำสั่งใหม่"
    exit 1
  fi
fi

echo ""
echo "══════════════════════════════════════"
echo "  Agent Peer Bridge — ติดตั้งอัตโนมัติ"
echo "══════════════════════════════════════"
echo "Host: ${BASE_URL}"
echo "ติดตั้งที่: ${INSTALL_DIR}"
echo ""

HOST_VER=""
if HOST_VER="$(curl -fsSL --max-time 10 "${BASE_URL}/api/version" 2>/dev/null | node -pe "JSON.parse(require('fs').readFileSync(0,'utf8')).bridgeVersion" 2>/dev/null)"; then
  echo "เวอร์ชัน Host: v${HOST_VER}"
fi
echo ""

command -v curl >/dev/null 2>&1 || { echo "ต้องมี curl"; exit 1; }
command -v unzip >/dev/null 2>&1 || { echo "ต้องมี unzip"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "ต้องมี Node.js 20+"; exit 1; }

mkdir -p "$INSTALL_DIR"
TMP="$(mktemp -t agent-peer-bridge.XXXXXX.zip)"
trap 'rm -f "$TMP"' EXIT

echo "⏬ ดาวน์โหลดแพ็ก…"
curl -fsSL "${BASE_URL}/pack.zip" -o "$TMP"
unzip -qo "$TMP" -d "$INSTALL_DIR"

cd "$INSTALL_DIR"

REQUIRED=(
  scripts/open-setup.sh
  scripts/start-background.sh
  scripts/guest-foreground.sh
  scripts/open-browser.sh
  scripts/wait-setup-ready.sh
)
for f in "${REQUIRED[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "❌ แพ็กไม่ครบ: $f"
    echo "   Host: restart bridge (make peer-start) แล้ว Guest รัน curl ใหม่"
    exit 1
  fi
done

if [[ -d node_modules ]] && [[ -x node_modules/.bin/tsx ]]; then
  echo "✓ dependencies พร้อมแล้ว"
else
  echo "⏬ ติดตั้ง dependencies (ครั้งแรกอาจใช้ 1–2 นาที)…"
  # Guest pack ต้องมี tsx — อย่า omit dev ถ้า NODE_ENV=production
  ( unset NODE_ENV; npm install )
  if [[ ! -x node_modules/.bin/tsx ]]; then
    echo "⏬ ติดตั้ง tsx (runtime)…"
    npm install tsx@^4.19.3
  fi
fi

if [[ ! -x node_modules/.bin/tsx ]]; then
  echo "❌ ติดตั้ง tsx ไม่สำเร็จ — ลอง: cd $(pwd) && npm install"
  exit 1
fi

seed_guest_env() {
  local host_ip="$1"
  local env_file=".env"
  local example=".env.example"
  [[ -f "$env_file" ]] || cp "$example" "$env_file"
  upsert() {
    local key="$1" val="$2"
    if grep -q "^${key}=" "$env_file" 2>/dev/null; then
      sed -i.bak "s|^${key}=.*|${key}=${val}|" "$env_file" && rm -f "$env_file.bak"
    else
      echo "${key}=${val}" >>"$env_file"
    fi
  }
  upsert PEER_ROLE designer
  upsert PEER_PAIRING_MODE guest
  upsert AGENT_PRODUCT cursor
  upsert AGENT_MODE sdk
  if [[ -n "$host_ip" ]]; then
    upsert PEER_SETUP_HINT_HOST "$host_ip"
  fi
}

if [[ -f scripts/seed-guest-env.sh ]]; then
  HINT="${HOST}"
  [[ "$BASE_URL" == https://* ]] && HINT="$BASE_URL"
  bash scripts/seed-guest-env.sh "$HINT" "$PEER_URL"
else
  if [[ "$BASE_URL" == https://* ]]; then
    seed_guest_env "$BASE_URL"
  else
    seed_guest_env "${HOST}"
  fi
fi

echo ""
echo "✓ ติดตั้งเสร็จ: ${INSTALL_DIR}"
echo "▶ เริ่ม Guest (bridge + tunnel + browser)…"
echo "  เปิด terminal นี้ทิ้งไว้ — Ctrl+C หรือปิด terminal = หยุดทั้งหมด"
echo ""

export PEER_HOST_SETUP_URL="$BASE_URL"
export PEER_FORCE_RESTART=1
exec bash scripts/guest-foreground.sh
