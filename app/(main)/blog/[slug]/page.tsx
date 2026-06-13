import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { IconArrowLeft } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { blogPosts } from "@/data/blogs"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title} — Yasin Walum`,
    description: post.excerpt,
  }
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <article className="container max-w-3xl pb-12 pt-12 md:pb-24 md:pt-24">
      <Button asChild size="sm" variant="ghost" className="-ml-2 mb-6 gap-1.5">
        <Link href="/blog">
          <IconArrowLeft className="size-4" />
          All posts
        </Link>
      </Button>

      <div className="flex items-center gap-2 text-sm">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <span aria-hidden>•</span>
        <span>{post.readTime}</span>
      </div>

      <h1 className="mt-3 text-3xl font-bold md:text-4xl">{post.title}</h1>

      <div className="relative mt-8 w-full overflow-hidden rounded-lg bg-muted aspect-video">
        <Image
          src={post.image}
          alt={post.title}
          fill
          loading="eager"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <p className="mt-8 text-base leading-relaxed md:text-lg">
        {post.excerpt}
      </p>
    </article>
  )
}
