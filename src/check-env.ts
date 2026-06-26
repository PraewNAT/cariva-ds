/**
 * Print env status (no secret values).
 */
import "dotenv/config";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { findHubRoot, getAgentMode, getAgentProduct, getPeerRole, getSharedToken } from "./config.js";
import { isPeerConfigured } from "./peer-client.js";

type Row = { key: string; status: "set" | "missing" | "optional"; note?: string };

function isSet(key: string): boolean {
  return Boolean(process.env[key]?.trim());
}

const rows: Row[] = [
  { key: "PEER_ROLE", status: isSet("PEER_ROLE") ? "set" : "missing", note: getPeerRole() },
  { key: "AGENT_PRODUCT", status: "set", note: getAgentProduct() },
  { key: "AGENT_MODE", status: "set", note: getAgentMode() },
  {
    key: "PEER_SHARED_TOKEN",
    status: isSet("PEER_SHARED_TOKEN") ? "set" : "optional",
    note: isSet("PEER_SHARED_TOKEN") ? "configured" : "wizard will generate",
  },
  {
    key: "PEER_HOST",
    status: isSet("PEER_HOST") ? "set" : "optional",
    note: isSet("PEER_HOST") ? process.env.PEER_HOST : "pair first",
  },
  { key: "PEER_PORT", status: isSet("PEER_PORT") ? "set" : "optional", note: process.env.PEER_PORT ?? "3847" },
  {
    key: "AGENT_HUB_PATH",
    status: isSet("AGENT_HUB_PATH") ? "set" : "optional",
    note: isSet("AGENT_HUB_PATH") ? undefined : `standalone: ${findHubRoot()}`,
  },
];

const mode = getAgentMode();
if (mode === "sdk" || getAgentProduct() === "cursor") {
  rows.push({
    key: "CURSOR_API_KEY",
    status: isSet("CURSOR_API_KEY") ? "set" : mode === "sdk" ? "missing" : "optional",
  });
}
if (mode === "api" && getAgentProduct() === "claude") {
  rows.push({ key: "ANTHROPIC_API_KEY", status: isSet("ANTHROPIC_API_KEY") ? "set" : "missing" });
}
if (mode === "api" && getAgentProduct() === "codex") {
  rows.push({ key: "OPENAI_API_KEY", status: isSet("OPENAI_API_KEY") ? "set" : "missing" });
}

console.log("Agent Peer Bridge — env check\n");
let fail = false;
for (const r of rows) {
  const icon = r.status === "missing" ? "✗" : r.status === "set" ? "✓" : "○";
  if (r.status === "missing") fail = true;
  console.log(`  ${icon} ${r.key}${r.note ? ` — ${r.note}` : ""}`);
}

const nodeModules = existsSync(join(process.cwd(), "node_modules"));
console.log(`\n  ${nodeModules ? "✓" : "✗"} node_modules`);
if (!nodeModules) fail = true;

console.log(`\n  Peer configured: ${isPeerConfigured() ? "yes" : "no (pair via wizard)"}`);
console.log(fail ? "\nStatus: FAIL — fix missing required keys" : "\nStatus: OK");
process.exit(fail ? 1 : 0);
