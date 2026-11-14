import { getAreaPage } from "@/lib/area-pages";
import { getArticle } from "@/lib/articles";
import { getCostGuide } from "@/lib/cost-guides";
import type { GuideSection } from "@/lib/guides/types";
import { parseLocalLandingSlug } from "@/lib/local-paths";
import { titleFits } from "@/lib/seo";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";
import { wordCount } from "@/lib/words";

const phone = site.phone.display;

export type BrandPage = {
  slug: string;
  locale: "en" | "es";
  path: string;
  enPath: string;
  esPath: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  title: readonly string[];
  lede: string;
  crumbs: readonly { name: string; path: string }[];
  sections: readonly GuideSection[];
  faqs: readonly { q: string; a: string }[];
  related: readonly { href: string; label: string }[];
  relatedHeading: string;
  ctaTitle: string;
  ctaBody: string;
  serviceName: string;
  /** Existing photo, used only for the social card. The page itself shows no image. */
  image?: string;
};

const cities = [
  ["katy", "Katy"],
  ["sugar-land", "Sugar Land"],
  ["bellaire", "Bellaire"],
  ["the-woodlands", "The Woodlands"],
  ["river-oaks", "River Oaks"],
  ["memorial", "Memorial"],
  ["west-university", "West University"],
] as const;

function cityLinks(service: "roofing" | "siding", locale: "en" | "es") {
  const noun = service === "roofing" ? (locale === "es" ? "Techos" : "Roofing") : "Siding";
  const prep = locale === "es" ? "en" : "in";
  return cities.map(([slug, name]) => ({
    href: `/${service}-${slug}-tx`,
    label: `${noun} ${prep} ${name}`,
  }));
}

