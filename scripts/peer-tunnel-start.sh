#!/usr/bin/env bash
# Run cloudflared tunnel for peer bridge (Host). Bridge must already listen on 3847/3848.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

if [[ -f .env ]]; then set -a; source .env; set +a; fi

CONFIG="${PEER_TUNNEL_CONFIG:-$DIR/.cloudflared/config.yml}"
if [[ ! -f "$CONFIG" ]]; then
  echo "Missing tunnel config: $CONFIG" >&2
  echo "Copy scripts/cloudflared-config.template.yml → .cloudflared/config.yml and edit hostnames." >&2
  exit 1
fi

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/" >&2
  exit 1
fi

SETUP_PORT="${PEER_SETUP_PORT:-3848}"
PEER_PORT="${PEER_PORT:-3847}"
if ! curl -sf --max-time 2 "http://127.0.0.1:${SETUP_PORT}/api/detect" >/dev/null; then
  echo "WARN: setup server not up on :${SETUP_PORT} — run make peer-start first" >&2
fi
if ! curl -sf --max-time 2 "http://127.0.0.1:${PEER_PORT}/health" >/dev/null; then
  echo "WARN: peer API not up on :${PEER_PORT}" >&2
fi

echo "Starting Cloudflare Tunnel ($(basename "$CONFIG"))…"
echo "  PEER_PUBLIC_SETUP_URL=${PEER_PUBLIC_SETUP_URL:-<set in .env>}"
echo "  PEER_PUBLIC_PEER_URL=${PEER_PUBLIC_PEER_URL:-<set in .env>}"
exec cloudflared tunnel --config "$CONFIG" run
