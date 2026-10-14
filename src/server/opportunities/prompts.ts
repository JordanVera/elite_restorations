import { BASE_EDIT_PROMPT, type RunSettings } from "@/server/opportunities/settings";
import type { RoomAssessment } from "@/server/opportunities/vision";

export type TierKey = "low" | "medium" | "high";

export function visualBrief(assessment: RoomAssessment) {
  const notes = assessment.observations;
  return [
    `Room type: ${assessment.roomType}.`,
    `Cabinets or vanity: ${notes.cabinets}.`,
    `Counters: ${notes.counters}.`,
    `Tile, flooring, tub, shower, or surrounds: ${notes.surfaces}.`,
    `Lighting and plumbing fixtures: ${notes.fixtures}.`,
    `Visible wear: ${notes.wear}.`,
    `Possible recent updates: ${notes.recentUpdates}.`,
    `Photo limits: ${notes.photoQuality}.`,
  ].join(" ");
}

export function conceptPrompt(input: {
  assessment: RoomAssessment;
  tier: TierKey;
  settings: RunSettings;
  retained: string;
}) {
  const band = input.settings.tiers[input.tier];
  const layout = input.settings.allowLayoutChanges
    ? "A layout change is allowed only if it is labeled as requiring a feasibility review. Do not invent floor area."
    : "Do not remove walls, add windows, enlarge the room, or relocate plumbing.";
  return [
    BASE_EDIT_PROMPT,
    `Tier: ${band.label}.`,
    `Scope: ${band.scope}`,
    `Materials: ${band.materials}`,
    `Style direction: ${input.settings.styles.join(", ") || "cohesive and believable"}.`,
    `Observed room: ${visualBrief(input.assessment)}`,
    `Retain: ${input.retained}`,
    layout,
    "Do not add an island that blocks circulation, extra windows, impossible cabinetry, or appliances that cannot be reached.",
    "Age or a traditional style alone is not a reason to replace the whole room.",
  ].join("\n");
}

export function scopeSummary(input: { tier: TierKey; settings: RunSettings; assessment: RoomAssessment; budget: string }) {
  const band = input.settings.tiers[input.tier];
  return {
    tier: band.label,
    retained: "Camera viewpoint, room footprint, ceiling, windows, doors, and major fixture locations unless a layout change was explicitly enabled.",
    proposed: band.scope,
    materials: band.materials,
    assumptions: input.assessment.explanation,
    planningBudget: input.budget,
  };
}
