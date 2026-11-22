import "server-only";

/** Version shown as current in Jobber's API docs (13 Nov 2026). Override with JOBBER_GRAPHQL_VERSION. */
export const DEFAULT_GRAPHQL_VERSION = "2025-04-16";

export const JOBBER_AUTHORIZE_URL = "https://api.getjobber.com/api/oauth/authorize";
export const JOBBER_TOKEN_URL = "https://api.getjobber.com/api/oauth/token";
export const JOBBER_GRAPHQL_URL = "https://api.getjobber.com/api/graphql";
export const JOBBER_REDIRECT_URI = "https://eliterestorations.com/api/jobber/callback";
/** Legacy Blob location of the tokens. Read once to import into the database, then deleted. */
export const TOKEN_PATH = "jobber/oauth.json";

/** Must exactly match a callback URL registered on the app in the Jobber Developer Center. */
export function jobberRedirectUri(): string {
  return process.env.JOBBER_REDIRECT_URI?.trim() || JOBBER_REDIRECT_URI;
}

export function jobberWebhooksEnabled(): boolean {
  return process.env.JOBBER_WEBHOOK_ENABLED?.trim() === "true";
}

export function jobberClientId(): string | null {
  return process.env.JOBBER_CLIENT_ID?.trim() || null;
}

export function jobberClientSecret(): string | null {
  return process.env.JOBBER_CLIENT_SECRET?.trim() || null;
}

export function jobberConnectKey(): string | null {
  return process.env.JOBBER_CONNECT_KEY?.trim() || null;
}

export function jobberGraphqlVersion(): string {
  return process.env.JOBBER_GRAPHQL_VERSION?.trim() || DEFAULT_GRAPHQL_VERSION;
}

export function jobberCredentialsReady(): boolean {
  return Boolean(jobberClientId() && jobberClientSecret());
}
