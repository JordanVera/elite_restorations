import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { addressForJobber, buildClientInput, buildContactClientInput, buildInboundRequestInput, buildRequestInput, formatUsPhone, phoneLast10, splitName, splitPhoneExtension, WEBSITE_SOURCE, type EstimateForJobber } from "./map";
import { anyKeyMatches, codeChallenge, createOAuthHandoff, keysMatch, readOAuthHandoff, signOAuthHandoff, statesMatch } from "./oauth-state";

const lead: EstimateForJobber = {
  name: "Ada Stone",
  email: "ada@example.com",
  phone: "(713) 555-0100",
  address: "77082",
  service: "storm-hail",
  claim: "yes",
  carrier: "State Farm",
  contactMethod: "phone",
  message: "Hail on the south slope.",
  pageUrl: "https://eliterestorations.com/contact?utm_source=google",
};

describe("Jobber lead mapping", () => {
  it("splits a single name into a last name Jobber will accept", () => {
    assert.deepEqual(splitName("Ada"), { firstName: "Ada", lastName: "Ada" });
    assert.deepEqual(splitName("Ada Stone"), { firstName: "Ada", lastName: "Stone" });
  });

  it("keeps a ZIP out of the street line", () => {
    assert.deepEqual(addressForJobber("77082"), { postalCode: "77082", country: "US" });
    assert.deepEqual(addressForJobber("511 Crestwater Ct"), { street1: "511 Crestwater Ct", country: "US" });
  });

  it("builds a client with phone, email, and property", () => {
    const input = buildClientInput(lead);
    assert.equal(input.firstName, "Ada");
    assert.equal(input.lastName, "Stone");
    assert.deepEqual(input.phones, [{ number: "(713) 555-0100", description: "MAIN", primary: true, smsAllowed: false }]);
    assert.deepEqual(input.emails, [{ address: "ada@example.com", description: "MAIN", primary: true }]);
    assert.deepEqual(input.properties, [{ address: { postalCode: "77082", country: "US" } }]);
  });

  it("puts the website source on the request because requestCreate has no source argument", () => {
    const input = buildRequestInput(lead, "client-1", "property-1");
    assert.equal(input.clientId, "client-1");
    assert.equal(input.propertyId, "property-1");
    assert.equal(input.title, `${WEBSITE_SOURCE} · Storm or hail damage`);
    assert.equal("source" in input, false);
    const items = input.requestDetails.form.sections[0].items;
    assert.equal(input.requestDetails.form.sections[0].label, WEBSITE_SOURCE);
    assert.deepEqual(
      items.map((item) => item.label),
      ["Service", "Message", "Insurance claim", "Insurance carrier", "Source", "Preferred contact", "Page"],
    );
    assert.equal(items.find((item) => item.label === "Source")?.answerText, WEBSITE_SOURCE);
    assert.equal(items.find((item) => item.label === "Insurance claim")?.answerText, "Yes");
  });

  it("matches a phone on the last 10 digits", () => {
    assert.equal(phoneLast10("+1 (713) 555-0100"), "7135550100");
    assert.equal(phoneLast10("555-0100"), "");
    assert.equal(formatUsPhone("17135550100"), "(713) 555-0100");
    assert.deepEqual(splitPhoneExtension("+1 (713) 555-0148 x12"), { phone: "+1 (713) 555-0148", extension: "12" });
  });

  it("omits a property when an inbound lead has no address", () => {
    const input = buildContactClientInput({
      name: "(713) 555-0148",
      email: "",
      phone: "(713) 555-0148",
      address: "",
      smsAllowed: true,
    });
    assert.equal(input.properties, undefined);
    assert.equal(input.emails, undefined);
    assert.equal(input.firstName, "(713)");
    assert.equal(input.lastName, "555-0148");
  });

  it("puts Source on an inbound request without the website service enums", () => {
    const input = buildInboundRequestInput({
      clientId: "client-1",
      propertyId: "property-1",
      title: "Google Voice text",
      sourceLabel: "Google Voice text",
      notes: [{ label: "Message", answerText: "The roof is leaking." }],
    });
    assert.equal(input.title, "Google Voice text");
    assert.equal(input.propertyId, "property-1");
    assert.equal("source" in input, false);
    const items = input.requestDetails.form.sections[0].items;
    assert.deepEqual(
      items.map((item) => item.label),
      ["Message", "Source"],
    );
    assert.equal(items.find((item) => item.label === "Source")?.answerText, "Google Voice text");
  });
});

describe("Jobber OAuth state", () => {
  it("signs a handoff and rejects a tampered cookie", () => {
    const handoff = createOAuthHandoff(1_000_000);
    const secret = "test-secret";
    const signed = signOAuthHandoff(handoff, secret);
    assert.deepEqual(readOAuthHandoff(signed, secret, handoff.exp - 1), handoff);
    assert.equal(readOAuthHandoff(signed, "other-secret", handoff.exp - 1), null);
    assert.equal(readOAuthHandoff(`${signed}x`, secret, handoff.exp - 1), null);
    assert.equal(readOAuthHandoff(signed, secret, handoff.exp + 1), null);
    assert.equal(statesMatch(handoff.state, handoff.state), true);
    assert.equal(statesMatch(handoff.state, "different"), false);
    assert.equal(keysMatch("owner-key", "owner-key"), true);
    assert.equal(keysMatch("owner-key", "other-key"), false);
    assert.equal(anyKeyMatches("owner-key", ["", "other-key", "owner-key"]), true);
    assert.equal(anyKeyMatches("owner-key", []), false);
    assert.equal(anyKeyMatches("", [""]), false);
  });

  it("builds an S256 challenge from the verifier", () => {
    const { verifier } = createOAuthHandoff();
    const challenge = codeChallenge(verifier);
    assert.equal(challenge.includes("="), false);
    assert.notEqual(challenge, verifier);
  });
});
