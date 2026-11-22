import type { SelectionFieldKey } from "./fields";

/**
 * Default category templates. Keywords prefixed with "-" are exclusions:
 * a match lowers the score instead of raising it.
 */
export type CategoryTemplate = {
  slug: string;
  name: string;
  description: string;
  defaultInstructions: string;
  enabledFields: SelectionFieldKey[];
  keywords: string[];
};

const ALL: SelectionFieldKey[] = ["productName", "manufacturer", "modelSku", "color", "finish", "dimensions", "productUrls", "attachments"];

export const CATEGORY_TEMPLATES: CategoryTemplate[] = [
  {
    slug: "flooring",
    name: "Flooring",
    description: "LVP, laminate, hardwood, engineered wood, and carpet.",
    defaultInstructions:
      "Tell us the exact product you chose, including the color name and plank size. A photo of the box label or sample tag is the easiest way.",
    enabledFields: ALL,
    keywords: ["flooring", "floor", "lvp", "luxury vinyl", "vinyl plank", "laminate", "hardwood", "engineered hardwood", "engineered wood", "carpet", "carpet tile", "plank", "-floor tile", "-baseboard", "-subfloor"],
  },
  {
    slug: "countertops",
    name: "Countertops",
    description: "Quartz, quartzite, granite, marble, and solid surface tops.",
    defaultInstructions:
      "Share the slab name, material, and edge profile. If you picked a specific slab at the yard, include the slab or lot number and a photo.",
    enabledFields: ["productName", "manufacturer", "color", "finish", "productUrls", "attachments"],
    keywords: ["countertop", "counter top", "counter", "quartz", "quartzite", "granite", "marble", "solid surface", "butcher block", "vanity top", "slab"],
  },
  {
    slug: "backsplash",
    name: "Backsplash",
    description: "Kitchen and bar backsplash tile.",
    defaultInstructions: "Include the tile name, size, color, and the grout color if you have a preference.",
    enabledFields: ALL,
    keywords: ["backsplash", "back splash", "splash tile"],
  },
  {
    slug: "shower-tile",
    name: "Shower tile",
    description: "Shower walls, tub surrounds, niches, and accent tile.",
    defaultInstructions:
      "Include the tile name, size, color, and finish. If you want an accent or niche tile, add it in the notes.",
    enabledFields: ALL,
    keywords: ["shower tile", "shower wall", "tub surround", "surround tile", "surround", "wall tile", "niche", "subway tile", "-labor", "-install", "-installation"],
  },
  {
    slug: "bathroom-floor-tile",
    name: "Bathroom floor tile",
    description: "Bathroom and laundry floor tile.",
    defaultInstructions: "Include the tile name, size, color, and finish. Let us know your grout color preference in the notes.",
    enabledFields: ALL,
    keywords: ["bathroom floor tile", "bath floor tile", "floor tile", "porcelain floor", "shower floor", "-labor", "-installation"],
  },
  {
    slug: "paint-colors",
    name: "Paint colors",
    description: "Wall, ceiling, trim, and door colors.",
    defaultInstructions:
      "Give the paint brand, color name, and color code (for example Sherwin-Williams Agreeable Gray SW 7029). Note the sheen if you have a preference.",
    enabledFields: ["productName", "manufacturer", "color", "finish", "attachments"],
    keywords: ["paint", "painting", "repaint", "wall color", "primer", "stain", "-cabinet", "-paint grade"],
  },
  {
    slug: "plumbing-fixtures",
    name: "Plumbing fixtures",
    description: "Faucets, sinks, shower valves and trim, toilets, and tubs.",
    defaultInstructions:
      "List each fixture with its brand, model number, and finish. Product links make this much easier for us to order correctly.",
    enabledFields: ["productName", "manufacturer", "modelSku", "finish", "productUrls", "attachments"],
    keywords: ["plumbing fixture", "plumbing", "faucet", "sink", "shower valve", "valve", "shower trim", "rain head", "shower head", "showerhead", "toilet", "bathtub", "tub", "-tub surround", "-surround"],
  },
  {
    slug: "cabinet-finishes",
    name: "Cabinet finishes",
    description: "Cabinet and vanity door styles, colors, and stains.",
    defaultInstructions: "Tell us the door style, color or stain name, and the manufacturer's finish code if there is one.",
    enabledFields: ["productName", "manufacturer", "modelSku", "color", "finish", "productUrls", "attachments"],
    keywords: ["cabinet", "cabinetry", "cabinet refinish", "cabinet paint", "vanity", "-hardware", "-under cabinet", "-pull", "-knob"],
  },
  {
    slug: "cabinet-hardware",
    name: "Cabinet hardware",
    description: "Pulls, knobs, and hinges.",
    defaultInstructions: "List the pull and knob styles with their size (center-to-center) and finish.",
    enabledFields: ["productName", "manufacturer", "modelSku", "finish", "dimensions", "productUrls", "attachments"],
    keywords: ["cabinet hardware", "hardware", "pull", "knob", "hinge", "-door hardware"],
  },
  {
    slug: "lighting-fixtures",
    name: "Lighting fixtures",
    description: "Pendants, chandeliers, sconces, vanity lights, and fans.",
    defaultInstructions: "List each light with the brand, model, and finish. Include links so we can confirm size and mounting.",
    enabledFields: ["productName", "manufacturer", "modelSku", "finish", "dimensions", "productUrls", "attachments"],
    keywords: ["lighting", "light fixture", "light", "pendant", "chandelier", "sconce", "vanity light", "can light", "recessed", "ceiling fan", "fan"],
  },
  {
    slug: "doors",
    name: "Doors",
    description: "Interior and exterior doors and door hardware.",
    defaultInstructions: "Include the door style, material, and the hardware finish. Note any handing or size requirements.",
    enabledFields: ["productName", "manufacturer", "modelSku", "color", "finish", "dimensions", "productUrls", "attachments"],
    keywords: ["door", "interior door", "exterior door", "entry door", "prehung", "door slab", "door hardware", "-paint", "-cabinet door", "-shower door"],
  },
  {
    slug: "other",
    name: "Other",
    description: "Anything else the customer needs to choose.",
    defaultInstructions: "Describe what you chose and add a link or photo if you have one.",
    enabledFields: ["productName", "manufacturer", "modelSku", "color", "finish", "productUrls", "attachments"],
    keywords: ["mirror", "accessories", "towel bar", "shower door", "shower glass", "appliance", "shelving", "closet"],
  },
];

export function splitKeywords(keywords: readonly string[]): { include: string[]; exclude: string[] } {
  const include: string[] = [];
  const exclude: string[] = [];
  for (const raw of keywords) {
    const keyword = raw.trim();
    if (!keyword) continue;
    if (keyword.startsWith("-")) {
      const term = keyword.slice(1).trim();
      if (term) exclude.push(term);
    } else include.push(keyword);
  }
  return { include, exclude };
}

export function joinKeywords(include: readonly string[], exclude: readonly string[]): string[] {
  const clean = (list: readonly string[]) =>
    [...new Set(list.map((k) => k.trim().toLowerCase().replace(/^-+/, "")).filter(Boolean))].slice(0, 60);
  return [...clean(include), ...clean(exclude).map((k) => `-${k}`)];
}
