import { getClientSideURL } from '@/utilities/getURL'
import { applyPriceCalculatorSelection } from '@/utilities/webmcp/events'

export type PriceCalcItemSnapshot = {
  id: string
  title: string
  description: string
  categoryTitle: string
  pricingType: 'once' | 'monthly' | 'both'
  onceMin: number | null
  onceMax: number | null
  monthlyMin: number | null
  monthlyMax: number | null
}

export type PriceCalculationBreakdownRow = {
  id: string
  title: string
  price: string
}

export type PriceCalculationResult = {
  ok: boolean
  message?: string
  matchedItemIds?: string[]
  unmatchedItems?: string[]
  totalOnceMin?: number
  totalOnceMax?: number
  totalMonthMin?: number
  totalMonthMax?: number
  breakdown?: PriceCalculationBreakdownRow[]
  catalog?: Array<{
    category: string
    items: Array<{
      id: string
      title: string
      once: string | null
      monthly: string | null
    }>
  }>
  calculatorPageUrl?: string
}

type PayloadListResponse<T> = {
  docs?: T[]
}

type CategoryDoc = {
  id: number | string
  title: string
  sortOrder?: number | null
}

type ItemDoc = {
  id: number | string
  title: string
  description?: string | null
  sortOrder?: number | null
  pricingType?: 'once' | 'monthly' | 'both'
  onceMin?: number | null
  onceMax?: number | null
  monthlyMin?: number | null
  monthlyMax?: number | null
  category?: number | string | { id?: number | string; title?: string | null } | null
}

function fmtEuro(value: number): string {
  return value.toLocaleString('de-DE')
}

function formatOnceRange(min: number | null, max: number | null): string | null {
  if (min == null || max == null) return null
  return `${fmtEuro(min)}–${fmtEuro(max)} €`
}

function formatMonthlyRange(min: number | null, max: number | null): string | null {
  if (min == null || max == null) return null
  return `${fmtEuro(min)}–${fmtEuro(max)} €/Monat`
}

function formatBreakdownPrice(item: PriceCalcItemSnapshot): string {
  const parts: string[] = []
  const once = formatOnceRange(item.onceMin, item.onceMax)
  const monthly = formatMonthlyRange(item.monthlyMin, item.monthlyMax)
  if (once) parts.push(once)
  if (monthly) parts.push(`${monthly.replace('Monat', 'Mo.')}`)
  return parts.join(' / ')
}

async function fetchPriceCalculatorCatalog(): Promise<PriceCalcItemSnapshot[]> {
  const baseUrl = getClientSideURL()
  const [categoriesRes, itemsRes] = await Promise.all([
    fetch(`${baseUrl}/api/price-calc-categories?limit=500&sort=sortOrder&depth=0`),
    fetch(`${baseUrl}/api/price-calc-items?limit=5000&sort=sortOrder&depth=1`),
  ])

  if (!categoriesRes.ok || !itemsRes.ok) {
    return []
  }

  const categoriesJson = (await categoriesRes.json()) as PayloadListResponse<CategoryDoc>
  const itemsJson = (await itemsRes.json()) as PayloadListResponse<ItemDoc>

  const categories = new Map<string, string>()
  for (const category of categoriesJson.docs ?? []) {
    categories.set(String(category.id), category.title)
  }

  return (itemsJson.docs ?? []).map((item) => {
    const categoryRef = item.category
    const categoryId =
      categoryRef && typeof categoryRef === 'object' && 'id' in categoryRef
        ? String(categoryRef.id)
        : categoryRef != null
          ? String(categoryRef)
          : ''

    const categoryTitle =
      categoryRef && typeof categoryRef === 'object' && 'title' in categoryRef && categoryRef.title
        ? String(categoryRef.title)
        : categories.get(categoryId) ?? 'Sonstiges'

    return {
      id: String(item.id),
      title: item.title,
      description: item.description?.trim() ?? '',
      categoryTitle,
      pricingType: item.pricingType ?? 'once',
      onceMin: item.onceMin ?? null,
      onceMax: item.onceMax ?? null,
      monthlyMin: item.monthlyMin ?? null,
      monthlyMax: item.monthlyMax ?? null,
    }
  })
}

function buildCatalogResponse(items: PriceCalcItemSnapshot[]) {
  const grouped = new Map<string, Array<{ id: string; title: string; once: string | null; monthly: string | null }>>()

  for (const item of items) {
    const bucket = grouped.get(item.categoryTitle) ?? []
    bucket.push({
      id: item.id,
      title: item.title,
      once: formatOnceRange(item.onceMin, item.onceMax),
      monthly: formatMonthlyRange(item.monthlyMin, item.monthlyMax),
    })
    grouped.set(item.categoryTitle, bucket)
  }

  return [...grouped.entries()].map(([category, categoryItems]) => ({
    category,
    items: categoryItems.sort((a, b) => a.title.localeCompare(b.title, 'de-DE')),
  }))
}

