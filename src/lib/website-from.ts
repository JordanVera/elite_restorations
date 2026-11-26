/** Display name on project-estimate and schedule-a-visit mail. The address is SMTP_USER. */
export const WEBSITE_FROM_DISPLAY_NAME = "Elite Restorations Website";

/** `"Elite Restorations Website" <smtp-user>`. Header characters are stripped from the mailbox. */
export function websiteFromHeader(smtpUser: string): string {
  const user = smtpUser.replace(/[\r\n"<>]/g, "").trim();
  return `"${WEBSITE_FROM_DISPLAY_NAME}" <${user}>`;
}
