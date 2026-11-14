import type { GuideSection } from "@/lib/guides/types";
import { spanishServiceSlugs } from "@/lib/i18n";

export type EsHub = {
  slug: (typeof spanishServiceSlugs)[number];
  metaTitle: string;
  description: string;
  eyebrow: string;
  name: string;
  lede: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
};

const phone = "(713) 909-0034";

function hub(
  slug: EsHub["slug"],
  metaTitle: string,
  name: string,
  eyebrow: string,
  lede: string,
  body: string,
  faqs: { q: string; a: string }[],
): EsHub {
  return {
    slug,
    metaTitle,
    name,
    eyebrow,
    description: `${name} en Houston. Empresa familiar desde 1993. Llame al ${phone}.`,
    lede,
    sections: [
      {
        eyebrow: "El trabajo",
        heading: `${name} en Houston`,
        paragraphs: [lede, body],
      },
      {
        eyebrow: "Cómo sigue",
        heading: "Qué puede esperar",
        paragraphs: [
          `Vemos la casa o el edificio, le decimos qué hace falta y qué no, y lo escribimos antes de tumbar de más. La oficina está en 511 Crestwater Ct, Houston, TX 77082. Elite Restorations es una empresa familiar desde 1993.`,
          `Si hay seguro de por medio, ayudamos con fotos, un estimado de la reparación y, si usted quiere, a estar cuando llegue el ajustador. No somos ajustadores públicos y no prometemos que paguen. Revise su póliza. Llame o envíe un texto al ${phone}.`,
        ],
      },
    ],
    faqs: [
      ...faqs,
      {
        q: "¿Atienden casas, comercios y apartamentos?",
        a: `Sí en emergencia de tormenta y de agua. Para una visita programada, la oficina abre de lunes a sábado, de 8:00 AM a 6:00 PM. El teléfono de emergencia es el ${phone}.`,
      },
      {
        q: "¿Deciden si el seguro paga?",
        a: "No. Documentamos el daño y reparamos lo que usted contrata. La aseguradora decide la cobertura. No damos consejo legal.",
      },
      {
        q: "¿Dónde están?",
        a: "511 Crestwater Ct, Houston, TX 77082. Trabajamos en el área de Houston, incluyendo Katy, Sugar Land, Memorial, The Woodlands y los vecindarios junto a la oficina.",
      },
    ],
  };
}

