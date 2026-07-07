import React from 'react'

import { Faq8Client } from '@/components/ui/faq-8.client'
import type { FaqCategory } from '@/components/ui/faq-8.data'

const corporateIdentityFaqCategories: FaqCategory[] = [
  {
    value: 'grundverstaendnis',
    label: 'Grundverstaendnis',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Was ist der Unterschied zwischen Corporate Identity, Corporate Design und einem Logo?',
        answer:
          'Das Logo ist ein einzelnes Erkennungszeichen. Corporate Design beschreibt die visuelle Gestaltung mit Farben, Typografie, Bildsprache und Layoutregeln. Corporate Identity geht weiter und umfasst auch Positionierung, Tonalität, Werte und den gesamten Auftritt eines Unternehmens.',
      },
      {
        question: 'Was genau umfasst eine Corporate Identity konkret?',
        answer:
          'Eine Corporate Identity kann Logo, Farbwelt, Schriften, Bildsprache, Gestaltungsraster, Geschäftsausstattung, Website-Stil, Social-Media-Vorlagen, Tonalität und Markenregeln umfassen. Der genaue Umfang richtet sich nach Branche, Budget und den wichtigsten Kontaktpunkten Ihrer Kunden.',
      },
      {
        question: 'Brauche ich als kleiner Betrieb wirklich eine vollständige Corporate Identity, oder reicht ein einfaches Logo?',
        answer:
          'Viele kleine Betriebe starten sinnvoll mit Logo, Farben, Schriften und den wichtigsten Anwendungen. Eine vollständige Corporate Identity lohnt sich, wenn der Auftritt auf Website, Fahrzeugen, Angeboten, Social Media und Print einheitlich wirken soll.',
      },
      {
        question: 'Ab welcher Unternehmensgroesse lohnt sich eine professionelle Corporate Identity?',
        answer:
          'Eine professionelle Corporate Identity lohnt sich nicht erst ab einer bestimmten Mitarbeiterzahl, sondern sobald Kunden Ihr Unternehmen vergleichen, Vertrauen aufbauen muessen oder mehrere Kanäle bespielt werden. Das betrifft auch Gründer, Handwerksbetriebe, Praxen und lokale Dienstleister in Halle.',
      },
    ],
  },
  {
    value: 'leistungsumfang',
    label: 'Leistungsumfang',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Was ist konkret im Corporate-Identity-Paket für kleine Unternehmen enthalten?',
        answer:
          'Typisch sind Marken- und Zielgruppencheck, Logoentwicklung, Farbpalette, Typografie, einfache Gestaltungsregeln, Basis-Geschäftsausstattung und Dateipaket für Web und Druck. Je nach Projekt können Website, Social Media, Fahrzeugbeschriftung oder ein Styleguide ergänzt werden.',
      },
      {
        question: 'Erstellen Sie auch nur ein Logo, ohne die komplette Corporate Identity?',
        answer:
          'Ja, eine reine Logoentwicklung ist möglich. Sinnvoll ist aber mindestens ein kleines Basispaket mit Farben, Schriften und Dateiformaten, damit das Logo später nicht isoliert wirkt und auf Website, Druck und Social Media sauber eingesetzt werden kann.',
      },
      {
        question: 'Gehört eine Geschäftsausstattung automatisch zum Paket?',
        answer:
          'Briefpapier, Visitenkarten und E-Mail-Signatur können Bestandteil des Pakets sein, sind aber nicht automatisch in jedem Umfang enthalten. Im Angebot wird klar definiert, welche Anwendungen gestaltet und druckfertig oder digital übergeben werden.',
      },
      {
        question: 'Entwickeln Sie auch Namensvorschläge oder Claims/Slogans für Ihr Unternehmen?',
        answer:
          'Ja, Naming, Claims und kurze Markenbotschaften können in die Entwicklung einbezogen werden. Dabei geht es um Verständlichkeit, Differenzierung, lokale Anschlussfähigkeit und eine Sprache, die zu Zielgruppe und Leistung passt.',
      },
      {
        question: 'Erstellen Sie auch ein Markenhandbuch zur einheitlichen Nutzung?',
        answer:
          'Ja, Brand Guidelines oder ein kompaktes Markenhandbuch können erstellt werden. Darin stehen Logo-Nutzung, Farben, Typografie, Abstände, Beispiele und Regeln für Web, Print und Social Media, damit der Auftritt langfristig konsistent bleibt.',
      },
      {
        question: 'Gestalten Sie auch Fahrzeugbeschriftung, Ladenbeschilderung oder Arbeitskleidung im Corporate Design?',
        answer:
          'Ja, solche Anwendungen können gestaltet oder als Layoutvorgaben vorbereitet werden. Für Produktion, Folierung, Textildruck oder Beschilderung arbeite ich bei Bedarf mit den technischen Spezifikationen Ihrer Dienstleister.',
      },
    ],
  },
  {
    value: 'ablauf',
    label: 'Ablauf & Prozess',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Wie läuft die Entwicklung einer Corporate Identity bei Ihnen Schritt für Schritt ab?',
        answer:
          'Der Prozess startet mit Zielklärung, Zielgruppe, Wettbewerb und Stilrichtung. Danach folgen Konzept, Logoentwürfe, Auswahl, Verfeinerung, Anwendungen, Dateiaufbereitung und Übergabe. Auf Wunsch werden Website, Social Media und Print direkt mitgedacht.',
      },
      {
        question: 'Wie viele Logo-Entwürfe bekomme ich zur Auswahl?',
        answer:
          'Die Anzahl wird im Angebot festgelegt. Bei Logo- und CI-Projekten sind häufig zwei bis drei fundierte Richtungen sinnvoller als viele beliebige Varianten, weil jede Richtung strategisch begründet und weiterentwickelt werden kann.',
      },
      {
        question: 'Wie viele Korrekturschleifen sind im Preis enthalten?',
        answer:
          'Meist sind ein bis zwei strukturierte Korrekturrunden enthalten. Weitere Anpassungen sind möglich und werden transparent nach Aufwand oder als Zusatzpaket vereinbart.',
      },
      {
        question: 'Werde ich in den Entwicklungsprozess eingebunden, oder bekomme ich nur fertige Ergebnisse praesentiert?',
        answer:
          'Sie werden aktiv eingebunden. Am Anfang werden Ziele, Geschmack, Wettbewerber und Zielgruppe geklärt; während der Entwicklung gibt es klare Präsentations- und Feedbackpunkte, damit Entscheidungen nachvollziehbar bleiben.',
      },
      {
        question: 'Welche Informationen benötigen Sie zu Beginn?',
        answer:
          'Hilfreich sind Zielgruppe, Leistungen, Wettbewerber, Standort, Wunschkunden, vorhandene Materialien, Stilvorlieben, No-Gos, geplante Einsatzorte und Beispiele, die Ihnen gefallen oder bewusst nicht gefallen.',
      },
    ],
  },
  {
    value: 'kosten-dauer',
    label: 'Kosten & Dauer',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Was kostet eine Corporate Identity für ein kleines Unternehmen ungefähr?',
        answer:
          'Eine kompakte Corporate Identity startet häufig im niedrigen vierstelligen Bereich. Vollständigere Pakete mit Logo, Farben, Typografie, Anwendungen und Guidelines liegen oft zwischen etwa 2.200 und 5.500 Euro, je nach Umfang.',
      },
      {
        question: 'Was kostet ein einzelnes Logo im Vergleich zur kompletten Corporate Identity?',
        answer:
          'Eine reine Logoentwicklung ist meist günstiger und kann etwa bei 690 bis 1.800 Euro liegen. Eine Corporate Identity kostet mehr, liefert dafür aber ein nutzbares System für Website, Print, Social Media und Wiedererkennung.',
      },
      {
        question: 'Wie lange dauert die Entwicklung einer Corporate Identity im Durchschnitt?',
        answer:
          'Eine kompakte Logo- und CI-Entwicklung dauert meist zwei bis sechs Wochen. Wenn Naming, Markenstrategie, viele Anwendungen oder Abstimmungen mit Druck und Beschilderung dazukommen, sollte mehr Zeit eingeplant werden.',
      },
      {
        question: 'Gibt es günstigere Einstiegspakete für Existenzgründer oder sehr kleine Betriebe?',
        answer:
          'Ja, der Umfang kann für Gründer bewusst reduziert werden. Ein Startpaket mit Logo, Farben, Typografie und wichtigsten Dateien ist oft ein guter erster Schritt und kann später zu einem vollständigen Corporate Design ausgebaut werden.',
      },
      {
        question: 'Fallen nach Fertigstellung weitere Kosten an, z. B. für spätere Anpassungen?',
        answer:
          'Nach der Übergabe fallen keine automatischen Folgekosten an. Spätere Anpassungen, neue Printprodukte, Social-Media-Vorlagen, Website-Erweiterungen oder Produktionsabstimmungen werden separat nach Aufwand oder Paket vereinbart.',
      },
    ],
  },
  {
    value: 'rechtliches',
    label: 'Rechtliches & Dateien',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Wem gehören die Rechte am fertigen Logo und Corporate Design?',
        answer:
          'Die Nutzungsrechte werden im Angebot geregelt. In der Regel erhalten Sie nach Bezahlung umfassende Nutzungsrechte für Ihr Unternehmen. Original- und Arbeitsdateien, offene Layoutdateien oder Sonderrechte werden klar vereinbart.',
      },
      {
        question: 'Kann ich das Logo und die Designdateien uneingeschränkt selbst weiterverwenden?',
        answer:
          'Sie erhalten die vereinbarten Dateien für Web, Druck und normale Unternehmenskommunikation. Ob offene Quelldateien, Weitergabe an Dritte oder unbegrenzte Bearbeitungsrechte enthalten sind, wird transparent im Leistungsumfang festgelegt.',
      },
      {
        question: 'Übernehmen Sie auch die Markenanmeldung beim DPMA für Logo oder Namen?',
        answer:
          'Ich kann bei Vorbereitung, Klassenrecherche und Abstimmung unterstützen. Die rechtliche Markenanmeldung und verbindliche Bewertung sollte jedoch über einen spezialisierten Anwalt oder Markenexperten erfolgen.',
      },
      {
        question: 'Prüfen Sie vorab, ob das Logo oder der Name bereits markenrechtlich geschützt ist?',
        answer:
          'Eine einfache Vorabrecherche ist möglich, ersetzt aber keine rechtliche Markenprüfung. Für verbindliche Sicherheit bei Name, Logo und Schutzklassen empfehle ich eine professionelle Markenrecherche.',
      },
      {
        question: 'In welchen Dateiformaten erhalte ich das fertige Logo?',
        answer:
          'Üblich sind Vektorformate für Druck und Skalierung sowie PNG oder JPG für digitale Nutzung. Je nach Paket können SVG, PDF, EPS, Farbvarianten, Schwarz-Weiß-Versionen und Social-Media-Exportgrößen enthalten sein.',
      },
    ],
  },
  {
    value: 'relaunch',
    label: 'Relaunch & Rebranding',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Kann ein bestehendes, veraltetes Logo überarbeitet statt komplett neu erstellt werden?',
        answer:
          'Ja, ein Logo-Refresh ist oft sinnvoll, wenn Wiedererkennung erhalten bleiben soll. Formen, Proportionen, Farben und Typografie werden modernisiert, ohne die Marke unnötig zu entkernen.',
      },
      {
        question: 'Woran erkennt man, dass eine Corporate Identity veraltet oder überarbeitungsbeduerftig ist?',
        answer:
          'Warnzeichen sind uneinheitliche Materialien, schlechte Lesbarkeit, veraltete Farben, fehlende digitale Nutzbarkeit, pixelige Dateien, unscharfe Positionierung oder ein Auftritt, der nicht mehr zu Zielgruppe und Preisniveau passt.',
      },
      {
        question: 'Was passiert bei einem Rebranding mit bestehenden Materialien?',
        answer:
          'Bestehende Materialien werden priorisiert. Website, Angebote, Visitenkarten, Fahrzeuge, Beschilderung, Social Media und Vorlagen können schrittweise umgestellt werden, damit Kosten und Aufwand planbar bleiben.',
      },
      {
        question: 'Was kostet ein Rebranding im Vergleich zu einer komplett neuen Corporate Identity?',
        answer:
          'Ein Rebranding kann günstiger sein, wenn Strategie und Grundelemente tragfaehig bleiben. Wenn Positionierung, Name, Logo, Website und alle Anwendungen neu entwickelt werden, liegt der Aufwand nahe an einer kompletten Neuentwicklung.',
      },
      {
        question: 'Verliere ich bei einem Redesign meine bisherige Wiedererkennbarkeit bei Stammkunden?',
        answer:
          'Nicht, wenn der Refresh bewusst geplant wird. Wiedererkennbare Elemente wie Farben, Formidee oder Markenkern können erhalten bleiben, während Lesbarkeit, Modernität und digitale Nutzbarkeit verbessert werden.',
      },
    ],
  },
  {
    value: 'umsetzung',
    label: 'Website, Print & Kanäle',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Wird die Corporate Identity direkt in Ihre Website und Social-Media-Kanäle übernommen?',
        answer:
          'Ja, auf Wunsch wird das Corporate Design direkt in Website, Landingpages, Social-Media-Profile, Vorlagen und digitale Anzeigen übertragen. Dadurch entsteht ein konsistenter Auftritt statt einzelner, voneinander getrennter Designteile.',
      },
      {
        question: 'Übernehmen Sie auch die Umsetzung des Corporate Designs auf Print-Materialien?',
        answer:
          'Ja, Flyer, Plakate, Broschüren, Briefpapier, Visitenkarten, Präsentationen oder Anzeigen können CI-konform gestaltet und für Druckereien vorbereitet werden.',
      },
      {
        question: 'Sorgen Sie dafür, dass mein Auftritt auf allen Kanälen einheitlich bleibt?',
        answer:
          'Ja, genau dafür sind Corporate Design und Guidelines da. Website, Social Media, Print, Angebote und Beschilderung werden mit gemeinsamen Regeln gestaltet, damit Kunden Ihr Unternehmen schneller wiedererkennen.',
      },
    ],
  },
  {
    value: 'entscheidung',
    label: 'Entscheidungshilfe',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Was ist der Unterschied zwischen einem Online-Logo-Generator und einer professionell entwickelten Corporate Identity?',
        answer:
          'Ein Logo-Generator liefert meist ein austauschbares Zeichen ohne Strategie, Rechteklaerung und System. Eine professionelle Corporate Identity beruecksichtigt Zielgruppe, Wettbewerb, Positionierung, Anwendungen, Lesbarkeit und langfristige Nutzbarkeit.',
      },
      {
        question: 'Warum sollte ich für ein Logo einen spezialisierten Dienstleister statt einen Freelancer oder Baukasten-Anbieter beauftragen?',
        answer:
          'Entscheidend ist nicht die Bezeichnung, sondern die Arbeitsweise. Wichtig sind strategisches Verstaendnis, saubere Dateien, klare Nutzungsrechte, Anwendungserfahrung und die Faehigkeit, Logo, Website, Print und Marketing zusammenzudenken.',
      },
      {
        question: 'Was unterscheidet eure Corporate-Identity-Entwicklung von anderen Agenturen in Halle oder Leipzig?',
        answer:
          'Der Fokus liegt auf nutzbarer Markenidentität für kleine Unternehmen: klare Positionierung, saubere Gestaltung, lokale Sichtbarkeit, Website-Anschluss und pragmatische Umsetzung ohne unnötig aufgeblasenen Prozess.',
      },
      {
        question: 'Für welche Branchen wurden bereits Corporate Identities entwickelt?',
        answer:
          'Erfahrung gibt es unter anderem mit lokalen Dienstleistern, Handwerk, Beratung, digitalen Projekten, Handel, Kultur, Gastronomie und B2B-Angeboten. Entscheidend ist immer, Zielgruppe und Marktumfeld konkret zu verstehen.',
      },
    ],
  },
  {
    value: 'nutzen',
    label: 'Ergebnis & Nutzen',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Wie wirkt sich eine professionelle Corporate Identity konkret auf die Wahrnehmung meines Unternehmens aus?',
        answer:
          'Ein konsistenter Auftritt wirkt professioneller, vertrauenswürdiger und leichter wiedererkennbar. Kunden können schneller einordnen, wofür Ihr Unternehmen steht, ob es zu ihnen passt und warum sie Kontakt aufnehmen sollten.',
      },
      {
        question: 'Kann eine gute Corporate Identity tatsaechlich zu mehr Kundenanfragen fuehren?',
        answer:
          'Ja, indirekt und oft sehr konkret. Eine klare Identität verbessert Vertrauen, Wiedererkennung, Website-Wirkung, Anzeigen, Angebote und Weiterempfehlungen. Sie ersetzt kein Marketing, macht Marketing aber deutlich wirksamer.',
      },
      {
        question: 'Gibt es Beispiele, wie sich der Aussenauftritt eines Kunden aus Halle nach dem Rebranding veraendert hat?',
        answer:
          'Wenn passende Referenzen freigegeben sind, können Vorher-nachher-Beispiele besprochen werden. Relevant sind dabei nicht nur Optik, sondern auch Wiedererkennung, Website-Qualität, Anfragewirkung und Konsistenz über alle Kanäle.',
      },
    ],
  },
]

const corporateIdentityFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: corporateIdentityFaqCategories.flatMap((category) =>
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

export function CorporateIdentityFaqBox(): React.JSX.Element {
  return (
    <>
      <Faq8Client
        categories={corporateIdentityFaqCategories}
        eyebrow="FAQ Corporate Identity"
        title="Haeufige Fragen zu Corporate Identity, Corporate Design und Logoentwicklung"
        description="Klare Antworten für kleine Unternehmen in Halle und Umgebung: Unterschied zwischen Logo, Corporate Design und Corporate Identity, Ablauf, Kosten, Rechte, Rebranding und Umsetzung auf Website, Print und Social Media."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateIdentityFaqSchema) }}
      />
    </>
  )
}

export default CorporateIdentityFaqBox
