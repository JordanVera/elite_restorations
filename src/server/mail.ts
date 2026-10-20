import 'server-only';

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { get } from '@vercel/blob';
import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

import { site } from '@/lib/site';
import { describeLead } from '@/server/leads/describe';
import type { DeliverableLead } from '@/server/leads/types';
import {
  buildInquiryHtml,
  inquiryMessageId,
  inquiryReference,
  inquirySubject,
} from '@/server/inquiry-email-template';

function smtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
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

function inquiryCopy(
  name: 'INQUIRY_EMAIL_CC' | 'INQUIRY_EMAIL_BCC',
  fallback: string,
): string {
  return process.env[name]?.trim() || fallback;
}

function photoFilename(index: number): string {
  return `elite-photo-${String(index + 1).padStart(2, '0')}.jpg`;
}

function asAttachment(filename: string, content: Buffer): Mail.Attachment {
  return {
    filename,
    content,
    contentType: 'image/jpeg',
    contentDisposition: 'attachment',
  };
}

async function loadLogoAttachment(): Promise<Mail.Attachment> {
  const logoPath = path.join(
    process.cwd(),
    'public/images/logo/logo-main.png',
  );
  const content = await readFile(logoPath);
  return {
    filename: 'elite-logo.png',
    content,
    cid: 'elite-logo',
    contentType: 'image/png',
    contentDisposition: 'inline',
  };
}

async function downloadStoredPhoto(pathname: string): Promise<Buffer | null> {
  try {
    const result = await get(pathname, { access: 'public', useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const bytes = Buffer.from(await new Response(result.stream).arrayBuffer());
    return bytes.byteLength > 0 ? bytes : null;
  } catch (error) {
    console.error('[mail] could not download stored photo', pathname, error);
    return null;
  }
}

async function loadPhotoAttachments(
  lead: DeliverableLead,
): Promise<{ attachments: Mail.Attachment[]; filenames: string[] }> {
  const downloaded = await Promise.all(
    lead.photos.map(async (photo, index) => {
      const bytes = await downloadStoredPhoto(photo.pathname);
      if (!bytes) return null;
      return asAttachment(photoFilename(index), bytes);
    }),
  );

  const attachments = downloaded.filter(
    (file): file is Mail.Attachment => file !== null,
  );
  return {
    attachments,
    filenames: attachments.map((file) => String(file.filename)),
  };
}

/** Sends the lead summary to the business inbox via SMTP (Gmail App Password, etc.). */
export async function sendInquiryEmail(
  lead: DeliverableLead,
): Promise<boolean> {
  const config = smtpConfig();
  if (!config) return false;

  try {
    const reference = inquiryReference();
    const fromName = process.env.SMTP_FROM_NAME?.trim() || site.name;

    const [
      { attachments: photoAttachments, filenames: photoFilenames },
      logoAttachment,
    ] = await Promise.all([
      loadPhotoAttachments(lead),
      loadLogoAttachment().catch((error) => {
        console.error('[mail] logo unavailable; sending without it', error);
        return null;
      }),
    ]);

    const summary = describeLead(lead, {
      photosAttached: photoAttachments.length || undefined,
    });
    const html = buildInquiryHtml(lead, reference, {
      photosAttached: photoAttachments.length,
      photoFilenames,
    });

    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    await transport.sendMail({
      from: `"${fromName}" <${config.user}>`,
      to: inquiryRecipient(),
      cc: inquiryCopy('INQUIRY_EMAIL_CC', 'george@eliterestorations.com'),
      bcc: inquiryCopy('INQUIRY_EMAIL_BCC', 'jordanvera@eliterestorations.com'),
      replyTo: `"${lead.name}" <${lead.email}>`,
      subject: inquirySubject(lead, reference),
      messageId: inquiryMessageId(reference),
      headers: {
        'X-Elite-Inquiry-Ref': reference,
      },
      text: `${summary}\n\nReference: ${reference}\n\n—\n${lead.name}\n${lead.email}\n${lead.phone}`,
      html,
      attachments: [
        ...(logoAttachment ? [logoAttachment] : []),
        ...photoAttachments,
      ],
    });

    return true;
  } catch (error) {
    console.error('[mail] inquiry send failed', error);
    return false;
  }
}
