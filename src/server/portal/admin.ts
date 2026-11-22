import "server-only";

import { PAGE_SIZE } from "@/lib/admin/list-params";
import { categorySlugForRequirement, resolveResourceSlugs, resourcesFromSlugs } from "@/lib/selections/resources";
import { isComplete, type SelectionStatus } from "@/lib/selections/status";
import { suggestSelections } from "@/lib/selections/suggest";
import { db, type Prisma } from "@/server/db/client";
import { listCategories } from "@/server/portal/categories";
import { listPortalResources } from "@/server/portal/resources";

export const PORTAL_STATUS_FILTERS = ["", "DRAFT", "PUBLISHED", "REVOKED"] as const;

export async function listPortals({ q, status, page }: { q: string; status: string; page: number }) {
  const where: Prisma.CustomerPortalWhereInput = {
    AND: [
      status ? { status: status as "DRAFT" | "PUBLISHED" | "REVOKED" } : { status: { not: "REVOKED" } },
      q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { quote: { quoteNumber: { contains: q, mode: "insensitive" } } },
              { quote: { client: { name: { contains: q, mode: "insensitive" } } } },
            ],
          }
        : {},
    ],
  };
  const [total, rows, catalog] = await Promise.all([
    db().customerPortal.count({ where }),
    db().customerPortal.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        title: true,
        status: true,
        expiresAt: true,
        publishedAt: true,
        updatedAt: true,
        resourcesCustomized: true,
        resourceSlugs: true,
        quote: { select: { id: true, quoteNumber: true, source: true, client: { select: { id: true, name: true } } } },
        requirements: { select: { dueDate: true, categoryName: true, category: { select: { slug: true } }, selection: { select: { status: true } } } },
      },
    }),
    listPortalResources(),
  ]);
  const now = new Date();
  return {
    total,
    rows: rows.map((row) => {
      const statuses = row.requirements.map((r) => (r.selection?.status ?? "NOT_STARTED") as SelectionStatus);
      const categorySlugs = row.requirements
        .map((r) => categorySlugForRequirement(r.category?.slug, r.categoryName))
        .filter((slug): slug is string => Boolean(slug));
      return {
        ...row,
        expired: Boolean(row.expiresAt && row.expiresAt < now),
        done: statuses.filter(isComplete).length,
        submitted: statuses.filter((s) => s === "SUBMITTED").length,
        changes: statuses.filter((s) => s === "CHANGES_REQUESTED").length,
        total: statuses.length,
        resources: resourcesFromSlugs(
          catalog,
          resolveResourceSlugs(catalog, { customized: row.resourcesCustomized, saved: row.resourceSlugs, categorySlugs }),
        ),
      };
    }),
  };
}

export async function quoteForNewPortal(quoteId: string) {
  const quote = await db().jobberQuote.findUnique({
    where: { id: quoteId },
    include: {
      client: { select: { id: true, name: true } },
      lineItems: { orderBy: { sortOrder: "asc" } },
      portals: { where: { status: { not: "REVOKED" } }, select: { id: true }, take: 1 },
    },
  });
  if (!quote) return null;
  const categories = await listCategories({ activeOnly: true });
  const lineItems = quote.lineItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    quantity: item.quantity?.toNumber() ?? null,
    totalPrice: item.totalPrice?.toNumber() ?? null,
  }));
  const suggestions = suggestSelections(lineItems, categories, quote.title);
  return {
    quote: {
      id: quote.id,
      quoteNumber: quote.quoteNumber,
      title: quote.title,
      source: quote.source,
      client: quote.client,
      propertyAddress: quote.propertyAddress,
    },
    existingPortalId: quote.portals[0]?.id ?? null,
    lineItems,
    suggestions,
    categories: categories.map((c) => ({ id: c.id, name: c.name, enabledFields: c.enabledFields, defaultInstructions: c.defaultInstructions })),
  };
}

export async function getPortalForAdmin(id: string) {
  const portal = await db().customerPortal.findUnique({
    where: { id },
    include: {
      quote: {
        select: {
          id: true,
          quoteNumber: true,
          title: true,
          source: true,
          propertyAddress: true,
          client: { select: { id: true, name: true, email: true } },
          lineItems: { orderBy: { sortOrder: "asc" }, select: { id: true, name: true, description: true } },
        },
      },
      createdBy: { select: { name: true } },
      requirements: {
        orderBy: { sortOrder: "asc" },
        include: {
          category: { select: { id: true, name: true, slug: true } },
          lineItem: { select: { id: true, name: true } },
          selection: { select: { id: true, status: true, updatedAt: true, _count: { select: { revisions: true, attachments: true } } } },
        },
      },
    },
  });
  if (!portal) return null;
  const [categories, catalog] = await Promise.all([listCategories(), listPortalResources()]);
  return {
    ...portal,
    catalog,
    requirements: portal.requirements.map((r) => ({ ...r, quantity: r.quantity?.toNumber() ?? null })),
    categories: categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      active: c.active,
      enabledFields: c.enabledFields,
      defaultInstructions: c.defaultInstructions,
    })),
  };
}

export async function portalActivity(portalId: string, limit = 30) {
  return db().activityLog.findMany({
    where: { portalId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, actorType: true, actorName: true, action: true, createdAt: true, metadata: true },
  });
}
