import { notAPublicAdjuster, rangeNote } from '@/lib/service-depth-shared';
import type { ServiceDepth } from '@/lib/service-depth-types';

const waterLinks = [
  { href: '/what-to-do-after-water-damage-houston', label: 'What to do after water damage' },
  { href: '/water-damage-insurance-claims-in-texas', label: 'Water-damage claim checklist' },
  { href: '/insurance-log', label: 'Open the insurance photo log' },
];

export const recoveryDepth: Record<string, ServiceDepth> = {
  'water-damage-restoration': {
    moreIntro: [
      'A supply line, a water heater, an appliance, or a roof that opened in a storm puts water on a slab that has nowhere to go but sideways, under the floor and up the drywall. The air outside is often too wet to dry the house for you. We find the wet material, remove the water, and dry the structure before we rebuild it.',
      'Drying and the rebuild stay with one team. We also repair storm and fire damage when that is the opening in front of us. The first question is still where the water went.',
    ],
    moreLocal: [
      'A one-story slab in Spring Branch or Katy gives water a flat path under the flooring. Cabinet particle board swells at the toe kick. Laminate lifts at the joints. Hardwood cups. In a two-story house the same leak stains the ceiling below, and the stain is not always under the fixture that failed. Many older Heights houses are pier-and-beam, so water can drop into a crawl space and still wick into the floor above. We map it. We do not chase only the stain you can see.',
    ],
    factorsHeading: 'Humidity, the slab, and how long the water sat.',
    factorsIntro:
      'The neighborhood changes the house. It does not change the order: stop the water, see how far it went, dry what can be dried, and remove what cannot.',
    factors: [
      {
        title: 'Humidity slows everything',
        body: 'Outside air in a Houston summer is often too wet to dry a wall. Opening the windows does not do it. Dehumidifiers and air movers stay until the readings say the structure is dry.',
      },
      {
        title: 'Slab versus crawl space',
        body: 'On a slab, water runs under the floor and wicks into the drywall a few inches up, or a few feet up if it sat. You see paint. The paper on the back of the drywall is what stays wet. In a pier-and-beam bungalow we also look below the floor. Missing the crawl space and drying only the room is how the smell comes back.',
      },
      {
        title: 'Time and mold',
        body: 'Damp drywall, carpet pad, and insulation do not get a long grace period in this climate. Mold can start on wet materials within a day or two. That is a property of a warm, wet house, not a scare line. We dry and we remove what will not dry. We do not promise a mold-free house, and we do not sell a certification in place of moisture readings.',
      },
      {
        title: 'Storm water and plumbing water',
        body: 'A burst supply line, a roof opening, and water that came in at grade are different losses. Floodwater from rising water is often a different policy from a sudden pipe break, and it is dirtier. We treat the cleaning to the water that was actually there. Your insurer decides which coverage, if any, applies. Hurricane season, June through November, is when the roof openings cluster. Supply lines fail all year.',
      },
    ],
    process: [
      {
        title: 'Assess',
        body: 'Moisture meters and thermal imaging map where the water traveled, past the stain. We look at the slab or the crawl space and at any ceiling below. If it is not safe, we say so before anyone walks through standing water.',
      },
      {
        title: 'Extract',
        body: 'Standing water comes out so it stops spreading. Belongings come off the wet floor. What is discarded is photographed first.',
      },
      {
        title: 'Dry',
        body: 'Air movers and dehumidifiers run until the readings say the structure is dry. Wet insulation and drywall that will not dry come out so the cavity can dry.',
      },
      {
        title: 'Clean',
        body: 'Cleaning follows the water that was in the house. A supply line and water off the ground are not the same job.',
      },
      {
        title: 'Repair',
        body: 'Drywall, flooring, cabinets, and paint are rebuilt once the structure is dry. The same team that dried the house does this work.',
      },
      {
        title: 'Verify',
        body: 'We check the readings and walk the repairs with you. The photos of what was wet and what was rebuilt stay with you.',
      },
    ],
    signsHeading: 'Signs the water went farther than the stain.',
    signs: [
      {
        title: 'The floor is soft or the boards have cupped',
        body: 'On a slab that often means water under the flooring, not a surface spill. Laminate swells at the joints. Vinyl can hide it until the adhesive fails. We meter the floor before we decide what comes up.',
      },
      {
        title: 'Cabinets are swollen at the toe kick',
        body: 'Particle board at the sink, the dishwasher, or the water heater wicks water and does not return to size. If the box is swollen, the leak is already older than the puddle.',
      },
      {
        title: 'Paint is bubbling low on the wall',
        body: 'The visible line is often below the wet paper inside the wall. Thermal imaging and a meter tell us how high to cut. Patching the paint seals the moisture in.',
      },
      {
        title: 'A stain showed up after a storm',
        body: 'The ceiling stain may be a roof opening, a flashing leak, or an overflowing drain. The attic or the wall is where the water is. The paint is the last step, after the opening is closed and the cavity is dry.',
      },
    ],
    materialsHeading: 'What gets dried, what gets removed, what gets rebuilt.',
    materialsIntro:
      'The equipment is ordinary and specific: meters, air movers, dehumidifiers. The materials that come out are the ones that will not dry. The materials that go back are the finishes the room had, or the finishes you choose if the loss becomes a remodel.',
    materials: [
      {
        title: 'Drywall and insulation',
        body: 'Wet insulation comes out. Drywall is cut above the wet line. The cavity is dried, then new board, tape, texture, and paint.',
      },
      {
        title: 'Floors',
        body: 'Carpet pad that sat in water does not dry in the middle. Cupped wood may flatten, and it may not. Swollen laminate is usually replaced. We decide from the readings.',
      },
      {
        title: 'Cabinets',
        body: 'A plywood box can sometimes be dried. A swollen particle-board box usually cannot. A kitchen rebuild waits on a dry floor.',
      },
      {
        title: 'Cleaning products for the water you had',
        body: 'A supply-line break and floodwater are not the same cleaning. We match the work to the water that was actually in the house.',
      },
    ],
    costHeading: 'What water restoration tends to cost.',
    costIntro: [
      'The range is wide because a wet closet and a house that took water through three rooms are not the same loss. How long the water sat, what it was, and whether floors and cabinets have to be rebuilt are the drivers. These are typical planning ranges, not a quote, and not a prediction of what an insurer will pay.',
      'Drying is priced as drying. The rebuild is priced as construction. Combining them into one round number before we have readings is how both numbers go wrong.',
    ],
    costFactors: [
      {
        title: 'How far it traveled',
        body: 'One room with wet drywall at the base is the small end. Several rooms, a hallway, and a wet cabinet run are the middle. Floors up and cabinets out are the large end.',
      },
      {
        title: 'How long it sat',
        body: 'A leak found the same day is less demolition than a leak that ran over a weekend in July. Time is moisture in the slab and in the walls.',
      },
      {
        title: 'The rebuild',
        body: 'Drywall and paint are one scope. Flooring, cabinets, and a roof opening that caused the loss are others. We itemize them after the dry-out shows what is left.',
      },
    ],
    ranges: [
      { label: 'One room, extraction, drying, limited drywall', range: '$1,800 to $5,000' },
      { label: 'Several rooms, drying and drywall', range: '$5,000 to $14,000' },
      { label: 'Drying plus flooring and cabinet rebuild', range: '$10,000 to $35,000' },
    ],
    rangeNote: rangeNote('water damage restoration'),
    insurance: {
      heading: 'A record of the loss, not a promise about the policy.',
      paragraphs: [
        'Photograph the water, the source if you can see it safely, and the belongings before they are thrown away. We photograph the conditions, the drying, and the repairs. The insurance photo log on this site is free. A sudden pipe break is often treated differently from floodwater or a slow leak, and flood is often a separate policy. We do not know your form.',
        'Mitigation, the work that stops more damage, should not wait on a coverage decision. The rebuild can be scheduled with a clearer scope. Keep those two ideas separate when you talk to the insurer.',
        notAPublicAdjuster,
      ],
      links: waterLinks,
    },
    faqs: [
      {
        q: 'What does water damage restoration typically cost in Houston?',
        a: 'One room of extraction, drying, and limited drywall often plans at $1,800 to $5,000. Several rooms with drying and drywall often plan at $5,000 to $14,000. Drying plus a flooring and cabinet rebuild often plans at $10,000 to $35,000. These are typical planning ranges, not a quote. The readings and the materials that have to come out set the real number. Insurance may pay some, all, or none of it.',
      },
      {
        q: 'Why can you not just open the windows?',
        a: 'Because the air outside is often wetter than the wall you are trying to dry. Dehumidifiers and air movers, with the wet insulation out of the cavity, are what lower the moisture. A fan by itself moves damp air around.',
      },
      {
        q: 'How is a slab leak different from a leak in a Heights bungalow?',
        a: 'On a slab the water runs under the floor and up the wall, and the drain or the supply line may be in the concrete. In many older Heights houses the floor is over a crawl space, so water can drop below and still wet the wood floor. We look at the structure you have. We do not dry only the stain.',
      },
      {
        q: 'Will mold be gone when the equipment leaves?',
        a: 'We dry the structure and remove materials that will not dry, which is how you stop giving mold a wet place to grow. We do not promise that a house is mold-free, and we do not substitute a logo on a shirt for moisture readings. If the visible growth is a larger scope than the wet drywall, we say so at the visit.',
      },
      {
        q: 'Should I throw the carpet out before you arrive?',
        a: 'If it is safe, stop the water and move what you can off the wet floor. Photograph belongings before you discard them. Standing water and wet pad should not sit while you wait, and a record is easier to make before the pile is on the curb. Call (713) 909-0034 and tell us if water is still coming in.',
      },
      {
        q: 'Do you rebuild after the drying, including the roof if that was the source?',
        a: 'Yes. Drywall, flooring, cabinets, and paint are the rebuild. If a storm opened the roof, tarping and the roof repair are part of stopping more water. One team follows it through. The claim paperwork and the construction stay separate, and your insurer still decides coverage.',
      },
    ],
  },
  'insurance-claims': {
    moreIntro: [
      'Insurance claims help, on this site, means photographs, notes, and a clear scope of the drying or the repair. It does not mean we file the claim, argue the estimate, or tell you what the policy owes. Elite Restorations is the contractor. A public adjuster is a separate license a homeowner can hire. We are not one.',
      'The free insurance photo log is a room-by-room packet you can fill out whether or not you hire us. Use it before things are thrown away. If you hire us for the building, our inspection photos and the scope of the work sit beside that record. Coverage is still your insurer’s decision.',
    ],
    moreLocal: [
      'The Houston losses we document are usually a roof opening after hail or tropical weather, a supply line, an appliance, a water heater, or water that came in at grade. Hurricane season runs from June through November. Spring is when hail shows up. A Katy slab and a Heights pier-and-beam house hide water in different places, so the notes say where it went, not only which room looks bad.',
    ],
    factorsHeading: 'What a record needs, and what it cannot do.',
    factorsIntro:
      'A clear file helps the conversation with your insurer. It does not change the policy. These are the pieces that make the file useful, and the limits we will not cross.',
    factors: [
      {
        title: 'Photos before cleanup',
        body: 'Wide shots and close shots of the source, the wet rooms, the roof slopes you can see from the ground, and the belongings, taken before they move. Date them. If a storm is the cause, write the storm date. We take this set when we are the ones on site. You can start it yourself with the photo log.',
      },
      {
        title: 'Notes on the water or the wind',
        body: 'Where it entered, where it traveled, what was dried, and what was rebuilt. A ceiling stain without a note about the attic is a weak record. A roof photo without the interior stain is also incomplete if the water came inside. We write the path.',
      },
      {
        title: 'The policy is not our document',
        body: 'Deductibles, including a wind or hail deductible that on many Texas policies is different from an ordinary one, live in your form. Flood is often a separate policy from a sudden pipe break. Depreciation and how a payment is released are in the policy too. Ask the company that wrote it. We cannot answer those questions for them.',
      },
      {
        title: 'Two different papers',
        body: 'A repair scope is the work you hire. A claim is the request you make to the insurer. Mixing them, or letting a contractor tell you the claim will be approved, is how people get surprised. We keep them separate on purpose.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'You tell us what happened and whether water is still coming in. If it is, protection and drying come before a long paperwork conversation. If the house is stable, we schedule the inspection and the photos.',
      },
      {
        title: 'Plan',
        body: 'We list the rooms, the roof slopes, and the questions the photos need to answer. You decide whether you are calling your insurer. We do not file that call for you, and we do not tell you that you must.',
      },
      {
        title: 'Prepare',
        body: 'Photograph before debris is removed, when it is safe. The photo log can be started on your phone. We bring meters when the loss is water, because a picture of a dry-looking floor is not a moisture reading.',
      },
      {
        title: 'Build',
        body: 'The building work, if you hire it, is tarping, drying, roofing, or the rebuild. That work is documented as it happens: what came out, what was dried, what went back. The documentation rides along. It is not a separate product we sell instead of the repair.',
      },
      {
        title: 'Finish',
        body: 'You have photos and a scope of the work performed. You can share them with an adjuster. If we meet the adjuster, we speak to the building and the repair. We do not negotiate the number.',
      },
      {
        title: 'Walk through',
        body: 'We walk the completed repairs with you when there are repairs. If you only wanted the inspection record, we walk through what the photos show and what they do not show. The policy is still yours to read.',
      },
    ],
    signsHeading: 'When documentation is worth doing now.',
    signs: [
      {
        title: 'Water is in more than one room',
        body: 'The path matters. A single photo of the worst corner leaves out the hall, the cabinet toe kicks, and the ceiling below. Start the record while the water is still visible.',
      },
      {
        title: 'A storm just crossed the roof',
        body: 'Hail bruises and lifted shingles are easier to photograph before the next rain or a quick repair covers them. Include soft metal and any interior stains. Then protect the house.',
      },
      {
        title: 'Someone is about to throw things away',
        body: 'Wet carpet, swollen cabinets, and ceiling drywall are evidence and also a health problem if they sit. Photograph, then remove what cannot be saved. Do not keep a wet house intact for a meeting.',
      },
      {
        title: 'You have an adjuster visit scheduled',
        body: 'You can ask us to be there. We will talk about the damage and the repair. You do not have to agree to a figure in the driveway. We will not agree to one for you.',
      },
    ],
    materialsHeading: 'The tools are a camera, a meter, and a scope.',
    materialsIntro:
      'There is no special claims kit. The useful record is photographs, moisture readings when the loss is water, and a description of the work. The building materials show up only if you hire the repair.',
    materials: [
      {
        title: 'Photographs',
        body: 'Overview and detail, before and after, rooms and the source. Roof slopes from the ground if that is the safe view, and from the roof when we are up there for the inspection. Dated. Stored where you can find them.',
      },
      {
        title: 'Moisture readings',
        body: 'Meters and, when the water has traveled, thermal imaging. A wall can look paint-dry and still be wet in the cavity. The readings are why a dry-out continues or why a rebuild can start. They belong in the file.',
      },
      {
        title: 'The photo log',
        body: 'A room-by-room packet on this site. It is yours. It does not submit a claim and it does not estimate a payment. It keeps you from trying to remember the house after it has been cleaned.',
      },
      {
        title: 'The repair scope',
        body: 'A description of drying, roofing, drywall, flooring, or whatever you hired. It has quantities a builder can understand. It is not an insurance estimate form we filled out as if we worked for the carrier.',
      },
    ],
    costHeading: 'What this help costs, and what it does not.',
    costIntro: [
      'We do not sell claim negotiation, and we do not publish a fee for filing a claim, because we do not file or negotiate claims. Documentation is part of the inspection and the repair you hire. If you only need the photo log, that page is free to use.',
      'The money in a loss is the building work. The planning ranges below are the same ones we publish for that work. They are not a prediction of the claim payment. Your deductible and your coverage can make the check different from the invoice.',
    ],
    costFactors: [
      {
        title: 'Documentation with the work',
        body: 'Photos and notes are included when we are already there to dry, tarp, or rebuild. They are not a second invoice for “claims handling.”',
      },
      {
        title: 'The construction scope',
        body: 'Drying, a roof repair or replacement, and the rebuild are priced as those jobs. The claim does not set our price, and our price does not set the claim.',
      },
      {
        title: 'What we will not price',
        body: 'We will not price a promise that a claim will be approved, a deductible will be waived, or a public-adjuster negotiation will be included. Those are not services we offer.',
      },
    ],
    ranges: [
      { label: 'Insurance photo log on this site', range: 'Free to use' },
      { label: 'One-room drying and limited drywall', range: '$1,800 to $5,000' },
      { label: 'Architectural asphalt roof replacement', range: '$12,000 to $24,000' },
    ],
    rangeNote:
      'The building ranges are typical planning ranges for that scope in Greater Houston, not a quote and not an insurance payment. The photo log is free. Call (713) 909-0034 if you want an inspection.',
    insurance: {
      heading: 'What we will say to an adjuster, and what we will not.',
      paragraphs: [
        'If you want us at the inspection, we can describe the damage and the repair we would do. You can ask questions later, in writing, about anything you do not understand. You do not have to settle the figure on the spot. If you hire a public adjuster, that is your decision and a different license. We still do not negotiate.',
        'We also cannot promise approval, a waived deductible, or a particular timing from the carrier. Deadlines on your policy are your insurer’s to explain. For a legal question, talk with a lawyer you choose.',
        notAPublicAdjuster,
      ],
      links: [
        { href: '/insurance-log', label: 'Open the free insurance photo log' },
        {
          href: '/how-insurance-claims-work-texas-restoration',
          label: 'How insurance claims work for Texas restoration',
        },
        {
          href: '/water-damage-insurance-claims-in-texas',
          label: 'Water-damage claim checklist',
        },
      ],
    },
    faqs: [
      {
        q: 'Do you charge to negotiate my claim?',
        a: 'No. We do not negotiate claims, so there is no fee for that work. We are not a public adjuster. Photos and notes are part of the inspection and the repair you hire. The photo log on this site is free.',
      },
      {
        q: 'What should I photograph in a Houston house?',
        a: 'The source, each wet room, belongings before they are discarded, and, after a storm, each side of the house, the slopes you can see, dented soft metal, and interior stains. On a slab, include the base of the walls and the toe kicks, because that is where water travels. In a pier-and-beam house, the crawl space may be part of the path. Write the date.',
      },
      {
        q: 'Is flood the same as a burst pipe on a Texas policy?',
        a: 'Often no. A sudden pipe or appliance failure and rising floodwater are commonly treated under different coverage, and flood is often a separate policy. Wind and hail may have their own deductible. Your insurer is the one who can say which applies. We cannot.',
      },
      {
        q: 'Can you meet the adjuster?',
        a: 'Yes, if you want us there. We will speak to the condition of the building and the work. We will not argue the policy or agree to a number on your behalf. You can also ask follow-up questions of the insurer in writing.',
      },
      {
        q: 'Should cleanup wait until the claim is approved?',
        a: 'No. Stop more damage. Photograph first, then dry and protect the house. Approval, the deductible, and the amount paid are separate from keeping water in the wall for another week. Houston humidity does not pause for a claim number.',
      },
    ],
  },
  'painting-drywall-repair': {
    moreIntro: [
      'Paint is the last surface, and it shows every shortcut in the drywall under it. A patch in a textured Houston wall has to be feathered until you cannot find the edge in a raking light. A new kitchen or bath is painted as a room, not as a stripe around the new work, or the sheen will give the remodel away.',
      'If the wall was opened because of a leak, it is confirmed dry before it is closed and painted. Paint over damp paper blisters. We will not “seal it in” and hope the air conditioning hides it.',
    ],
    moreLocal: [
      'Older houses in the Heights, Bellaire, and West University often have texture, or plaster that meets newer drywall in the same room. The blend is the repair. Newer houses in Katy and The Woodlands are often a smoother finish, and a bad patch still shows because the light from a big window is unforgiving. Humidity also means a new coat wants a dry substrate and a realistic dry time. A shower of rain outside does not dry the inside of a wall.',
    ],
    factorsHeading: 'Texture, humidity, and a wall that was wet.',
    factorsIntro:
      'The color is the easy choice. The surface under it, and whether that surface is dry, is the work.',
    factors: [
      {
        title: 'Texture that has to disappear',
        body: 'Many inside-the-Loop walls are textured. A smooth patch in the middle of that texture reads as a rectangle forever. We match the texture and feather the compound. Plaster is treated as plaster, not as a drywall patch with extra mud.',
      },
      {
        title: 'Humidity and cure',
        body: 'Primer and paint need a dry wall and enough time. In a Houston summer the air is wet even when the room is air-conditioned. We do not stack coats because the schedule is tight, and we do not paint a bathroom that is still steaming from a leak that was never dried.',
      },
      {
        title: 'After water',
        body: 'The cut line in the drywall should be above the wet paper, the cavity should be dry, and the new board should be taped and primed like any other wall. Painting the stain is how the stain returns. If we did not do the dry-out, we still meter before we close.',
      },
      {
        title: 'Permits',
        body: 'Interior paint and drywall repair are finishes. They do not usually need a permit and they are not an HOA review. If the wall is open because of structure, plumbing, or electrical, that other trade is the permit question. We do not bury that work in a paint scope.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the wall in the light you live with. You say whether this is a patch, a room, or the finish of a remodel. If there is a stain, we ask what leaked and we check whether the wall is dry.',
      },
      {
        title: 'Plan',
        body: 'The texture, the primer, the sheen, and how far the paint has to carry to blend are decided. A small patch may need paint onto the surrounding wall. A remodeled kitchen usually wants the whole room so the color matches.',
      },
      {
        title: 'Prepare',
        body: 'Furniture and floors are protected. Loose texture and a glossy surface are dealt with so the new coat has something to hold. Wet drywall is dried or replaced first. We do not mud over a damp cavity.',
      },
      {
        title: 'Build',
        body: 'The patch is taped, floated, and textured to the surrounding wall. New board in a remodel is finished to the same standard as the patch, because you will see them in the same light. Primer goes on the repairs before the color.',
      },
      {
        title: 'Finish',
        body: 'Color and sheen are applied and cut in cleanly at the trim and the ceiling. We look at the wall from the side, where a proud patch shows. Touch-ups happen before the cloths come up.',
      },
      {
        title: 'Walk through',
        body: 'We walk the walls with you in daylight and with the lights on. You see the blend. We clean up. If a spot needs another touch after the paint has sat, we would rather see it with you than hear about it as a surprise.',
      },
    ],
    signsHeading: 'Signs the wall needs more than a gallon of paint.',
    signs: [
      {
        title: 'You can see the old patch',
        body: 'A hard edge, a smooth island in textured paint, or a flashing spot in raking light means the repair was not feathered. Paint color will not hide the shape. The mud has to be redone.',
      },
      {
        title: 'The stain keeps coming through',
        body: 'A water stain that returns is either still wet or it was never primed for the stain. We find out which. More of the same paint is not a diagnosis.',
      },
      {
        title: 'The remodel looks unfinished',
        body: 'New drywall around cabinets or a shower, with the old color stopping in a line, reads as incomplete. The room is painted as a room once the other trades are out.',
      },
      {
        title: 'Cracks at the doors after a dry summer',
        body: 'Houston clay movement shows up as cracks at corners and above doors. Some are a finish repair. Some are the foundation still moving. We will not keep coating a crack that is opening because the slab is moving without telling you that paint is not the fix.',
      },
    ],
    materialsHeading: 'Board, mud, primer, and paint.',
    materialsIntro:
      'The finish you see is the last layer. The board, the tape, the texture, and the primer are why it either disappears or photographs badly.',
    materials: [
      {
        title: 'Drywall and plaster',
        body: 'New board for what was cut out, taped and floated. Plaster repairs stay in the plaster system when that is the wall. Mixing the two without a plan is how the joint cracks. We match the wall we are in.',
      },
      {
        title: 'Texture',
        body: 'Knockdown, orange peel, and a heavier hand texture are all in Houston houses. The match is done in a test spot when the pattern is hard to read, then carried across the patch. Smooth walls get a smooth finish, feathered wide.',
      },
      {
        title: 'Primer',
        body: 'New drywall, a patch, and a water stain each want primer before color. A stain that bled through once will bleed through the new color if this step is skipped. Primer is not a place we save a coat.',
      },
      {
        title: 'Sheen and color',
        body: 'A powder room can take a deeper color. A living-room patch usually wants the paint already on the wall, carried far enough that the sheen matches. Flat, eggshell, and semi-gloss fail differently in side light. We match the sheen that is there unless you are repainting the room.',
      },
    ],
    costHeading: 'What painting and drywall tend to cost.',
    costIntro: [
      'A single patch and a whole interior are different products. Texture matching and ceiling height add time. These ranges are interior work. They do not include a dry-out, and they do not include exterior paint.',
    ],
    costFactors: [
      {
        title: 'Patch or room',
        body: 'A small blend is labor and a little paint. A room is protection, prep, and walls. A whole house is days, not a bigger patch.',
      },
      {
        title: 'Texture and plaster',
        body: 'A smooth wall is simpler to feather than a heavy texture or old plaster. Matching is the skill and the time.',
      },
      {
        title: 'Whether the wall is wet',
        body: 'Paint over a dry repair is this scope. Cutting out wet drywall, drying the cavity, and then painting is a restoration plus this finish. We do not hide the first inside the second.',
      },
    ],
    ranges: [
      { label: 'A drywall patch and paint blend', range: '$300 to $900' },
      { label: 'One room, walls', range: '$450 to $1,400' },
      { label: 'Several rooms after a remodel', range: '$2,000 to $6,000' },
      { label: 'Interior walls of a typical house', range: '$3,500 to $9,000' },
    ],
    rangeNote: rangeNote('interior painting and drywall repair'),
    insurance: {
      heading: 'Paint is not the documentation.',
      paragraphs: [
        'If the wall is being repaired after a leak, the photos that matter were taken when it was wet and when it was opened. The paint is the last visible step. We can include the repair in the scope you share with your insurer. The color you pick is not a coverage question.',
        notAPublicAdjuster,
      ],
    },
    faqs: [
      {
        q: 'What does drywall repair and painting typically cost in Houston?',
        a: 'A patch and a paint blend often plan at $300 to $900. One room of walls often plans at $450 to $1,400. Several rooms after a remodel often plan at $2,000 to $6,000. Interior walls of a typical house often plan at $3,500 to $9,000. Texture, plaster, and tall ceilings move the number. These are typical planning ranges, not a quote.',
      },
      {
        q: 'Can you match texture in an older house?',
        a: 'Yes. Heights, Bellaire, and West University walls are often textured or partly plaster. We feather and texture so the paint has one surface. A smooth patch in a textured wall is the mistake we are there to avoid.',
      },
      {
        q: 'Will you paint a wall that was wet?',
        a: 'After it is dry, and after the wet board is gone. We meter. Paint over damp drywall blisters, and in this humidity it does not get a second chance to dry behind the film. If the dry-out is not done, that is the first scope.',
      },
      {
        q: 'Do I need a permit or HOA approval to paint inside?',
        a: 'Interior painting and drywall repair are finishes. They almost never need a city permit, and an HOA does not review the color inside the house. Exterior color can be an HOA review in a master-planned community. This page is the interior work.',
      },
    ],
  },
};
