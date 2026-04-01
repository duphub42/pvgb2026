'use client'

import React from 'react'
import { Target } from 'lucide-react'

import type { ProfilUeberMichBlock as BlockData } from '@/payload-types'

import {
  profilUeberMichEinleitungDefault,
  profilWerteDefaults,
} from '@/blocks/ProfilBlocks/defaults'
import { WERT_ICON_MAP } from '@/blocks/ProfilBlocks/shared'
import { cn } from '@/utilities/ui'

type Props = BlockData & { disableInnerContainer?: boolean }

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

  const fromCms = (werte ?? []).filter((w): w is NonNullable<(typeof werte)[number]> =>
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
    <section className={cn('container border-b border-border/60 py-16 md:py-20')}>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>
          <div className="max-w-none space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-0 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {rows.map((w, idx) => {
            const iconKey = typeof w.icon === 'string' ? w.icon : 'strategy'
            const Icon = WERT_ICON_MAP[iconKey] ?? Target
            return (
              <div
                key={typeof w.id === 'string' ? w.id : `w-${idx}`}
                className="relative rounded-2xl border border-border/80 bg-muted/30 p-6 transition-colors hover:bg-muted/50"
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{w.wert}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {w.beschreibung}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
