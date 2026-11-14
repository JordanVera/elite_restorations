/** Shared name and phone rules for every estimate, partner, and quote form. */

export const MIN_CONTACT_NAME_LENGTH = 2;
export const MIN_PHONE_DIGITS = 10;

export type ContactLocale = "en" | "es";

export const contactIdentityCopy = {
  en: {
    nameLabel: "Name",
    phoneLabel: "Phone",
    required: "required",
    nameError: "Please enter your name (at least 2 characters).",
    phoneError: "Enter a phone number with at least 10 digits so we can call you back.",
  },
  es: {
    nameLabel: "Nombre",
    phoneLabel: "Teléfono",
    required: "obligatorio",
    nameError: "Escriba su nombre (al menos 2 caracteres).",
    phoneError: "Escriba un teléfono con al menos 10 dígitos para que podamos llamarle.",
  },
} as const;

export function isValidContactName(value: string): boolean {
  return value.trim().length >= MIN_CONTACT_NAME_LENGTH;
}

/** Counts digits only, so (713) 909-0034, +1, dashes, and spaces all qualify. */
export function phoneDigitCount(value: string): number {
  return value.replace(/\D/g, "").length;
}

export function isValidContactPhone(value: string): boolean {
  return phoneDigitCount(value) >= MIN_PHONE_DIGITS;
}

export function contactFieldErrors(
  name: string,
  phone: string,
  locale: ContactLocale = "en",
): { name?: string; phone?: string } {
  const copy = contactIdentityCopy[locale];
  const errors: { name?: string; phone?: string } = {};
  if (!isValidContactName(name)) errors.name = copy.nameError;
  if (!isValidContactPhone(phone)) errors.phone = copy.phoneError;
  return errors;
}

/** English message for a 400 response. Null when name and phone are both usable. */
export function websiteLeadContactError(name: string, phone: string): string | null {
  const errors = contactFieldErrors(name, phone, "en");
  const parts = [errors.name, errors.phone].filter((part): part is string => Boolean(part));
  return parts.length ? parts.join(" ") : null;
}

export type LeadIssue = {
  path: readonly PropertyKey[];
  code: string;
  message: string;
};

/**
 * Turns schema issues into one sentence. Name and phone failures use the
 * shared copy so a script sees the same rule the form shows.
 */
export function leadInputErrorMessage(issues: readonly LeadIssue[]): string {
  const parts: string[] = [];
  const push = (text: string) => {
    if (text && !parts.includes(text)) parts.push(text);
  };

  for (const issue of issues) {
    const key = String(issue.path[0] ?? "");
    if (key === "name" || key === "phone") {
      const fallback = key === "name" ? contactIdentityCopy.en.nameError : contactIdentityCopy.en.phoneError;
      push(/too long/i.test(issue.message) ? issue.message : fallback);
      continue;
    }
    push(issue.message);
  }

  return parts.join(" ");
}

function asLeadIssues(value: unknown): LeadIssue[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const issues: LeadIssue[] = [];
  for (const issue of value) {
    if (!issue || typeof issue !== "object") continue;
    const record = issue as { path?: unknown; code?: unknown; message?: unknown };
    const path = Array.isArray(record.path) ? record.path.filter((part) => typeof part !== "object") : [];
    issues.push({
      path,
      code: typeof record.code === "string" ? record.code : "",
      message: typeof record.message === "string" ? record.message : "",
    });
  }
  return issues.length ? issues : null;
}

/** Walks an error and its cause chain for schema issues. */
export function collectLeadIssues(error: unknown): LeadIssue[] | null {
  const seen = new Set<unknown>();
  const queue: unknown[] = [error];
  while (queue.length) {
    const current = queue.shift();
    if (!current || typeof current !== "object" || seen.has(current)) continue;
    seen.add(current);
    const record = current as { issues?: unknown; cause?: unknown; error?: unknown };
    const issues = asLeadIssues(record.issues);
    if (issues) return issues;
    if ("cause" in record) queue.push(record.cause);
    if ("error" in record) queue.push(record.error);
  }
  return null;
}

export function messageFromUnknownError(error: unknown): string | null {
  const issues = collectLeadIssues(error);
  if (!issues) return null;
  const message = leadInputErrorMessage(issues);
  return message || null;
}
