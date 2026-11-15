import "server-only";

import { leadServices, optionLabel } from "@/lib/inquiry";
import { describeLead } from "@/server/leads/describe";
import { syncEstimateToJobber, type JobberSyncResult } from "@/server/jobber/sync";
import type { DeliverableLead } from "@/server/leads/types";

export type { JobberSyncResult };

export type JobberIntake = {
  client: { firstName: string; lastName: string; email: string; phone: string };
  property: { street: string } | null;
  request: { title: string; details: string; photoUrls: string[] };
};

export function toJobberIntake(lead: DeliverableLead): JobberIntake {
  const [firstName = "", ...rest] = lead.name.split(/\s+/);
  return {
    client: { firstName, lastName: rest.join(" "), email: lead.email, phone: lead.phone },
    property: lead.path === "estimate" ? { street: lead.address } : null,
    request: {
      title:
        lead.path === "partner"
          ? "Website request: partner referral"
          : `Website request: ${optionLabel(leadServices, lead.service)}`,
      details: describeLead(lead),
      photoUrls: lead.photos.map((p) => p.url),
    },
  };
}

/**
 * Creates a Jobber client and request for an estimate. Failures stay inside
 * this function so email delivery and the visitor response are unchanged.
 */
export async function syncLeadToJobber(lead: DeliverableLead): Promise<JobberSyncResult> {
  return syncEstimateToJobber(lead);
}
