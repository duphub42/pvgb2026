import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds highlight_background to mega_menu (highlight.background).
 * Fixes: column mega_menu.highlight_background does not exist.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu' AND column_name = 'highlight_background'
      ) THEN
        ALTER TABLE "mega_menu" ADD COLUMN "highlight_background" varchar DEFAULT 'default';
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "mega_menu" DROP COLUMN IF EXISTS "highlight_background";`)
}
