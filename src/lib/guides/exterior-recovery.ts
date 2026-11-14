import type { ServiceGuide } from '@/lib/guides/types';

const steps = (
  items: readonly [string, string][],
): ServiceGuide['process'] => items.map(([title, body]) => ({ title, body }));

export const siding: ServiceGuide = {
  process: steps([
    ['Look at the elevation', 'We see the profile, the sun fade, the corners, and whether the damage is a section or the wall. South and west sides in Houston age faster than the north.'],
    ['Match or replace', 'A repair works when the profile and the faded color can be blended. A full wall is the recommendation when a patch will always read as a patch.'],
    ['Open what is soft', 'If the sheathing or the weather barrier is wet or rotten, the pretty boards are not the repair. We show you that layer before we cover it again.'],
    ['Detail the trim', 'Corners, windows, doors, and soffits are planned with the profile. Board-and-batten and lap do not finish the same way at a window.'],
    ['Install and finish', 'The new wall goes on with the flashing and the paint or the factory finish the product uses. Color is matched to the boards that are on the house now, not to a chip from the year it was built.'],
    ['Walk the curb', 'We look at the elevation from the street and at the joints up close, and we list anything that still needs a pass.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the siding is more than paint.',
      paragraphs: [
        'Soft boards at a hose bib, swelling at the bottom course, paint that keeps peeling on the west wall, or a crack that opens at a corner after a storm are reasons to look at the wall, not only the color. Hail and wind bruise and crack fiber cement and knock wood siding loose. A section can be replaced when the profile still exists and the fade can be blended. A wall that is tired on every course is a replacement.',
        'If you can see the sheathing, or the wall feels soft, water is already behind the siding. Covering that with new boards without drying and flashing it repeats the rot. We look behind the damage before we order a match.',
      ],
      points: [
        { title: 'Fade on the sunny side', body: 'A new board next to ten-year-old south-facing siding will not match the original chip. We match the wall as it is, or we say the wall needs more than a patch.' },
        { title: 'Bottom courses', body: 'The lowest boards see sprinklers, soil, and splashback. Rot there is often drainage and grade, not only a bad board. The grade is part of the look.' },
        { title: 'Storm hits', body: 'Wind-lifted courses and impact cracks are documented. A storm repair and a full re-side are different scopes. The inspection says which.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Lap, board-and-batten, and what is behind them.',
      paragraphs: [
        'Fiber cement and engineered wood are the profiles we install most, in lap, board-and-batten, and other common patterns. Fiber cement handles Houston sun and humidity better than untreated wood, and it still wants the flashing, the clearance off the roof and the grade, and the paint or finish the manufacturer expects. Engineered wood wants the same respect for water at the ends and the bottom edge. We talk through which profile fits the house, from a newer Cinco Ranch elevation to an older Memorial wall that only needs a matched section.',
        'The weather barrier and the flashing at windows and doors are the wall you do not see. New siding over a torn barrier is a short-term look. Trim, corners, and soffits are finished with the field so the elevation reads as one job. Color is chosen in the daylight on that wall. A sample in a showroom lies.',
      ],
      points: [
        { title: 'Profile changes the house', body: 'Board-and-batten and lap are different shadows and different trim. We decide that with the elevation, not after the first course is up.' },
        { title: 'Clearances', body: 'Siding that runs into the roof, the soil, or a deck ledger stays wet. We keep the gaps that let the wall dry.' },
        { title: 'Paint with the boards', body: 'Cut ends and field finish are done as the wall goes up, not months later. Raw cuts in this humidity are how the next peel starts.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'A section, a wall, or the whole house.',
      paragraphs: [
        'As a planning range, not a quote, a matched repair of a damaged section often falls around $800 to $3,500 when the profile can be found. A full wall or a typical single-family re-side often plans around $10,000 to $30,000, more for a complex two-story, a lot of windows, or a premium profile. Stories, gables, and how much rotten sheathing is hiding are the usual reasons a number moves. We do not price siding by the square of the roof.',
        'Paint-only on sound boards is a different project from a re-side. If the boards are sound and the paint has failed, we will say so. If the boards are soft, paint is a waste. Storm documentation, when you are filing, is photos of the damage and of the completed repair. Your insurer decides coverage. We do not.',
      ],
      points: [
        { title: 'Sheathing', body: 'Soft plywood or a failed barrier behind the siding is extra work. We open enough to know, and we stop to show you before the job grows.' },
        { title: 'Height', body: 'A one-story ranch and a two-story with a tall gable are different access. The price follows the wall, not the neighborhood name.' },
        { title: 'Trim and openings', body: 'Every window and door is a flashing detail. A house with more openings takes longer. That is the job, not a complication.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Sun, splash, and the permit on the address.',
      paragraphs: [
        'West and south walls here take the sun and the weather. North walls grow mildew in the shade. A repair plan that treats all four sides as the same age will look wrong in a year. Sprinklers that hit the wall, and soil piled against the bottom course, keep the wall wet no matter how good the siding is. We point that out. Fixing the sprinkler is not something we pretend a new board will solve by itself.',
        'A full re-side in the City of Houston can require a permit. A small repair often does not. Bellaire, West University Place, Sugar Land, Pearland, and the counties that cover much of Katy and The Woodlands are different counters. We check the address. If the wall was opened by wind or hail, we photograph it before we cover it. Hurricane season is June 1 through November 30. That is when a lot of these calls come, and it is not the only time sun and irrigation rot a bottom course.',
      ],
      points: [
        { title: 'With the roof', body: 'Step flashing where a roof meets a wall has to be right before new siding meets that wall. If both are in the project, we plan them together.' },
        { title: 'Older walls', body: 'Some older Houston houses have layers. What is under the siding changes the scope. We do not assume one layer of plank on plywood.' },
        { title: 'Records', body: 'Photos of storm damage and of the repair are yours to share. A planned re-side is not a claim. We do not describe it as one.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Can you replace a section instead of the whole wall?',
      a: 'Often, if the profile exists and the sun fade can be blended. If a patch will always show, we say the wall needs more. We decide that on the house, not from a photo of the sunny side only.',
    },
    {
      q: 'What is a planning range for siding?',
      a: 'A matched section often falls around $800 to $3,500. A full wall or a typical house often plans around $10,000 to $30,000, more when the wall is tall or the sheathing is rotten. Those are planning ranges, not a quote.',
    },
    {
      q: 'Fiber cement or engineered wood?',
      a: 'Both can work. Fiber cement is the usual answer for Houston sun and humidity when the profile fits the house. We talk through ends, clearances, and finish before anything is ordered.',
    },
    {
      q: 'Do you document storm damage?',
      a: 'Yes. We photograph the damage and the repair. Your insurer decides coverage. We are not a public adjuster.',
    },
  ],
};

export const patiosDecks: ServiceGuide = {
  process: steps([
    ['See the yard and the door', 'We measure the door, the grade, and what is holding up anything already there. A ground-level patio and an elevated deck are different structures.'],
    ['Check what is sound', 'Ledger, posts, footings, and joists are inspected before new boards go down. Rotted structure comes out. Sound structure can stay.'],
    ['Choose the surface', 'Wood, composite, pavers, or concrete, and whether a cover is part of the project. Houston sun and rain are part of that choice, not a footnote.'],
    ['Permit if it is a structure', 'An attached deck or a patio cover usually needs a permit. A simple at-grade patio often does not. The office is the one that covers the address.'],
    ['Build and flash', 'Footings, framing, the ledger where it meets the house, decking or paving, rails, and stairs. Water is sent away from the wall, not toward it.'],
    ['Walk it', 'We check rails, stairs, the door threshold, and the way the cover sheds, and we walk it with you before we call it done.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the deck or patio is unsafe or used up.',
      paragraphs: [
        'Soft decking, a rail that moves, a stair that dips, or a ledger pulling away from the house are reasons to rebuild, not to stain. A patio that holds water against the slab, or a cover that dumps rain at the back door, is a drainage problem you feel every storm. Shade structures that were added without a thought for wind are the ones that rack.',
        'Sometimes the framing is sound and the boards are gone. Sometimes the boards hide rotten joists. We look underneath before we recommend a resurface. A new composite board on a rotten ledger is not a repair.',
      ],
      points: [
        { title: 'The ledger', body: 'Where the deck meets the house is the detail that keeps water out of the wall and keeps the deck on the house. It is the first thing we inspect.' },
        { title: 'Rails and stairs', body: 'Loose rails and uneven stairs are the parts people fall on. They are not trim. If they move, they are in the scope.' },
        { title: 'Water at the door', body: 'Ponding on a patio or a negative slope toward the slab shows up indoors as a wet floor. The outdoor work has to fix the slope.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Wood, composite, pavers, and covers.',
      paragraphs: [
        'Wood looks like wood and it wants maintenance in this sun and rain. Composite and capped boards ask less of you and cost more up front. Both need framing that can carry them and a gap pattern that drains. Pavers and concrete are the ground-level answer when you do not need to stand above the grade. A cover, wood or metal, is posts, beams, and a roof that sheds away from the wall. It is planned with the patio, not bolted on after the fact.',
        'Rails, stairs, and gates are part of the same design. A pretty deck with a stair that is an afterthought is how people get hurt. Flashing at the house and clearance so the siding is not buried are part of the build. We do not bury siding behind a new ledger.',
      ],
      points: [
        { title: 'Sun and upkeep', body: 'A west-facing deck in Houston cooks. We talk about finish, color, and how often you want to maintain it before the boards are ordered.' },
        { title: 'Footings', body: 'Posts sit on footings sized for the structure and the soil, not on a surface block because it was faster. Clay soil here moves. The footing plan respects that.' },
        { title: 'The door', body: 'The threshold, the siding, and the first step are one detail. Water and the walk have to work at that line.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'What changes an outdoor project’s price.',
      paragraphs: [
        'As a planning range, not a quote, a ground-level paver or concrete patio often falls around $4,000 to $15,000 depending on size and how much the grade has to change. Rebuilding a deck on sound footings, with new framing where it is needed and new boards, often plans around $8,000 to $20,000. An elevated deck or a patio cover often plans around $12,000 to $35,000. Height, the cover, rails, and rotten structure are what push a project up. A stain on sound boards is not in these bands. We will say if that is all you need.',
        'Demolition of an old deck, access through a fenced yard, and electrical for a fan or a light on a cover are extras when they are real. We do not bury them. If a storm damaged the deck, we can photograph it. Coverage is your insurer’s decision.',
      ],
      points: [
        { title: 'What can stay', body: 'Sound footings and posts save money. Guessing they are sound and finding rot later is how budgets break. We open the framing first.' },
        { title: 'The cover', body: 'Posts, beams, and roofing are a structure. They are a different price from decking alone, and they usually bring a permit.' },
        { title: 'Grade', body: 'Moving soil so water leaves the house is part of a patio. Skipping it to save the number keeps the water at the slab.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Rain, sun, clay, and permits.',
      paragraphs: [
        'A deck or patio here has to shed a hard rain and survive a west sun. Boards gap so water does not sit. A patio slopes away from the house. A cover is tied so wind has a harder time racking it, and we still will not call it storm-proof. Expansive clay swells and shrinks. Footings and a patio that was poured tight against a moving slab need room to move without directing water inside.',
        'In the City of Houston, an attached deck and a patio cover usually need a permit. An at-grade paver patio often does not, if it is not a structure. The Memorial villages, Bellaire, Sugar Land, and the county that covers a Katy or Woodlands address have their own rules. We confirm from the address. Hurricane season, June 1 through November 30, is a bad time to leave a ledger open. We sequence the work so the wall is not left unprotected into a storm.',
      ],
      points: [
        { title: 'Siding and the ledger', body: 'The ledger flashes into the wall. If the siding is in the same project, we detail them together so the outdoor room belongs to the elevation.' },
        { title: 'Trees', body: 'Shade is pleasant and limbs are a load. We do not build where a limb will land on the cover without saying so.' },
        { title: 'One outdoor room', body: 'Surface, rails, stairs, and cover are easier to get right as one project. We can phase them. We do not pretend a later cover will magically fit a patio that ignored it.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'When is new decking enough, without new framing?',
      a: 'When the ledger, posts, and joists are sound. New boards and rails can go on that frame. If the structure is rotten, it comes out. We look underneath before we recommend a resurface.',
    },
    {
      q: 'What is a planning range for a patio or deck?',
      a: 'A ground-level patio often falls around $4,000 to $15,000. A deck rebuild often plans around $8,000 to $20,000. An elevated deck or a cover often plans around $12,000 to $35,000. Those are planning ranges, not a quote.',
    },
    {
      q: 'Does a patio cover need a permit?',
      a: 'Usually, yes, when it is a roof structure, and an attached deck usually does too. A simple at-grade patio often does not. The office depends on the address, and we confirm it.',
    },
    {
      q: 'Wood or composite in this sun?',
      a: 'Wood is the look and the upkeep. Composite asks less maintenance and costs more at the start. We talk through a west-facing yard before you order either one. Neither is maintenance-free in the sense of never being looked at.',
    },
  ],
};

export const emergencyTarp: ServiceGuide = {
  process: steps([
    ['Take the call', 'Tell us what happened, where in the Houston area, and whether water is still coming in. If you cannot call (713) 909-0034, the emergency form is a request for a call back, not a guaranteed arrival time.'],
    ['Make it safe', 'Stay off a wet or damaged roof. We do not put a crew up in lightning or in wind that makes the roof unsafe. If the ceiling is sagging, stay out of that room.'],
    ['Photograph', 'We document the opening, the surrounding roof, and interior wetting we can see before the tarp covers the evidence. Your insurer decides what those photos are worth.'],
    ['Anchor the cover', 'The tarp is sized to the opening and secured so the next wind does not turn it into a sail. A loose cover is the next leak.'],
    ['Divert water', 'Water is directed off the cover and away from the opening. A tarp that holds a pond will find its way inside.'],
    ['Plan the permanent roof', 'We tell you whether the next step is a repair or a replacement, and what drying the interior needs. The tarp is the pause, not the roof.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'When the first job is to stop the water.',
      paragraphs: [
        'Call when a limb is through the roof, when shingles are gone and you can see deck, when wind lifted a valley and the ceiling is dripping, or when a skylight or a flashing pulled loose in a squall. A slow stain that has been there all year is a repair to schedule. An open roof with weather still in the forecast is the emergency. Those are different speeds, and we will tell you which one you are describing.',
        'If water is already in the insulation and the ceiling, say that on the call. The tarp stops more water. The wet rooms are a drying job. Both can be this company. They are not the same hour of work, and we do not treat a soaked ceiling as solved because the roof is blue.',
      ],
      points: [
        { title: 'Do not climb it', body: 'A wet roof, a dark roof, and a roof in the storm are how people get hurt. Stay off it. Interior leaks can be caught with a bucket if the ceiling is sound and the power is safe.' },
        { title: 'Sagging ceilings', body: 'Wet drywall gets heavy. Leave the room if the ceiling is bulging. That is a reason to call, not a reason to poke it.' },
        { title: 'More weather coming', body: 'A cover matters most when another band of rain is behind this one. Hurricane season is June 1 through November 30, and spring squalls do the same job earlier in the year.' },
      ],
    },
    {
      eyebrow: 'The cover',
      heading: 'What a tarp does, and what it does not.',
      paragraphs: [
        'A tarp is a temporary weather cover. It buys time to dry the house and to plan a repair or a replacement. It is not a roof, it is not a warranty, and it does not make the deck sound. We photograph first when we can do that safely, then cover the opening, anchor the tarp against wind, and send water off it. We say when the cover should be checked, because sun and wind age a tarp faster than people expect.',
        'We will not install one if being on the roof is unsafe. Waiting for daylight or for a wind shift is the right call even when the ceiling is dripping. A crew injured on a roof does not dry your house. If only a small flashing leak is involved and the roof can wait for a proper repair, we will say the tarp is unnecessary. Covering a roof that does not need it is not a service.',
      ],
      points: [
        { title: 'Anchored, not draped', body: 'A tarp that is laid on and weighted with a few boards becomes the next opening. We fasten it for the wind that is still in the forecast.' },
        { title: 'Bigger than the hole', body: 'The cover has to reach sound roof and shed water past the damaged deck. A postage-stamp patch over a split valley will not.' },
        { title: 'Then the real roof', body: 'Repair or replacement is the next conversation, with the photos in hand. The cost guide for replacement is the planning tool for that step, not for the tarp.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'What a temporary cover costs to plan.',
      paragraphs: [
        'There is no flat tarp price, because height, pitch, how much roof is open, and whether it can be walked safely all change the work. As a planning range, not a quote, many single openings on a house that can be walked safely fall around a few hundred dollars to about $2,000. A steep, multi-story, or widespread opening is more, and it may not be safe to cover until the weather breaks. The permanent roof, if you need one, is a different number. Architectural asphalt replacement on many Houston houses plans around $12,000 to $24,000. That is not the tarp.',
        'Interior drying is also separate. A ceiling that is already wet does not get “included” in a tarp price by magic. We will tell you on the call what we need to see, and we will price what we find. We do not take a tarp job as a way to lock you into a replacement you have not agreed to.',
      ],
      points: [
        { title: 'Access', body: 'Two stories, a steep front, and trees against the eave change the day. A one-story ranch with a clear yard does not.' },
        { title: 'How open it is', body: 'A cracked skylight and a limb through three squares are not the same cover. We size it to the damage, not to a standard package.' },
        { title: 'The claim is not the price', body: 'Some policies pay for temporary covering that limits further damage. Some do not pay what you hoped. We do not set that. We also do not wait to cover a house that is taking on water if it is safe to be up there.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Storms, photos, and the interior underneath.',
      paragraphs: [
        'The calls come from Clear Lake and Galveston after coastal wind, and from Katy, Cypress, and The Woodlands after hail and straight-line wind. The work is the same sequence: safe access, photos, a cover that stays on, then a plan. Live oaks throw limbs. Older roofs open at valleys and at wall flashing. Newer roofs open when a ridge vent or a pipe boot gives up. We document the one you have.',
        'Many Texas policies use a separate wind or hail deductible that is a percentage of the dwelling limit. That deductible is not the one on a plumbing leak, and it can be a large number. Whether this storm clears it is a question for your insurer. Our part is the photos and the protection. Call (713) 909-0034. The office is at 511 Crestwater Ct, Houston, TX 77082, and the form on this site reaches the same team. Neither is a promise that someone is already on the way.',
      ],
      points: [
        { title: 'Photograph before cleanup', body: 'Wide shots and close shots, before belongings are thrown away and before the tarp hides the opening. We take our own set too.' },
        { title: 'Start drying', body: 'Wet insulation will not pause because an adjuster has not visited. If the interior is wet, say so. Drying is the water-damage scope, and it can start while the roof decision is still open.' },
        { title: 'Check the cover', body: 'After the next wind, a tarp can loosen. We tell you what to look for and when it needs another visit. It is still temporary.' },
      ],
    },
    {
      eyebrow: 'Buildings',
      heading: 'Houses, apartments, and low commercial roofs.',
      paragraphs: [
        'The same storm that opens a house in Katy can open a stairwell roof on an apartment building in the Energy Corridor or a low commercial roof in Westchase. The sequence does not change because the building is bigger: stay off it until it is safe, photograph the opening, cover what we can reach, and note which ceilings are wet. A property manager usually needs those photos the same day.',
        'Board-up is the wall and the glass. A tarp is the roof. A limb can make both true. We say which openings we can secure on that visit. Flat roofs pond, so a loose cover is worse than none. Call (713) 909-0034 any time for an active storm or water emergency. The office at 511 Crestwater Ct is open Monday through Saturday, 8:00 AM to 6:00 PM for a scheduled visit.',
      ],
      points: [
        { title: 'Many units', body: 'Water in a top-floor ceiling can be one unit or a stack. We ask which ceilings are wet before we treat the building as a single room.' },
        { title: 'Access', body: 'A roof hatch, a gate code, and whether people are still inside belong on the first call.' },
        { title: 'Who we work for', body: 'We work for the owner or the manager who calls. We are not a preferred vendor of any insurer, and the carrier still decides the claim.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Is a tarp a finished repair?',
      a: 'No. It is temporary protection so the next rain stays out. The repair or the replacement is planned after the house is covered and we can see the deck.',
    },
    {
      q: 'What does emergency tarping usually cost?',
      a: 'Many single openings on a walkable roof plan around a few hundred dollars to about $2,000. Steep, tall, or widespread damage costs more. That is a planning range, not a quote, and it is not the price of a new roof.',
    },
    {
      q: 'Should I wait for the adjuster before the roof is covered?',
      a: 'Protect the house. We photograph the damage first when it is safe, then cover it. Leaving an opening exposed so someone can see it later lets in the next storm. Your insurer still decides coverage.',
    },
    {
      q: 'Will you come during the storm?',
      a: 'We do not put people on a roof in lightning or in wind that makes it unsafe. Call (713) 909-0034 and we will tell you the next safe step. The online form is a request for a call back, not a guaranteed arrival time.',
    },
    {
      q: 'Do you tarp apartment and commercial roofs?',
      a: 'Yes. Houses, apartment buildings, and low commercial roofs in Greater Houston, when we can reach them safely. Tell us the access and whether water is already in a ceiling.',
    },
    {
      q: 'How is a tarp different from board-up?',
      a: 'A tarp covers a roof opening. Board-up closes a broken window, door, or wall. Some storms need both. The board-up page is the wall. This page is the roof cover.',
    },
    {
      q: 'Can a manager reach you after office hours?',
      a: 'For an active storm or water emergency, call (713) 909-0034 any time. The office at 511 Crestwater Ct, Houston, TX 77082, is open Monday through Saturday, 8:00 AM to 6:00 PM for scheduled visits. You can also text that number.',
    },
  ],
};

export const insuranceClaims: ServiceGuide = {
  process: steps([
    ['Make the scene safe', 'Stop more water if you can do that safely. Stay out of wet rooms with damaged ceilings or live power. Call (713) 909-0034 if water is still coming in.'],
    ['Photograph before you toss', 'Wide shots, close shots, the source, and the belongings, before they are bagged. The photo log on this site is a room-by-room way to do that yourself.'],
    ['Notice the insurer', 'Call the company on the policy or the agent who can open a claim. Ask how they want notice. Write down the claim number. We do not quote you a deadline. The policy does.'],
    ['We document the building', 'Our photos and notes cover what was wet, what was dried, and what was repaired. You can share them. They are not a coverage opinion.'],
    ['Dry and protect', 'Tarping a safe roof and drying wet structure do not wait on a meeting. Many policies expect you to limit further damage. That work is still not a promise of reimbursement.'],
    ['Rebuild as construction', 'The repair is a scope and a price. The claim payment is whatever the insurer allows. We keep those labeled separately, and we do not negotiate the claim.'],
  ]),
  sections: [
    {
      eyebrow: 'What this is',
      heading: 'Photos and a clear record. Not a coverage decision.',
      paragraphs: [
        'Insurance claims help, here, means inspection photos and notes on water or storm damage, tied to the work if you hire us to dry or rebuild. It does not mean we file the claim for you, interpret the policy, or argue with the adjuster. Your insurer decides what is covered. We are not a public adjuster. The free insurance photo log is yours whether or not you hire us. It is a packet, not a promise about payment.',
        'The losses we document most often start with a roof opening, a supply line, an appliance, or water that came in at grade. Those are different facts. A homeowners policy often treats them differently, and flood from rising water is often a different policy entirely. We describe what we can see. We do not rename a flood as a sudden plumbing break because the second phrase sounds more payable.',
      ],
      points: [
        { title: 'Your photos first', body: 'If it is safe, shoot the rooms before you clean. Thrown-away belongings and a mopped floor are hard to explain later. Do not wait on us to take the only pictures.' },
        { title: 'Our photos second', body: 'We add the conditions we find, the moisture, the tear-out, and the repair. They are specific. They are not a narrative written to chase a number.' },
        { title: 'Two different jobs', body: 'The paper and the construction stay separate. Drying a house is not “handling the claim.” Building it back is not a settlement.' },
      ],
    },
    {
      eyebrow: 'Records',
      heading: 'What to write down, and what we will write down.',
      paragraphs: [
        'Write the date you noticed the damage, who you called, and the claim number. Keep the failed hose or the fitting if you can do it safely. Note whether water came from a pipe, from the roof, or from the street. Ask the insurer what they want saved and whether they want to see anything before it is removed. Notice language is in the policy. It is not the same on every Texas policy, so we will not invent “you have 48 hours” or any other deadline.',
        'When we are on the loss, the notes say where the water went, what was dried, what was removed, and what was rebuilt. Photos are taken before a tarp covers an opening when that is safe, and before new drywall closes a wall. You may give that set to the adjuster. We can walk an adjuster through what we saw of the building. We do not negotiate the dollar figure and we do not sign your claim over to ourselves.',
      ],
      points: [
        { title: 'The photo log', body: 'The log on this site is room by room. Use it the day of the loss if you want a structure. It is free. It does not create coverage.' },
        { title: 'Cause in plain words', body: '“The supply line under the sink failed” is a fact if that is what happened. “The policy should pay” is not a fact we will write.' },
        { title: 'Depreciation', body: 'Some policies pay actual cash value first and hold recoverable depreciation until the work is done. Some do not. The wording is yours. We do not calculate it for you.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'The construction price and the claim are different.',
      paragraphs: [
        'We do not publish a separate price list for documentation. Photos and notes ride with the inspection, the drying, or the repair you hire. The construction price is the scope of that work. For scale, a contained one-room water loss often plans around $1,500 to $5,000, a room that needs drywall and flooring often around $5,000 to $15,000, and a larger loss often around $15,000 to $50,000 or more. An asphalt roof replacement on many Houston houses plans around $12,000 to $24,000. Those are planning ranges for the building, not a prediction of the check.',
        'The insurer’s figure and our estimate measure different things, and they can differ. A percentage wind or hail deductible, often one, two, or five percent of the dwelling limit on Texas policies near the coast, can be larger than a plumbing deductible on the same policy. If the check is short of the scope, the conversation is about the scope. The estimate stays the work required to repair the house.',
      ],
      points: [
        { title: 'The claim stays yours', body: 'Hiring the drying or the repair does not assign the claim to us. You remain the person on the policy. We document the building.' },
        { title: 'Mitigation is still work', body: 'A tarp and a dry-out have a cost even when you hope the policy reimburses them. We price that work as work. Starting it is not an approval from the carrier.' },
        { title: 'Get the number from the visit', body: 'Call (713) 909-0034 or request an estimate. The address is 511 Crestwater Ct, Houston, TX 77082. The visit is how the scope, and then the price, gets decided.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Wind, plumbing, and flood are not the same story.',
      paragraphs: [
        'A spring hail storm, a hurricane-season opening in the roof, a burst hose in August, and water that came in from a bayou or a flooded street produce different documentation because they are different events. Hurricane season is June 1 through November 30. Hail is often earlier. Plumbing failures do not read the calendar. Rising water is the one people most often confuse with a homeowners claim. If the water came from outside and rose into the house, say that. Do not let anyone, including us, soften it into a phrase that sounds easier to cover.',
        'Houses on slabs hide water under floors. Pier-and-beam houses drop it into the crawl space. The photos should show the path, not only the room that looks the worst. Older Heights and West University houses may have plaster. Newer Katy houses may have wet insulation in a big open ceiling. We document the assembly that is there. The permit for the rebuild, if plumbing, electrical, structure, or a full roof is involved, follows the address: City of Houston, an independent city, or the county. The claim does not replace the permit.',
      ],
      points: [
        { title: 'Limit further damage', body: 'Many policies expect you to protect the property. Cover an open roof when it is safe. Start drying. Keep the receipts and the photos. That is mitigation, not an admission you know the coverage.' },
        { title: 'Do not discard the source', body: 'The failed part helps the story. Bag it if you can. A repaired pipe with no photo of the break is a thinner record.' },
        { title: 'One company, labeled work', body: 'Tarping, drying, and the rebuild can stay with Elite Restorations, family-owned in Houston since 1993. The claim file and the construction file are still two files.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Do you file claims or negotiate with the insurer?',
      a: 'No. We photograph and note the damage and the work. Coverage, payment, and depreciation belong to your insurer. We are not a public adjuster.',
    },
    {
      q: 'Is there a fee for the documentation?',
      a: 'We do not publish a standalone price for documentation. Photos and notes are part of the inspection, drying, or repair you hire. The photo log on the site is free to use on your own.',
    },
    {
      q: 'What should I do before anyone arrives?',
      a: 'If it is safe, stop more water, photograph the rooms, and keep the failed part. Then call your insurer and call (713) 909-0034 if you want us on the building. Do not gut a room before it is documented.',
    },
    {
      q: 'Why might the insurance check and your estimate differ?',
      a: 'They measure different things. The check is what the policy pays. The estimate is the cost of the scope. Wind and hail deductibles on many Texas policies are a percentage of the dwelling limit and are not the plumbing deductible. We do not rewrite the work to force those numbers to match.',
    },
  ],
};

export const paintingDrywall: ServiceGuide = {
  process: steps([
    ['See the wall', 'We look at the damage, the texture, and whether the wall is dry. A leak stain and a scuffed corner are different repairs. Older plaster is different from modern drywall.'],
    ['Confirm it is dry', 'If the wall was opened by water, moisture readings come before close-up. Paint over a damp stain seals the problem in. We will not do that to hold a schedule.'],
    ['Patch or hang', 'Small damage is patched and feathered. A large area, or drywall that came out in a dry-out, is hung, taped, and finished to the level the room needs.'],
    ['Texture', 'Houston walls are often textured. The patch is blended into that texture so the paint has one plane. A smooth patch on an orange-peel wall will show forever.'],
    ['Prime and paint', 'Primer, then paint, in the sheen the room needs. A spot repair is carried far enough to blend. A whole room is painted when a spot would flash.'],
    ['Clean and walk', 'We pick up the work and look at the wall in the light you live with, including the raking light from a window that shows every ridge.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the wall needs more than a gallon of paint.',
      paragraphs: [
        'Paint is the last step when the surface is sound. It is the wrong first step when the drywall is soft, the tape is bubbling, the texture is missing in a patch, or a stain keeps bleeding through. After a kitchen or a bath remodel, the new drywall is unfinished until it is taped, textured, primed, and painted with the room. After a water loss, the same steps wait until the cavity is dry.',
        'Hairline cracks that come back in the same place on a slab house are often the soil moving, not a painter who missed a coat. We can make the wall look right. We will not tell you paint stops foundation movement. A door that suddenly will not close is a clue to mention, not a punch item to sand away.',
      ],
      points: [
        { title: 'The stain returns', body: 'A water stain that telegraphs through new paint was not dry, or it was not primed for the stain. We find out which before a third coat.' },
        { title: 'Texture that does not match', body: 'A smooth float on a textured wall reads as a patch in daylight. Blending is the repair. Painting alone is not.' },
        { title: 'After the remodel', body: 'New lid, new returns, and patched outlets are what make a finished kitchen look unfinished. They are part of closing the project.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Board, texture, primer, and sheen.',
      paragraphs: [
        'Drywall, tape, and joint compound are the body of the repair. The texture is what makes it disappear: orange peel, knock-down, or a smooth wall where the house is actually smooth. A lot of Heights, Bellaire, and West University interiors are textured, and some are plaster. Plaster is patched as plaster, not buried under a thick skim that cracks off. Primer is chosen for the stain and for new compound, which flashes if you paint it raw.',
        'Sheen is a Houston practical choice. Flat hides more and marks more. A higher sheen in a bath or a kitchen cleans and shows every ridge. Color is matched to the wall you have when the job is a blend, and carried to a corner or a whole room when a spot would flash. We do not promise a one-pint touch-up will vanish on a wall that has faded for a decade in a south window.',
      ],
      points: [
        { title: 'Feather past the damage', body: 'A hard edge of compound shows through paint. The repair is feathered wide enough that the eye cannot find the border.' },
        { title: 'Bath and kitchen paint', body: 'Wet rooms want a paint that can be wiped. A flat ceiling paint on a bath wall is the wrong product. We match the paint to the room.' },
        { title: 'Ceilings', body: 'A ceiling stain from a roof or a bath above is primed for the stain and often painted past the spot, because ceiling paint flashes under window light.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'A patch, a room, or the drywall after a loss.',
      paragraphs: [
        'As a planning range, not a quote, a small patch blended and painted often falls around a few hundred dollars to about $1,500. Painting a whole room, with ordinary prep, often plans around $800 to $3,000. Replacing drywall in several rooms after a water loss, before paint, often plans around $2,500 to $10,000, and it waits on drying. Texture, ceiling height, plaster, and how much furniture has to move are the usual adders. A full interior repaint of a large house is not these bands. We price the walls you point at.',
        'If the drywall is coming out because of a leak, the painting is the end of the restoration, not a separate decorating project, unless you are changing color across rooms that were never wet. We will label it that way. Your insurer decides what is paid. We decide when the wall is dry enough to close.',
      ],
      points: [
        { title: 'Blend versus repaint', body: 'A spot repair is cheaper and only works when the color and the texture can disappear. Faded paint usually wants the whole wall or the whole room.' },
        { title: 'Plaster', body: 'Older plaster takes a different repair from a half-inch board. It is slower. The price should say so instead of treating every wall as new drywall.' },
        { title: 'After water', body: 'The dry-out is not in the paint price. Closing a wet wall is not a savings. We sequence them.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Humidity, light, and walls that move.',
      paragraphs: [
        'Interior paint still cares about humidity. A wall that is damp will not take a finish, and a house left open to August air is a poor place to cure paint. We paint in a closed, conditioned house. Baths that do not exhaust outdoors put moisture back into the ceiling we just painted. If the bath is in the project, the fan is part of the reason the ceiling failed, and it belongs in the conversation.',
        'West light in a Houston afternoon shows every ridge in a ceiling. We look at the repair in that light, not only under a work lamp. Seasonal cracks on slab houses in Katy and newer subdivisions, and racked trim in pier-and-beam bungalows, are the structure moving on clay. We can retape and repaint. We will tell you if the crack is a pattern that has come back because the soil moved, so you are not surprised when a hairline returns in the next dry summer.',
      ],
      points: [
        { title: 'Do not paint a wet stain', body: 'If the ceiling is from a roof leak or a bath above, the source and the dryness come first. Paint is the last coat, not the mop.' },
        { title: 'Color that has faded', body: 'South rooms fade. A careful match to a chip from the can may still flash. Painting to a break in the wall is the usual fix.' },
        { title: 'With the other trades', body: 'After cabinets, tile, and floors, paint is what makes the remodel look finished. We schedule it when the dust of those trades is actually done.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Will I see the patch after it is painted?',
      a: 'A good repair is feathered, textured to the wall, primed, and painted far enough to blend. A hard-edged patch on a textured Houston wall will show. That is the job we are not doing.',
    },
    {
      q: 'What is a planning range for paint and drywall?',
      a: 'A small blended patch often falls around a few hundred dollars to about $1,500. A room often plans around $800 to $3,000. Drywall replacement in several rooms after a leak often plans around $2,500 to $10,000 before paint. Those are planning ranges, not a quote.',
    },
    {
      q: 'Can you match texture in an older house?',
      a: 'Yes. Many Heights, Bellaire, and West University walls are textured or plaster. We blend the patch into that surface. We do not skim a textured wall smooth in one spot and call it matched.',
    },
    {
      q: 'Can you paint right after a water-damage repair?',
      a: 'After the readings say the wall is dry, and after the source is handled. Paint on a damp cavity traps moisture. We wait on the meters, not on the calendar.',
    },
  ],
};
