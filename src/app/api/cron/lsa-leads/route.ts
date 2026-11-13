import { NextResponse, type NextRequest } from "next/server";

import { syncLsaLeads } from "@/server/google-ads/lsa-sync";
import { keysMatch } from "@/server/jobber/oauth-state";
import { bearerToken } from "@/server/leads/inbound-lead";
import { safeLog } from "@/server/safe-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim() ?? "";
  if (!secret) return NextResponse.json({ status: "not-configured" });

  if (!keysMatch(bearerToken(request.headers.get("authorization")), secret)) {
    return NextResponse.json({ status: "failed" }, { status: 401 });
  }

  try {
    const report = await syncLsaLeads();
    const http = report.status === "failed" ? 500 : 200;
    return NextResponse.json(report, { status: http });
  } catch (error) {
    console.error("[lsa] cron failed", safeLog(error));
    return NextResponse.json({ status: "failed" }, { status: 500 });
  }
}
