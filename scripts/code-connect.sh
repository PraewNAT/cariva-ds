#!/usr/bin/env bash
# Load Figma token from .env.local (gitignored) then run Code Connect CLI.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
elif [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

if [[ -z "${FIGMA_ACCESS_TOKEN:-}" ]]; then
  echo "Missing FIGMA_ACCESS_TOKEN."
  echo "Create .env.local from .env.example and add your Figma personal access token."
  exit 1
fi

npx figma connect "$@"
