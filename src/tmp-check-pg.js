import { createRequire } from 'module'
import path from 'path'
const require = createRequire(import.meta.url)
const dotenv = require('dotenv')
const env = dotenv.config({ path: path.resolve('.env.local') }).parsed || {}
const env2 = dotenv.config({ path: path.resolve('.env') }).parsed || {}
const vars = { ...env2, ...env, ...process.env }
const { Client } = require(path.resolve('node_modules/.pnpm/pg@8.16.3/node_modules/pg'))
const conn = vars.DATABASE_URL || vars.POSTGRES_URL
if (!conn) {
  console.error('No DB URL')
  process.exit(1)
}
const client = new Client({ connectionString: conn })
await client.connect()
const names = [
  'portfolio_grid',
  'portfolio_grid_cases',
  'portfolio_grid_cases_metrics',
  'portfolio_grid_cases_tags',
  'site_pages_blocks_portfolio_case_grid',
  'site_pages_blocks_portfolio_case_grid_cases',
  'site_pages_blocks_portfolio_case_grid_cases_metrics',
  'site_pages_blocks_portfolio_case_grid_cases_tags',
]
for (const name of names) {
  const res = await client.query(
    'SELECT tablename FROM pg_tables WHERE schemaname=$1 AND tablename=$2',
    ['public', name],
  )
  console.log(name, res.rows.length > 0)
}
const histRes = await client.query(
  "SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename ILIKE '%payload%migration%'",
)
console.log(
  'payload migration tables:',
  histRes.rows.map((r) => r.tablename),
)
if (histRes.rows.length > 0) {
  const schema = await client.query(
    "SELECT column_name FROM information_schema.columns WHERE table_name = 'payload_migrations' ORDER BY ordinal_position",
  )
  console.log(
    'payload_migrations columns=',
    schema.rows.map((r) => r.column_name),
  )
  const portfolioRow = await client.query('SELECT * FROM payload_migrations WHERE name = $1', [
    '20260411_120000_portfolio_blocks',
  ])
  console.log('portfolio migration row=', portfolioRow.rows)
}
await client.end()
