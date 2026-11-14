import type { Article } from '@/lib/articles';
import { localLandingSlug } from '@/lib/local-paths';
import { titleFits } from '@/lib/seo';
import { serviceAreas } from '@/lib/service-areas';
import { services } from '@/lib/services';

export const restorationGuides: Article[] = [
  {
    slug: 'what-to-do-after-water-damage-houston',
    title: 'What to Do After Water Damage in a Houston Home',
    metaTitle: 'After Water Damage in Houston',
    crumb: 'After water damage',
    lines: ['The first day', 'after the water.'],
    description:
      'What to do in the first day or two after water damage in a Houston home: stay safe, dry the structure, and document the loss.',
    lede: 'A supply line, a roof opened by a storm, or water across a slab all start the same way. Houston air is already humid, so a wet house does not dry while you decide.',
    image: '/images/services/water-damage-restoration.jpg',
    service: 'water-damage-restoration',
    ctaTitle: 'Water in the house?',
    ctaBody:
      'Call (713) 909-0034, or use the contact form. Tell us where the water came from and whether it is still coming in.',
    related: [
      'water-damage-insurance-claims-in-texas',
      'how-to-prevent-water-damage-in-your-home',
    ],
    faqs: [
      {
        q: 'Should I open the windows to dry a Houston room?',
        a: 'Outside air here is often too wet to help. Keep the house closed and pull moisture out with dehumidification. A household fan moves air. It does not dry a wet wall or a slab.',
      },
      {
        q: 'Can I throw wet carpet away before the adjuster comes?',
        a: 'Photograph it in the room first, with a wide shot and a close shot. If it is a hazard and you have to remove it, keep those photos and a note of what left the house. Ask your insurer what they want saved.',
      },
      {
        q: 'Does a musty smell mean the house is unsafe to live in?',
        a: 'A musty smell means something is still damp. Find that material and dry it or remove it. If anyone feels ill, that question belongs with a doctor.',
      },
      {
        q: 'Who decides what the insurance company pays?',
        a: 'Your insurer. We record what got wet and what was dried or repaired. We are the contractor. Your insurer handles the claim, and a public adjuster is a different license.',
      },
    ],
    sections: [
      {
        heading: 'Stay out of water that can hurt you',
        blocks: [
          {
            type: 'p',
            text: 'The first minutes are about people, not the floor. If water is standing near outlets, a lamp, or the breaker panel, do not step in it. If you can reach the main shutoff without crossing that water, turn it off when the source is a pipe, a hose, or an appliance. The main is usually at the meter or where the line enters the house. Turn it clockwise. A valve under one sink helps only when the break is on that supply.',
          },
          {
            type: 'p',
            text: 'If water is coming through the ceiling, stay off a ceiling that is sagging. It can hold more than the stain suggests. Do not climb onto the roof in the rain, or onto a deck that may be soft. Carry out what you can from the wet rooms, and leave the rest until you have a safe path. If you smell gas, cannot find the shutoff, or the water keeps coming after the valve is turned, call for help. Do not guess at a gas valve.',
          },
        ],
      },
      {
        heading: 'Use the first day to limit the spread',
        blocks: [
          {
            type: 'p',
            text: 'Towels and a household fan can handle a small puddle on hard flooring that you caught as it happened. They are not a drying plan once water has reached drywall, insulation, carpet padding, or the inside of a cabinet. Those materials hold water after the floor looks wiped. Leave the windows closed. Outside air in Houston is often wetter than the air in a shut room. Call for drying when a ceiling is stained or still dripping, when carpet or drywall stayed wet, or when you are not sure the power is safe. New paint waits until the structure is dry.',
          },
          {
            type: 'p',
            text: 'A lot of Houston houses sit on a slab. Water runs under the flooring and wicks up the wall. You see the paint. The paper on the drywall above the floor is what stays wet. Cabinet boxes made of particle board swell at the bottom. Hardwood cups. Laminate lifts at the joints. In a two-story house in Memorial or Bellaire, the same leak often stains the ceiling below, and the stain is not always under the fixture that failed. If it is safe, move furniture off the wet floor and open the cabinet doors.',
          },
        ],
      },
      {
        heading: 'Humidity is why this should not sit',
        blocks: [
          {
            type: 'p',
            text: 'A mold countdown would not help. What we see here is simpler. Houston humidity does not give wet materials much help. A room can feel drier to the hand and still be wet inside the wall, the insulation, or the carpet pad. Those are the places a musty smell starts, usually out of sight. Waiting through a weekend because the surface looks better is how a small release becomes a tear-out.',
          },
          {
            type: 'p',
            text: 'A smell in a closed room, a stain that moves above the original water line, or a floor that stays soft are reasons to open the assembly and measure it. They are not reasons to paint. Bleach on a baseboard does not dry the insulation behind it. Primer over a damp stain hides the clue and leaves the moisture in place. Find the wet materials, dry what can be saved, and remove what cannot. If someone in the house is sensitive to mold, say so when you call. The work is the same. It should not be closed up and left.',
          },
        ],
      },
      {
        heading: 'Photograph it before anything is thrown away',
        blocks: [
          {
            type: 'p',
            text: 'Your insurer decides what the policy pays. The record is the part you can take care of on day one. Walk each wet room before you clean. Take a wide shot, then a close shot of the source if you can see it: a split supply line, a stain at a roof penetration, a water heater and its pan. Photograph belongings before you move them, and photograph the path the water took, including rooms that only look slightly affected.',
          },
          {
            type: 'p',
            text: 'Write a short list next to the photos. Name the room, what got wet, and anything you removed because it was a hazard. If carpet or drywall has to come out before an adjuster visit, the photos are what still show it. Keep receipts for tarps and for drying. Many policies expect you to limit further damage and to keep a record of reasonable costs. Yours may say that differently. Ask the insurer. We are not the source for what your form requires.',
          },
          {
            type: 'p',
            text: 'Hold permanent repairs that would hide the damage until an adjuster has seen it, unless leaving an opening would make the loss worse or the insurer told you to proceed. If you have to cover something, photograph it first. The insurance photo log on this site is a free room-by-room packet. It is yours whether or not you hire anyone.',
          },
        ],
      },
      {
        heading: 'Where Houston houses usually take on water',
        blocks: [
          {
            type: 'p',
            text: 'The calls are ordinary until the water sits. A washing-machine hose, an ice-maker line, a water heater in a closet, a shower that has been wetting the wall, a valley or a vent-pipe collar after a storm. On a one-story slab in Spring Branch or Katy, that water has a flat path under the floor. Near Clear Lake, wind-driven rain can find the windows in the same week. The first steps do not change with the neighborhood. How much has to come out depends on how long it stayed wet.',
          },
          {
            type: 'p',
            text: 'Call the company that wrote the policy as soon as you reasonably can. Ask how they want notice, and whether an adjuster should see the damage before permanent work. Write down the claim number. Notice timing is in the policy. It is not the same on every Texas form, so ask the insurer what the deadline is.',
          },
          {
            type: 'p',
            text: 'A public adjuster is a separate license, someone a homeowner can hire to represent them with the insurance company. Elite Restorations is not a public adjuster. We photograph, dry, and rebuild. The claim and the amount paid stay with your insurer.',
          },
        ],
      },
      {
        heading: 'Drying and the rebuild are one sequence',
        blocks: [
          {
            type: 'p',
            text: 'The first steps stop more damage: pull standing water, run air movers and dehumidifiers, and record what the meters say. Drywall, flooring, cabinets, and paint start when the structure is dry. Painting a damp wall is how the stain comes back. If you also want to remodel that kitchen or bath, dry it first. A new cabinet run on a wet wall is a second loss.',
          },
          {
            type: 'links',
            items: [
              { href: '/water-damage-restoration', label: 'Water damage restoration' },
              { href: '/insurance-claims', label: 'Insurance claims help' },
              { href: '/painting-drywall-repair', label: 'Painting and drywall repair' },
              { href: '/restoration', label: 'Restoration in Houston' },
              {
                href: '/water-damage-restoration-houston-tx',
                label: 'Water damage restoration in Houston',
              },
              {
                href: '/water-damage-restoration-katy-tx',
                label: 'Water damage restoration in Katy',
              },
              { href: '/insurance-log', label: 'Free insurance photo log' },
              { href: '/contact', label: 'Contact form' },
            ],
          },
        ],
      },
      {
        heading: 'When you want a crew at the house',
        blocks: [
          {
            type: 'p',
            text: 'Call (713) 909-0034, or use the contact form. Say where the water came from and whether it is still coming in. Elite Restorations is family-owned, at 511 Crestwater Ct, Houston, TX 77082, and has been restoring and remodeling Houston houses since 1993. We dry the structure and, when you want us to, rebuild the drywall, floors, and finishes. Coverage is a decision for your insurer. The visit is about the house.',
          },
        ],
      },
    ],
  },
  {
    slug: 'storm-and-hail-roof-repair-houston',
    title: 'Storm and Hail Damage Roof Repair in Houston',
    metaTitle: 'Houston Hail and Storm Roof Repair',
    crumb: 'Hail and storm roofs',
    lines: ['After hail', 'or a hard storm.'],
    description:
      'How to spot hail and wind damage on a Houston roof, when to call for a repair, and how the insurance claim gets documented.',
    lede: 'Hail and a hard wind do not always leave a hole you can see from the curb. The leak often shows up on the next rain, in a ceiling that was fine last month.',
    image: '/images/projects/roofing/brick-house-missing-shingles.webp',
    service: 'roofing',
    ctaTitle: 'Not sure what the storm did?',
    ctaBody:
      'Call (713) 909-0034, or use the contact form. If water is coming in, say so at the start of the call.',
    related: [
      'what-to-do-after-water-damage-houston',
      'how-insurance-claims-work-texas-restoration',
    ],
    faqs: [
      {
        q: 'Can I climb up and check the shingles myself?',
        a: 'Stay on the ground. Wet shingles, bruised wood under the shingles, and a slope you do not walk in ordinary weather are how people get hurt after a storm. Tell us what you can see from the yard. We will look at the roof.',
      },
      {
        q: 'Does a ceiling stain mean the whole roof has to be replaced?',
        a: 'No. A stain can be metal at one joint, one lifted shingle, or a wider problem. The inspection says which. Replacing a roof that can be repaired is the wrong job, and patching a roof that is finished is the wrong job too.',
      },
      {
        q: 'Should I repair the roof before the adjuster visits?',
        a: 'Photograph first. A tarp over an opening limits further damage and should not wait on a meeting if rain is coming. Permanent shingles that cover the evidence usually wait until the adjuster has seen the roof, unless the insurer tells you to proceed or leaving it open would make the loss worse.',
      },
      {
        q: 'Will you tell me if the claim will be paid?',
        a: 'No. We document the roof and do the work you hire. Coverage, the deductible, and the amount paid are decisions for your insurer.',
      },
    ],
    sections: [
      {
        heading: 'Look from the yard, not from a wet roof',
        blocks: [
          {
            type: 'p',
            text: 'After a storm, walk the house in daylight once the wind has dropped. Stay on the ground. A wet or bruised roof is not a place to inspect from. Binoculars help. You are looking for shingles that are missing, cracked, or lifted at the edges, for the layer showing under them, and for debris that punched through. Check the ground and the gutters for piles of granules. A few granules in a downspout are ordinary on an older roof. A fresh scatter of grit after hail is a reason to have the roof looked at.',
          },
          {
            type: 'p',
            text: 'Look at soft metal while you are there. Hail dents gutters, downspouts, flue caps, and the fins on an outdoor air conditioner. Window screens and light covers take marks too. Those dents do not prove every shingle is ruined. They do tell you hail reached the house, which is worth knowing before the next rain moves the evidence around. Photograph the dents and the granule scatter the same day if you can. They are easy to forget once the yard is cleaned.',
          },
        ],
      },
      {
        heading: 'What hail does to a Houston roof',
        blocks: [
          {
            type: 'p',
            text: 'Architectural asphalt is the roof we see most, on brick houses in Memorial and Bellaire and on newer roofs in Katy, Pearland, and The Woodlands. Hail bruises the shingle and knocks the granules off. The shingle can look only spotted until water finds the bruise. Tile can crack. Metal can dent. A membrane on a flatter section can puncture. The marks are often on the slope that faced the storm, and along hips and ridges, not spread like a paint stain.',
          },
          {
            type: 'p',
            text: 'Metal that keeps water out is the other place storms show up. Rubber collars, valley metal, and the metal where a roof meets a wall can lift or split even when the main roof looks calm. That is a common source of the ceiling stain that appears a week later, under a bathroom or a chimney, with no missing shingle in sight. If you can see a lifted edge or a cracked collar from the ground, say so when you call. Do not pull on it.',
          },
          {
            type: 'list',
            items: [
              'Fresh granules in gutters or on the soil after a hailstorm',
              'Dark spots where the shingle surface looks bruised or speckled',
              'Cracked tile, or metal panels with new dents',
              'Dents in gutters, flue caps, and air-conditioner fins',
              'A ceiling stain that showed up on the rain after the storm',
            ],
          },
        ],
      },
      {
        heading: 'What wind does, besides hail',
        blocks: [
          {
            type: 'p',
            text: 'Wind lifts tabs, creases shingles, and drops limbs. A limb on the roof is an opening even when the rest of the roof looks intact. Wind also drives rain at windows and at siding, so an interior stain is not always a roof problem. We look at the roof and at the wall that faces the weather before we tell you which one let the water in. Houses under mature trees, common in Memorial, Bellaire, and the Heights, collect more of this than an open subdivision.',
          },
          {
            type: 'p',
            text: 'If the roof is open, the first repair is often a tarp, and only when it is safe to be up there. A tarp is temporary. It keeps the next rain out of the insulation and the ceiling. It is not a finished roof, and it needs a look after the next wind. Emergency tarping, a repair, and a replacement are different jobs. We say which one the roof in front of us needs after we are on it, not from a photo taken at the curb.',
          },
        ],
      },
      {
        heading: 'When to call',
        blocks: [
          {
            type: 'p',
            text: 'Call the same day if water is coming in, if you can see daylight through the roof, if a limb is on the house, or if a ceiling is sagging. Call before the next rain if granules are freshly knocked loose, if shingles are lifted, or if a ceiling stain appeared after the storm and is still dry for now. A stain that is dry today can be a leak that only runs when the wind drives rain.',
          },
          {
            type: 'p',
            text: 'You do not need to know whether the roof can be repaired. That is the inspection. Some bruises can be repaired. A roof that is bruised across a slope, or that is already near the end of its life, often needs to come off. Age, the wood under the shingles, and how the water is getting in all matter. We photograph what we find so you have that record either way. Repairing a roof that can be saved, and replacing one that cannot, are both honest answers. The visit is how we tell them apart.',
          },
        ],
      },
      {
        heading: 'How the roof claim usually starts',
        blocks: [
          {
            type: 'p',
            text: 'If you are going to ask your insurer about the storm, photograph before anything is repaired. Include each side of the house, the roof slopes you can see from the ground, the soft-metal dents, the gutters, and any interior stains. Note the date of the storm. Then call the company that wrote the policy and ask how they want the loss reported. Write down the claim number. Ask whether the wind or hail deductible is different from the deductible on a plumbing leak. Your policy is the form to check.',
          },
          {
            type: 'p',
            text: 'An adjuster works for the insurer. If you can, be there for the visit and walk the outside and the stained ceilings with your photos. Ask what was measured. You do not have to agree with a number on the spot. Questions you still have can go back to the insurer in writing. We can be at the house to talk about the roof: what is bruised, what is open, and what a repair or a replacement would include.',
          },
          {
            type: 'p',
            text: 'We provide inspection photos and a written plan for the work you hire us to do. Your insurer decides coverage. A public adjuster is a different license, and the claim stays with your insurer. A repair quote is not a claim. Keep those two papers separate.',
          },
          {
            type: 'links',
            items: [
              { href: '/roofing', label: 'Roofing' },
              { href: '/roof-replacement', label: 'Roof replacement' },
              { href: '/roofing-emergency-tarp-repair', label: 'Emergency roof tarping' },
              { href: '/insurance-claims', label: 'Insurance claims help' },
              { href: '/restoration', label: 'Restoration in Houston' },
              { href: '/roofing-houston-tx', label: 'Roofing in Houston' },
              { href: '/roofing-memorial-tx', label: 'Roofing in Memorial' },
              { href: '/contact', label: 'Contact form' },
            ],
          },
        ],
      },
      {
        heading: 'If the roof is open, or you are unsure',
        blocks: [
          {
            type: 'p',
            text: 'Call (713) 909-0034, or use the contact form. If water is coming in, say so at the start of the call. We tarp when it is safe, photograph the damage, and then repair or replace the roof the house actually needs. Elite Restorations is family-owned and has served Houston since 1993. The office is at 511 Crestwater Ct, Houston, TX 77082, and the work is scheduled from there.',
          },
        ],
      },
    ],
  },
  {
    slug: 'how-insurance-claims-work-texas-restoration',
    title: 'How Insurance Claims Work for Texas Restoration',
    metaTitle: 'Texas Restoration Claim Steps',
    crumb: 'Restoration claims',
    lines: ['How a claim', 'actually proceeds.'],
    description:
      'How a Texas home restoration claim usually proceeds, from the first notice to the adjuster visit, and what a contractor can and cannot do.',
    lede: 'A claim is a conversation with your insurer about your policy. The restoration is the work on the house. They happen at the same time, and they are not the same job.',
    image: '/images/projects/roofing/brick-gable-attic-vent.jpg',
    service: 'insurance-claims',
    ctaTitle: 'Need the damage written down?',
    ctaBody:
      'Call (713) 909-0034, or use the contact form. We will look at the house. Your insurer decides what the policy pays.',
    related: [
      'water-damage-insurance-claims-in-texas',
      'storm-and-hail-roof-repair-houston',
    ],
    faqs: [
      {
        q: 'Do I have to hire the contractor who looked at the house?',
        a: 'No. A visit does not lock you into the work. Hiring is your choice. Ask for the plan in writing before anything starts.',
      },
      {
        q: 'Can you meet the adjuster with me?',
        a: 'Yes, if you want us there. We can speak to the damage and the repair. The claim stays with your insurer, and we are not a public adjuster.',
      },
      {
        q: 'Should I wait to dry the house until the claim is approved?',
        a: 'No. Stopping more water, and drying what got wet, limits further damage. Approval is a separate decision, and it may not come before the materials get worse. Keep photos and receipts.',
      },
      {
        q: 'Is this legal advice about Texas insurance law?',
        a: 'No. It describes how the work and the paperwork usually proceed. Your policy and your insurer are the source for deadlines, deductibles, and coverage. For legal questions, talk with a lawyer you choose.',
      },
    ],
    sections: [
      {
        heading: 'Start with the house, then the paperwork',
        blocks: [
          {
            type: 'p',
            text: 'Make the property safe before you worry about forms. Stop a plumbing leak if you can do it without stepping through water near power. Stay off a damaged roof. If a storm opened the roof or broke a window, a temporary cover keeps the next rain from becoming a second loss. Photograph that damage before you cover it, if you can do so safely. This page is a description of the usual order. It is not legal advice, and it is not a reading of your policy.',
          },
          {
            type: 'p',
            text: 'Then call the company on the policy, or the agent who can open the report. Ask how they want notice, what they want you to save, and whether they want an adjuster to see the damage before permanent repairs. Write down the claim number, the date, and the name of anyone you speak with. Notice language is in your policy. It is not identical on every Texas policy, so ask the insurer what the deadline is. Ask the insurer to point you to the wording, and keep that answer with the claim number.',
          },
        ],
      },
      {
        heading: 'The steps most homeowners actually walk',
        blocks: [
          {
            type: 'p',
            text: 'The order is fairly steady, even when the damage is not. First the house is protected and photographed. Then the claim is opened. Then someone dries or tarps what would get worse if it waited. Then the adjuster looks. Then you read what the insurer sends and ask about anything that does not match your photos or your policy. Repairs that rebuild finishes usually come after that look, unless delay would make the loss worse.',
          },
          {
            type: 'list',
            items: [
              'Make the house safe and stop more water if you can do it safely',
              'Photograph rooms, the source, and belongings before cleanup',
              'Open the claim and write down the claim number',
              'Tarp, board, or dry what would get worse if it waited, and keep receipts',
              'Meet the adjuster with your photos and ask what was measured',
              'Compare what the insurer sends with the house, and ask about gaps in writing',
              'Hire the repair when you are ready, with a plan you have read',
            ],
          },
          {
            type: 'p',
            text: 'Keep a simple file. Photos, the claim number, names, receipts for temporary protection, and notes of what was removed. The insurance photo log on this site is a free way to keep the room-by-room part of that file. Bring it to the adjuster meeting. It does not decide coverage. It keeps the facts in one place. Water that rose from outside is often a different conversation than a burst supply line or a roof leak. Ask your insurer which policy, if any, applies to the water you had.',
          },
        ],
      },
      {
        heading: 'The adjuster meeting',
        blocks: [
          {
            type: 'p',
            text: 'The adjuster works for the insurance company. Be there if you can. Walk the rooms and the parts of the roof they are willing to see. Point out damage that is easy to miss: a soft floor away from the obvious stain, wet insulation, dents on gutters, a ceiling that only drips when the wind drives rain. Share your photos. Ask what was measured, and ask for a copy of what they write up. Take notes of names and of anything you were told would be checked later.',
          },
          {
            type: 'p',
            text: 'You can ask questions on the spot. You can also ask later, in writing, about anything you do not understand. You do not have to agree to a figure in the driveway. If a contractor is with you, that person can speak to the condition of the building and to the work they would do. They are not there to argue your policy for you. A public adjuster is different. That is a separate license a homeowner can hire to represent them with the insurer. Elite Restorations is not a public adjuster. If you hire one, that is your decision. The claim stays with your insurer.',
          },
        ],
      },
      {
        heading: 'What a restoration contractor can do',
        blocks: [
          {
            type: 'p',
            text: 'A contractor can photograph visible damage, tarp an opening when it is safe, extract water, and dry the structure. A contractor can write down what was wet, what was removed, and what was rebuilt. A contractor can give you a plan and a price for the work you hire: roofing, drywall, flooring, siding, paint. A contractor can meet the adjuster at the house and answer questions about those materials. That is the help. It is practical, and it stops at the building.',
          },
          {
            type: 'p',
            text: 'We do that work as a family-owned company that has been in Houston since 1993, scheduled from 511 Crestwater Ct, Houston, TX 77082. You can hire the company you want. A visit from us does not lock you into the work.',
          },
        ],
      },
      {
        heading: 'What a contractor cannot do',
        blocks: [
          {
            type: 'p',
            text: 'A contractor cannot decide what your policy covers. A contractor cannot tell you the insurer owes a certain amount. A contractor cannot sign the claim for you, and should not ask you to sign away a question you have not read. What the policy means, and any legal advice, belong with your insurer or with a lawyer you choose. If you need your rights explained under a statute or a form, start with those offices. We are the contractor, and we stay with the building.',
          },
          {
            type: 'p',
            text: 'We also cannot promise that a claim will be approved, or that a deductible will be waived. Deductibles, including a wind or hail deductible that may differ from an ordinary one, are in your policy. Ask the insurer which deductible applies to this loss. How a payment is released, and whether it is reduced for age before the work is finished, are in the policy too. We can price the repair. We cannot turn that price into a coverage decision.',
          },
        ],
      },
      {
        heading: 'Read what comes back',
        blocks: [
          {
            type: 'p',
            text: 'When the insurer sends an estimate or a letter, compare it with your photos and with what you can see in the house. If a wet room is missing, or a roof slope was not mentioned, ask the insurer in writing. If you hire us, our plan describes the work we are pricing. It is not a substitute for their estimate, and the two will not always match. The difference is a question for the insurer. Your insurer is the one to ask about that gap.',
          },
          {
            type: 'p',
            text: 'Permanent repairs that cover damage usually wait until the adjuster has had a chance to see it. Temporary protection does not. A house that stays open or stays wet gets harder to repair, and the photos from the first day are what keep that extra damage understandable.',
          },
          {
            type: 'links',
            items: [
              { href: '/insurance-claims', label: 'Insurance claims help' },
              { href: '/water-damage-restoration', label: 'Water damage restoration' },
              { href: '/roofing', label: 'Roofing' },
              { href: '/restoration', label: 'Restoration in Houston' },
              {
                href: '/insurance-claims-houston-tx',
                label: 'Insurance claims help in Houston',
              },
              {
                href: '/insurance-claims-bellaire-tx',
                label: 'Insurance claims help in Bellaire',
              },
              { href: '/insurance-log', label: 'Free insurance photo log' },
              { href: '/contact', label: 'Contact form' },
            ],
          },
        ],
      },
      {
        heading: 'When you want the house looked at',
        blocks: [
          {
            type: 'p',
            text: 'Call (713) 909-0034, or use the contact form. Tell us what was damaged and whether you have already opened a claim. We will look at the house, photograph the conditions, and talk through the repair. Your insurer decides what the policy pays.',
          },
        ],
      },
    ],
  },
  {
    slug: 'hurricane-season-prep-houston',
    title: 'Hurricane Season Prep Checklist for Houston Homes',
    metaTitle: 'Houston Hurricane Season Checklist',
    crumb: 'Hurricane season prep',
    lines: ['Before the storm,', 'and after it.'],
    description:
      'A Houston hurricane-season checklist for the roof, windows, and drainage, plus what to do at the house after the storm passes.',
    lede: 'Hurricane season on the Gulf runs from June through November. The useful preparation is ordinary: the roof, the openings, the way water leaves the house, and a record made while the house is whole.',
    image: '/images/projects/roofing/brick-home-multi-gable.webp',
    service: 'roofing',
    ctaTitle: 'Want the roof looked at while you can?',
    ctaBody:
      'Call (713) 909-0034, or use the contact form. Before a storm, or after one, tell us what you can see from the ground.',
    related: [
      'storm-and-hail-roof-repair-houston',
      'what-to-do-after-water-damage-houston',
    ],
    faqs: [
      {
        q: 'When should I start this list?',
        a: 'Before a storm is in the Gulf, while a roof can still be repaired on an ordinary schedule. Once a storm is close, the realistic jobs are the yard, the openings, and the photos. Roof work waits on safe weather.',
      },
      {
        q: 'Do I need to board every window?',
        a: 'Not as a rule. Close and latch what you have. Board the openings you have decided to protect, and do it before the wind arrives. This page does not set a boarding requirement.',
      },
      {
        q: 'Can I get on the roof to pull a limb off after the storm?',
        a: 'No. A limb on a wet or damaged roof is a job for a crew, after it is safe to be up there. Photograph it from the ground and call.',
      },
      {
        q: 'Who pays for the tarp or the drying?',
        a: 'Your insurer decides what the policy pays. Keep the photos and the receipts. We do the protection and the repairs you hire. Your insurer decides coverage.',
      },
    ],
    sections: [
      {
        heading: 'The roof, seen from the yard',
        blocks: [
          {
            type: 'p',
            text: 'Before a storm is forecast to arrive, look at the roof from the ground. You want missing or lifted shingles, cracked tile, debris already sitting in a valley, and limbs close enough to fall on the house. Rubber collars on the vent pipes, and the metal where a roof meets a wall, are worth a look with binoculars. If you can see a lifted edge, get it repaired while the weather is ordinary. A small opening is much easier to close on a clear day than in the wind.',
          },
          {
            type: 'p',
            text: 'Do not climb up because a storm is on the forecast. Falls happen on dry days too, and a hurried trip onto a slope is a poor trade. If you cannot see a problem but the roof is old, or a ceiling has stained in past rains, ask for an inspection while the schedule is still ordinary. Houses under mature trees, which is common in Memorial, Bellaire, and the Heights, deserve that look. So do long roof planes on larger houses farther west.',
          },
          {
            type: 'p',
            text: 'We repair what can be repaired and say so when the roof needs to come off. The layer under the shingles, metal joints, and vents go with a replacement. The goal before a storm is a roof that is already closed, not a promise about a future claim. Your insurer decides coverage if a later storm damages the house.',
          },
        ],
      },
      {
        heading: 'Windows, doors, and anything the wind can pick up',
        blocks: [
          {
            type: 'p',
            text: 'Close and latch windows and doors, including the garage, before the wind is up. Know which side of the house takes the weather. If you choose to board openings, do it while you can still work safely, and follow the instructions that came with the panels or the plywood you are using. Use the fastening instructions that came with your boards. A board put on after the rain has started is how people get hurt.',
          },
          {
            type: 'p',
            text: 'Walk the yard. Grills, patio chairs, potted plants, and loose lumber become debris. Store them inside, or secure what is meant to stay. Check the fence gates. A gate that swings free will meet a window. If you leave, tell a neighbor how to reach you, and take the policy number and the claim phone number with you. Clear Lake and Galveston see wind and coastal weather that an inland subdivision does not. The list is the same. Finish it while the weather is still ordinary.',
          },
        ],
      },
      {
        heading: 'Give the rain somewhere to go',
        blocks: [
          {
            type: 'p',
            text: 'Water that cannot leave the house comes inside. Clean gutters and downspouts so they discharge away from the foundation, not into the bed against the slab. Walk the low side of the yard. Soil and mulch piled against the brick, and drains clogged with leaves, hold water at the wall. In a hard rain that is how water crosses a slab and shows up in the living room even when the roof held.',
          },
          {
            type: 'p',
            text: 'If you have yard drains or a swale, clear the inlets you can reach on your own property. Do not wade into a street to clear a storm sewer once the rain has started, and do not assume a city inlet is yours to open. A downspout that dumps at the foundation is your job. A blocked public drain is a call to the city, made before the storm if you already know that corner floods.',
          },
          {
            type: 'p',
            text: 'Newer streets in Katy, Pearland, and The Woodlands often move water in swales and curb inlets. Older lots inside the Loop rely on shorter gutters and flatter yards. When the rain is heavy, it still has to move away from the house. If it does not on an ordinary thunderstorm, fix the downspout and the ground you can reach while it is dry.',
          },
        ],
      },
      {
        heading: 'Make a record while the house is whole',
        blocks: [
          {
            type: 'p',
            text: 'Photograph each side of the house, the roof slopes you can see, and the rooms you would hate to describe from memory. Include the labels on large appliances if you can do it quickly. Store the photos where you can reach them if you are not at home. The insurance photo log on this site can hold a room-by-room set. A set taken before the weather is the most useful page in it, because after the storm you are comparing the house with something you can still see.',
          },
          {
            type: 'p',
            text: 'Put your policy, the phone number for your insurer, and our number where you will find them without power. Know where the main water shutoff is, and confirm it turns. If you use a generator later, keep it outside, away from windows and doors. Do not run one in a garage, even with the door open. That is a safety rule. It is not a suggestion about which storm kit to buy.',
          },
          {
            type: 'list',
            items: [
              'Roof, from the ground: lifted shingles, cracked tile, debris, nearby limbs',
              'Openings: windows and doors closed and latched, boards on only if you are doing that early',
              'Yard: loose furniture, grills, and lumber put away',
              'Drainage: gutters, downspouts, and the soil against the slab',
              'Records: photos of the whole house, policy number, shutoff located',
            ],
          },
        ],
      },
      {
        heading: 'After the storm, go slow',
        blocks: [
          {
            type: 'p',
            text: 'If you left, wait until local officials say you can return. When you are back, look before you step. Stay away from downed lines and from water around them. Do not touch a line that is on a fence or a roof. Do not start the cleanup in a flooded room if the power may still be on. From the ground, look for openings in the roof, broken windows, and siding that came loose.',
          },
          {
            type: 'p',
            text: 'If water got in, the indoor work is the same as any other water damage. Keep people out of unsafe water, photograph, and start drying. Houston humidity does not pause because the storm has moved on. Wet drywall and insulation will sit damp until they are dried or removed. A tarp belongs on an open roof only when it is safe for a crew to be up there. We photograph the damage first when we can, then cover the opening so the next band of rain stays outside. Permanent roofing comes after.',
          },
          {
            type: 'p',
            text: 'Call your insurer to open or update the claim, and keep receipts for temporary protection. Siding, drywall, and paint follow the dry-out. They are not the first hour. A homeowners policy and a flood policy are different conversations. Check your policy, or ask your insurer which one applies. We can dry the house and repair what you hire us to repair.',
          },
          {
            type: 'links',
            items: [
              { href: '/roofing', label: 'Roofing' },
              { href: '/roofing-emergency-tarp-repair', label: 'Emergency roof tarping' },
              { href: '/water-damage-restoration', label: 'Water damage restoration' },
              { href: '/siding', label: 'Siding' },
              { href: '/restoration', label: 'Restoration in Houston' },
              { href: '/roofing-clear-lake-tx', label: 'Roofing in Clear Lake' },
              {
                href: '/water-damage-restoration-galveston-tx',
                label: 'Water damage restoration in Galveston',
              },
              { href: '/contact', label: 'Contact form' },
            ],
          },
        ],
      },
      {
        heading: 'Call before the weather, or after it',
        blocks: [
          {
            type: 'p',
            text: 'Call (713) 909-0034, or use the contact form. Before a storm, we can look at the roof while the weather allows it. After a storm, tell us if the roof is open or if water is inside. Elite Restorations is family-owned, at 511 Crestwater Ct, Houston, TX 77082, and has served Houston since 1993.',
          },
        ],
      },
    ],
  },
];

