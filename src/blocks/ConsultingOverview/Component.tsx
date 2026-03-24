import React from 'react'

import { cn } from '@/utilities/ui'

type ThemeColors = {
  gradientLavender?: string | null
  gradientLime?: string | null
  introBlob?: string | null
  strategyBadge?: string | null
  benefitsBadge?: string | null
  experienceBadge?: string | null
  timelineStroke?: string | null
  divider?: string | null
  headline?: string | null
  body?: string | null
  muted?: string | null
}

function radialBlob(centerColor: string) {
  return `radial-gradient(ellipse 74.47% 74.36% at 50% 50%, ${centerColor} 0%, rgba(255, 255, 255, 0) 100%)`
}

function SmileyIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1.5" />
      <circle cx="9.5" cy="11" r="1" fill="white" />
      <circle cx="16.5" cy="11" r="1" fill="white" />
      <path
        d="M8.5 16.5C9.6 18 11.2 18.8 13 18.8C14.8 18.8 16.4 18 17.5 16.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function LabelBadge({
  dotColor,
  title,
  subtitle,
  variant,
  titleWeight = 'normal',
  titleColor,
  titleSize = 'md',
  colors,
}: {
  dotColor: string
  title: string
  subtitle: string
  variant: 'pill' | 'circle'
  titleWeight?: 'normal' | 'medium'
  titleColor?: string
  /** md = 16px (Figma Strategie/Vorteile), lg = 17px (Figma Erfahrung) */
  titleSize?: 'md' | 'lg'
  colors: { body: string; muted: string }
}) {
  const isPill = variant === 'pill'
  const resolvedTitleColor = titleColor ?? colors.body
  return (
    <div className="flex items-start gap-4">
      <div
        className={cn(
          'relative grid shrink-0 place-items-center rounded-full',
          isPill ? 'h-[58px] w-[70px]' : 'h-[58px] w-[58px]',
        )}
        style={{ backgroundColor: dotColor }}
      >
        <span className={cn(isPill ? 'translate-x-0.5 translate-y-0.5' : '')}>
          <SmileyIcon />
        </span>
      </div>
      <div className="min-w-0 pt-0.5">
        <p
          className={cn(
            titleSize === 'lg' ? 'text-[17px] leading-[1.75]' : 'text-[16px] leading-[1.7]',
            titleWeight === 'medium' && 'font-medium',
          )}
          style={{ color: resolvedTitleColor }}
        >
          {title}
        </p>
        <p className="text-[14px] leading-[1.75]" style={{ color: colors.muted }}>
          {subtitle}
        </p>
      </div>
    </div>
  )
}

type ConsultingOverviewBlockProps = any

