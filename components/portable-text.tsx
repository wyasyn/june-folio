import type { PortableTextBlock } from "next-sanity"
import { PortableText, type PortableTextComponents } from "@portabletext/react"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-muted-foreground last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-8 text-2xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-6 text-xl font-semibold tracking-tight first:mt-0">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-2 border-primary pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href
      if (!href) return <>{children}</>
      const isExternal = href.startsWith("http")
      return (
        <a
          href={href}
          className="font-medium text-primary underline-offset-4 hover:underline"
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6 text-muted-foreground">
        {children}
      </ol>
    ),
  },
}

export function PortableTextContent({
  value,
}: {
  value: PortableTextBlock[] | null | undefined
}) {
  if (!value?.length) return null
  return (
    <div className="prose-portable mt-8 text-base md:text-lg">
      <PortableText value={value} components={components} />
    </div>
  )
}
