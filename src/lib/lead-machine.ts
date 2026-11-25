import { randomBytes } from "node:crypto";

import { contactMethods as visitContactMethods, leadServices } from "@/lib/inquiry";
import {
  areaTypes,
  budgetRanges,
  contactMethods,
  contactTimes,
  finishLevels,
  hearAbout,
  lossCauses,
  materialSources,
  optionLabel,
  propertyTypes,
  roles,
  startWindows,
  trades,
  yesNo,
} from "@/lib/estimate-request/options";
import type { EstimateSubmission } from "@/lib/estimate-request/schema";
import { roomQuantities, suggestedTemplates } from "@/lib/estimate-request/templates";
import { site } from "@/lib/site";

export const DEFAULT_ESTIMATE_EMAIL = "george@eliterestorations.com";

export type LeadMachineAddress = {
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
};

export type LeadMachineQuantity = {
  lineItem: string;
  qty: string;
  unit: string;
  optional: boolean;
};

export type LeadMachineFile = {
  url: string;
  filename: string;
};

export type LeadMachineRoom = {
  name: string;
  type: string;
  trades: string[];
  suggestedTemplates: string[];
  quantities: LeadMachineQuantity[];
  notes: string;
  upgrades: string;
  selections: string;
  photos: LeadMachineFile[];
};

export type LeadMachineDocument = {
  schemaVersion: 1;
  id: string;
  formType: "estimate" | "visit";
  submittedAt: string;
  firstName: string;
  lastName: string;
  company: string;
  mobile: string;
  phone2: string;
  email: string;
  smsOptIn: boolean;
  service: LeadMachineAddress;
  billingSame: boolean;
  billing: LeadMachineAddress;
  leadSource: string;
  referredBy: string;
  propertyType: string;
  role: string;
  owner: { name: string; phone: string; email: string };
  rooms: LeadMachineRoom[];
  project: {
    finishLevel: string;
    desiredStart: string;
    budget: string;
    materialsBy: string;
    occupied: string;
    pets: string;
    access: string;
    bestTime: string;
    contactMethod: string;
  };
  insurance: {
    claim: string;
    carrier: string;
    claimNumber: string;
    dateOfLoss: string;
    cause: string;
    adjusterName: string;
    adjusterPhone: string;
    adjusterEmail: string;
    inspected: string;
    deductible: string;
    files: LeadMachineFile[];
  };
  message: string;
};

export type VisitMachineInput = {
  name: string;
  phone: string;
  email: string;
  service: string;
  claim: string;
  carrier: string;
  contactMethod: string;
  message: string;
  serviceStreet: string;
  serviceCity: string;
  serviceZip: string;
  utmSource: string;
};

const emptyAddress = (): LeadMachineAddress => ({ street: "", unit: "", city: "", state: "", zip: "" });

/** First word is the first name. The rest is the last name. */
export function splitPersonName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** A first or last name that starts with TEST marks a trial request. */
export function isTestName(firstName: string, lastName: string): boolean {
  return [firstName, lastName].some((part) => /^test/i.test(part.trim()));
}

export function leadSubject(
  formType: "estimate" | "visit",
  firstName: string,
  lastName: string,
  reference: string,
): string {
  const kind = formType === "estimate" ? "Project estimate" : "Schedule a visit";
  const name = `${firstName} ${lastName}`.trim();
  const prefix = isTestName(firstName, lastName) ? "TEST - " : "";
  return `${prefix}[${site.name}] ${kind} · ${name} · ${reference}`;
}

/** Eight hex characters, for example VIS-A1B2C3D4. */
export function visitReference(hex = randomBytes(4).toString("hex")): string {
  const id = hex.toLowerCase().replace(/[^0-9a-f]/g, "").slice(0, 8).padEnd(8, "0");
  return `VIS-${id.toUpperCase()}`;
}

export function machineJsonFilename(formType: "estimate" | "visit", id: string): string {
  return formType === "estimate" ? `estimate-request-${id}.json` : `visit-request-${id}.json`;
}

