'use client'

import React from 'react'

import type { ProfilKompetenzenBlock as BlockData } from '@/payload-types'

import { profilKompetenzenDefaults } from '@/blocks/ProfilBlocks/defaults'
import { LEVEL_PCT } from '@/blocks/ProfilBlocks/shared'
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
  const fromCms = (spalten ?? []).filter(
    (c): c is SpalteItem => Boolean(c && String(c.bereich ?? '').trim()),
  )
  const cols =
    fromCms.length > 0
      ? fromCms
      : profilKompetenzenDefaults.spalten.map((c) => ({
          bereich: c.bereich,
          skills: c.skills.map((s) => ({ skill: s.skill, level: s.level })),
        }))

  return (
    <section className={cn('border-y border-border/60 bg-muted/20 py-16 md:py-20')}>
      <div className="container">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{st}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{si}</p>
        <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {cols.map((col, cidx) => {
              const skills = (col.skills ?? []).filter(
                (s): s is SkillItem =>
                  Boolean(s && String(s.skill ?? '').trim()),
              )
              return (
                <div
                  key={
                    typeof (col as { id?: unknown }).id === 'string'
                      ? (col as { id?: string }).id
                      : `c-${cidx}`
                  }
                >
                  <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-primary">{col.bereich}</h3>
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
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
                            <div
                              className="h-full rounded-full bg-primary/80 transition-[width] duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
