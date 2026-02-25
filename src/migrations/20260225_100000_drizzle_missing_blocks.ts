import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sqlPath = path.resolve(__dirname, '../../drizzle/0000_add_missing_block_tables.sql')

const ONLY_MISSING =
  /site_pages_blocks_hero_marketing|site_pages_blocks_hero_grid|collab_cur|site_pages_blocks_scroll_morph_hero|feat_adv|site_pages_blocks_feature1|site_pages_blocks_feature2|site_pages_blocks_faq_simple|site_pages_blocks_pricing|site_pages_blocks_contact_section1|site_pages_blocks_cta_section3|site_pages_blocks_serp_content|site_pages_blocks_lyra|site_pages_blocks_features_grid|site_pages_blocks_service_ux_ui|site_pages_blocks_services4|site_pages_blocks_features_scaling|feat_ai_acc/

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
    .filter((s) => s.length > 0 && ONLY_MISSING.test(s))

  for (const stmt of statements) {
    const s = stmt.endsWith(';') ? stmt : stmt + ';'
    try {
      await db.execute(sql.raw(s))
    } catch (err) {
      if (!shouldSkip(err)) throw err
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {}
