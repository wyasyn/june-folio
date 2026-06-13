import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react"
import type { PortableTextBlock } from "next-sanity"

import { PortableTextContent } from "@/components/portable-text"
import { Button } from "@/components/ui/button"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getImageUrl } from "@/sanity/lib/image-utils"
import type { SanityImage } from "@/sanity/lib/image"
import { PROJECT_QUERY } from "@/sanity/lib/queries"

type ProjectDetail = {
  _id: string
  title: string
  slug: string
  description: string
  coverImage?: SanityImage | null
  tags?: string[] | null
  body?: PortableTextBlock[] | null
  liveUrl?: string | null
  repoUrl?: string | null
}

export async function WorkProjectArticle({ slug }: { slug: string }) {
  const project = await sanityFetch<ProjectDetail | null>({
    query: PROJECT_QUERY,
    params: { slug },
    tags: [`project:${slug}`, "project"],
  })

  if (!project) notFound()

  const imageUrl = getImageUrl(project.coverImage, 1200, 675)

  return (
    <article className="container max-w-3xl pb-12 pt-12 md:pb-24 md:pt-24">
      <Button asChild size="sm" variant="ghost" className="-ml-2 mb-6 gap-1.5">
        <Link href="/works">
          <IconArrowLeft className="size-4" />
          All works
        </Link>
      </Button>

      <h1 className="text-3xl font-bold md:text-4xl">{project.title}</h1>

      {project.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          priority
          loading="eager"
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      {project.body?.length ? (
        <PortableTextContent value={project.body} />
      ) : (
        <p className="mt-8 text-base leading-relaxed md:text-lg">
          {project.description}
        </p>
      )}

      {project.liveUrl || project.repoUrl ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <Button asChild variant="secondary" size="sm">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                View live
                <IconExternalLink className="size-4" />
              </a>
            </Button>
          ) : null}
          {project.repoUrl ? (
            <Button asChild variant="outline" size="sm">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                Source code
                <IconExternalLink className="size-4" />
              </a>
            </Button>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
