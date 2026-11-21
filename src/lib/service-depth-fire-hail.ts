import { notAPublicAdjuster, rangeNote } from "@/lib/service-depth-shared";
import type { ServiceDepth } from "@/lib/service-depth-types";

const fireLinks = [
  { href: "/what-to-do-after-a-fire-your-first-5-steps", label: "What to do after a fire" },
  { href: "/emergency-board-up", label: "Emergency board-up" },
  { href: "/water-damage-restoration", label: "Drying after firefighting water" },
  { href: "/insurance-log", label: "Open the insurance photo log" },
];

const hailLinks = [
  { href: "/hail-damage-vs-normal-wear-houston-roof", label: "Hail damage vs normal wear" },
  { href: "/storm-and-hail-roof-repair-houston", label: "Storm and hail roof repair in Houston" },
  { href: "/houston-hail-storm-roof-claims", label: "Hail, storm roofs, and insurance claims" },
  { href: "/roof-replacement-cost-houston", label: "What changes a roof replacement cost" },
  { href: "/gutters", label: "Gutters" },
  { href: "/siding", label: "Siding" },
];

export const fireHailDepth: Record<string, ServiceDepth> = {
  "fire-damage-restoration": {
    moreIntro: [
      "A Houston fire loss is usually three problems at once: an opening the weather can use, soot on surfaces that should not hold it, and water the fire department put into the walls. The air outside is often too wet to dry that water. We secure the building, clean what can be saved, and dry the structure before we rebuild it.",
      "Cleaning and the rebuild can stay with one team. The first question is still whether the fire department has said the building is safe to enter. After that, soot and standing water have a shorter clock than the paperwork.",
    ],
    moreLocal: [
      "On a slab in Spring Branch, Westchase, or Katy, hose water runs under the flooring and up the drywall. Cabinet particle board at a burned kitchen swells and does not return to size. In a two-story house the same water stains the ceiling below, and the stain is not always under the room that burned. Many older Heights houses are pier-and-beam, so water can drop into a crawl space and still wick into the floor. Smoke finds closets and the attic even when the flame stayed in one room. We look past the char you can see.",
    ],
    factorsHeading: "Soot, hose water, and a climate that stays wet.",
    factorsIntro:
      "The neighborhood changes the house. It does not change the order: stay out until it is safe, close the openings, clean the soot, dry the water, then rebuild.",
    factors: [
      {
        title: "Soot is acidic",
        body: "Metal hardware, stone, and finished wood lose surface the longer the film sits. A wipe with a household cleaner can drive it into the finish. We clean what can be saved and we remove what the soot has already ruined.",
      },
      {
        title: "The water is part of the fire",
        body: "Firefighting water soaks insulation, drywall, and floors. It is not a separate mystery leak. We meter it and dry it. A later rain through an uncovered opening is a different fact, and we write it that way.",
      },
      {
        title: "Odor hides in porous material",
        body: "Paint can look clean while the paper on the back of the drywall, the insulation, and the inside of a cabinet still hold smoke. If the air handler ran during the fire, the ducts may be part of the smell. We say what we can clean and what has to come out.",
      },
      {
        title: "Humidity slows the dry-out",
        body: "Opening the windows in a Houston summer often adds moisture. Dehumidifiers and air movers stay until the readings say the structure is dry. We do not close a wall because the room looks finished.",
      },
    ],
    process: [
      {
        title: "Confirm the building is released",
        body: "We do not start inside a house the fire department has not cleared. If utilities are off, we work with that. If a ceiling is sagging, we say so before anyone walks under it.",
      },
      {
        title: "Document",
        body: "Photos of char, soot, broken openings, and wet rooms, before debris is discarded. Belongings that will be thrown away are photographed first when that is safe.",
      },
      {
        title: "Secure",
        body: "Board-up on windows and doors. A tarp on a roof opening when the roof can be walked. The cover is temporary. It is how the next storm stays outside.",
      },
      {
        title: "Clean",
        body: "Soot and smoke residue come off surfaces that can be saved. Charred drywall and finishes that will not clean come out. Odor treatment follows what is still in the room, not a spray in the doorway.",
      },
      {
        title: "Dry",
        body: "Standing water from the hoses comes out. Wet insulation comes out. Air movers and dehumidifiers run until the readings support the next step.",
      },
      {
        title: "Rebuild",
        body: "Drywall, flooring, cabinets, and paint go back when the structure is dry. A new layout, if you want one, is written as its own scope. The same company can do the work.",
      },
    ],
    signsHeading: "Signs the fire went farther than the burned room.",
    signs: [
      {
        title: "Soot in closets and on the ceilings down the hall",
        body: "Smoke moves. A clean-looking bedroom can still hold film on the top of the door trim and inside the closet. We look there before we call the loss one wall.",
      },
      {
        title: "A smell that returns when the air runs",
        body: "That often means the ducts, the insulation, or a cabinet box, not the paint you can see. We trace it. We do not promise a scent will never return.",
      },
      {
        title: "Soft flooring after the fire is out",
        body: "On a slab that usually means hose water under the floor. Laminate swells at the joints. We meter before we decide what comes up.",
      },
      {
        title: "Daylight or a door that will not lock",
        body: "The building is open. Board-up or a tarp comes before a conversation about cabinets. Houston rain will use that opening.",
      },
    ],
    materialsHeading: "What gets cleaned, what gets removed, what gets rebuilt.",
    materialsIntro:
      "The materials follow the room. Some surfaces clean. Some hold soot or water and have to come out. The finishes that go back are what the room had, or the finishes you choose if the loss becomes a remodel.",
    materials: [
      {
        title: "Stone, metal, and solid wood",
        body: "These often clean if we reach them before the soot sits. Finished wood can still etch. We test a small area and we say when the piece is already lost.",
      },
      {
        title: "Drywall and insulation",
        body: "Charred board comes out. Wet insulation comes out. The cavity is dried, then new board, tape, texture, and paint. Paint is not the cleaning step.",
      },
      {
        title: "Cabinets and floors",
        body: "A swollen particle-board box usually cannot be dried back to size. A plywood box sometimes can. Cupped wood may flatten, and it may not. We decide from the readings and from what the fire actually did.",
      },
      {
        title: "Covers for the openings",
        body: "Plywood on a window or a door, and a tarp on a roof, are temporary. Glass, a door, and a finished roof are the permanent work, priced as that work.",
      },
    ],
    costHeading: "What fire restoration tends to cost.",
    costIntro: [
      "The range is wide because a contained kitchen fire and a house that is open to the weather are not the same loss. How far the smoke went, how much water the hoses left, and whether floors and cabinets have to be rebuilt are the drivers. These are typical planning ranges, not a quote, and not a prediction of what an insurer will pay.",
      "Board-up is priced as board-up. Drying is priced as drying. The rebuild is priced as construction. We itemize them after we are in the building.",
    ],
    costFactors: [
      {
        title: "The burned area",
        body: "One wall of char is the small end. Several rooms, a hallway, and a roof opening are the large end. Smoke in between is its own line once we see how far it traveled.",
      },
      {
        title: "Time",
        body: "Soot that sits, and water that sits through a Houston weekend, become more demolition. Calling after the fire department releases the house limits that.",
      },
      {
        title: "The rebuild you want",
        body: "Putting the same kitchen back is one scope. Moving the layout is another. We can talk about both. We do not start the new layout on a wet slab.",
      },
    ],
    ranges: [
      { label: "Board-up of a ground-floor opening", range: "A few hundred dollars to about $1,500" },
      { label: "Drying firefighting water, one or several rooms", range: "$1,800 to $14,000" },
      { label: "Smoke cleaning plus a partial interior rebuild", range: "Priced after the walk-through" },
    ],
    rangeNote: rangeNote("fire and smoke restoration"),
    insurance: {
      heading: "Photos of the loss, and a repair that is still a repair.",
      paragraphs: [
        "Call your insurer when you reasonably can and ask how they want the loss reported. Write down the claim number. We photograph the building, the cleaning, the drying, and the repairs. Coverage, the deductible, and the amount are in your policy. We do not know your form.",
        "Steps that limit more damage, including board-up and drying, should not wait on a coverage decision. The rebuild can wait until the scope is clearer. A fire and the rain that comes through an opening left uncovered are worth keeping distinct in the notes.",
        notAPublicAdjuster,
      ],
      links: fireLinks,
    },
    faqs: [
      {
        q: "Why does Houston humidity matter after a fire?",
        a: "Because the water from the hoses is sitting in a climate that does not dry a wall on its own. Soot also stays damp on metal and stone. Dehumidification is part of the job. Open windows are not a substitute in July.",
      },
      {
        q: "Do you clean the ducts after smoke?",
        a: "We look at whether the system ran and whether the smell is in the supply. If the ducts are part of the odor, we say so and we scope that cleaning separately from wiping a wall. We do not promise the smell is gone because a register was wiped.",
      },
      {
        q: "What is the difference between soot on the walls and soot in the insulation?",
        a: "Soot on a hard surface can often be cleaned. Soot driven into insulation and into the paper on the back of the drywall usually means that material comes out. Sealing it in is how the odor stays in the room.",
      },
      {
        q: "When can new drywall go up?",
        a: "When the cavity is dry and the charred material that has to leave is gone. We use moisture readings, not a calendar. Paint and floors follow that drywall. They do not lead it.",
      },
    ],
  },
  "hail-damage-roof-repair": {
    moreIntro: [
      "A Houston hailstorm can bruise a roof that still looks even from the yard. The useful first day is simple: keep more water out if the roof is open, photograph what you can see from the ground, and have the slopes inspected when it is safe to be up there. We do that inspection. Your insurer decides the claim.",
      "Repair and replacement are both honest answers. The roof in front of us picks which one. Gutters, siding, and the rooms under a leak are part of the same storm, written as their own lines.",
    ],
    moreLocal: [
      "Spring hail is a Harris County fact, separate from hurricane season. Northwest neighborhoods such as Cypress, Tomball, and Spring see a lot of these storms, and so do Kingwood, Oak Forest, Katy, and The Woodlands. A low ranch roof is easy to misread from the street. A cut-up Memorial or Bellaire roof has more valleys and more metal. We look at the slopes that faced the storm. Clay soil and a hard rain after the hail still want the gutters to carry water away from the slab, not into the flower bed against the brick.",
    ],
    factorsHeading: "Hail, wear, and the deductible that is not a pipe leak.",
    factorsIntro:
      "The house changes the roof. It does not change the order: stay off a wet roof, photograph, inspect, then repair or replace.",
    factors: [
      {
        title: "Bruises versus a bald mat",
        body: "Hail knocks granules off in spots that often show up together across a slope, and it dents soft metal the same afternoon. Age thins granules on the south and west over years, curls tabs, and dries out collars. Both can be on one roof. We describe both.",
      },
      {
        title: "Wind opens the house",
        body: "A bruise does not always leak. Lifted tabs and rain driven at a valley do. If the ceiling is wet, the opening is the emergency. The hail marks are still documented. They are not a reason to skip the tarp when the deck is open.",
      },
      {
        title: "Spring, then hurricane season",
        body: "Hail clusters in the spring. Hurricane season runs June 1 through November 30 and is mostly wind and rain. Many Texas policies treat wind and hail under a deductible that is a percentage of the dwelling limit, different from a plumbing leak. Ask your insurer which one applies. We price the roof. We do not calculate your payout.",
      },
      {
        title: "Gutters and the slab",
        body: "Dented gutters are evidence and a drainage problem. A run that overflows next to the foundation keeps the slab edge wet. We fix the stretch the storm damaged. We do not call leaf debris a hail claim.",
      },
    ],
    process: [
      {
        title: "Hear what you can see",
        body: "You tell us about dents, a limb, a stain, or water coming in. If water is coming in, that leads. If the roof is closed, we schedule the inspection for a day we can be on it safely.",
      },
      {
        title: "Inspect",
        body: "Shingles, flashing, boots, valleys, gutters, and siding on the slopes that faced the storm. The attic if there is a stain. We do not climb in lightning.",
      },
      {
        title: "Document",
        body: "Photos of bruises, lifted edges, dented metal, and any wet rooms, before a repair covers them. You can start the interior with the photo log. We photograph the slopes you cannot see from the driveway.",
      },
      {
        title: "Protect",
        body: "A tarp if the wood is open to weather and the roof is safe. A board-up if the hail or the wind broke glass. Temporary covers are not the new roof.",
      },
      {
        title: "Choose the roof",
        body: "Repair when the damage is limited and the mat still has life. Replacement when it does not, including tear-off and the layer under the shingles. We say which one after the inspection.",
      },
      {
        title: "Gutters, siding, and the dry-out",
        body: "Damaged gutters and siding are priced with the storm and installed in an order that does not wreck a new roof. Wet rooms are dried before paint goes back.",
      },
    ],
    signsHeading: "Signs worth a roof inspection, not a climb.",
    signs: [
      {
        title: "Dented gutters and caps",
        body: "New dents in metal that faces the sky are the clue you can see from the yard. They mean hail fell. They do not, alone, mean the shingles are done.",
      },
      {
        title: "Granules in the downspout",
        body: "Fresh granules are a clue that the coating took a hit or that the roof is aging. The pattern on the shingles and on the metal nearby is what gets compared.",
      },
      {
        title: "A stain that showed up after the storm",
        body: "The ceiling is the last place the water appears. The opening may be a lifted tab, a valley, or a collar. The paint is the last step, after the roof is closed and the cavity is dry.",
      },
      {
        title: "Cracked siding or a broken skylight",
        body: "Hail hits more than shingles. A cracked light, a bruised screen, or split siding belongs in the same photo set as the roof.",
      },
    ],
    materialsHeading: "Shingles, metal, gutters, and the walls beside them.",
    materialsIntro:
      "The roof system is the shingles or the metal you see, plus the layer beneath, the joints, and the vents. Gutters and siding are the pieces the same storm often marks. We do not treat them as one bundled mystery.",
    materials: [
      {
        title: "Asphalt shingles",
        body: "Architectural asphalt is the common Houston roof. A repair uses shingles that fit the exposure. They may not disappear into a slope the sun has already faded. A replacement is a tear-off, not another layer on a tired mat, when the roof needs to come off.",
      },
      {
        title: "Metal, tile, and composite",
        body: "These are different installations and different ways a dent or a crack shows. The structure has to carry the material if the roof is replaced. We compare them for the house you have.",
      },
      {
        title: "Underlayment and flashing",
        body: "Valleys, vent-pipe collars, and step flashing are where wind-driven rain gets in after hail bruises the field. They are part of a replacement, and they are part of a repair when they are the actual leak.",
      },
      {
        title: "Gutters and siding",
        body: "Aluminum gutters in a size that matches the roof, hung on a sound board. Siding sections matched to the profile that is still made. A soft board behind a gutter is wood repair, not a new trough on rotten wood.",
      },
    ],
    costHeading: "What hail roof work tends to cost.",
    costIntro: [
      "A limited repair and a full replacement are not the same number, and neither one is your deductible. The published planning ranges for a Houston roof replacement are about $12,000 to $24,000 for architectural asphalt, and about $20,000 to $45,000 for metal, tile, or composite. Board repairs found after tear-off often plan around $500 to $2,000 when they show up. A smaller hail repair is priced after we see the slopes. Gutters and siding are extra lines.",
      "These are typical planning ranges, not a quote, and not a prediction of what an insurer will pay. Wind and hail deductibles on many Texas policies are a percentage of the dwelling limit. We do not know yours.",
    ],
    costFactors: [
      {
        title: "Repair or replacement",
        body: "A handful of shingles and a collar is the small end. A roof that is bruised across the slopes is the replacement end. The inspection picks the row. The curb does not.",
      },
      {
        title: "Height and shape",
        body: "A one-story ranch and a steep two-story with dormers are different days. Valleys and stories add time. They also add places water gets in.",
      },
      {
        title: "The rest of the exterior",
        body: "Gutters, siding, a skylight, and a wet ceiling are real costs. They are priced when they are part of this storm, not hidden inside a roof number.",
      },
    ],
    ranges: [
      { label: "Limited hail repair on a roof we can walk", range: "Priced after the inspection" },
      { label: "Architectural asphalt replacement", range: "$12,000 to $24,000" },
      { label: "Metal, tile, or composite replacement", range: "$20,000 to $45,000" },
    ],
    rangeNote: rangeNote("hail and storm roof repair"),
    insurance: {
      heading: "A roof file your adjuster can walk.",
      paragraphs: [
        "Photograph the ground-level clues and the interior stains, and note the storm date. We photograph the slopes and meet the adjuster on site when you want us there. We send our estimate to your insurance company for approval and work through it with the adjuster. Whether the marks are hail or wear is your insurer's decision. We do not promise approval.",
        "Do not sign with the first person who knocks. Do not start a permanent repair that hides the slope before the adjuster has seen it, unless the house will get worse if it stays open. If a tarp has to go on, the photos come first. Keep the receipts for temporary protection.",
        notAPublicAdjuster,
      ],
      links: hailLinks,
    },
    faqs: [
      {
        q: "Why do dents in the gutters matter?",
        a: "They are often the hail mark you can see without a ladder, and they show the storm hit the house. They also mean the gutter may overflow at the next rain. They are not, by themselves, a reason to replace every shingle.",
      },
      {
        q: "How is a spring hailstorm different from a hurricane?",
        a: "Spring hail bruises roofs and metal. A hurricane is more often wind, an open roof, and rain driven inside, and it falls in the June through November season. The damage is documented as what it did. Your insurer decides which deductible applies. We do not swap the names.",
      },
      {
        q: "Can you match shingles on one slope?",
        a: "Sometimes, if that shingle is still made and the surrounding roof has life. Houston sun fades a slope, so a new patch can show. We say when a repair will be visible and when the honest answer is more of the roof.",
      },
      {
        q: "What about skylights and soft metal?",
        a: "Cracked skylights, dented flue caps, and bruised screens go in the photo set with the shingles. They support that hail fell. A skylight that is now open to rain is also a leak, and it gets covered when that is the safe step.",
      },
    ],
  },
};
