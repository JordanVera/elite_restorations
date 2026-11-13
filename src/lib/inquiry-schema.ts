import { z } from "zod";

import { isAddressOrZip, isHttpUrl, isUsablePhone } from "@/lib/lead-fields";
import { claimAnswers, contactMethods, leadServices } from "@/lib/inquiry";

export const MAX_PHOTOS = 6;

export const PHOTO_PATH_PREFIX = "lead-photos/";
const photoPathPattern = /^lead-photos\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg$/;

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const optionalEmail = z
  .string()
  .trim()
  .max(200, "That email is too long.")
  .refine(
    (value) => value.length === 0 || z.email().safeParse(value).success,
    "Please enter a valid email address.",
  );

const requiredPhone = z
  .string()
  .trim()
  .max(30, "That phone number is too long.")
  .refine(isUsablePhone, "Enter a 10-digit phone number so we can call you back.");

const optionalHttpUrl = z
  .string()
  .trim()
  .max(800)
  .optional()
  .default("")
  .transform((value) => (isHttpUrl(value) ? value : ""));

const utmValue = z
  .string()
  .trim()
  .max(120)
  .optional()
  .default("")
  .transform((value) => value.replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, 120));

const shared = {
  name: z.string().trim().min(2, "Please enter your name.").max(100, "That name is too long."),
  phone: requiredPhone,
  photos: z
    .array(z.string().regex(photoPathPattern))
    .max(MAX_PHOTOS, `Please attach no more than ${MAX_PHOTOS} photos.`)
    .optional()
    .default([]),
  /** Honeypot. Filled by bots. A value here is dropped before email is sent. */
  website: z.string().max(200).optional().default(""),
  pageUrl: optionalHttpUrl,
  referrer: optionalHttpUrl,
  utmSource: utmValue,
  utmMedium: utmValue,
  utmCampaign: utmValue,
  utmTerm: utmValue,
  utmContent: utmValue,
  /** Client timestamp when the form was shown. Used for the time-to-submit check. */
  startedAt: z.number().int(),
};

const contactMethod = z.enum(values(contactMethods), "Choose how we should reach you.");

export const estimateSchema = z.object({
  ...shared,
  path: z.literal("estimate"),
  email: optionalEmail,
  address: z
    .string()
    .trim()
    .max(200, "That address is too long.")
    .refine(isAddressOrZip, "Enter a street address or a 5-digit ZIP."),
  service: z.enum(values(leadServices), "Choose the kind of work."),
  claim: z.enum(values(claimAnswers), "Tell us if this is an insurance claim."),
  carrier: z.string().trim().max(120, "That carrier name is too long.").optional().default(""),
  contactMethod,
  message: z.string().trim().max(2000, "Please keep this under 2,000 characters.").optional().default(""),
});

export const partnerSchema = z.object({
  ...shared,
  path: z.literal("partner"),
  email: z.email("Please enter a valid email address.").max(200),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company or brokerage.")
    .max(120, "That company name is too long."),
  contactMethod,
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more, at least a sentence.")
    .max(2000, "Please keep this under 2,000 characters."),
});

export const leadSchema = z.discriminatedUnion("path", [estimateSchema, partnerSchema]).superRefine((value, ctx) => {
  if (value.path === "estimate" && value.contactMethod === "email" && value.email.length === 0) {
    ctx.addIssue({
      code: "custom",
      path: ["email"],
      message: "Enter an email address, or choose phone or text.",
    });
  }
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
