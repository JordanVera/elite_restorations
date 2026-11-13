import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { isAddressOrZip, isUsablePhone } from "./lead-fields";
import { submitTiming } from "./lead-timing";
import { emailTransportPlan } from "../server/mail-plan";

describe("address or ZIP", () => {
  it("accepts a ZIP and a street", () => {
    assert.equal(isAddressOrZip("77082"), true);
    assert.equal(isAddressOrZip("77082-1234"), true);
    assert.equal(isAddressOrZip("511 Crestwater Ct"), true);
  });

  it("rejects a fragment", () => {
    assert.equal(isAddressOrZip("7708"), false);
    assert.equal(isAddressOrZip("Main"), false);
    assert.equal(isAddressOrZip(""), false);
  });
});

describe("phone", () => {
  it("accepts 10 digits and a leading 1", () => {
    assert.equal(isUsablePhone("(713) 909-0034"), true);
    assert.equal(isUsablePhone("1-713-909-0034"), true);
  });

  it("rejects a short number", () => {
    assert.equal(isUsablePhone("909-0034"), false);
  });
});

describe("submit timing", () => {
  const now = 1_000_000;

  it("blocks an instant post", () => {
    assert.equal(submitTiming(now - 500, now), "too-fast");
  });

  it("accepts a normal fill", () => {
    assert.equal(submitTiming(now - 5_000, now), "ok");
  });

  it("expires a day-old form", () => {
    assert.equal(submitTiming(now - 25 * 60 * 60 * 1000, now), "expired");
  });
});

describe("email transport", () => {
  it("does not use the GoDaddy gateway on Vercel", () => {
    assert.equal(
      emailTransportPlan({ VERCEL: "1", EMAIL_GATEWAY: "godaddy" }),
      "unconfigured",
    );
    assert.equal(
      emailTransportPlan({
        VERCEL: "1",
        SMTP_USER: "admin@eliterestorations.com",
        SMTP_PASS: "app-password",
      }),
      "smtp",
    );
  });

  it("keeps the gateway opt-in off Vercel", () => {
    assert.equal(emailTransportPlan({ EMAIL_GATEWAY: "godaddy" }), "gateway-then-smtp");
    assert.equal(
      emailTransportPlan({ SMTP_USER: "admin@eliterestorations.com", SMTP_PASS: "x" }),
      "smtp",
    );
    assert.equal(emailTransportPlan({}), "unconfigured");
  });
});
