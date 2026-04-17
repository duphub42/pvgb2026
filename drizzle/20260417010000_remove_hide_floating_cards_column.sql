-- Migration: Remove hero_hide_floating_cards column from site_pages tables
-- Reason: Floating cards feature completely removed from codebase
-- Created: 2026-04-17

-- Remove hero_hide_floating_cards from site_pages table
ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_hide_floating_cards";

-- Remove version_hero_hide_floating_cards from _site_pages_v table (versions)
ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_hide_floating_cards";
