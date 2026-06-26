import { networkInterfaces } from "node:os";
import { getPeerPort, getSharedToken } from "./config.js";
import { detectLocalHost } from "./pairing.js";
import type { PeerMessage } from "./message-schema.js";

export type PeerClientResult<T = unknown> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; error: string };

export function parsePeerHostAddress(raw: string): { host: string; port: number } | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  let hostPort = trimmed.replace(/^https?:\/\//i, "").split("/")[0] ?? "";
  if (!hostPort) return null;
  if (hostPort.includes(":")) {
    const [host, portStr] = hostPort.split(":");
    const port = Number(portStr);
    return {
      host: host ?? "",
      port: Number.isFinite(port) && port > 0 ? port : getPeerPort(),
    };
  }
  return { host: hostPort, port: getPeerPort() };
}

export function localPeerAddresses(): Set<string> {
  const addrs = new Set(["127.0.0.1", "localhost", "::1", detectLocalHost()]);
  for (const nets of Object.values(networkInterfaces())) {
    for (const net of nets ?? []) {
      if (net.family === "IPv4") addrs.add(net.address);
    }
  }
  return addrs;
}

/** PEER_HOST points at this machine's own peer port (Host paired wrong → runs agent locally). */
export function isPeerHostSelfLoop(): boolean {
  const parsed = parsePeerHostAddress(process.env.PEER_HOST ?? "");
  if (!parsed) return false;
  if (parsed.port !== getPeerPort()) return false;
  return localPeerAddresses().has(parsed.host);
}

export function isPeerConfigured(): boolean {
  return Boolean(process.env.PEER_HOST?.trim() && getSharedToken());
}

export function isPeerReachableConfigured(): boolean {
  return isPeerConfigured() && !isPeerHostSelfLoop();
}

function peerBaseUrl(): string | null {
  const host = process.env.PEER_HOST?.trim();
  if (!host) return null;
  if (host.startsWith("http://") || host.startsWith("https://")) return host.replace(/\/$/, "");
  return `http://${host}`;
}

function authHeaders(): Record<string, string> {
  const token = getSharedToken();
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export async function peerFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<PeerClientResult<T>> {
  const base = peerBaseUrl();
  if (!base) return { ok: false, status: 0, error: "PEER_HOST not configured" };

  try {
    const res = await fetch(`${base}${path}`, {
      ...init,
      headers: { ...authHeaders(), ...(init?.headers as Record<string, string>) },
    });
    const text = await res.text();
    let data: T;
    try {
      data = text ? (JSON.parse(text) as T) : ({} as T);
    } catch {
      return { ok: false, status: res.status, error: text || res.statusText };
    }
    if (!res.ok) {
      const err = (data as { error?: string })?.error ?? res.statusText;
      return { ok: false, status: res.status, error: err };
    }
    return { ok: true, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function sendToPeer(msg: PeerMessage): Promise<PeerClientResult<PeerMessage>> {
  if (isPeerHostSelfLoop()) {
    return { ok: false, status: 400, error: "PEER_HOST points to this machine — re-pair Guest" };
  }
  return peerFetch<PeerMessage>(`/v1/sessions/${msg.sessionId}/messages`, {
    method: "POST",
    body: JSON.stringify(msg),
  });
}

export async function pingPeer(): Promise<PeerClientResult<{ type: string }>> {
  const sessionId = "ping";
  return peerFetch(`/v1/sessions/${sessionId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      id: crypto.randomUUID(),
      sessionId,
      from: { role: "local", host: "self" },
      type: "ping",
      payload: {},
      createdAt: new Date().toISOString(),
    }),
  });
}

export async function pollPeerMessages(
  sessionId: string,
  since?: string,
  timeoutMs = 25_000,
): Promise<PeerMessage[]> {
  const base = peerBaseUrl();
  if (!base) return [];

  const url = new URL(`${base}/v1/sessions/${sessionId}/messages`);
  if (since) url.searchParams.set("since", since);
  url.searchParams.set("timeout", String(Math.min(timeoutMs, 30_000)));

  try {
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) return [];
    const data = (await res.json()) as { messages?: PeerMessage[] };
    return data.messages ?? [];
  } catch {
    return [];
  }
}

export function localPeerUrl(): string {
  return `http://127.0.0.1:${getPeerPort()}`;
}
