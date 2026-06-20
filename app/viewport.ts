import type { Viewport } from "next"

import { siteThemeColors } from "@/lib/site-theme"

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: siteThemeColors.light.theme,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: siteThemeColors.dark.theme,
    },
  ],
  colorScheme: "light dark",
}
