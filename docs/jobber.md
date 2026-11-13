# Jobber

Estimate form submissions are emailed as before, and also create a Client and a Request in Jobber. If Jobber is down, not connected, or rejects the request, the email still sends and the visitor still sees the usual success or error message.

Tokens live in a private Vercel Blob object named `jobber/oauth.json`. The same Blob store used for lead photos is enough. There is no second database.

## Env vars

Set these on the Vercel project for Production. Set them on Preview too if you want preview submissions in Jobber.

| Name | Value |
| --- | --- |
| `JOBBER_CLIENT_ID` | `35e3960e-113b-471a-a4e9-2d2e819153f9` |
| `JOBBER_CLIENT_SECRET` | The client secret from the Jobber Developer Center. Do not commit it. |
| `JOBBER_CONNECT_KEY` | A long random string you choose, for example the output of `openssl rand -hex 32`. This is the password on the connect URL. |
| `BLOB_READ_WRITE_TOKEN` | Created when you connect a Blob store to the project (Storage → Blob). Required for the token file. Also used for lead photos. |

Optional: `JOBBER_GRAPHQL_VERSION`. The default is `2025-04-16`, the version in Jobber's current API docs. Change it only if Jobber publishes a newer supported version.

Leave `EMAIL_GATEWAY` unset. The SMTP variables in `.env.example` are still required for the lead email.

The app in the Developer Center needs the scopes for clients (read and write) and requests (read and write). The redirect URI must stay `https://eliterestorations.com/api/jobber/callback`.

## One-time connect

After the env vars are saved and the project has been redeployed, sign in to the Jobber account that should receive the leads. Then open:

`https://eliterestorations.com/api/jobber/connect?key=YOUR_JOBBER_CONNECT_KEY`

Replace `YOUR_JOBBER_CONNECT_KEY` with the value of `JOBBER_CONNECT_KEY`. Approve access. The callback page says "Jobber is connected" when the tokens are stored. The link expires after 10 minutes, and the key is required every time you start it.

Access tokens last about 60 minutes. The site refreshes them and always stores the newest refresh token. If a refresh is rejected, open the connect URL again.

## What lands in Jobber

For each estimate, the site searches existing clients by email and then by phone. A match reuses that client. Otherwise it creates one with the name, email, phone, and the address or ZIP from the form.

It then creates a request titled `Website estimate form · ` plus the service. The request form includes the service, message, insurance claim answer, carrier when they gave one, preferred contact, the page URL, and the source `Website estimate form`. Jobber's `requestCreate` input has no source field. The Request record's own source is assigned by Jobber (the app name). The words "Website estimate form" are the request title and a form answer.

Partner referrals are emailed only. They do not create a Jobber request.
