import { assertCopyAllowed } from "@/lib/copy-guards";
import type { Faq } from "@/lib/faqs/types";

const phone = "(713) 909-0034";

export const homeownerEn = {
  insurance: {
    q: "Do you help with insurance claims?",
    a: `Yes. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer still decides what the policy pays. Call ${phone} if you want us at the house.`,
  },
  waterSpeed: {
    q: "How fast can you respond to water damage in Houston?",
    a: `Call ${phone} if water is still spreading or it is near power. We respond quickly, often the same day when crews are available. We tell you the next safe step. We do not promise a drive time. After a hurricane or a citywide freeze, the line is longer. Calling puts the address on it.`,
  },
  stormRoofs: {
    q: "Do you repair storm and hail damaged roofs?",
    a: `Yes. We look at the roof when it is safe, photograph hail bruises and wind damage, and repair the roof when a repair will hold. If the shingles are worn out across the slopes, or the wood underneath is soft, we talk about replacement. Call ${phone}.`,
  },
  tarp: {
    q: "Do you offer emergency roof tarping?",
    a: `Yes. When a roof is open and it is safe to be up there, we cover the opening so more rain stays out. A tarp is not the finished roof. We do not climb in lightning. Call ${phone} and tell us if water is still coming in. We respond quickly, often the same day when crews are available.`,
  },
  flooring: {
    q: "What flooring do you install (laminate, LVP, tile, hardwood)?",
    a: `We install laminate, luxury vinyl plank (LVP), tile, and hardwood. Tile is the usual floor for a bathroom and other wet rooms. Laminate fits dry bedrooms and halls. Luxury vinyl handles a kitchen or a laundry room better than wood. Hardwood, solid or engineered, depends on whether the house is on a slab or over a crawl space. Call ${phone} and we will say which one fits the room.`,
  },
  remodel: {
    q: "Do you do kitchen and bathroom remodeling?",
    a: `Yes. We plan and build kitchens and bathrooms as one project: cabinets, counters, tile, showers, and the light. A kitchen you have been planning and a bath that opened because of a leak are different jobs, and we will say which one you have. Call ${phone}.`,
  },
  areas: {
    q: "What areas do you serve?",
    a: `Houston and the surrounding cities within about 50 minutes of west Houston. That includes Katy, Sugar Land, Cypress, Richmond, Missouri City, Fulshear, Pearland, Bellaire, Memorial, and Spring Branch. Visits are scheduled from our office in west Houston (77082). Call ${phone}.`,
  },
  spanish: {
    q: "Do you speak Spanish?",
    a: `Yes, hablamos español. Call ${phone} or use the contact form, in English or in Spanish.`,
  },
  estimate: {
    q: "How do I get an estimate?",
    a: `Call ${phone} or use the contact form. For a scheduled visit, the office is open Monday through Saturday, 8:00 AM to 6:00 PM. If water is coming in, call first.`,
  },
  years: {
    q: "How long have you been in business?",
    a: "We are a family-owned company, serving Houston since 1993.",
  },
} as const satisfies Record<string, Faq>;

export const homeownerEnList: Faq[] = [
  homeownerEn.insurance,
  homeownerEn.waterSpeed,
  homeownerEn.stormRoofs,
  homeownerEn.tarp,
  homeownerEn.flooring,
  homeownerEn.remodel,
  homeownerEn.areas,
  homeownerEn.spanish,
  homeownerEn.estimate,
  homeownerEn.years,
];

