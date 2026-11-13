import { notAPublicAdjuster, rangeNote } from '@/lib/service-depth-shared';
import type { ServiceDepth } from '@/lib/service-depth-types';

export const interiorDepth: Record<string, ServiceDepth> = {
  'kitchen-remodeling': {
    moreIntro: [
      'The order of the work is what keeps a kitchen from stalling. Cabinets are ordered to a measured layout. Plumbing and electrical are marked before the boxes arrive. Stone is templated after the cabinets are set and level, because a Heights bungalow and a West University house are rarely square.',
    ],
    moreLocal: [
      'Most of the kitchen stays in use until demolition, so we plan a temporary sink and a clear path through the house before the first cabinet comes out. Protection of the floors and the rooms next door is part of the start, not a cleanup at the end. If a leak is the reason the kitchen is open, drying finishes before new boxes go in. A wet toe kick will swell a new cabinet the same way it ruined the old one.',
    ],
    factorsHeading: 'Humidity, the slab, and the older kitchen.',
    factorsIntro:
      'A Houston kitchen is planned for the house it is in. The same cabinet layout does not behave the same way on a Katy slab and in a pier-and-beam bungalow.',
    factors: [
      {
        title: 'Gulf humidity',
        body: 'Summer air here stays wet. Wood doors and cabinet boxes move with it. We acclimate wood in the house before it is cut, and we talk through the box before it is ordered. A box that survives a splash is a different product from one that swells at the dishwasher.',
      },
      {
        title: 'Slab or pier-and-beam',
        body: 'Most Katy, Cinco Ranch, and Woodlands kitchens sit on a concrete slab. A leak under the dishwasher has a flat path into the toe kicks, and moving a drain means cutting concrete. Many older Heights bungalows are pier-and-beam, so the floor may be out of level and the plumbing may be reachable from the crawl space. We look before we say a sink can move.',
      },
      {
        title: 'Out-of-square rooms',
        body: 'Houses inside the Loop, and plenty of houses that are not, are out of square. Fillers, scribes, and a template taken from the cabinets that are actually set are what make the stone and the tile look intentional. A factory rectangle drawn from a catalog width will show at the wall.',
      },
      {
        title: 'Permits and HOAs',
        body: 'Inside the City of Houston, a permit is generally part of the job when plumbing, electrical, or structure changes. A finish update that leaves those in place often does not. Katy, Bellaire, West University, and unincorporated Harris or Montgomery County run their own rules, and a Katy mailing address is not always the City of Katy. An interior kitchen is rarely an HOA review. A change you can see from the street can be. We say which case it is after we see the address and the plan.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We walk the kitchen, measure it, and look at the wet wall, the floor, and whether a wall you want opened is carrying load. You tell us how you cook and who gathers. We say what the house will allow before we promise a new footprint.',
      },
      {
        title: 'Plan',
        body: 'Layout, cabinets, stone, tile, and light are settled with a budget beside them. Appliances are chosen before the boxes are ordered, so the openings match.',
      },
      {
        title: 'Prepare',
        body: 'We protect the rest of the house, then demolish only what the plan removes. If the opening shows rot or a previous leak, we stop and show you before the scope grows.',
      },
      {
        title: 'Build',
        body: 'Rough plumbing and electrical go in to the new layout. Cabinets are set and leveled. The countertop is templated from those boxes, not from the old ones. Tile, the backsplash, and the floor follow the stone so the joints meet.',
      },
      {
        title: 'Finish',
        body: 'Hardware, the sink, lighting, and paint close the room. Doors are adjusted after the boxes have sat in the house.',
      },
      {
        title: 'Walk through',
        body: 'We clean up and walk the kitchen with you. Adjustments are written down before we call the room done.',
      },
    ],
    signsHeading: 'Signs the kitchen is due.',
    signs: [
      {
        title: 'The layout fights the cooking',
        body: 'You walk around an island that is too big, or you cannot open the oven and a drawer at the same time. A remodel starts with that path, not with a new paint color.',
      },
      {
        title: 'Doors and drawers have given up',
        body: 'Boxes that sag, particle board that has swollen at the sink, or doors that will not stay shut through a Houston summer are telling you the cabinets are the project.',
      },
      {
        title: 'Water has already been in the toe kicks',
        body: 'A soft floor in front of the sink, a stained cabinet end, or a dishwasher that has leaked more than once is a repair and a remodel at the same time. The wet material comes out before a new box goes in.',
      },
      {
        title: 'The room is closed off from the house',
        body: 'A wall between the kitchen and the table is a common ask in Bellaire, the Heights, and West University. It is also the ask that depends on structure. We measure before we say the wall can go.',
      },
    ],
    materialsHeading: 'Cabinets, stone, tile, and light.',
    materialsIntro:
      'The visible choices are the cabinets, the counter, the backsplash, and the light. Each one has a practical side in this climate.',
    materials: [
      {
        title: 'Cabinet boxes',
        body: 'Stock, semi-custom, and custom boxes differ in size, finish, and what you can change. Plywood boxes handle a splash better than particle board, which matters in a humid kitchen and under a sink. We talk through the box, the door style, and the hardware before the order, including how tall the uppers should be for the people who cook here.',
      },
      {
        title: 'Countertops',
        body: 'Quartz, granite, marble, and solid surface are the materials we install. Quartz asks less day to day. Granite is stone and is usually sealed. Marble can etch from lemon and wine. Solid surface can be seamed and repaired differently. The edge, the overhang, and the sink cutout are decided with the layout.',
      },
      {
        title: 'Backsplash and floor',
        body: 'The backsplash is laid out so the pattern centers on the range or the hood, including on a short inside-the-Loop wall. The floor is chosen for water and for the rooms it has to meet. A transition at the hall is part of the kitchen, not an afterthought.',
      },
      {
        title: 'Light and power',
        body: 'Pendants, under-cabinet light, and the circuits for the appliances are planned before the drywall closes. A new range or a heavier microwave can need a different circuit. That is an electrical question we flag during the layout, not on installation day.',
      },
    ],
    costHeading: 'What a Houston kitchen tends to cost.',
    costIntro: [
      'There is no single kitchen price for Houston. A same-layout finish update, a layout that moves the sink or a wall, and a full gut are different jobs. The ranges below match the planning ranges on our kitchen cost guide.',
      'Cabinets are usually the largest line. Stone, tile, appliances you ask us to set, and any plumbing or electrical move are the lines that push a project from one range into the next.',
    ],
    costFactors: [
      {
        title: 'Size and runs',
        body: 'A galley and a room that opens to the rest of the house are different amounts of cabinet, counter, and floor. The island, if there is one, is its own run.',
      },
      {
        title: 'How far the layout moves',
        body: 'Keeping the sink and the range put costs less than moving a drain, a wall, or the path through the room. On a slab, a moved drain is concrete work.',
      },
      {
        title: 'What demolition uncovers',
        body: 'Soft floor, a previous leak, or wiring that cannot serve the new appliances changes the scope. We show you that before the job grows past the kitchen we priced.',
      },
    ],
    ranges: [
      { label: 'Same layout, new finishes', range: '$25,000 to $55,000' },
      { label: 'Layout change', range: '$40,000 to $80,000' },
      { label: 'Full gut', range: '$70,000 to $135,000' },
    ],
    rangeNote: rangeNote('a kitchen remodel'),
    insurance: {
      heading: 'When a leak is the reason for the remodel.',
      paragraphs: [
        'Some kitchens open because a supply line or a dishwasher has already ruined the boxes. That is a drying job and a rebuild. We do not start new cabinets over wet material. Photos of what was wet and what went back are yours to share with your insurer.',
        'A planned remodel, with no sudden loss, is not a claim. If water is the cause, say so on the first call. A sudden pipe break is often treated differently from a slow leak or from floodwater. The policy decides.',
        notAPublicAdjuster,
      ],
    },
    faqs: [
      {
        q: 'What does a Houston kitchen remodel typically cost?',
        a: 'A same-layout finish update often plans in the range of $25,000 to $55,000. A layout change often plans at $40,000 to $80,000. A full gut often plans at $70,000 to $135,000. Those are typical planning ranges, not a quote. The visit sets the price.',
      },
      {
        q: 'When does a kitchen remodel need a permit?',
        a: 'Usually when plumbing, electrical, or structure changes. A finish update that leaves those in place often does not. The City of Houston and the suburbs do not share one permit desk, so we name the authority after we see the address.',
      },
      {
        q: 'Will my HOA have to approve the kitchen?',
        a: 'An interior kitchen is rarely an architectural review. A change visible from the street, or an outdoor kitchen, can be. Master-planned communities such as Cinco Ranch and The Woodlands review exterior work even when the city does not. We tell you if we think the plan crosses that line.',
      },
      {
        q: 'How should cabinets be chosen for Houston humidity?',
        a: 'Look at the box, not only the door. Plywood handles a splash better than particle board. Wood is acclimated in the house before it is cut. Doors are adjusted after the boxes have lived in the room, because a Houston summer moves them.',
      },
      {
        q: 'What is different about remodeling a kitchen on a slab?',
        a: 'Drains are often in or under the concrete. Moving the sink means cutting the slab and rerouting the line. A leak also travels sideways under the floor instead of dripping into a crawl space. Pier-and-beam houses, common among older Heights bungalows, give us a different way to reach the plumbing, and a floor that may not be level.',
      },
      {
        q: 'Can the same team rebuild a kitchen after water damage?',
        a: 'Yes. We dry first, then rebuild cabinets, counters, drywall, and the floor. The photos and the scope are yours to share with your insurer. We do not decide coverage.',
      },
    ],
  },
  'bathroom-remodeling': {
    moreIntro: [
      'The sequence in a bath is layout, then waterproofing, then the finish you see. Tile, glass, and a stone niche are only as sound as the wall behind them. We do not set finish tile over a wet wall or over a membrane that was skipped to save a day.',
      'A powder room in West University and a primary bath in Memorial are different sizes and the same kind of decisions: where the water is, where the storage is, and how the light falls when you are actually using the room.',
    ],
    moreLocal: [
      'Houston baths stay damp longer than the shower does. The fan, the window if there is one, and the grout all live in Gulf humidity after we leave. We size the ventilation conversation into the plan, and we choose grout and sealer for a room that does not really dry out between showers. If the bath is open because of a leak behind the tile, the cavity is dried before it is closed.',
    ],
    factorsHeading: 'Water, the slab, and a small older bath.',
    factorsIntro:
      'The climate does not care that a bathroom is a small room. Humidity, the foundation, and the age of the house decide what the layout can do.',
    factors: [
      {
        title: 'Humidity after the shower',
        body: 'The air outside is often too wet to help a bath dry. A fan that actually exhausts, grout that is specified for a wet room, and a membrane behind the tile matter more here than they do in a dry climate. A pretty shower with a soft wall behind it is a leak waiting on a Houston summer.',
      },
      {
        title: 'Moving a drain on a slab',
        body: 'Newer baths in Katy, Cinco Ranch, and The Woodlands are usually on slab. The shower drain is in the concrete. Leaving it put is a smaller job than sliding the shower two feet. Many older Heights bungalows are pier-and-beam, so the drain may be reachable from below, and the floor may need to be leveled before large tile will lie flat.',
      },
      {
        title: 'Tight older rooms',
        body: 'Bellaire, West University, and Heights baths are often small, with a window, a closet, or a stack that limits the glass. We measure the door swing, the ceiling height, and the wet wall before we promise a curbless shower or a double vanity.',
      },
      {
        title: 'Permits',
        body: 'Relocating a drain or adding a circuit is when a permit usually enters a bathroom. A new vanity in the same footprint often does not. Bellaire and West University are their own cities. A Houston mailing address next door is a different desk. We tell you which one applies after we see the plan.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We measure the room, find the wet wall and the drain, and talk through shower, tub, or both. You see what can move and what should stay before we draw a layout.',
      },
      {
        title: 'Plan',
        body: 'Fixtures, tile, glass, the vanity, and the light are chosen together. Waterproofing is in the plan, not an optional line. If a curb, a niche, or a bench is part of the shower, it is drawn before demolition.',
      },
      {
        title: 'Prepare',
        body: 'We protect the hall and the rooms below, then open the walls the plan calls for. What we find in the cavity, including old leaks, is shown to you before we close anything.',
      },
      {
        title: 'Build',
        body: 'Plumbing and electrical are set. The membrane goes on the wet walls and the shower floor. Then the tile, the glass, and the vanity. Large-format tile needs a flat substrate, so the prep is the long part.',
      },
      {
        title: 'Finish',
        body: 'Grout, sealer, hardware, the mirror, and paint close the room. We check the shower for how water leaves, including the curb and the glass, before we call it finished.',
      },
      {
        title: 'Walk through',
        body: 'We clean the room and walk it with you: the shower, the storage, the light, and anything that needs a second look. You sign off on the room you will use every day.',
      },
    ],
    signsHeading: 'Signs the bathroom needs more than a faucet.',
    signs: [
      {
        title: 'The shower is the problem',
        body: 'Failed grout, a soft spot at the curb, or tile that sounds hollow is the wall telling you water is already behind the finish. A new valve trim will not fix that.',
      },
      {
        title: 'The layout no longer fits',
        body: 'A tub you never use, a vanity that blocks the door, or a shower you cannot turn around in are layout problems. They are solved before the tile is chosen.',
      },
      {
        title: 'The fan does nothing',
        body: 'Paint that peels, a ceiling that stains at the fan, or a mirror that never clears are humidity problems. In this climate they are part of the remodel, not a separate complaint.',
      },
      {
        title: 'You want one room to do two jobs',
        body: 'A primary bath that needs a separate water closet, or a hall bath that has to serve guests and children, is a planning job. The fixtures follow the plan.',
      },
    ],
    materialsHeading: 'What goes in the wet wall.',
    materialsIntro:
      'The materials you live with are the tile, the fixtures, and the vanity. The materials that keep the house dry are the ones behind them.',
    materials: [
      {
        title: 'Tile and stone',
        body: 'Porcelain is the usual wet-area field because it takes water and stays stable. Ceramic, mosaic, and patterned floors need a planned layout. Marble and other stone are a different care conversation, especially on a shower floor. Large-format tile shows every ridge, so the wall has to be flat first.',
      },
      {
        title: 'Waterproofing',
        body: 'A membrane on the shower walls and floor, carried to the right height and detailed at the valve, the niche, and the curb, goes in before finish tile. It is not a coat of paint behind the grout. We treat it as part of the shower, because it is.',
      },
      {
        title: 'Fixtures and glass',
        body: 'A tub, a tiled shower, or both. Frameless glass needs a wall that is in plane. A curb, a bench, and a niche are built with the waterproofing, not screwed on afterward. The valve is chosen with the trim you want to see.',
      },
      {
        title: 'Vanity, mirror, and light',
        body: 'Storage, the mirror, and the sconces are planned as one wall so a small powder room still feels finished. A floating vanity and a furniture-style vanity need different blocking. We set that before the drywall closes.',
      },
    ],
    costHeading: 'What a Houston bathroom tends to cost.',
    costIntro: [
      'A powder-room refresh and a primary bath that moves the shower are not the same price. The ranges below are the same planning ranges we publish on the bathroom cost guide.',
      'Tile, glass, and a moved drain are the usual reasons a bath leaves the smaller range. Waterproofing is inside the shower scope. It is not a line you skip and keep the same result.',
    ],
    costFactors: [
      {
        title: 'What the room has to do',
        body: 'A powder room, a hall bath, and a primary suite are different amounts of tile, glass, and fixture. Square footage matters less than the wet wall.',
      },
      {
        title: 'Whether the drain stays',
        body: 'A shower rebuilt in the same place costs less than a shower in a new place. On a slab, the new place is a concrete cut.',
      },
      {
        title: 'The finish you choose',
        body: 'A stock vanity and a simple porcelain field are a different scope from a custom vanity, large-format stone, and frameless glass. We price the set you actually pick.',
      },
    ],
    ranges: [
      { label: 'Vanity and finish refresh', range: '$6,000 to $15,000' },
      { label: 'Shower rebuild, same layout', range: '$12,000 to $25,000' },
      { label: 'Full remodel with plumbing moves', range: '$30,000 to $65,000' },
    ],
    rangeNote: rangeNote('a bathroom remodel'),
    insurance: {
      heading: 'A leak behind the tile is a different job.',
      paragraphs: [
        'If the bath is open because water has been in the wall, we map the moisture, dry the cavity, and then rebuild. New tile over a damp stud is how the same stain comes back. Photos of the opening, the drying, and the rebuild are the record.',
        'A remodel you planned, with no sudden loss, is paid as construction. If a supply line or a failed valve is the cause, your insurer may look at it differently from a long slow leak. We do not know your form.',
        notAPublicAdjuster,
      ],
    },
    faqs: [
      {
        q: 'What does a Houston bathroom remodel typically cost?',
        a: 'A vanity and finish refresh often plans at $6,000 to $15,000. A shower rebuilt in the same layout often plans at $12,000 to $25,000. A full remodel that moves plumbing often plans at $30,000 to $65,000. Those are typical planning ranges, not a quote.',
      },
      {
        q: 'Why does waterproofing come before the tile?',
        a: 'Because the tile and the grout are the finish, not the waterproofing. In Houston humidity a shower that relies on grout alone will put water in the wall. The membrane is detailed at the valve, the niche, and the curb, then the tile goes on.',
      },
      {
        q: 'Can you move a shower in a slab house?',
        a: 'Often, yes, and it is more work than leaving the drain where it is. The slab is cut, the line is rerouted, and the concrete is patched before the new pan is built. In a pier-and-beam house we may reach the drain from below. We say which one you have after the visit.',
      },
      {
        q: 'Do I need a permit to remodel a bathroom?',
        a: 'Often when the plumbing moves or a new circuit is added. A refresh that keeps the drains and the electrical in place may not. West University, Bellaire, Houston, and the county are not the same permit office.',
      },
      {
        q: 'How does humidity show up after the remodel?',
        a: 'In the fan, the ceiling, and the grout. We talk about exhaust during the plan, and we specify grout and sealer for a room that stays damp. A window that does not open is not a substitute for a fan in July.',
      },
      {
        q: 'Can you rebuild a bath after a leak in the wall?',
        a: 'Yes. Drying comes first. Tile, the vanity, and drywall follow once the readings support it. We photograph the conditions and the repair. Your insurer decides what the policy pays.',
      },
    ],
  },
  backsplash: {
    moreIntro: [
      'A backsplash fails in the layout, not in the grout color. We dry-lay the pattern so the repeat centers on the range, the hood, or the window, and so the cuts do not pile up at the end of a short run. Outlet covers, the vent, and the window stool are part of that drawing.',
      'The wall behind an old backsplash is not always sound. We find that when the old tile comes off, and we say so before the new field goes up.',
    ],
    moreLocal: [
      'Houston kitchens throw grease, steam, and a wet sponge at this wall every night. Grout and sealer are chosen so the field can be wiped down. A porous stone next to the range is a care conversation we have before the tile is ordered, not after the first tomato sauce.',
    ],
    factorsHeading: 'A short wall, a wet climate, and a working kitchen.',
    factorsIntro:
      'The backsplash is small. The house around it still decides the layout, the cuts, and whether the wall behind the old tile can take a new one.',
    factors: [
      {
        title: 'Short inside-the-Loop runs',
        body: 'Heights, Bellaire, and West University kitchens often have a short wall between a window and a tall cabinet. Chevron, herringbone, and a large geometric tile need a repeat that finishes on purpose. We plan the cuts before the thinset is mixed.',
      },
      {
        title: 'Steam and grease',
        body: 'The range wall lives in humidity and in cooking. Glossy ceramic and porcelain wipe down. Natural stone and a handmade tile with an open body may want a sealer, and they will still mark if you treat them like a plastic panel. We match the material to how you cook.',
      },
      {
        title: 'The counter under it',
        body: 'Tile meets stone at a joint that has to be straight even when the old house is not. We set the field after the counter is in, or we protect a counter that is staying. Out-of-square corners get a planned scribe, not a thick caulk line hiding a bad cut.',
      },
      {
        title: 'Outlets and the permit line',
        body: 'A backsplash in the same place, with the same outlets, is usually a finish. Moving an outlet, adding under-cabinet power, or opening the wall for a new hood is when electrical, and sometimes a permit, enters the job. An HOA almost never reviews an interior backsplash.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the wall, the counter, the outlets, and the pattern you want. If the old tile is staying until we know the new layout, we still measure the run and the focal point.',
      },
      {
        title: 'Plan',
        body: 'The repeat is drawn so it centers on the range, the hood, or the window. Edge trim, the inside corners, and the outlet cuts are in that drawing. Grout color and width are chosen with the tile, not after it is on the wall.',
      },
      {
        title: 'Prepare',
        body: 'Old tile comes off with the counter and the cabinets protected. The wall is repaired if the paper or the board is soft. A new backsplash on a soft wall will not stay flat.',
      },
      {
        title: 'Build',
        body: 'We set the field from the layout lines, keep the courses even, and cut the outlets so the plates sit flush. Patterns are checked as they go, not discovered at the last tile.',
      },
      {
        title: 'Finish',
        body: 'Grout, a sealer when the material wants one, and the caulk joint at the counter close the wall. Switch plates go back on. The range wall is wiped down.',
      },
      {
        title: 'Walk through',
        body: 'We look at the focal point, the end cuts, and the joint at the counter with you. You see the wall in the light you cook in, not only in a showroom sample.',
      },
    ],
    signsHeading: 'Signs you need a new backsplash.',
    signs: [
      {
        title: 'The grout is the color of the cooking',
        body: 'Grease and years of wiping stain a field that was never sealed for a working kitchen. Regrout can be enough. A cracked or loose field usually wants to come off.',
      },
      {
        title: 'The pattern was an afterthought',
        body: 'A chevron that dies in a sliver at the window, or a tile that ignores the hood, is a layout problem. The fix is a new layout, not a darker grout.',
      },
      {
        title: 'The counter changed and the wall did not',
        body: 'New stone against an old four-inch backsplash is a common leftover. The joint, the height, and the outlet covers are what make the new counter look finished.',
      },
      {
        title: 'Tile is loose at the sink',
        body: 'Movement at the sink is often a soft wall or a long leak, not a bad grout color. We open that area and say whether the repair is the tile or the wall behind it.',
      },
    ],
    materialsHeading: 'Tile that has to live over a range.',
    materialsIntro:
      'Ceramic, porcelain, glass, marble, and other stone are all set here. They do not all behave the same way next to a burner.',
    materials: [
      {
        title: 'Ceramic and porcelain',
        body: 'The usual working-kitchen field. Porcelain is denser. Both can take a subway layout, a larger field, or a pattern. The edge piece, bullnose or a metal trim, is chosen before the first course so the end of the run is finished.',
      },
      {
        title: 'Glass',
        body: 'Glass shows the thinset color and every trowel line. It wants a flat wall and a layout that respects the outlets. It wipes down well. It also shows chips, so the cuts at the switch plates have to be clean.',
      },
      {
        title: 'Marble and stone',
        body: 'A stone backsplash next to a stone counter can look like one idea or like two slabs arguing. We coordinate the joint, the sealer, and the care. Acid from cooking will mark marble. That is a property of the stone, and we say so.',
      },
      {
        title: 'Pattern and handmade tile',
        body: 'Herringbone, chevron, and a handmade field with size variation need a looser joint and a patient layout. On a short wall the variation is the design only if the cuts are planned. We dry-lay before we set.',
      },
    ],
    costHeading: 'What a backsplash tends to cost.',
    costIntro: [
      'The price is the square feet, the pattern, the condition of the wall, and how many outlets and corners the run has. A straight porcelain field on a sound wall is a different day from a herringbone in stone on a wall that needs repair.',
    ],
    costFactors: [
      {
        title: 'Pattern and cuts',
        body: 'A stacked field sets faster than a chevron or a mosaic. Outlet cuts, a window, and inside corners add time on a short kitchen wall.',
      },
      {
        title: 'The wall behind',
        body: 'A sound wall is prep and thinset. A soft wall is drywall repair before any tile. We do not price the repair until the old tile is off, and we tell you before we do it.',
      },
      {
        title: 'Material',
        body: 'Standard ceramic or porcelain is the lower range. Glass, marble, and a handmade tile with a lot of variation sit higher, both in the material and in the setting.',
      },
    ],
    ranges: [
      { label: 'Regrout and seal an existing field', range: '$400 to $1,200' },
      { label: 'Ceramic or porcelain, a typical kitchen run', range: '$1,200 to $3,500' },
      { label: 'Stone, glass, or a complex pattern', range: '$2,500 to $6,000' },
    ],
    rangeNote: rangeNote('a kitchen backsplash'),
    faqs: [
      {
        q: 'What does a Houston backsplash typically cost?',
        a: 'Regrouting and sealing an existing field often plans at $400 to $1,200. A ceramic or porcelain run on a typical kitchen wall often plans at $1,200 to $3,500. Stone, glass, or a complex pattern often plans at $2,500 to $6,000. Those are typical planning ranges, not a quote.',
      },
      {
        q: 'Do I need a permit for a backsplash?',
        a: 'Replacing tile and leaving the outlets where they are is usually a finish. Moving outlets or adding circuits is electrical work, and that is when a permit is more likely. We say which one the plan is.',
      },
      {
        q: 'Can you center a pattern on a short Heights wall?',
        a: 'Yes, and that is the reason for a dry layout. A short run between a window and a cabinet will show a bad cut immediately. We place the repeat on the hood or the range so the ends are deliberate.',
      },
      {
        q: 'Will Houston steam stain the grout?',
        a: 'It will stain a grout and a stone that were not chosen for a working kitchen. We pick grout width, grout type, and a sealer for the tile you want, and we tell you what still has to be wiped up the night you cook.',
      },
    ],
  },
  countertops: {
    moreIntro: [
      'A slab is templated from the cabinets that are set and level, not from a drawing of the kitchen you wish you had. Seams, the sink cutout, the cooktop cutout, and the overhang are marked on that template. In an out-of-square house, that step is the difference between a counter that looks built and a counter that looks trimmed with caulk.',
      'We compare granite, quartz, marble, and solid surface for how you cook and how much care you want to give the surface. The showroom light and the light in a Memorial kitchen are not the same light.',
    ],
    moreLocal: [
      'Houston humidity is a quiet part of the choice. A wood edge or a butcher-block section moves. Stone does not move the same way, but the cabinets under it do. We want the boxes set, fastened, and done moving before the template appointment, so the seams stay where we drew them.',
    ],
    factorsHeading: 'The room the slab has to fit.',
    factorsIntro:
      'The material is half the decision. The other half is the kitchen it has to sit in, including how square the room is and what the foundation is doing under the cabinets.',
    factors: [
      {
        title: 'Out-of-square older kitchens',
        body: 'Heights, Bellaire, and West University counters rarely meet a square corner. A template taken on site is what makes the overhang even and the splash tight. We do not order a factory rectangle and hope the wall agrees.',
      },
      {
        title: 'Islands in newer plans',
        body: 'Katy, Cinco Ranch, and Woodlands kitchens often put the seating on a large island. The overhang, the support, and the seam are structural as well as visual. A waterfall edge is a different fabrication from an eased edge, and it is decided before the slab is cut.',
      },
      {
        title: 'Weight and the cabinet',
        body: 'Stone is heavy. The boxes have to be set and supported before it arrives, including at an overhang where people sit. A slab house and a pier-and-beam house both need level cabinets. The pier-and-beam floor may need shimming so the boxes are level even when the old floor is not.',
      },
      {
        title: 'Permits and the sink',
        body: 'Swapping a counter and setting the same sink back in the same cabinet is usually a finish. Moving the sink, and with it the drain, is plumbing. On a slab that can mean cutting concrete. That is when a permit is more likely. An HOA does not usually review an interior counter.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the cabinets, the sink, the cooktop, and how you use the surface. You compare materials for care and for the light in the room. Chips in an existing top are assessed if a repair is the real question.',
      },
      {
        title: 'Plan',
        body: 'Edge profile, thickness, seams, and the splash are chosen. The sink and the faucet are selected before the template so the cutout matches the bowl. An overhang that will hold seats is drawn with the support it needs.',
      },
      {
        title: 'Prepare',
        body: 'Cabinets are set, leveled, and fastened. Old tops come off with the sink protected if it is staying. The room is clear for the template, because a tape measure over a crooked old counter is not a template.',
      },
      {
        title: 'Build',
        body: 'The template is taken from the finished boxes. Fabrication follows that pattern, including the sink and cooktop cutouts. Installation sets the slabs, aligns the seams, and sets the sink.',
      },
      {
        title: 'Finish',
        body: 'Seams are finished, the sink is connected, and the joint at the wall is closed. A stone that wants sealer gets it. We wipe the surface down and look at the overhang in the light you will use.',
      },
      {
        title: 'Walk through',
        body: 'We walk the seams, the cutouts, and the edges with you. Care for the material you chose is part of that conversation, including what will etch marble and what quartz will shrug off.',
      },
    ],
    signsHeading: 'Signs the counters are the project.',
    signs: [
      {
        title: 'The seams and the wall have parted',
        body: 'A gap at the backsplash or a seam that has opened is often the house or the boxes moving. A new top on unlevel cabinets will open the same way.',
      },
      {
        title: 'The surface no longer fits the cooking',
        body: 'Etched marble you are tired of babying, a laminate seam at the sink, or a cooktop cutout for an appliance you replaced are reasons to retop, not to live with the old one.',
      },
      {
        title: 'The island is too shallow to use',
        body: 'An overhang that hits your knees, or a seating side with no support, is a layout problem we can see. The new top is templated to the overhang you actually want.',
      },
      {
        title: 'A chip or a crack at the sink',
        body: 'Some chips can be repaired. A crack that runs, or a top that has swollen at the dishwasher, is usually a replacement. We look before we recommend either one.',
      },
    ],
    materialsHeading: 'Granite, quartz, marble, and solid surface.',
    materialsIntro:
      'These are the counters we install. The right one is the one you will cook on, not the one that looked quiet in a sample box.',
    materials: [
      {
        title: 'Quartz',
        body: 'A manufactured surface with a consistent pattern and very little day-to-day care. It is not porous the way granite is. Heat still belongs on a trivet. Seams are planned so the pattern does not break in the middle of the island if we can avoid it.',
      },
      {
        title: 'Granite',
        body: 'Natural stone, so the slab you reserve is the slab you get. It is usually sealed. It will take more heat than quartz and it will still mark if the sealer is ignored for years. We look at the actual slab for pits, fissures, and where the vein will land on the island.',
      },
      {
        title: 'Marble',
        body: 'The care is the decision. Acid etches it. Water spots show. Many Houston kitchens still choose it for the look, and we will install it, with an honest conversation about the sink and the range. A honed finish hides etching differently than a polish.',
      },
      {
        title: 'Solid surface',
        body: 'An even color, a seam that can be less visible, and a sink that can sometimes be integrated. It scratches differently from stone and it can often be repaired in place. It is a practical top in a laundry, a bath, or a kitchen that wants a quieter surface.',
      },
    ],
    costHeading: 'What Houston countertops tend to cost.',
    costIntro: [
      'A typical kitchen, not a huge island with two waterfalls, is the picture behind these ranges. The slab price, the edge, the number of cutouts, and a second trip for a complicated seam are what move a job inside the range.',
    ],
    costFactors: [
      {
        title: 'Material and the slab',
        body: 'A standard quartz or granite is a different number from a thick marble or a slab chosen for a specific vein. The remnant and the full slab are not the same purchase.',
      },
      {
        title: 'Edges, seams, and cutouts',
        body: 'An eased edge is simpler than a waterfall or a miter. Every sink, faucet hole, and cooktop cutout is time in the shop and risk in the slab.',
      },
      {
        title: 'The cabinets under it',
        body: 'A template on level boxes is one visit. Boxes that have to be reset, or a sink that moves, are a different scope and can pull plumbing into the price.',
      },
    ],
    ranges: [
      { label: 'Solid surface, a typical kitchen', range: '$1,800 to $4,500' },
      { label: 'Granite or quartz, a typical kitchen', range: '$3,500 to $9,000' },
      { label: 'Marble or a waterfall island', range: '$6,000 to $14,000' },
    ],
    rangeNote: rangeNote('countertops'),
    faqs: [
      {
        q: 'What do new kitchen countertops typically cost in Houston?',
        a: 'Solid surface on a typical kitchen often plans at $1,800 to $4,500. Granite or quartz often plans at $3,500 to $9,000. Marble, or an island with a waterfall edge, often plans at $6,000 to $14,000. Those are typical planning ranges, not a quote. A bath vanity is usually less stone and a smaller number.',
      },
      {
        q: 'Why is the template taken after the cabinets are set?',
        a: 'Because the slab is cut to the boxes that are actually there. Older Houston kitchens are out of square. If we template too early, the seams and the overhangs move when the boxes are leveled.',
      },
      {
        q: 'Does a new countertop need a permit?',
        a: 'Not when the sink stays put and no plumbing moves. Moving the sink is plumbing, and on a slab it can mean cutting the concrete. That is the point where a permit is more likely.',
      },
      {
        q: 'Which surface handles a busy Houston kitchen?',
        a: 'Quartz and granite ask less day to day than marble. Solid surface is the quieter, more repairable option. Humidity does not etch stone, but it does move the wood around the top, so the boxes are set before we template. We walk through care in your kitchen before the slab is ordered.',
      },
    ],
  },
  carpentry: {
    moreIntro: [
      'Finish carpentry is the part of a remodel people touch: casing, a stair, a built-in, a scribe against a wall that is not straight. Structural carpentry is the part they should not have to think about, and it is the part we inspect before we cut a wall in a 1940s bungalow or open a soffit in a two-story.',
      'Wood is acclimated in the house before it is milled. Houston humidity will move a board that was cut in a warehouse and installed the same afternoon. We give it time in the room it has to live in.',
    ],
    moreLocal: [
      'Older profiles in the Heights, Rice Village, and West University are often worth matching. Newer rooms in Memorial, Katy, and The Woodlands often need the opposite: a casing or a built-in that gives a plain wall a point of view. We do not put a heavy colonial casing in a bungalow that has a simple stick profile, unless that is the change you asked for.',
    ],
    factorsHeading: 'Old profiles, new rooms, and the wall you want opened.',
    factorsIntro:
      'Carpentry in Houston is either a match to what the house already has, or a new piece in a room that never had one. The structure behind the drywall decides which walls can change.',
    factors: [
      {
        title: 'Humidity and the wood',
        body: 'Trim, stair treads, and a built-in move when the air conditioning runs all summer and the door opens onto wet air. We acclimate stock in the house and we finish it for that movement. A joint that is tight in March can open in August if the wood never lived here first.',
      },
      {
        title: 'Bungalow structure',
        body: 'Many older Heights houses are pier-and-beam, with plaster, and with walls that have been opened before. A wall you want removed may be bearing, and the floor under a new opening may not be level. We inspect before we cut. A newer Katy or Woodlands house is usually slab and platform framing, which is a different opening and a different header.',
      },
      {
        title: 'Matching the profile',
        body: 'Casing, base, and a stair skirt in an older house are often a profile you cannot buy off the rack in the same dimension. We can usually match it, or blend a new piece so the room still reads as one. Bringing a sample of the old profile to the conversation saves a wrong order.',
      },
      {
        title: 'Permits when the wall changes',
        body: 'A bookshelf and a run of base are usually finishes. Opening a bearing wall, changing a header, or altering the stair structure is when a permit usually applies. The City of Houston, Bellaire, West University, and the county do not use one form. An interior built-in is rarely an HOA item.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the existing trim, the stair, or the wall you want changed. Bearing walls, previous patches, and the floor level are part of that look. You say what should match the house and what should be new.',
      },
      {
        title: 'Plan',
        body: 'Profiles, species, and the finish are chosen. A built-in is drawn to the alcove, including shelves, the scribe, and how it meets the base. If a wall opens, the header and the temporary support are in the plan before demolition.',
      },
      {
        title: 'Prepare',
        body: 'The room is protected. Wood is in the house acclimating. If we are opening structure, the temporary shoring goes in before the studs come out. Plaster dust and old floors are treated as the house they are, not as a new build.',
      },
      {
        title: 'Build',
        body: 'Framing, then the finish. Joints are cut to the wall that is there, including out-of-square corners. Stairs, rails, and built-ins are built to the opening, not to a nominal dimension from a plan that ignored the plaster.',
      },
      {
        title: 'Finish',
        body: 'Nail holes, caulk at the paint grade, and the stain or the primer close the work. Paint-grade and stain-grade are different standards, and we agree which one you are buying before the wood is ordered.',
      },
      {
        title: 'Walk through',
        body: 'We walk the joints, the doors, and the stair with you. A door that rubs, a scribe that gaps, or a rail that moves is adjusted while we are there.',
      },
    ],
    signsHeading: 'Signs the carpentry is the real work.',
    signs: [
      {
        title: 'The trim no longer matches the room',
        body: 'A remodel that stopped at the casing, or a patch of new base against old, reads as unfinished. Matching the profile, or replacing the run, is the fix.',
      },
      {
        title: 'The stair feels loose',
        body: 'A tread that rocks, a rail that moves, or a skirt that has opened is a safety and a finish question. We look at the structure before we nail a squeak and call it done.',
      },
      {
        title: 'You want storage the room never had',
        body: 'An alcove in an older house, or a blank wall in a newer one, can take shelves or a closet. The built-in is sized to that wall, including the base and the ceiling that are not parallel.',
      },
      {
        title: 'A wall is in the way',
        body: 'Opening a kitchen to the dining room is a carpentry question before it is a cabinet question. We identify what the wall is holding up, then we talk about the beam and the permit.',
      },
    ],
    materialsHeading: 'Paint grade, stain grade, and the structure.',
    materialsIntro:
      'The wood you see and the framing you do not are specified separately. Mixing them up is how a finish job gets priced like a structural one, or the other way around.',
    materials: [
      {
        title: 'Paint-grade trim',
        body: 'Poplar, primed pine, and MDF behave differently in humidity. MDF swells if it gets wet, so it is a poor choice at a tub or a mop joint. We say where each one belongs and we caulk and prime for paint.',
      },
      {
        title: 'Stain-grade and matching',
        body: 'Oak, maple, and a species already in the house are chosen so the stain can meet the floor or the stair. A perfect species match still needs the finish blended. If the old varnish is worn evenly, refinishing the run often looks better than a single new tread.',
      },
      {
        title: 'Built-ins',
        body: 'Boxes, shelves, and a face frame are built to the alcove. Adjustable shelves, a desk, or a window seat are drawn before we cut. The scribe against plaster is part of the piece, not a trim afterthought.',
      },
      {
        title: 'Framing and headers',
        body: 'Studs, a header, and the hardware for a new opening are sized to the span and to what we find. We do not guess a beam from the width of the doorway. If the opening needs an engineer, we say that before we cut.',
      },
    ],
    costHeading: 'What carpentry tends to cost.',
    costIntro: [
      'Carpentry is a stack of small scopes, not one price. A door and its casing, a room of trim, a built-in, and an opened wall are different jobs. The ranges below are typical planning ranges for those common scopes.',
    ],
    costFactors: [
      {
        title: 'Match or new',
        body: 'Matching an old profile takes more shop time than installing a stock casing. A whole room of new trim is mostly labor and linear feet.',
      },
      {
        title: 'Stairs and rails',
        body: 'A loose tread is not a new stair. Rebuilding treads, the skirt, and a rail is a larger scope, and it is priced after we see what is carrying the stair.',
      },
      {
        title: 'Structure',
        body: 'A non-bearing cased opening and a bearing wall with a beam are not the same number. The beam, the temporary support, and the permit are the difference.',
      },
    ],
    ranges: [
      { label: 'Interior door and casing, each', range: '$400 to $900' },
      { label: 'Finish trim for one room', range: '$1,200 to $3,500' },
      { label: 'Built-in in one alcove', range: '$1,800 to $6,000' },
      { label: 'Stair repair, treads and rail', range: '$1,500 to $5,000' },
    ],
    rangeNote: rangeNote('carpentry'),
    faqs: [
      {
        q: 'What does finish carpentry typically cost in Houston?',
        a: 'A door and casing often plans at $400 to $900 each. Trim for one room often plans at $1,200 to $3,500. A built-in in one alcove often plans at $1,800 to $6,000. Stair tread and rail repair often plans at $1,500 to $5,000. Opening a bearing wall is a separate scope, priced after we see the structure. These are typical planning ranges, not a quote.',
      },
      {
        q: 'Do I need a permit to remove a wall?',
        a: 'If the wall is bearing, or the header and the load path change, a permit is generally required. A furniture built-in against a wall you are not opening usually does not need one. We identify the wall before we schedule the cut, and the city or the county is the authority.',
      },
      {
        q: 'Can you match trim in a Heights or West University house?',
        a: 'Usually, yes. We look at the profile and the proportion before we order a stock piece that is close but wrong. Wood is acclimated in the house so the new joints are not fighting the humidity the week they go in.',
      },
      {
        q: 'Why does wood sit in the house before you cut it?',
        a: 'Because Houston humidity moves lumber. A board milled dry and installed the same day can shrink or swell after the air conditioning and the summer door traffic reach it. Acclimation is how the joints you paid for are still tight in August.',
      },
    ],
  },
  'tile-fireplaces': {
    moreIntro: [
      'In Houston the fireplace is usually the wall the living room is built around, and it is lit on a handful of cold nights. The tile still has to be rated for the opening. We do not set a finish that belongs in a shower against a firebox because the room is mostly for show.',
      'Mantel, panel, and the tile field are planned as one elevation. A surround that is too small disappears in a two-story Woodlands or Katy great room. A surround that ignores the brick already there will look stuck on.',
    ],
    moreLocal: [
      'Older brick boxes in West University, Bellaire, and the Heights can often be retiled once we see what is behind the face and whether the firebox itself is sound. We tile the surround. We do not pretend a new tile face is a chimney rebuild or a gas-line conversion. If that work is needed, we say so and it is its own scope.',
    ],
    factorsHeading: 'A design wall that still has to handle heat.',
    factorsIntro:
      'The climate means the fireplace is rarely the heat. The installation is still detailed for the firebox, the size of the room, and the house the brick is in.',
    factors: [
      {
        title: 'Heat at the opening',
        body: 'Tile, mortar, and grout next to the firebox are specified for heat, even if you light the fireplace a few nights a year. A material that is fine on a floor can fail at the opening. We choose from heat-appropriate options and we say when a sample is the wrong one.',
      },
      {
        title: 'Scale of the room',
        body: 'A Memorial or Woodlands great room can swallow a small surround. A West University living room can be overwhelmed by a floor-to-ceiling slab. We size the field to the wall you see from the sofa, including the mantel height.',
      },
      {
        title: 'Older brick',
        body: 'Inside-the-Loop fireplaces are often brick that has been painted, or a prefabricated box with a brick front. What we can set on top of it depends on the face, the hearth, and whether the firebox is sound. We look before we quote a retile as if the brick were only a color problem.',
      },
      {
        title: 'Permits and the HOA',
        body: 'Retiling a surround, with no change to the gas, the flue, or the structure, is usually a finish. Changing the firebox, adding gas, or altering the chimney is a different permit conversation, and it may not be this scope. An interior surround is rarely an HOA review. A chimney you can see from the street can be.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the firebox, the hearth, the mantel, and the wall around them. You say whether this is a retile or a new elevation. We say if the brick can take tile and if the firebox needs someone else before we cover it.',
      },
      {
        title: 'Plan',
        body: 'The field, the mantel, and any panel or shelving are drawn together. Heat-rated tile and mortar are specified. The hearth extension is checked against the opening so the proportions are intentional.',
      },
      {
        title: 'Prepare',
        body: 'The room is protected. Old tile or a loose face comes off. The substrate is repaired so the new field has a flat, sound plane. We do not thinset over crumbling mortar and hope the heat is gentle.',
      },
      {
        title: 'Build',
        body: 'The surround is set with the mortar the specification calls for, courses kept even, and the joint at the firebox detailed. A mantel or a carpentry panel goes in with the tile, not as a separate idea a month later.',
      },
      {
        title: 'Finish',
        body: 'Grout, a sealer when the material wants one, and the caulk at the mantel close the wall. The hearth is cleaned. We look at the field from across the room, which is how you will see it.',
      },
      {
        title: 'Walk through',
        body: 'We walk the surround with you and go over how the material handles heat and cleaning. Anything that needs a grout touch or a scribe is done before we leave the living room.',
      },
    ],
    signsHeading: 'Signs the surround is the project.',
    signs: [
      {
        title: 'The brick no longer belongs to the room',
        body: 'Painted brick, a dated tile, or a prefabricated box with a brass frame is the usual starting point. The question is whether to retile the face or rebuild the elevation.',
      },
      {
        title: 'Tile is loose or the grout has failed',
        body: 'Heat and a poor mortar show up as hollow tile and open joints. That is a reset, not a grout color change. We check the substrate.',
      },
      {
        title: 'The mantel is the wrong scale',
        body: 'A short mantel on a tall wall, or a heavy mantel in a small living room, is a proportion problem. Tile and carpentry are planned together so the wall reads as one.',
      },
      {
        title: 'You are remodeling the room around it',
        body: 'New built-ins, new flooring, or a paint change make an old surround look leftover. Doing the fireplace with the room keeps the hearth, the floor, and the shelves in one layout.',
      },
    ],
    materialsHeading: 'Tile, mortar, and the mantel.',
    materialsIntro:
      'The surround is a small amount of tile and a large amount of specification. The material next to the opening is chosen for heat. The material you see from the sofa is chosen with the room.',
    materials: [
      {
        title: 'Heat-rated tile',
        body: 'Porcelain and some stone are common at a firebox. Not every tile sold for a floor is appropriate at the opening. We select tile and a setting material that belong next to heat, and we will turn down a sample that does not.',
      },
      {
        title: 'Mortar and grout',
        body: 'The mortar is part of the assembly, not a commodity behind a pretty face. Joint size is planned for the tile and for the heat. A wide rustic joint and a tight rectified joint are different installations.',
      },
      {
        title: 'Hearth and surround layout',
        body: 'The field can be a quiet large-format plane, a herringbone, or a stone that runs to the ceiling. It is centered on the opening. Cuts at the firebox are planned so you do not get a sliver at the place your eye goes first.',
      },
      {
        title: 'Mantel and panel',
        body: 'Wood mantels and paneling are carpentry, acclimated and finished for the room. They are detailed where they meet the tile. A full-height wood wall and a stone opening can be one project if we draw them that way.',
      },
    ],
    costHeading: 'What a tile fireplace tends to cost.',
    costIntro: [
      'These ranges are for the surround, the hearth tile, and the finish carpentry that travels with them. They are not a price for a new gas insert, a flue, or a chimney rebuild. If the firebox is not sound, that is a different scope and we will say so.',
    ],
    costFactors: [
      {
        title: 'Retile or a new elevation',
        body: 'Tile on a sound face is less than a new mantel, new panel, and a field that runs higher than the old brick.',
      },
      {
        title: 'The height of the wall',
        body: 'A standard opening and a two-story wall are different amounts of tile and scaffold. Scale is a design choice and a labor choice.',
      },
      {
        title: 'What is under the old face',
        body: 'A flat, sound substrate is prep. Loose brick, a failing hearth, or a firebox that should not be covered stops the tile scope until that is resolved.',
      },
    ],
    ranges: [
      { label: 'Retile an existing surround', range: '$1,800 to $4,500' },
      { label: 'New surround with a mantel', range: '$3,500 to $9,000' },
      { label: 'Tall feature wall of tile', range: '$8,000 to $16,000' },
    ],
    rangeNote: rangeNote('a tile fireplace surround'),
    faqs: [
      {
        q: 'What does a tile fireplace typically cost in Houston?',
        a: 'Retiling a sound surround often plans at $1,800 to $4,500. A new surround with a mantel often plans at $3,500 to $9,000. A tall feature wall often plans at $8,000 to $16,000. Those are typical planning ranges for the tile and the related carpentry, not a quote, and not a price for a new insert or a chimney.',
      },
      {
        q: 'Does the tile have to be heat-rated if we rarely light a fire?',
        a: 'Yes. The nights you do light it are the nights a wrong material fails. We specify tile and mortar for the opening even when the fireplace is mostly the center of the room.',
      },
      {
        q: 'Can you tile over the brick in an older house?',
        a: 'Often, after we see the face and the firebox. Painted or loose brick may need to come off or be stabilized first. We do not cover a firebox that is not sound and call it a finish project.',
      },
      {
        q: 'Will an HOA care about an interior fireplace?',
        a: 'Usually not. The review shows up when the chimney or another exterior piece changes. Interior tile is a finish. If the plan includes exterior work, master-planned communities such as The Woodlands or Cinco Ranch may still want to see it.',
      },
    ],
  },
};
