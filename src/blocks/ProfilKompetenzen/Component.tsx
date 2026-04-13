'use client'

import React from 'react'

import type { ProfilKompetenzenBlock as BlockData } from '@/payload-types'

import { profilKompetenzenDefaults } from '@/blocks/ProfilBlocks/defaults'
import { LEVEL_PCT } from '@/blocks/ProfilBlocks/shared'
import { Card } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

type Props = BlockData & { disableInnerContainer?: boolean }
type SpalteItem = NonNullable<NonNullable<BlockData['spalten']>[number]>
type SkillItem = NonNullable<NonNullable<SpalteItem['skills']>[number]>

export const ProfilKompetenzenBlock: React.FC<Props> = ({
  disableInnerContainer: _d,
  sectionTitle,
  sectionIntro,
  spalten,
}) => {
  const st = sectionTitle?.trim() || profilKompetenzenDefaults.sectionTitle
  const si = sectionIntro?.trim() || profilKompetenzenDefaults.sectionIntro
  const fromCms = (spalten ?? []).filter((c): c is SpalteItem =>
    Boolean(c && String(c.bereich ?? '').trim()),
  )
  const cols =
    fromCms.length > 0
      ? fromCms
      : profilKompetenzenDefaults.spalten.map((c) => ({
          bereich: c.bereich,
          skills: c.skills.map((s) => ({ skill: s.skill, level: s.level })),
        }))

  return (
    <section
      className={cn(
        'relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-muted/30 to-muted/12 py-16 md:py-24',
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/[0.07] to-transparent"
      />
      <div className="container relative">
        <p className="mb-4 inline-flex w-fit items-center rounded-full border border-border/80 bg-background/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Kompetenz-Matrix
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{st}</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{si}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cols.map((col, cidx) => {
            const skills = (col.skills ?? []).filter((s): s is SkillItem =>
              Boolean(s && String(s.skill ?? '').trim()),
            )
            return (
              <Card
                key={
                  typeof (col as { id?: unknown }).id === 'string'
                    ? (col as { id?: string }).id
                    : `c-${cidx}`
                }
                variant="secondary"
                className="p-6"
              >
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                  {col.bereich}
                </h3>
                <ul className="space-y-4">
                  {skills.map((s, sidx) => {
                    const level = typeof s.level === 'string' ? s.level : 'expert'
                    const pct = LEVEL_PCT[level] ?? 50
                    return (
                      <li
                        key={
                          typeof (s as { id?: unknown }).id === 'string'
                            ? (s as { id?: string }).id
                            : `s-${cidx}-${sidx}`
                        }
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-medium text-foreground">{s.skill}</span>
                          <span className="text-xs capitalize text-muted-foreground">{level}</span>
                        </div>
                        <div
                          className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
                          aria-hidden
                        >
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-foreground/70 transition-[width] duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
