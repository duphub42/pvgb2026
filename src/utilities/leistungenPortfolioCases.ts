import {
  MARKETING_PORTFOLIO_CASES,
  MARKETING_PORTFOLIO_CASE_TITLES,
} from '@/utilities/marketingPortfolioCaseContent'

export type LeistungenCaseBlock = Record<string, unknown> & { blockType?: string }

function buildFallbackMarketingCase(title: (typeof MARKETING_PORTFOLIO_CASE_TITLES)[number]) {
  const seed = MARKETING_PORTFOLIO_CASES[title]
  const { coverImageId, ...caseData } = seed

  return {
    ...caseData,
    title,
    coverImage: coverImageId,
    cta: { label: 'Case ansehen', href: seed.website.href },
  }
}

/**
 * Fallback-Inhalte, wenn der zentrale Block auf /leistungen noch nicht gepflegt ist.
 * Produktiv: Cases nur im Block „Zentrale Portfolio-Referenzen“ auf /leistungen pflegen.
 */
export function buildLeistungenPortfolioCaseBlock(): LeistungenCaseBlock {
  return {
    blockType: 'portfolioCaseGrid',
    blockName: 'Leistungen Teaser Cases',
    blockSpacingPadding: 'default',
    blockSpacingPaddingTop: 'default',
    blockSpacingMarginBottom: 'default',
    blockContainer: 'default',
    blockBackground: 'muted',
    eyebrow: 'Referenzen',
    heading: 'Umgesetzte Websites und Kampagnen',
    intro:
      'Ein kompakter Auszug aus realen Projekten. Für Details geht es direkt in das Portfolio.',
    layoutVariant: 'editorial',
    cases: [
      {
        discipline: 'webdesign',
        title: 'Relaunch Unternehmenswebsite',
        client: 'Mittelstaendisches B2B-Unternehmen',
        industry: 'Industrie',
        summary:
          'Modernisierung von Struktur, UI und Performance für bessere Nutzerführung und Conversion.',
        year: 2024,
        categories: ['relaunch', 'uxUi', 'performance'],
        metrics: [
          { value: '+38%', label: 'Conversion' },
          { value: '1.8s', label: 'LCP' },
        ],
        tags: [{ label: 'UX' }, { label: 'Performance' }],
        cta: { label: 'Projekt ansehen', href: '/portfolio-webdesign' },
        featured: true,
      },
      buildFallbackMarketingCase('Trinkwasser Verband'),
      buildFallbackMarketingCase('Initiative Saubere Luft'),
      buildFallbackMarketingCase('Soulmating'),
      {
        discipline: 'webdesign',
        title: 'KIPP Dental',
        client: 'KIPP Dental',
        industry: 'Medizintechnik / Dentallabor',
        summary:
          'Digitaler Marken- und Serviceauftritt für ein Dentallabor, der dentale Präzisionstechnik, Team-Kompetenz und direkte Kontaktwege zu einem hochwertigen Web-Erlebnis verbindet.',
        year: 2025,
        categories: ['komplettDesign', 'uxUi', 'performance'],
        challenge:
          'Ein spezialisiertes Dentallabor muss seine technische Präzision schnell vermitteln, ohne kühl oder austauschbar zu wirken. Die Website sollte Laborleistungen, Team-Kompetenz und Serviceangebote so ordnen, dass Zahnarztpraxen direkt verstehen, wofür KIPP Dental steht und wie die Zusammenarbeit abläuft.',
        approach:
          'Entwickelt wurde ein fokussierter Auftritt mit klarer Seitenarchitektur, prägnanter Leistungsdarstellung und einer Bildsprache, die Präzisionstechnik und persönliche Betreuung verbindet. Die Inhalte wurden auf schnelle Orientierung, glaubwürdige Expertise und reibungslose Kontaktwege ausgelegt.',
        result:
          'Das Ergebnis ist eine moderne Labor-Website, die technische Qualität, Serviceverständnis und Markenauftritt konsistent zusammenführt. KIPP Dental präsentiert sich damit digital so hochwertig, wie die eigene Präzisionsarbeit wahrgenommen werden soll.',
        metrics: [
          { value: '2025', label: 'Projektjahr' },
          { value: '100%', label: 'Responsive Auftritt' },
        ],
        tags: [{ label: 'Webdesign' }, { label: 'Dentallabor' }, { label: 'Medizintechnik' }],
        website: { label: 'kipp-dental.de', href: 'https://kipp-dental.de' },
        cta: { label: 'Website ansehen', href: 'https://kipp-dental.de' },
      },
      {
        discipline: 'webdesign',
        title: 'MEDIFISCH',
        client: 'MEDIFISCH',
        industry: 'Wellness & SPA Bedarf',
        summary:
          'Langfristig betreuter Dropshipping-Shop für Wellness- und SPA-Bedarf: von Sortiment und Kategoriearchitektur bis zu nutzerfreundlicher Produktführung und skalierbarer E-Commerce-Basis.',
        year: 2026,
        categories: ['eCommerce', 'performance', 'uxUi'],
        challenge:
          'MEDIFISCH verbindet ein breites Sortiment für Wellness- und SPA-Bedarf mit den operativen Anforderungen eines Dropshipping-Modells. Die Herausforderung lag darin, Produktvielfalt, Vertrauen und Kaufentscheidung so zu strukturieren, dass aus einem umfangreichen Angebot ein verständlicher, skalierbarer Vertriebskanal wird.',
        approach:
          'Über mehrere Projektphasen hinweg wurden Shop-Struktur, Produktlogik, Kategoriearchitektur und conversionnahe Nutzerführung weiterentwickelt. Im Fokus standen klare Einstiege ins Sortiment, belastbare E-Commerce-Prozesse und eine Pflegebasis, die langfristig mit dem Angebot wachsen kann.',
        result:
          'Entstanden ist ein langfristig betreuter Online-Shop, der Sortiment, Produktkommunikation und Verkaufsstrecken in einem stabilen digitalen System bündelt. MEDIFISCH kann dadurch ein spezialisiertes Wellness- und SPA-Angebot professionell sichtbar machen und kontinuierlich ausbauen.',
        metrics: [
          { value: '2014-2026', label: 'Projektlaufzeit' },
          { value: '12+', label: 'Jahre Betreuung' },
        ],
        tags: [{ label: 'E-Commerce' }, { label: 'Dropshipping' }, { label: 'Wellness & SPA' }],
        website: { label: 'medifisch.de', href: 'https://medifisch.de' },
        cta: { label: 'Website ansehen', href: 'https://medifisch.de' },
      },
      {
        discipline: 'mixed',
        title: 'Verband Digitale Innovation',
        client: 'Verband Digitale Innovation',
        industry: 'Verein für digitale Innovation / Expertennetzwerk',
        summary:
          'Verbandsplattform für digitale Innovation, die Expertennetzwerk, Themenkompetenz und lösungsorientierte Kommunikation zu einem glaubwürdigen digitalen Auftritt bündelt.',
        year: 2023,
        categories: ['komplettDesign', 'content', 'uxUi'],
        challenge:
          'Der Verband brauchte einen digitalen Auftritt, der fachliche Autorität, Netzwerkcharakter und Innovationsanspruch gleichzeitig transportiert. Inhalte zu Transformation, Cybersecurity und digitalen Lösungen sollten nicht wie einzelne Themeninseln wirken, sondern als schlüssiges Expertenökosystem sichtbar werden.',
        approach:
          'Konzipiert wurde eine Verbandsplattform mit klaren Themenbereichen, lösungsorientierten Einstiegen und einer Kommunikation, die Fachlichkeit greifbar macht. Struktur, Textführung und visuelle Hierarchie wurden darauf ausgelegt, komplexe Digitalthemen verständlich zu rahmen und Vertrauen in das Netzwerk aufzubauen.',
        result:
          'Das Ergebnis ist ein professioneller Verbandsauftritt, der Mission, Themenkompetenz und Expertennetzwerk in einer klaren Informationsarchitektur verbindet. Der Verband Digitale Innovation wirkt dadurch nicht nur sichtbar, sondern als kuratierte Anlaufstelle für digitale Zukunftsthemen.',
        metrics: [
          { value: '2023', label: 'Projektjahr' },
          { value: '360°', label: 'Verbandsauftritt' },
        ],
        tags: [
          { label: 'Webdesign' },
          { label: 'Expertennetzwerk' },
          { label: 'Digitale Innovation' },
        ],
        website: {
          label: 'verband-digitale-innovation.de',
          href: 'https://verband-digitale-innovation.de',
        },
        cta: { label: 'Website ansehen', href: 'https://verband-digitale-innovation.de' },
      },
      {
        discipline: 'webdesign',
        title: 'Zahnarzt Kipp',
        client: 'Zahnarztpraxis Kipp',
        industry: 'Zahnarzt',
        summary:
          'Patientennaher Praxisauftritt für Zahnarzt Kipp mit freundlicher Bildsprache, klarer Leistungsstruktur und kurzen Wegen von der ersten Orientierung zur Kontaktaufnahme.',
        year: 2024,
        categories: ['komplettDesign', 'uxUi', 'performance'],
        challenge:
          'Eine Zahnarztpraxis muss online sehr schnell Vertrauen aufbauen: Patientinnen suchen Orientierung, Leistungen und Kontaktmöglichkeiten, während gleichzeitig Kompetenz, Nähe und ein ruhiger Gesamteindruck spürbar sein müssen. Genau diese Balance sollte der neue Auftritt leisten.',
        approach:
          'Umgesetzt wurde ein responsiver Praxisauftritt mit freundlichem Einstieg, klarer Leistungsstruktur und bewusst kurzen Wegen zu Kontakt und Anfrage. Bildsprache, Texte und UI wurden so abgestimmt, dass die Website medizinische Qualität vermittelt und trotzdem nahbar bleibt.',
        result:
          'Das Ergebnis ist eine helle, patientennahe Website, die Praxisprofil, Behandlungsspektrum und Kontaktpunkte auf allen Geräten konsistent präsentiert. Zahnarzt Kipp erhält damit einen digitalen Erstkontakt, der Vertrauen schafft, bevor ein Termin vereinbart wird.',
        metrics: [
          { value: '2024', label: 'Projektjahr' },
          { value: '3', label: 'Device-Ansichten' },
        ],
        tags: [{ label: 'Webdesign' }, { label: 'Zahnarzt' }, { label: 'Praxiswebsite' }],
        website: { label: 'zahnarztkipp.de', href: 'https://zahnarztkipp.de' },
        cta: { label: 'Website ansehen', href: 'https://zahnarztkipp.de' },
      },
      {
        discipline: 'mixed',
        title: 'ZHKplus - Zahnheilkunde Plus',
        client: 'ZHKplus',
        industry: 'Zahnmedizin / Verbraucherinformation / Expertennetzwerk',
        summary:
          'Redaktionelles Portal für Zahnmedizin und Verbraucherinformation, das Themencluster, Expertenperspektiven und SEO-orientierte Inhaltsstruktur in einer klaren Nutzerführung zusammenbringt.',
        year: 2026,
        categories: ['content', 'seo', 'uxUi'],
        challenge:
          'ZHKplus braucht als Portal mehr als eine klassische Website: Viele zahnmedizinische Themen, Verbraucherfragen und Expertenperspektiven müssen auffindbar, verständlich und glaubwürdig organisiert werden. Die Herausforderung lag darin, redaktionelle Tiefe mit einfacher Navigation zu verbinden.',
        approach:
          'Aufgebaut wurde eine portalartige Informationsarchitektur mit Themenclustern, Artikelübersichten und klaren Einstiegspunkten für unterschiedliche Informationsbedürfnisse. UX, Content-Struktur und SEO-Logik greifen zusammen, damit Inhalte nicht nur publiziert, sondern auch gefunden und genutzt werden.',
        result:
          'Entstanden ist ein umfangreiches Informationsportal, das zahnmedizinische Verbraucheraufklärung, Expertennetzwerk und redaktionelle Inhalte in einer nutzerfreundlichen Oberfläche bündelt. ZHKplus positioniert sich damit als zentrale Anlaufstelle für verständliche Zahnmedizin im Netz.',
        metrics: [
          { value: 'Portal', label: 'Informationsformat' },
          { value: '360°', label: 'Themenzugang' },
        ],
        tags: [{ label: 'Portal' }, { label: 'Zahnmedizin' }, { label: 'Verbraucherinformation' }],
        website: { label: 'zhkplus.de', href: 'https://zhkplus.de' },
        cta: { label: 'Website ansehen', href: 'https://zhkplus.de' },
      },
      {
        discipline: 'branding',
        title: 'Markenwelt & Designsystem',
        client: 'Tech-Startup',
        industry: 'Software',
        summary: 'Vom Markenfundament bis zur visuellen Systematik für Web, Social und Print.',
        year: 2023,
        categories: ['branding', 'komplettDesign'],
        metrics: [
          { value: '40+', label: 'Komponenten' },
          { value: '3', label: 'Touchpoints' },
        ],
        tags: [{ label: 'Branding' }, { label: 'Designsystem' }],
        cta: { label: 'Projekt ansehen', href: '/portfolio-marken' },
      },
    ],
  }
}
