import "server-only";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { priceLabel, type PriceFields } from "@/server/opportunities/pricing";
import type { loadRun } from "@/server/opportunities/repository";

type RunRecord = NonNullable<Awaited<ReturnType<typeof loadRun>>>;

export function propertyCsv(run: RunRecord) {
  const header = [
    "address",
    "city",
    "state",
    "zip",
    "status",
    "exact_sale_price",
    "asking_price",
    "price_range_low",
    "price_range_high",
    "estimated_value",
    "closed_date",
    "score",
    "source",
    "source_url",
    "qualifying_rooms",
    "exclusion_reason",
  ];
  const lines = run.listings.map((listing) =>
    [
      listing.addressLine,
      listing.city,
      listing.state,
      listing.postalCode,
      listing.status,
      listing.exactSalePrice ?? "",
      listing.askingPrice ?? "",
      listing.priceRangeLow ?? "",
      listing.priceRangeHigh ?? "",
      listing.estimatedValue ?? "",
      listing.closedDate ?? "",
      listing.opportunityScore ?? "",
      listing.provider,
      listing.sourceUrl ?? "",
      listing.rooms.filter((room) => room.includeInConcepts).length,
      listing.exclusionReason ?? listing.reviewReason ?? "",
    ]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(","),
  );
  return [header.join(","), ...lines].join("\n");
}

export async function propertyPdf(run: RunRecord) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  let page = doc.addPage([612, 792]);
  let y = 750;
  const write = (text: string, size = 11, strong = false) => {
    const used = strong ? bold : font;
    for (const line of wrap(text, 90)) {
      if (y < 60) {
        page = doc.addPage([612, 792]);
        y = 750;
      }
      page.drawText(line, { x: 48, y, size, font: used, color: rgb(0.1, 0.1, 0.1) });
      y -= size + 6;
    }
  };
  write(run.origin === "demo" ? "DEMO REPORT — not discovered listings" : "Renovation opportunity report", 16, true);
  write(run.partial ? "Partial report. Some requested concepts are missing." : "Complete for the homes that qualified.");
  write("Generated images are AI renovation concepts, not the home’s current condition and not construction documents.");
  write(`Sold window in America/Chicago: ${run.chicagoStart} to ${run.chicagoEnd}.`);
  if (run.shortfallNote) write(run.shortfallNote);
  for (const listing of run.listings.filter((item) => item.selected || item.status === "excluded" || item.status === "review")) {
    y -= 8;
    write(`${listing.rank ? `${listing.rank}. ` : ""}${listing.addressLine}, ${listing.city}, ${listing.state} ${listing.postalCode}`, 13, true);
    write(priceLabel(listing as PriceFields));
    write(`Closed date: ${listing.closedDate ?? "unverified"} · Source: ${listing.provider}${listing.sourceUrl ? ` · ${listing.sourceUrl}` : ""}`);
    write(listing.attribution ?? "");
    if (listing.scoreExplanation) write(listing.scoreExplanation);
    if (listing.exclusionReason || listing.reviewReason) write(listing.exclusionReason ?? listing.reviewReason ?? "");
    for (const room of listing.rooms) {
      write(`${room.label}: ${room.decision ?? "unassessed"} · confidence ${room.confidence ?? "n/a"}`, 11, true);
      if (room.explanation) write(room.explanation);
      for (const concept of room.concepts) {
        const summary = concept.scopeSummary as { tier?: string; retained?: string; proposed?: string; materials?: string; planningBudget?: string };
        write(`${summary.tier ?? concept.tier} concept · check ${concept.checkStatus}. ${summary.proposed ?? ""}`);
        write(`Retained: ${summary.retained ?? ""} Materials: ${summary.materials ?? ""} Budget: ${summary.planningBudget ?? "Site visit required"}`);
      }
    }
  }
  return Buffer.from(await doc.save());
}

function wrap(text: string, width: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > width) {
      if (current) lines.push(current);
      current = word;
    } else current = next;
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}
