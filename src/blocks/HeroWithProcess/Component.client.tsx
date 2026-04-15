'use client'

import { motion } from 'framer-motion'

import type { HeroWithProcessBlock as HeroWithProcessBlockData } from '@/payload-types'

import { AtmosphereBackground } from './AtmosphereBackground'

type Step = {
  key: string
  stepNumber: string
  title: string
  subtitle: string
  text: string
}

const DEFAULTS = {
  seoH1: 'Webdesign, Strategie, Entwicklung und langfristige digitale Betreuung',
  heroEyebrow: 'Strategie · Design · Entwicklung · Wachstum',
  heroHeading: 'Von der Strategie zur messbaren Wirkung',
  heroText:
    'Strukturierte Prozesse, klare Entscheidungen und digitale Systeme, die nicht nur gut aussehen, sondern echte Ergebnisse liefern.',
  processHeading: 'So läuft die Zusammenarbeit',
  processIntro: 'Transparent, strukturiert und mit klaren Ergebnissen.',
} as const

const DEFAULT_STEPS: Step[] = [
  {
    key: 'default-01',
    stepNumber: '01',
    title: 'Analyse & Ausrichtung',
    subtitle: 'Fundament für alle weiteren Maßnahmen',
    text: 'Wir definieren Ziele, Prioritäten und den richtigen Fokus. Vor der Umsetzung klären wir, was wirklich zählt: Zielgruppen, Positionierung, Angebote und konkrete Business-Ziele. So entsteht ein belastbarer Plan statt Aktionismus.',
  },
  {
    key: 'default-02',
    stepNumber: '02',
    title: 'Klärung & Strategie',
    subtitle: 'Ziele verstehen & Struktur schaffen',
    text: 'Wir besprechen Ihr Projekt, Ihre Zielgruppe und die gewünschten Ergebnisse. Daraus entsteht eine klare strategische Grundlage für alle weiteren Schritte.',
  },
  {
    key: 'default-03',
    stepNumber: '03',
    title: 'Konzept & Rahmen',
    subtitle: 'Struktur, UX & visuelle Richtung',
    text: 'Ich entwickle eine klare Struktur, Inhaltsführung und visuelle Richtung. Das Design wird strategisch aufgebaut, nicht dekorativ.',
  },
  {
    key: 'default-04',
    stepNumber: '04',
    title: 'Umsetzung & Feinschliff',
    subtitle: 'Design & Development in hoher Qualität',
    text: 'Die Website bzw. dein Projekt entsteht in enger Abstimmung mit dir, mit Fokus auf Nutzerführung, Performance und Detailqualität.',
  },
  {
    key: 'default-05',
    stepNumber: '05',
    title: 'Go-live & Begleitung',
    subtitle: 'Launch & erste Optimierung',
    text: 'Nach dem Launch stehe ich für erste Optimierungen, Testing und Fragen zur Verfügung, um einen sauberen Start sicherzustellen.',
  },
  {
    key: 'default-06',
    stepNumber: '06',
    title: 'Langfristige Partnerschaft',
    subtitle: 'Weiterentwicklung auf Basis realer Daten',
    text: 'Nach der Umsetzung begleite ich bei Skalierung, Tests, SEO-Optimierung und kontinuierlicher Verbesserung auf Basis echter Nutzerdaten.',
  },
]

const normalizeText = (value?: string | null): string =>
  typeof value === 'string' ? value.trim() : ''

const hasText = (value?: string | null): boolean => normalizeText(value).length > 0

const padStepNumber = (value: string | null | undefined, index: number): string => {
  const normalized = normalizeText(value)
  if (normalized.length > 0) return normalized
  return String(index + 1).padStart(2, '0')
}

const normalizeSteps = (steps: HeroWithProcessBlockData['steps']): Step[] => {
  const rows = Array.isArray(steps)
    ? steps.filter((step): step is NonNullable<(typeof steps)[number]> =>
        Boolean(step && hasText(step.title) && hasText(step.text)),
      )
    : []

  if (rows.length === 0) return DEFAULT_STEPS

  return rows.map((step, index) => {
    const persistedId = typeof step.id === 'string' ? step.id : ''

    return {
      key: persistedId || `step-${index + 1}`,
      stepNumber: padStepNumber(step.stepNumber, index),
      title: normalizeText(step.title),
      subtitle: normalizeText(step.subtitle),
      text: normalizeText(step.text),
    }
  })
}

type HeroWithProcessProps = HeroWithProcessBlockData & { disableInnerContainer?: boolean }

export function HeroWithProcessBlock({
  disableInnerContainer: _disableInnerContainer,
  seoH1,
  heroEyebrow,
  heroHeading,
  heroText,
  processHeading,
  processIntro,
  steps,
}: HeroWithProcessProps) {
  const resolvedSteps = normalizeSteps(steps)

  const resolvedSeoH1 = normalizeText(seoH1) || DEFAULTS.seoH1
  const resolvedHeroEyebrow = normalizeText(heroEyebrow) || DEFAULTS.heroEyebrow
  const resolvedHeroHeading = normalizeText(heroHeading) || DEFAULTS.heroHeading
  const resolvedHeroText = normalizeText(heroText) || DEFAULTS.heroText
  const resolvedProcessHeading = normalizeText(processHeading) || DEFAULTS.processHeading
  const resolvedProcessIntro = normalizeText(processIntro) || DEFAULTS.processIntro

  return (
    <section className="relative w-full overflow-hidden bg-[rgb(var(--hero-process-bg))] text-[rgb(var(--hero-process-text))]">
      <h1 className="sr-only">{resolvedSeoH1}</h1>

      <header className="relative flex min-h-screen items-center justify-center">
        <AtmosphereBackground />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] uppercase tracking-[0.35em] text-[rgb(var(--hero-process-text))]/40 sm:text-xs"
          >
            {resolvedHeroEyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            {resolvedHeroHeading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-sm text-[rgb(var(--hero-process-text))]/60 sm:text-base md:text-lg"
          >
            {resolvedHeroText}
          </motion.p>
        </div>
      </header>

      <section className="relative border-t border-[rgb(var(--hero-process-border))]/10 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <h3 className="text-2xl font-light sm:text-3xl">{resolvedProcessHeading}</h3>
            <p className="mt-3 text-sm text-[rgb(var(--hero-process-text))]/50 sm:text-base">
              {resolvedProcessIntro}
            </p>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-[rgb(var(--hero-process-border))]/10 sm:left-1/2" />

            <div className="space-y-16">
              {resolvedSteps.map((step, index) => {
                const reverseOnDesktop = index % 2 !== 0

                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className={`relative flex flex-col gap-6 sm:flex-row sm:gap-12 ${
                      reverseOnDesktop ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="flex flex-shrink-0 items-start sm:w-1/2 sm:justify-end">
                      <div className="relative">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(var(--hero-process-step-bg))] text-xs font-medium text-[rgb(var(--hero-process-step-text))]">
                          {step.stepNumber}
                        </div>
                        <div className="absolute left-1/2 top-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[rgb(var(--hero-process-step-bg))]/40" />
                      </div>
                    </div>

                    <div className="sm:w-1/2">
                      <h4 className="text-lg font-light sm:text-xl">{step.title}</h4>

                      {step.subtitle ? (
                        <p className="mt-1 text-sm text-[rgb(var(--hero-process-text))]/50">
                          {step.subtitle}
                        </p>
                      ) : null}

                      <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--hero-process-text))]/60 sm:text-base">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
