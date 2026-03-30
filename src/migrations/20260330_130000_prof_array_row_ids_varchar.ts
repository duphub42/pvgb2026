import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Profil block nested arrays were created with `id serial` in 20260329_400000.
 * Payload/Drizzle inserts string IDs (same as consulting overview benefit_items).
 * Align DB columns with varchar `id` and fix FK chains where a child references parent `id`.
 */

function alterIdToVarcharIfInteger(table: string): string {
  return `
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = '${table}'
      AND column_name = 'id' AND udt_name = 'int4'
  ) THEN
    ALTER TABLE "${table}" ALTER COLUMN "id" DROP DEFAULT;
    ALTER TABLE "${table}" ALTER COLUMN "id" TYPE varchar USING "id"::text;
  END IF;
END $$;
`
}

function migrateFkChain(args: {
  childTable: string
  parentTable: string
  fkName: string
}): string {
  const { childTable, parentTable, fkName } = args
  return `
DO $$
DECLARE r record;
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = '${parentTable}'
      AND column_name = 'id' AND udt_name = 'int4'
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
      EXECUTE format('ALTER TABLE "${childTable}" DROP CONSTRAINT %I', r.fk_name);
    END LOOP;

    ALTER TABLE "${parentTable}" ALTER COLUMN "id" DROP DEFAULT;
    ALTER TABLE "${parentTable}" ALTER COLUMN "id" TYPE varchar USING "id"::text;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = '${childTable}'
        AND column_name = '_parent_id' AND udt_name = 'int4'
    ) THEN
      ALTER TABLE "${childTable}" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::text;
    END IF;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = '${childTable}'
        AND column_name = 'id' AND udt_name = 'int4'
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
        childTable: 'prof_kern_bereiche_details',
        parentTable: 'prof_kern_bereiche',
        fkName: 'prof_kern_bereiche_details_parent_fk',
      }),
    ),
  )
  await db.execute(
    sql.raw(
      migrateFkChain({
        childTable: 'prof_skills_spalten_skills',
        parentTable: 'prof_skills_spalten',
        fkName: 'prof_skills_spalten_skills_parent_fk',
      }),
    ),
  )

  for (const t of [
    'prof_ueber_werte',
    'prof_weg_eintraege',
    'prof_zahl_items',
    'prof_tools_tools',
    'prof_lang_zert_sprachen',
    'prof_lang_zert_zertifikate',
  ]) {
    await db.execute(sql.raw(alterIdToVarcharIfInteger(t)))
  }

  await db.execute(
    sql.raw(
      migrateFkChain({
        childTable: '_prof_kern_v_bereiche_details',
        parentTable: '_prof_kern_v_bereiche',
        fkName: '_prof_kern_v_bereiche_details_parent_fk',
      }),
    ),
  )
  await db.execute(
    sql.raw(
      migrateFkChain({
        childTable: '_prof_skills_v_spalten_skills',
        parentTable: '_prof_skills_v_spalten',
        fkName: '_prof_skills_v_spalten_skills_parent_fk',
      }),
    ),
  )

  for (const t of [
    '_prof_ueber_v_werte',
    '_prof_weg_v_eintraege',
    '_prof_zahl_v_items',
    '_prof_tools_v_tools',
    '_prof_lang_zert_v_sprachen',
    '_prof_lang_zert_v_zertifikate',
  ]) {
    await db.execute(sql.raw(alterIdToVarcharIfInteger(t)))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`SELECT 1;`))
}
