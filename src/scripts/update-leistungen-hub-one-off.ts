import './load-env-import'
import path from 'node:path'
import Database from 'libsql'
import { randomUUID } from 'node:crypto'

type PageRow = {
  id: number
  slug: string
  title: string
}

type TableInfoRow = {
  name: string
}

const args = new Set(process.argv.slice(2))
const dryRun = !args.has('--apply')

const nowIso = new Date().toISOString()

const resolveDbPath = (): string => {
  const sqliteUrl = process.env.SQLITE_URL?.trim()
  if (sqliteUrl?.startsWith('file:')) {
    return path.resolve(process.cwd(), sqliteUrl.replace(/^file:/, ''))
  }

  if (sqliteUrl && sqliteUrl.length > 0) {
    return path.resolve(process.cwd(), sqliteUrl)
  }

  return path.resolve(process.cwd(), 'payload.db')
}

const makeId = () => randomUUID().replace(/-/g, '')

const dbPath = resolveDbPath()
const db = new Database(dbPath)

const page = db
  .prepare<[string, string]>(
    `
    SELECT id, slug, title
    FROM site_pages
    WHERE slug IN (?, ?)
    ORDER BY CASE slug WHEN 'leistungen' THEN 0 WHEN 'lei' THEN 1 ELSE 2 END, id
    LIMIT 1
    `,
  )
  .get('leistungen', 'lei') as PageRow | undefined

if (!page) {
  console.error('Leistungs-Hub nicht gefunden (erwartet slug "leistungen" oder "lei").')
  process.exit(1)
}

const servicesOverviewId = makeId()
const introductionId = makeId()
const servicesGridId = makeId()
const calPopupId = makeId()

const servicesOverviewItems = [
  {
    icon: 'compass',
    title: 'Strategie & Beratung',
    description:
      'Ziele, Positionierung und die richtige digitale Richtung, bevor Zeit und Budget in Einzelmaßnahmen fließen.',
  },
  {
    icon: 'code',
    title: 'Webdesign & Umsetzung',
    description:
      'Reduziertes, hochwertiges Design mit sauberer Technik, guter Performance und klarer Nutzerführung.',
  },
  {
    icon: 'megaphone',
    title: 'Marketing & Reichweite',
    description:
      'Maßnahmen für Sichtbarkeit, qualifizierte Anfragen und nachvollziehbare Ergebnisse.',
  },
  {
    icon: 'shield',
    title: 'Wartung & Entwicklung',
    description:
      'Kontinuierliche Pflege, Updates und Optimierungen für stabile Websites mit Entwicklungsspielraum.',
  },
]

const servicesGridCategories = [
  {
    label: 'Design & Website',
    services: [
      {
        title: 'Webdesign',
        description:
          'Moderne, minimalistische Webseiten mit klarer Struktur, schnellen Ladezeiten und hochwertiger Optik.',
        iconUrl: '/api/media/file/webdesign.svg',
        iconAlt: 'Webdesign Icon',
        linkSlug: 'leistungen/webdesign',
      },
      {
        title: 'Wartung & Support',
        description:
          'Laufende Pflege, Sicherheitsupdates und schnelle technische Reaktion für sorgenfreie Webauftritte.',
        iconUrl: '/api/media/file/marketing-leistungen.svg',
        iconAlt: 'Wartung Icon',
        linkSlug: 'leistungen/wartung',
      },
    ],
  },
  {
    label: 'Strategie & Wachstum',
    services: [
      {
        title: 'Marketing',
        description:
          'Strategisch gesteuerte Digital-Kampagnen mit Fokus auf Sichtbarkeit, Leads und messbare Effekte.',
        iconUrl: '/api/media/file/marketing-leistungen.svg',
        iconAlt: 'Marketing Icon',
        linkSlug: 'leistungen/marketing',
      },
    ],
  },
]

const allTables = (db
  .prepare(
    `
  SELECT name
  FROM sqlite_master
  WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
  `,
  )
  .all() ?? []) as TableInfoRow[]

const isTopLevelLayoutTable = (tableName: string): boolean => {
  if (tableName.startsWith('_')) return false
  const cols = (db.prepare(`PRAGMA table_info("${tableName}")`).all() ?? []) as Array<{
    name?: string
  }>
  const colNames = new Set(cols.map((c) => String(c.name ?? '')))
  return colNames.has('_parent_id') && colNames.has('_path') && colNames.has('id')
}

const isChildTable = (tableName: string): boolean => {
  if (tableName.startsWith('_')) return false
  const cols = (db.prepare(`PRAGMA table_info("${tableName}")`).all() ?? []) as Array<{
    name?: string
  }>
  const colNames = new Set(cols.map((c) => String(c.name ?? '')))
  return colNames.has('_parent_id') && !colNames.has('_path')
}

const topLevelLayoutTables = allTables
  .map((t) => t.name)
  .filter((name) => isTopLevelLayoutTable(name))
const childTables = allTables.map((t) => t.name).filter((name) => isChildTable(name))

