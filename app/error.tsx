"use client"

import { useEffect } from "react"
import Link from "next/link"
import { IconHome, IconRefresh } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the error for monitoring / debugging.
    console.error(error)
  }, [error])

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-x-clip">
      <div
        aria-hidden
        className="bg-grid-pattern pointer-events-none fixed inset-0 -z-10"
      />
      <section className="container flex flex-col items-center text-center">
        <p className="font-mono text-sm font-medium tracking-widest text-muted-foreground">
          500
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-prose text-muted-foreground">
          An unexpected error occurred. You can try again, or head back home and
          pick up where you left off.
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-xs text-muted-foreground/70">
            Error ID: {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Button
            size="lg"
            className="group gap-2"
            onClick={() => reset()}
          >
            <IconRefresh className="size-4 transition-transform duration-300 group-hover:rotate-90" />
            <span>Try again</span>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/">
              <IconHome className="size-4" />
              <span>Back home</span>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
