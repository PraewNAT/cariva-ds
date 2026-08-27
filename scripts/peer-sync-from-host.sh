#!/usr/bin/env bash
# Guest: download pack from Host when bridgeVersion differs. Preserves .env
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

HOST="${1:-${PEER_SETUP_HINT_HOST:-}}"
SETUP_PORT="${2:-${PEER_SETUP_PORT:-3848}}"
JSON="${JSON:-0}"

json_out() {
  if [[ "$JSON" == "1" ]]; then
    printf '%s\n' "$1"
  fi
}

if [[ -z "$HOST" ]]; then
  json_out '{"ok":true,"skipped":true,"reason":"no host"}'
  echo "version|skip|no PEER_SETUP_HINT_HOST"
  exit 0
fi

if [[ "$HOST" == https://* || "$HOST" == http://* ]]; then
  version_url="${HOST%/}/api/version"
  pack_url="${HOST%/}/pack.zip"
else
  version_url="http://${HOST}:${SETUP_PORT}/api/version"
  pack_url="http://${HOST}:${SETUP_PORT}/pack.zip"
fi

local_ver="$(node -p "require('./package.json').version" 2>/dev/null || echo unknown)"

remote_json=""
if ! remote_json="$(curl -fsSL --max-time 15 "$version_url" 2>/dev/null)"; then
  json_out "{\"ok\":false,\"error\":\"cannot reach Host at ${version_url}\"}"
  echo "version|warn|cannot reach Host version API"
  exit 0
fi

remote_ver="$(node -pe "JSON.parse(process.argv[1]).bridgeVersion" "$remote_json" 2>/dev/null || echo unknown)"

if [[ "$local_ver" == "$remote_ver" ]]; then
  json_out "{\"ok\":true,\"updated\":false,\"localVersion\":\"${local_ver}\",\"remoteVersion\":\"${remote_ver}\"}"
  echo "version|ok|${local_ver} (matches Host)"
  exit 0
fi

echo "⏬ Guest ${local_ver} → Host ${remote_ver} — ดาวน์โหลดแพ็กใหม่…"

env_backup=""
if [[ -f .env ]]; then
  env_backup="$(mktemp -t peer-bridge-env.XXXXXX)"
  cp .env "$env_backup"
fi

tmp="$(mktemp -t agent-peer-bridge.XXXXXX.zip)"
trap 'rm -f "$tmp"' EXIT

curl -fsSL "$pack_url" -o "$tmp"
unzip -qo "$tmp" -d "$DIR"

if [[ -n "$env_backup" ]]; then
  cp "$env_backup" .env
  rm -f "$env_backup"
fi

if [[ ! -d node_modules ]]; then
  echo "⏬ ติดตั้ง dependencies…"
  make install
fi

new_local="$(node -p "require('./package.json').version" 2>/dev/null || echo unknown)"
json_out "{\"ok\":true,\"updated\":true,\"localVersion\":\"${local_ver}\",\"remoteVersion\":\"${remote_ver}\",\"installedVersion\":\"${new_local}\",\"needsRestart\":true}"
echo "version|ok|updated ${local_ver} → ${new_local}"