/** ISO 8601 in America/Chicago, including the CST/CDT offset. */
export function chicagoTimestamp(date: Date): string {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZoneName: "longOffset",
  });
  const parts = Object.fromEntries(
    fmt
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  let hour = parts.hour ?? "00";
  if (hour === "24") hour = "00";
  const offset = /([+-]\d{2}:\d{2})/.exec(parts.timeZoneName ?? "")?.[1] ?? "-06:00";
  return `${parts.year}-${parts.month}-${parts.day}T${hour}:${parts.minute}:${parts.second}${offset}`;
}

export function estimateRecipient(
  env: Record<string, string | undefined> = process.env,
  names?: { firstName: string; lastName: string },
): string {
  // TEMP test routing - remove after test
  if (names && isTestName(names.firstName, names.lastName)) return "michael@eliterestorations.com";
  const value = env.ESTIMATE_REQUEST_EMAIL_TO?.trim();
  if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return value;
  return DEFAULT_ESTIMATE_EMAIL;
}

function leadSourceLabel(submission: EstimateSubmission): string {
  if (submission.heard === "other") return submission.hearOther || "Other";
  return optionLabel(hearAbout, submission.heard);
}

function machineQuantities(
  roomName: string,
  tradeIds: readonly string[],
  measures: EstimateSubmission["rooms"][number]["measures"],
  stories: string,
): LeadMachineQuantity[] {
  return roomQuantities(roomName, tradeIds, measures, stories).map((row) => ({
    lineItem: row.notes ? `${row.item} — ${row.notes}` : row.item,
    qty: row.quantity,
    unit: row.unit,
    optional: row.optional,
  }));
}

function linkedFiles(
  files: readonly { name: string; pathname: string }[],
  links: Record<string, string>,
): LeadMachineFile[] {
  return files.map((file) => ({ url: links[file.pathname] ?? "", filename: file.name }));
}

export function buildEstimateDocument(
  submission: EstimateSubmission,
  links: Record<string, string>,
  meta: { id: string; submittedAt: string },
): LeadMachineDocument {
  const billingSame = submission.billingSame === "yes";
  const claimOpen = submission.claim === "yes";
  const adjusterKnown = claimOpen && !submission.adjusterLater;
  return {
    schemaVersion: 1,
    id: meta.id,
    formType: "estimate",
    submittedAt: meta.submittedAt,
    firstName: submission.firstName,
    lastName: submission.lastName,
    company: submission.company,
    mobile: submission.mobilePhone,
    phone2: submission.secondPhone,
    email: submission.email,
    smsOptIn: submission.textOptIn,
    service: { ...submission.serviceAddress },
    billingSame,
    billing: billingSame
      ? emptyAddress()
      : { ...submission.billingAddress },
    leadSource: leadSourceLabel(submission),
    referredBy: submission.referredBy,
    propertyType: optionLabel(propertyTypes, submission.propertyType),
    role: optionLabel(roles, submission.role),
    owner:
      submission.role === "owner"
        ? { name: "", phone: "", email: "" }
        : { name: submission.ownerName, phone: submission.ownerPhone, email: submission.ownerEmail },
    rooms: submission.rooms.map((room) => ({
      name: room.name,
      type: optionLabel(areaTypes, room.areaType),
      trades: room.trades.map((trade) => (trade === "other" && room.tradeOther ? room.tradeOther : optionLabel(trades, trade))),
      suggestedTemplates: suggestedTemplates(room.trades, room.measures),
      quantities: machineQuantities(room.name || "Room", room.trades, room.measures, submission.stories),
      notes: room.description,
      upgrades: room.upgrades,
      selections: room.selections,
      photos: linkedFiles(room.sketch ? [...room.files, room.sketch] : room.files, links),
    })),
    project: {
      finishLevel: optionLabel(finishLevels, submission.finish),
      desiredStart: optionLabel(startWindows, submission.startWhen),
      budget: optionLabel(budgetRanges, submission.budget),
      materialsBy: optionLabel(materialSources, submission.materials),
      occupied: optionLabel(yesNo, submission.occupied),
      pets: [optionLabel(yesNo, submission.pets), submission.petNotes].filter((part) => part.trim()).join(" — "),
      access: submission.accessNotes,
      bestTime: optionLabel(contactTimes, submission.bestTime),
      contactMethod: optionLabel(contactMethods, submission.contactMethod),
    },
    insurance: {
      claim: submission.claim,
      carrier: claimOpen ? submission.carrier : "",
      claimNumber: claimOpen ? submission.claimNumber : "",
      dateOfLoss: claimOpen ? submission.lossDate : "",
      cause: claimOpen ? (submission.cause === "other" ? submission.causeOther : optionLabel(lossCauses, submission.cause)) : "",
      adjusterName: adjusterKnown ? submission.adjusterName : "",
      adjusterPhone: adjusterKnown ? submission.adjusterPhone : "",
      adjusterEmail: adjusterKnown ? submission.adjusterEmail : "",
      inspected: claimOpen ? submission.adjusterInspected : "",
      deductible: claimOpen ? submission.deductible : "",
      files: claimOpen ? linkedFiles(submission.adjusterFiles, links) : [],
    },
    message: "",
  };
}

