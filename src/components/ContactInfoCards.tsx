import Link from 'next/link'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type ContactInfoCardIcon = 'map-pin' | 'phone' | 'clock-3' | 'mail'

export type ContactInfoCardItem = {
  id?: string | null
  title?: string | null
  icon?: ContactInfoCardIcon | null
  lines?: string | null
}

type ContactInfoCardsProps = {
  cards?: ContactInfoCardItem[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

const ICON_MAP = {
  'map-pin': MapPin,
  phone: Phone,
  'clock-3': Clock3,
  mail: Mail,
} as const

const DEFAULT_CONTACT_CARDS: ContactInfoCardItem[] = [
  {
    title: 'Adresse',
    icon: 'map-pin',
    lines: 'Philipp Bacher\nMünchen & Remote',
  },
  {
    title: 'Kontaktdaten',
    icon: 'phone',
    lines: 'Telefon: +49 3459 6393323\nE-Mail: mail@philippbacher.com',
  },
  {
    title: 'Office Hours',
    icon: 'clock-3',
    lines: 'Mo-Fr: 09:00-18:00 Uhr\nSowie nach Terminvereinbarung',
  },
] as const

function normalizeLines(value?: string | null): string[] {
  if (typeof value !== 'string') return []
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export function ContactInfoCards({ cards, ctaLabel, ctaHref }: ContactInfoCardsProps) {
  const sourceCards = !Array.isArray(cards) || cards.length === 0 ? DEFAULT_CONTACT_CARDS : cards

  const preparedCards = sourceCards
    .map((item) => {
      const title = String(item?.title ?? '').trim()
      const iconKey =
        typeof item?.icon === 'string' && item.icon in ICON_MAP ? item.icon : 'map-pin'
      const lines = normalizeLines(item?.lines)

      if (!title || lines.length === 0) return null

      return {
        key: item?.id || `${title}-${lines.join('-').slice(0, 24)}`,
        title,
        iconKey,
        lines,
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  if (preparedCards.length === 0) return null

  const buttonLabel = String(ctaLabel ?? 'Termin anfragen').trim() || 'Termin anfragen'
  const buttonHref = String(ctaHref ?? '#kontaktformular').trim() || '#kontaktformular'

  const positionClasses = [
    'md:-translate-y-6 md:-translate-x-4',
    'md:translate-y-6',
    'md:-translate-y-6 md:translate-x-4',
  ]

  return (
    <section aria-label="Kontaktinformationen" className="mb-8 lg:mb-10">
      <div className="relative overflow-visible rounded-3xl bg-transparent px-0 py-0 md:px-2 md:py-8">
        {/* Dekorative Kurvenlinie als Verbinder */}
        <svg
          className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 hidden md:block w-full h-32"
          viewBox="0 0 100 42"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 10 34 Q 25 10 50 18 Q 75 26 90 34"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="text-border/60"
          />
        </svg>

        <div className="grid gap-4 md:grid-cols-3">
          {preparedCards.map((item, index) => {
            const positionClass = positionClasses[index % positionClasses.length]
            return (
              <div
                key={item.key}
                className={cn(
                  'relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  positionClass,
                )}
              >
                <Card variant="secondary" className="h-full">
                  <CardHeader className="pb-2">
                    {/* Kein Icon, keine Farbe */}
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-muted-foreground">
                    {item.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-start">
        <Button asChild variant="outline">
          <Link href={buttonHref}>
            <Mail className="mr-2 h-4 w-4" aria-hidden />
            {buttonLabel}
          </Link>
        </Button>
      </div>
    </section>
  )
}
