#!/usr/bin/env bash
set -euo pipefail

# Usage: ./apply.sh /path/to/admin-dashboard [target-subdir]
# Default: src/ds-bridge
#
# Re-apply safe: rsync --delete replaces dest contents (no theme/theme/ nesting).

TARGET_ROOT="${1:?Usage: ./apply.sh /path/to/admin-dashboard [target-subdir]}"
TARGET_SUBDIR="${2:-src/ds-bridge}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$TARGET_ROOT/$TARGET_SUBDIR"

if [[ ! -d "$TARGET_ROOT" ]]; then
  echo "Error: target directory not found: $TARGET_ROOT" >&2
  exit 1
fi

mkdir -p "$DEST"

rsync -a --delete \
  --exclude='apply.sh' \
  --exclude='README.md' \
  "$SCRIPT_DIR/" "$DEST/"

cp "$SCRIPT_DIR/README.md" "$DEST/INTEGRATION-README.md"

echo "✓ Bridge package synced to: $DEST"
echo ""
echo "Next steps:"
echo "  1. Read $DEST/BRIDGE.md and muiTheme.patch-guide.md"
echo "  2. Merge buildAdminThemePatch() into src/muiTheme/muiTheme.ts"
echo "  3. bun run lint && bun run build && bun run test"
echo "  4. bun run test:update  # if theme overrides changed"
