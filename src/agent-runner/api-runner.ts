import type { AgentResult, AgentRunnerConfig, RunOpts } from "./presets.js";

export async function runApiAgent(
  config: AgentRunnerConfig,
  prompt: string,
  opts: RunOpts = {},
): Promise<AgentResult> {
  const api = config.api;
  if (!api?.apiKey) {
    return { status: "error", error: "API key not configured", durationMs: 0 };
  }

  const started = Date.now();
  const timeoutMs = opts.timeoutMs ?? 120_000;

  try {
    if (api.provider === "anthropic") {
      const res = await fetch(`${api.baseUrl}/v1/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": api.apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: api.model,
          max_tokens: 4096,
          messages: [{ role: "user", content: prompt }],
        }),
        signal: AbortSignal.timeout(timeoutMs),
      });
      const data = (await res.json()) as {
        content?: { type: string; text: string }[];
        error?: { message: string };
      };
      if (!res.ok) {
        return {
          status: "error",
          error: data.error?.message ?? res.statusText,
          durationMs: Date.now() - started,
        };
      }
      const text = data.content?.map((c) => c.text).join("\n") ?? "";
      return { status: "ok", result: text, durationMs: Date.now() - started };
    }

    const base = api.baseUrl.replace(/\/$/, "");
    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api.apiKey}`,
      },
      body: JSON.stringify({
        model: api.model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 4096,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
      error?: { message: string };
    };
    if (!res.ok) {
      return {
        status: "error",
        error: data.error?.message ?? res.statusText,
        durationMs: Date.now() - started,
      };
    }
    const text = data.choices?.[0]?.message?.content ?? "";
    return { status: "ok", result: text, durationMs: Date.now() - started };
  } catch (err) {
    return {
      status: "error",
      error: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - started,
    };
  }
}
