import { getCliClient } from "sanity/cli"
import { HERO_BIO_BLOCKS } from "../sanity/lib/hero-bio-content"

const client = getCliClient({ apiVersion: "2026-06-13" })

const block = (text: string) => [
  {
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", text, marks: [] }],
  },
]

async function seed() {
  const tx = client.transaction()

  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "June Folio",
    siteUrl: "https://yasinwalum.com",
    authorName: "Yasin Walum",
    footerCopyright: "© {year} Yasin Walum.",
    contactSocialLabel: "Or find me on",
    seo: {
      title: "Yasin Walum — Software Engineer",
      description:
        "Uganda based software engineer building fast, scalable web and mobile applications.",
      keywords: [
        "Yasin Walum",
        "software engineer",
        "web developer",
        "mobile developer",
        "Next.js",
        "React Native",
        "Flutter",
        "Uganda",
        "portfolio",
      ],
    },
    navItems: [
      { _type: "navItem", label: "Home", href: "/", order: 0 },
      { _type: "navItem", label: "Works", href: "/works", order: 1 },
      { _type: "navItem", label: "Blog", href: "/blog", order: 2 },
      { _type: "navItem", label: "Contact", href: "/contact", order: 3 },
    ],
    footerLinks: [
      { _type: "navItem", label: "Home", href: "/", order: 0 },
      { _type: "navItem", label: "Works", href: "/works", order: 1 },
      { _type: "navItem", label: "Blog", href: "/blog", order: 2 },
      { _type: "navItem", label: "Contact", href: "/contact", order: 3 },
    ],
    socialLinks: [
      {
        _type: "socialLink",
        platform: "github",
        label: "GitHub",
        url: "https://github.com/yasinwalum",
        order: 0,
      },
      {
        _type: "socialLink",
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/yasin-walum-b2b2b2b2b2b2/",
        order: 1,
      },
      {
        _type: "socialLink",
        platform: "x",
        label: "X",
        url: "https://x.com/yasinwalum",
        order: 2,
      },
      {
        _type: "socialLink",
        platform: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/yasinwalum",
        order: 3,
      },
      {
        _type: "socialLink",
        platform: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com/yasinwalum",
        order: 4,
      },
      {
        _type: "socialLink",
        platform: "youtube",
        label: "YouTube",
        url: "https://www.youtube.com/yasinwalum",
        order: 5,
      },
    ],
  })

  const projects = [
    {
      _id: "project-grabit",
      title: "Grabit",
      slug: { _type: "slug", current: "grabit" },
      description:
        "A platform for buying and selling products with real-time inventory and secure checkout.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      featured: true,
      sortOrder: 0,
      body: block(
        "A platform for buying and selling products with real-time inventory and secure checkout."
      ),
    },
    {
      _id: "project-spice-route",
      title: "Spice Route",
      slug: { _type: "slug", current: "spice-route" },
      description:
        "A recipe discovery app that builds weekly meal plans from the ingredients you already have.",
      tags: ["React Native", "Expo", "Node.js"],
      featured: true,
      sortOrder: 1,
      body: block(
        "A recipe discovery app that builds weekly meal plans from the ingredients you already have."
      ),
    },
    {
      _id: "project-trailhead",
      title: "Trailhead",
      slug: { _type: "slug", current: "trailhead" },
      description:
        "An offline-first hiking companion with route maps, elevation profiles and trip journals.",
      tags: ["Flutter", "Python"],
      featured: true,
      sortOrder: 2,
      body: block(
        "An offline-first hiking companion with route maps, elevation profiles and trip journals."
      ),
    },
    {
      _id: "project-daily-grind",
      title: "Daily Grind",
      slug: { _type: "slug", current: "daily-grind" },
      description:
        "An ordering and loyalty app for independent coffee shops with pickup scheduling.",
      tags: ["Kotlin", "Swift"],
      featured: false,
      sortOrder: 3,
      body: block(
        "An ordering and loyalty app for independent coffee shops with pickup scheduling."
      ),
    },
  ]

  for (const project of projects) {
    tx.createOrReplace({ _type: "project", ...project })
  }

  const posts = [
    {
      _id: "post-shipping-offline-first-apps",
      title: "Shipping Offline-First Mobile Apps",
      slug: { _type: "slug", current: "shipping-offline-first-apps" },
      excerpt:
        "Lessons learned syncing local data with the cloud without driving users (or yourself) crazy.",
      publishedAt: "2026-04-18T00:00:00.000Z",
      readTime: "7 min read",
      featured: true,
      body: block(
        "Lessons learned syncing local data with the cloud without driving users (or yourself) crazy."
      ),
    },
    {
      _id: "post-nextjs-image-pitfalls",
      title: "Common next/image Pitfalls and How to Avoid Them",
      slug: { _type: "slug", current: "nextjs-image-pitfalls" },
      excerpt:
        "Why your images are blurry, your layout shifts, and your Lighthouse score suffers — and the fixes.",
      publishedAt: "2026-03-02T00:00:00.000Z",
      readTime: "5 min read",
      featured: true,
      body: block(
        "Why your images are blurry, your layout shifts, and your Lighthouse score suffers — and the fixes."
      ),
    },
    {
      _id: "post-choosing-flutter-or-react-native",
      title: "Flutter or React Native in 2026?",
      slug: { _type: "slug", current: "choosing-flutter-or-react-native" },
      excerpt:
        "A practical comparison after shipping production apps with both frameworks.",
      publishedAt: "2026-01-20T00:00:00.000Z",
      readTime: "9 min read",
      featured: true,
      body: block(
        "A practical comparison after shipping production apps with both frameworks."
      ),
    },
  ]

  for (const post of posts) {
    tx.createOrReplace({ _type: "post", ...post })
  }

  const pageIntros = [
    {
      _id: "pageIntro-blog",
      pageKey: "blog",
      heading: "Blog",
      description:
        "Notes and lessons from building web and mobile applications.",
      seo: {
        title: "Blog — Yasin Walum",
        description: "Writing about building web and mobile applications.",
      },
    },
    {
      _id: "pageIntro-works",
      pageKey: "works",
      heading: "Works",
      description:
        "A selection of web and mobile projects I have designed and built.",
      seo: {
        title: "Works — Yasin Walum",
        description: "Projects I have designed and built.",
      },
    },
    {
      _id: "pageIntro-contact",
      pageKey: "contact",
      heading: "Get in touch",
      description:
        "Have a project in mind or just want to say hello? Drop a message and I will get back to you as soon as I can.",
      seo: {
        title: "Contact — Yasin Walum",
        description: "Get in touch about a project or just say hello.",
      },
    },
  ]

  for (const intro of pageIntros) {
    tx.createOrReplace({ _type: "pageIntro", ...intro })
  }

  tx.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroName: "Yasin Walum",
    heroTitle: "Software Engineer",
    heroBio: HERO_BIO_BLOCKS,
    heroCtaLabel: "My Works",
    heroCtaHref: "/works",
    projectsSectionTitle: "Projects",
    blogSectionTitle: "Blog",
    featuredProjects: [
      { _type: "reference", _ref: "project-grabit", _key: "fp0" },
      { _type: "reference", _ref: "project-spice-route", _key: "fp1" },
      { _type: "reference", _ref: "project-trailhead", _key: "fp2" },
    ],
    featuredPosts: [
      { _type: "reference", _ref: "post-shipping-offline-first-apps", _key: "fb0" },
      { _type: "reference", _ref: "post-nextjs-image-pitfalls", _key: "fb1" },
      { _type: "reference", _ref: "post-choosing-flutter-or-react-native", _key: "fb2" },
    ],
  })

  await tx.commit()
  console.log("Seed content published.")
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
