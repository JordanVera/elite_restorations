import 'server-only';

import { get } from '@vercel/blob';
import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

import {
  buildVisitDocument,
  chicagoTimestamp,
  estimateRecipient,
  jobberClientLines,
  leadSubject,
  machineJsonFilename,
  splitPersonName,
  visitReference,
  type LeadMachineFile,
} from '@/lib/lead-machine';
import { signedFileUrl } from '@/lib/signed-file-link';
import { site } from '@/lib/site';
import { websiteFromHeader } from '@/lib/website-from';
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

/** Skip a copy that is already the To address, so a visit is not delivered twice. */
function copyAddress(
  name: 'INQUIRY_EMAIL_CC' | 'INQUIRY_EMAIL_BCC',
  to: string | undefined,
): string | undefined {
  const value = optionalAddress(name);
  if (!value || (to && value.toLowerCase() === to.toLowerCase())) return undefined;
  return value;
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

type VisitPackage = {
  subject: string;
  textExtra: string;
  jobberRows: { label: string; value: string }[];
  fileLinks: LeadMachineFile[];
  json: InquiryFile;
  to: string;
};

function visitPackage(lead: DeliverableLead, reference: string): VisitPackage | null {
  if (lead.path !== 'estimate' || lead.formType !== 'visit') return null;
  const names = splitPersonName(lead.name);
  const photos: LeadMachineFile[] = lead.photos.map((photo, index) => ({
    url: signedFileUrl(site.url, photo.pathname) ?? '',
    filename: `visit-photo-${String(index + 1).padStart(2, '0')}.jpg`,
  }));
  const document = buildVisitDocument(
    {
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      service: lead.service,
      claim: lead.claim,
      carrier: lead.carrier,
      contactMethod: lead.contactMethod,
      message: lead.message,
      serviceStreet: lead.serviceStreet,
      serviceCity: lead.serviceCity,
      serviceZip: lead.serviceZip,
      utmSource: lead.utmSource,
    },
    photos,
    { id: reference, submittedAt: chicagoTimestamp(new Date()) },
  );
  const jobberRows = jobberClientLines(document);
  const fileLinks = photos.filter((photo) => photo.url);
  const linkLines = fileLinks.map((photo) => `${photo.filename}\n${photo.url}`);
  return {
    subject: leadSubject('visit', names.firstName, names.lastName, reference),
    textExtra: [
      '',
      'Jobber New Client',
      ...jobberRows.map((row) => `${row.label}: ${row.value}`),
      ...(linkLines.length > 0 ? ['', 'Photo links:', ...linkLines] : []),
    ].join('\n'),
    jobberRows,
    fileLinks,
    json: {
      filename: machineJsonFilename('visit', reference),
      content: Buffer.from(JSON.stringify(document, null, 2), 'utf8'),
      contentType: 'application/json',
    },
    to: estimateRecipient(process.env, names),
  };
}

function renderInquiry(lead: DeliverableLead, files: InquiryFile[], reference: string, visit: VisitPackage | null) {
  const filenames = files.map((file) => file.filename);
  const summary = describeLead(lead, {
    photosAttached: files.length || undefined,
  });
  const contact = [lead.name, lead.phone, lead.email || 'No email provided'].join('\n');
  return {
    subject: visit?.subject ?? inquirySubject(lead, reference),
    html: buildInquiryHtml(lead, reference, {
      photosAttached: files.length,
      photoFilenames: filenames,
      jobberRows: visit?.jobberRows,
      fileLinks: visit?.fileLinks,
    }),
    text: `${summary}${visit?.textExtra ?? ''}\n\nReference: ${reference}\n\n—\n${contact}`,
  };
}

function fromHeader(user: string, visit: boolean): string {
  if (visit) return websiteFromHeader(user);
  const fromName = (process.env.SMTP_FROM_NAME?.trim() || site.name).replace(/["\r\n]/g, '');
  return `"${fromName}" <${user}>`;
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
  visit: VisitPackage | null,
): Promise<boolean> {
  const config = smtpConfig();
  if (!config) return false;

  const message = renderInquiry(lead, files, reference, visit);
  const cc = copyAddress('INQUIRY_EMAIL_CC', visit?.to);
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
    from: fromHeader(config.user, Boolean(visit)),
    to: visit?.to ?? inquiryRecipient(),
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
    attachments: [...files, ...(visit ? [visit.json] : [])].map(asSmtpAttachment),
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

  const visitLead = lead.path === 'estimate' && lead.formType === 'visit';
  const reference = visitLead ? visitReference() : inquiryReference();

  try {
    const files = await loadPhotoAttachments(lead);
    const visit = visitPackage(lead, reference);

    if (plan === 'gateway-then-smtp') {
      const gatewayFiles = files.filter((file) => file.content.byteLength <= GATEWAY_ATTACHMENT_LIMIT);
      const message = renderInquiry(lead, gatewayFiles, reference, visit);
      let text = message.text;
      if (gatewayFiles.length < files.length) {
        const links = (visit?.fileLinks ?? lead.photos).map((photo) => photo.url).filter(Boolean);
        text += `\n\n${files.length - gatewayFiles.length} photo(s) were too large to attach.`;
        if (links.length > 0) text += `\n${links.join('\n')}`;
      }
      const user = process.env.SMTP_USER?.trim();

      try {
        const { messageId } = await sendEmail({
          to: visit?.to ?? inquiryRecipient(),
          cc: copyAddress('INQUIRY_EMAIL_CC', visit?.to),
          bcc: optionalAddress('INQUIRY_EMAIL_BCC'),
          replyTo: lead.email || undefined,
          subject: message.subject,
          text,
          html: message.html,
          attachments: visit ? [...gatewayFiles, visit.json] : gatewayFiles,
          ...(visit && user ? { from: websiteFromHeader(user) } : {}),
        });
        console.info('[mail] inquiry sent via platform gateway', messageId);
        return { status: 'sent' };
      } catch (error) {
        console.error('[mail] GoDaddy email gateway failed; trying SMTP.', errorText(error));
        if (!isSmtpConfigured()) return { status: 'failed' };
      }
    }

    await sendViaSmtp(lead, files, reference, visit);
    return { status: 'sent' };
  } catch (error) {
    console.error('[mail] inquiry send failed', errorText(error));
    return { status: 'failed' };
  }
}
