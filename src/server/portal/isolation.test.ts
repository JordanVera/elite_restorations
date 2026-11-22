/**
 * Database tests for customer portal isolation. They need a disposable
 * Postgres with migrations applied:
 *
 *   TEST_DATABASE_URL=postgres://... npm test
 *
 * Skipped when TEST_DATABASE_URL is unset. All records are fictitious, marked
 * as MOCK, and removed afterwards.
 */
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { after, before, describe, it } from "node:test";

const url = process.env.TEST_DATABASE_URL;

describe("customer portal isolation (database)", { skip: url ? false : "TEST_DATABASE_URL not set" }, () => {
  process.env.DATABASE_URL = url;
  process.env.APP_ENCRYPTION_KEY ??= randomBytes(32).toString("base64");

  const run = randomBytes(4).toString("hex");
  type Mods = {
    db: typeof import("../db/client").db;
    customer: typeof import("./customer");
    selections: typeof import("./selections");
    tokens: typeof import("./tokens");
  };
  let m: Mods;
  const ids = { client: "", quotes: [] as string[], portals: [] as string[] };
  const portalA = { token: "", id: "", req: "", req2: "" };
  const portalB = { token: "", id: "", req: "", attachment: "" };

  async function makePortal(status: "DRAFT" | "PUBLISHED" | "REVOKED", options: { showAllowances?: boolean; expiresAt?: Date } = {}) {
    const issued = m.tokens.issuePortalToken();
    // One active portal per quote, so each test portal gets its own quote.
    const quote = await m.db().jobberQuote.create({
      data: { jobberId: `test-quote-${run}-${ids.quotes.length}`, clientId: ids.client, quoteNumber: `T-${run}`, status: "draft", source: "MOCK" },
    });
    ids.quotes.push(quote.id);
    const portal = await m.db().customerPortal.create({
      data: {
        quoteId: quote.id,
        tokenHash: issued.tokenHash,
        tokenEncrypted: issued.tokenEncrypted,
        status,
        title: `Test portal ${run}`,
        welcomeMessage: "Test",
        showAllowances: options.showAllowances ?? false,
        expiresAt: options.expiresAt ?? null,
        requirements: {
          create: [
            { title: "Test tile", categoryName: "Shower tile", enabledFields: ["productName", "finish", "attachments"], allowanceCents: 123400, sortOrder: 0 },
            { title: "Test paint", categoryName: "Paint colors", enabledFields: ["color"], sortOrder: 1 },
          ],
        },
      },
      select: { id: true, requirements: { orderBy: { sortOrder: "asc" }, select: { id: true } } },
    });
    ids.portals.push(portal.id);
    return { token: issued.token, id: portal.id, reqs: portal.requirements.map((r) => r.id) };
  }

  async function openRef(token: string) {
    const resolved = await m.customer.resolvePortal(token);
    assert.equal(resolved.access, "open");
    if (resolved.access !== "open") throw new Error("portal not open");
    return resolved.portal;
  }

  before(async () => {
    m = {
      db: (await import("../db/client")).db,
      customer: await import("./customer"),
      selections: await import("./selections"),
      tokens: await import("./tokens"),
    };
    const client = await m.db().jobberClient.create({
      data: { jobberId: `test-client-${run}`, name: "Test Customer", email: `test-${run}@example.com`, source: "MOCK" },
    });
    ids.client = client.id;

    const a = await makePortal("PUBLISHED");
    Object.assign(portalA, { token: a.token, id: a.id, req: a.reqs[0], req2: a.reqs[1] });
    const b = await makePortal("DRAFT", { showAllowances: true });
    Object.assign(portalB, { token: b.token, id: b.id, req: b.reqs[0] });
    const sel = await m.db().materialSelection.create({ data: { requirementId: portalB.req } });
    const file = await m.db().attachment.create({
      data: { selectionId: sel.id, blobPathname: `portal-uploads/${b.id}/${portalB.req}/test-${run}.png`, contentType: "image/png", size: 10, originalName: "b.png" },
    });
    portalB.attachment = file.id;
  });

  after(async () => {
    if (!m) return;
    await m.db().customerPortal.deleteMany({ where: { id: { in: ids.portals } } });
    await m.db().jobberQuote.deleteMany({ where: { id: { in: ids.quotes } } });
    await m.db().jobberClient.deleteMany({ where: { id: ids.client } });
    await m.db().$disconnect();
  });

  it("opens only published, unexpired portals by token", async () => {
    assert.equal((await m.customer.resolvePortal(portalA.token)).access, "open");
    assert.equal((await m.customer.resolvePortal(portalB.token)).access, "unpublished");
    assert.equal((await m.customer.resolvePortal("x".repeat(43))).access, "invalid");
    assert.equal((await m.customer.resolvePortal("short")).access, "invalid");
  });

  it("shows a portal only its own requirements and hides allowances unless enabled", async () => {
    const view = await m.customer.getCustomerPortal(portalA.id);
    assert.ok(view);
    assert.deepEqual(
      view.items.map((i) => i.id),
      [portalA.req, portalA.req2],
    );
    assert.equal(view.items[0].allowanceCents, null, "allowance hidden when showAllowances is off");
    const viewB = await m.customer.getCustomerPortal(portalB.id);
    assert.equal(viewB?.items[0].allowanceCents, 123400);
  });

  it("refuses to write another portal's selection", async () => {
    const ref = await openRef(portalA.token);
    const result = await m.selections.saveSelection(ref, portalB.req, { productName: "Intruder" }, 0, "draft");
    assert.equal(result.ok, false);
    const untouched = await m.db().materialSelection.findUnique({ where: { requirementId: portalB.req } });
    assert.equal(untouched?.productName, null);
  });

  it("refuses to delete another portal's file", async () => {
    const ref = await openRef(portalA.token);
    const result = await m.selections.removeAttachment(ref, portalB.attachment);
    assert.equal(result.ok, false);
    assert.ok(await m.db().attachment.findUnique({ where: { id: portalB.attachment } }));
  });

  it("saves drafts with version checks and rejects stale writes", async () => {
    const ref = await openRef(portalA.token);
    const first = await m.selections.saveSelection(ref, portalA.req, { productName: "Calacatta", modelSku: "ignored" }, 0, "draft");
    assert.equal(first.ok, true);
    assert.equal(first.status, "DRAFT");
    assert.equal(first.version, 1);
    const stale = await m.selections.saveSelection(ref, portalA.req, { productName: "Other tab" }, 0, "draft");
    assert.equal(stale.ok, false);
    assert.equal(stale.conflict, true);
    const row = await m.db().materialSelection.findUnique({ where: { requirementId: portalA.req } });
    assert.equal(row?.productName, "Calacatta");
    assert.equal(row?.modelSku, null, "fields the category doesn't use are not written");
  });

  it("submits with a frozen revision and then locks editing", async () => {
    const ref = await openRef(portalA.token);
    const sel = await m.db().materialSelection.findUniqueOrThrow({ where: { requirementId: portalA.req } });
    await m.db().attachment.create({
      data: { selectionId: sel.id, blobPathname: `portal-uploads/${portalA.id}/${portalA.req}/test-${run}.jpg`, contentType: "image/jpeg", size: 10, originalName: "a.jpg" },
    });
    const submitted = await m.selections.saveSelection(ref, portalA.req, { productName: "Calacatta", finish: "Matte" }, sel.version, "submit");
    assert.equal(submitted.ok, true);
    assert.equal(submitted.status, "SUBMITTED");

    const revisions = await m.db().selectionRevision.findMany({ where: { selectionId: sel.id } });
    assert.equal(revisions.length, 1);
    const snapshot = revisions[0].snapshot as { values: { finish: string }; attachments: unknown[] };
    assert.equal(snapshot.values.finish, "Matte");
    assert.equal(snapshot.attachments.length, 1);
    const files = await m.db().attachment.findMany({ where: { selectionId: sel.id } });
    assert.ok(files.every((f) => f.revisionId === revisions[0].id), "submitted files are linked to the revision");

    const edit = await m.selections.saveSelection(ref, portalA.req, { productName: "Changed" }, submitted.version!, "draft");
    assert.equal(edit.ok, false);
    const removal = await m.selections.removeAttachment(ref, files[0].id);
    assert.equal(removal.ok, false, "submitted files stay with the record");
  });

  it("requires some content before submitting", async () => {
    const ref = await openRef(portalA.token);
    const empty = await m.selections.saveSelection(ref, portalA.req2, { color: "  " }, 0, "submit");
    assert.equal(empty.ok, false);
    assert.match(empty.message, /at least one/);
  });

  it("closes the link when the portal is revoked or expired", async () => {
    await m.db().customerPortal.update({ where: { id: portalA.id }, data: { expiresAt: new Date(Date.now() - 1000) } });
    assert.equal((await m.customer.resolvePortal(portalA.token)).access, "expired");
    await m.db().customerPortal.update({ where: { id: portalA.id }, data: { status: "REVOKED", expiresAt: null } });
    assert.equal((await m.customer.resolvePortal(portalA.token)).access, "revoked");
  });
});
