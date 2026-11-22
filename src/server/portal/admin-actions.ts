"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { logActivity } from "@/server/activity";
import { can } from "@/server/auth/policy";
import { assertAdmin, type AdminIdentity } from "@/server/auth/session";
import { db, type Db, type Prisma } from "@/server/db/client";
import {
  firstIssue,
  portalSettingsInput,
  requirementInput,
  type PortalSettingsInput,
  type RequirementData,
  type RequirementInput,
} from "@/server/portal/schemas";
import { deleteFiles } from "@/server/portal/storage";
import { issuePortalToken, portalUrl, revealPortalToken } from "@/server/portal/tokens";

export type PortalActionResult = { ok: boolean; message: string; url?: string };

type Tx = Prisma.TransactionClient;

const MAX_REQUIREMENTS = 60;

function actor(admin: AdminIdentity) {
  return { actorType: "ADMIN" as const, actorId: admin.id, actorName: admin.name };
}

function refresh(portalId: string, quoteId?: string) {
  revalidatePath(`/admin/portals/${portalId}`);
  revalidatePath("/admin/portals");
  if (quoteId) revalidatePath(`/admin/quotes/${quoteId}`);
}

function isUniqueViolation(error: unknown): boolean {
  return Boolean(error && typeof error === "object" && "code" in error && (error as { code?: string }).code === "P2002");
}

async function categoryFields(client: Tx | Db, categoryId: string | null | undefined) {
  if (!categoryId) return null;
  return client.selectionCategory.findUnique({
    where: { id: categoryId },
    select: { id: true, name: true, enabledFields: true, defaultInstructions: true },
  });
}

async function requirementRow(client: Tx | Db, data: RequirementData) {
  const category = await categoryFields(client, data.categoryId);
  return {
    categoryId: category?.id ?? null,
    categoryName: category?.name ?? "Custom",
    lineItemId: data.lineItemId || null,
    title: data.title,
    area: data.area,
    instructions: data.instructions ?? category?.defaultInstructions ?? null,
    customerGuidance: data.customerGuidance,
    required: data.required,
    quantity: data.quantity,
    unit: data.unit,
    allowanceCents: data.allowance,
    preferredOptions: data.preferredOptions,
    enabledFields: data.enabledFields.length ? data.enabledFields : (category?.enabledFields ?? []),
    dueDate: data.dueDate,
  };
}

/** Loads an editable portal or explains why it can't be edited. */
async function editablePortal(
  client: Tx | Db,
  portalId: string,
): Promise<{ error: string } | { error: null; portal: { id: string; quoteId: string } }> {
  const portal = await client.customerPortal.findUnique({
    where: { id: portalId },
    select: { id: true, status: true, quoteId: true },
  });
  if (!portal) return { error: "Portal not found." };
  if (portal.status === "REVOKED") return { error: "This portal was revoked and can no longer be changed." };
  return { error: null, portal };
}

