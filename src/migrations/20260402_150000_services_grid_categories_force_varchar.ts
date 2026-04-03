import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Enforce string IDs on services_grid categories/two-level children.
 * Covers remaining drift where older DB rows may still have integer column types.
 */
const TABLES = [
  'site_pages_blocks_services_grid_categories',
  'services_grid_categories',
  '_site_pages_v_blocks_services_grid_categories',
  '_services_grid_v_categories',
]

const CHILD_TABLES = [
  'site_pages_blocks_services_grid_categories_services',
  'services_grid_categories_services',
  '_site_pages_v_blocks_services_grid_categories_services',
  '_services_grid_v_categories_services',
]

function alterIdToVarcharIfInteger(table: string): string {
  return `
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = '${table}' AND column_name = 'id' AND udt_name = 'int4'
  ) THEN
    ALTER TABLE "${table}" ALTER COLUMN "id" DROP DEFAULT;
    ALTER TABLE "${table}" ALTER COLUMN "id" TYPE varchar USING "id"::text;
  END IF;
END $$;
`
}

function alterParentIdToVarcharIfInteger(table: string): string {
  return `
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = '${table}' AND column_name = '_parent_id' AND udt_name = 'int4'
  ) THEN
    ALTER TABLE "${table}" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::text;
  END IF;
END $$;
`
}

function migrateFkChain(args: { childTable: string; parentTable: string; fkName: string }): string {
  const { childTable, parentTable, fkName } = args
  return `
DO $$
DECLARE r record;
    parent_oid oid;
BEGIN
  SELECT oid INTO parent_oid FROM pg_class WHERE relname = '${parentTable}' AND relnamespace = 'public'::regnamespace;

  IF parent_oid IS NULL THEN
    RETURN;
  END IF;

  -- Drop any foreign keys that reference parent id to avoid type-change conflict
  FOR r IN (
    SELECT c.conname AS fk_name, cl.relname AS child_rel
    FROM pg_constraint c
    JOIN pg_class cl ON c.conrelid = cl.oid
    WHERE c.contype = 'f' AND c.confrelid = parent_oid
  ) LOOP
    EXECUTE format('ALTER TABLE "%s" DROP CONSTRAINT IF EXISTS %I', r.child_rel, r.fk_name);
  END LOOP;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = '${parentTable}' AND column_name = 'id' AND udt_name = 'int4'
  ) AND EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = '${childTable}'
  ) THEN
    FOR r IN (
      SELECT c.conname AS fk_name
      FROM pg_constraint c
      JOIN pg_class cl ON c.conrelid = cl.oid
      WHERE cl.relname = '${childTable}' AND c.contype = 'f'
    ) LOOP
      EXECUTE format('ALTER TABLE "${childTable}" DROP CONSTRAINT IF EXISTS %I', r.fk_name);
    END LOOP;

    ALTER TABLE "${parentTable}" ALTER COLUMN "id" DROP DEFAULT;
    ALTER TABLE "${parentTable}" ALTER COLUMN "id" TYPE varchar USING "id"::text;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = '${childTable}' AND column_name = '_parent_id' AND udt_name = 'int4'
    ) THEN
      ALTER TABLE "${childTable}" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::text;
    END IF;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = '${childTable}' AND column_name = 'id' AND udt_name = 'int4'
    ) THEN
      ALTER TABLE "${childTable}" ALTER COLUMN "id" DROP DEFAULT;
      ALTER TABLE "${childTable}" ALTER COLUMN "id" TYPE varchar USING "id"::text;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint c
      JOIN pg_class cl ON c.conrelid = cl.oid
      WHERE cl.relname = '${childTable}' AND c.conname = '${fkName}'
    ) THEN
      EXECUTE format(
        'ALTER TABLE "${childTable}" ADD CONSTRAINT %I FOREIGN KEY ("_parent_id") REFERENCES "${parentTable}"("id") ON DELETE CASCADE',
        '${fkName}'
      );
    END IF;
  END IF;
END $$;
`
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(
      migrateFkChain({
        childTable: 'site_pages_blocks_services_grid_categories_services',
        parentTable: 'site_pages_blocks_services_grid_categories',
        fkName: 'site_pages_blocks_services_grid_categories_services_parent_id_fk',
      }),
    ),
  )

  await db.execute(
    sql.raw(
      migrateFkChain({
        childTable: 'services_grid_categories_services',
        parentTable: 'services_grid_categories',
        fkName: 'services_grid_categories_services_parent_id_fk',
      }),
    ),
  )

  await db.execute(
    sql.raw(
      migrateFkChain({
        childTable: '_site_pages_v_blocks_services_grid_categories_services',
        parentTable: '_site_pages_v_blocks_services_grid_categories',
        fkName: '_site_pages_v_blocks_services_grid_categories_services_parent_id_fk',
      }),
    ),
  )

  await db.execute(
    sql.raw(
      migrateFkChain({
        childTable: '_services_grid_v_categories_services',
        parentTable: '_services_grid_v_categories',
        fkName: '_services_grid_v_categories_services_parent_id_fk',
      }),
    ),
  )

  for (const table of TABLES) {
    await db.execute(sql.raw(alterIdToVarcharIfInteger(table)))
  }

  for (const table of CHILD_TABLES) {
    await db.execute(sql.raw(alterParentIdToVarcharIfInteger(table)))
    await db.execute(sql.raw(alterIdToVarcharIfInteger(table)))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Do not downgrade to integer by default; this is a strengthening migration.
  // Included for migration-tool consistency but intentionally no-op.
  await db.execute(sql.raw('SELECT 1'))
}
