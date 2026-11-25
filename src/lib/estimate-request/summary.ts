import {
  agreementAnswers,
  applianceResets,
  areaTypes,
  backsplashStyles,
  bathScopes,
  budgetRanges,
  cabinetLights,
  cabinetPlans,
  contactMethods,
  contactTimes,
  counterThickness,
  existingFloors,
  finishLevels,
  floorLevels,
  hearAbout,
  lossCauses,
  materialSources,
  MEASURE_LABELS,
  type MeasureKey,
  newFloors,
  optionLabel,
  paintExteriorItems,
  propertyTypes,
  roles,
  roofPitches,
  roomMaterialSources,
  showerCurbs,
  showerDoors,
  sinkTypes,
  startWindows,
  STATE_NAMES,
  stories,
  toiletPlans,
  trades,
  vanitySinks,
  wetAreas,
  yesNo,
} from "@/lib/estimate-request/options";
import { isHighCeiling, roomQuantities, suggestedTemplates } from "@/lib/estimate-request/templates";
import type { AddressDraft, EstimateSubmission, Measures } from "@/lib/estimate-request/schema";

export type SummaryRow = { label: string; value: string; href?: string };
export type SummarySection = { title: string; step: number; rows: SummaryRow[] };

const YN_KEYS = new Set<MeasureKey>([
  "island",
  "flooringIncluded",
  "tileToCeiling",
  "exhaustFan",
  "furnitureMove",
  "ceilingsIncluded",
  "leaks",
  "sourceStopped",
  "packOut",
  "boardUp",
  "removeCounters",
  "showerNiche",
  "showerBench",
  "medicineCabinet",
  "movePlumbing",
  "attic",
  "standingWater",
  "roofSeparate",
]);

const CHOICE_LISTS: Partial<Record<MeasureKey, readonly { value: string; label: string }[]>> = {
  wetArea: wetAreas,
  vanitySinks,
  pitch: roofPitches,
  floorCurrent: existingFloors,
  floorNew: newFloors,
  floorLevel: floorLevels,
  countertopThickness: counterThickness,
  sinkType: sinkTypes,
  backsplashStyle: backsplashStyles,
  cabinetPlan: cabinetPlans,
  cabinetLights,
  showerDoor: showerDoors,
  showerCurb: showerCurbs,
  toiletPlan: toiletPlans,
  bathScope: bathScopes,
};

const TOKEN_LISTS: Partial<Record<MeasureKey, readonly { value: string; label: string }[]>> = {
  appliancesReset: applianceResets,
  paintExterior: paintExteriorItems,
};

export function estimateReference(submissionId: string): string {
  return `EST-${submissionId.slice(0, 8).toUpperCase()}`;
}

