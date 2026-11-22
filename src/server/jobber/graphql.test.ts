import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { backoffMs, jobberGraphql, JobberApiError, paginate, throttleWaitMs } from "./graphql";
import type { StoredTokens, TokenRecord, TokenStore } from "./token-store";
import { resetJobberTokenMemory, setJobberTokenStore } from "./tokens";

class MemoryStore implements TokenStore {
  record: TokenRecord | null = {
    tokens: { accessToken: "access-1", refreshToken: "refresh-1", accessTokenExpiresAt: Date.now() + 3_600_000 },
    version: 1,
    status: "CONNECTED",
  };
  async read() {
    return this.record ? structuredClone(this.record) : null;
  }
  async update(tokens: StoredTokens, expectedVersion: number) {
    this.record = { tokens, version: expectedVersion + 1, status: "CONNECTED" };
    return expectedVersion + 1;
  }
  async replace(tokens: StoredTokens) {
    this.record = { tokens, version: 1, status: "CONNECTED" };
  }
  async markNeedsReconnect() {}
  async clear() {
    this.record = null;
  }
}

type Reply = { status: number; body: unknown } | Error;

const realFetch = globalThis.fetch;
let calls: { url: string; headers: Headers; body: { query: string; variables: Record<string, unknown> } }[] = [];

function stubFetch(replies: Reply[]) {
  calls = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const href = String(url);
    if (href.includes("/oauth/token")) {
      return Response.json({ access_token: "access-2", refresh_token: "refresh-2", expires_in: 3600 });
    }
    calls.push({ url: href, headers: new Headers(init?.headers), body: JSON.parse(String(init?.body)) });
    const next = replies.shift() ?? { status: 500, body: {} };
    if (next instanceof Error) throw next;
    return Response.json(next.body, { status: next.status });
  }) as typeof fetch;
}

const sleeps: number[] = [];
const sleep = async (ms: number) => {
  sleeps.push(ms);
};

describe("jobberGraphql", () => {
  beforeEach(() => {
    process.env.JOBBER_CLIENT_ID = "test-client";
    process.env.JOBBER_CLIENT_SECRET = "test-secret";
    resetJobberTokenMemory();
    setJobberTokenStore(new MemoryStore());
    sleeps.length = 0;
  });
  afterEach(() => {
    globalThis.fetch = realFetch;
    setJobberTokenStore(null);
  });

  it("sends the bearer token and the API version header", async () => {
    stubFetch([{ status: 200, body: { data: { account: { id: "a" } } } }]);
    const data = await jobberGraphql<{ account: { id: string } }>("query { account { id } }", {}, { sleep });
    assert.equal(data.account.id, "a");
    assert.equal(calls[0].headers.get("authorization"), "Bearer access-1");
    assert.match(calls[0].headers.get("x-jobber-graphql-version") ?? "", /^\d{4}-\d{2}-\d{2}$/);
  });

  it("waits for the throttle bucket to refill, then retries", async () => {
    const cost = { requestedQueryCost: 1500, throttleStatus: { currentlyAvailable: 500, restoreRate: 500, maximumAvailable: 10000 } };
    stubFetch([
      { status: 200, body: { errors: [{ message: "Throttled", extensions: { code: "THROTTLED" } }], extensions: { cost } } },
      { status: 200, body: { data: { ok: true } } },
    ]);
    const data = await jobberGraphql<{ ok: boolean }>("query", {}, { sleep });
    assert.equal(data.ok, true);
    assert.equal(calls.length, 2);
    assert.equal(sleeps[0], 2250);
  });

  it("backs off on 429 and 5xx, then gives up after the retry limit", async () => {
    stubFetch([
      { status: 429, body: {} },
      { status: 503, body: {} },
      { status: 502, body: {} },
    ]);
    await assert.rejects(jobberGraphql("query", {}, { sleep, retries: 2 }), (error: unknown) => {
      assert.ok(error instanceof JobberApiError);
      assert.equal(error.retryable, true);
      return true;
    });
    assert.equal(calls.length, 3);
    assert.equal(sleeps.length, 2);
  });

  it("retries network errors", async () => {
    stubFetch([new TypeError("fetch failed"), { status: 200, body: { data: { ok: 1 } } }]);
    const data = await jobberGraphql<{ ok: number }>("query", {}, { sleep });
    assert.equal(data.ok, 1);
  });

  it("refreshes the token once on 401", async () => {
    stubFetch([
      { status: 401, body: {} },
      { status: 200, body: { data: { ok: true } } },
    ]);
    await jobberGraphql("query", {}, { sleep });
    assert.equal(calls[1].headers.get("authorization"), "Bearer access-2");
  });

  it("does not retry GraphQL validation errors", async () => {
    stubFetch([{ status: 200, body: { errors: [{ message: "Field 'nope' doesn't exist on type 'Quote'" }] } }]);
    await assert.rejects(jobberGraphql("query", {}, { sleep }), /doesn't exist/);
    assert.equal(calls.length, 1);
  });

  it("paginates with cursors and stops at maxPages with a resumable cursor", async () => {
    const page = (ids: string[], next: string | null) => ({
      status: 200,
      body: { data: { clients: { nodes: ids.map((id) => ({ id })), pageInfo: { hasNextPage: Boolean(next), endCursor: next } } } },
    });
    stubFetch([page(["1", "2"], "c1"), page(["3"], "c2")]);
    const pick = (data: { clients: { nodes: { id: string }[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } } }) => data.clients;
    const first = await paginate("query", { first: 2 }, pick, { sleep, maxPages: 2 });
    assert.deepEqual(first.nodes.map((n) => n.id), ["1", "2", "3"]);
    assert.equal(first.done, false);
    assert.equal(first.cursor, "c2");
    assert.equal(calls[0].body.variables.after, null);
    assert.equal(calls[1].body.variables.after, "c1");

    stubFetch([page(["4"], null)]);
    const rest = await paginate("query", { first: 2 }, pick, { sleep, startCursor: first.cursor });
    assert.equal(rest.done, true);
    assert.equal(calls[0].body.variables.after, "c2");
  });
});

describe("rate limit math", () => {
  it("computes the wait from the deficit and restore rate", () => {
    assert.equal(throttleWaitMs({ requestedQueryCost: 1000, throttleStatus: { currentlyAvailable: 1000, restoreRate: 500 } }), 250);
    assert.equal(throttleWaitMs(undefined), 250);
    assert.equal(throttleWaitMs({ requestedQueryCost: 100000, throttleStatus: { currentlyAvailable: 0, restoreRate: 500 } }), 20000);
  });

  it("grows backoff exponentially with bounded jitter", () => {
    assert.equal(backoffMs(0, () => 0.5), 500);
    assert.equal(backoffMs(2, () => 0.5), 2000);
    assert.equal(backoffMs(10, () => 1), 20000);
  });
});
