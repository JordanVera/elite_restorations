import type { ServiceGuide } from '@/lib/guides/types';

const steps = (
  items: readonly [string, string][],
): ServiceGuide['process'] => items.map(([title, body]) => ({ title, body }));

export const backsplash: ServiceGuide = {
  process: steps([
    ['Look at the wall', 'We check the counter, the outlets, the window, and whether the wall behind the old tile is sound. A short Heights run and a long Katy wall are laid out differently.'],
    ['Center the pattern', 'Chevron, herringbone, and geometric tile are dry-fit in the plan so the repeat lands on the range, the hood, or the window, not on an awkward cut at the end.'],
    ['Protect the stone', 'Counters and cabinets stay covered. Old tile comes off carefully. If the drywall behind it is soft or moldy, we stop and show you before new tile goes up.'],
    ['Set and finish', 'Thinset, cuts, edges, and outlets are set so the field reads as one wall. Grout and a sealer suited to a working kitchen come last.'],
    ['Wipe and walk', 'We clean the haze, check the lines, and walk the wall with you, including the places tile meets the hood and the counter.'],
    ['Note the wet wall', 'If the backsplash was opened because of a leak, the wall is dry before tile. A planned backsplash is not an insurance claim.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the backsplash is the project.',
      paragraphs: [
        'The backsplash is ready when the tile is stained at the range, the grout has cracked along a seam, or the wall no longer matches a counter you are keeping. It is also ready when a new stone counter is going in and the old four-inch strip will look like an afterthought against it. A short kitchen in the Heights or West University makes the pattern obvious. There is nowhere for a bad layout to hide.',
        'If the wall is soft, or the paint behind a loose tile is damp, the tile is not the first question. Water at the sink, the dishwasher, or a window over the counter has to be understood before a new field covers it. We look before we order tile.',
      ],
      points: [
        { title: 'The pattern fights the range', body: 'A repeat that dies in a sliver at the hood is a layout miss. We center it before the first tile is set.' },
        { title: 'Grout you cannot clean', body: 'Grease and Houston humidity stain tired grout. Regrout is sometimes enough. A failed bond or a soft wall means the tile comes off.' },
        { title: 'New stone, old tile', body: 'A fresh counter against a dated backsplash is the usual pairing. The tile should be chosen with the edge and the height of the stone.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Ceramic, stone, and grout that can be wiped.',
      paragraphs: [
        'Ceramic and porcelain are the workhorses. Glass shows every uneven spot in the wall and needs a flat substrate. Marble and other stone want a sealer and a grout that will not scratch the face. Handmade and patterned tile move a little piece to piece. That is the look, and the layout has to allow for it instead of fighting it with knife-edge joints on a wavy wall.',
        'Grout color is part of the design and part of the upkeep. A light grout on a cooking wall shows everything. A grout and sealer you can actually wipe down belong in a Houston kitchen, where humidity and cooking grease both land on the wall. Outlets and switch plates are planned into the layout so they do not slice the pattern at random.',
      ],
      points: [
        { title: 'Full height or a short field', body: 'A short field between counter and cabinet is the common scope. Full height, or a slab backsplash, is more material and a different edge at the hood.' },
        { title: 'Stone against stone', body: 'A marble counter and a stone backsplash need joints that agree. We coordinate that with the countertop work so the lines are intentional.' },
        { title: 'Edges and the window', body: 'Finished edges, a window sill, and the return at the end of a run are what make the wall look complete instead of trimmed with a scrap.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'What changes a backsplash price.',
      paragraphs: [
        'As a planning range, not a quote, a standard-height ceramic or porcelain backsplash on a typical Houston kitchen often falls around $800 to $2,500. Patterned tile, natural stone, or a full-height wall often plans around $2,500 to $7,000, and a complicated layout or a long island run can sit higher. The visit sets the number. Tile price, the length of the wall, and how much cutting the pattern needs are the usual movers.',
        'Removing a sound old backsplash is ordinary. Removing tile from a wall that comes apart, or repairing water damage behind it, is extra. Keeping the counters means we work over them carefully. Replacing the counters at the same time is often cleaner, and it is a different scope. We do not publish one price for both.',
      ],
      points: [
        { title: 'Pattern takes time', body: 'Herringbone and chevron need a planned layout and more cuts than a stacked field. That labor is real. A simple grid is not the same day.' },
        { title: 'The wall underneath', body: 'New drywall or a wet cavity is repair, then tile. We do not set a new backsplash on a soft wall to hold a number.' },
        { title: 'Outlets and trim', body: 'Moving an outlet to save a pattern, or wrapping a window, changes the scope. We say so while the layout is still a drawing.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Short walls, humidity, and older kitchens.',
      paragraphs: [
        'Inside-the-Loop kitchens are often short. A Heights or Bellaire run may be only a few feet between a window and a tall pantry. Chevron on that wall has to be designed so the cuts do not pile up. Newer Katy and Woodlands kitchens give you a longer field and an island that may want the same material or deliberately not. Both are layout jobs. The longer wall is not automatically easier.',
        'Humidity and cooking moisture are why sealer and grout matter after the tile is admired. A backsplash over a working range lives harder than tile in a powder room. If the house is pier and beam and the wall is out of plumb, which is common in older bungalows, the substrate is flattened before large or glossy tile goes up. Gloss shows the wave.',
      ],
      points: [
        { title: 'Part of a kitchen', body: 'On a remodel, the backsplash waits until the counters are in. Set it earlier and the stone will not meet it cleanly.' },
        { title: 'A leak is a different job', body: 'A planned backsplash is construction. If the wall is open because the sink leaked, we dry and document that first. Your insurer decides coverage. We do not.' },
        { title: 'Permit rarely', body: 'Tile over a sound wall usually does not, by itself, trigger a building permit. Moving plumbing or electrical behind it can. We say which one the plan is.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Can you set a backsplash without replacing the counters?',
      a: 'Usually, yes. We protect the stone and the cabinets. The condition of the wall, and whether the old tile comes off cleanly, can change the scope.',
    },
    {
      q: 'What does a Houston backsplash usually cost?',
      a: 'A standard-height ceramic or porcelain field often plans around $800 to $2,500. Patterned tile, stone, or full height often plans around $2,500 to $7,000. Those are planning ranges, not a quote.',
    },
    {
      q: 'Why does the pattern need a center point?',
      a: 'On a short wall the repeat is the whole view. We center it on the range, the hood, or the window so the cuts land where they look intended.',
    },
    {
      q: 'Should the wall be waterproofed?',
      a: 'A kitchen backsplash is not a shower. It still needs a sound wall, and a wet area at the sink is detailed so water is not trapped. A shower is a different assembly, and we will say so.',
    },
  ],
};

export const countertops: ServiceGuide = {
  process: steps([
    ['See the kitchen', 'We look at the cabinets, the sink, the cooktop, and whether the boxes are level. An out-of-square Heights kitchen is templated differently from a new Katy island.'],
    ['Choose the material', 'Quartz, granite, marble, and solid surface wear differently. We talk through care, seams, and the edge before a slab is ordered.'],
    ['Template on site', 'The template is taken from cabinets that are set, not from a drawing. That is what makes overhangs and seams fit the room you have.'],
    ['Fabricate', 'Cutouts for the sink and the cooktop, the edge, and the seam location are cut from that template. Fabrication does not start on a guess.'],
    ['Install', 'The tops are set, seamed, and caulked to the wall and the sink. A backsplash, if it is part of the job, comes after the stone is in.'],
    ['Walk the edges', 'We look at lips, seams, and the places you will touch every day, and we note anything that still needs a pass.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the counters are the scope.',
      paragraphs: [
        'Counters are ready to replace when the surface is etched, cracked, or burned, when the seam has opened, or when a laminate top has swollen at the dishwasher. They are also ready when the cabinets are new and the old top cannot be saved, or when you want a different edge and a real overhang on an island. A chip at a corner can be a repair. A crack that runs, or a top that has lost its bond to the cabinet, usually is not.',
        'If the cabinets under the top rock or the sink cabinet is soft, the counter is not the first fix. Stone is heavy and it needs a level, sound box. We look at the cabinets before we template.',
      ],
      points: [
        { title: 'Damage versus wear', body: 'A chip can often be repaired. A crack through a sink cutout, or a swollen seam, is usually a replacement. We say which after we see it.' },
        { title: 'The island feels short', body: 'Overhang, seating, and the waterfall edge are layout decisions. They are priced with the slab, not added as a trim piece later.' },
        { title: 'The sink is part of it', body: 'An undermount sink and a new faucet hole are cut with the top. The sink you are keeping has to be one we can reset cleanly.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Quartz, granite, marble, and solid surface.',
      paragraphs: [
        'Quartz is consistent and asks less daily care. Granite is a natural slab, so movement in the pattern is the material, and it wants a sealer on a schedule. Marble etches from acid and scratches if you use it as a cutting board. People still choose it with their eyes open. Solid surface can be seamed quietly and is practical in a small bath or a laundry. None of these is wrong. The wrong one is the one you did not want to maintain.',
        'Edges, thickness, and the seam are the decisions that change how the top looks in the room. A waterfall edge uses more slab and more labor. A seam should fall where the pattern and the cabinet allow, not across the sink if that can be avoided. Dark polished stone shows every grain of Houston dust and every water spot. Honed finishes hide more and stain differently. We talk through that in the light of your kitchen.',
      ],
      points: [
        { title: 'Sink and cooktop cuts', body: 'Undermount sinks, farm sinks, and cooktops each need support and a cutout planned with the cabinet. The template includes them.' },
        { title: 'Bath tops', body: 'A vanity top is a smaller slab and the same idea: template, cutout, and a backsplash or a deck that meets the mirror.' },
        { title: 'Care you will actually do', body: 'If you will not seal stone or wipe acid off marble, we say so before it is ordered. The material should match the kitchen you run.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'What moves a countertop number.',
      paragraphs: [
        'As a planning range, not a quote, quartz or granite for many Houston kitchens falls around $3,500 to $9,000 installed. Marble, a waterfall edge, or a large island often plans around $8,000 to $18,000, and a very large or heavily veined slab can sit higher. Square footage is only the start. The edge, the number of cutouts, the seam, and whether the old top comes off a fragile cabinet all move it. A bath vanity is a smaller version of the same work.',
        'Repairing a chip is not in those bands. We look first and tell you if a repair is the honest scope. Replacing a top during a full kitchen remodel is priced with the kitchen. The ranges on this page are the counter scope itself, so you can see what the stone is doing inside a larger budget.',
      ],
      points: [
        { title: 'Slab and layout', body: 'A seam that forces a second slab, or a waterfall that needs a book match, uses more stone. We show that before the order.' },
        { title: 'Cabinets that are not level', body: 'Shimming and repairing boxes so a stone top sits flat is prep. Skipping it is how a seam opens later.' },
        { title: 'Removal', body: 'An old tiled-in top or a stuck laminate top takes longer to get off. We account for what is actually there.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Out-of-square rooms and Gulf humidity.',
      paragraphs: [
        'Older kitchens in the Heights, Bellaire, and West University are seldom square. A template taken on site is the whole point. A top cut from a plan will gap at the wall or run long into a crooked corner. Newer houses in Katy and The Woodlands are squarer and still need a template once the cabinets are set, because an island overhang is a measured thing, not a catalog default.',
        'Humidity does not etch quartz, but it does show up at a wood cabinet and at any wood edge you ask the stone to meet. The cabinets should be stable before a heavy top goes on. If a leak softened the sink box, that repair happens first. A planned counter replacement is not an insurance claim. A counter being replaced because a dishwasher flooded the kitchen is documented with the water loss, and your insurer decides coverage.',
      ],
      points: [
        { title: 'Templating order', body: 'We template after the cabinets are set and level. In a remodel, that is its own step. Fabrication does not start while the boxes are still a guess.' },
        { title: 'Heat at the range', body: 'A pot pulled off a burner needs a surface that can take it. We talk about that with the material, without pretending any top is indestructible.' },
        { title: 'Permit', body: 'Swapping a top on existing cabinets usually does not, by itself, need a building permit. Plumbing or electrical changes tied to a new sink or cooktop can. We say which.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Which surface is practical in a busy Houston kitchen?',
      a: 'Quartz and granite ask less day to day than marble. Solid surface is a practical option in smaller rooms. We walk the care, not a slogan, in the kitchen you cook in.',
    },
    {
      q: 'What is a planning range for new counters?',
      a: 'Quartz or granite for many kitchens falls around $3,500 to $9,000. Marble, a waterfall, or a large island often plans around $8,000 to $18,000. Those are planning ranges, not a quote.',
    },
    {
      q: 'Why not template from the drawing?',
      a: 'Inside-the-Loop kitchens are often out of square, and even a new cabinet run is only final once it is set. The template is taken from the room so seams and overhangs fit.',
    },
    {
      q: 'Can a cracked counter be repaired?',
      a: 'Sometimes, if the crack or chip is limited and the top is still bonded. We look before we recommend a repair or a replacement.',
    },
  ],
};

export const carpentry: ServiceGuide = {
  process: steps([
    ['See the wood that is there', 'We look at casing, stairs, and any wall you want opened. Matching a Heights profile starts with the piece in the house, not a catalog sample.'],
    ['Decide match or new', 'Some trim should be saved and spliced. Some rooms need a new built-in because the wall was never designed for one. We say which before we cut.'],
    ['Acclimate', 'Wood sits in the house before it is milled. Houston humidity moves lumber. Installing it straight off the truck is how joints open in August.'],
    ['Frame what is hidden', 'If a wall is coming out or a header is going in, that structure is built before the finish wood. We do not cut a bearing wall because a sketch removed it.'],
    ['Fit the finish', 'Trim, paneling, shelves, and stairs are scribed to the walls that exist, including the ones that are out of plumb.'],
    ['Fill and walk', 'Nail holes, joints, and the places paint will not hide a gap are checked with you. Paint, if it is in the job, comes after the wood is ready.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the carpentry is the real work.',
      paragraphs: [
        'You need carpentry when the trim no longer meets the floor, when a stair tread rocks, when a closet was never finished, or when a kitchen plan wants a wall opened and the opening has to carry the house. You also need it when a new room looks unfinished because the casing, the apron, and the base were treated as an afterthought. In older Houston houses the existing profiles are often worth matching. In newer ones the walls are plain and the millwork is what gives the room a point of view.',
        'A cracked casing after a dry summer can be the clay soil moving the foundation, not a bad painter. We do not disguise a structural gap with a thicker piece of trim and call it done. If the floor has dropped, the carpentry plan says so.',
      ],
      points: [
        { title: 'Profiles worth keeping', body: 'Heights, Rice Village, and West University houses often have casing and base that should be matched, not replaced with a stock pattern that looks pasted on.' },
        { title: 'Stairs that move', body: 'A loose tread, a wobbly rail, or a landing that does not meet the floor is a safety item. We look at the structure, not only the stain.' },
        { title: 'A wall you want gone', body: 'Opening a kitchen to a living room is framing first. Finish trim is what you see after the header is in and the opening is square enough to case.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Trim, built-ins, and wood that can live here.',
      paragraphs: [
        'Paint-grade pine and poplar, stain-grade hardwood, and sheet goods for closet interiors are chosen for the job. A painted built-in does not need a furniture-grade face on the back of a shelf. A stained stair does. We use the species the finish requires and we acclimate it in the house. Exterior trim, when the project is a door or a window the interior meets, has to handle sun and rain. Interior paint-grade wood does not belong outside.',
        'Hardware, shelf pins, and the way a door closes are part of the built-in. A closet that looks like furniture and sags on the first loaded shelf was not built as furniture. We size the span. Paneling and a mantel, when they travel with a fireplace, are the same idea: the wood and the tile have to meet on a line that was planned.',
      ],
      points: [
        { title: 'Scribe, do not force', body: 'Walls in older houses are out of plumb. Trim is scribed to them. A gap filled with caulk is not the same as a fit.' },
        { title: 'Closets and alcoves', body: 'We build to the alcove you have, including the awkward ones in bungalows. A stock organizer that does not fit is not the project.' },
        { title: 'Stairs and rails', body: 'Treads, risers, and rails are a system. Replacing a tread and leaving a loose rail does not finish the stair.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'What changes a carpentry price.',
      paragraphs: [
        'Carpentry prices follow the piece, not a room rate. As a planning range, not a quote, matching trim in one or two rooms often falls around $1,500 to $5,000. A built-in wall or a closet often plans around $3,000 to $12,000. Opening a wall and reframing it is usually priced with the kitchen or the bath it belongs to, and the structure is what moves that number. Stairs vary with how much of the structure is sound. These bands are wide on purpose. The visit narrows them.',
        'Custom milling to match an old profile costs more than a stock casing, and it is often the right spend in a house where the rest of the trim is original. Paint is sometimes in the same project and sometimes not. We say which, so the wood is not left raw and the paint is not assumed.',
      ],
      points: [
        { title: 'Match versus stock', body: 'A stock profile is faster. A knife or a custom run to match a 1920s casing is slower and usually looks right in that house.' },
        { title: 'Structure', body: 'A header, a post, or a repair in the floor is not finish carpentry. It is in the price when the opening needs it, and we do not hide it in “trim.”' },
        { title: 'Access and finish', body: 'Occupied rooms, stairs that are the only way up, and stain-grade work that has to be dust-controlled all change the days on site.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Humidity, old profiles, and moving soils.',
      paragraphs: [
        'Wood moves between a damp Houston summer and a dry, air-conditioned January. Acclimating material in the house is how joints stay tighter. It does not freeze the lumber in place. We still build so a little movement does not open a gap you can see across the room. Exterior humidity is a separate problem: rot at a sill or a fascia is repaired with material that belongs outside, and the water path that caused it is part of the look, not only the patch.',
        'Pier-and-beam houses in the Heights and other older neighborhoods can be leveled more readily than a slab, and they can also rack trim when the piers move. Slab houses in Katy and The Woodlands telegraph soil movement as drywall cracks and doors that stick. Trim will not stop expansive clay. We fit the wood to the house as it is, and we tell you when a door is sticking because the opening moved, not because the hinge is tired.',
      ],
      points: [
        { title: 'Bearing walls', body: 'We do not remove a wall that is holding the house up without the framing that replaces that support. The plan shows that before anyone cuts.' },
        { title: 'Permits', body: 'Finish trim usually does not need a permit. Structural changes often do, in the City of Houston or in whichever city or county covers the address.' },
        { title: 'With the remodel', body: 'Kitchen soffits, bath casing, and the apron under a window are often the carpentry inside a larger project, done by the same team.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Can you match trim in an older Houston house?',
      a: 'Often, yes. We look at the profile in Heights, West University, Bellaire, and similar houses and match or blend it so the new piece reads as part of the room.',
    },
    {
      q: 'What is a planning range for carpentry?',
      a: 'Matching trim in a room or two often falls around $1,500 to $5,000. A built-in or a closet often plans around $3,000 to $12,000. Opening a wall is priced with the structure it needs. Those are planning ranges, not a quote.',
    },
    {
      q: 'Why acclimate wood in Houston?',
      a: 'Humidity here swings. Wood installed straight off a truck moves after it equalizes, and joints open. We let it sit in the house first. That reduces the movement. It does not eliminate it.',
    },
    {
      q: 'Will new trim fix a sticking door?',
      a: 'If the hinge or the latch is the problem, sometimes. If the opening moved because the foundation moved, trim is not the repair. We say which one we are looking at.',
    },
  ],
};

export const tileFireplaces: ServiceGuide = {
  process: steps([
    ['Look at the firebox', 'We see whether the surround is brick, tile, or a previous remodel, and what the opening actually is. A decorative Houston hearth is still built for heat.'],
    ['Choose heat-rated material', 'Tile, stone, mortar, and grout next to the opening are specified for heat. A tile that looks right in a bath is not automatically right at a firebox.'],
    ['Plan the wall', 'Mantel, paneling, and the tile field are sized to the room, from a small West University living room to a two-story Woodlands wall.'],
    ['Prep the substrate', 'The old face comes off to a sound base. We do not tile over a loose surround and hope the heat is occasional.'],
    ['Set and seal', 'The field is set, grouted, and sealed for the material. The mantel or panel, if it is in the job, is scribed to that line.'],
    ['Walk the hearth', 'We look at the joints, the mantel height, and the way the surround meets the floor, and we list anything left.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the fireplace wall is the project.',
      paragraphs: [
        'In Houston the fireplace is usually the wall the room is aimed at, and it is lit on a handful of cold nights. The surround is still tired when the brick is sooty and out of scale, when old tile is cracked, or when a remodel left a firebox floating on a blank drywall wall. A mantel that is too small for a two-story family room in The Woodlands or Katy disappears. A heavy brick box in a West University living room can be the only thing the room is about, and not in the way you want.',
        'Cracked tile at the opening can be heat, age, or the house moving. We look before we cover it. If the firebox itself is damaged, tile is not the repair. We do not pretend a new surround fixes a firebox, a gas connection, or a chimney that needs a mason.',
      ],
      points: [
        { title: 'The scale is wrong', body: 'A small tiled rectangle on a tall wall looks like an afterthought. We size the field to the volume of the room.' },
        { title: 'The face is failing', body: 'Loose brick, hollow tile, or a surround that has pulled off the wall comes off. We do not skin over it.' },
        { title: 'The room changed', body: 'New floors, new paneling, or a kitchen that now sees the hearth are reasons the old brick no longer belongs. The tile is planned with that room.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Heat-rated tile, stone, and the mantel.',
      paragraphs: [
        'Materials next to the opening have to be rated for the heat of that firebox, even if you use it rarely. That means the tile, the mortar, and the grout. A marble slab, a herringbone field, or a quiet large-format porcelain can all be right when they are the right product for heat. Combustible trim, including a wood mantel, has to sit outside the clearance the firebox requires. We do not guess that clearance.',
        'The mantel, the paneling, and the hearth extension are often the carpentry that travels with the tile. They should look like one wall. A stone hearth that does not meet the wood floor on a planned line is the detail people notice every day. Sealer is chosen for the material and for a surface that will see shoes, and sometimes ash.',
      ],
      points: [
        { title: 'Decorative is still hot', body: 'Many Houston fireplaces are gas or rarely lit. The surround is still specified for heat. Occasional use is not a reason to use bath tile at the opening.' },
        { title: 'Mantel clearances', body: 'Wood stays outside the clearance. If a mantel you love cannot, we say so before it is built.' },
        { title: 'Hearth and floor', body: 'The hearth extension and the flooring meet on purpose, especially when the floor is being replaced in the same project.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'What a fireplace surround costs to plan.',
      paragraphs: [
        'As a planning range, not a quote, retiling an existing surround on a typical Houston fireplace often falls around $2,500 to $7,000. A larger stone field, a full wall, or a new mantel and paneling often plans around $6,000 to $15,000. A two-story wall or a complicated stone can sit higher. The tile itself, the size of the field, and whether the old face comes off cleanly are the usual reasons the number moves.',
        'Gas fitting, a chimney liner, and a firebox rebuild are not assumed in those bands. If the opening needs that work, it is a different trade and we will tell you rather than fold it into “tile.” The surround we price is the finish wall and the carpentry that belongs to it.',
      ],
      points: [
        { title: 'Demo of the old face', body: 'Brick that has to be cut back, or tile set in a thick bed, takes longer than a thin previous remodel. We look before we promise an easy demo.' },
        { title: 'Mantel and panel', body: 'A mantel built with the tile is carpentry. It is in the price when it is in the plan, and it is not a free add.' },
        { title: 'The room around it', body: 'New flooring, paint, and built-in shelves beside the hearth are related scopes. We can do them together. They are still their own lines.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'A design wall in a house that rarely freezes.',
      paragraphs: [
        'Because the fireplace is rarely the heat, people treat it as furniture. That is fair for the way the room is used, and it is incomplete for the way it is built. We still set heat-appropriate materials at the opening. The rest of the wall can be the design: a quiet stone in a Memorial great room, a painted mantel in a bungalow, a taller field where a Katy or Woodlands ceiling would swallow a small surround.',
        'Older brick boxes inside the Loop can often be retiled once we see what is behind the face. Newer zero-clearance units have manufacturer clearances that govern the mantel and the facing. We follow those. Foundation movement can crack a rigid surround over time, the same way it cracks floor tile on Houston clay. We set the field on a sound base and we do not promise a crack can never return if the house keeps moving.',
      ],
      points: [
        { title: 'Not a gas contract', body: 'We build the surround. We do not advertise ourselves as the technician for the gas appliance or the flue. If that work is needed, we say so.' },
        { title: 'With the living room', body: 'Flooring, paint, and carpentry beside the hearth are easier to detail when they are one project. The tile still leads the wall.' },
        { title: 'Soot and use', body: 'If you do burn, the material has to clean. We talk about that before a porous stone is ordered for a wood-burning opening.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Can you retile a brick fireplace?',
      a: 'Often, yes, after we see the face and the opening. Some brick wants to come off. Some can take a proper substrate. We do not skin over a loose surround.',
    },
    {
      q: 'What is a planning range for a tile surround?',
      a: 'Retiling a typical surround often falls around $2,500 to $7,000. A larger wall with a mantel and paneling often plans around $6,000 to $15,000. Those are planning ranges, not a quote.',
    },
    {
      q: 'Does the tile have to be heat-rated if we barely use the fireplace?',
      a: 'Yes, at the opening. Occasional use is still heat. Clearances for a wood mantel still apply. We specify the materials for the firebox you have.',
    },
    {
      q: 'Can the mantel and the shelves be part of the same project?',
      a: 'Yes. Mantels, paneling, and built-in shelving are the carpentry that usually travels with the tile, sized to the wall.',
    },
  ],
};
