import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET() {
  revalidateTag('site-pages')
  return NextResponse.json({ ok: true, revalidated: ['site-pages'] })
}