export const homeownerEs = {
  insurance: {
    q: "¿Ayudan con los reclamos del seguro?",
    a: `Sí. Elite trabaja con su aseguradora como su contratista, documenta el daño y negocia el alcance del reclamo con el ajustador. No somos ajustadores públicos. La aseguradora sigue decidiendo lo que paga la póliza. Llame al ${phone} si quiere que estemos en la casa.`,
  },
  waterSpeed: {
    q: "¿Qué tan pronto pueden responder a un daño de agua en Houston?",
    a: `Si el agua se está extendiendo o está junto a la electricidad, llame al ${phone}. Respondemos pronto, a menudo el mismo día cuando hay cuadrilla disponible. Le decimos el siguiente paso seguro. No prometemos un tiempo de manejo. Después de un huracán o una helada en toda la ciudad, la fila es más larga.`,
  },
  stormRoofs: {
    q: "¿Reparan techos dañados por tormenta y granizo?",
    a: `Sí. Revisamos el techo cuando se puede trabajar con seguridad, tomamos fotos del granizo y del viento, y reparamos cuando una reparación va a aguantar. Si las tejas ya están gastadas en las pendientes, o la madera de abajo está blanda, hablamos de cambiar el techo. Llame al ${phone}.`,
  },
  tarp: {
    q: "¿Ponen lona de emergencia en el techo?",
    a: `Sí. Cuando el techo está abierto y se puede trabajar arriba con seguridad, cubrimos la abertura para que no entre más lluvia. La lona no es el techo terminado. No subimos con rayos. Llame al ${phone} y diga si sigue entrando agua. Respondemos pronto, a menudo el mismo día cuando hay cuadrilla disponible.`,
  },
  flooring: {
    q: "¿Qué pisos instalan (laminado, vinil LVP, loseta y madera)?",
    a: `Instalamos laminado, vinil de lujo (LVP), loseta y madera. La loseta suele ir en baños y otros cuartos mojados. El laminado va bien en recámaras y pasillos secos. El vinil aguanta mejor una cocina o una lavandería que la madera. La madera, sólida o de ingeniería, depende de si la casa está sobre losa o sobre un espacio debajo del piso. Llame al ${phone} y le decimos cuál corresponde al cuarto.`,
  },
  remodel: {
    q: "¿Hacen remodelación de cocinas y baños?",
    a: `Sí. Planeamos y construimos cocinas y baños como un solo trabajo: gabinetes, cubiertas, loseta, regaderas y la luz. Una cocina que ya tenían pensada y un baño que se abrió por una fuga son trabajos distintos, y se lo decimos. Llame al ${phone}.`,
  },
  areas: {
    q: "¿Qué zonas atienden?",
    a: `Houston y las ciudades de alrededor, a unos 50 minutos del oeste de Houston. Incluye Katy, Sugar Land, Cypress, Richmond, Missouri City, Fulshear, Pearland, Bellaire, Memorial y Spring Branch. Las visitas salen de nuestra oficina en el oeste de Houston (77082). Llame al ${phone}.`,
  },
  spanish: {
    q: "¿Hablan español?",
    a: `Sí, hablamos español. Llame al ${phone} o use el formulario de contacto, en español o en inglés.`,
  },
  estimate: {
    q: "¿Cómo pido un estimado?",
    a: `Llame al ${phone} o use el formulario de contacto. Para una cita, la oficina abre de lunes a sábado, de 8:00 AM a 6:00 PM. Si está entrando agua, llame primero.`,
  },
  years: {
    q: "¿Cuánto tiempo llevan trabajando?",
    a: "Somos una empresa familiar y servimos a Houston desde 1993.",
  },
} as const satisfies Record<string, Faq>;

export const homeownerEsList: Faq[] = [
  homeownerEs.insurance,
  homeownerEs.waterSpeed,
  homeownerEs.stormRoofs,
  homeownerEs.tarp,
  homeownerEs.flooring,
  homeownerEs.remodel,
  homeownerEs.areas,
  homeownerEs.spanish,
  homeownerEs.estimate,
  homeownerEs.years,
];

/** Extra questions for the service hub that owns the topic. */
export const serviceHomeownerFaqs: Record<string, readonly Faq[]> = {
  roofing: [homeownerEn.stormRoofs],
  "roofing-emergency-tarp-repair": [homeownerEn.tarp],
  "wood-flooring": [homeownerEn.flooring],
  "tile-flooring": [homeownerEn.flooring],
  "vinyl-flooring": [homeownerEn.flooring],
  "laminate-flooring": [homeownerEn.flooring],
  "kitchen-remodeling": [homeownerEn.remodel],
  "bathroom-remodeling": [homeownerEn.remodel],
};

export const esHubHomeownerFaqs: Record<string, readonly Faq[]> = {
  roofing: [homeownerEs.stormRoofs],
  "roofing-emergency-tarp-repair": [homeownerEs.tarp],
  "wood-flooring": [homeownerEs.flooring],
  "tile-flooring": [homeownerEs.flooring],
  "vinyl-flooring": [homeownerEs.flooring],
  "laminate-flooring": [homeownerEs.flooring],
  "kitchen-remodeling": [homeownerEs.remodel],
  "bathroom-remodeling": [homeownerEs.remodel],
  "insurance-claims": [homeownerEs.insurance],
};

function joined(items: readonly Faq[]) {
  return items.map((item) => `${item.q} ${item.a}`).join("\n");
}

assertCopyAllowed("homeowner-faqs", joined(homeownerEnList));
assertCopyAllowed("es/homeowner-faqs", joined(homeownerEsList));
