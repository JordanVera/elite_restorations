import { z } from "zod";

import { contactIdentityCopy } from "@/lib/contact-identity";
import { isUsablePhone } from "@/lib/lead-fields";

import {
  isAccessKey,
  isUuid,
  MAX_ADJUSTER_FILES,
  MAX_ROOM_FILES,
  MAX_ROOMS,
  parseEstimatePath,
} from "@/lib/estimate-request/files";
import {
  areaTypes,
  budgetRanges,
  contactMethods,
  contactTimes,
  finishLevels,
  hearAbout,
  lossCauses,
  materialSources,
  MEASURE_LABELS,
  type MeasureKey,
  propertyTypes,
  roles,
  startWindows,
  stories,
  trades,
  US_STATES,
} from "@/lib/estimate-request/options";

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((item) => item.value) as [T[number]["value"], ...T[number]["value"][]];

const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ""));

const requiredText = (max: number, message: string) => text(max).refine((value) => value.length > 0, message);

const phoneMessage = contactIdentityCopy.en.phoneError;

const requiredPhone = text(30).refine(isUsablePhone, phoneMessage);
const optionalPhone = text(30).refine((value) => value.length === 0 || isUsablePhone(value), phoneMessage);

const emailMessage = "Enter a valid email address.";
const isEmail = (value: string) => z.email().safeParse(value).success;
const requiredEmail = text(200).refine(isEmail, emailMessage);
const optionalEmail = text(200).refine((value) => value.length === 0 || isEmail(value), emailMessage);

export const addressSchema = z.object({
  street: text(120),
  unit: text(40),
  city: text(80),
  state: z.enum(US_STATES),
  zip: text(10),
});

export type AddressDraft = z.output<typeof addressSchema>;

const measureText = text(160);
const measureLong = text(400);
const LONG_MEASURES = new Set<MeasureKey>(["plumbingAppliances", "fixturesToReplace", "subfloorNotes", "appliancesReset", "paintExterior", "sootWhere", "closetShelves", "fixturesReset", "stairSpindles"]);

export const measuresSchema = z.object(
  Object.fromEntries(
    (Object.keys(MEASURE_LABELS) as MeasureKey[]).map((key) => [key, LONG_MEASURES.has(key) ? measureLong : measureText]),
  ) as unknown as Record<MeasureKey, z.ZodType<string>>,
);

export type Measures = z.output<typeof measuresSchema>;

const storedFileSchema = z.object({
  pathname: z.string().trim().max(240),
  name: text(140).refine((value) => value.length > 0, "Name the file."),
});

export type StoredFile = z.output<typeof storedFileSchema>;

const roomShape = {
  id: z.string().trim().refine(isUuid, "That room could not be saved. Remove it and add it again."),
  areaType: z.enum(["", ...values(areaTypes)]),
  name: requiredText(80, "Name this room or area."),
  trades: z
    .array(z.enum(values(trades)))
    .min(1, "Choose at least one trade.")
    .max(trades.length),
  tradeOther: text(160),
  description: text(4000).refine((value) => value.length >= 8, "Describe the work in a few words."),
  measures: measuresSchema,
  upgrades: text(800),
  selections: text(800),
  roomMaterials: z.enum(["", "elite", "mine", "mixed"]),
  roomMaterialsNotes: text(300),
};

function isRealDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toISOString().slice(0, 10) === value;
}

function isReasonableLossDate(value: string, now = Date.now()) {
  if (!isRealDate(value)) return false;
  const time = new Date(`${value}T00:00:00Z`).getTime();
  return time >= Date.UTC(1990, 0, 1) && time <= now + 36 * 60 * 60 * 1000;
}

type RoomLike = {
  areaType: string;
  trades: readonly string[];
  tradeOther: string;
};