export const ConsultingOverviewBlock: React.FC<ConsultingOverviewBlockProps> = (props) => {
  const {
    disableInnerContainer,
    pixelLayoutDesktop = true,
    colors: colorsProp,
    headline = 'Ihr persönlicher Ansprechpartner für Digital Consulting, Marketing & Webdesign',
    introText = 'Ich realisiere moderne, nutzerzentrierte Websites, konsistente Markenauftritte und unterstütze Unternehmen dabei, Ihre Prozesse digital zu automatisieren - effizient, fundiert und ergebnisorientiert.',
    strategyLabel = 'Digital Consulting, Marketing & Webdesign',
    strategySubLabel = 'für Unternehmen und Organisationen',
    strategyTitle = 'Ich begleite Unternehmen bei der Entwicklung klarer digitaler Strategien',
    strategyText = 'Von Positionierung und Marketing bis zur technischen Umsetzung moderner Weblösungen. Der Fokus liegt auf messbaren Ergebnissen: strukturierte Prozesse, performante Kampagnen und Websites, die nicht nur gut aussehen, sondern verkaufen. Persönlich. Effizient. Mit Blick auf langfristiges Wachstum. Als Freelancer in Halle (Saale) stehe ich für direkte Zusammenarbeit und transparente Umsetzung.',
    benefitsLabel = 'Darum arbeiten andere Macher mit mir',
    benefitsSubLabel = 'Schnelle, effiziente Umsetzung',
    benefitsTitle = 'Vorteile in der Übersicht',
    benefitItems = [],
    experienceLabel = 'Wissen was funktioniert',
    experienceSubLabel = 'Profitieren Sie von meinen Erfahrungen',
    experienceTitle = 'Seit über 20 Jahren Erfahrung im digitalen Marketing & Vertrieb',
  } = props

  const c: ThemeColors = colorsProp ?? {}
  const gradientLavender = c.gradientLavender?.trim() || '#DED9FF'
  const gradientLime = c.gradientLime?.trim() || '#F3FFD9'
  const introBlobColor = c.introBlob?.trim() || gradientLavender
  const strategyBadge = c.strategyBadge?.trim() || '#08D3BB'
  const benefitsBadge = c.benefitsBadge?.trim() || '#1090CB'
  const experienceBadge = c.experienceBadge?.trim() || '#9208D3'
  const timelineStroke = c.timelineStroke?.trim() || '#999999'
  const divider = c.divider?.trim() || '#C7C7C7'
  const headlineColor = c.headline?.trim() || '#252525'
  const bodyColor = c.body?.trim() || '#545454'
  const mutedColor = c.muted?.trim() || '#868686'
  const textColors = { body: bodyColor, muted: mutedColor }

  const usePixel = pixelLayoutDesktop !== false

  return (
    <section className={cn('relative overflow-hidden', !disableInnerContainer && 'container')}>
      {/* Mobile / Tablet: weiche Blobs */}
      <div
        className="pointer-events-none absolute -right-20 top-48 h-[420px] w-[420px] rounded-full xl:hidden"
        style={{ background: radialBlob(gradientLavender) }}
      />
      <div
        className="pointer-events-none absolute -left-20 top-[42rem] h-[420px] w-[420px] rounded-full xl:hidden"
        style={{ background: radialBlob(gradientLime) }}
      />

      <div
        className={cn(
          'relative mx-auto py-8 md:py-12',
          usePixel ? 'max-w-[1440px] px-6 xl:px-[72px] 2xl:px-[88px]' : 'max-w-[1280px] px-6',
        )}
      >
        {/* Intro-Blob (Figma: Ellipse über dem Intro) — nur Desktop-Pixel-Layout */}
        {usePixel && (
          <div
            className="pointer-events-none absolute left-1/2 top-8 hidden -translate-x-1/2 xl:block"
            style={{
              width: 497,
              height: 505,
              borderRadius: 9999,
              background: radialBlob(introBlobColor),
            }}
            aria-hidden
          />
        )}

        {/* Gestrichelter Pfad — Figma Vector 4 */}
        <svg
          className={cn(
            'pointer-events-none absolute opacity-[0.65]',
            usePixel
              ? 'right-0 top-0 hidden h-[min(1310px,92vh)] w-[min(821px,42vw)] xl:block'
              : 'right-0 top-0 hidden h-[680px] w-[430px] opacity-60 lg:block',
          )}
          viewBox="0 0 821 1310"
          fill="none"
          aria-hidden
        >
          <path
            d="M100.749 0.293457C79.3689 29.7935 22.115 100.793 8.61504 140.793C-7.92665 189.806 1.40824 315.42 31.2632 382.293C110.172 559.045 372.377 461.293 520.581 483.793C624.518 499.573 693.701 522.156 755.279 599.293C822.335 683.293 834.903 779.96 804.357 882.793C764.997 1015.29 663.927 1073.79 545.363 1149.29C420.062 1229.08 100.263 1308.79 100.263 1308.79"
            stroke={timelineStroke}
            strokeDasharray="7 7"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-[847px] text-center">
          <h2
            className="text-balance text-[30px] font-semibold leading-[1.6] xl:text-[33px] xl:leading-[1.6]"
            style={{ color: headlineColor }}
          >
            {headline}
          </h2>
          <p
            className="mx-auto mt-8 max-w-[692px] text-balance text-[18px] leading-[1.75] xl:mt-[76px] xl:leading-[1.75]"
            style={{ color: mutedColor }}
          >
            {introText}
          </p>
        </div>

        <hr
          className="relative z-10 my-12 border-t xl:my-[48px]"
          style={{ borderColor: divider }}
        />

        {/* Zwei-Spalten: Figma ~505px Zeilenhöhe, Blobs in Spalten */}
        <div
          className={cn(
            'relative z-10 grid gap-14',
            usePixel ? 'xl:grid-cols-2 xl:gap-x-12 xl:gap-y-0' : 'lg:grid-cols-2',
          )}
        >
          {/* Strategie — linke Spalte */}
          <div
            className={cn(
              'relative',
              usePixel && 'xl:min-h-[505px] xl:overflow-visible',
            )}
          >
            {usePixel && (
              <div
                className="pointer-events-none absolute right-0 top-0 hidden translate-x-[8%] xl:block"
                style={{
                  width: 497,
                  height: 505,
                  borderRadius: 9999,
                  background: radialBlob(gradientLavender),
                }}
                aria-hidden
              />
            )}
            <div className={cn('relative space-y-6', usePixel && 'xl:max-w-[568px] xl:pt-2')}>
              <LabelBadge
                variant="pill"
                dotColor={strategyBadge}
                title={strategyLabel}
                subtitle={strategySubLabel}
                colors={textColors}
              />
              <h3
                className="max-w-[616px] text-[30px] font-normal leading-[51px]"
                style={{ color: headlineColor }}
              >
                {strategyTitle}
              </h3>
              <p
                className="max-w-[568px] whitespace-pre-line text-[16px] leading-[27.2px]"
                style={{ color: bodyColor }}
              >
                {strategyText}
              </p>
            </div>
          </div>

          {/* Vorteile — rechte Spalte */}
          <div
            className={cn(
              'relative',
              usePixel && 'xl:min-h-[505px] xl:overflow-visible',
            )}
          >
            {usePixel && (
              <div
                className="pointer-events-none absolute left-0 top-0 hidden -translate-x-[12%] xl:block"
                style={{
                  width: 497,
                  height: 505,
                  borderRadius: 9999,
                  background: radialBlob(gradientLime),
                }}
                aria-hidden
              />
            )}
            <div
              className={cn(
                'relative space-y-8',
                usePixel && 'xl:ml-auto xl:max-w-[560px] xl:pl-2 xl:pt-10',
              )}
            >
              <LabelBadge
                variant="circle"
                dotColor={benefitsBadge}
                title={benefitsLabel}
                subtitle={benefitsSubLabel}
                colors={textColors}
              />
              <h3
                className="max-w-[516px] text-[30px] font-normal leading-[51px]"
                style={{ color: headlineColor }}
              >
                {benefitsTitle}
              </h3>
              <div className="space-y-6">
                {(benefitItems || []).map((item: { title?: string; text?: string }, index: number) => (
                  <p
                    key={index}
                    className="max-w-[476px] text-[16px] leading-[27.2px]"
                    style={{ color: bodyColor }}
                  >
                    <span className="font-bold">{item.title} </span>
                    <span>{item.text}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Erfahrung — Figma Group 32 */}
        <div
          className={cn(
            'relative z-10 mt-16 max-w-[516px] space-y-6',
            usePixel && 'xl:mt-[72px]',
          )}
        >
          <LabelBadge
            variant="circle"
            dotColor={experienceBadge}
            title={experienceLabel}
            subtitle={experienceSubLabel}
            titleWeight="medium"
            titleColor={headlineColor}
            titleSize="lg"
            colors={textColors}
          />
          <h3
            className="text-[30px] font-normal leading-[51px]"
            style={{ color: headlineColor }}
          >
            {experienceTitle}
          </h3>
        </div>
      </div>
    </section>
  )
}
