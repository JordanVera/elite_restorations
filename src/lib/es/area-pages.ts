import { assertCopyAllowed } from '@/lib/copy-guards';
import { esServiceNames, spanishServiceSlugs } from '@/lib/i18n';
import type { AreaPage } from '@/lib/area-pages';
import { localLandingSlug } from '@/lib/local-paths';
import { titleFits } from '@/lib/seo';
import { isCityIndexedService } from '@/lib/services';

const office = 'nuestra oficina en el oeste de Houston (77082)';

function servicesFor(areaSlug: string): AreaPage['services'] {
  return spanishServiceSlugs.filter((slug) => isCityIndexedService(slug)).map((slug) => ({
    href: `/es/${slug}`,
    label: esServiceNames[slug],
    cityHref: `/es/${localLandingSlug(slug, areaSlug)}`,
  }));
}

export const esAreaPages: readonly AreaPage[] = [
  {
    slug: 'westchase-tx',
    path: '/es/westchase-tx',
    name: 'Westchase',
    title: 'Westchase, Houston, TX',
    description:
      'Westchase, Houston, TX, a un corto camino de nuestra oficina en el oeste de Houston (77082). Remodelación, techos y restauración.',
    lede: 'Las visitas se agendan desde nuestra oficina en el oeste de Houston (77082), en Crestwater, cerca de George Bush Park, un corto camino al oeste del distrito de Westchase. La remodelación, los techos y la restauración de Westchase salen de esa dirección.',
    paragraphs: [
      'Westchase es el distrito de oficinas, townhomes y casas unifamiliares a lo largo de Westheimer, Richmond y el Sam Houston Tollway. No es un solo plano. Un townhome con pared compartida y una casa de finales de los setenta pueden estar a unas cuadras, y el trabajo sigue el edificio.',
      'La mayor parte de esas casas se levantó de los setenta a los noventa. De este lado de Houston eso suele ser losa de concreto, no un hueco bajo el piso. Las cocinas y los baños a menudo ya se actualizaron una vez. Vemos lo que está antes de suponer que los drenajes, el piso o el techo coinciden con el año de afuera.',
      'En las secciones de townhomes suele haber una asociación que revisa el color exterior, las cercas y a veces el techo. Las calles de casas solas son menos uniformes. Una cocina o un baño por dentro suele quedar fuera de esa revisión. El permiso, cuando el trabajo lo pide, es de la ciudad de Houston. Confirmamos la dirección.',
      `La oficina no está en medio del distrito. ${office.charAt(0).toUpperCase()}${office.slice(1)} queda cerca de George Bush Park y del lado este del embalse Barker, unas 7 millas al oeste del centro de Westchase por Richmond, en línea recta. El camino es Westheimer o Richmond. El tráfico del tollway cambia la hora, así que acordamos una ventana cuando hablamos.`,
      'Este lado de la ciudad drena hacia el embalse y los bayous de la zona. La lluvia fuerte se encharca en calles planas. El terreno bajo cerca de las pozas del embalse ha recibido agua de tormenta en ciclones pasados. Los pads más altos no todos vieron la misma agua. Una fuga de calentador y el agua que subió de afuera son visitas distintas, y a veces pólizas distintas. Su aseguradora decide la cobertura. Nosotros documentamos y, si usted nos contrata, secamos y reparamos.',
      'El granizo y el viento son el mismo clima del oeste de Houston. Los techos aquí suelen ser de asfalto, en uno o dos pisos. Inspeccionamos antes de decir que una reparación aguanta. Los muros del sur y del oeste se destiñen primero cuando hay siding. Los patios suelen ser modestos, así que un deck o un patio se mide al lote y escurre lejos de la losa.',
      'No hay un local aparte en Westchase. La visita es en la propiedad. Los enlaces de abajo abren cada servicio como aplica en Westchase, de cocinas y baños a techos, daño de agua y las notas que van con un reclamo.',
    ],
    faqs: [
      {
        q: '¿La oficina de Elite Restorations está en el distrito de Westchase?',
        a: 'Las visitas se agendan desde nuestra oficina en el oeste de Houston (77082), en Crestwater, cerca de George Bush Park. Es un corto camino al oeste del centro de Westchase por Richmond y Westheimer, unas 7 millas en línea recta. El trabajo de Westchase sale de esa dirección. No hay un segundo local en el distrito.',
      },
      {
        q: '¿Qué casas son comunes en Westchase?',
        a: 'Townhomes y casas unifamiliares, muchas de los setenta a los noventa, por lo general sobre losa. Unas secciones tienen una asociación que revisa cambios exteriores. Otras no. Preguntamos, y igual medimos la casa, porque una losa de esa época no siempre está pareja y el techo no siempre está listo para una reparación sencilla.',
      },
      {
        q: '¿Westchase se inunda?',
        a: 'Un terreno bajo cerca del embalse Barker y del drenaje de los bayous ha recibido agua de tormenta en ciclones pasados. Muchas calles solo se encharcan con lluvia fuerte. Vemos esta casa, no el distrito como una sola altura. Una visita de agua empieza por dónde entró el agua a esta casa. El viento y el granizo van aparte del agua que sube, y su aseguradora decide qué póliza aplica.',
      },
      {
        q: '¿Qué servicios agendan en Westchase?',
        a: 'La misma lista del resto del trabajo en Houston: cocinas, baños, cubiertas, backsplash, pisos, carpintería, chimeneas, techos, lonas, siding, decks y patios, pintura y drywall, daño de agua y documentación del reclamo. Cada uno tiene su página de Westchase. El trabajo igual sale de la visita.',
      },
    ],
    services: servicesFor('westchase'),
    also: [
      { href: '/es/laminate-flooring', label: 'Pisos laminados en Houston' },
      { href: '/es/alief-tx', label: 'Alief' },
      { href: '/es/energy-corridor-tx', label: 'Energy Corridor' },
    ],
  },
  {
    slug: 'alief-tx',
    path: '/es/alief-tx',
    name: 'Alief',
    title: 'Alief, Houston, TX',
    description:
      'Alief, Houston, TX, justo al sur de nuestra oficina en el oeste de Houston (77082). Remodelación, techos y restauración.',
    lede: 'Alief es la comunidad del suroeste de Houston, justo al sur de la oficina en 77082. Agendamos el trabajo desde nuestra oficina en el oeste de Houston (77082).',
    paragraphs: [
      'Alief corre a lo largo de Bellaire Boulevard, al sur de la oficina: ranchos y casas de dos pisos, no un distrito de torres. La mayoría de las casas data de los setenta a los noventa y está sobre losa. Las cocinas y los baños a menudo se actualizaron por partes, así que un cuarto puede mezclar décadas. Vemos lo que usted quiere cambiar.',
      'Bellaire Boulevard con Dairy Ashford queda a unas 4 millas al sur de nuestra oficina en el oeste de Houston (77082), en línea recta. Beechnut y Bellaire son los caminos de siempre. No hay una oficina en Alief. La visita es en la propiedad.',
      'Alief es parte de Houston, no una alcaldía aparte. Hay asociación en unas subdivisiones y en otras no. Cuando hace falta permiso, por lo general es de la ciudad de Houston. Una remodelación interior casi nunca es revisión de la asociación. El techo, la pintura y las cercas son lo que una asociación suele mirar, y solo donde existe.',
      'Keegans Bayou y el drenaje más amplio de Brays Bayou cruzan este suroeste. La lluvia fuerte inunda calles. Unas cuadras bajas han recibido agua de tormenta. Una fuga de suministro sobre la losa sigue siendo la llamada más ordinaria, y se ve al pie del drywall. Medimos antes de secar, y un muro se queda abierto hasta que está seco. La humedad es la razón de usar deshumidificadores en un secado de aquí.',
      'Los techos suelen ser de asfalto, en uno y dos pisos. Las pendientes del sur y del oeste envejecen más rápido. Las vemos todas antes de recomendar una reparación. El exterior a menudo es ladrillo, con algo de siding y moldura. Una reparación de siding se empata con la tabla desteñida, no con una muestra del año en que se construyó la casa. Los lotes son de suburbio, así que el acopio es más fácil que en una calle dentro del Loop, y un patio igual tiene que escurrir lejos de la losa.',
      'Los lotes tienen entrada. Eso importa para un contenedor, una entrega de piedra o quitar un techo. No pone la casa a escuadra, y no nos dice si la losa está lo bastante pareja para un piso nuevo. El vinil y el laminado enseñan un lomo que la alfombra escondía. La madera se aclimata en la casa. La loseta pide una base plana, y una regadera se impermeabiliza antes del acabado.',
      'La lista de abajo es todo lo que agendamos en Alief, cada enlace a la página de ese oficio en esta comunidad. El nombre del lugar no elige el trabajo.',
    ],
    faqs: [
      {
        q: '¿Qué tan lejos queda Alief de la oficina?',
        a: 'Las visitas se agendan desde nuestra oficina en el oeste de Houston (77082), justo al norte de Alief. Bellaire Boulevard con Dairy Ashford queda a unas 4 millas al sur, en línea recta. El camino es Bellaire Boulevard o Beechnut. El trabajo en Alief sale de la oficina de 77082, y el tráfico cambia la hora.',
      },
      {
        q: '¿Las casas de Alief suelen estar sobre pilotes?',
        a: 'Por lo general son losas. La casa común es un rancho o un dos pisos de los setenta a los noventa. Eso importa cuando un fregadero o una regadera tiene que moverse, porque el drenaje está bajo el concreto. Confirmamos esta casa antes de prometer un plano. Puede haber una excepción más vieja. Miramos, en lugar de discutir desde la década.',
      },
      {
        q: '¿Qué debe cubrir una inspección de techo en Alief?',
        a: 'Todas las pendientes, no solo el frente. El sur y el oeste envejecen más rápido. Los collares de hule, los valles y las uniones de metal fallan mientras el techo principal se ve tranquilo desde la calle. Fotografiamos el techo y decimos si una reparación aguanta. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No somos ajustadores públicos. Su aseguradora decide la cobertura.',
      },
      {
        q: '¿Solo remodelan cocinas en Alief?',
        a: 'No. Las cocinas son un oficio. Baños, pisos, carpintería, techos, siding, decks, pintura, daño de agua y la documentación del reclamo están en la lista de abajo, cada uno con una página de Alief. Una cocina actualizada por partes es un punto de partida común. No es el único.',
      },
    ],
    services: servicesFor('alief'),
    also: [
      { href: '/es/laminate-flooring', label: 'Pisos laminados en Houston' },
      { href: '/es/westchase-tx', label: 'Westchase' },
      { href: '/es/energy-corridor-tx', label: 'Energy Corridor' },
    ],
  },
  {
    slug: 'energy-corridor-tx',
    path: '/es/energy-corridor-tx',
    name: 'Energy Corridor',
    title: 'Energy Corridor, Houston, TX',
    description:
      'Energy Corridor, Houston, TX, sobre la Interestatal 10, cerca de nuestra oficina en el oeste de Houston (77082). Remodelación, techos y restauración.',
    lede: 'El Energy Corridor es el distrito del oeste de Houston a lo largo de la Interestatal 10, al norte de la oficina en 77082. Agendamos el trabajo desde nuestra oficina en el oeste de Houston (77082).',
    paragraphs: [
      'El Energy Corridor es el distrito de la Interestatal 10, de los parques de oficinas cerca de Eldridge hacia la Highway 6, con casas, townhomes y apartamentos entre las torres. Un townhome con pared compartida y una casa sola en la cuadra de al lado son trabajos distintos. El nombre del distrito no elige el trabajo.',
      'El inventario mezcla casas de los sesenta y setenta, townhomes posteriores y casas nuevas en lotes viejos. La losa es la cimentación normal. Mover una regadera o un fregadero es cortar concreto, salvo que el mueble se quede en su drenaje. Las losas nuevas a menudo son postensadas, con cables que hay que localizar antes de cortar. El corredor mezcla décadas, y tratamos cada casa por su cuenta.',
      'La Interestatal 10 con Eldridge Parkway queda a unas 6 millas al norte de nuestra oficina en el oeste de Houston (77082), en línea recta. El camino es la Highway 6 al norte hasta la autopista. La oficina está en Crestwater, cerca de George Bush Park, al sur del corredor. No hay un showroom en el corredor.',
      'Terry Hershey Park y Buffalo Bayou cruzan el distrito. El terreno bajo junto al bayou se ha inundado en tormentas tropicales pasadas, incluso cuando los embalses de aguas arriba soltaron agua. Las casas y los apartamentos en terreno más alto no todos recibieron agua. Una fuga de suministro en un segundo piso es otro problema que el agua del bayou. Preguntamos cuál pasó. El viento y el granizo igual entran en cualquier conversación de techo, aparte del agua que sube. Su aseguradora decide qué póliza aplica.',
      'Muchas comunidades de townhomes tienen una asociación que revisa cambios exteriores: color del techo, siding, cercas y a veces un deck. Una cocina o un baño por dentro suele quedar fuera de esa revisión. Esto es Houston, así que no hay zonificado, y el permiso depende de si cambian la plomería, la electricidad o la estructura. Confirmamos la dirección antes de tratar una regla de townhome como si fuera la ciudad.',
      'Los techos están en casas y en townhomes, así que el acopio y el escombro se planean para el que usted tiene. El siding aparece en muros de casa y en la parte de atrás de los townhomes. Un patio puede ser un patio interior o un jardín, y el agua igual tiene que alejarse del muro, sobre todo en terreno bajo cerca del bayou. Los pisos de adentro piden una losa pareja. Un lomo se ve en el vinil o en la loseta grande. La madera se aclimata en la casa. Las regaderas se impermeabilizan antes de la loseta de acabado.',
      'Cada servicio que agendamos en el corredor tiene su página en la lista de abajo. Use esas para el oficio. Use esta página para ver dónde queda la oficina respecto del distrito y para las casas que de verdad vemos en las visitas.',
    ],
    faqs: [
      {
        q: '¿Dónde queda la oficina respecto del Energy Corridor?',
        a: 'En nuestra oficina en el oeste de Houston (77082), en Crestwater, cerca de George Bush Park, al sur de la Interestatal 10. La Interestatal 10 con Eldridge queda a unas 6 millas al norte, en línea recta. El camino habitual es la Highway 6 hasta la autopista. El trabajo del corredor se agenda desde esa oficina. No hay un showroom aparte en el distrito.',
      },
      {
        q: '¿Las casas del Energy Corridor son todas de la misma época?',
        a: 'No. El distrito mezcla casas de los sesenta y setenta, townhomes posteriores y casas nuevas en lotes viejos. La losa es la cimentación habitual. Unas losas nuevas son postensadas, y eso cambia si un drenaje se puede mover. Los townhomes añaden paredes compartidas y, a menudo, una asociación que revisa el exterior. Identificamos el edificio en la visita.',
      },
      {
        q: '¿Cómo afecta Buffalo Bayou la restauración en el Energy Corridor?',
        a: 'El terreno bajo junto al bayou se ha inundado en tormentas tropicales pasadas, incluso después de que los embalses soltaron agua. Eso no es cada casa del distrito. Empezamos por dónde entró el agua a este edificio. Una filtración de techo, una línea de suministro y el agua del bayou son trabajos distintos, y pueden ser pólizas distintas. Su aseguradora decide la cobertura. Mapeamos, secamos y reparamos lo que usted contrata.',
      },
      {
        q: '¿Trabajan en townhomes del Energy Corridor?',
        a: 'Sí. El baño de un townhome comparte un muro y un ducto. El techo de un townhome puede tener reglas sobre el color y sobre dónde puede quedar el escombro. Una casa sola cerca no tiene esos límites. Los dos se agendan desde la oficina de 77082. La página de cada oficio describe cómo cambia el trabajo. La visita confirma qué edificio es el suyo.',
      },
    ],
    services: servicesFor('energy-corridor'),
    also: [
      { href: '/es/laminate-flooring', label: 'Pisos laminados en Houston' },
      { href: '/es/copperfield-tx', label: 'Copperfield' },
      { href: '/es/jersey-village-tx', label: 'Jersey Village' },
    ],
  },
];

const bySlug = new Map(esAreaPages.map((page) => [page.slug, page]));

export function getEsAreaPage(slug: string) {
  return bySlug.get(slug);
}

for (const page of esAreaPages) {
  if (!titleFits(page.title)) throw new Error(`Spanish area title does not fit: ${page.title}`);
  if (page.description.length > 155) {
    throw new Error(`${page.slug} description is ${page.description.length}`);
  }
  const blob = [page.lede, page.description, ...page.paragraphs, ...page.faqs.flatMap((faq) => [faq.q, faq.a])].join('\n');
  if (!blob.includes(office)) throw new Error(`${page.slug} missing office line`);
  assertCopyAllowed(page.path, blob);
}
