import './load-env'

import { execFileSync } from 'child_process'
import { Pool } from 'pg'

const altTextByFilename: Record<string, string> = {
  'herobg7-1.jpeg': 'Premium-Hintergrund für Webdesign, Branding und Marketing mit klarer Wirkung',
  'herobg6-1.jpeg': 'Dynamische Lichtstruktur für vertrauensstarke digitale Beratung',
  'herobg5-1.jpeg': 'Breites Hero-Motiv für einen professionellen Website- und Markenauftritt',
  'herobg4-1.jpeg': 'Moderne Farbwelt für überzeugende Webdesign- und Markenpräsentationen',
  'herobg3-1.jpeg': 'Geometrisches Designmotiv für klare, hochwertige Markenkommunikation',
  'herobg2-1.jpeg': 'Digitales Hintergrundmotiv für sichtbares Marketing und starke Websites',
  'herobg-1.jpeg': 'Profil-Hintergrund für Philipp Bacher als vertrauensvollen Digital Consultant',
  'herobg.jpeg': 'Profil-Hintergrund für Philipp Bacher als vertrauensvollen Digital Consultant',
  'herobg2.jpeg': 'Digitales Hintergrundmotiv für sichtbares Marketing und starke Websites',
  'herobg3.jpeg': 'Geometrisches Designmotiv für klare, hochwertige Markenkommunikation',
  'herobg4.jpeg': 'Moderne Farbwelt für überzeugende Webdesign- und Markenpräsentationen',
  'herobg5.jpeg': 'Breites Hero-Motiv für einen professionellen Website- und Markenauftritt',
  'herobg6.jpeg': 'Dynamische Lichtstruktur für vertrauensstarke digitale Beratung',
  'herobg7.jpeg': 'Premium-Hintergrund für Webdesign, Branding und Marketing mit klarer Wirkung',
  'herobg7-2.jpeg': 'Premium-Hintergrund für Webdesign, Branding und Marketing mit klarer Wirkung',
  'philippbacher-13.png':
    'Philipp Bacher, Digital Consultant für Webdesign und Marketing mit persönlicher Beratung in Halle',
  'digital-solution6.jpeg':
    'Digitale Strategie und Webentwicklung, die Unternehmen sichtbarer macht',
  'digital-solution6-1.jpeg':
    'Digitale Strategie und Webentwicklung, die Unternehmen sichtbarer macht',
  'digital-solution7.jpeg':
    'Kontakt zu Philipp Bacher für Webdesign, Marketing und digitale Beratung',
  'digital-solution7-1.jpeg':
    'Kontakt zu Philipp Bacher für Webdesign, Marketing und digitale Beratung',
  'digital-solution9.jpeg': 'Digitale Lösung für effiziente Marketingprozesse und bessere Websites',
  'hero1.jpeg': 'Webdesign, Branding und Marketing in Halle für mehr Vertrauen und Anfragen',
  'hero1-1.jpeg': 'Webdesign, Branding und Marketing in Halle für mehr Vertrauen und Anfragen',
  'hero3.jpeg':
    'Transparente Preise für Webdesign, Branding und Marketing mit klarem Projektumfang',
  'hero3-1.jpeg':
    'Transparente Preise für Webdesign, Branding und Marketing mit klarem Projektumfang',
  'hero4.jpeg': 'Leistungen für Webdesign, SEO, Branding und Automatisierung mit messbarem Nutzen',
  'hero4-1.jpeg':
    'Leistungen für Webdesign, SEO, Branding und Automatisierung mit messbarem Nutzen',
  'hero7.jpeg':
    'Portfolio mit Webdesign-, Branding- und Marketingprojekten für starke Kundenergebnisse',
  'hero7-1.jpeg':
    'Portfolio mit Webdesign-, Branding- und Marketingprojekten für starke Kundenergebnisse',
  'website-template-OG.webp':
    'Philipp Bacher - Webdesign, Branding und Marketing für professionelle Sichtbarkeit',
  'website-template-OG-1.webp':
    'Philipp Bacher - Webdesign, Branding und Marketing für professionelle Sichtbarkeit',
  'website-template-OG-2.webp':
    'Philipp Bacher - Webdesign, Branding und Marketing für professionelle Sichtbarkeit',
  'website-template-OG-2.png':
    'Philipp Bacher - Webdesign, Branding und Marketing für professionelle Sichtbarkeit',
  'berge.svg': 'Berglandschaft als Motiv für klare Ziele und digitale Wachstumsperspektiven',
  'berge-1.svg': 'Berglandschaft als Motiv für klare Ziele und digitale Wachstumsperspektiven',
  'powder.jpeg': 'Schneelandschaft als ruhiges Motiv für fokussierte digitale Strategie',
  'webflow-5.svg': 'Webflow Logo für schnelle, hochwertige Websites ohne unnötige Komplexität',
  'zapier-6.svg':
    'Zapier Logo für automatisierte Workflows, die Zeit sparen und Prozesse verbinden',
  'wordpress-5.svg': 'WordPress Logo für flexible Websites mit starker Inhaltsverwaltung',
  'woocommerce-5.svg': 'WooCommerce Logo für verkaufsstarke E-Commerce-Websites',
  'shopify-5.svg': 'Shopify Logo für skalierbare Onlineshops mit klarer Conversion-Strategie',
  'shopify-6.svg': 'Shopify Logo für skalierbare Onlineshops mit klarer Conversion-Strategie',
  'Semrush-5.svg': 'Semrush Logo für datenbasierte SEO-Analyse und bessere Google-Sichtbarkeit',
  'salesforce-5.svg': 'Salesforce Logo für CRM-Prozesse, die Vertrieb und Marketing verbinden',
  'meta-6.svg':
    'Meta Logo für Social Media Marketing mit Reichweite und klarer Zielgruppenansprache',
  'hubspot-5.svg': 'HubSpot Logo für CRM und Marketing-Automation mit planbarer Leadgewinnung',
  'figma-5.svg': 'Figma Logo für präzises UI-Design und überzeugende Website-Erlebnisse',
  'services-2.svg': 'Service-Icon für Webdesign, Marketing und Automatisierung aus einer Hand',
  'Automatisierungen.svg':
    'Automatisierung Icon für effiziente Workflows und weniger manuelle Arbeit',
  'welcome-w.lottie': 'Animation für einen einladenden, modernen digitalen Markenauftritt',
  'welcome-s.lottie': 'Animation für einen einladenden, modernen digitalen Markenauftritt',
  'animation-4.json':
    'Animation für interaktive Websites, die Aufmerksamkeit und Vertrauen schaffen',
  'Untitled-2.gif': 'Animiertes Motiv für moderne Website-Gestaltung mit hoher Wiedererkennung',
  'maneki-neko.png': 'Markenmotiv im Portfolio für kreative Gestaltung mit emotionaler Wirkung',
  'bg1.jpeg': 'Portfolio-Hintergrund für digitale Projekte mit hochwertiger Markenwirkung',
  'bg2.jpeg': 'Portfolio-Hintergrund für Markenkommunikation mit klarem visuellen Eindruck',
  'logo-portfolio.jpeg': 'Logo-Design Portfolio von Philipp Bacher für einprägsame Markenauftritte',
  'marketing-portfolio.jpeg':
    'Marketing Portfolio von Philipp Bacher für mehr Sichtbarkeit und Nachfrage',
  'test-upload.png': 'Testbild für Medien-Upload im CMS',
  'test-upload-1.png': 'Testbild für Medien-Upload im CMS',
  'test-upload-large.jpg': 'Großes Testbild für Medien-Upload im CMS',
  'test-upload-large-1.jpg': 'Großes Testbild für Medien-Upload im CMS',
}

