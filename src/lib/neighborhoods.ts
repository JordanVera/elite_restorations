import { assertCopyAllowed } from '@/lib/copy-guards';
import { neighborhoodSlugs, type NeighborhoodSlug } from '@/lib/locale-paths';
import type { NeighborhoodPage } from '@/lib/neighborhood-types';
import { getProject } from '@/lib/projects';
import { titleFits } from '@/lib/seo';
import { localLandingSlug, parseLocalLandingSlug } from '@/lib/local-paths';
import { getService, isCityIndexedService, services as serviceCatalog } from '@/lib/services';
import { wordCount } from '@/lib/words';

const phone = '(713) 909-0034';

function neighborhoodTitle(name: string) {
  const candidates = [
    `${name} Roofing, Remodeling & Water`,
    `${name} Roofing & Remodeling`,
    `${name} Roofing & Water`,
    name,
  ];
  return candidates.find((candidate) => titleFits(candidate)) ?? name;
}

const knownStatic = new Set([
  'houston-storm-damage',
  'emergency',
  'emergency-board-up',
  'westchase-tx',
  'alief-tx',
  'energy-corridor-tx',
  'blog',
]);

function page(
  slug: NeighborhoodSlug,
  name: string,
  description: string,
  lede: string,
  paragraphs: readonly string[],
  services: NeighborhoodPage['services'],
  faqs: NeighborhoodPage['faqs'],
  also: NeighborhoodPage['also'],
): NeighborhoodPage {
  return {
    slug,
    path: `/${slug}`,
    name,
    title: neighborhoodTitle(name),
    description,
    lede,
    paragraphs,
    services,
    faqs,
    also,
    ctaTitle: `Planning work in ${name}?`,
    ctaBody: `Call ${phone}. We schedule from our office in west Houston (77082). Family-owned since 1993.`,
  };
}

const services = {
  storm: (note: string) => ({ href: '/houston-storm-damage', label: 'Storm damage', note }),
  tarp: (note: string) => ({
    href: '/roofing-emergency-tarp-repair',
    label: 'Emergency tarping',
    note,
  }),
  water: (note: string) => ({
    href: '/water-damage-restoration',
    label: 'Water damage',
    note,
  }),
  kitchen: (note: string) => ({
    href: '/kitchen-remodeling',
    label: 'Kitchen remodeling',
    note,
  }),
  bath: (note: string) => ({
    href: '/bathroom-remodeling',
    label: 'Bathroom remodeling',
    note,
  }),
  vinyl: (note: string) => ({ href: '/vinyl-flooring', label: 'Vinyl plank flooring', note }),
  tile: (note: string) => ({ href: '/tile-flooring', label: 'Tile flooring', note }),
  wood: (note: string) => ({ href: '/wood-flooring', label: 'Wood flooring', note }),
  laminate: (note: string) => ({
    href: '/laminate-flooring',
    label: 'Laminate flooring',
    note,
  }),
  roof: (note: string) => ({ href: '/roofing', label: 'Roofing', note }),
  replace: (note: string) => ({
    href: '/roof-replacement',
    label: 'Roof replacement',
    note,
  }),
};

function ownCityServiceLinks(area: string, name: string) {
  return serviceCatalog
    .filter((service) => isCityIndexedService(service.slug))
    .map((service) => ({
      href: `/${localLandingSlug(service.slug, area)}`,
      label: `${service.name} in ${name}`,
    }));
}

