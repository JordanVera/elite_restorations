import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { privateBlobTokenFrom } from "../private-blob-token";
import { dedupePath, ingestOnce, memoryDedupeStore } from "./dedupe";
import { bearerToken, inboundLeadSchema, inboundRequestPreview, leadDisplayName, titleFor } from "./inbound-lead";

describe("lead dedupe", () => {
  it("uses one private-blob key for the email path and the Google Ads path", () => {
    const emailId = "lsa:48211";
    const apiId = "lsa:48211";
    assert.equal(dedupePath(emailId), dedupePath(apiId));
    assert.equal(dedupePath(` ${emailId} `), dedupePath(apiId));
    assert.notEqual(dedupePath(emailId), dedupePath("lsa:48212"));
    const voiceId = "<masked-voice-1@txt.voice.google.com>";
    assert.equal(dedupePath(voiceId).includes("masked-voice"), false);
    assert.equal(dedupePath(voiceId).startsWith("leads/dedupe/"), true);
  });

  it("returns duplicate for a repeat and creates again after a failed attempt", async () => {
    const store = memoryDedupeStore();
    let calls = 0;
    const first = await ingestOnce(store, "lsa:42", async () => {
      calls += 1;
      return "created";
    });
    const repeat = await ingestOnce(store, "lsa:42", async () => {
      calls += 1;
      return "created";
    });
    assert.equal(first, "created");
    assert.equal(repeat, "duplicate");
    assert.equal(calls, 1);

    const failed = await ingestOnce(store, "gmail:1", async () => "failed");
    const retry = await ingestOnce(store, "gmail:1", async () => "created");
    assert.equal(failed, "failed");
    assert.equal(retry, "created");
  });

  it("reads the private blob token and ignores the public photo token", () => {
    assert.equal(
      privateBlobTokenFrom({
        JOBBER_BLOB_READ_WRITE_TOKEN: "private-token",
        BLOB_READ_WRITE_TOKEN: "public-token",
      }),
      "private-token",
    );
    assert.throws(
      () => privateBlobTokenFrom({ BLOB_READ_WRITE_TOKEN: "public-token" }),
      /JOBBER_BLOB_READ_WRITE_TOKEN/,
    );
  });
});

describe("inbound lead shape", () => {
  it("requires a phone for voice and not for an LSA message", () => {
    const voice = inboundLeadSchema.safeParse({
      source: "google_voice_text",
      externalId: "<masked@voice.test>",
      occurredAt: "2026-11-13T18:00:00.000Z",
      message: "The roof is leaking.",
    });
    assert.equal(voice.success, false);

    const lsa = inboundLeadSchema.safeParse({
      source: "lsa_message",
      externalId: "lsa:42",
      occurredAt: "2026-11-13 12:00:00",
      name: "Ada Stone",
      service: "Roof repair",
      message: "Hail on the north slope.",
    });
    assert.equal(lsa.success, true);
    if (!lsa.success) return;
    const request = inboundRequestPreview(lsa.data);
    assert.equal(request.title, "Google LSA message · Roof repair");
    assert.equal("source" in request, false);
    const labels = request.requestDetails.form.sections[0].items.map((item) => item.label);
    assert.equal(labels.includes("Source"), true);
    assert.equal(labels.includes("Insurance claim"), false);
    assert.equal(labels.includes("Service"), true);
    assert.equal(request.requestDetails.form.sections[0].items.find((item) => item.label === "Source")?.answerText, "Google LSA message");
  });

  it("names a phone-only lead with the formatted number", () => {
    assert.equal(leadDisplayName("", "7135550148"), "(713) 555-0148");
    assert.equal(leadDisplayName("Ada Stone", "7135550148"), "Ada Stone");
    assert.equal(titleFor("google_voice_voicemail"), "Google Voice voicemail");
    assert.equal(titleFor("google_voice_missed_call"), "Google Voice missed call");
    assert.equal(titleFor("lsa_phone"), "Google LSA phone lead");
    assert.equal(titleFor("google_voice_text"), "Google Voice text");
  });

  it("reads a bearer token without keeping surrounding space", () => {
    assert.equal(bearerToken("Bearer secret-value"), "secret-value");
    assert.equal(bearerToken("bearer secret-value"), "secret-value");
    assert.equal(bearerToken("secret-value"), "");
  });
});
