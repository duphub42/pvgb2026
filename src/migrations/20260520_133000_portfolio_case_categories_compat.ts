import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
DO $$
BEGIN
  IF to_regclass('public.portfolio_grid_cases_categories') IS NOT NULL THEN
    ALTER TABLE "portfolio_grid_cases_categories"
      ALTER COLUMN "id" SET DEFAULT md5(random()::text || clock_timestamp()::text);

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'portfolio_grid_cases_categories' AND column_name = '_order'
    ) THEN
      ALTER TABLE "portfolio_grid_cases_categories" ALTER COLUMN "_order" DROP NOT NULL;
    END IF;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'portfolio_grid_cases_categories' AND column_name = '_parent_id'
    ) THEN
      ALTER TABLE "portfolio_grid_cases_categories" ALTER COLUMN "_parent_id" DROP NOT NULL;
    END IF;

    CREATE OR REPLACE FUNCTION sync_portfolio_grid_cases_categories_cols()
    RETURNS trigger AS $$
    BEGIN
      IF NEW.parent_id IS NULL THEN NEW.parent_id := NEW._parent_id; END IF;
      IF NEW._parent_id IS NULL THEN NEW._parent_id := NEW.parent_id; END IF;
      IF NEW."order" IS NULL THEN NEW."order" := NEW._order; END IF;
      IF NEW._order IS NULL THEN NEW._order := NEW."order"; END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS trg_sync_portfolio_grid_cases_categories_cols ON "portfolio_grid_cases_categories";
    CREATE TRIGGER trg_sync_portfolio_grid_cases_categories_cols
    BEFORE INSERT OR UPDATE ON "portfolio_grid_cases_categories"
    FOR EACH ROW EXECUTE FUNCTION sync_portfolio_grid_cases_categories_cols();
  END IF;

  IF to_regclass('public._portfolio_grid_v_cases_categories') IS NOT NULL THEN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = '_portfolio_grid_v_cases_categories' AND column_name = '_order'
    ) THEN
      ALTER TABLE "_portfolio_grid_v_cases_categories" ALTER COLUMN "_order" DROP NOT NULL;
    END IF;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = '_portfolio_grid_v_cases_categories' AND column_name = '_parent_id'
    ) THEN
      ALTER TABLE "_portfolio_grid_v_cases_categories" ALTER COLUMN "_parent_id" DROP NOT NULL;
    END IF;

    CREATE OR REPLACE FUNCTION sync__portfolio_grid_v_cases_categories_cols()
    RETURNS trigger AS $$
    BEGIN
      IF NEW.parent_id IS NULL THEN NEW.parent_id := NEW._parent_id; END IF;
      IF NEW._parent_id IS NULL THEN NEW._parent_id := NEW.parent_id; END IF;
      IF NEW."order" IS NULL THEN NEW."order" := NEW._order; END IF;
      IF NEW._order IS NULL THEN NEW._order := NEW."order"; END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS trg_sync__portfolio_grid_v_cases_categories_cols ON "_portfolio_grid_v_cases_categories";
    CREATE TRIGGER trg_sync__portfolio_grid_v_cases_categories_cols
    BEFORE INSERT OR UPDATE ON "_portfolio_grid_v_cases_categories"
    FOR EACH ROW EXECUTE FUNCTION sync__portfolio_grid_v_cases_categories_cols();
  END IF;
END
$$;
`),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
DO $$
BEGIN
  IF to_regclass('public.portfolio_grid_cases_categories') IS NOT NULL THEN
    DROP TRIGGER IF EXISTS trg_sync_portfolio_grid_cases_categories_cols ON "portfolio_grid_cases_categories";
    DROP FUNCTION IF EXISTS sync_portfolio_grid_cases_categories_cols();
  END IF;

  IF to_regclass('public._portfolio_grid_v_cases_categories') IS NOT NULL THEN
    DROP TRIGGER IF EXISTS trg_sync__portfolio_grid_v_cases_categories_cols ON "_portfolio_grid_v_cases_categories";
    DROP FUNCTION IF EXISTS sync__portfolio_grid_v_cases_categories_cols();
  END IF;
END
$$;
`),
  )
}
