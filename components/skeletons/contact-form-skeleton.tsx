export function ContactFormSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-5" aria-hidden>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-12 rounded bg-muted" />
          <div className="h-10 w-full rounded-lg bg-muted" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-12 rounded bg-muted" />
          <div className="h-10 w-full rounded-lg bg-muted" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-4 w-16 rounded bg-muted" />
        <div className="h-36 w-full rounded-lg bg-muted" />
      </div>
      <div className="h-10 w-32 rounded-lg bg-muted" />
    </div>
  )
}