function resolveRequestedItems(
  catalog: PriceCalcItemSnapshot[],
  requestedItems: string[],
): { matched: PriceCalcItemSnapshot[]; unmatched: string[] } {
  const matched: PriceCalcItemSnapshot[] = []
  const unmatched: string[] = []

  for (const rawRequest of requestedItems) {
    const request = rawRequest.trim()
    if (!request) continue

    const byId = catalog.find((item) => item.id === request)
    if (byId) {
      matched.push(byId)
      continue
    }

    const normalized = request.toLocaleLowerCase('de-DE')
    const byExactTitle = catalog.filter(
      (item) => item.title.toLocaleLowerCase('de-DE') === normalized,
    )
    if (byExactTitle.length === 1) {
      matched.push(byExactTitle[0])
      continue
    }

    const byPartialTitle = catalog.filter((item) =>
      item.title.toLocaleLowerCase('de-DE').includes(normalized),
    )
    if (byPartialTitle.length === 1) {
      matched.push(byPartialTitle[0])
      continue
    }

    unmatched.push(request)
  }

  const uniqueMatched = [...new Map(matched.map((item) => [item.id, item])).values()]
  return { matched: uniqueMatched, unmatched }
}

function calculateTotals(items: PriceCalcItemSnapshot[]): Omit<
  PriceCalculationResult,
  'ok' | 'message' | 'matchedItemIds' | 'unmatchedItems' | 'catalog' | 'calculatorPageUrl'
> {
  let totalOnceMin = 0
  let totalOnceMax = 0
  let totalMonthMin = 0
  let totalMonthMax = 0
  const breakdown: PriceCalculationBreakdownRow[] = []

  for (const item of items) {
    if (item.onceMin != null && item.onceMax != null) {
      totalOnceMin += item.onceMin
      totalOnceMax += item.onceMax
    }
    if (item.monthlyMin != null && item.monthlyMax != null) {
      totalMonthMin += item.monthlyMin
      totalMonthMax += item.monthlyMax
    }

    breakdown.push({
      id: item.id,
      title: item.title,
      price: formatBreakdownPrice(item),
    })
  }

  return {
    totalOnceMin,
    totalOnceMax,
    totalMonthMin,
    totalMonthMax,
    breakdown,
  }
}

function normalizeRequestedItems(input: Record<string, unknown>): string[] {
  const fromItems = Array.isArray(input.items)
    ? input.items.filter((value): value is string => typeof value === 'string')
    : []

  const fromTitles = Array.isArray(input.itemTitles)
    ? input.itemTitles.filter((value): value is string => typeof value === 'string')
    : []

  return [...fromItems, ...fromTitles]
}

export async function runPriceCalculatorTool(
  input: Record<string, unknown>,
): Promise<PriceCalculationResult> {
  const catalog = await fetchPriceCalculatorCatalog()
  const calculatorPageUrl = '/preise'
  const applyToUi = input.applyToUi === true

  if (catalog.length === 0) {
    return {
      ok: false,
      message: 'Price calculator catalog is unavailable.',
      calculatorPageUrl,
    }
  }

  const requestedItems = normalizeRequestedItems(input)

  if (requestedItems.length === 0) {
    return {
      ok: true,
      message: 'Catalog returned. Pass item IDs or titles in items/itemTitles to calculate a quote.',
      catalog: buildCatalogResponse(catalog),
      calculatorPageUrl,
    }
  }

  const { matched, unmatched } = resolveRequestedItems(catalog, requestedItems)

  if (matched.length === 0) {
    return {
      ok: false,
      message: 'No matching calculator items found.',
      unmatchedItems: unmatched,
      catalog: buildCatalogResponse(catalog),
      calculatorPageUrl,
    }
  }

  const totals = calculateTotals(matched)

  if (applyToUi) {
    applyPriceCalculatorSelection(matched.map((item) => item.id))
  }

  return {
    ok: true,
    matchedItemIds: matched.map((item) => item.id),
    unmatchedItems: unmatched.length > 0 ? unmatched : undefined,
    calculatorPageUrl,
    ...totals,
  }
}

export async function executePriceCalculatorTool(input: Record<string, unknown>): Promise<string> {
  const result = await runPriceCalculatorTool(input)
  return JSON.stringify(result)
}
