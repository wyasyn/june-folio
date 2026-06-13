import type { Metadata } from "next"
import { Suspense } from "react"

import { WorksPageIntro } from "@/components/main/works/works-page-intro"
import { WorksProjectsGrid } from "@/components/main/works/works-projects-grid"
import { CardGridSkeleton } from "@/components/skeletons/card-grid-skeleton"
import { PageIntroSkeleton } from "@/components/skeletons/page-intro-skeleton"
import { buildSiteMetadata } from "@/sanity/lib/metadata"
import { sanityFetch } from "@/sanity/lib/fetch"
import { PAGE_INTRO_QUERY } from "@/sanity/lib/queries"
import type { PageIntro } from "@/sanity/lib/types"

export async function generateMetadata(): Promise<Metadata> {
  const intro = await sanityFetch<PageIntro | null>({
    query: PAGE_INTRO_QUERY,
    params: { pageKey: "works" },
    tags: ["pageIntro"],
  })

  return buildSiteMetadata({
    title: intro?.seo?.title ?? "Works — Yasin Walum",
    description: intro?.seo?.description ?? "Projects I have designed and built.",
    keywords: intro?.seo?.keywords,
    noIndex: intro?.seo?.noIndex ?? false,
  })
}

export default function WorksPage() {
  return (
    <div className="container pb-12 pt-12 md:pb-24 md:pt-24">
      <Suspense fallback={<PageIntroSkeleton />}>
        <WorksPageIntro />
      </Suspense>

      <Suspense fallback={<CardGridSkeleton count={6} />}>
        <WorksProjectsGrid />
      </Suspense>
    </div>
  )
}
