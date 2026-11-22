import { createHmac, timingSafeEqual } from "node:crypto";

/** X-Jobber-Hmac-SHA256 is base64(HMAC-SHA256(client secret, raw body)). Compared in constant time. */
export function verifyJobberWebhook(rawBody: string, signature: string | null, clientSecret: string): boolean {
  if (!signature || !clientSecret) return false;
  const expected = createHmac("sha256", clientSecret).update(rawBody, "utf8").digest();
  let provided: Buffer;
  try {
    provided = Buffer.from(signature.trim(), "base64");
  } catch {
    return false;
  }
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

export type WebhookEvent = { topic: string; accountId: string; itemId: string; occurredAt: string | null };

/** Payload shape from Jobber's webhook guide. Older apps send occuredAt (one r). */
export function parseWebhookEvent(rawBody: string): WebhookEvent | null {
  try {
    const parsed = JSON.parse(rawBody) as {
      data?: { webHookEvent?: { topic?: unknown; accountId?: unknown; itemId?: unknown; occurredAt?: unknown; occuredAt?: unknown } };
    };
    const event = parsed.data?.webHookEvent;
    if (!event || typeof event.topic !== "string" || typeof event.itemId !== "string" || typeof event.accountId !== "string") {
      return null;
    }
    const occurred = typeof event.occurredAt === "string" ? event.occurredAt : typeof event.occuredAt === "string" ? event.occuredAt : null;
    return { topic: event.topic, accountId: event.accountId, itemId: event.itemId, occurredAt: occurred };
  } catch {
    return null;
  }
}

export type WebhookAction =
  | { type: "refresh-quote"; id: string }
  | { type: "remove-quote"; id: string }
  | { type: "refresh-client"; id: string }
  | { type: "disconnect" }
  | { type: "ignore" };

export function webhookAction(event: WebhookEvent): WebhookAction {
  switch (event.topic) {
    case "QUOTE_CREATE":
    case "QUOTE_UPDATE":
    case "QUOTE_SENT":
    case "QUOTE_APPROVED":
      return { type: "refresh-quote", id: event.itemId };
    case "QUOTE_DESTROY":
      return { type: "remove-quote", id: event.itemId };
    case "CLIENT_CREATE":
    case "CLIENT_UPDATE":
      return { type: "refresh-client", id: event.itemId };
    case "APP_DISCONNECT":
      return { type: "disconnect" };
    default:
      return { type: "ignore" };
  }
}

/** Jobber delivers at least once and can fire the same topic twice in a second. */
export function createDeduper(windowMs = 10_000) {
  const seen = new Map<string, number>();
  return (event: WebhookEvent, now = Date.now()): boolean => {
    const key = `${event.topic}:${event.itemId}`;
    const last = seen.get(key);
    seen.set(key, now);
    if (seen.size > 2000) {
      for (const [k, t] of seen) if (now - t > windowMs) seen.delete(k);
    }
    return last !== undefined && now - last < windowMs;
  };
}
