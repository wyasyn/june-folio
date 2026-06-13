import ProjectCard from "@/components/project-card"
import { projects } from "@/data/projects"

export const metadata = {
  title: "Works — Yasin Walum",
  description: "Projects I have designed and built.",
}

export default function WorksPage() {
  return (
    <div className="container pb-12 pt-12 md:pb-24 md:pt-24">
      <h1 className="text-3xl font-bold md:text-4xl">Works</h1>
      <p className="mt-2 max-w-prose">
        A selection of web and mobile projects I have designed and built.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 mt-8 md:mt-12">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
