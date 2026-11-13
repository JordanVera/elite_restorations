import "server-only";

import { BlobError, BlobNotFoundError, BlobPreconditionFailedError, get, put } from "@vercel/blob";

import { JOBBER_REDIRECT_URI, JOBBER_TOKEN_URL, TOKEN_PATH, jobberClientId, jobberClientSecret } from "@/server/jobber/config";

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

/** Thrown when the private Jobber Blob store token is absent. Sync treats this as not configured. */
export const JOBBER_TOKEN_STORE_MISSING =
  "Jobber token store not configured (JOBBER_BLOB_READ_WRITE_TOKEN missing)";

export function resetJobberTokenMemory(): void {
  memory = null;
}

/**
 * Read-write token for the private Jobber Blob store.
 * Pass this on every get, head, put, and del. Omitting it makes the SDK use
 * BLOB_READ_WRITE_TOKEN, the public photo store, which rejects private access.
 */
function jobberBlobToken(): string {
  const token = process.env.JOBBER_BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) throw new Error(JOBBER_TOKEN_STORE_MISSING);
  return token;
}

function isMissingTokenBlob(error: unknown): boolean {
  if (error instanceof BlobNotFoundError) return true;
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return message.includes("not_found") || /\bnot found\b/.test(message);
}

export function isJobberTokenStoreError(error: unknown): boolean {
  if (error instanceof BlobError) return true;
  if (!(error instanceof Error)) return false;
  return (
    error.message === JOBBER_TOKEN_STORE_MISSING ||
    error.message.includes("Vercel Blob:") ||
    error.message.includes("Stored Jobber tokens")
  );
}

function isUsable(tokens: StoredTokens, now = Date.now()): boolean {
  return Boolean(tokens.accessToken) && tokens.accessTokenExpiresAt - now > REFRESH_BUFFER_MS;
}

async function readStored(): Promise<{ tokens: StoredTokens; etag: string } | null> {
  const token = jobberBlobToken();
  let result;
  try {
    result = await get(TOKEN_PATH, { access: "private", token, useCache: false });
  } catch (error) {
    if (isMissingTokenBlob(error)) return null;
    throw error;
  }
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  let parsed: Partial<StoredTokens>;
  try {
    parsed = JSON.parse(text) as Partial<StoredTokens>;
  } catch {
    throw new Error("Stored Jobber tokens are unreadable.");
  }
  if (
    typeof parsed.accessToken !== "string" ||
    typeof parsed.refreshToken !== "string" ||
    typeof parsed.accessTokenExpiresAt !== "number"
  ) {
    throw new Error("Stored Jobber tokens are unreadable.");
  }
  const record = {
    tokens: {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
      accessTokenExpiresAt: parsed.accessTokenExpiresAt,
    },
    etag: result.blob.etag,
  };
  memory = record;
  return record;
}

async function writeStored(tokens: StoredTokens, etag?: string): Promise<void> {
  const token = jobberBlobToken();
  const result = await put(TOKEN_PATH, JSON.stringify(tokens), {
    access: "private",
    token,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    ...(etag ? { ifMatch: etag } : {}),
  });
  memory = { tokens, etag: result.etag ?? etag ?? "" };
}

const OAUTH_ERROR_LOG_LIMIT = 200;

function clipOauthField(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\r\n]+/g, " ")
    .replace(/eyJ[\w.-]+/g, "[redacted]")
    .replace(/(client_secret|refresh_token|access_token|code_verifier)(=|:)\s*\S+/gi, "$1=[redacted]")
    .trim()
    .slice(0, OAUTH_ERROR_LOG_LIMIT);
}

/** Status plus the OAuth error fields only. The body can contain the client secret and tokens. */
async function oauthErrorFields(response: Response): Promise<{ error: string; error_description: string }> {
  try {
    const parsed = (await response.json()) as { error?: unknown; error_description?: unknown };
    return {
      error: clipOauthField(parsed.error),
      error_description: clipOauthField(parsed.error_description),
    };
  } catch {
    return { error: "", error_description: "" };
  }
}

async function requestTokens(body: URLSearchParams): Promise<StoredTokens> {
  const response = await fetch(JOBBER_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    const fields = await oauthErrorFields(response);
    console.error("[jobber] token request failed", response.status, fields.error, fields.error_description);
    const detail = /^[a-z0-9_-]{1,39}$/i.test(fields.error) ? ` ${fields.error}` : "";
    throw new Error(`Jobber token request failed (${response.status}${detail})`);
  }

  const parsed = (await response.json()) as TokenResponse;
  if (typeof parsed.access_token !== "string" || !parsed.access_token) {
    throw new Error("Jobber token response did not include an access token.");
  }
  const expiresIn = typeof parsed.expires_in === "number" && parsed.expires_in > 0 ? parsed.expires_in : 3600;
  const previous = memory?.tokens.refreshToken;
  const refreshToken = typeof parsed.refresh_token === "string" && parsed.refresh_token ? parsed.refresh_token : previous;
  if (!refreshToken) throw new Error("Jobber token response did not include a refresh token.");
  return {
    accessToken: parsed.access_token,
    refreshToken,
    accessTokenExpiresAt: Date.now() + expiresIn * 1000,
  };
}

async function refreshTokens(current: StoredTokens, etag: string): Promise<string> {
  const clientId = jobberClientId();
  const clientSecret = jobberClientSecret();
  if (!clientId || !clientSecret) throw new Error("Jobber credentials are not configured.");

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

export async function saveJobberTokens(tokens: {
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
  if (!existing) {
    try {
      existing = await readStored();
    } catch (error) {
      if (!isMissingTokenBlob(error)) throw error;
      existing = null;
    }
  }
  await writeStored(stored, existing?.etag);
}

export async function exchangeJobberCode(code: string, verifier: string): Promise<void> {
  const clientId = jobberClientId();
  const clientSecret = jobberClientSecret();
  if (!clientId || !clientSecret) throw new Error("Jobber credentials are not configured.");
  const next = await requestTokens(
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: JOBBER_REDIRECT_URI,
      code_verifier: verifier,
    }),
  );
  await saveJobberTokens({
    accessToken: next.accessToken,
    refreshToken: next.refreshToken,
    expiresIn: Math.max(1, Math.round((next.accessTokenExpiresAt - Date.now()) / 1000)),
  });
}

export function expireJobberAccessToken(): void {
  if (!memory) return;
  memory = {
    ...memory,
    tokens: { ...memory.tokens, accessTokenExpiresAt: 0 },
  };
}

/** Returns a usable access token, refreshing and storing the newest refresh token when needed. */
export async function getJobberAccessToken(): Promise<string> {
  const cached = memory;
  if (cached && isUsable(cached.tokens)) return cached.tokens.accessToken;

  const stored = await readStored();
  if (!stored) throw new Error("Jobber is not connected.");
  if (isUsable(stored.tokens)) return stored.tokens.accessToken;

  try {
    return await refreshTokens(stored.tokens, stored.etag);
  } catch (error) {
    memory = null;
    const latest = await readStored().catch(() => null);
    if (latest && isUsable(latest.tokens)) return latest.tokens.accessToken;
    throw error;
  }
}
