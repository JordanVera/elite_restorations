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

const ADMIN_COOKIES = ['__Host-er_admin', 'er_admin'];

function isUnder(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** Private areas are never indexed, cached, or leaked through the Referer header. */
function privateResponse(response: NextResponse) {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('X-Frame-Options', 'DENY');
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Cookie presence only. Every admin page, action, and route still checks the
  // session and role in the database.
  if (isUnder(pathname, '/admin')) {
    const signedIn = ADMIN_COOKIES.some((name) => request.cookies.get(name)?.value);
    if (!signedIn && !isUnder(pathname, '/admin/login')) {
      const login = request.nextUrl.clone();
      login.pathname = '/admin/login';
      login.search = '';
      login.searchParams.set('next', `${pathname}${request.nextUrl.search}`);
      return privateResponse(NextResponse.redirect(login));
    }
    return privateResponse(NextResponse.next());
  }

  if (isUnder(pathname, '/portal') || isUnder(pathname, '/api/portal') || isUnder(pathname, '/api/admin')) {
    return privateResponse(NextResponse.next());
  }

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
    // Skip Next internals and dotted static files. Pages stay in the proxy
    // for the WordPress 410 and the old search noindex.
    '/((?!_next/static|_next/image|images/|favicon.ico|.*\\..*).*)',
    // wp-*.php and xmlrpc.php contain a dot, so the rule above skips them
    // and Next would 404. They still need the 410 from isWordPressJunk.
    '/wp-:name.php',
    '/xmlrpc.php',
  ],
};
