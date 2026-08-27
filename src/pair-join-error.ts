import { normalizePublicUrl } from "./peer-url.js";

export type PairJoinErrorPayload = {
  error: string;
  errorCode: string;
  agentHint: string;
  agentReport: string;
  diagnostics: Record<string, string | number | boolean | null>;
};

export type PairJoinErrorContext = {
  raw: string;
  hostInput: string;
  resolvedJoinUrl: string;
  httpStatus?: number;
  fetchError?: string;
  guestPublicUrl?: string;
  guestSetupHint?: string;
  bridgeVersion?: string;
};

function isLanIp(host: string): boolean {
  const part = host.replace(/^https?:\/\//i, "").split("/")[0]?.split(":")[0] ?? "";
  return /^\d+\.\d+\.\d+\.\d+$/.test(part) && part !== "127.0.0.1";
}

function hostFromUrl(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname;
  } catch {
    return "";
  }
}

function classify(ctx: PairJoinErrorContext): {
  errorCode: string;
  error: string;
  agentHint: string;
} {
  const raw = ctx.raw.trim();
  const rawLower = raw.toLowerCase();
  const host = ctx.hostInput.trim();
  const guestTunnel = ctx.guestPublicUrl?.trim() ?? "";
  const hint = ctx.guestSetupHint?.trim() ?? "";

  const inputHost = hostFromUrl(host);
  const joinHost = hostFromUrl(ctx.resolvedJoinUrl);
  if (inputHost && joinHost && inputHost !== joinHost) {
    return {
      errorCode: "JOIN_TARGET_MISMATCH",
      error: `ส่งคำขอไป tunnel ผิด (${joinHost}) แทน Host (${inputHost}) — บั๊ก/ .env เก่า`,
      agentHint:
        "Guest curl ใหม่จาก Host ล่าสุด · อัปเดต bridge v0.1.7+ · ขั้น 3 ใส่ Host URL ตรงจาก make peer-url",
    };
  }

  if (ctx.fetchError) {
    if (/timeout/i.test(ctx.fetchError)) {
      return {
        errorCode: "HOST_TIMEOUT",
        error: "เชื่อม Host ไม่ได้ (timeout) — tunnel อาจปิดหรือ URL เก่า",
        agentHint:
          "Host เปิด make peer-tunnel-quick-foreground แล้ว make peer-url ส่ง URL ใหม่ให้ Guest",
      };
    }
    if (/ECONNREFUSED|fetch failed|ENOTFOUND/i.test(ctx.fetchError)) {
      return {
        errorCode: "HOST_UNREACHABLE",
        error: "เชื่อม Host ไม่ได้ — ตรวจ URL จาก Host (make peer-url)",
        agentHint: "Host: peer-start + tunnel foreground · Guest: ใช้ https://…trycloudflare.com ล่าสุด",
      };
    }
  }

  if (/token expired/i.test(rawLower)) {
    return {
      errorCode: "CF_TUNNEL_STALE",
      error:
        "「Token expired」จาก Cloudflare — tunnel ปิด/URL เก่า (ไม่ใช่รหัส 6 หลักหมดอายุ)",
      agentHint:
        "Host รัน tunnel foreground ใหม่ → make peer-url → Guest ใส่ URL+รหัสใหม่ภายใน 1 นาที",
    };
  }

  if (/origin (unregistered|error)|error code:\s*1033|530/i.test(rawLower)) {
    return {
      errorCode: "CF_TUNNEL_STALE",
      error: "Cloudflare tunnel ไม่ทำงาน (530) — Host ต้องเปิด tunnel ใหม่",
      agentHint: "Host: make peer-tunnel-quick-stop && make peer-tunnel-quick-foreground",
    };
  }

  if (/invalid or expired code/i.test(rawLower)) {
    return {
      errorCode: "PAIR_CODE_INVALID",
      error: "รหัส 6 หลักไม่ถูกหรือหมดอายุ — ขอรหัสใหม่จาก Host แล้วใส่ภายใน 1 นาที",
      agentHint: "Host: make peer-url (รหัสใหม่ทุกครั้ง) · Guest join ทันทีหลังได้รหัส",
    };
  }

  if (isLanIp(host) && (hint.includes("trycloudflare.com") || guestTunnel.includes("trycloudflare.com"))) {
    return {
      errorCode: "HOST_URL_IS_LAN_IP",
      error: "ใส่ IP ใน office แทน Cloudflare URL — ใช้ URL จาก make peer-url",
      agentHint: "Guest ขั้น 3: https://….trycloudflare.com ไม่ใช่ 172.16.x.x",
    };
  }

  if (ctx.httpStatus === 404) {
    return {
      errorCode: "PAIR_CODE_INVALID",
      error: "รหัสไม่ถูกหรือใช้แล้ว — ขอรหัสใหม่จาก Host",
      agentHint: "Host สร้างรหัสใหม่ (make peer-url) · รหัสใช้ครั้งเดียว",
    };
  }

  if (ctx.httpStatus === 502 || ctx.httpStatus === 503) {
    return {
      errorCode: "HOST_BRIDGE_DOWN",
      error: "Host bridge ไม่ตอบ — ให้ Host รัน make peer-start",
      agentHint: "Host: make peer-start && tunnel foreground",
    };
  }

  return {
    errorCode: "JOIN_FAILED",
    error: raw.slice(0, 200) || "เชื่อม Host ไม่สำเร็จ",
    agentHint: "ส่ง agentReport นี้ให้ Agent ช่วยไล่ Host tunnel + pairing",
  };
}

