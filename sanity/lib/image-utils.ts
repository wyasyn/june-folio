import { urlFor } from "./image"
import type { SanityImage } from "./image"

const FALLBACK_IMAGE = "/images/placeholder.png"

/**
 * Reads Sanity's native LQIP (Low Quality Image Placeholder) — a base64 blur
 * data URL stored on the image asset's metadata. Queries must project it via
 * `"lqip": asset->metadata.lqip`. Returns undefined when unavailable so callers
 * can safely omit the `blur` placeholder.
 */
export function getBlurDataURL(
  source: SanityImage | null | undefined
): string | undefined {
  if (!source || typeof source !== "object") return undefined
  return (source as { lqip?: string | null }).lqip ?? undefined
}

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
