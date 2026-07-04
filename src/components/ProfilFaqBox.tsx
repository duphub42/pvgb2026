import React from 'react'

import { Faq8Client } from '@/components/ui/faq-8.client'
import type { FaqCategory } from '@/components/ui/faq-8.data'

const profilFaqCategories: FaqCategory[] = [
  {
    value: 'positionierung',
    label: 'Positionierung',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Was macht die Zusammenarbeit mit Philipp Bacher besonders?',
        answer:
          'Philipp Bacher verbindet Strategie, Design, Webentwicklung, digitales Marketing und Automatisierung in einer Person. Dadurch entstehen keine Schnittstellenverluste zwischen Beratung, Konzept und Umsetzung.',
      },
      {
        question: 'Warum sollten kleine Unternehmen mit Philipp Bacher statt mit einer groesseren Agentur arbeiten?',
        answer:
          'Kleine Unternehmen profitieren von kurzen Wegen, klarer Priorisierung und direktem Kontakt. Statt standardisierter Agenturprozesse wird der Umfang auf Budget, Ziele und vorhandene Ressourcen abgestimmt.',
      },
      {
        question: 'Was ist der Vorteil gegenueber der Arbeit mit einzelnen Freelancern?',
        answer:
          'Viele Projekte brauchen mehrere Disziplinen zugleich: Marke, Website, SEO, Content, Tracking und Automatisierung. Philipp Bacher deckt diese Bereiche integriert ab und kann Entscheidungen fachuebergreifend treffen.',
      },
      {
        question: 'Warum ist lokale Naehe in Halle und Mitteldeutschland relevant?',
        answer:
          'Lokale Naehe erleichtert Abstimmung, Marktverstaendnis und persoenliche Termine. Gerade bei KMU-Projekten hilft es, regionale Zielgruppen, Wettbewerber und Entscheidungswege praktisch zu kennen.',
      },
      {
        question: 'Welche Werte praegen die Zusammenarbeit?',
        answer:
          'Die Zusammenarbeit ist direkt, transparent und ergebnisorientiert. Wichtig sind klare Kommunikation, nachvollziehbare Entscheidungen und Loesungen, die im Alltag des Unternehmens funktionieren.',
      },
      {
        question: 'Auf welche Kundengroesse oder Branche ist das Profil ausgerichtet?',
        answer:
          'Der Schwerpunkt liegt auf KMU, Selbststaendigen und wachsenden Unternehmen, die digitale Sichtbarkeit, bessere Prozesse oder einen professionellen Markenauftritt aufbauen moechten.',
      },
    ],
  },
  {
    value: 'team-kompetenz',
    label: 'Kompetenz',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Welche Qualifikationen und Erfahrung bringt Philipp Bacher mit?',
        answer:
          'Seit 2010 arbeitet Philipp Bacher selbststaendig an digitalen Projekten in Webentwicklung, Marketing, Corporate Design, Vertriebsaufbau, ERP-Beratung und Automatisierung. Dazu kommen Studienerfahrung in Betriebswirtschaft und Wirtschaftsinformatik.',
      },
      {
        question: 'Was ist der berufliche Hintergrund von Philipp Bacher?',
        answer:
          'Der Hintergrund verbindet betriebswirtschaftliche Ausbildung, internationale Projekterfahrung und technische Umsetzungspraxis. Dadurch werden digitale Vorhaben nicht isoliert betrachtet, sondern als Teil von Vertrieb, Marke und Organisation.',
      },
      {
        question: 'Arbeitet Philipp Bacher allein oder mit Partnern?',
        answer:
          'Der Kern der Strategie, Konzeption und Umsetzung liegt direkt bei Philipp Bacher. Fuer Spezialleistungen koennen bei Bedarf ausgewaehlte Partner eingebunden werden, ohne dass die zentrale Verantwortung verloren geht.',
      },
    ],
  },
  {
    value: 'vertrauen',
    label: 'Vertrauen',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Welche Referenzen oder Vertrauenssignale gibt es?',
        answer:
          'Relevante Vertrauenssignale sind Projektbeispiele, nachvollziehbare Arbeitsweise, langjaehrige Selbststaendigkeit und die Kombination aus Strategie, Gestaltung, Technik und Marketing in realen Kundenprojekten.',
      },
      {
        question: 'Welche Partnerschaften oder Zertifizierungen sind relevant?',
        answer:
          'Je nach Projekt sind vor allem praktische Erfahrung mit Systemen wie Payload CMS, Next.js, WordPress, Google Ads, Analytics, Salesforce, HubSpot, ZOHO, SAP und Automatisierungstools relevant.',
      },
      {
        question: 'Wie viele Projekte wurden bisher betreut?',
        answer:
          'Seit 2010 wurden Projekte fuer Unternehmen in DACH, Benelux, Hongkong, Malaysia und Indonesien umgesetzt. Der Fokus liegt auf nachhaltigen Loesungen statt auf reiner Projektmenge.',
      },
      {
        question: 'Wie wird der Erfolg der Arbeit gemessen?',
        answer:
          'Der Erfolg wird je nach Ziel ueber Kennzahlen wie Anfragen, Sichtbarkeit, Conversion-Rate, Ladezeiten, Prozessersparnis oder bessere Vertriebsablaeufe bewertet und in Reviews eingeordnet.',
      },
    ],
  },
  {
    value: 'kontakt',
    label: 'Kontakt',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Wie kann ich unverbindlich Kontakt aufnehmen?',
        answer:
          'Eine Anfrage ist am einfachsten ueber die Kontaktseite moeglich. Im Erstgespraech werden Ziel, Ausgangslage, Budgetrahmen und sinnvolle naechste Schritte geklaert.',
      },
      {
        question: 'Wie schnell bekomme ich eine Antwort auf eine Anfrage?',
        answer:
          'Neue Anfragen werden in der Regel zeitnah beantwortet. Wenn das Vorhaben gut passt, folgt ein strukturiertes Erstgespraech mit konkreter Einschaetzung der naechsten Schritte.',
      },
      {
        question: 'Sind Termine vor Ort in Halle moeglich oder laeuft alles remote?',
        answer:
          'Beides ist moeglich. Projekte koennen remote per Video-Call, E-Mail und Projekttools betreut werden; fuer regionale Kunden sind nach Absprache auch persoenliche Termine sinnvoll.',
      },
    ],
  },
]

const profilFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: profilFaqCategories.flatMap((category) =>
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

export function ProfilFaqBox(): React.JSX.Element {
  return (
    <>
      <Faq8Client
        categories={profilFaqCategories}
        eyebrow="FAQ Profil"
        title="Haeufige Fragen zu Profil, Arbeitsweise und Zusammenarbeit"
        description="Antworten zu Positionierung, Kompetenz, Vertrauen und Kontakt. So wird klar, wie Philipp Bacher arbeitet und fuer welche Unternehmen die Zusammenarbeit besonders sinnvoll ist."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilFaqSchema) }}
      />
    </>
  )
}

export default ProfilFaqBox
