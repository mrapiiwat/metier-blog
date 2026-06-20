import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value
  const path = request.nextUrl.pathname

  if (path.startsWith('/admin')) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (path === '/login') {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
