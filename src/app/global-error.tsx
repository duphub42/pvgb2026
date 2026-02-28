'use client'

/**
 * Fängt Fehler im Root-Layout ab. Muss eigenes <html> und <body> rendern.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const isNetwork =
    typeof error?.message === 'string' &&
    /network error|failed to fetch|load failed|network request failed/i.test(error.message)

  return (
    <html lang="de">
      <body>
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
          <h2>Ein Fehler ist aufgetreten</h2>
          {isNetwork && (
            <p style={{ marginTop: '0.5rem', color: '#666' }}>
              Verbindung unterbrochen. Bitte prüfen Sie Ihre Internetverbindung bzw. ob der
              Dev-Server läuft.
            </p>
          )}
          <button
            type="button"
            onClick={() => reset()}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  )
}
