const MONTHS: Record<string, number> = {
  january: 0,
  febrero: 1,
  february: 1,
  marzo: 2,
  march: 2,
  abril: 3,
  april: 3,
  mayo: 4,
  may: 4,
  junio: 5,
  june: 5,
  julio: 6,
  july: 6,
  agosto: 7,
  august: 7,
  septiembre: 8,
  september: 8,
  octubre: 9,
  october: 9,
  noviembre: 10,
  november: 10,
  diciembre: 11,
  december: 11,
  enero: 0,
};

const MONTH = Object.keys(MONTHS)
  .sort((a, b) => b.length - a.length)
  .join('|');
const DAY_FIRST = new RegExp(
  `\\b(\\d{1,2})\\s+de\\s+(${MONTH})\\s+de\\s+(\\d{4})\\b`,
  'gi',
);
const MONTH_DAY = new RegExp(`\\b(${MONTH})\\s+(\\d{1,2}),\\s+(\\d{4})\\b`, 'gi');
const MONTH_YEAR = new RegExp(`\\b(${MONTH})\\s+(?:de\\s+)?(\\d{4})\\b`, 'gi');
const YEAR_ONLY = /\b(?:finished|completed|terminad[oa]s?)\s+(?:in|en)\s+(\d{4})\b/gi;

function utc(year: number, month: number, day: number) {
  if (month < 0 || month > 11 || day < 1 || day > 31) return undefined;
  return new Date(Date.UTC(year, month, day));
}

/**
 * Latest date named in the copy. Month-only dates use the first of that
 * month. A bare "finished in 2026" uses January 1 of that year.
 */
export function contentUpdated(text: string): Date | undefined {
  const found: Date[] = [];
  const push = (date: Date | undefined) => {
    if (date) found.push(date);
  };

  for (const match of text.matchAll(DAY_FIRST)) {
    const month = MONTHS[match[2].toLowerCase()];
    push(utc(Number(match[3]), month, Number(match[1])));
  }
  for (const match of text.matchAll(MONTH_DAY)) {
    const month = MONTHS[match[1].toLowerCase()];
    push(utc(Number(match[3]), month, Number(match[2])));
  }
  for (const match of text.matchAll(MONTH_YEAR)) {
    const month = MONTHS[match[1].toLowerCase()];
    push(utc(Number(match[2]), month, 1));
  }
  for (const match of text.matchAll(YEAR_ONLY)) {
    push(utc(Number(match[1]), 0, 1));
  }

  if (found.length === 0) return undefined;
  return found.reduce((latest, date) => (date > latest ? date : latest));
}
