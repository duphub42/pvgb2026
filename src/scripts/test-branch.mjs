import './load-env.js'
import pg from 'pg'
const { Client } = pg

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
console.log('Testing connection...')

const client = new Client({ connectionString: url })
await client.connect()

const res = await client.query('SELECT current_database(), version()')
console.log('Database:', res.rows[0].current_database)

const tables = await client.query(`
  SELECT count(*) FROM information_schema.tables 
  WHERE table_schema = 'public'
`)
console.log('Tables:', tables.rows[0].count)

const size = await client.query(`
  SELECT pg_size_pretty(pg_database_size(current_database()))
`)
console.log('Size:', size.rows[0].pg_size_pretty)

await client.end()
