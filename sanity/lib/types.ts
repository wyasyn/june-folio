import type { PortableTextBlock } from "next-sanity"

import type { SanityImage } from "./image"

export type SeoFields = {
  title?: string | null
  description?: string | null
  keywords?: string[] | null
  image?: SanityImage | null
  noIndex?: boolean | null
}

export type NavItem = {
  label: string
  href: string
  order?: number | null
}

export type SocialLink = {
  platform: string
  label: string
  url: string
  order?: number | null
}

export type SiteSettings = {
  siteName: string
  siteUrl: string
  authorName: string
  footerCopyright?: string | null
  contactSocialLabel?: string | null
  seo?: SeoFields | null
  navItems?: NavItem[] | null
  footerLinks?: NavItem[] | null
  socialLinks?: SocialLink[] | null
}

export type ResumeEducation = {
  degree?: string | null
  institution?: string | null
  years?: string | null
}

export type ResumeLanguage = {
  name?: string | null
  level?: string | null
}

export type ResumeJob = {
  jobTitle?: string | null
  company?: string | null
  location?: string | null
  period?: string | null
  description?: string | null
  bullets?: string[] | null
}

export type ResumeAward = {
  title?: string | null
  subtitle?: string | null
  years?: string | null
}

export type ResumeReference = {
  name?: string | null
  role?: string | null
  phone?: string | null
  email?: string | null
}

export type Resume = {
  fullName: string
  jobTitle: string
  address?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
  profile?: string | null
  education?: ResumeEducation[] | null
  skills?: string[] | null
  languages?: ResumeLanguage[] | null
  workExperience?: ResumeJob[] | null
  social?: SocialLink[] | null
  expertise?: string[] | null
  awards?: ResumeAward[] | null
  references?: ResumeReference[] | null
  interests?: string[] | null
}

export type HomePage = {
  heroName: string
  heroTitle: string
  heroBio?: PortableTextBlock[] | string | null
  heroAvatar?: SanityImage | null
  heroCtaLabel?: string | null
  heroCtaHref?: string | null
  projectsSectionTitle?: string | null
  blogSectionTitle?: string | null
  featuredProjects?: ProjectCard[] | null
  featuredPosts?: PostCard[] | null
}

export type PageIntro = {
  heading: string
  description: string
  seo?: SeoFields | null
}

export type PostCard = {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readTime?: string | null
  coverImage?: SanityImage | null
}

export type ProjectCard = {
  _id: string
  title: string
  slug: string
  description: string
  coverImage?: SanityImage | null
  tags?: string[] | null
}
