import ProjectCard from "@/components/project-card"
import { Button } from "@/components/ui/button"
import type { ProjectCard as ProjectCardType } from "@/sanity/lib/types"
import Link from "next/link"

export default function ProjectsSection({
  title = "Projects",
  projects = [],
}: {
  title?: string
  projects?: ProjectCardType[]
}) {
  if (!projects.length) return null

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button asChild variant="link">
          <Link href="/works" aria-label="View all projects">
            View All
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:mt-12 md:gap-x-6 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  )
}
