export type ClaimFaq = { q: string; a: string };

const phone = "(713) 909-0034";

export const claimHelpEn = {
  eyebrow: "Insurance claim help",
  title: "We help you with your insurance claim",
  lede: "Elite Restorations helps Houston homeowners, property managers, and building owners document storm and water damage and keep the repair moving. We are not public adjusters. We do not file claims for you, give legal advice, or promise that a claim will be approved or paid. Your insurer decides coverage. Check your policy.",
  disastersTitle: "The disasters we document most often",
  disasters: [
    {
      title: "Flooding",
      body: "Water that rises from the street, a bayou, or a reservoir is often a different policy from a homeowners or dwelling policy. We photograph where the water entered and how high it went. We do not rename rising water as a plumbing break.",
    },
    {
      title: "Hurricanes",
      body: "After a hurricane we help secure openings, photograph the roof and wet rooms, and write down the drying and repair scope. Hurricane season on the Gulf runs June 1 through November 30. Notice rules are in your policy. We do not invent a deadline.",
    },
    {
      title: "Hail",
      body: "Hail bruises roofs and can crack skylights and light fixtures. We photograph the roof and any interior wetting before a cover hides the opening, then help with a repair estimate. The carrier decides what is hail and what is wear.",
    },
    {
      title: "Storms and wind",
      body: "Straight-line wind and severe thunderstorms lift shingles, throw limbs, and drive rain into ceilings from Clear Lake to Katy and The Woodlands. We document the opening and the rooms underneath.",
    },
    {
      title: "Tornadoes",
      body: "A tornado can take a roof, a wall, or a run of windows. The first work is safety, then photos, then a tarp or board-up when it is safe to do that. We assist with the estimate and the repair record. We do not promise a payout.",
    },
  ],
  helpTitle: "What we actually do on the claim",
  help: [
    "Photograph the damage, including wide shots and close shots, before cleanup when that is safe.",
    "Emergency mitigation to limit further damage: tarping a roof, boarding an opening, extracting water, and drying. Many policies expect you to limit further damage. That work is not a promise of reimbursement.",
    "Meet the adjuster on site when you want us there, and walk through what we saw of the building.",
    "Prepare a detailed repair estimate for the construction. The estimate is not the claim payment.",
    "Stay with the repair and share photos and notes with you so you can share them with the insurer.",
  ],
  links: [
    { href: "/insurance-claims", label: "Insurance claims help" },
    { href: "/how-to-build-an-insurance-photo-log", label: "How to build an insurance photo log" },
    { href: "/how-insurance-claims-work-texas-restoration", label: "How Texas restoration claims usually move" },
    { href: "/insurance-claims/companies", label: "Pages for major Texas insurers" },
  ],
};

export const claimHelpEs = {
  eyebrow: "Ayuda con el reclamo",
  title: "Le ayudamos con su reclamo de seguro",
  lede: "Elite Restorations ayuda a documentar el daño por tormenta o por agua en Houston y a seguir con la reparación. No somos ajustadores públicos. No presentamos el reclamo por usted, no damos consejo legal y no prometemos que el reclamo se apruebe o se pague. Su aseguradora decide la cobertura. Revise su póliza.",
  disastersTitle: "Los desastres que más documentamos",
  disasters: [
    {
      title: "Inundación",
      body: "El agua que sube de la calle, de un bayou o de un embalse suele corresponder a otra póliza, no a la de homeowners. Fotografiamos por dónde entró y hasta dónde llegó. No cambiamos el nombre de una inundación para que suene a fuga de plomería.",
    },
    {
      title: "Huracanes",
      body: "Después de un huracán ayudamos a cerrar aberturas, fotografiar el techo y los cuartos mojados, y anotar el secado y la reparación. La temporada de huracanes en el Golfo va del 1 de junio al 30 de noviembre. Los plazos están en su póliza. No inventamos uno.",
    },
    {
      title: "Granizo",
      body: "El granizo marca techos y puede romper tragaluces. Fotografiamos el techo y la humedad interior antes de cubrir la abertura, y ayudamos con un estimado de reparación. La aseguradora decide qué es granizo y qué es desgaste.",
    },
    {
      title: "Tormentas y viento",
      body: "El viento levanta tejas, tira ramas y mete lluvia a los plafones, de Clear Lake a Katy y The Woodlands. Documentamos la abertura y los cuartos de abajo.",
    },
    {
      title: "Tornados",
      body: "Un tornado puede llevarse un techo, una pared o una hilera de ventanas. Primero la seguridad, luego las fotos, luego la lona o el board-up cuando se puede hacer sin riesgo. Ayudamos con el estimado y el registro de la reparación. No prometemos un pago.",
    },
  ],
  helpTitle: "Lo que sí hacemos en el reclamo",
  help: [
    "Fotografiar el daño, en toma abierta y en detalle, antes de limpiar cuando es seguro.",
    "Mitigación de emergencia para limitar más daño: lona en el techo, board-up, extracción de agua y secado. Muchas pólizas piden limitar el daño adicional. Ese trabajo no promete un reembolso.",
    "Estar en la propiedad cuando llega el ajustador, si usted quiere, y explicar lo que vimos del edificio.",
    "Preparar un estimado detallado de la reparación. El estimado no es el pago del reclamo.",
    "Seguir en la reparación y compartirle fotos y notas para que usted las comparta con la aseguradora.",
  ],
  links: [
    { href: "/es/insurance-claims", label: "Ayuda con reclamos de seguro" },
    { href: "/how-to-build-an-insurance-photo-log", label: "Cómo armar un registro fotográfico (en inglés)" },
    { href: "/how-insurance-claims-work-texas-restoration", label: "Cómo avanza un reclamo de restauración en Texas (en inglés)" },
    { href: "/insurance-claims/companies", label: "Páginas sobre aseguradoras grandes de Texas (en inglés)" },
  ],
};

