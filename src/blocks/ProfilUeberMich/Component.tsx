import React from 'react'
import { Target } from 'lucide-react'

import type { ProfilUeberMichBlock as BlockData } from '@/payload-types'

import {
  profilUeberMichEinleitungDefault,
  profilWerteDefaults,
} from '@/blocks/ProfilBlocks/defaults'
import { WERT_ICON_MAP } from '@/blocks/ProfilBlocks/shared'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

type Props = BlockData & { disableInnerContainer?: boolean }
type WertItem = NonNullable<NonNullable<BlockData['werte']>[number]>

export const ProfilUeberMichBlock: React.FC<Props> = ({
  disableInnerContainer: _d,
  sectionTitle,
  einleitung,
  werte,
}) => {
  const title = sectionTitle?.trim() || 'Über mich'
  const bodySource = einleitung?.trim() ? einleitung : profilUeberMichEinleitungDefault
  const paragraphs = bodySource
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  const fromCms = (werte ?? []).filter((w): w is WertItem =>
    Boolean(w && String(w.wert ?? '').trim() && String(w.beschreibung ?? '').trim()),
  )
  const rows =
    fromCms.length > 0
      ? fromCms
      : profilWerteDefaults.map((w) => ({
          icon: w.icon,
          wert: w.wert,
          beschreibung: w.beschreibung,
        }))

  return (
    <section className={cn('container py-16 md:py-24')}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="space-y-7">
          <Badge
            variant="secondary"
            className="w-fit px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
          >
            Profil
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {rows.map((w, idx) => {
            const iconKey = typeof w.icon === 'string' ? w.icon : 'strategy'
            const Icon = WERT_ICON_MAP[iconKey] ?? Target
            return (
              <Card
                key={
                  typeof (w as { id?: unknown }).id === 'string'
                    ? (w as { id?: string }).id
                    : `w-${idx}`
                }
                variant="secondary"
                className="group relative overflow-hidden p-6"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
                />
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary/15">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{w.wert}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {w.beschreibung}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
