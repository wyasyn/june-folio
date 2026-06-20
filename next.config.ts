import type { NextConfig } from "next"

import { staticSecurityHeaders } from "@/lib/security-headers"

const nextConfig: NextConfig = {
  cacheComponents: true,
  serverExternalPackages: ["@react-pdf/renderer"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [...staticSecurityHeaders],
      },
    ]
  },
}

export default nextConfig
