import BlogCard from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import type { PostCard } from "@/sanity/lib/types"
import Link from "next/link"

export default function BlogSection({
  title = "Blog",
  posts = [],
}: {
  title?: string
  posts?: PostCard[]
}) {
  if (!posts.length) return null

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button asChild variant="link">
          <Link href="/blog">View All</Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:mt-12 md:gap-x-6 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
