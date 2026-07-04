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
          'Das Logo ist ein einzelnes Erkennungszeichen. Corporate Design beschreibt die visuelle Gestaltung mit Farben, Typografie, Bildsprache und Layoutregeln. Corporate Identity geht weiter und umfasst auch Positionierung, Tonalitaet, Werte und den gesamten Auftritt eines Unternehmens.',
      },
      {
        question: 'Was genau umfasst eine Corporate Identity konkret?',
        answer:
          'Eine Corporate Identity kann Logo, Farbwelt, Schriften, Bildsprache, Gestaltungsraster, Geschaeftsausstattung, Website-Stil, Social-Media-Vorlagen, Tonalitaet und Markenregeln umfassen. Der genaue Umfang richtet sich nach Branche, Budget und den wichtigsten Kontaktpunkten Ihrer Kunden.',
      },
      {
        question: 'Brauche ich als kleiner Betrieb wirklich eine vollstaendige Corporate Identity, oder reicht ein einfaches Logo?',
        answer:
          'Viele kleine Betriebe starten sinnvoll mit Logo, Farben, Schriften und den wichtigsten Anwendungen. Eine vollstaendige Corporate Identity lohnt sich, wenn der Auftritt auf Website, Fahrzeugen, Angeboten, Social Media und Print einheitlich wirken soll.',
      },
      {
        question: 'Ab welcher Unternehmensgroesse lohnt sich eine professionelle Corporate Identity?',
        answer:
          'Eine professionelle Corporate Identity lohnt sich nicht erst ab einer bestimmten Mitarbeiterzahl, sondern sobald Kunden Ihr Unternehmen vergleichen, Vertrauen aufbauen muessen oder mehrere Kanaele bespielt werden. Das betrifft auch Gruender, Handwerksbetriebe, Praxen und lokale Dienstleister in Halle.',
      },
    ],
  },
  {
    value: 'leistungsumfang',
    label: 'Leistungsumfang',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Was ist konkret im Corporate-Identity-Paket fuer kleine Unternehmen enthalten?',
        answer:
          'Typisch sind Marken- und Zielgruppencheck, Logoentwicklung, Farbpalette, Typografie, einfache Gestaltungsregeln, Basis-Geschaeftsausstattung und Dateipaket fuer Web und Druck. Je nach Projekt koennen Website, Social Media, Fahrzeugbeschriftung oder ein Styleguide ergaenzt werden.',
      },
      {
        question: 'Erstellt ihr auch nur ein Logo, ohne die komplette Corporate Identity?',
        answer:
          'Ja, eine reine Logoentwicklung ist moeglich. Sinnvoll ist aber mindestens ein kleines Basispaket mit Farben, Schriften und Dateiformaten, damit das Logo spaeter nicht isoliert wirkt und auf Website, Druck und Social Media sauber eingesetzt werden kann.',
      },
      {
        question: 'Gehoert eine Geschaeftsausstattung automatisch zum Paket?',
        answer:
          'Briefpapier, Visitenkarten und E-Mail-Signatur koennen Bestandteil des Pakets sein, sind aber nicht automatisch in jedem Umfang enthalten. Im Angebot wird klar definiert, welche Anwendungen gestaltet und druckfertig oder digital uebergeben werden.',
      },
      {
        question: 'Entwickelt ihr auch Namensvorschlaege oder Claims/Slogans fuer mein Unternehmen?',
        answer:
          'Ja, Naming, Claims und kurze Markenbotschaften koennen in die Entwicklung einbezogen werden. Dabei geht es um Verstaendlichkeit, Differenzierung, lokale Anschlussfaehigkeit und eine Sprache, die zu Zielgruppe und Leistung passt.',
      },
      {
        question: 'Erstellt ihr auch ein Markenhandbuch zur einheitlichen Nutzung?',
        answer:
          'Ja, Brand Guidelines oder ein kompaktes Markenhandbuch koennen erstellt werden. Darin stehen Logo-Nutzung, Farben, Typografie, Abstaende, Beispiele und Regeln fuer Web, Print und Social Media, damit der Auftritt langfristig konsistent bleibt.',
      },
      {
        question: 'Gestaltet ihr auch Fahrzeugbeschriftung, Ladenbeschilderung oder Arbeitskleidung im Corporate Design?',
        answer:
          'Ja, solche Anwendungen koennen gestaltet oder als Layoutvorgaben vorbereitet werden. Fuer Produktion, Folierung, Textildruck oder Beschilderung arbeite ich bei Bedarf mit den technischen Spezifikationen Ihrer Dienstleister.',
      },
    ],
  },
  {
    value: 'ablauf',
    label: 'Ablauf & Prozess',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Wie laeuft die Entwicklung einer Corporate Identity bei euch Schritt fuer Schritt ab?',
        answer:
          'Der Prozess startet mit Zielklaerung, Zielgruppe, Wettbewerb und Stilrichtung. Danach folgen Konzept, Logoentwuerfe, Auswahl, Verfeinerung, Anwendungen, Dateiaufbereitung und Uebergabe. Auf Wunsch werden Website, Social Media und Print direkt mitgedacht.',
      },
      {
        question: 'Wie viele Logo-Entwuerfe bekomme ich zur Auswahl?',
        answer:
          'Die Anzahl wird im Angebot festgelegt. Bei Logo- und CI-Projekten sind haeufig zwei bis drei fundierte Richtungen sinnvoller als viele beliebige Varianten, weil jede Richtung strategisch begruendet und weiterentwickelt werden kann.',
      },
      {
        question: 'Wie viele Korrekturschleifen sind im Preis enthalten?',
        answer:
          'Meist sind ein bis zwei strukturierte Korrekturrunden enthalten. Weitere Anpassungen sind moeglich und werden transparent nach Aufwand oder als Zusatzpaket vereinbart.',
      },
      {
        question: 'Werde ich in den Entwicklungsprozess eingebunden, oder bekomme ich nur fertige Ergebnisse praesentiert?',
        answer:
          'Sie werden aktiv eingebunden. Am Anfang werden Ziele, Geschmack, Wettbewerber und Zielgruppe geklaert; waehrend der Entwicklung gibt es klare Praesentations- und Feedbackpunkte, damit Entscheidungen nachvollziehbar bleiben.',
      },
      {
        question: 'Welche Informationen braucht ihr von mir zu Beginn?',
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
        question: 'Was kostet eine Corporate Identity fuer ein kleines Unternehmen ungefaehr?',
        answer:
          'Eine kompakte Corporate Identity startet haeufig im niedrigen vierstelligen Bereich. Vollstaendigere Pakete mit Logo, Farben, Typografie, Anwendungen und Guidelines liegen oft zwischen etwa 2.200 und 5.500 Euro, je nach Umfang.',
      },
      {
        question: 'Was kostet ein einzelnes Logo im Vergleich zur kompletten Corporate Identity?',
        answer:
          'Eine reine Logoentwicklung ist meist guenstiger und kann etwa bei 690 bis 1.800 Euro liegen. Eine Corporate Identity kostet mehr, liefert dafuer aber ein nutzbares System fuer Website, Print, Social Media und Wiedererkennung.',
      },
      {
        question: 'Wie lange dauert die Entwicklung einer Corporate Identity im Durchschnitt?',
        answer:
          'Eine kompakte Logo- und CI-Entwicklung dauert meist zwei bis sechs Wochen. Wenn Naming, Markenstrategie, viele Anwendungen oder Abstimmungen mit Druck und Beschilderung dazukommen, sollte mehr Zeit eingeplant werden.',
      },
      {
        question: 'Gibt es guenstigere Einstiegspakete fuer Existenzgruender oder sehr kleine Betriebe?',
        answer:
          'Ja, der Umfang kann fuer Gruender bewusst reduziert werden. Ein Startpaket mit Logo, Farben, Typografie und wichtigsten Dateien ist oft ein guter erster Schritt und kann spaeter zu einem vollstaendigen Corporate Design ausgebaut werden.',
      },
      {
        question: 'Fallen nach Fertigstellung weitere Kosten an, z. B. fuer spaetere Anpassungen?',
        answer:
          'Nach der Uebergabe fallen keine automatischen Folgekosten an. Spaetere Anpassungen, neue Printprodukte, Social-Media-Vorlagen, Website-Erweiterungen oder Produktionsabstimmungen werden separat nach Aufwand oder Paket vereinbart.',
      },
    ],
  },
  {
    value: 'rechtliches',
    label: 'Rechtliches & Dateien',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Wem gehoeren die Rechte am fertigen Logo und Corporate Design?',
        answer:
          'Die Nutzungsrechte werden im Angebot geregelt. In der Regel erhalten Sie nach Bezahlung umfassende Nutzungsrechte fuer Ihr Unternehmen. Original- und Arbeitsdateien, offene Layoutdateien oder Sonderrechte werden klar vereinbart.',
      },
      {
        question: 'Kann ich das Logo und die Designdateien uneingeschraenkt selbst weiterverwenden?',
        answer:
          'Sie erhalten die vereinbarten Dateien fuer Web, Druck und normale Unternehmenskommunikation. Ob offene Quelldateien, Weitergabe an Dritte oder unbegrenzte Bearbeitungsrechte enthalten sind, wird transparent im Leistungsumfang festgelegt.',
      },
      {
        question: 'Uebernehmt ihr auch die Markenanmeldung beim DPMA fuer Logo oder Namen?',
        answer:
          'Ich kann bei Vorbereitung, Klassenrecherche und Abstimmung unterstuetzen. Die rechtliche Markenanmeldung und verbindliche Bewertung sollte jedoch ueber einen spezialisierten Anwalt oder Markenexperten erfolgen.',
      },
      {
        question: 'Prueft ihr vorab, ob das Logo oder der Name bereits markenrechtlich geschuetzt ist?',
        answer:
          'Eine einfache Vorabrecherche ist moeglich, ersetzt aber keine rechtliche Markenpruefung. Fuer verbindliche Sicherheit bei Name, Logo und Schutzklassen empfehle ich eine professionelle Markenrecherche.',
      },
      {
        question: 'In welchen Dateiformaten erhalte ich das fertige Logo?',
        answer:
          'Ueblich sind Vektorformate fuer Druck und Skalierung sowie PNG oder JPG fuer digitale Nutzung. Je nach Paket koennen SVG, PDF, EPS, Farbvarianten, Schwarz-Weiss-Versionen und Social-Media-Exportgroessen enthalten sein.',
      },
    ],
  },
  {
    value: 'relaunch',
    label: 'Relaunch & Rebranding',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Kann ein bestehendes, veraltetes Logo ueberarbeitet statt komplett neu erstellt werden?',
        answer:
          'Ja, ein Logo-Refresh ist oft sinnvoll, wenn Wiedererkennung erhalten bleiben soll. Formen, Proportionen, Farben und Typografie werden modernisiert, ohne die Marke unnoetig zu entkernen.',
      },
      {
        question: 'Woran erkennt man, dass eine Corporate Identity veraltet oder ueberarbeitungsbeduerftig ist?',
        answer:
          'Warnzeichen sind uneinheitliche Materialien, schlechte Lesbarkeit, veraltete Farben, fehlende digitale Nutzbarkeit, pixelige Dateien, unscharfe Positionierung oder ein Auftritt, der nicht mehr zu Zielgruppe und Preisniveau passt.',
      },
      {
        question: 'Was passiert bei einem Rebranding mit bestehenden Materialien?',
        answer:
          'Bestehende Materialien werden priorisiert. Website, Angebote, Visitenkarten, Fahrzeuge, Beschilderung, Social Media und Vorlagen koennen schrittweise umgestellt werden, damit Kosten und Aufwand planbar bleiben.',
      },
      {
        question: 'Was kostet ein Rebranding im Vergleich zu einer komplett neuen Corporate Identity?',
        answer:
          'Ein Rebranding kann guenstiger sein, wenn Strategie und Grundelemente tragfaehig bleiben. Wenn Positionierung, Name, Logo, Website und alle Anwendungen neu entwickelt werden, liegt der Aufwand nahe an einer kompletten Neuentwicklung.',
      },
      {
        question: 'Verliere ich bei einem Redesign meine bisherige Wiedererkennbarkeit bei Stammkunden?',
        answer:
          'Nicht, wenn der Refresh bewusst geplant wird. Wiedererkennbare Elemente wie Farben, Formidee oder Markenkern koennen erhalten bleiben, waehrend Lesbarkeit, Modernitaet und digitale Nutzbarkeit verbessert werden.',
      },
    ],
  },
  {
    value: 'umsetzung',
    label: 'Website, Print & Kanaele',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Wird die Corporate Identity direkt in meine Website und Social-Media-Kanaele uebernommen?',
        answer:
          'Ja, auf Wunsch wird das Corporate Design direkt in Website, Landingpages, Social-Media-Profile, Vorlagen und digitale Anzeigen uebertragen. Dadurch entsteht ein konsistenter Auftritt statt einzelner, voneinander getrennter Designteile.',
      },
      {
        question: 'Uebernehmt ihr auch die Umsetzung des Corporate Designs auf Print-Materialien?',
        answer:
          'Ja, Flyer, Plakate, Broschueren, Briefpapier, Visitenkarten, Praesentationen oder Anzeigen koennen CI-konform gestaltet und fuer Druckereien vorbereitet werden.',
      },
      {
        question: 'Sorgt ihr dafuer, dass mein Auftritt auf allen Kanaelen einheitlich bleibt?',
        answer:
          'Ja, genau dafuer sind Corporate Design und Guidelines da. Website, Social Media, Print, Angebote und Beschilderung werden mit gemeinsamen Regeln gestaltet, damit Kunden Ihr Unternehmen schneller wiedererkennen.',
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
        question: 'Warum sollte ich fuer ein Logo eine Agentur statt einen Freelancer oder Baukasten-Anbieter beauftragen?',
        answer:
          'Entscheidend ist nicht die Bezeichnung, sondern die Arbeitsweise. Wichtig sind strategisches Verstaendnis, saubere Dateien, klare Nutzungsrechte, Anwendungserfahrung und die Faehigkeit, Logo, Website, Print und Marketing zusammenzudenken.',
      },
      {
        question: 'Was unterscheidet eure Corporate-Identity-Entwicklung von anderen Agenturen in Halle oder Leipzig?',
        answer:
          'Der Fokus liegt auf nutzbarer Markenidentitaet fuer kleine Unternehmen: klare Positionierung, saubere Gestaltung, lokale Sichtbarkeit, Website-Anschluss und pragmatische Umsetzung ohne unnoetig aufgeblasenen Prozess.',
      },
      {
        question: 'Fuer welche Branchen habt ihr bereits Corporate Identities entwickelt?',
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
          'Ein konsistenter Auftritt wirkt professioneller, vertrauenswuerdiger und leichter wiedererkennbar. Kunden koennen schneller einordnen, wofuer Ihr Unternehmen steht, ob es zu ihnen passt und warum sie Kontakt aufnehmen sollten.',
      },
      {
        question: 'Kann eine gute Corporate Identity tatsaechlich zu mehr Kundenanfragen fuehren?',
        answer:
          'Ja, indirekt und oft sehr konkret. Eine klare Identitaet verbessert Vertrauen, Wiedererkennung, Website-Wirkung, Anzeigen, Angebote und Weiterempfehlungen. Sie ersetzt kein Marketing, macht Marketing aber deutlich wirksamer.',
      },
      {
        question: 'Gibt es Beispiele, wie sich der Aussenauftritt eines Kunden aus Halle nach dem Rebranding veraendert hat?',
        answer:
          'Wenn passende Referenzen freigegeben sind, koennen Vorher-nachher-Beispiele besprochen werden. Relevant sind dabei nicht nur Optik, sondern auch Wiedererkennung, Website-Qualitaet, Anfragewirkung und Konsistenz ueber alle Kanaele.',
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
        description="Klare Antworten fuer kleine Unternehmen in Halle und Umgebung: Unterschied zwischen Logo, Corporate Design und Corporate Identity, Ablauf, Kosten, Rechte, Rebranding und Umsetzung auf Website, Print und Social Media."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateIdentityFaqSchema) }}
      />
    </>
  )
}

export default CorporateIdentityFaqBox
