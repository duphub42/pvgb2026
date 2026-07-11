import Link from 'next/link'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react'

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
    lines: 'Philipp Bacher\nHalle/Saale & Remote',
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

  return (
    <section aria-label="Kontaktinformationen" className="mb-8 lg:mb-10">
      <div className="relative rounded-3xl bg-transparent px-0 py-0 md:px-2 md:py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {preparedCards.map((item) => {
            const Icon = ICON_MAP[item.iconKey]

            return (
              <div key={item.key} className="relative z-10">
                <Card variant="secondary" className="relative h-full min-h-[9.5rem]">
                  <Icon
                    className="pointer-events-none absolute -bottom-8 -right-7 size-36 text-foreground/[0.055] transition-transform duration-300 group-hover/card:translate-x-1 group-hover/card:translate-y-1 md:-bottom-11 md:-right-9 md:size-48"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <CardHeader className="relative z-10 pb-2">
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 space-y-1 text-sm text-muted-foreground">
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
