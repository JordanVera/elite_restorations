import { duplicateQuestions } from "@/lib/faqs";
import { esServiceFaqs } from "@/lib/faqs/es";
import { esHubHomeownerFaqs } from "@/lib/faqs/homeowner";
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

const claimHubs = new Set<EsHub["slug"]>([
  "roofing",
  "roof-replacement",
  "roofing-emergency-tarp-repair",
  "water-damage-restoration",
  "insurance-claims",
  "emergency-board-up",
  "commercial-storm-restoration",
  "fire-damage-restoration",
  "hail-damage-roof-repair",
]);

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
    description: `${name} en Houston. Empresa familiar desde 1993. Llame al ${phone} para pedir un estimado.`,
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
          `Vemos la casa o el edificio, le decimos qué hace falta y qué puede quedarse, y lo escribimos antes de quitar de más. Trabajamos desde nuestra oficina en el oeste de Houston (77082). Elite Restorations es una empresa familiar desde 1993.`,
          claimHubs.has(slug)
            ? `Si hay seguro de por medio, ayudamos con fotos, un estimado de la reparación y, si usted quiere, estamos cuando llegue el ajustador. La aseguradora decide si paga. No somos ajustadores públicos. Revise su póliza, y llame o envíe un texto al ${phone}.`
            : `Llame o envíe un texto al ${phone} para pedir un estimado, y agendamos la visita de lunes a sábado. Si el trabajo no le conviene, se lo decimos en la casa, antes de empezar.`,
        ],
      },
    ],
    faqs: [
      ...faqs,
      {
        q: "¿Atienden casas, comercios y apartamentos?",
        a: claimHubs.has(slug)
          ? `Sí en emergencia de tormenta y de agua. Para una visita programada, la oficina abre de lunes a sábado, de 8:00 AM a 6:00 PM. Si sigue entrando agua, llame al ${phone}.`
          : `Sí. Una visita programada es de lunes a sábado, de 8:00 AM a 6:00 PM. Llame al ${phone} para pedir un estimado, y le decimos el siguiente paso.`,
      },
      {
        q: "¿Deciden si el seguro paga?",
        a: "La aseguradora decide la cobertura. Nosotros documentamos el daño y reparamos lo que usted contrata. Si tiene dudas de la póliza, pregúntele a su aseguradora. Esto no es un consejo legal.",
      },
      {
        q: "¿Dónde están?",
        a: "Nuestra oficina en el oeste de Houston (77082). Trabajamos en el área de Houston, incluyendo Katy, Sugar Land, Memorial, The Woodlands y los vecindarios junto a la oficina.",
      },
    ],
  };
}

