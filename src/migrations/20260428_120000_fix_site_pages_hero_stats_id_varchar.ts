import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

const TABLE = 'site_pages_hero_stats'
const SEQ = `${TABLE}_id_seq`

/**
 * Corrective migration:
 * - live table `site_pages_hero_stats` must keep string IDs because Payload sends
 *   explicit string `id` values for normal document updates.
 * - version table `_site_pages_v_version_hero_stats` remains integer/default-based.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`ALTER TABLE "${TABLE}" DROP CONSTRAINT IF EXISTS "${TABLE}_pkey";`)
  await db.execute(`ALTER TABLE "${TABLE}" ALTER COLUMN "id" TYPE varchar USING "id"::text;`)
  await db.execute(`ALTER TABLE "${TABLE}" ALTER COLUMN "id" DROP DEFAULT;`)
  await db.execute(`ALTER TABLE "${TABLE}" ADD PRIMARY KEY ("id");`)
  await db.execute(`DROP SEQUENCE IF EXISTS "${SEQ}";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`CREATE SEQUENCE IF NOT EXISTS "${SEQ}";`)
  await db.execute(`ALTER TABLE "${TABLE}" DROP CONSTRAINT IF EXISTS "${TABLE}_pkey";`)
  await db.execute(
    `ALTER TABLE "${TABLE}" ALTER COLUMN "id" TYPE integer USING NULLIF(regexp_replace("id", '\\D', '', 'g'), '')::integer;`,
  )
  await db.execute(
    `ALTER TABLE "${TABLE}" ALTER COLUMN "id" SET DEFAULT nextval('"${SEQ}"'::regclass);`,
  )
  await db.execute(`ALTER TABLE "${TABLE}" ADD PRIMARY KEY ("id");`)
}
