# Jobber

The site talks to Jobber in two ways:

1. **Lead flow (writes).** Estimate form submissions are emailed as before, and also create a Client and a Request in Jobber. If Jobber is down, not connected, or rejects the request, the email still sends and the visitor still sees the usual success or error message.
2. **Admin dashboard (read-only).** `/admin` imports clients, quotes, and quote line items so staff can build material selection portals. The admin never writes to Jobber. Customer selections never change Jobber quotes, prices, or line items.

Both use the same OAuth connection.

> **Status:** The read-only admin integration has only been exercised with mocked Jobber responses (unit tests and `JOBBER_MODE=mock`). It has not yet been authenticated or verified against the live Jobber account. Follow "Verifying the live connection" below before relying on it.

## Where tokens are stored

OAuth tokens are stored in Postgres (`JobberConnection`), encrypted with AES-256-GCM using `APP_ENCRYPTION_KEY`. Each refresh uses version locking so two requests refreshing at once can't overwrite the newer refresh token.

Tokens used to live in the private Blob file `jobber/oauth.json`. On the first read after the move, the site copies that file into the database (encrypted) and deletes it, so an existing connection keeps working without reconnecting. After that, `JOBBER_BLOB_READ_WRITE_TOKEN` is used only for the other private files: lead dedupe, Google Ads tokens, and customer portal uploads.

## Env vars

Set these on the Vercel project for Production. Set them on Preview too if you want preview submissions in Jobber.

| Name | Value |
| --- | --- |
| `JOBBER_CLIENT_ID` | `35e3960e-113b-471a-a4e9-2d2e819153f9` |
| `JOBBER_CLIENT_SECRET` | The client secret from the Jobber Developer Center. Do not commit it. It also verifies webhook signatures. |
| `JOBBER_CONNECT_KEY` | Optional. A long random string (`openssl rand -hex 32`). It allows the legacy `?key=` connect link. Signed-in admins can connect from the dashboard without it. |
| `APP_ENCRYPTION_KEY` | Required. 32 random bytes, base64 (`openssl rand -base64 32`). Encrypts the stored tokens. |
| `APP_ENCRYPTION_KEY_PREVIOUS` | Optional. Set it to the old key while rotating. The site still decrypts with it and re-encrypts with the new key on the next token refresh. |
| `DATABASE_URL` | Required. See `docs/deployment-checklist.md`. |
| `JOBBER_BLOB_READ_WRITE_TOKEN` | Read-write token for the private Blob store (prefix `JOBBER_BLOB`). Only needed for the one-time token import described above, and for the other private files. Do not use `BLOB_READ_WRITE_TOKEN` here. That token belongs to the public store for lead photos. |

Optional:

| Name | Effect |
| --- | --- |
| `JOBBER_GRAPHQL_VERSION` | Defaults to `2025-04-16`. Change it only after running "Check schema" against the new version. |
| `JOBBER_MODE` | `live` or `mock`. When unset, Production is live. Other environments are live only if Jobber credentials are set; otherwise they are mock. In mock mode, "Sync now" imports the fictitious fixtures in `src/server/jobber/fixtures.ts` instead of calling Jobber. |
| `JOBBER_REDIRECT_URI` | Defaults to `https://eliterestorations.com/api/jobber/callback`. Must exactly match a redirect URI on the Jobber app. |
| `JOBBER_WEBHOOK_ENABLED` | `true` to act on webhooks. When unset, signed webhooks are accepted and ignored. |

Leave `EMAIL_GATEWAY` unset. The SMTP variables in `.env.example` are still required for the lead email.

## Jobber app settings

In the Jobber Developer Center, the app needs these scopes:

- Clients: read and write (the lead flow creates clients).
- Requests: read and write (the lead flow creates requests).
- Quotes: read (the admin dashboard).

The redirect URI must be `https://eliterestorations.com/api/jobber/callback`.

Adding a scope means Jobber has to approve the connection again. After you change scopes, reconnect from the dashboard.

## Connecting

From the dashboard, an admin opens **Settings → Integrations** and clicks **Connect Jobber**, then approves access while signed in to the Jobber account the business uses. OAuth always finishes on the production domain, because that's the registered redirect URI.

