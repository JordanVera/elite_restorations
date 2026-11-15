import type { Metadata } from 'next';
import { Clock, Mail, MapPin } from 'lucide-react';

import { LeadForm } from '@/components/lead-form';
import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { languageAlternates, pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Houston Restoration',
  description:
    'Call (713) 909-0034 for restoration or remodeling in Houston. The office is at 511 Crestwater Ct, Houston, TX 77082, or you can request an estimate.',
  path: '/contact',
  languages: languageAlternates('/contact', '/es/contact'),
});

type SearchParams = Promise<{
  service?: string | string[];
  note?: string | string[];
}>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const service = first(params.service);
  const note = first(params.note)?.slice(0, 500);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={['Start a conversation.']}
        lede="Call, email, or send a note. If water is coming in, or the roof is open to the weather, call first. Then tell us what happened."
        crumbs={[{ name: 'Contact', path: '/contact' }]}
      />

      <section
        aria-label="Contact details and request form"
        className="py-16 md:py-24"
      >
        <div className="gutter mx-auto grid max-w-[120rem] gap-16 lg:grid-cols-12 lg:gap-24">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-accent-ink">Talk to us</p>
            <a
              href={site.phone.href}
              className="font-display mt-4 block text-[clamp(2rem,10vw,3.75rem)] leading-none transition-colors hover:text-accent-ink"
            >
              {site.phone.display}
            </a>
            <a
              href={site.phone.sms}
              className="mt-3 inline-flex text-sm underline decoration-foreground/30 underline-offset-[0.45em] hover:decoration-accent-ink"
            >
              Text us
            </a>

            <dl className="mt-12 space-y-8">
              <div className="flex gap-4">
                <dt className="mt-1 text-accent-ink">
                  <Mail className="size-4" aria-hidden />
                  <span className="sr-only">Email</span>
                </dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all underline decoration-foreground/30 underline-offset-[0.5em] hover:decoration-accent-ink"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="mt-1 text-accent-ink">
                  <Clock className="size-4" aria-hidden />
                  <span className="sr-only">Hours</span>
                </dt>
                <dd>
                  <ul className="space-y-1">
                    {site.hours.map((h) => (
                      <li key={h.days} className="flex flex-wrap gap-x-4">
                        <span>{h.days}</span>
                        <span className="text-muted-foreground">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="mt-1 text-accent-ink">
                  <MapPin className="size-4" aria-hidden />
                  <span className="sr-only">Service area</span>
                </dt>
                <dd className="max-w-[38ch] leading-relaxed text-muted-foreground">
                  <p className="text-foreground">{site.name}</p>
                  <p>{site.address.streetAddress}</p>
                  <p>
                    {site.address.addressLocality}, {site.address.addressRegion}{' '}
                    {site.address.postalCode}
                  </p>
                  <a
                    href={site.phone.href}
                    className="mt-3 inline-block text-foreground underline decoration-foreground/30 underline-offset-[0.5em] hover:decoration-accent-ink"
                  >
                    {site.phone.display}
                  </a>
                  <p className="mt-4">
                    We come to homes across Greater Houston, including{' '}
                    {site.serviceArea.slice(0, 8).join(', ')}, and the
                    neighborhoods around them.
                  </p>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="eyebrow text-accent-ink">Request an estimate</p>
            <h2 className="font-display t-md mt-4 max-w-[20ch]">
              Tell us about the property.
            </h2>
            <div className="relative mt-10">
              <LeadForm
                key={`${service ?? ''}|${note ?? ''}`}
                defaultService={service}
                defaultMessage={note}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
