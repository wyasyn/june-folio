import Link from "next/link"
import { IconArrowRight, IconLock } from "@tabler/icons-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { buildSiteMetadata } from "@/sanity/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata({
    title: "Sign in — June Folio Studio",
    description: "Sign in to manage site content in Sanity Studio.",
    noIndex: true,
  })
}

export default function LoginPage() {
  return (
    <div className="container flex min-h-[70dvh] max-w-lg flex-col justify-center py-12 md:py-24">
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <IconLock className="size-5" aria-hidden />
        </div>

        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Studio sign in
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Manage portfolio content, metadata, blog posts, and projects from the
          embedded Sanity Studio. You will use the same Sanity account providers
          (Google, GitHub, or email) used across Sanity projects.
        </p>

        <Button asChild className="mt-8 w-full gap-2">
          <Link href="/studio">
            Continue to Studio
            <IconArrowRight className="size-4" />
          </Link>
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Only invited project members can access the Studio.
        </p>
      </div>
    </div>
  )
}
