import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    const sessionCookie = getSessionCookie(request);
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/panel', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/panel')) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }
};

export default middleware;
