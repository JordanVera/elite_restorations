import type { RunSettings } from "@/server/opportunities/settings";

export type CandidateFacts = {
  transactionStatus: "closed" | "pending" | "active" | "rental" | "unknown";
  closedDate: string | null;
  propertyType: string;
  yearBuilt: number | null;
  sqft: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  city: string;
  postalCode: string;
};

export function isSingleFamily(propertyType: string) {
  const value = propertyType.toLowerCase();
  return value.includes("single") || value === "residential" || value === "single_family";
}

export function propertyTypeMatches(propertyType: string, wanted: RunSettings["propertyType"]) {
  const value = propertyType.toLowerCase();
  if (wanted === "any_residential") return !value.includes("commercial") && !value.includes("land");
  if (wanted === "single_family") return isSingleFamily(propertyType) && !value.includes("condo") && !value.includes("town");
  if (wanted === "condo") return value.includes("condo");
  return value.includes("town");
}

export function missingPhotoReason(count: number) {
  return count > 0 ? null : "No authorized photos were available to inspect.";
}

export function screenCandidate(
  facts: CandidateFacts,
  settings: RunSettings,
  window: { chicagoStart: string; chicagoEnd: string },
): { eligible: true } | { eligible: false; reason: string } {
  if (facts.transactionStatus === "pending") return { eligible: false, reason: "Pending listings are excluded." };
  if (facts.transactionStatus === "rental") return { eligible: false, reason: "Rentals are excluded." };
  if (facts.transactionStatus !== "closed") return { eligible: false, reason: "Only confirmed closed sales are included." };
  if (!facts.closedDate) return { eligible: false, reason: "The closing date is not verified." };
  if (facts.closedDate < window.chicagoStart || facts.closedDate > window.chicagoEnd) {
    return { eligible: false, reason: "The closing date is outside the selected window." };
  }
  if (!propertyTypeMatches(facts.propertyType, settings.propertyType)) {
    return { eligible: false, reason: "The property type does not match the filter." };
  }
  if (settings.yearBuiltMin != null && (facts.yearBuilt == null || facts.yearBuilt < settings.yearBuiltMin)) {
    return { eligible: false, reason: "Year built is missing or older than the minimum." };
  }
  if (settings.yearBuiltMax != null && (facts.yearBuilt == null || facts.yearBuilt > settings.yearBuiltMax)) {
    return { eligible: false, reason: "Year built is missing or newer than the maximum." };
  }
  if (settings.sqftMin != null && (facts.sqft == null || facts.sqft < settings.sqftMin)) {
    return { eligible: false, reason: "Square footage is missing or below the minimum." };
  }
  if (settings.sqftMax != null && (facts.sqft == null || facts.sqft > settings.sqftMax)) {
    return { eligible: false, reason: "Square footage is missing or above the maximum." };
  }
  if (settings.bedsMin != null && (facts.bedrooms == null || facts.bedrooms < settings.bedsMin)) {
    return { eligible: false, reason: "Bedroom count is missing or below the minimum." };
  }
  if (settings.bathsMin != null && (facts.bathrooms == null || facts.bathrooms < settings.bathsMin)) {
    return { eligible: false, reason: "Bathroom count is missing or below the minimum." };
  }
  if (settings.geography.cities.length && !settings.geography.cities.some((city) => city.toLowerCase() === facts.city.toLowerCase())) {
    if (!settings.geography.zips.includes(facts.postalCode) && settings.geography.radiusMiles == null) {
      return { eligible: false, reason: "The city is outside the selected geography." };
    }
  }
  if (settings.geography.zips.length && !settings.geography.zips.includes(facts.postalCode) && settings.geography.radiusMiles == null) {
    const cityOk = settings.geography.cities.some((city) => city.toLowerCase() === facts.city.toLowerCase());
    if (!cityOk) return { eligible: false, reason: "The ZIP code is outside the selected geography." };
  }
  return { eligible: true };
}
