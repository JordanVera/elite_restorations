import { z } from "zod";

import { incidents, insurerAnswers, rooms, timelines, yesNo } from "@/lib/inquiry";

export const MAX_PHOTOS = 6;

export const PHOTO_PATH_PREFIX = "lead-photos/";
const photoPathPattern = /^lead-photos\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg$/;

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const phoneDigits = (v: string) => v.replace(/\D/g, "").length;

const shared = {
  name: z.string().trim().min(2, "Please enter your name.").max(100, "That name is too long."),
  email: z.email("Please enter a valid email address.").max(200),
  photos: z
    .array(z.string().regex(photoPathPattern))
    .max(MAX_PHOTOS, `Please attach no more than ${MAX_PHOTOS} photos.`)
    .optional()
    .default([]),
  website: z.string().max(0).optional().default(""),
};

const optionalPhone = z
  .string()
  .trim()
  .max(30, "That phone number is too long.")
  .refine((v) => v === "" || phoneDigits(v) >= 10, "Please enter a 10-digit phone number.")
  .optional()
  .default("");

const requiredPhone = z
  .string()
  .trim()
  .max(30, "That phone number is too long.")
  .refine((v) => phoneDigits(v) >= 10, "Please enter a 10-digit phone number so we can call you back.");

export const remodelSchema = z.object({
  ...shared,
  path: z.literal("remodel"),
  phone: optionalPhone,
  room: z.enum(values(rooms), "Please choose the space."),
  staying: z.string().trim().max(300, "Please keep this under 300 characters.").optional().default(""),
  timeline: z.enum(values(timelines), "Please choose a timeline."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more, at least a sentence.")
    .max(2000, "Please keep this under 2,000 characters."),
});

export const recoverySchema = z.object({
  ...shared,
  path: z.literal("recovery"),
  phone: requiredPhone,
  incident: z.enum(values(incidents), "Please tell us what happened."),
  waterActive: z.enum(values(yesNo), "Please tell us whether water is still coming in."),
  insurer: z.enum(values(insurerAnswers), "Please choose an answer."),
  address: z.string().trim().min(5, "Please enter the property address.").max(200, "That address is too long."),
  message: z.string().trim().max(2000, "Please keep this under 2,000 characters.").optional().default(""),
});

export const leadSchema = z.discriminatedUnion("path", [remodelSchema, recoverySchema]);

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
export type RemodelLead = z.output<typeof remodelSchema>;
export type RecoveryLead = z.output<typeof recoverySchema>;
