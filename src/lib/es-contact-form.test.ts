import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

describe("Spanish contact form", () => {
  it("posts through the same lead form and tRPC route as English", () => {
    const spanish = readFileSync("src/app/es/contact/page.tsx", "utf8");
    const english = readFileSync("src/app/contact/page.tsx", "utf8");
    const form = readFileSync("src/components/lead-form.tsx", "utf8");
    const client = readFileSync("src/trpc/client.ts", "utf8");
    assert.match(spanish, /<LeadForm/);
    assert.match(english, /<LeadForm/);
    assert.match(form, /trpc\.contact\.submit\.mutate/);
    assert.match(client, /url:\s*"\/api\/trpc"/);
  });
});
