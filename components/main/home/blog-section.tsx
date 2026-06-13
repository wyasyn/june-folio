import BlogCard from '@/components/blog-card'
import { Button } from '@/components/ui/button'
import { blogPosts } from '@/data/blogs'
import Link from 'next/link'

export default function BlogSection() {
  return (
    <div className="container py-12">
        <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog</h2>
        <Button asChild variant={"link"}>
            <Link href="/blog">
                View All
            </Link>
        </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 mt-8 md:mt-12">
            {blogPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>
    </div>
  )
}
