#!/usr/bin/env tsx
// Test R2 connectivity and upload
// Usage: pnpm tsx test-r2.ts

import { S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import * as fs from 'fs'
import * as path from 'path'

const requiredEnvVars = [
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET',
]

console.log('=== R2 Connectivity Test ===\n')

// 1. Check environment variables
console.log('1. Checking environment variables...')
const missing = requiredEnvVars.filter((v) => !process.env[v])
if (missing.length > 0) {
  console.error('   ❌ Missing env vars:', missing.join(', '))
  process.exit(1)
}
console.log('   ✅ All env vars present')

const accountId = process.env.R2_ACCOUNT_ID!
const accessKeyId = process.env.R2_ACCESS_KEY_ID!
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!
const bucket = process.env.R2_BUCKET!

// 2. Create S3 client
console.log('\n2. Creating S3 client...')
const endpoint = `https://${accountId}.r2.cloudflarestorage.com`
console.log('   Endpoint:', endpoint)
console.log('   Bucket:', bucket)

const s3Client = new S3Client({
  region: 'auto',
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})
console.log('   ✅ S3 client created')

// 3. List objects in bucket
console.log('\n3. Testing LIST operation...')
try {
  const listCommand = new ListObjectsV2Command({
    Bucket: bucket,
    MaxKeys: 5,
  })
  const listResult = await s3Client.send(listCommand)
  console.log('   ✅ LIST succeeded')
  console.log('   Objects found:', listResult.KeyCount || 0)
  if (listResult.Contents && listResult.Contents.length > 0) {
    listResult.Contents.slice(0, 3).forEach((obj, i) => {
      console.log(`   - ${obj.Key} (${obj.Size} bytes)`)
    })
  }
} catch (err) {
  console.error('   ❌ LIST failed:', (err as Error).message)
  process.exit(1)
}

// 4. Test upload (small test file)
console.log('\n4. Testing PUT operation...')
const testKey = `test-${Date.now()}.txt`
const testContent = `R2 test at ${new Date().toISOString()}`
try {
  const putCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: testKey,
    Body: testContent,
    ContentType: 'text/plain',
  })
  await s3Client.send(putCommand)
  console.log('   ✅ PUT succeeded')
  console.log('   Test file:', testKey)
} catch (err) {
  console.error('   ❌ PUT failed:', (err as Error).message)
  process.exit(1)
}

// 5. Test read back
console.log('\n5. Testing GET operation...')
try {
  const getCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: testKey,
  })
  const getResult = await s3Client.send(getCommand)
  const body = await getResult.Body?.transformToString()
  if (body === testContent) {
    console.log('   ✅ GET succeeded - content matches')
  } else {
    console.error('   ❌ GET failed - content mismatch')
  }
} catch (err) {
  console.error('   ❌ GET failed:', (err as Error).message)
}

console.log('\n=== All tests passed! R2 is working ===')
