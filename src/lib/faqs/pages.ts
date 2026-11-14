import { assertFaqMap, assertFaqSet, type Faq } from "@/lib/faqs/types";

const phone = "(713) 909-0034";

export const costFaqs: Record<string, Faq[]> = {
  "kitchen-remodel-cost-houston": [
    {
      q: "Does living in the house during the remodel change the price?",
      a: "It can change the schedule more than the materials. Protecting a path, a temporary sink plan, and working around a family still in the house take care. The big number is still cabinets, stone, and whether the layout moves. We price the way you will live through it after we see the kitchen.",
    },
    {
      q: "Are appliances inside those planning ranges?",
      a: "Appliances you buy yourself are not the construction number. Panels and a built-in refrigerator are. The ranges on this page are for the work described: finishes on the same layout, a layout change, or a gut. The estimate lists what is in and what is out. Do not treat the low number as a bid.",
    },
    {
      q: "How much does a permit add?",
      a: "The fee is rarely the thing that moves a kitchen from one band to another. The time, and the work the permit makes you show, are. A finish update that leaves plumbing and structure alone often skips the permit. Moving them usually does not. We name the office from the address.",
    },
    {
      q: "Why does the counter material move the number so much?",
      a: "Painted cabinets and a straightforward quartz top sit in a different place from custom boxes and a stone that needs more care. Edge detail, a thick profile, and a second slab for a long island are real lines. We measure after the cabinets are set because Houston walls are rarely square.",
    },
    {
      q: "Is a prep sink in the island the expensive part?",
      a: "It can be, on a slab. Cutting concrete to move a drain is a different project from an island with power and no water. Leaving the sink where it is keeps more kitchens in a lower band even when the stone is new. We say which one your plan is.",
    },
    {
      q: "What if the old cabinets are swollen from a leak?",
      a: "Repair comes before the new kitchen. A soft sink base or a wet layer under the floor changes the number. Finding it on the visit is cheaper than finding it on demo day, and it still changes the price. A water claim, if you have one, is not this cost guide. Your insurer decides that payment.",
    },
    {
      q: "Do I need to be home for the estimate?",
      a: "Yes. We have to see the room, the doors, and how you cook. A photo is a start and it is not a price. Call " + phone + ". The visit is how a band becomes a number. Office hours for scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM.",
    },
    {
      q: "Will an HOA fee show up on a kitchen?",
      a: "Interior kitchens rarely need an association review. If they do, it is usually because a window or the exterior changes. That is not a line we hide in the cabinets. The ranges here are planning ranges, not a quote, and they are not a deductible.",
    },
  ],
  "bathroom-remodel-cost-houston": [
    {
      q: "Does moving the toilet on a slab change the price?",
      a: "Yes. On a slab, a moved drain means cutting concrete. Keeping the toilet, the shower drain, and the vanity supply where they are is how a bath stays in a lower band. The moment those move, you are in a different project. We inspect before we say a drain can move.",
    },
    {
      q: "Why does a window in the shower cost extra?",
      a: "It has to be built into the waterproofing or removed. Older Houston baths often have that window. It is part of the shower price, not a surprise after the tile. Skipping it does not produce the same shower.",
    },
    {
      q: "Can I use the other bathroom, and does that affect cost?",
      a: "If you have a second bath, the job is simpler to live through. A house with one toilet needs a shorter plan and more care about the days the water is off. That is schedule and protection, not a second tile budget. We say which house you have.",
    },
    {
      q: "Is a tub-to-shower conversion the shower-rebuild range?",
      a: "Often, when the drain stays put. Moving the drain, adding a second wet wall, or building a curbless opening can push it up. Glass is part of the shower number. A curtain on the old tub is not the same project. The visit places it.",
    },
    {
      q: "What if there is already a leak under the tile?",
      a: "Then drying and rotten board come before the new bath. That repair is not free inside a finish refresh. We would rather find it on the visit than on demo day. If you are filing a claim, your insurer decides payment. This page is the construction price.",
    },
    {
      q: "Does the glass enclosure sit inside the range?",
      a: "A shower rebuild includes the glass that belongs to that shower. A heavy custom panel, or a second wet room in the same house, can move the project up. Ask what is behind the tile and what the glass is before you compare two numbers.",
    },
    {
      q: "Do I need to be home to get a bathroom price?",
      a: "Yes. The drain, the window, and the ceiling below are not visible in a text. Call " + phone + ". We price after a visit. The ranges on this page are planning ranges, not a quote.",
    },
    {
      q: "Does a bathroom remodel pick up an HOA or permit fee that blows the budget?",
      a: "The permit fee is small next to the plumbing. An HOA rarely reviews interior tile. A street-facing window can be the exception. Relocating a drain is when the permit usually shows up. We name the office from the address.",
    },
  ],
  "roof-replacement-cost-houston": [
    {
      q: "Does a longer schedule make the roof cost more?",
      a: "The price is the roof: size, slope, the wood, and the material. A permit or an HOA review can add waiting, not a second roof. Rain can add a dry-in. We do not charge a mystery day rate on this page. The estimate after the inspection is the price.",
    },
    {
      q: "Is the permit fee a big part of a Houston roof?",
      a: "No. It is part of planning a full replacement, and it is small next to tear-off and shingles. A full replacement in the City of Houston is typically permitted. The fee is not why a steep, cut-up roof costs more than a simple gable. The roof shape is.",
    },
    {
      q: "Can an HOA delay change what I should budget?",
      a: "Budget the roof, and budget time if the association has to approve color. Cinco Ranch, The Woodlands, and similar sections do this often. The delay is not a reason to skip the review. Starting with the wrong color is the expensive version.",
    },
    {
      q: "Why is a tear-off priced differently from a roof laid over the old one?",
      a: "They are different roofs. The ranges on this page assume the old covering comes off so the wood can be seen. Leaving a second layer on hides the deck. Texas has a limit on how many shingle layers can stay. We say what is on the house after we look.",
    },
    {
      q: "Why does a steep roof cost more than the same square footage?",
      a: "Steep slopes, cut-up hips, and two stories take more labor and more care than a walkable ranch. A price-by-size that ignores the slope will not match this page. We inspect the roof you have. A large or steep roof can sit above the published band.",
    },
    {
      q: "Do I need to be home for a roof estimate?",
      a: "Someone needs to give us yard access and be reachable. You do not have to climb. Call " + phone + ". We look at the roof and say whether a repair will hold or it needs to come off, then price that work. The ranges here are not a quote.",
    },
    {
      q: "If my deductible is higher than the roof, what am I paying?",
      a: "You are looking at two numbers. The deductible is what your policy says you pay before it pays, and we do not waive it. The contract price is the cost of the roof. If the deductible is higher than the repair, the claim may not help. Ask your insurer. We still price the work.",
    },
    {
      q: "What if the decking is bad on half the house only?",
      a: "We find soft boards after the old roofing comes off, and we tell you before the job grows. Wood repair is extra. It is often talked about by the sheet, not as a new mystery roof. A few sheets and a whole slope of rotten deck are different money.",
    },
  ],
};

