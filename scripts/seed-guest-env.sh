#!/usr/bin/env bash
# Seed .env for remote (Guest) install — web setup fills the rest.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SETUP_HINT="${1:-}"
PEER_URL="${2:-}"
ENV="$DIR/.env"
EXAMPLE="$DIR/.env.example"

[[ -f "$ENV" ]] || cp "$EXAMPLE" "$ENV"

upsert() {
  local key="$1" val="$2"
  if grep -q "^${key}=" "$ENV" 2>/dev/null; then
    sed -i.bak "s|^${key}=.*|${key}=${val}|" "$ENV" && rm -f "$ENV.bak"
  else
    echo "${key}=${val}" >>"$ENV"
  fi
}

upsert PEER_ROLE designer
upsert PEER_PAIRING_MODE guest
upsert AGENT_PRODUCT cursor
upsert AGENT_MODE sdk
[[ -n "$SETUP_HINT" ]] && upsert PEER_SETUP_HINT_HOST "$SETUP_HINT"
