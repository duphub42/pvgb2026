import React from 'react'

import type { ConsultingOverviewBlock as ConsultingOverviewBlockData } from '@/payload-types'
import {
  Award,
  Briefcase,
  Compass,
  Globe,
  Layers,
  Lightbulb,
  Rocket,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import './consulting-overview-flow.css'

type Step = {
  id: string
  title: string
  description?: string
  badge: string
  meta?: string
  icon?: string
}

const WORDPRESS_PROCESS_STEP_COPY: Array<
  Pick<Step, 'title' | 'description' | 'badge' | 'meta' | 'icon'>
> = [
  {
    title: 'Zielbild scharfstellen',
    description:
      'Wir klären Angebot, Zielgruppe, bestehende Website, technische Grenzen und messbare Erwartungen. Danach ist klar, was gebaut wird und was bewusst nicht.',
    badge: 'Orientierung',
    meta: 'Audit & Prioritäten',
    icon: 'compass',
  },
  {
    title: 'Systemplan entwerfen',
    description:
      'Aus Inhalten, Seitenstruktur, Builder-Setup, Templates und Pflegebedarf entsteht ein belastbarer Umsetzungsplan statt einer losen Wunschliste.',
    badge: 'Planung',
    meta: 'Struktur & Architektur',
    icon: 'layers',
  },
  {
    title: 'Design in Komponenten übersetzen',
    description:
      'Layouts, Module und Inhaltsbereiche werden so aufgebaut, dass sie wiederverwendbar, verständlich und im Alltag sauber pflegbar bleiben.',
    badge: 'UI-System',
    meta: 'Builder & Komponenten',
    icon: 'sparkles',
  },
  {
    title: 'WordPress sauber umsetzen',
    description:
      'Theme, Builder, Plugins und Custom-Code werden schlank kombiniert. Performance, Responsiveness und Wartbarkeit werden während der Umsetzung mitgedacht.',
    badge: 'Umsetzung',
    meta: 'Theme & Technik',
    icon: 'settings',
  },
  {
    title: 'Testen, härten, launchen',
    description:
      'Vor dem Go-live werden Inhalte, Formulare, Mobilansicht, Ladezeiten, Tracking und typische Nutzerwege geprüft. Danach geht die Seite kontrolliert online.',
    badge: 'Launch',
    meta: 'QA & Übergabe',
    icon: 'rocket',
  },
  {
    title: 'Weiterentwickeln mit Daten',
    description:
      'Nach dem Launch geht es um echte Nutzung: Sichtbarkeit, Anfragen, Inhalte, technische Pflege und sinnvolle Verbesserungen auf Basis von Daten.',
    badge: 'Wachstum',
    meta: 'SEO & Optimierung',
    icon: 'trending-up',
  },
]

const WORDPRESS_PROCESS_STEP_COPY_EN: Array<
  Pick<Step, 'title' | 'description' | 'badge' | 'meta' | 'icon'>
> = [
  {
    title: 'Sharpen the Target Picture',
    description:
      'We clarify the offer, audience, existing website, technical limits and measurable expectations. After that, it is clear what will be built and what will deliberately be left out.',
    badge: 'Orientation',
    meta: 'Audit & Priorities',
    icon: 'compass',
  },
  {
    title: 'Design the System Plan',
    description:
      'Content, page structure, builder setup, templates and maintenance needs become a robust implementation plan instead of a loose wish list.',
    badge: 'Planning',
    meta: 'Structure & Architecture',
    icon: 'layers',
  },
  {
    title: 'Translate Design Into Components',
    description:
      'Layouts, modules and content areas are built so they remain reusable, understandable and easy to maintain in everyday use.',
    badge: 'UI System',
    meta: 'Builder & Components',
    icon: 'sparkles',
  },
  {
    title: 'Implement WordPress Cleanly',
    description:
      'Theme, builder, plugins and custom code are combined leanly. Performance, responsiveness and maintainability are considered throughout implementation.',
    badge: 'Implementation',
    meta: 'Theme & Technology',
    icon: 'settings',
  },
  {
    title: 'Test, Harden, Launch',
    description:
      'Before go-live, content, forms, mobile views, load times, tracking and typical user paths are checked. Then the site goes online in a controlled launch.',
    badge: 'Launch',
    meta: 'QA & Handover',
    icon: 'rocket',
  },
  {
    title: 'Improve With Data',
    description:
      'After launch, the focus is real usage: visibility, inquiries, content, technical maintenance and meaningful improvements based on data.',
    badge: 'Growth',
    meta: 'SEO & Optimization',
    icon: 'trending-up',
  },
]

const WEBDESIGN_PROCESS_STEP_COPY: Array<
  Pick<Step, 'title' | 'description' | 'badge' | 'meta' | 'icon'>
> = [
  {
    title: 'Ziele und Nutzerwege klären',
    description:
      'Wir definieren Zielgruppen, Angebote, Prioritäten und die wichtigsten Kontaktwege. So entsteht eine Website, die Besucher nicht nur informiert, sondern gezielt zur Anfrage führt.',
    badge: 'Strategie',
    meta: 'Ziele & Struktur',
    icon: 'compass',
  },
  {
    title: 'Seitenstruktur und Inhalte planen',
    description:
      'Aus Leistungen, Referenzen, Vertrauenselementen und Suchintentionen entsteht eine klare Sitemap mit sinnvollen Inhaltsbereichen und starken Einstiegen.',
    badge: 'Konzept',
    meta: 'UX & Content',
    icon: 'layers',
  },
  {
    title: 'Interface und Komponenten gestalten',
    description:
      'Design, Module und Interaktionen werden als wiederverwendbares System aufgebaut: klar, responsiv, markentauglich und ohne unnötige Reibung.',
    badge: 'Design',
    meta: 'UI-System',
    icon: 'sparkles',
  },
  {
    title: 'Technisch sauber umsetzen',
    description:
      'Frontend, CMS, Formulare, Tracking und Performance werden so verbunden, dass die Website schnell lädt, einfach pflegbar bleibt und zuverlässig funktioniert.',
    badge: 'Entwicklung',
    meta: 'CMS & Code',
    icon: 'settings',
  },
  {
    title: 'Prüfen, optimieren, launchen',
    description:
      'Vor dem Go-live werden Mobilansicht, Ladezeiten, Formulare, SEO-Grundlagen, Datenschutzpunkte und typische Nutzerwege getestet.',
    badge: 'Launch',
    meta: 'QA & Go-live',
    icon: 'rocket',
  },
  {
    title: 'Sichtbarkeit und Anfragen ausbauen',
    description:
      'Nach dem Launch wird sichtbar, welche Seiten wirken. Inhalte, lokale SEO, Conversion-Pfade und technische Pflege werden datenbasiert weiterentwickelt.',
    badge: 'Wachstum',
    meta: 'SEO & Conversion',
    icon: 'trending-up',
  },
]

const WEBDESIGN_PROCESS_STEP_COPY_EN: Array<
  Pick<Step, 'title' | 'description' | 'badge' | 'meta' | 'icon'>
> = [
  {
    title: 'Clarify Goals and User Paths',
    description:
      'We define target audiences, offers, priorities and the most important contact paths. This creates a website that not only informs visitors, but guides them toward an inquiry.',
    badge: 'Strategy',
    meta: 'Goals & Structure',
    icon: 'compass',
  },
  {
    title: 'Plan Page Structure and Content',
    description:
      'Services, references, trust elements and search intent are turned into a clear sitemap with useful content areas and strong entry points.',
    badge: 'Concept',
    meta: 'UX & Content',
    icon: 'layers',
  },
  {
    title: 'Design Interface and Components',
    description:
      'Design, modules and interactions are built as a reusable system: clear, responsive, brand-ready and without unnecessary friction.',
    badge: 'Design',
    meta: 'UI System',
    icon: 'sparkles',
  },
  {
    title: 'Implement Cleanly',
    description:
      'Frontend, CMS, forms, tracking and performance are connected so the website loads quickly, remains easy to maintain and works reliably.',
    badge: 'Development',
    meta: 'CMS & Code',
    icon: 'settings',
  },
  {
    title: 'Test, Optimize, Launch',
    description:
      'Before go-live, mobile views, load times, forms, SEO basics, privacy points and typical user paths are tested.',
    badge: 'Launch',
    meta: 'QA & Go-live',
    icon: 'rocket',
  },
  {
    title: 'Grow Visibility and Inquiries',
    description:
      'After launch, it becomes clear which pages perform. Content, local SEO, conversion paths and technical maintenance are developed further based on data.',
    badge: 'Growth',
    meta: 'SEO & Conversion',
    icon: 'trending-up',
  },
]

const getProcessStep = (
  step: Step,
  index: number,
  copy: Array<Pick<Step, 'title' | 'description' | 'badge' | 'meta' | 'icon'>>,
): Step => {
  const curated = copy[index]
  if (!curated) return step

  return {
    ...step,
    ...curated,
    id: step.id,
  }
}

const DEFAULTS = {
  headline: 'Ihr persönlicher Ansprechpartner für Digital Consulting, Marketing & Webdesign',
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

const ICON_MAP: Record<string, LucideIcon> = {
  compass: Compass,
  sparkles: Sparkles,
  award: Award,
  layers: Layers,
  target: Target,
  rocket: Rocket,
  settings: Settings,
  globe: Globe,
  zap: Zap,
  'trending-up': TrendingUp,
  briefcase: Briefcase,
  lightbulb: Lightbulb,
}

const getStepIcon = (icon?: string, stepId?: string): LucideIcon => {
  const byIcon = icon ? ICON_MAP[icon] : undefined
  if (byIcon) return byIcon
  if (stepId === 'strategy') return Compass
  if (stepId?.startsWith('benefit')) return Sparkles
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
    | 'benefitsIcon'
    | 'benefitItems'
    | 'experienceTitle'
    | 'experienceLabel'
    | 'experienceSubLabel'
    | 'strategyIcon'
    | 'experienceIcon'
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
    icon: data.strategyIcon ?? undefined,
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
        icon: item.icon ?? data.benefitsIcon ?? undefined,
      })
    })
  } else {
    steps.push({
      id: 'benefits',
      title: benefitsTitle,
      description: benefitsSub,
      badge: benefitsLabel,
      icon: data.benefitsIcon ?? undefined,
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
    icon: data.experienceIcon ?? undefined,
  })

  return steps
}

