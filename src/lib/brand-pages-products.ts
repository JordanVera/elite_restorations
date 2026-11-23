import { supplierBrandPages } from "@/lib/brand-pages-suppliers";
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

const sherwinEn = {
  slug: "sherwin-williams-painting-houston",
  locale: "en" as const,
  path: "/sherwin-williams-painting-houston",
  enPath: "/sherwin-williams-painting-houston",
  esPath: "/es/sherwin-williams-painting-houston",
  metaTitle: "Sherwin-Williams Painting Houston",
  description:
    "Sherwin-Williams painting in Houston for walls, trim, and sun-faded siding. Family-owned since 1993. Call (713) 909-0034 to schedule an estimate.",
  eyebrow: "Sherwin-Williams",
  title: ["Sherwin-Williams painting", "in Houston."],
  lede: `Need Sherwin-Williams painting in Houston? Elite Restorations paints interiors and exteriors with Sherwin-Williams paints, from walls and trim to siding, stucco, doors and fascia. Sherwin-Williams has been making paint since 1866, and we've been a family-owned Houston company since 1993. Call ${phone} to schedule an estimate.`,
  crumbs: [
    { name: "Services", path: "/services" },
    { name: "Painting", path: "/painting-drywall-repair" },
    { name: "Sherwin-Williams", path: "/sherwin-williams-painting-houston" },
  ],
  image: "/images/projects/bathrooms/powder-room-charcoal-walls.jpg",
  serviceName: "Sherwin-Williams painting in Houston",
  relatedHeading: "Neighborhoods and related painting",
  ctaTitle: "Planning a Sherwin-Williams repaint?",
  ctaBody: `Call ${phone} to schedule an estimate, and we will look at the walls. We use the paint. If insurance is involved, we work with your insurance company as your contractor and handle the claim scope with the adjuster.`,
  sections: [
    {
      eyebrow: "The paints",
      heading: "Duration, Emerald, SuperPaint, and ProClassic.",
      paragraphs: [
        "Duration, Emerald, SuperPaint, and ProClassic are the Sherwin-Williams lines we put on Houston houses. Duration is the exterior acrylic people ask for when siding, stucco, and trim take full sun and Gulf humidity. Emerald is the higher interior paint, and Sherwin-Williams also makes an Emerald exterior for a wall you want smoother and easier to wash. SuperPaint is the practical interior and exterior when a whole house needs a solid coat. ProClassic is the enamel for doors, trim, and cabinets, where brush marks show and the film has to be harder than a wall paint.",
        "We look at the surface before we name a line. A chalking south wall, a mildewed north wall, new fiber cement, and a patched living room are not the same paint job. Color is chosen outside, in daylight, against the brick or the siding, because a chip under a kitchen light will lie to you. Sherwin-Williams and Floor & Decor are trademarks of their owners, and we are an independent contractor. We use these paints on your house.",
      ],
    },
    {
      eyebrow: "Prep",
      heading: "What has to happen before the first coat.",
      paragraphs: [
        "Paint fails in Houston when it goes on a dirty, chalky, or damp surface. We wash the outside, including the mildew on shaded stucco and under trees, and we scrape what is loose. Chalk on an old south or west wall has to come off, or the new coat peels in sheets. Bare wood, rusted nail heads, and water stains get a primer that matches the problem. Caulk goes at windows, doors, and gaps that have opened in the heat, and then the paint.",
        "Inside, patches are floated so the repair disappears, and the texture is blended on walls that already have it. A stain from an old leak needs a stain-blocking primer or it bleeds through the finish coat. Glossy trim is sanded so the next coat has something to hold. We mask floors, stone, and hardware. The sheen is part of the decision: a flatter wall hides a patch, and a satin or enamel on trim, baths, and kitchens can be wiped down.",
      ],
    },
    {
      eyebrow: "Weather",
      heading: "Humidity, heat, and mildew.",
      paragraphs: [
        "Houston air is often wet enough that a wall is still sweating in the morning, especially on the north side and under a deep porch. Paint applied over that moisture loses its bond. We wait until the surface is dry, and we follow the temperature window printed on the can. The other failure is a dark color on a west wall in the July afternoon, when the film skins over before it can level and leaves lap marks. We start those walls earlier, or we come back when the sun has moved.",
        "Mildew is a living stain, common on shaded stucco, under live oaks, and on the back of a house that never dries. Painting over it traps it in the film. We clean it first. Inside, a bathroom or a kitchen that stays humid wants a washable sheen, and the fan has to work, because paint is not a substitute for ventilation. After a closed-up summer house, we look for condensation on the walls before we schedule the interior.",
      ],
    },
    {
      eyebrow: "Outside",
      heading: "Repainting after siding, stucco, or a storm.",
      paragraphs: [
        "New siding and new stucco need paint as part of closing the wall, not as a someday project. Fiber-cement board that arrives primed still needs paint on the field and on every cut end. A factory-finished board is a different product, and we do not paint over that finish to freshen one patch. Stucco hairline cracks are filled before the coating, because a coat of paint alone opens again with the next dry spell. If the wall already has a thick coating, we say so before we add another film that can trap water.",
        "After hail or wind, the paint is the last step, once the siding, the stucco, or the wood behind it is sound. A cracked board is replaced. A soft spot at a hose bib is opened and dried. Then we paint the repair, and usually the whole plane, because a new patch on a faded south wall will show. South and west sides fade faster here than the north. We say that before a one-gallon touch-up is ordered. The same storm may have marked the roof. That is a separate look.",
      ],
    },
    {
      eyebrow: "Inside",
      heading: "Interior paint after water damage or a remodel.",
      paragraphs: [
        "After a leak, a supply-line break, or a flood, paint waits until the drywall is dry. A wall can look ready and still read wet on a meter, and Houston humidity makes that common on a slab. We do not close a damp wall with primer. Water stains get a stain-blocking primer. If the drywall was cut out, the new board is taped, textured to the room, primed, and then painted far enough that the sheen matches. A ceiling stain from a roof leak is the same sequence once the roof is keeping water out.",
        "A kitchen or a bath remodel is painted when the drywall and the tile are done, so the color is the last layer and not a surface we have to protect through demolition. Whole rooms are painted, not a single new wall, when the old color would leave a line. Cabinets, if you want them painted, are a separate prep: degrease, sand, a bonding primer, then an enamel such as ProClassic. Wall paint on a cabinet door will not hold up to hands and cleaners.",
      ],
    },
    {
      eyebrow: "The visit",
      heading: "Timing, claims, and where we paint.",
      paragraphs: [
        `A few rooms are often a day or two once the walls are ready. A whole interior, or a two-story exterior, takes longer, and drying, repairs, and rain add days we will name after we see the house. Exterior work pauses for storms. When wind or water damaged the walls, we photograph the damage and the repair. The estimate is the price of the prep and the Sherwin-Williams paint. If insurance is involved, we work with your insurance company as your contractor and handle the claim scope with the adjuster.`,
        `Visits are scheduled from our office in west Houston (77082). Scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM. Call ${phone} to schedule an estimate. We paint houses across Houston, including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University. Family-owned since 1993.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Do you use Sherwin-Williams paint in Houston?",
      a: `Yes. We use Sherwin-Williams paints, including Duration, Emerald, SuperPaint, and ProClassic. Call ${phone} to schedule an estimate, and we will look at the walls.`,
    },
    {
      q: "Which exterior line do Houston houses usually get?",
      a: "Duration is the exterior acrylic people ask for on siding, stucco, and trim in full sun. Emerald exterior is the smoother, higher line. SuperPaint is the practical coat when the whole house needs paint. We name the line after we see the wall.",
    },
    {
      q: "Can you match the color already on the house?",
      a: "Often, if we match the wall as it looks today, in daylight, and paint far enough to hide the fade. South and west walls in Houston fade. A one-gallon touch-up on a ten-year-old plane will show, and we say so.",
    },
    {
      q: "When should exterior paint wait for the weather?",
      a: "When the wall is still damp in the morning, or when a west wall is in full afternoon sun. We follow the temperature window on the can. Mildew is washed off before any coat goes on.",
    },
    {
      q: "Do you repaint after water damage or a remodel?",
      a: "Yes, after the drywall is dry. Water stains get a stain-blocking primer. A kitchen or bath is painted when the drywall and tile are finished, usually as a whole room so the sheen matches.",
    },
    {
      q: "Will you document painting that is part of a claim?",
      a: "We photograph the damage and the repair, and the estimate is the price of the prep and the paint. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. Your insurer decides coverage and payment. We are not public adjusters.",
    },
    {
      q: "How long does a repaint take, and where do you work?",
      a: `A few ready rooms are often a day or two. A whole house takes longer, and rain or drying adds days. We work from our office in west Houston (77082), including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University.`,
    },
  ],
  related: [
    ...cityLinks("painting-drywall-repair", "Painting", "en"),
    { href: "/painting-drywall-repair", label: "Painting and drywall repair in Houston" },
    { href: "/water-damage-restoration", label: "Water damage restoration in Houston" },
    { href: "/kitchen-remodeling", label: "Kitchen remodeling in Houston" },
    { href: "/bathroom-remodeling", label: "Bathroom remodeling in Houston" },
    { href: "/insurance-claims", label: "Insurance claims help" },
    { href: "/james-hardie-siding-houston", label: "James Hardie siding in Houston" },
    { href: "/houston-storm-damage", label: "Houston storm damage help" },
  ],
};

const floorEn = {
  slug: "floor-and-decor-flooring-installation-houston",
  locale: "en" as const,
  path: "/floor-and-decor-flooring-installation-houston",
  enPath: "/floor-and-decor-flooring-installation-houston",
  esPath: "/es/floor-and-decor-flooring-installation-houston",
  metaTitle: "Floor & Decor Flooring Houston",
  description:
    "Floor & Decor flooring installation in Houston: tile, luxury vinyl plank, wood, and laminate. Call (713) 909-0034 to schedule an estimate.",
  eyebrow: "Floor & Decor",
  title: ["Floor & Decor flooring", "in Houston."],
  lede: `Looking for Floor & Decor flooring installation in Houston? Elite Restorations installs the tile, luxury vinyl plank, wood and laminate you pick out at Floor & Decor, with careful prep so your new floors look great and last. Floor & Decor has been selling flooring since 2000, and we've been a family-owned Houston company since 1993. Call ${phone} to schedule an estimate.`,
  crumbs: [
    { name: "Services", path: "/services" },
    { name: "Vinyl flooring", path: "/vinyl-flooring" },
    { name: "Floor & Decor", path: "/floor-and-decor-flooring-installation-houston" },
  ],
  image: "/images/services/vinyl-flooring.jpg",
  serviceName: "Floor & Decor flooring installation in Houston",
  relatedHeading: "Neighborhoods and related flooring",
  ctaTitle: "Planning a Floor & Decor install?",
  ctaBody: `Call ${phone} to schedule an estimate, and we will look at the floor and the slab. We install the flooring. If insurance is involved, we work with your insurance company as your contractor and handle the claim scope with the adjuster.`,
  sections: [
    {
      eyebrow: "The floors",
      heading: "Tile, LVP, wood, and laminate.",
      paragraphs: [
        "Floor & Decor sells the floors Houston houses are asking for: porcelain and ceramic tile, luxury vinyl plank, wood, and laminate. We install them. You can buy the material at the store and have us install it, or we can source it and put the product and the labor on one estimate. Either way we look at the boxes before the install is scheduled. Quantity, waste, the same dye lot, and whether that product belongs in a kitchen, a bath, or a bedroom are checked while a return is still easy.",
        "Tile wants a flat substrate and the right mortar, and large pieces show every ridge in a slab. LVP clicks together or glues down, and it only looks as flat as the floor under it. Wood in this climate is usually engineered when it sits on concrete, and it has to acclimate in the house. Laminate floats on a pad. It works in bedrooms and living rooms, and it is a poor choice where water sits. Floor & Decor and Sherwin-Williams are trademarks of their owners, and we are an independent contractor.",
      ],
    },
    {
      eyebrow: "The slab",
      heading: "Subfloor prep and moisture on a Houston foundation.",
      paragraphs: [
        "Most houses we floor in Katy, Sugar Land, Memorial, and The Woodlands are on a concrete slab. The slab is rarely flat enough for large tile or a click-together plank. Ridges, dips, old adhesive, and paint are the work before the first box is opened. We grind or fill until the floor meets the flatness the maker prints on the box. A pretty plank over a wave will telegraph the wave, and a large tile will lip at every joint.",
        "A slab also holds moisture. After a supply-line leak, a water-heater failure, or flooding, the surface can look dry while the concrete is still wet. Glue-down vinyl and wood will fail on that slab, and a floating floor can trap the moisture under it. We meter the concrete. When the product requires it, we run a moisture test before anything is glued or before wood goes down. Some older houses in Bellaire and West University are pier-and-beam, with a wood subfloor. That floor has to be dry, fastened, and flat too. We do not cover a soft spot.",
      ],
    },
    {
      eyebrow: "Water",
      heading: "Replacing a floor after a leak or a flood.",
      paragraphs: [
        "Wet carpet, swollen laminate, and cupped wood come out. The water path is mapped first, because a stain at the baseboard often means the slab or the wall cavity is wet past the room you can see. Drying is its own job: extraction, air movers, and dehumidifiers until the readings say the structure is dry. A new floor is the step after that, not the step that hides the water. Houston humidity is why a room that feels dry to your hand can still be wet on a meter.",
        "What goes back depends on the room. Tile and a vinyl plank rated for water are the usual kitchen and bath floors. Laminate that sat in floodwater is replaced, not dried and clicked back in. Engineered wood can return to a living room once the slab is dry and the maker allows that slab. We photograph the wet floor before it comes up and the new floor after. The estimate is the price of the removal, the prep, and the installation. If insurance is involved, we work with your insurance company as your contractor and handle the claim scope with the adjuster.",
      ],
    },
    {
      eyebrow: "How it goes in",
      heading: "Click, glue, mortar, and the edges.",
      paragraphs: [
        "LVP is either a click floor, floated over an approved underlayment, or a glue-down plank. The box says which. We follow that, including the expansion space at the walls. A click floor that is pinned by a tight door jamb or a cabinet will buckle in the first hot month. Glue-down needs the moisture test and a clean slab. Laminate floats on its pad, with transitions at doorways and at any place the floor changes height.",
        "Tile is set in mortar, with layout lines so a full piece lands at the front door when the room allows. Grout is part of the floor, and wet rooms get the joint the product calls for. Wood is fastened or glued the way that species and that slab allow, after it has sat in the house. Toilets and sometimes appliances come up so the floor can run underneath. Shoe molding and reducers are the last pieces, so the edge looks finished against the baseboard you have.",
      ],
    },
    {
      eyebrow: "Your boxes",
      heading: "When you buy the flooring, and when we do.",
      paragraphs: [
        "If you already bought the flooring at Floor & Decor, tell us before we visit. We need the product name, the plank or tile size, and how many boxes are in the garage. A shortage stops the job in the middle of the room. Extra boxes cover cuts and a future repair, and a different dye lot will show at the seam. If a box was the wrong product for a bath, we say so while it can still go back. We install what you bought when it fits the room and the substrate.",
        "If you want us to buy it, we choose with you and the material is on our estimate with the labor. The two arrangements are the same install. We are the contractor at the house. Bring a sample home and look at it in the room, morning and afternoon. A showroom light and a north-facing living room in Memorial are not the same color.",
      ],
    },
    {
      eyebrow: "The visit",
      heading: "How long a floor takes, and where we work.",
      paragraphs: [
        "A dry, flat room of click-together LVP is often a day once the old floor is out. Leveling, a moisture problem, tile, or a whole first floor adds days, and we separate the drying time from the install time so the calendar is honest. Furniture moving is part of the conversation before the day starts. Stairs and landings are their own pieces. We protect the rooms we are not flooring.",
        `Visits are scheduled from our office in west Houston (77082). Scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM. Call ${phone} to schedule an estimate. We install these floors across Houston, including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University. Family-owned since 1993.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Do you install Floor & Decor flooring in Houston?",
      a: `Yes. We install tile, LVP, wood, and laminate from Floor & Decor on the floor you already have. Call ${phone} to schedule an estimate, and we will come take a look.`,
    },
    {
      q: "Can I buy the flooring and have you install it?",
      a: "Yes. You can buy it at Floor & Decor, or we can source it and put the material on the same estimate as the labor. We check the quantity, the dye lot, and whether that product belongs in the room before the install is scheduled.",
    },
    {
      q: "Do you test a Houston slab for moisture?",
      a: "Yes. We meter the concrete. When the product requires it, we run a moisture test before glue-down or wood. A slab can look dry and still be wet after a leak or a flood.",
    },
    {
      q: "What has to happen to the subfloor first?",
      a: "It has to be flat, clean, and sound. Ridges and dips are ground or filled to the flatness printed on the box. On a pier-and-beam house the wood subfloor has to be dry and fastened. We do not cover a soft spot.",
    },
    {
      q: "Can you replace flooring after a flood or a supply-line leak?",
      a: "Yes, after the structure is dry. Wet flooring comes out, the slab is dried, and then the new floor goes down. Laminate that sat in floodwater is replaced.",
    },
    {
      q: "Will you document a floor for an insurance claim?",
      a: "We photograph the wet floor and the repair. The estimate is the price of the removal, the prep, and the installation. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. Your insurer decides coverage and payment. We are not public adjusters.",
    },
    {
      q: "How long does the installation take, and where do you work?",
      a: "A dry, flat room of click-together LVP is often a day once the old floor is out. Leveling, moisture, and tile add days. We work from our office in west Houston (77082), including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University.",
    },
  ],
  related: [
    ...cityLinks("vinyl-flooring", "Vinyl flooring", "en"),
    { href: "/vinyl-flooring", label: "Vinyl flooring in Houston" },
    { href: "/tile-flooring", label: "Tile flooring in Houston" },
    { href: "/wood-flooring", label: "Wood flooring in Houston" },
    { href: "/laminate-flooring", label: "Laminate flooring in Houston" },
    { href: "/water-damage-restoration", label: "Water damage restoration in Houston" },
    { href: "/kitchen-remodeling", label: "Kitchen remodeling in Houston" },
    { href: "/insurance-claims", label: "Insurance claims help" },
  ],
};

const stoneEn = {
  slug: "expo-stone-countertops-houston",
  locale: "en" as const,
  path: "/expo-stone-countertops-houston",
  enPath: "/expo-stone-countertops-houston",
  esPath: "/es/expo-stone-countertops-houston",
  metaTitle: "Expo Stones Houston Countertops",
  description:
    "Expo Stones Houston: Elite installs granite, quartz, quartzite, and marble, cut to your cabinets. Family-owned since 1993. Call (713) 909-0034.",
  eyebrow: "Expo Stone",
  title: ["Expo Stone countertops", "in Houston."],
  lede: `Want new countertops in Houston? Elite Restorations installs quartz, granite, quartzite, and marble countertops from Expo Stone for kitchens and bathrooms, cut to fit the cabinets you already have. We've been a family-owned Houston company since 1993. Call ${phone} to schedule an estimate.`,
  crumbs: [
    { name: "Services", path: "/services" },
    { name: "Countertops", path: "/countertops" },
    { name: "Expo Stone", path: "/expo-stone-countertops-houston" },
  ],
  image: "/images/services/countertops.jpg",
  serviceName: "Expo Stone countertops in Houston",
  relatedHeading: "Neighborhoods and related stone work",
  ctaTitle: "Planning Expo Stone countertops?",
  ctaBody: `Call ${phone} to schedule an estimate, and we will look at the cabinets. We template and install the stone. If insurance is involved, we work with your insurance company as your contractor and handle the claim scope with the adjuster.`,
  sections: [
    {
      eyebrow: "The stone",
      heading: "Granite, quartz, quartzite, and marble.",
      paragraphs: [
        "Expo Stone is a Houston supplier with a yard on the west Sam Houston Parkway, at 1055 W Sam Houston Pkwy N. The slabs on their lists include granite, quartz, quartzite, and marble. Granite names that have been on that list include Uba Tuba, Alaska White, Dallas White, and Kashmir Cream. Quartz names include Grey Sparkle, Calcutta Gold, Concrete, and White Fusion. Quartzite names include Taj Mahal, Macaubas, White Macaubas, and London Smoke. Marble names include Calacatta, Statuario, Arabescato, and White Carrara. The yard changes. We confirm what is actually there before anything is templated.",
        "Quartz is a manufactured surface, more even from slab to slab, and lemon or vinegar does not etch it the way those liquids etch marble. Keep hot pans off quartz. Granite is natural stone, sealed, and each slab moves in color. Quartzite is also natural stone. A similar name still leaves it a different product from quartz, and the slab you picked is the one to judge for sealer and variation. Marble will mark with acid. We say that in the kitchen, before it is ordered, because a photo of Statuario hides the etching you will live with. Expo Stone, Floor & Decor, and Sherwin-Williams are trademarks of their owners, and we are an independent contractor.",
      ],
    },
    {
      eyebrow: "The yard",
      heading: "Choosing a slab, then templating the room.",
      paragraphs: [
        "You pick the slab at the yard. A two-centimeter sample and a full slab in daylight are different, and book-matched veins only exist on the slabs standing in the rack. Their posted hours have been weekdays and Saturday. Hours change, so confirm with them before you drive. We can meet you there when that helps, and the decision is still the slab in front of you.",
        "Templating happens after the cabinets are set and level. We measure the kitchen you have, including sinks and cooktops, overhangs, and where a seam will show the least. Older kitchens in Bellaire, West University, and River Oaks are often out of square. A factory rectangle will leave gaps in a room like that. The template is what the fabricator cuts. If a cabinet is soft, low, or still waiting on a delivery, we wait. A new top on a twisted box will rock, and the seam will open.",
      ],
    },
    {
      eyebrow: "Install",
      heading: "Setting the top, the sink, and a backsplash.",
      paragraphs: [
        "On install day the pieces are dry-fit, the seams are set, and the sink goes in. A cooktop cutout is part of the template, made before the stone reaches the house. Faucet holes are decided before the stone is cut. Edges, whether eased, a small bevel, or a mitered waterfall on an island, are chosen with the slab, because a thin edge on a busy veined stone chips more easily at a doorway. We level the cabinets as part of the set. Plumbing is reconnected and checked for a leak before we leave the sink.",
        "A stone backsplash can be cut from the same material when the slab has the length for it, so the vein can continue up the wall. A full tile backsplash is a separate layout, set after the counter is in, so the tile meets the stone on a clean line. Bath vanities are the same stone conversation at a smaller size: the top, the backsplash if you want one, and the faucet holes. We use Expo Stone for this work. You buy the slab from them. We template and install.",
      ],
    },
    {
      eyebrow: "Remodels",
      heading: "New tops in a kitchen or a bath remodel.",
      paragraphs: [
        "In a remodel the counter is in the middle of the sequence. Cabinets first, then the template, then fabrication, then the set, then the backsplash and the last paint. Painting the walls before the stone arrives means we protect that paint. Painting after means the stone gets covered. We pick one with you so a finished edge is not the surface that collects dust. An island that changes size changes the slab. We template the cabinets that are in the room.",
        "Bath remodel tops are often marble or quartz on a vanity, with the stone stopped where the shower begins. The shower is waterproofed before its own tile. A vanity top is a different surface from the shower wall. If the layout moves the sink, the plumbing is finished and holding water before we template, so the hole in the stone matches the faucet you bought. Katy and Woodlands baths are often larger. A West University powder room may be a single top and a tight wall. The measuring is the same.",
      ],
    },
    {
      eyebrow: "Water",
      heading: "Replacing a top after a leak.",
      paragraphs: [
        "A sink leak, a supply line, or a dishwasher can swell the particle-board box under a stone top while the stone still looks fine. The box is the problem. We do not set a new slab on a soft cabinet. The room is dried, the damaged cabinet is rebuilt or replaced, and then the top is templated. If the stone itself cracked at the sink or the seam opened, that piece is replaced. A crack that was only filled usually opens again.",
        "We photograph the cabinet, the leak path, and the stone. The estimate is the price of the cabinet repair and the new top. If insurance is involved, we work with your insurance company as your contractor and handle the claim scope with the adjuster. A planned remodel with no leak is construction, and we describe it that way.",
      ],
    },
    {
      eyebrow: "The visit",
      heading: "How long a counter takes, and where we work.",
      paragraphs: [
        "A straight kitchen is often one install day once the pieces are cut. The wait is the template appointment and the fabrication, and a seam, a waterfall, or a second bath adds to both. We tell you those steps after we see the cabinets. Removal of an old top is its own hour, and an old tile top that was mud-set can take longer than a screwed-down laminate top. We protect floors and appliances.",
        `Visits are scheduled from our office in west Houston (77082). Scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM. Call ${phone} to schedule an estimate. We install these tops across Houston, including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University. Family-owned since 1993.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Do you install Expo Stone countertops in Houston?",
      a: `Yes. We template and install granite, quartz, quartzite, and marble from Expo Stone. We use the stone. Call ${phone} to look at the kitchen or the bath.`,
    },
    {
      q: "Can we pick the slab at the Expo Stone yard?",
      a: "Yes. The Houston yard is at 1055 W Sam Houston Pkwy N. You choose the slab there. We can meet you when that helps. Confirm their hours before you drive, because the yard sets those hours.",
    },
    {
      q: "How do their granite, quartz, quartzite, and marble differ?",
      a: "Quartz is manufactured and does not etch from lemon the way marble does. Keep hot pans off quartz. Granite and quartzite are natural stone, and each slab varies. Marble will mark with acid. Names that have been on their lists include Taj Mahal quartzite and Calacatta marble. We confirm what is in the yard.",
    },
    {
      q: "When do you template the counters?",
      a: "After the cabinets are set and level. Sinks, cooktops, faucet holes, and seams are on that template. We measure the room, including older kitchens that are out of square.",
    },
    {
      q: "Can you replace a countertop after a leak?",
      a: "Yes, after the cabinet under it is sound. A swollen box is rebuilt before a new slab goes on. If the stone cracked, that piece is replaced. If insurance is involved, Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer decides coverage and payment.",
    },
    {
      q: "Do you install a stone backsplash with the counter?",
      a: "When the slab is long enough, a stone backsplash can be cut from the same material. A full tile backsplash is a separate layout, set after the counter is in.",
    },
    {
      q: "How long does a counter take, and where do you work?",
      a: "A straight kitchen is often one install day once the pieces are cut. Templating and fabrication are the wait before that day. We work from our office in west Houston (77082), including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University.",
    },
  ],
  related: [
    ...cityLinks("countertops", "Countertops", "en"),
    { href: "/countertops", label: "Countertops in Houston" },
    { href: "/kitchen-remodeling", label: "Kitchen remodeling in Houston" },
    { href: "/bathroom-remodeling", label: "Bathroom remodeling in Houston" },
    { href: "/backsplash", label: "Backsplash installation in Houston" },
    { href: "/water-damage-restoration", label: "Water damage restoration in Houston" },
    { href: "/insurance-claims", label: "Insurance claims help" },
  ],
};

const sherwinEs = {
  slug: "sherwin-williams-painting-houston",
  locale: "es" as const,
  path: "/es/sherwin-williams-painting-houston",
  enPath: "/sherwin-williams-painting-houston",
  esPath: "/es/sherwin-williams-painting-houston",
  metaTitle: "Pintura Sherwin-Williams en Houston",
  description:
    "Pintura Sherwin-Williams en Houston para paredes, moldura y siding al sol. Empresa familiar desde 1993. Llame al (713) 909-0034 para pedir un estimado.",
  eyebrow: "Sherwin-Williams",
  title: ["Pintura Sherwin-Williams", "en Houston."],
  lede: `¿Necesita pintura Sherwin-Williams en Houston? Elite Restorations pinta interiores y exteriores con pinturas Sherwin-Williams, desde las paredes y la moldura hasta el siding, el estuco, las puertas y la fascia. Sherwin-Williams fabrica pintura desde 1866, y somos una empresa familiar en Houston desde 1993. Llame al ${phone} para pedir un estimado.`,
  crumbs: [
    { name: "Servicios", path: "/es" },
    { name: "Pintura", path: "/es/painting-drywall-repair" },
    { name: "Sherwin-Williams", path: "/es/sherwin-williams-painting-houston" },
  ],
  image: "/images/projects/bathrooms/powder-room-charcoal-walls.jpg",
  serviceName: "Pintura Sherwin-Williams en Houston",
  relatedHeading: "Vecindarios y pintura relacionada",
  ctaTitle: "¿Planea pintura Sherwin-Williams?",
  ctaBody: `Llame al ${phone} para pedir un estimado, y vemos las paredes. Usamos la pintura. Si hay seguro de por medio, trabajamos con su aseguradora como su contratista y atendemos el alcance del reclamo con el ajustador.`,
  sections: [
    {
      eyebrow: "Las pinturas",
      heading: "Duration, Emerald, SuperPaint y ProClassic.",
      paragraphs: [
        "Duration, Emerald, SuperPaint y ProClassic son las líneas Sherwin-Williams que ponemos en las casas de Houston. Duration es el acrílico de exterior que piden cuando el siding, el estuco y la moldura reciben sol pleno y la humedad del Golfo. Emerald es la pintura interior más alta, y Sherwin-Williams también hace un Emerald de exterior para un muro que quiere más lavable. SuperPaint es el interior y el exterior práctico cuando toda la casa necesita una mano pareja. ProClassic es el esmalte para puertas, moldura y gabinetes, donde se ven los brochazos y la película tiene que ser más dura que una pintura de pared.",
        "Vemos la superficie antes de nombrar una línea. Un muro sur que suelta polvo, un muro norte con moho, fibrocemento nuevo y una sala parchada no son el mismo trabajo. El color se elige afuera, de día, contra el ladrillo o el siding, porque una muestra bajo la luz de la cocina miente. Floor & Decor y Sherwin-Williams son marcas de sus dueños, y somos un contratista independiente. Usamos estas pinturas en su casa.",
      ],
    },
    {
      eyebrow: "Preparación",
      heading: "Lo que tiene que pasar antes de la primera mano.",
      paragraphs: [
        "La pintura falla en Houston cuando va sobre una superficie sucia, polvosa o húmeda. Lavamos el exterior, incluido el moho del estuco a la sombra y debajo de los árboles, y raspamos lo que está suelto. El polvo de una pared sur u oeste vieja tiene que salir, o la mano nueva se despega en hojas. La madera cruda, los clavos oxidados y las manchas de agua reciben un primario acorde al problema. El silicón va en ventanas, puertas y juntas que el calor abrió, y después la pintura.",
        "Adentro, los parches se emparejan para que la reparación desaparezca, y la textura se mezcla en las paredes que ya la tienen. Una mancha de una fuga vieja necesita un primario que bloquee la mancha, o sangra por la mano final. La moldura brillante se lija para que la siguiente mano tenga de dónde agarrarse. Cubrimos pisos, piedra y herrajes. El brillo es parte de la decisión: una pared más mate esconde un parche, y un satinado o un esmalte en la moldura, los baños y la cocina se puede limpiar.",
      ],
    },
    {
      eyebrow: "El clima",
      heading: "Humedad, calor y moho.",
      paragraphs: [
        "El aire de Houston muchas veces está tan húmedo que la pared sigue sudando en la mañana, sobre todo al norte y bajo un porche hondo. La pintura sobre esa humedad pierde el agarre. Esperamos a que la superficie esté seca, y seguimos la ventana de temperatura que trae la lata. La otra falla es un color oscuro en el muro oeste en una tarde de julio, cuando la película se cierra antes de nivelarse y deja marcas de empalme. Esos muros los empezamos más temprano, o volvemos cuando el sol ya se movió.",
        "El moho es una mancha viva, común en el estuco sombreado, bajo los encinos y en la parte de atrás de una casa que nunca seca. Pintar encima lo encierra en la película. Lo lavamos primero. Adentro, un baño o una cocina que se queda húmedo quiere un brillo lavable, y el extractor tiene que funcionar, porque la pintura no sustituye la ventilación. Después de una casa cerrada todo el verano, buscamos condensación en las paredes antes de agendar el interior.",
      ],
    },
    {
      eyebrow: "Afuera",
      heading: "Repintar después de siding, estuco o una tormenta.",
      paragraphs: [
        "El siding nuevo y el estuco nuevo necesitan pintura para cerrar el muro, no como un proyecto para después. La tabla de fibrocemento que llega con primario igual necesita pintura en el campo y en cada corte. Una tabla con acabado de fábrica es otro producto, y no pintamos encima de ese acabado para refrescar un parche. Las grietas finas del estuco se rellenan antes del recubrimiento, porque una mano de pintura sola se vuelve a abrir con el siguiente tiempo seco. Si el muro ya tiene un recubrimiento grueso, lo decimos antes de añadir otra película que pueda atrapar agua.",
        "Después de granizo o viento, la pintura es el último paso, cuando el siding, el estuco o la madera de atrás están sanos. Una tabla quebrada se reemplaza. Un punto blando junto a la llave de la manguera se abre y se seca. Luego pintamos la reparación, y por lo general todo el plano, porque un parche nuevo en un muro sur desteñido se va a ver. Aquí el sur y el oeste se destiñen más rápido que el norte. Lo decimos antes de pedir un galón de retoque. La misma tormenta pudo marcar el techo. Eso se ve aparte.",
      ],
    },
    {
      eyebrow: "Adentro",
      heading: "Pintura interior después de daño de agua o una remodelación.",
      paragraphs: [
        "Después de una fuga, un tubo de suministro o una inundación, la pintura espera a que el drywall esté seco. Una pared puede verse lista y seguir húmeda en el medidor, y la humedad de Houston lo hace común en una losa. No cerramos una pared húmeda con primario. Las manchas de agua reciben un primario que las bloquea. Si el drywall se cortó, la tabla nueva se encinta, se texturiza como el cuarto, se imprima y se pinta lo bastante lejos para que el brillo coincida. Una mancha de techo por una gotera sigue la misma secuencia cuando el techo ya no deja entrar agua.",
        "Una remodelación de cocina o de baño se pinta cuando el drywall y la loseta están listos, para que el color sea la última capa y no una superficie que hay que cuidar durante la demolición. Se pintan cuartos completos, no una sola pared nueva, cuando el color viejo dejaría una raya. Los gabinetes, si los quiere pintados, son otra preparación: desengrasar, lijar, un primario de adherencia y luego un esmalte como ProClassic. La pintura de pared en una puerta de gabinete no aguanta las manos ni los limpiadores.",
      ],
    },
    {
      eyebrow: "La visita",
      heading: "Tiempos, reclamos y dónde pintamos.",
      paragraphs: [
        "Unos cuantos cuartos suelen ser un día o dos cuando las paredes están listas. Un interior completo, o un exterior de dos pisos, tarda más, y el secado, las reparaciones y la lluvia añaden días que nombramos después de ver la casa. El exterior se detiene con las tormentas. Cuando el viento o el agua dañó las paredes, fotografiamos el daño y la reparación. El estimado es el precio de la preparación y de la pintura Sherwin-Williams. Si hay seguro de por medio, trabajamos con su aseguradora como su contratista y atendemos el alcance del reclamo con el ajustador.",
        `Trabajamos desde nuestra oficina en el oeste de Houston (77082). Las visitas programadas son de lunes a sábado, de 8:00 AM a 6:00 PM. Llame al ${phone} para pedir un estimado. Pintamos casas en Houston, incluidas Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University. Empresa familiar desde 1993.`,
      ],
    },
  ],
  faqs: [
    {
      q: "¿Usan pintura Sherwin-Williams en Houston?",
      a: `Sí. Usamos pinturas Sherwin-Williams, incluidas Duration, Emerald, SuperPaint y ProClassic. Llame al ${phone} para pedir un estimado, y vemos las paredes.`,
    },
    {
      q: "¿Qué línea de exterior piden las casas de Houston?",
      a: "Duration es el acrílico de exterior que piden en siding, estuco y moldura a pleno sol. Emerald de exterior es la línea más lisa. SuperPaint es la mano práctica cuando hay que pintar toda la casa. Nombramos la línea después de ver el muro.",
    },
    {
      q: "¿Pueden igualar el color que ya tiene la casa?",
      a: "A menudo, si igualamos la pared como se ve hoy, de día, y pintamos lo bastante lejos para tapar el desteñido. En Houston el sur y el oeste se destiñen. Un galón de retoque en un plano de diez años se va a ver, y lo decimos.",
    },
    {
      q: "¿Cuándo hay que esperar al clima para pintar afuera?",
      a: "Cuando el muro sigue húmedo en la mañana, o cuando el muro oeste está a pleno sol de la tarde. Seguimos la ventana de temperatura de la lata. El moho se lava antes de cualquier mano.",
    },
    {
      q: "¿Repintan después de daño de agua o de una remodelación?",
      a: "Sí, cuando el drywall está seco. Las manchas de agua reciben un primario que las bloquea. Una cocina o un baño se pinta cuando el drywall y la loseta están listos, por lo general todo el cuarto para que el brillo coincida.",
    },
    {
      q: "¿Documentan la pintura que es parte de un reclamo?",
      a: "Fotografiamos el daño y la reparación, y el estimado es el precio de la preparación y de la pintura. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Su aseguradora decide. No somos ajustadores públicos.",
    },
    {
      q: "¿Cuánto tarda un repinte y dónde trabajan?",
      a: "Unos cuartos listos suelen ser un día o dos. Una casa completa tarda más, y la lluvia o el secado añaden días. Trabajamos desde nuestra oficina en el oeste de Houston (77082), incluidas Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University.",
    },
  ],
  related: [
    ...cityLinks("painting-drywall-repair", "Pintura", "es"),
    { href: "/es/painting-drywall-repair", label: "Pintura y reparación de drywall en Houston" },
    { href: "/es/water-damage-restoration", label: "Restauración por daño de agua en Houston" },
    { href: "/es/kitchen-remodeling", label: "Remodelación de cocinas en Houston" },
    { href: "/es/bathroom-remodeling", label: "Remodelación de baños en Houston" },
    { href: "/es/insurance-claims", label: "Ayuda con reclamos de seguro" },
    { href: "/es/james-hardie-siding-houston", label: "Siding James Hardie en Houston" },
    { href: "/es/houston-storm-damage", label: "Ayuda por tormenta en Houston" },
  ],
};

const floorEs = {
  slug: "floor-and-decor-flooring-installation-houston",
  locale: "es" as const,
  path: "/es/floor-and-decor-flooring-installation-houston",
  enPath: "/floor-and-decor-flooring-installation-houston",
  esPath: "/es/floor-and-decor-flooring-installation-houston",
  metaTitle: "Pisos Floor & Decor en Houston",
  description:
    "Instalación de pisos Floor & Decor en Houston: loseta, duela de vinil, madera y laminado. Llame al (713) 909-0034 para pedir un estimado.",
  eyebrow: "Floor & Decor",
  title: ["Pisos Floor & Decor", "en Houston."],
  lede: `¿Busca instalación de pisos Floor & Decor en Houston? Elite Restorations instala la loseta, la duela de vinil de lujo, la madera y el laminado que usted escoge en Floor & Decor, con una preparación cuidadosa para que el piso nuevo se vea bien y dure. Floor & Decor vende pisos desde 2000, y somos una empresa familiar en Houston desde 1993. Llame al ${phone} para pedir un estimado.`,
  crumbs: [
    { name: "Servicios", path: "/es" },
    { name: "Pisos de vinil", path: "/es/vinyl-flooring" },
    { name: "Floor & Decor", path: "/es/floor-and-decor-flooring-installation-houston" },
  ],
  image: "/images/services/vinyl-flooring.jpg",
  serviceName: "Instalación de pisos Floor & Decor en Houston",
  relatedHeading: "Vecindarios y pisos relacionados",
  ctaTitle: "¿Planea pisos Floor & Decor?",
  ctaBody: `Llame al ${phone} para pedir un estimado, y vemos el piso y la losa. Instalamos el piso. Si hay seguro de por medio, trabajamos con su aseguradora como su contratista y atendemos el alcance del reclamo con el ajustador.`,
  sections: [
    {
      eyebrow: "Los pisos",
      heading: "Loseta, LVP, madera y laminado.",
      paragraphs: [
        "Floor & Decor vende los pisos que piden las casas de Houston: loseta de porcelana y cerámica, duela de vinil de lujo (LVP), madera y laminado. Nosotros los instalamos. Usted puede comprar el material en la tienda y nosotros lo instalamos, o nosotros lo conseguimos y el producto y la mano de obra van en un solo estimado. De las dos formas vemos las cajas antes de agendar. La cantidad, el desperdicio, el mismo lote de color y si ese producto va en una cocina, un baño o una recámara se revisan mientras todavía es fácil devolver.",
        "La loseta pide una base plana y el mortero correcto, y las piezas grandes enseñan cada lomo de la losa. El LVP se ensambla o se pega, y se ve tan plano como el piso de abajo. La madera en este clima suele ser de ingeniería cuando va sobre concreto, y tiene que aclimatarse en la casa. El laminado flota sobre una colchoneta. Sirve en recámaras y salas, y es mala idea donde el agua se queda. Floor & Decor y Sherwin-Williams son marcas de sus dueños, y somos un contratista independiente.",
      ],
    },
    {
      eyebrow: "La losa",
      heading: "Preparación del piso y humedad en una cimentación de Houston.",
      paragraphs: [
        "La mayoría de las casas que pisamos en Katy, Sugar Land, Memorial y The Woodlands están sobre una losa de concreto. La losa casi nunca está lo bastante plana para loseta grande o una duela que se ensambla. Lomos, hundidos, pegamento viejo y pintura son el trabajo antes de abrir la primera caja. Esmerilamos o rellenamos hasta que el piso cumple la planitud que el fabricante imprime en la caja. Una duela bonita sobre una onda va a copiar la onda, y una loseta grande va a quedar desnivelada en cada junta.",
        "La losa también guarda humedad. Después de una fuga de suministro, un calentador de agua o una inundación, la superficie puede verse seca y el concreto seguir mojado. El vinil pegado y la madera fallan sobre esa losa, y un piso flotante puede atrapar la humedad debajo. Medimos el concreto. Cuando el producto lo pide, hacemos una prueba de humedad antes de pegar algo o antes de poner madera. Algunas casas viejas de Bellaire y West University son pier-and-beam, con un contrapiso de madera. Ese piso también tiene que estar seco, firme y plano. No cubrimos un punto blando.",
      ],
    },
    {
      eyebrow: "El agua",
      heading: "Cambiar un piso después de una fuga o una inundación.",
      paragraphs: [
        "La alfombra mojada, el laminado hinchado y la madera acopada salen. Primero se traza por dónde entró el agua, porque una mancha en el zoclo muchas veces quiere decir que la losa o el hueco de la pared están mojados más allá del cuarto que se ve. El secado es otro trabajo: extracción, ventiladores y deshumidificadores hasta que las lecturas dicen que la estructura está seca. El piso nuevo es el paso de después, no el paso que esconde el agua. La humedad de Houston explica por qué un cuarto que se siente seco en la mano sigue húmedo en el medidor.",
        "Lo que regresa depende del cuarto. La loseta y una duela de vinil hecha para el agua son los pisos usuales de cocina y baño. El laminado que estuvo en agua de inundación se reemplaza. No se seca para volver a ensamblarlo. La madera de ingeniería puede volver a una sala cuando la losa está seca y el fabricante permite esa losa. Fotografiamos el piso mojado antes de quitarlo y el piso nuevo después. El estimado es el precio de quitar, preparar e instalar. Si hay seguro de por medio, trabajamos con su aseguradora como su contratista y atendemos el alcance del reclamo con el ajustador.",
      ],
    },
    {
      eyebrow: "La instalación",
      heading: "Ensamble, pegamento, mortero y los bordes.",
      paragraphs: [
        "El LVP se ensambla y flota sobre una base que el fabricante acepta, o se pega. La caja lo dice. Seguimos eso, incluido el espacio de expansión en las paredes. Un piso de ensamble apretado por un marco de puerta o un gabinete se pandea en el primer mes de calor. El pegado necesita la prueba de humedad y una losa limpia. El laminado flota sobre su colchoneta, con transiciones en las puertas y donde el piso cambia de altura.",
        "La loseta se asienta en mortero, con líneas para que el patrón llegue a la puerta con una pieza decente en la entrada. La junta es parte del piso, y los cuartos húmedos llevan la junta que pide el producto. La madera se fija o se pega como permiten esa especie y esa losa, después de haber estado en la casa. Los inodoros y a veces los aparatos se quitan para que el piso pase por debajo. El zoclo de cuarto de caña y las transiciones son las últimas piezas, para que el borde se vea terminado contra el zoclo que usted tiene.",
      ],
    },
    {
      eyebrow: "El material",
      heading: "Cuando usted compra el piso, y cuando lo compramos nosotros.",
      paragraphs: [
        "Si ya compró el piso en Floor & Decor, dígalo antes de la visita. Necesitamos el nombre del producto, el tamaño de la duela o la loseta, y cuántas cajas hay en la cochera. Si falta material, el trabajo se detiene a la mitad del cuarto. Las cajas de más cubren cortes y una reparación futura, y un lote de color distinto se ve en la unión. Si una caja era el producto equivocado para un baño, lo decimos mientras todavía puede regresarse. Instalamos lo que usted compró cuando cabe en el cuarto y en la base.",
        "Si quiere que nosotros lo compremos, lo elegimos con usted y el material va en nuestro estimado junto con la mano de obra. Los dos arreglos son la misma instalación. Somos el contratista en la casa. Lleve una muestra a la casa y mírela en el cuarto, de mañana y de tarde. La luz de una exhibición y una sala que mira al norte en Memorial no son el mismo color.",
      ],
    },
    {
      eyebrow: "La visita",
      heading: "Cuánto tarda un piso, y dónde trabajamos.",
      paragraphs: [
        "Un cuarto seco y plano de LVP de ensamble suele ser un día cuando el piso viejo ya salió. Nivelar, un problema de humedad, loseta o toda una planta baja añaden días, y separamos el tiempo de secado del tiempo de instalación para que el calendario sea honesto. Mover los muebles se habla antes de que empiece el día. Las escaleras y los descansos son piezas aparte. Protegemos los cuartos que no estamos pisando.",
        `Trabajamos desde nuestra oficina en el oeste de Houston (77082). Las visitas programadas son de lunes a sábado, de 8:00 AM a 6:00 PM. Llame al ${phone} para pedir un estimado. Instalamos estos pisos en Houston, incluidos Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University. Empresa familiar desde 1993.`,
      ],
    },
  ],
  faqs: [
    {
      q: "¿Instalan pisos Floor & Decor en Houston?",
      a: `Sí. Instalamos loseta, LVP, madera y laminado de Floor & Decor sobre el piso que ya tiene. Llame al ${phone} para pedir un estimado, y pasamos a verlo.`,
    },
    {
      q: "¿Puedo comprar el piso y ustedes lo instalan?",
      a: "Sí. Puede comprarlo en Floor & Decor, o nosotros lo conseguimos y el material va en el mismo estimado que la mano de obra. Revisamos la cantidad, el lote de color y si ese producto va en el cuarto antes de agendar.",
    },
    {
      q: "¿Prueban la humedad de una losa de Houston?",
      a: "Sí. Medimos el concreto. Cuando el producto lo pide, hacemos una prueba de humedad antes de pegar o de poner madera. Una losa puede verse seca y seguir mojada después de una fuga o una inundación.",
    },
    {
      q: "¿Qué preparación necesita el piso de abajo?",
      a: "Tiene que estar plano, limpio y firme. Los lomos y los hundidos se esmerilan o se rellenan hasta la planitud que trae la caja. En una casa pier-and-beam el contrapiso de madera tiene que estar seco y firme. No cubrimos un punto blando.",
    },
    {
      q: "¿Pueden cambiar el piso después de una inundación o una fuga?",
      a: "Sí, cuando la estructura está seca. El piso mojado sale, la losa se seca y entonces va el piso nuevo. El laminado que estuvo en agua de inundación se reemplaza.",
    },
    {
      q: "¿Documentan un piso para un reclamo de seguro?",
      a: "Fotografiamos el piso mojado y la reparación. El estimado es el precio de quitar, preparar e instalar. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. Su aseguradora decide. No somos ajustadores públicos.",
    },
    {
      q: "¿Cuánto tarda la instalación y dónde trabajan?",
      a: "Un cuarto seco y plano de LVP de ensamble suele ser un día cuando el piso viejo ya salió. Nivelar, la humedad y la loseta añaden días. Trabajamos desde nuestra oficina en el oeste de Houston (77082), incluidas Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University.",
    },
  ],
  related: [
    ...cityLinks("vinyl-flooring", "Pisos de vinil", "es"),
    { href: "/es/vinyl-flooring", label: "Pisos de vinil en Houston" },
    { href: "/es/tile-flooring", label: "Pisos de loseta en Houston" },
    { href: "/es/wood-flooring", label: "Pisos de madera en Houston" },
    { href: "/es/laminate-flooring", label: "Pisos laminados en Houston" },
    { href: "/es/water-damage-restoration", label: "Restauración por daño de agua en Houston" },
    { href: "/es/kitchen-remodeling", label: "Remodelación de cocinas en Houston" },
    { href: "/es/insurance-claims", label: "Ayuda con reclamos de seguro" },
  ],
};

const stoneEs = {
  slug: "expo-stone-countertops-houston",
  locale: "es" as const,
  path: "/es/expo-stone-countertops-houston",
  enPath: "/expo-stone-countertops-houston",
  esPath: "/es/expo-stone-countertops-houston",
  metaTitle: "Cubiertas Expo Stone en Houston",
  description:
    "Cubiertas Expo Stone en Houston: granito, cuarzo, cuarcita y mármol, cortados a sus gabinetes. Llame al (713) 909-0034 para pedir un estimado.",
  eyebrow: "Expo Stone",
  title: ["Cubiertas Expo Stone", "en Houston."],
  lede: `¿Quiere cubiertas nuevas en Houston? Elite Restorations instala cubiertas de cuarzo, granito, cuarcita y mármol de Expo Stone para cocinas y baños, cortadas a los gabinetes que ya tiene. Somos una empresa familiar en Houston desde 1993. Llame al ${phone} para pedir un estimado.`,
  crumbs: [
    { name: "Servicios", path: "/es" },
    { name: "Cubiertas", path: "/es/countertops" },
    { name: "Expo Stone", path: "/es/expo-stone-countertops-houston" },
  ],
  image: "/images/services/countertops.jpg",
  serviceName: "Cubiertas Expo Stone en Houston",
  relatedHeading: "Vecindarios y piedra relacionada",
  ctaTitle: "¿Planea cubiertas Expo Stone?",
  ctaBody: `Llame al ${phone} para pedir un estimado, y vemos los gabinetes. Hacemos la plantilla y la instalación. Si hay seguro de por medio, trabajamos con su aseguradora como su contratista y atendemos el alcance del reclamo con el ajustador.`,
  sections: [
    {
      eyebrow: "La piedra",
      heading: "Granito, cuarzo, cuarcita y mármol.",
      paragraphs: [
        "Expo Stone es un proveedor de Houston con un patio en el Sam Houston Parkway oeste, en 1055 W Sam Houston Pkwy N. En sus listas hay granito, cuarzo, cuarcita (quartzite) y mármol. Nombres de granito que han estado en esa lista incluyen Uba Tuba, Alaska White, Dallas White y Kashmir Cream. Nombres de cuarzo incluyen Grey Sparkle, Calcutta Gold, Concrete y White Fusion. Nombres de cuarcita incluyen Taj Mahal, Macaubas, White Macaubas y London Smoke. Nombres de mármol incluyen Calacatta, Statuario, Arabescato y White Carrara. El patio cambia. Confirmamos lo que de verdad hay antes de hacer la plantilla.",
        "El cuarzo es una superficie fabricada, más pareja de una placa a otra, y el limón o el vinagre no lo marcan como marcan el mármol. Las ollas calientes no van sobre el cuarzo. El granito es piedra natural, sellada, y cada placa cambia de color. La cuarcita también es piedra natural. Un nombre parecido la deja como un producto distinto del cuarzo, y la placa que usted eligió es la que hay que juzgar para el sellador y la variación. El mármol se marca con ácido. Lo decimos en la cocina, antes de pedirlo, porque una foto de Statuario esconde el desgaste que va a vivir. Expo Stone, Floor & Decor y Sherwin-Williams son marcas de sus dueños, y somos un contratista independiente.",
      ],
    },
    {
      eyebrow: "El patio",
      heading: "Elegir la placa y luego hacer la plantilla del cuarto.",
      paragraphs: [
        "Usted elige la placa en el patio. Una muestra de dos centímetros y una placa completa a la luz del día son distintas, y las vetas encontradas solo existen en las placas que están paradas en el anaquel. El horario que han publicado es entre semana y el sábado. Los horarios cambian, así que confirme con ellos antes de ir. Podemos acompañarlo cuando eso ayuda, y la decisión sigue siendo la placa que tiene enfrente.",
        "La plantilla se hace cuando los gabinetes están puestos y nivelados. Medimos la cocina que hay, incluidos fregaderos y parrillas, los volados y dónde una unión se va a ver menos. Las cocinas viejas de Bellaire, West University y River Oaks muchas veces están fuera de escuadra. Un rectángulo de fábrica deja huecos en un cuarto así. La plantilla es lo que el taller corta. Si un gabinete está blando, bajo o todavía no llega, esperamos. Una cubierta nueva sobre una caja torcida se mece, y la unión se abre.",
      ],
    },
    {
      eyebrow: "La instalación",
      heading: "Poner la cubierta, el fregadero y un backsplash.",
      paragraphs: [
        "El día de la instalación las piezas se prueban, se cierran las uniones y entra el fregadero. El corte de la parrilla es parte de la plantilla, hecho antes de que la piedra llegue a la casa. Los hoyos de la llave se deciden antes de cortar la piedra. Los bordes, ya sea suavizado, un bisel pequeño o una cascada en la isla, se eligen con la placa, porque un borde delgado en una piedra con mucha veta se despostilla más fácil en un pasillo. Nivelamos los gabinetes al asentar. La plomería se reconecta y se revisa que no gotee antes de dejar el fregadero.",
        "Un backsplash de piedra se puede cortar del mismo material cuando la placa alcanza, para que la veta siga por la pared. Un backsplash de loseta completo es otro trazo, y se pone después de la cubierta, para que la loseta encuentre la piedra en una línea limpia. Las cubiertas de baño son la misma conversación en un tamaño menor: la tapa, el backsplash si lo quiere, y los hoyos de la llave. Usamos Expo Stone para este trabajo. Usted compra la placa con ellos. Nosotros hacemos la plantilla y la instalación.",
      ],
    },
    {
      eyebrow: "Remodelaciones",
      heading: "Cubiertas nuevas en una cocina o un baño.",
      paragraphs: [
        "En una remodelación la cubierta va a la mitad de la secuencia. Primero los gabinetes, luego la plantilla, luego el corte en el taller, luego la instalación, y después el backsplash y la última pintura. Pintar las paredes antes de que llegue la piedra quiere decir que protegemos esa pintura. Pintar después quiere decir que se cubre la piedra. Elegimos una de las dos con usted para que un borde terminado no sea la superficie que junta polvo. Una isla que cambia de tamaño cambia la placa. Hacemos la plantilla de los gabinetes que están en el cuarto.",
        "Las cubiertas de un baño remodelado suelen ser mármol o cuarzo en el tocador, y la piedra se detiene donde empieza la regadera. La regadera se impermeabiliza antes de su propia loseta. La cubierta del tocador es otra superficie, distinta de la pared de la regadera. Si el trazo mueve el lavabo, la plomería queda terminada y aguantando agua antes de la plantilla, para que el hoyo de la piedra coincida con la llave que compró. Los baños de Katy y The Woodlands suelen ser más grandes. Un medio baño de West University puede ser una sola tapa y una pared corta. La medición es la misma.",
      ],
    },
    {
      eyebrow: "El agua",
      heading: "Cambiar una cubierta después de una fuga.",
      paragraphs: [
        "Una fuga del fregadero, de un tubo de suministro o del lavavajillas puede hinchar la caja de aglomerado debajo de una cubierta de piedra mientras la piedra se ve bien. La caja es el problema. No asentamos una placa nueva sobre un gabinete blando. El cuarto se seca, el gabinete dañado se reconstruye o se cambia, y entonces se hace la plantilla de la cubierta. Si la piedra se quebró en el fregadero o la unión se abrió, esa pieza se reemplaza. Una grieta solo rellenada suele volverse a abrir.",
        "Fotografiamos el gabinete, el camino de la fuga y la piedra. El estimado es el precio de la reparación del gabinete y de la cubierta nueva. Si hay seguro de por medio, trabajamos con su aseguradora como su contratista y atendemos el alcance del reclamo con el ajustador. Una remodelación planeada, sin fuga, es construcción, y así la describimos.",
      ],
    },
    {
      eyebrow: "La visita",
      heading: "Cuánto tarda una cubierta, y dónde trabajamos.",
      paragraphs: [
        "Una cocina recta suele ser un día de instalación cuando las piezas ya están cortadas. La espera es la cita de la plantilla y el trabajo del taller, y una unión, una cascada o un segundo baño alargan las dos cosas. Esos pasos se los decimos después de ver los gabinetes. Quitar una cubierta vieja es su propio tiempo, y una cubierta de loseta asentada en mezcla puede tardar más que un laminado atornillado. Protegemos pisos y aparatos.",
        `Trabajamos desde nuestra oficina en el oeste de Houston (77082). Las visitas programadas son de lunes a sábado, de 8:00 AM a 6:00 PM. Llame al ${phone} para pedir un estimado. Instalamos estas cubiertas en Houston, incluidas Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University. Empresa familiar desde 1993.`,
      ],
    },
  ],
  faqs: [
    {
      q: "¿Instalan cubiertas Expo Stone en Houston?",
      a: `Sí. Hacemos la plantilla e instalamos granito, cuarzo, cuarcita (quartzite) y mármol de Expo Stone. Llame al ${phone} para pedir un estimado, y vemos la cocina o el baño.`,
    },
    {
      q: "¿Podemos elegir la placa en el patio de Expo Stone?",
      a: "Sí. El patio de Houston está en 1055 W Sam Houston Pkwy N. Usted elige la placa ahí. Podemos acompañarlo cuando eso ayuda. Confirme el horario con ellos antes de ir, porque ese horario lo ponen ellos.",
    },
    {
      q: "¿En qué se distinguen su granito, cuarzo, cuarcita y mármol?",
      a: "El cuarzo es fabricado, y el limón no lo marca como marca el mármol. Las ollas calientes no van sobre el cuarzo. El granito y la cuarcita (quartzite) son piedra natural, y cada placa varía. El mármol se marca con ácido. En sus listas han estado Taj Mahal y el mármol Calacatta. Confirmamos lo que hay en el patio.",
    },
    {
      q: "¿Cuándo hacen la plantilla de las cubiertas?",
      a: "Cuando los gabinetes están puestos y nivelados. Fregaderos, parrillas, hoyos de llave y uniones van en esa plantilla. Medimos el cuarto, incluidas las cocinas viejas que están fuera de escuadra.",
    },
    {
      q: "¿Pueden cambiar una cubierta después de una fuga?",
      a: "Sí, cuando el gabinete de abajo está sano. Una caja hinchada se reconstruye antes de asentar una placa nueva. Si la piedra se quebró, esa pieza se reemplaza. Si hay seguro de por medio, Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No somos ajustadores públicos. La aseguradora decide la cobertura y el pago.",
    },
    {
      q: "¿Instalan un backsplash de piedra con la cubierta?",
      a: "Cuando la placa alcanza, un backsplash de piedra se puede cortar del mismo material. Un backsplash de loseta completo es otro trazo, y se pone después de la cubierta.",
    },
    {
      q: "¿Cuánto tarda una cubierta y dónde trabajan?",
      a: "Una cocina recta suele ser un día de instalación cuando las piezas ya están cortadas. La plantilla y el taller son la espera antes de ese día. Trabajamos desde nuestra oficina en el oeste de Houston (77082), incluidas Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University.",
    },
  ],
  related: [
    ...cityLinks("countertops", "Cubiertas", "es"),
    { href: "/es/countertops", label: "Cubiertas en Houston" },
    { href: "/es/kitchen-remodeling", label: "Remodelación de cocinas en Houston" },
    { href: "/es/bathroom-remodeling", label: "Remodelación de baños en Houston" },
    { href: "/es/backsplash", label: "Backsplash en Houston" },
    { href: "/es/water-damage-restoration", label: "Restauración por daño de agua en Houston" },
    { href: "/es/insurance-claims", label: "Ayuda con reclamos de seguro" },
  ],
};

export const productBrandPages = [
  sherwinEn,
  floorEn,
  stoneEn,
  sherwinEs,
  floorEs,
  stoneEs,
  ...supplierBrandPages,
];

