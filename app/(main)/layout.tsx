import { Suspense } from "react"

import { FooterShell } from "@/components/main/layout/footer-shell"
import { MainNavShell } from "@/components/main/layout/main-nav-shell"
import { FooterSkeleton } from "@/components/skeletons/footer-skeleton"
import { NavSkeleton } from "@/components/skeletons/nav-skeleton"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div
        aria-hidden
        className="bg-grid-pattern pointer-events-none fixed inset-0 -z-10"
      />
      <Suspense fallback={<NavSkeleton />}>
        <MainNavShell />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Suspense fallback={<FooterSkeleton />}>
        <FooterShell />
      </Suspense>
    </div>
  )
}
