const banned =
  /\bGAF\b|\bIICRC\b|\bgarant|\bcertific|\bauthorized\b|\bautorizad|\bpreferred\b|\bpreferid|\bpartner\b|\bdealer\b|\bendors|\bavalad|\bofficial\b|\boficial\b/i;

/** Allows only "We are not public adjusters." and "No somos ajustadores públicos." */
export function assertCopyAllowed(label: string, text: string) {
  const withoutAllowed = text
    .replaceAll('We are not public adjusters.', '')
    .replaceAll('No somos ajustadores públicos.', '');
  if (/\bpublic adjusters?\b/i.test(withoutAllowed)) {
    throw new Error(`${label} says public adjuster outside the allowed phrase`);
  }
  if (/ajustadores?\s+públicos?/i.test(withoutAllowed)) {
    throw new Error(`${label} says ajustador outside the allowed phrase`);
  }
  if (banned.test(text)) {
    const match = text.match(banned);
    throw new Error(`${label} uses a banned phrase: ${match?.[0] ?? ''}`);
  }
}