const esHubInputs: readonly EsHub[] = [
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
    "Instalación de laminado en Houston",
    "Pisos laminados",
    "Pisos",
    "El servicio de pisos laminados en Houston es para cuartos secos: recámaras, pasillos y salas. No es la respuesta para un baño que se moja, ni para una losa que todavía tiene una fuga.",
    "La instalación de pisos laminados en Houston junta la capa que se pisa, el centro de la tabla y la base de abajo. Con la humedad de aquí, un laminado sin espacio en las orillas se levanta. Dejamos el espacio que pide el fabricante. En casas nuevas de Katy, Cinco Ranch, Pearland y Magnolia suele ir sobre losa, después de revisar que esté seca y pareja. En octubre de 2026 terminamos la planta baja de una casa en BlackHorse Ranch South, Cypress. Ese piso fue vinil de lujo con aspecto de madera, después de nivelar la losa. Es otro piso, no laminado.",
    [
      { q: "¿Lo ponen en toda la casa?", a: "En cuartos secos, sí. Si el cuarto se inunda o es un baño, le decimos que ese material no va ahí." },
      { q: "¿Se puede poner sobre losa?", a: "Sí, con la base correcta y una losa seca. Si hubo una fuga, primero se seca." },
      {
        q: "¿Hacen instalación de pisos laminados en Houston?",
        a: "Sí. El servicio de pisos laminados cubre recámaras, pasillos y salas que se quedan secos, con la base que pide el producto. El baño se queda en loseta. Empresa familiar desde 1993. Llame al (713) 909-0034.",
      },
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
    "Revisamos el techo y le decimos si una reparación aguanta o si hay que cambiarlo. Para decirlo hay que subir. Desde la calle no se ve. Atendemos casas, apartamentos y techos comerciales bajos cuando se puede subir con seguridad. La temporada de huracanes es del 1 de junio al 30 de noviembre. Si el techo va a ser CertainTeed, hay una página sobre las líneas Landmark, el granizo y el tiempo de un cambio.",
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
    "Reparamos un tramo cuando el perfil se consigue y el color se puede acercar. Si el parche se va a notar siempre, se lo decimos. Si detrás de las tablas hay humedad, la secamos antes de cubrirlas. Si el forro va a ser James Hardie, hay una página sobre HardiePlank, HardieTrim y ColorPlus.",
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
    "Ayudamos a documentar el daño de agua o de tormenta. La póliza la decide su aseguradora. No somos ajustadores públicos.",
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
  hub(
    "emergency-board-up",
    "Tablas de emergencia en Houston",
    "Tablas de emergencia",
    "Emergencia",
    "Si una tormenta, una rama o un golpe deja un edificio abierto, la primera hora útil es una tapa que se quede puesta.",
    "Fotografiamos la abertura y fijamos una tabla rígida a un marco sano. Casas, comunidades de apartamentos y frentes comerciales son la misma idea y otro acceso. Díganos cuántas aberturas hay, en qué piso, y si el agua ya está adentro. La tabla detiene más lluvia. El vidrio, la puerta o el muro son el trabajo que sigue.",
    [
      { q: "¿Suben si hay rayos?", a: "No. Los rayos, un muro que se inclina o agua junto a la electricidad pueden esperar a que haya luz y sea seguro. Llame al " + phone + " y le decimos el siguiente paso." },
      { q: "¿La tabla es la fachada terminada?", a: "No. Es temporal. La fijamos con cuidado porque puede quedarse hasta que llegue el vidrio. No es el frente terminado de la casa." },
    ],
  ),
  hub(
    "fence-installation-repair",
    "Cercas en Houston",
    "Cercas",
    "Exterior",
    "Una cerca en Houston falla en los postes. La humedad, la arcilla y el viento hacen más que el color del tinte.",
    "Caminamos la cerca, cambiamos lo que está blando y construimos lo que tiene que ser nuevo. Un tramo que una tormenta tiró y una cerca que se pudrió durante años son hechos distintos. Describimos la que está en el patio. La pudrición sigue siendo pudrición, aunque una tormenta haya pasado la misma semana.",
    [
      { q: "¿Reemplazan solo unos tramos?", a: "Sí, cuando los postes de al lado están sanos y el estilo todavía se puede empatar. Si los postes están blandos, la cerca necesita más que un parche." },
      { q: "¿Ustedes marcan la línea del terreno?", a: "Construimos donde usted nos indica. Si la línea está en disputa, un levantamiento va antes de los hoyos." },
    ],
  ),
  hub(
    "gutters",
    "Canaletas en Houston",
    "Canaletas",
    "Exterior",
    "Una canaleta en Houston o lleva una lluvia fuerte a un bajante lejos de la casa, o la tira sobre el ladrillo.",
    "Vemos la pendiente, los ganchos, las esquinas y la tabla de atrás. Las manchas de un desborde, una tabla blanda y un tramo que el viento arrancó son trabajos distintos. Las hojas en una canaleta quieta son mantenimiento. Un reclamo de granizo es por el granizo, no por las hojas.",
    [
      { q: "¿Limpian o reemplazan?", a: "Reparamos y reemplazamos. Una limpieza no es un tramo nuevo. Si la canaleta se pandea o la tabla está blanda, lo decimos." },
      { q: "¿El agua de la canaleta moja la losa?", a: "Sí, si cae junto a la cimentación. Apuntamos los bajantes lejos de la casa. No decimos que una canaleta detenga el movimiento de la cimentación." },
    ],
  ),
  hub(
    "patios",
    "Patios en Houston",
    "Patios",
    "Exterior",
    "Un patio es el piso de afuera, sobre el suelo. Si escurre hacia el ladrillo, la lluvia de Houston se queda contra la losa.",
    "Dejamos la caída lejos de la casa y por debajo de la puerta. Concreto, adoquín y piedra envejecen distinto bajo este sol. Una cubierta es postes y un techo, no un recubrimiento. Los decks y los gazebos tienen su propia página porque son otra estructura. La arcilla alrededor de 77082 se mueve entre semanas secas y una lluvia tropical. La base es el trabajo que no se ve.",
    [
      { q: "¿Hacen concreto y adoquín?", a: "Sí. El patio, el drenaje y cómo quiere que envejezca al sol deciden cuál. Si un deck conviene más, lo decimos." },
      { q: "¿En qué se diferencia de la página de patios y decks?", a: "Esa página presenta los dos. Esta página es solo el patio a nivel del suelo. Decks y gazebos tienen la suya." },
    ],
  ),
  hub(
    "gazebos",
    "Gazebos en Houston",
    "Gazebos",
    "Exterior",
    "Un gazebo es un techo chico en país de huracanes. La sombra de mayo a septiembre es la razón de quererlo. El viento es la razón de anclarlo.",
    "Los construimos independientes, sobre cimentación. Una cubierta pegada a la casa es otra cosa, sellada para que la lluvia se quede afuera. Una plataforma elevada sin este techo es un deck. Esas páginas se quedan aparte. Un kit que nunca se ancló y luego se abrió con el viento lo describimos con claridad. No le ponemos el nombre a una estructura que no anclaríamos para una ráfaga del Golfo.",
    [
      { q: "¿Instalan kits de patio?", a: "Solo si la estructura se puede anclar como la construiríamos nosotros. Muchos kits no pueden. Preferimos armar el marco que decorar uno débil." },
      { q: "¿Puede ir sobre el patio que ya está?", a: "Si la losa está sana, escurre y aguanta los postes. Una losa agrietada que guarda agua no es una cimentación." },
    ],
  ),
  hub(
    "decks",
    "Decks en Houston",
    "Decks",
    "Exterior",
    "Las tablas que se pisan son la última pregunta. Primero vemos la tabla contra la casa, los postes, la cimentación y la tornillería.",
    "Tablas nuevas sobre una tabla blanda esconden una filtración hacia el muro. Madera y composite son las dos elecciones honestas con esta humedad. Un deck a la sombra, al norte, y uno al oeste en pleno sol no quieren el mismo cuidado. Esta página es el deck con estructura. El patio a nivel del suelo y el gazebo independiente van aparte.",
    [
      { q: "¿Pueden cambiar las tablas y dejar la estructura?", a: "Cuando la unión con la casa, los soportes y los postes están sanos. Si están blandos, se reconstruyen. Miramos debajo antes de pedir tablas." },
      { q: "¿Hacen decks de segundo piso?", a: "Sí, cuando la casa y el acceso lo permiten. La unión con la casa y el barandal pesan más en ese trabajo que en una plataforma baja." },
    ],
  ),
  hub(
    "commercial-storm-restoration",
    "Tormenta comercial en Houston",
    "Restauración comercial por tormenta",
    "Emergencia",
    "Administradores, asociaciones y dueños de edificios pueden llamar a cualquier hora si la tormenta o el agua siguen en un apartamento o un comercio.",
    "Ponemos lona cuando el techo es seguro, tablas en el vidrio roto, sacamos el agua, secamos lo que se mojó y reparamos lo que usted contrata. Enviamos el estimado a su aseguradora y lo trabajamos con el ajustador. No somos ajustadores públicos. Somos independientes de cada aseguradora.",
    [
      { q: "¿Para quién es esta página?", a: "Para administradores, mesas directivas y dueños de comunidades de apartamentos y edificios comerciales en el área de Houston. Las casas usan las otras páginas, con los mismos oficios." },
      { q: "¿Entran a unidades ocupadas?", a: "Sí, con el acceso que usted arregle. No entramos a una unidad por nuestra cuenta, y no secamos todo el edificio porque un techo esté manchado." },
    ],
  ),
  hub(
    "fire-damage-restoration",
    "Fuego y humo en Houston",
    "Restauración por fuego y humo",
    "Fuego",
    "Después de que los bomberos entregan la casa, el reloj corre sobre el hollín y sobre el agua de las mangueras.",
    "El hollín es ácido. Marca el metal, la piedra y la madera terminada mientras se queda. El agua con la que apagaron el fuego no se seca sola con la humedad de Houston. Fotografiamos, ponemos tablas en lo que está abierto, limpiamos lo que se puede salvar, secamos la estructura y reconstruimos lo que usted contrata. Una cocina que se quedó en la cocina y un techo abierto son tamaños distintos. El orden es el mismo. En una losa de Spring Branch, Westchase o Katy el agua corre bajo el piso. En muchas casas viejas de The Heights también puede caer al espacio de abajo. El humo llega a los clósets aunque la llama se haya quedado en un cuarto. Trabajamos desde nuestra oficina en el oeste de Houston (77082).",
    [
      { q: "¿Puedo entrar a recoger papeles?", a: "No, hasta que los bomberos digan que el edificio es seguro. El humo, un piso blando y un fuego que no está apagado lastiman gente después de que bajan las llamas." },
      { q: "¿La limpieza es un fin de semana con producto de casa?", a: "No. Es quitar lo que no se salva, limpiar lo que sí, y secar por donde se fue el agua de los bomberos. Un trapo mojado puede embarrar el hollín en la pintura y en la piedra." },
    ],
  ),
  hub(
    "hail-damage-roof-repair",
    "Granizo en techos de Houston",
    "Reparación de techos por granizo",
    "Techo",
    "Una granizada en Houston puede magullar un techo que desde el jardín todavía se ve parejo.",
    "El metal blando lo enseña antes: canaletas, tapas y mosquiteros. Las tejas hay que verlas desde el techo, cuando se puede subir sin riesgo. Inspeccionamos, fotografiamos las pendientes para su registro y para cualquier reclamo, y decimos si una reparación aguanta o si el techo tiene que salir. Canaletas y siding del mismo evento van en la misma visita, con precio aparte. La primavera es cuando el granizo cruza el condado de Harris, de Meyerland y Oak Forest hasta Cypress, Tomball, Spring y Kingwood, y también en Katy, Memorial, Pearland y The Woodlands. La temporada de huracanes, del 1 de junio al 30 de noviembre, es otro calendario: viento y lluvia empujada. No los tratamos como la misma pérdida. Trabajamos desde nuestra oficina en el oeste de Houston (77082).",
    [
      { q: "¿El granizo siempre significa techo nuevo?", a: "No. Puede marcar el metal y dejar un techo que se repara. Un techo gastado puede tener que salir aunque la última tormenta haya hecho poco. La pendiente se inspecciona." },
      { q: "¿Me subo a confirmarlo?", a: "No. Tejas mojadas y una pendiente empinada lastiman. Desde el jardín anote abolladuras, piezas faltantes y manchas en el cielo. Nosotros vemos el techo cuando es seguro." },
    ],
  ),
];

export const esHubs: readonly EsHub[] = esHubInputs.map((hub) => {
  const extra = esServiceFaqs[hub.slug];
  if (!extra) throw new Error(`Missing Spanish FAQs: ${hub.slug}`);
  const faqs = [...hub.faqs, ...(esHubHomeownerFaqs[hub.slug] ?? []), ...extra];
  const repeated = duplicateQuestions(faqs);
  if (repeated.length > 0) {
    throw new Error(`/es/${hub.slug} repeats FAQ: ${repeated.join(" | ")}`);
  }
  if (hub.slug !== "laminate-flooring") return { ...hub, faqs };
  return {
    ...hub,
    description:
      "Instalación de pisos laminados en Houston para recámaras, pasillos y salas secas. Empresa familiar desde 1993. Llame al (713) 909-0034.",
    sections: hub.sections.map((section, index) =>
      index === 0
        ? { ...section, heading: "Servicio de pisos laminados en Houston" }
        : section,
    ),
    faqs,
  };
});

export function getEsHub(slug: string) {
  return esHubs.find((hub) => hub.slug === slug);
}
