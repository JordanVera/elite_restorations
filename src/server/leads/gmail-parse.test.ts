import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

import { parseGmailLead, type GmailLeadInput } from "./gmail-parse";

const occurredAt = "2026-11-13T18:04:00.000Z";

function message(overrides: Partial<GmailLeadInput>): GmailLeadInput {
  return {
    from: "",
    subject: "",
    body: "",
    messageId: "<masked-1@voice.test>",
    occurredAt,
    ...overrides,
  };
}

describe("gmail lead parsers", () => {
  it("parses a masked Google Voice text and drops the footer", () => {
    const parsed = parseGmailLead(
      message({
        from: "Ada Stone <masked-id@txt.voice.google.com>",
        replyTo: "masked-id@txt.voice.google.com",
        subject: "New text message from (713) 555-0148",
        body: [
          "New text message from (713) 555-0148",
          "",
          "The roof is leaking over the kitchen.",
          "",
          "To respond to this text message, reply to this email or open Google Voice.",
          "YOUR ACCOUNT",
          "https://voice.google.com",
        ].join("\n"),
      }),
    );
    assert.equal(parsed.action, "lead");
    if (parsed.action !== "lead") return;
    assert.equal(parsed.lead.source, "google_voice_text");
    assert.equal(parsed.lead.externalId, "<masked-1@voice.test>");
    assert.equal(parsed.lead.name, "Ada Stone");
    assert.equal(parsed.lead.phone, "(713) 555-0148");
    assert.equal(parsed.lead.message, "The roof is leaking over the kitchen.");
    assert.equal(parsed.lead.replyTo, "masked-id@txt.voice.google.com");
    const serialized = JSON.stringify(parsed);
    assert.equal(serialized.includes("YOUR ACCOUNT"), false);
    assert.equal(serialized.includes("To respond to this text"), false);
    assert.equal(serialized.includes("voice.google.com/"), false);
  });

  it("parses a masked voicemail transcript and a missed call", () => {
    const voicemail = parseGmailLead(
      message({
        from: "voice-noreply@google.com",
        subject: "New voicemail from (281) 555-0199",
        messageId: "<masked-vm@voice.test>",
        body: ["You have a new voicemail", "", "Transcript:", "Please call me about the hail damage.", "", "YOUR ACCOUNT"].join("\n"),
      }),
    );
    assert.equal(voicemail.action, "lead");
    if (voicemail.action !== "lead") return;
    assert.equal(voicemail.lead.source, "google_voice_voicemail");
    assert.equal(voicemail.lead.phone, "(281) 555-0199");
    assert.equal(voicemail.lead.message, "Please call me about the hail damage.");
    assert.equal(JSON.stringify(voicemail).includes("YOUR ACCOUNT"), false);

    const missed = parseGmailLead(
      message({
        from: "voice-noreply@google.com",
        subject: "Missed call from Pat Customer (832) 555-0177",
        messageId: "<masked-miss@voice.test>",
        body: "You missed a call.\n\nYOUR ACCOUNT",
      }),
    );
    assert.equal(missed.action, "lead");
    if (missed.action !== "lead") return;
    assert.equal(missed.lead.source, "google_voice_missed_call");
    assert.equal(missed.lead.name, "Pat Customer");
    assert.equal(missed.lead.phone, "(832) 555-0177");
    assert.equal(missed.lead.message, undefined);
  });

  it("parses an LSA request, including Potential Customer, and skips follow-ups", () => {
    const request = parseGmailLead(
      message({
        from: "Local Services <customer-request-48211@awexpress.google.com>",
        subject: "Ada Stone's new request",
        messageId: "<lsa-mail@awexpress.google.com>",
        body: [
          "Ada Stone's new request",
          "",
          "- Name",
          "Ada Stone",
          "",
          "- Location",
          "Katy",
          "",
          "- Service type",
          "Roof repair",
          "",
          "- Message",
          "Hail on the north slope.",
          "",
          "View this request",
        ].join("\n"),
      }),
    );
    assert.equal(request.action, "lead");
    if (request.action !== "lead") return;
    assert.equal(request.lead.source, "lsa_message");
    assert.equal(request.lead.externalId, "lsa:48211");
    assert.equal(request.lead.name, "Ada Stone");
    assert.equal(request.lead.address, "Katy");
    assert.equal(request.lead.service, "Roof repair");
    assert.equal(request.lead.message, "Hail on the north slope.");
    assert.equal(JSON.stringify(request).includes("View this request"), false);

    const potential = parseGmailLead(
      message({
        from: "customer-request-99@awexpress.google.com",
        subject: "Potential Customer's new request",
        body: ["- Name", "Pat Customer", "", "- Location", "Houston", "", "- Service type: Water damage", "", "- Message", "The ceiling is wet."].join("\n"),
      }),
    );
    assert.equal(potential.action, "lead");
    if (potential.action !== "lead") return;
    assert.equal(potential.lead.externalId, "lsa:99");
    assert.equal(potential.lead.name, "Pat Customer");
    assert.equal(potential.lead.address, "Houston");
    assert.equal(potential.lead.service, "Water damage");
    assert.equal(potential.lead.message, "The ceiling is wet.");

    const followUp = parseGmailLead(
      message({
        from: "customer-request-48211@awexpress.google.com",
        subject: "Ada Stone sent you a message",
        body: "- Message\nAny update?",
      }),
    );
    assert.deepEqual(followUp, { action: "skip", reason: "follow-up" });
  });

  it("skips LSA call notices and marketing mail", () => {
    const call = parseGmailLead(
      message({
        from: "localservices-noreply@google.com",
        subject: "New call from a potential customer",
        body: "Open your account to see this call.",
      }),
    );
    assert.deepEqual(call, { action: "skip", reason: "lsa-call" });

    const marketing = parseGmailLead(
      message({
        from: "localservices-noreply@google.com",
        subject: "Get more Local Services leads",
        body: "Tips for your ads.",
      }),
    );
    assert.deepEqual(marketing, { action: "skip", reason: "marketing" });

    const other = parseGmailLead(
      message({
        from: "ads-noreply@awexpress.google.com",
        subject: "Your weekly performance",
        body: "Impressions are up.",
      }),
    );
    assert.deepEqual(other, { action: "skip", reason: "marketing" });
  });

  it("keeps the Apps Script on a 30-minute trigger for both mailboxes", () => {
    const script = readFileSync(new URL("../../../scripts/gmail-lead-ingest/Code.gs", import.meta.url), "utf8");
    assert.equal(script.includes("everyMinutes(30)"), true);
    assert.equal(script.includes("-label:JobberSynced newer_than:2d"), true);
    assert.equal(script.includes("installLeadIngestTrigger"), true);
    assert.equal(script.includes("admin@eliterestorations.com"), true);
    assert.equal(script.includes("george@eliterestorations.com"), true);
    assert.equal(script.includes("sent you a message"), true);
    assert.equal(script.includes("New call from a potential customer") || script.includes("new call from a potential customer"), true);
  });

  it("does not post a voice mail that has no phone", () => {
    const parsed = parseGmailLead(
      message({
        from: "voice-noreply@google.com",
        subject: "Missed call from Pat Customer",
        body: "You missed a call.",
      }),
    );
    assert.deepEqual(parsed, { action: "skip", reason: "missing-phone" });
  });
});
