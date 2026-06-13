import HeroSection from "@/components/main/home/hero"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getBlurDataURL } from "@/sanity/lib/image-utils"
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries"
import type { HomePage, SiteSettings } from "@/sanity/lib/types"

export async function HomeHeroSection() {
  const [homePage, settings] = await Promise.all([
    sanityFetch<HomePage | null>({
      query: HOME_PAGE_QUERY,
      tags: ["homePage"],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["siteSettings"],
    }),
  ])

  const avatarBlurDataURL = getBlurDataURL(homePage?.heroAvatar)

  return (
    <HeroSection
      homePage={homePage}
      socialLinks={settings?.socialLinks ?? undefined}
      avatarBlurDataURL={avatarBlurDataURL}
    />
  )
}
