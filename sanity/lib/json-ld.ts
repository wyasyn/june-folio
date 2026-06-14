import { getImageUrl } from "./image-utils"
import type { SanityImage } from "./image"
import type { Resume, SiteSettings } from "./types"

/** A plain JSON-LD node. Kept loose so callers only set the keys they have. */
export type JsonLdObject = Record<string, unknown>

const DEFAULT_AUTHOR_NAME = "Yasin Walum"

function absoluteUrl(base: string | undefined | null, path = "") {
  if (!base) return undefined
  return new URL(path, base).toString()
}

function authorName(
  settings: SiteSettings | null,
  resume: Resume | null
): string {
  return settings?.authorName ?? resume?.fullName ?? DEFAULT_AUTHOR_NAME
}

/**
 * A compact Person node used as the `author` on article-like pages. Points at
 * the full Person entity on the homepage via its stable `@id` when available.
 */
function authorRef(
  settings: SiteSettings | null,
  resume: Resume | null
): JsonLdObject {
  const ref: JsonLdObject = {
    "@type": "Person",
    name: authorName(settings, resume),
  }

  const url = settings?.siteUrl
  if (url) {
    ref.url = url
    ref["@id"] = absoluteUrl(url, "/#person")
  }

  return ref
}

/**
 * Full Person entity for the homepage, built from Site Settings and enriched
 * with the Resume singleton (job title, email, skills).
 */
export function buildPersonJsonLd(
  settings: SiteSettings | null,
  resume: Resume | null
): JsonLdObject {
  const url = settings?.siteUrl

  const person: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: authorName(settings, resume),
  }

  if (url) {
    person.url = url
    person["@id"] = absoluteUrl(url, "/#person")
  }

  const image = settings?.seo?.image
  if (image) person.image = getImageUrl(image, 1200, 630)

  const sameAs = (settings?.socialLinks ?? [])
    .map((link) => link.url)
    .filter((value): value is string => Boolean(value))
  if (sameAs.length) person.sameAs = sameAs

  if (resume?.jobTitle) person.jobTitle = resume.jobTitle
  if (resume?.email) person.email = resume.email
  if (resume?.skills?.length) person.knowsAbout = resume.skills

  return person
}

type PostNode = {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  coverImage?: SanityImage | null
  _updatedAt?: string | null
}

/** BlogPosting for a single blog post, authored by the Person. */
export function buildPostJsonLd(
  post: PostNode,
  settings: SiteSettings | null,
  resume: Resume | null
): JsonLdObject {
  const pageUrl = absoluteUrl(settings?.siteUrl, `/blog/${post.slug}`)

  const json: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: authorRef(settings, resume),
  }

  if (post._updatedAt) json.dateModified = post._updatedAt
  if (post.coverImage) json.image = getImageUrl(post.coverImage, 1200, 630)
  if (pageUrl) {
    json.url = pageUrl
    json.mainEntityOfPage = pageUrl
  }

  return json
}

type ProjectNode = {
  title: string
  slug: string
  description: string
  coverImage?: SanityImage | null
  tags?: string[] | null
  liveUrl?: string | null
  repoUrl?: string | null
  _updatedAt?: string | null
}

/** CreativeWork for a single project, authored by the Person. */
export function buildProjectJsonLd(
  project: ProjectNode,
  settings: SiteSettings | null,
  resume: Resume | null
): JsonLdObject {
  const pageUrl = absoluteUrl(settings?.siteUrl, `/works/${project.slug}`)

  const json: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: authorRef(settings, resume),
  }

  if (project._updatedAt) json.dateModified = project._updatedAt
  if (project.coverImage) json.image = getImageUrl(project.coverImage, 1200, 630)
  if (project.tags?.length) json.keywords = project.tags
  if (pageUrl) json.url = pageUrl

  const sameAs = [project.liveUrl, project.repoUrl].filter(
    (value): value is string => Boolean(value)
  )
  if (sameAs.length) json.sameAs = sameAs

  return json
}
