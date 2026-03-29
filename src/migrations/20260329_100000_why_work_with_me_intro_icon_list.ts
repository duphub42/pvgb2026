import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Block „Warum mit mir“: introIconList (Icon + Text unter der Einleitung).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_why_work_with_me_intro_icon_list" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_why_work_with_me"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "icon" varchar DEFAULT 'brain',
      "text" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_intro_icon_list_order_idx" ON "site_pages_blocks_why_work_with_me_intro_icon_list" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_intro_icon_list_parent_id_idx" ON "site_pages_blocks_why_work_with_me_intro_icon_list" ("_parent_id");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_intro_icon_list" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_why_work_with_me"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "icon" varchar DEFAULT 'brain',
      "text" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_intro_icon_list_order_idx" ON "_site_pages_v_blocks_why_work_with_me_intro_icon_list" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_intro_icon_list_parent_id_idx" ON "_site_pages_v_blocks_why_work_with_me_intro_icon_list" ("_parent_id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    DROP TABLE IF EXISTS "_site_pages_v_blocks_why_work_with_me_intro_icon_list";
    DROP TABLE IF EXISTS "site_pages_blocks_why_work_with_me_intro_icon_list";
  `))
}
