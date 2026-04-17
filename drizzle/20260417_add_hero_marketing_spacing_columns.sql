-- Migration: Add missing block_spacing columns to site_pages__blocks_heroMarketing
-- Fixes: column site_pages__blocks_heroMarketing.block_spacing_padding does not exist
-- Created: 2026-04-17

ALTER TABLE "site_pages_blocks_hero_marketing" 
ADD COLUMN IF NOT EXISTS "block_spacing_padding" varchar,
ADD COLUMN IF NOT EXISTS "block_spacing_padding_top" varchar,
ADD COLUMN IF NOT EXISTS "block_spacing_margin_bottom" varchar;
