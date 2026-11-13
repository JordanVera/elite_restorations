import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const OAUTH_COOKIE = "jobber_oauth";
const COOKIE_TTL_MS = 10 * 60 * 1000;

export type OAuthHandoff = {
  state: string;
  verifier: string;
  exp: number;
};

export function keysMatch(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function createOAuthHandoff(now = Date.now()): OAuthHandoff {
  return {
    state: randomBytes(24).toString("base64url"),
    verifier: randomBytes(32).toString("base64url"),
    exp: now + COOKIE_TTL_MS,
  };
}

/** S256 challenge, unpadded base64url, as Jobber's OAuth docs require. */
export function codeChallenge(verifier: string): string {
  return createHash("sha256").update(verifier).digest("base64url");
}

export function signOAuthHandoff(handoff: OAuthHandoff, secret: string): string {
  const body = Buffer.from(JSON.stringify(handoff)).toString("base64url");
  const mac = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${mac}`;
}

export function readOAuthHandoff(value: string, secret: string, now = Date.now()): OAuthHandoff | null {
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = value.slice(0, dot);
  const mac = value.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  const actualBuf = Buffer.from(mac);
  const expectedBuf = Buffer.from(expected);
  if (actualBuf.length !== expectedBuf.length || !timingSafeEqual(actualBuf, expectedBuf)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Partial<OAuthHandoff>;
    if (!parsed.state || !parsed.verifier || typeof parsed.exp !== "number") return null;
    if (parsed.exp < now) return null;
    return { state: parsed.state, verifier: parsed.verifier, exp: parsed.exp };
  } catch {
    return null;
  }
}

export function statesMatch(provided: string, expected: string): boolean {
  return keysMatch(provided, expected);
}

/** True when the provided key matches any non-empty expected key. Every key is compared. */
export function anyKeyMatches(provided: string, expected: readonly string[]): boolean {
  let matched = false;
  for (const key of expected) {
    if (!key) continue;
    if (keysMatch(provided, key)) matched = true;
  }
  return matched;
}
