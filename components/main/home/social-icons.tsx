"use client"

import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconFileCv,
} from "@tabler/icons-react"
import type { ComponentType } from "react"

import { TooltipProvider } from "@/components/ui/tooltip"
import type { SocialLink } from "@/sanity/lib/types"

import {
  AnimatedSocialIcon,
  SocialIconSketchFilter,
} from "./animated-social-icon"

const defaultSocialLinks: Array<{
  platform: string
  label: string
  url: string
  icon: ComponentType<{ strokeLinecap?: "round"; strokeLinejoin?: "round" }>
  preset: "github" | "linkedin" | "x" | "instagram" | "facebook" | "youtube"
}> = [
  {
    platform: "github",
    icon: IconBrandGithub,
    label: "GitHub",
    preset: "github",
    url: "https://github.com/yasinwalum",
  },
  {
    platform: "linkedin",
    icon: IconBrandLinkedin,
    label: "LinkedIn",
    preset: "linkedin",
    url: "https://www.linkedin.com/in/yasin-walum-b2b2b2b2b2b2/",
  },
  {
    platform: "x",
    icon: IconBrandX,
    label: "X",
    preset: "x",
    url: "https://x.com/yasinwalum",
  },
  {
    platform: "instagram",
    icon: IconBrandInstagram,
    label: "Instagram",
    preset: "instagram",
    url: "https://www.instagram.com/yasinwalum",
  },
  {
    platform: "facebook",
    icon: IconBrandFacebook,
    label: "Facebook",
    preset: "facebook",
    url: "https://www.facebook.com/yasinwalum",
  },
  {
    platform: "youtube",
    icon: IconBrandYoutube,
    label: "YouTube",
    preset: "youtube",
    url: "https://www.youtube.com/yasinwalum",
  },
]

const iconByPlatform: Record<
  string,
  {
    icon: ComponentType<{ strokeLinecap?: "round"; strokeLinejoin?: "round" }>
    preset: "github" | "linkedin" | "x" | "instagram" | "facebook" | "youtube"
  }
> = {
  github: { icon: IconBrandGithub, preset: "github" },
  linkedin: { icon: IconBrandLinkedin, preset: "linkedin" },
  x: { icon: IconBrandX, preset: "x" },
  instagram: { icon: IconBrandInstagram, preset: "instagram" },
  facebook: { icon: IconBrandFacebook, preset: "facebook" },
  youtube: { icon: IconBrandYoutube, preset: "youtube" },
}

export default function SocialIcons({
  socialLinks,
}: {
  socialLinks?: SocialLink[] | null
}) {
  const links =
    socialLinks?.length ?
      socialLinks
        .filter((link) => link.url && link.platform)
        .map((link) => {
          const iconConfig = iconByPlatform[link.platform]
          if (!iconConfig) return null
          return {
            icon: iconConfig.icon,
            href: link.url,
            label: link.label,
            preset: iconConfig.preset,
          }
        })
        .filter(Boolean)
    : defaultSocialLinks.map(({ icon, label, url, preset }) => ({
        icon,
        href: url,
        label,
        preset,
      }))

  return (
    <TooltipProvider>
      <div className="relative flex flex-wrap items-center gap-1 sm:gap-1.5">
        <SocialIconSketchFilter />
        {links.map((link) => {
          if (!link) return null
          const Icon = link.icon
          return (
            <AnimatedSocialIcon
              key={link.href}
              href={link.href}
              label={link.label}
              preset={link.preset}
            >
              <Icon strokeLinecap="round" strokeLinejoin="round" />
            </AnimatedSocialIcon>
          )
        })}
        <AnimatedSocialIcon
          href="/resume"
          label="Resume"
          preset="resume"
          external={false}
        >
          <IconFileCv strokeLinecap="round" strokeLinejoin="round" />
        </AnimatedSocialIcon>
      </div>
    </TooltipProvider>
  )
}
