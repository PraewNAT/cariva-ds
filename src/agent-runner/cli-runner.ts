import { spawn } from "node:child_process";
import type { AgentResult, AgentRunnerConfig, RunOpts } from "./presets.js";

export async function runCliAgent(
  config: AgentRunnerConfig,
  prompt: string,
  opts: RunOpts = {},
): Promise<AgentResult> {
  const cli = config.cli;
  if (!cli?.command) {
    return { status: "error", error: "CLI command not configured", durationMs: 0 };
  }

  const started = Date.now();
  const args = [...(cli.args ?? []), prompt];
  const cwd = opts.cwd ?? cli.cwd ?? process.cwd();
  const timeoutMs = opts.timeoutMs ?? 120_000;

  return new Promise((resolve) => {
    const child = spawn(cli.command, args, {
      cwd,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => { stdout += d.toString(); });
    child.stderr.on("data", (d) => { stderr += d.toString(); });

    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      resolve({
        status: "error",
        error: `CLI timeout after ${timeoutMs}ms`,
        durationMs: Date.now() - started,
      });
    }, timeoutMs);

    child.on("close", (code) => {
      clearTimeout(timer);
      const durationMs = Date.now() - started;
      if (code !== 0) {
        resolve({
          status: "error",
          error: stderr.trim() || `exit ${code}`,
          result: stdout.trim() || undefined,
          durationMs,
        });
        return;
      }
      resolve({ status: "ok", result: stdout.trim() || "(empty)", durationMs });
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      resolve({ status: "error", error: err.message, durationMs: Date.now() - started });
    });
  });
}
