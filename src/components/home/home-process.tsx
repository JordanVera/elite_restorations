import { Reveal, SplitLines } from "@/components/motion";
import { Photo } from "@/components/photo";
import { StickyScroll, type StickyScrollItem } from "@/components/ui/sticky-scroll-reveal";
import { img } from "@/lib/images";
import { processSteps } from "@/lib/process";

const visuals = [
  img(
    "/images/projects/roofing/brick-house-missing-shingles.webp",
    "Roofer working on a brick and cream-siding home on a sunny day",
  ),
  img(
    "/images/projects/flooring/espresso-plank-detail.jpg",
    "Close detail of dark espresso wood plank flooring",
  ),
  img(
    "/images/projects/siding/siding-upgrade-in-progress.jpg",
    "Home exterior mid-project with ladders and new siding going up",
  ),
  img(
    "/images/projects/roofing/roofer-ladder-underlayment.webp",
    "Roofer on a ladder installing underlayment on a roof deck",
  ),
  img(
    "/images/projects/backsplash/gold-faucet-detail.webp",
    "Detail of a gold faucet against tile in a finished kitchen",
  ),
  img(
    "/images/projects/bathrooms/freestanding-tub-window.jpg",
    "Finished bathroom with a freestanding tub beside a window",
  ),
];

export function HomeProcess() {
  const items: StickyScrollItem[] = processSteps.map((step, i) => ({
    eyebrow: step.index,
    title: step.title,
    lead: step.lead,
    body: step.body,
    visual: <Photo image={visuals[i]} sizes="(min-width: 1024px) 45vw, 92vw" />,
  }));

  return (
    <section aria-labelledby="process-heading" className="relative py-28 md:py-40">
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="grid gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-muted-foreground">Process</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="process-heading"
              className="t-xl mt-6"
              lines={[
                "Six steps.",
                <span key="b">
                  No <em className="text-accent-ink">guesswork.</em>
                </span>,
              ]}
            />
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.15}>
              <p className="text-muted-foreground">
                Whether it is a bathroom or a roof, the sequence is the same: look closely, agree
                on the plan, prepare, build, finish, and walk it together.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <StickyScroll items={items} />
        </div>
      </div>
    </section>
  );
}
