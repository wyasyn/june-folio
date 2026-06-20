import type { MetadataRoute } from "next"

import { siteThemeColors } from "@/lib/site-theme"
import { getSiteSettings } from "@/sanity/lib/metadata"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings()
  const siteUrl = settings?.siteUrl?.trim()

  const siteName =
    settings?.siteName?.trim() ||
    settings?.authorName?.trim() ||
    "June Portfolio"
  const shortName = siteName.length > 12 ? `${siteName.slice(0, 12).trim()}…` : siteName
  const description =
    settings?.seo?.description?.trim() ||
    "Portfolio of a software engineer building fast, scalable web and mobile applications."
  const startUrl = "/"
  const scope = "/"
  const appId = siteUrl ? `${siteUrl.replace(/\/$/, "")}/` : startUrl

  return {
    id: appId,
    name: siteName,
    short_name: shortName,
    description,
    start_url: startUrl,
    scope,
    lang: "en",
    dir: "ltr",
    display: "standalone",
    display_override: ["standalone", "minimal-ui", "browser"],
    orientation: "portrait",
    background_color: siteThemeColors.light.background,
    theme_color: siteThemeColors.light.theme,
    categories: ["portfolio", "productivity", "developer"],
    prefer_related_applications: false,
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
