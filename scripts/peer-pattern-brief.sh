#!/usr/bin/env bash
# Build pattern_brief from showcase theme files and POST to peer bridge.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=resolve-showcase.sh
source "$DIR/scripts/resolve-showcase.sh"

if [[ -f "$DIR/.env" ]]; then set -a; source "$DIR/.env"; set +a; fi

SHOWCASE="$(resolve_showcase_path)"
PEER_PORT="${PEER_PORT:-3847}"
SESSION="${SESSION:-default}"

THEME="$SHOWCASE/src/muiTheme/muiTheme.ts"
if [[ ! -f "$THEME" ]]; then
  echo "Theme not found: $THEME" >&2
  exit 1
fi

BRIEF=$(cat <<EOF
## Pattern brief — MUI showcase

**Path:** $SHOWCASE
**Theme entry:** src/muiTheme/muiTheme.ts
**Convention:** theme-first + styled(); custom palette keys (textColor, primaryStates, backgroundColor)

### Palette keys (preserve)
- primaryStates (hover, selected, focus, focusVisible)
- backgroundColor (main, white, overlay)
- textColor.black / textColor.white
- icon

### Typography variants (preserve naming)
- headlineMedium, titleLarge, bodyMedium

### Component overrides expected
- MuiButton (radius 32)
- MuiTextField (radius 8)
- MuiPaper, DataGrid via theme

### Theme source
\`\`\`typescript
$(head -n 80 "$THEME")
\`\`\`

### Integration
Use Option A bridge — merge with createTheme(existing, patch). Do not rename typography variants.
EOF
)

TOKEN="${PEER_SHARED_TOKEN:-}"
AUTH=()
[[ -n "$TOKEN" ]] && AUTH=(-H "Authorization: Bearer $TOKEN")

BODY=$(python3 -c "
import json, sys
brief = sys.stdin.read()
print(json.dumps({
  'id': 'pb-' + __import__('uuid').uuid4().hex[:8],
  'sessionId': '$SESSION',
  'from': {'role': '${PEER_ROLE:-developer}', 'host': 'local'},
  'type': 'pattern_brief',
  'payload': {'text': brief, 'showcasePath': '$SHOWCASE'},
  'createdAt': __import__('datetime').datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
}))
" <<< "$BRIEF")

curl -sf -X POST "http://127.0.0.1:$PEER_PORT/v1/sessions/$SESSION/messages" \
  -H "Content-Type: application/json" \
  "${AUTH[@]}" \
  -d "$BODY"

echo ""
echo "[pattern-brief] posted to session $SESSION"