const staticGuidePaths = new Set([
  '/restoration',
  '/contact',
  '/insurance-log',
  '/emergency',
  '/blog',
]);
const serviceSlugs = new Set(services.map((service) => service.slug));
const areaSlugs = new Set(serviceAreas.map((area) => area.slug));

function guideWords(article: Article) {
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

function guideLinkOk(href: string) {
  if (staticGuidePaths.has(href)) return true;
  const slug = href.replace(/^\//, '');
  if (serviceSlugs.has(slug)) return true;
  for (const service of serviceSlugs) {
    for (const area of areaSlugs) {
      if (slug === localLandingSlug(service, area)) return true;
    }
  }
  return false;
}

for (const article of restorationGuides) {
  if (article.title.length > 60) {
    throw new Error(`Guide title is ${article.title.length} characters: ${article.slug}`);
  }
  if (!titleFits(article.metaTitle)) {
    throw new Error(`Guide meta title does not fit: ${article.metaTitle}`);
  }
  if (article.description.length > 155) {
    throw new Error(
      `Guide description is ${article.description.length} characters: ${article.slug}`,
    );
  }
  const words = guideWords(article);
  if (words < 900 || words > 1300) {
    throw new Error(`Guide ${article.slug} is ${words} words`);
  }
  if (!article.faqs || article.faqs.length < 3) {
    throw new Error(`Guide ${article.slug} is missing a FAQ`);
  }
  const hrefs = article.sections.flatMap((section) =>
    section.blocks.flatMap((block) =>
      block.type === 'links' ? block.items.map((item) => item.href) : [],
    ),
  );
  if (!hrefs.includes('/restoration') || !hrefs.includes('/contact')) {
    throw new Error(`Guide ${article.slug} is missing a restoration or contact link`);
  }
  const cityLinks = hrefs.filter((href) => href.endsWith('-tx'));
  if (cityLinks.length < 1 || cityLinks.length > 2) {
    throw new Error(`Guide ${article.slug} should link 1 or 2 city pages`);
  }
  for (const href of hrefs) {
    if (!guideLinkOk(href)) throw new Error(`Guide ${article.slug} links an unknown path: ${href}`);
  }
  const blob = [article.ctaBody, ...article.sections.flatMap((section) =>
    section.blocks.flatMap((block) => (block.type === 'p' ? [block.text] : [])),
  )].join('\n');
  if (!blob.includes('(713) 909-0034') || !article.ctaBody.includes('(713) 909-0034')) {
    throw new Error(`Guide ${article.slug} is missing the phone number`);
  }
  if (/\bGAF\b|\bIICRC\b/.test(blob)) {
    throw new Error(`Guide ${article.slug} mentions a banned name`);
  }
}