export function summarize(submission: EstimateSubmission, links: Record<string, string> = {}): SummarySection[] {
  const contact: SummaryRow[] = [
    { label: "Name", value: `${submission.firstName} ${submission.lastName}`.trim() },
    { label: "Mobile", value: submission.mobilePhone },
    { label: "Email", value: submission.email },
    { label: "OK to text", value: submission.textOptIn ? "Yes" : "No" },
  ];
  if (submission.company) contact.push({ label: "Company", value: submission.company });
  if (submission.secondPhone) contact.push({ label: "Second phone", value: submission.secondPhone });
  contact.push(
    { label: "How we should reach them", value: optionLabel(contactMethods, submission.contactMethod) },
    { label: "Best time", value: optionLabel(contactTimes, submission.bestTime) },
    { label: "How they heard about us", value: heardLine(submission) },
  );

  const property: SummaryRow[] = [
    { label: "Service address", value: formatAddress(submission.serviceAddress) },
    {
      label: "Billing address",
      value: submission.billingSame === "yes" ? "Same as service" : formatAddress(submission.billingAddress),
    },
    { label: "Property", value: optionLabel(propertyTypes, submission.propertyType) },
    { label: "Role", value: optionLabel(roles, submission.role) },
  ];
  if (submission.role !== "owner") {
    property.push(
      { label: "Owner", value: submission.ownerName },
      { label: "Owner phone", value: submission.ownerPhone },
      { label: "Owner email", value: submission.ownerEmail },
    );
  }
  if (submission.yearBuilt) property.push({ label: "Year built", value: submission.yearBuilt });
  property.push({ label: "Stories", value: optionLabel(stories, submission.stories) });

  const rooms = submission.rooms.map((room, index) => {
    const rows: SummaryRow[] = [
      { label: "Area", value: optionLabel(areaTypes, room.areaType) },
      { label: "Trades", value: room.trades.map((trade) => optionLabel(trades, trade)).join(", ") },
    ];
    if (room.tradeOther) rows.push({ label: "Other trade", value: room.tradeOther });
    rows.push({ label: "Work", value: room.description });
    if (room.roomMaterials) {
      rows.push({
        label: "Materials for this room",
        value: [optionLabel(roomMaterialSources, room.roomMaterials), room.roomMaterialsNotes].filter(Boolean).join(" · "),
      });
    }
    for (const key of Object.keys(MEASURE_LABELS) as MeasureKey[]) {
      const value = displayMeasure(key, room.measures[key]);
      if (value) rows.push({ label: MEASURE_LABELS[key], value });
    }
    if (room.upgrades) rows.push({ label: "Optional upgrades", value: room.upgrades });
    if (room.selections) rows.push({ label: "Selections", value: room.selections });
    room.files.forEach((file, fileIndex) => {
      rows.push(fileRow(room.files.length > 1 ? `File ${fileIndex + 1}` : "File", file, links));
    });
    if (room.sketch) rows.push(fileRow("Sketch", room.sketch, links));
    const title = room.name ? `Room ${index + 1} · ${room.name}` : `Room ${index + 1}`;
    return { title, step: 1, rows };
  });

  const project: SummaryRow[] = [
    { label: "Finish", value: optionLabel(finishLevels, submission.finish) },
    { label: "Start", value: optionLabel(startWindows, submission.startWhen) },
    { label: "Budget", value: optionLabel(budgetRanges, submission.budget) },
    { label: "Materials supplied by", value: optionLabel(materialSources, submission.materials) },
    { label: "Occupied during the work", value: yesNoLabel(submission.occupied) },
    { label: "Pets", value: yesNoLabel(submission.pets) },
  ];
  if (submission.petNotes) project.push({ label: "Pet notes", value: submission.petNotes });
  if (submission.accessNotes) project.push({ label: "Access notes", value: submission.accessNotes });

  const insurance: SummaryRow[] = [{ label: "Insurance claim", value: yesNoLabel(submission.claim) }];
  if (submission.claim === "yes") {
    insurance.push(
      { label: "Carrier", value: submission.carrier },
      { label: "Date of loss", value: formatDate(submission.lossDate) },
      { label: "Cause", value: submission.cause === "other" ? submission.causeOther : optionLabel(lossCauses, submission.cause) },
      { label: "Adjuster inspected", value: yesNoLabel(submission.adjusterInspected) },
    );
    if (submission.claimNumber) insurance.push({ label: "Claim number", value: submission.claimNumber });
    if (submission.adjusterName) insurance.push({ label: "Adjuster", value: submission.adjusterName });
    if (submission.adjusterPhone) insurance.push({ label: "Adjuster phone", value: submission.adjusterPhone });
    if (submission.adjusterEmail) insurance.push({ label: "Adjuster email", value: submission.adjusterEmail });
    if (submission.deductible) insurance.push({ label: "Deductible", value: submission.deductible });
    submission.adjusterFiles.forEach((file, index) => {
      insurance.push(fileRow(submission.adjusterFiles.length > 1 ? `Adjuster file ${index + 1}` : "Adjuster file", file, links));
    });
  }

  return [
    { title: "Contact", step: 0, rows: contact },
    { title: "Property", step: 0, rows: property },
    ...rooms,
    { title: "Project", step: 2, rows: project },
    { title: "Insurance", step: 3, rows: insurance },
  ];
}

function heardLine(submission: EstimateSubmission) {
  const label = optionLabel(hearAbout, submission.heard);
  if (submission.heard === "referral" && submission.referredBy) return `${label} · ${submission.referredBy}`;
  if (submission.heard === "other" && submission.hearOther) return `${label} · ${submission.hearOther}`;
  return label;
}

