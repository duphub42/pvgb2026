import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Block „Warum mit mir“ (whyWorkWithMe): Basis-Tabelle; editierbare Felder folgen in 20260325_100000_why_work_with_me_editable.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_why_work_with_me" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_order_idx" ON "site_pages_blocks_why_work_with_me" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_parent_id_idx" ON "site_pages_blocks_why_work_with_me" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_path_idx" ON "site_pages_blocks_why_work_with_me" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_order_idx" ON "_site_pages_v_blocks_why_work_with_me" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_parent_id_idx" ON "_site_pages_v_blocks_why_work_with_me" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_path_idx" ON "_site_pages_v_blocks_why_work_with_me" ("_path");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_why_work_with_me";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_why_work_with_me";`))
}
