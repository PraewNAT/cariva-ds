#!/usr/bin/env bash
# Pair test: ping → handshake on default session
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

if [[ -f .env ]]; then set -a; source .env; set +a; fi

PEER_PORT="${PEER_PORT:-3847}"
TOKEN="${PEER_SHARED_TOKEN:-}"
LOCAL="http://127.0.0.1:$PEER_PORT"

auth() {
  if [[ -n "$TOKEN" ]]; then echo "Authorization: Bearer $TOKEN"; fi
}

echo "[pair-test] local health..."
curl -sf --max-time 5 "$LOCAL/health" >/dev/null

if [[ -n "${PEER_HOST:-}" ]]; then
  REMOTE="http://${PEER_HOST%/}"
  [[ "$REMOTE" == http://* ]] || REMOTE="http://$PEER_HOST"
  echo "[pair-test] remote health $REMOTE..."
  curl -sf --max-time 8 -H "$(auth)" "$REMOTE/health" >/dev/null

  echo "[pair-test] ping remote..."
  curl -sf --max-time 8 -X POST -H "Content-Type: application/json" -H "$(auth)" \
    -d '{"id":"'"$(uuidgen 2>/dev/null || echo test)"'","sessionId":"pair-test","from":{"role":"test","host":"local"},"type":"ping","payload":{},"createdAt":"'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'"}' \
    "$REMOTE/v1/sessions/pair-test/messages" >/dev/null
fi

echo "[pair-test] handshake local..."
curl -sf --max-time 8 -X POST -H "Content-Type: application/json" -H "$(auth)" \
  -d '{"sessionId":"default","type":"handshake","from":{"role":"'"${PEER_ROLE:-developer}"'","host":"local"},"payload":{"test":true}}' \
  "$LOCAL/v1/sessions/default/messages" 2>/dev/null || \
curl -sf --max-time 8 -X POST -H "Content-Type: application/json" -H "$(auth)" \
  -d '{"id":"hs1","sessionId":"default","from":{"role":"'"${PEER_ROLE:-developer}"'","host":"local"},"type":"handshake","payload":{}}' \
  "$LOCAL/v1/sessions/default/messages" >/dev/null

echo "[pair-test] OK"
exit 0
