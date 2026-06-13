export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "shipping-offline-first-apps",
    title: "Shipping Offline-First Mobile Apps",
    excerpt: "Lessons learned syncing local data with the cloud without driving users (or yourself) crazy.",
    date: "2026-04-18",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dkdteb9m5/image/upload/v1704969716/samples/bike.jpg",
  },
  {
    slug: "nextjs-image-pitfalls",
    title: "Common next/image Pitfalls and How to Avoid Them",
    excerpt: "Why your images are blurry, your layout shifts, and your Lighthouse score suffers — and the fixes.",
    date: "2026-03-02",
    readTime: "5 min read",
    image: "https://res.cloudinary.com/dkdteb9m5/image/upload/v1704969716/samples/bike.jpg",
  },
  {
    slug: "choosing-flutter-or-react-native",
    title: "Flutter or React Native in 2026?",
    excerpt: "A practical comparison after shipping production apps with both frameworks.",
    date: "2026-01-20",
    readTime: "9 min read",
    image: "https://res.cloudinary.com/dkdteb9m5/image/upload/v1704969716/samples/bike.jpg",
  },
]
