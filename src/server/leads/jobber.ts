import "server-only";

import { describeLead } from "@/server/leads/describe";
import type { DeliverableLead } from "@/server/leads/types";

/**
 * Jobber hand-off, intentionally not connected.
 *
 * Nothing imports this module and no request is made. It records how a lead
 * maps onto Jobber so the sync can be switched on later without touching the
 * form, the schema or the webhook sink.
 *
 * Planned sequence once credentials exist:
 *   1. Find a client by email or phone, otherwise create one from `client`.
 *   2. For recovery leads, add `property` (the service address) to that client.
 *   3. Create a request titled `request.title` whose notes are `request.details`.
 *
 * Photo links in `request.details` expire (see PHOTO_LINK_TTL_MS in photos.ts),
 * so the sync should copy the images into Jobber rather than rely on the links.
 */
export type JobberIntake = {
  client: { firstName: string; lastName: string; email: string; phone: string };
  property: { street: string } | null;
  request: { title: string; details: string; photoUrls: string[] };
};

export type JobberSyncResult = { status: "not-configured" };

export function toJobberIntake(lead: DeliverableLead): JobberIntake {
  const [firstName = "", ...rest] = lead.name.split(/\s+/);
  return {
    client: { firstName, lastName: rest.join(" "), email: lead.email, phone: lead.phone },
    property: lead.path === "recovery" ? { street: lead.address } : null,
    request: {
      title: lead.path === "recovery" ? "Website request: water or storm damage" : "Website request: remodel",
      details: describeLead(lead),
      photoUrls: lead.photos.map((p) => p.url),
    },
  };
}

export async function syncLeadToJobber(lead: DeliverableLead): Promise<JobberSyncResult> {
  void toJobberIntake(lead);
  return { status: "not-configured" };
}
