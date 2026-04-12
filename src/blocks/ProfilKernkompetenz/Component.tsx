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
    <section className={cn('container py-16 md:py-24')}>
      <div className="max-w-3xl">
        <p className="mb-4 inline-flex w-fit items-center rounded-full border border-border/80 bg-background/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Leistungsprofil
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{head}</h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {rows.map((b, idx) => {
          const details = (b.details ?? [])
            .map((d: { line?: string | null }) => (typeof d?.line === 'string' ? d.line.trim() : ''))
            .filter(Boolean)
          return (
            <article
              key={typeof (b as { id?: unknown }).id === 'string' ? (b as { id?: string }).id : `b-${idx}`}
              className="group surface-box surface-box-shadow-strong surface-box-lift-lg relative overflow-hidden bg-gradient-to-b from-background/95 to-card/70 p-7 md:p-8"
            >
              <span
                aria-hidden
                className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
              />
              <h3 className="text-xl font-semibold text-foreground">{b.titel}</h3>
              {b.text ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{b.text}</p>
              ) : null}
              {details.length > 0 ? (
                <ul className="mt-6 space-y-2.5 border-t border-border/70 pt-5 text-sm text-foreground/90">
                  {details.map((d: string) => (
                    <li key={d} className="flex gap-2.5">
                      <span
                        className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden
                      />
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
