import { z } from "zod";

import { sanitizeFieldKeys } from "@/lib/selections/fields";

const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value === "" ? null : value));

/** "1,250.50" or "$1250" to cents. Empty is null. */
const dollars = z
  .union([z.string(), z.number(), z.null()])
  .optional()
  .transform((value, ctx) => {
    if (value === null || value === undefined || value === "") return null;
    const n = typeof value === "number" ? value : Number(String(value).replace(/[$,\s]/g, ""));
    if (!Number.isFinite(n) || n < 0 || n > 10_000_000) {
      ctx.addIssue({ code: "custom", message: "Enter a dollar amount." });
      return z.NEVER;
    }
    return Math.round(n * 100);
  });

const quantity = z
  .union([z.string(), z.number(), z.null()])
  .optional()
  .transform((value, ctx) => {
    if (value === null || value === undefined || value === "") return null;
    const n = typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));
    if (!Number.isFinite(n) || n < 0 || n > 10_000_000) {
      ctx.addIssue({ code: "custom", message: "Enter a number." });
      return z.NEVER;
    }
    return Math.round(n * 100) / 100;
  });

/** YYYY-MM-DD stored at noon UTC so it shows as the same day in US time zones. */
const dueDate = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((value, ctx) => {
    if (!value) return null;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      ctx.addIssue({ code: "custom", message: "Use a valid date." });
      return z.NEVER;
    }
    const date = new Date(`${value}T12:00:00Z`);
    if (Number.isNaN(date.getTime())) {
      ctx.addIssue({ code: "custom", message: "Use a valid date." });
      return z.NEVER;
    }
    return date;
  });

export const requirementInput = z.object({
  id: z.string().min(1).max(40).optional().nullable(),
  categoryId: z.string().max(40).optional().nullable(),
  lineItemId: z.string().max(40).optional().nullable(),
  title: z.string().trim().min(1, "Give this selection a title.").max(120),
  area: text(80).optional().default(null),
  instructions: text(2000).optional().default(null),
  customerGuidance: text(2000).optional().default(null),
  required: z.boolean().default(true),
  quantity,
  unit: text(20).optional().default(null),
  allowance: dollars,
  preferredOptions: z
    .array(z.string().trim().max(200))
    .max(10)
    .default([])
    .transform((options) => options.filter(Boolean)),
  enabledFields: z.array(z.string()).max(20).default([]).transform(sanitizeFieldKeys),
  dueDate,
});

export type RequirementInput = z.input<typeof requirementInput>;
export type RequirementData = z.output<typeof requirementInput>;

export const portalSettingsInput = z.object({
  title: z.string().trim().min(1, "Add a title.").max(120),
  welcomeMessage: z.string().trim().max(2000),
  showAllowances: z.boolean(),
  expiresAt: dueDate,
});

export type PortalSettingsInput = z.input<typeof portalSettingsInput>;

export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  return issue?.message ?? "Check the form and try again.";
}

export function dateInputValue(date: Date | null | undefined): string {
  return date ? date.toISOString().slice(0, 10) : "";
}
