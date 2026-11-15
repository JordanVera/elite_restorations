# Lead ingest

Google Voice notifications and Google Local Services leads create a Jobber client and request. The website estimate form is unchanged, except that office phone numbers and office emails no longer match an existing client.

Two deliveries share one ingest helper and one dedupe store:

- A Google Apps Script in each mailbox posts parsed email to `POST /api/leads/inbound`.
- A Vercel Cron calls the Google Ads API for Local Services leads and uses the same helper.

Jobber must already be connected. See `docs/jobber.md`.

## What gets created

The helper takes a name (or the formatted phone when the lead has no name), an optional email, phone, and address or city, a source label, a title, and note fields. It does not use the website form's service or insurance-claim choices.

A property is added only when the lead has an address or a city. A city is stored on the street line, the same way any non-ZIP text from the website form is stored.

`requestCreate` has no source argument. The source is a form answer labeled `Source`, same as the website estimate.

| Source | Request title |
| --- | --- |
| Google Voice text | `Google Voice text` |
| Google Voice voicemail | `Google Voice voicemail` |
| Google Voice missed call | `Google Voice missed call` |
| Local Services message | `Google LSA message · {service}` |
| Local Services phone lead | `Google LSA phone lead` |

When a Local Services message has no service, the title is `Google LSA message`.

## Office numbers are not a match

The website form and inbound leads share one match. These are never used to find an existing client:

- 713-909-0034
- 281-748-0227
- 713-909-0032
- 713-909-4031
- 505-532-2516
- admin@eliterestorations.com
- george@eliterestorations.com
- george@texaselitegroup.com

If those are the only contact details, the site creates a new client. Otherwise it matches a customer phone on the last 10 digits, or a non-office email.

## Dedupe

Seen ids live in the private Blob store, under `leads/dedupe/`. The path is a hash. The public photo token `BLOB_READ_WRITE_TOKEN` is never used.

| Lead | `externalId` |
| --- | --- |
| Google Voice email | The Gmail `Message-ID` header. If that header is missing, `gmail:` plus Gmail's own message id. |
| Local Services email | `lsa:` plus the number in `customer-request-{id}@awexpress.google.com`. |
| Local Services API | `lsa:` plus `local_services_lead.id`. |

A repeat or a follow-up with the same id returns `duplicate` and creates nothing. The email path and the API path share the LSA id, so whichever arrives first wins. Running the script in both mailboxes is safe for the same reason.

Voice dedupe uses the Message-ID. The same message in both mailboxes has the same Message-ID. The `gmail:` fallback is per mailbox and is only used when Google omits the header.

## Private blob

OAuth tokens, the LSA watermark, and dedupe all use `JOBBER_BLOB_READ_WRITE_TOKEN`.

| Path | Contents |
| --- | --- |
| `jobber/oauth.json` | Jobber refresh token |
| `google-ads/oauth.json` | Google Ads refresh token |
| `google-ads/lsa-watermark.json` | Newest Local Services lead time already handled |
| `leads/dedupe/{hash}.json` | One seen external id |

## Env vars

Set these on the Vercel project for Production. Preview does not need them unless you want preview to accept leads. The connect links only finish on `https://eliterestorations.com`.

| Name | Required | Purpose |
| --- | --- | --- |
| `JOBBER_CLIENT_ID` | Yes, for Jobber | Already used by the website form. |
| `JOBBER_CLIENT_SECRET` | Yes, for Jobber | Already used by the website form. |
| `JOBBER_CONNECT_KEY` | Yes, unless Google Ads has its own key | Password on the Jobber connect URL. Also accepted by the Google Ads connect URL when `GOOGLE_ADS_CONNECT_KEY` is unset. |
| `JOBBER_BLOB_READ_WRITE_TOKEN` | Yes | Private Blob store. Tokens, the watermark, and dedupe. Do not use `BLOB_READ_WRITE_TOKEN`. |
| `LEAD_INGEST_SECRET` | Yes, for email ingest | Bearer token for `POST /api/leads/inbound`. A long random string, for example `openssl rand -hex 32`. Not the cron secret. |
| `CRON_SECRET` | Yes, for the LSA cron | Vercel sends `Authorization: Bearer CRON_SECRET` on cron requests. A different long random string. |
| `GOOGLE_ADS_CLIENT_ID` | Yes, for the LSA cron | OAuth client id from the Cloud project that has the Google Ads API enabled. |
| `GOOGLE_ADS_CLIENT_SECRET` | Yes, for the LSA cron | OAuth client secret. Do not commit it. |
| `GOOGLE_ADS_CONNECT_KEY` | No | Password on `/api/google-ads/connect`. When it is unset, `JOBBER_CONNECT_KEY` is accepted. When both are set, either key works. |
| `GOOGLE_ADS_DEVELOPER_TOKEN` | No | See below. Leave unset. |

