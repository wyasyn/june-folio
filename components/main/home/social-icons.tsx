"use client"

import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react"

import { TooltipProvider } from "@/components/ui/tooltip"

import {
  AnimatedSocialIcon,
  SocialIconSketchFilter,
} from "./animated-social-icon"

const socialLinks = [
  {
    icon: IconBrandGithub,
    href: "https://github.com/yasinwalum",
    label: "GitHub",
    preset: "github" as const,
  },
  {
    icon: IconBrandLinkedin,
    href: "https://www.linkedin.com/in/yasin-walum-b2b2b2b2b2b2/",
    label: "LinkedIn",
    preset: "linkedin" as const,
  },

  {
    icon: IconBrandX,
    href: "https://x.com/yasinwalum",
    label: "X",
    preset: "x" as const,
  },
  {
    icon: IconBrandInstagram,
    href: "https://www.instagram.com/yasinwalum",
    label: "Instagram",
    preset: "instagram" as const,
  },
  {
    icon: IconBrandFacebook,
    href: "https://www.facebook.com/yasinwalum",
    label: "Facebook",
    preset: "facebook" as const,
  },
  {
    icon: IconBrandYoutube,
    href: "https://www.youtube.com/yasinwalum",
    label: "YouTube",
    preset: "youtube" as const,
  },
]

export default function SocialIcons() {
  return (
    <TooltipProvider>
      <div className="relative flex flex-wrap items-center gap-1 sm:gap-1.5">
        <SocialIconSketchFilter />
        {socialLinks.map((link) => {
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
      </div>
    </TooltipProvider>
  )
}
