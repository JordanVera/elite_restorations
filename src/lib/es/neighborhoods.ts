import { assertCopyAllowed } from '@/lib/copy-guards';
import {
  houstonPostSlugs,
  neighborhoodSlugs,
  type NeighborhoodSlug,
} from '@/lib/locale-paths';
import type { NeighborhoodPage } from '@/lib/neighborhood-types';
import { spanishServiceSlugs } from '@/lib/i18n';
import { titleFits } from '@/lib/seo';
import { wordCount } from '@/lib/words';

const phone = '(713) 909-0034';

function page(
  slug: NeighborhoodSlug,
  name: string,
  description: string,
  lede: string,
  paragraphs: readonly string[],
  services: NeighborhoodPage['services'],
  faqs: NeighborhoodPage['faqs'],
  also: NeighborhoodPage['also'],
): NeighborhoodPage {
  return {
    slug,
    path: `/es/${slug}`,
    name,
    title: `${name}, TX`,
    description,
    lede,
    paragraphs,
    services,
    faqs,
    also,
    ctaTitle: `¿Trabajo en ${name}?`,
    ctaBody: `Llame al ${phone}. Salimos de 511 Crestwater Ct, Houston, TX 77082. Empresa familiar desde 1993.`,
  };
}

const services = {
  storm: (note: string) => ({ href: '/es/houston-storm-damage', label: 'Daño por tormenta', note }),
  tarp: (note: string) => ({
    href: '/es/roofing-emergency-tarp-repair',
    label: 'Lona de emergencia',
    note,
  }),
  water: (note: string) => ({
    href: '/es/water-damage-restoration',
    label: 'Daño de agua',
    note,
  }),
  kitchen: (note: string) => ({
    href: '/es/kitchen-remodeling',
    label: 'Remodelación de cocinas',
    note,
  }),
  bath: (note: string) => ({
    href: '/es/bathroom-remodeling',
    label: 'Remodelación de baños',
    note,
  }),
  vinyl: (note: string) => ({ href: '/es/vinyl-flooring', label: 'Pisos de vinil', note }),
  tile: (note: string) => ({ href: '/es/tile-flooring', label: 'Pisos de loseta', note }),
  wood: (note: string) => ({ href: '/es/wood-flooring', label: 'Pisos de madera', note }),
  roof: (note: string) => ({ href: '/es/roofing', label: 'Techos', note }),
  replace: (note: string) => ({
    href: '/es/roof-replacement',
    label: 'Reemplazo de techo',
    note,
  }),
};

