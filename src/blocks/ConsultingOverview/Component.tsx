import React from 'react'

import type { ConsultingOverviewBlock as ConsultingOverviewBlockData } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Step = {
  id: string
  title: string
  description?: string
  badge: string
  meta?: string
  accent: string
}

type ThemeColors = NonNullable<ConsultingOverviewBlockData['colors']>

const DEFAULTS = {
  headline:
    'Ihr persönlicher Ansprechpartner für Digital Consulting, Marketing & Webdesign',
  intro:
    'Ich realisiere moderne, nutzerzentrierte Websites, konsistente Markenauftritte und unterstütze Unternehmen bei der digitalen Umsetzung - effizient, fundiert und ergebnisorientiert.',
  strategyLabel: 'Digital Consulting, Marketing & Webdesign',
  strategySubLabel: 'Analyse und Ausrichtung',
  strategyTitle: 'Ich begleite Unternehmen bei der Entwicklung klarer digitaler Strategien',
  strategyText:
    'Von Positionierung und Marketing bis zur technischen Umsetzung moderner Weblösungen. Der Fokus liegt auf messbaren Ergebnissen: strukturierte Prozesse, performante Kampagnen und Websites, die nicht nur gut aussehen, sondern verkaufen.',
  benefitsLabel: 'Umsetzung und Wirkung',
  benefitsSubLabel: 'Schnell, fokussiert, effizient',
  benefitsTitle: 'Vorteile in der Übersicht',
  experienceLabel: 'Wissen was funktioniert',
  experienceSubLabel: 'Erfahrung aus vielen Projekten',
  experienceTitle: 'Seit über 20 Jahren Erfahrung im digitalen Marketing & Vertrieb',
}

const THEME_DEFAULTS = {
  gradientLavender: '#DAD9FF',
  gradientLime: '#E9FFD8',
  introBlob: '#DAD9FF',
  strategyBadge: '#08D3BB',
  benefitsBadge: '#1090CB',
  experienceBadge: '#9208D3',
  timelineStroke: '#9CA3AF',
  divider: '#D1D5DB',
  headline: '#252525',
  body: '#4B5563',
  muted: '#6B7280',
}

const pad = (value: number) => value.toString().padStart(2, '0')

const normalizeText = (value?: string | null): string => String(value ?? '').trim()

const hasText = (value?: string | null): value is string => normalizeText(value).length > 0

const normalizeTheme = (colors?: ConsultingOverviewBlockData['colors'] | null) => {
  const c: ThemeColors = colors ?? {}
  return {
    gradientLavender: normalizeText(c.gradientLavender) || THEME_DEFAULTS.gradientLavender,
    gradientLime: normalizeText(c.gradientLime) || THEME_DEFAULTS.gradientLime,
    introBlob: normalizeText(c.introBlob) || normalizeText(c.gradientLavender) || THEME_DEFAULTS.introBlob,
    strategyBadge: normalizeText(c.strategyBadge) || THEME_DEFAULTS.strategyBadge,
    benefitsBadge: normalizeText(c.benefitsBadge) || THEME_DEFAULTS.benefitsBadge,
    experienceBadge: normalizeText(c.experienceBadge) || THEME_DEFAULTS.experienceBadge,
    timelineStroke: normalizeText(c.timelineStroke) || THEME_DEFAULTS.timelineStroke,
    divider: normalizeText(c.divider) || THEME_DEFAULTS.divider,
    headline: normalizeText(c.headline) || THEME_DEFAULTS.headline,
    body: normalizeText(c.body) || THEME_DEFAULTS.body,
    muted: normalizeText(c.muted) || THEME_DEFAULTS.muted,
  }
}

