"use client"

import { useEffect } from "react"

import "./globals.css"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className="overflow-x-clip">
        <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-3 text-center">
          <section className="mx-auto flex max-w-5xl flex-col items-center">
            <p className="font-mono text-sm font-medium tracking-widest text-muted-foreground">
              500
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Something went wrong
            </h1>
            <p className="mt-4 max-w-prose text-muted-foreground">
              A critical error occurred and the app could not recover. Please try
              reloading the page.
            </p>
            {error.digest ? (
              <p className="mt-3 font-mono text-xs text-muted-foreground/70">
                Error ID: {error.digest}
              </p>
            ) : null}
            <button
              onClick={() => reset()}
              className="mt-8 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  )
}
