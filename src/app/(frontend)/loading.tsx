/**
 * Wird angezeigt, während Seiten unter (frontend) laden (z. B. bei Navigation).
 * Verbessert das Ladegefühl ohne weißen Bildschirm.
 */
export default function Loading() {
  return (
    <article className="container py-16" aria-busy="true" aria-label="Seite wird geladen">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="h-10 w-3/4 animate-pulse rounded bg-[var(--muted)]" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-[var(--muted)]" />
          <div className="h-4 w-full animate-pulse rounded bg-[var(--muted)]" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--muted)]" />
        </div>
        <div className="space-y-2 pt-4">
          <div className="h-4 w-full animate-pulse rounded bg-[var(--muted)]" />
          <div className="h-4 w-full animate-pulse rounded bg-[var(--muted)]" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-[var(--muted)]" />
        </div>
      </div>
    </article>
  )
}
