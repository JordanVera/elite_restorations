import "server-only";

import { describeLead } from "@/server/leads/describe";
import { isSmtpConfigured, sendInquiryEmail } from "@/server/mail";
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
 * Delivery is opt-in via SMTP and/or INQUIRY_WEBHOOK_URL. Until at least one is
 * set, leads are validated but not sent anywhere.
 */
export async function deliverLead(lead: DeliverableLead): Promise<DeliveryResult> {
  const useSmtp = isSmtpConfigured();
  const useWebhook = isWebhookConfigured();

  if (!useSmtp && !useWebhook) {
    return { status: "not-configured" };
  }

  const results = await Promise.all([
    useSmtp ? sendInquiryEmail(lead) : Promise.resolve(false),
    useWebhook ? deliverViaWebhook(lead) : Promise.resolve(false),
  ]);

  if (results.some(Boolean)) {
    return { status: "delivered" };
  }

  return { status: "failed" };
}
