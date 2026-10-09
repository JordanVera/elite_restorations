import { Breadcrumbs } from '@/components/breadcrumbs';
import { DriftPhoto } from '@/components/about/drift-photo';
import { Reveal, SplitLines } from '@/components/motion';
import { img } from '@/lib/images';

const family = img(
  '/images/about/george_family.jpeg',
  'The Rodriguez family at a graduation ceremony',
);
const harley = img(
  '/images/about/george_and_harltley.webp',
  'George Rodriguez with Harley',
);
const softball = img(
  '/images/about/george_softball.jpeg',
  'George Rodriguez with his softball team after a fall championship',
);

export function AboutHero() {
  return (
    <section aria-labelledby="about-heading" className="pt-24 pb-16 sm:pt-28 md:pb-24">
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="border-b border-border pb-4">
          <Breadcrumbs items={[{ name: 'About', path: '/about' }]} />
        </div>

        <div className="mt-8 grid items-start gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5 lg:pt-4">
            <SplitLines
              as="h1"
              id="about-heading"
              immediate
              stagger={0.08}
              lines={['A family business,', <em key="year">since 1993.</em>]}
              className="font-display t-lg"
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[36ch] text-lg leading-relaxed text-muted-foreground">
                Elite Restorations is family-owned and operated in Houston. The
                people who plan your project are the same people who pick up
                the phone.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <DriftPhoto
                image={family}
                offset={2.5}
                priority
                sizes="(min-width: 1024px) 22vw, 46vw"
                className="aspect-[3/4]"
              />
              <DriftPhoto
                image={harley}
                offset={4}
                delay={0.12}
                priority
                sizes="(min-width: 1024px) 22vw, 46vw"
                className="mt-10 aspect-[3/4] md:mt-16 lg:mt-24"
              />
            </div>
            <DriftPhoto
              image={softball}
              offset={2}
              delay={0.18}
              sizes="(min-width: 1024px) 48vw, 92vw"
              className="mt-3 aspect-[2/1] md:mt-4"
              imageClassName="object-[center_40%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
