import {  Geist_Mono, Inter, Lora } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PreferencesProvider } from "@/components/preferences-provider"
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const loraHeading = Lora({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, loraHeading.variable)}
    >
      <body className="overflow-x-clip">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var f=localStorage.getItem("preferences:font-size");if(f==="small"||f==="large")d.setAttribute("data-font-size",f);var c=localStorage.getItem("preferences:high-contrast");if(c===null?window.matchMedia("(prefers-contrast: more)").matches:c==="true")d.setAttribute("data-high-contrast","");var m=localStorage.getItem("preferences:reduce-motion");if(m===null?window.matchMedia("(prefers-reduced-motion: reduce)").matches:m==="true")d.setAttribute("data-reduce-motion","")}catch(e){}})()`,
          }}
        />
        <ThemeProvider>
          <PreferencesProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
