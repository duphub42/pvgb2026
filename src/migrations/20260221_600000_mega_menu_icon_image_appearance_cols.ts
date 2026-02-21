import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds icon_id, image_id, appearance, column_widths_col1/col2/col3 to mega_menu (top-level fields).
 * Fixes: column mega_menu.icon_id / image_id / appearance / column_widths_* does not exist during import.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  const cols: [string, string][] = [
    ['icon_id', 'integer REFERENCES "media"("id") ON DELETE SET NULL'],
    ['image_id', 'integer REFERENCES "media"("id") ON DELETE SET NULL'],
    ['appearance', 'varchar DEFAULT \'link\''],
    ['column_widths_col1', 'integer'],
    ['column_widths_col2', 'integer'],
    ['column_widths_col3', 'integer'],
  ]
  for (const [col, type] of cols) {
    await db.execute(sql.raw(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'mega_menu' AND column_name = '${col}'
        ) THEN
          ALTER TABLE "mega_menu" ADD COLUMN "${col}" ${type};
        END IF;
      END $$;
    `))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const col of ['icon_id', 'image_id', 'appearance', 'column_widths_col1', 'column_widths_col2', 'column_widths_col3']) {
    await db.execute(sql.raw(`ALTER TABLE "mega_menu" DROP COLUMN IF EXISTS "${col}";`))
  }
}
