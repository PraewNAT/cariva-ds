export type MessageType =
  | "ping"
  | "pong"
  | "handshake"
  | "message"
  | "agent_reply"
  | "context_share"
  | "pattern_brief"
  | "design_export"
  | "alignment_request"
  | "alignment_memo"
  | "verify_request"
  | "verify_result"
  | "cowork_start"
  | "cowork_turn"
  | "cowork_status"
  | "blocked_request"
  | "human_resume"
  | "cowork_done";

export type AgentMeta = {
  product: string;
  mode: string;
  capabilities: string[];
};

export type MessageFrom = {
  role: string;
  host: string;
  agent?: AgentMeta;
};

export type PeerMessage = {
  id: string;
  sessionId: string;
  from: MessageFrom;
  type: MessageType;
  payload: Record<string, unknown>;
  createdAt: string;
};

export type CoworkCriteria = {
  goal: string;
  criteria: string[];
  maxRounds: number;
};

export type SessionState =
  | "paired"
  | "coworking"
  | "waiting_peer"
  | "verifying"
  | "done"
  | "blocked";

export type PeerSession = {
  id: string;
  createdAt: string;
  state: SessionState;
  goal?: string;
  criteria?: CoworkCriteria;
  round: number;
  pairedPeer?: AgentMeta & { role: string; host: string };
  coworkActive: boolean;
  /** Host that runs the cowork orchestrator loop (initiator). */
  coworkLeaderHost?: string;
};

export function newMessage(
  partial: Omit<PeerMessage, "id" | "createdAt"> & { id?: string; createdAt?: string },
): PeerMessage {
  return {
    id: partial.id ?? crypto.randomUUID(),
    createdAt: partial.createdAt ?? new Date().toISOString(),
    sessionId: partial.sessionId,
    from: partial.from,
    type: partial.type,
    payload: partial.payload,
  };
}
