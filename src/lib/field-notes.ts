import type { Article } from '@/lib/articles';
import { titleFits } from '@/lib/seo';
import { getService } from '@/lib/services';

const phone = '(713) 909-0034';

export const fieldNotes: Article[] = [
  {
    slug: 'what-to-do-after-a-roof-leak-in-houston',
    title: 'What to Do After a Roof Leak in Houston',
    metaTitle: 'After a Roof Leak in Houston',
    crumb: 'After a roof leak',
    lines: ['A roof leak.', 'Do this first.'],
    description:
      'What to do after a roof leak in a Houston home: stay off the roof, limit the water, photograph the opening, and plan the repair.',
    lede: 'A stain on the ceiling is often the first sign. In Houston the next rain can be the same day, so the useful moves are the ones that keep more water out and leave a clear record of what already came in.',
    service: 'roofing',
    emergency: true,
    ctaTitle: 'Water coming through the ceiling?',
    ctaBody: `Call ${phone}. Tell us whether it is still dripping and whether you can see daylight or missing shingles from the ground. If you cannot call, the emergency form reaches the same team.`,
    related: [
      'hail-damage-vs-normal-wear-houston-roof',
      'what-to-do-after-water-damage-houston',
      'storm-and-hail-roof-repair-houston',
    ],
    faqs: [
      {
        q: 'Should I climb up and look for the hole?',
        a: 'No. A wet slope, a soft deck, and a roof you do not walk in ordinary weather are how people get hurt after a leak. Look from the ground and from inside the house. We will get on the roof when it is safe.',
      },
      {
        q: 'Can I wait until the weather clears?',
        a: 'You can wait to do a permanent repair. You should not wait to catch the drip and to cover an opening you already know about, if that can be done safely from inside or by a crew. Houston rain does not pause for a convenient afternoon.',
      },
      {
        q: 'Does a ceiling stain mean the roof has to be replaced?',
        a: 'No. A stain means water found a path. It might be one flashing detail, a lifted shingle, or a larger failure. The roof has to be seen before anyone can say which job it is.',
      },
      {
        q: 'Who decides whether insurance pays for the leak?',
        a: 'Your insurer. We photograph the opening and the rooms that got wet, and we can tarp and repair. We are a contractor, not a public adjuster, and we do not tell you what the policy owes.',
      },
    ],
    sections: [
      {
        heading: 'Stay off the roof',
        blocks: [
          {
            type: 'p',
            text: 'The first decision is where you stand. Do not climb a wet roof to find the source, and do not walk a ceiling that is sagging. A leak that looks like a drip from the couch can be a pool sitting in the insulation above you. If the drywall is bowed, get out from under that spot.',
          },
          {
            type: 'p',
            text: 'From the ground, look for missing shingles, a limb on the roof, a lifted ridge, or daylight at a penetration if you can see it from the yard without going up. From inside, note which room, which wall, and whether the water is still moving. That is enough to start. The close look belongs to someone who is set up to be on that slope.',
          },
        ],
      },
      {
        heading: 'Catch what is still coming in',
        blocks: [
          {
            type: 'p',
            text: 'If water is dripping, put a bucket under it and move what you can save out of that path. A plastic sheet over a piece of furniture is fine. Punching a hole in the ceiling to “let it drain” is not. You can turn a contained drip into a collapse, and you throw away the chance to photograph the ceiling as it is.',
          },
          {
            type: 'p',
            text: 'If the leak is from a plumbing vent, a bath fan, or an attic line rather than the roof, shut the water off only when you are sure the source is a supply and you can reach the valve without standing in water near a receptacle or the panel. A roof leak does not have a valve. The weather does. Keep people out of the wet room if outlets, lamps, or the ceiling fan may be wet.',
          },
          {
            type: 'list',
            items: [
              'Bucket under the drip, and a towel at the baseboard if water is running down the wall.',
              'Furniture and rugs moved off the wet floor, after a photo if you can take one first.',
              'No one on the roof, and no one under a ceiling that is bulging.',
              'The main electrical panel left alone if the floor in front of it is wet.',
            ],
          },
        ],
      },
      {
        heading: 'Where Houston roofs usually let water in',
        blocks: [
          {
            type: 'p',
            text: 'The calls are ordinary until the ceiling shows them. Pipe boots around plumbing vents crack in the sun. Valleys hold debris and then hold water. Step flashing at a wall or a chimney pulls loose. A previous patch lifts. Wind gets under a shingle edge on the side the storm came from. Flat roofs and low-slope additions fail at the seams and at the edge where they meet a steeper roof.',
          },
          {
            type: 'p',
            text: 'A one-story house on a slab often shows the leak in the room directly under the opening. A two-story house in Memorial, Bellaire, or West University can send the water along a rafter and stain a ceiling that is not under the damaged shingle. The stain is a clue, not a map. Attic decking, if you can look from the attic floor without stepping off the joists, sometimes shows the wet sheathing more honestly than the ceiling paint does.',
          },
          {
            type: 'p',
            text: 'Humidity is why this should not sit. Houston air does not dry a wet attic the way a dry climate would. Insulation that got wet stays heavy. The ceiling paint can look better by evening while the deck above it is still damp. Leaving it “to see if it comes back next rain” is how a small opening becomes wet drywall, wet insulation, and a second leak path.',
          },
        ],
      },
      {
        heading: 'Photograph it before anything is covered',
        blocks: [
          {
            type: 'p',
            text: 'Take the pictures before a tarp, a towel pile, or a coat of primer hides the evidence. From inside: a wide shot of the room, a closer shot of the stain or the drip, and the path the water took, including the floor and any belongings. From the yard: the slope you can see, missing pieces, and a limb if one is on the roof. If an attic is safe to enter from a ladder on the floor, a photo of wet decking helps. Do not walk the attic if the deck is soft.',
          },
          {
            type: 'p',
            text: 'Write the date, the room, and whether water was still coming in when you took the photo. Your insurer decides what a policy pays. The photos are the part you can take care of the same day. If you want a room-by-room packet instead of a camera roll, the insurance photo log on this site is free to use.',
          },
          {
            type: 'links',
            items: [
              { href: '/insurance-log', label: 'Open the insurance photo log' },
              { href: '/how-to-build-an-insurance-photo-log', label: 'How to build the photo log' },
              { href: '/insurance-claims', label: 'Insurance claims help' },
            ],
          },
        ],
      },
      {
        heading: 'A tarp is temporary',
        blocks: [
          {
            type: 'p',
            text: 'If the roof is open to the weather, a secured tarp is there to buy a dry night. It is not a finished roof. It has to be anchored so the next wind does not turn the cover into a sail, and it has to be checked after the next storm. We photograph the opening before the cover goes on, when it is safe to be up there, so the record still shows what the weather did.',
          },
          {
            type: 'p',
            text: 'Do not nail a hardware-store tarp on yourself if you would be standing on a wet slope to do it. Call. Emergency tarping is the temporary step. The permanent work is a repair or a replacement after someone has seen the deck, the flashing, and how far the water traveled.',
          },
          {
            type: 'links',
            items: [
              { href: '/emergency', label: 'Request emergency help' },
              { href: '/roofing-emergency-tarp-repair', label: 'Emergency roof tarping' },
            ],
          },
        ],
      },
      {
        heading: 'Repair, replacement, and the rooms below',
        blocks: [
          {
            type: 'p',
            text: 'A repair makes sense when the rest of the roof can still do its job and the failure is local: a boot, a flashing run, a few shingles, a seam. A replacement is the conversation when the field of shingles is worn out, the deck is soft in more than one place, or the same slopes keep letting water in. We say which one after the inspection, not from the curb.',
          },
          {
            type: 'p',
            text: 'The ceiling, the insulation, and the floor are a separate scope from the roofing. Wet drywall and insulation that stayed wet have to be dried or removed. Paint over a damp stain comes back. If the water reached cabinets, hardwood, or a slab-level floor, that is water-damage work, and it should be measured before anyone rebuilds the finish. Drying comes before new drywall.',
          },
          {
            type: 'p',
            text: 'The price of a replacement is the roof you have: size, pitch, what the deck looks like after the old roofing comes off, and the material. An insurance claim does not set that price. Your insurer decides what the policy pays. We install the roof you hire us to build. What changes a Houston roof price is written out on the cost guide, as planning ranges, not as a quote.',
          },
          {
            type: 'links',
            items: [
              { href: '/roofing', label: 'Roofing' },
              { href: '/roof-replacement', label: 'Roof replacement' },
              {
                href: '/roof-replacement-cost-houston',
                label: 'What changes a roof replacement cost',
              },
              { href: '/water-damage-restoration', label: 'Water damage restoration' },
              { href: '/contact', label: 'Contact form' },
            ],
          },
        ],
      },
      {
        heading: 'When you want a crew',
        blocks: [
          {
            type: 'p',
            text: `Call ${phone}, or use the contact form. Say whether water is still coming in. Elite Restorations is family-owned, at 511 Crestwater Ct, Houston, TX 77082, and has been restoring and remodeling Houston houses since 1993. We tarp when the roof is open, repair or replace the roofing, and dry what the leak wet downstairs. Coverage is a decision for your insurer.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'slab-moisture-after-a-supply-line-break-houston',
    title: 'Slab Moisture After a Supply-Line Break',
    metaTitle: 'Slab Moisture After a Pipe Break',
    crumb: 'Slab moisture',
    lines: ['Water under', 'a slab floor.'],
    description:
      'What to do when a supply line breaks in a Houston slab home: stop the water, find how far it traveled, and dry before you rebuild.',
    lede: 'A supply line that lets go on a slab does not stay in a puddle. The water runs under the flooring, wicks up the wall, and sits in a house where the outside air is already humid.',
    service: 'water-damage-restoration',
    emergency: true,
    ctaTitle: 'A supply line let go?',
    ctaBody: `Call ${phone} if water is on the floor or you cannot find the shutoff. Say whether it is still coming in. The emergency form reaches the same team if you cannot call.`,
    related: [
      'what-to-do-after-water-damage-houston',
      'frozen-and-burst-pipes-in-houston',
      'how-to-build-an-insurance-photo-log',
    ],
    faqs: [
      {
        q: 'The floor looks dry. Can I wait?',
        a: 'A hard surface can look dry while the material under it, and the paper on the drywall just above the floor, is still wet. If a supply line released water across the slab, it should be measured before you decide nothing traveled.',
      },
      {
        q: 'Should I open the windows and run a box fan?',
        a: 'Outside air in Houston is often too wet to help. A household fan moves air in the room. It does not pull moisture out of a slab, a wall cavity, or the pad under a floor. Keep the house closed and use dehumidification if the water got into the building.',
      },
      {
        q: 'Do I throw the wet flooring away before the adjuster comes?',
        a: 'Photograph it in place first, wide and close. If it is a hazard and you have to move it, keep those photos and a note of what left the room. Ask your insurer what they want saved.',
      },
      {
        q: 'Does a supply-line break mean the slab has to be replaced?',
        a: 'A broken supply line is a plumbing failure and a wetting of the finishes. It is not, by itself, a statement about the concrete. What has to come out depends on which materials got wet and whether they can be dried.',
      },
    ],
    sections: [
      {
        heading: 'Stop the water before you study the floor',
        blocks: [
          {
            type: 'p',
            text: 'If a supply line, a hose, or a valve is releasing water, the main shutoff is the move that matters. It is usually at the meter or where the line enters the house. Turn it clockwise. A valve under one sink helps only when you are sure the break is on that one fixture. If you cannot reach the shutoff without stepping through standing water near outlets or the breaker panel, do not. Call.',
          },
          {
            type: 'p',
            text: 'After the main is off, open a faucet so the lines can drain, starting low in the house. If the water heater may have emptied, turn it off so it is not heating a dry tank. Do not guess at a gas valve. Stay out of the water if you cannot see the floor and you do not know whether power is involved.',
          },
        ],
      },
      {
        heading: 'Why a slab hides the travel',
        blocks: [
          {
            type: 'p',
            text: 'A lot of Houston houses sit on a concrete slab. There is no basement to look into and no crawlspace that shows you a wet joist. Water from a washing-machine hose, an ice-maker line, a toilet supply, a water heater, or a pinhole in a line inside a wall leaves the room at floor level. It runs under vinyl, under laminate, under tile, and under wood. The surface you walk on can look almost ordinary while the edges cup, the seams swell, or the baseboard darkens a day later.',
          },
          {
            type: 'p',
            text: 'The wall is the other record. Gypsum wicks. The paint a few inches up from the floor blisters or stains. Cabinets on particle board swell at the toe kick first. Trim swells at the miter. Those are signs the water did not stay in the puddle you mopped. They are also easy to paint over and then discover again.',
          },
          {
            type: 'p',
            text: 'On a one-story plan in Katy, Spring Branch, or Alief, that path is flat and it can cross a hallway before anyone notices the far room. In a two-story house the same supply break is usually on the floor where the line failed, not a mystery from above, unless the line was in a wall that also wet the ceiling below. Read the stain. Do not assume the room with the loudest drip is the only room.',
          },
        ],
      },
      {
        heading: 'What to move, and what to leave long enough to photograph',
        blocks: [
          {
            type: 'p',
            text: 'Move people and pets out of standing water. Move small belongings that will be ruined if they stay, after a photo if you can take one without delaying the shutoff. Leave flooring, baseboard, and wet drywall in place until they are photographed, unless they are a safety problem. A camera roll of the wet room, the failed line if you can see it, and the path across the floor is the start of the record.',
          },
          {
            type: 'list',
            items: [
              'Wide shot of each wet room, including rooms that only look slightly affected.',
              'Close shot of the supply, the hose, or the valve that failed, if it is visible.',
              'The bottom of the walls and the inside of the sink cabinet or the water-heater closet.',
              'A note of the time you shut the water off, and whether any water was still arriving after that.',
            ],
          },
          {
            type: 'p',
            text: 'Your insurer decides coverage. We do not. Many policies expect you to limit further damage and to keep a record. Yours may say that differently. Ask the insurer what they want saved before you throw wet materials away. If you need a room-by-room packet, the photo log on this site walks that order.',
          },
        ],
      },
      {
        heading: 'Drying is not a fan in the hall',
        blocks: [
          {
            type: 'p',
            text: 'Towels and a household fan can handle a cup of water on intact hard flooring that you caught as it happened and that never reached the wall or the layers under the floor. They are not a drying plan once water has gone under a floor, into a cabinet box, or up the face of the drywall. Leave the windows closed. Outside air here is often wetter than the air in a shut room.',
          },
          {
            type: 'p',
            text: 'Mitigation is extraction of what is still standing, air movement, and dehumidification, with meters on the materials that actually got wet. A slab does not show you a joist bay. The readings are on the floor covering, the subfloor where there is one, and the wall. We do not put a clock on mold. What we do say is that wet paper, wet pad, and wet particle board do not improve while the house stays closed up and humid. A musty smell in a room that “looks dry” is a reason to find the material, not a reason to mask it.',
          },
          {
            type: 'p',
            text: 'Bleach on a baseboard does not dry the wall cavity. Primer on a stain hides the clue. New flooring on a wet slab repeats the loss. The rebuild of drywall, trim, cabinets, and floor starts when the structure is dry, not when the surface looks acceptable in the afternoon light.',
          },
        ],
      },
      {
        heading: 'The finishes that usually have to be opened',
        blocks: [
          {
            type: 'p',
            text: 'Cabinets at the toe kick, drywall at the bottom of the wall, and the floor covering are the three places a slab release shows up. Hardwood cups. Laminate swells at the joints until the edges stand proud. Vinyl can hide water and then loosen. Tile can look fine while the setting bed or the wall behind the base is wet. Insulation, if the water reached a wall that has it, holds water after the face of the drywall feels dry to your hand.',
          },
          {
            type: 'p',
            text: 'How much comes out is a measurement, not a guess from the size of the original puddle. A line that ran for a short time across sealed concrete and was stopped immediately is a different job from a line that ran overnight under a floating floor and up the walls of two rooms. We would rather open a small area and confirm it is dry than close a wet wall and repaint it.',
          },
        ],
      },
      {
        heading: 'The claim and the rebuild are separate',
        blocks: [
          {
            type: 'p',
            text: 'Call the company that wrote the policy when you reasonably can. Ask how they want notice, and whether an adjuster should see the damage before permanent repairs. Write down the claim number. Notice timing is in your policy. It is not the same on every Texas form, so we do not quote a number of days.',
          },
          {
            type: 'p',
            text: 'A public adjuster is a separate license, someone a homeowner can hire to represent them with the insurance company. Elite Restorations is not a public adjuster. We photograph, dry, and rebuild finishes. We do not negotiate the claim, and we do not tell you what the policy owes. If the loss also opened a roof or you are not sure the water was only the supply line, say so. A roof leak and a supply break are different paths, and both can wet the same slab.',
          },
          {
            type: 'links',
            items: [
              { href: '/water-damage-restoration', label: 'Water damage restoration' },
              { href: '/insurance-claims', label: 'Insurance claims help' },
              { href: '/emergency', label: 'Emergency help' },
              { href: '/insurance-log', label: 'Insurance photo log' },
              {
                href: '/how-to-build-an-insurance-photo-log',
                label: 'How to build the photo log',
              },
              { href: '/painting-drywall-repair', label: 'Painting and drywall repair' },
              { href: '/contact', label: 'Contact form' },
            ],
          },
        ],
      },
      {
        heading: 'Call while the floor can still be saved',
        blocks: [
          {
            type: 'p',
            text: `Call ${phone} if the water is still out or you are not sure how far it went. Elite Restorations is family-owned, at 511 Crestwater Ct, Houston, TX 77082, and has worked on Houston houses since 1993. We find the wet materials, dry what can be dried, and rebuild the drywall, trim, and floors when the readings support it.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'hail-damage-vs-normal-wear-houston-roof',
    title: 'Hail Damage vs Normal Wear on a Houston Roof',
    metaTitle: 'Hail Damage vs Wear in Houston',
    crumb: 'Hail or wear',
    lines: ['Hail marks,', 'or just age.'],
    description:
      'How hail damage and ordinary wear differ on a Houston roof, what you can see from the ground, and when a repair or a replacement is the real question.',
    lede: 'A hard storm and a roof that is simply old can both leave a ceiling stain on the next rain. They are not the same condition, and you should not have to climb up to start telling them apart.',
    service: 'roofing',
    ctaTitle: 'Not sure what the storm did?',
    ctaBody: `Call ${phone}, or use the contact form. If water is coming inside, say so at the start. We look at the roof. We do not decide what an insurance policy pays.`,
    related: [
      'what-to-do-after-a-roof-leak-in-houston',
      'storm-and-hail-roof-repair-houston',
      'how-to-build-an-insurance-photo-log',
    ],
    faqs: [
      {
        q: 'Can I see hail from the yard?',
        a: 'Sometimes. Dented gutters, dented flue caps, and bruised screens on an air conditioner are visible without a ladder. The shingles themselves usually are not, not well enough to judge. Stay on the ground.',
      },
      {
        q: 'Does hail always mean the whole roof comes off?',
        a: 'No. Hail can mark metal and still leave a roof that can be repaired, and a worn roof can need to come off even when the last storm did little. The slope has to be inspected.',
      },
      {
        q: 'Is granule loss in the gutters hail?',
        a: 'Granules in a gutter are a clue that the surface is losing its coating. Sun, age, and hail can all do that. Granules alone do not name the cause. The pattern on the shingles and on the soft metal nearby is what gets compared.',
      },
      {
        q: 'Will you tell the insurance company the roof is totaled?',
        a: 'No. We photograph what we find and we say whether we recommend a repair or a replacement for the roof in front of us. Your insurer decides coverage. We are not a public adjuster.',
      },
    ],
    sections: [
      {
        heading: 'What a storm leaves that age does not',
        blocks: [
          {
            type: 'p',
            text: 'Hail hits what it hits, across a slope, in one weather event. The marks tend to show up together: on the shingles, and on the softer metal that faces the sky. Gutters, downspouts, vent caps, flue pipes, and the fins or the top of an outdoor condenser pick up dents that were not there before that storm. A roof that has only been aging usually does not dent a new gutter in a single afternoon.',
          },
          {
            type: 'p',
            text: 'On asphalt shingles, people describe hail as bruises: dark spots where the granules were knocked off, sometimes with the mat showing, often in a scatter across the field rather than only along the edge that faces the afternoon sun. The bruise can be easier to feel than to see from the street. That is one reason the inspection is done on the roof, not from a photograph taken at the curb at noon.',
          },
          {
            type: 'p',
            text: 'Wind is the partner that actually opens the house. Hail can bruise a roof that does not leak until wind lifts a tab, breaks a seal, or drives rain at a detail that was only bruised. A ceiling stain after a hail storm may be the wind and the rain, with the hail as the reason you are looking. Both belong in the photos.',
          },
        ],
      },
      {
        heading: 'What ordinary wear looks like here',
        blocks: [
          {
            type: 'p',
            text: 'Houston sun and heat age a roof whether or not a storm shows up. Granules thin on the slopes that take the most sun, often the south and the west. Tabs curl or crack along courses that have been opening for seasons. Sealant strips let go. Pipe boots dry out and split. Caulk at flashing shrinks. Moss or debris sits in a valley that does not get rinsed. None of that requires a hailstone.',
          },
          {
            type: 'p',
            text: 'Wear is usually more even, and it follows exposure and time. The shaded north slope can look younger than the south slope of the same house. A patched area can look newer than the field around it. Blisters, curled corners, and a general thinning of granules without a matching pattern of dents in the metal are reasons to talk about age, not about one storm.',
          },
          {
            type: 'p',
            text: 'An old roof can still be hit by hail. The two conditions stack. A worn slope with fresh bruises is a different conversation from a worn slope with no new marks, and from a young roof with a scatter of bruises and a split boot. The inspection is there to separate those, not to force every roof into one category.',
          },
          {
            type: 'p',
            text: 'Neighborhood does not change the difference. A Memorial roof, a Katy roof, and a roof in The Woodlands age under the same sun and get hit by the same kind of storm. What changes is the house: pitch, the number of valleys, and whether you can see the metal from the yard. The comparison is still marks from one event against wear that has been underway for years.',
          },
        ],
      },
      {
        heading: 'Stay on the ground',
        blocks: [
          {
            type: 'p',
            text: 'Wet shingles, a steep pitch, and a ladder on a soft flower bed are how people get hurt trying to confirm what a storm did. You do not need to be up there to start. From the yard and from a window, note dents in gutters and caps, missing pieces, a limb, and any ceiling stain inside. Tell us what you can see. We look at the roof when it is safe to be on it.',
          },
          {
            type: 'p',
            text: 'If water is already inside, treat that as the emergency and the hail question as the reason. Catch the drip, keep people out from under a sagging ceiling, and do not cover the opening until it has been photographed. A tarp is temporary protection. It is not the diagnosis.',
          },
          {
            type: 'links',
            items: [
              { href: '/emergency', label: 'Water coming in: emergency help' },
              {
                href: '/what-to-do-after-a-roof-leak-in-houston',
                label: 'What to do after a roof leak',
              },
            ],
          },
        ],
      },
      {
        heading: 'Photographs that separate the two',
        blocks: [
          {
            type: 'p',
            text: 'A useful set shows the slope, the soft metal, and the rooms if any water got in. Wide shots of each direction of the roof, close shots of bruises or of curled tabs, and the gutters and vents in the same visit. A photo of granules in the gutter without a photo of the shingles does not explain itself. Inside, photograph stains before anyone paints them.',
          },
          {
            type: 'p',
            text: 'Date the pictures. If you know which storm you are asking about, write that down. Your insurer decides whether that storm is a covered cause and what they will pay. We do not. We can put the inspection photos with the repair scope so the conversation has something specific in it. The photo log on this site is a way to keep the interior rooms in the same packet as the roof notes.',
          },
          {
            type: 'links',
            items: [
              { href: '/how-to-build-an-insurance-photo-log', label: 'How to build an insurance photo log' },
              { href: '/insurance-claims', label: 'Insurance claims help' },
              { href: '/insurance-log', label: 'Open the photo log' },
            ],
          },
        ],
      },
      {
        heading: 'Repair or replacement is a roof question',
        blocks: [
          {
            type: 'p',
            text: 'Hail marks do not, by themselves, pick the scope. A handful of damaged shingles on an otherwise sound roof can be a repair. A field of bruises, a deck that is soft, or wear that has already used up the shingles can be a replacement. Wind-lifted courses and failed flashing are part of that same look. We say which job we recommend after we are on the roof.',
          },
          {
            type: 'p',
            text: 'Architectural asphalt is common on Houston houses. Metal, tile, and composite are different installs and different ways of showing a dent or a crack. The structure has to carry the material you want if the roof is coming off. The cost guide explains what changes a replacement price: size, pitch, the deck, and the material. Those are planning ranges. The number for your house comes from the inspection, not from a citywide price.',
          },
          {
            type: 'p',
            text: 'An insurance payment, if there is one, is not the bid. A claim can pay for less than the work the roof needs, or for work you decide not to do yet. We photograph and we build the roof you hire. We do not negotiate the claim.',
          },
          {
            type: 'links',
            items: [
              { href: '/roofing', label: 'Roofing' },
              { href: '/roof-replacement', label: 'Roof replacement' },
              {
                href: '/roof-replacement-cost-houston',
                label: 'Roof replacement cost in Houston',
              },
              { href: '/roofing-emergency-tarp-repair', label: 'Emergency tarping' },
              { href: '/contact', label: 'Contact form' },
            ],
          },
        ],
      },
      {
        heading: 'After the next rain is a bad time to be guessing',
        blocks: [
          {
            type: 'p',
            text: `If the ceiling is already wet, call ${phone} and say so. If the roof only looks suspicious from the yard, call and we will look while the weather allows it. Elite Restorations is family-owned, at 511 Crestwater Ct, Houston, TX 77082, and has served Houston since 1993. We repair roofs, replace them, and dry the rooms a storm already wet.`,
          },
        ],
      },
    ],
  },
  {
    slug: 'how-to-build-an-insurance-photo-log',
    title: 'How to Build an Insurance Photo Log',
    metaTitle: 'Build an Insurance Photo Log',
    crumb: 'Insurance photo log',
    lines: ['A photo log', 'an adjuster can use.'],
    description:
      'How to build a room-by-room photo log after storm or water damage in Houston: what to shoot, what to write down, and how to keep it in one packet.',
    lede: 'A claim goes better when the photos are a record of the house, not a pile of close-ups with no room name. You can build that log the day of the loss, before anything is thrown away.',
    service: 'insurance-claims',
    ctaTitle: 'Want the damage written down with you?',
    ctaBody: `Call ${phone} if water is still coming in or the roof is open. We photograph the conditions as part of the work. The log on this site is yours either way. Your insurer decides coverage.`,
    related: [
      'water-damage-insurance-claims-in-texas',
      'what-to-do-after-a-roof-leak-in-houston',
      'slab-moisture-after-a-supply-line-break-houston',
    ],
    faqs: [
      {
        q: 'Do I need a special camera?',
        a: 'No. A phone is enough if the photos are sharp, labeled by room, and taken before cleanup. Wide shots and close shots of the same spot are more useful than a dozen nearly identical close-ups.',
      },
      {
        q: 'What if I already moved the wet carpet?',
        a: 'Photograph what is left, and write down what you moved and why. If you still have the carpet, a photo of it next to the room helps. Ask your insurer what they want kept.',
      },
      {
        q: 'Does the log decide what gets paid?',
        a: 'No. The log is your record. Your insurer decides what the policy covers. Elite Restorations is a contractor, not a public adjuster. We do not negotiate the claim.',
      },
      {
        q: 'Where is the free log on this site?',
        a: 'The insurance photo log is a page you can fill out on your phone: a first-night checklist, then rooms with a wide shot, a close shot, and the wet materials, plus the loss details, and a PDF you can download.',
      },
    ],
    sections: [
      {
        heading: 'Make the house safe, then open the camera',
        blocks: [
          {
            type: 'p',
            text: 'The log is not the first ten minutes. If a pipe is spraying, shut the water off when you can do it without stepping through water near power. If the roof is open, stay off it. If a ceiling is sagging, do not stand under it to frame a better picture. Once people are out of the way and the water is stopped or caught, the photos are the next job, before towels, trash bags, and a well-meaning relative “just clean it up.”',
          },
          {
            type: 'p',
            text: 'The first-night list is short. For an active leak: shut the main off if it is safe, stay out of standing water near outlets or the panel, and photograph each wet room before you move or throw anything out. For an open roof: stay off the roof, move belongings out from under the opening, catch the drip from inside if you can reach it, and leave wet insulation and ceiling material in place until it is photographed. That list is also on the photo log page, so you are not trying to remember it from this article at midnight.',
          },
        ],
      },
      {
        heading: 'One room at a time',
        blocks: [
          {
            type: 'p',
            text: 'Name the room before you fill it with pictures. “Hall bath,” “kitchen,” “northeast bedroom,” “garage.” A filename or a note that says IMG_4388 does not help an adjuster, or you, two weeks later. Walk the room in one pass: stand in the doorway for the wide shot, then move in for the damage, then show the materials that are actually wet.',
          },
          {
            type: 'p',
            text: 'Include rooms that only look slightly affected. Water on a slab travels. A roof leak can stain a ceiling that is not under the missing shingles. If you skip the “almost fine” room, the record implies the loss stopped at the doorway. If a room is truly dry, you do not need to force it into the log. If you are unsure, one wide shot and a note are enough.',
          },
          {
            type: 'list',
            items: [
              'Wide shot: the whole room from the door, so the damage has a place.',
              'Close shot: the stain, the open roof from inside, the split supply, the swollen seam.',
              'Wet materials: carpet, pad, drywall, insulation, cabinets, flooring, belongings that are wet, not just the dramatic corner.',
            ],
          },
        ],
      },
      {
        heading: 'What to write next to the pictures',
        blocks: [
          {
            type: 'p',
            text: 'Photos without words still leave arguments. Next to each room, write what got wet and what you had to move. On the cover of the packet, the details that keep showing up in a claim file are simple: your name, the property address, the insurer, the claim number once you have it, and the date of the loss. If you do not have a claim number yet, leave it blank and add it when the insurer gives you one.',
          },
          {
            type: 'p',
            text: 'For water, write when it started if you know, when it stopped, and whether it was still coming in when you made the log. Write what you moved and why. A short line is better than a paragraph you will not finish. “Moved the rug at 9 p.m. because it was in standing water. Photo taken first.” That is a record. “We cleaned up” is not.',
          },
          {
            type: 'p',
            text: 'The materials worth naming are the ones that change the scope: drywall, ceiling, insulation, flooring, cabinets, trim, furniture, belongings, roofing. You do not need a price next to each one. You need to show they were wet, or broken, or missing. Prices and coverage are the insurer’s worksheet, not yours to invent on the night of the loss.',
          },
        ],
      },
      {
        heading: 'Roof, wind, and the water are one log',
        blocks: [
          {
            type: 'p',
            text: 'A storm loss is often two scenes. Outside: the slope you can see from the yard, missing shingles, a limb, dented gutters or caps if hail was part of the weather, and the opening if you can photograph it without climbing. Inside: the ceiling, the insulation if it fell, the floor the water reached. Put both in the same packet. A roof photo with no interior, or a bucket photo with no roof, each tell half of what happened.',
          },
          {
            type: 'p',
            text: 'Do not get on the roof to improve the picture. If the only safe photos are from the ground and from the attic floor, take those and say so in the note. A crew can add the on-roof photos later. Your pictures still matter because they show the house before a tarp, before debris was moved, and before the ceiling was painted.',
          },
          {
            type: 'p',
            text: 'If you cover an opening, photograph it first. If you have to throw out something because it is a hazard, photograph it and write why it could not stay. Hold permanent repairs that would hide the damage until an adjuster has seen it, unless leaving it open would make the loss worse or the insurer told you to proceed.',
          },
        ],
      },
      {
        heading: 'Turn the phone pictures into one packet',
        blocks: [
          {
            type: 'p',
            text: 'A camera roll is a start. A packet is the same photos with room names, notes, and the loss details in one file you can hand someone. The insurance photo log on this site is built for that. You pick an active leak or an open roof for the first-night checklist. Then each room has three slots: a wide shot, a close-up of the damage, and the wet materials. You can add rooms. The cover holds your name, the address, the insurer, the claim number, and the date. The loss notes hold when the water started and stopped, whether it is still coming in, what you moved, and which materials were affected. You can download a PDF.',
          },
          {
            type: 'p',
            text: 'The log is free. It does not file the claim and it does not estimate what you are owed. It is a way to stop the record from living in twenty text messages. If you later ask us to dry or repair the house, the same kind of photos are part of how we document the work. You can use the log whether or not you hire anyone.',
          },
          {
            type: 'links',
            items: [
              { href: '/insurance-log', label: 'Open the insurance photo log' },
              { href: '/insurance-claims', label: 'Insurance claims help' },
              {
                href: '/water-damage-insurance-claims-in-texas',
                label: 'Water-damage claim checklist',
              },
            ],
          },
        ],
      },
      {
        heading: 'What the log is not',
        blocks: [
          {
            type: 'p',
            text: 'It is not a guarantee of payment. It is not a substitute for reading your policy or for asking the insurer how they want notice given. It is not a reason to delay stopping more water. And it is not legal advice. A public adjuster, if you hire one, is a licensed representative who can negotiate with the insurance company. That is a different role. We are the contractor. We can photograph, tarp, dry, and rebuild. We do not negotiate the claim.',
          },
          {
            type: 'p',
            text: 'Keep receipts for tarps, dry-out, and reasonable emergency costs, and photograph the temporary work. Many policies talk about limiting further damage. The wording is in your form. Ask if you are unsure. Do not throw the only evidence away because the room feels chaotic. The log is how the chaos gets a sequence.',
          },
        ],
      },
      {
        heading: 'If you want a crew in the rooms with you',
        blocks: [
          {
            type: 'p',
            text: `Call ${phone} when water is still coming in, the roof is open, or you want the drying and the repairs done by the same company that is looking at the photos. The emergency form is there if you cannot call. Elite Restorations is family-owned, at 511 Crestwater Ct, Houston, TX 77082, and has been here since 1993. Bring the log. We will still look at the house ourselves.`,
          },
          {
            type: 'links',
            items: [
              { href: '/emergency', label: 'Emergency help' },
              { href: '/water-damage-restoration', label: 'Water damage restoration' },
              { href: '/roofing', label: 'Roofing' },
              { href: '/roof-replacement', label: 'Roof replacement' },
              {
                href: '/what-to-do-after-a-roof-leak-in-houston',
                label: 'After a roof leak',
              },
              {
                href: '/slab-moisture-after-a-supply-line-break-houston',
                label: 'Slab moisture after a supply-line break',
              },
              { href: '/contact', label: 'Contact form' },
            ],
          },
        ],
      },
    ],
  },
];

function noteWords(article: Article) {
  const parts = [article.lede];
  for (const section of article.sections) {
    for (const block of section.blocks) {
      if (block.type === 'p') parts.push(block.text);
      else if (block.type === 'list') parts.push(...block.items);
    }
  }
  for (const item of article.faqs ?? []) parts.push(item.q, item.a);
  return parts.join(' ').trim().split(/\s+/).filter(Boolean).length;
}

const allowedStatic = new Set([
  '/emergency',
  '/contact',
  '/insurance-log',
  '/restoration',
  '/roof-replacement-cost-houston',
  '/blog',
  '/storm-and-hail-roof-repair-houston',
  '/what-to-do-after-water-damage-houston',
  '/water-damage-insurance-claims-in-texas',
  '/frozen-and-burst-pipes-in-houston',
]);

const noteSlugs = new Set(fieldNotes.map((article) => article.slug));

for (const article of fieldNotes) {
  if (article.image) {
    throw new Error(`Field note should not add an image: ${article.slug}`);
  }
  if (!titleFits(article.metaTitle)) {
    throw new Error(`Field note meta title does not fit: ${article.metaTitle}`);
  }
  if (article.description.length > 155) {
    throw new Error(`Field note description is too long: ${article.slug}`);
  }
  const words = noteWords(article);
  if (words < 1200 || words > 1800) {
    throw new Error(`Field note ${article.slug} is ${words} words`);
  }
  if (!article.faqs || article.faqs.length < 4) {
    throw new Error(`Field note ${article.slug} needs FAQs`);
  }
  const hrefs = article.sections.flatMap((section) =>
    section.blocks.flatMap((block) =>
      block.type === 'links' ? block.items.map((item) => item.href) : [],
    ),
  );
  for (const href of hrefs) {
    const slug = href.replace(/^\//, '');
    const known =
      allowedStatic.has(href) ||
      noteSlugs.has(slug) ||
      Boolean(getService(slug));
    if (!known) throw new Error(`Field note ${article.slug} links an unknown path: ${href}`);
  }
  const blob = [article.lede, article.ctaBody, ...article.sections.flatMap((section) =>
    section.blocks.flatMap((block) => (block.type === 'p' ? [block.text] : [])),
  )].join('\n');
  if (!blob.includes(phone)) {
    throw new Error(`Field note ${article.slug} is missing the phone number`);
  }
  if (/\bGAF\b|\bIICRC\b/i.test(blob)) {
    throw new Error(`Field note ${article.slug} mentions a banned name`);
  }
}
