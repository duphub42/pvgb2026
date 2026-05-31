/**
 * Seed the "Leistungen" page (id=145) with a ServicesGrid block.
 * Run: node -r ./scripts/load-env-for-payload.cjs ./scripts/seed-leistungen.cjs
 */
const { Client } = require('pg')
const crypto = require('crypto')

const uuid = () => crypto.randomUUID()
// Payload PG adapter uses 24-char hex IDs (like MongoDB ObjectIDs)
const oid = () => crypto.randomBytes(12).toString('hex')

;(async () => {
  const cs = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!cs) throw new Error('No DATABASE_URL found in env')

  const c = new Client({ connectionString: cs })
  await c.connect()

  // ── 1. Find the leistungen page ──────────────────────────────────────────
  const pageRes = await c.query("SELECT id FROM site_pages WHERE slug = 'leistungen' LIMIT 1")
  if (!pageRes.rows.length) throw new Error('No page with slug "leistungen" found')
  const pageId = pageRes.rows[0].id
  console.log('[seed] Page id:', pageId)

  // ── 2. Check: do we already have a services_grid block on this page? ──────
  const existCheck = await c.query(
    "SELECT id FROM services_grid WHERE _parent_id = $1 LIMIT 1",
    [pageId]
  )
  if (existCheck.rows.length > 0) {
    console.log('[seed] ServicesGrid block already exists on this page. Skipping.')
    await c.end()
    return
  }

  // ── 3. Find the next _order for blocks on this page ────────────────────────
  // Scan all site_pages_blocks_* tables for max _order
  const blockTablesRes = await c.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name LIKE 'site_pages_blocks%' ORDER BY table_name"
  )
  let maxOrder = 0
  for (const row of blockTablesRes.rows) {
    try {
      const res = await c.query(
        `SELECT MAX(_order) as m FROM "${row.table_name}" WHERE _parent_id = $1`,
        [pageId]
      )
      if (res.rows[0]?.m != null) maxOrder = Math.max(maxOrder, Number(res.rows[0].m))
    } catch (_) { /* table may not have _parent_id col */ }
  }
  // Also check services_grid directly
  try {
    const sgMax = await c.query("SELECT MAX(_order) as m FROM services_grid WHERE _parent_id = $1", [pageId])
    if (sgMax.rows[0]?.m != null) maxOrder = Math.max(maxOrder, Number(sgMax.rows[0].m))
  } catch (_) {}
  const blockOrder = maxOrder + 1
  console.log('[seed] Inserting at _order:', blockOrder)

  // ── 4. Insert services_grid block ─────────────────────────────────────────
  const sgRes = await c.query(
    `INSERT INTO services_grid
      (_order, _parent_id, _path, id, _uuid, heading, intro, block_background, block_overlay_enabled)
     VALUES ($1, $2, 'layout', $3, $4, $5, $6, 'none', false)
     RETURNING id`,
    [
      blockOrder,
      pageId,
      oid(),
      uuid(),
      'Leistungen',
      'Kreative Konzepte, moderne Weblösungen und digitale Strategien – alles aus einer Hand.',
    ]
  )
  const sgId = sgRes.rows[0].id
  console.log('[seed] services_grid inserted, id:', sgId)

  // ── 5. Data: categories + services ────────────────────────────────────────
  const categories = [
    {
      label: 'Design',
      services: [
        {
          title: 'Webdesign',
          description: 'Webdesign und Entwicklung',
          slug: 'webdesign',
        },
        {
          title: 'Printmedien & Grafikdesign',
          description: 'Printdesign, das auffällt – von Flyer bis Broschüre',
          slug: 'printmedien-grafikdesign',
        },
        {
          title: 'Präsentationen & Keynotes',
          description: 'Präsentationen, die wirken – visuell stark und auf den Punkt',
          slug: 'praesentationen-keynotes',
        },
      ],
    },
    {
      label: 'Marketing',
      services: [
        {
          title: 'SEO – Rankings',
          description: 'Suchmaschinenoptimierung für mehr Sichtbarkeit, Traffic und Anfragen.',
          slug: 'seo-rankings',
        },
        {
          title: 'SEM – Online Werbung',
          description: 'Performance-Marketing auf Suchmaschinen',
          slug: 'sem-online-werbung',
        },
        {
          title: 'Content Creation',
          description:
            'Visuelle Geschichten, Texte und Multimedia, die Ihre Marke lebendig machen – von Social Media bis Website.',
          slug: 'content-creation',
        },
      ],
    },
    {
      label: 'Branding',
      services: [
        {
          title: 'CI – Corporate Identity',
          description: 'Markenidentität klar, einheitlich und professionell gestaltet.',
          slug: 'ci-corporate-identity',
        },
        {
          title: 'Logo-Entwicklung',
          description: 'Einprägsame Logos, die Marke und Werte klar sichtbar machen',
          slug: 'logo-entwicklung',
        },
        {
          title: 'Markenstrategie',
          description: 'Marken klar definieren – Strategie, Positionierung und Storytelling.',
          slug: 'markenstrategie',
        },
      ],
    },
    {
      label: 'Automatisierung',
      services: [
        {
          title: 'Automatisierung',
          description:
            'Smarter Workflow, weniger Routine, mehr Fokus auf das Wesentliche – ich digitalisiere Prozesse, damit Ihr Business schneller wächst. Echtzeit-Daten, nahtlose Verbindungen: Ich verbinde Ihre Tools und automatisiere Prozesse direkt über Webhooks.',
          slug: 'potentialanalyse',
          featured: true,
        },
      ],
    },
  ]

  // ── 6. Insert categories & services ───────────────────────────────────────
  for (let catIdx = 0; catIdx < categories.length; catIdx++) {
    const cat = categories[catIdx]

    const catRes = await c.query(
      `INSERT INTO services_grid_categories (_order, _parent_id, _uuid, category_label)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [catIdx + 1, sgId, uuid(), cat.label]
    )
    const catId = catRes.rows[0].id
    console.log(`[seed]   category "${cat.label}" id=${catId}`)

    for (let svcIdx = 0; svcIdx < cat.services.length; svcIdx++) {
      const svc = cat.services[svcIdx]
      await c.query(
        `INSERT INTO services_grid_categories_services
           (_order, _parent_id, _uuid, title, description, link_slug, featured, icon_url, icon_alt)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          svcIdx + 1,
          catId,
          uuid(),
          svc.title,
          svc.description,
          svc.slug,
          svc.featured ?? false,
          null,
          svc.title,
        ]
      )
      console.log(`[seed]     service "${svc.title}" inserted`)
    }
  }

  console.log('[seed] ✅ Done – ServicesGrid block added to /leistungen page!')
  await c.end()
})().catch(async (e) => {
  console.error('[seed] ERROR:', e.message)
  process.exit(1)
})
