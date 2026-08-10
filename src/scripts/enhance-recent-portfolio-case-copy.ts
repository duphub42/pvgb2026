/**
 * Aktualisiert die Copy der zuletzt ergänzten Portfolio-Cases im zentralen Slider.
 *
 * Ausführen:
 *   npx tsx src/scripts/enhance-recent-portfolio-case-copy.ts
 *   npx tsx src/scripts/enhance-recent-portfolio-case-copy.ts --dry-run
 */

import './load-env-import'
import { revalidateTag } from 'next/cache'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import config from '@payload-config'

import {
  buildCentralPortfolioCaseBlock,
  CENTRAL_PORTFOLIO_PAGE_SLUG,
  findCentralPortfolioCaseBlock,
  stripNestedIds,
  type PortfolioCaseGridBlock,
} from '@/utilities/centralPortfolioCases'

type LayoutBlock = Record<string, unknown> & { blockType?: string }
type PortfolioCase = Record<string, unknown> & {
  title?: string
  discipline?: string
}

export const COPY_UPDATES: Record<
  string,
  Pick<PortfolioCase, 'summary' | 'challenge' | 'approach' | 'result'>
> = {
  'KIPP Dental': {
    summary:
      'Digitaler Marken- und Serviceauftritt für ein Dentallabor, der dentale Präzisionstechnik, Team-Kompetenz und direkte Kontaktwege zu einem hochwertigen Web-Erlebnis verbindet.',
    challenge:
      'Ein spezialisiertes Dentallabor muss seine technische Präzision schnell vermitteln, ohne kühl oder austauschbar zu wirken. Die Website sollte Laborleistungen, Team-Kompetenz und Serviceangebote so ordnen, dass Zahnarztpraxen direkt verstehen, wofür KIPP Dental steht und wie die Zusammenarbeit abläuft.',
    approach:
      'Entwickelt wurde ein fokussierter Auftritt mit klarer Seitenarchitektur, prägnanter Leistungsdarstellung und einer Bildsprache, die Präzisionstechnik und persönliche Betreuung verbindet. Die Inhalte wurden auf schnelle Orientierung, glaubwürdige Expertise und reibungslose Kontaktwege ausgelegt.',
    result:
      'Das Ergebnis ist eine moderne Labor-Website, die technische Qualität, Serviceverständnis und Markenauftritt konsistent zusammenführt. KIPP Dental präsentiert sich damit digital so hochwertig, wie die eigene Präzisionsarbeit wahrgenommen werden soll.',
  },
  MEDIFISCH: {
    summary:
      'Langfristig betreuter Dropshipping-Shop für Wellness- und SPA-Bedarf: von Sortiment und Kategoriearchitektur bis zu nutzerfreundlicher Produktführung und skalierbarer E-Commerce-Basis.',
    challenge:
      'MEDIFISCH verbindet ein breites Sortiment für Wellness- und SPA-Bedarf mit den operativen Anforderungen eines Dropshipping-Modells. Die Herausforderung lag darin, Produktvielfalt, Vertrauen und Kaufentscheidung so zu strukturieren, dass aus einem umfangreichen Angebot ein verständlicher, skalierbarer Vertriebskanal wird.',
    approach:
      'Über mehrere Projektphasen hinweg wurden Shop-Struktur, Produktlogik, Kategoriearchitektur und conversionnahe Nutzerführung weiterentwickelt. Im Fokus standen klare Einstiege ins Sortiment, belastbare E-Commerce-Prozesse und eine Pflegebasis, die langfristig mit dem Angebot wachsen kann.',
    result:
      'Entstanden ist ein langfristig betreuter Online-Shop, der Sortiment, Produktkommunikation und Verkaufsstrecken in einem stabilen digitalen System bündelt. MEDIFISCH kann dadurch ein spezialisiertes Wellness- und SPA-Angebot professionell sichtbar machen und kontinuierlich ausbauen.',
  },
  'Verband Digitale Innovation': {
    summary:
      'Verbandsplattform für digitale Innovation, die Expertennetzwerk, Themenkompetenz und lösungsorientierte Kommunikation zu einem glaubwürdigen digitalen Auftritt bündelt.',
    challenge:
      'Der Verband brauchte einen digitalen Auftritt, der fachliche Autorität, Netzwerkcharakter und Innovationsanspruch gleichzeitig transportiert. Inhalte zu Transformation, Cybersecurity und digitalen Lösungen sollten nicht wie einzelne Themeninseln wirken, sondern als schlüssiges Expertenökosystem sichtbar werden.',
    approach:
      'Konzipiert wurde eine Verbandsplattform mit klaren Themenbereichen, lösungsorientierten Einstiegen und einer Kommunikation, die Fachlichkeit greifbar macht. Struktur, Textführung und visuelle Hierarchie wurden darauf ausgelegt, komplexe Digitalthemen verständlich zu rahmen und Vertrauen in das Netzwerk aufzubauen.',
    result:
      'Das Ergebnis ist ein professioneller Verbandsauftritt, der Mission, Themenkompetenz und Expertennetzwerk in einer klaren Informationsarchitektur verbindet. Der Verband Digitale Innovation wirkt dadurch nicht nur sichtbar, sondern als kuratierte Anlaufstelle für digitale Zukunftsthemen.',
  },
  'Zahnarzt Kipp': {
    summary:
      'Patientennaher Praxisauftritt für Zahnarzt Kipp mit freundlicher Bildsprache, klarer Leistungsstruktur und kurzen Wegen von der ersten Orientierung zur Kontaktaufnahme.',
    challenge:
      'Eine Zahnarztpraxis muss online sehr schnell Vertrauen aufbauen: Patientinnen suchen Orientierung, Leistungen und Kontaktmöglichkeiten, während gleichzeitig Kompetenz, Nähe und ein ruhiger Gesamteindruck spürbar sein müssen. Genau diese Balance sollte der neue Auftritt leisten.',
    approach:
      'Umgesetzt wurde ein responsiver Praxisauftritt mit freundlichem Einstieg, klarer Leistungsstruktur und bewusst kurzen Wegen zu Kontakt und Anfrage. Bildsprache, Texte und UI wurden so abgestimmt, dass die Website medizinische Qualität vermittelt und trotzdem nahbar bleibt.',
    result:
      'Das Ergebnis ist eine helle, patientennahe Website, die Praxisprofil, Behandlungsspektrum und Kontaktpunkte auf allen Geräten konsistent präsentiert. Zahnarzt Kipp erhält damit einen digitalen Erstkontakt, der Vertrauen schafft, bevor ein Termin vereinbart wird.',
  },
  'ZHKplus - Zahnheilkunde Plus': {
    summary:
      'Redaktionelles Portal für Zahnmedizin und Verbraucherinformation, das Themencluster, Expertenperspektiven und SEO-orientierte Inhaltsstruktur in einer klaren Nutzerführung zusammenbringt.',
    challenge:
      'ZHKplus braucht als Portal mehr als eine klassische Website: Viele zahnmedizinische Themen, Verbraucherfragen und Expertenperspektiven müssen auffindbar, verständlich und glaubwürdig organisiert werden. Die Herausforderung lag darin, redaktionelle Tiefe mit einfacher Navigation zu verbinden.',
    approach:
      'Aufgebaut wurde eine portalartige Informationsarchitektur mit Themenclustern, Artikelübersichten und klaren Einstiegspunkten für unterschiedliche Informationsbedürfnisse. UX, Content-Struktur und SEO-Logik greifen zusammen, damit Inhalte nicht nur publiziert, sondern auch gefunden und genutzt werden.',
    result:
      'Entstanden ist ein umfangreiches Informationsportal, das zahnmedizinische Verbraucheraufklärung, Expertennetzwerk und redaktionelle Inhalte in einer nutzerfreundlichen Oberfläche bündelt. ZHKplus positioniert sich damit als zentrale Anlaufstelle für verständliche Zahnmedizin im Netz.',
  },
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const payload = await getPayload({ config })

  const leistungenRes = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: CENTRAL_PORTFOLIO_PAGE_SLUG } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const leistungen = leistungenRes.docs[0]
  if (!leistungen) {
    throw new Error(`Seite "${CENTRAL_PORTFOLIO_PAGE_SLUG}" nicht gefunden.`)
  }

  const currentLayout = (Array.isArray(leistungen.layout) ? leistungen.layout : []) as LayoutBlock[]
  const centralBlock = findCentralPortfolioCaseBlock(currentLayout)

  if (!centralBlock || !Array.isArray(centralBlock.cases)) {
    throw new Error(
      `Kein zentraler portfolioCaseGrid auf /${CENTRAL_PORTFOLIO_PAGE_SLUG} gefunden.`,
    )
  }

  const updatedTitles: string[] = []
  const nextCases = (centralBlock.cases as PortfolioCase[]).map((entry) => {
    const update = COPY_UPDATES[String(entry.title ?? '')]
    if (!update) return entry

    updatedTitles.push(String(entry.title))
    return stripNestedIds({
      ...entry,
      ...update,
    })
  })

  const nextCentralBlock = buildCentralPortfolioCaseBlock({
    ...centralBlock,
    cases: nextCases,
  } as PortfolioCaseGridBlock)

  const nextLayout = currentLayout.map((block) => {
    if (block !== centralBlock) return block
    return nextCentralBlock
  })

  console.log(`Ziel: /${CENTRAL_PORTFOLIO_PAGE_SLUG} -> Copy-Update`)
  updatedTitles.forEach((title) => console.log(`  - ${title}`))
  console.log(`Aktualisiert: ${updatedTitles.length}`)

  if (dryRun) {
    console.log('\n[dry-run] Keine Änderungen geschrieben.')
    return
  }

  await payload.update({
    collection: 'site-pages',
    id: leistungen.id,
    data: {
      layout: nextLayout as unknown as RequiredDataFromCollectionSlug<'site-pages'>['layout'],
    },
    overrideAccess: true,
    depth: 0,
    context: { skipRevalidate: true },
  })

  try {
    revalidateTag('site-pages')
  } catch {
    // revalidateTag funktioniert nur im Next.js-Request-Kontext.
  }

  console.log('\nFertig. Die Case-Copy ist im zentralen Portfolio-Slider aktualisiert.')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
