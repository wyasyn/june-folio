"use client"

import { IconExternalLink } from "@tabler/icons-react"
import { motion, useReducedMotion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { HeroBio } from "@/components/main/home/hero-bio"
import { getImageUrl } from "@/sanity/lib/image-utils"
import type { HomePage, SocialLink } from "@/sanity/lib/types"

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

export default function HeroSection({
  homePage,
  socialLinks,
  avatarBlurDataURL,
}: {
  homePage?: HomePage | null
  socialLinks?: SocialLink[] | null
  avatarBlurDataURL?: string
}) {
  const fadeUp = useFadeUp()
  const name = homePage?.heroName ?? "Yasin Walum"
  const title = homePage?.heroTitle ?? "Software Engineer"
  const ctaLabel = homePage?.heroCtaLabel ?? "My Works"
  const ctaHref = homePage?.heroCtaHref ?? "/works"
  const avatarUrl = getImageUrl(homePage?.heroAvatar, 192, 192)

  return (
    <div>
      <header className="flex items-center gap-5 sm:gap-6">
        <motion.div
          {...fadeUp(0, true)}
          className="relative size-20 shrink-0 overflow-hidden rounded-full bg-muted sm:size-24"
        >
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-cover"
            priority
            sizes="96px"
            {...(avatarBlurDataURL
              ? { placeholder: "blur" as const, blurDataURL: avatarBlurDataURL }
              : {})}
          />
        </motion.div>

        <div className="flex flex-col items-start gap-1 sm:gap-1.5">
          <motion.h1
            {...fadeUp(0.08)}
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {name}
          </motion.h1>
          <motion.p
            {...fadeUp(0.16)}
            className="text-sm text-muted-foreground sm:text-base"
          >
            {title}
          </motion.p>
          <motion.div {...fadeUp(0.24)} className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="group items-center gap-2"
            >
              <Link href={ctaHref}>
                <span>{ctaLabel}</span>
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
        <HeroBio value={homePage?.heroBio} />
      </motion.p>

      <motion.div {...fadeUp(0.4)} className="mt-8 md:mt-12">
        <SocialIcons socialLinks={socialLinks} />
      </motion.div>
    </div>
  )
}
