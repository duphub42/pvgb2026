import React from 'react'

import { PageFaqBox, type EditablePageFaq } from '@/components/PageFaqBox'
import type { FaqCategory } from '@/components/ui/faq-8.data'

export const contentFaqCategories: FaqCategory[] = [
  {
    value: 'strategie',
    label: 'Content-Strategie',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Welche Content-Formate sind für meine Website sinnvoll?',
        answer:
          'Sinnvoll sind die Formate, die echte Kauf- und Vertrauensfragen beantworten: Leistungsseiten, FAQ, Case Studies, Ratgeber, Landingpage-Texte, kurze Social-Media-Inhalte und visuelle Assets. Ich priorisiere Inhalte nach Zielgruppe, Suchintention und Conversion-Wirkung, damit nicht einfach mehr Content entsteht, sondern nützlicher Content mit klarer Aufgabe.',
      },
      {
        question: 'Erstellen Sie nur Texte oder auch Bilder und Konzepte?',
        answer:
          'Ich unterstütze bei Struktur, Text, Themenplanung, Bildauswahl, Content-Briefings und visuellen Konzepten. Je nach Projekt entstehen Website-Texte, SEO-Content, Social-Media-Ideen, Landingpage-Inhalte oder komplette Inhaltsarchitekturen, die zu Marke, Angebot und Vertrieb passen.',
      },
      {
        question: 'Wie wird Content auf meine Zielgruppe angepasst?',
        answer:
          'Zu Beginn kläre ich Zielgruppen, Einwände, Suchbegriffe, Leistungsversprechen und typische Entscheidungssituationen. Daraus entstehen Inhalte, die fachlich präzise, verständlich und verkaufsnah sind. Tonalität und Detailtiefe werden so gewählt, dass sich Ihre Wunschkunden direkt angesprochen fühlen.',
      },
      {
        question: 'Kann vorhandener Content weiterverwendet werden?',
        answer:
          'Ja, bestehende Texte, Bilder, Broschüren, Präsentationen oder Social-Media-Beiträge können analysiert und neu strukturiert werden. Oft reicht es nicht, Inhalte nur zu kürzen: Wichtiger sind klare Überschriften, bessere Nutzerführung, Suchintention, interne Verlinkung und konkrete Handlungsaufforderungen.',
      },
    ],
  },
  {
    value: 'seo-content',
    label: 'SEO & Sichtbarkeit',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Schreiben Sie SEO-Texte für Google und KI-Suche?',
        answer:
          'Ja. Die Inhalte werden so aufgebaut, dass sie für Menschen hilfreich und für Suchsysteme gut verständlich sind. Dazu gehören klare Themencluster, präzise Antworten, semantische Begriffe, strukturierte Zwischenüberschriften, FAQ-Bereiche und eine Sprache, die Kompetenz zeigt, ohne künstlich nach Keyword-Text zu klingen.',
      },
      {
        question: 'Wie viele Keywords braucht eine Content-Seite?',
        answer:
          'Eine gute Seite braucht kein Keyword-Stuffing, sondern ein klares Hauptthema und relevante Nebenfragen. Ich arbeite mit Suchintentionen, Varianten und Nutzerfragen, damit der Inhalt natürlicher wirkt und trotzdem für passende Suchanfragen sichtbar werden kann.',
      },
      {
        question: 'Wie schnell wirkt neuer Content bei Google?',
        answer:
          'Erste Signale können nach wenigen Wochen sichtbar werden, belastbare SEO-Effekte brauchen häufig mehrere Monate. Entscheidend sind Wettbewerb, technische Qualität, interne Verlinkung, bestehende Autorität und ob der Content regelmäßig ergänzt oder verbessert wird.',
      },
      {
        question: 'Werden FAQ auch als strukturierte Daten ausgegeben?',
        answer:
          'Ja, die FAQ-Inhalte auf der Seite können als FAQPage-Daten ausgegeben werden. Das hilft Suchmaschinen, Fragen und Antworten sauber zu verstehen. Gleichzeitig bleiben die Inhalte für Besucher sichtbar und verbessern die Orientierung auf der Seite.',
      },
    ],
  },
  {
    value: 'prozess',
    label: 'Ablauf & Pflege',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Wie läuft ein Content-Projekt ab?',
        answer:
          'Der Ablauf startet mit Analyse und Themenplanung. Danach folgen Struktur, Briefing, Texterstellung oder Überarbeitung, Abstimmung, Einbau ins CMS und finale Optimierung. Bei laufender Betreuung werden Inhalte anhand von Rankings, Nutzerfragen und Conversion-Daten weiterentwickelt.',
      },
      {
        question: 'Kann ich Content später selbst bearbeiten?',
        answer:
          'Ja, wenn die Website über ein CMS gepflegt wird, können Texte, Bilder, FAQ und einzelne Seiteninhalte selbst aktualisiert werden. Auf Wunsch bereite ich Inhaltsmodule so vor, dass Ihr Team Änderungen sicher und ohne Layout-Brüche durchführen kann.',
      },
      {
        question: 'Bieten Sie laufende Content-Betreuung an?',
        answer:
          'Ja, laufende Betreuung kann Themenrecherche, neue Seiten, Aktualisierungen, FAQ-Erweiterungen, Reporting und Content-Optimierung umfassen. Das ist besonders sinnvoll, wenn Sichtbarkeit, Vertrauen und Lead-Qualität dauerhaft wachsen sollen.',
      },
    ],
  },
]

