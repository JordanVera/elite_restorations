'use client';

import { usePathname } from 'next/navigation';

import { isSpanishPath } from '@/lib/i18n';

/**
 * The root layout cannot call headers() or every page is dynamic and
 * Vercel sends Cache-Control: no-store. The pathname is known while each
 * page is statically rendered, so the html lang matches the route.
 */
export function HtmlDocument({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || '/';
  const es = isSpanishPath(pathname);
  return (
    <html lang={es ? 'es' : 'en'} suppressHydrationWarning className={className}>
      {children}
    </html>
  );
}
