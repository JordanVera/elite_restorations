import "server-only";

import { createPrivateText, deletePrivateText, readPrivateText } from "@/server/private-blob";
import { dedupePath, type LeadDedupeStore } from "@/server/leads/dedupe";

export function blobDedupeStore(): LeadDedupeStore {
  return {
    async claim(externalId) {
      const pathname = dedupePath(externalId);
      const body = JSON.stringify({ externalId: externalId.trim(), at: new Date().toISOString() });
      try {
        await createPrivateText(pathname, body);
        return "claimed";
      } catch (error) {
        const existing = await readPrivateText(pathname).catch(() => null);
        if (existing) return "duplicate";
        throw error;
      }
    },
    async release(externalId) {
      await deletePrivateText(dedupePath(externalId));
    },
  };
}
