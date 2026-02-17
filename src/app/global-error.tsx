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
  return (
    <html lang="de">
      <body>
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
          <h2>Ein Fehler ist aufgetreten</h2>
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