function buildProcessSteps(
  data: Pick<
    ConsultingOverviewBlockData,
    | 'strategyTitle'
    | 'strategyText'
    | 'strategyLabel'
    | 'strategySubLabel'
    | 'benefitsLabel'
    | 'benefitsSubLabel'
    | 'benefitsTitle'
    | 'benefitItems'
    | 'experienceTitle'
    | 'experienceLabel'
    | 'experienceSubLabel'
  >,
  theme: ReturnType<typeof normalizeTheme>,
) {
  const steps: Step[] = []

  const strategyTitle = normalizeText(data.strategyTitle) || DEFAULTS.strategyTitle
  const strategyText = normalizeText(data.strategyText) || DEFAULTS.strategyText
  const strategyLabel = normalizeText(data.strategyLabel) || DEFAULTS.strategyLabel
  const strategySub = normalizeText(data.strategySubLabel) || DEFAULTS.strategySubLabel

  steps.push({
    id: 'strategy',
    title: strategyTitle,
    description: strategyText,
    badge: strategyLabel,
    meta: strategySub,
    accent: theme.strategyBadge,
  })

  const benefitsLabel = normalizeText(data.benefitsLabel) || DEFAULTS.benefitsLabel
  const benefitsSub = normalizeText(data.benefitsSubLabel) || DEFAULTS.benefitsSubLabel
  const benefitsTitle = normalizeText(data.benefitsTitle) || DEFAULTS.benefitsTitle
  const benefitRows = Array.isArray(data.benefitItems)
    ? data.benefitItems.filter((item): item is NonNullable<(typeof data.benefitItems)[number]> => {
        return Boolean(item && hasText(item.title) && hasText(item.text))
      })
    : []

  if (benefitRows.length > 0) {
    benefitRows.forEach((item, index) => {
      steps.push({
        id: `benefit-${index + 1}`,
        title: normalizeText(item.title),
        description: normalizeText(item.text),
        badge: benefitsLabel,
        meta: index === 0 ? benefitsSub : undefined,
        accent: theme.benefitsBadge,
      })
    })
  } else {
    steps.push({
      id: 'benefits',
      title: benefitsTitle,
      description: benefitsSub,
      badge: benefitsLabel,
      accent: theme.benefitsBadge,
    })
  }

  const experienceTitle = normalizeText(data.experienceTitle) || DEFAULTS.experienceTitle
  const experienceLabel = normalizeText(data.experienceLabel) || DEFAULTS.experienceLabel
  const experienceSub = normalizeText(data.experienceSubLabel) || DEFAULTS.experienceSubLabel

  steps.push({
    id: 'experience',
    title: experienceTitle,
    badge: experienceLabel,
    meta: experienceSub,
    accent: theme.experienceBadge,
  })

  return steps
}

const StepCard: React.FC<{ step: Step; bodyColor: string; mutedColor: string }> = ({
  step,
  bodyColor,
  mutedColor,
}) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.55)] backdrop-blur-sm transition-transform duration-300 ease-out hover:-translate-y-0.5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/35 to-transparent" />
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
          style={{ backgroundColor: step.accent }}
        >
          {step.badge}
        </span>
        {step.meta ? (
          <span className="text-[10px] font-medium uppercase tracking-[0.13em]" style={{ color: mutedColor }}>
            {step.meta}
          </span>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold leading-snug md:text-xl" style={{ color: bodyColor }}>
        {step.title}
      </h3>
      {step.description ? (
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed md:text-[0.96rem]" style={{ color: mutedColor }}>
          {step.description}
        </p>
      ) : null}
    </article>
  )
}

type ConsultingOverviewProps = ConsultingOverviewBlockData & { disableInnerContainer?: boolean }

