import "dotenv/config";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getAgentMeta, probeAgent } from "./agent-runner/index.js";
import { findBridgeRoot, findHubRoot, getPairingMode, getPeerRole, getPeerPort, getSetupPort } from "./config.js";
import { createPairingOffer, detectLocalHost, listActiveOffers } from "./pairing.js";
import { writeEnv } from "./env-file.js";
import { getPackZip, installScript } from "./install-serve.js";
import { newMessage } from "./message-schema.js";
import { isPeerConfigured, isPeerHostSelfLoop, isPeerReachableConfigured, peerFetch, pingPeer, sendToPeer } from "./peer-client.js";
import { runQuickReadiness } from "./readiness-quick.js";
import { getBridgeVersion } from "./version.js";
import {
  advertisedGuestHostForHost,
  getPublicPeerBaseUrl,
  getPublicSetupBaseUrl,
  parsePeerEndpoint,
  resolveGuestJoinTarget,
  normalizePublicUrl,
} from "./peer-url.js";
import { diagnosePairJoinFailure, joinFetchErrorMessage } from "./pair-join-error.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");
const BRIDGE_ROOT = findBridgeRoot();

function send(res: ServerResponse, status: number, body: string, type = "application/json"): void {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
}

function readJson(req: IncomingMessage): Promise<Record<string, string>> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString()) as Record<string, string>);
      } catch {
        resolve({});
      }
    });
  });
}

function parsePeerHostInput(input: string, defaultPort?: number): { host: string; port: number } {
  const ep = parsePeerEndpoint(input, defaultPort);
  return { host: ep.hostname, port: ep.port };
}

function joinFetchError(err: unknown): string {
  return joinFetchErrorMessage(err);
}

function pairJoinErrorContext(
  hostInput: string,
  resolvedJoinUrl: string,
  extra?: { raw?: string; httpStatus?: number; fetchError?: string },
) {
  return diagnosePairJoinFailure({
    raw: extra?.raw ?? "",
    hostInput,
    resolvedJoinUrl,
    httpStatus: extra?.httpStatus,
    fetchError: extra?.fetchError,
    guestPublicUrl: advertisedGuestHostForHost(detectLocalHost(), getPeerPort()),
    guestSetupHint: normalizePublicUrl(
      process.env.PEER_SETUP_HINT_HOST ?? process.env.PEER_PUBLIC_SETUP_URL ?? "",
    ),
    bridgeVersion: getBridgeVersion(),
  });
}

async function readRawBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  req.on("data", (c) => chunks.push(c));
  return new Promise((resolve, reject) => {
    req.on("end", () => resolve(Buffer.concat(chunks).toString()));
    req.on("error", reject);
  });
}

