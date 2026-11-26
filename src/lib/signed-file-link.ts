import { createHmac, timingSafeEqual } from "node:crypto";

import { FILE_LINK_TTL_SECONDS } from "@/lib/file-link-ttl";
import { buildEstimatePath, parseEstimatePath } from "@/lib/estimate-request/files";

/**
 * Signed download links for private Blob objects.
 *
 * ESTIMATE_LINK_SECRET is preferred. If it is unset, links are signed with
 * APP_ENCRYPTION_KEY, then LEAD_INGEST_SECRET. Local development without any
 * of those uses a built-in dev secret. Production without one of the three
 * secrets does not mint a link (the email still sends, and the URL is blank).
 * Do not rely on the dev secret outside local development.
 */
const DEV_LINK_SECRET = "dev-only-estimate-link-secret";

export function fileLinkSecret(env: Record<string, string | undefined> = process.env): string | null {
  const dedicated = env.ESTIMATE_LINK_SECRET?.trim();
  if (dedicated) return dedicated;
  const app = env.APP_ENCRYPTION_KEY?.trim();
  if (app) return app;
  const ingest = env.LEAD_INGEST_SECRET?.trim();
  if (ingest) return ingest;
  if ((env.NODE_ENV ?? "development") !== "production") return DEV_LINK_SECRET;
  return null;
}

/** Canonical blob pathname, or null when the path is not a lead file. */
export function canonicalFilePath(pathname: string): string | null {
  const photo = /^lead-photos\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.jpg$/i.exec(pathname);
  if (photo) return `lead-photos/${photo[1].toLowerCase()}.jpg`;
  const parsed = parseEstimatePath(pathname);
  if (!parsed) return null;
  return buildEstimatePath({
    submissionId: parsed.submissionId,
    accessKey: parsed.accessKey,
    role: parsed.role,
    roomIndex: parsed.roomIndex ?? undefined,
    fileId: parsed.fileId,
    ext: parsed.ext,
  });
}

export function signFileLink(pathname: string, secret: string, now = Date.now()): { exp: number; sig: string } {
  const exp = Math.floor(now / 1000) + FILE_LINK_TTL_SECONDS;
  const sig = createHmac("sha256", secret).update(`${pathname}\n${exp}`).digest("base64url");
  return { exp, sig };
}

export function verifyFileLink(
  pathname: string,
  expRaw: string,
  sig: string,
  secret: string,
  now = Date.now(),
): boolean {
  if (!/^\d{1,12}$/.test(expRaw) || !sig) return false;
  const exp = Number(expRaw);
  const nowSec = Math.floor(now / 1000);
  if (exp < nowSec) return false;
  if (exp > nowSec + FILE_LINK_TTL_SECONDS + 120) return false;
  const expected = createHmac("sha256", secret).update(`${pathname}\n${exp}`).digest("base64url");
  const actualBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (actualBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(actualBuf, expectedBuf);
}

/** Site URL with an HMAC and an expiry. Null when the path or the secret is missing. */
export function signedFileUrl(
  origin: string,
  pathname: string,
  env: Record<string, string | undefined> = process.env,
  now = Date.now(),
): string | null {
  const canonical = canonicalFilePath(pathname);
  const secret = fileLinkSecret(env);
  if (!canonical || !secret) return null;
  const { exp, sig } = signFileLink(canonical, secret, now);
  const base = origin.replace(/\/$/, "");
  const photo = /^lead-photos\/([0-9a-f-]+)\.jpg$/i.exec(canonical);
  if (photo) return `${base}/api/visit-file/${photo[1]}?exp=${exp}&sig=${sig}`;
  const rest = canonical.slice("estimate-requests/".length);
  const slash = rest.indexOf("/");
  const id = rest.slice(0, slash);
  const file = rest
    .slice(slash + 1)
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `${base}/api/estimate-file/${id}/${file}?exp=${exp}&sig=${sig}`;
}
