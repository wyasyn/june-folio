"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { IconArrowLeft } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

/**
 * Back control that returns the visitor to where they came from. When there is
 * in-app navigation history it calls `router.back()`; otherwise (e.g. a visitor
 * landing directly from search) it falls back to `fallbackHref`. Rendered as a
 * real anchor so it still works without JS and on right-click / new tab.
 */
export function BackButton({
  fallbackHref,
  label = "Back",
}: {
  fallbackHref: string
  label?: string
}) {
  const router = useRouter()

  return (
    <Button asChild size="sm" variant="ghost" className="-ml-2 mb-6 gap-1.5">
      <Link
        href={fallbackHref}
        onClick={(event) => {
          if (window.history.length > 1) {
            event.preventDefault()
            router.back()
          }
        }}
      >
        <IconArrowLeft className="size-4" />
        {label}
      </Link>
    </Button>
  )
}
