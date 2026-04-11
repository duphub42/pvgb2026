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
const processFlowId = makeId()
const servicesGridId = makeId()
const whyWorkWithMeId = makeId()
const calPopupId = makeId()

const servicesOverviewItems = [
  {
    icon: 'compass',
    title: 'Strategie & Beratung',
    description:
      'Positionierung, Zielbild und Prioritäten, damit jede Maßnahme auf ein klares Ergebnis einzahlt.',
  },
  {
    icon: 'code',
    title: 'Webdesign & Umsetzung',
    description:
      'Reduziertes, hochwertiges Design plus technische Umsetzung für schnelle, stabile und wartbare Systeme.',
  },
  {
    icon: 'megaphone',
    title: 'Marketing & Reichweite',
    description:
      'Gezielte Maßnahmen für Sichtbarkeit, qualifizierte Anfragen und nachvollziehbare Performance.',
  },
  {
    icon: 'shield',
    title: 'Wartung & Entwicklung',
    description:
      'Kontinuierliche Pflege, Verbesserungen und klare Weiterentwicklung statt punktueller Einmal-Projekte.',
  },
]

const processSteps = [
  {
    title: 'Konzept & Informationsarchitektur',
    text: 'Struktur, Seitenlogik und User-Flows werden klar definiert, bevor Design und Entwicklung starten.',
  },
  {
    title: 'Design & Content',
    text: 'Visuelle Sprache und Inhalte werden aufeinander abgestimmt, damit Marke und Nutzen auf den ersten Blick verständlich sind.',
  },
  {
    title: 'Technische Umsetzung',
    text: 'Performante Entwicklung mit sauberer Basis für SEO, Tracking, Erweiterungen und langfristige Wartbarkeit.',
  },
  {
    title: 'Launch, Messung und Optimierung',
    text: 'Nach dem Go-live werden Daten genutzt, um Conversions, Sichtbarkeit und Prozesse systematisch weiterzuentwickeln.',
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

const reasons = [
  {
    icon: 'zap',
    title: 'Technisch präzise',
    description: 'Klare Standards für Code, Performance und Wartbarkeit.',
  },
  {
    icon: 'target',
    title: 'Reduziert und fokussiert',
    description: 'Kein Overhead, sondern schlank gestaltete Lösungen mit klarem Nutzen.',
  },
  {
    icon: 'shield',
    title: 'Verlässlich',
    description: 'Webseiten und Systeme mit langfristiger Stabilität und Sicherheit.',
  },
]

const allTables = (db.prepare(
  `
  SELECT name
  FROM sqlite_master
  WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
  `,
).all() ?? []) as TableInfoRow[]

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
      .prepare<[number]>(
        `SELECT id FROM "${tableName}" WHERE _parent_id = ? AND _path = 'layout'`,
      )
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
      db.prepare(
        `DELETE FROM "${tableName}" WHERE _parent_id IN (${placeholders})`,
      ).run(...oldBlockIds)
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
    'Leistungen | Webdesign, Marketing, Wartung',
    'Editierbare Leistungen für Webdesign, Marketing und Wartung. Minimal, technisch und hochwertig strukturiert.',
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
    'Leistungs-Hub auf einen Blick',
    'Vier Kernbereiche, die als zusammenhängender Prozess funktionieren - von der strategischen Grundlage bis zur kontinuierlichen Optimierung.',
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
    'Ein Hub statt isolierter Einzelleistungen',
    'Der Leistungs-Hub bündelt Strategie, Gestaltung, Technik und Vermarktung in einer klaren Journey. So entstehen keine Medienbrüche zwischen Beratung, Umsetzung und Betrieb.',
    'Edel im Auftritt. Präzise in der Ausführung. Messbar in der Wirkung.',
  )

  db.prepare<
    [
      number,
      number,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      number,
    ]
  >(
    `
    INSERT INTO site_pages_blocks_consulting_overview
      (
        _order, _parent_id, _path, id,
        headline, intro_text,
        strategy_label, strategy_sub_label, strategy_title, strategy_text,
        benefits_label, benefits_sub_label, benefits_title,
        experience_label, experience_sub_label, experience_title,
        pixel_layout_desktop
      )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    3,
    pageId,
    'layout',
    processFlowId,
    'So läuft die Zusammenarbeit - klar, strukturiert, transparent',
    'Jeder Schritt baut logisch auf dem vorherigen auf. Das reduziert Reibung und schafft eine belastbare Grundlage für Wachstum.',
    'Analyse & Ausrichtung',
    'Strategischer Startpunkt',
    'Wir definieren Ziele, Prioritäten und die richtige digitale Richtung',
    'Am Anfang stehen Zielgruppen, Angebotsschärfung und ein realistischer Maßnahmenplan. Damit wird aus Einzelideen ein konsistentes System mit klaren Prioritäten.',
    'Umsetzung & Ergebnis',
    'Vom Konzept zur Wirkung',
    'Umsetzung in präzisen Etappen',
    'Langfristige Partnerschaft',
    'Stabilität mit Entwicklungsspielraum',
    'Nach dem Launch begleite ich den Hub kontinuierlich bei Verbesserungen, Tests und Skalierung',
    1,
  )

  processSteps.forEach((step, index) => {
    db.prepare<[number, string, string, string, string]>(
      `
      INSERT INTO site_pages_blocks_consulting_overview_benefit_items
        (_order, _parent_id, id, title, text)
      VALUES (?, ?, ?, ?, ?)
      `,
    ).run(index + 1, processFlowId, makeId(), step.title, step.text)
  })

  db.prepare<
    [number, number, string, string, string, string, string, number, string, string]
  >(
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
    4,
    pageId,
    'layout',
    servicesGridId,
    'Meine Servicebereiche',
    'Wähle den Bereich, der zu deinem Projekt passt. Jede Seite ist editierbar und fokussiert auf einen klaren Leistungsbereich.',
    'Klar strukturiert. Zielgerichtet. Backend-bearbeitbar.',
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

  db.prepare<[number, number, string, string, string, string, string]>(
    `
    INSERT INTO site_pages_blocks_why_work_with_me
      (_order, _parent_id, _path, id, heading, intro, block_name)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    5,
    pageId,
    'layout',
    whyWorkWithMeId,
    'Warum diese Leistungen funktionieren',
    'Jede Spezialisierung ist so aufgebaut, dass Inhalte und Abläufe klar bleiben – auch im Backend.',
    null as unknown as string,
  )

  reasons.forEach((reason, index) => {
    db.prepare<[number, string, string, string, string, string]>(
      `
      INSERT INTO site_pages_blocks_why_work_with_me_reasons
        (_order, _parent_id, id, icon, title, description)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
    ).run(index + 1, whyWorkWithMeId, makeId(), reason.icon, reason.title, reason.description)
  })

  db.prepare<[number, number, string, string, string, string, string, string]>(
    `
    INSERT INTO site_pages_blocks_cal_popup
      (_order, _parent_id, _path, id, headline, description, cal_link, button_label)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    6,
    pageId,
    'layout',
    calPopupId,
    'Gemeinsam den nächsten Schritt planen',
    'In einem kurzen Kennenlerntermin prüfen wir, welcher Leistungsbereich am besten zu deinem Projekt passt.',
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
    `[dry-run] page: id=${page.id}, slug=${page.slug}, title=${page.title}, will_apply_layout_blocks=6`,
  )
  db.close()
  process.exit(0)
}

const removedBlocks = runner(page.id)
db.close()

console.log(
  `Leistungs-Hub aktualisiert (page id=${page.id}, slug=${page.slug}). Entfernte Alt-Block-IDs: ${removedBlocks}.`,
)
