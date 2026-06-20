import Image from "next/image"
import { notFound } from "next/navigation"
import { IconExternalLink } from "@tabler/icons-react"
import type { PortableTextBlock } from "next-sanity"
import { Suspense } from "react"

import { BackButton } from "@/components/main/back-button"
import { JsonLd } from "@/components/json-ld"
import { PortableTextContent } from "@/components/portable-text"
import { Button } from "@/components/ui/button"
import { sanityFetch } from "@/sanity/lib/fetch"
import { getBlurDataURL, getImageUrl } from "@/sanity/lib/image-utils"
import type { SanityImage } from "@/sanity/lib/image"
import { buildProjectJsonLd } from "@/sanity/lib/json-ld"
import { getSiteSettings } from "@/sanity/lib/metadata"
import { PROJECT_QUERY, RESUME_QUERY } from "@/sanity/lib/queries"
import type { Resume } from "@/sanity/lib/types"

type ProjectDetail = {
  _id: string
  _updatedAt?: string | null
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
  const [project, settings, resume] = await Promise.all([
    sanityFetch<ProjectDetail | null>({
      query: PROJECT_QUERY,
      params: { slug },
      tags: [`project:${slug}`, "project"],
    }),
    getSiteSettings(),
    sanityFetch<Resume | null>({ query: RESUME_QUERY, tags: ["resume"] }),
  ])

  if (!project) notFound()

  const imageUrl = getImageUrl(project.coverImage, 1200, 675)
  const blurDataURL = getBlurDataURL(project.coverImage)

  return (
    <article className="container max-w-3xl pb-12 pt-12 md:pb-24 md:pt-24">
      <Suspense fallback={null}>
        <JsonLd data={buildProjectJsonLd(project, settings, resume)} />
      </Suspense>
      <BackButton fallbackHref="/works" />

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
          fetchPriority="high"
          loading="eager"
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
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
