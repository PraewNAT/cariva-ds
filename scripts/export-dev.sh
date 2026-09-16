#!/usr/bin/env bash
# Rebuild export/cariva-ds-dev-export/ from code/core/ + tokens.json.
#
#   npm run export:dev     rebuild ds/, stamp README, re-zip — each only if stale
#   npm run export:check   exit 1 if ds/ or the zip is out of date — no writes
#
# The bundle is what product teams copy into their app with apply.sh. It is a
# copy, not a source: never edit export/cariva-ds-dev-export/ds/ by hand.
# It went three months stale once (2026-06-19 → 2026-09-09) because nothing
# rebuilt it.
#
# Typical flow after changing code/core: export:dev → write a dated entry in
# export/cariva-ds-dev-export/CHANGELOG.md → export:dev again (re-zips so the
# zip carries the new entry).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/code/core"
BUNDLE="$ROOT/export/cariva-ds-dev-export"
ZIP="$ROOT/export/cariva-ds-dev-export.zip"
MODE="${1:-build}"

# Keep in sync with the "ไม่รวม" list in the bundle README.
EXCLUDES=(
  --exclude='*.stories.tsx'
  --exclude='*.test.tsx'
  --exclude='*.figma.tsx'
  --exclude='*.ai.md'
  --exclude='CLAUDE.md'
  --exclude='public/'
  --exclude='.DS_Store'
)

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

rsync -a "${EXCLUDES[@]}" "$SRC/" "$TMP/stage/ds/"
cp "$ROOT/tokens.json" "$TMP/stage/ds/tokens.json"

ds_stale() { ! diff -rq -x '.DS_Store' "$TMP/stage/ds" "$BUNDLE/ds" >/dev/null 2>&1; }

zip_stale() {
  [[ -f "$ZIP" ]] || return 0
  rm -rf "$TMP/unzip" && mkdir -p "$TMP/unzip"
  unzip -q "$ZIP" -d "$TMP/unzip"
  ! diff -rq -x '.DS_Store' "$TMP/unzip/$(basename "$BUNDLE")" "$BUNDLE" >/dev/null 2>&1
}

if [[ "$MODE" == "--check" ]]; then
  status=0
  if ds_stale; then
    echo "✖ export/cariva-ds-dev-export/ds is out of date with code/core:" >&2
    diff -rq -x '.DS_Store' "$TMP/stage/ds" "$BUNDLE/ds" 2>&1 \
      | sed "s|$TMP/stage/||; s|$BUNDLE/||; s|^|  |" | head -20 >&2
    status=1
  fi
  if zip_stale; then
    echo "✖ $(basename "$ZIP") does not match the bundle folder" >&2
    status=1
  fi
  if [[ $status -ne 0 ]]; then
    echo "  Run: npm run export:dev" >&2
    exit 1
  fi
  echo "✅ export/cariva-ds-dev-export and its zip are up to date"
  exit 0
fi

if ds_stale; then
  rsync -a --delete "$TMP/stage/ds/" "$BUNDLE/ds/"
  TODAY="$(date +%Y-%m-%d)"
  sed -i.bak -E "s/^\*\*Generated:\*\* [0-9]{4}-[0-9]{2}-[0-9]{2}/**Generated:** $TODAY/" "$BUNDLE/README.md"
  rm -f "$BUNDLE/README.md.bak"
  echo "✅ Rebuilt export/cariva-ds-dev-export/ds ($TODAY)"
  echo "   Add a dated entry to export/cariva-ds-dev-export/CHANGELOG.md, then run this again to re-zip."
else
  echo "✅ export/cariva-ds-dev-export/ds is up to date with code/core"
fi

if zip_stale; then
  rm -f "$ZIP"
  (cd "$ROOT/export" && zip -rq "$(basename "$ZIP")" "$(basename "$BUNDLE")" -x '*.DS_Store')
  echo "✅ Re-zipped $(basename "$ZIP")"
fi
