import type { GuideSection } from "@/lib/guides/types";

const phone = "(713) 909-0034";

type Page = {
  slug: string;
  name: string;
  metaTitle: string;
  description: string;
  lede: string;
  sections: readonly GuideSection[];
  faqs: readonly { q: string; a: string }[];
};

function disclaimer(name: string) {
  return `Elite Restorations is not affiliated with, endorsed by, or a preferred vendor of ${name}. We work for whoever hires us, not for ${name}, and their logo is not ours to use. We help Houston homeowners, property managers, and building owners who are insured by ${name} document water, storm, or roof damage. ${name} decides coverage, deductibles, and payment under the policy. Check that policy. We are not public adjusters. Only ${name} can say whether a claim will be approved or paid.`;
}

function tail(name: string, extras: { q: string; a: string }[]) {
  return [
    ...extras,
    { q: `Are you a ${name} partner?`, a: `No. We are independent and not affiliated with ${name}. You hire Elite Restorations. ${name} decides the claim.` },
    { q: "Do you promise payment?", a: `We take photos, limit further damage, write an estimate, and meet the adjuster if you want us there. ${name} decides coverage. Check your policy.` },
    { q: "Is flooding a different policy?", a: "Rising water is often a different policy from wind, hail, or a sudden pipe break. We keep those causes separate. Ask your insurer." },
    { q: "Hurricane, hail, wind, or tornado damage?", a: `We document the damage, protect the building when it is safe, dry it, and estimate repairs. You file the ${name} claim. We do not give legal advice.` },
    { q: "Which photos help?", a: "Wide shots, close shots of the source, and belongings before cleanup. The photo log on this site is free. Photos do not create coverage." },
    { q: "Will you meet the adjuster?", a: "Yes, if you ask. We explain the building. Your insurer handles the settlement." },
    { q: "Apartments and commercial buildings too?", a: `Yes. Call ${phone} any time for an active storm or water emergency at a house, an apartment, or a commercial building.` },
  ];
}

