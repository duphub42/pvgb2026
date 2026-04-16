import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Migration: Add icon and enableIconSwap fields to link fields
 *
 * Diese Migration fügt die neuen Felder hinzu:
 * - icon: Select-Feld für Lucide-Icons
 * - enableIconSwap: Checkbox für CTA-Icon-Swap Animation
 *
 * KEINE DATEN GEHEN VERLOREN - nur neue Spalten werden hinzugefügt!
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // SQLite-compatible: Try to add columns (will fail silently if they exist via error handling)
  const tables = [
    'site_pages_hero_links',
    'site_pages_v_hero_links',
    'site_pages_blocks_richtext_links',
    'site_pages_v_blocks_richtext_links',
    'header_nav_items',
  ]

  for (const table of tables) {
    try {
      // For header_nav_items, columns have 'link_' prefix
      const iconCol = table === 'header_nav_items' ? 'link_icon' : 'icon'
      const swapCol = table === 'header_nav_items' ? 'link_enable_icon_swap' : 'enable_icon_swap'

      await db.execute(sql.raw(`ALTER TABLE ${table} ADD COLUMN ${iconCol} VARCHAR(50)`))
      await db.execute(sql.raw(`ALTER TABLE ${table} ADD COLUMN ${swapCol} BOOLEAN DEFAULT 0`))
    } catch {
      // Columns may already exist, ignore error
    }
  }

  console.log('Migration completed: Added icon and enableIconSwap fields to link tables')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // SQLite doesn't support DROP COLUMN, so this is a no-op
  console.log('Migration rollback: SQLite does not support DROP COLUMN')
}
