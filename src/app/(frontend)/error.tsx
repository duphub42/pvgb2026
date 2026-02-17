'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Frontend]', error)
  }, [error])

  return (
    <article className="container py-16">
      <div className="prose max-w-none">
        <h1>Seite konnte nicht geladen werden</h1>
        <p>Ein Fehler ist aufgetreten. Bitte erneut versuchen oder die Startseite öffnen.</p>
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-100"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </article>
  )
}
