export function PageIntroSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden>
      <div className="h-9 w-40 rounded bg-muted md:h-10" />
      <div className="mt-2 space-y-2">
        <div className="h-4 w-full max-w-prose rounded bg-muted" />
        <div className="h-4 w-5/6 max-w-prose rounded bg-muted" />
      </div>
    </div>
  )
}
