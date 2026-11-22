import { NextResponse, type NextRequest } from "next/server";

import { logActivity } from "@/server/activity";
import { getAdmin } from "@/server/auth/session";
import { databaseConfigured } from "@/server/db/client";
import { jobberClientSecret } from "@/server/jobber/config";
import { jobberGraphql } from "@/server/jobber/graphql";
import { OAUTH_COOKIE, readOAuthHandoff, statesMatch } from "@/server/jobber/oauth-state";
import { ACCOUNT_QUERY } from "@/server/jobber/queries";
import { updateConnectionMeta } from "@/server/jobber/token-store";
import { exchangeJobberCode, isJobberTokenStoreError } from "@/server/jobber/tokens";
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
  response.cookies.set({ name: OAUTH_COOKIE, value: "", path: "/api/jobber", maxAge: 0 });
  return response;
}

function toSettings(request: NextRequest, result: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/settings/integrations";
  url.search = `?jobber=${result}`;
  const response = NextResponse.redirect(url);
  response.cookies.set({ name: OAUTH_COOKIE, value: "", path: "/api/jobber", maxAge: 0 });
  return response;
}

export async function GET(request: NextRequest) {
  const secret = jobberClientSecret();
  if (!secret) return page("Jobber is not configured.", "The token exchange is missing its credentials.", 503);

  const admin = databaseConfigured() ? await getAdmin().catch(() => null) : null;

  const oauthError = request.nextUrl.searchParams.get("error");
  if (oauthError) {
    if (admin) return toSettings(request, "denied");
    return page("Jobber did not grant access.", "Start the connect link again while signed in to Jobber.", 400);
  }

  const code = request.nextUrl.searchParams.get("code") ?? "";
  const state = request.nextUrl.searchParams.get("state") ?? "";
  const cookie = request.cookies.get(OAUTH_COOKIE)?.value ?? "";
  const handoff = cookie ? readOAuthHandoff(cookie, secret) : null;
  if (!code || !handoff || !statesMatch(state, handoff.state)) {
    if (admin) return toSettings(request, "expired");
    return page("This connect link expired.", "Open the connect link again and approve access within 10 minutes.", 400);
  }

  try {
    await exchangeJobberCode(code, handoff.verifier);
  } catch (error) {
    console.error("[jobber] connect failed", safeLog(error));
    if (admin) return toSettings(request, isJobberTokenStoreError(error) ? "store-error" : "exchange-error");
    const body = isJobberTokenStoreError(error)
      ? "Jobber approved the connection, but the website couldn't save it. Start the connect link again."
      : "The approval was received, but the token exchange failed. Start the connect link again.";
    return page("Jobber did not connect.", body, 502);
  }

  try {
    const data = await jobberGraphql<{ account: { id: string; name: string } | null }>(ACCOUNT_QUERY, {}, { retries: 1 });
    if (data.account) await updateConnectionMeta({ accountId: data.account.id, accountName: data.account.name });
  } catch (error) {
    console.error("[jobber] account lookup after connect failed", safeLog(error));
  }

  await logActivity({
    actorType: admin ? "ADMIN" : "SYSTEM",
    actorId: admin?.id ?? null,
    actorName: admin?.name ?? null,
    action: "jobber.connected",
    entityType: "JobberConnection",
    entityId: "jobber",
  }).catch(() => undefined);

  if (admin) return toSettings(request, "connected");
  return page("Jobber is connected.", "Estimate forms can now create a client and a request. You can close this tab.", 200);
}
