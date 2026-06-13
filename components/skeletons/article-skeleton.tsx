export function ArticleSkeleton() {
  return (
    <article className="container max-w-3xl animate-pulse pb-12 pt-12 md:pb-24 md:pt-24" aria-hidden>
      <div className="mb-6 h-8 w-24 rounded bg-muted" />
      <div className="h-4 w-32 rounded bg-muted" />
      <div className="mt-3 h-9 w-3/4 rounded bg-muted md:h-10" />
      <div className="mt-8 aspect-video w-full rounded-lg bg-muted" />
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-4/5 rounded bg-muted" />
      </div>
    </article>
  )
}
