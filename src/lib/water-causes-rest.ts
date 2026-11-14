import type { GuideSection } from "@/lib/guides/types";
import type { Img } from "@/lib/images";
import { dryOut, rooms } from "@/lib/topic-photos";

const phone = "(713) 909-0034";
const note =
  "We photograph the damage and do the work you hire. Your insurer decides coverage. We are not public adjusters and we do not give legal advice.";

type Cause = {
  slug: string;
  path: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  title: readonly string[];
  lede: string;
  hubHeading: string;
  hubBody: string;
  firstSteps: string;
  drying: string;
  claim: string;
  sections: readonly GuideSection[];
  faqs: readonly { q: string; a: string }[];
  image: Img;
};

function page(input: Omit<Cause, "path"> & { image?: Img }): Cause {
  return {
    ...input,
    path: `/${input.slug}`,
    image: input.image ?? dryOut,
  };
}

export const moreWaterCauses: readonly Cause[] = [
  page({
    slug: "water-heater-leak-damage-houston",
    metaTitle: "Water Heater Leak in Houston",
    description:
      "Water heater leak damage in Houston: tank and supply failures in homes, apartments, and commercial closets. We dry the building and help you document the claim. Call (713) 909-0034.",
    eyebrow: "Water heater leaks",
    title: ["Houston water heater", "leak damage."],
    lede: "A water heater leak in Houston usually starts in a closet, a garage, or an upstairs closet, then runs across the concrete floor or into the ceiling below. Shut off the water. Turn off the power or the gas only if you know how. Take photos of the closet before you mop.",
    hubHeading: "Water heater leaks",
    hubBody:
      "The tank can fail at the pipes on top, at the relief valve and its discharge pipe, or in the tank itself. On a concrete slab the water stays on the floor. A heater in an upstairs closet can soak the ceiling of the room below.",
    firstSteps:
      "Shut the cold-water valve on top of the heater if it will turn. If it will not, shut off the water to the whole house. Turn off the breaker for an electric heater. If you smell gas, or you are not sure which gas valve is which, leave the house and call.",
    drying:
      "We follow the water out of the closet, across the floor or through the ceiling, remove what is standing, and dry the wet walls and floors. A drain pan that overflowed is not the same job as a tank that split open.",
    claim:
      "A tank that ruptures in a day and a drip at a fitting that has been staining the closet for months are different facts. Many policies care about that difference. Check your policy. We describe what we see, and your insurer picks the label. We cannot promise payment.",
    image: dryOut,
    sections: [
      {
        eyebrow: "First hour",
        heading: "Valve, power, and the pan on the floor.",
        paragraphs: [
          "The cold inlet on top of most tanks has a valve. Turn it clockwise until it stops. Open a hot faucet so pressure can drop. If that valve is stuck with corrosion, use the main. Electric heaters need the breaker off so the tank is not heating while it empties. On a gas heater, turn the gas valve off if you know which one it is and it turns without force. If you smell gas, leave the closet and the house and call the gas utility and " +
            phone +
            ". Never look for the leak with a flame.",
          "A pan under the heater is there to catch a drip and send it to a drain. In a lot of Houston closets the drain was never connected, or it clogs, and the pan becomes a pond that overflows onto the slab. Photograph the pan, the fittings, and the path across the floor before you shop-vac it. Apartment heaters in a stacked closet can wet the unit below even when the pan looks empty by the time you open the door.",
        ],
        points: [
          { title: "Leave the water off", body: "Turning the water back on to see if the leak stopped can fill the ceiling again. Leave it off until someone has looked at the pipes on top of the tank." },
          { title: "Old or new, look at the part", body: "An old tank can fail all at once. A new tank can leak at a supply line. We say which part failed. Replacing the tank is not the same job as drying the room." },
          { title: "Heaters in a business", body: "A water heater in a break room or mechanical room shuts off the same way. Tell us what is stored on the floor so we know what the water reached." },
        ],
      },
      {
        eyebrow: "The path",
        heading: "Closets, garages, and the ceiling underneath.",
        paragraphs: [
          "First-floor heaters in Houston houses often sit in a garage or an interior closet on the concrete slab. Water runs to the lowest spot, which may be the hallway or a bedroom, then soaks into drywall and under vinyl or wood floors. Most of these houses do not have a crawlspace for the water to fall into. Second-floor heaters, common in some two-story plans in Katy, Sugar Land, and The Woodlands, drop water into the kitchen or living-room ceiling. We open a wall or ceiling only where a moisture meter shows it is still wet.",
          "An apartment water heater in a utility closet can wet the hallway and the neighbor below. A property manager should tell us the unit number and whether water is coming down through more than one floor. A wet ceiling is not automatically a roof leak. If the heater closet above is the source, that is what we write down.",
        ],
        points: [
          { title: "Water travels on the floor", body: "Water on a concrete slab does not stay in a puddle by the heater. It can run sideways and wet a wall in the next room." },
          { title: "Relief valve versus a split tank", body: "A relief valve that has been dripping for months is not the same event as a tank that opened this morning. Tell us which one you are seeing." },
          { title: "Floors hide the water", body: "Carpet pad, vinyl, and laminate can hold water against the concrete. We look under the floor at the closet door, not only at the stain you can see." },
        ],
      },
      {
        eyebrow: "Drying",
        heading: "Dry the building. Then talk about a new tank.",
        paragraphs: [
          "We remove what is standing, meter the closet and the rooms it reached, and set air movers and dehumidifiers. Houston humidity makes a fan in the doorway a slow way to dry a wall. The heater itself may need to be replaced. That replacement is plumbing. The drywall and the floor are the building repair. We can coordinate both, and we keep the prices separate so a new tank and a ceiling repair stay labeled as two jobs.",
          "A licensed plumber should restart a gas heater when you are ready for hot water again. We leave the gas to them. Our work is the water that left the heater and the finishes it ruined. Homes, apartments, and small commercial closets are all work we take on. Call " +
            phone +
            " any time if water is still moving. Office hours at 511 Crestwater Ct are Monday through Saturday, 8:00 AM to 6:00 PM.",
        ],
        points: [
          { title: "One company for both steps", body: "Elite Restorations is family-owned in Houston since 1993. Drying the rooms and repairing the drywall and floors can stay with the same crew." },
          { title: "Do not close the wall early", body: "A closet can smell fine and still be wet where the wall meets the floor. We check with a moisture meter before we close it up." },
          { title: "Photograph what was stored there", body: "Boxes in a garage or closet are easy to forget. Take pictures of them before you throw them away." },
        ],
      },
      {
        eyebrow: "Claims",
        heading: "A sudden tank failure is not a slow stain.",
        paragraphs: [
          "Many policies talk about a sudden break differently from a leak that kept going or a tank that wore out. A tank that empties in an hour and a supply line that has been crusted and dripping are facts we can photograph. Which sentence in your policy applies is for your insurer to say. Check the policy. Flood from the street is a different contract. If the bayou rose, we write that down as flooding, not as a water heater.",
          note +
            " We can meet the adjuster at the closet, show the path, and give you a repair estimate for the building. The estimate is not a settlement. The photo log is useful for the rooms. The slab-moisture page is the one to read if the concrete stayed wet after the closet was mopped.",
        ],
        points: [
          { title: "Photograph the heater", body: "Take a wide shot of the closet, a close shot of the pipes on top of the tank, a shot of the drain pan, and a shot of any ceiling below." },
          { title: "Keep the failed part", body: "If a supply line or a short connector at the top of the tank failed, do not throw it away until it is in a photo." },
          { title: "Stopping more damage", body: "Shutting the valve and starting the dry-out keeps the loss from spreading. Whether your policy pays for that work is your insurer's decision." },
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Heat, closets, and hard water in the tank.",
        paragraphs: [
          "Water heaters here work hard. Incoming water is warm for much of the year, tanks sit in hot garages, and a hard freeze is the week everyone remembers because pipes and heaters fail together. Sediment and failed valves are ordinary. There is no single number for how long a tank lasts. We look at the one that leaked. Neighborhoods we see this in include Houston, Westchase, Alief, Katy, Sugar Land, Memorial, and The Woodlands, from the office in 77082.",
          "If the leak is active, call or text " +
            phone +
            ". Family-owned since 1993. We are not a preferred vendor of any insurer. This site does not list a certification, and we do not claim one. For the wider water-damage process, start at the water damage hub. For a freeze that also broke a line, the burst-pipe page is the other half of that week.",
        ],
        points: [
          { title: "Water heaters in the garage", body: "When a garage water heater leaks, water can run under the door into the house. Check the floor, baseboards, and drywall on the house side, not just the drain pan." },
          { title: "Upstairs closets", body: "If the heater is on the second floor, look at the ceiling in the room below before you decide the damage stopped in the closet." },
          { title: "After a freeze", body: "A heater you drained, or left running with no water in the tank, needs a different repair than a tank that simply leaked. Tell us which one happened." },
        ],
      },
    ],
    faqs: [
      { q: "What do I shut off first?", a: "The cold-water valve on the heater if it turns, otherwise the main. Kill the breaker on an electric heater. If you smell gas, leave and call the utility and " + phone + "." },
      { q: "Is the pan supposed to have water in it?", a: "A pan can catch a drip. A pan full of water, or a drain that was never hooked up, means the water is going onto the floor. Photograph it." },
      { q: "Do you replace the water heater?", a: "We dry and rebuild the building. A new tank is plumbing, and we keep that price separate. A licensed plumber relights a gas heater." },
      { q: "Will this wet the unit below me?", a: "It can. Tell the manager and call us. We list every ceiling that is actually wet instead of assuming the whole stack." },
      { q: "Sudden failure or a long-term leak?", a: "We describe the fittings, the tank, and how far the water went. Your policy draws the line, so check it. We cannot promise the claim will pay." },
      { q: "Is this a flood?", a: "A water heater release is not rising floodwater. If street water also entered, say so. Those can be different policies." },
      { q: "Can you meet the adjuster?", a: "Yes. We show the closet and the path. We are not public adjusters. Your insurer decides the payment." },
      { q: "How do you dry the slab?", a: "We meter the concrete, remove the standing water, and run air movers and dehumidifiers. Read the slab-moisture guide if the closet looked dry and the concrete was still wet." },
      { q: "What does drying usually cost?", a: "A closet and one adjacent room often plan in the low thousands. A second-floor heater through a ceiling costs more. That is a range, not a quote." },
      { q: "Do you work on commercial buildings?", a: "Yes. Break-room and mechanical closets, plus apartments and houses. Call " + phone + " any time if water is still moving." },
      { q: "Where is the office?", a: "511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. Monday through Saturday, 8:00 AM to 6:00 PM for scheduled visits. Text the office number too." },
    ],
  }),
  page({
    slug: "dishwasher-leak-water-damage-houston",
    metaTitle: "Dishwasher Leak Damage in Houston",
    description:
      "Dishwasher leaks and overflows in Houston kitchens, from a supply line, a door, or a drain hose, in a house or an apartment. Call (713) 909-0034.",
    eyebrow: "Dishwasher leaks",
    title: ["Houston dishwasher", "leak damage."],
    lede: "A dishwasher leak rarely stays in the dishwasher. It runs under the cabinets, into the toe kick, and across a Houston slab before anyone opens the door and sees the puddle. The cabinet face can still look fine.",
    hubHeading: "Dishwasher leaks and overflows",
    hubBody:
      "Supply lines, door gaskets, and drain hoses fail under the sink or behind the machine. The cabinet floor and the next room are usually wetter than the kitchen looks.",
    firstSteps:
      "Stop the cycle. Shut the water valve under the sink if you can reach it without standing in water near an outlet. Do not keep running the machine to 'see if it still leaks.'",
    drying:
      "We pull the toe kick and the wet cabinet bottoms as far as the moisture goes, dry the slab and the walls, and rebuild the cabinet parts that swelled. A slow drip and a supply line that blew off are different repairs.",
    claim:
      "Policies often treat a sudden supply failure differently from a gasket that has been weeping. Check your policy. We photograph the hose, the cabinet, and the floor. Your insurer decides whether the claim pays for cabinets.",
    image: rooms.farmhouseSink,
    sections: [
      {
        eyebrow: "First hour",
        heading: "Stop the cycle and the supply under the sink.",
        paragraphs: [
          "Turn the dishwasher off. If it is still filling, the valve under the sink is the one that matters. It is usually on the hot supply, next to the garbage disposal supply. Turn it clockwise. If water is near the outlet under the sink, do not reach through it. Shut the kitchen breaker if you can do that from a dry place, or shut the main and call " +
            phone +
            ". Do not run another cycle to test your repair. That is how a quart becomes the hallway.",
          "Photograph the open dishwasher, the hose, the cabinet floor, and the room beside the kitchen before you towel it. A drain hose that popped off the disposal and a door gasket that drips only on the dry cycle look similar once everything is mopped. Apartment kitchens and break-room dishwashers in a small commercial suite are the same first steps. A full commercial dishwashing machine in a restaurant is a different piece of equipment. Tell us which one you have.",
        ],
        points: [
          { title: "Look under the sink", body: "The water line and the drain hose are often in the cabinet next to the dishwasher, not inside the tub. Open that door and look." },
          { title: "The hose at the disposal", body: "If the drain hose has popped off the disposal, every cycle dumps into the cabinet. Do not glue it back on and cover a wet shelf." },
          { title: "Stay away from the outlet", body: "Water at the kick plate under the cabinets and a live outlet do not mix. Stay out of that water." },
        ],
      },
      {
        eyebrow: "The path",
        heading: "Toe kicks, cabinet bases, and the slab.",
        paragraphs: [
          "Houston kitchens on slabs do not give this water a crawlspace. It runs under the dishwasher, swells the particle-board cabinet bottom, and travels under vinyl or wood into the next room. The face of the cabinet can look fine. The base is what failed. We meter the toe kick and the floor in front of the sink, not only the puddle you can see.",
          "An upstairs kitchen, less common but real in some Houston plans, puts that water in the ceiling below. A dishwasher overflow from a clogged air gap or a backed-up drain is a different amount of water from a pinhole supply. We say which evidence we find. A wet kitchen is not the same thing as a flood. Rising water from outside is a separate cause and often a separate policy.",
        ],
        points: [
          { title: "Cabinet bottoms swell", body: "Particle-board cabinet bottoms swell and do not go back to flat. Solid wood sometimes can dry. We look before we tell you which one you have." },
          { title: "The floor can hide it", body: "Laminate and vinyl can hide water on the concrete. If the slab stayed wet, the slab-moisture guide on this site explains what happens next." },
          { title: "The apartment below", body: "In an apartment, the unit under you may see the ceiling stain first. Call the manager and call us." },
        ],
      },
      {
        eyebrow: "Drying",
        heading: "Dry the cavity, then decide what cabinetry survives.",
        paragraphs: [
          "We remove standing water, take out wet cabinet bottoms that have lost their shape, and dry the slab and the wall behind the dishwasher with air movers and dehumidifiers. Houston air is humid enough that a box fan will not finish a closed cabinet. Moisture readings decide when new board and a new cabinet floor can go in. The dishwasher itself may need a plumber or an appliance tech. Rebuilding the machine is their work, not ours.",
          "The building repair, cabinets, drywall, and floor, can stay with Elite Restorations, family-owned in Houston since 1993. We work in houses, apartment kitchens, and small commercial break rooms. Call or text " +
            phone +
            ". Active leaks are answered any time. The office at 511 Crestwater Ct, Houston, TX 77082, is open Monday through Saturday, 8:00 AM to 6:00 PM.",
        ],
        points: [
          { title: "The kick plate comes off", body: "If we cannot see the floor under the cabinet, we cannot say it is dry. The board at the bottom of the cabinet usually has to come off." },
          { title: "Moving the dishwasher", body: "We pull the dishwasher out when that is what it takes to dry the floor. Hooking the water and power back up is a planned step, not a guess at the end." },
          { title: "Not a whole new kitchen", body: "One wet shelf does not mean every cabinet in the kitchen has to be replaced. We show you where the damage stops." },
        ],
      },
      {
        eyebrow: "Claims",
        heading: "A blown supply line is not a worn gasket.",
        paragraphs: [
          "A supply line that lets go during a cycle is a sudden event you can often point at. A door gasket or a slow fitting that has been swelling the cabinet for months is a different history. Many policies treat those differently. The words are in your policy, and they vary, so check it or ask the insurer. We describe the hose, the cabinet, and the floor. Your insurer decides whether 'sudden and accidental' fits.",
          note +
            " Photos before cleanup matter here because a mopped kitchen looks like a small spill. We can meet the adjuster and estimate the cabinet and floor repair. That estimate is construction, not a payment promise. The photo log walks a kitchen room by room. The insurance claims hub explains what we will and will not do on the claim.",
        ],
        points: [
          { title: "Keep the hose", body: "If a braided supply line failed, keep it. Photograph the fitting it came off of." },
          { title: "Write down when it happened", body: "Note whether it failed while the dishwasher was running or you found the water hours later. That timeline helps you explain it. Reading the policy is your step, or your insurer's." },
          { title: "This is not street flooding", body: "A dishwasher on the second floor is not floodwater from the street. If both happened, say so. They are different problems." },
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Kitchens on slabs, from the Loop to Katy.",
        paragraphs: [
          "We see this in bungalow kitchens in the Heights and Bellaire, in larger plans in Memorial and The Woodlands, and in apartment kitchens in the Energy Corridor and Westchase. The slab is the common thread. A leak under a dishwasher does not announce itself until the toe kick is soft or the floor cupboards smell. Summer humidity keeps that cavity wet longer than people expect. Hurricane season is not the usual cause. A supply failure can happen any week. A freeze week can break the same supply if it is on an exterior wall. Tell us if the cold just happened.",
          "Family-owned since 1993 at 511 Crestwater Ct. We are not affiliated with an appliance brand or an insurer. Call " +
            phone +
            " or text. For the full drying process, use the water damage page. For a heater in the same kitchen closet, use the water heater page. They can fail in the same room and still be two sources.",
        ],
        points: [
          { title: "Older kitchens", body: "Kitchens in the Heights and West University often have cabinets that were wet once already. We check whether those boxes can take another soaking." },
          { title: "Newer kitchens too", body: "A newer kitchen in Katy or Cinco Ranch can still hide a loose drain hose. The age of the house does not tell us what failed." },
          { title: "Office break rooms", body: "We also dry a small dishwasher in an office break room. Tell us if it is a home-style machine or a larger commercial one." },
        ],
      },
    ],
    faqs: [
      { q: "What should I do if the dishwasher is leaking right now?", a: "Stop the cycle, shut the valve under the sink if you can do it safely, keep power away from the water, and call " + phone + ". Photograph before you mop." },
      { q: "Should I run it again to find the leak?", a: "No. Another cycle adds water to the cabinet and the slab. Leave it off." },
      { q: "Do you repair the dishwasher?", a: "We dry and rebuild the kitchen around it. The machine itself is an appliance repair. We move it when the floor has to be dried." },
      { q: "Why is the cabinet soft if the floor looks dry?", a: "Particle-board bottoms hold water and the slab hides the rest. The toe kick is where we look." },
      { q: "Is a slow gasket leak covered?", a: "We cannot say. Many policies treat a sudden break differently from a long-term seep. Check your policy. We describe the leak as we find it." },
      { q: "Can this affect the apartment below?", a: "Yes, especially from an upstairs kitchen. We list the ceilings that are wet. Call the manager." },
      { q: "Will you meet the adjuster?", a: "Yes, if you want us there. We are not public adjusters. Your insurer decides whether there is a payout." },
      { q: "What does the repair usually cost?", a: "Drying a toe kick and replacing a cabinet bottom is not a whole new kitchen. As a range, not a quote, a contained dishwasher loss often plans in the low thousands, more if the floor and several cabinets are gone." },
      { q: "Do you handle houses and apartments?", a: "Yes, and small commercial break rooms. Call " + phone + " any time if water is still spreading." },
      { q: "Where do I read about the slab?", a: "The slab-moisture guide explains water left in the concrete. The water damage hub explains the overall dry-out." },
      { q: "How do I reach you?", a: "Call or text " + phone + ". Office: 511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. Monday through Saturday, 8:00 AM to 6:00 PM for scheduled visits." },
    ],
  }),
  page({
    slug: "toilet-overflow-water-damage-houston",
    metaTitle: "Toilet Overflow Damage in Houston",
    description:
      "Toilet overflow and supply-line damage in Houston homes, apartments, and commercial restrooms. What to do first, how we dry it, and how we help with the claim. Call (713) 909-0034.",
    eyebrow: "Toilet overflows",
    title: ["Houston toilet overflow", "water damage."],
    lede: "A toilet overflow is usually a clog that kept filling, a supply line that let go, or water at the base that has been seeping. Those three are not the same repair and not the same insurance story.",
    hubHeading: "Toilet overflow",
    hubBody:
      "An overflow from a clog, a burst supply, and a slow seep at the wax ring travel differently across a slab. Shut the valve on the wall behind the toilet before the hallway gets it.",
    firstSteps:
      "Close the supply valve on the wall at the toilet, turning it clockwise. If the bowl is still rising from a clog, do not flush again. If the valve will not stop it, shut the main.",
    drying:
      "We find how far water went under the flooring and into the wall behind the toilet, remove it, and dry the slab. An overflow that includes sewage needs a more careful clean than a clean supply-line break.",
    claim:
      "A sudden overflow or a supply line that fails is a different history from a wax ring that has been damp for months. Check your policy. We document what we see. Your insurer decides coverage.",
    image: rooms.bathVanity,
    sections: [
      {
        eyebrow: "First hour",
        heading: "The valve on the wall, then stop flushing.",
        paragraphs: [
          "The small valve on the wall or floor behind the toilet controls the supply. Turn it clockwise. If the tank or the bowl is overflowing because of a clog, flushing again makes it worse. Plunge only if the water has stopped rising and you are not standing in an electrified puddle. If the valve does nothing, shut the main and call " +
            phone +
            ". A supply line that is spraying is not a clog. Shut it off and photograph the line so the cause is clear.",
          "Water on a bathroom floor moves fast on a Houston slab. It goes under the door, into the closet, and under the vanity. In an apartment it can reach the corridor and the unit below. Commercial restrooms add several fixtures and a floor drain that may already be overwhelmed. Tell us which room and whether the water is clear or contaminated. Leave the fan off so you do not push contaminated water farther across the floor.",
        ],
        points: [
          { title: "Do not flush again", body: "Flushing one more time is how a clog that was still in the bowl ends up in the bedroom carpet." },
          { title: "Hose or bowl", body: "Water spraying from the hose behind the tank is a supply-line failure. Water coming over the bowl is an overflow or a clog. Tell us which one you saw." },
          { title: "A slow drip at the floor", body: "A long-running drip at the base is often a bad seal, not today's overflow. Do not caulk over the stain before it is photographed." },
        ],
      },
      {
        eyebrow: "The path",
        heading: "Under the flooring and through the bathroom wall.",
        paragraphs: [
          "Bathrooms here sit on slabs or, upstairs, over a ceiling. Overflow water follows the grout, gets under vinyl and floating floors, and wicks into the drywall behind the tank. The paint at the baseboard is the clue an hour later. A supply-line failure is usually clean water. An overflow that includes waste is not. We treat those cleanups differently and we say so in the notes. We do not add a certification this site does not state.",
          "Upstairs bathrooms in two-story houses in Katy, Sugar Land, Cinco Ranch, and The Woodlands put the ceiling below at risk. Apartment stacks do the same between units. We open the ceiling below only when a moisture meter says it is wet, not because a bathroom overflow always ruins the downstairs. A wax-ring seep can be a smaller, longer wet spot where the toilet meets the floor. That history matters for the building and for the policy. We describe it. Your insurer decides how to classify it.",
        ],
        points: [
          { title: "Check the next room", body: "Look in the closet and at the vanity next to the bathroom. Water from a toilet does not stop at the doorway." },
          { title: "A rocking toilet", body: "A toilet that rocks, or stains around the bolts, usually means the seal at the floor is bad. Today's overflow does not erase that older problem." },
          { title: "Commercial restrooms", body: "A failed flush valve in a public restroom can run longer than a house tank. Shut the valve and tell us how many fixtures are involved." },
        ],
      },
      {
        eyebrow: "Drying",
        heading: "Clean what the water was, then dry the slab.",
        paragraphs: [
          "Clean supply water and a sewage overflow are not dried the same way. We remove contaminated materials that cannot be cleaned, remove the rest of the water, and dry the structure with air movers and dehumidifiers. Houston humidity is the reason the equipment stays until the meters agree. Flooring that cupped or stained at the seams often has to come up so the slab can dry. We show you that line before we pull a whole bathroom.",
          "Drywall, baseboard, flooring, and setting the toilet back, when those are part of the work, come after the moisture readings. Elite Restorations is family-owned in Houston since 1993. We work on houses, apartment baths, and commercial restrooms. The office is 511 Crestwater Ct, Houston, TX 77082. Call or text " +
            phone +
            " any time when water is still spreading. Scheduled walks are Monday through Saturday, 8:00 AM to 6:00 PM.",
        ],
        points: [
          { title: "Cleaner and a rug will not dry it", body: "Pouring cleaner on a wet floor and covering it with a rug traps the moisture in the concrete." },
          { title: "Dry the floor before you reset the toilet", body: "Setting the toilet back on a wet, soft floor starts the leak again. The floor has to dry first." },
          { title: "Look at the ceiling below", body: "If the bathroom is upstairs, we check the ceiling underneath. A stain there stays part of this loss until a moisture meter says the ceiling is dry." },
        ],
      },
      {
        eyebrow: "Claims",
        heading: "Overflow, supply line, or a long seep at the base.",
        paragraphs: [
          "A bowl that overflowed once because of a clog, a supply line that split, and a wax ring that has dampened the floor for a season are three different stories. Many Texas policies are more willing to talk about a sudden discharge than about a leak that kept going. The wording is in your policy. Check it. Your insurer decides which story matches the policy. If the seal at the floor has been leaking for a long time, we say that, even if the bowl also overflowed today.",
          note +
            " We photograph the bath, the path, and the ceiling below, and we can meet the adjuster. The estimate is for the repair. It is not a payout. The photo log is a simple way to record the bathroom before cleanup. The slab guide matters when the water left the tile and stayed in the concrete. The insurance hub explains the limit of our role.",
        ],
        points: [
          { title: "Write down the time", body: "Write down when you noticed the water and whether the toilet had been rocking. Those are facts about the house. They are not a coverage decision." },
          { title: "Say if it was sewage", body: "Tell us if the overflow included waste from the bowl. That changes how we clean. It does not, by itself, decide what the policy pays." },
          { title: "Stop the water, then ask", body: "Closing the valve and drying the room limit further damage. Ask your insurer what they want you to save. Any deadline is written in your policy." },
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Bathrooms on slabs across Greater Houston.",
        paragraphs: [
          "From West University and Bellaire bungalows to newer baths in Katy and The Woodlands, the toilet sits close to a wall and a slab or a second-floor ceiling. Hard freezes can split the supply line the same week they split an attic pipe. Ordinary weeks are clogs and aging connectors. Hurricane rain does not cause a toilet to overflow by itself, but a drained city line can. If the street was flooding and the tub gurgled, say that. It may be a different policy from a clogged toilet on a dry day.",
          "We schedule this work from 511 Crestwater Ct. Family-owned since 1993. Call or text " +
            phone +
            ". We are not public adjusters, and we are not a vendor for any insurer. Use the water damage hub for the wider dry-out, and the burst-pipe page if the supply failure was part of a freeze. We write those up as separate causes.",
        ],
        points: [
          { title: "Find the valve now", body: "Know where the shutoff behind the toilet is before you need it. A valve painted over is a common surprise in a Houston bathroom." },
          { title: "Tell the apartment office", body: "Call the office so someone checks the unit below. We still need to get into the bathroom that overflowed." },
          { title: "Office and store restrooms", body: "We also handle a restroom overflow in a store or an office. Tell us how many stalls overflowed and whether the room has a floor drain." },
        ],
      },
    ],
    faqs: [
      { q: "What do I turn off?", a: "The supply valve behind the toilet, clockwise. If the bowl is rising, do not flush again. If the valve fails, shut the main and call " + phone + "." },
      { q: "Is an overflow the same as a wax-ring leak?", a: "No. An overflow is water that left the bowl. A wax-ring problem is usually a slower seep at the base. We write down which evidence is there. Your policy may treat them differently." },
      { q: "The water smells. What now?", a: "Keep people out, stop the supply, and do not spread it with a fan. Tell us it is contaminated. The cleanup is more than a mop." },
      { q: "Do you replace the toilet?", a: "We can reset or replace a toilet as part of the bathroom repair after the floor is dry. The dry-out comes first." },
      { q: "Will the apartment below be wet?", a: "Often, if you are not on the ground floor. Look, tell the manager, and we will meter the ceiling rather than guess." },
      { q: "Does insurance pay for a toilet overflow?", a: "Sometimes, and sometimes not. Sudden releases and long-term seepage are often treated differently. Check your policy. Your insurer decides payment." },
      { q: "Can you meet the adjuster?", a: "Yes. We walk the bath and any ceiling below. We are not public adjusters, and legal advice is outside our work." },
      { q: "What does the drying usually cost?", a: "A single bath with wet flooring often plans in the low thousands. A ceiling below and several rooms cost more. That is a planning range, not a quote." },
      { q: "Do you dry commercial restrooms?", a: "Yes, along with houses and apartments. Call " + phone + " any time if water is still spreading." },
      { q: "How is this different from a slab leak?", a: "A toilet supply or overflow starts at the fixture. Water still ends up in the slab and under the floor. The slab-moisture guide covers what the concrete does next." },
      { q: "Where are you?", a: "511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. Text or call " + phone + ". Office hours Monday through Saturday, 8:00 AM to 6:00 PM." },
    ],
  }),
];
