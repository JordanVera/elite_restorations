import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { describe, it } from "node:test";

import { createDeduper, parseWebhookEvent, verifyJobberWebhook, webhookAction } from "./webhook";

const secret = "test-client-secret";
const body = JSON.stringify({
  data: { webHookEvent: { topic: "QUOTE_UPDATE", appId: "app", accountId: "acct", itemId: "quote-1", occurredAt: "2026-01-01T00:00:00Z" } },
});
const sign = (raw: string, key = secret) => createHmac("sha256", key).update(raw).digest("base64");

describe("Jobber webhooks", () => {
  it("accepts a correct signature", () => {
    assert.equal(verifyJobberWebhook(body, sign(body), secret), true);
  });

  it("rejects a wrong secret, a tampered body, or a missing header", () => {
    assert.equal(verifyJobberWebhook(body, sign(body, "other"), secret), false);
    assert.equal(verifyJobberWebhook(body.replace("quote-1", "quote-2"), sign(body), secret), false);
    assert.equal(verifyJobberWebhook(body, null, secret), false);
    assert.equal(verifyJobberWebhook(body, "not base64!!", secret), false);
    assert.equal(verifyJobberWebhook(body, sign(body), ""), false);
  });

  it("parses the event and maps topics to actions", () => {
    const event = parseWebhookEvent(body);
    assert.ok(event);
    assert.deepEqual(webhookAction(event), { type: "refresh-quote", id: "quote-1" });
    assert.deepEqual(webhookAction({ ...event, topic: "QUOTE_DESTROY" }), { type: "remove-quote", id: "quote-1" });
    assert.deepEqual(webhookAction({ ...event, topic: "CLIENT_UPDATE" }), { type: "refresh-client", id: "quote-1" });
    assert.deepEqual(webhookAction({ ...event, topic: "APP_DISCONNECT" }), { type: "disconnect" });
    assert.deepEqual(webhookAction({ ...event, topic: "INVOICE_CREATE" }), { type: "ignore" });
    assert.equal(parseWebhookEvent("{"), null);
    assert.equal(parseWebhookEvent(JSON.stringify({ data: {} })), null);
  });

  it("drops repeats of the same event within the window", () => {
    const isDuplicate = createDeduper(1000);
    const event = parseWebhookEvent(body)!;
    assert.equal(isDuplicate(event, 0), false);
    assert.equal(isDuplicate(event, 500), true);
    assert.equal(isDuplicate(event, 2000), false);
  });
});
