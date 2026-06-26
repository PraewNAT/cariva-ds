#!/usr/bin/env bash
# Start bridge + open setup UI (web wizard). Used by curl install and make setup-ui.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

GUEST_MODE=0
FOREGROUND=0
for arg in "$@"; do
  [[ "$arg" == "--guest" ]] && GUEST_MODE=1
  [[ "$arg" == "--foreground" ]] && FOREGROUND=1
done

[[ -f .env ]] || cp .env.example .env
if [[ -f .env ]]; then set -a; source .env; set +a; fi
[[ "$GUEST_MODE" == "1" ]] || [[ "${PEER_PAIRING_MODE:-}" == "guest" ]] && GUEST_MODE=1

SETUP_PORT="${PEER_SETUP_PORT:-3848}"
SETUP_URL="http://127.0.0.1:${SETUP_PORT}/setup"
[[ "$GUEST_MODE" == "1" ]] && SETUP_URL="${SETUP_URL}?guest=1"

if [[ "$FOREGROUND" == "1" ]]; then
  fg_args=()
  [[ "$GUEST_MODE" == "1" ]] && fg_args+=(--guest)
  exec bash "$DIR/scripts/start-foreground.sh" "${fg_args[@]}"
fi

if ! bash "$DIR/scripts/start-background.sh"; then
  echo ""
  echo "⚠️  เปิด bridge ไม่สำเร็จ — ลองรัน: make start"
  echo "    แล้วเปิด browser: ${SETUP_URL}"
  exit 1
fi

bash "$DIR/scripts/wait-setup-ready.sh" || true

for _ in 1 2 3; do
  if bash "$DIR/scripts/open-browser.sh" "$SETUP_URL"; then
    break
  fi
  sleep 1
done

echo ""
if [[ "$GUEST_MODE" == "1" ]]; then
  echo "✓ เปิดหน้าตั้งค่าแล้ว — ใส่รหัส 6 หลักจาก Host ในขั้น 3"
else
  echo "✓ เปิดหน้าตั้งค่าแล้ว — หรือใช้ make wizard ใน terminal ก็ได้"
fi
echo "  ${SETUP_URL}"