export async function createPortalAction(input: {
  quoteId: string;
  settings: PortalSettingsInput;
  requirements: RequirementInput[];
}): Promise<PortalActionResult> {
  const admin = await assertAdmin("manage_portals");
  const settings = portalSettingsInput.safeParse(input.settings);
  if (!settings.success) return { ok: false, message: firstIssue(settings.error) };
  if (input.requirements.length > MAX_REQUIREMENTS) return { ok: false, message: `A portal can have up to ${MAX_REQUIREMENTS} selections.` };
  const parsed: RequirementData[] = [];
  for (const raw of input.requirements) {
    const result = requirementInput.safeParse(raw);
    if (!result.success) return { ok: false, message: `${raw.title || "A selection"}: ${firstIssue(result.error)}` };
    parsed.push(result.data);
  }

  const quote = await db().jobberQuote.findUnique({
    where: { id: input.quoteId },
    select: { id: true, lineItems: { select: { id: true } } },
  });
  if (!quote) return { ok: false, message: "Quote not found." };
  const lineItemIds = new Set(quote.lineItems.map((item) => item.id));

  let portalId: string;
  try {
    portalId = await db().$transaction(async (tx) => {
      const { tokenHash, tokenEncrypted } = issuePortalToken();
      const portal = await tx.customerPortal.create({
        data: {
          quoteId: quote.id,
          tokenHash,
          tokenEncrypted,
          title: settings.data.title,
          welcomeMessage: settings.data.welcomeMessage,
          showAllowances: can(admin.role, "view_financials") && settings.data.showAllowances,
          expiresAt: settings.data.expiresAt,
          createdById: admin.id,
        },
      });
      for (const [index, data] of parsed.entries()) {
        const row = await requirementRow(tx, { ...data, lineItemId: data.lineItemId && lineItemIds.has(data.lineItemId) ? data.lineItemId : null });
        await tx.selectionRequirement.create({ data: { ...row, portalId: portal.id, sortOrder: index } });
      }
      await logActivity(
        {
          ...actor(admin),
          action: "portal.created",
          entityType: "CustomerPortal",
          entityId: portal.id,
          portalId: portal.id,
          metadata: { requirements: parsed.length },
        },
        tx,
      );
      return portal.id;
    });
  } catch (error) {
    if (isUniqueViolation(error)) return { ok: false, message: "This quote already has an active portal. Open it instead." };
    throw error;
  }
  refresh(portalId, quote.id);
  redirect(`/admin/portals/${portalId}`);
}

export async function updatePortalSettingsAction(portalId: string, input: PortalSettingsInput): Promise<PortalActionResult> {
  const admin = await assertAdmin("manage_portals");
  const settings = portalSettingsInput.safeParse(input);
  if (!settings.success) return { ok: false, message: firstIssue(settings.error) };
  const found = await editablePortal(db(), portalId);
  if (found.error !== null) return { ok: false, message: found.error };
  const data = can(admin.role, "view_financials") ? settings.data : { ...settings.data, showAllowances: undefined };
  await db().$transaction(async (tx) => {
    await tx.customerPortal.update({ where: { id: portalId }, data });
    await logActivity({ ...actor(admin), action: "portal.updated", entityType: "CustomerPortal", entityId: portalId, portalId }, tx);
  });
  refresh(portalId, found.portal.quoteId);
  return { ok: true, message: "Portal settings saved." };
}

