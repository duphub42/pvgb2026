'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <div className="container page-safe-top py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">Diese Seite wurde nicht gefunden.</p>
        {pathname ? (
          <p className="text-sm text-muted-foreground">
            Angefragter Pfad: <code>{pathname}</code>
          </p>
        ) : null}
        {isDev ? (
          <p className="text-sm text-muted-foreground">
            Lokal entwickeln unter{' '}
            <Link href="http://localhost:3000/" className="underline">
              http://localhost:3000
            </Link>
            . Wenn Safari die Seite zeigt, Cursor aber 404: prüfen, ob der Simple Browser wirklich
            localhost (nicht die Production-URL aus NEXT_PUBLIC_SERVER_URL) geöffnet hat.
          </p>
        ) : null}
      </div>
      <Link href="/" className="mt-6 inline-block underline">
        Zur Startseite
      </Link>
    </div>
  )
}
