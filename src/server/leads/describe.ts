import "server-only";

import { incidents, insurerAnswers, rooms, timelines } from "@/lib/inquiry";
import type { DeliverableLead } from "@/server/leads/types";

const label = (list: readonly { value: string; label: string }[], value: string) =>
  list.find((o) => o.value === value)?.label ?? value;

/** Plain-text summary of a lead, used for webhook consumers and the future Jobber request. */
export function describeLead(lead: DeliverableLead): string {
  const lines: string[] = [];

  if (lead.path === "remodel") {
    lines.push(`Remodel: ${label(rooms, lead.room)}`, `Timeline: ${label(timelines, lead.timeline)}`);
    if (lead.staying) lines.push(`Staying: ${lead.staying}`);
  } else {
    lines.push(
      `Recovery: ${label(incidents, lead.incident)}`,
      `Water still coming in: ${lead.waterActive === "yes" ? "Yes" : "No"}`,
      `Insurance claim: ${label(insurerAnswers, lead.insurer)}`,
      `Address: ${lead.address}`,
    );
  }

  if (lead.message) lines.push("", lead.message);

  if (lead.photos.length > 0) {
    lines.push("", "Photos:", ...lead.photos.map((p) => p.url));
  }
  if (lead.photosMissing > 0) {
    lines.push("", `${lead.photosMissing} photo(s) were attached but could not be saved.`);
  }

  return lines.join("\n");
}
