#!/usr/bin/env bash
# One-time: create .cloudflared/ from template (edit hostnames before tunnel route dns).
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mkdir -p "$DIR/.cloudflared"
DEST="$DIR/.cloudflared/config.yml"
if [[ -f "$DEST" ]]; then
  echo "Already exists: $DEST"
  exit 0
fi
cp "$DIR/scripts/cloudflared-config.template.yml" "$DEST"
echo "Created $DEST"
echo "Edit hostnames, then:"
echo "  cloudflared tunnel create peer-bridge"
echo "  cloudflared tunnel route dns peer-bridge peer-setup.YOUR_DOMAIN"
echo "  cloudflared tunnel route dns peer-bridge peer-api.YOUR_DOMAIN"
echo "Set PEER_PUBLIC_SETUP_URL / PEER_PUBLIC_PEER_URL in .env"
