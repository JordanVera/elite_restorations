/** Choices and customer-facing lines for the project estimate request. */

export const OFFICE_PHONE = "(713) 909-0034";

export const TEXT_OPT_IN = `OK to text me at this number from ${OFFICE_PHONE}`;

export const ACCESS_NOTE = "Please don't share alarm or lock codes.";

export const ADJUSTER_NOTE = "We'll review your adjuster's estimate with you.";

export const THANK_YOU = `Thanks! Elite Restorations will review your project and reach out. Questions? Call ${OFFICE_PHONE}.`;

export const PHOTO_GUIDE =
  "Add at least 4 photos if you can: wide shots from each doorway or corner, plus close-ups of damage, fixtures, and appliances. For water or fire jobs, include the source of the loss and close-ups of the ceiling and floor. For roofing, include all four sides of the house from the ground and any stains on the ceiling inside. A tape measure on the key dimensions helps.";

export const MEASURE_TIPS = [
  "Use a tape, in feet. 12 or 12 ft 4 in both help.",
  "Length and width are the floor, wall to wall.",
  "Linear feet (LF) follow the wall: cabinets, countertops, baseboard, fence, or gutters.",
  "Square feet (SF) is the floor or wall area. One roofing square is 100 square feet of roof.",
  "If the roof squares are unknown, send the house footprint and the number of stories.",
  "Pitch: low is easy to walk, medium is a typical house, steep needs extra footing.",
  "Every measurement is optional. Send what you know.",
] as const;

export const STEPS = [
  { id: "contact", label: "Contact" },
  { id: "rooms", label: "Rooms" },
  { id: "project", label: "Project" },
  { id: "insurance", label: "Insurance" },
  { id: "review", label: "Review" },
] as const;

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
  "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA",
  "WV", "WI", "WY",
] as const;

export const STATE_NAMES: Record<(typeof US_STATES)[number], string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado",
  CT: "Connecticut", DE: "Delaware", DC: "District of Columbia", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky",
  LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
  MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

export const hearAbout = [
  { value: "google", label: "Google" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "nextdoor", label: "Nextdoor" },
  { value: "referral", label: "Referral" },
  { value: "repeat", label: "Repeat customer" },
  { value: "yard-sign", label: "Yard sign or truck" },
  { value: "adjuster", label: "Insurance adjuster" },
  { value: "other", label: "Other" },
] as const;

export const propertyTypes = [
  { value: "single-family", label: "Single-family" },
  { value: "townhome", label: "Townhome or condo" },
  { value: "apartment", label: "Apartment or multifamily" },
  { value: "commercial", label: "Commercial" },
] as const;

export const roles = [
  { value: "owner", label: "I am the owner" },
  { value: "tenant", label: "I am the tenant" },
  { value: "manager", label: "I am the property manager" },
] as const;

export const stories = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3+", label: "3+" },
] as const;

export const areaTypes = [
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "living", label: "Living or family room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "hallway", label: "Hallway or stairs" },
  { value: "laundry", label: "Laundry" },
  { value: "garage", label: "Garage" },
  { value: "whole-house", label: "Whole house" },
  { value: "roof", label: "Roof or exterior" },
  { value: "fence", label: "Fence, deck, or patio" },
  { value: "other", label: "Other" },
] as const;

export const trades = [
  { value: "kitchen", label: "Kitchen remodel" },
  { value: "cabinetry", label: "Cabinetry" },
  { value: "countertops", label: "Countertops and backsplash" },
  { value: "bathroom", label: "Bathroom remodel" },
  { value: "tile", label: "Tile" },
  { value: "flooring", label: "Flooring" },
  { value: "paint", label: "Paint and drywall" },
  { value: "roofing", label: "Roofing" },
  { value: "water", label: "Water damage" },
  { value: "fire", label: "Fire damage" },
  { value: "fence", label: "Fence, deck, or patio" },
  { value: "other", label: "Other" },
] as const;

