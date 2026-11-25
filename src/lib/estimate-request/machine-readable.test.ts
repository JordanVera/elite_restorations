import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

import { FILE_LINK_TTL_DAYS, FILE_LINK_TTL_SECONDS } from "@/lib/file-link-ttl";
import { leadSchema } from "@/lib/inquiry-schema";
import { isVisitContactPath } from "@/lib/inquiry";
import {
  buildEstimateDocument,
  buildVisitDocument,
  chicagoTimestamp,
  jobberClientLines,
  leadSubject,
  machineJsonFilename,
  splitPersonName,
  visitReference,
} from "@/lib/lead-machine";
import { buildEstimatePath } from "@/lib/estimate-request/files";
import { emptyEstimate, validateSubmission, type EstimateSubmission } from "@/lib/estimate-request/schema";
import { sectionsToHtml } from "@/lib/estimate-request/summary";
import { canonicalFilePath, fileLinkSecret, signedFileUrl, verifyFileLink } from "@/lib/signed-file-link";
import { WEBSITE_FROM_DISPLAY_NAME, websiteFromHeader } from "@/lib/website-from";
import { buildInquiryHtml } from "@/server/inquiry-email-template";
import type { DeliverableLead } from "@/server/leads/types";

const SECRET_ENV = { ESTIMATE_LINK_SECRET: "test-secret", NODE_ENV: "test" };
const NOW = Date.parse("2026-01-15T18:00:00.000Z");

function validSubmission(): EstimateSubmission {
  const draft = emptyEstimate();
  draft.firstName = "Ada";
  draft.lastName = "Lovelace";
  draft.company = "Analytical Engines";
  draft.mobilePhone = "(713) 555-0100";
  draft.secondPhone = "(713) 555-0199";
  draft.email = "ada@example.com";
  draft.textOptIn = true;
  draft.serviceAddress = { street: "100 Main St", unit: "2", city: "Houston", state: "TX", zip: "77082" };
  draft.billingSame = "yes";
  draft.heard = "referral";
  draft.referredBy = "Sam Nguyen";
  draft.propertyType = "single-family";
  draft.role = "owner";
  draft.stories = "2";
  draft.yearBuilt = "1998";
  const room = draft.rooms[0];
  room.areaType = "kitchen";
  room.name = "Primary kitchen";
  room.trades = ["kitchen"];
  room.description = "Replace the cabinets and counters.";
  room.measures.lengthFt = "12";
  room.measures.baseCabinetLf = "16";
  room.upgrades = "Soft-close drawers";
  room.selections = "White shaker";
  draft.finish = "mid";
  draft.startWhen = "month";
  draft.budget = "15-30";
  draft.materials = "elite";
  draft.occupied = "yes";
  draft.pets = "no";
  draft.bestTime = "morning";
  draft.contactMethod = "call";
  draft.claim = "no";
  draft.consent = true;
  const submission = {
    ...draft,
    rooms: draft.rooms.map((item) => ({ ...item, files: [], sketch: null })),
    adjusterFiles: [],
    submissionId: "12345678-1234-4234-8234-123456789abc",
    accessKey: "a".repeat(32),
    website: "",
    startedAt: Date.now() - 10_000,
    pageUrl: "https://eliterestorations.com/estimate-request",
  };
  const parsed = validateSubmission(submission);
  assert.equal(parsed.ok, true, parsed.ok ? "" : JSON.stringify(parsed.errors));
  if (!parsed.ok) throw new Error("fixture");
  return parsed.data;
}

function assertNoHoles(value: unknown, trail = "doc"): void {
  assert.notEqual(value, undefined, trail);
  assert.notEqual(value, null, trail);
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNoHoles(item, `${trail}[${index}]`));
    return;
  }
  if (typeof value === "object") {
    for (const [key, child] of Object.entries(value)) assertNoHoles(child, `${trail}.${key}`);
  }
}

