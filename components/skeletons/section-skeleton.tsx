import { CardGridSkeleton } from "./card-grid-skeleton"

export function SectionSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="container py-12" aria-hidden>
      <div className="flex animate-pulse items-center justify-between">
        <div className="h-7 w-28 rounded bg-muted" />
        <div className="h-4 w-16 rounded bg-muted" />
      </div>
      <div className="mt-8 md:mt-12">
        <CardGridSkeleton count={count} />
      </div>
    </div>
  )
}
