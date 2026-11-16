const banned =
  /\bGAF\b|\bIICRC\b|\bgarant|\bcertific|\bauthorized\b|\bautorizad|\bpreferred\b|\bpreferid|\bpartner\b|\bdealer\b|\bendors|\bavalad|\bofficial\b|\boficial\b/i;

/**
 * A denial that Elite negotiates a claim. Working the estimate through with
 * the adjuster is allowed. Saying we do not negotiate is not.
 */
const negotiationDenial =
  /\b(?:do not|don't|does not|doesn't|did not|didn't|never|will not|won't|cannot|can't|not)\s+(?:[\w'-]+\s+){0,4}negotiat|\bno\s+(?:[\w'-]+\s+){0,3}negoci/i;

const vowelSound =
  /^(?:hour|hours|honest|honor|honour|heir|heiress|hoa)(?:\b|-)/i;
const consonantSound =
  /^(?:one|once|uni(?:on|versity|form|que|t)|usable|use(?:r|ful|d|able)?|euro(?:pean)?|u(?:s|saa|rl)|utility|hvacs?)(?:\b|-)/i;

function looksSpanish(label: string, text: string) {
  return /(?:^|\/)es(?:\/|$)/.test(label) || /[¿¡ñáéíóúü]/i.test(text);
}

function articleMismatch(text: string) {
  const re = /\b(a|an)\s+([A-Za-z][A-Za-z0-9-]*)/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    const article = match[1].toLowerCase();
    const word = match[2];
    const startsVowel = /^[aeiou]/i.test(word);
    if (article === 'a') {
      if (consonantSound.test(word)) continue;
      if (startsVowel || vowelSound.test(word)) return `a ${word}`;
    } else if (!vowelSound.test(word) && (!startsVowel || consonantSound.test(word))) {
      return `an ${word}`;
    }
  }
  return null;
}

function lowercaseSentenceStart(text: string) {
  const re = /([A-Za-z]{0,12})\.\s+([a-z])/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    const before = match[1];
    if (/^[A-Z]$/.test(before)) continue;
    if (/^(?:vs|fig|no|mr|mrs|ms|dr|st|ave|sq|ft|inc|jr|sr|etc|approx|est|eg|ie)$/i.test(before)) {
      continue;
    }
    return `. ${match[2]}`;
  }
  return null;
}

/** Allows only "We are not public adjusters." and "No somos ajustadores públicos." */
export function assertCopyAllowed(label: string, text: string) {
  const withoutAllowed = text
    .replaceAll('We are not public adjusters.', '')
    .replaceAll('No somos ajustadores públicos.', '');
  if (/public[- ]adjusters?/i.test(withoutAllowed)) {
    throw new Error(`${label} says public adjuster outside the allowed phrase`);
  }
  if (/ajustadores?\s+públicos?/i.test(withoutAllowed)) {
    throw new Error(`${label} says ajustador outside the allowed phrase`);
  }
  if (banned.test(text)) {
    const match = text.match(banned);
    throw new Error(`${label} uses a banned phrase: ${match?.[0] ?? ''}`);
  }
  if (negotiationDenial.test(text)) {
    const match = text.match(negotiationDenial);
    throw new Error(`${label} says Elite does not negotiate a claim: ${match?.[0] ?? ''}`);
  }
  if (/\bthe The\b/.test(text)) {
    throw new Error(`${label} has a doubled article: the The`);
  }
  if (!looksSpanish(label, text)) {
    const article = articleMismatch(text);
    if (article) throw new Error(`${label} has an article mismatch: ${article}`);
    const lower = lowercaseSentenceStart(text);
    if (lower) throw new Error(`${label} starts a sentence in lowercase: ${lower}`);
  }
}