describe("lead email subjects and sender", () => {
  it("keeps the project estimate subject and adds the visit subject", () => {
    assert.equal(
      leadSubject("estimate", "Ada", "Lovelace", "EST-12345678"),
      "[Elite Restorations] Project estimate · Ada Lovelace · EST-12345678",
    );
    assert.equal(
      leadSubject("visit", "Ada", "Lovelace", "VIS-ABCD1234"),
      "[Elite Restorations] Schedule a visit · Ada Lovelace · VIS-ABCD1234",
    );
    assert.equal(
      leadSubject("estimate", "TEST - Sample", "Customer", "EST-1"),
      "TEST - [Elite Restorations] Project estimate · TEST - Sample Customer · EST-1",
    );
    assert.equal(
      leadSubject("visit", "Ada", "Tester", "VIS-1"),
      "TEST - [Elite Restorations] Schedule a visit · Ada Tester · VIS-1",
    );
    assert.equal(leadSubject("visit", "Madonna", "", "VIS-00000000"), "[Elite Restorations] Schedule a visit · Madonna · VIS-00000000");
  });

  it("splits a single name field and builds a VIS id", () => {
    assert.deepEqual(splitPersonName("  Ada Mary Lovelace  "), { firstName: "Ada", lastName: "Mary Lovelace" });
    assert.deepEqual(splitPersonName("Madonna"), { firstName: "Madonna", lastName: "" });
    assert.equal(visitReference("ab12cd34"), "VIS-AB12CD34");
    assert.match(visitReference(), /^VIS-[0-9A-F]{8}$/);
  });

  it("sends both emails as Elite Restorations Website from SMTP_USER", () => {
    assert.equal(WEBSITE_FROM_DISPLAY_NAME, "Elite Restorations Website");
    assert.equal(
      websiteFromHeader("admin@eliterestorations.com"),
      '"Elite Restorations Website" <admin@eliterestorations.com>',
    );
    const deliver = readFileSync("src/server/estimate-request/deliver.ts", "utf8");
    const mail = readFileSync("src/server/mail.ts", "utf8");
    assert.match(deliver, /websiteFromHeader\(config\.user\)/);
    assert.match(deliver, /machineJsonFilename\("estimate"/);
    assert.match(mail, /websiteFromHeader\(user\)/);
    assert.match(mail, /fromHeader\(config\.user, Boolean\(visit\)\)/);
    assert.match(mail, /if \(visit\) return websiteFromHeader\(user\)/);
    assert.match(mail, /leadSubject\('visit'/);
    assert.match(mail, /estimateRecipient\(process\.env, names\)/);
    assert.doesNotMatch(deliver, /SMTP_FROM_NAME/);
  });
});

describe("machine-readable lead JSON", () => {
  it("writes an estimate document with quantities, empty gaps, and a signed file link", () => {
    const submission = validSubmission();
    const pathname = buildEstimatePath({
      submissionId: submission.submissionId,
      accessKey: submission.accessKey,
      role: "media",
      roomIndex: 0,
      fileId: "12345678-1234-4234-8234-123456789abd",
      ext: "jpg",
    });
    assert.ok(pathname);
    submission.rooms[0].files = [{ pathname, name: "kitchen.jpg" }];
    const url = signedFileUrl("https://eliterestorations.com", pathname, SECRET_ENV, NOW);
    assert.ok(url);
    const doc = buildEstimateDocument(submission, { [pathname]: url }, {
      id: "EST-12345678",
      submittedAt: chicagoTimestamp(new Date(NOW)),
    });
    assertNoHoles(doc);
    assert.equal(doc.schemaVersion, 1);
    assert.equal(doc.formType, "estimate");
    assert.equal(doc.id, "EST-12345678");
    assert.equal(doc.submittedAt, "2026-01-15T12:00:00-06:00");
    assert.equal(doc.smsOptIn, true);
    assert.equal(doc.billingSame, true);
    assert.equal(doc.billing.street, "");
    assert.equal(doc.service.street, "100 Main St");
    assert.equal(doc.service.unit, "2");
    assert.equal(doc.referredBy, "Sam Nguyen");
    assert.equal(doc.owner.name, "");
    assert.equal(doc.message, "");
    assert.equal(doc.insurance.claim, "no");
    assert.equal(doc.insurance.carrier, "");
    assert.deepEqual(doc.insurance.files, []);
    assert.equal(doc.rooms[0].type, "Kitchen");
    assert.deepEqual(doc.rooms[0].trades, ["Kitchen remodel"]);
    assert.ok(doc.rooms[0].suggestedTemplates.some((name) => name.includes("Kitchen")));
    const length = doc.rooms[0].quantities.find((row) => row.lineItem === "Length");
    const cabinets = doc.rooms[0].quantities.find((row) => row.lineItem === "Base cabinets");
    assert.deepEqual(length, { lineItem: "Length", qty: "12", unit: "ft", optional: false });
    assert.deepEqual(cabinets, { lineItem: "Base cabinets", qty: "16", unit: "LF", optional: false });
    for (const row of doc.rooms[0].quantities) {
      assert.match(row.unit, /^(SF|LF|EA|ft|SQ)$/);
    }
    assert.equal(doc.rooms[0].notes, "Replace the cabinets and counters.");
    assert.equal(doc.rooms[0].photos[0].filename, "kitchen.jpg");
    assert.match(doc.rooms[0].photos[0].url, /\/api\/estimate-file\/12345678-1234-4234-8234-123456789abc\//);
    assert.match(doc.rooms[0].photos[0].url, /[?&]sig=/);
    assert.match(doc.rooms[0].photos[0].url, /[?&]exp=/);
    assert.equal(machineJsonFilename("estimate", doc.id), "estimate-request-EST-12345678.json");
    assert.match(sectionsToHtml([], "EST-12345678", "Ada Lovelace"), /45 days/);
    const jobber = jobberClientLines(doc).map((row) => row.label);
    assert.ok(jobber.includes("First name"));
    assert.ok(jobber.includes("Service street"));
    assert.equal(jobber.includes("Billing street"), false);
  });

  it("writes a visit document with empty gaps and a signed photo link", () => {
    const photoId = "12345678-1234-4234-8234-123456789abe";
    const pathname = `lead-photos/${photoId}.jpg`;
    const url = signedFileUrl("https://eliterestorations.com", pathname, SECRET_ENV, NOW);
    assert.ok(url);
    assert.match(url, new RegExp(`/api/visit-file/${photoId}\\?`));
    const doc = buildVisitDocument(
      {
        name: "Ada Lovelace",
        phone: "(713) 555-0100",
        email: "ada@example.com",
        service: "kitchen-remodel",
        claim: "not-sure",
        carrier: "",
        contactMethod: "text",
        message: "The kitchen is dated.",
        serviceStreet: "100 Main St",
        serviceCity: "Houston",
        serviceZip: "77082",
        utmSource: "",
      },
      [{ url, filename: "visit-photo-01.jpg" }],
      { id: "VIS-ABCD1234", submittedAt: chicagoTimestamp(new Date("2026-07-15T18:00:00.000Z")) },
    );
    assertNoHoles(doc);
    assert.equal(doc.schemaVersion, 1);
    assert.equal(doc.formType, "visit");
    assert.equal(doc.id, "VIS-ABCD1234");
    assert.equal(doc.submittedAt, "2026-07-15T13:00:00-05:00");
    assert.equal(doc.firstName, "Ada");
    assert.equal(doc.lastName, "Lovelace");
    assert.equal(doc.company, "");
    assert.equal(doc.phone2, "");
    assert.equal(doc.smsOptIn, true);
    assert.deepEqual(doc.service, { street: "100 Main St", unit: "", city: "Houston", state: "TX", zip: "77082" });
    assert.equal(doc.billingSame, true);
    assert.equal(doc.billing.zip, "");
    assert.equal(doc.leadSource, "Website");
    assert.equal(doc.propertyType, "");
    assert.equal(doc.role, "");
    assert.equal(doc.rooms.length, 1);
    assert.equal(doc.rooms[0].type, "Kitchen remodel");
    assert.deepEqual(doc.rooms[0].quantities, []);
    assert.deepEqual(doc.rooms[0].trades, []);
    assert.equal(doc.rooms[0].photos[0].url, url);
    assert.equal(doc.project.contactMethod, "Text message");
    assert.equal(doc.project.finishLevel, "");
    assert.equal(doc.insurance.claim, "not-sure");
    assert.deepEqual(doc.insurance.files, []);
    assert.equal(doc.message, "The kitchen is dated.");
    assert.equal(machineJsonFilename("visit", doc.id), "visit-request-VIS-ABCD1234.json");

    const lead = {
      ...leadSchema.parse({
        path: "estimate",
        formType: "visit",
        name: "Ada Lovelace",
        phone: "(713) 555-0100",
        email: "ada@example.com",
        address: "100 Main St, Houston, 77082",
        serviceStreet: "100 Main St",
        serviceCity: "Houston",
        serviceZip: "77082",
        service: "kitchen-remodel",
        claim: "not-sure",
        contactMethod: "text",
        message: "The kitchen is dated.",
        website: "",
        startedAt: 1,
      }),
      photos: [],
      photosMissing: 0,
    };
    const { website: _website, ...rest } = lead;
    const html = buildInquiryHtml(rest as DeliverableLead, doc.id, {
      photosAttached: 0,
      photoFilenames: [],
      jobberRows: jobberClientLines(doc),
      fileLinks: doc.rooms[0].photos,
    });
    assert.match(html, /Schedule a visit/);
    assert.match(html, /Jobber New Client/);
    assert.match(html, /visit-photo-01\.jpg/);
    assert.match(html, /45 days/);
    assert.equal(_website, "");
  });

  it("requires a short service address only for the visit form", () => {
    const base = {
      path: "estimate" as const,
      name: "Ada Lovelace",
      phone: "(713) 555-0100",
      email: "",
      address: "77082",
      service: "storm-hail",
      claim: "no" as const,
      contactMethod: "phone" as const,
      message: "",
      website: "",
      startedAt: 1,
    };
    assert.equal(leadSchema.safeParse(base).success, true);
    const visit = leadSchema.safeParse({ ...base, formType: "visit", address: "100 Main St, Houston, 77082" });
    assert.equal(visit.success, false);
    const ready = leadSchema.safeParse({
      ...base,
      formType: "visit",
      address: "100 Main St, Houston, 77082",
      serviceStreet: "100 Main St",
      serviceCity: "Houston",
      serviceZip: "77082",
    });
    assert.equal(ready.success, true);
    assert.equal(isVisitContactPath("/contact"), true);
    assert.equal(isVisitContactPath("/es/contact"), true);
    assert.equal(isVisitContactPath("/emergency"), false);
    const form = readFileSync("src/components/lead-form.tsx", "utf8");
    assert.match(form, /const pathname = usePathname\(\)/);
    assert.match(form, /isVisitContactPath\(pathname\)/);
    assert.match(form, /serviceStreet/);
    assert.doesNotMatch(readFileSync("src/app/contact/page.tsx", "utf8"), /contact-path-cards/);
    assert.doesNotMatch(readFileSync("src/app/es/contact/page.tsx", "utf8"), /contact-path-cards/);
  });
});

describe("signed file links", () => {
  it("stays valid for at least 30 days and rejects a bad or expired signature", () => {
    assert.ok(FILE_LINK_TTL_SECONDS >= 30 * 24 * 60 * 60);
    assert.equal(FILE_LINK_TTL_DAYS, 45);
    const pathname = buildEstimatePath({
      submissionId: "12345678-1234-4234-8234-123456789abc",
      accessKey: "b".repeat(32),
      role: "sketch",
      roomIndex: 1,
      fileId: "12345678-1234-4234-8234-123456789abf",
      ext: "pdf",
    });
    assert.ok(pathname);
    const canonical = canonicalFilePath(pathname);
    assert.equal(canonical, pathname);
    const url = new URL(signedFileUrl("https://eliterestorations.com", pathname, SECRET_ENV, NOW) ?? "");
    const exp = url.searchParams.get("exp") ?? "";
    const sig = url.searchParams.get("sig") ?? "";
    assert.equal(Number(exp) - Math.floor(NOW / 1000), FILE_LINK_TTL_SECONDS);
    assert.equal(verifyFileLink(canonical ?? "", exp, sig, "test-secret", NOW), true);
    assert.equal(verifyFileLink(canonical ?? "", exp, sig, "test-secret", NOW + FILE_LINK_TTL_SECONDS * 1000 + 1000), false);
    assert.equal(verifyFileLink(canonical ?? "", exp, `${sig}x`, "test-secret", NOW), false);
    assert.equal(verifyFileLink(`${canonical}-other`, exp, sig, "test-secret", NOW), false);
    assert.equal(fileLinkSecret({ NODE_ENV: "production" }), null);
    assert.equal(fileLinkSecret({ NODE_ENV: "production", APP_ENCRYPTION_KEY: "app-key", ESTIMATE_LINK_SECRET: "dedicated" }), "dedicated");
    assert.equal(fileLinkSecret({ NODE_ENV: "production", LEAD_INGEST_SECRET: "ingest" }), "ingest");
    assert.equal(signedFileUrl("https://eliterestorations.com", pathname, { NODE_ENV: "production" }, NOW), null);
    assert.match(readFileSync("src/app/api/estimate-file/[id]/[...file]/route.ts", "utf8"), /verifyFileLink/);
    assert.match(readFileSync("src/app/api/visit-file/[id]/route.ts", "utf8"), /verifyFileLink/);
  });
});

describe("lead copy rules", () => {
  it("keeps banned claims out of the new mail files and the contact form", () => {
    const banned = [
      /281[-.\s]?748[-.\s]?0227/,
      /free estimate/i,
      /\bmold\b/i,
      /\bGAF\b/,
      /\bIICRC\b/i,
      /\bcertified\b/i,
      /\bguarantee\b/i,
      /\bofficial\b/i,
      /public adjuster/i,
    ];
    const files = [
      "src/lib/lead-machine.ts",
      "src/lib/signed-file-link.ts",
      "src/lib/website-from.ts",
      "src/lib/file-link-ttl.ts",
      "src/components/lead-form.tsx",
      "src/server/estimate-request/deliver.ts",
      "src/server/mail.ts",
      "src/server/inquiry-email-template.ts",
    ];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (statSync(full).isDirectory()) walk(full);
        else if (/\.(ts|tsx)$/.test(entry)) files.push(full);
      }
    };
    walk("src/app/api/estimate-file");
    walk("src/app/api/visit-file");
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const pattern of banned) {
        assert.equal(pattern.test(source), false, `${file} matched ${pattern}`);
      }
    }
  });
});
