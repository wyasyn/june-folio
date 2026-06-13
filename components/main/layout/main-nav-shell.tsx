import MainNav from "@/components/main-nav"
import { sanityFetch } from "@/sanity/lib/fetch"
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries"
import type { SiteSettings } from "@/sanity/lib/types"

export async function MainNavShell() {
  const settings = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  })

  return <MainNav navItems={settings?.navItems ?? undefined} />
}
