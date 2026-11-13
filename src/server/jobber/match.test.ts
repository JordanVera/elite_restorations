import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  COMPANY_EMAILS,
  COMPANY_PHONES,
  clientSearchTerms,
  isCompanyEmail,
  isCompanyPhone,
  matchesLead,
} from "./match";

const officeClient = {
  emails: COMPANY_EMAILS.map((address) => ({ address })),
  phones: COMPANY_PHONES.map((number) => ({ number, normalizedPhoneNumber: number })),
};

describe("company denylist", () => {
  it("does not match a lead that only has the office email and phone", () => {
    const lead = { email: "Admin@EliteRestorations.com", phone: "1-713-909-0034" };
    assert.equal(matchesLead(officeClient, lead), false);
    assert.deepEqual(clientSearchTerms(lead), []);
    assert.equal(isCompanyEmail(lead.email), true);
    assert.equal(isCompanyPhone(lead.phone), true);
  });

  it("covers every office number and mailbox", () => {
    for (const phone of COMPANY_PHONES) {
      assert.equal(matchesLead(officeClient, { phone, email: "" }), false, phone);
      assert.deepEqual(clientSearchTerms({ phone }), []);
    }
    for (const email of COMPANY_EMAILS) {
      assert.equal(matchesLead(officeClient, { email, phone: "" }), false, email);
      assert.deepEqual(clientSearchTerms({ email }), []);
    }
  });

  it("matches a real phone on the last 10 digits and ignores the office email on the same lead", () => {
    const customer = {
      emails: [{ address: "ada@example.com" }],
      phones: [{ number: "(713) 555-0148", normalizedPhoneNumber: "+17135550148" }],
    };
    const lead = { email: "george@eliterestorations.com", phone: "+1 (713) 555-0148" };
    assert.equal(matchesLead(customer, lead), true);
    assert.equal(matchesLead(officeClient, lead), false);
    assert.deepEqual(clientSearchTerms(lead), ["+1 (713) 555-0148", "7135550148"]);
  });

  it("matches a non-office email when the phone is an office line", () => {
    const customer = {
      emails: [{ address: "ada@example.com" }],
      phones: [{ number: "(713) 555-0148" }],
    };
    const lead = { email: "Ada@Example.com", phone: "281-748-0227" };
    assert.equal(matchesLead(customer, lead), true);
    assert.equal(matchesLead(officeClient, lead), false);
    assert.deepEqual(clientSearchTerms(lead), ["ada@example.com"]);
  });
});
