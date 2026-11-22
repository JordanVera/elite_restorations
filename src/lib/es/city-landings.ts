import 'server-only';

import { esAreaCopy, type EsKind } from '@/lib/es/city-area-copy';
import { isSpanishCityArea, spanishCityAreaSlugs } from '@/lib/city-landing-locales';
import { assertCopyAllowed } from '@/lib/copy-guards';
import { esServiceNames } from '@/lib/i18n';
import { areaMiles, getAreaProfile } from '@/lib/local/areas';
import { hashString } from '@/lib/local/speak';
import type { LocalLanding } from '@/lib/local-landings';
import { localLandingSlug } from '@/lib/local-paths';
import { postalPlaceLabel } from '@/lib/place-labels';
import { titleFits } from '@/lib/seo';
import { isCityIndexedService, services } from '@/lib/services';
import { wordCount } from '@/lib/words';

type Trade = {
  slug: keyof typeof esServiceNames;
  short: string;
  blurb: string;
  kind: EsKind;
  claim: boolean;
  craft: string;
  sequence: string;
  visit: string;
  bullets: readonly string[];
  faqs: readonly { q: string; a: string }[];
};

const claimSentence =
  'Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No somos ajustadores públicos. Su aseguradora decide la cobertura.';

const trades: readonly Trade[] = [
  {
    slug: 'kitchen-remodeling',
    short: 'Cocinas',
    blurb: 'El plano se decide antes de demoler.',
    kind: 'interior',
    claim: false,
    craft:
      'En {name} medimos la cocina que está: el camino del fregadero a la estufa, la luz de noche y el muro que alguien quiere abrir. {kind} Los gabinetes, la cubierta y la iluminación se eligen antes de la demolición, para un verano húmedo del Golfo. No prometemos un cuarto abierto si ese muro carga el techo.',
    sequence:
      'La visita deja por escrito lo que se queda. Los gabinetes se piden después. La cubierta se plantilla cuando las cajas ya están niveladas, no desde un dibujo que ignoró una pared fuera de escuadra. El piso que cruza al cuarto de al lado espera a que la base esté seca y pareja.',
    visit: 'Revisamos drenajes, muros y la altura del piso en la puerta.',
    bullets: [
      'Plano del fregadero a la estufa',
      'Gabinetes para la humedad del Golfo',
      'Cubierta plantillada en la casa',
      'Piso que encuentra el cuarto de al lado',
    ],
    faqs: [
      {
        q: '¿Se puede abrir la cocina en {name}?',
        a: 'A veces. {kind} Lo decimos después de ver si el muro carga el techo y si el drenaje se puede mover.',
      },
      {
        q: '¿Cuándo se pide la cubierta?',
        a: 'Cuando los gabinetes de {name} ya están puestos y nivelados. Una plantilla anterior no sirve si la pared no está a escuadra.',
      },
      {
        q: '¿La asociación elige los gabinetes en {name}?',
        a: 'Casi nunca. En {name} la revisión, si existe, suele ser del techo y de lo que se ve desde la calle. Los gabinetes de adentro son otra pregunta.',
      },
      {
        q: '¿El precio sale del nombre de {name}?',
        a: 'No. Dos casas cerca del mismo camino pueden tener drenajes distintos. El alcance sale de la visita. Llame al (713) 909-0034.',
      },
    ],
  },
  {
    slug: 'bathroom-remodeling',
    short: 'Baños',
    blurb: 'La impermeabilización va antes de la loseta.',
    kind: 'interior',
    claim: false,
    craft:
      'En {name} el baño empieza por el muro mojado: la válvula, el drenaje, la charola y el ventilador. {kind} Una regadera de vidrio no impermeabiliza la pared. La loseta va después de esa capa, en un baño de pasillo o en una suite principal.',
    sequence:
      'Si el mueble se queda en su lugar, el drenaje se queda. Si la regadera se mueve, primero vemos qué permite la losa o el hueco. El ventilador tiene que salir al exterior, no al ático. El color del emboquillado puede esperar. La impermeabilización, no.',
    visit: 'Vemos la charola, la válvula y hacia dónde abre la puerta.',
    bullets: [
      'Impermeabilización antes de la loseta',
      'Regadera, tocador y luz como un solo trabajo',
      'Ventilador hacia afuera',
      'Drenaje confirmado antes de mover la regadera',
    ],
    faqs: [
      {
        q: '¿Se puede mover la regadera en {name}?',
        a: '{kind} Si se queda en su drenaje, la losa no se corta. Si se mueve, lo decimos después de ver la casa.',
      },
      {
        q: '¿Un vidrio deja la regadera impermeable?',
        a: 'No. En {name} la capa impermeable va en el muro, antes de la loseta y del vidrio.',
      },
      {
        q: '¿El baño de pasillo es el mismo trabajo que la suite?',
        a: 'No. En {name} un baño chico es otro alcance. Los dos se impermeabilizan si llevan loseta en la zona mojada.',
      },
      {
        q: '¿Cuándo hay que llamar?',
        a: 'Cuando quiera el baño en el calendario. Llame al (713) 909-0034. Salimos de nuestra oficina en el oeste de Houston (77082).',
      },
    ],
  },
  {
    slug: 'backsplash',
    short: 'Backsplash',
    blurb: 'El patrón se centra antes del mortero.',
    kind: 'interior',
    claim: false,
    craft:
      'En {name} el backsplash se centra en la estufa, la campana o la ventana que de verdad se ve. {kind} Un muro corto enseña cada corte. Un muro largo de cocina abierta tiene que leerse como un solo patrón desde la puerta.',
    sequence:
      'Medimos el largo, los contactos y el borde de la cubierta que se queda. Casi siempre se puede quitar la loseta vieja sin sacar la cubierta, si el muro de atrás está sano. El emboquillado se elige para una cocina que se limpia.',
    visit: 'Marcamos el centro del patrón antes de poner mortero.',
    bullets: [
      'Patrón centrado en la estufa o la ventana',
      'Contactos dentro del diseño',
      'Cubierta protegida si se queda',
      'Emboquillado para una cocina de uso diario',
    ],
    faqs: [
      {
        q: '¿Hay que sacar la cubierta para cambiar el backsplash en {name}?',
        a: 'Casi nunca. Protegemos la cubierta y vemos el muro de atrás. {kind}',
      },
      {
        q: '¿Dónde se centra el patrón?',
        a: 'En lo que se ve al entrar: la estufa, la campana o la ventana de {name}. No en un muro de exhibición.',
      },
      {
        q: '¿Un muro corto cambia el diseño?',
        a: 'Sí. En {name} un tramo corto no recibe el mismo patrón que una cocina abierta y larga.',
      },
      {
        q: '¿Cuándo se pone el mortero?',
        a: 'Después de marcar el centro y los cortes. Llame al (713) 909-0034 para ver la pared.',
      },
    ],
  },
  {
    slug: 'countertops',
    short: 'Cubiertas',
    blurb: 'La plantilla sale de los gabinetes ya puestos.',
    kind: 'interior',
    claim: false,
    craft:
      'En {name} la cubierta se plantilla cuando los gabinetes que se quedan ya están nivelados. {kind} Cuarzo, granito, mármol y superficie sólida no se cuidan igual. Hablamos de eso antes de pedir la placa. Las uniones y el fregadero se marcan en el cuarto.',
    sequence:
      'Una isla larga pide decidir la unión y el volado con la luz del cuarto, no con una muestra chica. Si la cubierta vieja solo está golpeada, decimos si una reparación es el trabajo de verdad antes de hablar de una placa nueva.',
    visit: 'Vemos nivel, acceso de la placa y el fregadero que quiere.',
    bullets: [
      'Plantilla con los gabinetes puestos',
      'Uniones y volados marcados en el cuarto',
      'Corte del fregadero en la casa',
      'Cuidado del material explicado antes de pedir',
    ],
    faqs: [
      {
        q: '¿Se puede pedir la piedra antes de la visita en {name}?',
        a: 'No. {kind} La plantilla sale de los gabinetes que de verdad están, no de un plano.',
      },
      {
        q: '¿Una isla larga cambia las uniones?',
        a: 'Sí. En {name} la unión se aleja de la luz peor. Lo marcamos en el cuarto.',
      },
      {
        q: '¿Toda cubierta golpeada se reemplaza?',
        a: 'No. Vemos el daño en {name} y decimos si una reparación alcanza.',
      },
      {
        q: '¿Cómo llega la placa?',
        a: 'Lo planeamos en la visita. Una entrada de {name} no es igual a una calle cerrada. Llame al (713) 909-0034.',
      },
    ],
  },
  {
    slug: 'wood-flooring',
    short: 'Piso de madera',
    blurb: 'La madera se aclimata en la casa.',
    kind: 'floor',
    claim: false,
    craft:
      'En {name} vemos si las tablas se pueden lijar o si hay que cambiarlas. {kind} La madera nueva pasa un tiempo en la casa antes de fijarse, para que tome la humedad. Un baño sigue siendo piso de loseta.',
    sequence:
      'Escaleras, puertas y el cuarto que no debe llevar madera entran en la misma visita. No prometemos un acabado por una foto del color. Las tablas tienen que tener espesor, y la base tiene que estar quieta y seca.',
    visit: 'Medimos espesor, humedad y qué tan parejo está el piso.',
    bullets: [
      'Lijado solo si la tabla aguanta',
      'Madera aclimatada en la casa',
      'Escaleras y puertas en el mismo plan',
      'El baño no se cubre con madera',
    ],
    faqs: [
      {
        q: '¿Se puede lijar el piso de {name}?',
        a: 'Si las tablas tienen espesor y la base está sana. {kind} Una foto del color no alcanza para prometerlo.',
      },
      {
        q: '¿La madera nueva se instala el día que llega?',
        a: 'No. En {name} se queda en la casa para tomar la humedad antes de fijarse.',
      },
      {
        q: '¿La madera sirve en el baño?',
        a: 'No la usamos como piso de baño en {name}. Esa zona sigue en loseta, impermeabilizada.',
      },
      {
        q: '¿Qué hay que decir al llamar?',
        a: 'Si quiere lijar o poner piso nuevo, y en qué cuartos. Llame al (713) 909-0034.',
      },
    ],
  },
  {
    slug: 'tile-flooring',
    short: 'Piso de loseta',
    blurb: 'La loseta pide una base pareja.',
    kind: 'floor',
    claim: false,
    craft:
      'En {name} la loseta grande enseña cada lomo. {kind} Un baño se impermeabiliza antes del acabado. Una sala es un piso parejo, con juntas de movimiento y emboquillado. No los cotizamos como un solo número.',
    sequence:
      'Revisamos la altura en las puertas antes de poner loseta sobre lo que ya está. El patrón se centra en el cuarto o en la puerta, para que no muera en una tira contra el muro.',
    visit: 'Vemos planeidad, puertas y si algún cuarto es zona mojada.',
    bullets: [
      'Base pareja antes de la loseta grande',
      'Zona mojada impermeabilizada',
      'Patrón centrado en el cuarto',
      'Altura revisada en las puertas',
    ],
    faqs: [
      {
        q: '¿Se puede losetar sobre el piso que ya está en {name}?',
        a: 'A veces, si la altura de la puerta lo permite y la base está sana. {kind}',
      },
      {
        q: '¿La loseta del baño es el mismo precio que la de la sala?',
        a: 'No. En {name} el baño lleva impermeabilización. La sala pide planeidad y emboquillado.',
      },
      {
        q: '¿Por qué se nota un lomo con loseta grande?',
        a: 'Porque la pieza no perdona. En {name} emparejamos la base antes de pegar la loseta.',
      },
      {
        q: '¿Qué cuartos hay que nombrar?',
        a: 'Todos los que entran, sobre todo si hay baño y cocina. Llame al (713) 909-0034.',
      },
    ],
  },
  {
    slug: 'vinyl-flooring',
    short: 'Piso de vinil',
    blurb: 'El vinil pide un piso seco y parejo.',
    kind: 'floor',
    claim: false,
    craft:
      'En {name} el vinil da un aspecto de madera o de piedra en cocinas, cuartos de juego y plantas bajas. {kind} Pegado, click o flotado se elige por el producto y por la base, no por costumbre. Una regadera no lleva vinil.',
    sequence:
      'Medimos el lomo que la alfombra escondía y las transiciones en las puertas. Si la losa sigue húmeda, el piso espera. El vinil no tapa un problema de agua.',
    visit: 'Confirmamos que la base esté seca, pareja y fuera de la regadera.',
    bullets: [
      'Base seca y pareja',
      'Sistema elegido para esa base',
      'Transiciones en las puertas',
      'Sin vinil dentro de la regadera',
    ],
    faqs: [
      {
        q: '¿El vinil tapa un lomo en {name}?',
        a: 'No. {kind} Lo que la alfombra escondía se va a ver.',
      },
      {
        q: '¿Sirve en la regadera?',
        a: 'No. En {name} la regadera sigue en loseta, con impermeabilización.',
      },
      {
        q: '¿Click, pegado o flotado?',
        a: 'Depende del producto y de la base de {name}. Lo decimos en la visita, no por teléfono.',
      },
      {
        q: '¿Se puede instalar sobre una losa húmeda?',
        a: 'No. Primero se seca. Llame al (713) 909-0034 si hubo una fuga.',
      },
    ],
  },
  {
    slug: 'laminate-flooring',
    short: 'Piso laminado',
    blurb: 'El laminado es para cuartos secos.',
    kind: 'floor',
    claim: false,
    craft:
      'En {name} el laminado es para recámaras, pasillos y salas, salvo que un producto de cocina esté dicho con claridad. {kind} La base tiene que estar pareja. El bajoalfombra no sustituye arreglar un lomo, ni endurece un piso que rebota.',
    sequence:
      'Las cajas se aclimatan en la casa después de aceptar la base. La puerta del baño se queda en loseta. Si el problema es la estructura, esa es la conversación, no una capa nueva encima.',
    visit: 'Vemos planeidad, la escalera si el piso llega a ella, y el baño que no entra.',
    bullets: [
      'Recámaras, pasillos y salas secas',
      'Base pareja antes de flotar',
      'Cajas aclimatadas en la casa',
      'El baño se queda en loseta',
    ],
    faqs: [
      {
        q: '¿El laminado endurece un piso blando en {name}?',
        a: 'No. {kind} Si la estructura se mueve, el laminado no la compone.',
      },
      {
        q: '¿Sirve después de una inundación?',
        a: 'Solo cuando la base de {name} ya está seca. No se pone para tapar humedad.',
      },
      {
        q: '¿Se aclimata?',
        a: 'Sí. En {name} las cajas pasan tiempo en la casa antes de instalarse.',
      },
      {
        q: '¿Qué cuartos no entran?',
        a: 'El baño. Díganos la lista de cuartos al llamar al (713) 909-0034.',
      },
    ],
  },
  {
    slug: 'carpentry',
    short: 'Carpintería',
    blurb: 'El remate se corta a la pared que ya existe.',
    kind: 'interior',
    claim: false,
    craft:
      'En {name} medimos el perfil que quiere conservar y el vano que quiere cambiar. {kind} Un built-in se corta al nicho, contactos incluidos. No cortamos un muro hasta saber qué está cargando. La madera nueva se aclimata en la casa.',
    sequence:
      'Remate, escalera, built-in y un vano nuevo son días distintos. Traiga un pedazo suelto de moldura si el perfil no se lee en una foto. El trabajo se iguala a lo que la casa ya tiene.',
    visit: 'Medimos perfiles, vanos y lo que el muro está cargando.',
    bullets: [
      'Moldura cortada al muro real',
      'Escaleras y built-ins medidos en el nicho',
      'Muros revisados antes de abrirlos',
      'Madera aclimatada en la casa',
    ],
    faqs: [
      {
        q: '¿Pueden igualar la moldura vieja en {name}?',
        a: 'Si el perfil se puede medir. {kind} Una foto a veces no basta. Un pedazo suelto ayuda.',
      },
      {
        q: '¿Abren un muro el mismo día?',
        a: 'No, si no sabemos qué carga. En {name} eso se ve en la visita.',
      },
      {
        q: '¿La carpintería va con la cocina?',
        a: 'A menudo sí. En {name} el remate y un sofito pueden ir en el mismo equipo que los gabinetes.',
      },
      {
        q: '¿Qué hay que decir al llamar?',
        a: 'Si es moldura, escalera, built-in o un vano. Llame al (713) 909-0034.',
      },
    ],
  },
  {
    slug: 'tile-fireplaces',
    short: 'Chimenea de loseta',
    blurb: 'La loseta de la chimenea se elige para el calor.',
    kind: 'interior',
    claim: false,
    craft:
      'En {name} vemos la caja de fuego, el hogar y el muro antes de hablar de piedra. {kind} No todas las casas conservan una chimenea. Si la suya está, decimos si se recubre o si hay que rehacer el frente. El material se elige para el calor aunque el fuego se prenda poco.',
    sequence:
      'La repisa se dibuja con la loseta para que la escala quepa en el cuarto donde se sienta la gente. Una foto de la fachada ayuda y no reemplaza ver grietas y la abertura.',
    visit: 'Vemos la caja, las grietas y el muro de alrededor.',
    bullets: [
      'Material pensado para el calor',
      'Repisa a la escala del cuarto',
      'Grietas vistas antes de cubrir',
      'Loseta, no un adorno que no aguanta la caja',
    ],
    faqs: [
      {
        q: '¿Toda casa de {name} tiene chimenea?',
        a: 'No. {kind} Si la suya está, la vemos antes de hablar de piedra.',
      },
      {
        q: '¿La loseta tiene que aguantar fuego?',
        a: 'Sí, aunque en {name} se prenda poco. El material junto a la abertura se elige para el calor.',
      },
      {
        q: '¿La repisa va en el mismo trabajo?',
        a: 'Casi siempre. La dibujamos con la loseta para que la escala quepa en el cuarto.',
      },
      {
        q: '¿Una foto basta?',
        a: 'Ayuda. En {name} igual hay que ver grietas y la abertura. Llame al (713) 909-0034.',
      },
    ],
  },
  {
    slug: 'roofing',
    short: 'Techos',
    blurb: 'Caminamos cada pendiente antes de decir si una reparación aguanta.',
    kind: 'roof',
    claim: true,
    craft:
      'En {name} el techo se ve desde el techo, cuando es seguro: cada pendiente, las penetraciones, los tapajuntas y las tablas que ya se notan blandas. {kind} Fotografiamos lo que hay y decimos reparación o reemplazo. Si el techo está abierto, la lona es el primer tema, no una carta de colores.',
    sequence:
      'No cotizamos un techo desde el suelo. El sur y el oeste envejecen primero. Un valle bajo árboles entra en la misma caminata. Si hay seguro de por medio, trabajamos el alcance con el ajustador como su contratista.',
    visit: 'Subimos cuando es seguro y fotografiamos todas las pendientes.',
    bullets: [
      'Inspección en el techo',
      'Fotos de pendientes y valles',
      'Reparación o reemplazo dicho después de subir',
      'Lona si el techo está abierto',
    ],
    faqs: [
      {
        q: '¿Se puede juzgar el techo de {name} desde la calle?',
        a: 'No. {kind} Subimos cuando es seguro.',
      },
      {
        q: '¿La lona es el techo nuevo?',
        a: 'No. En {name} detiene la siguiente lluvia. El techo permanente se decide con las fotos.',
      },
      {
        q: '¿Ustedes deciden el pago del seguro?',
        a: `${claimSentence}`,
      },
      {
        q: '¿Qué hay que decir al llamar?',
        a: 'Si hay una gotera o si el techo está abierto. Llame al (713) 909-0034. Si sigue entrando agua, dígalo primero.',
      },
    ],
  },
  {
    slug: 'roof-replacement',
    short: 'Reemplazo de techo',
    blurb: 'El reemplazo empieza por ver la madera.',
    kind: 'roof',
    claim: true,
    craft:
      'En {name} un reemplazo se confirma cuando una reparación no va a aguantar. {kind} Se quita el techo viejo para ver la madera, y después van la membrana, los tapajuntas, los respiraderos y el material. El color espera a la fachada y a cualquier revisión que la dirección pida.',
    sequence:
      'No pedimos tejas antes de la inspección. Las tablas blandas, si aparecen al quitar el techo, se hablan antes de cubrirlas. La página de costos de Houston es un rango, no este techo.',
    visit: 'Confirmamos que una reparación no alcanza y vemos la madera.',
    bullets: [
      'Quitar el techo viejo para ver la madera',
      'Membrana, tapajuntas y respiraderos',
      'Color después de la revisión que aplique',
      'Tablas blandas dichas antes de cubrirlas',
    ],
    faqs: [
      {
        q: '¿Todo techo de {name} se reemplaza?',
        a: 'No. {kind} Si una reparación aguanta, lo decimos.',
      },
      {
        q: '¿Se pueden pedir las tejas antes?',
        a: 'No. En {name} primero se ve este techo. El color espera la revisión de la dirección.',
      },
      {
        q: '¿Qué pasa si la madera está blanda?',
        a: 'Se habla antes de taparla. En {name} eso puede cambiar el alcance del día.',
      },
      {
        q: '¿Ustedes deciden el pago del seguro?',
        a: claimSentence,
      },
    ],
  },
  {
    slug: 'roofing-emergency-tarp-repair',
    short: 'Lona de techo',
    blurb: 'La lona detiene la siguiente lluvia. No es el techo terminado.',
    kind: 'roof',
    claim: true,
    craft:
      'Cuando llama por {name}, diga si el agua sigue entrando y si alguien está cerca de un plafón mojado o de cables mojados. {kind} Llegamos cuando el techo se puede subir con seguridad. El orden es fotos, una lona anclada, y después el plan del techo permanente y de lo que ya se mojó adentro.',
    sequence:
      'Una lona dejada como techo terminado no es el resultado. Si el jardín está bloqueado, deje un camino a la casa. El tráfico y el clima marcan la hora. Si hay que esperar una hora más segura para subir, se lo decimos.',
    visit: 'Fotografiamos la abertura y cubrimos cuando es seguro subir.',
    bullets: [
      'Fotos antes de cubrir',
      'Lona anclada, no suelta',
      'Plan del techo permanente después',
      'Aviso si el agua sigue entrando',
    ],
    faqs: [
      {
        q: '¿Hay que esperar al seguro para cubrir {name}?',
        a: 'No espere una decisión de cobertura para dejar entrar la siguiente lluvia. {kind}',
      },
      {
        q: '¿La lona se queda como techo?',
        a: 'No. En {name} es una cubierta temporal. El techo permanente es otro paso.',
      },
      {
        q: '¿Suben con cualquier clima?',
        a: 'Subimos cuando es seguro. Si la hora no lo es, se lo decimos.',
      },
      {
        q: '¿Ustedes deciden el pago del seguro?',
        a: claimSentence,
      },
    ],
  },
  {
    slug: 'siding',
    short: 'Siding',
    blurb: 'El siding se iguala a la pared que ya está.',
    kind: 'exterior',
    claim: true,
    craft:
      'En {name} el siding se ve de cerca: pudrición, el desteñido del sur y del oeste, y el remate de ventanas y esquinas. {kind} Decimos si un tramo se puede igualar o si la fachada hay que cambiarla. Si alguien revisa el color, esa respuesta hace falta antes de pedir tablas.',
    sequence:
      'Un parche y un perfil nuevo son pedidos distintos. Igualamos la pared que está, no una muestra del año en que se construyó la casa. El sur y el oeste reciben más sol y más lluvia.',
    visit: 'Vemos pudrición, color y el remate de ventanas y esquinas.',
    bullets: [
      'Igualado a la pared desteñida',
      'Sur y oeste revisados aparte',
      'Color confirmado si hay revisión',
      'Parche o fachada, dicho de cerca',
    ],
    faqs: [
      {
        q: '¿Un parche se iguala en {name}?',
        a: 'A veces. {kind} El sol ya cambió el color de la pared. Lo vemos de cerca.',
      },
      {
        q: '¿Quién revisa el color?',
        a: 'La ciudad, si el permiso lo pide, y la asociación cuando la dirección tiene una. Lo preguntamos antes de pedir tablas.',
      },
      {
        q: '¿El sur envejece igual que el norte?',
        a: 'No. En {name} el sur y el oeste reciben más sol y más lluvia.',
      },
      {
        q: '¿Ustedes deciden el pago del seguro?',
        a: claimSentence,
      },
    ],
  },
  {
    slug: 'patios-decks',
    short: 'Patios y decks',
    blurb: 'El agua tiene que salir de la pared.',
    kind: 'exterior',
    claim: false,
    craft:
      'En {name} un deck o un patio se mira desde la puerta, la pendiente del patio y cualquier apoyo que ya exista. {kind} La estructura blanda se cambia antes de poner la superficie nueva. El agua tiene que alejarse del muro. Barandales y escalones entran en un deck elevado, no como un extra después.',
    sequence:
      'Patio, deck y cubierta son estructuras distintas. Dígalo al llamar. Si la asociación revisa decks, cubiertas o cercas, lo decimos al principio para que el pedido espere esa respuesta y no un montón de madera.',
    visit: 'Vemos la puerta, la pendiente y los apoyos que ya están.',
    bullets: [
      'Agua alejada del muro',
      'Apoyos revisados antes de la superficie',
      'Patio, deck o cubierta, no los tres como si fueran uno',
      'Revisión de la asociación antes de pedir madera',
    ],
    faqs: [
      {
        q: '¿Un patio y un deck son el mismo trabajo en {name}?',
        a: 'No. {kind} Son estructuras distintas. Lo decimos al llamar.',
      },
      {
        q: '¿La asociación tiene que ver el deck?',
        a: 'Cuando la sección de {name} revisa decks, cubiertas o cercas, sí. El pedido espera esa respuesta.',
      },
      {
        q: '¿El agua puede quedarse contra la pared?',
        a: 'No. En {name} la pendiente y los apoyos forman parte del trabajo.',
      },
      {
        q: '¿Qué hay que medir?',
        a: 'El patio de esta dirección, no el del vecino. Llame al (713) 909-0034.',
      },
    ],
  },
  {
    slug: 'water-damage-restoration',
    short: 'Daño de agua',
    blurb: 'Secamos la estructura antes de cerrar el muro.',
    kind: 'water',
    claim: true,
    craft:
      'Llame por {name} en cuanto pueda hacerlo con seguridad. Aléjese de equipo eléctrico mojado. Diga si el agua sigue entrando y si vino de una línea, del techo o de afuera. {kind} Seguimos el agua más allá de la mancha, sacamos lo que está encharcado y secamos con ventiladores y deshumidificadores. La humedad de aquí no termina el trabajo sola.',
    sequence:
      'Reconstruir espera las lecturas. No cerramos muros mojados para que el cuarto se vea listo. Las fotos son suyas para compartir. Un secado no es una pintura el mismo día.',
    visit: 'Mapeamos más allá de la mancha y medimos antes de cerrar.',
    bullets: [
      'Mapa del agua más allá de la mancha',
      'Extracción de lo encharcado',
      'Ventiladores y deshumidificadores',
      'Cierre del muro solo cuando está seco',
    ],
    faqs: [
      {
        q: '¿El agua de afuera y una tubería son el mismo trabajo en {name}?',
        a: 'No. {kind} Los documentamos como eventos distintos.',
      },
      {
        q: '¿Se puede pintar el mismo día?',
        a: 'No. En {name} el muro se cierra cuando las lecturas dicen que está seco.',
      },
      {
        q: '¿Qué hay que hacer primero?',
        a: 'Cortar el agua si puede hacerlo con seguridad y alejarse de cables mojados. Después llame al (713) 909-0034.',
      },
      {
        q: '¿Ustedes deciden el pago del seguro?',
        a: claimSentence,
      },
    ],
  },
  {
    slug: 'insurance-claims',
    short: 'Reclamos de seguro',
    blurb: 'Documentamos el daño y el alcance con el ajustador.',
    kind: 'water',
    claim: true,
    craft:
      'En {name} documentamos el daño, nos vemos con su ajustador y trabajamos el alcance de la reparación con su aseguradora, como su contratista. {kind} No decidimos la cobertura ni el pago. Las fotos y las medidas son el expediente de la casa, no una promesa de lo que la póliza va a pagar.',
    sequence:
      'Agua de afuera, una tubería y un techo abierto se anotan como lo que pasó. Su aseguradora decide. Nosotros reparamos lo que usted contrata, cuando el alcance ya se puede construir.',
    visit: 'Fotografiamos el daño y preparamos el alcance de la reparación.',
    bullets: [
      'Fotos y medidas de esta casa',
      'Reunión con el ajustador',
      'Alcance de la reparación como su contratista',
      'La aseguradora decide la cobertura',
    ],
    faqs: [
      {
        q: '¿Trabajan para la aseguradora en {name}?',
        a: 'No. Trabajamos para quien nos contrata. {claim}',
      },
      {
        q: '¿Pueden prometer que la póliza pague?',
        a: 'No. {kind} Su aseguradora decide la cobertura y el pago.',
      },
      {
        q: '¿Qué llevan a la cita con el ajustador?',
        a: 'Fotos, medidas y el alcance de la reparación de esta casa en {name}.',
      },
      {
        q: '¿El agua de afuera y una tubería van en la misma nota?',
        a: 'No. En {name} se anotan como eventos distintos. Su aseguradora decide cómo los trata la póliza.',
      },
    ],
  },
  {
    slug: 'painting-drywall-repair',
    short: 'Pintura y drywall',
    blurb: 'El muro se cierra cuando ya está seco.',
    kind: 'interior',
    claim: false,
    craft:
      'En {name} un parche se empluma, se imprima y se pinta para que desaparezca, también en un muro con textura donde un borde duro se notaría. {kind} Si el muro se abrió por una fuga, confirmamos que esté seco antes de cerrarlo.',
    sequence:
      'Un parche chico se funde con el muro. Un cuarto que cambió suele pintarse completo para que el brillo coincida. Después de una cocina o un baño, la pintura cierra el trabajo cuando el drywall y la loseta ya terminaron.',
    visit: 'Vemos si es un parche o si el cuarto completo tiene que pintarse.',
    bullets: [
      'Parche emplumado en muro con textura',
      'Imprimación antes de la pintura',
      'Muro de una fuga cerrado solo en seco',
      'Brillo igualado con el cuarto',
    ],
    faqs: [
      {
        q: '¿Cierran un muro mojado en {name}?',
        a: 'No. {kind} Primero tiene que estar seco.',
      },
      {
        q: '¿Un parche se nota en un muro con textura?',
        a: 'Se nota si el borde queda duro. En {name} lo emplumamos para que la pintura tenga un solo plano.',
      },
      {
        q: '¿Hay que pintar todo el cuarto?',
        a: 'Cuando el brillo no va a coincidir con un parche, sí. Lo decimos en la visita.',
      },
      {
        q: '¿La pintura va con la cocina?',
        a: 'Sí, cuando el drywall ya está listo. Llame al (713) 909-0034.',
      },
    ],
  },
];

