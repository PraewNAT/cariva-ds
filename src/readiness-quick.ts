import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  findBridgeRoot,
  getAgentMode,
  getAgentProduct,
  getPeerPort,
  getPeerRole,
} from "./config.js";

export type ReadinessLayer = { name: string; status: string; note: string };

export type ReadinessResult = {
  layers: ReadinessLayer[];
  readyLocal: number;
  readyCowork: number;
  exitCode: number;
};

export async function runQuickReadiness(): Promise<ReadinessResult> {
  const root = findBridgeRoot();
  const layers: ReadinessLayer[] = [];
  let fail = 0;
  let readyLocal = 1;
  let readyCowork = 0;

  layers.push({
    name: "prereq",
    status: "ok",
    note: `node ${process.version.replace(/^v/, "")}`,
  });

  const hasModules = existsSync(join(root, "node_modules"));
  layers.push({
    name: "install",
    status: hasModules ? "ok" : "fail",
    note: hasModules ? "node_modules" : "run: make install",
  });
  if (!hasModules) {
    fail = 1;
    readyLocal = 0;
  }

  const role = getPeerRole();
  const product = getAgentProduct();
  const mode = getAgentMode();
  const configIssues: string[] = [];
  if (!process.env.PEER_ROLE?.trim()) configIssues.push("PEER_ROLE");
  if ((mode === "sdk" || mode === "api") && product === "cursor" && !process.env.CURSOR_API_KEY?.trim()) {
    configIssues.push("CURSOR_API_KEY");
  }
  if (mode === "api" && product === "claude" && !process.env.ANTHROPIC_API_KEY?.trim()) {
    configIssues.push("ANTHROPIC_API_KEY");
  }
  if (mode === "api" && product === "codex" && !process.env.OPENAI_API_KEY?.trim()) {
    configIssues.push("OPENAI_API_KEY");
  }
  const configOk = configIssues.length === 0;
  layers.push({
    name: "config",
    status: configOk ? "ok" : "fail",
    note: configOk
      ? `role=${role} mode=${mode} product=${product}`
      : `ขาด: ${configIssues.join(", ")} — เปิด /setup`,
  });
  if (!configOk) {
    fail = 1;
    readyLocal = 0;
  }

  const peerPort = getPeerPort();
  layers.push({
    name: "network",
    status: "ok",
    note: `port ${peerPort}`,
  });

  layers.push({
    name: "agent",
    status: "ok",
    note: "quick check (ใช้ ทดสอบ Agent สำหรับ probe เต็ม)",
  });

  try {
    const health = await fetch(`http://127.0.0.1:${peerPort}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    layers.push({
      name: "daemon",
      status: health.ok ? "ok" : "warn",
      note: health.ok ? "/health 200" : `health HTTP ${health.status}`,
    });
  } catch {
    layers.push({
      name: "daemon",
      status: "warn",
      note: "bridge not running — make peer-start",
    });
  }

  const peerHost = process.env.PEER_HOST?.trim() ?? "";
  const token = process.env.PEER_SHARED_TOKEN?.trim() ?? "";
  if (peerHost && token) {
    layers.push({
      name: "peer",
      status: "ok",
      note: `paired with ${peerHost}`,
    });
    readyCowork = 1;
  } else {
    layers.push({
      name: "peer",
      status: "warn",
      note: "not paired — เปิด /setup ขั้น 3",
    });
  }

  return { layers, readyLocal, readyCowork, exitCode: fail };
}
