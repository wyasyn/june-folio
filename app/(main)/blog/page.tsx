import BlogCard from "@/components/blog-card"
import { blogPosts } from "@/data/blogs"

export const metadata = {
  title: "Blog — Yasin Walum",
  description: "Writing about building web and mobile applications.",
}

export default function BlogPage() {
  return (
    <div className="container pb-12 pt-12 md:pb-24 md:pt-24">
      <h1 className="text-3xl font-bold md:text-4xl">Blog</h1>
      <p className="mt-2 max-w-prose">
        Notes and lessons from building web and mobile applications.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 mt-8 md:mt-12">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
