#!/usr/bin/env bash
# Poll cloudflared log → update .env + restart bridge once URL is registered.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG="${1:-$DIR/.cloudflared/quick-logs/setup.log}"
CF_DIR="$DIR/.cloudflared"
URL_FILE="$CF_DIR/quick-tunnel.urls"
DONE="$CF_DIR/quick-url-applied"

upsert_env() {
  local key="$1" val="$2" env_file="$DIR/.env"
  [[ -f "$env_file" ]] || cp "$DIR/.env.example" "$env_file"
  if grep -q "^${key}=" "$env_file" 2>/dev/null; then
    sed -i.bak "s|^${key}=.*|${key}=${val}|" "$env_file" && rm -f "$env_file.bak"
  else
    echo "${key}=${val}" >>"$env_file"
  fi
}

deadline=$((SECONDS + 120))
while (( SECONDS < deadline )); do
  if grep -q "Registered tunnel connection" "$LOG" 2>/dev/null; then
    url="$(grep -oE 'https://[a-zA-Z0-9.-]+\.trycloudflare\.com' "$LOG" 2>/dev/null | head -1 || true)"
    if [[ -n "$url" && ! -f "$DONE" ]] || [[ -f "$DONE" && "$(cat "$DONE" 2>/dev/null)" != "$url" ]]; then
      cat >"$URL_FILE" <<EOF
PEER_PUBLIC_SETUP_URL=${url}
PEER_PUBLIC_PEER_URL=${url}
EOF
      upsert_env PEER_PUBLIC_SETUP_URL "$url"
      upsert_env PEER_PUBLIC_PEER_URL "$url"
      echo "$url" >"$DONE"
      PEER_FORCE_RESTART=1 bash "$DIR/scripts/start-background.sh" >/dev/null 2>&1 || true
      echo ""
      echo "✅ Tunnel URL → .env: ${url}"
      echo "   รัน terminal อื่น: make peer-url"
      echo ""
    fi
  fi
  sleep 2
done