function refineRoom(room: RoomLike, ctx: z.RefinementCtx) {
  if (!room.areaType) {
    ctx.addIssue({ code: "custom", path: ["areaType"], message: "Choose the room or area." });
  }
  if (room.trades.includes("other") && room.tradeOther.trim().length < 2) {
    ctx.addIssue({ code: "custom", path: ["tradeOther"], message: "Describe the other trade." });
  }
  const unique = new Set(room.trades);
  if (unique.size !== room.trades.length) {
    ctx.addIssue({ code: "custom", path: ["trades"], message: "Each trade should be selected once." });
  }
}

export const roomDraftSchema = z.object(roomShape).superRefine(refineRoom);
export type RoomDraft = z.output<typeof roomDraftSchema>;

const roomSubmitSchema = z
  .object({
    ...roomShape,
    files: z.array(storedFileSchema).max(MAX_ROOM_FILES, `Each room can have ${MAX_ROOM_FILES} files.`),
    sketch: storedFileSchema.nullable(),
  })
  .superRefine(refineRoom);

const contactShape = {
  firstName: requiredText(60, "Enter your first name."),
  lastName: requiredText(60, "Enter your last name."),
  company: text(120),
  mobilePhone: requiredPhone,
  secondPhone: optionalPhone,
  email: requiredEmail,
  textOptIn: z.boolean(),
  serviceAddress: addressSchema,
  billingSame: z.enum(["", "yes", "no"]),
  billingAddress: addressSchema,
  heard: z.enum(["", ...values(hearAbout)]),
  referredBy: text(120),
  hearOther: text(160),
  propertyType: z.enum(["", ...values(propertyTypes)]),
  role: z.enum(["", ...values(roles)]),
  ownerName: text(120),
  ownerPhone: optionalPhone,
  ownerEmail: optionalEmail,
  yearBuilt: text(4),
  stories: z.enum(["", ...values(stories)]),
};

type ContactLike = {
  billingSame: string;
  billingAddress: AddressDraft;
  serviceAddress: AddressDraft;
  heard: string;
  referredBy: string;
  hearOther: string;
  role: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  yearBuilt: string;
  propertyType: string;
  stories: string;
};

function refineAddress(address: AddressDraft, ctx: z.RefinementCtx, path: string, label: string) {
  if (address.street.trim().length < 3) {
    ctx.addIssue({ code: "custom", path: [path, "street"], message: `Enter the ${label} street.` });
  }
  if (address.city.trim().length < 2) {
    ctx.addIssue({ code: "custom", path: [path, "city"], message: `Enter the ${label} city.` });
  }
  if (!/^\d{5}(?:-\d{4})?$/.test(address.zip.trim())) {
    ctx.addIssue({ code: "custom", path: [path, "zip"], message: "Enter a 5-digit ZIP." });
  }
}

function refineContact(value: ContactLike, ctx: z.RefinementCtx) {
  refineAddress(value.serviceAddress, ctx, "serviceAddress", "service");
  if (value.billingSame !== "yes" && value.billingSame !== "no") {
    ctx.addIssue({
      code: "custom",
      path: ["billingSame"],
      message: "Tell us if billing matches the service address.",
    });
  }
  if (value.billingSame === "no") refineAddress(value.billingAddress, ctx, "billingAddress", "billing");
  if (!value.heard) {
    ctx.addIssue({ code: "custom", path: ["heard"], message: "Tell us how you heard about us." });
  }
  if (value.heard === "referral" && value.referredBy.trim().length < 2) {
    ctx.addIssue({ code: "custom", path: ["referredBy"], message: "Who referred you?" });
  }
  if (value.heard === "other" && value.hearOther.trim().length < 2) {
    ctx.addIssue({ code: "custom", path: ["hearOther"], message: "Tell us how you heard about us." });
  }
  if (!value.propertyType) {
    ctx.addIssue({ code: "custom", path: ["propertyType"], message: "Choose the property type." });
  }
  if (!value.role) {
    ctx.addIssue({ code: "custom", path: ["role"], message: "Tell us if you are the owner, tenant, or property manager." });
  }
  if (!value.stories) {
    ctx.addIssue({ code: "custom", path: ["stories"], message: "Choose how many stories." });
  }
  if (value.role && value.role !== "owner") {
    if (value.ownerName.trim().length < 2) {
      ctx.addIssue({ code: "custom", path: ["ownerName"], message: "Enter the owner's name." });
    }
    if (!isUsablePhone(value.ownerPhone)) {
      ctx.addIssue({ code: "custom", path: ["ownerPhone"], message: phoneMessage });
    }
    if (!isEmail(value.ownerEmail)) {
      ctx.addIssue({ code: "custom", path: ["ownerEmail"], message: "Enter the owner's email." });
    }
  }
  if (value.yearBuilt) {
    const year = Number(value.yearBuilt);
    const max = new Date().getFullYear();
    if (!/^\d{4}$/.test(value.yearBuilt) || year < 1850 || year > max) {
      ctx.addIssue({
        code: "custom",
        path: ["yearBuilt"],
        message: "Enter a 4-digit year, or leave it blank.",
      });
    }
  }
}

