import { createImageUrlBuilder } from "@sanity/image-url"

import { client } from "./client"

export type SanityImage = Parameters<
  ReturnType<typeof createImageUrlBuilder>["image"]
>[0]

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}
