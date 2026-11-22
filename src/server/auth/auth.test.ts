import assert from "node:assert/strict";
import test from "node:test";

import { hashPassword, passwordProblem, verifyPassword } from "@/server/auth/password";
import {
  can,
  LOGIN_MAX_FAILURES,
  loginBlocked,
  loginKeys,
  newSessionTimes,
  safeAdminRedirect,
  SESSION_ABSOLUTE_MS,
  SESSION_IDLE_MS,
  sessionCookieName,
  sessionIsValid,
  sessionNeedsTouch,
} from "@/server/auth/policy";

const FAST = { N: 2 ** 10, r: 8, p: 1 };

test("password hashes verify and reject the wrong password", async () => {
  const hash = await hashPassword("correct horse battery", FAST);
  assert.match(hash, /^scrypt\$1024\$8\$1\$/);
  assert.equal(await verifyPassword("correct horse battery", hash), true);
  assert.equal(await verifyPassword("correct horse batterz", hash), false);
});

test("default scrypt parameters meet the OWASP minimum", async () => {
  const hash = await hashPassword("a long enough password");
  const [, N, r, p] = hash.split("$").map(Number);
  assert.ok(N >= 2 ** 17 && r >= 8 && p >= 1);
  assert.equal(await verifyPassword("a long enough password", hash), true);
});

test("two hashes of the same password use different salts", async () => {
  const a = await hashPassword("same password here", FAST);
  const b = await hashPassword("same password here", FAST);
  assert.notEqual(a, b);
});

test("malformed stored hashes never verify", async () => {
  assert.equal(await verifyPassword("x", "plaintext"), false);
  assert.equal(await verifyPassword("x", "scrypt$abc$8$1$salt$hash"), false);
  assert.equal(await verifyPassword("x", "bcrypt$1$2$3$4$5"), false);
});

test("password rules", () => {
  assert.ok(passwordProblem("short"));
  assert.ok(passwordProblem("aaaaaaaaaaaaaaaa"));
  assert.equal(passwordProblem("a reasonable passphrase"), null);
});

test("sessions expire after the idle timeout", () => {
  const start = new Date("2026-01-01T00:00:00Z");
  const session = newSessionTimes(start);
  assert.equal(sessionIsValid(session, new Date(start.getTime() + SESSION_IDLE_MS - 1)), true);
  assert.equal(sessionIsValid(session, new Date(start.getTime() + SESSION_IDLE_MS)), false);
});

test("sessions expire at the absolute limit even when active", () => {
  const start = new Date("2026-01-01T00:00:00Z");
  const session = newSessionTimes(start);
  const nearEnd = new Date(start.getTime() + SESSION_ABSOLUTE_MS - 1000);
  assert.equal(sessionIsValid({ ...session, lastSeenAt: nearEnd }, nearEnd), true);
  const end = new Date(start.getTime() + SESSION_ABSOLUTE_MS);
  assert.equal(sessionIsValid({ ...session, lastSeenAt: end }, end), false);
});

test("lastSeenAt is only touched every few minutes", () => {
  const start = new Date("2026-01-01T00:00:00Z");
  const session = newSessionTimes(start);
  assert.equal(sessionNeedsTouch(session, new Date(start.getTime() + 60_000)), false);
  assert.equal(sessionNeedsTouch(session, new Date(start.getTime() + 6 * 60_000)), true);
});

test("production cookie uses the __Host- prefix", () => {
  assert.equal(sessionCookieName(true), "__Host-er_admin");
  assert.equal(sessionCookieName(false), "er_admin");
});

test("staff cannot see financials or manage integrations and users", () => {
  assert.equal(can("ADMIN", "view_financials"), true);
  assert.equal(can("ADMIN", "manage_users"), true);
  assert.equal(can("STAFF", "view_financials"), false);
  assert.equal(can("STAFF", "manage_integrations"), false);
  assert.equal(can("STAFF", "manage_users"), false);
  assert.equal(can("STAFF", "manage_categories"), false);
  assert.equal(can("STAFF", "review_selections"), true);
  assert.equal(can("STAFF", "manage_portals"), true);
});

test("login is limited per IP and per email", () => {
  assert.deepEqual(loginKeys("1.2.3.4", " Admin@Example.com "), ["ip:1.2.3.4", "email:admin@example.com"]);
  assert.equal(loginBlocked(LOGIN_MAX_FAILURES - 1), false);
  assert.equal(loginBlocked(LOGIN_MAX_FAILURES), true);
});

test("post-login redirects stay inside /admin", () => {
  assert.equal(safeAdminRedirect("/admin/quotes?q=1"), "/admin/quotes?q=1");
  assert.equal(safeAdminRedirect("https://evil.example"), "/admin");
  assert.equal(safeAdminRedirect("//evil.example/admin"), "/admin");
  assert.equal(safeAdminRedirect("/admin\\@evil"), "/admin");
  assert.equal(safeAdminRedirect("/admin/login"), "/admin");
  assert.equal(safeAdminRedirect(null), "/admin");
});
