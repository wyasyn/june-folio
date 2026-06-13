export type Project = {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: "grabit",
    title: "Grabit",
    description: "A platform for buying and selling products with real-time inventory and secure checkout.",
    image: "https://res.cloudinary.com/dkdteb9m5/image/upload/v1704969712/samples/people/kitchen-bar.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "spice-route",
    title: "Spice Route",
    description: "A recipe discovery app that builds weekly meal plans from the ingredients you already have.",
    image: "https://res.cloudinary.com/dkdteb9m5/image/upload/v1704969711/samples/ecommerce/analog-classic.jpg",
    tags: ["React Native", "Expo", "Node.js"],
  },
  {
    slug: "trailhead",
    title: "Trailhead",
    description: "An offline-first hiking companion with route maps, elevation profiles and trip journals.",
    image: "https://res.cloudinary.com/dkdteb9m5/image/upload/v1704969713/samples/food/fish-vegetables.jpg",
    tags: ["Flutter", "Python"],
  },
  {
    slug: "daily-grind",
    title: "Daily Grind",
    description: "An ordering and loyalty app for independent coffee shops with pickup scheduling.",
    image: "https://res.cloudinary.com/dkdteb9m5/image/upload/v1704969715/samples/landscapes/girl-urban-view.jpg",
    tags: ["Kotlin", "Swift"],
  },
]
