import BlogSection from "@/components/main/home/blog-section"
import { sanityFetch } from "@/sanity/lib/fetch"
import { HOME_PAGE_QUERY, POSTS_QUERY } from "@/sanity/lib/queries"
import type { HomePage, PostCard } from "@/sanity/lib/types"

export async function HomeFeaturedPosts() {
  const [homePage, posts] = await Promise.all([
    sanityFetch<HomePage | null>({
      query: HOME_PAGE_QUERY,
      tags: ["homePage"],
    }),
    sanityFetch<PostCard[]>({
      query: POSTS_QUERY,
      tags: ["post"],
    }),
  ])

  const featuredPosts =
    homePage?.featuredPosts?.filter(Boolean) ??
    posts.filter((post) => post).slice(0, 3)

  return (
    <BlogSection
      title={homePage?.blogSectionTitle ?? "Blog"}
      posts={featuredPosts}
    />
  )
}
