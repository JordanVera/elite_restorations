import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import test from "node:test";

import { decryptSecret, encryptionConfigured, encryptSecret, randomToken, sha256 } from "@/server/security/crypto";

const keyA = randomBytes(32).toString("base64");
const keyB = randomBytes(32).toString("base64");

test("encrypts and decrypts a secret", () => {
  const env = { APP_ENCRYPTION_KEY: keyA };
  const payload = encryptSecret("refresh-token-value", env);
  assert.ok(payload.startsWith("v1."));
  assert.ok(!payload.includes("refresh-token-value"));
  assert.equal(decryptSecret(payload, env), "refresh-token-value");
});

test("each encryption uses a fresh IV", () => {
  const env = { APP_ENCRYPTION_KEY: keyA };
  assert.notEqual(encryptSecret("same", env), encryptSecret("same", env));
});

test("tampered ciphertext is rejected", () => {
  const env = { APP_ENCRYPTION_KEY: keyA };
  const parts = encryptSecret("secret", env).split(".");
  const body = Buffer.from(parts[4], "base64url");
  body[0] ^= 1;
  parts[4] = body.toString("base64url");
  assert.throws(() => decryptSecret(parts.join("."), env));
});

test("the previous key still decrypts after rotation", () => {
  const old = encryptSecret("rotate me", { APP_ENCRYPTION_KEY: keyA });
  const rotated = { APP_ENCRYPTION_KEY: keyB, APP_ENCRYPTION_KEY_PREVIOUS: keyA };
  assert.equal(decryptSecret(old, rotated), "rotate me");
  assert.throws(() => decryptSecret(old, { APP_ENCRYPTION_KEY: keyB }), /unknown key/);
});

test("missing or short keys are refused", () => {
  assert.equal(encryptionConfigured({}), false);
  assert.equal(encryptionConfigured({ APP_ENCRYPTION_KEY: Buffer.alloc(16).toString("base64") }), false);
  assert.throws(() => encryptSecret("x", {}), /APP_ENCRYPTION_KEY/);
});

test("random tokens are long and URL safe", () => {
  const token = randomToken();
  assert.match(token, /^[A-Za-z0-9_-]{43}$/);
  assert.notEqual(token, randomToken());
  assert.match(sha256(token), /^[0-9a-f]{64}$/);
});
