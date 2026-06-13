import ProjectsSection from "@/components/main/home/projects-section"
import { sanityFetch } from "@/sanity/lib/fetch"
import { HOME_PAGE_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries"
import type { HomePage, ProjectCard } from "@/sanity/lib/types"

export async function HomeFeaturedProjects() {
  const [homePage, projects] = await Promise.all([
    sanityFetch<HomePage | null>({
      query: HOME_PAGE_QUERY,
      tags: ["homePage"],
    }),
    sanityFetch<ProjectCard[]>({
      query: PROJECTS_QUERY,
      tags: ["project"],
    }),
  ])

  const featuredProjects =
    homePage?.featuredProjects?.filter(Boolean) ??
    projects.filter((project) => project).slice(0, 3)

  return (
    <ProjectsSection
      title={homePage?.projectsSectionTitle ?? "Projects"}
      projects={featuredProjects}
    />
  )
}
