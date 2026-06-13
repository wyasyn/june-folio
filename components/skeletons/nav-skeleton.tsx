export function NavSkeleton() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center"
      aria-hidden
    >
      <div className="h-14 w-64 animate-pulse rounded-full bg-muted/80" />
    </div>
  )
}
