import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const HEALTH_FILE = join(process.cwd(), ".peer-bridge-health.json");
const MAX_RESTARTS = 10;
let restarts = 0;

function start(): ReturnType<typeof spawn> {
  return spawn("npm", ["start"], {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true,
  });
}

let child = start();

child.on("exit", (code) => {
  console.error(`[watchdog] peer-bridge exited code=${code}`);
  if (restarts >= MAX_RESTARTS) {
    console.error("[watchdog] max restarts reached");
    process.exit(1);
  }
  restarts++;
  setTimeout(() => {
    child = start();
  }, 3000);
});

setInterval(() => {
  if (!existsSync(HEALTH_FILE)) return;
  try {
    const raw = readFileSync(HEALTH_FILE, "utf8");
    const snap = JSON.parse(raw);
    const age = Date.now() - new Date(snap.ts).getTime();
    if (age > 60_000) {
      console.error("[watchdog] stale health file — restarting");
      child.kill("SIGTERM");
    }
  } catch {
    /* ignore */
  }
}, 20_000);
