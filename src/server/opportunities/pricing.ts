import type { RunSettings } from "@/server/opportunities/settings";

export type PriceFields = {
  exactSalePrice: number | null;
  askingPrice: number | null;
  priceRangeLow: number | null;
  priceRangeHigh: number | null;
  estimatedValue: number | null;
};

export type PriceDecision =
  | { include: true; basis: RunSettings["priceBasis"]; note: string }
  | { include: false; reason: string };

function within(value: number, min: number | null, max: number | null) {
  if (min != null && value < min) return false;
  if (max != null && value > max) return false;
  return true;
}

/**
 * A reported range matches when it overlaps the filter.
 * A missing bound on the filter is open. A missing bound on the listing
 * does not match unless unknown prices are explicitly allowed.
 */
export function rangesOverlap(
  low: number | null,
  high: number | null,
  min: number | null,
  max: number | null,
) {
  if (low == null || high == null || low > high) return false;
  const filterLow = min ?? Number.NEGATIVE_INFINITY;
  const filterHigh = max ?? Number.POSITIVE_INFINITY;
  return low <= filterHigh && high >= filterLow;
}

export function decidePrice(fields: PriceFields, settings: Pick<RunSettings, "priceBasis" | "minPrice" | "maxPrice" | "allowUnknownPrice">): PriceDecision {
  const { priceBasis, minPrice, maxPrice, allowUnknownPrice } = settings;

  if (priceBasis === "exact") {
    if (fields.exactSalePrice == null) {
      return allowUnknownPrice
        ? { include: true, basis: "exact", note: "Included without an exact sale price because unknown prices are allowed." }
        : { include: false, reason: "Exact sale price is missing, and unknown prices are not allowed." };
    }
    if (!within(fields.exactSalePrice, minPrice, maxPrice)) {
      return { include: false, reason: "Exact sale price is outside the selected range." };
    }
    return { include: true, basis: "exact", note: "Matched on the exact sale price." };
  }

  if (priceBasis === "asking") {
    if (fields.askingPrice == null) {
      return allowUnknownPrice
        ? { include: true, basis: "asking", note: "Included without a last asking price because unknown prices are allowed." }
        : { include: false, reason: "Last asking price is missing, and unknown prices are not allowed." };
    }
    if (!within(fields.askingPrice, minPrice, maxPrice)) {
      return { include: false, reason: "Last asking price is outside the selected range." };
    }
    return { include: true, basis: "asking", note: "Matched on the last asking price. This is not the sale price." };
  }

  if (fields.priceRangeLow == null || fields.priceRangeHigh == null) {
    return allowUnknownPrice
      ? { include: true, basis: "range", note: "Included without a reported price range because unknown prices are allowed." }
      : { include: false, reason: "Reported sale-price range is missing, and unknown prices are not allowed." };
  }
  if (!rangesOverlap(fields.priceRangeLow, fields.priceRangeHigh, minPrice, maxPrice)) {
    return { include: false, reason: "Reported sale-price range does not overlap the filter." };
  }
  return {
    include: true,
    basis: "range",
    note: "Matched because the reported sale-price range overlaps the filter. This is not an exact sale price.",
  };
}

export function priceLabel(fields: PriceFields) {
  const parts: string[] = [];
  if (fields.exactSalePrice != null) parts.push(`Exact sale price $${fields.exactSalePrice.toLocaleString("en-US")}`);
  if (fields.askingPrice != null) parts.push(`Last asking price $${fields.askingPrice.toLocaleString("en-US")}`);
  if (fields.priceRangeLow != null && fields.priceRangeHigh != null) {
    parts.push(
      `Reported range $${fields.priceRangeLow.toLocaleString("en-US")}–$${fields.priceRangeHigh.toLocaleString("en-US")}`,
    );
  }
  if (fields.estimatedValue != null) parts.push(`Estimated value $${fields.estimatedValue.toLocaleString("en-US")} (not used as a sale price)`);
  return parts.length ? parts.join(" · ") : "Price unknown";
}
