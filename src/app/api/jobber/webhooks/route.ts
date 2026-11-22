import { after, NextResponse, type NextRequest } from "next/server";

import { logActivity } from "@/server/activity";
import { db } from "@/server/db/client";
import { jobberClientSecret, jobberWebhooksEnabled } from "@/server/jobber/config";
import { refreshFromJobber } from "@/server/jobber/import";
import { jobberMode } from "@/server/jobber/mode";
import { liveReader } from "@/server/jobber/reader";
import { createDeduper, parseWebhookEvent, verifyJobberWebhook, webhookAction } from "@/server/jobber/webhook";
import { safeLog } from "@/server/safe-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isDuplicate = createDeduper();

/**
 * Jobber webhooks. Jobber expects a response within 1 second, so the
 * signature is checked here and the re-fetch runs after the response.
 */
export async function POST(request: NextRequest) {
  const secret = jobberClientSecret();
  if (!secret) return NextResponse.json({ error: "not configured" }, { status: 503 });

  const raw = await request.text();
  if (raw.length > 64_000) return NextResponse.json({ error: "too large" }, { status: 413 });
  if (!verifyJobberWebhook(raw, request.headers.get("x-jobber-hmac-sha256"), secret)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const event = parseWebhookEvent(raw);
  if (!event) return NextResponse.json({ error: "unrecognized payload" }, { status: 400 });
  if (!jobberWebhooksEnabled() || jobberMode() !== "live" || isDuplicate(event)) {
    return NextResponse.json({ ok: true });
  }

  const action = webhookAction(event);
  if (action.type === "ignore") return NextResponse.json({ ok: true });

  after(async () => {
    try {
      const connection = await db().jobberConnection.findUnique({ where: { id: "jobber" }, select: { accountId: true } });
      if (connection?.accountId && connection.accountId !== event.accountId) return;

      if (action.type === "refresh-quote") await refreshFromJobber("quote", action.id, liveReader());
      else if (action.type === "refresh-client") await refreshFromJobber("client", action.id, liveReader());
      else if (action.type === "remove-quote") {
        // Quotes with portals are kept so customer selections are not lost.
        await db().jobberQuote.deleteMany({ where: { jobberId: action.id, portals: { none: {} } } });
      } else if (action.type === "disconnect") {
        await db().jobberConnection.updateMany({
          where: { id: "jobber" },
          data: { status: "DISCONNECTED", lastError: "The app was disconnected in Jobber." },
        });
      }
      await logActivity({
        actorType: "SYSTEM",
        action: "jobber.webhook",
        entityType: "JobberWebhook",
        entityId: event.itemId,
        metadata: { topic: event.topic },
      });
    } catch (error) {
      console.error("[jobber] webhook processing failed", event.topic, safeLog(error));
    }
  });

  return NextResponse.json({ ok: true });
}