const certainteedEn: BrandPage = {
  slug: "certainteed-roofing-houston",
  locale: "en",
  path: "/certainteed-roofing-houston",
  enPath: "/certainteed-roofing-houston",
  esPath: "/es/certainteed-roofing-houston",
  metaTitle: "CertainTeed Roofing Houston",
  description:
    "CertainTeed shingle roofing in Houston: Landmark replacement, hail and storm re-roofs, and claim photos. Call (713) 909-0034.",
  eyebrow: "CertainTeed shingles",
  title: ["CertainTeed roofing", "in Houston."],
  lede: `CertainTeed shingle roofing in Houston is usually a Landmark architectural shingle: a replacement, a re-roof after hail or wind, or a roof tied to an insurance claim. Elite Restorations installs these products. We have been family-owned in Houston since 1993. If water is coming in, call ${phone}.`,
  crumbs: [
    { name: "Services", path: "/services" },
    { name: "Roofing", path: "/roofing" },
    { name: "CertainTeed", path: "/certainteed-roofing-houston" },
  ],
  image: "/images/projects/roofing/brick-home-multi-gable.webp",
  serviceName: "CertainTeed roofing in Houston",
  relatedHeading: "Neighborhoods and related roofing",
  ctaTitle: "Planning a CertainTeed roof?",
  ctaBody: `Call ${phone} and we will look at the roof you have. If water is coming in, call any time. We install the shingles. Your insurer decides any claim.`,
  sections: [
    {
      eyebrow: "The shingles",
      heading: "Landmark, Landmark PRO, and Landmark ClimateFlex.",
      paragraphs: [
        "Landmark shingles are laminated architectural asphalt, two layers, with more shadow than a flat three-tab. That is the CertainTeed roof most Houston houses are asking for. We install three lines in that family. Landmark is the core shingle. Landmark PRO is thicker and heavier, with Max Def blends that use more granule colors for contrast. Landmark ClimateFlex uses a polymer-modified asphalt so the shingle stays more flexible, and CertainTeed lists it to UL 2218 Class 4 for impact. Landmark and Landmark PRO are listed to UL 2218 Class 3.",
        "Those listings belong to the product. They are not a promise about the next storm, and they are not a status we hold. We install the line you choose. A replacement is the whole roof: the old shingles come off, we look at the wood, then underlayment, starter, the field, hip and ridge, metal at valleys and walls, and attic vents. A Houston attic runs hot, so the vents are planned with the shingles.",
      ],
    },
    {
      eyebrow: "Replacement",
      heading: "What a CertainTeed replacement includes.",
      paragraphs: [
        "We get on the roof, photograph the slopes, and say whether a repair will hold or the shingles need to come off. We do not cover a worn roof and call it new. Tear-off is how we see the wood. Soft decking shows up where a valley or a vent has been leaking. That wood is extra work, and we stop to show you before the job grows past the roof that was priced. Pipe boots, wall flashing on brick houses in Memorial and Bellaire, and the metal where siding meets the roof are part of the same job.",
        "A walkable one-story replacement is often a few days on site once the shingles are in the yard. Steep, cut-up, or two-story roofs, and any roof that needs new decking, take longer. Rain pauses a tear-off. Shingles are ordered after you approve the line and the color: a wait, then the days on the roof. We tell you both after the inspection.",
      ],
    },
    {
      eyebrow: "Hail and wind",
      heading: "Storm re-roofs, and when a repair still makes sense.",
      paragraphs: [
        "Spring squalls mark roofs from Katy and Sugar Land through Memorial, Bellaire, River Oaks, and The Woodlands, and the house can still look ordinary from the curb. Hail bruises laminated shingles and knocks granules into the gutters. It also marks soft metal on vents and gutters. Wind lifts edges and pulls flashing at a side wall. The front slope can be calm while the west slope took the hail. We look at all of them before we say the roof needs to come off.",
        "A repair is right when the rest of the roof can still work and a matching shingle exists. Replacement is right when the bruises run across the slopes, the shingles are brittle, or the color is no longer made. South slopes fade faster than north slopes, so a new Landmark bundle beside older shingles often will not blend. We say that before a patch is ordered. If water is coming in, we tarp when the roof is safe to stand on. A tarp is temporary. Hurricane season is June 1 through November 30, and hail is not only a hurricane problem.",
      ],
    },
    {
      eyebrow: "Claims",
      heading: "Insurance-claim roof replacements.",
      paragraphs: [
        `If you are filing, we photograph the roof before a tarp hides an opening, when that is safe. We can meet your adjuster on the house and walk through what we saw. The estimate we write is the price of the construction: tear-off, the CertainTeed line you chose, flashing, vents, and any decking we can already see. It is not the amount the claim will pay. You file the claim. Your insurer decides coverage and payment. We are not public adjusters, and we do not give legal advice.`,
        "A Texas wind or hail deductible is often a percentage on your declarations page. We do not have that number and we will not invent it. Some policies pay a depreciated amount first. Read yours, or ask your insurer. We install the roof you hire us to install and we do not rewrite it to match a check. If a slope in the claim cannot be matched to the Landmark color on the house, we say so before the shingles are ordered.",
      ],
    },
    {
      eyebrow: "Color",
      heading: "Color choices on a Houston street.",
      paragraphs: [
        "Landmark colors people ask for here include Weathered Wood, Moire Black, Georgetown Gray, Heather Blend, Colonial Slate, Driftwood, Resawn Shake, Cobblestone Gray, and Pewter. Landmark PRO uses Max Def blends of several of those names and adds others, including Shenandoah, Red Oak, and Espresso. Landmark ClimateFlex shares names such as Weathered Wood, Moire Black, and Georgetown Gray, and Burnt Sienna is one of its colors. Palettes change. We confirm the current sheet, and what the supplier actually has, before anything is ordered.",
        "Look at a sample on the house in daylight. A phone screen will not show a south slope in July. Darker roofs read hotter on a Houston attic, and a light blend shows dirt sooner on a shaded north slope. CertainTeed publishes algae-resistance information for these lines. We still set the color against the brick or the siding, in River Oaks and West University as much as in Katy. CertainTeed also makes designer shingles. On most of these houses the decision is which Landmark line and which of these colors.",
      ],
    },
    {
      eyebrow: "Wind",
      heading: "Wind, hail, and what we will not promise.",
      paragraphs: [
        "CertainTeed's literature describes wind resistance for Landmark shingles, including a published 110 mph figure and a higher figure, up to 160 mph in that literature, when CertainTeed starter and hip-and-ridge are used. Read the current sheet. Those figures assume the instructions were followed. They describe the product. They are not a promise about one Houston storm, and they are not something we unlock.",
        `We install the nailing pattern in the instructions, starter at the eaves, and hip and ridge. Wind-driven rain in Memorial, Bellaire, and West University usually enters at a valley, a rake, or the metal against brick, not through the middle of an intact slope. Class 4 and Class 3 are reasons to pick a line, not a forecast. Any insurer credit for an impact-rated roof is between you and that insurer. The office is at 511 Crestwater Ct, Houston, TX 77082, Monday through Saturday, 8:00 AM to 6:00 PM. For an open roof, call ${phone} any time.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Do you install CertainTeed shingles in Houston?",
      a: `Yes. We install CertainTeed asphalt shingles, including Landmark, Landmark PRO, and Landmark ClimateFlex. We install the products. Call ${phone} to have the roof you have looked at.`,
    },
    {
      q: "Which Landmark line do people ask about after Houston hail?",
      a: "Landmark ClimateFlex, because CertainTeed lists it to UL 2218 Class 4. Landmark and Landmark PRO are listed to Class 3, and they are the lines many houses already have. We look at your roof, and at whether you want to match it, before we order.",
    },
    {
      q: "Can you match the CertainTeed color already on the house?",
      a: "Sometimes, if that color is still made and the slope has not faded past a blend. South and west slopes in Houston fade. If a new bundle will show, we say the slope or the roof needs more than a patch.",
    },
    {
      q: "How long does a CertainTeed roof replacement take?",
      a: "A walkable asphalt replacement is often a few days on site once the shingles arrive. The order, a steep or cut-up roof, decking repairs, and rain all add time. We give you that sequence after the inspection.",
    },
    {
      q: "Will you help with an insurance claim on the roof?",
      a: "We photograph the damage, we can meet your adjuster on site, and we write a repair estimate for the construction. You file the claim. Your insurer decides coverage and payment. We are not public adjusters.",
    },
    {
      q: "Do you repair a CertainTeed roof, or only replace it?",
      a: "Both. A repair is right when the rest of the roof can still work and a matching shingle exists. Replacement is right when the slopes are bruised, brittle, or the color cannot be matched.",
    },
    {
      q: "What if water is coming in tonight?",
      a: `Call ${phone}. We photograph the opening and tarp it when the roof is safe to stand on. A tarp is not the finished CertainTeed roof. The permanent shingles are the next step.`,
    },
    {
      q: "Where do you install CertainTeed roofs?",
      a: `From the office at 511 Crestwater Ct, Houston, TX 77082, across Houston and nearby cities including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University. Family-owned since 1993.`,
    },
  ],
  related: [
    ...cityLinks("roofing", "en"),
    { href: "/roofing", label: "Houston roofing" },
    { href: "/roof-replacement", label: "Houston roof replacement" },
    { href: "/roof-replacement-cost-houston", label: "What changes a roof replacement cost" },
    { href: "/roofing-emergency-tarp-repair", label: "Emergency roof tarping" },
    { href: "/houston-storm-damage", label: "Houston storm damage help" },
    { href: "/insurance-claims", label: "Insurance claims help" },
    { href: "/james-hardie-siding-houston", label: "James Hardie siding in Houston" },
  ],
};

const hardieEn: BrandPage = {
  slug: "james-hardie-siding-houston",
  locale: "en",
  path: "/james-hardie-siding-houston",
  enPath: "/james-hardie-siding-houston",
  esPath: "/es/james-hardie-siding-houston",
  metaTitle: "James Hardie Siding Houston",
  description:
    "James Hardie fiber cement siding in Houston: HardiePlank, HardieTrim, ColorPlus, and hail or rot repair. Call (713) 909-0034.",
  eyebrow: "James Hardie",
  title: ["James Hardie siding", "in Houston."],
  lede: `James Hardie siding in Houston is fiber-cement board on the wall the street sees: HardiePlank lap siding, HardieTrim at the corners and windows, and either paint or ColorPlus. Elite Restorations installs these products. We have been family-owned in Houston since 1993. Call ${phone}.`,
  crumbs: [
    { name: "Services", path: "/services" },
    { name: "Siding", path: "/siding" },
    { name: "James Hardie", path: "/james-hardie-siding-houston" },
  ],
  image: "/images/services/siding.jpg",
  serviceName: "James Hardie siding in Houston",
  relatedHeading: "Neighborhoods and related exterior work",
  ctaTitle: "Planning James Hardie siding?",
  ctaBody: `Call ${phone} for a look at the wall. If the wall is open and water is coming in, call any time. We install the boards. Your insurer decides any claim.`,
  sections: [
    {
      eyebrow: "The boards",
      heading: "HardiePlank, HardieTrim, and ColorPlus.",
      paragraphs: [
        "HardiePlank is lap siding, the overlapping rows. The boards are commonly 12 feet long, in several widths, so the exposure can match a ranch in Sugar Land or a taller wall in Memorial. HardieTrim is the board at corners, windows, doors, and the edges that make the wall look finished. We do not use HardiePlank as trim or as fascia. ColorPlus is James Hardie's factory-applied baked finish. Primed HardiePlank is painted on the house. We install these products. That is the work. It is not a credential.",
        "Fiber cement is cement and cellulose fiber. It does not rot the way pine does when the bottom row stays wet, and it is not food for termites the way wood is. That is why people ask for it in this humidity. It does not make the house termite-proof, and it does not replace flashing or a water-resistive barrier. We look behind the damage before we order a match.",
      ],
    },
    {
      eyebrow: "The wall behind",
      heading: "Replacing rotted wood or hail-cracked siding.",
      paragraphs: [
        "Soft wood at a hose bib, a swollen bottom course, or paint that keeps peeling on the west wall is a reason to open the wall, not only to cover it. We look at the sheathing and the wrap. If they are wet or rotten, that layer is the repair. New HardiePlank goes on after the wood is sound, the flashing is right, and water has a way off the wall. Covering rot with new fiber cement repeats the failure, usually at the same bottom row.",
        "Hail can crack fiber cement, and wind can lift a course. We photograph that before we cover it. A section can be replaced when the profile still exists and the color can be blended. South and west walls fade, so a new plank beside a ten-year-old wall often will not match. We say when a patch will show. The same storm may have marked the roof. A CertainTeed roof is one of the shingle options, and it is a separate look.",
      ],
    },
    {
      eyebrow: "Houston weather",
      heading: "Humidity, termites, and water that stays.",
      paragraphs: [
        "The local problem is water that stays: humidity, irrigation splash, mulch on the lowest row, and a deck or a roof the siding touches. James Hardie's instructions call for clearance off finished grade, typically at least 6 inches, and a gap at a roof, a deck, a step, or a path. We keep those gaps. A sprinkler aimed at the wall will wet new fiber cement the same way it wet the wood. A new board will not fix that.",
        "The wall behind the board needs a water-resistive barrier and flashing at windows and doors. Cut ends and the bottom edge are where water gets in. James Hardie recommends stainless fasteners in very humid climates and near large bodies of water. Houston is that climate. We use corrosion-resistant fasteners, and stainless where the wall stays damp. Termites can still be in the framing of an older Bellaire or West University house. Fiber cement does not feed them. If we open the wall and the wood is damaged, you see it before we close it.",
      ],
    },
    {
      eyebrow: "Finish",
      heading: "Paint on the house, or ColorPlus from the factory.",
      paragraphs: [
        "Primed HardiePlank is painted as the wall goes up, including the cut ends. Raw cuts in this humidity are how the next peel starts. The color is matched to the boards on the house now, in daylight, not to a chip from the year it was built. A whole-house color is chosen the same way: outside, against the brick, the roof, and the light on that street.",
        "ColorPlus arrives with the finish baked on. Cut edges get the edge treatment in the instructions, or they die into HardieTrim. We do not caulk ColorPlus butt joints or exposed nail heads, because caulk and the factory finish do not weather the same way. Each plank is set where it will fasten. Sliding a new board across one that is already up scuffs the face. If the factory sheet cannot blend an older wall, field paint is the honest option, and we will say so.",
      ],
    },
    {
      eyebrow: "Claims",
      heading: "When the siding is part of a storm claim.",
      paragraphs: [
        "If wind or hail opened the wall, we photograph the cracks, the lifted courses, and what is behind them if we have to open it. We can meet your adjuster on site. The estimate is the price of the HardiePlank, the HardieTrim, the flashing, and any sheathing that has to come out. It is not the claim payment. You file. Your insurer decides coverage and payment. We are not public adjusters, and we do not give legal advice.",
        "A planned re-side, with no storm, is construction, and we describe it that way. We do not rename a worn wall as hail. Hail marks and ordinary age look different up close, and the notes say which one we see. Photos of the damage and of the repair are yours to share.",
      ],
    },
    {
      eyebrow: "The visit",
      heading: "What to expect, and how long the wall takes.",
      paragraphs: [
        `A matched section is often a day or two once the boards are here. A one-story house with HardieTrim is often several days after the material arrives. Two stories, many windows, and rotten sheathing add days. A ColorPlus color that must be ordered is a lead time before those days. A whole-house re-side in the City of Houston can require a permit. A small repair often does not. Bellaire, West University, Sugar Land, Katy, and The Woodlands are different counters. We check the address.`,
        `The office is at 511 Crestwater Ct, Houston, TX 77082. Scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM. If the wall is open and water is coming in, call ${phone} any time. Text the same number if you cannot talk. We are family-owned here since 1993. The visit is at the house, in Houston and in the cities linked below, including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Do you install James Hardie siding in Houston?",
      a: `Yes. We install James Hardie fiber cement, including HardiePlank lap siding and HardieTrim, with ColorPlus or paint. We install the products. Call ${phone} to look at the wall.`,
    },
    {
      q: "Is HardiePlank the same as board-and-batten?",
      a: "No. HardiePlank is the lap, the overlapping rows. Board-and-batten is a different profile and a different shadow. We decide the pattern with you before the first course goes up.",
    },
    {
      q: "Can you replace rotted wood siding with fiber cement?",
      a: "Yes, after the wall behind it is dry and sound. Soft sheathing and failed flashing come out first. New HardiePlank over rot does not fix the rot.",
    },
    {
      q: "Does James Hardie help with Houston humidity and termites?",
      a: "Fiber cement does not rot the way wood does, and it is not a food source for termites the way pine is. It still needs clearance off the soil, a water-resistive barrier, and flashing. It does not make the house termite-proof.",
    },
    {
      q: "Should I choose ColorPlus or have the siding painted?",
      a: "ColorPlus is the factory baked finish. Primed board is painted on site, which helps when you need a color the factory sheet does not have. Both fade in Houston sun. We look at a sample outside.",
    },
    {
      q: "Can you repair hail-damaged siding instead of re-siding the house?",
      a: "Often, if the profile exists and the fade can be blended. A cracked plank is replaced, not filled. If a patch will always show, we say the wall needs more than that section.",
    },
    {
      q: "Will you document siding damage for an insurance claim?",
      a: "We photograph the damage and the repair, and we can meet your adjuster. You file the claim. Your insurer decides coverage and payment. We are not public adjusters.",
    },
    {
      q: "How long does James Hardie siding take, and where do you work?",
      a: `A section is often a day or two on site once the boards arrive. A whole house takes longer, and a ColorPlus color has its own lead time. We work from 511 Crestwater Ct, Houston, TX 77082, including Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial, and West University.`,
    },
  ],
  related: [
    ...cityLinks("siding", "en"),
    { href: "/siding", label: "Houston siding" },
    { href: "/houston-storm-damage", label: "Houston storm damage help" },
    { href: "/insurance-claims", label: "Insurance claims help" },
    { href: "/roofing", label: "Houston roofing" },
    { href: "/certainteed-roofing-houston", label: "CertainTeed shingle roofing in Houston" },
  ],
};

const certainteedEs: BrandPage = {
  slug: "certainteed-roofing-houston",
  locale: "es",
  path: "/es/certainteed-roofing-houston",
  enPath: "/certainteed-roofing-houston",
  esPath: "/es/certainteed-roofing-houston",
  metaTitle: "Techos CertainTeed en Houston",
  description:
    "Techos CertainTeed en Houston: líneas Landmark, granizo, viento y fotos para su reclamo. Llame al (713) 909-0034.",
  eyebrow: "Teja CertainTeed",
  title: ["Techos CertainTeed", "en Houston."],
  lede: `Un techo CertainTeed en Houston suele ser teja arquitectónica Landmark: un cambio completo, un techo después de granizo o viento, o un techo ligado a un reclamo. Elite Restorations instala estos productos. Somos una empresa familiar en Houston desde 1993. Si entra agua, llame al ${phone}.`,
  crumbs: [
    { name: "Servicios", path: "/es" },
    { name: "Techos", path: "/es/roofing" },
    { name: "CertainTeed", path: "/es/certainteed-roofing-houston" },
  ],
  image: "/images/projects/roofing/brick-home-multi-gable.webp",
  serviceName: "Techos CertainTeed en Houston",
  relatedHeading: "Vecindarios y techos relacionados",
  ctaTitle: "¿Planea un techo CertainTeed?",
  ctaBody: `Llame al ${phone} y vemos el techo que tiene. Si entra agua, llame a cualquier hora. Instalamos la teja. Su aseguradora decide el reclamo.`,
  sections: [
    {
      eyebrow: "La teja",
      heading: "Landmark, Landmark PRO y Landmark ClimateFlex.",
      paragraphs: [
        "La teja Landmark es asfalto arquitectónico laminado, en dos capas, con más sombra que una teja plana de tres pestañas. Ese es el techo CertainTeed que piden la mayoría de las casas de Houston. Instalamos tres líneas de esa familia. Landmark es la teja base. Landmark PRO es más gruesa y más pesada, con mezclas Max Def que usan más colores de gránulo. Landmark ClimateFlex usa un asfalto modificado con polímeros para que la teja sea más flexible, y CertainTeed la lista en UL 2218 Clase 4 contra impacto. Landmark y Landmark PRO están listadas en UL 2218 Clase 3.",
        "Esas listas son del producto. No son una promesa sobre la próxima tormenta, y no son un título nuestro. Instalamos la línea que usted elige. La teja es solo la capa que se ve desde la calle. Un cambio también incluye quitar lo viejo, ver la madera, la membrana de abajo, la teja de arranque, el campo, la cumbrera, el metal en valles y muros, los collares de los tubos y la ventilación del ático. El ático de Houston se pone muy caliente. La entrada y la salida de aire se planean con la teja, no después de que el camión se va.",
      ],
    },
    {
      eyebrow: "El cambio",
      heading: "Qué incluye un reemplazo CertainTeed.",
      paragraphs: [
        "Subimos al techo, fotografiamos las caídas y le decimos si una reparación aguanta o si hay que quitar la teja. No cubrimos un techo gastado y lo llamamos nuevo. Al quitar lo viejo se ve la madera. La madera blanda aparece donde un valle o un tubo ha estado goteando. Esa madera es trabajo extra, y paramos para enseñársela antes de que el trabajo crezca más allá del techo que se cotizó. Los collares de los tubos, el metal contra el ladrillo en Memorial y Bellaire, y el metal donde el siding topa con el techo van en el mismo trabajo.",
        "Un cambio de asfalto en una casa de un piso, donde se puede caminar, suele ser unos días en el sitio cuando la teja ya está en el patio. Un techo empinado, recortado o de dos pisos, y un techo que necesita madera nueva, tarda más. La lluvia pausa el día en que se quita lo viejo. El material se pide después de que usted aprueba la línea y el color. El calendario tiene dos partes: la espera de la teja y los días en el techo. Las dos se las decimos después de ver la casa, no con un calendario para todo Houston.",
      ],
    },
    {
      eyebrow: "Granizo",
      heading: "Tormentas, granizo, y cuándo una reparación sí alcanza.",
      paragraphs: [
        "Las tormentas de primavera marcan techos desde Katy y Sugar Land hasta Memorial, Bellaire, River Oaks y The Woodlands, y la casa puede verse normal desde la banqueta. El granizo golpea la teja laminada y suelta gránulos en las canaletas. También marca el metal blando de los tubos y las canaletas. El viento levanta orillas y jala el metal de un muro lateral. La caída de enfrente puede estar tranquila y la del oeste haber recibido el granizo. Vemos todas antes de decir que el techo tiene que salir.",
        "Una reparación es lo correcto cuando el resto del techo todavía puede trabajar y todavía existe una teja que combine. El cambio es lo correcto cuando los golpes cubren las caídas, la teja está quebradiza o el color de la casa ya no se fabrica. El sol de Houston destiñe más la caída del sur que la del norte, así que un paquete nuevo de Landmark junto a teja de diez años muchas veces no combina. Lo decimos antes de pedir un parche. Si entra agua, lo primero es una lona cuando se puede estar de pie en el techo. La lona es temporal. La temporada de huracanes va del 1 de junio al 30 de noviembre. El granizo no es solo cosa de huracanes.",
      ],
    },
    {
      eyebrow: "Reclamos",
      heading: "Cambios de techo ligados a un reclamo.",
      paragraphs: [
        `Si va a presentar un reclamo, fotografiamos el techo antes de que la lona tape una abertura, cuando es seguro. Podemos estar cuando llegue su ajustador y caminar lo que vimos. El estimado que escribimos es el precio de la construcción: quitar lo viejo, la línea CertainTeed que eligió, el metal, la ventilación y la madera que ya se puede ver. No es la cantidad que el reclamo va a pagar. Usted presenta el reclamo. Su aseguradora decide la cobertura y el pago. No somos ajustadores públicos y no damos consejo legal.`,
        "En Texas, el deducible de viento y granizo suele ser un porcentaje del monto que la póliza lista para la casa. Ese porcentaje está en su página de declaraciones, o se lo dice su agente. Nosotros no lo tenemos y no lo inventamos. Algunas pólizas pagan primero un valor depreciado y sueltan el resto cuando el trabajo está hecho. Otras no. Lea la suya o pregúntele a su aseguradora. Instalamos el techo que usted nos contrata. No reescribimos el trabajo para que quepa en un cheque. Si una caída del reclamo no se puede igualar al color Landmark de la casa, lo decimos antes de pedir la teja.",
      ],
    },
    {
      eyebrow: "Color",
      heading: "El color en una calle de Houston.",
      paragraphs: [
        "Los colores Landmark que aquí piden incluyen Weathered Wood, Moire Black, Georgetown Gray, Heather Blend, Colonial Slate, Driftwood, Resawn Shake, Cobblestone Gray y Pewter. Landmark PRO usa mezclas Max Def de varios de esos nombres y añade otros, entre ellos Shenandoah, Red Oak y Espresso. Landmark ClimateFlex comparte nombres como Weathered Wood, Moire Black y Georgetown Gray, y Burnt Sienna es uno de sus colores. Las paletas cambian. Confirmamos la hoja actual, y lo que el proveedor de verdad tiene, antes de pedir.",
        "Vea una muestra en la casa, de día. La pantalla del teléfono no sirve para una caída al sur en julio. Los techos oscuros se sienten más calientes en un ático de Houston. Una mezcla clara enseña la tierra más pronto en una caída norte a la sombra, donde las rayas de alga son comunes. CertainTeed publica información de resistencia a las algas en estas líneas. Igual hablamos del color contra el ladrillo o el siding que usted tiene, en River Oaks y West University tanto como en Katy, porque la fachada es con lo que se queda. CertainTeed también hace tejas de diseñador. En la mayoría de las casas de Houston la decisión es cuál línea Landmark y cuál de estos colores.",
      ],
    },
    {
      eyebrow: "Viento",
      heading: "Viento y granizo, sin una promesa.",
      paragraphs: [
        "La literatura de CertainTeed describe la resistencia al viento de Landmark, con una cifra de 110 mph y otra más alta, hasta 160 mph en esa literatura, cuando el arranque y la cumbrera son de CertainTeed. Lea la hoja actual. Esas cifras suponen que se siguieron las instrucciones. Describen el producto. No son una promesa sobre una tormenta de Houston, y no son algo que nosotros desbloqueamos.",
        `Instalamos el clavado de las instrucciones, el arranque y la cumbrera. La lluvia con viento en Memorial, Bellaire y West University suele entrar por un valle, un borde o el metal contra el ladrillo. La Clase 4 y la Clase 3 son razones para elegir una línea, no un pronóstico. Un crédito de la aseguradora, si existe, es entre usted y ellos. La oficina está en 511 Crestwater Ct, Houston, TX 77082, de lunes a sábado, de 8:00 AM a 6:00 PM. Si el techo está abierto, llame al ${phone} a cualquier hora.`,
      ],
    },
  ],
  faqs: [
    {
      q: "¿Instalan teja CertainTeed en Houston?",
      a: `Sí. Instalamos teja de asfalto CertainTeed, incluidas Landmark, Landmark PRO y Landmark ClimateFlex. Instalamos los productos. Llame al ${phone} para ver el techo que tiene.`,
    },
    {
      q: "¿Qué línea Landmark piden después del granizo en Houston?",
      a: "Landmark ClimateFlex, porque CertainTeed la lista en UL 2218 Clase 4. Landmark y Landmark PRO están en Clase 3, y son las que ya tienen muchas casas. Vemos su techo, y si quiere igualarlo, antes de pedir.",
    },
    {
      q: "¿Pueden igualar el color CertainTeed que ya está en la casa?",
      a: "A veces, si ese color todavía se fabrica y la caída no se destiñó de más. En Houston el sur y el oeste se destiñen. Si el paquete nuevo se va a notar, decimos que hace falta más que un parche.",
    },
    {
      q: "¿Cuánto tarda un cambio de techo CertainTeed?",
      a: "Un techo de asfalto donde se puede caminar suele ser unos días en el sitio cuando llega la teja. El pedido, un techo empinado, la madera dañada y la lluvia añaden tiempo. Esa secuencia se la damos después de la revisión.",
    },
    {
      q: "¿Ayudan con un reclamo de seguro del techo?",
      a: "Fotografiamos el daño, podemos estar con su ajustador y escribimos un estimado de la reparación. Usted presenta el reclamo. Su aseguradora decide. No somos ajustadores públicos.",
    },
    {
      q: "¿Reparan un techo CertainTeed o solo lo cambian?",
      a: "Las dos. La reparación sirve cuando el resto del techo aguanta y existe una teja que combine. El cambio sirve cuando las caídas están golpeadas, quebradizas o el color no se consigue.",
    },
    {
      q: "¿Qué hago si esta noche entra agua?",
      a: `Llame al ${phone}. Fotografiamos la abertura y ponemos lona cuando se puede estar en el techo. La lona no es el techo CertainTeed terminado. La teja permanente es el paso siguiente.`,
    },
    {
      q: "¿Dónde instalan techos CertainTeed?",
      a: "Desde la oficina en 511 Crestwater Ct, Houston, TX 77082, en Houston y en ciudades cercanas: Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University. Empresa familiar desde 1993.",
    },
  ],
  related: [
    ...cityLinks("roofing", "es"),
    { href: "/es/roofing", label: "Techos en Houston" },
    { href: "/es/roof-replacement", label: "Reemplazo de techo en Houston" },
    { href: "/roof-replacement-cost-houston", label: "Qué cambia el costo de un techo" },
    { href: "/es/roofing-emergency-tarp-repair", label: "Lona de emergencia para techos" },
    { href: "/es/houston-storm-damage", label: "Ayuda por tormenta en Houston" },
    { href: "/es/insurance-claims", label: "Ayuda con reclamos de seguro" },
    { href: "/es/james-hardie-siding-houston", label: "Siding James Hardie en Houston" },
  ],
};

const hardieEs: BrandPage = {
  slug: "james-hardie-siding-houston",
  locale: "es",
  path: "/es/james-hardie-siding-houston",
  enPath: "/james-hardie-siding-houston",
  esPath: "/es/james-hardie-siding-houston",
  metaTitle: "Siding James Hardie en Houston",
  description:
    "Siding James Hardie en Houston: HardiePlank, HardieTrim, ColorPlus y reparación por granizo o pudrición. Llame al (713) 909-0034.",
  eyebrow: "James Hardie",
  title: ["Siding James Hardie", "en Houston."],
  lede: `El siding James Hardie en Houston es tabla de fibrocemento en la pared que ve la calle: HardiePlank en hileras, HardieTrim en esquinas y ventanas, y pintura o ColorPlus. Elite Restorations instala estos productos. Somos una empresa familiar en Houston desde 1993. Llame al ${phone}.`,
  crumbs: [
    { name: "Servicios", path: "/es" },
    { name: "Siding", path: "/es/siding" },
    { name: "James Hardie", path: "/es/james-hardie-siding-houston" },
  ],
  image: "/images/services/siding.jpg",
  serviceName: "Siding James Hardie en Houston",
  relatedHeading: "Vecindarios y exterior relacionado",
  ctaTitle: "¿Planea siding James Hardie?",
  ctaBody: `Llame al ${phone} para ver la pared. Si la pared está abierta y entra agua, llame a cualquier hora. Instalamos las tablas. Su aseguradora decide el reclamo.`,
  sections: [
    {
      eyebrow: "Las tablas",
      heading: "HardiePlank, HardieTrim y ColorPlus.",
      paragraphs: [
        "HardiePlank es el siding de traslape, las hileras que se montan una sobre otra. Las tablas suelen medir 12 pies, en varios anchos, para que la parte visible coincida con un rancho en Sugar Land o con un muro más alto en Memorial. HardieTrim es la tabla de esquinas, ventanas, puertas y los bordes que hacen que la pared se vea terminada. No usamos HardiePlank como moldura ni como fascia. ColorPlus es el acabado horneado de fábrica de James Hardie. El HardiePlank con primario se pinta en la casa. Instalamos estos productos. Ese es el trabajo. No es una credencial.",
        "El fibrocemento es cemento y fibra de celulosa. No se pudre como el siding de pino cuando un aspersor o la tierra mantienen mojada la hilera de abajo, y no es comida para las termitas como lo es la madera. Por eso lo piden en esta humedad. No vuelve la casa a prueba de termitas, y no reemplaza el metal que saca el agua ni una barrera contra el agua. Una tabla nueva sobre un muro mojado sigue siendo un muro mojado. Vemos detrás del daño antes de pedir un igualado.",
      ],
    },
    {
      eyebrow: "Detrás",
      heading: "Cambiar madera podrida o siding quebrado por granizo.",
      paragraphs: [
        "Madera blanda junto a una llave de manguera, una hilera de abajo hinchada, o pintura que se sigue pelando en el muro oeste, es razón para abrir la pared, no solo para taparla. Vemos el triplay y la barrera. Si están mojados o podridos, esa capa es la reparación. El HardiePlank nuevo va después de que la madera está sana, el metal del agua está bien y el agua tiene por dónde salir. Tapar la pudrición con fibrocemento nuevo repite la falla, casi siempre en la misma hilera de abajo.",
        "El granizo puede quebrar el fibrocemento. El viento puede levantar una hilera o romper una esquina. Lo fotografiamos antes de cubrirlo. Un tramo se puede cambiar cuando el perfil todavía existe y el color se puede acercar. ColorPlus y la pintura de obra se destiñen en los muros sur y oeste de Houston. Una tabla nueva junto a un muro sur de diez años muchas veces no va a coincidir con el color original, ni con la pared como se ve hoy. Decimos cuándo un parche se va a notar y cuándo el muro necesita más. La misma tormenta pudo haber marcado el techo. Eso se ve aparte, y un techo CertainTeed es una de las opciones de teja.",
      ],
    },
    {
      eyebrow: "El clima",
      heading: "Humedad, termitas y el agua que se queda.",
      paragraphs: [
        "El problema de aquí es el agua que no se va: la humedad, el golpe del riego, el mantillo encima de la hilera de abajo, y un deck o un techo que toca el siding. Las instrucciones de instalación de James Hardie piden separación del suelo terminado, por lo general al menos 6 pulgadas, y un hueco donde el siding topa con un techo, un deck, un escalón o una banqueta. Guardamos esos huecos. Un aspersor apuntando a la pared va a mojar el fibrocemento nuevo igual que mojó la madera. Decirlo es parte de la visita. Una tabla nueva no arregla un aspersor que empapa el muro cada mañana.",
        "La pared detrás de la tabla necesita una barrera contra el agua y metal en cada ventana y puerta. Los cortes y el borde de abajo son por donde entra el agua a una tabla que de otro modo estaba sana. James Hardie recomienda tornillos o clavos de acero inoxidable en climas muy húmedos y cerca de grandes cuerpos de agua. Houston es ese clima, sobre todo hacia la bahía, y en muros que a la sombra nunca se secan del todo. Usamos fijaciones que resisten la corrosión, e inoxidable donde el muro se queda húmedo. Las termitas pueden seguir en la estructura de una casa vieja de Bellaire o West University. El fibrocemento no les da de comer. Si abrimos el muro y la madera está dañada, usted la ve antes de que la cerremos.",
      ],
    },
    {
      eyebrow: "El acabado",
      heading: "Pintura en la casa, o ColorPlus de fábrica.",
      paragraphs: [
        "El HardiePlank con primario se pinta mientras sube la pared, incluidos los cortes. Un corte crudo en esta humedad es como empieza la siguiente película de pintura. El color se iguala a las tablas que hay hoy, de día, no a una muestra del año en que se construyó la casa. Un color para toda la casa se elige igual: afuera, contra el ladrillo, el techo y la luz de esa calle.",
        "ColorPlus llega con el acabado ya horneado. Los cortes reciben el tratamiento de orilla que piden las instrucciones, o mueren en el HardieTrim y se sellan como esas instrucciones dicen. No sellamos con silicón las uniones a tope del ColorPlus, porque el silicón y el acabado de fábrica no envejecen igual, y por la misma razón no sellamos las cabezas de clavo que quedan a la vista. Cada tabla se pone donde se va a fijar. Deslizar una tabla ColorPlus nueva sobre una que ya está puesta raya la cara. Una muestra adentro no va a coincidir con el sol de una fachada en Katy o The Woodlands. Si la hoja de fábrica no tiene el color que necesita para igualar un muro viejo, pintar en el sitio es la opción honesta, y se lo decimos.",
      ],
    },
    {
      eyebrow: "Reclamos",
      heading: "Cuando el siding es parte de un reclamo por tormenta.",
      paragraphs: [
        "Si el viento o el granizo abrió la pared, fotografiamos las grietas, las hileras levantadas y lo que hay detrás si tenemos que abrir. Podemos estar cuando llegue su ajustador. El estimado es el precio del HardiePlank, del HardieTrim, del metal y del triplay que haya que quitar. No es el pago del reclamo. Usted lo presenta. Su aseguradora decide la cobertura y el pago. No somos ajustadores públicos y no damos consejo legal.",
        "Un cambio planeado, sin tormenta, es construcción, y así lo describimos. No le cambiamos el nombre a un muro gastado para que parezca granizo. Las marcas de granizo y la edad normal se ven distintas de cerca, y las notas dicen cuál vemos. Las fotos del daño y de la reparación terminada son suyas para compartir. La página de reclamos explica hasta dónde llega nuestra ayuda.",
      ],
    },
    {
      eyebrow: "La visita",
      heading: "Qué puede esperar, y cuánto tarda la pared.",
      paragraphs: [
        `Un tramo igualado suele ser un día o dos cuando las tablas ya están aquí. Una casa de un piso, con HardieTrim, suele ser varios días de instalación después de que llega el material. Dos pisos, muchas ventanas, gabletes y triplay podrido añaden días. Un color ColorPlus que hay que pedir es un tiempo de espera antes de esos días. Separamos la espera del trabajo en el muro cuando hablamos. Cambiar el siding de toda una casa en la ciudad de Houston puede pedir permiso. Una reparación chica muchas veces no. Bellaire, West University, Sugar Land y los condados de Katy y The Woodlands son mostradores distintos. Confirmamos la dirección.`,
        `La oficina está en 511 Crestwater Ct, Houston, TX 77082. Las visitas programadas son de lunes a sábado, de 8:00 AM a 6:00 PM. Si la pared está abierta y entra agua, llame al ${phone} a cualquier hora. Envíe un texto al mismo número si no puede hablar. Somos una empresa familiar aquí desde 1993. La visita es en la casa, en Houston y en las ciudades de abajo, incluidas Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University.`,
      ],
    },
  ],
  faqs: [
    {
      q: "¿Instalan siding James Hardie en Houston?",
      a: `Sí. Instalamos fibrocemento James Hardie, incluido HardiePlank y HardieTrim, con ColorPlus o pintura. Instalamos los productos. Llame al ${phone} para ver la pared.`,
    },
    {
      q: "¿HardiePlank es lo mismo que board-and-batten?",
      a: "No. HardiePlank es el traslape, las hileras. Board-and-batten es otro perfil y otra sombra. El patrón se decide con usted antes de la primera hilera.",
    },
    {
      q: "¿Pueden cambiar siding de madera podrida por fibrocemento?",
      a: "Sí, después de que el muro de atrás está seco y sano. El triplay blando y el metal fallado salen primero. HardiePlank nuevo sobre pudrición no arregla la pudrición.",
    },
    {
      q: "¿James Hardie ayuda con la humedad y las termitas de Houston?",
      a: "El fibrocemento no se pudre como la madera, y no es comida para las termitas como lo es el pino. Igual necesita separación del suelo, una barrera contra el agua y metal en las aberturas. No vuelve la casa a prueba de termitas.",
    },
    {
      q: "¿Conviene ColorPlus o pintar el siding?",
      a: "ColorPlus es el acabado horneado de fábrica. La tabla con primario se pinta en el sitio, y sirve cuando el color que necesita no está en la hoja de fábrica. Los dos se destiñen con el sol de Houston. La muestra se ve afuera.",
    },
    {
      q: "¿Pueden reparar siding dañado por granizo sin cambiar toda la casa?",
      a: "A menudo, si el perfil existe y el desteñido se puede acercar. Una tabla quebrada se reemplaza, no se rellena. Si el parche siempre se va a ver, decimos que el muro necesita más que ese tramo.",
    },
    {
      q: "¿Documentan el daño del siding para un reclamo?",
      a: "Fotografiamos el daño y la reparación, y podemos estar con su ajustador. Usted presenta el reclamo. Su aseguradora decide. No somos ajustadores públicos.",
    },
    {
      q: "¿Cuánto tarda el siding James Hardie y dónde trabajan?",
      a: "Un tramo suele ser un día o dos en el sitio cuando llegan las tablas. Una casa completa tarda más, y un color ColorPlus tiene su propio tiempo de espera. Trabajamos desde 511 Crestwater Ct, Houston, TX 77082, incluyendo Katy, Sugar Land, Bellaire, The Woodlands, River Oaks, Memorial y West University.",
    },
  ],
  related: [
    ...cityLinks("siding", "es"),
    { href: "/es/siding", label: "Siding en Houston" },
    { href: "/es/houston-storm-damage", label: "Ayuda por tormenta en Houston" },
    { href: "/es/insurance-claims", label: "Ayuda con reclamos de seguro" },
    { href: "/es/roofing", label: "Techos en Houston" },
    { href: "/es/certainteed-roofing-houston", label: "Techos CertainTeed en Houston" },
  ],
};

export const brandPages: readonly BrandPage[] = [
  certainteedEn,
  hardieEn,
  certainteedEs,
  hardieEs,
];

export function brandBodyWords(page: BrandPage) {
  return wordCount([
    page.lede,
    ...page.sections.flatMap((section) => [
      section.eyebrow,
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []).flatMap((point) => [point.title, point.body]),
    ]),
  ]);
}

