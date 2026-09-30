import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { ImageReveal, Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { Photo } from '@/components/photo';
import { img } from '@/lib/images';
import { processSteps } from '@/lib/process';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Elite Restorations is a family-owned remodeling and restoration company serving Greater Houston since 1993. Meet the people who answer the phone and do the work.',
  path: '/about',
  image: '/images/about/george_family.jpeg',
});

const storyPhotos = [
  img(
    '/images/about/george_family.jpeg',
    'The Rodriguez family at a graduation ceremony',
  ),
  img(
    '/images/about/george_and_harltley.webp',
    'George Rodriguez with Harley',
  ),
  img(
    '/images/about/gearge_and_wendy.jpeg',
    'George Rodriguez with Wendy',
  ),
];

const wide = img(
  '/images/about/george_and_tilman.jpeg',
  'George Rodriguez with his son George III on a job site',
);

const team = [
  {
    name: 'George Rodriguez',
    role: 'Owner',
    body: 'Started in construction at 17, working beside his father, and took over the company when his father retired. His son, George III, now works alongside him.',
    photo: img(
      '/images/about/george_softball_2.webp',
      'George Rodriguez, owner of Elite Restorations',
    ),
  },
  {
    name: 'Michael Hanson',
    role: 'Lead Estimator',
    body: 'Walks the job, measures, and puts together the scope, cost and timeline so clients understand the project before it begins.',
    photo: img(
      '/images/about/michael_hanson.webp',
      'Michael Hanson, lead estimator',
    ),
  },
  {
    name: 'Daniela',
    role: 'Office Operator Manager',
    body: 'Handles client support, scheduling, documentation and coordination with the crews.',
    photo: img(
      '/images/about/daniela.webp',
      'Daniela, office operator manager',
    ),
  },
  {
    name: 'Norma',
    role: 'Office Operator Project Manager',
    body: "Organizes project timelines and communication, and schedules every installation around the team's capacity and your expectations.",
    photo: img(
      '/images/about/norma.webp',
      'Norma, office operator project manager',
    ),
  },
];

const values = [
  {
    title: 'Show up.',
    body: 'A first call that gets answered, a walkthrough that happens when we said, and a crew that arrives ready to work.',
  },
  {
    title: 'Say it plainly.',
    body: 'Clear scopes, straightforward pricing conversations and honest advice, including when the answer is to repair rather than replace.',
  },
  {
    title: 'Finish properly.',
    body: 'Grout lines, trim joints, cleanup. The details people notice last are the ones we check first.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={['A family business,', 'since 1993.']}
        lede="Elite Restorations is family-owned and operated in Houston. The people who plan your project are the same people who pick up the phone."
        crumbs={[{ name: 'About', path: '/about' }]}
      />

      <section aria-labelledby="story-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent-ink">Our story</p>
              <h2
                id="story-heading"
                className="font-display t-lg mt-4 max-w-[16ch]"
              >
                Learned on job sites, passed down.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
              <Reveal>
                <p className="measure">
                  George Rodriguez began working in construction at 17,
                  alongside his father. Years of hands-on work and mentorship
                  followed, and when his father retired, George took over the
                  company and kept it going.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="measure">
                  Today his son, George III, works in the business too. That
                  continuity shows up in how we work: the same values, the same
                  attention to the unglamorous parts of a job, and a long view
                  of every relationship with a client.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="measure">
                  We began as remodelers and grew into restoration because the
                  two are closely related. Knowing how a house goes together
                  makes us better at repairing it after a storm or a leak, and
                  knowing how it fails makes us better at building it back.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ul className="mx-auto grid max-w-xs grid-cols-3 gap-3 sm:max-w-sm sm:gap-4 lg:mx-0 lg:max-w-none">
              {storyPhotos.map((photo, i) => (
                <li key={photo.src}>
                  <Reveal delay={i * 0.08}>
                    <ImageReveal className="relative aspect-[3/4]">
                      <Photo
                        image={photo}
                        sizes="(min-width: 1024px) 11vw, 28vw"
                      />
                    </ImageReveal>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="values-heading"
        className="border-y border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">How we work</p>
            <h2 id="values-heading" className="font-display t-lg mt-4">
              Three habits we hold onto.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-12 md:grid-cols-3">
            {values.map((value, i) => (
              <li key={value.title}>
                <Reveal delay={i * 0.1} className="border-t border-border pt-6">
                  <span className="font-display text-5xl text-accent-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display mt-4 text-3xl">{value.title}</h3>
                  <p className="mt-3 max-w-[36ch] leading-relaxed text-muted-foreground">
                    {value.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="team-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-accent-ink">The team</p>
            <h2 id="team-heading" className="font-display t-lg mt-4">
              Who you will talk to.
            </h2>
            <p className="mt-6 max-w-[34ch] leading-relaxed text-muted-foreground">
              A small office and experienced crews, so your project has a name
              and a number attached to it from the first call to the final
              walkthrough.
            </p>
          </Reveal>
          <ul className="border-t border-border lg:col-span-8">
            {team.map((person, i) => (
              <li key={person.name} className="border-b border-border">
                <Reveal
                  delay={i * 0.05}
                  className="grid grid-cols-[5.5rem_1fr] gap-x-5 gap-y-3 py-8 md:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,1.4fr)] md:items-start md:gap-x-8 md:gap-y-0"
                >
                  <div className="relative row-span-2 aspect-[3/4] w-[5.5rem] shrink-0 overflow-hidden bg-surface">
                    <Photo
                      image={person.photo}
                      sizes="(min-width: 768px) 88px, 88px"
                    />
                  </div>
                  <div className="col-start-2 md:row-start-1">
                    <h3 className="font-display text-3xl leading-tight">
                      {person.name}
                    </h3>
                    <p className="eyebrow mt-2 text-accent-ink">
                      {person.role}
                    </p>
                  </div>
                  <p className="col-start-2 leading-relaxed text-muted-foreground md:col-start-3 md:row-start-1">
                    {person.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-label="Family photograph"
        className="gutter mx-auto max-w-[120rem] pb-20 md:pb-28"
      >
        <ImageReveal className="relative aspect-[16/10] md:aspect-[21/9]">
          <Photo image={wide} sizes="96vw" />
        </ImageReveal>
      </section>

      <section
        aria-labelledby="process-heading"
        className="border-t border-border py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow text-accent-ink">Process</p>
              <h2 id="process-heading" className="font-display t-lg mt-4">
                The same six steps, every time.
              </h2>
            </Reveal>
          </div>
          <ol className="mt-12 border-t border-border">
            {processSteps.map((step) => (
              <li
                key={step.title}
                className="grid gap-3 border-b border-border py-6 md:grid-cols-[4rem_14rem_1fr] md:items-baseline md:gap-8"
              >
                <span className="eyebrow text-muted-foreground">
                  {step.index}
                </span>
                <h3 className="font-display text-3xl">{step.title}</h3>
                <p className="max-w-[60ch] leading-relaxed text-muted-foreground">
                  {step.lead} {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="area-heading"
        className="border-t border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-accent-ink">Where we work</p>
            <h2 id="area-heading" className="font-display t-lg mt-4">
              Greater Houston.
            </h2>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.2em]"
            >
              Check your neighborhood
              <ArrowRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 font-display text-2xl md:text-3xl">
              {site.serviceArea.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Let us look at your project."
        body="Whether it is a planned remodel or something that went wrong overnight, the first step is a conversation."
      />
    </>
  );
}
