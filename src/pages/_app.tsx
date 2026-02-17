/**
 * Minimale _app für Next.js – wird gemeinsam mit _document benötigt,
 * wenn Next intern die Pages-Route auflöst (z. B. Error-Overlay).
 */
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
