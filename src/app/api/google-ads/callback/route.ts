import { NextResponse, type NextRequest } from "next/server";

import { GOOGLE_ADS_OAUTH_COOKIE, googleAdsClientSecret } from "@/server/google-ads/config";
import { exchangeGoogleAdsCode, isGoogleAdsTokenStoreError } from "@/server/google-ads/tokens";
import { readOAuthHandoff, statesMatch } from "@/server/jobber/oauth-state";
import { safeLog } from "@/server/safe-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function page(title: string, body: string, status: number) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${title}</title></head>
<body style="font-family: Georgia, serif; max-width: 36rem; margin: 4rem auto; padding: 0 1rem;">
  <h1>${title}</h1>
  <p>${body}</p>
</body>
</html>`;
  const response = new NextResponse(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
  response.cookies.set({ name: GOOGLE_ADS_OAUTH_COOKIE, value: "", path: "/api/google-ads", maxAge: 0 });
  return response;
}

export async function GET(request: NextRequest) {
  const secret = googleAdsClientSecret();
  if (!secret) return page("Google Ads is not configured.", "The token exchange is missing its credentials.", 503);

  const oauthError = request.nextUrl.searchParams.get("error");
  if (oauthError) return page("Google did not grant access.", "Start the connect link again while signed in to Google Ads.", 400);

  const code = request.nextUrl.searchParams.get("code") ?? "";
  const state = request.nextUrl.searchParams.get("state") ?? "";
  const cookie = request.cookies.get(GOOGLE_ADS_OAUTH_COOKIE)?.value ?? "";
  const handoff = cookie ? readOAuthHandoff(cookie, secret) : null;
  if (!code || !handoff || !statesMatch(state, handoff.state)) {
    return page("This connect link expired.", "Open the connect link again and approve access within 10 minutes.", 400);
  }

  try {
    await exchangeGoogleAdsCode(code, handoff.verifier);
  } catch (error) {
    console.error("[google-ads] connect failed", safeLog(error));
    const body = isGoogleAdsTokenStoreError(error)
      ? "Google approved the connection, but the website couldn't save it. Start the connect link again."
      : "The approval was received, but the token exchange failed. Start the connect link again.";
    return page("Google Ads did not connect.", body, 502);
  }

  return page(
    "Google Ads is connected.",
    "Local Services leads can now be imported into Jobber. You can close this tab.",
    200,
  );
}
