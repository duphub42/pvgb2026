/**
 * Minimale _document für Next.js – wird benötigt, damit der Build
 * (z. B. Error-Overlay / Fallback) die erwartete Datei findet.
 * App Router nutzt app/layout; diese Datei dient nur der Kompatibilität.
 */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
