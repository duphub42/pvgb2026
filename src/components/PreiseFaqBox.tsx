import React from 'react'

import { Faq8Client } from '@/components/ui/faq-8.client'
import type { FaqCategory } from '@/components/ui/faq-8.data'

const preiseFaqCategories: FaqCategory[] = [
  {
    value: 'allgemein',
    label: 'Allgemein',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Was kostet eine Werbeagentur in Halle im Durchschnitt?',
        answer:
          'Für kleine Unternehmen in Halle liegen viele Projekte im Bereich von 390 bis 2.800 Euro; typische Website- und Branding-Projekte bewegen sich oft zwischen 1.400 und 5.500 Euro. Der genaue Preis hängt davon ab, ob Sie eine Einzelleistung, ein Paket oder mehrere Leistungen kombinieren.',
      },
      {
        question: 'Wie berechnen Sie Ihre Preise (Stundensatz, Projektpreis, Paketpreis)?',
        answer:
          'Bei klar abgegrenzten Projekten arbeite ich mit Festpreisen. Für flexible Beratung liegt der Stundensatz bei 120 Euro netto, laufende Leistungen werden als Paket oder monatlicher Retainer kalkuliert.',
      },
      {
        question: 'Gibt es feste Pakete oder wird jedes Angebot individuell kalkuliert?',
        answer:
          'Beides ist möglich. Für kleine Unternehmen in Halle gibt es schlanke Einstiegspakete, und wenn der Umfang klar ist, kalkuliere ich ein transparentes Festpreisangebot auf Basis des konkreten Bedarfs.',
      },
      {
        question: 'Muss ich mich langfristig binden, oder sind auch Einzelaufträge möglich?',
        answer:
          'Einzelaufträge sind möglich, genauso wie laufende Betreuung ohne lange Bindung. Monatliche Zusammenarbeit lässt sich flexibel starten und bei Bedarf auch wieder beenden.',
      },
    ],
  },
  {
    value: 'leistungsbereiche',
    label: 'Preise nach Leistung',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Was kostet ein Logo/Corporate Design für ein kleines Unternehmen?',
        answer:
          'Ein Logo startet meist bei 690 bis 1.800 Euro. Ein vollständiges Corporate-Design-Paket für kleine Unternehmen liegt in der Regel bei 2.200 bis 5.500 Euro.',
      },
      {
        question: 'Was kostet eine Website für einen kleinen Betrieb in Halle?',
        answer:
          'Eine Landing Page startet bei 690 bis 1.200 Euro, eine kleine Website bis 5 Seiten liegt meist bei 1.400 bis 2.800 Euro, und eine Unternehmenswebsite bis 15 Seiten bei 2.800 bis 5.500 Euro.',
      },
      {
        question: 'Was kostet die monatliche Betreuung von Social-Media-Kanälen?',
        answer:
          'Je nach Kanal, Frequenz und Abstimmungsaufwand liegt die monatliche Betreuung meist bei 490 bis 1.800 Euro. Laufende Content-Erstellung startet typischerweise bei 690 Euro pro Monat, Community Management bei 490 Euro pro Monat.',
      },
      {
        question: 'Was kostet eine Google-Ads- oder SEO-Kampagne im Monat?',
        answer:
          'SEO-Betreuung liegt typischerweise bei 490 bis 1.400 Euro im Monat. Das laufende Kampagnen-Management für Google Ads liegt meist bei 390 bis 990 Euro pro Monat; das Werbebudget kommt zusätzlich dazu.',
      },
      {
        question: 'Was kostet ein Flyer- oder Plakatdesign?',
        answer:
          'Ein Flyer- oder Folder-Design liegt meist bei 390 bis 890 Euro. Kleinere Printmotive wie Briefpapier oder Visitenkarten sind günstiger, größere Formate und Broschüren bewegen sich eher bei 890 bis 2.800 Euro.',
      },
      {
        question: 'Was kostet Content- oder Videoproduktion für kleine Unternehmen?',
        answer:
          'Ein kompakter Foto- oder Video-Content-Tag für kleine Unternehmen in Halle liegt meist bei 690 bis 1.400 Euro. Umfangreichere Imagefilm-Produktionen mit mehreren Drehorten, Schnittfassungen und Social-Formaten liegen deutlich darüber.',
      },
    ],
  },
  {
    value: 'fairness',
    label: 'Fairness für kleine Betriebe',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Gibt es spezielle Konditionen für kleine Unternehmen oder Existenzgründer?',
        answer:
          'Ja, für kleine Unternehmen und Existenzgründer in Halle kann der Umfang bewusst schlank gehalten werden. So bleibt der Einstieg bezahlbar, ohne dass die Qualität oder die strategische Wirkung leidet.',
      },
      {
        question: 'Was passiert, wenn mein Budget kleiner ist als eure Standardpakete?',
        answer:
          'Dann priorisiere ich die Maßnahmen mit dem größten Nutzen und reduzieren den Scope. Für kleine Unternehmen in Halle ist oft ein fokussierter Einstieg sinnvoller als ein zu großes Gesamtpaket.',
      },
      {
        question: 'Sind eure Preise günstiger als bei größeren Agenturen aus Leipzig oder Berlin?',
        answer:
          'Oft ja, weil keine großen Overhead-Kosten mitbezahlt werden. Kleine Betriebe in Halle bekommen dadurch direkte Betreuung, transparente Kalkulation und keine unnötigen Agenturstrukturen.',
      },
      {
        question: 'Gibt es versteckte Kosten, oder ist der Angebotspreis der Endpreis?',
        answer:
          'Es gibt keine versteckten Kosten. Alle Leistungen werden im Angebot klar aufgelistet, und zusätzliche Posten wie Hosting, Domain oder Werbebudget werden vorab separat ausgewiesen.',
      },
    ],
  },
  {
    value: 'vertrag',
    label: 'Vertrag & Ablauf',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Wie und wann wird bezahlt (Anzahlung, Ratenzahlung, nach Projektabschluss)?',
        answer:
          'Typisch sind Anzahlung und Restzahlung nach Meilensteinen oder zum Projektabschluss. Laufende Betreuung wird in der Regel monatlich abgerechnet.',
      },
      {
        question:
          'Bekomme ich vorher ein verbindliches Angebot, oder wird nach Aufwand abgerechnet?',
        answer:
          'Bei klar umrissenen Projekten bekommen Sie ein verbindliches Festpreisangebot. Nach Aufwand rechne ich nur dort ab, wo der Umfang bewusst offen oder flexibel gehalten werden soll.',
      },
      {
        question:
          'Was ist, wenn sich der Projektumfang während der Arbeit ändert – wird nachberechnet?',
        answer:
          'Ja, wenn sich der Umfang ändert, wird der Mehraufwand transparent vorab besprochen und erst dann angepasst. So bleibt das Budget für kleine Unternehmen in Halle nachvollziehbar und kontrollierbar.',
      },
      {
        question: 'Sind die Preise inkl. oder exkl. Mehrwertsteuer angegeben?',
        answer:
          'Die Preise werden im Angebot klar als netto oder brutto ausgewiesen. Vor Projektstart ist immer eindeutig nachvollziehbar, was am Ende zu zahlen ist.',
      },
    ],
  },
]

const preiseFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: preiseFaqCategories.flatMap((category) =>
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

export function PreiseFaqBox(): React.JSX.Element {
  return (
    <>
      <Faq8Client
        categories={preiseFaqCategories}
        eyebrow="FAQ Preise"
        title="Transparente Preise für kleine Unternehmen in Halle"
        description="Diese FAQ macht die wichtigsten Preisfragen für Halle, kleine Betriebe und lokale Suchanfragen schnell verständlich. Die Antworten nennen konkrete Spannen, damit Nutzer und KI-Systeme Preise direkt vergleichen können."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(preiseFaqSchema) }}
      />
    </>
  )
}

export default PreiseFaqBox
