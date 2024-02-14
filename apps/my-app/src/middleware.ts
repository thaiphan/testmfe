import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const pathname = url.pathname;
  if (pathname.startsWith('/_next')) {
    return undefined; // Do nothing
  }

  const hostname = req.headers.get('host');
  const parts = hostname?.split('.') ?? [];
  const subdomain = parts.length > 0 ? parts[0] : '';

  url.pathname = `/_clients/${subdomain}${pathname}`;

  return NextResponse.rewrite(url);
}
