import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

// Minimal seed data - Payload CMS will handle the structure
const seedGlobalsData: Record<string, any> = {
  header: {
    logoText: 'Philipp Bacher',
  },
  footer: {
    copyright: '© 2026 Philipp Bacher. Alle Rechte vorbehalten.',
  },
  design: {
    siteTitle: 'Philipp Bacher',
  },
}

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const results: string[] = []

    // Seed Header
    try {
      const existingHeader = await payload.findGlobal({
        slug: 'header',
        overrideAccess: true,
      })
      if (!existingHeader || !existingHeader.id) {
        await payload.updateGlobal({
          slug: 'header',
          data: seedGlobalsData.header as any,
          overrideAccess: true,
        })
        results.push('✅ Header angelegt')
      } else {
        results.push('⏭️ Header existiert bereits')
      }
    } catch (e) {
      results.push(`❌ Header: ${e instanceof Error ? e.message : String(e)}`)
    }

    // Seed Footer
    try {
      const existingFooter = await payload.findGlobal({
        slug: 'footer',
        overrideAccess: true,
      })
      if (!existingFooter || !existingFooter.id) {
        await payload.updateGlobal({
          slug: 'footer',
          data: seedGlobalsData.footer as any,
          overrideAccess: true,
        })
        results.push('✅ Footer angelegt')
      } else {
        results.push('⏭️ Footer existiert bereits')
      }
    } catch (e) {
      results.push(`❌ Footer: ${e instanceof Error ? e.message : String(e)}`)
    }

    // Seed Design
    try {
      const existingDesign = await payload.findGlobal({
        slug: 'design',
        overrideAccess: true,
      })
      if (!existingDesign || !existingDesign.id) {
        await payload.updateGlobal({
          slug: 'design',
          data: seedGlobalsData.design as any,
          overrideAccess: true,
        })
        results.push('✅ Design angelegt')
      } else {
        results.push('⏭️ Design existiert bereits')
      }
    } catch (e) {
      results.push(`❌ Design: ${e instanceof Error ? e.message : String(e)}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Globals Initialisierung abgeschlossen',
      results,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unbekannter Fehler',
      },
      { status: 500 },
    )
  }
}
