'use client'

import React from 'react'

import type { ProfilToolsBlock as BlockData } from '@/payload-types'

import { profilToolsDefaults } from '@/blocks/ProfilBlocks/defaults'
import { TOOL_CATEGORY_LABEL } from '@/blocks/ProfilBlocks/shared'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utilities/ui'

type Props = BlockData & { disableInnerContainer?: boolean }

export const ProfilToolsBlock: React.FC<Props> = ({ disableInnerContainer: _d, sectionTitle, tools }) => {
  const fromCms = (tools ?? []).filter(
    (t): t is NonNullable<(typeof tools)[number]> => Boolean(t && String(t.name ?? '').trim()),
  )
  const rows =
    fromCms.length > 0
      ? fromCms
      : profilToolsDefaults.map((t) => ({ name: t.name, kategorie: t.kategorie }))

  const byCat = new Map<string, typeof rows>()
  for (const t of rows) {
    const k = typeof t.kategorie === 'string' ? t.kategorie : 'dev'
    if (!byCat.has(k)) byCat.set(k, [])
    byCat.get(k)!.push(t)
  }

  const title = sectionTitle?.trim() || 'Tools & Plattformen'

  return (
    <section className={cn('container py-16 md:py-20')}>
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
      {byCat.size > 0 ? (
        <div className="mt-10 space-y-10">
          {Array.from(byCat.entries()).map(([cat, list]) => (
            <div key={cat}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {TOOL_CATEGORY_LABEL[cat] ?? cat}
              </h3>
              <div className="flex flex-wrap gap-2">
                {list.map((t, i) => (
                  <Badge key={typeof t.id === 'string' ? t.id : `${cat}-${i}`} variant="outline" className="font-normal">
                    {t.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}
