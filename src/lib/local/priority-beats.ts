/** One local sentence per priority area, written for that trade. */
export const priorityBeats: Record<string, Record<string, string>> = {
  'kitchen-remodeling': {
    houston:
      'Across Houston a kitchen might be a closed bungalow room or an open island in a slab house, and we do not carry one layout from the Heights to the west side.',
    katy: 'In newer Katy sections the island already holds the room. The work is the path around it, the light, and whether a post-tension slab will let a sink move.',
    memorial:
      'Memorial kitchens are often large and still tied to a formal dining room. The island has to work with that room, not erase it by default.',
    'energy-corridor':
      'A corridor kitchen might be in a 1970s house or a townhome with a shared wall. We measure which one before we talk about opening the room.',
    westchase:
      'Westchase kitchens show up in townhomes and in single-family houses from the 1970s through the 1990s. An association rarely picks the cabinets. The slab can limit the plumbing.',
    alief: 'Alief kitchens have often been redone in pieces, so the cabinets, the counter, and the floor may be three different decades. We replace what you ask for, not a package.',
    'sugar-land':
      'Sugar Land kitchens were usually built open, in a two-story plan. The remodel is the cabinets, the island, and the light, more often than it is a wall coming down.',
    bellaire:
      'Bellaire kitchens sit on small lots, in mid-century houses or in rebuilds. Tight rooms and out-of-square walls decide the layout before a door style does.',
    'the-heights':
      'A Heights kitchen is often a small pier-and-beam room. The crawlspace can help a drain move. The old walls decide whether the room can open to the house.',
    'the-woodlands':
      'Woodlands kitchens open to the family room. Interior cabinet choices are usually yours. Moving a drain on a newer house still means respecting the slab.',
  },
  'bathroom-remodeling': {
    houston:
      'Houston baths run from a small powder room to a primary suite on a newer slab. Waterproofing goes behind the tile either way.',
    katy: 'Katy primary baths are often large rooms on post-tension slabs. A new shower location has to respect the cables. A same-place remodel does not cut the slab.',
    memorial:
      'Memorial primary baths are larger than a bungalow bath, often redone inside a postwar slab house. We check the drain before the shower moves.',
    'energy-corridor':
      'A townhome bath in the Energy Corridor shares a wall and a stack. A single-family bath nearby does not. We plan the one you have.',
    westchase:
      'Westchase baths are usually slab-era rooms, some original and some partly updated. We look at the pan, the valve, and the fan before we tile.',
    alief: 'Alief baths, like the kitchens, are often partly updated. A new valve on an old drain is a different scope from a full retile.',
    'sugar-land':
      'Sugar Land primary baths were built as large rooms. The remodel is the shower, the vanity, and the light, with waterproofing behind the finish.',
    bellaire:
      'Bellaire baths are often tight, in a mid-century house or a rebuild. A curbless shower fits only if the floor and the drain allow it.',
    'the-heights':
      'A Heights bath over a crawlspace can move a drain more easily than a slab bath can. The room is still small, and the waterproofing is not optional.',
    'the-woodlands':
      'Woodlands primary baths sit in larger plans. The covenants rarely pick the tile inside. On a newer slab, a moved drain still waits on a cable check.',
  },
  backsplash: {
    houston:
      'A Houston backsplash looks wrong when the pattern is centered on the wrong feature. We center it on the range, the hood, or the window you actually see.',
    katy: 'Katy backsplashes often run a long open wall. The pattern has room to repeat, and the outlets have to land in that layout.',
    memorial:
      'Memorial backsplashes sit under deeper cabinets and beside windows. We dry-lay the pattern so the cuts do not end in a sliver at the trim.',
    'energy-corridor':
      'In a corridor townhome the backsplash run can be short, and a short run shows every cut. We plan the layout before the tile is on the wall.',
    westchase:
      'Westchase kitchens are not all the same length. We measure the wall and the outlet heights before we choose a pattern that needs a center.',
    alief: 'An Alief backsplash is often replacing tile added years after the cabinets. We protect the counter and see what the wall behind the old tile is.',
    'sugar-land':
      'Sugar Land backsplashes usually face an open kitchen seen from the family room. The field has to read as one pattern from that doorway.',
    bellaire:
      'Bellaire walls are often out of square, and a geometric tile makes that obvious. We adjust the layout instead of pretending the wall is straight.',
    'the-heights':
      'Heights backsplashes are short and sit on old plaster or drywall. The center is the range you have, not a showroom wall.',
    'the-woodlands':
      'A Woodlands backsplash is part of an open room. Grout color and the line at the window trim are what you see from the sofa.',
  },
  countertops: {
    houston:
      'Houston counters are templated after the cabinets are set, because older rooms are out of square and newer islands are large.',
    katy: 'Katy islands are long. Seams, overhangs, and the sink cutout are the decisions, and a suburban driveway is the easier version of a slab delivery.',
    memorial:
      'Memorial kitchens can take a larger slab and still need seams planned out of the worst light. We template the cabinets that are actually set.',
    'energy-corridor':
      'A corridor townhome may not have room to stage a full slab the way a Katy driveway does. We plan the carry before we promise a seam layout.',
    westchase:
      'Westchase counters go into slab-era kitchens and townhomes. We template when the cabinets are level, including 1980s rooms that are not perfectly square.',
    alief: 'Alief counters often replace a laminate top. We measure the cabinets that are staying, not the top that is leaving.',
    'sugar-land':
      'Sugar Land islands and perimeter runs match a 1990s or 2000s open kitchen. The edge is chosen with that room, not from a chip alone.',
    bellaire:
      'Getting a slab onto a small Bellaire lot is part of the job, and so is templating a kitchen that is out of square.',
    'the-heights':
      'Heights counters sit in a small, often out-of-square room. A thick edge can look wrong in a bungalow. We talk about that before the stone is cut.',
    'the-woodlands':
      'Woodlands counters are usually a long run plus an island. Seams are planned so the island reads as one piece from the family room.',
  },
  'wood-flooring': {
    houston:
      'Hardwood in Houston has to live with humidity. We acclimate new wood in the house, and we say when a floor should be sanded instead of replaced.',
    katy: 'Katy houses are mostly slab, two-story, and open. We check height at the doors and the stairs before a thicker floor is ordered.',
    memorial:
      'Memorial stairs and landings are part of a two-story wood floor. The finish has to read as one run from the entry to the upstairs hall.',
    'energy-corridor':
      'A corridor townhome and a single-family house need different transitions at the door. We check slab flatness before wood is fastened to it.',
    westchase:
      'Westchase slabs from the 1970s through the 1990s are not always flat. Wood will show a ridge carpet hid. We check before we order planks.',
    alief: 'Alief floors are often the latest in a line of finishes. We see whether the subfloor, not just the surface you are tired of, can take wood.',
    'sugar-land':
      'Sugar Land’s two-story plans mean stairs. A wood floor that stops awkwardly at the first tread looks unfinished, so that joint is part of the scope.',
    bellaire:
      'Bellaire mixes pier-and-beam and slab on the same street. A cottage floor may need leveling. A rebuild may need a moisture check on concrete.',
    'the-heights':
      'Heights wood floors are often original boards over a crawlspace, worth sanding when they are thick enough. We inspect before we talk about replacement.',
    'the-woodlands':
      'Shade outside a Woodlands house does not set the moisture in a plank. New wood still acclimates inside, on a slab, with the air conditioning running.',
  },
  'tile-flooring': {
    houston:
      'Tile in Houston is a flat-substrate job. Large porcelain shows every ridge, in a bungalow or a new slab house.',
    katy: 'Katy tile often goes on a post-tension slab in an open first floor. We check flatness and moisture, and we do not cut the slab for decoration.',
    memorial:
      'Memorial slabs may have moved with the clay. Flatness is the prep. A thicker mortar bed is not how we hide a hump.',
    'energy-corridor':
      'Corridor baths mix townhome pans and single-family slabs. We waterproof the wet room before the finish tile either way.',
    westchase:
      'Westchase tile often comes up off a 1980s slab. We see what is under the old floor before we promise the new one can go over it.',
    alief: 'Alief tile is often a kitchen or bath floor that was patched once. We say when a full floor is cleaner than another patch.',
    'sugar-land':
      'Sugar Land open plans want the tile centered on a doorway you see from across the room. That line is set before the thinset.',
    bellaire:
      'Bellaire floors meet tight doors. Tile thickness can keep a door from closing. We check the height before the field is set.',
    'the-heights':
      'Heights tile often goes over a wood subfloor, not a slab. The prep is stiffening and flattening that floor.',
    'the-woodlands':
      'Woodlands baths are large enough for a real shower floor, waterproofed first. Family-room tile, if you want it, is a flatness and grout decision.',
  },
  'vinyl-flooring': {
    houston:
      'Vinyl in Houston is chosen for the floor under it and for rooms that see spills. A shower is still a tile assembly.',
    katy: 'Katy families often want vinyl on an open slab. Glue-down is often steadier there. A ridge in the concrete will print through if we skip the flatness check.',
    memorial:
      'Memorial vinyl, in the rooms where it belongs, still has to meet wood stairs and thicker floors. The transition is drawn, not improvised.',
    'energy-corridor':
      'A corridor townhome can be the right place for a tough vinyl floor. We measure the run before we promise a plank length the elevator or the stairs cannot take.',
    westchase:
      'A Westchase slab needs to be flat and dry before vinyl. A floor that felt even under carpet may not be even enough.',
    alief: 'Alief rooms updated in pieces often want one continuous floor. We look at the subfloor and the doorways before we order boxes.',
    'sugar-land':
      'Sugar Land’s open first floor can take a wood-look vinyl when the slab is flat and dry. We will say when tile or wood is the better assembly.',
    bellaire:
      'Bellaire’s small rooms make a plank layout obvious. We center the courses so the only doorway does not get a sliver.',
    'the-heights':
      'Vinyl over a Heights wood floor is a different prep from vinyl on a Katy slab. We do not glue planks to an uneven pine floor and call it finished.',
    'the-woodlands':
      'Woodlands kitchens and playrooms are a common vinyl request. The pines do not change the slab. Flatness, and the product’s limit in a wet room, still do.',
  },
  'laminate-flooring': {
    houston:
      'Laminate is the wood look for bedrooms, halls, and living rooms when a full sanding job is more than the room needs. Baths stay a tile conversation.',
    katy: 'Upstairs bedrooms are a common Katy laminate floor. We check the stair nose and the door heights so the new surface does not catch.',
    memorial:
      'Memorial landings show a bad laminate transition quickly. Nosing and underlayment are planned with the bedrooms, not after.',
    'energy-corridor':
      'Laminate on an Energy Corridor slab ticks when the floor is not flat. Underlayment does not hide a ridge.',
    westchase:
      'A Westchase bedroom can take laminate if the floor under it is flat and dry. We look before the boxes are scheduled.',
    alief: 'Alief houses often need a dry-room floor without a week of sanding. Laminate can be that floor after the flatness is fixed.',
    'sugar-land':
      'A Sugar Land two-story plan needs the laminate to meet the stairs on purpose. A leftover plank at the top step looks like an afterthought.',
    bellaire:
      'Bellaire cottages can be out of level. Laminate will bridge a small gap and will not bridge a bad one.',
    'the-heights':
      'Laminate in a Heights bedroom does not fix a bouncy subfloor. We walk it and say if the structure comes first.',
    'the-woodlands':
      'Upstairs bedrooms in The Woodlands are a typical laminate scope. The boxes acclimate in the house, and the bath stays tile.',
  },
  carpentry: {
    houston:
      'Carpentry in Houston is either matching an old profile or building a new one for a room the original trim never saw.',
    katy: 'Katy trim is usually newer and simpler. Built-ins and stair parts are what finish an open plan, and they are sized to that wall.',
    memorial:
      'Memorial houses often still have rails and casing worth keeping. A new built-in has to meet that scale or it looks small.',
    'energy-corridor':
      'A corridor townhome has less wall for a built-in than a Memorial living room. We size the piece to the alcove you have.',
    westchase:
      'Westchase trim from the 1980s is often plain. We match it if you want it matched, and we say so before we change the profile.',
    alief: 'Alief carpentry is often the casing and doors around a kitchen updated in pieces. We close the gaps the new cabinets opened.',
    'sugar-land':
      'Sugar Land stairs and two-story entries are the carpentry you see first. Rails and the tall casing are one scope.',
    bellaire:
      'Bellaire carpentry is scribing to an out-of-square wall, or a bookcase in a short wall. The wall that exists is the measurement.',
    'the-heights':
      'Heights trim is a large part of the house. On a historic-district block, exterior millwork can be regulated. Interior built-ins usually are not. We check the address.',
    'the-woodlands':
      'Woodlands carpentry is built-ins, stairs, and casing in a larger plan. The covenants care about the outside. The bookcase is inside, built to that wall.',
  },
  'tile-fireplaces': {
    houston:
      'Not every Houston house has a fireplace. When it does, the surround is a heat-rated assembly, even if the firebox is lit only a few times a year.',
    katy: 'Newer Katy fireplaces are often a simple box on a tall family-room wall. The surround has to be large enough for that wall.',
    memorial:
      'A Memorial fireplace often anchors a tall room. Mantel, paneling, and tile are one composition, sized to the wall you have.',
    'energy-corridor':
      'A corridor fireplace may be a short townhome wall or a two-story room. We measure before we promise a stone field.',
    westchase:
      'Where a Westchase house has a fireplace, it is often a brick box from the 1980s. We say whether to retile, resurface, or rebuild after we see the face.',
    alief: 'Alief living rooms are ordinary sizes. A new surround should fit that room. An oversized field can overwhelm a ranch.',
    'sugar-land':
      'A Sugar Land fireplace is the wall you see from the kitchen. Heat-rated tile and a mantel in scale are the project.',
    bellaire:
      'A Bellaire fireplace is often in a smaller room, sometimes in a house rebuilt around it. We check what is behind the face before we cover it.',
    'the-heights':
      'A Heights bungalow fireplace is often small. The surround should fit the room, and the materials are still heat-rated.',
    'the-woodlands':
      'A Woodlands fireplace sits on a tall wall. The surround is sized to that wall, with heat-rated tile, regardless of the trees outside.',
  },
  roofing: {
    houston:
      'A Houston roof is a repair-or-replace decision made up top, after photographs. Wind, hail, and worn shingles are all common. The roof tells us which.',
    katy: 'Katy roofs are mostly architectural asphalt on two-story houses, and many associations review color. We inspect before we say a repair will hold.',
    memorial:
      'Memorial roofs are larger and often under oaks. Valleys, shade, and limb debris are part of the inspection, along with the shingles.',
    'energy-corridor':
      'Energy Corridor roofs sit on houses and townhomes, some near the bayou. We say whether a repair will hold or the roof should come off.',
    westchase:
      'Westchase roofs are often asphalt on 1970s-to-1990s houses and townhomes. We photograph the slopes you cannot see from the driveway.',
    alief: 'Alief roofs are typically asphalt on one- and two-story houses. South and west slopes age faster. We look at all of them.',
    'sugar-land':
      'Sugar Land roofs repeat a suburban shape, and an association often has a color list. The deck under the shingles is still this house’s deck.',
    bellaire:
      'Bellaire roofs sit on tight lots, on mid-century houses and on new rebuilds. Access is part of the inspection, and so is the age of the roof that is up there.',
    'the-heights':
      'Heights roofs are smaller and often cut up by dormers. A historic district may care what the street sees. We check the block and the deck.',
    'the-woodlands':
      'Woodlands roofs live under pines. A valley can fail while the street slope still looks fine. Covenants often review a replacement color.',
  },
  'roof-replacement': {
    houston:
      'A Houston replacement is tear-off, a look at the deck, underlayment, flashing, vents, and the material. We do not sell a shingle from a brand poster.',
    katy: 'A Katy replacement is usually architectural asphalt on a two-story roof, with an association color to confirm and attic ventilation to check.',
    memorial:
      'Replacing a Memorial roof means more squares, more valleys, and oaks in the way. Staging is for a two-story house, not a ranch.',
    'energy-corridor':
      'Corridor replacements include townhome roofs and single-family roofs. The tear-off plan follows which one you have, including where the debris can sit.',
    westchase:
      'A Westchase replacement starts with photographs. When the whole roof comes off, a City of Houston permit is the normal path, and any townhome rule is checked before the color is ordered.',
    alief: 'An Alief replacement is a suburban roof until the deck says otherwise. Soft decking is called out before the job grows past the roof we priced.',
    'sugar-land':
      'Sugar Land replacements go through the city and, usually, an association color review. The install is still the deck, the underlayment, the flashing, and the vents.',
    bellaire:
      'A Bellaire replacement is permitted by the city of Bellaire, on a lot with little staging room. The tear-off is planned around that.',
    'the-heights':
      'On a historic-district block, a Heights replacement has to respect what the street sees. The deck and the flashing underneath are still the structure.',
    'the-woodlands':
      'A Woodlands replacement is often reviewed under the covenants. Pines over the roof affect staging and the way valleys are detailed.',
  },
  'roofing-emergency-tarp-repair': {
    houston:
      'A Houston tarp is temporary cover after wind or a limb opens the roof. Photos come before the cover hides the opening. It is not a finished roof.',
    katy: 'Katy tarps are usually a storm opening on a two-story roof. We go up when it is safe, photograph, and anchor the cover against the next wind.',
    memorial:
      'Memorial tarps often follow a limb through a valley under the oaks. The permanent roof is a separate decision after the house is covered.',
    'energy-corridor':
      'In the Energy Corridor the roof may be a house or a townhome. Access is settled before we anchor a cover. The photos still come first.',
    westchase:
      'Westchase storm calls are close to the office. Close does not turn a tarp into a repair. We cover the opening and schedule the permanent work after.',
    alief: 'Alief is close to 77082, which helps on a storm day. We still wait until the roof is safe to stand on, then photograph and cover.',
    'sugar-land':
      'A Sugar Land tarp is temporary protection on a two-story roof. Covering an open roof does not wait on an association color. The permanent roof can.',
    bellaire:
      'A Bellaire tarp is staged on a tight lot. We photograph the opening, cover it, and keep debris off the neighboring yard as much as the lot allows.',
    'the-heights':
      'A Heights tarp on a small, cut-up roof is awkward on a tight street. We do it when it is safe, photos first, and we say what is temporary.',
    'the-woodlands':
      'Woodlands tarps are often a pine limb through the roof. We photograph the puncture, cover it, and talk about the permanent roof once the next rain is kept out.',
  },
  siding: {
    houston:
      'Houston siding fades on south and west walls. A repair is matched to the boards on the house now, not to a chip from the year it was built.',
    katy: 'Katy elevations are often brick with siding accents, or a fuller siding package in newer sections. Associations usually review a color change.',
    memorial:
      'Memorial siding, where the house is not mostly brick, has to meet the trim, the oaks, and a larger wall. We say when a section will blend.',
    'energy-corridor':
      'Corridor siding shows up on houses and on townhome rear walls. An association may control the street side. We read that before boards are ordered.',
    westchase:
      'A Westchase siding repair is often a faded section on a 1980s house or townhome. We match the weathered color as closely as the material allows.',
    alief: 'Alief exteriors are mostly brick with some siding and trim. We repair the siding that is there rather than inventing a new elevation.',
    'sugar-land':
      'Sugar Land siding is part of an elevation an association has often approved once. A new profile or color goes through that review.',
    bellaire:
      'Bellaire siding sits close to the street, on older houses and new ones. The city permits a full replacement, and the profile is easy to see.',
    'the-heights':
      'Heights siding and exterior trim on a historic-district block can be regulated. We check the district before the street elevation changes.',
    'the-woodlands':
      'Woodlands siding is a covenants item. Color and profile are often reviewed. Corners, windows, and soffits are detailed so the wall looks finished after that.',
  },
  'patios-decks': {
    houston:
      'A Houston deck or patio starts with the ledger, the footings, and the path rain takes away from the wall. Clay soil is the reason that comes first.',
    katy: 'Katy yards have room, and associations often review a deck, a cover, and a fence. That path is clearer before lumber or composite is ordered.',
    memorial:
      'Memorial yards are deeper than a bungalow yard, and oaks change where a deck can sit. We look at the grade and the door the new work meets.',
    'energy-corridor':
      'An Energy Corridor patio may be a townhome court or a house yard. Keeping water off the wall matters on low ground near the bayou.',
    westchase:
      'Westchase outdoor space is often a modest yard or a townhome patio. We size the work to that and check the ledger if a deck is already there.',
    alief: 'Alief back yards are ordinary suburban yards. A patio that traps water against the slab is the mistake we design out.',
    'sugar-land':
      'Sugar Land patios and covers usually need association approval. The structure still has to shed rain off the wall.',
    bellaire:
      'Bellaire yards are small. A deck that is too deep will feel wrong and may not fit the setback. We measure first.',
    'the-heights':
      'Heights outdoor space is a small yard. On a historic-district block, a stair or a deck the street can see may be regulated. We check.',
    'the-woodlands':
      'A Woodlands deck sits under pines, and the covenants often review it. Footings, the ledger, and clearance from the trees are the visit.',
  },
  'water-damage-restoration': {
    houston:
      'Houston water might be a supply line, an appliance, a roof opening, or water at grade. Humidity is why the structure is dried before it is rebuilt.',
    katy: 'Katy calls are often a supply line or an appliance on a slab. Storm water is a different source, more likely near a creek or a low street than on every lot.',
    memorial:
      'Memorial water might be a roof leak under the oaks or bayou water on a low lot. We map where it went instead of assuming the street flooded.',
    'energy-corridor':
      'Low ground along Buffalo Bayou has a storm history. A second-floor supply leak is a different job. We ask which one happened before equipment is set.',
    westchase:
      'Some low ground near Barker Reservoir has taken storm water. A water-heater leak in a Westchase townhome is still the more ordinary call, and we dry the one that happened.',
    alief: 'Alief calls mix slab leaks and storm water near the bayou drains. We meter, extract what is standing, and dry before anything is closed up.',
    'sugar-land':
      'A Sugar Land slab leak shows up at the base of the drywall. A detention pond does not tell us whether this house took water. Meters do.',
    bellaire:
      'Parts of Bellaire near Brays Bayou have flooded in tropical storms, and the city also has ordinary bath and kitchen leaks. The drying plan follows the source.',
    'the-heights':
      'A Heights crawlspace and a slab addition do not dry the same way. If water reached both, we map both. A raised floor is not a reason to skip drying.',
    'the-woodlands':
      'Woodlands water is usually a roof, a heater, or a supply line, sometimes after a pine limb. Creek lots are the exception we ask about. Drywall waits until the readings say the wall is dry.',
  },
  'insurance-claims': {
    houston:
      'We photograph and note what got wet or what the storm did. Wind and rising water are often different policies in Houston. Your insurer decides which applies.',
    katy: 'A Katy claim might be hail on a roof or a leak on a slab. We document what you hire us to record. An association’s roof rules are not the coverage decision.',
    memorial:
      'Memorial claims are often wind, hail, or a limb, and sometimes bayou water on a low lot. Those can be different policies. We keep the photos straight.',
    'energy-corridor':
      'Corridor storm claims sometimes involve bayou water and sometimes a hole in the roof. We photograph the conditions. We do not negotiate the claim.',
    westchase:
      'Westchase documentation starts close to the office, which helps when more rain is coming. Photos still come before cleanup throws the evidence away.',
    alief: 'An Alief record is the house in front of us: the roof, the wet drywall, the floor. We do not estimate what the carrier will pay.',
    'sugar-land':
      'A Sugar Land roof claim still belongs to your insurer for coverage and, separately, to the association for color. We do not mix those conversations.',
    bellaire:
      'Near Brays Bayou, rising water and a roof opening may not be the same policy. We photograph what we see in Bellaire and leave the decision to your insurer.',
    'the-heights':
      'Heights claims on older roofs need photos before debris is hauled off. A historic district does not change who decides coverage.',
    'the-woodlands':
      'Woodlands claims often start with pine debris and a punctured roof. We photograph before a tarp goes down. Covenant approval for the new roof is not coverage.',
  },
  'painting-drywall-repair': {
    houston:
      'Paint in Houston finishes the drywall. We prime because of humidity, and we feather a patch because texture will show a hard edge.',
    katy: 'Katy paint is often the last step of a kitchen or a bath in a newer house. We paint the whole room when a spot repair would flash.',
    memorial:
      'Memorial walls are tall. A stair hall and a patched living room are different amounts of paint. Texture is blended so the color has one plane.',
    'energy-corridor':
      'A corridor interior might be a smooth townhome wall or an older textured house. We match the wall you have.',
    westchase:
      'Westchase drywall repairs often follow a leak or a small remodel. The wall is confirmed dry before it is closed and painted.',
    alief: 'Alief walls have often been patched before. The new repair is feathered so it does not stack a second hard edge on the first.',
    'sugar-land':
      'Sugar Land rooms open onto each other. Paint is planned so the sheen matches where you can see two rooms at once.',
    bellaire:
      'Bellaire houses mix old texture, plaster, and new drywall. We blend to the surface that is actually on that wall.',
    'the-heights':
      'Heights walls may be plaster or textured drywall, and the trim is often original. Paint stops at that trim, and a patch is feathered into the old surface.',
    'the-woodlands':
      'Woodlands paint is an interior finish. The covenants are about the outside. New drywall is still primed, and the sheen matches the open rooms.',
  },
};

export function beatFor(serviceSlug: string, areaSlug: string) {
  const row = priorityBeats[serviceSlug];
  if (!row) throw new Error(`No priority beats for ${serviceSlug}`);
  return row[areaSlug];
}
