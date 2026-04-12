import React from 'react'

import type { ConsultingOverviewBlock as ConsultingOverviewBlockData } from '@/payload-types'
import { Award, Compass, Layers, Sparkles, type LucideIcon } from 'lucide-react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

type Step = {
  id: string
  title: string
  description?: string
  badge: string
  meta?: string
  icon?: string
}

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

const pad = (value: number) => value.toString().padStart(2, '0')

const normalizeText = (value?: string | null): string => String(value ?? '').trim()

const hasText = (value?: string | null): value is string => normalizeText(value).length > 0

const getStepIcon = (stepId: string): LucideIcon => {
  if (stepId === 'strategy') return Compass
  if (stepId.startsWith('benefit')) return Sparkles
  if (stepId === 'experience') return Award
  return Layers
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
      })
    })
  } else {
    steps.push({
      id: 'benefits',
      title: benefitsTitle,
      description: benefitsSub,
      badge: benefitsLabel,
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
  })

  return steps
}

const StepCard: React.FC<{ step: Step }> = ({
  step,
}) => {
  const Icon = getStepIcon(step.id)

  return (
    <Card
      variant="secondary"
      className="transition-transform duration-300 ease-out hover:-translate-y-0.5 shadow-[0_24px_56px_-34px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_56px_-34px_rgba(0,0,0,0.4)]"
    >
      <CardHeader className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border text-muted-foreground">
            <Icon className="h-5 w-5" />
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-border bg-transparent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
              {step.badge}
            </span>
            {step.meta ? (
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {step.meta}
              </span>
            ) : null}
          </div>
        </div>
        <CardAction className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border text-muted-foreground">
          <span className="text-sm">•</span>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardTitle className="text-xl font-semibold leading-tight text-foreground md:text-2xl">
          {step.title}
        </CardTitle>
        {step.description ? (
          <CardDescription className="whitespace-pre-line text-sm leading-7 text-muted-foreground md:text-base">
            {step.description}
          </CardDescription>
        ) : null}
      </CardContent>
    </Card>
  )
}

type ConsultingOverviewProps = ConsultingOverviewBlockData & {
  disableInnerContainer?: boolean
  layoutMode?: 'standard' | 'stepList'
}

const stepListBackgrounds = ['#f4f6d5', '#e8f4f3', '#ededed', '#edf6ef', '#fef3f3']

const StepListCard: React.FC<{ step: Step; index: number }> = ({ step, index }) => {
  const Icon = getStepIcon(step.id)
  const backgroundColor = stepListBackgrounds[index % stepListBackgrounds.length]

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-7 shadow-sm transition duration-300 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-950 lg:px-8 lg:py-10">
      <span className="pointer-events-none absolute left-6 top-6 hidden text-[6rem] font-extralight leading-none text-slate-100 opacity-40 lg:block">
        {pad(index + 1)}
      </span>
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start">
        <div
          className="flex flex-none items-center justify-center rounded-full border border-slate-300 text-slate-700 shadow-sm dark:border-slate-700 dark:text-slate-200"
          style={{ background: backgroundColor }}
        >
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full lg:h-[174px] lg:w-[174px] lg:p-[48px]">
            <Icon className="h-6 w-6 lg:h-10 lg:w-10" />
          </div>
        </div>

        <div className="min-w-0 lg:max-w-[44rem]">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {step.badge}
            </span>
            {step.meta ? (
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                {step.meta}
              </span>
            ) : null}
          </div>
          <h3 className="mt-4 text-xl font-semibold leading-tight text-slate-900 dark:text-slate-100 lg:text-2xl">
            {step.title}
          </h3>
          {step.description ? (
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 lg:text-base">
              {step.description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export const ConsultingOverviewBlock: React.FC<ConsultingOverviewProps> = ({
  disableInnerContainer,
  pixelLayoutDesktop,
  layoutMode = 'stepList',
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
  colors,
}) => {
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
  )
  const title = normalizeText(headline) || DEFAULTS.headline
  const intro = normalizeText(introText) || DEFAULTS.intro
  const usePixelLayout = pixelLayoutDesktop !== false
  const useStepList = layoutMode === 'stepList'
  const strokeColor = colors?.timelineStroke || '#999999'

  const renderStepList = () => (
    <div className="relative">
      <span aria-hidden className="hidden lg:block absolute left-1/2 top-0 h-full w-16 -translate-x-1/2">
        <svg
          viewBox="0 0 90 1000"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M45 0 C75 140 15 260 45 380 C75 500 15 620 45 740 C75 860 15 980 45 1000"
            stroke={strokeColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 14"
          />
        </svg>
      </span>
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-8 top-12 h-full w-px bg-slate-200 lg:hidden"
          style={{ opacity: 0.55 }}
        />
      </div>
      <ol className="space-y-10 lg:space-y-14">
        {steps.map((step, index) => {
          const alignLeft = index % 2 === 0
          return (
            <li
              key={step.id}
              className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] items-start"
            >
              <div className="lg:pr-8">
                {alignLeft ? <StepListCard step={step} index={index} /> : null}
              </div>
              <div className="relative flex justify-center">
                <span className="mt-2 grid h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-700 shadow-sm dark:bg-slate-950 dark:border-slate-700 dark:text-slate-200">
                  {pad(index + 1)}
                </span>
              </div>
              <div className="lg:pl-8">
                {!alignLeft ? <StepListCard step={step} index={index} /> : null}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )

  return (
    <section className={cn('relative overflow-hidden', !disableInnerContainer && 'container')}>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-36 top-28 h-72 w-72 rounded-full blur-3xl"
        style={{ background: '#E5E7EB', opacity: 0.28 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-36 bottom-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: '#CBD5E1', opacity: 0.24 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 hidden h-[24rem] w-[24rem] -translate-x-1/2 rounded-full lg:block"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(148,163,184,0.16) 0%, transparent 72%)',
          opacity: 0.34,
        }}
      />

      <div
        className={cn(
          'relative mx-auto py-12 md:py-16',
          usePixelLayout ? 'max-w-[74rem] px-6 lg:px-8' : 'max-w-[68rem] px-6',
        )}
      >
        <header className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
            Prozess
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-900 dark:text-slate-100 md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            {intro}
          </p>
        </header>

        <div className="relative z-10 mt-12">
          {useStepList ? (
            renderStepList()
          ) : (
            <div className="relative">
              <span
                aria-hidden
                className="hidden lg:block absolute left-1/2 top-0 h-full w-12"
              >
                <svg viewBox="0 0 60 1000" preserveAspectRatio="none" className="h-full w-full text-slate-300 dark:text-slate-600">
                  <path
                    d="M30 0 C42 120 18 240 30 360 C42 480 18 600 30 720 C42 840 18 960 30 1000"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <ol className="space-y-10">
                {steps.map((step, index) => {
                  const alignLeft = index % 2 === 0
                  return (
                    <li
                      key={step.id}
                      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] items-start"
                    >
                      <div className="lg:pr-8">
                        {alignLeft ? <StepCard step={step} /> : null}
                      </div>
                      <div className="relative flex justify-center">
                        <span className="mt-2 grid h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">
                          {pad(index + 1)}
                        </span>
                      </div>
                      <div className="lg:pl-8">
                        {!alignLeft ? <StepCard step={step} /> : null}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
