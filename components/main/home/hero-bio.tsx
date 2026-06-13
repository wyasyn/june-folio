"use client"

import type { PortableTextBlock } from "next-sanity"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { useReducedMotion } from "motion/react"
import { motion } from "motion/react"
import { HERO_BIO_BLOCKS } from "@/sanity/lib/hero-bio-content"

export const DEFAULT_HERO_BIO = HERO_BIO_BLOCKS

function SketchUnderline({
  children,
  delay,
}: {
  children: React.ReactNode
  delay: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <span className="relative inline-block font-bold text-foreground">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 h-2 w-full overflow-visible"
      >
        <motion.path
          d="M2 7 Q 30 3, 50 6 T 98 5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay, duration: 0.5, ease: "easeOut" }}
        />
      </svg>
    </span>
  )
}

function createHeroBioComponents() {
  let sketchIndex = 0

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <>{children}</>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-foreground">{children}</strong>
      ),
      sketch: ({ children }) => {
        const delay = 0.9 + sketchIndex * 0.2
        sketchIndex += 1
        return <SketchUnderline delay={delay}>{children}</SketchUnderline>
      },
    },
  }

  return components
}

export function HeroBio({
  value,
}: {
  value?: PortableTextBlock[] | string | null
}) {
  const blocks =
    Array.isArray(value) && value.length > 0 ? value : DEFAULT_HERO_BIO

  return <PortableText value={blocks} components={createHeroBioComponents()} />
}
