import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { Project } from '@/data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/works/${project.slug}`} className="block group w-full max-w-sm mx-auto sm:max-w-none">
        <div className='relative w-full aspect-4/3 rounded-lg overflow-hidden bg-muted'>
        <Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>

        <div className='mt-3 md:mt-4 flex flex-col gap-1'>
        <h3 className="text-base md:text-lg font-bold capitalize group-hover:text-primary transition-colors duration-300">{project.title}</h3>
        <p className="text-sm line-clamp-2">{project.description}</p>
        </div>
    </Link>
  )
}
