import Footer from "@/components/main/footer"
import { sanityFetch } from "@/sanity/lib/fetch"
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries"
import type { SiteSettings } from "@/sanity/lib/types"

export async function FooterShell() {
  const settings = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  })

  return (
    <Footer
      footerLinks={settings?.footerLinks ?? undefined}
      footerCopyright={settings?.footerCopyright ?? undefined}
      authorName={settings?.authorName ?? undefined}
    />
  )
}
