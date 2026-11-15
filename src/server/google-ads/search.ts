import "server-only";

import { googleAdsDeveloperToken } from "@/server/google-ads/config";
import { expireGoogleAdsAccessToken, getGoogleAdsAccessToken } from "@/server/google-ads/tokens";
import { googleAdsRequestHeaders, googleAdsSearchUrl } from "@/server/leads/lsa";

type SearchPage = {
  results?: unknown[];
  nextPageToken?: string;
};

async function searchPage(query: string, pageToken: string, accessToken: string): Promise<SearchPage & { status: number; requestId: string }> {
  const response = await fetch(googleAdsSearchUrl(), {
    method: "POST",
    headers: googleAdsRequestHeaders(accessToken, googleAdsDeveloperToken() ?? undefined),
    body: JSON.stringify({ query, ...(pageToken ? { pageToken } : {}) }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    await response.body?.cancel().catch(() => undefined);
    return { status: response.status, requestId: response.headers.get("request-id") ?? "", results: [] };
  }
  const body = (await response.json().catch(() => ({}))) as SearchPage;
  return {
    status: response.status,
    requestId: response.headers.get("request-id") ?? "",
    results: body.results ?? [],
    nextPageToken: body.nextPageToken,
  };
}

/** Runs a GAQL search against customer 8441992586. Rows are returned unlogged. */
export async function googleAdsSearch(query: string): Promise<unknown[]> {
  const rows: unknown[] = [];
  let pageToken = "";
  let accessToken = await getGoogleAdsAccessToken();
  let refreshed = false;

  for (let page = 0; page < 10; page += 1) {
    const result = await searchPage(query, pageToken, accessToken);
    if (result.status === 401 && !refreshed) {
      refreshed = true;
      expireGoogleAdsAccessToken();
      accessToken = await getGoogleAdsAccessToken();
      page -= 1;
      continue;
    }
    if (result.status !== 200) {
      console.error("[google-ads] search failed", result.status, result.requestId);
      throw new Error(`Google Ads search failed (${result.status})`);
    }
    rows.push(...(result.results ?? []));
    if (!result.nextPageToken) return rows;
    pageToken = result.nextPageToken;
  }

  console.error("[google-ads] search stopped at the page cap");
  throw new Error("Google Ads search returned too many pages.");
}
