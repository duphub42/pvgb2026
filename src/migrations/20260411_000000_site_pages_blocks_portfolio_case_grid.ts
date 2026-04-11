import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "portfolio_grid" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "eyebrow" varchar,
      "heading" varchar,
      "intro" varchar,
      "variant" varchar DEFAULT 'glass',
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "portfolio_grid_order_idx" ON "portfolio_grid" ("_order");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_parent_id_idx" ON "portfolio_grid" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_path_idx" ON "portfolio_grid" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "portfolio_grid_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "portfolio_grid"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "context" varchar,
      "trend" varchar DEFAULT 'up',
      "delta" varchar
    );
    CREATE INDEX IF NOT EXISTS "portfolio_grid_items_order_idx" ON "portfolio_grid_items" ("_order");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_items_parent_id_idx" ON "portfolio_grid_items" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_portfolio_grid_v" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "_uuid" varchar,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "eyebrow" varchar,
      "heading" varchar,
      "intro" varchar,
      "variant" varchar DEFAULT 'glass',
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_order_idx" ON "_portfolio_grid_v" ("_order");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_parent_id_idx" ON "_portfolio_grid_v" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_path_idx" ON "_portfolio_grid_v" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_portfolio_grid_v_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_portfolio_grid_v"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "value" varchar,
      "label" varchar,
      "context" varchar,
      "trend" varchar DEFAULT 'up',
      "delta" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_items_order_idx" ON "_portfolio_grid_v_items" ("_order");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_items_parent_id_idx" ON "_portfolio_grid_v_items" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_portfolio_case_grid'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'portfolio_grid'
      ) THEN
        ALTER TABLE "site_pages_blocks_portfolio_case_grid" RENAME TO "portfolio_grid";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_portfolio_case_grid_items'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'portfolio_grid_items'
      ) THEN
        ALTER TABLE "site_pages_blocks_portfolio_case_grid_items" RENAME TO "portfolio_grid_items";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_portfolioCaseGrid'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_portfolio_grid_v'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_portfolioCaseGrid" RENAME TO "_portfolio_grid_v";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_portfolioCaseGrid_items'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_portfolio_grid_v_items'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_portfolioCaseGrid_items" RENAME TO "_portfolio_grid_v_items";
      END IF;
    END $$;
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_portfolio_grid_v_items";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_portfolio_grid_v";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "portfolio_grid_items";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "portfolio_grid";`))
}
