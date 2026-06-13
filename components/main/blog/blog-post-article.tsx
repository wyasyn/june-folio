import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { IconArrowLeft } from "@tabler/icons-react"
import type { PortableTextBlock } from "next-sanity"

import { PortableTextContent } from "@/components/portable-text"
import { Button } from "@/components/ui/button"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getBlurDataURL, getImageUrl } from "@/sanity/lib/image-utils"
import type { SanityImage } from "@/sanity/lib/image"
import { POST_QUERY } from "@/sanity/lib/queries"

type PostDetail = {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readTime?: string | null
  coverImage?: SanityImage | null
  body?: PortableTextBlock[] | null
}

export async function BlogPostArticle({ slug }: { slug: string }) {
  const post = await sanityFetch<PostDetail | null>({
    query: POST_QUERY,
    params: { slug },
    tags: [`post:${slug}`, "post"],
  })

  if (!post) notFound()

  const imageUrl = getImageUrl(post.coverImage, 1200, 675)
  const blurDataURL = getBlurDataURL(post.coverImage)

  return (
    <article className="container max-w-3xl pb-12 pt-12 md:pb-24 md:pt-24">
      <Button asChild size="sm" variant="ghost" className="-ml-2 mb-6 gap-1.5">
        <Link href="/blog">
          <IconArrowLeft className="size-4" />
          All posts
        </Link>
      </Button>

      <div className="flex items-center gap-2 text-sm">
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        {post.readTime ? (
          <>
            <span aria-hidden>•</span>
            <span>{post.readTime}</span>
          </>
        ) : null}
      </div>

      <h1 className="mt-3 text-3xl font-bold md:text-4xl">{post.title}</h1>

      <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          loading="eager"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
        />
      </div>

      {post.body?.length ? (
        <PortableTextContent value={post.body} />
      ) : (
        <p className="mt-8 text-base leading-relaxed md:text-lg">{post.excerpt}</p>
      )}
    </article>
  )
}