export const esHubs: readonly EsHub[] = [
  hub(
    "kitchen-remodeling",
    "Cocinas en Houston",
    "Remodelación de cocinas",
    "Interiores",
    "Una cocina en Houston se planea alrededor de cómo cocina y se reúne la casa, no alrededor de un catálogo.",
    "Medimos antes de prometer que un muro se puede mover. En casas viejas de The Heights o West University la plomería y la estructura deciden el diseño. En Katy, Cinco Ranch y The Woodlands la cocina suele ser el centro de un espacio abierto. Gabinetes, cubiertas, loseta y luz se cierran como un solo proyecto.",
    [
      { q: "¿Hacen la cocina completa o solo una parte?", a: "Sí, las dos. A veces es una renovación completa. A veces solo son cubiertas, el backsplash o el piso. Hacemos lo que esa cocina necesita." },
      { q: "¿Cuánto tarda?", a: "Depende del cambio de distribución y del tiempo de los materiales. Se lo decimos en la visita, antes de empezar." },
    ],
  ),
  hub(
    "bathroom-remodeling",
    "Baños en Houston",
    "Remodelación de baños",
    "Interiores",
    "Un baño en Houston es un cuarto chico con muchas decisiones: regadera, vanidad, loseta y luz.",
    "La impermeabilización va antes de la loseta de acabado. En una losa, mover el drenaje no siempre se puede. Lo medimos antes de prometer el plano, igual en un powder room de West University que en un baño principal de Memorial.",
    [
      { q: "¿Pueden cambiar la distribución?", a: "A menudo sí. Primero vemos qué permite la plomería y la estructura." },
      { q: "¿Instalan loseta grande?", a: "Sí. Porcelanato de formato grande, mosaicos y patrones piden un piso parejo y un trazo cuidadoso." },
    ],
  ),
  hub(
    "backsplash",
    "Backsplash en Houston",
    "Backsplash",
    "Interiores",
    "El backsplash es la pared que se limpia todos los días. En la humedad de Houston el material y la junta importan más que la foto.",
    "Lo planeamos con la cubierta y los contactos, no después de que la piedra ya está puesta. En cocinas viejas las paredes no están a escuadra. Lo decimos antes de cortar.",
    [
      { q: "¿Solo cambian el backsplash?", a: "Sí. También puede ir con cubiertas nuevas o con una cocina completa." },
      { q: "¿Qué materiales usan?", a: "Cerámica, porcelanato y piedra, con una junta que se pueda limpiar. Lo vemos con la luz de esa cocina." },
    ],
  ),
  hub(
    "countertops",
    "Cubiertas en Houston",
    "Cubiertas de cocina",
    "Interiores",
    "La cubierta es la superficie que se usa. Cuarzo, granito, mármol y superficie sólida no se comportan igual con el calor y la humedad del Golfo.",
    "Plantillamos la cocina que existe, no un rectángulo de plano. Las cocinas fuera de escuadra en casas viejas cambian el corte. No prometemos una medida por teléfono.",
    [
      { q: "¿Quitan la cubierta vieja?", a: "Sí, cuando el gabinete de abajo puede recibir la nueva. Si el gabinete está inflado por una fuga, eso se arregla primero." },
      { q: "¿El precio es por pie?", a: "El material, el canto, los cortes y el viaje cambian el número. Le damos un estimado después de medir. No es una tarifa única de Houston." },
    ],
  ),
  hub(
    "wood-flooring",
    "Pisos de madera en Houston",
    "Pisos de madera",
    "Pisos",
    "La madera en Houston tiene que vivir con humedad y, muchas veces, con una losa de concreto.",
    "Sólido o ingenieril se decide con el sustrato y con el cuarto. Un piso sobre losa no se instala igual que sobre madera. Aclimatamos el material en la casa. No lo pegamos el día que llega del camión.",
    [
      { q: "¿Se puede poner madera sobre losa?", a: "A veces, con el producto y la barrera correctos. Lo vemos en la casa. No todas las losas están listas." },
      { q: "¿Reparación o piso nuevo?", a: "Si las tablas están sanas, a veces se puede lijar. Si la losa está mojada o el piso está vencido, lo decimos." },
    ],
  ),
  hub(
    "tile-flooring",
    "Pisos de loseta en Houston",
    "Pisos de loseta",
    "Pisos",
    "La loseta perdona menos que la alfombra. Una losa irregular se ve en la junta.",
    "Preparamos el piso, trazamos el patrón y dejamos juntas que aguanten el movimiento de la arcilla de Houston. En entradas y baños el agua tiene que tener a dónde ir.",
    [
      { q: "¿Ponen porcelanato grande?", a: "Sí, si el sustrato está lo bastante plano. Si no, el prep es parte del trabajo, no un extra escondido." },
      { q: "¿La loseta se raja por el suelo de Houston?", a: "La arcilla se mueve. Las juntas y el prep reducen el riesgo. No prometemos que una losa nunca se mueva." },
    ],
  ),
  hub(
    "vinyl-flooring",
    "Pisos de vinil en Houston",
    "Pisos de vinil",
    "Pisos",
    "El vinil muestra la cresta que la alfombra escondía. En una losa de Houston eso se ve el primer día.",
    "Plancha o rollo, pegado o flotado, se elige según el cuarto y la humedad. No lo ponemos sobre un piso que todavía está mojado por una fuga.",
    [
      { q: "¿Sirve para baños y cocinas?", a: "Muchos productos sí. Confirmamos el que usted quiere con el agua de ese cuarto, no con un letrero de la tienda." },
      { q: "¿Tapan una losa dispareja?", a: "No del todo. Lo que se siente bajo la alfombra se ve bajo el vinil. A veces hay que nivelar." },
    ],
  ),
  hub(
    "laminate-flooring",
    "Pisos laminados en Houston",
    "Pisos laminados",
    "Pisos",
    "El laminado es un piso seco. No es la respuesta para un baño que se moja o para una losa que todavía tiene una fuga.",
    "La capa de desgaste, el núcleo y el underlayment se eligen juntos. En la humedad de Houston un laminado sin espacio en el perímetro se levanta. Lo dejamos respirar como pide el producto.",
    [
      { q: "¿Lo ponen en toda la casa?", a: "En cuartos secos, sí. Si el cuarto se inunda o es un baño, le decimos que no es el material." },
      { q: "¿Se puede poner sobre losa?", a: "Sí, con el underlayment correcto y una losa seca. Si hubo una fuga, primero se seca." },
    ],
  ),
  hub(
    "carpentry",
    "Carpintería en Houston",
    "Carpintería",
    "Interiores",
    "El trim, los closets y la madera que se ve tienen que aguantar la humedad de aquí, no la de un catálogo de otro clima.",
    "En casas viejas el perfil del zoclo no es estándar. Lo copiamos cuando se puede y lo decimos cuando no. La madera se aclimata. No la instalamos hinchada el día que llega.",
    [
      { q: "¿Hacen closets y built-ins?", a: "Sí, además de puertas, zoclos y reparaciones después de un daño de agua." },
      { q: "¿Igualan molduras viejas?", a: "Cuando el perfil existe. Si no, proponemos el más cercano y se lo mostramos antes de correr todo el cuarto." },
    ],
  ),
  hub(
    "tile-fireplaces",
    "Chimeneas en Houston",
    "Chimeneas de loseta",
    "Interiores",
    "En Houston la chimenea casi nunca es la calefacción de la casa. Es una pared de diseño, y la loseta tiene que ser la que aguanta el calor si el fuego se usa.",
    "Revestimos el frente, el hogar y a veces la repisa. No abrimos un conducto viejo y lo damos por seguro sin verlo. Si el proyecto es solo la pared, lo decimos.",
    [
      { q: "¿La chimenea se usa o es decorativa?", a: "Las dos existen aquí. El material cambia si de verdad hay fuego. Lo preguntamos antes de pedir piedra." },
      { q: "¿Es un proyecto aparte de la sala?", a: "Puede ser solo la chimenea. También puede cerrar una remodelación más grande. Eso se acuerda antes de empezar." },
    ],
  ),
  hub(
    "roofing",
    "Techos en Houston",
    "Techos",
    "Techo",
    "Un techo en Houston es la teja, la membrana, el flashing y la ventilación. Después de granizo o un huracán, a veces lo primero es una lona.",
    "Revisamos y decimos si una reparación aguanta o si el techo tiene que salir. No lo decimos desde la calle. Atendemos casas, apartamentos y techos comerciales bajos cuando se puede subir con seguridad. La temporada de huracanes es del 1 de junio al 30 de noviembre.",
    [
      { q: "¿Reparan o solo cambian el techo?", a: "Las dos. En la visita le decimos cuál. Un cambio incluye quitar lo viejo, revisar la madera, la membrana, el flashing y la ventilación." },
      { q: "¿Ayudan con el reclamo?", a: "Con fotos y un estimado de la reparación. Su aseguradora decide. No somos ajustadores públicos." },
    ],
  ),
  hub(
    "roof-replacement",
    "Cambio de techo en Houston",
    "Reemplazo de techo",
    "Techo",
    "Cambiar el techo es poner el sistema completo, no parchar encima de un deck que no vimos.",
    "Asfalto, metal, loseta o compuestos se eligen con el peso, el calor y el viento de esta casa. El color se ve en la fachada, de día. En Memorial, Katy, Pearland y The Woodlands el orden es el mismo: ver, documentar, instalar.",
    [
      { q: "¿La lona está incluida?", a: "Si el techo está abierto, la lona es un paso temporal y se cobra aparte de un techo nuevo. No es el techo terminado." },
      { q: "¿Cuánto cuesta un techo en Houston?", a: "Como rango de planeación, no como cotización, muchos techos de asfalto arquitectónico andan entre $12,000 y $24,000. La forma del techo lo mueve. No es un deducible." },
    ],
  ),
  hub(
    "roofing-emergency-tarp-repair",
    "Lona de techo en Houston",
    "Lona de emergencia para techos",
    "Techo",
    "Si el techo está abierto, el primer trabajo es que la siguiente lluvia se quede afuera. La lona es temporal.",
    "Fotografiamos la abertura antes de cubrirla, cuando es seguro subir. Anclamos la lona para el viento que sigue. En un techo bajo de comercio el agua se encharca: una lona suelta es peor. También cubrimos casas y apartamentos. El board-up es para ventanas y puertas, no para el techo.",
    [
      { q: "¿La lona es la reparación?", a: "No. Compra tiempo. La reparación o el cambio del techo viene después, con las fotos ya tomadas." },
      { q: "¿Suben durante la tormenta?", a: "No con rayos ni con viento que haga inseguro el techo. Llame al " + phone + " y le decimos el siguiente paso seguro." },
    ],
  ),
  hub(
    "siding",
    "Siding en Houston",
    "Siding",
    "Exterior",
    "El siding es la cara que la casa le enseña a la calle. El sol del oeste y la lluvia lo envejecen por lados, no parejo.",
    "Reparamos una sección cuando el perfil existe y el color se puede acercar. Si el parche siempre se va a ver, lo decimos. Detrás de tablas blandas a veces hay humedad. No la tapamos.",
    [
      { q: "¿Cambian solo un tramo?", a: "A menudo, si el perfil se consigue. El lado sur no combina con una tabla nueva del color original. Igualamos la pared como está." },
      { q: "¿Después de un huracán?", a: "Fotografiamos lo que el viento se llevó y reparamos o reemplazamos esa elevación. El seguro decide la cobertura." },
    ],
  ),
  hub(
    "patios-decks",
    "Patios y decks en Houston",
    "Patios y decks",
    "Exterior",
    "El patio va sobre el suelo. El deck es una estructura. En Houston las dos tienen que sacar el agua de la casa.",
    "Revisamos la pendiente, el ledger y los postes antes de hablar de la tabla que se ve. La arcilla se mueve. Un patio que escurre hacia la losa moja la cimentación. Hay páginas aparte para patios, decks y gazebos.",
    [
      { q: "¿Reparación o nuevo?", a: "Si la estructura está sana, a veces solo cambia la superficie. Si el ledger o los postes están podridos, se reemplazan." },
      { q: "¿Hacen cubiertas?", a: "Sí. Postes, vigas y un techo que tire el agua. Se cotizan aparte de la losa." },
    ],
  ),
  hub(
    "water-damage-restoration",
    "Daño de agua en Houston",
    "Restauración por daño de agua",
    "Agua",
    "El agua en Houston empeora por hora. La humedad no deja secar sola una losa ni un muro.",
    "Localizamos por dónde se fue, extraemos, secamos con ventiladores y deshumidificadores, y reparamos cuando las lecturas lo permiten. Casas, comercios y apartamentos. Las causas que más vemos: tubos reventados por una helada, calentadores, lavavajillas e inodoros. Una fuga repentina no es lo mismo que una filtración de meses. Revise su póliza.",
    [
      { q: "¿Qué hago primero?", a: "Si es seguro, corte el agua y llame al " + phone + ". No se meta en agua junto a la electricidad." },
      { q: "¿Reconstruyen después de secar?", a: "Sí. Drywall, pisos y gabinetes, cuando la estructura está seca. No cerramos un muro mojado." },
    ],
  ),
  hub(
    "insurance-claims",
    "Reclamos de seguro en Houston",
    "Ayuda con reclamos de seguro",
    "Seguro",
    "Ayudamos a documentar el daño de agua o de tormenta. No decidimos la póliza y no somos ajustadores públicos.",
    "Fotos, notas de humedad, un estimado de la reparación y, si usted quiere, estar cuando llegue el ajustador. Huracanes, granizo, viento, tornados e inundación no son la misma cobertura. El agua que sube de la calle suele ser otra póliza. No le cambiamos el nombre. Hay guías, en inglés, sobre aseguradoras grandes de Texas. No estamos afiliados a ninguna.",
    [
      { q: "¿Presentan el reclamo por mí?", a: "No. Usted avisa a su aseguradora. Nosotros documentamos el edificio y reparamos lo contratado." },
      { q: "¿Prometen que paguen?", a: "No. Ni aprobación ni monto. Revise su póliza o pregúntele a su aseguradora." },
    ],
  ),
  hub(
    "painting-drywall-repair",
    "Pintura y drywall en Houston",
    "Pintura y reparación de drywall",
    "Interiores",
    "La pintura es como se ve terminado el trabajo. El parche tiene que desaparecer, y la pared tiene que estar seca.",
    "Empastamos, igualamos textura y pintamos. En The Heights, Bellaire y West University hay muros con textura o yeso viejo. Si el muro se abrió por una fuga, no se cierra hasta que está seco. Eso no es un extra: es el orden.",
    [
      { q: "¿Se va a ver el parche?", a: "Un buen parche no se ve. Extendemos el empaste y la pintura lo necesario para que no quede un borde." },
      { q: "¿Pintan todo el cuarto o solo el parche?", a: "Las dos. Un parche chico se funde. Un cuarto que cambió se pinta completo para que el brillo coincida." },
    ],
  ),
];

export function getEsHub(slug: string) {
  return esHubs.find((hub) => hub.slug === slug);
}
