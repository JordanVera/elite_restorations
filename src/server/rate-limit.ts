import "server-only";

const WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_MAX_HITS = 5;

const hits = new Map<string, number[]>();

type RateLimitOptions = { max?: number; now?: number };

/**
 * Best-effort, per-instance limiter. It slows down casual abuse; it is not a
 * substitute for a shared store (e.g. Redis) or platform-level bot protection.
 */
export function isRateLimited(key: string, { max = DEFAULT_MAX_HITS, now = Date.now() }: RateLimitOptions = {}) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}
