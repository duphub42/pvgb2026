/**
 * Route handler for /api/media/file/[filename]
 * Serves media files from the public/media directory when using local storage.
 * This endpoint is expected by Payload's local storage adapter.
 */
import { NextRequest, NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'

// In Next.js, we use process.cwd() which is the project root during runtime
const projectRoot = process.cwd()
const mediaDir = path.join(projectRoot, 'public/media')

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

export async function GET(
  request: NextRequest,
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
    console.error(`[media/file] File not found: ${filePath} (mediaDir: ${mediaDir})`)
    return NextResponse.json({ error: 'File not found', path: filePath }, { status: 404 })
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
