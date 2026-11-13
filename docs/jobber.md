# Jobber

Estimate form submissions are emailed as before, and also create a Client and a Request in Jobber. If Jobber is down, not connected, or rejects the request, the email still sends and the visitor still sees the usual success or error message.

Tokens live in a private Vercel Blob object named `jobber/oauth.json`. That file has to be in its own private Blob store. The public store used for lead photos rejects a private read or write with access denied. There is no second database.

## Env vars

Set these on the Vercel project for Production. Set them on Preview too if you want preview submissions in Jobber.

| Name | Value |
| --- | --- |
| `JOBBER_CLIENT_ID` | `35e3960e-113b-471a-a4e9-2d2e819153f9` |
| `JOBBER_CLIENT_SECRET` | The client secret from the Jobber Developer Center. Do not commit it. |
| `JOBBER_CONNECT_KEY` | A long random string you choose, for example the output of `openssl rand -hex 32`. This is the password on the connect URL. |
| `JOBBER_BLOB_READ_WRITE_TOKEN` | Read-write token for a private Blob store. In the Vercel project, connect a Blob store (Storage → Blob) with private access and the environment variable prefix `JOBBER_BLOB`. Vercel then sets this variable, and may also set `JOBBER_BLOB_STORE_ID`. The site passes this token on every read and write of `jobber/oauth.json`. Required. Do not use `BLOB_READ_WRITE_TOKEN` here. That token belongs to the public store for lead photos, and a private put or get against it returns 403. |

Optional: `JOBBER_GRAPHQL_VERSION`. The default is `2025-04-16`, the version in Jobber's current API docs. Change it only if Jobber publishes a newer supported version.

Leave `EMAIL_GATEWAY` unset. The SMTP variables in `.env.example` are still required for the lead email.

The app in the Developer Center needs the scopes for clients (read and write) and requests (read and write). The redirect URI must stay `https://eliterestorations.com/api/jobber/callback`.

## One-time connect

After the env vars are saved and the project has been redeployed, sign in to the Jobber account that should receive the leads. Then open:

`https://eliterestorations.com/api/jobber/connect?key=YOUR_JOBBER_CONNECT_KEY`

Replace `YOUR_JOBBER_CONNECT_KEY` with the value of `JOBBER_CONNECT_KEY`. Approve access. The callback page says "Jobber is connected" when the tokens are stored. If it says Jobber approved the connection but the website couldn't save it, `JOBBER_BLOB_READ_WRITE_TOKEN` is missing or was rejected. Fix the private store, redeploy, and open the connect link again. The link expires after 10 minutes, and the key is required every time you start it.

Access tokens last about 60 minutes. The site refreshes them and always stores the newest refresh token. If a refresh is rejected, open the connect URL again.

## What lands in Jobber

For each estimate, the site searches existing clients by the customer's email and then by phone. A match reuses that client. Otherwise it creates one with the name, email, phone, and the address or ZIP from the form.

Office numbers and office mailboxes are not used for that match. The numbers are 713-909-0034, 281-748-0227, 713-909-0032, 713-909-4031, and 505-532-2516. The mailboxes are admin@eliterestorations.com, george@eliterestorations.com, and george@texaselitegroup.com. If a form has only those, the site creates a new client instead of attaching the lead to the existing office client. A real phone matches on the last 10 digits. A non-office email matches exactly.

Google Voice and Local Services leads use the same client match. See `docs/leads-ingest.md`.

It then creates a request titled `Website estimate form · ` plus the service. The request form includes the service, message, insurance claim answer, carrier when they gave one, preferred contact, the page URL, and the source `Website estimate form`. Jobber's `requestCreate` input has no source field. The Request record's own source is assigned by Jobber (the app name). The words "Website estimate form" are the request title and a form answer.

Partner referrals are emailed only. They do not create a Jobber request.
