#!/usr/bin/env bash
# Peer bridge readiness — layers 1–8. Used by: make peer-readiness
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

if [[ -f .env ]]; then set -a; source .env; set +a; fi

JSON=0
QUICK=0
LAYER=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --json) JSON=1; shift ;;
    --quick) QUICK=1; shift ;;
    --layer) LAYER="$2"; shift 2 ;;
    *) shift ;;
  esac
done

PEER_PORT="${PEER_PORT:-3847}"
FAIL=0
READY_LOCAL=1
READY_COWORK=0

icon() {
  if [[ "$1" == "ok" ]]; then echo "✅";
  elif [[ "$1" == "warn" ]]; then echo "⚠️ ";
  else echo "❌"; fi
}

check_prereq() {
  local note=""
  if command -v node >/dev/null 2>&1; then
    note="node $(node -v | tr -d v)"
  else
    note="node missing"; FAIL=1; READY_LOCAL=0
  fi
  if command -v tailscale >/dev/null 2>&1; then
    if tailscale status >/dev/null 2>&1; then
      note="$note, tailscale online"
    else
      note="$note, tailscale offline"; FAIL=1
    fi
  else
    note="$note, tailscale not installed (optional on LAN)"
  fi
  echo "prereq|$( [[ $FAIL -eq 0 ]] && echo ok || echo fail )|$note"
}

check_install() {
  if [[ -d node_modules ]]; then
    echo "install|ok|node_modules"
  else
    echo "install|fail|run: make peer-install"; FAIL=1; READY_LOCAL=0
  fi
}

check_config() {
  if npm run check-env >/dev/null 2>&1; then
    local role="${PEER_ROLE:-developer}"
    local mode="${AGENT_MODE:-sdk}"
    local product="${AGENT_PRODUCT:-cursor}"
    echo "config|ok|role=$role mode=$mode product=$product"
  else
    echo "config|fail|เปิด http://127.0.0.1:3848/setup"; FAIL=1; READY_LOCAL=0
  fi
}

check_network() {
  local note=""
  if ss -ltn 2>/dev/null | grep -q ":$PEER_PORT " || lsof -i ":$PEER_PORT" >/dev/null 2>&1; then
    note="port $PEER_PORT listening"
  else
    note="port $PEER_PORT not listening (start bridge or OK if not started)"
  fi
  echo "network|ok|$note"
}

check_agent() {
  if [[ "$QUICK" == "1" ]]; then
    echo "agent|ok|quick check (ใช้ ทดสอบ Agent ใน browser สำหรับ probe เต็ม)"
    return
  fi
  if [[ -d node_modules ]] && "$(dirname "$0")/run-with-timeout.sh" 20 npm run probe >/dev/null 2>&1; then
    echo "agent|ok|probe passed"
  else
    echo "agent|warn|probe skipped or failed — set API key or CLI"; 
    # don't fail readiness for agent if not configured for probe in CI
  fi
}

check_daemon() {
  if curl -sf "http://127.0.0.1:$PEER_PORT/health" >/dev/null 2>&1; then
    echo "daemon|ok|/health 200"
  else
    echo "daemon|warn|bridge not running — make peer-start"
  fi
}

check_peer() {
  if [[ -z "${PEER_HOST:-}" || -z "${PEER_SHARED_TOKEN:-}" ]]; then
    echo "peer|warn|not paired — เปิด /setup ขั้น 3"
    return
  fi
  if [[ "$QUICK" == "1" ]]; then
    echo "peer|ok|paired with ${PEER_HOST}"
    READY_COWORK=1
    return
  fi
  if "$(dirname "$0")/run-with-timeout.sh" 15 "$DIR/scripts/peer-pair-test.sh" >/dev/null 2>&1; then
    echo "peer|ok|ping/pong OK"
    READY_COWORK=1
  else
    echo "peer|fail|pair-test failed"; FAIL=1
  fi
}

check_version() {
  if [[ "${PEER_PAIRING_MODE:-}" != "guest" ]]; then
    echo "version|ok|not guest"
    return
  fi
  local host="${PEER_SETUP_HINT_HOST:-}"
  if [[ -z "$host" && -n "${PEER_HOST:-}" ]]; then
    host="${PEER_HOST%%:*}"
  fi
  if [[ -z "$host" ]]; then
    echo "version|ok|no host to compare"
    return
  fi
  local setup_port="${PEER_SETUP_PORT:-3848}"
  local local_ver remote_ver
  local_ver="$(node -p "require('./package.json').version" 2>/dev/null || echo "?")"
  local version_url
  if [[ "$host" == https://* || "$host" == http://* ]]; then
    version_url="${host%/}/api/version"
  else
    version_url="http://${host}:${setup_port}/api/version"
  fi
  if ! remote_ver="$(curl -sf --max-time 10 "$version_url" | node -pe "JSON.parse(require('fs').readFileSync(0,'utf8')).bridgeVersion" 2>/dev/null)"; then
    echo "version|warn|cannot fetch Host version"
    return
  fi
  if [[ "$local_ver" == "$remote_ver" ]]; then
    echo "version|ok|v${local_ver} matches Host"
  else
    echo "version|fail|local v${local_ver} Host v${remote_ver} — make sync-from-host HOST=${host}"
    FAIL=1
  fi
}

run_layer() {
  local name="$1"
  case "$name" in
    prereq) check_prereq ;;
    install) check_install ;;
    config) check_config ;;
    network) check_network ;;
    agent) check_agent ;;
    daemon) check_daemon ;;
    peer) check_peer ;;
    version) check_version ;;
  esac
}

RESULTS=()
if [[ -n "$LAYER" ]]; then
  RESULTS+=("$(run_layer "$LAYER")")
else
  for l in prereq install config network agent daemon peer version; do
    RESULTS+=("$(run_layer "$l")")
  done
fi

if [[ "$JSON" == "1" ]]; then
  printf '{"layers":['
  first=1
  for r in "${RESULTS[@]}"; do
    IFS='|' read -r name status note <<< "$r"
    [[ $first -eq 1 ]] && first=0 || printf ','
    printf '{"name":"%s","status":"%s","note":"%s"}' "$name" "$status" "$note"
  done
  printf '],"readyLocal":%s,"readyCowork":%s,"exitCode":%s}\n' "$READY_LOCAL" "$READY_COWORK" "$FAIL"
  exit "$FAIL"
fi

echo "Peer bridge readiness"
echo "─────────────────────"
for r in "${RESULTS[@]}"; do
  IFS='|' read -r name status note <<< "$r"
  printf "  %-14s %s  %s\n" "$name" "$(icon "$status")" "$note"
done
echo "─────────────────────"
echo "Ready for local agent: $([[ $READY_LOCAL -eq 1 ]] && echo YES || echo NO)"
if [[ $READY_COWORK -eq 1 ]]; then
  echo "Ready for cowork:      YES"
else
  echo "Ready for cowork:      NO (pair first)"
fi
exit "$FAIL"
