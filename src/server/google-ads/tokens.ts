import "server-only";

import { BlobPreconditionFailedError } from "@vercel/blob";

import {
  GOOGLE_ADS_REDIRECT_URI,
  GOOGLE_ADS_TOKEN_PATH,
  GOOGLE_ADS_TOKEN_URL,
  googleAdsClientId,
  googleAdsClientSecret,
} from "@/server/google-ads/config";
import { isPrivateBlobError, readPrivateText, writePrivateText } from "@/server/private-blob";
import { safeLog } from "@/server/safe-log";

const REFRESH_BUFFER_MS = 2 * 60 * 1000;

type StoredTokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
};

type TokenResponse = {
  access_token?: unknown;
  refresh_token?: unknown;
  expires_in?: unknown;
};

let memory: { tokens: StoredTokens; etag: string } | null = null;

export function isGoogleAdsTokenStoreError(error: unknown): boolean {
  return isPrivateBlobError(error);
}

function isUsable(tokens: StoredTokens, now = Date.now()): boolean {
  return Boolean(tokens.accessToken) && tokens.accessTokenExpiresAt - now > REFRESH_BUFFER_MS;
}

async function readStored(): Promise<{ tokens: StoredTokens; etag: string } | null> {
  const stored = await readPrivateText(GOOGLE_ADS_TOKEN_PATH);
  if (!stored) return null;
  let parsed: Partial<StoredTokens>;
  try {
    parsed = JSON.parse(stored.text) as Partial<StoredTokens>;
  } catch {
    throw new Error("Stored Google Ads tokens are unreadable.");
  }
  if (
    typeof parsed.accessToken !== "string" ||
    typeof parsed.refreshToken !== "string" ||
    typeof parsed.accessTokenExpiresAt !== "number"
  ) {
    throw new Error("Stored Google Ads tokens are unreadable.");
  }
  const record = {
    tokens: {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
      accessTokenExpiresAt: parsed.accessTokenExpiresAt,
    },
    etag: stored.etag,
  };
  memory = record;
  return record;
}

async function writeStored(tokens: StoredTokens, etag?: string): Promise<void> {
  const nextEtag = await writePrivateText(GOOGLE_ADS_TOKEN_PATH, JSON.stringify(tokens), etag);
  memory = { tokens, etag: nextEtag };
}

function clip(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\r\n]+/g, " ")
    .replace(/eyJ[\w.-]+/g, "[redacted]")
    .replace(/(client_secret|refresh_token|access_token|code_verifier)(=|:)\s*\S+/gi, "$1=[redacted]")
    .trim()
    .slice(0, 200);
}

async function oauthErrorFields(response: Response): Promise<{ error: string; error_description: string }> {
  try {
    const parsed = (await response.json()) as { error?: unknown; error_description?: unknown };
    return { error: clip(parsed.error), error_description: clip(parsed.error_description) };
  } catch {
    return { error: "", error_description: "" };
  }
}

async function requestTokens(body: URLSearchParams): Promise<StoredTokens> {
  const response = await fetch(GOOGLE_ADS_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    const fields = await oauthErrorFields(response);
    console.error("[google-ads] token request failed", response.status, fields.error, fields.error_description);
    const detail = /^[a-z0-9_-]{1,39}$/i.test(fields.error) ? ` ${fields.error}` : "";
    throw new Error(`Google Ads token request failed (${response.status}${detail})`);
  }

  const parsed = (await response.json()) as TokenResponse;
  if (typeof parsed.access_token !== "string" || !parsed.access_token) {
    throw new Error("Google Ads token response did not include an access token.");
  }
  const expiresIn = typeof parsed.expires_in === "number" && parsed.expires_in > 0 ? parsed.expires_in : 3600;
  const previous = memory?.tokens.refreshToken;
  const refreshToken = typeof parsed.refresh_token === "string" && parsed.refresh_token ? parsed.refresh_token : previous;
  if (!refreshToken) throw new Error("Google Ads token response did not include a refresh token.");
  return {
    accessToken: parsed.access_token,
    refreshToken,
    accessTokenExpiresAt: Date.now() + expiresIn * 1000,
  };
}

async function refreshTokens(current: StoredTokens, etag: string): Promise<string> {
  const clientId = googleAdsClientId();
  const clientSecret = googleAdsClientSecret();
  if (!clientId || !clientSecret) throw new Error("Google Ads credentials are not configured.");
  const next = await requestTokens(
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: current.refreshToken,
    }),
  );
  try {
    await writeStored(next, etag);
  } catch (error) {
    if (!(error instanceof BlobPreconditionFailedError)) throw error;
    memory = null;
    const latest = await readStored();
    if (latest && isUsable(latest.tokens)) return latest.tokens.accessToken;
    await writeStored(next);
  }
  return next.accessToken;
}

export async function saveGoogleAdsTokens(tokens: {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}): Promise<void> {
  const stored: StoredTokens = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    accessTokenExpiresAt: Date.now() + tokens.expiresIn * 1000,
  };
  let existing = memory;
  if (!existing) existing = await readStored();
  await writeStored(stored, existing?.etag);
}

export async function exchangeGoogleAdsCode(code: string, verifier: string): Promise<void> {
  const clientId = googleAdsClientId();
  const clientSecret = googleAdsClientSecret();
  if (!clientId || !clientSecret) throw new Error("Google Ads credentials are not configured.");
  const next = await requestTokens(
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: GOOGLE_ADS_REDIRECT_URI,
      code_verifier: verifier,
    }),
  );
  await saveGoogleAdsTokens({
    accessToken: next.accessToken,
    refreshToken: next.refreshToken,
    expiresIn: Math.max(1, Math.round((next.accessTokenExpiresAt - Date.now()) / 1000)),
  });
}

export function expireGoogleAdsAccessToken(): void {
  if (!memory) return;
  memory = { ...memory, tokens: { ...memory.tokens, accessTokenExpiresAt: 0 } };
}

export async function getGoogleAdsAccessToken(): Promise<string> {
  const cached = memory;
  if (cached && isUsable(cached.tokens)) return cached.tokens.accessToken;

  const stored = await readStored();
  if (!stored) throw new Error("Google Ads is not connected.");
  if (isUsable(stored.tokens)) return stored.tokens.accessToken;

  try {
    return await refreshTokens(stored.tokens, stored.etag);
  } catch (error) {
    memory = null;
    const latest = await readStored().catch((readError) => {
      console.error("[google-ads] token reread failed", safeLog(readError));
      return null;
    });
    if (latest && isUsable(latest.tokens)) return latest.tokens.accessToken;
    throw error;
  }
}
