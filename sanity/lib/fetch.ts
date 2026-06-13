import { cacheLife, cacheTag } from "next/cache"
import type { QueryParams } from "next-sanity"

import { client } from "./client"

type SanityFetchOptions = {
  query: string
  params?: QueryParams
  tags?: string[]
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: SanityFetchOptions): Promise<T> {
  "use cache"
  cacheLife("hours")

  for (const tag of tags) {
    cacheTag(tag)
  }

  return client.fetch<T>(query, params)
}
