import React from 'react'

import { cn } from '@/utilities/ui'

function SmileyIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1.5" />
      <circle cx="9.5" cy="11" r="1" fill="white" />
      <circle cx="16.5" cy="11" r="1" fill="white" />
      <path d="M8.5 16.5C9.6 18 11.2 18.8 13 18.8C14.8 18.8 16.4 18 17.5 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function LabelBadge({
  dotColor,
  title,
  subtitle,
}: {
  dotColor: string
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="relative grid h-14 w-14 place-items-center rounded-full"
        style={{ backgroundColor: dotColor }}
      >
        <SmileyIcon />
      </div>
      <div>
        <p className="text-[16px] leading-[1.7] text-[#545454]">{title}</p>
        <p className="text-[14px] leading-[1.7] text-[#868686]">{subtitle}</p>
      </div>
    </div>
  )
}

type ConsultingOverviewBlockProps = any

export const ConsultingOverviewBlock: React.FC<ConsultingOverviewBlockProps> = (props) => {
  const {
    disableInnerContainer,
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

  return (
    <section className={cn('relative overflow-hidden', !disableInnerContainer && 'container')}>
      <div className="pointer-events-none absolute -right-20 top-48 h-[420px] w-[420px] rounded-full bg-[radial-gradient(ellipse_74.47%_74.36%_at_50%_50%,#DED9FF_0%,rgba(255,255,255,0)_100%)]" />
      <div className="pointer-events-none absolute -left-20 top-[42rem] h-[420px] w-[420px] rounded-full bg-[radial-gradient(ellipse_74.47%_74.36%_at_50%_50%,#F3FFD9_0%,rgba(255,255,255,0)_100%)]" />

      <div className="mx-auto max-w-[1280px] px-6 py-8 md:py-12">
        <svg
          className="pointer-events-none absolute right-0 top-0 hidden h-[680px] w-[430px] opacity-60 lg:block"
          viewBox="0 0 821 1310"
          fill="none"
          aria-hidden
        >
          <path
            d="M100.749 0.293457C79.3689 29.7935 22.115 100.793 8.61504 140.793C-7.92665 189.806 1.40824 315.42 31.2632 382.293C110.172 559.045 372.377 461.293 520.581 483.793C624.518 499.573 693.701 522.156 755.279 599.293C822.335 683.293 834.903 779.96 804.357 882.793C764.997 1015.29 663.927 1073.79 545.363 1149.29C420.062 1229.08 100.263 1308.79 100.263 1308.79"
            stroke="#999999"
            strokeDasharray="7 7"
          />
        </svg>

        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="text-balance text-[30px] font-semibold leading-[1.6] text-[#252525] md:text-[33px]">
            {headline}
          </h2>
          <p className="mx-auto mt-8 max-w-[760px] text-balance text-[18px] leading-[1.8] text-[#868686]">
            {introText}
          </p>
        </div>

        <hr className="my-12 border-[#C7C7C7]" />

        <div className="grid gap-14 lg:grid-cols-2">
          <div className="space-y-6">
            <LabelBadge
              dotColor="#08D3BB"
              title={strategyLabel}
              subtitle={strategySubLabel}
            />
            <h3 className="max-w-[640px] text-[30px] font-normal leading-[1.6] text-[#252525]">
              {strategyTitle}
            </h3>
            <p className="max-w-[680px] whitespace-pre-line text-[16px] leading-[1.7] text-[#545454]">
              {strategyText}
            </p>
          </div>

          <div className="space-y-8">
            <LabelBadge
              dotColor="#1090CB"
              title={benefitsLabel}
              subtitle={benefitsSubLabel}
            />
            <h3 className="text-[30px] font-normal leading-[1.6] text-[#252525]">{benefitsTitle}</h3>

            <div className="space-y-6">
              {(benefitItems || []).map((item: { title?: string; text?: string }, index: number) => (
                <p key={index} className="max-w-[560px] text-[16px] leading-[1.7] text-[#545454]">
                  <span className="font-bold">{item.title} </span>
                  <span>{item.text}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-[700px] space-y-6">
          <LabelBadge
            dotColor="#9208D3"
            title={experienceLabel}
            subtitle={experienceSubLabel}
          />
          <h3 className="text-[30px] font-normal leading-[1.6] text-[#252525]">{experienceTitle}</h3>
        </div>
      </div>
    </section>
  )
}
