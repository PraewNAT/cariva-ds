#!/usr/bin/env bash
set -euo pipefail

# Usage: ./apply.sh /path/to/next-app [target-subdir]
# Default target: src/ds

TARGET_ROOT="${1:?Usage: ./apply.sh /path/to/next-app [target-subdir]}"
TARGET_SUBDIR="${2:-src/ds}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$TARGET_ROOT/$TARGET_SUBDIR"

if [[ ! -d "$TARGET_ROOT" ]]; then
  echo "Error: target directory not found: $TARGET_ROOT" >&2
  exit 1
fi

mkdir -p "$(dirname "$DEST")"
rsync -a --delete "$SCRIPT_DIR/ds/" "$DEST/"

echo "✓ Cariva DS copied to: $DEST"
echo ""
echo "Next steps:"
echo "  1. Install peer deps (@mui/material, @emotion/*, @fontsource/ibm-plex-sans-thai)"
echo "  2. Add tsconfig paths: @/ds → ./$TARGET_SUBDIR"
echo "  3. Wrap app with ThemeProvider + carivaTheme (see README.md)"
echo "  4. Run typecheck / lint"
