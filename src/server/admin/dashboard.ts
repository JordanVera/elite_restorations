import "server-only";

import { db } from "@/server/db/client";
import { isComplete, type SelectionStatus } from "@/lib/selections/status";

export type DashboardStats = {
  customers: number;
  quotes: number;
  linkedQuotes: number;
  activePortals: number;
  portalsAwaitingCustomer: number;
  selectionsAwaitingReview: number;
  selectionsApproved: number;
};

export type AttentionItem = {
  portalId: string;
  title: string;
  customer: string;
  quoteNumber: string;
  reason: string;
  tone: "warning" | "danger" | "info";
  progress: { done: number; total: number };
};

function activePortalWhere(now: Date) {
  return { status: "PUBLISHED" as const, OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] };
}

export async function dashboardStats(now = new Date()): Promise<DashboardStats> {
  const prisma = db();
  const [customers, quotes, linkedQuotes, activePortals, portalsAwaitingCustomer, selectionsAwaitingReview, selectionsApproved] =
    await Promise.all([
      prisma.jobberClient.count(),
      prisma.jobberQuote.count(),
      prisma.jobberQuote.count({ where: { portals: { some: { status: { not: "REVOKED" } } } } }),
      prisma.customerPortal.count({ where: activePortalWhere(now) }),
      prisma.customerPortal.count({
        where: {
          ...activePortalWhere(now),
          requirements: {
            some: {
              required: true,
              OR: [
                { selection: null },
                { selection: { status: { in: ["NOT_STARTED", "DRAFT", "CHANGES_REQUESTED"] } } },
              ],
            },
          },
        },
      }),
      prisma.materialSelection.count({ where: { status: "SUBMITTED", requirement: { portal: { status: { not: "REVOKED" } } } } }),
      prisma.materialSelection.count({ where: { status: "APPROVED", requirement: { portal: { status: { not: "REVOKED" } } } } }),
    ]);
  return { customers, quotes, linkedQuotes, activePortals, portalsAwaitingCustomer, selectionsAwaitingReview, selectionsApproved };
}

const SOON_MS = 7 * 24 * 60 * 60 * 1000;

export async function attentionItems(now = new Date(), limit = 8): Promise<AttentionItem[]> {
  const portals = await db().customerPortal.findMany({
    where: activePortalWhere(now),
    orderBy: { updatedAt: "desc" },
    take: 100,
    select: {
      id: true,
      title: true,
      quote: { select: { quoteNumber: true, client: { select: { name: true } } } },
      requirements: {
        select: { required: true, dueDate: true, selection: { select: { status: true, updatedAt: true } } },
      },
    },
  });

  const items: (AttentionItem & { rank: number })[] = [];
  for (const portal of portals) {
    const statuses = portal.requirements.map((r) => (r.selection?.status ?? "NOT_STARTED") as SelectionStatus);
    const done = statuses.filter(isComplete).length;
    const base = {
      portalId: portal.id,
      title: portal.title,
      customer: portal.quote.client.name,
      quoteNumber: portal.quote.quoteNumber,
      progress: { done, total: statuses.length },
    };
    const toReview = statuses.filter((s) => s === "SUBMITTED").length;
    const overdue = portal.requirements.filter(
      (r) => r.dueDate && r.dueDate < now && !isComplete((r.selection?.status ?? "NOT_STARTED") as SelectionStatus),
    ).length;
    const dueSoon = portal.requirements.filter(
      (r) =>
        r.dueDate &&
        r.dueDate >= now &&
        r.dueDate.getTime() - now.getTime() < SOON_MS &&
        !isComplete((r.selection?.status ?? "NOT_STARTED") as SelectionStatus),
    ).length;
    const changes = statuses.filter((s) => s === "CHANGES_REQUESTED").length;

    if (toReview) items.push({ ...base, rank: 0, tone: "warning", reason: `${toReview} selection${toReview === 1 ? "" : "s"} waiting for review` });
    else if (overdue) items.push({ ...base, rank: 1, tone: "danger", reason: `${overdue} selection${overdue === 1 ? "" : "s"} past due` });
    else if (dueSoon) items.push({ ...base, rank: 2, tone: "info", reason: `${dueSoon} due within 7 days` });
    else if (changes) items.push({ ...base, rank: 3, tone: "info", reason: `Waiting on customer changes (${changes})` });
  }
  return items
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit)
    .map((item) => ({
      portalId: item.portalId,
      title: item.title,
      customer: item.customer,
      quoteNumber: item.quoteNumber,
      reason: item.reason,
      tone: item.tone,
      progress: item.progress,
    }));
}

export async function recentActivity(limit = 12) {
  return db().activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    where: { action: { notIn: ["admin.login", "admin.logout"] } },
    select: {
      id: true,
      actorType: true,
      actorName: true,
      action: true,
      entityType: true,
      entityId: true,
      createdAt: true,
      metadata: true,
      portal: { select: { id: true, title: true } },
    },
  });
}
