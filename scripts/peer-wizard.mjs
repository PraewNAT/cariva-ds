#!/usr/bin/env node
/**
 * Peer bridge setup wizard — CLI + optional auto-start + open browser.
 */
import { spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENV_PATH = join(DIR, ".env");
const EXAMPLE_PATH = join(DIR, ".env.example");
const SETUP_URL = `http://127.0.0.1:${process.env.PEER_SETUP_PORT || "3848"}/setup`;

function loadEnv() {
  if (!existsSync(ENV_PATH)) {
    copyFileSync(EXAMPLE_PATH, ENV_PATH);
    console.log("Created .env from .env.example");
  }
  const lines = readFileSync(ENV_PATH, "utf8").split("\n");
  for (const line of lines) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2];
  }
}

function saveEnv(updates) {
  let content = readFileSync(ENV_PATH, "utf8");
  for (const [key, value] of Object.entries(updates)) {
    const re = new RegExp(`^${key}=.*$`, "m");
    const line = `${key}=${value}`;
    content = re.test(content) ? content.replace(re, line) : `${content.trim()}\n${line}\n`;
    process.env[key] = value;
  }
  writeFileSync(ENV_PATH, content, "utf8");
}

function which(cmd) {
  return new Promise((resolve) => {
    spawn("which", [cmd], { stdio: "ignore" }).on("close", (c) => resolve(c === 0));
  });
}

function runBash(script, args = []) {
  return new Promise((resolve, reject) => {
    spawn("bash", [script, ...args], { cwd: DIR, stdio: "inherit" }).on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${script} failed (${code})`)),
    );
  });
}

async function ask(rl, q, def = "") {
  return new Promise((resolve) => {
    rl.question(`${q}${def ? ` [${def}]` : ""}: `, (a) => resolve(a.trim() || def));
  });
}

async function tryPairingJoin(hostWithPort, code) {
  if (!code?.trim()) return;
  const hostIp = hostWithPort.split(":")[0];
  const setupPort = process.env.PEER_SETUP_PORT || "3848";
  const res = await fetch(`http://127.0.0.1:${setupPort}/api/pairing/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: hostIp,
      code: code.trim(),
      role: process.env.PEER_ROLE || "designer",
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.warn("Pairing join failed — complete in setup UI:", data.error || res.status);
    return;
  }
  console.log("Paired with host:", data.peerHost || hostIp);
}

async function startBridgeAndOpenBrowser(hostForJoin, pairingCode) {
  console.log("\nStarting bridge in background...");
  await runBash(join(DIR, "scripts", "start-background.sh"));
  if (pairingCode && hostForJoin) {
    await tryPairingJoin(hostForJoin, pairingCode);
  }
  console.log("Opening setup in browser...");
  await runBash(join(DIR, "scripts", "open-browser.sh"), [SETUP_URL]);
  console.log(`\nSetup UI: ${SETUP_URL}`);
  console.log("Readiness: make readiness (or ./scripts/peer-readiness.sh)");
}

async function main() {
  loadEnv();

  if (!existsSync(join(DIR, "node_modules"))) {
    console.log("Installing dependencies...");
    await new Promise((res, rej) => {
      spawn("npm", ["install"], { cwd: DIR, stdio: "inherit", shell: true }).on("close", (c) =>
        c === 0 ? res() : rej(new Error("npm install failed")),
      );
    });
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const remote = process.env.PEER_REMOTE_INSTALL === "1";

  console.log("\n=== Agent Peer Bridge Setup ===\n");
  if (remote) {
    console.log("Remote install — defaults: guest / designer\n");
  }

  const defaultRole =
    process.env.PEER_WIZARD_DEFAULT_ROLE ||
    (remote ? "designer" : process.env.PEER_ROLE || "developer");
  const defaultPairing =
    process.env.PEER_WIZARD_DEFAULT_PAIRING ||
    (remote ? "guest" : process.env.PEER_PAIRING_MODE || "host");

  const role = await ask(rl, "Role (developer/designer)", defaultRole);
  const product = await ask(rl, "Agent product (cursor/claude/codex)", process.env.AGENT_PRODUCT || "cursor");

  const hasCli = await which(product);
  const hasCursorKey = Boolean(process.env.CURSOR_API_KEY);
  console.log(`\nDetected: CLI=${hasCli ? "yes" : "no"}, CURSOR_API_KEY=${hasCursorKey ? "set" : "no"}`);

  const mode = await ask(rl, "Mode (cli/sdk/api)", hasCli ? "cli" : "sdk");
  const pairing = await ask(rl, "Pairing (host/guest)", defaultPairing);

  const updates = { PEER_ROLE: role, AGENT_PRODUCT: product, AGENT_MODE: mode, PEER_PAIRING_MODE: pairing };
  let guestJoinHost = "";
  let guestPairingCode = "";

  if (mode === "sdk" || product === "cursor") {
    const key = await ask(rl, "CURSOR_API_KEY", process.env.CURSOR_API_KEY || "");
    if (key) updates.CURSOR_API_KEY = key;
  }
  if (product === "claude" && mode === "api") {
    const key = await ask(rl, "ANTHROPIC_API_KEY", process.env.ANTHROPIC_API_KEY || "");
    if (key) updates.ANTHROPIC_API_KEY = key;
  }

  const hub = await ask(rl, "AGENT_HUB_PATH (optional)", process.env.AGENT_HUB_PATH || "");
  if (hub) updates.AGENT_HUB_PATH = hub;

  if (pairing === "host") {
    const token = crypto.randomUUID().replace(/-/g, "");
    updates.PEER_SHARED_TOKEN = token;
    console.log("\n--- Host: share pairing code via setup UI after start ---");
    saveEnv(updates);
    console.log(`PEER_SHARED_TOKEN=${token}`);
  } else {
    const defaultHost = process.env.PEER_WIZARD_DEFAULT_PEER_HOST
      ? process.env.PEER_WIZARD_DEFAULT_PEER_HOST
      : (process.env.PEER_HOST || "").replace(/:.*$/, "");
    const hostIp = await ask(rl, "Host IP (from Host machine)", defaultHost);
    const code = await ask(rl, "Pairing code 6 digits (optional — ใส่ใน browser ได้)", "");
    updates.PEER_HOST = hostIp.includes(":") ? hostIp : `${hostIp}:${process.env.PEER_PORT || "3847"}`;
    guestJoinHost = updates.PEER_HOST;
    guestPairingCode = code;
    saveEnv(updates);
  }

  let autoStart = remote || process.env.PEER_WIZARD_AUTO_START === "1";
  if (!autoStart && process.stdin.isTTY) {
    const go = await ask(rl, "Start bridge and open setup in browser? (y/n)", "y");
    autoStart = go.toLowerCase() !== "n";
  }

  rl.close();

  if (autoStart) {
    await startBridgeAndOpenBrowser(guestJoinHost, guestPairingCode);
  } else {
    console.log(`\nNext: make start`);
    console.log(`Setup UI: ${SETUP_URL}`);
    console.log("Readiness: make readiness");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
