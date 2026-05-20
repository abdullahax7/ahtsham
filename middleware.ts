import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Only protect /admin and /api/admin
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Exclude login page and its API from protection
    if (pathname === '/admin/login' || pathname === '/api/admin/login') {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get('admin_session');
    
    // Very simple check: verify cookie matches our configured secret
    if (!sessionCookie || sessionCookie.value !== process.env.ADMIN_SECRET) {
      // Redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