export const waterFaqs: Record<string, Faq[]> = {
  "burst-frozen-pipe-water-damage-houston": [
    {
      q: "Do I need to be home for a burst-pipe dry-out?",
      a: "Someone has to let us in and show us where the water came out. If you are stuck out of town, a person you trust can meet us if they can approve the work. We do not enter a house because a neighbor has a key unless you have said so.",
    },
    {
      q: "How fast can you get there after a pipe breaks?",
      a: `Call ${phone} any time if water is still moving. Shut the main if you can do it safely. We tell you the next step. We do not promise a drive time. The morning after a hard freeze, a lot of Houston calls at once. Calling still puts you in line.`,
    },
    {
      q: "What did the February 2021 freeze do to Houston pipes?",
      a: "That freeze, roughly February 11 through 19, 2021, knocked out power and heat. Attic lines, pipes in exterior walls, and hose bibs split, often when the ice thawed. Houses here are built for heat, so those lines were rarely wrapped. A freeze like that can happen again. We dry and repair the building. Your insurer decides the claim.",
    },
    {
      q: "Should I drip the faucets before a cold snap?",
      a: "If a hard freeze is forecast and you will be home, dripping warm and cold faucets and opening cabinet doors on exterior walls is the common advice. If you will be gone, shutting the water off and draining the lines is the stronger move. Ask a plumber if you are unsure. We are the dry-out and the repair after a break, not a substitute for that prep.",
    },
    {
      q: "Will insurance cover a frozen pipe if the power was out?",
      a: "Many policies talk about a frozen pipe differently when the house was not heated or the water was not shut off. The February 2021 outages were outside a lot of people's control. Whether your policy pays is your insurer's decision, based on your wording. We cannot promise it. We document the break and dry what you hire.",
    },
    {
      q: "Is the deductible for a burst pipe the same as my hurricane deductible?",
      a: "Often, no. Wind and hail deductibles on many Texas policies are a percentage. A plumbing break often uses a different, flatter deductible. Yours is on the declarations page. We do not have it, and we do not waive it. Ask your agent which one applies to a pipe.",
    },
    {
      q: "Who should call if this is an apartment?",
      a: "The person who can approve the work, and the resident who is standing in the water. Tell the manager. A pipe in an upstairs unit often wets the ceiling below. We list the units that are actually wet. We do not assume the whole building.",
    },
    {
      q: "How long does drying take after a burst in the attic?",
      a: "It depends on how far the water ran in the ceilings, the walls, and the slab. Houston humidity does not let a closed house dry itself. We meter and we leave air movers and dehumidifiers until the readings support repair. A stain that looks dry can still be wet in the insulation.",
    },
  ],
  "water-heater-leak-damage-houston": [
    {
      q: "Do I need to be home if the water heater is leaking?",
      a: "Yes, or someone who can shut the valve and let us into the closet and the rooms below. If you smell gas, leave and call the utility and " + phone + ". Do not hunt for the valve in a gas smell. An electric heater still needs the breaker off.",
    },
    {
      q: "How fast can you come for a water heater flood?",
      a: `Call ${phone} if water is spreading. We answer any time for an active water emergency and tell you the next safe step. A garage heater that has already emptied into the yard is urgent if it also ran into the house. We do not promise a minute count.`,
    },
    {
      q: "Are attic and garage water heaters different in Houston?",
      a: "Yes. An attic or upstairs closet drops water through the ceiling below. A garage heater can run under the door into the house and look like a small puddle in the pan. Check the baseboards on the house side. Hard freezes hit heaters and pipes in the same week.",
    },
    {
      q: "Should I replace the tank or only dry the house?",
      a: "Those are separate prices. We dry and rebuild the building. A new tank is plumbing. A licensed plumber relights a gas heater. We do not fold the tank into the drywall number and hope you will not notice. Age alone is not a reason we declare a tank dead. We look at the one that leaked.",
    },
    {
      q: "Is this deductible the wind deductible?",
      a: "Usually a water heater release is not a wind claim. The deductible on the declarations page for this kind of loss is the one to ask your agent about. We do not waive it. Flood from the street is a different policy if that also happened. Say so if both did.",
    },
    {
      q: "Can I stay in the house?",
      a: "If the water stayed in the closet and the power is safe, often yes. If the ceiling below is sagging, or the water reached outlets, stay out of those rooms. We say which rooms we are drying. The rest of the house can often keep working.",
    },
    {
      q: "Did the 2021 freeze ruin water heaters too?",
      a: "A lot of heaters failed the same week the pipes did, including tanks that were left on with no water in them. That is a different repair from a tank that rusted out in August. Tell us which one happened. Coverage is your insurer's call. We dry the building either way.",
    },
    {
      q: "How long will the closet and the ceiling take to dry?",
      a: "A closet and one adjacent room are a smaller job than a second-floor heater through a ceiling. The slab can stay wet after the pan looks empty. We meter. Equipment comes out when the readings support it, not when the puddle is gone. As a range, not a quote, a contained closet often plans in the low thousands.",
    },
  ],
  "dishwasher-leak-water-damage-houston": [
    {
      q: "Do I need to be home for a dishwasher leak?",
      a: "Someone needs to show us the kitchen and the toe kick, and shut the water if it is still running. You do not have to pull the appliance. If the leak is under the cabinets, we need room to see the floor. Pets should be out of the wet kitchen.",
    },
    {
      q: "How fast can you come out?",
      a: `If water is spreading across the kitchen, call ${phone} any time. Stop the cycle. Shut the valve under the sink if you can do it safely. We tell you the next step. A dried stain from last month is a scheduled visit, Monday through Saturday, 8:00 AM to 6:00 PM.`,
    },
    {
      q: "Is a burst supply line different from a bad door gasket?",
      a: "Yes. A supply line that lets go is a sudden amount of water. A gasket or a door that drips every cycle can wet the cabinet for months. We describe what we find. Your policy may treat those differently. We cannot say which one it will pay.",
    },
    {
      q: "Will this ruin the kitchen floor?",
      a: "It might. Water runs under the cabinets and across a slab before the cabinet face looks bad. Wood and laminate swell. Tile may be fine while the cabinet bottom is not. We look under the toe kick. We do not replace a floor that is still sound.",
    },
    {
      q: "Will insurance cover a dishwasher overflow?",
      a: "We cannot promise that. Many policies treat a sudden break differently from a slow seep. Check yours or ask your insurer. We photograph the leak and the wet cabinets and help document the damage. We are not public adjusters. We work with your adjuster if you want us there.",
    },
    {
      q: "Can mold start under the sink cabinet?",
      a: "Wet particle board in a Houston kitchen is a poor place to wait. We do not name a deadline, and we are not a mold lab. We dry what we can reach and we remove material that cannot dry in place. We do not promise a mold-free kitchen. If you see growth, tell us.",
    },
    {
      q: "Can I keep using the rest of the kitchen?",
      a: "Often, if the water is contained and the power is safe. Leave the dishwasher off. Do not run another cycle to test it. You may be without that cabinet for the dry-out. We say whether the floor has to come up before you put the dishes back.",
    },
    {
      q: "Who pays for the dry-out?",
      a: "You hire us unless and until your insurer includes the work. A contained dishwasher loss often plans in the low thousands, more if the floor and several cabinets are gone. That is a range, not a quote, and it is not a claim payment. Your deductible is on your policy. We do not waive it.",
    },
  ],
  "toilet-overflow-water-damage-houston": [
    {
      q: "Do I need to be home if the toilet overflowed?",
      a: "Yes, or someone who can shut the supply valve and let us in. If the bowl is still rising, do not flush again. Turn the valve behind the toilet clockwise. If that fails, shut the main and call " + phone + ". Keep people out of water near outlets.",
    },
    {
      q: "How fast can you come for a toilet overflow?",
      a: `Call ${phone} if water is still spreading or it smells like sewage. We answer any time for active water and tell you the next safe step. A small overflow you already stopped is still worth a look if it reached the baseboard or the unit below.`,
    },
    {
      q: "Is a clogged toilet the same as a supply line that split?",
      a: "No. An overflow leaves water from the bowl. A split supply is clean water at the valve, often in a freeze. A wax ring is usually a slower seep at the base. We write down the evidence. Your policy may treat them differently. We do not pick the label that pays more.",
    },
    {
      q: "What if the water smells?",
      a: "Keep people and pets out. Do not spread it with a household fan. Sewage is a different cleanup from a supply-line puddle. Tell us on the phone. Mopping it into the grout is not the cleanup. We say what has to come out.",
    },
    {
      q: "Will insurance pay for a toilet that overflowed?",
      a: "Ask your insurer. A sudden overflow and a leak that seeped for months are described differently in a lot of policies. We document what we see and repair what you hire. We cannot promise approval or a dollar amount. We are not public adjusters.",
    },
    {
      q: "Can I use the other bathroom?",
      a: "Yes. Leave the overflowed toilet off until someone who understands the clog or the valve has looked. If the only bathroom is the wet one, tell us. We still do not want you flushing the same clog again tonight.",
    },
    {
      q: "How do I know if the unit under me is wet?",
      a: "Look, or ask. An upstairs toilet often shows up on the ceiling below. Tell the manager. We meter that ceiling instead of assuming the whole stack. A ground-floor slab holds the water at the baseboard instead.",
    },
    {
      q: "What does this usually cost, and do I have to be out of the house?",
      a: "A contained overflow at the base is not a whole-bath remodel. As a range, not a quote, drying and a limited repair often plan in the low thousands, more if the floor and the ceiling below are involved. You can often stay in the dry rooms. Sewage may mean staying out of that bath.",
    },
  ],
};

