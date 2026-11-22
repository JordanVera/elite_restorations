import { NextResponse, type NextRequest } from "next/server";

import { can } from "@/server/auth/policy";
import { getAdmin } from "@/server/auth/session";
import { databaseConfigured } from "@/server/db/client";
import {
  JOBBER_AUTHORIZE_URL,
  jobberClientId,
  jobberClientSecret,
  jobberConnectKey,
  jobberRedirectUri,
} from "@/server/jobber/config";
import { codeChallenge, createOAuthHandoff, keysMatch, signOAuthHandoff, OAUTH_COOKIE } from "@/server/jobber/oauth-state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Starts Jobber OAuth. Allowed for a signed-in admin with integration
 * rights, or with the legacy ?key=JOBBER_CONNECT_KEY link.
 */
export async function GET(request: NextRequest) {
  const clientId = jobberClientId();
  const clientSecret = jobberClientSecret();
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Jobber connect is not configured." }, { status: 503 });
  }

  const admin = databaseConfigured() ? await getAdmin().catch(() => null) : null;
  const adminAllowed = Boolean(admin && can(admin.role, "manage_integrations"));
  const expected = jobberConnectKey();
  const provided = request.nextUrl.searchParams.get("key") ?? "";
  const keyAllowed = Boolean(expected && provided && keysMatch(provided, expected));
  if (!adminAllowed && !keyAllowed) {
    return NextResponse.json({ error: "This connect link is not valid." }, { status: 401 });
  }

  const redirectUri = jobberRedirectUri();
  const callbackHost = new URL(redirectUri).host;
  if (request.nextUrl.host !== callbackHost) {
    return NextResponse.json(
      { error: `Open the connect link on https://${callbackHost} so Jobber can finish the callback.` },
      { status: 400 },
    );
  }

  const handoff = createOAuthHandoff();
  const url = new URL(JOBBER_AUTHORIZE_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
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