function fill(text: string, name: string, kind: string, service: string) {
  return text
    .replaceAll('{name}', name)
    .replaceAll('{kind}', kind)
    .replaceAll('{service}', service)
    .replaceAll('{claim}', claimSentence);
}

function pageTitle(trade: Trade, areaName: string, areaSlug: string) {
  const place = postalPlaceLabel(areaName, areaSlug);
  const candidates = [
    `${trade.short} en ${place}`,
    `${trade.short} en ${areaName}`,
    `${esServiceNames[trade.slug]} en ${areaName}`,
    `${trade.short}, ${areaName}`,
  ];
  const fit = candidates.find((candidate) => titleFits(candidate));
  if (!fit) throw new Error(`No Spanish title fits for ${trade.slug} in ${areaName}`);
  return fit;
}

function pageDescription(trade: Trade, areaName: string, areaSlug: string) {
  const tail = ' Llame al (713) 909-0034.';
  const place = postalPlaceLabel(areaName, areaSlug);
  const options = [
    `${trade.short} en ${place}. ${trade.blurb}${tail}`,
    `${trade.blurb} Para una casa en ${areaName}.${tail}`,
    `${trade.short} en ${areaName}. ${trade.blurb}${tail}`,
  ];
  const fit = options.find((item) => item.length <= 155);
  if (!fit) {
    throw new Error(
      `No Spanish description fits for ${trade.slug} in ${areaName}: ${options[0]?.length}`,
    );
  }
  return fit;
}

