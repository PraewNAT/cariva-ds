import { Agent, type SettingSource } from "@cursor/sdk";
import { findHubRoot } from "../config.js";
import type { AgentResult, AgentRunnerConfig, RunOpts } from "./presets.js";

const SETTING_SOURCES: SettingSource[] = ["user"];

function resolveRuntime(): "cloud" | "local" {
  const explicit = process.env.CURSOR_RUNTIME?.toLowerCase();
  if (explicit === "cloud" || explicit === "local") return explicit;
  return process.env.AGENT_HUB_REPO_URL ? "cloud" : "local";
}

export async function runSdkAgent(
  config: AgentRunnerConfig,
  prompt: string,
  opts: RunOpts = {},
): Promise<AgentResult> {
  if (config.product !== "cursor") {
    return {
      status: "error",
      error: `SDK mode not implemented for product: ${config.product}`,
      durationMs: 0,
    };
  }

  const apiKey = process.env.CURSOR_API_KEY?.trim();
  if (!apiKey) {
    return { status: "error", error: "CURSOR_API_KEY required for SDK mode", durationMs: 0 };
  }

  const started = Date.now();
  const runtime = resolveRuntime();
  const modelId = process.env.CURSOR_MODEL ?? "composer-2.5";

  const agentOptions: Parameters<typeof Agent.prompt>[1] = {
    apiKey,
    model: { id: modelId },
  };

  if (runtime === "cloud") {
    const repo = process.env.AGENT_HUB_REPO_URL?.trim();
    if (!repo) {
      return { status: "error", error: "AGENT_HUB_REPO_URL required for cloud runtime", durationMs: 0 };
    }
    Object.assign(agentOptions, { cloud: { repos: [{ url: repo }] } });
  } else {
    Object.assign(agentOptions, {
      local: { cwd: opts.cwd ?? findHubRoot(), settingSources: SETTING_SOURCES },
    });
  }

  try {
    const result = await Agent.prompt(prompt, agentOptions);
    return {
      status: result.status === "error" ? "error" : "ok",
      result: typeof result.result === "string" ? result.result : JSON.stringify(result.result),
      error: result.status === "error" ? String(result.result) : undefined,
      durationMs: Date.now() - started,
    };
  } catch (err) {
    return {
      status: "error",
      error: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - started,
    };
  }
}
