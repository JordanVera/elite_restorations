import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createContext } from "./init";
import { appRouter } from "./router";

async function submit(input: Record<string, unknown>) {
  const req = new Request("http://localhost/api/trpc/contact.submit?batch=1", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ 0: { json: input } }),
  });
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
  });
  const body = (await response.json()) as {
    error?: { json?: { message?: string; data?: { code?: string; httpStatus?: number } } };
  }[];
  return { status: response.status, error: body[0]?.error?.json };
}

describe("contact.submit", () => {
  it("returns 400 and does not accept a lead without a name and phone", async () => {
    const result = await submit({
      path: "estimate",
      name: " ",
      phone: "(713) 909",
      email: "",
      address: "77082",
      service: "storm-hail",
      claim: "no",
      contactMethod: "phone",
      message: "",
      website: "",
      startedAt: Date.now() - 5_000,
    });

    assert.equal(result.status, 400);
    assert.equal(result.error?.data?.httpStatus, 400);
    assert.equal(result.error?.data?.code, "BAD_REQUEST");
    assert.match(result.error?.message ?? "", /at least 2 characters/);
    assert.match(result.error?.message ?? "", /at least 10 digits/);
  });
});
