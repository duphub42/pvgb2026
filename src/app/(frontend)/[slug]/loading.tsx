export default function SlugPageLoading() {
  return (
    <div className="page-safe-top" aria-busy="true" aria-label="Seite wird geladen">
      <div className="container py-16">
        <p className="mb-6 text-sm text-muted-foreground">Seite wird geladen …</p>
        <div className="space-y-6">
          <div className="h-8 w-56 max-w-full animate-pulse rounded-md bg-muted/70" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="h-10 w-full max-w-md animate-pulse rounded-md bg-muted/60" />
              <div className="h-4 w-full animate-pulse rounded bg-muted/55" />
              <div className="h-4 w-[92%] animate-pulse rounded bg-muted/50" />
              <div className="h-4 w-[84%] animate-pulse rounded bg-muted/45" />
            </div>
            <div className="hidden min-h-[280px] animate-pulse rounded-2xl bg-muted/40 md:block" />
          </div>
        </div>
      </div>
    </div>
  )
}