const StepCard: React.FC<{ step: Step }> = ({ step }) => {
  const Icon = getStepIcon(step.icon, step.id)

  return (
    <Card
      variant="secondary"
      className="transition-transform duration-300 ease-out hover:-translate-y-0.5 shadow-[0_24px_56px_-34px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_56px_-34px_rgba(0,0,0,0.4)]"
    >
      <CardHeader className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border text-muted-foreground">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
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
  locale?: string
  pageSlug?: string
}

export const ConsultingOverviewBlock: React.FC<ConsultingOverviewProps> = ({
  disableInnerContainer,
  locale,
  pixelLayoutDesktop,
  layoutMode = 'stepList',
  pageSlug,
  headline,
  introText,
  strategyLabel,
  strategySubLabel,
  strategyTitle,
  strategyText,
  strategyIcon,
  benefitsLabel,
  benefitsSubLabel,
  benefitsTitle,
  benefitsIcon,
  benefitItems,
  experienceLabel,
  experienceSubLabel,
  experienceTitle,
  experienceIcon,
}) => {
  const steps = buildProcessSteps({
    strategyLabel,
    strategySubLabel,
    strategyTitle,
    strategyText,
    strategyIcon,
    benefitsLabel,
    benefitsSubLabel,
    benefitsTitle,
    benefitsIcon,
    benefitItems,
    experienceLabel,
    experienceSubLabel,
    experienceTitle,
    experienceIcon,
  })
  const title = normalizeText(headline) || DEFAULTS.headline
  const intro = normalizeText(introText) || DEFAULTS.intro
  const usePixelLayout = pixelLayoutDesktop !== false
  const useStepList = layoutMode === 'stepList'
  const normalizedPageSlug = normalizeText(pageSlug).toLowerCase()
  const isWordPressPage =
    normalizedPageSlug === 'wordpress-agentur' || normalizedPageSlug.includes('wordpress')
  const isWebdesignPage = normalizedPageSlug === 'webdesign'
  const stepListCopy =
    locale === 'en'
      ? isWordPressPage
        ? WORDPRESS_PROCESS_STEP_COPY_EN
        : WEBDESIGN_PROCESS_STEP_COPY_EN
      : isWordPressPage
        ? WORDPRESS_PROCESS_STEP_COPY
        : WEBDESIGN_PROCESS_STEP_COPY
  const stepListHeading = isWordPressPage
    ? locale === 'en'
      ? 'A Clear Plan Instead of WordPress Sprawl.'
      : 'Ein klarer Plan statt WordPress-Wildwuchs.'
    : isWebdesignPage
      ? locale === 'en'
        ? 'A clear web design process from strategy to launch.'
        : 'Ein klarer Webdesign-Prozess von Strategie bis Launch.'
      : title
  const stepListIntro = isWordPressPage
    ? locale === 'en'
      ? 'From the first audit to ongoing optimization: every step has a clear task, a visible result and a technical purpose.'
      : 'Von der ersten Analyse bis zur laufenden Optimierung: Jeder Schritt hat eine klare Aufgabe, ein sichtbares Ergebnis und einen technischen Zweck.'
    : isWebdesignPage
      ? locale === 'en'
        ? 'From structure and content to interface, development and optimization: every step makes the website more usable, faster and more focused on inquiries.'
        : 'Von Struktur und Inhalten über Interface und Entwicklung bis zur Optimierung: Jeder Schritt macht die Website nutzbarer, schneller und anfrageorientierter.'
      : intro

  const renderStepList = () => (
    <div className="consulting-flow">
      <ol className="consulting-flow-list">
        {steps.map((rawStep, index) => {
          const step = getProcessStep(rawStep, index, stepListCopy)
          const Icon = getStepIcon(step.icon, step.id)

          return (
            <li key={step.id} className="consulting-flow-item">
              <div className="consulting-flow-item-inner">
                <div className="consulting-flow-content">
                  <span className="consulting-flow-number">{pad(index + 1)}</span>
                  <span className="consulting-flow-icon" aria-hidden>
                    <Icon className="h-full w-full" strokeWidth={1.5} />
                  </span>

                  <div className="consulting-flow-body">
                    <div className="consulting-flow-tags">
                      <span className="consulting-flow-badge">{step.badge}</span>
                      {step.meta ? <span className="consulting-flow-meta">{step.meta}</span> : null}
                    </div>
                    <h3 className="consulting-flow-title">{step.title}</h3>
                    {step.description ? (
                      <p className="consulting-flow-description whitespace-pre-line">
                        {step.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )

  return (
    <section
      className={cn(
        'relative overflow-x-hidden overflow-y-hidden py-8 md:py-12',
        !disableInnerContainer && 'container',
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-44 top-24 h-80 w-80 rounded-full blur-[14rem]"
        style={{ background: '#E5E7EB', opacity: 0.16 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-44 bottom-20 h-96 w-96 rounded-full blur-[14rem]"
        style={{ background: '#CBD5E1', opacity: 0.14 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 hidden h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[16rem] lg:block"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(148,163,184,0.18) 0%, transparent 74%)',
          opacity: 0.2,
        }}
      />

      <div
        className={cn(
          'relative mx-auto py-12 md:py-16',
          usePixelLayout ? 'max-w-[74rem] px-6 lg:px-8' : 'max-w-[68rem] px-6',
        )}
      >
        <header className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/85">
            {locale === 'en' ? 'Process' : 'Prozess'}
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] text-foreground md:text-4xl lg:text-5xl">
            {stepListHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            {stepListIntro}
          </p>
        </header>

        <div className="relative z-10 mt-12">
          {useStepList ? (
            renderStepList()
          ) : (
            <div className="relative">
              <span aria-hidden className="hidden lg:block absolute left-1/2 top-0 h-full w-12">
                <svg
                  viewBox="0 0 60 1000"
                  preserveAspectRatio="none"
                  className="h-full w-full text-border"
                >
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
                      <div className="lg:pr-8">{alignLeft ? <StepCard step={step} /> : null}</div>
                      <div className="relative flex justify-center">
                        <span className="mt-2 grid h-12 w-12 items-center justify-center rounded-full border border-border bg-muted text-sm font-semibold uppercase tracking-[0.16em] text-foreground/80">
                          {pad(index + 1)}
                        </span>
                      </div>
                      <div className="lg:pl-8">{!alignLeft ? <StepCard step={step} /> : null}</div>
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
