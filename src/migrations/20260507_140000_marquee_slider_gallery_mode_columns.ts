import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

const TABLE_COLUMNS = [
  {
    table: 'site_pages_blocks_marquee_slider',
    columns: [
      { name: 'display_mode', type: "varchar DEFAULT 'marquee'" },
      { name: 'gallery_columns', type: "varchar DEFAULT '4'" },
    ],
  },
  {
    table: '_site_pages_v_blocks_marquee_slider',
    columns: [
      { name: 'display_mode', type: "varchar DEFAULT 'marquee'" },
      { name: 'gallery_columns', type: "varchar DEFAULT '4'" },
    ],
  },
  {
    table: 'site_pages_blocks_marquee_slider_rows_items',
    columns: [{ name: 'tile_size', type: "varchar DEFAULT 'md'" }],
  },
  {
    table: '_site_pages_v_blocks_marquee_slider_rows_items',
    columns: [{ name: 'tile_size', type: "varchar DEFAULT 'md'" }],
  },
] as const

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const entry of TABLE_COLUMNS) {
    for (const column of entry.columns) {
      await db.execute(
        sql.raw(`
          DO $$ BEGIN
            IF EXISTS (
              SELECT 1 FROM information_schema.tables
              WHERE table_schema = 'public' AND table_name = '${entry.table}'
            )
            AND NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_schema = 'public' AND table_name = '${entry.table}' AND column_name = '${column.name}'
            ) THEN
              ALTER TABLE "${entry.table}" ADD COLUMN "${column.name}" ${column.type};
            END IF;
          END $$;
        `),
      )
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const entry of TABLE_COLUMNS) {
    for (const column of entry.columns) {
      await db.execute(
        sql.raw(`
          DO $$ BEGIN
            IF EXISTS (
              SELECT 1 FROM information_schema.tables
              WHERE table_schema = 'public' AND table_name = '${entry.table}'
            )
            AND EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_schema = 'public' AND table_name = '${entry.table}' AND column_name = '${column.name}'
            ) THEN
              ALTER TABLE "${entry.table}" DROP COLUMN "${column.name}";
            END IF;
          END $$;
        `),
      )
    }
  }
}