export const ConsultingOverviewBlock: React.FC<ConsultingOverviewProps> = ({
  disableInnerContainer,
  pixelLayoutDesktop,
  colors,
  headline,
  introText,
  strategyLabel,
  strategySubLabel,
  strategyTitle,
  strategyText,
  benefitsLabel,
  benefitsSubLabel,
  benefitsTitle,
  benefitItems,
  experienceLabel,
  experienceSubLabel,
  experienceTitle,
}) => {
  const theme = normalizeTheme(colors)
  const steps = buildProcessSteps(
    {
      strategyLabel,
      strategySubLabel,
      strategyTitle,
      strategyText,
      benefitsLabel,
      benefitsSubLabel,
      benefitsTitle,
      benefitItems,
      experienceLabel,
      experienceSubLabel,
      experienceTitle,
    },
    theme,
  )
  const title = normalizeText(headline) || DEFAULTS.headline
  const intro = normalizeText(introText) || DEFAULTS.intro
  const usePixelLayout = pixelLayoutDesktop !== false

  return (
    <section className={cn('relative overflow-hidden', !disableInnerContainer && 'container')}>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-36 top-28 h-72 w-72 rounded-full blur-3xl"
        style={{ background: theme.gradientLavender, opacity: 0.3 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-36 bottom-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: theme.gradientLime, opacity: 0.3 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 hidden h-[24rem] w-[24rem] -translate-x-1/2 rounded-full lg:block"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.introBlob} 0%, transparent 72%)`,
          opacity: 0.34,
        }}
      />

      <div
        className={cn(
          'relative mx-auto py-10 md:py-14',
          usePixelLayout ? 'max-w-[74rem] px-6 lg:px-8' : 'max-w-[68rem] px-6',
        )}
      >
        <header className="relative z-10 mx-auto max-w-3xl text-center">
          <p
            className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: theme.muted }}
          >
            Process Flow
          </p>
          <h2
            className="mt-5 text-balance text-2xl font-semibold leading-tight md:text-3xl lg:text-[2.15rem]"
            style={{ color: theme.headline }}
          >
            {title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-pretty text-[0.98rem] leading-relaxed md:text-[1.03rem]"
            style={{ color: theme.muted }}
          >
            {intro}
          </p>
        </header>

        <div className="relative z-10 mt-9 border-t" style={{ borderColor: theme.divider }} />

        <div className="relative z-10 mt-8 lg:hidden">
          <ol className="space-y-5">
            {steps.map((step, index) => (
              <li key={step.id} className="relative pl-14">
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute left-[1.31rem] top-11 block w-px"
                    style={{ backgroundColor: theme.timelineStroke, bottom: '-1.5rem' }}
                  />
                ) : null}
                <span
                  className="absolute left-0 top-1 grid h-11 w-11 place-items-center rounded-full border text-xs font-semibold tracking-[0.08em]"
                  style={{
                    borderColor: theme.timelineStroke,
                    backgroundColor: 'color-mix(in srgb, var(--card) 92%, white 8%)',
                    color: theme.body,
                  }}
                >
                  {pad(index + 1)}
                </span>
                <StepCard step={step} bodyColor={theme.body} mutedColor={theme.muted} />
              </li>
            ))}
          </ol>
        </div>

        <div className="relative z-10 mt-10 hidden lg:block">
          <span
            aria-hidden
            className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2"
            style={{ backgroundColor: theme.timelineStroke }}
          />
          <ol className="space-y-9 xl:space-y-11">
            {steps.map((step, index) => {
              const alignLeft = index % 2 === 0
              return (
                <li
                  key={step.id}
                  className="grid grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] items-start"
                >
                  <div className="pr-9 xl:pr-11">
                    {alignLeft ? (
                      <StepCard step={step} bodyColor={theme.body} mutedColor={theme.muted} />
                    ) : null}
                  </div>
                  <div className="relative flex justify-center">
                    <span
                      className="mt-1 grid h-11 w-11 place-items-center rounded-full border text-xs font-semibold tracking-[0.08em]"
                      style={{
                        borderColor: theme.timelineStroke,
                        backgroundColor: 'color-mix(in srgb, var(--card) 92%, white 8%)',
                        color: theme.body,
                      }}
                    >
                      {pad(index + 1)}
                    </span>
                  </div>
                  <div className="pl-9 xl:pl-11">
                    {alignLeft ? null : (
                      <StepCard step={step} bodyColor={theme.body} mutedColor={theme.muted} />
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
