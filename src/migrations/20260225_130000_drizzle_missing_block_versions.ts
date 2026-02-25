import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sqlPath = path.resolve(__dirname, '../../drizzle/0000_add_missing_block_tables.sql')

// Match both main and version tables for the new Site Page blocks
const BLOCK_KEYWORDS =
  /hero_marketing|hero_grid|collab_cur|scroll_morph_hero|feat_adv|feature1|feature2|faq_simple|pricing|contact_section1|cta_section3|serp_content|lyra|features_grid|service_ux_ui|services4|features_scaling|feat_ai_acc/

const SKIP_CODES = new Set(['42710', '42P07'])

function shouldSkip(err: unknown): boolean {
  let e: unknown = err
  while (e && typeof e === 'object') {
    const code = 'code' in e ? String((e as { code: string }).code) : ''
    if (SKIP_CODES.has(code)) return true
    e = 'cause' in e ? (e as { cause: unknown }).cause : null
  }
  const msg = err instanceof Error ? err.message : String(err)
  if (/already exists|duplicate|Connection terminated/i.test(msg)) return true
  return false
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const content = fs.readFileSync(sqlPath, 'utf-8')
  const statements = content
    .split('--> statement-breakpoint')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && BLOCK_KEYWORDS.test(s))

  for (const stmt of statements) {
    const s = stmt.endsWith(';') ? stmt : stmt + ';'
    try {
      await db.execute(sql.raw(s))
    } catch (err) {
      if (!shouldSkip(err)) throw err
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // No-op: we only add missing schema pieces needed for import
}

