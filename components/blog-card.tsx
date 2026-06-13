import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { BlogPost } from '@/data/blogs'

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group w-full max-w-sm mx-auto sm:max-w-none">
        <div className='relative w-full aspect-4/3 rounded-lg overflow-hidden bg-muted'>
        <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>

        <div className='mt-3 md:mt-4 flex flex-col gap-1'>
        <div className="flex items-center gap-2 text-xs">
            <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </time>
            <span aria-hidden>•</span>
            <span>{post.readTime}</span>
        </div>
        <h3 className="text-base md:text-lg font-bold group-hover:text-primary transition-colors duration-300">{post.title}</h3>
        <p className="text-sm line-clamp-2">{post.excerpt}</p>
        </div>
    </Link>
  )
}
