import type { Page } from '@/payload-types'

export type PageWithChildren = Page & { children?: PageWithChildren[] }

/**
 * Baut aus einer flachen Liste von Pages eine Baumstruktur (parent → children).
 * Für API, Navigation oder Admin.
 */
export function buildPagesTree(pages: Page[]): PageWithChildren[] {
  const map = new Map<number, PageWithChildren>()

  pages.forEach((p) => {
    map.set(p.id, { ...p, children: [] })
  })

  const tree: PageWithChildren[] = []

  pages.forEach((p) => {
    const node = map.get(p.id)
    if (!node) return

    const parentId =
      p.parent != null ? (typeof p.parent === 'object' && 'id' in p.parent ? p.parent.id : p.parent) : null

    if (parentId != null) {
      const parent = map.get(parentId as number)
      parent?.children?.push(node)
    } else {
      tree.push(node)
    }
  })

  return tree
}

/**
 * Erzeugt den vollständigen URL-Pfad einer Seite (z. B. "leistungen/webdesign").
 * Erwartet bei verschachtelten Seiten parent mit depth geladen (z. B. depth: 2).
 * Nutzbar für Preview-URLs oder wenn du verschachtelte Routen ([...slug]) einführst.
 */
export function getPagePath(page: Page): string {
  const segments: string[] = []

  function walk(p: Page): void {
    const parent = p.parent
    if (parent != null && typeof parent === 'object' && 'slug' in parent) {
      walk(parent as Page)
    }
    if (p.slug) segments.push(p.slug)
  }

  walk(page)
  return segments.filter(Boolean).join('/') || page.slug || ''
}

/**
 * Erstellt eine Map pageId → slug für alle Seiten (z. B. aus find-Ergebnis).
 */
export function buildSlugMap(pages: Page[]): Map<number, string> {
  const map = new Map<number, string>()
  pages.forEach((p) => {
    if (p.slug) map.set(p.id, p.slug)
  })
  return map
}
