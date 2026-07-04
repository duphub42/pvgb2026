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

/** Dev-only: HMR/chunk reload while Next.js recompiles — common in Cursor/Glass, rare in cached Safari. */
function isRecoverableDevError(error: Error): boolean {
  if (process.env.NODE_ENV !== 'development') return false
  const msg = (error?.message || '').toLowerCase()
  return (
    msg.includes('loading chunk') ||
    msg.includes('chunkloaderror') ||
    msg.includes('dynamically imported module') ||
    isNetworkError(error)
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

  useEffect(() => {
    if (!isRecoverableDevError(error)) return
    const retryId = window.setTimeout(() => {
      reset()
      router.refresh()
    }, 800)
    return () => window.clearTimeout(retryId)
  }, [error, reset, router])

  const handleReset = () => {
    reset()
    router.refresh()
  }

  const isNetwork = isNetworkError(error)
  const isDevRecoverable = isRecoverableDevError(error)

  return (
    <article className="container page-safe-top py-28">
      <div className="prose max-w-none">
        <h1>Seite konnte nicht geladen werden</h1>
        {isDevRecoverable ? (
          <p>
            Der Dev-Server kompiliert gerade neu (HMR). Die Seite wird automatisch neu geladen — in
            Safari kann der Inhalt zwischenzeitlich schon sichtbar sein, wenn Chunks dort gecacht
            sind.
          </p>
        ) : isNetwork ? (
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
