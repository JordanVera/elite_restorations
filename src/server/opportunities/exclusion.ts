import type { RunSettings } from "@/server/opportunities/settings";

export type RoomDecision = "outdated" | "updated_appearance" | "mixed" | "insufficient_evidence";

export type RoomEvidence = {
  id: string;
  roomType: "kitchen" | "bathroom";
  decision: RoomDecision;
  outdatedScore: number;
  updatedScore: number;
  confidence: number;
};

export type ExclusionResult =
  | { action: "exclude"; reason: string }
  | { action: "review"; reason: string }
  | { action: "qualify"; roomIds: string[]; reason: string }
  | { action: "skip"; reason: string };

function wanted(roomType: RoomEvidence["roomType"], scope: RunSettings["rooms"]) {
  if (scope === "both") return true;
  if (scope === "kitchen") return roomType === "kitchen";
  return roomType === "bathroom";
}

function strongUpdate(room: RoomEvidence, minConfidence: number) {
  return room.decision === "updated_appearance" && room.confidence >= minConfidence && room.updatedScore >= 0.7;
}

export function applyExclusion(rooms: RoomEvidence[], settings: Pick<RunSettings, "exclusionMode" | "rooms" | "minOutdatedScore" | "minConfidence">): ExclusionResult {
  const relevant = rooms.filter((room) => wanted(room.roomType, settings.rooms));
  if (!relevant.length) return { action: "skip", reason: "No kitchen or bathroom photos were available for the selected scope." };

  const unclear = relevant.filter((room) => room.decision === "mixed" || room.decision === "insufficient_evidence" || room.confidence < settings.minConfidence);
  const outdated = relevant.filter(
    (room) => room.decision === "outdated" && room.outdatedScore >= settings.minOutdatedScore && room.confidence >= settings.minConfidence,
  );
  const updated = relevant.filter((room) => strongUpdate(room, settings.minConfidence));

  if (settings.exclusionMode === "strict_property") {
    if (updated.length) {
      return {
        action: "exclude",
        reason: "Strict mode excluded this home because a kitchen or bathroom appears updated, even if another room looks dated.",
      };
    }
    if (unclear.length && !outdated.length) {
      return { action: "review", reason: "The photos are mixed or lack enough evidence for an automatic decision." };
    }
    if (unclear.length && outdated.length) {
      return { action: "review", reason: "One room looks outdated, but another room is ambiguous. Strict mode sends this home to review." };
    }
    if (!outdated.length) {
      return { action: "skip", reason: "No room cleared the outdated-score and confidence minimums." };
    }
    return { action: "qualify", roomIds: outdated.map((room) => room.id), reason: "Qualifying rooms look outdated, and no room strongly appears updated." };
  }

  if (!outdated.length && unclear.length) {
    return { action: "review", reason: "Room-opportunity mode found no clearly outdated room. Ambiguous rooms stay in review." };
  }
  if (!outdated.length) {
    return { action: "skip", reason: "No room cleared the outdated-score and confidence minimums." };
  }
  return {
    action: "qualify",
    roomIds: outdated.map((room) => room.id),
    reason: "Room-opportunity mode keeps this home and will generate concepts only for the outdated rooms.",
  };
}
