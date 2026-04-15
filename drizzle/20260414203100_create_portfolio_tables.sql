-- Portfolio Block Tables (dbName aliases)

-- portfolio_grid (dbName for site_pages_blocks_portfolioCaseGrid)
CREATE TABLE IF NOT EXISTS "portfolio_grid" (
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
  "intro" varchar,
  "layout_variant" varchar,
  "block_name" varchar
);

CREATE INDEX IF NOT EXISTS "portfolio_grid_order_idx" ON "portfolio_grid" ("_order");
CREATE INDEX IF NOT EXISTS "portfolio_grid_parent_id_idx" ON "portfolio_grid" ("_parent_id");
CREATE INDEX IF NOT EXISTS "portfolio_grid_path_idx" ON "portfolio_grid" ("_path");

-- portfolio_grid_cases (nested array)
CREATE TABLE IF NOT EXISTS "portfolio_grid_cases" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL REFERENCES "portfolio_grid"("id") ON DELETE CASCADE,
  "id" varchar PRIMARY KEY NOT NULL,
  "discipline" varchar,
  "title" varchar,
  "client" varchar,
  "industry" varchar,
  "summary" varchar,
  "challenge" varchar,
  "approach" varchar,
  "result" varchar,
  "cover_image_id" integer,
  "cta_label" varchar,
  "cta_href" varchar,
  "featured" integer DEFAULT 0
);

CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_order_idx" ON "portfolio_grid_cases" ("_order");
CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_parent_id_idx" ON "portfolio_grid_cases" ("_parent_id");

-- portfolio_grid_cases_metrics (nested in cases)
CREATE TABLE IF NOT EXISTS "portfolio_grid_cases_metrics" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL REFERENCES "portfolio_grid_cases"("id") ON DELETE CASCADE,
  "id" varchar PRIMARY KEY NOT NULL,
  "value" varchar,
  "label" varchar
);

CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_metrics_order_idx" ON "portfolio_grid_cases_metrics" ("_order");
CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_metrics_parent_id_idx" ON "portfolio_grid_cases_metrics" ("_parent_id");

-- portfolio_grid_cases_tags (nested in cases)
CREATE TABLE IF NOT EXISTS "portfolio_grid_cases_tags" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL REFERENCES "portfolio_grid_cases"("id") ON DELETE CASCADE,
  "id" varchar PRIMARY KEY NOT NULL,
  "label" varchar
);

CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_tags_order_idx" ON "portfolio_grid_cases_tags" ("_order");
CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_tags_parent_id_idx" ON "portfolio_grid_cases_tags" ("_parent_id");

-- portfolio_kpis (dbName for site_pages_blocks_portfolioKpiStrip)
CREATE TABLE IF NOT EXISTS "portfolio_kpis" (
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
  "intro" varchar,
  "variant" varchar,
  "block_name" varchar
);

CREATE INDEX IF NOT EXISTS "portfolio_kpis_order_idx" ON "portfolio_kpis" ("_order");
CREATE INDEX IF NOT EXISTS "portfolio_kpis_parent_id_idx" ON "portfolio_kpis" ("_parent_id");
CREATE INDEX IF NOT EXISTS "portfolio_kpis_path_idx" ON "portfolio_kpis" ("_path");

-- portfolio_kpis_items (nested array)
CREATE TABLE IF NOT EXISTS "portfolio_kpis_items" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL REFERENCES "portfolio_kpis"("id") ON DELETE CASCADE,
  "id" varchar PRIMARY KEY NOT NULL,
  "value" varchar,
  "label" varchar,
  "context" varchar,
  "trend" varchar,
  "delta" varchar
);

CREATE INDEX IF NOT EXISTS "portfolio_kpis_items_order_idx" ON "portfolio_kpis_items" ("_order");
CREATE INDEX IF NOT EXISTS "portfolio_kpis_items_parent_id_idx" ON "portfolio_kpis_items" ("_parent_id");

-- Version tables for portfolio_grid
CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid" (
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
  "intro" varchar,
  "layout_variant" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_order_idx" ON "_site_pages_v_blocks_portfolioCaseGrid" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_parent_id_idx" ON "_site_pages_v_blocks_portfolioCaseGrid" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_path_idx" ON "_site_pages_v_blocks_portfolioCaseGrid" ("_path");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_cases" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_portfolioCaseGrid"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "discipline" varchar,
  "title" varchar,
  "client" varchar,
  "industry" varchar,
  "summary" varchar,
  "challenge" varchar,
  "approach" varchar,
  "result" varchar,
  "cover_image_id" integer,
  "cta_label" varchar,
  "cta_href" varchar,
  "featured" integer DEFAULT 0,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_cases_order_idx" ON "_site_pages_v_blocks_portfolioCaseGrid_cases" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_cases_parent_id_idx" ON "_site_pages_v_blocks_portfolioCaseGrid_cases" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_cases_metrics" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_portfolioCaseGrid_cases"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "value" varchar,
  "label" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_cases_metrics_order_idx" ON "_site_pages_v_blocks_portfolioCaseGrid_cases_metrics" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_cases_metrics_parent_id_idx" ON "_site_pages_v_blocks_portfolioCaseGrid_cases_metrics" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_cases_tags" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_portfolioCaseGrid_cases"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "label" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_cases_tags_order_idx" ON "_site_pages_v_blocks_portfolioCaseGrid_cases_tags" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioCaseGrid_cases_tags_parent_id_idx" ON "_site_pages_v_blocks_portfolioCaseGrid_cases_tags" ("_parent_id");

-- Version tables for portfolio_kpis
CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolioKpiStrip" (
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
  "intro" varchar,
  "variant" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioKpiStrip_order_idx" ON "_site_pages_v_blocks_portfolioKpiStrip" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioKpiStrip_parent_id_idx" ON "_site_pages_v_blocks_portfolioKpiStrip" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioKpiStrip_path_idx" ON "_site_pages_v_blocks_portfolioKpiStrip" ("_path");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolioKpiStrip_items" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_portfolioKpiStrip"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "value" varchar,
  "label" varchar,
  "context" varchar,
  "trend" varchar,
  "delta" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioKpiStrip_items_order_idx" ON "_site_pages_v_blocks_portfolioKpiStrip_items" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolioKpiStrip_items_parent_id_idx" ON "_site_pages_v_blocks_portfolioKpiStrip_items" ("_parent_id");
