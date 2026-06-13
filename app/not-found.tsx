import Link from "next/link"
import type { Metadata } from "next"
import { IconArrowLeft, IconHome } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-x-clip">
      <div
        aria-hidden
        className="bg-grid-pattern pointer-events-none fixed inset-0 -z-10"
      />
      <section className="container flex flex-col items-center text-center">
        <p className="font-mono text-sm font-medium tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-prose text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Button asChild size="lg" className="group gap-2">
            <Link href="/">
              <IconHome className="size-4" />
              <span>Back home</span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="group gap-2">
            <Link href="/works">
              <IconArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span>View work</span>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