export const neighborhoods: readonly NeighborhoodPage[] = [
  page(
    'meyerland-tx',
    'Meyerland',
    '1950s brick ranches along Brays Bayou in Meyerland. Storm repair, dried-out houses, kitchens, baths, floors, and low roofs. Call (713) 909-0034.',
    'Meyerland is the southwest Houston neighborhood of one-story brick ranches along Brays Bayou and North Braeswood. We schedule the work from our office in west Houston (77082).',
    [
      'Most of Meyerland went up in the 1950s as brick ranches on concrete slabs. The roofs are low. The lots are deeper than a bungalow lot inside the Loop, and many houses still have the original closed kitchen, a hall bath, and a larger bedroom at the back. Some streets have been rebuilt or lifted after bayou flooding. The house next door may still be the ranch from the year it was built. We look at the one you called about.',
      'Brays Bayou is the fact that separates a Meyerland water call from a leak in a dryer suburb. Low ground along the bayou has taken storm water in past tropical storms. Streets farther from the bank have not all seen the same water. A supply-line break on the slab and water that rose from outside are different visits, and they can be different insurance policies. Your insurer decides which one applies. We photograph, dry, and repair what you hire.',
      'A hard freeze is the other water story. Pipes in attics and in exterior walls of these ranches have burst when Houston drops below freezing. The water then runs across the slab, into the base of the drywall, and under the floor. There is usually no crawlspace to look into. We find the wet edge with a meter, not by guessing from the stain.',
      'Hail and wind hit these low roofs the same way they hit the rest of southwest Houston. A low slope hides the bruises from the street. South and west faces age faster. Oaks drop limbs onto valleys. We get on the roof when it is safe, photograph what we see, and say whether a repair will hold. If the house is open to the weather, tarping comes before a conversation about shingles.',
      'Kitchen work here often starts with a ranch plan that still walls the cook off from the living room. Opening that wall is a structure question, and moving the sink means cutting the slab. A bath is usually a small hall bath or a primary bath that was tiled once in the 1980s or 1990s. Waterproofing goes in before the new tile. We do not treat a Meyerland ranch as a blank open plan.',
      'Floors follow the water history of the house. Original hardwood, later tile, and sheet vinyl all show up. A slab that has been wet needs to be dry before a new floor goes down. Vinyl plank will show a ridge that carpet hid. Wood has to acclimate in the house. Tile needs a flat substrate. If a prior flood lifted the house or replaced the first floor, we measure what is there now.',
      'Meyerland is in the City of Houston. Some sections have deed restrictions that care about what the street sees. A kitchen inside the house is usually a different question from a new roof. The drive from the office in 77082 is across the southwest side, Beechnut or Bellaire toward Chimney Rock. There is no Meyerland storefront. Call (713) 909-0034 and we set the visit.',
    ],
    [
      services.storm(
        'Wind, hail, and bayou water are separate problems. We document the one that hit this house.',
      ),
      services.tarp('A low ranch roof that is open gets covered when it is safe to be up there.'),
      services.water(
        'Slab leaks and water that rose from Brays Bayou are mapped before anyone dries the wrong thing.',
      ),
      services.kitchen(
        'Ranch kitchens are often still closed. We check the wall and the slab drain before a layout is promised.',
      ),
      services.bath('Hall baths and dated primary baths, waterproofed before the finish tile.'),
      services.vinyl('A common floor after a wet slab, once the concrete is actually dry.'),
      services.tile('Works in kitchens and baths when the slab is flat enough for the tile you picked.'),
      services.wood('Possible where the boards and the slab allow it. The wood acclimates in the house.'),
      services.laminate('A wood look for dry bedrooms once the slab is dry. Not a floor for a room that stayed wet.'),
      services.roof('Low slopes, valleys under oaks, and faces you cannot judge from the curb.'),
      services.replace('When a repair will not hold. The roof we price is the one we walked.'),
    ],
    [
      {
        q: 'Does every Meyerland house flood?',
        a: 'No. Low ground along Brays Bayou has taken storm water in past tropical storms. Houses set higher, or farther from the bank, did not all take the same water. We start with where water entered this house. A burst pipe and rising water are not the same job.',
      },
      {
        q: 'Can you open a Meyerland ranch kitchen?',
        a: 'Sometimes. The wall may be holding the roof, and the sink drain is in the slab. We look before we say the wall can move. A kitchen that stays closed can still get new cabinets, counters, and a floor.',
      },
      {
        q: 'What does a roof visit cover?',
        a: 'All the slopes, the valleys, and the metal joints, not only the front. These roofs sit low, so the street view misses a lot. We photograph the roof and say whether a repair will hold. Your insurer decides any claim.',
      },
      {
        q: 'Do you handle the insurance claim?',
        a: 'We are not public adjusters. We photograph the damage, tarp or dry when that is the right next step, and write a repair estimate for the work you hire. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. Your insurer decides coverage and payment.',
      },
    ],
    [
      { href: '/water-damage-restoration-bellaire-tx', label: 'Water damage in Bellaire' },
      { href: '/roofing-west-university-tx', label: 'Roofing in West University' },
      { href: '/alief-tx', label: 'Alief' },
    ],
  ),
  page(
    'montrose-tx',
    'Montrose',
    'Bungalows and townhomes in Montrose. Pier-and-beam leaks, tight streets, kitchens, baths, floors, and patched roofs. Call (713) 909-0034.',
    'Montrose is the inside-the-Loop neighborhood of older bungalows, cottages, and newer townhomes along Westheimer, Montrose Boulevard, and Richmond. The office that schedules the work is in west Houston.',
    [
      'A Montrose block can hold a 1920s bungalow on piers and a three-story townhome on a slab. Those are different buildings. The bungalow usually has a crawlspace, small rooms, and walls that are not square. The townhome shares a wall and often an association that reviews the street side. We ask which building you have before we talk about a kitchen or a roof.',
      'Older plumbing is part of the bungalow. Supply lines and cast-iron drains have been patched for decades. A freeze can split a line in an exterior wall or in a crawlspace that is open to the air. A slow leak under a pier-and-beam floor can wet the subfloor without showing a puddle in the living room. We look under the house when there is a crawlspace, and we meter the floor before we say it is dry.',
      'Storm water here is usually wind, hail, and rain driven at old roofs, not a single bayou story. Flat porch roofs, added dormers, and patched valleys leak while the main slope still looks calm. Tight streets and parked cars change how a tarp crew stages. If a window is broken or a door is open after a storm, board-up is the step that keeps the weather and people out of the house overnight.',
      'Kitchens in the bungalows are small. Opening the room means the structure and the old trim have to be part of the plan. New cabinets that ignore the casing look stuck on. Townhome kitchens cannot borrow square footage from the neighbor. We measure both kinds of room. A bath is often one hall bath, sometimes with a later addition that does not match the original tile.',
      'Floors in the older houses are often pine that cups when Houston humidity swings. Refinishing is possible when the boards are thick enough and the subfloor is sound. A crawlspace that stays damp will put that cup right back. Vinyl and tile show up in kitchens and baths, and in townhomes that were built on slabs. Wood over a damp crawl is a different conversation from wood on a dry slab.',
      'Montrose is the City of Houston. There is no zoning in the usual suburban sense, and some blocks have deed restrictions or a design conversation about the street elevation. Interior work is usually outside that. Parking a dumpster on these streets is a planning item. We set it on the visit, not from a cul-de-sac habit.',
      'The drive from our office in west Houston (77082) is cross-town, Westheimer or Richmond into the Loop. There is no Montrose showroom. Call (713) 909-0034. If water is coming in or the roof is open, say that first.',
    ],
    [
      services.storm('Old roofs, dormers, and flat porches. We photograph the opening before a tarp hides it.'),
      services.tarp('Used when the roof is open and it is safe to work. Tight streets are part of the plan.'),
      services.water(
        'Crawlspace leaks and burst lines in exterior walls. We look under the house when we can.',
      ),
      services.kitchen('Small bungalow kitchens and narrow townhome kitchens. The building decides the layout.'),
      services.bath('Often one hall bath, or a primary bath squeezed into an addition.'),
      services.vinyl('A practical floor in a townhome or a wet kitchen once the subfloor is dry.'),
      services.tile('Set after the wall or the shower is waterproofed, including in small baths.'),
      services.wood('Original pine can sometimes be refinished. New wood has to live with the humidity.'),
      services.laminate('Dry bedrooms and halls. It will not stiffen a bouncy pier-and-beam floor.'),
      services.roof('Several roof shapes on one bungalow. We look at all of them.'),
      services.replace('When the patches outnumber the sound slope. Access on a tight street is priced in.'),
    ],
    [
      {
        q: 'Are Montrose houses pier-and-beam?',
        a: 'Many of the bungalows are. Newer townhomes are usually on slabs. An addition can mix the two. The crawlspace is useful when a drain has to move, and it is also where a slow leak hides. We identify the building on the visit.',
      },
      {
        q: 'Can you get a dumpster onto a Montrose street?',
        a: 'Sometimes, and sometimes the drop has to be smaller or timed around parking. We plan it at the address. A townhome with a shared drive is not the same as a bungalow with a short driveway.',
      },
      {
        q: 'What fails first on these roofs?',
        a: 'Flat porch roofs, valleys, and the metal around old chimneys and vents. The front slope can look fine while a patched dormer lets rain into a ceiling. We photograph those spots.',
      },
      {
        q: 'Do you handle my insurance claim?',
        a: 'We send our estimate to your insurance company for approval and work through it with the adjuster. We are not public adjusters. We can meet your adjuster, walk what we found, and repair what you hire. Your insurer decides coverage and payment. Check the policy or ask the insurer.',
      },
    ],
    [
      { href: '/kitchen-remodeling-the-heights-tx', label: 'Kitchen remodeling in The Heights' },
      { href: '/roofing-river-oaks-tx', label: 'Roofing in River Oaks' },
      { href: '/bathroom-remodeling-upper-kirby-tx', label: 'Bathroom remodeling in Upper Kirby' },
    ],
  ),
  page(
    'garden-oaks-tx',
    'Garden Oaks',
    'Oak-shaded houses in Garden Oaks, north of the Loop. Crawlspaces, limb damage, kitchens, baths, floors, and roofs. Call (713) 909-0034.',
    'Garden Oaks is the older neighborhood north of the North Loop, under a heavy oak canopy, between the Heights and Oak Forest. We schedule it from the west Houston office.',
    [
      'Garden Oaks houses are mostly from the late 1930s through the 1950s. You will see cottages and early ranches, many of them on piers with a crawlspace, on lots that were planned around the trees. The rooms are modest. Trim is often original. A later addition may sit on a slab next to a pier-and-beam original. We do not assume the whole house matches the front door.',
      'The oaks are a roof issue and a water issue. Limbs sit over valleys. Leaves pack the gutters. Shade keeps a roof damp longer than a roof in full sun, and it also drops a limb in a storm. Hail still reaches these slopes. We look at the roof under the canopy, not only the piece you can see from the street.',
      'White Oak Bayou is the low edge of this part of north Houston. Streets closer to the bayou have taken storm water. Streets up the block have not. A crawlspace can hold water after a hard rain even when the living room stayed dry. That is a different dry-out from a supply line that burst in a freeze and ran across a floor.',
      'Freeze damage shows up in pipes run through exterior walls and in lines under a house that is open to a cold wind. Once the line splits, the water may sit in the crawlspace and wick into the subfloor. We stop the water, photograph the path, and dry the wood before anyone talks about new flooring.',
      'Kitchens are often still the small room at the back. People want them opened toward the living room. The beams and the old openings decide whether that is simple. Matching the casing matters if the rest of the trim stays. Baths are small. A shower in a Garden Oaks bath is waterproofed before the tile, and the floor slope in an old house is checked before a curb is promised.',
      'Wood floors are common, and Houston humidity moves them. Refinishing works when the boards are sound and the crawlspace is not feeding them moisture. Tile belongs in the wet rooms. Vinyl plank is the floor people choose when a slab addition needs something stable and the original pine stays in the living room. We say which floor the room can hold.',
      'Garden Oaks is in Houston. Some streets have older deed restrictions aimed at the elevation. Interior remodeling is usually outside that review. The drive from our office in west Houston (77082) is across town, I-10 toward the north side. Call (713) 909-0034 to set a time. Traffic changes the hour.',
    ],
    [
      services.storm('Limb hits and hail under the oak canopy. We photograph the roof before debris is cleared, when that is safe.'),
      services.tarp('Covers an opening from a limb or lifted shingles until the permanent roof is decided.'),
      services.water('Crawlspace water and burst lines. The living room can look dry while the subfloor is wet.'),
      services.kitchen('Small original kitchens. We check structure and trim before a wall comes out.'),
      services.bath('Tight baths. Waterproofing first, then the tile you will see.'),
      services.wood('Original floors can sometimes be sanded. New wood acclimates in the house.'),
      services.tile('The usual wet-room floor, set on a surface that is flat and dry.'),
      services.vinyl('A fit for a slab addition or a kitchen that has been wet.'),
      services.laminate('Dry rooms over a sound subfloor. Baths stay tile.'),
      services.roof('Valleys full of leaves and slopes under limbs. All of it gets looked at.'),
      services.replace('When the shade, the patchwork, and the decking say a repair will not last.'),
    ],
    [
      {
        q: 'Is Garden Oaks the same as Oak Forest?',
        a: 'No. They share north Houston and a lot of oaks, and they are next to each other. Garden Oaks is the older stock, with more pier-and-beam houses and smaller rooms. Oak Forest is mostly postwar brick ranches on slabs. We treat the address, not the nickname.',
      },
      {
        q: 'Do the trees change a roof job?',
        a: 'Yes. Access under limbs, leaves in the valleys, and shade that keeps a roof damp are part of the visit. A limb through a slope is a tarp first, if it is safe, then a look at the decking.',
      },
      {
        q: 'Can the original floors stay?',
        a: 'When the boards are thick enough and dry, sanding and a new finish is a real option. If the crawlspace is wet, or the boards are worn through, we say so. New flooring goes in after the moisture problem is handled.',
      },
      {
        q: 'Who decides an insurance payment?',
        a: 'Your insurer. We are not public adjusters. We document what the storm or the leak did and we repair what you hire. Elite works with your insurance company as your contractor and negotiates the claim scope with the adjuster.',
      },
    ],
    [
      { href: '/kitchen-remodeling-the-heights-tx', label: 'Kitchen remodeling in The Heights' },
      { href: '/roofing-spring-branch-tx', label: 'Roofing in Spring Branch' },
    ],
  ),
  page(
    'oak-forest-tx',
    'Oak Forest',
    'Postwar brick ranches in Oak Forest, north Houston. Slab leaks, hail, kitchens, baths, and floors. Call (713) 909-0034.',
    'Oak Forest is the north Houston neighborhood of brick ranch houses from the late 1940s through the 1960s, north of Garden Oaks. We schedule the visits from our office in west Houston (77082).',
    [
      'The common Oak Forest house is a one-story brick ranch on a concrete slab. Roofs are low and simple until someone has added a porch or a second shed roof. Carports and later garages are common. Kitchens were built as closed rooms. Hall baths are small, with a tub that many people now want as a shower. A rebuilt house on the same street is a different scope. We can see the difference from the foundation and the trim.',
      'These slabs do not give a burst pipe anywhere to fall. In a hard freeze, attic lines and exterior-wall lines are the ones that split. Water comes out at the ceiling or at the baseboard and runs under the floor. Vinyl that looks almost fine can be sitting on wet concrete. We pull what has to come up, meter the rest, and dry the slab before a new floor is discussed.',
      'White Oak Bayou runs along the west side of this part of Houston. Some Oak Forest streets have taken storm water. Many have only seen street ponding. We do not write the whole neighborhood as one flood elevation. Tell us whether the water rose from outside or started at a fixture. Those paths are documented differently, and your insurer decides coverage.',
      'Hail finds these roofs because they are broad and low. A bruise in an asphalt shingle is hard to see from the yard. South and west slopes chalk and crack first. We walk the roof, photograph the slopes, and say if a repair is honest or if the roof is at the end of a useful life. Wind lifts edges. A tarp is for an opening, not for a roof that is only ugly.',
      'Remodeling a ranch kitchen here is usually about cabinets, light, and whether one wall can open. The sink and the dishwasher sit on slab drains. Moving them is concrete work, and we say so before demolition. A bath remodel is often the hall bath: a shower pan, tile, a vanity that fits, and a fan that actually moves humid air out. Houston humidity does not leave a new shower alone.',
      'Flooring choices follow the slab. Tile is common in kitchens and baths and holds up when the floor gets wet, if the slab is flat enough. Vinyl plank is what a lot of these ranches take in the main rooms after carpet comes out. Solid wood over a slab needs the right product and a dry slab. We do not cover a wet floor to make it look finished.',
      'Oak Forest is Houston. Deed restrictions show up on some streets and not others. A roof color is more likely to matter to a restriction than a cabinet inside. The drive from the office is across the west and north side. Call (713) 909-0034. For an active leak, call rather than waiting on a form.',
    ],
    [
      services.storm('Hail on low ranch roofs, and wind at the edges. The street view is not the inspection.'),
      services.tarp('For an open slope or a limb hole. We photograph first when it is safe.'),
      services.water('Freeze breaks and fixture leaks that run across the slab into the drywall.'),
      services.kitchen('Closed ranch kitchens. Layout changes wait on the structure and the drains.'),
      services.bath('Hall baths turned into showers, with waterproofing before the tile.'),
      services.vinyl('Shows every ridge in the slab. Leveling is part of the conversation.'),
      services.tile('A sound choice for kitchens and baths on these slabs.'),
      services.wood('Only when the slab is dry and the product belongs on concrete.'),
      services.laminate('Dry rooms after the slab is flat. A ridge still shows through the plank.'),
      services.roof('Broad, low roofs. We look at every slope, including the ones over additions.'),
      services.replace('When the shingles are done across the house, not only on the front.'),
    ],
    [
      {
        q: 'Are Oak Forest houses mostly slabs?',
        a: 'Yes. The postwar brick ranch on a slab is the usual house. An older exception or a new rebuild can be different. We confirm this house. A slab means a burst pipe runs across the floor, and a moved sink means cutting concrete.',
      },
      {
        q: 'Why do pipes burst here in a freeze?',
        a: 'Attic and exterior-wall lines in these ranches see the cold. When they split, the water has the slab to run on. Shut the supply off if you can do it safely, and call. Drying the slab matters as much as finding the break.',
      },
      {
        q: 'Is a roof repair enough after hail?',
        a: 'Sometimes, if the damage is limited and the rest of the roof still has life. We say which one after we are on the roof. A low slope hides the bad face from the curb.',
      },
      {
        q: 'Are you adjusting the claim?',
        a: 'Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. We dry and repair what you hire. Your insurer decides payment.',
      },
    ],
    [
      { href: '/roofing-spring-branch-tx', label: 'Roofing in Spring Branch' },
      { href: '/water-damage-restoration-the-heights-tx', label: 'Water damage in The Heights' },
    ],
  ),
  page(
    'kingwood-tx',
    'Kingwood',
    'Tree-covered houses in Kingwood, near Lake Houston. Pines, hail, lake flooding, kitchens, baths, floors, and long roofs. Call (713) 909-0034.',
    'Kingwood is the master-planned community northeast of Houston, along Kingwood Drive and near Lake Houston. The work is scheduled from our office in 77082.',
    [
      'Kingwood houses are mostly from the 1970s through the 2000s, on slabs, under pines. Early sections are often two-story plans with a more closed kitchen. Later sections open the kitchen to the family room. Lots are larger than inside the Loop, and the roofs are long because the houses are. An association is typical and usually reviews roof color, paint, and fences. A bathroom inside the house is rarely that review.',
      'The trees change the roof. Needles and leaves sit in valleys. Limbs fall in wind. Shade holds moisture on a north slope. Hail still gets through the canopy and bruises asphalt. We walk those roofs. A repair that ignores a valley full of debris is not a repair. If wind opened the roof, a tarp is the step that limits more water in the attic and the ceiling.',
      'Low ground near the San Jacinto River and Lake Houston has flooded in past tropical storms. Houses on higher pads in the same community did not all take water. Rising water and a second-floor supply leak are different jobs. Rising water often sits on a different insurance policy from a sudden pipe break. Your insurer decides. We do not rename the damage. We dry what got wet and rebuild what you hire.',
      'Attic pipes and attic water heaters are common in these two-story plans. A freeze or a failed heater dumps water into the ceiling of the kitchen or a bedroom. The stain on the ceiling is smaller than the wet insulation above it. We open what the meter says is wet, and we leave it open until it is dry. Houston humidity is why a fan in the hallway is not the whole dry-out.',
      'Kitchen remodels here are usually about the cabinets, the island, and whether a wall between the kitchen and the family room is doing structural work. Primary baths are larger than a ranch hall bath. They still need waterproofing before the stone or the porcelain. A glass shower in a humid house needs a fan that vents outside, not into the attic.',
      'Floors split by story. Carpet upstairs, tile or wood downstairs, is a pattern we see. After a water event, carpet pad that stayed wet comes out. Tile on the slab is a practical downstairs floor if the slab is flat. Wood can work once the slab is dry and the product is meant for that substrate. Vinyl plank is the other downstairs choice, and it will telegraph a hump.',
      'Kingwood has its own municipal services inside Houston’s extraterritorial patchwork. We confirm the permit office for the address. The drive from our office in west Houston (77082) is the long one, up the northeast side. Call (713) 909-0034 and we will tell you the visit window. There is no Kingwood showroom.',
    ],
    [
      services.storm('Wind, hail, and rising water near the lake are written up as what actually happened.'),
      services.tarp('Covers an open roof under the pines so the ceiling stops taking rain.'),
      services.water('Attic leaks from heaters and burst lines, and first floors that took outside water.'),
      services.kitchen('Closed 1970s kitchens and later open plans. We measure the wall before it moves.'),
      services.bath('Larger primary baths. The waterproofing is the part you do not see.'),
      services.tile('A downstairs floor that can take a wet kitchen or a bath.'),
      services.wood('Downstairs, after the slab is dry. It acclimates in the house.'),
      services.vinyl('Useful on a slab that is flat enough, including after carpet comes out.'),
      services.laminate('Upstairs bedrooms when the floor under them is dry. Not a cover for wet carpet.'),
      services.roof('Long roofs, pine debris, and slopes you cannot see from the driveway.'),
      services.replace('When the field of shingles is done, not only the slope the limb hit.'),
    ],
    [
      {
        q: 'Did all of Kingwood flood?',
        a: 'No. Low ground near the San Jacinto and Lake Houston has taken storm water in past tropical storms. Higher streets did not all see that water. We ask where the water entered this house before we dry or demolish.',
      },
      {
        q: 'Does an association review a kitchen?',
        a: 'Usually the association is looking at the roof, the paint, and the fence. A kitchen or a bath inside the house is a different approval, if it needs one at all. We still pull a permit when the work requires it.',
      },
      {
        q: 'Where do Kingwood leaks start?',
        a: 'Often the attic: a water heater, a supply line, or a roof valley under the pines. The ceiling stain is the clue, not the whole wet area. We meter the insulation and the rooms below.',
      },
      {
        q: 'Can you promise the claim will pay?',
        a: 'No. We are not public adjusters. Your insurer decides coverage and the amount. We photograph, we can meet the adjuster, and we repair what you hire.',
      },
    ],
    [
      { href: '/water-damage-restoration-the-woodlands-tx', label: 'Water damage in The Woodlands' },
      { href: '/roofing-the-woodlands-tx', label: 'Roofing in The Woodlands' },
    ],
  ),
  page(
    'cypress-tx',
    'Cypress',
    'Older Cypress streets and newer houses along US 290. Creek water, hail, kitchens, baths, floors, and roofs. Call (713) 909-0034.',
    'Cypress is the northwest Harris County area along US 290, with an older town fabric and large newer subdivisions toward the Grand Parkway. We schedule it from Houston 77082.',
    [
      'Cypress is not one house. Closer to Cypress Creek and the older commercial strips, you see ranches and two-story houses from several decades, mostly on slabs. In the newer master-planned sections, the houses are larger, the kitchens are open, and a lot of the slabs are post-tension, with cables in the concrete. Cutting a post-tension slab to move a drain is not the same job as cutting an older slab. We locate the work before anyone cuts.',
      'Cypress Creek is the flood story. Sections near the creek have taken storm water. Detention ponds help a new subdivision with heavy rain, but low streets can still flood in a big storm. A house that took creek water and a house with a burst washing-machine hose need different drying, and often a different insurance conversation. We document the damage and work the repair scope with your insurer as your contractor. We are not public adjusters. Your insurer makes the final coverage decision.',
      'Northwest Harris County sees spring hail. Roofs on these houses are mostly asphalt, some of them large and cut up with dormers. We look at the slopes that face the storm, not only the elevation. Wind lifts ridge caps. A tarp belongs on an opening. A roof that is bruised but closed is an inspection, then a repair or a replacement, said after the walk.',
      'Two-story plans put water heaters and supply lines in attics. A freeze or a failed pan dumps water into the ceiling. The garage heater is the other common one: it floods the garage and then the room next to it if the slab is flat. We trace that path. Drywall that wicked water at the base comes out where it is wet. A wall is not closed wet.',
      'Kitchen remodeling in the newer houses is often a finish and layout tune: cabinets, a larger island, lighting, flooring that crosses into the living room. In the older houses it can be a closed kitchen and a wish to open it. Baths in the new houses are large primary suites. Baths in the older houses are tighter. Both get waterproofing before tile. A glass panel does not make a shower waterproof.',
      'Flooring in the new houses is often tile on the slab and carpet upstairs. People call when they want the carpet gone or the tile replaced with a wood look. Vinyl plank does that if the slab is flat. Real wood needs a dry slab and time in the house before it is fastened. After a creek flood, the first question is whether the slab and the walls are dry, not which sample you liked.',
      'Parts of Cypress are in the City of Houston, parts are in Harris County, and some nearby streets fall under other cities. The address picks the permit. Associations in the planned sections usually care about the roof and the exterior. Call (713) 909-0034. The drive is US 290 or the Beltway. We set a window because the freeway changes the time.',
    ],
    [
      services.storm('Hail and wind on large roofs, separate from creek water on a low lot.'),
      services.tarp('For an open roof after a storm, staged for the driveway you actually have.'),
      services.water('Attic breaks, garage heaters, and houses that took water from the creek.'),
      services.kitchen('Open kitchens in newer sections, closed kitchens on the older streets.'),
      services.bath('Primary suites and smaller hall baths. Waterproofing before the finish.'),
      services.vinyl('A wood-look floor on a flat slab, including where carpet came out.'),
      services.tile('Already common downstairs. Replacement starts with how flat the slab is.'),
      services.wood('After the slab is dry. Not the first floor we put on a house that just flooded.'),
      services.laminate('Dry bedrooms and halls. The BlackHorse Ranch downstairs was vinyl plank, a different floor.'),
      services.roof('Big, cut-up roofs. Every slope, including the ones over the garage.'),
      services.replace('When hail or age is across the roof, not a single lifted tab.'),
    ],
    [
      {
        q: 'Are newer Cypress slabs post-tension?',
        a: 'A lot of the newer ones are. Cables run through the concrete. That changes whether a shower or a sink can move. Older slabs in Cypress are a different kind of concrete. We check your house before we say a layout will work.',
      },
      {
        q: 'Does Cypress flood?',
        a: 'Sections near Cypress Creek have taken storm water. Many newer streets only pond in a hard rain. We look at this lot. Outside water and a supply leak are documented as different events.',
      },
      {
        q: 'Who permits the work?',
        a: 'The city or the county for that address. Cypress is not one permit counter. We confirm it. An association, where one exists, is a separate review and usually about the exterior.',
      },
      {
        q: 'Do you work for the insurer?',
        a: 'We document the damage, meet with your adjuster, and work with your insurance company on the scope of repairs as your contractor. We are not public adjusters. Your insurer makes the final coverage decision.',
      },
    ],
    [
      {
        href: '/projects/blackhorse-ranch-cypress',
        label: 'Flooring and kitchen in BlackHorse Ranch',
      },
      { href: '/kitchen-remodeling-katy-tx', label: 'Kitchen remodeling in Katy' },
      { href: '/roofing-energy-corridor-tx', label: 'Roofing in the Energy Corridor' },
      { href: '/energy-corridor-tx', label: 'Energy Corridor' },
      { href: '/towne-lake-tx', label: 'Towne Lake' },
      { href: '/bridgeland-tx', label: 'Bridgeland' },
      { href: '/copperfield-tx', label: 'Copperfield' },
      { href: '/jersey-village-tx', label: 'Jersey Village' },
    ],
  ),
  page(
    'spring-tx',
    'Spring',
    'Old Town Spring and newer houses along I-45. Spring Creek, mixed permits, kitchens, baths, floors, and roofs. Call (713) 909-0034.',
    'Spring is the north Harris County community along Interstate 45, from the older town to newer subdivisions toward the Grand Parkway. Visits are scheduled from our Houston office.',
    [
      'Old Town Spring and the subdivisions along the freeway are both called Spring, and they are not the same house. The older town has smaller houses, some on piers, some on early slabs, with trees close to the roof. The newer sections are two-story slab houses with open kitchens and larger primary baths. A lot of that newer concrete is post-tension. We ask which Spring you are in, then we look.',
      'Spring Creek floods. Low streets near the creek have taken storm water in past tropical storms. Houses on the higher new pads did not all take that water. Pine needles and wind are the everyday roof problem. Hail comes with the spring storms that cross north Houston. A roof under pines needs the valleys checked, not only the front slope that faces the road.',
      'Permits are not one office. An address may be the City of Houston, unincorporated Harris County, or close enough to another city that the rules change. We confirm the address before we pull a permit. Associations in the newer sections review roofs and paint more often than they review a cabinet layout.',
      'Water inside these houses often starts upstairs or in the attic. A water heater, a supply line in a freeze, or a boot that cracked around a vent. The ceiling below shows a stain late. Insulation can be soaked while the drywall is only spotted. We open the wet part and dry it. A first-floor flood from the creek is a different tear-out: wet insulation in the walls, flooring that came loose, and cabinets that swelled at the toe kick.',
      'Kitchen ideas split the same way the houses do. In a newer open plan, the work is cabinets, counters, light, and a floor that meets the family room. In an older Spring house, the kitchen may still be a separate room, and the walls are not square. Baths in the new houses can take a large shower. Baths in the older houses need the plumbing found before the room is redrawn.',
      'Flooring and humidity travel together under the trees. A slab that never sees sun still needs to be dry before vinyl or wood goes down. Tile is the forgiving wet-room floor. Wood moves. We acclimate it in the house. After creek water, we do not install a floor to hide a damp slab.',
      'The drive from our office in west Houston (77082) is north, I-45 or the Hardy Toll Road depending on the section. Call (713) 909-0034. Say whether this is a leak, a roof, or a remodel so the visit is the right one. Family-owned since 1993. The crew comes from the Houston office.',
    ],
    [
      services.storm('Hail, wind, and creek water. We write down which one reached the house.'),
      services.tarp('Stops rain at an open valley or a limb hole while the roof is still being decided.'),
      services.water('Attic leaks in the newer houses, and first floors that took Spring Creek.'),
      services.kitchen('Open plans in new sections. Smaller, older kitchens near Old Town.'),
      services.bath('Large primary baths and small original baths. The plumbing decides the move.'),
      services.tile('A solid downstairs and bath floor when the slab is flat.'),
      services.vinyl('For main rooms on a dry, reasonably flat slab.'),
      services.wood('In living rooms, after it acclimates. Not over a damp crawl or a wet slab.'),
      services.laminate('Dry bedrooms and halls. Not over a slab that creek water left damp.'),
      services.roof('Pines over the slopes. Valleys and vents get the same attention as the field.'),
      services.replace('When the shingles are tired across the roof, including the faces under the trees.'),
    ],
    [
      {
        q: 'Is Spring inside the City of Houston?',
        a: 'Some of it is. Some addresses are in unincorporated Harris County, and the edges get close to other cities. We look up the address. The neighborhood name does not pick the permit counter.',
      },
      {
        q: 'What should I do if Spring Creek water got in?',
        a: 'Stay out of standing water near power. Photograph the rooms before you throw finishes away. Call your insurer and call us at (713) 909-0034. Outside water and a pipe break are documented as different events.',
      },
      {
        q: 'Do pines mean the roof needs replacing?',
        a: 'Debris in a valley is not, by itself, a new roof. A valley that has been leaking, or shingles bruised across the slopes, might be. We get up there and say which.',
      },
      {
        q: 'Who pays the insurance claim?',
        a: 'Your insurer decides. We are not public adjusters. We photograph, tarp, dry, and rebuild the parts you hire. We do not take a percentage of a settlement.',
      },
    ],
    [
      { href: '/roofing-the-woodlands-tx', label: 'Roofing in The Woodlands' },
      { href: '/water-damage-restoration-magnolia-tx', label: 'Water damage in Magnolia' },
    ],
  ),
  page(
    'humble-tx',
    'Humble',
    'Humble’s older town and subdivisions toward Lake Houston. River flooding, kitchens, baths, floors, and roofs. Call (713) 909-0034.',
    'Humble is the northeast Houston city along Interstate 69, with an older town center and newer subdivisions toward FM 1960 and Lake Houston. We schedule the work from 77082.',
    [
      'Humble is not Kingwood, even though the map puts them near each other. The older town has smaller houses, some wood-sided, some brick, from several decades, mostly on slabs. The subdivisions along FM 1960 and toward the lake are later slab houses, many of them two-story, with open kitchens and roofs under pines. We treat the address. A 1960s ranch and a 2000s two-story are different kitchens and different roofs.',
      'The San Jacinto River and Lake Houston are the flood geography. Low areas have taken storm water in past tropical storms. Streets set higher have not. If water rose into the house, say so. If a water heater in the garage let go, say that too. Mixing those stories does not help you or your insurer. We photograph what we can see and dry the materials that are actually wet.',
      'Hail and straight-line wind are the roof calls. Asphalt on one- and two-story houses, with pine debris in the valleys on the lake side. Older roofs in town may already be a patchwork. We say whether another patch is fair. An open roof gets a tarp when the weather and the ladder allow it. Board-up is for broken glass and doors that will not lock, which happens when a storm or a limb goes through a window.',
      'Freeze bursts happen here for the same reason they happen across Houston. Lines in attics and on exterior walls split, and the water shows up in a ceiling or at a baseboard. Houses on slabs do not have a basement to catch it. We shut the spread down by finding the wet rooms, pulling what cannot be saved, and drying what can.',
      'Kitchen remodeling in the older town is often a small room, out of square, with a drain that may not want to move. In the newer subdivisions the kitchen is already the center of the first floor, and the project is cabinets, counters, and light. Baths follow the same split. A hall bath in town is a tight waterproofing job. A primary bath near the lake has room, and it still rots if the shower is tiled over a weak pan.',
      'Floors in Humble deal with humidity off the lake and, on some streets, a history of outside water. Tile and vinyl plank are the practical slab floors. Wood is a living-room floor when the slab is dry and stays dry. We will not set a wood floor to cover a moisture problem. Carpet that was flooded does not get dried and put back.',
      'Humble is its own city for many of these addresses, which means its own permits. Nearby streets can fall under Houston. We check. Associations show up in the subdivisions. Call (713) 909-0034. The drive from the office is across Houston to the northeast side. We agree on a window.',
    ],
    [
      services.storm('River water, hail, and wind. Each one is documented as itself.'),
      services.tarp('For roofs opened by wind or limbs, before the ceiling takes another rain.'),
      services.water('Garage heaters, attic lines, and first floors that took river water.'),
      services.kitchen('Small older kitchens in town, open kitchens in the later subdivisions.'),
      services.bath('Tight hall baths and larger primary baths. The pan matters more than the tile color.'),
      services.tile('A practical floor on Humble slabs, in kitchens, baths, and main rooms.'),
      services.vinyl('After carpet, or after a wet floor has actually dried.'),
      services.wood('Where the room and the slab allow it. It gets time in the house first.'),
      services.laminate('A wood look in dry rooms. Not a cover for a moisture problem.'),
      services.roof('Town roofs and lake-side roofs under pines. We walk the one you have.'),
      services.replace('When patches and age cover the slopes, not a single missing tab.'),
    ],
    [
      {
        q: 'Is Humble the same visit as Kingwood?',
        a: 'No. They are near each other and they share storms, pines, and the lake. The houses and the permit offices are not the same. Tell us the address. We schedule both from the Houston office.',
      },
      {
        q: 'What if water came in from the river?',
        a: 'Photograph it, stay out of it if power is involved, and call. Rising water is not written up as a pipe break. Your insurer decides which policy responds. We dry and repair what you hire.',
      },
      {
        q: 'Can you remodel a small Humble kitchen?',
        a: 'Yes. Small rooms are most of the older town. We measure before we talk about moving a wall or a sink. New cabinets in the existing footprint are a real project too.',
      },
      {
        q: 'Do you represent me with the insurer?',
        a: 'We are not public adjusters. We help with photos, a repair estimate, and the work. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. The insurer decides coverage and payment.',
      },
    ],
    [
      { href: '/water-damage-restoration-the-woodlands-tx', label: 'Water damage in The Woodlands' },
      { href: '/roofing-the-woodlands-tx', label: 'Roofing in The Woodlands' },
    ],
  ),
  page(
    'friendswood-tx',
    'Friendswood',
    'Friendswood houses near Clear Creek, southeast of Houston. Coastal wind, creek flooding, kitchens, baths, floors, and roofs. Call (713) 909-0034.',
    'Friendswood is its own city southeast of Houston, between the Gulf Freeway and Clear Creek. We schedule remodeling and restoration there from our office in west Houston (77082).',
    [
      'The houses are mostly suburban brick plans from the 1960s through the 1990s, on slabs, with some newer sections mixed in. One-story ranches and two-story houses sit on the same streets. Kitchens have often been updated one piece at a time, so the cabinets, the counters, and the floor can be three different decades. We look at what you want replaced instead of assuming a full gut.',
      'Clear Creek is the water people here already know. Low ground near the creek has flooded in past tropical storms. Blocks farther from the creek did not all take water. Coastal wind and driven rain are the other storm. Roofs and windows see more wind than a neighborhood in northwest Harris County, and humidity hangs on because the bay is not far. A roof leak and creek water in the same month are still two events. We document them that way. Your insurer decides coverage.',
      'Hail happens, and so does wind that lifts shingles without a hail bruise. We get on the roof and say what we see. An open deck gets a tarp. Soft metal around vents fails while the field still looks even from the yard. South-facing slopes age faster in the sun. We do not sell a replacement from the curb.',
      'Interior leaks are the ordinary call between storms: a water heater in the garage, a toilet supply, a dishwasher line, a pipe that split in a freeze. On a slab, that water is in the drywall and under the floor the same day. Friendswood humidity means the room will not dry because you opened a window. Dehumidifiers are part of a real dry-out.',
      'Kitchen remodeling here is a mix of ranch kitchens that are still closed and later kitchens that are already open to a den. Moving a sink is slab work. A bath remodel is often a primary bath with a tub people want converted to a shower, or a hall bath with a failing pan. Waterproofing is the work. The tile is what you see after.',
      'Flooring choices lean toward tile and vinyl because of the humidity and, on some streets, because the house has been wet before. Both need a dry, flat slab. Wood can live in a Friendswood living room if the product and the moisture barrier fit the slab, and if the wood spends time in the house first. Laminate that sat in floodwater is replaced. It does not dry back into a floor.',
      'Friendswood issues its own permits. That is different from a Houston address a few minutes away. Some subdivisions have associations that review roofs and paint. The drive from our west Houston office is across town, the Beltway or toward I-45. Call (713) 909-0034. For water that is still spreading, call.',
    ],
    [
      services.storm('Creek flooding and coastal wind. We keep those as separate notes.'),
      services.tarp('When wind or a limb opens the roof. Photos first, when it is safe.'),
      services.water('Garage heaters, supply lines, and houses that took Clear Creek.'),
      services.kitchen('Updated in pieces, or still the original ranch kitchen. We price what is changing.'),
      services.bath('Tub-to-shower conversions and tired pans. Waterproofing before tile.'),
      services.tile('A Friendswood staple on slabs. The flatness of the floor decides the size of the tile.'),
      services.vinyl('Stable in the humidity once the slab is dry and level enough.'),
      services.wood('A living-room floor, not the answer for a room that is still damp.'),
      services.laminate('Replaced when it sat in floodwater. New laminate only in rooms that stay dry.'),
      services.roof('Wind, sun, and the metal joints. We walk all the slopes.'),
      services.replace('When the roof is done across the house, not one wind-lifted edge.'),
    ],
    [
      {
        q: 'Is Friendswood part of Houston?',
        a: 'It is its own city. Permits come from Friendswood, not from Houston City Hall. We confirm the address anyway, because the edges of the map are easy to misread.',
      },
      {
        q: 'How is Clear Creek water different from a leak?',
        a: 'Water that rose from outside and water from a supply line are different events. Policies often treat them differently. We photograph the waterline or the break we can see. Your insurer decides what is covered.',
      },
      {
        q: 'What flooring holds up in this humidity?',
        a: 'Tile and a vinyl plank meant for a slab are the usual answers in kitchens, baths, and main rooms. Wood can work in a dry living room. We look at the slab before we recommend one.',
      },
      {
        q: 'Do you help with an insurance claim?',
        a: 'Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. We repair what you hire. Your insurer decides the payment.',
      },
    ],
    [
      { href: '/roofing-clear-lake-tx', label: 'Roofing in Clear Lake' },
      { href: '/kitchen-remodeling-pearland-tx', label: 'Kitchen remodeling in Pearland' },
      { href: '/water-damage-restoration-pearland-tx', label: 'Water damage in Pearland' },
    ],
  ),
  page(
    'tomball-tx',
    'Tomball',
    'Older Tomball houses and newer lots toward Highway 249. Hail, mixed foundations, kitchens, baths, floors, and roofs. Call (713) 909-0034.',
    'Tomball is the northwest city along FM 2920 and Highway 249, with an older downtown and newer subdivisions toward the Grand Parkway. The crew is scheduled from Houston 77082.',
    [
      'Downtown Tomball and the new sections are different construction. Near the old town you see smaller houses on larger lots, a mix of pier-and-beam and slab, with trees close to the eaves. Farther out, the houses are newer two-story plans on slabs, often post-tension, with open kitchens and big roofs. A kitchen remodel that moves a wall is a different conversation in each one. We measure the house you have.',
      'Spring hail and wind are the storm pattern on this side of Houston. Roofs take bruises that do not show from the yard, and limbs from the trees around the older lots land in valleys. We walk the roof. If the deck is open, we tarp it when it is safe. A closed roof with scattered bruises might be a repair. A roof that is bruised across every slope is a replacement conversation. We say which after the inspection, not from a driveway photo.',
      'Flooding here is more about creeks and flat drainage than a single bayou through the middle of town. Some low streets have taken storm water. Many lots only see ponding. A burst pipe in a freeze is the more common interior water call: attic lines in the new two-story houses, and lines in exterior walls or under a pier-and-beam floor in the older ones. The crawlspace has to be looked at. The slab house has to be metered at the baseboard.',
      'Kitchens in the older houses are often still separate rooms. People want light and a larger table, and the structure decides how far that can go. Kitchens in the new houses are already open. The work there is cabinets, counters, a backsplash, and a floor that does not stop at the doorway. Baths follow. An old hall bath needs the drain found before the shower grows. A new primary bath needs a pan and a waterproofed wall, then tile.',
      'Flooring on a Tomball slab deals with humidity and with clay movement. Tile and vinyl plank are the workhorse floors. Wood is handsome in a living room and it moves if it is installed the day it arrives, or if the crawlspace under an older house stays damp. We acclimate wood in the house. We do not float a floor over a wet subfloor.',
      'Tomball is its own city inside the town, and some nearby addresses are Harris County or sit close to Montgomery County. The permit follows the address. Associations in the newer sections review the exterior. A roof color can be their question. A vanity usually is not. The drive from the office is US 290 to 249, or the Grand Parkway depending on the section. Call (713) 909-0034.',
      'There is no Tomball storefront. Family-owned in Houston since 1993. If the roof is open or water is spreading, say that when you call so we treat it as the emergency it is.',
    ],
    [
      services.storm('Hail and wind on older roofs and on the big new ones. We inspect before we name the repair.'),
      services.tarp('Covers an open deck. The ladder plan follows the trees and the lot.'),
      services.water('Crawlspace leaks in older houses, attic breaks in the newer two-stories.'),
      services.kitchen('Separate rooms downtown, open plans in the new sections.'),
      services.bath('Small hall baths and large primary baths. Waterproof first.'),
      services.vinyl('A stable floor on newer slabs once the concrete is flat and dry.'),
      services.tile('Kitchens, baths, and main rooms. Large tile needs a flatter floor.'),
      services.wood('In dry rooms. Under an older house, the crawlspace moisture matters.'),
      services.laminate('Dry bedrooms on a flat slab. We do not float it over a wet subfloor.'),
      services.roof('From simple older gables to cut-up new roofs. All the slopes.'),
      services.replace('When the shingles are finished across the house.'),
    ],
    [
      {
        q: 'Do you only work inside the City of Tomball?',
        a: 'We work the Tomball area, and the permit follows the address. Some streets are in the city and some are in the county. Tell us the address when you call (713) 909-0034.',
      },
      {
        q: 'Are the older houses pier-and-beam?',
        a: 'Many near the original town are, or they mix a pier-and-beam original with a slab addition. Newer subdivisions are slabs, and a lot of those are post-tension. We confirm before we talk about moving a drain.',
      },
      {
        q: 'What does hail look like from the ground?',
        a: 'Often like nothing. Bruises, cracked mats, and damaged metal show up on the roof. We photograph them. A roof can also be worn out without hail. We will say if that is what we are looking at.',
      },
      {
        q: 'Are you the insurance company\'s contractor?',
        a: 'No. We work for the person who hires us. We are not public adjusters. Your insurer decides the claim. We do the documentation and the construction.',
      },
    ],
    [
      { href: '/roofing-magnolia-tx', label: 'Roofing in Magnolia' },
      { href: '/kitchen-remodeling-katy-tx', label: 'Kitchen remodeling in Katy' },
      { href: '/energy-corridor-tx', label: 'Energy Corridor' },
    ],
  ),
  page(
    'missouri-city-tx',
    'Missouri City',
    'Missouri City, in Fort Bend County, between Houston and Sugar Land. Slab houses, roofs, water, kitchens, and baths. Call (713) 909-0034.',
    'Missouri City is the Fort Bend city south of Houston, along Highway 6 and the Fort Bend Tollway, with an older core and newer master-planned sections. We schedule the work from our office in west Houston (77082).',
    [
      'Missouri City sits mostly in Fort Bend County, with a portion in Harris County. It is not Sugar Land and it is not Houston, even when a mailing address or a freeway exit makes the edges feel shared. Quail Valley is the older suburban fabric, much of it from the 1960s through the 1980s, on concrete slabs. Later sections, including the Sienna area, are larger two-story plans. A lot of that newer concrete is post-tension, with cables in the slab. Cutting one of those slabs to move a drain is not the same job as cutting an older Quail Valley slab. We locate the work before anyone cuts.',
      'The ground is the flat clay of this part of Fort Bend. It moves when it gets wet and when it dries, which shows up as a door that sticks or a floor that is not as level as it looks. Heavy rain sits on flat streets. Bayous carry storm water, and detention ponds help with a heavy rain, but low streets can still flood in a big storm. A house that took water from outside and a house with a burst supply line need different drying. We document the damage, meet with your adjuster, and work with your insurance company on the scope of repairs as your contractor. We are not public adjusters. Your insurer makes the final coverage decision.',
      'Gulf humidity is why a dry-out here uses dehumidifiers with the air movers. Hurricane season runs from June 1 through November 30. Spring storms bring hail. Roofs are mostly asphalt, on one-story ranches in the older sections and on larger two-story houses in the newer ones. South and west slopes age faster. We look at all of them, not only the front. An association in a planned section usually reviews roof color, paint, and fences. A kitchen inside the house is usually outside that review. The city permits work inside Missouri City. The address, not the neighborhood nickname, picks the counter.',
      'Water inside these houses often starts at a water heater, a supply line, or an appliance on the slab. The stain at the base of the drywall is the clue, not the whole wet area. There is usually no crawlspace to look into. We meter, extract what is standing, and leave a wall open until it is dry. A roof leak after hail is a different path: the ceiling, the insulation, then the wall. We do not close wet drywall to make a room look finished.',
      'Kitchens in the newer houses were built open, with an island and a family room in the same view. The remodel is cabinets, counters, light, and a floor that crosses into the next room. Kitchens in the older ranches are often still more closed, and the walls are not square. Baths follow the same split. A large primary bath and a small hall bath both get waterproofing before the tile. A glass panel does not make a shower waterproof.',
      'Floors on these slabs show every ridge once carpet comes out. Vinyl plank is a common wood look when the concrete is flat and dry. Wood has to acclimate in the house. Laminate belongs in dry bedrooms and halls, not in a bath and not on a slab that just sat in flood water. Tile is the floor for a wet room. After outside water, the first question is whether the slab is dry, not which sample you liked.',
      'The drive from our office in west Houston (77082) is south, on Highway 6 or the Fort Bend Tollway, and it takes longer than the drive to Sugar Land. Call (713) 909-0034 and tell us whether this is a leak, a roof, or a remodel. We have been family-owned and serving Houston since 1993. We come to you. There is no separate office in Missouri City.',
    ],
    [
      services.storm('Hail, wind, and street water are written down as the event that actually reached the house.'),
      services.tarp('For an open roof after a storm, before the next rain. A tarp is not the finished roof.'),
      services.water('Slab leaks, appliance failures, and houses that took water from a bayou or a ponded street.'),
      services.kitchen('Open kitchens in newer sections. More closed rooms in the older ranches.'),
      services.bath('Primary suites and smaller hall baths. Waterproofing before the finish.'),
      services.vinyl('A wood-look floor on a flat, dry slab, including where carpet came out.'),
      services.tile('Already common downstairs. Replacement starts with how flat the slab is.'),
      services.wood('After the slab is dry, and after the wood has spent time in the house.'),
      services.laminate('Dry bedrooms and halls. Not a bath, and not a floor for a slab that stayed wet.'),
      services.roof('Asphalt on ranches and on larger two-story houses. Every slope, not only the front.'),
      services.replace('When hail or age is across the roof, not a single lifted tab.'),
    ],
    [
      {
        q: 'Is Missouri City the same permit office as Houston or Sugar Land?',
        a: 'No. Missouri City issues its own permits. Most of the city is in Fort Bend County, and a portion is in Harris County. We confirm the address before we pull a permit. Where an association exists, it is a separate review, and it is usually about the exterior.',
      },
      {
        q: 'Are newer Missouri City slabs post-tension?',
        a: 'Many of the newer ones are. Cables run through the concrete, and that changes whether a shower or a sink can move. Older slabs in Quail Valley are a different kind of concrete. We look at your house before we say a layout will work.',
      },
      {
        q: 'Does Missouri City flood?',
        a: 'Flat streets hold water in a hard rain, and some lots near bayous have taken storm water. Many houses have not. We look at your lot. Water from outside and a supply leak are different events.',
      },
      {
        q: 'Do you handle the insurance claim?',
        a: 'We document the damage, meet with your adjuster, and work with your insurance company on the scope of repairs as your contractor. We are not public adjusters. Your insurer makes the final coverage decision.',
      },
    ],
    [
      { href: '/water-damage-restoration-sugar-land-tx', label: 'Water damage in Sugar Land' },
      { href: '/roofing-sugar-land-tx', label: 'Roofing in Sugar Land' },
      { href: '/kitchen-remodeling-stafford-tx', label: 'Kitchen remodeling in Stafford' },
      { href: '/roofing-pearland-tx', label: 'Roofing in Pearland' },
      { href: '/sienna-tx', label: 'Sienna' },
    ],
  ),
  page(
    'fulshear-tx',
    'Fulshear',
    'Fulshear, in western Fort Bend County, with a small older town and newer subdivisions. Roofs, slabs, kitchens, and water. Call (713) 909-0034.',
    'Fulshear is the west Fort Bend city along FM 1093, between the older town and newer master-planned sections toward the Grand Parkway. Visits are scheduled from our Houston office.',
    [
      'Fulshear is in Fort Bend County, west of Houston. The older town is small. Most of the houses people call about are newer subdivisions along FM 1093 and toward the Grand Parkway: two-story plans, open kitchens, and slabs. A lot of that concrete is post-tension. Cables in the slab change whether a shower or a sink can move. We do not cut one of those slabs from a floor plan someone drew without the house. The older streets are a different building, and we look before we describe the job as new construction.',
      'This is west Fort Bend, the same broad area as Richmond: flat clay, creeks, and the Brazos River farther west. Some lots are in the floodplain, and many newer ones are not. Detention ponds help with ordinary rain, but a low street can still flood in a big storm. A supply-line leak on a slab and water that came in from outside are different jobs. We document the damage, meet with your adjuster, and work with your insurance company on the scope of repairs as your contractor. We are not public adjusters. Your insurer makes the final coverage decision.',
      'Spring hail and, from June 1 through November 30, tropical wind are the storms that mark a roof out here. The roofs are mostly asphalt on large two-story houses, often with several planes. An association in a master-planned section usually reviews color, paint, fences, and sometimes a patio. Interior cabinets are usually the owner’s choice. Fulshear permits work inside the city. We confirm the address before we treat a county lot and a city lot as the same counter.',
      'The air is still Gulf humidity, even this far inland, so drying a house takes dehumidifiers and not fans alone. Water heaters and supply lines in the attics of two-story houses are a common leak. The ceiling below may show only a stain while the insulation above is soaked. We open the wet part and leave it open until it is actually dry. Clay movement shows up in floors and in doors, so we measure your house rather than guessing from the county.',
      'Kitchen work in the newer houses is usually a finish and a layout tune inside a room that is already open. The island, the light, and the floor that meets the family room are the project. Baths are often large primary suites. Waterproofing goes behind the tile either way. A hall bath in an older house is smaller, and the plumbing is wherever it was left. Floors follow the slab. Vinyl is a wood look when the concrete is flat and dry. Wood acclimates in the house. Laminate is for dry bedrooms and halls. Tile is the wet-room floor.',
      'Lots are suburban, with driveways that can take a dumpster or a material delivery more easily than a street inside the Loop. That helps staging. It does not make the house square, and it does not tell us whether the slab is flat enough for the floor you want. Yards can take a patio if the water leaves the wall. An association may still have to see the deck or the cover before lumber is ordered.',
      'The drive from our office in west Houston (77082) is west, on FM 1093 or the Westpark Tollway, and traffic changes the time. Call (713) 909-0034 and tell us whether this is a roof, a leak, or a remodel. We have been family-owned and serving Houston since 1993. We come to you. There is no separate office in Fulshear.',
    ],
    [
      services.storm('Hail and tropical wind on large roofs, separate from water on a low tract near a creek.'),
      services.tarp('Stops the next rain at an opening. The permanent roof is a later decision.'),
      services.water('Attic supply lines, slab leaks, and the occasional house that took water from outside.'),
      services.kitchen('Open kitchens in the newer sections. Smaller rooms on the older streets.'),
      services.bath('Large primary baths, waterproofed before the finish tile.'),
      services.vinyl('A wood-look floor on a dry, reasonably flat slab.'),
      services.tile('Downstairs and in baths, after the slab is flat enough for the tile.'),
      services.wood('In living rooms, after it acclimates. Not over a damp slab.'),
      services.laminate('Dry bedrooms and halls. The pad does not hide a hump.'),
      services.roof('Large asphalt roofs. Every plane, including the ones over the garage.'),
      services.replace('When the shingles are tired across the roof, not one lifted edge.'),
    ],
    [
      {
        q: 'Is Fulshear part of Katy or Richmond?',
        a: 'No. Fulshear is its own city in Fort Bend County. Katy and Richmond are nearby, and they have their own pages. We go by the legal address, because the name on a mailing label does not decide which city permits the work.',
      },
      {
        q: 'Can you move a shower in a newer Fulshear house?',
        a: 'Sometimes. Newer slabs are often post-tension, so moving a drain starts with finding the cables. A shower that stays on its drain does not need the slab cut. We look before we say the layout will work.',
      },
      {
        q: 'Who reviews a new roof or a deck?',
        a: 'The city, for the permit, and an association when the section has one. Associations here usually care about roof color, paint, fences, and decks. A kitchen inside the house is a different question. We ask before materials are ordered.',
      },
      {
        q: 'Do you handle the insurance claim?',
        a: 'We document the damage, meet with your adjuster, and work with your insurance company on the scope of repairs as your contractor. We are not public adjusters. Your insurer makes the final coverage decision.',
      },
    ],
    [
      { href: '/roofing-richmond-tx', label: 'Roofing in Richmond' },
      { href: '/kitchen-remodeling-richmond-tx', label: 'Kitchen remodeling in Richmond' },
      { href: '/water-damage-restoration-katy-tx', label: 'Water damage in Katy' },
      { href: '/roofing-cinco-ranch-tx', label: 'Roofing in Cinco Ranch' },
      { href: '/rosenberg-tx', label: 'Rosenberg' },
    ],
  ),
  page(
    'copperfield-tx',
    'Copperfield',
    'Brick houses from the late 1970s along Highway 6 in Copperfield. Bear Creek, hail, kitchens, baths, floors, and roofs. Call (713) 909-0034.',
    'Copperfield is the west Houston neighborhood of brick houses along Highway 6, between Clay Road and FM 529. We schedule the work from our office in west Houston (77082).',
    [
      'Copperfield was planned at the end of the 1970s, and most of the houses went up through the 1980s. They are one-story and two-story brick plans on conventional concrete slabs. That is not the post-tension concrete used in the newer Cypress sections. There are no cables to locate before a drain moves, and the slab is still old enough to be out of level. Carpet has hidden ridges for decades. We measure this house before we talk about a new floor or a shower in a new spot.',
      'Highway 6 is the east side. Clay Road is the south side, FM 529 is the north, and Barker Cypress Road is the west. Bear Creek and the Addicks Reservoir pool sit south of Clay Road. A water call on a low lot closer to that creek is not the same visit as a house set farther into the neighborhood, and it is not the same visit as a house in Bear Creek Village. Streets inside Copperfield have not all taken storm water. The lakes and greenbelts inside the neighborhood hold rain. That ponding is not water in the house. A supply line that split in a freeze and water that rose from outside are different events. We photograph which one reached this house. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer decides coverage.',
      'The roofs are often the second or third asphalt roof on houses that have stood here for decades. Spring hail marks the slopes, and the bruises do not show from Highway 6. South and west faces age faster in the sun. Trees along the greenbelts drop limbs into valleys. We get on the roof when it is safe. If the deck is open, a tarp goes on before anyone talks about shingles. A closed roof with scattered bruises might be a repair. A roof that is bruised across every slope is a replacement conversation. We say which after the walk, not from the curb.',
      'Water inside these houses, between storms, usually starts at a water heater in the garage or a supply line in the attic of a two-story plan. The stain at the base of the drywall is the clue, not the whole wet area. There is no crawlspace to look into. We meter, pull what cannot be saved, and leave a wall open until it is dry. Humidity on this side of Houston is why the dry-out uses dehumidifiers with the air movers. Opening a window does not finish the job. A roof leak after hail takes a different path: the ceiling, the insulation, then the wall. We do not close wet drywall to make a room look finished.',
      'Kitchens in these plans were often still separate from the family room, or a galley with a wall between the cook and the living room. Opening that wall is a structure question. Moving the sink means cutting a slab that has been in place since the house was built. A lot of these kitchens have already been redone once, so the cabinets, the counters, and the floor can be three different decades. We price the part that is changing. Baths are a primary bath and a smaller hall bath, often with tile from a later remodel. Waterproofing goes in before the new tile. A glass door does not make a shower waterproof.',
      'Floors follow the slab and whatever water the house has seen. Vinyl plank will show a ridge that carpet hid, so the concrete has to be flat enough for the plank you picked. Tile needs a flat substrate, and a large tile needs a flatter one. Wood has to spend time in the house before it is fastened. Laminate belongs in dry bedrooms and halls, not in a bath and not on a slab that is still damp. After a leak, the first question is whether the concrete is dry.',
      'Copperfield is in the City of Houston. An association reviews the exterior on many of these streets: roof color, paint, and fences. A kitchen inside the house is usually outside that review. When the work needs a permit, it is a City of Houston permit. The drive from our office in west Houston (77082) is north on Highway 6, past Interstate 10, to Clay Road. There is no Copperfield storefront. Call (713) 909-0034. We have been family-owned and serving Houston since 1993. We come to the house.',
    ],
    [
      services.storm('Hail on older asphalt, separate from water near Bear Creek or the reservoir south of Clay Road.'),
      services.tarp('Covers an open deck on a one- or two-story house when it is safe to be up there.'),
      services.water('Garage heaters, attic lines, and the occasional house that took water from outside.'),
      services.kitchen('Often still a closed ranch kitchen, or one that was updated in pieces.'),
      services.bath('A primary bath and a hall bath. Waterproofing before the new tile.'),
      services.vinyl('Shows the slab ridges carpet hid, once the concrete is flat and dry.'),
      services.tile('Kitchens and baths on a conventional slab. Large tile needs a flatter floor.'),
      services.wood('In dry rooms, after it spends time in the house. Not over a damp slab.'),
      services.laminate('Dry bedrooms and halls. Not a bath, and not a cover for a wet floor.'),
      services.roof('Second-generation asphalt, valleys under the trees, and slopes you cannot see from Highway 6.'),
      services.replace('When the bruises or the age run across the roof, not one lifted tab.'),
    ],
    [
      {
        q: 'Are Copperfield slabs the same as newer Cypress slabs?',
        a: 'Usually not. Copperfield houses from the late 1970s and the 1980s sit on conventional concrete. Newer Towne Lake and Bridgeland slabs are often post-tension, with cables in the pour. Moving a drain is a different job in each one. We look at your house before we say a layout will work.',
      },
      {
        q: 'Does Copperfield flood?',
        a: 'Bear Creek and the Addicks Reservoir pool are south of Clay Road. Low ground closer to that water has taken storm water. Many streets inside Copperfield have not. We start with where water entered this house. A burst pipe and rising water are not the same job.',
      },
      {
        q: 'Who permits work in Copperfield?',
        a: 'Copperfield is in the City of Houston, so a permit, when the work needs one, comes from Houston. An association on many of these streets reviews the exterior: roof, paint, and fences. A kitchen inside the house is usually a different question. We confirm the address.',
      },
      {
        q: 'Do you handle the insurance claim?',
        a: 'Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer decides coverage and payment.',
      },
    ],
    [
      { href: '/cypress-tx', label: 'Cypress' },
      { href: '/jersey-village-tx', label: 'Jersey Village' },
      { href: '/roofing-bear-creek-tx', label: 'Roofing in Bear Creek' },
      { href: '/water-damage-restoration-energy-corridor-tx', label: 'Water damage in the Energy Corridor' },
      { href: '/kitchen-remodeling-houston-tx', label: 'Kitchen remodeling in Houston' },
      { href: '/roofing-houston-tx', label: 'Roofing in Houston' },
      ...ownCityServiceLinks('copperfield', 'Copperfield'),
    ],
  ),
  page(
    'rosenberg-tx',
    'Rosenberg',
    'Rosenberg, the Fort Bend city beside Richmond. Older houses, newer slabs, Brazos drainage, roofs, and kitchens. Call (713) 909-0034.',
    'Rosenberg is the Fort Bend city on Interstate 69, beside Richmond, with an older railroad town and newer subdivisions toward the Grand Parkway. Visits are scheduled from our office in west Houston (77082).',
    [
      'Rosenberg and Richmond share a border and a lot of weather, and they are not the same city. Richmond is the county seat. Rosenberg grew up as the railroad town beside it, and it has its own city hall. Near downtown, along Highway 36 and the tracks, the houses are older: wood frame and brick, some of them pier-and-beam, on lots that were here long before the freeway. Farther out, along Interstate 69, FM 2218, and FM 762, the houses are later slab plans, many of them two-story. A kitchen that moves a wall is a different conversation in each one. We look at the house you called about.',
      'The Brazos River is west of town. Low ground nearer the river, and along the creeks that drain this flat clay, has taken floodwater in past storms. Houses set farther east, toward the Grand Parkway, did not all see that water. Seabourne Creek is one of the local drains. Brazos Town Center is the retail strip on the freeway, not a description of every lot. A supply-line break on a slab and water that came in from outside are different jobs, and they can be different policies. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer makes the final coverage decision.',
      'Hail and, from June 1 through November 30, tropical wind are the roof storms. Downtown roofs are smaller and often patched. The newer subdivisions have larger asphalt roofs with several planes. We walk the one on your house. South and west slopes age faster. An open deck gets a tarp when it is safe to be up there. A roof that is only worn on one face might be a repair. We will say if the whole field is done. We do not sell a replacement from the feeder road.',
      'Fort Bend clay moves when it is wet and when it dries. Doors stick. Floors that looked level under carpet are not level once the carpet is gone. On a pier-and-beam house near the original town, a slow leak can sit in the crawlspace without a puddle in the living room. We look under the house when there is access. On a slab, the water is in the drywall and under the floor the same day. There is no basement. We meter the wet edge. Humidity here is still Gulf air, so drying takes dehumidifiers, not a fan in a window.',
      'Kitchens in the older houses are often still separate rooms, and the walls are not square. New cabinets that ignore the casing look stuck on. Kitchens in the newer sections are already open to a family room. The work there is cabinets, counters, light, and a floor that does not stop at the doorway. Baths follow the same split. An old hall bath needs the drain found before the shower grows. A newer primary bath needs a waterproofed wall, then tile. A glass panel is the finish, not the waterproofing.',
      'Flooring on a Rosenberg slab is usually tile or a vinyl plank once the carpet comes out. Both need dry, reasonably flat concrete. Wood can live in a dry living room if it acclimates in the house first. Under an older pier-and-beam floor, the crawlspace moisture matters more than the sample. Laminate is for dry bedrooms and halls. It is not a floor for a room that stayed wet, and it will not stiffen a bouncy subfloor.',
      'Rosenberg issues its own permits. A Richmond permit does not cover a Rosenberg address, even when the two towns feel like one drive along US 90A. Associations show up in the newer sections and usually care about the roof and the exterior. The drive from our office in west Houston (77082) is southwest on Interstate 69, past Sugar Land, and the traffic changes the time. Call (713) 909-0034 and say whether this is a leak, a roof, or a remodel. We have been family-owned and serving Houston since 1993. There is no separate office in Rosenberg.',
    ],
    [
      services.storm('Brazos and creek water, hail, and tropical wind. Each one is written down as itself.'),
      services.tarp('For an open downtown roof or a newer cut-up roof, before the next rain.'),
      services.water('Crawlspace leaks in older houses, slab leaks in the newer sections, and outside water near the river.'),
      services.kitchen('Separate rooms near the railroad town. Open kitchens in the later subdivisions.'),
      services.bath('Tight older baths and larger primary baths. The drain is found before the room grows.'),
      services.vinyl('A wood-look floor on a dry slab once carpet is gone.'),
      services.tile('Kitchens, baths, and main rooms, after the clay movement in the floor is measured.'),
      services.wood('In a dry living room. Under an older house, the crawlspace has to be part of the plan.'),
      services.laminate('Dry bedrooms and halls. Not a stiffener for a bouncy pier-and-beam floor.'),
      services.roof('Patched older roofs and large newer ones. We walk the roof at the address.'),
      services.replace('When the field is done, not one worn edge on the feeder-road side.'),
    ],
    [
      {
        q: 'Is Rosenberg the same city as Richmond?',
        a: 'No. They share a border, and Richmond is the county seat next door. Rosenberg has its own permits. A mailing label or a freeway exit does not pick the counter. Tell us the address when you call (713) 909-0034.',
      },
      {
        q: 'Are the older houses pier-and-beam?',
        a: 'Many near the original town are, or they mix an older pier-and-beam house with a later addition. Newer subdivisions out toward the Grand Parkway and along FM 762 are slabs. We confirm before we talk about moving a drain.',
      },
      {
        q: 'Does the Brazos mean every Rosenberg house floods?',
        a: 'No. Low ground nearer the river and the creeks has taken floodwater in past storms. Houses farther east did not all see that water. We look at this lot. Outside water and a supply leak are documented as different events.',
      },
      {
        q: 'Do you handle the insurance claim?',
        a: 'We document the damage, meet with your adjuster, and work the repair scope with your insurer as your contractor. We are not public adjusters. Your insurer makes the final coverage decision.',
      },
    ],
    [
      { href: '/roofing-richmond-tx', label: 'Roofing in Richmond' },
      { href: '/kitchen-remodeling-richmond-tx', label: 'Kitchen remodeling in Richmond' },
      { href: '/bathroom-remodeling-richmond-tx', label: 'Bathroom remodeling in Richmond' },
      { href: '/water-damage-restoration-richmond-tx', label: 'Water damage in Richmond' },
      { href: '/fulshear-tx', label: 'Fulshear' },
      ...ownCityServiceLinks('rosenberg', 'Rosenberg'),
    ],
  ),
  page(
    'jersey-village-tx',
    'Jersey Village',
    'Jersey Village, the city on US 290 and White Oak Bayou. Older slabs, bayou water, hail, kitchens, baths, and roofs. Call (713) 909-0034.',
    'Jersey Village is its own city on US 290, between Jones Road and the Sam Houston Tollway, with White Oak Bayou through the middle of it. We schedule the work from our office in west Houston (77082).',
    [
      'Jersey Village is a small city surrounded by Houston, and the map fools people. The streets are not a Houston subdivision with a Houston permit counter. The city incorporated in the 1950s as a residential town, and most of the houses are brick ranches and two-story plans from the 1960s through the 1980s, on concrete slabs. Lots are a little larger than a typical west Houston lot from the same years. Some streets still show the older equestrian layout, and the municipal golf course sits inside the city. A townhome on the Houston side of the tollway is a different building. We ask which one you have.',
      'White Oak Bayou is the fact that separates a water call here from a leak in a dryer suburb. Low streets along the bayou have flooded more than once, including in the storms of 2016 and 2017. The city has widened parts of the bayou and bought some of the lowest houses since then. Higher streets did not all take that water. A house that was raised after a flood is not the same job as the ranch that never saw it. If water rose into the house, say so. If a water heater in the garage let go, say that too. We photograph the waterline or the break we can see. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer decides which policy responds.',
      'The roofs are asphalt on one and two stories, and a lot of them have already been replaced once. Hail still bruises the field in a way the yard does not show. Wind lifts ridge caps. Limbs from the trees along the bayou land in valleys. We walk every slope, including the ones over the garage. An opening gets a tarp when the ladder and the weather allow it. Board-up is for broken glass and a door that will not lock. A closed roof with a few bruises might be a repair. We say so after the inspection.',
      'Ordinary leaks are still the call between storms. A toilet supply, a washing-machine hose, a pipe that split in a freeze in an attic or an exterior wall. On a slab, that water is at the baseboard the same day. Jersey Village humidity will not dry the wall because a window is open. We find the wet rooms with a meter, pull what is finished, and dry what can stay. A bayou flood and this kind of leak are written up as different events, because they are.',
      'Kitchens in these houses are often the original ranch kitchen, updated in pieces. The room may still be closed off from the living room. Opening it means the structure and the slab drain. A kitchen that stays closed can still get new cabinets, counters, and a floor. Baths are a primary bath and a hall bath, and the pans are the age of the last remodel, not the age of the brick. Waterproofing is the work. The tile is what you see after. We do not treat a 1970s ranch as a blank open plan.',
      'Floors on these slabs show every hump once carpet comes out. Vinyl and tile are the practical answers in kitchens, baths, and main rooms, after the concrete is dry and flat enough. Wood needs time in the house, and it is a living-room floor, not a cover for a moisture problem. Laminate that sat in floodwater is replaced. It does not dry back into a floor. After bayou water, we do not install anything to hide a damp slab.',
      'Permits come from the City of Jersey Village. That is different from a Houston address a few blocks away, outside the city limit. An association, where one exists, is a separate review and is usually about the exterior. The drive from our office in west Houston (77082) is north, Highway 6 or the Beltway to US 290. Senate Avenue and Jones Road are the local cuts. Call (713) 909-0034. If water is still spreading or the roof is open, say that first. We have been family-owned and serving Houston since 1993. There is no Jersey Village storefront.',
    ],
    [
      services.storm('Bayou water, hail, and wind. We keep the cause that reached this house.'),
      services.tarp('For a roof opened by wind or a limb, staged for the lot and the trees.'),
      services.water('White Oak Bayou on low streets, and ordinary slab leaks on houses that stayed dry outside.'),
      services.kitchen('Ranch kitchens, often still partly closed, updated one piece at a time.'),
      services.bath('Primary baths and hall baths. The pan is older than the brick on a lot of these houses.'),
      services.vinyl('After carpet, on a slab that is actually dry and flat enough.'),
      services.tile('A practical floor in kitchens and baths once the concrete is flat.'),
      services.wood('A living-room floor after it acclimates. Not a cover for a moisture problem.'),
      services.laminate('Replaced when it sat in floodwater. New laminate only in rooms that stay dry.'),
      services.roof('One- and two-story asphalt, including the slopes over the garage.'),
      services.replace('When hail or age is across the roof, not a single missing tab.'),
    ],
    [
      {
        q: 'Does Houston permit work in Jersey Village?',
        a: 'No. Jersey Village is its own city, even though Houston surrounds it. Permits come from Jersey Village. A house just outside the city limit can be a Houston address. We go by the legal address, not by the freeway exit.',
      },
      {
        q: 'Did every house along White Oak Bayou flood?',
        a: 'No. Low streets have flooded more than once, including in 2016 and 2017, and some of the lowest houses were bought or raised afterward. Higher streets did not all take that water. We start with this house. Rising water and a supply leak are different events.',
      },
      {
        q: 'What kind of houses are common here?',
        a: 'Brick ranches and two-story houses from the 1960s through the 1980s, on slabs, on lots that are a little larger than a typical Houston lot of those years. Some have been elevated. We measure the one you have before we talk about a kitchen or a roof.',
      },
      {
        q: 'Do you handle the insurance claim?',
        a: 'Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. We repair what you hire. Your insurer decides the payment.',
      },
    ],
    [
      { href: '/roofing-houston-tx', label: 'Roofing in Houston' },
      { href: '/water-damage-restoration-houston-tx', label: 'Water damage in Houston' },
      { href: '/kitchen-remodeling-houston-tx', label: 'Kitchen remodeling in Houston' },
      { href: '/bathroom-remodeling-houston-tx', label: 'Bathroom remodeling in Houston' },
      { href: '/cypress-tx', label: 'Cypress' },
      { href: '/copperfield-tx', label: 'Copperfield' },
      ...ownCityServiceLinks('jersey-village', 'Jersey Village'),
    ],
  ),
  page(
    'towne-lake-tx',
    'Towne Lake',
    'Towne Lake, north of US 290 in Cypress. A lake community, hail, open kitchens, baths, floors, and large roofs. Call (713) 909-0034.',
    'Towne Lake is the master-planned community in Cypress, north of US 290, built around a large lake between Tuckerton Road and Mueschke Road. We schedule it from our office in west Houston (77082).',
    [
      'Towne Lake is not the older Cypress streets along Cypress Creek. Houses here started going up around 2008: two-story plans, brick and stone, open kitchens, and slabs. A lot of that concrete is post-tension, with cables in the pour. Cutting one of those slabs to move a shower is not the same job as cutting an older Cypress slab, and it is not the same job as a Copperfield slab from the 1980s. We locate the work before anyone cuts. A shower that stays on its drain does not need the slab opened.',
      'The lake is the center of the section, and the detention around it is how this community holds a hard rain. That is a different water story from Cypress Creek, which sits south of US 290. A low street can still pond. A house that took water from a ponded street and a house with a burst supply line need different drying. We do not write them up as the same event. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer makes the final coverage decision.',
      'Spring hail is the roof call. These roofs are large, cut up, and mostly asphalt, with planes over the garage that you cannot see from Tuckerton. Wind lifts ridge caps. We look at the slopes that faced the storm, not only the front. An opening gets a tarp, staged for the driveway you actually have. A bruised but closed roof is an inspection, then a repair or a replacement, said after the walk. An association in Towne Lake usually reviews roof color. We ask before materials are ordered.',
      'Two-story plans put water heaters and supply lines in attics. A freeze or a failed drain pan dumps water into the ceiling. The insulation can be soaked while the drywall below is only spotted. We open the wet part and leave it open until it is dry. The garage heater is the other common one. It floods the garage and then the room beside it if the slab is flat. Gulf humidity is why the dry-out uses dehumidifiers with the air movers. A window does not finish a Towne Lake attic leak.',
      'Kitchen work here is usually inside a room that was built open. The island, the light, and a floor that runs into the family room are the project. People also call when they want the builder cabinets gone. The slab still decides whether the sink can move. Baths are large primary suites and smaller hall baths. Both get waterproofing before the tile. A glass panel does not make a shower waterproof. We measure the room. The community name does not pick the layout.',
      'Downstairs floors are often tile on the slab, with carpet upstairs. The call is usually to change one of them. Vinyl plank is a wood look when the concrete is flat and dry. Real wood needs a dry slab and time in the house before it is fastened. Laminate belongs in dry bedrooms, not in a bath. After any water on the first floor, the sample waits until the slab is dry. Clay under these lots still moves. We level the conversation to the floor that is there, not to the floor on a neighboring street.',
      'Towne Lake is not a city. Most of these addresses are in unincorporated Harris County, with a Cypress mailing address. The permit follows the address, and it is not a Towne Lake counter and not automatically a City of Houston permit. The association is a separate review, and it is usually about the exterior. The drive from our office in west Houston (77082) is northwest on US 290, then Tuckerton. Call (713) 909-0034 and tell us whether this is a roof, a leak, or a remodel. We have been family-owned and serving Houston since 1993. There is no storefront at the lake.',
    ],
    [
      services.storm('Hail and wind on large roofs, separate from ponding on a low street by the lake.'),
      services.tarp('Stops the next rain at an opening. The permanent roof is a later decision.'),
      services.water('Attic supply lines and garage heaters. Outside water is documented as its own event.'),
      services.kitchen('Open kitchens. The island and the floor can change without moving the sink.'),
      services.bath('Large primary baths and smaller hall baths. Waterproofing before the finish.'),
      services.vinyl('A wood look on a flat, dry slab, including where upstairs carpet came out.'),
      services.tile('Already common downstairs. Replacement starts with how flat the slab is.'),
      services.wood('After the slab is dry, and after the wood has spent time in the house.'),
      services.laminate('Dry bedrooms. Not a bath, and not a floor for a slab that stayed wet.'),
      services.roof('Big cut-up roofs. Every plane, including the ones over the garage.'),
      services.replace('When hail or age is across the roof, not a single lifted tab.'),
    ],
    [
      {
        q: 'Is Towne Lake inside a city called Cypress?',
        a: 'Cypress is the place name, not a city hall. Most Towne Lake addresses are in unincorporated Harris County. The permit follows the address. We confirm it before we treat a county lot and a Houston lot as the same counter.',
      },
      {
        q: 'Can you move a shower in a Towne Lake house?',
        a: 'Sometimes. Newer slabs are often post-tension, so moving a drain starts with finding the cables. A shower that stays on its drain does not need the slab cut. We look before we say the layout will work.',
      },
      {
        q: 'Does the lake mean the house floods?',
        a: 'The lake and the detention around it are how this section holds ordinary rain. That is not the same as Cypress Creek, south of US 290. A low street can still pond in a big storm. We look at your lot. Outside water and a supply leak are different events.',
      },
      {
        q: 'Do you handle the insurance claim?',
        a: 'We document the damage, meet with your adjuster, and work with your insurance company on the scope of repairs as your contractor. We are not public adjusters. Your insurer makes the final coverage decision.',
      },
    ],
    [
      { href: '/cypress-tx', label: 'Cypress' },
      { href: '/bridgeland-tx', label: 'Bridgeland' },
      { href: '/roofing-katy-tx', label: 'Roofing in Katy' },
      { href: '/kitchen-remodeling-katy-tx', label: 'Kitchen remodeling in Katy' },
      { href: '/water-damage-restoration-katy-tx', label: 'Water damage in Katy' },
      ...ownCityServiceLinks('towne-lake', 'Towne Lake'),
    ],
  ),
  page(
    'bridgeland-tx',
    'Bridgeland',
    'Bridgeland, along Fry Road with Cypress Creek on the south edge. Hail, new slabs, kitchens, baths, and roofs. Call (713) 909-0034.',
    'Bridgeland is the Cypress community of villages north of US 290, along Fry Road and Mason Road, with Cypress Creek on the south edge. We schedule the work from our office in west Houston (77082).',
    [
      'Bridgeland is several villages, not one floor plan. Creekland sits nearer the creek. Lakeland is built around lakes. Parkland and Prairieland open onto more prairie. The houses are newer two-story plans on slabs, and a lot of those slabs are post-tension. Cables in the concrete change whether a shower or a sink can move. We do not cut a Bridgeland slab from a drawing that never saw the house. A layout that keeps the fixtures on their drains is a different project from one that chases a new drain across the room.',
      'Cypress Creek is the south boundary, between the villages and US 290. A lot next to that greenway is not the same ground as a house in the middle of a village. Low ground nearer the creek has a different rain story from a pad set higher. Detention lakes take ordinary storms. A big storm can still put water on a low street. Water that came from outside and water from an attic line are different jobs. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer makes the final coverage decision.',
      'The roofs are large and cut up, with dormers and garage planes that the front elevation hides. Spring hail marks them. Tropical wind, from June 1 through November 30, is the other test. We walk all the slopes. An open deck gets a tarp before the next rain, when it is safe to be up there. A tarp is not the finished roof. The association reviews color, and sometimes the profile, before shingles are ordered. Interior cabinets are usually outside that review. We ask which review this address has.',
      'Attic water heaters and supply lines are the leak we see in these two-story houses. The ceiling stain shows up late. Insulation above it can already be wet. We open that bay and dry it. We do not close the drywall to make the bedroom look finished. A garage water heater floods the garage first and the next room if the slab lets it. Clay movement shows up as a door that sticks or a floor that is not as level as it looks from the street. We measure your house.',
      'Kitchens were built open, with an island and the family room in the same view. Remodels here are cabinets, counters, light, and a floor that crosses the doorway. Moving the sink starts with the slab. Baths are large primary suites. Waterproofing goes behind the tile either way, including in a smaller hall bath. A shower that stays where it is does not need a new drain. We will say if the one you want does.',
      'Floors downstairs are often tile. Upstairs is often carpet that people want gone. Vinyl plank does that on a flat, dry subfloor. Wood acclimates in the house. Laminate is for dry bedrooms and halls, and the pad will not hide a hump. After water, nothing new goes down on a damp slab. Yards in Bridgeland can take a patio if the water leaves the wall, and the association may still have to see the cover before lumber is ordered. The lot is larger than a lot inside the Loop. That helps staging. It does not make the slab flat.',
      'Bridgeland is not its own city. Addresses are commonly unincorporated Harris County, with a Cypress place name. Fry Road, Mason Road, and the Grand Parkway are the drives, north of US 290. The permit is the county or the city that actually contains the address, which we confirm. The drive from our office in west Houston (77082) is US 290 northwest, longer than the drive to Copperfield. Call (713) 909-0034. We have been family-owned and serving Houston since 1993. We come to you. There is no Bridgeland office.',
    ],
    [
      services.storm('Hail and tropical wind on village roofs, separate from creek water on a lot by the greenway.'),
      services.tarp('Covers an opening before the next rain. It is not the roof we leave you with.'),
      services.water('Attic lines in two-story houses, and outside water written down only when that is what happened.'),
      services.kitchen('Open kitchens. The sink stays put unless the slab says it can move.'),
      services.bath('Primary suites and smaller baths. Waterproofing before the tile you picked.'),
      services.vinyl('Where carpet came out, on a flat dry floor, upstairs or down.'),
      services.tile('The usual downstairs floor. A new tile still needs a flat slab.'),
      services.wood('In living rooms, after it acclimates. Not over a damp slab.'),
      services.laminate('Dry bedrooms and halls. The pad does not hide a hump.'),
      services.roof('Large roofs over Creekland, Lakeland, Parkland, and Prairieland. We walk yours.'),
      services.replace('When the shingles are tired across the house, not one wind-lifted edge.'),
    ],
    [
      {
        q: 'How is Bridgeland different from Towne Lake?',
        a: 'They are both newer Cypress communities north of US 290, and the houses can look similar from the street. Bridgeland is the villages along Fry Road and Mason Road, with Cypress Creek as the south edge. Towne Lake is organized around its lake, farther east. The permit and the association are still read off your address.',
      },
      {
        q: 'Does Cypress Creek flood these houses?',
        a: 'The creek is the south edge of the community. A lot next to that greenway is not the same ground as a house in the middle of a village. Detention lakes take ordinary rain. We look at your lot. Outside water and an attic leak are different jobs.',
      },
      {
        q: 'Who reviews a new roof or a patio cover?',
        a: 'The county or the city for the permit, and the association when the section has one. Bridgeland reviews usually care about roof color, paint, fences, and a cover in the yard. A kitchen inside the house is a different question. We ask before materials are ordered.',
      },
      {
        q: 'Do you handle the insurance claim?',
        a: 'Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer decides coverage and the amount.',
      },
    ],
    [
      { href: '/cypress-tx', label: 'Cypress' },
      { href: '/towne-lake-tx', label: 'Towne Lake' },
      { href: '/roofing-katy-tx', label: 'Roofing in Katy' },
      { href: '/kitchen-remodeling-katy-tx', label: 'Kitchen remodeling in Katy' },
      { href: '/bathroom-remodeling-katy-tx', label: 'Bathroom remodeling in Katy' },
      { href: '/water-damage-restoration-katy-tx', label: 'Water damage in Katy' },
      ...ownCityServiceLinks('bridgeland', 'Bridgeland'),
    ],
  ),
  page(
    'sienna-tx',
    'Sienna',
    'Sienna, in Missouri City along Sienna Parkway. Fort Bend lakes, clay soil, kitchens, baths, floors, and roofs. Call (713) 909-0034.',
    'Sienna is the master-planned community in Missouri City, along Sienna Parkway, from Highway 6 south toward the Fort Bend Tollway. We schedule the work from our office in west Houston (77082).',
    [
      'Sienna, the community once called Sienna Plantation, sits in Missouri City in Fort Bend County. It is not Quail Valley. Quail Valley is the older Missouri City fabric, much of it from the 1960s through the 1980s. Sienna started in the 1990s and kept building. The earlier sections, closer to Highway 6, are a different size of house from the later sections farther south. A lot of the newer concrete is post-tension. The earlier slabs are often a different pour. We look before we say a shower can move. Cutting the wrong slab is not a small mistake.',
      'The ground is Fort Bend clay, flat and full of lakes that double as detention. Steep Bank Creek drains the southern part of the community, and the Brazos is farther south. A lot near that creek is not the same lot as a house up by Highway 6. Many houses have never taken water. Some low streets have. Heavy rain still ponds on flat pavement. Water from outside and a supply leak are different events. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer makes the final coverage decision.',
      'Hurricane season runs from June 1 through November 30. Spring storms bring hail. Roofs are asphalt, on the earlier one- and two-story houses and on the larger later ones. South and west slopes age faster. We look at all of them, including the planes over the garage. An association here reviews roof color, paint, and fences. A kitchen inside the house is usually outside that review. An open roof gets a tarp when it is safe. The tarp keeps the next rain out. It is not the new roof.',
      'Gulf humidity is why a dry-out in Sienna uses dehumidifiers with the air movers. Interior leaks start at a water heater, a supply line, or an appliance on the slab. The stain at the baseboard is late. There is no crawlspace. We meter, extract what is standing, and leave the wall open until it is dry. A roof leak after hail is the ceiling, then the insulation, then the wall. Clay movement shows up as a door that sticks. We do not blame the door until we have seen the opening.',
      'Kitchens in the later houses were built open, with an island. The remodel is cabinets, counters, light, and a floor that meets the next room. Kitchens in the earlier sections can be more closed, and the walls are not always square. Baths are primary suites and smaller hall baths. Waterproofing comes before the tile in both. A tub that becomes a shower still needs a pan and a slope, not only a new valve. We measure the room before we promise the glass.',
      'Floors on these slabs show every ridge when carpet comes out. Vinyl plank is the wood look when the concrete is flat and dry. Wood has to acclimate in the house. Laminate is for dry bedrooms and halls, not a bath, and not a slab that just sat in water. Tile is the wet-room floor, and a large tile needs a flatter floor than the carpet required. After outside water, the sample is the second question.',
      'Sienna is in the City of Missouri City, not in Houston and not in Sugar Land. Missouri City issues the permit. The address, not the old plantation name, picks the counter. Sienna Parkway is the spine. Highway 6, Watts Plantation, and the Fort Bend Tollway are the approaches. The drive from our office in west Houston (77082) is south, longer than the drive to Sugar Land. Call (713) 909-0034 and say whether this is a leak, a roof, or a remodel. We have been family-owned and serving Houston since 1993. There is no second office in Sienna.',
    ],
    [
      services.storm('Hail, tropical wind, and street water, written as the event that reached the house.'),
      services.tarp('For an open roof after a storm. A tarp is not the finished roof.'),
      services.water('Water heaters, supply lines, and houses that took water near a lake or Steep Bank Creek.'),
      services.kitchen('Open kitchens in later sections. More closed rooms in the earlier ones near Highway 6.'),
      services.bath('Primary suites and hall baths. A tub-to-shower change still needs a pan.'),
      services.vinyl('A wood-look floor on a flat, dry slab, including where carpet came out.'),
      services.tile('Wet rooms and main floors. Large tile needs a flatter slab than carpet did.'),
      services.wood('After the slab is dry, and after the wood spends time in the house.'),
      services.laminate('Dry bedrooms and halls. Not a bath, and not a floor over a wet slab.'),
      services.roof('Asphalt on earlier houses and on the larger later ones. Every slope.'),
      services.replace('When hail or age is across the roof, not a single lifted edge.'),
    ],
    [
      {
        q: 'Is Sienna permitted by Houston or by Sugar Land?',
        a: 'Neither. Sienna is in Missouri City, and Missouri City issues the permit. Sugar Land is nearby and has its own pages. We confirm the address. The old name, Sienna Plantation, does not change the counter.',
      },
      {
        q: 'Are Sienna slabs post-tension?',
        a: 'Many of the later ones are. Cables in the concrete change whether a shower or a sink can move. Earlier sections, closer to Highway 6, are often a different pour. We look at your house before we say a layout will work.',
      },
      {
        q: 'Is Sienna the same as Quail Valley?',
        a: 'No. Quail Valley is the older Missouri City area. Sienna is the master-planned community along Sienna Parkway, with lakes, later houses, and its own association. Both are scheduled from the Houston office. The houses are not the same.',
      },
      {
        q: 'Do you handle the insurance claim?',
        a: 'We document the damage, meet with your adjuster, and work with your insurance company on the scope of repairs as your contractor. We are not public adjusters. Your insurer makes the final coverage decision.',
      },
    ],
    [
      { href: '/missouri-city-tx', label: 'Missouri City' },
      { href: '/roofing-sugar-land-tx', label: 'Roofing in Sugar Land' },
      { href: '/kitchen-remodeling-sugar-land-tx', label: 'Kitchen remodeling in Sugar Land' },
      { href: '/bathroom-remodeling-sugar-land-tx', label: 'Bathroom remodeling in Sugar Land' },
      { href: '/water-damage-restoration-sugar-land-tx', label: 'Water damage in Sugar Land' },
      { href: '/roofing-pearland-tx', label: 'Roofing in Pearland' },
      ...ownCityServiceLinks('sienna', 'Sienna'),
    ],
  ),
];

