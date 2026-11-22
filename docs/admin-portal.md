# Admin dashboard and customer selection portal

`/admin` is the internal dashboard. `/portal/<token>` is the page a customer uses to choose materials for a quote. Both live in the same Next.js app as the public site, but they share none of its layout and are never indexed.

Deployment steps are in `docs/deployment-checklist.md`. Jobber setup and the live-verification steps are in `docs/jobber.md`.

## What it does (and doesn't)

- Reads clients, quotes, and line items from Jobber. Nothing is written back to Jobber from the dashboard or the portal.
- Lets staff turn a quote into a list of material selections and send the customer a private link.
- Collects the customer's choices (product, color, finish, links, photos, notes) and lets staff approve them or ask for changes.

**Approval in this system is internal material approval only.** It is not a quote approval, contract change, change order, or purchase authorization, and it never changes a Jobber quote, price, or line item.

Out of scope for this version: payments, invoicing, scheduling, purchasing, inventory, chat, price calculations, and editing Jobber quotes.

## Accounts and roles

There is no public sign-up. Create or reset an account from a terminal with `DATABASE_URL` set:

```bash
npm run admin:create -- --email you@eliterestorations.com --name "Your Name" --role ADMIN
```

The password is read from `ADMIN_PASSWORD` or prompted without echo. It must be at least 12 characters. Running the command again for the same email resets the password and role, and reactivates the account.

| | Admin | Staff |
| --- | --- | --- |
| Dashboard, customers, quotes | Yes | Yes |
| Quote totals, line item prices, allowances | Yes | Hidden |
| Build, publish, revoke portals | Yes | Yes |
| Review selections | Yes | Yes |
| Selection categories and shopping resources | Yes | No |
| Jobber connection, sync, demo data | Yes | No |

Sessions are stored in the database (only a hash of the cookie value). They end after 12 hours idle or 7 days total. Five failed sign-ins for an email or an IP address within 15 minutes block further attempts until the window passes. Permission checks run on the server for every page, server action, and file request. Hiding a button is never the only control.

## Pages

| Path | Purpose |
| --- | --- |
| `/admin` | Counts (customers, quotes, active portals, portals awaiting the customer, selections awaiting review, completed selections), projects needing attention (reviews waiting, overdue, or due soon), and recent activity. |
| `/admin/customers`, `/admin/customers/[id]` | Imported Jobber clients with search, sort, and their quotes. |
| `/admin/quotes`, `/admin/quotes/[id]` | Imported quotes with status filters, line items, and the quote's portal. |
| `/admin/portals`, `/admin/portals/new?quoteId=…`, `/admin/portals/[id]` | Portal list, builder, and portal management. |
| `/admin/selections`, `/admin/selections/[id]` | Review queue and review page. |
| `/admin/settings/categories` | Selection category templates (admin only). |
| `/admin/settings/resources` | Shopping resources: stores, logos, links, and which materials they are suggested for (admin only). |
| `/admin/settings/integrations` | Jobber connection, sync, schema check, demo data (admin only). |

## Building a portal

