import type { PeerMessage } from "./message-schema.js";

/** Map verify_result + alignment messages to declared success criteria. */
export function criteriaSatisfied(thread: PeerMessage[], criteria: string[]): boolean {
  if (criteria.length === 0) return false;

  const met = new Set<string>();

  for (const m of thread) {
    if (m.type === "alignment_memo" && m.payload.status === "approved") {
      for (const c of criteria) {
        if (c.includes("alignment") || c.includes("memo") || c.includes("theme")) met.add(c);
      }
    }

    if (m.type !== "verify_result" || m.payload.status !== "pass") continue;

    const checks = m.payload.checks;
    if (Array.isArray(checks)) {
      for (const c of checks) {
        if (typeof c === "string") met.add(c);
      }
    }

    const detail = String(m.payload.detail ?? "").toLowerCase();
    for (const c of criteria) {
      if (c === "lint_pass" && detail.includes("lint")) met.add(c);
      if (c === "typescript_pass" && (detail.includes("build") || detail.includes("tsc"))) met.add(c);
      if (c === "verify_pass") met.add(c);
    }
  }

  return criteria.every((c) => met.has(c));
}
