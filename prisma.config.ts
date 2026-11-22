import { existsSync } from 'node:fs';
import { defineConfig } from 'prisma/config';

// Prisma 7 no longer reads .env on its own. Vercel injects env vars directly.
for (const file of ['.env.local', '.env']) {
  if (existsSync(file)) process.loadEnvFile(file);
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    // react-server makes the "server-only" guard a no-op outside Next.
    seed: 'tsx --conditions=react-server prisma/seed.ts',
  },
  datasource: {
    // Migrations need a direct (unpooled) connection when Neon provides one.
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? '',
  },
});