export const finishLevels = [
  { value: "builder", label: "Builder" },
  { value: "mid", label: "Mid-grade" },
  { value: "high", label: "High-end" },
] as const;

export const startWindows = [
  { value: "asap", label: "ASAP" },
  { value: "month", label: "Within 1 month" },
  { value: "quarter", label: "1–3 months" },
  { value: "planning", label: "Just planning" },
] as const;

export const budgetRanges = [
  { value: "under-5", label: "Under $5,000" },
  { value: "5-15", label: "$5,000 to $15,000" },
  { value: "15-30", label: "$15,000 to $30,000" },
  { value: "30-60", label: "$30,000 to $60,000" },
  { value: "60-100", label: "$60,000 to $100,000" },
  { value: "100-250", label: "$100,000 to $250,000" },
  { value: "over-250", label: "Over $250,000" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const materialSources = [
  { value: "elite", label: "Elite Restorations" },
  { value: "mine", label: "I will supply the materials" },
] as const;

export const roomMaterialSources = [
  { value: "elite", label: "Elite Restorations" },
  { value: "mine", label: "Me" },
  { value: "mixed", label: "Some of each" },
] as const;

export const contactMethods = [
  { value: "call", label: "Call" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
] as const;

export const contactTimes = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "anytime", label: "Anytime" },
] as const;

export const lossCauses = [
  { value: "hail", label: "Hail" },
  { value: "wind", label: "Wind" },
  { value: "fire", label: "Fire" },
  { value: "flood", label: "Flood" },
  { value: "hurricane", label: "Hurricane" },
  { value: "burst-pipe", label: "Burst pipe" },
  { value: "appliance-leak", label: "Appliance leak" },
  { value: "other", label: "Other" },
] as const;

export const wetAreas = [
  { value: "tub", label: "Tub" },
  { value: "shower", label: "Shower" },
  { value: "tub-to-shower", label: "Tub-to-shower conversion" },
  { value: "both", label: "Both" },
  { value: "other", label: "Other" },
] as const;

export const existingFloors = [
  { value: "carpet-pad", label: "Carpet and pad" },
  { value: "floating-vinyl", label: "Floating vinyl or laminate" },
  { value: "glue-vinyl", label: "Glue-down vinyl" },
  { value: "tile", label: "Tile" },
  { value: "glue-wood", label: "Glue-down wood" },
  { value: "none", label: "None" },
] as const;

export const newFloors = [
  { value: "hardwood-floating", label: "Hardwood, engineered, floating" },
  { value: "hardwood-glue", label: "Hardwood, engineered, glue-down" },
  { value: "hardwood-solid", label: "Hardwood, solid" },
  { value: "vinyl-laminate", label: "Vinyl, LVP, or laminate" },
  { value: "tile-standard", label: "Tile, standard" },
  { value: "tile-large", label: "Tile, large format" },
  { value: "unsure", label: "Not sure" },
] as const;

export const floorLevels = [
  { value: "no", label: "No" },
  { value: "little", label: "A little" },
  { value: "lot", label: "A lot" },
  { value: "unsure", label: "Not sure" },
] as const;

export const counterThickness = [
  { value: "2cm", label: "2 cm" },
  { value: "3cm", label: "3 cm" },
  { value: "unsure", label: "Not sure" },
] as const;

export const sinkTypes = [
  { value: "undermount", label: "Undermount" },
  { value: "farmhouse", label: "Farmhouse" },
  { value: "drop-in", label: "Drop-in" },
] as const;

export const backsplashStyles = [
  { value: "slab", label: "Full-height slab" },
  { value: "tile", label: "Tile" },
] as const;

export const cabinetPlans = [
  { value: "prefab", label: "New prefab" },
  { value: "custom", label: "New custom" },
  { value: "refinish", label: "Refinish, stain, or reface what is there" },
] as const;

export const cabinetLights = [
  { value: "recessed", label: "Recessed lights" },
  { value: "pendant", label: "Pendant lights" },
  { value: "both", label: "Both" },
  { value: "none", label: "Neither" },
  { value: "unsure", label: "Not sure" },
] as const;

export const applianceResets = [
  { value: "dishwasher", label: "Dishwasher" },
  { value: "disposal", label: "Disposal" },
  { value: "cooktop", label: "Cooktop" },
  { value: "otr-microwave", label: "Over-the-range microwave" },
  { value: "oven", label: "Built-in oven" },
] as const;

export const showerDoors = [
  { value: "frameless", label: "Frameless glass" },
  { value: "framed", label: "Standard framed" },
  { value: "slider", label: "Tub slider" },
  { value: "curtain", label: "Curtain" },
] as const;

export const showerCurbs = [
  { value: "curb", label: "Curb" },
  { value: "curbless", label: "Curbless" },
  { value: "unsure", label: "Not sure" },
] as const;

export const toiletPlans = [
  { value: "keep", label: "Keep it" },
  { value: "reset", label: "Remove and reset" },
  { value: "new", label: "New toilet" },
] as const;

export const bathScopes = [
  { value: "full", label: "Full bathroom" },
  { value: "shower-only", label: "Shower or tub area only" },
] as const;

export const paintExteriorItems = [
  { value: "siding", label: "Siding" },
  { value: "soffit", label: "Soffit" },
  { value: "fascia", label: "Fascia" },
  { value: "doors", label: "Doors" },
] as const;

export const agreementAnswers = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
] as const;

