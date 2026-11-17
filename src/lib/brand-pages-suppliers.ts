import { site } from "@/lib/site";

const phone = site.phone.display;

const cities = [
  ["katy", "Katy"],
  ["sugar-land", "Sugar Land"],
  ["bellaire", "Bellaire"],
  ["the-woodlands", "The Woodlands"],
  ["river-oaks", "River Oaks"],
  ["memorial", "Memorial"],
  ["west-university", "West University"],
] as const;

function cityLinks(service: string, noun: string, locale: "en" | "es") {
  const prep = locale === "es" ? "en" : "in";
  return cities.map(([slug, name]) => ({
    href: `/${service}-${slug}-tx`,
    label: `${noun} ${prep} ${name}`,
  }));
}

const abcEn = {
  slug: "abc-supply-roofing-siding-houston",
  locale: "en" as const,
  path: "/abc-supply-roofing-siding-houston",
  enPath: "/abc-supply-roofing-siding-houston",
  esPath: "/es/abc-supply-roofing-siding-houston",
  metaTitle: "ABC Supply Roofing Houston",
  description:
    "ABC Supply roofing and siding in Houston. We buy the materials and install the roof, wall, or gutters. Request an estimate. Call (713) 909-0034.",
  eyebrow: "ABC Supply",
  title: ["ABC Supply roofing", "and siding."],
  lede: `Need roofing or siding work in Houston? Elite Restorations buys quality roofing, siding and gutter materials from ABC Supply and installs them on your home, whether it's a full replacement, a repair, new siding or new gutters. ABC Supply has been supplying building materials since 1982, and we've been a family-owned Houston company since 1993. Call ${phone} to schedule an estimate.`,
  crumbs: [
    { name: "Services", path: "/services" },
    { name: "Roofing", path: "/roofing" },
    { name: "ABC Supply", path: "/abc-supply-roofing-siding-houston" },
  ],
  image: "/images/projects/roofing/brick-home-multi-gable.webp",
  serviceName: "ABC Supply roofing and siding in Houston",
  relatedHeading: "Neighborhoods and related exterior work",
  ctaTitle: "Planning a roof or siding from ABC Supply?",
  ctaBody: `Call ${phone} and we will look at the roof or the wall. Request an estimate. We buy the materials from ABC Supply and install them. If a claim is involved, your insurer decides it.`,
  sections: [
    {
      eyebrow: "The supplier",
      heading: "What we buy from ABC Supply Co.",
      paragraphs: [
        "Homeowners searching for an ABC Supply roofing contractor in Houston are usually looking for the company that will buy the shingles and put them on the house. ABC Supply Co. is a wholesale supplier of roofing and exterior products. Branches around Houston sell to contractors. The materials include architectural asphalt shingles, underlayment, starter, hip and ridge, flashing and vent metal, gutters, downspouts, and siding. Elite Restorations buys those materials from ABC Supply and installs them. We are the contractor on the house. You do not have to open an account at the branch.",
        "Orders go to Houston-area branches, including the roofing yards and a gutter-and-siding branch at 14904 North Freeway. Published hours there have been weekday mornings into the afternoon. Hours change, and a branch can be out of a color, so we confirm what is actually on the shelf before a tear-off or a siding day is scheduled. On this page, we buy those roofing and siding materials from ABC Supply and install them on your house. ABC Supply is a trademark of its owner. Elite Restorations is an independent contractor and is not affiliated with ABC Supply.",
      ],
    },
    {
      eyebrow: "Replacement",
      heading: "What a roof replacement includes.",
      paragraphs: [
        "A replacement starts on the roof you have. We photograph the slopes and say whether a repair will hold or the shingles need to come off. Tear-off is how the wood shows up. Soft decking is common where a valley, a pipe boot, or a wall flashing has been leaking, especially on brick houses in Memorial and Bellaire. That wood is extra work. We stop and show you before the job grows past the roof that was priced. We do not cover a worn roof and call it new.",
        "Once the deck is sound, the materials we bought from ABC Supply go on in order: underlayment, starter at the eaves, the field shingles, hip and ridge, and metal at valleys, walls, and pipes. Attic vents are planned with the shingles, because a Houston attic runs hot. A walkable one-story is often a few days on site once the material is in the yard. Steep, cut-up, or two-story roofs, and any roof that needs new decking, take longer. Rain pauses a tear-off. We tell you the order and the days after the inspection.",
      ],
    },
    {
      eyebrow: "Storms",
      heading: "Hail, wind, and when a repair still makes sense.",
      paragraphs: [
        "Spring squalls mark roofs from Katy and Sugar Land through Memorial, Bellaire, River Oaks, and The Woodlands. The house can still look ordinary from the curb. Hail bruises shingles and knocks granules into the gutters. It also dents soft metal on vents, gutters, and flue caps. Wind lifts edges and pulls flashing at a side wall. The front slope can be calm while the west slope took the hail. We look at every slope before we say the roof needs to come off.",
        "A repair is right when the rest of the roof can still shed water and a matching shingle can be bought from ABC Supply. Replacement is right when the bruises run across the slopes, the shingles are brittle, or the color is no longer made. South and west slopes fade faster than north slopes, so a new bundle beside older shingles often will not blend. We say that before a patch is ordered. If water is coming in, we tarp when the roof is safe to stand on. A tarp is temporary. Hurricane season is June 1 through November 30, and hail is not only a hurricane problem.",
      ],
    },
    {
      eyebrow: "Siding",
      heading: "Siding we buy and install.",
      paragraphs: [
        "Siding from ABC Supply is the wall the street sees: lap, board-and-batten, and fiber cement, plus the trim at corners, windows, and the roof edge. We buy the boards and the trim and we install them. A full wall is the old material off, a look at the sheathing, a wrap where the wall needs it, then the new courses, with cut ends sealed the way that product requires. A section can be replaced when the profile still exists. A cracked board is replaced. It is not filled and painted over as if the crack were gone.",
        "South and west walls in Houston fade. A new board beside a ten-year-old wall often will not match the color as it looks today. We say when a patch will show and when the plane needs more than that one course. Fiber-cement siding is one of the products we install. The purchase is the same either way: we buy the siding from ABC Supply and put it on the house. The same storm that marked the wall may have marked the roof. That is a separate look, and we do not treat a siding patch as a finished roof.",
      ],
    },
    {
      eyebrow: "Gutters",
      heading: "Gutters hung after the roof, not before.",
      paragraphs: [
        "Gutters and downspouts are part of the same exterior order when the eave is in the job. We buy the gutter material from ABC Supply and hang it. A Houston gutter either carries a hard rain to a downspout away from the slab or it dumps that rain on the brick. We look at slope, hangers, corners, and the board behind the gutter. A new gutter on rotten fascia will sag. If the board is soft, that wood is part of the work, and we say so before the hangers go in.",
        "If the roof is about to come off, the new gutters wait. A tear-off bends fresh metal. Hail that dented the shingles often dented the gutters too, and those are two lines on an estimate, one storm. Downspouts are aimed off the foundation, with an extension or a splash block, because flat lots in Alief, Westchase, and much of Katy hold water against the slab. Leaves in a quiet gutter are not a new gutter. A stretch the wind pulled off the board is the replacement we price.",
      ],
    },
    {
      eyebrow: "The visit",
      heading: "Claims, timing, and where we work.",
      paragraphs: [
        "We photograph the roof, the siding, or the gutters before a tarp hides an opening, when that is safe. We can meet your adjuster on the house and walk through what we saw. The estimate we write is the price of the construction: the tear-off or the repair, the materials we buy from ABC Supply, the flashing, the vents, the siding or the gutters, and any decking or fascia we can already see. It is not the amount the claim will pay. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. Your insurer decides coverage and payment. We are not public adjusters. We do not give legal advice.",
        `A Texas wind or hail deductible is often a percentage on your declarations page. We do not have that number and we will not invent it. Visits are scheduled from our office in west Houston (77082). Scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM. Call ${phone} to schedule an estimate. We install these roofs, walls, and gutters across Houston, including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University. Family-owned since 1993.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Do you buy roofing and siding from ABC Supply and install it in Houston?",
      a: `Yes. We buy roofing, siding, and gutter materials from ABC Supply Co. and install them. We are the contractor on the house. Call ${phone} to have the roof or the wall looked at.`,
    },
    {
      q: "What does a roof replacement with ABC Supply materials include?",
      a: "Tear-off, a look at the wood, then underlayment, starter, the field shingles, hip and ridge, flashing, and vents. Decking that is soft is extra, and we show you before that work is added. A walkable one-story is often a few days once the material is here.",
    },
    {
      q: "Do you repair hail and wind damage, or only replace the roof?",
      a: "Both. A repair is right when the rest of the roof can still shed water and a matching shingle can be bought. Replacement is right when the slopes are bruised, brittle, or the color cannot be matched. If water is coming in, we tarp when it is safe to stand on the roof.",
    },
    {
      q: "Do you install siding bought from ABC Supply?",
      a: "Yes. Lap, board-and-batten, and fiber cement, with the trim at corners and windows. A section can be replaced when the profile exists. South and west walls fade, and we say when a new board will show.",
    },
    {
      q: "Do you hang gutters bought from ABC Supply?",
      a: "Yes. We buy the gutter material and hang it, with downspouts aimed off the slab. New gutters wait until a roof tear-off is finished, so the metal is not bent. Soft fascia is part of the conversation before the hangers go in.",
    },
    {
      q: "Will you document a storm for an insurance claim?",
      a: "We photograph the damage, we can meet your adjuster on site, and the estimate is the price of the construction. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. Your insurer decides coverage and payment. We are not public adjusters.",
    },
    {
      q: "Where do you install ABC Supply materials, and how do I reach you?",
      a: `From our office in west Houston (77082), across Houston and nearby cities including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University. Call ${phone}. Family-owned since 1993.`,
    },
  ],
  related: [
    ...cityLinks("roofing", "Roofing", "en"),
    { href: "/roofing", label: "Houston roofing" },
    { href: "/siding", label: "Siding in Houston" },
    { href: "/gutters", label: "Gutters in Houston" },
    { href: "/roof-replacement", label: "Houston roof replacement" },
    { href: "/insurance-claims", label: "Insurance claims help" },
    { href: "/houston-storm-damage", label: "Houston storm damage help" },
    { href: "/certainteed-roofing-houston", label: "CertainTeed shingle roofing in Houston" },
    { href: "/james-hardie-siding-houston", label: "James Hardie siding in Houston" },
  ],
};

const fergusonEn = {
  slug: "ferguson-plumbing-fixtures-installation-houston",
  locale: "en" as const,
  path: "/ferguson-plumbing-fixtures-installation-houston",
  enPath: "/ferguson-plumbing-fixtures-installation-houston",
  esPath: "/es/ferguson-plumbing-fixtures-installation-houston",
  metaTitle: "Ferguson Fixtures Houston",
  description:
    "Ferguson fixture installation in Houston for kitchens and baths. We buy the fixtures and set them. Request an estimate. Call (713) 909-0034.",
  eyebrow: "Ferguson",
  title: ["Ferguson fixtures", "in Houston."],
  lede: `Upgrading your kitchen or bathroom in Houston? Elite Restorations buys faucets, sinks, toilets, showers, tubs, water heaters and appliances from Ferguson and installs them during remodels or after leak repairs. Ferguson has been supplying plumbing products since 1953, and we've been a family-owned Houston company since 1993. Call ${phone} to schedule an estimate.`,
  crumbs: [
    { name: "Services", path: "/services" },
    { name: "Bathrooms", path: "/bathroom-remodeling" },
    { name: "Ferguson", path: "/ferguson-plumbing-fixtures-installation-houston" },
  ],
  image: "/images/services/bathroom-remodeling.jpg",
  serviceName: "Ferguson fixture installation in Houston",
  relatedHeading: "Neighborhoods and related remodel work",
  ctaTitle: "Planning Ferguson fixtures?",
  ctaBody: `Call ${phone} and we will look at the kitchen or the bath. Request an estimate. We buy the fixtures from Ferguson and install them. If a claim is involved, your insurer decides it.`,
  sections: [
    {
      eyebrow: "The supplier",
      heading: "What we buy from Ferguson.",
      paragraphs: [
        "People looking for Ferguson fixtures installation in Houston, or for plumbing fixture installation during a bathroom remodel, want the faucet and the shower actually set, not a picture of a showroom. Ferguson sells plumbing fixtures and the products around them: faucets, sinks, toilets, showers, tubs, water heaters, and appliances. Ferguson Home is the showroom name. The Houston gallery is the Ferguson Bath, Kitchen & Lighting Gallery at 4211 Richmond Avenue, Houston, TX 77027. You can look at a faucet and a shower there. Appointments are recommended, and posted hours change, so confirm with Ferguson before you drive.",
        "We buy the fixtures the job needs from Ferguson and we install them. You are not hiring the showroom to open the wall. We are the contractor on the house: the valve, the supply lines, the drain, the setting of the toilet, the water heater, and a test for leaks before we leave. We can meet you at the gallery when that helps. The decision is still the fixture in front of you. Ferguson is a trademark of its owner. Elite Restorations is an independent contractor and is not affiliated with Ferguson.",
      ],
    },
    {
      eyebrow: "The bath",
      heading: "Showers, tubs, toilets, and faucets.",
      paragraphs: [
        "A bathroom remodel is a small room with a lot of wet connections. The shower valve is set before the wall is closed, at the depth the trim will need, and the waterproofing goes on before the tile. A trim kit bought later cannot correct a valve that is buried crooked. Tubs are set level, with the drain connected and tested, before the surround or the tile closes them in. A toilet sits on a flange that meets the finished floor. If the floor is about to change thickness, we set the flange for that floor, not for the floor that is leaving.",
        "Older houses in Bellaire, West University, and River Oaks often have drains that will not move as far as a new drawing wants. A slab house in Katy or The Woodlands has a different limit: the toilet and the shower drain are in the concrete. We measure what can move before we say a wall or a drain can shift. Faucets are chosen with the sink. A widespread faucet and a single-hole faucet are not the same holes. We buy the trim you picked at Ferguson Home and we set it after the sink is in and the lines are holding water.",
      ],
    },
    {
      eyebrow: "The kitchen",
      heading: "Sinks, faucets, and appliances in a kitchen.",
      paragraphs: [
        "A kitchen sink and the faucet holes are decided before a stone counter is cut. The cutout cannot be guessed from a catalog photo. We measure the sink you bought, including an apron front that has to fit the cabinet below, and the faucet holes match the faucet from Ferguson. A disposal and a dishwasher need the drain and the supply to line up with the cabinet that is actually there. We reconnect them and run the water before we leave the sink.",
        "Appliances from Ferguson, when the remodel includes them, are set when the opening is ready: the width, the height, and the utilities. A dishwasher that leaks at the supply line is a common Houston call, and the repair is the connection and the dry-out, not a new kitchen by default. If the counter is stone from another supplier, the sink still has to match the cut. We buy the fixture from Ferguson. The counter is its own job. Paint and the last caulk wait until the sink is in and holding water.",
      ],
    },
    {
      eyebrow: "Water heaters",
      heading: "Water heaters after a leak, or in a remodel.",
      paragraphs: [
        "A water heater we buy from Ferguson is either a tank or a tankless unit, sized for the baths in the house, not for a slogan on the box. A tank sits in a pan with a drain that can actually leave the room. The relief valve on the tank needs a discharge line that ends where water can get out. A gas heater needs a vent that carries exhaust outside. An electric heater needs a circuit that matches the unit. We do not set a new heater into a closet that is still wet from the one that failed.",
        "When a heater has already leaked, the job is the water first. Standing water, wet drywall, and a soaked floor are dried before a new tank is slid into place. A pan full of rust is a reason to replace the pan, not only the heater. When the leak damaged the house, we photograph the heater, the pan, and the rooms the water reached. The estimate separates the drying and the rebuild from the new heater. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. Your insurer decides coverage and payment. We are not public adjusters. We do not give legal advice.",
      ],
    },
    {
      eyebrow: "After a leak",
      heading: "Replacing fixtures after a supply line, an overflow, or a flood.",
      paragraphs: [
        "A toilet that overflowed, a supply line that let go under a sink, or a heater that emptied onto a slab can leave fixtures that are not worth resetting as they are. A faucet on a swollen vanity is not a faucet we put back on that vanity. The cabinet is dried or replaced first. A toilet that rocked and broke the seal is reset on a sound flange. A shower valve that was opened because the wall was wet goes back only after the cavity is dry and the waterproofing is back in place.",
        "We buy the replacement fixture from Ferguson when the old one failed or when you are changing it as part of the repair. The room is dried before the finish goes back. Houston humidity makes a wall look ready while a meter still reads wet, especially on a slab. We do not close a damp wall with a new valve cover and call the room finished. If the work is a planned remodel with no leak, we describe it as construction. The two jobs are not the same estimate, and we do not write them as if they were.",
      ],
    },
    {
      eyebrow: "The visit",
      heading: "How long the fixture work takes, and where we work.",
      paragraphs: [
        "A single faucet or a toilet reset is often part of a day once the fixture is here. A shower that needs a new valve, waterproofing, and tile is a sequence of days, and the tile cannot start until the waterproofing is ready. A kitchen sink waits on the counter. A water heater is often one visit after the old unit is out and the closet is dry, unless the vent, the pan drain, or the gas piping has to be rebuilt. We name those steps after we see the room, including what has to dry before anything new is set.",
        `Visits are scheduled from our office in west Houston (77082). Scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM. Call ${phone} to schedule an estimate. We install these fixtures across Houston, including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University. Family-owned since 1993.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Do you install Ferguson fixtures in Houston?",
      a: `Yes. We buy faucets, sinks, toilets, showers, tubs, water heaters, and appliances from Ferguson and install them. Plumbing fixture installation is part of the remodel or the repair. Call ${phone} to look at the kitchen or the bath.`,
    },
    {
      q: "Can we choose the fixtures at the Ferguson showroom?",
      a: "Yes. Ferguson Home, the Ferguson Bath, Kitchen & Lighting Gallery, is at 4211 Richmond Avenue, Houston, TX 77027. You can look at the fixtures there. Confirm their hours before you drive, because the showroom sets those hours. We buy the fixtures the job needs and we install them.",
    },
    {
      q: "Do you set showers, tubs, toilets, and faucets?",
      a: "Yes. The shower valve goes in before the wall is closed, and the waterproofing goes on before the tile. A toilet is set to the finished floor. Faucet holes have to match the faucet you picked at Ferguson.",
    },
    {
      q: "Do you install water heaters from Ferguson?",
      a: "Yes. Tank and tankless units, with a pan and a drain on a tank, and a vent that leaves the house on a gas unit. We do not set a new heater in a closet that is still wet.",
    },
    {
      q: "Do you install fixtures as part of a kitchen or bathroom remodel?",
      a: "Yes. A bathroom remodel with Ferguson fixtures follows the valve, then the waterproofing, then the tile. The sink and faucet are chosen before a stone counter is cut. We buy the fixtures from Ferguson and set them.",
    },
    {
      q: "Can you replace fixtures after a leak or a water-damage repair?",
      a: "Yes, after the room is dry and the cabinet or the wall behind the fixture is sound. A new faucet does not go on a swollen vanity. We photograph the damage. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster.",
    },
    {
      q: "Will you document the fixture work for a claim, and where do you work?",
      a: "We photograph the damage and the repair. The estimate is the price of the construction and the fixtures. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. Your insurer decides coverage and payment. We are not public adjusters. We work from our office in west Houston (77082), including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University.",
    },
  ],
  related: [
    ...cityLinks("bathroom-remodeling", "Bathroom remodeling", "en"),
    { href: "/bathroom-remodeling", label: "Bathroom remodeling in Houston" },
    { href: "/kitchen-remodeling", label: "Kitchen remodeling in Houston" },
    { href: "/water-damage-restoration", label: "Water damage restoration in Houston" },
    { href: "/insurance-claims", label: "Insurance claims help" },
    { href: "/water-heater-leak-damage-houston", label: "Water heater leak damage" },
    { href: "/toilet-overflow-water-damage-houston", label: "Toilet overflow damage" },
    { href: "/expo-stone-countertops-houston", label: "Expo Stone countertops in Houston" },
  ],
};

const abcEs = {
  slug: "abc-supply-roofing-siding-houston",
  locale: "es" as const,
  path: "/es/abc-supply-roofing-siding-houston",
  enPath: "/abc-supply-roofing-siding-houston",
  esPath: "/es/abc-supply-roofing-siding-houston",
  metaTitle: "Techos ABC Supply en Houston",
  description:
    "Techos y siding ABC Supply en Houston. Compramos el material e instalamos el techo, el muro o las canaletas. Pida un estimado. Llame al (713) 909-0034.",
  eyebrow: "ABC Supply",
  title: ["Techos y siding", "ABC Supply."],
  lede: `¿Necesita trabajo de techo o de siding en Houston? Elite Restorations compra materiales de techo, siding y canaletas en ABC Supply Co. y los instala en su casa, ya sea un cambio completo, una reparación, siding nuevo o canaletas nuevas. ABC Supply surte materiales de construcción desde 1982, y somos una empresa familiar en Houston desde 1993. Llame al ${phone} para pedir un estimado.`,
  crumbs: [
    { name: "Servicios", path: "/es" },
    { name: "Techos", path: "/es/roofing" },
    { name: "ABC Supply", path: "/es/abc-supply-roofing-siding-houston" },
  ],
  image: "/images/projects/roofing/brick-home-multi-gable.webp",
  serviceName: "Techos y siding ABC Supply en Houston",
  relatedHeading: "Vecindarios y exterior relacionado",
  ctaTitle: "¿Planea techo o siding de ABC Supply?",
  ctaBody: `Llame al ${phone} y vemos el techo o el muro. Pida un estimado. Compramos el material en ABC Supply y lo instalamos. Si hay un reclamo, su aseguradora lo decide.`,
  sections: [
    {
      eyebrow: "El proveedor",
      heading: "Qué compramos en ABC Supply Co.",
      paragraphs: [
        "Quien busca un contratista de techos ABC Supply en Houston suele buscar a quien compra la teja y la pone en la casa. ABC Supply Co. es un proveedor mayorista de techos y productos de exterior. Las sucursales del área de Houston venden a contratistas. El material incluye teja arquitectónica de asfalto, fieltro o sintética de base, arranque, cumbrera, metal de valles y tubos, canaletas, bajantes y siding. Elite Restorations compra ese material en ABC Supply y lo instala. Nosotros somos el contratista en la casa.",
        "Los pedidos van a sucursales del área de Houston, incluidos los patios de techo y una sucursal de canaletas y siding en 14904 North Freeway. El horario que han publicado ahí ha sido por la mañana y hasta la tarde, entre semana. Los horarios cambian, y una sucursal puede no tener un color, así que confirmamos lo que de verdad hay antes de agendar el día de quitar el techo o el día del siding. En esta página compramos ese material de techo y de siding en ABC Supply y lo instalamos en su casa. ABC Supply es una marca de su dueño. Elite Restorations es un contratista independiente y no está afiliado a ABC Supply.",
      ],
    },
    {
      eyebrow: "El cambio",
      heading: "Qué incluye un cambio de techo.",
      paragraphs: [
        "Un cambio empieza en el techo que usted tiene. Fotografiamos las caídas y decimos si una reparación aguanta o si la teja tiene que salir. Quitar lo viejo es como se ve la madera. La madera blanda es común donde un valle, un tubo o el metal de un muro han estado goteando, sobre todo en casas de ladrillo de Memorial y Bellaire. Esa madera es trabajo de más. Nos detenemos y se la enseñamos antes de que el trabajo crezca más allá del techo que se cotizó.",
        "Cuando la madera está sana, el material que compramos en ABC Supply entra en orden: la base, el arranque en los aleros, la teja del campo, la cumbrera y el metal en valles, muros y tubos. La ventilación del ático se planea con la teja, porque un ático de Houston se pone caliente. Una casa de un piso, donde se puede caminar, suele ser unos días en el sitio cuando el material ya está. Los techos empinados, recortados o de dos pisos, y cualquiera que necesite madera nueva, tardan más. La lluvia detiene el día de quitar. El orden y los días se los decimos después de la inspección.",
      ],
    },
    {
      eyebrow: "Tormentas",
      heading: "Granizo, viento y cuándo una reparación todavía sirve.",
      paragraphs: [
        "Las tormentas de primavera marcan techos desde Katy y Sugar Land hasta Memorial, Bellaire, River Oaks y The Woodlands. La casa puede verse normal desde la banqueta. El granizo golpea la teja y suelta gránulos en las canaletas. También abolla el metal blando de los tubos, las canaletas y las chimeneas. El viento levanta orillas y jala el metal de un muro lateral. La caída de enfrente puede estar tranquila y la del oeste haber recibido el granizo. Vemos cada caída antes de decir que el techo tiene que salir.",
        "Una reparación sirve cuando el resto del techo todavía saca el agua y se puede comprar una teja que coincida en ABC Supply. El cambio sirve cuando los golpes cubren las caídas, la teja está quebradiza o el color ya no se fabrica. Las caídas sur y oeste se destiñen más rápido que las del norte, así que un bulto nuevo junto a teja vieja muchas veces no se mezcla. Lo decimos antes de pedir un parche. Si entra agua, ponemos lona cuando se puede estar en el techo. La lona es temporal. La temporada de huracanes es del 1 de junio al 30 de noviembre, y el granizo no es solo un problema de huracán.",
      ],
    },
    {
      eyebrow: "Siding",
      heading: "Siding que compramos e instalamos.",
      paragraphs: [
        "El siding de ABC Supply es el muro que ve la calle: tablas traslapadas, board-and-batten y fibrocemento, más la moldura en esquinas, ventanas y el borde del techo. Compramos las tablas y la moldura y las instalamos. Un muro completo es quitar lo viejo, ver el entablado, una barrera donde el muro la necesita, y luego las hileras nuevas, con los cortes sellados como pide ese producto. Un tramo se puede cambiar cuando el perfil todavía existe. Una tabla quebrada se reemplaza. No se rellena y se pinta como si la grieta ya no estuviera.",
        "En Houston los muros sur y oeste se destiñen. Una tabla nueva junto a un muro de diez años muchas veces no va a coincidir con el color como se ve hoy. Decimos cuándo un parche se va a notar y cuándo el plano necesita más que esa hilera. El fibrocemento es uno de los productos que instalamos. La compra es la misma: compramos el siding en ABC Supply y lo ponemos en la casa. La misma tormenta que marcó el muro pudo marcar el techo. Eso se ve aparte, y un parche de siding no es un techo terminado.",
      ],
    },
    {
      eyebrow: "Canaletas",
      heading: "Canaletas después del techo, no antes.",
      paragraphs: [
        "Las canaletas y los bajantes entran en el mismo trabajo de exterior cuando el alero está en el proyecto. Compramos el material de canaleta en ABC Supply y lo colgamos. Una canaleta de Houston o lleva una lluvia fuerte a un bajante lejos de la losa, o tira esa lluvia sobre el ladrillo. Vemos la pendiente, los soportes, las esquinas y la tabla detrás de la canaleta. Una canaleta nueva sobre una fascia podrida se va a colgar. Si la tabla está blanda, esa madera es parte del trabajo, y lo decimos antes de poner los soportes.",
        "Si el techo está por salir, las canaletas nuevas esperan. Quitar el techo dobla el metal nuevo. El granizo que abolló la teja muchas veces abolló las canaletas, y son dos líneas en un estimado, una tormenta. Los bajantes se apuntan lejos de la cimentación, con una extensión o un bloque, porque los lotes planos de Alief, Westchase y gran parte de Katy dejan el agua contra la losa. Las hojas en una canaleta quieta no son una canaleta nueva. Un tramo que el viento arrancó de la tabla es el cambio que cotizamos.",
      ],
    },
    {
      eyebrow: "La visita",
      heading: "Reclamos, tiempos y dónde trabajamos.",
      paragraphs: [
        "Fotografiamos el techo, el siding o las canaletas antes de que la lona tape una abertura, cuando es seguro. Podemos estar cuando llegue su ajustador y caminar lo que vimos. El estimado que escribimos es el precio de la construcción: quitar o reparar, el material que compramos en ABC Supply, el metal, la ventilación, el siding o las canaletas, y la madera o la fascia que ya se puede ver. No es la cantidad que el reclamo va a pagar. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Su aseguradora decide la cobertura y el pago. No somos ajustadores públicos. No damos consejo legal.",
        `Un deducible de viento o granizo en Texas suele ser un porcentaje en su página de declaraciones. No tenemos ese número y no lo inventamos. Trabajamos desde nuestra oficina en el oeste de Houston (77082). Las visitas programadas son de lunes a sábado, de 8:00 AM a 6:00 PM. Llame al ${phone} para pedir un estimado. Instalamos estos techos, muros y canaletas en Houston, incluidos Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University. Empresa familiar desde 1993.`,
      ],
    },
  ],
  faqs: [
    {
      q: "¿Compran techos y siding en ABC Supply y los instalan en Houston?",
      a: `Sí. Compramos material de techo, siding y canaletas en ABC Supply Co. y lo instalamos. Nosotros somos el contratista en la casa. Llame al ${phone} para ver el techo o el muro.`,
    },
    {
      q: "¿Qué incluye un cambio de techo con material de ABC Supply?",
      a: "Quitar lo viejo, ver la madera, y luego la base, el arranque, la teja del campo, la cumbrera, el metal y la ventilación. La madera blanda es de más, y se la enseñamos antes de añadir ese trabajo. Una casa de un piso suele ser unos días cuando el material ya está.",
    },
    {
      q: "¿Reparan daño de granizo y viento, o solo cambian el techo?",
      a: "Las dos cosas. Una reparación sirve cuando el resto del techo todavía saca el agua y se puede comprar una teja que coincida. El cambio sirve cuando las caídas están golpeadas, quebradizas o el color no se puede igualar. Si entra agua, ponemos lona cuando se puede estar en el techo.",
    },
    {
      q: "¿Instalan siding comprado en ABC Supply?",
      a: "Sí. Tablas traslapadas, board-and-batten y fibrocemento, con la moldura en esquinas y ventanas. Un tramo se puede cambiar cuando el perfil existe. Los muros sur y oeste se destiñen, y decimos cuándo una tabla nueva se va a ver.",
    },
    {
      q: "¿Cuelgan canaletas compradas en ABC Supply?",
      a: "Sí. Compramos el material y lo colgamos, con bajantes lejos de la losa. Las canaletas nuevas esperan a que termine de quitarse el techo, para que el metal no se doble. La fascia blanda se habla antes de poner los soportes.",
    },
    {
      q: "¿Documentan una tormenta para un reclamo de seguro?",
      a: "Fotografiamos el daño, podemos estar con su ajustador, y el estimado es el precio de la construcción. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Su aseguradora decide. No somos ajustadores públicos.",
    },
    {
      q: "¿Dónde instalan material de ABC Supply y cómo los contacto?",
      a: `Desde la oficina en nuestra oficina en el oeste de Houston (77082), en Houston y ciudades cercanas, incluidas Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University. Llame al ${phone}. Empresa familiar desde 1993.`,
    },
  ],
  related: [
    ...cityLinks("roofing", "Techos", "es"),
    { href: "/es/roofing", label: "Techos en Houston" },
    { href: "/es/siding", label: "Siding en Houston" },
    { href: "/es/roof-replacement", label: "Cambio de techo en Houston" },
    { href: "/es/insurance-claims", label: "Ayuda con reclamos de seguro" },
    { href: "/es/houston-storm-damage", label: "Ayuda por tormenta en Houston" },
    { href: "/es/certainteed-roofing-houston", label: "Techos CertainTeed en Houston" },
    { href: "/es/james-hardie-siding-houston", label: "Siding James Hardie en Houston" },
  ],
};

const fergusonEs = {
  slug: "ferguson-plumbing-fixtures-installation-houston",
  locale: "es" as const,
  path: "/es/ferguson-plumbing-fixtures-installation-houston",
  enPath: "/ferguson-plumbing-fixtures-installation-houston",
  esPath: "/es/ferguson-plumbing-fixtures-installation-houston",
  metaTitle: "Plomería Ferguson en Houston",
  description:
    "Instalación de accesorios Ferguson en Houston para cocinas y baños. Compramos las piezas y las ponemos. Pida un estimado. Llame al (713) 909-0034.",
  eyebrow: "Ferguson",
  title: ["Accesorios Ferguson", "en Houston."],
  lede: `¿Va a renovar la cocina o el baño en Houston? Elite Restorations compra llaves, fregaderos, inodoros, regaderas, tinas, calentadores y aparatos en Ferguson y los instala en la remodelación o después de reparar una fuga. Ferguson surte productos de plomería desde 1953, y somos una empresa familiar en Houston desde 1993. Llame al ${phone} para pedir un estimado.`,
  crumbs: [
    { name: "Servicios", path: "/es" },
    { name: "Baños", path: "/es/bathroom-remodeling" },
    { name: "Ferguson", path: "/es/ferguson-plumbing-fixtures-installation-houston" },
  ],
  image: "/images/services/bathroom-remodeling.jpg",
  serviceName: "Instalación de accesorios Ferguson en Houston",
  relatedHeading: "Vecindarios y remodelación relacionada",
  ctaTitle: "¿Planea accesorios Ferguson?",
  ctaBody: `Llame al ${phone} y vemos la cocina o el baño. Pida un estimado. Compramos los accesorios en Ferguson y los instalamos. Si hay un reclamo, su aseguradora lo decide.`,
  sections: [
    {
      eyebrow: "El proveedor",
      heading: "Qué compramos en Ferguson.",
      paragraphs: [
        "Quien busca instalación de accesorios Ferguson en Houston, o instalación de accesorios de plomería en una remodelación de baño, quiere la llave y la regadera puestas, no una foto de un salón. Ferguson vende accesorios de plomería y lo que va con ellos: llaves, fregaderos, lavabos, inodoros, regaderas, tinas, calentadores de agua y aparatos. Ferguson Home es el nombre del salón. La galería de Houston es el Ferguson Bath, Kitchen & Lighting Gallery, en 4211 Richmond Avenue, Houston, TX 77027. Ahí se puede ver una llave y una regadera. Recomiendan cita, y el horario publicado cambia, así que confirme con Ferguson antes de ir.",
        "Compramos los accesorios que el trabajo necesita en Ferguson y los instalamos. Usted no contrata al salón para abrir la pared. Nosotros somos el contratista en la casa: la válvula, los tubos de suministro, el desagüe, el asiento del inodoro, el calentador y una prueba de fugas antes de irnos. Podemos acompañarlo en la galería cuando eso ayuda. Ferguson es una marca de su dueño. Elite Restorations es un contratista independiente y no está afiliado a Ferguson.",
      ],
    },
    {
      eyebrow: "El baño",
      heading: "Regaderas, tinas, inodoros y llaves.",
      paragraphs: [
        "Una remodelación de baño es un cuarto pequeño con muchas conexiones mojadas. La válvula de la regadera se pone antes de cerrar la pared, a la profundidad que va a pedir el acabado, y la impermeabilización va antes de la loseta. Un kit de acabado comprado después no corrige una válvula enterrada chueca. Las tinas se asientan a nivel, con el desagüe conectado y probado, antes de que el revestimiento o la loseta las cierre. Un inodoro se sienta en un flange que llega al piso terminado. Si el piso va a cambiar de grosor, el flange se pone para ese piso, no para el piso que se va.",
        "Las casas viejas de Bellaire, West University y River Oaks muchas veces tienen desagües que no se mueven tan lejos como quiere un dibujo nuevo. Una casa de losa en Katy o The Woodlands tiene otro límite: el inodoro y el desagüe de la regadera están en el concreto. Medimos lo que se puede mover antes de decir que un muro o un desagüe puede cambiar. Las llaves se eligen con el lavabo. Una llave de tres hoyos y una de un hoyo no son los mismos hoyos. Compramos el acabado que usted eligió en Ferguson Home y lo ponemos cuando el lavabo ya está y las líneas aguantan el agua.",
      ],
    },
    {
      eyebrow: "La cocina",
      heading: "Fregaderos, llaves y aparatos en una cocina.",
      paragraphs: [
        "El fregadero de la cocina y los hoyos de la llave se deciden antes de cortar una cubierta de piedra. El corte no se adivina con una foto de catálogo. Medimos el fregadero que compró, incluido uno de delantal que tiene que caber en el gabinete de abajo, y los hoyos coinciden con la llave de Ferguson. Un triturador y un lavavajillas necesitan que el desagüe y el suministro coincidan con el gabinete que de verdad está ahí. Los reconectamos y corremos el agua antes de dejar el fregadero.",
        "Los aparatos de Ferguson, cuando la remodelación los incluye, se ponen cuando el hueco está listo: el ancho, la altura y las conexiones. Un lavavajillas que gotea en la línea de suministro es una llamada común en Houston, y la reparación es la conexión y el secado, no una cocina nueva de entrada. Si la cubierta es piedra de otro proveedor, el fregadero igual tiene que coincidir con el corte. Compramos el accesorio en Ferguson. La cubierta es otro trabajo. La pintura y el último silicón esperan a que el fregadero esté puesto y aguante el agua.",
      ],
    },
    {
      eyebrow: "Calentadores",
      heading: "Calentadores después de una fuga, o en una remodelación.",
      paragraphs: [
        "Un calentador que compramos en Ferguson es de tanque o sin tanque, del tamaño de los baños de la casa, no de una frase en la caja. Un tanque va en una charola con un desagüe que de verdad pueda salir del cuarto. La válvula de alivio del tanque necesita un tubo de descarga que termine donde el agua pueda salir. Un calentador de gas necesita un venteo que saque el escape de la casa. Uno eléctrico necesita un circuito que coincida con el aparato. No ponemos un calentador nuevo en un clóset que sigue mojado por el que falló.",
        "Cuando un calentador ya se fugó, el trabajo es el agua primero. El agua en el piso, el drywall mojado y el piso empapado se secan antes de meter un tanque nuevo. Una charola llena de óxido es razón para cambiar la charola, no solo el calentador. Cuando la fuga dañó la casa, fotografiamos el calentador, la charola y los cuartos a los que llegó el agua. El estimado separa el secado y la reconstrucción del calentador nuevo. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Su aseguradora decide la cobertura y el pago. No somos ajustadores públicos. No damos consejo legal.",
      ],
    },
    {
      eyebrow: "Después de una fuga",
      heading: "Cambiar accesorios tras un tubo, un desborde o una inundación.",
      paragraphs: [
        "Un inodoro que se desbordó, un tubo de suministro que se soltó bajo el lavabo, o un calentador que se vació sobre la losa pueden dejar accesorios que no conviene volver a poner como están. Una llave sobre un tocador hinchado no es una llave que volvemos a poner en ese tocador. El gabinete se seca o se cambia primero. Un inodoro que se meció y rompió el sello se vuelve a sentar en un flange sano. Una válvula de regadera que se abrió porque la pared estaba mojada regresa solo cuando la cavidad está seca y la impermeabilización está de nuevo en su lugar.",
        "Compramos el accesorio de repuesto en Ferguson cuando el viejo falló o cuando usted lo está cambiando como parte de la reparación. El cuarto se seca antes de que vuelva el acabado. La humedad de Houston hace que una pared se vea lista mientras el medidor sigue húmedo, sobre todo en una losa. No cerramos una pared húmeda con una cubierta nueva de válvula y llamamos al cuarto terminado. Si el trabajo es una remodelación planeada, sin fuga, la describimos como construcción. Los dos trabajos no son el mismo estimado, y no los escribimos como si lo fueran.",
      ],
    },
    {
      eyebrow: "La visita",
      heading: "Cuánto tarda el trabajo de accesorios, y dónde trabajamos.",
      paragraphs: [
        "Una sola llave o volver a sentar un inodoro suele ser parte de un día cuando el accesorio ya está. Una regadera que necesita válvula nueva, impermeabilización y loseta es una secuencia de días, y la loseta no empieza hasta que la impermeabilización está lista. Un fregadero de cocina espera a la cubierta. Un calentador suele ser una visita cuando la unidad vieja ya salió y el clóset está seco, a menos que el venteo, el desagüe de la charola o la tubería de gas haya que rehacerlos. Esos pasos los nombramos después de ver el cuarto, incluido lo que tiene que secar antes de poner algo nuevo.",
        `Trabajamos desde nuestra oficina en el oeste de Houston (77082). Las visitas programadas son de lunes a sábado, de 8:00 AM a 6:00 PM. Llame al ${phone} para pedir un estimado. Instalamos estos accesorios en Houston, incluidos Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University. Empresa familiar desde 1993.`,
      ],
    },
  ],
  faqs: [
    {
      q: "¿Instalan accesorios Ferguson en Houston?",
      a: `Sí. Compramos llaves, fregaderos, inodoros, regaderas, tinas, calentadores y aparatos en Ferguson y los instalamos. La instalación de accesorios de plomería es parte de la remodelación o de la reparación. Llame al ${phone} para ver la cocina o el baño.`,
    },
    {
      q: "¿Podemos elegir los accesorios en el salón de Ferguson?",
      a: "Sí. Ferguson Home, el Ferguson Bath, Kitchen & Lighting Gallery, está en 4211 Richmond Avenue, Houston, TX 77027. Ahí se pueden ver los accesorios. Confirme el horario con ellos antes de ir, porque ese horario lo pone el salón. Compramos los accesorios que el trabajo necesita y los instalamos.",
    },
    {
      q: "¿Ponen regaderas, tinas, inodoros y llaves?",
      a: "Sí. La válvula de la regadera entra antes de cerrar la pared, y la impermeabilización va antes de la loseta. El inodoro se sienta al piso terminado. Los hoyos de la llave tienen que coincidir con la llave que eligió en Ferguson.",
    },
    {
      q: "¿Instalan calentadores de Ferguson?",
      a: "Sí. Unidades de tanque y sin tanque, con charola y desagüe en un tanque, y un venteo que sale de la casa en una unidad de gas. No ponemos un calentador nuevo en un clóset que sigue mojado.",
    },
    {
      q: "¿Instalan accesorios en una remodelación de cocina o de baño?",
      a: "Sí. Una remodelación de baño con accesorios Ferguson sigue la válvula, luego la impermeabilización y luego la loseta. El fregadero y la llave se eligen antes de cortar una cubierta de piedra. Compramos los accesorios en Ferguson y los ponemos.",
    },
    {
      q: "¿Pueden cambiar accesorios después de una fuga o de daño de agua?",
      a: "Sí, cuando el cuarto está seco y el gabinete o la pared detrás del accesorio están sanos. Una llave nueva no va sobre un tocador hinchado. Fotografiamos el daño. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador.",
    },
    {
      q: "¿Documentan el trabajo para un reclamo y dónde trabajan?",
      a: "Fotografiamos el daño y la reparación. El estimado es el precio de la construcción y de los accesorios. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Su aseguradora decide. No somos ajustadores públicos. Trabajamos desde nuestra oficina en el oeste de Houston (77082), incluidas Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University.",
    },
  ],
  related: [
    ...cityLinks("bathroom-remodeling", "Baños", "es"),
    { href: "/es/bathroom-remodeling", label: "Remodelación de baños en Houston" },
    { href: "/es/kitchen-remodeling", label: "Remodelación de cocinas en Houston" },
    { href: "/es/water-damage-restoration", label: "Restauración por daño de agua en Houston" },
    { href: "/es/insurance-claims", label: "Ayuda con reclamos de seguro" },
    { href: "/water-heater-leak-damage-houston", label: "Daño por fuga de calentador" },
    { href: "/toilet-overflow-water-damage-houston", label: "Daño por desborde de inodoro" },
    { href: "/es/expo-stone-countertops-houston", label: "Cubiertas Expo Stone en Houston" },
  ],
};

export const supplierBrandPages = [abcEn, fergusonEn, abcEs, fergusonEs];
