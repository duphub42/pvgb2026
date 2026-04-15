-- Add missing hero_background_glow column to site_pages table
ALTER TABLE "site_pages" ADD COLUMN "hero_background_glow" boolean DEFAULT true;
