import { z } from "zod";

import { site } from "@/lib/site";

export const HOUSTON_CITIES = [...site.serviceArea] as string[];

export const soldPresets = ["7", "14", "30", "60", "90", "custom"] as const;
export const reportSizes = [10, 15, 20] as const;
export const roomScopes = ["kitchen", "bathrooms", "both"] as const;
export const priceBases = ["exact", "range", "asking"] as const;
export const exclusionModes = ["strict_property", "room_opportunity"] as const;
export const runModes = ["automatic", "review"] as const;
export const imageQualities = ["low", "medium", "high"] as const;

const tierBand = z.object({
  label: z.string().min(1),
  scope: z.string().min(1),
  materials: z.string().min(1),
});

const tierDefaults = {
  low: {
    label: "Refresh",
    scope: "Preserve the layout and service locations. Paint or refinish where plausible, and update hardware, lighting, mirrors, and fixtures. Limit surface upgrades.",
    materials: "Paint, refinished wood, new hardware, updated lighting, and limited surface replacements.",
  },
  medium: {
    label: "Remodel",
    scope: "Preserve the footprint and major service locations. Replace cabinets or the vanity, countertops, backsplash, flooring, and shower or tub finishes with coordinated attainable materials.",
    materials: "Stock or semi-custom cabinets, quartz or durable solid surface, porcelain tile, and coordinated fixtures.",
  },
  high: {
    label: "Premium",
    scope: "Use premium cabinetry, finishes, lighting, fixtures, and detailing within the existing room geometry. Do not remove walls, enlarge the room, add windows, or relocate plumbing.",
    materials: "Inset or custom cabinetry, premium stone, detailed tile, and higher-grade lighting and fixtures.",
  },
};

const geographyDefault = {
  cities: [...HOUSTON_CITIES],
  zips: [] as string[],
  radiusMiles: null,
  address: null,
  latitude: null,
  longitude: null,
};

export const runSettingsSchema = z.object({
  geography: z
    .object({
      cities: z.array(z.string()).default([...HOUSTON_CITIES]),
      zips: z.array(z.string()).default([]),
      radiusMiles: z.number().positive().max(100).nullable().default(null),
      address: z.string().nullable().default(null),
      latitude: z.number().nullable().default(null),
      longitude: z.number().nullable().default(null),
    })
    .default(geographyDefault),
  soldPreset: z.enum(soldPresets).default("30"),
  customStart: z.string().nullable().default(null),
  customEnd: z.string().nullable().default(null),
  minPrice: z.number().int().nonnegative().nullable().default(null),
  maxPrice: z.number().int().nonnegative().nullable().default(null),
  priceBasis: z.enum(priceBases).default("exact"),
  allowUnknownPrice: z.boolean().default(false),
  propertyType: z.enum(["single_family", "condo", "townhouse", "any_residential"]).default("single_family"),
  yearBuiltMin: z.number().int().nullable().default(null),
  yearBuiltMax: z.number().int().nullable().default(null),
  sqftMin: z.number().int().nullable().default(null),
  sqftMax: z.number().int().nullable().default(null),
  bedsMin: z.number().int().nullable().default(null),
  bathsMin: z.number().nullable().default(null),
  targetCount: z.union([z.literal(10), z.literal(15), z.literal(20)]).default(15),
  rooms: z.enum(roomScopes).default("both"),
  minOutdatedScore: z.number().min(0).max(1).default(0.62),
  minConfidence: z.number().min(0).max(1).default(0.55),
  maxCandidates: z.number().int().min(1).max(500).default(80),
  maxPhotos: z.number().int().min(1).max(2000).default(240),
  maxRoomsPerProperty: z.number().int().min(1).max(8).default(4),
  maxImagesPerProperty: z.number().int().min(1).max(24).default(12),
  styles: z.array(z.string()).default(["warm transitional"]),
  tiers: z
    .object({
      low: tierBand.default(tierDefaults.low),
      medium: tierBand.default(tierDefaults.medium),
      high: tierBand.default(tierDefaults.high),
    })
    .default(tierDefaults),
  maxSpendCents: z.number().int().positive().default(2500),
  imageQuality: z.enum(imageQualities).default("medium"),
  mode: z.enum(runModes).default("review"),
  exclusionMode: z.enum(exclusionModes).default("strict_property"),
  allowLayoutChanges: z.boolean().default(false),
  maxRetries: z.number().int().min(0).max(2).default(1),
  rankWeights: z
    .object({
      opportunity: z.number().positive().default(0.4),
      evidence: z.number().positive().default(0.25),
      recency: z.number().positive().default(0.15),
      filterFit: z.number().positive().default(0.1),
      roomCount: z.number().positive().default(0.1),
    })
    .default({ opportunity: 0.4, evidence: 0.25, recency: 0.15, filterFit: 0.1, roomCount: 0.1 }),
});

export type RunSettings = z.infer<typeof runSettingsSchema>;

export function defaultSettings(): RunSettings {
  return runSettingsSchema.parse({});
}

export function chicagoDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function addDays(isoDate: string, days: number) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));
  utc.setUTCDate(utc.getUTCDate() + days);
  return utc.toISOString().slice(0, 10);
}

export function soldWindow(settings: RunSettings, now = new Date()) {
  const end = settings.soldPreset === "custom" && settings.customEnd ? settings.customEnd : chicagoDate(now);
  const start =
    settings.soldPreset === "custom" && settings.customStart
      ? settings.customStart
      : addDays(end, -Number(settings.soldPreset === "custom" ? 30 : settings.soldPreset));
  if (start > end) {
    throw new Error("The sold-date start is after the end.");
  }
  return { chicagoStart: start, chicagoEnd: end };
}

export const PROMPT_VERSION = "opportunity-v1";

export const BASE_EDIT_PROMPT =
  "Edit the supplied photograph of this exact room into the specified renovation concept. Preserve the original camera angle, perspective, room boundaries, windows, doors, and apparent dimensions. Change only the elements allowed by the renovation scope. Produce a photorealistic, physically plausible remodeling visualization. Do not enlarge the room or invent architectural features. Follow the selected tier’s scope and material constraints.";