export async function saveRequirementAction(portalId: string, input: RequirementInput): Promise<PortalActionResult> {
  const admin = await assertAdmin("manage_portals");
  const parsed = requirementInput.safeParse(input);
  if (!parsed.success) return { ok: false, message: firstIssue(parsed.error) };
  const data = parsed.data;
  const seesMoney = can(admin.role, "view_financials");
  if (!seesMoney) data.allowance = null;

  const result = await db().$transaction(async (tx) => {
    const found = await editablePortal(tx, portalId);
    if (found.error !== null) return { ok: false, message: found.error };
    if (data.lineItemId) {
      const item = await tx.jobberQuoteLineItem.findFirst({ where: { id: data.lineItemId, quoteId: found.portal.quoteId }, select: { id: true } });
      if (!item) data.lineItemId = null;
    }
    const row = await requirementRow(tx, data);

    if (data.id) {
      const existing = await tx.selectionRequirement.findFirst({ where: { id: data.id, portalId }, select: { id: true, allowanceCents: true } });
      if (!existing) return { ok: false, message: "That selection no longer exists." };
      if (!seesMoney) row.allowanceCents = existing.allowanceCents;
      await tx.selectionRequirement.update({ where: { id: data.id }, data: row });
      await logActivity(
        { ...actor(admin), action: "requirement.updated", entityType: "SelectionRequirement", entityId: data.id, portalId, metadata: { title: row.title } },
        tx,
      );
      return { ok: true, message: "Selection saved." };
    }

    const count = await tx.selectionRequirement.count({ where: { portalId } });
    if (count >= MAX_REQUIREMENTS) return { ok: false, message: `A portal can have up to ${MAX_REQUIREMENTS} selections.` };
    const last = await tx.selectionRequirement.findFirst({ where: { portalId }, orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
    const created = await tx.selectionRequirement.create({ data: { ...row, portalId, sortOrder: (last?.sortOrder ?? -1) + 1 } });
    await logActivity(
      { ...actor(admin), action: "requirement.added", entityType: "SelectionRequirement", entityId: created.id, portalId, metadata: { title: row.title } },
      tx,
    );
    return { ok: true, message: "Selection added." };
  });
  refresh(portalId);
  return result;
}

export async function removeRequirementAction(portalId: string, requirementId: string): Promise<PortalActionResult> {
  const admin = await assertAdmin("manage_portals");
  const result = await db().$transaction(async (tx) => {
    const found = await editablePortal(tx, portalId);
    if (found.error !== null) return { ok: false, message: found.error, files: [] as string[] };
    const requirement = await tx.selectionRequirement.findFirst({
      where: { id: requirementId, portalId },
      select: { id: true, title: true, selection: { select: { attachments: { select: { blobPathname: true } } } } },
    });
    if (!requirement) return { ok: false, message: "That selection no longer exists.", files: [] as string[] };
    await tx.selectionRequirement.delete({ where: { id: requirement.id } });
    await logActivity(
      {
        ...actor(admin),
        action: "requirement.removed",
        entityType: "SelectionRequirement",
        entityId: requirement.id,
        portalId,
        metadata: { title: requirement.title },
      },
      tx,
    );
    return { ok: true, message: "Selection removed.", files: requirement.selection?.attachments.map((a) => a.blobPathname) ?? [] };
  });
  await deleteFiles(result.files);
  refresh(portalId);
  return { ok: result.ok, message: result.message };
}

export async function reorderRequirementsAction(portalId: string, orderedIds: string[]): Promise<PortalActionResult> {
  const admin = await assertAdmin("manage_portals");
  const result = await db().$transaction(async (tx) => {
    const found = await editablePortal(tx, portalId);
    if (found.error !== null) return { ok: false, message: found.error };
    const existing = await tx.selectionRequirement.findMany({ where: { portalId }, select: { id: true } });
    const ids = new Set(existing.map((r) => r.id));
    if (orderedIds.length !== ids.size || new Set(orderedIds).size !== ids.size || orderedIds.some((id) => !ids.has(id))) {
      return { ok: false, message: "The list changed while you were reordering. Reload and try again." };
    }
    for (const [index, id] of orderedIds.entries()) {
      await tx.selectionRequirement.update({ where: { id }, data: { sortOrder: index } });
    }
    await logActivity({ ...actor(admin), action: "requirement.reordered", entityType: "CustomerPortal", entityId: portalId, portalId }, tx);
    return { ok: true, message: "Order saved." };
  });
  refresh(portalId);
  return result;
}

export async function publishPortalAction(portalId: string): Promise<PortalActionResult> {
  const admin = await assertAdmin("manage_portals");
  const result = await db().$transaction(async (tx) => {
    const portal = await tx.customerPortal.findUnique({
      where: { id: portalId },
      select: { status: true, quoteId: true, expiresAt: true, _count: { select: { requirements: true } } },
    });
    if (!portal) return { ok: false, message: "Portal not found." };
    if (portal.status !== "DRAFT") return { ok: false, message: "Only draft portals can be published." };
    if (portal._count.requirements === 0) return { ok: false, message: "Add at least one selection before publishing." };
    if (portal.expiresAt && portal.expiresAt < new Date()) return { ok: false, message: "The expiration date is in the past. Change it first." };
    await tx.customerPortal.update({ where: { id: portalId }, data: { status: "PUBLISHED", publishedAt: new Date() } });
    await logActivity({ ...actor(admin), action: "portal.published", entityType: "CustomerPortal", entityId: portalId, portalId }, tx);
    return { ok: true, message: "Published. Copy the link and send it to the customer." };
  });
  refresh(portalId);
  return result;
}

export async function unpublishPortalAction(portalId: string): Promise<PortalActionResult> {
  const admin = await assertAdmin("manage_portals");
  const updated = await db().customerPortal.updateMany({ where: { id: portalId, status: "PUBLISHED" }, data: { status: "DRAFT" } });
  if (!updated.count) return { ok: false, message: "Only published portals can be moved back to draft." };
  await logActivity({ ...actor(admin), action: "portal.unpublished", entityType: "CustomerPortal", entityId: portalId, portalId });
  refresh(portalId);
  return { ok: true, message: "Moved back to draft. The customer link is paused until you publish again." };
}

export async function revokePortalAction(portalId: string): Promise<PortalActionResult> {
  const admin = await assertAdmin("manage_portals");
  const portal = await db().customerPortal.findUnique({ where: { id: portalId }, select: { quoteId: true } });
  const updated = await db().customerPortal.updateMany({
    where: { id: portalId, status: { not: "REVOKED" } },
    data: { status: "REVOKED", revokedAt: new Date() },
  });
  if (!updated.count) return { ok: false, message: "This portal is already revoked." };
  await logActivity({ ...actor(admin), action: "portal.revoked", entityType: "CustomerPortal", entityId: portalId, portalId });
  refresh(portalId, portal?.quoteId);
  return { ok: true, message: "Revoked. The link no longer works, and a new portal can be created for this quote." };
}

export async function regeneratePortalLinkAction(portalId: string): Promise<PortalActionResult> {
  const admin = await assertAdmin("manage_portals");
  const { token, tokenHash, tokenEncrypted } = issuePortalToken();
  const updated = await db().customerPortal.updateMany({
    where: { id: portalId, status: { not: "REVOKED" } },
    data: { tokenHash, tokenEncrypted },
  });
  if (!updated.count) return { ok: false, message: "Revoked portals can't get a new link." };
  await logActivity({ ...actor(admin), action: "portal.token_regenerated", entityType: "CustomerPortal", entityId: portalId, portalId });
  refresh(portalId);
  return { ok: true, message: "New link created. The old link stopped working.", url: await portalUrl(token) };
}

/** The link is fetched on demand so the token is never rendered into admin page HTML. */
export async function getPortalLinkAction(portalId: string): Promise<PortalActionResult> {
  await assertAdmin("manage_portals");
  const portal = await db().customerPortal.findUnique({ where: { id: portalId }, select: { status: true, tokenEncrypted: true } });
  if (!portal || portal.status === "REVOKED") return { ok: false, message: "This portal has no active link." };
  const token = revealPortalToken(portal.tokenEncrypted);
  if (!token) return { ok: false, message: "The link can't be decrypted with the current key. Regenerate it." };
  return { ok: true, message: "Link copied.", url: await portalUrl(token) };
}

export async function deleteDraftPortalAction(portalId: string): Promise<PortalActionResult> {
  const admin = await assertAdmin("manage_portals");
  const result = await db().$transaction(async (tx) => {
    const portal = await tx.customerPortal.findUnique({
      where: { id: portalId },
      select: {
        status: true,
        quoteId: true,
        publishedAt: true,
        requirements: { select: { selection: { select: { id: true } } } },
      },
    });
    if (!portal) return { ok: false, message: "Portal not found." };
    if (portal.status !== "DRAFT" || portal.publishedAt) {
      return { ok: false, message: "Only drafts that were never published can be deleted. Revoke it instead." };
    }
    if (portal.requirements.some((r) => r.selection)) return { ok: false, message: "This draft has customer data. Revoke it instead." };
    await tx.customerPortal.delete({ where: { id: portalId } });
    await logActivity(
      { ...actor(admin), action: "portal.deleted", entityType: "CustomerPortal", entityId: portalId, metadata: { quoteId: portal.quoteId } },
      tx,
    );
    return { ok: true, message: "Draft deleted.", quoteId: portal.quoteId };
  });
  if (!result.ok) return result;
  revalidatePath("/admin/portals");
  redirect("quoteId" in result && result.quoteId ? `/admin/quotes/${result.quoteId}` : "/admin/portals");
}
