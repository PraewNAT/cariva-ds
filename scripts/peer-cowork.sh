#!/usr/bin/env bash
# Start cowork loop on this machine (leader). Peer follows via inbound cowork_start.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ -f "$DIR/.env" ]]; then set -a; source "$DIR/.env"; set +a; fi

GOAL="${1:-Collaborate until success criteria met}"
PEER_PORT="${PEER_PORT:-3847}"
SESSION="${SESSION:-default}"
TOKEN="${PEER_SHARED_TOKEN:-}"

CRITERIA_JSON="${CRITERIA_JSON:-[]}"
MAX_ROUNDS="${PEER_COWORK_MAX_ROUNDS:-20}"

AUTH=()
[[ -n "$TOKEN" ]] && AUTH=(-H "Authorization: Bearer $TOKEN")

BODY=$(GOAL="$GOAL" CRITERIA_JSON="$CRITERIA_JSON" MAX_ROUNDS="$MAX_ROUNDS" python3 -c "
import json, os
criteria = json.loads(os.environ['CRITERIA_JSON'])
print(json.dumps({
  'goal': os.environ['GOAL'],
  'criteria': criteria,
  'maxRounds': int(os.environ['MAX_ROUNDS']),
}))
")

curl -sf -X POST "http://127.0.0.1:$PEER_PORT/v1/sessions/$SESSION/cowork" \
  -H "Content-Type: application/json" \
  "${AUTH[@]}" \
  -d "$BODY"

echo ""
echo "[peer-cowork] leader started — monitor: make peer-status"
