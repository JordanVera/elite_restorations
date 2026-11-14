import type { TradeSpec } from '@/lib/local/engine';
import { miles } from '@/lib/local/engine';
import { site } from '@/lib/site';

const phone = site.phone.display;

export const kitchenTrade: TradeSpec = {
  slug: 'kitchen-remodeling',
  work: 'kitchen remodeling',
  exterior: false,
  ledes: [
    (a) =>
      `Kitchen remodeling in ${a.name}, TX, is the room you cook in: layout, cabinets, and the path from the sink to the range, settled before demolition.`,
    (a) =>
      `A ${a.name} kitchen is measured before anyone promises a wall can move. ${a.housingShort} is the context, not a package with the city name on it.`,
    (a) =>
      `In ${a.name} we plan cabinets, counters, light, and the floor joint as one kitchen. The visit comes before the demolition.`,
    (a) =>
      `${a.name} kitchens start with how you cook and gather. We draw that, then we check what the plumbing and the walls will actually allow.`,
  ],
  openers: [
    (a) =>
      `For a kitchen, that kind of house decides whether the work is an island in a room that is already open, or a wall we may not be able to remove. In ${a.name} the answer is on paper before the first cabinet comes out.`,
    (a) =>
      `Kitchen remodeling there means one job: cabinets, counters, backsplash, lighting, and the floor where the kitchen meets the next room. ${a.name} does not get a different sequence. The room does.`,
    (a) =>
      `We treat that description as a reason to measure, not as a style. Out-of-square walls, a closed galley, or an island that already holds the parties are different drawings, and ${a.name} has more than one of them.`,
  ],
  foundation: {
    pier: [
      (a) =>
        `Older pier-and-beam kitchens, the kind still common among ${a.housingShort}, can often move a drain through the crawlspace instead of through concrete. The limit is the wall above. We do not open a bearing wall in ${a.name} because a floor plan wishes it were gone. Cabinets also need a level plane, and an old floor sometimes has to be leveled first.`,
      (a) =>
        `A crawlspace under a ${a.name} kitchen is useful and it is not a blank check. We look at the joists, the drain, and whether an addition somewhere else on the house changed the structure. Humidity in that crawlspace is noted before new wood and new cabinets go in above it.`,
    ],
    slab: [
      (a) =>
        `Slab kitchens in ${a.name} keep the sink on the existing drain or they cut and patch concrete. We say which one this room is before demolition. Flatness matters too, because the new floor and the cabinet run will show a ridge the old floor hid. Cabinet boxes are specified so the doors still close in a Gulf Coast summer.`,
      (a) =>
        `On a ${a.name} slab the plumbing is under the finish. A layout that slides the range a few inches may be simple. A layout that moves the sink across the room is a different job. We trace that before we order boxes, and we level the run the cabinets have to sit on.`,
    ],
    mixed: [
      (a) =>
        `${a.name} does not have one foundation. A kitchen might be pier-and-beam, an early slab, or an addition that joined the two. We identify which floor this room sits on before we draw a layout. The joint between two foundation types is where tile and backsplash cracks like to start, so we look for it.`,
      (a) =>
        `Assuming a ${a.name} kitchen matches the house next door is how drain plans go wrong. We spend the first part of the visit on the foundation and the supply lines, then on the cabinets. Older lines sometimes need to be seen before a new valve or a new dishwasher is promised.`,
    ],
    'post-tension': [
      (a) =>
        `Newer kitchens in ${a.name} often sit on post-tension slabs, with cables in the concrete. Cutting a cable is dangerous and it damages the slab. We locate cables before a sink drain is designed to move. If the cables block the spot you wanted, the layout changes on paper. An older house in the same city may be a conventional slab, so we do not assume until we see this one.`,
      (a) =>
        `A ${a.name} remodel that keeps the drains does not need to cut a post-tension slab. A remodel that relocates the sink does. That choice is made before demolition, with the island and the walking path drawn around what the slab allows. Cabinet specs still account for summer humidity.`,
    ],
    raised: [
      (a) =>
        `A kitchen in ${a.name} may be a flight up from the street. We plan the layout for the room you cook in, and we plan how cabinets get up there. The plumbing drop is longer than in a slab house on the mainland. Salt air is an exterior problem. Inside, the work is still the drains, the humidity, and the cabinets.`,
      (a) =>
        `Raised construction in ${a.name} is not the same as a bungalow crawlspace. We look at access, the length of the drain run, and whether this block limits what the street sees. The kitchen behind the wall is planned as its own job once that is clear.`,
    ],
  },
  craft: [
    (a) =>
      `Finishes in ${a.name} are chosen before demolition: cabinet boxes, the counter edge, the backsplash pattern, the light, and the floor that meets the next room. One team runs those trades. You are not coordinating a stone shop, a cabinet shop, and an electrician who have never been in the room together.`,
    (a) =>
      `The drawing for a ${a.name} kitchen includes storage, the appliance locations, and where people stand. An island that blocks the refrigerator is a layout problem, and it is cheaper to erase on paper. We also match the new work to the trim you are keeping.`,
    (a) =>
      `Demolition in ${a.name} starts only after the layout and the lead times are real. The cabinet order, the template sequence, and the electrical for the lights are already in the plan. A sample board is not a plan.`,
  ],
  sequence: [
    (a) =>
      `The visit order in ${a.name} is measure, including anything out of square, then decide what plumbing can move, then choose cabinets and surfaces, then demolish. After that comes rough work, boxes, template, stone, backsplash, the floor transition, and the paint that closes the room.`,
    (a) =>
      `We do not start a ${a.name} kitchen by tearing out boxes to see what happens. That part is the measuring visit. After that, demolition has a plan, a dumpster location that fits the lot, and a sequence the other trades can follow.`,
  ],
  coda: [
    (a) =>
      `That local constraint sits on an ordinary job: cabinets, counters, light, and a floor that meets the next room. The price is this kitchen after the visit, not a ${a.name} average.`,
    (a) =>
      `Houses near ${a.name} can look alike from the street and still hide a different drain. We will say what this address allows. Call ${phone} when you want the visit on the calendar.`,
  ],
  notes: [
    {
      title: 'Layout before demolition',
      bodies: [
        (a) =>
          `In ${a.name} the path from the sink to the range, the storage, and where people gather are drawn first. Demolition follows that drawing.`,
        (a) =>
          `A ${a.name} kitchen that opens to the house and a kitchen that stays closed are different drawings. We pick one before a wall is touched.`,
      ],
    },
    {
      title: 'Drains and the floor',
      bodies: [
        (a) =>
          `We identify the foundation under this ${a.name} kitchen before we promise a sink can move. Cables, a crawlspace, and a plain slab are not the same cut.`,
        (a) =>
          `Flatness is checked while we talk about cabinets. A ridge in a ${a.name} floor becomes a ridge in the new run if it is ignored.`,
      ],
    },
    {
      title: 'One materials list',
      bodies: [
        (a) =>
          `Cabinet boxes for a humid summer, the counter, the backsplash, and the lights are chosen together in ${a.name}, before the room is an empty shell.`,
        (a) =>
          `The floor where the ${a.name} kitchen meets the next room is part of the same job, so the heights are decided with the cabinets.`,
      ],
    },
  ],
  faqs: [
    {
      q: (a) => `Can you move the sink in a ${a.name} kitchen?`,
      answers: [
        (a) =>
          `Sometimes. It depends on the drain under this kitchen, not on ${a.name} as a label. A crawlspace can make a move simpler. A slab means cutting concrete. A post-tension slab means locating cables before anyone cuts. We trace the current drain on the visit and say which of those this room is. Keeping the sink where it is remains a valid layout when the move is the costly part and you do not need it.`,
        (a) =>
          `The sink moves when the plumbing can move with it. In ${a.name}, near ${a.landmark}, that is a foundation question. If the drain should stay, the cabinets are designed around it. If it can move, the cut or the crawlspace work is in the job before demolition. We do not discover that after the old kitchen is already gone.`,
      ],
    },
    {
      q: (a) => `Does an association review a kitchen remodel in ${a.name}?`,
      answers: [
        (a) =>
          `Interior cabinets rarely need an association’s approval. Around ${a.name}, reviews usually cover the roof, the paint, and the street. A building permit is separate. It shows up when plumbing, electrical, or a wall changes. We say which of those this plan triggers after we see it, and which city counter the address uses. ${a.housingShort} is not what decides the permit.`,
        (a) =>
          `Do not assume a ${a.name} kitchen is either unregulated or designed by a committee. The association, where one exists, usually cares about the front. The city cares when pipes, wires, or structure change. We separate those on the visit so the schedule includes a permit only when the work requires one.`,
      ],
    },
    {
      q: (a) => `What do you measure before a ${a.name} kitchen demolition?`,
      answers: [
        (a) =>
          `The ${a.name} room that is there: walls out of square, appliance locations, door swings, and the floor height at the next room. Those measurements become the cabinet order. We also confirm the foundation so the drawing does not depend on a drain the house cannot give you. Lead times are named before the old kitchen comes out.`,
        (a) =>
          `We measure how you cook, not only the length of the walls. A ${a.name} kitchen used by one cook has a different path from a kitchen where people stand and talk. Storage, the light, and a landing spot for groceries are part of that conversation. The tape checks whether the house can build it.`,
      ],
    },
    {
      q: (a) => `How does humidity affect cabinets in ${a.name}?`,
      answers: [
        (a) =>
          `Cabinet boxes in ${a.name} live with Gulf humidity. We specify them before they are ordered so doors still work in August, not only on a dry installation day. Stone and grout get a plain care conversation at the same time. That is a materials choice, not a promise that a kitchen never needs cleaning or adjustment.`,
        (a) =>
          `Humidity is why a ${a.name} kitchen is detailed differently from a dry-climate catalog. Wood moves. A crawlspace can be damp. A slab can push moisture into the wrong floor. We pick assemblies for those conditions and acclimate wood in the house. The visit is where we say what this room needs.`,
      ],
    },
    {
      q: (a) => `How do you schedule kitchen remodeling in ${a.name}?`,
      answers: [
        (a) =>
          `Call ${phone} or use the estimate form. We schedule ${a.name} from 511 Crestwater Ct. ${a.landmark} is about ${miles(a)} miles ${a.direction}, measured in a straight line, and the drive follows ${a.roads}. The kitchen cost page on this site explains what changes a Houston price. It is not a quote for this room. The quote follows the visit.`,
        (a) =>
          `The office is in west Houston, 77082. Call ${phone}, say what you want the ${a.name} kitchen to do, and we set a visit. Mention a wall you hope to open or a sink you hope to move so we look at those first. Mileage to ${a.landmark} is about ${miles(a)} miles in a straight line and does not set the layout.`,
      ],
    },
  ],
};
