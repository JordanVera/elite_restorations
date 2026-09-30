import "server-only";

import type { Inquiry } from "@/lib/inquiry-schema";

export type DeliveryResult = { status: "delivered" } | { status: "not-configured" } | { status: "failed" };

/**
 * Delivery is intentionally opt-in. Until INQUIRY_WEBHOOK_URL is set, inquiries
 * are validated but not sent anywhere, and callers must not report success.
 */
export async function deliverInquiry(inquiry: Inquiry): Promise<DeliveryResult> {
  const url = process.env.INQUIRY_WEBHOOK_URL;
  if (!url) return { status: "not-configured" };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        receivedAt: new Date().toISOString(),
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        service: inquiry.service,
        message: inquiry.message,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return response.ok ? { status: "delivered" } : { status: "failed" };
  } catch {
    return { status: "failed" };
  }
}
