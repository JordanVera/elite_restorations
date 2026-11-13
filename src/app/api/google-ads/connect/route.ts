import { NextResponse, type NextRequest } from "next/server";

import {
  GOOGLE_ADS_AUTHORIZE_URL,
  GOOGLE_ADS_OAUTH_COOKIE,
  GOOGLE_ADS_REDIRECT_URI,
  GOOGLE_ADS_SCOPE,
  googleAdsClientId,
  googleAdsClientSecret,
  googleAdsConnectKeys,
} from "@/server/google-ads/config";
import { anyKeyMatches, codeChallenge, createOAuthHandoff, signOAuthHandoff } from "@/server/jobber/oauth-state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const keys = googleAdsConnectKeys();
  const clientId = googleAdsClientId();
  const clientSecret = googleAdsClientSecret();
  if (!keys.length || !clientId || !clientSecret) {
    return NextResponse.json({ error: "Google Ads connect is not configured." }, { status: 503 });
  }

  const provided = request.nextUrl.searchParams.get("key") ?? "";
  if (!anyKeyMatches(provided, keys)) {
    return NextResponse.json({ error: "This connect link is not valid." }, { status: 401 });
  }

  const host = request.nextUrl.hostname;
  if (host !== "eliterestorations.com") {
    return NextResponse.json(
      { error: "Open the connect link on https://eliterestorations.com so Google can finish the callback." },
      { status: 400 },
    );
  }

  const handoff = createOAuthHandoff();
  const url = new URL(GOOGLE_ADS_AUTHORIZE_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", GOOGLE_ADS_REDIRECT_URI);
  url.searchParams.set("scope", GOOGLE_ADS_SCOPE);
  url.searchParams.set("state", handoff.state);
  url.searchParams.set("code_challenge", codeChallenge(handoff.verifier));
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");

  const response = NextResponse.redirect(url);
  response.cookies.set({
    name: GOOGLE_ADS_OAUTH_COOKIE,
    value: signOAuthHandoff(handoff, clientSecret),
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:" || process.env.VERCEL === "1",
    sameSite: "lax",
    path: "/api/google-ads",
    maxAge: 600,
  });
  return response;
}
