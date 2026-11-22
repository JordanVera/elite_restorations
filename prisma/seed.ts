/**
 * Demo data for local development and previews:
 *
 *   npm run db:seed
 *
 * 1. Creates the default selection categories (existing ones are left alone).
 * 2. Imports the fictitious Jobber fixtures (src/server/jobber/fixtures.ts),
 *    marked source=MOCK so "Remove demo data" can delete them later.
 * 3. Builds a DRAFT demo portal from the suggestions for one mock quote.
 *
 * Nothing here talks to Jobber or contains real customer information. The
 * demo portal is left as a draft so an admin reviews it before publishing.
 */
import { existsSync } from "node:fs";

for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}

async function main() {
  if (process.env.VERCEL_ENV === "production" && process.env.SEED_ALLOW_PRODUCTION !== "1") {
    throw new Error("Refusing to seed demo data into production. Set SEED_ALLOW_PRODUCTION=1 to override.");
  }

  const { db } = await import("../src/server/db/client");
  const { ensureDefaultCategories } = await import("../src/server/portal/categories");
  const { runJobberSync } = await import("../src/server/jobber/import");
  const { mockReader } = await import("../src/server/jobber/reader");
  const { quoteForNewPortal } = await import("../src/server/portal/admin");
  const { issuePortalToken } = await import("../src/server/portal/tokens");
  const { logActivity } = await import("../src/server/activity");

  const created = await ensureDefaultCategories();
  console.log(`Categories: ${created} created.`);

  for (let attempt = 0; attempt < 10; attempt++) {
    const outcome = await runJobberSync({ reader: mockReader() });
    console.log(`Mock sync: ${outcome.status} (${outcome.clientsSynced} clients, ${outcome.quotesSynced} quotes).`);
    if (outcome.status === "FAILED") throw new Error("Mock sync failed. Check the integrations page for details.");
    if (outcome.status === "SUCCEEDED") break;
  }

  const candidates = await db().jobberQuote.findMany({
    where: { source: "MOCK", portals: { none: { status: { not: "REVOKED" } } } },
    orderBy: { quoteNumber: "asc" },
    select: { id: true },
  });
  for (const candidate of candidates) {
    const data = await quoteForNewPortal(candidate.id);
    if (!data || data.suggestions.length === 0) continue;

    const categories = new Map(data.categories.map((c) => [c.id, c]));
    const portalId = await db().$transaction(async (tx) => {
      const { tokenHash, tokenEncrypted } = issuePortalToken();
      const portal = await tx.customerPortal.create({
        data: {
          quoteId: data.quote.id,
          tokenHash,
          tokenEncrypted,
          title: `${data.quote.title ?? "Your project"} selections`,
          welcomeMessage: "Here are the materials we need you to choose. Save as you go and submit each one when you're happy with it.",
        },
      });
      for (const [index, s] of data.suggestions.entries()) {
        const category = categories.get(s.categoryId);
        await tx.selectionRequirement.create({
          data: {
            portalId: portal.id,
            categoryId: s.categoryId,
            categoryName: s.categoryName,
            lineItemId: s.lineItemId,
            title: s.title,
            area: s.area,
            quantity: s.quantity,
            unit: s.unit,
            allowanceCents: s.allowanceCents,
            instructions: category?.defaultInstructions ?? null,
            enabledFields: category?.enabledFields ?? [],
            sortOrder: index,
          },
        });
      }
      await logActivity(
        { actorType: "SYSTEM", action: "portal.created", entityType: "CustomerPortal", entityId: portal.id, portalId: portal.id, metadata: { seed: true } },
        tx,
      );
      return portal.id;
    });
    console.log(`Demo portal (draft, ${data.suggestions.length} selections): /admin/portals/${portalId}`);
    console.log("Open it in the admin, review the selections, then publish to get the customer link.");
    break;
  }
  if (candidates.length === 0) console.log("Demo portal: every mock quote already has one.");

  await db().$disconnect();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
