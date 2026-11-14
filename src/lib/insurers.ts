import type { GuideSection } from "@/lib/guides/types";
import { moreInsurers } from "@/lib/insurers-more";
import { wordCount } from "@/lib/words";

export type InsurerPage = {
  slug: string;
  name: string;
  metaTitle: string;
  description: string;
  lede: string;
  sections: readonly GuideSection[];
  faqs: readonly { q: string; a: string }[];
};

const phone = "(713) 909-0034";

function disclaimer(name: string) {
  return `Elite Restorations is not affiliated with, endorsed by, or a preferred vendor of ${name}. We do not represent ${name}, and we do not use their logo. We work with Houston homeowners, property managers, and building owners who are insured by ${name} and want help documenting water, storm, or roof damage. Coverage, deductibles, and payment are ${name}'s decision under the policy. Check that policy. We are not public adjusters and we do not promise a claim will be approved or paid.`;
}

function faqs(name: string, extra: { q: string; a: string }[]): { q: string; a: string }[] {
  return [
    ...extra,
    {
      q: `Are you a ${name} preferred vendor or partner?`,
      a: `No. We are not affiliated with ${name}. If you hire us, you hire Elite Restorations. ${name} decides the claim.`,
    },
    {
      q: "Do you promise the claim will be paid?",
      a: `No. We help with photos, emergency mitigation, a repair estimate, and a meeting with the adjuster if you want us there. ${name} decides coverage and payment. Check your policy.`,
    },
    {
      q: "Is a flood the same as a homeowners claim?",
      a: "Often no. Rising water from a street, bayou, or reservoir is frequently a different policy from wind, hail, or a sudden plumbing break. We will not rename one as the other. Ask your insurer which contract applies.",
    },
    {
      q: "Can you help after a hurricane, hail, wind, or tornado?",
      a: `Yes. We document the damage, tarp or board up when it is safe, dry what got wet, and estimate the repair. We assist. We do not file the ${name} claim for you or give legal advice.`,
    },
    {
      q: "What should I photograph?",
      a: "Wide shots of each room, close shots of the source, and belongings before they are thrown away. The photo log on this site is a room-by-room way to do that. It does not create coverage.",
    },
    {
      q: "Will you meet the adjuster?",
      a: "Yes, if you want us on site. We walk through what we saw of the building. We do not negotiate the dollar figure.",
    },
    {
      q: "Do you work on apartments and commercial buildings too?",
      a: `Yes. Homes, apartment communities, and commercial buildings in Greater Houston. Call ${phone} any time for an active storm or water emergency.`,
    },
  ];
}

