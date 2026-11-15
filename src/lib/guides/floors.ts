import type { ServiceGuide } from '@/lib/guides/types';

const steps = (
  items: readonly [string, string][],
): ServiceGuide['process'] => items.map(([title, body]) => ({ title, body }));

export const woodFlooring: ServiceGuide = {
  process: steps([
    ['Inspect the floor', 'We see whether the boards can be sanded, whether the base under the finished floor is flat, and whether a slab or a crawl space is feeding moisture. Refinishing and replacing are different projects.'],
    ['Choose species and finish', 'Solid and engineered, width, stain, and the sheen are decided for the room and the light. The finish is what you live with. The base is what keeps it flat.'],
    ['Let it settle', 'Wood sits in the house before it is fastened. Houston humidity is why. Boards from a warehouse curl once they settle.'],
    ['Prep the base', 'High spots, a loose base, and a slab that is too damp for the product are fixed before the first plank. A pad will not dry a wet slab.'],
    ['Install or sand', 'New planks are fastened the way the product requires. A refinish is sanding with dust control, then stain and sealer, including stairs in the same stretch of floor.'],
    ['Cure and walk', 'The finish needs its full cure time before rugs and heavy furniture. We walk the floor with you and point out the transitions at doors and hearths.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs a wood floor needs work.',
      paragraphs: [
        'Refinish when the finish is gone and the boards are still thick enough to sand. Replace when the boards curled from a leak, wore through at the knots, or were patched with so many species that a stain will not unify them. A squeak can be a loose base. A soft spot is often moisture, and sanding it will not fix the wood underneath.',
        'After a water loss, wood that dried with curled edges or a stain at the edges may not be a candidate to save. We look before we promise a sanding. A planned refinish of a sound floor is construction. A floor being replaced because a supply line wet it is documented with that loss.',
      ],
      points: [
        { title: 'Enough wood left', body: 'Sanding removes wood. If earlier sanding reached the joint, replacement is the honest answer. We check the edge.' },
        { title: 'Curled and humped boards', body: 'A board that curled up after a leak or a wet slab may not sand flat. The moisture source has to be gone before new wood goes down.' },
        { title: 'Stairs in the same stretch', body: 'A new floor that stops at a tired stair looks unfinished. Treads and landings are included when they are part of the view.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Solid, engineered, and the finish on top.',
      paragraphs: [
        'Solid hardwood can be sanded more than once over a lifetime, and it moves more with Houston humidity. Engineered wood is more stable and is often the better choice on a slab or in a wider plank. Either one is acclimated in the house. The stain and the finish are chosen for the light and for the traffic. A soft oil look and a tougher film finish are different maintenance. We say which you are buying.',
        'Width and species change the room more than people expect. A wide plank in a bright Memorial room reads differently from a narrow strip in a bungalow. Matching a repair to an existing floor works when the species and the wear can be blended. If the whole room is tired, a patch looks like a patch. Refinishing the room is usually the cleaner result.',
      ],
      points: [
        { title: 'Slab or crawl space', body: 'Engineered wood over a dry, flat slab is a common Houston install. Solid wood nailed to the base is the usual pier-and-beam path. We match the product to the house.' },
        { title: 'Dust control', body: 'Refinishing uses sanding equipment tied to dust extraction so the rest of the house stays cleaner. Cleaner is not the same as a room you can use during the sanding.' },
        { title: 'Transitions', body: 'The trim at tile, the thresholds at exterior doors, and the stair edges are part of the floor. They are chosen with the plank, not from a leftover bin.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'Refinish, repair, or a new floor.',
      paragraphs: [
        'As a planning range, not a quote, refinishing a sound floor often falls around $3 to $6 a square foot. Installing hardwood or engineered often plans around $8 to $16 a square foot before base repairs. A single living room might land around $2,500 to $7,000. A larger first floor often plans around $8,000 to $20,000 or more once stairs, transitions, and leveling are real. A wet slab or a soft base is extra. The floor will not stay flat without that repair.',
        'The species and the finish move the number inside those bands. So does furniture moving, which we will describe rather than assume. A repair of a few boards is cheaper than a room only when matching material exists and the rest of the floor can live with the patch.',
      ],
      points: [
        { title: 'Leveling', body: 'Dips in the wood under the floor, or a slab that is not flat, are prep. Wide planks and long stretches show every dip. Prep is part of the price.' },
        { title: 'Stairs', body: 'Stair treads take more labor than the open floor. A quote that ignores the stair will not match the house.' },
        { title: 'Moisture first', body: 'A damp slab or a wet crawl space is dried before wood goes down. Covering moisture to hold a price is a bad trade.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Humidity, slabs, and pier-and-beam houses.',
      paragraphs: [
        'Wood and Gulf humidity are a managed relationship. The house is air-conditioned, the outdoors is wet, and the floor lives between those. Letting the wood adjust, choosing the right product for a slab, and using a finish that can handle the traffic are how it works. Seasonal gaps can still show. We install the floor so those gaps stay small. A wet or closed-off crawl space under a Heights bungalow will curl a floor from below. We look down there when that is the structure.',
        'Clay soil moves slabs with the seasons. A nailed floor on the wood layer over pier and beam moves differently from a floor glued or floated on concrete. After a plumbing leak, water on a slab runs under the flooring farther than the stain. We find the wet edge before we order plank. Bathrooms and other wet rooms usually get tile.',
      ],
      points: [
        { title: 'After a leak', body: 'Dry the structure first. New wood on a damp slab repeats the cup. Photos of a water loss are separate from a planned refinish. Your insurer decides coverage.' },
        { title: 'Sun on the finish', body: 'South and west rooms fade a stain. We talk about that when the floor runs to a wall of glass, which is common in newer Houston plans.' },
        { title: 'Rugs and cure', body: 'The finish needs time before rugs go down. We say how long for the product we used. Covering it early marks the floor.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Should I refinish or replace?',
      a: 'If the boards are sound and thick enough, refinishing renews them with less demolition. If they are curled, worn through, or too thin, replacement is the honest answer. We inspect and say which.',
    },
    {
      q: 'What is a planning range for wood floors?',
      a: 'Refinishing a sound floor often falls around $3 to $6 a square foot. New hardwood or engineered often plans around $8 to $16 a square foot before repairs under the floor. Those are planning ranges, not a quote.',
    },
    {
      q: 'Can hardwood go on a Houston slab?',
      a: 'Engineered wood often can, if the slab is flat and dry enough for the product. Solid nailed hardwood wants a wood layer underneath. We will not glue the wrong product to a damp slab.',
    },
    {
      q: 'Will dustless sanding leave the rest of the house usable?',
      a: 'The sander is connected to dust extraction, which captures most of the dust as it is made, so the rest of the house stays cleaner. The room being sanded is still a work zone until the finish has cured.',
    },
  ],
};

export const tileFlooring: ServiceGuide = {
  process: steps([
    ['Check flatness', 'Large tile shows every ridge. We measure the floor before we talk about the pattern. A wavy slab is a prep job first.'],
    ['Plan the layout', 'The main area is centered on the doorway or the room so cuts do not pile up in the view. Patterned tile gets the same attention on paper, before the mortar.'],
    ['Prep and membranes', 'Leveling, a sheet over slab cracks, and waterproofing in a wet room happen before finish tile. Gaps that let the slab move are part of that plan.'],
    ['Set the tile', 'Tile is set with the trowel and the joint the product requires. Large tile needs a flatter floor than small tile. Extra mortar is not how we hide a dip.'],
    ['Grout and seal', 'Grout is chosen for the room. A kitchen and a bath are wiped differently from a formal entry. Sealer goes on when the material needs it.'],
    ['Walk the transitions', 'We check high edges, the door clearance, and the change to wood or carpet. Those edges are the part you feel every day.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the tile floor is due.',
      paragraphs: [
        'Hollow tile, cracked grout that keeps returning, a raised edge you trip on, or a pattern that was never centered are reasons to redo a floor rather than regrout it. A new kitchen or bath that is already open is the other common start. Tile over a sound, flat floor is sometimes possible. Tile over a bouncy wood floor or a broken slab is how the new floor cracks in the same places.',
        'In Houston, grout cracks that follow a long line across a slab are often the house moving on clay. Regrouting that line every year does not fix the movement. The layers under the tile have to allow for it.',
      ],
      points: [
        { title: 'Hollow and loose', body: 'Tile that sounds hollow is not stuck down. More grout will not glue it. The loose area comes up.' },
        { title: 'High edges', body: 'Large tile with a high edge is a trip hazard and a shadow line. It usually means the floor was not flat enough when it was set.' },
        { title: 'Wet rooms', body: 'A bath or a mudroom that was tiled without a waterproof layer is a different repair from a dry living-room floor. We look for the water path.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Porcelain, stone, and the joints between them.',
      paragraphs: [
        'Porcelain is the usual Houston floor because it handles traffic and moisture at the surface. Stone-look porcelain and natural stone need different care. Patterned and encaustic-style tile need a layout that centers the repeat. Large tile, anything with a side longer than about 15 inches, wants the floor flat to roughly 1/8 inch in 10 feet, and tighter over a short straightedge. That is the usual setting standard, and it is why prep takes longer than the tile install looks.',
        'Grout width is part of the look and part of the fit. A hairline joint on a floor that is not flat will leave a high edge. Gaps at the room edges, and where the floor changes level, give a slab room to move somewhere other than through a tile. In showers and baths the waterproofing is under the finish. The tile is not the waterproof layer.',
      ],
      points: [
        { title: 'Cracks in the slab', body: 'Where a slab has cracked or is likely to move, a layer under the tile keeps that crack from printing straight through the new grout.' },
        { title: 'Slip and sheen', body: 'A polished floor that looks right in a photo can be slick at a Houston entry in the rain. We talk about the surface you will walk on wet.' },
        { title: 'Thresholds', body: 'Tile thickness changes the height at the door. We plan that before the mortar, so the exterior door and the dishwasher still clear.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'Prep, pattern, and the price.',
      paragraphs: [
        'As a planning range, not a quote, many Houston tile floors install around $8 to $18 a square foot once the slab is flat enough, more for intricate pattern, natural stone, or heavy leveling. A bathroom floor inside a remodel is often a few thousand dollars. A main living area is the square-foot number times a real room, plus prep. Leveling a badly waved slab can cost as much as the tile. We would rather say that on the visit than discover it as a change order.',
        'Regrouting a sound floor is cheaper and only makes sense when the tile is bonded. Commercial floors and residential floors use the same idea and different wear. We price the floor we are standing on.',
      ],
      points: [
        { title: 'Flatness is the cost', body: 'Small tile forgives more. Large format does not. The prep to get a slab flat is often the expensive part, and it is the part that makes the floor look intentional.' },
        { title: 'Pattern', body: 'A grid is faster than a geometric or encaustic layout. The material can also cost more. Both show up in the estimate.' },
        { title: 'Waterproofing', body: 'A shower or a bath floor includes the waterproof layer. A living room usually does not. Those are two different floors, and the prices say so.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Clay soils, slabs, and wet entries.',
      paragraphs: [
        'Most newer Houston houses sit on clay that swells and shrinks. The slab moves a little between wet springs and dry summers. Tile is rigid, so the floor needs a flat base, a layer over cracks, and joints that can move. Pier-and-beam houses move differently. The wood under the tile has to be stiff, or the grout cracks over the floor beams. We say which structure we are on before we recommend tile in that room.',
        'Entries, kitchens, and baths are where Houston tile earns its place. Rain comes in on shoes. Kitchens get spills. Baths get a wet floor outside the shower. A living room that runs to a sunny south wall wants a tile that will not feel like a mistake in August, which is a comfort conversation as much as a design one. We will not promise outdoor tile ratings for an indoor product, or the reverse.',
      ],
      points: [
        { title: 'After water damage', body: 'Tile does not go down until the slab or the wood under the floor is dry. Covering a wet floor traps the moisture. If the loss is an insurance claim, we photograph it. Your insurer decides coverage.' },
        { title: 'Older floors', body: 'A 1940s bath may have several layers. Each layer adds height. We see what the door and the toilet ring can tolerate before we stack another one.' },
        { title: 'Permit', body: 'Tile itself is usually a finish. The plumbing under a shower floor is what usually brings a permit. We keep those two jobs separate.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Can you tile over my existing floor?',
      a: 'Sometimes, if it is sound, flat, and not so high that doors and transitions fail. A hollow tile floor, or a soft layer under it, comes out. We check before we recommend a cover-up.',
    },
    {
      q: 'What is a planning range for tile floors?',
      a: 'Many installs fall around $8 to $18 a square foot once the floor is flat enough, more for heavy leveling, stone, or a complex pattern. That is a planning range, not a quote.',
    },
    {
      q: 'Why does large tile need a flatter floor?',
      a: 'A big piece spans the dips less. Usual setting practice for tile with a side longer than about 15 inches asks for a floor flat to about 1/8 inch in 10 feet. Prep is how you get there.',
    },
    {
      q: 'Will Houston clay crack the grout again?',
      a: 'It can, if the floor is rigid over a moving slab and there is nowhere for movement to go. Membranes and movement joints are how we plan for that. They are not a promise the house will stop moving.',
    },
  ],
};

export const vinylFlooring: ServiceGuide = {
  process: steps([
    ['See the base', 'We check the base under the floor for flatness, moisture, and what is down now. A wavy slab will show through vinyl. A soft spot will too.'],
    ['Match the product to the room', 'Plank, tile, or sheet, and a click, glue, or floating install, follow the floor underneath and the room. A kitchen and a bath are not automatic yeses for every product.'],
    ['Level where it needs it', 'High ridges and low puddle spots are corrected before plank. A pad does not erase a bad slab.'],
    ['Lay it out', 'Material sits in the room as the product requires. The layout keeps joints from stacking, and doorways get a full piece where they can.'],
    ['Install', 'The method we agreed on is the method we install. Transitions at tile and at exterior doors are part of that day.'],
    ['Walk it', 'We check edges, the toilet clearance if a bath is involved, and any spots where the slab still shows through. You should feel a floor, not a wave.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs vinyl is the right upgrade.',
      paragraphs: [
        'Vinyl is the usual choice when you want the look of wood or stone in a kitchen, a playroom, or a first floor that sees kids, dogs, and tracked-in rain, and you do not want a sanded hardwood. It is also the choice when a tired sheet floor or an old peel-and-stick layer is done. It is the wrong choice when someone is selling a “waterproof” plank as a fix for a wet slab or an active leak. The surface can be waterproof and the floor can still fail if the base is wet.',
        'Replace a section when the product matches and the damage is local. Replace the room when the wear is even, or the click system is broken across the main floor. A shower is still tile. We will say so.',
      ],
      points: [
        { title: 'Show-through', body: 'Seams, grout lines, and slab ridges show through vinyl. If you can see the old floor, the new one will not hide it without prep.' },
        { title: 'Edges lifting', body: 'A floating floor that lifts at the door is often moisture, missing room to expand, or a slab that was not flat. We find which.' },
        { title: 'A full kitchen look', body: 'Plank that runs through the kitchen and the living room is a common Houston update. The transitions at the doors are designed, not improvised.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Plank, sheet, and the install method.',
      paragraphs: [
        'Luxury vinyl plank is the product most people mean. Sheet vinyl still makes sense in a laundry or a small bath where you want fewer joints. Vinyl tile is its own layout. Snap-together planks float. Glue-down locks to the slab and is often steadier in a Houston kitchen. The instructions and the floor underneath pick the method. We float a plank the maker wants floated, and we glue a plank the maker wants glued.',
        'The tough top and the printed image are what you see in five years. A thicker top handles a busier room. The print is the look of oak or stone. The pad is chosen for that product. A second pad under a plank that already has one can keep the floor from sitting right, so we follow the product instead of adding layers for comfort.',
      ],
      points: [
        { title: 'Waterproof is the surface', body: 'A waterproof plank does not dry a wet slab and does not make a shower. Seams and the edges still see water. We install it as a floor. It is not a waterproofing layer.' },
        { title: 'Glue-down on slabs', body: 'On many Houston slabs, glue-down is the steadier kitchen floor. We explain that before the material is ordered.' },
        { title: 'Matching a repair', body: 'Dye lots change. A repair matches when the product is still available. If it is not, a full room looks more intentional than a near miss.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'What a vinyl floor costs to plan.',
      paragraphs: [
        'As a planning range, not a quote, mid-grade luxury vinyl installed in a Houston house often falls around $5 to $12 a square foot. A kitchen or a living room of a few hundred square feet often plans around $2,000 to $6,000 before major slab leveling. Leveling, furniture, and a glue-down install instead of a click floor move the number. A whole first floor is the same math on more area, not a different kind of product.',
        'The cheapest plank on a wavy slab is the expensive floor, because it will show every ridge and may need to come up. We price prep honestly. Sheet vinyl in a small room is often less material and still needs a smooth base. Seams collect dirt if the floor under them moves.',
      ],
      points: [
        { title: 'Leveling', body: 'A thin patch is ordinary. A slab with deep waves is a leveling project. We measure before we call it a simple overlay.' },
        { title: 'Removal', body: 'Old tile, glued carpet, or several layers of sheet take time and change the height at the doors. Removal is part of the job when it is needed.' },
        { title: 'Wet rooms', body: 'The toilet ring, the tub apron, and the shower curb are details. None of them is a reason to run plank into a shower.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Slabs, humidity, and rainy entries.',
      paragraphs: [
        'Most of the vinyl we install in Katy, Pearland, Spring Branch, and newer subdivisions is going over a slab. The slab needs to be dry enough for the adhesive or for the floating floor the product allows. Moisture moving up through concrete is ordinary on Gulf Coast slabs. A pretty plank will still lift or curl at the joints if that moisture is ignored. We check before we install. A claim printed on the box is not a moisture test.',
        'Rain comes in on shoes nine months of the year. A vinyl floor at an entry is a practical answer. It is not outdoor flooring, and it is not a fix for water standing against the slab from bad drainage. If the floor is being replaced after a leak, the slab is dry first. That loss can be documented. Your insurer decides what is paid. A planned flooring upgrade is not a claim.',
      ],
      points: [
        { title: 'Humidity in the house', body: 'Vinyl is more stable than hardwood, and it still wants the rooms at a normal indoor condition when it is installed. We install it in a closed house, not one open to the weather.' },
        { title: 'Sun', body: 'A south window can fade a print and heat a dark floor. We mention that when the room is mostly glass. The print can still fade over time.' },
        { title: 'Pier and beam', body: 'Over a wood floor the layer underneath still has to be flat and dry. A bouncy or curled layer is repaired. Vinyl will not stiffen it.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Is luxury vinyl a good kitchen floor in Houston?',
      a: 'Often, yes. It is a common upgrade where you want a wood look and a floor that handles daily traffic and tracked-in rain. A shower is still tile. A wet slab is still a moisture problem.',
    },
    {
      q: 'What is a planning range for vinyl?',
      a: 'Mid-grade plank installed often falls around $5 to $12 a square foot. A typical kitchen or living room often plans around $2,000 to $6,000 before major leveling. Those are planning ranges, not a quote.',
    },
    {
      q: 'Click-lock or glue-down?',
      a: 'Whichever the product and the base require. Glue-down is often steadier on a Houston slab. We decide that before the material is ordered, not on install morning.',
    },
    {
      q: 'Can vinyl go over a damp slab?',
      a: 'No. A waterproof surface is not a wet-slab solution. We check moisture and flatness first. If the slab is wet from a leak, it is dried before any new floor goes down.',
    },
  ],
};

export const laminateFlooring: ServiceGuide = {
  process: steps([
    ['See the rooms', 'Laminate belongs in bedrooms, halls, and many living rooms. We say so if the room is a bath or a place that stays wet. The base under the finished floor is checked for flatness either way.'],
    ['Pick the plank and the pad', 'The top layer, the pad, and the locking edge are chosen together. The pad matches the product. A second pad on a plank that already has one is not extra protection.'],
    ['Level first', 'Dips and ridges are corrected. A pad quiets a floor. It does not hide a badly uneven Houston slab.'],
    ['Layout', 'Joints are staggered, doorways are planned, and a small gap is left at the walls. A tight fit against the baseboard is how a floating floor buckles in humid weather.'],
    ['Install', 'Snap-together or glue, as the product requires, with transitions the doors can clear. Old base goes back, or new base is planned, if that is in the job.'],
    ['Walk the floor', 'We check for bounce at the joints and for transitions that rock. You should be able to walk it without hearing a broken click.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Where laminate belongs, and where it does not.',
      paragraphs: [
        'Laminate is a good fit when you want a wood look in bedrooms, halls, and living rooms and you want a faster install than a sanded hardwood. It is common in newer Katy, Cinco Ranch, Pearland, and Magnolia houses that need a straightforward upgrade over concrete. It is a poor fit in a shower, a room with standing water, or a laundry that floods. Standing water swells the core of most laminate. A “water-resistant” label is not the same thing as a tile shower.',
        'Replace planks when the click is intact and the product matches. Replace the room when the edges have swollen or the wear is everywhere. Swollen joints after a habit of leaving mop water down are a use problem as much as a product problem. We will tell you if the room wants vinyl or tile instead.',
      ],
      points: [
        { title: 'Swollen joints', body: 'Raised edges at the clicks are usually moisture. Sanding them flat is not a repair. The wet planks come out, and the source of the water is part of the conversation.' },
        { title: 'A hollow sound', body: 'A floor that thumps may be missing its pad or spanning a low spot. We find the spot and fix it. A rug is not the repair.' },
        { title: 'The look of the whole hall', body: 'Bedrooms that open to a hall want one layout. Short runs of plank that do not line up look like separate jobs.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Wear layer, core, and underlayment.',
      paragraphs: [
        'Laminate is a printed top layer over a core, locked at the edges. The top layer is what survives chairs and shoes. The core is what swells if it stays wet. A thicker top layer suits the busier room. The locking edge is what makes a repair possible later, so we install it the way it was designed to come apart. We glue it only when the product is a glue-down.',
        'A pad over a slab smooths minor texture and quiets the floor. It is not a moisture cure and it is not a leveling system. If the product includes an attached pad, that is the only pad. Transitions to tile are a small ramp or a threshold chosen for the height difference. Baseboard covers the gap at the wall. That gap is required. Caulking the floor to the wall so it looks tight is how it buckles when Houston humidity rises.',
      ],
      points: [
        { title: 'Not hardwood', body: 'Laminate does not sand and refinish the way solid oak does. When the top layer is gone, the plank is replaced. We say that before you choose it.' },
        { title: 'Water-resistant claims', body: 'Some products tolerate a spill that is wiped up. They do not tolerate a wet slab or a tub overflow that sits. We match the product to the room.' },
        { title: 'Stairs', body: 'Stair edges and treads are a different detail from the open floor. If the stairs are in the view, they are in the job. The floor continues onto the stairs when you can see them.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'A practical range, and what adds to it.',
      paragraphs: [
        'As a planning range, not a quote, laminate installed over a prepared floor often falls around $4 to $9 a square foot. A group of bedrooms and a hall in a newer house often plans around $1,500 to $5,000, more if the slab needs real leveling or the stairs are included. A living room that runs long is the square-foot price on that area. Furniture moving and new baseboard are the adders people forget.',
        'The low end assumes a flat base and a straightforward click floor. A slab with waves, several rooms of old glue, or a pattern that is not a simple plank moves it. We measure those on site. Comparing laminate to vinyl only on the box price misses the install and the room. Vinyl often handles a kitchen better. Laminate often costs less in dry bedrooms. We will say which room is which.',
      ],
      points: [
        { title: 'Leveling', body: 'A small patch is normal. A pour that flattens a wavy slab is a different line, and it can cost more than the plank. We say so before we start.' },
        { title: 'Removal', body: 'Carpet and pad are simple. Glued vinyl and tile are not. Removal is priced from what is down. A flat allowance that ignores it will be wrong.' },
        { title: 'Doors', body: 'A thicker floor can catch a door. We trim the door bottom so it clears. That small cut is part of the install when the door needs it.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Slabs, humidity, and dry rooms.',
      paragraphs: [
        'In newer slab houses the laminate goes over concrete with the pad the product allows, after we know the slab is dry enough. Moisture vapor through a Gulf Coast slab is common. A floating floor with the right pad can be the right setup. A floating floor over a damp slab is a swollen floor later. Pier-and-beam bedrooms need the wood base flat and dry. A crawl space that smells wet is a reason to look below before we cover it.',
        'Humidity still changes with the season. The gap at the walls is how a floating floor survives August. Baseboard hides it. We leave that gap, even if the first day would look tighter without it. Kitchens can work with the right product and a household that does not leave water standing. Baths are better in tile or, in some cases, a vinyl we are willing to stand behind in that room. We would rather skip the laminate than put it where it will fail.',
      ],
      points: [
        { title: 'After a leak', body: 'Swollen laminate comes out. The base is dried before a new floor. If you are documenting a claim, photograph the swollen joints first. Your insurer decides coverage.' },
        { title: 'Sun fade', body: 'A printed wear layer can fade in a south-facing room. It will not take a new stain the way oak will. That is a reason to choose the color with the windows in mind.' },
        { title: 'AC on', body: 'We install in a closed, conditioned house. An open window in Houston humidity is the wrong condition for a floating floor to equalize.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Where should I use laminate in a Houston house?',
      a: 'Bedrooms, halls, and many living rooms, especially in newer slab houses in Katy, Cinco Ranch, Pearland, and Magnolia. Baths are better in tile. A kitchen depends on the product and the habits in the room.',
    },
    {
      q: 'What is a planning range for laminate?',
      a: 'Installed laminate often falls around $4 to $9 a square foot. A typical group of bedrooms and a hall often plans around $1,500 to $5,000 before major leveling or stairs. Those are planning ranges, not a quote.',
    },
    {
      q: 'Can laminate handle a mop?',
      a: 'A damp mop that does not leave water standing is the usual care. Standing water swells the core of most laminate. It is not a waterproof floor.',
    },
    {
      q: 'What does the underlayment actually do?',
      a: 'It smooths minor texture and quiets the floor. It will not level a bad slab, and it will not stop a moisture problem. We correct those before the planks arrive.',
    },
  ],
};
