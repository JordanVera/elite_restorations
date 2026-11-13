import { NextResponse, type NextRequest } from "next/server";

import {
  JOBBER_AUTHORIZE_URL,
  JOBBER_REDIRECT_URI,
  jobberClientId,
  jobberClientSecret,
  jobberConnectKey,
} from "@/server/jobber/config";
import { codeChallenge, createOAuthHandoff, keysMatch, signOAuthHandoff, OAUTH_COOKIE } from "@/server/jobber/oauth-state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const expected = jobberConnectKey();
  const clientId = jobberClientId();
  const clientSecret = jobberClientSecret();
  if (!expected || !clientId || !clientSecret) {
    return NextResponse.json({ error: "Jobber connect is not configured." }, { status: 503 });
  }

  const provided = request.nextUrl.searchParams.get("key") ?? "";
  if (!keysMatch(provided, expected)) {
    return NextResponse.json({ error: "This connect link is not valid." }, { status: 401 });
  }

  const host = request.nextUrl.hostname;
  if (host !== "eliterestorations.com") {
    return NextResponse.json(
      { error: "Open the connect link on https://eliterestorations.com so Jobber can finish the callback." },
      { status: 400 },
    );
  }

  const handoff = createOAuthHandoff();
  const url = new URL(JOBBER_AUTHORIZE_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", JOBBER_REDIRECT_URI);
  url.searchParams.set("state", handoff.state);
  url.searchParams.set("code_challenge", codeChallenge(handoff.verifier));
  url.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(url);
  response.cookies.set({
    name: OAUTH_COOKIE,
    value: signOAuthHandoff(handoff, clientSecret),
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:" || process.env.VERCEL === "1",
    sameSite: "lax",
    path: "/api/jobber",
    maxAge: 600,
  });
  return response;
}
