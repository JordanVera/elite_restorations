import 'server-only';

import { get } from '@vercel/blob';
import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

import { site } from '@/lib/site';
import { sendEmail } from '@/server/email';
import {
  buildInquiryHtml,
  inquiryMessageId,
  inquiryReference,
  inquirySubject,
} from '@/server/inquiry-email-template';
import { describeLead } from '@/server/leads/describe';
import type { DeliverableLead } from '@/server/leads/types';
import { emailTransportPlan } from '@/server/mail-plan';

/**
 * Lead email.
 *
 * Production is Vercel. The GoDaddy gateway on 127.0.0.1:2525 does not exist
 * there, so Vercel sends with SMTP only. EMAIL_GATEWAY=godaddy opts into that
 * gateway on a non-Vercel host, and any gateway failure still falls through
 * to SMTP.
 *
 * eliterestorations.com publishes Google Workspace SPF and DMARC p=reject.
 * SMTP_USER has to be a mailbox on that domain, sent through smtp.gmail.com,
 * or the message is rejected and the lead never arrives.
 */

/** GoDaddy's email gateway rejects a single attachment above this size. */
const GATEWAY_ATTACHMENT_LIMIT = 2 * 1024 * 1024;

export type InquirySendResult =
  | { status: 'sent' }
  | { status: 'unconfigured' }
  | { status: 'failed' };

function smtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim().replace(/\s+/g, '');
  if (!user || !pass) return null;

  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT?.trim() || '587');

  return { user, pass, host, port };
}

export function isSmtpConfigured(): boolean {
  return smtpConfig() !== null;
}

function inquiryRecipient(): string {
  return process.env.INQUIRY_EMAIL_TO?.trim() || site.email;
}

/** CC and BCC are included only when the env var is set to a real mailbox. */
function optionalAddress(
  name: 'INQUIRY_EMAIL_CC' | 'INQUIRY_EMAIL_BCC',
): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : 'unknown error';
}

type InquiryFile = {
  filename: string;
  content: Buffer;
  contentType: string;
};

function photoFilename(index: number): string {
  return `elite-photo-${String(index + 1).padStart(2, '0')}.jpg`;
}

async function downloadStoredPhoto(pathname: string): Promise<Buffer | null> {
  try {
    const result = await get(pathname, { access: 'public', useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const bytes = Buffer.from(await new Response(result.stream).arrayBuffer());
    return bytes.byteLength > 0 ? bytes : null;
  } catch (error) {
    console.error('[mail] could not download stored photo', pathname, errorText(error));
    return null;
  }
}

async function loadPhotoAttachments(lead: DeliverableLead): Promise<InquiryFile[]> {
  const downloaded = await Promise.all(
    lead.photos.map(async (photo, index) => {
      const bytes = await downloadStoredPhoto(photo.pathname);
      if (!bytes) return null;
      return {
        filename: photoFilename(index),
        content: bytes,
        contentType: 'image/jpeg',
      };
    }),
  );

  return downloaded.filter((file): file is InquiryFile => file !== null);
}

function renderInquiry(lead: DeliverableLead, files: InquiryFile[], reference: string) {
  const filenames = files.map((file) => file.filename);
  const summary = describeLead(lead, {
    photosAttached: files.length || undefined,
  });
  const contact = [lead.name, lead.phone, lead.email || 'No email provided'].join('\n');
  return {
    subject: inquirySubject(lead, reference),
    html: buildInquiryHtml(lead, reference, {
      photosAttached: files.length,
      photoFilenames: filenames,
    }),
    text: `${summary}\n\nReference: ${reference}\n\n—\n${contact}`,
  };
}

function asSmtpAttachment(file: InquiryFile): Mail.Attachment {
  return {
    filename: file.filename,
    content: file.content,
    contentType: file.contentType,
    contentDisposition: 'attachment',
  };
}

async function sendViaSmtp(
  lead: DeliverableLead,
  files: InquiryFile[],
  reference: string,
): Promise<boolean> {
  const config = smtpConfig();
  if (!config) return false;

  const message = renderInquiry(lead, files, reference);
  const fromName = (process.env.SMTP_FROM_NAME?.trim() || site.name).replace(/["\r\n]/g, '');
  const cc = optionalAddress('INQUIRY_EMAIL_CC');
  const bcc = optionalAddress('INQUIRY_EMAIL_BCC');
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 20_000,
  });

  await transport.sendMail({
    from: `"${fromName}" <${config.user}>`,
    to: inquiryRecipient(),
    ...(cc ? { cc } : {}),
    ...(bcc ? { bcc } : {}),
    ...(lead.email ? { replyTo: lead.email } : {}),
    subject: message.subject,
    messageId: inquiryMessageId(reference),
    headers: {
      'X-Elite-Inquiry-Ref': reference,
    },
    text: message.text,
    html: message.html,
    attachments: files.map(asSmtpAttachment),
  });

  return true;
}

export async function sendInquiryEmail(lead: DeliverableLead): Promise<InquirySendResult> {
  const plan = emailTransportPlan(process.env);
  if (plan === 'unconfigured') {
    console.error(
      '[mail] Inquiry was not sent. Set SMTP_USER and SMTP_PASS. This host does not use the GoDaddy email gateway.',
    );
    return { status: 'unconfigured' };
  }

  const reference = inquiryReference();

  try {
    const files = await loadPhotoAttachments(lead);

    if (plan === 'gateway-then-smtp') {
      const gatewayFiles = files.filter((file) => file.content.byteLength <= GATEWAY_ATTACHMENT_LIMIT);
      const message = renderInquiry(lead, gatewayFiles, reference);
      let text = message.text;
      if (gatewayFiles.length < files.length) {
        const links = lead.photos.map((photo) => photo.url).filter(Boolean);
        text += `\n\n${files.length - gatewayFiles.length} photo(s) were too large to attach.`;
        if (links.length > 0) text += `\n${links.join('\n')}`;
      }

      try {
        const { messageId } = await sendEmail({
          to: inquiryRecipient(),
          cc: optionalAddress('INQUIRY_EMAIL_CC'),
          bcc: optionalAddress('INQUIRY_EMAIL_BCC'),
          replyTo: lead.email || undefined,
          subject: message.subject,
          text,
          html: message.html,
          attachments: gatewayFiles,
        });
        console.info('[mail] inquiry sent via platform gateway', messageId);
        return { status: 'sent' };
      } catch (error) {
        console.error('[mail] GoDaddy email gateway failed; trying SMTP.', errorText(error));
        if (!isSmtpConfigured()) return { status: 'failed' };
      }
    }

    await sendViaSmtp(lead, files, reference);
    return { status: 'sent' };
  } catch (error) {
    console.error('[mail] inquiry send failed', errorText(error));
    return { status: 'failed' };
  }
}
