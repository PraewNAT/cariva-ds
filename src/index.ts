import "dotenv/config";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getAgentMeta, probeAgent, runAgent } from "./agent-runner/index.js";
import { buildCollabPrompt } from "./collab-handler.js";
import {
  getCoworkStatus,
  isCoworkActive,
  resumeCowork,
  startCoworkLoop,
  stopCowork,
} from "./cowork-orchestrator.js";
import {
  findHubRoot,
  getPeerPort,
  getPeerRole,
  getSetupPort,
  getSharedToken,
} from "./config.js";
import { startHealthReporter } from "./health-file.js";
import { getBridgeVersion } from "./version.js";
import { advertisedPeerHostForGuest } from "./peer-url.js";
import { newMessage, type PeerMessage } from "./message-schema.js";
import { isPeerConfigured, sendToPeer } from "./peer-client.js";
import {
  consumePairingCode,
  createPairingOffer,
  detectLocalHost,
  listActiveOffers,
} from "./pairing.js";
import {
  appendMessage,
  createSession,
  getDefaultSession,
  getMessages,
  getSession,
  getThread,
  listSessions,
  updateSession,
} from "./session-store.js";
import { startSetupServer } from "./setup-server.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw.trim()) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function unauthorized(res: ServerResponse): void {
  sendJson(res, 401, { error: "Unauthorized" });
}

function notConfigured(res: ServerResponse): void {
  sendJson(res, 503, {
    error: "PEER_SHARED_TOKEN not configured — complete setup at /setup or make peer-wizard",
  });
}

function isPublicPath(path: string, method: string): boolean {
  if (path === "/health") return true;
  if (path === "/v1/pairing/join" && method === "POST") return true;
  if (path.startsWith("/v1/pairing/offers")) return true;
  return false;
}

function checkAuth(req: IncomingMessage, path: string): boolean {
  if (isPublicPath(path, req.method ?? "GET")) return true;
  const token = getSharedToken();
  if (!token) return false;
  const auth = req.headers.authorization ?? "";
  return auth === `Bearer ${token}`;
}

async function handleAgentForMessage(msg: PeerMessage): Promise<void> {
  if (msg.type !== "message" && msg.type !== "cowork_start" && msg.type !== "agent_reply") {
    return;
  }

  const prompt =
    msg.type === "cowork_start"
      ? buildCollabPrompt(msg.sessionId, msg.from.agent)
      : `${buildCollabPrompt(msg.sessionId, msg.from.agent)}\n\nPeer says: ${String(msg.payload.text ?? msg.payload.goal ?? "")}`;

  const result = await runAgent(prompt, { jobLabel: `inbound:${msg.type}` });
  const meta = getAgentMeta();
  const reply = newMessage({
    sessionId: msg.sessionId,
    from: { role: getPeerRole(), host: detectLocalHost(), agent: meta },
    type: result.status === "ok" ? "agent_reply" : "blocked_request",
    payload: { result: result.result, error: result.error, inReplyTo: msg.id },
  });
  appendMessage(reply);
  if (isPeerConfigured()) {
    void sendToPeer(reply).catch(console.error);
  }
}