const projectShape = {
  finish: z.enum(["", ...values(finishLevels)]),
  startWhen: z.enum(["", ...values(startWindows)]),
  budget: z.enum(["", ...values(budgetRanges)]),
  materials: z.enum(["", ...values(materialSources)]),
  occupied: z.enum(["", "yes", "no"]),
  pets: z.enum(["", "yes", "no"]),
  petNotes: text(300),
  accessNotes: text(600),
  bestTime: z.enum(["", ...values(contactTimes)]),
  contactMethod: z.enum(["", ...values(contactMethods)]),
};

function refineProject(
  value: {
    finish: string;
    startWhen: string;
    budget: string;
    materials: string;
    occupied: string;
    pets: string;
    bestTime: string;
    contactMethod: string;
  },
  ctx: z.RefinementCtx,
) {
  const checks: [keyof typeof value, string][] = [
    ["finish", "Choose a finish level."],
    ["startWhen", "Choose when you want to start."],
    ["budget", "Choose a budget range."],
    ["materials", "Tell us who is supplying the materials."],
    ["occupied", "Tell us if people will be living there during the work."],
    ["pets", "Tell us if there are pets."],
    ["bestTime", "Choose the best time to contact you."],
    ["contactMethod", "Choose how we should reach you."],
  ];
  for (const [key, message] of checks) {
    if (!value[key]) ctx.addIssue({ code: "custom", path: [key], message });
  }
}

const insuranceShape = {
  claim: z.enum(["", "yes", "no"], "Tell us if this is an insurance claim."),
  carrier: text(120),
  claimNumber: text(80),
  lossDate: text(20),
  cause: z.enum(["", ...values(lossCauses)]),
  causeOther: text(160),
  adjusterName: text(120),
  adjusterPhone: optionalPhone,
  adjusterEmail: optionalEmail,
  adjusterLater: z.boolean(),
  adjusterInspected: z.enum(["", "yes", "no"]),
  deductible: text(40),
  agreement: z.enum(["", "yes", "no", "unsure"]),
};

type InsuranceLike = {
  claim: string;
  carrier: string;
  claimNumber: string;
  lossDate: string;
  cause: string;
  causeOther: string;
  adjusterName: string;
  adjusterPhone: string;
  adjusterEmail: string;
  adjusterLater: boolean;
  adjusterInspected: string;
};

