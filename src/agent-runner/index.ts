import { runApiAgent } from "./api-runner.js";
import { runCliAgent } from "./cli-runner.js";
import {
  capabilitiesFor,
  loadRunnerConfigFromEnv,
  type AgentResult,
  type AgentRunnerConfig,
  type ProbeResult,
  type RunOpts,
} from "./presets.js";
import { runSdkAgent } from "./sdk-runner.js";

export async function runAgent(
  prompt: string,
  opts: RunOpts = {},
  config?: AgentRunnerConfig,
): Promise<AgentResult> {
  const cfg = config ?? loadRunnerConfigFromEnv();

  let primary: AgentResult;
  switch (cfg.mode) {
    case "cli":
      primary = await runCliAgent(cfg, prompt, opts);
      break;
    case "api":
      primary = await runApiAgent(cfg, prompt, opts);
      break;
    case "sdk":
    default:
      primary = await runSdkAgent(cfg, prompt, opts);
      break;
  }

  if (primary.status === "ok") return primary;

  const fallbackMode = process.env.AGENT_FALLBACK_MODE?.trim().toLowerCase();
  const fallbackProduct = process.env.AGENT_FALLBACK_PRODUCT?.trim().toLowerCase();
  if (!fallbackMode || fallbackMode === cfg.mode) return primary;

  const fallbackCfg: AgentRunnerConfig = {
    ...cfg,
    product: fallbackProduct || cfg.product,
    mode: fallbackMode as AgentRunnerConfig["mode"],
  };
  if (fallbackMode === "api") {
    fallbackCfg.api = loadRunnerConfigFromEnv().api;
  }

  const fallback = await runAgent(prompt, opts, fallbackCfg);
  if (fallback.status === "ok") return fallback;
  return primary;
}

export async function probeAgent(config?: AgentRunnerConfig): Promise<ProbeResult> {
  const cfg = config ?? loadRunnerConfigFromEnv();
  const probePrompt = "Reply with exactly: PEER_PROBE_OK";
  const result = await runAgent(probePrompt, { timeoutMs: 60_000, jobLabel: "probe" }, cfg);

  if (result.status === "ok" && result.result) {
    return {
      ok: true,
      mode: cfg.mode,
      product: cfg.product,
      message: result.result.slice(0, 200),
      durationMs: result.durationMs,
    };
  }
  return {
    ok: false,
    mode: cfg.mode,
    product: cfg.product,
    message: result.error ?? "probe failed",
    durationMs: result.durationMs,
  };
}

export function getAgentMeta(config?: AgentRunnerConfig) {
  const cfg = config ?? loadRunnerConfigFromEnv();
  return {
    product: cfg.product,
    mode: cfg.mode,
    capabilities: capabilitiesFor(cfg.product, cfg.mode),
  };
}

export { loadRunnerConfigFromEnv, capabilitiesFor };
