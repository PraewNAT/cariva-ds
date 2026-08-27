#!/usr/bin/env bash
# Run lint+build on showcase and POST verify_result to peer bridge.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=resolve-showcase.sh
source "$DIR/scripts/resolve-showcase.sh"

if [[ -f "$DIR/.env" ]]; then set -a; source "$DIR/.env"; set +a; fi

SHOWCASE="$(resolve_showcase_path)"
PEER_PORT="${PEER_PORT:-3847}"
SESSION="${SESSION:-default}"

STATUS="pass"
DETAIL=""
cd "$SHOWCASE"

if [[ ! -d node_modules ]]; then
  npm install
fi

if ! npm run lint 2>&1 | tee /tmp/peer-verify-lint.log; then
  STATUS="fail"
  DETAIL="${DETAIL}lint failed; "
fi

if ! npm run build 2>&1 | tee /tmp/peer-verify-build.log; then
  STATUS="fail"
  DETAIL="${DETAIL}build failed; "
fi

[[ -z "$DETAIL" ]] && DETAIL="lint and build passed"

TOKEN="${PEER_SHARED_TOKEN:-}"
AUTH=()
[[ -n "$TOKEN" ]] && AUTH=(-H "Authorization: Bearer $TOKEN")

BODY=$(python3 -c "
import json
checks = []
status = '$STATUS'
if status == 'pass':
  checks = ['lint_pass', 'typescript_pass']
print(json.dumps({
  'sessionId': '$SESSION',
  'from': {'role': '${PEER_ROLE:-developer}', 'host': 'local'},
  'type': 'verify_result',
  'payload': {
    'status': status,
    'detail': '''$DETAIL''',
    'showcasePath': '$SHOWCASE',
    'checks': checks,
  },
}))
")

curl -sf -X POST "http://127.0.0.1:$PEER_PORT/v1/sessions/$SESSION/messages" \
  -H "Content-Type: application/json" \
  "${AUTH[@]}" \
  -d "$BODY"

echo ""
echo "[verify] status=$STATUS — $DETAIL"
[[ "$STATUS" == "pass" ]] || exit 1
