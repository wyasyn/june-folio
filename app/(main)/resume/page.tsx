import { IconDownload } from "@tabler/icons-react"
import type { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { buildSiteMetadata } from "@/sanity/lib/metadata"
import { sanityFetch } from "@/sanity/lib/fetch"
import { RESUME_QUERY } from "@/sanity/lib/queries"
import type { Resume } from "@/sanity/lib/types"

export async function generateMetadata(): Promise<Metadata> {
  const resume = await sanityFetch<Resume | null>({
    query: RESUME_QUERY,
    tags: ["resume"],
  })

  const name = resume?.fullName ?? "Yasin Walum"

  return buildSiteMetadata({
    title: `Resume — ${name}`,
    description: resume?.jobTitle
      ? `Resume of ${name} — ${resume.jobTitle}.`
      : `Resume of ${name}.`,
  })
}

export default async function ResumePage() {
  const resume = await sanityFetch<Resume | null>({
    query: RESUME_QUERY,
    tags: ["resume"],
  })

  return (
    <div className="container pb-12 pt-12 md:pb-24 md:pt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Resume</h1>
          <p className="mt-2 max-w-prose text-muted-foreground">
            {resume?.fullName ?
              `${resume.fullName}${resume.jobTitle ? ` — ${resume.jobTitle}` : ""}`
            : "My resume, generated and kept up to date from the CMS."}
          </p>
        </div>

        {resume && (
          <Link
            href="/resume/pdf?download=1"
            prefetch={false}
            className={cn(buttonVariants({ variant: "default" }), "h-10 px-5")}
          >
            <IconDownload className="size-4" />
            Download PDF
          </Link>
        )}
      </div>

      {resume ?
        <div className="mt-8 overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
          <iframe
            src="/resume/pdf"
            title={`${resume.fullName} resume`}
            className="h-[80vh] min-h-[640px] w-full"
          />
        </div>
      : <div className="mt-8 rounded-xl border border-dashed p-12 text-center text-muted-foreground">
          No resume has been published yet. Add your details in the Resume
          section of the studio.
        </div>
      }
    </div>
  )
}
