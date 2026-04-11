import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

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
const LEGAL_EMAIL = 'mail@philippbacher.com'
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
  title: 'Datenschutz',
  description: 'Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.',
}

type PageProps = {
  searchParams: Promise<{ previewId?: string }>
}

async function fetchSitePageBySlug(payload: any, slug: string, draft: boolean) {
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

  return fetchSitePageBySlug(payload, 'datenschutz', isDraftMode)
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise })
    const page = await fetchSitePageBySlug(payload, 'datenschutz', false)
    if (page) {
      return await generateMeta({ doc: page })
    }
  } catch {
    // Fallback to static metadata.
  }

  return DEFAULT_METADATA
}

export default async function DatenschutzPage({ searchParams: searchParamsPromise }: PageProps) {
  let footer: FooterGlobal | null = null

  try {
    footer = (await getCachedGlobal('footer', 0)()) as FooterGlobal
  } catch {
    // Fallback-Inhalte greifen automatisch.
  }

  const page = await findSitePage('datenschutz', (await searchParamsPromise).previewId)
  if (page) {
    const slug = 'datenschutz'
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
          <h1>Datenschutzerklärung</h1>
          <p>
            Mit dieser Datenschutzerklärung informieren wir Sie darüber, welche personenbezogenen
            Daten bei der Nutzung dieser Website verarbeitet werden.
          </p>

          <h2>1. Verantwortlicher</h2>
          <p>
            {LEGAL_NAME}
            <br />
            {addressLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                <br />
              </span>
            ))}
            Telefon: <a href={`tel:${phoneHref}`}>{phone}</a>
            <br />
            E-Mail: <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
          </p>

          <h2>2. Verarbeitung beim Besuch der Website (Server-Logfiles)</h2>
          <p>
            Beim Aufruf der Website werden technisch erforderliche Daten verarbeitet (z. B.
            IP-Adresse, Datum/Uhrzeit des Zugriffs, angeforderte URL, Referrer-URL,
            Browserinformationen und Betriebssystem). Die Verarbeitung erfolgt, um die Sicherheit,
            Stabilität und Auslieferung der Website zu gewährleisten.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem und
            funktionsfähigem Betrieb der Website).
          </p>

          <h2>3. Kontaktaufnahme</h2>
          <p>
            Wenn Sie uns per E-Mail, Telefon oder Kontaktformular kontaktieren, verarbeiten wir die
            von Ihnen übermittelten Daten (z. B. Name, Kontaktdaten, Nachricht), um Ihre Anfrage zu
            bearbeiten.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche/vertragliche Maßnahmen)
            oder Art. 6 Abs. 1 lit. f DSGVO (allgemeine Kommunikation).
          </p>

          <h2>4. Cookies und ähnliche Technologien</h2>
          <p>
            Diese Website verwendet technisch notwendige Cookies, die für den Betrieb und die
            Sicherheit der Seite erforderlich sind.
          </p>
          <p>
            Sofern optionale Dienste (z. B. Statistik oder Marketing) eingesetzt werden, erfolgt
            dies ausschließlich nach Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO sowie § 25
            Abs. 1 TDDDG. Technisch notwendige Speicherungen erfolgen auf Grundlage von § 25 Abs. 2
            TDDDG.
          </p>

          <h2>5. Empfänger und Auftragsverarbeitung</h2>
          <p>
            Wir setzen technische Dienstleister für Hosting, Wartung und Bereitstellung dieser
            Website ein. Soweit diese in unserem Auftrag personenbezogene Daten verarbeiten, erfolgt
            dies auf Grundlage eines Vertrags zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
          </p>

          <h2>6. Speicherdauer</h2>
          <p>
            Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen
            Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.
          </p>

          <h2>7. Ihre Rechte</h2>
          <p>Sie haben insbesondere folgende Rechte:</p>
          <ul>
            <li>Auskunft über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>
              Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)
            </li>
          </ul>

          <h2>8. Beschwerderecht bei einer Aufsichtsbehörde</h2>
          <p>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren,
            insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes
            oder des Orts des mutmaßlichen Verstoßes.
          </p>

          <h2>9. Datensicherheit</h2>
          <p>
            Wir nutzen geeignete technische und organisatorische Maßnahmen, um Ihre Daten gegen
            Verlust, Manipulation und unberechtigtem Zugriff zu schützen.
          </p>

          <h2>10. Aktualität und Änderungen</h2>
          <p>
            Diese Datenschutzerklärung wird bei rechtlichen oder technischen Änderungen angepasst.
            Es gilt die jeweils auf dieser Seite veröffentlichte Fassung.
          </p>

          <p className="text-sm opacity-80">Stand: {LAST_UPDATED}</p>
        </article>
      </div>
    </div>
  )
}
