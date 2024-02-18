import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, res: NextRequest) {
  const url = req.nextUrl.clone();

  const pathname = url.pathname;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.endsWith('.ico')
  ) {
    return undefined; // Do nothing
  }

  const accessToken = req.cookies.get('accessToken');
  const publicPaths = ['/login'];
  if (accessToken && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (accessToken === undefined && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const hostname = req.headers.get('host');
  const parts = hostname?.split('.') ?? [];
  const subdomain = parts.length > 0 ? parts[0] : '';

  url.pathname = `/_clients/${subdomain}${pathname}`;

  return NextResponse.rewrite(url);
}
