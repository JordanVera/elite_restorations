/**
 * Suggested Jobber quote template names. Edit these strings to match the
 * live "UPDATED -" templates. They are suggestions for the office email only.
 */
export const JOBBER_TEMPLATES = {
  kitchen: "UPDATED - Kitchen Remodel Template",
  cabinetry: "UPDATED - Kitchen Cabinetry",
  countertops: "UPDATED - Countertop and Backsplash",
  hardwood: "UPDATED - Hardwood",
  vinyl: "UPDATED - Vinyl-Laminate",
  tile: "UPDATED - Tile",
  bathFull: "UPDATED - Bath+Shower/Tub",
  bathShower: "UPDATED - Shower/Tub-only",
} as const;

export type QuantityUnit = "SF" | "LF" | "EA" | "SQ" | "ft";

export type QuantityLine = {
  room: string;
  trade: string;
  template: string;
  item: string;
  quantity: string;
  unit: QuantityUnit;
  notes: string;
  optional: boolean;
};

type MeasureBag = Record<string, string>;

export function parseFirstNumber(value: string): number | null {
  const match = value.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const number = Number(match[0]);
  return Number.isFinite(number) ? number : null;
}

/** Feet, or feet plus inches such as "11 ft 6 in". */
export function parseFeet(value: string): number | null {
  const feet = value.match(/(\d+(?:\.\d+)?)\s*(?:ft|feet|')/i);
  const inches = value.match(/(\d+(?:\.\d+)?)\s*(?:in|inch|inches|")/i);
  if (feet || inches) {
    return (feet ? Number(feet[1]) : 0) + (inches ? Number(inches[1]) / 12 : 0);
  }
  return parseFirstNumber(value);
}

/** Counter depth is inches when the number is above 6 or the text says inches. */
export function parseDepthFeet(value: string): number | null {
  const number = parseFeet(value);
  if (number == null) return null;
  if (/in/i.test(value) || (parseFirstNumber(value) ?? 0) > 6) {
    const raw = parseFirstNumber(value);
    return raw == null ? null : raw / 12;
  }
  return number;
}

export function countertopSquareFeet(length: string, depth: string): number | null {
  const run = parseFeet(length);
  const deep = parseDepthFeet(depth);
  if (run == null || deep == null) return null;
  return Math.round(run * deep * 10) / 10;
}

/** Wall area from the room size: two lengths and two widths, times the ceiling height. */
export function wallSquareFeet(length: string, width: string, height: string): number | null {
  const l = parseFeet(length);
  const w = parseFeet(width);
  const h = parseFeet(height);
  if (l == null || w == null || h == null) return null;
  return Math.round(2 * (l + w) * h);
}

export function floorSquareFeet(explicit: string, length: string, width: string): { value: number; estimated: boolean } | null {
  const given = parseFirstNumber(explicit);
  if (given != null && explicit.trim()) return { value: given, estimated: false };
  const l = parseFeet(length);
  const w = parseFeet(width);
  if (l == null || w == null) return null;
  return { value: Math.round(l * w * 10) / 10, estimated: true };
}

/** Staff-only flag. A ceiling from 11 ft through 14 ft. */
export function isHighCeiling(value: string): boolean {
  const feet = parseFeet(value);
  return feet != null && feet >= 11 && feet <= 14;
}

export function suggestedTemplates(trades: readonly string[], measures: MeasureBag): string[] {
  const names: string[] = [];
  const add = (name: string) => {
    if (!names.includes(name)) names.push(name);
  };
  if (trades.includes("kitchen")) add(JOBBER_TEMPLATES.kitchen);
  if (trades.includes("cabinetry") || trades.includes("kitchen")) add(JOBBER_TEMPLATES.cabinetry);
  if (trades.includes("countertops") || trades.includes("kitchen")) add(JOBBER_TEMPLATES.countertops);
  if (trades.includes("flooring") || trades.includes("tile") || measures.flooringIncluded === "yes") {
    const next = measures.floorNew;
    if (next === "hardwood-floating" || next === "hardwood-glue" || next === "hardwood-solid") add(JOBBER_TEMPLATES.hardwood);
    else if (next === "vinyl-laminate") add(JOBBER_TEMPLATES.vinyl);
    else if (next === "tile-standard" || next === "tile-large" || trades.includes("tile")) add(JOBBER_TEMPLATES.tile);
  }
  if (trades.includes("bathroom")) {
    add(measures.bathScope === "shower-only" ? JOBBER_TEMPLATES.bathShower : JOBBER_TEMPLATES.bathFull);
  }
  return names;
}

function line(
  room: string,
  trade: string,
  template: string,
  item: string,
  quantity: string,
  unit: QuantityUnit,
  notes = "",
  optional = false,
): QuantityLine {
  return { room, trade, template, item, quantity, unit, notes, optional };
}

export function roomQuantities(
  roomName: string,
  trades: readonly string[],
  measures: MeasureBag,
  propertyStories: string,
): QuantityLine[] {
  const templates = suggestedTemplates(trades, measures);
  const template = templates[0] ?? "";
  const rows: QuantityLine[] = [];
  const add = (trade: string, item: string, quantity: string, unit: QuantityUnit, notes = "", optional = false) => {
    if (!quantity.trim()) return;
    rows.push(line(roomName, trade, templates.find((name) => name.toLowerCase().includes(trade.toLowerCase().slice(0, 4))) ?? template, item, quantity.trim(), unit, notes, optional));
  };
  const number = (key: string) => measures[key]?.trim() ?? "";

  add("Room", "Length", number("lengthFt"), "ft");
  add("Room", "Width", number("widthFt"), "ft");
  add("Room", "Ceiling height", number("ceilingFt"), "ft", isHighCeiling(number("ceilingFt")) ? "High walls" : "");

  const floorArea = floorSquareFeet(number("floorSf"), number("lengthFt"), number("widthFt"));
  if ((trades.includes("flooring") || trades.includes("tile") || measures.flooringIncluded === "yes") && floorArea) {
    add("Flooring", "Floor area", String(floorArea.value), "SF", floorArea.estimated ? "Estimated from room length and width" : "");
  }
  add("Flooring", "Stair steps", number("stairSteps"), "EA");
  add("Flooring", "Baseboard", number("baseboardLf"), "LF");
  add("Flooring", "Quarter round", number("quarterRoundLf"), "LF");
  add("Flooring", "T-shaped transition strip", number("tMoldLf"), "LF", "Transition strip at a doorway");
  add("Flooring", "Reducer transition strip", number("reducerLf"), "LF", "Transition strip at a doorway");
  add("Tile", "Floor tile", number("floorTileSf"), "SF");

  add("Cabinetry", "Base cabinets", number("baseCabinetLf"), "LF");
  add("Cabinetry", "Upper cabinets", number("upperCabinetLf"), "LF");

  const counterSf = number("countertopSf") || (countertopSquareFeet(number("countertopLf"), number("countertopDepth"))?.toString() ?? "");
  const counterEstimated = !number("countertopSf") && Boolean(counterSf);
  add("Countertops", "Countertop length", number("countertopLf"), "LF");
  add("Countertops", "Countertop area", counterSf, "SF", counterEstimated ? "Estimated from length and depth" : "");
  add("Countertops", "Sink cutouts", number("sinkCutouts"), "EA");
  add("Countertops", "Backsplash", number("backsplashSf"), "SF");

  const walls = number("wallSf") || (wallSquareFeet(number("lengthFt"), number("widthFt"), number("ceilingFt"))?.toString() ?? "");
  if (trades.includes("paint") && walls) {
    add("Paint", "Wall area", walls, "SF", number("wallSf") ? "" : "Estimated from room length, width, and ceiling height");
  }
  add("Paint", "Doors", number("doorCount"), "EA");
  add("Paint", "Windows and trim", number("windowTrimCount"), "EA");
  add("Paint", "Drywall patches", number("patchCount"), "EA", number("patchSizes"));
  add("Paint", "Crown molding", number("crownLf"), "LF");

  add("Roofing", "Squares", number("squares"), "SQ");
  add("Roofing", "Gutters", number("guttersLf"), "LF");
  add("Roofing", "Ridge", number("ridgeLf"), "LF");
  add("Roofing", "Valleys", number("valleyLf"), "LF");
  add("Roofing", "Skylights", number("skylightCount"), "EA");
  add("Roofing", "Vents", number("ventCount"), "EA");
  if (trades.includes("roofing")) {
    const stories = measures.roofSeparate === "yes" && number("roofStories") ? number("roofStories") : propertyStories;
    if (stories) add("Roofing", "Stories", stories, "EA", measures.roofSeparate === "yes" ? "Separate structure" : "From the property");
  }

  add("Water", "Damaged wall height", number("wallHeight"), "ft");
  add("Fence", "Fence", number("fenceLf"), "LF");
  add("Fence", "Gates", number("gateCount"), "EA");
  add("Fence", "Deck length", number("deckLengthFt"), "ft");
  add("Fence", "Deck width", number("deckWidthFt"), "ft");

  return rows.filter((row) => relevantTrade(row.trade, trades, measures));
}

function relevantTrade(trade: string, trades: readonly string[], measures: MeasureBag) {
  if (trade === "Room") return true;
  if (trade === "Flooring") return trades.includes("flooring") || trades.includes("tile") || measures.flooringIncluded === "yes";
  if (trade === "Tile") return trades.includes("tile") || trades.includes("bathroom") || trades.includes("flooring");
  if (trade === "Cabinetry") return trades.includes("cabinetry") || trades.includes("kitchen");
  if (trade === "Countertops") return trades.includes("countertops") || trades.includes("kitchen");
  if (trade === "Paint") return trades.includes("paint");
  if (trade === "Roofing") return trades.includes("roofing");
  if (trade === "Water") return trades.includes("water") || trades.includes("fire");
  if (trade === "Fence") return trades.includes("fence");
  return true;
}
