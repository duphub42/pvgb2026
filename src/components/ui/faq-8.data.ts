export type FaqIconName =
  | 'BriefcaseBusiness'
  | 'LockKeyhole'
  | 'CreditCard'
  | 'Headphones'

export interface FaqEntry {
  question: string
  answer: string
}

export interface FaqCategory {
  value: string
  label: string
  icon: FaqIconName
  faqs: FaqEntry[]
}

export const faqCategories: FaqCategory[] = [
  {
    value: 'allgemein',
    label: 'Allgemeine Fragen',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Für wen ist die Zusammenarbeit geeignet?',
        answer:
          'Für Selbstständige, Gründer, Agenturen und KMU in Halle (Saale) und Mitteldeutschland, die Website, Branding und digitales Marketing aus einer Hand statt von mehreren Dienstleistern wollen. Besonders geeignet für Unternehmen, die schnelle Entscheidungswege ohne Agentur-Overhead schätzen.',
      },
      {
        question: 'Wo sitzt Philipp Bacher und arbeitet er auch überregional?',
        answer:
          'Der Standort ist Halle (Saale), Sachsen-Anhalt. Projekte werden deutschlandweit und für internationale Kunden remote umgesetzt; persönliche Termine vor Ort sind im Raum Halle/Leipzig jederzeit möglich.',
      },
      {
        question: 'Wann kann mein Projekt starten?',
        answer:
          'In der Regel innerhalb von 1-2 Wochen nach Auftragsklärung, abhängig von der aktuellen Auslastung. Für dringende Projekte ist auf Anfrage ein schnellerer Start möglich, am besten im kostenlosen Erstgespräch klären.',
      },
      {
        question: 'Arbeiten Sie auch mit internen Teams oder Marketing-Abteilungen zusammen?',
        answer:
          'Ja. Bei Unternehmen mit eigenem Marketing- oder IT-Team übernimmt Philipp Bacher einzelne Teilbereiche wie Webdesign oder SEO und stimmt sich direkt mit den internen Ansprechpartnern ab, statt Prozesse zu duplizieren.',
      },
      {
        question: 'Kann ich mit einem kleinen Projekt beginnen?',
        answer:
          'Ja, ein kleiner Einstieg wie eine Landingpage, ein Corporate-Design-Update oder eine SEO-Analyse ist ausdrücklich möglich und oft der sinnvollste erste Schritt, bevor größere Projekte folgen.',
      },
      {
        question: 'Was unterscheidet diesen Ansatz von Standard-Agenturpaketen?',
        answer:
          'Ein fester Ansprechpartner übernimmt Strategie, Design, Technik und Marketing statt mehrerer Zuständigkeiten mit Übergabeverlusten. Das bedeutet kürzere Entscheidungswege, keine internen Abstimmungsschleifen und direkte Verantwortung für das Ergebnis.',
      },
      {
        question: 'Ist die Zusammenarbeit auch für sehr kleine Unternehmen oder Solo-Selbstständige geeignet?',
        answer:
          'Ja. Gerade Solo-Selbstständige und kleine Teams profitieren von einem direkten Ansprechpartner ohne Agentur-Mindestbudget. Projekte werden auf den tatsächlichen Bedarf zugeschnitten, statt vorgefertigte Pakete zu verkaufen.',
      },
      {
        question: 'Wie läuft der erste Kontakt ab?',
        answer:
          'Über das Kontaktformular, per E-Mail oder telefonisch unter +49 3459 6393323. Im kostenlosen Erstgespräch werden Ziele, Umfang und Budget grob eingeordnet, danach folgt ein individuelles Angebot.',
      },
      {
        question: 'Werden auch spezielle Branchen wie Immobilien, Handwerk oder Gesundheitswesen bedient?',
        answer:
          'Ja, unter anderem Immobilienmakler, Umwelt- und Reinigungstechnik, Finanzdienstleister und Bildungseinrichtungen. Referenzprojekte aus diesen Branchen finden sich im Portfolio-Bereich der Website.',
      },
    ],
  },
  {
    value: 'leistungen',
    label: 'Leistungen & Prozess',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Welche Leistungen bietet Philipp Bacher konkret an?',
        answer:
          'Vier Kernbereiche: Webdesign & Entwicklung mit Next.js und Payload CMS, digitales Marketing & SEO, Branding & Corporate Design sowie Business Development mit Lead-Funnels und CRM/ERP-Beratung.',
      },
      {
        question: 'Wie läuft ein typisches Webdesign-Projekt ab?',
        answer:
          'Nach einem kostenlosen Erstgespräch folgen Konzeption und Strategie, dann Design in Figma, anschließend die technische Umsetzung und zuletzt Testing sowie Launch. Starter- und Business-Projekte sind laut Preisübersicht in bis zu 4 Wochen online; Premium-Lösungen und Web-Apps benötigen entsprechend mehr Zeit.',
      },
      {
        question: 'Übernimmt Philipp Bacher auch das Hosting nach dem Launch?',
        answer:
          'Ja, Hosting, technische Wartung und Performance-Monitoring können nach Launch als laufende Betreuung übernommen werden, optional auch inklusive technischem SEO-Monitoring.',
      },
      {
        question: 'Werden Websites auch nach dem Launch weiter optimiert?',
        answer:
          'Ja. Über SEO-Reporting, A/B-Tests und Conversion-Optimierung werden Websites nach dem Launch fortlaufend weiterentwickelt statt nur einmalig live geschaltet.',
      },
      {
        question: 'Mit welchen Technologien wird gearbeitet?',
        answer:
          'Next.js, React, TypeScript und Payload CMS werden für moderne Webprojekte eingesetzt; WordPress, Typo3 und Joomla für bestehende CMS-Umgebungen. Für Design kommt die Adobe Creative Suite sowie Figma zum Einsatz.',
      },
      {
        question: 'Wie viele Korrekturschleifen sind im Designprozess enthalten?',
        answer:
          'In der Regel sind mehrere Korrekturrunden pro Projektphase im Angebot enthalten. Zusätzliche Anpassungswünsche außerhalb des vereinbarten Umfangs werden transparent als Zusatzaufwand kommuniziert, bevor sie umgesetzt werden.',
      },
      {
        question: 'Werden auch Texte und Bilder für die Website erstellt, oder muss ich diese liefern?',
        answer:
          'Beides ist möglich. Kunden können eigene Inhalte liefern, oder Texterstellung, Fotografie und Bildbearbeitung werden als Teil des Projekts übernommen, praktisch wenn intern keine Kapazitäten dafür vorhanden sind.',
      },
      {
        question: 'Kann eine bestehende Website überarbeitet werden, statt komplett neu zu bauen?',
        answer:
          'Ja. Je nach technischem Zustand der bestehenden Seite ist ein Relaunch mit Übernahme bestehender Inhalte und SEO-Rankings oft sinnvoller und günstiger als ein kompletter Neubau.',
      },
      {
        question: 'Sind die Websites automatisch für Google und mobile Endgeräte optimiert?',
        answer:
          'Ja, jede Website wird responsive für alle Endgeräte entwickelt und mit technischem SEO-Grundgerüst wie Ladezeiten, Struktur und Meta-Daten ausgeliefert. Das ist fester Bestandteil jedes Projekts, kein Aufpreis.',
      },
      {
        question: 'Wie viel Zeitaufwand entsteht für mich als Kunde während des Projekts?',
        answer:
          'Der Aufwand konzentriert sich auf wenige klar definierte Abstimmungstermine wie Kickoff, Design-Freigabe und Launch-Check. Der Großteil der Umsetzung läuft eigenständig, ohne dauerhafte Abstimmungsschleifen auf Kundenseite.',
      },
    ],
  },
  {
    value: 'preise',
    label: 'Preise & Abrechnung',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Was kostet eine neue Website in Halle?',
        answer:
          'Ein Website-Projekt startet ab 1.490 Euro im Starter-Paket für Onepager oder kleine Websites. Das Business-Paket mit bis zu 8 Seiten liegt bei 3.290 Euro, umfangreiche Premium-Lösungen starten ab 5.900 Euro.',
      },
      {
        question: 'Wie wird abgerechnet: Festpreis oder Stundensatz?',
        answer:
          'Projekte mit klar definiertem Umfang werden grundsätzlich als Festpreis abgerechnet. Für Beratung, Ad-hoc-Aufgaben oder Projekte ohne festen Scope gilt ein Stundensatz von 120 Euro netto, ein Tagessatz von 890 Euro und ein Wochensatz von 3.200 Euro.',
      },
      {
        question: 'Gibt es versteckte Zusatzkosten?',
        answer:
          'Nein. Alle Kosten für Domain, Hosting, Lizenzen und Leistungsumfang werden vor Projektstart transparent im Angebot aufgeführt, ohne nachträgliche Überraschungen.',
      },
      {
        question: 'Was kostet ein Corporate-Design- bzw. Branding-Paket?',
        answer:
          'Logo-Entwicklung startet ab 690 Euro, ein Brand Refresh ab 890 Euro und ein komplettes Corporate Design ab 2.200 Euro. Der genaue Preis hängt von Umfang, Anzahl der Anwendungen und gewünschtem Styleguide ab.',
      },
      {
        question: 'Ist ein Erstgespräch kostenlos?',
        answer:
          'Ja, das Erstgespräch ist garantiert kostenlos und unverbindlich. Darin werden Umfang, Ziele und Budget gemeinsam eingeordnet, bevor ein individuelles Angebot folgt.',
      },
      {
        question: 'Muss die gesamte Summe im Voraus bezahlt werden?',
        answer:
          'Nein. Üblich ist eine Anzahlung bei Projektstart und die Restzahlung bei Abnahme bzw. gestaffelt nach Projektphasen. Die genaue Aufteilung steht im Angebot.',
      },
      {
        question: 'Gibt es Ratenzahlung oder Finanzierungsmöglichkeiten?',
        answer:
          'Für größere Projekte ist eine Aufteilung der Zahlung in mehrere Raten auf Anfrage möglich. Details werden im persönlichen Gespräch individuell geklärt.',
      },
      {
        question: 'Was kostet laufende SEO- oder Marketing-Betreuung im Monat?',
        answer:
          'Laufende Betreuung wird auf Stundenbasis mit 120 Euro netto pro Stunde oder als Tages- bzw. Wochensatz mit 890 Euro bzw. 3.200 Euro netto abgerechnet, sofern kein Festpreis-Scope vereinbart ist. Ein pauschaler Monatspreis wird individuell je nach Umfang festgelegt.',
      },
      {
        question: 'Sind die genannten Preise verbindlich oder nur Richtwerte?',
        answer:
          'Die Preise auf der Website sind Richtwerte für die Einordnung. Der verbindliche Festpreis steht im individuellen Angebot nach dem Erstgespräch, basierend auf dem tatsächlichen Projektumfang.',
      },
      {
        question: 'Was kostet eine Anpassung oder Erweiterung nach dem Launch?',
        answer:
          'Kleinere Anpassungen werden meist auf Stundenbasis mit 120 Euro netto abgerechnet. Größere Erweiterungen laufen als eigenes Angebot, vergleichbar mit gelisteten Zusatzleistungen wie Performance-Optimierung oder Redesign bestehender Seiten.',
      },
    ],
  },
  {
    value: 'support',
    label: 'Support & Betrieb',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Was passiert, wenn nach dem Launch ein technisches Problem auftritt?',
        answer:
          'Support erfolgt direkt und ohne Ticketsystem. Anfragen werden persönlich per Telefon oder E-Mail bearbeitet; dringende technische Probleme werden priorisiert und in der Regel innerhalb weniger Stunden beantwortet.',
      },
      {
        question: 'Gibt es eine laufende Betreuung nach Projektabschluss?',
        answer:
          'Ja, optional als monatliches Wartungs- und Betreuungspaket für Hosting, Updates, Sicherheits-Patches und kleinere Anpassungen.',
      },
      {
        question: 'Wer besitzt die Website und den Code nach Projektabschluss?',
        answer:
          'Der Kunde erhält vollständige Rechte an Design, Code und Inhalten nach Projektabschluss und ist nicht an eine dauerhafte Zusammenarbeit gebunden.',
      },
      {
        question: 'Wie schnell erfolgt eine Reaktion bei dringenden Anfragen, z. B. wenn die Website down ist?',
        answer:
          'Bei akuten technischen Problemen erfolgt eine Reaktion in der Regel innerhalb weniger Stunden, telefonisch erreichbar unter +49 3459 6393323.',
      },
      {
        question: 'Wie oft gibt es Reportings zu Marketing- und SEO-Ergebnissen?',
        answer:
          'Bei laufender Betreuung erfolgt in der Regel ein monatliches Reporting zu Sichtbarkeit, Traffic und Kampagnen-Kennzahlen, verständlich aufbereitet statt als reine Rohdaten-Tabelle.',
      },
      {
        question: 'Wer kümmert sich um Sicherheitsupdates und Backups?',
        answer:
          'Im Rahmen eines Betreuungspakets werden CMS-Updates, Sicherheits-Patches und regelmäßige Backups übernommen, sodass die Website laufend aktuell und abgesichert bleibt.',
      },
      {
        question: 'Was passiert, wenn ich die Zusammenarbeit beenden möchte?',
        answer:
          'Die Zusammenarbeit ist nicht an Mindestlaufzeiten gebunden. Der Kunde behält alle Rechte an Website und Inhalten und kann die Betreuung jederzeit mit angemessener Vorlaufzeit kündigen.',
      },
    ],
  },
  {
    value: 'vergleich',
    label: 'Vergleich & Entscheidung',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Freelancer oder Agentur: Was ist für kleine Unternehmen sinnvoller?',
        answer:
          'Für kleine und mittlere Unternehmen ist ein erfahrener Freelancer oft die effizientere Wahl: direkte Kommunikation, keine Agentur-Overheadkosten und ein fester Ansprechpartner statt wechselnder Projektteams.',
      },
      {
        question: 'Warum nicht einfach einen Website-Baukasten wie Wix oder Jimdo nutzen?',
        answer:
          'Baukästen eignen sich für sehr einfache Auftritte, stoßen aber bei individuellem Design, technischem SEO und Skalierbarkeit an Grenzen. Eine professionell entwickelte Website bietet mehr Kontrolle über Performance, Struktur und langfristiges Wachstum.',
      },
      {
        question: 'Ich hatte bereits schlechte Erfahrungen mit einer Agentur: Was ist hier anders?',
        answer:
          'Statt wechselnder Ansprechpartner und Kommunikation über Projektmanager gibt es einen festen, direkten Ansprechpartner über den gesamten Prozess, von der Strategie bis zur technischen Umsetzung.',
      },
      {
        question: 'Woran erkenne ich ein seriöses Angebot für Webdesign oder Marketing?',
        answer:
          'Ein seriöses Angebot erkennen Sie an transparenten Preisen ohne versteckte Kosten, klar definiertem Leistungsumfang, nachweisbaren Referenzprojekten und einem unverbindlichen Erstgespräch statt Druck zum sofortigen Vertragsabschluss.',
      },
      {
        question: 'Was sind die häufigsten Fehler bei der Wahl eines Webdesign-Partners?',
        answer:
          'Die häufigsten Fehler sind, ausschließlich nach dem niedrigsten Preis zu entscheiden, keine Referenzen zu prüfen und Design ohne SEO- und Marketing-Strategie isoliert zu betrachten. Das führt oft zu Websites, die gut aussehen, aber keine Anfragen generieren.',
      },
    ],
  },
]
