import "server-only";

import { PAGE_SIZE, type CustomerSort, type PortalFilter, type QuoteSort } from "@/lib/admin/list-params";
import { isComplete, type SelectionStatus } from "@/lib/selections/status";
import { db, type Prisma } from "@/server/db/client";

const insensitive = (q: string) => ({ contains: q, mode: "insensitive" as const });

export async function listCustomers({ q, sort, page }: { q: string; sort: CustomerSort; page: number }) {
  const where: Prisma.JobberClientWhereInput = q
    ? {
        OR: [
          { name: insensitive(q) },
          { companyName: insensitive(q) },
          { email: insensitive(q) },
          { phone: insensitive(q) },
          { address: insensitive(q) },
        ],
      }
    : {};
  const orderBy: Prisma.JobberClientOrderByWithRelationInput[] =
    sort === "recent" ? [{ syncedAt: "desc" }] : sort === "quotes" ? [{ quotes: { _count: "desc" } }, { name: "asc" }] : [{ name: "asc" }];

  const [total, rows] = await Promise.all([
    db().jobberClient.count({ where }),
    db().jobberClient.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        companyName: true,
        email: true,
        phone: true,
        address: true,
        source: true,
        syncedAt: true,
        _count: { select: { quotes: true } },
        quotes: {
          select: { portals: { where: { status: { not: "REVOKED" } }, select: { id: true } } },
        },
      },
    }),
  ]);
  return {
    total,
    rows: rows.map((row) => ({
      ...row,
      quoteCount: row._count.quotes,
      portalCount: row.quotes.reduce((sum, quote) => sum + quote.portals.length, 0),
    })),
  };
}

function portalWhere(filter: PortalFilter): Prisma.JobberQuoteWhereInput {
  if (filter === "none") return { portals: { none: { status: { not: "REVOKED" } } } };
  if (filter === "draft") return { portals: { some: { status: "DRAFT" } } };
  if (filter === "published") return { portals: { some: { status: "PUBLISHED" } } };
  return {};
}

const portalSummarySelect = {
  where: { status: { not: "REVOKED" as const } },
  take: 1,
  select: {
    id: true,
    status: true,
    expiresAt: true,
    requirements: { select: { selection: { select: { status: true } } } },
  },
} satisfies Prisma.JobberQuote$portalsArgs;

type PortalSummaryRow = {
  id: string;
  status: "DRAFT" | "PUBLISHED" | "REVOKED";
  expiresAt: Date | null;
  requirements: { selection: { status: string } | null }[];
};

export function summarizePortal(portal: PortalSummaryRow | undefined, now = new Date()) {
  if (!portal) return null;
  const statuses = portal.requirements.map((r) => (r.selection?.status ?? "NOT_STARTED") as SelectionStatus);
  return {
    id: portal.id,
    status: portal.status,
    expired: Boolean(portal.expiresAt && portal.expiresAt < now),
    done: statuses.filter(isComplete).length,
    submitted: statuses.filter((s) => s === "SUBMITTED").length,
    total: statuses.length,
  };
}

export async function listQuotes(params: { q: string; status: string; portal: PortalFilter; sort: QuoteSort; page: number }) {
  const { q, status, portal, sort, page } = params;
  const where: Prisma.JobberQuoteWhereInput = {
    AND: [
      q
        ? {
            OR: [
              { quoteNumber: insensitive(q) },
              { title: insensitive(q) },
              { propertyAddress: insensitive(q) },
              { client: { name: insensitive(q) } },
              { client: { companyName: insensitive(q) } },
            ],
          }
        : {},
      status ? { status } : {},
      portalWhere(portal),
    ],
  };
  const orderBy: Prisma.JobberQuoteOrderByWithRelationInput[] =
    sort === "oldest"
      ? [{ quoteDate: { sort: "asc", nulls: "last" } }]
      : sort === "total"
        ? [{ total: { sort: "desc", nulls: "last" } }]
        : [{ quoteDate: { sort: "desc", nulls: "last" } }];

  const [total, rows] = await Promise.all([
    db().jobberQuote.count({ where }),
    db().jobberQuote.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        quoteNumber: true,
        title: true,
        status: true,
        quoteDate: true,
        total: true,
        propertyAddress: true,
        source: true,
        client: { select: { id: true, name: true } },
        portals: portalSummarySelect,
      },
    }),
  ]);
  return { total, rows: rows.map((row) => ({ ...row, total: row.total?.toNumber() ?? null, portal: summarizePortal(row.portals[0]) })) };
}

export async function quoteStatuses(): Promise<string[]> {
  const rows = await db().jobberQuote.findMany({ distinct: ["status"], select: { status: true }, orderBy: { status: "asc" } });
  return rows.map((row) => row.status);
}

export async function getCustomer(id: string) {
  const client = await db().jobberClient.findUnique({
    where: { id },
    include: {
      quotes: {
        orderBy: { quoteDate: { sort: "desc", nulls: "last" } },
        select: {
          id: true,
          quoteNumber: true,
          title: true,
          status: true,
          quoteDate: true,
          total: true,
          propertyAddress: true,
          portals: portalSummarySelect,
        },
      },
    },
  });
  if (!client) return null;
  return {
    ...client,
    quotes: client.quotes.map((quote) => ({ ...quote, total: quote.total?.toNumber() ?? null, portal: summarizePortal(quote.portals[0]) })),
  };
}

export async function getQuote(id: string) {
  const quote = await db().jobberQuote.findUnique({
    where: { id },
    include: {
      client: true,
      lineItems: { orderBy: { sortOrder: "asc" } },
      portals: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          title: true,
          expiresAt: true,
          publishedAt: true,
          revokedAt: true,
          createdAt: true,
          requirements: { select: { selection: { select: { status: true } } } },
        },
      },
    },
  });
  if (!quote) return null;
  return {
    ...quote,
    total: quote.total?.toNumber() ?? null,
    lineItems: quote.lineItems.map((item) => ({
      ...item,
      quantity: item.quantity?.toNumber() ?? null,
      unitPrice: item.unitPrice?.toNumber() ?? null,
      totalPrice: item.totalPrice?.toNumber() ?? null,
    })),
    activePortal: summarizePortal(quote.portals.find((p) => p.status !== "REVOKED")),
    pastPortals: quote.portals.filter((p) => p.status === "REVOKED"),
  };
}
