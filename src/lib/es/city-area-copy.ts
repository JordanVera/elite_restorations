export type EsKind = 'water' | 'roof' | 'floor' | 'interior' | 'exterior';

export type EsAreaCopy = {
  slug: string;
  direction: string;
  housing: string;
  climate: string;
  permits: string;
  route: string;
  more: string;
  housesNote: string;
  climateNote: string;
  kind: Record<EsKind, string>;
};

const office =
  'Salimos de nuestra oficina en el oeste de Houston (77082). Somos una empresa familiar y servimos a Houston desde 1993. Atendemos de lunes a sábado, de 8 AM a 6 PM. Llame al (713) 909-0034.';

export const esAreaCopy: Record<string, EsAreaCopy> = {
  copperfield: {
    slug: 'copperfield',
    direction: 'al norte de la oficina',
    housing:
      'Copperfield son casas de ladrillo de uno y dos pisos, de finales de los setenta y de los ochenta, entre la Highway 6, Clay Road, la FM 529 y Barker Cypress Road. La losa es concreto convencional, no el postensado de las secciones nuevas de Cypress. No hay cables que buscar antes de mover un drenaje, y el concreto ya tiene edad para no estar parejo. Medimos esta casa antes de hablar de un piso nuevo o de una regadera en otro lugar.',
    climate:
      'Bear Creek y la zona del embalse Addicks quedan al sur de Clay Road. El terreno bajo, más cerca de esa agua, ha recibido agua de tormenta. Muchas calles de adentro no. Los lagos y las áreas verdes guardan la lluvia, y ese encharcamiento no es agua dentro de la casa. Una línea que se partió en una helada y el agua que subió de afuera son eventos distintos. El granizo de primavera marca el asfalto, y las ramas caen en los valles.',
    permits:
      'Copperfield está en la ciudad de Houston. El permiso, cuando el trabajo lo pide, sale de Houston. En muchas calles una asociación revisa el color del techo, la pintura y las cercas. Una cocina por dentro suele quedar fuera de esa revisión. Confirmamos la dirección antes de pedir materiales.',
    route: `Desde la oficina se va al norte por la Highway 6, se pasa la Interestatal 10 y se llega a Clay Road. No hay un local en Copperfield. ${office}`,
    more:
      'Las cocinas de estos planos a menudo seguían separadas de la sala, o se actualizaron por partes: gabinetes de una década, cubierta de otra y piso de otra. El baño principal y el baño de pasillo necesitan impermeabilización antes de la loseta nueva. Un vidrio no hace impermeable una regadera.',
    housesNote: 'Casas de ladrillo de los setenta y ochenta sobre losa convencional.',
    climateNote: 'Bear Creek y el embalse Addicks quedan al sur de Clay Road. El granizo marca el asfalto.',
    kind: {
      water:
        'En Copperfield el agua de adentro suele empezar en el calentador del garaje o en una línea del ático, y el terreno bajo cerca de Bear Creek es otra visita.',
      roof:
        'En Copperfield el techo suele ser el segundo o el tercero, y desde la Highway 6 no se ven los moretones del granizo ni el valle bajo los árboles.',
      floor:
        'En Copperfield la alfombra escondió lomos de una losa vieja. El vinil y la loseta grande los van a mostrar si el concreto no está parejo y seco.',
      interior:
        'En Copperfield abrir la cocina es una pregunta de estructura, y mover el fregadero es cortar una losa convencional que lleva décadas en su lugar.',
      exterior:
        'En Copperfield la asociación, donde existe, suele mirar el color del techo y la cerca. El patio tiene que alejar el agua de la losa.',
    },
  },
  rosenberg: {
    slug: 'rosenberg',
    direction: 'al suroeste de la oficina',
    housing:
      'Rosenberg es la ciudad de Fort Bend junto a Richmond, con casas de madera y de ladrillo cerca del centro viejo y losas más nuevas hacia la FM 2218, la FM 762 y el Grand Parkway. Cerca del pueblo original hay casas sobre pilotes. Más afuera hay planos de dos pisos sobre losa. No usamos el mismo dibujo para las dos. El río Brazos queda al oeste.',
    climate:
      'El terreno bajo cerca del Brazos y de Seabourne Creek ha recibido agua en tormentas pasadas. Muchas calles solo se encharcan. Una fuga de suministro y el agua que subió de afuera no se secan igual y a menudo no son la misma conversación con el seguro. El granizo y el viento tropical marcan techos más chicos cerca del centro y techos más grandes en las subdivisiones nuevas.',
    permits:
      'Rosenberg da sus propios permisos. Un permiso de Richmond no cubre una dirección sobre la US 90A o la Interestatal 69. En las secciones nuevas la asociación suele revisar el techo y el exterior, no la cocina de adentro.',
    route: `El camino es la Interestatal 69 al suroeste, pasando Sugar Land. No hay una segunda oficina en Rosenberg. ${office}`,
    more:
      'La arcilla de Fort Bend se hincha mojada y se encoge seca. Una puerta que atora no se culpa hasta ver el marco. La humedad del Golfo pide deshumidificadores en un secado, no solo un ventilador en el pasillo.',
    housesNote: 'Pueblo viejo y losas más nuevas junto a Richmond.',
    climateNote: 'El Brazos queda al oeste y Seabourne Creek cruza la arcilla plana.',
    kind: {
      water:
        'En Rosenberg el agua que subió cerca del río no es la misma visita que un calentador o una línea de suministro sobre la losa.',
      roof:
        'En Rosenberg los techos del centro suelen estar parchados, y los de las secciones nuevas tienen varios planos que la calle no muestra.',
      floor:
        'En Rosenberg un piso de madera sobre una casa con pilotes depende de que el hueco de abajo no siga húmedo. Sobre losa, el concreto tiene que estar seco.',
      interior:
        'En Rosenberg una cocina del pueblo viejo puede seguir cerrada y fuera de escuadra. En una casa nueva el cuarto ya está abierto y el trabajo es el acabado.',
      exterior:
        'En Rosenberg la ciudad revisa el permiso y la asociación, si la sección tiene una, suele mirar el techo y la cerca antes que un deck se pida.',
    },
  },
  'jersey-village': {
    slug: 'jersey-village',
    direction: 'al noreste de la oficina',
    housing:
      'Jersey Village es su propia ciudad sobre la US 290, entre Jones Road y el Sam Houston Tollway. La mayoría de las casas son ranches de ladrillo y planos de dos pisos de los sesenta a los ochenta, sobre losas y en lotes un poco más grandes. No es un townhome del Energy Corridor ni una casa nueva de Towne Lake.',
    climate:
      'White Oak Bayou cruza Jersey Village. Las calles bajas junto a ese bayou se han inundado más de una vez, incluso en 2016 y 2017. Las calles más altas no todas vieron la misma agua. El granizo y las ramas de los árboles del bayou caen en los valles. Una tubería reventada y el agua que subió del bayou son eventos distintos.',
    permits:
      'Un permiso de Houston no cubre una dirección dentro del límite de Jersey Village. El mostrador es el de su propia alcaldía, distinto de una dirección de Houston a unas cuadras, sobre Senate Avenue o Jones Road. La asociación aquí es la excepción, no la regla.',
    route: `Se llega por la Highway 6 o el Beltway hasta la US 290. No hay un local en Jersey Village. ${office}`,
    more:
      'Estas cocinas de ranch a menudo siguen en su lugar original, actualizadas por partes y a veces cerradas hacia la sala. El baño de pasillo y el baño principal piden la misma impermeabilización. La losa de esta época no siempre está pareja.',
    housesNote: 'Ranches de ladrillo de los sesenta a los ochenta sobre losa.',
    climateNote: 'White Oak Bayou cruza la ciudad. El granizo marca el asfalto.',
    kind: {
      water:
        'En Jersey Village el agua del bayou en una calle baja no es el mismo secado que una línea del ático en un segundo piso.',
      roof:
        'En Jersey Village el techo de asfalto está en uno o dos pisos, y las ramas del bayou caen donde la calle no alcanza a ver.',
      floor:
        'En Jersey Village el piso nuevo va sobre una losa de ranch. Si el concreto tiene un lomo, el vinil lo enseña.',
      interior:
        'En Jersey Village mover el fregadero es cortar concreto de un ranch, no abrir un hueco bajo la casa.',
      exterior:
        'En Jersey Village el permiso es de la ciudad, y un deck o una cerca se confirman en esa dirección antes de pedir madera.',
    },
  },
  'towne-lake': {
    slug: 'towne-lake',
    direction: 'al norte de la oficina',
    housing:
      'Towne Lake es la comunidad planeada al norte de la US 290, con casas de dos pisos que empezaron a levantarse alrededor de 2008 junto a un lago entre Tuckerton Road y Mueschke Road. Muchas losas son postensadas, con cables en el concreto. No es la losa convencional de Copperfield ni la calle vieja de Cypress junto al arroyo. Una regadera que se queda en su drenaje no necesita que se corte la losa.',
    climate:
      'El lago y la detención de Towne Lake guardan una lluvia ordinaria. Eso no es la historia de Cypress Creek al sur de la US 290. El granizo y el viento tropical igual marcan techos grandes y recortados, incluidos los planos sobre el garaje que Tuckerton no muestra. El sur y el oeste envejecen más rápido.',
    permits:
      'Towne Lake no es una ciudad. La mayoría de las direcciones están en el condado de Harris sin incorporar, así que el permiso sigue la dirección legal y no un mostrador del nombre de la comunidad ni un permiso automático de Houston. La asociación suele revisar el color del exterior.',
    route: `Se va por la US 290 al noroeste y después por Tuckerton Road. No hay una oficina en Towne Lake. ${office}`,
    more:
      'Las cocinas se construyeron abiertas. El trabajo suele ser gabinetes, luz y el piso que pasa a la sala, no un muro que se tumba. La arcilla de esta zona se mueve con la humedad. Medimos la casa en lugar de copiar el modelo de al lado.',
    housesNote: 'Casas de dos pisos alrededor del lago, a menudo sobre losa postensada.',
    climateNote: 'El lago guarda la lluvia ordinaria. El granizo marca los techos grandes.',
    kind: {
      water:
        'En Towne Lake una fuga de ático o de calentador es la llamada común. El lago no significa que esta casa haya recibido agua de afuera.',
      roof:
        'En Towne Lake el techo es grande y recortado, y la asociación suele tener una palabra sobre el color antes de que se pida el material.',
      floor:
        'En Towne Lake el piso de abajo suele ser loseta o vinil sobre losa. El concreto postensado no se corta para esconder un lomo.',
      interior:
        'En Towne Lake mover un drenaje empieza por localizar los cables. Si el mueble se queda en su lugar, la losa puede quedarse intacta.',
      exterior:
        'En Towne Lake un deck o una cubierta pasa por la asociación además del permiso del condado o de la ciudad que contenga el lote.',
    },
  },
  bridgeland: {
    slug: 'bridgeland',
    direction: 'al norte de la oficina',
    housing:
      'Bridgeland son varias villas al norte de la US 290, sobre Fry Road y Mason Road, con Cypress Creek como borde sur. Creekland queda más cerca del arroyo, Lakeland alrededor de los lagos, y Parkland y Prairieland sobre pradera más abierta. Las losas nuevas a menudo son postensadas. No es un solo plano para todas las villas.',
    climate:
      'Un lote junto al área verde de Cypress Creek no es el mismo suelo que una casa en medio de una villa. Los lagos de detención toman una lluvia ordinaria, y una calle baja igual puede inundarse en una tormenta grande. El granizo y el viento marcan techos grandes, con dormers y planos del garaje que la fachada esconde.',
    permits:
      'Bridgeland no es una ciudad. Las direcciones suelen estar en el condado de Harris sin incorporar, y el permiso es del condado o de la ciudad que contiene el lote. La asociación pide ver el color del techo, la pintura, las cercas y una cubierta de patio antes de pedir materiales.',
    route: `Se va por la US 290 al noroeste hasta Fry Road. El camino es más largo que el de Copperfield. ${office}`,
    more:
      'Las cocinas se hicieron abiertas. Un baño principal grande igual necesita impermeabilización antes del acabado. No cortamos una losa postensada desde un plano que nadie comprobó en la casa.',
    housesNote: 'Villas nuevas al norte de la US 290, con Cypress Creek al sur.',
    climateNote: 'El arroyo es el borde sur. Los lagos toman la lluvia ordinaria.',
    kind: {
      water:
        'En Bridgeland una casa junto al arroyo y una casa en el centro de la villa no comparten la misma historia de agua.',
      roof:
        'En Bridgeland el techo es grande y la asociación suele revisar el color. Caminamos los planos que la fachada no enseña.',
      floor:
        'En Bridgeland el piso se pone cuando la losa está seca y pareja. El postensado no es una razón para flotar un piso sobre un lomo.',
      interior:
        'En Bridgeland la cocina ya está abierta. Mover la regadera espera a que se localicen los cables.',
      exterior:
        'En Bridgeland la cubierta, la cerca y el color se confirman con la asociación antes de que llegue la madera.',
    },
  },
  sienna: {
    slug: 'sienna',
    direction: 'al sureste de la oficina',
    housing:
      'Sienna es la comunidad planeada de Missouri City sobre Sienna Parkway, empezada en los noventa. No es Quail Valley. Las secciones tempranas, más cerca de la Highway 6, son otro tamaño de casa que las posteriores. Mucho del concreto nuevo es postensado. Las losas tempranas suelen ser otro vaciado. Miramos antes de decir si una regadera se puede mover.',
    climate:
      'Steep Bank Creek drena la parte sur, y los lagos también sirven de detención sobre la arcilla plana de Fort Bend. Una lluvia fuerte encharca calles. No todas las casas han recibido agua de afuera. El granizo y el viento tropical marcan el asfalto. El sur y el oeste envejecen primero.',
    permits:
      'Sienna está en la ciudad de Missouri City, en el condado de Fort Bend. El permiso lo da Missouri City, no Houston y no Sugar Land. La asociación revisa color de techo, pintura y cercas. Una cocina de adentro suele quedar fuera de esa revisión. El nombre viejo de la comunidad no cambia el mostrador.',
    route: `Se va al sur por la Highway 6 hasta Sienna Parkway. Es un camino más largo que el de Sugar Land. ${office}`,
    more:
      'Las cocinas posteriores se abrieron al cuarto de al lado. Las tempranas, cerca de la Highway 6, pueden seguir más cerradas y fuera de escuadra. La humedad del Golfo es la razón de secar con deshumidificadores y no solo con ventiladores.',
    housesNote: 'Comunidad planeada en Missouri City, con losas tempranas y otras postensadas.',
    climateNote: 'Steep Bank Creek y los lagos de detención están sobre arcilla de Fort Bend.',
    kind: {
      water:
        'En Sienna una fuga de calentador o de línea es la llamada común. El agua cerca de un lago o del arroyo se anota como el evento que llegó a esa casa.',
      roof:
        'En Sienna el techo de asfalto está en casas tempranas y en casas posteriores más grandes. La asociación suele opinar del color.',
      floor:
        'En Sienna la loseta grande pide una losa más pareja que la alfombra. El vinil también enseña el lomo.',
      interior:
        'En Sienna una regadera que se queda en su drenaje no necesita cortar la losa. Si se mueve, primero se buscan los cables en las secciones nuevas.',
      exterior:
        'En Sienna la cubierta y la cerca pasan por Missouri City y, casi siempre, por la asociación.',
    },
  },
  cypress: {
    slug: 'cypress',
    direction: 'al noroeste de la oficina',
    housing:
      'Cypress no es una sola casa. Junto a Cypress Creek y las calles más viejas hay ranches y casas de dos pisos de varias décadas, casi siempre sobre losa. En las secciones planeadas hacia el Grand Parkway las cocinas ya están abiertas y muchas losas son postensadas, con cables en el concreto. Cortar esa losa para mover un drenaje no es el mismo trabajo que cortar una losa vieja.',
    climate:
      'Cypress Creek es la historia de agua. Las secciones bajas cerca del arroyo han recibido agua de tormenta. Los estanques de detención ayudan con una lluvia fuerte, y una calle baja igual puede inundarse en una tormenta grande. Una casa que recibió agua del arroyo y una casa con una manguera reventada se secan distinto. El granizo de primavera marca techos de asfalto, muchos de ellos grandes y con varios faldones.',
    permits:
      'Partes de Cypress están en la ciudad de Houston y partes en el condado de Harris sin incorporar. La dirección elige el permiso. Las asociaciones de las secciones planeadas suelen revisar el techo y el exterior, no los gabinetes de adentro.',
    route: `El camino habitual es la US 290 al noroeste. El tráfico cambia la hora, así que la visita es una ventana. ${office}`,
    more:
      'Los calentadores y las líneas de los áticos en los planos de dos pisos son una fuga común. La mancha del plafón llega tarde. No hay un hueco bajo la casa en la losa. Medimos, sacamos lo que está encharcado y dejamos el muro abierto hasta que esté seco.',
    housesNote: 'Calles viejas sobre losa y secciones nuevas, a menudo postensadas, hacia el Grand Parkway.',
    climateNote: 'Cypress Creek ha puesto agua en las secciones bajas. El granizo marca el asfalto.',
    kind: {
      water:
        'En Cypress el agua del arroyo en un lote bajo no es el mismo secado que un calentador del garaje o una línea del ático.',
      roof:
        'En Cypress el techo suele ser asfalto en uno o dos pisos, recortado, y el granizo no se juzga desde la entrada.',
      floor:
        'En Cypress el piso de abajo a menudo ya es loseta. Cambiarlo, o quitar la alfombra de arriba, espera a que la base esté seca y pareja.',
      interior:
        'En Cypress una cocina nueva ya está abierta. En una calle vieja el muro puede seguir cerrado, y la losa decide si el fregadero se mueve.',
      exterior:
        'En Cypress un patio o una cubierta en una sección planeada suele pasar por la asociación además del permiso de la ciudad o del condado.',
    },
  },
  spring: {
    slug: 'spring',
    direction: 'al norte de la oficina',
    housing:
      'Old Town Spring y las subdivisiones de la autopista se llaman Spring, y no son la misma casa. El pueblo viejo tiene casas más chicas, algunas sobre pilotes y algunas sobre losas tempranas, con árboles pegados al techo. Las secciones nuevas son casas de dos pisos sobre losa, con cocinas abiertas. Mucho de ese concreto nuevo es postensado. Preguntamos en qué Spring está la dirección y después miramos.',
    climate:
      'Spring Creek se desborda. Las calles bajas cerca del arroyo han recibido agua en tormentas tropicales pasadas. Las casas sobre pads más altos no todas recibieron esa agua. Los pinos dejan agujas y ramas en los valles. El granizo cruza el norte de Houston y moretonea el asfalto aunque la copa del árbol se vea tupida desde el jardín.',
    permits:
      'Una dirección de Spring puede ser de la ciudad de Houston, del condado de Harris sin incorporar, o quedar tan cerca de otra ciudad que las reglas cambian. Confirmamos la dirección antes de sacar un permiso. Las asociaciones de las secciones nuevas revisan techos y pintura más a menudo que un plano de gabinetes.',
    route: `Se va al norte por la Interestatal 45 o el Hardy Toll Road, según la sección. ${office}`,
    more:
      'Bajo los árboles la humedad y el piso viajan juntos. Una losa que casi no ve sol igual tiene que estar seca antes del vinil o de la madera. No instalamos un piso para tapar una losa que el arroyo dejó húmeda.',
    housesNote: 'Old Town, con pilotes y losas tempranas, y secciones nuevas sobre losa.',
    climateNote: 'Spring Creek inunda calles bajas. Los pinos llenan los valles.',
    kind: {
      water:
        'En Spring el agua del arroyo en la planta baja no es la misma apertura que una bota de ventilación o un calentador en el ático.',
      roof:
        'En Spring el techo bajo los pinos se revisa en los valles y en los respiraderos, no solo en la pendiente que da a la calle.',
      floor:
        'En Spring la madera sobre un hueco húmedo se va a mover. Sobre losa, el piso espera a que el concreto esté seco.',
      interior:
        'En Spring una cocina de Old Town puede seguir siendo un cuarto aparte y fuera de escuadra. En una sección nueva el cuarto ya está abierto.',
      exterior:
        'En Spring la cerca, el techo y la pintura de una sección nueva suelen pasar por la asociación. El permiso sigue la dirección legal.',
    },
  },
  'missouri-city': {
    slug: 'missouri-city',
    direction: 'al sureste de la oficina',
    housing:
      'Missouri City está sobre todo en el condado de Fort Bend, con una parte en el condado de Harris. No es Sugar Land y no es Houston. Quail Valley es el tejido más viejo, mucho de los sesenta a los ochenta, sobre losas de concreto. Las secciones posteriores son planos de dos pisos más grandes, y Sienna, que tiene sus propias páginas, es una de esas comunidades. Mucho del concreto nuevo es postensado. Una losa vieja de Quail Valley no se corta igual.',
    climate:
      'La arcilla es plana y algunas calles cerca de los bayous han recibido agua de tormenta. Muchas casas no. Una lluvia fuerte encharca la calle sin entrar a la casa. El granizo y el sol del sur y del oeste marcan el asfalto aunque la fachada se vea pareja. Una fuga de suministro y el agua de afuera se documentan como eventos distintos.',
    permits:
      'Missouri City da sus propios permisos. No es el mostrador de Houston ni el de Sugar Land. Donde hay asociación, suele revisar el exterior. Una cocina de adentro es otra pregunta. Confirmamos la dirección porque el condado también cambia dentro de la ciudad.',
    route: `Se va al sur por la Highway 6 o el Fort Bend Parkway. ${office}`,
    more:
      'Las cocinas viejas se actualizaron por partes. Las posteriores ya están abiertas. El baño, chico o principal, se impermeabiliza antes de la loseta. La humedad del Golfo no se resuelve abriendo una ventana.',
    housesNote: 'Quail Valley sobre losas viejas y secciones posteriores, muchas postensadas.',
    climateNote: 'Arcilla plana de Fort Bend. Algunas calles cerca de bayous han recibido agua.',
    kind: {
      water:
        'En Missouri City el agua de un bayou en un lote bajo no es el secado de un calentador o de una línea sobre la losa.',
      roof:
        'En Missouri City el techo de asfalto envejece primero en el sur y en el oeste. Lo caminamos antes de decir si una reparación aguanta.',
      floor:
        'En Missouri City el vinil y la loseta grande enseñan el lomo que la alfombra escondió en una losa de Quail Valley.',
      interior:
        'En Missouri City mover un drenaje en una losa postensada empieza por los cables. En una losa vieja el corte es otro trabajo, y también se mira primero.',
      exterior:
        'En Missouri City el permiso es de la ciudad, y la asociación, si la sección tiene una, suele mirar el techo y la cerca.',
    },
  },
  fulshear: {
    slug: 'fulshear',
    direction: 'al oeste de la oficina',
    housing:
      'Fulshear es su propia ciudad en el condado de Fort Bend, sobre la FM 1093, entre el pueblo viejo y las subdivisiones nuevas hacia el Grand Parkway. La mayoría de las casas por las que llaman son planos de dos pisos, con cocina abierta y losa. Mucho de ese concreto es postensado. Las calles viejas son otro edificio. No describimos el trabajo como casa nueva hasta ver la que está.',
    climate:
      'Es el oeste de Fort Bend: arcilla plana, arroyos, y el Brazos más al oeste. Algunos lotes están en zona de inundación y muchos de los nuevos no. Los estanques ayudan con una lluvia ordinaria, y una calle baja igual puede inundarse en una tormenta grande. El granizo de primavera y el viento tropical, de junio a noviembre, marcan techos grandes de asfalto.',
    permits:
      'Fulshear permite el trabajo dentro de la ciudad. Un lote del condado al lado no es el mismo mostrador. En una sección planeada la asociación suele revisar color de techo, pintura, cercas y a veces el patio. Los gabinetes de adentro suelen ser elección de la casa.',
    route: `Se va al oeste por la FM 1093 o el Westpark Tollway. El tráfico cambia la hora. ${office}`,
    more:
      'La humedad del Golfo llega hasta acá. Un secado usa deshumidificadores. Los calentadores y las líneas del ático en las casas de dos pisos son una fuga común. La arcilla mueve pisos y puertas, así que medimos la casa.',
    housesNote: 'Pueblo chico y subdivisiones nuevas sobre losa, a menudo postensada.',
    climateNote: 'Arcilla de Fort Bend, arroyos, y el Brazos más al oeste.',
    kind: {
      water:
        'En Fulshear una línea del ático es la fuga común. El agua de afuera, en un lote bajo cerca de un arroyo, es otro evento.',
      roof:
        'En Fulshear el techo nuevo es grande y de varios planos, incluido el del garaje. El color suele pasar por la asociación.',
      floor:
        'En Fulshear el vinil da un aspecto de madera cuando la losa está seca y razonablemente pareja. La madera se aclimata en la casa.',
      interior:
        'En Fulshear la cocina nueva ya está abierta. Mover la regadera en una losa postensada empieza por encontrar los cables.',
      exterior:
        'En Fulshear un deck o una cubierta espera la revisión de la ciudad y, si la sección la tiene, de la asociación.',
    },
  },
  tomball: {
    slug: 'tomball',
    direction: 'al noroeste de la oficina',
    housing:
      'Tomball es su propia ciudad sobre la FM 2920 y la Highway 249, con un centro viejo y subdivisiones nuevas hacia el Grand Parkway. Cerca del pueblo las casas son más chicas, en lotes más grandes, y mezclan pilotes y losa, con árboles cerca del alero. Más afuera hay planos de dos pisos sobre losa, a menudo postensada, con cocinas abiertas y techos grandes. Una cocina que mueve un muro es otra conversación en cada una.',
    climate:
      'El granizo y el viento de primavera son el patrón de tormenta de este lado. Los moretones no se ven desde el jardín, y las ramas de los lotes viejos caen en los valles. El agua de tormenta aquí es de arroyos y de drenaje plano, no de un solo bayou por el centro. Algunas calles bajas han recibido agua. Muchos lotes solo se encharcan. Una tubería reventada en una helada es la llamada de agua más común.',
    permits:
      'Tomball da los permisos dentro de la ciudad. Algunas direcciones cercanas son del condado de Harris o quedan cerca del condado de Montgomery. El permiso sigue la dirección. Las asociaciones de las secciones nuevas revisan el exterior. El color del techo puede ser pregunta de ellas. Un tocador, casi nunca.',
    route: `Se va por la US 290 hasta la 249, o por el Grand Parkway según la sección. No hay un local en Tomball. ${office}`,
    more:
      'En una casa vieja el hueco bajo el piso hay que verlo si hubo una fuga. En la losa nueva se mide el zoclo. No flotamos un piso sobre un contrapiso mojado, y la madera se aclimata en la casa.',
    housesNote: 'Centro viejo, con pilotes y losa, y secciones nuevas a menudo postensadas.',
    climateNote: 'Granizo de primavera y arroyos. No hay un solo bayou por el centro.',
    kind: {
      water:
        'En Tomball una fuga bajo una casa de pilotes y una línea de ático en un dos pisos nuevo no se buscan en el mismo lugar.',
      roof:
        'En Tomball el techo va de un dos aguas sencillo a un techo nuevo recortado. El granizo no se lee desde la entrada.',
      floor:
        'En Tomball la loseta y el vinil son el piso de trabajo sobre la losa nueva. La madera de una sala vieja depende de la humedad del hueco.',
      interior:
        'En Tomball el pueblo todavía tiene cocinas cerradas. En la sección nueva el cuarto ya está abierto y el drenaje nuevo espera a los cables.',
      exterior:
        'En Tomball el permiso es de la ciudad cuando la dirección está dentro del límite, y la asociación de una sección nueva suele mirar el techo.',
    },
  },
  kingwood: {
    slug: 'kingwood',
    direction: 'al noreste de la oficina',
    housing:
      'Kingwood está dentro de la ciudad de Houston, al noreste, junto a Lake Houston. Las casas son sobre todo de los setenta a los dos mil, sobre losa y bajo pinos. Las secciones tempranas suelen ser de dos pisos con una cocina más cerrada. Las posteriores abren la cocina a la sala. Los lotes son más grandes que dentro del Loop, y los techos son largos porque las casas lo son.',
    climate:
      'El terreno bajo cerca del río San Jacinto y de Lake Houston se ha inundado en tormentas tropicales pasadas. Las casas sobre pads más altos no todas recibieron esa agua. Las agujas y las ramas se quedan en los valles. La sombra guarda humedad en una pendiente norte. El granizo igual cruza la copa y moretonea el asfalto. Una fuga de ático y el agua que subió de afuera son trabajos distintos.',
    permits:
      'Kingwood está en la ciudad de Houston, y confirmamos la dirección antes de tratar el permiso como un mostrador distinto. La asociación es lo habitual y suele revisar color de techo, pintura y cercas. Un baño de adentro casi nunca es esa revisión.',
    route: `Se va al noreste por la Interestatal 69. Es el camino largo desde el oeste. No hay un local en Kingwood. ${office}`,
    more:
      'Los calentadores y las líneas del ático son una fuga común en estos dos pisos. La mancha del plafón es más chica que el aislamiento mojado. El piso de abajo y la alfombra de arriba no se tratan igual después de una fuga: lo que se quedó mojado sale, y lo nuevo espera a que la base esté seca.',
    housesNote: 'Casas de los setenta a los dos mil, sobre losa y bajo pinos, cerca del lago.',
    climateNote: 'El terreno bajo junto al San Jacinto y al lago se ha inundado. Los pinos llenan los valles.',
    kind: {
      water:
        'En Kingwood el agua del lago en un lote bajo no es el secado de un calentador en el ático de un segundo piso.',
      roof:
        'En Kingwood el techo es largo y los valles juntan agujas. Caminamos esas pendientes. Una reparación que ignora un valle lleno de ramas no es una reparación.',
      floor:
        'En Kingwood es común la alfombra arriba y la loseta o la madera abajo. Después del agua, el acolchado que se quedó mojado sale.',
      interior:
        'En Kingwood abrir la cocina temprana es una pregunta de estructura. El baño principal es grande y igual se impermeabiliza antes de la loseta.',
      exterior:
        'En Kingwood la asociación suele revisar el techo, la pintura y la cerca. Un deck se confirma antes de pedir la madera.',
    },
  },
};
