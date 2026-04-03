'use client'

import React from 'react'

import type { ProfilKernkompetenzBlock as BlockData } from '@/payload-types'

import { profilKernkompetenzDefaults } from '@/blocks/ProfilBlocks/defaults'
import { cn } from '@/utilities/ui'

type Props = BlockData & { disableInnerContainer?: boolean }
type BereichItem = NonNullable<NonNullable<BlockData['bereiche']>[number]>

export const ProfilKernkompetenzBlock: React.FC<Props> = ({
  disableInnerContainer: _d,
  ueberschrift,
  einleitung,
  bereiche,
}) => {
  const head = ueberschrift?.trim() || profilKernkompetenzDefaults.ueberschrift
  const intro = einleitung?.trim() || profilKernkompetenzDefaults.einleitung
  const fromCms = (bereiche ?? []).filter(
    (b): b is BereichItem => Boolean(b && String(b.titel ?? '').trim()),
  )
  const rows =
    fromCms.length > 0
      ? fromCms
      : profilKernkompetenzDefaults.bereiche.map((b) => ({
          titel: b.titel,
          text: b.text,
          details: b.details.map((d) => ({ line: d.line })),
        }))

  return (
    <section className={cn('container py-16 md:py-20')}>
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{head}</h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {rows.map((b, idx) => {
            const details = (b.details ?? [])
              .map((d: { line?: string | null }) => (typeof d?.line === 'string' ? d.line.trim() : ''))
              .filter(Boolean)
            return (
              <article
                key={typeof (b as { id?: unknown }).id === 'string' ? (b as { id?: string }).id : `b-${idx}`}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
              >
                <h3 className="text-xl font-semibold text-foreground">{b.titel}</h3>
                {b.text ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{b.text}</p>
                ) : null}
                {details.length > 0 ? (
                  <ul className="mt-5 space-y-2 border-t border-border/80 pt-5 text-sm text-foreground/90">
                    {details.map((d: string) => (
                      <li key={d} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            )
          })}
      </div>
    </section>
  )
}
