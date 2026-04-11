'use client'

import React from 'react'

import type { ProfilLangZertBlock as BlockData } from '@/payload-types'

import { profilSprachenDefaults, profilZertifikateDefaults } from '@/blocks/ProfilBlocks/defaults'
import { cn } from '@/utilities/ui'

type Props = BlockData & { disableInnerContainer?: boolean }
type SpracheItem = NonNullable<NonNullable<BlockData['sprachen']>[number]>

export const ProfilLangZertBlock: React.FC<Props> = ({
  disableInnerContainer: _d,
  sprachenSectionTitle,
  zertifikateSectionTitle,
  sprachen,
  zertifikate,
}) => {
  const sprachenTitle = sprachenSectionTitle?.trim() || 'Sprachen'
  const zertifikateTitle = zertifikateSectionTitle?.trim() || 'Zertifikate & Qualifikationen'

  const sprFromCms = (sprachen ?? []).filter(
    (s): s is SpracheItem =>
      Boolean(s && String(s.sprache ?? '').trim() && String(s.niveau ?? '').trim()),
  )
  const sprRows =
    sprFromCms.length > 0
      ? sprFromCms
      : profilSprachenDefaults.map((s) => ({ sprache: s.sprache, niveau: s.niveau }))

  const zertFromCms = (zertifikate ?? [])
    .map((x) => (typeof x?.bezeichnung === 'string' ? x.bezeichnung.trim() : ''))
    .filter(Boolean)
  const zertRows =
    zertFromCms.length > 0 ? zertFromCms : profilZertifikateDefaults.map((z) => z.bezeichnung)

  return (
    <section className={cn('border-t border-border/60 bg-muted/15 py-16 md:py-24')}>
      <div className="container grid gap-12 lg:grid-cols-2">
        {sprRows.length > 0 ? (
          <div className="min-w-0 rounded-xl border border-border/80 bg-background/90 p-6 shadow-[0_12px_28px_-24px_rgba(2,6,23,0.32)] md:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">{sprachenTitle}</h2>
            <ul className={cn('mt-6 divide-y divide-border/80')}>
              {sprRows.map((s, i) => (
                <li
                  key={
                    typeof (s as { id?: unknown }).id === 'string'
                      ? (s as { id?: string }).id
                      : `sp-${i}`
                  }
                  className="flex justify-between gap-4 py-3 text-sm md:text-base"
                >
                  <span className="font-medium text-foreground">{s.sprache}</span>
                  <span className="text-muted-foreground">{s.niveau}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {zertRows.length > 0 ? (
          <div className="min-w-0 rounded-xl border border-border/80 bg-background/90 p-6 shadow-[0_12px_28px_-24px_rgba(2,6,23,0.32)] md:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {zertifikateTitle}
            </h2>
            <ul className={cn('mt-6 space-y-3 text-sm text-muted-foreground md:text-base')}>
              {zertRows.map((z) => (
                <li key={z} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{z}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
