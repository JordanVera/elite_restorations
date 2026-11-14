import type { GuideSection } from "@/lib/guides/types";
import { img, type Img } from "@/lib/images";

const phone = "(713) 909-0034";
const note =
  "Your insurer decides coverage. We are not public adjusters, we do not give legal advice, and we do not promise a payout.";

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

const image = img(
  "/images/services/water-damage-restoration.jpg",
  "Air movers drying a Houston property during water damage restoration",
);

function page(input: Omit<Cause, "path" | "image">): Cause {
  return { ...input, path: `/${input.slug}`, image };
}

export const moreWaterCauses: readonly Cause[] = [
  page({
    slug: "water-heater-leak-damage-houston",
    metaTitle: "Water Heater Leak in Houston",
    description:
      "Water heater leak damage in Houston: tank and supply failures in homes, apartments, and commercial closets. Drying and claim help. Call (713) 909-0034.",
    eyebrow: "Water heater leaks",
    title: ["Houston water heater", "leak damage."],
    lede: "A water heater leak in Houston usually starts in a closet, a garage, or an upstairs mechanical closet and then finds the slab or the ceiling below. Stop the supply, kill the power or the gas only if you know how, and photograph the closet before you mop.",
    hubHeading: "Water heater leaks",
    hubBody:
      "Tanks fail at the fittings, the T&P line, or the tank itself. On a slab the water sits. In an upstairs closet it becomes the ceiling of the room below.",
    firstSteps:
      "Shut the cold-water valve on top of the heater if it will turn. If it will not, shut the house main. Switch the breaker off for an electric heater. If you smell gas or you are unsure of the gas valve, leave it and call.",
    drying:
      "We follow the water out of the closet, across the slab or through the ceiling, extract it, and dry the cavities. A pan that overflowed is not the same as a tank that split.",
    claim:
      "A tank that ruptures in a day and a drip at a fitting that has been staining the closet for months are different facts. Many policies care about that difference. Check your policy. We will not pick the label, and we will not promise payment.",
    sections: [
      {
        eyebrow: "First hour",
        heading: "Valve, power, and the pan on the floor.",
        paragraphs: [
          "The cold inlet on top of most tanks has a valve. Turn it clockwise until it stops. Open a hot faucet so pressure can drop. If that valve is frozen with corrosion, use the main. Electric heaters need the breaker off so you are not heating a tank that is emptying. Gas heaters: if you know the gas cock and you can turn it without forcing it, do that. If you smell gas, leave the closet and the house and call the gas utility and " +
            phone +
            ". Do not look for the leak with a flame.",
          "A pan under the heater is there to catch a drip and send it to a drain. In a lot of Houston closets the drain was never connected, or it clogs, and the pan becomes a pond that overflows onto the slab. Photograph the pan, the fittings, and the path across the floor before you shop-vac it. Apartment heaters in a stacked closet can wet the unit below even when the pan looks empty by the time you open the door.",
        ],
        points: [
          { title: "Do not refill yet", body: "Turning the water back on to 'see if it stopped' refills the ceiling. Leave it off until someone has seen the fittings or the tank." },
          { title: "Age is not a diagnosis", body: "An old tank can fail suddenly. A new tank can leak at a supply line. We describe the part that failed. We do not sell you a replacement as the dry-out." },
          { title: "Commercial closets", body: "A break-room or mechanical-room heater in a small commercial building follows the same shutoff. Tell us what is stored on the floor." },
        ],
      },
      {
        eyebrow: "The path",
        heading: "Closets, garages, and the ceiling underneath.",
        paragraphs: [
          "First-floor heaters in Houston houses often sit in a garage or an interior closet on the slab. Water runs to the nearest low spot, which may be the hallway or a bedroom, and wicks into drywall and under vinyl or wood. There is rarely a crawlspace to save you. Second-floor heaters, common in some two-story plans in Katy, Sugar Land, and The Woodlands, dump into the kitchen or the living room ceiling. We open only what the meters justify.",
          "Apartment water heaters in a utility closet can discharge into the corridor and the neighbor below. A property manager needs the unit number and whether the drain stack is involved. That is a different note from a roof leak, even if both stain a ceiling. We will not write 'roof' because the ceiling is wet. The closet tells the cause.",
        ],
        points: [
          { title: "Slab edge", body: "Water that sits on concrete moves laterally. The wet wall may be a room away from the heater." },
          { title: "T&P line", body: "A temperature-and-pressure discharge that has been dripping is not the same event as a tank seam that let go this morning." },
          { title: "Flooring", body: "Padding and laminate lock water against the slab. We look under the floor at the closet door, not only at the stain." },
        ],
      },
      {
        eyebrow: "Drying",
        heading: "Dry the building. Then talk about a new tank.",
        paragraphs: [
          "We extract what is standing, meter the closet and the rooms it reached, and set air movers and dehumidifiers. Houston humidity makes a fan in the doorway a slow way to dry a wall. The heater itself may need to be replaced. That replacement is plumbing. The drywall and the floor are restoration. We can coordinate both, and we keep the prices separate so a claim file does not mix a new tank with a ceiling repair without labels.",
          "We do not restart a gas heater. A licensed plumber should do that when you are ready for hot water again. Our work is the water that left the heater and the finishes it ruined. Homes, apartments, and small commercial closets are all in scope. Call " +
            phone +
            " any time if water is still moving. Office hours at 511 Crestwater Ct are Monday through Saturday, 8:00 AM to 6:00 PM.",
        ],
        points: [
          { title: "One company", body: "Elite Restorations is family-owned in Houston since 1993. Drying and the interior repair can stay here." },
          { title: "Do not close early", body: "A closet that smells dry can still read wet at the base plate. We wait on the meter." },
          { title: "Contents", body: "Stored boxes in a garage or closet are often the loss people forget to photograph. Shoot them before they go to the curb." },
        ],
      },
      {
        eyebrow: "Claims",
        heading: "A sudden tank failure is not a slow stain.",
        paragraphs: [
          "Many policies talk about sudden and accidental discharge differently from repeated leakage or deterioration. A tank that empties in an hour and a supply line that has been crusted and dripping are facts we can photograph. Which sentence in your policy applies is not a fact we will invent. Check the policy. Flood from the street is a different contract. A water heater did not cause the bayou to rise, and we will not write it that way.",
          note +
            " We can meet the adjuster at the closet, show the path, and give you a repair estimate for the building. The estimate is not a settlement. The photo log is useful for the rooms. The slab-moisture page is the one to read if the concrete stayed wet after the closet was mopped.",
        ],
        points: [
          { title: "Photograph the fittings", body: "The top of the heater, the pan, and the ceiling below. Wide shots and close shots." },
          { title: "Keep the part", body: "If a supply line or a nipple failed, do not throw it away before it is in a photo." },
          { title: "Mitigation", body: "Shutting the valve and starting dry-out limit further damage. Reimbursement is the carrier's decision." },
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Heat, closets, and hard water in the tank.",
        paragraphs: [
          "Water heaters here work hard. Incoming water is warm for much of the year, tanks sit in hot garages, and a hard freeze is the week everyone remembers because pipes and heaters fail together. Sediment and failed valves are ordinary. None of that is a number we will invent about 'how long a tank lasts.' We look at the one that leaked. Neighborhoods we see this in include Houston, Westchase, Alief, Katy, Sugar Land, Memorial, and The Woodlands, from the office in 77082.",
          "If the leak is active, call or text " +
            phone +
            ". Family-owned since 1993. We are not a preferred vendor of any insurer and we do not claim a certification the site does not already state. For the wider water-damage process, start at the water damage hub. For a freeze that also broke a line, the burst-pipe page is the other half of that week.",
        ],
        points: [
          { title: "Garage slabs", body: "A garage heater can wet the house through the door undercut. Look inside, not only at the pan." },
          { title: "Upstairs closets", body: "If the heater is on the second floor, check the ceiling below before you decide the loss is 'just the closet.'" },
          { title: "After a freeze", body: "A heater that was drained or left heating an empty tank is a different repair from a leak. Tell us which one you did." },
        ],
      },
    ],
    faqs: [
      { q: "What do I shut off first?", a: "The cold-water valve on the heater if it turns, otherwise the main. Kill the breaker on an electric heater. If you smell gas, leave and call the utility and " + phone + "." },
      { q: "Is the pan supposed to have water in it?", a: "A pan can catch a drip. A pan full of water, or a drain that was never hooked up, means the water is going onto the floor. Photograph it." },
      { q: "Do you replace the water heater?", a: "We dry and rebuild the building. A new tank is plumbing. We keep that price separate and we do not relight gas heaters." },
      { q: "Will this wet the unit below me?", a: "It can. Tell the manager and call us. We list every ceiling that is actually wet instead of assuming the whole stack." },
      { q: "Sudden failure or a long-term leak?", a: "We describe the fittings, the tank, and how far the water went. Your policy draws the line. Check it. We do not promise the claim will pay." },
      { q: "Is this a flood?", a: "A water heater release is not rising floodwater. If street water also entered, say so. Those can be different policies." },
      { q: "Can you meet the adjuster?", a: "Yes. We show the closet and the path. We are not public adjusters and we do not negotiate the payment." },
      { q: "How do you dry the slab?", a: "Meters, extraction, air movers, and dehumidifiers. Read the slab-moisture guide if the concrete held the water after the closet looked dry." },
      { q: "What does drying usually cost?", a: "A closet and one adjacent room often plan in the low thousands. A second-floor heater through a ceiling costs more. That is a range, not a quote." },
      { q: "Do you work on commercial buildings?", a: "Yes. Break-room and mechanical closets, plus apartments and houses. Call " + phone + " any time if water is still moving." },
      { q: "Where is the office?", a: "511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. Monday through Saturday, 8:00 AM to 6:00 PM for scheduled visits. Text the office number too." },
    ],
  }),
  page({
    slug: "dishwasher-leak-water-damage-houston",
    metaTitle: "Dishwasher Leak Damage in Houston",
    description:
      "Dishwasher leak and overflow damage in Houston kitchens: supply lines, doors, and drain hoses in homes and apartments. Call (713) 909-0034.",
    eyebrow: "Dishwasher leaks",
    title: ["Houston dishwasher", "leak damage."],
    lede: "A dishwasher leak rarely stays in the dishwasher. It runs under the cabinets, into the toe kick, and across a Houston slab before anyone opens the door and sees the puddle. The cabinet face can still look fine.",
    hubHeading: "Dishwasher leaks and overflows",
    hubBody:
      "Supply lines, door gaskets, and drain hoses fail under the sink or behind the machine. The cabinet floor and the adjacent room are usually wetter than the kitchen looks.",
    firstSteps:
      "Stop the cycle. Shut the water valve under the sink if you can reach it without standing in water near an outlet. Do not keep running the machine to 'see if it still leaks.'",
    drying:
      "We pull the toe kick and the wet cabinet bottoms as far as the moisture goes, dry the slab and the walls, and rebuild the cabinet parts that swelled. A slow drip and a supply line that blew off are different notes.",
    claim:
      "Policies often treat a sudden supply failure differently from a gasket that has been weeping. Check your policy. We photograph the hose, the cabinet, and the floor. We do not promise the claim pays for cabinets.",
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
          { title: "Under the sink", body: "The supply and the drain often live in the cabinet next door, not inside the dishwasher tub. Look there." },
          { title: "Disposal", body: "A drain hose that is off the disposal dumps every cycle into the cabinet. Do not glue it back and hide the wet shelf." },
          { title: "Power", body: "A wet toe kick and a live outlet are a bad combination. Stay out of the water." },
        ],
      },
      {
        eyebrow: "The path",
        heading: "Toe kicks, cabinet bases, and the slab.",
        paragraphs: [
          "Houston kitchens on slabs do not give this water a crawlspace. It runs under the dishwasher, swells the particle-board cabinet bottom, and travels under vinyl or wood into the next room. The face of the cabinet can look fine. The base is what failed. We meter the toe kick and the floor in front of the sink, not only the puddle you can see.",
          "An upstairs kitchen, less common but real in some Houston plans, puts that water in the ceiling below. A dishwasher overflow from a clogged air gap or a backed-up drain is a different volume from a pinhole supply. We say which evidence we find. We do not call every wet kitchen a 'flood.' Rising water from outside is a separate cause and often a separate policy.",
        ],
        points: [
          { title: "Cabinets", body: "Pressed-wood bottoms swell and do not return. Solid wood may dry. We look before we promise either." },
          { title: "Floors", body: "Laminate and vinyl hide water on the slab. The slab-moisture guide is the right companion when the concrete stayed wet." },
          { title: "Neighbors", body: "In an apartment, the unit below may see the ceiling first. Call the manager and call us." },
        ],
      },
      {
        eyebrow: "Drying",
        heading: "Dry the cavity, then decide what cabinetry survives.",
        paragraphs: [
          "We extract standing water, remove wet cabinet bottoms that have lost their shape, and dry the slab and the wall behind the dishwasher with air movers and dehumidifiers. Houston air is humid enough that a box fan will not finish a closed cabinet. Moisture readings decide when new board and a new cabinet floor can go in. The dishwasher itself may need a plumber or an appliance tech. We do not pretend to rebuild the machine.",
          "The building repair, cabinets, drywall, and floor, can stay with Elite Restorations, family-owned in Houston since 1993. We work in houses, apartment kitchens, and small commercial break rooms. Call or text " +
            phone +
            ". Active leaks are answered any time. The office at 511 Crestwater Ct, Houston, TX 77082, is open Monday through Saturday, 8:00 AM to 6:00 PM.",
        ],
        points: [
          { title: "Toe kick", body: "If we cannot see the floor under the cabinet, we cannot say it is dry. The kick usually comes off." },
          { title: "Appliance", body: "We move the dishwasher when that is required to dry. Reconnecting water and power is coordinated, not guessed." },
          { title: "Scope", body: "A wet shelf is not automatically new cabinets for the whole kitchen. We show you the line." },
        ],
      },
      {
        eyebrow: "Claims",
        heading: "A blown supply line is not a worn gasket.",
        paragraphs: [
          "A supply line that lets go during a cycle is a sudden event you can often point at. A door gasket or a slow fitting that has been swelling the cabinet for months is a different history. Many policies distinguish those. The words are in your policy, and they vary. Check it or ask the insurer. We will describe the hose, the cabinet, and the floor. We will not write 'sudden and accidental' as a conclusion.",
          note +
            " Photos before cleanup matter here because a mopped kitchen looks like a small spill. We can meet the adjuster and estimate the cabinet and floor repair. That estimate is construction, not a payment promise. The photo log walks a kitchen room by room. The insurance claims hub explains what we will and will not do on the claim.",
        ],
        points: [
          { title: "Save the hose", body: "If a braided line failed, keep it. Photograph the connection it came off." },
          { title: "One cycle", body: "Note whether it failed while running or you found it hours later. That timeline helps you. We still do not interpret the policy." },
          { title: "Not flood", body: "A dishwasher on the second floor is not a flood from the street. If both happened, say both." },
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
          { title: "Older cabinets", body: "Heights and West University kitchens often have cabinet boxes that have already been wet once. We do not assume they can take another soak." },
          { title: "New builds", body: "A newer Katy or Cinco Ranch kitchen can still hide a loose drain hose. Age of the house is not the diagnosis." },
          { title: "Commercial break rooms", body: "A small office dishwasher is in scope. Say if it is a residential machine or a larger commercial one." },
        ],
      },
    ],
    faqs: [
      { q: "What should I do if the dishwasher is leaking right now?", a: "Stop the cycle, shut the valve under the sink if you can do it safely, keep power away from the water, and call " + phone + ". Photograph before you mop." },
      { q: "Should I run it again to find the leak?", a: "No. Another cycle adds water to the cabinet and the slab. Leave it off." },
      { q: "Do you repair the dishwasher?", a: "We dry and rebuild the kitchen around it. The machine itself is an appliance repair. We move it when the floor has to be dried." },
      { q: "Why is the cabinet soft if the floor looks dry?", a: "Particle-board bottoms hold water and the slab hides the rest. The toe kick is where we look." },
      { q: "Is a slow gasket leak covered?", a: "We do not know. Many policies treat a sudden break differently from a long-term seep. Check your policy. We will not relabel it." },
      { q: "Can this affect the apartment below?", a: "Yes, especially from an upstairs kitchen. We list the ceilings that are wet. Call the manager." },
      { q: "Will you meet the adjuster?", a: "Yes, if you want us there. We are not public adjusters and we do not promise a payout." },
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
      "Toilet overflow and supply-line damage in Houston homes, apartments, and commercial restrooms. What to do first, drying, and claim help. Call (713) 909-0034.",
    eyebrow: "Toilet overflows",
    title: ["Houston toilet overflow", "water damage."],
    lede: "A toilet overflow is usually a clog that kept filling, a supply line that let go, or water at the base that has been seeping. Those three are not the same repair and not the same insurance story.",
    hubHeading: "Toilet overflow",
    hubBody:
      "An overflow from a clog, a burst supply, and a slow seep at the wax ring travel differently across a slab. Shut the valve on the wall behind the toilet before the hallway gets it.",
    firstSteps:
      "Close the supply valve on the wall at the toilet, turning it clockwise. If the bowl is still rising from a clog, do not flush again. If the valve will not stop it, shut the main.",
    drying:
      "We find how far water went under the flooring and into the wall behind the toilet, extract it, and dry the slab. Sewage-contaminated overflows need a more careful clean than a clean supply-line break.",
    claim:
      "A sudden overflow or a supply line that fails is a different history from a wax ring that has been damp for months. Check your policy. We document what we see. We do not promise coverage.",
    sections: [
      {
        eyebrow: "First hour",
        heading: "The valve on the wall, then stop flushing.",
        paragraphs: [
          "The small valve on the wall or floor behind the toilet controls the supply. Turn it clockwise. If the tank or the bowl is overflowing because of a clog, flushing again makes it worse. Plunge only if the water has stopped rising and you are not standing in an electrified puddle. If the valve does nothing, shut the main and call " +
            phone +
            ". A supply line that is spraying is not a clog. Shut it off and do not keep the line as a mystery. Photograph it.",
          "Water on a bathroom floor moves fast on a Houston slab. It goes under the door, into the closet, and under the vanity. In an apartment it can reach the corridor and the unit below. Commercial restrooms add multiple fixtures and a floor drain that may already be overwhelmed. Tell us which room and whether the water is clear or contaminated. Do not use a fan to blow contaminated water further across the floor.",
        ],
        points: [
          { title: "Stop the flush", body: "One more flush is how a contained clog becomes the bedroom carpet." },
          { title: "Supply versus bowl", body: "Spray from the hose behind the tank is a supply failure. Water from the bowl is an overflow or a clog. Say which." },
          { title: "Base of the toilet", body: "A chronic drip at the floor is often the seal, not today's overflow. Do not caulk it and hide the stain before it is photographed." },
        ],
      },
      {
        eyebrow: "The path",
        heading: "Under the flooring and through the bathroom wall.",
        paragraphs: [
          "Bathrooms here sit on slabs or, upstairs, over a ceiling. Overflow water follows the grout, gets under vinyl and floating floors, and wicks into the drywall behind the tank. The paint at the baseboard is the clue an hour later. A supply-line failure is usually clean water. An overflow that includes waste is not. We treat those cleanups differently and we say so in the notes. We do not use a certification label the company has not stated on this site.",
          "Upstairs bathrooms in two-story houses in Katy, Sugar Land, Cinco Ranch, and The Woodlands put the ceiling below at risk. Apartment stacks do the same between units. We open the ceiling below only when moisture says it is wet, not because a bathroom overflow 'always' ruins the downstairs. A wax-ring seep can be a smaller, longer wet spot at the flange. That history matters for the building and for the policy. We describe it. We do not choose the coverage word.",
        ],
        points: [
          { title: "Vanity and closet", body: "Look next door. Bathroom water rarely respects the doorway." },
          { title: "Flange", body: "Rocking toilets and stains at the bolts are a seal problem. An overflow today does not erase that older clue." },
          { title: "Commercial restrooms", body: "A failed flush valve can run longer than a house tank. Shut the stop and tell us how many fixtures." },
        ],
      },
      {
        eyebrow: "Drying",
        heading: "Clean what the water was, then dry the slab.",
        paragraphs: [
          "Clean supply water and a sewage overflow are not dried the same way. We remove contaminated materials that cannot be cleaned, extract the rest, and dry the structure with air movers and dehumidifiers. Houston humidity is the reason the equipment stays until the meters agree. Flooring that cupped or stained at the seams often has to come up so the slab can dry. We show you that line before we pull a whole bathroom.",
          "Repairs, drywall, base, flooring, and a reset toilet when that is in the scope, come after the readings. Elite Restorations is family-owned in Houston since 1993. We work on houses, apartment baths, and commercial restrooms. The office is 511 Crestwater Ct, Houston, TX 77082. Call or text " +
            phone +
            " any time when water is still spreading. Scheduled walks are Monday through Saturday, 8:00 AM to 6:00 PM.",
        ],
        points: [
          { title: "Do not bleach-and-hope", body: "Pouring cleaner on a wet floor and covering it with a rug traps the moisture in the slab." },
          { title: "Toilet reset", body: "Setting the toilet back on a wet, soft floor repeats the leak. The floor comes first." },
          { title: "Downstairs ceiling", body: "If the bath is upstairs, we check below. A stain there is part of this loss until the meter says otherwise." },
        ],
      },
      {
        eyebrow: "Claims",
        heading: "Overflow, supply line, or a long seep at the base.",
        paragraphs: [
          "A bowl that overflowed once because of a clog, a supply line that split, and a wax ring that has dampened the subfloor for a season are three stories. Many Texas policies are more willing to talk about a sudden discharge than about repeated leakage. The form of words is in your policy. Check it. We will not promise which one you have, and we will not call a chronic flange leak sudden because an overflow also happened today.",
          note +
            " We photograph the bath, the path, and the ceiling below, and we can meet the adjuster. The estimate is for the repair. It is not a payout. The photo log is a simple way to record the bathroom before cleanup. The slab guide matters when the water left the tile and stayed in the concrete. The insurance hub explains the limit of our role.",
        ],
        points: [
          { title: "Timeline", body: "Write down when you noticed it and whether the toilet had been rocking. Those are facts. Coverage is not." },
          { title: "Contaminated water", body: "Say if the overflow included waste. It changes the cleanup. It does not, by itself, decide the claim." },
          { title: "Mitigation", body: "Stopping the valve and drying limit further damage. Ask your insurer what they want saved. We do not invent a deadline." },
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Bathrooms on slabs across Greater Houston.",
        paragraphs: [
          "From West University and Bellaire bungalows to newer baths in Katy and The Woodlands, the toilet sits close to a wall and a slab or a second-floor ceiling. Hard freezes can split the supply line the same week they split an attic pipe. Ordinary weeks are clogs and aging connectors. Hurricane rain does not cause a toilet to overflow by itself, but a drained city line can. If the street was flooding and the tub gurgled, say that. It may be a different policy from a clogged toilet on a dry day.",
          "We schedule this work from 511 Crestwater Ct. Family-owned since 1993. Call or text " +
            phone +
            ". We are not public adjusters and we are not a carrier's vendor. Use the water damage hub for the wider dry-out, and the burst-pipe page if the supply failure was part of a freeze. They should not be written up as the same cause.",
        ],
        points: [
          { title: "Valve habit", body: "Know where the toilet stop is before you need it. A painted-over valve is a common Houston bathroom surprise." },
          { title: "Apartments", body: "Tell the office so the unit below is checked. We still need access to the bath that overflowed." },
          { title: "Commercial", body: "Restroom overflows in a retail or office building are in scope. Say how many stalls and whether a floor drain exists." },
        ],
      },
    ],
    faqs: [
      { q: "What do I turn off?", a: "The supply valve behind the toilet, clockwise. If the bowl is rising, do not flush again. If the valve fails, shut the main and call " + phone + "." },
      { q: "Is an overflow the same as a wax-ring leak?", a: "No. An overflow is water that left the bowl. A wax-ring problem is usually a slower seep at the base. We write down which evidence is there. Your policy may treat them differently." },
      { q: "The water smells. What now?", a: "Keep people out, stop the supply, and do not spread it with a fan. Tell us it is contaminated. The cleanup is more than a mop." },
      { q: "Do you replace the toilet?", a: "We can reset or replace a toilet as part of the bathroom repair after the floor is dry. The dry-out comes first." },
      { q: "Will the apartment below be wet?", a: "Often, if you are not on the ground floor. Check, tell the manager, and we will meter the ceiling rather than assume." },
      { q: "Does insurance pay for a toilet overflow?", a: "Sometimes, and sometimes not. Sudden releases and long-term seepage are often treated differently. Check your policy. We do not promise payment." },
      { q: "Can you meet the adjuster?", a: "Yes. We walk the bath and any ceiling below. We are not public adjusters and we do not give legal advice." },
      { q: "What does the drying usually cost?", a: "A single bath with wet flooring often plans in the low thousands. A ceiling below and several rooms cost more. That is a planning range, not a quote." },
      { q: "Do you dry commercial restrooms?", a: "Yes, along with houses and apartments. Call " + phone + " any time if water is still spreading." },
      { q: "How is this different from a slab leak?", a: "A toilet supply or overflow starts at the fixture. Water still ends up in the slab and under the floor. The slab-moisture guide covers what the concrete does next." },
      { q: "Where are you?", a: "511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. Text or call " + phone + ". Office hours Monday through Saturday, 8:00 AM to 6:00 PM." },
    ],
  }),
];
