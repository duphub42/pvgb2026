import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Repair for ShadcnBlock content.links table drift.
 *
 * Expected runtime table names (from dbName overrides):
 * - lnks
 * - lnks_rels
 * - _lnks_v
 * - _lnks_v_rels
 *
 * Older DB states may still use:
 * - site_pages_blocks_shadcn_block_content_links
 * - site_pages_blocks_shadcn_block_content_links_rels
 * - _site_pages_v_blocks_shadcn_block_content_links
 * - _site_pages_v_blocks_shadcn_block_content_links_rels
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_shadcn_block_content_links'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'lnks'
      ) THEN
        ALTER TABLE "site_pages_blocks_shadcn_block_content_links" RENAME TO "lnks";
      END IF;
    END $$;
  `))

  await db.execute(sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_shadcn_block_content_links_rels'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'lnks_rels'
      ) THEN
        ALTER TABLE "site_pages_blocks_shadcn_block_content_links_rels" RENAME TO "lnks_rels";
      END IF;
    END $$;
  `))

  await db.execute(sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_shadcn_block_content_links'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = '_lnks_v'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_shadcn_block_content_links" RENAME TO "_lnks_v";
      END IF;
    END $$;
  `))

  await db.execute(sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_shadcn_block_content_links_rels'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = '_lnks_v_rels'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_shadcn_block_content_links_rels" RENAME TO "_lnks_v_rels";
      END IF;
    END $$;
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "lnks" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_shadcn_block"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean DEFAULT false,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    );
    CREATE INDEX IF NOT EXISTS "lnks_order_idx" ON "lnks" ("_order");
    CREATE INDEX IF NOT EXISTS "lnks_parent_id_idx" ON "lnks" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "lnks_rels" (
      "order" integer NOT NULL,
      "parent_id" varchar NOT NULL,
      "path" varchar NOT NULL,
      "site_pages_id" integer,
      "blog_posts_id" integer,
      "categories_id" integer
    );
    CREATE INDEX IF NOT EXISTS "lnks_rels_order_idx" ON "lnks_rels" ("order");
    CREATE INDEX IF NOT EXISTS "lnks_rels_parent_idx" ON "lnks_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "lnks_rels_site_pages_idx" ON "lnks_rels" ("site_pages_id");
    CREATE INDEX IF NOT EXISTS "lnks_rels_blog_posts_idx" ON "lnks_rels" ("blog_posts_id");
    CREATE INDEX IF NOT EXISTS "lnks_rels_categories_idx" ON "lnks_rels" ("categories_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_lnks_v" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "_site_pages_v_blocks_shadcn_block"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean DEFAULT false,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default',
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_lnks_v_order_idx" ON "_lnks_v" ("_order");
    CREATE INDEX IF NOT EXISTS "_lnks_v_parent_id_idx" ON "_lnks_v" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_lnks_v_rels" (
      "order" integer NOT NULL,
      "parent_id" varchar NOT NULL,
      "path" varchar NOT NULL,
      "site_pages_id" integer,
      "blog_posts_id" integer,
      "categories_id" integer
    );
    CREATE INDEX IF NOT EXISTS "_lnks_v_rels_order_idx" ON "_lnks_v_rels" ("order");
    CREATE INDEX IF NOT EXISTS "_lnks_v_rels_parent_idx" ON "_lnks_v_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "_lnks_v_rels_site_pages_idx" ON "_lnks_v_rels" ("site_pages_id");
    CREATE INDEX IF NOT EXISTS "_lnks_v_rels_blog_posts_idx" ON "_lnks_v_rels" ("blog_posts_id");
    CREATE INDEX IF NOT EXISTS "_lnks_v_rels_categories_idx" ON "_lnks_v_rels" ("categories_id");
  `))

  await db.execute(sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'lnks'
          AND column_name = 'id'
          AND data_type <> 'character varying'
      ) THEN
        ALTER TABLE "lnks" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
      END IF;
    END $$;
  `))

  await db.execute(sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'lnks'
          AND column_name = '_parent_id'
          AND data_type <> 'character varying'
      ) THEN
        ALTER TABLE "lnks" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;
      END IF;
    END $$;
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'lnks'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_shadcn_block_content_links'
      ) THEN
        ALTER TABLE "lnks" RENAME TO "site_pages_blocks_shadcn_block_content_links";
      END IF;
    END $$;
  `))
}
