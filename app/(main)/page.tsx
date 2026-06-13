import BlogSection from "@/components/main/home/blog-section"
import HeroSection from "@/components/main/home/hero"
import Illustration from "@/components/main/home/illustration"
import ProjectsSection from "@/components/main/home/projects-section"

export default function HomePage() {
  return (
    <>
    <section className="container grid items-center gap-24 pb-12 pt-12 md:grid-cols-2 md:gap-10 md:pb-24 md:pt-32">
      <HeroSection />
      <Illustration />
    </section>
    <ProjectsSection />
    <BlogSection />
    </>
  )
}
