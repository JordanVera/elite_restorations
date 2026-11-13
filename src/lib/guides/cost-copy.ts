import type { GuideSection } from '@/lib/guides/types';

export const kitchenCostSections: readonly GuideSection[] = [
  {
    eyebrow: 'How to read this',
    heading: 'Three scopes, not one Houston price.',
    paragraphs: [
      'A kitchen number that ignores the room is fiction. The bands on this page are planning ranges for three different scopes. Same layout, new finishes is typically about $25,000 to $55,000. A layout change is typically about $40,000 to $80,000. A full gut is typically about $70,000 to $135,000. They overlap on purpose. A small layout change in a simple room can land near a generous finish update. A gut of a large room with custom boxes can sit at the top of its band or past it. The estimate after a visit is the price. These ranges are how you plan before that visit.',
      'The low end of each band assumes a straightforward house, standard finishes, and no surprise in the walls. The high end is still not a ceiling for a very large or highly custom kitchen. River Oaks and a modest bungalow are not priced by the neighborhood name. They are priced by cabinet length, stone, and whether the plumbing and the structure move. Bring the ranges to the conversation. Do not treat the low number as a bid.',
    ],
  },
  {
    eyebrow: 'The house',
    heading: 'What a Houston kitchen does to the budget.',
    paragraphs: [
      'Older kitchens inside the Loop, especially in the Heights, Bellaire, and West University, are often small, out of square, and sitting on pier and beam. A new layout may mean a bearing wall, tired wiring, and a drain that can be rerouted in a crawl space. That crawl space is an advantage only if it is accessible and dry. If it is not, access and repair become part of the kitchen. Newer open plans in Katy, Cinco Ranch, and The Woodlands are usually slab. Moving the sink means cutting concrete. Leaving the sink where it is keeps you in a lower band even when the island, the stone, and the lights are new.',
      'Humidity shows up in the cabinet spec. Plywood boxes and a finish that can live through a Houston summer cost more than the cheapest particle box, and they are the ones that still close in August. Stone is templated after the cabinets are set because the walls are rarely square. That sequence is time, and time is money, and skipping it is how a counter is recut. None of this is a surcharge for “old house.” It is the work the house asks for.',
    ],
    points: [
      { title: 'Keep the drain', body: 'The cheapest layout is the one the plumbing already has. A new island with power but no sink stays simpler than an island with a prep sink cut into a slab.' },
      { title: 'Cabinet length', body: 'A galley with two runs is less box and less stone than a kitchen open to a family room with a long island. Square footage of the room is a weak predictor. Linear feet of cabinet is a better one.' },
      { title: 'What is soft', body: 'A swollen sink base or a wet subfloor is repair before the new kitchen. Finding it on the visit is cheaper than finding it on demo day, and it still changes the number.' },
    ],
  },
  {
    eyebrow: 'Finishes',
    heading: 'Where the material bill actually moves.',
    paragraphs: [
      'Painted shaker cabinets and a straightforward quartz top are the middle of the finish range for a lot of Houston kitchens. Custom boxes, a furniture-style island, a thick stone edge, or marble you are willing to maintain move the same layout up. Appliances you keep are not in the construction number. Panels and a built-in refrigerator are. The backsplash can be a few thousand dollars or most of a separate budget if it is full-height stone. Lighting is easy to forget and visible every night. Under-cabinet light, a general layer, and pendants are three lines, not one fixture.',
      'Flooring that stops at the kitchen door costs less than flooring that runs through the hall and the living room so the levels match. That run is often the right scope and it is not “the kitchen” in a casual conversation. We split it out so you can see it. Hardware, the hood duct to the exterior, and a small change to a window are the same kind of line. They are real. They are not where a $70,000 gut becomes a $40,000 refresh. The layout and the boxes do that.',
    ],
  },
  {
    eyebrow: 'Permits and schedule',
    heading: 'The costs that are not on a material list.',
    paragraphs: [
      'A finish update that leaves plumbing, electrical, and structure in place often does not need a building permit. Moving any of those usually does. The counter is not always the City of Houston. Bellaire and West University Place have their own departments. A Katy address may be the city, Harris County, or Fort Bend County. The Woodlands is not a city. Permits there are usually Montgomery County or Harris County. The fee itself is rarely the thing that blows a budget. The time, and the work the permit requires you to show, are.',
      'You will be without a sink for part of the job. Special-order stone and custom cabinets take longer than stock quartz and in-stock boxes. We will not invent a week count on this page, because lead times move. We will put the sequence, including that sink window, in the estimate. A planned kitchen is not an insurance project. If the room is open because of a leak, drying and photos come before cabinets, and the claim payment is not this price list. Call (713) 909-0034 or request an estimate. The visit is how a band becomes a number.',
      'Use the three bands to decide which conversation you are actually in before you collect samples. A finish update, a moved sink, and a gut are different crews and different months of your house. Samples are useful after that, not before. The estimate is still the only number that belongs on a contract.',
    ],
  },
];

