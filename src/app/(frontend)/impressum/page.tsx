import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload, type Payload } from 'payload'

import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { resolveLayoutBlocks } from '@/utilities/profilLayoutFallback'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import type { Footer as FooterGlobal, SitePage } from '@/payload-types'

export const revalidate = 60

const LAST_UPDATED = '11. April 2026'
const LEGAL_NAME = 'Philipp Bacher'
const LEGAL_REPRESENTATIVE = 'Philipp Bacher'
const LEGAL_EMAIL = 'mail@philippbacher.com'
const VAT_ID = 'DE337118461'
const FALLBACK_ADDRESS = ['Händelstr. 3', 'D-06114 Halle/Saale']
const FALLBACK_PHONE = '+49 3459 6393323'

function parseAddressLines(value: string | null | undefined): string[] {
  if (!value || typeof value !== 'string') return FALLBACK_ADDRESS

  const lines = value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return lines.length > 0 ? lines : FALLBACK_ADDRESS
}

function normalizePhoneHref(value: string): string {
  const cleaned = value.replace(/[^\d+]/g, '')
  return cleaned || value
}

const DEFAULT_METADATA: Metadata = {
  title: 'Impressum',
  description: 'Rechtliche Informationen und Anbieterkennzeichnung.',
}

type PageProps = {
  searchParams: Promise<{ previewId?: string }>
}

async function fetchSitePageBySlug(payload: Payload, slug: string, draft: boolean) {
  const pages = await payload.find({
    collection: 'site-pages',
    limit: 1,
    depth: 2,
    where: {
      and: [{ slug: { equals: slug } }],
    },
    draft,
  })

  return pages.docs[0] as SitePage | undefined
}

async function findSitePage(slug: string, previewId: string | undefined) {
  const { isEnabled: isDraftMode } = await draftMode()
  const rawPreviewId = previewId && previewId !== 'undefined' ? String(previewId).trim() : ''
  const previewIdNum = rawPreviewId ? Number(rawPreviewId) : NaN
  const validPreviewId = rawPreviewId && Number.isFinite(previewIdNum) ? previewIdNum : null

  const payload = await getPayload({ config: configPromise })

  if (validPreviewId != null) {
    const pageById = await payload.findByID({
      collection: 'site-pages',
      id: validPreviewId,
      depth: 2,
      draft: true,
    })

    if (pageById) {
      return pageById
    }
  }

  return fetchSitePageBySlug(payload, 'impressum', isDraftMode)
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise })
    const page = await fetchSitePageBySlug(payload, 'impressum', false)
    if (page) {
      return await generateMeta({ doc: page })
    }
  } catch {
    // Fallback to static metadata.
  }

  return DEFAULT_METADATA
}

export default async function ImpressumPage({ searchParams: searchParamsPromise }: PageProps) {
  let footer: FooterGlobal | null = null

  try {
    footer = (await getCachedGlobal('footer', 0)()) as FooterGlobal
  } catch {
    // Fallback-Inhalte greifen automatisch.
  }

  const page = await findSitePage('impressum', (await searchParamsPromise).previewId)
  if (page) {
    const slug = 'impressum'
    const heroProps = page.hero && typeof page.hero === 'object' ? page.hero : {}
    const layoutBlocks = resolveLayoutBlocks(slug, page.layout)

    return (
      <article>
        <RenderHero {...heroProps} pageSlug={slug} />
        <div className="relative z-0 pt-24">
          <RenderBlocks blocks={layoutBlocks} />
        </div>
      </article>
    )
  }

  const addressLines = parseAddressLines(footer?.footerAddress)
  const phone = footer?.footerPhone?.trim() || FALLBACK_PHONE
  const phoneHref = normalizePhoneHref(phone)

  return (
    <div className="page-safe-top pb-24">
      <div className="container">
        <article className="prose dark:prose-invert max-w-3xl">
          <h1>Impressum</h1>
          <p>Angaben gemäß § 5 DDG</p>

          <h2>Dienstanbieter</h2>
          <p>
            {LEGAL_NAME}
            <br />
            {addressLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                <br />
              </span>
            ))}
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: <a href={`tel:${phoneHref}`}>{phone}</a>
            <br />
            E-Mail: <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
          </p>

          <h2>Vertreten durch</h2>
          <p>{LEGAL_REPRESENTATIVE}</p>

          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            {LEGAL_REPRESENTATIVE}
            <br />
            {addressLines[0]}
          </p>

          <h2>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
            <br />
            <strong>{VAT_ID}</strong>
          </p>

          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß den allgemeinen Gesetzen für eigene Inhalte auf
            diesen Seiten verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder
            gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
            eine rechtswidrige Tätigkeit hinweisen.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
            Betreiber der Seiten verantwortlich.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors
            bzw. Erstellers.
          </p>

          <p className="text-sm opacity-80">Stand: {LAST_UPDATED}</p>
        </article>
      </div>
    </div>
  )
}