function buildAgentReport(
  classified: { errorCode: string; error: string; agentHint: string },
  ctx: PairJoinErrorContext,
): string {
  const lines = [
    "# Peer join error (Guest → Host)",
    "",
    `errorCode: ${classified.errorCode}`,
    `message: ${classified.error}`,
    "",
    "## Context",
    `- hostInput: ${ctx.hostInput || "(empty)"}`,
    `- joinUrl: ${ctx.resolvedJoinUrl}`,
    `- httpStatus: ${ctx.httpStatus ?? "n/a"}`,
    `- guestTunnel: ${ctx.guestPublicUrl || "(none — Guest tunnel อาจยังไม่ขึ้น)"}`,
    `- guestSetupHint: ${ctx.guestSetupHint || "(none)"}`,
    `- bridgeVersion: ${ctx.bridgeVersion || "?"}`,
  ];
  if (ctx.fetchError) lines.push(`- fetchError: ${ctx.fetchError}`);
  if (ctx.raw && ctx.raw !== classified.error) {
    lines.push(`- rawResponse: ${ctx.raw.slice(0, 400).replace(/\s+/g, " ")}`);
  }
  lines.push(
    "",
    "## แนะให้ Agent / Host ทำ",
    `1. ${classified.agentHint}`,
    "2. Host: make peer-start + make peer-tunnel-quick-foreground (terminal เปิดทิ้ง)",
    "3. Host: make peer-url → ส่ง curl + รหัส 6 หลักใหม่",
    "4. Guest: ขั้น 3 ใส่ Host URL (trycloudflare) + รหัสภายใน 1 นาที",
    "5. อย่าใช้ IP office เมื่อใช้ Cloudflare tunnel",
  );
  return lines.join("\n");
}

export function diagnosePairJoinFailure(ctx: PairJoinErrorContext): PairJoinErrorPayload {
  const classified = classify(ctx);
  const diagnostics: Record<string, string | number | boolean | null> = {
    hostInput: ctx.hostInput || null,
    resolvedJoinUrl: ctx.resolvedJoinUrl,
    httpStatus: ctx.httpStatus ?? null,
    guestPublicUrl: ctx.guestPublicUrl ?? null,
    guestSetupHint: ctx.guestSetupHint ?? null,
    bridgeVersion: ctx.bridgeVersion ?? null,
    rawSnippet: ctx.raw.slice(0, 400) || null,
  };
  if (ctx.fetchError) diagnostics.fetchError = ctx.fetchError;

  return {
    error: classified.error,
    errorCode: classified.errorCode,
    agentHint: classified.agentHint,
    agentReport: buildAgentReport(classified, ctx),
    diagnostics,
  };
}

/** @deprecated use diagnosePairJoinFailure */
export function mapPairJoinError(message: string): string {
  return diagnosePairJoinFailure({
    raw: message,
    hostInput: "",
    resolvedJoinUrl: "",
  }).error;
}

export function joinFetchErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    if (err.name === "TimeoutError" || err.message.includes("timeout")) {
      return "timeout connecting to Host";
    }
    if (err.message.includes("ECONNREFUSED") || err.message.includes("fetch failed")) {
      return err.message;
    }
    return err.message;
  }
  return String(err);
}
