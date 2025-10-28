import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the session token from cookies
  const sessionToken = request.cookies.get('authjs.session-token')?.value || 
                       request.cookies.get('__Secure-authjs.session-token')?.value;
  
  // Check if accessing admin routes (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // If no session token, redirect to login
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If has session and trying to access login, redirect to dashboard
  if (pathname === '/admin/login' && sessionToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};



