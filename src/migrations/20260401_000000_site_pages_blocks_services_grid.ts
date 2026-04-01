import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Block `servicesGrid` (site-pages) + Versioned table. Struktur: Kategorien mit Services.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_services_grid" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "block_name" varchar,
      "heading" varchar,
      "intro" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_grid_order_idx" ON "site_pages_blocks_services_grid" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_grid_parent_id_idx" ON "site_pages_blocks_services_grid" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_grid_path_idx" ON "site_pages_blocks_services_grid" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_services_grid_categories" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_services_grid"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "category_label" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_grid_categories_order_idx" ON "site_pages_blocks_services_grid_categories" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_grid_categories_parent_id_idx" ON "site_pages_blocks_services_grid_categories" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_services_grid_categories_services" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages_blocks_services_grid_categories"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "icon_url" varchar,
      "icon_alt" varchar,
      "title" varchar,
      "description" varchar,
      "link_slug" varchar,
      "featured" boolean DEFAULT false
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_grid_categories_services_order_idx" ON "site_pages_blocks_services_grid_categories_services" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_grid_categories_services_parent_id_idx" ON "site_pages_blocks_services_grid_categories_services" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_services_grid" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "_uuid" varchar,
      "block_name" varchar,
      "heading" varchar,
      "intro" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_grid_order_idx" ON "_site_pages_v_blocks_services_grid" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_grid_parent_id_idx" ON "_site_pages_v_blocks_services_grid" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_grid_path_idx" ON "_site_pages_v_blocks_services_grid" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_services_grid_categories" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_services_grid"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "category_label" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_grid_categories_order_idx" ON "_site_pages_v_blocks_services_grid_categories" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_grid_categories_parent_id_idx" ON "_site_pages_v_blocks_services_grid_categories" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_services_grid_categories_services" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_services_grid_categories"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "icon_url" varchar,
      "icon_alt" varchar,
      "title" varchar,
      "description" varchar,
      "link_slug" varchar,
      "featured" boolean DEFAULT false,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_grid_categories_services_order_idx" ON "_site_pages_v_blocks_services_grid_categories_services" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_grid_categories_services_parent_id_idx" ON "_site_pages_v_blocks_services_grid_categories_services" ("_parent_id");
  `),
  )

  // Rename block tables to dbName-based names (block.dbName = services_grid)
  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_services_grid'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'services_grid'
      ) THEN
        ALTER TABLE "site_pages_blocks_services_grid" RENAME TO "services_grid";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_services_grid_categories'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'services_grid_categories'
      ) THEN
        ALTER TABLE "site_pages_blocks_services_grid_categories" RENAME TO "services_grid_categories";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_services_grid_categories_services'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'services_grid_categories_services'
      ) THEN
        ALTER TABLE "site_pages_blocks_services_grid_categories_services" RENAME TO "services_grid_categories_services";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_services_grid'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_services_grid_v'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_services_grid" RENAME TO "_services_grid_v";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_services_grid_categories'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_services_grid_v_categories'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_services_grid_categories" RENAME TO "_services_grid_v_categories";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_services_grid_categories_services'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_services_grid_v_categories_services'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_services_grid_categories_services" RENAME TO "_services_grid_v_categories_services";
      END IF;
    END $$;
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_services_grid_categories_services";`),
  )
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_services_grid_categories";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_services_grid";`))
  await db.execute(
    sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_services_grid_categories_services";`),
  )
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_services_grid_categories";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_services_grid";`))
}
