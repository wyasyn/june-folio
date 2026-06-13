import BlogCard from "@/components/blog-card"
import { sanityFetch } from "@/sanity/lib/fetch"
import { POSTS_QUERY } from "@/sanity/lib/queries"
import type { PostCard } from "@/sanity/lib/types"

export async function BlogPostsGrid() {
  const posts = await sanityFetch<PostCard[]>({
    query: POSTS_QUERY,
    tags: ["post"],
  })

  return (
    <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:mt-12 md:gap-x-6 lg:grid-cols-3">
      {posts.map((post, index) => (
        <BlogCard key={post._id} post={post} priority={index === 0} />
      ))}
    </div>
  )
}
