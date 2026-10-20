import "server-only";

import { describeLead } from "@/server/leads/describe";
import { sendInquiryEmail } from "@/server/mail";
import type { DeliverableLead } from "@/server/leads/types";

export type DeliveryResult = { status: "delivered" } | { status: "not-configured" } | { status: "failed" };

function isWebhookConfigured(): boolean {
  return Boolean(process.env.INQUIRY_WEBHOOK_URL?.trim());
}

async function deliverViaWebhook(lead: DeliverableLead): Promise<boolean> {
  const url = process.env.INQUIRY_WEBHOOK_URL?.trim();
  if (!url) return false;

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
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Production sends through the GoDaddy email gateway. Local development uses
 * SMTP. INQUIRY_WEBHOOK_URL is an optional extra copy.
 */
export async function deliverLead(lead: DeliverableLead): Promise<DeliveryResult> {
  const useWebhook = isWebhookConfigured();

  const [email, webhookSent] = await Promise.all([
    sendInquiryEmail(lead),
    useWebhook ? deliverViaWebhook(lead) : Promise.resolve(false),
  ]);

  if (email.status === "sent" || webhookSent) {
    return { status: "delivered" };
  }

  if (email.status === "unconfigured" && !useWebhook) {
    return { status: "not-configured" };
  }

  return { status: "failed" };
}