export const claimFaqsEn: ClaimFaq[] = [
  {
    q: "Do you help with a flood claim the same way as a homeowners claim?",
    a: "We help document what happened and we dry and repair what you hire us to do. Flooding from rising water is often a different policy from a homeowners or dwelling policy. Check your policy or ask your insurer which one applies. We will not tell you that a bayou flood is a sudden plumbing leak, and we do not promise payment.",
  },
  {
    q: "Can you help after a hurricane?",
    a: `Yes. Call ${phone} for an active opening or water inside a house, apartment building, or commercial property. We photograph the damage, tarp or board up when it is safe, and help with the drying and the repair estimate. We are not public adjusters. Your insurer decides the hurricane claim.`,
  },
  {
    q: "How do you help with a hail claim?",
    a: "We inspect and photograph the roof and any interior water before a tarp covers the opening, then we can meet the adjuster on site and prepare a repair estimate. We do not decide whether the marks are hail or wear, and we do not promise the claim will be approved.",
  },
  {
    q: "What about wind and severe storms?",
    a: "We document lifted shingles, broken openings, and wet rooms, and we do emergency mitigation to limit further damage when it is safe. Working with the insurer through the repair means sharing photos and a clear scope. It does not mean we negotiate your settlement or give legal advice.",
  },
  {
    q: "Can you help after a tornado?",
    a: "When the area is safe to enter, we help with photos, temporary protection, water removal, and a repair estimate for homes, commercial buildings, and apartments. Coverage, deductibles, and payment are your insurer's decision. Check your policy.",
  },
];

export const claimFaqsEs: ClaimFaq[] = [
  {
    q: "¿Ayudan igual con una inundación que con un reclamo de homeowners?",
    a: "Ayudamos a documentar lo que pasó y secamos y reparamos lo que usted nos contrate. El agua que sube de la calle o del bayou suele ser otra póliza, distinta a la de la casa. Revise su póliza o pregunte a su aseguradora cuál aplica. No vamos a llamar fuga de plomería a una inundación, y no prometemos un pago.",
  },
  {
    q: "¿Pueden ayudar después de un huracán?",
    a: `Sí. Llame al ${phone} si hay una abertura o agua dentro de una casa, un edificio de apartamentos o un local comercial. Fotografiamos el daño, ponemos lona o board-up cuando es seguro, y ayudamos con el secado y el estimado. No somos ajustadores públicos. Su aseguradora decide el reclamo.`,
  },
  {
    q: "¿Cómo ayudan con un reclamo por granizo?",
    a: "Revisamos y fotografiamos el techo y el agua interior antes de cubrir la abertura. Podemos estar cuando llegue el ajustador y preparar un estimado de reparación. No decidimos si las marcas son granizo o desgaste, y no prometemos que aprueben el reclamo.",
  },
  {
    q: "¿Y el viento o una tormenta fuerte?",
    a: "Documentamos tejas levantadas, aberturas rotas y cuartos mojados, y hacemos mitigación de emergencia para limitar más daño cuando es seguro. Trabajar con la aseguradora durante la reparación significa compartir fotos y un alcance claro. No negociamos su acuerdo ni damos consejo legal.",
  },
  {
    q: "¿Pueden ayudar después de un tornado?",
    a: "Cuando ya se puede entrar, ayudamos con fotos, protección temporal, extracción de agua y un estimado para casas, comercios y apartamentos. La cobertura, el deducible y el pago los decide su aseguradora. Revise su póliza.",
  },
];

export function claimHelpCopy(locale: "en" | "es") {
  return locale === "es" ? claimHelpEs : claimHelpEn;
}

export function claimHelpFaqs(locale: "en" | "es") {
  return locale === "es" ? claimFaqsEs : claimFaqsEn;
}
