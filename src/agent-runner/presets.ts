import type { AgentMode } from "../config.js";

export type AgentRunnerConfig = {
  product: string;
  mode: AgentMode;
  cli?: { command: string; args?: string[]; cwd?: string };
  api?: { baseUrl: string; apiKey: string; model: string; provider?: "openai" | "anthropic" };
};

export type AgentResult = {
  status: "ok" | "error";
  result?: string;
  error?: string;
  durationMs: number;
};

export type ProbeResult = {
  ok: boolean;
  mode: AgentMode;
  product: string;
  message: string;
  durationMs?: number;
};

export type RunOpts = {
  cwd?: string;
  timeoutMs?: number;
  jobLabel?: string;
};

export const PRODUCT_PRESETS: Record<
  string,
  Partial<Record<AgentMode, Partial<AgentRunnerConfig>>>
> = {
  cursor: {
    cli: { cli: { command: "cursor", args: ["agent"] } },
    sdk: { mode: "sdk" },
    api: { mode: "api", api: { baseUrl: "https://api.cursor.com", apiKey: "", model: "composer-2.5", provider: "openai" } },
  },
  claude: {
    cli: { cli: { command: "claude", args: [] } },
    api: {
      mode: "api",
      api: {
        baseUrl: "https://api.anthropic.com",
        apiKey: "",
        model: "claude-sonnet-4-20250514",
        provider: "anthropic",
      },
    },
  },
  codex: {
    cli: { cli: { command: "codex", args: [] } },
    api: {
      mode: "api",
      api: {
        baseUrl: "https://api.openai.com/v1",
        apiKey: "",
        model: "gpt-4o",
        provider: "openai",
      },
    },
  },
};

export function capabilitiesFor(product: string, mode: AgentMode): string[] {
  const caps = ["local_fs"];
  if (product === "cursor" && (mode === "sdk" || mode === "cli")) {
    caps.push("figma_mcp", "terminal");
  }
  return caps;
}

export function loadRunnerConfigFromEnv(): AgentRunnerConfig {
  const product = process.env.AGENT_PRODUCT?.trim().toLowerCase() || "cursor";
  const mode = (process.env.AGENT_MODE?.trim().toLowerCase() as AgentMode) || "sdk";
  const preset = PRODUCT_PRESETS[product]?.[mode] ?? {};

  const config: AgentRunnerConfig = {
    product,
    mode,
    ...preset,
  };

  if (mode === "cli") {
    config.cli = {
      command: process.env.AGENT_CLI_COMMAND?.trim() || preset.cli?.command || product,
      args: process.env.AGENT_CLI_ARGS?.trim()
        ? process.env.AGENT_CLI_ARGS.trim().split(/\s+/)
        : preset.cli?.args,
      cwd: process.env.AGENT_CLI_CWD?.trim(),
    };
  }

  if (mode === "api") {
    const provider = preset.api?.provider ?? "openai";
    if (provider === "anthropic") {
      config.api = {
        baseUrl: "https://api.anthropic.com",
        apiKey: process.env.ANTHROPIC_API_KEY?.trim() ?? "",
        model: process.env.ANTHROPIC_MODEL?.trim() || preset.api?.model || "claude-sonnet-4-20250514",
        provider: "anthropic",
      };
    } else {
      config.api = {
        baseUrl: process.env.OPENAI_BASE_URL?.trim() || preset.api?.baseUrl || "https://api.openai.com/v1",
        apiKey: process.env.OPENAI_API_KEY?.trim() || process.env.CURSOR_API_KEY?.trim() || "",
        model: process.env.OPENAI_MODEL?.trim() || process.env.CURSOR_MODEL?.trim() || preset.api?.model || "gpt-4o",
        provider: "openai",
      };
    }
  }

  return config;
}
