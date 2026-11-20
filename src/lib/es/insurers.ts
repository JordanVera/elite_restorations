import { assertCopyAllowed } from "@/lib/copy-guards";
import { titleFits } from "@/lib/seo";
import { wordCount } from "@/lib/words";

export type EsInsurerPage = {
  slug: string;
  name: string;
  path: string;
  englishPath: string;
  metaTitle: string;
  description: string;
  lede: string;
  sections: readonly { eyebrow: string; heading: string; paragraphs: readonly string[] }[];
  faqs: readonly { q: string; a: string }[];
};

const phone = "(713) 909-0034";
const office = "nuestra oficina en el oeste de Houston (77082)";

function insurer(
  slug: string,
  name: string,
  metaTitle: string,
  description: string,
  lede: string,
  sections: EsInsurerPage["sections"],
  faqs: EsInsurerPage["faqs"],
): EsInsurerPage {
  return {
    slug,
    name,
    path: `/es/insurance-claims/companies/${slug}`,
    englishPath: `/insurance-claims/companies/${slug}`,
    metaTitle,
    description,
    lede,
    sections,
    faqs,
  };
}

export const esInsurers: readonly EsInsurerPage[] = [
  insurer(
    "state-farm",
    "State Farm",
    "Reclamo de State Farm en Houston",
    "Dueños en Houston con State Farm: cómo avanza un reclamo de agua, tormenta o techo, y cómo documentamos el edificio. Llame al (713) 909-0034.",
    "Si su casa, su propiedad de renta o su edificio comercial en Houston está asegurado por State Farm, usted sigue eligiendo quién seca y quién repara. Esta página describe cómo suele quedar ese trabajo al lado de un reclamo. No es una página de State Farm, y no cambia lo que dice su póliza.",
    [
      {
        eyebrow: "Sin afiliación",
        heading: "Trabajamos para la persona que nos llama.",
        paragraphs: [
          "Elite Restorations es un contratista independiente y no estamos afiliados a State Farm. No somos un contratista de State Farm. Trabajamos para quien nos contrata, no para State Farm, y su logotipo no es nuestro para usarlo. Ayudamos a dueños de casa, administradores y dueños de edificios en Houston que están asegurados por State Farm a documentar daño de agua, de tormenta o de techo. State Farm decide la cobertura, el deducible y el pago según la póliza. Revise esa póliza. No somos ajustadores públicos. Solo State Farm puede decir si un reclamo se aprueba o se paga.",
          "Mucha gente en el área de Houston tiene una póliza de casa de State Farm por medio de un agente local. Su agente, su deducible, y si esta pérdida es viento, agua o desgaste de todos los días, están en la página de declaraciones y en la conversación que usted tenga con State Farm. Las visitas salen de nuestra oficina en el oeste de Houston (77082). Somos una empresa familiar y servimos a Houston desde 1993. Llame al (713) 909-0034 si está entrando agua o si el techo quedó abierto.",
        ],
      },
      {
        eyebrow: "El camino",
        heading: "Cómo suele avanzar un reclamo de casa en Texas.",
        paragraphs: [
          "Un camino típico, que no es una regla sacada de una sola póliza, empieza con el aviso. Quienes están asegurados por State Farm a menudo llaman al agente que escribió la póliza, o al número de la tarjeta que está en el cajón. Pregunte cómo quieren el aviso, qué quieren que usted conserve y si quieren que alguien vea el daño antes de las reparaciones permanentes. Anote el número de reclamo, la fecha y el nombre de la persona con quien habló. No inventamos un plazo. El lenguaje del aviso está en la póliza, y esa es la fuente.",
          "Después el edificio necesita protección. En Houston eso puede ser una lona después del granizo o de un huracán, tablas en una ventana rota, o secado después de un tubo reventado, un calentador, un lavavajillas o un inodoro que se desbordó hacia el pasillo. La temporada de huracanes va del 1 de junio al 30 de noviembre. El granizo y el viento en línea recta aparecen en la primavera, de Katy a The Woodlands. Una helada fuerte parte las líneas del ático en las losas de Westchase, Alief y Sugar Land. Esos pasos limitan más daño. No son una promesa de que State Farm le va a devolver el dinero.",
          "Un ajustador puede inspeccionar. Podemos estar presentes. Mostramos las fotos de la abertura, las lecturas de humedad y la reparación que estamos poniendo en el precio. State Farm decide qué está cubierto, qué es mantenimiento y qué le hace el deducible al número. El deducible y el pago los calculan ellos. El estimado de la reparación es el precio de la construcción. El pago del reclamo es lo que State Farm permita.",
        ],
      },
      {
        eyebrow: "Documentación",
        heading: "Fotos, un registro y un estimado con los cuartos nombrados.",
        paragraphs: [
          "Antes de tirar la alfombra, o de dejar que una lona tape un hoyo, tome fotos amplias y fotos de cerca. Anote si el agua vino del techo, de un tubo, de un aparato o de la calle. El agua que sube en los vecindarios cerca de los bayous suele ser una póliza de inundación, no la póliza de casa. Si el agua vino del bayou, lo escribimos como inundación. Una rotura repentina de plomería es otra causa, y no la mezclamos con la primera para que el archivo se vea más simple.",
          "Agregamos nuestras propias fotos de lo que secamos y de lo que reconstruimos. Usted puede entregar ese conjunto a State Farm. El registro de fotos de este sitio es suyo aunque no nos contrate. La guía de cómo suelen moverse los reclamos de restauración en Texas es la explicación más larga. Ninguno de esos papeles es una opinión sobre cobertura. Las fotos ayudan a contar lo que pasó. No crean una cobertura que la póliza no tenga.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Casas sobre losa, techos con granizo y edificios de muchas unidades.",
        paragraphs: [
          "La mayoría de las casas que secamos están sobre concreto. Un asegurado de State Farm en Memorial, con una fuga de ático, y otro en Katy, con una línea de suministro bajo la losa, necesitan el mapa de la humedad. No se adivina desde la mancha del plafón. Los administradores de apartamentos y los dueños de comercios asegurados por State Farm usan el mismo teléfono. Listamos las unidades mojadas. Un solo plafón manchado no es razón para secar todo el complejo, ni para abrir puertas que siguen secas.",
          "Llame o envíe un texto al (713) 909-0034 a cualquier hora si hay una emergencia activa. El horario de oficina para una visita programada es de lunes a sábado, de 8:00 AM a 6:00 PM. State Farm es la aseguradora. Nosotros somos la empresa de restauración. El trabajo se programa desde nuestra oficina en el oeste de Houston (77082). El nombre que aparece en la póliza no cambia el orden: fotos, protección cuando es segura, secado y después la reparación que usted contrata.",
        ],
      },
      {
        eyebrow: "En el lugar",
        heading: "Lo que sí hacemos junto a un reclamo de State Farm.",
        paragraphs: [
          "Fotografiamos el techo o los cuartos mojados, ponemos lona en una abertura cuando el techo se puede pisar, cerramos con madera una ventana rota, sacamos el agua estancada y secamos con ventiladores y deshumidificadores hasta que las lecturas de humedad sostengan las reparaciones. Después escribimos el estimado de la reconstrucción: tablaroca, pisos, techo, o el interior que una fuga destruyó. Las casas, los apartamentos y los edificios comerciales siguen el mismo orden, con un acceso distinto. Un asegurado de State Farm no recibe un método de secado distinto al de cualquier otra persona. El nombre de la póliza no cambia la losa.",
          "Podemos reunirnos con el ajustador y caminar el trabajo. State Farm decide qué partidas paga. Dejamos un tema de mantenimiento en las notas, en lugar de esconderlo para hacer más grande el estimado. Si la pérdida es una fuga lenta y no una rotura repentina, o agua de inundación y no de viento, las notas lo dicen. Revise la póliza para ver cómo State Farm trata esas palabras. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Llame al (713) 909-0034 cuando el edificio todavía está recibiendo agua.",
        ],
      },
    ],
    [
      {
        q: "¿Debo llamar a mi agente de State Farm antes de llamarlos a ustedes?",
        a: "Llámenos si está entrando agua o el techo está abierto. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No somos ajustadores públicos. State Farm decide lo que la póliza paga. El aviso a State Farm sigue siendo una llamada suya.",
      },
      {
        q: "¿Pueden decirme mi deducible de State Farm?",
        a: "No. El viento, el granizo y otras pérdidas a menudo se tratan de manera distinta. El porcentaje y la cantidad en dólares están en la página de declaraciones, o se los puede preguntar a State Farm. No adivinamos ese número desde la banqueta.",
      },
      {
        q: "¿Solo ayudan con reclamos de techo?",
        a: "No. Hacemos techo y lona, cierre con madera, y agua de tubos, calentadores, lavavajillas e inodoros que se desbordan. La causa queda en las notas tal como la vemos, aunque otra frase suene más fácil de explicar.",
      },
      {
        q: "¿Qué pasa si State Farm quiere ver el daño primero?",
        a: "Pregúnteles a ellos. Si el edificio está recibiendo agua, fotografiamos y después lo protegemos cuando es seguro. Dejar un techo abierto para una visita posterior deja entrar la siguiente tormenta. Los acabados permanentes sí pueden esperar.",
      },
      {
        q: "¿Trabajan con clientes de State Farm?",
        a: "Sí. Elite Restorations es un contratista independiente y no estamos afiliados a State Farm. Usted nos contrata. State Farm decide el reclamo. No somos un contratista de State Farm.",
      },
      {
        q: "¿Prometen que el reclamo se va a pagar?",
        a: "Fotografiamos el daño, limitamos más daño, escribimos un estimado de la reparación y nos reunimos con el ajustador si usted quiere que estemos. State Farm decide la cobertura y el pago. Revise su póliza. El estimado es el precio de la construcción.",
      },
      {
        q: "¿Una inundación es lo mismo que un reclamo de la póliza de casa?",
        a: "A menudo no lo es. El agua que sube de una calle, de un bayou o de un embalse suele ser una póliza distinta del viento, del granizo o de una rotura repentina de plomería. Separamos esas causas. Pregúntele a su aseguradora qué póliza aplica a esta pérdida.",
      },
      {
        q: "¿Pueden ayudar después de un huracán, granizo, viento o tornado?",
        a: "Sí. Documentamos el daño, ponemos lona o tablas cuando es seguro, secamos lo que se mojó y estimamos la reparación. Ayudamos con el edificio. No damos consejo legal. State Farm decide la cobertura.",
      },
      {
        q: "¿Qué conviene fotografiar?",
        a: "Tome fotos amplias de cada cuarto, fotos de cerca de la fuente, y de las pertenencias antes de tirarlas. El registro de fotos de este sitio es una manera, cuarto por cuarto, de hacerlo. Las fotos no crean cobertura.",
      },
      {
        q: "¿Se reúnen con el ajustador de State Farm?",
        a: "Sí, si usted quiere que estemos ahí con usted. Caminamos lo que vimos en el edificio: la abertura, las lecturas y el trabajo que estamos cotizando en la construcción. Su aseguradora pone la cifra.",
      },
      {
        q: "¿También trabajan en apartamentos y en edificios comerciales?",
        a: "Sí. Trabajamos en casas, apartamentos y edificios comerciales en el área de Houston. Llame al (713) 909-0034 a cualquier hora si hay una emergencia activa de tormenta o de agua. Traiga los números de unidad si el edificio tiene varias.",
      },
    ],
  ),
  insurer(
    "allstate",
    "Allstate",
    "Reclamo de Allstate en Houston",
    "Dueños en Houston con Allstate: documentación, secado y reparación junto a un reclamo de agua o tormenta. Llame al (713) 909-0034.",
    "Allstate asegura muchas casas de Houston. Eso no nos convierte en un contratista de Allstate. Si usted contrata a Elite Restorations, documentamos el edificio y reparamos lo que usted aprueba. Allstate decide el reclamo. Esta página es sobre el edificio, no sobre la aplicación ni sobre el agente.",
    [
      {
        eyebrow: "Sin afiliación",
        heading: "Su póliza, su aseguradora, y usted elige al contratista.",
        paragraphs: [
          "Elite Restorations es un contratista independiente y no estamos afiliados a Allstate. No somos un contratista de Allstate. Trabajamos para quien nos contrata, no para Allstate, y su logotipo no es nuestro. Ayudamos a dueños de casa, administradores y dueños de edificios en Houston asegurados por Allstate a documentar daño de agua, de tormenta o de techo. Allstate decide la cobertura, el deducible y el pago según la póliza. Revise esa póliza. No somos ajustadores públicos. Solo Allstate puede decir si un reclamo se aprueba o se paga.",
          "La gente llega a Allstate por caminos distintos: un agente, una aplicación, o un teléfono impreso en la póliza. Pregúntele a Allstate qué puerta quiere que use, y escriba la respuesta junto al número de reclamo. Nuestro trabajo empieza cuando el edificio está mojado o abierto, haya ocurrido ya esa llamada o no. Haga las dos llamadas. Un plafón se puede llenar mientras el papeleo espera. Las visitas salen de nuestra oficina en el oeste de Houston (77082).",
        ],
      },
      {
        eyebrow: "El camino",
        heading: "Una versión cuidadosa de cómo suelen ir estos reclamos.",
        paragraphs: [
          "Aviso, después protección, después una inspección, y después una reparación que puede coincidir o no con el pago. Ese orden es común en los reclamos de casa en Texas. No es una regla de Allstate que estemos citando. Sus formularios controlan los plazos y la prueba que quieren. La póliza manda aquí, no una página de nuestro sitio. Si Allstate le pide conservar una pieza, siga esa instrucción y no la nuestra inventada.",
          "En el edificio, las pérdidas de Houston que vemos junto a reclamos de Allstate son las de siempre: granizo en techos de teja asfáltica, viento en los tapajuntas, lluvia de huracán después de una cumbrera levantada, un tubo reventado tras una helada, un calentador en el garaje, un lavavajillas bajo una cocina de losa, un inodoro que se desbordó al pasillo. Cada una recibe fotos y una causa escrita en palabras llanas. La causa se queda llana, aunque otra frase suene más probable de que la paguen.",
          "Si un ajustador de Allstate visita, podemos caminar el techo o los cuartos mojados con esa persona cuando usted nos lo pide. Explicamos la lona, el secado y el estimado. Nos detenemos en la construcción. La depreciación es lo que algunas pólizas retienen hasta que el trabajo termina. No calculamos eso, ni el valor en efectivo, ni el costo de reposición. Esas palabras las maneja Allstate.",
        ],
      },
      {
        eyebrow: "Documentación",
        heading: "Qué conservar antes de que la casa quede limpia.",
        paragraphs: [
          "Guarde la línea de suministro rota si puede hacerlo con seguridad. Fotografíe la abertura del techo antes de la lona. Liste cuartos, no solo la frase de que la casa se mojó. Un archivo de reclamo que empieza después de que el contenedor ya se cargó es más difícil de explicar. El registro de fotos está en este sitio. Nuestras fotos de humedad y de reparaciones pueden ir en el mismo paquete, con el número de reclamo en su copia.",
          "Las reparaciones temporales que limitan más daño a menudo se esperan. Si Allstate paga nuestra factura es una pregunta aparte. Le cobramos el trabajo que usted contrata. No esperamos una promesa de reembolso para cubrir un techo abierto cuando viene más lluvia y el techo se puede caminar. El estimado de ese trabajo es el precio de la construcción. El pago, si llega, lo decide Allstate.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "De la oficina en 77082 a la costa y a los suburbios.",
        paragraphs: [
          "Programamos desde nuestra oficina en el oeste de Houston (77082). Las llamadas de granizo y de viento llegan de Katy, Cypress y The Woodlands. Las llamadas de viento de la costa llegan de Clear Lake y de Galveston. Las fugas de losa y las fallas de aparatos aparecen en Westchase, Alief, Bellaire y Memorial igual que en cualquier otro lado. Las pólizas de apartamento y de comercio de Allstate, cuando eso es lo que carga el dueño, reciben los mismos hábitos de documentación y una lista de unidades.",
          "Somos una empresa familiar y servimos a Houston desde 1993. Llame o envíe un texto al (713) 909-0034. Las emergencias activas de tormenta y de agua se atienden a cualquier hora. El horario de oficina es de lunes a sábado, de 8:00 AM a 6:00 PM. No somos Allstate. Una página con su nombre en nuestro sitio es una guía para quien nos contrata, no un letrero de ellos.",
        ],
      },
      {
        eyebrow: "En el lugar",
        heading: "El trabajo, separado del pago de Allstate.",
        paragraphs: [
          "Una lona, el cierre con madera, sacar el agua y secar limitan más daño. El techo, la tablaroca y los pisos son la reparación. Los escribimos como trabajos separados, con los cuartos nombrados. Un pago de Allstate, si llega, es otro documento. Mantenemos nuestra factura aparte. Usted nos contrata. Allstate decide lo que debe según la póliza que usted tiene. El estimado es el precio de la construcción.",
          "Las losas de Houston guardan agua en el concreto después de que un lavavajillas, un inodoro o una línea de suministro ya se ven limpios. Eso lo medimos. Los techos con granizo se miran en cada pendiente, no desde la entrada de autos. Si usted está comparando nuestro estimado con una cifra de Allstate, explicamos la construcción. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Allstate decide lo que la póliza paga. Llame o envíe un texto al (713) 909-0034 por una fuga activa o un techo abierto. El nombre de la póliza no cambia cómo se seca una losa. Las pérdidas de apartamento y de comercio reciben las mismas fotos, con una lista de unidades o de suites en lugar de un solo pasillo. Contestamos el (713) 909-0034 a cualquier hora cuando el agua sigue entrando. Las visitas programadas son de lunes a sábado, de 8:00 AM a 6:00 PM.",
        ],
      },
    ],
    [
      {
        q: "¿Tengo que usar un contratista de Allstate?",
        a: "No somos un contratista de Allstate. Si su póliza dice algo sobre quién puede reparar la casa, esa pregunta es para Allstate y para la póliza. No inventamos una regla que no esté escrita ahí.",
      },
      {
        q: "¿Pueden empezar a secar antes de que Allstate inspeccione?",
        a: "Si el edificio está mojado, el secado no debería esperar. Fotografiamos primero. Pregúntele a Allstate qué quiere ver antes de que se tire algo. Un muro que se cierra el mismo día, todavía húmedo, no ayuda al archivo ni a la casa.",
      },
      {
        q: "¿Van a revisar un estimado de Allstate con el ajustador?",
        a: "Explicamos el trabajo de reparación. Enviamos nuestro estimado a su aseguradora para que lo revise y lo trabajamos con el ajustador. No somos ajustadores públicos. Allstate decide la cobertura y el pago.",
      },
      {
        q: "¿Qué pérdidas documentan?",
        a: "Aberturas de techo y de tormenta, granizo, viento, y agua interior de tubos y de aparatos. El agua que sube se escribe como inundación. Revise su póliza. No reescribimos la causa para que suene a otra cosa.",
      },
      {
        q: "¿Trabajan con clientes de Allstate?",
        a: "Sí. Elite Restorations es un contratista independiente y no estamos afiliados a Allstate. Usted nos contrata. Allstate decide el reclamo. El logotipo de Allstate no va en nuestro camión.",
      },
      {
        q: "¿Prometen el pago?",
        a: "Tomamos fotos, limitamos más daño, escribimos un estimado y nos reunimos con el ajustador si usted quiere que estemos. Allstate decide la cobertura. Revise su póliza. El estimado es el precio de la construcción, no una cifra de Allstate.",
      },
      {
        q: "¿La inundación es otra póliza?",
        a: "El agua que sube a menudo es una póliza distinta del viento, del granizo o de una rotura repentina de tubo. Separamos esas causas. Pregúntele a Allstate cuál aplica. Un lavavajillas y un bayou no se anotan igual.",
      },
      {
        q: "¿Huracán, granizo, viento o tornado?",
        a: "Documentamos el daño, protegemos el edificio cuando es seguro, lo secamos y estimamos las reparaciones. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No damos consejo legal.",
      },
      {
        q: "¿Qué fotos ayudan?",
        a: "Fotos amplias, fotos de cerca de la fuente, y de las pertenencias antes de la limpieza. El registro de fotos está en este sitio. Las fotos no crean cobertura con Allstate ni con nadie más.",
      },
      {
        q: "¿Se reúnen con el ajustador?",
        a: "Sí, si usted lo pide. Explicamos el edificio: la lona, los medidores y el estimado. Allstate maneja el pago. Nosotros nos quedamos en la construcción que vimos.",
      },
      {
        q: "¿También apartamentos y comercios?",
        a: "Sí. Llame al (713) 909-0034 a cualquier hora por una emergencia activa de tormenta o de agua en una casa, un apartamento o un edificio comercial. Lleve la lista de unidades si hay más de una mojada.",
      },
    ],
  ),
  insurer(
    "usaa",
    "USAA",
    "Reclamo de USAA en Houston",
    "Casas en Houston con USAA: documentación de tormenta y agua, secado y reparación. No estamos afiliados a USAA. (713) 909-0034.",
    "Los miembros de USAA en Houston a menudo están lejos de la casa: un despliegue, un ciclo de entrenamiento, un padre o una madre con las llaves. El edificio igual necesita fotos y secado. No somos USAA, y no somos un contratista de USAA. La membresía no nos da una puerta especial, y tampoco se la pedimos a usted para salir.",
    [
      {
        eyebrow: "Sin afiliación",
        heading: "Una aseguradora de membresía sigue siendo otra empresa.",
        paragraphs: [
          "Elite Restorations es un contratista independiente y no estamos afiliados a USAA. No somos un contratista de USAA. Trabajamos para quien nos contrata, no para USAA, y su logotipo no es nuestro. Ayudamos a dueños de casa, administradores y dueños de edificios en Houston asegurados por USAA a documentar daño de agua, de tormenta o de techo. USAA decide la cobertura, el deducible y el pago según la póliza. Revise esa póliza. No somos ajustadores públicos. Solo USAA puede decir si un reclamo se aprueba o se paga.",
          "La membresía de USAA, en general, está ligada a la comunidad militar. Eso es público, y importa en una pérdida porque la persona de la póliza puede no ser quien está parado en el cuarto mojado. Un cónyuge, un padre, una madre o un administrador puede ser quien nos llama. Igual necesitamos el número de reclamo de quien lo abra con USAA, y no vamos a hablar en nombre de USAA. Las visitas salen de nuestra oficina en el oeste de Houston (77082).",
        ],
      },
      {
        eyebrow: "El camino",
        heading: "Aviso, fotos, y una casa que puede estar vacía.",
        paragraphs: [
          "Si el miembro no está en Houston, lo primero útil es un registro claro: qué cuartos, por dónde entró el agua, si el techo está abierto y si alguien cerró la llave principal. Podemos fotografiar ese conjunto y enviar los hechos a la persona que tiene que hablar con USAA. No entramos a una cuenta de miembro. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. El miembro sigue siendo quien habla con USAA como titular.",
          "Los problemas del edificio en Houston son los mismos que vemos en otras pólizas. La temporada de huracanes corre de junio a noviembre. El granizo marca techos en los suburbios. Una helada parte líneas del ático sobre las losas. Un calentador en un garaje, el suministro de un lavavajillas o un inodoro que se desborda no esperan a que alguien vuele de regreso. La mitigación limita más daño. USAA decide qué reembolsa, si es que reembolsa algo.",
          "Cuando un ajustador visita, podemos reunirnos con esa persona si quien responde por la casa nos lo pide. Caminamos el daño que vimos. Enviamos nuestro estimado a su aseguradora para que lo revise y lo trabajamos con el ajustador. No somos ajustadores públicos. No damos consejo legal. El estimado de la reparación nombra la construcción. No es un pago de USAA, ni una carta de la membresía.",
        ],
      },
      {
        eyebrow: "Documentación",
        heading: "Un registro que otra persona pueda entender.",
        paragraphs: [
          "Las casas vacías las limpian parientes con buena intención, que tiran la alfombra mojada antes de que alguien la fotografíe. Si usted es la persona en el lugar, use el registro de fotos antes del contenedor. Ponga nombre a los cuartos. Anote la fecha en que notó la pérdida. Conserve la conexión que falló si es seguro conservarla. Una foto del día uno le ahorra al miembro una explicación a ciegas desde otro estado.",
          "Nuestras notas dicen qué estaba mojado, qué se secó y qué se reconstruyó. Usted puede compartirlas con USAA. No son una carta de cobertura. La inundación y el viento siguen siendo historias distintas. Revise las pólizas que el miembro de verdad tiene, incluido cualquier contrato de inundación. Describimos el agua. No suponemos qué pólizas tiene esa familia. Un número de membresía no nos dice la causa.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "La casa en Houston mientras el miembro no está.",
        paragraphs: [
          "Trabajamos en el área de Houston desde nuestra oficina en el oeste de Houston (77082), incluidos Katy, Spring, Clear Lake y los vecindarios más cerca de la oficina, en Westchase y Alief. Las comunidades de apartamentos y las casas son llamadas comunes. Llame al (713) 909-0034 a cualquier hora por una fuga activa o un techo abierto. Díganos quién puede aprobar el trabajo si el miembro no está en la ciudad. Un código de portón y un número de unidad van en el primer mensaje si la pérdida es un apartamento.",
          "Somos una empresa familiar y servimos a Houston desde 1993. Envíe un texto al mismo número. El horario de oficina es de lunes a sábado, de 8:00 AM a 6:00 PM, para una visita que no es emergencia. No somos USAA. No hace falta un número de membresía para que salgamos. Hace falta una dirección, una persona que pueda abrir, y saber si el agua sigue moviéndose.",
        ],
      },
      {
        eyebrow: "En el lugar",
        heading: "Un registro que el miembro pueda leer desde otro lugar.",
        paragraphs: [
          "Cuando el miembro no está en la casa, el valor de la visita es un registro llano: fotos antes de que la lona suba, nombres de unidad o de cuarto, notas de humedad, y un estimado de reparación que diga qué se va a reconstruir. Podemos enviar ese conjunto por texto o por correo a la persona que tiene la póliza de USAA. No lo entregamos nosotros a USAA, salvo que usted esté ahí y lo entregue. El registro de fotos es una herramienta que la persona en el lugar puede llenar el mismo día, cuarto por cuarto, sin esperar el vuelo.",
          "El secado no espera un vuelo de regreso. La tablaroca mojada sobre una losa de Houston empeora con la humedad. Empezamos los pasos que limitan más daño cuando alguien con autoridad nos contrata, y dejamos el nombre de la aseguradora del miembro fuera del nombre de nuestra empresa. Llame al (713) 909-0034 a cualquier hora por una emergencia activa de agua o de tormenta. Nuestra oficina en el oeste de Houston (77082) abre de lunes a sábado, de 8:00 AM a 6:00 PM, cuando la visita puede esperar. Envíe un texto al mismo número si una llamada es difícil desde donde usted está. La humedad del Golfo no se detiene porque el titular esté en otro huso horario.",
        ],
      },
    ],
    [
      {
        q: "¿Pueden hablar con USAA por el miembro?",
        a: "Podemos explicar el edificio a un ajustador en el lugar si usted quiere que estemos. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No entramos a una cuenta de USAA ni hablamos como si fuéramos el miembro. No somos ajustadores públicos.",
      },
      {
        q: "El miembro está desplegado. ¿Igual pueden empezar?",
        a: "Si alguien con autoridad nos contrata, sí. Necesitamos saber quién puede aprobar el secado y las reparaciones. Fotografiamos para que el miembro vea la pérdida desde otro lugar. No esperamos un vuelo para sacar el agua que ya está en la losa.",
      },
      {
        q: "¿Conocen los deducibles de USAA?",
        a: "No. No los adivinamos. El miembro o la póliza tienen esa respuesta. Un despliegue no cambia la página de declaraciones, y nosotros no la inventamos.",
      },
      {
        q: "¿Las familias militares son sus únicos clientes de USAA?",
        a: "Ayudamos a la casa que llama por una propiedad asegurada por USAA. No revisamos la membresía y no reclamamos un estatus especial con USAA. No somos un contratista de USAA.",
      },
      {
        q: "¿Trabajan con clientes de USAA?",
        a: "Sí. Elite Restorations es un contratista independiente y no estamos afiliados a USAA. Usted nos contrata. USAA decide el reclamo. La persona en Houston puede no ser el titular, y aun así el edificio se documenta.",
      },
      {
        q: "¿Prometen el pago de USAA?",
        a: "Tomamos fotos, limitamos más daño, escribimos un estimado y nos reunimos con el ajustador si quien responde por la casa lo pide. USAA decide la cobertura. Revise la póliza. El estimado es el precio de la construcción.",
      },
      {
        q: "¿La inundación es otra póliza?",
        a: "El agua que sube a menudo es una póliza distinta del viento, del granizo o de una rotura repentina de tubo. Separamos esas causas. Pregúntele a USAA, o al miembro, qué contratos tiene de verdad la familia. Nosotros describimos el agua que vimos.",
      },
      {
        q: "¿Huracán, granizo, viento o tornado con el titular fuera?",
        a: "Documentamos el daño, protegemos el edificio cuando es seguro, lo secamos y estimamos las reparaciones. No damos consejo legal. Las fotos se las podemos mandar a quien tenga la póliza. USAA decide el reclamo.",
      },
      {
        q: "¿Qué fotos le sirven a alguien que no está en la casa?",
        a: "Fotos amplias, fotos de cerca de la fuente, y de las pertenencias antes de la limpieza. Ponga el nombre del cuarto en la nota. El registro de fotos está en este sitio. Las fotos no crean cobertura.",
      },
      {
        q: "¿Se reúnen con el ajustador si el miembro no puede?",
        a: "Sí, si la persona responsable de la casa lo pide. Explicamos el edificio. USAA maneja el pago. No sustituimos la voz del miembro en su cuenta.",
      },
      {
        q: "¿Apartamentos y comercios también, con un código de portón?",
        a: "Sí. Llame al (713) 909-0034 a cualquier hora por una emergencia activa de tormenta o de agua. Si es un apartamento, mande el código y el número de unidad en el primer mensaje. Una casa vacía en Katy o en Spring se atiende igual: dirección, acceso y quién aprueba.",
      },
    ],
  ),
  insurer(
    "farmers",
    "Farmers",
    "Reclamo de Farmers en Houston",
    "Dueños en Houston con Farmers: documentación y reparación por tormenta y agua. No estamos afiliados a Farmers. (713) 909-0034.",
    "Quienes tienen póliza de Farmers en Houston a menudo empiezan con el agente que vendió la póliza. Esa llamada es suya. Si el techo está abierto o el piso está mojado, llámenos también. No somos Farmers, y no formamos parte de esa agencia. El edificio no espera a que el aviso quede perfecto.",
    [
      {
        eyebrow: "Sin afiliación",
        heading: "Una relación con un agente no es nuestra relación.",
        paragraphs: [
          "Elite Restorations es un contratista independiente y no estamos afiliados a Farmers. No somos un contratista de Farmers. Trabajamos para quien nos contrata, no para Farmers, y su logotipo no es nuestro. Ayudamos a dueños de casa, administradores y dueños de edificios en Houston asegurados por Farmers a documentar daño de agua, de tormenta o de techo. Farmers decide la cobertura, el deducible y el pago según la póliza. Revise esa póliza. No somos ajustadores públicos. Solo Farmers puede decir si un reclamo se aprueba o se paga.",
          "No sabemos qué agente de Farmers usa usted, y no vamos a llamarnos parte de esa agencia. Pregúntele a Farmers cómo quiere el aviso. Anote el número de reclamo. Nuestro trabajo es el edificio en la dirección que usted nos da. Las visitas salen de nuestra oficina en el oeste de Houston (77082). Somos una empresa familiar y servimos a Houston desde 1993.",
        ],
      },
      {
        eyebrow: "El camino",
        heading: "Aviso, protección, inspección, reparación.",
        paragraphs: [
          "Un reclamo de agua o de tormenta de una casa en Texas suele moverse en ese orden. Es una descripción de lo que vemos, no un procedimiento de Farmers que estemos citando. Su póliza fija la prueba y los tiempos. No inventamos una regla de 48 horas ni ningún otro plazo. Si alguien le dijo que hay un reloj nuestro, no lo hay. El reloj, si existe, está en la póliza o en lo que Farmers le diga por escrito.",
          "La protección en Houston significa una lona cuando el granizo o un huracán abre un techo, tablas cuando el vidrio ya no está, y secado cuando un tubo, un calentador, un lavavajillas o un inodoro pone agua sobre una losa. La temporada de huracanes va del 1 de junio al 30 de noviembre. El granizo de primavera pega en los suburbios, de Katy a The Woodlands. Una helada es la semana en que fallan las líneas del ático. Farmers decide si algo de eso está cubierto. Nosotros decidimos si el techo se puede pisar con seguridad.",
          "Si llega un ajustador de Farmers, podemos caminar con esa persona si usted lo pide. Mostramos lo que fotografiamos y lo que estamos poniendo en el precio. La depreciación, la cantidad que algunas pólizas retienen hasta que el trabajo termina, es tema para hablarlo con Farmers. El estimado es el precio de la construcción. Cualquier pago es decisión de Farmers.",
        ],
      },
      {
        eyebrow: "Documentación",
        heading: "Conserve la prueba que la limpieza va a borrar.",
        paragraphs: [
          "Fotografíe antes de que la alfombra se vaya y antes de que una lona cubra el hoyo. Anote techo, tubo o agua de la calle. Una inundación que vino de un bayou no es una línea de suministro de la cocina. No la reescribimos. El desgaste ordinario se queda como desgaste en las notas, y una fuga lenta se queda como fuga lenta.",
          "Nuestras notas de secado y las fotos de la reparación pueden ir a Farmers con su número de reclamo en su copia, no en nuestro membrete como si fuéramos la aseguradora. El registro de fotos y la guía de reclamos de Texas son el cómo más largo. Explican los pasos. No prometen un pago. Usted junta el paquete. Nosotros no nos firmamos como Farmers.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Las mismas losas, las mismas tormentas, otra aseguradora.",
        paragraphs: [
          "Las casas sobre concreto en Westchase, Alief, Sugar Land, Bellaire y Memorial necesitan el mismo mapa de humedad, diga la póliza Farmers o diga otro nombre. Los administradores de apartamentos con una póliza de Farmers sobre el edificio deben traer los números de unidad. Un plafón manchado no es razón para secar cada unidad. En un comercio chico importa qué hay debajo de la fuga: mercancía, un clóset de servidores o una suite vacía. Esos detalles cambian el orden del trabajo. No cambian quién decide el reclamo.",
          "Somos una empresa familiar y servimos a Houston desde 1993. Llame o envíe un texto al (713) 909-0034 a cualquier hora por una emergencia activa. El horario de oficina es de lunes a sábado, de 8:00 AM a 6:00 PM. No somos Farmers. El formulario de emergencia nos pide devolverle la llamada. Le devolvemos la llamada en cuanto podamos. Una tormenta en toda la ciudad puede retrasar eso.",
        ],
      },
      {
        eyebrow: "En el lugar",
        heading: "El trabajo de emergencia y la reparación, separados.",
        paragraphs: [
          "Ponemos lona, cerramos con madera, sacamos el agua y secamos. Después reparamos lo que usted contrata: techos, tablaroca, pisos. Un cheque de Farmers, si se emite, no tiene que coincidir línea por línea con nuestra factura. Explicamos el trabajo. El desgaste se queda como desgaste en las notas. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Farmers decide el pago. El estimado es el precio de la construcción.",
          "Llame al (713) 909-0034 cuando el agua todavía se mueve o el edificio está abierto. Envíe un texto si no puede hablar. La primera visita es una mirada, no un discurso sobre lo que Farmers debe. En una casa caminamos los cuartos mojados o el techo desde un lugar seguro, fotografiamos lo que ya está dañado y decimos si la siguiente hora es una lona, tablas, secado o una reparación programada. En una comunidad de apartamentos necesitamos los números de unidad y una persona que pueda abrir puertas.",
        ],
      },
      {
        eyebrow: "Después de la llamada",
        heading: "Qué puede esperar de nosotros quien tiene Farmers.",
        paragraphs: [
          "Secar una losa de Houston significa medidores, sacar el agua, ventiladores y deshumidificadores, porque el aire de afuera a menudo está demasiado húmedo para terminar el trabajo solo. Dejamos un muro abierto hasta que esté seco, aunque un inquilino quiera pintura esa misma noche. Las reparaciones, la tablaroca, los pisos y el techo empiezan cuando las lecturas lo sostienen. El precio que damos es por esa construcción. Un pago de Farmers, si llega, es un evento aparte. Los dos números no tienen que coincidir.",
          "Los vecindarios que de verdad manejamos: Houston, Westchase, Alief, el Energy Corridor, Katy, Sugar Land, Bellaire, Memorial, The Woodlands, Pearland y Clear Lake. Las visitas se programan desde nuestra oficina en el oeste de Houston (77082). Si usted solo quería el hábito de las fotos y no una cuadrilla, el registro de fotos de este sitio no crea cobertura con Farmers ni con nadie más. Una lona, un cierre con madera y un secado pueden ocurrir el mismo día y seguir siendo tres líneas en el estimado. Las rotulamos así para que un archivo de Farmers se pueda leer sin adivinar. Una mancha no es el precio de todo el edificio.",
        ],
      },
    ],
    [
      {
        q: "¿Debo llamar primero a mi agente de Farmers?",
        a: "Llámenos si el edificio está empeorando. El aviso a Farmers sigue siendo su tarea. Pregúnteles cómo lo quieren, y conserve el número de reclamo. No somos parte de esa agencia.",
      },
      {
        q: "¿Pueden decirme el deducible de Farmers?",
        a: "No. No adivinamos un porcentaje de viento o de granizo. Lea las declaraciones o pregúntele a Farmers. El estimado que escribimos es el precio de la construcción, no ese deducible.",
      },
      {
        q: "¿Solo trabajan en techos?",
        a: "No. Techos, lonas, cierre con madera, y agua interior de tubos y de aparatos. La causa se queda en lo que se puede ver. Una helada en el ático y el granizo de Katy no se escriben como la misma frase.",
      },
      {
        q: "¿Qué pasa si Farmers quiere inspeccionar antes de las reparaciones?",
        a: "Pregúnteles. Igual fotografiamos y protegemos una abertura que está dejando entrar el clima, cuando es seguro. Los acabados permanentes pueden esperar. Más agua no debería esperar. Un inquilino que quiere pintura la misma noche tampoco adelanta el secado.",
      },
      {
        q: "¿Trabajan con clientes de Farmers?",
        a: "Sí. Elite Restorations es un contratista independiente y no estamos afiliados a Farmers. Usted nos contrata. Farmers decide el reclamo. No somos un contratista de Farmers.",
      },
      {
        q: "¿Prometen el pago?",
        a: "Tomamos fotos, limitamos más daño, escribimos un estimado y nos reunimos con el ajustador si usted quiere que estemos. Farmers decide la cobertura. Revise su póliza. No inventamos un plazo de 48 horas.",
      },
      {
        q: "¿La inundación es otra póliza?",
        a: "El agua que sube a menudo es una póliza distinta del viento, del granizo o de una rotura repentina de tubo. Separamos esas causas. Un bayou y una línea de cocina no comparten una nota. Pregúntele a Farmers.",
      },
      {
        q: "¿Huracán, granizo, viento o tornado?",
        a: "Documentamos el daño, protegemos el edificio cuando es seguro, lo secamos y estimamos las reparaciones. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No damos consejo legal.",
      },
      {
        q: "¿Qué fotos ayudan en un archivo de Farmers?",
        a: "Fotos amplias, fotos de cerca de la fuente, y de las pertenencias antes de la limpieza. El registro de fotos está en este sitio. Ponga el número de reclamo en su copia, no en un membrete que parezca de la aseguradora. Las fotos no crean cobertura.",
      },
      {
        q: "¿Se reúnen con el ajustador?",
        a: "Sí, si usted lo pide. Explicamos el edificio y las líneas del estimado: lona, secado y reparación, por separado. Farmers maneja el pago.",
      },
      {
        q: "¿Apartamentos y comercios con Farmers?",
        a: "Sí. Llame al (713) 909-0034 a cualquier hora por una emergencia activa. Traiga los números de unidad y, en un comercio, diga si debajo de la fuga hay mercancía, servidores o una suite vacía. Una tormenta en toda la ciudad puede retrasar la llamada de regreso.",
      },
    ],
  ),
  insurer(
    "liberty-mutual",
    "Liberty Mutual",
    "Reclamo de Liberty Mutual en Houston",
    "Ayuda en Houston por tormenta y agua si su póliza es de Liberty Mutual. No estamos afiliados. Llame al (713) 909-0034.",
    "Liberty Mutual es un nombre nacional en muchas pólizas de Houston. El nombre no elige a su contratista. Elite Restorations documenta y repara el edificio. Liberty Mutual decide el reclamo. Los lemas, los guiones del centro de reclamos y el deducible de su página no son textos nuestros.",
    [
      {
        eyebrow: "Sin afiliación",
        heading: "Marca nacional, edificio local, empresas distintas.",
        paragraphs: [
          "Elite Restorations es un contratista independiente y no estamos afiliados a Liberty Mutual. No somos un contratista de Liberty Mutual. Trabajamos para quien nos contrata, no para Liberty Mutual, y su logotipo no es nuestro. Ayudamos a dueños de casa, administradores y dueños de edificios en Houston asegurados por Liberty Mutual a documentar daño de agua, de tormenta o de techo. Liberty Mutual decide la cobertura, el deducible y el pago según la póliza. Revise esa póliza. No somos ajustadores públicos. Solo Liberty Mutual puede decir si un reclamo se aprueba o se paga.",
          "Los lemas de Liberty Mutual, los deducibles y los guiones del centro de reclamos no son nuestros para citarlos. Usted llama al número de su póliza para el aviso. Usted llama al (713) 909-0034 por el techo abierto o el piso mojado. Las dos llamadas pueden ocurrir en la misma hora. Las visitas salen de nuestra oficina en el oeste de Houston (77082). Somos una empresa familiar y servimos a Houston desde 1993.",
        ],
      },
      {
        eyebrow: "El camino",
        heading: "Lo que suele pasar, sin fingir que es su formulario.",
        paragraphs: [
          "En Texas, los dueños de casa en general dan aviso, protegen la propiedad, se encuentran con una inspección y después reparan. Su póliza de Liberty Mutual puede describir eso de otra manera. Léala o pregúnteles. Donde la póliza calla, nosotros también callamos. No llenamos el silencio con una regla de taller.",
          "Los eventos de Houston son concretos. Granizo y viento en techos de teja asfáltica. Lluvia de huracán por un valle levantado, entre junio y noviembre. Un tubo o un calentador reventados sobre una losa después de una helada, o un martes cualquiera. Un lavavajillas o un inodoro que cruzan un pasillo. Fotografiamos el que usted tiene. Los apartamentos y los comercios asegurados por Liberty Mutual reciben una lista de unidades o de suites, no una suposición.",
          "La visita del ajustador es la inspección de Liberty Mutual. Asistimos si usted quiere un contratista en el cuarto para explicar la lona, los medidores y el estimado. La decisión de cobertura se queda en la póliza. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. El estimado es el precio de la construcción. El pago lo decide Liberty Mutual.",
        ],
      },
      {
        eyebrow: "Documentación",
        heading: "Fotos que todavía se entienden después del contenedor.",
        paragraphs: [
          "Amplias, de cerca, de la fuente, de las pertenencias. Hágalo antes de la limpieza. Conserve una manguera que falló. Escriba el número de reclamo en sus propias notas. Nuestras fotos del secado y de las reparaciones son un segundo conjunto que usted puede compartir. Juntas son un registro. No son una aprobación de Liberty Mutual.",
          "Limitar más daño es una frase que muchas pólizas usan. Si Liberty Mutual paga la factura de esos pasos no es algo que vayamos a predecir. Hacemos el trabajo que usted contrata. Una lona segura se pone para que un plafón mojado no se moje más. El nombre de la aseguradora no va en el camión, y tampoco reescribimos el alcance para perseguir una cifra que todavía no existe.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "El calor, las losas y el deducible que no adivinamos.",
        paragraphs: [
          "La gente nos pide rebajar el deducible, o decir si Liberty Mutual usa un porcentaje para el viento. Ese número está en su página de declaraciones. Lo que sí decimos es si el techo que tenemos enfrente se puede reparar o hay que quitarlo, y hasta dónde llegó el agua en la losa. Un porcentaje de viento, si la póliza lo usa, se lo señala Liberty Mutual en su propio texto. Dejamos esa frase como ellos la escribieron.",
          "Trabajamos desde nuestra oficina en el oeste de Houston (77082). Somos una empresa familiar y servimos a Houston desde 1993. Llame o envíe un texto al (713) 909-0034. Emergencias a cualquier hora. Visitas de lunes a sábado, de 8:00 AM a 6:00 PM. No somos Liberty Mutual. La humedad de Houston no espera el calendario de una inspección.",
        ],
      },
      {
        eyebrow: "En el lugar",
        heading: "Alcances que un archivo de Liberty Mutual sí puede leer.",
        paragraphs: [
          "Separamos la cubierta de emergencia del techo permanente, y el secado de la reconstrucción. Mezclarlos produce un archivo difícil de seguir. Describimos el granizo y el desgaste como los vemos. La inundación se queda como inundación, y un tubo se queda como tubo. Un techo marcado por granizo en Cypress se inspecciona en las pendientes, no se juzga desde la banqueta. Una línea de suministro bajo una losa de Katy se mapea con medidores antes de hablar de pisos nuevos.",
          "Si quiere que estemos en la reunión con el ajustador, dígalo cuando llame al (713) 909-0034. Llevamos las fotos que tomamos. Lo que Liberty Mutual debe es decisión de ellos, no un guion nuestro. Un local en Richmond con el vidrio roto recibe tablas cuando la abertura se puede cubrir con seguridad, y fotos antes de que la madera lo esconda. La temporada de huracanes, del 1 de junio al 30 de noviembre, es cuando varias de esas cosas pueden ser ciertas en la misma cuadra.",
        ],
      },
      {
        eyebrow: "Después de la llamada",
        heading: "Una casa con Liberty Mutual sigue siendo un trabajo normal de Houston.",
        paragraphs: [
          "Lo que tenemos es el edificio, no un manual de Liberty Mutual. Usted puede contratarnos antes de que Liberty Mutual haya fijado un número, y también puede decidir no hacerlo. Los pasos que limitan más daño son a menudo lo que una póliza espera. Eso no es un recibo que Liberty Mutual haya prometido pagar. Le cobramos a la persona que firma el trabajo. El estimado de Liberty Mutual, si escriben uno, se puede comparar con el nuestro como dos descripciones de la construcción. Explicamos el nuestro. Una disputa, si usted la tiene, la maneja usted.",
          "Llame o envíe un texto al (713) 909-0034. Nuestra oficina en el oeste de Houston (77082) abre de lunes a sábado, de 8:00 AM a 6:00 PM, para una visita tranquila. El agua activa y los techos abiertos se contestan a cualquier hora, también para administradores de apartamentos y dueños de comercios que resultan estar asegurados por Liberty Mutual. Secamos un muro mojado el día que nos contratan, porque la humedad no espera un calendario. El seguro no está pintado en el camión. La losa se mide igual.",
        ],
      },
    ],
    [
      {
        q: "¿Pueden decirme si Liberty Mutual va a aprobar el techo?",
        a: "No. Podemos decir qué necesita el techo como construcción: reparación o quitarlo. La aprobación es decisión de Liberty Mutual después de ver la póliza y el daño. No somos un contratista de Liberty Mutual.",
      },
      {
        q: "¿Igualan un estimado de Liberty Mutual?",
        a: "Ponemos precio al trabajo que recomendamos. Si la cifra de ellos es distinta, explicamos nuestro trabajo. No lo reescribimos para perseguir su número. Enviamos nuestro estimado a su aseguradora para que lo revise y lo trabajamos con el ajustador. No somos ajustadores públicos.",
      },
      {
        q: "¿Un deducible de porcentaje es automático?",
        a: "No sabemos qué dice su póliza. Muchos deducibles de viento o de granizo en Texas funcionan así. El suyo puede no funcionar así. Revíselo, o pídale a Liberty Mutual que señale la frase. Nosotros no la inventamos.",
      },
      {
        q: "¿Un administrador puede usar esta página?",
        a: "Sí, si el edificio está asegurado por Liberty Mutual. Seguimos sin ser un proveedor de ellos. Llame al (713) 909-0034 con la dirección y el acceso. Traiga la lista de suites o de unidades.",
      },
      {
        q: "¿Trabajan con clientes de Liberty Mutual?",
        a: "Sí. Elite Restorations es un contratista independiente y no estamos afiliados a Liberty Mutual. Usted nos contrata. Liberty Mutual decide el reclamo. Los lemas de la marca no son nuestros.",
      },
      {
        q: "¿Prometen el pago?",
        a: "Tomamos fotos, limitamos más daño, escribimos un estimado y nos reunimos con el ajustador si usted quiere que estemos. Liberty Mutual decide la cobertura. Revise su póliza. El estimado es el precio de la construcción.",
      },
      {
        q: "¿La inundación es otra póliza?",
        a: "El agua que sube a menudo es una póliza distinta del viento, del granizo o de una rotura repentina de tubo. Separamos esas causas. Un valle de techo y una calle inundada no comparten la misma nota. Pregúntele a Liberty Mutual.",
      },
      {
        q: "¿Huracán, granizo, viento o tornado?",
        a: "Documentamos el daño, protegemos el edificio cuando es seguro, lo secamos y estimamos las reparaciones. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No damos consejo legal.",
      },
      {
        q: "¿Qué fotos sirven después de que se llenó el contenedor?",
        a: "Fotos amplias, de cerca, de la fuente y de las pertenencias, tomadas antes de la limpieza. Conserve la manguera que falló. El registro de fotos está en este sitio. Las fotos no crean cobertura.",
      },
      {
        q: "¿Se reúnen con el ajustador?",
        a: "Sí, si usted lo pide al llamar. Llevamos las fotos. Explicamos la lona, los medidores y el estimado, con la cubierta de emergencia separada del techo permanente. Liberty Mutual maneja el pago.",
      },
      {
        q: "¿Casas, apartamentos y comercios?",
        a: "Sí. Llame al (713) 909-0034 a cualquier hora por una emergencia activa de tormenta o de agua. Un local en Richmond, una losa en Katy y un techo en Cypress se documentan como el edificio que son, no como un guion nacional.",
      },
    ],
  ),
  insurer(
    "travelers",
    "Travelers",
    "Reclamo de Travelers en Houston",
    "Ayuda para casas y edificios en Houston asegurados por Travelers. Documentación y reparaciones. Llame al (713) 909-0034.",
    "Travelers aparece en casas de Houston y en algunas pólizas de edificios. No sabemos cuál tiene usted, y no somos un contratista de Travelers. Reparamos edificios. Travelers atiende los reclamos. Una póliza de casa y una póliza de edificio no se tratan como el mismo archivo solo porque el techo filtró.",
    [
      {
        eyebrow: "Sin afiliación",
        heading: "Póliza de casa o póliza de edificio: sigue siendo otra empresa.",
        paragraphs: [
          "Elite Restorations es un contratista independiente y no estamos afiliados a Travelers. No somos un contratista de Travelers. Trabajamos para quien nos contrata, no para Travelers, y su logotipo no es nuestro. Ayudamos a dueños de casa, administradores y dueños de edificios en Houston asegurados por Travelers a documentar daño de agua, de tormenta o de techo. Travelers decide la cobertura, el deducible y el pago según la póliza. Revise esa póliza. No somos ajustadores públicos. Solo Travelers puede decir si un reclamo se aprueba o se paga.",
          "Una póliza de casa y una póliza de edificio son documentos distintos. Díganos cuál cree tener, y después confírmelo con Travelers. No vamos a tratar la póliza de un local y la póliza de una casa como el mismo reclamo solo porque el techo filtró. Las visitas salen de nuestra oficina en el oeste de Houston (77082). Somos una empresa familiar y servimos a Houston desde 1993.",
        ],
      },
      {
        eyebrow: "El camino",
        heading: "La secuencia que vemos, no un manual de Travelers.",
        paragraphs: [
          "Aviso a Travelers, protección de la propiedad, una inspección y una reparación. Ese es el camino ordinario en Texas. Travelers puede pedir el aviso de una forma concreta. Pregúnteles. Conserve el número de reclamo. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Los plazos los citan ellos, no esta página.",
          "En el lugar, en Houston, ponemos lona en aberturas de tormenta, cerramos con madera el vidrio roto y secamos agua de techos, tubos, calentadores, lavavajillas e inodoros. Las losas guardan humedad. La temporada de huracanes va del 1 de junio al 30 de noviembre. El granizo es un problema de primavera y de verano tierra adentro. Una helada es ocasional y dura con las líneas del ático. Escribimos la causa que se puede ver.",
          "Las pérdidas de comercio y de apartamentos necesitan una lista de suites o de unidades, y una persona que pueda aprobar aberturas. Podemos reunirnos con un ajustador de Travelers en el lugar. Explicamos el edificio. Travelers decide la pérdida. Un archivo de casa nombra cuartos. Un archivo de edificio nombra suites, el acceso al techo y quién puede aprobar tablaroca mientras la gente sigue adentro.",
        ],
      },
      {
        eyebrow: "Documentación",
        heading: "Dos archivos: el suyo y el de la construcción.",
        paragraphs: [
          "Su archivo es el número de reclamo, las fotos que usted tomó y lo que Travelers le dijo que conservara. Nuestro archivo es la humedad, los materiales que quitamos y el estimado de la reparación. Usted puede adjuntar el nuestro al suyo. Juntos son un registro, no una exigencia. El estimado es el precio de la construcción. No es una suposición de lo que Travelers debería deber.",
          "El registro de fotos es el paquete más simple, cuarto por cuarto. Úselo el día de la pérdida. No crea cobertura y no sustituye el aviso a Travelers. Si Travelers quiere que se conserve el tubo dañado o un pedazo de teja, siga su instrucción. Guardamos esa prueba hasta que esté fotografiada. No la tiramos solo para que el cuarto se vea terminado.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "El área de Houston, una oficina, sin cambiar de logotipo.",
        paragraphs: [
          "Trabajamos desde nuestra oficina en el oeste de Houston (77082) en Houston, el Energy Corridor, Katy, Sugar Land, Clear Lake y The Woodlands. Somos una empresa familiar y servimos a Houston desde 1993. Una casa asegurada por Travelers y un local asegurado por Travelers pueden llamar ambos al (713) 909-0034. El trabajo no se va a ver igual, y no lo forzamos a verse igual. Una abertura de viento en Clear Lake y un techo de granizo en Katy se escriben como los techos que son.",
          "Envíe un texto al mismo número. Emergencias activas a cualquier hora. Horario de oficina de lunes a sábado, de 8:00 AM a 6:00 PM. No somos Travelers. Si alguien le dijo que estábamos en una lista de proveedores de Travelers, estaba equivocado. Usted puede contratarnos de todos modos. Travelers sigue decidiendo el reclamo.",
        ],
      },
      {
        eyebrow: "En el lugar",
        heading: "Lo que el estimado sí puede ser.",
        paragraphs: [
          "El estimado pone precio a las reparaciones: techo, tablaroca, pisos, una lona, un cierre con madera, el secado. No es una cifra inventada de lo que Travelers debería pagar. Si una pérdida comercial y una pérdida de casa están abiertas después de la misma tormenta, reciben notas separadas. El agua de inundación se llama agua de inundación. El viento, el granizo, un tubo reventado y el agua que sube se quedan separados.",
          "Llame al (713) 909-0034 si el edificio está abierto o mojado. Diremos si podemos estar en el techo con seguridad. El resultado es decisión de Travelers, y no lo prometemos. En una casa de dos pisos la fuga a menudo se ve abajo. En un apartamento de jardín se ve en el plafón del último piso y a veces en el corredor. Listamos esos lugares. Una mancha no es un precio para toda la comunidad.",
        ],
      },
      {
        eyebrow: "Después de la llamada",
        heading: "El archivo de la casa y el del edificio se quedan aparte.",
        paragraphs: [
          "Travelers puede asegurar la casa en la que usted vive o un edificio que usted posee. Preguntamos cuál, porque una oficina de arrendamiento y una cocina no se documentan igual. Los dos reciben fotos antes de la limpieza. Ninguno lleva nuestro nombre impreso como si Travelers nos hubiera enviado. El clima de Houston sigue mandando en el trabajo: viento y granizo en teja asfáltica, lluvia de huracán por los tapajuntas de junio a noviembre, una helada que parte una línea del ático, un calentador que se vacía sobre la losa del garaje. Decimos cuál de esos vemos.",
          "Una fuga de mantenimiento se queda como fuga de mantenimiento, aunque una tormenta haya pasado el mismo mes. El concreto de aquí guarda agua después de que el charco se fue, y lo medimos antes de reconstruir. Si el plafón debajo de un baño de arriba está manchado, ese plafón es parte de la visita hasta que un medidor diga que está seco. Travelers no recibe un medidor distinto. La dirección sí. Trabajamos desde nuestra oficina en el oeste de Houston (77082). Llame o envíe un texto al (713) 909-0034. Si solo necesita el hábito de fotografiar una pérdida, use el registro de fotos. Contratarnos es aparte, y la decisión de Travelers es aparte otra vez.",
        ],
      },
    ],
    [
      {
        q: "¿Manejan distinto los reclamos comerciales de Travelers?",
        a: "La documentación es más estricta con las suites y el acceso. La regla es la misma: no somos Travelers, y no decidimos la cobertura. Un local y una cocina no comparten un solo párrafo.",
      },
      {
        q: "¿Pueden distinguir una póliza de casa de una póliza de negocio?",
        a: "No, a partir del logotipo de una tarjeta. Usted y Travelers sí pueden. Díganos lo que cree tener, y nosotros seguiremos describiendo solo el edificio.",
      },
      {
        q: "¿Van a esperar para poner la lona hasta que llegue Travelers?",
        a: "Si viene más clima y el techo es seguro, fotografiamos y cubrimos. Pregúntele a Travelers qué quiere que se conserve. No inventamos su instrucción. Un pedazo de teja o un tubo dañado se guarda hasta la foto.",
      },
      {
        q: "¿Están en una lista de proveedores de Travelers?",
        a: "No. Si alguien le dijo que sí, estaba equivocado. No somos un contratista de Travelers. Usted puede contratarnos de todos modos. Travelers sigue decidiendo el reclamo.",
      },
      {
        q: "¿Trabajan con clientes de Travelers?",
        a: "Sí. Elite Restorations es un contratista independiente y no estamos afiliados a Travelers. Usted nos contrata. Travelers decide el reclamo. La casa y el edificio se documentan en archivos distintos.",
      },
      {
        q: "¿Prometen el pago?",
        a: "Tomamos fotos, limitamos más daño, escribimos un estimado y nos reunimos con el ajustador si usted quiere que estemos. Travelers decide la cobertura. Revise su póliza. El estimado es el precio de la construcción.",
      },
      {
        q: "¿La inundación es otra póliza?",
        a: "El agua que sube a menudo es una póliza distinta del viento, del granizo o de una rotura repentina de tubo. Separamos esas causas en las notas. Pregúntele a Travelers antes de tratarlas como un solo evento.",
      },
      {
        q: "¿Huracán, granizo, viento o tornado?",
        a: "Documentamos el daño, protegemos el edificio cuando es seguro, lo secamos y estimamos las reparaciones. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No damos consejo legal.",
      },
      {
        q: "¿Qué fotos van en el archivo de la casa y cuáles en el del edificio?",
        a: "En una casa, fotos de cuartos. En un edificio, fotos de suites o de unidades, del acceso al techo y de quién puede abrir. Amplias, de cerca y de la fuente, antes de la limpieza. El registro de fotos está en este sitio. Las fotos no crean cobertura.",
      },
      {
        q: "¿Se reúnen con el ajustador?",
        a: "Sí, si usted lo pide. Explicamos el edificio. Travelers maneja el pago. En un apartamento de jardín caminamos el plafón del último piso y el corredor si el agua llegó ahí. Una mancha no cotiza toda la comunidad.",
      },
      {
        q: "¿Casas, apartamentos y comercios?",
        a: "Sí. Llame al (713) 909-0034 a cualquier hora por una emergencia activa de tormenta o de agua. Diga si es la casa en la que vive o un edificio que administra. El acceso y la lista de unidades cambian la visita.",
      },
    ],
  ),
  insurer(
    "nationwide",
    "Nationwide",
    "Reclamo de Nationwide en Houston",
    "Ayuda en Houston por agua y tormenta para asegurados de Nationwide. No estamos afiliados a Nationwide. (713) 909-0034.",
    "Quien tiene póliza de Nationwide elige su propia empresa de reparación. Elite Restorations es una opción en Houston. No somos Nationwide, y no pedimos prestado su nombre ni el lenguaje de sus anuncios. Si un agente le sugirió llamar a un contratista, esa sugerencia es del agente. Usted puede contratarnos o no. Nationwide sigue decidiendo el reclamo.",
    [
      {
        eyebrow: "Sin afiliación",
        heading: "Sin marca compartida y sin autoridad compartida.",
        paragraphs: [
          "Elite Restorations es un contratista independiente y no estamos afiliados a Nationwide. No somos un contratista de Nationwide. Trabajamos para quien nos contrata, no para Nationwide, y su logotipo no es nuestro. Ayudamos a dueños de casa, administradores y dueños de edificios en Houston asegurados por Nationwide a documentar daño de agua, de tormenta o de techo. Nationwide decide la cobertura, el deducible y el pago según la póliza. Revise esa póliza. No somos ajustadores públicos. Solo Nationwide puede decir si un reclamo se aprueba o se paga.",
          "No vamos a usar el lenguaje publicitario de Nationwide ni a insinuar que la empresa nos envió. Si un agente le recomendó llamar a un contratista, eso es una sugerencia del agente, no un despacho nuestro. Llegamos como Elite Restorations. Las visitas salen de nuestra oficina en el oeste de Houston (77082). Somos una empresa familiar y servimos a Houston desde 1993.",
        ],
      },
      {
        eyebrow: "El camino",
        heading: "Una pérdida de Houston junto a una póliza de Nationwide.",
        paragraphs: [
          "Dé a Nationwide el aviso como ellos lo piden. Su guion es de ellos. Conserve el número de reclamo. Proteja la casa el mismo día si está entrando agua: lona, tablas, cierre la llave principal y saque el agua. Un ajustador puede programar la visita días después. El secado no debería esperar ese tiempo. Fotografiamos para que la visita todavía tenga prueba.",
          "Los hechos del edificio son locales. Losas en Houston, Westchase, Alief y Katy. Granizo en techos de los suburbios del norte y del oeste. Viento de la costa hacia Galveston y Clear Lake. Temporada de huracanes del 1 de junio al 30 de noviembre. Agua interior de calentadores, lavavajillas, inodoros y tubos rotos por una helada, cualquier mes en que ocurra la falla. Documentamos eso como lo encontramos. Asistimos a la visita si usted quiere. La cifra de Nationwide la resuelven ellos.",
          "Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. El estimado es el precio de la construcción. El pago lo decide Nationwide. Si el ajustador ya vino, igual podemos caminar los mismos cuartos y explicar qué secamos. Si todavía no viene, las fotos de hoy son las que va a querer tener. De las dos maneras seguimos siendo el contratista, no la aseguradora, y el nombre de ellos se queda fuera de nuestro estimado.",
        ],
      },
      {
        eyebrow: "Documentación",
        heading: "Sus fotos, nuestras lecturas, la decisión de ellos.",
        paragraphs: [
          "Tome fotos antes de la limpieza. Conserve los materiales dañados que le dijeron que guardara. Nuestros medidores y las fotos de la reparación son adicionales. Juntos son un registro. No son una aprobación. Una rotura repentina de tubo y una fuga de mucho tiempo son historias distintas. La inundación y el viento son pólizas distintas más a menudo de lo que no. Revise lo que Nationwide le emitió de verdad. Describimos el agua. El número de formulario está en su póliza.",
          "Nombramos los cuartos, las pendientes del techo y la causa que se puede ver. Una lona es temporal. Un cambio de techo es otro precio. El secado es su propia parte del trabajo. Ninguno de esos números es un pago de Nationwide. Un asegurado de Nationwide en una casa de losa en Houston recibe el mismo mapa de humedad que cualquier otro cliente: por dónde se fue el agua, no un relato escrito para coincidir con un formulario. Las losas de Westchase, Alief, Katy y Sugar Land guardan el agua de la misma manera.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Empresa familiar, con la aseguradora fuera del camión.",
        paragraphs: [
          "Elite Restorations es una empresa familiar. Trabajamos desde nuestra oficina en el oeste de Houston (77082) y servimos a Houston desde 1993. Llame o envíe un texto al (713) 909-0034. Contestamos emergencias activas de tormenta y de agua a cualquier hora, en casas, apartamentos y edificios comerciales. Las visitas programadas son de lunes a sábado, de 8:00 AM a 6:00 PM. Una visita tranquila de entre semana cabe en ese horario.",
          "No somos Nationwide. Una página con su nombre en nuestro sitio es una guía para nuestros clientes, no una insignia. El vecindario no elige la cobertura, y nosotros tampoco la elegimos. Describimos el agua. Ellos deciden la póliza. Llame al (713) 909-0034 si el plafón sigue goteando. Un administrador con una póliza de edificio de Nationwide usa ese mismo número y debe tener la lista de unidades lista antes de que lleguemos, incluidas las que ya tienen el plafón mojado.",
        ],
      },
      {
        eyebrow: "En el lugar",
        heading: "El trabajo de reparación escrito en cuartos, no en lemas.",
        paragraphs: [
          "En la propiedad miramos la causa: una abertura de techo, granizo, una ventana rota, un tubo, un calentador, un lavavajillas, un inodoro. Lo fotografiamos, protegemos lo que es seguro proteger y secamos hasta donde llegó el agua. Las pilas de apartamentos reciben una lista de plafones mojados, no un relato de que todo el edificio está perdido. Los baños y los cuartos de descanso de un comercio son parte del trabajo cuando ahí está el agua.",
          "El costo se queda aproximado hasta que lo vemos. Una lona en un techo que se puede caminar a menudo se planea desde unos cientos de dólares hasta unos $2,000. Secar un cuarto a menudo se planea en unos miles, en la parte baja. Un techo completo es otro rango, a menudo de $12,000 a $24,000 en muchas casas de teja asfáltica, y solo se vuelve una oferta después de ver la madera bajo las tejas. Esos son rangos para planear. No son su deducible de Nationwide. Ese deducible está en su póliza, así que no lo vamos a adivinar.",
        ],
      },
      {
        eyebrow: "Después de la llamada",
        heading: "La visita, sin un guion de Nationwide.",
        paragraphs: [
          "Si está mirando un plafón abierto, llame al (713) 909-0034. Envíe fotos por texto si eso es más fácil. Le diremos qué no hacer antes de que lleguemos, incluido quedarse fuera del techo. Podemos empezar sin número de reclamo si usted nos contrata para detener el daño. Consiga el número para su archivo en cuanto Nationwide lo abra. Abrir el reclamo es su llamada a ellos.",
          "El área de Houston se atiende desde la oficina 77082. Una página no es un despacho. Si Nationwide ya envió un ajustador, caminamos lo que se secó y lo explicamos. Si no lo ha enviado, el registro de hoy es la prueba. En los dos casos el nombre de Nationwide se queda fuera del estimado. Traiga la lista de unidades si el daño está en un edificio, para abrir las puertas correctas y no las secas. Trabajamos desde nuestra oficina en el oeste de Houston (77082). El horario de una visita que puede esperar es de lunes a sábado, de 8:00 AM a 6:00 PM.",
        ],
      },
    ],
    [
      {
        q: "¿Los envió Nationwide?",
        a: "No. Si encontró esta página, encontró nuestro sitio. Somos independientes de Nationwide. No somos un contratista de Nationwide. Una sugerencia de un agente no es un despacho nuestro.",
      },
      {
        q: "¿Mi agente puede exigir un contratista específico?",
        a: "Pregúntele a Nationwide y lea la póliza. No vamos a afirmar que la póliza dice algo que quizá no dice. Igual puede pedirnos que miremos el edificio. Usted elige a quién contrata.",
      },
      {
        q: "¿Conocen los plazos de reclamo de Nationwide?",
        a: "No. Están en la póliza, o en la respuesta de Nationwide cuando usted pregunte. No inventamos uno. No inventamos tampoco el deducible.",
      },
      {
        q: "¿Pueden empezar sin número de reclamo?",
        a: "Sí, si nos contrata para detener el daño. Consiga el número para su archivo en cuanto Nationwide abra el reclamo. Abrir el reclamo es su llamada a ellos. Las fotos de hoy no deben esperar ese número.",
      },
      {
        q: "¿Trabajan con clientes de Nationwide?",
        a: "Sí. Elite Restorations es un contratista independiente y no estamos afiliados a Nationwide. Usted nos contrata. Nationwide decide el reclamo. El nombre de ellos no va en el camión ni en el estimado.",
      },
      {
        q: "¿Prometen el pago?",
        a: "Tomamos fotos, limitamos más daño, escribimos un estimado y nos reunimos con el ajustador si usted quiere que estemos. Nationwide decide la cobertura. Revise su póliza. Los rangos de lona, secado y techo son para planear la construcción, no para adivinar el deducible.",
      },
      {
        q: "¿La inundación es otra póliza?",
        a: "El agua que sube a menudo es una póliza distinta del viento, del granizo o de una rotura repentina de tubo. Separamos esas causas. El viento hacia Galveston y una línea bajo la losa de Katy no son el mismo evento. Pregúntele a Nationwide.",
      },
      {
        q: "¿Huracán, granizo, viento o tornado?",
        a: "Documentamos el daño, protegemos el edificio cuando es seguro, lo secamos y estimamos las reparaciones. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No damos consejo legal.",
      },
      {
        q: "¿Qué fotos ayudan?",
        a: "Fotos amplias, fotos de cerca de la fuente, y de las pertenencias antes de la limpieza. El registro de fotos está en este sitio. Las fotos no crean cobertura. Si el ajustador llega días después, esas fotos son la prueba que el secado no debe borrar.",
      },
      {
        q: "¿Se reúnen con el ajustador?",
        a: "Sí, si usted lo pide. Explicamos el edificio y lo que se secó. Nationwide maneja el pago. Si el ajustador ya caminó los cuartos, igual podemos explicar las lecturas.",
      },
      {
        q: "¿Apartamentos y comercios?",
        a: "Sí. Llame al (713) 909-0034 a cualquier hora por una emergencia activa. Un administrador debe tener la lista de unidades antes de que lleguemos, con los plafones que ya están mojados. No secamos el edificio entero por una sola mancha.",
      },
    ],
  ),
  insurer(
    "progressive",
    "Progressive",
    "Reclamo de Progressive en Houston",
    "Daño a una casa o edificio en Houston con póliza de vivienda de Progressive. No es un reclamo de auto. (713) 909-0034.",
    "Muchos conductores de Houston conocen a Progressive por el seguro del carro. Un reclamo de casa no es un reclamo de auto. Si su póliza de casa o de vivienda está con Progressive, esta página es sobre el edificio. No somos Progressive. No pedimos un VIN. Preguntamos si el techo está abierto y si alguien está parado en agua cerca de la electricidad.",
    [
      {
        eyebrow: "Sin afiliación",
        heading: "Separe la póliza del carro de la póliza de la casa.",
        paragraphs: [
          "Elite Restorations es un contratista independiente y no estamos afiliados a Progressive. No somos un contratista de Progressive. Trabajamos para quien nos contrata, no para Progressive, y su logotipo no es nuestro. Ayudamos a dueños de casa, administradores y dueños de edificios en Houston asegurados por Progressive a documentar daño de agua, de tormenta o de techo. Progressive decide la cobertura, el deducible y el pago según la póliza. Revise esa póliza. No somos ajustadores públicos. Solo Progressive puede decir si un reclamo se aprueba o se paga.",
          "Un techo o una pérdida de agua se quedan en la póliza de la propiedad, no en un reclamo de auto. Qué empresa de Progressive emitió la póliza de casa está escrito en la página de declaraciones. Pregúntele a Progressive cómo quiere el aviso en la póliza de la propiedad. Llame al (713) 909-0034 por el edificio mojado. Son llamadas distintas a propósito. Las visitas salen de nuestra oficina en el oeste de Houston (77082).",
        ],
      },
      {
        eyebrow: "El camino",
        heading: "El aviso de la propiedad, y después el edificio de Houston.",
        paragraphs: [
          "A veces la gente llama al número que usa después de un golpe de defensa. Si el daño es un techo, un tubo o una inundación, pídale a Progressive el camino del reclamo de la propiedad y anote ese número de reclamo. Su menú de teléfono no es algo que conozcamos. Un deducible de carro no es un número que vayamos a poner en un techo. Un número de reclamo de auto no explica un plafón.",
          "El trabajo del edificio es conocido. Lona en una abertura de tormenta. Tablas en una ventana rota. Secado de una losa después de un tubo reventado, un calentador, un lavavajillas o un inodoro. La temporada de huracanes va del 1 de junio al 30 de noviembre. El granizo y el viento marcan techos en toda el área de Houston. Una helada es más rara y suele ser un evento de plomería. El agua que sube de la calle puede no ser ni la póliza del auto ni la póliza de casa. Revise si tiene cobertura de inundación.",
          "Si un ajustador de Progressive inspecciona la casa, podemos asistir si usted lo pide y explicar la construcción. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No representamos a Progressive. El estimado es lo que cuesta la reparación. El pago es decisión de ellos. No somos ajustadores públicos.",
        ],
      },
      {
        eyebrow: "Documentación",
        heading: "Fotos de la casa, no de la defensa.",
        paragraphs: [
          "Fotografíe los cuartos, el techo desde el suelo y la fuente del agua. El registro de fotos está hecho para una casa. Úselo. Conserve las piezas de plomería dañadas. No mande solo una foto del carro y espere que explique un plafón. Si la misma tormenta pegó al carro y a la casa, siguen siendo dos reclamos. Nosotros solo hacemos el edificio. Dos juegos de fotos mantienen el archivo de la casa hablando de la casa.",
          "Nuestras fotos de secado y de reparación se pueden compartir con el reclamo de la propiedad. No deciden el reembolso. Limitar más daño a menudo se espera. Su aseguradora decide si lo reembolsa. Le cobramos a la persona que nos contrata. El estimado es el precio de la construcción. Rotulamos el techo, el agua interior y la protección temporal como trabajos separados para que nadie los confunda con una reparación de vehículo.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Casas y edificios, desde 77082.",
        paragraphs: [
          "Somos una empresa familiar. Trabajamos desde nuestra oficina en el oeste de Houston (77082) y servimos a Houston desde 1993. Secamos y reconstruimos casas, apartamentos y edificios comerciales en Houston, Katy, Sugar Land, The Woodlands, Clear Lake y los vecindarios junto a la oficina. Una póliza de casa de Progressive no cambia la losa ni la humedad. Las casas de losa en Alief y Westchase guardan el agua en el concreto. Las casas de dos pisos en Katy y The Woodlands dejan caer una fuga de arriba a un plafón de abajo.",
          "Llame o envíe un texto al (713) 909-0034 a cualquier hora por una emergencia activa de agua o de tormenta. El horario de oficina es de lunes a sábado, de 8:00 AM a 6:00 PM. No somos Progressive, y esta no es una página de reparación de autos. El viento de la costa hacia Clear Lake abre tapajuntas. El granizo marca la pendiente oeste. Una helada, cuando llega, es la línea del ático. Escribimos la que ocurrió.",
        ],
      },
      {
        eyebrow: "En el lugar",
        heading: "Deje el reclamo de la propiedad en su propio archivo.",
        paragraphs: [
          "Si tanto el carro como la casa fueron golpeados en la misma tormenta, el carro se queda con quien repara carros. Nosotros miramos el techo, las ventanas y los cuartos mojados. Traiga el número de reclamo de la póliza de la propiedad cuando lo tenga. Ordenar los dos archivos es una llamada que usted hace a Progressive. Pregúnteles cuál archivo es la casa. No pedimos el VIN. Pedimos la dirección y si el agua sigue entrando.",
          "Llame al (713) 909-0034 con la dirección. Las casas, los apartamentos y los comercios pueden estar todos en una póliza de propiedad de Progressive. La forma de la póliza la confirma usted. El trabajo de Houston es ordinario para nosotros y específico de la dirección. No mezclamos una defensa abollada con una cumbrera abierta. Progressive puede explicar el archivo del auto. Nosotros explicamos el cuarto mojado, la lona y la reparación, y nada de un vehículo.",
        ],
      },
      {
        eyebrow: "Después de la llamada",
        heading: "Solo el edificio, aunque Progressive sea el nombre en las dos tarjetas.",
        paragraphs: [
          "Esa separación mantiene legible el archivo de propiedad de Progressive. Una casa en Houston y un carro en la entrada no son una sola reparación, aunque haya sido la misma tormenta. Traiga las preguntas del deducible a Progressive. Traiga el plafón abierto, la losa mojada y la ventana rota a nosotros. Podemos poner lona, cerrar con madera, secar y reconstruir. Una pérdida de propiedad se queda como pérdida de propiedad.",
          "Trabajamos desde nuestra oficina en el oeste de Houston (77082). Somos una empresa familiar y servimos a Houston desde 1993. Llame o envíe un texto al (713) 909-0034. Emergencias a cualquier hora. No somos Progressive, y nada en esta página es una oferta de ellos. Si solo tiene el número que usa para el carro, pida el camino de la propiedad antes de mezclar los archivos. El menú del teléfono es de ellos. El techo, si se puede pisar, es el nuestro el día de la visita. Las fotos de la casa se toman el mismo día, antes de que una limpieza borre la fuente.",
        ],
      },
    ],
    [
      {
        q: "¿Esto es un reclamo de auto?",
        a: "No. Esta página es para una casa, un apartamento o un edificio comercial asegurado por Progressive. Un carro dañado es otra póliza y otro taller. No pedimos el VIN.",
      },
      {
        q: "¿Qué empresa de Progressive escribe la póliza de casa?",
        a: "Su página de declaraciones nombra la empresa. No adivinamos, y no estamos afiliados a ninguna de ellas. No somos un contratista de Progressive.",
      },
      {
        q: "¿Puedo usar mi deducible del auto en el techo?",
        a: "Esa pregunta es para Progressive y para la póliza de la propiedad. No vamos a decir que sí. Un deducible de carro no es un número que pongamos en un techo.",
      },
      {
        q: "¿Reparan carros y casas?",
        a: "Casas y edificios. No vehículos. Llame al (713) 909-0034 por daño de tormenta o de agua en una propiedad. Si la misma tormenta pegó a los dos, haga dos juegos de fotos.",
      },
      {
        q: "¿Trabajan con clientes de Progressive?",
        a: "Sí, cuando la póliza es de la propiedad. Elite Restorations es un contratista independiente y no estamos afiliados a Progressive. Usted nos contrata. Progressive decide el reclamo.",
      },
      {
        q: "¿Prometen el pago?",
        a: "Tomamos fotos, limitamos más daño, escribimos un estimado y nos reunimos con el ajustador si usted quiere que estemos. Progressive decide la cobertura. Revise la póliza de la propiedad, no la del carro. El estimado es el precio de la construcción.",
      },
      {
        q: "¿La inundación de la calle es la póliza de casa o la del auto?",
        a: "A menudo no es ninguna de las dos. El agua que sube puede pedir una póliza de inundación. Separamos esa causa del viento, del granizo y de una rotura de tubo. Pregúntele a Progressive qué tiene usted de verdad.",
      },
      {
        q: "¿Huracán, granizo, viento o tornado en la casa?",
        a: "Documentamos el daño del edificio, lo protegemos cuando es seguro, lo secamos y estimamos las reparaciones. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No damos consejo legal. El carro se queda fuera de nuestro alcance.",
      },
      {
        q: "¿Qué fotos van en el archivo de la casa?",
        a: "Cuartos, el techo desde el suelo y la fuente del agua. No una sola foto de la defensa. El registro de fotos está en este sitio y está hecho para una casa. Las fotos no crean cobertura.",
      },
      {
        q: "¿Se reúnen con el ajustador de la propiedad?",
        a: "Sí, si usted lo pide. Explicamos la construcción: techo, agua interior y protección temporal, en líneas separadas. Progressive maneja el pago. No representamos a Progressive.",
      },
      {
        q: "¿Casas, apartamentos y comercios, no talleres?",
        a: "Sí para la propiedad. Llame al (713) 909-0034 a cualquier hora por una emergencia activa de tormenta o de agua. Diga la dirección y si alguien está en agua cerca de la electricidad. No pregunte por el carro.",
      },
    ],
  ),
];

export function getEsInsurer(slug: string) {
  return esInsurers.find((page) => page.slug === slug);
}

function pageBlob(page: EsInsurerPage) {
  return [
    page.metaTitle,
    page.description,
    page.lede,
    ...page.sections.flatMap((section) => [section.eyebrow, section.heading, ...section.paragraphs]),
    ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
  ].join("\n");
}

function pageWords(page: EsInsurerPage) {
  return wordCount([
    page.lede,
    ...page.sections.flatMap((section) => [section.eyebrow, section.heading, ...section.paragraphs]),
    ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
  ]);
}

const allowedNegotiate =
  "Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador.";

for (const page of esInsurers) {
  if (!titleFits(page.metaTitle)) {
    throw new Error(`${page.slug} metaTitle does not fit: ${page.metaTitle}`);
  }
  if (page.description.length > 155) {
    throw new Error(`${page.slug} description is ${page.description.length} characters`);
  }
  const words = pageWords(page);
  if (words < 900) {
    throw new Error(`${page.slug} is ${words} Spanish words, under 900`);
  }
  const blob = pageBlob(page);
  if (!blob.includes(office)) {
    throw new Error(`${page.slug} is missing the office phrase`);
  }
  if (!blob.includes(`no estamos afiliados a ${page.name}`)) {
    throw new Error(`${page.slug} is missing the affiliation sentence`);
  }
  if (!blob.includes(`No somos un contratista de ${page.name}.`)) {
    throw new Error(`${page.slug} is missing the contractor sentence`);
  }
  if (!blob.includes("No somos ajustadores públicos.")) {
    throw new Error(`${page.slug} is missing the public-adjuster sentence`);
  }
  if (!blob.includes(allowedNegotiate)) {
    throw new Error(`${page.slug} is missing the allowed adjuster sentence`);
  }
  if (!blob.includes(phone)) {
    throw new Error(`${page.slug} is missing the phone number`);
  }
  if (!blob.includes("empresa familiar") || !blob.includes("servimos a Houston desde 1993")) {
    throw new Error(`${page.slug} is missing the approved company facts`);
  }
  if (/estimado gratis|free estimate|281-748-0227|Elite Restorations Inc/i.test(blob)) {
    throw new Error(`${page.slug} uses a forbidden claim`);
  }
  assertCopyAllowed(page.path, blob);
}

if (esInsurers.length !== 8) {
  throw new Error(`expected 8 Spanish insurer pages, got ${esInsurers.length}`);
}
