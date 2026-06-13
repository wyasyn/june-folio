import { defineQuery } from "next-sanity"

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    siteName,
    siteUrl,
    authorName,
    footerCopyright,
    contactSocialLabel,
    seo{
      title,
      description,
      keywords,
      image,
      noIndex
    },
    navItems[] | order(order asc){
      label,
      href,
      order
    },
    footerLinks[] | order(order asc){
      label,
      href,
      order
    },
    socialLinks[] | order(order asc){
      platform,
      label,
      url,
      order
    }
  }
`)

export const RESUME_QUERY = defineQuery(`
  *[_id == "resume"][0]{
    fullName,
    jobTitle,
    address,
    phone,
    email,
    website,
    profile,
    education[]{
      degree,
      institution,
      years
    },
    skills,
    languages[]{
      name,
      level
    },
    workExperience[]{
      jobTitle,
      company,
      location,
      period,
      description,
      bullets
    },
    social[] | order(order asc){
      platform,
      label,
      url,
      order
    },
    expertise,
    awards[]{
      title,
      subtitle,
      years
    },
    references[]{
      name,
      role,
      phone,
      email
    },
    interests
  }
`)

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage"][0]{
    heroName,
    heroTitle,
    heroBio,
    heroAvatar,
    heroCtaLabel,
    heroCtaHref,
    projectsSectionTitle,
    blogSectionTitle,
    featuredProjects[]->{
      _id,
      title,
      "slug": slug.current,
      description,
      coverImage,
      tags
    },
    featuredPosts[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      coverImage
    }
  }
`)

export const PAGE_INTRO_QUERY = defineQuery(`
  *[_type == "pageIntro" && pageKey == $pageKey][0]{
    heading,
    description,
    seo{
      title,
      description,
      keywords,
      image,
      noIndex
    }
  }
`)

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    coverImage
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    coverImage,
    body,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, excerpt, ""),
      "keywords": seo.keywords,
      "image": seo.image,
      "noIndex": seo.noIndex == true
    }
  }
`)

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(sortOrder asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    description,
    coverImage,
    tags
  }
`)

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    coverImage,
    tags,
    body,
    liveUrl,
    repoUrl,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, description, ""),
      "keywords": seo.keywords,
      "image": seo.image,
      "noIndex": seo.noIndex == true
    }
  }
`)

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["post", "project"] && defined(slug.current) && (seo.noIndex != true)]{
    _type,
    "slug": slug.current,
    _updatedAt
  }
`)
