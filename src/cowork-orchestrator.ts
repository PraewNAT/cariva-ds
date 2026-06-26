import { spawn } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runAgent } from "./agent-runner/index.js";
import { buildCoworkPrompt } from "./collab-handler.js";
import { getCoworkMaxRounds, getCoworkPollMs } from "./config.js";
import { criteriaSatisfied } from "./cowork-criteria.js";
import type { CoworkCriteria, PeerMessage, SessionState } from "./message-schema.js";
import { newMessage } from "./message-schema.js";
import { pollPeerMessages, sendToPeer } from "./peer-client.js";
import {
  appendMessage,
  getSession,
  getThread,
  updateSession,
} from "./session-store.js";
import { detectLocalHost } from "./pairing.js";
import { getAgentMeta } from "./agent-runner/index.js";
import { getPeerRole } from "./config.js";

export type CoworkOutcome = {
  status: "done" | "blocked" | "error";
  sessionId: string;
  rounds: number;
  summary: string;
};

const activeLoops = new Map<string, boolean>();

export function isCoworkActive(sessionId: string): boolean {
  return activeLoops.get(sessionId) === true;
}

export function stopCowork(sessionId: string): void {
  activeLoops.set(sessionId, false);
}

function hostLabel(): string {
  return detectLocalHost();
}

function evaluateDone(thread: PeerMessage[], criteria: string[]): boolean {
  if (criteriaSatisfied(thread, criteria)) return true;

  const last = [...thread].reverse();
  if (last.find((m) => m.type === "cowork_done")) return true;

  if (criteria.length === 0) {
    if (last.find((m) => m.type === "verify_result" && m.payload.status === "pass")) return true;
    if (last.find((m) => m.type === "alignment_memo" && m.payload.status === "approved")) return true;
  }

  return false;
}

function isStuck(thread: PeerMessage[]): boolean {
  if (thread.length < 6) return false;
  const recent = thread.slice(-3).map((m) => summarize(m));
  return recent[0] === recent[1] && recent[1] === recent[2];
}

function summarize(m: PeerMessage): string {
  return `${m.type}:${JSON.stringify(m.payload).slice(0, 100)}`;
}

