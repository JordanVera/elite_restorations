import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

import { site } from "@/lib/site";
import { buildEstimatePath, parseEstimatePath, sniffEstimateExt } from "@/lib/estimate-request/files";
import { OFFICE_PHONE, THANK_YOU, tradeSelection } from "@/lib/estimate-request/options";
import {
  emptyEstimate,
  hydrateDraft,
  validateStep,
  validateSubmission,
  type EstimateDraft,
  type EstimateSubmission,
} from "@/lib/estimate-request/schema";
import { quantitiesToCsv, sectionsToCsv, sectionsToText, staffSections, summarize } from "@/lib/estimate-request/summary";
import { JOBBER_TEMPLATES, countertopSquareFeet, isHighCeiling, suggestedTemplates, wallSquareFeet } from "@/lib/estimate-request/templates";
import { estimateTiming } from "@/lib/estimate-request/timing";
import { isHoneypotWebsite } from "@/lib/estimate-request/spam";
import { estimateRecipient, estimateSubject } from "@/server/estimate-request/deliver";

function validDraft(): EstimateDraft {
  const draft = emptyEstimate();
  draft.firstName = "Ada";
  draft.lastName = "Lovelace";
  draft.mobilePhone = "(713) 555-0100";
  draft.email = "ada@example.com";
  draft.serviceAddress = { street: "100 Main St", unit: "", city: "Houston", state: "TX", zip: "77082" };
  draft.billingSame = "yes";
  draft.heard = "google";
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
  return draft;
}

function validSubmission(): EstimateSubmission {
  const draft = validDraft();
  const submission = {
    ...draft,
    rooms: draft.rooms.map((room) => ({ ...room, files: [], sketch: null })),
    adjusterFiles: [],
    submissionId: crypto.randomUUID(),
    accessKey: crypto.randomUUID().replace(/-/g, ""),
    website: "",
    startedAt: Date.now() - 10_000,
    pageUrl: "https://eliterestorations.com/estimate-request",
  };
  const parsed = validateSubmission(submission);
  assert.equal(parsed.ok, true, parsed.ok ? "" : JSON.stringify(parsed.errors));
  if (!parsed.ok) throw new Error("fixture");
  return parsed.data;
}

describe("estimate request schema", () => {
  it("accepts a complete request and rejects an empty first step", () => {
    const empty = validateStep(0, emptyEstimate());
    assert.ok(empty.firstName);
    assert.equal(validateSubmission(validSubmission()).ok, true);
  });

  it("requires a billing address only when billing differs", () => {
    const draft = validDraft();
    draft.billingSame = "no";
    const errors = validateStep(0, draft);
    assert.ok(errors["billingAddress.street"]);
    draft.billingAddress = { street: "200 Billing Rd", unit: "4", city: "Katy", state: "TX", zip: "77494" };
    assert.equal(validateStep(0, draft)["billingAddress.street"], undefined);
  });

  it("requires the owner when the sender is not the owner", () => {
    const draft = validDraft();
    draft.role = "tenant";
    const errors = validateStep(0, draft);
    assert.ok(errors.ownerName);
    assert.ok(errors.ownerPhone);
    assert.ok(errors.ownerEmail);
  });

  it("requires who made a referral", () => {
    const draft = validDraft();
    draft.heard = "referral";
    assert.ok(validateStep(0, draft).referredBy);
    draft.referredBy = "Sam Nguyen";
    assert.equal(validateStep(0, draft).referredBy, undefined);
  });

  it("requires claim details only for an insurance claim", () => {
    const draft = validDraft();
    draft.claim = "yes";
    const errors = validateStep(3, draft);
    assert.ok(errors.carrier);
    assert.ok(errors.lossDate);
    assert.ok(errors.cause);
    assert.ok(errors.claimNumber);
    assert.ok(errors.adjusterName);
    draft.carrier = "State Farm";
    draft.claimNumber = "CLM-1001";
    draft.lossDate = "2026-05-01";
    draft.cause = "hail";
    draft.adjusterLater = true;
    draft.adjusterInspected = "no";
    draft.agreement = "";
    assert.equal(Object.keys(validateStep(3, draft)).length, 0);
  });

  it("stops at 15 rooms", () => {
    const draft = validDraft();
    draft.rooms = Array.from({ length: 16 }, () => ({ ...validDraft().rooms[0], id: crypto.randomUUID() }));
    assert.match(validateStep(1, draft).rooms ?? "", /15/);
  });

  it("hydrates a partial draft without dropping new fields", () => {
    const hydrated = hydrateDraft({ firstName: "Ada", rooms: [{ name: "Hall" }] });
    assert.ok(hydrated);
    assert.equal(hydrated?.firstName, "Ada");
    assert.equal(hydrated?.rooms[0]?.name, "Hall");
    assert.equal(hydrated?.serviceAddress.state, "TX");
    assert.equal(hydrated?.consent, false);
  });
});