function yesNoLabel(value: string) {
  return optionLabel(yesNo, value) || value;
}

function displayMeasure(key: MeasureKey, value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (YN_KEYS.has(key)) return yesNoLabel(trimmed);
  const choices = CHOICE_LISTS[key];
  if (choices) return optionLabel(choices, trimmed);
  const tokens = TOKEN_LISTS[key];
  if (tokens) return trimmed.split(",").filter(Boolean).map((item) => optionLabel(tokens, item)).join(", ");
  return trimmed;
}

export function formatAddress(address: AddressDraft): string {
  const street = [address.street, address.unit].filter(Boolean).join(", ");
  const state = STATE_NAMES[address.state] ? `${address.state}` : address.state;
  const city = [address.city, state].filter(Boolean).join(", ");
  return [street, [city, address.zip].filter(Boolean).join(" ")].filter(Boolean).join("\n");
}

export function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function fileRow(label: string, file: { name: string; pathname: string }, links: Record<string, string>): SummaryRow {
  const href = links[file.pathname];
  return href ? { label, value: file.name, href } : { label, value: file.name };
}

export function sectionsToText(sections: readonly SummarySection[], reference: string): string {
  const blocks = sections.map((section) => {
    const rows = section.rows.map((row) => `${row.label}: ${row.href ? `${row.value}\n${row.href}` : row.value}`).join("\n");
    return `${section.title}\n${rows}`;
  });
  return [`Project estimate request`, `Reference: ${reference}`, "", ...blocks].join("\n\n");
}

export function sectionsToCsv(sections: readonly SummarySection[]): string {
  return quantitiesToCsvFromSections(sections);
}

export function quantitiesToCsv(submission: EstimateSubmission): string {
  const lines = ["Room,Trade,Template,Line item,Quantity,Unit,Notes,Optional"];
  for (const room of submission.rooms) {
    const templates = suggestedTemplates(room.trades, room.measures).join("; ");
    for (const row of roomQuantities(room.name || "Room", room.trades, room.measures, submission.stories)) {
      lines.push(
        [row.room, row.trade, row.template || templates, row.item, row.quantity, row.unit, row.notes, row.optional ? "Y" : "N"].map(csvCell).join(","),
      );
    }
    if (room.upgrades) {
      lines.push([room.name || "Room", "Upgrades", templates, "Optional upgrades", "", "", room.upgrades, "Y"].map(csvCell).join(","));
    }
  }
  return lines.join("\r\n");
}

function quantitiesToCsvFromSections(sections: readonly SummarySection[]): string {
  const lines = ["Section,Field,Value"];
  for (const section of sections) {
    for (const row of section.rows) {
      const value = row.href ? `${row.value} ${row.href}` : row.value;
      lines.push([csvCell(section.title), csvCell(row.label), csvCell(value)].join(","));
    }
  }
  return lines.join("\r\n");
}