`JOBBER_GRAPHQL_VERSION` stays optional. The default is `2025-04-16`.

If `LEAD_INGEST_SECRET` is missing, `POST /api/leads/inbound` returns `not-configured`. If the Google Ads client id or secret, the Jobber credentials, or the private blob token are missing, the cron returns `not-configured` and does not call Google or Jobber. A bad bearer token returns HTTP 401.

The inbound route returns:

| Result | HTTP | Body |
| --- | --- | --- |
| Created a Jobber request | 200 | `{ "status": "created" }` |
| This external id was already saved | 200 | `{ "status": "duplicate" }` |
| Jobber or the private store is not ready | 503 | `{ "status": "not-configured" }` |
| Jobber rejected the lead, or the body is invalid | 500 or 400 | `{ "status": "failed" }` |

Voice leads without a phone are rejected with HTTP 400. The Apps Script labels a thread only after every posted message in that thread returns 200, so a failure is retried on the next run.

The cron body is `{ "status": "ok" | "failed" | "not-configured", "created", "duplicate", "failed", "skipped" }`. `not-configured` is HTTP 200 so an unfinished setup does not mark the cron as failed. A Google Ads or Jobber error is HTTP 500.

Logs do not include lead phones, tokens, authorization headers, or email bodies.

## Apps Script

One file: `scripts/gmail-lead-ingest/Code.gs`. Install it as two separate Apps Script projects, one in each mailbox. A script can only read the Gmail of the account that authorized it. Do not share one project between the two accounts.

Each install processes both Google Voice and Local Services mail when that inbox has it. It does not matter which inbox receives which mail.

The time trigger is every 30 minutes (`ScriptApp.newTrigger(...).timeBased().everyMinutes(30)`).

Search:

```
-label:JobberSynced newer_than:2d (from:txt.voice.google.com OR from:voice-noreply@google.com OR from:awexpress.google.com OR from:localservices-noreply@google.com)
```

It reads:

- Texts from `*@txt.voice.google.com` whose subject starts with `New text message from`.
- Voicemails and missed calls from `voice-noreply@google.com`. The phone is usually in the subject.
- Local Services messages from `customer-request-{id}@awexpress.google.com` with subject `{Name}'s new request` or `Potential Customer's new request`. The plain-text body has `- Name`, `- Location` (a city), `- Service type`, and `- Message` blocks.

It skips:

- Follow-ups whose subject says `sent you a message`.
- `New call from a potential customer` from `localservices-noreply@google.com`. Those emails have no contact details. The cron imports the call instead.
- Other Local Services marketing mail.

After a 200 response, the thread is labeled `JobberSynced`. Skipped mail is left unlabeled and drops out of the search after two days.

### Install on admin@eliterestorations.com

