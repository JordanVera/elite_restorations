import { costGuides, type CostGuide } from '@/lib/cost-guides';
import { assertCopyAllowed } from '@/lib/copy-guards';
import { spanishServiceSlugs } from '@/lib/i18n';
import { parseLocalLandingSlug } from '@/lib/local-paths';
import { titleFits } from '@/lib/seo';

export type EsCostGuide = CostGuide & { englishPath: string };

const phone = '(713) 909-0034';
const office = 'nuestra oficina en el oeste de Houston (77082)';
const rangeLine = 'un rango para planear, no una cotización';

export const esCostGuides: readonly EsCostGuide[] = [
  {
    slug: 'kitchen-remodel-cost-houston',
    path: '/es/kitchen-remodel-cost-houston',
    englishPath: '/kitchen-remodel-cost-houston',
    title: 'Costo de remodelar cocina en Houston',
    description:
      'Rangos para planear una cocina en Houston: acabados, cambio de distribución o desarmar el cuarto. El precio final sale de un estimado en la casa.',
    lines: ['Costo de remodelar la cocina', 'en Houston.'],
    lede: 'El precio de una cocina en Houston es el cuarto que usted tiene, los materiales que elige y si la distribución tiene que moverse. Ese precio lo damos después de una visita, no con un promedio de toda la ciudad.',
    serviceSlug: 'kitchen-remodeling',
    serviceLabel: 'Remodelación de cocinas',
    factors: [
      {
        title: 'Tamaño',
        body: 'Una cocina de pasillo y un cuarto que se abre al resto de la casa no son la misma cantidad de gabinete, cubierta y piso. Los pies cuadrados son el comienzo. El número de tramos, la isla y los aparatos lo cambian desde ahí.',
      },
      {
        title: 'Materiales',
        body: 'Gabinetes pintados y una cubierta de cuarzo son un trabajo distinto de gabinetes a la medida y una piedra que pide más cuidado. Los herrajes, el backsplash y la luz van con esa elección.',
      },
      {
        title: 'Cambios de distribución',
        body: 'Dejar el fregadero y la estufa donde están es un trabajo más chico que mover un muro, un drenaje o el paso por el cuarto. Las casas viejas de Houston a menudo no están a escuadra, así que la distribución se mide antes de que alguien prometa que un muro se puede mover.',
      },
      {
        title: 'Permisos',
        body: 'Un cambio de acabados a menudo se queda dentro de la cocina que ya existe. Mover plomería, electricidad o estructura es cuando un permiso suele entrar al trabajo. Decimos cuál es después de ver el plano, no antes.',
      },
    ],
    ranges: [
      { label: 'Misma distribución, acabados nuevos', low: 25000, high: 55000 },
      { label: 'Cambio de distribución', low: 40000, high: 80000 },
      { label: 'Desarme completo', low: 70000, high: 135000 },
    ],
    faqs: [
      {
        q: '¿Por qué no hay un solo precio de cocina para Houston?',
        a: 'El cuarto, los gabinetes y las cubiertas, y si la distribución se mueve, son trabajos distintos. Los números de esta página son un rango para planear, no una cotización. El precio final sale de un estimado en la casa.',
      },
      {
        q: '¿Mover un muro cambia el costo?',
        a: 'Puede cambiarlo. La estructura, la plomería y la electricidad son trabajo de más, y también son el momento en que un permiso es más probable. Inspeccionamos antes de decir que un muro se puede mover.',
      },
      {
        q: '¿Cuándo hace falta un permiso para una cocina?',
        a: 'A menudo cuando cambian la plomería, la electricidad o la estructura. Un cambio de acabados que deja eso en su lugar puede no necesitarlo. Le decimos cuál es el caso del plano después de verlo.',
      },
      {
        q: '¿Cómo consigo un número para mi cocina?',
        a: `Llame al ${phone} o pida un estimado. La visita es la manera de asentar el trabajo y, después, el precio.`,
      },
      {
        q: '¿Por qué se enciman los rangos?',
        a: 'Porque un cambio de distribución chico y un cambio de acabados grande pueden costar parecido. Las etiquetas describen el tipo de trabajo, no un cajón fijo. Su cocina cae donde cae el trabajo.',
      },
      {
        q: '¿Una isla siempre significa el rango de cambio de distribución?',
        a: 'No. Una isla en la huella que usted ya tiene, con corriente y sin plomería nueva, puede quedarse en un cambio de acabados. Una isla que mueve el fregadero, un muro o el paso por el cuarto es un cambio de distribución.',
      },
      {
        q: '¿Estos rangos son solo de gabinetes?',
        a: 'No. Son un rango para planear, no una cotización, del trabajo que describen: acabados en la misma distribución, un cambio de distribución o un desarme. Los aparatos que usted compra, y un piso que sigue por el resto de la casa, pueden quedar fuera de la manera en que usted está leyendo el rango. El estimado los lista.',
      },
      {
        q: '¿Las casas viejas de Houston cuestan más de entrada?',
        a: 'No por el año en que se construyeron. Cuestan más cuando los muros no están a escuadra, el cableado está cansado o un drenaje tiene que moverse. Un cambio de acabados sencillo en un bungalow puede costar menos que desarmar una cocina grande y abierta en un suburbio más nuevo.',
      },
      {
        q: '¿Por qué los gabinetes pasan una cocina de Houston de un rango al siguiente?',
        a: 'Suelen ser la partida más grande, y la calidad de la caja importa con esta humedad. Una caja de línea en la misma huella y una caja a la medida con una despensa nueva no son el mismo alcance, aunque la piedra se vea parecida.',
      },
      {
        q: '¿Una cimentación de losa hace más cara la remodelación de la cocina?',
        a: 'Hace más caro mover el fregadero, porque el drenaje está en el concreto. Una remodelación de la misma distribución sobre losa no cae sola en el rango alto. Lo caro es la distribución, no el concreto por sí mismo.',
      },
      {
        q: '¿Los aparatos están incluidos en estos rangos?',
        a: 'Solo el trabajo de colocar los aparatos que forman parte del alcance que cotizamos. La compra de una estufa o un refrigerador nuevos a menudo es suya. Díganos los modelos antes de pedir los gabinetes, para que las aberturas coincidan.',
      },
      {
        q: '¿Una fuga puede convertir un cambio de acabados en un desarme?',
        a: 'Sí. Zoclos de gabinete hinchados, un piso blando y drywall mojado son demolición y secado, y después trabajo nuevo. Eso es otro trabajo, distinto de pintar cajas y cambiar una cubierta en una cocina seca. Dígalo cuando llame.',
      },
      {
        q: '¿Vivir en la casa durante la remodelación cambia el precio?',
        a: 'Puede cambiar el calendario más que los materiales. Cuidar un paso, un plan de fregadero temporal y trabajar con la familia todavía en la casa pide atención. Lo que más pesa son los gabinetes, la piedra y si la distribución se mueve. Cotizamos la manera en que van a vivir el proceso después de ver la cocina.',
      },
      {
        q: '¿Los aparatos entran en esos rangos para planear?',
        a: 'Los aparatos que usted compra no son el número de la construcción. Los paneles y un refrigerador empotrado sí. Los rangos de esta página son del trabajo descrito: acabados en la misma distribución, un cambio de distribución o un desarme. El estimado lista qué entra y qué queda fuera. No tome el número bajo como un precio cerrado.',
      },
      {
        q: '¿Cuánto agrega un permiso?',
        a: 'La cuota casi nunca es lo que pasa una cocina de un rango a otro. El tiempo, y el trabajo que el permiso obliga a mostrar, sí. Un cambio de acabados que deja la plomería y la estructura donde están a menudo se salta el permiso. Moverlas, por lo general, no. Nombramos la oficina a partir de la dirección.',
      },
      {
        q: '¿Por qué el material de la cubierta mueve tanto el número?',
        a: 'Gabinetes pintados y una cubierta de cuarzo sencilla están en otro lugar que las cajas a la medida y una piedra que pide más cuidado. El detalle del canto, un perfil grueso y una segunda losa para una isla larga son partidas reales. Medimos después de que los gabinetes están puestos, porque los muros de Houston casi nunca están a escuadra.',
      },
      {
        q: '¿Un fregadero de preparación en la isla es la parte cara?',
        a: 'Puede serlo, sobre losa. Cortar concreto para mover un drenaje es otro proyecto, distinto de una isla con corriente y sin agua. Dejar el fregadero donde está mantiene más cocinas en un rango más bajo, aunque la piedra sea nueva. Decimos cuál de los dos es su plano.',
      },
      {
        q: '¿Y si los gabinetes viejos están hinchados por una fuga?',
        a: 'La reparación va antes de la cocina nueva. Una base de fregadero blanda, o una capa mojada bajo el piso, cambia el número. Encontrarlo en la visita sale más barato que encontrarlo el día de la demolición, y de todos modos cambia el precio. Un reclamo de agua, si lo tiene, no es esta guía de costos. Su aseguradora decide ese pago.',
      },
      {
        q: '¿Tengo que estar en casa para el estimado?',
        a: `Sí. Tenemos que ver el cuarto, las puertas y cómo cocina. Una foto es un comienzo y no es un precio. Llame al ${phone}. La visita es la manera en que un rango se vuelve un número. El horario de la oficina para visitas agendadas es de lunes a sábado, de 8:00 AM a 6:00 PM.`,
      },
      {
        q: '¿Aparece una cuota de la asociación en una cocina?',
        a: 'Las cocinas de adentro casi nunca necesitan una revisión de la asociación. Si la necesitan, suele ser porque cambia una ventana o el exterior. Eso no es una partida que escondamos en los gabinetes. Lo de aquí es un rango para planear, no una cotización, y no es un deducible.',
      },
    ],
    sections: [
      {
        eyebrow: 'Cómo leer esto',
        heading: 'Tres trabajos, no un solo precio de Houston.',
        paragraphs: [
          'Un número de cocina que ignora el cuarto es ficción. Las tres filas de esta página son un rango para planear, no una cotización, de tres trabajos distintos. La misma distribución con acabados nuevos anda, por lo general, entre $25,000 y $55,000. Un cambio de distribución anda, por lo general, entre $40,000 y $80,000. Un desarme completo anda, por lo general, entre $70,000 y $135,000. Se enciman a propósito. Un cambio de distribución chico en un cuarto sencillo puede caer cerca de un cambio de acabados generoso. Desarmar un cuarto grande con gabinetes a la medida puede sentarse en lo alto de su rango, o pasarlo. El estimado después de una visita es el precio. Estos rangos son para planear antes de esa visita.',
          'El extremo bajo de cada rango supone una casa sencilla, acabados de línea y ninguna sorpresa en los muros. El extremo alto todavía no es el tope de una cocina muy grande o muy a la medida. River Oaks y un bungalow modesto no se cotizan por el nombre del vecindario. Se cotizan por el largo de gabinete, la piedra y si la plomería y la estructura se mueven. Traiga los rangos a la conversación. No tome el número bajo como un precio cerrado.',
        ],
      },
      {
        eyebrow: 'La casa',
        heading: 'Lo que una cocina de Houston le hace al presupuesto.',
        paragraphs: [
          'Las cocinas viejas dentro del Loop, sobre todo en The Heights, Bellaire y West University, suelen ser chicas, un poco chuecas y sobre pilotes. Una distribución nueva puede toparse con un muro que sostiene la casa, un cableado cansado y un drenaje que se puede desviar en el hueco de abajo. Ese hueco ayuda solo si se puede entrar y está seco. Si no, el acceso y la reparación pasan a ser parte de la cocina. Los planos abiertos más nuevos en Katy, Cinco Ranch y The Woodlands suelen ser losa. Mover el fregadero es cortar concreto. Dejar el fregadero donde está lo mantiene en un rango más bajo, aunque la isla, la piedra y las luces sean nuevas.',
          'La humedad se nota en la elección de gabinetes. Los gabinetes de triplay y un acabado que aguante un verano de Houston cuestan más que la caja de aglomerado más barata, y son los que todavía cierran en agosto. La piedra se mide después de poner los gabinetes, porque los muros casi nunca están a escuadra. Esa secuencia es tiempo, y el tiempo es dinero, y saltársela es la manera en que una cubierta se vuelve a cortar. Nada de esto es un cargo extra por “casa vieja”. Es el trabajo que la casa pide.',
        ],
        points: [
          {
            title: 'Deje el drenaje',
            body: 'La distribución más barata es la que la plomería ya tiene. Una isla nueva con corriente, pero sin fregadero, se queda más simple que una isla con un fregadero de preparación cortado en la losa.',
          },
          {
            title: 'Largo de gabinete',
            body: 'Una cocina angosta con dos muros de gabinetes es menos gabinete y menos piedra que una cocina abierta a la sala familiar, con una isla larga. Los pies cuadrados del cuarto predicen poco. El largo de gabinete predice mejor.',
          },
          {
            title: 'Lo que está blando',
            body: 'Una base de fregadero hinchada, o una capa mojada bajo el piso, es reparación antes de la cocina nueva. Encontrarlo en la visita sale más barato que encontrarlo el día de la demolición, y de todos modos cambia el número.',
          },
        ],
      },
      {
        eyebrow: 'Acabados',
        heading: 'Dónde se mueve de verdad la cuenta de materiales.',
        paragraphs: [
          'Gabinetes shaker pintados y una cubierta de cuarzo sencilla son la mitad del rango de acabados en muchas cocinas de Houston. Cajas a la medida, una isla estilo mueble, un canto de piedra grueso o un mármol que usted esté dispuesto a cuidar suben la misma distribución. Los aparatos que se queda no entran en el número de la construcción. Los paneles y un refrigerador empotrado sí. El backsplash puede ser unos miles de dólares, o casi otro presupuesto, si es piedra de piso a techo. La luz es fácil de olvidar y se ve todas las noches. La luz bajo el gabinete, una capa general y los colgantes son tres partidas, no un solo accesorio.',
          'Un piso que se detiene en la puerta de la cocina cuesta menos que un piso que sigue por el pasillo y la sala para que los niveles coincidan. Ese tramo a menudo es el trabajo correcto, y no es “la cocina” en una conversación de pasada. Lo separamos para que usted lo vea. Los herrajes, el ducto de la campana hacia afuera y un cambio chico en una ventana son el mismo tipo de partida. Son reales. No son lo que convierte un desarme de $70,000 en un cambio de acabados de $40,000. Eso lo hacen la distribución y los gabinetes.',
        ],
      },
      {
        eyebrow: 'Permisos y calendario',
        heading: 'Los costos que no están en la lista de materiales.',
        paragraphs: [
          'Un cambio de acabados que deja la plomería, la electricidad y la estructura en su lugar a menudo no necesita permiso de construcción. Mover cualquiera de esas cosas, por lo general, sí. El mostrador no siempre es la ciudad de Houston. Bellaire y West University Place tienen sus propios departamentos. Una dirección de Katy puede ser la ciudad, el condado de Harris o el condado de Fort Bend. The Woodlands no es una ciudad. Los permisos ahí suelen ser del condado de Montgomery o del condado de Harris. La cuota en sí casi nunca es lo que revienta un presupuesto. El tiempo, y el trabajo que el permiso le pide mostrar, sí.',
          'Parte del trabajo se queda sin fregadero. La piedra de pedido especial y los gabinetes a la medida tardan más que el cuarzo de línea y las cajas que ya están en existencia. No inventamos un número de semanas en esta página, porque los plazos se mueven. El orden, incluido el tramo en que no hay fregadero, va en el estimado. Una cocina planeada no es un proyecto de seguro. Si el cuarto está abierto por una fuga, el secado y las fotos van antes de los gabinetes, y el pago del reclamo no es esta lista de precios. Llame al (713) 909-0034 o pida un estimado. La visita es la manera en que un rango se vuelve un número.',
          'Use los tres rangos para decidir en qué conversación está de verdad antes de juntar muestras. Un cambio de acabados, un fregadero que se mueve y un desarme son cuadrillas distintas y meses distintos de su casa. Las muestras sirven después de eso, no antes. El estimado sigue siendo el único número que va en un contrato.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Tres rangos, tres cocinas distintas',
        paragraphs: [
          'Las filas de esta página son un rango para planear, no una cotización, para el Gran Houston. No son un menú del que se pide. Un cambio de acabados en la misma distribución deja el fregadero y la estufa donde están y cambia los gabinetes, la cubierta y los acabados de alrededor. Un cambio de distribución mueve un drenaje, un muro o el paso por el cuarto. Un desarme completo baja más el cuarto: más del yeso o del drywall, más del piso y, por lo general, más del trabajo mecánico.',
          'Una cocina de pasillo en West University puede caer en el rango de desarme si sale el muro hacia el comedor y se mueve la plomería. Una cocina grande de Katy puede caer en el rango de acabados si la isla, el fregadero y los aparatos se quedan y usted está cambiando cajas y piedra. Los pies cuadrados son el comienzo. El número de tramos de gabinete, y si la distribución se mueve, es lo que elige la fila.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Los gabinetes marcan la escala',
        paragraphs: [
          'En la mayoría de las cocinas de Houston los gabinetes son la partida más grande. Las cajas de línea, semi a la medida y a la medida son distintas cantidades de dinero y distintas cantidades de lo que se puede cambiar: la altura, la profundidad y los rellenos que pide un cuarto que no está a escuadra. El estilo de la puerta es la parte que se nota. La caja es la parte que se encuentra con una fuga del lavavajillas. El triplay aguanta un salpicón mejor que el aglomerado, y esa es una pregunta práctica en una cocina húmeda, no una etiqueta de lujo.',
          'Los herrajes, el cierre suave o no, y los accesorios de adentro son chicos al lado de las cajas y fáciles de dejar cortos en el presupuesto. Si los gabinetes de arriba van a subir, o si se agrega una despensa donde había un clóset, dígalo antes del pedido. Cambiar una caja después de que está hecha es otro precio, distinto de elegirla en el papel.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Piedra, loseta y el piso',
        paragraphs: [
          'El cuarzo y el granito de una cocina típica se sientan en un rango propio, y el mármol o una isla con la piedra que cae por el costado se sientan más arriba. La plantilla se toma después de que los gabinetes están a nivel. En una cocina de The Heights, Bellaire o West University, que casi nunca está a escuadra, esa plantilla es lo que usted está pagando tanto como la losa. Las uniones, el corte del fregadero y un volado donde la gente se va a sentar son fabricación, no un número por pie sacado de un retazo.',
          'El backsplash y el piso viajan con la cocina si están en el alcance. Un campo recto de porcelanato es otro día, distinto de una espiga en un muro corto. Un piso nuevo de madera o de loseta que tiene que encontrarse con el pasillo es parte del precio de la cocina cuando ya estamos en el cuarto, y es un proyecto de piso aparte cuando sigue por el resto de la casa. Mantenga esos alcances separados para que el rango de la cocina no esté escondiendo un piso de toda la casa.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Casas de losa y bungalows viejos',
        paragraphs: [
          'La mayoría de las cocinas en Katy, Cinco Ranch y The Woodlands están sobre una losa de concreto. Mover el fregadero es cortar esa losa y desviar el drenaje. Dejar el fregadero quieto es la distribución más barata, aunque todo lo demás sea nuevo. Una fuga bajo el lavavajillas en una losa se mete a las bases de los gabinetes. Si eso ya pasó, secar y cambiar las cajas hinchadas es parte del trabajo, y no está incluido en un rango de acabados que supuso gabinetes secos.',
          'Muchos bungalows viejos de The Heights están sobre pilotes. El piso puede no estar a nivel, y la plomería puede alcanzarse desde el hueco en lugar de desde un corte de sierra. Eso puede hacer más simple mover un fregadero, y puede hacer más difíciles los gabinetes, porque las cajas tienen que seguirse a un piso y unos muros que no están a escuadra. Medimos antes de decirle en qué rango cae el plano.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Permisos, los suburbios y las asociaciones',
        paragraphs: [
          'Dentro de la ciudad de Houston, un permiso en general es parte del trabajo cuando cambian la plomería, la electricidad o la estructura. Un cambio de acabados que deja eso en su lugar a menudo no. Bellaire, West University, Sugar Land y el condado de Harris o de Montgomery sin incorporar son otros mostradores. Una dirección postal que dice Katy no siempre es la ciudad de Katy. Nombramos la autoridad después de ver la dirección, y la ciudad o el condado es quien decide.',
          'Una cocina de adentro casi nunca es una revisión de la asociación. Una cocina exterior, una ventana que se ve desde la calle o un cambio en la fachada sí pueden serlo. Las comunidades planeadas, como Cinco Ranch y The Woodlands, revisan el trabajo de afuera aunque no haga falta un permiso de la ciudad. Si su plano es solo adentro de la casa, no presupueste un mes para un comité de arquitectura. Si no es solo adentro, sí.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Qué está cotizando la visita',
        paragraphs: [
          'Caminamos el cuarto, lo medimos y miramos el muro mojado, el piso y cualquier muro que usted quiera abrir. El número que recibe es de ese alcance. No es una revisión del rango de esta página, y el rango no es una oferta a la que nos pueda atar. Si la demolición después enseña pudrición, una fuga anterior o un cableado que no puede servir a los aparatos nuevos, paramos y se lo enseñamos antes de que el trabajo crezca.',
          'Llame al (713) 909-0034 o pida un estimado. Empresa familiar en Houston desde 1993. Trabajamos desde nuestra oficina en el oeste de Houston (77082). Lo que sirve de preparación es una lista de lo que tiene que quedarse y de lo que usted está dispuesto a mover. Los números de modelo de los aparatos ayudan si ya los compró.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Lo que estos rangos dejan fuera',
        paragraphs: [
          'No incluyen un piso de toda la casa, un techo nuevo ni un cambio de exterior que la asociación tenga que aprobar. No incluyen los aparatos que usted compra. No incluyen una reparación de estructura que no hemos visto, como un contrapiso blando bajo el lavavajillas o un muro de carga que necesita una viga. Esos son costos reales. Se cotizan cuando son reales, y por eso esto es un rango para planear, no una cotización.',
          'Tampoco incluyen una fecha de término ni una promesa de que un muro se puede mover. La visita es donde eso se contesta para la cocina que usted tiene.',
        ],
      },
    ],
    related: [
      { href: '/es/kitchen-remodeling', label: 'Remodelación de cocinas de Houston' },
      { href: '/es/kitchen-remodeling-houston-tx', label: 'Remodelación de cocinas en Houston' },
      { href: '/es/kitchen-remodeling-the-heights-tx', label: 'Remodelación de cocinas en The Heights' },
      { href: '/es/kitchen-remodeling-katy-tx', label: 'Remodelación de cocinas en Katy' },
      {
        href: '/es/kitchen-remodeling-the-woodlands-tx',
        label: 'Remodelación de cocinas en The Woodlands',
      },
      {
        href: '/kitchen-remodel-case-study',
        label: 'Una remodelación de cocina, en palabras del cliente',
      },
    ],
  },
  {
    slug: 'bathroom-remodel-cost-houston',
    path: '/es/bathroom-remodel-cost-houston',
    englishPath: '/bathroom-remodel-cost-houston',
    title: 'Costo de remodelar el baño en Houston',
    description:
      'Rangos para planear un baño en Houston, desde un cambio de acabados hasta mover la plomería. El precio final sale de un estimado en la casa.',
    lines: ['Costo de remodelar el baño', 'en Houston.'],
    lede: 'Refrescar un medio baño y un baño principal que mueve la regadera no son el mismo precio. La diferencia es el cuarto, los acabados y si la plomería se queda quieta.',
    serviceSlug: 'bathroom-remodeling',
    serviceLabel: 'Remodelación de baños',
    factors: [
      {
        title: 'Tamaño',
        body: 'Un medio baño chico y un baño principal son distintas cantidades de loseta, vidrio y mueble. Los pies cuadrados importan menos que lo que el cuarto tiene que hacer.',
      },
      {
        title: 'Materiales',
        body: 'Un mueble de lavabo, un espejo y una luz nuevos son un trabajo distinto de una regadera de loseta completa, una tina y una piedra que tiene que impermeabilizarse detrás del acabado que usted ve.',
      },
      {
        title: 'Cambios de distribución',
        body: 'Dejar el drenaje donde está cuesta menos que mover la regadera, la tina o el mueble. En las casas viejas, la plomería y la estructura deciden qué se puede mover. Eso lo revisamos antes de prometer una distribución nueva.',
      },
      {
        title: 'Permisos',
        body: 'Cambiar una llave en el mismo lugar no es lo mismo que reubicar un drenaje. Los cambios de plomería son cuando un permiso suele aparecer. Lo decimos cuando el plano ya es real.',
      },
    ],
    ranges: [
      { label: 'Mueble y acabados nuevos', low: 6000, high: 15000 },
      { label: 'Regadera nueva, misma distribución', low: 12000, high: 25000 },
      { label: 'Remodelación completa con plomería que se mueve', low: 30000, high: 65000 },
    ],
    faqs: [
      {
        q: '¿Por qué dos remodelaciones de baño pueden costar tan distinto?',
        a: 'Un mueble nuevo en el mismo lugar no es una regadera nueva en un lugar nuevo. La loseta, el vidrio, la impermeabilización y la plomería que se movió son las razones habituales de que el trabajo crezca.',
      },
      {
        q: '¿La impermeabilización es parte del precio?',
        a: 'Sí, cuando la regadera es parte del trabajo. La impermeabilización va antes de la loseta de acabado. Es parte de ese trabajo, no un paso que se pueda saltar y conservar el mismo resultado.',
      },
      {
        q: '¿Las remodelaciones de baño necesitan permiso en Houston?',
        a: 'A menudo cuando la plomería se mueve. Un cambio que deja los drenajes y la electricidad en su lugar puede no necesitarlo. Le decimos cuál aplica después de ver el baño.',
      },
      {
        q: '¿Cómo consigo un precio?',
        a: `Llame al ${phone} o pida un estimado. Vemos el baño que usted tiene y cotizamos ese trabajo.`,
      },
      {
        q: '¿Por qué rehacer la regadera cuesta más que un mueble nuevo?',
        a: 'La regadera es impermeabilización, una charola con pendiente, una válvula, loseta y vidrio. Refrescar el mueble es carpintería, una cubierta y luz en la misma huella. No son versiones del mismo proyecto.',
      },
      {
        q: '¿Un vidrio sin bordillo cuesta lo mismo que remodelar una tina?',
        a: 'Por lo general, no. Sin bordillo quiere decir que el piso puede caer hacia un drenaje, y sobre losa eso es una pregunta de estructura y de plomería. Una tina que se queda, con loseta nueva alrededor, es un muro mojado más chico. Cotizamos el que el cuarto de verdad puede hacer.',
      },
      {
        q: '¿Los accesorios están incluidos en los rangos?',
        a: 'Los rangos describen el trabajo de construcción. Una válvula de pedido especial, un vidrio sin marco o una piedra que usted ya eligió pueden mover la cuenta de materiales. El estimado nombra qué está incluido. Esos números son un rango para planear, no una cotización, y no son un paquete de accesorios.',
      },
      {
        q: '¿Dos baños pueden compartir un solo rango de presupuesto?',
        a: 'Solo si los suma. Un medio baño y un baño principal son dos cuartos. Hacerlos juntos ahorra algunos viajes. Eso no quita el costo de la segunda regadera. Cotizamos cada muro de regadera.',
      },
      {
        q: '¿Por qué la regadera tiene su propio rango?',
        a: 'Porque la impermeabilización, la loseta y el vidrio son un conjunto completo aunque el drenaje se quede quieto. Un mueble nuevo en la misma huella no incluye ese muro. Tratarlos como una sola “remodelación de baño” es la manera en que el número se siente arbitrario.',
      },
      {
        q: '¿El vidrio sin marco cambia el precio?',
        a: 'Puede cambiarlo. El vidrio en sí cuesta más que una puerta con marco, y el muro tiene que estar lo bastante plano para recibirlo. Si el muro que existe está fuera de plano, la preparación es parte del alcance, no una sorpresa el día de la entrega.',
      },
      {
        q: '¿Los muebles de plomería están incluidos?',
        a: 'La válvula, el terminado y la colocación del mueble que usted elige se definen en la visita. Una tina especial que usted compra no es la misma partida que la mano de obra para colocarla. Díganos qué ya compró.',
      },
      {
        q: '¿Y si el muro detrás de la loseta ya está blando?',
        a: 'Entonces el trabajo es una reparación y una remodelación. El panel blando sale, la cavidad se seca y la regadera nueva se construye sobre un muro sano. Eso queda fuera de un cambio de acabados que supuso que el muro existente se podía quedar.',
      },
      {
        q: '¿Mover el inodoro en una losa cambia el precio?',
        a: 'Sí. Sobre losa, un drenaje que se mueve es cortar concreto. Dejar el inodoro, el drenaje de la regadera y la alimentación del mueble donde están es la manera en que un baño se queda en un rango más bajo. En el momento en que eso se mueve, usted está en otro proyecto. Inspeccionamos antes de decir que un drenaje se puede mover.',
      },
      {
        q: '¿Por qué una ventana en la regadera cuesta de más?',
        a: 'Tiene que construirse dentro de la impermeabilización, o quitarse. Los baños viejos de Houston a menudo tienen esa ventana. Es parte del precio de la regadera, no una sorpresa después de la loseta. Saltársela no produce la misma regadera.',
      },
      {
        q: '¿Puedo usar el otro baño, y eso afecta el costo?',
        a: 'Si tiene un segundo baño, el trabajo es más sencillo de vivir. Una casa con un solo inodoro necesita un plan más corto y más cuidado con los días en que el agua está cerrada. Eso es calendario y protección, no un segundo presupuesto de loseta. Decimos cuál casa es la suya.',
      },
      {
        q: '¿Convertir una tina en regadera es el rango de rehacer la regadera?',
        a: 'A menudo, cuando el drenaje se queda quieto. Mover el drenaje, agregar un segundo muro mojado o construir una abertura sin bordillo puede subirlo. El vidrio es parte del número de la regadera. Una cortina en la tina vieja no es el mismo proyecto. La visita lo ubica.',
      },
      {
        q: '¿Y si ya hay una fuga bajo la loseta?',
        a: 'Entonces el secado y la tabla podrida van antes del baño nuevo. Esa reparación no va incluida dentro de un cambio de acabados. Preferimos encontrarla en la visita que el día de la demolición. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No somos ajustadores públicos. Su aseguradora decide el pago. Esta página es el precio de la construcción.',
      },
      {
        q: '¿El cancel de vidrio cabe dentro del rango?',
        a: 'Rehacer la regadera incluye el vidrio que le pertenece a esa regadera. Un panel especial pesado, o un segundo cuarto mojado en la misma casa, pueden subir el proyecto. Pregunte qué hay detrás de la loseta y qué es el vidrio antes de comparar dos números.',
      },
      {
        q: '¿Tengo que estar en casa para conseguir un precio del baño?',
        a: `Sí. El drenaje, la ventana y el cielo de abajo no se ven en un mensaje. Llame al ${phone}. Cotizamos después de una visita. Los números de esta página son un rango para planear, no una cotización.`,
      },
      {
        q: '¿Una remodelación de baño agarra una cuota de asociación o de permiso que revienta el presupuesto?',
        a: 'La cuota del permiso es chica al lado de la plomería. Una asociación casi nunca revisa la loseta de adentro. Una ventana que da a la calle puede ser la excepción. Reubicar un drenaje es cuando el permiso suele aparecer. Nombramos la oficina a partir de la dirección.',
      },
    ],
    sections: [
      {
        eyebrow: 'Cómo leer esto',
        heading: 'El drenaje decide más que la loseta.',
        paragraphs: [
          'Los precios de baño en Houston se separan en la plomería, no en el color de la pintura. Un mueble y un cambio de acabados en la misma distribución andan, por lo general, entre $6,000 y $15,000. Rehacer una regadera que conserva el drenaje anda, por lo general, entre $12,000 y $25,000. Una remodelación completa que mueve la plomería anda, por lo general, entre $30,000 y $65,000. Un medio baño y un baño principal no se intercambian dentro de esas palabras. El vidrio, la piedra y un segundo muro mojado en la misma casa pueden subir un proyecto. La visita lo ubica.',
          'La impermeabilización va dentro del número de la regadera. No es una manera de bajar de lo alto de un rango a lo bajo. Saltársela no produce la misma regadera. Si el precio más bajo de alguien es la misma foto de loseta, sin una capa impermeable y una charola con pendiente, es otro trabajo. Pregunte qué hay detrás de la loseta antes de comparar los dos números. Lo de esta página es un rango para planear, no una cotización.',
        ],
      },
      {
        eyebrow: 'La casa',
        heading: 'Losa, hueco y una ventana en la regadera.',
        paragraphs: [
          'Sobre losa, típica de las casas más nuevas de Katy, Memorial, Sugar Land y The Woodlands, el drenaje de la regadera está en el concreto. Moverlo es cortar la losa, parcharla y construir la charola sobre esa reparación. En una casa de pilotes, más común en los bungalows viejos de The Heights, el drenaje a menudo está en el hueco. Sigue siendo plomería. No es una sierra de concreto. Esa diferencia sola puede subir un baño del rango de en medio hacia el de arriba, o mantener una regadera nueva en el de en medio porque el drenaje se quedó quieto.',
          'Una ventana en el muro de la regadera, común en los baños viejos, tiene que construirse dentro de la impermeabilización o quitarse. Un cielo de abajo que ya está manchado quiere decir que el baño y el cuarto de abajo pueden ser una sola reparación. La humedad de Houston es la razón de que el ventilador tenga que salir al exterior y de que un muro esté seco antes de cerrarse. Eso es parte del trabajo. Pertenece al precio.',
        ],
        points: [
          {
            title: 'La misma huella',
            body: 'Loseta nueva, una válvula nueva y vidrio nuevo sobre el drenaje viejo son el rango de rehacer la regadera. En el momento en que se mueve el drenaje, el inodoro o la alimentación del mueble, usted está en otro proyecto.',
          },
          {
            title: 'Un baño o dos',
            body: 'Un baño de pasillo que se usa durante la remodelación cambia el orden del trabajo. Eso no quita el costo del muro mojado. Dos regaderas son dos conjuntos.',
          },
          {
            title: 'Lo que encuentra la demolición',
            body: 'Un panel blando y una fuga de mucho tiempo agregan reparación. Lo miramos en la visita. Si el muro está peor cuando se abre, paramos antes de que el número crezca en silencio.',
          },
        ],
      },
      {
        eyebrow: 'Acabados',
        heading: 'La loseta, el vidrio y el mueble son el dinero que se ve.',
        paragraphs: [
          'Un muro sencillo de porcelanato y una puerta con marco son otra cuenta de materiales, distinta de losas de piedra combinadas y vidrio sin marco. La loseta grande necesita un muro más plano, y eso es mano de obra antes de que aparezca cualquier lujo. El mosaico en el piso de la regadera es más lento que una charola que cae hacia un lado, a un drenaje largo, y ese drenaje es su propia pieza. Un nicho, una banca y un bordillo, frente a una entrada sin bordillo, cambian la impermeabilización. Una regadera sin bordillo sobre losa solo es real si el piso puede caer hacia un drenaje. Si no puede, cotizamos la regadera que el piso de verdad puede hacer.',
          'El mueble, la cubierta, el espejo y la luz son un solo muro. Un mueble de lavabo con patas y una cubierta de piedra suben un cambio de acabados hacia lo alto de su rango sin mover un solo drenaje. Eso todavía no es una remodelación completa. Conservar una tina y volver a poner la loseta del alrededor es menos que quitar la tina y construir una regadera, aunque la muestra de loseta sea la misma. Compare el trabajo. La muestra no es el trabajo.',
        ],
      },
      {
        eyebrow: 'Calendario',
        heading: 'Lo que valen los días sin baño.',
        paragraphs: [
          'Un medio baño que se puede cerrar es otro proyecto, distinto del único baño de la casa. El precio de la construcción no incluye un hotel, y no vamos a fingir que sí. Sí incluye el orden: cuántos días está cerrada el agua, si una tina puede seguir en uso mientras se rehace una regadera, y si el baño de pasillo tiene que terminarse antes de abrir el principal. Ese orden es la razón de que dos baños no sean el doble de un baño de una manera simple. Comparten viajes, y de todos modos no se pueden demoler los dos si usted no tiene dónde bañarse.',
          'El plazo de los materiales se sienta en la misma conversación. Un mueble de línea y un porcelanato que ya está en existencia pueden empezar antes que una cubierta de piedra y un vidrio sin marco, que se miden después de que los muros son reales. Los plazos se mueven, así que esta página no imprime un número de semanas. El estimado sí, junto al rango en el que el trabajo de verdad cae. Si usted está eligiendo entre rehacer la regadera sobre el mismo drenaje y una distribución que corta la losa, el calendario es parte del precio aunque la mano de obra sea la partida que nota primero.',
        ],
      },
      {
        eyebrow: 'Permisos',
        heading: 'Cuándo aparece el permiso, y cuándo no.',
        paragraphs: [
          'Cambiar una llave y un mueble en el mismo lugar a menudo no necesita permiso de construcción. Reubicar un drenaje o agregar un circuito, por lo general, sí. La ciudad de Houston, Bellaire, West University Place, Sugar Land, Pearland y el condado en un lote de Katy o de The Woodlands no son un solo mostrador. Nombramos la oficina a partir de la dirección. La cuota del permiso es chica al lado de la plomería. La inspección es lo que mantiene honestos el drenaje y el muro mojado.',
          'Un baño planeado no es un reclamo de seguro. Un baño abierto porque falló una válvula o una línea de alimentación empieza con secado y fotos, y el precio de reconstruir sigue siendo construcción. Su aseguradora decide qué se paga. Esos números pueden ser distintos. Llame al (713) 909-0034 para un estimado. Vemos el baño que usted tiene, incluido lo que hay debajo, y cotizamos eso.',
          'Traiga los tres rangos a la visita y diga en cuál cree que está. Si el drenaje tiene que moverse, o si el único baño va a quedar fuera de servicio, ese es el dato que cambia el calendario tanto como el precio. Preferimos nombrarlo en el estimado que descubrirlo después de la demolición. Somos una empresa familiar desde 1993.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Un medio baño y un baño principal no son un solo precio',
        paragraphs: [
          'Los tres rangos separan un cambio de acabados, una regadera rehecha en el mismo lugar y una remodelación que mueve la plomería. Cambiar el mueble, el espejo y la luz en un medio baño de West University es el trabajo chico. Un baño principal en Memorial o The Woodlands que mueve la regadera, cambia la loseta del cuarto y cambia el vidrio es el grande. Los pies cuadrados del cuarto importan menos que el muro mojado.',
          'La gente compara baños por el mueble que quiere. El costo suele estar en el muro detrás de ese mueble: la membrana, el lecho de mortero, la válvula y si el drenaje se queda. Una tina exenta en la misma huella no es el mismo número que una regadera sin bordillo en un lugar nuevo. Cada fila es un rango para planear, no una cotización.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'La regadera es el cuarto caro dentro del cuarto',
        paragraphs: [
          'Rehacer una regadera en la misma distribución es su propio rango porque la impermeabilización, la loseta y el vidrio son un conjunto completo. La membrana no es opcional si usted quiere que el muro sobreviva la humedad de Houston. Se detalla en la válvula, el nicho y el bordillo antes de que vaya la loseta de acabado. Saltársela no mantiene el trabajo en el rango más bajo. Crea una reparación posterior.',
          'La loseta de formato grande y un patrón pesado tardan más y necesitan un muro más plano. El vidrio sin marco necesita un muro que esté en plano. Una banca o un nicho se construyen con la impermeabilización, no se agregan después de la loseta. Esas son las elecciones que suben una regadera de la misma distribución hacia lo alto de su rango.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Mover un drenaje en una losa',
        paragraphs: [
          'Los baños más nuevos en Katy, Cinco Ranch y The Woodlands suelen sentarse sobre losa. El drenaje de la regadera está en el concreto. Rehacer la regadera donde está evita un corte de sierra. Deslizarla, o convertir una tina en regadera en otro muro, es concreto, un sifón nuevo y una conversación de permiso. Por eso el tercer rango empieza donde empieza.',
          'Muchos bungalows viejos de The Heights están sobre pilotes. El drenaje puede alcanzarse desde el hueco, y el piso puede necesitar reforzarse o nivelarse antes de que una loseta grande quede plana. Un movimiento puede ser más simple que sobre losa, y la preparación del piso puede ser más difícil. No le ponemos el precio de “mover la losa” a una casa que no tiene losa. La visita dice qué cimentación tiene.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Loseta, piedra y el mueble',
        paragraphs: [
          'El porcelanato es el campo práctico de la zona mojada. El mármol y otra piedra son una decisión de cuidado, sobre todo en el piso de la regadera, y cuestan más de comprar y de colocar. Un mueble de línea y un mueble de lavabo con patas son distinta carpintería. El espejo y las lámparas de muro se planean con ese muro, para que un medio baño chico no se vuelva un montón de compras sueltas que no caben.',
          'Si el baño está abierto porque ya había agua detrás de la loseta, secar la cavidad es parte del trabajo y no cabe en un rango de cambio de acabados. Loseta nueva sobre madera que sigue húmeda no dura. Medimos la humedad antes de cerrar. Ese hallazgo puede convertir un cambio de acabados planeado en una reconstrucción.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Permisos en Houston y en las ciudades chicas',
        paragraphs: [
          'Un mueble en el mismo lugar, con el mismo drenaje, a menudo no necesita permiso. Reubicar la regadera o agregar un circuito, por lo general, sí. La ciudad de Houston no es la oficina de permisos de Bellaire ni de West University, aunque los vecindarios compartan una calle. Las zonas sin incorporar pasan por el condado. Le decimos cuál es el caso del plano después de verlo.',
          'El trabajo de baño por dentro casi nunca es una revisión de la asociación. Una ventana, una puerta exterior o un cambio que se ve desde la calle sí pueden serlo, incluso en Cinco Ranch y The Woodlands. No suponga que una comunidad planeada tiene una opinión sobre su loseta. Sí suponga que puede tener una opinión sobre el exterior de la casa.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Cómo usar el rango antes de llamar',
        paragraphs: [
          'Elija la fila que coincide con la distribución, no la fila que coincide con una foto que guardó. Si no sabe si el drenaje se puede mover, suponga la regadera de la misma distribución hasta que miremos. Traiga la loseta o el mueble que de verdad le interesa, o solo el uso del cuarto: quién lo usa, si la tina se quiere y si el giro de la puerta ya es un problema.',
          'El precio sale del baño que usted tiene. Llame al (713) 909-0034. Estos rangos no van a ser la factura. Están aquí para que un movimiento completo de plomería no lo sorprenda como si fuera una llave nueva. Empresa familiar desde 1993. Salimos de nuestra oficina en el oeste de Houston (77082).',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Ventiladores, vidrio y el baño viejo y chico',
        paragraphs: [
          'La humedad es un costo aunque la loseta sea simple. Un ventilador que no saca el aire, una ventana que no abre y un emboquillado que nunca fue para una regadera de todos los días aparecen como pintura que se despelleja un año después. Poner un extractor de verdad en el plano es una partida chica al lado de rehacer la regadera, y una parte grande de si el cuarto se mantiene sano. Lo hablamos en la visita porque sale más barato dentro del alcance que como una llamada de regreso.',
          'Un baño apretado en Bellaire, The Heights o West University gasta el dinero en la distribución, no en los pies cuadrados. El giro de la puerta, la altura del cielo y un ducto que no se va a mover pueden descartar una regadera sin bordillo o un mueble doble. Descubrirlo en la casa es lo que mantiene el proyecto en el rango que coincide con el cuarto, en lugar de en un rango copiado de un baño principal más grande de Memorial.',
          'El vidrio, un nicho a la medida y una banca son elecciones de acabado dentro del rango de la regadera. No son, por sí solos, una razón para brincar al rango de mover la plomería. El brinco ocurre cuando el drenaje se mueve o el muro se abre hacia la estructura. Si usted está eligiendo entre una regadera mejor en su lugar y una regadera en un muro nuevo, esas son las dos filas. La visita le dice cuál permite la casa.',
        ],
      },
    ],
    related: [
      { href: '/es/bathroom-remodeling', label: 'Remodelación de baños de Houston' },
      { href: '/es/bathroom-remodeling-houston-tx', label: 'Remodelación de baños en Houston' },
      { href: '/es/bathroom-remodeling-memorial-tx', label: 'Remodelación de baños en Memorial' },
      { href: '/es/bathroom-remodeling-bellaire-tx', label: 'Remodelación de baños en Bellaire' },
      {
        href: '/es/bathroom-remodeling-west-university-tx',
        label: 'Remodelación de baños en West University',
      },
    ],
  },
  {
    slug: 'roof-replacement-cost-houston',
    path: '/es/roof-replacement-cost-houston',
    englishPath: '/roof-replacement-cost-houston',
    title: 'Costo de reemplazo de techo en Houston',
    description:
      'Rangos para planear un reemplazo de techo en Houston: asfalto, metal, loseta o teja compuesta. El precio final sale de un estimado en la casa.',
    lines: ['Costo de reemplazar el techo', 'en Houston.'],
    lede: 'El precio de un techo es la casa que está debajo: el tamaño, la pendiente, cómo se ve la madera bajo la teja cuando sale el techo viejo, y el material que usted elige. Un reclamo de seguro no fija ese precio.',
    serviceSlug: 'roof-replacement',
    serviceLabel: 'Reemplazo de techo',
    factors: [
      {
        title: 'Tamaño y forma',
        body: 'El tamaño del techo es el comienzo. Los pisos, la pendiente, los valles y los tubos y las ventilas que cruzan el techo cambian cuánto tiempo está la cuadrilla arriba y cómo se terminan las uniones de metal.',
      },
      {
        title: 'Materiales',
        body: 'El asfalto arquitectónico es lo común. El metal, la loseta y la teja compuesta son pesos distintos e instalaciones distintas. La estructura tiene que poder cargar el que usted quiere. Eso lo comparamos en la casa, no desde un solo producto.',
      },
      {
        title: 'Lo que hay bajo la teja',
        body: 'Un reemplazo incluye el desmonte y una mirada a la madera. Tablas blandas, uniones de metal malas o ventilas que faltan cambian el trabajo. Lo decimos antes de que el trabajo crezca más allá del techo cotizado. Cambiar una hoja de madera mala anda, por lo general, entre $75 y $150 por hoja de 4x8.',
      },
      {
        title: 'Permisos',
        body: 'Un reemplazo completo en Houston, por lo general, lleva permiso. El permiso es parte de planear el trabajo. No es una sorpresa que agregamos después de que el techo ya está puesto.',
      },
      {
        title: 'Cobertura del seguro',
        body: 'Su aseguradora decide qué paga la póliza. Un reclamo no es un precio, y no es una promesa de que el techo esté cubierto. Fotografiamos el techo e instalamos el que usted nos contrata a construir. Su aseguradora lleva el reclamo. No somos ajustadores públicos.',
      },
    ],
    ranges: [
      { label: 'Reemplazo de teja de asfalto arquitectónica', low: 12000, high: 24000 },
      { label: 'Metal, loseta o teja compuesta', low: 20000, high: 45000 },
      { label: 'Tablas dañadas halladas después del desmonte', low: 500, high: 2000 },
    ],
    faqs: [
      {
        q: '¿Por qué no hay un solo precio de techo por cuadro?',
        a: 'La pendiente, los pisos, los valles, la madera bajo la teja y el material cambian el trabajo. Una cifra solo de tamaño, escrita antes de la inspección, dejaría eso fuera.',
      },
      {
        q: '¿El seguro fija el costo del techo?',
        a: 'No. Su aseguradora decide qué paga la póliza. El costo del techo es el trabajo en el techo. Podemos documentar las condiciones. La cobertura y el reclamo se quedan con su aseguradora.',
      },
      {
        q: '¿Y si la madera bajo la teja está podrida?',
        a: 'Eso lo encontramos después de que sale el techo viejo. Las tablas blandas bajo la teja son trabajo de más. Se lo decimos antes de que el trabajo crezca más allá del techo que se cotizó.',
      },
      {
        q: '¿Cómo consigo un estimado de techo?',
        a: `Llame al ${phone}. Inspeccionamos el techo que usted tiene y decimos si una reparación va a aguantar o si hay que quitarlo, y después cotizamos ese trabajo.`,
      },
      {
        q: '¿Por qué el precio por tamaño de un techador no va a coincidir con esta página?',
        a: 'Un cuadro son 100 pies cuadrados, y el tamaño solo todavía deja fuera la pendiente, los pisos, los valles, la madera del techo y el metal del flashing. Dos techos con la misma área pueden ser trabajos distintos. Cotizamos el techo que inspeccionamos, dentro o fuera de estos rangos para planear, según lo que la casa pida.',
      },
      {
        q: '¿El rango de asfalto incluye el desmonte?',
        a: 'Sí. Un reemplazo, como lo planeamos, llega hasta la madera del techo, con membrana nueva, flashing y ventilas. Una capa sobre teja vieja no es este rango. La madera blanda es el precio de la hoja de más, no un segundo techo escondido.',
      },
      {
        q: '¿Y si mi deducible es más alto que el techo?',
        a: 'Entonces la póliza puede no fondear el trabajo, y el techo sigue costando lo que cuesta si usted elige cambiarlo. Presentar el reclamo o no es decisión suya. El techo se queda el techo que estimamos, aunque eso sea más que el deducible.',
      },
      {
        q: '¿El metal y la loseta siempre están en el rango más alto?',
        a: 'Son otra instalación y a menudo otro peso, y por eso tienen su propio rango para planear, unos $20,000 a $45,000. Un techo de metal chico y simple puede encimarse con uno de asfalto complicado. El estimado es el material en su casa, no la etiqueta sola. Es un rango para planear, no una cotización.',
      },
      {
        q: '¿Por qué el metal o la loseta están en un rango más alto que el asfalto?',
        a: 'El material cuesta más y la instalación es distinta. La loseta y la pizarra también pesan, así que la estructura tiene que poder cargarlas. Si el armazón no puede, esa opción sale de la lista antes de que alguien la cotice como si solo fuera un cambio de teja.',
      },
      {
        q: '¿El rango incluye las canaletas?',
        a: 'No, a menos que el alcance lo diga. Las canaletas a menudo se dañan en el mismo granizo que golpeó la teja, y son una partida aparte. Le decimos si las que están en la casa deben ser parte del trabajo.',
      },
      {
        q: '¿Cuánto agrega una hoja de entablado malo?',
        a: 'Por lo general, unos $75 a $150 por una hoja de 4x8. Las reparaciones de tablas halladas después del desmonte a menudo agregan $500 a $2,000 cuando solo algunas hojas están malas. La pudrición extendida se cotiza cuando la vemos, no se adivina desde la banqueta.',
      },
      {
        q: '¿Una asociación cambia el precio?',
        a: 'Puede cambiar el material y el color, y eso puede cambiar el precio, y puede cambiar el calendario. No cambia el hecho de que el techo todavía tiene que construirse para el viento y la lluvia. Arranque la revisión cuando la dirección está en una comunidad que la pide.',
      },
      {
        q: '¿Un calendario más largo hace que el techo cueste más?',
        a: 'El precio es el techo: el tamaño, la pendiente, la madera y el material. Un permiso o una revisión de la asociación pueden agregar espera, no un segundo techo. La lluvia puede agregar un cierre temporal contra el agua. En esta página no cobramos una tarifa diaria que no se explica. El estimado después de la inspección es el precio.',
      },
      {
        q: '¿La cuota del permiso es una parte grande de un techo en Houston?',
        a: 'No. Es parte de planear un reemplazo completo, y es chica al lado del desmonte y la teja. Un reemplazo completo en la ciudad de Houston, por lo general, lleva permiso. La cuota no es la razón de que un techo empinado y recortado cueste más que un dos aguas simple. La forma del techo sí.',
      },
      {
        q: '¿Una demora de la asociación cambia lo que debo presupuestar?',
        a: 'Presupueste el techo, y presupueste tiempo si la asociación tiene que aprobar el color. Cinco Ranch, The Woodlands y secciones parecidas hacen esto a menudo. La demora no es una razón para saltarse la revisión. Empezar con el color equivocado es la versión cara.',
      },
      {
        q: '¿Por qué un desmonte se cotiza distinto de un techo puesto sobre el viejo?',
        a: 'Son techos distintos. Los rangos de esta página suponen que la cubierta vieja sale para que se pueda ver la madera. Dejar una segunda capa esconde el entablado. Texas limita cuántas capas de teja se pueden dejar. Decimos qué hay en la casa después de mirar.',
      },
      {
        q: '¿Por qué un techo empinado cuesta más que los mismos pies cuadrados?',
        a: 'Las pendientes fuertes, los techos de cadera recortados y los dos pisos piden más mano de obra y más cuidado que un rancho por el que se puede caminar. Un precio por tamaño que ignora la pendiente no va a coincidir con esta página. Inspeccionamos el techo que usted tiene. Un techo grande o empinado puede sentarse arriba del rango publicado.',
      },
      {
        q: '¿Tengo que estar en casa para un estimado de techo?',
        a: `Alguien tiene que darnos acceso al patio y estar localizable. Usted no tiene que subir. Llame al ${phone}. Miramos el techo y decimos si una reparación va a aguantar o si hay que quitarlo, y después cotizamos ese trabajo. Lo de aquí es un rango para planear, no una cotización.`,
      },
      {
        q: 'Si mi deducible es más alto que el techo, ¿qué estoy pagando?',
        a: 'Usted está mirando dos números. El deducible es lo que su póliza dice que usted paga antes de que ella pague, y no lo condonamos. El precio del contrato es el costo del techo. Si el deducible es más alto que la reparación, el reclamo puede no servirle. Pregúntele a su aseguradora. Nosotros de todos modos cotizamos el trabajo.',
      },
      {
        q: '¿Y si el entablado está malo solo en la mitad de la casa?',
        a: 'Encontramos las tablas blandas después de que sale el techo viejo, y se lo decimos antes de que el trabajo crezca. La reparación de madera es de más. A menudo se habla por hoja, no como un techo misterioso nuevo. Unas cuantas hojas y una pendiente entera de entablado podrido son dinero distinto.',
      },
    ],
    sections: [
      {
        eyebrow: 'Cómo leer esto',
        heading: 'El rango es la forma del techo, no un precio solo por tamaño.',
        paragraphs: [
          'El reemplazo de teja de asfalto arquitectónica en muchas casas de Houston anda, por lo general, entre $12,000 y $24,000. El metal, la loseta o la teja compuesta anda, por lo general, entre $20,000 y $45,000 cuando la estructura puede cargarlo. Las reparaciones de la madera bajo la teja, halladas después del desmonte, a menudo andan entre $500 y $2,000, a unos $75 a $150 por una hoja de 4x8. Un techo de un piso a cuatro aguas y un techo de dos pisos con frentes empinados y muchos valles no son el mismo tamaño. Un número solo de tamaño, escrito antes de la inspección, deja fuera la pendiente, la altura y esa madera. Cotizamos el techo que vemos. Es un rango para planear, no una cotización.',
          'El extremo bajo es un desmonte de asfalto directo, en una casa por la que la cuadrilla puede caminar y donde puede acomodar el material. El extremo alto del rango de asfalto todavía no es un techo empinado, recortado o muy grande, y no es loseta. Si su casa es eso, espere que el estimado lo diga. Los rangos sirven para planear una conversación. El contrato es el techo que medimos.',
        ],
      },
      {
        eyebrow: 'El techo',
        heading: 'Qué de la casa mueve el número.',
        paragraphs: [
          'Los pisos, la pendiente y los cortes son la mano de obra. Los tragaluces, las chimeneas y el metal en los muros se filtran cuando se reutilizan piezas quebradizas. Los collares de hule y las ventilas son parte de un reemplazo, no agregados que recordamos después. Un porche o una adición de poca pendiente no es un detalle de teja. Es otro sistema amarrado al techo empinado, y es un lugar común donde se filtran las casas de Houston. Las tablas de madera viejas en The Heights y en otras casas de antes de la guerra son otro desmonte, distinto del triplay de un techo de Katy de los años 2000. Cotizamos la madera que esperamos, y la confirmamos cuando la teja ya no está.',
          'Dos capas dejadas en su lugar, aleros blandos y una tabla podrida en el borde del techo aparecen en el desmonte. Paramos y se lo enseñamos antes de agregar esa madera. Las canaletas no entran solas en el precio del techo. Si están aplastadas o con caída de regreso hacia el borde, lo decimos y las incluimos solo cuando son parte del trabajo. Los árboles que tapan el driveway cambian el día. La teja se queda igual. Lo que cambia es el acceso.',
        ],
        points: [
          {
            title: 'Peso',
            body: 'Asfalto que reemplaza asfalto es el caso estructural habitual. La loseta o la pizarra es una pregunta de peso que contestamos en la casa, antes de que sea un material que usted pueda elegir.',
          },
          {
            title: 'Ventilación',
            body: 'Aire que entra y aire que sale son parte de un techo de Houston porque el ático corre caliente. Los paneles tapados bajo el alero son un hallazgo. Se arreglan para que el sistema funcione, no como una partida misteriosa.',
          },
          {
            title: 'Parcial o completo',
            body: 'Una reparación de un collar de ventila o de un valle no se cotiza con esta tabla de reemplazo. Muchas reparaciones locales se planean entre $400 y $2,500. Un reemplazo es toda la cubierta, quitada hasta esa madera.',
          },
        ],
      },
      {
        eyebrow: 'Seguro',
        heading: 'El deducible no es el estimado.',
        paragraphs: [
          'Su aseguradora decide qué paga la póliza. Muchas pólizas de Texas, sobre todo en el condado de Harris y más cerca de la costa, usan un deducible de viento o granizo que es un porcentaje del límite de la vivienda. Uno, dos y cinco por ciento son comunes. En un límite más alto, dos por ciento es un deducible grande, y no es el deducible de una fuga de cocina. Si esta tormenta lo alcanza es una pregunta suya para la aseguradora. Nuestro estimado es el costo de hacer el techo. Esos números pueden ser distintos.',
          'Algunas pólizas pagan primero el valor depreciado y sueltan el resto después del trabajo. Otras no. Eso no lo calculamos por usted. No somos ajustadores públicos. Fotografiamos el techo e instalamos el que usted contrata. No reescribimos el trabajo para que coincida con un cheque. Si usted está pagando el techo por su cuenta, lea el trabajo, no el cuento del reclamo. La lona temporal, cuando el techo está abierto y es seguro subir, es un proyecto chico aparte, a menudo de unos cientos de dólares a unos $2,000 por una sola abertura por la que se puede caminar. No es un anticipo que lo amarre a un reemplazo.',
        ],
      },
      {
        eyebrow: 'Permisos',
        heading: 'Qué oficina, y por qué el día del desmonte no es una sorpresa.',
        paragraphs: [
          'Un reemplazo completo en la ciudad de Houston, por lo general, lleva permiso. Una reparación chica a menudo no. Si la ciudad postal dice Houston, usted puede estar en Bellaire, West University Place, Southside Place o un pueblo de Memorial, cada uno con su propio departamento de construcción. Sugar Land y Pearland dan sus propios permisos. Mucho de Katy es la ciudad de Katy, el condado de Harris o el condado de Fort Bend. The Woodlands no es un municipio. Una dirección ahí suele ser condado de Montgomery o condado de Harris. Igualamos el permiso con la dirección legal antes de agendar el desmonte.',
          'Los escombros, el permiso y la membrana son parte de planear el trabajo. No se inventan después de que la teja nueva ya está puesta. El clima es el otro dato del calendario. La temporada de huracanes es del 1 de junio al 30 de noviembre. Si una tormenta está cerca, el techo se queda cerrado, y ponemos lona en una abertura cuando es seguro, en lugar de dejar la madera descubierta. Llame al (713) 909-0034. Inspeccionamos, decimos si la reparación o el reemplazo es el trabajo honesto, y cotizamos ese techo.',
          'Si usted está comparando dos estimados, compare el desmonte, la reparación de madera, el flashing, la ventilación y el permiso, no solo el nombre de la teja. Un número más bajo que deja la cubierta vieja en su lugar es otro techo. Los rangos de arriba suponen que la cubierta sale para que esa madera se pueda ver. Empresa familiar desde 1993. Las visitas salen de nuestra oficina en el oeste de Houston (77082).',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Qué describen de verdad los dos rangos de material',
        paragraphs: [
          'El asfalto arquitectónico es el reemplazo común de Houston, y es el rango más bajo porque el material y el tiempo de la cuadrilla son el caso ordinario. El metal, la loseta y la teja compuesta son el rango más alto porque el material cuesta más y la instalación es distinta. Ningún rango es un precio por cuadro. Un dos pisos empinado con valles no es un techo de un piso a cuatro aguas de la misma área.',
          'La partida del entablado va aparte a propósito. No podemos ver el entablado blando hasta que sale el techo viejo. Unas cuantas hojas malas a menudo caen en el rango de $500 a $2,000, y una sola hoja de 4x8 anda, por lo general, entre $75 y $150. Un campo de entablado podrido es otra conversación, y la tenemos antes de que vaya el techo nuevo, no después. Cada una de esas cifras es un rango para planear, no una cotización.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Pendiente, pisos y penetraciones',
        paragraphs: [
          'Los cuadros de techo son el comienzo. Los pisos cambian el acarreo y la seguridad. La pendiente cambia qué tan rápido puede trabajar una cuadrilla y cómo hay que detallar la membrana y el flashing. Los valles, las buhardillas, una chimenea y una fila de botas de tubo son los lugares por donde entra la lluvia empujada por el viento. Un cuatro aguas simple en una subdivisión nueva de Katy o Pearland y un techo recortado en una casa vieja de Memorial no deben forzarse a un solo número.',
          'El acceso también importa. Un techo sobre un patio lateral apretado, o una pendiente fuerte sin un lugar fácil para la escalera, tarda más. Cotizamos la casa frente a la que estamos parados. Una foto de satélite no es un estimado.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Calor, viento y las partes que no son la teja',
        paragraphs: [
          'Los áticos de Houston corren calientes. La entrada y la salida de aire son parte de un reemplazo, porque una teja nueva sobre un ático sellado se sigue cocinando desde abajo. Las botas de tubo, el flashing de escalón y los valles se cambian con el campo. Son los caminos habituales de una gotera, y reutilizar una bota cuarteada para ahorrar poco es la manera en que la mancha del cielo regresa.',
          'El granizo de primavera y la temporada de huracanes, de junio a noviembre, son la razón de que importen la fijación y la membrana. Algunas tejas de asfalto traen una clasificación de resistencia al impacto. Si su aseguradora ofrece un crédito en la prima es decisión de ella. Podemos instalar el producto. No prometemos un descuento, y no nombramos una marca como si un solo producto fuera el techo de Houston.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'El desmonte es la inspección',
        paragraphs: [
          'Quitamos el techo viejo. Una segunda capa sobre un techo cansado esconde el entablado y agrega peso. Los techos viejos de Bellaire y Memorial a menudo se han parchado y se les ha agregado. Los techos más nuevos de The Woodlands y de Katy a menudo son un desmonte más limpio, con más penetraciones originales. Los dos reciben un sistema nuevo. La mano de obra no es la misma.',
          'Si el entablado está blando, paramos y se lo enseñamos. El precio base era del techo que se podía ver. Fijar un sistema nuevo a triplay podrido no es una manera de quedarse dentro del rango. Usted oye el alcance agregado, incluido ese número por hoja de entablado, antes de que se construya.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Permisos y el color de la asociación',
        paragraphs: [
          'Un reemplazo completo en la ciudad de Houston, por lo general, lleva permiso. El permiso es parte de planear el trabajo. Katy, Sugar Land, Pearland, Bellaire, West University y el condado de Montgomery dan los suyos, y el nombre de un vecindario no le dice la jurisdicción. No descubrimos el permiso después de que la teja ya está puesta.',
          'El color y el material del techo son una revisión de arquitectura común en Cinco Ranch, The Woodlands y otras comunidades planeadas. Muchas casas dentro del Loop no tienen asociación. Si aplica una revisión, el color se aprueba antes de que pidamos. Un rango no incluye un mes de demora que usted pudo evitar preguntándole primero al comité, y no incluye un color que van a rechazar.',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'El seguro paga lo que paga la póliza',
        paragraphs: [
          'Su aseguradora decide la cobertura, el deducible y cualquier depreciación que la forma retenga. Muchas pólizas de Texas tratan el viento y el granizo bajo un deducible distinto del de una fuga de plomería, a veces un porcentaje del límite de la vivienda. No conocemos su forma. Un pago de reclamo y nuestro precio son números distintos, y no cerramos la diferencia llamándolo cobertura.',
          'Fotografiamos el techo y construimos el techo que usted contrata. Mandamos nuestro estimado a su aseguradora para que lo apruebe y lo trabajamos con el ajustador. No somos ajustadores públicos. Su aseguradora decide la cobertura y el pago. Llame al (713) 909-0034 para una inspección. El rango de esta página no va a ser el contrato. Somos una empresa familiar desde 1993, y las visitas salen de nuestra oficina en el oeste de Houston (77082).',
        ],
      },
      {
        eyebrow: 'En Houston',
        heading: 'Qué se espera que incluya un reemplazo',
        paragraphs: [
          'El desmonte del techo viejo, una mirada al entablado, membrana nueva, flashing nuevo, botas de tubo nuevas, ventilación, el material que usted eligió, una limpieza y una mirada final al techo terminado. La lona de emergencia, si el techo está abierto mientras agendamos el trabajo, es protección y puede ser su propia partida. Las canaletas, los tragaluces y una reparación de la fascia del segundo piso se incluyen solo cuando el alcance lo dice.',
          'Una reparación de una sola pendiente no se cotiza como si fuera esta página. Si la inspección dice que el campo se puede salvar, lo decimos, y el número no se fuerza al rango de reemplazo para que coincida con el techo de un vecino. Dos casas en la misma calle pueden necesitar trabajo distinto. El rango solo es una manera de planear antes de la visita. Pregunte qué encontró el desmonte antes de comparar una factura con el número de esta página.',
        ],
      },
    ],
    related: [
      { href: '/es/roof-replacement', label: 'Reemplazo de techo de Houston' },
      { href: '/es/roof-replacement-houston-tx', label: 'Reemplazo de techo en Houston' },
      { href: '/es/roof-replacement-katy-tx', label: 'Reemplazo de techo en Katy' },
      { href: '/es/roof-replacement-memorial-tx', label: 'Reemplazo de techo en Memorial' },
      {
        href: '/es/roof-replacement-the-woodlands-tx',
        label: 'Reemplazo de techo en The Woodlands',
      },
      {
        href: '/what-to-do-after-a-roof-leak-in-houston',
        label: 'Qué hacer después de una gotera de techo en Houston',
      },
      {
        href: '/hail-damage-vs-normal-wear-houston-roof',
        label: 'Granizo y desgaste normal en un techo de Houston',
      },
    ],
  },
];

const spanishServices = new Set<string>(spanishServiceSlugs);
const problems: string[] = [];

for (const guide of esCostGuides) {
  const english = costGuides.find((item) => item.slug === guide.slug);
  if (!english) {
    problems.push(`Missing English cost guide ${guide.slug}`);
    continue;
  }
  if (guide.path !== `/es/${guide.slug}`) problems.push(`Path ${guide.slug}`);
  if (guide.englishPath !== english.path) problems.push(`englishPath ${guide.slug}`);
  if (guide.serviceSlug !== english.serviceSlug) problems.push(`serviceSlug ${guide.slug}`);
  if (!titleFits(guide.title)) problems.push(`Title does not fit: ${guide.title}`);
  if (guide.description.length > 155) {
    problems.push(`Description ${guide.description.length}: ${guide.slug}`);
  }
  if (guide.ranges.length !== english.ranges.length) problems.push(`Range count ${guide.slug}`);
  guide.ranges.forEach((range, index) => {
    const source = english.ranges[index];
    if (!source || range.low !== source.low || range.high !== source.high) {
      problems.push(`Range numbers changed: ${guide.slug} ${range.label}`);
    }
  });
  if (guide.related.length !== english.related.length) problems.push(`Related count ${guide.slug}`);
  guide.related.forEach((link, index) => {
    const source = english.related[index];
    if (!source) return;
    const slug = source.href.replace(/^\//, '');
    const expected = parseLocalLandingSlug(slug)
      ? `/es/${slug}`
      : spanishServices.has(slug)
        ? `/es/${slug}`
        : source.href;
    if (link.href !== expected) problems.push(`${guide.slug} href ${link.href} expected ${expected}`);
    if (!link.label.trim()) problems.push(`${guide.slug} empty related label`);
  });
  const blob = [
    guide.title,
    guide.description,
    ...guide.lines,
    guide.lede,
    guide.serviceLabel,
    ...guide.factors.flatMap((factor) => [factor.title, factor.body]),
    ...guide.ranges.map((range) => range.label),
    ...guide.sections.flatMap((section) => [
      section.eyebrow,
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []).flatMap((point) => [point.title, point.body]),
    ]),
    ...guide.faqs.flatMap((faq) => [faq.q, faq.a]),
    ...guide.related.map((link) => link.label),
  ].join('\n');
  if (!blob.includes(office)) problems.push(`${guide.path} is missing the office line`);
  if (!blob.includes(rangeLine)) problems.push(`${guide.path} is missing the range line`);
  if (!blob.includes(phone)) problems.push(`${guide.path} is missing the phone`);
  if (!/empresa familiar/i.test(blob) || !blob.includes('1993')) {
    problems.push(`${guide.path} is missing the family or 1993 fact`);
  }
  if (/estimado gratis/i.test(blob)) problems.push(`${guide.path} says estimado gratis`);
  if (/\bInc\./.test(blob)) problems.push(`${guide.path} says Inc.`);
  if (/281-748-0227|2817480227/.test(blob)) problems.push(`${guide.path} has the wrong phone`);
  try {
    assertCopyAllowed(guide.path, blob);
  } catch (error) {
    problems.push(error instanceof Error ? error.message : String(error));
  }
}

if (problems.length > 0) {
  throw new Error(problems.join('\n'));
}

const bySlug = new Map(esCostGuides.map((guide) => [guide.slug, guide]));

export function getEsCostGuide(slug: string) {
  return bySlug.get(slug);
}
