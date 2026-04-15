-- Pricing Table Block Tables (dbName aliases)

-- pricing_table (dbName for site_pages_blocks_pricing)
CREATE TABLE IF NOT EXISTS "pricing_table" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "block_background" varchar,
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" varchar,
  "block_overlay_opacity" integer,
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

-- pricing_table_plans (nested array)
CREATE TABLE IF NOT EXISTS "pricing_table_plans" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL REFERENCES "pricing_table"("id") ON DELETE CASCADE,
  "id" varchar PRIMARY KEY NOT NULL,
  "name" varchar,
  "badge" varchar,
  "description" varchar,
  "price" varchar,
  "price_suffix" varchar,
  "highlighted" integer DEFAULT 0,
  "cta_label" varchar,
  "cta_href" varchar,
  "cta_new_tab" integer DEFAULT 0
);

CREATE INDEX IF NOT EXISTS "pricing_table_plans_order_idx" ON "pricing_table_plans" ("_order");
CREATE INDEX IF NOT EXISTS "pricing_table_plans_parent_id_idx" ON "pricing_table_plans" ("_parent_id");

-- pricing_table_plans_features (nested in plans)
CREATE TABLE IF NOT EXISTS "pricing_table_plans_features" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL REFERENCES "pricing_table_plans"("id") ON DELETE CASCADE,
  "id" varchar PRIMARY KEY NOT NULL,
  "text" varchar
);

CREATE INDEX IF NOT EXISTS "pricing_table_plans_features_order_idx" ON "pricing_table_plans_features" ("_order");
CREATE INDEX IF NOT EXISTS "pricing_table_plans_features_parent_id_idx" ON "pricing_table_plans_features" ("_parent_id");

-- pricing_table_comparison_rows
CREATE TABLE IF NOT EXISTS "pricing_table_comparison_rows" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL REFERENCES "pricing_table"("id") ON DELETE CASCADE,
  "id" varchar PRIMARY KEY NOT NULL,
  "feature" varchar
);

CREATE INDEX IF NOT EXISTS "pricing_table_comparison_rows_order_idx" ON "pricing_table_comparison_rows" ("_order");
CREATE INDEX IF NOT EXISTS "pricing_table_comparison_rows_parent_id_idx" ON "pricing_table_comparison_rows" ("_parent_id");

-- pricing_table_comparison_rows_values (nested in comparison_rows)
CREATE TABLE IF NOT EXISTS "pricing_table_comparison_rows_values" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL REFERENCES "pricing_table_comparison_rows"("id") ON DELETE CASCADE,
  "id" varchar PRIMARY KEY NOT NULL,
  "type" varchar,
  "label" varchar
);

CREATE INDEX IF NOT EXISTS "pricing_table_comparison_rows_values_order_idx" ON "pricing_table_comparison_rows_values" ("_order");
CREATE INDEX IF NOT EXISTS "pricing_table_comparison_rows_values_parent_id_idx" ON "pricing_table_comparison_rows_values" ("_parent_id");

-- Version tables
CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_pricingTable" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" varchar,
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" varchar,
  "block_overlay_opacity" integer,
  "eyebrow" varchar,
  "heading" varchar,
  "description" varchar,
  "comparison_heading" varchar,
  "comparison_description" varchar,
  "comparison_footnote" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_order_idx" ON "_site_pages_v_blocks_pricingTable" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_parent_id_idx" ON "_site_pages_v_blocks_pricingTable" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_path_idx" ON "_site_pages_v_blocks_pricingTable" ("_path");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_pricingTable_plans" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_pricingTable"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "name" varchar,
  "badge" varchar,
  "description" varchar,
  "price" varchar,
  "price_suffix" varchar,
  "highlighted" integer DEFAULT 0,
  "cta_label" varchar,
  "cta_href" varchar,
  "cta_new_tab" integer DEFAULT 0,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_plans_order_idx" ON "_site_pages_v_blocks_pricingTable_plans" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_plans_parent_id_idx" ON "_site_pages_v_blocks_pricingTable_plans" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_pricingTable_plans_features" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_pricingTable_plans"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "text" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_plans_features_order_idx" ON "_site_pages_v_blocks_pricingTable_plans_features" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_plans_features_parent_id_idx" ON "_site_pages_v_blocks_pricingTable_plans_features" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_pricingTable_comparisonRows" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_pricingTable"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "feature" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_comparisonRows_order_idx" ON "_site_pages_v_blocks_pricingTable_comparisonRows" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_comparisonRows_parent_id_idx" ON "_site_pages_v_blocks_pricingTable_comparisonRows" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_pricingTable_comparisonRows_values" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_pricingTable_comparisonRows"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "type" varchar,
  "label" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_comparisonRows_values_order_idx" ON "_site_pages_v_blocks_pricingTable_comparisonRows_values" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_pricingTable_comparisonRows_values_parent_id_idx" ON "_site_pages_v_blocks_pricingTable_comparisonRows_values" ("_parent_id");
