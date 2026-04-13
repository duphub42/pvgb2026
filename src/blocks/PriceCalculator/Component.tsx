import type {
  PriceCalcItem,
  PriceCalculator,
  PriceCalculatorBlock as PriceCalculatorBlockFields,
} from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import {
  PriceCalculatorClient,
  type PriceCalcCategoryClient,
  type PriceCalcItemClient,
  type PriceCalculatorCopy,
} from './PriceCalculatorClient'

const DEFAULT_COPY: PriceCalculatorCopy = {
  sectionLabel: 'Preisrechner',
  heading: 'Was planen Sie?',
  sub: 'Kategorie wählen, Leistungen anklicken – Richtwert erscheint sofort. Mehrere Kategorien kombinierbar.',
  offerButtonLabel: 'Angebot anfragen ↗',
  offerLink: '/kontakt',
  emptyBreakdownMessage: 'Wählen Sie oben eine Kategorie und Leistungen aus.',
  ratesSectionLabel: 'Stundensatz & Tagessatz',
  ratesHeading: 'Für flexible & laufende Zusammenarbeit',
  hourlyRate: 120,
  dayRate: 890,
  weekRate: 3200,
  ratesNote:
    'Stundensätze gelten für Beratung, Ad-hoc-Aufgaben und Projekte ohne definierten Scope. Bei Projekten mit klarem Umfang arbeite ich grundsätzlich auf Festpreisbasis – transparenter für Sie, planbarer für beide Seiten.',
}

function mergeCopy(
  globalDoc: PriceCalculator | null | undefined,
  block: PriceCalculatorBlockFields,
): PriceCalculatorCopy {
  const g = globalDoc
  const str = (v: unknown, fallback: string) =>
    typeof v === 'string' && v.trim() !== '' ? v.trim() : fallback
  const num = (v: unknown, fallback: number) =>
    typeof v === 'number' && !Number.isNaN(v) ? v : fallback

  return {
    sectionLabel: str(block.sectionLabel, str(g?.sectionLabel, DEFAULT_COPY.sectionLabel)),
    heading: str(block.heading, str(g?.heading, DEFAULT_COPY.heading)),
    sub: str(block.sub, str(g?.sub, DEFAULT_COPY.sub)),
    offerButtonLabel: str(g?.offerButtonLabel, DEFAULT_COPY.offerButtonLabel),
    offerLink: str(g?.offerLink, DEFAULT_COPY.offerLink),
    emptyBreakdownMessage: str(g?.emptyBreakdownMessage, DEFAULT_COPY.emptyBreakdownMessage),
    ratesSectionLabel: str(g?.ratesSectionLabel, DEFAULT_COPY.ratesSectionLabel),
    ratesHeading: str(g?.ratesHeading, DEFAULT_COPY.ratesHeading),
    hourlyRate: num(g?.hourlyRate, DEFAULT_COPY.hourlyRate),
    dayRate: num(g?.dayRate, DEFAULT_COPY.dayRate),
    weekRate: num(g?.weekRate, DEFAULT_COPY.weekRate),
    ratesNote: str(g?.ratesNote, DEFAULT_COPY.ratesNote),
  }
}

function mapItem(doc: PriceCalcItem): PriceCalcItemClient {
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    sortOrder: doc.sortOrder ?? 0,
    pricingType: doc.pricingType,
    onceMin: doc.onceMin ?? null,
    onceMax: doc.onceMax ?? null,
    monthlyMin: doc.monthlyMin ?? null,
    monthlyMax: doc.monthlyMax ?? null,
  }
}

export async function PriceCalculatorBlockComponent(
  props: PriceCalculatorBlockFields & { disableInnerContainer?: boolean },
) {
  const { showRatesSection = true, disableInnerContainer } = props

  const payload = await getPayload({ config: configPromise })

  const [categoriesRes, itemsRes, globalDoc] = await Promise.all([
    payload.find({
      collection: 'price-calc-categories',
      limit: 500,
      sort: 'sortOrder',
      depth: 0,
    }),
    payload.find({
      collection: 'price-calc-items',
      limit: 5000,
      sort: 'sortOrder',
      depth: 1,
    }),
    payload.findGlobal({ slug: 'price-calculator', depth: 0 }),
  ])

  const categoryById = new Map<number | string, PriceCalcCategoryClient>()

  for (const c of categoriesRes.docs) {
    categoryById.set(c.id, {
      id: c.id,
      title: c.title,
      sortOrder: typeof c.sortOrder === 'number' ? c.sortOrder : 0,
      items: [],
    })
  }

  for (const raw of itemsRes.docs) {
    const cat = raw.category
    const catId =
      cat && typeof cat === 'object' && 'id' in cat ? (cat as { id: number | string }).id : cat
    if (catId == null) continue
    const bucket = categoryById.get(catId as number | string)
    if (!bucket) continue
    bucket.items.push(mapItem(raw))
  }

  const categories: PriceCalcCategoryClient[] = [...categoryById.values()].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title),
  )

  const copy = mergeCopy(globalDoc ?? undefined, props)

  return (
    <section className={cnSection(disableInnerContainer)}>
      <PriceCalculatorClient
        categories={categories}
        copy={copy}
        showRatesSection={Boolean(showRatesSection)}
      />
    </section>
  )
}

function cnSection(disableInner?: boolean): string {
  if (disableInner) return 'container w-full min-w-0 py-4'
  return 'container w-full min-w-0 py-4'
}
