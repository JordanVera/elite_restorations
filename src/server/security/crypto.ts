import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const ENCRYPTION_KEY_MISSING = "Encryption not configured (APP_ENCRYPTION_KEY missing or not 32 bytes)";

type Key = { id: string; bytes: Buffer };

function parseKey(raw: string | undefined): Key | null {
  const value = raw?.trim();
  if (!value) return null;
  const bytes = Buffer.from(value, "base64");
  if (bytes.length !== 32) return null;
  return { id: createHash("sha256").update(bytes).digest("hex").slice(0, 8), bytes };
}

/**
 * APP_ENCRYPTION_KEY encrypts. APP_ENCRYPTION_KEY_PREVIOUS still decrypts, so
 * the key can be rotated without losing stored tokens.
 */
export function encryptionKeysFrom(env: Record<string, string | undefined>): { current: Key; all: Key[] } {
  const current = parseKey(env.APP_ENCRYPTION_KEY);
  if (!current) throw new Error(ENCRYPTION_KEY_MISSING);
  const previous = parseKey(env.APP_ENCRYPTION_KEY_PREVIOUS);
  return { current, all: previous ? [current, previous] : [current] };
}

export function encryptionConfigured(env: Record<string, string | undefined> = process.env): boolean {
  return parseKey(env.APP_ENCRYPTION_KEY) !== null;
}

/** AES-256-GCM. Output: v1.<keyId>.<iv>.<tag>.<ciphertext>, all base64url. */
export function encryptSecret(plaintext: string, env: Record<string, string | undefined> = process.env): string {
  const { current } = encryptionKeysFrom(env);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", current.bytes, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return ["v1", current.id, iv.toString("base64url"), tag.toString("base64url"), ciphertext.toString("base64url")].join(".");
}

export function decryptSecret(payload: string, env: Record<string, string | undefined> = process.env): string {
  const parts = payload.split(".");
  if (parts.length !== 5 || parts[0] !== "v1") throw new Error("Encrypted value is malformed.");
  const [, keyId, iv, tag, ciphertext] = parts;
  const key = encryptionKeysFrom(env).all.find((candidate) => candidate.id === keyId);
  if (!key) throw new Error("Encrypted value uses an unknown key.");
  const decipher = createDecipheriv("aes-256-gcm", key.bytes, Buffer.from(iv, "base64url"));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([decipher.update(Buffer.from(ciphertext, "base64url")), decipher.final()]).toString("utf8");
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** URL-safe random token. 32 bytes gives 256 bits of entropy. */
export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function safeEqual(a: string, b: string): boolean {
  const left = createHash("sha256").update(a).digest();
  const right = createHash("sha256").update(b).digest();
  return timingSafeEqual(left, right);
}
