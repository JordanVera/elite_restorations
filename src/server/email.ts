import 'server-only';

/**
 * Send transactional email through the GoDaddy Node.js Hosting email gateway.
 *
 * The gateway listens on 127.0.0.1:2525 inside the hosting container. Outbound
 * SMTP is not routable there, so production mail has to go through this hop.
 * Locally the port is closed and callers fall back to SMTP.
 */

const EMAIL_GATEWAY_URL = 'http://127.0.0.1:2525/api/email/send';
const REQUEST_TIMEOUT_MS = 30_000;

export type EmailAttachment = {
  filename: string;
  content: Buffer | Uint8Array;
  contentType?: string;
};

export type SendEmailInput = {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  from?: string;
  attachments?: EmailAttachment[];
};

export type SendEmailResult = {
  messageId: string;
};

type GatewayPayload = {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  from?: string;
  attachments?: { filename: string; content: string; contentType?: string }[];
};

type GatewayResponse = {
  success: boolean;
  messageId?: string;
  error?: string;
};

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const payload = buildPayload(input);

  let response: Response;
  let body: GatewayResponse;
  try {
    response = await fetch(EMAIL_GATEWAY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    body = await parseBody(response);
  } catch (err) {
    throw new Error(`email gateway unreachable: ${describeError(err)}`);
  }

  if (!response.ok || !body.success) {
    const detail = body.error ?? `HTTP ${response.status}`;
    const idSuffix = body.messageId ? ` (messageId=${body.messageId})` : '';
    throw new Error(`email send failed: ${detail}${idSuffix}`);
  }

  if (!body.messageId) {
    throw new Error('email send succeeded but gateway returned no messageId');
  }

  return { messageId: body.messageId };
}

export function isEmailGatewayUnreachable(error: unknown): boolean {
  return error instanceof Error && error.message.startsWith('email gateway unreachable:');
}

function buildPayload(input: SendEmailInput): GatewayPayload {
  const payload: GatewayPayload = {
    to: toArray(input.to),
    subject: input.subject,
  };
  const cc = toArray(input.cc);
  if (cc.length > 0) payload.cc = cc;
  const bcc = toArray(input.bcc);
  if (bcc.length > 0) payload.bcc = bcc;
  if (input.text) payload.text = input.text;
  if (input.html) payload.html = input.html;
  if (input.replyTo) payload.replyTo = input.replyTo;
  if (input.from) payload.from = input.from;
  if (input.attachments && input.attachments.length > 0) {
    payload.attachments = input.attachments.map(encodeAttachment);
  }
  return payload;
}

function toArray(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function encodeAttachment(att: EmailAttachment): {
  filename: string;
  content: string;
  contentType?: string;
} {
  const out: { filename: string; content: string; contentType?: string } = {
    filename: att.filename,
    content: Buffer.from(att.content).toString('base64'),
  };
  if (att.contentType) out.contentType = att.contentType;
  return out;
}

async function parseBody(response: Response): Promise<GatewayResponse> {
  try {
    return (await response.json()) as GatewayResponse;
  } catch (err) {
    if (isAbortLike(err)) throw err;
    return { success: false, error: `non-JSON response (HTTP ${response.status})` };
  }
}

function isAbortLike(err: unknown): boolean {
  return err instanceof Error && (err.name === 'AbortError' || err.name === 'TimeoutError');
}

function describeError(err: unknown): string {
  if (err instanceof Error) {
    if (isAbortLike(err)) return `timed out after ${REQUEST_TIMEOUT_MS}ms`;
    return err.message;
  }
  return String(err);
}
