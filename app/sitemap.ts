import type { MetadataRoute } from "next"

import { client } from "@/sanity/lib/client"
import { dataset, projectId } from "@/sanity/lib/env"
import { SITEMAP_QUERY } from "@/sanity/lib/queries"

type SitemapEntry = {
  _type: "post" | "project"
  slug: string
  _updatedAt: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ?
      `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000")

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/works`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ]

  if (!projectId || !dataset) return staticRoutes

  try {
    const paths = await client.fetch<SitemapEntry[]>(SITEMAP_QUERY)

    const contentRoutes = paths.map((entry) => ({
      url: new URL(
        entry._type === "post" ? `/blog/${entry.slug}` : `/works/${entry.slug}`,
        baseUrl
      ).toString(),
      lastModified: new Date(entry._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    return [...staticRoutes, ...contentRoutes]
  } catch {
    return staticRoutes
  }
}