export const kitchenCostFaqs = [
  {
    q: 'Why do the ranges overlap?',
    a: 'Because a small layout change and a large finish update can cost similar money. The labels describe the kind of work, not a guaranteed bracket. Your kitchen lands where the scope lands.',
  },
  {
    q: 'Does an island always mean the layout-change range?',
    a: 'No. An island in the footprint you already have, with power and no new plumbing, can sit in a finish update. An island that moves the sink, a wall, or the path through the room is a layout change.',
  },
  {
    q: 'Are these ranges for cabinets only?',
    a: 'No. They are planning ranges for the construction scope described: finishes on the same layout, a layout change, or a gut. Appliances you buy yourself, and a floor that runs through the rest of the house, may be outside the way you are reading the band. The estimate lists them.',
  },
  {
    q: 'Do older Houston houses cost more by default?',
    a: 'Not by the year they were built. They cost more when the walls are out of square, the wiring is tired, or a drain has to move. A simple finish update in a bungalow can cost less than a large open-plan gut in a newer suburb.',
  },
];

export const bathroomCostSections: readonly GuideSection[] = [
  {
    eyebrow: 'How to read this',
    heading: 'The drain decides more than the tile.',
    paragraphs: [
      'Bathroom prices in Houston diverge at the plumbing, not at the paint color. A vanity and finish refresh on the same layout is typically about $6,000 to $15,000. A shower rebuild that keeps the drain is typically about $12,000 to $25,000. A full remodel that moves plumbing is typically about $30,000 to $65,000. A powder room and a primary bath are not interchangeable inside those words. Glass, stone, and a second wet wall in the same house can push a project up. The visit places it.',
      'Waterproofing sits inside the shower number. It is not a way to get from the top of a band to the bottom. Skipping it does not produce the same shower. If someone’s lower price is the same tile photo without a membrane and a sloped pan, it is a different scope. Ask what is behind the tile before you compare the two numbers.',
    ],
  },
  {
    eyebrow: 'The house',
    heading: 'Slab, crawl space, and a window in the shower.',
    paragraphs: [
      'On a slab, typical of newer Katy, Memorial, Sugar Land, and Woodlands houses, the shower drain is in the concrete. Moving it means cutting the slab, patching it, and building the pan on that repair. On a pier-and-beam house, more common in older Heights bungalows, the drain is often in the crawl space. It is still plumbing. It is not a concrete saw. That difference alone can move a bath from the middle band toward the top, or keep a new shower in the middle because the drain stayed put.',
      'A window in the wet wall, common in older baths, has to be detailed into the waterproofing or removed. A ceiling below that is already stained means the bath and the room under it may be one repair. Houston humidity is why the fan should exhaust outdoors and why a wall is dry before it is closed. Those are scope, not mood. They belong in the price.',
    ],
    points: [
      { title: 'Same footprint', body: 'New tile, a new valve, and new glass on the old drain are the shower-rebuild band. The moment the drain, the toilet, or the vanity supply moves, you are in a different project.' },
      { title: 'One bath or two', body: 'A hall bath used during the remodel changes how the work is phased. It does not make the wet wall free. Two showers are two assemblies.' },
      { title: 'What demo finds', body: 'Soft backer and a long-term leak add repair. We look on the visit. If the wall is worse once it is open, we stop before the number silently grows.' },
    ],
  },
  {
    eyebrow: 'Finishes',
    heading: 'Tile, glass, and the vanity are the visible money.',
    paragraphs: [
      'A porcelain field and a framed door are a different material bill from book-matched stone and frameless glass. Large-format tile needs a flatter wall, which is labor before any luxury shows up. Mosaic on the shower floor is slower than a single-pitch pan with a linear drain, and the linear drain is its own hardware. Niches, a bench, and a curb versus a curbless entry each change the waterproofing. Curbless on a slab is only real if the floor can slope to a drain. If it cannot, we will not price a picture of it.',
      'The vanity, the top, the mirror, and the light are one elevation. A furniture-style vanity and a stone top move a refresh toward the top of its band without moving a single drain. That is still not a full remodel. Keeping a tub and retiling the surround is less than removing the tub and building a shower, even when the tile sample is the same. Compare scopes. The sample is not the scope.',
    ],
  },
    {
      eyebrow: 'Schedule',
      heading: 'What the out-of-service days are worth.',
      paragraphs: [
        'A powder room you can close off is a different project from the only bath in the house. The construction price does not include a hotel, and we will not pretend it does. It does include the sequence: how many days the water is off, whether a tub can stay in use while a shower is rebuilt, and whether the hall bath has to be finished before the primary is opened. That sequence is why two baths are not twice one bath in a simple way. They share trips, and they still cannot both be demoed if you have nowhere to shower.',
        'Material lead time sits in the same conversation. A stock vanity and an in-stock porcelain can start sooner than a stone top and frameless glass, which are measured after the walls are real. We do not print a week count here because those lead times move. We do put them on the estimate, next to the band the scope actually falls in. If you are choosing between a shower rebuild on the same drain and a layout that cuts the slab, the calendar is part of the price even when the labor is the line you notice first.',
      ],
    },
    {
      eyebrow: 'Permits',
      heading: 'When the permit shows up, and when it does not.',
    paragraphs: [
      'Replacing a faucet and a vanity in the same place often does not need a building permit. Relocating a drain or adding a circuit usually does. City of Houston, Bellaire, West University Place, Sugar Land, Pearland, and the county on a Katy or Woodlands lot are not one counter. We name the office from the address. The permit fee is small next to the plumbing. The inspection is what keeps the drain and the wet wall honest.',
      'A planned bath is not an insurance claim. A bath opened because a valve or a supply line failed starts with drying and photos, and the rebuild price is still construction. Your insurer decides what is paid. Those numbers are allowed to differ. Call (713) 909-0034 for an estimate. We look at the bath you have, including what is under it, and price that.',
      'Bring the three bands to the visit and say which one you think you are in. If the drain has to move, or the only bath will be out of service, that is the fact that changes the schedule as much as the price. We would rather name it on the estimate than discover it after demo.',
    ],
  },
];

