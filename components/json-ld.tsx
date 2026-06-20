import type { JsonLdObject } from "@/sanity/lib/json-ld"

/**
 * Renders a JSON-LD structured-data `<script>` tag. Follows the Next.js
 * recommendation of escaping `<` to its unicode form to guard against XSS in
 * the serialized payload.
 */
export function JsonLd({
  data,
}: {
  data: JsonLdObject | JsonLdObject[]
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
