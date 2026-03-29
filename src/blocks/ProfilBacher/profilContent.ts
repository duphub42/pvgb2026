/**
 * Inhalt der Profilseite (/profil). Als Code-Quelle gepflegt; der Block rendert diese Daten.
 */
export const profilContent = {
  name: 'Philipp V.G. Bacher',
  titel: 'Digital Business Partner – Strategie · Design · Umsetzung',
  kurzbiografie:
    'Seit 2010 selbstständig als Unternehmer, Berater und Umsetzer an der Schnittstelle von Marketing, Webentwicklung und Business Development. International erprobt, fundiert ausgebildet – und mit einem direkten Draht zu dem, was KMUs im digitalen Raum wirklich weiterbringt.',
  ueberMich: {
    einleitung:
      '<p>Ich bin Philipp Bacher – und mein Ansatz ist einfach: Ich denke strategisch und handle operativ. Für meine Kunden bedeutet das, dass sie nicht zwischen Berater und Umsetzer wählen müssen. Ich bin beides.</p><p>Seit 2010 arbeite ich selbstständig für Unternehmen in DACH, Benelux, Hongkong, Malaysia und Indonesien – in den Bereichen Webentwicklung, digitales Marketing, Corporate Design, Vertriebsaufbau und ERP-Beratung. Mein Studium der Betriebswirtschaft (BBA cum laude, Moskau & Groningen) und der Wirtschaftsinformatik (MLU Halle) bildet das analytische Fundament. Was daraus entstanden ist: ein Generalist mit echter Tiefe – und der Fähigkeit, komplexe digitale Projekte von der Strategie bis zur Übergabe zu verantworten.</p><p>Ich arbeite bevorzugt mit KMUs, die klare Ergebnisse erwarten, keine Umwege brauchen und einen Ansprechpartner schätzen, der mitdenkt – nicht nur ausführt.</p>',
    werte: [
      {
        wert: 'Strategie trifft Umsetzung',
        beschreibung:
          'Ich entwickle keine Konzepte, die andere umsetzen müssen. Ich verantworte beides – vom ersten Briefing bis zum fertigen Ergebnis.',
        icon: 'strategy',
      },
      {
        wert: 'International gedacht, lokal verankert',
        beschreibung:
          'Erfahrung in sechs Märkten auf vier Kontinenten. Und dennoch: Ich kenne die Realität mittelständischer Unternehmen im deutschsprachigen Raum aus nächster Nähe.',
        icon: 'global',
      },
      {
        wert: 'Breite mit Tiefe',
        beschreibung:
          'Marketing, Design, Entwicklung, Vertrieb, ERP – kein Baukastenprinzip, sondern ein integrierter Blick. Das verhindert Silos und spart Koordinationsaufwand.',
        icon: 'depth',
      },
      {
        wert: 'Direkt und verlässlich',
        beschreibung: 'Kein Staffelstab, keine Zwischenstufen. Sie sprechen mit mir – und ich liefere.',
        icon: 'direct',
      },
    ],
  },
  kernkompetenz: {
    ueberschrift: 'Was ich für Sie leiste',
    text: 'Als Digital Business Partner übernehme ich die Verantwortung für Ihren digitalen Auftritt und Ihre digitalen Prozesse – ganzheitlich, messbar und ohne Schnittstellenverluste. Meine Arbeit bewegt sich in vier eng verzahnten Bereichen:',
    bereiche: [
      {
        titel: 'Webdesign & Entwicklung',
        text: 'Von der Konzeption bis zum Launch: nutzerzentrierte Websites und Web-Applikationen mit modernen Technologien (Next.js, Payload CMS, React, TypeScript). Mit dem Blick des Designers, der technischen Präzision des Entwicklers und dem Verständnis des Marketers.',
        details: [
          'UI/UX-Design & Prototyping (Figma)',
          'Frontend-Entwicklung (React, Next.js, TypeScript, Tailwind)',
          'CMS-Implementierung (Payload, WordPress, Typo3, Joomla)',
          'E-Commerce & Shop-Systeme',
          'Hosting, Performance & technisches SEO',
        ],
      },
      {
        titel: 'Digitales Marketing & SEO',
        text: 'Strategisch geplant, messbar ausgewertet. SEO, SEM, Content und Kampagnen – nicht als Einzelmaßnahmen, sondern als integriertes System, das organische Sichtbarkeit und bezahlte Reichweite sinnvoll verbindet.',
        details: [
          'SEO-Strategie (technisch & inhaltlich)',
          'Google Ads / SEM-Kampagnen',
          'Social Media Marketing (SMM)',
          'Content-Strategie & Redaktionsplanung',
          'Analytics, Tracking & Reporting (GA4, GSC, Matomo)',
        ],
      },
      {
        titel: 'Branding & Corporate Design',
        text: 'Marken, die konsistent, wiedererkennbar und glaubwürdig auftreten. Von der Logoentwicklung über das Corporate Design bis zur Umsetzung in digitalen und analogen Medien – mit der vollen Adobe Creative Suite und 15 Jahren gestalterischer Praxis.',
        details: [
          'Logo- & Markenentwicklung',
          'Corporate Design & CI-Systeme',
          'Digital Design (Web, Social, Präsentationen)',
          'Print- & App-Design',
          'Fotografie & Bildbearbeitung',
        ],
      },
      {
        titel: 'Business Development & Vertrieb',
        text: 'Digitale Vertriebssysteme, die qualifizierte Leads generieren und Abschlüsse ermöglichen. Ergänzt durch ERP-Beratung (ZOHO, SAP) und CRM-Integration (Salesforce, HubSpot) für Unternehmen, die ihre internen Prozesse mit dem Marktauftritt synchronisieren wollen.',
        details: [
          'Lead-Generierung & Funnel-Aufbau',
          'CRM-Implementierung & -Integration (Salesforce, HubSpot)',
          'ERP-Beratung & Schulung (ZOHO, SAP)',
          'Drop Shipping, Affiliate Marketing, Direktvertrieb',
          'Prozessautomatisierung (Make, n8n, Zapier)',
        ],
      },
    ],
  },
  kompetenzen: [
    {
      bereich: 'Marketing & SEO',
      skills: [
        { skill: 'Digitale Marketingstrategie', level: 'expert' as const },
        { skill: 'SEO (technisch & inhaltlich)', level: 'expert' as const },
        { skill: 'Google Ads / SEM', level: 'expert' as const },
        { skill: 'Social Media Marketing', level: 'expert' as const },
        { skill: 'Content-Marketing', level: 'expert' as const },
        { skill: 'Analytics & Reporting', level: 'expert' as const },
      ],
    },
    {
      bereich: 'Design & UI/UX',
      skills: [
        { skill: 'UI/UX-Design', level: 'expert' as const },
        { skill: 'Figma', level: 'expert' as const },
        { skill: 'Adobe Creative Suite', level: 'expert' as const },
        { skill: 'Corporate Design & CI', level: 'expert' as const },
        { skill: 'App-Design', level: 'advanced' as const },
        { skill: 'Fotografie', level: 'advanced' as const },
      ],
    },
    {
      bereich: 'Entwicklung & Technik',
      skills: [
        { skill: 'Next.js / React', level: 'expert' as const },
        { skill: 'Payload CMS', level: 'expert' as const },
        { skill: 'HTML, CSS, JavaScript', level: 'expert' as const },
        { skill: 'PHP / Python', level: 'advanced' as const },
        { skill: 'MySQL', level: 'advanced' as const },
        { skill: 'Kotlin', level: 'basic' as const },
      ],
    },
    {
      bereich: 'Business & Systeme',
      skills: [
        { skill: 'ERP-Beratung (ZOHO, SAP)', level: 'expert' as const },
        { skill: 'CRM (Salesforce, HubSpot)', level: 'expert' as const },
        { skill: 'Prozessautomatisierung', level: 'expert' as const },
        { skill: 'Business Development', level: 'expert' as const },
        { skill: 'Projektmanagement', level: 'expert' as const },
      ],
    },
  ],
  werdegang: [
    {
      zeitraum: '2010 – heute',
      position: 'Selbstständiger Unternehmer & Digital Business Partner',
      unternehmen: 'Philipp V.G. Bacher',
      beschreibung:
        'Beratung und Umsetzung digitaler Projekte für KMUs in DACH, Benelux, Hongkong, Malaysia und Indonesien. Tätigkeitsbereiche: Webentwicklung, digitales Marketing, Corporate Design, Vertriebsaufbau, ERP-Beratung und Prozessautomatisierung.',
      typ: 'freelance' as const,
    },
    {
      zeitraum: '2019 – 2021',
      position: 'Studium Informatik / Wirtschaftsinformatik',
      unternehmen: 'Martin-Luther-Universität, Halle/Saale',
      beschreibung: 'Vertiefung der technischen und analytischen Grundlagen im Bereich Informatik und Wirtschaftsinformatik.',
      typ: 'education' as const,
    },
    {
      zeitraum: '2014 – 2016',
      position: 'Studium Zahnmedizin',
      unternehmen: 'FAU Friedrich-Alexander-Universität, Erlangen',
      beschreibung: 'Studium der Zahnmedizin mit Fokus auf naturwissenschaftliche Grundlagen und analytisches Denken.',
      typ: 'education' as const,
    },
    {
      zeitraum: '2013 – 2014',
      position: 'Studium Humanmedizin',
      unternehmen: 'LMU Ludwig-Maximilians-Universität, München',
      beschreibung: 'Medizinstudium – Grundlagen der Naturwissenschaften und systematischen Diagnoselogik.',
      typ: 'education' as const,
    },
    {
      zeitraum: '2008 – 2011',
      position: 'Bachelor of Business Administration (cum laude)',
      unternehmen: 'Plekhanov University of Economics, Moskau (RU) & Hanze Hogeschool, Groningen (NL)',
      beschreibung:
        'Doppelabschluss BBA – Schwerpunkte in internationalem Management, Marketing und strategischem Business Development. Abschluss mit Auszeichnung.',
      typ: 'education' as const,
    },
  ],
  zahlenFakten: [
    { zahl: '15+', bezeichnung: 'Jahre selbstständig' },
    { zahl: '6', bezeichnung: 'Internationale Märkte' },
    { zahl: '6', bezeichnung: 'Sprachen' },
    { zahl: '4', bezeichnung: 'Kompetenzbereiche' },
    { zahl: '1', bezeichnung: 'Direkter Ansprechpartner' },
  ],
  tools: [
    { name: 'Next.js', kategorie: 'dev' as const },
    { name: 'React', kategorie: 'dev' as const },
    { name: 'Payload CMS', kategorie: 'dev' as const },
    { name: 'TypeScript', kategorie: 'dev' as const },
    { name: 'PHP', kategorie: 'dev' as const },
    { name: 'Python', kategorie: 'dev' as const },
    { name: 'MySQL', kategorie: 'dev' as const },
    { name: 'WordPress', kategorie: 'dev' as const },
    { name: 'Typo3', kategorie: 'dev' as const },
    { name: 'Figma', kategorie: 'design' as const },
    { name: 'Adobe Photoshop', kategorie: 'design' as const },
    { name: 'Adobe Illustrator', kategorie: 'design' as const },
    { name: 'Adobe InDesign', kategorie: 'design' as const },
    { name: 'Adobe XD', kategorie: 'design' as const },
    { name: 'Google Analytics 4', kategorie: 'analytics' as const },
    { name: 'Google Search Console', kategorie: 'analytics' as const },
    { name: 'Matomo', kategorie: 'analytics' as const },
    { name: 'Google Ads', kategorie: 'marketing' as const },
    { name: 'Salesforce', kategorie: 'marketing' as const },
    { name: 'HubSpot', kategorie: 'marketing' as const },
    { name: 'ZOHO', kategorie: 'marketing' as const },
    { name: 'SAP', kategorie: 'marketing' as const },
    { name: 'Make (Integromat)', kategorie: 'automation' as const },
    { name: 'n8n', kategorie: 'automation' as const },
    { name: 'Zapier', kategorie: 'automation' as const },
    { name: 'Asana', kategorie: 'automation' as const },
    { name: 'Monday.com', kategorie: 'automation' as const },
  ],
  sprachen: [
    { sprache: 'Deutsch', niveau: 'Muttersprache' },
    { sprache: 'Englisch', niveau: 'C2' },
    { sprache: 'Niederländisch', niveau: 'B2' },
    { sprache: 'Französisch', niveau: 'B1' },
    { sprache: 'Russisch', niveau: 'B1' },
    { sprache: 'Spanisch', niveau: 'B1' },
    { sprache: 'Italienisch', niveau: 'A2' },
    { sprache: 'Indonesisch', niveau: 'A2' },
  ],
  zertifikate: [
    'Versicherungsfachmann IHK (§34d GewO)',
    'Skilehrer (DSLV)',
    'Skipper (SKS, SBF Binnen & See)',
    'Führerschein Klasse B',
  ],
  cta: {
    headline: 'Ein Ansprechpartner. Alle Kompetenzen.',
    text: 'Sie brauchen keinen Dienstleister für jede Subdisziplin. Sie brauchen jemanden, der das Gesamtbild versteht und umsetzt. Sprechen Sie mit mir – unverbindlich, konkret und auf Augenhöhe.',
    buttonLabel: 'Gespräch vereinbaren',
    buttonLink: '/kontakt',
  },
  seo: {
    metaTitle: 'Philipp V.G. Bacher – Digital Business Partner | Marketing, Design & Webentwicklung',
    metaDescription:
      'Philipp V.G. Bacher: 15+ Jahre selbstständiger Digital Business Partner für KMUs. Marketing, Webentwicklung, Corporate Design, ERP-Beratung und Vertrieb – aus einer Hand, direkt und messbar.',
  },
} as const
