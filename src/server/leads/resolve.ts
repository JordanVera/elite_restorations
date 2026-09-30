import "server-only";

import type { Lead } from "@/lib/inquiry-schema";
import { getPhotoStore, type SignedPhoto } from "@/server/leads/photos";
import type { DeliverableLead } from "@/server/leads/types";

export async function resolveLead(lead: Lead): Promise<DeliverableLead> {
  const references = lead.photos;
  const rest: Record<string, unknown> = { ...lead };
  delete rest.photos;
  delete rest.website;
  const store = getPhotoStore();

  const signed: SignedPhoto[] = [];
  if (store) {
    const results = await Promise.allSettled(references.map((pathname) => store.sign(pathname)));
    for (const result of results) {
      if (result.status === "fulfilled") signed.push(result.value);
    }
  }

  return { ...rest, photos: signed, photosMissing: references.length - signed.length } as DeliverableLead;
}
