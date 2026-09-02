import { getPayload } from 'payload'
import configPromise from '@payload-config'

type IntroIconItem = {
  id?: string
  icon?: string | null
  text?: string | null
  [key: string]: unknown
}

type LayoutBlock = {
  id?: string
  blockType?: string
  introIconList?: IntroIconItem[] | null
  [key: string]: unknown
}

const NEW_TEXT_BY_ICON: Record<string, string> = {
  brain: 'Unternehmerisch statt in Einzelleistungen gedacht: Bei Trinkwasser-Verband.de wurden Website, Lead-Erfassung und Follow-up als ein System geplant.',
  zap: 'Jedes Projekt startet mit einer Ist-Analyse bestehender Kanäle — bei MEDIFISCH.de führte das zur Einstellung von Meta-Werbung ohne messbare Leads.',
  search: 'Bestehende Strategien werden geprüft, bevor neue aufgesetzt werden: Ein Relaunch startet mit einer Analyse der SEO-Rankings und Nutzerpfade – nicht bei null.',
  target: 'Erfolg wird an Anfragen und Abschlüssen gemessen, nicht an Klickzahlen: Monatliches Reporting zeigt die Kennzahlen, die zu echtem Kundenkontakt führen (Formular-Absendungen, Anrufe).',
  'trending-up': 'Websites entstehen auf skalierbarer Basis (Next.js, Payload CMS) — neue Seiten, Funktionen oder ein Shop lassen sich später ergänzen. Beispiel: Soulmating.de.',
  handshake: 'Ein Ansprechpartner, keine Weiterleitungsschleifen: Anfragen werden direkt beantwortet, das kostenlose Erstgespräch klärt Umfang und Budget meist in einem Termin.',
}

async function main() {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'home' } },
    depth: 0,
    limit: 1,
    pagination: false,
    draft: true,
  })

  const doc = page.docs[0]
  if (!doc) {
    throw new Error('site-pages slug=home not found')
  }

  const layout = Array.isArray(doc.layout) ? (doc.layout as unknown[]) : []
  let changedCount = 0

  const nextLayout = layout.map((block) => {
    if (!block || typeof block !== 'object') return block
    const typed = block as LayoutBlock
    if (typed.blockType !== 'whyWorkWithMe') return block

    const list = Array.isArray(typed.introIconList) ? typed.introIconList : []
    const nextList = list.map((item) => {
      const icon = String(item?.icon ?? '')
      const newText = NEW_TEXT_BY_ICON[icon]
      if (!newText || item.text === newText) return item
      changedCount += 1
      return { ...item, text: newText }
    })

    return { ...typed, introIconList: nextList }
  })

  if (changedCount === 0) {
    payload.logger.info('No change needed (already up to date or block not found).')
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

  payload.logger.info(
    `Updated page home: shortened ${changedCount} whyWorkWithMe introIconList items.`,
  )
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => {
    process.exit()
  })
