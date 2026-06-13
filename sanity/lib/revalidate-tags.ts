type SanityWebhookPayload = {
  _type?: string
  slug?: string | null
}

const TYPE_TAGS: Record<string, string[]> = {
  siteSettings: ["siteSettings"],
  homePage: ["homePage"],
  resume: ["resume"],
  pageIntro: ["pageIntro"],
  post: ["post", "homePage"],
  project: ["project", "homePage"],
}

export function getTagsForSanityDocument(body: SanityWebhookPayload): string[] {
  const type = body._type
  if (!type) return []

  const tags = new Set(TYPE_TAGS[type] ?? [type])

  if (body.slug) {
    if (type === "post") tags.add(`post:${body.slug}`)
    if (type === "project") tags.add(`project:${body.slug}`)
  }

  return [...tags]
}
