import type { RunSettings } from "@/server/opportunities/settings";

export type ProviderCapability = {
  soldSearch: boolean;
  exactSalePrice: boolean;
  salePriceRange: boolean;
  saleDate: boolean;
  photos: boolean;
  aiProcessing: boolean;
  derivativeImages: boolean;
  export: boolean;
  localRetention: boolean;
};

export type ProviderStatus = {
  id: "repliers" | "zillow" | "import" | "demo";
  name: string;
  configured: boolean;
  summary: string;
  needed: string[];
  capabilities: ProviderCapability;
};

const none: ProviderCapability = {
  soldSearch: false,
  exactSalePrice: false,
  salePriceRange: false,
  saleDate: false,
  photos: false,
  aiProcessing: false,
  derivativeImages: false,
  export: false,
  localRetention: false,
};

function flag(name: string) {
  const value = process.env[name]?.trim().toLowerCase();
  return value === "authorized" || value === "true" || value === "yes";
}

export function repliersStatus(): ProviderStatus {
  const key = Boolean(process.env.REPLIERS_API_KEY?.trim());
  const storage = flag("REPLIERS_STORAGE_AUTHORIZED");
  const ai = flag("REPLIERS_AI_PROCESSING_AUTHORIZED");
  const derivative = flag("REPLIERS_DERIVATIVE_IMAGES_AUTHORIZED");
  const canExport = flag("REPLIERS_EXPORT_AUTHORIZED");
  const needed: string[] = [];
  if (!key) needed.push("Set REPLIERS_API_KEY from a Repliers subscription tied to a named HAR broker, agent, or a vendor MLS license. An IDX feed alone is not this authorization.");
  if (!storage) needed.push("HAR/Repliers terms prohibit local storage without written authorization. Set REPLIERS_STORAGE_AUTHORIZED=authorized only after that writing exists. The flag records your attestation; it does not create the right.");
  if (!ai) needed.push("HAR section 4.10.1 allows a request-scoped AI call only inside your own systems when the provider cannot use the data for anything else. OpenAI retains API data for abuse monitoring unless zero-data retention is in place. Set REPLIERS_AI_PROCESSING_AUTHORIZED=authorized only after your license and retention terms allow it.");
  if (!derivative) needed.push("Derivative renovation images need written authorization. Set REPLIERS_DERIVATIVE_IMAGES_AUTHORIZED=authorized only when that writing covers this use.");
  if (!canExport) needed.push("Set REPLIERS_EXPORT_AUTHORIZED=authorized only when your license allows a private PDF or CSV that includes HAR data.");
  return {
    id: "repliers",
    name: "HAR via Repliers",
    configured: key,
    summary: key
      ? "The API key is present. Sold search uses the documented Repliers listings endpoint. Storage, AI, derivative images, and export stay off until each attestation is set."
      : "Provider not configured.",
    needed,
    capabilities: {
      soldSearch: key,
      exactSalePrice: key,
      salePriceRange: false,
      saleDate: key,
      photos: key && storage,
      aiProcessing: key && storage && ai,
      derivativeImages: key && storage && ai && derivative,
      export: key && canExport,
      localRetention: key && storage,
    },
  };
}

export function zillowStatus(): ProviderStatus {
  return {
    id: "zillow",
    name: "Zillow",
    configured: false,
    summary: "Provider not configured. A pasted Zillow URL is stored only as a reference key.",
    needed: [
      "Zillow Group datasets on Bridge are display-only. Their published terms forbid local storage and derivative works, and they do not supply the historical listing photos this workflow needs.",
      "Bridge MLS access is a separate license from Zillow’s consumer site. This app does not call Zillow or scrape listing pages.",
      "Do not paste a Zillow URL expecting the page to be fetched.",
    ],
    capabilities: none,
  };
}

export function importStatus(): ProviderStatus {
  return {
    id: "import",
    name: "CSV / JSON import",
    configured: true,
    summary: "Import closed-sale records you are authorized to use, plus photos you upload or company project images already on this site.",
    needed: [],
    capabilities: {
      soldSearch: false,
      exactSalePrice: true,
      salePriceRange: true,
      saleDate: true,
      photos: true,
      aiProcessing: true,
      derivativeImages: true,
      export: true,
      localRetention: true,
    },
  };
}

