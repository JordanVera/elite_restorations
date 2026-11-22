/**
 * Mock Jobber data for local development and the demo flow. Every name,
 * email, phone, and address here is invented. Emails use example.com and
 * phones use the reserved 555-01xx range.
 */
import type { ClientNode, LineItemNode, QuoteNode } from "@/server/jobber/read-map";

type FixtureQuote = Omit<QuoteNode, "client" | "lineItems"> & { clientId: string; lineItems: LineItemNode[] };

export const MOCK_CLIENTS: ClientNode[] = [
  {
    id: "mock-client-1",
    name: "Avery Lindqvist",
    companyName: null,
    isCompany: false,
    email: "avery.lindqvist@example.com",
    phone: "(713) 555-0101",
    jobberWebUri: null,
    updatedAt: "2026-10-28T15:00:00Z",
    clientProperties: { nodes: [{ address: { street: "1402 Example Oak Ln", city: "Katy", province: "TX", postalCode: "77450" } }] },
  },
  {
    id: "mock-client-2",
    name: "Jordan Okafor",
    companyName: null,
    isCompany: false,
    email: "jordan.okafor@example.com",
    phone: "(281) 555-0102",
    jobberWebUri: null,
    updatedAt: "2026-11-02T18:30:00Z",
    clientProperties: { nodes: [{ address: { street: "88 Sample Creek Dr", city: "Sugar Land", province: "TX", postalCode: "77479" } }] },
  },
  {
    id: "mock-client-3",
    name: "Bayou Demo Properties",
    companyName: "Bayou Demo Properties LLC",
    isCompany: true,
    email: "office@bayou-demo.example.com",
    phone: "(832) 555-0103",
    jobberWebUri: null,
    updatedAt: "2026-11-10T13:10:00Z",
    clientProperties: { nodes: [{ address: { street: "500 Placeholder Pkwy Ste 2", city: "Houston", province: "TX", postalCode: "77024" } }] },
  },
  {
    id: "mock-client-4",
    name: "Priya Castellanos",
    companyName: null,
    isCompany: false,
    email: "priya.c@example.com",
    phone: "(713) 555-0104",
    jobberWebUri: null,
    updatedAt: "2026-11-12T20:45:00Z",
    clientProperties: { nodes: [{ address: { street: "2210 Fictional Pine St", city: "Spring", province: "TX", postalCode: "77373" } }] },
  },
  {
    id: "mock-client-5",
    name: "Morgan Feld",
    companyName: null,
    isCompany: false,
    email: "morgan.feld@example.com",
    phone: "(281) 555-0105",
    jobberWebUri: null,
    updatedAt: "2026-11-15T09:05:00Z",
    clientProperties: { nodes: [{ address: { street: "17 Demo Hollow Ct", city: "The Woodlands", province: "TX", postalCode: "77380" } }] },
  },
];

function item(id: string, name: string, description: string, quantity: number, unitPrice: number): LineItemNode {
  return { id, name, description, quantity, unitPrice, totalPrice: Math.round(quantity * unitPrice * 100) / 100 };
}

