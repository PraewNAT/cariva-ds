#!/usr/bin/env bash
# Open URL in default browser (macOS / Linux / WSL).
set -euo pipefail
URL="${1:-http://127.0.0.1:3848/setup}"

opened=0
if command -v open >/dev/null 2>&1; then
  open "$URL" && opened=1
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL" >/dev/null 2>&1 && opened=1
elif command -v wslview >/dev/null 2>&1; then
  wslview "$URL" && opened=1
fi

if [[ "$opened" == "1" ]]; then
  exit 0
fi

echo ""
echo "เปิดใน browser เอง: $URL"
exit 1
