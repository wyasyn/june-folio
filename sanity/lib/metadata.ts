import type { Metadata } from "next"

import { getImageUrl } from "@/sanity/lib/image-utils"
import { sanityFetch } from "@/sanity/lib/fetch"
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries"
import type { SiteSettings } from "@/sanity/lib/types"

export async function getSiteSettings() {
  return sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  })
}

export async function buildSiteMetadata(
  overrides?: {
    title?: string
    description?: string
    keywords?: string[] | null
    noIndex?: boolean
  }
): Promise<Metadata> {
  const settings = await getSiteSettings()
  const authorName = settings?.authorName ?? "Yasin Walum"
  const title = overrides?.title ?? settings?.seo?.title ?? `${authorName} — Software Engineer`
  const description =
    overrides?.description ??
    settings?.seo?.description ??
    "Uganda based software engineer building fast, scalable web and mobile applications."
  const keywords =
    overrides?.keywords ?? settings?.seo?.keywords ?? undefined

  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s — ${authorName}`,
    },
    description,
    metadataBase: settings?.siteUrl ? new URL(settings.siteUrl) : undefined,
  }

  if (keywords?.length) {
    metadata.keywords = keywords
  }

  if (settings?.seo?.image) {
    metadata.openGraph = {
      images: {
        url: getImageUrl(settings.seo.image, 1200, 630),
        width: 1200,
        height: 630,
      },
    }
  }

  if (overrides?.noIndex || settings?.seo?.noIndex) {
    metadata.robots = "noindex"
  }

  return metadata
}
