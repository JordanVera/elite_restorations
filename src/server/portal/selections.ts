import "server-only";

import { TEXT_FIELD_KEYS } from "@/lib/selections/fields";
import { hasSubmittableContent, parseSelectionInput, type SelectionInput, type SelectionValues } from "@/lib/selections/input";
import { customerCanEdit, transition, type SelectionStatus } from "@/lib/selections/status";
import { logActivity } from "@/server/activity";
import { db, type Prisma } from "@/server/db/client";
import type { PortalRef } from "@/server/portal/customer";

/**
 * Customer writes, scoped to one portal. Callers resolve the token first;
 * every query here also filters by portal id, so a selection or file from
 * another portal is treated as missing.
 */
export type SelectionWriteResult = {
  ok: boolean;
  message: string;
  /** Another tab or our team changed this selection first. */
  conflict?: boolean;
  status?: SelectionStatus;
  version?: number;
};

export const CONFLICT_MESSAGE = "This selection changed in another window. Reload the page to see the latest version.";
const LOCKED_MESSAGE = "This selection was already submitted. Contact us if you need to change it.";

class Conflict extends Error {}

/** Only fields the category asks for are written; anything else keeps its stored value. */
function selectionData(values: SelectionValues, enabledFields: string[]) {
  const data: Prisma.MaterialSelectionUncheckedUpdateInput = { notes: values.notes };
  for (const key of TEXT_FIELD_KEYS) if (enabledFields.includes(key)) data[key] = values[key];
  if (enabledFields.includes("productUrls")) data.productUrls = values.productUrls;
  return data;
}

export async function saveSelection(
  portal: PortalRef,
  requirementId: string,
  input: SelectionInput,
  expectedVersion: number,
  intent: "draft" | "submit",
): Promise<SelectionWriteResult> {
  const submit = intent === "submit";
  try {
    return await db().$transaction(async (tx): Promise<SelectionWriteResult> => {
      const req = await tx.selectionRequirement.findFirst({
        where: { id: String(requirementId), portalId: portal.id },
        select: {
          id: true,
          title: true,
          categoryName: true,
          enabledFields: true,
          selection: { select: { id: true, status: true, version: true, _count: { select: { attachments: true } } } },
        },
      });
      if (!req) return { ok: false, message: "That selection is no longer part of this portal." };

      const current = req.selection;
      const status: SelectionStatus = current?.status ?? "NOT_STARTED";
      if ((current?.version ?? 0) !== expectedVersion) return { ok: false, conflict: true, message: CONFLICT_MESSAGE };

      const step = transition(status, { type: submit ? "SUBMIT" : "SAVE_DRAFT", actor: "CUSTOMER" });
      if (!step.ok) return { ok: false, message: customerCanEdit(status) ? step.reason : LOCKED_MESSAGE };

      const parsed = parseSelectionInput(input ?? {}, req.enabledFields);
      if (!parsed.ok) return { ok: false, message: parsed.message };
      if (submit && !hasSubmittableContent(parsed.values, current?._count.attachments ?? 0)) {
        return { ok: false, message: "Add at least one detail, link, note, or file before submitting." };
      }

      const now = new Date();
      const data = { ...selectionData(parsed.values, req.enabledFields), status: step.status, ...(submit ? { submittedAt: now } : {}) };

      let selectionId: string;
      if (!current) {
        const created = await tx.materialSelection.create({
          data: { ...(data as Prisma.MaterialSelectionUncheckedCreateInput), requirementId: req.id, version: 1 },
          select: { id: true },
        });
        selectionId = created.id;
      } else {
        const updated = await tx.materialSelection.updateMany({
          where: { id: current.id, version: expectedVersion },
          data: { ...(data as Prisma.MaterialSelectionUpdateManyMutationInput), version: { increment: 1 } },
        });
        if (updated.count !== 1) throw new Conflict();
        selectionId = current.id;
      }

      let revisionNumber: number | undefined;
      if (submit) {
        const latest = await tx.selectionRevision.findFirst({
          where: { selectionId },
          orderBy: { revisionNumber: "desc" },
          select: { revisionNumber: true },
        });
        revisionNumber = (latest?.revisionNumber ?? 0) + 1;
        const files = await tx.attachment.findMany({
          where: { selectionId },
          orderBy: { createdAt: "asc" },
          select: { id: true, originalName: true, contentType: true, size: true },
        });
        const revision = await tx.selectionRevision.create({
          data: {
            selectionId,
            revisionNumber,
            submittedAt: now,
            snapshot: { requirement: { title: req.title, categoryName: req.categoryName }, values: parsed.values, attachments: files },
          },
          select: { id: true },
        });
        await tx.attachment.updateMany({ where: { selectionId, revisionId: null }, data: { revisionId: revision.id } });
      }

      await logActivity(
        {
          actorType: "CUSTOMER",
          actorName: portal.clientName,
          action: submit ? "selection.submitted" : "selection.draft_saved",
          entityType: "MaterialSelection",
          entityId: selectionId,
          portalId: portal.id,
          metadata: { title: req.title, ...(revisionNumber ? { revision: revisionNumber } : {}) },
        },
        tx,
      );

      return {
        ok: true,
        message: submit ? "Submitted. Our team will review it and let you know if anything needs to change." : "Draft saved.",
        status: step.status,
        version: (current?.version ?? 0) + 1,
      };
    });
  } catch (error) {
    if (error instanceof Conflict) return { ok: false, conflict: true, message: CONFLICT_MESSAGE };
    if (error && typeof error === "object" && (error as { code?: string }).code === "P2002") return { ok: false, conflict: true, message: CONFLICT_MESSAGE };
    throw error;
  }
}

/** Removes a not-yet-submitted customer file. Returns the storage path so the caller can delete the object. */
export async function removeAttachment(
  portal: PortalRef,
  attachmentId: string,
): Promise<{ ok: true; pathname: string } | { ok: false; message: string }> {
  return db().$transaction(async (tx) => {
    const file = await tx.attachment.findFirst({
      where: { id: String(attachmentId), selection: { requirement: { portalId: portal.id } } },
      select: { id: true, blobPathname: true, originalName: true, revisionId: true, uploadedBy: true, selection: { select: { id: true, status: true } } },
    });
    if (!file) return { ok: false as const, message: "That file was already removed." };
    if (file.uploadedBy !== "CUSTOMER" || file.revisionId) {
      return { ok: false as const, message: "Files that were already submitted stay with the record. Contact us if one needs to go." };
    }
    if (!customerCanEdit(file.selection.status)) return { ok: false as const, message: LOCKED_MESSAGE };
    await tx.attachment.delete({ where: { id: file.id } });
    await logActivity(
      {
        actorType: "CUSTOMER",
        actorName: portal.clientName,
        action: "attachment.removed",
        entityType: "MaterialSelection",
        entityId: file.selection.id,
        portalId: portal.id,
        metadata: { name: file.originalName },
      },
      tx,
    );
    return { ok: true as const, pathname: file.blobPathname };
  });
}