export const vanitySinks = [
  { value: "single", label: "Single sink" },
  { value: "double", label: "Double sink" },
] as const;

export const roofPitches = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "steep", label: "Steep" },
] as const;

export const yesNo = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

/** Labels for optional measurement inputs. Keys match the measures object. */
export const MEASURE_LABELS = {
  lengthFt: "Length (ft)",
  widthFt: "Width (ft)",
  ceilingFt: "Ceiling height (ft)",
  baseCabinetLf: "Base cabinets (LF)",
  upperCabinetLf: "Upper cabinets (LF)",
  cabinetPlan: "Cabinets",
  cabinetStyle: "Cabinet style and finish",
  cabinetHardware: "Cabinet hardware",
  cabinetLights: "Lights",
  appliancesReset: "Appliances to disconnect and reset",
  countertopLf: "Countertop (LF)",
  countertopDepth: "Countertop depth",
  countertopSf: "Countertop (SF)",
  countertopThickness: "Countertop thickness",
  countertopEdge: "Edge profile",
  countertopCurrent: "Current countertop",
  countertopDesired: "Desired countertop",
  sinkType: "Sink type",
  sinkCutouts: "Sink cutouts",
  backsplashStyle: "Backsplash style",
  backsplashSf: "Backsplash (SF)",
  removeCounters: "Remove the counter and backsplash",
  island: "Island",
  islandSize: "Island size",
  plumbingAppliances: "Sink, faucet, or appliances to install or move",
  flooringIncluded: "Flooring in this kitchen",
  wetArea: "Tub or shower",
  wetAreaOther: "Other tub or shower note",
  bathScope: "Bathroom scope",
  showerDoor: "Shower door",
  showerCurb: "Shower entry",
  showerSize: "Shower size",
  showerNiche: "Shower niche",
  showerBench: "Shower bench",
  tileHeight: "Tile height",
  tileToCeiling: "Tile to the ceiling",
  vanityWidth: "Vanity width",
  vanitySinks: "Vanity sinks",
  medicineCabinet: "Medicine cabinet",
  mirrorLight: "Mirror and light",
  toiletPlan: "Toilet",
  toiletCount: "Toilets",
  movePlumbing: "Move any plumbing",
  fixturesToReplace: "Fixtures to replace",
  floorTileSf: "Floor tile (SF)",
  exhaustFan: "Exhaust fan",
  floorSf: "Floor area (SF)",
  floorCurrent: "Floor that is there now",
  floorNew: "New floor",
  floorLevel: "Floor leveling",
  stairSteps: "Stair steps",
  baseboardLf: "Baseboard (LF)",
  quarterRoundLf: "Quarter round (LF)",
  tMoldLf: "T-shaped transition strip (LF)",
  reducerLf: "Reducer transition strip (LF)",
  furnitureMove: "Furniture to move",
  subfloorNotes: "Subfloor notes",
  ceilingsIncluded: "Ceilings included",
  wallSf: "Wall area (SF)",
  doorCount: "Doors",
  windowTrimCount: "Windows and trim",
  patchCount: "Drywall patches",
  patchSizes: "Patch sizes",
  texture: "Texture",
  colorChange: "Color change",
  crownLf: "Crown molding (LF)",
  closetShelves: "Closet or pantry shelves",
  fixturesReset: "Ceiling fans and lights to remove and reset",
  stairSpindles: "Stair spindles and handrail",
  paintFinish: "Sheen, color, or need help choosing",
  paintExterior: "Exterior paint",
  squares: "Roof squares",
  footprint: "House footprint",
  roofSeparate: "Separate structure",
  roofStories: "Stories for this roof",
  pitch: "Roof pitch",
  roofMaterial: "Current roof material",
  roofLayers: "Layers",
  leaks: "Leaks",
  leakWhere: "Where it leaks",
  guttersLf: "Gutters (LF)",
  ridgeLf: "Ridge (LF)",
  valleyLf: "Valleys (LF)",
  skylightCount: "Skylights",
  ventCount: "Roof vents",
  wallHeight: "Wet or damaged wall height (ft)",
  affectedFlooring: "Flooring affected",
  cabinetsAffected: "Cabinets affected",
  sourceStopped: "Source stopped",
  packOut: "Pack-out or contents needed",
  boardUp: "Board-up or tarp needed now",
  attic: "Attic involved",
  standingWater: "Standing water now",
  sootWhere: "Smoke or soot",
  fenceLf: "Fence (LF)",
  fenceHeight: "Fence height",
  fenceMaterial: "Fence material",
  gateCount: "Gates",
  deckLengthFt: "Deck or patio length (ft)",
  deckWidthFt: "Deck or patio width (ft)",
  deckHeight: "Height off the ground",
  deckMaterial: "Deck or patio material",
  railings: "Railings",
  deckStairs: "Deck stairs",
} as const;