export function demoStatus(): ProviderStatus {
  return {
    id: "demo",
    name: "Demo dataset",
    configured: true,
    summary: "A separate sample that uses Elite Restorations project photography and fictional addresses. It is never mixed into live or imported results.",
    needed: [],
    capabilities: {
      ...importStatus().capabilities,
      soldSearch: false,
    },
  };
}

export function providerStatuses(): ProviderStatus[] {
  return [repliersStatus(), zillowStatus(), importStatus(), demoStatus()];
}

export type NormalizedListing = {
  provider: "repliers" | "zillow" | "import" | "demo";
  providerId: string | null;
  sourceUrl: string | null;
  attribution: string;
  retrievedAt: string;
  usageRestrictions: string;
  mlsId: string | null;
  addressLine: string;
  unit: string | null;
  city: string;
  state: string;
  postalCode: string;
  transactionStatus: "closed" | "pending" | "active" | "rental" | "unknown";
  closedDate: string | null;
  exactSalePrice: number | null;
  askingPrice: number | null;
  priceRangeLow: number | null;
  priceRangeHigh: number | null;
  estimatedValue: number | null;
  yearBuilt: number | null;
  sqft: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string;
  description: string | null;
  photoRefs: { sourcePhotoId: string | null; sourceUrl: string | null; publicPath: string | null }[];
};

type RepliersAddress = {
  streetNumber?: string | null;
  streetName?: string | null;
  streetSuffix?: string | null;
  streetDirection?: string | null;
  unitNumber?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
};

export type RepliersListing = {
  mlsNumber?: string;
  status?: string;
  lastStatus?: string;
  type?: string;
  class?: string;
  listPrice?: number | null;
  soldPrice?: number | null;
  details?: {
    description?: string | null;
    numBathrooms?: number | null;
    numBedrooms?: number | null;
    propertyType?: string | null;
    sqft?: string | number | null;
    style?: string | null;
    yearBuilt?: string | number | null;
  };
  address?: RepliersAddress;
  images?: string[];
  timestamps?: { closedDate?: string | null };
  map?: { latitude?: number; longitude?: number };
};

const REPLIERS_RESTRICTIONS =
  "HAR data via Repliers. Internal use under the subscriber’s license. Local retention, AI processing, derivative images, and export follow the attestation flags and are off unless each one is authorized.";

export function dateOnly(value: string | null | undefined) {
  if (!value) return null;
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value);
  return match ? match[1] : null;
}

export function normalizeRepliersListing(raw: RepliersListing, retrievedAt: string): NormalizedListing | { error: string } {
  if (raw.type?.toLowerCase() === "lease" || raw.lastStatus === "Lsd") {
    return {
      provider: "repliers",
      providerId: raw.mlsNumber ?? null,
      sourceUrl: null,
      attribution: "Houston Association of REALTORS® via Repliers",
      retrievedAt,
      usageRestrictions: REPLIERS_RESTRICTIONS,
      mlsId: raw.mlsNumber ?? null,
      addressLine: formatAddress(raw.address),
      unit: raw.address?.unitNumber ?? null,
      city: raw.address?.city ?? "",
      state: raw.address?.state ?? "TX",
      postalCode: raw.address?.zip ?? "",
      transactionStatus: "rental",
      closedDate: null,
      exactSalePrice: null,
      askingPrice: typeof raw.listPrice === "number" ? raw.listPrice : null,
      priceRangeLow: null,
      priceRangeHigh: null,
      estimatedValue: null,
      yearBuilt: numberOrNull(raw.details?.yearBuilt),
      sqft: numberOrNull(raw.details?.sqft),
      bedrooms: raw.details?.numBedrooms ?? null,
      bathrooms: raw.details?.numBathrooms ?? null,
      propertyType: raw.details?.style || raw.details?.propertyType || raw.class || "unknown",
      description: raw.details?.description ?? null,
      photoRefs: [],
    };
  }

  const closed = raw.status === "U" && raw.lastStatus === "Sld";
  const pending = raw.lastStatus === "Sc" || raw.lastStatus === "Sce";
  const transactionStatus = closed ? "closed" : pending ? "pending" : raw.status === "A" ? "active" : "unknown";
  return {
    provider: "repliers",
    providerId: raw.mlsNumber ?? null,
    sourceUrl: null,
    attribution: "Houston Association of REALTORS® via Repliers",
    retrievedAt,
    usageRestrictions: REPLIERS_RESTRICTIONS,
    mlsId: raw.mlsNumber ?? null,
    addressLine: formatAddress(raw.address),
    unit: raw.address?.unitNumber ?? null,
    city: titleCase(raw.address?.city ?? ""),
    state: raw.address?.state ?? "TX",
    postalCode: raw.address?.zip ?? "",
    transactionStatus,
    closedDate: dateOnly(raw.timestamps?.closedDate),
    exactSalePrice: typeof raw.soldPrice === "number" ? raw.soldPrice : null,
    askingPrice: typeof raw.listPrice === "number" ? raw.listPrice : null,
    priceRangeLow: null,
    priceRangeHigh: null,
    estimatedValue: null,
    yearBuilt: numberOrNull(raw.details?.yearBuilt),
    sqft: numberOrNull(raw.details?.sqft),
    bedrooms: raw.details?.numBedrooms ?? null,
    bathrooms: raw.details?.numBathrooms ?? null,
    propertyType: raw.details?.style || raw.details?.propertyType || raw.class || "unknown",
    description: raw.details?.description ?? null,
    photoRefs: (raw.images ?? []).map((path, index) => ({
      sourcePhotoId: `${raw.mlsNumber ?? "listing"}-${index}`,
      sourceUrl: `https://cdn.repliers.io/${path.replace(/^\//, "")}`,
      publicPath: null,
    })),
  };
}

