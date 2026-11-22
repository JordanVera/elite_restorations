import "server-only";

import { customerCanEdit } from "@/lib/selections/status";
import { MAX_ATTACHMENTS_PER_SELECTION, cleanFileName, type UploadType } from "@/lib/selections/uploads";
import { logActivity } from "@/server/activity";
import { db, type Prisma } from "@/server/db/client";
import type { CustomerAttachment, PortalRef } from "@/server/portal/customer";

type Tx = Prisma.TransactionClient;

export type UploadCheck = { ok: true } | { ok: false; message: string };

async function checkTarget(client: Tx | ReturnType<typeof db>, portalId: string, requirementId: string): Promise<UploadCheck> {
  const req = await client.selectionRequirement.findFirst({
    where: { id: requirementId, portalId },
    select: { enabledFields: true, selection: { select: { status: true, _count: { select: { attachments: true } } } } },
  });
  if (!req) return { ok: false, message: "That selection is no longer part of this portal." };
  if (!req.enabledFields.includes("attachments")) return { ok: false, message: "Files aren't needed for this selection." };
  if (req.selection && !customerCanEdit(req.selection.status)) {
    return { ok: false, message: "This selection was already submitted. Contact us if you need to change it." };
  }
  if ((req.selection?._count.attachments ?? 0) >= MAX_ATTACHMENTS_PER_SELECTION) {
    return { ok: false, message: `You can add up to ${MAX_ATTACHMENTS_PER_SELECTION} files to each selection.` };
  }
  return { ok: true };
}

/** Called before any bytes are accepted, so a rejected upload costs nothing. */
export function checkUploadTarget(portal: PortalRef, requirementId: string): Promise<UploadCheck> {
  return checkTarget(db(), portal.id, requirementId);
}

/**
 * Records a stored file. The target is checked again inside the transaction
 * because the status or file count may have changed during the upload.
 */
export async function recordAttachment(
  portal: PortalRef,
  requirementId: string,
  file: { pathname: string; contentType: UploadType; size: number; originalName: string },
): Promise<{ ok: true; attachment: CustomerAttachment } | { ok: false; message: string }> {
  return db().$transaction(async (tx) => {
    const check = await checkTarget(tx, portal.id, requirementId);
    if (!check.ok) return check;
    const selection = await tx.materialSelection.upsert({
      where: { requirementId },
      create: { requirementId },
      update: {},
      select: { id: true },
    });
    const name = cleanFileName(file.originalName);
    const row = await tx.attachment.create({
      data: {
        selectionId: selection.id,
        blobPathname: file.pathname,
        contentType: file.contentType,
        size: file.size,
        originalName: name,
        uploadedBy: "CUSTOMER",
      },
      select: { id: true },
    });
    await logActivity(
      {
        actorType: "CUSTOMER",
        actorName: portal.clientName,
        action: "attachment.uploaded",
        entityType: "MaterialSelection",
        entityId: selection.id,
        portalId: portal.id,
        metadata: { name, size: file.size },
      },
      tx,
    );
    return { ok: true as const, attachment: { id: row.id, name, size: file.size, contentType: file.contentType, locked: false } };
  });
}
