import Image from "next/image"
import Link from "next/link"

import { getImageUrl } from "@/sanity/lib/image-utils"
import type { ProjectCard } from "@/sanity/lib/types"

export default function ProjectCard({ project }: { project: ProjectCard }) {
  const imageUrl = getImageUrl(project.coverImage, 800, 600)

  return (
    <Link
      href={`/works/${project.slug}`}
      className="group mx-auto block w-full max-w-sm sm:max-w-none"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex flex-col gap-1 md:mt-4">
        <h3 className="text-base font-bold capitalize transition-colors duration-300 group-hover:text-primary md:text-lg">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm">{project.description}</p>
      </div>
    </Link>
  )
}
