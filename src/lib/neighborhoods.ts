import { assertCopyAllowed } from '@/lib/copy-guards';
import { neighborhoodSlugs, type NeighborhoodSlug } from '@/lib/locale-paths';
import type { NeighborhoodPage } from '@/lib/neighborhood-types';
import { parseLocalLandingSlug } from '@/lib/local-paths';
import { getProject } from '@/lib/projects';
import { titleFits } from '@/lib/seo';
import { getService } from '@/lib/services';
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
    ctaBody: `Call ${phone}. We schedule from 511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993.`,
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
  roof: (note: string) => ({ href: '/roofing', label: 'Roofing', note }),
  replace: (note: string) => ({
    href: '/roof-replacement',
    label: 'Roof replacement',
    note,
  }),
};

export const neighborhoods: readonly NeighborhoodPage[] = [
  page(
    'meyerland-tx',
    'Meyerland',
    '1950s brick ranches along Brays Bayou in Meyerland. Storm repair, dried-out houses, kitchens, baths, floors, and low roofs. Call (713) 909-0034.',
    'Meyerland is the southwest Houston neighborhood of one-story brick ranches along Brays Bayou and North Braeswood. We schedule the work from 511 Crestwater Ct.',
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
        a: 'We are not public adjusters. We photograph the damage, tarp or dry when that is the right next step, and write a repair estimate for the work you hire. You file the claim. Your insurer decides coverage and payment.',
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
      'The drive from 511 Crestwater Ct is cross-town, Westheimer or Richmond into the Loop. There is no Montrose showroom. Call (713) 909-0034. If water is coming in or the roof is open, say that first.',
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
      'Garden Oaks is in Houston. Some streets have older deed restrictions aimed at the elevation. Interior remodeling is usually outside that review. The drive from 511 Crestwater Ct is across town, I-10 toward the north side. Call (713) 909-0034 to set a time. Traffic changes the hour.',
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
        a: 'Your insurer. We are not public adjusters. We document what the storm or the leak did and we repair what you hire. The claim stays with you and the insurer.',
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
    'Oak Forest is the north Houston neighborhood of brick ranch houses from the late 1940s through the 1960s, north of Garden Oaks. We schedule the visits from 511 Crestwater Ct.',
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
        a: 'No. We are not public adjusters. You call your insurer. We document the house and do the drying and the repair you hire. The insurer decides payment.',
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
      'Kingwood has its own municipal services inside Houston’s extraterritorial patchwork. We confirm the permit office for the address. The drive from Crestwater Court is the long one, up the northeast side. Call (713) 909-0034 and we will tell you the visit window. There is no Kingwood showroom.',
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
      'Cypress Creek is the flood story. Sections near the creek have taken storm water. A detention pond in a new subdivision is how that section holds rain. It is not a promise that a street never ponds. A house that took creek water and a house with a burst washing-machine hose need different drying and, often, different insurance conversations. Your insurer decides coverage. We document the path we can see.',
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
      services.roof('Big, cut-up roofs. Every slope, including the ones over the garage.'),
      services.replace('When hail or age is across the roof, not a single lifted tab.'),
    ],
    [
      {
        q: 'Are newer Cypress slabs post-tension?',
        a: 'A lot of the newer ones are. Cables run through the concrete. That changes whether a shower or a sink can move. Older slabs in Cypress are a different cut. We check this house before we promise a layout.',
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
        a: 'We work for the owner who calls. We are not public adjusters. You file the claim. Your insurer decides what the policy pays. We repair the roof, the water damage, or the room you hire.',
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
      'The drive from 511 Crestwater Ct is north, I-45 or the Hardy Toll Road depending on the section. Call (713) 909-0034. Say whether this is a leak, a roof, or a remodel so the visit is the right one. Family-owned since 1993. The crew comes from the Houston office.',
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
        a: 'Your insurer decides. We are not public adjusters. We photograph, tarp, dry, and rebuild the parts you hire. We do not take a fee to argue the claim.',
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
        a: 'We are not public adjusters. We help with photos, a repair estimate, and the work. You file. The insurer decides coverage and payment.',
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
    'Friendswood is its own city southeast of Houston, between the Gulf Freeway and Clear Creek. We schedule remodeling and restoration there from 511 Crestwater Ct.',
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
        q: 'Will you file the claim for me?',
        a: 'You file with your insurer. We are not public adjusters. We document the damage and repair what you hire. We do not decide the payment.',
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