function nearbyFor(trade: Trade, areaSlug: string) {
  const profile = getAreaProfile(areaSlug);
  if (!profile) throw new Error(`Missing profile ${areaSlug}`);
  const preferred = profile.neighbors.filter((slug) => isSpanishCityArea(slug));
  const rest = spanishCityAreaSlugs.filter(
    (slug) => slug !== areaSlug && !preferred.includes(slug),
  );
  return [...preferred, ...rest].slice(0, 3).map((slug) => {
    const neighbor = getAreaProfile(slug);
    if (!neighbor) throw new Error(`Missing neighbor ${slug}`);
    return {
      href: `/es/${localLandingSlug(trade.slug, slug)}`,
      label: `${esServiceNames[trade.slug]} en ${neighbor.name}`,
      areaName: neighbor.name,
    };
  });
}

export const olderEsAreaSlugs = new Set([
  'houston',
  'westchase',
  'alief',
  'energy-corridor',
  'katy',
  'sugar-land',
  'bellaire',
  'memorial',
  'spring-branch',
  'the-heights',
  'river-oaks',
  'west-university',
  'galleria-area',
  'upper-kirby',
  'rice-village',
  'medical-center',
  'bunker-hill',
  'piney-point',
  'hunters-creek',
  'bear-creek',
  'cinco-ranch',
  'stafford',
  'richmond',
  'pearland',
  'clear-lake',
  'baytown',
  'galveston',
  'texas-city',
  'the-woodlands',
  'magnolia',
]);