export function buildVisitDocument(
  input: VisitMachineInput,
  photos: LeadMachineFile[],
  meta: { id: string; submittedAt: string },
): LeadMachineDocument {
  const { firstName, lastName } = splitPersonName(input.name);
  return {
    schemaVersion: 1,
    id: meta.id,
    formType: "visit",
    submittedAt: meta.submittedAt,
    firstName,
    lastName,
    company: "",
    mobile: input.phone,
    phone2: "",
    email: input.email,
    smsOptIn: input.contactMethod === "text",
    service: {
      street: input.serviceStreet,
      unit: "",
      city: input.serviceCity,
      state: "TX",
      zip: input.serviceZip,
    },
    billingSame: true,
    billing: emptyAddress(),
    leadSource: input.utmSource.trim() || "Website",
    referredBy: "",
    propertyType: "",
    role: "",
    owner: { name: "", phone: "", email: "" },
    rooms: [
      {
        name: "",
        type: optionLabel(leadServices, input.service),
        trades: [],
        suggestedTemplates: [],
        quantities: [],
        notes: "",
        upgrades: "",
        selections: "",
        photos,
      },
    ],
    project: {
      finishLevel: "",
      desiredStart: "",
      budget: "",
      materialsBy: "",
      occupied: "",
      pets: "",
      access: "",
      bestTime: "",
      contactMethod: optionLabel(visitContactMethods, input.contactMethod),
    },
    insurance: {
      claim: input.claim,
      carrier: input.carrier,
      claimNumber: "",
      dateOfLoss: "",
      cause: "",
      adjusterName: "",
      adjusterPhone: "",
      adjusterEmail: "",
      inspected: "",
      deductible: "",
      files: [],
    },
    message: input.message,
  };
}

/** Rows for the human-readable Jobber New Client block. */
export function jobberClientLines(doc: LeadMachineDocument): { label: string; value: string }[] {
  const blank = (value: string) => value.trim() || "—";
  const rows: { label: string; value: string }[] = [
    { label: "First name", value: doc.firstName },
    { label: "Last name", value: doc.lastName },
    { label: "Company", value: blank(doc.company) },
    { label: "Mobile", value: blank(doc.mobile) },
    { label: "Phone 2", value: blank(doc.phone2) },
    { label: "Email", value: blank(doc.email) },
    { label: "OK to text", value: doc.smsOptIn ? "Yes" : "No" },
    { label: "Service street", value: doc.service.street },
    { label: "Unit", value: blank(doc.service.unit) },
    { label: "City", value: doc.service.city },
    { label: "State", value: blank(doc.service.state) },
    { label: "ZIP", value: doc.service.zip },
    { label: "Billing same?", value: doc.billingSame ? "Yes" : "No" },
  ];
  if (!doc.billingSame) {
    rows.push(
      { label: "Billing street", value: doc.billing.street },
      { label: "Billing unit", value: blank(doc.billing.unit) },
      { label: "Billing city", value: doc.billing.city },
      { label: "Billing state", value: blank(doc.billing.state) },
      { label: "Billing ZIP", value: doc.billing.zip },
    );
  }
  rows.push(
    { label: "Lead source", value: blank(doc.leadSource) },
    { label: "Property type", value: blank(doc.propertyType) },
    { label: "Role", value: blank(doc.role) },
  );
  if (doc.owner.name.trim()) {
    rows.push(
      { label: "Owner", value: doc.owner.name },
      { label: "Owner phone", value: doc.owner.phone },
      { label: "Owner email", value: doc.owner.email },
    );
  }
  return rows;
}