export const semFaqCategories: FaqCategory[] = [
  {
    value: 'google-ads',
    label: 'Google Ads & SEM',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Was ist der Unterschied zwischen SEO und SEM?',
        answer:
          'SEO verbessert die organische Sichtbarkeit in Suchmaschinen, SEM arbeitet mit bezahlten Anzeigen wie Google Ads. SEO baut langfristig Reichweite auf, SEM bringt schneller messbaren Traffic. Besonders stark wird es, wenn beide Bereiche zusammenspielen: Kampagnendaten zeigen, welche Suchbegriffe und Angebote auch organisch relevant sind.',
      },
      {
        question: 'Für wen lohnen sich Google Ads?',
        answer:
          'Google Ads lohnen sich, wenn Menschen aktiv nach Ihren Leistungen suchen und eine Anfrage oder ein Kauf wirtschaftlich genug ist. Besonders geeignet sind lokale Dienstleistungen, B2B-Angebote, erklärungsbedürftige Leistungen und Landingpages mit klarer Conversion-Logik.',
      },
      {
        question: 'Wie viel Budget sollte ich für SEM einplanen?',
        answer:
          'Das hängt von Wettbewerb, Region, Ziel und Klickpreisen ab. Für kleine lokale Tests kann ein niedriger vierstelliger Monatsrahmen inklusive Betreuung sinnvoll sein, während stärkere Märkte mehr Mediabudget brauchen. Wichtig ist, Budget nicht breit zu streuen, sondern auf Suchbegriffe mit echter Kaufabsicht zu fokussieren.',
      },
      {
        question: 'Können bestehende Kampagnen optimiert werden?',
        answer:
          'Ja, bestehende Konten können geprüft und verbessert werden. Typische Hebel sind Keyword-Struktur, Suchbegriffe, Anzeigentexte, Zielseiten, Conversion-Tracking, Gebotsstrategie, Ausschlüsse und die Trennung von Marken-, Leistungs- und Wettbewerbsanfragen.',
      },
    ],
  },
  {
    value: 'tracking',
    label: 'Tracking & Auswertung',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Richten Sie Conversion-Tracking ein?',
        answer:
          'Ja, Tracking kann für Kontaktformulare, Klicks auf Telefonnummern, Terminbuchungen, Downloads oder Käufe eingerichtet werden. Dabei achte ich auf ein Setup, das verlässliche Entscheidungen ermöglicht und zur Datenschutz- und Consent-Struktur der Website passt.',
      },
      {
        question: 'Welche Kennzahlen sind bei SEM wirklich wichtig?',
        answer:
          'Wichtig sind nicht nur Klicks und Impressionen, sondern Kosten pro Anfrage, Conversion-Rate, Suchbegriffe, Qualität der Leads und Umsatzbezug. Ich bewerte Kampagnen danach, ob sie wirtschaftlich passende Anfragen erzeugen, nicht nur danach, ob der Traffic steigt.',
      },
      {
        question: 'Wie schnell sieht man Ergebnisse?',
        answer:
          'Erste Daten entstehen direkt nach Kampagnenstart. Für belastbare Optimierungen braucht es meist zwei bis sechs Wochen, weil genügend Suchbegriffe, Klicks und Conversions gesammelt werden müssen. Danach werden Anzeigen, Budgets und Zielseiten schrittweise geschärft.',
      },
      {
        question: 'Bekomme ich verständliche Reports?',
        answer:
          'Ja, Reports werden so aufbereitet, dass Budget, Anfragen, Kosten und nächste Maßnahmen nachvollziehbar sind. Sie bekommen keine reinen Zahlenfriedhöfe, sondern klare Einschätzungen, was funktioniert, was gebremst werden sollte und welche Tests als Nächstes sinnvoll sind.',
      },
    ],
  },
  {
    value: 'landingpages',
    label: 'Landingpages',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Brauche ich für Google Ads eigene Landingpages?',
        answer:
          'Häufig ja. Eine Kampagne funktioniert besser, wenn die Zielseite exakt zur Suchintention passt. Gute Landingpages erklären Angebot, Nutzen, Ablauf, Vertrauen, Einwände und Kontaktmöglichkeit ohne Ablenkung. Dadurch steigen Qualität, Conversion-Rate und oft auch die Effizienz der Anzeigen.',
      },
      {
        question: 'Optimieren Sie auch die Zielseiten?',
        answer:
          'Ja, SEM wird nicht isoliert betrachtet. Ich prüfe Überschriften, Formularlänge, Ladezeit, mobile Darstellung, Vertrauenselemente, FAQ, Call-to-Action und inhaltliche Passung zur Anzeige. Viele Kampagnen werden erst durch bessere Zielseiten wirtschaftlich.',
      },
      {
        question: 'Kann SEM mit kleinem Budget getestet werden?',
        answer:
          'Ja, ein fokussierter Test ist möglich, wenn Ziel, Region und Suchbegriffe eng genug gewählt werden. Statt viele Kampagnen halb zu bedienen, starte ich lieber mit einem klaren Angebot, sauberem Tracking und einer Landingpage, die Anfragen wirklich aufnehmen kann.',
      },
    ],
  },
]