1. Open a quote and click **Create Material Selection Portal**.
2. The builder suggests selections from the quote's line items by matching them against category keywords (for example "LVP" or "luxury vinyl" suggests Flooring; "labor" and "demolition" are skipped). Each suggestion shows why it matched and a confidence level. **Nothing is added until you accept it.** You can also add custom selections with no line item.
3. Edit each selection: title, area, instructions, the fields the customer fills in, whether it's required, quantity, allowance (admin only), preferred options, and due date.
4. Set the portal title, welcome message, and optional expiry. "Show allowances to customer" is off by default and only admins can turn it on.
5. Shopping resources are suggested from the materials on the portal. The default set (Sherwin-Williams, Floor & Decor, Builders FirstSource, Home Depot, Lowe's, Expo Stones, Earth Stone Colours) is stored in the database. Admins add, edit, or hide suppliers under **Settings → Shopping resources**, including a copied company logo. On the portal builder you can still add or hide any of them for that job.
6. Save. The portal starts as a **draft** and the link doesn't work yet.
7. Click **Publish portal** to make the link live, then **Copy link** and send it to the customer yourself. The site doesn't email it.

Other actions on the portal page:

- **Move back to draft (pause link)** turns the link off temporarily. Publishing again restores the same link.
- **Regenerate link** issues a new link. The old one stops working right away.
- **Revoke portal** permanently closes the portal. Its selections and history stay visible to staff. Only one active portal per quote is allowed; revoke the old one to start over.
- **Delete draft** is available only for a draft that was never published.

Selection categories (`/admin/settings/categories`) control the fields each kind of selection asks for, default instructions, and the keywords used for suggestions. Shopping resources (`/admin/settings/resources`) are the stores and yards shown to customers. A default set of both is created on first use.

## The customer's view

The customer opens the link on a phone or computer. There is no login; the link is the key, so treat it like a password.

- A **Where to shop** section lists the stores and yards for this job, with a logo, a short “we recommend them for…” line, and a link to their website.
- Each selection is a card showing what's needed, any instructions, the due date, and the matching supplier links for that material.
- The customer fills in what applies, adds product links and photos or PDFs, and clicks **Save draft** or **Submit**.
- After submitting, the card is locked until staff approve it or ask for changes.
- A progress bar shows how many selections are complete.
- If staff ask for changes, the card reopens with their message.
- Every page states that choices don't change the quote, and gives the office phone number.

The customer never sees internal notes, quote totals, line item prices, or other customers' data. Allowances appear only if an admin turned them on for that portal.

If two tabs edit the same selection, the second save is rejected with a message to reload, so nothing is silently overwritten.

## Reviewing

`/admin/selections` lists selections by status. **Submitted** is the default filter, oldest first.

The review page shows the customer's current choice, what was asked for, every submitted revision (with changed fields marked), files, review history, and activity. Actions:

- **Approve.** Marks it as internally approved.
- **Request changes.** Requires a message to the customer. The card reopens for them.
- **Reopen.** Unlocks it for the customer without a message.
- **Internal note.** Visible to staff only. Allowed in any status, including on revoked portals.

Each action is recorded with who did it and when.

## Files

- Accepted: JPG, PNG, WebP, HEIC/HEIF, and PDF up to 10 MB, with at most 10 files per selection.
- The server checks the file's actual bytes, not only its name or declared type, so a renamed HTML or script file is rejected.
- Files are stored privately: in the private Blob store (`JOBBER_BLOB_READ_WRITE_TOKEN`) on Vercel, or in `.data/uploads` locally. They are never public URLs.
- Customers fetch files through `/api/portal/<token>/files/<id>`, which only returns files from that portal. Staff use `/api/admin/files/<id>`, which requires a session with review rights.
- Responses are `no-store`, `nosniff`, and sandboxed, so an uploaded file can't run scripts on the site.
- When a selection is submitted, its files become part of that revision and the customer can no longer delete them.

## Audit log

Every write records an `ActivityLog` row in the same transaction: who (admin, customer, or system), what, which record, and a small amount of metadata. Secrets, tokens, and file contents are never logged. Recent activity appears on the dashboard, on each portal, and on each selection.

## Security notes

- Portal links are 256-bit random tokens. Only a SHA-256 hash is used for lookups. The token is also stored encrypted, so staff can copy the link again later.
- Portal pages and APIs send `noindex`, `no-store`, `no-referrer`, and `DENY` framing headers.
- Customer saves and uploads are rate-limited per portal.
- Jobber tokens are encrypted at rest with `APP_ENCRYPTION_KEY`. No secret is ever sent to the browser.

## Demo mode (no Jobber needed)

With `JOBBER_MODE=mock` (the default outside production when Jobber credentials aren't set):

```bash
npx prisma dev                # local Postgres; copy the printed DATABASE_URL into .env.local
npx prisma migrate deploy
npm run db:seed               # categories, shopping resources, fictitious Jobber data, a draft demo portal
npm run admin:create -- --email demo@example.com --name "Demo Admin" --role ADMIN
npm run dev
```

Then:

1. Sign in at `/admin/login`.
2. Open the demo portal printed by the seed (or **Quotes → any quote → Create Material Selection Portal**).
3. Review the selections, click **Publish portal**, then **Copy link**.
4. Open the link in a private window and make and submit a few selections, including a photo.
5. Back in `/admin/selections`, request changes on one and approve another.
6. Resubmit as the customer and check the revision history.

All demo records are marked `MOCK`, and a banner shows while any exist. **Settings → Integrations → Remove demo data** deletes them, along with their portals and uploaded files.

## Tests

```bash
npm test
```

Unit tests cover auth and sessions, encryption, Jobber GraphQL paging, throttling, retries, webhook signatures, mapping of mocked Jobber responses, the suggestion engine, selection input parsing, both state machines, and upload checks.

`src/server/portal/isolation.test.ts` runs against a real database and is skipped unless `TEST_DATABASE_URL` is set. Point it at a disposable database with migrations applied. It checks that one portal's link can't read or change another portal's selections or files, that stale saves are rejected, that submitting freezes a revision, and that unpublished, revoked, and expired links are closed.

```bash
TEST_DATABASE_URL=postgres://postgres:postgres@localhost:51221/template1 npm test
```