describe("estimate request files", () => {
  it("round-trips a storage path and sniffs real file headers", () => {
    const submissionId = crypto.randomUUID();
    const accessKey = crypto.randomUUID().replace(/-/g, "");
    const fileId = crypto.randomUUID();
    const pathname = buildEstimatePath({ submissionId, accessKey, role: "media", roomIndex: 2, fileId, ext: "jpg" });
    assert.ok(pathname);
    const parsed = parseEstimatePath(pathname);
    assert.equal(parsed?.roomIndex, 2);
    assert.equal(parsed?.role, "media");
    assert.equal(parseEstimatePath(`${pathname}/../secret`), null);
    assert.equal(sniffEstimateExt(Uint8Array.from([0xff, 0xd8, 0xff])), "jpg");
    assert.equal(sniffEstimateExt(Uint8Array.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31])), "pdf");
    assert.equal(sniffEstimateExt(Uint8Array.from([0x1a, 0x45, 0xdf, 0xa3])), "webm");
  });
});

describe("estimate request summary", () => {
  it("groups a room and skips blank measurements", () => {
    const submission = validSubmission();
    const text = sectionsToText(summarize(submission), "EST-TEST");
    assert.match(text, /Primary kitchen/);
    assert.match(text, /Length \(ft\): 12/);
    assert.doesNotMatch(text, /Island size/);
    assert.match(text, /Insurance claim: No/);
  });

  it("escapes spreadsheet formulas in the CSV", () => {
    const csv = sectionsToCsv([{ title: "Room", step: 1, rows: [{ label: "Note", value: "=cmd" }] }]);
    assert.match(csv, /"'=cmd"/);
  });

  it("suggests templates and keeps high walls out of the customer summary", () => {
    const submission = validSubmission();
    submission.rooms[0].measures.ceilingFt = "12";
    submission.rooms[0].measures.flooringIncluded = "yes";
    submission.rooms[0].measures.floorNew = "vinyl-laminate";
    const names = suggestedTemplates(submission.rooms[0].trades, submission.rooms[0].measures);
    assert.ok(names.includes(JOBBER_TEMPLATES.kitchen));
    assert.ok(names.includes(JOBBER_TEMPLATES.vinyl));
    const customer = sectionsToText(summarize(submission), "EST-TEST");
    assert.doesNotMatch(customer, /High walls/);
    assert.doesNotMatch(customer, /UPDATED -/);
    submission.rooms[0].measures.baseCabinetLf = "16";
    const staff = sectionsToText(staffSections(submission), "EST-TEST");
    assert.match(staff, /Jobber New Client/);
    assert.match(staff, /First name: Ada/);
    assert.match(staff, /High walls/);
    assert.match(staff, /Length: 12 ft/);
    assert.match(staff, /Ceiling height: 12 ft/);
    assert.doesNotMatch(staff, /Length: 12 LF/);
    assert.match(staff, /Base cabinets: 16 LF/);
    assert.match(staff, /UPDATED - Kitchen Remodel Template/);
    assert.equal(tradeSelection(["kitchen"], "yes").flooring, true);
    assert.equal(tradeSelection(["kitchen"], "").flooring, false);
    assert.equal(countertopSquareFeet("10", "25 in"), 20.8);
    assert.equal(wallSquareFeet("12", "10", "8"), 352);
    assert.equal(isHighCeiling("12"), true);
    assert.equal(isHighCeiling("10"), false);
    const csv = quantitiesToCsv(submission);
    assert.match(csv, /^Room,Trade,Template,Line item,Quantity,Unit,Notes,Optional/);
    assert.match(csv, /"Length","12","ft"/);
    assert.match(csv, /"Base cabinets","16","LF"/);
  });
});

