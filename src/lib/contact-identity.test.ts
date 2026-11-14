import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

import {
  contactFieldErrors,
  contactIdentityCopy,
  leadInputErrorMessage,
  messageFromUnknownError,
  websiteLeadContactError,
} from "./contact-identity";
import { leadSchema } from "./inquiry-schema";

const startedAt = 1_000_000;

function estimate(overrides: Record<string, unknown> = {}) {
  return {
    path: "estimate",
    name: "Ada Stone",
    phone: "(713) 909-0034",
    email: "",
    address: "77082",
    service: "storm-hail",
    claim: "no",
    contactMethod: "phone",
    message: "",
    website: "",
    startedAt,
    ...overrides,
  };
}

function partner(overrides: Record<string, unknown> = {}) {
  return {
    path: "partner",
    name: "Ada Stone",
    phone: "+1 713-909-0034",
    email: "ada@example.com",
    company: "Stone Realty",
    contactMethod: "email",
    message: "We refer buyers who need a roof after a storm.",
    website: "",
    startedAt,
    ...overrides,
  };
}

function rejection(input: unknown): string {
  const parsed = leadSchema.safeParse(input);
  assert.equal(parsed.success, false);
  if (parsed.success) return "";
  return leadInputErrorMessage(
    parsed.error.issues.map((issue) => ({
      path: issue.path,
      code: issue.code,
      message: issue.message,
    })),
  );
}

describe("contact name and phone", () => {
  it("requires a trimmed name of at least 2 characters", () => {
    for (const name of ["", " ", "  ", "A", " A "]) {
      assert.equal(websiteLeadContactError(name, "(713) 909-0034")?.includes("name"), true, name);
      assert.equal(contactFieldErrors(name, "(713) 909-0034", "es").name, contactIdentityCopy.es.nameError);
    }
    assert.equal(websiteLeadContactError("Jo", "(713) 909-0034"), null);
    assert.equal(websiteLeadContactError("  Ana  ", "713 909 0034"), null);
  });

  it("requires at least 10 digits and allows formatting", () => {
    for (const phone of ["(713) 909-0034", "+1 713-909-0034", "713 909 0034", "1-713-909-0034", "+44 20 7946 0958"]) {
      assert.equal(websiteLeadContactError("Ada", phone), null, phone);
    }
    for (const phone of ["", "   ", "909-0034", "713-909-003", "call me"]) {
      const message = websiteLeadContactError("Ada", phone);
      assert.equal(message?.includes("10 digits"), true, phone);
      assert.equal(contactFieldErrors("Ada", phone, "es").phone, contactIdentityCopy.es.phoneError);
    }
  });

  it("uses required copy in both languages", () => {
    assert.equal(contactIdentityCopy.en.required, "required");
    assert.equal(contactIdentityCopy.es.required, "obligatorio");
    assert.match(contactIdentityCopy.en.nameError, /at least 2 characters/);
    assert.match(contactIdentityCopy.es.nameError, /al menos 2 caracteres/);
    assert.match(contactIdentityCopy.es.phoneError, /10 dígitos/);
  });
});

describe("lead schema rejects a lead with no usable name or phone", () => {
  it("blocks an estimate before it could be delivered", () => {
    assert.equal(leadSchema.safeParse(estimate()).success, true);
    assert.equal(leadSchema.safeParse(estimate({ phone: "+1 (713) 909-0034" })).success, true);

    const missingBoth = rejection(estimate({ name: " ", phone: "" }));
    assert.match(missingBoth, /at least 2 characters/);
    assert.match(missingBoth, /at least 10 digits/);

    assert.match(rejection(estimate({ name: "A" })), /at least 2 characters/);
    assert.match(rejection(estimate({ phone: "909-0034" })), /at least 10 digits/);
    assert.match(rejection(estimate({ name: "A".repeat(101) })), /too long/);
    assert.doesNotMatch(rejection(estimate({ name: "A".repeat(101) })), /at least 2 characters/);
  });

  it("blocks a partner request the same way", () => {
    assert.equal(leadSchema.safeParse(partner()).success, true);
    const message = rejection(partner({ name: "", phone: "555-0100" }));
    assert.match(message, /at least 2 characters/);
    assert.match(message, /at least 10 digits/);
  });

  it("turns a wrapped schema error into the same 400 message", () => {
    const parsed = leadSchema.safeParse(estimate({ name: "", phone: "123" }));
    assert.equal(parsed.success, false);
    if (parsed.success) return;
    const wrapped = { cause: { issues: parsed.error.issues } };
    const message = messageFromUnknownError(wrapped);
    assert.match(message ?? "", /at least 2 characters/);
    assert.match(message ?? "", /at least 10 digits/);
    assert.equal(messageFromUnknownError(new Error("expired")), null);
  });
});

describe("form and delivery gates", () => {
  it("marks name and phone required on the shared form, in both locales", () => {
    const form = readFileSync("src/components/lead-form.tsx", "utf8");
    const fields = readFileSync("src/components/form-fields.tsx", "utf8");
    assert.match(form, /contactFieldErrors\(values\.name, values\.phone, locale\)/);
    assert.match(form, /requiredLabel=\{copy\.required\}/);
    assert.match(form, /name="name"[\s\S]*?required/);
    assert.match(form, /name="phone"[\s\S]*?required/);
    assert.match(fields, /aria-hidden="true"/);
    assert.match(fields, /\(\{requiredLabel\}\)/);

    const spanishContact = readFileSync("src/app/es/contact/page.tsx", "utf8");
    const spanishEmergency = readFileSync("src/app/es/emergency/page.tsx", "utf8");
    assert.match(spanishContact, /locale="es"/);
    assert.match(spanishEmergency, /locale="es"/);
  });

  it("rejects on the server before email or a Jobber lead", () => {
    const contact = readFileSync("src/server/trpc/routers/contact.ts", "utf8");
    const delivery = readFileSync("src/server/delivery.ts", "utf8");
    const sync = readFileSync("src/server/jobber/sync.ts", "utf8");
    const init = readFileSync("src/server/trpc/init.ts", "utf8");

    assert.match(contact, /websiteLeadContactError\(input\.name, input\.phone\)/);
    assert.match(contact, /code: "BAD_REQUEST"/);
    const handler = contact.slice(contact.indexOf("submit:"));
    assert.ok(handler.indexOf("websiteLeadContactError") < handler.indexOf("deliverLead("));
    assert.ok(handler.indexOf("BAD_REQUEST") < handler.indexOf("resolveLead("));

    const deliver = delivery.slice(delivery.indexOf("export async function deliverLead"));
    assert.match(deliver, /websiteLeadContactError\(lead\.name, lead\.phone\)/);
    assert.ok(deliver.indexOf("websiteLeadContactError") < deliver.indexOf("sendInquiryEmail"));
    assert.ok(deliver.indexOf("websiteLeadContactError") < deliver.indexOf("syncLeadToJobber"));

    const estimateSync = sync.slice(sync.indexOf("export async function syncEstimateToJobber"));
    assert.match(estimateSync, /websiteLeadContactError\(lead\.name, lead\.phone\)/);
    assert.ok(estimateSync.indexOf("websiteLeadContactError") < estimateSync.indexOf("requestCreate") || estimateSync.indexOf("websiteLeadContactError") < estimateSync.indexOf("createRequest"));

    assert.match(init, /messageFromUnknownError/);
  });
});
