"use client"

import { IconExternalLink } from "@tabler/icons-react"
import { motion, useReducedMotion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import SocialIcons from "./social-icons"

function useFadeUp() {
  const reduceMotion = useReducedMotion()

  return (delay: number, scale = false) => ({
    initial: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 14, ...(scale ? { scale: 0.9 } : {}) },
    animate: reduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) },
    transition: {
      delay,
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  })
}

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

export default function HeroSection() {
  const fadeUp = useFadeUp()

  return (
    <div>
      <header className="flex items-center gap-5 sm:gap-6">
        <motion.div
          {...fadeUp(0, true)}
          className="relative size-20 shrink-0 overflow-hidden rounded-full bg-muted sm:size-24"
        >
          <Image
            src="https://res.cloudinary.com/dkdteb9m5/image/upload/v1731179025/personal%20finance/lj5hjqhmvaeqdsrfcwky.jpg"
            alt="June"
            fill
            className="object-cover"
            priority
            sizes="96px"
          />
        </motion.div>

        <div className="flex flex-col items-start gap-1 sm:gap-1.5">
          <motion.h1
            {...fadeUp(0.08)}
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Yasin Walum
          </motion.h1>
          <motion.p
            {...fadeUp(0.16)}
            className="text-sm text-muted-foreground sm:text-base"
          >
            Software Engineer
          </motion.p>
          <motion.div {...fadeUp(0.24)} className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="group items-center gap-2"
            >
              <Link href="/works">
                <span>My Works</span>
                <IconExternalLink className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </header>

      <motion.p
        {...fadeUp(0.32)}
        className="mt-8 max-w-prose text-muted-foreground md:mt-12"
      >
        <SketchUnderline delay={0.9}>Yasin</SketchUnderline> is Uganda based
        software engineer with a passion for building{" "}
        <SketchUnderline delay={1.1}>web</SketchUnderline> &{" "}
        <SketchUnderline delay={1.3}>mobile</SketchUnderline> applications that
        are fast, scalable, and easy to use.
      </motion.p>

      <motion.div {...fadeUp(0.4)} className="mt-8 md:mt-12">
        <SocialIcons />
      </motion.div>
    </div>
  )
}
