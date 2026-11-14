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
  return `Elite Restorations is not affiliated with, endorsed by, or a preferred vendor of ${name}. We work for whoever hires us, not for ${name}, and their logo is not ours to use. We help Houston homeowners, property managers, and building owners who are insured by ${name} document water, storm, or roof damage. ${name} decides coverage, deductibles, and payment under the policy. Check that policy. We are not public adjusters. Only ${name} can say whether a claim will be approved or paid.`;
}

function faqs(name: string, extra: { q: string; a: string }[]): { q: string; a: string }[] {
  return [
    ...extra,
    {
      q: `Are you a ${name} preferred vendor or partner?`,
      a: `No. We are independent, and we are not affiliated with ${name}. You hire Elite Restorations. ${name} decides the claim.`,
    },
    {
      q: "Do you promise the claim will be paid?",
      a: `We photograph the damage, limit further damage, write a repair estimate, and meet the adjuster if you want us there. ${name} decides coverage and payment. Check your policy.`,
    },
    {
      q: "Is a flood the same as a homeowners claim?",
      a: "Often it is not. Rising water from a street, bayou, or reservoir is frequently a different policy from wind, hail, or a sudden plumbing break. We keep those causes separate. Ask your insurer which policy applies.",
    },
    {
      q: "Can you help after a hurricane, hail, wind, or tornado?",
      a: `Yes. We document the damage, tarp or board up when it is safe, dry what got wet, and estimate the repair. You file the ${name} claim. We help with the building and do not give legal advice.`,
    },
    {
      q: "What should I photograph?",
      a: "Take wide shots of each room, close shots of the source, and belongings before they are thrown away. The photo log on this site is a room-by-room way to do that. Photos do not create coverage.",
    },
    {
      q: "Will you meet the adjuster?",
      a: "Yes, if you want us there with you. We walk through what we saw in the building. Your insurer sets the dollar figure.",
    },
    {
      q: "Do you work on apartments and commercial buildings too?",
      a: `Yes. We work on homes, apartments, and commercial buildings in Greater Houston. Call ${phone} any time for an active storm or water emergency.`,
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
        paragraphs: [disclaimer("State Farm"), "Many people in Greater Houston carry a State Farm homeowners policy through a local agent. Your agent, your deductible, and whether this loss is wind, water, or ordinary wear are on your declarations page and in your conversation with State Farm. Our office is 511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. Call " + phone + " if water is coming in or a roof is open."],
      },
      {
        eyebrow: "The path",
        heading: "How a Texas homeowner's claim usually moves.",
        paragraphs: [
          "A typical path, not a rule from any one policy, starts with notice. People insured by State Farm often call the agent who wrote the policy or the number on the card in the drawer. Ask how they want notice, what they want you to save, and whether they want someone to see the damage before permanent repairs. Write down the claim number, the date, and the name of the person you spoke with. We will not invent a deadline. Notice language is in the policy.",
          "Then the building needs protection. In Houston that can be a tarp after hail or a hurricane, board-up on a broken window, or drying after a burst pipe, a water heater, a dishwasher, or a toilet overflow. Hurricane season is June 1 through November 30. Hail and straight-line wind show up in the spring from Katy to The Woodlands. A hard freeze breaks attic lines on slabs in Westchase, Alief, and Sugar Land. Those steps limit further damage. They are not a promise that State Farm will pay you back.",
          "An adjuster may inspect. We can be there. We show photos of the opening, moisture readings, and the repair we are pricing. State Farm decides what is covered, what is maintenance, and what the deductible does to the number. The deductible and the settlement are theirs to figure. The repair estimate is the construction price. The claim payment is whatever State Farm allows.",
        ],
      },
      {
        eyebrow: "Documentation",
        heading: "Photos, a log, and an estimate with the rooms named.",
        paragraphs: [
          "Before you throw carpet out or let a tarp hide a hole, take wide shots and close shots. Note whether water came from the roof, a pipe, an appliance, or the street. Rising water in neighborhoods near the bayous is often a flood policy, not the homeowners policy. If the water came from the bayou, we write it down as flooding. A sudden plumbing break is a different cause.",
          "We add our own photos of what we dry and what we rebuild. You can give that set to State Farm. The free photo log on this site is yours even if you do not hire us. The guide to how Texas restoration claims usually move is the longer explanation. None of those documents are a coverage opinion.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Slab houses, hail roofs, and buildings with many units.",
        paragraphs: [
          "Most of the houses we dry sit on concrete. A State Farm policyholder in Memorial with an attic leak and one in Katy with a supply line under the slab both need the moisture mapped, not guessed from the stain. Apartment managers and commercial owners insured by State Farm use the same phone number. We list the wet units. One ceiling is not a reason to dry the whole complex.",
          "Call or text " + phone + " any time for an active emergency. Office hours for a scheduled visit are Monday through Saturday, 8:00 AM to 6:00 PM. State Farm is the insurer. We are the restoration company at 511 Crestwater Ct.",
        ],
      },
      {
        eyebrow: "On site",
        heading: "What we actually do beside a State Farm claim.",
        paragraphs: [
          "We photograph the roof or the wet rooms, tarp an opening when the roof is safe, board a broken window, remove standing water, and dry with air movers and dehumidifiers until moisture readings support repairs. Then we estimate the rebuild: drywall, flooring, roofing, or the interior a leak destroyed. Homes, apartments, and commercial buildings follow the same order with different access. A State Farm policyholder does not get a different drying method from anyone else. The name on the policy does not change the slab.",
          "We can meet the adjuster and walk through the work. State Farm decides which items to pay. We leave a maintenance issue in the notes instead of hiding it to make the estimate larger. If the loss is a slow leak rather than a sudden break, or floodwater rather than wind, the notes say that. Check the policy for how State Farm treats those words. Call " + phone + " when the building is still taking water.",
        ],
      },
    ],
    faqs: faqs("State Farm", [
      { q: "Should I call my State Farm agent before I call you?", a: "Call us if water is coming in or the roof is open. You still give State Farm notice. We do not file the claim. Ask State Farm how they want that notice, and keep the claim number." },
      { q: "Can you tell me my State Farm deductible?", a: "No. Wind, hail, and other losses are often treated differently. The percentage and the dollar amount are on the declarations page, or you can ask State Farm." },
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
        heading: "Your policy, your insurer, your choice of contractor.",
        paragraphs: [disclaimer("Allstate"), "People reach Allstate in different ways: an agent, an app, a phone number on the policy. Ask Allstate which door they want you to use, and write the answer next to the claim number. Our job starts when the building is wet or open, whether or not that call has already happened. Make both calls. A ceiling can fill while the paperwork waits."],
      },
      {
        eyebrow: "The path",
        heading: "A careful version of how these claims tend to go.",
        paragraphs: [
          "Notice, then protection, then an inspection, then a repair that may or may not match the payment. That order is common across Texas homeowners claims. It is not an Allstate rule we are quoting. Your forms control the deadlines and the proof they want. The policy controls this, not a page on our site.",
          "On the building, Houston losses we see beside Allstate claims are the usual ones: hail on asphalt roofs, wind at flashing, hurricane rain after a lifted ridge, a burst pipe after a freeze, a water heater in a garage, a dishwasher under a slab-floor kitchen, a toilet that overflowed into the hall. Each one gets photos and a cause written in plain words. The cause stays plain, even if another phrase sounds more likely to be paid.",
          "If an Allstate adjuster visits, we can walk the roof or the wet rooms with them when you ask us to. We explain the tarp, the dry-out, and the estimate. We stop at the construction. Depreciation is what some policies hold back until the work is finished. We do not calculate that, or actual cash value, or replacement cost.",
        ],
      },
      {
        eyebrow: "Documentation",
        heading: "What to keep before the house gets cleaned up.",
        paragraphs: [
          "Save the broken supply line if you can do it safely. Photograph the roof opening before the tarp. List rooms, not just 'the house was wet.' A claim file that starts after the dumpster is loaded is harder for you to explain. The photo log is free. Our photos of moisture and repairs can go in the same packet.",
          "Temporary repairs that limit further damage are often expected. Whether Allstate pays our bill is a separate question. We bill you for the work you hire. We do not wait on a promise of repayment to cover an open roof when more rain is coming and the roof is safe to walk.",
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
          "A tarp, board-up, water removal, and drying limit more damage. Roofing, drywall, and floors are the repair. We write them as separate jobs, with the rooms named. An Allstate payment, if one comes, is a different document. We keep our bill separate, and we do not collect the claim in our name. You hire us. Allstate decides what it owes under the policy you have.",
          "Houston slabs keep water in the concrete after a dishwasher, a toilet, or a supply line looks cleaned up. We meter that. Hail roofs get looked at on every slope, not from the driveway. If you are comparing our estimate to an Allstate figure, we explain the construction. The argument, if you have one, is between you and Allstate. Call or text " + phone + " for an active leak or an open roof. Family-owned since 1993 at 511 Crestwater Ct. The name on the policy does not change how a slab dries. Apartment and commercial losses get the same photos, with a unit or suite list instead of a single hallway. We answer " + phone + " any time when water is still coming in. Scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM.",
        ],
      },
    ],
    faqs: faqs("Allstate", [
      { q: "Do I have to use an Allstate contractor?", a: "We are not an Allstate contractor. Whether your policy says anything about who may repair the house is a question for Allstate and the policy. We will not invent a rule that is not written there." },
      { q: "Can you start drying before Allstate inspects?", a: "If the building is wet, drying should not wait. We photograph first. Ask Allstate what they want to see before anything is thrown away." },
      { q: "Will you argue the Allstate estimate?", a: "No. We can explain the repair work. We do not negotiate the claim or act as public adjusters." },
      { q: "What losses do you document?", a: "Roof and storm openings, hail, wind, and indoor water from pipes and appliances. Rising water is written down as flood. Check your policy." },
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
          "Our notes say what was wet, what was dried, and what was rebuilt. You may share them with USAA. They are not a coverage letter. Flood and wind remain different stories. Check the policies the member actually has, including any flood contract. We describe the water. We do not assume which policies that family holds.",
        ],
      },
      {
        eyebrow: "Houston",
        heading: "The house in Houston while the member is not.",
        paragraphs: [
          "We work across Greater Houston from 511 Crestwater Ct, including Katy, Spring, Clear Lake, and the neighborhoods closer to the office in Westchase and Alief. Apartment communities and houses are both common. Call " + phone + " any time for an active leak or an open roof. Tell us who can approve the work if the member is not local.",
          "Family-owned since 1993. Text the same number. Office hours Monday through Saturday, 8:00 AM to 6:00 PM for a visit that is not an emergency. We are not USAA.",
        ],
      },
      {
        eyebrow: "On site",
        heading: "A record the member can read from somewhere else.",
        paragraphs: [
          "When the member is not in the house, the value of the visit is a plain record: photos before a tarp goes on, unit or room names, moisture notes, and a repair estimate that says what will be rebuilt. We can text or email that set to the person who holds the USAA policy. We still do not submit it to USAA ourselves unless you are standing there and you hand it over. The photo log is a tool the person on site can fill out the same day.",
          "Drying does not wait on a flight home. Wet drywall on a Houston slab gets worse in the humidity. We start the steps that limit more damage when someone with authority hires us, and we keep the member's insurer out of our company name. Call " + phone + " any time for an active water or storm emergency. We are not USAA. You do not need a membership number for us to come out. The office at 511 Crestwater Ct is open Monday through Saturday, 8:00 AM to 6:00 PM when the visit can wait. Family-owned since 1993. Text the same number if a call is hard from where you are. A gate code and a unit number belong in the first message if the loss is an apartment.",
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
