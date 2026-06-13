import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  serverExternalPackages: ["@react-pdf/renderer"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
