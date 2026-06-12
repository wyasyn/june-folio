"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import Link from "next/link"
import { useState } from "react"

type AnimationPreset =
  | "github"
  | "linkedin"
  | "twitter"
  | "x"
  | "instagram"
  | "facebook"
  | "youtube"

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
}

const brandColors: Record<AnimationPreset, string> = {
  github: "group-hover:text-foreground",
  linkedin: "group-hover:text-[#0A66C2]",
  twitter: "group-hover:text-[#1DA1F2]",
  x: "group-hover:text-foreground",
  instagram: "group-hover:text-[#E4405F]",
  facebook: "group-hover:text-[#1877F2]",
  youtube: "group-hover:text-[#FF0000]",
}

type AnimatedSocialIconProps = {
  href: string
  label: string
  preset: AnimationPreset
  children: React.ReactNode
}

export function AnimatedSocialIcon({
  href,
  label,
  preset,
  children,
}: AnimatedSocialIconProps) {
  const [hovered, setHovered] = useState(false)
  const config = presets[preset]

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group relative inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300",
        "hover:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        brandColors[preset],
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.span
        className="relative flex items-center justify-center [&_svg]:size-6 [&_svg]:stroke-[1.75] [&_svg]:transition-[stroke-width,filter] [&_svg]:duration-300 group-hover:[&_svg]:stroke-[2.25] group-hover:[&_svg]:filter-[url(#social-icon-sketch)]"
        initial={false}
        animate={hovered ? config.hover : config.rest}
        transition={
          hovered
            ? {
                duration: config.loopDuration,
                repeat: Infinity,
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
