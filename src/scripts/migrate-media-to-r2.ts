#!/usr/bin/env tsx
import { config } from 'dotenv'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

config({ path: path.resolve(process.cwd(), '.env.local') })
config({ path: path.resolve(process.cwd(), '.env'), override: true })

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const projectRoot = path.resolve(dirname, '..', '..')
const mediaDir = path.join(projectRoot, 'public', 'media')

const r2AccountId = process.env.R2_ACCOUNT_ID?.trim()
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID?.trim()
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim()
const r2Bucket = process.env.R2_BUCKET?.trim()

const DRY_RUN = process.env.DRY_RUN === '1' || process.env.DRY_RUN === 'true'

const MIME_TYPES: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.json': 'application/json',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
}

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  return MIME_TYPES[ext] || 'application/octet-stream'
}

function assertEnv() {
  const missing: string[] = []
  if (!r2AccountId) missing.push('R2_ACCOUNT_ID')
  if (!r2AccessKeyId) missing.push('R2_ACCESS_KEY_ID')
  if (!r2SecretAccessKey) missing.push('R2_SECRET_ACCESS_KEY')
  if (!r2Bucket) missing.push('R2_BUCKET')

  if (missing.length > 0) {
    console.error('Missing required R2 environment variables:', missing.join(', '))
    console.error('Please set them in .env.local or .env before running this script.')
    process.exit(1)
  }

  if (!fs.existsSync(mediaDir)) {
    console.error(`Media directory not found: ${mediaDir}`)
    process.exit(1)
  }
}

async function main() {
  assertEnv()

  console.log('=== Migrate local media files to R2 ===')
  console.log('Project root:', projectRoot)
  console.log('Media directory:', mediaDir)
  console.log('R2 bucket:', r2Bucket)
  console.log('Dry run:', DRY_RUN ? 'yes' : 'no')

  const entries = fs.readdirSync(mediaDir, { withFileTypes: true })
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name)
  if (files.length === 0) {
    console.log('No files found in public/media. Nothing to upload.')
    return
  }

  console.log(`Found ${files.length} files in public/media`)

  if (DRY_RUN) {
    console.log('Dry run mode, no uploads will be performed.')
    files.forEach((filename) => console.log(`  - ${filename}`))
    return
  }

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: r2AccessKeyId!,
      secretAccessKey: r2SecretAccessKey!,
    },
    forcePathStyle: true,
  })

  let uploaded = 0
  const failures: Array<{ file: string; error: string }> = []

  for (const filename of files) {
    const filePath = path.join(mediaDir, filename)
    try {
      const data = fs.readFileSync(filePath)
      const command = new PutObjectCommand({
        Bucket: r2Bucket,
        Key: filename,
        Body: data,
        ContentType: getContentType(filename),
      })
      await s3.send(command)
      uploaded += 1
      if (uploaded % 50 === 0) {
        console.log(`  uploaded ${uploaded}/${files.length}`)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      failures.push({ file: filename, error: message })
      console.error(`Failed to upload ${filename}: ${message}`)
    }
  }

  console.log(`\nFinished uploading ${uploaded}/${files.length} files.`)
  if (failures.length > 0) {
    console.error(`\n${failures.length} failures:`)
    failures.slice(0, 10).forEach((failure) => {
      console.error(`  - ${failure.file}: ${failure.error}`)
    })
    if (failures.length > 10) {
      console.error(`  ...and ${failures.length - 10} more`)    
    }
    process.exit(1)
  }

  console.log('=== Migration complete ===')
  console.log('Existing /api/media/file/<filename> requests will now succeed from R2 if the local file is removed.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
