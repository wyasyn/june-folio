import type { Metadata } from "next"
import { Suspense } from "react"

import {
  ContactPageIntro,
  ContactSocialLinks,
} from "@/components/main/contact/contact-page-content"
import ContactFormSection from "@/components/main/contact/contact-form-section"
import { ContactFormSkeleton } from "@/components/skeletons/contact-form-skeleton"
import { PageIntroSkeleton } from "@/components/skeletons/page-intro-skeleton"
import { buildSiteMetadata } from "@/sanity/lib/metadata"
import { sanityFetch } from "@/sanity/lib/fetch"
import { PAGE_INTRO_QUERY } from "@/sanity/lib/queries"
import type { PageIntro } from "@/sanity/lib/types"

export async function generateMetadata(): Promise<Metadata> {
  const intro = await sanityFetch<PageIntro | null>({
    query: PAGE_INTRO_QUERY,
    params: { pageKey: "contact" },
    tags: ["pageIntro"],
  })

  return buildSiteMetadata({
    title: intro?.seo?.title ?? "Contact — Yasin Walum",
    description:
      intro?.seo?.description ?? "Get in touch about a project or just say hello.",
    keywords: intro?.seo?.keywords,
    noIndex: intro?.seo?.noIndex ?? false,
  })
}

function ContactSocialSkeleton() {
  return (
    <div className="mt-12 animate-pulse md:mt-16" aria-hidden>
      <div className="h-4 w-28 rounded bg-muted" />
      <div className="mt-3 flex gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="size-9 rounded-full bg-muted" />
        ))}
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <div className="container max-w-3xl pb-12 pt-12 md:pb-24 md:pt-24">
      <Suspense fallback={<PageIntroSkeleton />}>
        <ContactPageIntro />
      </Suspense>

      <div className="mt-8 md:mt-12">
        <Suspense fallback={<ContactFormSkeleton />}>
          <ContactFormSection />
        </Suspense>
      </div>

      <Suspense fallback={<ContactSocialSkeleton />}>
        <ContactSocialLinks />
      </Suspense>
    </div>
  )
}
