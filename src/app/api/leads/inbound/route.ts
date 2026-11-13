import { NextResponse, type NextRequest } from "next/server";

import { keysMatch } from "@/server/jobber/oauth-state";
import { acceptInboundLead } from "@/server/leads/accept";
import { bearerToken, inboundLeadSchema, type InboundLead } from "@/server/leads/inbound-lead";
import type { LeadIngestStatus } from "@/server/leads/dedupe";
import { safeLog } from "@/server/safe-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function statusResponse(status: LeadIngestStatus) {
  if (status === "created" || status === "duplicate") return NextResponse.json({ status }, { status: 200 });
  if (status === "not-configured") return NextResponse.json({ status }, { status: 503 });
  return NextResponse.json({ status: "failed" }, { status: 500 });
}

export async function POST(request: NextRequest) {
  const secret = process.env.LEAD_INGEST_SECRET?.trim() ?? "";
  if (!secret) return NextResponse.json({ status: "not-configured" }, { status: 503 });

  const provided = bearerToken(request.headers.get("authorization"));
  if (!keysMatch(provided, secret)) return NextResponse.json({ status: "failed" }, { status: 401 });

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ status: "failed" }, { status: 400 });
  }

  const parsed = inboundLeadSchema.safeParse(json);
  if (!parsed.success) {
    const voice = parsed.error.issues.some((issue) => issue.message === "Voice leads require a phone.");
    return NextResponse.json(
      { status: "failed", error: voice ? "Voice leads require a phone." : "Invalid lead." },
      { status: 400 },
    );
  }

  try {
    const lead: InboundLead = parsed.data;
    return statusResponse(await acceptInboundLead(lead));
  } catch (error) {
    console.error("[leads] inbound failed", safeLog(error));
    return NextResponse.json({ status: "failed" }, { status: 500 });
  }
}
