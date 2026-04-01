import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

const TABLE = '_services_grid_v'

const COLS: Array<{ name: string; type: string; default?: string }> = [
  { name: 'block_background', type: 'varchar', default: "'none'" },
  { name: 'block_overlay_enabled', type: 'boolean', default: 'false' },
  { name: 'block_overlay_color', type: 'varchar', default: "'dark'" },
  { name: 'block_overlay_opacity', type: 'integer', default: '30' },
]

function quoteIdent(value: string) {
  return `"${value}"`
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const col of COLS) {
    await db.execute(
      sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${TABLE}'
        ) AND NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '${TABLE}' AND column_name = '${col.name}'
        ) THEN
          ALTER TABLE "${TABLE}" ADD COLUMN ${quoteIdent(col.name)} ${col.type} DEFAULT ${col.default};
        END IF;
      END $$;
    `),
    )
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const col of COLS) {
    await db.execute(
      sql.raw(`ALTER TABLE "${TABLE}" DROP COLUMN IF EXISTS ${quoteIdent(col.name)};`),
    )
  }
}
