import type { ServiceGuide } from '@/lib/guides/types';

const steps = (
  items: readonly [string, string][],
): ServiceGuide['process'] => items.map(([title, body]) => ({ title, body }));

export const woodFlooring: ServiceGuide = {
  process: steps([
    ['Inspect the floor', 'We see whether the boards can be sanded, whether the subfloor is flat, and whether a slab or a crawl space is feeding moisture. Refinish and replace are different projects.'],
    ['Choose species and finish', 'Solid and engineered, width, stain, and the sheen are decided for the room and the light. The finish is what you live with. The subfloor is what keeps it flat.'],
    ['Acclimate', 'Wood sits in the house before it is fastened. Houston humidity is why. Flooring installed at warehouse moisture content cups after it equalizes.'],
    ['Prep the substrate', 'High spots, loose subfloor, and a slab that is too damp for the product are handled before the first plank. Underlayment is not a cure for a wet slab.'],
    ['Install or sand', 'New planks are fastened the way the product requires. A refinish is dust-controlled sanding, stain, and sealer, including stairs when they are part of the run.'],
    ['Cure and walk', 'The finish needs the time it needs before rugs and heavy furniture. We walk the floor with you and point out transitions at doors and hearths.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs a wood floor needs work.',
      paragraphs: [
        'Refinish when the finish is gone and the boards are still thick enough to sand. Replace when the boards are cupped from a leak, worn through at the knots, or patched with so many species that a stain will not unify them. A squeak can be a loose subfloor. A soft spot is often moisture, and sanding it will not fix the wood underneath.',
        'After a water loss, wood that dried with a cup or a stain at the edges may not be a candidate to save. We look before we promise a sanding. A planned refinish of a sound floor is construction. A floor being replaced because a supply line wet it is documented with that loss.',
      ],
      points: [
        { title: 'Enough wood left', body: 'Sanding removes wood. If the boards have been sanded down to the tongue, replacement is the honest scope. We check the edge.' },
        { title: 'Cups and crowns', body: 'A board that cupped after a leak or a wet slab may not sand flat. The moisture source has to be gone before new wood goes down.' },
        { title: 'Stairs in the same run', body: 'A new floor that stops at a tired stair looks unfinished. Treads and landings are scoped when they are part of the view.' },
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
        { title: 'Slab or crawl space', body: 'Engineered over a dry, flat slab is a common Houston install. Solid nailed to a wood subfloor is the usual pier-and-beam path. We do not reverse them casually.' },
        { title: 'Dust control', body: 'Refinishing uses sanding equipment tied to dust extraction so the rest of the house stays cleaner. Cleaner is not the same as a room you can use during the sanding.' },
        { title: 'Transitions', body: 'Reducers at tile, thresholds at exterior doors, and the stair nosing are part of the floor. They are chosen with the plank, not from a leftover bin.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'Refinish, repair, or a new floor.',
      paragraphs: [
        'As a planning range, not a quote, refinishing a sound floor often falls around $3 to $6 a square foot. Installing hardwood or engineered often plans around $8 to $16 a square foot before subfloor repairs. A single living room might land around $2,500 to $7,000. A larger first floor often plans around $8,000 to $20,000 or more once stairs, transitions, and leveling are real. A wet slab or a soft subfloor is extra, and it is not optional if you want the floor to stay flat.',
        'The species and the finish move the number inside those bands. So does furniture moving, which we will describe rather than assume. A repair of a few boards is cheaper than a room only when matching material exists and the rest of the floor can live with the patch.',
      ],
      points: [
        { title: 'Leveling', body: 'A wood subfloor with dips, or a slab out of flat, is prep. Wide plank and long runs show every dip. Prep is part of the price.' },
        { title: 'Stairs', body: 'Treads are more labor than field plank. A quote that ignores the stair will not match the house.' },
        { title: 'Moisture first', body: 'We do not install over a damp slab or a wet crawl space to hold a number. Drying or a different floor is the conversation.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Humidity, slabs, and pier-and-beam houses.',
      paragraphs: [
        'Wood and Gulf humidity are a managed relationship. The house is air-conditioned, the outdoors is wet, and the floor lives between those. Acclimation, the right product for a slab, and a finish that can handle the traffic are how it works. We do not promise a floor will never show a seasonal gap. We install it so those gaps stay small. A crawl space under a Heights bungalow that is wet or unvented will cup a floor from below. We look down there when that is the structure.',
        'Expansive clay moves slabs seasonally. A nailed floor on a wood subfloor over pier and beam moves differently from a floor glued or floated on concrete. After a plumbing leak, water on a slab runs under the flooring farther than the stain. We find the wet edge before we order plank. Bathrooms and other wet rooms are usually a tile conversation, not a solid-hardwood one.',
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
      a: 'If the boards are sound and thick enough, refinishing renews them with less demolition. If they are cupped, worn through, or too thin, replacement is the honest scope. We inspect and say which.',
    },
    {
      q: 'What is a planning range for wood floors?',
      a: 'Refinishing a sound floor often falls around $3 to $6 a square foot. New hardwood or engineered often plans around $8 to $16 a square foot before subfloor repairs. Those are planning ranges, not a quote.',
    },
    {
      q: 'Can hardwood go on a Houston slab?',
      a: 'Engineered wood often can, if the slab is flat and dry enough for the product. Solid nailed hardwood wants a wood subfloor. We do not glue the wrong product to a damp slab.',
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
    ['Plan the layout', 'The field is centered on the doorway or the room so cuts do not pile up in the view. Patterned tile gets the same attention, on paper before it is thinset.'],
    ['Prep and membranes', 'Leveling, crack isolation where a slab needs it, and waterproofing in a wet room happen before finish tile. Movement joints are part of that plan.'],
    ['Set the field', 'Tile is set with the trowel and the joint the product requires. Large format needs a flatter floor than small tile. We do not bury a dip in extra thinset and hope.'],
    ['Grout and seal', 'Grout is chosen for the room. A kitchen and a bath are wiped differently from a formal entry. Sealer goes on when the material needs it.'],
    ['Walk the transitions', 'We check lips, the door clears, and the change to wood or carpet. Those edges are the part you feel every day.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the tile floor is due.',
      paragraphs: [
        'Hollow tile, cracked grout that keeps returning, a lip you trip on, or a pattern that was never centered are reasons to redo a floor rather than regrout it. A new kitchen or bath that is already open is the other common start. Tile over a sound, flat floor is sometimes possible. Tile over a bouncy wood floor or a broken slab is how the new floor cracks in the same places.',
        'In Houston, grout cracks that follow a long line across a slab are often the house moving on clay, not a bad grout job. Regrouting that line every year does not fix the movement. The assembly under the tile has to acknowledge it.',
      ],
      points: [
        { title: 'Hollow and loose', body: 'Tile that sounds hollow is not bonded. More grout will not glue it down. The loose field comes up.' },
        { title: 'Lippage', body: 'Large tile with a high edge is a trip and a shadow line. It usually means the floor was not flat enough when it was set.' },
        { title: 'Wet rooms', body: 'A bath or a mudroom that was tiled without a membrane is a different repair from a dry living-room floor. We look for the water path.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Porcelain, stone, and the joints between them.',
      paragraphs: [
        'Porcelain is the usual Houston floor because it handles traffic and moisture at the surface. Stone-look porcelain and natural stone are different care. Patterned and encaustic-style tile need a layout that centers the repeat. Large-format tile, anything with a side longer than about 15 inches, wants a substrate flat to roughly 1/8 inch in 10 feet and tighter over a short straightedge. That is an industry setting standard, and it is why prep takes longer than the tile install looks.',
        'Grout joint width is part of the look and part of the tolerance. A razor joint on a floor that is not perfectly flat will lip. Movement joints at the perimeter and at changes in plane give a slab somewhere to move besides through the middle of a tile. In showers and baths the waterproofing is under the finish. The tile is not the waterproof layer.',
      ],
      points: [
        { title: 'Crack isolation', body: 'Where a slab has cracked or is likely to move, a membrane under the tile is how the crack does not print straight through the new grout.' },
        { title: 'Slip and sheen', body: 'A polished floor that looks right in a photo can be slick at a Houston entry in the rain. We talk about the surface you will walk on wet.' },
        { title: 'Thresholds', body: 'Tile thickness changes the height at the door. We plan that before the thinset, so the exterior door and the dishwasher still clear.' },
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
        { title: 'Waterproofing', body: 'A shower or a bath floor includes the membrane. A living room usually does not. We do not price them as the same assembly.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Clay soils, slabs, and wet entries.',
      paragraphs: [
        'Most newer Houston houses are slab on expansive clay. The slab moves a little between wet springs and dry summers. Tile is rigid, so the system needs a flat substrate, isolation where the slab is cracked, and joints that can move. Pier-and-beam houses move differently. The subfloor has to be stiff enough for tile, or the grout cracks over the joists. We say which structure we are on before we recommend tile in that room.',
        'Entries, kitchens, and baths are where Houston tile earns its place. Rain comes in on shoes. Kitchens get spills. Baths get a wet floor outside the shower. A living room that runs to a sunny south wall wants a tile that will not feel like a mistake in August, which is a comfort conversation as much as a design one. We will not promise outdoor tile ratings for an indoor product, or the reverse.',
      ],
      points: [
        { title: 'After water damage', body: 'Tile does not go down until the slab or the subfloor is dry. Covering a wet floor traps the moisture. If the loss is an insurance claim, we photograph it. We do not decide coverage.' },
        { title: 'Older floors', body: 'A 1940s bath may have several layers. Each layer adds height. We see what the door and the flange can tolerate before we stack another one.' },
        { title: 'Permit', body: 'Tile itself is usually a finish. The plumbing under a shower floor is what usually brings a permit. We separate those scopes.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Can you tile over my existing floor?',
      a: 'Sometimes, if it is sound, flat, and not so high that doors and transitions fail. A hollow tile floor or a soft subfloor comes out. We check before we recommend a cover-up.',
    },
    {
      q: 'What is a planning range for tile floors?',
      a: 'Many installs fall around $8 to $18 a square foot once the floor is flat enough, more for heavy leveling, stone, or a complex pattern. That is a planning range, not a quote.',
    },
    {
      q: 'Why does large tile need a flatter floor?',
      a: 'A big piece bridges less. Industry setting practice for tile with a side longer than about 15 inches asks for a substrate flat to about 1/8 inch in 10 feet. Prep is how you get there.',
    },
    {
      q: 'Will Houston clay crack the grout again?',
      a: 'It can, if the floor is rigid over a moving slab and there is nowhere for movement to go. Membranes and movement joints are how we plan for that. They are not a promise the house will stop moving.',
    },
  ],
};

export const vinylFlooring: ServiceGuide = {
  process: steps([
    ['See the subfloor', 'We check flatness, moisture, and what is down now. A wavy slab will telegraph through vinyl. A soft spot will too.'],
    ['Match the product to the room', 'Plank, tile, or sheet, and click, glue, or a floating install, follow the subfloor and the room. A kitchen and a bath are not automatic yeses for every product.'],
    ['Level where it needs it', 'High ridges and low birdbaths are corrected before plank. Underlayment does not erase a bad slab.'],
    ['Acclimate and lay out', 'Material sits in the room as the product requires. The layout is planned so joints do not stack and doorways get a full piece where they can.'],
    ['Install', 'The method we agreed on is the method we install. Transitions at tile and at exterior doors are part of that day.'],
    ['Walk it', 'We check edges, the toilet clearance if a bath is involved, and any spots the slab still telegraphs. You should feel a floor, not a wave.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs vinyl is the right upgrade.',
      paragraphs: [
        'Vinyl is the usual choice when you want the look of wood or stone in a kitchen, a playroom, or a first floor that sees kids, dogs, and tracked-in rain, and you do not want a sanded hardwood. It is also the choice when a tired sheet floor or an old peel-and-stick layer is done. It is the wrong choice when someone is selling a “waterproof” plank as a solution for a wet slab or an active leak. The surface can be waterproof and the floor still fails if the subfloor is wet.',
        'Replace a section when the product matches and the damage is local. Replace the room when the wear is even or the click system is broken across the field. A bath shower is still tile. We will say so.',
      ],
      points: [
        { title: 'Telegraphing', body: 'Seams, grout lines, and slab ridges show through vinyl. If you can see the old floor, the new one will not hide it without prep.' },
        { title: 'Edges lifting', body: 'A floating floor that lifts at the door is often moisture, missing expansion, or a slab that was not flat. We find which.' },
        { title: 'A full kitchen look', body: 'Plank that runs through the kitchen and the living room is a common Houston update. The transitions at the doors are designed, not improvised.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Plank, sheet, and the install method.',
      paragraphs: [
        'Luxury vinyl plank is the product most people mean. Sheet vinyl still makes sense in a laundry or a small bath where you want fewer joints. Vinyl tile is its own layout. Click-lock floats. Glue-down locks to the slab and is often steadier in a Houston kitchen. The product literature and the subfloor pick the method. We do not click-float a plank the manufacturer wants glued, and we do not glue one that is supposed to float.',
        'Wear layer and the printed image are what you see in five years. A thicker wear layer handles a busier room. The print is the look of oak or stone. Underlayment is specified for that product. A second underlayment under a pad-attached plank can void the way the floor is supposed to sit, so we follow the product instead of adding layers for comfort.',
      ],
      points: [
        { title: 'Waterproof is the surface', body: 'A waterproof plank does not dry a wet slab and does not make a shower. Seams and the perimeter still see water. We install it as a floor, not as a membrane.' },
        { title: 'Glue-down on slabs', body: 'On many Houston slabs, glue-down is the steadier kitchen floor. We explain that before the material is ordered.' },
        { title: 'Matching a repair', body: 'Dye lots change. A repair matches when the product is still available. If it is not, a full room looks more intentional than a near miss.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'What a vinyl floor costs to plan.',
      paragraphs: [
        'As a planning range, not a quote, mid-grade luxury vinyl installed in a Houston house often falls around $5 to $12 a square foot. A kitchen or a living room of a few hundred square feet often plans around $2,000 to $6,000 before major slab leveling. Leveling, furniture, and a glue-down install instead of a click floor move the number. A whole first floor is the same math on more area, not a different kind of product.',
        'The cheapest plank on a wavy slab is the expensive floor, because it will show every ridge and may need to come up. We price prep honestly. Sheet vinyl in a small room is often less material and still needs a smooth substrate. Seams telegraph dirt if the floor under them moves.',
      ],
      points: [
        { title: 'Leveling', body: 'Skim coat and patch are ordinary. A slab with deep waves is a leveling project. We measure before we call it a simple overlay.' },
        { title: 'Removal', body: 'Old tile, glued carpet, or several layers of sheet take time and add height decisions at the doors. Removal is in the scope when it is needed.' },
        { title: 'Wet rooms', body: 'A toilet flange, a tub apron, and the shower curb are details. They are not a reason to run plank into a shower.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Slabs, humidity, and rainy entries.',
      paragraphs: [
        'Most of the vinyl we install in Katy, Pearland, Spring Branch, and newer subdivisions is going over a slab. The slab needs to be dry enough for the adhesive or for the floating floor the product allows. Moisture moving up through concrete is ordinary on Gulf Coast slabs. A pretty plank will still tent or cup at the joints if that moisture is ignored. We check before we install. We do not treat a plastic claim on the box as a test.',
        'Rain comes in on shoes nine months of the year. A vinyl floor at an entry is a practical answer. It is not outdoor flooring, and it is not a fix for water standing against the slab from bad drainage. If the floor is being replaced after a leak, the slab is dry first. That loss can be documented. Your insurer decides what is paid. A planned flooring upgrade is not a claim.',
      ],
      points: [
        { title: 'Humidity in the house', body: 'Vinyl is more stable than hardwood, and it still wants the rooms at a normal indoor condition when it is installed. We do not install it in a house that is open to the weather.' },
        { title: 'Sun', body: 'A south window can fade a print and heat a dark floor. We mention that when the room is glass. We do not promise the print will not fade.' },
        { title: 'Pier and beam', body: 'Over a wood subfloor the floor still has to be flat and dry. A bouncy or cupped subfloor is repaired. Vinyl will not stiffen it.' },
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
      a: 'Whichever the product and the subfloor require. Glue-down is often steadier on a Houston slab. We decide that before the material is ordered, not on install morning.',
    },
    {
      q: 'Can vinyl go over a damp slab?',
      a: 'No. A waterproof surface is not a wet-slab solution. We check moisture and flatness first. If the slab is wet from a leak, it is dried before any new floor goes down.',
    },
  ],
};

export const laminateFlooring: ServiceGuide = {
  process: steps([
    ['See the rooms', 'Laminate belongs in bedrooms, halls, and many living rooms. We say so if the room is a bath or a place that stays wet. The subfloor is checked for flatness either way.'],
    ['Pick the plank and the pad', 'The wear layer, the pad, and the locking edge are chosen together. Underlayment is matched to the product. A pad plus a pad-attached plank is not “more protection.”'],
    ['Level first', 'Dips and ridges are corrected. Underlayment quiets a floor. It does not hide a badly uneven Houston slab.'],
    ['Layout', 'Joints are staggered, doorways are planned, and expansion space is left at the walls. A tight fit against the baseboard is how a floating floor buckles in humid weather.'],
    ['Install', 'Click-lock or glue, as the product requires, with transitions the doors can clear. Base is reinstalled or new base is coordinated if it is in the job.'],
    ['Walk the floor', 'We check for spring at the joints and for transitions that rock. You should be able to walk it without hearing a broken click.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Where laminate belongs, and where it does not.',
      paragraphs: [
        'Laminate is a good fit when you want a wood look in bedrooms, halls, and living rooms and you want a faster install than a sanded hardwood. It is common in newer Katy, Cinco Ranch, Pearland, and Magnolia houses that need a straightforward upgrade over concrete. It is a poor fit in a shower, a room with standing water, or a laundry that floods. Standing water swells the core of most laminate. “Water-resistant” on a label is not the same as a tile shower.',
        'Replace planks when the click is intact and the product matches. Replace the room when the edges have swollen or the wear is everywhere. Swollen joints after a mop bucket habit are a use problem as much as a product problem. We will tell you if the room wants vinyl or tile instead.',
      ],
      points: [
        { title: 'Swollen joints', body: 'Raised edges at the clicks are usually moisture. Sanding them flat is not a repair. The wet planks come out, and the source of the water is part of the conversation.' },
        { title: 'A hollow sound', body: 'A floor that thumps may be missing underlayment or spanning a low spot. We find the spot. We do not put a rug over it.' },
        { title: 'The look of the whole hall', body: 'Bedrooms that open to a hall want one layout. Piecemeal planks that do not align read as separate jobs.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Wear layer, core, and underlayment.',
      paragraphs: [
        'Laminate is a photographic wear layer over a core, locked at the edges. The wear layer is what survives chairs and shoes. The core is what swells if it stays wet. A thicker wear layer is the busier room. The locking edge is what makes a repair possible later, so we install it the way it was designed to come apart, not glued shut unless the product is a glue-down.',
        'Underlayment over a slab smooths minor texture and quiets the floor. It is not a moisture cure and it is not a leveling system. If the product includes an attached pad, we do not add another. Transitions to tile are a reducer or a threshold chosen for the height difference. Baseboard covers the expansion gap. That gap is required. Caulking the floor to the wall so it “looks tight” is how it buckles when Houston humidity rises.',
      ],
      points: [
        { title: 'Not hardwood', body: 'Laminate does not sand and refinish the way solid oak does. When the wear layer is gone, the plank is replaced. We say that before you choose it.' },
        { title: 'Water-resistant claims', body: 'Some products tolerate a spill that is wiped up. They do not tolerate a wet slab or a tub overflow that sits. We match the product to the room.' },
        { title: 'Stairs', body: 'Stair noses and treads are a different detail from field plank. If the stairs are in the view, they are in the scope. We do not stop the floor at the first riser and call it done.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'A practical range, and what adds to it.',
      paragraphs: [
        'As a planning range, not a quote, laminate installed over a prepared floor often falls around $4 to $9 a square foot. A group of bedrooms and a hall in a newer house often plans around $1,500 to $5,000, more if the slab needs real leveling or the stairs are included. A living room that runs long is the square-foot price on that area. Furniture moving and new baseboard are the adders people forget.',
        'The low end assumes a flat substrate and a straightforward click floor. A slab with waves, several rooms of old glue, or a pattern that is not a simple plank moves it. We measure those on site. Comparing laminate to vinyl only on the box price misses the install and the room. Vinyl often handles a kitchen better. Laminate often costs less in dry bedrooms. We will say which room is which.',
      ],
      points: [
        { title: 'Leveling', body: 'Minor patch is normal. A slab that needs self-leveling is a different line, and it can exceed the plank. We tell you before we start.' },
        { title: 'Removal', body: 'Carpet and pad are simple. Glued vinyl and tile are not. Removal is scoped from what is down, not from a standard allowance that ignores it.' },
        { title: 'Doors', body: 'A thicker floor can catch a door. Trimming doors is small and it is part of a careful install. We include it when the swing requires it.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Slabs, humidity, and dry rooms.',
      paragraphs: [
        'In newer slab houses the laminate goes over concrete with the underlayment the product allows, after we know the slab is dry enough. Moisture vapor through a Gulf Coast slab is common. A floating floor with a proper underlayment can be the right assembly. A floating floor over a damp slab is a swollen floor later. Pier-and-beam bedrooms with a wood subfloor need that subfloor flat and dry. A crawl space that smells wet is a reason to look below before we cover it.',
        'Humidity still moves the season. The expansion space at the perimeter is how a floating floor survives August. Baseboard hides it. We do not omit it to make the first day look tighter. Kitchens can work with the right product and a household that does not leave water standing. Baths are better in tile or, in some cases, a vinyl we are willing to stand behind in that room. We would rather lose the laminate sale than put it where it will fail.',
      ],
      points: [
        { title: 'After a leak', body: 'Swollen laminate comes out. The subfloor is dried before a new floor. If you are documenting a claim, photograph the swollen joints first. We do not decide coverage.' },
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
      a: 'A damp mop that does not leave water standing is the usual care. Standing water swells the core of most laminate. We will not describe it as a waterproof floor.',
    },
    {
      q: 'What does the underlayment actually do?',
      a: 'It smooths minor texture and quiets the floor. It does not level a bad slab and it does not stop a moisture problem. We correct those before the planks arrive.',
    },
  ],
};
