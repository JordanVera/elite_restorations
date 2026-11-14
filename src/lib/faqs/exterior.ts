import { assertFaqMap, type Faq } from "@/lib/faqs/types";

const phone = "(713) 909-0034";

export const exteriorFaqs: Record<string, Faq[]> = {
  roofing: [
    {
      q: "How can I tell hail hit the roof without climbing up?",
      a: "Look at the marks you can see from the ground. Dented gutters, bruised window screens, and a neighbor's car with pits are clues. Granules in the downspout are a clue too. They are not a verdict. Stay off the roof. We inspect the shingles and say what we actually find.",
    },
    {
      q: "Do I need to be home for a roof inspection?",
      a: "Someone should let us into the yard and be reachable. You do not have to stand in the driveway the whole time. Tell us about dogs, locked gates, and which side of the house is leaking. If the attic is part of the story, we need a way inside.",
    },
    {
      q: "How fast can you come look at a leaking roof?",
      a: `Call ${phone}. If water is coming in, we answer any time and tell you the next safe step. We do not climb during lightning or unsafe wind. After a storm that hits the whole city, the line is longer. Calling puts you on it. The website form asks for a callback. It does not hold a truck.`,
    },
    {
      q: "Will insurance pay for a repair instead of a whole new roof?",
      a: "That is your insurer's decision, and it depends on the policy and what the roof shows. We do not promise approval or a payout. We photograph the damage, meet the adjuster if you want us there, and price the repair or the replacement as construction. Those are different numbers.",
    },
    {
      q: "Where do I find my wind or hail deductible?",
      a: "On the declarations page, or ask the agent who sold the policy. Many Texas wind and hail deductibles are a percentage of the insured value, separate from the flat deductible for other losses. We do not have that number, and we do not waive it.",
    },
    {
      q: "Should I sign with the first roofer who knocks after hail?",
      a: "No. A storm brings door-knockers. Take photos, call your insurer if you are filing, and get a written look at your roof before you sign. We work for the owner who hires us. We are not public adjusters, and we do not negotiate the claim for a fee.",
    },
    {
      q: "Can you repair a roof during hurricane season?",
      a: "Yes, when the weather lets us work. Hurricane season is June 1 through November 30. If a storm is close, we cover an opening instead of leaving wood bare. A repair that needs dry shingles waits for a dry day. We say which one the forecast allows.",
    },
    {
      q: "What if the HOA has to approve the shingles?",
      a: "Then we wait. Cinco Ranch, The Woodlands, Sienna, and a lot of Houston-area sections review color and profile. That review is not the city permit. A full replacement in the City of Houston is typically permitted on its own track. We do not order a color an association has already rejected.",
    },
  ],
  "roof-replacement": [
    {
      q: "How long does the roof replacement itself take?",
      a: "Once the materials are on site and the weather holds, a straightforward one-story shingle roof is often a day or two on the house. Steep roofs, bad wood, rain, a permit, or an HOA color review add time before that day. We put the sequence in the estimate. We do not lock a calendar date on this page.",
    },
    {
      q: "Do I need to be home the day of the tear-off?",
      a: "Someone should be reachable, and we need access to power and to the yard. You do not have to watch from the driveway. Cars should be out of the driveway. Tell us about pets. If you will be at work, we call when the roof is dried in.",
    },
    {
      q: "What if it rains while the old roof is off?",
      a: "We watch the forecast and we do not strip a roof into a storm we can see coming. If weather turns, we dry the roof in and cover it before we leave. Hurricane season makes that call more often. A covered roof is not a finished roof.",
    },
    {
      q: "Does the City of Houston require a permit for a new roof?",
      a: "A full replacement in the City of Houston is typically permitted. A small repair often is not. Bellaire, West University Place, the Memorial villages, Sugar Land, Pearland, and the county on a Katy or Woodlands lot have their own offices. We match the permit to the legal address.",
    },
    {
      q: "Can you start before the HOA approves the color?",
      a: "No, when the association has to approve it. Starting early is how a new roof gets rejected. We ask before we order. Interior work is different. A roof is the thing the street sees.",
    },
    {
      q: "Will you waive my deductible?",
      a: "No. We do not waive, rebate, or pay your deductible. That number is between you and your insurer. Our price is the cost of the roof. The claim payment, if there is one, is a separate decision. Anyone who offers to cover the deductible is a reason to slow down.",
    },
    {
      q: "How long do shingles last in Houston heat?",
      a: "It depends on the product, the attic ventilation, and the sun on that slope. Heat and humidity age a roof faster than a mild climate. We do not promise a year count. We look at the roof you have and say whether it can be repaired or it needs to come off.",
    },
    {
      q: "Can we stay in the house while the roof is replaced?",
      a: "Most families do. Expect noise, nails, and a day when the house shakes. Inside ceilings that are already wet are a different problem. We dry those. We do not replace a roof over an active leak and call the inside finished.",
    },
  ],
  "roofing-emergency-tarp-repair": [
    {
      q: "How fast can a tarp go on after I call?",
      a: `Call ${phone} and say whether water is still coming in. If it is safe to be on the roof, we schedule the cover. Lightning and high wind mean we wait. After a citywide storm, crews work in order. We tell you the next safe step. We do not promise a minute count.`,
    },
    {
      q: "Do I need to be home when the tarp crew arrives?",
      a: "Someone needs to give us access to the yard and a way to reach the owner. You do not have to climb, and you should not. A property manager can meet us. Tell us about gates, dogs, and which room is wet so we are not guessing from the street.",
    },
    {
      q: "How long can a tarp stay on a Houston roof?",
      a: "Long enough to get a real repair planned, not all summer if we can help it. Sun, wind, and hurricane-season rain work a tarp loose. We check the fastening and we tell you when it is time to repair or replace. A tarp is time. It is not the new roof.",
    },
    {
      q: "Does a tarp count as the insurance repair?",
      a: "No. It limits more water while you and your insurer sort the claim. Many policies expect you to limit further damage. That is not a promise you will be paid back. We photograph the opening before we cover it, when that is safe. Your insurer decides the claim.",
    },
    {
      q: "Who is expected to pay for the tarp?",
      a: "You hire us, so the tarp is a construction bill unless your insurer later includes it. We do not know that in advance, and we do not promise it. A single opening on a walkable roof often plans from a few hundred dollars to about $2,000. That is a range, not a quote.",
    },
    {
      q: "The ceiling is stained, but I cannot see a hole. Do I still need a cover?",
      a: "Maybe. A stain can be an old leak, a flashing problem, or water that traveled from an opening you cannot see from the yard. Stay off the roof. We look and say whether a tarp helps or the leak is somewhere else. Call if the stain is growing.",
    },
    {
      q: "Can you tarp a steep or two-story roof?",
      a: "When it is safe to tie off and work. Steep roofs and second stories take longer and cost more than a low ranch. If the wind makes it unsafe, we say so and we come back. We do not climb to prove a point.",
    },
    {
      q: "What should I do tonight if you cannot climb until morning?",
      a: "Stay out of a room with a sagging ceiling. Catch drips in a bucket if you can do it without standing in water near power. Photograph what you can from inside. Do not nail a plastic sheet from the attic if you cannot see the deck. Call us back if the ceiling drops.",
    },
  ],
  siding: [
    {
      q: "Do I need to be home for a siding repair?",
      a: "Someone should walk the wall with us at the start and be reachable. You do not have to watch the whole day. If an HOA color is involved, that decision should be made before we order boards. Dogs and side gates matter on a narrow lot.",
    },
    {
      q: "How long does siding replacement take?",
      a: "A few damaged courses are often a day once the material matches. A whole elevation, wet sheathing, or a wall that has to dry takes longer. We tell you after we open a spot. We do not invent a week count from the street.",
    },
    {
      q: "Does the City of Houston require a permit for new siding?",
      a: "New siding on a whole house can. A small repair often does not. Bellaire, West University Place, Sugar Land, Pearland, and the counties that cover much of Katy and The Woodlands are different counters. We check the address.",
    },
    {
      q: "Will an HOA review the siding color?",
      a: "Often, yes, when the association reviews exteriors. That approval is not the building permit. We wait for a required review before we order a color the street will see. Interior paint is a different question.",
    },
    {
      q: "Can rain get behind siding that still looks fine?",
      a: "Yes. Wind-driven rain finds failed flashing, open laps, and a soft bottom row. The paint can look decent while the wall behind it is wet. If an interior wall is staining, tell us. The leak may be the roof, the window, or the siding.",
    },
    {
      q: "Should siding come off when the roof is replaced?",
      a: "Only if the wall needs it. A roof and a siding job can share a week and still be two prices. We do not replace a sound wall because the shingles are coming off. If the step flashing is the failure, both trades meet at that joint.",
    },
    {
      q: "What if the wall behind the siding is wet?",
      a: "Then we dry it before we close it. Covering wet sheathing traps the water. Houston humidity will not fix that. Photos of the wet wall can go in the record you share with your insurer. We do not decide the claim.",
    },
    {
      q: "How fast can you cover an open wall?",
      a: `Call ${phone} if the storm opened the wall. Board-up is the temporary cover. Siding is the finished wall. We do the cover when it is safe, then talk about the repair. We do not climb or hang boards in lightning.`,
    },
  ],
  "patios-decks": [
    {
      q: "Do I need to be home while a deck or patio is built?",
      a: "Yes for the layout, so the stair and the door land where you will actually walk. After that, someone needs to give us yard access. You do not have to watch every board. Tell us about sprinklers, dogs, and a neighbor's fence.",
    },
    {
      q: "How long does a patio or deck take?",
      a: "It depends on the size, the concrete schedule, and whether a cover or a rail is included. A simple pad and a framed deck are different weeks. Permits and an HOA review can sit in front of the build. We put the sequence in the estimate.",
    },
    {
      q: "Will Houston clay and rain change the plan?",
      a: "They should. Clay holds water, and a patio that slopes toward the slab will. We set the fall away from the house. A deck post in a wet hole needs a detail that is not a catalog photo from a dry climate. We look at the yard you have.",
    },
    {
      q: "Is an HOA review different from a city permit?",
      a: "Yes. An association may care about a cover, a rail, or a stain even when the city does not, and the city may require a permit for an attached deck when the HOA is silent. We check the address. We do not start work a review has to approve.",
    },
    {
      q: "Can we use the yard during the build?",
      a: "Part of it, if we can keep a safe path. Concrete, open joists, and tools are not a play area. We say which days the back door should stay closed. A pool deck in use is scheduled around that, not through it.",
    },
    {
      q: "What if one storm hit the deck and the roof?",
      a: "They can be the same week and still two jobs. We photograph both and we do not fold a rotten deck into a roof claim to make the story easier. Your insurer decides coverage. We help document what we can see and we repair what you hire.",
    },
    {
      q: "Do you build gazebos on this page?",
      a: "This page is the overview for patios and decks. Gazebos, ground-level patios, and framed decks each have their own page so the jobs stay clear. Call and tell us which one is in the yard. We will send you to the right conversation.",
    },
    {
      q: "How do I ask for a yard visit?",
      a: `Call or text ${phone}. Scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM. If a storm just opened the house, say that first. The office is 511 Crestwater Ct, Houston, TX 77082.`,
    },
  ],
  "painting-drywall-repair": [
    {
      q: "Do I need to be home while you paint?",
      a: "Someone should confirm the color and let us in. You do not have to stay for every coat. Pets should be out of the room. If you are sensitive to paint smell, tell us which rooms you need that night. We leave a path through the house when we can.",
    },
    {
      q: "How long before furniture can come back?",
      a: "When the paint is dry to the touch is not always when it is ready for a bookcase. We tell you the wait for the product we used. Houston humidity slows some paints. Dragging a sofa across a soft wall is how the repair shows up again.",
    },
    {
      q: "Can you paint on a humid Houston day?",
      a: "Interior paint, yes, if the wall is dry and the house is conditioned. We do not paint a damp stain to hide it. Exterior paint waits on weather. Hurricane-season rain is a reason to pause an outside wall, not a reason to trap water in it.",
    },
    {
      q: "What if the stain is from a leak that is still wet?",
      a: "We do not paint it yet. The leak stops, the wall dries, and the moisture readings have to support closing it. Paint over a wet patch comes back. If this started as water damage, drying is the first trade.",
    },
    {
      q: "Do you paint the outside of the house?",
      a: "This page is interior paint and drywall repair, the finish after a remodel or a patch. Exterior siding and paint on the street are a different job, and an HOA may review that color. Ask us which one you need so we do not mix them.",
    },
    {
      q: "Will new paint match a sun-faded wall?",
      a: "A small patch often needs paint carried far enough to blend. A south-facing wall that has faded will not match a fresh quart in the middle of the room. We say when the honest fix is the whole wall. Texture has to blend first or the paint will outline the patch.",
    },
    {
      q: "Is a permit needed for interior paint?",
      a: "Paint and a small drywall patch usually are not. Rebuilding a wall that was opened for a plumbing repair can sit next to a permit that belongs to the plumbing. We do not pull a permit for a color change.",
    },
    {
      q: "Can paint close both a remodel and a dry-out?",
      a: "Yes, when the wall is ready. A kitchen remodel and a water repair can both end in paint. The dry-out has to finish first. We do not use paint to skip a wet wall. Color is the last visible step, not the drying method.",
    },
  ],
};

assertFaqMap(exteriorFaqs);