export const stormFaqs: Faq[] = [
  {
    q: "When is hurricane season in Houston?",
    a: "June 1 through November 30. Storms do not read the calendar. Spring hail and a hard freeze sit outside those dates and still damage houses. This page stays up between named storms. If one just hit, follow the steps above and call " + phone + ".",
  },
  {
    q: "Do I need flood insurance before a hurricane?",
    a: "If you want flood coverage, you need it before the water rises. A homeowners policy usually does not cover water that comes in from a street, a bayou, or a reservoir. Most flood policies have a waiting period, often about 30 days. We do not sell insurance. Ask your agent what is on the house today.",
  },
  {
    q: "What if I live in Galveston, Seabrook, or La Porte?",
    a: "Those areas can be on a wind policy through TWIA instead of wind coverage inside a homeowners policy. TWIA is for the Texas coast, including Galveston County and a few communities in far east Harris County east of State Highway 146. Most of the rest of Houston is not TWIA. Ask your agent which policy you have. We document the building either way.",
  },
  {
    q: "How do I find my hurricane deductible?",
    a: "Look at the declarations page or ask your agent. Many wind and hurricane deductibles are a percentage of the insured value, separate from a pipe-break deductible. We do not know yours, and we do not waive it. Our estimate is the cost of the work, not the claim payment.",
  },
  {
    q: "Do I need to be home for the tarp or the board-up?",
    a: "Someone with access does. That can be you, a spouse, or a property manager. You do not need to climb. Tell us which rooms are wet and whether a dog or a gate code is part of the visit. We photograph openings before we cover them when it is safe.",
  },
  {
    q: "How fast can you come after a storm hits the whole city?",
    a: "Call and we will tell you the next safe step. We do not climb in lightning. A citywide hurricane or hail storm means a longer line than a single leaking house on a quiet Tuesday. Calling puts the address on the list. The form on the site asks us to call you back. It does not reserve a truck.",
  },
  {
    q: "What should an apartment manager prepare?",
    a: "The address, the gate code, which units are open or wet, and who can approve the work. A list is more useful than a message that says the whole property. We handle houses, apartments, and commercial buildings. Residents do not have to all be home if someone can let us into the wet units.",
  },
  {
    q: "Is the February 2021 freeze the same kind of claim as a hurricane?",
    a: "No. That freeze burst pipes and knocked out power. A hurricane is usually wind, an open roof, and rain driven in. They can both wet a house, and they are still different facts. We write down which one happened. Your insurer decides which policy language applies. We do not rename one as the other.",
  },
];

