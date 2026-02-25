import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!url) {
  throw new Error('DATABASE_URL or POSTGRES_URL required for drizzle-kit push')
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/payload-generated-schema.ts',
  dbCredentials: { url },
})
