#!/usr/bin/env bash
# Wait until setup server responds on /api/detect.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ -f "$DIR/.env" ]]; then set -a; source "$DIR/.env"; set +a; fi

SETUP_PORT="${PEER_SETUP_PORT:-3848}"
TRIES="${PEER_SETUP_WAIT_TRIES:-45}"

for _ in $(seq 1 "$TRIES"); do
  if curl -sf --max-time 1 "http://127.0.0.1:${SETUP_PORT}/api/detect" >/dev/null 2>&1; then
    echo "Ready: http://127.0.0.1:${SETUP_PORT}/setup"
    exit 0
  fi
  sleep 1
done

echo "WARN: setup server not up after ${TRIES}s" >&2
exit 1
