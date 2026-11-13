import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';

import { areaPages } from '@/lib/area-pages';
import { CtaBand } from '@/components/cta-band';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { ImageReveal, Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { Photo } from '@/components/photo';
import { landingsForService } from '@/lib/local-landings';
import { absoluteUrl, localBusinessSchema, pageMetadata } from '@/lib/seo';
import { getService } from '@/lib/services';
import { site } from '@/lib/site';

const description =
  'Houston restoration for water, storm, wind, hail, and fire damage, plus insurance claims help. Family-owned since 1993. Call (713) 909-0034.';

export const metadata: Metadata = pageMetadata({
  title: 'Restoration Company in Houston, TX',
  description,
  path: '/restoration',
  image: '/images/services/water-damage-restoration.jpg',
});

const services = [
  {
    href: '/water-damage-restoration',
    label: 'Water damage restoration',
    body: 'Leaks, appliance failures, and water that came in at grade. Mapped, extracted, dried, then rebuilt.',
  },
  {
    href: '/roofing-emergency-tarp-repair',
    label: 'Emergency roof tarping',
    body: 'When a storm opens the roof, the first job is to stop more water and photograph what happened.',
  },
  {
    href: '/roofing',
    label: 'Roofing',
    body: 'Wind and hail repairs, or a replacement when the roof will not hold. Underlayment, flashing, and vents go with the roof you see.',
  },
  {
    href: '/roof-replacement',
    label: 'Roof replacement',
    body: 'Tear-off and a new roof when repair is no longer the honest answer.',
  },
  {
    href: '/siding',
    label: 'Siding',
    body: 'Sections the wind took, and elevations that need to match what is still on the house.',
  },
  {
    href: '/painting-drywall-repair',
    label: 'Painting and drywall repair',
    body: 'The walls that come out after a dry-out, patched and painted once the structure is actually dry.',
  },
  {
    href: '/insurance-claims',
    label: 'Insurance claims help',
    body: 'Photos and a written record of the damage, the drying, and the repairs. Your insurer decides coverage.',
  },
] as const;

const reads = [
  {
    href: '/what-to-do-after-a-fire-your-first-5-steps',
    label: 'What to do after a fire',
  },
  {
    href: '/remodeling-vs-restoring-whats-right-for-your-home',
    label: 'Restore or remodel',
  },
  {
    href: '/insurance-log',
    label: 'Free insurance photo log',
  },
  {
    href: '/water-damage-insurance-claims-in-texas',
    label: 'Water-damage claim checklist',
  },
] as const;

const faqs = [
  {
    q: 'What does a Houston restoration company handle?',
    a: 'Water damage, storm and wind and hail damage, fire and smoke cleanup, and the repairs that follow. A remodel is a separate decision, made after the house is dry and safe.',
  },
  {
    q: 'How quickly should water damage drying start?',
    a: 'The same day if you can. Houston humidity does not give wet drywall and insulation much time. If water is still coming in, call (713) 909-0034.',
  },
  {
    q: 'Do you repair storm, wind, and hail damage?',
    a: 'Yes. We photograph the roof and the wet rooms, tarp an open roof when it is safe to be up there, and then repair or replace the roof, siding, and interior finishes.',
  },
  {
    q: 'Can you help after a house fire?',
    a: 'After the fire department releases the property, we can board up openings, deal with soot, and dry the water used to put the fire out. Cleanup should not wait on soot. The rebuild can.',
  },
  {
    q: 'Will you decide what my insurance covers?',
    a: 'No. We provide inspection photos and a record of what was dried and repaired. Coverage is your insurer’s decision. The insurance photo log on this site is free if you want to start that record yourself.',
  },
  {
    q: 'Which parts of Houston do you restore?',
    a: 'Greater Houston, scheduled from 511 Crestwater Ct, Houston, TX 77082. City pages for water damage, and the neighborhoods beside the office, are linked on this page.',
  },
];

export default function RestorationPage() {
  const photo = getService('water-damage-restoration')?.image;
  const cities = landingsForService('water-damage-restoration');
  const relatedCities = [
    {
      href: '/water-damage-restoration-houston-tx',
      label: 'Water damage restoration in Houston',
    },
    { href: '/roofing-houston-tx', label: 'Roofing in Houston' },
    {
      href: '/roofing-emergency-tarp-repair-houston-tx',
      label: 'Emergency roof tarping in Houston',
    },
    { href: '/siding-houston-tx', label: 'Siding in Houston' },
    {
      href: '/insurance-claims-houston-tx',
      label: 'Insurance claims help in Houston',
    },
    {
      href: '/painting-drywall-repair-houston-tx',
      label: 'Painting and drywall in Houston',
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Restoration"
        title={['Restoration Company in Houston, TX']}
        lede="Water, storm, wind, hail, and fire damage, then the repairs. Family-owned in Houston since 1993. One team from the dry-out through the rebuild."
        crumbs={[{ name: 'Restoration', path: '/restoration' }]}
      >
        <Reveal delay={0.2} className="mt-8">
          <a
            href={site.phone.href}
            className="group inline-flex items-center gap-4 border border-accent-ink px-5 py-4 transition-colors hover:bg-accent hover:text-white"
          >
            <Phone
              className="size-4 text-accent-ink group-hover:text-white"
              aria-hidden
            />
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em]">
              Active leak or storm damage? Call {site.phone.display}
            </span>
          </a>
        </Reveal>
      </PageHero>

      {photo ? (
        <div className="gutter mx-auto max-w-[120rem] pt-6 md:pt-8">
          <ImageReveal
            immediate
            className="relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[21/9]"
          >
            <Photo
              image={photo}
              sizes="(min-width: 1920px) 1800px, 96vw"
              priority
            />
          </ImageReveal>
        </div>
      ) : null}

      <section className="border-b border-border py-16 md:py-24">
        <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">The job in front of us</p>
            <h2 className="font-display t-lg mt-4">
              Dry and safe first. Then decide what changes.
            </h2>
          </Reveal>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
            <p>
              Restoration puts a damaged house back. A supply line, a roof
              that let a storm in, hail, smoke, or the water the fire
              department left behind. The aim is a dry, safe, usable space,
              as close to the condition before the loss as the materials
              allow.
            </p>
            <p>
              A remodel is a different decision: a new layout, new cabinets, a
              bath that works better. Nothing has to be broken for that to
              make sense. When damage and a wish list arrive together, we dry
              and document first, then talk about what is worth changing.
            </p>
            <p>
              The office is at {site.address.streetAddress},{' '}
              {site.address.addressLocality}, {site.address.addressRegion}{' '}
              {site.address.postalCode}. The visit is at the house.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="water-heading"
        className="border-b border-border py-16 md:py-24"
      >
        <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">Water</p>
            <h2 id="water-heading" className="font-display t-lg mt-4">
              Find where the water went.
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Houston water damage is usually a supply line, an appliance, a
              roof opening, or water that came in at grade. Humidity keeps a
              room wet after the puddle is gone. Moisture in a slab, in
              insulation, or at the bottom of the drywall does not show up as
              a stain. We measure before we open more wall than the readings
              call for, extract what is standing, and dry with air movers and
              dehumidifiers. Repairs start when the structure is dry.
            </p>
            <Link
              href="/water-damage-restoration"
              className="mt-6 inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
            >
              Water damage restoration
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="storm-heading"
        className="border-b border-border py-16 md:py-24"
      >
        <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">Storm, wind, and hail</p>
            <h2 id="storm-heading" className="font-display t-lg mt-4">
              Cover the opening, then plan the roof.
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Hurricane season and the squalls that come with it lift
              shingles, drop limbs, and drive rain into ceilings from Clear
              Lake to Katy and The Woodlands. We photograph the damage, tarp
              the roof when it is safe to be up there, and then talk through
              repair or replacement with those pictures in hand. Siding and
              wet drywall travel with the same storm. A tarp is temporary. It
              is not the finished roof.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <li>
                <Link
                  href="/roofing-emergency-tarp-repair"
                  className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
                >
                  Emergency tarping
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </li>
              <li>
                <Link
                  href="/roofing"
                  className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
                >
                  Roofing
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </li>
              <li>
                <Link
                  href="/siding"
                  className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
                >
                  Siding
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="fire-heading"
        className="border-b border-border py-16 md:py-24"
      >
        <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">Fire</p>
            <h2 id="fire-heading" className="font-display t-lg mt-4">
              Soot, and the water used to put it out.
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Stay out until the fire department says the building is safe.
              After that, an open roof or a door that will not lock turns one
              loss into two. Soot is acidic. The longer it sits on metal,
              stone, and finished wood, the more of those surfaces are lost.
              The water used to fight the fire has to be dried like any other
              flood. The choice to restore the finishes or remodel the room
              can wait until the house is secure, dry, and documented.
            </p>
            <Link
              href="/what-to-do-after-a-fire-your-first-5-steps"
              className="mt-6 inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
            >
              What to do after a fire
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="claims-heading"
        className="border-b border-border py-16 md:py-24"
      >
        <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">Insurance</p>
            <h2 id="claims-heading" className="font-display t-lg mt-4">
              A record your adjuster can use.
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-lg leading-relaxed text-muted-foreground">
              We photograph the opening, the wet rooms, and the scope of
              drying and repair. We do not file the claim, and we do not
              decide what the policy pays. Protecting the house from more
              water does not wait on that decision. If you want a room-by-room
              packet of your own before anything is moved, the photo log is
              free to use whether or not you hire us.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <li>
                <Link
                  href="/insurance-claims"
                  className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
                >
                  Insurance claims help
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </li>
              <li>
                <Link
                  href="/insurance-log"
                  className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
                >
                  Open the photo log
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="restoration-services-heading"
        className="border-b border-border py-16 md:py-24"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <p className="eyebrow text-accent-ink">Services</p>
          <h2
            id="restoration-services-heading"
            className="font-display t-lg mt-4 max-w-[16ch]"
          >
            Where the work goes next.
          </h2>
          <ul className="mt-10 border-t border-border">
            {services.map((item) => (
              <li key={item.href} className="border-b border-border">
                <Link
                  href={item.href}
                  className="group grid gap-3 py-7 md:grid-cols-[minmax(0,22rem)_1fr_auto] md:items-baseline md:gap-10"
                >
                  <span className="font-display text-3xl leading-tight transition-colors group-hover:text-accent-ink">
                    {item.label}
                  </span>
                  <span className="leading-relaxed text-muted-foreground">
                    {item.body}
                  </span>
                  <ArrowUpRight
                    className="size-5 text-accent-ink"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {reads.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
                >
                  {item.label}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="restoration-faq-heading"
        className="border-b border-border py-16 md:py-24"
      >
        <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-accent-ink">Questions</p>
            <h2 id="restoration-faq-heading" className="font-display t-lg mt-4">
              Good to know.
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="restoration-cities-heading"
        className="border-b border-border py-16 md:py-24"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <p className="eyebrow text-accent-ink">Greater Houston</p>
          <h2
            id="restoration-cities-heading"
            className="font-display t-lg mt-4 max-w-[16ch]"
          >
            Cities and neighborhoods.
          </h2>
          <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
            Westchase, Alief, and the Energy Corridor sit beside the office.
            Every community below has a water-damage page. Roofing, tarping,
            siding, painting, and insurance claims each have a Houston page
            as well.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {areaPages.map((area) => (
              <li key={area.path}>
                <Link
                  href={area.path}
                  className="font-display text-3xl transition-colors hover:text-accent-ink"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {relatedCities.map((city) => (
              <li key={city.href}>
                <Link
                  href={city.href}
                  className="text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
                >
                  {city.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {cities.map((city) => (
              <li key={city.path}>
                <Link
                  href={city.path}
                  className="text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
                >
                  Water damage in {city.areaName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Water coming in, or a roof open?"
        body={`Call ${site.phone.display}. If you cannot call, the emergency form reaches the same team. For a planned remodel, request an estimate and tell us about the room.`}
        emergency
      />

      <JsonLd
        data={localBusinessSchema({
          description,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Houston restoration services',
            itemListElement: services.map((item, index) => ({
              '@type': 'Offer',
              position: index + 1,
              itemOffered: {
                '@type': 'Service',
                name: item.label,
                url: absoluteUrl(item.href),
              },
            })),
          },
        })}
      />
    </>
  );
}
