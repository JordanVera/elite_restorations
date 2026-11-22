"use server";

import { revalidatePath } from "next/cache";

import type { SelectionInput } from "@/lib/selections/input";
import { isUploadPathFor, isUploadType, MAX_UPLOAD_BYTES } from "@/lib/selections/uploads";
import { db } from "@/server/db/client";
import { isRateLimited } from "@/server/rate-limit";
import { resolvePortal, type CustomerAttachment, type PortalRef } from "@/server/portal/customer";
import { removeAttachment, saveSelection, type SelectionWriteResult } from "@/server/portal/selections";
import { deleteFiles, statFile, storageMode } from "@/server/portal/storage";
import { recordAttachment } from "@/server/portal/uploads";

export type CustomerActionResult = SelectionWriteResult;

const LINK_CLOSED = "This link is no longer active. Contact us for a new one.";

async function openPortal(token: string, bucket: string, max: number): Promise<PortalRef | string> {
  const resolved = await resolvePortal(String(token));
  if (resolved.access !== "open") return LINK_CLOSED;
  if (isRateLimited(`portal-${bucket}:${resolved.portal.id}`, { max })) return "Too many changes in a short time. Wait a few minutes and try again.";
  return resolved.portal;
}

function refreshAdmin(portalId: string) {
  revalidatePath(`/admin/portals/${portalId}`);
  revalidatePath("/admin/selections");
}

export async function saveSelectionAction(
  token: string,
  requirementId: string,
  input: SelectionInput,
  expectedVersion: number,
  intent: "draft" | "submit",
): Promise<CustomerActionResult> {
  const portal = await openPortal(token, "save", 200);
  if (typeof portal === "string") return { ok: false, message: portal };
  const result = await saveSelection(portal, requirementId, input, Number(expectedVersion), intent === "submit" ? "submit" : "draft");
  if (result.ok) refreshAdmin(portal.id);
  return result;
}

export async function removeAttachmentAction(token: string, attachmentId: string): Promise<CustomerActionResult> {
  const portal = await openPortal(token, "files", 120);
  if (typeof portal === "string") return { ok: false, message: portal };
  const outcome = await removeAttachment(portal, attachmentId);
  if (!outcome.ok) return outcome;
  await deleteFiles([outcome.pathname]);
  refreshAdmin(portal.id);
  return { ok: true, message: "File removed." };
}

/**
 * Second half of a direct-to-Blob upload. The browser already stored the
 * file with a short-lived token scoped to this selection's folder; the
 * stored object is checked here before it becomes an attachment.
 */
export async function registerUploadAction(
  token: string,
  requirementId: string,
  pathname: string,
  originalName: string,
): Promise<{ ok: true; attachment: CustomerAttachment } | { ok: false; message: string }> {
  const portal = await openPortal(token, "files", 120);
  if (typeof portal === "string") return { ok: false, message: portal };
  if (storageMode() !== "blob") return { ok: false, message: "Uploads are not available right now." };
  const path = String(pathname);
  if (!isUploadPathFor(path, portal.id, String(requirementId))) return { ok: false, message: "That upload doesn't belong to this selection." };

  const stored = await statFile(path);
  const type = stored?.contentType?.toLowerCase() ?? "";
  if (!stored || !isUploadType(type) || stored.size <= 0 || stored.size > MAX_UPLOAD_BYTES) {
    if (stored) await deleteFiles([path]);
    return { ok: false, message: "That file couldn't be used. Use a JPG, PNG, WebP, HEIC, or PDF under 10 MB." };
  }

  const existing = await db().attachment.findUnique({
    where: { blobPathname: path },
    select: { id: true, originalName: true, size: true, contentType: true, revisionId: true },
  });
  if (existing) {
    return {
      ok: true,
      attachment: { id: existing.id, name: existing.originalName, size: existing.size, contentType: existing.contentType, locked: existing.revisionId !== null },
    };
  }

  const result = await recordAttachment(portal, String(requirementId), { pathname: path, contentType: type, size: stored.size, originalName: String(originalName) });
  if (!result.ok) await deleteFiles([path]);
  else refreshAdmin(portal.id);
  return result;
}
