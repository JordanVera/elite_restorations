import "server-only";

export const GOOGLE_ADS_AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_ADS_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GOOGLE_ADS_SCOPE = "https://www.googleapis.com/auth/adwords";
export const GOOGLE_ADS_REDIRECT_URI = "https://eliterestorations.com/api/google-ads/callback";
export const GOOGLE_ADS_TOKEN_PATH = "google-ads/oauth.json";
export const LSA_WATERMARK_PATH = "google-ads/lsa-watermark.json";
export const GOOGLE_ADS_OAUTH_COOKIE = "google_ads_oauth";

export function googleAdsClientId(): string | null {
  return process.env.GOOGLE_ADS_CLIENT_ID?.trim() || null;
}

export function googleAdsClientSecret(): string | null {
  return process.env.GOOGLE_ADS_CLIENT_SECRET?.trim() || null;
}

/** Optional. Google stopped requiring this header on 9 September 2026. Sent only when set. */
export function googleAdsDeveloperToken(): string | null {
  return process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim() || null;
}

export function googleAdsCredentialsReady(): boolean {
  return Boolean(googleAdsClientId() && googleAdsClientSecret());
}

/**
 * The connect link accepts GOOGLE_ADS_CONNECT_KEY when it is set, and otherwise
 * JOBBER_CONNECT_KEY. When both are set, either key works.
 */
export function googleAdsConnectKeys(): string[] {
  const keys = [process.env.GOOGLE_ADS_CONNECT_KEY, process.env.JOBBER_CONNECT_KEY];
  const unique: string[] = [];
  for (const key of keys) {
    const trimmed = key?.trim();
    if (trimmed && !unique.includes(trimmed)) unique.push(trimmed);
  }
  return unique;
}
