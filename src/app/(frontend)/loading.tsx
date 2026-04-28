export default function FrontendLoading() {
  return (
    <div className="page-safe-top">
      <div className="container py-16">
        <div className="h-8 w-56 animate-pulse rounded-md bg-muted/70" />
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-muted/60" />
          <div className="h-4 w-[92%] animate-pulse rounded bg-muted/55" />
          <div className="h-4 w-[84%] animate-pulse rounded bg-muted/50" />
        </div>
      </div>
    </div>
  )
}
