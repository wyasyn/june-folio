import PreferencesPanel from "@/components/preferences-panel"
import { FloatingDock } from "@/components/ui/floating-dock"
import type { NavItem } from "@/sanity/lib/types"
import {
  IconAdjustmentsHorizontal,
  IconBriefcase,
  IconHome,
  IconMail,
  IconPencil,
} from "@tabler/icons-react"

const defaultLinks = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full" />,
    href: "/",
  },
  {
    title: "Works",
    icon: <IconBriefcase className="h-full w-full" />,
    href: "/works",
  },
  {
    title: "Blog",
    icon: <IconPencil className="h-full w-full" />,
    href: "/blog",
  },
  {
    title: "Contact",
    icon: <IconMail className="h-full w-full" />,
    href: "/contact",
  },
]

const iconByHref: Record<string, React.ReactNode> = {
  "/": <IconHome className="h-full w-full" />,
  "/works": <IconBriefcase className="h-full w-full" />,
  "/blog": <IconPencil className="h-full w-full" />,
  "/contact": <IconMail className="h-full w-full" />,
}

export default function MainNav({
  navItems,
}: {
  navItems?: NavItem[] | null
}) {
  const cmsLinks =
    navItems?.map((item) => ({
      title: item.label,
      icon: iconByHref[item.href] ?? <IconHome className="h-full w-full" />,
      href: item.href,
    })) ?? defaultLinks

  const links = [
    ...cmsLinks,
    {
      title: "Preferences",
      icon: <IconAdjustmentsHorizontal className="h-full w-full" />,
      content: <PreferencesPanel />,
    },
  ]

  return (
    <FloatingDock
      items={links}
      desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      mobileClassName="fixed bottom-6 right-6 z-50"
    />
  )
}
