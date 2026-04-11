import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const envPath = path.resolve('.env.local')
const envText = fs.existsSync(envPath) ? fs.readFileSync(envPath,'utf8') : ''
const vars = Object.fromEntries(envText.split(/\r?\n/).filter(Boolean).map(line => {
  const idx = line.indexOf('=')
  return [line.slice(0,idx), line.slice(idx+1)]
}))
const { Client } = require(path.resolve('node_modules/.pnpm/pg@8.16.3/node_modules/pg'))
const client = new Client({ connectionString: vars.DATABASE_URL })
await client.connect()
try {
  const res = await client.query('SELECT count(*) FROM portfolio_grid_cases')
  console.log('portfolio_grid_cases count=', res.rows[0].count)
} catch (err) {
  console.error('query failed', err.message)
  console.error(err.stack)
}
await client.end()
