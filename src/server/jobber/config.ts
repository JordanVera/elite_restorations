import "server-only";

/** Version shown as current in Jobber's API docs (13 Nov 2026). Override with JOBBER_GRAPHQL_VERSION. */
export const DEFAULT_GRAPHQL_VERSION = "2025-04-16";

export const JOBBER_AUTHORIZE_URL = "https://api.getjobber.com/api/oauth/authorize";
export const JOBBER_TOKEN_URL = "https://api.getjobber.com/api/oauth/token";
export const JOBBER_GRAPHQL_URL = "https://api.getjobber.com/api/graphql";
export const JOBBER_REDIRECT_URI = "https://eliterestorations.com/api/jobber/callback";
export const TOKEN_PATH = "jobber/oauth.json";

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
