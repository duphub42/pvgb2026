import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

const RENAMES: [string, string][] = [
  ['site_pages_blocks_portfolio_case_grid', 'portfolio_grid'],
  ['site_pages_blocks_portfolio_case_grid_cases', 'portfolio_grid_cases'],
  ['site_pages_blocks_portfolio_case_grid_cases_metrics', 'portfolio_grid_cases_metrics'],
  ['site_pages_blocks_portfolio_case_grid_cases_tags', 'portfolio_grid_cases_tags'],
  ['_site_pages_v_blocks_portfolio_case_grid', '_portfolio_grid_v'],
  ['_site_pages_v_blocks_portfolio_case_grid_cases', '_portfolio_grid_v_cases'],
  ['_site_pages_v_blocks_portfolio_case_grid_cases_metrics', '_portfolio_grid_v_cases_metrics'],
  ['_site_pages_v_blocks_portfolio_case_grid_cases_tags', '_portfolio_grid_v_cases_tags'],
  ['site_pages_blocks_portfolio_kpi_strip', 'portfolio_kpis'],
  ['site_pages_blocks_portfolio_kpi_strip_items', 'portfolio_kpis_items'],
  ['_site_pages_v_blocks_portfolio_kpi_strip', '_portfolio_kpis_v'],
  ['_site_pages_v_blocks_portfolio_kpi_strip_items', '_portfolio_kpis_v_items'],
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const [from, to] of RENAMES) {
    await db.execute(
      sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${from}'
        ) AND NOT EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${to}'
        ) THEN
          ALTER TABLE "${from}" RENAME TO "${to}";
        END IF;
      END $$;
    `),
    )
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (let i = RENAMES.length - 1; i >= 0; i--) {
    const [from, to] = RENAMES[i]!
    await db.execute(
      sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${to}'
        ) AND NOT EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${from}'
        ) THEN
          ALTER TABLE "${to}" RENAME TO "${from}";
        END IF;
      END $$;
    `),
    )
  }
}
