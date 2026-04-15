-- Add missing icon column to consulting_overview_benefit_items tables

-- Main table
ALTER TABLE "site_pages_blocks_consulting_overview_benefit_items" ADD COLUMN "icon" varchar;

-- Version table
ALTER TABLE "_site_pages_v_blocks_consulting_overview_benefit_items" ADD COLUMN "icon" varchar;
