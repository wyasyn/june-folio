import type { Metadata } from "next"
import { Suspense } from "react"

import { BlogPostArticle } from "@/components/main/blog/blog-post-article"
import { ArticleSkeleton } from "@/components/skeletons/article-skeleton"
import { buildSiteMetadata } from "@/sanity/lib/metadata"
import { sanityFetch } from "@/sanity/lib/fetch"
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries"

type PostDetail = {
  title: string
  excerpt: string
  seo?: {
    title?: string
    description?: string
    keywords?: string[] | null
    noIndex?: boolean
  }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: POST_SLUGS_QUERY,
    tags: ["post"],
  })

  return slugs.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<PostDetail | null>({
    query: POST_QUERY,
    params: { slug },
    tags: [`post:${slug}`, "post"],
  })

  if (!post) return {}

  return buildSiteMetadata({
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    keywords: post.seo?.keywords,
    noIndex: post.seo?.noIndex,
  })
}

export default function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      {params.then(({ slug }) => (
        <BlogPostArticle slug={slug} />
      ))}
    </Suspense>
  )
}
