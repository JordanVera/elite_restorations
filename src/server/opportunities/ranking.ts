import type { RunSettings } from "@/server/opportunities/settings";

export type ScoreInput = {
  outdatedScore: number;
  confidence: number;
  closedDate: string;
  window: { chicagoStart: string; chicagoEnd: string };
  cityMatched: boolean;
  priceMatched: boolean;
  qualifyingRooms: number;
  weights: RunSettings["rankWeights"];
};

export type ScoreResult = {
  score: number;
  breakdown: {
    opportunity: number;
    evidence: number;
    recency: number;
    filterFit: number;
    roomCount: number;
  };
  explanation: string;
};

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function daysBetween(start: string, end: string) {
  const a = Date.parse(`${start}T00:00:00Z`);
  const b = Date.parse(`${end}T00:00:00Z`);
  return Math.round((b - a) / 86_400_000);
}

export function scoreOpportunity(input: ScoreInput): ScoreResult {
  const opportunity = clamp(input.outdatedScore);
  const evidence = clamp(input.confidence);
  const span = Math.max(1, daysBetween(input.window.chicagoStart, input.window.chicagoEnd));
  const age = daysBetween(input.closedDate, input.window.chicagoEnd);
  const recency = clamp(1 - age / span);
  const filterFit = (input.cityMatched ? 0.5 : 0) + (input.priceMatched ? 0.5 : 0);
  const roomCount = clamp(input.qualifyingRooms / 3);
  const weights = input.weights;
  const total =
    weights.opportunity + weights.evidence + weights.recency + weights.filterFit + weights.roomCount;
  const breakdown = {
    opportunity: (opportunity * weights.opportunity) / total,
    evidence: (evidence * weights.evidence) / total,
    recency: (recency * weights.recency) / total,
    filterFit: (filterFit * weights.filterFit) / total,
    roomCount: (roomCount * weights.roomCount) / total,
  };
  const score = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
  const explanation = [
    `Visible remodel opportunity contributes ${Math.round(breakdown.opportunity * 100)} points.`,
    `Photo confidence contributes ${Math.round(breakdown.evidence * 100)} points.`,
    `Sale recency contributes ${Math.round(breakdown.recency * 100)} points.`,
    `Geography and price fit contribute ${Math.round(breakdown.filterFit * 100)} points.`,
    `${input.qualifyingRooms} qualifying room${input.qualifyingRooms === 1 ? "" : "s"} contribute ${Math.round(breakdown.roomCount * 100)} points.`,
    "This is a property opportunity score. It does not show that a homeowner wants a remodel or has a particular budget.",
  ].join(" ");
  return { score: Math.round(score * 1000) / 1000, breakdown, explanation };
}
