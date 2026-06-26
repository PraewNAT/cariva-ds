#!/usr/bin/env bash
# Resolve SHOWCASE path: SHOWCASE env > PEER_SHOWCASE_WORKSPACE registry > fail.
# Source after DIR and optional .env are set.
resolve_showcase_path() {
  if [[ -n "${SHOWCASE:-}" ]]; then
    echo "$SHOWCASE"
    return 0
  fi
  local hub ws resolve
  hub="$(cd "$DIR/../.." && pwd)"
  ws="${PEER_SHOWCASE_WORKSPACE:-mui-showcase}"
  resolve="$hub/scripts/resolve-workspace-path.sh"
  if [[ ! -x "$resolve" ]]; then
    echo "FAIL: SHOWCASE not set and hub resolve script missing: $resolve" >&2
    echo "Set SHOWCASE=/path/to/mui-showcase or run from Agent hub with workspaces.local.md" >&2
    return 1
  fi
  "$resolve" "$ws"
}
