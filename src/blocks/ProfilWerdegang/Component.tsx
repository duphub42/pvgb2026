import React from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'

import type { ProfilWerdegangBlock as BlockData } from '@/payload-types'

import { profilWerdegangDefaults } from '@/blocks/ProfilBlocks/defaults'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

type Props = BlockData & { disableInnerContainer?: boolean }
type EintragItem = NonNullable<NonNullable<BlockData['eintraege']>[number]>

export const ProfilWerdegangBlock: React.FC<Props> = ({
  disableInnerContainer: _d,
  sectionTitle,
  eintraege,
}) => {
  const st = sectionTitle?.trim() || profilWerdegangDefaults.sectionTitle
  const fromCms = (eintraege ?? []).filter((e): e is EintragItem =>
    Boolean(e && String(e.zeitraum ?? '').trim() && String(e.position ?? '').trim()),
  )
  const rows =
    fromCms.length > 0
      ? fromCms
      : profilWerdegangDefaults.eintraege.map((e) => ({
          zeitraum: e.zeitraum,
          position: e.position,
          unternehmen: e.unternehmen,
          beschreibung: e.beschreibung,
          typ: e.typ,
        }))

  return (
    <section className={cn('container py-16 md:py-24')}>
      <Badge
        variant="secondary"
        className="mb-4 w-fit px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
      >
        Erfahrung
      </Badge>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{st}</h2>
      <ol className="relative mt-12 space-y-7 border-l border-border/70 pl-8 md:pl-10">
        {rows.map((w, idx) => {
          const isWork = w.typ === 'freelance'
          return (
            <li
              key={
                typeof (w as { id?: unknown }).id === 'string'
                  ? (w as { id?: string }).id
                  : `e-${idx}`
              }
              className="relative"
            >
              <span
                className={cn(
                  'absolute -left-[calc(0.5rem+1px)] top-6 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background ring-2 ring-background',
                  isWork ? 'bg-primary' : 'bg-muted-foreground/40',
                )}
                aria-hidden
              />
              <Card variant="secondary" className="p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-primary">{w.zeitraum}</span>
                  <Badge variant={isWork ? 'primary' : 'secondary'} className="text-xs font-normal">
                    {isWork ? (
                      <>
                        <Briefcase className="mr-1 h-3 w-3" aria-hidden />
                        Beruflich
                      </>
                    ) : (
                      <>
                        <GraduationCap className="mr-1 h-3 w-3" aria-hidden />
                        Ausbildung
                      </>
                    )}
                  </Badge>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{w.position}</h3>
                {w.unternehmen ? (
                  <p className="text-sm font-medium text-muted-foreground">{w.unternehmen}</p>
                ) : null}
                {w.beschreibung ? (
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {w.beschreibung}
                  </p>
                ) : null}
              </Card>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
