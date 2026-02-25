'use client'

import React from 'react'
import { cn } from '@/utilities/ui'

type NeonFlowProps = {
  className?: string
}

/**
 * NeonFlow – animierter, weicher „Neon“-Hintergrund (angelehnt an Neon Flow von 21st.dev).
 * Nutze diese Komponente als Hintergrund-Section und lege deinen Content als Children darüber,
 * oder setze sie als reine Deko-Section ein.
 */
export const NeonFlow: React.FC<React.PropsWithChildren<NeonFlowProps>> = ({
  className,
  children,
}) => {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-border/40 bg-background/80',
        className,
      )}
    >
      {/* Farbige, weichgezeichnete Blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="neon-flow-blob neon-flow-blob-1" />
        <div className="neon-flow-blob neon-flow-blob-2" />
        <div className="neon-flow-blob neon-flow-blob-3" />
      </div>

      {/* Dezentes Grid / Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)] opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.12]" />

      {/* Inhalt */}
      <div className="relative z-10 p-6 sm:p-10">{children}</div>
    </section>
  )
}

