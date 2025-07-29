

import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path === '/dashboard';
  const token = request.cookies.get('token')?.value || '';

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isProtectedRoute && token) {
    try {
      //The secret key must be encoded for the 'jose' library
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

      // Use the 'jwtVerify' function from 'jose'
      await jwtVerify(token, secret);

      // If the line above doesn't throw an error, the token is valid.
      return NextResponse.next();
      
    } catch (error) {
      console.error('Error while verifying token:', error);
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};