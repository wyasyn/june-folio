import type { Metadata } from "next"
import { Suspense } from "react"

import { WorkProjectArticle } from "@/components/main/works/work-project-article"
import { ArticleSkeleton } from "@/components/skeletons/article-skeleton"
import { buildSiteMetadata } from "@/sanity/lib/metadata"
import { sanityFetch } from "@/sanity/lib/fetch"
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries"

type ProjectDetail = {
  title: string
  description: string
  seo?: {
    title?: string
    description?: string
    keywords?: string[] | null
    noIndex?: boolean
  }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: PROJECT_SLUGS_QUERY,
    tags: ["project"],
  })

  return slugs.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await sanityFetch<ProjectDetail | null>({
    query: PROJECT_QUERY,
    params: { slug },
    tags: [`project:${slug}`, "project"],
  })

  if (!project) return {}

  return buildSiteMetadata({
    title: project.seo?.title || project.title,
    description: project.seo?.description || project.description,
    keywords: project.seo?.keywords,
    noIndex: project.seo?.noIndex,
  })
}

export default function SingleWorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      {params.then(({ slug }) => (
        <WorkProjectArticle slug={slug} />
      ))}
    </Suspense>
  )
}
