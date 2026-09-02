import { getPayload } from 'payload'
import configPromise from '@payload-config'

type ServiceItem = {
  id?: string
  title?: string | null
  description?: string | null
  detailsText?: string | null
  [key: string]: unknown
}

type ServiceCategory = {
  id?: string
  categoryLabel?: string | null
  services?: ServiceItem[] | null
  [key: string]: unknown
}

type LayoutBlock = {
  id?: string
  blockType?: string
  categories?: ServiceCategory[] | null
  [key: string]: unknown
}

const DETAILS_BY_TITLE: Record<string, string> = {
  'Individuelle Plugins':
    'Wenn Standard-Plugins an ihre Grenzen stoßen, entwickle ich maßgeschneiderte Funktionen direkt für Ihre WordPress-Installation – sauber dokumentiert, wartbar und ohne unnötigen Ballast. Von individuellen Formularlogiken über Schnittstellen zu externen Systemen bis zu spezifischen Automatisierungen: Die Lösung wird exakt auf Ihren Workflow zugeschnitten statt umgekehrt. So bleibt die Website performant, und Sie sind nicht von der Update-Politik eines Drittanbieter-Plugins abhängig.',
  'WooCommerce-Setup & Anpassungen':
    'Ich richte Ihren WooCommerce-Shop von Grund auf ein oder optimiere einen bestehenden Shop – von Produktkatalog und Variantenlogik über Zahlungsanbindung (z. B. PayPal, Stripe, Klarna) bis zum reibungslosen Checkout. Individuelle Erweiterungen wie Rabattlogiken, Versandregeln oder Anbindungen an ERP-/Warenwirtschaftssysteme setze ich passgenau um. Ziel ist ein Shop, der technisch stabil läuft und Kaufabbrüche im Checkout minimiert.',
  'Theme-Anpassungen':
    'Bestehende oder neue WordPress-Themes passe ich sauber an Ihr Design und Ihre Anforderungen an – per Child-Theme statt riskanten Direktänderungen am Original, damit Updates nichts zerstören. Wo sinnvoll, verzichte ich bewusst auf zusätzliche Page-Builder-Plugins und setze auf schlanken, performanten Custom-Code. Das Ergebnis: ein Theme, das Ihre Marke exakt abbildet und schnell lädt.',
  'Updates & Backups':
    'WordPress-Core, Theme und Plugins halte ich regelmäßig und geprüft aktuell – nicht blind per Auto-Update, sondern nach Test auf einer Staging-Umgebung, damit nichts unerwartet bricht. Parallel läuft eine automatisierte Backup-Strategie mit externer Speicherung, sodass im Ernstfall (Hack, fehlerhaftes Update, Serverausfall) zügig ein funktionierender Stand wiederhergestellt werden kann. So bleibt Ihre Seite dauerhaft sicher und wartungsfrei für Sie.',
  'Sicherheits-Monitoring':
    'Ich überwache Ihre WordPress-Seite laufend auf verdächtige Aktivitäten – von Brute-Force-Versuchen auf den Login über Datei-Änderungen bis zu bekannten Schwachstellen in eingesetzten Plugins. Login-Bereich und sensible Dateizugriffe werden zusätzlich abgesichert, etwa durch Zwei-Faktor-Authentifizierung, IP-Beschränkungen und eine Web Application Firewall. Bei Auffälligkeiten reagiere ich zeitnah, statt dass ein Sicherheitsproblem erst durch eine Google-Abstrafung oder Kundenbeschwerden auffällt.',
  'Performance-Optimierung':
    'Ich analysiere Ladezeiten, Datenbankabfragen und Caching-Konfiguration Ihrer Seite und behebe gezielt die größten Bremsen – von unoptimierten Bildern über zu viele aktive Plugins bis zu ineffizienten Datenbankabfragen. Durch serverseitiges Caching, Bildkomprimierung und Code-Bereinigung sinken Ladezeiten spürbar, was sich direkt auf Google-Ranking, Absprungrate und Nutzererlebnis auswirkt. Am Ende steht eine messbare Verbesserung, keine Bauchgefühl-Optimierung.',
}

async function main() {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'wordpress-agentur' } },
    depth: 0,
    limit: 1,
    pagination: false,
    draft: true,
  })

  const doc = page.docs[0]
  if (!doc) {
    throw new Error('site-pages slug=wordpress-agentur not found')
  }

  const layout = Array.isArray(doc.layout) ? (doc.layout as unknown[]) : []
  let changedCount = 0

  const nextLayout = layout.map((block) => {
    if (!block || typeof block !== 'object') return block
    const typed = block as LayoutBlock
    if (typed.blockType !== 'servicesGrid') return block

    const categories = Array.isArray(typed.categories) ? typed.categories : []
    const nextCategories = categories.map((category) => {
      const services = Array.isArray(category.services) ? category.services : []
      const nextServices = services.map((service) => {
        const title = String(service?.title ?? '').trim()
        const detailsText = DETAILS_BY_TITLE[title]
        if (!detailsText || service.detailsText === detailsText) return service
        changedCount += 1
        return { ...service, detailsText }
      })
      return { ...category, services: nextServices }
    })

    return { ...typed, categories: nextCategories }
  })

  if (changedCount === 0) {
    payload.logger.info('No change needed (already set or blocks not found).')
    return
  }

  await payload.update({
    collection: 'site-pages',
    id: doc.id,
    data: {
      layout: nextLayout as never,
      _status: 'published' as never,
    },
    draft: false,
  })

  payload.logger.info(`Updated page wordpress-agentur: set detailsText on ${changedCount} services.`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => {
    process.exit()
  })
