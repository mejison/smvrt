import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = request.cookies.get('token');
  if (token && token.value) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/signin', request.url));
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
};