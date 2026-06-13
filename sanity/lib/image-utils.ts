import { urlFor } from "./image"
import type { SanityImage } from "./image"

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dkdteb9m5/image/upload/v1704969716/samples/bike.jpg"

export function getImageUrl(
  source: SanityImage | null | undefined,
  width = 1200,
  height = 630
) {
  if (!source) return FALLBACK_IMAGE
  return urlFor(source).width(width).height(height).url()
}

export function getImageSrcSet(
  source: SanityImage | null | undefined,
  widths = [400, 800, 1200]
) {
  if (!source) return undefined
  return widths
    .map((w) => `${urlFor(source).width(w).auto("format").url()} ${w}w`)
    .join(", ")
}