function buildOne(trade: Trade, areaSlug: string): LocalLanding {
  const area = esAreaCopy[areaSlug];
  const profile = getAreaProfile(areaSlug);
  if (!area || !profile) throw new Error(`Missing Spanish area ${areaSlug}`);
  const name = profile.name;
  const kind = area.kind[trade.kind];
  const service = esServiceNames[trade.slug];
  const say = (text: string) => fill(text, name, kind, service);
  const miles = areaMiles(profile);
  const drive = `${name} queda a unas ${miles} millas ${area.direction}, en línea recta hasta ${profile.landmark}. El camino habitual es ${profile.roads}. ${area.route}`;
  const paragraphs = [
    `El trabajo de ${service.toLowerCase()} en ${name} sale de la casa que visitamos, no del nombre del lugar. ${area.housing}`,
    `${area.climate} ${kind}`,
    area.permits,
    say(trade.craft),
    say(trade.sequence),
    drive,
    area.more,
  ];
  // Older areas have shorter place notes. This visit sentence keeps each page
  // at the same depth as the cities that already had Spanish copy.
  if (olderEsAreaSlugs.has(areaSlug)) {
    paragraphs.push(
      `En ${name} el orden se escribe en la casa: la cimentación, el acceso desde la calle y el cuarto que se va a tocar. ${area.housesNote} El nombre del lugar no elige el material ni el oficio que va primero. Eso sale de la visita. El trabajo empieza cuando ese plan ya está escrito, con el detalle que una foto del anuncio no enseña.`,
    );
  }
  if (trade.claim) paragraphs.push(claimSentence);
  paragraphs.push(
    `Una nota sobre ${name}: la visita confirma la cimentación, el acceso y si alguna revisión aplica a esta dirección. ${area.housesNote} describe la zona y describe mal una sola casa. El plan se escribe después de ver la propiedad, incluido el detalle que no sale en una foto del anuncio. ${kind} Llame al (713) 909-0034 cuando quiera agendar ${service.toLowerCase()}.`,
  );
  const n = hashString(`${trade.slug}:${areaSlug}`);
  const faqs = trade.faqs.map((faq) => ({ q: say(faq.q), a: say(faq.a) }));
  const slug = localLandingSlug(trade.slug, areaSlug);
  return {
    slug,
    path: `/es/${slug}`,
    serviceSlug: trade.slug,
    areaSlug,
    areaName: name,
    title: pageTitle(trade, name, areaSlug),
    description: pageDescription(trade, name, areaSlug),
    lede: `${service} en ${postalPlaceLabel(name, areaSlug)}. ${area.housesNote} ${trade.blurb}`,
    paragraphs,
    notes: [
      { title: 'Las casas', body: area.housesNote },
      { title: 'El clima', body: area.climateNote },
      { title: 'En la visita', body: say(trade.visit) },
    ],
    faqs,
    nearby: nearbyFor(trade, areaSlug),
    photoShift: n % 11,
    layout: (n % 4) as 0 | 1 | 2 | 3,
    bullets: trade.bullets,
    facts: [
      { label: 'Condado', value: `${name} queda ${profile.county}.` },
      { label: 'Casas', value: area.housesNote },
      { label: 'Clima', value: area.climateNote },
      {
        label: 'Desde Houston',
        value: `Unas ${miles} millas ${area.direction}, hasta ${profile.landmark}. El camino habitual es ${profile.roads}.`,
      },
    ],
  };
}

