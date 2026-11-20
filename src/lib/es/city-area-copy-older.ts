import type { EsAreaCopy } from '@/lib/es/city-area-copy';

const office =
  'Salimos de nuestra oficina en el oeste de Houston (77082). Somos una empresa familiar y servimos a Houston desde 1993. Atendemos de lunes a sábado, de 8 AM a 6 PM. Llame al (713) 909-0034.';

/** Older city pages. Facts follow the English area profiles. */
export const olderEsAreaCopy: Record<string, EsAreaCopy> = {
  houston: {
    slug: 'houston',
    direction: 'al este de la oficina',
    housing:
      'Houston junta varias épocas en una sola ciudad: bungalows dentro del Loop, ranchos de la posguerra y subdivisiones nuevas sobre losa hacia el Beltway. Dentro del Loop 610 es común la casa sobre pilotes. Más afuera, la losa es lo habitual, y mucha construcción desde mediados de los ochenta lleva cables postensados en el concreto. No hay un solo plano que sirva para toda la ciudad.',
    climate:
      'La ciudad está sobre arcilla plana y drena hacia los bayous. Las calles se inundan con una lluvia fuerte. El granizo llega con las tormentas de primavera, y los sistemas tropicales traen viento y lluvia empujada. Una calle baja junto a un bayou y una losa más alta no comparten la misma historia de agua.',
    permits:
      'Houston no tiene zonificado. Algunas calles tienen restricciones que miran la fachada, y unos distritos añaden reglas de diseño histórico. El permiso depende del trabajo y de la dirección, no del apodo del vecindario. Confirmamos el mostrador antes de pedir materiales.',
    route: `El centro queda al otro lado de la ciudad, por el Westpark Tollway, Westheimer o la Interestatal 10. No hay un local en el centro. ${office}`,
    more:
      'Una dirección de Houston no es un tipo de casa. El alcance sale del edificio que visitamos: el hueco bajo un bungalow, la losa de un rancho, o los cables de una losa nueva. Medimos esta casa antes de hablar de mover un muro, un drenaje o el techo.',
    housesNote: 'Bungalows, ranchos y losas nuevas en la misma ciudad.',
    climateNote: 'Arcilla plana y bayous. El granizo y la lluvia tropical marcan techos distintos.',
    kind: {
      water:
        'En Houston el agua de un bayou en una calle baja no es el mismo secado que un tubo sobre la losa.',
      roof: 'En Houston el techo puede ser el de un bungalow o el de una losa nueva, y el granizo no se lee desde la banqueta.',
      floor:
        'En Houston el piso sobre pilotes depende del hueco. Sobre losa, el concreto tiene que estar seco y parejo.',
      interior:
        'En Houston abrir una cocina vieja es pregunta de muros y de si la casa está sobre pilotes o sobre losa.',
      exterior:
        'En Houston el permiso sigue el trabajo, y la restricción de la calle, si existe, suele mirar la fachada.',
    },
  },
  westchase: {
    slug: 'westchase',
    direction: 'al este de la oficina',
    housing:
      'Westchase es el distrito del oeste de Houston de oficinas, townhomes y casas unifamiliares a lo largo de Westheimer, Richmond y el Sam Houston Tollway. Muchas de esas casas y townhomes se levantaron de los setenta a los noventa, y de este lado de la ciudad eso suele ser losa de concreto, no un hueco bajo el piso. Un townhome con pared compartida y un rancho de la cuadra de al lado no son el mismo trabajo.',
    climate:
      'Este lado de la ciudad drena hacia el embalse Barker y los bayous de la zona. La lluvia fuerte se encharca en calles planas. El terreno bajo cerca de las pozas del embalse ha recibido agua de tormenta en ciclones pasados. Los pads más altos no todos vieron la misma agua. El granizo y el viento son los del oeste de Houston.',
    permits:
      'Westchase está en la ciudad de Houston. En muchas secciones de townhomes una asociación revisa el color de afuera y las cercas. Una cocina por dentro suele quedar fuera de esa revisión. Las calles de casas solas son menos uniformes. Confirmamos la dirección.',
    route: `La oficina queda al oeste del centro del distrito, y el camino es Westheimer o Richmond. No hay un segundo local en Westchase. ${office}`,
    more:
      'Las cocinas y los baños de estas casas a menudo ya se actualizaron una vez. Vemos los drenajes, el piso y el techo que están, no el año de la fachada. Un townhome no puede pedir metros al vecino. El rancho de al lado sí tiene otro lote, y el alcance se escribe en la visita.',
    housesNote: 'Townhomes y casas sobre losa, de los setenta a los noventa.',
    climateNote: 'El embalse Barker queda al oeste. Las calles planas se encharcan.',
    kind: {
      water:
        'En Westchase el agua cerca del embalse en un lote bajo no es el mismo secado que un calentador en un townhome.',
      roof: 'En Westchase el techo de un townhome y el de un rancho de un piso se caminan por separado. La calle no enseña el valle.',
      floor:
        'En Westchase el piso nuevo va sobre losa. Si el concreto tiene un lomo, el vinil lo enseña y la alfombra lo escondía.',
      interior:
        'En Westchase mover el fregadero es cortar la losa del townhome o de la casa, no abrir un hueco bajo el piso.',
      exterior:
        'En Westchase la asociación del townhome, donde existe, suele mirar el color y la cerca. El permiso es de Houston.',
    },
  },
  alief: {
    slug: 'alief',
    direction: 'al sur de la oficina',
    housing:
      'Alief es la comunidad del suroeste de Houston a lo largo de Bellaire Boulevard, al sur de la oficina, de ranchos y casas de dos pisos. La mayoría data de los setenta a los noventa y está sobre losa. Las cocinas y los baños se actualizaron por partes, así que un cuarto puede mezclar décadas: gabinetes de una, cubierta de otra y piso de otra. No lo tratamos como un paquete único.',
    climate:
      'Keegans Bayou y el drenaje más amplio de Brays Bayou cruzan este suroeste. La lluvia fuerte inunda calles, y algunas cuadras bajas han recibido agua de tormenta. Otras solo se encharcan. Una fuga de suministro y el agua que subió de afuera no se secan igual.',
    permits:
      'Alief es parte de Houston, no una alcaldía aparte. En unas subdivisiones hay asociación y en otras no. El permiso, cuando el trabajo lo pide, es de la ciudad de Houston. Confirmamos la calle antes de asumir una revisión.',
    route: `Desde la oficina se baja por Bellaire Boulevard o Beechnut hasta Dairy Ashford. El camino es corto. No hay un local en Alief. ${office}`,
    more:
      'Los lotes son de suburbio y casi siempre hay entrada para dejar materiales, cosa que una calle dentro del Loop no siempre permite. La casa al sur de 77082 es el alcance. Medimos la losa, el techo y el cuarto que está, no el nombre de Alief.',
    housesNote: 'Ranchos y casas de dos pisos de los setenta a los noventa, sobre losa.',
    climateNote: 'Keegans Bayou y Brays Bayou cruzan el suroeste. Las calles bajas se inundan.',
    kind: {
      water:
        'En Alief el agua de un bayou en una cuadra baja no es la misma visita que un tubo sobre la losa.',
      roof: 'En Alief el techo de asfalto está en uno o dos pisos, y el granizo no se decide desde Bellaire Boulevard.',
      floor:
        'En Alief el vinil y la loseta van sobre una losa de esas décadas. El concreto tiene que estar seco antes del piso nuevo.',
      interior:
        'En Alief la cocina a menudo se actualizó por partes. Mover el fregadero es cortar la losa, no copiar el cuarto de al lado.',
      exterior:
        'En Alief la asociación, si la sección tiene una, no es la regla de toda la comunidad. El permiso es de Houston.',
    },
  },
  'energy-corridor': {
    slug: 'energy-corridor',
    direction: 'al norte de la oficina',
    housing:
      'El Energy Corridor es el distrito de la Interestatal 10 en el lado oeste, con casas, townhomes y apartamentos entre las torres de oficinas. El inventario mezcla casas de los sesenta y setenta, townhomes posteriores y obra nueva en lotes viejos. La losa es la cimentación normal. Un townhome y una casa sola, a una cuadra, no comparten el alcance.',
    climate:
      'Terry Hershey Park y Buffalo Bayou cruzan el distrito. El terreno bajo junto al bayou se ha inundado en tormentas tropicales pasadas, incluso cuando los embalses de aguas arriba soltaron agua. Las calles más altas no todas vieron lo mismo. El granizo y el viento marcan techos de uno y dos pisos.',
    permits:
      'Muchas comunidades de townhomes tienen una asociación que revisa cambios exteriores. Una cocina dentro de la casa suele quedar fuera de esa revisión. El distrito está en Houston. No hay un mostrador del nombre Energy Corridor.',
    route: `La oficina queda al sur del corredor, por la Highway 6 hacia la Interestatal 10. No hay un showroom en el corredor. ${office}`,
    more:
      'El nombre del distrito no elige el trabajo. Vemos si la pared es compartida, si el drenaje se puede quedar en su lugar y si el techo es el de un townhome estrecho o el de una casa de los sesenta. La visita es en la propiedad.',
    housesNote: 'Casas de los sesenta y setenta, townhomes y obra nueva, sobre losa.',
    climateNote: 'Buffalo Bayou cruza el distrito. El terreno bajo se ha inundado.',
    kind: {
      water:
        'En el Energy Corridor el agua del bayou en un lote bajo no es el secado de un calentador en un townhome.',
      roof: 'En el Energy Corridor el techo del townhome y el de la casa de los sesenta se inspeccionan en esa dirección, no desde la Interestatal 10.',
      floor:
        'En el Energy Corridor el piso va sobre losa. Un townhome no esconde un lomo debajo de la alfombra si el vinil va a enseñarlo.',
      interior:
        'En el Energy Corridor la cocina del townhome no crece hacia el vecino. En la casa sola, el muro se revisa antes de abrirlo.',
      exterior:
        'En el Energy Corridor la asociación del townhome suele mirar la fachada. El permiso, cuando hace falta, es de Houston.',
    },
  },
  katy: {
    slug: 'katy',
    direction: 'al oeste de la oficina',
    housing:
      'Katy es un centro viejo y una franja ancha de comunidades planeadas a lo largo de la Interestatal 10 y el Grand Parkway. Las casas nuevas son planos abiertos de dos pisos sobre losa, y esta época suele ser postensada, con cables en el concreto. El centro viejo no es la misma construcción. El centro de Katy y una sección nueva junto al Grand Parkway salen como Katy en el mapa y no son la misma casa.',
    climate:
      'Los estanques de detención ayudan con una lluvia ordinaria, pero las calles bajas igual se inundan en una tormenta grande. Las secciones junto a un arroyo han recibido agua de tormenta. El granizo de primavera y el viento marcan techos grandes y recortados, incluidos los planos del garaje que la fachada esconde.',
    permits:
      'Katy da permisos dentro de su límite, y muchas direcciones de las secciones planeadas caen en condado sin incorporar, entre Harris, Fort Bend y Waller. La asociación es habitual en esas secciones y suele revisar techo, cercas, pintura y a veces la entrada. Casi nunca gobierna los gabinetes de adentro.',
    route: `Se va al oeste por la Interestatal 10 o el Westpark Tollway. No hay una segunda oficina en Katy. ${office}`,
    more:
      'Los lotes son de suburbio y la entrada suele aceptar un contenedor o una placa, más fácil que una calle dentro del Loop. En una losa postensada, mover un drenaje empieza por localizar los cables. Si la regadera se queda en su lugar, el concreto puede quedarse intacto.',
    housesNote: 'Centro viejo y casas nuevas de dos pisos, a menudo sobre losa postensada.',
    climateNote: 'Las calles bajas y los arroyos se inundan en una tormenta grande. El granizo marca techos grandes.',
    kind: {
      water:
        'En Katy una fuga de ático en un dos pisos nuevo no es el agua que subió en una sección junto al arroyo.',
      roof: 'En Katy el techo es grande y la asociación de la sección, si la hay, suele tener una palabra sobre el color.',
      floor:
        'En Katy el piso de abajo suele ser loseta o vinil sobre losa. El concreto postensado no se corta para esconder un lomo.',
      interior:
        'En Katy la cocina nueva ya está abierta. En el centro viejo el cuarto puede seguir cerrado y la losa puede ser otra.',
      exterior:
        'En Katy un deck o una cerca en una sección planeada espera a la asociación además del permiso de la ciudad o del condado.',
    },
  },
  'sugar-land': {
    slug: 'sugar-land',
    direction: 'al sur de la oficina',
    housing:
      'Sugar Land es la ciudad de Fort Bend de vecindarios planeados, desde First Colony, con un núcleo más viejo ligado al sitio de Imperial Sugar y a Town Square. La casa común es un plano de dos pisos de los ochenta a los dos mil diez, sobre losa. Las más nuevas a menudo son postensadas. Las cocinas y los baños principales se construyeron como cuartos grandes. First Colony y una sección posterior son Sugar Land, y el techo se camina en esa dirección.',
    climate:
      'El drenaje va hacia Oyster Creek y, más al oeste, el Brazos. Unos vecindarios quedan más cerca de una zona de inundación que otros. Los estanques toman una lluvia ordinaria. El granizo y el viento marcan techos de dos aguas repetidos, y desde la calle no se ven todos los planos.',
    permits:
      'La ciudad da sus propios permisos. Las asociaciones están extendidas y suelen revisar materiales de afuera, el color del techo y las estructuras del patio. Los gabinetes de adentro suelen ser elección de la casa. Un permiso de Houston no cubre esta dirección.',
    route: `Se baja por la Highway 6 o el Fort Bend Tollway hacia Town Square. No hay un local en Sugar Land. ${office}`,
    more:
      'Las calles de las secciones planeadas suelen dar espacio a una cuadrilla, a diferencia de una cuadra de bungalows dentro del Loop. La arcilla de Fort Bend se mueve con la humedad. Medimos la casa en lugar de copiar el modelo de al lado. Una regadera grande igual se impermeabiliza antes de la loseta.',
    housesNote: 'Casas de dos pisos de los ochenta en adelante, sobre losa, a menudo postensada.',
    climateNote: 'Oyster Creek y el Brazos marcan el agua. El granizo pega en techos repetidos.',
    kind: {
      water:
        'En Sugar Land el agua cerca del arroyo no es la misma visita que un calentador o una línea del ático.',
      roof: 'En Sugar Land el color del techo suele pasar por la asociación. Caminamos los planos que la fachada no enseña.',
      floor:
        'En Sugar Land el piso de la planta baja va sobre losa. El postensado no es una razón para flotar un piso sobre un lomo.',
      interior:
        'En Sugar Land la cocina ya se hizo grande y abierta. Mover un drenaje espera a que se localicen los cables.',
      exterior:
        'En Sugar Land el permiso es de la ciudad, y la asociación suele mirar el techo, la pintura y el patio.',
    },
  },
  bellaire: {
    slug: 'bellaire',
    direction: 'al este de la oficina',
    housing:
      'Bellaire es su propia ciudad a ambos lados del West Loop, con casas de mediados de siglo y una larga tanda de demoliciones y casas nuevas en lotes chicos. Las casas viejas pueden estar sobre pilotes o sobre losas tempranas, y una casa reconstruida suele ser losa nueva. A veces una adición junta las dos. Los cuartos de las casas viejas a menudo no están a escuadra.',
    climate:
      'Brays Bayou corre junto a la zona, y partes de Bellaire se han inundado en tormentas tropicales. Las cuadras más lejos del bayou no todas recibieron la misma agua. El granizo y el viento pegan en techos de casas bajas y de las reconstrucciones, bajo árboles maduros.',
    permits:
      'La ciudad tiene zonificado y sus propios permisos, distinto de Houston al lado. El código de la ciudad puede tocar lo que se ve desde la calle. Una cocina por dentro es otra pregunta. Confirmamos la dirección porque el mostrador no es el de Houston.',
    route: `Se va al este por el Westpark Tollway o Bellaire Boulevard hasta el ayuntamiento. No hay un local en Bellaire. ${office}`,
    more:
      'Los lotes son justos. Un contenedor, una pila de madera o una placa de piedra tiene que caber en una entrada corta y una calle estrecha. Medimos antes de hablar de mover un muro. La moldura vieja entra en el trabajo si el resto del contramarco se queda.',
    housesNote: 'Casas de mediados de siglo y reconstrucciones en lotes chicos.',
    climateNote: 'Brays Bayou ha inundado unas cuadras. Los árboles maduros caen en los valles.',
    kind: {
      water:
        'En Bellaire el agua del bayou en una cuadra baja no es el secado de un tubo en una casa reconstruida.',
      roof: 'En Bellaire el techo de la casa vieja y el de la reconstrucción se cotizan en esa dirección, con el árbol de encima.',
      floor:
        'En Bellaire el piso de una casa sobre pilotes depende del hueco. En la losa nueva, el concreto tiene que estar seco.',
      interior:
        'En Bellaire los cuartos viejos no están a escuadra. Mover un muro se dice después de medir, no desde la fachada nueva de al lado.',
      exterior:
        'En Bellaire el permiso es de la ciudad, y lo que se ve desde la calle puede entrar en ese código.',
    },
  },
  memorial: {
    slug: 'memorial',
    direction: 'al este de la oficina',
    housing:
      'Memorial es la zona de lotes grandes a lo largo de Memorial Drive, entre el Energy Corridor y el Loop, de casas de dos pisos más que de bungalows. Las casas suelen ser de los cincuenta a los ochenta, con renovaciones y algunas reconstrucciones. La losa es la construcción habitual. Los techos y los baños principales son más grandes que en un rancho de un piso.',
    climate:
      'Los encinos maduros sombrean muchos de estos techos. Las ramas, las hojas en los valles y la sombra húmeda entran en cualquier conversación del techo. El terreno bajo junto a Buffalo Bayou se ha inundado cuando el bayou subió. Las casas más altas de la misma calle no necesariamente recibieron agua.',
    permits:
      'Gran parte de Memorial está en la ciudad de Houston. Bunker Hill, Piney Point y Hunters Creek son ciudades aparte, al lado, con sus propios permisos. Unas calles añaden restricciones privadas sobre la fachada. El trabajo interior suele ser otra pregunta, distinta de un techo nuevo.',
    route: `Se va por Memorial Drive o la Interestatal 10 hacia Memorial City. No hay un local en Memorial. ${office}`,
    more:
      'Una casa de Memorial no se cotiza como un rancho. El caballete es más largo, el baño principal es más grande y el acceso bajo los encinos cambia cómo se baja un techo. Medimos el lote y la casa. La sombra no sustituye una inspección.',
    housesNote: 'Casas grandes de dos pisos, de los cincuenta a los ochenta, sobre losa.',
    climateNote: 'Buffalo Bayou ha inundado el terreno bajo. Los encinos sombrean los techos.',
    kind: {
      water:
        'En Memorial el agua del bayou en un lote bajo no es la fuga del ático en una casa más alta de la misma calle.',
      roof: 'En Memorial el techo es grande y los encinos tiran ramas en los valles. Desde Memorial Drive no se decide.',
      floor:
        'En Memorial el piso de abajo va sobre losa. La madera de una sala se aclimata en la casa, y el concreto mojado no se tapa.',
      interior:
        'En Memorial el baño principal y la cocina son cuartos grandes. Mover un drenaje es cortar la losa, y lo decimos después de verla.',
      exterior:
        'En Memorial la restricción, donde existe, suele mirar la fachada. El permiso puede ser de Houston o de un pueblo vecino.',
    },
  },
  'spring-branch': {
    slug: 'spring-branch',
    direction: 'al noreste de la oficina',
    housing:
      'Spring Branch queda al oeste del Loop, a lo largo de Long Point, una mezcla de ranchos de la posguerra y townhomes nuevos. Los ranchos viejos son una época de transición: unos sobre pilotes, muchos sobre losas tempranas, y adiciones que pueden no coincidir con la cimentación original. La obra nueva suele ser losa. Las cocinas de los ranchos a menudo siguen siendo el cuarto cerrado de la posguerra, salvo que una remodelación posterior las abriera.',
    climate:
      'La arcilla y el drenaje plano son los mismos del lado oeste. La lluvia se encharca. El granizo y el viento marcan techos bajos de rancho y techos de townhome. Vemos el piso y la pendiente en la casa, no un mapa del vecindario.',
    permits:
      'Está dentro de la ciudad de Houston. Unas subdivisiones tienen restricciones. No hay una sola asociación de Spring Branch. El permiso sigue el trabajo en esa dirección.',
    route: `Se toma la Interestatal 10 hacia Gessner, hasta Long Point. No hay un local en Spring Branch. ${office}`,
    more:
      'Los lotes van del rancho original al pad de un townhome. El acopio de materiales sigue el que sea esta dirección. No prometemos abrir la cocina hasta ver si el muro carga y si la cimentación es la original o la de una adición.',
    housesNote: 'Ranchos de la posguerra y townhomes nuevos, con cimentación mixta.',
    climateNote: 'Arcilla plana del lado oeste. El granizo marca techos bajos y de townhome.',
    kind: {
      water:
        'En Spring Branch una fuga bajo un rancho sobre pilotes no se busca igual que un suministro en un townhome sobre losa.',
      roof: 'En Spring Branch el techo del rancho y el del townhome nuevo son dos visitas. La calle no los iguala.',
      floor:
        'En Spring Branch el piso del rancho puede ir sobre losa temprana o sobre hueco. Lo vemos antes de pedir tablas.',
      interior:
        'En Spring Branch la cocina del rancho a menudo sigue cerrada. Abrirla es pregunta de estructura, no de un plano de townhome.',
      exterior:
        'En Spring Branch el permiso es de Houston, y la restricción, si la calle tiene una, no es una asociación de todo el vecindario.',
    },
  },
  'the-heights': {
    slug: 'the-heights',
    direction: 'al este de la oficina',
    housing:
      'The Heights es el vecindario al norte del centro, de bungalows y cottages de principios del siglo veinte hasta los cuarenta, más casas y townhomes nuevos. Las casas viejas suelen estar sobre pilotes, con un hueco debajo. Ese hueco puede hacer más directo mover un tubo que cortar una losa, y los muros viejos igual deciden si la cocina se puede abrir. Los cuartos son chicos, la moldura a menudo es original y las paredes no están a escuadra.',
    climate:
      'Las calles cerca de White Oak Bayou se han inundado. Gran parte de la retícula de bungalows queda fuera de la orilla más baja. El viento, el granizo y la lluvia pegan en techos viejos, buhardillas y porches. Las calles estrechas cambian cómo se entrega el material y cómo se coloca una lona.',
    permits:
      'Partes de The Heights están en un distrito histórico de la ciudad de Houston. En esas cuadras, los cambios exteriores siguen las reglas del distrito. Los muebles de adentro casi nunca. El permiso de Houston se confirma cuando se mueven tubos, cables o estructura.',
    route: `El viaje desde el oeste es cruzar la ciudad por la Interestatal 10 y después al norte del centro, hacia la calle 19 y Yale. No hay un local en The Heights. ${office}`,
    more:
      'El trabajo nuevo o empata la moldura o se ve pegado. Medimos antes de prometer que un muro o el fregadero se pueden mover. El viaje es largo y la casa de la cuadra sigue siendo el alcance. Un townhome nuevo de al lado no presta su plano al bungalow.',
    housesNote: 'Bungalows sobre pilotes, más obra nueva, en calles estrechas.',
    climateNote: 'White Oak Bayou ha inundado las calles bajas. Los techos viejos filtran en los valles.',
    kind: {
      water:
        'En The Heights una fuga en el hueco del bungalow no es el agua del bayou en la calle más baja.',
      roof: 'En The Heights el porche, la buhardilla y el valle se fotografían. El frente puede verse bien mientras eso mete lluvia.',
      floor:
        'En The Heights el pino original depende de que el hueco no siga húmedo. Se puede lijar si las tablas tienen espesor.',
      interior:
        'En The Heights abrir la cocina mete la estructura y la moldura en el plan. Los muros viejos no están a escuadra.',
      exterior:
        'En The Heights el distrito histórico, donde la cuadra está dentro, mira la fachada. El permiso es de Houston.',
    },
  },
  'river-oaks': {
    slug: 'river-oaks',
    direction: 'al este de la oficina',
    housing:
      'River Oaks es el vecindario de casas grandes dentro del Loop, con cuartos formales y más moldura que un plano de suburbio. Las casas viejas a menudo están sobre pilotes. La construcción posterior y las adiciones pueden estar sobre losa. Los lotes son profundos y los techos son grandes, con árboles maduros encima. La moldura nueva o empata la casa o se lee como un añadido.',
    climate:
      'Buffalo Bayou es el borde norte. Las secciones bajas cerca del bayou tienen otra historia de inundación que las casas en medio del vecindario. El granizo, el viento y las ramas caen en techos largos. Desde el boulevard no se ven los valles bajo los árboles.',
    permits:
      'Las restricciones privadas son parte del vecindario y suelen cuidar lo que la calle ve. Un baño por dentro es un proyecto distinto de una fachada nueva. El permiso, cuando el trabajo lo pide, es de Houston. Confirmamos la dirección.',
    route: `Se va al este por Westheimer o San Felipe hacia River Oaks Boulevard y Kirby. No hay un local en River Oaks. ${office}`,
    more:
      'Meter un contenedor en una calle interior estrecha, con encinos viejos, se planea en la visita. El caballete es largo y las penetraciones son muchas. Cotizamos la casa que subimos, incluida la altura y el acceso, no el nombre del boulevard.',
    housesNote: 'Casas grandes y formales, sobre pilotes o losa, en lotes profundos.',
    climateNote: 'Buffalo Bayou es el borde norte. Los árboles cubren techos largos.',
    kind: {
      water:
        'En River Oaks el agua del bayou en un lote bajo no es una fuga bajo el piso de una casa en medio del vecindario.',
      roof: 'En River Oaks el techo es grande y los árboles tapan los valles. La inspección no se hace desde Kirby.',
      floor:
        'En River Oaks la madera de los cuartos formales depende del hueco, si la casa está sobre pilotes, o de una losa seca si la adición es nueva.',
      interior:
        'En River Oaks la moldura entra en el plan. Un gabinete que ignora el contramarco se ve de otra casa.',
      exterior:
        'En River Oaks la restricción suele mirar lo que se ve desde la calle. El permiso de la estructura es de Houston.',
    },
  },
  'west-university': {
    slug: 'west-university',
    direction: 'al este de la oficina',
    housing:
      'West University Place es su propia ciudad zonificada dentro del Loop, junto a Rice Village, con lotes chicos, cottages viejos y muchas casas reconstruidas. Las casas originales pueden estar sobre pilotes. Las reconstrucciones suelen ser losa. Las cocinas y los medios baños se quedan compactos aunque la casa nueva sea más grande que el cottage que reemplazó. Los cuartos viejos no están a escuadra.',
    climate:
      'La ciudad queda cerca de Brays Bayou. La historia de inundación es cuadra por cuadra, no un solo relato de West University. El granizo y el viento pegan bajo árboles maduros, en techos de cottages y de casas nuevas.',
    permits:
      'La ciudad da sus propios permisos, aparte de Houston. El trabajo exterior sigue ese código. La moldura interior vieja vale la pena empatarla cuando todavía pertenece a la casa. Un permiso de Houston no cubre esta dirección.',
    route: `Se va al este por el Westpark Tollway. Las calles son justas. No hay un local en West University. ${office}`,
    more:
      'Una entrega tiene que caber en el lote, en el techo igual que en una placa de piedra. Medir un cottage no es medir la casa que lo reemplazó. Lo decimos en la visita, antes de pedir gabinetes o de prometer que un muro se mueve.',
    housesNote: 'Cottages y casas reconstruidas en lotes chicos, dentro del Loop.',
    climateNote: 'Brays Bayou queda cerca. La inundación cambia de una cuadra a la otra.',
    kind: {
      water:
        'En West University el agua del bayou en una cuadra no es la fuga del cottage de la cuadra de atrás.',
      roof: 'En West University el techo del cottage y el de la casa nueva se cotizan con el árbol y la calle estrecha.',
      floor:
        'En West University el piso del cottage depende del hueco. En la reconstrucción, la losa tiene que estar seca y pareja.',
      interior:
        'En West University la cocina se queda compacta. Los muros viejos no están a escuadra, y la casa nueva es otra medida.',
      exterior:
        'En West University el permiso es de la ciudad, no de Houston, y el exterior sigue ese código.',
    },
  },
  'galleria-area': {
    slug: 'galleria-area',
    direction: 'al este de la oficina',
    housing:
      'La zona del Galleria, alrededor de Post Oak y Westheimer, mezcla townhomes, casas viejas y calles de torres. No es un suburbio de un solo plano. Las casas y los townhomes son sobre todo de la época de la losa, del inventario de mediados de siglo a la obra nueva. Los lotes que todavía tienen casa son más chicos que los de Memorial.',
    climate:
      'El viento, el granizo y la lluvia fuerte son el clima de la región. Preguntamos por dónde ha entrado el agua a este edificio. Un techo de townhome entre comercios no se lee desde Westheimer.',
    permits:
      'Esto es territorio de la ciudad de Houston. Una asociación de townhomes es común. Una calle de casas solas cerca puede tener solo restricciones, o ninguna que se vea desde la banqueta. La asociación suele mirar el exterior.',
    route: `Se va al este por Westheimer hasta el Galleria. Dejar un contenedor comparte la calle con un distrito comercial. No hay un local aquí. ${office}`,
    more:
      'El trabajo interior a menudo es en un townhome: pared compartida, asociación en el exterior y un plano que no puede pedir los metros del vecino. Medimos el cuarto que está. El nombre del centro comercial no elige el alcance.',
    housesNote: 'Townhomes y casas sobre losa, entre calles comerciales.',
    climateNote: 'Granizo, viento y lluvia fuerte. El techo no se ve desde Westheimer.',
    kind: {
      water:
        'En el Galleria el agua en un townhome se sigue de unidad en unidad. No secamos el edificio entero por un techo manchado.',
      roof: 'En el Galleria el techo del townhome se camina en esa dirección. La banqueta comercial no lo enseña.',
      floor:
        'En el Galleria el piso va sobre losa. La altura en la puerta del townhome se mide antes de poner loseta o vinil.',
      interior:
        'En el Galleria la cocina del townhome no crece hacia el vecino. La pared compartida se queda en el plan.',
      exterior:
        'En el Galleria la asociación del townhome suele mirar la fachada. El permiso es de Houston.',
    },
  },
  'upper-kirby': {
    slug: 'upper-kirby',
    direction: 'al este de la oficina',
    housing:
      'Upper Kirby corre a lo largo de Kirby Drive, dentro del Loop, una mezcla de casas viejas, townhomes nuevos y lotes chicos entre River Oaks y la zona de Rice. La cimentación cambia con la edad del edificio. Las casas viejas pueden estar sobre pilotes. Los townhomes y las reconstrucciones suelen ser losa. Los cuartos viejos son modestos. Los townhomes nuevos son altos y estrechos. Son problemas distintos de escalera y de moldura.',
    climate:
      'El viento, el granizo y la lluvia son los de adentro del Loop. Los árboles y el estacionamiento justo cambian las entregas. Un techo viejo con valles parchados puede filtrar mientras la pendiente principal se ve tranquila.',
    permits:
      'Es la ciudad de Houston. Unas calles tienen restricciones. Las asociaciones de townhomes, donde existen, suelen mirar lo que se ve desde la calle. El trabajo interior suele quedar fuera de eso.',
    route: `Desde la oficina se cruza por Westheimer, pasando el Galleria, hasta Kirby y Westheimer. No hay un local en Upper Kirby. ${office}`,
    more:
      'El acopio de material se planea en la visita, no desde una entrada de suburbio. El alcance sigue siendo el edificio sobre Kirby o la calle de al lado. No usamos el plano del townhome alto para la casa vieja de pilotes.',
    housesNote: 'Casas viejas sobre pilotes y townhomes altos sobre losa.',
    climateNote: 'Lluvia y granizo dentro del Loop. Los valles viejos filtran primero.',
    kind: {
      water:
        'En Upper Kirby una fuga bajo la casa vieja no se busca igual que un suministro en el townhome de losa.',
      roof: 'En Upper Kirby el techo de la casa baja y el del townhome estrecho se cotizan por separado.',
      floor:
        'En Upper Kirby el piso de la casa vieja depende del hueco. En el townhome, la losa tiene que estar seca.',
      interior:
        'En Upper Kirby la moldura de la casa vieja entra en el plan. El townhome es otra escalera y otro cuarto.',
      exterior:
        'En Upper Kirby la asociación del townhome, si la hay, suele mirar la fachada. El permiso es de Houston.',
    },
  },
  'rice-village': {
    slug: 'rice-village',
    direction: 'al este de la oficina',
    housing:
      'Rice Village son las calles comerciales cerca de Rice Boulevard y Kirby, rodeadas de bungalows y cottages viejos y de algo de obra nueva. Las casas viejas suelen estar sobre pilotes, con moldura original y cuartos que no se construyeron como un solo espacio abierto. La obra nueva de al lado puede ser un townhome sobre losa. Las cocinas a menudo siguen chicas.',
    climate:
      'Brays Bayou no queda lejos, al sur. La exposición a inundación es desigual entre estas cuadras. El granizo y la lluvia pegan en techos de cottage. Las entregas compiten con el tráfico del Village.',
    permits:
      'Esto es Houston, cerca de West University pero no es la misma alcaldía. Muchas cuadras tienen un carácter viejo sin estar en un distrito histórico formal. Lo comprobamos antes de un trabajo exterior. El permiso de Houston se confirma en la dirección.',
    route: `Se va por el Westpark Tollway o la US 59. El acopio se planea para el lote del cottage, no para un cierre de calle. No hay un local en el Village. ${office}`,
    more:
      'Un gabinete nuevo que ignora el contramarco se ve llegado de otra casa. Si la moldura se queda, se empata. Medimos los muros chuecos antes de prometer que la cocina se abre. El townhome de al lado no es el plano.',
    housesNote: 'Cottages sobre pilotes y algo de obra nueva, junto a las calles comerciales.',
    climateNote: 'Brays Bayou queda al sur. La inundación no es pareja entre cuadras.',
    kind: {
      water:
        'En Rice Village una fuga en el hueco del cottage no es el agua del bayou en la cuadra más baja.',
      roof: 'En Rice Village el techo del cottage se camina con el árbol y la calle ocupada. El comercio de abajo no lo enseña.',
      floor:
        'En Rice Village el pino del cottage depende del hueco. El vinil aparece en la cocina y en el townhome, cuando la base está seca.',
      interior:
        'En Rice Village la cocina sigue chica y la moldura entra en el plan. Los muros no están a escuadra.',
      exterior:
        'En Rice Village el permiso es de Houston. Comprobamos la cuadra antes de tratar el exterior como distrito histórico.',
    },
  },
  'medical-center': {
    slug: 'medical-center',
    direction: 'al este de la oficina',
    housing:
      'La zona del Centro Médico son los vecindarios junto al Texas Medical Center: casas y townhomes de mediados de siglo y posteriores, más apartamentos. La losa es la norma. Las casas son casas de familia, aunque el campus médico quede al lado. Un rancho de mediados de siglo y un townhome posterior no comparten el plano.',
    climate:
      'La zona está en Houston, cerca de Brays Bayou. Unas cuadras residenciales tienen historia de inundación. Otras son losas viejas con desgaste ordinario. El granizo y la lluvia marcan techos bajos. Preguntamos qué vio esta dirección.',
    permits:
      'Es Houston. Las asociaciones de townhomes aparecen en la construcción posterior. Un rancho unifamiliar de mediados de siglo casi nunca tiene un comité de diseño. El permiso sigue el trabajo.',
    route: `Desde la oficina se sigue el tollway o la US 59 hacia Holcombe. La visita es la casa, no el campus. No hay un local en el Centro Médico. ${office}`,
    more:
      'El estacionamiento y los lotes justos cerca de los hospitales cambian dónde puede sentarse un contenedor. Lo planeamos en la dirección. No secamos un complejo entero por un techo manchado. Anotamos las unidades que de verdad están mojadas.',
    housesNote: 'Casas de mediados de siglo sobre losa, townhomes y apartamentos.',
    climateNote: 'Brays Bayou queda cerca. Unas cuadras se inundaron y otras no.',
    kind: {
      water:
        'En el Centro Médico el agua del bayou en una cuadra no es la fuga de un rancho que nunca vio esa agua.',
      roof: 'En el Centro Médico el techo del rancho y el del townhome se inspeccionan en esa dirección, no desde Holcombe.',
      floor:
        'En el Centro Médico el piso va sobre losa. El concreto mojado no se tapa con vinil ni con loseta.',
      interior:
        'En el Centro Médico la cocina del rancho puede seguir cerrada. El townhome no pide metros al vecino.',
      exterior:
        'En el Centro Médico la asociación, si el townhome tiene una, suele mirar la fachada. El permiso es de Houston.',
    },
  },
  'bunker-hill': {
    slug: 'bunker-hill',
    direction: 'al este de la oficina',
    housing:
      'Bunker Hill Village es uno de los pueblos de Memorial, una ciudad independiente de casas grandes en lotes arbolados al oeste del Loop. Las casas son sobre todo de losa, del crecimiento de la posguerra del pueblo hasta reconstrucciones posteriores. Los techos son grandes. Las suites principales son amplias. No es un bungalow.',
    climate:
      'Los encinos sobre el techo son normales. Quitar un techo tiene que lidiar con el acceso bajo esas ramas y con los valles de una casa más grande que un rancho. Buffalo Bayou y el drenaje mayor de Memorial quedan cerca. El nombre del pueblo no dice la elevación de un lote.',
    permits:
      'La ciudad da sus propios permisos, aparte de Houston. La cubierta de árboles y las reglas del pueblo entran en el plan de un techo, de siding o de un cambio que se ve desde la calle. El trabajo interior sigue el código del edificio. La revisión del pueblo apunta a lo que ven la calle y los árboles.',
    route: `Se va por Memorial Drive o la Interestatal 10. No hay un local en Bunker Hill. ${office}`,
    more:
      'Cotizamos el caballete que subimos, no un rancho de otra calle. La sombra guarda humedad y tira ramas en los valles. Eso se inspecciona. Mover un drenaje en estas losas se dice después de ver el concreto.',
    housesNote: 'Casas grandes sobre losa, en lotes arbolados del pueblo.',
    climateNote: 'Encinos sobre techos grandes. El bayou queda cerca y el lote manda.',
    kind: {
      water:
        'En Bunker Hill el agua del bayou en un lote bajo no es la fuga de una casa más alta del mismo pueblo.',
      roof: 'En Bunker Hill el techo es grande y los encinos tapan los valles. La inspección no cabe en una mirada desde la calle.',
      floor:
        'En Bunker Hill el piso va sobre losa. Un lomo del concreto se ve en el vinil y en la loseta grande.',
      interior:
        'En Bunker Hill el baño principal es grande. La loseta espera a la impermeabilización, y el drenaje se confirma antes de moverlo.',
      exterior:
        'En Bunker Hill el permiso es del pueblo, no de Houston, y lo que se ve desde la calle entra en esa revisión.',
    },
  },
  'piney-point': {
    slug: 'piney-point',
    direction: 'al este de la oficina',
    housing:
      'Piney Point Village es una ciudad pequeña e independiente de casas en lotes grandes, al oeste del Loop, entre los otros pueblos de Memorial. Las casas son grandes, a menudo con planos de techo largos y baños principales amplios, sobre las losas típicas de este lado oeste. Las reconstrucciones posteriores son todavía más grandes.',
    climate:
      'Los árboles maduros y las entradas largas cambian el acopio. Una cuadrilla de techo y una entrega de piedra tienen que caber en el lote que vemos. Más planos de techo y más penetraciones significan más flashings que revisar. El cielo es el de Memorial. El techo es más grande.',
    permits:
      'Los permisos salen del pueblo. Unas propiedades añaden restricciones privadas encima del código. El trabajo interior es sobre todo del dueño y del código. Confirmamos la dirección antes de tratarla como Houston.',
    route: `Se va por Memorial Drive. Agendamos Piney Point desde el oeste. No hay un local en el pueblo. ${office}`,
    more:
      'El alcance es la casa de ese lote, incluida la longitud del caballete. No cotizamos un techo de rancho y lo estiramos. La visita mide el acceso, los valles y el baño que está.',
    housesNote: 'Casas grandes de lote amplio, sobre losa, con techos largos.',
    climateNote: 'Árboles maduros y techos con muchos planos. El granizo no se lee desde la entrada.',
    kind: {
      water:
        'En Piney Point una fuga de ático en una casa grande no se asume igual que el agua que subió en otro lote.',
      roof: 'En Piney Point el techo tiene más planos y más penetraciones. Se camina. La entrada larga no lo enseña.',
      floor:
        'En Piney Point el piso de la planta baja va sobre losa. El concreto se mide antes de una loseta grande.',
      interior:
        'En Piney Point el baño principal es amplio. Impermeabilizar va antes de la loseta, y el drenaje se confirma en la casa.',
      exterior:
        'En Piney Point el permiso es del pueblo, y una restricción privada puede mirar además lo que se ve desde la calle.',
    },
  },
  'hunters-creek': {
    slug: 'hunters-creek',
    direction: 'al este de la oficina',
    housing:
      'Hunters Creek Village es el pueblo de Memorial a lo largo de Memorial Drive y Voss, una ciudad independiente de casas grandes bajo árboles maduros. El patrón es casa sobre losa con techo grande, de construcciones de mediados de siglo a renovaciones posteriores. Los árboles y los retiros son parte del lote. No son bungalows.',
    climate:
      'La sombra guarda humedad en el techo y tira escombros en los valles. Eso es parte de la inspección. El viento y el granizo marcan esos planos grandes. Buffalo Bayou queda en la geografía de Memorial, y la elevación se confirma en el lote, no en el nombre del pueblo.',
    permits:
      'El pueblo da los permisos. Los materiales de afuera también pueden caer bajo restricciones. La remodelación interior es sobre todo del dueño y del código. Un permiso de Houston no cubre esta dirección.',
    route: `Desde la oficina se sigue Memorial Drive o San Felipe. El tráfico cambia la hora. No cambia el techo. No hay un local en Hunters Creek. ${office}`,
    more:
      'El acopio, el contenedor y la longitud del caballete se miden en la casa que tenemos enfrente. Una entrega de piedra y una cuadrilla de techo tienen que caber en el lote arbolado. Lo vemos antes de pedir material.',
    housesNote: 'Casas grandes bajo árboles, sobre losa, en el pueblo de Memorial.',
    climateNote: 'La sombra y las ramas marcan los valles. El granizo pega en techos grandes.',
    kind: {
      water:
        'En Hunters Creek el agua de un lote bajo no es la fuga de ático de una casa que el bayou no tocó.',
      roof: 'En Hunters Creek el techo es grande y la sombra esconde los valles. Se camina, no se juzga desde Voss.',
      floor:
        'En Hunters Creek el piso va sobre losa. No tapamos concreto mojado con vinil ni con madera.',
      interior:
        'En Hunters Creek el baño y la cocina son de una casa grande. El drenaje se confirma antes de prometer que se mueve.',
      exterior:
        'En Hunters Creek el permiso es del pueblo, y el exterior puede caer también bajo una restricción.',
    },
  },
  'bear-creek': {
    slug: 'bear-creek',
    direction: 'al norte de la oficina',
    housing:
      'Bear Creek es el vecindario del oeste de Houston junto a Bear Creek Pioneers Park, Clay Road y la Highway 6, cerca de los embalses Addicks y Barker. Las casas son losas de suburbio, en gran parte de los setenta a los noventa, en lotes ordinarios con entrada. No es una sección nueva de Katy ni un townhome del Energy Corridor.',
    climate:
      'En tormentas extremas esas pozas de embalse han subido a subdivisiones cercanas. No todas las calles están dentro de esa poza. El granizo, el viento y la lluvia fuerte coinciden con el resto del lado oeste. La historia del embalse es la diferencia local.',
    permits:
      'Según la cuadra, la dirección está en Houston o al borde del condado de Harris sin incorporar. Confirmamos quién da el permiso. Las asociaciones están en unas secciones solamente, no en todas.',
    route: `Se sube por la Highway 6 hacia Clay Road. La oficina no queda lejos. No hay un local en Bear Creek. ${office}`,
    more:
      'Una conversación de agua aquí empieza por la elevación del lote y por de dónde vino el agua, no por el nombre del vecindario. Una línea de suministro sobre la losa y el agua que subió del embalse son visitas distintas. La entrada de suburbio suele servir para dejar materiales.',
    housesNote: 'Casas de suburbio sobre losa, de los setenta a los noventa, junto a los embalses.',
    climateNote: 'Addicks y Barker han subido a unas calles. No a todas.',
    kind: {
      water:
        'En Bear Creek el agua del embalse en una calle baja no es el secado de un calentador en una casa que no la vio.',
      roof: 'En Bear Creek el techo de asfalto se camina. El granizo no se decide desde Clay Road.',
      floor:
        'En Bear Creek el piso nuevo va sobre la losa de esas décadas. El concreto mojado se mide antes de taparlo.',
      interior:
        'En Bear Creek la cocina de estas casas a menudo se actualizó por partes. Mover el fregadero es cortar la losa.',
      exterior:
        'En Bear Creek el permiso se confirma en la dirección, Houston o condado, y la asociación no está en todas las secciones.',
    },
  },
  'cinco-ranch': {
    slug: 'cinco-ranch',
    direction: 'al oeste de la oficina',
    housing:
      'Cinco Ranch es la comunidad planeada del lado de Katy, empezada a principios de los noventa, con cocinas abiertas y planos de dos pisos en muchas secciones. Las casas están sobre losa, y esta época suele ser postensada. Una regadera o un fregadero que tiene que moverse empieza por localizar los cables antes de cortar el concreto. Los techos se repiten, y el que cotizamos es el que subimos.',
    climate:
      'Los estanques de detención y los bordillos toman una lluvia ordinaria. No hacen un lote a prueba de inundación. Preguntamos qué ha visto la casa. El granizo y el viento marcan estos techos grandes igual que en Katy.',
    permits:
      'Las reglas de la asociación cubren mucho del trabajo exterior: color del techo, pintura, cercas y a menudo un patio o un deck. Los acabados de adentro suelen ser elección del dueño. La dirección puede caer en Fort Bend o en Harris. El permiso sigue esa dirección, no el nombre de la comunidad.',
    route: `Cinco Ranch queda más cerca de la oficina que el centro de Katy. Se va por Westheimer Parkway o Fry Road. No hay un local en la comunidad. ${office}`,
    more:
      'Los garajes y las entradas hacen el acopio más simple que en una calle de The Heights. Si el mueble del baño se queda en su drenaje, la losa puede quedarse intacta. No cortamos cables desde un plano que nadie comprobó en la casa.',
    housesNote: 'Casas de dos pisos desde los noventa, sobre losa postensada.',
    climateNote: 'Los estanques toman la lluvia ordinaria. El granizo marca techos repetidos.',
    kind: {
      water:
        'En Cinco Ranch una fuga de ático o de calentador es la llamada común. El estanque no significa que esta casa haya recibido agua de afuera.',
      roof: 'En Cinco Ranch el color del techo suele pasar por la asociación. Caminamos el plano que la fachada repite y aun así es esta casa.',
      floor:
        'En Cinco Ranch el piso de abajo va sobre losa. El postensado no se corta para emparejar un lomo.',
      interior:
        'En Cinco Ranch la cocina ya está abierta. Mover la regadera espera a que se localicen los cables.',
      exterior:
        'En Cinco Ranch un deck, una cerca o el color del techo suelen esperar a la asociación, además del permiso de esa dirección.',
    },
  },
  stafford: {
    slug: 'stafford',
    direction: 'al sur de la oficina',
    housing:
      'Stafford es una ciudad chica al suroeste de Houston, a lo largo de la US 90A y la autopista del suroeste, con casas de suburbio de varias décadas y una franja comercial. La mayoría son losas en lotes modestos. Un rancho de los setenta y un dos pisos posterior en la calle de al lado son los dos comunes. No es Sugar Land ni Alief, aunque queden cerca.',
    climate:
      'El drenaje es el patrón del suroeste: calles planas, lluvia fuerte y zanjas o bayous. Preguntamos por la casa. El granizo y el viento marcan techos de uno y dos pisos. Una fuga interior y el agua que subió de una zanja son eventos distintos.',
    permits:
      'La ciudad da sus propios permisos. El mostrador es el de Stafford, no el de la ciudad de Houston. Las asociaciones aparecen en unas subdivisiones y no en otras. Confirmamos la dirección.',
    route: `Se baja por la Highway 6 o la US 90A. No hay un local en Stafford. ${office}`,
    more:
      'El acopio cabe en una entrada de suburbio más a menudo que en una banqueta dentro del Loop. La visita es el mismo tipo de mirada al edificio: losa, techo y el cuarto que está. El nombre de la franja comercial no elige el alcance.',
    housesNote: 'Ranchos y casas de dos pisos de varias décadas, sobre losa.',
    climateNote: 'Calles planas, zanjas y lluvia fuerte. El granizo marca techos de uno y dos pisos.',
    kind: {
      water:
        'En Stafford el agua de una zanja en una calle baja no es el secado de un tubo sobre la losa.',
      roof: 'En Stafford el techo del rancho y el del dos pisos se caminan en esa dirección. La US 90A no los enseña.',
      floor:
        'En Stafford el piso nuevo va sobre losa. El concreto se mide antes de taparlo con vinil o loseta.',
      interior:
        'En Stafford la cocina del rancho puede seguir cerrada. La del dos pisos posterior ya es otro cuarto.',
      exterior:
        'En Stafford el permiso es de la ciudad, no de Houston, y la asociación no está en todas las secciones.',
    },
  },
  richmond: {
    slug: 'richmond',
    direction: 'al suroeste de la oficina',
    housing:
      'Richmond es la cabecera de Fort Bend, con un centro del siglo diecinueve junto al palacio de justicia y subdivisiones nuevas hacia el Grand Parkway. El pueblo viejo y las secciones nuevas son casas distintas. Las subdivisiones nuevas son losa, a menudo postensada, y se parecen más a Katy o a Sugar Land que a la plaza del palacio. Una cocina abierta en una sección nueva y un muro en una casa vieja cerca del centro no son la misma conversación.',
    climate:
      'El río Brazos es la geografía del oeste. La pregunta de la zona de inundación es real en unos terrenos e irrelevante en otros. El granizo y el viento marcan techos del pueblo y techos grandes de las secciones nuevas. La arcilla se hincha mojada y se encoge seca.',
    permits:
      'La ciudad permite el trabajo dentro de su límite. Las secciones planeadas añaden revisión de la asociación para el exterior. El centro histórico no es una calle de asociación. Un permiso de Sugar Land no cubre una dirección de Richmond.',
    route: `Se va por la US 90A o el Grand Parkway. Unas secciones nuevas quedan más cerca de la oficina que el palacio de justicia. No hay un local en Richmond. ${office}`,
    more:
      'Medimos la dirección, no la plaza. En la casa vieja vemos si hay pilotes o una losa temprana. En la sección nueva no cortamos una losa postensada desde un plano sin comprobar. Una puerta que atora no se culpa hasta ver el marco.',
    housesNote: 'Centro viejo y secciones nuevas sobre losa, a menudo postensada.',
    climateNote: 'El Brazos queda al oeste. La zona de inundación depende del terreno.',
    kind: {
      water:
        'En Richmond el agua cerca del río no es la misma visita que un calentador en una sección nueva.',
      roof: 'En Richmond el techo del centro y el de la sección nueva se caminan por separado. La asociación mira el color donde existe.',
      floor:
        'En Richmond el piso de una casa vieja depende de cómo está armada. Sobre la losa nueva, el concreto tiene que estar seco.',
      interior:
        'En Richmond la cocina del pueblo puede seguir cerrada. En la sección nueva el cuarto ya está abierto y el drenaje espera a los cables.',
      exterior:
        'En Richmond el permiso es de la ciudad, y la asociación de una sección nueva suele mirar el techo y la cerca.',
    },
  },
  pearland: {
    slug: 'pearland',
    direction: 'al sureste de la oficina',
    housing:
      'Pearland es la ciudad grande al sur de Houston, mucha de ella construida de los noventa a los dos mil diez, con un pueblo más viejo y secciones planeadas como Shadow Creek Ranch. Las casas nuevas son losa, por lo común postensada, con plantas bajas abiertas. Tratamos un drenaje que se mueve como postensado hasta confirmar que la losa no lo es. Los techos se repiten y se suben de uno en uno.',
    climate:
      'La cuenca de Clear Creek llega a partes de la ciudad. Unos vecindarios han recibido agua de tormenta tropical y muchas casas no. Los estanques de detención son comunes en las secciones posteriores. El granizo y el viento marcan estos techos igual que en el sur de Houston.',
    permits:
      'La ciudad da los permisos. Las asociaciones son la norma en los vecindarios planeados y revisan cambios exteriores. Los acabados de adentro suelen ser de la casa. Pearland cruza Brazoria, Harris y Fort Bend. Confirmamos el condado en la dirección.',
    route: `El camino desde la oficina es más largo que el de Sugar Land, por el Beltway 8 y las autopistas del sur. No hay un local en Pearland. ${office}`,
    more:
      'Los lotes y los garajes son de suburbio, así que el acopio es directo. Aun así medimos esta casa. Mover una regadera empieza por los cables si la losa es postensada. Si el drenaje se queda, el concreto puede quedarse.',
    housesNote: 'Pueblo viejo y secciones nuevas sobre losa, a menudo postensada.',
    climateNote: 'Clear Creek llega a partes de la ciudad. Los estanques toman la lluvia ordinaria.',
    kind: {
      water:
        'En Pearland el agua de la cuenca en un lote bajo no es la fuga de ático de una casa que solo se encharca.',
      roof: 'En Pearland el color del techo suele pasar por la asociación. El plano repetido se camina en esta dirección.',
      floor:
        'En Pearland el piso de abajo va sobre losa. No flotamos un piso sobre un lomo del postensado.',
      interior:
        'En Pearland la cocina nueva ya está abierta. Mover el fregadero espera a ver si hay cables en la losa.',
      exterior:
        'En Pearland el permiso es de la ciudad, y la asociación de la sección planeada suele mirar el exterior.',
    },
  },
  'clear-lake': {
    slug: 'clear-lake',
    direction: 'al sureste de la oficina',
    housing:
      'Clear Lake son las comunidades del sureste de Houston alrededor del lago y cerca del Johnson Space Center, sobre todo casas de suburbio desde los años de la NASA. La losa es típica, en planos de uno y dos pisos. La humedad aquí es aire del Golfo, con el clima de la bahía encima. No es un suburbio del noroeste.',
    climate:
      'La inundación de la bahía y el viento son el riesgo de la costa, distinto de una calle inundada en Katy. Las tormentas eléctricas igual llegan. El viento importa más aquí que tierra adentro. El metal, los fijadores y la pintura viven en aire de bahía.',
    permits:
      'Gran parte del área está dentro de Houston, con ciudades más chicas al lado. Confirmamos qué ciudad permite la dirección. En unas subdivisiones hay asociación. El trabajo interior, una vez que el clima se queda afuera, es el cuarto y la losa.',
    route: `El camino sigue el Beltway 8 y la Interestatal 45, y es uno de los viajes más largos que agendamos. La distancia en línea recta se queda corta. No hay un local en Clear Lake. ${office}`,
    more:
      'Agendamos la visita como un viaje, no como una parada del lado oeste. El techo se mira con el viento de la costa en mente. Una fuga de suministro sobre la losa sigue siendo otra visita, distinta del agua que subió de la bahía.',
    housesNote: 'Casas de suburbio sobre losa, de los años de la NASA en adelante, junto al lago.',
    climateNote: 'Viento de la bahía y aire salino. La inundación costera no es una calle de Katy.',
    kind: {
      water:
        'En Clear Lake el agua de la bahía no es el mismo secado que un calentador o un tubo sobre la losa.',
      roof: 'En Clear Lake el viento de la costa y el granizo marcan el techo. El metal de las ventilas se revisa, no solo la teja del frente.',
      floor:
        'En Clear Lake el piso va sobre losa. La humedad del Golfo pide que el concreto esté seco antes de taparlo.',
      interior:
        'En Clear Lake la cocina y el baño son de una casa de losa. Mover un drenaje se dice después de ver el concreto.',
      exterior:
        'En Clear Lake el permiso se confirma en la ciudad de esa dirección, y el aire de la bahía entra en la conversación del exterior.',
    },
  },
  baytown: {
    slug: 'baytown',
    direction: 'al este de la oficina',
    housing:
      'Baytown es la ciudad al este de Houston, a lo largo del canal, con vecindarios viejos, subdivisiones nuevas y su propio ayuntamiento. En las subdivisiones la cimentación es sobre todo losa. Las calles viejas pueden mezclar épocas. Miramos antes de describir la casa como construcción nueva.',
    climate:
      'El viento de huracán, la lluvia fuerte y el drenaje del canal son el contexto. La zona de Cedar Bayou se inunda de otra forma que una calle del lado oeste. El agua que sube y un techo dañado por el viento son preguntas distintas para el seguro. La aseguradora decide qué póliza responde. Nosotros fotografiamos y hacemos el trabajo que usted contrata.',
    permits:
      'La ciudad permite su propio trabajo. Las asociaciones aparecen en unas secciones nuevas, no en cada cuadra vieja. Un permiso de Houston no cubre una dirección dentro de Baytown.',
    route: `El camino es la Interestatal 10 al este, y es largo desde el oeste de Houston. Lo agendamos como un viaje. No hay un local en Baytown. ${office}`,
    more:
      'Una fuga de suministro dentro de una casa de losa es otra visita que el agua de tormenta que subió de la calle. Lo escribimos como lo vemos. El metal y la pintura de afuera viven en aire húmedo del este. El interior, ya con el clima afuera, es la losa y el cuarto.',
    housesNote: 'Vecindarios viejos y subdivisiones nuevas sobre losa, al este del canal.',
    climateNote: 'Viento de huracán y drenaje del canal. No es una calle del lado oeste.',
    kind: {
      water:
        'En Baytown el agua que subió del canal no es el secado de un tubo sobre la losa.',
      roof: 'En Baytown el viento de la costa entra en el techo. Lo caminamos. La Interestatal 10 no lo enseña.',
      floor:
        'En Baytown el piso va sobre losa en las subdivisiones. El concreto mojado se mide antes de un piso nuevo.',
      interior:
        'En Baytown la casa vieja y la sección nueva no comparten el plano. Medimos la que nos indicaron.',
      exterior:
        'En Baytown el permiso es de la ciudad, y la asociación, si la sección nueva tiene una, suele mirar el exterior.',
    },
  },
  galveston: {
    slug: 'galveston',
    direction: 'al sureste de la oficina',
    housing:
      'Galveston es una isla de barrera. Las casas incluyen edificios del siglo diecinueve levantados sobre pilotes, casas de playa y construcción posterior hecha para viento y agua. Un bungalow de The Heights sobre pilotes y una casa de Galveston sobre pilotes están las dos levantadas, y no son la misma estructura. Las casas de la isla se elevan por la marea y el viento. Los fijadores y los metales de afuera viven en aire salino.',
    climate:
      'Una póliza de viento y una de inundación a menudo van aparte. Fotografiamos el daño y construimos lo que usted contrata. No decidimos la cobertura. La temporada de huracanes corre de junio a noviembre. El viento de la isla no es el granizo de un suburbio del norte.',
    permits:
      'La ciudad permite el trabajo en la isla. Partes de la isla, incluidas cuadras cerca del Strand y del East End, están en distritos históricos. Los cambios exteriores ahí siguen esas reglas. Lo confirmamos en la dirección.',
    route: `El camino es la Interestatal 45 al sur, y es más largo que una línea recta al malecón. Es el extremo del área que agendamos. No hay un local en Galveston. ${office}`,
    more:
      'La elevación cambia el camino de la calle a la puerta y la forma de armar un techo. Cotizamos la casa que subimos, incluida la altura. No usamos el plano de un rancho de losa para una casa levantada en la isla.',
    housesNote: 'Casas levantadas en la isla, de pilotes históricos a construcción para viento.',
    climateNote: 'Marea, viento e inundación costera. El aire salino gasta el metal.',
    kind: {
      water:
        'En Galveston el agua que subió con la marea no es la fuga de un tubo dentro de la casa.',
      roof: 'En Galveston el viento y la altura entran en el techo. Lo cotizamos en la casa que subimos, no desde el malecón.',
      floor:
        'En Galveston el piso de una casa levantada depende de la estructura de abajo. No lo tratamos como una losa de suburbio.',
      interior:
        'En Galveston la casa histórica y la casa de playa posterior no comparten moldura ni plano. Medimos la que está.',
      exterior:
        'En Galveston el permiso es de la ciudad, y el distrito histórico, donde la cuadra está dentro, mira el exterior.',
    },
  },
  'texas-city': {
    slug: 'texas-city',
    direction: 'al sureste de la oficina',
    housing:
      'Texas City queda sobre la bahía de Galveston, con el dique, las refinerías y calles residenciales de casas de suburbio, en su mayoría sobre losa. El viento de la bahía y la exposición a huracanes entran en un techo o en un siding. Las casas son losas de todos los días, no casas de Galveston sobre pilotes históricos, aunque las reglas de elevación igual pueden aplicar cerca del agua.',
    climate:
      'La marea y la inundación de la bahía son la historia del agua. Una fuga de suministro dentro de una casa de losa es otra visita, distinta del agua de tormenta que subió de la calle. La humedad y la sal influyen en los fijadores y la pintura de afuera.',
    permits:
      'La ciudad da sus propios permisos. Las asociaciones se limitan a unas subdivisiones. Un permiso de Galveston o de Houston no cubre esta dirección. Confirmamos el mostrador.',
    route: `Desde la oficina se baja por la Interestatal 45, un camino más largo que la línea recta al centro de Texas City. No hay un local en Texas City. ${office}`,
    more:
      'El trabajo interior, ya con el clima afuera, es la losa y el cuarto. No mezclamos el agua de la bahía con un calentador que se rompió en el garaje. Lo escribimos como lo vemos, y la aseguradora decide la póliza.',
    housesNote: 'Casas de suburbio sobre losa, junto a la bahía.',
    climateNote: 'Viento de la bahía y marea. No es el pilote histórico de la isla.',
    kind: {
      water:
        'En Texas City el agua que subió de la bahía no es el secado de un tubo sobre la losa.',
      roof: 'En Texas City el viento de la bahía entra en el techo y en el siding. Lo vemos en la casa, no desde el dique.',
      floor:
        'En Texas City el piso va sobre losa. El concreto mojado se mide antes de un piso nuevo.',
      interior:
        'En Texas City la cocina y el baño son de una losa de suburbio. Medimos esa casa, no una casa elevada de Galveston.',
      exterior:
        'En Texas City el permiso es de la ciudad, y la asociación, donde existe, no está en todas las calles.',
    },
  },
  'the-woodlands': {
    slug: 'the-woodlands',
    direction: 'al norte de la oficina',
    housing:
      'The Woodlands es la comunidad planeada que empezó en 1974, organizada en villas desde Grogan’s Mill hacia afuera, sobre todo en el condado de Montgomery, bajo un dosel de pinos. Las casas son planos grandes de suburbio con cocinas abiertas. Las secciones viejas y las nuevas comparten los árboles y las restricciones más que el año de construcción. La losa es la norma, y las casas nuevas a menudo son postensadas.',
    climate:
      'Los pinos sobre el techo tiran agujas y ramas y guardan sombra. Después de una tormenta, una visita de techo aquí a menudo empieza por los árboles además de la teja. Esto es viento, granizo y lluvia, no la marea de Galveston. Arroyos como Panther Branch y Spring Creek tocan partes de la comunidad. La mayoría de las casas están en lotes arbolados, con detención en el plano. Preguntamos por el agua en la dirección.',
    permits:
      'El township, las asociaciones de las villas y las restricciones son reales. El color de afuera, el techo, las cercas y el trabajo en los árboles pueden pedir revisión. Un baño por dentro de la casa casi nunca pasa por esa revisión de arquitectura. El permiso sigue la dirección, en Montgomery o en la parte sur que cae en Harris.',
    route: `Desde la oficina se usa el Beltway y la Interestatal 45, o el Grand Parkway, y tarda más que una línea recta al Waterway. No hay un local en The Woodlands. ${office}`,
    more:
      'No cortamos una losa postensada desde un plano sin comprobar los cables. Si la regadera se queda en su drenaje, el concreto puede quedarse. La sombra no sustituye caminar el techo. Medimos esta villa y esta casa, no el mapa de la comunidad.',
    housesNote: 'Villas bajo pinos, de 1974 en adelante, sobre losa y a menudo postensada.',
    climateNote: 'Pinos, sombra y granizo. Los arroyos tocan unas partes, no todas las casas.',
    kind: {
      water:
        'En The Woodlands una fuga de ático bajo los pinos no es el agua de un arroyo en otro lote.',
      roof: 'En The Woodlands el techo se mira con las ramas y la sombra. El color suele pasar por la asociación de la villa.',
      floor:
        'En The Woodlands el piso de abajo va sobre losa. El postensado no se corta para esconder un lomo.',
      interior:
        'En The Woodlands la cocina ya está abierta. Mover un drenaje espera a los cables, y el baño de adentro casi nunca es revisión de la villa.',
      exterior:
        'En The Woodlands la cerca, el techo y el color suelen esperar a la asociación, además del permiso de esa dirección.',
    },
  },
  magnolia: {
    slug: 'magnolia',
    direction: 'al noroeste de la oficina',
    housing:
      'Magnolia es una ciudad más chica al noroeste de Houston, con un centro histórico y subdivisiones nuevas y lotes de acreaje a lo largo de la FM 1488 y el corredor de la 249. Las casas nuevas son planos de losa, a menudo postensada, en lotes más grandes que uno dentro del Loop. Las casas viejas cerca del centro son otro edificio. Una entrada larga en un lote de acreaje cambia el acopio.',
    climate:
      'Las tormentas aquí son de tierra adentro: viento, granizo y lluvia fuerte. Los escombros de árboles sobre un techo son una razón común de la visita. La marea no es el tema. Preguntamos qué vio esta dirección, no el mapa del condado.',
    permits:
      'La ciudad permite el trabajo dentro del límite. Muchas subdivisiones nuevas añaden reglas de asociación para el exterior. Un terreno de acreaje puede no tener asociación ni un retiro estrecho. Confirmamos cuál es esta dirección antes de pedir materiales.',
    route: `Se va por la Highway 290 o el Grand Parkway hasta la FM 1488, un camino más largo que la línea recta. No hay un local en Magnolia. ${office}`,
    more:
      'Agendamos Magnolia desde Houston como un viaje. Miramos la entrada larga antes de pedir materiales. En la losa nueva no cortamos cables sin verlos. En la casa vieja del centro medimos lo que está, sin usar el plano de la sección nueva.',
    housesNote: 'Centro histórico y casas nuevas de lote grande, a menudo sobre losa postensada.',
    climateNote: 'Viento, granizo y ramas. No es marea de la costa.',
    kind: {
      water:
        'En Magnolia una fuga de suministro en la casa nueva no es el agua de lluvia que se quedó en otro terreno.',
      roof: 'En Magnolia el techo se mira con las ramas encima. El granizo no se decide desde la FM 1488.',
      floor:
        'En Magnolia el piso de la casa nueva va sobre losa. El concreto se mide, y la entrada larga no cambia eso.',
      interior:
        'En Magnolia la cocina de la sección nueva ya está abierta. La casa del centro es otra medida y otra cimentación.',
      exterior:
        'En Magnolia el permiso es de la ciudad cuando la dirección está dentro del límite, y la asociación de la sección nueva suele mirar el exterior.',
    },
  },
};
