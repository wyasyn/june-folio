import { renderToBuffer } from "@react-pdf/renderer"
import { type NextRequest, NextResponse } from "next/server"

import { ResumeDocument } from "@/components/resume/resume-document"
import { sanityFetch } from "@/sanity/lib/fetch"
import { RESUME_QUERY } from "@/sanity/lib/queries"
import type { Resume } from "@/sanity/lib/types"

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "resume"
  )
}

export async function GET(req: NextRequest) {
  const resume = await sanityFetch<Resume | null>({
    query: RESUME_QUERY,
    tags: ["resume"],
  })

  if (!resume) {
    return NextResponse.json({ message: "Resume not found" }, { status: 404 })
  }

  const buffer = await renderToBuffer(<ResumeDocument data={resume} />)

  const download = req.nextUrl.searchParams.get("download") === "1"
  const filename = `${slugify(resume.fullName)}-resume.pdf`
  const disposition = download ? "attachment" : "inline"

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${filename}"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  })
}
