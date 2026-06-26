import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findBridgeRoot } from "./config.js";
import type { PeerMessage, PeerSession } from "./message-schema.js";

type StoreData = {
  sessions: Record<string, PeerSession>;
  messages: Record<string, PeerMessage[]>;
};

function storeDir(): string {
  const dir = join(findBridgeRoot(), ".peer");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

function storePath(): string {
  return join(storeDir(), "state.json");
}

function loadStore(): StoreData {
  const path = storePath();
  if (!existsSync(path)) return { sessions: {}, messages: {} };
  try {
    return JSON.parse(readFileSync(path, "utf8")) as StoreData;
  } catch {
    return { sessions: {}, messages: {} };
  }
}

function saveStore(data: StoreData): void {
  writeFileSync(storePath(), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

const boot = loadStore();
const sessions = new Map<string, PeerSession>(Object.entries(boot.sessions));
const messages = new Map<string, PeerMessage[]>(Object.entries(boot.messages));

function persist(): void {
  saveStore({
    sessions: Object.fromEntries(sessions),
    messages: Object.fromEntries(messages),
  });
}

export function createSession(id?: string): PeerSession {
  const session: PeerSession = {
    id: id ?? crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    state: "paired",
    round: 0,
    coworkActive: false,
  };
  sessions.set(session.id, session);
  messages.set(session.id, []);
  persist();
  return session;
}

export function getSession(id: string): PeerSession | undefined {
  return sessions.get(id);
}

export function updateSession(id: string, patch: Partial<PeerSession>): PeerSession | undefined {
  const s = sessions.get(id);
  if (!s) return undefined;
  const next = { ...s, ...patch };
  sessions.set(id, next);
  persist();
  return next;
}

export function listSessions(): PeerSession[] {
  return [...sessions.values()];
}

export function appendMessage(msg: PeerMessage): void {
  const list = messages.get(msg.sessionId) ?? [];
  list.push(msg);
  messages.set(msg.sessionId, list);
  persist();
}

export function getMessages(sessionId: string, since?: string): PeerMessage[] {
  const list = messages.get(sessionId) ?? [];
  if (!since) return [...list];
  const idx = list.findIndex((m) => m.id === since);
  if (idx < 0) return [...list];
  return list.slice(idx + 1);
}

export function getThread(sessionId: string): PeerMessage[] {
  return [...(messages.get(sessionId) ?? [])];
}

export function getDefaultSession(): PeerSession {
  const existing = listSessions()[0];
  if (existing) return existing;
  return createSession("default");
}
