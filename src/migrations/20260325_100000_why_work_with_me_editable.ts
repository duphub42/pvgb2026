import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Block „Warum mit mir“: Überschrift, Einleitung, Gründe-Array (Icon/Titel/Text) im CMS.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "site_pages_blocks_why_work_with_me"
      ADD COLUMN IF NOT EXISTS "heading" varchar,
      ADD COLUMN IF NOT EXISTS "intro" varchar;
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_why_work_with_me"
      ADD COLUMN IF NOT EXISTS "heading" varchar,
      ADD COLUMN IF NOT EXISTS "intro" varchar;
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_why_work_with_me_reasons" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_why_work_with_me"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "icon" varchar DEFAULT 'user',
      "title" varchar,
      "description" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_reasons_order_idx" ON "site_pages_blocks_why_work_with_me_reasons" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_reasons_parent_id_idx" ON "site_pages_blocks_why_work_with_me_reasons" ("_parent_id");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_reasons" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_why_work_with_me"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "icon" varchar DEFAULT 'user',
      "title" varchar,
      "description" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_reasons_order_idx" ON "_site_pages_v_blocks_why_work_with_me_reasons" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_reasons_parent_id_idx" ON "_site_pages_v_blocks_why_work_with_me_reasons" ("_parent_id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    DROP TABLE IF EXISTS "_site_pages_v_blocks_why_work_with_me_reasons";
    DROP TABLE IF EXISTS "site_pages_blocks_why_work_with_me_reasons";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_why_work_with_me"
      DROP COLUMN IF EXISTS "intro",
      DROP COLUMN IF EXISTS "heading";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "site_pages_blocks_why_work_with_me"
      DROP COLUMN IF EXISTS "intro",
      DROP COLUMN IF EXISTS "heading";
  `))
}
