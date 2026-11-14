import { areaMiles, type AreaProfile } from '@/lib/local/areas';
import { hashString } from '@/lib/local/speak';
import { site } from '@/lib/site';

function fill(area: AreaProfile, template: string) {
  return template
    .replaceAll('{name}', area.name)
    .replaceAll('{housing}', area.housingShort)
    .replaceAll('{landmark}', area.landmark)
    .replaceAll('{miles}', String(areaMiles(area)))
    .replaceAll('{roads}', area.roads)
    .replaceAll('{direction}', area.direction)
    .replaceAll('{phone}', site.phone.display);
}

const visits: Record<string, readonly [string, string]> = {
  'kitchen-remodeling': [
    'On a {name} kitchen visit we walk the path you actually use, from the refrigerator to the sink to the range, and we mark the wall you hope to open before anyone calls it structural. Outlets, the dishwasher, and the landing spot for groceries are part of that walk. We leave with a layout that names what can move and what should stay, plus a materials list that can be ordered without inventing a second kitchen later. Bring a photo of a cabinet you like if you have one. You do not need a finished drawing.',
    'What we will not do in {name} is price a kitchen from {housing} alone. Two houses near {landmark} can share a decade and not share a drain. The visit is the cabinets that are there, the light you hate at night, and the floor height at the next room. After that, demolition has a sequence. Call {phone} when you want that hour on the calendar. The drive along {roads} is separate from the scope.',
  ],
  'bathroom-remodeling': [
    'A {name} bath visit starts in the wet wall. We look at the valve, the drain, the pan, and the fan, then at the door swing that a new vanity has to miss. If you have a second bath, say so, because that changes how the house lives during the work. Waterproofing is discussed while the wall is still visible in our notes, not after tile is chosen. Photos of the room help. A final grout color can wait.',
    'We do not treat every {name} bathroom as a primary suite. A powder room is a smaller scope, and we will say so. Near {landmark} the houses called {housing} still hide different drains. Call {phone} and name the bath. The straight-line distance, about {miles} miles {direction}, only gets us there. The pan and the waterproofing are decided at the address.',
  ],
  backsplash: [
    'For a {name} backsplash we measure the run, the outlets, and the counter edge that is staying. If you want a pattern with a center, we mark that center on the range or the window before mortar. Short walls and long open walls do not get the same module. You can bring a tile sample. The wall behind the old tile is something we have to see, because a soft backer changes the day.',
    'We will not pull {name} counters just to change the tile unless the top itself is failing. Say that the counters stay when you call {phone}. The visit confirms the substrate and the cuts at the window trim. {landmark} is about {miles} miles {direction}. That drive, on {roads}, is not the layout.',
  ],
  countertops: [
    'A {name} counter visit is useful once the cabinets you are keeping are the ones we will template. We look at level, at the sink you want, and at how a slab gets from the truck to the kitchen. Seams and overhangs are marked in the room, not guessed from a plan. If the top you have is only chipped, we say whether a repair is the real scope before a new slab is discussed.',
    'Do not order stone for {name} before this visit. Houses near {landmark} vary from square rebuilds to rooms that are not square at all. Call {phone} and say whether the boxes are already set. About {miles} miles {direction} by {roads} is the trip. The template is the work.',
  ],
  'wood-flooring': [
    'On a {name} wood-floor visit we look at thickness if you hope to sand, and at flatness and moisture if the floor will be new. Doors, stairs, and the room that should not get wood, usually a bath, are part of the walk. Furniture needs a plan before a sander or a stack of planks shows up. We acclimate new wood in the house. That schedule is set after we know the subfloor is a candidate.',
    'We will not promise a {name} refinish from a photo of the stain you want. The boards have to be thick enough, and the floor under them has to be quiet. Call {phone}. {landmark} is about {miles} miles {direction}. The route is {roads}. The inspection is still at the house.',
  ],
  'tile-flooring': [
    'A {name} tile visit checks flatness, door clearance, and whether any room is a wet room. A shower is a waterproof assembly. A living room is a flat field. We do not price them as one number. If you hope to tile over what is there, we test that idea against the height at the door before it becomes the plan. Layout lines are discussed so the cuts are not the first thing you see.',
    'Bring the room list to the {name} visit, especially if a bath and a kitchen are both in the request. Near {landmark} the substrate follows the house, which is described loosely as {housing} and still has to be seen. Call {phone}. The {miles}-mile straight line {direction} is only the drive along {roads}.',
  ],
  'vinyl-flooring': [
    'For vinyl in {name} we check that the floor is flat and dry, then we choose glue-down, click-lock, or a floating install for that subfloor. Tell us if a shower is on the list. It should not be vinyl. Kitchens and playrooms are the usual yes, after the ridge that carpet used to hide is measured. Transitions at doors are part of the same visit so the plank does not arrive and then fail to meet the tile.',
    'A {name} vinyl scope is not a box count from a phone photo. Call {phone} and name the rooms. {landmark} sits about {miles} miles {direction}, by {roads}. We still have to see the slab or the wood floor before the product is ordered.',
  ],
  'laminate-flooring': [
    'A {name} laminate visit is for bedrooms, halls, and living rooms unless we explicitly say a kitchen product fits. We check flatness, the stair if the floor will reach one, and the bath doorway that should stay tile. Underlayment is specified for the plank. It is not a substitute for fixing a hump. Boxes are acclimated in the house after the subfloor is accepted.',
    'We will not sell {name} laminate as a way to stiffen a bouncy floor. If the structure is the problem, that is the conversation. Call {phone}. The office is about {miles} miles from {landmark} in a straight line, {direction}, along {roads}. The floor is judged at the address.',
  ],
  carpentry: [
    'A {name} carpentry visit measures the profiles you want to keep and the opening you hope to change. Bring a loose piece of casing if the profile is hard to see in a photo. Built-ins are sized to the alcove, including outlets. We do not cut a wall until we know what it is holding. New wood is acclimated in the house, which is a schedule item, not a slogan.',
    'Say whether the {name} work is trim, a stair, a built-in, or an opening. Those are different tools and different days. Call {phone}. {housing} near {landmark} can mean original casing or none at all. About {miles} miles {direction} on {roads} gets us to the house. The profiles are measured there.',
  ],
  'tile-fireplaces': [
    'On a {name} fireplace visit we look at the firebox, the hearth, and the wall around them before we talk about stone. Not every house has a fireplace left to tile. If yours does, we say retile, resurface, or rebuild. Heat-rated materials are the assumption even when you rarely light it. A mantel is drawn with the field so the scale fits the room you sit in.',
    'A photo of the {name} face helps, and it does not replace the visit. We have to see cracks and the opening. Call {phone}. {landmark} is about {miles} miles {direction}. The drive uses {roads}. The surround is sized on site.',
  ],
  roofing: [
    'A {name} roof visit is on the roof when it is safe: every slope, the penetrations, the flashing, and any decking we can already tell is soft. We photograph what we find and say repair or replacement. If an association or a district controls color, tell us before we talk about a product. If water is coming in today, say that when you call so a temporary cover is the first topic, not a color chart.',
    'We do not price a {name} roof from the ground. Call {phone} and describe the leak or the storm. {landmark} is about {miles} miles {direction} in a straight line. {roads} is the drive. The recommendation still comes from the roof at the address, including slopes you cannot see from the driveway.',
  ],
  'roof-replacement': [
    'Before a {name} replacement we confirm a repair will not hold, then we talk tear-off, the deck, underlayment, flashing, vents, and the material. Color waits on the elevation and on any review the address requires. You should know whether you are filing a claim. We can photograph the roof. We cannot decide what the policy pays. Soft decking, if tear-off reveals it, is discussed before it is covered.',
    'Schedule the {name} inspection by calling {phone}. Do not order shingles first. Near {landmark}, about {miles} miles {direction} via {roads}, roofs that look alike from the street still hide different decks. The visit is how we see this one. The Houston cost page is a range, not this roof.',
  ],
  'roofing-emergency-tarp-repair': [
    'When you call about {name}, say if water is still entering and if anyone is near a wet ceiling or wet wiring. We come when the roof can be climbed safely. The order is photographs, then an anchored cover, then a plan for the permanent roof and for any interior that is already wet. A tarp left as the finished roof is not the outcome. Have a clear path to the house if the yard is blocked by debris.',
    'Call {phone} for {name} rather than waiting on a claim decision to keep rain out. {landmark} is about {miles} miles {direction}. {roads} is the route, and traffic plus the weather set the arrival. We will tell you if the climb has to wait for a safer hour. The emergency form reaches the same team.',
  ],
  siding: [
    'A {name} siding visit is up close: rot, fade on the south and west walls, and the trim at windows and corners. We say whether a section can match or the elevation wants to be replaced. If a committee reviews color, that answer is needed before boards are ordered. Storm damage can be photographed. Coverage, if you file, is your insurer’s decision. The wall is the construction.',
    'Tell us if the {name} request is a patch or a new profile. Those are different orders. Call {phone}. Houses near {landmark}, about {miles} miles {direction} along {roads}, do not share one siding material. We match, or replace, the wall that is there.',
  ],
  'patios-decks': [
    'For a {name} deck or patio we look at the door, the grade, and any ledger or footing that already exists. Soft structure is replaced before a new surface goes down. Water has to leave the wall. If an association reviews decks, covers, or fences, say so at the start so the order waits on that approval instead of on a pile of lumber. Rails and stairs are part of a raised deck, not a later extra.',
    'Say patio, deck, or cover when you call {phone} about {name}. They are different structures. {landmark} is about {miles} miles {direction} by {roads}. The yard at the address is what we measure, including a small lot that cannot take a deep platform.',
  ],
  'water-damage-restoration': [
    'Call about {name} as soon as you can do it safely. Stay away from wet electrical equipment. Tell us whether water is still coming in, and whether it is a line, a roof, or water that rose from outside. We map past the stain, extract what is standing, and dry with air movers and dehumidifiers because humidity here does not finish the job. Rebuild waits on readings. Photos are yours to share. Your insurer decides coverage.',
    'A {name} dry-out is not a same-day repaint. Call {phone} and describe the rooms you can see. Near {landmark}, about {miles} miles {direction} on {roads}, the arrival depends on traffic and on whether the roof is safe. The emergency form works if you cannot stay on the phone. We do not close wet walls to make a room look finished.',
  ],
  'insurance-claims': [
    'Before a {name} documentation visit, leave damaged materials in place if it is safe to do so, and do not assume we can reconstruct a story from an empty room. We photograph the roof, the rooms, and the source as far as it can be seen, and we keep wind, a plumbing leak, and rising water distinct in the notes. You may share that file. We do not file the claim for you, and we do not decide what is paid. The photo log on this site can start the record the same day.',
    'Call {phone} and say whether {name} still has water coming in. Protection and photographs can happen together. A calm documentation visit can be scheduled when the house is stable. {landmark} is about {miles} miles {direction}, along {roads}. None of that mileage changes the fact that coverage is your insurer’s decision.',
  ],
  'painting-drywall-repair': [
    'A {name} paint and drywall visit looks at texture, the size of the repair, and whether the wall is actually dry. After a leak, meters come before primer. A small patch and a whole room are priced differently because sheen flashes when the paint stops too soon. Tell us if trim has to be cut in crisply around original casing. Color samples are useful. They do not replace seeing the wall in the room light.',
    'Say if the {name} work is the end of a remodel or the finish after water. Call {phone}. Houses near {landmark}, roughly {miles} miles {direction} via {roads}, mix plaster, texture, and new board. We blend to the surface that is there. We do not coat a damp wall to hit a date.',
  ],
};

