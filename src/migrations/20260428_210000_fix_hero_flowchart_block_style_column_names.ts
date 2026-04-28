import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

const TABLES = ['site_pages_blocks_hero_flowchart', '_site_pages_v_blocks_hero_flowchart'] as const

const COLUMN_RENAMES = [
  ['sp', 'block_spacing_padding'],
  ['spt', 'block_spacing_padding_top'],
  ['smb', 'block_spacing_margin_bottom'],
  ['ct', 'block_container'],
  ['bg', 'block_background'],
  ['bs', 'block_border_style'],
  ['br', 'block_border_radius'],
  ['oc', 'block_overlay_color'],
  ['cs', 'block_content_spacing'],
  ['an', 'block_animation'],
] as const

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const tableName of TABLES) {
    for (const [oldColumnName, newColumnName] of COLUMN_RENAMES) {
      await db.execute(
        sql.raw(`
          DO $$
          BEGIN
            IF EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_schema = 'public'
                AND table_name = '${tableName}'
                AND column_name = '${oldColumnName}'
            ) AND NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_schema = 'public'
                AND table_name = '${tableName}'
                AND column_name = '${newColumnName}'
            ) THEN
              EXECUTE 'ALTER TABLE "${tableName}" RENAME COLUMN "${oldColumnName}" TO "${newColumnName}"';
            END IF;
          END $$;
        `),
      )
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const tableName of TABLES) {
    for (const [oldColumnName, newColumnName] of COLUMN_RENAMES) {
      await db.execute(
        sql.raw(`
          DO $$
          BEGIN
            IF EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_schema = 'public'
                AND table_name = '${tableName}'
                AND column_name = '${newColumnName}'
            ) AND NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_schema = 'public'
                AND table_name = '${tableName}'
                AND column_name = '${oldColumnName}'
            ) THEN
              EXECUTE 'ALTER TABLE "${tableName}" RENAME COLUMN "${newColumnName}" TO "${oldColumnName}"';
            END IF;
          END $$;
        `),
      )
    }
  }
}