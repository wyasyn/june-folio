"use client"

import Link from "next/link"
import { IconArrowUp } from "@tabler/icons-react"
import { motion, useReducedMotion } from "motion/react"

import type { NavItem } from "@/sanity/lib/types"

const defaultFooterLinks = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

function SketchDivider() {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 20"
      preserveAspectRatio="none"
      className="h-3 w-full overflow-visible text-border"
    >
      <motion.path
        d="M0 12 Q 50 4, 100 11 T 200 10 T 300 12 T 400 9 T 500 12 T 600 10 T 700 12 T 800 9 T 900 11 T 1000 10 T 1100 12 T 1200 10"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
    </svg>
  )
}

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group relative text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
    >
      {label}
      <svg
        aria-hidden
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 h-1.5 w-full overflow-visible text-primary"
      >
        <path
          d="M2 7 Q 30 3, 50 6 T 98 5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          pathLength={1}
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-300 ease-out group-hover:[stroke-dashoffset:0]"
        />
      </svg>
    </Link>
  )
}

function BackToTop() {
  const reduceMotion = useReducedMotion()

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
      }
      className="group flex size-9 cursor-pointer items-center justify-center rounded-full border bg-card text-muted-foreground shadow-sm transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
    >
      <IconArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  )
}

export default function Footer({
  footerLinks,
  footerCopyright,
  authorName,
}: {
  footerLinks?: NavItem[] | null
  footerCopyright?: string | null
  authorName?: string | null
}) {
  const reduceMotion = useReducedMotion()
  const year = new Date().getFullYear()
  const links =
    footerLinks?.map((link) => ({ label: link.label, href: link.href })) ??
    defaultFooterLinks
  const copyrightTemplate =
    footerCopyright ?? `© {year} ${authorName ?? "Yasin Walum"}.`
  const copyright = copyrightTemplate.replace("{year}", String(year))

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    whileInView: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { delay, type: "spring" as const, stiffness: 260, damping: 24 },
  })

  return (
    <footer className="container pb-28 pt-12 md:pb-32 md:pt-16">
      <SketchDivider />

      <div className="mt-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <motion.p {...fadeUp(0.1)} className="text-sm text-muted-foreground">
          {copyright}
        </motion.p>

        <motion.nav
          {...fadeUp(0.2)}
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {links.map((link) => (
            <FooterLink key={link.href} {...link} />
          ))}
        </motion.nav>

        <motion.div {...fadeUp(0.3)}>
          <BackToTop />
        </motion.div>
      </div>
    </footer>
  )
}
