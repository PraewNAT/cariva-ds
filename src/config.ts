import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type PeerRole = "developer" | "designer";
export type AgentMode = "cli" | "sdk" | "api";
export type PairingMode = "host" | "guest";

export function findBridgeRoot(): string {
  let dir = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(dir, "package.json"))) return resolve(dir);
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return resolve(dirname(fileURLToPath(import.meta.url)), "..");
}

/** Workspace for agent runs — hub if present, else standalone bridge folder */
export function findHubRoot(): string {
  const fromEnv = process.env.AGENT_HUB_PATH?.trim();
  if (fromEnv && existsSync(fromEnv)) return resolve(fromEnv);

  let dir = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(dir, "AGENTS.md"))) return resolve(dir);
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return findBridgeRoot();
}

export function isStandalonePack(): boolean {
  const hub = process.env.AGENT_HUB_PATH?.trim();
  if (hub && existsSync(join(hub, "AGENTS.md"))) return false;
  let dir = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(dir, "AGENTS.md"))) return false;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return true;
}

export function getPeerPort(): number {
  const n = Number(process.env.PEER_PORT ?? "3847");
  return Number.isFinite(n) && n > 0 ? n : 3847;
}

export function getSetupPort(): number {
  const n = Number(process.env.PEER_SETUP_PORT ?? "3848");
  return Number.isFinite(n) && n > 0 ? n : 3848;
}

export function getSharedToken(): string {
  return process.env.PEER_SHARED_TOKEN?.trim() ?? "";
}

export function getPeerRole(): PeerRole {
  const r = process.env.PEER_ROLE?.trim().toLowerCase();
  return r === "designer" ? "designer" : "developer";
}

export function getPairingMode(): PairingMode {
  return process.env.PEER_PAIRING_MODE?.trim().toLowerCase() === "guest" ? "guest" : "host";
}

export function getAgentProduct(): string {
  return process.env.AGENT_PRODUCT?.trim().toLowerCase() || "cursor";
}

export function getAgentMode(): AgentMode {
  const m = process.env.AGENT_MODE?.trim().toLowerCase();
  if (m === "cli" || m === "api") return m;
  return "sdk";
}

export function getCoworkMaxRounds(): number {
  const n = Number(process.env.PEER_COWORK_MAX_ROUNDS ?? "20");
  return Number.isFinite(n) && n > 0 ? n : 20;
}

export function getCoworkPollMs(): number {
  const n = Number(process.env.PEER_COWORK_POLL_MS ?? "3000");
  return Number.isFinite(n) && n > 0 ? n : 3000;
}
