import React from 'react'

import { Faq8Client } from '@/components/ui/faq-8.client'
import type { FaqCategory } from '@/components/ui/faq-8.data'

const webdesignFaqCategories: FaqCategory[] = [
  {
    value: 'allgemein',
    label: 'Webdesign in Halle',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Was kostet eine professionelle Website für ein kleines Unternehmen in Halle (Saale)?',
        answer:
          'Eine professionelle Website für kleine Unternehmen in Halle startet meist bei etwa 1.400 bis 2.800 Euro für eine kompakte Website mit bis zu 5 Seiten. Größere Unternehmenswebsites mit Strategie, Text, SEO und individuellen Funktionen liegen häufig bei 2.800 bis 5.500 Euro.',
      },
      {
        question: 'Wie lange dauert die Erstellung einer Unternehmenswebsite im Durchschnitt?',
        answer:
          'Eine kleine Unternehmenswebsite dauert im Durchschnitt 3 bis 6 Wochen. Bei mehr Inhalten, Fotoshooting, Textentwicklung, Schnittstellen oder mehreren Korrekturrunden sollten 6 bis 10 Wochen eingeplant werden.',
      },
      {
        question: 'Welche Art von Websites erstellt Philipp Bacher?',
        answer:
          'Ich erstelle One-Pager, mehrseitige Unternehmenswebsites, Landingpages, Portfolioseiten, Relaunches und auf Wunsch Online-Shops. Der Fokus liegt auf schnellen, klar strukturierten Websites für lokale Unternehmen, Selbstständige und KMU in Halle und Umgebung.',
      },
      {
        question: 'Brauche ich als kleiner Handwerksbetrieb oder Einzelhändler überhaupt eine eigene Website?',
        answer:
          'Ja, eine eigene Website ist auch für kleine Handwerksbetriebe und Einzelhändler sinnvoll. Sie schafft Vertrauen, beantwortet häufige Kundenfragen, zeigt Leistungen und macht Ihr Unternehmen unabhängig von einzelnen Plattformen.',
      },
      {
        question: 'Reicht nicht auch ein Google-Unternehmensprofil statt einer eigenen Website?',
        answer:
          'Ein Google-Unternehmensprofil ist wichtig, ersetzt aber keine eigene Website. Das Profil sorgt für lokale Auffindbarkeit, während die Website Leistungen, Referenzen, Preise, Kontaktwege und Fachkompetenz deutlich ausführlicher erklären kann.',
      },
    ],
  },
  {
    value: 'technik',
    label: 'Technik & Umsetzung',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Auf welchem System werden die Websites erstellt?',
        answer:
          'Je nach Projekt entstehen Websites mit modernen CMS- und Webtechnologien wie Payload CMS, Next.js oder passenden Shop- und CMS-Systemen. Entscheidend ist, dass das System schnell, wartbar und für Ihre Inhalte sinnvoll bedienbar bleibt.',
      },
      {
        question: 'Sind eure Websites für Smartphones optimiert?',
        answer:
          'Ja, responsive Design ist Standard. Jede Website wird für Smartphone, Tablet und Desktop geplant, damit Navigation, Texte, Formulare und Kontaktmöglichkeiten auf kleinen Bildschirmen gut nutzbar sind.',
      },
      {
        question: 'Wie schnell laden die von Ihnen erstellten Websites?',
        answer:
          'Ziel sind kurze Ladezeiten und gute Core-Web-Vitals-Werte. Dafür werden Bilder optimiert, unnötige Skripte vermieden, saubere Komponenten genutzt und technische Performance bereits während der Umsetzung geprüft.',
      },
      {
        question: 'Kann ich die Inhalte meiner Website später selbst bearbeiten?',
        answer:
          'Ja, wenn ein CMS vorgesehen ist, können Sie Texte, Bilder, Leistungen, Referenzen oder FAQ-Inhalte später selbst bearbeiten. Auf Wunsch gibt es eine kurze Einführung, damit Ihr Team sicher mit dem System arbeitet.',
      },
      {
        question: 'Wird die Website barrierefrei nach BFSG oder WCAG umgesetzt?',
        answer:
          'Barrierearme Umsetzung wird von Anfang an berücksichtigt, etwa durch saubere Struktur, Kontraste, Tastaturbedienbarkeit und verständliche Formulare. Wenn gesetzliche BFSG- oder WCAG-Anforderungen verbindlich erfüllt werden müssen, wird das als eigener Prüfumfang geplant.',
      },
      {
        question: 'Wird meine Website auch für ältere Browser oder langsames Internet optimiert?',
        answer:
          'Die Website wird für aktuelle Browser und typische mobile Nutzung optimiert. Für langsamere Verbindungen helfen komprimierte Bilder, schlanke Animationen und ein technischer Aufbau, der wichtige Inhalte schnell sichtbar macht.',
      },
    ],
  },
  {
    value: 'seo-geo',
    label: 'Lokales SEO & KI-Suche',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Wird meine Website automatisch für lokale Suchanfragen wie „Handwerker Halle“ optimiert?',
        answer:
          'Lokale Suchanfragen werden nicht automatisch erfolgreich, sie müssen gezielt eingeplant werden. Dazu gehören passende Seitentitel, lokale Inhalte, strukturierte Daten, Kontaktinformationen und klare Leistungsseiten mit Bezug zu Halle und Umgebung.',
      },
      {
        question: 'Übernehmen Sie auch die Einrichtung oder Optimierung des Google-Unternehmensprofils?',
        answer:
          'Ja, das Google-Unternehmensprofil kann eingerichtet oder optimiert werden. Dazu gehören Kategorien, Beschreibung, Leistungen, Fotos, Öffnungszeiten, Kontaktangaben und sinnvolle Verknüpfungen zur Website.',
      },
      {
        question: 'Kann meine Website künftig auch von KI-Suchassistenten wie ChatGPT oder Google AI Overviews gefunden werden?',
        answer:
          'Ja, gute Chancen entstehen durch klare, strukturierte und zitierfähige Inhalte. FAQ-Antworten, eindeutige Leistungsseiten, lokale Signale, strukturierte Daten und konsistente Unternehmensinformationen helfen Suchmaschinen und KI-Systemen beim Einordnen.',
      },
      {
        question: 'Was tun Sie konkret, damit meine Website bei Google und in KI-Antworten gut platziert wird?',
        answer:
          'Ich achte auf saubere Seitenstruktur, schnelle Ladezeiten, lokale Keywords, verständliche Antworten, interne Verlinkung, strukturierte Daten, Meta-Daten und Inhalte, die echte Nutzerfragen beantworten. Das stärkt klassische SEO und Generative-Engine-Optimierung.',
      },
      {
        question: 'Wie wichtig ist die Ladegeschwindigkeit für das Google-Ranking meiner Website?',
        answer:
          'Ladegeschwindigkeit ist ein wichtiger Qualitätsfaktor, besonders mobil. Sie entscheidet nicht allein über Rankings, beeinflusst aber Nutzerverhalten, Absprungrate, Conversion und die technische Bewertung einer Website.',
      },
    ],
  },
  {
    value: 'kosten-pakete',
    label: 'Kosten & Pakete',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Was ist im Website-Grundpaket für kleine Unternehmen enthalten?',
        answer:
          'Ein Grundpaket enthält typischerweise Strukturkonzept, responsives Design, technische Umsetzung, Basis-SEO, Kontaktmöglichkeit, Impressum-/Datenschutz-Einbindung und eine kurze Einweisung. Inhalte, Fotos oder Spezialfunktionen werden je nach Bedarf ergänzt.',
      },
      {
        question: 'Gibt es einen Unterschied im Preis zwischen einer einfachen Website und einem Online-Shop?',
        answer:
          'Ja, ein Online-Shop ist deutlich aufwendiger als eine Informationswebsite. Produktdaten, Warenkorb, Zahlungsanbieter, Versandlogik, Rechtstexte, E-Mail-Prozesse und Tests erhöhen den Umfang und damit den Preis.',
      },
      {
        question: 'Fallen nach dem Launch laufende Kosten an?',
        answer:
          'Ja, meist fallen laufende Kosten für Domain, Hosting, Wartung, Backups, Updates oder externe Tools an. Einfache Hosting-Setups starten oft im niedrigen zweistelligen Monatsbereich, Wartungspakete liegen je nach Umfang darüber.',
      },
      {
        question: 'Gibt es versteckte Zusatzkosten, z. B. für Stockfotos, Texte oder Formulare?',
        answer:
          'Nein, Zusatzkosten werden vorab ausgewiesen. Stockfotos, Texterstellung, besondere Formulare, Tracking, Schnittstellen oder Rechtstext-Tools werden nur eingeplant, wenn sie für Ihr Projekt gebraucht werden.',
      },
      {
        question: 'Bieten Sie auch günstigere Einstiegspakete für Existenzgründer an?',
        answer:
          'Ja, für Existenzgründer und kleine Betriebe kann der Umfang bewusst reduziert werden. Ein fokussierter One-Pager oder eine schlanke Landingpage ist oft ein sinnvoller Start, bevor später weitere Unterseiten ergänzt werden.',
      },
    ],
  },
  {
    value: 'ablauf',
    label: 'Ablauf & Zusammenarbeit',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Wie läuft ein Website-Projekt Schritt für Schritt ab?',
        answer:
          'Ein Website-Projekt startet mit Zielklärung und Angebot, danach folgen Struktur, Inhalte, Design, technische Umsetzung, Korrektur, Tests und Launch. Nach Veröffentlichung können Wartung, SEO und laufende Optimierung anschließen.',
      },
      {
        question: 'Welche Informationen brauche ich als Kunde zu Projektstart?',
        answer:
          'Hilfreich sind Logo, vorhandene Texte, Fotos, Leistungsübersicht, Zielgruppen, Beispiele, Zugangsdaten zu Domain oder Hosting und eine klare Liste der wichtigsten Kontaktwege. Fehlende Inhalte können im Projekt gemeinsam erarbeitet werden.',
      },
      {
        question: 'Wie viele Korrekturschleifen sind im Preis enthalten?',
        answer:
          'Die Anzahl der Korrekturschleifen wird im Angebot festgelegt. Bei kleinen Websites sind meist 1 bis 2 strukturierte Feedbackrunden sinnvoll, damit Änderungen konzentriert und planbar umgesetzt werden.',
      },
      {
        question: 'Kann ich den Entwurf vor der Veröffentlichung sehen und Änderungen einfordern?',
        answer:
          'Ja, die Website wird vor dem Launch zur Ansicht bereitgestellt. Sie können Inhalte, Darstellung und Funktionen prüfen, bevor die Seite veröffentlicht wird.',
      },
      {
        question: 'Wer erstellt die Texte für meine Website?',
        answer:
          'Texte können von Ihnen geliefert, gemeinsam überarbeitet oder komplett durch mich erstellt werden. Für lokale Sichtbarkeit sind klare Leistungsbeschreibungen, regionale Bezüge und konkrete Antworten auf Kundenfragen besonders wichtig.',
      },
      {
        question: 'Wer liefert die Fotos für die Website?',
        answer:
          'Fotos können von Ihnen kommen, über ein Shooting entstehen oder gezielt als Stockmaterial ergänzt werden. Für lokale Unternehmen in Halle wirken echte Team-, Standort- und Arbeitsbilder meist deutlich vertrauenswürdiger.',
      },
    ],
  },
  {
    value: 'hosting',
    label: 'Hosting & Sicherheit',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Wo wird meine Website gehostet, und wer verwaltet die Domain?',
        answer:
          'Hosting und Domain können über bestehende Anbieter weiterlaufen oder neu eingerichtet werden. Wichtig sind SSL, Backups, gute Ladezeiten, klare Zuständigkeiten und Zugriffsmöglichkeiten für den technischen Support.',
      },
      {
        question: 'Was passiert, wenn die Website nach dem Launch technische Probleme hat?',
        answer:
          'Bei gebuchter Betreuung werden technische Probleme priorisiert geprüft und behoben. Ohne Wartung kann Support nach Aufwand erfolgen, sofern Zugriffsdaten und technische Rahmenbedingungen verfügbar sind.',
      },
      {
        question: 'Bieten Sie laufende Wartung an?',
        answer:
          'Ja, laufende Wartung kann Updates, Sicherheitspatches, Backups, Monitoring, kleinere Inhaltsänderungen und technische Checks umfassen. Der Umfang richtet sich nach System, Risiko und Aktualisierungsbedarf.',
      },
      {
        question: 'Was kostet die monatliche oder jährliche Wartung einer Website?',
        answer:
          'Einfache Wartungspakete starten häufig bei etwa 149 bis 290 Euro pro Monat. Umfangreichere Betreuung mit Monitoring, Inhaltspflege, Reporting oder mehreren Supportstunden liegt meist bei 390 bis 690 Euro pro Monat.',
      },
      {
        question: 'Wer ist Ansprechpartner, wenn meine Website gehackt wird oder ausfällt?',
        answer:
          'Bei aktiver Wartung bin ich der erste technische Ansprechpartner und koordiniere Analyse, Wiederherstellung und Absicherung. Zusätzlich können Hosting-Support, Backups und Sicherheitsmaßnahmen eingebunden werden.',
      },
    ],
  },
  {
    value: 'relaunch',
    label: 'Relaunch',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Kann eine bestehende Website überarbeitet werden, statt komplett neu erstellt zu werden?',
        answer:
          'Ja, wenn Technik, Struktur und Inhalte noch tragfähig sind, kann ein Relaunch auf der bestehenden Basis sinnvoll sein. Wenn System, Performance oder Bedienbarkeit stark veraltet sind, ist ein Neuaufbau oft wirtschaftlicher.',
      },
      {
        question: 'Gehen bei einem Website-Relaunch bisherige Google-Platzierungen verloren?',
        answer:
          'Nicht zwangsläufig. Rankings lassen sich schützen, wenn URL-Struktur, Weiterleitungen, Inhalte, Meta-Daten, interne Links und technische Indexierung sauber geplant werden.',
      },
      {
        question: 'Was kostet ein Relaunch im Vergleich zu einer komplett neuen Website?',
        answer:
          'Ein Relaunch kann günstiger sein, wenn Inhalte und Struktur übernommen werden können. Typische Redesigns starten oft bei 1.200 bis 3.500 Euro; bei vollständigem Neuaufbau gelten ähnliche Budgets wie für neue Websites.',
      },
      {
        question: 'Woran erkenne ich, dass meine aktuelle Website technisch veraltet ist?',
        answer:
          'Warnzeichen sind langsame Ladezeiten, schlechte mobile Darstellung, veraltetes CMS, Sicherheitsprobleme, niedrige Conversion, fehlende SSL-Verschlüsselung, schwer pflegbare Inhalte oder ein Design, das nicht mehr zum Unternehmen passt.',
      },
    ],
  },
  {
    value: 'rechtliches',
    label: 'Rechtliches',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Erstellen Sie auch Impressum und Datenschutzerklärung?',
        answer:
          'Ich kann Impressum und Datenschutzerklärung technisch einbinden und bei der Struktur unterstützen. Rechtlich verbindliche Texte sollten jedoch von einem Rechtsanwalt oder einem spezialisierten Rechtstext-Dienst kommen.',
      },
      {
        question: 'Ist meine Website automatisch DSGVO-konform?',
        answer:
          'Nein, DSGVO-Konformität entsteht nicht automatisch. Google Fonts, Cookies, Tracking, Kontaktformulare, Newsletter und externe Dienste müssen geprüft, korrekt eingebunden und in Datenschutztexten beschrieben werden.',
      },
      {
        question: 'Wer haftet, wenn rechtliche Anforderungen an die Website nicht erfüllt sind?',
        answer:
          'Die rechtliche Verantwortung liegt grundsätzlich beim Website-Betreiber. Ich unterstütze bei datensparsamer Technik und sauberer Einbindung, ersetze aber keine Rechtsberatung.',
      },
    ],
  },
  {
    value: 'entscheidung',
    label: 'Entscheidungshilfe',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Was ist der Unterschied zwischen einer Website von Ihnen und einem Homepage-Baukasten?',
        answer:
          'Ein Baukasten ist günstig und schnell, aber oft begrenzt bei Strategie, Performance, SEO, Individualität und späterer Skalierung. Eine professionelle Website wird gezielt auf Zielgruppe, lokale Sichtbarkeit, Conversion und technische Qualität geplant.',
      },
      {
        question: 'Lohnt sich eine professionell erstellte Website für ein sehr kleines Unternehmen finanziell?',
        answer:
          'Ja, wenn die Website regelmäßig Anfragen erzeugt oder Vertrauen im Verkaufsprozess stärkt. Schon wenige zusätzliche Kunden pro Jahr können die Investition in eine gute lokale Website rechtfertigen.',
      },
      {
        question: 'Ab welcher Unternehmensgröße oder welchem Budget ist eine individuelle Website sinnvoll?',
        answer:
          'Eine individuelle Website ist sinnvoll, sobald Kunden online recherchieren, Angebote vergleichen oder Vertrauen vor dem Erstkontakt brauchen. Als Budget sollten kleine Unternehmen mindestens einen niedrigen vierstelligen Betrag einplanen.',
      },
      {
        question: 'Was unterscheidet eure Websites von denen anderer Agenturen in Halle oder Leipzig?',
        answer:
          'Der Schwerpunkt liegt auf klarer Strategie, lokaler Suchsichtbarkeit, schneller Umsetzung, verständlichen Inhalten und messbarer Anfragewirkung. Design, Technik, SEO und laufende Betreuung werden nicht getrennt gedacht, sondern als ein System.',
      },
    ],
  },
  {
    value: 'erfolg',
    label: 'Erfolgsmessung',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Wie können Sie nachweisen, dass eine neue Website tatsächlich mehr Kundenanfragen bringt?',
        answer:
          'Der Erfolg lässt sich über Formularanfragen, Klicks auf Telefonnummern, E-Mail-Klicks, Terminbuchungen, lokale Rankings und Traffic-Entwicklung messen. Vor dem Launch werden sinnvolle Ziele und Messpunkte festgelegt.',
      },
      {
        question: 'Bauen Sie eine Erfolgsmessung direkt mit ein?',
        answer:
          'Ja, auf Wunsch werden datenschutzbewusste Tracking-Lösungen, Conversion-Ziele, Formularmessung, Anruf-Klicks und einfache Reports eingerichtet. So wird sichtbar, welche Seiten und Inhalte tatsächlich Anfragen erzeugen.',
      },
      {
        question: 'Gibt es Beispiele von Kunden aus Halle mit messbar mehr Anfragen nach einem Relaunch?',
        answer:
          'Wenn passende Referenzen freigegeben sind, können konkrete Cases besprochen werden. Aussagekräftig sind vor allem Vorher-nachher-Werte zu Sichtbarkeit, Ladezeit, Conversion-Rate und Anzahl qualifizierter Anfragen.',
      },
    ],
  },
]

const webdesignFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: webdesignFaqCategories.flatMap((category) =>
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

export function WebdesignFaqBox(): React.JSX.Element {
  return (
    <>
      <Faq8Client
        categories={webdesignFaqCategories}
        eyebrow="FAQ Webdesign"
        title="Häufige Fragen zu Webdesign, lokaler Sichtbarkeit und Website-Kosten in Halle"
        description="Klare Antworten für kleine Unternehmen in Halle: Kosten, Ablauf, Technik, lokale SEO, KI-Suche, Wartung, Relaunch und Erfolgsmessung."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webdesignFaqSchema) }}
      />
    </>
  )
}

export default WebdesignFaqBox
