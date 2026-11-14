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
    description: `${name} en Houston. Somos una empresa familiar desde 1993. Llame al ${phone}.`,
    lede,
    sections: [
      {
        eyebrow: "La visita",
        heading: `${name} en Houston`,
        paragraphs: [lede, body],
      },
      {
        eyebrow: "Lo que sigue",
        heading: "Qué puede esperar",
        paragraphs: [
          `Vemos la casa o el edificio, le decimos qué hace falta y qué puede quedarse, y lo escribimos antes de quitar de más. La oficina está en 511 Crestwater Ct, Houston, TX 77082. Elite Restorations es una empresa familiar desde 1993.`,
          `Si hay seguro de por medio, ayudamos con fotos, un estimado de la reparación y, si usted quiere, estamos cuando llegue el ajustador. La aseguradora decide si paga. Nosotros no somos ajustadores públicos. Revise su póliza, y llame o envíe un texto al ${phone}.`,
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
        a: "La aseguradora decide la cobertura. Nosotros documentamos el daño y reparamos lo que usted contrata. Si tiene dudas de la póliza, pregúntele a su aseguradora. Esto no es un consejo legal.",
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
    "Una cocina en Houston se planea alrededor de cómo ustedes cocinan y se reúnen, no de un catálogo.",
    "Medimos antes de prometer que un muro se puede mover. En casas viejas de The Heights o West University, la plomería y la estructura deciden el diseño. En Katy, Cinco Ranch y The Woodlands la cocina suele ser el centro de un espacio abierto. Los gabinetes, las cubiertas, la loseta y la luz van juntos, como un solo trabajo.",
    [
      { q: "¿Hacen la cocina completa o solo una parte?", a: "Las dos. A veces es la cocina completa. A veces solo son las cubiertas, la pared de loseta detrás de la estufa o el piso. Hacemos lo que esa cocina necesita." },
      { q: "¿Cuánto tarda?", a: "Depende del cambio de distribución y del tiempo de los materiales. Se lo decimos en la visita, antes de empezar." },
    ],
  ),
  hub(
    "bathroom-remodeling",
    "Baños en Houston",
    "Remodelación de baños",
    "Interiores",
    "Un baño en Houston es un cuarto chico, y hay que decidir la regadera, el lavabo, la loseta y la luz.",
    "Primero se impermeabiliza. Después va la loseta que se ve. En una losa, mover el drenaje no siempre se puede. Lo medimos antes de prometer el plano, igual en un medio baño de West University que en el baño principal de Memorial.",
    [
      { q: "¿Pueden cambiar la distribución?", a: "Casi siempre. Primero vemos qué permiten la plomería y la estructura." },
      { q: "¿Instalan loseta grande?", a: "Sí. El porcelanato de piezas grandes, los mosaicos y los patrones necesitan un piso parejo y un trazo cuidadoso." },
    ],
  ),
  hub(
    "backsplash",
    "Backsplash en Houston",
    "Backsplash",
    "Interiores",
    "El backsplash es la pared de la cocina que se limpia todos los días. Con la humedad de Houston, el material y la junta importan más que la foto.",
    "Lo planeamos junto con la cubierta y los contactos, no después de que la piedra ya está puesta. En cocinas viejas las paredes no están derechas. Se lo decimos antes de cortar.",
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
    "La cubierta es donde se cocina y se limpia. El cuarzo, el granito, el mármol y la superficie sólida no se portan igual con el calor y la humedad del Golfo.",
    "Medimos la cocina que existe, no un rectángulo sacado de un plano. En las casas viejas, una cocina chueca cambia el corte. La medida se toma en la casa. Por teléfono no la dejamos fija.",
    [
      { q: "¿Quitan la cubierta vieja?", a: "Sí, cuando el gabinete de abajo puede recibir la nueva. Si el gabinete está hinchado por una fuga, eso se arregla primero." },
      { q: "¿El precio es por pie?", a: "El material, el canto, los cortes de la tarja y el viaje cambian el número. Le damos un estimado después de medir. No hay una sola tarifa para todo Houston." },
    ],
  ),
  hub(
    "wood-flooring",
    "Pisos de madera en Houston",
    "Pisos de madera",
    "Pisos",
    "La madera en Houston tiene que convivir con la humedad y, muchas veces, con una losa de concreto.",
    "Madera sólida o de ingeniería se decide según el piso de abajo y el cuarto. Sobre una losa no se instala igual que sobre un piso de madera. Dejamos que el material se acostumbre a la casa. No lo pegamos el mismo día que llega del camión.",
    [
      { q: "¿Se puede poner madera sobre losa?", a: "A veces, con el producto correcto y una barrera contra la humedad. Lo vemos en la casa. No todas las losas están listas." },
      { q: "¿Reparación o piso nuevo?", a: "Si las tablas están sanas, a veces se puede lijar. Si la losa está mojada o el piso está hundido, se lo decimos." },
    ],
  ),
  hub(
    "tile-flooring",
    "Pisos de loseta en Houston",
    "Pisos de loseta",
    "Pisos",
    "La loseta perdona menos que la alfombra. Si la losa está irregular, se nota en la junta.",
    "Preparamos el piso, marcamos el patrón y dejamos juntas que aguanten el movimiento de la arcilla de Houston. En entradas y baños, el agua tiene que tener a dónde ir.",
    [
      { q: "¿Ponen porcelanato grande?", a: "Sí, si el piso de abajo está lo bastante plano. Si no, nivelarlo es parte del trabajo, no un cargo escondido." },
      { q: "¿La loseta se raja por el suelo de Houston?", a: "La arcilla de Houston se mueve. Las juntas y la preparación del piso bajan el riesgo. No podemos prometer que una losa nunca se mueva." },
    ],
  ),
  hub(
    "vinyl-flooring",
    "Pisos de vinil en Houston",
    "Pisos de vinil",
    "Pisos",
    "El vinil enseña el desnivel que la alfombra escondía. En una losa de Houston eso se ve el primer día.",
    "En tablones o en rollo, pegado o flotante, se elige según el cuarto y la humedad. No lo ponemos sobre un piso que todavía está mojado por una fuga.",
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
    "El laminado es un piso para cuartos secos. No es la respuesta para un baño que se moja, ni para una losa que todavía tiene una fuga.",
    "La capa que se pisa, el centro de la tabla y la base de abajo se eligen juntos. Con la humedad de Houston, un laminado sin espacio en las orillas se levanta. Dejamos el espacio que pide el fabricante.",
    [
      { q: "¿Lo ponen en toda la casa?", a: "En cuartos secos, sí. Si el cuarto se inunda o es un baño, le decimos que ese material no va ahí." },
      { q: "¿Se puede poner sobre losa?", a: "Sí, con la base correcta y una losa seca. Si hubo una fuga, primero se seca." },
    ],
  ),
  hub(
    "carpentry",
    "Carpintería en Houston",
    "Carpintería",
    "Interiores",
    "Los zoclos, las molduras, los closets y la madera que se ve tienen que aguantar la humedad de aquí, no la de un catálogo de otro clima.",
    "En casas viejas el perfil del zoclo no es el de la tienda. Lo copiamos cuando se puede, y se lo decimos cuando no. Dejamos que la madera se acostumbre a la casa. No la ponemos hinchada el día que llega.",
    [
      { q: "¿Hacen closets y muebles empotrados?", a: "Sí. Closets, muebles empotrados, puertas, zoclos y reparaciones después de un daño de agua." },
      { q: "¿Igualan molduras viejas?", a: "Cuando ese perfil todavía se consigue. Si no, le proponemos el más cercano y se lo mostramos antes de poner moldura en todo el cuarto." },
    ],
  ),
  hub(
    "tile-fireplaces",
    "Chimeneas en Houston",
    "Chimeneas de loseta",
    "Interiores",
    "En Houston la chimenea casi nunca calienta la casa. Es una pared de la sala, y la loseta tiene que aguantar el calor si de verdad se prende el fuego.",
    "Cubrimos el frente, la boca de la chimenea y a veces la repisa. Si el conducto es viejo, lo vemos antes de decir que está bien. Si el trabajo es solo la pared, se lo decimos.",
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
    "Un techo en Houston es la teja, la membrana de abajo, el metal que sella el agua y la ventilación. Después de granizo o un huracán, a veces lo primero es una lona.",
    "Revisamos el techo y le decimos si una reparación aguanta o si hay que cambiarlo. Para decirlo hay que subir. Desde la calle no se ve. Atendemos casas, apartamentos y techos comerciales bajos cuando se puede subir con seguridad. La temporada de huracanes es del 1 de junio al 30 de noviembre.",
    [
      { q: "¿Reparan o solo cambian el techo?", a: "Las dos. En la visita le decimos cuál. Un cambio incluye quitar lo viejo, revisar la madera de abajo, la membrana, el metal que sella el agua y la ventilación." },
      { q: "¿Ayudan con el reclamo?", a: "Con fotos y un estimado de la reparación. Su aseguradora decide. No somos ajustadores públicos." },
    ],
  ),
  hub(
    "roof-replacement",
    "Cambio de techo en Houston",
    "Reemplazo de techo",
    "Techo",
    "Cambiar el techo es poner el sistema completo, no parchar encima de la madera que va debajo de la teja si no la vimos.",
    "Asfalto, metal, loseta o teja compuesta se eligen según el peso, el calor y el viento de esta casa. El color se ve en la fachada, de día. En Memorial, Katy, Pearland y The Woodlands el orden es el mismo: ver, documentar, instalar.",
    [
      { q: "¿La lona está incluida?", a: "Si el techo está abierto, la lona es un paso temporal y se cobra aparte de un techo nuevo. La lona no es el techo terminado." },
      { q: "¿Cuánto cuesta un techo en Houston?", a: "Como rango para planear, no como cotización, muchos techos de teja de asfalto arquitectónica andan entre $12,000 y $24,000. La forma del techo mueve el número. Ese rango no es su deducible." },
    ],
  ),
  hub(
    "roofing-emergency-tarp-repair",
    "Lona de techo en Houston",
    "Lona de emergencia para techos",
    "Techo",
    "Si el techo está abierto, el primer trabajo es que la siguiente lluvia se quede afuera. La lona es temporal.",
    "Fotografiamos la abertura antes de cubrirla, cuando es seguro subir. Amarramos la lona para el viento que sigue. En un techo bajo de comercio el agua se encharca, y una lona suelta empeora las cosas. También cubrimos casas y apartamentos. Cerrar con madera es para ventanas y puertas, no para el techo.",
    [
      { q: "¿La lona es la reparación?", a: "No. La lona compra tiempo. La reparación o el cambio del techo viene después, con las fotos ya tomadas." },
      { q: "¿Suben durante la tormenta?", a: "No subimos si hay rayos o si el viento hace inseguro el techo. Llame al " + phone + ". Le llamamos en cuanto podamos y le decimos el siguiente paso seguro." },
    ],
  ),
  hub(
    "siding",
    "Siding en Houston",
    "Siding",
    "Exterior",
    "El siding es el forro de afuera, la cara que la casa le enseña a la calle. El sol del oeste y la lluvia lo envejecen por lados, no parejo.",
    "Reparamos un tramo cuando el perfil se consigue y el color se puede acercar. Si el parche se va a notar siempre, se lo decimos. Si detrás de las tablas hay humedad, la secamos antes de cubrirlas.",
    [
      { q: "¿Cambian solo un tramo?", a: "A menudo, si el perfil se consigue. El lado sur no va a combinar con una tabla nueva del color de fábrica. Igualamos la pared como está hoy." },
      { q: "¿Después de un huracán?", a: "Fotografiamos lo que el viento se llevó y reparamos o cambiamos ese lado de la casa. La aseguradora decide la cobertura." },
    ],
  ),
  hub(
    "patios-decks",
    "Patios y decks en Houston",
    "Patios y decks",
    "Exterior",
    "El patio va sobre el suelo. El deck es una plataforma con estructura propia. En Houston, las dos tienen que alejar el agua de la casa.",
    "Revisamos la pendiente, el tablón que une el deck a la casa y los postes, antes de hablar de la tabla que se ve. La arcilla se mueve. Un patio que escurre hacia la losa moja la cimentación. Hay páginas aparte para patios, decks y gazebos.",
    [
      { q: "¿Reparación o nuevo?", a: "Si la estructura está sana, a veces solo cambia la superficie. Si el tablón que la une a la casa, o los postes, están podridos, se reemplazan." },
      { q: "¿Hacen cubiertas?", a: "Sí. Postes, vigas y un techo que tire el agua. Eso se cotiza aparte de la losa del patio." },
    ],
  ),
  hub(
    "water-damage-restoration",
    "Daño de agua en Houston",
    "Restauración por daño de agua",
    "Agua",
    "El agua en Houston empeora por hora. La humedad no deja que una losa o un muro se sequen solos.",
    "Buscamos por dónde se fue, sacamos el agua, secamos con ventiladores y deshumidificadores, y reparamos cuando el muro ya está seco. Casas, comercios y apartamentos. Lo que más vemos: tubos reventados por una helada, calentadores, lavavajillas e inodoros. Una fuga de un día no es lo mismo que una filtración de meses. Revise su póliza.",
    [
      { q: "¿Qué hago primero?", a: "Si es seguro, cierre el agua y llame al " + phone + ". No camine en agua que esté junto a la electricidad." },
      { q: "¿Reconstruyen después de secar?", a: "Sí. Tablaroca, pisos y gabinetes, cuando la estructura está seca. Un muro mojado no se cierra." },
    ],
  ),
  hub(
    "insurance-claims",
    "Reclamos de seguro en Houston",
    "Ayuda con reclamos de seguro",
    "Seguro",
    "Ayudamos a documentar el daño de agua o de tormenta. La póliza la decide su aseguradora. Nosotros no somos ajustadores públicos.",
    "Tomamos fotos, anotamos la humedad, preparamos un estimado de la reparación y, si usted quiere, estamos cuando llegue el ajustador. Huracanes, granizo, viento, tornados e inundación no son la misma cobertura. El agua que sube de la calle suele ser otra póliza. No le cambiamos el nombre al daño para que suene a otra cosa. Hay guías, en inglés, sobre aseguradoras grandes de Texas. No trabajamos para ninguna de ellas.",
    [
      { q: "¿Presentan el reclamo por mí?", a: "Usted avisa a su aseguradora. Nosotros documentamos el edificio y reparamos lo que usted contrata." },
      { q: "¿Prometen que paguen?", a: "La aseguradora decide la aprobación y el monto. Nosotros no lo prometemos. Revise su póliza o pregúntele a ellos." },
    ],
  ),
  hub(
    "painting-drywall-repair",
    "Pintura y drywall en Houston",
    "Pintura y reparación de drywall",
    "Interiores",
    "La pintura es lo que se ve cuando el trabajo ya está listo. El parche tiene que desaparecer, y la pared tiene que estar seca.",
    "Empastamos, igualamos la textura y pintamos. En The Heights, Bellaire y West University hay muros con textura o yeso viejo. Si el muro se abrió por una fuga, no se cierra hasta que está seco. Secar primero no es un cargo extra. Es el orden correcto.",
    [
      { q: "¿Se va a ver el parche?", a: "Un buen parche no se ve. Extendemos el empaste y la pintura lo necesario para que no quede una orilla." },
      { q: "¿Pintan todo el cuarto o solo el parche?", a: "Las dos. Un parche chico se funde con la pared. Si el cuarto cambió, se pinta completo para que el brillo coincida." },
    ],
  ),
];

export function getEsHub(slug: string) {
  return esHubs.find((hub) => hub.slug === slug);
}