const FIXTURE_QUOTES: FixtureQuote[] = [
  {
    id: "mock-quote-1",
    clientId: "mock-client-1",
    quoteNumber: "1042",
    quoteStatus: "approved",
    title: "Primary bathroom remodel",
    createdAt: "2026-10-20T16:00:00Z",
    updatedAt: "2026-10-30T16:00:00Z",
    jobberWebUri: null,
    amounts: { total: 38450 },
    property: { address: { street: "1402 Example Oak Ln", city: "Katy", province: "TX", postalCode: "77450" } },
    lineItems: [
      item("mock-li-1-1", "Demolition and haul-off", "Remove existing tub, tile, vanity, and flooring. Dispose of debris.", 1, 3200),
      item("mock-li-1-2", "Shower Tile Material Allowance", "Allowance for wall tile in the walk-in shower, approx. 140 sq ft.", 140, 9.5),
      item("mock-li-1-3", "Bathroom Floor Tile Allowance", "Porcelain floor tile, approx. 85 sq ft.", 85, 7),
      item("mock-li-1-4", "Quartz Vanity Countertop Allowance", "Double-sink vanity top with undermount sinks.", 1, 1800),
      item("mock-li-1-5", "Plumbing Fixtures Allowance", "Shower valve and trim, rain head, two faucets, toilet.", 1, 2600),
      item("mock-li-1-6", "Paint - walls and ceiling", "Two coats, customer to select color.", 1, 950),
      item("mock-li-1-7", "Lighting fixtures allowance", "Vanity lights (2) and one shower can light.", 3, 180),
      item("mock-li-1-8", "Tile installation labor", "Shower walls, niche, and floor.", 1, 7800),
    ],
  },
  {
    id: "mock-quote-2",
    clientId: "mock-client-2",
    quoteNumber: "1047",
    quoteStatus: "approved",
    title: "Kitchen remodel with island",
    createdAt: "2026-10-27T15:30:00Z",
    updatedAt: "2026-11-05T19:00:00Z",
    jobberWebUri: null,
    amounts: { total: 61200 },
    property: { address: { street: "88 Sample Creek Dr", city: "Sugar Land", province: "TX", postalCode: "77479" } },
    lineItems: [
      item("mock-li-2-1", "LVP Flooring Material Allowance", "Luxury vinyl plank for kitchen and breakfast area, approx. 420 sq ft.", 420, 4.25),
      item("mock-li-2-2", "Quartzite Countertop Material Allowance", "Perimeter and island countertops, approx. 68 sq ft.", 68, 95),
      item("mock-li-2-3", "Backsplash tile allowance", "Full-height backsplash behind range, standard height elsewhere.", 45, 18),
      item("mock-li-2-4", "Cabinet refinish - paint grade", "Spray finish on existing perimeter cabinets. Customer selects finish color.", 1, 6400),
      item("mock-li-2-5", "Cabinet hardware allowance", "Pulls and knobs, 38 pieces.", 38, 12),
      item("mock-li-2-6", "Pendant lights over island", "Three pendants, customer supplied selection.", 3, 220),
      item("mock-li-2-7", "Kitchen sink and faucet allowance", "Undermount single bowl sink and pull-down faucet.", 1, 900),
      item("mock-li-2-8", "Electrical - under cabinet lighting", "LED tape with dimmer.", 1, 1250),
    ],
  },
  {
    id: "mock-quote-3",
    clientId: "mock-client-3",
    quoteNumber: "1051",
    quoteStatus: "awaiting_response",
    title: "Suite 2 water damage restoration",
    createdAt: "2026-11-08T14:00:00Z",
    updatedAt: "2026-11-10T14:00:00Z",
    jobberWebUri: null,
    amounts: { total: 24900 },
    property: { address: { street: "500 Placeholder Pkwy Ste 2", city: "Houston", province: "TX", postalCode: "77024" } },
    lineItems: [
      item("mock-li-3-1", "Water mitigation and drying", "Extraction, dehumidification, and moisture mapping.", 1, 4800),
      item("mock-li-3-2", "Drywall replacement", "Remove and replace 2 ft flood cut, tape, float, texture.", 1, 5200),
      item("mock-li-3-3", "Commercial carpet tile allowance", "Carpet tile for open office, approx. 900 sq ft.", 900, 3.8),
      item("mock-li-3-4", "Interior paint", "Paint affected walls, owner to confirm color match.", 1, 2100),
      item("mock-li-3-5", "Interior doors (2) allowance", "Replace two swollen solid-core doors and hardware.", 2, 650),
    ],
  },
  {
    id: "mock-quote-4",
    clientId: "mock-client-4",
    quoteNumber: "1055",
    quoteStatus: "draft",
    title: "Guest bath refresh",
    createdAt: "2026-11-12T21:00:00Z",
    updatedAt: "2026-11-12T21:00:00Z",
    jobberWebUri: null,
    amounts: { total: 14300 },
    property: { address: { street: "2210 Fictional Pine St", city: "Spring", province: "TX", postalCode: "77373" } },
    lineItems: [
      item("mock-li-4-1", "Tub surround tile allowance", "Subway tile, approx. 75 sq ft.", 75, 8),
      item("mock-li-4-2", "Vanity and top allowance", "36 in vanity with integrated top.", 1, 1400),
      item("mock-li-4-3", "Mirror and accessories", "Mirror, towel bar, ring, and paper holder.", 1, 420),
      item("mock-li-4-4", "Labor", "Installation and finish carpentry.", 1, 6200),
    ],
  },
  {
    id: "mock-quote-5",
    clientId: "mock-client-5",
    quoteNumber: "1058",
    quoteStatus: "changes_requested",
    title: "Whole-home interior paint and flooring",
    createdAt: "2026-11-14T17:20:00Z",
    updatedAt: "2026-11-16T12:00:00Z",
    jobberWebUri: null,
    amounts: { total: 29750 },
    property: { address: { street: "17 Demo Hollow Ct", city: "The Woodlands", province: "TX", postalCode: "77380" } },
    lineItems: [
      item("mock-li-5-1", "Engineered hardwood flooring allowance", "Living, dining, and hallway, approx. 1,150 sq ft.", 1150, 6.5),
      item("mock-li-5-2", "Interior paint - walls, trim, doors", "Main floor and stairwell.", 1, 8900),
      item("mock-li-5-3", "Baseboard replacement", "5-1/4 in MDF base, paint grade.", 420, 4.75),
    ],
  },
];

export const MOCK_QUOTES: QuoteNode[] = FIXTURE_QUOTES.map(({ clientId, lineItems, ...quote }) => {
  const client = MOCK_CLIENTS.find((c) => c.id === clientId);
  if (!client) throw new Error(`Fixture client ${clientId} missing`);
  return {
    ...quote,
    client: { ...client, clientProperties: undefined },
    lineItems: { nodes: lineItems, pageInfo: { hasNextPage: false, endCursor: null } },
  };
});