export const esNeighborhoods: readonly NeighborhoodPage[] = [
  page(
    'meyerland-tx',
    'Meyerland',
    'Ranchos de ladrillo de los años 50 en Meyerland, junto a Brays Bayou. Tormenta, agua, cocinas, baños, pisos y techos bajos. Llame al (713) 909-0034.',
    'Meyerland es el vecindario del suroeste de Houston de ranchos de ladrillo de un piso, junto a Brays Bayou y North Braeswood. El trabajo se agenda desde 511 Crestwater Ct.',
    [
      'La mayoría de Meyerland se construyó en los años 50: ladrillo, losa de concreto y techos bajos. Los lotes son más profundos que los de un bungalow dentro del Loop. Muchas casas todavía tienen la cocina cerrada, un baño de pasillo y la recámara grande atrás. En algunas calles la casa se reconstruyó o se levantó después de que el bayou se salió. La de al lado puede seguir siendo el rancho original. Vemos la que usted nos indicó.',
      'Brays Bayou cambia la visita de agua. El terreno bajo, pegado al bayou, ha recibido agua de tormenta en ciclones pasados. Las calles más lejos de la orilla no siempre vieron lo mismo. Un tubo de suministro reventado sobre la losa y el agua que subió de la calle son trabajos distintos, y a veces pólizas distintas. Su aseguradora decide cuál aplica. Nosotros fotografiamos, secamos y reparamos lo que usted contrata.',
      'La otra historia de agua es una helada fuerte. En estos ranchos, los tubos del ático y de las paredes exteriores se han partido cuando Houston baja de cero. El agua corre por la losa, entra a la base del drywall y se mete bajo el piso. Casi nunca hay un espacio debajo de la casa para mirar. Buscamos el borde húmedo con un medidor, no adivinando por la mancha.',
      'El granizo y el viento pegan en estos techos bajos igual que en el resto del suroeste. Desde la calle no se ven los golpes. Las caras sur y oeste envejecen primero. Los encinos tiran ramas sobre los valles. Subimos cuando es seguro, tomamos fotos y decimos si una reparación aguanta. Si la casa está abierta al clima, la lona va antes de hablar de teja.',
      'La cocina suele empezar como un cuarto cerrado. Abrir ese muro es pregunta de estructura, y mover el fregadero es cortar la losa. El baño suele ser el del pasillo, o el principal retileado en los años 80 o 90. Primero se impermeabiliza. Después va la loseta. No tratamos un rancho de Meyerland como un plano abierto en blanco.',
      'El piso sigue la historia de agua de esa casa. Hay madera original, loseta posterior y vinil en rollo. Una losa que se mojó tiene que estar seca antes de un piso nuevo. El vinil enseña el lomo que la alfombra escondía. La madera tiene que acostumbrarse a la casa. La loseta necesita una base pareja. Si la casa se levantó o se cambió la planta baja, medimos lo que hay ahora.',
      'Meyerland está en la ciudad de Houston. Algunas secciones tienen restricciones que miran lo que se ve desde la calle. Una cocina por dentro suele ser otra pregunta, distinta de un techo nuevo. Desde la oficina en 77082 se cruza el suroeste, por Beechnut o Bellaire hacia Chimney Rock. No hay un local en Meyerland. Llame al (713) 909-0034 y agendamos la visita.',
    ],
    [
      services.storm('Viento, granizo y agua del bayou son problemas distintos. Documentamos el que llegó a esta casa.'),
      services.tarp('Un techo bajo y abierto se cubre cuando se puede trabajar arriba con seguridad.'),
      services.water('Una fuga en la losa y el agua que subió de Brays Bayou se trazan antes de secar a ciegas.'),
      services.kitchen('Las cocinas de rancho suelen estar cerradas. Revisamos muro y drenaje antes de prometer el plano.'),
      services.bath('Baños de pasillo y baños principales viejos. Impermeabilización antes de la loseta.'),
      services.vinyl('Un piso común después de una losa mojada, cuando el concreto ya está seco.'),
      services.tile('Sirve en cocina y baño si la losa está lo bastante pareja para la loseta que eligió.'),
      services.wood('Cuando las tablas y la losa lo permiten. La madera se acostumbra dentro de la casa.'),
      services.roof('Pendientes bajas, valles bajo encinos y caras que no se juzgan desde la banqueta.'),
      services.replace('Cuando una reparación no va a aguantar. Cotizamos el techo que caminamos.'),
    ],
    [
      {
        q: '¿Todas las casas de Meyerland se inundan?',
        a: 'No. El terreno bajo junto a Brays Bayou ha recibido agua en ciclones pasados. Las casas más altas, o más lejos de la orilla, no siempre vieron la misma agua. Empezamos por dónde entró el agua en esta casa. Un tubo reventado y el agua que sube no son el mismo trabajo.',
      },
      {
        q: '¿Se puede abrir la cocina de un rancho?',
        a: 'A veces. El muro puede estar cargando el techo, y el drenaje del fregadero está en la losa. Lo vemos antes de decir que el muro se mueve. Una cocina que se queda cerrada también puede llevar gabinetes, cubiertas y piso nuevos.',
      },
      {
        q: '¿Qué incluye la visita del techo?',
        a: 'Todas las pendientes, los valles y el metal, no solo el frente. Estos techos están bajos y desde la calle se pierde mucho. Tomamos fotos y decimos si una reparación aguanta. Su aseguradora decide cualquier reclamo.',
      },
      {
        q: '¿Ustedes manejan el reclamo del seguro?',
        a: 'No somos ajustadores públicos. Fotografiamos el daño, ponemos lona o secamos cuando ese es el paso correcto, y escribimos un estimado de la reparación que usted contrata. Usted presenta el reclamo. Su aseguradora decide la cobertura y el pago.',
      },
    ],
    [
      { href: '/es/blog/houston-flood-damage-repair', label: 'Reparación después de una inundación' },
      { href: '/es/blog/houston-kitchen-remodel-ideas', label: 'Ideas de cocina en Houston' },
    ],
  ),
  page(
    'montrose-tx',
    'Montrose',
    'Bungalows y townhomes en Montrose. Fugas en casas elevadas, calles estrechas, cocinas, baños, pisos y techos parchados. Llame al (713) 909-0034.',
    'Montrose es el vecindario dentro del Loop de bungalows, cottages y townhomes nuevos, sobre Westheimer, Montrose Boulevard y Richmond. La oficina que agenda el trabajo está en el oeste de Houston.',
    [
      'En una misma calle de Montrose puede haber un bungalow de los años 20 sobre pilotes y un townhome de tres pisos sobre losa. Son edificios distintos. El bungalow suele tener un hueco debajo del piso, cuartos chicos y muros que no están a escuadra. El townhome comparte una pared y, muchas veces, una asociación que revisa la fachada. Preguntamos cuál es el suyo antes de hablar de cocina o de techo.',
      'La plomería vieja es parte del bungalow. Las líneas de agua y los drenajes de hierro colado llevan décadas de parches. Una helada puede partir un tubo en una pared exterior o en un hueco abierto al aire. Una fuga lenta bajo el piso puede mojar el contrapiso sin dejar un charco en la sala. Cuando hay espacio debajo, miramos. Medimos la humedad del piso antes de decir que está seco.',
      'Aquí la tormenta suele ser viento, granizo y lluvia contra techos viejos, no una sola historia de bayou. Los techos planos del porche, las buhardillas añadidas y los valles parchados filtran mientras la pendiente principal se ve tranquila. Las calles estrechas y los carros estacionados cambian cómo se coloca una lona. Si una ventana quedó rota o una puerta no cierra, las tablas son el paso que deja la casa cerrada esa noche.',
      'Las cocinas de los bungalows son chicas. Abrir el cuarto mete la estructura y la moldura vieja en el plan. Un gabinete que ignora el contramarco se ve pegado. La cocina de un townhome no puede pedir metros al vecino. Medimos los dos. El baño a menudo es uno solo, de pasillo, a veces con una adición que no coincide con la loseta original.',
      'El piso de las casas viejas suele ser pino, y se curva cuando la humedad de Houston sube y baja. Se puede lijar si las tablas tienen grosor y el contrapiso está sano. Un hueco que sigue húmedo devuelve esa curva. El vinil y la loseta aparecen en cocinas, baños y townhomes sobre losa. Madera sobre un hueco húmedo es otra conversación.',
      'Montrose está en la ciudad de Houston. No hay el zonificado de un suburbio, y algunas calles tienen restricciones o una conversación de diseño sobre la fachada. El trabajo interior suele quedar fuera de eso. Meter un contenedor en estas calles se planea en la visita, no con la costumbre de un cul-de-sac.',
      'Desde 511 Crestwater Ct es un cruce de la ciudad, por Westheimer o Richmond hacia el Loop. No hay showroom en Montrose. Llame al (713) 909-0034. Si está entrando agua o el techo está abierto, dígalo primero.',
    ],
    [
      services.storm('Techos viejos, buhardillas y porches planos. Fotografiamos la abertura antes de que la lona la tape.'),
      services.tarp('Cuando el techo está abierto y se puede trabajar. La calle estrecha entra en el plan.'),
      services.water('Fugas bajo la casa y tubos partidos en paredes exteriores. Miramos debajo cuando se puede.'),
      services.kitchen('Cocinas chicas de bungalow y cocinas angostas de townhome. El edificio decide el plano.'),
      services.bath('Muchas veces un baño de pasillo, o un baño principal metido en una adición.'),
      services.vinyl('Un piso práctico en un townhome o en una cocina que ya se secó.'),
      services.tile('Se pone después de impermeabilizar, también en baños chicos.'),
      services.wood('El pino original a veces se puede lijar. La madera nueva tiene que vivir con la humedad.'),
      services.roof('Varias formas de techo en un solo bungalow. Las vemos todas.'),
      services.replace('Cuando los parches ya son más que la pendiente sana. El acceso en la calle estrecha se cotiza.'),
    ],
    [
      {
        q: '¿Las casas de Montrose están sobre pilotes?',
        a: 'Muchos bungalows sí. Los townhomes nuevos suelen estar sobre losa. Una adición puede mezclar las dos. El hueco ayuda cuando hay que mover un drenaje, y también es donde se esconde una fuga lenta. Identificamos el edificio en la visita.',
      },
      {
        q: '¿Cabe un contenedor en la calle?',
        a: 'A veces, y a veces la entrega tiene que ser más chica o a otra hora, por el estacionamiento. Lo planeamos en la dirección. Un townhome con entrada compartida no es un bungalow con driveway corto.',
      },
      {
        q: '¿Qué falla primero en estos techos?',
        a: 'El techo plano del porche, los valles y el metal alrededor de chimeneas y ventilas viejas. El frente puede verse bien mientras una buhardilla parchada mete lluvia al cielo. Esas son las fotos.',
      },
      {
        q: '¿Van a negociar el reclamo?',
        a: 'No somos ajustadores públicos. Podemos estar cuando llegue su ajustador, caminar lo que encontramos y reparar lo que usted contrata. Su aseguradora decide la cobertura y el pago. Revise la póliza o pregúnteles a ellos.',
      },
    ],
    [
      { href: '/es/blog/emergency-tarp-and-board-up-houston', label: 'Lona y tablas después de una tormenta' },
      { href: '/es/blog/houston-bathroom-remodel-guide', label: 'Guía de baños en Houston' },
    ],
  ),
  page(
    'garden-oaks-tx',
    'Garden Oaks',
    'Casas bajo encinos en Garden Oaks, al norte del Loop. Huecos bajo el piso, ramas, cocinas, baños, pisos y techos. Llame al (713) 909-0034.',
    'Garden Oaks es el vecindario más viejo al norte del North Loop, bajo una copa espesa de encinos, entre The Heights y Oak Forest. Lo agendamos desde la oficina del oeste.',
    [
      'Las casas son sobre todo de finales de los años 30 hasta los 50. Hay cottages y ranchos tempranos, muchos sobre pilotes, en lotes pensados alrededor de los árboles. Los cuartos son modestos. La moldura a menudo es la original. Una adición posterior puede sentarse en losa junto a la casa original. No suponemos que toda la casa coincide con la puerta de enfrente.',
      'Los encinos son asunto de techo y de agua. Las ramas quedan sobre los valles. Las hojas tapan las canaletas. La sombra mantiene el techo húmedo más tiempo que uno a pleno sol, y en una tormenta también cae una rama. El granizo igual llega. Vemos el techo bajo la copa, no solo el pedazo que se alcanza desde la calle.',
      'White Oak Bayou es la orilla baja de esta parte del norte. Las calles más cerca del bayou han recibido agua de tormenta. Las de más arriba, no. Un hueco bajo la casa puede guardar agua después de una lluvia fuerte aunque la sala se quedó seca. Eso no es el mismo secado que un tubo que reventó en una helada y corrió por el piso.',
      'La helada se ve en tubos de paredes exteriores y en líneas bajo una casa abierta al viento frío. Cuando el tubo se parte, el agua puede quedarse en el hueco y subir al contrapiso. Paramos el agua, fotografiamos el camino y secamos la madera antes de hablar de piso nuevo.',
      'La cocina suele ser todavía el cuarto chico de atrás. La gente quiere abrirla hacia la sala. Las vigas y los vanos viejos deciden si eso es simple. Si el resto de la moldura se queda, hay que igualarla. Los baños son chicos. Una regadera aquí se impermeabiliza antes de la loseta, y la pendiente del piso viejo se revisa antes de prometer un bordillo.',
      'El piso de madera es común, y la humedad de Houston lo mueve. Lijar funciona cuando las tablas están sanas y el hueco no les está metiendo humedad. La loseta va en los cuartos mojados. El vinil es el piso que se elige cuando una adición sobre losa necesita algo estable y el pino original se queda en la sala. Decimos qué piso aguanta ese cuarto.',
      'Garden Oaks está en Houston. Algunas calles tienen restricciones viejas sobre la fachada. Remodelar por dentro suele quedar fuera de esa revisión. Desde 511 Crestwater Ct es un cruce, por la I-10 hacia el norte. Llame al (713) 909-0034. El tráfico cambia la hora.',
    ],
    [
      services.storm('Golpes de rama y granizo bajo los encinos. Fotografiamos el techo antes de quitar escombro, si es seguro.'),
      services.tarp('Tapa una abertura de rama o de teja levantada hasta que se decida el techo definitivo.'),
      services.water('Agua en el hueco y tubos reventados. La sala puede verse seca con el contrapiso mojado.'),
      services.kitchen('Cocinas originales chicas. Revisamos estructura y moldura antes de quitar un muro.'),
      services.bath('Baños apretados. Primero la impermeabilización, después la loseta.'),
      services.wood('Los pisos originales a veces se lijan. La madera nueva se acostumbra en la casa.'),
      services.tile('El piso habitual del cuarto mojado, sobre una base pareja y seca.'),
      services.vinyl('Sirve en una adición sobre losa o en una cocina que ya se mojó.'),
      services.roof('Valles llenos de hoja y pendientes bajo ramas. Todo eso se revisa.'),
      services.replace('Cuando la sombra, los parches y la madera del techo dicen que una reparación no dura.'),
    ],
    [
      {
        q: '¿Garden Oaks es lo mismo que Oak Forest?',
        a: 'No. Comparten el norte de Houston y muchos encinos, y están juntos. Garden Oaks es la construcción más vieja, con más casas sobre pilotes y cuartos más chicos. Oak Forest es sobre todo ranchos de ladrillo de la posguerra, sobre losa. Tratamos la dirección, no el apodo.',
      },
      {
        q: '¿Los árboles cambian un trabajo de techo?',
        a: 'Sí. El acceso bajo las ramas, las hojas en los valles y la sombra que mantiene el techo húmedo son parte de la visita. Una rama que atravesó una pendiente es lona primero, si es seguro, y después una mirada a la madera.',
      },
      {
        q: '¿Se puede quedar el piso original?',
        a: 'Cuando las tablas tienen grosor y están secas, lijar y un acabado nuevo es una opción real. Si el hueco está mojado, o las tablas ya se gastaron, se lo decimos. El piso nuevo entra después de atender la humedad.',
      },
      {
        q: '¿Quién decide el pago del seguro?',
        a: 'Su aseguradora. No somos ajustadores públicos. Documentamos lo que hizo la tormenta o la fuga, y reparamos lo que usted contrata. El reclamo se queda con usted y con la aseguradora.',
      },
    ],
    [
      { href: '/es/blog/houston-roof-replacement-guide', label: 'Guía para cambiar un techo' },
      { href: '/es/blog/houston-flooring-for-humidity', label: 'Pisos y humedad en Houston' },
    ],
  ),
  page(
    'oak-forest-tx',
    'Oak Forest',
    'Ranchos de ladrillo de la posguerra en Oak Forest, al norte de Houston. Fugas en losa, granizo, cocinas, baños y pisos. Llame al (713) 909-0034.',
    'Oak Forest es el vecindario del norte de Houston de ranchos de ladrillo de finales de los años 40 hasta los 60, al norte de Garden Oaks. Las visitas salen de 511 Crestwater Ct.',
    [
      'La casa común es un rancho de un piso, de ladrillo, sobre losa. Los techos son bajos y simples hasta que alguien añadió un porche o un techo de cobertizo. Hay cocheras abiertas y garajes posteriores. Las cocinas se construyeron cerradas. Los baños de pasillo son chicos, con una tina que mucha gente ahora quiere como regadera. Una casa reconstruida en la misma calle es otro alcance. Se nota en la cimentación y en la moldura.',
      'Estas losas no le dan a un tubo reventado un lugar donde caer. En una helada fuerte se parten las líneas del ático y de las paredes exteriores. El agua sale en el cielo o en el zoclo y corre bajo el piso. Un vinil que se ve casi bien puede estar sobre concreto mojado. Levantamos lo que hay que quitar, medimos el resto y secamos la losa antes de hablar de piso nuevo.',
      'White Oak Bayou corre por el oeste de esta zona. Algunas calles de Oak Forest han recibido agua de tormenta. Muchas solo han visto la calle encharcada. No escribimos todo el vecindario como una sola altura. Díganos si el agua subió de afuera o empezó en un mueble. Esos caminos se documentan distinto, y su aseguradora decide la cobertura.',
      'El granizo encuentra estos techos porque son anchos y bajos. Un golpe en la teja de asfalto casi no se ve desde el jardín. Las pendientes sur y oeste se cuartean primero. Caminamos el techo, fotografiamos y decimos si una reparación es honesta o si el techo ya llegó al final de su vida útil. El viento levanta orillas. Una lona es para una abertura, no para un techo que solo se ve feo.',
      'Remodelar la cocina de un rancho aquí suele ser gabinetes, luz, y si un muro se puede abrir. El fregadero y el lavavajillas están sobre drenajes en la losa. Moverlos es trabajo de concreto, y lo decimos antes de demoler. El baño suele ser el del pasillo: un plato de regadera, loseta, un lavabo que quepa y un extractor que saque el aire húmedo. La humedad de Houston no deja en paz una regadera nueva.',
      'El piso sigue la losa. La loseta es común en cocinas y baños, y aguanta si el piso se moja, cuando la losa está pareja. El vinil es lo que muchos de estos ranchos ponen en los cuartos principales cuando sale la alfombra. La madera sólida sobre losa necesita el producto correcto y una losa seca. No tapamos un piso mojado para que se vea terminado.',
      'Oak Forest está en Houston. Las restricciones aparecen en algunas calles y en otras no. El color del techo le importa más a una restricción que un gabinete por dentro. Desde la oficina se cruza el oeste y el norte. Llame al (713) 909-0034. Si la fuga sigue activa, llame en lugar de esperar un formulario.',
    ],
    [
      services.storm('Granizo en techos bajos de rancho, y viento en las orillas. La vista desde la calle no es la inspección.'),
      services.tarp('Para una pendiente abierta o un hoyo de rama. Fotografiamos primero, si es seguro.'),
      services.water('Roturas por helada y fugas de muebles que corren por la losa hasta el drywall.'),
      services.kitchen('Cocinas de rancho cerradas. El cambio de plano espera a la estructura y a los drenajes.'),
      services.bath('Baños de pasillo convertidos en regadera, con impermeabilización antes de la loseta.'),
      services.vinyl('Enseña cada lomo de la losa. Nivelar es parte de la conversación.'),
      services.tile('Una buena opción para cocinas y baños sobre estas losas.'),
      services.wood('Solo cuando la losa está seca y el producto pertenece sobre concreto.'),
      services.roof('Techos anchos y bajos. Vemos cada pendiente, incluidas las de las adiciones.'),
      services.replace('Cuando la teja ya se acabó en toda la casa, no solo en el frente.'),
    ],
    [
      {
        q: '¿Las casas de Oak Forest están sobre losa?',
        a: 'Sí, en la mayoría. El rancho de ladrillo de la posguerra sobre losa es la casa habitual. Una excepción vieja o una reconstrucción nueva puede ser distinta. Lo confirmamos. En una losa, un tubo reventado corre por el piso, y un fregadero que se mueve significa cortar concreto.',
      },
      {
        q: '¿Por qué revientan los tubos en una helada?',
        a: 'Las líneas del ático y de las paredes exteriores sienten el frío. Cuando se parten, el agua tiene la losa para correr. Cierre el suministro si puede hacerlo con seguridad, y llame. Secar la losa importa tanto como encontrar la rotura.',
      },
      {
        q: '¿Después del granizo basta una reparación?',
        a: 'A veces, si el daño es limitado y el resto del techo todavía tiene vida. Lo decimos después de estar arriba. Una pendiente baja esconde la cara mala desde la banqueta.',
      },
      {
        q: '¿Están ajustando el reclamo?',
        a: 'No. No somos ajustadores públicos. Usted llama a su aseguradora. Nosotros documentamos la casa y hacemos el secado y la reparación que usted contrata. La aseguradora decide el pago.',
      },
    ],
    [
      { href: '/es/blog/houston-leaks-pipes-heater-dishwasher-toilet', label: 'Fugas de tubos y de aparatos' },
      { href: '/es/blog/remodeling-a-houston-ranch-house', label: 'Remodelar un rancho de Houston' },
    ],
  ),
  page(
    'kingwood-tx',
    'Kingwood',
    'Casas bajo pinos en Kingwood, cerca de Lake Houston. Granizo, inundación, cocinas, baños, pisos y techos largos. Llame al (713) 909-0034.',
    'Kingwood es la comunidad planeada al noreste de Houston, sobre Kingwood Drive y cerca de Lake Houston. El trabajo se agenda desde nuestra oficina en 77082.',
    [
      'Las casas son sobre todo de los años 70 hasta los 2000, sobre losa, bajo pinos. Las secciones tempranas suelen ser de dos pisos, con una cocina más cerrada. Las posteriores abren la cocina al family room. Los lotes son más grandes que dentro del Loop, y los techos son largos porque las casas lo son. La asociación es habitual y suele revisar color de techo, pintura y cercas. Un baño por dentro casi nunca es esa revisión.',
      'Los árboles cambian el techo. Agujas y hojas se sientan en los valles. Las ramas caen con el viento. La sombra guarda humedad en una pendiente norte. El granizo igual atraviesa la copa y golpea el asfalto. Caminamos esos techos. Una reparación que ignora un valle lleno de basura no es una reparación. Si el viento abrió el techo, la lona es el paso que limita más agua en el ático y en el cielo.',
      'El terreno bajo cerca del río San Jacinto y de Lake Houston se ha inundado en ciclones pasados. Las casas en terrenos más altos del mismo lugar no todas recibieron agua. El agua que sube y una fuga de un tubo en el segundo piso son trabajos distintos. El agua que sube a menudo cae en otra póliza, distinta de una rotura repentina. Su aseguradora decide. No le cambiamos el nombre al daño. Secamos lo que se mojó y reconstruimos lo que usted contrata.',
      'Los tubos y los calentadores en el ático son comunes en estos planos de dos pisos. Una helada o un calentador fallado tira agua al cielo de la cocina o de una recámara. La mancha del cielo es más chica que el aislamiento mojado arriba. Abrimos lo que el medidor dice que está húmedo, y lo dejamos abierto hasta que seque. Por la humedad de Houston, un ventilador en el pasillo no es todo el secado.',
      'Las cocinas aquí suelen ser gabinetes, una isla, y si el muro entre la cocina y el family room está trabajando como estructura. Los baños principales son más grandes que el baño de pasillo de un rancho. Igual necesitan impermeabilización antes de la piedra o la porcelana. Una regadera de vidrio en una casa húmeda necesita un extractor que salga afuera, no al ático.',
      'Los pisos se parten por nivel. Alfombra arriba, loseta o madera abajo, es un patrón que vemos. Después del agua, el acolchonado de la alfombra que se quedó mojado sale. La loseta sobre la losa es un piso práctico de abajo si la losa está pareja. La madera puede funcionar cuando la losa está seca y el producto es para ese suelo. El vinil es la otra opción de abajo, y marca cualquier lomo.',
      'Kingwood tiene sus propios servicios municipales dentro del mapa complicado alrededor de Houston. Confirmamos la oficina de permisos de esa dirección. Desde Crestwater Court el viaje es largo, hacia el noreste. Llame al (713) 909-0034 y le decimos la ventana de la visita. No hay showroom en Kingwood.',
    ],
    [
      services.storm('Viento, granizo y agua que sube cerca del lago se anotan como lo que de verdad pasó.'),
      services.tarp('Cubre un techo abierto bajo los pinos para que el cielo deje de recibir lluvia.'),
      services.water('Fugas de ático por calentadores y tubos, y plantas bajas que recibieron agua de afuera.'),
      services.kitchen('Cocinas cerradas de los 70 y planos abiertos posteriores. Medimos el muro antes de moverlo.'),
      services.bath('Baños principales grandes. La impermeabilización es la parte que no se ve.'),
      services.tile('Un piso de abajo que aguanta una cocina mojada o un baño.'),
      services.wood('Abajo, después de que la losa esté seca. Se acostumbra en la casa.'),
      services.vinyl('Útil sobre una losa lo bastante pareja, incluso cuando sale la alfombra.'),
      services.roof('Techos largos, basura de pino y pendientes que no se ven desde el driveway.'),
      services.replace('Cuando el campo de teja ya se acabó, no solo la pendiente que golpeó la rama.'),
    ],
    [
      {
        q: '¿Todo Kingwood se inundó?',
        a: 'No. El terreno bajo cerca del San Jacinto y de Lake Houston ha recibido agua en ciclones pasados. Las calles más altas no todas vieron esa agua. Preguntamos por dónde entró el agua en esta casa antes de secar o demoler.',
      },
      {
        q: '¿La asociación revisa una cocina?',
        a: 'Por lo general mira el techo, la pintura y la cerca. Una cocina o un baño por dentro es otra aprobación, si es que hace falta. Igual sacamos el permiso cuando el trabajo lo pide.',
      },
      {
        q: '¿Dónde empiezan las fugas en Kingwood?',
        a: 'Muchas veces en el ático: un calentador, una línea de agua o un valle bajo los pinos. La mancha del cielo es la pista, no toda el área mojada. Medimos el aislamiento y los cuartos de abajo.',
      },
      {
        q: '¿Pueden prometer que el reclamo pague?',
        a: 'No. No somos ajustadores públicos. Su aseguradora decide la cobertura y el monto. Fotografiamos, podemos estar con el ajustador y reparamos lo que usted contrata.',
      },
    ],
    [
      { href: '/es/blog/houston-hail-storm-roof-claims', label: 'Granizo y reclamos de techo' },
      { href: '/es/blog/houston-flood-damage-repair', label: 'Reparación por inundación' },
    ],
  ),
  page(
    'cypress-tx',
    'Cypress',
    'Calles viejas de Cypress y casas nuevas sobre la US 290. Agua de arroyo, granizo, cocinas, baños, pisos y techos. Llame al (713) 909-0034.',
    'Cypress es la zona del noroeste del condado de Harris sobre la US 290, con un pueblo más viejo y subdivisiones grandes hacia el Grand Parkway. Lo agendamos desde Houston 77082.',
    [
      'Cypress no es una sola casa. Más cerca de Cypress Creek y de las calles comerciales viejas hay ranchos y casas de dos pisos de varias décadas, casi todas sobre losa. En las secciones planeadas nuevas, las casas son más grandes, las cocinas están abiertas y muchas losas son postensadas, con cables dentro del concreto. Cortar una losa postensada para mover un drenaje no es el mismo trabajo que cortar una losa vieja. Ubicamos el trabajo antes de que alguien corte.',
      'Cypress Creek es la historia de inundación. Las secciones cerca del arroyo han recibido agua de tormenta. Un estanque de detención en una subdivisión nueva es la forma en que esa sección guarda la lluvia. No es una promesa de que la calle nunca se encharque. Una casa que recibió agua del arroyo y una casa con la manguera de la lavadora reventada necesitan secados distintos y, a menudo, conversaciones de seguro distintas. Su aseguradora decide la cobertura. Documentamos el camino que se puede ver.',
      'El noroeste de Harris ve granizo en la primavera. Los techos son casi todos de asfalto, algunos grandes y recortados con buhardillas. Vemos las pendientes que dieron la cara a la tormenta, no solo la fachada. El viento levanta los caballetes. Una lona va en una abertura. Un techo golpeado pero cerrado es una inspección, y después una reparación o un reemplazo, dicho después de caminarlo.',
      'Los planos de dos pisos ponen calentadores y líneas en el ático. Una helada o una charola fallada tira agua al cielo. El otro caso común es el calentador del garaje: inunda el garaje y luego el cuarto de al lado si la losa está pareja. Seguimos ese camino. El drywall que absorbió agua en la base sale donde está mojado. Un muro mojado no se cierra.',
      'Remodelar la cocina en las casas nuevas suele ser acabado y un ajuste de plano: gabinetes, una isla más grande, luz, y un piso que cruza a la sala. En las casas viejas puede ser una cocina cerrada y el deseo de abrirla. Los baños nuevos son suites principales grandes. Los baños viejos son más apretados. Los dos llevan impermeabilización antes de la loseta. Un vidrio no hace que la regadera sea impermeable.',
      'El piso de las casas nuevas suele ser loseta sobre la losa y alfombra arriba. La gente llama cuando quiere quitar la alfombra o cambiar la loseta por un aspecto de madera. El vinil hace eso si la losa está pareja. La madera de verdad necesita una losa seca y tiempo en la casa antes de fijarse. Después de una inundación del arroyo, la primera pregunta es si la losa y los muros están secos, no qué muestra le gustó.',
      'Partes de Cypress están en la ciudad de Houston, partes en el condado de Harris, y algunas calles cercanas caen en otras ciudades. La dirección elige el permiso. Las asociaciones de las secciones planeadas suelen cuidar el techo y el exterior. Llame al (713) 909-0034. El camino es la US 290 o el Beltway. Ponemos una ventana porque la autopista cambia la hora.',
    ],
    [
      services.storm('Granizo y viento en techos grandes, aparte del agua del arroyo en un lote bajo.'),
      services.tarp('Para un techo abierto después de una tormenta, con el espacio del driveway que de verdad hay.'),
      services.water('Roturas de ático, calentadores de garaje y casas que recibieron agua del arroyo.'),
      services.kitchen('Cocinas abiertas en secciones nuevas, cocinas cerradas en las calles viejas.'),
      services.bath('Suites principales y baños de pasillo más chicos. Impermeabilización antes del acabado.'),
      services.vinyl('Un piso con aspecto de madera sobre una losa pareja, incluso donde salió la alfombra.'),
      services.tile('Ya es común abajo. El reemplazo empieza por qué tan pareja está la losa.'),
      services.wood('Después de que la losa esté seca. No es el primer piso sobre una casa que acaba de inundarse.'),
      services.roof('Techos grandes y recortados. Cada pendiente, incluidas las del garaje.'),
      services.replace('Cuando el granizo o la edad está en todo el techo, no en una sola pestaña levantada.'),
    ],
    [
      {
        q: '¿Las losas nuevas de Cypress son postensadas?',
        a: 'Muchas de las nuevas sí. Los cables corren dentro del concreto. Eso cambia si una regadera o un fregadero se pueden mover. Las losas más viejas de Cypress son otro corte. Revisamos esta casa antes de prometer un plano.',
      },
      {
        q: '¿Cypress se inunda?',
        a: 'Las secciones cerca de Cypress Creek han recibido agua de tormenta. Muchas calles nuevas solo se encharcan en una lluvia fuerte. Vemos este lote. El agua de afuera y una fuga de suministro se documentan como eventos distintos.',
      },
      {
        q: '¿Quién da el permiso?',
        a: 'La ciudad o el condado de esa dirección. Cypress no es un solo mostrador de permisos. Lo confirmamos. Una asociación, donde existe, es otra revisión y suele ser del exterior.',
      },
      {
        q: '¿Trabajan para la aseguradora?',
        a: 'Trabajamos para el dueño que llama. No somos ajustadores públicos. Usted presenta el reclamo. Su aseguradora decide lo que paga la póliza. Nosotros reparamos el techo, el daño de agua o el cuarto que usted contrata.',
      },
    ],
    [
      { href: '/es/blog/houston-hail-storm-roof-claims', label: 'Granizo en techos de Houston' },
      { href: '/es/blog/houston-kitchen-remodel-ideas', label: 'Ideas y alcance de una cocina' },
    ],
  ),
  page(
    'spring-tx',
    'Spring',
    'Old Town Spring y casas nuevas sobre la I-45. Spring Creek, permisos distintos, cocinas, baños, pisos y techos. Llame al (713) 909-0034.',
    'Spring es la comunidad del norte del condado de Harris sobre la Interestatal 45, del pueblo viejo a las subdivisiones nuevas hacia el Grand Parkway. Las visitas salen de nuestra oficina en Houston.',
    [
      'Old Town Spring y las subdivisiones de la autopista se llaman Spring, y no son la misma casa. El pueblo viejo tiene casas más chicas, algunas sobre pilotes, algunas sobre losas tempranas, con árboles pegados al techo. Las secciones nuevas son casas de dos pisos sobre losa, con cocinas abiertas y baños principales grandes. Mucho de ese concreto nuevo es postensado. Preguntamos en qué Spring está, y después miramos.',
      'Spring Creek se desborda. Las calles bajas cerca del arroyo han recibido agua de tormenta en ciclones pasados. Las casas en los terrenos nuevos más altos no todas recibieron esa agua. Las agujas de pino y el viento son el problema cotidiano del techo. El granizo llega con las tormentas de primavera que cruzan el norte de Houston. Un techo bajo pinos necesita los valles revisados, no solo la pendiente del frente.',
      'Los permisos no son una sola oficina. Una dirección puede ser la ciudad de Houston, el condado de Harris sin incorporar, o estar tan cerca de otra ciudad que las reglas cambian. Confirmamos la dirección antes de sacar un permiso. Las asociaciones de las secciones nuevas revisan techos y pintura más a menudo que el plano de unos gabinetes.',
      'El agua dentro de estas casas suele empezar arriba o en el ático. Un calentador, una línea en una helada, o una bota cuarteada alrededor de una ventila. El cielo de abajo enseña la mancha tarde. El aislamiento puede estar empapado mientras el drywall solo tiene puntos. Abrimos la parte mojada y la secamos. Una planta baja inundada por el arroyo es otro desmonte: aislamiento mojado en los muros, piso suelto y gabinetes hinchados en la base.',
      'Las ideas de cocina se parten igual que las casas. En un plano nuevo y abierto, el trabajo es gabinetes, cubiertas, luz y un piso que encuentra el family room. En una casa vieja de Spring, la cocina puede seguir siendo un cuarto aparte, y los muros no están a escuadra. Los baños nuevos pueden llevar una regadera grande. Los baños viejos necesitan que se encuentre la plomería antes de redibujar el cuarto.',
      'El piso y la humedad viajan juntos bajo los árboles. Una losa que no ve sol igual tiene que estar seca antes de que baje vinil o madera. La loseta es el piso que perdona el cuarto mojado. La madera se mueve. La acostumbramos en la casa. Después del agua del arroyo, no instalamos un piso para esconder una losa húmeda.',
      'Desde 511 Crestwater Ct se va al norte, por la I-45 o el Hardy Toll Road según la sección. Llame al (713) 909-0034. Diga si es una fuga, un techo o una remodelación, para que la visita sea la correcta. Empresa familiar desde 1993. La cuadrilla sale de la oficina de Houston.',
    ],
    [
      services.storm('Granizo, viento y agua del arroyo. Anotamos cuál llegó a la casa.'),
      services.tarp('Detiene la lluvia en un valle abierto o un hoyo de rama mientras se decide el techo.'),
      services.water('Fugas de ático en las casas nuevas, y plantas bajas que recibió Spring Creek.'),
      services.kitchen('Planos abiertos en secciones nuevas. Cocinas más chicas y viejas cerca de Old Town.'),
      services.bath('Baños principales grandes y baños originales chicos. La plomería decide el movimiento.'),
      services.tile('Un piso sólido de abajo y de baño cuando la losa está pareja.'),
      services.vinyl('Para los cuartos principales, sobre una losa seca y razonablemente pareja.'),
      services.wood('En salas, después de acostumbrarse. No sobre un hueco húmedo o una losa mojada.'),
      services.roof('Pinos sobre las pendientes. Valles y ventilas reciben la misma atención que el campo.'),
      services.replace('Cuando la teja está cansada en todo el techo, incluidas las caras bajo los árboles.'),
    ],
    [
      {
        q: '¿Spring está dentro de la ciudad de Houston?',
        a: 'Una parte sí. Algunas direcciones están en el condado de Harris sin incorporar, y las orillas se acercan a otras ciudades. Buscamos la dirección. El nombre del vecindario no elige el mostrador de permisos.',
      },
      {
        q: '¿Qué hago si entró agua de Spring Creek?',
        a: 'No camine en agua estancada cerca de la electricidad. Fotografíe los cuartos antes de tirar acabados. Llame a su aseguradora y llámenos al (713) 909-0034. El agua de afuera y un tubo reventado se documentan como eventos distintos.',
      },
      {
        q: '¿Los pinos significan que hay que cambiar el techo?',
        a: 'Basura en un valle, por sí sola, no es un techo nuevo. Un valle que ha estado filtrando, o teja golpeada en todas las pendientes, puede serlo. Subimos y decimos cuál es.',
      },
      {
        q: '¿Quién paga el reclamo?',
        a: 'Lo decide su aseguradora. No somos ajustadores públicos. Fotografiamos, ponemos lona, secamos y reconstruimos las partes que usted contrata. No cobramos una cuota por pelear el reclamo.',
      },
    ],
    [
      { href: '/es/blog/houston-flood-damage-repair', label: 'Qué hacer con daño de inundación' },
      { href: '/es/blog/houston-roof-replacement-guide', label: 'Cambiar el techo en Houston' },
    ],
  ),
  page(
    'humble-tx',
    'Humble',
    'El pueblo viejo de Humble y las subdivisiones hacia Lake Houston. Inundación del río, cocinas, baños, pisos y techos. Llame al (713) 909-0034.',
    'Humble es la ciudad del noreste de Houston sobre la Interestatal 69, con un centro más viejo y subdivisiones posteriores hacia FM 1960 y Lake Houston. El trabajo se agenda desde 77082.',
    [
      'Humble no es Kingwood, aunque el mapa los pone cerca. El pueblo viejo tiene casas más chicas, algunas de madera, algunas de ladrillo, de varias décadas, casi todas sobre losa. Las subdivisiones de FM 1960 y hacia el lago son casas posteriores sobre losa, muchas de dos pisos, con cocinas abiertas y techos bajo pinos. Tratamos la dirección. Un rancho de los 60 y una casa de dos pisos de los 2000 son cocinas distintas y techos distintos.',
      'El río San Jacinto y Lake Houston son la geografía del agua. Las zonas bajas han recibido agua de tormenta en ciclones pasados. Las calles más altas, no. Si el agua subió a la casa, dígalo. Si se soltó un calentador en el garaje, dígalo también. Mezclar esas historias no le ayuda a usted ni a su aseguradora. Fotografiamos lo que se puede ver y secamos los materiales que de verdad están mojados.',
      'El granizo y el viento recto son las llamadas de techo. Asfalto en casas de uno y dos pisos, con basura de pino en los valles del lado del lago. Los techos viejos del pueblo pueden ser ya un mosaico de parches. Decimos si otro parche es justo. Un techo abierto recibe lona cuando el clima y la escalera lo permiten. Las tablas son para vidrio roto y puertas que no cierran, cuando una tormenta o una rama atraviesa una ventana.',
      'Las roturas por helada pasan aquí por la misma razón que en el resto de Houston. Las líneas del ático y de las paredes exteriores se parten, y el agua aparece en un cielo o en un zoclo. Las casas sobre losa no tienen un sótano que la reciba. Paramos el avance encontrando los cuartos mojados, quitando lo que no se salva y secando lo que sí.',
      'Remodelar la cocina en el pueblo viejo suele ser un cuarto chico, fuera de escuadra, con un drenaje que quizá no quiere moverse. En las subdivisiones nuevas la cocina ya es el centro de la planta baja, y el proyecto es gabinetes, cubiertas y luz. Los baños siguen el mismo corte. Un baño de pasillo en el pueblo es un trabajo apretado de impermeabilización. Un baño principal cerca del lago tiene espacio, y igual se pudre si la regadera se enloseta sobre un plato débil.',
      'Los pisos en Humble conviven con la humedad del lago y, en algunas calles, con una historia de agua de afuera. La loseta y el vinil son los pisos prácticos sobre losa. La madera es un piso de sala cuando la losa está seca y se mantiene seca. No ponemos madera para tapar un problema de humedad. La alfombra que se inundó no se seca y se vuelve a poner.',
      'Humble es su propia ciudad en muchas de estas direcciones, y eso significa sus propios permisos. Las calles cercanas pueden caer en Houston. Lo revisamos. Las asociaciones aparecen en las subdivisiones. Llame al (713) 909-0034. Desde la oficina se cruza Houston hacia el noreste. Acordamos una ventana.',
    ],
    [
      services.storm('Agua del río, granizo y viento. Cada uno se documenta como lo que es.'),
      services.tarp('Para techos abiertos por viento o ramas, antes de que el cielo reciba otra lluvia.'),
      services.water('Calentadores de garaje, líneas de ático y plantas bajas que recibió el río.'),
      services.kitchen('Cocinas chicas y viejas en el pueblo, cocinas abiertas en las subdivisiones posteriores.'),
      services.bath('Baños de pasillo apretados y baños principales más grandes. El plato importa más que el color de la loseta.'),
      services.tile('Un piso práctico sobre las losas de Humble, en cocinas, baños y cuartos principales.'),
      services.vinyl('Después de la alfombra, o después de que un piso mojado de verdad secó.'),
      services.wood('Donde el cuarto y la losa lo permiten. Primero pasa tiempo en la casa.'),
      services.roof('Techos del pueblo y techos del lago bajo pinos. Caminamos el que usted tiene.'),
      services.replace('Cuando los parches y la edad cubren las pendientes, no una sola pestaña faltante.'),
    ],
    [
      {
        q: '¿Humble es la misma visita que Kingwood?',
        a: 'No. Están cerca y comparten tormentas, pinos y el lago. Las casas y las oficinas de permisos no son las mismas. Díganos la dirección. Las dos se agendan desde la oficina de Houston.',
      },
      {
        q: '¿Y si el agua entró desde el río?',
        a: 'Fotografíela, no entre si hay electricidad de por medio, y llame. El agua que sube no se anota como un tubo reventado. Su aseguradora decide qué póliza responde. Secamos y reparamos lo que usted contrata.',
      },
      {
        q: '¿Pueden remodelar una cocina chica de Humble?',
        a: 'Sí. Los cuartos chicos son la mayor parte del pueblo viejo. Medimos antes de hablar de mover un muro o un fregadero. Gabinetes nuevos en la huella que ya existe también son un proyecto real.',
      },
      {
        q: '¿Me representan ante la aseguradora?',
        a: 'No somos ajustadores públicos. Ayudamos con fotos, un estimado de reparación y el trabajo. Usted presenta el reclamo. La aseguradora decide la cobertura y el pago.',
      },
    ],
    [
      { href: '/es/blog/first-24-hours-water-damage-houston', label: 'Las primeras 24 horas con daño de agua' },
      { href: '/es/blog/houston-bathroom-remodel-guide', label: 'Remodelar un baño en Houston' },
    ],
  ),
  page(
    'friendswood-tx',
    'Friendswood',
    'Casas de Friendswood cerca de Clear Creek, al sureste de Houston. Viento de la costa, inundación, cocinas, baños, pisos y techos. Llame al (713) 909-0034.',
    'Friendswood es su propia ciudad al sureste de Houston, entre el Gulf Freeway y Clear Creek. Agendamos remodelación y restauración desde 511 Crestwater Ct.',
    [
      'Las casas son sobre todo planos suburbanos de ladrillo, de los años 60 hasta los 90, sobre losa, con algunas secciones más nuevas. Ranchos de un piso y casas de dos pisos comparten calle. Las cocinas se han actualizado por partes, así que los gabinetes, las cubiertas y el piso pueden ser tres décadas distintas. Vemos lo que usted quiere cambiar, en lugar de suponer que hay que tirar todo.',
      'Clear Creek es el agua que aquí ya se conoce. El terreno bajo cerca del arroyo se ha inundado en ciclones pasados. Las cuadras más lejos del arroyo no todas recibieron agua. El otro temporal es el viento de la costa y la lluvia empujada. Los techos y las ventanas ven más viento que un vecindario del noroeste de Harris, y la humedad se queda porque la bahía no está lejos. Una filtración de techo y el agua del arroyo en el mismo mes siguen siendo dos eventos. Los documentamos así. Su aseguradora decide la cobertura.',
      'Hay granizo, y también viento que levanta teja sin un golpe de granizo. Subimos al techo y decimos lo que vemos. Una cubierta abierta recibe lona. El metal blando alrededor de las ventilas falla mientras el campo todavía se ve parejo desde el jardín. Las pendientes al sur envejecen más rápido al sol. No vendemos un reemplazo desde la banqueta.',
      'Entre tormentas, la llamada ordinaria es una fuga interior: un calentador en el garaje, el suministro de un inodoro, la línea del lavavajillas, un tubo que se partió en una helada. Sobre una losa, esa agua está en el drywall y bajo el piso el mismo día. La humedad de Friendswood no seca el cuarto porque usted abrió una ventana. Los deshumidificadores son parte de un secado de verdad.',
      'Remodelar la cocina aquí mezcla ranchos que siguen cerrados y cocinas posteriores ya abiertas a un den. Mover un fregadero es trabajo de losa. El baño suele ser un principal con una tina que se quiere convertir en regadera, o un baño de pasillo con un plato que ya falló. La impermeabilización es el trabajo. La loseta es lo que se ve después.',
      'Los pisos se inclinan a la loseta y al vinil por la humedad y, en algunas calles, porque la casa ya se mojó antes. Los dos necesitan una losa seca y pareja. La madera puede vivir en una sala de Friendswood si el producto y la barrera de humedad le quedan a la losa, y si la madera pasa tiempo en la casa primero. El laminado que se sentó en agua de inundación se reemplaza. No se seca y vuelve a ser piso.',
      'Friendswood da sus propios permisos. Eso es distinto de una dirección de Houston a unos minutos. Algunas subdivisiones tienen asociaciones que revisan techos y pintura. Desde nuestra oficina del oeste se cruza la ciudad, por el Beltway o hacia la I-45. Llame al (713) 909-0034. Si el agua sigue avanzando, llame.',
    ],
    [
      services.storm('Inundación del arroyo y viento de la costa. Esas notas se quedan separadas.'),
      services.tarp('Cuando el viento o una rama abre el techo. Fotos primero, si es seguro.'),
      services.water('Calentadores de garaje, líneas de suministro y casas que recibió Clear Creek.'),
      services.kitchen('Actualizada por partes, o todavía la cocina original del rancho. Cotizamos lo que cambia.'),
      services.bath('Tinas convertidas en regadera y platos cansados. Impermeabilización antes de la loseta.'),
      services.tile('Un piso habitual de Friendswood sobre losa. Lo pareja que esté decide el tamaño de la loseta.'),
      services.vinyl('Estable con la humedad, cuando la losa está seca y lo bastante nivelada.'),
      services.wood('Un piso de sala, no la respuesta para un cuarto que sigue húmedo.'),
      services.roof('Viento, sol y las uniones de metal. Caminamos todas las pendientes.'),
      services.replace('Cuando el techo ya se acabó en toda la casa, no en una sola orilla levantada por el viento.'),
    ],
    [
      {
        q: '¿Friendswood es parte de Houston?',
        a: 'Es su propia ciudad. Los permisos salen de Friendswood, no del ayuntamiento de Houston. Igual confirmamos la dirección, porque las orillas del mapa se leen mal con facilidad.',
      },
      {
        q: '¿En qué se distingue el agua de Clear Creek de una fuga?',
        a: 'El agua que subió de afuera y el agua de una línea de suministro son eventos distintos. Las pólizas a menudo los tratan distinto. Fotografiamos la línea de agua o la rotura que se puede ver. Su aseguradora decide qué cubre.',
      },
      {
        q: '¿Qué piso aguanta esta humedad?',
        a: 'La loseta y un vinil hecho para losa son las respuestas habituales en cocinas, baños y cuartos principales. La madera puede funcionar en una sala seca. Vemos la losa antes de recomendar uno.',
      },
      {
        q: '¿Presentan el reclamo por mí?',
        a: 'Usted lo presenta con su aseguradora. No somos ajustadores públicos. Documentamos el daño y reparamos lo que usted contrata. No decidimos el pago.',
      },
    ],
    [
      { href: '/es/blog/houston-flooring-for-humidity', label: 'Pisos para la humedad de Houston' },
      { href: '/es/blog/houston-flood-damage-repair', label: 'Reparar después de una inundación' },
    ],
  ),
  page(
    'tomball-tx',
    'Tomball',
    'Casas viejas de Tomball y lotes nuevos hacia la 249. Granizo, cimentaciones distintas, cocinas, baños, pisos y techos. Llame al (713) 909-0034.',
    'Tomball es la ciudad del noroeste sobre FM 2920 y la carretera 249, con un centro viejo y subdivisiones nuevas hacia el Grand Parkway. La cuadrilla se agenda desde Houston 77082.',
    [
      'El centro de Tomball y las secciones nuevas son construcciones distintas. Cerca del pueblo viejo hay casas más chicas en lotes más grandes, una mezcla de pilotes y losa, con árboles pegados a los aleros. Más afuera, las casas son planos nuevos de dos pisos sobre losa, a menudo postensada, con cocinas abiertas y techos grandes. Una remodelación de cocina que mueve un muro es una conversación distinta en cada una. Medimos la casa que usted tiene.',
      'El granizo de primavera y el viento son el patrón de tormenta de este lado de Houston. Los techos reciben golpes que no se ven desde el jardín, y las ramas de los árboles de los lotes viejos caen en los valles. Caminamos el techo. Si la madera está abierta, la tapamos cuando es seguro. Un techo cerrado con golpes sueltos puede ser una reparación. Un techo golpeado en cada pendiente es una conversación de reemplazo. Decimos cuál después de la inspección, no desde una foto del driveway.',
      'La inundación aquí tiene más que ver con arroyos y drenaje plano que con un solo bayou por el medio del pueblo. Algunas calles bajas han recibido agua de tormenta. Muchos lotes solo se encharcan. La llamada interior más común es un tubo reventado en una helada: líneas de ático en las casas nuevas de dos pisos, y líneas en paredes exteriores o bajo el piso en las casas viejas sobre pilotes. El hueco hay que verlo. La casa de losa hay que medirla en el zoclo.',
      'Las cocinas de las casas viejas suelen ser todavía cuartos separados. La gente quiere luz y una mesa más grande, y la estructura decide hasta dónde se puede. Las cocinas nuevas ya están abiertas. Ahí el trabajo es gabinetes, cubiertas, un backsplash y un piso que no se detiene en la puerta. Los baños siguen. Un baño de pasillo viejo necesita que se encuentre el drenaje antes de que crezca la regadera. Un baño principal nuevo necesita un plato y un muro impermeabilizado, y después la loseta.',
      'El piso sobre una losa de Tomball convive con la humedad y con el movimiento de la arcilla. La loseta y el vinil son los pisos de trabajo. La madera se ve bien en una sala y se mueve si se instala el día que llega, o si el hueco bajo una casa vieja sigue húmedo. Acostumbramos la madera en la casa. No flotamos un piso sobre un contrapiso mojado.',
      'Tomball es su propia ciudad en el pueblo, y algunas direcciones cercanas son del condado de Harris o quedan cerca del condado de Montgomery. El permiso sigue la dirección. Las asociaciones de las secciones nuevas revisan el exterior. El color del techo puede ser pregunta de ellas. Un lavabo, por lo general, no. Desde la oficina se toma la US 290 a la 249, o el Grand Parkway según la sección. Llame al (713) 909-0034.',
      'No hay un local en Tomball. Empresa familiar en Houston desde 1993. Si el techo está abierto o el agua se está extendiendo, dígalo cuando llame para tratarlo como la emergencia que es.',
    ],
    [
      services.storm('Granizo y viento en techos viejos y en los nuevos grandes. Inspeccionamos antes de nombrar la reparación.'),
      services.tarp('Cubre una cubierta abierta. El plan de la escalera sigue los árboles y el lote.'),
      services.water('Fugas en el hueco de las casas viejas, roturas de ático en los dos pisos nuevos.'),
      services.kitchen('Cuartos separados en el centro, planos abiertos en las secciones nuevas.'),
      services.bath('Baños de pasillo chicos y baños principales grandes. Primero lo impermeable.'),
      services.vinyl('Un piso estable sobre losas nuevas, cuando el concreto está parejo y seco.'),
      services.tile('Cocinas, baños y cuartos principales. La loseta grande necesita un piso más parejo.'),
      services.wood('En cuartos secos. Bajo una casa vieja, importa la humedad del hueco.'),
      services.roof('Desde techos viejos simples hasta techos nuevos recortados. Todas las pendientes.'),
      services.replace('Cuando la teja ya se terminó en toda la casa.'),
    ],
    [
      {
        q: '¿Solo trabajan dentro de la ciudad de Tomball?',
        a: 'Trabajamos el área de Tomball, y el permiso sigue la dirección. Algunas calles están en la ciudad y otras en el condado. Díganos la dirección cuando llame al (713) 909-0034.',
      },
      {
        q: '¿Las casas viejas están sobre pilotes?',
        a: 'Muchas cerca del pueblo original sí, o mezclan una casa original sobre pilotes con una adición de losa. Las subdivisiones nuevas son losa, y muchas de esas son postensadas. Lo confirmamos antes de hablar de mover un drenaje.',
      },
      {
        q: '¿Cómo se ve el granizo desde el suelo?',
        a: 'Muchas veces, como nada. Los golpes, el asfalto cuarteado y el metal dañado se ven en el techo. Los fotografiamos. Un techo también puede estar gastado sin granizo. Diremos si eso es lo que estamos viendo.',
      },
      {
        q: '¿Son el contratista de la aseguradora?',
        a: 'No. Trabajamos para quien nos contrata. No somos ajustadores públicos. Su aseguradora decide el reclamo. Nosotros hacemos la documentación y la construcción.',
      },
    ],
    [
      { href: '/es/blog/houston-hail-storm-roof-claims', label: 'Reclamos de granizo en el techo' },
      { href: '/es/blog/remodeling-a-houston-ranch-house', label: 'Remodelar una casa tipo rancho' },
    ],
  ),
];

