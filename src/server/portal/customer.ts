import "server-only";

import { portalAccess, type PortalAccess } from "@/lib/selections/access";
import type { SelectionFieldKey } from "@/lib/selections/fields";
import { sanitizeFieldKeys } from "@/lib/selections/fields";
import {
  categorySlugForRequirement,
  resolveResourceSlugs,
  resourcesForCategory,
  resourcesFromSlugs,
  type PortalResource,
} from "@/lib/selections/resources";
import type { SelectionStatus } from "@/lib/selections/status";
import { db } from "@/server/db/client";
import { listPortalResources } from "@/server/portal/resources";
import { hashPortalToken, isPortalTokenShape } from "@/server/portal/tokens";

/**
 * Everything here is what the customer may see. Quote totals, line item
 * prices, internal notes, and Jobber ids never leave this module.
 */
export type CustomerAttachment = {
  id: string;
  name: string;
  size: number;
  contentType: string;
  /** Part of a submitted revision, so it stays for the record. */
  locked: boolean;
};

export type CustomerSelection = {
  status: SelectionStatus;
  version: number;
  productName: string | null;
  manufacturer: string | null;
  modelSku: string | null;
  color: string | null;
  finish: string | null;
  dimensions: string | null;
  productUrls: string[];
  notes: string | null;
  submittedAt: string | null;
  feedback: string | null;
  attachments: CustomerAttachment[];
};

export type CustomerItem = {
  id: string;
  title: string;
  categoryName: string;
  area: string | null;
  instructions: string | null;
  customerGuidance: string | null;
  required: boolean;
  quantity: number | null;
  unit: string | null;
  allowanceCents: number | null;
  preferredOptions: string[];
  enabledFields: SelectionFieldKey[];
  dueDate: string | null;
  resources: PortalResource[];
  selection: CustomerSelection;
};

export type CustomerPortalView = {
  title: string;
  welcomeMessage: string;
  propertyAddress: string | null;
  resources: PortalResource[];
  items: CustomerItem[];
};

export type PortalRef = { id: string; quoteId: string; clientName: string };

export type ResolvedPortal = { access: "open"; portal: PortalRef } | { access: Exclude<PortalAccess, "open"> | "invalid" };

/** Token to portal. Lookup is by hash only; the shape check stops junk before it reaches the database. */
export async function resolvePortal(token: string): Promise<ResolvedPortal> {
  if (!isPortalTokenShape(token)) return { access: "invalid" };
  const portal = await db().customerPortal.findUnique({
    where: { tokenHash: hashPortalToken(token) },
    select: { id: true, quoteId: true, status: true, expiresAt: true, quote: { select: { client: { select: { name: true } } } } },
  });
  if (!portal) return { access: "invalid" };
  const access = portalAccess(portal);
  if (access !== "open") return { access };
  return { access, portal: { id: portal.id, quoteId: portal.quoteId, clientName: portal.quote.client.name } };
}

function emptySelection(): CustomerSelection {
  return {
    status: "NOT_STARTED",
    version: 0,
    productName: null,
    manufacturer: null,
    modelSku: null,
    color: null,
    finish: null,
    dimensions: null,
    productUrls: [],
    notes: null,
    submittedAt: null,
    feedback: null,
    attachments: [],
  };
}

export async function getCustomerPortal(portalId: string): Promise<CustomerPortalView | null> {
  const portal = await db().customerPortal.findUnique({
    where: { id: portalId },
    select: {
      title: true,
      welcomeMessage: true,
      showAllowances: true,
      resourcesCustomized: true,
      resourceSlugs: true,
      quote: { select: { propertyAddress: true } },
      requirements: {
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          title: true,
          categoryName: true,
          category: { select: { slug: true } },
          area: true,
          instructions: true,
          customerGuidance: true,
          required: true,
          quantity: true,
          unit: true,
          allowanceCents: true,
          preferredOptions: true,
          enabledFields: true,
          dueDate: true,
          selection: {
            select: {
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
              attachments: {
                orderBy: { createdAt: "asc" },
                select: { id: true, originalName: true, size: true, contentType: true, revisionId: true },
              },
              reviews: {
                where: { decision: "CHANGES_REQUESTED" },
                orderBy: { createdAt: "desc" },
                take: 1,
                select: { customerFeedback: true },
              },
            },
          },
        },
      },
    },
  });
  if (!portal) return null;

  const catalog = await listPortalResources();
  const categorySlugs = portal.requirements
    .map((req) => categorySlugForRequirement(req.category?.slug, req.categoryName))
    .filter((slug): slug is string => Boolean(slug));
  const resourceSlugs = resolveResourceSlugs(catalog, {
    customized: portal.resourcesCustomized,
    saved: portal.resourceSlugs,
    categorySlugs,
  });

  return {
    title: portal.title,
    welcomeMessage: portal.welcomeMessage,
    propertyAddress: portal.quote.propertyAddress,
    resources: resourcesFromSlugs(catalog, resourceSlugs),
    items: portal.requirements.map((req) => {
      const sel = req.selection;
      const categorySlug = categorySlugForRequirement(req.category?.slug, req.categoryName);
      return {
        id: req.id,
        title: req.title,
        categoryName: req.categoryName,
        area: req.area,
        instructions: req.instructions,
        customerGuidance: req.customerGuidance,
        required: req.required,
        quantity: req.quantity === null ? null : Number(req.quantity),
        unit: req.unit,
        allowanceCents: portal.showAllowances ? req.allowanceCents : null,
        preferredOptions: req.preferredOptions,
        enabledFields: sanitizeFieldKeys(req.enabledFields),
        dueDate: req.dueDate ? req.dueDate.toISOString().slice(0, 10) : null,
        resources: resourcesForCategory(catalog, categorySlug, resourceSlugs),
        selection: sel
          ? {
              status: sel.status,
              version: sel.version,
              productName: sel.productName,
              manufacturer: sel.manufacturer,
              modelSku: sel.modelSku,
              color: sel.color,
              finish: sel.finish,
              dimensions: sel.dimensions,
              productUrls: sel.productUrls,
              notes: sel.notes,
              submittedAt: sel.submittedAt?.toISOString() ?? null,
              feedback: sel.status === "CHANGES_REQUESTED" ? (sel.reviews[0]?.customerFeedback ?? null) : null,
              attachments: sel.attachments.map((a) => ({
                id: a.id,
                name: a.originalName,
                size: a.size,
                contentType: a.contentType,
                locked: a.revisionId !== null,
              })),
            }
          : emptySelection(),
      };
    }),
  };
}

const VIEW_LOG_INTERVAL_MS = 6 * 60 * 60 * 1000;

/** One "viewed" entry per visit window, so the activity feed isn't flooded by reloads. */
export async function recordPortalView(portal: PortalRef): Promise<void> {
  const recent = await db().activityLog.findFirst({
    where: { portalId: portal.id, action: "portal.viewed", createdAt: { gte: new Date(Date.now() - VIEW_LOG_INTERVAL_MS) } },
    select: { id: true },
  });
  if (recent) return;
  await db().activityLog.create({
    data: {
      actorType: "CUSTOMER",
      actorName: portal.clientName,
      action: "portal.viewed",
      entityType: "CustomerPortal",
      entityId: portal.id,
      portalId: portal.id,
    },
  });
}
