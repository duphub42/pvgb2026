import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Repair for introIconList nested table name:
 * Payload queries "services_grid_intro_icon_list", but an earlier migration created
 * "site_pages_blocks_services_grid_intro_icon_list".
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_services_grid_intro_icon_list'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'services_grid_intro_icon_list'
      ) THEN
        ALTER TABLE "site_pages_blocks_services_grid_intro_icon_list" RENAME TO "services_grid_intro_icon_list";
      END IF;
    END $$;
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "services_grid_intro_icon_list" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "services_grid"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar NOT NULL DEFAULT 'zap',
      "text" varchar
    );
    CREATE INDEX IF NOT EXISTS "services_grid_intro_icon_list_order_idx" ON "services_grid_intro_icon_list" ("_order");
    CREATE INDEX IF NOT EXISTS "services_grid_intro_icon_list_parent_id_idx" ON "services_grid_intro_icon_list" ("_parent_id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'services_grid_intro_icon_list'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_services_grid_intro_icon_list'
      ) THEN
        ALTER TABLE "services_grid_intro_icon_list" RENAME TO "site_pages_blocks_services_grid_intro_icon_list";
      END IF;
    END $$;
  `))
}
