import { sanityFetch } from "@/sanity/lib/fetch"
import { PAGE_INTRO_QUERY } from "@/sanity/lib/queries"
import type { PageIntro } from "@/sanity/lib/types"

export async function BlogPageIntro() {
  const intro = await sanityFetch<PageIntro | null>({
    query: PAGE_INTRO_QUERY,
    params: { pageKey: "blog" },
    tags: ["pageIntro"],
  })

  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">
        {intro?.heading ?? "Blog"}
      </h1>
      <p className="mt-2 max-w-prose">
        {intro?.description ??
          "Notes and lessons from building web and mobile applications."}
      </p>
    </>
  )
}
