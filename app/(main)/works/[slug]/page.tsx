import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { IconArrowLeft } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}

  return {
    title: `${project.title} — Yasin Walum`,
    description: project.description,
  }
}

export default async function SingleWorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <article className="container max-w-3xl pb-12 pt-12 md:pb-24 md:pt-24">
      <Button asChild size="sm" variant="ghost" className="-ml-2 mb-6 gap-1.5">
        <Link href="/works">
          <IconArrowLeft className="size-4" />
          All works
        </Link>
      </Button>

      <h1 className="text-3xl font-bold md:text-4xl">{project.title}</h1>

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

      <div className="relative mt-8 w-full overflow-hidden rounded-lg bg-muted aspect-video">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          loading="eager"
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <p className="mt-8 text-base leading-relaxed md:text-lg">
        {project.description}
      </p>
    </article>
  )
}
