import assert from "node:assert/strict";
import test from "node:test";

import { portalAccess } from "./access";
import { hasSubmittableContent, normalizeProductUrl, parseSelectionInput } from "./input";
import { customerCanEdit, progress, transition } from "./status";

const ALL = ["productName", "manufacturer", "modelSku", "color", "finish", "dimensions", "productUrls", "attachments"];

test("parseSelectionInput trims values and drops fields the category doesn't use", () => {
  const result = parseSelectionInput(
    { productName: "  Calacatta Laza ", color: "White", modelSku: "SKU-1", productUrls: ["msisurfaces.com/x"], notes: " " },
    ["productName", "color", "productUrls"],
  );
  assert.ok(result.ok);
  assert.equal(result.values.productName, "Calacatta Laza");
  assert.equal(result.values.color, "White");
  assert.equal(result.values.modelSku, null, "modelSku is not enabled");
  assert.deepEqual(result.values.productUrls, ["https://msisurfaces.com/x"]);
  assert.equal(result.values.notes, null);
});

test("parseSelectionInput rejects unsafe or excessive links", () => {
  assert.equal(parseSelectionInput({ productUrls: ["javascript:alert(1)"] }, ALL).ok, false);
  assert.equal(parseSelectionInput({ productUrls: ["data:text/html,hi"] }, ALL).ok, false);
  assert.equal(parseSelectionInput({ productUrls: ["https://user:pw@example.com"] }, ALL).ok, false);
  assert.equal(parseSelectionInput({ productUrls: Array.from({ length: 6 }, (_, i) => `https://example.com/${i}`) }, ALL).ok, false);
  const dupes = parseSelectionInput({ productUrls: ["https://example.com/a", "example.com/a", ""] }, ALL);
  assert.ok(dupes.ok);
  assert.deepEqual(dupes.values.productUrls, ["https://example.com/a"]);
});

test("parseSelectionInput enforces length limits", () => {
  assert.equal(parseSelectionInput({ productName: "x".repeat(201) }, ALL).ok, false);
  assert.equal(parseSelectionInput({ notes: "x".repeat(2001) }, ALL).ok, false);
  assert.equal(parseSelectionInput({ notes: "x".repeat(2000) }, ALL).ok, true);
});

test("normalizeProductUrl only allows http and https", () => {
  assert.equal(normalizeProductUrl("www.homedepot.com/p/123"), "https://www.homedepot.com/p/123");
  assert.equal(normalizeProductUrl("http://example.com"), "http://example.com/");
  assert.equal(normalizeProductUrl("ftp://example.com"), null);
  assert.equal(normalizeProductUrl("not a url"), null);
  assert.equal(normalizeProductUrl("localhost"), null);
});

test("a submission needs at least one detail, link, note, or file", () => {
  const empty = parseSelectionInput({}, ALL);
  assert.ok(empty.ok);
  assert.equal(hasSubmittableContent(empty.values, 0), false);
  assert.equal(hasSubmittableContent(empty.values, 1), true);
  const noted = parseSelectionInput({ notes: "Same as the kitchen" }, ALL);
  assert.ok(noted.ok);
  assert.equal(hasSubmittableContent(noted.values, 0), true);
});

test("customer state machine: drafts, submission, and locking", () => {
  assert.deepEqual(transition("NOT_STARTED", { type: "SAVE_DRAFT", actor: "CUSTOMER" }), { ok: true, status: "DRAFT" });
  assert.deepEqual(transition("DRAFT", { type: "SUBMIT", actor: "CUSTOMER" }), { ok: true, status: "SUBMITTED" });
  assert.deepEqual(transition("CHANGES_REQUESTED", { type: "SAVE_DRAFT", actor: "CUSTOMER" }), { ok: true, status: "CHANGES_REQUESTED" });
  assert.deepEqual(transition("CHANGES_REQUESTED", { type: "SUBMIT", actor: "CUSTOMER" }), { ok: true, status: "SUBMITTED" });
  assert.equal(transition("SUBMITTED", { type: "SAVE_DRAFT", actor: "CUSTOMER" }).ok, false);
  assert.equal(transition("APPROVED", { type: "SUBMIT", actor: "CUSTOMER" }).ok, false);
  assert.equal(customerCanEdit("SUBMITTED"), false);
  assert.equal(customerCanEdit("APPROVED"), false);
});

test("admin state machine: approve, request changes, reopen", () => {
  assert.deepEqual(transition("SUBMITTED", { type: "APPROVE", actor: "ADMIN" }), { ok: true, status: "APPROVED" });
  assert.deepEqual(transition("APPROVED", { type: "REQUEST_CHANGES", actor: "ADMIN" }), { ok: true, status: "CHANGES_REQUESTED" });
  assert.deepEqual(transition("APPROVED", { type: "REOPEN", actor: "ADMIN" }), { ok: true, status: "DRAFT" });
  assert.equal(transition("DRAFT", { type: "APPROVE", actor: "ADMIN" }).ok, false, "only submitted selections can be approved");
  assert.equal(transition("NOT_STARTED", { type: "REQUEST_CHANGES", actor: "ADMIN" }).ok, false);
});

test("progress counts submitted and approved", () => {
  assert.deepEqual(progress(["NOT_STARTED", "DRAFT", "SUBMITTED", "APPROVED"]), { done: 2, total: 4, percent: 50 });
  assert.deepEqual(progress([]), { done: 0, total: 0, percent: 0 });
});

test("portalAccess opens only published, unexpired portals", () => {
  const now = new Date("2026-06-01T12:00:00Z");
  assert.equal(portalAccess({ status: "PUBLISHED", expiresAt: null }, now), "open");
  assert.equal(portalAccess({ status: "PUBLISHED", expiresAt: new Date("2026-06-02T00:00:00Z") }, now), "open");
  assert.equal(portalAccess({ status: "PUBLISHED", expiresAt: new Date("2026-06-01T12:00:00Z") }, now), "expired");
  assert.equal(portalAccess({ status: "DRAFT", expiresAt: null }, now), "unpublished");
  assert.equal(portalAccess({ status: "REVOKED", expiresAt: null }, now), "revoked");
});
