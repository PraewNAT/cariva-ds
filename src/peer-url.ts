import { getPeerPort } from "./config.js";

export type PeerEndpoint = {
  baseUrl: string;
  hostname: string;
  port: number;
};

/** Parse Guest/Host peer input: IP:port, hostname:port, or https://tunnel-host */
export function parsePeerEndpoint(input: string, defaultPort?: number): PeerEndpoint {
  const fallbackPort = defaultPort ?? getPeerPort();
  const trimmed = input.trim();
  if (!trimmed) {
    return { baseUrl: "", hostname: "", port: fallbackPort };
  }

  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
  try {
    const u = new URL(withScheme);
    const port = u.port
      ? Number(u.port)
      : u.protocol === "https:"
        ? 443
        : u.protocol === "http:"
          ? 80
          : fallbackPort;
    const baseUrl = `${u.protocol}//${u.host}`;
    return { baseUrl, hostname: u.hostname, port };
  } catch {
    /* fall through */
  }

  let raw = trimmed.replace(/^https?:\/\//i, "").split("/")[0] ?? "";
  if (raw.includes(":")) {
    const [host, portStr] = raw.split(":");
    const port = Number(portStr);
    return {
      baseUrl: `http://${host}:${Number.isFinite(port) && port > 0 ? port : fallbackPort}`,
      hostname: host ?? "",
      port: Number.isFinite(port) && port > 0 ? port : fallbackPort,
    };
  }
  return {
    baseUrl: `http://${raw}:${fallbackPort}`,
    hostname: raw,
    port: fallbackPort,
  };
}

export function getPublicSetupBaseUrl(localHost: string, setupPort: number, opts?: { https?: boolean }): string {
  const pub = process.env.PEER_PUBLIC_SETUP_URL?.trim();
  if (pub) return pub.replace(/\/$/, "");
  const hostname = localHost.split(":")[0] ?? localHost;
  if (opts?.https || hostname.endsWith(".trycloudflare.com")) {
    return `https://${hostname}`;
  }
  return `http://${hostname}:${setupPort}`;
}

export function getPublicPeerBaseUrl(localHost: string, peerPort: number, opts?: { https?: boolean }): string {
  const pub = process.env.PEER_PUBLIC_PEER_URL?.trim();
  if (pub) return pub.replace(/\/$/, "");
  const setupPub = process.env.PEER_PUBLIC_SETUP_URL?.trim();
  if (setupPub) return setupPub.replace(/\/$/, "");
  const hostname = localHost.split(":")[0] ?? localHost;
  if (opts?.https || hostname.endsWith(".trycloudflare.com")) {
    return `https://${hostname}`;
  }
  return `http://${hostname}:${peerPort}`;
}

export function normalizePublicUrl(input: string): string {
  return input.trim().replace(/\/$/, "");
}

/** Guest step 3: use Host URL as entered; map stale LAN IP → setup hint from install */
export function resolveGuestJoinTarget(hostInput: string): string {
  const input = hostInput.trim();
  if (!input) return "";

  const setupHint = normalizePublicUrl(process.env.PEER_SETUP_HINT_HOST ?? "");
  const hostPart = input.replace(/^https?:\/\//i, "").split("/")[0]?.split(":")[0] ?? "";
  if (setupHint && (/^\d+\.\d+\.\d+\.\d+$/.test(hostPart) || hostPart === "127.0.0.1")) {
    return setupHint;
  }

  return input;
}

export function advertisedPeerHostForGuest(localHost: string, peerPort: number): string {
  const pub = process.env.PEER_PUBLIC_PEER_URL?.trim();
  if (pub) return pub.replace(/\/$/, "");
  const setupPub = process.env.PEER_PUBLIC_SETUP_URL?.trim();
  if (setupPub) return setupPub.replace(/\/$/, "");
  return `${localHost}:${peerPort}`;
}

/** Guest → Host: address Host uses to reach Guest (tunnel URL when remote). */
export function advertisedGuestHostForHost(localHost: string, peerPort: number): string {
  const guestPub = process.env.PEER_GUEST_PUBLIC_URL?.trim();
  if (guestPub) return guestPub.replace(/\/$/, "");
  return `${localHost}:${peerPort}`;
}
