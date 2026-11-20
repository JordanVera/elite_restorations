import { assertCopyAllowed } from '@/lib/copy-guards';
import { getProject } from '@/lib/projects';
import { fitDescription, titleFits } from '@/lib/seo';

const phone = '(713) 909-0034';
const office = 'Salimos de nuestra oficina en el oeste de Houston (77082).';
const family = 'Somos una empresa familiar y servimos a Houston desde 1993.';

type Link = { href: string; label: string };

export type EsProjectPage = {
  slug: string;
  path: string;
  englishPath: string;
  metaTitle: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  summary: string[];
  notes: string[];
  ctaTitle: string;
  cta: string;
  services: Link[];
  reading?: Link[];
  alts?: string[];
};

const cta = `Llame al ${phone}, o cuéntenos qué necesita en la página de contacto.`;

function page(
  slug: string,
  metaTitle: string,
  title: string,
  category: string,
  tagline: string,
  description: string,
  summary: string[],
  notes: string[],
  services: Link[],
  extra?: { reading?: Link[]; alts?: string[]; ctaTitle?: string },
): EsProjectPage {
  return {
    slug,
    path: `/es/projects/${slug}`,
    englishPath: `/projects/${slug}`,
    metaTitle,
    title,
    category,
    tagline,
    description,
    summary,
    notes,
    ctaTitle: extra?.ctaTitle ?? '¿Quiere algo así?',
    cta,
    services,
    reading: extra?.reading,
    alts: extra?.alts,
  };
}