export const esCityLandings: readonly LocalLanding[] = spanishCityAreaSlugs.flatMap((areaSlug) =>
  trades.map((trade) => buildOne(trade, areaSlug)),
);

const bySlug = new Map(esCityLandings.map((page) => [page.slug, page]));

function assertSpanish(pages: readonly LocalLanding[]) {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const ledes = new Set<string>();
  const openings = new Set<string>();
  const errors: string[] = [];
  const indexed = services.filter((service) => isCityIndexedService(service.slug));
  if (trades.length !== indexed.length) {
    errors.push(`Spanish trades ${trades.length} do not match ${indexed.length} city services`);
  }
  for (const page of pages) {
    if (!titleFits(page.title)) errors.push(`Title does not fit: ${page.title}`);
    if (titles.has(page.title)) errors.push(`Duplicate Spanish title: ${page.title}`);
    titles.add(page.title);
    if (page.description.length > 155) {
      errors.push(`Description ${page.description.length}: ${page.path}`);
    }
    if (descriptions.has(page.description)) errors.push(`Duplicate description: ${page.path}`);
    descriptions.add(page.description);
    if (ledes.has(page.lede)) errors.push(`Duplicate lede: ${page.path}`);
    ledes.add(page.lede);
    const opening = page.paragraphs[0] ?? '';
    if (openings.has(opening)) errors.push(`Duplicate opening: ${page.path}`);
    openings.add(opening);
    if (!page.paragraphs.some((paragraph) => paragraph.includes(page.areaName))) {
      errors.push(`City name missing: ${page.path}`);
    }
    const blob = [
      page.title,
      page.description,
      page.lede,
      ...page.paragraphs,
      ...page.notes.flatMap((note) => [note.title, note.body]),
      ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
      ...(page.bullets ?? []),
    ].join('\n');
    if (!blob.includes('nuestra oficina en el oeste de Houston (77082)')) {
      errors.push(`${page.path} is missing the office line`);
    }
    if (!blob.includes('(713) 909-0034')) errors.push(`${page.path} is missing the phone`);
    if (/estimado gratis/i.test(blob)) errors.push(`${page.path} says estimado gratis`);
    if (/\bInc\./.test(blob)) errors.push(`${page.path} says Inc.`);
    try {
      assertCopyAllowed(page.path, blob);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
    const words = wordCount([
      page.lede,
      ...page.paragraphs,
      ...page.notes.flatMap((note) => [note.title, note.body]),
      ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
    ]);
    if (words < 650) errors.push(`${page.path} is thin (${words} words)`);
  }
  if (errors.length > 0) {
    throw new Error(errors.slice(0, 20).join('\n'));
  }
}

assertSpanish(esCityLandings);

export function getEsCityLanding(slug: string) {
  return bySlug.get(slug);
}
