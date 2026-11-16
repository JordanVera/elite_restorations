import type { AreaProfile } from '@/lib/local/areas';

const AN_CONSONANT_SOUND =
  /^(?:one|once|european|eulogy|u\.s\.?|usa|use|user|usual|usually|utility|utilities|unit|units|unique|union|university|uniform|ubiquitous)/i;
const AN_VOWEL_SOUND = /^(?:honest|hour|heir|honor|hoa)/i;

function needsAn(word: string) {
  if (AN_VOWEL_SOUND.test(word)) return true;
  if (AN_CONSONANT_SOUND.test(word)) return false;
  if (/^[FHLMNRSX]$/.test(word)) return true;
  if (/^[FHLMNRSX][A-Z0-9]/.test(word) && word === word.toUpperCase()) return true;
  return /^[aeiou]/i.test(word);
}

/** Fixes doubled articles, a/an, Galleria wording, and sentences that start lowercase. */
export function polishLocal(text: string) {
  let out = text.replace(/\s+/g, ' ').trim();
  out = out.replace(/\bthe The\b/g, 'the');
  out = out.replace(/\bThe The\b/g, 'The');
  out = out.replace(/\ba The (Heights|Woodlands)\b/g, 'a $1');
  out = out.replace(/\bA The (Heights|Woodlands)\b/g, 'A $1');
  out = out.replace(/\bRiver Oaks oaks\b/g, 'oaks');
  out = out.replace(/\bCinco Ranch ranch\b/g, 'ranch');
  out = out.replace(/\b(?:the |The )?Galleria Area\b/g, (match) =>
    match.startsWith('T') || match.startsWith('t') ? match.replace('Galleria Area', 'Galleria area') : 'the Galleria area',
  );
  out = out.replace(/\bthe the\b/g, 'the');
  out = out.replace(/\bThe the\b/g, 'The');
  out = out.replace(/\b([Aa]n?)(\s+)([A-Za-z][A-Za-z'.-]*)/g, (full, article: string, space: string, word: string) => {
    const an = needsAn(word);
    const cap = article[0] === 'A';
    const next = an ? (cap ? 'An' : 'an') : cap ? 'A' : 'a';
    return next.toLowerCase() === article.toLowerCase() ? full : `${next}${space}${word}`;
  });
  return capitalizeSentences(out);
}

function capitalizeSentences(text: string) {
  const cap = (part: string) => part.replace(/^([a-z])/, (letter) => letter.toUpperCase());
  const pieces = text.split(/([.!?]\s+)/);
  let out = cap(pieces[0] ?? '');
  for (let i = 1; i < pieces.length; i += 2) {
    out += (pieces[i] ?? '') + cap(pieces[i + 1] ?? '');
  }
  return out;
}

function escapeReg(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Keeps the place name in the first sentence, then says "here" or "this area"
 * so the same city is not the subject of every line.
 */
export function thinAreaName(text: string, area: AreaProfile) {
  const name = area.name;
  const shieldValues = [area.landmark, area.roads, area.housingShort].flatMap((value) => {
    if (!value) return [];
    const capped = value.replace(/^[a-z]/, (letter) => letter.toUpperCase());
    return capped === value ? [value] : [value, capped];
  });
  const shields = shieldValues.filter((value) => text.includes(value));
  const tokens = shields.map((value, index) => ({ token: `\u0001${index}\u0001`, value }));
  let working = text;
  for (const item of tokens) working = working.split(item.value).join(item.token);
  const restore = (value: string) =>
    tokens.reduce((current, item) => current.split(item.token).join(item.value), value);

  const forms = new Set<string>([name]);
  if (name.startsWith('The ')) {
    forms.add(`the ${name.slice(4)}`);
    forms.add(name.slice(4));
  }
  if (name === 'Galleria Area') {
    forms.add('the Galleria area');
    forms.add('The Galleria area');
    forms.add('Galleria area');
  }
  let first = -1;
  let firstForm = name;
  for (const form of forms) {
    const at = working.indexOf(form);
    if (at >= 0 && (first < 0 || at < first)) {
      first = at;
      firstForm = form;
    }
  }
  if (first < 0) return restore(working);
  const after = first + firstForm.length;
  const endRel = working.slice(after).search(/[.!?](\s|$)/);
  const cut = endRel < 0 ? working.length : after + endRel + 1;
  const head = working.slice(0, cut);
  let tail = working.slice(cut);
  const ordered = [...forms].sort((a, b) => b.length - a.length);
  for (const form of ordered) {
    const token = escapeReg(form);
    tail = tail
      .replace(new RegExp(`\\b[Ii]n ${token}\\b`, 'g'), 'here')
      .replace(new RegExp(`\\b[Ff]or ${token}\\b`, 'g'), 'for this house')
      .replace(new RegExp(`\\b[Aa] ${token}\\b`, 'g'), 'a')
      .replace(new RegExp(`\\bThe ${token}\\b`, 'g'), 'The')
      .replace(new RegExp(`\\bthe ${token}\\b`, 'g'), 'the')
      .replace(new RegExp(`\\b${token}'s\\b`, 'g'), "the area's")
      .replace(new RegExp(`\\b${token}\\b`, 'g'), 'this area');
  }
  return restore(`${head}${tail}`.replace(/[ ]{2,}/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim());
}

export function finishLocal(text: string, area: AreaProfile) {
  const thinned = thinAreaName(polishLocal(text), area);
  const repaired = thinned
    .replace(/\b[Aa]n? this area average\b/g, (match) =>
      match.startsWith('A') ? 'A local average' : 'a local average',
    )
    .replace(/\b[Aa]n? this area\b/g, (match) => (match.startsWith('A') ? 'This area' : 'this area'));
  return polishLocal(repaired);
}

export function mentionsArea(text: string, name: string) {
  if (text.includes(name)) return true;
  if (name.startsWith('The ') && text.includes(name.slice(4))) return true;
  if (name === 'Galleria Area' && /Galleria area/i.test(text)) return true;
  return false;
}
