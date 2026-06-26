#!/usr/bin/env bash
# Portable timeout wrapper (macOS + Linux).
set -euo pipefail
SECS="${1:?seconds required}"
shift

if command -v timeout >/dev/null 2>&1; then
  exec timeout "$SECS" "$@"
fi
if command -v gtimeout >/dev/null 2>&1; then
  exec gtimeout "$SECS" "$@"
fi

"$@" &
pid=$!
( sleep "$SECS"; kill "$pid" 2>/dev/null ) &
killer=$!
set +e
wait "$pid"
status=$?
kill "$killer" 2>/dev/null
wait "$killer" 2>/dev/null
exit "$status"
