import "server-only";

import { describeLead } from "@/server/leads/describe";
import type { DeliverableLead } from "@/server/leads/types";

export type DeliveryResult = { status: "delivered" } | { status: "not-configured" } | { status: "failed" };

/**
 * Delivery is intentionally opt-in. Until INQUIRY_WEBHOOK_URL is set, leads
 * are validated but not sent anywhere, and callers must not report success.
 *
 * The Jobber hand-off (src/server/leads/jobber.ts) is a separate sink that is
 * not connected here yet.
 */
export async function deliverLead(lead: DeliverableLead): Promise<DeliveryResult> {
  const url = process.env.INQUIRY_WEBHOOK_URL;
  if (!url) return { status: "not-configured" };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        receivedAt: new Date().toISOString(),
        summary: describeLead(lead),
        ...lead,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return response.ok ? { status: "delivered" } : { status: "failed" };
  } catch {
    return { status: "failed" };
  }
}
