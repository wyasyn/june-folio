import Image from "next/image"
import Link from "next/link"

import { getImageUrl } from "@/sanity/lib/image-utils"
import type { PostCard } from "@/sanity/lib/types"

export default function BlogCard({ post }: { post: PostCard }) {
  const imageUrl = getImageUrl(post.coverImage, 800, 600)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mx-auto block w-full max-w-sm sm:max-w-none"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex flex-col gap-1 md:mt-4">
        <div className="flex items-center gap-2 text-xs">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
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
        <h3 className="text-base font-bold transition-colors duration-300 group-hover:text-primary md:text-lg">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm">{post.excerpt}</p>
      </div>
    </Link>
  )
}
