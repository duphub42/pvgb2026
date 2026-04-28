import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds highlight_background_image_id and highlight_overlay_opacity to mega_menu.
 * Removes unused paths/threads values from highlight_background (backward-compatible: old rows keep their value as varchar).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu' AND column_name = 'highlight_background_image_id'
      ) THEN
        ALTER TABLE "mega_menu" ADD COLUMN "highlight_background_image_id" integer;
      END IF;
    END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu' AND column_name = 'highlight_overlay_opacity'
      ) THEN
        ALTER TABLE "mega_menu" ADD COLUMN "highlight_overlay_opacity" numeric DEFAULT 55;
      END IF;
    END $$;
  `)
  // Migrate rows that had 'paths' or 'threads' to 'default'
  await db.execute(sql`
    UPDATE "mega_menu"
    SET "highlight_background" = 'default'
    WHERE "highlight_background" IN ('paths', 'threads');
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "mega_menu" DROP COLUMN IF EXISTS "highlight_background_image_id";`)
  await db.execute(sql`ALTER TABLE "mega_menu" DROP COLUMN IF EXISTS "highlight_overlay_opacity";`)
}