const bySlug = new Map(esNeighborhoods.map((item) => [item.slug, item]));

export function getEsNeighborhood(slug: string) {
  return bySlug.get(slug);
}

const spanishServiceSet = new Set<string>(spanishServiceSlugs);
const postSet = new Set<string>(houstonPostSlugs);

function linkOk(href: string) {
  if (href === '/es/houston-storm-damage' || href === '/es/emergency' || href === '/es/contact' || href === '/es/blog' || href === '/es') {
    return true;
  }
  if (href.startsWith('/es/blog/')) return postSet.has(href.slice('/es/blog/'.length));
  if (href.startsWith('/es/')) {
    const slug = href.slice(4);
    return spanishServiceSet.has(slug) || (neighborhoodSlugs as readonly string[]).includes(slug);
  }
  return false;
}

const errors: string[] = [];
const seenDescription = new Set<string>();
const seenOpening = new Set<string>();

if (esNeighborhoods.length !== neighborhoodSlugs.length) {
  errors.push('Spanish neighborhood list is out of sync');
}

for (const item of esNeighborhoods) {
  if (!titleFits(item.title)) errors.push(`Title does not fit: ${item.title}`);
  if (item.description.length > 155) errors.push(`Description is ${item.description.length}: ${item.slug}`);
  if (seenDescription.has(item.description)) errors.push(`Duplicate description: ${item.slug}`);
  seenDescription.add(item.description);
  const opening = item.paragraphs[0] ?? '';
  if (seenOpening.has(opening)) errors.push(`Duplicate opening: ${item.slug}`);
  seenOpening.add(opening);
  const words = wordCount([
    item.lede,
    ...item.paragraphs,
    ...item.services.flatMap((service) => [service.label, service.note]),
    ...item.faqs.flatMap((faq) => [faq.q, faq.a]),
  ]);
  if (words < 650) errors.push(`${item.slug} Spanish copy is thin (${words} words)`);
  if (!item.ctaBody.includes(phone)) errors.push(`${item.slug} CTA missing phone`);
  const blob = [
    item.description,
    item.lede,
    item.ctaBody,
    ...item.paragraphs,
    ...item.faqs.flatMap((faq) => [faq.q, faq.a]),
    ...item.services.map((service) => `${service.label} ${service.note ?? ''}`),
  ].join('\n');
  try {
    assertCopyAllowed(item.path, blob);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
  if (!blob.includes('No somos ajustadores públicos.')) {
    errors.push(`${item.path} is missing the Spanish insurance sentence`);
  }
  for (const link of [...item.services, ...item.also]) {
    if (!linkOk(link.href)) errors.push(`${item.slug} links an unknown path: ${link.href}`);
  }
}

if (errors.length > 0) {
  throw new Error(errors.join('\n'));
}
