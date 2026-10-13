export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] };

export type ArticleSection = {
  heading: string;
  blocks: ArticleBlock[];
};

export type Article = {
  slug: string;
  title: string;
  crumb: string;
  lines: readonly string[];
  description: string;
  lede: string;
  image?: string;
  service?: string;
  emergency?: boolean;
  ctaTitle: string;
  ctaBody: string;
  related: string[];
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: 'remodeling-vs-restoring-whats-right-for-your-home',
    title: 'Remodeling vs. restoring: which one the house needs',
    crumb: 'Restore or remodel',
    lines: ['Restore it,', 'or remodel it.'],
    description:
      'How to tell a restoration from a remodel, when a Houston house needs both, and what to settle before work starts.',
    lede: 'A dated kitchen and a water-damaged kitchen are different problems. One is a choice to change the room. The other is the house asking to be put back.',
    image: '/images/services/kitchen-remodeling.jpg',
    service: 'kitchen-remodeling',
    ctaTitle: 'Not sure which job this is?',
    ctaBody:
      'Tell us what happened, or what you want the room to do. We will help you separate repair from remodel before anyone prices the work.',
    related: [
      'how-to-prevent-water-damage-in-your-home',
      'top-5-benefits-of-remodeling-your-kitchen-in-2025',
    ],
    sections: [
      {
        heading: 'Restoration puts the house back',
        blocks: [
          {
            type: 'p',
            text: 'Restoration is the work that follows damage: a supply-line leak, a roof that let a storm in, smoke, or the water the fire department left behind. The aim is a safe, dry, usable space again, as close to the condition before the loss as the materials allow.',
          },
          {
            type: 'p',
            text: 'That usually means drying, removing what cannot be saved, and rebuilding the finishes that were there. Insurance often applies, because something failed. Speed matters. Wet drywall and flooring do not improve while you compare door styles.',
          },
        ],
      },
      {
        heading: 'Remodeling changes the room on purpose',
        blocks: [
          {
            type: 'p',
            text: 'A remodel is planned. You want a different layout, new cabinets, a bath that actually works, or floors that match the rest of the house. Nothing has to be broken for the project to make sense.',
          },
          {
            type: 'p',
            text: 'Remodels take longer to decide and usually longer to build. Permits show up when walls, plumbing, or electrical move. The cost is yours, not a claim, so the scope should be settled before demolition.',
          },
        ],
      },
      {
        heading: 'A simple way to sort the job',
        blocks: [
          {
            type: 'list',
            items: [
              'If the room is unsafe, wet, or stained from a sudden event, start with restoration.',
              'If the room is tired but sound, you are remodeling.',
              'If damage and a wish list arrived together, dry and stabilize first, then decide what is worth changing.',
            ],
          },
          {
            type: 'p',
            text: 'Mixing them too early is how a repair turns into an open-ended remodel, or a remodel starts on a wet subfloor. We separate the two so the urgent work is finished and the optional work is chosen.',
          },
        ],
      },
      {
        heading: 'Plenty of houses need both',
        blocks: [
          {
            type: 'p',
            text: 'A leak under the sink can ruin a cabinet run you already disliked. Smoke can take the drywall in a room you wanted to open up. In those cases the restoration is the first phase: make it dry, clean, and structurally sound. The remodel is the second: new cabinets, a shifted layout, flooring that continues into the next room.',
          },
          {
            type: 'p',
            text: 'Doing both with one crew keeps the drying, the carpentry, and the finishes on the same plan. You are not handing a half-dried kitchen from a mitigation company to a remodeler who has not seen the loss.',
          },
        ],
      },
    ],
  },
  {
    slug: 'how-to-prevent-water-damage-in-your-home',
    title: 'How to prevent water damage in your home',
    crumb: 'Prevent water damage',
    lines: ['Stop the leak', 'before the tear-out.'],
    description:
      'Practical checks for supply lines, roofs, and wet rooms that keep a Houston house from a water-damage restoration.',
    lede: 'Most of the water jobs we see started as something small: a supply line, a pan, a flashing detail, a clogged gutter. The expensive part is how long it sat.',
    image: '/images/services/water-damage-restoration.jpg',
    service: 'water-damage-restoration',
    emergency: true,
    ctaTitle: 'Already finding water?',
    ctaBody:
      'If the ceiling is wet, the floor is soft, or an appliance let go, call. Drying early is cheaper than rebuilding later.',
    related: [
      'what-to-do-after-a-fire-your-first-5-steps',
      'signs-its-time-to-replace-your-homes-flooring',
    ],
    sections: [
      {
        heading: 'Where Houston houses take on water',
        blocks: [
          {
            type: 'p',
            text: 'Flat roofs, long cooling seasons, and sudden storms all push water at the same places: water heaters, washing-machine hoses, dishwasher and ice-maker lines, window walls, and roofs that were fine until one storm. Bathrooms and kitchens hide the slow leaks behind cabinets.',
          },
        ],
      },
      {
        heading: 'A twice-a-year walk-through',
        blocks: [
          {
            type: 'p',
            text: 'Twice a year, look at the things that move water and the things that are supposed to keep it out. You do not need a tool kit. You need a flashlight and ten quiet minutes.',
          },
          {
            type: 'list',
            items: [
              'Supply lines at the toilets, sinks, washer, dishwasher, and refrigerator. Look for corrosion, bulging, and crusty white residue.',
              'The water-heater pan and the drain it is supposed to use. A pan full of water is already a leak.',
              'Under-sink cabinets and the floor in front of the dishwasher. Swollen particle board is a record of a leak, not a stain.',
              'Gutter outlets, downspouts, and the ground next to the foundation. Water should leave the house, not sit against it.',
              'Attic and ceiling stains after a hard rain, especially under roof penetrations and valleys.',
            ],
          },
        ],
      },
      {
        heading: 'Replace the lines that fail without warning',
        blocks: [
          {
            type: 'p',
            text: 'Braided stainless supply lines cost little compared with a flooded room, and rubber hoses on washers are a common failure. If a line is original to an old appliance, replace it when you replace the appliance, or sooner if it feels stiff or looks stained.',
          },
          {
            type: 'p',
            text: 'Know where the main shutoff is, and make sure it actually turns. In a burst, the useful move is stopping the water, then getting out of standing water if outlets or the panel may be wet.',
          },
        ],
      },
      {
        heading: 'When you do find water',
        blocks: [
          {
            type: 'p',
            text: 'Shut the supply off if you can do it without stepping through standing water near power. Move what you can save. Photograph the source and the damage before anything is thrown away. Then get the structure dried. Fans from the hall closet are not a substitute for finding moisture in the wall or under the floor.',
          },
          {
            type: 'p',
            text: 'If the water came from a sudden break or a storm, call your insurer and a restoration crew the same day. The longer gypsum, insulation, and wood stay wet, the more of the room has to come out.',
          },
        ],
      },
    ],
  },
  {
    slug: 'what-to-do-after-a-fire-your-first-5-steps',
    title: 'What to do after a fire: the first five steps',
    crumb: 'After a fire',
    lines: ['The first hours', 'after a fire.'],
    description:
      'The first steps after a house fire in Houston: stay out until it is safe, start the claim, document the loss, secure the building, and begin cleanup.',
    lede: 'Once everyone is out and the fire department is on scene, the next decisions are about safety, the claim, and keeping a damaged building from getting worse overnight.',
    image: '/images/services/roofing-emergency-tarp-repair.jpg',
    emergency: true,
    ctaTitle: 'Need the building secured?',
    ctaBody:
      'If the fire department has released the property and you need board-up, tarping, or cleanup, call. We answer emergency work across Greater Houston.',
    related: [
      'remodeling-vs-restoring-whats-right-for-your-home',
      'how-to-prevent-water-damage-in-your-home',
    ],
    sections: [
      {
        heading: '1. Stay out until you are cleared',
        blocks: [
          {
            type: 'p',
            text: 'Get everyone out and call 911. Do not go back in for documents, pets you cannot see, or a quick look at the kitchen. Smoke, a weakened floor, and a fire that is not fully out are the hazards that hurt people after the first flames are down.',
          },
          {
            type: 'p',
            text: 'Wait until the fire department says the building is safe to enter. If they will only allow a supervised walk-through, take it, and do not stay to start cleaning.',
          },
        ],
      },
      {
        heading: '2. Call your insurer and open a record',
        blocks: [
          {
            type: 'p',
            text: 'Call the insurance company as soon as you reasonably can, the same day if the office or the claims line is open. Ask how they want the loss reported and what they need before debris is removed. Write down the claim number and the name of anyone you speak with.',
          },
        ],
      },
      {
        heading: '3. Photograph what you can safely see',
        blocks: [
          {
            type: 'p',
            text: 'From a safe place, photograph rooms, roofs, broken openings, and damaged belongings before they are moved. Include wide shots and close shots. The water used to fight the fire is part of the loss. Ceilings, floors, and contents that look only wet still belong in the record.',
          },
          {
            type: 'list',
            items: [
              'Charred or melted finishes and furniture',
              'Smoke on ceilings and inside cabinets',
              'Broken glass, open roofs, and missing doors',
              'Wet drywall and flooring from suppression',
            ],
          },
        ],
      },
      {
        heading: '4. Close the building against weather and entry',
        blocks: [
          {
            type: 'p',
            text: 'An open roof, a broken window, or a door that will not lock will turn one loss into two. Board-up and tarping are there to keep rain out and the house secure until repairs are scoped. If utilities were not already shut off by the fire department, ask them before anyone else touches gas or the panel.',
          },
        ],
      },
      {
        heading: '5. Start cleanup before soot sits',
        blocks: [
          {
            type: 'p',
            text: 'Soot is acidic. The longer it stays on metal, stone, and finished wood, the more of those surfaces are lost. A fire cleanup is not a weekend of household cleaner. It is removal of what cannot be saved, cleaning of what can, and drying wherever suppression water went.',
          },
          {
            type: 'p',
            text: 'After the emergency work, the rebuild can be a straight restoration or the start of a remodel. That choice can wait until the building is safe, dry, and documented.',
          },
        ],
      },
    ],
  },
  {
    slug: 'bathroom-upgrades-that-boost-your-homes-resale-value',
    title: 'Bathroom upgrades that help a home sell',
    crumb: 'Bathroom upgrades',
    lines: ['Bathroom work', 'buyers notice.'],
    description:
      'Bathroom upgrades Houston buyers actually notice: sound waterproofing, honest finishes, light, ventilation, and floors that can take water.',
    lede: 'Buyers read a bathroom quickly. They are looking for leaks, tired fixtures, and a room that feels cared for. The upgrades that help a sale are the ones that remove those doubts.',
    image: '/images/services/bathroom-remodeling.jpg',
    service: 'bathroom-remodeling',
    ctaTitle: 'Planning a bath before a sale?',
    ctaBody:
      'We will walk the room and tell you what is worth doing for the house you have, not a catalog version of it.',
    related: [
      'signs-its-time-to-replace-your-homes-flooring',
      'remodeling-vs-restoring-whats-right-for-your-home',
    ],
    sections: [
      {
        heading: 'Repair what looks neglected',
        blocks: [
          {
            type: 'p',
            text: 'Soft flooring at the tub, stained grout, a caulk joint that has pulled away, and a fan that does not actually move air tell a buyer the wet areas have been ignored. Fix those before you spend money on a new mirror. A clean, dry, ordinary bath beats a styled one with a soft subfloor.',
          },
        ],
      },
      {
        heading: 'Waterproof the wet walls',
        blocks: [
          {
            type: 'p',
            text: 'If the tile is coming off or the shower has been leaking, this is the work that matters. A proper shower pan, sound backer, and a drain that sits where water goes are what keep the next owner from inheriting your tear-out. Cosmetic tile over a failed pan does not survive a resale inspection.',
          },
        ],
      },
      {
        heading: 'Light, air, and fixtures that work',
        blocks: [
          {
            type: 'p',
            text: 'A bath that is dim, steamy, or fitted with a faucet you have to fight will feel older than the rest of the house. Recessed or vanity lighting that reaches the mirror, a fan vented outside, and fixtures you can still get parts for are enough. Matching metal finishes across the faucet, shower, and towel bars makes a small room look finished.',
          },
        ],
      },
      {
        heading: 'Floors that belong in a wet room',
        blocks: [
          {
            type: 'p',
            text: 'Cracked tile and swollen vinyl are the floors buyers step on first. Porcelain tile and a waterproof luxury vinyl are both reasonable here. Large-format tile can make a small bath feel calmer if the layout is simple. Heated floors are a comfort, not a requirement for a Houston sale.',
          },
          {
            type: 'p',
            text: 'If you are selling soon, skip moving walls and adding a second shower head you do not have the water heater for. Spend the budget on waterproofing, a sound floor, and fixtures that look intentional.',
          },
        ],
      },
    ],
  },
  {
    slug: 'signs-its-time-to-replace-your-homes-flooring',
    title: 'Signs it is time to replace your home’s flooring',
    crumb: 'Replacing flooring',
    lines: ['When a floor', 'is finished.'],
    description:
      'How to tell when carpet, tile, hardwood, vinyl, or laminate in a Houston home should be replaced instead of cleaned or patched.',
    lede: 'Floors fail in public. They cup, peak at the seams, rock underfoot, or stay dull no matter how often they are cleaned. Those are different problems, and only some of them are a cleaning issue.',
    image: '/images/services/wood-flooring.jpg',
    service: 'wood-flooring',
    ctaTitle: 'Want a second look at the floor?',
    ctaBody:
      'Send photos or have us walk it. We install wood, tile, vinyl, and laminate, and we will say if a repair is enough.',
    related: [
      'bathroom-upgrades-that-boost-your-homes-resale-value',
      'top-5-benefits-of-remodeling-your-kitchen-in-2025',
    ],
    sections: [
      {
        heading: 'Movement you can feel',
        blocks: [
          {
            type: 'p',
            text: 'A soft spot, a bounce, or a tile that clicks means the problem may be under the finish: a wet subfloor, a loose board, or mortar that let go. Covering that with new material without opening it up is how the next floor fails in the same place.',
          },
        ],
      },
      {
        heading: 'Water leaves a record',
        blocks: [
          {
            type: 'p',
            text: 'Cupped hardwood, swollen laminate edges, bubbled vinyl, and dark stains that return after drying are water history. In a kitchen, bath, or laundry room, ask what got wet before you pick a new color. If the subfloor is compromised, replacement includes that repair.',
          },
        ],
      },
      {
        heading: 'Wear that cleaning will not undo',
        blocks: [
          {
            type: 'list',
            items: [
              'Finish worn through to bare wood in the traffic lanes',
              'Carpet matted flat, with stains that wick back after cleaning',
              'Tile cracked through, or grout gone in long runs',
              'Vinyl curling at the seams or torn at the doorway',
              'Laminate swelling so the joints stand proud',
            ],
          },
          {
            type: 'p',
            text: 'A single damaged board or tile can be a repair. A pattern of the same damage across the room is a replacement. Tripping edges are a safety issue, not a style issue, and they belong at the top of the list.',
          },
        ],
      },
      {
        heading: 'When the rest of the house has moved on',
        blocks: [
          {
            type: 'p',
            text: 'If the kitchen, paint, and furniture have all been updated and the floor still belongs to the previous decade, the room will keep looking unfinished. That is a fair reason to replace it, once the floor underneath is dry and flat.',
          },
          {
            type: 'p',
            text: 'Kitchens and baths want a surface that can take spills. Living areas can take wood or a wood-look product if the slab or subfloor is suitable. We look at the room, the moisture, and how you live in it before recommending a material.',
          },
        ],
      },
    ],
  },
  {
    slug: 'top-5-benefits-of-remodeling-your-kitchen-in-2025',
    title: 'Five reasons a kitchen remodel is worth doing',
    crumb: 'Kitchen remodel',
    lines: ['What a kitchen', 'remodel is for.'],
    description:
      'What a Houston kitchen remodel should actually change: how you cook, where things live, light, tired appliances, and a finish level that fits the house.',
    lede: 'A kitchen remodel is worth it when the room works better every day, not only when it photographs well.',
    image: '/images/services/kitchen-remodeling.jpg',
    service: 'kitchen-remodeling',
    ctaTitle: 'Thinking about the kitchen?',
    ctaBody:
      'We will measure the room you have and talk through layout, cabinets, and finishes before anyone starts demolition.',
    related: [
      'remodeling-vs-restoring-whats-right-for-your-home',
      'signs-its-time-to-replace-your-homes-flooring',
    ],
    sections: [
      {
        heading: 'The room matches how you cook',
        blocks: [
          {
            type: 'p',
            text: 'The useful change is circulation. Sink, range, and refrigerator still form the working core, and a remodel is the chance to shorten the awkward steps between them. Add a clear landing spot on either side of the range and the sink. If two people cook, give them two places to stand that are not the same 30 inches.',
          },
        ],
      },
      {
        heading: 'Storage you can reach',
        blocks: [
          {
            type: 'p',
            text: 'A lot of “not enough kitchen” is cabinets that waste the corner and a pantry that is a door to clutter. Drawer bases for pots, a tray divider, and a pantry you can see into will change the room more than a new paint color on the uppers. Decide what you own before you draw the cabinets.',
          },
        ],
      },
      {
        heading: 'Light and air you notice at 6 p.m.',
        blocks: [
          {
            type: 'p',
            text: 'Kitchens fail in the evening, when the one ceiling fixture leaves the counters dark. Under-cabinet light, a fixture over the sink or island, and a vent hood that actually exhausts are the unglamorous pieces people thank themselves for. If the appliances are old enough that you plan around them, replacing them as part of the remodel is usually simpler than forcing new cabinets around them later.',
          },
        ],
      },
      {
        heading: 'A finish level the house can support',
        blocks: [
          {
            type: 'p',
            text: 'Stone, paint-grade cabinets, and a straightforward backsplash will look right in most Houston houses. The expensive version is not automatically the better daily kitchen. Choose materials you are willing to live with: a counter that can take a hot pan or cannot, a floor that can take a spill, a cabinet finish you can touch up.',
          },
        ],
      },
      {
        heading: 'One sequence, not six contractors',
        blocks: [
          {
            type: 'p',
            text: 'A kitchen touches cabinets, counters, tile, flooring, electrical, and plumbing. The benefit of doing it as one project is that those trades are sequenced, the layout is decided once, and you have one call when a measurement is off. Most full kitchens are measured in weeks, not days, and the schedule should be said out loud before demolition.',
          },
          {
            type: 'p',
            text: 'If the kitchen is also wet from a leak, dry and repair that first. A new cabinet run on a damp wall is not a remodel. It is a second loss.',
          },
        ],
      },
    ],
  },
];

const articlesBySlug = new Map(
  articles.map((article) => [article.slug, article]),
);

export function getArticle(slug: string) {
  return articlesBySlug.get(slug);
}

export function articlePath(slug: string) {
  return `/${slug}`;
}