export const seoFaqCategories: FaqCategory[] = [
  {
    value: 'seo-strategie',
    label: 'SEO-Strategie',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Was umfasst Suchmaschinenoptimierung bei Ihnen?',
        answer:
          'SEO umfasst technische Analyse, Keyword- und Wettbewerbsrecherche, Seitenstruktur, Onpage-Optimierung, Content-Planung, interne Verlinkung, lokale Signale, strukturierte Daten und laufende Auswertung. Ziel ist nicht nur mehr Traffic, sondern bessere Sichtbarkeit für Suchanfragen, die zu echten Anfragen führen.',
      },
      {
        question: 'Ist SEO für lokale Unternehmen in Halle sinnvoll?',
        answer:
          'Ja, lokale SEO ist besonders sinnvoll, wenn Kunden regional suchen. Dafür werden Leistungsseiten, Standortsignale, Google-Unternehmensprofil, Bewertungen, lokale Inhalte, strukturierte Daten und klare Kontaktwege optimiert. So wird Ihr Angebot für Suchanfragen in Halle und Umgebung besser einordenbar.',
      },
      {
        question: 'Wie schnell kann SEO Ergebnisse bringen?',
        answer:
          'Kleine technische Verbesserungen können schnell wirken, echte Ranking- und Lead-Effekte brauchen meist mehrere Monate. Je stärker Wettbewerb und Ausgangslage, desto wichtiger sind konsequente Content-Optimierung, technische Qualität und regelmäßige Weiterentwicklung.',
      },
      {
        question: 'Gibt es eine Garantie für Platz 1 bei Google?',
        answer:
          'Nein, seriöse SEO gibt keine Platz-1-Garantie. Rankings hängen von Wettbewerb, Suchintention, Website-Qualität und vielen externen Faktoren ab. Ich arbeite mit transparenten Maßnahmen, realistischen Zielen und Reporting, damit Fortschritte nachvollziehbar bleiben.',
      },
    ],
  },
  {
    value: 'technik-content',
    label: 'Technik & Content',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Was wird bei einem SEO-Audit geprüft?',
        answer:
          'Ein SEO-Audit prüft unter anderem Indexierung, Ladezeiten, Seitenstruktur, Meta-Daten, Überschriften, interne Links, Content-Qualität, Duplicate Content, mobile Nutzung, strukturierte Daten, Core Web Vitals und lokale Signale. Daraus entsteht eine priorisierte Maßnahmenliste statt einer bloßen Fehler-Sammlung.',
      },
      {
        question: 'Optimieren Sie auch bestehende Inhalte?',
        answer:
          'Ja, bestehende Seiten können überarbeitet werden. Dabei geht es um Suchintention, klare Antworten, bessere Struktur, interne Verlinkung, lokale Relevanz, Snippet-Optimierung und Conversion. Oft ist die Verbesserung vorhandener Inhalte schneller wirksam als komplett neue Seiten.',
      },
      {
        question: 'Ist technische Performance wichtig für SEO?',
        answer:
          'Ja, schnelle Ladezeiten, saubere mobile Darstellung, stabile Layouts und geringe technische Reibung verbessern Nutzererfahrung und Crawlbarkeit. Performance ist selten der einzige Ranking-Faktor, aber sie beeinflusst Absprungrate, Conversion und die Qualität der gesamten Website.',
      },
      {
        question: 'Berücksichtigen Sie KI-Suche und AI Overviews?',
        answer:
          'Ja, Inhalte werden so strukturiert, dass Suchmaschinen und KI-Systeme sie leichter verstehen können. Dazu gehören präzise Antworten, klare Entitäten, FAQ, strukturierte Daten, fachliche Tiefe und konsistente Unternehmensinformationen.',
      },
    ],
  },
  {
    value: 'betreuung',
    label: 'Betreuung & Reporting',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Bieten Sie monatliche SEO-Betreuung an?',
        answer:
          'Ja, monatliche Betreuung kann Monitoring, Content-Optimierung, neue Seiten, technische Checks, Reporting und laufende Priorisierung umfassen. Der Umfang richtet sich nach Wettbewerb, Website-Größe und Wachstumsziel.',
      },
      {
        question: 'Welche Tools und Daten werden genutzt?',
        answer:
          'Je nach Setup nutze ich Daten aus Google Search Console, Analytics, Keyword-Tools, Crawling-Analysen und technischen Performance-Checks. Entscheidend ist, dass die Daten zu konkreten Entscheidungen führen: Was wird optimiert, was bleibt liegen und was bringt voraussichtlich den größten Hebel.',
      },
      {
        question: 'Wie wird der Erfolg von SEO gemessen?',
        answer:
          'Gemessen werden Sichtbarkeit, Rankings, organischer Traffic, Klickrate, Anfragen, Conversion-Rate und Qualität der Suchanfragen. Ich schaue nicht nur auf Positionen, sondern darauf, ob SEO bessere Besucher und mehr passende Kontakte erzeugt.',
      },
    ],
  },
]