export const restorationFaqs: Faq[] = [
  {
    q: "How fast can you come out in Houston?",
    a: `For water that is still moving, or a building that is open to the weather, call ${phone} any time. We tell you the next safe step. We do not promise a drive time, and we do not climb in lightning. After a citywide storm the line is longer. Office hours for a scheduled visit are Monday through Saturday, 8:00 AM to 6:00 PM.`,
  },
  {
    q: "Do I need to be home?",
    a: "Someone needs to let us in if the work is inside. For a roof, we need the yard and a person we can call. You do not have to stand outside the whole visit. A property manager can meet us at an apartment or a commercial building. Tell us about pets and gate codes.",
  },
  {
    q: "How long does a dry-out take here?",
    a: "It depends on what got wet and how long it sat. Houston humidity slows drying. We do not pull equipment because a fixed number of days passed. We use moisture readings. A room that looks dry can still be wet in the wall or the slab.",
  },
  {
    q: "Do you remove mold?",
    a: "We dry buildings and remove wet material that cannot dry in place. We are not a mold testing lab, and we do not promise a mold-free house. If you see growth, tell us. We will say what we can open and dry, and what should go to someone whose work is mold. Your policy may treat a sudden leak differently from growth that went on for months.",
  },
  {
    q: "Will insurance cover the restoration?",
    a: "We cannot say, and we do not promise approval or a payout. We help document the damage and work with your adjuster. You file the claim. A burst pipe, hail, a hurricane, a tornado, and rising floodwater are different events. Check the policy that matches the one you had.",
  },
  {
    q: "What is the difference between floodwater and a pipe break?",
    a: "Floodwater rose from outside, often from a street or a bayou, and it is often a separate policy. A pipe, a water heater, a dishwasher, or a toilet is water from the building. We write down the source we can see. We do not rename floodwater so it sounds easier to cover.",
  },
  {
    q: "What should I know about the 2021 freeze?",
    a: "The February 2021 freeze left a lot of Houston attics and exterior walls without heat, and pipes split when they thawed. A freeze is a plumbing loss. It is not a hurricane. Whether a policy pays often depends on its wording, including heat and shutoff language. That decision belongs to your insurer. We dry and repair what you hire.",
  },
  {
    q: "Do you restore apartments and commercial buildings too?",
    a: "Yes. Managers and owners can call any time if the emergency is still going. Have the address, the access, and which units are wet. Houses use the same trades. We are a family company in Houston since 1993. We are not a preferred vendor for an insurance company.",
  },
];

assertFaqMap(costFaqs);
assertFaqMap(waterFaqs);
assertFaqSet("storm", stormFaqs);
assertFaqSet("restoration", restorationFaqs);