const closers = [
  'Nothing on this page is a bid for {name}. The number comes after we see the property, including the parts {housing} does not reveal from the street.',
  'Bring questions about what has already failed. A {name} scope written without that history misses the repair hiding under the finish.',
  'If an association or a city desk has to review part of the work, tell us on the {name} visit so the order does not get ahead of the paperwork.',
  'We would rather say a {name} idea will not fit than discover it after demolition or tear-off. That is what the hour at the house is for.',
  'Photos help us prepare for {name}. They do not replace measurements, moisture readings, or a look at the structure.',
  'The same trade in a neighboring city is a different page because the houses differ. This one stays on {name}.',
  'Ask what is included before work starts in {name}. Surprises belong in the visit notes, not in the last day of the job.',
  'A straight line of about {miles} miles to {landmark} is only how we get to {name}. The property still sets the scope.',
];

export function visitParagraph(serviceSlug: string, area: AreaProfile) {
  const options = visits[serviceSlug];
  if (!options) throw new Error(`Missing visit copy for ${serviceSlug}`);
  const index = hashString(`${serviceSlug}:visit:${area.slug}`) % options.length;
  const closerA = closers[hashString(`${serviceSlug}:close-a:${area.slug}`) % closers.length] ?? closers[0];
  const closerB = closers[hashString(`${serviceSlug}:close-b:${area.slug}`) % closers.length] ?? closers[1];
  const second = closerB === closerA ? closers[(closers.indexOf(closerA) + 1) % closers.length] : closerB;
  return fill(area, `${options[index]} ${closerA} ${second}`);
}
