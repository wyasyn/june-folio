import { Suspense } from "react"

import Illustration from "@/components/main/home/illustration"
import { HomeFeaturedPosts } from "@/components/main/home/home-featured-posts"
import { HomeFeaturedProjects } from "@/components/main/home/home-featured-projects"
import { HomeHeroSection } from "@/components/main/home/home-hero-section"
import { HeroSkeleton } from "@/components/skeletons/hero-skeleton"
import { SectionSkeleton } from "@/components/skeletons/section-skeleton"

export default function HomePage() {
  return (
    <>
      <section className="container grid items-center gap-24 pb-12 pt-12 md:grid-cols-2 md:gap-10 md:pb-24 md:pt-32">
        <Suspense fallback={<HeroSkeleton />}>
          <HomeHeroSection />
        </Suspense>
        <Illustration />
      </section>
      <Suspense fallback={<SectionSkeleton count={3} />}>
        <HomeFeaturedProjects />
      </Suspense>
      <Suspense fallback={<SectionSkeleton count={3} />}>
        <HomeFeaturedPosts />
      </Suspense>
    </>
  )
}
