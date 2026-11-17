import { assertCopyAllowed } from '@/lib/copy-guards';
import { img, type Img } from '@/lib/images';
import { fitDescription, titleFits } from '@/lib/seo';

const phone = '(713) 909-0034';

const alts = [
  'Tina de hidromasaje abierta sobre un deck de composite gris construido por Elite Restorations en Katy, TX, con árboles más allá de una cerca negra.',
  'Deck de composite terminado y plataforma con la tina de hidromasaje cerrada, con cenefa oscura y piedra roja, construido por Elite Restorations en Katy, TX.',
  'Vista en ángulo de una tina de hidromasaje abierta sobre tablas de deck de composite construidas por Elite Restorations en Katy, TX.',
  'Deck de composite con escalones integrados y una tina de hidromasaje abierta, visto desde el patio, construido por Elite Restorations en Katy, TX.',
  'Detalle de la esquina del deck de composite, la cenefa oscura y los escalones integrados construidos por Elite Restorations en Katy, TX.',
  'Vista a lo largo de un deck de composite y una tina de hidromasaje cerrada en la parte de atrás de una casa en Katy, TX, construido por Elite Restorations.',
];

const files = [
  'katy-composite-deck-01.jpg',
  'katy-composite-deck-02.jpg',
  'katy-composite-deck-03.jpg',
  'katy-composite-deck-04.jpg',
  'katy-composite-deck-05.jpg',
  'katy-composite-deck-06.jpg',
];

const gallery: Img[] = files.map((file, index) =>
  img(`/images/projects/katy-deck/${file}`, alts[index] ?? file),
);

export const katyDeckStoryEs = {
  slug: 'katy-composite-deck',
  path: '/es/projects/katy-composite-deck',
  englishPath: '/projects/katy-composite-deck',
  metaTitle: 'Deck de composite en Katy',
  title: 'Deck de composite y plataforma para tina de hidromasaje, Katy, TX',
  category: 'Techo y exterior',
  tagline:
    'Deck nuevo de composite gris marrón, con escalones y una tina de hidromasaje, terminado en octubre de 2024.',
  description:
    'Deck de composite y plataforma para tina de hidromasaje en Katy, Texas. Terminado en octubre de 2024. Llame al (713) 909-0034.',
  linkLabel: 'Deck de composite en Katy',
  summary: [
    'Elite Restorations construyó este deck nuevo de composite gris marrón en Katy, Texas. Quedó terminado en octubre de 2024.',
    'El deck forma una plataforma baja a lo largo de la parte de atrás de la casa, con cenefa a juego, escalones integrados y una tina de hidromasaje blanca en un extremo.',
    'Hay piedra roja en la base, y árboles y una cerca negra recorren el patio más allá de la plataforma.',
  ],
  notes: [
    'Deck nuevo de composite gris marrón',
    'Plataforma baja a lo largo de la parte de atrás de la casa',
    'Cenefa a juego',
    'Escalones integrados',
    'Tina de hidromasaje blanca en un extremo',
    'Piedra roja en la base',
    'Árboles y una cerca negra a lo largo del patio',
  ],
  ctaTitle: '¿Quiere algo así?',
  cta: `Llame al ${phone}, o cuéntenos qué necesita en la página de contacto.`,
  services: [
    { href: '/decks', label: 'Decks' },
    { href: '/es/carpentry', label: 'Carpintería' },
  ],
  cover: gallery[0],
  gallery,
};

export const esProjectStories = [katyDeckStoryEs];

for (const story of esProjectStories) {
  if (!story.cover) throw new Error(`Spanish story is missing a cover: ${story.slug}`);
  if (story.gallery.length !== 6) {
    throw new Error(`Spanish story should use the six deck photos: ${story.slug}`);
  }
  if (!titleFits(story.metaTitle)) {
    throw new Error(`Spanish story title does not fit: ${story.slug}`);
  }
  if (story.description.length > 155 || fitDescription(story.description) !== story.description) {
    throw new Error(
      `Spanish story description is ${story.description.length} characters and would be trimmed: ${story.slug}`,
    );
  }
  if (!story.cta.includes(phone) || !/página de contacto/i.test(story.cta)) {
    throw new Error(`Spanish story CTA needs the phone and the contact page: ${story.slug}`);
  }
  assertCopyAllowed(
    story.path,
    [
      story.title,
      story.metaTitle,
      story.tagline,
      story.description,
      story.linkLabel,
      story.ctaTitle,
      story.cta,
      story.category,
      ...story.summary,
      ...story.notes,
      ...story.services.map((service) => service.label),
      ...story.gallery.map((image) => image.alt),
    ].join('\n'),
  );
}
