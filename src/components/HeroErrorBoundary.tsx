'use client'

import React from 'react'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  error?: Error
}

/**
 * Fängt Fehler im Hero ab, damit die restliche Seite (Blocks) noch gerendert wird.
 */
export class HeroErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[HeroErrorBoundary]', error?.message, errorInfo?.componentStack)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          className="relative flex min-h-[40vh] items-center justify-center bg-neutral-900 px-4 py-16 text-white"
          aria-label="Hero"
        >
          <div className="text-center">
            <p className="text-sm text-white/80">Hero konnte nicht geladen werden.</p>
            {process.env.NODE_ENV === 'development' && this.state.error?.message && (
              <pre className="mt-2 max-w-full overflow-auto rounded bg-black/30 p-2 text-left text-xs">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