The legacy link still works when `JOBBER_CONNECT_KEY` is set:

`https://eliterestorations.com/api/jobber/connect?key=YOUR_JOBBER_CONNECT_KEY`

The connect flow uses PKCE and a signed, 10-minute state cookie. Access tokens last about 60 minutes. The site refreshes them and always stores the newest refresh token. If a refresh is rejected, the integrations page shows the error and a **Reconnect** button.

## Verifying the live connection

Do this once after connecting, and again whenever `JOBBER_GRAPHQL_VERSION` changes:

1. **Settings → Integrations → Check schema.** This runs an introspection query for every type and field the admin reads (`REQUIRED_FIELDS` in `src/server/jobber/queries.ts`) and lists anything missing. Every field was taken from Jobber's published reference for 2025-04-16, but this is the first check against the real API.
2. **Sync now.** A full sync pages through clients, then quotes, then each quote's line items. It stops after about 40 seconds and saves its place. Click again to resume. The sync history shows the counts and any error.
3. Open a few quotes under **Quotes** and compare them with Jobber: number, status, client, property address, total, and line items.
4. If any of these fail, leave `JOBBER_MODE` unset (or set it to `mock` on Preview) and report the error from the sync history. Don't edit queries by guessing field names. Check them against Jobber's schema first.

Only after these pass should the dashboard be described as connected to live Jobber data.

## Rate limits and retries

Jobber uses a leaky-bucket cost limit (10,000 points, restored over time). The queries use small page sizes to stay well under it. On a `THROTTLED` error, the client waits until enough points are restored and retries. 429, 5xx, and network errors are retried with backoff (two retries, 8-second timeout per request). A 401 triggers one token refresh and one retry.

## Webhooks

Endpoint: `https://eliterestorations.com/api/jobber/webhooks`. Register these topics on the Jobber app: `QUOTE_CREATE`, `QUOTE_UPDATE`, `QUOTE_SENT`, `QUOTE_APPROVED`, `QUOTE_DESTROY`, `CLIENT_CREATE`, `CLIENT_UPDATE`, `APP_DISCONNECT`.

- Each request's `X-Jobber-Hmac-SHA256` header is checked against the raw body using `JOBBER_CLIENT_SECRET` (a constant-time compare). Unsigned or mismatched requests get 401.
- The handler responds right away. Re-fetching the quote or client runs after the response, because Jobber expects an answer within a second.
- Webhooks only carry IDs. The site never trusts a payload's contents; it re-reads the record through the API.
- A repeat of the same topic and item within 10 seconds (per server instance) is skipped.
- Events for a different Jobber account than the connected one are ignored.
- `QUOTE_DESTROY` deletes the local copy of the quote, unless it has a portal. Quotes with portals are kept so customer selections aren't lost.
- `APP_DISCONNECT` marks the connection as disconnected. Reconnect from the integrations page.
- Nothing happens unless `JOBBER_WEBHOOK_ENABLED=true` and the mode is live.

## What lands in Jobber (lead flow)

For each estimate, the site searches existing clients by the customer's email and then by phone. A match reuses that client. Otherwise it creates one with the name, email, phone, and the address or ZIP from the form.

Office numbers and office mailboxes are not used for that match. The numbers are 713-909-0034, 281-748-0227, 713-909-0032, 713-909-4031, and 505-532-2516. The mailboxes are admin@eliterestorations.com, george@eliterestorations.com, and george@texaselitegroup.com. If a form has only those, the site creates a new client instead of attaching the lead to the existing office client. A real phone matches on the last 10 digits. A non-office email matches exactly.

Google Voice and Local Services leads use the same client match. See `docs/leads-ingest.md`.

It then creates a request titled `Website estimate form · ` plus the service. The request form includes the service, message, insurance claim answer, carrier when they gave one, preferred contact, the page URL, and the source `Website estimate form`. Jobber's `requestCreate` input has no source field. The Request record's own source is assigned by Jobber (the app name). The words "Website estimate form" are the request title and a form answer.

Partner referrals are emailed only. They do not create a Jobber request.
