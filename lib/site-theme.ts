/** Hex values aligned with design tokens in app/globals.css */
export const siteThemeColors = {
  light: {
    background: "#f9f9f9",
    theme: "#f9f9f9",
    primary: "#644a40",
  },
  dark: {
    background: "#111111",
    theme: "#111111",
    primary: "#ffe0c2",
  },
} as const

export type SiteThemeMode = keyof typeof siteThemeColors

export function getThemeColor(mode: SiteThemeMode) {
  return siteThemeColors[mode].theme
}
