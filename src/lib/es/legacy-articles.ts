import type { Article } from '@/lib/articles';
import { assertCopyAllowed } from '@/lib/copy-guards';
import { houstonPostSlugs } from '@/lib/locale-paths';
import { parseLocalLandingSlug } from '@/lib/local-paths';
import { spanishServiceSlugs } from '@/lib/i18n';
import { titleFits } from '@/lib/seo';

const phone = '(713) 909-0034';
const office = 'nuestra oficina en el oeste de Houston (77082)';

export type EsLegacyArticle = import('@/lib/articles').Article & { path: string };

const legacyArticles: Article[] = [
  {
    slug: 'remodeling-vs-restoring-whats-right-for-your-home',
    title: 'Remodelar o restaurar: qué necesita la casa',
    metaTitle: 'Restaurar o remodelar en Houston',
    crumb: 'Restaurar o remodelar',
    lines: ['Restaurarlo,', 'o remodelarlo.'],
    description:
      'Cómo distinguir una restauración de una remodelación, cuándo una casa de Houston necesita las dos, y qué dejar claro antes de empezar.',
    lede: 'Una cocina pasada de moda y una cocina dañada por agua son problemas distintos. Una es la decisión de cambiar el cuarto. La otra es la casa pidiendo que la pongan de vuelta.',
    image: '/images/services/kitchen-remodeling.jpg',
    service: 'kitchen-remodeling',
    ctaTitle: '¿No está seguro de qué trabajo es?',
    ctaBody: `Cuéntenos qué pasó, o qué quiere que haga el cuarto. Le ayudamos a separar la reparación de la remodelación antes de que alguien le ponga precio. Llame al ${phone}. Salimos de ${office}.`,
    related: ['how-to-prevent-water-damage-in-your-home', 'kitchen-remodel-benefits'],
    sections: [
      {
        heading: 'La restauración devuelve la casa',
        blocks: [
          {
            type: 'p',
            text: 'La restauración es el trabajo que sigue al daño: una fuga en la línea de suministro, un techo que dejó entrar la tormenta, humo, o el agua que dejaron los bomberos. La meta es un espacio seguro, seco y usable otra vez, tan cerca de cómo estaba antes de la pérdida como lo permitan los materiales.',
          },
          {
            type: 'p',
            text: 'Eso suele significar secar, quitar lo que no se puede salvar y reconstruir los acabados que ya estaban. El seguro muchas veces aplica, porque algo falló. La prisa importa. La tablaroca y el piso mojados no mejoran mientras usted compara estilos de puerta.',
          },
        ],
      },
      {
        heading: 'La remodelación cambia el cuarto a propósito',
        blocks: [
          {
            type: 'p',
            text: 'Una remodelación se planea. Usted quiere otro plano, gabinetes nuevos, un baño que de verdad funcione, o pisos que combinen con el resto de la casa. Nada tiene que estar roto para que el proyecto tenga sentido.',
          },
          {
            type: 'p',
            text: 'Las remodelaciones tardan más en decidirse y, por lo general, más en construirse. Los permisos aparecen cuando se mueven muros, plomería o electricidad. El costo es suyo, no de un reclamo, así que el trabajo debe quedar definido antes de la demolición.',
          },
        ],
      },
      {
        heading: 'Una forma simple de ordenar el trabajo',
        blocks: [
          {
            type: 'list',
            items: [
              'Si el cuarto está inseguro, mojado o manchado por un evento repentino, empiece por la restauración.',
              'Si el cuarto está cansado pero sano, está remodelando.',
              'Si el daño y la lista de deseos llegaron juntos, seque y estabilice primero, y después decida qué vale la pena cambiar.',
            ],
          },
          {
            type: 'p',
            text: 'Mezclarlos demasiado pronto es la forma en que una reparación se vuelve una remodelación sin fin, o una remodelación empieza sobre una capa mojada bajo el piso. Separamos las dos para que el trabajo urgente se termine y el trabajo opcional se elija.',
          },
        ],
      },
      {
        heading: 'Muchas casas necesitan las dos',
        blocks: [
          {
            type: 'p',
            text: 'Una fuga bajo el fregadero puede arruinar una hilera de gabinetes que ya no le gustaba. El humo puede llevarse la tablaroca de un cuarto que usted quería abrir. En esos casos la restauración es la primera fase: dejarlo seco, limpio y estructuralmente sano. La remodelación es la segunda: gabinetes nuevos, un plano corrido, un piso que sigue al cuarto de al lado.',
          },
          {
            type: 'p',
            text: 'Hacer las dos con una sola cuadrilla mantiene el secado, la carpintería y los acabados en el mismo plan. No le está pasando una cocina a medio secar de una cuadrilla de secado a un remodelador que no vio la pérdida.',
          },
        ],
      },
    ],
  },
  {
    slug: 'how-to-prevent-water-damage-in-your-home',
    title: 'Cómo prevenir el daño de agua en su casa',
    metaTitle: 'Evitar daño de agua en Houston',
    crumb: 'Evitar daño de agua',
    lines: ['Pare la fuga', 'antes del desmonte.'],
    description:
      'Revisiones prácticas de líneas, techos y cuartos húmedos para que una casa de Houston no llegue a una restauración por agua.',
    lede: 'La mayoría de los trabajos de agua que vemos empezaron en algo chico: una línea de suministro, una charola, una unión de metal, una canaleta tapada. Lo caro es cuánto tiempo se quedó así.',
    image: '/images/services/water-damage-restoration.jpg',
    service: 'water-damage-restoration',
    emergency: true,
    ctaTitle: '¿Ya está encontrando agua?',
    ctaBody: `Si el cielo está mojado, el piso está blando o un aparato se soltó, llame al ${phone}. Secar temprano cuesta menos que reconstruir después. Salimos de ${office}.`,
    related: ['frozen-and-burst-pipes-in-houston', 'water-damage-insurance-claims-in-texas'],
    sections: [
      {
        heading: 'Por dónde le entra el agua a una casa de Houston',
        blocks: [
          {
            type: 'p',
            text: 'Los techos planos, las temporadas largas de enfriamiento y las tormentas repentinas empujan el agua a los mismos lugares: calentadores, mangueras de la lavadora, líneas del lavavajillas y de la fábrica de hielo, muros de ventana, y techos que estaban bien hasta una tormenta. Los baños y las cocinas esconden las fugas lentas detrás de los gabinetes.',
          },
        ],
      },
      {
        heading: 'Un recorrido dos veces al año',
        blocks: [
          {
            type: 'p',
            text: 'Dos veces al año, mire lo que mueve el agua y lo que se supone que la mantiene afuera. No necesita una caja de herramientas. Necesita una linterna y diez minutos en silencio.',
          },
          {
            type: 'list',
            items: [
              'Líneas de suministro en inodoros, fregaderos, lavadora, lavavajillas y refrigerador. Busque corrosión, abultamientos y un residuo blanco costroso.',
              'La charola del calentador y el drenaje que se supone que usa. Una charola llena de agua ya es una fuga.',
              'Gabinetes bajo el fregadero y el piso frente al lavavajillas. El aglomerado hinchado es el registro de una fuga, no una mancha.',
              'Salidas de canaleta, bajantes y el suelo junto a la cimentación. El agua debe irse de la casa, no quedarse contra ella.',
              'Manchas en el ático y en el cielo después de una lluvia fuerte, sobre todo bajo ventilas, tubos y valles.',
            ],
          },
        ],
      },
      {
        heading: 'Cambie las líneas que fallan sin aviso',
        blocks: [
          {
            type: 'p',
            text: 'Las líneas de suministro trenzadas de acero inoxidable cuestan poco junto a un cuarto inundado, y las mangueras de hule de las lavadoras son una falla común. Si una línea es original de un aparato viejo, cámbiela cuando cambie el aparato, o antes si se siente dura o se ve manchada.',
          },
          {
            type: 'p',
            text: 'Sepa dónde está la llave general y confirme que de verdad gira. En un reventón, el movimiento útil es parar el agua y después salir del agua estancada si los contactos o el panel pueden estar mojados.',
          },
        ],
      },
      {
        heading: 'Cuando sí encuentra agua',
        blocks: [
          {
            type: 'p',
            text: 'Cierre el suministro si puede hacerlo sin caminar por agua estancada cerca de la electricidad. Mueva lo que pueda salvar. Fotografíe el origen y el daño antes de tirar nada. Después seque la estructura. Los ventiladores del clóset del pasillo no sustituyen encontrar la humedad en el muro o bajo el piso.',
          },
          {
            type: 'p',
            text: `Si el agua vino de una rotura repentina o de una tormenta, llame al ${phone} el mismo día. Si hay seguro de por medio, Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Mientras más tiempo sigan mojados la tablaroca, el aislamiento y la madera, más del cuarto hay que quitar.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'what-to-do-after-a-fire-your-first-5-steps',
    title: 'Qué hacer después de un incendio: los primeros cinco pasos',
    metaTitle: 'Después de un incendio en Houston',
    crumb: 'Después de un incendio',
    lines: ['Las primeras horas', 'después del fuego.'],
    description:
      'Los primeros pasos después de un incendio en Houston: no entre hasta que sea seguro, abra el reclamo, documente, cierre la casa y empiece la limpieza.',
    lede: 'Cuando todos están afuera y los bomberos están en la escena, las siguientes decisiones son la seguridad, el reclamo y evitar que un edificio dañado empeore durante la noche.',
    image: '/images/projects/siding/siding-upgrade-in-progress.jpg',
    service: 'emergency-board-up',
    emergency: true,
    ctaTitle: '¿Hay que cerrar el edificio?',
    ctaBody: `Si los bomberos ya entregaron la propiedad y necesita tablas, lona o limpieza, llame al ${phone}. Atendemos emergencias en el área de Houston. Salimos de ${office}.`,
    related: [
      'remodeling-vs-restoring-whats-right-for-your-home',
      'how-to-prevent-water-damage-in-your-home',
    ],
    sections: [
      {
        heading: '1. Quédese afuera hasta que le permitan entrar',
        blocks: [
          {
            type: 'p',
            text: 'Saque a todos y llame al 911. No vuelva a entrar por documentos, por mascotas que no puede ver, ni por un vistazo rápido a la cocina. El humo, un piso debilitado y un fuego que no está del todo apagado son los peligros que lastiman a la gente después de que bajan las primeras llamas.',
          },
          {
            type: 'p',
            text: 'Espere a que los bomberos digan que el edificio es seguro para entrar. Si solo permiten un recorrido acompañado, tómelo, y no se quede a empezar la limpieza.',
          },
        ],
      },
      {
        heading: '2. Llame a su aseguradora y abra un registro',
        blocks: [
          {
            type: 'p',
            text: 'Llame a la aseguradora en cuanto razonablemente pueda, el mismo día si la oficina o la línea de reclamos está abierta. Pregunte cómo quieren que reporte la pérdida y qué necesitan antes de que se quite el escombro. Anote el número de reclamo y el nombre de cada persona con la que hable.',
          },
        ],
      },
      {
        heading: '3. Fotografíe lo que pueda ver con seguridad',
        blocks: [
          {
            type: 'p',
            text: 'Desde un lugar seguro, fotografíe cuartos, techos, aberturas rotas y pertenencias dañadas antes de que las muevan. Incluya tomas abiertas y tomas cercanas. El agua que se usó para apagar el fuego es parte de la pérdida. Cielos, pisos y contenido que solo se ven mojados igual pertenecen al registro.',
          },
          {
            type: 'list',
            items: [
              'Acabados y muebles carbonizados o derretidos',
              'Humo en los cielos y dentro de los gabinetes',
              'Vidrio roto, techos abiertos y puertas faltantes',
              'Tablaroca y piso mojados por el agua de los bomberos',
            ],
          },
        ],
      },
      {
        heading: '4. Cierre el edificio contra el clima y contra la entrada',
        blocks: [
          {
            type: 'p',
            text: 'Un techo abierto, una ventana rota o una puerta que no cierra con llave convierten una pérdida en dos. Las tablas y la lona están para dejar la lluvia afuera y la casa segura hasta que se planeen las reparaciones. Si los bomberos no apagaron ya los servicios, pregúnteles antes de que alguien más toque el gas o el panel.',
          },
        ],
      },
      {
        heading: '5. Empiece la limpieza antes de que el hollín se quede',
        blocks: [
          {
            type: 'p',
            text: 'El hollín es ácido. Mientras más tiempo se quede en el metal, la piedra y la madera acabada, más de esas superficies se pierden. Limpiar después de un incendio no es un fin de semana con limpiador de casa. Es quitar lo que no se puede salvar, limpiar lo que sí, y secar por donde fue el agua de los bomberos.',
          },
          {
            type: 'p',
            text: 'Después del trabajo de emergencia, la reconstrucción puede ser una restauración directa o el inicio de una remodelación. Esa elección puede esperar a que el edificio esté seguro, seco y documentado.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/emergency-board-up', label: 'Tablas para ventanas y puertas abiertas' },
              { href: '/es/fire-damage-restoration', label: 'Restauración por fuego y humo' },
              { href: '/es/roofing-emergency-tarp-repair', label: 'Lona de emergencia en el techo' },
              { href: '/es/water-damage-restoration', label: 'Secado después del agua de los bomberos' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'bathroom-upgrades-that-boost-your-homes-resale-value',
    title: 'Mejoras de baño que ayudan a vender la casa',
    metaTitle: 'Mejoras de baño en Houston',
    crumb: 'Mejoras de baño',
    lines: ['El trabajo de baño', 'que el comprador nota.'],
    description:
      'Mejoras de baño que sí nota un comprador en Houston: impermeabilización sana, acabados honestos, luz, ventilación y pisos que aguantan agua.',
    lede: 'Un comprador lee un baño rápido. Busca fugas, muebles cansados y un cuarto que se sienta cuidado. Las mejoras que ayudan a una venta son las que quitan esas dudas.',
    image: '/images/services/bathroom-remodeling.jpg',
    service: 'bathroom-remodeling',
    ctaTitle: '¿Está planeando el baño antes de vender?',
    ctaBody: `Recorremos el cuarto y le decimos qué vale la pena en la casa que tiene, no en una versión de catálogo. Llame al ${phone}. Salimos de ${office}.`,
    related: [
      'signs-its-time-to-replace-your-homes-flooring',
      'remodeling-vs-restoring-whats-right-for-your-home',
    ],
    sections: [
      {
        heading: 'Repare lo que se ve descuidado',
        blocks: [
          {
            type: 'p',
            text: 'Un piso blando junto a la tina, boquilla manchada, una junta de silicón que se despegó y un extractor que no mueve aire le dicen al comprador que las zonas húmedas se ignoraron. Arregle eso antes de gastar en un espejo nuevo. Un baño limpio, seco y ordinario le gana a uno arreglado con madera blanda bajo el piso.',
          },
        ],
      },
      {
        heading: 'Impermeabilice los muros húmedos',
        blocks: [
          {
            type: 'p',
            text: 'Si la loseta se está cayendo o la regadera ha estado goteando, este es el trabajo que importa. Una base de regadera bien hecha, un respaldo sano y un drenaje que quede donde va el agua son lo que evita que el siguiente dueño herede su desmonte. Loseta de adorno sobre una base fallida no sobrevive una inspección de venta.',
          },
        ],
      },
      {
        heading: 'Luz, aire y muebles que funcionan',
        blocks: [
          {
            type: 'p',
            text: 'Un baño oscuro, lleno de vapor, o con una llave que hay que pelear, se va a sentir más viejo que el resto de la casa. Luz empotrada o de tocador que llegue al espejo, un extractor que ventile hacia afuera, y muebles a los que todavía se les consiguen piezas, alcanzan. Que el metal combine en la llave, la regadera y los toalleros hace que un cuarto chico se vea terminado.',
          },
        ],
      },
      {
        heading: 'Pisos que pertenecen a un cuarto húmedo',
        blocks: [
          {
            type: 'p',
            text: 'La loseta quebrada y el vinil hinchado son los pisos que el comprador pisa primero. La loseta de porcelana y un vinil de lujo que aguante el agua son razonables aquí. La loseta de formato grande puede hacer que un baño chico se sienta más tranquilo si el plano es simple. El piso con calor es una comodidad, no un requisito para vender en Houston.',
          },
          {
            type: 'p',
            text: 'Si va a vender pronto, no mueva muros ni agregue una segunda cabeza de regadera para la que no tiene calentador. Gaste el presupuesto en la impermeabilización, un piso sano y muebles que se vean intencionales.',
          },
        ],
      },
    ],
  },
  {
    slug: 'signs-its-time-to-replace-your-homes-flooring',
    title: 'Señales de que ya es hora de cambiar el piso',
    metaTitle: 'Cambiar el piso en Houston',
    crumb: 'Cambiar el piso',
    lines: ['Cuando un piso', 'ya se acabó.'],
    description:
      'Cómo saber cuándo hay que cambiar alfombra, loseta, madera, vinil o laminado en una casa de Houston, en vez de limpiarlo o parcharlo.',
    lede: 'Los pisos fallan a la vista de todos. Se curvan, se levantan en las uniones, se mueven bajo el pie, o se quedan opacos por más que se limpien. Son problemas distintos, y solo algunos se resuelven con limpieza.',
    image: '/images/services/wood-flooring.jpg',
    service: 'wood-flooring',
    ctaTitle: '¿Quiere otra mirada al piso?',
    ctaBody: `Mande fotos o pídanos que lo recorramos. Instalamos madera, loseta, vinil y laminado, y le decimos si una reparación alcanza. Llame al ${phone}. Salimos de ${office}.`,
    related: [
      'bathroom-upgrades-that-boost-your-homes-resale-value',
      'kitchen-remodel-benefits',
    ],
    sections: [
      {
        heading: 'Movimiento que se siente',
        blocks: [
          {
            type: 'p',
            text: 'Un punto blando, un rebote, o una loseta que hace clic puede significar que el problema está bajo el acabado: una capa mojada bajo el piso, una tabla suelta, o mezcla que se soltó. Cubrir eso con material nuevo sin abrirlo es la forma en que el siguiente piso falla en el mismo lugar.',
          },
        ],
      },
      {
        heading: 'El agua deja un registro',
        blocks: [
          {
            type: 'p',
            text: 'La madera curvada, los bordes de laminado hinchados, el vinil con burbujas y las manchas oscuras que regresan después de secar son historia de agua. En una cocina, un baño o el cuarto de lavado, pregunte qué se mojó antes de escoger un color nuevo. Si la capa bajo el piso está dañada, el cambio incluye esa reparación.',
          },
        ],
      },
      {
        heading: 'Desgaste que la limpieza no deshace',
        blocks: [
          {
            type: 'list',
            items: [
              'El acabado gastado hasta la madera cruda en los pasos de más tráfico',
              'Alfombra apelmazada, con manchas que regresan después de lavarla',
              'Loseta quebrada de lado a lado, o boquilla perdida en tramos largos',
              'Vinil que se enrosca en las uniones o se rompe en la puerta',
              'Laminado hinchado, con las uniones levantadas',
            ],
          },
          {
            type: 'p',
            text: 'Una sola tabla o loseta dañada puede ser una reparación. El mismo daño repetido por todo el cuarto es un cambio. Los bordes en los que uno tropieza son un asunto de seguridad, no de estilo, y van al principio de la lista.',
          },
        ],
      },
      {
        heading: 'Cuando el resto de la casa ya siguió adelante',
        blocks: [
          {
            type: 'p',
            text: 'Si la cocina, la pintura y los muebles ya se actualizaron y el piso sigue siendo de la década anterior, el cuarto se va a seguir viendo sin terminar. Es una razón válida para cambiarlo, una vez que lo que está debajo esté seco y parejo.',
          },
          {
            type: 'p',
            text: 'Las cocinas y los baños quieren una superficie que aguante derrames. Las salas pueden llevar madera o un producto con apariencia de madera si la losa, o la capa bajo el piso, sirve. Vemos el cuarto, la humedad y cómo vive usted ahí antes de recomendar un material.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/wood-flooring', label: 'Pisos de madera' },
              { href: '/es/vinyl-flooring', label: 'Piso de vinil' },
              { href: '/es/tile-flooring', label: 'Pisos de loseta' },
              { href: '/es/laminate-flooring', label: 'Pisos laminados' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'kitchen-remodel-benefits',
    title: 'Cinco razones para hacer una remodelación de cocina',
    metaTitle: 'Por qué remodelar la cocina',
    crumb: 'Remodelación de cocina',
    lines: ['Para qué sirve', 'remodelar la cocina.'],
    description:
      'Qué debe cambiar una remodelación de cocina en Houston: cómo cocina, dónde guarda, la luz, los aparatos cansados y un acabado que le quede a la casa.',
    lede: 'Una remodelación de cocina vale la pena cuando el cuarto funciona mejor todos los días, no solo cuando se ve bien en una foto.',
    image: '/images/services/kitchen-remodeling.jpg',
    service: 'kitchen-remodeling',
    ctaTitle: '¿Está pensando en la cocina?',
    ctaBody: `Medimos el cuarto que tiene y hablamos del plano, los gabinetes y los acabados antes de que alguien empiece a demoler. Llame al ${phone}. Salimos de ${office}.`,
    related: [
      'remodeling-vs-restoring-whats-right-for-your-home',
      'signs-its-time-to-replace-your-homes-flooring',
    ],
    sections: [
      {
        heading: 'El cuarto coincide con cómo cocina',
        blocks: [
          {
            type: 'p',
            text: 'El cambio útil es la circulación. El fregadero, la estufa y el refrigerador siguen siendo el núcleo de trabajo, y una remodelación es la oportunidad de acortar los pasos incómodos entre ellos. Deje un espacio libre a cada lado de la estufa y del fregadero. Si cocinan dos personas, déles dos lugares donde pararse que no sean las mismas 30 pulgadas.',
          },
        ],
      },
      {
        heading: 'Almacenaje al que sí llega',
        blocks: [
          {
            type: 'p',
            text: 'Muchas cocinas que “no alcanzan” son gabinetes que desperdician la esquina y una despensa que es una puerta al desorden. Bases con cajones para las ollas, un separador de charolas y una despensa en la que pueda ver van a cambiar el cuarto más que un color nuevo en los gabinetes de arriba. Decida lo que tiene antes de dibujar los gabinetes.',
          },
        ],
      },
      {
        heading: 'Luz y aire que se notan a las 6 de la tarde',
        blocks: [
          {
            type: 'p',
            text: 'Las cocinas fallan en la noche, cuando el único plafón deja las cubiertas oscuras. Luz bajo los gabinetes, una lámpara sobre el fregadero o la isla, y una campana que de verdad extraiga son las piezas poco lucidas por las que la gente se lo agradece. Si los aparatos ya están tan viejos que usted planea alrededor de ellos, cambiarlos como parte de la remodelación suele ser más simple que forzar gabinetes nuevos alrededor de ellos después.',
          },
        ],
      },
      {
        heading: 'Un nivel de acabado que la casa puede sostener',
        blocks: [
          {
            type: 'p',
            text: 'Piedra, gabinetes pintados y un backsplash sencillo se van a ver bien en la mayoría de las casas de Houston. La versión cara no es, por sí sola, la mejor cocina de todos los días. Elija materiales con los que esté dispuesto a vivir: una cubierta que aguante una olla caliente o que no, un piso que aguante un derrame, un acabado de gabinete que pueda retocar.',
          },
        ],
      },
      {
        heading: 'Una secuencia, no seis contratistas',
        blocks: [
          {
            type: 'p',
            text: 'Una cocina toca gabinetes, cubiertas, loseta, piso, electricidad y plomería. El beneficio de hacerla como un solo proyecto es que esos oficios van en orden, el plano se decide una vez, y hay una sola llamada cuando una medida no cuadra. La mayoría de las cocinas completas se miden en semanas, no en días, y el calendario debe decirse en voz alta antes de la demolición.',
          },
          {
            type: 'p',
            text: 'Si la cocina también está mojada por una fuga, seque y repare eso primero. Una hilera de gabinetes nuevos sobre un muro húmedo no es una remodelación. Es una segunda pérdida.',
          },
        ],
      },
    ],
  },
  {
    slug: 'frozen-and-burst-pipes-in-houston',
    title: 'Tubos congelados y reventados en Houston: qué hacer primero',
    metaTitle: 'Tubos congelados y reventados',
    crumb: 'Tubos congelados o reventados',
    lines: ['Se soltó un tubo.', 'Haga esto primero.'],
    description:
      'Qué hacer primero si un tubo de Houston se congela o se revienta: cierre el agua, abra las llaves, tome fotos y sepa cuándo pedir el secado.',
    lede: 'Una helada fuerte es poco común en Houston, y por eso los tubos que fallan suelen ser los que nadie miró: una línea del ático, un muro exterior o una llave de manguera. Si el agua ya salió, párela antes de hacer cualquier otra cosa.',
    image: '/images/services/water-damage-restoration.jpg',
    service: 'water-damage-restoration',
    emergency: true,
    ctaTitle: '¿Sigue entrando agua?',
    ctaBody: `Llame al ${phone}. Si no puede llamar, el formulario de emergencia llega al mismo equipo. Secamos y reparamos. Su aseguradora decide lo que paga la póliza. Salimos de ${office}.`,
    related: ['water-damage-insurance-claims-in-texas', 'how-to-prevent-water-damage-in-your-home'],
    sections: [
      {
        heading: 'Cierre el agua',
        blocks: [
          {
            type: 'p',
            text: 'Si un tubo está chorreando, o un cielo está goteando por una línea que no puede ver, cierre la válvula principal del agua. Suele estar en el medidor o donde la línea entra a la casa. Gírela en el sentido de las manecillas del reloj. Un solo mueble puede tener su propia válvula bajo el fregadero o detrás del inodoro. Use esa solo cuando esté seguro de que la rotura está en ese suministro.',
          },
          {
            type: 'p',
            text: 'No se quede en agua estancada cerca de contactos, aparatos o el panel eléctrico. Si no encuentra la llave, o el agua sigue saliendo después de cerrarla, pida ayuda. No adivine en una válvula de gas.',
          },
        ],
      },
      {
        heading: 'Abra las llaves y no se meta con la calefacción a lo bruto',
        blocks: [
          {
            type: 'p',
            text: 'Con la llave general cerrada, abra las llaves para que baje la presión y las líneas puedan drenar. Empiece por una llave en el piso más bajo. Abra el agua caliente y la fría si no sabe qué línea falló. Si el tubo está congelado pero no se ha reventado, una llave abierta le da al deshielo un lugar a dónde ir.',
          },
          {
            type: 'list',
            items: [
              'No descongele un tubo con soplete ni con flama abierta.',
              'Si el suministro de agua está cerrado, apague el calentador para que no esté calentando un tanque vacío.',
              'Una secadora de pelo en un tramo congelado al que pueda llegar es suficiente. Manténgala lejos del agua.',
            ],
          },
        ],
      },
      {
        heading: 'Fotografíe antes de limpiar',
        blocks: [
          {
            type: 'p',
            text: 'Cuando el agua ya está parada, tome fotos antes de mover pertenencias o tirar algo. Tomas abiertas de cada cuarto mojado, tomas cercanas de la rotura si la puede ver, y el camino que siguió el agua. Una lista corta de lo que se mojó sirve tanto como las fotos.',
          },
          {
            type: 'p',
            text: 'Su aseguradora decide lo que cubre la póliza. Las fotos son para su registro y para quien le pida que seque la casa. Si quiere un paquete cuarto por cuarto que pueda llenar usted mismo, el registro de fotos del seguro en este sitio está ahí cuando quiera un registro cuarto por cuarto.',
          },
          {
            type: 'links',
            items: [
              { href: '/insurance-log', label: 'Abrir el registro de fotos del seguro' },
              { href: '/es/insurance-claims', label: 'Cómo documentamos una pérdida de agua o de tormenta' },
            ],
          },
        ],
      },
      {
        heading: 'Cuándo pedir ayuda para secar',
        blocks: [
          {
            type: 'p',
            text: 'Las toallas y un ventilador de casa alcanzan para un charco chico en un piso duro que atrapó de inmediato. Pida el secado cuando el agua entró al edificio, no solo cuando cayó encima.',
          },
          {
            type: 'list',
            items: [
              'Un cielo está colgando, manchado, o sigue goteando después de cerrar el agua.',
              'La tablaroca, el aislamiento o la alfombra se quedaron mojados.',
              'El agua llegó a la losa y no puede ver hasta dónde viajó.',
              'La rotura está en un ático o en un muro que usted no debería abrir.',
              'No está seguro de que el sistema eléctrico sea seguro.',
            ],
          },
          {
            type: 'p',
            text: 'El trabajo que limita más daño es directo: sacar el agua, secar la estructura y guardar un registro. Con la humedad de Houston, un cuarto que se ve seco puede seguir guardando humedad en el muro o en la losa. Secar es un trabajo distinto de la reconstrucción, y debe ocurrir primero.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/emergency', label: 'Pedir ayuda de emergencia' },
              { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
              {
                href: '/es/blog/houston-freeze-prep-for-pipes',
                label: 'Cómo preparar los tubos de Houston antes de una helada',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'water-damage-insurance-claims-in-texas',
    title: 'Reclamos de seguro por daño de agua en Texas: una lista para el dueño',
    metaTitle: 'Lista de reclamo de agua en Texas',
    crumb: 'Lista del reclamo',
    lines: ['El reclamo,', 'en orden.'],
    description:
      'Lista para el dueño de casa en Texas después de un daño de agua: documente la pérdida, limite más daño y vea al ajustador con su contratista.',
    lede: 'Un reclamo es una conversación con su aseguradora sobre su póliza. Lo útil, el día de la pérdida, es un registro claro y una casa seca. Son trabajos separados.',
    image: '/images/services/water-damage-restoration.jpg',
    service: 'insurance-claims',
    ctaTitle: '¿Hay que dejar el daño por escrito?',
    ctaBody: `Fotografiamos lo que se mojó y lo que se secó o se reparó. Su aseguradora decide la cobertura. Nosotros somos el contratista. Llame al ${phone}. Salimos de ${office}.`,
    related: ['frozen-and-burst-pipes-in-houston', 'how-to-prevent-water-damage-in-your-home'],
    sections: [
      {
        heading: 'Ponga la casa a salvo y después documéntela',
        blocks: [
          {
            type: 'p',
            text: 'Pare más agua si puede hacerlo con seguridad. Cierre el suministro si es una fuga de plomería. No se quede en agua estancada cerca de la electricidad. Después fotografíe antes de limpiar: cada cuarto, el origen si lo puede ver, y las pertenencias antes de moverlas. Una lista escrita de lo dañado va con las fotos.',
          },
          {
            type: 'p',
            text: 'No tire materiales dañados hasta que estén fotografiados, si puede guardarlos sin un problema de seguridad. Si algo es un peligro, anote por qué lo quitó y conserve las fotos.',
          },
        ],
      },
      {
        heading: 'Llame a su aseguradora',
        blocks: [
          {
            type: 'p',
            text: 'Reporte la pérdida a la compañía que emitió la póliza, o al agente que pueda empezar ese reporte. Pregunte cómo quieren el aviso, y qué plazo usa su póliza. Muchas pólizas dicen que el aviso debe ser pronto. No todas usan el mismo número de días, así que la fuente es la póliza o la aseguradora, no un contratista.',
          },
          {
            type: 'p',
            text: 'Anote el número de reclamo, el nombre de la persona con la que habló y qué le dijeron que hiciera después. Pregunte si quieren que un ajustador vea el daño antes de las reparaciones permanentes, y qué protección temporal esperan mientras tanto.',
          },
        ],
      },
      {
        heading: 'Limite más daño',
        blocks: [
          {
            type: 'p',
            text: 'Las pólizas de casa suelen pedirle que proteja la propiedad de más daño y que guarde registros de costos razonables. La suya puede decirlo de otra forma. Lea las condiciones, o pregúntele a la aseguradora. Parar el agua, poner lona en una abertura y secar materiales mojados es el sentido usual de ese deber. No es una promesa de que la póliza los vaya a pagar.',
          },
          {
            type: 'p',
            text: 'Guarde los recibos. Fotografíe el trabajo temporal. Evite reparaciones permanentes que escondan el daño antes de que el ajustador lo haya visto, a menos que la aseguradora le diga que siga o que dejarlo abierto empeore la pérdida. Si tiene que cubrir algo, fotografíelo primero.',
          },
          {
            type: 'links',
            items: [
              { href: '/insurance-log', label: 'Llenar un registro de fotos cuarto por cuarto' },
              { href: '/es/insurance-claims', label: 'Qué documentamos, y qué no decidimos' },
            ],
          },
        ],
      },
      {
        heading: 'Ver al ajustador',
        blocks: [
          {
            type: 'p',
            text: 'El ajustador trabaja para la aseguradora. Esté ahí si puede. Recorra los cuartos con sus fotos, señale el daño que es fácil pasar por alto, y pregunte qué se midió. Puede compartir el paquete que armó. También puede pedir, por escrito, lo que no entienda.',
          },
          {
            type: 'p',
            text: 'No somos ajustadores públicos. Somos el contratista. Podemos fotografiar las condiciones y hacer el secado y las reparaciones. El reclamo y el pago se quedan con su aseguradora.',
          },
        ],
      },
    ],
  },
  {
    slug: 'what-to-do-after-water-damage-houston',
    title: 'Qué hacer después de un daño de agua en una casa de Houston',
    metaTitle: 'Después del daño de agua',
    crumb: 'Después del daño de agua',
    lines: ['El primer día', 'después del agua.'],
    description:
      'Qué hacer el primer día o dos después de un daño de agua en Houston: póngase a salvo, seque la estructura y documente la pérdida.',
    lede: 'Una línea de suministro, un techo que abrió una tormenta, o agua sobre una losa empiezan igual. El aire de Houston ya es húmedo, así que una casa mojada no se seca mientras usted decide.',
    image: '/images/services/water-damage-restoration.jpg',
    service: 'water-damage-restoration',
    ctaTitle: '¿Hay agua en la casa?',
    ctaBody: `Llame al ${phone}, o use el formulario de contacto. Díganos de dónde vino el agua y si sigue entrando. Salimos de ${office}.`,
    related: ['water-damage-insurance-claims-in-texas', 'how-to-prevent-water-damage-in-your-home'],
    faqs: [
      {
        q: '¿Abro las ventanas para secar un cuarto en Houston?',
        a: 'El aire de afuera aquí muchas veces está demasiado mojado para ayudar. Mantenga la casa cerrada y saque la humedad con deshumidificación. Un ventilador de casa mueve el aire. No seca un muro mojado ni una losa.',
      },
      {
        q: '¿Puedo tirar la alfombra mojada antes de que llegue el ajustador?',
        a: 'Fotografíela en el cuarto primero, con una toma abierta y una cercana. Si es un peligro y tiene que quitarla, guarde esas fotos y una nota de lo que salió de la casa. Pregúntele a su aseguradora qué quieren que conserve.',
      },
      {
        q: '¿Un olor a humedad significa que la casa no es segura para vivir?',
        a: 'Un olor a humedad significa que algo sigue húmedo. Encuentre ese material y séquelo o quítelo. Si alguien se siente mal, esa pregunta es para un médico.',
      },
      {
        q: '¿Quién decide lo que paga la aseguradora?',
        a: 'Su aseguradora. Registramos lo que se mojó y lo que se secó o se reparó. Enviamos nuestro estimado a su aseguradora para que lo apruebe y lo trabajamos con el ajustador. No somos ajustadores públicos. Su aseguradora atiende el reclamo.',
      },
    ],
    sections: [
      {
        heading: 'No se meta en agua que pueda lastimarlo',
        blocks: [
          {
            type: 'p',
            text: 'Los primeros minutos son de las personas, no del piso. Si el agua está estancada cerca de contactos, una lámpara o el panel eléctrico, no pise ahí. Si puede llegar a la llave general sin cruzar esa agua, ciérrela cuando el origen sea un tubo, una manguera o un aparato. La llave general suele estar en el medidor o donde la línea entra a la casa. Gírela en el sentido de las manecillas del reloj. Una válvula bajo un fregadero sirve solo cuando la rotura está en ese suministro.',
          },
          {
            type: 'p',
            text: 'Si el agua está bajando por el cielo, no se quede bajo un cielo que está colgando. Puede aguantar más de lo que la mancha sugiere. No se suba al techo con lluvia, ni a una terraza que pueda estar blanda. Saque lo que pueda de los cuartos mojados y deje el resto hasta tener un camino seguro. Si huele a gas, no encuentra la llave, o el agua sigue saliendo después de girar la válvula, pida ayuda. No adivine en una válvula de gas.',
          },
        ],
      },
      {
        heading: 'Use el primer día para limitar hasta dónde llega',
        blocks: [
          {
            type: 'p',
            text: 'Las toallas y un ventilador de casa pueden con un charco chico en un piso duro que atrapó en el momento. No son un plan de secado cuando el agua ya llegó a la tablaroca, el aislamiento, el acolchonado de la alfombra o el interior de un gabinete. Esos materiales guardan agua después de que el piso se ve limpiado. Deje las ventanas cerradas. El aire de afuera en Houston muchas veces está más mojado que el aire de un cuarto cerrado. Pida el secado cuando un cielo está manchado o sigue goteando, cuando la alfombra o la tablaroca se quedaron mojadas, o cuando no está seguro de que la electricidad sea segura. La pintura nueva espera a que la estructura esté seca.',
          },
          {
            type: 'p',
            text: 'Muchas casas de Houston están sobre losa. El agua corre bajo el piso y sube por el muro. Usted ve la pintura. El papel de la tablaroca arriba del piso es lo que se queda mojado. Las cajas de gabinete de aglomerado se hinchan abajo. La madera se curva. El laminado se levanta en las uniones. En una casa de dos pisos en Memorial o Bellaire, la misma fuga a menudo mancha el cielo de abajo, y la mancha no siempre está bajo el mueble que falló. Si es seguro, quite los muebles del piso mojado y abra las puertas de los gabinetes.',
          },
        ],
      },
      {
        heading: 'La humedad es la razón de no dejarlo sentado',
        blocks: [
          {
            type: 'p',
            text: 'Un conteo de moho no ayudaría. Lo que vemos aquí es más simple. La humedad de Houston no le da mucha ayuda a los materiales mojados. Un cuarto puede sentirse más seco al tacto y seguir mojado dentro del muro, el aislamiento o el acolchonado de la alfombra. Ahí es donde empieza un olor a humedad, casi siempre fuera de la vista. Esperar el fin de semana porque la superficie se ve mejor es la forma en que un escape chico se vuelve un desmonte.',
          },
          {
            type: 'p',
            text: 'Un olor en un cuarto cerrado, una mancha que sube de la línea original del agua, o un piso que sigue blando son razones para abrir el conjunto y medirlo. No son razones para pintar. El cloro en un zoclo no seca el aislamiento de atrás. El primer sobre una mancha húmeda esconde la pista y deja la humedad en su lugar. Encuentre los materiales mojados, seque lo que se pueda salvar y quite lo que no. Si alguien en la casa es sensible al moho, dígalo cuando llame. El trabajo es el mismo. No debe cerrarse y dejarse así.',
          },
        ],
      },
      {
        heading: 'Fotografíe antes de tirar nada',
        blocks: [
          {
            type: 'p',
            text: 'Su aseguradora decide lo que paga la póliza. El registro es la parte que usted puede atender el primer día. Recorra cada cuarto mojado antes de limpiar. Tome una foto abierta y después una cercana del origen si lo puede ver: una línea de suministro partida, una mancha en una penetración del techo, un calentador y su charola. Fotografíe las pertenencias antes de moverlas, y fotografíe el camino del agua, incluidos los cuartos que solo se ven un poco afectados.',
          },
          {
            type: 'p',
            text: 'Escriba una lista corta junto a las fotos. Nombre el cuarto, qué se mojó y cualquier cosa que quitó porque era un peligro. Si la alfombra o la tablaroca tienen que salir antes de la visita del ajustador, las fotos son lo que todavía lo muestra. Guarde recibos de lonas y del secado. Muchas pólizas esperan que usted limite más daño y que guarde un registro de costos razonables. La suya puede decirlo distinto. Pregúntele a la aseguradora. Nosotros no somos la fuente de lo que exige su forma.',
          },
          {
            type: 'p',
            text: 'Detenga las reparaciones permanentes que esconderían el daño hasta que un ajustador lo haya visto, a menos que dejar una abertura empeore la pérdida o la aseguradora le haya dicho que siga. Si tiene que cubrir algo, fotografíelo primero. El registro de fotos del seguro en este sitio es un paquete cuarto por cuarto. Es suyo, lo contrate o no.',
          },
        ],
      },
      {
        heading: 'Por dónde suele entrarle el agua a una casa de Houston',
        blocks: [
          {
            type: 'p',
            text: 'Las llamadas son ordinarias hasta que el agua se queda. Una manguera de lavadora, una línea de fábrica de hielo, un calentador en un clóset, una regadera que ha estado mojando el muro, un valle o el collar de un tubo de ventilación después de una tormenta. En una losa de un piso en Spring Branch o Katy, esa agua tiene un camino plano bajo el piso. Cerca de Clear Lake, la lluvia empujada por el viento puede encontrar las ventanas en la misma semana. Los primeros pasos no cambian con el vecindario. Cuánto hay que quitar depende de cuánto tiempo se quedó mojado.',
          },
          {
            type: 'p',
            text: 'Llame a la compañía que emitió la póliza en cuanto razonablemente pueda. Pregunte cómo quieren el aviso, y si un ajustador debe ver el daño antes del trabajo permanente. Anote el número de reclamo. El plazo del aviso está en la póliza. No es igual en cada forma de Texas, así que pregúntele a la aseguradora cuál es la fecha.',
          },
          {
            type: 'p',
            text: 'No somos ajustadores públicos. Fotografiamos, secamos y reconstruimos. El reclamo y la cantidad pagada se quedan con su aseguradora.',
          },
        ],
      },
      {
        heading: 'El secado y la reconstrucción son una secuencia',
        blocks: [
          {
            type: 'p',
            text: 'Los primeros pasos paran más daño: sacar el agua estancada, correr movedores de aire y deshumidificadores, y anotar lo que dicen los medidores. La tablaroca, el piso, los gabinetes y la pintura empiezan cuando la estructura está seca. Pintar un muro húmedo es la forma en que la mancha regresa. Si también quiere remodelar esa cocina o ese baño, séquelo primero. Una hilera de gabinetes nuevos sobre un muro mojado es una segunda pérdida.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
              { href: '/es/insurance-claims', label: 'Ayuda con reclamos de seguro' },
              { href: '/es/painting-drywall-repair', label: 'Pintura y reparación de drywall' },
              { href: '/es/restoration', label: 'Restauración en Houston' },
              {
                href: '/es/water-damage-restoration-houston-tx',
                label: 'Restauración por daño de agua en Houston',
              },
              {
                href: '/es/water-damage-restoration-katy-tx',
                label: 'Restauración por daño de agua en Katy',
              },
              { href: '/insurance-log', label: 'Registro de fotos del seguro' },
              { href: '/es/contact', label: 'Formulario de contacto' },
            ],
          },
        ],
      },
      {
        heading: 'Cuando quiere una cuadrilla en la casa',
        blocks: [
          {
            type: 'p',
            text: `Llame al ${phone}, o use el formulario de contacto. Diga de dónde vino el agua y si sigue entrando. Elite Restorations es una empresa familiar, trabaja desde ${office}, y restaura y remodela casas de Houston desde 1993. Secamos la estructura y, cuando usted quiere, reconstruimos la tablaroca, los pisos y los acabados. La cobertura la decide su aseguradora. La visita es sobre la casa.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'storm-and-hail-roof-repair-houston',
    title: 'Reparación de techo por tormenta y granizo en Houston',
    metaTitle: 'Techo por granizo y tormenta',
    crumb: 'Techos de granizo y tormenta',
    lines: ['Después del granizo', 'o de una tormenta fuerte.'],
    description:
      'Cómo ver daño de granizo y viento en un techo de Houston, cuándo pedir una reparación, y cómo se documenta el reclamo del seguro.',
    lede: 'El granizo y un viento fuerte no siempre dejan un hoyo que se vea desde la banqueta. La gotera muchas veces aparece en la siguiente lluvia, en un cielo que el mes pasado estaba bien.',
    image: '/images/projects/roofing/brick-house-missing-shingles.webp',
    service: 'roofing',
    ctaTitle: '¿No está seguro de qué hizo la tormenta?',
    ctaBody: `Llame al ${phone}, o use el formulario de contacto. Si está entrando agua, dígalo al empezar la llamada. Salimos de ${office}.`,
    related: ['what-to-do-after-water-damage-houston', 'how-insurance-claims-work-texas-restoration'],
    faqs: [
      {
        q: '¿Puedo subirme a revisar las tejas yo mismo?',
        a: 'Quédese en el suelo. Tejas mojadas, madera lastimada bajo las tejas, y una pendiente que usted no camina en un día normal son la forma en que la gente se lastima después de una tormenta. Díganos lo que puede ver desde el jardín. Nosotros vemos el techo.',
      },
      {
        q: '¿Una mancha en el cielo significa que hay que cambiar todo el techo?',
        a: 'No. Una mancha puede ser metal en una unión, una teja levantada, o un problema más amplio. La inspección dice cuál. Cambiar un techo que se puede reparar es el trabajo equivocado, y parchar un techo que ya se acabó también es el trabajo equivocado.',
      },
      {
        q: '¿Reparo el techo antes de que visite el ajustador?',
        a: 'Fotografíe primero. Una lona sobre una abertura limita más daño y no debería esperar a una reunión si viene lluvia. Las tejas permanentes que tapan la evidencia suelen esperar a que el ajustador haya visto el techo, a menos que la aseguradora le diga que siga o que dejarlo abierto empeore la pérdida.',
      },
      {
        q: '¿Me van a decir si el reclamo se va a pagar?',
        a: 'No. Documentamos el techo y hacemos el trabajo que usted contrata. La cobertura, el deducible y la cantidad pagada los decide su aseguradora.',
      },
    ],
    sections: [
      {
        heading: 'Mire desde el jardín, no desde un techo mojado',
        blocks: [
          {
            type: 'p',
            text: 'Después de una tormenta, camine la casa de día, cuando el viento ya bajó. Quédese en el suelo. Un techo mojado o lastimado no es un lugar desde donde inspeccionar. Los binoculares ayudan. Busque tejas faltantes, quebradas o levantadas en las orillas, la capa que se ve debajo, y escombro que haya atravesado. Revise el suelo y las canaletas por montones de gránulo. Unos cuantos gránulos en un bajante son normales en un techo viejo. Una dispersión fresca de arenilla después del granizo es razón para que vean el techo.',
          },
          {
            type: 'p',
            text: 'Mire el metal blando mientras está ahí. El granizo abolla canaletas, bajantes, tapas de chimenea y las aletas de un aire acondicionado exterior. Los mosquiteros y las cubiertas de las luces también se marcan. Esas abolladuras no prueban que cada teja esté arruinada. Sí le dicen que el granizo llegó a la casa, y eso vale saberlo antes de que la siguiente lluvia mueva la evidencia. Fotografíe las abolladuras y el gránulo disperso el mismo día si puede. Es fácil olvidarlos cuando el jardín ya está limpio.',
          },
        ],
      },
      {
        heading: 'Qué le hace el granizo a un techo de Houston',
        blocks: [
          {
            type: 'p',
            text: 'El asfalto arquitectónico es el techo que más vemos, en casas de ladrillo en Memorial y Bellaire y en techos más nuevos en Katy, Pearland y The Woodlands. El granizo magulla la teja y le tumba el gránulo. La teja puede verse solo manchada hasta que el agua encuentra la magulladura. La loseta se puede quebrar. El metal se puede abollar. Una membrana en un tramo más plano se puede perforar. Las marcas suelen estar en la pendiente que dio la cara a la tormenta, y a lo largo de las caderas y los caballetes, no regadas como una mancha de pintura.',
          },
          {
            type: 'p',
            text: 'El metal que mantiene el agua afuera es el otro lugar donde se ven las tormentas. Los collares de hule, el metal de los valles y el metal donde un techo se junta con un muro se pueden levantar o partir aunque el techo principal se vea tranquilo. Esa es una fuente común de la mancha en el cielo que aparece una semana después, bajo un baño o una chimenea, sin una teja faltante a la vista. Si desde el suelo ve una orilla levantada o un collar quebrado, dígalo cuando llame. No jale de él.',
          },
          {
            type: 'list',
            items: [
              'Gránulo fresco en las canaletas o en la tierra después de una granizada',
              'Manchas oscuras donde la superficie de la teja se ve magullada o punteada',
              'Loseta quebrada, o paneles de metal con abolladuras nuevas',
              'Abolladuras en canaletas, tapas de chimenea y aletas del aire acondicionado',
              'Una mancha en el cielo que apareció en la lluvia después de la tormenta',
            ],
          },
        ],
      },
      {
        heading: 'Qué hace el viento, además del granizo',
        blocks: [
          {
            type: 'p',
            text: 'El viento levanta pestañas, marca las tejas y tira ramas. Una rama sobre el techo es una abertura aunque el resto del techo se vea entero. El viento también empuja la lluvia contra las ventanas y el siding, así que una mancha interior no siempre es un problema de techo. Vemos el techo y el muro que da al clima antes de decirle cuál dejó entrar el agua. Las casas bajo árboles grandes, comunes en Memorial, Bellaire y The Heights, juntan más de esto que una subdivisión abierta.',
          },
          {
            type: 'p',
            text: 'Si el techo está abierto, la primera reparación muchas veces es una lona, y solo cuando es seguro estar arriba. Una lona es temporal. Mantiene la siguiente lluvia fuera del aislamiento y del cielo. No es un techo terminado, y hay que verla después del siguiente viento. La lona de emergencia, una reparación y un reemplazo son trabajos distintos. Decimos cuál necesita el techo que tenemos enfrente después de estar arriba, no desde una foto tomada en la banqueta.',
          },
        ],
      },
      {
        heading: 'Cuándo llamar',
        blocks: [
          {
            type: 'p',
            text: 'Llame el mismo día si está entrando agua, si ve luz de día a través del techo, si hay una rama sobre la casa, o si un cielo está colgando. Llame antes de la siguiente lluvia si el gránulo se soltó fresco, si las tejas están levantadas, o si apareció una mancha en el cielo después de la tormenta y por ahora sigue seca. Una mancha que hoy está seca puede ser una gotera que solo corre cuando el viento empuja la lluvia.',
          },
          {
            type: 'p',
            text: 'No necesita saber si el techo se puede reparar. Eso es la inspección. Algunas magulladuras se pueden reparar. Un techo magullado en toda una pendiente, o que ya está cerca del final de su vida, muchas veces hay que quitarlo. La edad, la madera bajo las tejas y cómo está entrando el agua importan. Fotografiamos lo que encontramos para que usted tenga ese registro de cualquier modo. Reparar un techo que se puede salvar, y cambiar uno que no, son las dos respuestas honestas. La visita es cómo las distinguimos.',
          },
        ],
      },
      {
        heading: 'Cómo suele empezar el reclamo del techo',
        blocks: [
          {
            type: 'p',
            text: 'Si va a preguntarle a su aseguradora por la tormenta, fotografíe antes de que se repare nada. Incluya cada lado de la casa, las pendientes que pueda ver desde el suelo, las abolladuras del metal blando, las canaletas y cualquier mancha interior. Anote la fecha de la tormenta. Después llame a la compañía que emitió la póliza y pregunte cómo quieren que se reporte la pérdida. Anote el número de reclamo. Pregunte si el deducible de viento o granizo es distinto del deducible de una fuga de plomería. Su póliza es la forma que hay que revisar.',
          },
          {
            type: 'p',
            text: 'Un ajustador trabaja para la aseguradora. Si puede, esté en la visita y recorra el exterior y los cielos manchados con sus fotos. Pregunte qué se midió. No tiene que estar de acuerdo con un número en el momento. Las preguntas que le queden pueden volver a la aseguradora por escrito. Podemos estar en la casa para hablar del techo: qué está magullado, qué está abierto, y qué incluiría una reparación o un reemplazo.',
          },
          {
            type: 'p',
            text: 'Damos fotos de la inspección y un plan escrito del trabajo que usted nos contrata. Su aseguradora decide la cobertura. Una cotización de reparación no es un reclamo. Mantenga esos dos papeles separados.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/roofing', label: 'Techos' },
              { href: '/es/hail-damage-roof-repair', label: 'Reparación de techos por granizo' },
              { href: '/es/roof-replacement', label: 'Reemplazo de techo' },
              { href: '/es/roofing-emergency-tarp-repair', label: 'Lona de emergencia en el techo' },
              { href: '/es/insurance-claims', label: 'Ayuda con reclamos de seguro' },
              { href: '/es/restoration', label: 'Restauración en Houston' },
              { href: '/es/roofing-houston-tx', label: 'Techos en Houston' },
              { href: '/es/roofing-memorial-tx', label: 'Techos en Memorial' },
              { href: '/es/contact', label: 'Formulario de contacto' },
            ],
          },
        ],
      },
      {
        heading: 'Si el techo está abierto, o no está seguro',
        blocks: [
          {
            type: 'p',
            text: `Llame al ${phone}, o use el formulario de contacto. Si está entrando agua, dígalo al empezar la llamada. Ponemos lona cuando es seguro, fotografiamos el daño, y después reparamos o cambiamos el techo que la casa de verdad necesita. Elite Restorations es una empresa familiar y sirve a Houston desde 1993. Las visitas se agendan desde ${office}, y el trabajo se agenda desde ahí.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'how-insurance-claims-work-texas-restoration',
    title: 'Cómo funcionan los reclamos de seguro en una restauración de Texas',
    metaTitle: 'Pasos de un reclamo en Texas',
    crumb: 'Reclamos de restauración',
    lines: ['Cómo sigue', 'un reclamo de verdad.'],
    description:
      'Cómo suele avanzar un reclamo de restauración de casa en Texas, del primer aviso a la visita del ajustador, y qué puede y no puede hacer un contratista.',
    lede: 'Un reclamo es una conversación con su aseguradora sobre su póliza. La restauración es el trabajo en la casa. Ocurren al mismo tiempo, y no son el mismo trabajo.',
    image: '/images/projects/roofing/brick-gable-attic-vent.jpg',
    service: 'insurance-claims',
    ctaTitle: '¿Hay que dejar el daño por escrito?',
    ctaBody: `Llame al ${phone}, o use el formulario de contacto. Vemos la casa. Su aseguradora decide lo que paga la póliza. Salimos de ${office}.`,
    related: ['water-damage-insurance-claims-in-texas', 'storm-and-hail-roof-repair-houston'],
    faqs: [
      {
        q: '¿Tengo que contratar al contratista que vio la casa?',
        a: 'No. Una visita no lo amarra al trabajo. Contratar es su decisión. Pida el plan por escrito antes de que empiece nada.',
      },
      {
        q: '¿Pueden ver al ajustador conmigo?',
        a: 'Sí, si nos quiere ahí. Podemos hablar del daño y de la reparación. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No somos ajustadores públicos.',
      },
      {
        q: '¿Debo esperar a secar la casa hasta que aprueben el reclamo?',
        a: 'No. Parar más agua, y secar lo que se mojó, limita más daño. La aprobación es una decisión aparte, y puede no llegar antes de que los materiales empeoren. Guarde fotos y recibos.',
      },
      {
        q: '¿Esto es consejo legal sobre la ley de seguros de Texas?',
        a: 'No. Describe cómo suelen avanzar el trabajo y el papeleo. Su póliza y su aseguradora son la fuente de los plazos, los deducibles y la cobertura. Para preguntas legales, hable con un abogado que usted elija.',
      },
    ],
    sections: [
      {
        heading: 'Empiece por la casa, y después el papeleo',
        blocks: [
          {
            type: 'p',
            text: 'Ponga la propiedad a salvo antes de preocuparse por las formas. Pare una fuga de plomería si puede hacerlo sin caminar por agua cerca de la electricidad. No se suba a un techo dañado. Si una tormenta abrió el techo o rompió una ventana, una cubierta temporal evita que la siguiente lluvia se vuelva una segunda pérdida. Fotografíe ese daño antes de cubrirlo, si puede hacerlo con seguridad. Esta página describe el orden usual. No es consejo legal, y no es una lectura de su póliza.',
          },
          {
            type: 'p',
            text: 'Después llame a la compañía de la póliza, o al agente que pueda abrir el reporte. Pregunte cómo quieren el aviso, qué quieren que conserve, y si quieren que un ajustador vea el daño antes de las reparaciones permanentes. Anote el número de reclamo, la fecha y el nombre de cada persona con la que hable. El lenguaje del aviso está en su póliza. No es idéntico en cada póliza de Texas, así que pregúntele a la aseguradora cuál es el plazo. Pídale a la aseguradora que le señale el texto, y guarde esa respuesta con el número de reclamo.',
          },
        ],
      },
      {
        heading: 'Los pasos que la mayoría de los dueños sí recorre',
        blocks: [
          {
            type: 'p',
            text: 'El orden es bastante estable, aunque el daño no lo sea. Primero se protege la casa y se fotografía. Después se abre el reclamo. Después alguien seca o pone lona en lo que empeoraría si esperara. Después el ajustador mira. Después usted lee lo que manda la aseguradora y pregunta por lo que no coincida con sus fotos o con su póliza. Las reparaciones que reconstruyen acabados suelen venir después de esa mirada, a menos que la espera empeore la pérdida.',
          },
          {
            type: 'list',
            items: [
              'Ponga la casa a salvo y pare más agua si puede hacerlo con seguridad',
              'Fotografíe cuartos, el origen y las pertenencias antes de la limpieza',
              'Abra el reclamo y anote el número de reclamo',
              'Ponga lona, tablas o seque lo que empeoraría si esperara, y guarde los recibos',
              'Vea al ajustador con sus fotos y pregunte qué se midió',
              'Compare lo que manda la aseguradora con la casa, y pregunte por los huecos por escrito',
              'Contrate la reparación cuando esté listo, con un plan que ya leyó',
            ],
          },
          {
            type: 'p',
            text: 'Guarde un archivo simple. Fotos, el número de reclamo, nombres, recibos de la protección temporal y notas de lo que se quitó. El registro de fotos del seguro en este sitio guarda la parte cuarto por cuarto de ese archivo. Llévelo a la reunión con el ajustador. No decide la cobertura. Mantiene los hechos en un solo lugar. El agua que subió de afuera suele ser otra conversación, distinta de una línea de suministro reventada o de una gotera de techo. Pregúntele a su aseguradora qué póliza, si alguna, aplica al agua que usted tuvo.',
          },
        ],
      },
      {
        heading: 'La reunión con el ajustador',
        blocks: [
          {
            type: 'p',
            text: 'El ajustador trabaja para la aseguradora. Esté ahí si puede. Recorra los cuartos y las partes del techo que estén dispuestos a ver. Señale el daño que es fácil pasar por alto: un piso blando lejos de la mancha obvia, aislamiento mojado, abolladuras en las canaletas, un cielo que solo gotea cuando el viento empuja la lluvia. Comparta sus fotos. Pregunte qué se midió, y pida una copia de lo que escriban. Tome notas de los nombres y de cualquier cosa que le hayan dicho que revisarían después.',
          },
          {
            type: 'p',
            text: 'Puede hacer preguntas en el momento. También puede preguntar después, por escrito, por lo que no entienda. No tiene que aceptar una cifra en el driveway. Si un contratista está con usted, esa persona puede hablar de la condición del edificio y del trabajo que haría. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No somos ajustadores públicos. Su aseguradora decide lo que paga la póliza.',
          },
        ],
      },
      {
        heading: 'Qué puede hacer un contratista de restauración',
        blocks: [
          {
            type: 'p',
            text: 'Un contratista puede fotografiar el daño visible, poner lona en una abertura cuando es seguro, extraer el agua y secar la estructura. Un contratista puede anotar qué estaba mojado, qué se quitó y qué se reconstruyó. Un contratista puede darle un plan y un precio del trabajo que usted contrata: techo, tablaroca, piso, siding, pintura. Un contratista puede ver al ajustador en la casa y contestar preguntas sobre esos materiales. Esa es la ayuda. Es práctica, y se detiene en el edificio.',
          },
          {
            type: 'p',
            text: `Hacemos ese trabajo como empresa familiar que está en Houston desde 1993, agendada desde ${office}. Usted puede contratar a la compañía que quiera. Una visita nuestra no lo amarra al trabajo.`,
          },
        ],
      },
      {
        heading: 'Qué no puede hacer un contratista',
        blocks: [
          {
            type: 'p',
            text: 'Un contratista no puede decidir lo que cubre su póliza. Un contratista no puede decirle que la aseguradora le debe una cantidad. Un contratista no puede firmar el reclamo por usted, y no debería pedirle que firme y deje atrás una pregunta que no ha leído. Lo que significa la póliza, y cualquier consejo legal, pertenecen a su aseguradora o a un abogado que usted elija. Si necesita que le expliquen sus derechos bajo un estatuto o una forma, empiece por esas oficinas. Nosotros somos el contratista, y nos quedamos con el edificio.',
          },
          {
            type: 'p',
            text: 'Tampoco podemos prometer que un reclamo va a ser aprobado, o que un deducible se va a condonar. Los deducibles, incluido un deducible de viento o granizo que puede ser distinto de uno ordinario, están en su póliza. Pregúntele a la aseguradora qué deducible aplica a esta pérdida. Cómo se libera un pago, y si se reduce por la edad antes de que el trabajo esté terminado, también están en la póliza. Podemos ponerle precio a la reparación. No podemos convertir ese precio en una decisión de cobertura.',
          },
        ],
      },
      {
        heading: 'Lea lo que regresa',
        blocks: [
          {
            type: 'p',
            text: 'Cuando la aseguradora manda un estimado o una carta, compárelo con sus fotos y con lo que puede ver en la casa. Si falta un cuarto mojado, o no mencionaron una pendiente del techo, pregúntele a la aseguradora por escrito. Si nos contrata, nuestro plan describe el trabajo que estamos cotizando. No sustituye el estimado de ellos, y los dos no siempre van a coincidir. La diferencia es una pregunta para la aseguradora. Su aseguradora es a quien hay que preguntarle por ese hueco.',
          },
          {
            type: 'p',
            text: 'Las reparaciones permanentes que tapan el daño suelen esperar a que el ajustador haya tenido oportunidad de verlo. La protección temporal no. Una casa que se queda abierta o se queda mojada se vuelve más difícil de reparar, y las fotos del primer día son lo que hace entendible ese daño de más.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/insurance-claims', label: 'Ayuda con reclamos de seguro' },
              { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
              { href: '/es/roofing', label: 'Techos' },
              { href: '/es/restoration', label: 'Restauración en Houston' },
              {
                href: '/es/insurance-claims-houston-tx',
                label: 'Ayuda con reclamos de seguro en Houston',
              },
              {
                href: '/es/insurance-claims-bellaire-tx',
                label: 'Ayuda con reclamos de seguro en Bellaire',
              },
              { href: '/insurance-log', label: 'Registro de fotos del seguro' },
              { href: '/es/contact', label: 'Formulario de contacto' },
            ],
          },
        ],
      },
      {
        heading: 'Cuando quiere que vean la casa',
        blocks: [
          {
            type: 'p',
            text: `Llame al ${phone}, o use el formulario de contacto. Díganos qué se dañó y si ya abrió un reclamo. Vemos la casa, fotografiamos las condiciones y hablamos de la reparación. Su aseguradora decide lo que paga la póliza.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'hurricane-season-prep-houston',
    title: 'Lista para preparar una casa de Houston en temporada de huracanes',
    metaTitle: 'Lista de huracanes en Houston',
    crumb: 'Preparación de huracanes',
    lines: ['Antes de la tormenta,', 'y después de ella.'],
    description:
      'Una lista de temporada de huracanes en Houston para el techo, las ventanas y el drenaje, y qué hacer en la casa cuando ya pasó la tormenta.',
    lede: 'La temporada de huracanes en el Golfo va de junio a noviembre. La preparación útil es ordinaria: el techo, las aberturas, la forma en que el agua se va de la casa, y un registro hecho mientras la casa está entera.',
    image: '/images/projects/roofing/brick-home-multi-gable.webp',
    service: 'roofing',
    ctaTitle: '¿Quiere que vean el techo mientras se puede?',
    ctaBody: `Llame al ${phone}, o use el formulario de contacto. Antes de una tormenta, o después de una, díganos lo que puede ver desde el suelo. Salimos de ${office}.`,
    related: ['storm-and-hail-roof-repair-houston', 'what-to-do-after-water-damage-houston'],
    faqs: [
      {
        q: '¿Cuándo empiezo esta lista?',
        a: 'Antes de que haya una tormenta en el Golfo, mientras un techo todavía se puede reparar en un calendario ordinario. Cuando la tormenta ya está cerca, los trabajos realistas son el jardín, las aberturas y las fotos. El trabajo de techo espera a un clima seguro.',
      },
      {
        q: '¿Tengo que poner tablas en cada ventana?',
        a: 'No como regla. Cierre y pase el seguro de lo que tenga. Ponga tablas en las aberturas que decidió proteger, y hágalo antes de que llegue el viento. Esta página no fija un requisito de tablas.',
      },
      {
        q: '¿Puedo subirme al techo a quitar una rama después de la tormenta?',
        a: 'No. Una rama sobre un techo mojado o dañado es trabajo de una cuadrilla, después de que sea seguro estar arriba. Fotografíela desde el suelo y llame.',
      },
      {
        q: '¿Quién paga la lona o el secado?',
        a: 'Su aseguradora decide lo que paga la póliza. Guarde las fotos y los recibos. Nosotros hacemos la protección y las reparaciones que usted contrata. Su aseguradora decide la cobertura.',
      },
    ],
    sections: [
      {
        heading: 'El techo, visto desde el jardín',
        blocks: [
          {
            type: 'p',
            text: 'Antes de que se pronostique la llegada de una tormenta, mire el techo desde el suelo. Quiere ver tejas faltantes o levantadas, loseta quebrada, escombro que ya esté en un valle, y ramas lo bastante cerca para caer sobre la casa. Los collares de hule de los tubos de ventilación, y el metal donde un techo se junta con un muro, merecen una mirada con binoculares. Si ve una orilla levantada, repárela mientras el clima es ordinario. Una abertura chica es mucho más fácil de cerrar en un día claro que con viento.',
          },
          {
            type: 'p',
            text: 'No se suba porque hay una tormenta en el pronóstico. Las caídas también pasan en días secos, y un viaje apurado a una pendiente es un mal cambio. Si no puede ver un problema pero el techo es viejo, o un cielo se ha manchado en lluvias pasadas, pida una inspección mientras el calendario todavía es ordinario. Las casas bajo árboles grandes, que es común en Memorial, Bellaire y The Heights, merecen esa mirada. También los planos largos de techo en casas más grandes hacia el oeste.',
          },
          {
            type: 'p',
            text: 'Reparamos lo que se puede reparar y lo decimos cuando el techo hay que quitarlo. La capa bajo las tejas, las uniones de metal y las ventilas van con un reemplazo. La meta antes de una tormenta es un techo que ya esté cerrado, no una promesa sobre un reclamo futuro. Su aseguradora decide la cobertura si una tormenta posterior daña la casa.',
          },
        ],
      },
      {
        heading: 'Ventanas, puertas y cualquier cosa que el viento pueda levantar',
        blocks: [
          {
            type: 'p',
            text: 'Cierre y pase el seguro de ventanas y puertas, incluido el garaje, antes de que suba el viento. Sepa qué lado de la casa recibe el clima. Si elige poner tablas en las aberturas, hágalo mientras todavía puede trabajar con seguridad, y siga las instrucciones que vinieron con los paneles o el triplay que esté usando. Use las instrucciones de fijación que vinieron con sus tablas. Una tabla puesta después de que empezó la lluvia es la forma en que la gente se lastima.',
          },
          {
            type: 'p',
            text: 'Camine el jardín. Los asadores, las sillas del patio, las macetas y la madera suelta se vuelven escombro. Guárdelos adentro, o asegure lo que está hecho para quedarse. Revise las puertas de la cerca. Una puerta que se mueve sola va a encontrar una ventana. Si se va, dígale a un vecino cómo localizarlo, y llévese el número de póliza y el teléfono de reclamos. Clear Lake y Galveston ven viento y clima de costa que una subdivisión tierra adentro no ve. La lista es la misma. Termínela mientras el clima todavía es ordinario.',
          },
        ],
      },
      {
        heading: 'Déle a la lluvia un lugar a dónde ir',
        blocks: [
          {
            type: 'p',
            text: 'El agua que no puede salir de la casa se mete adentro. Limpie canaletas y bajantes para que descarguen lejos de la cimentación, no en el arriate contra la losa. Camine el lado bajo del jardín. La tierra y el mantillo amontonados contra el ladrillo, y los drenajes tapados de hojas, detienen el agua en el muro. En una lluvia fuerte así es como el agua cruza una losa y aparece en la sala aunque el techo haya aguantado.',
          },
          {
            type: 'p',
            text: 'Si tiene drenajes de jardín o una vaguada, limpie las entradas a las que pueda llegar en su propiedad. No se meta a una calle a destapar un drenaje pluvial cuando ya empezó la lluvia, y no asuma que una boca de la ciudad es suya para abrir. Un bajante que tira el agua en la cimentación es su trabajo. Un drenaje público tapado es una llamada a la ciudad, hecha antes de la tormenta si ya sabe que esa esquina se inunda.',
          },
          {
            type: 'p',
            text: 'Las calles nuevas en Katy, Pearland y The Woodlands muchas veces mueven el agua en vaguadas y bocas de banqueta. Los lotes más viejos dentro del Loop se apoyan en canaletas más cortas y jardines más planos. Cuando la lluvia es fuerte, igual tiene que alejarse de la casa. Si no lo hace en una tormenta ordinaria, arregle el bajante y el suelo al que pueda llegar mientras está seco.',
          },
        ],
      },
      {
        heading: 'Haga un registro mientras la casa está entera',
        blocks: [
          {
            type: 'p',
            text: 'Fotografíe cada lado de la casa, las pendientes del techo que pueda ver, y los cuartos que odiaría describir de memoria. Incluya las etiquetas de los aparatos grandes si puede hacerlo rápido. Guarde las fotos donde pueda alcanzarlas si no está en casa. El registro de fotos del seguro en este sitio puede guardar un juego cuarto por cuarto. Un juego tomado antes del clima es la página más útil, porque después de la tormenta está comparando la casa con algo que todavía puede ver.',
          },
          {
            type: 'p',
            text: 'Ponga su póliza, el teléfono de su aseguradora y nuestro número donde los vaya a encontrar sin luz. Sepa dónde está la llave general del agua, y confirme que gira. Si después usa un generador, déjelo afuera, lejos de ventanas y puertas. No prenda uno en un garaje, ni con la puerta abierta. Esa es una regla de seguridad. No es una sugerencia de qué kit de tormenta comprar.',
          },
          {
            type: 'list',
            items: [
              'Techo, desde el suelo: tejas levantadas, loseta quebrada, escombro, ramas cercanas',
              'Aberturas: ventanas y puertas cerradas y con seguro, tablas solo si lo está haciendo temprano',
              'Jardín: muebles sueltos, asadores y madera guardados',
              'Drenaje: canaletas, bajantes y la tierra contra la losa',
              'Registros: fotos de toda la casa, número de póliza, llave localizada',
            ],
          },
        ],
      },
      {
        heading: 'Después de la tormenta, vaya despacio',
        blocks: [
          {
            type: 'p',
            text: 'Si se fue, espere a que las autoridades locales digan que puede regresar. Cuando esté de vuelta, mire antes de pisar. Aléjese de las líneas caídas y del agua alrededor de ellas. No toque una línea que esté sobre una cerca o un techo. No empiece la limpieza en un cuarto inundado si la electricidad puede seguir encendida. Desde el suelo, busque aberturas en el techo, ventanas rotas y siding que se haya soltado.',
          },
          {
            type: 'p',
            text: 'Si entró agua, el trabajo de adentro es el mismo que cualquier otro daño de agua. Mantenga a la gente fuera del agua insegura, fotografíe y empiece a secar. La humedad de Houston no se pausa porque la tormenta ya se movió. La tablaroca y el aislamiento mojados se van a quedar húmedos hasta que se sequen o se quiten. Una lona va en un techo abierto solo cuando es seguro que una cuadrilla esté arriba. Fotografiamos el daño primero cuando podemos, y después cubrimos la abertura para que la siguiente franja de lluvia se quede afuera. El techo permanente viene después.',
          },
          {
            type: 'p',
            text: 'Llame a su aseguradora para abrir o actualizar el reclamo, y guarde los recibos de la protección temporal. El siding, la tablaroca y la pintura siguen al secado. No son la primera hora. Una póliza de casa y una póliza de inundación son conversaciones distintas. Revise su póliza, o pregúntele a su aseguradora cuál aplica. Podemos secar la casa y reparar lo que usted nos contrate.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/roofing', label: 'Techos' },
              { href: '/es/roofing-emergency-tarp-repair', label: 'Lona de emergencia en el techo' },
              { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
              { href: '/es/siding', label: 'Siding' },
              { href: '/es/restoration', label: 'Restauración en Houston' },
              { href: '/es/roofing-clear-lake-tx', label: 'Techos en Clear Lake' },
              {
                href: '/es/water-damage-restoration-galveston-tx',
                label: 'Restauración por daño de agua en Galveston',
              },
              { href: '/es/contact', label: 'Formulario de contacto' },
            ],
          },
        ],
      },
      {
        heading: 'Llame antes del clima, o después',
        blocks: [
          {
            type: 'p',
            text: `Llame al ${phone}, o use el formulario de contacto. Antes de una tormenta, podemos ver el techo mientras el clima lo permite. Después de una tormenta, díganos si el techo está abierto o si hay agua adentro. Elite Restorations es una empresa familiar, trabaja desde ${office}, y sirve a Houston desde 1993.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'what-to-do-after-a-roof-leak-in-houston',
    title: 'Qué hacer después de una gotera de techo en Houston',
    metaTitle: 'Después de una gotera de techo',
    crumb: 'Después de una gotera',
    lines: ['Una gotera de techo.', 'Haga esto primero.'],
    description:
      'Qué hacer después de una gotera de techo en una casa de Houston: no se suba, limite el agua, fotografíe la abertura y planee la reparación.',
    lede: 'Una mancha en el cielo suele ser la primera señal. En Houston la siguiente lluvia puede ser el mismo día, así que los movimientos útiles son los que dejan más agua afuera y dejan un registro claro de lo que ya entró.',
    image: '/images/projects/roofing/gable-stone-veneer.jpg',
    service: 'roofing',
    emergency: true,
    ctaTitle: '¿Está entrando agua por el cielo?',
    ctaBody: `Llame al ${phone}. Díganos si sigue goteando y si desde el suelo ve luz de día o tejas faltantes. Si no puede llamar, el formulario de emergencia llega al mismo equipo. Salimos de ${office}.`,
    related: [
      'hail-damage-vs-normal-wear-houston-roof',
      'what-to-do-after-water-damage-houston',
      'storm-and-hail-roof-repair-houston',
    ],
    faqs: [
      {
        q: '¿Debo subirme a buscar el hoyo?',
        a: 'No. Una pendiente mojada, madera blanda bajo las tejas, y un techo que usted no camina en un día seco son la forma en que la gente se lastima después de una gotera. Mire desde el suelo y desde adentro de la casa. Nosotros nos subimos cuando es seguro.',
      },
      {
        q: '¿Puedo esperar a que aclare el clima?',
        a: 'Puede esperar para hacer una reparación permanente. No debería esperar para recoger el goteo y para cubrir una abertura que ya conoce, si eso se puede hacer con seguridad desde adentro o por una cuadrilla. La lluvia de Houston no se pausa por una tarde conveniente.',
      },
      {
        q: '¿Una mancha en el cielo significa que hay que cambiar el techo?',
        a: 'No. Una mancha significa que el agua encontró un camino. Puede ser metal en una unión, una teja levantada, o una falla más grande. Alguien tiene que ver el techo antes de que alguien pueda decir qué trabajo es.',
      },
      {
        q: '¿Quién decide si el seguro paga la gotera?',
        a: 'Su aseguradora. Fotografiamos la abertura y los cuartos que se mojaron, y podemos poner lona y reparar. Enviamos nuestro estimado a su aseguradora para que lo apruebe y lo trabajamos con el ajustador. No somos ajustadores públicos. Su aseguradora decide el pago.',
      },
    ],
    sections: [
      {
        heading: 'No se suba al techo',
        blocks: [
          {
            type: 'p',
            text: 'La primera decisión es dónde se para. No se suba a un techo mojado a buscar el origen, y no camine un cielo que está colgando. Una gotera que se ve como un goteo desde el sofá puede ser un charco sentado en el aislamiento arriba de usted. Si la tablaroca está combada, salga de debajo de ese punto.',
          },
          {
            type: 'p',
            text: 'Desde el suelo, busque tejas faltantes, una rama en el techo, un caballete levantado, o luz de día en una penetración si la puede ver desde el jardín sin subirse. Desde adentro, anote qué cuarto, qué muro, y si el agua sigue moviéndose. Con eso basta para empezar. La mirada de cerca le toca a alguien que está preparado para estar en esa pendiente.',
          },
        ],
      },
      {
        heading: 'Recoja lo que todavía está entrando',
        blocks: [
          {
            type: 'p',
            text: 'Si el agua está goteando, ponga una cubeta debajo y mueva lo que pueda salvar fuera de ese camino. Una lámina de plástico sobre un mueble está bien. Hacerle un hoyo al cielo para “que drene” no. Puede convertir un goteo contenido en un colapso, y tira la oportunidad de fotografiar el cielo como está.',
          },
          {
            type: 'p',
            text: 'Si la gotera viene de una ventila de plomería, un extractor de baño o una línea del ático, y no del techo, cierre el agua solo cuando esté seguro de que el origen es un suministro y pueda llegar a la válvula sin pararse en agua cerca de un contacto o del panel. Una gotera de techo no tiene válvula. El clima sí. Mantenga a la gente fuera del cuarto mojado si los contactos, las lámparas o el ventilador de cielo pueden estar mojados.',
          },
          {
            type: 'list',
            items: [
              'Cubeta bajo el goteo, y una toalla en el zoclo si el agua está bajando por el muro.',
              'Muebles y tapetes fuera del piso mojado, después de una foto si puede tomarla primero.',
              'Nadie en el techo, y nadie bajo un cielo que está abultado.',
              'El panel eléctrico principal se deja quieto si el piso frente a él está mojado.',
            ],
          },
        ],
      },
      {
        heading: 'Por dónde suelen dejar entrar agua los techos de Houston',
        blocks: [
          {
            type: 'p',
            text: 'Estas goteras suenan ordinarias hasta que el cielo las enseña. El collar de hule de un tubo de ventilación se cuartea al sol. Los valles guardan escombro y después guardan agua. El metal donde el techo se junta con un muro o una chimenea se zafa. Un parche viejo se levanta. El viento se mete bajo la orilla de una teja del lado de la tormenta. Los techos planos y las adiciones bajas fallan en las uniones y donde se juntan con un techo más empinado.',
          },
          {
            type: 'p',
            text: 'Una casa de un piso sobre losa suele enseñar la gotera en el cuarto que está justo bajo la abertura. Una casa de dos pisos en Memorial, Bellaire o West University puede mandar el agua a lo largo de un cabrio y manchar un cielo que no está bajo la teja dañada. La mancha es una pista, no un mapa. Si puede mirar desde el piso del ático sin salirse de las vigas, la madera mojada de arriba a veces dice la verdad con más claridad que la pintura del cielo.',
          },
          {
            type: 'p',
            text: 'La humedad es la razón de no dejarlo sentado. El aire de Houston no seca un ático mojado como lo haría un clima seco. El aislamiento que se mojó se queda pesado. La pintura del cielo puede verse mejor por la tarde mientras la madera de arriba sigue húmeda. Dejarlo “a ver si vuelve con la siguiente lluvia” es la forma en que una abertura chica se vuelve tablaroca mojada, aislamiento mojado y un segundo camino de gotera.',
          },
        ],
      },
      {
        heading: 'Fotografíe antes de que se cubra nada',
        blocks: [
          {
            type: 'p',
            text: 'Tome las fotos antes de que una lona, un montón de toallas o una mano de primer escondan la evidencia. Desde adentro: una toma abierta del cuarto, una más cercana de la mancha o del goteo, y el camino que siguió el agua, incluido el piso y cualquier pertenencia. Desde el jardín: la pendiente que pueda ver, las piezas faltantes, y una rama si hay una en el techo. Si un ático es seguro de entrar desde una escalera en el piso, una foto de la madera mojada ayuda. No camine el ático si esa madera está blanda.',
          },
          {
            type: 'p',
            text: 'Escriba la fecha, el cuarto, y si el agua seguía entrando cuando tomó la foto. Su aseguradora decide lo que paga una póliza. Las fotos son la parte que usted puede atender el mismo día. Si quiere un paquete cuarto por cuarto en vez de un rollo de cámara, el registro de fotos del seguro en este sitio está ahí cuando quiera un registro cuarto por cuarto.',
          },
          {
            type: 'links',
            items: [
              { href: '/insurance-log', label: 'Abrir el registro de fotos del seguro' },
              {
                href: '/es/blog/how-to-build-an-insurance-photo-log',
                label: 'Cómo armar el registro de fotos',
              },
              { href: '/es/insurance-claims', label: 'Ayuda con reclamos de seguro' },
            ],
          },
        ],
      },
      {
        heading: 'Una lona es temporal',
        blocks: [
          {
            type: 'p',
            text: 'Si el techo está abierto al clima, una lona bien sujeta está ahí para comprar una noche seca. No es un techo terminado. Tiene que anclarse para que el siguiente viento no convierta la cubierta en una vela, y hay que revisarla después de la siguiente tormenta. Fotografiamos la abertura antes de que vaya la cubierta, cuando es seguro estar arriba, para que el registro todavía muestre lo que hizo el clima.',
          },
          {
            type: 'p',
            text: 'No clave usted mismo una lona de ferretería si para hacerlo tendría que pararse en una pendiente mojada. Llame. La lona de emergencia es el paso temporal. El trabajo permanente es una reparación o un reemplazo después de que alguien haya visto la madera, las uniones de metal y hasta dónde viajó el agua.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/emergency', label: 'Pedir ayuda de emergencia' },
              { href: '/es/roofing-emergency-tarp-repair', label: 'Lona de emergencia en el techo' },
            ],
          },
        ],
      },
      {
        heading: 'Reparación, reemplazo y los cuartos de abajo',
        blocks: [
          {
            type: 'p',
            text: 'Una reparación tiene sentido cuando el resto del techo todavía puede hacer su trabajo y el problema está en un lugar: un collar de ventilación, metal en una unión, unas cuantas tejas, o una costura. El reemplazo es la respuesta honesta cuando las tejas están gastadas en todo el techo, la madera de abajo está blanda en más de un lugar, o las mismas pendientes siguen dejando entrar agua. Decimos cuál después de estar en el techo, no desde la calle.',
          },
          {
            type: 'p',
            text: 'El cielo, el aislamiento y el piso son un trabajo aparte del techo. La tablaroca mojada y el aislamiento que se quedó mojado hay que secarlos o quitarlos. La pintura sobre una mancha húmeda regresa. Si el agua llegó a gabinetes, madera o un piso a nivel de losa, eso es trabajo de daño de agua, y hay que medirlo antes de que alguien reconstruya el acabado. El secado va antes de la tablaroca nueva.',
          },
          {
            type: 'p',
            text: 'El precio de un reemplazo es el techo que usted tiene: tamaño, pendiente, cómo se ven las tablas cuando se quita el techo viejo, y el material. Un reclamo de seguro no fija ese precio. Su aseguradora decide lo que paga la póliza. Instalamos el techo que usted nos contrata a construir. Lo que cambia el precio de un techo en Houston está escrito en la guía de costos, como rangos para planear, no como un precio de su casa.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/roofing', label: 'Techos' },
              { href: '/es/roof-replacement', label: 'Reemplazo de techo' },
              {
                href: '/roof-replacement-cost-houston',
                label: 'Qué cambia el costo de un reemplazo de techo',
              },
              { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
              { href: '/es/contact', label: 'Formulario de contacto' },
            ],
          },
        ],
      },
      {
        heading: 'Cuando quiere una cuadrilla',
        blocks: [
          {
            type: 'p',
            text: `Llame al ${phone}, o use el formulario de contacto. Diga si el agua sigue entrando. Elite Restorations es una empresa familiar, trabaja desde ${office}, y restaura y remodela casas de Houston desde 1993. Ponemos lona cuando el techo está abierto, reparamos o cambiamos el techo, y secamos lo que la gotera mojó abajo. La cobertura la decide su aseguradora.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'slab-moisture-after-a-supply-line-break-houston',
    title: 'Humedad en la losa después de que se rompe una línea de suministro',
    metaTitle: 'Humedad en la losa tras un tubo',
    crumb: 'Humedad en la losa',
    lines: ['Agua bajo', 'un piso de losa.'],
    description:
      'Qué hacer cuando se rompe una línea de suministro en una casa de losa en Houston: pare el agua, vea hasta dónde llegó y seque antes de reconstruir.',
    lede: 'Una línea de suministro que se suelta en una losa no se queda en un charco. El agua corre bajo el piso, sube por el muro y se queda en una casa donde el aire de afuera ya es húmedo.',
    image: '/images/services/water-damage-restoration.jpg',
    service: 'water-damage-restoration',
    emergency: true,
    ctaTitle: '¿Se soltó una línea de suministro?',
    ctaBody: `Llame al ${phone} si hay agua en el piso o no encuentra la llave. Diga si sigue entrando. El formulario de emergencia llega al mismo equipo si no puede llamar. Salimos de ${office}.`,
    related: [
      'what-to-do-after-water-damage-houston',
      'frozen-and-burst-pipes-in-houston',
      'how-to-build-an-insurance-photo-log',
    ],
    faqs: [
      {
        q: 'El piso se ve seco. ¿Puedo esperar?',
        a: 'Una superficie dura puede verse seca mientras el material de abajo, y el papel de la tablaroca justo arriba del piso, siguen mojados. Si una línea de suministro soltó agua sobre la losa, hay que medirla antes de decidir que no viajó nada.',
      },
      {
        q: '¿Abro las ventanas y prendo un ventilador de caja?',
        a: 'El aire de afuera en Houston muchas veces está demasiado mojado para ayudar. Un ventilador de casa mueve el aire del cuarto. No saca la humedad de una losa, de la cavidad de un muro, ni del acolchonado bajo un piso. Mantenga la casa cerrada y use deshumidificación si el agua entró al edificio.',
      },
      {
        q: '¿Tiro el piso mojado antes de que llegue el ajustador?',
        a: 'Fotografíelo en su lugar primero, abierto y de cerca. Si es un peligro y tiene que moverlo, guarde esas fotos y una nota de lo que salió del cuarto. Pregúntele a su aseguradora qué quieren que conserve.',
      },
      {
        q: '¿Una línea de suministro rota significa que hay que cambiar la losa?',
        a: 'Una línea de suministro rota es una falla de plomería y un mojado de los acabados. No es, por sí sola, una afirmación sobre el concreto. Lo que hay que quitar depende de qué materiales se mojaron y de si se pueden secar.',
      },
    ],
    sections: [
      {
        heading: 'Pare el agua antes de estudiar el piso',
        blocks: [
          {
            type: 'p',
            text: 'Si una línea de suministro, una manguera o una válvula está soltando agua, la llave general es el movimiento que importa. Suele estar en el medidor o donde la línea entra a la casa. Gírela en el sentido de las manecillas del reloj. Una válvula bajo un fregadero sirve solo cuando está seguro de que la rotura está en ese mueble. Si no puede llegar a la llave sin caminar por agua estancada cerca de contactos o del panel eléctrico, no lo haga. Llame.',
          },
          {
            type: 'p',
            text: 'Con la llave general cerrada, abra una llave para que las líneas puedan drenar, empezando abajo en la casa. Si el calentador puede haberse vaciado, apáguelo para que no esté calentando un tanque seco. No adivine en una válvula de gas. Quédese fuera del agua si no puede ver el piso y no sabe si hay electricidad de por medio.',
          },
        ],
      },
      {
        heading: 'Por qué una losa esconde el recorrido',
        blocks: [
          {
            type: 'p',
            text: 'Muchas casas de Houston están sobre una losa de concreto. No hay sótano que mirar ni un espacio de acceso que le enseñe una viga mojada. El agua de una manguera de lavadora, una línea de fábrica de hielo, el suministro de un inodoro, un calentador, o un poro en una línea dentro de un muro sale del cuarto a nivel del piso. Corre bajo el vinil, bajo el laminado, bajo la loseta y bajo la madera. La superficie que usted pisa puede verse casi normal mientras los bordes se curvan, las uniones se hinchan, o el zoclo se oscurece un día después.',
          },
          {
            type: 'p',
            text: 'El muro es el otro registro. La tablaroca absorbe el agua hacia arriba. La pintura a unos centímetros del piso se ampolla o se mancha. Los gabinetes de aglomerado se hinchan primero abajo. La moldura se hincha en las esquinas. Esas son señales de que el agua no se quedó en el charco que trapeó. También son fáciles de pintar y de volver a descubrir.',
          },
          {
            type: 'p',
            text: 'En un plano de un piso en Katy, Spring Branch o Alief, ese camino es plano y puede cruzar un pasillo antes de que alguien note el cuarto de allá. En una casa de dos pisos la misma rotura de suministro suele estar en el piso donde falló la línea, no es un misterio de arriba, a menos que la línea estuviera en un muro que también mojó el cielo de abajo. Lea la mancha. No asuma que el cuarto del goteo más ruidoso es el único cuarto.',
          },
        ],
      },
      {
        heading: 'Qué mover, y qué dejar el tiempo suficiente para fotografiar',
        blocks: [
          {
            type: 'p',
            text: 'Saque a las personas y a las mascotas del agua estancada. Mueva las pertenencias chicas que se van a arruinar si se quedan, después de una foto si puede tomarla sin retrasar el cierre del agua. Deje el piso, el zoclo y la tablaroca mojada en su lugar hasta que estén fotografiados, a menos que sean un problema de seguridad. Un rollo de fotos del cuarto mojado, de la línea que falló si la puede ver, y del camino a través del piso es el inicio del registro.',
          },
          {
            type: 'list',
            items: [
              'Toma abierta de cada cuarto mojado, incluidos los cuartos que solo se ven un poco afectados.',
              'Toma cercana del suministro, la manguera o la válvula que falló, si se ve.',
              'La parte baja de los muros y el interior del gabinete del fregadero o del clóset del calentador.',
              'Una nota de la hora en que cerró el agua, y si siguió llegando agua después de eso.',
            ],
          },
          {
            type: 'p',
            text: 'Su aseguradora decide la cobertura. Muchas pólizas esperan que usted limite más daño y que guarde un registro. La suya puede decirlo distinto. Pregúntele a la aseguradora qué quieren que conserve antes de tirar materiales mojados. Si necesita un paquete cuarto por cuarto, el registro de fotos de este sitio recorre ese orden.',
          },
        ],
      },
      {
        heading: 'Secar no es un ventilador en el pasillo',
        blocks: [
          {
            type: 'p',
            text: 'Las toallas y un ventilador de casa pueden con una taza de agua en un piso duro intacto que atrapó en el momento y que nunca llegó al muro ni a las capas bajo el piso. No son un plan de secado cuando el agua ya se fue bajo un piso, dentro de una caja de gabinete, o por la cara de la tablaroca. Deje las ventanas cerradas. El aire de afuera aquí muchas veces está más mojado que el aire de un cuarto cerrado.',
          },
          {
            type: 'p',
            text: 'Los primeros pasos sacan el agua estancada, mueven el aire y jalan la humedad del aire, con medidores en los materiales que de verdad se mojaron. Una losa no le enseña vigas abiertas. Las lecturas están en el recubrimiento del piso, en la capa de abajo donde la hay, y en el muro. No vamos a nombrar un plazo de moho. El papel mojado, el acolchonado mojado y el aglomerado mojado no mejoran mientras la casa se queda cerrada y húmeda. Un olor a humedad en un cuarto que “se ve seco” es razón para encontrar el material, no para cubrirlo.',
          },
          {
            type: 'p',
            text: 'El cloro en un zoclo no seca la cavidad del muro. El primer sobre una mancha esconde la pista. Un piso nuevo sobre una losa mojada repite la pérdida. La reconstrucción de tablaroca, moldura, gabinetes y piso empieza cuando la estructura está seca, no cuando la superficie se ve aceptable con la luz de la tarde.',
          },
        ],
      },
      {
        heading: 'Los acabados que por lo general hay que abrir',
        blocks: [
          {
            type: 'p',
            text: 'Los gabinetes de abajo, la tablaroca en la parte baja del muro y el recubrimiento del piso son los tres lugares donde se ve una fuga de losa. La madera se curva. El laminado se hincha en las uniones hasta que los bordes se levantan. El vinil puede esconder el agua y después soltarse. La loseta puede verse bien mientras la mezcla de abajo, o el muro detrás del zoclo, está mojada. El aislamiento, si el agua llegó a un muro que lo tiene, guarda agua después de que la cara de la tablaroca se siente seca en la mano.',
          },
          {
            type: 'p',
            text: 'Cuánto sale es una medición, no una adivinanza a partir del tamaño del charco original. Una línea que corrió un rato corto sobre concreto sellado y se paró de inmediato es un trabajo distinto de una línea que corrió toda la noche bajo un piso flotante y subió por los muros de dos cuartos. Preferimos abrir un área chica y confirmar que está seca antes que cerrar un muro mojado y volverlo a pintar.',
          },
        ],
      },
      {
        heading: 'El reclamo y la reconstrucción van separados',
        blocks: [
          {
            type: 'p',
            text: 'Llame a la compañía que emitió la póliza cuando razonablemente pueda. Pregunte cómo quieren el aviso, y si un ajustador debe ver el daño antes de las reparaciones permanentes. Anote el número de reclamo. El plazo del aviso está en su póliza. No es igual en cada forma de Texas, así que pregúntele a la aseguradora cuál es la fecha.',
          },
          {
            type: 'p',
            text: 'No somos ajustadores públicos. Fotografiamos, secamos y reconstruimos acabados. El reclamo y el pago se quedan con su aseguradora. Si la pérdida también abrió un techo, o no está seguro de que el agua haya sido solo la línea de suministro, dígalo. Una gotera de techo y una rotura de suministro son caminos distintos, y los dos pueden mojar la misma losa.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
              { href: '/es/insurance-claims', label: 'Ayuda con reclamos de seguro' },
              { href: '/es/emergency', label: 'Ayuda de emergencia' },
              { href: '/insurance-log', label: 'Registro de fotos del seguro' },
              {
                href: '/es/blog/how-to-build-an-insurance-photo-log',
                label: 'Cómo armar el registro de fotos',
              },
              { href: '/es/painting-drywall-repair', label: 'Pintura y reparación de drywall' },
              { href: '/es/contact', label: 'Formulario de contacto' },
            ],
          },
        ],
      },
      {
        heading: 'Llame mientras el piso todavía se puede salvar',
        blocks: [
          {
            type: 'p',
            text: `Llame al ${phone} si el agua sigue afuera o no está seguro de hasta dónde llegó. Elite Restorations es una empresa familiar, trabaja desde ${office}, y trabaja en casas de Houston desde 1993. Encontramos los materiales mojados, secamos lo que se puede secar, y reconstruimos la tablaroca, la moldura y los pisos cuando las lecturas lo sostienen.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'hail-damage-vs-normal-wear-houston-roof',
    title: 'Daño de granizo y desgaste normal en un techo de Houston',
    metaTitle: 'Granizo o desgaste en Houston',
    crumb: 'Granizo o desgaste',
    lines: ['Marcas de granizo,', 'o solo la edad.'],
    description:
      'En qué se distinguen el granizo y el desgaste ordinario en un techo de Houston, qué se ve desde el suelo, y cuándo la pregunta real es reparar o cambiar.',
    lede: 'Una tormenta fuerte y un techo que simplemente está viejo pueden dejar los dos una mancha en el cielo con la siguiente lluvia. No son la misma condición, y usted no debería tener que subirse para empezar a distinguirlos.',
    image: '/images/projects/roofing/two-story-stone-home.jpg',
    service: 'roofing',
    ctaTitle: '¿No está seguro de qué hizo la tormenta?',
    ctaBody: `Llame al ${phone}, o use el formulario de contacto. Si está entrando agua, dígalo al empezar. Vemos el techo. Su aseguradora decide lo que paga la póliza. Salimos de ${office}.`,
    related: [
      'what-to-do-after-a-roof-leak-in-houston',
      'storm-and-hail-roof-repair-houston',
      'how-to-build-an-insurance-photo-log',
    ],
    faqs: [
      {
        q: '¿Puedo ver el granizo desde el jardín?',
        a: 'A veces. Canaletas abolladas, tapas de chimenea abolladas y aletas lastimadas de un aire acondicionado se ven sin escalera. Las tejas mismas, por lo general, no, no lo bastante bien para juzgar. Quédese en el suelo.',
      },
      {
        q: '¿El granizo siempre significa que se quita todo el techo?',
        a: 'No. El granizo puede marcar el metal y dejar un techo que se puede reparar, y un techo gastado puede tener que quitarse aunque la última tormenta haya hecho poco. Hay que inspeccionar la pendiente.',
      },
      {
        q: '¿El gránulo en las canaletas es granizo?',
        a: 'El gránulo en una canaleta es una pista de que la superficie está perdiendo su capa. El sol, la edad y el granizo pueden hacer eso. El gránulo solo no nombra la causa. Lo que se compara es el patrón en las tejas y en el metal blando de al lado.',
      },
      {
        q: '¿Le van a decir a la aseguradora que el techo está perdido?',
        a: 'No. Fotografiamos lo que encontramos y decimos si recomendamos una reparación o un reemplazo para el techo que tenemos enfrente. Su aseguradora decide la cobertura. No somos ajustadores públicos.',
      },
    ],
    sections: [
      {
        heading: 'Qué deja una tormenta que la edad no deja',
        blocks: [
          {
            type: 'p',
            text: 'El granizo pega donde pega, a lo largo de una pendiente, en un solo evento de clima. Las marcas tienden a aparecer juntas: en las tejas, y en el metal más blando que da al cielo. Canaletas, bajantes, tapas de ventilación, tubos de chimenea, y las aletas o la tapa de un condensador exterior agarran abolladuras que no estaban antes de esa tormenta. Un techo que solo ha estado envejeciendo no suele abollar una canaleta nueva en una sola tarde.',
          },
          {
            type: 'p',
            text: 'En las tejas de asfalto, la gente describe el granizo como magulladuras: manchas oscuras donde se tumbaron los gránulos, a veces con la capa oscura a la vista, a menudo regadas por el techo abierto y no solo a lo largo de la orilla que da al sol de la tarde. La magulladura puede ser más fácil de sentir que de ver desde la calle. Por eso la inspección se hace en el techo, no desde una fotografía tomada en la banqueta al mediodía.',
          },
          {
            type: 'p',
            text: 'El viento es lo que de verdad abre la casa. El granizo puede magullar un techo que no gotea hasta que el viento levanta una pestaña, rompe un sello o empuja la lluvia contra un detalle que solo estaba magullado. Una mancha en el cielo después de una granizada puede ser el viento y la lluvia, con el granizo como la razón de que usted esté mirando. Las dos cosas van en las fotos.',
          },
        ],
      },
      {
        heading: 'Cómo se ve el desgaste ordinario aquí',
        blocks: [
          {
            type: 'p',
            text: 'El sol y el calor de Houston envejecen un techo haya o no una tormenta. El gránulo se adelgaza en las pendientes que más sol toman, a menudo el sur y el oeste. Las pestañas se enroscan o se cuartean a lo largo de hileras que llevan temporadas abriéndose. Las tiras de sellador se sueltan. Los collares de hule se secan y se parten. El silicón en las uniones de metal se encoge. El musgo o el escombro se sienta en un valle que no se enjuaga. Nada de eso necesita una piedra de granizo.',
          },
          {
            type: 'p',
            text: 'El desgaste suele ser más parejo, y sigue la exposición y el tiempo. La pendiente norte, a la sombra, puede verse más joven que la pendiente sur de la misma casa. Un área parchada puede verse más nueva que el techo abierto a su alrededor. Ampollas, esquinas enroscadas y un adelgazamiento general del gránulo sin un patrón que coincida de abolladuras en el metal son razones para hablar de edad, no de una tormenta.',
          },
          {
            type: 'p',
            text: 'Un techo viejo igual puede recibir granizo. Las dos condiciones se apilan. Una pendiente gastada con magulladuras frescas es una conversación distinta de una pendiente gastada sin marcas nuevas, y de un techo joven con un reguero de magulladuras y un collar partido. La inspección está para separar eso, no para meter cada techo en una sola categoría.',
          },
          {
            type: 'p',
            text: 'El vecindario no cambia la diferencia. Un techo de Memorial, un techo de Katy y un techo en The Woodlands envejecen bajo el mismo sol y reciben el mismo tipo de tormenta. Lo que cambia es la casa: la pendiente, el número de valles, y si puede ver el metal desde el jardín. La comparación sigue siendo marcas de un evento contra un desgaste que lleva años.',
          },
        ],
      },
      {
        heading: 'Quédese en el suelo',
        blocks: [
          {
            type: 'p',
            text: 'Tejas mojadas, una pendiente empinada y una escalera en un arriate blando son la forma en que la gente se lastima tratando de confirmar qué hizo una tormenta. No necesita estar arriba para empezar. Desde el jardín y desde una ventana, anote abolladuras en canaletas y tapas, piezas faltantes, una rama, y cualquier mancha de cielo adentro. Díganos lo que puede ver. Vemos el techo cuando es seguro estar en él.',
          },
          {
            type: 'p',
            text: 'Si el agua ya está adentro, trate eso como la emergencia y la pregunta del granizo como la razón. Recoja el goteo, mantenga a la gente fuera de debajo de un cielo que cuelga, y no cubra la abertura hasta que esté fotografiada. Una lona es protección temporal. No es el diagnóstico.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/emergency', label: 'Está entrando agua: ayuda de emergencia' },
              { href: '/es/hail-damage-roof-repair', label: 'Reparación de techos por granizo' },
              {
                href: '/es/blog/what-to-do-after-a-roof-leak-in-houston',
                label: 'Qué hacer después de una gotera de techo',
              },
            ],
          },
        ],
      },
      {
        heading: 'Fotografías que separan las dos cosas',
        blocks: [
          {
            type: 'p',
            text: 'Un juego útil muestra la pendiente, el metal blando y los cuartos si entró agua. Tomas abiertas de cada dirección del techo, tomas cercanas de magulladuras o de pestañas enroscadas, y las canaletas y ventilas en la misma visita. Una foto de gránulo en la canaleta sin una foto de las tejas no se explica sola. Adentro, fotografíe las manchas antes de que alguien las pinte.',
          },
          {
            type: 'p',
            text: 'Féchelas. Si sabe de qué tormenta está preguntando, escríbalo. Su aseguradora decide si esa tormenta es una causa cubierta y qué van a pagar. Podemos juntar las fotos de la inspección con el plan de reparación para que la conversación tenga algo concreto. El registro de fotos de este sitio es una forma de guardar los cuartos interiores en el mismo paquete que las notas del techo.',
          },
          {
            type: 'links',
            items: [
              {
                href: '/es/blog/how-to-build-an-insurance-photo-log',
                label: 'Cómo armar un registro de fotos del seguro',
              },
              { href: '/es/insurance-claims', label: 'Ayuda con reclamos de seguro' },
              { href: '/insurance-log', label: 'Abrir el registro de fotos' },
            ],
          },
        ],
      },
      {
        heading: 'Reparar o cambiar es una pregunta del techo',
        blocks: [
          {
            type: 'p',
            text: 'Las marcas de granizo no eligen el trabajo por sí solas. Un puñado de tejas dañadas en un techo que por lo demás está sano puede ser una reparación. Magulladuras en el techo abierto, madera blanda bajo las tejas, o un desgaste que ya gastó las tejas pueden ser un reemplazo. Las hileras levantadas por el viento y las uniones de metal que fallaron son parte de esa misma mirada. Decimos qué trabajo recomendamos después de estar en el techo.',
          },
          {
            type: 'p',
            text: 'El asfalto arquitectónico es común en las casas de Houston. El metal, la loseta y el compuesto son instalaciones distintas y formas distintas de enseñar una abolladura o una grieta. La estructura tiene que cargar el material que usted quiere si el techo se va a quitar. La guía de costos explica qué cambia el precio de un reemplazo: tamaño, pendiente, la madera y el material. Esos son rangos para planear. El número de su casa sale de la inspección, no de un precio de toda la ciudad.',
          },
          {
            type: 'p',
            text: 'Un pago del seguro, si lo hay, no es la oferta. Un reclamo puede pagar menos que el trabajo que el techo necesita, o un trabajo que usted decide no hacer todavía. Fotografiamos y construimos el techo que usted contrata. El reclamo se queda con su aseguradora.',
          },
          {
            type: 'links',
            items: [
              { href: '/es/roofing', label: 'Techos' },
              { href: '/es/roof-replacement', label: 'Reemplazo de techo' },
              {
                href: '/roof-replacement-cost-houston',
                label: 'Costo de reemplazo de techo en Houston',
              },
              { href: '/es/roofing-emergency-tarp-repair', label: 'Lona de emergencia' },
              { href: '/es/contact', label: 'Formulario de contacto' },
            ],
          },
        ],
      },
      {
        heading: 'Después de la siguiente lluvia es un mal momento para adivinar',
        blocks: [
          {
            type: 'p',
            text: `Si el cielo ya está mojado, llame al ${phone} y dígalo. Si el techo solo se ve sospechoso desde el jardín, llame y lo vemos mientras el clima lo permite. Elite Restorations es una empresa familiar, trabaja desde ${office}, y sirve a Houston desde 1993. Reparamos techos, los cambiamos, y secamos los cuartos que una tormenta ya mojó.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'how-to-build-an-insurance-photo-log',
    title: 'Cómo armar un registro de fotos para el seguro',
    metaTitle: 'Armar un registro de fotos',
    crumb: 'Registro de fotos del seguro',
    lines: ['Un registro de fotos', 'que un ajustador pueda usar.'],
    description:
      'Cómo armar un registro de fotos cuarto por cuarto después de una tormenta o un daño de agua en Houston: qué tomar, qué anotar y cómo dejarlo en un paquete.',
    lede: 'Un reclamo va mejor cuando las fotos son un registro de la casa, no un montón de acercamientos sin nombre de cuarto. Puede armar ese registro el día de la pérdida, antes de que se tire nada.',
    image: '/images/projects/roofing/brick-home-shingles.jpg',
    service: 'insurance-claims',
    ctaTitle: '¿Quiere dejar el daño por escrito con usted?',
    ctaBody: `Llame al ${phone} si el agua sigue entrando o el techo está abierto. Fotografiamos las condiciones como parte del trabajo. El registro de este sitio es suyo de cualquier modo. Su aseguradora decide la cobertura. Salimos de ${office}.`,
    related: [
      'water-damage-insurance-claims-in-texas',
      'what-to-do-after-a-roof-leak-in-houston',
      'slab-moisture-after-a-supply-line-break-houston',
    ],
    faqs: [
      {
        q: '¿Necesito una cámara especial?',
        a: 'No. Un teléfono alcanza si las fotos están nítidas, marcadas por cuarto, y tomadas antes de la limpieza. Las tomas abiertas y las cercanas del mismo punto sirven más que una docena de acercamientos casi iguales.',
      },
      {
        q: '¿Y si ya moví la alfombra mojada?',
        a: 'Fotografíe lo que queda, y anote qué movió y por qué. Si todavía tiene la alfombra, una foto de ella junto al cuarto ayuda. Pregúntele a su aseguradora qué quieren que conserve.',
      },
      {
        q: '¿El registro decide lo que se paga?',
        a: 'No. El registro es suyo. Su aseguradora decide lo que cubre la póliza. Elite Restorations es el contratista.',
      },
      {
        q: '¿Dónde está el registro de fotos en este sitio?',
        a: 'El registro de fotos del seguro es una página que puede llenar en el teléfono: una lista de la primera noche, después cuartos con una toma abierta, una cercana y los materiales mojados, más los datos de la pérdida, y un PDF que puede descargar.',
      },
    ],
    sections: [
      {
        heading: 'Ponga la casa a salvo, y después abra la cámara',
        blocks: [
          {
            type: 'p',
            text: 'El registro no son los primeros diez minutos. Si un tubo está chorreando, cierre el agua cuando pueda hacerlo sin caminar por agua cerca de la electricidad. Si el techo está abierto, no se suba. Si un cielo está colgando, no se pare debajo para encuadrar una mejor foto. Cuando la gente ya está fuera del camino y el agua está parada o recogida, las fotos son el siguiente trabajo, antes de las toallas, las bolsas de basura y un pariente bien intencionado que “nada más lo limpia”.',
          },
          {
            type: 'p',
            text: 'La lista de la primera noche es corta. Para una fuga activa: cierre la llave general si es seguro, quédese fuera del agua estancada cerca de contactos o del panel, y fotografíe cada cuarto mojado antes de mover o tirar algo. Para un techo abierto: no se suba al techo, saque las pertenencias de debajo de la abertura, recoja el goteo desde adentro si puede alcanzarlo, y deje el aislamiento mojado y el material del cielo en su lugar hasta que esté fotografiado. Esa lista también está en la página del registro de fotos, para que no esté tratando de recordarla desde este artículo a medianoche.',
          },
        ],
      },
      {
        heading: 'Un cuarto a la vez',
        blocks: [
          {
            type: 'p',
            text: 'Nombre el cuarto antes de llenarlo de fotos. “Baño del pasillo”, “cocina”, “recámara noreste”, “garaje”. Un nombre de archivo o una nota que diga IMG_4388 no le ayuda a un ajustador, ni a usted, dos semanas después. Recorra el cuarto de una pasada: párese en la puerta para la toma abierta, después acérquese al daño, y después muestre los materiales que de verdad están mojados.',
          },
          {
            type: 'p',
            text: 'Incluya los cuartos que solo se ven un poco afectados. El agua en una losa viaja. Una gotera de techo puede manchar un cielo que no está bajo las tejas faltantes. Si se salta el cuarto “casi bien”, el registro implica que la pérdida se detuvo en la puerta. Si un cuarto está de verdad seco, no necesita forzarlo en el registro. Si no está seguro, una toma abierta y una nota alcanzan.',
          },
          {
            type: 'list',
            items: [
              'Toma abierta: todo el cuarto desde la puerta, para que el daño tenga un lugar.',
              'Toma cercana: la mancha, el techo abierto desde adentro, el suministro partido, la unión hinchada.',
              'Materiales mojados: alfombra, acolchonado, tablaroca, aislamiento, gabinetes, piso, pertenencias que están mojadas, no solo la esquina dramática.',
            ],
          },
        ],
      },
      {
        heading: 'Qué escribir junto a las fotos',
        blocks: [
          {
            type: 'p',
            text: 'Las fotos sin palabras igual dejan discusiones. Junto a cada cuarto, escriba qué se mojó y qué tuvo que mover. En la portada del paquete, los datos que siguen apareciendo en un archivo de reclamo son simples: su nombre, la dirección de la propiedad, la aseguradora, el número de reclamo cuando lo tenga, y la fecha de la pérdida. Si todavía no tiene número de reclamo, déjelo en blanco y agréguelo cuando la aseguradora se lo dé.',
          },
          {
            type: 'p',
            text: 'Para el agua, escriba cuándo empezó si lo sabe, cuándo paró, y si seguía entrando cuando armó el registro. Escriba qué movió y por qué. Una línea corta es mejor que un párrafo que no va a terminar. “Moví el tapete a las 9 p.m. porque estaba en agua estancada. La foto se tomó primero.” Eso es un registro. “Limpiamos” no lo es.',
          },
          {
            type: 'p',
            text: 'Los materiales que vale la pena nombrar son los que cambian el trabajo: tablaroca, cielo, aislamiento, piso, gabinetes, moldura, muebles, pertenencias, techo. No necesita un precio junto a cada uno. Necesita mostrar que estaban mojados, rotos o faltantes. Los precios y la cobertura son la hoja de la aseguradora, no algo que usted invente la noche de la pérdida.',
          },
        ],
      },
      {
        heading: 'El techo, el viento y el agua son un solo registro',
        blocks: [
          {
            type: 'p',
            text: 'Una pérdida de tormenta muchas veces son dos escenas. Afuera: la pendiente que puede ver desde el jardín, tejas faltantes, una rama, canaletas o tapas abolladas si el granizo fue parte del clima, y la abertura si puede fotografiarla sin subirse. Adentro: el cielo, el aislamiento si se cayó, el piso al que llegó el agua. Ponga las dos en el mismo paquete. Una foto de techo sin interior, o una foto de cubeta sin techo, cada una cuenta la mitad de lo que pasó.',
          },
          {
            type: 'p',
            text: 'No se suba al techo para mejorar la foto. Si las únicas fotos seguras son desde el suelo y desde el piso del ático, tome esas y dígalo en la nota. Una cuadrilla puede agregar las fotos de arriba después. Sus fotos igual importan porque muestran la casa antes de una lona, antes de que se moviera el escombro, y antes de que se pintara el cielo.',
          },
          {
            type: 'p',
            text: 'Si cubre una abertura, fotografíela primero. Si tiene que tirar algo porque es un peligro, fotografíelo y escriba por qué no podía quedarse. Detenga las reparaciones permanentes que esconderían el daño hasta que un ajustador lo haya visto, a menos que dejarlo abierto empeore la pérdida o la aseguradora le haya dicho que siga.',
          },
        ],
      },
      {
        heading: 'Convierta las fotos del teléfono en un solo paquete',
        blocks: [
          {
            type: 'p',
            text: 'Un rollo de cámara es un inicio. Un paquete son las mismas fotos con nombres de cuarto, notas y los datos de la pérdida en un archivo que le puede entregar a alguien. El registro de fotos del seguro en este sitio está hecho para eso. Elija una fuga activa o un techo abierto para la lista de la primera noche. Después cada cuarto tiene tres lugares: una toma abierta, un acercamiento del daño y los materiales mojados. Puede agregar cuartos. La portada guarda su nombre, la dirección, la aseguradora, el número de reclamo y la fecha. Las notas de la pérdida guardan cuándo empezó y paró el agua, si sigue entrando, qué movió, y qué materiales se afectaron. Puede descargar un PDF.',
          },
          {
            type: 'p',
            text: 'El registro guarda las fotos en un solo lugar. No estima lo que le deben. Si hay seguro de por medio, Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Es una forma de que el registro no viva en veinte mensajes de texto. Si después nos pide secar o reparar la casa, el mismo tipo de fotos es parte de cómo documentamos el trabajo. Puede usar el registro, lo contrate o no.',
          },
          {
            type: 'links',
            items: [
              { href: '/insurance-log', label: 'Abrir el registro de fotos del seguro' },
              { href: '/es/insurance-claims', label: 'Ayuda con reclamos de seguro' },
              {
                href: '/es/blog/water-damage-insurance-claims-in-texas',
                label: 'Lista de un reclamo por daño de agua',
              },
            ],
          },
        ],
      },
      {
        heading: 'Lo que el registro no es',
        blocks: [
          {
            type: 'p',
            text: 'El registro es suyo, y su aseguradora sigue decidiendo si se paga algo. Lea su póliza, o pregúntele a la aseguradora cómo quieren el aviso. Siga parando más agua mientras lo escribe. Esto no es consejo legal. Enviamos nuestro estimado a su aseguradora para que lo apruebe y lo trabajamos con el ajustador. No somos ajustadores públicos. Podemos fotografiar, poner lona, secar y reconstruir. El reclamo se queda con su aseguradora.',
          },
          {
            type: 'p',
            text: 'Guarde recibos de lonas, del secado y de costos razonables de emergencia, y fotografíe el trabajo temporal. Muchas pólizas hablan de limitar más daño. El texto está en su forma. Pregunte si no está seguro. No tire la única evidencia porque el cuarto se siente caótico. El registro es la forma en que el caos tiene una secuencia.',
          },
        ],
      },
      {
        heading: 'Si quiere una cuadrilla en los cuartos con usted',
        blocks: [
          {
            type: 'p',
            text: `Llame al ${phone} cuando el agua siga entrando, el techo esté abierto, o quiera que el secado y las reparaciones los haga la misma compañía que está viendo las fotos. El formulario de emergencia está ahí si no puede llamar. Elite Restorations es una empresa familiar, trabaja desde ${office}, y está aquí desde 1993. Traiga el registro. Igual vamos a ver la casa nosotros.`,
          },
          {
            type: 'links',
            items: [
              { href: '/es/emergency', label: 'Ayuda de emergencia' },
              { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
              { href: '/es/roofing', label: 'Techos' },
              { href: '/es/roof-replacement', label: 'Reemplazo de techo' },
              {
                href: '/es/blog/what-to-do-after-a-roof-leak-in-houston',
                label: 'Después de una gotera de techo',
              },
              {
                href: '/es/blog/slab-moisture-after-a-supply-line-break-houston',
                label: 'Humedad en la losa después de una rotura de suministro',
              },
              { href: '/es/contact', label: 'Formulario de contacto' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'houston-freeze-prep-for-pipes',
    title: 'Preparación para el frío: proteger los tubos de Houston',
    metaTitle: 'Preparar tubos antes del frío',
    crumb: 'Preparación para el frío',
    lines: ['Antes de una helada en Houston.', 'Y si se suelta un tubo.'],
    description:
      'Cómo preparar los tubos de Houston antes de una helada, y qué hacer si una línea se congela o se revienta en un ático, un muro o una llave de manguera.',
    lede: 'Houston no se congela seguido, pero cuando lo hace, muchas casas no están listas. La mayoría de nuestros tubos corren por áticos, muros exteriores y orillas de losa, así que una sola noche cerca de los 20 °F puede partir una línea. Un poco de preparación rinde mucho.',
    image: '/images/services/water-damage-restoration.jpg',
    service: 'water-damage-restoration',
    ctaTitle: '¿Necesita ayuda después de una helada?',
    ctaBody: `¿Necesita ayuda? Elite Restorations es una empresa familiar en Houston y atiende a dueños de casa desde 1993. Llame al ${phone} para pedir un estimado, o escríbanos. Trabajamos desde ${office}.`,
    related: ['frozen-and-burst-pipes-in-houston', 'how-to-prevent-water-damage-in-your-home'],
    sections: [
      {
        heading: 'Antes de una helada en Houston',
        blocks: [
          {
            type: 'list',
            items: [
              'Aísle los tubos expuestos. Las mangas de hule espuma de cualquier ferretería le quedan a los tubos del ático, del garaje y de los muros exteriores, y a las llaves de manguera de afuera. Las toallas se mojan y dejan de aislar, así que son un mal arreglo de largo plazo.',
              'Cubra las llaves de afuera. Desconecte y drene las mangueras del jardín, y después ponga una cubierta aislante en cada llave de manguera.',
              'Cierre y drene el sistema de riego, incluido el preventor de reflujo, que suele ser lo primero que se parte.',
              'Abra las puertas de los gabinetes bajo los fregaderos de cocina y baño en muros exteriores, para que el aire tibio llegue a los tubos.',
              'Deje gotear las llaves. Un goteo lento de caliente y fría en las llaves más lejos de donde entra el agua a la casa mantiene el agua en movimiento y alivia la presión.',
              'Sepa dónde está su llave general. Suele estar en una caja cerca de la calle o donde la línea entra a la casa. Confirme que gira, y tenga a la mano una llave del medidor de agua.',
              'Deje la calefacción en 55°F o más, aunque esté de viaje.',
            ],
          },
        ],
      },
      {
        heading: 'Si un tubo de Houston se congela',
        blocks: [
          {
            type: 'p',
            text: 'Si una llave solo gotea o no sale nada, la línea probablemente está congelada. Deje la llave abierta y caliente el tubo con cuidado, con una secadora de pelo o un calefactor, lejos de cualquier cosa que pueda quemarse. Nunca use flama abierta.',
          },
        ],
      },
      {
        heading: 'Si un tubo de Houston se revienta',
        blocks: [
          {
            type: 'list',
            items: [
              'Cierre la válvula principal del agua de inmediato. Después apague el calentador.',
              'Corte la electricidad de cualquier zona donde el agua esté cerca de contactos o muebles, si puede hacerlo con seguridad.',
              'Tome fotos y video del daño antes de limpiar. Su aseguradora las va a querer.',
              'Quite el agua estancada y las cosas mojadas, y ponga el aire a circular con ventiladores.',
              'Llame a un plomero por el tubo roto, y dígale a su aseguradora qué pasó.',
            ],
          },
          {
            type: 'p',
            text: 'La tablaroca, el aislamiento y el piso que se quedan mojados de 24 a 48 horas pueden empezar a criar moho. Si el agua empapó muros, cielos o alfombra, una cuadrilla de daño de agua puede medir la humedad detrás de la superficie y secarla bien, y eso ayuda a que un tubo reventado no se vuelva un problema de moho. La página de tubos congelados y reventados es la lectura más cercana para esa primera hora. Si hay seguro de por medio, Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No somos ajustadores públicos.',
          },
          {
            type: 'p',
            text: `¿Necesita ayuda? Elite Restorations es una empresa familiar en Houston y atiende a dueños de casa desde 1993. Llame al ${phone} para pedir un estimado, o escríbanos. Trabajamos desde ${office}.`,
          },
          {
            type: 'links',
            items: [
              { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
              {
                href: '/es/blog/frozen-and-burst-pipes-in-houston',
                label: 'Qué hacer primero si un tubo se congela o se revienta',
              },
              {
                href: '/es/burst-frozen-pipe-water-damage-houston',
                label: 'Daño de agua por tubo reventado en Houston',
              },
              { href: '/es/contact', label: 'Escríbanos' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'ground-check-after-a-houston-storm',
    title: 'Después de la tormenta: una revisión de techo y exterior desde el suelo',
    metaTitle: 'Revisión de tormenta desde el suelo',
    crumb: 'Revisión desde el suelo',
    lines: ['Después de la tormenta.', 'Quédese en el suelo.'],
    description:
      'Una lista desde el suelo en Houston después de granizo, viento o lluvia fuerte: tejas, canaletas, siding, árboles, cercas y qué fotografiar.',
    lede: 'La primavera en Houston trae granizo, vientos altos y lluvia fuerte. Después de una tormenta grande, vale la pena caminar 15 minutos alrededor de la casa. El daño que encuentra temprano suele ser más barato de arreglar. No se suba al techo. Las tejas mojadas resbalan, y casi todo lo que necesita ver se ve desde el suelo.',
    image: '/images/projects/roofing/brick-home-multi-gable.webp',
    service: 'roofing',
    ctaTitle: '¿Ve algo desde el jardín?',
    ctaBody: `¿Necesita ayuda? Elite Restorations es una empresa familiar en Houston y atiende a dueños de casa desde 1993. Llame al ${phone} para pedir un estimado, o escríbanos. Trabajamos desde ${office}.`,
    related: ['storm-and-hail-roof-repair-houston', 'hurricane-season-prep-houston'],
    sections: [
      {
        heading: 'Un recorrido de Houston desde el suelo',
        blocks: [
          {
            type: 'list',
            items: [
              'Tejas: use binoculares o el zoom del teléfono. Busque tejas faltantes, levantadas o marcadas, y manchas oscuras donde se lavó el gránulo.',
              'Canaletas y bajantes: busque abolladuras, tramos colgando y canaletas que se separan de la casa. Un montón de gránulo de teja al pie de un bajante puede significar daño de granizo.',
              'Metales blandos: revise ventilas del techo, aires acondicionados, buzones y la parte de arriba de la cerca por abolladuras chicas. Son una forma fácil de ver si el granizo fue lo bastante grande para marcar el techo.',
              'Siding, moldura y ventanas: busque siding quebrado, pintura saltada, mosquiteros rotos y sellos de ventana rotos.',
              'Árboles y escombro: busque ramas rotas colgando sobre el techo y ramas recargadas en él o en las líneas de electricidad. Aléjese de las líneas caídas y llame a CenterPoint al 713-207-2222.',
              'Cercas y construcciones aparte: revise postes inclinados y tablas faltantes.',
            ],
          },
        ],
      },
      {
        heading: 'Después mire adentro de la casa',
        blocks: [
          {
            type: 'p',
            text: 'Busque manchas nuevas o pintura con ampollas en los cielos, sobre todo cerca de los muros exteriores. Si puede entrar al ático con seguridad y con una linterna, busque aislamiento húmedo, goteos o luz de día que se cuele.',
          },
        ],
      },
      {
        heading: 'Documente la tormenta de Houston',
        blocks: [
          {
            type: 'p',
            text: 'Tome fotos y video con fecha de todo lo que encuentre, desde varios ángulos. Anote la fecha de la tormenta. Cubra una gotera activa con una lona solo si puede hacerlo con seguridad desde el suelo o una escalera corta, y guarde los recibos. Pregúntele a su aseguradora cómo quieren el aviso de la pérdida, y qué plazo usa su póliza. Las pólizas no son todas iguales. Su aseguradora decide si se paga la protección temporal. Si hay seguro de por medio, Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No somos ajustadores públicos.',
          },
        ],
      },
      {
        heading: 'Cuándo llamar a un techador de Houston',
        blocks: [
          {
            type: 'p',
            text: 'Llame a un techador si ve tejas faltantes, goteras interiores, ventilas abolladas o pérdida de gránulo extendida, o si los vecinos están cambiando techos. Una inspección por escrito debe venir con fotos que usted pueda guardar. La guía más larga de reparación por tormenta y granizo es la siguiente página si la pregunta es el techo mismo. Este recorrido es solo lo que puede ver sin subirse.',
          },
        ],
      },
      {
        heading: 'Los que llegan detrás de una tormenta en Houston',
        blocks: [
          {
            type: 'p',
            text: `Tenga cuidado con quien toca su puerta justo después de una tormenta, pide un anticipo grande por adelantado, u ofrece cubrir su deducible, lo cual es ilegal en Texas. Contrate una compañía local a la que pueda volver a llamar, y pida referencias. Trabajamos desde ${office}.`,
          },
          {
            type: 'p',
            text: `¿Necesita ayuda? Elite Restorations es una empresa familiar en Houston y atiende a dueños de casa desde 1993. Llame al ${phone} para pedir un estimado, o escríbanos. Trabajamos desde ${office}.`,
          },
          {
            type: 'links',
            items: [
              { href: '/es/roofing', label: 'Techos' },
              { href: '/es/houston-storm-damage', label: 'Ayuda por daño de tormenta en Houston' },
              {
                href: '/es/blog/storm-and-hail-roof-repair-houston',
                label: 'Reparación de techo por tormenta y granizo',
              },
              { href: '/es/contact', label: 'Escríbanos' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'plan-kitchen-bath-remodel-2027',
    title: 'Planear una remodelación de cocina o baño en Houston para 2027',
    metaTitle: 'Planear una remodelación para 2027',
    crumb: 'Planear una remodelación de 2027',
    lines: ['Planee la remodelación', 'antes de que se llene el calendario.'],
    description:
      'Cómo planear una remodelación de cocina o baño en Houston para 2027: presupuesto, calendario, permisos, reglas de la asociación y cómo comparar ofertas.',
    lede: 'El invierno es un buen momento para planear una remodelación de Houston para la primavera o el verano. Los calendarios de los contratistas se llenan rápido cuando el clima se calienta, y las decisiones de ahora afectan el costo y el estrés. Así se empieza.',
    image: '/images/services/kitchen-remodeling.jpg',
    service: 'kitchen-remodeling',
    ctaTitle: '¿Está planeando una cocina o un baño?',
    ctaBody: `¿Necesita ayuda? Elite Restorations es una empresa familiar en Houston y atiende a dueños de casa desde 1993. Llame al ${phone} para pedir un estimado, o escríbanos. Trabajamos desde ${office}.`,
    related: ['houston-kitchen-remodel-ideas', 'houston-bathroom-remodel-guide'],
    sections: [
      {
        heading: 'Fije un presupuesto de remodelación en Houston, y después sume del 10 al 15 por ciento',
        blocks: [
          {
            type: 'p',
            text: 'Antes de pedir ofertas, decida un total con el que se sienta cómodo. Después aparte del 10 al 15 por ciento para sorpresas como daño de agua escondido, cableado viejo, o plomería que hay que mover. Los gabinetes suelen llevarse la mayor parte de un presupuesto de cocina, mientras que la loseta y la mano de obra suelen empujar el costo de un baño. Mover plomería, líneas de gas o muros sube el costo rápido, así que dejar el plano igual es la forma más fácil de ahorrar. Esas partes son típicas, y cambian según el trabajo. No son un precio.',
          },
        ],
      },
      {
        heading: 'Sepa sus prioridades',
        blocks: [
          {
            type: 'p',
            text: 'Haga una lista de lo que sí necesita y de lo que estaría bien tener. ¿Necesita más almacenaje, mejor luz, una regadera sin tina, o un plano más fácil de recorrer con los años? Una lista clara hace más fácil comparar ofertas y evita que el proyecto crezca.',
          },
        ],
      },
      {
        heading: 'Planee el calendario de una remodelación de Houston en 2027',
        blocks: [
          {
            type: 'list',
            items: [
              'Diseño y selecciones: a menudo de 2 a 6 semanas.',
              'Permisos y aprobación de la asociación: a menudo de 2 a 6 semanas.',
              'Tiempos de materiales: los gabinetes a la medida y la loseta de pedido especial pueden tardar de 6 a 12 semanas.',
              'Construcción: unas 3 a 6 semanas para un baño típico y de 6 a 12 semanas para una cocina típica.',
            ],
          },
          {
            type: 'p',
            text: 'Estos son rangos típicos para planear, y cambian según el trabajo. Ordene los materiales antes de que empiece la demolición para que el trabajo no se detenga a la mitad. La guía de ideas de cocina y la guía del baño van más hondo en los cuartos mismos. Esta página es el calendario y el presupuesto delante de ese trabajo.',
          },
        ],
      },
      {
        heading: 'Permisos de Houston y aprobación de la asociación',
        blocks: [
          {
            type: 'p',
            text: 'En Houston y en la mayoría de las ciudades cercanas, el trabajo que cambia plomería, electricidad, gas o estructura por lo general necesita un permiso. Un contratista con licencia debe sacar los permisos, así que tenga cuidado si alguien le dice que se los salte. También revise las reglas de arquitectura de su asociación. Los cambios exteriores, los contenedores de escombro y los contenedores de guardado portátiles a menudo necesitan aprobación por adelantado. La revisión de la asociación y el permiso de la ciudad no son la misma ventanilla.',
          },
        ],
      },
      {
        heading: 'Compare con cuidado las ofertas de remodelación en Houston',
        blocks: [
          {
            type: 'p',
            text: 'Pida al menos dos o tres ofertas por escrito que cubran el mismo alcance. Pídale a cada contratista comprobante de seguro, referencias y fotos recientes de su trabajo, y pregunte cómo manejan las órdenes de cambio. Un buen contrato incluye un calendario de pagos amarrado al trabajo terminado, no pagos grandes por adelantado.',
          },
        ],
      },
      {
        heading: 'Prepárese para vivir una remodelación de cocina o baño',
        blocks: [
          {
            type: 'p',
            text: 'Arme una cocina temporal con un microondas, una cafetera y un refrigerador, o planee alrededor de un segundo baño. Pregunte cómo va a controlar el polvo la cuadrilla y cómo va a proteger sus pisos.',
          },
          {
            type: 'p',
            text: `¿Necesita ayuda? Elite Restorations es una empresa familiar en Houston y atiende a dueños de casa desde 1993. Llame al ${phone} para pedir un estimado, o escríbanos. Trabajamos desde ${office}.`,
          },
          {
            type: 'links',
            items: [
              { href: '/es/kitchen-remodeling', label: 'Remodelación de cocinas' },
              { href: '/es/bathroom-remodeling', label: 'Remodelación de baños' },
              {
                href: '/es/kitchen-remodel-cost-houston',
                label: 'Qué cambia el costo de una remodelación de cocina',
              },
              {
                href: '/es/bathroom-remodel-cost-houston',
                label: 'Qué cambia el costo de una remodelación de baño',
              },
              { href: '/es/contact', label: 'Escríbanos' },
            ],
          },
        ],
      },
    ],
  },
];

function withPath(article: Article): EsLegacyArticle {
  return { ...article, path: `/es/blog/${article.slug}` };
}

export const esLegacyArticles: EsLegacyArticle[] = legacyArticles.map(withPath);

const bySlug = new Map(esLegacyArticles.map((article) => [article.slug, article]));

export function getEsLegacyArticle(slug: string) {
  return bySlug.get(slug);
}

const expectedSlugs = [
  'remodeling-vs-restoring-whats-right-for-your-home',
  'how-to-prevent-water-damage-in-your-home',
  'what-to-do-after-a-fire-your-first-5-steps',
  'bathroom-upgrades-that-boost-your-homes-resale-value',
  'signs-its-time-to-replace-your-homes-flooring',
  'kitchen-remodel-benefits',
  'frozen-and-burst-pipes-in-houston',
  'water-damage-insurance-claims-in-texas',
  'what-to-do-after-water-damage-houston',
  'storm-and-hail-roof-repair-houston',
  'how-insurance-claims-work-texas-restoration',
  'hurricane-season-prep-houston',
  'what-to-do-after-a-roof-leak-in-houston',
  'slab-moisture-after-a-supply-line-break-houston',
  'hail-damage-vs-normal-wear-houston-roof',
  'how-to-build-an-insurance-photo-log',
  'houston-freeze-prep-for-pipes',
  'ground-check-after-a-houston-storm',
  'plan-kitchen-bath-remodel-2027',
] as const;

const legacySlugSet = new Set<string>(expectedSlugs);
const houstonSlugSet = new Set<string>(houstonPostSlugs);
const serviceSlugSet = new Set<string>(spanishServiceSlugs);
const englishOnlyHrefs = new Set([
  '/emergency-board-up',
  '/insurance-log',
  '/roof-replacement-cost-houston',
]);
const spanishStaticHrefs = new Set([
  '/es/contact',
  '/es/emergency',
  '/es/restoration',
  '/es/houston-storm-damage',
  '/es/kitchen-remodel-cost-houston',
  '/es/bathroom-remodel-cost-houston',
  '/es/roof-replacement-cost-houston',
  '/es/burst-frozen-pipe-water-damage-houston',
]);

function hrefOk(href: string) {
  if (englishOnlyHrefs.has(href) || spanishStaticHrefs.has(href)) return true;
  if (href.startsWith('/es/blog/')) {
    const slug = href.slice('/es/blog/'.length);
    return legacySlugSet.has(slug) || houstonSlugSet.has(slug);
  }
  if (href.startsWith('/es/')) {
    const slug = href.slice(4);
    if (serviceSlugSet.has(slug)) return true;
    return Boolean(parseLocalLandingSlug(slug));
  }
  return false;
}

function articleBlob(article: EsLegacyArticle) {
  return [
    article.title,
    article.metaTitle,
    article.crumb,
    ...article.lines,
    article.description,
    article.lede,
    article.ctaTitle,
    article.ctaBody,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.blocks.flatMap((block) => {
        if (block.type === 'p') return [block.text];
        if (block.type === 'list') return [...block.items];
        return block.items.flatMap((item) => [item.href, item.label]);
      }),
    ]),
    ...(article.faqs ?? []).flatMap((faq) => [faq.q, faq.a]),
  ].join('\n');
}

const errors: string[] = [];

if (esLegacyArticles.length !== expectedSlugs.length) {
  errors.push(`expected ${expectedSlugs.length} articles, got ${esLegacyArticles.length}`);
}

for (const slug of expectedSlugs) {
  if (!bySlug.has(slug)) errors.push(`Missing Spanish legacy article ${slug}`);
}

if (new Set(esLegacyArticles.map((article) => article.slug)).size !== esLegacyArticles.length) {
  errors.push('Duplicate legacy article slug');
}

for (const article of esLegacyArticles) {
  if (article.path !== `/es/blog/${article.slug}`) errors.push(`${article.slug} path is ${article.path}`);
  if (!titleFits(article.metaTitle)) errors.push(`Meta title does not fit: ${article.metaTitle}`);
  if (article.description.length > 155) {
    errors.push(`${article.slug} description is ${article.description.length} characters`);
  }
  if (!article.ctaBody.includes(phone)) errors.push(`${article.slug} CTA missing phone`);
  const blob = articleBlob(article);
  if (!blob.includes(office)) errors.push(`${article.slug} missing office phrase`);
  if (blob.includes('281-748-0227')) errors.push(`${article.slug} uses the wrong phone`);
  if (/estimado gratis/i.test(blob)) errors.push(`${article.slug} says estimado gratis`);
  if (/\bInc\b/.test(blob)) errors.push(`${article.slug} says Inc`);
  const hrefs = article.sections.flatMap((section) =>
    section.blocks.flatMap((block) => (block.type === 'links' ? block.items.map((item) => item.href) : [])),
  );
  for (const href of hrefs) {
    if (!hrefOk(href)) errors.push(`${article.slug} links an unknown path: ${href}`);
  }
  try {
    assertCopyAllowed(article.path, blob);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
}

if (errors.length > 0) {
  throw new Error(errors.join('\n'));
}
