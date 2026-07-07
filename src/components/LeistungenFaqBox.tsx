import React from 'react'
import { PageFaqBox, type EditablePageFaq } from '@/components/PageFaqBox'
import type { FaqCategory } from '@/components/ui/faq-8.data'

export const leistungenFaqCategories: FaqCategory[] = [
  {
    value: 'allgemein',
    label: 'Allgemein',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Welche Leistungen bietet Philipp Bacher als Werbeagentur in Halle (Saale) an?',
        answer:
          'Das Angebot umfasst Branding, Webdesign und Webentwicklung, Social Media Marketing, SEO/SEA, Print und klassische Werbung sowie Content und Videoproduktion. Die Leistungen sind modular aufgebaut, damit Sie genau die Bausteine buchen können, die Ihr Projekt wirklich braucht.',
      },
      {
        question: 'Für welche Unternehmensgröße eignet sich Ihr Angebot?',
        answer:
          'Ich arbeite vor allem für kleine und lokale Betriebe in Halle und Umgebung, die sichtbar werden und professioneller auftreten wollen. Das Setup passt auch für wachsende KMU, wenn mehrere Leistungen sinnvoll kombiniert werden sollen.',
      },
      {
        question: 'Kann man auch einzelne Leistungen buchen oder nur Gesamtpakete?',
        answer:
          'Beides ist möglich. Sie können mit einer einzelnen Leistung starten oder mehrere Bereiche als stimmiges Paket kombinieren, je nach Ziel, Budget und Zeitrahmen.',
      },
    ],
  },
  {
    value: 'branding-corporate-design',
    label: 'Branding / Corporate Design',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Was ist im Branding-Paket für kleine Unternehmen enthalten?',
        answer:
          'Typisch sind Logoentwicklung, Farbwelt, Typografie und eine klare visuelle Linie für die wichtigsten Anwendungen. Je nach Bedarf kommen auch Geschäftsausstattung, Social-Media-Vorlagen oder einfache Markenrichtlinien dazu.',
      },
      {
        question: 'Was kostet ein Corporate-Design-Paket für einen kleinen Betrieb ungefähr?',
        answer:
          'Das hängt stark von Umfang und Tiefe ab. Ein fokussiertes Einstiegspaket ist deutlich günstiger als ein vollständiger Markenauftritt mit mehreren Anwendungsfällen und sauber dokumentiertem Designsystem.',
      },
      {
        question: 'Wie lange dauert die Entwicklung eines neuen Logos oder Erscheinungsbilds?',
        answer:
          'Ein kompaktes Logo- oder Branding-Projekt dauert meist nur wenige Wochen. Wenn zusätzliche Abstimmungen, Korrekturschleifen oder mehrere Anwendungsbereiche dazukommen, verlängert sich der Prozess entsprechend.',
      },
      {
        question:
          'Brauche ich als kleiner Handwerksbetrieb überhaupt ein professionelles Branding?',
        answer:
          'Ja, weil ein klarer Auftritt Vertrauen schafft und Sie von Mitbewerbern unterscheidet. Gerade für lokale Betriebe ist ein konsistentes Branding oft der schnellste Weg zu mehr Wiedererkennung und besseren Anfragen.',
      },
    ],
  },
  {
    value: 'webdesign-webentwicklung',
    label: 'Webdesign & Webentwicklung',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Was kostet eine Website für ein kleines Unternehmen in Halle?',
        answer:
          'Der Preis richtet sich nach Seitenumfang, Funktionsbedarf und Content-Aufwand. Eine schlanke Unternehmenswebsite ist günstiger als ein komplexer Auftritt mit mehreren Unterseiten, Integrationen und individuellen Sonderfunktionen.',
      },
      {
        question: 'Wie lange dauert die Erstellung einer Unternehmenswebsite im Schnitt?',
        answer:
          'Für eine kompakte Website sollten Sie mit mehreren Wochen rechnen. Bei größeren Projekten mit Strategiephase, individuellen Inhalten und zusätzlichen Abstimmungen kann es auch länger dauern.',
      },
      {
        question: 'Bekomme ich auch Hilfe bei Hosting, Domain und Wartung nach dem Launch?',
        answer:
          'Ja, die Betreuung kann über den Launch hinausgehen. Auf Wunsch übernehme ich Hosting-Setup, Domain-Begleitung, Wartung und laufende Optimierungen, damit die Website technisch stabil bleibt.',
      },
      {
        question: 'Ist die Website für Google und lokale Suche optimiert?',
        answer:
          'Ja, Onpage-SEO und lokale Suchsignale werden von Anfang an mitgedacht. Dazu gehören saubere Struktur, schnelle Ladezeiten, passende Inhalte und lokale Relevanz für Suchanfragen aus Halle und Umgebung.',
      },
    ],
  },
  {
    value: 'social-media-marketing',
    label: 'Social Media Marketing',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Welche Plattformen betreuen Sie?',
        answer:
          'Je nach Zielgruppe betreue ich Instagram, Facebook, TikTok und LinkedIn. Entscheidend ist nicht die Anzahl der Kanäle, sondern dass die Plattformen zu Ihrem Angebot und Ihrer Zielgruppe passen.',
      },
      {
        question: 'Was kostet die monatliche Betreuung eines Social-Media-Kanals?',
        answer:
          'Die laufenden Kosten hängen von Frequenz, Formatmix und Abstimmungsaufwand ab. Ein klar definierter Kanal mit planbaren Inhalten ist günstiger als ein Setup mit mehreren Plattformen, Reels und laufender Community-Betreuung.',
      },
      {
        question: 'Erstellen Sie auch die Inhalte oder nur die Strategie?',
        answer:
          'Beides ist möglich. Ich kann Strategie, Redaktionsplanung, Texte, Bildideen und auf Wunsch auch die Produktion von Fotos, Grafiken oder Reels übernehmen.',
      },
      {
        question: 'Lohnt sich Social Media Marketing auch für kleine, lokale Betriebe?',
        answer:
          'Ja, wenn die Inhalte lokal relevant und regelmäßig gepflegt sind. Social Media hilft besonders dann, wenn Sie Vertrauen aufbauen, Einblicke geben und Ihre Sichtbarkeit in der Region stärken wollen.',
      },
    ],
  },
  {
    value: 'seo-sea',
    label: 'SEO / SEA',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question:
          'Was ist der Unterschied zwischen SEO und SEA, und was empfehlen Sie kleinen Betrieben?',
        answer:
          'SEO baut organische Sichtbarkeit über Inhalte, Technik und Relevanz auf, während SEA bezahlte Anzeigen sofort Reichweite liefert. Für kleine Betriebe ist oft eine Kombination sinnvoll: SEO für nachhaltige Sichtbarkeit und SEA für schnelle, planbare Anfragen.',
      },
      {
        question: 'Wie lange dauert es, bis man SEO-Erfolge sieht?',
        answer:
          'Erste Verbesserungen können relativ schnell sichtbar werden, echte SEO-Wirkung baut sich aber meist über mehrere Wochen bis Monate auf. Der Zeitrahmen hängt von Wettbewerb, Ausgangslage und der Qualität der Inhalte ab.',
      },
      {
        question: 'Was kostet eine Google-Ads-Kampagne für ein lokales Unternehmen im Monat?',
        answer:
          'Die Höhe des Budgets hängt von Ziel, Wettbewerb und Region ab. Wichtig ist, dass Anzeigenbudget und Betreuung zusammenpassen, damit Kampagnen nicht nur laufen, sondern auch wirtschaftlich bleiben.',
      },
      {
        question: 'Optimieren Sie auch gezielt für lokale Suchanfragen?',
        answer:
          'Ja, lokale Keywords und Suchintentionen sind ein zentraler Teil der Arbeit. So wird Ihre Sichtbarkeit auf Anfragen wie „Werbeagentur Halle“ oder branchenspezifische lokale Suchen gezielt gestärkt.',
      },
    ],
  },
  {
    value: 'print-klassische-werbung',
    label: 'Print & klassische Werbung',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Welche Print-Leistungen bieten Sie an?',
        answer:
          'Ich gestalte unter anderem Flyer, Plakate, Visitenkarten und Beschriftungen. Auf Wunsch werden auch Anzeigenmotive oder andere klassische Werbemittel im passenden Look entwickelt.',
      },
      {
        question: 'Übernehmen Sie auch die Produktion oder nur die Gestaltung?',
        answer:
          'Die Gestaltung ist der Kern, die Produktion kann aber auf Wunsch mitgedacht oder begleitet werden. So bleibt das Ergebnis nicht nur optisch sauber, sondern auch technisch und druckseitig umsetzbar.',
      },
      {
        question: 'Was kostet ein einfaches Flyer- oder Plakatdesign?',
        answer:
          'Das hängt davon ab, ob nur ein einzelnes Motiv oder ein kompletter Satz an Formaten benötigt wird. Ein einfaches Design ist natürlich günstiger als ein systematischer Werbeauftritt mit mehreren Varianten und Produktionsabstimmung.',
      },
    ],
  },
  {
    value: 'content-videoproduktion',
    label: 'Content & Videoproduktion',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Produzieren Sie auch Fotos und Videos vor Ort in Halle und Umgebung?',
        answer:
          'Ja, Inhalte können direkt vor Ort in Halle und Umgebung produziert werden. Das ist besonders sinnvoll, wenn echte Einblicke, Teamaufnahmen, Produkte oder Arbeitsprozesse authentisch gezeigt werden sollen.',
      },
      {
        question: 'Was kostet ein Imagefilm oder ein kurzes Werbevideo für kleine Unternehmen?',
        answer:
          'Der Preis hängt vor allem von Aufwand, Drehdauer und Schnittumfang ab. Ein kurzes, fokussiertes Werbevideo ist deutlich schlanker kalkulierbar als ein umfangreicher Imagefilm mit mehreren Drehorten und Versionen.',
      },
      {
        question: 'Wie läuft ein Fotoshooting-Termin für mein Geschäft ab?',
        answer:
          'Vor dem Termin werden Ziel, Motive und Einsatzorte abgestimmt, damit der Dreh effizient bleibt. Beim Shooting selbst werden die wichtigsten Szenen so geplant, dass genügend Material für Website, Social Media und weitere Kanäle entsteht.',
      },
    ],
  },
]

export const leistungenFaqFallback = {
  categories: leistungenFaqCategories,
  eyebrow: 'FAQ Leistungen',
  title: 'Häufige Fragen zu Branding, Websites, Social Media, SEO und Content',
  description:
    'Diese strukturierte FAQ beantwortet typische Fragen zu Leistungen, Preisen, Umsetzung und regionaler Ausrichtung. So können Nutzer und KI-Systeme die Leistungen schnell einordnen und passende Bausteine leichter finden.',
}

export function LeistungenFaqBox({
  faq,
}: {
  faq?: EditablePageFaq | null
}): React.JSX.Element | null {
  return <PageFaqBox faq={faq} fallback={leistungenFaqFallback} />
}

export default LeistungenFaqBox
