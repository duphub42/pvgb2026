import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Entfernt legacy HeroMarketing-Block-Tabellen + Enums.
 * Der Block wurde aus der Payload-Config entfernt und wird nicht mehr verwendet.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      DROP TABLE IF EXISTS "site_pages_blocks_hero_marketing" CASCADE;
      DROP TABLE IF EXISTS "_site_pages_v_blocks_hero_marketing" CASCADE;

      DROP TYPE IF EXISTS "enum_site_pages_blocks_hero_marketing_block_background";
      DROP TYPE IF EXISTS "enum_site_pages_blocks_hero_marketing_block_overlay_color";
      DROP TYPE IF EXISTS "enum__site_pages_v_blocks_hero_marketing_block_background";
      DROP TYPE IF EXISTS "enum__site_pages_v_blocks_hero_marketing_block_overlay_color";
    `),
  )
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Intentionally no-op: legacy block remains removed.
}
