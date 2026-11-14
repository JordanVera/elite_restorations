import type { GuideSection } from "@/lib/guides/types";
import { wordCount } from "@/lib/words";

const phone = "(713) 909-0034";

export const stormPage = {
  metaTitle: "Houston Storm Damage Help",
  description:
    "Houston storm damage help after hurricanes, hail, wind, and freezes. Tarp, board-up, drying, and claim help for homes and buildings. Call (713) 909-0034.",
  eyebrow: "After the storm",
  title: ["Houston storm", "damage help."] as const,
  lede: "Hurricanes, hail, straight-line wind, and the occasional hard freeze do different things to a Houston building. This page stays up between storms. When one hits, use the steps, then call.",
  sections: [
    {
      eyebrow: "First",
      heading: "The order that matters after the weather.",
      paragraphs: [
        "People first. Stay out of a room with a sagging ceiling, broken glass, or standing water near outlets. Do not walk a wet roof to find the hole. If you smell gas, leave and call the utility. If the power is questionable, leave the breaker off and do not wade to it.",
        "Then stop more water if you can do it safely from inside: a bucket under a drip, a towel at a door, the main shut off if a pipe burst in a freeze. Photograph wide and close before you throw belongings away or cover an opening. Call " +
          phone +
          " and say whether the roof is open, a window is gone, or water is on the floor. Text the same number if you cannot talk. The form on the emergency page is a request for a call back, not a guaranteed arrival in a citywide storm.",
      ],
      points: [
        { title: "Do not climb", body: "A wet slope after a Houston squall is how people get hurt. Look from the ground and from inside." },
        { title: "Photograph", body: "The opening, the wet rooms, and the belongings. The photo log on this site is a room-by-room way to do that." },
        { title: "One call", body: "Say house, apartment, or commercial building, and the neighborhood. Access codes belong in that call." },
      ],
    },
    {
      eyebrow: "Hurricane",
      heading: "Gulf storms, June through November.",
      paragraphs: [
        "Hurricane season runs June 1 through November 30. A Gulf storm can lift shingles from Galveston and Clear Lake inland through Pearland, Houston, and Katy, throw limbs through roofs in Memorial and The Woodlands, and push rain through flashing for days after the eye has gone. The first construction job, when the wind lets a crew up, is often a tarp so the next band stays outside. Board-up is the broken window or door. They are different tasks and a bad storm needs both.",
        "We do not put people on a roof in lightning or in wind that makes it unsafe. Waiting for daylight is the right call even when a ceiling is dripping. Homes, apartment communities, and low commercial roofs are all in scope. A property manager should have unit numbers and a roof hatch ready. We work for the person who hires us. We are not a preferred vendor of any insurer.",
      ],
      points: [
        { title: "Tarp", body: "A cover buys time. It is not a roof and it is not a warranty. The roofing and tarp pages say what the permanent step is." },
        { title: "Board-up", body: "Glass and doors get a rigid cover. Plywood is temporary until the real closure is available." },
        { title: "Interior", body: "Wet insulation does not pause because an adjuster has not visited. Drying can start while the roof decision is open." },
      ],
    },
    {
      eyebrow: "Hail and wind",
      heading: "Spring squalls and hail on asphalt roofs.",
      paragraphs: [
        "Hail and straight-line wind are not only a hurricane problem. Spring and summer squalls mark roofs in Katy, Cypress, Sugar Land, and The Woodlands and still leave the house looking ordinary from the street. Bruised shingles, a cracked skylight, and gutters pulled off a corner are the clues. Interior stains may show up on the next rain, not the day of the hail. We inspect before we say a repair will hold or the roof needs to come off.",
        "We photograph the roof and any wet rooms before a tarp hides the opening. We can meet an adjuster on site. We do not decide whether marks are hail or wear, and we do not promise the claim. Wind deductibles on Texas policies are often a percentage of the dwelling limit and they are not the same as a plumbing deductible. That sentence is a reason to read your policy, not a quote of your deductible. We will not invent the percentage.",
      ],
      points: [
        { title: "All slopes", body: "The front can look calm while the west slope took the hail. We look at the roof, not the curb." },
        { title: "Gutters", body: "Dented runs and soft fascia are their own scope. A gutter full of leaves is maintenance." },
        { title: "Siding", body: "Wind cracks and lifted courses get photographed. A repair and a full re-side are different jobs." },
      ],
    },
    {
      eyebrow: "Freeze",
      heading: "The week Houston plumbing is not built for.",
      paragraphs: [
        "A hard freeze is uncommon, which is why attic lines, exterior walls, and hose bibs split. The leak often shows up when the ice thaws, as a ceiling stain or a wet garage slab. That is a plumbing loss, not a roof loss, even if both happen in a bad week. Shut the main, open a faucet, do not use a flame, and read the burst-pipe page for the first hour.",
        "Apartment breezeways and exposed commercial lines fail the same night as house attics. Tell us if more than one unit is wet. Water heaters that were left heating an empty tank are a second problem. We dry the building. We do not relight gas heaters.",
      ],
      points: [
        { title: "Thaw morning", body: "Walk the ceilings before you leave. A pipe can hold until the ice melts." },
        { title: "Not flood", body: "A burst attic line is not water rising from the bayou. If the street also came in, say both." },
        { title: "Slab", body: "Water on a Houston slab wicks into drywall. The slab-moisture guide is the closer read when the puddle is gone and the floor is not." },
      ],
    },
    {
      eyebrow: "Buildings",
      heading: "Houses, apartments, and commercial property.",
      paragraphs: [
        "Elite Restorations does this work for homes, apartment complexes, and commercial buildings. A house in Bellaire and a garden complex in the Energy Corridor need the same order: safety, photos, a cover, drying, then a repair estimate. The access is what changes. Gate codes, roof hatches, and who can authorize drywall belong on the first call. We do not enter an occupied unit without the access you arrange.",
        "For an active storm or water emergency, call " +
          phone +
          " any time. The office at 511 Crestwater Ct, Houston, TX 77082, is open Monday through Saturday, 8:00 AM to 6:00 PM for a scheduled visit. Family-owned since 1993. You can text the office number. We are not public adjusters. The commercial page is written for managers and owners. The house pages for tarp, board-up, roofing, and water damage are the trade-by-trade versions.",
      ],
      points: [
        { title: "Top floors", body: "Apartment water shows in the highest ceilings first. We list units. We do not dry a whole building from one stain." },
        { title: "Storefronts", body: "An open glass line is weather and security the same night. Board-up is that scope." },
        { title: "One team", body: "Tarp, dry-out, and the rebuild can stay here so you are not hiring a second contractor to close the walls." },
      ],
    },
    {
      eyebrow: "Claims",
      heading: "Help with the claim, without a promise of payment.",
      paragraphs: [
        "We help you document hurricane, hail, wind, tornado, and water damage, meet the adjuster on site if you want us there, and write a repair estimate. We assist through the repair with photos and notes you can share. We do not file the claim, interpret the policy, or promise approval. Flooding from rising water is often a different policy from wind. Check yours. Notice deadlines are in the policy. We will not invent 'you have 48 hours.'",
        "Mitigation, a tarp, a board-up, extraction, drying, limits further damage. Many policies expect that. Whether this one pays for it is the carrier's decision. Keep claim numbers, dates, and names. The insurance claims page, the photo log, and the pages about major Texas insurers are there so you can see the limit of our role. We do not use their logos and we are not affiliated with them.",
      ],
      points: [
        { title: "Photos before the cover", body: "Once the tarp is on, the opening is hidden. Shoot it first when it is safe." },
        { title: "Estimate", body: "Our number is the construction. The claim payment is whatever the insurer allows." },
        { title: "Tornado", body: "If the area is safe to enter, the work is still photos, temporary protection, and drying. Coverage is still not our decision." },
      ],
    },
    {
      eyebrow: "Cost",
      heading: "What a storm visit actually prices.",
      paragraphs: [
        "There is no flat storm price. A single tarp on a walkable one-story roof often plans around a few hundred dollars to about $2,000. A board-up of a ground-floor opening often plans in a similar band, a few hundred dollars to about $1,500, and more for a glass line or a second story. Drying one wet room often plans in the low thousands. A roof replacement, if the roof will not hold, is a different number. Many Houston houses plan a replacement around $12,000 to $24,000. Those are planning ranges, not quotes, and they are not deductibles.",
        "We will not fold drying, glass, and a new roof into one small number to win the first call. We price what we can see. In a citywide storm, arrival is not guaranteed by the form. Call " +
          phone +
          ", tell us the address and whether water is still coming in, and we will say the next safe step.",
      ],
      points: [
        { title: "Separate scopes", body: "Tarp, board-up, dry-out, and a new roof are different lines. We label them." },
        { title: "The deductible", body: "We do not know yours. Read the declarations page or ask your agent." },
        { title: "No lock-in", body: "A tarp is not an agreement to replace the roof. The permanent roof is a later decision." },
      ],
    },
  ] as const satisfies readonly GuideSection[],
  faqs: [
    { q: "What should I do first after a Houston storm?", a: "Stay off the roof, keep people out of sagging ceilings and water near power, photograph the damage, and call " + phone + " if the building is open or wet." },
    { q: "Do you tarp roofs and board up windows?", a: "Yes. A tarp is the roof. Board-up is the wall and the glass. We do both for houses, apartments, and commercial buildings when it is safe." },
    { q: "Will you come during the storm?", a: "Not onto a roof in lightning or unsafe wind. Call and we will tell you the next safe step. The online form is a call-back request, not a guaranteed arrival." },
    { q: "Do you help after hurricanes, hail, wind, and freezes?", a: "Yes. They damage buildings differently. We document the one you have, dry what got wet, and estimate the repair. We do not promise the claim." },
    { q: "Is flood the same as storm damage?", a: "No. Rising water is often a different policy from wind or hail. Check your policies. We will not rename bayou water as a plumbing break." },
    { q: "Can property managers call?", a: "Yes, any time for an active emergency. Have the address, the access, and which units are wet. The commercial page is written for that call." },
    { q: "How do I make a photo log?", a: "Wide shots, close shots, the source, and the belongings, before cleanup. The guide on this site walks through a room-by-room log. It does not create coverage." },
    { q: "What does emergency tarping usually cost?", a: "Many single openings on a walkable roof plan around a few hundred dollars to about $2,000. Steeper or larger openings cost more. That is a range, not a quote, and it is not a new roof." },
    { q: "Are you public adjusters?", a: "No. We help with photos, mitigation, an on-site meeting, and a repair estimate. Your insurer decides coverage and payment." },
    { q: "Where are you, and when do you answer?", a: "511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. Call " + phone + " any time for an active storm or water emergency. Office hours for scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM. Text us at the same number." },
    { q: "Which neighborhoods do you cover?", a: "Greater Houston, including Houston, Westchase, Alief, the Energy Corridor, Katy, Sugar Land, Bellaire, Memorial, The Woodlands, Pearland, Clear Lake, and Galveston. The visit is at the property." },
  ],
};

export function stormPageWords() {
  return wordCount([
    stormPage.lede,
    ...stormPage.sections.flatMap((section) => [
      section.eyebrow,
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []).flatMap((point) => [point.title, point.body]),
    ]),
    ...stormPage.faqs.flatMap((faq) => [faq.q, faq.a]),
  ]);
}

const stormWords = stormPageWords();
if (stormWords < 1800) {
  throw new Error(`Storm page is ${stormWords} words, under 1800`);
}
if (stormPage.faqs.length < 10) {
  throw new Error("Storm page needs 10 FAQs");
}
