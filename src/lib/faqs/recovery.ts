import { assertFaqMap, type Faq } from "@/lib/faqs/types";

const phone = "(713) 909-0034";

export const recoveryFaqs: Record<string, Faq[]> = {
  "water-damage-restoration": [
    {
      q: "Do I need to be home while the fans are running?",
      a: "Someone needs to let us in to set the equipment and to check the readings. You do not have to sit beside a fan all day. If you leave, we need a way back in for the daily check. Tell us about pets. The equipment stays until the materials are dry, not until the room looks dry.",
    },
    {
      q: "How long does drying usually take in Houston?",
      a: "It depends. A small clean-water leak caught early is a shorter job than a soaked wall, a wet slab, and insulation. Gulf humidity slows it. We do not pull the fans because a calendar said three days. We pull them when the moisture readings support it.",
    },
    {
      q: "How fast can you come out for standing water?",
      a: `Call ${phone} any time if water is still spreading or it is near power. We tell you the next safe step. We do not promise a drive time. After a hurricane or a citywide freeze, the line is longer. Calling puts the address on it.`,
    },
    {
      q: "Can I stay in the house during the dry-out?",
      a: "Often, in the rooms that stayed dry, if the power is safe and the wet room can be closed off. Sewage, a sagging ceiling, or water at the breaker panel is a reason to leave. We say which one you have. Children and pets should stay out of the wet rooms.",
    },
    {
      q: "Should I turn the air conditioner off?",
      a: "Usually, no. Houston air through an open window adds moisture. The air conditioner and our dehumidifiers do different jobs. We will tell you if a wet ceiling means the system should stay off. Do not run the unit if water reached it.",
    },
    {
      q: "Will insurance pay for drying before the adjuster arrives?",
      a: "We cannot say. Many policies expect you to limit more damage, and waiting on a visit while water sits is how the loss grows. That is not a promise of payment. You hire the dry-out. Your insurer decides the claim. We help document what we dried.",
    },
    {
      q: "Is bayou water the same dry-out as a supply-line leak?",
      a: "No. Water that rose from a street, a bayou, or a reservoir is flooding. A burst supply is a different source and often a different policy. We write down how the water got in. We do not rename floodwater to make a claim sound simpler. Check your policies.",
    },
    {
      q: "What should a renter do if the landlord is slow?",
      a: "Stop the water if you can do it safely, photograph the rooms, and tell the manager in writing. If water is still moving, call us and tell us you rent. We still need someone who can approve work in the unit. We do not enter because a neighbor waved us in.",
    },
  ],
  "insurance-claims": [
    {
      q: "Where is my deductible written?",
      a: "On the declarations page of the policy, or ask your agent to read it to you. Wind, hail, and hurricane deductibles are often separate from the deductible for a broken pipe. We do not have the page, and we do not waive whatever it says.",
    },
    {
      q: "What is a hurricane or wind deductible?",
      a: "On many Texas policies it is a percentage of the insured value, not the flat amount people remember from a kitchen leak. The trigger and the percentage are in your policy. Ask your insurer which deductible applies to this storm. We price the repair. We do not calculate your payout.",
    },
    {
      q: "Does homeowners insurance cover flooding in Houston?",
      a: "Usually a homeowners policy does not cover water that rises from a street, a bayou, or a reservoir. Flood insurance is a separate policy. Most flood policies have a waiting period, often about 30 days, so buying one while a storm is in the Gulf is often too late. We do not sell insurance. Ask your agent.",
    },
    {
      q: "What is TWIA, and do I have it?",
      a: "TWIA is wind and hail coverage for the Texas coast. It includes Galveston County and a few communities in far east Harris County, east of State Highway 146, including Seabrook, La Porte, Shoreacres, Morgan's Point, and part of that side of Pasadena. Most of Houston is not TWIA. If your homeowners policy already includes wind and hail, that is usually the policy. Ask your agent. We do not interpret the contract for you.",
    },
    {
      q: "Will you negotiate my claim for a fee?",
      a: "No. We are not public adjusters. We help document the damage and work with your adjuster. We photograph, we can meet on site, and we write a repair estimate. You file the claim. Your insurer decides coverage and payment. We do not take a percentage of a settlement.",
    },
    {
      q: "Can you meet the adjuster if I am at work?",
      a: "Yes, if you want us there and we can get in. Tell the adjuster and tell us. We walk through what we saw. We do not speak as your legal representative. A property manager can stand in the same role for an apartment or a commercial building.",
    },
    {
      q: "How are hail, hurricane, flood, and tornado claims different?",
      a: "They are different events, and a building may have more than one policy. Hail and wind are often on the homeowners or a wind policy. Rising water is often flood. A tornado is documented as what it did to the building, not as a nickname that changes coverage. We describe what we see. Check the policies.",
    },
    {
      q: "Should I wait to call you until the claim is approved?",
      a: "No, if water is still coming in or a room is wet. Limit more damage first. Approval can take longer than wet drywall should sit in Houston humidity. Calling us is not the same as filing. You still call your insurer. We cannot promise the claim will be approved.",
    },
  ],
  "emergency-board-up": [
    {
      q: "Do I need to be home for a board-up?",
      a: "Someone with authority has to give us access and point out every opening. That can be you or a manager. You do not have to hold the plywood. Tell us about alarms, pets, and whether the room inside is wet. We photograph the opening before we cover it.",
    },
    {
      q: "How long can the board stay up?",
      a: "Until the glass, the door, or the wall is ready to be permanent. Houston sun and rain are hard on a temporary cover. We fasten it to sound framing so it can sit, and we tell you it is not the finished front of the house. A board through hurricane season should be checked after the next wind.",
    },
    {
      q: "Will boarding the opening hurt the insurance claim?",
      a: "Covering an open wall limits more rain and is what a lot of policies expect you to do. It is not a promise of payment. We take photos first when it is safe, so the opening is not a mystery after the board is on. Your insurer decides the claim.",
    },
    {
      q: "Who pays for the board-up?",
      a: "The owner or manager who hires us. Whether an insurer later includes that bill is their decision. A ground-floor opening often plans from a few hundred dollars to about $1,500, and more for a glass line or a second story. That is a range, not a quote.",
    },
    {
      q: "Can you board a second-story window?",
      a: "When we can reach it safely. A ladder in the wind is a reason to wait for daylight. We say what we can cover on that visit and what has to wait. We do not lean a ladder into lightning to save an hour.",
    },
    {
      q: "What if the opening is a sliding glass door?",
      a: "We board the opening so people and weather stay out. The door itself may be a special order. The board is the pause. Measure the opening in the photos so the replacement is not a guess. Tell us if the track is bent.",
    },
    {
      q: "Should I leave the lights on inside?",
      a: "If the power is safe and you want the house to look occupied, a light can help. Do not turn power on if water is at the outlets or the panel. Security is part of why an open storefront gets boarded the same night. We are not an alarm company.",
    },
    {
      q: "What should a property manager have ready?",
      a: "The address, a way in, the unit or suite numbers, and which openings are glass versus roof. A list beats a voicemail that says the whole building. Call " + phone + ". We work houses, apartments, and commercial fronts.",
    },
  ],
  "fence-installation-repair": [
    {
      q: "Do I need to be home while the fence is built?",
      a: "Yes when we mark the line, and someone should be reachable on build day. You do not have to watch every post. If the property line is disputed, a survey comes before the holes. Dogs need a plan for the day the yard is open.",
    },
    {
      q: "How long does a fence take?",
      a: "A short repair can be a day. A full backyard depends on the length, the gates, and how the clay digs. HOA approval, when it applies, sits in front of the start. We tell you the sequence after we walk the fence. Rain can pause the holes.",
    },
    {
      q: "Will Houston clay rot the posts?",
      a: "Wet clay at the bottom of a post is the usual failure, more than the stain color. We set posts for that soil. A fence that failed in a year was often standing in water. Shade and sprinklers make it worse. We look at where the water sits.",
    },
    {
      q: "Does a fence need a City of Houston permit?",
      a: "Sometimes, depending on the height and the address. An HOA review is a separate yes. Bellaire, a Memorial village, Sugar Land, and a county lot are not the Houston permit counter. We check before we dig. We do not guess from a neighborhood nickname.",
    },
    {
      q: "What if the HOA and the neighbor disagree?",
      a: "We build where you show us, on the style the association approved if one applies. We do not settle a boundary fight. A survey is the tool for the line. A friendly agreement that is not written down is how the second fence gets built.",
    },
    {
      q: "Can hurricane wind take a new privacy fence?",
      a: "A tall solid fence is a sail. Hurricane season is June 1 through November 30, and spring storms blow too. Good posts matter more than a thick stain. We do not promise a fence will ignore a major hurricane. We build it so the posts are the part that holds.",
    },
    {
      q: "Is wood or metal a better Houston fence?",
      a: "It depends on the yard and the rules. Wood is common and it wants maintenance in this humidity. Metal handles rot differently and still needs posts that stay put in clay. We look at what is there and what the association allows.",
    },
    {
      q: "Do I have to be there when you dig?",
      a: "Someone who knows the sprinkler lines and the property line should be, or those lines should be marked. We call before we dig utility locates the way the job requires. A surprise irrigation pipe is easier to avoid than to repair.",
    },
  ],
  gutters: [
    {
      q: "Do I need to be home for gutter work?",
      a: "Someone should walk the overflows with us and be reachable. You do not have to be on a ladder, and you should not be. Access around the air conditioner and the fence is the practical part. Tell us if a dog has the side yard.",
    },
    {
      q: "How long does gutter replacement take?",
      a: "A one-story house is often a day once the material is here. Two stories, a lot of corners, or rotten fascia take longer. If the roof is about to come off, we wait so the new gutters are not bent by the tear-off. We sequence those on purpose.",
    },
    {
      q: "How often should Houston gutters be looked at?",
      a: "At least when the pines and the oaks drop, and after a hail storm. A gutter full of needles overflows in a normal thunderstorm, not only in a hurricane. We repair and replace. A cleaning is not a new gutter. If the board is soft, we say so.",
    },
    {
      q: "Can leaves cause a leak inside the house?",
      a: "They can. Overflow at the eave runs behind the fascia and into the wall or the soffit. That stain is sometimes the gutter, sometimes the roof. We look at both before we sell a downspout. If the ceiling is wet, say so. That may also need drying.",
    },
    {
      q: "Should downspouts drain into the yard or the street?",
      a: "Away from the slab. Water dumped at the foundation keeps the clay wet against the house. We aim the outlets out. We do not claim a gutter stops foundation movement. Where the water is allowed to go is also a neighbor and a drainage question.",
    },
    {
      q: "Will an HOA review gutter color?",
      a: "Some do, especially if the color hits the trim they already approved. Many do not. We ask when you know there is an association. It is not the same as a roof permit. A like-for-like repair is usually simpler than a new color.",
    },
    {
      q: "Can you do gutters and a roof on the same visit?",
      a: "The decisions can happen together. The install should not. New gutters go on after the roof is done, or the tear-off wrecks them. If hail hit both, we photograph both. They can be one storm and two lines on an estimate.",
    },
    {
      q: "The fascia is stained and the roof looks fine. What now?",
      a: "Call and we will look at the gutter, the drip edge, and the wood. A stained fascia is often overflow or a failed gutter seam. It can also be a roof edge. Stay off the roof. We say which one we can see.",
    },
  ],
  patios: [
    {
      q: "Do I need to be home while the patio is poured?",
      a: "Yes for the layout, so the slope and the door threshold are what you will live with. On pour day, someone should be reachable. You do not have to finish the concrete. Sprinklers should be off. Pets stay inside.",
    },
    {
      q: "How long does a new patio take?",
      a: "A straightforward concrete pad depends on the size, the forms, and the concrete schedule. Pavers take a different rhythm. A cover is extra time and usually a permit. Rain delays mud work. We put the sequence in the estimate instead of a fake week count.",
    },
    {
      q: "Does a ground-level patio need a City of Houston permit?",
      a: "A simple pad often does not. A cover, posts, and a roof usually do. The Memorial villages, Bellaire, Sugar Land, and a county address in Katy or The Woodlands have their own rules. An HOA can still review a pad the city ignores. We check the address.",
    },
    {
      q: "Will Houston rain pond on a flat slab?",
      a: "Yes, if the slab is flat or tilted toward the house. We set the fall away from the foundation and below the door. A coating will not fix a backward slope. That is a rebuild of the slope, not a sealer.",
    },
    {
      q: "Can you fix a patio that floods the back door?",
      a: "If the water is coming from the patio slope, yes, that is the job. If the water is rising from the yard in a storm, the patio is not a flood wall. Tell us which one happens. Street and bayou water are a different problem from a bad pour.",
    },
    {
      q: "Pavers or concrete in Houston clay?",
      a: "Both can work. Concrete is simpler on an open yard. Pavers can be lifted if a section settles in clay. Neither survives a slope toward the house. Shade, tree roots, and how you want the yard to age in the sun decide it with you.",
    },
    {
      q: "Can the grill and the air conditioner stay?",
      a: "Often, if we can form around them or you can move the grill. An air conditioner that sits in the new pad needs a plan so we do not block the pad or the drain. Tell us before the forms go in. Moving a condenser is not a patio extra we invent later.",
    },
    {
      q: "What if the HOA wants a specific paver?",
      a: "Then that paver is the one we price, after they approve it. We do not install a color you like and hope the architectural committee agrees. Approval time sits in front of the start. The city permit, if the job is a cover, is separate.",
    },
  ],
  gazebos: [
    {
      q: "Do I need to be home while the gazebo goes up?",
      a: "Yes when we place it, so the view and the drainage are right. Build days need yard access and a person we can call. You do not have to be under the frame. Tell us about sprinklers, septic, and the neighbor's setback if you know it.",
    },
    {
      q: "How long does it take to build a gazebo?",
      a: "It depends on the size, the footings, and whether we are repairing one or building new. A permit or an HOA review can take longer than the carpentry. We tell you the sequence after we see the yard. Weather delays concrete.",
    },
    {
      q: "Can we use a gazebo all through hurricane season?",
      a: "You can use it in ordinary weather. Hurricane season is June 1 through November 30. We build footings and a real roof. We do not promise any yard structure will ignore a major hurricane. Loose furniture should come inside when a storm is close.",
    },
    {
      q: "Screened or open, in this humidity?",
      a: "Screens help with mosquitoes and they cut the breeze. An open gazebo dries faster after rain. Either one needs a roof that sheds water away from the posts. We talk about how you will sit out there in August, not only in April.",
    },
    {
      q: "What if we want a fan and lights?",
      a: "Then it is electrical work, and it may be its own permit. We do not hide a wire in a post and call it done. Say so at the start so the roof and the power are planned together. The fan does not replace a structure that can take wind.",
    },
    {
      q: "What if the yard floods?",
      a: "Tell us. A gazebo is not a fix for a low yard. Footings in a spot that holds bayou water need an honest conversation. Rising water and a roof leak are different. If a storm destroyed the one you had, stay out from under it and call.",
    },
    {
      q: "Wood roof or metal roof?",
      a: "Both are real roofs if they are detailed. Metal sheds rain well and shows hail. Wood shingles need the same care as a small house roof. We match the choice to the HOA and the trees. A kit roof that cannot be anchored is not the same thing.",
    },
    {
      q: "How do I ask for a gazebo visit?",
      a: `Call or text ${phone}. The office is open Monday through Saturday, 8:00 AM to 6:00 PM, at 511 Crestwater Ct, Houston, TX 77082. If wind already dropped one, say that. We photograph what is left. Your insurer decides any claim.`,
    },
  ],
  decks: [
    {
      q: "Do I need to be home during a deck build?",
      a: "For the layout and the stair, yes. During the build, someone needs to give us access and keep kids off open joists. You can be at work if we can reach you. Pets and a pool gate should be part of the first call.",
    },
    {
      q: "How long does a deck take to build?",
      a: "A low platform and a second-story deck are different jobs. Material, rails, and a permit sit in the schedule. An HOA review can be the long part. We give you the sequence after we see the house. Rain pauses footings.",
    },
    {
      q: "Does an attached deck need a permit in Houston?",
      a: "Usually, yes, in the City of Houston, because it is a structure tied to the house. A ground-level patio often does not. Other cities and the counties have their own rules. We confirm from the address before we start.",
    },
    {
      q: "Will the HOA review the railing?",
      a: "Often, along with the stain or the composite color. That review is not the building permit. We wait when a review applies. A rail that does not match the association's rule is an expensive board to take down.",
    },
    {
      q: "How do you keep the house connection from rotting?",
      a: "The ledger and the flashing are part of the design, not a trim detail at the end. Houston humidity and a splash from the roof are why that joint fails. We do not bolt a deck to siding and hope. If the existing ledger is soft, it gets replaced.",
    },
    {
      q: "Can we stay in the house while you build?",
      a: "Yes. Expect noise at the wall and a door you may not want open onto the work. If the deck is second-story, the room inside hears it. We keep the house closed to the weather. An open ledger in a storm is not how we leave the day.",
    },
    {
      q: "What if the posts sit in water after every rain?",
      a: "Then the drainage is part of the deck. A new board on a post that stands in clay soup repeats the failure. We look under the deck, not only at the stain on top. Sometimes the honest answer is a patio instead of a low deck.",
    },
    {
      q: "Composite or wood for a sunny pool deck?",
      a: "Composite handles bare feet and sun better, and it still needs a sound frame and airflow. Wood costs less at the start and wants finish in this heat. We decide with the yard. Neither one is a promise against hurricane wind.",
    },
  ],
  "commercial-storm-restoration": [
    {
      q: "How fast can you get to an apartment community?",
      a: `Call ${phone} any time for an active leak, an open roof, or broken glass. We tell you the next safe step. We do not promise a drive time. After a hurricane, we triage open buildings and active water. A unit list is faster than a voicemail that says everything is wet.`,
    },
    {
      q: "What should a manager have ready?",
      a: "The street address, gate codes, the units or suites that are wet, and who can approve the work. Photos help. If residents are home, say so. We do not enter a unit because the door was ajar. A map of the stack beats a guess.",
    },
    {
      q: "Do residents need to be home?",
      a: "Someone who can legally let us in does. That may be the resident or the manager with permission. We work around occupied units. We do not dry a whole building because one ceiling is stained. Pets and alarms are worth a note on the list.",
    },
    {
      q: "Is a street flood the same as a pipe in one unit?",
      a: "No. Rising water from a street or a bayou is often a flood policy. A supply line, a water heater, or a washer on an upper floor is a different cause, and it may wet the ceiling below. We write the cause we can see. Check the policies. We do not rename the water.",
    },
    {
      q: "Can you work around an open store?",
      a: "Often, if we can keep a safe path for customers or close the damaged room. An open storefront at night is a board-up first. Drying and rebuild follow. Tell us the business hours. We would rather phase the work than shut a shop that can stay open.",
    },
    {
      q: "Who signs, the owner or the manager?",
      a: "Whoever has authority to hire the work. We ask. A manager who can approve a dry-out is enough to start when the owner has given that authority. We do not assume a leasing agent can sign a roof. The invoice follows the party who hired us.",
    },
    {
      q: "How do you keep unit photos straight?",
      a: "Each set is labeled with the unit or the suite, the room, and the date. Wide shots and close shots stay with that label. A stack of ceilings from one riser is not one photo called the building. You can hand that record to your insurer. We are not public adjusters.",
    },
    {
      q: "What is different after a hurricane versus one burst stack?",
      a: "A hurricane may open the roof, the glass, and several units at once. A burst stack is often one line and the ceilings under it. Wind, flood, and a pipe can land in the same week and still be different claims. We document them separately. Your insurer decides payment.",
    },
  ],
};

assertFaqMap(recoveryFaqs);
