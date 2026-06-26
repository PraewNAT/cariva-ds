import { writeFileSync } from "node:fs";
import { join } from "node:path";

export type PeerHealthSnapshot = {
  pid: number;
  ts: string;
  uptimeSec: number;
  port: number;
  paired: boolean;
  peerHost?: string;
  sessions: number;
  coworkActive: boolean;
};

export function healthFilePath(): string {
  const custom = process.env.PEER_BRIDGE_HEALTH_FILE?.trim();
  if (custom) return custom;
  return join(process.cwd(), ".peer-bridge-health.json");
}

export function startHealthReporter(getFields: () => Omit<PeerHealthSnapshot, "pid" | "ts" | "uptimeSec">): NodeJS.Timeout {
  const path = healthFilePath();
  const startedAt = Date.now();

  const tick = (): void => {
    const snapshot: PeerHealthSnapshot = {
      pid: process.pid,
      ts: new Date().toISOString(),
      uptimeSec: Math.floor((Date.now() - startedAt) / 1000),
      ...getFields(),
    };
    writeFileSync(path, `${JSON.stringify(snapshot)}\n`, "utf8");
  };

  tick();
  return setInterval(tick, 15_000);
}
