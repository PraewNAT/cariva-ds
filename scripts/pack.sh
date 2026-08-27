#!/usr/bin/env bash
# สร้าง agent-peer-bridge.zip ส่งให้เครื่องอื่น (ไม่ต้องทั้ง Agent hub)
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${1:-$DIR/../../dist/agent-peer-bridge.zip}"

mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"

cd "$DIR"
zip -r "$OUT" . \
  -x "node_modules/*" \
  -x ".env" \
  -x ".peer-bridge-health.json" \
  -x ".peer-bridge.log" \
  -x ".peer-bridge.pid" \
  -x ".cache/*" \
  -x "*.zip" \
  -x ".DS_Store"

echo "Created: $OUT"
echo "Size: $(du -h "$OUT" | cut -f1)"
echo ""
echo "ส่งไฟล์นี้ให้อีกเครื่อง → แตกแล้ว:"
echo "  cd agent-peer-bridge && make install && make setup-ui   # หรือ make wizard"
echo ""
echo "หรือ Guest curl จาก Host (Host ต้อง make start ก่อน):"
echo "  curl -fsSL http://<HOST_IP>:3848/install.sh | bash"
