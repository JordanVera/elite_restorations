import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { parseLegacyTokens, TokenVersionConflict, type StoredTokens, type TokenRecord, type TokenStore } from "./token-store";
import {
  disconnectJobber,
  expireJobberAccessToken,
  getJobberAccessToken,
  JobberReconnectRequired,
  setJobberTokenStore,
} from "./tokens";

class MemoryStore implements TokenStore {
  record: TokenRecord | null = null;
  writes = 0;
  /** Simulates another instance writing between our read and our update. */
  interleave: (() => void) | null = null;

  async read() {
    return this.record ? structuredClone(this.record) : null;
  }
  async update(tokens: StoredTokens, expectedVersion: number) {
    this.interleave?.();
    this.interleave = null;
    if (!this.record || this.record.version !== expectedVersion) throw new TokenVersionConflict();
    this.writes += 1;
    this.record = { tokens, version: expectedVersion + 1, status: "CONNECTED" };
    return expectedVersion + 1;
  }
  async replace(tokens: StoredTokens) {
    this.writes += 1;
    this.record = { tokens, version: (this.record?.version ?? -1) + 1, status: "CONNECTED" };
  }
  async markNeedsReconnect() {
    if (this.record) this.record.status = "NEEDS_RECONNECT";
  }
  async clear() {
    this.record = null;
  }
}

const realFetch = globalThis.fetch;
let tokenCalls: URLSearchParams[] = [];

