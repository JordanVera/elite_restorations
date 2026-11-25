/** A long form can sit open for days. Instant posts are still dropped. */

export const MIN_SUBMIT_MS = 3_000;
export const MAX_SUBMIT_MS = 14 * 24 * 60 * 60 * 1000;
const CLOCK_SKEW_MS = 60_000;

export type EstimateTiming = "ok" | "too-fast" | "expired";

export function estimateTiming(startedAt: number, now = Date.now()): EstimateTiming {
  if (!Number.isFinite(startedAt)) return "expired";
  const elapsed = now - startedAt;
  if (elapsed < -CLOCK_SKEW_MS || elapsed > MAX_SUBMIT_MS) return "expired";
  if (elapsed < MIN_SUBMIT_MS) return "too-fast";
  return "ok";
}
