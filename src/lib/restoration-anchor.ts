import { assertCopyAllowed } from '@/lib/copy-guards';

const enAnchors = [
  'restoration company in Houston',
  'Houston restoration company',
  'family-owned restoration company in Houston',
  'restoration company serving Houston',
  'Greater Houston restoration company',
] as const;

const esAnchors = [
  'empresa de restauración en Houston',
  'empresa familiar de restauración en Houston',
  'compañía de restauración en Houston',
  'empresa de restauración que sirve a Houston',
  'restauración de casas en Houston',
] as const;

function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function restorationCompanyLink(seed: string, locale: 'en' | 'es' = 'en') {
  const anchors = locale === 'es' ? esAnchors : enAnchors;
  const label = anchors[hashString(`${locale}:${seed}`) % anchors.length] ?? anchors[0];
  return {
    href: locale === 'es' ? '/es/restoration-company-houston' : '/restoration-company-houston',
    label,
  };
}

const restorationServices = new Set([
  'water-damage-restoration',
  'insurance-claims',
  'painting-drywall-repair',
  'roofing',
  'roof-replacement',
  'roofing-emergency-tarp-repair',
  'siding',
]);

export function isRestorationService(slug: string) {
  return restorationServices.has(slug);
}

/** Sentence parts around the anchor, so the template can render one real link. */
export function restorationSentence(
  seed: string,
  locale: 'en' | 'es',
  areaName: string,
  restoration: boolean,
) {
  const link = restorationCompanyLink(`${seed}:${areaName}`, locale);
  const variant = hashString(`line:${locale}:${seed}`) % 2;
  if (locale === 'es') {
    if (restoration) {
      return variant === 0
        ? {
            before: `Las casas en ${areaName} que necesitan secado o una reparación por tormenta pueden empezar con nuestra `,
            after: ', desde nuestra oficina en el oeste de Houston (77082).',
            ...link,
          }
        : {
            before: `Si el agua o una tormenta es el motivo de la visita en ${areaName}, nuestra `,
            after: ' agenda ese trabajo desde nuestra oficina en el oeste de Houston (77082).',
            ...link,
          };
    }
    return variant === 0
      ? {
          before: `Si una fuga abrió los muros en ${areaName}, nuestra `,
          after: ' seca la casa desde nuestra oficina en el oeste de Houston (77082).',
          ...link,
        }
      : {
          before: `Cuando el trabajo en ${areaName} empezó por una fuga, nuestra `,
          after: ' seca la estructura antes del acabado, desde nuestra oficina en el oeste de Houston (77082).',
          ...link,
        };
  }
  if (restoration) {
    return variant === 0
      ? {
          before: `Houses in ${areaName} that need drying or a storm repair can start with our `,
          after: ', working from our office in west Houston (77082).',
          ...link,
        }
      : {
          before: `If water or a storm is why you called about ${areaName}, our `,
          after: ' schedules that work from our office in west Houston (77082).',
          ...link,
        };
  }
  return variant === 0
    ? {
        before: `If a leak opened the walls in ${areaName}, our `,
        after: ' dries the house from our office in west Houston (77082).',
        ...link,
      }
    : {
        before: `When work in ${areaName} started with a leak, our `,
        after: ' dries the structure before the finish work, from our office in west Houston (77082).',
        ...link,
      };
}

const samples = ['Katy', 'Galveston', 'Texas City', 'The Woodlands'];
for (const areaName of samples) {
  for (const restoration of [true, false]) {
    for (const locale of ['en', 'es'] as const) {
      for (let n = 0; n < 12; n += 1) {
        const line = restorationSentence(`sample-${n}`, locale, areaName, restoration);
        assertCopyAllowed(
          `restoration-sentence:${locale}:${areaName}`,
          `${line.before}${line.label}${line.after}`,
        );
      }
    }
  }
}
