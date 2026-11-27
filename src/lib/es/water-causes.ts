import { assertCopyAllowed } from '@/lib/copy-guards';
import { titleFits } from '@/lib/seo';
import { wordCount } from '@/lib/words';

export type EsWaterCause = {
  slug: string;
  path: string;
  englishPath: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  title: readonly string[];
  lede: string;
  sections: readonly {
    eyebrow: string;
    heading: string;
    paragraphs: readonly string[];
    points?: readonly { title: string; body: string }[];
  }[];
  faqs: readonly { q: string; a: string }[];
};

const phone = '(713) 909-0034';
const office = 'nuestra oficina en el oeste de Houston (77082)';
const notAdjusters = 'No somos ajustadores públicos.';
const claimWork =
  'Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador.';

function page(
  slug: string,
  input: Omit<EsWaterCause, 'slug' | 'path' | 'englishPath'>,
): EsWaterCause {
  return {
    slug,
    path: `/es/${slug}`,
    englishPath: `/${slug}`,
    ...input,
  };
}

export const esWaterCauses: readonly EsWaterCause[] = [
  page('burst-frozen-pipe-water-damage-houston', {
    metaTitle: 'Daño por tubo reventado en Houston',
    description:
      'Un tubo congelado o reventado en Houston moja la casa, el apartamento o el local. Secamos y documentamos el reclamo. Llame al (713) 909-0034.',
    eyebrow: 'Tubos congelados y reventados',
    title: ['Tubo reventado', 'en Houston.'],
    lede:
      'Una helada fuerte es rara en Houston, así que los tubos que fallan suelen ser los que nadie revisó: una línea en el ático, un tubo en una pared exterior o una llave de jardín. Si el agua ya salió, párela, fotografíela y llame.',
    sections: [
      {
        eyebrow: 'La primera hora',
        heading: 'Pare el agua antes de salvar el piso.',
        paragraphs: [
          `Si un tubo está chorreando, o un plafón gotea por una línea que no puede ver, cierre la llave principal. En la mayoría de las casas de Houston está en el medidor o donde entra la línea. Gírela hacia la derecha. Un solo aparato puede tener su propia llave. Úsela solo cuando esté seguro de que la rotura es de ese suministro. En un edificio de apartamentos o en un local, las líneas no siempre están marcadas como el medidor de una casa. Si no encuentra el cierre, llame al ${phone} y dígale al administrador, o a quien esté en el edificio, que no entre a los cuartos mojados.`,
          'Con la principal cerrada, abra una llave en el piso más bajo, caliente y fría si no sabe cuál línea falló. Si el tubo está congelado y todavía no reventó, una llave abierta le da salida al deshielo. Una secadora de pelo en un tramo que pueda alcanzar, sin meterla al agua, basta. Nunca use un soplete ni una flama abierta. Si el suministro ya está cerrado, apague el calentador para que no caliente un tanque vacío. Un calentador puede fallar en la misma helada si sigue trabajando sin agua.',
        ],
        points: [
          {
            title: 'No se meta al agua',
            body: 'Si el agua está cerca de contactos, aparatos o el tablero eléctrico, salga del cuarto. No la cruce para llegar a una llave de la que no está seguro.',
          },
          {
            title: 'Tubos en el ático',
            body: 'En muchas casas de Houston las líneas de agua pasan por el ático. Cuando una se congela, lo que se ve es la mancha en el plafón, no el tubo.',
          },
          {
            title: 'Llaves de jardín',
            body: 'Una llave de jardín que se quedó con presión puede partirse en una helada. La fuga puede estar dentro del muro, no en la manija que se ve afuera.',
          },
        ],
      },
      {
        eyebrow: 'Por dónde se va',
        heading: 'Losas, plafones y más de una unidad.',
        paragraphs: [
          `La mayoría de las casas alrededor de ${office} están sobre losa de concreto. El agua de un tubo reventado no cae a un hueco bajo la casa. Corre por la losa, se mete en la base de la tablaroca y empapa el acolchado bajo los pisos. Una rotura en el segundo piso o en el ático cae al plafón y puede cruzar cuartos antes de gotear. Seguimos ese camino con medidores. La cámara térmica ayuda cuando la mancha es más chica que el área mojada, y eso es lo común.`,
          'En un edificio de apartamentos la misma rotura puede mojar la unidad de abajo y el pasillo. Anotamos cada unidad que de verdad está mojada. Un plafón con una mancha no es razón para secar toda la torre. En un local se suma el plafón de placas, un clóset de servidores o una bodega bajo la línea. Díganos qué hay debajo. La temporada de huracanes es otra época del año. Una helada fuerte en Houston es cosa de invierno, a menudo una o dos noches, y las llamadas llegan la mañana en que los tubos se descongelan.',
        ],
        points: [
          {
            title: 'Aislamiento mojado',
            body: 'El aislamiento de un plafón no se seca solo porque dejó de gotear. Hay que sacarlo o secarlo en su lugar. Le decimos cuál de las dos.',
          },
          {
            title: 'El piso guarda el agua',
            body: 'El vinil y el laminado pueden atrapar agua sobre el concreto. La madera se hincha. El acolchado de la alfombra se queda mojado. El piso es parte del secado, y lo hablamos desde el principio.',
          },
          {
            title: 'La unidad de abajo',
            body: 'Si oye agua y usted no está en el último piso, el tubo roto puede estar en la unidad de arriba. Llame de todos modos. Ese plafón igual hay que secarlo.',
          },
        ],
      },
      {
        eyebrow: 'El secado',
        heading: 'Saque el agua, después seque, después repare.',
        paragraphs: [
          'Toallas y un ventilador de la casa alcanzan para un charco en piso duro que usted atrapó de inmediato. Llame para el secado cuando el agua ya entró al edificio: la cavidad del muro, el plafón, el borde de la losa o debajo de un piso. Sacamos el agua estancada, ponemos ventiladores de secado y deshumidificadores, y medimos la humedad hasta que las lecturas digan que se puede cerrar el muro. La humedad de Houston es la razón del deshumidificador. El aire de afuera muchas veces está demasiado mojado para terminar el trabajo.',
          'La reparación empieza cuando la estructura está seca. La tablaroca, el aislamiento, el piso y los gabinetes que se hincharon son la reconstrucción. Ese trabajo lo podemos hacer. Esperamos para colgar tablaroca nueva hasta que la cavidad esté seca, aunque alguien quiera que la unidad se vea lista para una visita. Las casas, los apartamentos y los locales siguen el mismo orden. Lo que cambia es la entrada, y quién puede aprobar que se abra un muro.',
        ],
        points: [
          {
            title: 'La misma cuadrilla',
            body: 'El secado y la reconstrucción pueden quedarse con Elite Restorations, empresa familiar en Houston desde 1993.',
          },
          {
            title: 'Medimos antes de cerrar',
            body: 'Una pintura que se ve seca no quiere decir que el muro esté seco. Un medidor de humedad nos dice cuándo se puede cerrar.',
          },
          {
            title: 'Los muebles van aparte',
            body: 'Un colchón empapado o un sofá mojado es otro trabajo, distinto del muro y del piso. Le decimos qué piezas estamos secando.',
          },
        ],
      },
      {
        eyebrow: 'El reclamo',
        heading: 'Rotura súbita o una fuga que siguió.',
        paragraphs: [
          'En muchas pólizas de propietario y de vivienda en Texas, una descarga súbita y accidental no se lee igual que una filtración o una fuga que siguió con el tiempo. Esas frases están en la póliza. No son iguales de una aseguradora a otra, y una póliza de inundación es otro contrato, distinto de la póliza de la casa. Revise la suya o pregúntele a su aseguradora. Una línea del ático que reventó la describimos como la encontramos. Una fuga de mucho tiempo sigue siendo una fuga de mucho tiempo en nuestras notas.',
          `Fotografiamos el daño y hacemos el trabajo que usted contrata. Su aseguradora decide la cobertura. ${notAdjusters} No damos consejo legal. Fotografiamos la rotura si se ve, los cuartos y la humedad, y podemos estar en la casa cuando llegue el ajustador. ${claimWork} El estimado de la reparación es el precio de la construcción. No es la cantidad que va a pagar el reclamo. Si quiere un registro cuarto por cuarto antes de tirar nada, use el registro de fotos. La guía de humedad de la losa es la lectura más cercana cuando el agua se quedó en el concreto después de que falló una línea de suministro.`,
        ],
        points: [
          {
            title: 'Guarde la pieza rota',
            body: 'Si puede hacerlo con seguridad, guarde el tubo partido o la conexión. No lo tire antes de que alguien lo fotografíe.',
          },
          {
            title: 'Llame a su aseguradora',
            body: 'Llame a la compañía que está en la póliza y anote el número de reclamo. Cualquier plazo está en su póliza, así que pregúntele a su aseguradora en lugar de adivinar.',
          },
          {
            title: 'Detener más daño',
            body: 'Cerrar el agua y empezar el secado evita que la pérdida se extienda. Si esta póliza le reembolsa ese trabajo lo decide su aseguradora.',
          },
        ],
      },
      {
        eyebrow: 'Houston',
        heading: 'Por qué una helada aquí sorprende a la plomería.',
        paragraphs: [
          'Las casas en Houston, Katy, Sugar Land, The Woodlands y Clear Lake están hechas para el calor. Las líneas del ático y de las paredes exteriores a menudo van sin aislamiento, porque una helada fuerte no es la semana normal. Cuando llega, esas son las líneas que se parten, muchas veces mientras la gente duerme o está fuera de la ciudad. Los complejos de apartamentos con líneas expuestas en los pasillos abiertos, y los locales con líneas en la azotea o por fuera, fallan la misma noche. El deshielo de la mañana es cuando se abre el plafón.',
          `En el ${phone} contestamos, lunes a sábado, de 8 a.m. a 6 p.m., si hay una emergencia de agua activa en una casa, un conjunto de apartamentos o un local comercial. En ${office} el horario es de lunes a sábado, de 8:00 a. m. a 6:00 p. m., para una visita agendada. Puede enviar un texto a ese número. Elite Restorations es una empresa familiar aquí desde 1993. Secamos y reparamos el edificio para usted, no para su aseguradora. No dependemos de ninguna aseguradora.`,
        ],
        points: [
          {
            title: 'Revise al derretirse el hielo',
            body: 'Un tubo congelado puede quedarse cerrado hasta que el hielo se derrite, y entonces soltarse. Si la helada acaba de pasar, recorra la casa y mire los plafones antes de irse.',
          },
          {
            title: 'Quite las mangueras',
            body: 'Desconecte las mangueras de jardín antes de una helada. Una manguera dejada en la llave de afuera es una rotura que vemos en cada frente frío.',
          },
          {
            title: 'Helada o huracán',
            body: 'Una helada es un problema de plomería. Un huracán suele ser el techo y el viento. Anotamos cuál de los dos pasó de verdad.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué hago primero si se revienta un tubo en Houston?',
        a: `Cierre la llave principal si puede hacerlo con seguridad, abra una llave, no se meta a agua cerca de la electricidad y llame al ${phone}. Fotografíe los cuartos antes de tirar nada.`,
      },
      {
        q: '¿Debo descongelar un tubo yo mismo?',
        a: 'Solo un tramo que pueda alcanzar, con una secadora de pelo, nunca con flama. Si el tubo está en el ático o detrás de un muro, cerrar el agua y llamar es lo más seguro.',
      },
      {
        q: '¿Secan casas, apartamentos y locales?',
        a: 'Sí. Los pasos son los mismos. En un apartamento o un local, lo que cambia es la entrada y quién puede aprobar el trabajo.',
      },
      {
        q: '¿Cómo secan una losa después de un tubo reventado?',
        a: 'Sacamos el agua estancada, medimos la losa y los muros, y dejamos ventiladores de secado y deshumidificadores. La guía de humedad de la losa explica por qué el concreto puede seguir mojado cuando el charco ya no está.',
      },
      {
        q: '¿Un tubo reventado es lo mismo que un reclamo de inundación?',
        a: 'Casi nunca. El agua que sube de la calle suele ser una póliza de inundación. Un suministro que reventó es otro tipo de pérdida. Revise sus pólizas. Su aseguradora decide cuál aplica.',
      },
      {
        q: '¿Esto fue una rotura súbita o una fuga de mucho tiempo?',
        a: 'Describimos lo que se puede ver, incluido si el daño se ve reciente. El texto de la póliza lo lee usted. La etiqueta la deja su aseguradora. No podemos prometer el pago.',
      },
      {
        q: '¿Pueden estar cuando llegue el ajustador?',
        a: 'Sí, si nos quiere en la casa. Recorremos las áreas mojadas y las reparaciones. Su aseguradora maneja el pago. No damos consejo legal.',
      },
      {
        q: '¿Pueden reconstruir la tablaroca y los pisos?',
        a: 'Sí, después de que las lecturas digan que la estructura está seca. El secado y la reconstrucción pueden quedarse con una sola empresa.',
      },
      {
        q: '¿Cuánto suele costar esto?',
        a: 'Una fuga contenida y un plafón que se abrió en toda la casa no son el mismo número. Como un rango para planear, no una cotización, secar un cuarto mojado suele quedar en los miles bajos, y una fuga amplia cuesta más. El precio sale de lo que medimos.',
      },
      {
        q: '¿En qué horario atienden?',
        a: `Llame al ${phone}, lunes a sábado, de 8 a.m. a 6 p.m. Las visitas agendadas usan ese mismo horario. Puede enviar un texto al mismo número.`,
      },
      {
        q: '¿Dónde están?',
        a: `Trabajamos desde ${office}. Empresa familiar desde 1993. Desde esa oficina agendamos el área de Houston, incluidos Westchase, Katy, Sugar Land y The Woodlands.`,
      },
      {
        q: '¿Tengo que estar en la casa para el secado de un tubo reventado?',
        a: 'Alguien tiene que abrirnos y enseñarnos por dónde salió el agua. Si usted está fuera de la ciudad, una persona de su confianza puede recibirnos si puede aprobar el trabajo. No entramos a una casa porque un vecino tenga la llave, a menos que usted lo haya dicho.',
      },
      {
        q: '¿Qué tan pronto pueden llegar después de que se parte un tubo?',
        a: `Llame al ${phone}, lunes a sábado, de 8 a.m. a 6 p.m., si el agua sigue corriendo. Cierre la principal si puede hacerlo con seguridad. Le decimos el siguiente paso. No prometemos un tiempo de camino. La mañana después de una helada fuerte, mucha gente en Houston llama a la vez. Llamar igual lo pone en la lista.`,
      },
      {
        q: '¿Qué le hizo a los tubos de Houston la helada de febrero de 2021?',
        a: 'Esa helada, más o menos del 11 al 19 de febrero de 2021, dejó sin luz y sin calefacción. Se partieron líneas del ático, tubos en paredes exteriores y llaves de jardín, muchas veces cuando el hielo se derritió. Las casas de aquí están hechas para el calor, así que esas líneas casi nunca iban forradas. Una helada así puede volver a pasar. Secamos y reparamos el edificio. Su aseguradora decide el reclamo.',
      },
      {
        q: '¿Debo dejar goteando las llaves antes de un frente frío?',
        a: 'Si anuncian una helada fuerte y usted va a estar en casa, el consejo común es dejar goteando las llaves de agua caliente y fría, y abrir las puertas de los gabinetes en las paredes exteriores. Si se va a ir, lo más firme es cerrar el agua y drenar las líneas. Pregúntele a un plomero si no está seguro. Nosotros somos el secado y la reparación después de una rotura, no un reemplazo de esa preparación.',
      },
      {
        q: '¿El seguro cubre un tubo congelado si no había luz?',
        a: 'Muchas pólizas hablan de un tubo congelado de otra manera cuando la casa no tenía calefacción o el agua no se cerró. Los cortes de febrero de 2021 estuvieron fuera del control de mucha gente. Si su póliza paga lo decide su aseguradora, según el texto de la suya. No podemos prometerlo. Documentamos la rotura y secamos lo que usted contrata.',
      },
      {
        q: '¿El deducible de un tubo reventado es el mismo que el de huracán?',
        a: 'Muchas veces, no. En muchas pólizas de Texas el deducible de viento y granizo es un porcentaje del valor asegurado. Una rotura de plomería suele usar otro deducible, de cantidad fija. El suyo está en la página de declaraciones. No lo tenemos, y no lo quitamos. Pregúntele a su agente cuál aplica a un tubo.',
      },
      {
        q: '¿Quién debe llamar si esto es un apartamento?',
        a: 'La persona que puede aprobar el trabajo, y quien está parado en el agua. Avísele al administrador. Un tubo en una unidad de arriba a menudo moja el plafón de abajo. Anotamos las unidades que de verdad están mojadas. No suponemos todo el edificio.',
      },
      {
        q: '¿Cuánto tarda el secado después de una rotura en el ático?',
        a: 'Depende de hasta dónde corrió el agua en los plafones, los muros y la losa. La humedad de Houston no deja que una casa cerrada se seque sola. Medimos y dejamos los ventiladores de secado y los deshumidificadores hasta que las lecturas aguanten la reparación. Una mancha que se ve seca puede seguir mojada en el aislamiento.',
      },
    ],
  }),
  page('water-heater-leak-damage-houston', {
    metaTitle: 'Fuga de calentador en Houston',
    description:
      'Una fuga de calentador en Houston moja el clóset, el piso o el plafón de abajo. Secamos y documentamos el reclamo. Llame al (713) 909-0034.',
    eyebrow: 'Fugas de calentador',
    title: ['Fuga de calentador', 'en Houston.'],
    lede:
      'Una fuga de calentador en Houston suele empezar en un clóset, un garaje o un clóset de arriba, y de ahí corre por el piso de concreto o al plafón de abajo. Cierre el agua. Apague la corriente o el gas solo si sabe cómo. Tome fotos del clóset antes de trapear.',
    sections: [
      {
        eyebrow: 'La primera hora',
        heading: 'La válvula, la corriente y la charola del piso.',
        paragraphs: [
          `Arriba de la mayoría de los tanques, la entrada de agua fría tiene una llave. Gírela hacia la derecha hasta que pare. Abra una llave de agua caliente para que baje la presión. Si esa llave está trabada por la corrosión, use la principal. Un calentador eléctrico necesita la pastilla apagada para que el tanque no siga calentando mientras se vacía. En un calentador de gas, cierre la válvula del gas si sabe cuál es y gira sin forzarla. Si huele a gas, salga del clóset y de la casa, y llame a la compañía de gas y al ${phone}. Nunca busque la fuga con una flama.`,
          'La charola bajo el calentador está para atrapar un goteo y mandarlo a un drenaje. En muchos clósets de Houston ese drenaje nunca se conectó, o se tapa, y la charola se vuelve un charco que se desborda sobre la losa. Fotografíe la charola, las conexiones y el camino por el piso antes de pasarle la aspiradora de agua. Los calentadores de apartamento en un clóset alineado con el de abajo pueden mojar la unidad de abajo, aunque la charola se vea vacía cuando usted abre la puerta.',
        ],
        points: [
          {
            title: 'Deje el agua cerrada',
            body: 'Volver a abrir el agua para ver si la fuga paró puede llenar el plafón otra vez. Déjela cerrada hasta que alguien haya visto los tubos de arriba del tanque.',
          },
          {
            title: 'Viejo o nuevo, vea la pieza',
            body: 'Un tanque viejo puede fallar de golpe. Un tanque nuevo puede gotear en una línea de suministro. Decimos qué pieza falló. Cambiar el tanque no es el mismo trabajo que secar el cuarto.',
          },
          {
            title: 'Calentadores en un negocio',
            body: 'Un calentador en un cuarto de descanso o en un cuarto de máquinas se cierra igual. Díganos qué hay guardado en el piso para saber hasta dónde llegó el agua.',
          },
        ],
      },
      {
        eyebrow: 'El camino',
        heading: 'Clósets, garajes y el plafón de abajo.',
        paragraphs: [
          'Los calentadores de la planta baja en las casas de Houston a menudo están en un garaje o en un clóset interior, sobre la losa de concreto. El agua corre al punto más bajo, que puede ser el pasillo o una recámara, y de ahí se mete en la tablaroca y bajo el vinil o la madera. La mayoría de estas casas no tienen un hueco bajo la casa donde el agua pueda caer. Los calentadores del segundo piso, comunes en algunos planos de dos pisos en Katy, Sugar Land y The Woodlands, tiran el agua al plafón de la cocina o de la sala. Abrimos un muro o un plafón solo donde el medidor de humedad dice que sigue mojado.',
          'Un calentador de apartamento en un clóset de servicio puede mojar el pasillo y al vecino de abajo. El administrador debe decirnos el número de unidad y si el agua está bajando por más de un piso. Un plafón mojado no es automáticamente una gotera de techo. Si el origen es el clóset del calentador de arriba, eso es lo que anotamos.',
        ],
        points: [
          {
            title: 'El agua viaja por el piso',
            body: 'El agua sobre una losa de concreto no se queda en un charco junto al calentador. Puede correr de lado y mojar un muro en el cuarto de al lado.',
          },
          {
            title: 'Válvula de alivio o tanque abierto',
            body: 'Una válvula de alivio que lleva meses goteando no es el mismo evento que un tanque que se abrió esta mañana. Díganos cuál de los dos está viendo.',
          },
          {
            title: 'El piso esconde el agua',
            body: 'El acolchado, el vinil y el laminado pueden guardar agua contra el concreto. Miramos bajo el piso en la puerta del clóset, no solo la mancha que se ve.',
          },
        ],
      },
      {
        eyebrow: 'El secado',
        heading: 'Seque el edificio. Después se habla de un tanque nuevo.',
        paragraphs: [
          'Sacamos lo que está estancado, medimos el clóset y los cuartos a los que llegó, y ponemos ventiladores de secado y deshumidificadores. La humedad de Houston hace que un ventilador en la puerta sea una forma lenta de secar un muro. Una charola que se desbordó no es el mismo trabajo que un tanque que se abrió. El calentador mismo puede necesitar cambio. Ese cambio es plomería. La tablaroca y el piso son la reparación del edificio. Podemos coordinar las dos cosas, y separamos los precios para que un tanque nuevo y una reparación de plafón sigan marcados como dos trabajos.',
          `Un plomero con licencia debe volver a encender un calentador de gas cuando usted quiera agua caliente otra vez. El gas se lo dejamos a ellos. Nuestro trabajo es el agua que salió del calentador y los acabados que echó a perder. Atendemos casas, apartamentos y clósets chicos de locales comerciales. Llame al ${phone}, lunes a sábado, de 8 a.m. a 6 p.m., si el agua sigue corriendo. En ${office} el horario es de lunes a sábado, de 8:00 a. m. a 6:00 p. m.`,
        ],
        points: [
          {
            title: 'Una empresa para los dos pasos',
            body: 'Elite Restorations es una empresa familiar en Houston desde 1993. Secar los cuartos y reparar la tablaroca y los pisos puede quedarse con la misma cuadrilla.',
          },
          {
            title: 'No cierre el muro temprano',
            body: 'Un clóset puede oler bien y seguir mojado donde el muro se junta con el piso. Lo revisamos con un medidor de humedad antes de cerrarlo.',
          },
          {
            title: 'Fotografíe lo que estaba guardado',
            body: 'Las cajas de un garaje o un clóset se olvidan fácil. Tómele fotos antes de tirarlas.',
          },
        ],
      },
      {
        eyebrow: 'El reclamo',
        heading: 'Un tanque que falló de golpe no es una mancha lenta.',
        paragraphs: [
          'En muchas pólizas, una rotura súbita no se lee igual que una fuga que siguió o un tanque que se gastó. Un tanque que se vacía en una hora y una línea de suministro con costra que lleva tiempo goteando son hechos que podemos fotografiar. Su aseguradora dice cuál frase de su póliza aplica. Revise la póliza. El agua de la calle es otro contrato. Si el bayou subió, lo anotamos como inundación, no como un calentador.',
          `Fotografiamos el daño y hacemos el trabajo que usted contrata. Su aseguradora decide la cobertura. ${notAdjusters} No damos consejo legal. Podemos estar con el ajustador en el clóset, enseñarle el camino y darle un estimado de la reparación del edificio. ${claimWork} El estimado no es el pago del reclamo. El registro de fotos sirve para los cuartos. La página de humedad de la losa es la que hay que leer si el concreto se quedó mojado después de trapear el clóset.`,
        ],
        points: [
          {
            title: 'Fotografíe el calentador',
            body: 'Tome una foto abierta del clóset, una cerca de los tubos de arriba del tanque, una de la charola y una de cualquier plafón de abajo.',
          },
          {
            title: 'Guarde la pieza que falló',
            body: 'Si falló una línea de suministro o un conector corto arriba del tanque, no lo tire hasta que esté en una foto.',
          },
          {
            title: 'Detener más daño',
            body: 'Cerrar la llave y empezar el secado evita que la pérdida se extienda. Si su póliza paga ese trabajo lo decide su aseguradora.',
          },
        ],
      },
      {
        eyebrow: 'Houston',
        heading: 'El calor, los clósets y el sarro del tanque.',
        paragraphs: [
          `Los calentadores de aquí trabajan duro. El agua que entra está tibia buena parte del año, los tanques se sientan en garajes calientes, y una helada fuerte es la semana que todo el mundo recuerda porque tubos y calentadores fallan juntos. El sedimento y las válvulas falladas son cosa de todos los días. No hay un solo número de cuánto dura un tanque. Vemos el que goteó. Los vecindarios donde vemos esto incluyen Houston, Westchase, Alief, Katy, Sugar Land, Memorial y The Woodlands, desde ${office}.`,
          `Si la fuga está activa, llame o envíe un texto al ${phone}. Empresa familiar desde 1993. Somos independientes de cada aseguradora. Para el proceso más amplio de daño por agua, empiece en la página de daño por agua. Si una helada también partió una línea, la página del tubo reventado es la otra mitad de esa semana.`,
        ],
        points: [
          {
            title: 'Calentadores en el garaje',
            body: 'Cuando gotea un calentador de garaje, el agua puede correr bajo la puerta hacia la casa. Revise el piso, los zoclos y la tablaroca del lado de la casa, no solo la charola.',
          },
          {
            title: 'Clósets de arriba',
            body: 'Si el calentador está en el segundo piso, mire el plafón del cuarto de abajo antes de decidir que el daño se quedó en el clóset.',
          },
          {
            title: 'Después de una helada',
            body: 'Un calentador que usted drenó, o que dejó encendido sin agua en el tanque, necesita otra reparación que un tanque que simplemente goteó. Díganos cuál de los dos pasó.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué cierro primero?',
        a: `La llave de agua fría del calentador si gira, y si no, la principal. Baje la pastilla si es eléctrico. Si huele a gas, salga y llame a la compañía y al ${phone}.`,
      },
      {
        q: '¿La charola debe tener agua?',
        a: 'Una charola puede atrapar un goteo. Una charola llena, o un drenaje que nunca se conectó, quiere decir que el agua se va al piso. Fotografíela.',
      },
      {
        q: '¿Ustedes cambian el calentador?',
        a: 'Secamos y reconstruimos el edificio. Un tanque nuevo es plomería, y ese precio lo separamos. Un plomero con licencia vuelve a encender un calentador de gas.',
      },
      {
        q: '¿Esto va a mojar la unidad de abajo?',
        a: 'Puede. Avísele al administrador y llámenos. Anotamos cada plafón que de verdad está mojado, en lugar de suponer toda la torre.',
      },
      {
        q: '¿Fue una falla súbita o una fuga de mucho tiempo?',
        a: 'Describimos las conexiones, el tanque y hasta dónde llegó el agua. La línea la traza su póliza, así que revísela. No podemos prometer que el reclamo pague.',
      },
      {
        q: '¿Esto es una inundación?',
        a: 'Una salida de calentador no es agua de inundación que sube. Si también entró agua de la calle, dígalo. Pueden ser pólizas distintas.',
      },
      {
        q: '¿Pueden estar con el ajustador?',
        a: `Sí. Enseñamos el clóset y el camino. ${notAdjusters} Su aseguradora decide el pago.`,
      },
      {
        q: '¿Cómo secan la losa?',
        a: 'Medimos el concreto, sacamos el agua estancada y dejamos ventiladores de secado y deshumidificadores. Lea la guía de humedad de la losa si el clóset se veía seco y el concreto seguía mojado.',
      },
      {
        q: '¿Cuánto suele costar el secado?',
        a: 'Un clóset y un cuarto de al lado suelen quedar en los miles bajos. Un calentador de segundo piso que pasó por un plafón cuesta más. Eso es un rango para planear, no una cotización.',
      },
      {
        q: '¿Trabajan en locales comerciales?',
        a: `Sí. Clósets de cuartos de descanso y de máquinas, además de apartamentos y casas. Llame al ${phone}, lunes a sábado, de 8 a.m. a 6 p.m., si el agua sigue corriendo.`,
      },
      {
        q: '¿Dónde está la oficina?',
        a: `En ${office}. Empresa familiar desde 1993. De lunes a sábado, de 8:00 a. m. a 6:00 p. m., para visitas agendadas. También puede enviar un texto al número de la oficina.`,
      },
      {
        q: '¿Tengo que estar en casa si el calentador está goteando?',
        a: `Sí, o alguien que pueda cerrar la llave y dejarnos entrar al clóset y a los cuartos de abajo. Si huele a gas, salga y llame a la compañía y al ${phone}. No busque la llave si huele a gas. Un calentador eléctrico igual necesita la pastilla apagada.`,
      },
      {
        q: '¿Qué tan pronto pueden venir por un calentador que se vació?',
        a: `Llame al ${phone} si el agua se está extendiendo. Contestamos, lunes a sábado, de 8 a.m. a 6 p.m., en una emergencia de agua activa y le decimos el siguiente paso seguro. Un calentador de garaje que ya se vació al patio es urgente si también corrió hacia la casa. No prometemos en cuántos minutos llegamos.`,
      },
      {
        q: '¿En Houston es distinto un calentador de ático y uno de garaje?',
        a: 'Sí. Un ático o un clóset de arriba tira el agua por el plafón de abajo. Un calentador de garaje puede correr bajo la puerta hacia la casa y parecer un charco chico en la charola. Revise los zoclos del lado de la casa. Las heladas fuertes pegan a calentadores y tubos en la misma semana.',
      },
      {
        q: '¿Cambio el tanque o solo seco la casa?',
        a: 'Son precios separados. Secamos y reconstruimos el edificio. Un tanque nuevo es plomería. Un plomero con licencia vuelve a encender un calentador de gas. No metemos el tanque en el número de la tablaroca esperando que no se dé cuenta. La edad sola no nos hace decir que el tanque ya no sirve. Vemos el que goteó.',
      },
      {
        q: '¿Este deducible es el de viento?',
        a: 'Casi nunca una salida de calentador es un reclamo de viento. El deducible de la página de declaraciones para este tipo de pérdida es el que hay que preguntarle a su agente. No lo quitamos. El agua de la calle es otra póliza si eso también pasó. Dígalo si pasaron las dos cosas.',
      },
      {
        q: '¿Puedo quedarme en la casa?',
        a: 'Si el agua se quedó en el clóset y la corriente está segura, muchas veces sí. Si el plafón de abajo se está venciendo, o el agua llegó a los contactos, no entre a esos cuartos. Decimos cuáles cuartos estamos secando. El resto de la casa muchas veces puede seguir en uso.',
      },
      {
        q: '¿La helada de 2021 también echó a perder calentadores?',
        a: 'Muchos calentadores fallaron la misma semana que los tubos, incluidos tanques que se quedaron encendidos sin agua. Esa es otra reparación, distinta de un tanque que se oxidó en agosto. Díganos cuál de las dos pasó. La cobertura la decide su aseguradora. El edificio lo secamos de las dos formas.',
      },
      {
        q: '¿Cuánto tardan en secar el clóset y el plafón?',
        a: 'Un clóset y un cuarto de al lado son un trabajo más chico que un calentador de segundo piso a través de un plafón. La losa puede seguir mojada cuando la charola ya se ve vacía. Medimos. El equipo sale cuando las lecturas lo aguantan, no cuando el charco desapareció. Como un rango para planear, no una cotización, un clóset contenido suele quedar en los miles bajos.',
      },
    ],
  }),
  page('dishwasher-leak-water-damage-houston', {
    metaTitle: 'Daño de lavavajillas en Houston',
    description:
      'Una fuga de lavavajillas en Houston corre bajo los gabinetes y la losa. Secamos la cocina y documentamos el daño. Llame al (713) 909-0034.',
    eyebrow: 'Fugas de lavavajillas',
    title: ['Fuga de lavavajillas', 'en Houston.'],
    lede:
      'Una fuga de lavavajillas casi nunca se queda en el lavavajillas. Corre bajo los gabinetes, se mete al zoclo y cruza la losa de Houston antes de que alguien abra la puerta y vea el charco. La cara del gabinete puede seguir viéndose bien.',
    sections: [
      {
        eyebrow: 'La primera hora',
        heading: 'Pare el ciclo y el suministro bajo el fregadero.',
        paragraphs: [
          `Apague el lavavajillas. Si sigue llenándose, la llave que importa es la de bajo el fregadero. Suele estar en el agua caliente, junto al suministro del triturador. Gírela hacia la derecha. Si hay agua cerca del contacto de bajo el fregadero, no meta la mano. Baje la pastilla de la cocina si puede hacerlo desde un lugar seco, o cierre la principal y llame al ${phone}. No corra otro ciclo para probar su arreglo. Así un cuarto de galón se convierte en el pasillo.`,
          'Fotografíe el lavavajillas abierto, la manguera, el fondo del gabinete y el cuarto de junto a la cocina antes de pasarle una toalla. Una manguera de drenaje que se zafó del triturador y un empaque de la puerta que solo gotea en el ciclo de secado se ven parecidos cuando ya todo está trapeado. Las cocinas de apartamento y los lavavajillas de un cuarto de descanso en un local chico empiezan igual. Un lavavajillas comercial de restaurante es otro equipo. Díganos cuál tiene.',
        ],
        points: [
          {
            title: 'Mire bajo el fregadero',
            body: 'La línea de agua y la manguera de drenaje a menudo están en el gabinete de junto al lavavajillas, no dentro de la tina. Abra esa puerta y mire.',
          },
          {
            title: 'La manguera del triturador',
            body: 'Si la manguera de drenaje se zafó del triturador, cada ciclo se vacía en el gabinete. No lo vuelva a pegar y tape un entrepaño mojado.',
          },
          {
            title: 'Aléjese del contacto',
            body: 'El agua en la tapa del zoclo bajo los gabinetes y un contacto con corriente no se mezclan. No se meta a esa agua.',
          },
        ],
      },
      {
        eyebrow: 'El camino',
        heading: 'Zoclos, fondos de gabinete y la losa.',
        paragraphs: [
          'Las cocinas de Houston sobre losa no le dan a esta agua un hueco bajo la casa. Corre bajo el lavavajillas, hincha el fondo de aglomerado del gabinete y sigue bajo el vinil o la madera hacia el cuarto de al lado. La cara del gabinete puede verse bien. Lo que falló es la base. Medimos el zoclo del gabinete y el piso frente al fregadero, no solo el charco que se ve.',
          'Una cocina en el segundo piso, menos común pero real en algunos planos de Houston, pone esa agua en el plafón de abajo. Un desborde por el respiradero tapado en el fregadero, o por un drenaje que se regresó, es otra cantidad de agua, distinta de un orificio chico en el suministro. Decimos qué evidencia encontramos. Una cocina mojada no es lo mismo que una inundación. El agua que sube de afuera es otra causa y, muchas veces, otra póliza.',
        ],
        points: [
          {
            title: 'El fondo se hincha',
            body: 'Los fondos de aglomerado se hinchan y no vuelven a quedar planos. La madera sólida a veces sí puede secar. Miramos antes de decirle cuál tiene.',
          },
          {
            title: 'El piso puede esconderlo',
            body: 'El laminado y el vinil pueden esconder agua sobre el concreto. Si la losa se quedó mojada, la guía de humedad de la losa en este sitio explica qué sigue.',
          },
          {
            title: 'El apartamento de abajo',
            body: 'En un apartamento, la unidad de abajo puede ver la mancha del plafón primero. Llame al administrador y llámenos.',
          },
        ],
      },
      {
        eyebrow: 'El secado',
        heading: 'Seque el hueco y después vea qué gabinetes se salvan.',
        paragraphs: [
          'Sacamos el agua estancada, quitamos los fondos de gabinete mojados que ya perdieron la forma, y secamos la losa y el muro detrás del lavavajillas con ventiladores de secado y deshumidificadores. El aire de Houston está tan húmedo que un ventilador de caja no termina un gabinete cerrado. Las lecturas de humedad deciden cuándo puede entrar tabla nueva y un fondo nuevo. El lavavajillas mismo puede necesitar un plomero o un técnico de electrodomésticos. Reconstruir la máquina es trabajo de ellos, no nuestro. Un goteo lento y una línea de suministro que se zafó son reparaciones distintas.',
          `La reparación del edificio, los gabinetes, la tablaroca y el piso, puede quedarse con Elite Restorations, empresa familiar en Houston desde 1993. Trabajamos en casas, cocinas de apartamento y cuartos de descanso chicos. Llame o envíe un texto al ${phone}. Las fugas activas se contestan lunes a sábado, de 8 a.m. a 6 p.m. En ${office} el horario es de lunes a sábado, de 8:00 a. m. a 6:00 p. m.`,
        ],
        points: [
          {
            title: 'La tapa del zoclo sale',
            body: 'Si no podemos ver el piso bajo el gabinete, no podemos decir que está seco. La tabla de abajo del gabinete casi siempre tiene que salir.',
          },
          {
            title: 'Mover el lavavajillas',
            body: 'Sacamos el lavavajillas cuando eso es lo que hace falta para secar el piso. Volver a conectar el agua y la corriente es un paso planeado, no una suposición al final.',
          },
          {
            title: 'No es una cocina nueva',
            body: 'Un entrepaño mojado no quiere decir que haya que cambiar cada gabinete de la cocina. Le enseñamos dónde para el daño.',
          },
        ],
      },
      {
        eyebrow: 'El reclamo',
        heading: 'Una línea que se soltó no es un empaque gastado.',
        paragraphs: [
          'Una línea de suministro que se suelta durante un ciclo es un evento súbito que muchas veces se puede señalar. Un empaque de la puerta, o una conexión lenta que lleva meses hinchando el gabinete, es otra historia. Muchas pólizas no las leen igual. Las palabras están en su póliza, y varían, así que revísela o pregúntele a la aseguradora. Describimos la manguera, el gabinete y el piso. Su aseguradora decide si esto entra como súbito y accidental.',
          `Fotografiamos el daño y hacemos el trabajo que usted contrata. Su aseguradora decide la cobertura. ${notAdjusters} No damos consejo legal. Las fotos antes de limpiar importan aquí porque una cocina trapeada parece un derrame chico. Podemos estar con el ajustador y estimar la reparación de gabinetes y piso. ${claimWork} Ese estimado es construcción, no una promesa de pago. El registro de fotos recorre una cocina cuarto por cuarto. La página de reclamos de seguro explica qué hacemos en el reclamo y qué decide su aseguradora.`,
        ],
        points: [
          {
            title: 'Guarde la manguera',
            body: 'Si falló una manguera de suministro trenzada, guárdela. Fotografíe la conexión de donde se zafó.',
          },
          {
            title: 'Anote cuándo pasó',
            body: 'Anote si falló con el lavavajillas corriendo o si encontró el agua horas después. Esa línea de tiempo le ayuda a explicarlo. Leer la póliza es su paso, o el de su aseguradora.',
          },
          {
            title: 'No es agua de la calle',
            body: 'Un lavavajillas en el segundo piso no es agua de inundación de la calle. Si pasaron las dos cosas, dígalo. Son problemas distintos.',
          },
        ],
      },
      {
        eyebrow: 'Houston',
        heading: 'Cocinas sobre losa, del Loop a Katy.',
        paragraphs: [
          'Esto lo vemos en las cocinas de las casas chicas de los Heights y de Bellaire, en planos más grandes de Memorial y The Woodlands, y en cocinas de apartamento del Energy Corridor y Westchase. La losa es el hilo común. Una fuga bajo un lavavajillas no se anuncia hasta que el zoclo del gabinete está blando o los gabinetes bajos huelen. La humedad del verano mantiene ese hueco mojado más tiempo del que la gente espera. La temporada de huracanes no es la causa de siempre. Una falla de suministro puede pasar cualquier semana. Una semana de helada puede partir el mismo suministro si está en una pared exterior. Díganos si el frío acaba de pasar.',
          `Empresa familiar desde 1993. Trabajamos desde ${office}. No estamos ligados a una marca de electrodomésticos ni a una aseguradora. Llame al ${phone} o envíe un texto. Para el proceso completo de secado, use la página de daño por agua. Si hay un calentador en el mismo clóset de la cocina, use la página del calentador. Pueden fallar en el mismo cuarto y seguir siendo dos orígenes.`,
        ],
        points: [
          {
            title: 'Cocinas más viejas',
            body: 'Las cocinas de los Heights y de West University a menudo tienen gabinetes que ya se mojaron una vez. Revisamos si esas cajas aguantan otra empapada.',
          },
          {
            title: 'También las cocinas nuevas',
            body: 'Una cocina nueva en Katy o Cinco Ranch igual puede esconder una manguera de drenaje floja. La edad de la casa no nos dice qué falló.',
          },
          {
            title: 'Cuartos de descanso',
            body: 'También secamos un lavavajillas chico en el cuarto de descanso de una oficina. Díganos si es uno de casa o uno comercial más grande.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué hago si el lavavajillas está goteando ahora?',
        a: `Pare el ciclo, cierre la llave de bajo el fregadero si puede hacerlo con seguridad, aleje la corriente del agua y llame al ${phone}. Fotografíe antes de trapear.`,
      },
      {
        q: '¿Lo corro otra vez para encontrar la fuga?',
        a: 'No. Otro ciclo le echa agua al gabinete y a la losa. Déjelo apagado.',
      },
      {
        q: '¿Ustedes reparan el lavavajillas?',
        a: 'Secamos y reconstruimos la cocina alrededor. La máquina misma es reparación de electrodoméstico. La movemos cuando hay que secar el piso.',
      },
      {
        q: '¿Por qué el gabinete está blando si el piso se ve seco?',
        a: 'Los fondos de aglomerado guardan el agua y la losa esconde el resto. El zoclo del gabinete es donde miramos.',
      },
      {
        q: '¿Una fuga lenta del empaque está cubierta?',
        a: 'No podemos decirlo. En muchas pólizas, una rotura súbita no se lee igual que una filtración de mucho tiempo. Revise su póliza. Describimos la fuga como la encontramos.',
      },
      {
        q: '¿Puede afectar al apartamento de abajo?',
        a: 'Sí, sobre todo desde una cocina de arriba. Anotamos los plafones que están mojados. Llame al administrador.',
      },
      {
        q: '¿Van a estar con el ajustador?',
        a: `Sí, si nos quiere ahí. ${notAdjusters} Su aseguradora decide si hay un pago.`,
      },
      {
        q: '¿Cuánto suele costar la reparación?',
        a: 'Secar un zoclo y cambiar un fondo de gabinete no es una cocina nueva. Como un rango para planear, no una cotización, una pérdida contenida de lavavajillas suele quedar en los miles bajos, y más si se fueron el piso y varios gabinetes.',
      },
      {
        q: '¿Atienden casas y apartamentos?',
        a: `Sí, y cuartos de descanso chicos. Llame al ${phone}, lunes a sábado, de 8 a.m. a 6 p.m., si el agua sigue extendiéndose.`,
      },
      {
        q: '¿Dónde leo sobre la losa?',
        a: 'La guía de humedad de la losa explica el agua que se quedó en el concreto. La página de daño por agua explica el secado completo.',
      },
      {
        q: '¿Cómo los contacto?',
        a: `Llame o envíe un texto al ${phone}. Trabajamos desde ${office}. Empresa familiar desde 1993. De lunes a sábado, de 8:00 a. m. a 6:00 p. m., para visitas agendadas.`,
      },
      {
        q: '¿Tengo que estar en casa por una fuga de lavavajillas?',
        a: 'Alguien tiene que enseñarnos la cocina y el zoclo del gabinete, y cerrar el agua si sigue corriendo. Usted no tiene que sacar el aparato. Si la fuga está bajo los gabinetes, necesitamos espacio para ver el piso. Las mascotas deben estar fuera de la cocina mojada.',
      },
      {
        q: '¿Qué tan pronto pueden salir?',
        a: `Si el agua se está extendiendo por la cocina, llame al ${phone}, lunes a sábado, de 8 a.m. a 6 p.m. Pare el ciclo. Cierre la llave de bajo el fregadero si puede hacerlo con seguridad. Le decimos el siguiente paso. Una mancha seca del mes pasado es una visita agendada, de lunes a sábado, de 8:00 a. m. a 6:00 p. m.`,
      },
      {
        q: '¿Una línea de suministro reventada es distinta de un empaque malo?',
        a: 'Sí. Una línea de suministro que se suelta es una cantidad súbita de agua. Un empaque o una puerta que gotea en cada ciclo puede mojar el gabinete por meses. Describimos lo que encontramos. Su póliza puede tratarlos distinto. No podemos decir cuál va a pagar.',
      },
      {
        q: '¿Esto va a echar a perder el piso de la cocina?',
        a: 'Puede. El agua corre bajo los gabinetes y por la losa antes de que la cara del gabinete se vea mal. La madera y el laminado se hinchan. La loseta puede estar bien mientras el fondo del gabinete no. Miramos bajo el zoclo. No cambiamos un piso que sigue sano.',
      },
      {
        q: '¿El seguro cubre un desborde de lavavajillas?',
        a: `No podemos prometerlo. En muchas pólizas, una rotura súbita no se lee igual que una filtración lenta. Revise la suya o pregúntele a su aseguradora. Fotografiamos la fuga y los gabinetes mojados y ayudamos a documentar el daño. ${notAdjusters} ${claimWork}`,
      },
      {
        q: '¿Qué pasa si el aglomerado bajo el fregadero se queda mojado?',
        a: 'El aglomerado mojado en una cocina de Houston es un mal lugar para esperar. No ponemos un plazo. Secamos lo que podemos alcanzar y quitamos el material que no se puede secar en su lugar. Si ve daño bajo el gabinete, díganos.',
      },
      {
        q: '¿Puedo seguir usando el resto de la cocina?',
        a: 'Muchas veces sí, si el agua está contenida y la corriente está segura. Deje el lavavajillas apagado. No corra otro ciclo para probarlo. Puede quedarse sin ese gabinete durante el secado. Decimos si el piso tiene que salir antes de que vuelva a guardar los trastes.',
      },
      {
        q: '¿Quién paga el secado?',
        a: 'Usted nos contrata, a menos que su aseguradora incluya el trabajo. Una pérdida contenida de lavavajillas suele quedar en los miles bajos, y más si se fueron el piso y varios gabinetes. Eso es un rango para planear, no una cotización, y no es el pago del reclamo. Su deducible está en su póliza. No lo quitamos.',
      },
    ],
  }),
  page('toilet-overflow-water-damage-houston', {
    metaTitle: 'Desborde de inodoro en Houston',
    description:
      'Un desborde de inodoro en Houston moja el baño, el piso y a veces el plafón de abajo. Secamos y documentamos el reclamo. Llame al (713) 909-0034.',
    eyebrow: 'Desbordes de inodoro',
    title: ['Desborde de inodoro', 'en Houston.'],
    lede:
      'Un desborde de inodoro suele ser un tapón que siguió llenando, una línea de suministro que se soltó, o agua en la base que lleva tiempo filtrándose. Esos tres no son la misma reparación ni la misma historia para el seguro.',
    sections: [
      {
        eyebrow: 'La primera hora',
        heading: 'La llave de la pared, y no le vuelva a jalar.',
        paragraphs: [
          `La llave chica de la pared o del piso, detrás del inodoro, controla el suministro. Gírela hacia la derecha. Si el tanque o la taza se están desbordando por un tapón, jalarle otra vez lo empeora. Use el destapador solo si el agua ya dejó de subir y usted no está parado en un charco cerca de la electricidad. Si la llave no hace nada, cierre la principal y llame al ${phone}. Una línea de suministro que está chorreando no es un tapón. Ciérrela y fotografíe la línea para que la causa quede clara.`,
          'El agua en el piso de un baño se mueve rápido sobre una losa de Houston. Se mete bajo la puerta, al clóset y bajo el mueble del lavabo. En un apartamento puede llegar al pasillo y a la unidad de abajo. Un baño comercial suma varios muebles y una coladera de piso que ya puede estar rebasada. Díganos qué cuarto es y si el agua está clara o contaminada. Deje el ventilador apagado para no empujar el agua contaminada más lejos por el piso.',
        ],
        points: [
          {
            title: 'No le vuelva a jalar',
            body: 'Jalarle una vez más es la forma en que un tapón que todavía estaba en la taza termina en la alfombra de la recámara.',
          },
          {
            title: 'Manguera o taza',
            body: 'El agua que chorrea de la manguera detrás del tanque es una falla de la línea de suministro. El agua que se sale por la taza es un desborde o un tapón. Díganos cuál vio.',
          },
          {
            title: 'Un goteo lento en el piso',
            body: 'Un goteo de mucho tiempo en la base suele ser un sello malo, no el desborde de hoy. No le ponga silicón a la mancha antes de fotografiarla.',
          },
        ],
      },
      {
        eyebrow: 'El camino',
        heading: 'Bajo el piso y por el muro del baño.',
        paragraphs: [
          'Los baños de aquí están sobre losa o, arriba, sobre un plafón. El agua de un desborde sigue el emboquillado, se mete bajo el vinil y los pisos flotantes, y sube a la tablaroca detrás del tanque. La pintura del zoclo es la pista una hora después. Una falla de la línea de suministro suele ser agua limpia. Un desborde que incluye desecho no lo es. Esas limpiezas las tratamos distinto y lo decimos en las notas. No somos el inspector de la ciudad.',
          'Los baños de arriba en casas de dos pisos en Katy, Sugar Land, Cinco Ranch y The Woodlands ponen en riesgo el plafón de abajo. Las torres de apartamentos hacen lo mismo entre unidades. Abrimos el plafón de abajo solo cuando un medidor de humedad dice que está mojado, no porque un desborde de baño siempre arruine la planta de abajo. Una filtración del anillo de cera puede ser una mancha más chica y más larga, donde el inodoro se junta con el piso. Esa historia importa para el edificio y para la póliza. La describimos. Su aseguradora decide cómo clasificarla.',
        ],
        points: [
          {
            title: 'Revise el cuarto de al lado',
            body: 'Mire en el clóset y en el mueble del lavabo junto al baño. El agua de un inodoro no se detiene en la puerta.',
          },
          {
            title: 'Un inodoro que se mueve',
            body: 'Un inodoro que se cimbra, o manchas alrededor de los tornillos, suele querer decir que el sello del piso está malo. El desborde de hoy no borra ese problema viejo.',
          },
          {
            title: 'Baños comerciales',
            body: 'Una válvula de descarga fallada en un baño público puede correr más tiempo que el tanque de una casa. Cierre la llave y díganos cuántos muebles están involucrados.',
          },
        ],
      },
      {
        eyebrow: 'El secado',
        heading: 'Limpie según qué agua era, y después seque la losa.',
        paragraphs: [
          'El agua limpia de un suministro y un desborde de aguas negras no se secan igual. Quitamos los materiales contaminados que no se pueden limpiar, sacamos el resto del agua y secamos la estructura con ventiladores de secado y deshumidificadores. La humedad de Houston es la razón de que el equipo se quede hasta que los medidores coincidan. El piso que se levantó en las orillas, o que se manchó en las uniones, muchas veces tiene que salir para que la losa seque. Le enseñamos esa línea antes de quitar un baño completo. Un desborde con aguas negras necesita una limpieza más cuidadosa que una rotura limpia de la línea de suministro.',
          `La tablaroca, el zoclo, el piso y volver a sentar el inodoro, cuando eso es parte del trabajo, vienen después de las lecturas de humedad. Elite Restorations es una empresa familiar en Houston desde 1993. Trabajamos en casas, baños de apartamento y baños comerciales. Las visitas se agendan desde ${office}. Llame o envíe un texto al ${phone}, lunes a sábado, de 8 a.m. a 6 p.m., cuando el agua sigue extendiéndose. Las recorridas agendadas son de lunes a sábado, de 8:00 a. m. a 6:00 p. m.`,
        ],
        points: [
          {
            title: 'Limpiador y un tapete no lo secan',
            body: 'Echar limpiador en un piso mojado y taparlo con un tapete atrapa la humedad en el concreto.',
          },
          {
            title: 'Seque el piso antes de sentar el inodoro',
            body: 'Volver a sentar el inodoro sobre un piso mojado y blando empieza la fuga otra vez. El piso tiene que secar primero.',
          },
          {
            title: 'Mire el plafón de abajo',
            body: 'Si el baño está arriba, revisamos el plafón de debajo. Una mancha ahí sigue siendo parte de esta pérdida hasta que un medidor de humedad diga que el plafón está seco.',
          },
        ],
      },
      {
        eyebrow: 'El reclamo',
        heading: 'Desborde, línea de suministro o una filtración larga en la base.',
        paragraphs: [
          'Una taza que se desbordó una vez por un tapón, una línea de suministro que se partió, y un anillo de cera que lleva una temporada humedeciendo el piso son tres historias distintas. Muchas pólizas de Texas están más dispuestas a hablar de una descarga súbita que de una fuga que siguió. El texto está en su póliza. Revísela. Su aseguradora decide cuál historia coincide con la póliza. Si el sello del piso lleva mucho tiempo goteando, lo decimos, aunque la taza también se haya desbordado hoy.',
          `Fotografiamos el daño y hacemos el trabajo que usted contrata. Su aseguradora decide la cobertura. ${notAdjusters} No damos consejo legal. Fotografiamos el baño, el camino y el plafón de abajo, y podemos estar con el ajustador. ${claimWork} El estimado es de la reparación. No es un pago. El registro de fotos es una forma sencilla de dejar asentado el baño antes de limpiar. La guía de humedad de la losa importa cuando el agua salió de la loseta y se quedó en el concreto. La página del seguro explica qué hacemos en el reclamo y qué decide su aseguradora.`,
        ],
        points: [
          {
            title: 'Anote la hora',
            body: 'Anote cuándo notó el agua y si el inodoro se había estado cimbrando. Esos son hechos de la casa. No son una decisión de cobertura.',
          },
          {
            title: 'Diga si eran aguas negras',
            body: 'Díganos si el desborde incluía desecho de la taza. Eso cambia cómo limpiamos. Por sí solo, no decide lo que paga la póliza.',
          },
          {
            title: 'Pare el agua y después pregunte',
            body: 'Cerrar la llave y secar el cuarto limita más daño. Pregúntele a su aseguradora qué quiere que guarde. Cualquier plazo está escrito en su póliza.',
          },
        ],
      },
      {
        eyebrow: 'Houston',
        heading: 'Baños sobre losa en el área de Houston.',
        paragraphs: [
          'Desde las casas chicas de West University y Bellaire hasta los baños más nuevos de Katy y The Woodlands, el inodoro queda cerca de un muro y de una losa o de un plafón de segundo piso. Las heladas fuertes pueden partir la línea de suministro la misma semana en que parten un tubo del ático. Las semanas normales son tapones y conectores viejos. La lluvia de un huracán no hace que un inodoro se desborde por sí sola, pero un drenaje de la ciudad que no da abasto sí puede. Si la calle se estaba inundando y la tina hacía ruido de gorgoteo, dígalo. Puede ser otra póliza, distinta de un inodoro tapado en un día seco.',
          `Este trabajo lo agendamos desde ${office}. Empresa familiar desde 1993. Llame o envíe un texto al ${phone}. ${notAdjusters} No somos un proveedor de ninguna aseguradora. Use la página de daño por agua para el secado más amplio, y la página del tubo reventado si la falla del suministro fue parte de una helada. Esas las escribimos como causas separadas.`,
        ],
        points: [
          {
            title: 'Encuentre la llave ahora',
            body: 'Sepa dónde está el cierre detrás del inodoro antes de necesitarlo. Una válvula pintada es una sorpresa común en un baño de Houston.',
          },
          {
            title: 'Avísele a la oficina del apartamento',
            body: 'Llame a la oficina para que alguien revise la unidad de abajo. Nosotros igual tenemos que entrar al baño que se desbordó.',
          },
          {
            title: 'Baños de tienda y de oficina',
            body: 'También atendemos un desborde de baño en una tienda o una oficina. Díganos cuántos cubículos se desbordaron y si el cuarto tiene coladera de piso.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué apago?',
        a: `La llave de suministro detrás del inodoro, hacia la derecha. Si la taza está subiendo, no le vuelva a jalar. Si la llave falla, cierre la principal y llame al ${phone}.`,
      },
      {
        q: '¿Un desborde es lo mismo que una fuga del anillo de cera?',
        a: 'No. Un desborde es agua que salió de la taza. Un problema de anillo de cera suele ser una filtración más lenta en la base. Anotamos qué evidencia hay. Su póliza puede tratarlos distinto.',
      },
      {
        q: 'El agua huele. ¿Qué hago?',
        a: 'Mantenga a la gente afuera, cierre el suministro y no la esparza con un ventilador. Díganos que está contaminada. La limpieza es más que un trapeador.',
      },
      {
        q: '¿Ustedes cambian el inodoro?',
        a: 'Podemos volver a sentar o cambiar un inodoro como parte de la reparación del baño, después de que el piso esté seco. El secado va primero.',
      },
      {
        q: '¿El apartamento de abajo va a estar mojado?',
        a: 'Muchas veces, si usted no está en la planta baja. Mire, avísele al administrador, y nosotros medimos el plafón en lugar de adivinar.',
      },
      {
        q: '¿El seguro paga un desborde de inodoro?',
        a: 'A veces sí y a veces no. Las salidas súbitas y la filtración de mucho tiempo muchas veces se tratan distinto. Revise su póliza. Su aseguradora decide el pago.',
      },
      {
        q: '¿Pueden estar con el ajustador?',
        a: `Sí. Recorremos el baño y cualquier plafón de abajo. ${notAdjusters} El consejo legal queda fuera de nuestro trabajo.`,
      },
      {
        q: '¿Cuánto suele costar el secado?',
        a: 'Un solo baño con piso mojado suele quedar en los miles bajos. Un plafón de abajo y varios cuartos cuestan más. Eso es un rango para planear, no una cotización.',
      },
      {
        q: '¿Secan baños comerciales?',
        a: `Sí, junto con casas y apartamentos. Llame al ${phone}, lunes a sábado, de 8 a.m. a 6 p.m., si el agua sigue extendiéndose.`,
      },
      {
        q: '¿En qué se diferencia esto de una fuga de losa?',
        a: 'Un suministro o un desborde de inodoro empieza en el mueble. El agua igual termina en la losa y bajo el piso. La guía de humedad de la losa cubre lo que hace el concreto después.',
      },
      {
        q: '¿Dónde están?',
        a: `En ${office}. Empresa familiar desde 1993. Envíe un texto o llame al ${phone}. Horario de oficina de lunes a sábado, de 8:00 a. m. a 6:00 p. m.`,
      },
      {
        q: '¿Tengo que estar en casa si el inodoro se desbordó?',
        a: `Sí, o alguien que pueda cerrar la llave de suministro y dejarnos entrar. Si la taza sigue subiendo, no le vuelva a jalar. Gire hacia la derecha la llave de detrás del inodoro. Si eso falla, cierre la principal y llame al ${phone}. Mantenga a la gente fuera del agua cerca de los contactos.`,
      },
      {
        q: '¿Qué tan pronto pueden venir por un desborde de inodoro?',
        a: `Llame al ${phone} si el agua sigue extendiéndose o huele a aguas negras. Contestamos, lunes a sábado, de 8 a.m. a 6 p.m., cuando el agua está activa y le decimos el siguiente paso seguro. Un desborde chico que usted ya paró igual vale una mirada si llegó al zoclo o a la unidad de abajo.`,
      },
      {
        q: '¿Un inodoro tapado es lo mismo que una línea de suministro partida?',
        a: 'No. Un desborde deja agua de la taza. Un suministro partido es agua limpia en la llave, muchas veces en una helada. Un anillo de cera suele ser una filtración más lenta en la base. Anotamos la evidencia. Su póliza puede tratarlos distinto. No elegimos la etiqueta que paga más.',
      },
      {
        q: '¿Qué hago si el agua huele mal?',
        a: 'Mantenga afuera a la gente y a las mascotas. No la esparza con un ventilador de la casa. Las aguas negras son otra limpieza, distinta de un charco de la línea de suministro. Díganoslo por teléfono. Trapearlo hacia el emboquillado no es la limpieza. Decimos qué tiene que salir.',
      },
      {
        q: '¿El seguro paga un inodoro que se desbordó?',
        a: `Pregúntele a su aseguradora. Un desborde súbito y una fuga que se filtró por meses se describen distinto en muchas pólizas. Documentamos lo que vemos y reparamos lo que usted contrata. No podemos prometer una aprobación ni una cantidad. ${notAdjusters}`,
      },
      {
        q: '¿Puedo usar el otro baño?',
        a: 'Sí. Deje apagado el inodoro que se desbordó hasta que alguien que entienda el tapón o la llave lo haya visto. Si el único baño es el mojado, díganos. Igual no queremos que le vuelva a jalar al mismo tapón esta noche.',
      },
      {
        q: '¿Cómo sé si la unidad de abajo está mojada?',
        a: 'Mire, o pregunte. Un inodoro de arriba muchas veces aparece en el plafón de abajo. Avísele al administrador. Medimos ese plafón en lugar de suponer toda la torre. Una losa de planta baja guarda el agua en el zoclo.',
      },
      {
        q: '¿Cuánto suele costar, y tengo que salirme de la casa?',
        a: 'Un desborde contenido en la base no es remodelar todo el baño. Como un rango para planear, no una cotización, el secado y una reparación limitada suelen quedar en los miles bajos, y más si entran el piso y el plafón de abajo. Muchas veces puede quedarse en los cuartos secos. Las aguas negras pueden querer decir quedarse fuera de ese baño.',
      },
    ],
  }),
];

export function getEsWaterCause(slug: string) {
  return esWaterCauses.find((page) => page.slug === slug);
}

for (const page of esWaterCauses) {
  if (page.metaTitle.includes('Elite Restorations')) {
    throw new Error(`${page.path} puts the business name in the title`);
  }
  if (!titleFits(page.metaTitle)) {
    throw new Error(`${page.path} title does not fit: ${page.metaTitle}`);
  }
  if (page.description.length > 155) {
    throw new Error(`${page.path} description is ${page.description.length}`);
  }
  const blob = [
    page.metaTitle,
    page.description,
    page.eyebrow,
    page.title.join(' '),
    page.lede,
    ...page.sections.flatMap((section) => [
      section.eyebrow,
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []).flatMap((point) => [point.title, point.body]),
    ]),
    ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
  ].join('\n');
  if (!blob.includes(office)) {
    throw new Error(`${page.path} is missing the office line`);
  }
  if (!blob.includes(phone)) {
    throw new Error(`${page.path} is missing the phone`);
  }
  if (/estimado gratis/i.test(blob)) {
    throw new Error(`${page.path} says estimado gratis`);
  }
  assertCopyAllowed(page.path, blob);
  const words = wordCount([
    page.lede,
    ...page.sections.flatMap((section) => [
      section.eyebrow,
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []).flatMap((point) => [point.title, point.body]),
    ]),
    ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
  ]);
  if (words < 1100) {
    throw new Error(`${page.path} is ${words} Spanish words, under 1100`);
  }
}
