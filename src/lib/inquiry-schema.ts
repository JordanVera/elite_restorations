import { z } from "zod";

import { inquiryServiceOptions } from "@/lib/inquiry";

const serviceValues = inquiryServiceOptions.map((o) => o.value) as [string, ...string[]];

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "That name is too long."),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(30, "That phone number is too long.")
    .refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, "Please enter a 10-digit phone number.")
    .optional()
    .default(""),
  service: z.enum(serviceValues, "Please choose a service."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more, at least a sentence.")
    .max(2000, "Please keep this under 2,000 characters."),
  website: z.string().max(0).optional().default(""),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;
