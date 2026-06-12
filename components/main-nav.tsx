import PreferencesPanel from "@/components/preferences-panel";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconAdjustmentsHorizontal,
  IconBriefcase,
  IconHome,
  IconMail,
  IconPencil,
} from "@tabler/icons-react";

const links = [
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
  {
    title: "Preferences",
    icon: <IconAdjustmentsHorizontal className="h-full w-full" />,
    content: <PreferencesPanel />,
  },
];

export default function MainNav() {
  return (
    <FloatingDock
      items={links}
      desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      mobileClassName="fixed bottom-6 right-6 z-50"
    />
  );
}