export type MeasureKey = keyof typeof MEASURE_LABELS;

export function optionLabel(list: readonly { value: string; label: string }[], value: string): string {
  return list.find((item) => item.value === value)?.label ?? value;
}

export function tradeSelection(selected: readonly string[], flooringIncluded = "") {
  const has = (value: string) => selected.includes(value);
  const flooring = has("flooring") || has("tile") || flooringIncluded === "yes";
  return {
    kitchen: has("kitchen"),
    bathroom: has("bathroom"),
    tile: has("tile"),
    flooring,
    counters: has("countertops") || has("kitchen"),
    cabinets: has("cabinetry") || has("kitchen"),
    paint: has("paint"),
    roofing: has("roofing"),
    loss: has("water") || has("fire"),
    fire: has("fire"),
    fence: has("fence"),
    other: has("other"),
    interior:
      has("kitchen") ||
      has("bathroom") ||
      has("flooring") ||
      has("tile") ||
      has("paint") ||
      has("water") ||
      has("fire") ||
      has("other") ||
      has("countertops") ||
      has("cabinetry") ||
      flooringIncluded === "yes",
    ceiling:
      has("kitchen") ||
      has("bathroom") ||
      has("paint") ||
      has("flooring") ||
      has("tile") ||
      has("water") ||
      has("fire") ||
      flooringIncluded === "yes",
  };
}
