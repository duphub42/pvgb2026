import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds the enhanced portfolio case grid fields:
 * - year
 * - categories (select hasMany)
 * - gallery (additional screenshots)
 * - website group
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE "portfolio_grid_cases"
      ADD COLUMN IF NOT EXISTS "year" integer;
    ALTER TABLE "portfolio_grid_cases"
      ADD COLUMN IF NOT EXISTS "website_label" varchar;
    ALTER TABLE "portfolio_grid_cases"
      ADD COLUMN IF NOT EXISTS "website_href" varchar;
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "portfolio_grid_cases_categories" (
      "order" integer NOT NULL,
      "parent_id" varchar NOT NULL REFERENCES "portfolio_grid_cases"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_categories_order_idx" ON "portfolio_grid_cases_categories" ("order");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_categories_parent_id_idx" ON "portfolio_grid_cases_categories" ("parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "portfolio_grid_cases_gallery" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "portfolio_grid_cases"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "caption" varchar
    );
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_gallery_order_idx" ON "portfolio_grid_cases_gallery" ("_order");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_gallery_parent_id_idx" ON "portfolio_grid_cases_gallery" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_gallery_image_idx" ON "portfolio_grid_cases_gallery" ("image_id");
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_portfolio_grid_v_cases"
      ADD COLUMN IF NOT EXISTS "year" integer;
    ALTER TABLE "_portfolio_grid_v_cases"
      ADD COLUMN IF NOT EXISTS "website_label" varchar;
    ALTER TABLE "_portfolio_grid_v_cases"
      ADD COLUMN IF NOT EXISTS "website_href" varchar;
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_portfolio_grid_v_cases_categories" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL REFERENCES "_portfolio_grid_v_cases"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "value" varchar NOT NULL,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_categories_order_idx" ON "_portfolio_grid_v_cases_categories" ("order");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_categories_parent_id_idx" ON "_portfolio_grid_v_cases_categories" ("parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_portfolio_grid_v_cases_gallery" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_portfolio_grid_v_cases"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "caption" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_gallery_order_idx" ON "_portfolio_grid_v_cases_gallery" ("_order");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_gallery_parent_id_idx" ON "_portfolio_grid_v_cases_gallery" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_gallery_image_idx" ON "_portfolio_grid_v_cases_gallery" ("image_id");
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    DROP TABLE IF EXISTS "_portfolio_grid_v_cases_gallery";
    DROP TABLE IF EXISTS "_portfolio_grid_v_cases_categories";
    DROP TABLE IF EXISTS "portfolio_grid_cases_gallery";
    DROP TABLE IF EXISTS "portfolio_grid_cases_categories";
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_portfolio_grid_v_cases"
      DROP COLUMN IF EXISTS "website_href";
    ALTER TABLE "_portfolio_grid_v_cases"
      DROP COLUMN IF EXISTS "website_label";
    ALTER TABLE "_portfolio_grid_v_cases"
      DROP COLUMN IF EXISTS "year";
    ALTER TABLE "portfolio_grid_cases"
      DROP COLUMN IF EXISTS "website_href";
    ALTER TABLE "portfolio_grid_cases"
      DROP COLUMN IF EXISTS "website_label";
    ALTER TABLE "portfolio_grid_cases"
      DROP COLUMN IF EXISTS "year";
  `),
  )
}