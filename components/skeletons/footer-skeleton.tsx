export function FooterSkeleton() {
  return (
    <footer className="container animate-pulse py-12 md:py-16" aria-hidden>
      <div className="h-3 w-full rounded bg-muted" />
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-4 w-16 rounded bg-muted" />
        ))}
      </div>
      <div className="mx-auto mt-6 h-4 w-40 rounded bg-muted" />
    </footer>
  )
}