const targetArg = process.argv.find((arg) => arg.startsWith('--target='))?.replace('--target=', '')
const target = targetArg || 'sqlite'
const shouldApply = process.argv.includes('--apply')
const shouldOverwrite = process.argv.includes('--overwrite')

if (!['sqlite', 'postgres', 'both'].includes(target)) {
  console.error('Ungueltiges Ziel. Nutze --target=sqlite, --target=postgres oder --target=both.')
  process.exit(1)
}

function entries() {
  return Object.entries(altTextByFilename)
}

function runSqlite(): Promise<number> {
  const databasePath = process.env.SQLITE_URL?.replace(/^file:/, '') || './payload.db'
  let changed = 0

  for (const [filename, alt] of entries()) {
    const escapedFilename = filename.replace(/'/g, "''")
    const escapedAlt = alt.replace(/'/g, "''")
    const emptyAltCondition = shouldOverwrite ? '' : " and coalesce(trim(alt), '') = ''"
    const sql = shouldApply
      ? `update media set alt = '${escapedAlt}', updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') where filename = '${escapedFilename}'${emptyAltCondition}; select changes();`
      : `select count(*) from media where filename = '${escapedFilename}'${emptyAltCondition};`

    const output = execFileSync('sqlite3', [databasePath, sql], { encoding: 'utf8' }).trim()
    changed += Number(output.split(/\s+/).at(-1) || 0)
  }

  return Promise.resolve(changed)
}

async function runPostgres(): Promise<number> {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL oder POSTGRES_URL fehlt fuer Postgres.')
  }

  const pool = new Pool({ connectionString })
  let changed = 0

  try {
    for (const [filename, alt] of entries()) {
      const result = shouldApply
        ? await pool.query(
            `update media set alt = $1, updated_at = now() where filename = $2${
              shouldOverwrite ? '' : " and coalesce(trim(alt), '') = ''"
            }`,
            [alt, filename],
          )
        : await pool.query(
            `select id from media where filename = $1${
              shouldOverwrite ? '' : " and coalesce(trim(alt), '') = ''"
            }`,
            [filename],
          )

      changed += result.rowCount ?? 0
    }
  } finally {
    await pool.end()
  }

  return changed
}

async function main() {
  const mode = shouldApply ? 'geschrieben' : 'gefunden'

  if (target === 'sqlite' || target === 'both') {
    const count = await runSqlite()
    console.log(`SQLite: ${count} Alt-Texte ${mode}.`)
  }

  if (target === 'postgres' || target === 'both') {
    const count = await runPostgres()
    console.log(`Postgres: ${count} Alt-Texte ${mode}.`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
