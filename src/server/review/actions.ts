"use server";

import { revalidatePath } from "next/cache";

import { transition, type SelectionEventType } from "@/lib/selections/status";
import { logActivity } from "@/server/activity";
import { assertAdmin } from "@/server/auth/session";
import { db } from "@/server/db/client";

export type ReviewDecisionInput = "APPROVE" | "REQUEST_CHANGES" | "REOPEN" | "NOTE";
export type ReviewActionResult = { ok: boolean; message: string };

const MAX_TEXT = 2000;

const DECISIONS = {
  APPROVE: { record: "APPROVED", action: "selection.approved", done: "Approved for ordering. This is an internal material approval only." },
  REQUEST_CHANGES: { record: "CHANGES_REQUESTED", action: "selection.changes_requested", done: "Sent back to the customer with your message." },
  REOPEN: { record: "REOPENED", action: "selection.reopened", done: "Reopened. The customer can edit and resubmit it." },
  NOTE: { record: "NOTE", action: "selection.note", done: "Note added." },
} as const;

function clean(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text ? text : null;
}

/**
 * Internal review of a customer's material choice. It never touches the
 * Jobber quote, prices, or line items, and it is not a contract change.
 */
export async function reviewSelectionAction(input: {
  selectionId: string;
  decision: ReviewDecisionInput;
  expectedVersion: number;
  internalNote?: string;
  customerFeedback?: string;
}): Promise<ReviewActionResult> {
  const admin = await assertAdmin("review_selections");
  const rule = DECISIONS[input.decision];
  if (!rule) return { ok: false, message: "Unknown decision." };
  const internalNote = clean(input.internalNote);
  const customerFeedback = input.decision === "REQUEST_CHANGES" ? clean(input.customerFeedback) : null;
  if ((internalNote?.length ?? 0) > MAX_TEXT || (customerFeedback?.length ?? 0) > MAX_TEXT) {
    return { ok: false, message: `Keep notes under ${MAX_TEXT} characters.` };
  }
  if (input.decision === "REQUEST_CHANGES" && !customerFeedback) return { ok: false, message: "Tell the customer what to change." };
  if (input.decision === "NOTE" && !internalNote) return { ok: false, message: "Write a note first." };

  const result = await db().$transaction(async (tx): Promise<ReviewActionResult & { portalId?: string }> => {
    const sel = await tx.materialSelection.findUnique({
      where: { id: String(input.selectionId) },
      select: {
        id: true,
        status: true,
        version: true,
        requirement: { select: { title: true, portal: { select: { id: true, status: true } } } },
        revisions: { orderBy: { revisionNumber: "desc" }, take: 1, select: { id: true, revisionNumber: true } },
      },
    });
    if (!sel) return { ok: false, message: "Selection not found." };
    const portal = sel.requirement.portal;
    if (portal.status === "REVOKED" && input.decision !== "NOTE") return { ok: false, message: "This portal was revoked. You can still add notes." };
    if (sel.version !== input.expectedVersion) {
      return { ok: false, message: "The customer or another teammate changed this selection. Reload to see the latest version." };
    }

    const latest = sel.revisions[0] ?? null;
    if (input.decision !== "NOTE") {
      const step = transition(sel.status, { type: input.decision as Exclude<SelectionEventType, "SAVE_DRAFT" | "SUBMIT">, actor: "ADMIN" });
      if (!step.ok) return { ok: false, message: step.reason };
      const now = new Date();
      const updated = await tx.materialSelection.updateMany({
        where: { id: sel.id, version: input.expectedVersion },
        data: {
          status: step.status,
          version: { increment: 1 },
          approvedAt: step.status === "APPROVED" ? now : null,
        },
      });
      if (updated.count !== 1) return { ok: false, message: "This selection changed while you were reviewing it. Reload and try again." };
    }

    await tx.selectionReview.create({
      data: {
        selectionId: sel.id,
        revisionId: latest?.id ?? null,
        decision: rule.record,
        internalNote,
        customerFeedback,
        reviewerId: admin.id,
      },
    });
    await logActivity(
      {
        actorType: "ADMIN",
        actorId: admin.id,
        actorName: admin.name,
        action: rule.action,
        entityType: "MaterialSelection",
        entityId: sel.id,
        portalId: portal.id,
        metadata: { title: sel.requirement.title, ...(latest ? { revision: latest.revisionNumber } : {}) },
      },
      tx,
    );
    return { ok: true, message: rule.done, portalId: portal.id };
  });

  if (result.ok) {
    revalidatePath(`/admin/selections/${input.selectionId}`);
    revalidatePath("/admin/selections");
    if (result.portalId) revalidatePath(`/admin/portals/${result.portalId}`);
    revalidatePath("/admin");
  }
  return { ok: result.ok, message: result.message };
}
