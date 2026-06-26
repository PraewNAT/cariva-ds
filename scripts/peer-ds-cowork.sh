#!/usr/bin/env bash
# Start DS alignment cowork: pattern_brief → design_export loop with default criteria.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=resolve-showcase.sh
source "$DIR/scripts/resolve-showcase.sh"

if [[ -f "$DIR/.env" ]]; then set -a; source "$DIR/.env"; set +a; fi

SHOWCASE="$(resolve_showcase_path)"
PEER_PORT="${PEER_PORT:-3847}"
SESSION="${SESSION:-default}"
GOAL="${GOAL:-Align Figma MUI theme export with showcase pattern and verify lint+build}"

TOKEN="${PEER_SHARED_TOKEN:-}"
AUTH=()
[[ -n "$TOKEN" ]] && AUTH=(-H "Authorization: Bearer $TOKEN")

echo "[ds-cowork] posting pattern_brief..."
SHOWCASE="$SHOWCASE" "$DIR/scripts/peer-pattern-brief.sh"

CRITERIA='["typescript_pass","lint_pass","theme_merge_without_schema_break","components_button_textfield_tabs_table_alert"]'

BODY=$(python3 -c "
import json
print(json.dumps({
  'goal': '''$GOAL''',
  'criteria': $CRITERIA,
  'maxRounds': ${PEER_COWORK_MAX_ROUNDS:-20},
  'showcasePath': '$SHOWCASE'
}))
")

echo "[ds-cowork] starting cowork session..."
curl -sf -X POST "http://127.0.0.1:$PEER_PORT/v1/sessions/$SESSION/cowork" \
  -H "Content-Type: application/json" \
  "${AUTH[@]}" \
  -d "$BODY"

echo ""
echo "[ds-cowork] started — monitor: make peer-status"
echo "[ds-cowork] verify when ready: SHOWCASE=$SHOWCASE make peer-verify-showcase"