export async function startCoworkLoop(
  sessionId: string,
  criteria: CoworkCriteria,
): Promise<CoworkOutcome> {
  const session = getSession(sessionId);
  if (!session) {
    return { status: "error", sessionId, rounds: 0, summary: "session not found" };
  }

  const localHost = hostLabel();
  if (
    session.coworkLeaderHost &&
    session.coworkLeaderHost !== localHost &&
    isCoworkActive(sessionId)
  ) {
    return {
      status: "error",
      sessionId,
      rounds: 0,
      summary: `Cowork led by ${session.coworkLeaderHost}`,
    };
  }

  activeLoops.set(sessionId, true);
  updateSession(sessionId, {
    state: "coworking",
    goal: criteria.goal,
    criteria,
    coworkActive: true,
    coworkLeaderHost: localHost,
    round: 0,
  });

  const maxRounds = criteria.maxRounds || getCoworkMaxRounds();
  const pollMs = getCoworkPollMs();
  const meta = getAgentMeta();
  const role = getPeerRole();

  const startMsg = newMessage({
    sessionId,
    from: { role, host: hostLabel(), agent: meta },
    type: "cowork_start",
    payload: { goal: criteria.goal, criteria: criteria.criteria, maxRounds },
  });
  appendMessage(startMsg);
  await sendToPeer(startMsg);

  let lastPeerId: string | undefined;
  let rounds = 0;

  while (activeLoops.get(sessionId) && rounds < maxRounds) {
    rounds++;
    updateSession(sessionId, { round: rounds, state: "coworking" });

    const thread = getThread(sessionId);
    if (evaluateDone(thread, criteria.criteria)) {
      updateSession(sessionId, { state: "done", coworkActive: false });
      activeLoops.delete(sessionId);
      const doneMsg = newMessage({
        sessionId,
        from: { role, host: hostLabel(), agent: meta },
        type: "cowork_done",
        payload: { rounds, summary: "Success criteria met" },
      });
      appendMessage(doneMsg);
      await sendToPeer(doneMsg);
      return { status: "done", sessionId, rounds, summary: "Success criteria met" };
    }

    if (isStuck(thread)) {
      updateSession(sessionId, { state: "blocked", coworkActive: false });
      activeLoops.delete(sessionId);
      return { status: "blocked", sessionId, rounds, summary: "Stuck — repeated messages" };
    }

    // Wait for peer messages
    updateSession(sessionId, { state: "waiting_peer" });
    const peerMsgs = await pollPeerMessages(sessionId, lastPeerId, pollMs * 8);
    for (const pm of peerMsgs) {
      appendMessage(pm);
      lastPeerId = pm.id;
      if (pm.type === "design_export" && role === "developer") {
        void runShowcaseVerify(sessionId);
      }
    }

    updateSession(sessionId, { state: "coworking" });

    const prompt = buildCoworkPrompt(sessionId, criteria.goal, criteria.criteria, session.pairedPeer);
    const agentResult = await runAgent(prompt, { jobLabel: `cowork:${sessionId}:${rounds}` });

    const replyMsg = newMessage({
      sessionId,
      from: { role, host: hostLabel(), agent: meta },
      type: agentResult.status === "ok" ? "agent_reply" : "blocked_request",
      payload: {
        result: agentResult.result,
        error: agentResult.error,
        round: rounds,
      },
    });
    appendMessage(replyMsg);
    await sendToPeer(replyMsg);

    const turnMsg = newMessage({
      sessionId,
      from: { role, host: hostLabel() },
      type: "cowork_turn",
      payload: { round: rounds, phase: "local_replied" },
    });
    appendMessage(turnMsg);

    if (agentResult.result?.includes("BLOCKED_REQUEST")) {
      updateSession(sessionId, { state: "blocked", coworkActive: false });
      activeLoops.delete(sessionId);
      return { status: "blocked", sessionId, rounds, summary: agentResult.result.slice(0, 500) };
    }

    await new Promise((r) => setTimeout(r, pollMs));
  }

  updateSession(sessionId, { state: "blocked", coworkActive: false });
  activeLoops.delete(sessionId);
  return { status: "blocked", sessionId, rounds, summary: `Max rounds (${maxRounds}) reached` };
}

export async function resumeCowork(sessionId: string): Promise<CoworkOutcome> {
  const session = getSession(sessionId);
  if (!session?.criteria) {
    return { status: "error", sessionId, rounds: 0, summary: "No criteria to resume" };
  }
  return startCoworkLoop(sessionId, session.criteria);
}

export function getCoworkStatus(sessionId: string): {
  state: SessionState;
  round: number;
  active: boolean;
  goal?: string;
} {
  const s = getSession(sessionId);
  return {
    state: s?.state ?? "paired",
    round: s?.round ?? 0,
    active: isCoworkActive(sessionId),
    goal: s?.goal,
  };
}

function runShowcaseVerify(sessionId: string): Promise<void> {
  const bridgeDir = join(dirname(fileURLToPath(import.meta.url)), "..");
  const script = join(bridgeDir, "scripts", "peer-verify-showcase.sh");
  const env: NodeJS.ProcessEnv = { ...process.env, SESSION: sessionId };
  const explicit =
    process.env.SHOWCASE_PATH?.trim() || process.env.SHOWCASE?.trim();
  if (explicit) env.SHOWCASE = explicit;

  return new Promise((resolve) => {
    const child = spawn(script, [], {
      cwd: bridgeDir,
      env,
      stdio: "inherit",
      shell: true,
    });
    child.on("close", () => resolve());
    child.on("error", () => resolve());
  });
}
