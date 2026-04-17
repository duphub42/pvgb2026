/**
 * Route handler for /api/media/file/[filename]
 * Serves media files from:
 * 1) local `public/media` (local storage)
 * 2) Cloudflare R2 via S3 API (when local file is absent but storage-s3 is enabled)
 */
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'

// In Next.js, we use process.cwd() which is the project root during runtime
const projectRoot = process.cwd()
const mediaDir = path.join(projectRoot, 'public/media')

const r2AccountId = process.env.R2_ACCOUNT_ID?.trim()
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID?.trim()
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim()
const r2Bucket = process.env.R2_BUCKET?.trim()
const r2Enabled = Boolean(r2AccountId && r2AccessKeyId && r2SecretAccessKey && r2Bucket)

const r2Client = r2Enabled
  ? new S3Client({
      credentials: {
        accessKeyId: r2AccessKeyId!,
        secretAccessKey: r2SecretAccessKey!,
      },
      endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
      forcePathStyle: true,
      region: 'auto',
    })
  : null

const MIME_TYPES: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jpe': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
}

async function readR2Object(filename: string): Promise<{ body: Uint8Array; contentType?: string } | null> {
  if (!r2Client || !r2Bucket) return null

  try {
    const object = await r2Client.send(
      new GetObjectCommand({
        Bucket: r2Bucket,
        Key: filename,
      }),
    )

    const body = object.Body as
      | { transformToByteArray?: () => Promise<Uint8Array> }
      | Uint8Array
      | null
      | undefined
    if (!body) return null

    if (body instanceof Uint8Array) {
      return { body, contentType: object.ContentType || undefined }
    }

    if (typeof body.transformToByteArray === 'function') {
      const bytes = await body.transformToByteArray()
      return { body: bytes, contentType: object.ContentType || undefined }
    }

    return null
  } catch (error: unknown) {
    const err = error as { name?: string; $metadata?: { httpStatusCode?: number } }
    const status = err?.$metadata?.httpStatusCode
    if (err?.name === 'NoSuchKey' || err?.name === 'NotFound' || status === 404) {
      return null
    }
    throw error
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
): Promise<Response> {
  const { filename: encodedFilename } = await params
  const filename = decodeURIComponent(encodedFilename)

  if (!filename || filename.includes('..') || filename.includes('//')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
  }

  const filePath = path.join(mediaDir, filename)

  // Ensure the resolved path is within the media directory (security check)
  const resolvedPath = path.resolve(filePath)
  const resolvedMediaDir = path.resolve(mediaDir)
  if (!resolvedPath.startsWith(resolvedMediaDir)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  if (!fs.existsSync(filePath)) {
    // Cloud-storage fallback (R2/S3): serve object with same key as filename.
    try {
      const r2Object = await readR2Object(filename)
      if (!r2Object) {
        console.error(
          `[media/file] File not found locally or in R2: ${filePath} (mediaDir: ${mediaDir})`,
        )
        return NextResponse.json({ error: 'File not found', path: filePath }, { status: 404 })
      }

      const ext = path.extname(filename).toLowerCase()
      const contentType = r2Object.contentType || MIME_TYPES[ext] || 'application/octet-stream'

      const headers = new Headers()
      headers.set('Content-Type', contentType)
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      if (ext === '.svg') {
        headers.set('Content-Security-Policy', "script-src 'none'")
      }

      return new Response(r2Object.body, { headers, status: 200 })
    } catch (error) {
      console.error('[media/file] R2 fallback failed:', error)
      return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
  }

  const ext = path.extname(filename).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  const fileBuffer = fs.readFileSync(filePath)

  const headers = new Headers()
  headers.set('Content-Type', contentType)
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  if (ext === '.svg') {
    headers.set('Content-Security-Policy', "script-src 'none'")
  }

  return new Response(fileBuffer, { headers, status: 200 })
}
