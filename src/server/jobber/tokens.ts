import "server-only";

import { JOBBER_TOKEN_URL, jobberClientId, jobberClientSecret, jobberRedirectUri } from "@/server/jobber/config";
import {
  databaseTokenStore,
  JOBBER_TOKEN_STORE_MISSING,
  TokenVersionConflict,
  type ConnectionMeta,
  type StoredTokens,
  type TokenStore,
} from "@/server/jobber/token-store";
import { ENCRYPTION_KEY_MISSING } from "@/server/security/crypto";
import { DATABASE_MISSING } from "@/server/db/client";

export { JOBBER_TOKEN_STORE_MISSING };

const REFRESH_BUFFER_MS = 2 * 60 * 1000;

type TokenResponse = {
  access_token?: unknown;
  refresh_token?: unknown;
  expires_in?: unknown;
};

let store: TokenStore = databaseTokenStore;
let memory: { tokens: StoredTokens; version: number } | null = null;
let rejectedAccessToken: string | null = null;

/** Tests swap in an in-memory store. */
export function setJobberTokenStore(next: TokenStore | null): void {
  store = next ?? databaseTokenStore;
  memory = null;
  rejectedAccessToken = null;
}

export function resetJobberTokenMemory(): void {
  memory = null;
  rejectedAccessToken = null;
}

export class JobberReconnectRequired extends Error {
  constructor(detail: string) {
    super(`Jobber needs to be reconnected (${detail}).`);
    this.name = "JobberReconnectRequired";
  }
}

export function isJobberTokenStoreError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.message === JOBBER_TOKEN_STORE_MISSING ||
    error.message === DATABASE_MISSING ||
    error.message === ENCRYPTION_KEY_MISSING ||
    error.message.startsWith("Encrypted value") ||
    error.name === "PrismaClientInitializationError" ||
    error.name === "PrismaClientKnownRequestError"
  );
}

function isUsable(tokens: StoredTokens, now = Date.now()): boolean {
  return Boolean(tokens.accessToken) && tokens.accessTokenExpiresAt - now > REFRESH_BUFFER_MS;
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

class TokenRequestError extends Error {
  readonly status: number;
  readonly oauthError: string;

  constructor(status: number, oauthError: string) {
    const detail = /^[a-z0-9_-]{1,39}$/i.test(oauthError) ? ` ${oauthError}` : "";
    super(`Jobber token request failed (${status}${detail})`);
    this.name = "TokenRequestError";
    this.status = status;
    this.oauthError = oauthError;
  }

  /** The refresh token itself was rejected. Retrying will not help. */
  get permanent(): boolean {
    return this.oauthError === "invalid_grant" || this.status === 401;
  }
}

async function requestTokens(body: URLSearchParams, previousRefreshToken?: string): Promise<StoredTokens> {
  const response = await fetch(JOBBER_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    const fields = await oauthErrorFields(response);
    console.error("[jobber] token request failed", response.status, fields.error, fields.error_description);
    throw new TokenRequestError(response.status, fields.error);
  }

  const parsed = (await response.json()) as TokenResponse;
  if (typeof parsed.access_token !== "string" || !parsed.access_token) {
    throw new Error("Jobber token response did not include an access token.");
  }
  const expiresIn = typeof parsed.expires_in === "number" && parsed.expires_in > 0 ? parsed.expires_in : 3600;
  // Jobber rotates refresh tokens. Keep the old one only if a response ever omits it.
  const refreshToken =
    typeof parsed.refresh_token === "string" && parsed.refresh_token ? parsed.refresh_token : previousRefreshToken;
  if (!refreshToken) throw new Error("Jobber token response did not include a refresh token.");
  return {
    accessToken: parsed.access_token,
    refreshToken,
    accessTokenExpiresAt: Date.now() + expiresIn * 1000,
  };
}

function credentials(): { clientId: string; clientSecret: string } {
  const clientId = jobberClientId();
  const clientSecret = jobberClientSecret();
  if (!clientId || !clientSecret) throw new Error("Jobber credentials are not configured.");
  return { clientId, clientSecret };
}

async function refreshTokens(current: StoredTokens, version: number): Promise<string> {
  const { clientId, clientSecret } = credentials();
  let next: StoredTokens;
  try {
    next = await requestTokens(
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: current.refreshToken,
      }),
      current.refreshToken,
    );
  } catch (error) {
    // Another instance may have rotated the refresh token a moment ago.
    const latest = await store.read().catch(() => null);
    if (latest && latest.version !== version && isUsable(latest.tokens)) {
      memory = { tokens: latest.tokens, version: latest.version };
      return latest.tokens.accessToken;
    }
    if (error instanceof TokenRequestError && error.permanent) {
      await store.markNeedsReconnect(error.message).catch(() => undefined);
      throw new JobberReconnectRequired(error.oauthError || String(error.status));
    }
    throw error;
  }

  try {
    const newVersion = await store.update(next, version);
    memory = { tokens: next, version: newVersion };
    return next.accessToken;
  } catch (error) {
    if (!(error instanceof TokenVersionConflict)) throw error;
    // Someone else wrote first. Theirs is at least as new as ours.
    const latest = await store.read();
    if (latest && isUsable(latest.tokens)) {
      memory = { tokens: latest.tokens, version: latest.version };
      return latest.tokens.accessToken;
    }
    return next.accessToken;
  }
}

export async function saveJobberTokens(
  tokens: { accessToken: string; refreshToken: string; expiresIn: number },
  meta?: ConnectionMeta,
): Promise<void> {
  const stored: StoredTokens = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    accessTokenExpiresAt: Date.now() + tokens.expiresIn * 1000,
  };
  await store.replace(stored, meta);
  memory = null;
}

export async function exchangeJobberCode(code: string, verifier: string): Promise<void> {
  const { clientId, clientSecret } = credentials();
  const next = await requestTokens(
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: jobberRedirectUri(),
      code_verifier: verifier,
    }),
  );
  await saveJobberTokens({
    accessToken: next.accessToken,
    refreshToken: next.refreshToken,
    expiresIn: Math.max(1, Math.round((next.accessTokenExpiresAt - Date.now()) / 1000)),
  });
}

/** Jobber returned 401 for this access token, so the stored copy must not be reused either. */
export function expireJobberAccessToken(): void {
  if (!memory) return;
  rejectedAccessToken = memory.tokens.accessToken;
  memory = { ...memory, tokens: { ...memory.tokens, accessTokenExpiresAt: 0 } };
}

/** Returns a usable access token, refreshing and storing the newest refresh token when needed. */
export async function getJobberAccessToken(): Promise<string> {
  const cached = memory;
  if (cached && isUsable(cached.tokens)) return cached.tokens.accessToken;

  const stored = await store.read();
  if (!stored) throw new Error("Jobber is not connected.");
  if (stored.status === "NEEDS_RECONNECT") throw new JobberReconnectRequired("refresh token rejected");
  if (isUsable(stored.tokens) && stored.tokens.accessToken !== rejectedAccessToken) {
    memory = { tokens: stored.tokens, version: stored.version };
    return stored.tokens.accessToken;
  }
  return refreshTokens(stored.tokens, stored.version);
}

export async function disconnectJobber(): Promise<void> {
  await store.clear();
  memory = null;
}