function refineInsurance(value: InsuranceLike, ctx: z.RefinementCtx) {
  if (value.claim !== "yes" && value.claim !== "no") {
    ctx.addIssue({ code: "custom", path: ["claim"], message: "Tell us if this is an insurance claim." });
    return;
  }
  if (value.lossDate && !isReasonableLossDate(value.lossDate)) {
    ctx.addIssue({ code: "custom", path: ["lossDate"], message: "Enter the date of loss, or leave it blank." });
  }
  if (value.claim !== "yes") return;
  if (value.carrier.trim().length < 2) {
    ctx.addIssue({ code: "custom", path: ["carrier"], message: "Enter the insurance carrier." });
  }
  if (value.claimNumber.trim().length < 1) {
    ctx.addIssue({ code: "custom", path: ["claimNumber"], message: "Enter the claim number." });
  }
  if (!isReasonableLossDate(value.lossDate)) {
    ctx.addIssue({ code: "custom", path: ["lossDate"], message: "Enter the date of loss." });
  }
  if (!value.cause) {
    ctx.addIssue({ code: "custom", path: ["cause"], message: "Choose the cause of the loss." });
  }
  if (value.cause === "other" && value.causeOther.trim().length < 2) {
    ctx.addIssue({ code: "custom", path: ["causeOther"], message: "Describe the cause." });
  }
  if (!value.adjusterLater) {
    if (value.adjusterName.trim().length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["adjusterName"],
        message: "Enter the adjuster's name, or check that you don't have it yet.",
      });
    }
    if (!isUsablePhone(value.adjusterPhone)) {
      ctx.addIssue({
        code: "custom",
        path: ["adjusterPhone"],
        message: "Enter the adjuster's phone, or check that you don't have it yet.",
      });
    }
    if (!isEmail(value.adjusterEmail)) {
      ctx.addIssue({
        code: "custom",
        path: ["adjusterEmail"],
        message: "Enter the adjuster's email, or check that you don't have it yet.",
      });
    }
  }
  if (value.adjusterInspected !== "yes" && value.adjusterInspected !== "no") {
    ctx.addIssue({
      code: "custom",
      path: ["adjusterInspected"],
      message: "Tell us if the adjuster has inspected.",
    });
  }
}

export const contactSchema = z.object(contactShape).superRefine(refineContact);
export const roomsSchema = z.object({
  rooms: z
    .array(roomDraftSchema)
    .min(1, "Add at least one room or area.")
    .max(MAX_ROOMS, `${MAX_ROOMS} rooms is the limit. Call us if the project is larger.`),
});
export const projectSchema = z.object(projectShape).superRefine(refineProject);
export const insuranceSchema = z.object(insuranceShape).superRefine(refineInsurance);
export const reviewSchema = z.object({
  consent: z.boolean().refine((value) => value, "Check the box so we can use these details for your estimate."),
});

const draftShape = {
  ...contactShape,
  rooms: z.array(roomDraftSchema).min(1).max(MAX_ROOMS),
  ...projectShape,
  ...insuranceShape,
  consent: z.boolean(),
};

export const estimateDraftSchema = z.object(draftShape).superRefine((value, ctx) => {
  refineContact(value, ctx);
  refineProject(value, ctx);
  refineInsurance(value, ctx);
});

export type EstimateDraft = z.output<typeof estimateDraftSchema>;

export const submitSchema = z
  .object({
    ...contactShape,
    rooms: z
      .array(roomSubmitSchema)
      .min(1, "Add at least one room or area.")
      .max(MAX_ROOMS, `${MAX_ROOMS} rooms is the limit.`),
    ...projectShape,
    ...insuranceShape,
    adjusterFiles: z.array(storedFileSchema).max(MAX_ADJUSTER_FILES, `${MAX_ADJUSTER_FILES} adjuster files is the limit.`),
    consent: z.boolean(),
    submissionId: z.string().trim().refine(isUuid, "This request could not be saved. Refresh and try again."),
    accessKey: z.string().trim().refine(isAccessKey, "This request could not be saved. Refresh and try again."),
    website: z.string().max(200),
    startedAt: z.number().int(),
    pageUrl: text(500),
  })
  .superRefine((value, ctx) => {
    refineContact(value, ctx);
    refineProject(value, ctx);
    refineInsurance(value, ctx);
    if (!value.consent) {
      ctx.addIssue({
        code: "custom",
        path: ["consent"],
        message: "Check the box so we can use these details for your estimate.",
      });
    }
    if (value.pageUrl && !/^https?:\/\//i.test(value.pageUrl)) {
      ctx.addIssue({ code: "custom", path: ["pageUrl"], message: "That page link is not valid." });
    }
    if (value.claim !== "yes" && value.adjusterFiles.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["adjusterFiles"],
        message: "Adjuster files belong with an insurance claim.",
      });
    }
    value.rooms.forEach((room, index) => {
      room.files.forEach((file, fileIndex) => {
        if (!fileMatches(file.pathname, value.submissionId, value.accessKey, "media", index)) {
          ctx.addIssue({
            code: "custom",
            path: ["rooms", index, "files", fileIndex, "pathname"],
            message: "That file is not part of this room.",
          });
        }
      });
      if (room.sketch && !fileMatches(room.sketch.pathname, value.submissionId, value.accessKey, "sketch", index)) {
        ctx.addIssue({
          code: "custom",
          path: ["rooms", index, "sketch", "pathname"],
          message: "That sketch is not part of this room.",
        });
      }
    });
    value.adjusterFiles.forEach((file, fileIndex) => {
      if (!fileMatches(file.pathname, value.submissionId, value.accessKey, "adjuster", null)) {
        ctx.addIssue({
          code: "custom",
          path: ["adjusterFiles", fileIndex, "pathname"],
          message: "That adjuster file is not part of this request.",
        });
      }
    });
  });

