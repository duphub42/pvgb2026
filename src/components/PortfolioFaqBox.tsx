import React from 'react'
import { PageFaqBox, type EditablePageFaq } from '@/components/PageFaqBox'
import type { FaqCategory } from '@/components/ui/faq-8.data'

export const portfolioFaqCategories: FaqCategory[] = [
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
        question: 'Warum sind manche Projekte kürzer beschrieben als andere?',
        answer:
          'Die Detailtiefe hängt von Freigaben, Datenlage und Branchenanforderungen ab. Wo möglich, werden Zahlen und konkrete Ergebnisse gezeigt. Wo nötig, bleibt die Darstellung bewusst komprimiert.',
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
        question: 'Kann ich ein Projekt sehen, das meinem Fall ähnlich ist?',
        answer:
          'Ja. Nach einem kurzen Erstgespräch kann ich passende Vergleichsprojekte benennen, die in Zielsetzung, Budgetrahmen, Funnel-Struktur oder technischen Anforderungen Ihrem Vorhaben ähneln.',
      },
    ],
  },
  {
    value: 'strategie-umsetzung',
    label: 'Strategie & Umsetzung',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Wie läuft ein Portfolio-ähnliches Projekt typischerweise ab?',
        answer:
          'Typisch sind fünf Phasen: Analyse, Struktur, Design, technische Umsetzung und Optimierung. Jede Phase hat klare Deliverables, damit Entscheidungen transparent und reproduzierbar bleiben.',
      },
      {
        question: 'Welche Rolle spielen UX und Informationsarchitektur?',
        answer:
          'UX und Informationsarchitektur bilden das Fundament für Auffindbarkeit und Conversion. Navigation, Seitenhierarchie, Content-Struktur und CTA-Pfade werden zuerst definiert und dann visuell sowie technisch umgesetzt.',
      },
      {
        question: 'Arbeiten Sie nur mit neuen Projekten oder auch mit Bestandssystemen?',
        answer:
          'Beides. Bestehende Websites, Tracking-Setups und Content-Bestände werden analysiert und gezielt verbessert. Ein kompletter Neubau wird nur empfohlen, wenn er wirtschaftlich sinnvoll ist.',
      },
      {
        question: 'Wie stellen Sie sicher, dass Design und Performance zusammenpassen?',
        answer:
          'Designentscheidungen werden mit technischen Vorgaben kombiniert: Bildstrategie, Komponentensystem, Ladezeitziele, Core Web Vitals und Mobil-Performance werden schon in der Konzeption berücksichtigt.',
      },
      {
        question: 'Welche CMS- und Tech-Stacks sind möglich?',
        answer:
          'Je nach Ziel können schlanke CMS-Lösungen, Headless-Architekturen oder klassische Systeme eingesetzt werden. Wichtig ist, dass Redaktion, Wartung, SEO und Erweiterbarkeit langfristig funktionieren.',
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
          'Technische und UX-Verbesserungen wirken oft kurzfristig. SEO- und Demand-Effekte bauen sich über mehrere Wochen und Monate auf. Der Zeitrahmen hängt von Wettbewerb, Ausgangslage und Content-Qualität ab.',
      },
      {
        question: 'Wie wird Tracking eingerichtet?',
        answer:
          'Tracking wird datenschutzkonform und zielorientiert aufgebaut: Events, Ziele, Formularpfade, Kanalzuordnung und Reporting-Views werden auf Ihre Geschäftsziele abgestimmt.',
      },
      {
        question: 'Kann ich nachvollziehen, welche Maßnahme welchen Effekt hatte?',
        answer:
          'Ja. Änderungen werden dokumentiert und mit Metriken verknüpft. Damit wird transparent, welche Optimierungen den größten Beitrag zu Anfragen, Sichtbarkeit oder Umsatz geleistet haben.',
      },
      {
        question: 'Gibt es auch qualitative Erfolgsindikatoren?',
        answer:
          'Ja. Neben Zahlen sind auch bessere Nutzerführung, klarere Positionierung, stärkeres Markenbild und kürzere Entscheidungswege im Vertrieb relevante Qualitätsindikatoren.',
      },
      {
        question: 'Wie oft werden Ergebnisse ausgewertet?',
        answer:
          'Je nach Projektumfang erfolgt die Auswertung wöchentlich, zweiwöchentlich oder monatlich. In den Reviews werden Prioritäten für die nächste Umsetzungsphase definiert.',
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
          'Der Start erfolgt mit einem strukturierten Erstgespräch. Danach folgen Zielklärung, Scope-Einschätzung und ein Vorschlag für Prioritäten, Aufwand und sinnvolle Meilensteine.',
      },
      {
        question: 'Welche Unterlagen helfen für ein gutes Angebot?',
        answer:
          'Hilfreich sind aktuelle Website-URL, Zielgruppenbeschreibung, Angebotslogik, vorhandene Datenquellen, Wunschzeitplan und bekannte technische Rahmenbedingungen.',
      },
      {
        question: 'Gibt es feste Pakete oder individuelle Umfänge?',
        answer:
          'Beides ist möglich. Es gibt klare Einstiegspakete, gleichzeitig können Umfang und Tiefe modular auf Ihre Ziele, Ressourcen und Ihr Budget angepasst werden.',
      },
      {
        question: 'Bieten Sie Betreuung nach Launch und Übergabe?',
        answer:
          'Ja. Nach dem Launch sind Wartung, Weiterentwicklung, Performance-Checks, SEO-Iteration und Support möglich, damit der Webauftritt dauerhaft stabil und wirksam bleibt.',
      },
      {
        question: 'Wie läuft die Kommunikation während des Projekts?',
        answer:
          'Die Kommunikation erfolgt schlank und verbindlich über feste Update-Routinen, priorisierte Aufgabenlisten und kurze Entscheidungswege. Das reduziert Leerlauf und schafft klares Momentum.',
      },
      {
        question: 'Können interne Teams eingebunden werden?',
        answer:
          'Ja. Marketing, Vertrieb, IT oder externe Partner können gezielt eingebunden werden. Ziel ist ein Setup, das Know-how transferiert und Ihre Organisation langfristig handlungsfähig macht.',
      },
    ],
  },
]

export const portfolioFaqFallback = {
  categories: portfolioFaqCategories,
  eyebrow: 'FAQ Portfolio',
  title: 'Häufige Fragen zu Referenzen, Projektablauf und messbaren Portfolio-Ergebnissen',
  description:
    'Diese strukturierte FAQ beantwortet zentrale Fragen zu Cases, Methodik, KPIs, Zusammenarbeit und Support. So können Nutzer und KI-Systeme den fachlichen Kontext Ihrer Portfolio-Seite eindeutig einordnen.',
}

export function PortfolioFaqBox({
  faq,
}: {
  faq?: EditablePageFaq | null
}): React.JSX.Element | null {
  return <PageFaqBox faq={faq} fallback={portfolioFaqFallback} />
}

export default PortfolioFaqBox