1. Sign in to Google as `admin@eliterestorations.com`.
2. Open [script.google.com](https://script.google.com) and create a project. Name it `Elite lead ingest`.
3. Replace the contents of `Code.gs` with `scripts/gmail-lead-ingest/Code.gs` from this repo. Save.
4. Open Project Settings (the gear) and add Script Properties:
   - `LEAD_INGEST_URL` = `https://eliterestorations.com/api/leads/inbound`
   - `LEAD_INGEST_SECRET` = the Vercel value of `LEAD_INGEST_SECRET`
5. In the editor, choose the function `installLeadIngestTrigger` and click Run. This is the one-time setup. Approve the prompts for Gmail and for outbound requests.
6. Confirm the project has one trigger, `ingestNewLeads`, every 30 minutes. Running `installLeadIngestTrigger` again replaces that trigger. It does not add a second one.
7. Optional: choose `ingestNewLeads` and click Run once to import the last two days immediately. Otherwise the trigger does it within 30 minutes.

### Install on george@eliterestorations.com

Repeat the steps above while signed in as `george@eliterestorations.com`. This is a second Apps Script project, with the same code and the same two Script Properties. The trigger is again every 30 minutes. Do not copy the admin project into George's Drive and expect it to read George's mail. George has to authorize his own copy.

Both projects can run. A lead that reaches both inboxes is created once.

## Local Services calls and messages from the Google Ads API

Customer id: `8441992586`.

The cron is `GET /api/cron/lsa-leads` on `*/30 * * * *` (every 30 minutes). Vercel Hobby only allows a cron once a day, so this schedule needs a plan that allows a 30-minute cron.

Checked against the Google Ads API docs on 13 November 2026 (v26):

- Developer tokens were sunset on 9 September 2026. Access level now belongs to the Cloud project that owns the OAuth client. Enabling the API gives test access. Explorer access is requested on the Google Ads API page in that project and is the level that can read a production account. A manager account is not required for that.
- The `developer-token` header is optional and ignored. This app sends it only when `GOOGLE_ADS_DEVELOPER_TOKEN` is set.
- Every search sends `Authorization: Bearer` and `Content-Type: application/json`. It does not send `login-customer-id`, because the OAuth user calls customer `8441992586` directly. A manager-account login would need that header. This setup does not use one.
- The call is `POST https://googleads.googleapis.com/v26/customers/8441992586/googleAds:search`.
- Leads are `local_services_lead` with `id`, `contact_details.consumer_name`, `contact_details.phone_number`, `contact_details.phone_number_extension`, `category_id`, `lead_type`, and `creation_date_time`.
- Message text is `local_services_lead_conversation.message_details.text` for consumer messages. Advertiser replies are not copied into the Jobber note.
- `PHONE_CALL` becomes `lsa_phone`. `MESSAGE` and `BOOKING` become `lsa_message`. The external id is `lsa:{id}`.

The first run looks back two days in America/Chicago. Later runs start from the watermark in `google-ads/lsa-watermark.json`, with a two-hour overlap so a lead written during a query is not skipped. Dedupe makes that overlap safe. A failed lead does not move the watermark past itself.

### One-time Google Ads setup

1. In Google Cloud Console, choose or create a project.
2. Enable the Google Ads API on that project.
3. Request Explorer access for the Google Ads API on that project. This replaces the old developer-token approval. Wait until Explorer access is granted before expecting production leads.
4. Create an OAuth client of type Web application.
   - Authorized redirect URI: `https://eliterestorations.com/api/google-ads/callback`
   - The scope used by the connect link is `https://www.googleapis.com/auth/adwords`.
5. Put `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `LEAD_INGEST_SECRET`, and `CRON_SECRET` on the Vercel project. Redeploy. The private blob token and the Jobber variables should already be set.
6. Sign in to Google as a user who can open Google Ads customer `8441992586`.
7. Open `https://eliterestorations.com/api/jobber/connect?key=YOUR_JOBBER_CONNECT_KEY` if Jobber is not connected yet.
8. Open `https://eliterestorations.com/api/google-ads/connect?key=YOUR_KEY`. Use `GOOGLE_ADS_CONNECT_KEY` if you set one, otherwise `JOBBER_CONNECT_KEY`. Approve access. The page says `Google Ads is connected` when the refresh token is stored in the private blob. If Google approved the connection but the site could not save it, fix `JOBBER_BLOB_READ_WRITE_TOKEN` and start the connect link again. The link expires after 10 minutes.
9. Confirm the Vercel project has the cron `*/30 * * * *` for `/api/cron/lsa-leads`. The next run after the deploy imports leads from the last two days, then every 30 minutes.

Access tokens last about an hour. The site refreshes them and stores the newest refresh token in `google-ads/oauth.json`. If a refresh is rejected, open the connect URL again.

## Order to turn it on

1. Confirm the private Blob store and the Jobber connection from `docs/jobber.md`.
2. Set `LEAD_INGEST_SECRET` and `CRON_SECRET`. Redeploy.
3. Install the Apps Script in `admin@eliterestorations.com` and run `installLeadIngestTrigger` once.
4. Install the Apps Script in `george@eliterestorations.com` and run `installLeadIngestTrigger` once.
5. Finish the Google Ads Cloud project, set the OAuth env vars, redeploy, and open the Google Ads connect link once.
