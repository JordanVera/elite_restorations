import { assertFaqMap, type Faq } from "@/lib/faqs/types";

const phone = "(713) 909-0034";

export const floorFaqs: Record<string, Faq[]> = {
  "wood-flooring": [
    {
      q: "Do I need to be home while the floor is sanded?",
      a: "Someone should meet us and walk the dust plan. You do not have to stay in the room. Pets should be out. If you work from home, say so. Sanding is loud even when the dust is controlled.",
    },
    {
      q: "How long before rugs can go back down?",
      a: "It depends on the finish. Covering a floor too soon marks it. We tell you the wait for the product we used. Houston humidity can slow a cure. A weekend guest on a floor that was finished Friday is a question to ask before we schedule.",
    },
    {
      q: "What if a leak already cupped the boards?",
      a: "Dry the slab or the crawl space first. New wood on a damp floor cups again. Some cupped boards flatten after a real dry-out. Some do not. We look before we sand or replace. A water loss and a planned refinish are different jobs.",
    },
    {
      q: "Will the gaps come back every summer?",
      a: "Small seasonal gaps can. Houston air is wet outside and dry inside when the air conditioner runs. We install so those gaps stay small. A floor that opens wide usually has a moisture problem under it, not a bad stain.",
    },
    {
      q: "Can you refinish one room and blend the hall?",
      a: "Sometimes. Sun-faded rooms will not match a fresh room perfectly. If the hall is the same species and thick enough, we can often refinish through the doorway so the line is not a stripe. We say when a blend will still show.",
    },
    {
      q: "Does the furniture have to leave?",
      a: "Yes for the rooms we are sanding or installing. We can sometimes work one room at a time so the rest of the house still functions. Appliances and pianos need a plan. Tell us what cannot be moved.",
    },
    {
      q: "Does a wood floor need a permit?",
      a: "The floor itself usually does not. If we are also moving a wall or repairing structure under a pier-and-beam floor, that can. The City of Houston and a county address are not the same office. We say which one applies.",
    },
    {
      q: "Who do I call about a floor?",
      a: `Call or text ${phone}. Office hours for a scheduled visit are Monday through Saturday, 8:00 AM to 6:00 PM, at 511 Crestwater Ct, Houston, TX 77082. If the floor is wet right now, say so. Drying comes before new wood.`,
    },
  ],
  "tile-flooring": [
    {
      q: "Do I need to be home for a tile floor?",
      a: "For the layout, yes. Large tile and a pattern need a starting line you have seen. After that, someone needs to let us in. You do not have to watch every piece. Keep pets out of the thinset.",
    },
    {
      q: "How long before we can walk on new tile?",
      a: "It depends on the thinset and the grout. We tell you when the floor can take foot traffic and when it can take a refrigerator. Walking on it the same afternoon is how grout lines open. Houston humidity does not speed that cure.",
    },
    {
      q: "Can the shower floor and the bathroom floor be one job?",
      a: "Yes. They are still different details. The shower needs a slope and waterproofing. The bath floor needs a flat surface and a transition at the door. We price them so you can see both, not one mystery number.",
    },
    {
      q: "What if the floor is not flat?",
      a: "Large tile needs it flatter than small tile. Leveling is part of the job when the slab or the old floor waves. Skipping it is how a corner of a big tile sits proud and cracks. We say so before we order the tile.",
    },
    {
      q: "Does kitchen grout need a sealer here?",
      a: "Many cement grouts do, especially where you cook and mop. Houston humidity and a splash of oil find an unsealed joint. We tell you what the grout we used wants. Sealing is not a promise that grout never stains.",
    },
    {
      q: "Can you match tile after a leak repair?",
      a: "Only if that tile is still made, or you have leftovers. A wet slab under the tile is the first problem. We dry and remove what has to come out, then talk about a match or a planned border. Your insurer decides any claim payment.",
    },
    {
      q: "Is a permit required to tile a floor?",
      a: "Floor tile in a dry room usually is not. A shower pan, a moved toilet, or a new drain usually is. We keep the finish and the plumbing separate so the permit, when there is one, matches the address.",
    },
    {
      q: "Will the clay soil crack a new tile floor?",
      a: "Houston clay moves, and slabs move with it. The right joints and a proper set lower the risk. We cannot promise a slab will never shift. A crack that follows a foundation joint is a different repair from a bad install.",
    },
  ],
  "vinyl-flooring": [
    {
      q: "Is vinyl a safer choice than wood where water shows up?",
      a: "Often, in a kitchen, a laundry, or a playroom. It is still not a shower floor. A product labeled water-resistant is not the same as a tile pan. If the room has flooded before, tell us. Standing water finds the seams.",
    },
    {
      q: "Do I need to move out for a vinyl floor?",
      a: "No, if we can work room by room and you have a path through the house. The rooms we are installing need to be empty. Furniture goes back when the floor is ready to take it. We say which day that is.",
    },
    {
      q: "How long does a vinyl install take?",
      a: "A single room on a flat slab is often a day. A whole house, stairs, or a floor that needs leveling takes longer. We look before we promise a day. Glue-down and click-lock are different schedules.",
    },
    {
      q: "Will vinyl hide a wavy Houston slab?",
      a: "No. What you feel under carpet you will see under vinyl, sometimes more. Leveling is the honest fix. A thick pad is not a substitute. We walk the floor with you and mark the dips.",
    },
    {
      q: "Can it go in a laundry that has leaked?",
      a: "After the leak is fixed and the slab is dry, a vinyl made for that room can. Putting it over a damp slab traps the water. We meter first. The washer hoses are worth replacing while the room is empty.",
    },
    {
      q: "Do I need to be home?",
      a: "At the start, yes, so we confirm the rooms and the transitions. If you leave for work, we need a way in and a way to reach you. Dogs and a locked side gate should be part of that conversation.",
    },
    {
      q: "What if water sits on the new floor?",
      a: "Wipe it up. Vinyl handles a spill better than wood and worse than a rumor. Water that sits at a seam or runs under a loose edge can still swell the core. Call us if a leak, not a mop, is the source.",
    },
    {
      q: "Does vinyl flooring need a permit?",
      a: "The floor finish usually does not. If the job is really a wet subfloor from a plumbing break, the drying and any plumbing repair follow their own rules. We do not treat a click-lock floor as a building permit.",
    },
  ],
  "laminate-flooring": [
    {
      q: "Can laminate survive a burst pipe?",
      a: "Usually no. Most laminate swells when water reaches the core, and it does not go back. A small spill you wipe up is different from water under the floor. After a leak we look at the seams before anyone talks about a new floor.",
    },
    {
      q: "Do I need to be home during the install?",
      a: "Someone should walk the layout with us, especially where the floor meets tile or stairs. You can leave after that if we can secure the house. The rooms have to be empty of furniture.",
    },
    {
      q: "How long is a laminate install?",
      a: "A bedroom and a hall on a flat floor are often a day. A whole first floor, with door trims and a slab that needs prep, is longer. We tell you after we see it. The floor should acclimate in the house, not in a hot garage.",
    },
    {
      q: "Can laminate go on a concrete slab?",
      a: "Yes, when the slab is dry and the underlayment matches the product. A slab that just had a leak is not ready. We check moisture first. Bathrooms and other wet rooms are usually the wrong place for laminate.",
    },
    {
      q: "Should I use laminate in a Houston bathroom?",
      a: "We will tell you not to. Steam and a splash at the tub swell the joints. Tile is the floor for that room. Laminate belongs in bedrooms, halls, and living rooms that stay dry.",
    },
    {
      q: "Will humidity swell the joints?",
      a: "A closed, air-conditioned house is what the floor expects. A room left open to Gulf air, or a wet closet, can swell the edges. We leave the expansion space the product asks for so a normal summer does not buckle it.",
    },
    {
      q: "Can you replace one swollen seam?",
      a: "Sometimes, if we can lift that run and the same product is still available. A seam that swelled from underneath often means more of the floor is wet. We look past the one ugly board before we patch it.",
    },
    {
      q: "Do the rooms need to be empty?",
      a: "Yes. Laminate needs a clear path and a place to stack the boxes while they adjust to the house. We can stage one area at a time. Pianos, safes, and built-in bookcases need a plan before the day starts.",
    },
  ],
};

assertFaqMap(floorFaqs);
