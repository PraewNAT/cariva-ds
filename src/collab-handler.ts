import { getAgentMeta } from "./agent-runner/index.js";
import { getPeerRole, findHubRoot } from "./config.js";
import type { AgentMeta, PeerMessage } from "./message-schema.js";
import { getThread } from "./session-store.js";

export function buildCollabPrompt(sessionId: string, peerMeta?: AgentMeta): string {
  const thread = getThread(sessionId);
  const role = getPeerRole();
  const localMeta = getAgentMeta();
  const hubRoot = findHubRoot();

  const lines: string[] = [
    "You are collaborating with another AI agent on a different machine via Agent Peer Bridge.",
    "",
    "## Peer collaboration context",
    `Session: ${sessionId}`,
    `My role: ${role}`,
    `My agent: ${localMeta.product} (${localMeta.mode})`,
  ];

  if (peerMeta) {
    lines.push(`Peer role: ${peerMeta.product} (${peerMeta.mode})`);
    lines.push(`Peer capabilities: ${peerMeta.capabilities.join(", ") || "unknown"}`);
  }

  lines.push("", "## Shared thread (chronological)");
  if (thread.length === 0) {
    lines.push("(no messages yet)");
  } else {
    for (const m of thread.slice(-30)) {
      lines.push(`[${m.type}] ${m.from.role}@${m.from.host}: ${summarizePayload(m)}`);
    }
  }

  lines.push(
    "",
    "## Instructions",
    "- Respond to advance the shared goal.",
    "- If peer lacks MCP (e.g. Figma), send concrete artifacts as text/code blocks.",
    "- For alignment_request: cite file paths and palette keys.",
    "- If stuck, say BLOCKED_REQUEST and what human must decide.",
    `- Hub root: ${hubRoot}`,
  );

  return lines.join("\n");
}

function summarizePayload(m: PeerMessage): string {
  const p = m.payload;
  if (typeof p.text === "string") return p.text.slice(0, 500);
  if (typeof p.result === "string") return p.result.slice(0, 500);
  if (typeof p.goal === "string") return p.goal.slice(0, 300);
  return JSON.stringify(p).slice(0, 400);
}

export function buildCoworkPrompt(
  sessionId: string,
  goal: string,
  criteria: string[],
  peerMeta?: AgentMeta,
): string {
  const base = buildCollabPrompt(sessionId, peerMeta);
  return `${base}

## Cowork goal
${goal}

## Success criteria
${criteria.map((c) => `- ${c}`).join("\n")}

## Your turn
Decide the next action: reply to peer, send pattern_brief/design_export/alignment_request/verify_result, or BLOCKED_REQUEST.
`;
}