function fileMatches(
  pathname: string,
  submissionId: string,
  accessKey: string,
  role: "media" | "sketch" | "adjuster",
  roomIndex: number | null,
) {
  const parsed = parseEstimatePath(pathname);
  if (!parsed) return false;
  return (
    parsed.submissionId === submissionId.toLowerCase() &&
    parsed.accessKey === accessKey.toLowerCase() &&
    parsed.role === role &&
    parsed.roomIndex === roomIndex
  );
}

export type EstimateSubmission = z.output<typeof submitSchema>;

export type FieldErrors = Record<string, string>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".");
    const target = key || "_form";
    if (!out[target]) out[target] = issue.message;
  }
  return out;
}

const stepSchemas = [contactSchema, roomsSchema, projectSchema, insuranceSchema, reviewSchema] as const;

export function validateStep(step: number, draft: EstimateDraft): FieldErrors {
  const schema = stepSchemas[step];
  if (!schema) return {};
  const result = schema.safeParse(draft);
  return result.success ? {} : fieldErrors(result.error);
}

export function validateSubmission(input: unknown): { ok: true; data: EstimateSubmission } | { ok: false; errors: FieldErrors } {
  const result = submitSchema.safeParse(input);
  if (!result.success) return { ok: false, errors: fieldErrors(result.error) };
  return { ok: true, data: result.data };
}

export function emptyAddress(state: AddressDraft["state"] = "TX"): AddressDraft {
  return { street: "", unit: "", city: "", state, zip: "" };
}

export function emptyMeasures(): Measures {
  const measures = {} as Measures;
  for (const key of Object.keys(MEASURE_LABELS) as MeasureKey[]) {
    measures[key] = "";
  }
  return measures;
}

export function emptyRoom(): RoomDraft {
  return {
    id: crypto.randomUUID(),
    areaType: "",
    name: "",
    trades: [],
    tradeOther: "",
    description: "",
    measures: emptyMeasures(),
    upgrades: "",
    selections: "",
    roomMaterials: "",
    roomMaterialsNotes: "",
  };
}

export function emptyEstimate(): EstimateDraft {
  return {
    firstName: "",
    lastName: "",
    company: "",
    mobilePhone: "",
    secondPhone: "",
    email: "",
    textOptIn: false,
    serviceAddress: emptyAddress(),
    billingSame: "",
    billingAddress: emptyAddress(),
    heard: "",
    referredBy: "",
    hearOther: "",
    propertyType: "",
    role: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    yearBuilt: "",
    stories: "",
    rooms: [emptyRoom()],
    finish: "",
    startWhen: "",
    budget: "",
    materials: "",
    occupied: "",
    pets: "",
    petNotes: "",
    accessNotes: "",
    bestTime: "",
    contactMethod: "",
    claim: "",
    carrier: "",
    claimNumber: "",
    lossDate: "",
    cause: "",
    causeOther: "",
    adjusterName: "",
    adjusterPhone: "",
    adjusterEmail: "",
    adjusterLater: false,
    adjusterInspected: "",
    deductible: "",
    agreement: "",
    consent: false,
  };
}

