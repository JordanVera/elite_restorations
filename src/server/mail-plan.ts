export type EmailTransportPlan = "smtp" | "gateway-then-smtp" | "unconfigured";

/**
 * Where a lead email should go.
 *
 * Vercel does not run GoDaddy's loopback gateway. SMTP is the production path.
 * EMAIL_GATEWAY=godaddy is only honored off Vercel, for a leftover GoDaddy host.
 */
export function emailTransportPlan(
  env: Record<string, string | undefined>,
): EmailTransportPlan {
  const smtp = Boolean(env.SMTP_USER?.trim() && env.SMTP_PASS?.trim());
  const onVercel = env.VERCEL === "1";
  if (!onVercel && env.EMAIL_GATEWAY === "godaddy") return "gateway-then-smtp";
  return smtp ? "smtp" : "unconfigured";
}
