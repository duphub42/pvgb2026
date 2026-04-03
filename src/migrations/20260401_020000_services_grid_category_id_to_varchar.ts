import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE IF EXISTS "site_pages_blocks_services_grid_categories" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
    ALTER TABLE IF EXISTS "site_pages_blocks_services_grid_categories_services" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
    ALTER TABLE IF EXISTS "site_pages_blocks_services_grid_categories_services" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;

    ALTER TABLE IF EXISTS "services_grid_categories" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
    ALTER TABLE IF EXISTS "services_grid_categories_services" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
    ALTER TABLE IF EXISTS "services_grid_categories_services" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;

    ALTER TABLE IF EXISTS "_site_pages_v_blocks_services_grid_categories" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
    ALTER TABLE IF EXISTS "_site_pages_v_blocks_services_grid_categories_services" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
    ALTER TABLE IF EXISTS "_site_pages_v_blocks_services_grid_categories_services" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;

    ALTER TABLE IF EXISTS "_services_grid_v_categories" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
    ALTER TABLE IF EXISTS "_services_grid_v_categories_services" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
    ALTER TABLE IF EXISTS "_services_grid_v_categories_services" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE IF EXISTS "site_pages_blocks_services_grid_categories_services" ALTER COLUMN "_parent_id" TYPE integer USING "_parent_id"::integer;
    ALTER TABLE IF EXISTS "site_pages_blocks_services_grid_categories_services" ALTER COLUMN "id" TYPE integer USING "id"::integer;
    ALTER TABLE IF EXISTS "site_pages_blocks_services_grid_categories" ALTER COLUMN "id" TYPE integer USING "id"::integer;

    ALTER TABLE IF EXISTS "services_grid_categories_services" ALTER COLUMN "_parent_id" TYPE integer USING "_parent_id"::integer;
    ALTER TABLE IF EXISTS "services_grid_categories_services" ALTER COLUMN "id" TYPE integer USING "id"::integer;
    ALTER TABLE IF EXISTS "services_grid_categories" ALTER COLUMN "id" TYPE integer USING "id"::integer;

    ALTER TABLE IF EXISTS "_site_pages_v_blocks_services_grid_categories_services" ALTER COLUMN "_parent_id" TYPE integer USING "_parent_id"::integer;
    ALTER TABLE IF EXISTS "_site_pages_v_blocks_services_grid_categories_services" ALTER COLUMN "id" TYPE integer USING "id"::integer;
    ALTER TABLE IF EXISTS "_site_pages_v_blocks_services_grid_categories" ALTER COLUMN "id" TYPE integer USING "id"::integer;

    ALTER TABLE IF EXISTS "_services_grid_v_categories_services" ALTER COLUMN "_parent_id" TYPE integer USING "_parent_id"::integer;
    ALTER TABLE IF EXISTS "_services_grid_v_categories_services" ALTER COLUMN "id" TYPE integer USING "id"::integer;
    ALTER TABLE IF EXISTS "_services_grid_v_categories" ALTER COLUMN "id" TYPE integer USING "id"::integer;
  `),
  )
}
