import "server-only";

import { BlobNotFoundError, del, get } from "@vercel/blob";

import { databaseConfigured, db } from "@/server/db/client";
import { TOKEN_PATH } from "@/server/jobber/config";
import { decryptSecret, encryptionConfigured, encryptSecret } from "@/server/security/crypto";

export type StoredTokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
};

export type TokenRecord = {
  tokens: StoredTokens;
  version: number;
  status: "CONNECTED" | "NEEDS_RECONNECT" | "DISCONNECTED";
};

export type ConnectionMeta = { scopes?: string | null; accountId?: string | null; accountName?: string | null };

export interface TokenStore {
  read(): Promise<TokenRecord | null>;
  /** Writes only when the stored version still equals expectedVersion. Returns the new version. */
  update(tokens: StoredTokens, expectedVersion: number): Promise<number>;
  /** Unconditional write after a fresh OAuth approval. */
  replace(tokens: StoredTokens, meta?: ConnectionMeta): Promise<void>;
  markNeedsReconnect(reason: string): Promise<void>;
  clear(): Promise<void>;
}

export class TokenVersionConflict extends Error {
  constructor() {
    super("Jobber tokens were updated by another request.");
    this.name = "TokenVersionConflict";
  }
}

/** Thrown when the database or encryption key is missing. Lead intake treats this as not configured. */
export const JOBBER_TOKEN_STORE_MISSING =
  "Jobber token store not configured (DATABASE_URL or APP_ENCRYPTION_KEY missing)";

const ROW_ID = "jobber";

function assertConfigured() {
  if (!databaseConfigured() || !encryptionConfigured()) throw new Error(JOBBER_TOKEN_STORE_MISSING);
}

function isMissingBlob(error: unknown): boolean {
  if (error instanceof BlobNotFoundError) return true;
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return message.includes("not_found") || /\bnot found\b/.test(message);
}

export function parseLegacyTokens(text: string): StoredTokens | null {
  try {
    const parsed = JSON.parse(text) as Partial<StoredTokens>;
    if (
      typeof parsed.accessToken !== "string" ||
      typeof parsed.refreshToken !== "string" ||
      typeof parsed.accessTokenExpiresAt !== "number" ||
      !parsed.refreshToken
    ) {
      return null;
    }
    return {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
      accessTokenExpiresAt: parsed.accessTokenExpiresAt,
    };
  } catch {
    return null;
  }
}

/**
 * Tokens used to live in the private Blob file jobber/oauth.json. The first
 * read after the move copies them into Postgres (encrypted) and deletes the
 * file, so an existing connection keeps working without a reconnect.
 */
async function readLegacyBlobTokens(): Promise<StoredTokens | null> {
  const token = process.env.JOBBER_BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return null;
  try {
    const result = await get(TOKEN_PATH, { access: "private", token, useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return parseLegacyTokens(await new Response(result.stream).text());
  } catch (error) {
    if (!isMissingBlob(error)) console.error("[jobber] legacy token import skipped", error instanceof Error ? error.name : "error");
    return null;
  }
}

async function deleteLegacyBlobTokens(): Promise<void> {
  const token = process.env.JOBBER_BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return;
  await del(TOKEN_PATH, { token }).catch(() => undefined);
}

export const databaseTokenStore: TokenStore = {
  async read() {
    assertConfigured();
    const row = await db().jobberConnection.findUnique({ where: { id: ROW_ID } });
    if (row) {
      if (row.status === "DISCONNECTED") return null;
      return {
        tokens: {
          accessToken: decryptSecret(row.accessTokenEncrypted),
          refreshToken: decryptSecret(row.refreshTokenEncrypted),
          accessTokenExpiresAt: row.accessTokenExpiresAt.getTime(),
        },
        version: row.version,
        status: row.status,
      };
    }

    const legacy = await readLegacyBlobTokens();
    if (!legacy) return null;
    try {
      await db().jobberConnection.create({
        data: {
          id: ROW_ID,
          accessTokenEncrypted: encryptSecret(legacy.accessToken),
          refreshTokenEncrypted: encryptSecret(legacy.refreshToken),
          accessTokenExpiresAt: new Date(legacy.accessTokenExpiresAt),
          status: "CONNECTED",
        },
      });
    } catch {
      // Another request imported it first. Read that row instead.
      const again = await db().jobberConnection.findUnique({ where: { id: ROW_ID } });
      if (!again) throw new Error("Stored Jobber tokens could not be imported.");
      return databaseTokenStore.read();
    }
    await deleteLegacyBlobTokens();
    console.info("[jobber] imported tokens from the private Blob store into the database");
    return { tokens: legacy, version: 0, status: "CONNECTED" };
  },

  async update(tokens, expectedVersion) {
    assertConfigured();
    const result = await db().jobberConnection.updateMany({
      where: { id: ROW_ID, version: expectedVersion },
      data: {
        accessTokenEncrypted: encryptSecret(tokens.accessToken),
        refreshTokenEncrypted: encryptSecret(tokens.refreshToken),
        accessTokenExpiresAt: new Date(tokens.accessTokenExpiresAt),
        status: "CONNECTED",
        lastError: null,
        version: { increment: 1 },
      },
    });
    if (result.count === 0) throw new TokenVersionConflict();
    return expectedVersion + 1;
  },

  async replace(tokens, meta) {
    assertConfigured();
    const data = {
      accessTokenEncrypted: encryptSecret(tokens.accessToken),
      refreshTokenEncrypted: encryptSecret(tokens.refreshToken),
      accessTokenExpiresAt: new Date(tokens.accessTokenExpiresAt),
      status: "CONNECTED" as const,
      lastError: null,
      connectedAt: new Date(),
      ...(meta?.scopes !== undefined ? { scopes: meta.scopes } : {}),
      ...(meta?.accountId !== undefined ? { accountId: meta.accountId } : {}),
      ...(meta?.accountName !== undefined ? { accountName: meta.accountName } : {}),
    };
    await db().jobberConnection.upsert({
      where: { id: ROW_ID },
      create: { id: ROW_ID, ...data },
      update: { ...data, version: { increment: 1 } },
    });
    await deleteLegacyBlobTokens();
  },

  async markNeedsReconnect(reason) {
    assertConfigured();
    await db().jobberConnection.updateMany({
      where: { id: ROW_ID },
      data: { status: "NEEDS_RECONNECT", lastError: reason.slice(0, 300) },
    });
  },

  async clear() {
    assertConfigured();
    await db().jobberConnection.deleteMany({ where: { id: ROW_ID } });
    await deleteLegacyBlobTokens();
  },
};

export async function updateConnectionMeta(meta: ConnectionMeta): Promise<void> {
  assertConfigured();
  await db().jobberConnection.updateMany({ where: { id: ROW_ID }, data: meta });
}

export async function readConnectionSummary() {
  if (!databaseConfigured()) return null;
  return db().jobberConnection.findUnique({
    where: { id: ROW_ID },
    select: {
      status: true,
      scopes: true,
      accountId: true,
      accountName: true,
      lastError: true,
      connectedAt: true,
      updatedAt: true,
      accessTokenExpiresAt: true,
    },
  });
}
