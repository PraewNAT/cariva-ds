# Agent Peer Bridge — local Makefile (also invoked from hub root)

SHELL := /bin/bash
DIR := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))
HUB := $(abspath $(DIR)/../..)

.PHONY: help install check-env probe check-network pair-test readiness wizard setup-ui start supervised status typecheck pack clear-pack pack-fresh guest-url sync-from-host tunnel-init tunnel-start tunnel-quick tunnel-quick-stop pattern-brief verify-showcase ds-cowork

help: ## Show targets
	@grep -E '^[a-zA-Z0-9_-]+:.*##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

install: ## npm install
	cd "$(DIR)" && unset NODE_ENV && npm install

check-env: ## Verify .env schema
	cd "$(DIR)" && npm run check-env

probe: ## Test local agent (CLI/SDK/API)
	cd "$(DIR)" && npm run probe

check-network: ## Tailscale + ports
	"$(DIR)/scripts/peer-readiness.sh" --layer network

pair-test: ## Ping peer (requires PEER_HOST)
	"$(DIR)/scripts/peer-pair-test.sh"

readiness: ## Full readiness check (JSON=1 for json)
	"$(DIR)/scripts/peer-readiness.sh" $(if $(filter 1,$(JSON)),--json,)

wizard: ## CLI wizard (interactive terminal setup)
	cd "$(DIR)" && npm run peer:wizard

setup-ui: ## Start bridge + open web setup UI (PEER_FORCE_RESTART=1 to reload)
	PEER_FORCE_RESTART="$(or $(PEER_FORCE_RESTART),)" bash "$(DIR)/scripts/open-setup.sh"

restart: ## Restart bridge in background (reload code)
	PEER_FORCE_RESTART=1 bash "$(DIR)/scripts/start-background.sh"

start-bg: ## Start bridge in background
	"$(DIR)/scripts/start-background.sh"

start: ## Start bridge foreground (+ open setup UI in browser)
	bash "$(DIR)/scripts/start-foreground.sh"

supervised: ## Start with watchdog
	cd "$(DIR)" && npm run start:supervised

status: ## Health + sessions
	@curl -sf "http://127.0.0.1:$${PEER_PORT:-3847}/health" | python3 -m json.tool 2>/dev/null || curl -sf "http://127.0.0.1:3847/health" | python3 -m json.tool

typecheck: ## TypeScript check
	cd "$(DIR)" && npm run typecheck

pack: ## Create agent-peer-bridge.zip for other machines
	"$(DIR)/scripts/pack.sh"

clear-pack: ## Remove .cache pack (Guest curl /pack.zip rebuilds on next fetch)
	@rm -f "$(DIR)/.cache/agent-peer-bridge.zip"
	@rmdir "$(DIR)/.cache" 2>/dev/null || true
	@echo "Cleared: $(DIR)/.cache/agent-peer-bridge.zip"

pack-fresh: clear-pack pack ## Clear cache + rebuild zip (default: hub dist/)

guest-url: ## Print curl install URL for Guest (JSON=1)
	"$(DIR)/scripts/peer-guest-url.sh"

sync-from-host: ## Guest: re-download pack from Host if version mismatch (HOST= required)
	@if [[ -z "$(HOST)" ]]; then echo "Usage: make sync-from-host HOST=<host-ip-or-setup-url>"; exit 1; fi
	JSON=1 bash "$(DIR)/scripts/peer-sync-from-host.sh" "$(HOST)"

tunnel-init: ## Create .cloudflared/config.yml from template
	bash "$(DIR)/scripts/peer-tunnel-init.sh"

tunnel-start: ## Run cloudflared named tunnel (needs login + DNS config)
	bash "$(DIR)/scripts/peer-tunnel-start.sh"

tunnel-quick: ## Quick Tunnel — no login (*.trycloudflare.com)
	bash "$(DIR)/scripts/peer-tunnel-quick.sh"

tunnel-quick-stop: ## Stop quick tunnels
	bash "$(DIR)/scripts/peer-tunnel-quick-stop.sh"

tunnel-quick-foreground: ## Quick tunnel — keep terminal open (most reliable)
	bash "$(DIR)/scripts/peer-tunnel-quick-foreground.sh"

url: guest-url ## Alias

pattern-brief: ## Post pattern_brief (SHOWCASE=path overrides registry)
	@SHOWCASE="$(or $(SHOWCASE),)" "$(DIR)/scripts/peer-pattern-brief.sh"

verify-showcase: ## lint+build showcase → verify_result
	@SHOWCASE="$(or $(SHOWCASE),)" "$(DIR)/scripts/peer-verify-showcase.sh"

ds-cowork: ## Start DS alignment cowork
	@SHOWCASE="$(or $(SHOWCASE),)" "$(DIR)/scripts/peer-ds-cowork.sh"

cowork: ## Start generic cowork (GOAL=… CRITERIA_JSON='["lint_pass"]')
	@GOAL="$(or $(GOAL),Collaborate until done)" CRITERIA_JSON="$(or $(CRITERIA_JSON),[])" "$(DIR)/scripts/peer-cowork.sh" "$(GOAL)"
