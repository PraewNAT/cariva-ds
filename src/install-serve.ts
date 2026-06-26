import { execSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { findBridgeRoot } from "./config.js";
import { getPublicSetupBaseUrl } from "./peer-url.js";

const BRIDGE_ROOT = findBridgeRoot();

export function installScript(host: string, port: number, opts?: { https?: boolean }): string {
  const templatePath = join(BRIDGE_ROOT, "scripts", "install-remote.sh");
  const template = readFileSync(templatePath, "utf8");
  const baseUrl = getPublicSetupBaseUrl(host, port, opts);
  return template
    .replaceAll("__BASE_URL__", baseUrl)
    .replaceAll("__HOST__", host.split(":")[0] ?? host)
    .replaceAll("__PORT__", String(port));
}

let cachedPackPath: string | null = null;
let cachedPackMtime = 0;

function packNeedsRebuild(zipPath: string): boolean {
  if (!existsSync(zipPath)) return true;
  const zipMtime = statSync(zipPath).mtimeMs;
  const watch = [
    join(BRIDGE_ROOT, "package.json"),
    join(BRIDGE_ROOT, "Makefile"),
    join(BRIDGE_ROOT, ".env.example"),
  ];
  for (const p of watch) {
    if (existsSync(p) && statSync(p).mtimeMs > zipMtime) return true;
  }
  try {
    const newer = execSync(
      `find "${join(BRIDGE_ROOT, "scripts")}" "${join(BRIDGE_ROOT, "src")}" "${join(BRIDGE_ROOT, "public")}" -type f -newer "${zipPath}" -print -quit 2>/dev/null || true`,
      { encoding: "utf8" },
    ).trim();
    if (newer) return true;
  } catch {
    return true;
  }
  return false;
}

export function resolvePackZip(): string {
  const explicit = process.env.PEER_PACK_PATH?.trim();
  if (explicit && existsSync(explicit)) return explicit;

  const cacheDir = join(BRIDGE_ROOT, ".cache");
  const out = join(cacheDir, "agent-peer-bridge.zip");
  if (packNeedsRebuild(out)) {
    execSync(`mkdir -p "${cacheDir}" && "${join(BRIDGE_ROOT, "scripts", "pack.sh")}" "${out}"`, {
      stdio: "pipe",
      cwd: BRIDGE_ROOT,
    });
  }
  return out;
}

export function getPackZip(): { path: string; buffer: Buffer } {
  const path = resolvePackZip();
  const mtime = statSync(path).mtimeMs;
  if (cachedPackPath === path && mtime === cachedPackMtime) {
    return { path, buffer: readFileSync(path) };
  }
  cachedPackPath = path;
  cachedPackMtime = mtime;
  return { path, buffer: readFileSync(path) };
}
