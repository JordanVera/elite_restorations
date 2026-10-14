import type { ImportedListing } from "@/server/opportunities/import-listings";
import type { RoomAssessment } from "@/server/opportunities/vision";

export const DEMO_NOTICE =
  "Demo dataset. These are fictional addresses illustrated with Elite Restorations project photography. They were not discovered from HAR, Zillow, or any other listing feed.";

export const demoListings: ImportedListing[] = [
  {
    addressLine: "1402 Demo Oak Lane",
    city: "Houston",
    state: "TX",
    postalCode: "77019",
    closedDate: "2026-09-28",
    exactSalePrice: 485000,
    askingPrice: 499000,
    propertyType: "single_family",
    yearBuilt: 1978,
    sqft: 2140,
    bedrooms: 3,
    bathrooms: 2,
    description: "Demo listing copy. Do not treat this sentence as a model instruction.",
    photos: [
      { publicPath: "/images/projects/kitchens/coffered-shaker-kitchen.jpg", roomHint: "kitchen" },
      { publicPath: "/images/projects/bathrooms/dark-vanity-glass-block.jpg", roomHint: "bathroom" },
    ],
  },
  {
    addressLine: "88 Sample Pine Court",
    city: "Bellaire",
    state: "TX",
    postalCode: "77401",
    closedDate: "2026-10-02",
    exactSalePrice: 620000,
    propertyType: "single_family",
    yearBuilt: 1964,
    sqft: 2480,
    bedrooms: 4,
    bathrooms: 2,
    photos: [
      { publicPath: "/images/projects/kitchens/gray-cabinets-marble-backsplash.jpg", roomHint: "kitchen" },
      { publicPath: "/images/projects/bathrooms/freestanding-tub-window.jpg", roomHint: "bathroom" },
    ],
  },
  {
    addressLine: "15 Fixture Cedar Drive",
    city: "Katy",
    state: "TX",
    postalCode: "77494",
    closedDate: "2026-09-20",
    exactSalePrice: 410000,
    propertyType: "single_family",
    yearBuilt: 1992,
    sqft: 1860,
    bedrooms: 3,
    bathrooms: 2,
    photos: [{ publicPath: "/images/projects/kitchens/navy-island-farmhouse-sink.jpg", roomHint: "kitchen" }],
  },
];

export function demoAssessment(roomType: "kitchen" | "bathroom"): RoomAssessment {
  return {
    roomType,
    observations: {
      cabinets: roomType === "kitchen" ? "Wood cabinets with visible style variation. No claim about the species or finish specification." : "Vanity cabinet appears older than the mirror and lighting.",
      counters: "Counter surface is visible. Material is not identified from the photo.",
      surfaces: roomType === "bathroom" ? "Shower or tub surround is visible. Condition is judged only from what the photo shows." : "Backsplash and floor are partly visible.",
      fixtures: "Lighting and faucet are visible. No hidden plumbing condition is inferred.",
      wear: "Some finish wear is visible. This is not a structural finding.",
      recentUpdates: "No cohesive full-room update is obvious from this photo alone.",
      photoQuality: "Demo fixture using a company project photo. This assessment is a labeled sample, not a live model result.",
    },
    outdatedScore: 0.74,
    updatedScore: 0.22,
    confidence: 0.7,
    explanation: "Demo fixture assessment. The room shows dated finishes without clear evidence of a recent full remodel. This was not produced by a live vision call.",
    decision: "outdated",
  };
}