describe("estimate request guards", () => {
  it("uses the office number and the thank-you line", () => {
    assert.equal(OFFICE_PHONE, site.phone.display);
    assert.equal(OFFICE_PHONE, "(713) 909-0034");
    assert.equal(
      THANK_YOU,
      "Thanks! Elite Restorations will review your project and reach out. Questions? Call (713) 909-0034.",
    );
    assert.equal(
      estimateSubject("TEST - Sample", "Customer", "EST-1"),
      "TEST - [Elite Restorations] Project estimate · TEST - Sample Customer · EST-1",
    );
    assert.equal(
      estimateSubject("Ada", "test", "EST-1"),
      "TEST - [Elite Restorations] Project estimate · Ada test · EST-1",
    );
    assert.equal(
      estimateSubject("Ada", "Lovelace", "EST-1"),
      "[Elite Restorations] Project estimate · Ada Lovelace · EST-1",
    );
    assert.equal(estimateRecipient({}), "george@eliterestorations.com");
    assert.equal(estimateRecipient({ ESTIMATE_REQUEST_EMAIL_TO: "owner@example.com" }), "owner@example.com");
    assert.equal(
      estimateRecipient({}, { firstName: "TEST - Sample", lastName: "Customer" }),
      "michael@eliterestorations.com",
    );
    assert.equal(
      estimateRecipient({ ESTIMATE_REQUEST_EMAIL_TO: "owner@example.com" }, { firstName: "Ada", lastName: "Lovelace" }),
      "owner@example.com",
    );
  });

  it("drops a filled honeypot and a too-fast submit", () => {
    assert.equal(isHoneypotWebsite({ website: "https://spam.test" }), true);
    assert.equal(isHoneypotWebsite({ website: "  " }), false);
    assert.equal(estimateTiming(Date.now()), "too-fast");
    assert.equal(estimateTiming(Date.now() - 10_000), "ok");
  });

  it("stays out of the sitemap, nav, and footer, and is noindex", () => {
    assert.equal(readFileSync("src/app/sitemap.ts", "utf8").includes("estimate-request"), false);
    assert.match(readFileSync("src/app/robots.ts", "utf8"), /\/estimate-request/);
    assert.equal(readFileSync("src/lib/site.ts", "utf8").includes("estimate-request"), false);
    assert.equal(readFileSync("src/components/site-footer.tsx", "utf8").includes("estimate-request"), false);
    assert.equal(readFileSync("src/components/site-header.tsx", "utf8").includes("estimate-request"), false);
    assert.match(readFileSync("src/app/estimate-request/page.tsx", "utf8"), /index:\s*false/);
  });

  it("keeps banned claims and the old phone number out of the form", () => {
    const banned = [
      /281[-.\s]?748[-.\s]?0227/,
      /free estimate/i,
      /\bmold\b/i,
      /\bGAF\b/,
      /\bIICRC\b/i,
      /\bcertified\b/i,
      /\bauthorized\b/i,
      /\bpreferred\b/i,
      /\bpartner\b/i,
      /\bdealer\b/i,
      /\bguarantee\b/i,
      /\bendorsed\b/i,
      /\bofficial\b/i,
      /public adjuster/i,
      /Elite Restorations Inc/i,
      /\bInc\./,
    ];
    const roots = [
      "src/lib/estimate-request",
      "src/components/estimate-request",
      "src/app/estimate-request",
      "src/app/api/estimate-request",
      "src/app/api/estimate-files",
      "src/app/api/estimate-file",
      "src/app/api/visit-file",
      "src/server/estimate-request",
    ];
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (statSync(full).isDirectory()) walk(full);
        else if (/\.(ts|tsx)$/.test(entry) && !entry.endsWith(".test.ts")) files.push(full);
      }
    };
    roots.forEach(walk);
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const pattern of banned) {
        assert.equal(pattern.test(source), false, `${file} matched ${pattern}`);
      }
    }
  });
});
