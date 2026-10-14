import { z } from "zod";

import { imageManifest } from "@/lib/image-manifest";

const photoSchema = z.object({
  publicPath: z.string().optional(),
  sourceUrl: z.string().optional(),
  roomHint: z.enum(["kitchen", "bathroom"]).optional(),
});

const listingSchema = z.object({
  addressLine: z.string().min(1),
  unit: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(2).max(2),
  postalCode: z.string().min(5),
  closedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  exactSalePrice: z.number().int().positive().nullable().optional(),
  askingPrice: z.number().int().positive().nullable().optional(),
  priceRangeLow: z.number().int().positive().nullable().optional(),
  priceRangeHigh: z.number().int().positive().nullable().optional(),
  propertyType: z.string().default("single_family"),
  mlsId: z.string().optional(),
  sourceUrl: z.string().optional(),
  yearBuilt: z.number().int().optional(),
  sqft: z.number().int().optional(),
  bedrooms: z.number().int().optional(),
  bathrooms: z.number().optional(),
  description: z.string().optional(),
  photos: z.array(photoSchema).default([]),
});

export const importDocumentSchema = z.object({
  listings: z.array(listingSchema).min(1).max(100),
});

export type ImportedListing = z.infer<typeof listingSchema>;

export function parseImportJson(raw: unknown) {
  return importDocumentSchema.parse(raw);
}

export function parseImportCsv(text: string) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error("The CSV needs a header row and at least one listing.");
  const headers = splitCsv(lines[0]).map((header) => header.trim());
  const listings = lines.slice(1).map((line) => {
    const cells = splitCsv(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
    const photos = (row.photo_paths ?? "")
      .split("|")
      .map((path) => path.trim())
      .filter(Boolean)
      .map((publicPath) => ({ publicPath }));
    return listingSchema.parse({
      addressLine: row.address,
      unit: row.unit || undefined,
      city: row.city,
      state: row.state,
      postalCode: row.zip,
      closedDate: row.closed_date,
      exactSalePrice: numberOrNull(row.exact_sale_price),
      askingPrice: numberOrNull(row.asking_price),
      priceRangeLow: numberOrNull(row.price_low),
      priceRangeHigh: numberOrNull(row.price_high),
      propertyType: row.property_type || "single_family",
      mlsId: row.mls_id || undefined,
      sourceUrl: row.source_url || undefined,
      photos,
    });
  });
  return { listings };
}

function numberOrNull(value: string | undefined) {
  if (!value?.trim()) return null;
  const parsed = Number(value.replace(/[$,]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function splitCsv(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (const char of line) {
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      cells.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  cells.push(current);
  return cells;
}

export function assertCompanyPhoto(publicPath: string) {
  if (!publicPath.startsWith("/images/projects/")) {
    throw new Error("Imported site photos must be company project images under /images/projects/.");
  }
  if (!imageManifest[publicPath]) throw new Error(`Unknown project image: ${publicPath}`);
  return publicPath;
}