const HEARD = new Set<string>(values(hearAbout));
const PROPERTY = new Set<string>(values(propertyTypes));
const ROLE = new Set<string>(values(roles));
const STORY = new Set<string>(values(stories));
const AREA = new Set<string>(values(areaTypes));
const TRADE = new Set<string>(values(trades));
const FINISH = new Set<string>(values(finishLevels));
const START = new Set<string>(values(startWindows));
const BUDGET = new Set<string>(values(budgetRanges));
const MATERIALS = new Set<string>(values(materialSources));
const METHOD = new Set<string>(values(contactMethods));
const TIME = new Set<string>(values(contactTimes));
const CAUSE = new Set<string>(["", ...values(lossCauses)]);
const STATE = new Set<string>(US_STATES);

function asChoice<T extends string>(value: unknown, allowed: Set<string>, fallback: T): T {
  return typeof value === "string" && allowed.has(value) ? (value as T) : fallback;
}

function asYn(value: unknown): "" | "yes" | "no" {
  return value === "yes" || value === "no" ? value : "";
}

/** Restores a saved draft and fills anything missing so a partial save still loads. */
export function hydrateDraft(raw: unknown): EstimateDraft | null {
  if (!raw || typeof raw !== "object") return null;
  const saved = raw as Partial<EstimateDraft>;
  const base = emptyEstimate();
  const rooms = Array.isArray(saved.rooms)
    ? saved.rooms.slice(0, MAX_ROOMS).map((room) => hydrateRoom(room)).filter((room) => room !== null)
    : [];
  return {
    ...base,
    firstName: stringField(saved.firstName, 60),
    lastName: stringField(saved.lastName, 60),
    company: stringField(saved.company, 120),
    mobilePhone: stringField(saved.mobilePhone, 30),
    secondPhone: stringField(saved.secondPhone, 30),
    email: stringField(saved.email, 200),
    textOptIn: saved.textOptIn === true,
    serviceAddress: hydrateAddress(saved.serviceAddress),
    billingSame: asYn(saved.billingSame),
    billingAddress: hydrateAddress(saved.billingAddress),
    heard: asChoice(saved.heard, HEARD, base.heard),
    referredBy: stringField(saved.referredBy, 120),
    hearOther: stringField(saved.hearOther, 160),
    propertyType: asChoice(saved.propertyType, PROPERTY, base.propertyType),
    role: asChoice(saved.role, ROLE, base.role),
    ownerName: stringField(saved.ownerName, 120),
    ownerPhone: stringField(saved.ownerPhone, 30),
    ownerEmail: stringField(saved.ownerEmail, 200),
    yearBuilt: stringField(saved.yearBuilt, 4),
    stories: asChoice(saved.stories, STORY, base.stories),
    rooms: rooms.length > 0 ? rooms : base.rooms,
    finish: asChoice(saved.finish, FINISH, base.finish),
    startWhen: asChoice(saved.startWhen, START, base.startWhen),
    budget: asChoice(saved.budget, BUDGET, base.budget),
    materials: asChoice(saved.materials, MATERIALS, base.materials),
    occupied: saved.occupied === "yes" || saved.occupied === "no" ? saved.occupied : "",
    pets: saved.pets === "yes" || saved.pets === "no" ? saved.pets : "",
    petNotes: stringField(saved.petNotes, 300),
    accessNotes: stringField(saved.accessNotes, 600),
    bestTime: asChoice(saved.bestTime, TIME, base.bestTime),
    contactMethod: asChoice(saved.contactMethod, METHOD, base.contactMethod),
    claim: asYn(saved.claim),
    carrier: stringField(saved.carrier, 120),
    claimNumber: stringField(saved.claimNumber, 80),
    lossDate: stringField(saved.lossDate, 20) || roomLossDate(saved.rooms),
    cause: asChoice(saved.cause, CAUSE, ""),
    causeOther: stringField(saved.causeOther, 160),
    adjusterName: stringField(saved.adjusterName, 120),
    adjusterPhone: stringField(saved.adjusterPhone, 30),
    adjusterEmail: stringField(saved.adjusterEmail, 200),
    adjusterLater: saved.adjusterLater === true,
    adjusterInspected: asYn(saved.adjusterInspected),
    deductible: stringField(saved.deductible, 40),
    agreement: saved.agreement === "yes" || saved.agreement === "no" || saved.agreement === "unsure" ? saved.agreement : "",
    consent: false,
  };
}

