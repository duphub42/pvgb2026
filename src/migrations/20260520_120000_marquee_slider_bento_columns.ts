import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

const TABLE_COLUMNS = [
  {
    table: 'site_pages_blocks_marquee_slider',
    columns: [
      { name: 'bento_show_counter', type: 'boolean DEFAULT false' },
      { name: 'bento_counter_label', type: 'varchar' },
      { name: 'bento_gap', type: "varchar DEFAULT 'default'" },
      { name: 'bento_row_height', type: "varchar DEFAULT 'md'" },
      { name: 'bento_mobile_flatten_spans', type: 'boolean DEFAULT true' },
    ],
  },
  {
    table: '_site_pages_v_blocks_marquee_slider',
    columns: [
      { name: 'bento_show_counter', type: 'boolean DEFAULT false' },
      { name: 'bento_counter_label', type: 'varchar' },
      { name: 'bento_gap', type: "varchar DEFAULT 'default'" },
      { name: 'bento_row_height', type: "varchar DEFAULT 'md'" },
      { name: 'bento_mobile_flatten_spans', type: 'boolean DEFAULT true' },
    ],
  },
  {
    table: 'site_pages_blocks_marquee_slider_rows_items',
    columns: [
      { name: 'bento_interactive', type: 'boolean DEFAULT false' },
      { name: 'detail_title', type: 'varchar' },
      { name: 'detail_text', type: 'text' },
      { name: 'detail_meta', type: 'varchar' },
      { name: 'emphasis', type: "varchar DEFAULT 'normal'" },
    ],
  },
  {
    table: '_site_pages_v_blocks_marquee_slider_rows_items',
    columns: [
      { name: 'bento_interactive', type: 'boolean DEFAULT false' },
      { name: 'detail_title', type: 'varchar' },
      { name: 'detail_text', type: 'text' },
      { name: 'detail_meta', type: 'varchar' },
      { name: 'emphasis', type: "varchar DEFAULT 'normal'" },
    ],
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
