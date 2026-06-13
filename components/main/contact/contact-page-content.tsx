import SocialIcons from "@/components/main/home/social-icons"
import { sanityFetch } from "@/sanity/lib/fetch"
import { PAGE_INTRO_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries"
import type { PageIntro, SiteSettings } from "@/sanity/lib/types"

export async function ContactPageIntro() {
  const intro = await sanityFetch<PageIntro | null>({
    query: PAGE_INTRO_QUERY,
    params: { pageKey: "contact" },
    tags: ["pageIntro"],
  })

  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">
        {intro?.heading ?? "Get in touch"}
      </h1>
      <p className="mt-2 max-w-prose">
        {intro?.description ??
          "Have a project in mind or just want to say hello? Drop a message and I will get back to you as soon as I can."}
      </p>
    </>
  )
}

export async function ContactSocialLinks() {
  const settings = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  })

  return (
    <div className="mt-12 md:mt-16">
      <p className="text-sm font-medium text-foreground">
        {settings?.contactSocialLabel ?? "Or find me on"}
      </p>
      <div className="mt-3">
        <SocialIcons socialLinks={settings?.socialLinks} />
      </div>
    </div>
  )
}
