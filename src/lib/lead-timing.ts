/** Fastest a person can realistically complete the form. Blocks instant bot posts. */
export const MIN_SUBMIT_MS = 2_000;

/** Discard a tab that has been open longer than a day. */
export const MAX_SUBMIT_MS = 24 * 60 * 60 * 1000;

const CLOCK_SKEW_MS = 60_000;

export type SubmitTiming = "ok" | "too-fast" | "expired";

export function submitTiming(startedAt: number, now = Date.now()): SubmitTiming {
  if (!Number.isFinite(startedAt)) return "expired";
  const elapsed = now - startedAt;
  if (elapsed < -CLOCK_SKEW_MS || elapsed > MAX_SUBMIT_MS) return "expired";
  if (elapsed < MIN_SUBMIT_MS) return "too-fast";
  return "ok";
}
