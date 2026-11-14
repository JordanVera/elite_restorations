import { duplicateQuestions } from "@/lib/faqs";
import { waterFaqs as extraWaterFaqs } from "@/lib/faqs/pages";
import type { GuideSection } from "@/lib/guides/types";
import { img, type Img } from "@/lib/images";
import { moreWaterCauses } from "@/lib/water-causes-rest";
import { wordCount } from "@/lib/words";

export type WaterCause = {
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

const phone = "(713) 909-0034";
const sharedLinksNote =
  "We photograph the damage and do the work you hire. Your insurer decides coverage. We are not public adjusters and we do not give legal advice.";

function cause(
  input: Omit<WaterCause, "path" | "image"> & { image?: Img },
): WaterCause {
  return {
    ...input,
    path: `/${input.slug}`,
    image:
      input.image ??
      img(
        "/images/services/water-damage-restoration.jpg",
        "Air movers drying a Houston property during water damage restoration",
      ),
  };
}

const waterCauseInputs: readonly WaterCause[] = [
  cause({
    slug: "burst-frozen-pipe-water-damage-houston",
    metaTitle: "Burst Pipe Damage in Houston",
    description:
      "Frozen and burst pipe water damage in Houston homes, apartments, and commercial buildings. We help you shut the water off, dry the building, and document the claim. Call (713) 909-0034.",
    eyebrow: "Frozen and burst pipes",
    title: ["Houston burst pipe", "water damage."],
    lede: "A hard freeze is uncommon in Houston, so the pipes that fail are usually the ones nobody checked: a line in the attic, a pipe in an exterior wall, or a hose bib. If water is already out, stop it, photograph it, and call.",
    hubHeading: "Freeze and burst pipes",
    hubBody:
      "A hard freeze can split attic lines, pipes in exterior walls, and hose bibs on Houston slab homes. The water is often already on the ceiling or the floor before anyone sees the pipe.",
    firstSteps:
      "Shut the main off if you can do it safely. Open a faucet so the line can drain. Stay out of standing water near outlets. Thaw a reachable pipe with warm air, never an open flame.",
    drying:
      "We find where the water traveled in the slab and the walls, remove what is standing, and dry with air movers and dehumidifiers until moisture readings say it is ready to repair.",
    claim:
      "Many homeowners policies treat a sudden burst differently from a slow leak. That wording is in your policy, and it is not the same on every policy, so read yours or ask your insurer. We document the break and the wet rooms. Your insurer decides which description fits.",
    sections: [
      {
        eyebrow: "First hour",
        heading: "Stop the water before you save the floor.",
        paragraphs: [
          "If a pipe is spraying, or a ceiling is dripping from a line you cannot see, turn off the main. On most Houston houses it is at the meter or where the line enters. Turn it clockwise. A single fixture may have its own valve. Use that only when you are sure the break is on that one supply. Apartment buildings and commercial water lines are not always labeled the way a house meter is. If you cannot find the shutoff, call " +
            phone +
            " and tell the manager or the occupants to stay out of the wet rooms.",
          "After the main is off, open a faucet on the lowest floor, hot and cold if you do not know which line failed. If the pipe is frozen and has not burst, an open faucet gives the thaw somewhere to go. A hair dryer on a reachable frozen spot, kept off the water, is enough. Never use a torch or an open flame. If the supply is off, turn the water heater off so it is not heating an empty tank. A heater can fail in the same freeze if it keeps running dry.",
        ],
        points: [
          { title: "Stay out of the water", body: "If water is near outlets, appliances, or the breaker panel, leave the room. Do not walk through it to reach a valve you are not sure about." },
          { title: "Pipes in the attic", body: "Many Houston houses run water lines through the attic. When one freezes, you usually see a stain on the ceiling, not the pipe itself." },
          { title: "Outdoor hose bibs", body: "A hose bib left under pressure can split in a freeze. The leak may be inside the wall, not at the handle you can see outside." },
        ],
      },
      {
        eyebrow: "Where it goes",
        heading: "Slabs, ceilings, and more than one unit.",
        paragraphs: [
          "Most houses around our office at 511 Crestwater Ct sit on concrete slabs. Water from a burst line does not drop into a crawlspace. It runs across the slab, wicks into the base of the drywall, and soaks padding under floors. A second-floor or attic break lands in the ceiling and can cross rooms before it drips. We map that path with meters. Thermal imaging helps when the stain is smaller than the wet area, which is common.",
          "In an apartment building the same break can wet the unit below and the corridor. We write down each unit that is actually wet. One spotted ceiling is not a reason to dry the whole stack. Commercial buildings add ceiling tile, a server closet, or a stock room under the line. Tell us what is underneath. Hurricane season is a different time of year. A hard freeze in Houston is a winter event, often one or two nights, and the calls come the morning the pipes thaw.",
        ],
        points: [
          { title: "Wet insulation", body: "Insulation in a ceiling does not dry just because the drip stopped. It has to come out or be dried in place. We will tell you which." },
          { title: "Floors hold water", body: "Vinyl and laminate can trap water on the concrete. Wood swells. Carpet padding stays wet. The floor is part of the dry-out, and we talk about it from the start." },
          { title: "The unit below", body: "If you hear water and you are not on the top floor, the broken pipe may be in the unit above you. Call anyway. That ceiling still has to be dried." },
        ],
      },
      {
        eyebrow: "Drying",
        heading: "Remove the water, then dry, then repair.",
        paragraphs: [
          "Towels and a household fan are enough for a puddle on a hard floor that you caught immediately. Call for drying when water got into the building: the wall cavity, the ceiling, the slab edge, or under a floor. We remove standing water, set air movers and dehumidifiers, and check moisture until the readings say it is safe to close the wall. Houston humidity is why we bring a dehumidifier. Outside air is often too wet to finish the job.",
          "Repairs start when the structure is dry. Drywall, insulation, flooring, and cabinets that swelled are the rebuild. We can do that work. We wait to hang new drywall until the cavity is dry, even if someone wants the unit to look finished for a showing. Homes, apartments, and commercial spaces follow the same order. Access, and who can approve opening a wall, is what changes.",
        ],
        points: [
          { title: "Same crew for the rebuild", body: "Drying and the rebuild can stay with Elite Restorations, family-owned in Houston since 1993." },
          { title: "We measure before we close a wall", body: "Paint that looks dry does not mean the wall is dry. A moisture meter tells us when it is safe to close it." },
          { title: "Furniture is separate", body: "A soaked mattress or a wet sofa is a different job from the wall and the floor. We will tell you which pieces we are drying." },
        ],
      },
      {
        eyebrow: "Claims",
        heading: "Sudden burst versus a leak that went on.",
        paragraphs: [
          "Many Texas homeowners and dwelling policies treat a sudden and accidental discharge differently from seepage or a leak that continued over time. Those sentences are in the policy. They are not the same from one insurer to the next, and a flood policy is a different contract from the homeowners policy. Check your policy or ask your insurer. We describe a burst attic line as we find it. A long-term leak stays a long-term leak in our notes.",
          sharedLinksNote +
            " We photograph the break if it is visible, the rooms, and the moisture, and we can meet the adjuster on site. The repair estimate is the price of the construction. It is not the amount the claim will pay. Use the photo log if you want a room-by-room record before anything is thrown away. The slab-moisture guide is the closer read when water stayed in the concrete after a supply line failed.",
        ],
        points: [
          { title: "Keep the broken piece", body: "If you can do it safely, keep the split pipe or the fitting. Do not throw it away before someone photographs it." },
          { title: "Call your insurer", body: "Call the company on the policy and write down the claim number. Any deadline is in your policy, so ask your insurer instead of guessing." },
          { title: "Stopping more damage", body: "Shutting off the water and starting the dry-out keeps the loss from spreading. Whether this policy pays you back for that work is your insurer's decision." },
        ],
      },
      {
        eyebrow: "Houston",
        heading: "Why a freeze here surprises the plumbing.",
        paragraphs: [
          "Houses in Houston, Katy, Sugar Land, The Woodlands, and Clear Lake are built for heat. Supplies in attics and on exterior walls are often uninsulated because a hard freeze is not the normal week. When one arrives, those lines are the ones that split, often while people are asleep or out of town. Apartment complexes with exposed lines in breezeways and commercial buildings with rooftop or exterior water lines fail the same night. The morning thaw is when the ceiling opens.",
          "We answer " +
            phone +
            " any time for an active water emergency at a house, an apartment community, or a commercial building. The office at 511 Crestwater Ct, Houston, TX 77082, is open Monday through Saturday, 8:00 AM to 6:00 PM for a scheduled visit. You can text that number. Elite Restorations has been family-owned here since 1993. We dry and repair the building for you, not for your insurer. We do not claim a certification this site does not list.",
        ],
        points: [
          { title: "Check after the ice melts", body: "A frozen pipe can stay closed until the ice melts, then let go. If the freeze just broke, walk the house and look at the ceilings before you leave." },
          { title: "Take hoses off the bibs", body: "Disconnect garden hoses before a freeze. A hose left on the outdoor faucet is a split we see every cold snap." },
          { title: "Freeze or hurricane", body: "A freeze is a plumbing problem. A hurricane is usually the roof and the wind. We write down which one actually happened." },
        ],
      },
    ],
    faqs: [
      { q: "What should I do first if a Houston pipe bursts?", a: "Shut the main off if you can do it safely, open a faucet, stay out of water near electricity, and call " + phone + ". Photograph the rooms before you throw anything away." },
      { q: "Should I thaw a frozen pipe myself?", a: "Only a spot you can reach, with a hair dryer, never a flame. If the pipe is in the attic or behind a wall, shutting the water off and calling is the safer move." },
      { q: "Do you dry houses, apartments, and commercial buildings?", a: "Yes. The steps are the same. On an apartment or a commercial building, access and who can approve the work are what change." },
      { q: "How do you dry a slab after a burst pipe?", a: "We remove standing water, meter the slab and the walls, and run air movers and dehumidifiers. The slab-moisture guide explains why the concrete can stay wet after the puddle is gone." },
      { q: "Is a burst pipe the same as a flood claim?", a: "Usually not. Rising water from the street is often a flood policy. A burst supply is a different kind of loss. Check your policies. Your insurer decides which one applies." },
      { q: "Sudden break or a long-term leak: which is this?", a: "We describe what we can see, including whether the damage looks new. The policy language is yours to read. We leave the label to your insurer. We cannot promise payment." },
      { q: "Will you meet the adjuster?", a: "Yes, if you want us on site. We walk through the wet areas and the repairs. Your insurer handles the settlement. We do not give legal advice." },
      { q: "Can you rebuild the drywall and floors?", a: "Yes, after the readings say the structure is dry. Drying and the rebuild can stay with one company." },
      { q: "What does this usually cost?", a: "A small contained release and a whole-house ceiling failure are not the same number. As a planning range, not a quote, drying one wet room often plans in the low thousands, and a wide release costs more. We price what we measure." },
      { q: "Are you available after hours?", a: "For active water emergencies, call " + phone + " any time. Office hours for scheduled visits are Monday through Saturday, 8:00 AM to 6:00 PM. Text us at the same number." },
      { q: "Where are you located?", a: "511 Crestwater Ct, Houston, TX 77082. Family-owned since 1993. We schedule Greater Houston from that office, including Westchase, Katy, Sugar Land, and The Woodlands." },
    ],
  }),
  ...moreWaterCauses,
];

export const waterCauses: readonly WaterCause[] = waterCauseInputs.map((page) => {
  const extra = extraWaterFaqs[page.slug];
  if (!extra) throw new Error(`Missing water FAQs: ${page.slug}`);
  const faqs = [...page.faqs, ...extra];
  const repeated = duplicateQuestions(faqs);
  if (repeated.length > 0) {
    throw new Error(`${page.slug} repeats FAQ: ${repeated.join(" | ")}`);
  }
  return { ...page, faqs };
});

function pageWords(page: WaterCause) {
  return wordCount([
    page.lede,
    page.hubBody,
    page.firstSteps,
    page.drying,
    page.claim,
    ...page.sections.flatMap((section) => [
      section.eyebrow,
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []).flatMap((point) => [point.title, point.body]),
    ]),
    ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
  ]);
}

for (const page of waterCauses) {
  const words = pageWords(page);
  const faqs = page.faqs.length;
  if (words < 1600) {
    throw new Error(`${page.slug} is ${words} words, under 1600`);
  }
  if (faqs < 10) throw new Error(`${page.slug} has ${faqs} FAQs`);
}

export function getWaterCause(slug: string) {
  return waterCauses.find((page) => page.slug === slug);
}

export { pageWords as waterCauseWords };
