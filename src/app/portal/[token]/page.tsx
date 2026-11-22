import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import { after } from 'next/server';

import { ResourceCards } from '@/components/portal/resource-cards';
import { PortalSelections } from '@/components/portal/portal-selections';
import { site } from '@/lib/site';
import { getCustomerPortal, recordPortalView, resolvePortal } from '@/server/portal/customer';
import { storageMode } from '@/server/portal/storage';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Material selections' };

function PortalHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Image src="/images/logo/logo-black.png" alt="Elite Restorations" width={132} height={60} className="h-auto w-[116px]" priority />
        <a href={site.phone.href} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground">
          <Phone className="size-4" aria-hidden />
          <span className="hidden sm:inline">{site.phone.display}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  );
}

function ContactFooter() {
  return (
    <footer className="mx-auto max-w-3xl px-4 pt-4 pb-12 sm:px-6">
      <div className="rounded-[12px] border border-border bg-white p-5 text-sm">
        <p className="font-medium">Questions about a selection?</p>
        <p className="mt-1 text-muted-foreground">Call or text us, or send an email. We&apos;re happy to help you decide.</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          <a href={site.phone.href} className="inline-flex items-center gap-2 font-medium hover:underline">
            <Phone className="size-4" aria-hidden /> {site.phone.display}
          </a>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 font-medium hover:underline">
            <Mail className="size-4" aria-hidden /> {site.email}
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Your choices help us order the right materials. They don&apos;t change your quote, contract, or price. If a selection affects cost,
          we&apos;ll talk with you first.
        </p>
      </div>
    </footer>
  );
}

function Unavailable({ expired }: { expired: boolean }) {
  return (
    <>
      <PortalHeader />
      <main id="main" className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">{expired ? 'This link has expired' : 'This link isn’t available'}</h1>
        <p className="mt-3 text-muted-foreground">
          {expired
            ? 'Contact us and we’ll send you a new link to finish your material selections.'
            : 'The link may have been mistyped, replaced with a new one, or closed. Contact us and we’ll help.'}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <a href={site.phone.href} className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-foreground px-4 font-medium text-white">
            <Phone className="size-4" aria-hidden /> {site.phone.display}
          </a>
          <a href={`mailto:${site.email}`} className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-input bg-white px-4 font-medium">
            <Mail className="size-4" aria-hidden /> Email us
          </a>
        </div>
      </main>
    </>
  );
}

export default async function CustomerPortalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const resolved = await resolvePortal(token);
  if (resolved.access !== 'open') return <Unavailable expired={resolved.access === 'expired'} />;

  const view = await getCustomerPortal(resolved.portal.id);
  if (!view) return <Unavailable expired={false} />;
  after(() => recordPortalView(resolved.portal).catch(() => undefined));

  const mode = storageMode();
  return (
    <>
      <PortalHeader />
      <main id="main" className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{view.title}</h1>
        {view.propertyAddress ? <p className="mt-1 text-sm text-muted-foreground">{view.propertyAddress}</p> : null}
        <p className="mt-4 leading-relaxed whitespace-pre-line text-foreground/85">{view.welcomeMessage}</p>
        <ResourceCards
          resources={view.resources}
          heading="Where to shop"
          description="These are the stores and yards we recommend for the materials on this project. Open a site, pick the product, then add the link or a photo of the label on the selection below."
        />
        <PortalSelections
          token={token}
          items={view.items}
          uploads={mode === 'blob' ? { mode: 'blob', portalId: resolved.portal.id } : mode === 'local' ? { mode: 'server' } : { mode: 'none' }}
        />
      </main>
      <ContactFooter />
    </>
  );
}
