import ProjectCard from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import Link from 'next/link'

export default function ProjectsSection() {
  return (
    <div className="container py-12">
        <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button asChild variant={"link"}>
            <Link href="/projects">
                View All
            </Link>
        </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 mt-8 md:mt-12">
            {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
    </div>
  )
}
