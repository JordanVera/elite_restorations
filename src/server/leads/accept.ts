import "server-only";

import { ingestLeadToJobber } from "@/server/jobber/sync";
import { jobberLeadFromInbound, type InboundLead } from "@/server/leads/inbound-lead";
import { ingestOnce, type LeadIngestStatus } from "@/server/leads/dedupe";
import { blobDedupeStore } from "@/server/leads/dedupe-blob";
import { isMissingPrivateBlob } from "@/server/private-blob";

export async function acceptInboundLead(lead: InboundLead): Promise<LeadIngestStatus> {
  try {
    return await ingestOnce(blobDedupeStore(), lead.externalId, async () => {
      const result = await ingestLeadToJobber(jobberLeadFromInbound(lead));
      if (result.status === "skipped") return "failed";
      return result.status;
    });
  } catch (error) {
    if (isMissingPrivateBlob(error)) return "not-configured";
    throw error;
  }
}
