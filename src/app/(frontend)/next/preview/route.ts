import type { CollectionSlug, PayloadRequest } from 'payload'
import { getPayload } from 'payload'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewId = searchParams.get('previewId')
  const previewSecret = searchParams.get('previewSecret')
  const envSecret = process.env.PREVIEW_SECRET

  if (!envSecret || envSecret.length < 12) {
    return new Response('Preview is not configured (PREVIEW_SECRET must be set and at least 12 characters)', { status: 503 })
  }
  if (previewSecret !== envSecret) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // When previewId is present, allow missing path/collection/slug (default to pages homepage)
  const resolvedPath = path && path.startsWith('/') ? path : '/'
  const resolvedCollection = (collection || 'pages') as CollectionSlug
  const resolvedSlug = slug || 'home'

  if (!resolvedPath.startsWith('/')) {
    return new Response('This endpoint can only be used for relative previews', { status: 500 })
  }

  let user

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview')
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  draft.enable()

  const targetPath = previewId
    ? `${resolvedPath}${resolvedPath.includes('?') ? '&' : '?'}previewId=${previewId}`
    : resolvedPath
  redirect(targetPath)
}
