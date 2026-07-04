import React from 'react'
import { Faq8Client } from '@/components/ui/faq-8.client'
import type { FaqCategory } from '@/components/ui/faq-8.data'

const portfolioFaqCategories: FaqCategory[] = [
  {
    value: 'referenzen-cases',
    label: 'Referenzen & Cases',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Welche Projekte werden im Portfolio gezeigt?',
        answer:
          'Das Portfolio zeigt Projekte aus Webdesign, SEO/SEM, Markenaufbau und Conversion-Optimierung. Jeder Case beschreibt Ausgangslage, Zielbild, Vorgehen, Umsetzung und Ergebnisse.',
      },
      {
        question: 'Sind alle Cases echte Kundenprojekte?',
        answer:
          'Ja. Alle gezeigten Arbeiten basieren auf realen Projekten. Wenn Vertraulichkeit vereinbart wurde, werden sensible Daten anonymisiert oder in abstrahierter Form dargestellt.',
      },
      {
        question: 'Warum sind manche Projekte kuerzer beschrieben als andere?',
        answer:
          'Die Detailtiefe haengt von Freigaben, Datenlage und Branchenanforderungen ab. Wo moeglich, werden Zahlen und konkrete Ergebnisse gezeigt. Wo noetig, bleibt die Darstellung bewusst komprimiert.',
      },
      {
        question: 'Welche Branchen sind im Portfolio vertreten?',
        answer:
          'Die Referenzen kommen unter anderem aus Dienstleistung, Handwerk, B2B, Gesundheitsumfeld, Bildung und regionalem Mittelstand. Dadurch werden unterschiedliche Markt- und Zielgruppensituationen abgedeckt.',
      },
      {
        question: 'Wie aktuell sind die gezeigten Referenzen?',
        answer:
          'Das Portfolio wird laufend gepflegt. Neue Projekte werden nach Abschluss und Freigabe integriert, bestehende Cases werden bei wichtigen Entwicklungen aktualisiert.',
      },
      {
        question: 'Kann ich ein Projekt sehen, das meinem Fall aehnlich ist?',
        answer:
          'Ja. Nach einem kurzen Erstgespraech kann ich passende Vergleichsprojekte benennen, die in Zielsetzung, Budgetrahmen, Funnel-Struktur oder technischen Anforderungen Ihrem Vorhaben aehneln.',
      },
    ],
  },
  {
    value: 'strategie-umsetzung',
    label: 'Strategie & Umsetzung',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Wie laeuft ein Portfolio-aehnliches Projekt typischerweise ab?',
        answer:
          'Typisch sind fuenf Phasen: Analyse, Struktur, Design, technische Umsetzung und Optimierung. Jede Phase hat klare Deliverables, damit Entscheidungen transparent und reproduzierbar bleiben.',
      },
      {
        question: 'Welche Rolle spielen UX und Informationsarchitektur?',
        answer:
          'UX und Informationsarchitektur bilden das Fundament fuer Auffindbarkeit und Conversion. Navigation, Seitenhierarchie, Content-Struktur und CTA-Pfade werden zuerst definiert und dann visuell sowie technisch umgesetzt.',
      },
      {
        question: 'Arbeiten Sie nur mit neuen Projekten oder auch mit Bestandssystemen?',
        answer:
          'Beides. Bestehende Websites, Tracking-Setups und Content-Bestaende werden analysiert und gezielt verbessert. Ein kompletter Neubau wird nur empfohlen, wenn er wirtschaftlich sinnvoll ist.',
      },
      {
        question: 'Wie stellen Sie sicher, dass Design und Performance zusammenpassen?',
        answer:
          'Designentscheidungen werden mit technischen Vorgaben kombiniert: Bildstrategie, Komponentensystem, Ladezeitziele, Core Web Vitals und Mobil-Performance werden schon in der Konzeption beruecksichtigt.',
      },
      {
        question: 'Welche CMS- und Tech-Stacks sind moeglich?',
        answer:
          'Je nach Ziel koennen schlanke CMS-Loesungen, Headless-Architekturen oder klassische Systeme eingesetzt werden. Wichtig ist, dass Redaktion, Wartung, SEO und Erweiterbarkeit langfristig funktionieren.',
      },
      {
        question: 'Wie werden Inhalte und Freigaben organisiert?',
        answer:
          'Texte, Medien und Seiten werden in klaren Freigabeschritten geplant. Dadurch entstehen weniger Korrekturschleifen, bessere Konsistenz und ein planbarer Launch ohne Last-Minute-Chaos.',
      },
    ],
  },
  {
    value: 'messbarkeit-ergebnisse',
    label: 'Messbarkeit & Ergebnisse',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Welche Kennzahlen nutzen Sie zur Bewertung von Ergebnissen?',
        answer:
          'Relevant sind unter anderem qualifizierte Leads, Sichtbarkeit je Themencluster, Conversion-Rate, Kosten pro Anfrage, organischer Traffic, Core Web Vitals und Abschlussquote pro Kanal.',
      },
      {
        question: 'Wie schnell sind erste Ergebnisse sichtbar?',
        answer:
          'Technische und UX-Verbesserungen wirken oft kurzfristig. SEO- und Demand-Effekte bauen sich ueber mehrere Wochen und Monate auf. Der Zeitrahmen haengt von Wettbewerb, Ausgangslage und Content-Qualitaet ab.',
      },
      {
        question: 'Wie wird Tracking eingerichtet?',
        answer:
          'Tracking wird datenschutzkonform und zielorientiert aufgebaut: Events, Ziele, Formularpfade, Kanalzuordnung und Reporting-Views werden auf Ihre Geschaeftsziele abgestimmt.',
      },
      {
        question: 'Kann ich nachvollziehen, welche Massnahme welchen Effekt hatte?',
        answer:
          'Ja. Aenderungen werden dokumentiert und mit Metriken verknuepft. Damit wird transparent, welche Optimierungen den groessten Beitrag zu Anfragen, Sichtbarkeit oder Umsatz geleistet haben.',
      },
      {
        question: 'Gibt es auch qualitative Erfolgsindikatoren?',
        answer:
          'Ja. Neben Zahlen sind auch bessere Nutzerfuehrung, klarere Positionierung, staerkeres Markenbild und kuerzere Entscheidungswege im Vertrieb relevante Qualitaetsindikatoren.',
      },
      {
        question: 'Wie oft werden Ergebnisse ausgewertet?',
        answer:
          'Je nach Projektumfang erfolgt die Auswertung woechentlich, zweiwoechentlich oder monatlich. In den Reviews werden Prioritaeten fuer die naechste Umsetzungsphase definiert.',
      },
    ],
  },
  {
    value: 'zusammenarbeit-support',
    label: 'Zusammenarbeit & Support',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Wie startet die Zusammenarbeit nach einer Anfrage?',
        answer:
          'Der Start erfolgt mit einem strukturierten Erstgespraech. Danach folgen Zielklaerung, Scope-Einschaetzung und ein Vorschlag fuer Prioritaeten, Aufwand und sinnvolle Meilensteine.',
      },
      {
        question: 'Welche Unterlagen helfen fuer ein gutes Angebot?',
        answer:
          'Hilfreich sind aktuelle Website-URL, Zielgruppenbeschreibung, Angebotslogik, vorhandene Datenquellen, Wunschzeitplan und bekannte technische Rahmenbedingungen.',
      },
      {
        question: 'Gibt es feste Pakete oder individuelle Umfaenge?',
        answer:
          'Beides ist moeglich. Es gibt klare Einstiegspakete, gleichzeitig koennen Umfang und Tiefe modular auf Ihre Ziele, Ressourcen und Ihr Budget angepasst werden.',
      },
      {
        question: 'Bieten Sie Betreuung nach Launch und Uebergabe?',
        answer:
          'Ja. Nach dem Launch sind Wartung, Weiterentwicklung, Performance-Checks, SEO-Iteration und Support moeglich, damit der Webauftritt dauerhaft stabil und wirksam bleibt.',
      },
      {
        question: 'Wie laeuft die Kommunikation waehrend des Projekts?',
        answer:
          'Die Kommunikation erfolgt schlank und verbindlich ueber feste Update-Routinen, priorisierte Aufgabenlisten und kurze Entscheidungswege. Das reduziert Leerlauf und schafft klares Momentum.',
      },
      {
        question: 'Koennen interne Teams eingebunden werden?',
        answer:
          'Ja. Marketing, Vertrieb, IT oder externe Partner koennen gezielt eingebunden werden. Ziel ist ein Setup, das Know-how transferiert und Ihre Organisation langfristig handlungsfaehig macht.',
      },
    ],
  },
]

const portfolioFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: portfolioFaqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  ),
}

export function PortfolioFaqBox(): React.JSX.Element {
  return (
    <>
      <Faq8Client
        categories={portfolioFaqCategories}
        eyebrow="FAQ Portfolio"
        title="Haeufige Fragen zu Referenzen, Projektablauf und messbaren Portfolio-Ergebnissen"
        description="Diese strukturierte FAQ beantwortet zentrale Fragen zu Cases, Methodik, KPIs, Zusammenarbeit und Support. So koennen Nutzer und KI-Systeme den fachlichen Kontext Ihrer Portfolio-Seite eindeutig einordnen."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioFaqSchema) }}
      />
    </>
  )
}

export default PortfolioFaqBox
