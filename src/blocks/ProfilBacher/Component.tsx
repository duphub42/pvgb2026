'use client'

import React from 'react'
import {
  Globe2,
  GraduationCap,
  Layers,
  Briefcase,
  Target,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'

import type { ProfilBacherBlock as ProfilBacherBlockData } from '@/payload-types'

import { profilContent } from '@/blocks/ProfilBacher/profilContent'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

const WERT_ICON_MAP: Record<string, LucideIcon> = {
  strategy: Target,
  global: Globe2,
  depth: Layers,
  direct: UserRound,
}

const LEVEL_PCT: Record<string, number> = {
  expert: 100,
  advanced: 72,
  basic: 40,
}

const TOOL_CATEGORY_LABEL: Record<string, string> = {
  dev: 'Entwicklung',
  design: 'Design',
  analytics: 'Analytics',
  marketing: 'Marketing & Systeme',
  automation: 'Automatisierung & Projekte',
}

const toolsByCategory: Map<string, (typeof profilContent.tools)[number][]> = (() => {
  const map = new Map<string, (typeof profilContent.tools)[number][]>()
  for (const t of profilContent.tools) {
    const key = t.kategorie
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(t)
  }
  return map
})()

type ProfilBacherProps = ProfilBacherBlockData & { disableInnerContainer?: boolean }

function CtaLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^https?:\/\//i.test(href)
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    )
  }
  return <Link href={href}>{children}</Link>
}

export const ProfilBacherBlock: React.FC<ProfilBacherProps> = ({
  disableInnerContainer: _disableInnerContainer,
}) => {
  const c = profilContent

  return (
    <div className="w-full min-w-0">
      {/* Über mich */}
      <section className="container border-b border-border/60 py-16 md:py-20">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Über mich</h2>
        <div
          className={cn(
            'prose prose-neutral max-w-none dark:prose-invert',
            'prose-p:text-muted-foreground prose-p:leading-relaxed',
            'prose-headings:text-foreground',
          )}
          dangerouslySetInnerHTML={{ __html: c.ueberMich.einleitung }}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {c.ueberMich.werte.map((w) => {
            const Icon = WERT_ICON_MAP[w.icon] ?? Target
            return (
              <div
                key={w.wert}
                className="rounded-2xl border border-border/80 bg-muted/30 p-6 transition-colors hover:bg-muted/50"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{w.wert}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{w.beschreibung}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Kernkompetenz */}
      <section className="container py-16 md:py-20">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{c.kernkompetenz.ueberschrift}</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{c.kernkompetenz.text}</p>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {c.kernkompetenz.bereiche.map((b) => (
            <article
              key={b.titel}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
            >
              <h3 className="text-xl font-semibold text-foreground">{b.titel}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{b.text}</p>
              <ul className="mt-5 space-y-2 border-t border-border/80 pt-5 text-sm text-foreground/90">
                {b.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Kompetenzen */}
      <section className="border-y border-border/60 bg-muted/20 py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Kompetenzen</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Erfahrung nach Bereichen – von der Strategie bis zur technischen Umsetzung.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {c.kompetenzen.map((col) => (
              <div key={col.bereich}>
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-primary">{col.bereich}</h3>
                <ul className="space-y-4">
                  {col.skills.map((s) => {
                    const pct = LEVEL_PCT[s.level] ?? 50
                    return (
                      <li key={s.skill}>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-medium text-foreground">{s.skill}</span>
                          <span className="text-xs capitalize text-muted-foreground">{s.level}</span>
                        </div>
                        <div
                          className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
                          role="presentation"
                          aria-hidden
                        >
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
            ))}
          </div>
        </div>
      </section>

      {/* Werdegang */}
      <section className="container py-16 md:py-20">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Werdegang</h2>
        <ol className="relative mt-10 space-y-10 border-l border-border pl-8 md:pl-10">
          {c.werdegang.map((w) => {
            const isWork = w.typ === 'freelance'
            return (
              <li key={`${w.zeitraum}-${w.position}`} className="relative">
                <span
                  className={cn(
                    'absolute -left-[calc(0.5rem+1px)] top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background',
                    isWork ? 'bg-primary' : 'bg-muted-foreground/40',
                  )}
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-primary">{w.zeitraum}</span>
                  <Badge variant={isWork ? 'default' : 'secondary'} className="text-xs font-normal">
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
                <h3 className="mt-2 text-lg font-semibold text-foreground">{w.position}</h3>
                <p className="text-sm font-medium text-muted-foreground">{w.unternehmen}</p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{w.beschreibung}</p>
              </li>
            )
          })}
        </ol>
      </section>

      {/* Zahlen & Fakten */}
      <section className="border-t border-border/60 bg-muted/15 py-14 md:py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5 md:gap-4">
            {c.zahlenFakten.map((z) => (
              <div key={z.bezeichnung} className="text-center">
                <p className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{z.zahl}</p>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">{z.bezeichnung}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="container py-16 md:py-20">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Tools & Plattformen</h2>
        <div className="mt-10 space-y-10">
          {Array.from(toolsByCategory.entries()).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {TOOL_CATEGORY_LABEL[cat] ?? cat}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <Badge key={t.name} variant="outline" className="font-normal">
                    {t.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sprachen & Zertifikate */}
      <section className="border-t border-border/60 py-16 md:py-20">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-foreground md:text-2xl">Sprachen</h2>
            <ul className="mt-6 divide-y divide-border/80">
              {c.sprachen.map((s) => (
                <li key={s.sprache} className="flex justify-between gap-4 py-3 text-sm md:text-base">
                  <span className="font-medium text-foreground">{s.sprache}</span>
                  <span className="text-muted-foreground">{s.niveau}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground md:text-2xl">Zertifikate & Qualifikationen</h2>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground md:text-base">
              {c.zertifikate.map((z) => (
                <li key={z} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{z}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-primary/5 py-16 md:py-20">
        <div className="container text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{c.cta.headline}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{c.cta.text}</p>
          <Button asChild size="lg" className="mt-8">
            <CtaLink href={c.cta.buttonLink}>{c.cta.buttonLabel}</CtaLink>
          </Button>
        </div>
      </section>
    </div>
  )
}
