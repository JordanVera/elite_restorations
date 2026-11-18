import type { Article } from '@/lib/articles';

export const houstonPostsB: Article[] = [
  {
    slug: 'houston-bathroom-remodel-guide',
    title: 'A practical bathroom remodel in Houston',
    metaTitle: 'Houston Bathroom Remodel Guide',
    crumb: 'Bathroom remodels',
    lines: ['The bath you use', 'every morning.'],
    description:
      'Houston bathroom remodels: waterproofing, small hall baths, larger primary baths, and what the plumbing will allow.',
    lede: 'A bathroom remodel in Houston is a small room with a lot of water. The tile is what you see. The waterproofing is what keeps the wall from rotting.',
    image: '/images/projects/bathrooms/shower-niche-large-format.jpg',
    service: 'bathroom-remodeling',
    ctaTitle: 'Planning a bath?',
    ctaBody:
      'Call (713) 909-0034 to schedule an estimate. We measure the room before we promise a layout. We\'ve been family-owned in Houston since 1993.',
    related: ['houston-kitchen-remodel-ideas', 'houston-flooring-for-humidity'],
    faqs: [
      {
        q: 'Can a tub become a shower?',
        a: 'Often, yes. The drain, the curb, and the waterproofing decide it, not a pretty tile picture. We look at the flange and the floor before we say the tub can go.',
      },
      {
        q: 'Why does the fan matter so much here?',
        a: 'Houston humidity doesn\'t leave a new shower alone. The fan needs to vent outside, not into the attic. A fogged mirror every morning is a clue the old fan isn\'t doing the job.',
      },
      {
        q: 'Do you remodel one hall bath?',
        a: 'Yes. A lot of the work in older Houston houses is exactly that room. A powder room is a smaller version, and a primary suite is a larger one. We don\'t skip the waterproofing because the room is small.',
      },
      {
        q: 'What if the bath leaked first?',
        a: 'We dry it before we tile it. Photograph the damage and keep that repair separate from any extra layout changes. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer decides the claim.',
      },
    ],
    sections: [
      {
        heading: 'Small baths and big ones',
        blocks: [
          {
            type: 'p',
            text: 'Oak Forest, Meyerland, and a lot of Humble’s older streets have a hall bath with a tub, a small vanity, and a door that barely clears the toilet. People want a shower they can walk into and a vanity that holds more than a cup. The room doesn\'t get bigger because we wish it would. We measure the door swing, the window, and the drain. Sometimes the tub stays and the surround is the project. Sometimes the tub comes out and a curb shower fits. We say which one the plumbing allows.',
          },
          {
            type: 'p',
            text: 'Kingwood, Cypress, and newer Tomball houses often already have a primary bath with room for a glass panel and a double vanity. The failure there\'s usually the pan, the corners, or a fan that dumps steam into the attic. A remodel can be new tile and a real waterproofing layer without moving a single wall. Moving the shower to the window wall is a different project, and on a post-tension slab it may not be worth the cut.',
          },
          {
            type: 'p',
            text: 'Montrose and Garden Oaks add pier-and-beam floors and rooms that are out of square. A glass panel ordered square will show the gap, so we template from the room. Original trim outside the bath is worth matching if the rest of the house still has it. A plastic surround in a bungalow can be the right simple fix, or it can be the thing you\'re tired of. Both are honest conversations.',
          },
        ],
      },
      {
        heading: 'Waterproofing before the pretty part',
        blocks: [
          {
            type: 'p',
            text: 'Tile isn\'t waterproof. The layer behind it is. We put that layer on the walls and the pan, we treat the corners and the niche, and then we set the tile. A niche that\'s just a hole in the studs will leak behind your shampoo bottles, and the curb gets the same attention. This is the part of the job you won\'t see in a photograph, and it\'s the part that decides whether the ceiling below stays dry.',
          },
          {
            type: 'p',
            text: 'Second-floor baths in Spring and Cypress need the ceiling underneath in the plan. If the old pan already stained that ceiling, we open what is wet, dry it, and rebuild it as part of the job. Closing a pretty shower over a wet ceiling is how you buy the same repair twice. Ground-floor baths on a slab need the floor flat enough for the tile, because a hump at the door shows up in the grout lines.',
          },
          {
            type: 'list',
            items: [
              'Pan and wall waterproofing before any finish tile.',
              'A fan that leaves the house, not the attic.',
              'Niches built as part of the waterproof layer.',
              'Glass ordered after the curb and the walls are real, not from a guess.',
            ],
          },
        ],
      },
      {
        heading: 'What Houston humidity does to finishes',
        blocks: [
          {
            type: 'p',
            text: 'Paint in a bath wants a finish you can wipe. A matte ceiling that never dries will spot. We vent the room and we give the waterproofing time before the door is closed up for a week. Grout in a shower gets dirty, so a grout you can seal, or a joint you\'re willing to clean, belongs in the tile choice. Tiny tiles mean more grout. Large tiles mean a flatter wall.',
          },
          {
            type: 'p',
            text: 'Vanities made of raw particle board swell at the sink. We\'ve opened enough of them. A plywood box, or a well-built cabinet with a top that protects the edge, survives the splash. The top itself can be stone, a cultured top, or a simpler solid surface. We talk about the sink you use, not a showroom photo. In a narrow hall bath, a smaller vanity with a real medicine cabinet beats a wide cabinet that blocks the door.',
          },
          {
            type: 'links',
            items: [
              { href: '/bathroom-remodeling', label: 'Bathroom remodeling' },
              { href: '/tile-flooring', label: 'Tile for wet rooms' },
              { href: '/oak-forest-tx', label: 'Hall baths in Oak Forest' },
              { href: '/garden-oaks-tx', label: 'Small baths in Garden Oaks' },
            ],
          },
        ],
      },
      {
        heading: 'Plumbing that won\'t move',
        blocks: [
          {
            type: 'p',
            text: 'On a slab, the toilet flange and the shower drain are in concrete. Moving them is a cut, a patch, and a dusty day. Keeping them and rebuilding the room around them is often the better remodel. On a pier-and-beam house we can sometimes reroute under the floor, which is messy in a different way and still has to be supported. We don\'t promise a freestanding tub on a new wall until we\'ve seen the drain and the joists.',
          },
          {
            type: 'p',
            text: 'Supply lines in older Garden Oaks and Montrose houses may be a mix of old and new. If we\'re opening the wall, that\'s the time to replace a crusty valve, not the week after the tile is up. Shutoffs that don\'t shut are part of the scope when we find them. We would rather add them while the wall is open than leave you with a single main valve for the whole house.',
          },
        ],
      },
      {
        heading: 'Order of work',
        blocks: [
          {
            type: 'p',
            text: 'Here is the order we actually use. We protect the rest of the house, demo the wet finishes, and repair the framing we can now see. Then we waterproof, tile, and set the vanity, the glass, and the accessories. Paint waits until the dust is actually gone, because a bath painted before the tile is cut will wear that dust in the finish. If you have a second bath, we sequence the work so one stays usable. If this is the only bath, we tell you how many days the water will be off, and we stick to that plan.',
          },
          {
            type: 'p',
            text: 'Permits show up when plumbing moves, and the city or the county follows the address. Friendswood isn\'t Houston. Tomball isn\'t unincorporated Harris County on every street. We check. Call (713) 909-0034 with the address and a photo of the bath as it is. We\'ve been family-owned since 1993. If the only problem is a soft spot in the floor, say that. A remodel on a rotten subfloor is a repair first.',
          },
          {
            type: 'links',
            items: [
              { href: '/bathroom-remodel-cost-houston', label: 'What changes a bathroom remodel cost' },
              { href: '/kingwood-tx', label: 'Primary baths in Kingwood' },
              { href: '/cypress-tx', label: 'Baths in newer Cypress houses' },
              { href: '/montrose-tx', label: 'Bungalow baths in Montrose' },
            ],
          },
        ],
      },
      {
        heading: 'After a leak, not instead of drying',
        blocks: [
          {
            type: 'p',
            text: 'A toilet that seeped, a valve that split, or a shower that was never waterproofed can be why you\'re remodeling. Dry the subfloor and the ceiling below before new tile goes on. Photograph the failure and the wet materials. If insurance is involved, we work with your insurance company as your contractor and handle the claim scope with the adjuster. The insurer decides whether the leak is covered. The new glass, if it wasn\'t there before, is a choice you\'re making, and it should be written that way.',
          },
          {
            type: 'p',
            text: 'We\'ll tell you if the room only needs a pan and a surround. Not every tired bath needs to be taken to the studs, and not every stained ceiling is a full remodel. The visit is how we tell those apart. Bring the list of what annoys you on a Tuesday morning. That list is more useful than a folder of photos from a house with a different floor plan.',
          },
        ],
      },
    ],
  },
  {
    slug: 'houston-flooring-for-humidity',
    title: 'Flooring that can live with Houston humidity',
    metaTitle: 'Flooring for Houston Humidity',
    crumb: 'Floors and humidity',
    lines: ['The floor,', 'and the moisture under it.'],
    description:
      'Vinyl plank, tile, and wood in Houston humidity: what belongs on a slab, what needs to acclimate, and what waits until the floor is dry.',
    lede: 'Houston floors fail from moisture more often than from foot traffic. The product matters, and the slab or the crawlspace under it matters more.',
    image: '/images/projects/flooring/light-plank-empty-room.jpg',
    service: 'vinyl-flooring',
    ctaTitle: 'Not sure which floor fits?',
    ctaBody:
      'Call (713) 909-0034. We look at the slab or the subfloor before we recommend vinyl, tile, or wood. We\'ve been family-owned in Houston since 1993.',
    related: ['houston-bathroom-remodel-guide', 'houston-flood-damage-repair'],
    faqs: [
      {
        q: 'Will vinyl hide a wavy slab?',
        a: 'No. It shows the ridge the carpet hid, and large tile shows it too. Leveling is a real step when the floor needs it. We say so before the material is ordered.',
      },
      {
        q: 'Can I put wood on a slab?',
        a: 'Sometimes, with a product meant for that slab and a dry concrete surface. The wood has to sit in the house and get used to the humidity before it\'s fastened. We don\'t install it off the truck.',
      },
      {
        q: 'Is laminate a good wet-room floor?',
        a: 'No. Laminate belongs in dry rooms. A bath, a laundry room that floods, and a slab that just took on water are the wrong places. Tile, or a vinyl plank rated for water, is the usual answer there.',
      },
      {
        q: 'What if the old floor got wet in a claim?',
        a: 'Dry the structure first, and photograph what came out. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer decides payment. The new floor goes in when the meter says the slab or the subfloor is ready.',
      },
    ],
    sections: [
      {
        heading: 'Humidity is the local condition',
        blocks: [
          {
            type: 'p',
            text: 'The air conditioner runs most of the year, then a front drops the indoor humidity, then a week of rain pushes it back up. Wood moves with that swing. A crawlspace open to the outside, which is common under Montrose and Garden Oaks bungalows, feeds that movement from below. A slab doesn\'t breathe the same way, but it can hold water from a leak or a flood long after the room smells fine. Any floor conversation in this city starts with where the moisture is.',
          },
          {
            type: 'p',
            text: 'Friendswood, and the lake side of Humble and Kingwood, stay humid even when the rest of the house feels cool. Tile and vinyl handle that better in kitchens and baths. Wood can still be the living-room floor if it\'s the right product and the substrate is dry. We don\'t pick one floor for every room because a sample looked good in the store.',
          },
        ],
      },
      {
        heading: 'Vinyl plank',
        blocks: [
          {
            type: 'p',
            text: 'Vinyl plank is the floor a lot of Houston ranches choose when carpet comes out of Oak Forest, Meyerland, or an older Humble house. It can take a splash better than wood, but it doesn\'t forgive a hump. If you can feel a ridge through the old carpet, you\'ll see it through the plank. We check the slab with a straightedge, not with optimism, and leveling compound is part of the job when the floor needs it.',
          },
          {
            type: 'p',
            text: 'The plank also needs a dry slab. Installing it over a slow leak locks the water in, and then the room smells like it. After a dishwasher leak or a supply break, we meter first. Transitions at the tile bath and at the exterior door are planned so the heights meet. A beautiful field with a bad reducer in the hall is what people trip on. We order the plank after the rooms are measured, including the closets you actually want covered.',
          },
          {
            type: 'links',
            items: [
              { href: '/vinyl-flooring', label: 'Vinyl plank flooring' },
              { href: '/oak-forest-tx', label: 'Slab floors in Oak Forest' },
              { href: '/meyerland-tx', label: 'Floors in Meyerland ranches' },
            ],
          },
        ],
      },
      {
        heading: 'Tile',
        blocks: [
          {
            type: 'p',
            text: 'Tile is the Houston floor that has always made sense in a bath, a kitchen, and a laundry room. It also works across a whole first floor if you like it and the slab is flat enough for the size you picked. Large rectangles show every dip. Smaller tile and a joint hide more. Clay soil moves slabs, and a joint with a proper set reduces the chance of a crack telegraphing through. We can\'t promise a slab will never move. We can install the tile so it has a fair chance.',
          },
          {
            type: 'p',
            text: 'A shower floor is a different tile job from a hallway. The slope, the drain, and the waterproofing come before the mosaic you chose. A kitchen backsplash is a wall, not a floor, and it gets its own layout so the pattern centers. If the house flooded, tile that\'s still stuck down may stay, and tile that sounds hollow or sits on a wet mud bed comes up. We listen and we meter. Friendswood houses with a Clear Creek history are a place we have this conversation often.',
          },
          {
            type: 'links',
            items: [
              { href: '/tile-flooring', label: 'Tile flooring' },
              { href: '/friendswood-tx', label: 'Floors and humidity in Friendswood' },
              { href: '/bathroom-remodeling', label: 'Bathroom tile and waterproofing' },
            ],
          },
        ],
      },
      {
        heading: 'Wood',
        blocks: [
          {
            type: 'p',
            text: 'Solid pine in Garden Oaks and Montrose can often be sanded if the boards are thick enough and the crawlspace isn\'t soaking them. Cupping that comes back every August is a moisture problem, not a finish problem, so we look under the house. New solid or engineered wood in a living room needs to acclimate in that house, with the air conditioning running the way you live. Fastening it the day it arrives is how you get gaps in January or a buckle in August.',
          },
          {
            type: 'p',
            text: 'Wood on a slab is a product question. Some engineered floors are made for it, with the moisture barrier the maker expects, and some are not. A flooded slab isn\'t ready for either until it\'s dry. We won\'t cover a damp slab with wood to make a closing date. Cypress and Kingwood living rooms can take wood over a dry slab. A kitchen that sees a constant splash is usually a better tile or vinyl room, with the wood starting at the doorway.',
          },
          {
            type: 'links',
            items: [
              { href: '/wood-flooring', label: 'Wood flooring' },
              { href: '/garden-oaks-tx', label: 'Original floors in Garden Oaks' },
              { href: '/montrose-tx', label: 'Pier-and-beam floors in Montrose' },
            ],
          },
        ],
      },
      {
        heading: 'Laminate, and where it doesn\'t belong',
        blocks: [
          {
            type: 'p',
            text: 'Laminate can be a dry-room floor. It isn\'t a bath floor, and it isn\'t what you put back after flood water, because the core swells and doesn\'t return. If a previous owner clicked it into a laundry room, we\'ll tell you when it\'s time for it to leave. A small spill wiped up immediately isn\'t the same as a pad that stayed wet all weekend.',
          },
          {
            type: 'list',
            items: [
              'Dry the substrate before any new floor.',
              'Acclimate wood in the house.',
              'Level where vinyl or large tile would show the ridge.',
              'Keep laminate out of the wet rooms.',
              'Photograph a wet floor before it comes up.',
            ],
          },
        ],
      },
      {
        heading: 'After water, the floor is last',
        blocks: [
          {
            type: 'p',
            text: 'People want the new floor scheduled the day the furniture leaves. We go by the moisture meter, not by how soon you want the room finished. A slab in Meyerland that took bayou water, a crawlspace in Garden Oaks that took a supply leak, and a Kingwood ceiling that dropped attic water onto the downstairs floor are three different drying jobs. The new plank may come from the same catalog, but the wait isn\'t the same. If a claim is open, your insurer decides payment. We install when the floor is ready and you\'ve hired the work.',
          },
          {
            type: 'p',
            text: 'Call (713) 909-0034 and tell us what is down now and what room it is. We\'ve been family-owned since 1993. If you already have samples, bring them. If you\'re choosing between vinyl and tile for a whole first floor, we can say which one the slab will allow before you buy a pallet.',
          },
          {
            type: 'links',
            items: [
              { href: '/laminate-flooring', label: 'Laminate, and where it fails' },
              { href: '/kingwood-tx', label: 'Floors in Kingwood houses' },
              { href: '/water-damage-restoration', label: 'Drying the floor before the new one' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'houston-roof-replacement-guide',
    title: 'Replacing a roof on a Houston house',
    metaTitle: 'Houston Roof Replacement Guide',
    crumb: 'Roof replacement',
    lines: ['A new roof,', 'in this weather.'],
    description:
      'What a Houston roof replacement includes: decking, flashing, ventilation, hail, wind, and the questions to settle before tear-off.',
    lede: 'A roof replacement in Houston is a tear-off, a look at the wood, and a new roof that can take sun, wind, and the next hailstorm. The shingle color is the last choice, not the first.',
    image: '/images/projects/roofing/brick-home-shingles.jpg',
    service: 'roof-replacement',
    ctaTitle: 'Is the roof ready to be replaced?',
    ctaBody:
      'Call (713) 909-0034. We walk the slopes and say whether a repair will hold. We\'ve been family-owned in Houston since 1993.',
    related: ['houston-hail-storm-roof-claims', 'emergency-tarp-and-board-up-houston'],
    faqs: [
      {
        q: 'Do you replace a roof that could be repaired?',
        a: 'No. If the damage is limited and the rest of the roof still has life, we say repair. Replacement is for a roof that\'s worn or bruised across the slopes. The inspection comes before the recommendation.',
      },
      {
        q: 'What if the wood underneath is soft?',
        a: 'We replace the decking that\'s soft or rotten. Some of it is visible before tear-off, and some shows up when the shingles come off. We stop and show you rather than covering it.',
      },
      {
        q: 'Does an association pick the color?',
        a: 'In a lot of Cypress, Kingwood, and newer Tomball sections, yes. Ask before we order. A color the association will reject is a delay, not a surprise we want on delivery day.',
      },
      {
        q: 'Is the replacement the same as the insurance payment?',
        a: 'No. We are not public adjusters. The price we write is the construction. Your insurer decides what the policy pays, and you can hire the roof whether or not a claim is open.',
      },
    ],
    sections: [
      {
        heading: 'When replacement is the honest sentence',
        blocks: [
          {
            type: 'p',
            text: 'Here is how we tell a tired roof from a bruised one. Shingles crack, lose granules, and curl under the Houston sun, and the south and west slopes go first. Hail bruises the mat across a whole field. Wind lifts the edges and the ridge. One missing tab isn\'t a new roof. A roof that looks tired on every slope, or bruised on every slope, is. We get up there. Low Meyerland and Oak Forest roofs hide the bad face from the curb, and long Kingwood roofs hide a valley under the pines. We look at those, not at a driveway photo.',
          },
          {
            type: 'p',
            text: 'A repair is a few slopes, a boot, a piece of flashing, or a ridge. It\'s the right job when the rest of the roof still matches. Patching a worn-out field one square at a time costs more and leaks between the visits. We\'ll say repair when that\'s true, and we\'ll say replace when it\'s not. Age alone isn\'t the answer. A younger roof with hail across it can be done, and an old roof with one lifted shingle might not be.',
          },
        ],
      },
      {
        heading: 'What the job includes',
        blocks: [
          {
            type: 'p',
            text: 'The job is a tear-off down to the deck, then new underlayment, new field shingles, flashing at the walls and chimneys, and boots at the vents. Ridge and hip details match the system, and the drip edge goes on with them. Pipe jacks and attic vents are part of the roof, not an errand for later. If gutters are crushed from the same hail, that\'s a separate line, and we say so. Covering a bad valley with a pretty shingle is how the ceiling stain comes back.',
          },
          {
            type: 'p',
            text: 'Decking that\'s soft, delaminated, or stained through gets replaced. We can sometimes see it from the attic before tear-off, and we can always see it when the shingles are gone. That changes the price, so we show the wood before we cover it. Ventilation matters in this heat. A roof with no way for attic air to move cooks the shingles from below and bakes the rooms, so we look at the intake and the exhaust you already have.',
          },
          {
            type: 'list',
            items: [
              'Walk every slope before recommending replacement.',
              'Photograph hail or wear.',
              'Replace soft decking when it shows up.',
              'Flash the walls and the penetrations with the new roof.',
              'Confirm association color rules before the order.',
            ],
          },
        ],
      },
      {
        heading: 'Sun, wind, hail, and trees',
        blocks: [
          {
            type: 'p',
            text: 'A Houston roof lives in strong sun, sudden wind, and hail that may not come every year but comes hard when it does. Asphalt is the usual residential roof we install. The specific line is a conversation about weight, color, and what the deck can carry, not a badge, and we don\'t dress that up. Cypress, Tomball, and Spring take a lot of hail. Friendswood takes more coastal wind. The install details change with that exposure, because nails, starter, and the edge metal are where wind gets in if they\'re skipped.',
          },
          {
            type: 'p',
            text: 'Oaks in Garden Oaks and Meyerland drop limbs and leaves into valleys. Pines in Kingwood and parts of Spring do the same with needles. A new roof under those trees still needs the valleys clear, and it still needs a path for the crew that doesn\'t tear the yard apart. We plan the drop. Tight Montrose streets mean a smaller staging plan. A Tomball lot with a driveway is easier, and the roof may be larger. Both get the same flashing standard.',
          },
          {
            type: 'links',
            items: [
              { href: '/roof-replacement', label: 'Roof replacement' },
              { href: '/roofing', label: 'Roofing and repairs' },
              { href: '/cypress-tx', label: 'Hail roofs in Cypress' },
              { href: '/friendswood-tx', label: 'Wind and roofs in Friendswood' },
            ],
          },
        ],
      },
      {
        heading: 'The claim, if there\'s one',
        blocks: [
          {
            type: 'p',
            text: 'Many replacements start after hail or wind, and you can also replace a worn roof with no claim at all. Photograph the slopes before a tarp hides an opening, when that\'s safe. If insurance is involved, we work with your insurance company as your contractor and handle the claim scope with the adjuster. We can meet the adjuster on the house. We can be there to point at what we found. The estimate we write is the price to build the roof. It isn\'t the amount the policy will pay. Your insurer decides coverage, depreciation, and the deductible.',
          },
          {
            type: 'p',
            text: 'Don\'t sign a contract that says the price will be whatever insurance pays, unless you understand the scope. Ask what is included if the deck is bad, and ask what happens if the insurer pays less than the construction. We would rather have that talk on the driveway than halfway through tear-off. Call (713) 909-0034. If the roof is open tonight, say that first. A tarp isn\'t the replacement.',
          },
        ],
      },
      {
        heading: 'The day of tear-off',
        blocks: [
          {
            type: 'p',
            text: 'On tear-off day, furniture in the attic gets covered or moved, and cars leave the driveway. Tell us about plants you want protected. Roofing debris falls on them. We watch the weather. Opening a roof into a pop-up storm is how a house gets wet on purpose. If the deck is open and rain is coming, we dry the house in and cover it. Ceilings that were already stained get checked again after the new roof, because a new roof doesn\'t undo wet insulation.',
          },
          {
            type: 'p',
            text: 'Permits follow the city. Houston, Friendswood, Humble, and Tomball each have their own, and some Spring addresses are the county. We pull what the address requires. An association letter, if you need one, should be in hand before the shingles land. We\'ve been family-owned since 1993. The crew is scheduled from our office in west Houston (77082), not from a storm trailer that will be gone next month.',
          },
          {
            type: 'links',
            items: [
              { href: '/roof-replacement-cost-houston', label: 'What changes a roof replacement cost' },
              { href: '/kingwood-tx', label: 'Long roofs in Kingwood' },
              { href: '/tomball-tx', label: 'Roofs in Tomball' },
              { href: '/garden-oaks-tx', label: 'Roofs under oaks in Garden Oaks' },
            ],
          },
        ],
      },
      {
        heading: 'After the new roof',
        blocks: [
          {
            type: 'p',
            text: 'Walk the attic on the next hard rain if you can do it safely, and look at the old stain. A dry stain is history. A new drip is a call. Gutters should discharge away from the slab, especially on flat lots in Meyerland and Oak Forest. We can talk about gutters as their own item. They aren\'t automatically new because the shingles are.',
          },
          {
            type: 'p',
            text: 'Keep the invoice and the photos. If a claim is still open, those papers are for you and your insurer. We keep our scope. If something we installed is wrong, call us. If a limb falls next spring, that\'s a new event, and we look at it as a new event. The roof is a wearing surface in this climate, and it\'s also the thing that keeps the rest of the remodel dry.',
          },
        ],
      },
    ],
  },
  {
    slug: 'first-24-hours-water-damage-houston',
    title: 'The first 24 hours after water damage in Houston',
    metaTitle: 'First 24 Hours After Water Damage',
    crumb: 'First 24 hours',
    lines: ['The first day', 'after the water.'],
    description:
      'A first-day timeline after water damage in a Houston house: shutoffs, photos, drying, and when to call for help.',
    lede: 'The first day after a leak or a flood decides how much of the house you get to keep. Stop the water, keep people safe, and start drying before the humidity takes over.',
    image: '/images/projects/restoration/air-movers-drying.jpg',
    service: 'water-damage-restoration',
    emergency: true,
    ctaTitle: 'Need someone in the first day?',
    ctaBody:
      'Call (713) 909-0034 if water reached the walls or the floors. Your insurer decides coverage. We\'ve been family-owned since 1993.',
    related: [
      'houston-leaks-pipes-heater-dishwasher-toilet',
      'houston-flood-damage-repair',
      'what-to-do-after-water-damage-houston',
    ],
    faqs: [
      {
        q: 'Should I wait for the adjuster before I dry anything?',
        a: 'Don\'t wait to stop more damage. Photograph first, then dry. Policies commonly expect you to protect the property, so ask your insurer how they want notice given. A wet wall doesn\'t pause for a calendar.',
      },
      {
        q: 'Are household fans enough?',
        a: 'For a small splash on hard flooring you caught immediately, maybe. For wet drywall, insulation, carpet pad, or a slab that took on water, no. Houston humidity puts the moisture back if you only blow air around.',
      },
      {
        q: 'What do I photograph?',
        a: 'The source if you can see it, the path, and each wet room, in wide shots and close shots. Do it before you throw flooring or cabinets away.',
      },
      {
        q: 'Who pays?',
        a: 'Your insurer, if the policy covers it. We are not public adjusters. We dry and repair what you hire. A sudden pipe break and rising flood water are often different coverages, so say which one happened.',
      },
    ],
    sections: [
      {
        heading: 'The first hour',
        blocks: [
          {
            type: 'p',
            text: 'If water is near outlets, the panel, or a fallen ceiling, get people out of that room. Shut the main water valve if you can reach it from a dry floor. If the leak is one toilet or one heater and that valve still works, shut that one instead. Don\'t wade, and don\'t flip breakers while you\'re standing in water. If you smell gas, or you can\'t find the shutoff, leave and call for help.',
          },
          {
            type: 'p',
            text: 'After the main is off, open a faucet so the lines can drain. If a pipe is frozen and hasn\'t split, an open faucet gives the thaw somewhere to go. Don\'t use a torch. A hair dryer on a reachable frozen spot, kept out of the water, is enough. Most Houston frozen-pipe calls are already a burst by the time someone notices the ceiling, so treat the water you can see as the emergency.',
          },
          {
            type: 'list',
            items: [
              'People and pets out of the wet room if power is involved.',
              'Shut the supply.',
              'Don\'t use a flame on a frozen pipe.',
              'Call (713) 909-0034 if the water is in the building, not just on a tile floor.',
            ],
          },
        ],
      },
      {
        heading: 'The next few hours: pictures, then movement',
        blocks: [
          {
            type: 'p',
            text: 'Photograph the source, the ceilings, the floors, and the bottoms of the cabinets. A short note of which room is as useful as another twenty blurry shots. If you can use the photo log on this site, it keeps the rooms in order. Then move what you can save to a dry room. Lift drapes, get electronics up, and leave soaked drywall and flooring until they\'re documented if you plan to file.',
          },
          {
            type: 'p',
            text: 'Call your insurer if the loss was sudden and you want a claim. Tell them what failed: a supply line, a heater, a dishwasher, a toilet, a roof, or water that rose from outside. Those are different, and we won\'t pick a nicer name for the water. You can call us the same day to start drying. Waiting a weekend because you hope the adjuster comes first is how a wet baseboard becomes a wet wall.',
          },
          {
            type: 'links',
            items: [
              { href: '/insurance-log', label: 'Insurance photo log' },
              { href: '/emergency', label: 'Emergency help' },
              { href: '/what-to-do-after-water-damage-houston', label: 'A longer note on water damage' },
            ],
          },
        ],
      },
      {
        heading: 'By the end of the day',
        blocks: [
          {
            type: 'p',
            text: 'By the end of the day, standing water should be out, and wet carpet pad should be out if it\'s soaked. The air should be moving, and a dehumidifier should be pulling moisture out of that air if the walls or the slab got wet. Opening windows in July doesn\'t do this job, because the outdoor air is wet. Set the air conditioning to run, and close the rooms that stayed dry so you aren\'t trying to dry the whole house for one bath.',
          },
          {
            type: 'p',
            text: 'On a slab in Oak Forest, Cypress, or Friendswood, the water is in the concrete and the base of the drywall. On a pier-and-beam house in Montrose or Garden Oaks, check the crawlspace, or have us check it. A dry living room over a wet joist bay is a common miss. In a two-story Kingwood or Spring house, look up. Attic water lands in the ceiling, and the stain can keep growing for a day after the valve is shut because the insulation is still draining.',
          },
        ],
      },
      {
        heading: 'Overnight',
        blocks: [
          {
            type: 'p',
            text: 'Leave the drying equipment running overnight. Don\'t turn it off because it\'s loud, and check that dehumidifier drains are actually going into a sink or outside, not back onto the floor. If a ceiling is still dripping, the source isn\'t done. A tarp on an open roof belongs in this same night if the water came from above. Board a broken window so the next rain doesn\'t join the first leak.',
          },
          {
            type: 'p',
            text: 'Sleep somewhere dry. A wet room with open walls isn\'t a bedroom, and if the power is uncertain, don\'t spend the night guessing at the panel. Write down what you shut off, what you moved, and who you called. That note is worth more tomorrow than you think. Keep receipts for towels, plywood, and a dumpster if you already needed one.',
          },
          {
            type: 'links',
            items: [
              { href: '/water-damage-restoration', label: 'Water damage restoration' },
              { href: '/roofing-emergency-tarp-repair', label: 'If the water came through the roof' },
              { href: '/oak-forest-tx', label: 'Slab houses in Oak Forest' },
              { href: '/montrose-tx', label: 'Crawlspaces in Montrose' },
            ],
          },
        ],
      },
      {
        heading: 'The next morning',
        blocks: [
          {
            type: 'p',
            text: 'In the morning, walk the house in daylight. New stains, a soft seam in the floor, and a musty closet are the edges of the water you already know about. Pull a toe kick only if you\'re ready to see the cabinet bottom, and photograph it. Don\'t start a kitchen remodel today, and don\'t buy flooring today. Dry first. If an adjuster is coming, be there, show the photos, and show what you already removed and why.',
          },
          {
            type: 'p',
            text: 'We meter the walls and the floors and tell you what has to come out. Some drywall can dry in place, and some can\'t. Insulation that held flood water comes out. Insulation that got a cup of clean water might be a smaller cut. The difference is the visit, not a rule shouted from the sidewalk. Call (713) 909-0034 if you haven\'t already. We\'ve been family-owned in Houston since 1993.',
          },
        ],
      },
      {
        heading: 'What not to spend the first day on',
        blocks: [
          {
            type: 'p',
            text: 'Don\'t spend the first day shopping for cabinets, painting a stain, or running the air conditioner on a soaked filter and hoping. Don\'t sign a contract you haven\'t read because someone knocked and said the truck was on the street. You can hire a crew today. You should know that we work for you, and that your insurer still decides the claim. Ask what will be dried, what will be removed, and what the next step costs.',
          },
          {
            type: 'p',
            text: 'Meyerland floods, Kingwood attics, and a Tomball supply line all deserve the same first day: safety, a shutoff, photos, and drying. The rebuild is day two or week two. The blog can wait. The wet wall can\'t. If you want the longer checklist after the emergency is stable, the water-damage guide on this site sits next to this one on purpose.',
          },
          {
            type: 'links',
            items: [
              { href: '/humble-tx', label: 'Water in Humble houses' },
              { href: '/kingwood-tx', label: 'Attic water in Kingwood' },
              { href: '/meyerland-tx', label: 'Outside water in Meyerland' },
              { href: '/insurance-claims', label: 'What we document on a claim' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'remodeling-a-houston-ranch-house',
    title: 'Remodeling a Houston ranch house',
    metaTitle: 'Remodeling a Houston Ranch House',
    crumb: 'Ranch remodels',
    lines: ['The ranch,', 'one room at a time.'],
    description:
      'How to remodel a one-story Houston ranch: closed kitchens, hall baths, slab drains, low roofs, and floors that show every ridge.',
    lede: 'Houston’s one-story brick ranches are a specific kind of remodel. The rooms are honest, the slab is in the way of the plumbing, and the roof sits lower than it looks in a photo.',
    image: '/images/projects/kitchens/range-hood-cooking-wall.jpg',
    service: 'kitchen-remodeling',
    ctaTitle: 'Have a ranch to walk through?',
    ctaBody:
      'Call (713) 909-0034 to schedule an estimate. We measure the kitchen, the bath, and the roof you actually have. We\'ve been family-owned in Houston since 1993.',
    related: ['houston-kitchen-remodel-ideas', 'houston-bathroom-remodel-guide', 'houston-flooring-for-humidity'],
    faqs: [
      {
        q: 'Can you open the kitchen without adding a second story?',
        a: 'Sometimes. The wall between the kitchen and the living room may be holding the roof on a low ranch, so we look. A kitchen that stays closed can still be a full remodel of cabinets, light, and the floor.',
      },
      {
        q: 'Are these houses all slabs?',
        a: 'Meyerland and Oak Forest ranches usually are. Some older Humble and Tomball houses mix a slab with an addition, or they sit on piers. We confirm this house. On a slab, a moved sink means concrete. If there\'s a crawlspace, we look underneath.',
      },
      {
        q: 'Should the roof be done with the kitchen?',
        a: 'If the roof is worn, or it leaked into the ceiling you\'re about to open, talk about it in the same visit. They\'re different trades and different prices. Doing the roof after the new ceiling is painted is the wrong order.',
      },
      {
        q: 'What if a storm or a leak started the project?',
        a: 'Dry and document first. We are not public adjusters. Your insurer decides any claim. The remodel of the rooms you simply want to change is separate from the repair of what got wet.',
      },
    ],
    sections: [
      {
        heading: 'What these houses actually are',
        blocks: [
          {
            type: 'p',
            text: 'Picture a one-story brick house, a low roof, a carport or a later garage, and a floor plan that puts the kitchen at the back. That\'s Meyerland, and it\'s also a lot of Oak Forest. Pieces of older Humble and the original streets of Tomball rhyme with it, even when the year and the foundation shift. The rooms were built for a family that didn\'t cook in front of the television. The remodel is usually an attempt to let those rooms see each other without pretending the house is a new two-story.',
          },
          {
            type: 'p',
            text: 'Ceilings aren\'t tall. A cabinet that looked perfect in a showroom with ten-foot walls will crowd an eight-foot ranch, and light fixtures need room to hang. A range hood needs a duct path that doesn\'t eat the only attic space above the cooktop. We measure the ceiling and the attic before we draw a tall cabinet run. The brick on the outside stays. The remodel is mostly an interior job, unless the roof or a window is part of the leak that started the call.',
          },
        ],
      },
      {
        heading: 'Kitchens',
        blocks: [
          {
            type: 'p',
            text: 'The closed kitchen is the project people call about. Opening it means knowing whether that wall is only a partition or part of the roof structure. On a low ranch, the ceiling joists and the rafters are right there, so we look in the attic. If the wall can open, we talk about the beam and the posts it needs. If it can\'t, we spend the money on cabinets, a window, light, and a floor that makes the closed room good. Both are finished kitchens. Only one of them is an open plan.',
          },
          {
            type: 'p',
            text: 'Sinks stay put more often than people expect, because the drain is in the slab. A new island that needs a sink is a cut. A new island that\'s only a table and a power outlet is simpler. Dishwashers that leaked have often swollen the cabinet next to the sink, and that box isn\'t a candidate for new doors. Replace it, dry the floor, and then match the rest. Call (713) 909-0034 if you want that walk-through before you demo on a Saturday.',
          },
          {
            type: 'links',
            items: [
              { href: '/kitchen-remodeling', label: 'Kitchen remodeling' },
              { href: '/meyerland-tx', label: 'Meyerland ranches' },
              { href: '/oak-forest-tx', label: 'Oak Forest ranches' },
            ],
          },
        ],
      },
      {
        heading: 'Hall baths',
        blocks: [
          {
            type: 'p',
            text: 'The hall bath is the other phone call: a tub, a small vanity, and a fan that wheezes into the attic. Turning the tub into a shower is possible when the drain and the curb fit, and waterproofing is the work. The tile is the part your guests notice. A window over the tub has to stay waterproof when the surround changes, so we don\'t bury the window in tile and hope. If this is the only bath, we plan the days without a shower so you aren\'t surprised.',
          },
          {
            type: 'p',
            text: 'Primary baths in these ranches are larger, but not as big as a newer Kingwood primary bath, and a double vanity may not fit. One good vanity, a real light, and a shower that doesn\'t leak will change the morning more than a crowded second sink. Floor tile runs out to the bedroom only if the heights work. A transition that sticks up is a toe-stubber for the life of the floor.',
          },
          {
            type: 'links',
            items: [
              { href: '/bathroom-remodeling', label: 'Bathroom remodeling' },
              { href: '/humble-tx', label: 'Older baths in Humble' },
              { href: '/tomball-tx', label: 'Older houses in Tomball' },
            ],
          },
        ],
      },
      {
        heading: 'Floors and the slab',
        blocks: [
          {
            type: 'p',
            text: 'Carpet hid a lot of these slabs. Vinyl plank and tile will not. We check how flat the floor is, because clay movement and an old pour leave ridges. Leveling is ordinary work, not a sales pitch. Wood is possible in the living room when the slab is dry and the product belongs there, and it acclimates in the house. After a flood, and Meyerland has streets where that matters, nothing new goes down until the concrete is dry.',
          },
          {
            type: 'p',
            text: 'Bedrooms can stay carpet if you want them quiet. Kitchens and baths should not. One floor through the main rooms makes a small ranch feel longer, and that\'s a design choice we can price. It isn\'t required. Door swings and closet thresholds are where a whole-house floor gets expensive or sloppy, so we count them.',
          },
          {
            type: 'list',
            items: [
              'Meter a slab that has been wet before any new floor.',
              'Level where the new floor would show the ridge.',
              'Keep the drains that don\'t need to move.',
              'Match transitions so doors still clear.',
            ],
          },
        ],
      },
      {
        heading: 'The low roof over all of it',
        blocks: [
          {
            type: 'p',
            text: 'Ranch roofs are broad and low. Hail sits on them, and leaves sit in the valleys. A kitchen skylight someone added years ago is often the leak. If we\'re opening ceilings for a remodel, we want the roof honest first, because replacing drywall under a dripping vent is a loop. We\'ll walk the roof on the same visit as the kitchen if you ask. Repair when a repair will hold, and replace when the slopes are done. A tarp is only for an opening.',
          },
          {
            type: 'p',
            text: 'Gutters on a low ranch dump next to the slab if the extensions are missing. That water isn\'t a dramatic flood. It\'s a wet flower bed against the brick and, sometimes, a damp floor at the back door. Point the downspouts out. It\'s a small job that protects the floor you\'re about to pay for. Associations are uncommon on the older ranch streets and common if the ranch sits in a later section. We ask.',
          },
          {
            type: 'links',
            items: [
              { href: '/roofing', label: 'Roofing' },
              { href: '/roof-replacement', label: 'Roof replacement' },
              { href: '/vinyl-flooring', label: 'Vinyl plank on ranch slabs' },
              { href: '/tile-flooring', label: 'Tile on ranch slabs' },
            ],
          },
        ],
      },
      {
        heading: 'One project or three',
        blocks: [
          {
            type: 'p',
            text: 'You don\'t have to remodel the kitchen, the bath, and the roof in one contract, but you do have to pick an order. Water and an open roof go first, then the room you use most, then the floor that ties the hall together. Doing all three with one crew keeps the dust in one season instead of three. Doing one of them well is better than starting all three and stalling when the cabinets are late.',
          },
          {
            type: 'p',
            text: 'If a storm or a burst pipe is why the walls are open, document that damage before the new layout covers the evidence. Your insurer decides the claim. The beam in the former kitchen wall, if you want it, is a remodel. We can write them as separate scopes so you can see which dollars are which. We\'ve been family-owned in Houston since 1993. Visits are scheduled from our office in west Houston (77082), and the ranch is wherever you send us.',
          },
        ],
      },
    ],
  },
  {
    slug: 'patio-cover-gazebo-cypress-bridgeland',
    title: 'Choosing a patio cover, pergola, or gazebo in Cypress and Bridgeland',
    metaTitle: 'Patio Cover or Gazebo, Cypress',
    crumb: 'Patio covers',
    lines: ['A roof for the yard,', 'not a catalog tent.'],
    description:
      'How to choose a patio cover, pergola, or gazebo in Cypress and Bridgeland: sun, storms, drainage, materials, and HOA review.',
    lede: 'A Cypress or Bridgeland yard can be too hot to use from May through September, and a summer storm can still dump rain on the same table an hour later. A patio cover, a pergola, and a gazebo are three different structures. The right one depends on whether you need dry shade against the house, broken sun in the yard, or a freestanding roof of your own.',
    image: '/images/projects/siding/rear-deck-glass-doors.jpg',
    service: 'patios-decks',
    ctaTitle: 'Not sure which roof the yard wants?',
    ctaBody:
      'Call (713) 909-0034 to schedule an estimate. We look at the wall, the yard, and where the water goes before we talk about a roof. Family-owned, serving Houston since 1993.',
    related: [
      'deck-material-for-houston-humidity',
      'gutter-size-for-houston-rain',
      'best-fence-for-houston-weather',
    ],
    faqs: [
      {
        q: 'Is a pergola the same as a patio cover?',
        a: 'No. A pergola is an open frame. The slats break up the sun, and rain still comes through. A patio cover is a solid roof, usually tied to the house, so a storm stays off the table. A gazebo is freestanding, on its own footings, out in the yard. We build each one, and we keep the names straight.',
      },
      {
        q: 'Should the frame be cedar, treated pine, or aluminum?',
        a: 'Cedar grays in west sun unless someone keeps a finish on it. Treated pine is the practical frame, and the posts still have to stay out of soil that stays wet. Aluminum does not rot, and it still needs footings and a wall detail that sends water off the siding. The span, the sun, and the upkeep you will actually do decide it.',
      },
      {
        q: 'Does an HOA in Bridgeland or Cypress have to approve it?',
        a: 'Often, yes. Planned sections review a cover, a gazebo, or a pergola, and sometimes the color. That review is not the building permit. Cypress is not one permit counter. The address picks the desk, and Bridgeland is not an exception to that. We ask before we order. We do not start work a review has to approve.',
      },
      {
        q: 'Can you add a fan or a light?',
        a: 'Yes, when they are planned with the roof. The wiring goes into the beams before the ceiling is closed, and the frame has to carry the fan. A cord added later means opening finished work. Tell us on the first visit if you want a fan, a light, or both.',
      },
    ],
    sections: [
      {
        heading: 'Three structures, and the yards they have to fit',
        blocks: [
          {
            type: 'p',
            text: 'A patio cover is the roof attached to the back of the house. It shades the door you already use, and it has to be flashed where it meets the wall so rain does not run behind the siding. In the newer two-story houses along US 290, and through Bridgeland, that door often opens from the family room onto a concrete pad the builder left in the afternoon sun.',
          },
          {
            type: 'p',
            text: 'A pergola is carpentry without a solid roof. Rafters or slats break the sun and leave the rain, which can be the right choice over a grill or along a walk when you want the breeze. It is still a structure in the wind. The posts in clay, and the connection at the house if the pergola is attached, are the work. The slats are the last layer.',
          },
          {
            type: 'p',
            text: 'A gazebo stands on its own footings, away from the wall, with a small roof that sheds water. People ask for one when the shade they want is out in the yard rather than against the brick. It is not a patio cover, and it is not a deck. If the old one moves when you push a post, the next one has to be anchored for a Gulf gust.',
          },
        ],
      },
      {
        heading: 'Heat, summer storms, and the wind',
        blocks: [
          {
            type: 'p',
            text: 'The afternoon sun in Cypress and Bridgeland is why the furniture stays inside from May into September. A solid cover changes that. An open pergola cuts some of the glare, and rain still reaches the table. A fan under a solid cover moves air that would otherwise sit there in August.',
          },
          {
            type: 'p',
            text: 'Hurricane season runs June 1 through November 30, and the summer storms around that season are enough to test a light roof. A solid cover and a screened gazebo both catch wind. Screens help with mosquitoes near a lake or a detention pond, and they also turn the openings into a sail, so we say that before we build them. We do not promise any yard roof will ignore a major hurricane. We build the posts, the connections, and the roof so they are the part that holds.',
          },
          {
            type: 'p',
            text: 'Spring hail can mark a small shingle roof the same way it marks the house. We walk both when both need a look, and we keep the estimates separate.',
          },
        ],
      },
      {
        heading: 'Cedar, treated pine, and aluminum',
        blocks: [
          {
            type: 'p',
            text: 'Cedar is the finish wood many associations like to see, and full west sun will check it and gray it unless it is cleaned and refinished. On the north side of a two-story house it stays damp longer and still wants that upkeep. We use cedar where the look and the span make sense.',
          },
          {
            type: 'p',
            text: 'Treated pine is the framing we use when the budget is the structure, not the grain. It rots if a post stands in wet clay or if a sprinkler hits the bottom every morning. Cut ends and the bottoms of the posts stay out of constant soil contact. A stain is a maintenance plan. It is not what holds the roof up.',
          },
          {
            type: 'p',
            text: 'Aluminum does not rot, which is why a lot of covers in these subdivisions are metal. We install aluminum covers when the span and the look work, and when the association allows it. The metal still needs footings, and an attached cover still needs a detail at the wall so water leaves the siding. A hard rain on a low aluminum roof is loud. If that matters under a bedroom window, say so before we order.',
          },
          {
            type: 'links',
            items: [
              { href: '/patios-decks', label: 'Patios and decks' },
              { href: '/patios', label: 'Patios' },
              { href: '/decks', label: 'Decks' },
              { href: '/gazebos', label: 'Gazebos' },
              { href: '/carpentry', label: 'Carpentry' },
              { href: '/deck-material-for-houston-humidity', label: 'Deck material for Houston humidity' },
              { href: '/carpentry-for-houston-humidity', label: 'Carpentry in Houston humidity' },
            ],
          },
        ],
      },
      {
        heading: 'Attached or freestanding, and where the rain goes',
        blocks: [
          {
            type: 'p',
            text: 'An attached cover ties into the house, and that connection is where these jobs leak. The flashing has to send water onto the cover and then off it, not behind the brick or the siding. The posts land on footings, not on a surface block set on the pad because it was faster. Houston clay holds water after a hard rain and shrinks in a dry month. A footing detail from a dry climate is not the detail for this ground.',
          },
          {
            type: 'p',
            text: 'A freestanding gazebo or a freestanding pergola does not open the wall, and it still needs those footings. Setting posts on a cracked patio that ponds will twist the frame in the first real storm. If the pad is sound and it drains, it can stay. If it slopes toward the slab, a new roof over it will not fix the pitch. We check the fall. An inch toward the house is enough for rain to sit at the door.',
          },
          {
            type: 'p',
            text: 'The new roof collects a Houston downpour of its own. Water off the cover has to miss the brick, the door, and the low spot by the fence. Downspouts already on the house have a path. A cover that blocks them, or a patio that dams them, holds that water against the foundation. We plan that path before we set a post. If a side gate is too narrow for the material, say so when you call.',
          },
        ],
      },
      {
        heading: 'The association, a fan, and a storm',
        blocks: [
          {
            type: 'p',
            text: 'Bridgeland is a planned community, and many newer Cypress sections work the same way. The association often wants to see a cover, a gazebo, or a pergola, and sometimes the color, before any of it exists. That approval is not a City of Houston permit, and it is not a Harris County permit. The address picks the counter. We do not set posts while a review is still open.',
          },
          {
            type: 'p',
            text: 'A fan or a light is electrical work, planned with the beams. The wiring goes in before the roof is closed, and the frame has to carry the fan. Adding either one after the ceiling is finished means opening work you just paid for. Tell us whether you want a fan, a light, or both.',
          },
          {
            type: 'p',
            text: 'If a storm has already taken the old cover or gazebo down, photograph the posts, the wall, and what is left of the roof before anyone hauls it off, and call (713) 909-0034. Elite works with your insurance company as your contractor, documents the damage, and negotiates the claim scope with the adjuster. We are not public adjusters. Your insurer decides coverage and the amount. Rot that was already in the posts stays rot, even if wind passed through the same week. We have been family-owned, serving Houston since 1993. Visits are scheduled from our office in west Houston (77082).',
          },
          {
            type: 'links',
            items: [
              { href: '/cypress-tx', label: 'Yards and houses in Cypress' },
              { href: '/bridgeland-tx', label: 'Bridgeland' },
              { href: '/towne-lake-tx', label: 'Towne Lake' },
              { href: '/gutters', label: 'Gutters' },
              { href: '/fence-installation-repair', label: 'Fence installation and repair' },
              { href: '/gutter-size-for-houston-rain', label: 'Gutter size for Houston rain' },
              { href: '/best-fence-for-houston-weather', label: 'A fence for Houston weather' },
              { href: '/contact', label: 'Contact' },
            ],
          },
        ],
      },
    ],
  },
];
