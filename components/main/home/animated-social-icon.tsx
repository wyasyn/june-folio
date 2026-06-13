"use client"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { useEffect, useState } from "react"

type AnimationPreset =
  | "github"
  | "linkedin"
  | "twitter"
  | "x"
  | "instagram"
  | "facebook"
  | "youtube"
  | "resume"

type PresetConfig = {
  hover: Record<string, number | number[]>
  rest: Record<string, number>
  loopDuration: number
}

const presets: Record<AnimationPreset, PresetConfig> = {
  github: {
    hover: {
      rotate: [0, -14, 10, -6, 0, 2, -2, 2, -2, 0],
      y: [0, -5, -2, 0, -2, 0, -1, 0],
      scale: [1, 1.14, 1.12, 1.14, 1.12],
    },
    rest: { rotate: 0, y: 0, scale: 1 },
    loopDuration: 2.8,
  },
  linkedin: {
    hover: {
      rotate: [0, -6, 4, 0, 1.5, -1.5, 1.5, 0],
      y: [0, -6, -3, -2, -3, -2, -3, -2],
      scale: [1, 1.16, 1.14, 1.16, 1.14],
    },
    rest: { rotate: 0, y: 0, scale: 1 },
    loopDuration: 2.4,
  },
  twitter: {
    hover: {
      rotate: [0, -18, 12, -4, 0, 3, -3, 3, -3, 0],
      x: [0, 2, -1, 0, 1, 0, 1, 0],
      y: [0, -4, 0, -2, 0, -1, 0],
      scale: [1, 1.14, 1.12, 1.14, 1.12],
    },
    rest: { rotate: 0, x: 0, y: 0, scale: 1 },
    loopDuration: 2.2,
  },
  x: {
    hover: {
      rotate: [0, 90, 180, 182, 178, 180],
      scale: [1, 1.08, 1.14, 1.12, 1.14, 1.12],
    },
    rest: { rotate: 0, scale: 1 },
    loopDuration: 3,
  },
  instagram: {
    hover: {
      rotate: [0, -10, 10, -5, 0, 4, -4, 4, -4, 0],
      scale: [1, 1.08, 1.16, 1.12, 1.14, 1.16, 1.14],
    },
    rest: { rotate: 0, scale: 1 },
    loopDuration: 2.5,
  },
  facebook: {
    hover: {
      rotate: [0, 8, -6, 0, 2, -2, 2, 0],
      y: [0, -5, 0, -2, 0, -1, 0],
      scale: [1, 1.15, 1.13, 1.15, 1.13],
    },
    rest: { rotate: 0, y: 0, scale: 1 },
    loopDuration: 2.6,
  },
  youtube: {
    hover: {
      rotate: [0, -4, 4, 0, 2, -2, 2, 0],
      scale: [1, 1.1, 1.18, 1.12, 1.16, 1.12],
      x: [0, 1, 0, 0.5, 0, 0.5, 0],
    },
    rest: { rotate: 0, x: 0, scale: 1 },
    loopDuration: 2.3,
  },
  resume: {
    hover: {
      rotate: [0, -5, 4, -2, 0, 1.5, -1.5, 0],
      y: [0, -5, -2, -3, -2, -1, 0],
      scale: [1, 1.14, 1.12, 1.14, 1.12],
    },
    rest: { rotate: 0, y: 0, scale: 1 },
    loopDuration: 2.5,
  },
}

const brandColors: Record<AnimationPreset, { text: string; ripple: string }> = {
  github: { text: "hover:text-foreground", ripple: "bg-foreground/10" },
  linkedin: { text: "hover:text-[#0A66C2]", ripple: "bg-[#0A66C2]/15" },
  twitter: { text: "hover:text-[#1DA1F2]", ripple: "bg-[#1DA1F2]/15" },
  x: { text: "hover:text-foreground", ripple: "bg-foreground/10" },
  instagram: { text: "hover:text-[#E4405F]", ripple: "bg-[#E4405F]/15" },
  facebook: { text: "hover:text-[#1877F2]", ripple: "bg-[#1877F2]/15" },
  youtube: { text: "hover:text-[#FF0000]", ripple: "bg-[#FF0000]/15" },
  resume: { text: "hover:text-foreground", ripple: "bg-foreground/10" },
}

type AnimatedSocialIconProps = {
  href: string
  label: string
  preset: AnimationPreset
  children: React.ReactNode
  external?: boolean
}

export function AnimatedSocialIcon({
  href,
  label,
  preset,
  children,
  external = true,
}: AnimatedSocialIconProps) {
  const [hovered, setHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const reduceMotion = useReducedMotion()
  const config = presets[preset]

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches)
  }, [])

  return (
    <Tooltip open={hovered && !isTouch}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={label}
          className={cn(
            "group relative inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            brandColors[preset].text,
          )}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 scale-50 rounded-full opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100",
              "motion-reduce:scale-100",
              brandColors[preset].ripple,
            )}
          />
          <motion.span
            className="relative flex items-center justify-center [&_svg]:size-6 [&_svg]:stroke-[1.75] [&_svg]:transition-[stroke-width,filter] [&_svg]:duration-300 group-hover:[&_svg]:stroke-[2.25] motion-safe:group-hover:[&_svg]:filter-[url(#social-icon-sketch)]"
            initial={false}
            animate={
              hovered
                ? reduceMotion
                  ? { scale: 1.1 }
                  : config.hover
                : config.rest
            }
            transition={
              hovered
                ? reduceMotion
                  ? { duration: 0.2 }
                  : {
                      duration: config.loopDuration * 0.45,
                      ease: "easeInOut",
                    }
                : {
                    type: "spring",
                    stiffness: 420,
                    damping: 18,
                    mass: 0.55,
                  }
            }
          >
            {children}
          </motion.span>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={6}
        aria-hidden
        className="duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] data-[state=instant-open]:animate-in data-[state=instant-open]:fade-in-0 data-[state=instant-open]:zoom-in-90 data-[state=instant-open]:slide-in-from-bottom-2 motion-reduce:animate-none"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export function SocialIconSketchFilter() {
  return (
    <svg aria-hidden className="pointer-events-none absolute size-0" colorInterpolationFilters="sRGB">
      <filter id="social-icon-sketch" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.045"
          numOctaves="2"
          seed="3"
          result="noise"
        >
          <animate
            attributeName="baseFrequency"
            dur="0.45s"
            values="0.04;0.07;0.045"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="2.5"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}
