export type DedupeInput = {
  mlsId: string | null;
  addressLine: string;
  unit: string | null;
  city: string;
  postalCode: string;
  exactSalePrice: number | null;
  closedDate: string | null;
};

export function normalizeToken(value: string) {
  return value
    .toLowerCase()
    .replace(/[.,#]/g, " ")
    .replace(/\b(street|st|avenue|ave|road|rd|drive|dr|lane|ln|boulevard|blvd|court|ct|place|pl)\b/g, (word) => {
      const map: Record<string, string> = {
        street: "st",
        st: "st",
        avenue: "ave",
        ave: "ave",
        road: "rd",
        rd: "rd",
        drive: "dr",
        dr: "dr",
        lane: "ln",
        ln: "ln",
        boulevard: "blvd",
        blvd: "blvd",
        court: "ct",
        ct: "ct",
        place: "pl",
        pl: "pl",
      };
      return map[word] ?? word;
    })
    .replace(/\s+/g, " ")
    .trim();
}

export function dedupeKey(input: Pick<DedupeInput, "mlsId" | "addressLine" | "unit" | "city" | "postalCode">) {
  if (input.mlsId?.trim()) return `mls:${normalizeToken(input.mlsId).replace(/\s+/g, "")}`;
  const unit = input.unit?.trim() ? normalizeToken(input.unit) : "";
  return `addr:${normalizeToken(input.addressLine)}|${unit}|${normalizeToken(input.city)}|${input.postalCode.trim()}`;
}

export type Conflict = { field: "exactSalePrice" | "closedDate"; left: string; right: string };

export function conflictsBetween(current: DedupeInput, incoming: DedupeInput): Conflict[] {
  const conflicts: Conflict[] = [];
  if (
    current.exactSalePrice != null &&
    incoming.exactSalePrice != null &&
    current.exactSalePrice !== incoming.exactSalePrice
  ) {
    conflicts.push({
      field: "exactSalePrice",
      left: String(current.exactSalePrice),
      right: String(incoming.exactSalePrice),
    });
  }
  if (current.closedDate && incoming.closedDate && current.closedDate !== incoming.closedDate) {
    conflicts.push({ field: "closedDate", left: current.closedDate, right: incoming.closedDate });
  }
  return conflicts;
}
