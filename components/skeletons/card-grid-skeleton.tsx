export function CardGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="mx-auto w-full max-w-sm animate-pulse sm:max-w-none"
          aria-hidden
        >
          <div className="aspect-4/3 w-full rounded-lg bg-muted" />
          <div className="mt-3 flex flex-col gap-2 md:mt-4">
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="h-5 w-3/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
