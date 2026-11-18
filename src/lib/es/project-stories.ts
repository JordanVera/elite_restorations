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

const bathAlts = [
  'Regadera cuadrada de lluvia sobre loseta grande blanca y gris con aspecto de mármol, con un nicho empotrado de mosaico hexagonal, en un baño de Katy terminado por Elite Restorations.',
  'Ducha de vidrio sin marco en Katy, TX, con paredes de aspecto mármol, regadera de lluvia, regadera de mano, dos nichos de mosaico, piso de piedritas, banca integrada y una ventana de bloques de vidrio, terminada por Elite Restorations.',
  'Ducha en Katy con regadera de lluvia, regadera de mano, banca integrada y una ventana de bloques de vidrio, revestida de loseta grande con aspecto de mármol, terminada por Elite Restorations.',
  'Ducha de vidrio sin marco en Katy, TX, con paredes de aspecto mármol, dos nichos de mosaico, banca integrada, piso de piedritas y coladera cuadrada, terminada por Elite Restorations.',
  'Tina de hidromasaje de esquina con cubierta de aspecto mármol y frente de loseta, junto a una ventana de bloques de vidrio y el piso de piedritas de la ducha, en un baño de Katy hecho por Elite Restorations.',
  'Tina de hidromasaje blanca de esquina sobre una cubierta de aspecto mármol, con frente de loseta, una ventana de bloques de vidrio y loseta grande en el piso, en un baño de Katy, TX, terminado por Elite Restorations.',
];

const bathFiles = [
  'katy-marble-bathroom-01.jpg',
  'katy-marble-bathroom-02.jpg',
  'katy-marble-bathroom-03.jpg',
  'katy-marble-bathroom-04.jpg',
  'katy-marble-bathroom-05.jpg',
  'katy-marble-bathroom-06.jpg',
];

const bathGallery: Img[] = bathFiles.map((file, index) =>
  img(`/images/projects/katy-bathroom/${file}`, bathAlts[index] ?? file),
);

type StoryLink = { href: string; label: string };

type EsProjectStory = {
  slug: string;
  path: string;
  englishPath: string;
  metaTitle: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  linkLabel: string;
  summary: string[];
  notes: string[];
  ctaTitle: string;
  cta: string;
  services: StoryLink[];
  reading?: StoryLink[];
  cover: Img;
  gallery: Img[];
};

export const katyDeckStoryEs: EsProjectStory = {
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

export const katyBathStoryEs: EsProjectStory = {
  slug: 'katy-marble-bathroom',
  path: '/es/projects/katy-marble-bathroom',
  englishPath: '/projects/katy-marble-bathroom',
  metaTitle: 'Baño de mármol en Katy',
  title: 'Baño con ducha de aspecto mármol y tina de hidromasaje en Katy, TX',
  category: 'Baños',
  tagline:
    'Ducha de aspecto mármol y tina de hidromasaje de esquina, terminadas en febrero de 2025.',
  description:
    'Ducha de aspecto mármol y tina de hidromasaje en Katy, Texas. Terminado en febrero de 2025. Llame al (713) 909-0034.',
  linkLabel: 'Baño de mármol en Katy',
  summary: [
    'Elite Restorations terminó este baño de aspecto mármol en Katy, Texas, en febrero de 2025. El cuarto tiene una ducha de vidrio sin marco y una tina de hidromasaje en la esquina.',
    'Loseta de gran formato, blanca y gris con aspecto de mármol, cubre las paredes de la ducha. El cancel de vidrio sin marco tiene una regadera de lluvia y una regadera de mano. Dos nichos empotrados tienen fondo de mosaico de piedritas y hexágonos. El piso de la ducha es mosaico de piedritas con una coladera cuadrada, y hay una banca integrada. Unas ventanas de bloques de vidrio dan luz al cuarto.',
    'La tina de hidromasaje de esquina queda sobre una cubierta de aspecto mármol, con un frente de loseta. Los chorros se ven dentro de la tina, y una llave de metal queda sobre la cubierta.',
    'Un cancel de vidrio guarda el agua dentro de la ducha. Eso ayuda con la humedad de Houston, porque el aire del cuarto ya está húmedo. La loseta grande en las paredes deja menos juntas que un muro de loseta chica. El piso de piedritas tiene muchas juntas: enjuáguelo después de bañarse y limpie la junta antes de que el jabón se acumule. Pase un jalador en el vidrio para que las manchas no lo opaquen, y seque la cubierta de la tina para que el agua no se quede junto a la llave. Las ventanas de bloques de vidrio dejan entrar la luz y se quedan cerradas, así el cuarto no queda bajo una ventana abierta en un clima húmedo. Somos una empresa familiar y servimos a Houston desde 1993. Vea la [remodelación de baños](/es/bathroom-remodeling), la [remodelación de baños en Katy](/bathroom-remodeling-katy-tx) y la [guía de baños en Houston](/es/blog/houston-bathroom-remodel-guide) para la impermeabilización, un extractor que sale de la casa, y la diferencia entre un baño de pasillo y un cuarto como este.',
  ],
  notes: [
    'Loseta de gran formato blanca y gris con aspecto de mármol',
    'Ducha de vidrio sin marco',
    'Regadera de lluvia y regadera de mano',
    'Dos nichos empotrados con mosaico de piedritas y hexágonos',
    'Piso de mosaico de piedritas con coladera cuadrada',
    'Banca integrada en la ducha',
    'Ventanas de bloques de vidrio',
    'Tina de hidromasaje de esquina con cubierta de aspecto mármol y frente de loseta',
  ],
  ctaTitle: '¿Quiere algo así?',
  cta: `Llame al ${phone}, o cuéntenos qué necesita en la página de contacto.`,
  services: [{ href: '/es/bathroom-remodeling', label: 'Remodelación de baños' }],
  reading: [
    { href: '/bathroom-remodeling-katy-tx', label: 'Remodelación de baños en Katy' },
    { href: '/es/blog/houston-bathroom-remodel-guide', label: 'Guía de baños en Houston' },
  ],
  cover: bathGallery[1],
  gallery: bathGallery,
};

export const esProjectStories: EsProjectStory[] = [katyDeckStoryEs, katyBathStoryEs];

for (const story of esProjectStories) {
  if (!story.cover) throw new Error(`Spanish story is missing a cover: ${story.slug}`);
  if (story.gallery.length !== 6) {
    throw new Error(`Spanish story should use six photos: ${story.slug}`);
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
      ...(story.reading ?? []).map((link) => link.label),
      ...story.gallery.map((image) => image.alt),
    ].join('\n'),
  );
}
