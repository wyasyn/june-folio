import ProjectCard from "@/components/project-card"
import { sanityFetch } from "@/sanity/lib/fetch"
import { PROJECTS_QUERY } from "@/sanity/lib/queries"
import type { ProjectCard as ProjectCardType } from "@/sanity/lib/types"

export async function WorksProjectsGrid() {
  const projects = await sanityFetch<ProjectCardType[]>({
    query: PROJECTS_QUERY,
    tags: ["project"],
  })

  return (
    <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:mt-12 md:gap-x-6 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id}
          project={project}
          priority={index === 0}
        />
      ))}
    </div>
  )
}
