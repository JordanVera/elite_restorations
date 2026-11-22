/** Material selection status rules. Pure, shared by the portal, admin, and tests. */

export const SELECTION_STATUSES = ["NOT_STARTED", "DRAFT", "SUBMITTED", "CHANGES_REQUESTED", "APPROVED"] as const;
export type SelectionStatus = (typeof SELECTION_STATUSES)[number];

export type SelectionEvent =
  | { type: "SAVE_DRAFT"; actor: "CUSTOMER" }
  | { type: "SUBMIT"; actor: "CUSTOMER" }
  | { type: "APPROVE"; actor: "ADMIN" }
  | { type: "REQUEST_CHANGES"; actor: "ADMIN" }
  | { type: "REOPEN"; actor: "ADMIN" };

export type SelectionEventType = SelectionEvent["type"];

const TRANSITIONS: Record<SelectionEventType, { actor: "CUSTOMER" | "ADMIN"; from: Partial<Record<SelectionStatus, SelectionStatus>> }> = {
  SAVE_DRAFT: {
    actor: "CUSTOMER",
    // Feedback stays visible while the customer edits a returned selection.
    from: { NOT_STARTED: "DRAFT", DRAFT: "DRAFT", CHANGES_REQUESTED: "CHANGES_REQUESTED" },
  },
  SUBMIT: {
    actor: "CUSTOMER",
    from: { NOT_STARTED: "SUBMITTED", DRAFT: "SUBMITTED", CHANGES_REQUESTED: "SUBMITTED" },
  },
  APPROVE: { actor: "ADMIN", from: { SUBMITTED: "APPROVED" } },
  REQUEST_CHANGES: { actor: "ADMIN", from: { SUBMITTED: "CHANGES_REQUESTED", APPROVED: "CHANGES_REQUESTED" } },
  REOPEN: { actor: "ADMIN", from: { SUBMITTED: "DRAFT", APPROVED: "DRAFT" } },
};

export type TransitionResult = { ok: true; status: SelectionStatus } | { ok: false; reason: string };

export function transition(status: SelectionStatus, event: SelectionEvent): TransitionResult {
  const rule = TRANSITIONS[event.type];
  if (rule.actor !== event.actor) return { ok: false, reason: `${event.actor.toLowerCase()} cannot ${event.type}` };
  const next = rule.from[status];
  if (!next) return { ok: false, reason: `Cannot ${event.type.toLowerCase().replace("_", " ")} a selection that is ${statusLabel(status).toLowerCase()}.` };
  return { ok: true, status: next };
}

/** The customer can change fields and attachments only in these states. */
export function customerCanEdit(status: SelectionStatus): boolean {
  return status === "NOT_STARTED" || status === "DRAFT" || status === "CHANGES_REQUESTED";
}

/** Counted toward "X of Y completed" on the portal. */
export function isComplete(status: SelectionStatus): boolean {
  return status === "SUBMITTED" || status === "APPROVED";
}

export function statusLabel(status: SelectionStatus): string {
  return {
    NOT_STARTED: "Not started",
    DRAFT: "Draft",
    SUBMITTED: "Submitted",
    CHANGES_REQUESTED: "Changes requested",
    APPROVED: "Approved",
  }[status];
}

export function statusTone(status: SelectionStatus): "neutral" | "info" | "warning" | "success" | "danger" {
  return ({
    NOT_STARTED: "neutral",
    DRAFT: "info",
    SUBMITTED: "warning",
    CHANGES_REQUESTED: "danger",
    APPROVED: "success",
  } as const)[status];
}

export function progress(statuses: SelectionStatus[]): { done: number; total: number; percent: number } {
  const total = statuses.length;
  const done = statuses.filter(isComplete).length;
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}
