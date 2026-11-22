import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { MOCK_QUOTES } from "./fixtures";
import { missingSchemaFields, REQUIRED_FIELDS } from "./queries";
import { formatAddress, mapClient, mapQuote, type QuoteNode } from "./read-map";

const quote: QuoteNode = {
  id: "Z2lkOi8vSm9iYmVyL1F1b3RlLzE=",
  quoteNumber: "77",
  quoteStatus: "awaiting_response",
  title: "  Primary   bath remodel ",
  createdAt: "2026-03-01T15:00:00Z",
  jobberWebUri: "https://secure.getjobber.com/quotes/1",
  amounts: { total: 18250.5 },
  client: { id: "client-1", name: "Test Person", email: "Test@Example.com", phone: "555-0100" },
  property: { address: { street: "100 Example St", city: "Katy", province: "TX", postalCode: "77494" } },
  lineItems: {
    nodes: [
      { id: "li-1", name: "Tile allowance", description: " Shower walls ", quantity: 1, unitPrice: 2400, totalPrice: 2400 },
      { id: "li-2", name: "Demo", quantity: null, unitPrice: Number.NaN, totalPrice: null },
    ],
    pageInfo: { hasNextPage: true, endCursor: "li-cursor" },
  },
};

describe("Jobber read mapping", () => {
  it("maps a quote, its client, and its line items", () => {
    const mapped = mapQuote(quote);
    assert.equal(mapped.quote.title, "Primary bath remodel");
    assert.equal(mapped.quote.clientJobberId, "client-1");
    assert.equal(mapped.quote.total, 18250.5);
    assert.equal(mapped.quote.propertyAddress, "100 Example St, Katy, TX 77494");
    assert.equal(mapped.quote.quoteDate?.toISOString(), "2026-03-01T15:00:00.000Z");
    assert.equal(mapped.client?.email, "test@example.com");
    assert.equal(mapped.lineItems[0].description, "Shower walls");
    assert.equal(mapped.lineItems[1].unitPrice, null);
    assert.deepEqual(mapped.lineItems.map((item) => item.sortOrder), [0, 1]);
    assert.equal(mapped.moreLineItems, "li-cursor");
  });

  it("rejects a quote without a client", () => {
    assert.throws(() => mapQuote({ ...quote, client: null }), /no client/);
  });

  it("falls back to the company name and handles missing addresses", () => {
    assert.equal(mapClient({ id: "c", name: " ", companyName: "Example Co" }).name, "Example Co");
    assert.equal(formatAddress(null), null);
    assert.equal(formatAddress({ city: "Houston" }), "Houston");
  });

  it("maps every demo fixture without real-looking contact data", () => {
    for (const node of MOCK_QUOTES) {
      const mapped = mapQuote(node);
      assert.ok(mapped.lineItems.length > 0);
      if (mapped.client?.email) assert.match(mapped.client.email, /[@.]example\.com$/);
    }
  });
});

describe("schema check", () => {
  it("reports missing types and fields", () => {
    const result: Parameters<typeof missingSchemaFields>[0] = {};
    for (const [type, fields] of Object.entries(REQUIRED_FIELDS)) {
      result[`t${type}`] = { name: type, fields: fields.map((name) => ({ name })) };
    }
    assert.deepEqual(missingSchemaFields(result), []);

    const [firstType, firstFields] = Object.entries(REQUIRED_FIELDS)[0];
    result[`t${firstType}`] = { name: firstType, fields: firstFields.slice(1).map((name) => ({ name })) };
    assert.deepEqual(missingSchemaFields(result), [`${firstType}.${firstFields[0]}`]);
  });
});