const bySlug = new Map(neighborhoods.map((item) => [item.slug, item]));

export function getNeighborhood(slug: string) {
  return bySlug.get(slug);
}

function linkOk(href: string) {
  const slug = href.replace(/^\//, '');
  if (knownStatic.has(slug) || getService(slug)) return true;
  if (parseLocalLandingSlug(slug)) return true;
  if ((neighborhoodSlugs as readonly string[]).includes(slug)) return true;
  if (href.startsWith('/projects/')) return Boolean(getProject(href.slice('/projects/'.length)));
  return false;
}

const neighborhoodErrors: string[] = [];
const seenDescription = new Set<string>();
const seenLede = new Set<string>();
const seenOpening = new Set<string>();

if (neighborhoods.length !== neighborhoodSlugs.length) {
  neighborhoodErrors.push('Neighborhood slug list does not match the pages');
}

for (const slug of neighborhoodSlugs) {
  if (!bySlug.has(slug)) neighborhoodErrors.push(`Missing neighborhood page ${slug}`);
}

for (const item of neighborhoods) {
  if (!titleFits(item.title)) neighborhoodErrors.push(`Title does not fit: ${item.title}`);
  if (item.description.length > 155) {
    neighborhoodErrors.push(`Description is ${item.description.length} characters: ${item.slug}`);
  }
  if (seenDescription.has(item.description)) {
    neighborhoodErrors.push(`Duplicate description: ${item.slug}`);
  }
  seenDescription.add(item.description);
  if (seenLede.has(item.lede)) neighborhoodErrors.push(`Duplicate lede: ${item.slug}`);
  seenLede.add(item.lede);
  const opening = item.paragraphs[0] ?? '';
  if (seenOpening.has(opening)) neighborhoodErrors.push(`Duplicate opening: ${item.slug}`);
  seenOpening.add(opening);
  const words = wordCount([
    item.lede,
    ...item.paragraphs,
    ...item.services.flatMap((service) => [service.label, service.note]),
    ...item.faqs.flatMap((faq) => [faq.q, faq.a]),
  ]);
  if (words < 700) neighborhoodErrors.push(`${item.slug} is thin (${words} words)`);
  if (!item.ctaBody.includes(phone)) neighborhoodErrors.push(`${item.slug} CTA is missing the phone`);
  const blob = [
    item.lede,
    item.description,
    item.ctaBody,
    ...item.paragraphs,
    ...item.faqs.flatMap((faq) => [faq.q, faq.a]),
    ...item.services.map((service) => service.note ?? ''),
  ].join('\n');
  try {
    assertCopyAllowed(item.path, blob);
  } catch (error) {
    neighborhoodErrors.push(error instanceof Error ? error.message : String(error));
  }
  if (!blob.includes('We are not public adjusters.')) {
    neighborhoodErrors.push(`${item.path} is missing the allowed insurance phrase`);
  }
  for (const link of [...item.services, ...item.also]) {
    if (!linkOk(link.href)) neighborhoodErrors.push(`${item.slug} links an unknown path: ${link.href}`);
  }
  const labels = item.services.map((service) => service.label);
  for (const required of ['Storm damage', 'Water damage', 'Kitchen remodeling', 'Bathroom remodeling', 'Roofing']) {
    if (!labels.includes(required)) neighborhoodErrors.push(`${item.slug} is missing ${required}`);
  }
  if (!labels.some((label) => /floor/i.test(label))) {
    neighborhoodErrors.push(`${item.slug} is missing flooring`);
  }
}

if (neighborhoodErrors.length > 0) {
  throw new Error(neighborhoodErrors.join('\n'));
}