export function startSetupServer(): void {
  const port = getSetupPort();

  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", `http://localhost:${port}`);

    if (url.pathname === "/" || url.pathname === "/setup") {
      const htmlPath = join(PUBLIC_DIR, "setup.html");
      if (existsSync(htmlPath)) {
        return send(res, 200, readFileSync(htmlPath, "utf8"), "text/html; charset=utf-8");
      }
      return send(res, 404, JSON.stringify({ error: "setup.html missing" }));
    }

    if (url.pathname === "/install.sh" && req.method === "GET") {
      const host =
        url.searchParams.get("host") ||
        req.headers.host?.split(":")[0] ||
        detectLocalHost();
      const forwarded = String(req.headers["x-forwarded-proto"] ?? "").toLowerCase();
      const cfVisitor = String(req.headers["cf-visitor"] ?? "");
      const https =
        forwarded.includes("https") ||
        cfVisitor.includes('"scheme":"https"') ||
        host.endsWith(".trycloudflare.com");
      const script = installScript(host, port, { https });
      res.writeHead(200, {
        "Content-Type": "text/x-shellscript; charset=utf-8",
        "Content-Disposition": 'inline; filename="install.sh"',
      });
      res.end(script);
      return;
    }

    // Quick tunnel: one trycloudflare URL → setup :3848 proxies all /v1/* → peer :3847
    if (url.pathname.startsWith("/v1/")) {
      const raw = await readRawBody(req);
      const peerPort = getPeerPort();
      const target = `http://127.0.0.1:${peerPort}${url.pathname}${url.search}`;
      const method = req.method ?? "GET";
      try {
        const fwd = await fetch(target, {
          method,
          headers: req.headers["content-type"]
            ? { "Content-Type": String(req.headers["content-type"]) }
            : undefined,
          body: method !== "GET" && method !== "HEAD" && raw ? raw : undefined,
          signal: AbortSignal.timeout(60_000),
        });
        const text = await fwd.text();
        const outHeaders: Record<string, string> = {};
        const ct = fwd.headers.get("content-type");
        if (ct) outHeaders["Content-Type"] = ct;
        res.writeHead(fwd.status, outHeaders);
        res.end(text);
      } catch (err) {
        const note = err instanceof Error ? err.message : String(err);
        return send(res, 502, JSON.stringify({ error: note }));
      }
      return;
    }

    if (url.pathname === "/pack.zip" && req.method === "GET") {
      try {
        const { buffer } = getPackZip();
        res.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Disposition": 'attachment; filename="agent-peer-bridge.zip"',
          "X-Peer-Bridge-Version": getBridgeVersion(),
        });
        res.end(buffer);
        return;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return send(res, 500, JSON.stringify({ error: msg }));
      }
    }

    if (url.pathname === "/api/detect" && req.method === "GET") {
      const { execSync } = await import("node:child_process");
      const which = (cmd: string) => {
        try {
          execSync(`which ${cmd}`, { stdio: "pipe" });
          return true;
        } catch {
          return false;
        }
      };
      const host = detectLocalHost();
      const setupPort = getSetupPort();
      const peerPort = getPeerPort();
      const publicSetup = getPublicSetupBaseUrl(host, setupPort);
      const publicPeer = getPublicPeerBaseUrl(host, peerPort);
      return send(
        res,
        200,
        JSON.stringify({
          host,
          setupPort,
          peerPort,
          publicSetupUrl: publicSetup,
          publicPeerUrl: publicPeer,
          tunnelMode: Boolean(process.env.PEER_PUBLIC_SETUP_URL?.trim()),
          hostPeerPort: Number(process.env.PEER_HOST_PEER_PORT ?? "3847") || 3847,
          hubRoot: findHubRoot(),
          cli: { cursor: which("cursor"), claude: which("claude"), codex: which("codex") },
          keys: {
            cursor: Boolean(process.env.CURSOR_API_KEY),
            anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
            openai: Boolean(process.env.OPENAI_API_KEY),
          },
          pairingMode: process.env.PEER_PAIRING_MODE ?? "",
          setupHintHost: process.env.PEER_SETUP_HINT_HOST ?? "",
          role: process.env.PEER_ROLE ?? "",
          agentProduct: process.env.AGENT_PRODUCT ?? "",
          agentMode: process.env.AGENT_MODE ?? "",
          paired: isPeerReachableConfigured(),
          peerHost: process.env.PEER_HOST ?? "",
          peerSelfLoop: isPeerHostSelfLoop(),
          installUrl: `${publicSetup}/install.sh`,
          curlCommand:
            publicPeer && publicPeer !== publicSetup
              ? `curl -fsSL ${publicSetup}/install.sh | bash -s -- ${publicSetup} ${publicPeer}`
              : `curl -fsSL ${publicSetup}/install.sh | bash -s -- ${publicSetup}`,
          activeOffers: listActiveOffers().map((o) => ({
            code: o.code,
            expiresAt: o.expiresAt,
          })),
          tailscale: which("tailscale"),
          bridgeVersion: getBridgeVersion(),
        }),
      );
    }

    if (url.pathname === "/api/version" && req.method === "GET") {
      const host = detectLocalHost();
      const setupPort = getSetupPort();
      return send(
        res,
        200,
        JSON.stringify({
          bridgeVersion: getBridgeVersion(),
          setupPort,
          peerPort: getPeerPort(),
          installUrl: `http://${host}:${setupPort}/install.sh`,
          packUrl: `http://${host}:${setupPort}/pack.zip`,
        }),
      );
    }

    if (url.pathname === "/api/sync-from-host" && req.method === "POST") {
      const body = await readJson(req);
      const host = (body.host ?? process.env.PEER_SETUP_HINT_HOST ?? "").trim();
      if (!host) {
        return send(res, 400, JSON.stringify({ error: "ต้องใส่ IP Host" }));
      }
      try {
        const { execSync } = await import("node:child_process");
        const script = join(BRIDGE_ROOT, "scripts", "peer-sync-from-host.sh");
        const raw = execSync(`JSON=1 bash "${script}" "${host}"`, {
          encoding: "utf8",
          cwd: BRIDGE_ROOT,
          timeout: 180_000,
          env: { ...process.env, JSON: "1" },
        });
        const line = raw.trim().split("\n").pop() ?? "{}";
        const data = JSON.parse(line) as Record<string, unknown>;
        return send(res, 200, JSON.stringify(data));
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return send(res, 500, JSON.stringify({ error: msg }));
      }
    }

    if (url.pathname === "/api/probe" && req.method === "POST") {
      const body = await readJson(req);
      if (body.product) process.env.AGENT_PRODUCT = body.product;
      if (body.mode) process.env.AGENT_MODE = body.mode;
      const result = await probeAgent();
      return send(res, result.ok ? 200 : 503, JSON.stringify(result));
    }

    if (url.pathname === "/api/readiness" && req.method === "GET") {
      try {
        const result = await runQuickReadiness();
        return send(res, 200, JSON.stringify(result));
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return send(res, 500, JSON.stringify({ error: msg }));
      }
    }

    if (url.pathname === "/api/config" && req.method === "POST") {
      const body = await readJson(req);
      writeEnv(body);
      return send(res, 200, JSON.stringify({ ok: true }));
    }

    if (url.pathname === "/api/pairing/create" && req.method === "POST") {
      const body = await readJson(req);
      const offer = createPairingOffer({
        port: getPeerPort(),
        role: body.role ?? getPeerRole(),
        product: body.product ?? getAgentMeta().product,
        mode: body.mode ?? getAgentMeta().mode,
      });
      if (body.token) writeEnv({ PEER_SHARED_TOKEN: offer.token });
      writeEnv({
        PEER_PAIRING_MODE: "host",
        PEER_ROLE: body.role ?? getPeerRole(),
        PEER_HOST: "",
      });
      return send(res, 201, JSON.stringify(offer));
    }

    if (url.pathname === "/api/pairing/join" && req.method === "POST") {
      const body = await readJson(req);
      const code = (body.code ?? "").trim();
      let hostInput = resolveGuestJoinTarget(body.host ?? "");
      if (!hostInput || !code) {
        return send(res, 400, JSON.stringify({ error: "ต้องใส่ Host URL และรหัส 6 หลัก" }));
      }
      if (!/^\d{6}$/.test(code)) {
        return send(res, 400, JSON.stringify({ error: "รหัสต้องเป็นตัวเลข 6 หลัก" }));
      }
      const peerEndpoint = parsePeerEndpoint(
        hostInput,
        Number(process.env.PEER_HOST_PEER_PORT ?? "3847") || getPeerPort(),
      );
      if (!peerEndpoint.baseUrl) {
        return send(res, 400, JSON.stringify({ error: "Host URL ไม่ถูกต้อง — ใส่ https://…trycloudflare.com" }));
      }
      const joinUrl = `${peerEndpoint.baseUrl}/v1/pairing/join`;
      let joinRes: Response;
      try {
        joinRes = await fetch(joinUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            guestHost: detectLocalHost(),
            guestPort: getPeerPort(),
            guestPublicUrl: advertisedGuestHostForHost(detectLocalHost(), getPeerPort()),
          }),
          signal: AbortSignal.timeout(15_000),
        });
      } catch (err) {
        const fetchMsg = joinFetchError(err);
        return send(
          res,
          504,
          JSON.stringify(
            pairJoinErrorContext(body.host ?? hostInput, joinUrl, { raw: fetchMsg, fetchError: fetchMsg }),
          ),
        );
      }
      const rawText = await joinRes.text();
      let data: Record<string, string>;
      try {
        data = rawText ? (JSON.parse(rawText) as Record<string, string>) : {};
      } catch {
        return send(
          res,
          502,
          JSON.stringify(
            pairJoinErrorContext(body.host ?? hostInput, joinUrl, {
              raw: rawText.slice(0, 800),
              httpStatus: joinRes.status,
            }),
          ),
        );
      }
      if (!joinRes.ok) {
        const raw = String(data.error ?? data.message ?? rawText).slice(0, 800);
        return send(
          res,
          joinRes.status,
          JSON.stringify(pairJoinErrorContext(body.host ?? hostInput, joinUrl, { raw, httpStatus: joinRes.status })),
        );
      }
      writeEnv({
        PEER_HOST: data.peerHost,
        PEER_SHARED_TOKEN: data.token,
        PEER_PAIRING_MODE: "guest",
        PEER_ROLE: body.role ?? "designer",
      });
      return send(res, 200, JSON.stringify(data));
    }

    if (url.pathname === "/api/peer/status" && req.method === "GET") {
      const peerPort = getPeerPort();
      const paired = isPeerReachableConfigured();
      const selfLoop = isPeerHostSelfLoop();
      let localBridge = "down";
      let localHealth: Record<string, unknown> | null = null;
      try {
        const hres = await fetch(`http://127.0.0.1:${peerPort}/health`, {
          signal: AbortSignal.timeout(3000),
        });
        localBridge = hres.ok ? "ok" : "warn";
        if (hres.ok) localHealth = (await hres.json()) as Record<string, unknown>;
      } catch {
        localBridge = "down";
      }

      let peerLink = "unpaired";
      let peerHealth: Record<string, unknown> | null = null;
      const peerHost = process.env.PEER_HOST?.trim() ?? "";
      if (paired) {
        const ping = await pingPeer();
        peerLink = ping.ok ? "ok" : "down";
        if (ping.ok) {
          try {
            const base = peerHost.startsWith("http") ? peerHost : `http://${peerHost}`;
            const ph = await fetch(`${base.replace(/\/$/, "")}/health`, {
              headers: { Authorization: `Bearer ${process.env.PEER_SHARED_TOKEN ?? ""}` },
              signal: AbortSignal.timeout(4000),
            });
            if (ph.ok) peerHealth = (await ph.json()) as Record<string, unknown>;
          } catch {
            /* ping ok but health optional */
          }
        }
      }

      const overall =
        localBridge !== "ok"
          ? "local_down"
          : selfLoop
            ? "peer_misconfigured"
          : !paired
            ? getPairingMode() === "host" && isPeerConfigured()
              ? "peer_misconfigured"
              : "unpaired"
            : peerLink === "ok"
              ? "connected"
              : "peer_down";

      return send(
        res,
        200,
        JSON.stringify({
          overall,
          localBridge,
          paired,
          peerSelfLoop: selfLoop,
          peerHost,
          peerLink,
          localHealth,
          peerHealth,
          pairingMode: process.env.PEER_PAIRING_MODE ?? "",
          checkedAt: new Date().toISOString(),
        }),
      );
    }

    if (url.pathname === "/api/peer/send" && req.method === "POST") {
      const body = await readJson(req);
      const text = (body.text ?? "").trim();
      const target = body.target === "local" ? "local" : "peer";
      const sessionId = (body.sessionId ?? "default").trim() || "default";
      if (!text) return send(res, 400, JSON.stringify({ error: "ใส่ข้อความ prompt" }));

      const msg = newMessage({
        sessionId,
        from: {
          role: getPeerRole(),
          host: detectLocalHost(),
          agent: getAgentMeta(),
        },
        type: "message",
        payload: { text },
      });

      if (target === "local") {
        const peerPort = getPeerPort();
        const token = process.env.PEER_SHARED_TOKEN?.trim();
        try {
          const localRes = await fetch(`http://127.0.0.1:${peerPort}/v1/sessions/${sessionId}/messages`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(msg),
            signal: AbortSignal.timeout(10_000),
          });
          const data = await localRes.json();
          if (!localRes.ok) return send(res, localRes.status, JSON.stringify(data));
          return send(res, 202, JSON.stringify({ accepted: true, id: msg.id, target: "local", ...data }));
        } catch (err) {
          const note = err instanceof Error ? err.message : String(err);
          return send(res, 503, JSON.stringify({ error: `ส่งไม่สำเร็จ: ${note}` }));
        }
      }

      if (!isPeerReachableConfigured()) {
        if (isPeerHostSelfLoop()) {
          return send(res, 400, JSON.stringify({
            error: "PEER_HOST ชี้เครื่องตัวเอง — ให้ Guest join ใหม่ (สร้างรหัสขั้น 3 แล้ว Guest ใส่รหัส)",
          }));
        }
        return send(res, 400, JSON.stringify({ error: "ยังไม่ pair — ทำขั้น 3 ก่อน" }));
      }
      const sent = await sendToPeer(msg);
      if (!sent.ok) return send(res, sent.status || 502, JSON.stringify({ error: sent.error }));
      return send(res, 202, JSON.stringify({ accepted: true, id: msg.id, target: "peer" }));
    }

    if (url.pathname === "/api/peer/messages" && req.method === "GET") {
      const sessionId = url.searchParams.get("sessionId")?.trim() || "default";
      const since = url.searchParams.get("since") ?? undefined;
      const source = url.searchParams.get("source") === "local" ? "local" : "peer";
      const timeout = Number(url.searchParams.get("timeout") ?? "0");

      if (source === "local") {
        const peerPort = getPeerPort();
        const token = process.env.PEER_SHARED_TOKEN?.trim();
        const q = new URLSearchParams();
        if (since) q.set("since", since);
        if (timeout > 0) q.set("timeout", String(Math.min(timeout, 30_000)));
        try {
          const localRes = await fetch(
            `http://127.0.0.1:${peerPort}/v1/sessions/${sessionId}/messages?${q}`,
            {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
              signal: AbortSignal.timeout(Math.min(timeout || 5000, 35_000) + 5000),
            },
          );
          const data = await localRes.json();
          return send(res, localRes.ok ? 200 : localRes.status, JSON.stringify(data));
        } catch (err) {
          const note = err instanceof Error ? err.message : String(err);
          return send(res, 503, JSON.stringify({ error: note, messages: [] }));
        }
      }

      if (!isPeerConfigured()) {
        return send(res, 200, JSON.stringify({ messages: [] }));
      }
      const q = new URLSearchParams();
      if (since) q.set("since", since);
      if (timeout > 0) q.set("timeout", String(Math.min(timeout, 30_000)));
      const polled = await peerFetch<{ messages?: unknown[] }>(
        `/v1/sessions/${sessionId}/messages?${q}`,
      );
      if (!polled.ok) return send(res, polled.status || 502, JSON.stringify({ error: polled.error, messages: [] }));
      return send(res, 200, JSON.stringify(polled.data));
    }

    if (url.pathname === "/api/peer/human-resume" && req.method === "POST") {
      const body = await readJson(req);
      const sessionId = (body.sessionId ?? "default").trim() || "default";
      const decision = body.decision === "reject" ? "reject" : "approve";
      const inReplyTo = (body.messageId ?? "").trim();
      const note = (body.note ?? "").trim();
      const peerPort = getPeerPort();
      const token = process.env.PEER_SHARED_TOKEN?.trim();

      const msg = newMessage({
        sessionId,
        from: { role: getPeerRole(), host: detectLocalHost(), agent: getAgentMeta() },
        type: "human_resume",
        payload: {
          decision,
          approved: decision === "approve",
          inReplyTo,
          note,
        },
      });

      try {
        await fetch(`http://127.0.0.1:${peerPort}/v1/sessions/${sessionId}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(msg),
          signal: AbortSignal.timeout(10_000),
        });
      } catch (err) {
        const noteErr = err instanceof Error ? err.message : String(err);
        return send(res, 503, JSON.stringify({ error: `บันทึกไม่สำเร็จ: ${noteErr}` }));
      }

      if (isPeerReachableConfigured()) {
        const sent = await sendToPeer(msg);
        if (!sent.ok) {
          return send(res, sent.status || 502, JSON.stringify({ error: sent.error }));
        }
      }

      let resume: Record<string, unknown> | null = null;
      if (decision === "approve") {
        try {
          const sessionRes = await fetch(`http://127.0.0.1:${peerPort}/v1/sessions/${sessionId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            signal: AbortSignal.timeout(5000),
          });
          const session = sessionRes.ok
            ? ((await sessionRes.json()) as { coworkLeaderHost?: string })
            : {};
          const localHost = detectLocalHost();
          const isLeader =
            !session.coworkLeaderHost || session.coworkLeaderHost === localHost;
          if (isLeader) {
            const resumeRes = await fetch(
              `http://127.0.0.1:${peerPort}/v1/sessions/${sessionId}/cowork/resume`,
              {
                method: "POST",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                signal: AbortSignal.timeout(120_000),
              },
            );
            resume = (await resumeRes.json()) as Record<string, unknown>;
            if (!resumeRes.ok) {
              return send(res, resumeRes.status, JSON.stringify({ error: resume, decision }));
            }
          }
        } catch (err) {
          const noteErr = err instanceof Error ? err.message : String(err);
          return send(res, 503, JSON.stringify({ error: noteErr, decision, forwarded: true }));
        }
      }

      return send(
        res,
        200,
        JSON.stringify({ ok: true, decision, messageId: msg.id, resume }),
      );
    }

    return send(res, 404, JSON.stringify({ error: "Not found" }));
  });

  const bind = process.env.PEER_SETUP_BIND?.trim() || "0.0.0.0";
  server.listen(port, bind, () => {
    const ip = detectLocalHost();
    console.log(`[peer-bridge] setup UI http://127.0.0.1:${port}/setup`);
    console.log(`[peer-bridge] remote install: curl -fsSL http://${ip}:${port}/install.sh | bash`);
  });
}
