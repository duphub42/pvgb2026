-- Add missing hero columns to site_pages and _site_pages_v tables

-- Add hero_background_glow to site_pages
ALTER TABLE "site_pages" ADD COLUMN "hero_background_glow" varchar;

-- Add hero_label to site_pages
ALTER TABLE "site_pages" ADD COLUMN "hero_label" varchar;

-- Add version_hero_background_glow to _site_pages_v
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_background_glow" varchar;

-- Add version_hero_label to _site_pages_v
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_label" varchar;
