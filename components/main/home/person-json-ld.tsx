import { JsonLd } from "@/components/json-ld"
import { sanityFetch } from "@/sanity/lib/fetch"
import { buildPersonJsonLd } from "@/sanity/lib/json-ld"
import { getSiteSettings } from "@/sanity/lib/metadata"
import { RESUME_QUERY } from "@/sanity/lib/queries"
import type { Resume } from "@/sanity/lib/types"

export async function PersonJsonLd() {
  const [settings, resume] = await Promise.all([
    getSiteSettings(),
    sanityFetch<Resume | null>({ query: RESUME_QUERY, tags: ["resume"] }),
  ])

  return <JsonLd data={buildPersonJsonLd(settings, resume)} />
}