export const contentFaqFallback = {
  categories: contentFaqCategories,
  eyebrow: 'FAQ',
  title: 'Häufige Fragen zu Content Creation',
  description:
    'Antworten zu Content-Strategie, SEO-Texten, Website-Inhalten und laufender Content-Pflege.',
}

export const semFaqFallback = {
  categories: semFaqCategories,
  eyebrow: 'FAQ',
  title: 'Häufige Fragen zu SEM und Google Ads',
  description:
    'Antworten zu Suchmaschinenwerbung, Kampagnenbudget, Tracking, Landingpages und Auswertung.',
}

export const seoFaqFallback = {
  categories: seoFaqCategories,
  eyebrow: 'FAQ',
  title: 'Häufige Fragen zu SEO',
  description:
    'Antworten zu Suchmaschinenoptimierung, lokaler Sichtbarkeit, Technik, Content und laufender Betreuung.',
}

export function ContentFaqBox({ faq }: { faq?: EditablePageFaq | null }): React.JSX.Element | null {
  return <PageFaqBox faq={faq} fallback={contentFaqFallback} />
}

export function SemFaqBox({ faq }: { faq?: EditablePageFaq | null }): React.JSX.Element | null {
  return <PageFaqBox faq={faq} fallback={semFaqFallback} />
}

export function SeoFaqBox({ faq }: { faq?: EditablePageFaq | null }): React.JSX.Element | null {
  return <PageFaqBox faq={faq} fallback={seoFaqFallback} />
}
