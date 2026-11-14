const banned =
  /\bGAF\b|\bIICRC\b|\bgarant|\bcertific|\bauthorized\b|\bautorizad|\bpreferred\b|\bpreferid|\bpartner\b|\bdealer\b|\bendors|\bavalad|\bofficial\b|\boficial\b/i;

/** Allows only the exact English sentence "We are not public adjusters." */
export function assertCopyAllowed(label: string, text: string) {
  const withoutAllowed = text.replaceAll('We are not public adjusters.', '');
  if (/\bpublic adjusters?\b/i.test(withoutAllowed)) {
    throw new Error(`${label} says public adjuster outside the allowed phrase`);
  }
  if (banned.test(text)) {
    const match = text.match(banned);
    throw new Error(`${label} uses a banned phrase: ${match?.[0] ?? ''}`);
  }
}