export const moreInsurers: readonly Page[] = [
  {
    slug: "farmers",
    name: "Farmers",
    metaTitle: "Farmers Claim Help in Houston",
    description: "Houston owners insured by Farmers: storm and water documentation and repairs. Not affiliated with Farmers. Call (713) 909-0034.",
    lede: "Farmers policyholders in Houston often start with the agent who sold the policy. That call is yours. If the roof is open or the floor is wet, call us too. We are not Farmers.",
    sections: [
      { eyebrow: "Not affiliated", heading: "An agent relationship is not our relationship.", paragraphs: [disclaimer("Farmers"), "We do not know which Farmers agent you use, and we will not call ourselves part of that agency. Ask Farmers how they want notice. Write the claim number down. Our work is the building at the address you give us, from the office at 511 Crestwater Ct, Houston, TX 77082."] },
      { eyebrow: "The path", heading: "Notice, protection, inspection, repair.", paragraphs: [
        "A Texas homeowner's water or storm claim usually moves in that order. It is a description of what we see, not a Farmers procedure we are quoting. Your policy sets the proof and the timing. We will not invent a 48-hour rule or any other deadline.",
        "Houston protection means a tarp when hail or a hurricane opens a roof, board-up when glass is gone, and drying when a pipe, a water heater, a dishwasher, or a toilet puts water on a slab. Hurricane season is June 1 through November 30. Spring hail hits suburbs from Katy to The Woodlands. A freeze is the week attic lines fail. Farmers decides whether any of that is covered. We decide whether the roof is safe to stand on.",
        "If a Farmers adjuster comes, we can walk with them at your request. We show what we photographed and what we are pricing. Depreciation, the amount some policies hold back until the work is finished, is for Farmers to discuss. The estimate is the construction price. Any payment is Farmers' decision.",
      ] },
      { eyebrow: "Documentation", heading: "Keep the evidence the cleanup will erase.", paragraphs: [
        "Photograph before carpet leaves and before a tarp covers the hole. Note roof versus pipe versus street water. Flood from a bayou is not a kitchen supply line. We will not rewrite it.",
        "Our drying notes and repair photos can go to Farmers with your claim number on your copy, not on our letterhead as if we were the insurance company. The photo log and the Texas claims guide are the longer how-to. They explain the steps. They do not promise payment.",
      ] },
      { eyebrow: "Houston", heading: "Same slabs, same storms, a different insurer.", paragraphs: [
        "Westchase, Alief, Sugar Land, Bellaire, and Memorial houses on concrete need the same moisture map whether the policy says Farmers or someone else. Apartment managers with a Farmers policy on the building should bring unit numbers. One stained ceiling is not a reason to dry every unit.",
        "Family-owned since 1993. Call or text " + phone + " any time for an active emergency. Office hours Monday through Saturday, 8:00 AM to 6:00 PM. We are not Farmers.",
      ] },
      { eyebrow: "On site", heading: "Emergency work and the repair, kept separate.", paragraphs: [
        "We tarp, board up, remove water, and dry. Then we repair what you hire: roofs, drywall, floors. A Farmers check, if one is issued, does not have to match our invoice line for line. We will explain the work. Ordinary wear stays wear in our notes, and a slow leak stays a slow leak.",
        "Call " + phone + " when water is still moving or the building is open. Text if you cannot talk. The emergency form asks us to call you back. We'll call you back as soon as we can. A citywide storm can slow that down.",
      ] },
      { eyebrow: "After the call", heading: "What a Farmers policyholder can expect from us.", paragraphs: [
        "The first visit is a look, not a speech about what Farmers owes. On a house we walk the wet rooms or the roof from a safe place, photograph what is already damaged, and say whether the next hour is a tarp, a board-up, drying, or a scheduled repair. On an apartment community we need the unit numbers and a person who can open doors. On a small commercial building we need to know what is under the leak: stock, a server closet, or an empty suite. Those details change the order of work. They do not change who decides the claim.",
        "Drying on a Houston slab means meters, water removal, air movers, and dehumidifiers, because the air outside is often too wet to finish the job. We leave a wall open until it is dry, even if a tenant wants paint the same night. Repairs, drywall, flooring, and roofing, start when the readings support them. The price we give is for that construction. A Farmers payment, if one arrives, is a separate event. The two numbers do not have to match. A slow leak stays a slow leak in our notes.",
        "Neighborhoods we actually drive: Houston, Westchase, Alief, the Energy Corridor, Katy, Sugar Land, Bellaire, Memorial, The Woodlands, Pearland, and Clear Lake. The office is 511 Crestwater Ct. Family-owned since 1993. If you only wanted the photo habit and not a crew, the photo log on this site is free and it does not create coverage with Farmers or anyone else. A tarp, a board-up, and a dry-out can happen the same day and still be three lines on the estimate. We label them that way so a Farmers file can be read without guessing.",
      ] },
    ],
    faqs: tail("Farmers", [
      { q: "Should I call my Farmers agent first?", a: "Call us if the building is getting worse. Notice to Farmers is still your job. Ask them how they want it, and keep the claim number." },
      { q: "Can you tell me the Farmers deductible?", a: "No. We will not guess a wind or hail percentage. Read the declarations or ask Farmers." },
      { q: "Do you work only on roofs?", a: "No. Roofs, tarps, board-up, and indoor water from pipes and appliances. The cause stays what we can see." },
      { q: "What if Farmers wants to inspect before repairs?", a: "Ask them. We still photograph and protect an opening that is letting weather in, when it is safe. Permanent finishes can wait. More water should not." },
    ]),
  },
  {
    slug: "liberty-mutual",
    name: "Liberty Mutual",
    metaTitle: "Liberty Mutual Claim Help, Houston",
    description: "Houston storm and water damage help for people insured by Liberty Mutual. Not affiliated. Call (713) 909-0034.",
    lede: "Liberty Mutual is a national name on a lot of Houston policies. The name does not pick your contractor. Elite Restorations documents and repairs the building. Liberty Mutual decides the claim.",
    sections: [
      { eyebrow: "Not affiliated", heading: "National brand, local building, no partnership.", paragraphs: [disclaimer("Liberty Mutual"), "Liberty Mutual's slogans, deductibles, and claim-center scripts are not ours to quote. You call the number on your policy for notice. You call " + phone + " for the open roof or the wet floor. Both calls can happen the same hour."] },
      { eyebrow: "The path", heading: "What usually happens, without pretending it is your form.", paragraphs: [
        "Homeowners in Texas generally give notice, protect the property, meet an inspection, and then repair. Your Liberty Mutual policy may describe that differently. Read it or ask them. Where the policy is quiet, we leave it quiet.",
        "The Houston events are concrete. Hail and wind on asphalt roofs. Hurricane rain through a lifted valley between June and November. A burst pipe or water heater on a slab after a freeze or on an ordinary Tuesday. A dishwasher or toilet that crosses a hallway. We photograph the one you have. Apartments and commercial buildings insured by Liberty Mutual get a unit or suite list, not a guess.",
        "An adjuster visit is Liberty Mutual's inspection. We attend if you want a contractor in the room to explain the tarp, the meters, and the estimate. The coverage decision stays in the policy.",
      ] },
      { eyebrow: "Documentation", heading: "Photos that still make sense after the dumpster.", paragraphs: [
        "Wide, close, source, belongings. Do this before cleanup. Keep a failed hose. Write the claim number on your own notes. Our photos of drying and repairs are a second set you may share.",
        "Limiting further damage is a phrase many policies use. Whether Liberty Mutual pays the bill for those steps is not something we will predict. We do the work you authorize. A safe tarp goes on so a wet ceiling does not get wetter.",
      ] },
      { eyebrow: "Houston", heading: "Heat, slabs, and the deductible we will not guess.", paragraphs: [
        "People ask us to beat the deductible or to say whether Liberty Mutual uses a percentage for wind. That number is on your declarations page. What we will say is whether the roof in front of us can be repaired or needs to come off, and how far the water went in the slab.",
        "Office: 511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. Call or text " + phone + ". Emergencies any time. Visits Monday through Saturday, 8:00 AM to 6:00 PM. We are not Liberty Mutual.",
      ] },
      { eyebrow: "On site", heading: "Scopes a Liberty Mutual file can actually read.", paragraphs: [
        "We keep the emergency cover separate from the permanent roof, and the dry-out separate from the rebuild. Mixing them makes a file that is hard to follow. We describe hail and wear as we see them. Flood stays flood, and a pipe stays a pipe.",
        "If you want us at the adjuster meeting, say so when you call " + phone + ". We bring the photos we took. What Liberty Mutual owes is their decision, not our script.",
      ] },
      { eyebrow: "After the call", heading: "A Liberty Mutual household still gets a normal Houston job.", paragraphs: [
        "What we have is the building, not a Liberty Mutual playbook. A hail-bruised roof in Cypress is inspected on the slopes, not judged from the curb. A supply line under a Katy slab is mapped with meters before anyone talks about new floors. A storefront on Richmond with broken glass gets board-up when the opening is safe to cover, and photos before the plywood hides it. Hurricane season, June 1 through November 30, is when several of those can be true on the same block.",
        "You can hire us before Liberty Mutual has set a number, and you can also decide not to. Steps that limit further damage are often what a policy expects. That is not a receipt Liberty Mutual has promised to pay. We bill the person who signs for the work. Liberty Mutual's estimate, if they write one, can be compared with ours as two descriptions of the construction. We will explain ours. A dispute, if you have one, is yours to handle.",
        "Call or text " + phone + ". The office at 511 Crestwater Ct, Houston, TX 77082, is open Monday through Saturday, 8:00 AM to 6:00 PM for a calm visit. Active water and open roofs are answered any time, including for apartment managers and commercial owners who happen to be insured by Liberty Mutual. The insurance name is not on the truck. A wind deductible percentage, if the policy uses one, is on the declarations page. Ask Liberty Mutual to point at the wording. We leave their sentence as they wrote it. The building work still starts with a safe look, photos, and a list of the work you can read. Liberty Mutual can inspect on their schedule. We still dry a wet wall the day we are hired, because Houston humidity will not wait on a calendar.",
      ] },
    ],
    faqs: tail("Liberty Mutual", [
      { q: "Can you tell me if Liberty Mutual will approve the roof?", a: "No. We can say what the roof needs as construction. Approval is Liberty Mutual's decision after they see the policy and the damage." },
      { q: "Do you match a Liberty Mutual estimate?", a: "We price the work we recommend. If their figure is different, we explain our work. We do not rewrite it to chase their number, and we do not negotiate the claim." },
      { q: "Is a percentage deductible automatic?", a: "We do not know what your policy says. Many Texas wind or hail deductibles work that way. Yours might not. Check it." },
      { q: "Can a property manager use this page?", a: "Yes, if the building is insured by Liberty Mutual. We are still not their vendor. Call " + phone + " with the address and the access." },
    ]),
  },
  {
    slug: "travelers",
    name: "Travelers",
    metaTitle: "Travelers Claim Help in Houston",
    description: "Help for Houston homeowners and building owners insured by Travelers. Documentation and repairs. Not affiliated. Call (713) 909-0034.",
    lede: "Travelers shows up on Houston houses and on some commercial policies. We do not know which one you have, and we are not a Travelers contractor. We repair buildings. Travelers handles claims.",
    sections: [
      { eyebrow: "Not affiliated", heading: "House policy or building policy, still not our partner.", paragraphs: [disclaimer("Travelers"), "A homeowner and a commercial certificate are different documents. Tell us which you think you have, and then confirm it with Travelers. We will not treat a shop policy and a house policy as the same claim just because the roof leaked."] },
      { eyebrow: "The path", heading: "The sequence we see, not a Travelers manual.", paragraphs: [
        "Notice to Travelers, protection of the property, an inspection, and a repair. That is the ordinary Texas path. Travelers may ask for notice in a specific way. Ask them. Keep the claim number. You file the claim. Their timelines are theirs to quote.",
        "On site in Houston we tarp storm openings, board broken glass, and dry water from roofs, pipes, heaters, dishwashers, and toilets. Slabs hold moisture. Hurricane season runs June 1 through November 30. Hail is a spring and summer problem inland. A freeze is occasional and brutal on attic lines. We write the cause we can see.",
        "Commercial and apartment losses need a list of suites or units and a person who can approve openings. We can meet a Travelers adjuster on site. We explain the building. Travelers negotiates the loss.",
      ] },
      { eyebrow: "Documentation", heading: "Two files: yours and the construction.", paragraphs: [
        "Your file is the claim number, the photos you took, and what Travelers told you to save. Our file is the moisture, the materials we remove, and the repair estimate. You may attach ours to yours. Together they are a record, not a demand.",
        "The photo log is the simplest room-by-room packet. Use it the day of the loss. It does not create coverage and it does not replace notice to Travelers.",
      ] },
      { eyebrow: "Houston", heading: "Greater Houston, one office, no logo swap.", paragraphs: [
        "We work from 511 Crestwater Ct across Houston, the Energy Corridor, Katy, Sugar Land, Clear Lake, and The Woodlands. Family-owned since 1993. A Travelers-insured house and a Travelers-insured storefront can both call " + phone + ". The work will not look the same, and we will not force it to.",
        "Text the same number. Active emergencies any time. Office hours Monday through Saturday, 8:00 AM to 6:00 PM. We are not Travelers.",
      ] },
      { eyebrow: "On site", heading: "What the estimate is allowed to be.", paragraphs: [
        "The estimate prices repairs: roofing, drywall, floors, a tarp, a board-up, drying. It is not a guess at what Travelers should owe. If a commercial loss and a house loss are both open after the same storm, they get separate notes. Floodwater gets called floodwater.",
        "Call " + phone + " if the building is open or wet. We will say whether we can be on the roof safely. The outcome is Travelers' decision, and we do not promise it.",
      ] },
      { eyebrow: "After the call", heading: "House file and building file stay apart.", paragraphs: [
        "Travelers may insure the house you live in or a building you own. We ask which, because a leasing office and a kitchen are not documented the same way. A house file names rooms. A building file names suites or units, the roof access, and who can approve drywall while people are still inside. Both get photos before cleanup. Neither gets our name printed as if Travelers sent us.",
        "Houston weather still drives the work. Wind and hail on asphalt, hurricane rain through flashing from June through November, a freeze that splits an attic line, a water heater that empties onto a garage slab. We say which of those we see. A maintenance leak stays a maintenance leak, even if a storm passed the same month. Concrete here holds water after the puddle is gone, and we meter it before we rebuild.",
        "Family-owned since 1993 at 511 Crestwater Ct. Call or text " + phone + ". If you only need the habit of photographing a loss, use the photo log. Hiring us is separate, and Travelers' decision is separate again. On a two-story house the leak often shows downstairs. On a garden apartment it shows in the top-floor ceiling and sometimes the corridor. We list those places. One stain is not a price for the whole community. Wind, hail, a burst pipe, and rising water stay separate in our notes. Check your policy before treating them as one event. If Travelers wants the damaged pipe or a piece of shingle saved, follow their instruction. We keep that evidence until it is photographed. We do not throw it away just to make the room look finished. If the ceiling below an upstairs bath is stained, that ceiling is part of the visit until a meter says it is dry. Travelers does not get a different meter. The address does. A Clear Lake wind opening and a Katy hail roof are written as the roofs they are. The notes stay that specific on that roof.",
      ] },
    ],
    faqs: tail("Travelers", [
      { q: "Do you handle Travelers commercial claims differently?", a: "The documentation is stricter about suites and access. The rule is the same: we are not Travelers, and we do not decide coverage." },
      { q: "Can you tell a house policy from a business policy?", a: "Not from the logo on a card. You and Travelers can. Tell us what you believe you have, and we will still describe only the building." },
      { q: "Will you wait to tarp until Travelers arrives?", a: "If more weather is coming and the roof is safe, we photograph and cover. Ask Travelers what they want saved. We do not invent their instruction." },
      { q: "Are you on a Travelers vendor list?", a: "No. If someone told you we were, they were wrong. You can hire us anyway. Travelers still decides the claim." },
    ]),
  },
  {
    slug: "nationwide",
    name: "Nationwide",
    metaTitle: "Nationwide Claim Help, Houston",
    description: "Houston water and storm damage help for Nationwide policyholders. Not affiliated with Nationwide. Call (713) 909-0034.",
    lede: "Nationwide policyholders choose their own repair company. Elite Restorations is one option in Houston. We are not Nationwide, and we do not borrow their name.",
    sections: [
      { eyebrow: "Not affiliated", heading: "No shared brand, no shared authority.", paragraphs: [disclaimer("Nationwide"), "We will not use Nationwide's advertising language or imply the company sent us. If an agent recommended you call a contractor, that is the agent's suggestion, not a partnership. You can hire us or not. Nationwide still decides the claim."] },
      { eyebrow: "The path", heading: "A Houston loss beside a Nationwide policy.", paragraphs: [
        "Give Nationwide notice the way they ask. Their script is theirs. Keep the claim number. Protect the house the same day if water is entering: tarp, board-up, shut the main, and remove the water.",
        "The building facts are local. Slab foundations in Houston, Westchase, Alief, and Katy. Hail on roofs in the northern and western suburbs. Coastal wind toward Galveston and Clear Lake. Hurricane season from June 1 through November 30. Indoor water from heaters, dishwashers, toilets, and freeze-broken pipes any month a failure happens. We document those as we find them.",
        "An adjuster may schedule a visit days later. Drying should not wait that long. We photograph so the visit still has evidence. We attend the visit if you want. The Nationwide figure is theirs to settle.",
      ] },
      { eyebrow: "Documentation", heading: "Your photos, our readings, their decision.", paragraphs: [
        "Take photos before cleanup. Keep damaged materials they told you to save. Our meters and repair photos are additional. Together they are a record. They are not an approval.",
        "Sudden pipe breaks and long-term leaks are different histories. Flood and wind are different policies more often than not. Check what Nationwide actually issued to you. We describe the water. The form number is on your policy.",
      ] },
      { eyebrow: "Houston", heading: "Family company, insurer left off the truck.", paragraphs: [
        "Elite Restorations has been family-owned at 511 Crestwater Ct, Houston, TX 77082 since 1993. Call or text " + phone + ". We answer active storm and water emergencies any time, for houses, apartments, and commercial buildings. Scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM.",
        "We are not Nationwide. A page with their name on our site is a guide for our customers, not a badge.",
      ] },
      { eyebrow: "On site", heading: "Repair work written in rooms, not slogans.", paragraphs: [
        "We name the rooms, the roof slopes, and the cause we can see. A tarp is temporary. A roof replacement is a different price, often planning in a wide range that we only turn into a bid after we see the wood under the shingles. Drying is its own part of the work. None of those numbers are a Nationwide settlement.",
        "Call " + phone + " if you are staring at an open ceiling. Text photos if that is easier. We will tell you what not to do before we arrive, including staying off the roof.",
      ] },
      { eyebrow: "After the call", heading: "The visit, without a Nationwide script.", paragraphs: [
        "We show up as Elite Restorations. If an agent suggested a contractor, that suggestion is not a dispatch from us and it is not a partnership. On the property we look at the cause: a roof opening, hail, a broken window, a pipe, a heater, a dishwasher, a toilet. We photograph it, protect what is safe to protect, and dry what the water reached. Apartment stacks get a list of wet ceilings, not a blanket 'whole building' story. Commercial restrooms and break rooms are part of the job when that is where the water is.",
        "Cost stays approximate until we see it. A walkable tarp often plans from a few hundred dollars to about $2,000. Drying one room often plans in the low thousands. A full roof is a different range, often $12,000 to $24,000 for many asphalt houses, and only a bid after the wood under the shingles is seen. Those are planning ranges, not quotes, and they are not your Nationwide deductible. That deductible is on your policy, so we will not guess it.",
        "Greater Houston from the 77082 office, family-owned since 1993. Call " + phone + " any time for water that is still moving. A Tuesday estimate is Monday through Saturday, 8:00 AM to 6:00 PM. Text us either way. If Nationwide has already sent an adjuster, we can still walk the same rooms and explain what we dried. If they have not, the photos from today are what you will wish you had. Either way we stay the contractor, not the insurance company, and their name stays off our estimate. A Nationwide policyholder in a Houston slab house gets the same moisture map as any other customer: where the water went, not a story written to match a form. Westchase, Alief, Katy, and Sugar Land slabs all hold water the same way. The neighborhood does not pick the coverage, and we do not pick it either. We describe the water. They decide the policy. Call (713) 909-0034 if the ceiling is still dripping. A property manager with a Nationwide building policy uses that same number and should have the unit list ready before we arrive, including which ceilings are already wet. Bring that list so we open the right doors.",
      ] },
    ],
    faqs: tail("Nationwide", [
      { q: "Did Nationwide send you?", a: "No. If you found this page, you found our site. We are not a Nationwide vendor or partner." },
      { q: "Can my agent require a specific contractor?", a: "Ask Nationwide and read the policy. We will not claim the policy says something it may not say. You can still ask us to look at the building." },
      { q: "Do you know Nationwide claim time limits?", a: "No. They are in the policy or in Nationwide's answer when you ask. We will not invent one." },
      { q: "Can you start without a claim number?", a: "Yes, if you hire us to stop the damage. Get the claim number for your file as soon as Nationwide opens it. Opening the claim is your call to them." },
    ]),
  },
  {
    slug: "progressive",
    name: "Progressive",
    metaTitle: "Progressive Claim Help, Houston",
    description: "Houston house and building damage when the homeowners policy is Progressive. Not an auto claim. Not affiliated. Call (713) 909-0034.",
    lede: "A lot of Houston drivers know Progressive from car insurance. A house claim is not an auto claim. If your homeowners or dwelling policy is with Progressive, this page is about the building. We are not Progressive.",
    sections: [
      { eyebrow: "Not affiliated", heading: "Keep the car policy separate from the house.", paragraphs: [disclaimer("Progressive"), "A roof or a water loss stays on the property policy, not on an auto claim. Which Progressive company issued the homeowners policy is named on the declarations page. Ask Progressive how they want notice on the property policy. Call " + phone + " for the wet building. Those are different phone calls on purpose."] },
      { eyebrow: "The path", heading: "Property notice, then the Houston building.", paragraphs: [
        "People sometimes call the number they use after a fender bender. If the damage is a roof, a pipe, or a flood, ask Progressive for the property-claim path and write down that claim number. Their phone menu is not something we know. A car deductible is not a number we will put on a roof.",
        "The building work is familiar. Tarp a storm opening. Board a broken window. Dry a slab after a burst pipe, a water heater, a dishwasher, or a toilet. Hurricane season is June 1 through November 30. Hail and wind mark roofs across Greater Houston. A freeze is rarer and usually a plumbing event. Flooding from the street may be neither the auto policy nor the homeowners policy. Check whether you have flood coverage at all.",
        "If a Progressive adjuster inspects the house, we can attend at your request and explain the construction. Negotiating the claim is not our job, and we do not represent Progressive. The estimate is what the repair costs. The payment is their decision.",
      ] },
      { eyebrow: "Documentation", heading: "Photos of the house, not the bumper.", paragraphs: [
        "Photograph rooms, the roof from the ground, and the source of water. The photo log is built for a house. Use it. Keep damaged plumbing parts. Do not send only a picture of a car and expect it to explain a ceiling.",
        "Our drying and repair photos can be shared with the property claim. They are not an authorization. Limiting further damage is often expected. Reimbursement is not guaranteed. We bill the person who hires us.",
      ] },
      { eyebrow: "Houston", heading: "Houses and buildings, from 77082.", paragraphs: [
        "We are family-owned at 511 Crestwater Ct, Houston, TX 77082 since 1993. We dry and rebuild houses, apartments, and commercial buildings across Houston, Katy, Sugar Land, The Woodlands, Clear Lake, and the neighborhoods beside the office. A Progressive homeowners policy does not change the slab or the humidity.",
        "Call or text " + phone + " any time for an active water or storm emergency. Office hours Monday through Saturday, 8:00 AM to 6:00 PM. We are not Progressive, and this is not an auto-repair page.",
      ] },
      { eyebrow: "On site", heading: "Keep the property claim in its own file.", paragraphs: [
        "We label the roof, interior water, and temporary protection as separate jobs so nobody confuses them with a vehicle repair. If both a car and a house were hit in the same storm, they are still two claims. We only do the building.",
        "Call " + phone + " with the address and whether water is still entering. We will not ask for a VIN. We will ask if the roof is open and if anyone is standing in water near power.",
      ] },
      { eyebrow: "After the call", heading: "Only the building, even if Progressive is the name on both cards.", paragraphs: [
        "If the same storm hit the car and the house, the car stays with whoever repairs cars. We look at the roof, the windows, and the wet rooms. Bring the property policy's claim number when you have it. An auto claim number will not explain a ceiling. Sorting the two files is a call you make to Progressive. Ask them which file is the house.",
        "The Houston work is ordinary for us and specific to the address. Slab houses in Alief and Westchase hold water in the concrete. Two-story houses in Katy and The Woodlands drop an upstairs leak into a downstairs ceiling. Coastal wind toward Clear Lake opens flashing. Hail marks the west slope. A freeze, when it comes, is the attic line. We write the one that happened. Homes, apartments, and commercial buildings can all be on a Progressive property policy. The policy form is yours to confirm.",
        "Office: 511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. Call or text " + phone + ". Emergencies any time. We are not Progressive, and nothing on this page is an offer from them. Bring questions about deductibles to Progressive. Bring the open ceiling, the wet slab, and the broken window to us. We can tarp, board up, dry, and rebuild. A property loss stays a property loss. If both the car and the house were damaged, keep two photo sets so the house file stays about the house. Progressive can explain the auto file. We will explain the wet room, the tarp, and the repair, and nothing about a vehicle. That split keeps the Progressive property file readable. A house in Houston and a car in the driveway are not one repair, even after the same storm.",
      ] },
    ],
    faqs: tail("Progressive", [
      { q: "Is this an auto claim?", a: "No. This page is for a house, apartment, or commercial building insured by Progressive. A damaged car is a different policy and a different shop." },
      { q: "Which Progressive company writes the home policy?", a: "Your declarations page names the company. We do not guess, and we are not affiliated with any of them." },
      { q: "Can I use my auto deductible on the roof?", a: "That is a question for Progressive and the property policy. We will not say yes." },
      { q: "Do you repair cars and houses?", a: "Houses and buildings. Not vehicles. Call " + phone + " for storm or water damage to a property." },
    ]),
  },
];
