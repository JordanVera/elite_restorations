/**
 * Creates or resets an admin account. There is no public sign-up.
 *
 *   npm run admin:create -- --email you@eliterestorations.com --name "Your Name" [--role ADMIN|STAFF]
 *
 * The password is read from ADMIN_PASSWORD when set, otherwise prompted
 * without echo. It is never accepted as a command-line argument, so it does
 * not end up in shell history.
 */
import { existsSync } from "node:fs";
import { stdin, stdout } from "node:process";
import { parseArgs } from "node:util";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaNeon } from "@prisma/adapter-neon";

import { hashPassword, passwordProblem } from "../src/server/auth/password";
import { PrismaClient } from "../src/server/db/generated/client";

for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}

function readHidden(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    stdout.write(prompt);
    let value = "";
    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    const onData = (chunk: string) => {
      for (const char of chunk) {
        if (char === "\r" || char === "\n" || char === "\u0004") {
          stdin.setRawMode?.(false);
          stdin.pause();
          stdin.off("data", onData);
          stdout.write("\n");
          resolve(value);
          return;
        }
        if (char === "\u0003") process.exit(130);
        if (char === "\u007f") value = value.slice(0, -1);
        else value += char;
      }
    };
    stdin.on("data", onData);
  });
}

async function main() {
  const { values } = parseArgs({
    options: {
      email: { type: "string" },
      name: { type: "string" },
      role: { type: "string", default: "ADMIN" },
    },
  });
  const email = values.email?.trim().toLowerCase();
  const name = values.name?.trim();
  const role = values.role?.toUpperCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !name) {
    console.error('Usage: npm run admin:create -- --email you@example.com --name "Your Name" [--role ADMIN|STAFF]');
    process.exit(1);
  }
  if (role !== "ADMIN" && role !== "STAFF") {
    console.error("--role must be ADMIN or STAFF.");
    process.exit(1);
  }

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error("DATABASE_URL is not set. Run `vercel env pull .env.local` or add it to .env.local.");
    process.exit(1);
  }

  let password = process.env.ADMIN_PASSWORD ?? "";
  if (!password) {
    password = await readHidden("Password: ");
    const confirm = await readHidden("Confirm password: ");
    if (password !== confirm) {
      console.error("Passwords do not match.");
      process.exit(1);
    }
  }
  const problem = passwordProblem(password);
  if (problem) {
    console.error(problem);
    process.exit(1);
  }

  const adapter = new URL(url).hostname.endsWith(".neon.tech")
    ? new PrismaNeon({ connectionString: url })
    : new PrismaPg(url);
  const prisma = new PrismaClient({ adapter });
  try {
    const passwordHash = await hashPassword(password);
    const user = await prisma.adminUser.upsert({
      where: { email },
      create: { email, name, role, passwordHash },
      update: { name, role, passwordHash, active: true },
    });
    // A reset signs the account out everywhere.
    await prisma.adminSession.deleteMany({ where: { userId: user.id } });
    await prisma.activityLog.create({
      data: {
        actorType: "SYSTEM",
        action: "admin.account_set",
        entityType: "AdminUser",
        entityId: user.id,
        metadata: { email, role },
      },
    });
    console.log(`Saved ${role.toLowerCase()} account for ${email}.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
