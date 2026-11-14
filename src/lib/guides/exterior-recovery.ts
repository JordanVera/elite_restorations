import type { ServiceGuide } from '@/lib/guides/types';

const steps = (
  items: readonly [string, string][],
): ServiceGuide['process'] => items.map(([title, body]) => ({ title, body }));

export const siding: ServiceGuide = {
  process: steps([
    ['Look at the wall', 'We look at the board style, the sun fade, the corners, and whether the damage is a section or the wall. South and west sides in Houston age faster than the north.'],
    ['Match or replace', 'A repair works when the style and the faded color can be blended. A full wall is the plan when a patch will always show.'],
    ['Open what is soft', 'If the wood under the siding, or the wrap behind it, is wet or rotten, the pretty boards are not the repair. We show you that layer before we cover it again.'],
    ['Detail the trim', 'Corners, windows, doors, and the eave undersides are planned with the boards. Board-and-batten and overlapping rows finish differently at a window.'],
    ['Install and finish', 'The new wall goes on with metal that keeps water out at the joints, and with the paint or factory finish. Color is matched to the boards on the house now, not to a chip from the year it was built.'],
    ['Walk the curb', 'We look at the front from the street and at the joints up close, and we list anything that still needs a pass.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the siding is more than paint.',
      paragraphs: [
        'Soft boards at an outdoor faucet, swelling on the lowest row, paint that keeps peeling on the west wall, or a crack that opens at a corner after a storm are reasons to look at the wall, not only the color. Hail and wind bruise fiber cement and knock wood siding loose. A section can be replaced when that style still exists and the fade can be blended. A wall that is tired on every row is a replacement.',
        'If you can see the wood under the siding, or the wall feels soft, water is already behind it. Covering that before the wood is dry and the joints are sealed repeats the rot. We look behind the damage before we order a match.',
      ],
      points: [
        { title: 'Sunny-side fade', body: 'A new board next to ten-year-old south-facing siding will not match the original chip. We match the wall as it is, or we say it needs more than a patch.' },
        { title: 'Lowest boards', body: 'The lowest boards see sprinklers, soil, and splash. Rot there is often the ground level, not only a bad board. Where the soil sits is part of the look.' },
        { title: 'Storm hits', body: 'Rows the wind lifted, and impact cracks, are photographed. A storm repair and all-new siding are different jobs. The visit says which.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Rows, board-and-batten, and what is behind them.',
      paragraphs: [
        'Fiber cement and engineered wood are the boards we install most, in rows, board-and-batten, and other common patterns. Fiber cement handles Houston sun and humidity better than untreated wood, and it still needs metal that keeps water out, a gap off the roof and the ground, and the paint or finish the maker expects. James Hardie fiber cement, including HardiePlank lap siding and HardieTrim, is one of those boards. The James Hardie page covers ColorPlus, hail cracks, and replacing rotted wood. Engineered wood needs the same care with water at the ends and the bottom edge. We talk through which pattern fits the house, from a newer Cinco Ranch front to an older Memorial wall that only needs a matched section.',
        'The wrap, and the metal that keeps water out at windows and doors, are the wall you do not see. New siding over a torn wrap will not last. Trim, corners, and the eave undersides are finished with the boards so the front looks like one job. Color is chosen in daylight on that wall. A sample indoors will not match the sun outside.',
      ],
      points: [
        { title: 'Pattern changes the house', body: 'Board-and-batten and row siding are different shadows and different trim. We decide that with the wall, not after the first row is up.' },
        { title: 'Dry gaps', body: 'Siding that meets the roof, the soil, or the board tying a deck to the house stays wet. We keep the gaps that let the wall dry.' },
        { title: 'Paint with the boards', body: 'Cut ends and the finish on the main open wall go on as the wall goes up, not months later. Raw cuts in this humidity start the next peel.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'A section, a wall, or the whole house.',
      paragraphs: [
        'As a planning range, not a quote, a matched repair of a damaged section often falls around $800 to $3,500 when the style can be found. A full wall or new siding on a typical house often plans around $10,000 to $30,000, more for a complex two-story, many windows, or a premium pattern. Height, gables, and rotten wood under the siding move the number. The price follows the wall, not the size of the roof.',
        'Paint on sound boards is a different project from new siding. If the boards are sound and only the paint has failed, we will say so. Soft boards make paint a waste. If you are filing, the record is photos of the damage and of the finished repair. Your insurer decides coverage. We help with the photos and the work.',
      ],
      points: [
        { title: 'Wood behind it', body: 'Soft plywood or a torn wrap behind the siding is extra work. We open enough to know, and we stop to show you before the job grows.' },
        { title: 'Height', body: 'A one-story ranch and a two-story with a tall gable are different access. The price follows the wall, not the neighborhood name.' },
        { title: 'Trim and openings', body: 'Every window and door needs metal that keeps water out. More openings take longer, and that time is part of the work.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Sun, splash, and the permit on the address.',
      paragraphs: [
        'West and south walls here take the sun and the weather. North walls grow mildew in the shade. A plan that treats all four sides as the same age will look wrong in a year. Sprinklers that hit the wall, and soil piled on the lowest row, keep the wall wet no matter how good the siding is. We point that out. A new board will not fix a sprinkler that soaks the wall.',
        'New siding on a whole house in the City of Houston can require a permit. A small repair often does not. Bellaire, West University Place, Sugar Land, Pearland, and the counties that cover much of Katy and The Woodlands are different counters. We check the address. If wind or hail opened the wall, we photograph it before we cover it. Hurricane season is June 1 through November 30. Many of these calls come then, and sun and irrigation still rot the lowest row the rest of the year.',
      ],
      points: [
        { title: 'With the roof', body: 'Where a roof meets a wall, metal that keeps water out has to be right before new siding goes up. If both are in the project, we plan them together.' },
        { title: 'Older walls', body: 'Some older Houston houses have extra layers. What is under the siding changes the work. We look, instead of assuming one layer of boards on plywood.' },
        { title: 'Records', body: 'Photos of the damage and of the repair are yours to share. Siding you planned is a project, and that is how we describe it.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Can you replace a section instead of the whole wall?',
      a: 'Often, when the style still exists and the sun fade can be blended. If a patch will always show, we say the wall needs more. We decide on the house, not from a photo of the sunny side only.',
    },
    {
      q: 'What is a planning range for siding?',
      a: 'A matched section often falls around $800 to $3,500. A full wall or a typical house often plans around $10,000 to $30,000, more when the wall is tall or the wood behind it is rotten. Those are planning ranges, not a quote.',
    },
    {
      q: 'Fiber cement or engineered wood?',
      a: 'Both can work. Fiber cement is the usual answer for Houston sun and humidity when the style fits the house. We talk through ends, gaps, and finish before anything is ordered.',
    },
    {
      q: 'Do you document storm damage?',
      a: 'Yes. We photograph the damage and the repair. Your insurer decides coverage. We are not a public adjuster.',
    },
  ],
};

export const patiosDecks: ServiceGuide = {
  process: steps([
    ['See the yard and the door', 'We measure the door, the ground, and what is holding up anything already there. A ground-level patio and a raised deck are different structures.'],
    ['Check what is sound', 'The board tying the deck to the house, the posts, the footings, and the supports are checked before new boards go down. Rot comes out. Sound wood can stay.'],
    ['Choose the surface', 'Wood, composite, pavers, or concrete, and whether a cover is part of the project. Houston sun and rain belong in that choice.'],
    ['Permit if it is a structure', 'An attached deck or a patio cover usually needs a permit. A simple ground-level patio often does not. The city or county for the address decides.'],
    ['Build and seal', 'Footings, framing, the board where the deck meets the house, boards or paving, rails, and stairs. Water goes away from the wall, not toward it.'],
    ['Walk it', 'We check rails, stairs, the door threshold, and the way the cover sheds, and we walk it with you before we call it done.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the deck or patio is unsafe or used up.',
      paragraphs: [
        'Soft boards, a rail that moves, a stair that dips, or the board at the house pulling away are reasons to rebuild, not to stain. A patio that holds water against the slab, or a cover that dumps rain at the back door, is a drainage problem you feel every storm. Shade covers added without a thought for wind are the ones that twist.',
        'Sometimes the framing is sound and the boards are gone. Sometimes the boards hide rotten supports. We look underneath before we recommend new boards. A new board on a rotten house connection is not a repair.',
      ],
      points: [
        { title: 'At the house', body: 'The board where the deck meets the house keeps water out of the wall and keeps the deck on the house. It is the first thing we inspect.' },
        { title: 'Rails and stairs', body: 'Loose rails and uneven stairs are the parts people fall on. They are not trim. If they move, they are part of the work.' },
        { title: 'Water at the door', body: 'Water sitting on a patio, or a slope toward the slab, shows up indoors as a wet floor. The outdoor work has to fix that slope.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Wood, composite, pavers, and covers.',
      paragraphs: [
        'Wood looks like wood and it wants care in this sun and rain. Composite boards ask less of you and cost more up front. Both need framing that can carry them and gaps that drain. Pavers and concrete are the ground-level answer when you do not need to stand above the ground. A cover, wood or metal, is posts, beams, and a roof that sheds away from the wall. It is planned with the patio, not bolted on later.',
        'Rails, stairs, and gates are part of the same design. A pretty deck with a stair that is an afterthought is how people get hurt. Metal that keeps water out at the house, and a gap so the siding stays clear, are part of the build. That siding stays off the board tying the deck to the house.',
      ],
      points: [
        { title: 'Sun and upkeep', body: 'A west-facing deck in Houston cooks. We talk about finish, color, and how often you want to maintain it before the boards are ordered.' },
        { title: 'Footings', body: 'Posts sit on footings sized for the structure and the soil, not on a surface block because it was faster. Clay soil here moves. The footing plan respects that.' },
        { title: 'The door', body: 'The threshold, the siding, and the first step are one detail. Water and the walk have to work together there.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'What changes an outdoor project’s price.',
      paragraphs: [
        'As a planning range, not a quote, a ground-level paver or concrete patio often falls around $4,000 to $15,000 depending on size and how much the ground has to change. Rebuilding a deck on sound footings, with new framing where it is needed and new boards, often plans around $8,000 to $20,000. A raised deck or a patio cover often plans around $12,000 to $35,000. Height, the cover, rails, and rotten structure push a project up. A stain on sound boards is outside these ranges. We will say if that is all you need.',
        'Hauling out an old deck, access through a fenced yard, and wiring for a fan or a light on a cover are extras when they are real. We put them on the list. If a storm damaged the deck, we can photograph it. Your insurer decides coverage.',
      ],
      points: [
        { title: 'What can stay', body: 'Sound footings and posts save money. Guessing they are sound, then finding rot, is how budgets break. We open the framing first.' },
        { title: 'The cover', body: 'Posts, beams, and a roof are a structure. They cost more than boards alone, and they usually bring a permit.' },
        { title: 'The ground', body: 'Moving soil so water leaves the house is part of a patio. Skipping it to save money keeps the water at the slab.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Rain, sun, clay, and permits.',
      paragraphs: [
        'A deck or patio here has to shed a hard rain and survive a west sun. Boards gap so water does not sit. A patio slopes away from the house. A cover is tied so wind has a harder time twisting it, and we still will not call it storm-proof. Clay swells and shrinks. Footings and a patio poured tight against a moving slab need room to move without sending water inside.',
        'In the City of Houston, an attached deck and a patio cover usually need a permit. A ground-level paver patio often does not, if it is not a structure. The Memorial villages, Bellaire, Sugar Land, and the county that covers a Katy or Woodlands address have their own rules. We confirm from the address. Hurricane season, June 1 through November 30, is a bad time to leave the board at the house open. We order the work so the wall is not left open into a storm.',
      ],
      points: [
        { title: 'Siding and the deck', body: 'Metal at the board that ties the deck to the house keeps water out of the wall. If the siding is in the same project, we detail them together so the outdoor room belongs with the house.' },
        { title: 'Trees', body: 'Shade is pleasant and limbs are a load. If a limb can land on the cover, we say so before we build.' },
        { title: 'One outdoor room', body: 'Surface, rails, stairs, and cover are easier to get right as one project. We can phase them. A later cover fits a patio that left room for it.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'When are new boards enough, without new framing?',
      a: 'When the board at the house, the posts, and the supports are sound. New boards and rails can go on that frame. If the structure is rotten, it comes out. We look underneath before we recommend new boards.',
    },
    {
      q: 'What is a planning range for a patio or deck?',
      a: 'A ground-level patio often falls around $4,000 to $15,000. A deck rebuild often plans around $8,000 to $20,000. An elevated deck or a cover often plans around $12,000 to $35,000. Those are planning ranges, not a quote.',
    },
    {
      q: 'Does a patio cover need a permit?',
      a: 'Usually, yes, when it is a roof structure, and an attached deck usually does too. A simple ground-level patio often does not. Which office decides depends on the address, and we confirm it.',
    },
    {
      q: 'Wood or composite in this sun?',
      a: 'Wood is the look and the upkeep. Composite asks less care and costs more at the start. We talk through a west-facing yard before you order either one. Both still need a look now and then.',
    },
  ],
};

export const emergencyTarp: ServiceGuide = {
  process: steps([
    ['Take the call', 'Tell us what happened, where in the Houston area, and whether water is still coming in. If you cannot call (713) 909-0034, use the emergency form. We\'ll call you back as soon as we can.'],
    ['Make it safe', 'Stay off a wet or damaged roof. If lightning is close, or the wind makes the roof unsafe, we wait and tell you the next safe step. A sagging ceiling means stay out of that room.'],
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
        'Call when a limb is through the roof, when shingles are gone and you can see the wood under them, when wind lifted a valley and the ceiling is dripping, or when a skylight or the metal at a joint pulled loose in a squall. A slow stain that has been there all year is a repair to schedule. An open roof with weather still coming is the emergency. We will tell you which speed you are on.',
        'If water is already in the insulation and the ceiling, say that on the call. The tarp stops more water. The wet rooms are a drying job. Both can be this company. They are not the same hour of work, and a blue cover on the roof does not mean the soaked ceiling is finished.',
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
        'A tarp is a temporary weather cover. It buys time to dry the house and to plan a repair or a replacement. It is not a finished roof, and the wood under the shingles can still be soft. We photograph first when we can do that safely, then cover the opening, anchor the tarp against wind, and send water off it. We say when the cover should be checked, because sun and wind age a tarp faster than people expect.',
        'If lightning is close, or the wind makes the roof unsafe, we wait to go up. Daylight or a calmer wind is the right call even when the ceiling is dripping. An injured crew does not dry your house. If the leak is only at a small metal joint and the roof can wait for a proper repair, we will say the tarp can wait too. Covering a sound roof does not help you, and we will say so.',
      ],
      points: [
        { title: 'Anchored, not draped', body: 'A tarp that is laid on and weighted with a few boards becomes the next opening. We fasten it for the wind that is still in the forecast.' },
        { title: 'Bigger than the hole', body: 'The cover has to reach solid roof and send water past the damaged boards. A tiny patch over a split valley will not hold.' },
        { title: 'Then the real roof', body: 'Repair or replacement is the next conversation, with the photos in hand. The cost guide for replacement is the planning tool for that step, not for the tarp.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'What a temporary cover costs to plan.',
      paragraphs: [
        'There is no flat tarp price, because height, slope, how much roof is open, and whether it can be walked safely all change the work. As a planning range, not a quote, many single openings on a house that can be walked safely fall around a few hundred dollars to about $2,000. A steep, multi-story, or widespread opening is more, and it may not be safe to cover until the weather breaks. The permanent roof, if you need one, is a different number. Architectural asphalt replacement on many Houston houses plans around $12,000 to $24,000. That is not the tarp.',
        'Interior drying is also separate. A ceiling that is already wet is its own price, not a free extra tucked into the tarp. We will tell you on the call what we need to see, and we will price what we find. The tarp covers the opening you called about. A replacement waits until you agree to it.',
      ],
      points: [
        { title: 'Access', body: 'Two stories, a steep front, and trees against the eave change the day. A one-story ranch with a clear yard does not.' },
        { title: 'How open it is', body: 'A cracked skylight and a limb through a wide section of roof are not the same cover. We size the tarp to the damage, not to a package.' },
        { title: 'The claim is not the price', body: 'Some policies pay for a temporary cover that limits further damage. Some pay less than you hoped. Your insurer decides that part. When the roof is safe to be on, we still cover a house that is taking on water.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Storms, photos, and the interior underneath.',
      paragraphs: [
        'The calls come from Clear Lake and Galveston after coastal wind, and from Katy, Cypress, and The Woodlands after hail and straight-line wind. The work is the same order: safe access, photos, a cover that stays on, then a plan. Live oaks throw limbs. Older roofs open at valleys and where metal meets a wall. Newer roofs open when a ridge vent or the rubber collar around a vent pipe gives up. We document the one you have.',
        'Many Texas policies use a separate wind or hail deductible that is a percentage of the insured value of the house. That deductible is not the one on a plumbing leak, and it can be a large number. Whether this storm clears it is a question for your insurer. Our part is the photos and the protection. Call (713) 909-0034. The office is at 511 Crestwater Ct, Houston, TX 77082, and the form on this site reaches the same team. We\'ll call you back as soon as we can.',
      ],
      points: [
        { title: 'Photograph before cleanup', body: 'Wide shots and close shots, before belongings are thrown away and before the tarp hides the opening. We take our own set too.' },
        { title: 'Start drying', body: 'Wet insulation will not pause because an adjuster has not visited. If the interior is wet, say so. Drying is its own work, and it can start while the roof decision is still open.' },
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
      a: 'No. It is temporary protection so the next rain stays out. The repair or the replacement is planned after the house is covered and we can see the wood under the shingles.',
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
      a: 'If lightning is close, or the wind makes the roof unsafe, we wait and tell you the next safe step. Call (713) 909-0034 and we will talk through that step with you. If you use the online form instead, we\'ll call you back as soon as we can.',
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
    ['Notice the insurer', 'Call the company on the policy or the agent who can open a claim. Ask how they want notice. Write down the claim number. The deadline is in your policy, and that is the one we follow.'],
    ['We document the building', 'Our photos and notes cover what was wet, what was dried, and what was repaired. You can share them. They are not a coverage opinion.'],
    ['Dry and protect', 'Tarping a safe roof and drying wet structure do not wait on a meeting. Many policies expect you to limit further damage. That work is separate from what the policy pays back.'],
    ['Rebuild as construction', 'The repair is the work and a price. The claim payment is whatever the insurer allows. We keep those labeled separately. You and your insurer handle the claim.'],
  ]),
  sections: [
    {
      eyebrow: 'What this is',
      heading: 'Photos and a clear record. Not a coverage decision.',
      paragraphs: [
        'When we help with a claim, we mean photos and notes of the water or storm damage, tied to the work if you hire us to dry or rebuild. Filing the claim, reading the policy, and the numbers with the adjuster stay with you and your insurer. Your insurer decides what is covered. We are not a public adjuster. The free insurance photo log is yours whether or not you hire us. It is a packet, not a promise about payment.',
        'The losses we document most often start with a roof opening, a supply line, an appliance, or water that came in at ground level. Those are different facts. A homeowners policy often treats them differently, and flood from rising water is often a different policy entirely. We describe what we can see. If the water rose into the house, we write it that way. Check your policy before calling it a burst pipe.',
      ],
      points: [
        { title: 'Your photos first', body: 'If it is safe, shoot the rooms before you clean. Thrown-away belongings and a mopped floor are hard to explain later. Do not wait on us to take the only pictures.' },
        { title: 'Our photos second', body: 'We add the conditions we find, the moisture, the tear-out, and the repair. They are specific. They are not a narrative written to chase a number.' },
        { title: 'Two different jobs', body: 'The paperwork and the construction stay separate. Drying a house is the drying. Building it back is the repair. Neither one is the claim settlement.' },
      ],
    },
    {
      eyebrow: 'Records',
      heading: 'What to write down, and what we will write down.',
      paragraphs: [
        'Write the date you noticed the damage, who you called, and the claim number. Keep the failed hose or the fitting if you can do it safely. Note whether water came from a pipe, from the roof, or from the street. Ask the insurer what they want saved and whether they want to see anything before it is removed. Notice language is in the policy. It is not the same on every Texas policy, so we will not invent “you have 48 hours” or any other deadline.',
        'When we are there, the notes say where the water went, what was dried, what was removed, and what was rebuilt. Photos are taken before a tarp covers an opening when that is safe, and before new drywall closes a wall. You may give that set to the adjuster. We can walk an adjuster through what we saw of the building. The dollar figure stays between you and your insurer, and the claim stays in your name.',
      ],
      points: [
        { title: 'The photo log', body: 'The log on this site is room by room. Use it the day of the loss if you want a structure. It is free. It does not create coverage.' },
        { title: 'Cause in plain words', body: '“The supply line under the sink failed” is a fact if that is what happened. Whether the policy should pay is for your insurer to decide.' },
        { title: 'Depreciation', body: 'Some policies pay a lower amount first and hold the rest until the work is done. Some do not. That wording is in your policy. Your insurer does the math.' },
      ],
    },
    {
      eyebrow: 'Cost',
      heading: 'The construction price and the claim are different.',
      paragraphs: [
        'Photos and notes come with the inspection, the drying, or the repair you hire, not as a separate price list. The construction price is the price of that work. For scale, a contained one-room water loss often plans around $1,500 to $5,000, a room that needs drywall and flooring often around $5,000 to $15,000, and a larger loss often around $15,000 to $50,000 or more. An asphalt roof replacement on many Houston houses plans around $12,000 to $24,000. Those are planning ranges for the building, not a prediction of the check.',
        'The insurer’s figure and our estimate measure different things, and they can differ. A wind or hail deductible of one, two, or five percent of the home\'s insured value, common on Texas policies near the coast, can be larger than a plumbing deductible on the same policy. If the check is short of the work, the conversation is about the work. The estimate stays the work required to repair the house.',
      ],
      points: [
        { title: 'The claim stays yours', body: 'Hiring the drying or the repair does not assign the claim to us. You remain the person on the policy. We document the building.' },
        { title: 'Limiting more damage', body: 'A tarp and a dry-out have a cost even when you hope the policy pays them back. We price that work as work. Starting it is not a yes from the insurer.' },
        { title: 'Get the number from the visit', body: 'Call (713) 909-0034 or request an estimate. The address is 511 Crestwater Ct, Houston, TX 77082. The visit is how the work, and then the price, gets decided.' },
      ],
    },
    {
      eyebrow: 'Houston',
      heading: 'Wind, plumbing, and flood are not the same story.',
      paragraphs: [
        'A spring hail storm, a hurricane-season opening in the roof, a burst hose in August, and water that came in from a bayou or a flooded street produce different documentation because they are different events. Hurricane season is June 1 through November 30. Hail is often earlier. Plumbing failures do not read the calendar. Rising water is the one people most often confuse with a homeowners claim. If the water came from outside and rose into the house, say that. Do not let anyone, including us, soften it into a phrase that sounds easier to cover.',
        'Houses on slabs hide water under floors. Pier-and-beam houses drop it into the crawl space. The photos should show the path, not only the room that looks the worst. Older Heights and West University houses may have plaster. Newer Katy houses may have wet insulation in a big open ceiling. We document the materials that are there. The permit for the rebuild, if plumbing, electrical, structure, or a full roof is involved, follows the address: City of Houston, an independent city, or the county. The claim does not replace the permit.',
      ],
      points: [
        { title: 'Limit further damage', body: 'Many policies expect you to protect the property. Cover an open roof when it is safe. Start drying. Keep the receipts and the photos. Those are steps that limit more damage, not a guess about what is covered.' },
        { title: 'Keep the failed part', body: 'The broken piece helps the story. Bag it if you can. A repaired pipe with no photo of the break is a thinner record.' },
        { title: 'One company, labeled work', body: 'Tarping, drying, and the rebuild can stay with Elite Restorations, family-owned in Houston since 1993. The claim file and the construction file are still two files.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Do you file claims or negotiate with the insurer?',
      a: 'We photograph and note the damage and the work. Coverage, payment, and any holdback belong to your insurer. We are not a public adjuster, and the claim stays yours.',
    },
    {
      q: 'Is there a fee for the documentation?',
      a: 'Photos and notes are part of the inspection, drying, or repair you hire. There is no separate bill just for the paperwork. The photo log on the site is free to use on your own.',
    },
    {
      q: 'What should I do before anyone arrives?',
      a: 'If it is safe, stop more water, photograph the rooms, and keep the failed part. Then call your insurer and call (713) 909-0034 if you want us on the building. Do not gut a room before it is documented.',
    },
    {
      q: 'Why might the insurance check and your estimate differ?',
      a: 'They measure different things. The check is what the policy pays. The estimate is the cost of the work. Wind and hail deductibles on many Texas policies are a percentage of the home\'s insured value, and they are not the plumbing deductible. The work stays the work, even when those numbers differ.',
    },
  ],
};

export const paintingDrywall: ServiceGuide = {
  process: steps([
    ['See the wall', 'We look at the damage, the texture, and whether the wall is dry. A leak stain and a scuffed corner are different repairs. Older plaster is different from modern drywall.'],
    ['Confirm it is dry', 'If water opened the wall, we check the moisture before we close it. Paint over a damp stain seals the problem in. The wall dries first, even when the calendar is tight.'],
    ['Patch or hang', 'Small damage is patched and feathered. A large area, or drywall that came out in a dry-out, is hung, taped, and finished to the level the room needs.'],
    ['Texture', 'Houston walls are often textured. The patch is blended into that texture so the paint has one surface. A smooth patch on a bumpy orange-peel wall will show.'],
    ['Prime and paint', 'Primer, then paint, in the sheen the room needs. A spot repair is carried far enough to blend. A whole room is painted when a spot would flash.'],
    ['Clean and walk', 'We pick up the work and look at the wall in the light you live with, including the low light from a window that shows every ridge.'],
  ]),
  sections: [
    {
      eyebrow: 'Signs',
      heading: 'Signs the wall needs more than a gallon of paint.',
      paragraphs: [
        'Paint is the last step when the surface is sound. It is the wrong first step when the drywall is soft, the tape is bubbling, the texture is missing in a patch, or a stain keeps bleeding through. After a kitchen or a bath remodel, the new drywall is unfinished until it is taped, textured, primed, and painted with the room. After a water loss, the same steps wait until the cavity is dry.',
        'Hairline cracks that come back in the same place on a slab house are often the soil moving, not a painter who missed a coat. We can make the wall look right. Paint will not stop the foundation from moving. A door that suddenly will not close is a clue to mention, not a little sanding job.',
      ],
      points: [
        { title: 'The stain returns', body: 'A water stain that comes through new paint was not dry, or it was not primed for the stain. We find out which before a third coat.' },
        { title: 'Texture that does not match', body: 'A smooth float on a textured wall reads as a patch in daylight. Blending is the repair. Painting alone is not.' },
        { title: 'After the remodel', body: 'A new ceiling, the drywall around the windows, and patched outlets are what make a finished kitchen look unfinished. They are part of closing the project.' },
      ],
    },
    {
      eyebrow: 'Materials',
      heading: 'Board, texture, primer, and shine.',
      paragraphs: [
        'Drywall, tape, and joint compound are the body of the repair. The texture is what makes it disappear: orange peel, knock-down, or a smooth wall where the house is actually smooth. A lot of Heights, Bellaire, and West University interiors are textured, and some are plaster. Plaster is patched as plaster, not buried under a thick coat that cracks off. Primer is chosen for the stain and for new compound, which shows through if you paint it raw.',
        'Shine is a practical Houston choice. Flat hides more and marks more. A shinier paint in a bath or a kitchen cleans and shows every ridge. Color is matched to the wall you have when the job is a blend, and carried to a corner or a whole room when a spot would show. A one-pint touch-up rarely disappears on a wall that has faded for a decade in a south window.',
      ],
      points: [
        { title: 'Blend past the damage', body: 'A hard edge of compound shows through paint. The repair is blended wide enough that the eye cannot find the border.' },
        { title: 'Bath and kitchen paint', body: 'Wet rooms want a paint that can be wiped. A flat ceiling paint on a bath wall is the wrong product. We match the paint to the room.' },
        { title: 'Ceilings', body: 'A ceiling stain from a roof or a bath above is primed for the stain and often painted past the spot, because ceiling paint shows a patch under window light.' },
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
        { title: 'Dry the stain first', body: 'If the ceiling stain is from a roof leak or a bath above, the source and the dryness come first. Paint is the last coat.' },
        { title: 'Color that has faded', body: 'South rooms fade. A careful match to a chip from the can may still flash. Painting to a break in the wall is the usual fix.' },
        { title: 'With the other trades', body: 'After cabinets, tile, and floors, paint is what makes the remodel look finished. We schedule it when the dust of those trades is actually done.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Will I see the patch after it is painted?',
      a: 'A good repair is blended wide, textured to the wall, primed, and painted far enough to blend. A hard-edged patch on a textured Houston wall will show. We blend until the edge disappears.',
    },
    {
      q: 'What is a planning range for paint and drywall?',
      a: 'A small blended patch often falls around a few hundred dollars to about $1,500. A room often plans around $800 to $3,000. Drywall replacement in several rooms after a leak often plans around $2,500 to $10,000 before paint. Those are planning ranges, not a quote.',
    },
    {
      q: 'Can you match texture in an older house?',
      a: 'Yes. Many Heights, Bellaire, and West University walls are textured or plaster. We blend the patch into that surface. One smooth spot on a bumpy wall is not a match.',
    },
    {
      q: 'Can you paint right after a water-damage repair?',
      a: 'After the readings say the wall is dry, and after the source is handled. Paint on a damp wall traps moisture. We wait until the meter says dry, not until the calendar does.',
    },
  ],
};
