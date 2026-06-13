export function HeroSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden>
      <div className="flex items-center gap-5 sm:gap-6">
        <div className="size-20 shrink-0 rounded-full bg-muted sm:size-24" />
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <div className="h-8 w-40 rounded bg-muted sm:h-9" />
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="h-8 w-24 rounded bg-muted" />
        </div>
      </div>
      <div className="mt-8 space-y-2 md:mt-12">
        <div className="h-4 w-full max-w-prose rounded bg-muted" />
        <div className="h-4 w-full max-w-prose rounded bg-muted" />
        <div className="h-4 w-4/5 max-w-prose rounded bg-muted" />
      </div>
      <div className="mt-8 flex gap-3 md:mt-12">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="size-9 rounded-full bg-muted" />
        ))}
      </div>
    </div>
  )
}
