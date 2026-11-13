import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * WordPress leftovers. Next.js 16 runs this file as proxy (the renamed
 * middleware). Redirects in next.config run first, so those paths are
 * excluded from the trailing-slash redirect and answered here in one hop.
 * On Vercel production, the platform firewall often denies the same paths
 * with 403 before this code runs. See the pull request notes.
 */
function isWordPressJunk(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (/^\/wp-admin(?:\/|$)/i.test(pathname)) return true;
  if (/^\/wp-[^/]*\.php$/i.test(path)) return true;
  if (/^\/xmlrpc\.php$/i.test(path)) return true;
  return false;
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (isWordPressJunk(pathname)) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
        'X-Robots-Tag': 'noindex',
      },
    });
  }

  // Old WordPress search URLs were /?s=query. Keep the homepage working and
  // tell crawlers not to index the query variant.
  if (pathname === '/' && searchParams.has('s')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/wp-admin',
    '/wp-admin/:path*',
    // `:path*` only matches extra slash segments, so `/wp-login.php` needs
    // the filename before `.php` as its own parameter.
    '/wp-:name.php',
    '/xmlrpc.php',
  ],
};
