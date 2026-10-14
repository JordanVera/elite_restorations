# Renovation Opportunity Finder

Staff desk: `/admin/renovation-opportunities`.

## Access checklist

1. Install the Vercel CLI (`npm i -g vercel`) and link this project.
2. Provision Neon Postgres with `vercel integration add neon`, then `vercel env pull .env.local --yes`. Production uses the Neon driver. A non-Neon `DATABASE_URL`, including `npx prisma dev`, uses the standard Postgres driver.
3. Apply migrations with `npm run db:migrate`.
4. Provision Clerk with `vercel integration add clerk`. Disable public sign-up, invite staff, and set `ADMIN_EMAILS` to those addresses.
5. Create a private Blob store with `vercel blob create-store renovation-opportunities --access private` and put its token in `OPPORTUNITY_BLOB_READ_WRITE_TOKEN`. Leave the public lead-photo store unchanged.
6. Set `OPENAI_API_KEY`. Confirm the OpenAI organization can use GPT Image models. On Vercel, vision calls can use AI Gateway OIDC. Image concepts use `POST /v1/images/edits`.
7. HAR search needs a Repliers key tied to a named HAR broker, agent, or vendor MLS license. Set `REPLIERS_STORAGE_AUTHORIZED`, `REPLIERS_AI_PROCESSING_AUTHORIZED`, `REPLIERS_DERIVATIVE_IMAGES_AUTHORIZED`, and `REPLIERS_EXPORT_AUTHORIZED` to `authorized` only after written permission exists. The flags do not create that permission.
8. Zillow stays disabled. A pasted Zillow or HAR URL is a reference key and is not fetched.

Until the database exists, the desk shows what is missing. Import and the demo dataset work without Repliers. OpenAI and private storage are required before concept images are saved.

## Worker

Runs are Vercel Workflows, configured by `withWorkflow` in `next.config.ts`. The browser only starts, cancels, or resumes a run. Locally, `npm run dev` executes the workflow, and `npx workflow inspect runs` shows it. Do not start a full paid generation while checking the setup. Load the demo dataset first. It uses company project photos and fictional addresses, and it is labeled as a demo.

## Local development before Clerk

On localhost only, `OPPORTUNITY_DEV_AUTH=you@company.com` signs the desk in as that email. Production ignores it.