export const insurers: readonly InsurerPage[] = [
  {
    slug: "state-farm",
    name: "State Farm",
    metaTitle: "State Farm Claim Help, Houston",
    description:
      "Houston homeowners insured by State Farm: how a water, storm, or roof claim usually moves, and how we help document it. Not affiliated. Call (713) 909-0034.",
    lede: "If your Houston home, rental property, or commercial building is insured by State Farm, you still choose who dries and repairs it. This page is how that work usually sits next to a claim. It is not a State Farm page.",
    sections: [
      {
        eyebrow: "Not affiliated",
        heading: "We work for the person who calls us.",
        paragraphs: [disclaimer("State Farm"), "Many people in Greater Houston carry a State Farm homeowners policy through a local agent. We do not know your agent, your deductible, or whether this loss is wind, water, or wear. Those answers are on your declarations page and in the conversation you have with State Farm. Our office is 511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. Call " + phone + " if water is coming in or a roof is open."],
      },
      {
        eyebrow: "The path",
        heading: "How a Texas homeowner's claim usually moves.",
        paragraphs: [
          "A typical path, not a rule from any one policy, starts with notice. People insured by State Farm often call the agent who wrote the policy or the number on the card in the drawer. Ask how they want notice, what they want you to save, and whether they want someone to see the damage before permanent repairs. Write down the claim number, the date, and the name of the person you spoke with. We will not invent a deadline. Notice language is in the policy.",
          "Then the building needs protection. In Houston that can be a tarp after hail or a hurricane, board-up on a broken window, or drying after a burst pipe, a water heater, a dishwasher, or a toilet overflow. Hurricane season is June 1 through November 30. Hail and straight-line wind show up in the spring from Katy to The Woodlands. A hard freeze breaks attic lines on slabs in Westchase, Alief, and Sugar Land. Mitigation limits further damage. It is not a promise State Farm will reimburse it.",
          "An adjuster may inspect. We can be there. We show photos of the opening, moisture readings, and the repair we are pricing. State Farm decides what is covered, what is maintenance, and what the deductible does to the number. We do not calculate your deductible and we do not argue the settlement. The repair estimate is construction. The claim payment is whatever State Farm allows.",
        ],
      },
      {
        eyebrow: "Documentation",
        heading: "Photos, a log, and an estimate with the rooms named.",
        paragraphs: [
          "Before you throw carpet out or let a tarp hide a hole, take wide shots and close shots. Note whether water came from the roof, a pipe, an appliance, or the street. Rising water in neighborhoods near the bayous is often a flood policy, not the homeowners policy. We will not call bayou water a sudden plumbing break because the second phrase sounds easier.",
          "We add our own photos of what we dry and what we rebuild. You can give that set to State Farm. The free photo log on this site is yours even if you do not hire us. The guide to how Texas restoration claims usually move is the longer explanation. None of those documents are a coverage opinion.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Slab houses, hail roofs, and buildings with many units.",
        paragraphs: [
          "Most of the houses we dry sit on concrete. A State Farm policyholder in Memorial with an attic leak and one in Katy with a supply line under the slab both need moisture mapped, not guessed from the stain. Apartment managers and commercial owners insured by State Farm use the same phone number. We list units. We do not dry a whole complex from one ceiling.",
          "Call or text " + phone + " any time for an active emergency. Office hours for a scheduled visit are Monday through Saturday, 8:00 AM to 6:00 PM. We are not State Farm. We are the restoration company at 511 Crestwater Ct.",
        ],
      },
      {
        eyebrow: "On site",
        heading: "What we actually do beside a State Farm claim.",
        paragraphs: [
          "We photograph the roof or the wet rooms, tarp an opening when the roof is safe, board a broken window, extract standing water, and dry with air movers and dehumidifiers until moisture readings support repairs. Then we estimate the rebuild: drywall, flooring, roofing, or the interior a leak destroyed. Homes, apartments, and commercial buildings are the same sequence with different access. A State Farm policyholder does not get a different drying method from anyone else. The carrier name does not change the slab.",
          "We can meet the adjuster and walk the scope. We will not tell you State Farm 'has to' pay a line item, and we will not hide a maintenance issue to fatten an estimate. If the loss is a slow leak rather than a sudden break, or floodwater rather than wind, the notes say that. Check the policy for how State Farm treats those words. Call " + phone + " when the building is still taking water.",
        ],
      },
    ],
    faqs: faqs("State Farm", [
      { q: "Should I call my State Farm agent before I call you?", a: "Call us if water is coming in or the roof is open. Notice to State Farm is still your step. We do not file it. Ask State Farm how they want notice, and keep the claim number." },
      { q: "Can you tell me my State Farm deductible?", a: "No. Wind, hail, and other losses are often treated differently, and we will not guess the percentage or the dollar amount. Read the declarations or ask State Farm." },
      { q: "Do you only help with roof claims?", a: "No. Roof and tarp work, board-up, and water from pipes, heaters, dishwashers, and toilet overflows. The cause goes in the notes as we see it." },
      { q: "What if State Farm wants to see the damage first?", a: "Ask them. If the building is taking on water, we photograph and then protect it when it is safe. Leaving a roof open for a later visit lets the next storm in." },
    ]),
  },
  {
    slug: "allstate",
    name: "Allstate",
    metaTitle: "Allstate Claim Help in Houston",
    description:
      "Houston property owners insured by Allstate: documentation, drying, and repair help beside a water or storm claim. Not affiliated. Call (713) 909-0034.",
    lede: "Allstate insures a lot of Houston houses. That does not make us an Allstate contractor. If you hire Elite Restorations, we document the building and repair what you approve. Allstate decides the claim.",
    sections: [
      {
        eyebrow: "Not affiliated",
        heading: "Your policy, your carrier, your choice of contractor.",
        paragraphs: [disclaimer("Allstate"), "People reach Allstate in different ways: an agent, an app, a phone number on the policy. We do not tell you which door Allstate wants you to use. Ask them, and write down the answer next to the claim number. Our job starts when the building is wet or open, whether or not that call has already happened. Do both. Do not wait on paperwork while a ceiling fills."],
      },
      {
        eyebrow: "The path",
        heading: "A careful version of how these claims tend to go.",
        paragraphs: [
          "Notice, then protection, then an inspection, then a repair that may or may not match the payment. That order is common across Texas homeowners claims. It is not an Allstate rule we are quoting. Your forms control the deadlines and the proof they want. We will not substitute a blog for the policy.",
          "On the building, Houston losses we see beside Allstate claims are the usual ones: hail on asphalt roofs, wind at flashing, hurricane rain after a lifted ridge, a burst pipe after a freeze, a water heater in a garage, a dishwasher under a slab-floor kitchen, a toilet that overflowed into the hall. Each one gets photos and a cause written in plain words. We do not upgrade the cause to something that sounds more payable.",
          "If an Allstate adjuster visits, we can walk the roof or the wet rooms with them when you ask us to. We explain the tarp, the dry-out, and the estimate. We stop at the construction. Depreciation, actual cash value, and replacement cost are policy words. We do not calculate them for you.",
        ],
      },
      {
        eyebrow: "Documentation",
        heading: "What to keep before the house gets cleaned up.",
        paragraphs: [
          "Save the broken supply line if you can do it safely. Photograph the roof opening before the tarp. List rooms, not just 'the house was wet.' A claim file that starts after the dumpster is loaded is harder for you to explain. The photo log is free. Our photos of moisture and repairs can go in the same packet.",
          "Temporary repairs that limit further damage are often expected. Whether Allstate pays the invoice is a separate question. We bill for the work you hire. We do not wait on a promise of reimbursement to cover an open roof when the weather is still coming and the roof is safe to walk.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "From the office in 77082 to the coast and the suburbs.",
        paragraphs: [
          "We schedule from 511 Crestwater Ct. Hail and wind calls come from Katy, Cypress, and The Woodlands. Coastal wind calls come from Clear Lake and Galveston. Slab leaks and appliance failures show up in Westchase, Alief, Bellaire, and Memorial the same as anywhere else. Apartment and commercial Allstate policies, when that is what the owner carries, get the same documentation habits and a unit list.",
          "Family-owned since 1993. Call or text " + phone + ". Active storm and water emergencies any time. Office hours Monday through Saturday, 8:00 AM to 6:00 PM. We are not Allstate.",
        ],
      },
      {
        eyebrow: "On site",
        heading: "The work, labeled separately from the Allstate payment.",
        paragraphs: [
          "Tarping, board-up, extraction, and drying are mitigation. Roofing, drywall, and floors are the repair. We write them as construction scopes with the rooms named. An Allstate payment, if one comes, is a different document. We do not blend them into a single 'claim total' and we do not collect the claim in our name. You hire us. Allstate decides what it owes under the policy you have.",
          "Houston slabs keep water in the concrete after a dishwasher, a toilet, or a supply line looks cleaned up. We meter that. Hail roofs get looked at on every slope, not from the driveway. If you are comparing our estimate to an Allstate figure, we will explain the construction. We will not coach you on how to argue it. Call or text " + phone + " for an active leak or an open roof. Family-owned since 1993 at 511 Crestwater Ct. The carrier name on the policy does not change how a slab dries. Apartment and commercial losses get the same photos, with a unit or suite list instead of a single hallway. We answer " + phone + " any time when water is still coming in. Scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM.",
        ],
      },
    ],
    faqs: faqs("Allstate", [
      { q: "Do I have to use an Allstate contractor?", a: "We are not an Allstate contractor. Whether your policy says anything about who may repair the house is a question for Allstate and the policy. We will not pretend a sentence is there." },
      { q: "Can you start drying before Allstate inspects?", a: "If the building is wet, drying should not wait. We photograph first. Ask Allstate what they want to see before anything is thrown away." },
      { q: "Will you argue the Allstate estimate?", a: "No. We can explain our repair scope. We do not negotiate the claim or act as public adjusters." },
      { q: "What losses do you document?", a: "Roof and storm openings, hail, wind, and indoor water from pipes and appliances. Flood from rising water is identified as flood, not renamed." },
    ]),
  },
  {
    slug: "usaa",
    name: "USAA",
    metaTitle: "USAA Claim Help in Houston",
    description:
      "Houston homes insured by USAA: storm and water documentation, drying, and repair help. Not affiliated with USAA. Call (713) 909-0034.",
    lede: "USAA members in Houston are often away from the house: a deployment, a training cycle, a parent holding the keys. The building still needs photos and drying. We are not USAA, and we are not a USAA vendor.",
    sections: [
      {
        eyebrow: "Not affiliated",
        heading: "A membership insurer is still not our partner.",
        paragraphs: [disclaimer("USAA"), "USAA membership is generally tied to the military community. That is public, and it matters on a loss because the person on the policy may not be the person standing in the wet room. A spouse, a parent, or a property manager may be the one who calls us. We still need the claim number from whoever opens it with USAA, and we still will not speak for USAA."],
      },
      {
        eyebrow: "The path",
        heading: "Notice, photos, and a house that may be empty.",
        paragraphs: [
          "If the member is not in Houston, the first useful thing is a clear record: which rooms, where the water entered, whether the roof is open, and whether anyone has shut the main. We can photograph that set and send the facts to the person who has to talk to USAA. We do not log into a member account and we do not file the claim.",
          "The Houston building problems are the same ones we see on other policies. Hurricane season runs June through November. Hail bruises roofs in the suburbs. A freeze splits attic lines on slabs. A water heater in a garage, a dishwasher supply, or a toilet overflow does not wait for someone to fly home. Mitigation limits further damage. USAA decides what, if anything, it reimburses.",
          "When an adjuster visits, we can meet them if the person responsible for the house asks us to. We walk the damage we saw. We do not negotiate a member's settlement and we do not give legal advice. The repair estimate names the construction. It is not a USAA payment.",
        ],
      },
      {
        eyebrow: "Documentation",
        heading: "A log someone else can understand.",
        paragraphs: [
          "Empty houses get cleaned up by well-meaning relatives who throw wet carpet away before anyone photographs it. If you are the person on site, use the photo log before the dumpster. Label rooms. Note the date you noticed the loss. Keep the failed fitting if it is safe to keep.",
          "Our notes say what was wet, what was dried, and what was rebuilt. You may share them with USAA. They are not a coverage letter. Flood and wind remain different stories. Check the policies the member actually has, including any flood contract. We will not assume a military family has one or the other.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "The house in Houston while the member is not.",
        paragraphs: [
          "We work across Greater Houston from 511 Crestwater Ct, including bases of daily life in Katy, Spring, Clear Lake, and the neighborhoods closer to the office in Westchase and Alief. Apartment communities and houses are both common. Call " + phone + " any time for an active leak or an open roof. Tell us who can authorize the work if the member is not local.",
          "Family-owned since 1993. Text the same number. Office hours Monday through Saturday, 8:00 AM to 6:00 PM for a visit that is not an emergency. We are not USAA.",
        ],
      },
      {
        eyebrow: "On site",
        heading: "A record the member can read from somewhere else.",
        paragraphs: [
          "When the member is not in the house, the value of the visit is a plain record: photos before a tarp goes on, unit or room names, moisture notes, and a repair estimate that says what will be rebuilt. We can text or email that set to the person who holds the USAA policy. We still do not submit it to USAA ourselves unless you are standing there and you hand it over. The photo log is a tool the person on site can fill out the same day.",
          "Drying does not wait on a flight home. Wet drywall on a Houston slab gets worse in the humidity. We start mitigation when someone with authority hires us, and we keep the member's insurer out of our company name. Call " + phone + " any time for an active water or storm emergency. We are not USAA, and we do not ask for a membership number to roll a truck. The office at 511 Crestwater Ct is open Monday through Saturday, 8:00 AM to 6:00 PM when the visit can wait. Family-owned since 1993. Text the same number if a call is hard from where you are. A gate code and a unit number belong in the first message if the loss is an apartment.",
        ],
      },
    ],
    faqs: faqs("USAA", [
      { q: "Can you talk to USAA for the member?", a: "We can explain the building to an adjuster on site if you want us there. We do not file the claim, access a USAA account, or speak as the member." },
      { q: "The member is deployed. Can we still start?", a: "If someone with authority hires us, yes. We need to know who can approve drying and repairs. We photograph so the member can see the loss from somewhere else." },
      { q: "Do you know USAA deductibles?", a: "No. We will not guess. The member or the policy has that answer." },
      { q: "Are military families your only USAA customers?", a: "We help the household that calls about a USAA-insured property. We do not screen membership and we do not claim a special status with USAA." },
    ]),
  },
  ...moreInsurers,
];

function insurerWords(page: InsurerPage) {
  return wordCount([
    page.lede,
    ...page.sections.flatMap((section) => [
      section.eyebrow,
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []).flatMap((point) => [point.title, point.body]),
    ]),
    ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
  ]);
}

export function getInsurer(slug: string) {
  return insurers.find((page) => page.slug === slug);
}

for (const page of insurers) {
  const words = insurerWords(page);
  if (words < 1200) throw new Error(`${page.slug} is ${words} words, under 1200`);
  if (page.faqs.length < 10) throw new Error(`${page.slug} has ${page.faqs.length} FAQs`);
}

export { insurerWords };
