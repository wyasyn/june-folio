import { urlFor } from "./image"
import type { SanityImage } from "./image"

const FALLBACK_IMAGE = "/images/placeholder.png"

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
