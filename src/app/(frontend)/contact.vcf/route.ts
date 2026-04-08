import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'

import type { Footer } from '@/payload-types'

const CONTACT_FIRST_NAME = 'Philipp'
const CONTACT_LAST_NAME = 'Bacher'
const CONTACT_FULL_NAME = `${CONTACT_FIRST_NAME} ${CONTACT_LAST_NAME}`
const CONTACT_EMAIL = 'hello@philippbacher.com'
const CONTACT_WHATSAPP_E164 = '4915780280163'
const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_WHATSAPP_E164}`

function escapeVCardText(rawValue: string): string {
  return rawValue
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
}

function normalizePhoneForVCard(rawValue: string | null | undefined): string | null {
  if (typeof rawValue !== 'string') return null
  const value = rawValue.trim()
  if (!value) return null

  const digits = value.replace(/\D+/g, '')
  if (!digits) return null

  if (value.startsWith('+')) return `+${digits}`
  if (value.startsWith('00')) return `+${digits.replace(/^00/, '')}`

  return digits
}

export async function GET(): Promise<Response> {
  let footerAddress = ''
  let footerPhone = ''

  try {
    const footer = (await getCachedGlobal('footer', 0)()) as Footer
    footerAddress = typeof footer?.footerAddress === 'string' ? footer.footerAddress.trim() : ''
    footerPhone = typeof footer?.footerPhone === 'string' ? footer.footerPhone.trim() : ''
  } catch (error) {
    console.error('[contact.vcf] Failed to load footer global:', error)
  }

  const websiteUrl = getServerSideURL().replace(/\/$/, '')
  const bookingUrl = `${websiteUrl}/termin`
  const normalizedFooterPhone = normalizePhoneForVCard(footerPhone)

  const vcardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCardText(CONTACT_LAST_NAME)};${escapeVCardText(CONTACT_FIRST_NAME)};;;`,
    `FN:${escapeVCardText(CONTACT_FULL_NAME)}`,
    `EMAIL;TYPE=INTERNET:${escapeVCardText(CONTACT_EMAIL)}`,
    `URL:${escapeVCardText(websiteUrl)}`,
    `URL;TYPE=BOOKING:${escapeVCardText(bookingUrl)}`,
    `URL;TYPE=WHATSAPP:${escapeVCardText(CONTACT_WHATSAPP_URL)}`,
  ]

  if (normalizedFooterPhone) {
    vcardLines.push(`TEL;TYPE=CELL:${escapeVCardText(normalizedFooterPhone)}`)
  }

  if (footerAddress) {
    // Footer-Adresse bleibt als ein Block erhalten (inkl. Zeilenumbrüche aus dem CMS).
    vcardLines.push(`ADR;TYPE=WORK:;;${escapeVCardText(footerAddress)};;;;`)
    vcardLines.push(`LABEL;TYPE=WORK:${escapeVCardText(footerAddress)}`)
  }

  vcardLines.push('END:VCARD')

  const vcard = `${vcardLines.join('\r\n')}\r\n`

  return new Response(vcard, {
    status: 200,
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="contact.vcf"',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  })
}
