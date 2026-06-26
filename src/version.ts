import { readFileSync } from "node:fs";
import { join } from "node:path";
import { findBridgeRoot } from "./config.js";

let cached: string | null = null;

/** Semver from integrations/agent-peer-bridge/package.json */
export function getBridgeVersion(): string {
  if (cached) return cached;
  const pkgPath = join(findBridgeRoot(), "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version?: string };
  cached = pkg.version ?? "0.0.0";
  return cached;
}
