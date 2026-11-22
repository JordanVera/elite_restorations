'use client';

import { usePathname } from 'next/navigation';

/** /admin and /portal have their own chrome. */
export function isAppPath(pathname: string) {
  return /^\/(admin|portal)(\/|$)/.test(pathname);
}

/**
 * Renders the public header, footer, and call bar everywhere except the admin
 * dashboard and customer portals. The root layout stays static because the
 * pathname is read on the client.
 */
export function SiteChrome({
  header,
  footer,
  callBar,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  callBar: React.ReactNode;
  children: React.ReactNode;
}) {
  const app = isAppPath(usePathname() || '/');
  if (app) return <main id="main" tabIndex={-1} className="outline-none">{children}</main>;
  return (
    <>
      {header}
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      {footer}
      {callBar}
    </>
  );
}
