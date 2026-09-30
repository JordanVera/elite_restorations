import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { isKnownService } from "@/lib/inquiry";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Call, email or send a request to Elite Restorations for remodeling and restoration estimates across Greater Houston.",
  path: "/contact",
});

type SearchParams = Promise<{
  service?: string | string[];
  note?: string | string[];
  path?: string | string[];
}>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const service = first(params.service);
  const note = first(params.note)?.slice(0, 500);
  const path = first(params.path);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={["Start a conversation."]}
        lede="Call, email or send a request. If water is coming in or a roof is open to the weather, call first, then tell us what happened."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section aria-label="Contact details and request form" className="py-16 md:py-24">
        <div className="gutter mx-auto grid max-w-[120rem] gap-16 lg:grid-cols-12 lg:gap-24">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">Talk to us</p>
            <a
              href={site.phone.href}
              className="font-display mt-4 block text-5xl leading-none transition-colors hover:text-accent-ink sm:text-6xl"
            >
              {site.phone.display}
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
                  Serving Greater Houston, including {site.serviceArea.slice(0, 8).join(", ")} and surrounding
                  communities.
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="eyebrow text-accent-ink">Request an estimate</p>
            <h2 className="font-display t-md mt-4 max-w-[20ch]">Tell us what you need.</h2>
            <div className="relative mt-10">
              <LeadForm
                key={`${service ?? ""}|${note ?? ""}|${path ?? ""}`}
                defaultService={isKnownService(service) ? service : undefined}
                defaultMessage={note}
                defaultPath={path}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