function stubTokenEndpoint(responses: Array<{ status: number; body: unknown }>) {
  tokenCalls = [];
  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    tokenCalls.push(new URLSearchParams(String(init?.body ?? "")));
    const next = responses.shift() ?? { status: 500, body: {} };
    return new Response(JSON.stringify(next.body), { status: next.status, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
}

function expired(refreshToken = "refresh-1"): TokenRecord {
  return { tokens: { accessToken: "old-access", refreshToken, accessTokenExpiresAt: Date.now() - 1000 }, version: 3, status: "CONNECTED" };
}

describe("Jobber token management", () => {
  let store: MemoryStore;

  beforeEach(() => {
    process.env.JOBBER_CLIENT_ID = "client-id";
    process.env.JOBBER_CLIENT_SECRET = "client-secret";
    store = new MemoryStore();
    setJobberTokenStore(store);
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
  });

  it("reports not connected when nothing is stored", async () => {
    await assert.rejects(getJobberAccessToken(), /not connected/);
  });

  it("returns a stored token that is still valid without refreshing", async () => {
    store.record = { tokens: { accessToken: "fresh", refreshToken: "r", accessTokenExpiresAt: Date.now() + 3_600_000 }, version: 1, status: "CONNECTED" };
    stubTokenEndpoint([]);
    assert.equal(await getJobberAccessToken(), "fresh");
    assert.equal(tokenCalls.length, 0);
  });

  it("refreshes an expired token and stores the rotated refresh token", async () => {
    store.record = expired();
    stubTokenEndpoint([{ status: 200, body: { access_token: "new-access", refresh_token: "refresh-2", expires_in: 3600 } }]);
    assert.equal(await getJobberAccessToken(), "new-access");
    assert.equal(tokenCalls[0].get("grant_type"), "refresh_token");
    assert.equal(tokenCalls[0].get("refresh_token"), "refresh-1");
    assert.equal(store.record?.tokens.refreshToken, "refresh-2");
    assert.equal(store.record?.version, 4);
  });

  it("uses the cached token on the next call", async () => {
    store.record = expired();
    stubTokenEndpoint([{ status: 200, body: { access_token: "new-access", refresh_token: "refresh-2", expires_in: 3600 } }]);
    await getJobberAccessToken();
    await getJobberAccessToken();
    assert.equal(tokenCalls.length, 1);
  });

  it("keeps the other writer's tokens on a version conflict", async () => {
    store.record = expired();
    stubTokenEndpoint([{ status: 200, body: { access_token: "ours", refresh_token: "refresh-ours", expires_in: 3600 } }]);
    store.interleave = () => {
      store.record = {
        tokens: { accessToken: "theirs", refreshToken: "refresh-theirs", accessTokenExpiresAt: Date.now() + 3_600_000 },
        version: 4,
        status: "CONNECTED",
      };
    };
    assert.equal(await getJobberAccessToken(), "theirs");
    assert.equal(store.record?.tokens.refreshToken, "refresh-theirs");
  });

  it("uses a token another instance just stored when our refresh is rejected", async () => {
    store.record = expired();
    let reads = 0;
    const read = store.read.bind(store);
    store.read = async () => {
      reads += 1;
      if (reads === 2) {
        return { tokens: { accessToken: "rotated", refreshToken: "r9", accessTokenExpiresAt: Date.now() + 3_600_000 }, version: 9, status: "CONNECTED" };
      }
      return read();
    };
    stubTokenEndpoint([{ status: 400, body: { error: "invalid_grant" } }]);
    assert.equal(await getJobberAccessToken(), "rotated");
  });

  it("marks the connection for reconnect when the refresh token is rejected", async () => {
    store.record = expired();
    stubTokenEndpoint([{ status: 400, body: { error: "invalid_grant", error_description: "refresh_token=abc expired" } }]);
    await assert.rejects(getJobberAccessToken(), JobberReconnectRequired);
    assert.equal(store.record?.status, "NEEDS_RECONNECT");
    await assert.rejects(getJobberAccessToken(), JobberReconnectRequired);
  });

  it("does not mark reconnect on a temporary server error", async () => {
    store.record = expired();
    stubTokenEndpoint([{ status: 503, body: {} }]);
    await assert.rejects(getJobberAccessToken(), /503/);
    assert.equal(store.record?.status, "CONNECTED");
  });

  it("forces a refresh after a 401 expires the cached token", async () => {
    store.record = { tokens: { accessToken: "fresh", refreshToken: "r", accessTokenExpiresAt: Date.now() + 3_600_000 }, version: 1, status: "CONNECTED" };
    stubTokenEndpoint([{ status: 200, body: { access_token: "after-401", refresh_token: "r2", expires_in: 3600 } }]);
    await getJobberAccessToken();
    expireJobberAccessToken();
    assert.equal(await getJobberAccessToken(), "after-401");
    assert.equal(tokenCalls[0].get("refresh_token"), "r");
  });

  it("uses a token another instance stored after a 401 instead of refreshing again", async () => {
    store.record = { tokens: { accessToken: "fresh", refreshToken: "r", accessTokenExpiresAt: Date.now() + 3_600_000 }, version: 1, status: "CONNECTED" };
    stubTokenEndpoint([]);
    await getJobberAccessToken();
    expireJobberAccessToken();
    store.record = { tokens: { accessToken: "rotated", refreshToken: "r2", accessTokenExpiresAt: Date.now() + 3_600_000 }, version: 2, status: "CONNECTED" };
    assert.equal(await getJobberAccessToken(), "rotated");
    assert.equal(tokenCalls.length, 0);
  });

  it("disconnect clears the stored tokens", async () => {
    store.record = expired();
    await disconnectJobber();
    await assert.rejects(getJobberAccessToken(), /not connected/);
  });
});

describe("legacy Blob token import", () => {
  it("parses the old jobber/oauth.json format", () => {
    assert.deepEqual(parseLegacyTokens('{"accessToken":"a","refreshToken":"r","accessTokenExpiresAt":5}'), {
      accessToken: "a",
      refreshToken: "r",
      accessTokenExpiresAt: 5,
    });
  });

  it("ignores unreadable or incomplete files", () => {
    assert.equal(parseLegacyTokens("not json"), null);
    assert.equal(parseLegacyTokens('{"accessToken":"a"}'), null);
    assert.equal(parseLegacyTokens('{"accessToken":"a","refreshToken":"","accessTokenExpiresAt":5}'), null);
  });
});