function stringField(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

function hydrateAddress(value: unknown): AddressDraft {
  const base = emptyAddress();
  if (!value || typeof value !== "object") return base;
  const address = value as Partial<AddressDraft>;
  return {
    street: stringField(address.street, 120),
    unit: stringField(address.unit, 40),
    city: stringField(address.city, 80),
    state: asChoice(address.state, STATE, "TX"),
    zip: stringField(address.zip, 10),
  };
}

function hydrateRoom(value: unknown): RoomDraft | null {
  if (!value || typeof value !== "object") return null;
  const room = value as Partial<RoomDraft>;
  const measures = emptyMeasures();
  if (room.measures && typeof room.measures === "object") {
    for (const key of Object.keys(MEASURE_LABELS) as MeasureKey[]) {
      const incoming = (room.measures as Record<string, unknown>)[key];
      if (typeof incoming === "string") (measures as Record<MeasureKey, string>)[key] = incoming.slice(0, 400);
    }
  }
  const tradesIn = Array.isArray(room.trades) ? room.trades.filter((item): item is RoomDraft["trades"][number] => TRADE.has(item)) : [];
  return {
    id: typeof room.id === "string" && isUuid(room.id) ? room.id : crypto.randomUUID(),
    areaType: asChoice(room.areaType, AREA, ""),
    name: stringField(room.name, 80),
    trades: tradesIn,
    tradeOther: stringField(room.tradeOther, 160),
    description: stringField(room.description, 4000),
    measures,
    upgrades: stringField(room.upgrades, 800),
    selections: stringField(room.selections, 800),
    roomMaterials: room.roomMaterials === "elite" || room.roomMaterials === "mine" || room.roomMaterials === "mixed" ? room.roomMaterials : "",
    roomMaterialsNotes: stringField(room.roomMaterialsNotes, 300),
  };
}

function roomLossDate(rooms: unknown): string {
  if (!Array.isArray(rooms)) return "";
  for (const room of rooms) {
    if (!room || typeof room !== "object") continue;
    const measures = (room as { measures?: { lossDate?: unknown } }).measures;
    if (typeof measures?.lossDate === "string" && measures.lossDate.trim()) return measures.lossDate.slice(0, 20);
  }
  return "";
}

export function stepForErrors(errors: FieldErrors): number {
  const keys = Object.keys(errors);
  if (keys.some((key) => key === "consent")) return 4;
  if (keys.some((key) => key.startsWith("rooms"))) return 1;
  const projectKeys = ["finish", "startWhen", "budget", "materials", "occupied", "pets", "petNotes", "accessNotes", "bestTime", "contactMethod"];
  if (keys.some((key) => projectKeys.includes(key))) return 2;
  const insuranceKeys = ["claim", "carrier", "claimNumber", "lossDate", "cause", "causeOther", "adjusterName", "adjusterPhone", "adjusterEmail", "adjusterLater", "adjusterInspected", "deductible", "agreement", "adjusterFiles"];
  if (keys.some((key) => insuranceKeys.some((name) => key === name || key.startsWith(`${name}.`)))) return 3;
  return 0;
}
