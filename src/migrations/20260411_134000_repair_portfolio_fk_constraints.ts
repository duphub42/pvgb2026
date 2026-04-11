import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Repair FK constraints after table renames to dbName-based portfolio tables.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_grid_cases'
          AND constraint_name = 'site_pages_blocks_portfolio_case_grid_cases__parent_id_fkey'
      ) THEN
        ALTER TABLE "portfolio_grid_cases"
          DROP CONSTRAINT "site_pages_blocks_portfolio_case_grid_cases__parent_id_fkey";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_grid_cases'
          AND constraint_name = 'portfolio_grid_cases_parent_id_fk'
      ) THEN
        ALTER TABLE "portfolio_grid_cases"
          DROP CONSTRAINT "portfolio_grid_cases_parent_id_fk";
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_grid_cases'
          AND constraint_name = 'portfolio_grid_cases_parent_id_fk'
      ) THEN
        ALTER TABLE "portfolio_grid_cases"
          ADD CONSTRAINT "portfolio_grid_cases_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "portfolio_grid"("id") ON DELETE CASCADE;
      END IF;
    END $$;
  `),
  )

  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_grid_cases_metrics'
          AND constraint_name = 'site_pages_blocks_portfolio_case_grid_cases_metrics__parent_id_fkey'
      ) THEN
        ALTER TABLE "portfolio_grid_cases_metrics"
          DROP CONSTRAINT "site_pages_blocks_portfolio_case_grid_cases_metrics__parent_id_fkey";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_grid_cases_metrics'
          AND constraint_name = 'portfolio_grid_cases_metrics_parent_id_fk'
      ) THEN
        ALTER TABLE "portfolio_grid_cases_metrics"
          DROP CONSTRAINT "portfolio_grid_cases_metrics_parent_id_fk";
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_grid_cases_metrics'
          AND constraint_name = 'portfolio_grid_cases_metrics_parent_id_fk'
      ) THEN
        ALTER TABLE "portfolio_grid_cases_metrics"
          ADD CONSTRAINT "portfolio_grid_cases_metrics_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "portfolio_grid_cases"("id") ON DELETE CASCADE;
      END IF;
    END $$;
  `),
  )

  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_grid_cases_tags'
          AND constraint_name = 'site_pages_blocks_portfolio_case_grid_cases_tags__parent_id_fkey'
      ) THEN
        ALTER TABLE "portfolio_grid_cases_tags"
          DROP CONSTRAINT "site_pages_blocks_portfolio_case_grid_cases_tags__parent_id_fkey";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_grid_cases_tags'
          AND constraint_name = 'portfolio_grid_cases_tags_parent_id_fk'
      ) THEN
        ALTER TABLE "portfolio_grid_cases_tags"
          DROP CONSTRAINT "portfolio_grid_cases_tags_parent_id_fk";
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_grid_cases_tags'
          AND constraint_name = 'portfolio_grid_cases_tags_parent_id_fk'
      ) THEN
        ALTER TABLE "portfolio_grid_cases_tags"
          ADD CONSTRAINT "portfolio_grid_cases_tags_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "portfolio_grid_cases"("id") ON DELETE CASCADE;
      END IF;
    END $$;
  `),
  )

  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_kpis_items'
          AND constraint_name = 'site_pages_blocks_portfolio_kpi_strip_items__parent_id_fkey'
      ) THEN
        ALTER TABLE "portfolio_kpis_items"
          DROP CONSTRAINT "site_pages_blocks_portfolio_kpi_strip_items__parent_id_fkey";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_kpis_items'
          AND constraint_name = 'portfolio_kpis_items_parent_id_fk'
      ) THEN
        ALTER TABLE "portfolio_kpis_items"
          DROP CONSTRAINT "portfolio_kpis_items_parent_id_fk";
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = 'portfolio_kpis_items'
          AND constraint_name = 'portfolio_kpis_items_parent_id_fk'
      ) THEN
        ALTER TABLE "portfolio_kpis_items"
          ADD CONSTRAINT "portfolio_kpis_items_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "portfolio_kpis"("id") ON DELETE CASCADE;
      END IF;
    END $$;
  `),
  )

  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_grid_v_cases'
          AND constraint_name = '_site_pages_v_blocks_portfolio_case_grid_cases__parent_id_fkey'
      ) THEN
        ALTER TABLE "_portfolio_grid_v_cases"
          DROP CONSTRAINT "_site_pages_v_blocks_portfolio_case_grid_cases__parent_id_fkey";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_grid_v_cases'
          AND constraint_name = '_portfolio_grid_v_cases_parent_id_fk'
      ) THEN
        ALTER TABLE "_portfolio_grid_v_cases"
          DROP CONSTRAINT "_portfolio_grid_v_cases_parent_id_fk";
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_grid_v_cases'
          AND constraint_name = '_portfolio_grid_v_cases_parent_id_fk'
      ) THEN
        ALTER TABLE "_portfolio_grid_v_cases"
          ADD CONSTRAINT "_portfolio_grid_v_cases_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "_portfolio_grid_v"("id") ON DELETE CASCADE;
      END IF;
    END $$;
  `),
  )

  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_grid_v_cases_metrics'
          AND constraint_name = '_site_pages_v_blocks_portfolio_case_grid_cases_metrics__parent_id_fkey'
      ) THEN
        ALTER TABLE "_portfolio_grid_v_cases_metrics"
          DROP CONSTRAINT "_site_pages_v_blocks_portfolio_case_grid_cases_metrics__parent_id_fkey";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_grid_v_cases_metrics'
          AND constraint_name = '_portfolio_grid_v_cases_metrics_parent_id_fk'
      ) THEN
        ALTER TABLE "_portfolio_grid_v_cases_metrics"
          DROP CONSTRAINT "_portfolio_grid_v_cases_metrics_parent_id_fk";
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_grid_v_cases_metrics'
          AND constraint_name = '_portfolio_grid_v_cases_metrics_parent_id_fk'
      ) THEN
        ALTER TABLE "_portfolio_grid_v_cases_metrics"
          ADD CONSTRAINT "_portfolio_grid_v_cases_metrics_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "_portfolio_grid_v_cases"("id") ON DELETE CASCADE;
      END IF;
    END $$;
  `),
  )

  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_grid_v_cases_tags'
          AND constraint_name = '_site_pages_v_blocks_portfolio_case_grid_cases_tags__parent_id_fkey'
      ) THEN
        ALTER TABLE "_portfolio_grid_v_cases_tags"
          DROP CONSTRAINT "_site_pages_v_blocks_portfolio_case_grid_cases_tags__parent_id_fkey";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_grid_v_cases_tags'
          AND constraint_name = '_portfolio_grid_v_cases_tags_parent_id_fk'
      ) THEN
        ALTER TABLE "_portfolio_grid_v_cases_tags"
          DROP CONSTRAINT "_portfolio_grid_v_cases_tags_parent_id_fk";
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_grid_v_cases_tags'
          AND constraint_name = '_portfolio_grid_v_cases_tags_parent_id_fk'
      ) THEN
        ALTER TABLE "_portfolio_grid_v_cases_tags"
          ADD CONSTRAINT "_portfolio_grid_v_cases_tags_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "_portfolio_grid_v_cases"("id") ON DELETE CASCADE;
      END IF;
    END $$;
  `),
  )

  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_kpis_v_items'
          AND constraint_name = '_site_pages_v_blocks_portfolio_kpi_strip_items__parent_id_fkey'
      ) THEN
        ALTER TABLE "_portfolio_kpis_v_items"
          DROP CONSTRAINT "_site_pages_v_blocks_portfolio_kpi_strip_items__parent_id_fkey";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_kpis_v_items'
          AND constraint_name = '_portfolio_kpis_v_items_parent_id_fk'
      ) THEN
        ALTER TABLE "_portfolio_kpis_v_items"
          DROP CONSTRAINT "_portfolio_kpis_v_items_parent_id_fk";
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'public'
          AND table_name = '_portfolio_kpis_v_items'
          AND constraint_name = '_portfolio_kpis_v_items_parent_id_fk'
      ) THEN
        ALTER TABLE "_portfolio_kpis_v_items"
          ADD CONSTRAINT "_portfolio_kpis_v_items_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "_portfolio_kpis_v"("id") ON DELETE CASCADE;
      END IF;
    END $$;
  `),
  )
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Repair-only migration, no destructive rollback.
}
