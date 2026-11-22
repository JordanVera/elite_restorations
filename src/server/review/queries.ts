import "server-only";

import { PAGE_SIZE } from "@/lib/admin/list-params";
import { TEXT_FIELD_KEYS } from "@/lib/selections/fields";
import type { SelectionValues } from "@/lib/selections/input";
import type { SelectionStatus } from "@/lib/selections/status";
import { db, type Prisma } from "@/server/db/client";

export const REVIEW_STATUS_FILTERS = ["SUBMITTED", "CHANGES_REQUESTED", "APPROVED", "DRAFT", "all"] as const;
export type ReviewStatusFilter = (typeof REVIEW_STATUS_FILTERS)[number];

export async function listSelections({ q, status, portalId, page }: { q: string; status: ReviewStatusFilter; portalId: string; page: number }) {
  const where: Prisma.MaterialSelectionWhereInput = {
    status: status === "all" ? { not: "NOT_STARTED" } : status,
    ...(portalId ? { requirement: { portalId } } : {}),
  };
  if (q) {
    where.OR = [
      { requirement: { title: { contains: q, mode: "insensitive" } } },
      { productName: { contains: q, mode: "insensitive" } },
      { requirement: { portal: { quote: { quoteNumber: { contains: q } } } } },
      { requirement: { portal: { quote: { client: { name: { contains: q, mode: "insensitive" } } } } } },
    ];
  }
  // Oldest submission first, so nothing waits forever at the bottom of the queue.
  const orderBy: Prisma.MaterialSelectionOrderByWithRelationInput[] =
    status === "SUBMITTED" ? [{ submittedAt: "asc" }, { updatedAt: "asc" }] : [{ updatedAt: "desc" }];

  const [total, rows, portal] = await Promise.all([
    db().materialSelection.count({ where }),
    db().materialSelection.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        status: true,
        productName: true,
        submittedAt: true,
        updatedAt: true,
        _count: { select: { attachments: true, revisions: true } },
        requirement: {
          select: {
            title: true,
            area: true,
            categoryName: true,
            portal: {
              select: {
                id: true,
                title: true,
                quote: { select: { id: true, quoteNumber: true, source: true, client: { select: { id: true, name: true } } } },
              },
            },
          },
        },
      },
    }),
    portalId ? db().customerPortal.findUnique({ where: { id: portalId }, select: { id: true, title: true } }) : null,
  ]);
  return { total, rows, portal };
}

export type RevisionSnapshot = {
  requirement?: { title?: string; categoryName?: string };
  values: SelectionValues;
  attachments: { id: string; originalName: string; contentType: string; size: number }[];
};

function readSnapshot(raw: unknown): RevisionSnapshot {
  const data = (raw && typeof raw === "object" ? raw : {}) as Partial<RevisionSnapshot>;
  const values = (data.values ?? {}) as Partial<SelectionValues>;
  const normalized = { productUrls: Array.isArray(values.productUrls) ? values.productUrls : [], notes: values.notes ?? null } as SelectionValues;
  for (const key of TEXT_FIELD_KEYS) normalized[key] = typeof values[key] === "string" ? values[key] : null;
  return { requirement: data.requirement, values: normalized, attachments: Array.isArray(data.attachments) ? data.attachments : [] };
}

export async function getSelectionForReview(id: string, canSeeMoney: boolean) {
  const sel = await db().materialSelection.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
      version: true,
      productName: true,
      manufacturer: true,
      modelSku: true,
      color: true,
      finish: true,
      dimensions: true,
      productUrls: true,
      notes: true,
      submittedAt: true,
      approvedAt: true,
      updatedAt: true,
      requirement: {
        select: {
          id: true,
          title: true,
          area: true,
          categoryName: true,
          instructions: true,
          customerGuidance: true,
          required: true,
          quantity: true,
          unit: true,
          allowanceCents: true,
          preferredOptions: true,
          enabledFields: true,
          dueDate: true,
          lineItem: { select: { name: true, description: true } },
          portal: {
            select: {
              id: true,
              title: true,
              status: true,
              quote: { select: { id: true, quoteNumber: true, title: true, source: true, client: { select: { id: true, name: true } } } },
            },
          },
        },
      },
      attachments: {
        orderBy: { createdAt: "asc" },
        select: { id: true, originalName: true, contentType: true, size: true, revisionId: true, uploadedBy: true, createdAt: true },
      },
      revisions: { orderBy: { revisionNumber: "desc" }, select: { id: true, revisionNumber: true, submittedAt: true, snapshot: true } },
      reviews: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          decision: true,
          internalNote: true,
          customerFeedback: true,
          createdAt: true,
          revision: { select: { revisionNumber: true } },
          reviewer: { select: { name: true } },
        },
      },
    },
  });
  if (!sel) return null;

  const activity = await db().activityLog.findMany({
    where: { entityType: "MaterialSelection", entityId: sel.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: { id: true, actorType: true, actorName: true, action: true, createdAt: true, metadata: true },
  });

  const { requirement } = sel;
  return {
    ...sel,
    status: sel.status as SelectionStatus,
    requirement: {
      ...requirement,
      quantity: requirement.quantity === null ? null : Number(requirement.quantity),
      allowanceCents: canSeeMoney ? requirement.allowanceCents : null,
    },
    revisions: sel.revisions.map((rev) => ({ ...rev, snapshot: readSnapshot(rev.snapshot) })),
    activity,
  };
}

export type SelectionForReview = NonNullable<Awaited<ReturnType<typeof getSelectionForReview>>>;
