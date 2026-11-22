import "server-only";

import { headers } from "next/headers";

import { site } from "@/lib/site";
import { decryptSecret, encryptSecret, randomToken, sha256 } from "@/server/security/crypto";

/** 32 random bytes, base64url. Only the hash is used for lookups. */
export function issuePortalToken(): { token: string; tokenHash: string; tokenEncrypted: string } {
  const token = randomToken(32);
  return { token, tokenHash: sha256(token), tokenEncrypted: encryptSecret(token) };
}

export function isPortalTokenShape(token: string): boolean {
  return /^[A-Za-z0-9_-]{43}$/.test(token);
}

export function hashPortalToken(token: string): string {
  return sha256(token);
}

export function revealPortalToken(tokenEncrypted: string): string | null {
  try {
    return decryptSecret(tokenEncrypted);
  } catch {
    return null;
  }
}

/** PORTAL_BASE_URL wins; otherwise the host the admin is using, so links work on previews and localhost. */
export async function portalBaseUrl(): Promise<string> {
  const configured = process.env.PORTAL_BASE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return site.url;
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function portalUrl(token: string): Promise<string> {
  return `${await portalBaseUrl()}/portal/${token}`;
}
