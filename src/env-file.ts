import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findBridgeRoot } from "./config.js";

export function writeEnv(updates: Record<string, string>): void {
  const root = findBridgeRoot();
  const envPath = join(root, ".env");
  const examplePath = join(root, ".env.example");
  let content = existsSync(envPath)
    ? readFileSync(envPath, "utf8")
    : readFileSync(examplePath, "utf8");

  for (const [key, value] of Object.entries(updates)) {
    const re = new RegExp(`^${key}=.*$`, "m");
    const line = `${key}=${value}`;
    content = re.test(content) ? content.replace(re, line) : `${content.trim()}\n${line}\n`;
  }
  writeFileSync(envPath, content, "utf8");
  for (const [key, value] of Object.entries(updates)) {
    process.env[key] = value;
  }
}
