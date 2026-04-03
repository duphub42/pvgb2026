'use client'

import React from 'react'

import type { ProfilZahlenFaktenBlock as BlockData } from '@/payload-types'

import { profilZahlenFaktenDefaults } from '@/blocks/ProfilBlocks/defaults'
import { cn } from '@/utilities/ui'

type Props = BlockData & { disableInnerContainer?: boolean }
type ZahlItem = NonNullable<NonNullable<BlockData['items']>[number]>

export const ProfilZahlenFaktenBlock: React.FC<Props> = ({
  disableInnerContainer: _d,
  sectionTitle,
  items,
}) => {
  const fromCms = (items ?? []).filter(
    (z): z is ZahlItem =>
      Boolean(z && String(z.zahl ?? '').trim() && String(z.bezeichnung ?? '').trim()),
  )
  const rows =
    fromCms.length > 0
      ? fromCms
      : profilZahlenFaktenDefaults.map((z) => ({ zahl: z.zahl, bezeichnung: z.bezeichnung }))

  const n = rows.length
  const gridCols =
    n <= 2 ? 'grid-cols-2' : n <= 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'

  return (
    <section className={cn('border-t border-border/60 bg-muted/15 py-14 md:py-16')}>
      <div className="container">
        {sectionTitle ? (
          <h2 className="mb-10 text-center text-xl font-bold text-foreground md:text-2xl">{sectionTitle}</h2>
        ) : null}
        <div className={cn('grid gap-6', gridCols)}>
          {rows.map((z, i) => (
            <div
              key={
                typeof (z as { id?: unknown }).id === 'string'
                  ? (z as { id?: string }).id
                  : `z-${i}`
              }
              className="text-center"
            >
              <p className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{z.zahl}</p>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">{z.bezeichnung}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
