#!/usr/bin/env bash
# Before bridge start: Guest auto-sync from Host when PEER_SETUP_HINT_HOST is set.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

GUEST=0
for arg in "$@"; do
  [[ "$arg" == "--guest" ]] && GUEST=1
done

[[ -f .env ]] && { set -a; source .env; set +a; }
[[ "$GUEST" == "1" || "${PEER_PAIRING_MODE:-}" == "guest" ]] || exit 0
[[ -n "${PEER_SETUP_HINT_HOST:-}" ]] || exit 0
[[ "${PEER_AUTO_UPDATE:-1}" == "0" ]] && exit 0

bash "$DIR/scripts/peer-sync-from-host.sh" "${PEER_SETUP_HINT_HOST}" "${PEER_SETUP_PORT:-3848}" || true
