'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

function isNetworkError(error: Error): boolean {
  const msg = (error?.message || '').toLowerCase()
  return (
    msg.includes('network error') ||
    msg.includes('failed to fetch') ||
    msg.includes('load failed') ||
    msg.includes('network request failed')
  )
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error('[Frontend]', error)
  }, [error])

  const handleReset = () => {
    reset()
    router.refresh()
  }

  const isNetwork = isNetworkError(error)

  return (
    <article className="container py-16">
      <div className="prose max-w-none">
        <h1>Seite konnte nicht geladen werden</h1>
        {isNetwork ? (
          <p>
            Die Verbindung ist unterbrochen oder der Server antwortet nicht. Prüfen Sie Ihre
            Internetverbindung bzw. ob der Dev-Server läuft, und versuchen Sie es erneut.
          </p>
        ) : (
          <p>Ein Fehler ist aufgetreten. Bitte erneut versuchen oder die Startseite öffnen.</p>
        )}
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={handleReset}
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