const deleteExistingLayout = (pageId: number): string[] => {
  const oldBlockIds: string[] = []

  for (const tableName of topLevelLayoutTables) {
    const rows = db
      .prepare<[number]>(`SELECT id FROM "${tableName}" WHERE _parent_id = ? AND _path = 'layout'`)
      .all(pageId) as Array<{ id?: string | number }>

    rows.forEach((row) => {
      const value = String(row.id ?? '').trim()
      if (value) oldBlockIds.push(value)
    })

    db.prepare<[number]>(
      `DELETE FROM "${tableName}" WHERE _parent_id = ? AND _path = 'layout'`,
    ).run(pageId)
  }

  if (oldBlockIds.length > 0) {
    const placeholders = oldBlockIds.map(() => '?').join(', ')
    for (const tableName of childTables) {
      db.prepare(`DELETE FROM "${tableName}" WHERE _parent_id IN (${placeholders})`).run(
        ...oldBlockIds,
      )
    }
  }

  return oldBlockIds
}

const applyLayout = (pageId: number) => {
  db.prepare<[string, string, string, string, number]>(
    `
    UPDATE site_pages
    SET title = ?, meta_title = ?, meta_description = ?, updated_at = ?, _status = 'published'
    WHERE id = ?
    `,
  ).run(
    'Leistungen',
    'Leistungen | Webdesign, Marketing und Betreuung',
    'Klar strukturierte Leistungen für Webdesign, Marketing und laufende Website-Betreuung.',
    nowIso,
    pageId,
  )

  db.prepare<[number, number, string, string, string, string, string]>(
    `
    INSERT INTO site_pages_blocks_services_overview
      (_order, _parent_id, _path, id, heading, intro, block_name)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    1,
    pageId,
    'layout',
    servicesOverviewId,
    'Wobei ich Sie unterstütze',
    'Vier Bereiche, die einzeln buchbar sind und zusammen eine klare digitale Gesamtstrategie ergeben.',
    null as unknown as string,
  )

  servicesOverviewItems.forEach((item, index) => {
    db.prepare<[number, string, string, string, string, string]>(
      `
      INSERT INTO site_pages_blocks_services_overview_services
        (_order, _parent_id, id, icon, title, description)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
    ).run(index + 1, servicesOverviewId, makeId(), item.icon, item.title, item.description)
  })

  db.prepare<[number, number, string, string, string, string, string]>(
    `
    INSERT INTO site_pages_blocks_introduction
      (_order, _parent_id, _path, id, heading, body, tagline)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    2,
    pageId,
    'layout',
    introductionId,
    'Ein Hub für alle Leistungen',
    'Damit Sie schnell den passenden Bereich finden und direkt sehen, wie ich arbeite.',
    'Klar strukturiert. Direkt verständlich. Auf den Punkt.',
  )

  db.prepare<[number, number, string, string, string, string, string, number, string, string]>(
    `
    INSERT INTO services_grid
      (
        _order, _parent_id, _path, id,
        heading, intro, tagline,
        radial_background, radial_background_variant, radial_background_strength
      )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    3,
    pageId,
    'layout',
    servicesGridId,
    'Leistungsspektrum im Überblick',
    'Jeder Bereich ist einzeln buchbar und führt auf eine eigene Unterseite. Dort sehen Sie typische Leistungen, konkrete Schwerpunkte und den jeweiligen Nutzen auf einen Blick. So können Sie schnell einschätzen, welcher Bereich zu Ihrem Ziel passt und direkt den nächsten Schritt gehen.',
    '',
    1,
    'blue',
    'medium',
  )

  servicesGridCategories.forEach((category, categoryIndex) => {
    const categoryId = makeId()
    db.prepare<[number, string, string, string]>(
      `
      INSERT INTO services_grid_categories
        (_order, _parent_id, id, category_label)
      VALUES (?, ?, ?, ?)
      `,
    ).run(categoryIndex + 1, servicesGridId, categoryId, category.label)

    category.services.forEach((service, serviceIndex) => {
      db.prepare<[number, string, string, string, string, string, string, string, number]>(
        `
        INSERT INTO services_grid_categories_services
          (_order, _parent_id, id, icon_url, icon_alt, title, description, link_slug, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      ).run(
        serviceIndex + 1,
        categoryId,
        makeId(),
        service.iconUrl,
        service.iconAlt,
        service.title,
        service.description,
        service.linkSlug,
        0,
      )
    })
  })

  db.prepare<[number, number, string, string, string, string, string, string]>(
    `
    INSERT INTO site_pages_blocks_cal_popup
      (_order, _parent_id, _path, id, headline, description, cal_link, button_label)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    4,
    pageId,
    'layout',
    calPopupId,
    'Finden Sie das passende Vorgehen für Ihr Projekt',
    'In einem kurzen Gespräch klären Sie gemeinsam mit mir, welcher Leistungsbereich für Sie am sinnvollsten ist und wie der nächste Schritt aussieht.',
    'philippbacher/30min',
    'Termin buchen',
  )
}

const runner = db.transaction((pageId: number) => {
  const oldBlockIds = deleteExistingLayout(pageId)
  applyLayout(pageId)
  return oldBlockIds.length
})

if (dryRun) {
  console.log(`[dry-run] DB: ${dbPath}`)
  console.log(
    `[dry-run] page: id=${page.id}, slug=${page.slug}, title=${page.title}, will_apply_layout_blocks=5`,
  )
  db.close()
  process.exit(0)
}

const removedBlocks = runner(page.id)
db.close()

console.log(
  `Leistungs-Hub aktualisiert (page id=${page.id}, slug=${page.slug}). Entfernte Alt-Block-IDs: ${removedBlocks}.`,
)
