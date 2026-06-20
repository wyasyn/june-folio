import { randomBytes } from "crypto"

import {
  type NextRequest,
  NextResponse,
} from "next/server"

import {
  buildContentSecurityPolicy,
  staticSecurityHeaders,
} from "@/lib/security-headers"

export function proxy(request: NextRequest) {
  const nonce = randomBytes(16).toString("base64")
  const isDev = process.env.NODE_ENV === "development"
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce, isDev)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set("Content-Security-Policy", contentSecurityPolicy)

  for (const header of staticSecurityHeaders) {
    response.headers.set(header.key, header.value)
  }

  return response
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|studio|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|sitemap.xml|robots.txt|manifest.webmanifest|preferences-bootstrap.js).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
