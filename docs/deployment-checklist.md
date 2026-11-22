# Deployment checklist: admin dashboard and selection portal

Do these in order before the branch with `/admin` reaches Production. The public site keeps working at every step. The lead email never depends on the database or Jobber.

One thing changes for the lead flow: Jobber tokens now live in Postgres instead of Blob. Until `DATABASE_URL` and `APP_ENCRYPTION_KEY` are set in Production, the Jobber step of the lead flow is skipped (the email still sends). With both set, the existing Blob token is copied into the database automatically on first use, so no reconnect is needed.

## 1. Database

- [ ] In the Vercel project, add **Neon** from Storage / Marketplace and connect it to Production and Preview. Vercel sets `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED` (direct).
- [ ] Preview deployments should use a Neon branch, not the production database. The Neon integration can create one per preview.
- [ ] Apply migrations to production from a trusted machine:

  ```bash
  vercel env pull .env.production.local --environment=production
  DATABASE_URL_UNPOOLED=... npm run db:deploy
  ```

  Builds don't run migrations. Run `db:deploy` before promoting any deployment that adds a migration.

## 2. Secrets

- [ ] `APP_ENCRYPTION_KEY`: generate with `openssl rand -base64 32`. Store it as a Sensitive variable in Production (and a different one in Preview). If it is lost, the stored Jobber tokens can't be decrypted and Jobber has to be reconnected; nothing else is affected.
- [ ] Confirm `JOBBER_CLIENT_ID` and `JOBBER_CLIENT_SECRET` are still set (they already are for the lead flow).
- [ ] Optional: `PORTAL_BASE_URL=https://eliterestorations.com`, so copied portal links always use the main domain. When unset, links use whatever host the admin is on.
- [ ] Do not set `JOBBER_MODE` in Production. Production defaults to live.
- [ ] Leave `JOBBER_WEBHOOK_ENABLED` unset until step 6.

## 3. File storage

- [ ] Customer uploads use the existing private Blob store (`JOBBER_BLOB_READ_WRITE_TOKEN`). Confirm the variable is set for Production. When it's missing in Production, uploads are turned off and customers are asked to email photos instead.
- [ ] Don't point it at the public photo store. Portal files must be private.

## 4. First admin

- [ ] With the production env pulled locally:

  ```bash
  npm run admin:create -- --email george@eliterestorations.com --name "George" --role ADMIN
  ```

- [ ] Sign in at `https://eliterestorations.com/admin/login`.
- [ ] Create staff accounts with `--role STAFF`. Staff can't see quote totals or allowances, or change integration settings.

## 5. Jobber read access

- [ ] In the Jobber Developer Center, add **Quotes: read** to the app's scopes (clients and requests are already there).
- [ ] **Settings → Integrations → Reconnect** to approve the new scope.
- [ ] **Check schema**. It should report no missing fields.
- [ ] **Sync now**, repeating until the status is Succeeded.
- [ ] Spot-check three quotes against Jobber (see "Verifying the live connection" in `docs/jobber.md`).
- [ ] If demo data was ever loaded into this database, click **Remove demo data**.

Until these pass, don't treat the dashboard as showing live Jobber data.

## 6. Webhooks (optional)

- [ ] Register `https://eliterestorations.com/api/jobber/webhooks` for the topics listed in `docs/jobber.md`.
- [ ] Set `JOBBER_WEBHOOK_ENABLED=true` and redeploy.
- [ ] Edit a test quote in Jobber, then confirm the change shows up in the admin within a minute and the activity log shows a `jobber.webhook` entry.

## 7. Smoke test

- [ ] Public pages, the estimate form (email arrives, Jobber request is created), and the sitemap all behave as before. `/admin` and `/portal` are not in the sitemap.
- [ ] `/admin` redirects to the login page when signed out.
- [ ] Build a portal for an internal test quote, publish it, open the link in a private window on a phone, save a draft, upload a photo, and submit.
- [ ] Review it in `/admin/selections`: request changes, resubmit, approve.
- [ ] Regenerate the link and confirm the old link shows "not available".
- [ ] Revoke the test portal.
- [ ] Response headers on `/portal/...` include `X-Robots-Tag: noindex` and `Cache-Control: no-store`.

## Rollback

The admin and portal routes are separate from the public site. To take them offline without a redeploy, revoke or unpublish portals. To roll back the code, promote the previous deployment. The database can stay; the old code doesn't read it, except the Jobber lead flow, which would go back to reading the Blob token file. That file is deleted after the import, so reconnect Jobber after a rollback.
