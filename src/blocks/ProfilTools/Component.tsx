'use client'

import React from 'react'

import type { ProfilToolsBlock as BlockData } from '@/payload-types'

import { profilToolsDefaults } from '@/blocks/ProfilBlocks/defaults'
import { TOOL_CATEGORY_LABEL } from '@/blocks/ProfilBlocks/shared'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utilities/ui'

type Props = BlockData & { disableInnerContainer?: boolean }
type ToolItem = NonNullable<NonNullable<BlockData['tools']>[number]>

export const ProfilToolsBlock: React.FC<Props> = ({ disableInnerContainer: _d, sectionTitle, tools }) => {
  const fromCms = (tools ?? []).filter(
    (t): t is ToolItem => Boolean(t && String(t.name ?? '').trim()),
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
    <section className={cn('container py-16 md:py-24')}>
      <p className="mb-4 inline-flex w-fit items-center rounded-full border border-border/80 bg-background/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Setup
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
      {byCat.size > 0 ? (
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {Array.from(byCat.entries()).map(([cat, list]) => (
            <div
              key={cat}
              className="rounded-xl border border-border/80 bg-background/90 p-6 shadow-[0_12px_28px_-24px_rgba(2,6,23,0.32)]"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {TOOL_CATEGORY_LABEL[cat] ?? cat}
              </h3>
              <div className="flex flex-wrap gap-2">
                {list.map((t, i) => (
                  <Badge
                    key={
                      typeof (t as { id?: unknown }).id === 'string'
                        ? (t as { id?: string }).id
                        : `${cat}-${i}`
                    }
                    variant="outline"
                    className="rounded-full border-border/75 bg-background px-3 py-1.5 text-[0.82rem] font-medium tracking-[0.01em]"
                  >
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
