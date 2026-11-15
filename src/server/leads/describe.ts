import "server-only";

import { claimAnswers, contactMethods, leadServices, optionLabel } from "@/lib/inquiry";
import type { DeliverableLead } from "@/server/leads/types";

const label = optionLabel;

type DescribeOptions = {
  /** When set, photo URLs are omitted and a short attachment note is used instead. */
  photosAttached?: number;
};

/** Plain-text summary of a lead, used for the email body and webhook consumers. */
export function describeLead(lead: DeliverableLead, options?: DescribeOptions): string {
  const lines: string[] = [`Name: ${lead.name}`, `Phone: ${lead.phone}`, `Email: ${lead.email || "Not provided"}`];

  if (lead.path === "estimate") {
    lines.push(
      `Service: ${label(leadServices, lead.service)}`,
      `Insurance claim: ${label(claimAnswers, lead.claim)}`,
    );
    if (lead.carrier) lines.push(`Insurance carrier: ${lead.carrier}`);
    lines.push(
      `Address or ZIP: ${lead.address}`,
      `Preferred contact: ${label(contactMethods, lead.contactMethod)}`,
    );
  } else {
    lines.push(
      `Company: ${lead.company}`,
      `Preferred contact: ${label(contactMethods, lead.contactMethod)}`,
    );
  }

  if (lead.message) lines.push("", lead.message);

  if (options?.photosAttached && options.photosAttached > 0) {
    lines.push("", `${options.photosAttached} photo(s) attached to this email.`);
  } else if (lead.photos.length > 0) {
    lines.push("", "Photos:", ...lead.photos.map((p) => p.url));
  }
  if (lead.photosMissing > 0) {
    lines.push("", `${lead.photosMissing} photo(s) were attached but could not be saved.`);
  }

  const source = sourceLines(lead);
  if (source.length > 0) lines.push("", ...source);

  return lines.join("\n");
}

function sourceLines(lead: DeliverableLead): string[] {
  const lines: string[] = [];
  if (lead.pageUrl) lines.push(`Page: ${lead.pageUrl}`);
  if (lead.referrer) lines.push(`Referrer: ${lead.referrer}`);
  if (lead.utmSource) lines.push(`UTM source: ${lead.utmSource}`);
  if (lead.utmMedium) lines.push(`UTM medium: ${lead.utmMedium}`);
  if (lead.utmCampaign) lines.push(`UTM campaign: ${lead.utmCampaign}`);
  if (lead.utmTerm) lines.push(`UTM term: ${lead.utmTerm}`);
  if (lead.utmContent) lines.push(`UTM content: ${lead.utmContent}`);
  return lines;
}