export function createPeerServer(): ReturnType<typeof createServer> {
  return createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
    const path = url.pathname;

    if (path === "/health") {
      const sessions = listSessions();
      return sendJson(res, 200, {
        ok: true,
        bridgeVersion: getBridgeVersion(),
        host: detectLocalHost(),
        role: getPeerRole(),
        paired: isPeerConfigured(),
        peerHost: process.env.PEER_HOST ?? null,
        agent: getAgentMeta(),
        sessions: sessions.length,
        coworkActive: sessions.some((s) => isCoworkActive(s.id)),
      });
    }

    // Pairing join is public — the 6-digit code is the credential
    if (path === "/v1/pairing/join" && req.method === "POST") {
      const body = (await readJsonBody(req)) as {
        code?: string;
        guestHost?: string;
        guestPort?: number;
        guestPublicUrl?: string;
      };
      const offer = consumePairingCode(body.code ?? "");
      if (!offer) return sendJson(res, 404, { error: "Invalid or expired code" });

      const guestPublic = body.guestPublicUrl?.trim();
      const guestHost = body.guestHost?.trim();
      const guestPort = Number(body.guestPort);
      if (guestPublic) {
        const { writeEnv } = await import("./env-file.js");
        writeEnv({ PEER_HOST: guestPublic, PEER_SHARED_TOKEN: offer.token });
      } else if (guestHost && Number.isFinite(guestPort) && guestPort > 0) {
        const { writeEnv } = await import("./env-file.js");
        writeEnv({ PEER_HOST: `${guestHost}:${guestPort}`, PEER_SHARED_TOKEN: offer.token });
      }

      return sendJson(res, 200, {
        peerHost: advertisedPeerHostForGuest(offer.host, offer.port),
        token: offer.token,
        hostRole: offer.role,
        hostAgent: offer.agent,
        bridgeVersion: getBridgeVersion(),
      });
    }

    if (!checkAuth(req, path)) {
      if (!getSharedToken()) return notConfigured(res);
      return unauthorized(res);
    }

    if (path === "/v1/pairing/offers" && req.method === "POST") {
      const body = (await readJsonBody(req)) as { role?: string; product?: string; mode?: string };
      const offer = createPairingOffer({
        port: getPeerPort(),
        role: body.role ?? getPeerRole(),
        product: body.product ?? getAgentMeta().product,
        mode: body.mode ?? getAgentMeta().mode,
      });
      return sendJson(res, 201, offer);
    }

    if (path === "/v1/pairing/offers" && req.method === "GET") {
      return sendJson(res, 200, { offers: listActiveOffers() });
    }

    if (path === "/v1/probe" && req.method === "POST") {
      const result = await probeAgent();
      return sendJson(res, result.ok ? 200 : 503, result);
    }

    if (path === "/v1/sessions" && req.method === "POST") {
      const body = (await readJsonBody(req)) as { id?: string };
      const session = createSession(body.id);
      return sendJson(res, 201, session);
    }

    if (path === "/v1/sessions" && req.method === "GET") {
      return sendJson(res, 200, { sessions: listSessions() });
    }

    const sessionMatch = path.match(/^\/v1\/sessions\/([^/]+)$/);
    if (sessionMatch && req.method === "GET") {
      const session = getSession(sessionMatch[1]);
      if (!session) return sendJson(res, 404, { error: "Not found" });
      return sendJson(res, 200, session);
    }

    const msgMatch = path.match(/^\/v1\/sessions\/([^/]+)\/messages$/);
    if (msgMatch) {
      const sessionId = msgMatch[1];

      if (req.method === "GET") {
        const since = url.searchParams.get("since") ?? undefined;
        const timeout = Number(url.searchParams.get("timeout") ?? "0");
        if (timeout > 0) {
          const deadline = Date.now() + timeout;
          while (Date.now() < deadline) {
            const msgs = getMessages(sessionId, since);
            if (msgs.length > 0) return sendJson(res, 200, { messages: msgs });
            await new Promise((r) => setTimeout(r, 500));
          }
        }
        return sendJson(res, 200, { messages: getMessages(sessionId, since) });
      }

      if (req.method === "POST") {
        let session = getSession(sessionId);
        if (!session && sessionId !== "ping") {
          session = createSession(sessionId);
        }

        const body = (await readJsonBody(req)) as PeerMessage;
        const msg = newMessage({
          ...body,
          sessionId,
          from: body.from ?? { role: getPeerRole(), host: detectLocalHost(), agent: getAgentMeta() },
        });

        if (msg.type === "pong" || msg.type === "ping") {
          appendMessage(msg);
          if (msg.type === "ping") {
            const pong = newMessage({
              sessionId,
              from: { role: getPeerRole(), host: detectLocalHost(), agent: getAgentMeta() },
              type: "pong",
              payload: {},
            });
            appendMessage(pong);
            return sendJson(res, 200, pong);
          }
          return sendJson(res, 200, msg);
        }

        if (msg.type === "handshake") {
          appendMessage(msg);
          updateSession(sessionId, {
            pairedPeer: {
              role: msg.from.role,
              host: msg.from.host,
              product: msg.from.agent?.product ?? "unknown",
              mode: msg.from.agent?.mode ?? "unknown",
              capabilities: msg.from.agent?.capabilities ?? [],
            },
          });
          const ack = newMessage({
            sessionId,
            from: { role: getPeerRole(), host: detectLocalHost(), agent: getAgentMeta() },
            type: "handshake",
            payload: { ack: true },
          });
          appendMessage(ack);
          return sendJson(res, 200, ack);
        }

        appendMessage(msg);

        if (msg.type === "human_resume") {
          const approved =
            msg.payload.approved === true || msg.payload.decision === "approve";
          const session = getSession(sessionId);
          const localHost = detectLocalHost();
          const isLeader =
            !session?.coworkLeaderHost || session.coworkLeaderHost === localHost;
          if (approved && isLeader && session?.criteria) {
            void resumeCowork(sessionId).catch(console.error);
          } else if (!approved) {
            updateSession(sessionId, { state: "blocked", coworkActive: false });
          }
          return sendJson(res, 202, { accepted: true, approved, isLeader });
        }

        if (msg.type === "cowork_start" && msg.payload.goal) {
          const criteria = {
            goal: String(msg.payload.goal),
            criteria: (msg.payload.criteria as string[]) ?? [],
            maxRounds: Number(msg.payload.maxRounds) || 20,
          };
          const leaderHost = msg.from.host;
          updateSession(sessionId, {
            criteria,
            goal: criteria.goal,
            coworkLeaderHost: leaderHost,
          });
          // Follower: respond to start; only the initiator runs the orchestrator loop.
          if (leaderHost !== detectLocalHost()) {
            void handleAgentForMessage(msg).catch(console.error);
            return sendJson(res, 202, { accepted: true, follower: true, leaderHost });
          }
          void startCoworkLoop(sessionId, criteria);
          return sendJson(res, 202, { accepted: true, sessionId });
        }

        void handleAgentForMessage(msg).catch(console.error);
        return sendJson(res, 202, { accepted: true, id: msg.id });
      }
    }

    const coworkStart = path.match(/^\/v1\/sessions\/([^/]+)\/cowork$/);
    if (coworkStart && req.method === "POST") {
      const sessionId = coworkStart[1];
      const body = (await readJsonBody(req)) as {
        goal?: string;
        criteria?: string[];
        maxRounds?: number;
      };
      let session = getSession(sessionId);
      if (!session) session = createSession(sessionId);

      const localHost = detectLocalHost();
      if (
        session.coworkLeaderHost &&
        session.coworkLeaderHost !== localHost &&
        isCoworkActive(sessionId)
      ) {
        return sendJson(res, 409, {
          error: "Cowork already active on peer",
          leaderHost: session.coworkLeaderHost,
        });
      }

      const criteria = {
        goal: body.goal ?? "Collaborate until done",
        criteria: body.criteria ?? [],
        maxRounds: body.maxRounds ?? 20,
      };

      void startCoworkLoop(sessionId, criteria);
      return sendJson(res, 202, { accepted: true, sessionId, criteria });
    }

    const coworkStop = path.match(/^\/v1\/sessions\/([^/]+)\/cowork\/stop$/);
    if (coworkStop && req.method === "POST") {
      stopCowork(coworkStop[1]);
      return sendJson(res, 200, { stopped: true });
    }

    const coworkResume = path.match(/^\/v1\/sessions\/([^/]+)\/cowork\/resume$/);
    if (coworkResume && req.method === "POST") {
      const outcome = await resumeCowork(coworkResume[1]);
      return sendJson(res, 200, outcome);
    }

    const coworkStatus = path.match(/^\/v1\/sessions\/([^/]+)\/cowork\/status$/);
    if (coworkStatus && req.method === "GET") {
      return sendJson(res, 200, getCoworkStatus(coworkStatus[1]));
    }

    if (path === "/v1/status" && req.method === "GET") {
      const defaultSession = getDefaultSession();
      return sendJson(res, 200, {
        health: "ok",
        hubRoot: findHubRoot(),
        thread: getThread(defaultSession.id).length,
        cowork: getCoworkStatus(defaultSession.id),
      });
    }

    return sendJson(res, 404, { error: "Not found" });
  });
}

export function startPeerBridge(): void {
  const port = getPeerPort();
  const server = createPeerServer();
  getDefaultSession();

  startHealthReporter(() => ({
    port,
    paired: isPeerConfigured(),
    peerHost: process.env.PEER_HOST,
    sessions: listSessions().length,
    coworkActive: listSessions().some((s) => isCoworkActive(s.id)),
  }));

  startSetupServer();

  server.listen(port, () => {
    console.log(`[peer-bridge] listening on :${port} (setup :${getSetupPort()})`);
    console.log(`[peer-bridge] role=${getPeerRole()} agent=${getAgentMeta().product}/${getAgentMeta().mode}`);
  });
}

startPeerBridge();
