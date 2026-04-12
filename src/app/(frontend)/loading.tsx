/**
 * Wird angezeigt, während Seiten unter (frontend) laden (z. B. bei Navigation).
 * Verbessert das Ladegefühl ohne weißen Bildschirm.
 */
export default function Loading() {
  return (
    <article
      className="container page-safe-top py-12 md:py-16 min-h-[110svh]"
      aria-busy="true"
      aria-label="Seite wird geladen"
    >
      <div className="grid min-w-0 gap-8 md:grid-cols-[minmax(0,45%)_1fr] md:items-end md:gap-10">
        <div className="space-y-6">
          <div className="h-6 w-44 animate-pulse rounded-full bg-[var(--muted)]" />
          <div className="space-y-3">
            <div className="h-10 w-11/12 animate-pulse rounded bg-[var(--muted)] md:h-12" />
            <div className="h-10 w-4/5 animate-pulse rounded bg-[var(--muted)] md:h-12" />
            <div className="h-10 w-10/12 animate-pulse rounded bg-[var(--muted)] md:h-12" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-[var(--muted)]" />
            <div className="h-4 w-full animate-pulse rounded bg-[var(--muted)]" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--muted)]" />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[min(100%,560px)]">
          <div className="aspect-[4/5] w-full animate-pulse rounded-[2rem] bg-[var(--muted)]" />
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="h-24 animate-pulse rounded-2xl bg-[var(--muted)]" />
        <div className="h-24 animate-pulse rounded-2xl bg-[var(--muted)]" />
        <div className="h-24 animate-pulse rounded-2xl bg-[var(--muted)]" />
      </div>
    </article>
  )
}
