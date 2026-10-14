export type BudgetState = {
  capCents: number;
  reservedCents: number;
  recordedCents: number;
};

export type ReservationDecision =
  | { ok: true; reservedCents: number }
  | { ok: false; reason: string };

/** In-flight reservations count toward the cap. Recorded usage is tracked separately. */
export function reserveAgainstCap(state: BudgetState, requestCents: number): ReservationDecision {
  if (requestCents < 0) return { ok: false, reason: "A reservation cannot be negative." };
  const next = state.reservedCents + requestCents;
  if (next > state.capCents) {
    return {
      ok: false,
      reason: `This step would reserve ${next} cents against a ${state.capCents} cent cap. ${state.reservedCents} cents are already reserved or in flight.`,
    };
  }
  return { ok: true, reservedCents: next };
}

export function estimateRunCost(input: {
  targetHomes: number;
  roomsPerHome: number;
  tiers: number;
  analysisCents: number;
  editCents: number;
}) {
  const edits = input.targetHomes * input.roomsPerHome * input.tiers;
  const analysis = input.targetHomes * input.roomsPerHome * input.analysisCents;
  const generation = edits * input.editCents;
  return {
    conceptImages: edits,
    estimatedCents: analysis + generation,
    note: `${input.targetHomes} homes × ${input.roomsPerHome} rooms × ${input.tiers} tiers = ${edits} concept images, plus room analysis. This is an estimate, not recorded usage.`,
  };
}

const EDIT_CENTS: Record<string, number> = { low: 4, medium: 8, high: 16 };
const ANALYSIS_CENTS = 2;

export function estimateFromSettings(settings: { targetCount: number; rooms: string; imageQuality: string; maxSpendCents: number }) {
  const roomsPerHome = settings.rooms === "both" ? 2 : 1;
  return {
    ...estimateRunCost({
      targetHomes: settings.targetCount,
      roomsPerHome,
      tiers: 3,
      analysisCents: ANALYSIS_CENTS,
      editCents: EDIT_CENTS[settings.imageQuality] ?? EDIT_CENTS.medium,
    }),
    capCents: settings.maxSpendCents,
  };
}

export type TaskRecovery = "retry" | "hold_uncertain" | "stop" | "already_done";

export function recoverTask(task: { status: string; attempt: number }, maxRetries: number): TaskRecovery {
  if (task.status === "succeeded" || task.status === "needs_review") return "already_done";
  if (task.status === "uncertain") return "hold_uncertain";
  if (task.status === "cancelled") return "stop";
  if (task.attempt > maxRetries) return "stop";
  return "retry";
}