function formatAddress(address: RepliersAddress | undefined) {
  if (!address) return "";
  return [address.streetNumber, address.streetDirection, address.streetName, address.streetSuffix].filter(Boolean).join(" ");
}

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function numberOrNull(value: string | number | null | undefined) {
  if (value == null || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

export function repliersSearchParams(settings: RunSettings, window: { chicagoStart: string; chicagoEnd: string }, pageNum: number) {
  const params = new URLSearchParams();
  params.set("status", "U");
  params.set("lastStatus", "Sld");
  params.append("type", "sale");
  params.set("minClosedDate", window.chicagoStart);
  params.set("maxClosedDate", window.chicagoEnd);
  params.set("hasImages", "true");
  params.set("resultsPerPage", "50");
  params.set("pageNum", String(pageNum));
  if (settings.priceBasis === "exact") {
    if (settings.minPrice != null) params.set("minSoldPrice", String(settings.minPrice));
    if (settings.maxPrice != null) params.set("maxSoldPrice", String(settings.maxPrice));
  }
  if (settings.priceBasis === "asking") {
    if (settings.minPrice != null) params.set("minPrice", String(settings.minPrice));
    if (settings.maxPrice != null) params.set("maxPrice", String(settings.maxPrice));
  }
  for (const city of settings.geography.cities) params.append("city", city);
  for (const zip of settings.geography.zips) params.append("zip", zip);
  if (settings.geography.radiusMiles != null && settings.geography.latitude != null && settings.geography.longitude != null) {
    params.set("lat", String(settings.geography.latitude));
    params.set("long", String(settings.geography.longitude));
    params.set("radius", String(Math.max(1, Math.round(settings.geography.radiusMiles * 1.60934))));
  }
  if (settings.propertyType === "single_family") {
    params.set("class", "ResidentialProperty");
    params.append("propertyType", "Single Family Residence");
  }
  if (settings.bedsMin != null) params.set("minBedroomsTotal", String(settings.bedsMin));
  if (settings.bathsMin != null) params.set("minBaths", String(settings.bathsMin));
  return params;
}

export async function searchRepliers(settings: RunSettings, window: { chicagoStart: string; chicagoEnd: string }, pageNum: number) {
  const key = process.env.REPLIERS_API_KEY?.trim();
  if (!key) throw new Error("Provider not configured. REPLIERS_API_KEY is missing.");
  const params = repliersSearchParams(settings, window, pageNum);
  const response = await fetch(`https://api.repliers.io/listings?${params.toString()}`, {
    headers: { "REPLIERS-API-KEY": key, accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Repliers returned ${response.status}. The app did not fall back to another source.`);
  }
  const body = (await response.json()) as { listings?: RepliersListing[]; numPages?: number; page?: number };
  if (!Array.isArray(body.listings)) {
    throw new Error("Repliers did not return a listings array. No records were invented.");
  }
  return { listings: body.listings, numPages: body.numPages ?? pageNum, page: body.page ?? pageNum };
}
