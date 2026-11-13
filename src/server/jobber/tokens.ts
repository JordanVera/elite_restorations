import "server-only";

import { BlobNotFoundError, BlobPreconditionFailedError, get, put } from "@vercel/blob";

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

export function resetJobberTokenMemory(): void {
  memory = null;
}

function isUsable(tokens: StoredTokens, now = Date.now()): boolean {
  return Boolean(tokens.accessToken) && tokens.accessTokenExpiresAt - now > REFRESH_BUFFER_MS;
}

async function readStored(): Promise<{ tokens: StoredTokens; etag: string } | null> {
  let result;
  try {
    result = await get(TOKEN_PATH, { access: "private", useCache: false });
  } catch (error) {
    if (error instanceof BlobNotFoundError) return null;
    const message = error instanceof Error ? error.message : "";
    if (
      message.includes("BLOB_READ_WRITE_TOKEN") ||
      message.includes("No blob credentials") ||
      message.includes("No read-write token")
    ) {
      throw new Error("Jobber token store is not configured.");
    }
    throw error;
  }
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  const parsed = JSON.parse(text) as Partial<StoredTokens>;
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
  const result = await put(TOKEN_PATH, JSON.stringify(tokens), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    ...(etag ? { ifMatch: etag } : {}),
  });
  memory = { tokens, etag: result.etag ?? etag ?? "" };
}

async function requestTokens(body: URLSearchParams): Promise<StoredTokens> {
  const response = await fetch(JOBBER_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    let detail = "";
    try {
      const parsed = (await response.json()) as { error?: unknown };
      if (typeof parsed.error === "string" && parsed.error.length < 40) detail = ` ${parsed.error}`;
    } catch {
      detail = "";
    }
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
  const existing = memory ?? (await readStored().catch(() => null));
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
