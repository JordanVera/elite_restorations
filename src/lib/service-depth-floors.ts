import { notAPublicAdjuster, rangeNote } from '@/lib/service-depth-shared';
import type { ServiceDepth } from '@/lib/service-depth-types';

export const floorDepth: Record<string, ServiceDepth> = {
  'wood-flooring': {
    moreIntro: [
      'Wood in a Houston house is a moisture decision before it is a stain decision. Solid boards want a wood subfloor they can be fastened to, which a pier-and-beam house often has and a slab does not, unless we build a sleeper system on purpose. Engineered planks are usually the more stable choice on concrete. We say which one the floor in front of us can take.',
      'New wood is acclimated in the house before it is fastened. Refinishing is offered when the boards are thick enough to sand. Dust collection on the sander is how the rest of the house stays livable during that work.',
    ],
    moreLocal: [
      'A leak on a slab does not drip away. It runs under the flooring and cups the boards from below. In a crawl space, the moisture can come from the ground as well as from a spill. Either way, we want the subfloor dry and flat before new wood goes down, and we do not sand a floor that is still moving.',
    ],
    factorsHeading: 'Humidity, the slab, and the crawl space.',
    factorsIntro:
      'The species and the stain are what you see. The subfloor and the moisture under it are what decide whether the floor stays flat through a Houston year.',
    factors: [
      {
        title: 'Gulf humidity',
        body: 'Indoor wood still moves when the door opens onto summer air and the air conditioning runs for months. We acclimate the material in the house and we finish it for that movement. A floor installed straight off the truck is the floor that cups in August.',
      },
      {
        title: 'Slab houses',
        body: 'Most Katy, Cinco Ranch, Pearland, and Woodlands floors are on concrete. Concrete gives off moisture. A vapor retarder, the right adhesive or underlayment, and a flat slab are the assembly. Solid nail-down hardwood is a poor default on a slab. Engineered, or a sleeper system we have planned, is the honest conversation.',
      },
      {
        title: 'Pier-and-beam bungalows',
        body: 'Many older Heights houses have a crawl space and a wood subfloor. That is where solid boards can be nailed. The subfloor may be out of level, and the crawl space may be damp. We look at both before we sand or overlay. Covering a soft subfloor with a pretty plank does not make it sound.',
      },
      {
        title: 'Permits',
        body: 'Replacing a finish floor is usually not a building permit by itself. Repairing joists, altering the structure, or changing a stair often is. An interior floor is rarely an HOA review. We tell you if the scope has crossed into structure.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the boards, the subfloor, and the moisture. You say whether you want the existing floor renewed or a new species and width. Stairs and the rooms the floor has to meet are part of the walk.',
      },
      {
        title: 'Plan',
        body: 'Solid or engineered, the stain, the sheen, and the transitions are chosen. If the floor is a refinish, we confirm there is thickness left to sand. Material is ordered to the square feet plus the waste the layout needs.',
      },
      {
        title: 'Prepare',
        body: 'Furniture is planned out of the room. The subfloor is flattened and dried. On a slab we address vapor before the first board. Wood acclimates in the house. A refinish starts with protection and dust collection, not with a stain color.',
      },
      {
        title: 'Build',
        body: 'Boards are fastened or glued in the method the product and the subfloor require. Layout keeps the joints staggered and the rows running with the way you walk. Stair treads and landings are detailed with the field so the wood reads as one run.',
      },
      {
        title: 'Finish',
        body: 'Sanding, stain, and finish coats are done in the order the product wants, with dry time between coats. A site-finished floor and a prefinished plank are different schedules. We do not rush the cure because the furniture is waiting.',
      },
      {
        title: 'Walk through',
        body: 'We walk the floor, the transitions, and the stair with you. You see the sheen in the daylight. We go over cleaning and when rugs and furniture can go back, which depends on the finish, not on a fixed slogan.',
      },
    ],
    signsHeading: 'Signs the wood floor is the project.',
    signs: [
      {
        title: 'The finish is gone',
        body: 'Traffic lanes that are down to bare wood, or a finish that has worn evenly, can be a refinish if the boards are thick enough. We measure that. We do not sand a floor that has already been sanded to the tongue.',
      },
      {
        title: 'Boards are cupped or buckled',
        body: 'Cupping is moisture, usually from below. In Houston that is a slab leak, a wet crawl space, or water that sat after a storm. Drying comes before sanding or replacement. Sanding a wet board locks the problem in.',
      },
      {
        title: 'The floor stops at the doorway',
        body: 'A patch of new wood against an old floor, or a height change that catches your foot, is a transition problem. Matching species is sometimes possible. Refinishing the whole room often looks more intentional than a plug.',
      },
      {
        title: 'The stairs do not match the landing',
        body: 'Treads, the landing, and the hall are one walk. If only the living room was done ten years ago, the stair is usually the piece that makes the house feel unfinished.',
      },
    ],
    materialsHeading: 'Solid, engineered, and a refinish.',
    materialsIntro:
      'The three real options are a refinish of sound boards, engineered planks, and solid hardwood where the subfloor allows it. The house chooses first.',
    materials: [
      {
        title: 'Refinishing',
        body: 'Sand, stain, and finish on boards that still have thickness. Dust extraction on the sander keeps most of the dust out of the rest of the house. It is less disruption than a replacement when the floor is sound. It will not fix a cupped floor that is still wet, and it will not make mismatched species into one species.',
      },
      {
        title: 'Engineered wood',
        body: 'A real wood face on a layered core. It is the usual choice on a Houston slab because it moves less than solid boards. Glue-down, nail-down, and floating methods depend on the product and the concrete. We explain which one we are using before the planks arrive.',
      },
      {
        title: 'Solid hardwood',
        body: 'A full-thickness board, usually nailed to a wood subfloor. It can be sanded more than once over a long life if the original thickness is there. On a slab it needs a system we have planned, not a hopeful nail into concrete. Species, width, and stain are chosen for the light in the room.',
      },
      {
        title: 'Stairs and transitions',
        body: 'Treads, nosings, and the reducer at the tile or the carpet are part of the floor. A pretty field with a bad doorway still feels unfinished. We detail those pieces with the plank, including the height difference an older house always has.',
      },
    ],
    costHeading: 'What wood flooring tends to cost.',
    costIntro: [
      'Square feet are the multiplier. A room, a stair, and a whole main level are different jobs. Refinishing sound boards costs less than taking them up. Moisture repair under the floor is extra, and we do not fold it into a per-foot number we have not seen.',
    ],
    costFactors: [
      {
        title: 'Refinish or replace',
        body: 'Sanding and finishing a sound floor is labor and finish. A new floor is the material, the subfloor prep, and the install. Stairs add both.',
      },
      {
        title: 'Slab prep',
        body: 'A flat, dry slab is the start. Leveling compound, a vapor retarder, and removal of an old glued floor change the price before the first plank.',
      },
      {
        title: 'Species and width',
        body: 'A common oak and a wide engineered plank are different materials. The finish, site-finished or prefinished, changes the schedule and the number.',
      },
    ],
    ranges: [
      { label: 'Refinish a sound room, about 300 sq ft', range: '$1,200 to $3,000' },
      { label: 'Engineered install, a main living area', range: '$7,000 to $14,000' },
      { label: 'Board replacement in a damaged area', range: '$500 to $2,500' },
    ],
    rangeNote: rangeNote('wood flooring'),
    insurance: {
      heading: 'When a leak cups the floor.',
      paragraphs: [
        'A supply line, a refrigerator, or water from a roof opening can cup or stain a wood floor. We photograph the boards and the moisture before anything is sanded or thrown out. Drying is the first construction step. Replacement is the step after the subfloor is dry.',
        'Floodwater and a sudden plumbing leak are often different conversations with an insurer. We do not know which deductible or which exclusion is on your form.',
        notAPublicAdjuster,
      ],
      links: [
        { href: '/what-to-do-after-water-damage-houston', label: 'What to do after water damage' },
      ],
    },
    faqs: [
      {
        q: 'What does wood flooring typically cost in Houston?',
        a: 'Refinishing a sound room of about 300 square feet often plans at $1,200 to $3,000. An engineered install through a main living area often plans at $7,000 to $14,000. Replacing boards in a damaged area often plans at $500 to $2,500. Solid hardwood, where the subfloor allows it, usually sits higher per square foot than engineered. These are typical planning ranges, not a quote.',
      },
      {
        q: 'Can you install solid hardwood on a slab?',
        a: 'Not as a default nail-down. A slab wants engineered wood, or a sleeper system we have designed for solid boards. Most newer houses in Katy and The Woodlands are slab. Many older Heights bungalows have a wood subfloor in a crawl space, which is the usual place for solid nail-down.',
      },
      {
        q: 'Why did the boards cup after a leak?',
        a: 'Moisture from below swells the back of the board more than the face. On a Houston slab that water has nowhere to go but sideways under the floor. We dry and measure before we sand. Sanding a wet cup locks the shape in.',
      },
      {
        q: 'Do I need a permit for new wood floors?',
        a: 'A finish floor replacement usually does not. Joist repair, a structural change, or a rebuilt stair can. We tell you if the visit turned up that kind of work. An interior floor is rarely something an HOA reviews.',
      },
    ],
  },
  'tile-flooring': {
    moreIntro: [
      'Large-format tile and a patterned floor fail in the prep. A Houston slab moves with the clay under it through wet and dry seasons, and a ridge you can feel with your hand becomes a lip you can see across a 24-inch tile. We flatten first. Then we lay out the pattern so it centers on the doorway instead of dying in a cut at the wall.',
      'Wet rooms are a different assembly. A shower floor and a bathroom floor are waterproofed before the finish tile. A living-room field is about flatness, movement joints, and the grout.',
    ],
    moreLocal: [
      'Crack isolation is part of the slab conversation. Expansive clay in the Houston area moves, and the concrete moves with it. A membrane under the tile is how a hairline crack in the slab is less likely to become a crack in the grout. It is not a cure for a foundation that is actively breaking. If we see that, we say so before we set a new floor on it.',
    ],
    factorsHeading: 'Flatness, clay soils, and wet rooms.',
    factorsIntro:
      'Tile is rigid. Houston slabs and Houston humidity are not. The assembly under the tile is the job you are actually buying.',
    factors: [
      {
        title: 'Slab movement',
        body: 'A lot of the metro sits on clay that swells when it rains and shrinks in a dry spell. Slabs crack. We look at those cracks, use a crack-isolation membrane where it belongs, and we do not promise that tile will stop a foundation from moving. The membrane is a floor detail, not a foundation repair.',
      },
      {
        title: 'Flatness for large tile',
        body: 'Big porcelain makes every high spot obvious. Leveling compound and a patient prep are the long part of the job in Katy production homes and in older houses whose slabs were never flat. Skipping that prep is how you get lippage.',
      },
      {
        title: 'Pier-and-beam floors',
        body: 'A wood subfloor in an older Heights house can take tile if it is stiff and flat enough. Deflection cracks grout. We check the floor before we recommend tile over it, and we will say when the answer is a different material.',
      },
      {
        title: 'Permits',
        body: 'A finish tile floor is usually not a permit by itself. A shower pan that moves the drain, or structural work under a bouncy floor, can be. Interior floors are rarely an HOA item. We separate the finish scope from the plumbing scope when both are in the room.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the slab or the subfloor, the doors, and the rooms the tile has to meet. You choose the tile and the pattern. We say whether the substrate can take it, including over an existing floor.',
      },
      {
        title: 'Plan',
        body: 'The layout is drawn so the pattern centers on the doorway or the room. Grout width, movement joints, and the transitions at the wood or the carpet are chosen before the tile arrives. Wet areas get a waterproofing plan, not a note to add it later.',
      },
      {
        title: 'Prepare',
        body: 'The floor is cleaned, flattened, and dried. Cracks are treated. In a shower or a bath, the membrane goes down before the finish. Doors and toilets that will not clear the new height are identified now.',
      },
      {
        title: 'Build',
        body: 'We set from the layout lines, keep the courses even, and back-butter large tile so the coverage is there. Patterns are checked as they grow. A commercial floor and a house entry get the same respect for the lines.',
      },
      {
        title: 'Finish',
        body: 'Grout, sealer when the material wants it, and the transitions close the floor. We protect the field while the grout cures. A shower floor is checked for how water leaves.',
      },
      {
        title: 'Walk through',
        body: 'We walk the pattern, the doorway cuts, and the transitions with you. Care for the grout, especially in a kitchen or a bath, is part of that conversation.',
      },
    ],
    signsHeading: 'Signs the tile floor needs work.',
    signs: [
      {
        title: 'Grout is cracking in a line',
        body: 'A crack that follows a line across the room is often the slab telegraphing through. Regrouting the line without looking at the crack under it is a short repair.',
      },
      {
        title: 'Tile sounds hollow or rocks',
        body: 'Poor coverage or a soft spot under the tile will not improve. Those pieces come up. If the hollow spot is the whole field, the conversation is a replacement, not a few replacements.',
      },
      {
        title: 'The pattern dies at the wall',
        body: 'A geometric or encaustic-style floor that was started from a corner instead of from the center never recovers. The fix is a new layout.',
      },
      {
        title: 'Lippage on large tile',
        body: 'If you feel every edge under your foot, the substrate was not flat enough for the tile size. A new floor starts with flattening, not with a thicker grout joint.',
      },
    ],
    materialsHeading: 'Porcelain, stone, and pattern.',
    materialsIntro:
      'The tile is the finish. The membrane, the mortar, and the grout are the assembly. We specify all three for the room.',
    materials: [
      {
        title: 'Porcelain',
        body: 'The usual choice for kitchens, baths, and a main floor that sees wet shoes. It is dense and stable. Large-format porcelain needs a flat floor and a mortar bed with full coverage. Rectified edges want a tighter joint than a pressed tile.',
      },
      {
        title: 'Stone and stone-look',
        body: 'Natural stone is a care and a sealing conversation. A porcelain that looks like stone is often the more practical field in a Houston kitchen. We show you both and we do not treat them as the same maintenance.',
      },
      {
        title: 'Patterned floors',
        body: 'Encaustic-style and geometric tile are centered on the entry or the room so the repeat reads from the door. The waste is higher than a plain field. That waste is in the plan, not a surprise at the end of the box.',
      },
      {
        title: 'Wet-area assemblies',
        body: 'Shower floors and bathroom floors get a membrane before the finish tile. The slope, the drain, and the curb are part of that work. A living-room floor does not get a shower pan, but it may get crack isolation over the slab.',
      },
    ],
    costHeading: 'What tile flooring tends to cost.',
    costIntro: [
      'Prep is often as large a line as the tile. A flat slab and a simple porcelain field are the lower end. Leveling, a membrane, natural stone, and a pattern are what move the number.',
    ],
    costFactors: [
      {
        title: 'Substrate',
        body: 'A flat, sound floor is thinset and tile. A wavy slab is leveling compound first. A wood subfloor that bounces may not be a tile floor at all.',
      },
      {
        title: 'Tile size and pattern',
        body: 'Large format is slower and less forgiving. A patterned floor uses more tile and more layout time. Mosaics are their own pace.',
      },
      {
        title: 'Wet rooms',
        body: 'Waterproofing, a sloped shower floor, and a linear or center drain are a bath scope. They are not priced as if they were a hallway.',
      },
    ],
    ranges: [
      { label: 'Bathroom floor', range: '$900 to $2,800' },
      { label: 'Kitchen or entry, including prep', range: '$2,000 to $6,000' },
      { label: 'Large-format or stone, a main living area', range: '$8,000 to $18,000' },
    ],
    rangeNote: rangeNote('tile flooring'),
    faqs: [
      {
        q: 'What does tile flooring typically cost in Houston?',
        a: 'A bathroom floor often plans at $900 to $2,800. A kitchen or entry, including ordinary prep, often plans at $2,000 to $6,000. Large-format porcelain or stone through a main living area often plans at $8,000 to $18,000. A shower floor is usually part of a bathroom remodel, not this hallway price. These are typical planning ranges, not a quote.',
      },
      {
        q: 'Why do Houston slabs crack tile?',
        a: 'Clay soils in this region swell and shrink, and slabs crack with them. A crack-isolation membrane under the tile is a common detail so a hairline in the concrete is less likely to print through the grout. It does not stop a foundation that is still moving. If we see that, we say so before we set a new floor.',
      },
      {
        q: 'Can you tile a pier-and-beam floor in the Heights?',
        a: 'Sometimes. The subfloor has to be stiff and flat. Deflection cracks grout no matter how good the tile is. If the floor moves underfoot, we will recommend fixing the structure or choosing a different material.',
      },
      {
        q: 'Do I need a permit to tile a floor?',
        a: 'A finish floor usually does not. Moving a shower drain or doing structural work under the floor can. We separate those scopes when both are present. Interior tile is rarely an HOA review.',
      },
    ],
  },
  'vinyl-flooring': {
    moreIntro: [
      'Luxury vinyl plank is the floor Houston houses use when they want the look of wood in a kitchen, a playroom, or a first floor and they do not want the movement of solid hardwood on a slab. It is still a floor that shows every wave under it. We check the slab before we recommend a floating plank over it.',
      'Waterproof and water-resistant are not the same claim on the box. A plank can survive a spill and still be the wrong floor for a shower. For a shower, we will say tile.',
    ],
    moreLocal: [
      'Glue-down is often the steadier method on a Houston slab, especially in a room that sees temperature swings when the door to the garage or the patio stands open. A floating floor needs a flatness the slab may not have, and it needs expansion space at the walls. We pick the method from the product and the floor, then we explain it before the boxes are ordered.',
    ],
    factorsHeading: 'A slab, a flatness number, and daily water.',
    factorsIntro:
      'Vinyl is popular here because slabs and humidity are hard on solid wood. It still has rules. The slab has to be flat and dry, and the product has to match the room.',
    factors: [
      {
        title: 'Moisture in the slab',
        body: 'Concrete holds moisture. A plank glued or floated over a wet slab can fail at the adhesive or cup at the joints. We test and look before we install. A new floor over a recent leak is a drying question first.',
      },
      {
        title: 'Flatness',
        body: 'A wavy slab in a production home, or a patched floor in an older house, will telegraph through vinyl. Underlayment does not hide a bad ridge. We grind or fill the highs and lows the product requires, or we tell you the floor is not a candidate.',
      },
      {
        title: 'Where it belongs',
        body: 'Kitchens, playrooms, living areas, and a first floor in Katy, Pearland, or Spring Branch are the usual fit. A shower is not. A bath floor can be, with the right product and a careful joint at the tub. We will say no when the room wants tile.',
      },
      {
        title: 'Permits and HOAs',
        body: 'A vinyl floor is a finish. It almost never needs a building permit and it is not an HOA review. If we open the floor and find structure or a plumbing leak, that discovery is a different scope and we stop to show you.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the existing floor, the slab, and the rooms you want to run the plank through. You choose the look. We say whether glue-down, click-lock, or a floating floor is the method.',
      },
      {
        title: 'Plan',
        body: 'The product, the underlayment if it needs one, and the transitions at the tile or the carpet are chosen. Door clearances are checked against the new height. Matching a repair to an existing plank only works if that product is still made.',
      },
      {
        title: 'Prepare',
        body: 'The old floor comes up if it should. The slab is flattened and dried. Baseboards are planned off or scribed. Furniture and appliances are out of the way so the layout can run straight.',
      },
      {
        title: 'Build',
        body: 'Planks are laid in the method the product calls for, staggered, with the expansion the floating floor needs or the adhesive the glue-down needs. Rows are kept square to the room you actually walk, not to a wall that is out of square if that would look wrong.',
      },
      {
        title: 'Finish',
        body: 'Transitions, the toilet set back on a bath floor, and the base or the quarter round close the edges. A glue-down gets its cure time before the refrigerator rolls back.',
      },
      {
        title: 'Walk through',
        body: 'We walk the joints and the doorways with you. You see where the floor meets the kitchen and the hall. We go over what the product will tolerate from water, which is spills, not a flood that sits.',
      },
    ],
    signsHeading: 'Signs vinyl is the right next floor.',
    signs: [
      {
        title: 'The old floor is tired and the slab is sound',
        body: 'A worn sheet floor, a dated tile you are allowed to cover, or a carpet you are done with can be a vinyl project if what is underneath is flat and dry.',
      },
      {
        title: 'You want wood look in a wet kitchen',
        body: 'Solid hardwood at the sink is a moisture argument you will have every summer. Vinyl plank is the usual alternative when you still want the look of boards.',
      },
      {
        title: 'Planks are peaking or gapping',
        body: 'Peaking is often moisture or no expansion space. Gapping can be the same, or a product that was the wrong method for the slab. We look before we replace a section and repeat the cause.',
      },
      {
        title: 'A section is damaged and the product matches',
        body: 'A torn plank at the door can be replaced if the same material is available and the slab under it is flat. If the wear is even across the room, a full floor looks cleaner.',
      },
    ],
    materialsHeading: 'Plank, sheet, and the method.',
    materialsIntro:
      'The look is wood or stone. The installation is click-lock, glue-down, or a floating floor. The product data, not a trend, picks the method.',
    materials: [
      {
        title: 'Luxury vinyl plank',
        body: 'A rigid or flexible core with a printed wear layer. Thickness and the wear layer are what you compare, not only the picture. A thicker rigid core bridges a minor dip better than a thin flexible plank, and it still will not bridge a bad slab.',
      },
      {
        title: 'Sheet and vinyl tile',
        body: 'Sheet vinyl is a practical floor in a laundry or a small bath, with fewer joints. Vinyl tile is a different look and a different layout. Both want a smooth substrate. Seams in sheet goods are welded or sealed the way the product specifies.',
      },
      {
        title: 'Glue-down on a slab',
        body: 'Often the steadier choice when the room sees heat from a sunny door or traffic from a garage entry. The adhesive and the moisture in the slab have to agree. We do not glue a plank to a damp concrete and hope the summer is mild.',
      },
      {
        title: 'Click-lock and floating',
        body: 'Faster, and right for some products, with expansion space at the perimeter. It can feel more hollow underfoot. If the slab is out of flatness beyond what the manufacturer allows, we flatten it or we choose another method.',
      },
    ],
    costHeading: 'What vinyl flooring tends to cost.',
    costIntro: [
      'The plank price is real, and so is the prep. A room that is already flat is mostly material and labor. A slab that needs grinding, patching, or an old glue removed is a different day before the first row starts.',
    ],
    costFactors: [
      {
        title: 'The product',
        body: 'A thin plank and a thick rigid-core plank with a longer wear layer are different materials. The picture can look the same in a small sample.',
      },
      {
        title: 'Prep',
        body: 'Furniture, appliances, floor removal, and flattening the slab are often the lines that surprise people who priced only the box.',
      },
      {
        title: 'How far it runs',
        body: 'One room is a different job from a first floor that passes through three doorways and meets tile in the bath. Transitions are part of the scope.',
      },
    ],
    ranges: [
      { label: 'Sheet vinyl, a small bath or laundry', range: '$800 to $2,200' },
      { label: 'LVP in one room, about 200 sq ft', range: '$1,200 to $2,800' },
      { label: 'LVP across a first-floor living area', range: '$4,000 to $9,000' },
    ],
    rangeNote: rangeNote('vinyl flooring'),
    faqs: [
      {
        q: 'What does vinyl flooring typically cost in Houston?',
        a: 'Sheet vinyl in a small bath or laundry often plans at $800 to $2,200. Luxury vinyl plank in a room of about 200 square feet often plans at $1,200 to $2,800. A first-floor living area often plans at $4,000 to $9,000. Heavy slab prep is extra. These are typical planning ranges, not a quote.',
      },
      {
        q: 'Is waterproof vinyl safe in a shower?',
        a: 'No. A plank that survives a spill is not a shower assembly. Showers want a sloped, waterproofed tile floor. We will say so if that is the room you are asking about.',
      },
      {
        q: 'Glue-down or click-lock on a Houston slab?',
        a: 'Glue-down is often steadier where the slab sees sun and temperature swings. Click-lock needs the flatness and the expansion space the product lists. We check the floor and then we choose, and we tell you why before the material is ordered.',
      },
      {
        q: 'Will an HOA or the city care about new vinyl?',
        a: 'An interior vinyl floor is a finish. It is rarely a permit and rarely an HOA review. If we uncover a leak or a structural problem while the old floor is up, we stop and show you before that becomes a different project.',
      },
    ],
  },
  'laminate-flooring': {
    moreIntro: [
      'Laminate is a wood-look floor for bedrooms, halls, and living rooms, with a faster install than a site-finished hardwood. The core is a wood product. If it stays wet, it swells, and a swollen joint does not return to flat when the room dries. That is the limit, and it is why we do not put ordinary laminate in a bath.',
      'Underlayment quiets the floor and takes up a small irregularity. It does not fix a badly uneven slab. We check the concrete in a newer Katy, Cinco Ranch, Pearland, or Magnolia house before the planks are ordered.',
    ],
    moreLocal: [
      'Houston humidity is less dramatic for laminate than for solid hardwood, and it is not irrelevant. A floating floor still needs expansion space, and a wet mop that leaves water standing at the joints will swell the core. Water-resistant laminates exist. They are still not a shower floor, and they are still a poor choice where a supply line has a history of leaking.',
    ],
    factorsHeading: 'A floating floor on a Gulf-Coast slab.',
    factorsIntro:
      'Laminate earns its place in dry rooms. The slab under a newer suburban house, and the moisture in the air, still set the rules for how it is installed.',
    factors: [
      {
        title: 'Where it belongs',
        body: 'Bedrooms, halls, and living rooms are the fit. A kitchen can work with a water-resistant product and a household that wipes spills up. A bath or a laundry that floods is a tile or vinyl conversation. We would rather say that at the visit than after the joints have swollen.',
      },
      {
        title: 'The slab',
        body: 'Newer houses west and south of town are slab. Laminate floats on underlayment over that concrete. High spots telegraph. A moisture issue in the slab is addressed before the first row, because the core will not forgive water from below any more than water from a mop.',
      },
      {
        title: 'Older wood subfloors',
        body: 'A pier-and-beam house can take laminate over a sound, flat subfloor. Squeaks and a soft spot are fixed first. Covering them with a floating floor makes them harder to reach and does not make them quieter in the way people hope.',
      },
      {
        title: 'Permits',
        body: 'Laminate is a finish floor. It does not usually need a permit, and an HOA does not usually review it. Structure we find under a soft spot is a different question, and we will separate that scope.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the room, the subfloor, and how much water the room actually sees. You choose the plank. We say if laminate is the right family of floor or if vinyl or tile fits the room better.',
      },
      {
        title: 'Plan',
        body: 'The product, the underlayment, and the transitions are chosen. Door clearances are checked. If you want a repair of a few planks, we confirm the click system and the color are still available.',
      },
      {
        title: 'Prepare',
        body: 'The floor is flattened and dried. Base is planned. Underlayment is the one the plank calls for, not a generic foam chosen only because it was on sale. The room is empty enough to keep the rows straight.',
      },
      {
        title: 'Build',
        body: 'Planks are clicked or glued in the method specified, staggered, with expansion space at the walls. Rows run so the joints do not stack and the doorway cuts look intended. We do not force a tight joint against a wall that will pinch the floor in August.',
      },
      {
        title: 'Finish',
        body: 'Transitions, base or shoe, and the doors go back. A floating floor is not fastened to the slab, so the trim is what covers the expansion gap. That trim is part of the job.',
      },
      {
        title: 'Walk through',
        body: 'We walk the floor with you and go over cleaning: damp, not wet. You see the transitions at the hall and the bath. Spills get wiped up. Standing water is how this floor fails.',
      },
    ],
    signsHeading: 'Signs laminate fits, or does not.',
    signs: [
      {
        title: 'You want a wood look in the bedrooms',
        body: 'Dry rooms in a newer house are the ordinary laminate project. The install is quicker than a sanded hardwood, and the upkeep is straightforward if the floor stays dry.',
      },
      {
        title: 'Joints are swollen at the door',
        body: 'Swollen joints mean the core got wet. Those planks do not press flat again. If the subfloor is dry and the product matches, a section can be replaced. If the leak is ongoing, the leak is the project.',
      },
      {
        title: 'The floor sounds hollow or rocks',
        body: 'A dip in the slab, or no underlayment where the product wanted it, shows up as a soft spot underfoot. The fix is the substrate, then the plank.',
      },
      {
        title: 'You are about to put it in a bath',
        body: 'That is the sign to stop and choose tile or a vinyl made for that room. We will say so during the consult rather than sell the plank and the replacement.',
      },
    ],
    materialsHeading: 'The plank, the core, and the pad.',
    materialsIntro:
      'Laminate is a wear layer, a printed design, and a core. The core is what fails when the floor stays wet. The underlayment is what the slab feels like under your feet.',
    materials: [
      {
        title: 'Standard laminate',
        body: 'A practical wood-look floor for bedrooms and living rooms. The wear layer takes traffic. The core is not waterproof. Joints are the weak line if water sits. It is a good floor in the rooms it was made for.',
      },
      {
        title: 'Water-resistant options',
        body: 'Some laminates are built to handle splashes better than a traditional core. They still swell if water sits, and they are still the wrong assembly for a shower. We read the product limits with you before you rely on the word resistant.',
      },
      {
        title: 'Underlayment',
        body: 'It quiets the floor and handles a minor texture in the concrete. It is specified for the plank. A thick pad under a product that did not ask for one can make the joints flex. We follow the product, not a guess.',
      },
      {
        title: 'Transitions',
        body: 'At tile, at a doorway, and at a slider, the height change has to be a piece, not a ramp of caulk. Older houses have more of these height changes. They are measured during the plan.',
      },
    ],
    costHeading: 'What laminate tends to cost.',
    costIntro: [
      'Laminate is often the lower material cost in a wood-look floor. Prep, transitions, and furniture moving are the rest of the number. A water-resistant product sits toward the high end of these ranges.',
    ],
    costFactors: [
      {
        title: 'Rooms and square feet',
        body: 'A bedroom is a different day from a living room and a hall with three doorways. Each doorway is a transition and a cut.',
      },
      {
        title: 'The product',
        body: 'Thickness, the wear layer, and a water-resistant core change the box price. The install labor changes less than the material does.',
      },
      {
        title: 'Slab prep',
        body: 'A flat bedroom slab is underlayment and plank. A wavy floor is patching first. Removal of an old glued floor is its own line.',
      },
    ],
    ranges: [
      { label: 'A bedroom or two', range: '$1,000 to $2,800' },
      { label: 'Living room and hall', range: '$2,500 to $6,500' },
      { label: 'Water-resistant laminate, living area and hall', range: '$3,000 to $7,500' },
    ],
    rangeNote: rangeNote('laminate flooring'),
    faqs: [
      {
        q: 'What does laminate flooring typically cost in Houston?',
        a: 'A bedroom or two often plans at $1,000 to $2,800. A living room and hall often plans at $2,500 to $6,500. A water-resistant product usually sits toward the high end of those ranges. Slab repair and removing a glued-down floor are extra. These are typical planning ranges, not a quote.',
      },
      {
        q: 'Can laminate go in a Houston bathroom?',
        a: 'We do not recommend it. The core swells when water sits, and a bath is where water sits. Tile, or a vinyl made for that floor, is the better assembly. A kitchen can work if spills are wiped up and the product is chosen for that.',
      },
      {
        q: 'Will underlayment fix an uneven slab?',
        a: 'No. It quiets a floor and takes up a small texture. A ridge or a dip still shows and can break the joints. We check newer slabs in Katy, Cinco Ranch, and Pearland before the planks arrive, and we patch what the product cannot bridge.',
      },
      {
        q: 'Does laminate need a permit or HOA approval?',
        a: 'Not as a finish floor. Interior laminate is outside the usual permit and architectural review. If a soft floor turns into joist repair, that structural work is a separate scope and may be permitted. We will tell you if we find it.',
      },
    ],
  },
};
