export const WEBMCP_OPEN_SITE_SEARCH_EVENT = 'webmcp:open-site-search'
export const WEBMCP_APPLY_PRICE_CALCULATOR_EVENT = 'webmcp:apply-price-calculator'

export type OpenSiteSearchDetail = {
  query?: string
  navigate?: boolean
}

export type ApplyPriceCalculatorDetail = {
  itemIds: Array<string | number>
}

export function openSiteSearch(detail: OpenSiteSearchDetail = {}): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(WEBMCP_OPEN_SITE_SEARCH_EVENT, { detail }))
}

export function applyPriceCalculatorSelection(itemIds: Array<string | number>): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(WEBMCP_APPLY_PRICE_CALCULATOR_EVENT, {
      detail: { itemIds } satisfies ApplyPriceCalculatorDetail,
    }),
  )
}
