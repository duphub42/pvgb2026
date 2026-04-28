import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

type ParentFkRepair = {
  childTable: string
  parentTable: string
  fkName: string
}

const REPAIRS: ParentFkRepair[] = [
  {
    childTable: 'services_grid_categories_services',
    parentTable: 'services_grid_categories',
    fkName: 'services_grid_categories_services_parent_id_fk',
  },
  {
    childTable: '_services_grid_v_categories_services',
    parentTable: '_services_grid_v_categories',
    fkName: '_services_grid_v_categories_services_parent_id_fk',
  },
]

function ensureCascadeParentFkSQL({ childTable, parentTable, fkName }: ParentFkRepair): string {
  return `
DO $$
DECLARE
  r record;
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = '${childTable}'
  ) AND EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = '${parentTable}'
  ) THEN
    -- Remove orphaned rows first so FK creation cannot fail.
    EXECUTE format(
      'DELETE FROM "%s" c WHERE c."_parent_id" IS NOT NULL AND NOT EXISTS (SELECT 1 FROM "%s" p WHERE p."id"::text = c."_parent_id"::text)',
      '${childTable}',
      '${parentTable}'
    );

    -- Drop any FK currently attached to child._parent_id (wrong name / wrong parent / no cascade).
    FOR r IN (
      SELECT con.conname
      FROM pg_constraint con
      JOIN pg_class rel ON rel.oid = con.conrelid
      JOIN pg_namespace ns ON ns.oid = rel.relnamespace
      JOIN unnest(con.conkey) AS keynum(attnum) ON true
      JOIN pg_attribute att ON att.attrelid = rel.oid AND att.attnum = keynum.attnum
      WHERE ns.nspname = 'public'
        AND rel.relname = '${childTable}'
        AND con.contype = 'f'
        AND att.attname = '_parent_id'
    ) LOOP
      EXECUTE format('ALTER TABLE "${childTable}" DROP CONSTRAINT IF EXISTS %I', r.conname);
    END LOOP;

    -- Recreate expected cascade FK.
    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.table_constraints
      WHERE table_schema = 'public'
        AND table_name = '${childTable}'
        AND constraint_name = '${fkName}'
    ) THEN
      EXECUTE format(
        'ALTER TABLE "%s" ADD CONSTRAINT %I FOREIGN KEY ("_parent_id") REFERENCES "%s"("id") ON DELETE CASCADE',
        '${childTable}',
        '${fkName}',
        '${parentTable}'
      );
    END IF;
  END IF;
END $$;
`
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const repair of REPAIRS) {
    await db.execute(sql.raw(ensureCascadeParentFkSQL(repair)))
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Repair-only migration. No destructive rollback.
}
