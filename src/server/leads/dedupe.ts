import { createHash } from "node:crypto";

export type LeadIngestStatus = "created" | "duplicate" | "failed" | "not-configured";

export type LeadDedupeStore = {
  claim(externalId: string): Promise<"claimed" | "duplicate">;
  release(externalId: string): Promise<void>;
};

/** Private-blob path for one external id. The id itself is not part of the path. */
export function dedupePath(externalId: string): string {
  const id = externalId.trim();
  const hash = createHash("sha256").update(id).digest("hex");
  return `leads/dedupe/${hash}.json`;
}

/**
 * One external id creates at most one Jobber request.
 * A failed create releases the claim so a later delivery can try again.
 */
export async function ingestOnce(
  store: LeadDedupeStore,
  externalId: string,
  create: () => Promise<Exclude<LeadIngestStatus, "duplicate">>,
): Promise<LeadIngestStatus> {
  const claim = await store.claim(externalId);
  if (claim === "duplicate") return "duplicate";
  try {
    const result = await create();
    if (result !== "created") await store.release(externalId);
    return result;
  } catch (error) {
    await store.release(externalId).catch(() => undefined);
    throw error;
  }
}

export function memoryDedupeStore(): LeadDedupeStore {
  const held = new Set<string>();
  return {
    async claim(externalId) {
      const key = externalId.trim();
      if (held.has(key)) return "duplicate";
      held.add(key);
      return "claimed";
    },
    async release(externalId) {
      held.delete(externalId.trim());
    },
  };
}
