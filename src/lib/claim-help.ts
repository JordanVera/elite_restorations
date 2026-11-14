export type ClaimFaq = { q: string; a: string };

const phone = "(713) 909-0034";

export const claimHelpEn = {
  eyebrow: "Insurance claim help",
  title: "We help you with your insurance claim",
  lede: "Elite Restorations helps Houston homeowners, property managers, and building owners document storm and water damage and keep the repair moving. We photograph the damage and do the work you hire. We are not public adjusters. You file the claim. We do not give legal advice, and we cannot promise that a claim will be approved or paid. Your insurer decides coverage. Check your policy.",
  disastersTitle: "The disasters we document most often",
  disasters: [
    {
      title: "Flooding",
      body: "Water that rises from the street, a bayou, or a reservoir is often a different policy from a homeowners or dwelling policy. We photograph where the water entered and how high it went. We write that down as rising water. Check your policy before treating it as a plumbing break.",
    },
    {
      title: "Hurricanes",
      body: "After a hurricane we help secure openings, photograph the roof and the wet rooms, and write down the drying and the repair. Hurricane season on the Gulf runs June 1 through November 30. Any notice deadline is in your policy. Ask your insurer what yours says.",
    },
    {
      title: "Hail",
      body: "Hail bruises roofs and can crack skylights and light fixtures. We photograph the roof and any water inside before a cover hides the opening, then help with a repair estimate. Your insurer decides what is hail and what is ordinary wear.",
    },
    {
      title: "Storms and wind",
      body: "Straight-line wind and severe thunderstorms lift shingles, throw limbs, and drive rain into ceilings from Clear Lake to Katy and The Woodlands. We photograph the opening and the rooms underneath.",
    },
    {
      title: "Tornadoes",
      body: "A tornado can take a roof, a wall, or a run of windows. The first work is safety, then photos, then a tarp or board-up when it is safe to do that. We help with the estimate and the repair record. Your insurer decides whether there is a payout.",
    },
  ],
  helpTitle: "What we actually do on the claim",
  help: [
    "Photograph the damage, including wide shots and close shots, before cleanup when that is safe.",
    "Emergency work that limits more damage: tarping a roof, boarding an opening, removing water, and drying. Many policies expect you to limit further damage. That work is not a promise you will be paid back.",
    "Meet the adjuster on site when you want us there, and walk through what we saw of the building.",
    "Prepare a detailed repair estimate for the construction. The estimate is the price of the work. It is not the claim payment.",
    "Stay with the repair and share photos and notes with you, so you can share them with the insurer.",
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
  lede: "Elite Restorations ayuda a dueños de casa, administradores y dueños de edificios en Houston a documentar el daño por tormenta o por agua y a seguir adelante con la reparación. Tomamos las fotos y hacemos el trabajo que usted contrate. No somos ajustadores públicos. El reclamo lo presenta usted. No damos consejo legal ni prometemos que se lo aprueben o se lo paguen. La cobertura la decide su aseguradora. Revise su póliza.",
  disastersTitle: "Los desastres que más documentamos",
  disasters: [
    {
      title: "Inundación",
      body: "Cuando el agua sube de la calle, de un bayou o de un embalse, casi siempre entra por otra póliza, no por el seguro de la casa. Tomamos fotos de por dónde entró y hasta dónde llegó. Lo anotamos como inundación. Revise su póliza antes de tratarlo como una fuga.",
    },
    {
      title: "Huracanes",
      body: "Después de un huracán le ayudamos a cubrir las aberturas, a fotografiar el techo y los cuartos mojados, y a anotar el secado y la reparación. La temporada de huracanes en el Golfo va del 1 de junio al 30 de noviembre. El plazo para avisar está en su póliza. Pregúntele a su aseguradora cuál es el suyo.",
    },
    {
      title: "Granizo",
      body: "El granizo marca los techos y puede quebrar tragaluces y lámparas. Fotografiamos el techo y cualquier humedad adentro antes de tapar la abertura, y le ayudamos con el estimado de la reparación. Su aseguradora decide qué es granizo y qué es desgaste normal.",
    },
    {
      title: "Tormentas y viento",
      body: "Los vientos fuertes y las tormentas severas levantan las tejas, tiran ramas y meten la lluvia por los plafones, desde Clear Lake hasta Katy y The Woodlands. Fotografiamos la abertura y los cuartos de abajo.",
    },
    {
      title: "Tornados",
      body: "Un tornado puede llevarse el techo, una pared o una hilera de ventanas. Primero vemos que la gente esté a salvo, luego tomamos fotos, y después ponemos lona o cubrimos con madera cuando ya se puede hacer sin riesgo. Le ayudamos con el estimado y con el registro de la reparación. Si hay pago, lo decide su aseguradora.",
    },
  ],
  helpTitle: "Lo que sí hacemos en el reclamo",
  help: [
    "Fotografiar el daño, de lejos y de cerca, antes de limpiar, cuando sea seguro.",
    "Trabajo de emergencia para que el daño no siga: lona en el techo, cubrir la abertura, sacar el agua y secar. Muchas pólizas piden que usted evite que el daño aumente. Ese trabajo no significa que se lo vayan a reembolsar.",
    "Estar en la propiedad cuando llegue el ajustador, si usted quiere, y explicarle lo que vimos en el edificio.",
    "Preparar un estimado detallado de la reparación. El estimado es el precio del trabajo. No es el pago del reclamo.",
    "Seguir con la reparación y compartirle fotos y notas para que usted se las pase a la aseguradora.",
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
    a: "We help document what happened, and we dry and repair what you hire us to do. Flooding from rising water is often a different policy from a homeowners or dwelling policy. Check your policy or ask your insurer which one applies. A bayou flood stays a flood in our notes. We cannot promise payment.",
  },
  {
    q: "Can you help after a hurricane?",
    a: `Yes. Call ${phone} for an active opening or water inside a house, apartment building, or commercial property. We photograph the damage, tarp or board up when it is safe, and help with the drying and the repair estimate. We are not public adjusters. Your insurer decides the hurricane claim.`,
  },
  {
    q: "How do you help with a hail claim?",
    a: "We inspect and photograph the roof and any water inside before a tarp covers the opening. Then we can meet the adjuster on site and prepare a repair estimate. Your insurer decides whether the marks are hail or wear. We cannot promise the claim will be approved.",
  },
  {
    q: "What about wind and severe storms?",
    a: "We document lifted shingles, broken openings, and wet rooms, and we do the emergency work that limits more damage when it is safe. Helping you during the repair means sharing photos and a clear list of the work. We do not negotiate your settlement or give legal advice.",
  },
  {
    q: "Can you help after a tornado?",
    a: "When the area is safe to enter, we help with photos, temporary protection, water removal, and a repair estimate for homes, commercial buildings, and apartments. Coverage, deductibles, and payment are your insurer's decision. Check your policy.",
  },
];

export const claimFaqsEs: ClaimFaq[] = [
  {
    q: "¿Ayudan igual con una inundación que con el seguro de la casa?",
    a: "Documentamos lo que pasó, y secamos y reparamos lo que usted nos contrate. El agua que sube de la calle o del bayou casi siempre va en otra póliza, distinta a la de la casa. Revise su póliza o pregúntele a su aseguradora cuál aplica. Una inundación se queda como inundación en nuestras notas. No prometemos un pago.",
  },
  {
    q: "¿Pueden ayudar después de un huracán?",
    a: `Sí. Llame al ${phone} si hay una abertura o agua dentro de una casa, un edificio de apartamentos o un local. Fotografiamos el daño, ponemos lona o cubrimos la abertura con madera cuando es seguro, y ayudamos con el secado y el estimado. No somos ajustadores públicos. Su aseguradora decide el reclamo del huracán.`,
  },
  {
    q: "¿Cómo ayudan con un reclamo por granizo?",
    a: "Revisamos y fotografiamos el techo y el agua de adentro antes de cubrir la abertura. Podemos estar cuando llegue el ajustador y preparar el estimado de la reparación. Su aseguradora decide si las marcas son granizo o desgaste. No prometemos que le aprueben el reclamo.",
  },
  {
    q: "¿Y si fue el viento o una tormenta fuerte?",
    a: "Documentamos tejas levantadas, aberturas rotas y cuartos mojados, y hacemos el trabajo de emergencia para que el daño no siga, cuando es seguro. Ayudarle durante la reparación quiere decir compartirle fotos y una lista clara del trabajo. No negociamos el arreglo con la aseguradora ni damos consejo legal.",
  },
  {
    q: "¿Pueden ayudar después de un tornado?",
    a: "Cuando ya se puede entrar sin riesgo, ayudamos con fotos, una protección temporal, sacar el agua y un estimado para casas, locales y apartamentos. La cobertura, el deducible y el pago los decide su aseguradora. Revise su póliza.",
  },
];

export function claimHelpCopy(locale: "en" | "es") {
  return locale === "es" ? claimHelpEs : claimHelpEn;
}

export function claimHelpFaqs(locale: "en" | "es") {
  return locale === "es" ? claimFaqsEs : claimFaqsEn;
}