export const bathroomCostFaqs = [
  {
    q: 'Why is a shower rebuild more than a new vanity?',
    a: 'The shower is waterproofing, a sloped pan, a valve, tile, and glass. A vanity refresh is cabinetry, a top, and light on the same footprint. They are not versions of the same project.',
  },
  {
    q: 'Does curbless glass cost the same as a tub remodel?',
    a: 'Usually no. Curbless means the floor can slope to a drain, which on a slab is a structural and plumbing question. A tub that stays, with a retiled surround, is a smaller wet wall. We price the one the room can actually do.',
  },
  {
    q: 'Are fixtures included in the ranges?',
    a: 'The ranges describe the construction scope. A special-order valve, frameless glass, or a stone you have already picked can move the material bill. The estimate names what is included. The bands are for planning, not a package of fixtures.',
  },
  {
    q: 'Can two bathrooms share one budget band?',
    a: 'Only if you add them. A powder room and a primary are two rooms. Doing them together saves some trips. It does not make the second shower free. We scope each wet wall.',
  },
];

export const roofCostSections: readonly GuideSection[] = [
  {
    eyebrow: 'How to read this',
    heading: 'The range is a roof shape, not a price per square.',
    paragraphs: [
      'Architectural asphalt replacement on many Houston houses is typically about $12,000 to $24,000. Metal, tile, or composite is typically about $20,000 to $45,000 when the structure can carry it. Deck repairs found after tear-off are often about $500 to $2,000, at about $75 to $150 for a 4x8 sheet. A one-story roof with a simple hip and a two-story roof with steep fronts and a lot of valleys are not the same square. A per-square number written before the inspection leaves pitch, height, and the deck out. We do not use one.',
      'The low end is a straightforward asphalt tear-off on a house the crew can walk and stage. The high end of the asphalt band is still not a steep, cut-up, or very large roof, and it is not tile. If your house is those things, expect the estimate to say so. The bands are for planning a conversation. The contract is the roof we measured.',
    ],
  },
  {
    eyebrow: 'The roof',
    heading: 'What on the house moves the number.',
    paragraphs: [
      'Stories, pitch, and cuts are the labor. Skylights, chimneys, and wall flashing are the details that leak when they are reused brittle. Pipe boots and vents are part of a replacement, not add-ons we remember later. A low-slope porch or addition is not a shingle detail. It is a different system tied into the steep roof, and it is a common place Houston houses leak. Older plank decking in Heights and other pre-war houses is a different tear-off from plywood on a 2000s Katy roof. We price the deck we expect, then confirm it when the covering is off.',
      'Two layers left in place, soft eaves, and rotten fascia show up at tear-off. We stop and show you before that wood is added. Gutters are not automatically in the roof price. If they are crushed or pitched back toward the fascia, we say so and scope them only when they are part of the job. Trees that block the driveway change the day. They do not change the shingle. They change the access.',
    ],
    points: [
      { title: 'Weight', body: 'Asphalt replacing asphalt is the usual structural case. Tile or slate is a weight question we answer on the house before it is a material you can choose.' },
      { title: 'Ventilation', body: 'Intake and exhaust are part of a Houston roof because the attic runs hot. Blocked soffits are a finding. They are fixed as part of making the system work, not as a mystery line.' },
      { title: 'Partial versus full', body: 'A repair of a boot or a valley is not priced off this replacement table. Many localized repairs plan around $400 to $2,500. A replacement is the whole covering, off to the deck.' },
    ],
  },
  {
    eyebrow: 'Insurance',
    heading: 'The deductible is not the estimate.',
    paragraphs: [
      'Your insurer decides what the policy pays. Many Texas policies, especially in Harris County and closer to the coast, use a wind or hail deductible that is a percentage of the dwelling limit. One, two, and five percent are common. On a higher limit, two percent is a large deductible, and it is not the deductible on a kitchen leak. Whether this storm clears it is your question for the carrier. Our estimate is the cost to do the roof. Those numbers are allowed to be different.',
      'Some policies pay actual cash value first and release recoverable depreciation after the work. Some do not. We do not calculate that for you, and we are not a public adjuster. We photograph the roof and install the one you hire. We do not rewrite the scope to match a check. If you are paying for the roof yourself, ignore the claim story and read the scope. Temporary tarping, when the roof is open and it is safe to be up there, is a separate small project, often a few hundred dollars to about $2,000 for a single walkable opening, not a down payment that locks you into a replacement.',
    ],
  },
  {
    eyebrow: 'Permits',
    heading: 'Which office, and why tear-off day is not a surprise.',
    paragraphs: [
      'A full replacement in the City of Houston is typically permitted. A small repair often is not. If the mailing city says Houston, you may still be in Bellaire, West University Place, Southside Place, or a Memorial village, each with its own building department. Sugar Land and Pearland issue their own permits. Much of Katy is the City of Katy, Harris County, or Fort Bend County. The Woodlands is not a municipality. An address there is usually Montgomery County or Harris County. We match the permit to the legal address before the tear-off is scheduled.',
      'Debris, the permit, and the underlayment are part of planning the job. They are not invented after the new shingles are on. Weather is the other schedule fact. Hurricane season is June 1 through November 30. We do not open a roof into a storm, and we tarp an opening when it is safe rather than leave the deck bare. Call (713) 909-0034. We inspect, say whether repair or replacement is the honest scope, and price that roof.',
      'If you are comparing two estimates, compare tear-off, deck repair, flashing, ventilation, and the permit, not only the shingle name. A lower number that leaves the old covering in place is a different roof. The ranges above assume the covering comes off so the deck can be seen.',
    ],
  },
];

export const roofCostFaqs = [
  {
    q: 'Why will a roofer’s per-square price not match this page?',
    a: 'Because a square does not include pitch, stories, valleys, the deck, or the flashing. Two roofs with the same area can be different jobs. We price the roof we inspected, inside or outside these planning ranges as the house requires.',
  },
  {
    q: 'Does the asphalt range include tear-off?',
    a: 'Yes. A replacement, as we scope it, comes off to the deck, with new underlayment, flashing, and vents. A recover over old shingles is not this range. Soft decking is the extra sheet price, not a hidden second roof.',
  },
  {
    q: 'What if my deductible is higher than the roof?',
    a: 'Then the policy may not fund the work, and the roof still costs what it costs if you choose to replace it. We do not decide whether to file. We also do not cut the roof down so the invoice matches a deductible.',
  },
  {
    q: 'Are metal and tile always in the higher band?',
    a: 'They are a different install and often a different weight, which is why they have their own planning range, about $20,000 to $45,000. A small simple metal roof can overlap a complicated asphalt one. The estimate is the material on your house, not the label alone.',
  },
];