const banned =
  /\bGAF\b|\bIICRC\b|\bguarant|\bgarantiz|\bcertific|\bauthorized\b|\bautorizad|\bpreferred contractor\b|\bcontratista preferid/i;

const requiredMarks: Record<string, readonly string[]> = {
  "certainteed-roofing-houston": ["CertainTeed", "Landmark", "Landmark PRO", "Landmark ClimateFlex"],
  "james-hardie-siding-houston": ["James Hardie", "HardiePlank", "HardieTrim", "ColorPlus"],
};

function pageBlob(page: BrandPage) {
  return [
    page.metaTitle,
    page.description,
    page.lede,
    page.ctaTitle,
    page.ctaBody,
    ...page.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []).flatMap((point) => [point.title, point.body]),
    ]),
    ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
  ].join("\n");
}

const brandErrors: string[] = [];
for (const page of brandPages) {
  const words = brandBodyWords(page);
  const detail = page.sections
    .map((section) => {
      const count = wordCount([
        section.eyebrow,
        section.heading,
        ...section.paragraphs,
        ...(section.points ?? []).flatMap((point) => [point.title, point.body]),
      ]);
      return `${section.heading} ${count}`;
    })
    .join("; ");
  if (words < 900 || words > 1300) {
    brandErrors.push(`${page.path} body is ${words} words (${detail})`);
  }
  if (page.faqs.length < 6 || page.faqs.length > 8) {
    brandErrors.push(`${page.path} has ${page.faqs.length} FAQs`);
  }
  if (!titleFits(page.metaTitle)) {
    brandErrors.push(`${page.path} title does not fit: ${page.metaTitle}`);
  }
  if (page.description.length > 155) {
    brandErrors.push(`${page.path} description is ${page.description.length} characters`);
  }
  if (banned.test(pageBlob(page))) {
    brandErrors.push(`${page.path} uses a banned phrase`);
  }
  const blob = pageBlob(page);
  for (const mark of requiredMarks[page.slug] ?? []) {
    if (!blob.includes(mark)) brandErrors.push(`${page.path} is missing ${mark}`);
  }
  if (!blob.includes(phone)) brandErrors.push(`${page.path} is missing the phone`);
  if (!blob.includes("511 Crestwater Ct")) brandErrors.push(`${page.path} is missing the address`);
  if (page.locale === "en" && !/not public adjusters/i.test(blob)) {
    brandErrors.push(`${page.path} does not say we are not public adjusters`);
  }
  if (page.locale === "es" && !blob.includes("No somos ajustadores públicos")) {
    brandErrors.push(`${page.path} does not say we are not public adjusters`);
  }
  const repeated = new Set<string>();
  const seen = new Set<string>();
  for (const faq of page.faqs) {
    const key = faq.q.trim().toLowerCase();
    if (seen.has(key)) repeated.add(faq.q);
    seen.add(key);
  }
  if (repeated.size > 0) brandErrors.push(`${page.path} repeats FAQ: ${[...repeated].join(" | ")}`);
  if (page.locale === "en") {
    if (
      getService(page.slug) ||
      getArticle(page.slug) ||
      getAreaPage(page.slug) ||
      getCostGuide(page.slug) ||
      parseLocalLandingSlug(page.slug)
    ) {
      brandErrors.push(`${page.slug} collides with an existing route`);
    }
  }
  const hrefs = new Set(page.related.map((link) => link.href));
  const service = page.slug.startsWith("certainteed") ? "roofing" : "siding";
  for (const [area] of cities) {
    const href = `/${service}-${area}-tx`;
    if (!hrefs.has(href)) brandErrors.push(`${page.path} is missing ${href}`);
  }
  const hubs =
    page.locale === "es"
      ? service === "roofing"
        ? ["/es/roofing", "/es/insurance-claims", "/es/houston-storm-damage"]
        : ["/es/siding", "/es/insurance-claims", "/es/houston-storm-damage"]
      : service === "roofing"
        ? ["/roofing", "/insurance-claims", "/houston-storm-damage"]
        : ["/siding", "/insurance-claims", "/houston-storm-damage"];
  for (const href of hubs) {
    if (!hrefs.has(href)) brandErrors.push(`${page.path} is missing ${href}`);
  }
}
if (brandErrors.length > 0) {
  throw new Error(brandErrors.join("\n"));
}

const byKey = new Map(brandPages.map((page) => [`${page.locale}:${page.slug}`, page]));

export function getBrandPage(slug: string, locale: "en" | "es") {
  return byKey.get(`${locale}:${slug}`);
}
