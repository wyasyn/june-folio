import type { Metadata } from "next"
import { Geist_Mono, Inter, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { PreferencesBootstrap } from "@/components/preferences-bootstrap"
import { ThemeProvider } from "@/components/theme-provider"
import { PreferencesProvider } from "@/components/preferences-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { siteThemeColors } from "@/lib/site-theme"
import { buildSiteMetadata } from "@/sanity/lib/metadata"

const loraHeading = Lora({ subsets: ["latin"], variable: "--font-heading" })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme-color-light={siteThemeColors.light.theme}
      data-theme-color-dark={siteThemeColors.dark.theme}
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        loraHeading.variable
      )}
    >
      <body className="overflow-x-clip">
        <PreferencesBootstrap />
        <ThemeProvider>
          <PreferencesProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </PreferencesProvider>
        </ThemeProvider>
        {process.env.VERCEL_ANALYTICS_ID ? <Analytics /> : null}
      </body>
    </html>
  )
}
