import type { PDFFont, PDFImage, PDFPage } from "pdf-lib";

import { site } from "@/lib/site";

export const PHOTO_SLOTS = [
  {
    key: "wide",
    label: "Wide shot",
    prompt: "Stand in a doorway or corner and get the whole room, floor to ceiling.",
  },
  {
    key: "close",
    label: "Close-up of damage",
    prompt: "Stains, cracks, missing material, or the source of the water if you can see it.",
  },
  {
    key: "wet",
    label: "Wet materials",
    prompt: "Wet flooring, drywall, insulation, furniture or belongings.",
  },
] as const;

export type PhotoSlotKey = (typeof PHOTO_SLOTS)[number]["key"];

export type LogRoom = {
  name: string;
  note: string;
  photos: Record<PhotoSlotKey, Blob | null>;
};

export type LogCover = {
  owner: string;
  address: string;
  insurer: string;
  claimNumber: string;
  lossDate: string;
};

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;

const INK = { r: 0.09, g: 0.075, b: 0.06 };
const MUTED = { r: 0.4, g: 0.37, b: 0.33 };
const RULE = { r: 0.8, g: 0.78, b: 0.74 };

/** Standard PDF fonts only encode Latin-1 style text, so anything else becomes "?". */
function safe(text: string) {
  return text.replace(/[^\n\x20-\x7E\u00A0-\u00FF\u2018\u2019\u201C\u201D\u2013\u2014\u2022\u2026]/gu, "?");
}

function wrap(text: string, font: PDFFont, size: number, width: number) {
  const lines: string[] = [];
  for (const paragraph of safe(text).split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= width) {
        line = next;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }
    lines.push(line);
  }
  return lines;
}

function formatDate(value: Date) {
  return value.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function formatLossDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  return formatDate(new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
}

export function photoCount(rooms: LogRoom[]) {
  return rooms.reduce((sum, room) => sum + Object.values(room.photos).filter(Boolean).length, 0);
}

export async function buildInsurancePdf(cover: LogCover, rooms: LogRoom[]): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const ink = rgb(INK.r, INK.g, INK.b);
  const muted = rgb(MUTED.r, MUTED.g, MUTED.b);
  const rule = rgb(RULE.r, RULE.g, RULE.b);

  const text = (page: PDFPage, value: string, x: number, y: number, size: number, opts?: { bold?: boolean; muted?: boolean }) =>
    page.drawText(safe(value), {
      x,
      y,
      size,
      font: opts?.bold ? bold : regular,
      color: opts?.muted ? muted : ink,
    });

  const drawFit = (page: PDFPage, image: PDFImage, x: number, y: number, w: number, h: number) => {
    const scale = Math.min(w / image.width, h / image.height);
    const width = image.width * scale;
    const height = image.height * scale;
    page.drawImage(image, { x: x + (w - width) / 2, y: y + (h - height) / 2, width, height });
  };

  const drawSlot = async (
    page: PDFPage,
    label: string,
    blob: Blob | null,
    x: number,
    top: number,
    w: number,
    h: number,
  ) => {
    text(page, label.toUpperCase(), x, top + 8, 8, { bold: true, muted: true });
    page.drawRectangle({ x, y: top - h, width: w, height: h, borderColor: rule, borderWidth: 0.75 });
    if (!blob) {
      const message = "No photo added";
      const size = 10;
      text(page, message, x + (w - regular.widthOfTextAtSize(message, size)) / 2, top - h / 2 - 3, size, { muted: true });
      return;
    }
    const image = await doc.embedJpg(await blob.arrayBuffer());
    drawFit(page, image, x + 4, top - h + 4, w - 8, h - 8);
  };

  const cover1 = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN - 10;
  text(cover1, "HOMEOWNER PHOTO RECORD", MARGIN, y, 9, { bold: true, muted: true });
  y -= 40;
  text(cover1, "Water and storm damage", MARGIN, y, 28);
  y -= 34;
  text(cover1, "Room-by-room photo log", MARGIN, y, 28);
  y -= 24;
  cover1.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 0.75, color: rule });
  y -= 34;

  const total = photoCount(rooms);
  const details: [string, string][] = [
    ["Property owner", cover.owner],
    ["Property address", cover.address],
    ["Insurance company", cover.insurer],
    ["Claim number", cover.claimNumber],
    ["Date of damage", cover.lossDate ? formatLossDate(cover.lossDate) : ""],
    ["Date prepared", formatDate(new Date())],
    ["Rooms documented", String(rooms.length)],
    ["Photos", String(total)],
  ];
  for (const [label, value] of details) {
    text(cover1, label.toUpperCase(), MARGIN, y, 8, { bold: true, muted: true });
    const lines = wrap(value || "Not provided", regular, 12, CONTENT_W - 150);
    lines.forEach((line, i) => text(cover1, line, MARGIN + 150, y - i * 15, 12, { muted: !value }));
    y -= Math.max(1, lines.length) * 15 + 12;
  }

  const disclaimer = wrap(
    "This is a photo record prepared by the property owner. It is not a claim filing and does not replace any forms or documentation your insurance company requires.",
    regular,
    9,
    CONTENT_W,
  );
  disclaimer.forEach((line, i) => text(cover1, line, MARGIN, MARGIN + 30 - i * 12, 9, { muted: true }));
  text(cover1, `Prepared with the ${site.name} photo log, ${site.phone.display}`, MARGIN, MARGIN, 8, { muted: true });

  for (const [index, room] of rooms.entries()) {
    const page = doc.addPage([PAGE_W, PAGE_H]);
    const name = room.name.trim() || `Room ${index + 1}`;

    text(page, `ROOM ${index + 1} OF ${rooms.length}`, MARGIN, PAGE_H - MARGIN - 8, 9, { bold: true, muted: true });
    text(page, name, MARGIN, PAGE_H - MARGIN - 38, 22);
    page.drawLine({
      start: { x: MARGIN, y: PAGE_H - MARGIN - 52 },
      end: { x: PAGE_W - MARGIN, y: PAGE_H - MARGIN - 52 },
      thickness: 0.75,
      color: rule,
    });

    const [wide, close, wet] = PHOTO_SLOTS;
    const wideTop = PAGE_H - MARGIN - 76;
    await drawSlot(page, wide.label, room.photos.wide, MARGIN, wideTop, CONTENT_W, 260);

    const gap = 12;
    const half = (CONTENT_W - gap) / 2;
    const rowTop = wideTop - 260 - 36;
    await drawSlot(page, close.label, room.photos.close, MARGIN, rowTop, half, 180);
    await drawSlot(page, wet.label, room.photos.wet, MARGIN + half + gap, rowTop, half, 180);

    let noteY = rowTop - 180 - 28;
    text(page, "NOTES", MARGIN, noteY, 8, { bold: true, muted: true });
    noteY -= 16;
    const lines = wrap(room.note.trim() || "No notes added.", regular, 10.5, CONTENT_W);
    for (const line of lines) {
      if (noteY < MARGIN + 14) break;
      text(page, line, MARGIN, noteY, 10.5, { muted: !room.note.trim() });
      noteY -= 14;
    }
  }

  const pages = doc.getPages();
  pages.forEach((page, i) => {
    const label = `Page ${i + 1} of ${pages.length}`;
    text(page, label, PAGE_W - MARGIN - regular.widthOfTextAtSize(label, 8), MARGIN - 24, 8, { muted: true });
  });

  return doc.save();
}