export const esProjectPages: readonly EsProjectPage[] = [
  page(
    'coffered-ceilings-marble-islands',
    'Cocinas con plafón artesonado',
    'Plafones artesonados e islas de mármol',
    'Cocinas',
    'El plafón y la piedra cargan el cuarto.',
    'Cocinas con plafón artesonado, islas de mármol y gabinetes a medida en el área de Houston. Llame al (713) 909-0034.',
    [
      'Una serie de cocinas donde el plafón trabaja tanto como los gabinetes. Las retículas artesonadas enmarcan el cuarto, el mármol cruza islas y backsplash, y los colgantes y las arañas marcan el ambiente.',
      `Son cuartos para verse y para cocinar: luz en capas, islas amplias y gabinetes a medida con cornisa. ${family} ${office}`,
    ],
    [
      'Plafones artesonados con luz empotrada',
      'Islas de mármol y backsplash de placa',
      'Gabinetes a medida con cornisa',
      'Luz de colgantes y arañas',
    ],
    [
      { href: '/es/kitchen-remodeling', label: 'Remodelación de cocinas' },
      { href: '/es/countertops', label: 'Cubiertas de cocina' },
      { href: '/es/carpentry', label: 'Carpintería' },
      { href: '/es/backsplash', label: 'Backsplash' },
    ],
  ),
  page(
    'timber-and-lantern-light',
    'Cocina de vigas y linternas',
    'Vigas y luz de linterna',
    'Cocinas',
    'Madera, vigas y colgantes que calientan el cuarto.',
    'Cocinas con vigas, islas de madera y colgantes tipo linterna en Houston. Llame al (713) 909-0034.',
    [
      'Vigas a la vista, islas de madera y colgantes de linterna dan a estas cocinas una calidez de casa vivida, todavía pensada.',
      `La madera es el hilo: en el plafón, en las campanas y en islas con listones o acabado natural. ${family} ${office}`,
    ],
    [
      'Plafones con vigas a la vista',
      'Colgantes de linterna y detalles en dorado',
      'Islas de madera y campanas de madera',
      'Detalle de listones en la isla',
    ],
    [
      { href: '/es/kitchen-remodeling', label: 'Remodelación de cocinas' },
      { href: '/es/carpentry', label: 'Carpintería' },
      { href: '/es/countertops', label: 'Cubiertas de cocina' },
    ],
  ),
  page(
    'vaulted-rooms-waterfall-islands',
    'Cocinas de techo alto',
    'Cuartos de techo alto e islas en cascada',
    'Cocinas',
    'Cuartos altos, con la piedra que baja hasta el piso.',
    'Cocinas de techo alto con islas de borde en cascada en Houston. Llame al (713) 909-0034.',
    [
      'Planos abiertos bajo techos altos, anclados por islas de borde en cascada, donde el material de la cubierta sigue por los costados hasta el piso.',
      `Colgantes de latón, negro y vidrio marcan el espacio y retoman los acabados de las llaves. ${family} ${office}`,
    ],
    [
      'Planos abiertos de techo alto',
      'Islas de borde en cascada',
      'Colgantes de domo, globo y vidrio',
      'Metales mezclados',
    ],
    [
      { href: '/es/kitchen-remodeling', label: 'Remodelación de cocinas' },
      { href: '/es/countertops', label: 'Cubiertas de cocina' },
    ],
  ),
  page(
    'hoods-ranges-and-cooking-walls',
    'Pared de cocinar',
    'Campanas, estufas y paredes de cocinar',
    'Cocinas',
    'La pared donde se cocina es lo que se nota al entrar.',
    'Campanas, tarjas de granja y gabinetes de color en cocinas de Houston. Llame al (713) 909-0034.',
    [
      'Campanas que se ven, tarjas hondas de granja y gabinetes de color, de islas azul marino a gabinetes bajos oscuros.',
      `Detalles como llaves de cuello de ganso y persianas tejidas muestran cuánto carga el acabado. ${family} ${office}`,
    ],
    [
      'Campanas a medida',
      'Tarjas de granja y llaves de cuello de ganso',
      'Gabinetes de color y gabinetes oscuros',
      'Cubiertas de cuarzo',
    ],
    [
      { href: '/es/kitchen-remodeling', label: 'Remodelación de cocinas' },
      { href: '/es/countertops', label: 'Cubiertas de cocina' },
      { href: '/es/backsplash', label: 'Backsplash' },
    ],
  ),
  page(
    'marble-showers-and-patterned-floors',
    'Duchas de mármol',
    'Duchas de mármol y pisos con patrón',
    'Baños',
    'Duchas y baños hechos para convivir con el agua.',
    'Duchas de mármol, mosaico y loseta grande, con pisos de patrón, en Houston. Llame al (713) 909-0034.',
    [
      'Duchas en mármol, piedritas, espiga y loseta de gran formato, con nichos, regadera de mano, chorros y tinas independientes.',
      `Los pisos de patrón y de hexágono marcan el paso, y el vidrio deja el cuarto abierto. La impermeabilización va antes de esa loseta. ${family} ${office}`,
    ],
    [
      'Loseta de mármol, piedritas y espiga en la ducha',
      'Canceles sin marco y bloques de vidrio',
      'Nichos, regadera de mano y chorros',
      'Tinas independientes y tinas negro mate',
    ],
    [
      { href: '/es/bathroom-remodeling', label: 'Remodelación de baños' },
      { href: '/es/tile-flooring', label: 'Pisos de loseta' },
    ],
  ),
  page(
    'vanities-gold-and-glass',
    'Tocadores con espejo',
    'Tocadores en dorado y vidrio',
    'Baños',
    'El tocador es lo primero que se ve, y se queda sencillo.',
    'Tocadores dobles, espejos y cubiertas de mármol en baños de Houston. Llame al (713) 909-0034.',
    [
      'Tocadores dobles en blanco, azul marino, taupe y madera clara, enmarcados por espejos ovalados, de arco y con filete dorado.',
      `Cubiertas de mármol, pisos de mosaico y herrajes dorados o negro mate le dan a cada cuarto su carácter. ${family} ${office}`,
    ],
    [
      'Tocadores blancos, azul marino, taupe y de madera',
      'Espejos ovalados, de arco y con marco dorado',
      'Cubiertas de mármol y pisos de mosaico',
      'Llaves doradas y negras',
    ],
    [
      { href: '/es/bathroom-remodeling', label: 'Remodelación de baños' },
      { href: '/es/countertops', label: 'Cubiertas de cocina' },
      { href: '/es/carpentry', label: 'Carpintería' },
    ],
  ),
  page(
    'charcoal-cream-and-wallpaper-baths',
    'Baños con papel tapiz',
    'Baños en carbón, crema y papel tapiz',
    'Baños',
    'Medios baños y baños principales con un punto de vista claro.',
    'Baños en carbón, loseta con patrón y papel tapiz en Houston. Llame al (713) 909-0034.',
    [
      `Muros carbón, duchas de loseta con patrón y baños con papel tapiz muestran cuánta personalidad cabe en un cuarto chico. ${family} ${office}`,
    ],
    [
      'Paletas carbón en muro y tocador',
      'Loseta con patrón en la ducha',
      'Baños con papel tapiz',
      'Muros de acento en el medio baño',
    ],
    [
      { href: '/es/bathroom-remodeling', label: 'Remodelación de baños' },
      { href: '/es/tile-flooring', label: 'Pisos de loseta' },
      { href: '/es/painting-drywall-repair', label: 'Pintura y reparación de drywall' },
    ],
  ),
  page(
    'floors-that-hold-the-room',
    'Pisos que arman el cuarto',
    'Pisos que sostienen el cuarto',
    'Pisos',
    'Tablón, chevrón, aspecto de piedra y loseta con patrón.',
    'Pisos de madera, aspecto de madera y loseta en pasillos, entradas y cuartos abiertos de Houston. Llame al (713) 909-0034.',
    [
      'Pisos de madera, de aspecto de madera y de loseta, en acabados oscuros, claros y con patrón: pasillos, entradas, descansos de escalera y cuartos abiertos.',
      `Las transiciones entre materiales se resuelven limpias, incluida la loseta que sigue hacia la ducha. ${family} ${office}`,
    ],
    [
      'Tablón ancho, chevrón y madera',
      'Loseta con patrón y aspecto de piedra',
      'Descansos de escalera y entradas',
      'Transiciones limpias entre materiales',
    ],
    [
      { href: '/es/wood-flooring', label: 'Pisos de madera' },
      { href: '/es/tile-flooring', label: 'Pisos de loseta' },
      { href: '/es/vinyl-flooring', label: 'Pisos de vinil' },
      { href: '/es/laminate-flooring', label: 'Pisos laminados' },
    ],
  ),
  page(
    'hearths-in-stone-and-marble',
    'Chimeneas de piedra',
    'Chimeneas en piedra y mármol',
    'Detalles',
    'La chimenea es el ancla del cuarto.',
    'Chimeneas de mármol, loseta y piedra en salas de Houston. Llame al (713) 909-0034.',
    [
      `Mármol a doble altura, muros de loseta lineal, marcos en espiga y chimeneas de piedra en la sala, algunas con repisas iluminadas. ${family} ${office}`,
    ],
    [
      'Marcos de mármol y loseta lineal',
      'Espiga con repisa',
      'Chimeneas de piedra en la sala',
      'Repisas con luz integrada',
    ],
    [
      { href: '/es/tile-fireplaces', label: 'Chimeneas de loseta' },
      { href: '/es/carpentry', label: 'Carpintería' },
    ],
  ),
  page(
    'tile-as-detail',
    'Backsplash de cocina',
    'La loseta como detalle',
    'Detalles',
    'Backsplash con un patrón que se lee desde la puerta.',
    'Backsplash en chevrón, espiga y geometría detrás de la estufa, en cocinas de Houston. Llame al (713) 909-0034.',
    [
      `Chevrón, espiga, geometría y cerámica más elaborada detrás de la estufa y sobre la cubierta, con detalles como llaves doradas para cerrar. El patrón se centra antes del mortero. ${family} ${office}`,
    ],
    [
      'Trazos en chevrón y en espiga',
      'Loseta geométrica detrás de donde se cocina',
      'Cerámica elaborada junto al mármol',
    ],
    [
      { href: '/es/backsplash', label: 'Backsplash' },
      { href: '/es/kitchen-remodeling', label: 'Remodelación de cocinas' },
    ],
  ),
  page(
    'stairs-beams-and-millwork',
    'Escaleras y vigas',
    'Escaleras, vigas y moldura',
    'Detalles',
    'Carpintería que se nota al pasarle la mano.',
    'Moldura de escalera, huellas oscuras y vigas a la vista en casas de Houston. Llame al (713) 909-0034.',
    [
      `Moldura geométrica de madera a lo largo de una escalera, huellas oscuras contra el panel y vigas a la vista sobre un plano abierto. ${family} ${office}`,
    ],
    ['Moldura geométrica de madera', 'Huellas oscuras y panel', 'Vigas a la vista'],
    [{ href: '/es/carpentry', label: 'Carpintería' }],
  ),
  page(
    'roofs-read-from-above',
    'Techos vistos desde arriba',
    'Techos, leídos desde arriba',
    'Techo y exterior',
    'Techos nuevos en casas de ladrillo, piedra y siding.',
    'Techos en casas de ladrillo, piedra y siding en Houston, de la capa de abajo a la teja. Llame al (713) 909-0034.',
    [
      `Trabajo de techo en casas de ladrillo, piedra y siding, desde la capa bajo la teja hasta la teja terminada y el detalle del hastial. ${family} ${office}`,
    ],
    [
      'La capa bajo la teja, y después la teja',
      'Techos de varios hastiales en casas de ladrillo',
      'Exteriores de piedra y de siding',
    ],
    [
      { href: '/es/roof-replacement', label: 'Reemplazo de techo' },
      { href: '/es/siding', label: 'Siding' },
    ],
  ),
  page(
    'storm-and-water-response',
    'Respuesta a tormenta',
    'Respuesta a tormenta y a agua',
    'Restauración',
    'La primera llamada es para detener el daño.',
    'Lonas sobre techos y secado con ventiladores después de que el agua entró, en Houston. Llame al (713) 909-0034.',
    [
      'Lonas sujetas sobre techos completos y parciales para que el agua se quede afuera, y ventiladores secando un cuarto después de que el agua entró.',
      `Es el trabajo práctico y de tiempo, el que va antes de cualquier reconstrucción. ${family} ${office}`,
    ],
    [
      'Lona vista desde arriba en techos dañados',
      'Protección de una parte del techo',
      'Ventiladores secando el cuarto mojado',
    ],
    [
      { href: '/es/roofing-emergency-tarp-repair', label: 'Lona de emergencia para techos' },
      { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
    ],
  ),
  page(
    'exteriors-renewed',
    'Siding renovado',
    'Exteriores renovados',
    'Techo y exterior',
    'Siding de tabla y listón, esquinas limpias y detalles cuidados.',
    'Siding de tabla y listón, soffit y un deck trasero en casas de Houston. Llame al (713) 909-0034.',
    [
      `Tabla y listón de casa de campo, esquinas terminadas, detalle de soffit y de aplique, un deck trasero con puertas de vidrio, y una mejora tomada a mitad del trabajo. ${family} ${office}`,
    ],
    ['Siding de tabla y listón', 'Detalle de soffit y de luz', 'Acabado de esquina y de moldura'],
    [
      { href: '/es/siding', label: 'Siding' },
      { href: '/es/carpentry', label: 'Carpintería' },
    ],
  ),
  page(
    'blackhorse-ranch-cypress',
    'Pisos y cocina en Cypress',
    'Pisos de abajo, escalera y cocina en BlackHorse Ranch, Cypress',
    'Pisos',
    'Vinil con aspecto de madera, huellas nuevas y una cocina, terminados en octubre de 2026.',
    'Pisos, escalera y cocina en BlackHorse Ranch, Cypress, terminados en octubre de 2026. Llame al (713) 909-0034.',
    [
      'En octubre de 2026 terminamos la planta baja de una casa en BlackHorse Ranch South, Cypress, TX 77433. Salimos el piso viejo, preparamos y contuvimos los cuartos con ventiladores, y vaciamos un compuesto autonivelante para emparejar la losa.',
      `El vinil de lujo con aspecto de madera quedó en el comedor y en la sala. La escalera recibió huellas nuevas en el mismo acabado. La cocina recibió gabinetes shaker, cubierta de cuarzo, backsplash y una tarja de acero empotrada. ${family} ${office}`,
    ],
    [
      'Piso viejo retirado en toda la planta baja',
      'Cuartos preparados y contenidos, con ventiladores',
      'Compuesto autonivelante para emparejar la losa',
      'Vinil de lujo con aspecto de madera en comedor y sala',
      'Huellas nuevas en el mismo acabado',
      'Gabinetes shaker, cuarzo, backsplash y tarja de acero empotrada',
    ],
    [
      { href: '/es/vinyl-flooring', label: 'Pisos de vinil' },
      { href: '/es/kitchen-remodeling', label: 'Remodelación de cocinas' },
      { href: '/es/countertops', label: 'Cubiertas de cocina' },
      { href: '/es/backsplash', label: 'Backsplash' },
    ],
    {
      reading: [
        { href: '/es/vinyl-flooring-cypress-tx', label: 'Pisos de vinil en Cypress' },
        { href: '/es/kitchen-remodeling-cypress-tx', label: 'Cocinas en Cypress' },
      ],
    },
  ),
  page(
    'crosby-water-damage',
    'Daño de agua en Crosby',
    'Reparación por daño de agua, con cocina y baño rehechos, en Crosby',
    'Restauración',
    'Cocina shaker gris, baño con aspecto de mármol y pisos con aspecto de madera, terminados en abril de 2025.',
    'Daño de agua, cocina y baño rehechos en Crosby, Texas. Terminado en abril de 2025. Llame al (713) 909-0034.',
    [
      'El daño de agua se encontró en enero de 2025 en una casa de Crosby, TX 77532.',
      'El piso de la cocina se retiró hasta un contrapiso manchado y dañado por el agua. Los pisos del baño y del pasillo estaban manchados. La estructura de madera de arriba estaba muy manchada y dañada.',
      'El secado y las reparaciones corrieron de febrero a marzo de 2025. Deshumidificadores y ventiladores secaron el baño y la cocina.',
      `El trabajo quedó terminado en abril de 2025. La cocina quedó con gabinetes shaker grises, cubierta de granito claro, backsplash de loseta subway blanca, un gabinete para el microondas y piso de vinil con aspecto de madera. El baño quedó con tina nueva, muro con aspecto de mármol blanco, llaves negro mate, tocador nuevo con cubierta de granito y el mismo piso. ${family} ${office}`,
    ],
    [
      'Piso de la cocina dañado, retirado hasta el contrapiso',
      'Cocina y baño secados con deshumidificadores y ventiladores',
      'Reparación del daño de agua de febrero a marzo de 2025',
      'Gabinetes shaker grises, gabinete del microondas, granito claro y backsplash subway blanco',
      'Piso de vinil con aspecto de madera',
      'Baño rehecho con tina, muro de aspecto mármol, llaves negro mate y tocador con granito',
    ],
    [
      { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
      { href: '/es/kitchen-remodeling', label: 'Remodelación de cocinas' },
      { href: '/es/bathroom-remodeling', label: 'Remodelación de baños' },
      { href: '/es/vinyl-flooring', label: 'Pisos de vinil' },
    ],
  ),
  page(
    'custom-walk-in-closet-katy',
    'Clóset a medida en Katy',
    'Clóset a medida en Katy, TX',
    'Detalles',
    'Muebles espresso, una cómoda de 12 cajones y zapatera de piso a techo, terminados en 2026.',
    'Clóset a medida en Katy, Texas, con muebles espresso, cómoda de 12 cajones y zapatera de piso a techo. Terminado en 2026.',
    [
      'Este clóset a medida se terminó en 2026 para una casa en Katy, Texas. Los muebles en acabado espresso recorren el cuarto, contra muros blancos y un piso claro de tablón ancho.',
      'En el centro del trazo hay un nicho de colgado doble: una barra más corta arriba de una barra más larga, separadas por un entrepaño. Sobre ese nicho va un elevador de ropa que baja, para alcanzar lo que cuelga más alto. Los laterales traen barrenos para pernos, así las barras y los entrepaños se mueven cuando cambia lo que se guarda.',
      'En el muro de al lado, la cómoda empotrada es el punto: doce cajones en dos columnas, cada uno con frente de tablero rehundido y jaladera de níquel cepillado. Los cajones de abajo son un poco más altos. Sobre la cómoda hay dos cuerpos de entrepaños abiertos, con ganchos chicos en las aberturas de abajo.',
      'A la derecha, una torre de zapatos de piso a techo llena un nicho estrecho con entrepaños muy juntos. Entre la cómoda y la torre, un colgado de esquina con barra y ganchos usa el muro que queda.',
      `El resultado es un clóset ordenado de piso a techo. ${family} ${office} Hacemos este tipo de clóset a medida para casas en Katy y en el área de Houston. Vea la [carpintería](/es/carpentry) y la [carpintería en Katy](/es/carpentry-katy-tx).`,
    ],
    [
      'Muebles a medida en acabado espresso',
      'Dos barras de colgado con un entrepaño en medio',
      'Elevador de ropa sobre el nicho de colgado',
      'Cómoda empotrada de 12 cajones con frente rehundido',
      'Jaladeras de níquel cepillado',
      'Entrepaños abiertos sobre la cómoda, con ganchos',
      'Zapatera de piso a techo',
      'Barrenos ajustables en los laterales',
      'Nicho de esquina con barra y ganchos',
      'Piso claro de tablón ancho',
    ],
    [{ href: '/es/carpentry', label: 'Carpintería' }],
    {
      ctaTitle: '¿Quiere un clóset así?',
      reading: [
        { href: '/es/carpentry-katy-tx', label: 'Carpintería en Katy' },
        { href: '/es/carpentry', label: 'Carpintería' },
      ],
      alts: [
        'Clóset a medida en Katy con muebles espresso, barras de colgado y cómoda de cajones, hecho por Elite Restorations.',
        'Cómoda empotrada de doce cajones y entrepaños abiertos en un clóset de Katy, Texas, terminado por Elite Restorations.',
        'Zapatera de piso a techo y nicho de colgado en un clóset a medida de Katy, hecho por Elite Restorations.',
      ],
    },
  ),
];

const bySlug = new Map(esProjectPages.map((page) => [page.slug, page]));

export function getEsProjectPage(slug: string) {
  return bySlug.get(slug);
}

for (const item of esProjectPages) {
  const project = getProject(item.slug);
  if (!project) throw new Error(`Missing English project for ${item.slug}`);
  if (item.alts && item.alts.length !== project.gallery.length) {
    throw new Error(`${item.slug} alt count ${item.alts.length} does not match ${project.gallery.length} photos`);
  }
  if (!titleFits(item.metaTitle)) throw new Error(`Spanish project title does not fit: ${item.metaTitle}`);
  if (item.description.length > 155 || fitDescription(item.description) !== item.description) {
    throw new Error(`${item.slug} description is ${item.description.length} characters`);
  }
  if (!item.cta.includes(phone) || !/página de contacto/i.test(item.cta)) {
    throw new Error(`${item.slug} CTA needs the phone and the contact page`);
  }
  const blob = [
    item.title,
    item.tagline,
    item.description,
    item.cta,
    ...item.summary,
    ...item.notes,
    ...item.services.map((service) => service.label),
    ...(item.reading ?? []).map((link) => link.label),
    ...(item.alts ?? []),
  ].join('\n');
  if (!blob.includes('nuestra oficina en el oeste de Houston (77082)')) {
    throw new Error(`${item.slug} is missing the office line`);
  }
  assertCopyAllowed(item.path, blob);
}