function csvCell(value: string) {
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function submissionDocument(submission: EstimateSubmission, links: Record<string, string>, reference: string) {
  return {
    reference,
    company: "Elite Restorations",
    kind: "Project estimate request",
    jobberClient: {
      firstName: submission.firstName,
      lastName: submission.lastName,
      company: submission.company,
      mobile: submission.mobilePhone,
      phone2: submission.secondPhone,
      email: submission.email,
      okToText: submission.textOptIn,
      serviceStreet: submission.serviceAddress.street,
      unit: submission.serviceAddress.unit,
      city: submission.serviceAddress.city,
      state: submission.serviceAddress.state,
      zip: submission.serviceAddress.zip,
      billingSame: submission.billingSame,
      billingStreet: submission.billingSame === "no" ? submission.billingAddress.street : "",
      billingUnit: submission.billingSame === "no" ? submission.billingAddress.unit : "",
      billingCity: submission.billingSame === "no" ? submission.billingAddress.city : "",
      billingState: submission.billingSame === "no" ? submission.billingAddress.state : "",
      billingZip: submission.billingSame === "no" ? submission.billingAddress.zip : "",
      leadSource: submission.heard,
      referredBy: submission.referredBy,
      propertyType: submission.propertyType,
      role: submission.role,
      ownerName: submission.role === "owner" ? "" : submission.ownerName,
      ownerPhone: submission.role === "owner" ? "" : submission.ownerPhone,
      ownerEmail: submission.role === "owner" ? "" : submission.ownerEmail,
      yearBuilt: submission.yearBuilt,
      stories: submission.stories,
    },
    submissionId: submission.submissionId,
    pageUrl: submission.pageUrl || undefined,
    contact: {
      firstName: submission.firstName,
      lastName: submission.lastName,
      company: submission.company || undefined,
      mobilePhone: submission.mobilePhone,
      secondPhone: submission.secondPhone || undefined,
      email: submission.email,
      textOptIn: submission.textOptIn,
      contactMethod: optionLabel(contactMethods, submission.contactMethod),
      bestTime: optionLabel(contactTimes, submission.bestTime),
      heard: heardLine(submission),
    },
    property: {
      serviceAddress: formatAddress(submission.serviceAddress),
      billingAddress: submission.billingSame === "yes" ? "Same as service" : formatAddress(submission.billingAddress),
      propertyType: optionLabel(propertyTypes, submission.propertyType),
      role: optionLabel(roles, submission.role),
      owner:
        submission.role === "owner"
          ? undefined
          : { name: submission.ownerName, phone: submission.ownerPhone, email: submission.ownerEmail },
      yearBuilt: submission.yearBuilt || undefined,
      stories: optionLabel(stories, submission.stories),
    },
    rooms: submission.rooms.map((room) => ({
      name: room.name,
      area: { value: room.areaType, label: optionLabel(areaTypes, room.areaType) },
      trades: room.trades.map((trade) => ({ value: trade, label: optionLabel(trades, trade) })),
      suggestedTemplates: suggestedTemplates(room.trades, room.measures),
      highWalls: isHighCeiling(room.measures.ceilingFt),
      otherTrade: room.tradeOther || undefined,
      description: room.description,
      materials: room.roomMaterials
        ? { value: room.roomMaterials, label: optionLabel(roomMaterialSources, room.roomMaterials), notes: room.roomMaterialsNotes }
        : undefined,
      measurements: filledMeasures(room.measures),
      quantities: roomQuantities(room.name || "Room", room.trades, room.measures, submission.stories),
      upgrades: room.upgrades || undefined,
      selections: room.selections || undefined,
      files: room.files.map((file) => ({ name: file.name, url: links[file.pathname] })),
      sketch: room.sketch ? { name: room.sketch.name, url: links[room.sketch.pathname] } : undefined,
    })),
    project: {
      finish: optionLabel(finishLevels, submission.finish),
      start: optionLabel(startWindows, submission.startWhen),
      budget: optionLabel(budgetRanges, submission.budget),
      materials: optionLabel(materialSources, submission.materials),
      occupied: yesNoLabel(submission.occupied),
      pets: yesNoLabel(submission.pets),
      petNotes: submission.petNotes || undefined,
      accessNotes: submission.accessNotes || undefined,
    },
    insurance: {
      claim: { value: submission.claim, label: yesNoLabel(submission.claim) },
      carrier: submission.carrier || undefined,
      claimNumber: submission.claimNumber || undefined,
      dateOfLoss: submission.lossDate ? { value: submission.lossDate, label: formatDate(submission.lossDate) } : undefined,
      cause: submission.cause
        ? { value: submission.cause, label: submission.cause === "other" ? submission.causeOther : optionLabel(lossCauses, submission.cause) }
        : undefined,
      adjuster: {
        name: submission.adjusterName,
        phone: submission.adjusterPhone,
        email: submission.adjusterEmail,
        later: submission.adjusterLater,
      },
      adjusterInspected: submission.adjusterInspected ? { value: submission.adjusterInspected, label: yesNoLabel(submission.adjusterInspected) } : undefined,
      deductible: submission.deductible || undefined,
      agreement: submission.agreement ? { value: submission.agreement, label: optionLabel(agreementAnswers, submission.agreement) } : undefined,
      files: submission.adjusterFiles.map((file) => ({ name: file.name, url: links[file.pathname] })),
    },
  };
}

function filledMeasures(measures: Measures) {
  const out: Record<string, { value: string; label: string; display: string }> = {};
  for (const key of Object.keys(MEASURE_LABELS) as MeasureKey[]) {
    const display = displayMeasure(key, measures[key]);
    if (!display) continue;
    out[key] = { value: measures[key], label: MEASURE_LABELS[key], display };
  }
  return out;
}

export function staffSections(submission: EstimateSubmission, links: Record<string, string> = {}): SummarySection[] {
  const blank = (value: string) => value.trim() || "—";
  const jobber: SummaryRow[] = [
    { label: "First name", value: submission.firstName },
    { label: "Last name", value: submission.lastName },
    { label: "Company", value: blank(submission.company) },
    { label: "Mobile", value: submission.mobilePhone },
    { label: "Phone 2", value: blank(submission.secondPhone) },
    { label: "Email", value: submission.email },
    { label: "OK to text", value: submission.textOptIn ? "Yes" : "No" },
    { label: "Service street", value: submission.serviceAddress.street },
    { label: "Unit", value: blank(submission.serviceAddress.unit) },
    { label: "City", value: submission.serviceAddress.city },
    { label: "State", value: submission.serviceAddress.state },
    { label: "ZIP", value: submission.serviceAddress.zip },
    { label: "Billing same?", value: submission.billingSame === "yes" ? "Yes" : "No" },
  ];
  if (submission.billingSame !== "yes") {
    jobber.push(
      { label: "Billing street", value: submission.billingAddress.street },
      { label: "Billing unit", value: blank(submission.billingAddress.unit) },
      { label: "Billing city", value: submission.billingAddress.city },
      { label: "Billing state", value: submission.billingAddress.state },
      { label: "Billing ZIP", value: submission.billingAddress.zip },
    );
  }
  jobber.push(
    { label: "Lead source", value: heardLine(submission) },
    { label: "Property type", value: optionLabel(propertyTypes, submission.propertyType) },
    { label: "Role", value: optionLabel(roles, submission.role) },
  );
  if (submission.role !== "owner") {
    jobber.push(
      { label: "Owner", value: submission.ownerName },
      { label: "Owner phone", value: submission.ownerPhone },
      { label: "Owner email", value: submission.ownerEmail },
    );
  }
  jobber.push(
    { label: "Year built", value: blank(submission.yearBuilt) },
    { label: "Stories", value: optionLabel(stories, submission.stories) },
  );

  const header: SummaryRow[] = [
    { label: "Finish level", value: optionLabel(finishLevels, submission.finish) },
    { label: "Materials supplier", value: materialsSummary(submission) },
    { label: "Insurance", value: yesNoLabel(submission.claim) },
  ];

  const rooms = submission.rooms.map((room, index) => {
    const templates = suggestedTemplates(room.trades, room.measures);
    const rows: SummaryRow[] = [
      { label: "Suggested templates", value: templates.length ? templates.join("\n") : "None suggested" },
    ];
    if (isHighCeiling(room.measures.ceilingFt)) {
      rows.push({ label: "High walls", value: `Ceiling is ${room.measures.ceilingFt} ft` });
    }
    for (const item of roomQuantities(room.name || `Room ${index + 1}`, room.trades, room.measures, submission.stories)) {
      rows.push({ label: item.item, value: `${item.quantity} ${item.unit}${item.notes ? ` · ${item.notes}` : ""}` });
    }
    if (room.upgrades) rows.push({ label: "Optional upgrades", value: room.upgrades });
    if (room.selections) rows.push({ label: "Selections", value: room.selections });
    if (room.description) rows.push({ label: "Work", value: room.description });
    room.files.forEach((file, fileIndex) => rows.push(fileRow(room.files.length > 1 ? `File ${fileIndex + 1}` : "File", file, links)));
    if (room.sketch) rows.push(fileRow("Sketch", room.sketch, links));
    return { title: room.name ? `Room ${index + 1} · ${room.name}` : `Room ${index + 1}`, step: 1, rows };
  });

  const insurance: SummaryRow[] = [{ label: "Insurance claim", value: yesNoLabel(submission.claim) }];
  if (submission.claim === "yes" || submission.lossDate || submission.agreement) {
    if (submission.claim === "yes") {
      insurance.push(
        { label: "Carrier", value: submission.carrier },
        { label: "Claim number", value: submission.claimNumber },
        { label: "Date of loss", value: formatDate(submission.lossDate) },
        { label: "Cause", value: submission.cause === "other" ? submission.causeOther : optionLabel(lossCauses, submission.cause) },
        { label: "Adjuster", value: submission.adjusterLater ? "Not available yet" : submission.adjusterName },
        { label: "Adjuster phone", value: submission.adjusterLater ? "—" : submission.adjusterPhone },
        { label: "Adjuster email", value: submission.adjusterLater ? "—" : submission.adjusterEmail },
        { label: "Adjuster inspected", value: yesNoLabel(submission.adjusterInspected) },
        { label: "Deductible", value: blank(submission.deductible) },
      );
    } else if (submission.lossDate) {
      insurance.push({ label: "Date of loss", value: formatDate(submission.lossDate) });
    }
    if (submission.agreement) insurance.push({ label: "Work agreement", value: optionLabel(agreementAnswers, submission.agreement) });
    submission.adjusterFiles.forEach((file, index) => {
      insurance.push(fileRow(submission.adjusterFiles.length > 1 ? `Adjuster file ${index + 1}` : "Adjuster file", file, links));
    });
  }

  return [
    { title: "Jobber New Client", step: 0, rows: jobber },
    { title: "Project", step: 2, rows: header },
    ...rooms,
    { title: "Insurance", step: 3, rows: insurance },
  ];
}

function materialsSummary(submission: EstimateSubmission) {
  const project = optionLabel(materialSources, submission.materials);
  const rooms = submission.rooms
    .filter((room) => room.roomMaterials)
    .map((room) => `${room.name || "Room"}: ${optionLabel(roomMaterialSources, room.roomMaterials)}${room.roomMaterialsNotes ? ` (${room.roomMaterialsNotes})` : ""}`);
  return rooms.length ? `${project}\n${rooms.join("\n")}` : project;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const C = {
  page: "#ece6da",
  panel: "#f7f4ee",
  inset: "#e3dccd",
  line: "#d5ccbc",
  ink: "#16130f",
  muted: "#5c5548",
  accent: "#c0302b",
};

export function sectionsToHtml(sections: readonly SummarySection[], reference: string, name: string): string {
  const blocks = sections
    .map((section) => {
      const rows = section.rows
        .map((row, index) => {
          const value = row.href
            ? `<a href="${escapeHtml(row.href)}" style="color:${C.accent};text-decoration:underline;">${escapeHtml(row.value)}</a>`
            : escapeHtml(row.value).replaceAll("\n", "<br />");
          return `<tr>
            <td style="padding:12px 0;border-top:${index === 0 ? "0" : "1px"} solid ${C.line};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${C.muted};width:168px;vertical-align:top;">${escapeHtml(row.label)}</td>
            <td style="padding:12px 0 12px 12px;border-top:${index === 0 ? "0" : "1px"} solid ${C.line};font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.45;color:${C.ink};vertical-align:top;">${value}</td>
          </tr>`;
        })
        .join("");
      return `<h2 style="margin:28px 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:400;color:${C.ink};">${escapeHtml(section.title)}</h2>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rows}</table>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
</head>
<body bgcolor="${C.page}" style="margin:0;padding:0;background:${C.page};color:${C.ink};">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.page}" style="background:${C.page};">
    <tr>
      <td align="center" style="padding:32px 14px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.panel}" style="max-width:640px;background:${C.panel};border:1px solid ${C.line};">
          <tr>
            <td style="padding:28px 28px 8px;">
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${C.accent};">Project estimate request</p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:400;line-height:1.15;color:${C.ink};">${escapeHtml(name)}</h1>
              <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;color:${C.muted};">REF ${escapeHtml(reference)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;">${blocks}</td>
          </tr>
          <tr>
            <td bgcolor="${C.inset}" style="background:${C.inset};padding:16px 28px 20px;border-top:1px solid ${C.line};">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:${C.muted};">Reply to reach ${escapeHtml(name)}. JSON and CSV copies are attached. File links stay on this message.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
