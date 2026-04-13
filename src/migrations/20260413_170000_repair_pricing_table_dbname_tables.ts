import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

const LEGACY_TO_DBNAME_RENAMES: [string, string][] = [
  // Published tables
  ['site_pages_blocks_pricing', 'pricing_table'],
  ['site_pages_blocks_pricing_cards', 'pricing_table'],
  ['site_pages_blocks_pricing_plans', 'pricing_table_plans'],
  ['site_pages_blocks_pricing_cards_plans', 'pricing_table_plans'],
  ['site_pages_blocks_pricing_plans_features', 'pricing_table_plans_features'],
  ['site_pages_blocks_pricing_cards_plans_features', 'pricing_table_plans_features'],
  // Version tables
  ['_site_pages_v_blocks_pricing', '_pricing_table_v'],
  ['_site_pages_v_blocks_pricing_cards', '_pricing_table_v'],
  ['_site_pages_v_blocks_pricing_plans', '_pricing_table_v_plans'],
  ['_site_pages_v_blocks_pricing_cards_plans', '_pricing_table_v_plans'],
  ['_site_pages_v_blocks_pricing_plans_features', '_pricing_table_v_plans_features'],
  ['_site_pages_v_blocks_pricing_cards_plans_features', '_pricing_table_v_plans_features'],
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const [from, to] of LEGACY_TO_DBNAME_RENAMES) {
    await db.execute(
      sql.raw(`
        DO $$ BEGIN
          IF EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = '${from}'
          ) AND NOT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = '${to}'
          ) THEN
            ALTER TABLE "${from}" RENAME TO "${to}";
          END IF;
        END $$;
      `),
    )
  }

  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "pricing_table" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
        "_path" text NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "block_background" varchar DEFAULT 'none',
        "block_overlay_enabled" boolean DEFAULT false,
        "block_overlay_color" varchar DEFAULT 'dark',
        "block_overlay_opacity" integer DEFAULT 0,
        "eyebrow" varchar,
        "heading" varchar,
        "description" varchar,
        "comparison_heading" varchar,
        "comparison_description" varchar,
        "comparison_footnote" varchar,
        "block_name" varchar
      );
      CREATE INDEX IF NOT EXISTS "pricing_table_order_idx" ON "pricing_table" ("_order");
      CREATE INDEX IF NOT EXISTS "pricing_table_parent_id_idx" ON "pricing_table" ("_parent_id");
      CREATE INDEX IF NOT EXISTS "pricing_table_path_idx" ON "pricing_table" ("_path");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "pricing_table_plans" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL REFERENCES "pricing_table"("id") ON DELETE CASCADE,
        "id" varchar PRIMARY KEY NOT NULL,
        "name" varchar,
        "badge" varchar,
        "description" varchar,
        "price" varchar,
        "price_suffix" varchar,
        "highlighted" boolean DEFAULT false,
        "cta_label" varchar,
        "cta_href" varchar,
        "cta_new_tab" boolean DEFAULT false
      );
      CREATE INDEX IF NOT EXISTS "pricing_table_plans_order_idx" ON "pricing_table_plans" ("_order");
      CREATE INDEX IF NOT EXISTS "pricing_table_plans_parent_id_idx" ON "pricing_table_plans" ("_parent_id");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "pricing_table_plans_features" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL REFERENCES "pricing_table_plans"("id") ON DELETE CASCADE,
        "id" varchar PRIMARY KEY NOT NULL,
        "text" varchar
      );
      CREATE INDEX IF NOT EXISTS "pricing_table_plans_features_order_idx" ON "pricing_table_plans_features" ("_order");
      CREATE INDEX IF NOT EXISTS "pricing_table_plans_features_parent_id_idx" ON "pricing_table_plans_features" ("_parent_id");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "pricing_table_comparison_rows" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL REFERENCES "pricing_table"("id") ON DELETE CASCADE,
        "id" varchar PRIMARY KEY NOT NULL,
        "feature" varchar
      );
      CREATE INDEX IF NOT EXISTS "pricing_table_comparison_rows_order_idx" ON "pricing_table_comparison_rows" ("_order");
      CREATE INDEX IF NOT EXISTS "pricing_table_comparison_rows_parent_id_idx" ON "pricing_table_comparison_rows" ("_parent_id");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "pricing_table_comparison_rows_values" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL REFERENCES "pricing_table_comparison_rows"("id") ON DELETE CASCADE,
        "id" varchar PRIMARY KEY NOT NULL,
        "type" varchar DEFAULT 'included',
        "label" varchar
      );
      CREATE INDEX IF NOT EXISTS "pricing_table_comparison_rows_values_order_idx" ON "pricing_table_comparison_rows_values" ("_order");
      CREATE INDEX IF NOT EXISTS "pricing_table_comparison_rows_values_parent_id_idx" ON "pricing_table_comparison_rows_values" ("_parent_id");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "_pricing_table_v" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
        "_path" text NOT NULL,
        "id" serial PRIMARY KEY,
        "block_background" varchar DEFAULT 'none',
        "block_overlay_enabled" boolean DEFAULT false,
        "block_overlay_color" varchar DEFAULT 'dark',
        "block_overlay_opacity" integer DEFAULT 0,
        "eyebrow" varchar,
        "heading" varchar,
        "description" varchar,
        "comparison_heading" varchar,
        "comparison_description" varchar,
        "comparison_footnote" varchar,
        "_uuid" varchar,
        "block_name" varchar
      );
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_order_idx" ON "_pricing_table_v" ("_order");
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_parent_id_idx" ON "_pricing_table_v" ("_parent_id");
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_path_idx" ON "_pricing_table_v" ("_path");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "_pricing_table_v_plans" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL REFERENCES "_pricing_table_v"("id") ON DELETE CASCADE,
        "id" serial PRIMARY KEY,
        "name" varchar,
        "badge" varchar,
        "description" varchar,
        "price" varchar,
        "price_suffix" varchar,
        "highlighted" boolean DEFAULT false,
        "cta_label" varchar,
        "cta_href" varchar,
        "cta_new_tab" boolean DEFAULT false,
        "_uuid" varchar
      );
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_plans_order_idx" ON "_pricing_table_v_plans" ("_order");
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_plans_parent_id_idx" ON "_pricing_table_v_plans" ("_parent_id");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "_pricing_table_v_plans_features" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL REFERENCES "_pricing_table_v_plans"("id") ON DELETE CASCADE,
        "id" serial PRIMARY KEY,
        "text" varchar,
        "_uuid" varchar
      );
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_plans_features_order_idx" ON "_pricing_table_v_plans_features" ("_order");
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_plans_features_parent_id_idx" ON "_pricing_table_v_plans_features" ("_parent_id");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "_pricing_table_v_comparison_rows" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL REFERENCES "_pricing_table_v"("id") ON DELETE CASCADE,
        "id" serial PRIMARY KEY,
        "feature" varchar,
        "_uuid" varchar
      );
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_comparison_rows_order_idx" ON "_pricing_table_v_comparison_rows" ("_order");
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_comparison_rows_parent_id_idx" ON "_pricing_table_v_comparison_rows" ("_parent_id");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "_pricing_table_v_comparison_rows_values" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL REFERENCES "_pricing_table_v_comparison_rows"("id") ON DELETE CASCADE,
        "id" serial PRIMARY KEY,
        "type" varchar DEFAULT 'included',
        "label" varchar,
        "_uuid" varchar
      );
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_comparison_rows_values_order_idx" ON "_pricing_table_v_comparison_rows_values" ("_order");
      CREATE INDEX IF NOT EXISTS "_pricing_table_v_comparison_rows_values_parent_id_idx" ON "_pricing_table_v_comparison_rows_values" ("_parent_id");
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "pricing_table" ADD COLUMN IF NOT EXISTS "eyebrow" varchar;
      ALTER TABLE "pricing_table" ADD COLUMN IF NOT EXISTS "heading" varchar;
      ALTER TABLE "pricing_table" ADD COLUMN IF NOT EXISTS "comparison_heading" varchar;
      ALTER TABLE "pricing_table" ADD COLUMN IF NOT EXISTS "comparison_description" varchar;
      ALTER TABLE "pricing_table" ADD COLUMN IF NOT EXISTS "comparison_footnote" varchar;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "pricing_table_plans" ADD COLUMN IF NOT EXISTS "badge" varchar;
      ALTER TABLE "pricing_table_plans" ADD COLUMN IF NOT EXISTS "price_suffix" varchar;
      ALTER TABLE "pricing_table_plans" ADD COLUMN IF NOT EXISTS "highlighted" boolean DEFAULT false;
      ALTER TABLE "pricing_table_plans" ADD COLUMN IF NOT EXISTS "cta_label" varchar;
      ALTER TABLE "pricing_table_plans" ADD COLUMN IF NOT EXISTS "cta_href" varchar;
      ALTER TABLE "pricing_table_plans" ADD COLUMN IF NOT EXISTS "cta_new_tab" boolean DEFAULT false;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "pricing_table_plans_features" ADD COLUMN IF NOT EXISTS "text" varchar;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_pricing_table_v" ADD COLUMN IF NOT EXISTS "eyebrow" varchar;
      ALTER TABLE "_pricing_table_v" ADD COLUMN IF NOT EXISTS "heading" varchar;
      ALTER TABLE "_pricing_table_v" ADD COLUMN IF NOT EXISTS "comparison_heading" varchar;
      ALTER TABLE "_pricing_table_v" ADD COLUMN IF NOT EXISTS "comparison_description" varchar;
      ALTER TABLE "_pricing_table_v" ADD COLUMN IF NOT EXISTS "comparison_footnote" varchar;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_pricing_table_v_plans" ADD COLUMN IF NOT EXISTS "badge" varchar;
      ALTER TABLE "_pricing_table_v_plans" ADD COLUMN IF NOT EXISTS "price_suffix" varchar;
      ALTER TABLE "_pricing_table_v_plans" ADD COLUMN IF NOT EXISTS "highlighted" boolean DEFAULT false;
      ALTER TABLE "_pricing_table_v_plans" ADD COLUMN IF NOT EXISTS "cta_label" varchar;
      ALTER TABLE "_pricing_table_v_plans" ADD COLUMN IF NOT EXISTS "cta_href" varchar;
      ALTER TABLE "_pricing_table_v_plans" ADD COLUMN IF NOT EXISTS "cta_new_tab" boolean DEFAULT false;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_pricing_table_v_plans_features" ADD COLUMN IF NOT EXISTS "text" varchar;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'pricing_table' AND column_name = 'title'
        ) THEN
          UPDATE "pricing_table"
          SET "heading" = COALESCE("heading", "title")
          WHERE "heading" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'pricing_table' AND column_name = 'badge'
        ) THEN
          UPDATE "pricing_table"
          SET "eyebrow" = COALESCE("eyebrow", "badge")
          WHERE "eyebrow" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'pricing_table_plans' AND column_name = 'period'
        ) THEN
          UPDATE "pricing_table_plans"
          SET "price_suffix" = COALESCE("price_suffix", "period")
          WHERE "price_suffix" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'pricing_table_plans' AND column_name = 'is_popular'
        ) THEN
          UPDATE "pricing_table_plans"
          SET "highlighted" = COALESCE("is_popular", "highlighted");
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'pricing_table_plans' AND column_name = 'is_highlighted'
        ) THEN
          UPDATE "pricing_table_plans"
          SET "highlighted" = COALESCE("is_highlighted", "highlighted");
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'pricing_table_plans' AND column_name = 'button_text'
        ) THEN
          UPDATE "pricing_table_plans"
          SET "cta_label" = COALESCE("cta_label", "button_text")
          WHERE "cta_label" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'pricing_table_plans' AND column_name = 'href'
        ) THEN
          UPDATE "pricing_table_plans"
          SET "cta_href" = COALESCE("cta_href", "href")
          WHERE "cta_href" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'pricing_table_plans_features' AND column_name = 'feature'
        ) THEN
          UPDATE "pricing_table_plans_features"
          SET "text" = COALESCE("text", "feature")
          WHERE "text" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'pricing_table_plans_features' AND column_name = 'title'
        ) THEN
          UPDATE "pricing_table_plans_features"
          SET "text" = COALESCE("text", "title")
          WHERE "text" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'pricing_table_plans_features' AND column_name = 'description'
        ) THEN
          UPDATE "pricing_table_plans_features"
          SET "text" = COALESCE("text", "description")
          WHERE "text" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '_pricing_table_v' AND column_name = 'title'
        ) THEN
          UPDATE "_pricing_table_v"
          SET "heading" = COALESCE("heading", "title")
          WHERE "heading" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '_pricing_table_v' AND column_name = 'badge'
        ) THEN
          UPDATE "_pricing_table_v"
          SET "eyebrow" = COALESCE("eyebrow", "badge")
          WHERE "eyebrow" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '_pricing_table_v_plans' AND column_name = 'period'
        ) THEN
          UPDATE "_pricing_table_v_plans"
          SET "price_suffix" = COALESCE("price_suffix", "period")
          WHERE "price_suffix" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '_pricing_table_v_plans' AND column_name = 'is_popular'
        ) THEN
          UPDATE "_pricing_table_v_plans"
          SET "highlighted" = COALESCE("is_popular", "highlighted");
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '_pricing_table_v_plans' AND column_name = 'is_highlighted'
        ) THEN
          UPDATE "_pricing_table_v_plans"
          SET "highlighted" = COALESCE("is_highlighted", "highlighted");
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '_pricing_table_v_plans' AND column_name = 'button_text'
        ) THEN
          UPDATE "_pricing_table_v_plans"
          SET "cta_label" = COALESCE("cta_label", "button_text")
          WHERE "cta_label" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '_pricing_table_v_plans' AND column_name = 'href'
        ) THEN
          UPDATE "_pricing_table_v_plans"
          SET "cta_href" = COALESCE("cta_href", "href")
          WHERE "cta_href" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '_pricing_table_v_plans_features' AND column_name = 'feature'
        ) THEN
          UPDATE "_pricing_table_v_plans_features"
          SET "text" = COALESCE("text", "feature")
          WHERE "text" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '_pricing_table_v_plans_features' AND column_name = 'title'
        ) THEN
          UPDATE "_pricing_table_v_plans_features"
          SET "text" = COALESCE("text", "title")
          WHERE "text" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = '_pricing_table_v_plans_features' AND column_name = 'description'
        ) THEN
          UPDATE "_pricing_table_v_plans_features"
          SET "text" = COALESCE("text", "description")
          WHERE "text" IS NULL;
        END IF;
      END $$;
    `),
  )

  await db.execute(
    sql.raw(`
      UPDATE "pricing_table"
      SET "_path" = regexp_replace("_path", '\\.pricing(\\.|$)', '.pricingTable\\1', 'g')
      WHERE "_path" ~ '\\.pricing(\\.|$)';
      UPDATE "_pricing_table_v"
      SET "_path" = regexp_replace("_path", '\\.pricing(\\.|$)', '.pricingTable\\1', 'g')
      WHERE "_path" ~ '\\.pricing(\\.|$)';
    `),
  )
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Repair-only migration. Keep data intact on rollback.
}
