import { networkInterfaces } from "node:os";

export type PairingOffer = {
  code: string;
  token: string;
  host: string;
  port: number;
  role: string;
  agent: { product: string; mode: string };
  expiresAt: string;
};

const offers = new Map<string, PairingOffer>();

function randomCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function randomToken(): string {
  return crypto.randomUUID().replace(/-/g, "");
}

export function detectLocalHost(): string {
  const nets = networkInterfaces();
  const candidates: string[] = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (net.family === "IPv4" && !net.internal) {
        candidates.push(net.address);
      }
    }
  }
  // Prefer Tailscale CGNAT range 100.x.x.x
  const tailscale = candidates.find((ip) => ip.startsWith("100."));
  return tailscale ?? candidates[0] ?? "127.0.0.1";
}

export function createPairingOffer(opts: {
  port: number;
  role: string;
  product: string;
  mode: string;
  ttlMinutes?: number;
}): PairingOffer {
  const code = randomCode();
  const offer: PairingOffer = {
    code,
    token: randomToken(),
    host: detectLocalHost(),
    port: opts.port,
    role: opts.role,
    agent: { product: opts.product, mode: opts.mode },
    expiresAt: new Date(Date.now() + (opts.ttlMinutes ?? 60) * 60_000).toISOString(),
  };
  offers.set(code, offer);
  return offer;
}

export function redeemPairingCode(code: string): PairingOffer | undefined {
  const offer = offers.get(code.trim());
  if (!offer) return undefined;
  if (new Date(offer.expiresAt) < new Date()) {
    offers.delete(code);
    return undefined;
  }
  return offer;
}

export function consumePairingCode(code: string): PairingOffer | undefined {
  const offer = redeemPairingCode(code);
  if (offer) offers.delete(code);
  return offer;
}

export function listActiveOffers(): PairingOffer[] {
  const now = new Date();
  const active: PairingOffer[] = [];
  for (const [code, offer] of offers) {
    if (new Date(offer.expiresAt) < now) {
      offers.delete(code);
      continue;
    }
    active.push(offer);
  }
  return active;
}
