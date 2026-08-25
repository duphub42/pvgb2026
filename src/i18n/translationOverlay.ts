import type { Locale } from '@/utilities/locale'
import { localizePathname } from '@/i18n/routing'

const TRANSLATIONS_DE_EN: Record<string, string> = {
  Anfragen: 'Request',
  'Angemeldet!': 'Subscribed!',
  Anmelden: 'Subscribe',
  'ABGESCHLOSSENE PROJEKTE': 'COMPLETED PROJECTS',
  'Allgemeine Fragen': 'General Questions',
  'Leistungen & Prozess': 'Services & Process',
  'Preise & Abrechnung': 'Prices & Billing',
  'Support & Betrieb': 'Support & Operations',
  'Vergleich & Entscheidung': 'Comparison & Decision',
  'Häufige Fragen für Ihren Website-Launch und Ihre digitale Wachstumsstrategie':
    'Frequently Asked Questions for Your Website Launch and Digital Growth Strategy',
  'Klare Antworten zu Leistungen, Projektablauf, Budget und Support. So wissen Sie sofort, wie ich Ihre Website, SEO und Conversion nachhaltig verbessern kann.':
    'Clear answers about services, project flow, budget and support, so you know exactly how I can improve your website, SEO and conversion sustainably.',
  'Für wen ist die Zusammenarbeit geeignet?': 'Who is this collaboration suitable for?',
  'Für Selbstständige, Gründer, Agenturen und KMU in Halle (Saale) und Mitteldeutschland, die Website, Branding und digitales Marketing aus einer Hand statt von mehreren Dienstleistern wollen. Besonders geeignet für Unternehmen, die schnelle Entscheidungswege ohne Agentur-Overhead schätzen.':
    'For self-employed professionals, founders, agencies and SMEs in Halle (Saale) and Central Germany that want website, branding and digital marketing from one source instead of several vendors. Especially suitable for companies that value fast decisions without agency overhead.',
  'Wo sitzt Philipp Bacher und arbeitet er auch überregional?':
    'Where is Philipp Bacher based, and does he also work beyond the region?',
  'Der Standort ist Halle (Saale), Sachsen-Anhalt. Projekte werden deutschlandweit und für internationale Kunden remote umgesetzt; persönliche Termine vor Ort sind im Raum Halle/Leipzig jederzeit möglich.':
    'The location is Halle (Saale), Saxony-Anhalt. Projects are delivered remotely throughout Germany and for international clients; in-person appointments are possible around Halle and Leipzig at any time.',
  'Wann kann mein Projekt starten?': 'When can my project start?',
  'In der Regel innerhalb von 1-2 Wochen nach Auftragsklärung, abhängig von der aktuellen Auslastung. Für dringende Projekte ist auf Anfrage ein schnellerer Start möglich, am besten im kostenlosen Erstgespräch klären.':
    'Usually within 1-2 weeks after the scope is clarified, depending on current availability. For urgent projects, a faster start may be possible and is best clarified in the free initial consultation.',
  'Arbeiten Sie auch mit internen Teams oder Marketing-Abteilungen zusammen?':
    'Do you also work with internal teams or marketing departments?',
  'Ja. Bei Unternehmen mit eigenem Marketing- oder IT-Team übernimmt Philipp Bacher einzelne Teilbereiche wie Webdesign oder SEO und stimmt sich direkt mit den internen Ansprechpartnern ab, statt Prozesse zu duplizieren.':
    'Yes. For companies with their own marketing or IT team, Philipp Bacher can take over individual areas such as web design or SEO and coordinate directly with internal contacts instead of duplicating processes.',
  'Kann ich mit einem kleinen Projekt beginnen?': 'Can I start with a small project?',
  'Ja, ein kleiner Einstieg wie eine Landingpage, ein Corporate-Design-Update oder eine SEO-Analyse ist ausdrücklich möglich und oft der sinnvollste erste Schritt, bevor größere Projekte folgen.':
    'Yes, a small starting point such as a landing page, corporate design update or SEO analysis is explicitly possible and often the most useful first step before larger projects follow.',
  'Was unterscheidet diesen Ansatz von Standard-Agenturpaketen?':
    'What makes this approach different from standard agency packages?',
  'Ein fester Ansprechpartner übernimmt Strategie, Design, Technik und Marketing statt mehrerer Zuständigkeiten mit Übergabeverlusten. Das bedeutet kürzere Entscheidungswege, keine internen Abstimmungsschleifen und direkte Verantwortung für das Ergebnis.':
    'One dedicated contact handles strategy, design, technology and marketing instead of several handoffs between separate roles. This means shorter decision paths, no internal coordination loops and direct responsibility for the result.',
  'Ist die Zusammenarbeit auch für sehr kleine Unternehmen oder Solo-Selbstständige geeignet?':
    'Is this also suitable for very small companies or solo professionals?',
  'Ja. Gerade Solo-Selbstständige und kleine Teams profitieren von einem direkten Ansprechpartner ohne Agentur-Mindestbudget. Projekte werden auf den tatsächlichen Bedarf zugeschnitten, statt vorgefertigte Pakete zu verkaufen.':
    'Yes. Solo professionals and small teams in particular benefit from direct contact without a minimum agency budget. Projects are tailored to the actual need instead of selling prefabricated packages.',
  'Wie läuft der erste Kontakt ab?': 'How does the first contact work?',
  'Über das Kontaktformular, per E-Mail oder telefonisch unter +49 3459 6393323. Im kostenlosen Erstgespräch werden Ziele, Umfang und Budget grob eingeordnet, danach folgt ein individuelles Angebot.':
    'Via the contact form, by email or by phone at +49 3459 6393323. In the free initial consultation, goals, scope and budget are roughly assessed, followed by an individual offer.',
  'Werden auch spezielle Branchen wie Immobilien, Handwerk oder Gesundheitswesen bedient?':
    'Do you also serve specific industries such as real estate, trades or healthcare?',
  'Ja, unter anderem Immobilienmakler, Umwelt- und Reinigungstechnik, Finanzdienstleister und Bildungseinrichtungen. Referenzprojekte aus diesen Branchen finden sich im Portfolio-Bereich der Website.':
    'Yes, including real estate agencies, environmental and cleaning technology, financial services and educational institutions. Reference projects from these industries can be found in the portfolio section of the website.',
  'Welche Leistungen bietet Philipp Bacher konkret an?':
    'Which services does Philipp Bacher offer specifically?',
  'Vier Kernbereiche: Webdesign & Entwicklung mit Next.js und Payload CMS, digitales Marketing & SEO, Branding & Corporate Design sowie Business Development mit Lead-Funnels und CRM/ERP-Beratung.':
    'Four core areas: web design and development with Next.js and Payload CMS, digital marketing and SEO, branding and corporate design, plus business development with lead funnels and CRM/ERP consulting.',
  'Wie läuft ein typisches Webdesign-Projekt ab?': 'How does a typical web design project work?',
  'Nach einem kostenlosen Erstgespräch folgen Konzeption und Strategie, dann Design in Figma, anschließend die technische Umsetzung und zuletzt Testing sowie Launch. Starter- und Business-Projekte sind laut Preisübersicht in bis zu 4 Wochen online; Premium-Lösungen und Web-Apps benötigen entsprechend mehr Zeit.':
    'After a free initial consultation, concept and strategy come first, then design in Figma, followed by technical implementation and finally testing and launch. According to the pricing overview, Starter and Business projects can go online within up to 4 weeks; premium solutions and web apps need more time accordingly.',
  'Übernimmt Philipp Bacher auch das Hosting nach dem Launch?':
    'Does Philipp Bacher also handle hosting after launch?',
  'Ja, Hosting, technische Wartung und Performance-Monitoring können nach Launch als laufende Betreuung übernommen werden, optional auch inklusive technischem SEO-Monitoring.':
    'Yes, hosting, technical maintenance and performance monitoring can be handled as ongoing support after launch, optionally including technical SEO monitoring.',
  'Werden Websites auch nach dem Launch weiter optimiert?':
    'Are websites also optimized further after launch?',
  'Ja. Über SEO-Reporting, A/B-Tests und Conversion-Optimierung werden Websites nach dem Launch fortlaufend weiterentwickelt statt nur einmalig live geschaltet.':
    'Yes. Through SEO reporting, A/B tests and conversion optimization, websites are continuously developed after launch instead of merely being published once.',
  'Mit welchen Technologien wird gearbeitet?': 'Which technologies do you work with?',
  'Next.js, React, TypeScript und Payload CMS werden für moderne Webprojekte eingesetzt; WordPress, Typo3 und Joomla für bestehende CMS-Umgebungen. Für Design kommt die Adobe Creative Suite sowie Figma zum Einsatz.':
    'Next.js, React, TypeScript and Payload CMS are used for modern web projects; WordPress, Typo3 and Joomla for existing CMS environments. Design work uses Adobe Creative Suite and Figma.',
  'Wie viele Korrekturschleifen sind im Designprozess enthalten?':
    'How many revision rounds are included in the design process?',
  'In der Regel sind mehrere Korrekturrunden pro Projektphase im Angebot enthalten. Zusätzliche Anpassungswünsche außerhalb des vereinbarten Umfangs werden transparent als Zusatzaufwand kommuniziert, bevor sie umgesetzt werden.':
    'Usually, several revision rounds per project phase are included in the offer. Additional change requests outside the agreed scope are communicated transparently as extra effort before they are implemented.',
  'Werden auch Texte und Bilder für die Website erstellt, oder muss ich diese liefern?':
    'Do you also create text and images for the website, or do I need to provide them?',
  'Beides ist möglich. Kunden können eigene Inhalte liefern, oder Texterstellung, Fotografie und Bildbearbeitung werden als Teil des Projekts übernommen, praktisch wenn intern keine Kapazitäten dafür vorhanden sind.':
    'Both are possible. Clients can provide their own content, or copywriting, photography and image editing can be handled as part of the project, which is useful when there is no internal capacity.',
  'Kann eine bestehende Website überarbeitet werden, statt komplett neu zu bauen?':
    'Can an existing website be revised instead of rebuilt from scratch?',
  'Ja. Je nach technischem Zustand der bestehenden Seite ist ein Relaunch mit Übernahme bestehender Inhalte und SEO-Rankings oft sinnvoller und günstiger als ein kompletter Neubau.':
    'Yes. Depending on the technical condition of the existing site, a relaunch that preserves existing content and SEO rankings is often more sensible and less expensive than a complete rebuild.',
  'Sind die Websites automatisch für Google und mobile Endgeräte optimiert?':
    'Are the websites automatically optimized for Google and mobile devices?',
  'Ja, jede Website wird responsive für alle Endgeräte entwickelt und mit technischem SEO-Grundgerüst wie Ladezeiten, Struktur und Meta-Daten ausgeliefert. Das ist fester Bestandteil jedes Projekts, kein Aufpreis.':
    'Yes, every website is developed responsively for all devices and delivered with a technical SEO foundation such as loading times, structure and metadata. This is a fixed part of every project, not an extra charge.',
  'Wie viel Zeitaufwand entsteht für mich als Kunde während des Projekts?':
    'How much time do I need to invest as a client during the project?',
  'Der Aufwand konzentriert sich auf wenige klar definierte Abstimmungstermine wie Kickoff, Design-Freigabe und Launch-Check. Der Großteil der Umsetzung läuft eigenständig, ohne dauerhafte Abstimmungsschleifen auf Kundenseite.':
    'The effort is concentrated in a few clearly defined alignment appointments such as kickoff, design approval and launch check. Most implementation runs independently without constant coordination loops on the client side.',
  'Als Freelancer in Halle (Saale) stehe ich für direkte Zusammenarbeit und transparente Umsetzung.':
    'As a freelancer in Halle (Saale), I stand for direct collaboration and transparent execution.',
  'Ausgewählte Kundenprojekte mit klarem Ergebnisfokus':
    'Selected Client Projects With a Clear Focus on Results',
  'Case ansehen': 'View case',
  'Creative Digital Strategist': 'Creative Digital Strategist',
  'Darum arbeiten andere Macher mit mir zusammen. Entdecken Sie die Vorteile.':
    'Why other builders work with me. Discover the advantages.',
  Datenschutz: 'Privacy',
  Datenschutzerklärung: 'Privacy Policy',
  'Mit dieser Privacy Policy informieren wir Sie darüber, welche personenbezogenen Daten bei der Nutzung dieser Website verarbeitet werden.':
    'This privacy policy explains which personal data is processed when you use this website.',
  '1. Verantwortlicher': '1. Controller',
  Verantwortlicher: 'Controller',
  '2. Server-Logfiles': '2. Server Log Files',
  'Beim Aufruf der Website werden technisch erforderliche Daten verarbeitet (z.B. IP-Adresse, Datum/Uhrzeit des Zugriffs, angeforderte URL). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).':
    'When the website is accessed, technically required data is processed, such as IP address, date and time of access and requested URL. Legal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest).',
  '3. Kontaktaufnahme': '3. Contact',
  'Wenn Sie uns kontaktieren, verarbeiten wir die übermittelten Daten zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b oder lit. f DSGVO.':
    'If you contact us, we process the submitted data to handle your request. Legal basis: Art. 6 para. 1 lit. b or lit. f GDPR.',
  '4. Ihre Rechte': '4. Your Rights',
  'Sie haben Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21) und Widerruf (Art. 7 Abs. 3 DSGVO).':
    'You have the right to access (Art. 15), rectification (Art. 16), deletion (Art. 17), restriction (Art. 18), data portability (Art. 20), objection (Art. 21) and withdrawal of consent (Art. 7 para. 3 GDPR).',
  '5. Beschwerderecht': '5. Right to Lodge a Complaint',
  'Sie können sich bei einer Privacy-Aufsichtsbehörde beschweren.':
    'You may lodge a complaint with a data protection supervisory authority.',
  '6. Änderungen': '6. Changes',
  'Wir behalten uns vor, diese Privacy Policy anzupassen.':
    'We reserve the right to update this privacy policy.',
  'Stand: 11. April 2026': 'Last updated: April 11, 2026',
  Details: 'Details',
  'CI - Corporate Identity': 'CI - Corporate Identity',
  'Content-Creation': 'Content Creation',
  'Direkt per WhatsApp': 'Directly via WhatsApp',
  'Digitale Lösungen mit Substanz': 'Digital Solutions With Substance',
  Dunkelmodus: 'Dark mode',
  'Dunkelmodus aktivieren': 'Activate dark mode',
  'E-Mail-Adresse': 'Email address',
  'Eine Auswahl realer Kundenprojekte aus Webdesign, Marketing und Branding - inklusive SEO-, Lead-, Medizin-, Portal- und E-Commerce-Referenzen mit messbaren Ergebnissen.':
    'A selection of real client projects in web design, marketing and branding, including SEO, lead generation, medical, portal and e-commerce references with measurable results.',
  'Eine Auswahl realer Kundenprojekte aus Web Design, Marketing und Branding – inklusive SEO- und Lead-Referenzen mit messbaren Ergebnissen.':
    'A selection of real client projects in web design, marketing and branding, including SEO and lead generation references with measurable results.',
  'Für kurze Rückfragen können Sie mich schnell und unkompliziert per WhatsApp erreichen.':
    'For quick questions, you can reach me quickly and easily via WhatsApp.',
  Hellmodus: 'Light mode',
  'Hellmodus aktivieren': 'Activate light mode',
  'Ich begleite Unternehmen bei der Entwicklung klarer digitaler Strategien – von Positionierung und Marketing bis zur technischen Umsetzung moderner Weblösungen. Der Fokus liegt auf messbaren Ergebnissen: strukturierte Prozesse, performante Kampagnen und Websites, die nicht nur gut aussehen, sondern verkaufen.':
    'I support companies in developing clear digital strategies, from positioning and marketing to the technical implementation of modern web solutions. The focus is on measurable outcomes: structured processes, high-performing campaigns and websites that do not just look good, but sell.',
  'Ihre Telefonnummer': 'Your phone number',
  'Ich akzeptiere die Datenschutzerklärung': 'I accept the Privacy Policy',
  'Ich gestalte digitale Erlebnisse, die sichtbar machen, was Ihr Angebot einzigartig macht.':
    'I design digital experiences that make visible what makes your offer unique.',
  'Ich realisiere moderne, nutzerzentrierte Websites, konsistente Markenauftritte und unterstütze Unternehmen dabei, Ihre Prozesse digital zu automatisieren – effizient, fundiert und ergebnisorientiert.':
    'I create modern, user-centered websites, consistent brand presences and help companies automate their processes digitally: efficiently, thoughtfully and with a focus on results.',
  Impressum: 'Legal',
  Kontakt: 'Contact',
  Kontaktformular: 'Contact form',
  'Kontakt öffnen': 'Open contact',
  Kontaktdaten: 'Contact Details',
  Telefon: 'Phone',
  'Schön, dass Sie hier sind. Wenn Sie Fragen haben oder ein Projekt besprechen möchten, können Sie mich jederzeit direkt kontaktieren. Hinterlassen Sie gern Ihre Nummer für einen Rückruf oder schreiben Sie mir bequem per WhatsApp.':
    'Good to have you here. If you have questions or would like to discuss a project, you can contact me directly at any time. Leave your number for a callback or message me conveniently via WhatsApp.',
  'Rückruf anfordern': 'Request callback',
  'Automatisierung, die Komplexität reduziert und Effizienz skalierbar macht.':
    'Automation that reduces complexity and makes efficiency scalable.',
  'Prozessautomatisierung schafft Freiraum, indem wiederkehrende Aufgaben im Hintergrund zuverlässig erledigt werden. So entsteht Raum für das, was wirklich zählt: Entscheidungen, Wachstum und Fokus. Effizienz wird nicht mehr erarbeitet, sondern systematisch möglich gemacht.':
    'Process automation creates space by reliably handling recurring tasks in the background. This frees up room for what really matters: decisions, growth and focus. Efficiency is no longer worked for, but made systematically possible.',
  'Prozessautomatisierung fuer KMU':
    'Process automation for SMEs',
  'Prozessautomatisierung fuer KMU: Workflows, CRM-Anbindungen, Lead-Prozesse und KI-gestuetzte Abläufe, die manuelle Arbeit reduzieren.':
    'Process automation for SMEs: workflows, CRM integrations, lead processes and AI-powered flows that reduce manual work.',
  'Weniger manuell. Mehr System.': 'Less manual work. More system.',
  'Prozessautomatisierung bedeutet, wiederkehrende Abläufe so zu gestalten, dass sie zuverlässig und ohne manuelle Eingriffe im Hintergrund ausgeführt werden. Dadurch entstehen stabile Systeme, die Fehler reduzieren, Zeit zurückgeben und operative Komplexität deutlich senken.\nIm Kern geht es nicht nur um Effizienz, sondern um Struktur: Prozesse werden standardisiert, miteinander verbunden und so optimiert, dass sie skalierbar funktionieren – unabhängig von Teamgröße oder Arbeitsaufkommen. So entsteht ein digitales System, das entlastet statt belastet und Raum für strategische Arbeit schafft.':
    'Process automation means designing recurring workflows so they run reliably in the background without manual intervention. This creates stable systems that reduce errors, give back time and significantly lower operational complexity.\nAt its core, this is not just about efficiency but about structure: processes are standardized, connected with one another and optimized to work at scale — regardless of team size or workload. The result is a digital system that relieves rather than burdens, creating room for strategic work.',
  'Prozessautomatisierung reduziert manuelle Schritte, vermeidet Fehler und schafft Systeme, die effizient im Hintergrund arbeiten – zuverlässig, skalierbar und jederzeit kontrollierbar.':
    'Process automation reduces manual steps, prevents errors and creates systems that work efficiently in the background — reliable, scalable and always under control.',
  'Hinterlassen Sie Ihre Telefonnummer und ich melde mich zeitnah persönlich bei Ihnen.':
    'Leave your phone number and I will get back to you personally soon.',
  'Ich stimme den Datenschutzbestimmungen zu.': 'I agree to the privacy policy.',
  Datenschutzbestimmungen: 'privacy policy',
  'Bitte wählen': 'Please select',
  Gesendet: 'Sent',
  'Fehler beim Senden. Bitte später erneut versuchen.':
    'Error while sending. Please try again later.',
  'Rückruf-Formular ist aktuell nicht konfiguriert.':
    'The callback form is currently not configured.',
  'WhatsApp-Kontakt ist aktuell nicht konfiguriert.':
    'WhatsApp contact is currently not configured.',
  'Kontakt zu Philipp Bacher - Projekt anfragen': 'Contact Philipp Bacher - Request a Project',
  Konkrete: 'Concrete',
  'Konkrete Erfolge.': 'Concrete results.',
  'Kreative Lösungen.': 'Creative solutions.',
  KUNDENZUFRIEDENHEIT: 'CUSTOMER SATISFACTION',
  'Kundenprojekte im Fokus': 'Client Projects in Focus',
  'Klare Botschaften.': 'Clear messages.',
  'ERFAHRUNG IM DIGITALEN MARKETING': 'EXPERIENCE IN DIGITAL MARKETING',
  Erfolge: 'Results',
  'Leistung besprechen': 'Discuss service',
  Leistungen: 'Services',
  'Mehr Sichtbarkeit. Mehr Anfragen. Mehr Wachstum. Durch Webdesign, Branding, Marketing und smarte Automatisierungen.':
    'More visibility. More inquiries. More growth. Through web design, branding, marketing and smart automation.',
  'Menü öffnen': 'Open menu',
  'Menü schließen': 'Close menu',
  'Noch keine Startseite eingerichtet.': 'No homepage has been set up yet.',
  'Online Marketing': 'Online Marketing',
  'Logo-Entwicklung': 'Logo Design',
  'Marken-Referenzen': 'Branding References',
  Markenstrategie: 'Brand Strategy',
  'Persönlich. Effizient. Mit Blick auf langfristiges Wachstum.':
    'Personal. Efficient. Built for long-term growth.',
  Portfolio: 'Portfolio',
  Preise: 'Prices',
  Profil: 'Profile',
  'Projekt starten. Klarheit gewinnen. Ergebnisse schaffen.':
    'Start a Project. Gain Clarity. Create Results.',
  'SEO - Rankings': 'SEO - Rankings',
  'SEM - Online Werbung': 'SEM - Online Advertising',
  'Print- & Grafikdesign': 'Print & Graphic Design',
  Präsentationen: 'Presentations',
  Seite: 'Page',
  'Sprache wechseln': 'Switch language',
  Start: 'Home',
  Startseite: 'Homepage',
  'Startseite konnte nicht geladen werden. Bitte später erneut versuchen.':
    'The homepage could not be loaded. Please try again later.',
  Suche: 'Search',
  Webdesign: 'Web Design',
  'Digitale Auftritte, die Wachstum ermöglichen': 'Digital Presences That Enable Growth',
  'Ein kurzer Austausch bringt Struktur in Ideen und zeigt, wie daraus ein funktionierendes System entsteht.':
    'A short conversation brings structure to your ideas and shows how they can become a working system.',
  'Erfolgreiche digitale Projekte basieren auf klaren Zielen, einer sauberen Strategie und einer konsequenten Umsetzung.':
    'Successful digital projects are built on clear goals, a solid strategy and consistent execution.',
  'Nicht die Website steht im Fokus, sondern das Ergebnis dahinter. Jede Umsetzung folgt einer klaren Strategie, die Positionierung stärkt, Sichtbarkeit erhöht und messbare Geschäftsergebnisse erzeugt.':
    'The focus is not the website itself, but the outcome behind it. Every build follows a clear strategy that strengthens positioning, increases visibility and creates measurable business results.',
  'Wenn der Anspruch auf nachhaltige Ergebnisse, durchdachte Prozesse und messbare Wirkung liegt, ist dies der richtige Ausgangspunkt. Beschreiben Sie Ihr Vorhaben so konkret wie möglich – daraufhin erfolgt eine fundierte Bewertung inklusive sinnvoller nächster Schritte.':
    'If the goal is sustainable results, thoughtful processes and measurable impact, this is the right starting point. Describe your project as specifically as possible, and you will receive a grounded assessment with useful next steps.',
  'Der erste Schritt ist unkompliziert: Anfrage senden und Klarheit gewinnen.':
    'The first step is simple: send your request and gain clarity.',
  'Web Design-Referenzen': 'Web Design References',
  'Webdesign-Referenzen': 'Web Design References',
  'Marketing-Referenzen': 'Marketing References',
  'Webdesign, Online Marketing & Automatisierung in Halle (Saale)':
    'Web Design, Online Marketing & Automation in Halle (Saale)',
  Websites: 'Websites',
  'Website ansehen': 'View website',
  'Warum mit mir': 'Why Work With Me',
  'Wird angemeldet…': 'Subscribing...',
  'Zum Admin': 'Go to admin',
  'Zur Startseite': 'Go to homepage',
  Zurück: 'Back',
  Abonnieren: 'Subscribe',
  Adresse: 'Address',
  'Alle Rechte vorbehalten.': 'All rights reserved.',
  'Allgemeine Frage': 'General question',
  'Anfrage senden': 'Send request',
  Angebot: 'Quote',
  'Angebot anfragen': 'Request quote',
  Anliegen: 'Request type',
  Absenden: 'Submit',
  'Antworten rund um Webdesign, Website-Erstellung, SEO, Online-Marketing und digitale Projekte.':
    'Answers about web design, website creation, SEO, online marketing and digital projects.',
  'Bei Bedarf klären wir Details in einem unverbindlichen Erstgespräch.':
    'If needed, we clarify the details in a non-binding first call.',
  Beratung: 'Consulting',
  'Design trifft Strategie. Für messbare Ergebnisse. Strategisch aufgebaut, technisch sauber umgesetzt und auf Conversion optimiert.':
    'Design meets strategy. For measurable results. Strategically structured, technically solid and optimized for conversion.',
  'Durch klare Struktur, intuitive Nutzerführung und eine konsequent performance-orientierte Umsetzung entstehen Weblösungen, die sichtbar mehr Anfragen generieren.':
    'Clear structure, intuitive user guidance and consistently performance-oriented implementation create web solutions that generate noticeably more inquiries.',
  'ERGEBNISSE DURCH MARKTFÜHRENDE TECHNOLOGIEN': 'RESULTS THROUGH MARKET-LEADING TECHNOLOGIES',
  Firma: 'Company',
  'Häufige Fragen': 'Frequently Asked Questions',
  'Jedes Detail ist darauf ausgerichtet, Besucher gezielt zu führen, Vertrauen aufzubauen und aus Interessenten Kunden zu machen.':
    'Every detail is designed to guide visitors purposefully, build trust and turn prospects into customers.',
  'Kurz beschreiben, worum es geht und was erreicht werden soll.':
    'Briefly describe what the project is about and what should be achieved.',
  'Moderne Websites sind mehr als digitale Visitenkarten – sie sind ein aktiver Vertriebskanal für neue Kunden.':
    'Modern websites are more than digital business cards - they are an active sales channel for new customers.',
  'Mo-Fr: 09:00-18:00 Uhr': 'Mon-Fri: 09:00-18:00',
  Nachricht: 'Message',
  'Office Hours': 'Office Hours',
  'Philipp Bacher – Ihr persönlicher Ansprechpartner für Digital Consulting, Marketing und Web Design. Ich realisiere moderne, nutzerzentrierte Websites, konsistente Markenauftritte und unterstütze Unternehmen dabei, Ihre Prozesse digital zu automatisieren – effizient, fundiert und ergebnisorientiert.':
    'Philipp Bacher - your personal partner for digital consulting, marketing and web design. I create modern, user-centered websites, consistent brand presences and help companies automate their processes digitally - efficiently, thoughtfully and with a focus on results.',
  'Philipp Bacher – Ihr persönlicher Ansprechpartner für Digital Consulting, Marketing und Web Design.':
    'Philipp Bacher - your personal partner for digital consulting, marketing and web design.',
  '– Ihr persönlicher Ansprechpartner für Digital Consulting, Marketing und Web Design. Ich realisiere moderne, nutzerzentrierte Websites, konsistente Markenauftritte und unterstütze Unternehmen dabei, Ihre Prozesse digital zu automatisieren – effizient, fundiert und ergebnisorientiert.':
    '- your personal partner for digital consulting, marketing and web design. I create modern, user-centered websites, consistent brand presences and help companies automate their processes digitally - efficiently, thoughtfully and with a focus on results.',
  'Ihr persönlicher Ansprechpartner für Digital Consulting, Marketing und Web Design.':
    'Your personal partner for digital consulting, marketing and web design.',
  'Philipp Bacher - Web Design, Marketing & Automatisierung in Halle':
    'Philipp Bacher - Web Design, Marketing & Automation in Halle',
  'Newsletter abonnieren': 'Subscribe to the newsletter',
  'Praxisnahe Impulse zu Web Design, Marketing und Automatisierung – kompakt, relevant und mit echtem Mehrwert.':
    'Practical insights on web design, marketing and automation - concise, relevant and genuinely useful.',
  'Praxisnahe Impulse zu Web Design, Marketing und Automation – kompakt, relevant und mit echtem Mehrwert.':
    'Practical insights on web design, marketing and automation - concise, relevant and genuinely useful.',
  'Rückmeldung erhalten': 'Receive feedback',
  "SO GEHT'S WEITER": 'WHAT HAPPENS NEXT',
  'Sie bekommen zeitnah eine Einschätzung mit sinnvollen nächsten Schritten.':
    'You will quickly receive an assessment with useful next steps.',
  'So wird Web Design zum entscheidenden Faktor für messbares Unternehmenswachstum.':
    'This turns web design into a decisive factor for measurable business growth.',
  'So wird Webdesign zum entscheidenden Faktor für messbares Unternehmenswachstum.':
    'This turns web design into a decisive factor for measurable business growth.',
  'Sowie nach Terminvereinbarung': 'And by appointment',
  'Telefon: +49 3459 6393323': 'Phone: +49 3459 6393323',
  'Termin anfragen': 'Request appointment',
  'Termin abstimmen': 'Schedule appointment',
  'Web Design, das aus Besuchern Kunden macht': 'Web Design That Turns Visitors Into Customers',
  'Webdesign, das aus Besuchern Kunden macht': 'Web Design That Turns Visitors Into Customers',
  'Services für Web Design, Marketing und laufende Betreuung':
    'Services for Web Design, Marketing and Ongoing Support',
  'Leistungen für Webdesign, Marketing und laufende Betreuung':
    'Services for Web Design, Marketing and Ongoing Support',
  'Leistungen für Webdesign, SEO, Branding und Automatisierung mit messbarem Nutzen':
    'Services for web design, SEO, branding and automation with measurable value',
  'Services fuer Web Design, SEO & Automatisierung | Philipp Bacher':
    'Services for Web Design, SEO & Automation | Philipp Bacher',
  'Ich entwickle digitale Auftritte, die nicht nur gut aussehen, sondern Orientierung schaffen, Vertrauen aufbauen und Anfragen ermöglichen.':
    'I develop digital presences that do more than look good: they create orientation, build trust and make inquiries possible.',
  'Ein Hub für alle Services': 'One Hub for All Services',
  'Ein Hub für alle Leistungen': 'One Hub for All Services',
  'Damit Sie schnell den passenden Bereich finden und direkt sehen, wie ich arbeite.':
    'So you can quickly find the right area and see directly how I work.',
  'Klar strukturiert. Direkt verständlich. Auf den Punkt.':
    'Clearly structured. Easy to understand. To the point.',
  'Leistungsspektrum im Überblick': 'Service Range at a Glance',
  'Jeder Bereich ist einzeln buchbar und führt auf eine eigene Unterseite. Dort sehen Sie typische Services, konkrete Schwerpunkte und den jeweiligen Nutzen auf einen Blick. So können Sie schnell einschätzen, welcher Bereich zu Ihrem Ziel passt und direkt den nächsten Schritt gehen.':
    'Each area can be booked individually and leads to its own subpage. There you can see typical services, concrete focus areas and the respective value at a glance, so you can quickly assess which area fits your goal and take the next step.',
  'Jeder Bereich ist einzeln buchbar und führt auf eine eigene Unterseite. Dort sehen Sie typische Leistungen, konkrete Schwerpunkte und den jeweiligen Nutzen auf einen Blick. So können Sie schnell einschätzen, welcher Bereich zu Ihrem Ziel passt und direkt den nächsten Schritt gehen.':
    'Each area can be booked individually and leads to its own subpage. There you can see typical services, concrete focus areas and the respective value at a glance, so you can quickly assess which area fits your goal and take the next step.',
  'Web Design und Entwicklung für klare, schnelle und markengerechte Websites.':
    'Web design and development for clear, fast and brand-aligned websites.',
  'Printprodukte und Grafikdesign, die visuell präzise und wiedererkennbar wirken.':
    'Print products and graphic design that feel visually precise and recognizable.',
  'Starke Präsentationen mit klarer Dramaturgie und hochwertiger Visualität.':
    'Strong presentations with clear dramaturgy and high-quality visuals.',
  'Starke Presentations mit klarer Dramaturgie und hochwertiger Visualität.':
    'Strong presentations with clear dramaturgy and high-quality visuals.',
  'Suchmaschinenoptimierung für langfristige Sichtbarkeit und qualifizierte Zugriffe.':
    'Search engine optimization for long-term visibility and qualified traffic.',
  'Performance-Kampagnen für Sichtbarkeit, Leads und messbare Resultate.':
    'Performance campaigns for visibility, leads and measurable results.',
  'Inhalte für Website, Social Media und Kampagnen, die Ihre Marke lebendig machen.':
    'Content for websites, social media and campaigns that brings your brand to life.',
  'Einheitliche Markenauftritte mit klarer visueller Sprache und konsistenten Regeln.':
    'Unified brand presences with a clear visual language and consistent rules.',
  'Einprägsame Logos mit Varianten für digitale und analoge Anwendungen.':
    'Memorable logos with variants for digital and analog applications.',
  'Positionierung, Kernbotschaften und Leitplanken für eine starke Marke.':
    'Positioning, core messages and guardrails for a strong brand.',
  'Mehr erfahren': 'Learn more',
  'MEHR ERFAHREN': 'LEARN MORE',
  'Lassen Sie uns das passende Vorgehen für Ihr Projekt finden':
    'Let’s Find the Right Approach for Your Project',
  'In einem kurzen Gespräch klären wir, welcher Leistungsbereich für Sie am sinnvollsten ist und wie der nächste Schritt aussieht.':
    'In a short conversation, we clarify which service area makes the most sense for you and what the next step looks like.',
  'Sie möchten diese Leistung auf Ihr Projekt übertragen?':
    'Want to Apply This Service to Your Project?',
  'In einem kurzen Gespräch klären wir Ziele, Ausgangslage und den sinnvollsten nächsten Schritt.':
    'In a short conversation, we clarify goals, starting point and the most useful next step.',
  'So läuft die Zusammenarbeit von der Strategie bis zur Wirkung':
    'How Collaboration Runs From Strategy to Impact',
  'So läuft die Zusammenarbeit - klar, strukturiert, transparent':
    'How Collaboration Works - Clear, Structured, Transparent',
  'Transparent, strukturiert und mit klaren Ergebnissen: Jeder Schritt baut auf dem vorherigen auf.':
    'Transparent, structured and focused on clear results: each step builds logically on the previous one.',
  'Analyse & Ausrichtung': 'Analysis & Alignment',
  'Fundament für alle weiteren Maßnahmen': 'Foundation for All Further Measures',
  'FUNDAMENT FÜR ALLE WEITEREN MASSNAHMEN': 'FOUNDATION FOR ALL FURTHER MEASURES',
  'Wir definieren Ziele, Prioritäten und den richtigen Fokus':
    'We define goals, priorities and the right focus',
  'Gemeinsam definieren wir Ziele, Prioritäten und den richtigen Fokus':
    'Together, we define goals, priorities and the right focus',
  'Vor der Umsetzung klären wir gemeinsam, was wirklich zählt: Zielgruppen, Positionierung, Angebote und konkrete Business-Ziele. So entsteht ein belastbarer Plan statt Aktionismus.':
    'Before implementation, we clarify what really matters: target audiences, positioning, offers and concrete business goals. This creates a reliable plan instead of action for action’s sake.',
  'Umsetzung & Ergebnis': 'Implementation & Result',
  'Pragmatisch, effizient, messbar': 'Pragmatic, Efficient, Measurable',
  'PRAGMATISCH, EFFIZIENT, MESSBAR': 'PRAGMATIC, EFFICIENT, MEASURABLE',
  'Konzept & Architektur': 'Concept & Architecture',
  'Informationsarchitektur, Angebotslogik, Seitenstruktur und User-Flows werden sauber vorbereitet.':
    'Information architecture, offer logic, page structure and user flows are prepared cleanly.',
  'Design & Content': 'Design & Content',
  'Ein hochwertiges visuelles System plus klare Botschaften, die Zielgruppen verstehen und vertrauen.':
    'A high-quality visual system plus clear messages that target audiences understand and trust.',
  'Technische Umsetzung': 'Technical Implementation',
  'Performante Entwicklung, saubere Integrationen und eine stabile Basis für Marketing und Vertrieb.':
    'High-performance development, clean integrations and a stable basis for marketing and sales.',
  'Launch & Optimierung': 'Launch & Optimization',
  'Nach dem Go-live wird datenbasiert optimiert, damit Reichweite, Leads und Conversion wachsen.':
    'After go-live, optimization is data-based so reach, leads and conversion can grow.',
  'Langfristige Partnerschaft': 'Long-Term Partnership',
  'Weiterentwicklung auf Basis realer Daten': 'Development Based on Real Data',
  'WEITERENTWICKLUNG AUF BASIS REALER DATEN': 'DEVELOPMENT BASED ON REAL DATA',
  'Nach der Umsetzung begleite ich bei Skalierung, Tests und kontinuierlicher Verbesserung':
    'After implementation, I support scaling, testing and continuous improvement',
  'Sie wollen eine Website, die sichtbar wird und Anfragen bringt?':
    'Do You Want a Website That Becomes Visible and Generates Inquiries?',
  'Lassen Sie uns kurz Ihre Ziele und den passenden Umsetzungsrahmen abstimmen.':
    'Let’s briefly align your goals and the right implementation scope.',
  'Erstgespräch anfragen': 'Request Initial Consultation',
  'Sichtbarkeit, die Kunden bringt': 'Visibility That Brings Customers',
  'Gefunden werden ist kein Zufall': 'Being Found Is Not a Coincidence',
  'Gute Rankings entstehen nicht durch einzelne Maßnahmen, sondern durch ein Zusammenspiel aus Strategie, Inhalt und Technik. Der Fokus liegt nicht auf möglichst vielen Besuchern, sondern auf den richtigen – Menschen mit konkretem Bedarf und echter Kaufabsicht.':
    'Good rankings do not come from isolated measures, but from the interplay of strategy, content and technology. The focus is not on as many visitors as possible, but on the right people with concrete needs and real buying intent.',
  'Nicht warten, bis Kunden kommen – sichtbar sein, wenn sie suchen':
    'Do Not Wait for Customers to Come - Be Visible When They Search',
  'Suchmaschinenmarketing bringt Angebote genau in dem Moment nach vorne, in dem konkrete Nachfrage entsteht. Präzise gesteuert, klar messbar und direkt wirksam – für Sichtbarkeit, die nicht zufällig passiert, sondern geplant ist.':
    'Search engine marketing brings offers forward at the exact moment concrete demand emerges. Precisely controlled, clearly measurable and directly effective: visibility that is planned, not accidental.',
  'SEM nutzt vorhandene Nachfrage gezielt aus. Im Fokus steht nicht Reichweite, sondern Relevanz – genau die Menschen zu erreichen, die bereits nach einer Lösung suchen. Durch strukturierte Kampagnen, klare Botschaften und optimierte Zielseiten entsteht aus Sichtbarkeit eine konkrete Handlung.':
    'SEM uses existing demand with precision. The focus is not reach, but relevance: reaching exactly the people already searching for a solution. Structured campaigns, clear messages and optimized landing pages turn visibility into concrete action.',
  'Gezielt ausgerichtet, messbar wirksam und darauf fokussiert, Ergebnisse zu schaffen, die sich spürbar verändern':
    'Precisely aligned, measurably effective and focused on creating results that noticeably change',
  'Content Creation formt Wahrnehmung und schafft Bedeutung. Im Mittelpunkt steht die Fähigkeit, Inhalte zu gestalten, die Aufmerksamkeit binden, Vertrauen aufbauen und Marken klar positionieren.':
    'Content creation shapes perception and creates meaning. At its core is the ability to design content that holds attention, builds trust and positions brands clearly.',
  'Wirkungsvolle Inhalte entstehen aus Klarheit, Struktur und einer bewussten Ausrichtung. Jeder Beitrag trägt dazu bei, Aufmerksamkeit in Relevanz zu verwandeln und eine starke, konsistente Markenwahrnehmung aufzubauen. Guter Content entsteht aus Strategie, Präzision und dem Anspruch, Wirkung gezielt zu gestalten.':
    'Effective content comes from clarity, structure and conscious alignment. Every piece helps turn attention into relevance and build a strong, consistent brand perception. Good content comes from strategy, precision and the ambition to shape impact deliberately.',
  'Klar gedacht. Präzise umgesetzt. Wirkungsvoll platziert.':
    'Clearly Thought. Precisely Executed. Effectively Placed.',
  'Marken entstehen nicht im Design. Sie entstehen in der Strategie.':
    'Brands Are Not Created in Design. They Are Created in Strategy.',
  'Eine klare Brand Strategy gibt Richtung, schafft Fokus und sorgt dafür, dass jedes Design, jede Botschaft und jede Entscheidung auf ein Ziel einzahlt.':
    'A clear brand strategy gives direction, creates focus and ensures that every design, message and decision contributes to one goal.',
  'Strategie ist der Ursprung jeder starken Marke.':
    'Strategy Is the Origin of Every Strong Brand.',
  'Ohne Strategie bleibt eine Marke Oberfläche. Sie wirkt vielleicht gut – aber sie funktioniert nicht. Eine starke Brand Strategy definiert, wofür ein Unternehmen steht, wen es erreicht und warum es relevant ist. Sie ist die Grundlage für alles, was danach kommt: Design, Kommunikation und Wachstum.':
    'Without strategy, a brand remains surface. It may look good, but it does not work. A strong brand strategy defines what a company stands for, whom it reaches and why it is relevant. It is the foundation for everything that follows: design, communication and growth.',
  'Positionierung, Zielgruppe und Markenkern bilden das Fundament für klare Kommunikation und nachhaltige Wirkung.':
    'Positioning, target audience and brand core form the foundation for clear communication and lasting impact.',
  'Nicht einfach präsent. Sondern unverwechselbar.': 'Not Just Present. Unmistakable.',
  'Eine Corporate Identity, die dafür sorgt, dass Ihr Unternehmen nicht untergeht – sondern wahrgenommen, erinnert und wiedererkannt wird.':
    'A corporate identity that ensures your company does not disappear, but is noticed, remembered and recognized.',
  'Zwischen Beliebigkeit und Wiedererkennung liegt Struktur.':
    'Between Interchangeability and Recognition Lies Structure.',
  'Corporate Identity ist mehr als ein Logo. Es ist das System hinter dem Auftritt – die Verbindung aus Design, Sprache und Haltung. Ohne klare Linie entsteht Beliebigkeit: unterschiedliche Designs, widersprüchliche Botschaften, fehlende Wiedererkennung. Mit einer durchdachten Corporate Identity entsteht das Gegenteil: Klarheit. Konsistenz. Vertrauen.':
    'Corporate identity is more than a logo. It is the system behind the presence: the connection of design, language and attitude. Without a clear line, interchangeability appears: different designs, conflicting messages and missing recognition. With a thoughtful corporate identity, the opposite emerges: clarity, consistency and trust.',
  'Ein durchgängiges Erscheinungsbild entsteht dort, wo Gestaltung, Sprache und Haltung als System gedacht werden.':
    'A consistent appearance emerges where design, language and attitude are treated as one system.',
  'SEO, SEM und Leadgenerierung in realen Projekten':
    'SEO, SEM and Lead Generation in Real Projects',
  'Referenzen mit Fokus auf organische Sichtbarkeit, Paid-Setup und messbare Lead-Ergebnisse – von der Ads-Phase bis zum organischen Peak.':
    'References focused on organic visibility, paid setup and measurable lead results, from the ads phase to the organic peak.',
  'Org. Besucher / Tag': 'Org. Visitors / Day',
  'Besucher / Tag (Peak)': 'Visitors / Day (Peak)',
  Branche: 'Industry',
  Verband: 'Association',
  Umweltreinigung: 'Environmental Cleaning',
  Kommunikationstraining: 'Communication Training',
  Verbraucherinformation: 'Consumer Information',
  Finanzdienstleister: 'Financial Services',
  'Umwelt- & Reinigungstechnik': 'Environmental & Cleaning Technology',
  'Medizintechnik / Dentallabor': 'Medical Technology / Dental Lab',
  'Wellness & SPA Bedarf': 'Wellness & Spa Supplies',
  Eventlocation: 'Event Venue',
  Zahnarzt: 'Dentist',
  Musikschule: 'Music School',
  Projektfeld: 'Project Field',
  'KPI-ENTWICKLUNG': 'KPI DEVELOPMENT',
  'KPI-Fokus': 'KPI Focus',
  'Ergebnisse aus realen Projekten': 'Results From Real Projects',
  'AUSGEWÄHLTE CASES': 'SELECTED CASES',
  'Ausgewählte Cases': 'Selected Cases',
  'Projekt ansehen': 'View project',
  Industrie: 'Industry',
  'Mittelstaendisches B2B-Unternehmen': 'Mid-sized B2B Company',
  'Relaunch Unternehmenswebsite': 'Corporate Website Relaunch',
  'Modernisierung von Struktur, UI und Performance für bessere Nutzerführung und Conversion.':
    'Modernization of structure, UI and performance for clearer user guidance and better conversion.',
  'Diese Referenzen zeigen, wie aus Strategie, Design und Umsetzung konkrete Resultate entstehen. Jeder Case macht nachvollziehbar, welche Ausgangslage vorlag, welche Entscheidungen getroffen wurden und welche messbaren Effekte daraus entstanden sind.':
    'These references show how strategy, design and implementation become concrete results. Each case makes clear what the starting point was, which decisions were made and which measurable effects followed.',
  'SEO- und Lead-Setup für gezielte Anfragen zu Leitungswasser-Testungen: Fachartikel, Landingpages, Ads-Bootstrap und kontinuierliche Ranking-Optimierung mit exponentiellem Anfragenwachstum.':
    'SEO and lead setup for targeted inquiries about drinking-water testing: expert articles, landing pages, ads bootstrap and continuous ranking optimization with exponential inquiry growth.',
  'Der Verband wurde gezielt gegründet, um qualifizierte Anfragen für Leitungswasser-Testungen zu generieren – ohne bestehende organische Sichtbarkeit oder etablierte Rankings.':
    'The association was created specifically to generate qualified inquiries for drinking-water testing, starting without existing organic visibility or established rankings.',
  'Dreimonatige Google-Ads-Phase für frühe Leads, parallel Aufbau des SEO-Fundaments mit Fachartikeln, Landingpages, technischer Optimierung und strategischem Linkbuilding über relevante Verweise.':
    'A three-month Google Ads phase generated early leads while the SEO foundation was built in parallel through expert articles, landing pages, technical optimization and strategic link building via relevant references.',
  'Top-3-Rankings für relevante Keywords, durchschnittlich rund 300 organische Besucher pro Tag, im Peak 2024 bis zu 30 Leads täglich – nach der Ads-Phase überwiegend organisch.':
    'Top-three rankings for relevant keywords, around 300 organic visitors per day on average and up to 30 daily leads at the 2024 peak, mostly organic after the ads phase.',
  'SEO- und Lead-Plattform für Raumluftmessungen: Fachartikel, Landingpages und die Kombination aus Paid Ads und organischer Suche für starkes Anfragenwachstum.':
    'SEO and lead platform for indoor-air measurements: expert articles, landing pages and a combination of paid ads and organic search for strong inquiry growth.',
  'Die Initiative wurde mit dem klaren Ziel aufgebaut, Anfragen für Raumluftmessungen zu generieren – bei fehlender organischer Reichweite zu Projektstart.':
    'The initiative was built with the clear goal of generating inquiries for indoor-air measurements, starting without organic reach at project launch.',
  'Dreimonatige Ads-Phase für erste Lead-Ströme, begleitet von Content-Hub, Landingpages, Onpage-SEO und Linkbuilding. Nach drei Monaten setzte der organische Traffic verlässlich ein.':
    'A three-month ads phase created the first lead flow, supported by a content hub, landing pages, on-page SEO and link building. After three months, organic traffic became reliable.',
  'Top-3-Rankings für relevante Suchbegriffe, im Schnitt rund 300 organische Zugriffe pro Tag und bis zu 30 Leads pro Tag im Peak 2024 – zusätzlich 10–20 Besucher täglich über strategische Verlinkung.':
    'Top-three rankings for relevant search terms, around 300 organic visits per day on average and up to 30 leads per day at the 2024 peak, plus 10-20 daily visitors through strategic referrals.',
  'SEO, Content und gezielte Ads für Workshop-Buchungen und Marken-Reichweite: von null Sichtbarkeit zu Top-Rankings, stabilem Traffic und bis zu 1.000 Besuchern pro Tag.':
    'SEO, content and targeted ads for workshop bookings and brand reach: from zero visibility to top rankings, stable traffic and up to 1,000 visitors per day.',
  'Start von null: Keine organische Sichtbarkeit, kein etabliertes Ranking – bei gleichzeitigem Ziel, Workshop-Buchungen und Awareness für non-verbale Kommunikationstrainings aufzubauen.':
    'Starting from zero: no organic visibility and no established rankings, while aiming to build workshop bookings and awareness for non-verbal communication trainings.',
  'Onpage-SEO, durchschnittlich fünf Fachartikel pro Woche, strategisches Linkbuilding und sporadische Google-Ads-Kampagnen als gezielter Boost.':
    'On-page SEO, an average of five expert articles per week, strategic link building and occasional Google Ads campaigns as targeted boosts.',
  'Top 3 für „Speed Dating“, Top 1 für „non-verbales Speed Dating“, 200–300 Besucher/Tag im Schnitt, Peaks bis 1.000/Tag und ca. 30 Buchungen/Monat im Peakjahr 2019.':
    'Top three for "speed dating", top one for "non-verbal speed dating", 200-300 visitors per day on average, peaks of up to 1,000 per day and around 30 bookings per month in the 2019 peak year.',
  'Non-verbales Speed Dating': 'Non-Verbal Speed Dating',
  'Buchungen / Monat': 'Bookings / Month',
  Fachartikel: 'Expert Articles',
  'Leads / Tag (Peak 2024)': 'Leads / Day (Peak 2024)',
  'Referral-Besucher / Tag': 'Referral Visitors / Day',
  Organisch: 'Organic',
  'Performance-Verlauf': 'Performance Trend',
  'Kanal-Mix (Peak)': 'Channel Mix (Peak)',
  'Organischer Traffic / Tag': 'Organic Traffic / Day',
  'Leads / Buchungen': 'Leads / Bookings',
  'Organischer Traffic / Tag Entwicklung': 'Organic Traffic / Day Trend',
  'Leads / Buchungen Entwicklung': 'Leads / Bookings Trend',
  'KPI-Entwicklung': 'KPI Development',
  'Traffic- und Lead-Entwicklung': 'Traffic and Lead Development',
  'Ads-Bootstrap, dann exponentieller SEO-Aufbau bis zum Lead-Peak 2024':
    'Ads bootstrap, then exponential SEO growth up to the 2024 lead peak',
  'Paid-Startphase, Content-Hub und Rankings für Raumluft-Leads':
    'Paid launch phase, content hub and rankings for indoor-air leads',
  'Von null Sichtbarkeit zu Top-Rankings und Workshop-Buchungen (Peak 2019)':
    'From zero visibility to top rankings and workshop bookings (2019 peak)',
  'Projektjahr': 'Project Year',
  'Responsive Auftritt': 'Responsive Presence',
  Dentallabor: 'Dental Lab',
  Medizintechnik: 'Medical Technology',
  'Digitaler Marken- und Serviceauftritt für ein Dentallabor, der dentale Präzisionstechnik, Team-Kompetenz und direkte Kontaktwege zu einem hochwertigen Web-Erlebnis verbindet.':
    'Digital brand and service presence for a dental lab, connecting dental precision technology, team expertise and direct contact paths into a high-quality web experience.',
  'Ein spezialisiertes Dentallabor muss seine technische Präzision schnell vermitteln, ohne kühl oder austauschbar zu wirken. Die Website sollte Laborleistungen, Team-Kompetenz und Serviceangebote so ordnen, dass Zahnarztpraxen direkt verstehen, wofür KIPP Dental steht und wie die Zusammenarbeit abläuft.':
    'A specialized dental lab needs to communicate technical precision quickly without feeling cold or interchangeable. The website structures lab services, team expertise and service offers so dental practices immediately understand what KIPP Dental stands for and how collaboration works.',
  'Entwickelt wurde ein fokussierter Auftritt mit klarer Seitenarchitektur, prägnanter Leistungsdarstellung und einer Bildsprache, die Präzisionstechnik und persönliche Betreuung verbindet. Die Inhalte wurden auf schnelle Orientierung, glaubwürdige Expertise und reibungslose Kontaktwege ausgelegt.':
    'A focused presence was developed with clear page architecture, concise service presentation and imagery that connects precision technology with personal support. The content is designed for quick orientation, credible expertise and frictionless contact paths.',
  'Das Ergebnis ist eine moderne Labor-Website, die technische Qualität, Serviceverständnis und Markenauftritt konsistent zusammenführt. KIPP Dental präsentiert sich damit digital so hochwertig, wie die eigene Präzisionsarbeit wahrgenommen werden soll.':
    'The result is a modern lab website that consistently brings together technical quality, service mindset and brand presence. KIPP Dental now presents itself digitally with the same quality its precision work should convey.',
  'Projektlaufzeit': 'Project Duration',
  'Jahre Betreuung': 'Years of Support',
  'Langfristig betreuter Dropshipping-Shop für Wellness- und SPA-Bedarf: von Sortiment und Kategoriearchitektur bis zu nutzerfreundlicher Produktführung und skalierbarer E-Commerce-Basis.':
    'Long-term supported dropshipping shop for wellness and spa supplies: from assortment and category architecture to user-friendly product guidance and a scalable e-commerce foundation.',
  'MEDIFISCH verbindet ein breites Sortiment für Wellness- und SPA-Bedarf mit den operativen Anforderungen eines Dropshipping-Modells. Die Herausforderung lag darin, Produktvielfalt, Vertrauen und Kaufentscheidung so zu strukturieren, dass aus einem umfangreichen Angebot ein verständlicher, skalierbarer Vertriebskanal wird.':
    'MEDIFISCH combines a broad range of wellness and spa supplies with the operational requirements of a dropshipping model. The challenge was to structure product variety, trust and purchasing decisions so that a large assortment becomes a clear, scalable sales channel.',
  'Über mehrere Projektphasen hinweg wurden Shop-Struktur, Produktlogik, Kategoriearchitektur und conversionnahe Nutzerführung weiterentwickelt. Im Fokus standen klare Einstiege ins Sortiment, belastbare E-Commerce-Prozesse und eine Pflegebasis, die langfristig mit dem Angebot wachsen kann.':
    'Across several project phases, shop structure, product logic, category architecture and conversion-oriented user guidance were developed further. The focus was on clear entry points into the assortment, reliable e-commerce processes and a maintenance base that can grow with the offer long term.',
  'Entstanden ist ein langfristig betreuter Online-Shop, der Sortiment, Produktkommunikation und Verkaufsstrecken in einem stabilen digitalen System bündelt. MEDIFISCH kann dadurch ein spezialisiertes Wellness- und SPA-Angebot professionell sichtbar machen und kontinuierlich ausbauen.':
    'The result is a long-term supported online shop that bundles assortment, product communication and sales paths into a stable digital system. MEDIFISCH can present and continuously expand a specialized wellness and spa offer professionally.',
  'Verband Digitale Innovation': 'Digital Innovation Association',
  'Verein für digitale Innovation / Expertennetzwerk':
    'Association for Digital Innovation / Expert Network',
  'Verein fuer digitale Innovation / Expertennetzwerk':
    'Association for Digital Innovation / Expert Network',
  Verbandsauftritt: 'Association Presence',
  Expertennetzwerk: 'Expert Network',
  'Digitale Innovation': 'Digital Innovation',
  'Verbandsplattform für digitale Innovation, die Expertennetzwerk, Themenkompetenz und lösungsorientierte Kommunikation zu einem glaubwürdigen digitalen Auftritt bündelt.':
    'Association platform for digital innovation that combines expert network, topic expertise and solution-oriented communication into a credible digital presence.',
  'Der Verband brauchte einen digitalen Auftritt, der fachliche Autorität, Netzwerkcharakter und Innovationsanspruch gleichzeitig transportiert. Inhalte zu Transformation, Cybersecurity und digitalen Lösungen sollten nicht wie einzelne Themeninseln wirken, sondern als schlüssiges Expertenökosystem sichtbar werden.':
    'The association needed a digital presence that conveyed professional authority, network character and innovation ambition at the same time. Content around transformation, cybersecurity and digital solutions had to appear as a coherent expert ecosystem rather than isolated topic islands.',
  'Konzipiert wurde eine Verbandsplattform mit klaren Themenbereichen, lösungsorientierten Einstiegen und einer Kommunikation, die Fachlichkeit greifbar macht. Struktur, Textführung und visuelle Hierarchie wurden darauf ausgelegt, komplexe Digitalthemen verständlich zu rahmen und Vertrauen in das Netzwerk aufzubauen.':
    'The concept became an association platform with clear topic areas, solution-oriented entry points and communication that makes expertise tangible. Structure, copy flow and visual hierarchy were designed to frame complex digital topics clearly and build trust in the network.',
  'Das Ergebnis ist ein professioneller Verbandsauftritt, der Mission, Themenkompetenz und Expertennetzwerk in einer klaren Informationsarchitektur verbindet. Der Verband Digitale Innovation wirkt dadurch nicht nur sichtbar, sondern als kuratierte Anlaufstelle für digitale Zukunftsthemen.':
    'The result is a professional association presence that connects mission, topic expertise and expert network within a clear information architecture. The Digital Innovation Association becomes visible as a curated contact point for digital future topics.',
  Zahnarztpraxis: 'Dental Practice',
  Praxiswebsite: 'Practice Website',
  'Device-Ansichten': 'Device Views',
  'Patientennaher Praxisauftritt für Zahnarzt Kipp mit freundlicher Bildsprache, klarer Leistungsstruktur und kurzen Wegen von der ersten Orientierung zur Kontaktaufnahme.':
    'Patient-focused practice website for Zahnarzt Kipp with friendly imagery, a clear service structure and short paths from first orientation to contact.',
  'Eine Zahnarztpraxis muss online sehr schnell Vertrauen aufbauen: Patientinnen suchen Orientierung, Leistungen und Kontaktmöglichkeiten, während gleichzeitig Kompetenz, Nähe und ein ruhiger Gesamteindruck spürbar sein müssen. Genau diese Balance sollte der neue Auftritt leisten.':
    'A dental practice needs to build trust online very quickly: patients look for orientation, services and contact options, while competence, approachability and a calm overall impression must be felt at the same time. The new presence was built around exactly this balance.',
  'Umgesetzt wurde ein responsiver Praxisauftritt mit freundlichem Einstieg, klarer Leistungsstruktur und bewusst kurzen Wegen zu Kontakt und Anfrage. Bildsprache, Texte und UI wurden so abgestimmt, dass die Website medizinische Qualität vermittelt und trotzdem nahbar bleibt.':
    'The implementation is a responsive practice presence with a friendly entry, clear service structure and intentionally short paths to contact and inquiry. Imagery, copy and UI were aligned so the website communicates medical quality while remaining approachable.',
  'Das Ergebnis ist eine helle, patientennahe Website, die Praxisprofil, Behandlungsspektrum und Kontaktpunkte auf allen Geräten konsistent präsentiert. Zahnarzt Kipp erhält damit einen digitalen Erstkontakt, der Vertrauen schafft, bevor ein Termin vereinbart wird.':
    'The result is a bright, patient-focused website that presents practice profile, treatment spectrum and contact points consistently across devices. Zahnarzt Kipp gains a digital first contact that builds trust before an appointment is made.',
  'Zahnmedizin / Verbraucherinformation / Expertennetzwerk':
    'Dentistry / Consumer Information / Expert Network',
  Informationsformat: 'Information Format',
  Themenzugang: 'Topic Access',
  Zahnmedizin: 'Dentistry',
  'Redaktionelles Portal für Zahnmedizin und Verbraucherinformation, das Themencluster, Expertenperspektiven und SEO-orientierte Inhaltsstruktur in einer klaren Nutzerführung zusammenbringt.':
    'Editorial portal for dentistry and consumer information that brings topic clusters, expert perspectives and SEO-oriented content structure together in clear user guidance.',
  'ZHKplus braucht als Portal mehr als eine klassische Website: Viele zahnmedizinische Themen, Verbraucherfragen und Expertenperspektiven müssen auffindbar, verständlich und glaubwürdig organisiert werden. Die Herausforderung lag darin, redaktionelle Tiefe mit einfacher Navigation zu verbinden.':
    'As a portal, ZHKplus needs more than a classic website: many dental topics, consumer questions and expert perspectives must be organized in a findable, understandable and credible way. The challenge was to combine editorial depth with simple navigation.',
  'Aufgebaut wurde eine portalartige Informationsarchitektur mit Themenclustern, Artikelübersichten und klaren Einstiegspunkten für unterschiedliche Informationsbedürfnisse. UX, Content-Struktur und SEO-Logik greifen zusammen, damit Inhalte nicht nur publiziert, sondern auch gefunden und genutzt werden.':
    'A portal-style information architecture was built with topic clusters, article overviews and clear entry points for different information needs. UX, content structure and SEO logic work together so content is not only published, but also found and used.',
  'Entstanden ist ein umfangreiches Informationsportal, das zahnmedizinische Verbraucheraufklärung, Expertennetzwerk und redaktionelle Inhalte in einer nutzerfreundlichen Oberfläche bündelt. ZHKplus positioniert sich damit als zentrale Anlaufstelle für verständliche Zahnmedizin im Netz.':
    'The result is an extensive information portal that bundles dental consumer education, expert network and editorial content in a user-friendly interface. ZHKplus positions itself as a central point of contact for understandable dentistry online.',
  'Markenwelt & Designsystem': 'Brand World & Design System',
  'Tech-Startup': 'Tech Startup',
  'Vom Markenfundament bis zur visuellen Systematik für Web, Social und Print.':
    'From brand foundation to visual systematics for web, social and print.',
  Komponenten: 'Components',
  Touchpoints: 'Touchpoints',
  'Informationsplattform zur Verbraucheraufklärung über Trinkwasserqualität, Analyseverfahren und bundesweite kostenlose Leitungswasser-Tests.':
    'Information platform for consumer education about drinking-water quality, analysis methods and free nationwide tap-water tests.',
  'Komplexe Themen rund um Trinkwasserqualität, Analyseverfahren und Gesundheitsaspekte verständlich aufbereiten und Verbraucher transparent informieren.':
    'Complex topics around drinking-water quality, analysis methods and health aspects are prepared clearly to inform consumers transparently.',
  'Entwicklung einer klar strukturierten Informationsplattform mit Fokus auf verständliche Produktaufklärung, einfache Nutzerführung und vertrauensvolle Verbraucherkommunikation.':
    'Development of a clearly structured information platform focused on understandable product education, simple user guidance and trustworthy consumer communication.',
  'Ein moderner Webauftritt, der Verbraucherinformationen, Produktaufklärung und bundesweite kostenlose Leitungswasser-Tests in einer zugänglichen Plattform vereint.':
    'A modern web presence that combines consumer information, product education and free nationwide tap-water tests in an accessible platform.',
  'Informationsplattform zur Aufklärung über Luftqualität, Umweltbelastung und gesundheitliche Auswirkungen im Rahmen der Initiative Saubere Luft.':
    'Information platform for education about air quality, environmental pollution and health impacts as part of Initiative Saubere Luft.',
  'Eine komplexe Thematik rund um Luftqualität, Umweltbelastung und gesundheitliche Auswirkungen verständlich aufbereiten und öffentlich zugänglich kommunizieren.':
    'A complex topic around air quality, environmental pollution and health impacts is made understandable and communicated publicly.',
  'Entwicklung eines klar strukturierten Informationsauftritts mit Fokus auf Aufklärung, Datenvermittlung und intuitiver Nutzerführung für unterschiedliche Zielgruppen.':
    'Development of a clearly structured information presence focused on education, data communication and intuitive user guidance for different target groups.',
  'Ein digitaler Auftritt zur Sensibilisierung für Luftqualität und Umweltgesundheit mit klarer Informationsarchitektur und starker Aufklärungswirkung.':
    'A digital presence that raises awareness for air quality and environmental health with clear information architecture and strong educational impact.',
  'Digitale Plattform für Buchung und Bewerbung zu non-verbalen Speed-Dating-Kommunikationstrainings mit intuitiver Nutzerführung und klarer Kommunikation des Angebots.':
    'Digital platform for booking and promoting non-verbal speed-dating communication trainings with intuitive user guidance and clear offer communication.',
  'Die digitale Buchung und Bewerbung für non-verbale Speed-Dating-Kommunikationstrainings einfach, klar und vertrauensvoll gestalten.':
    'Design digital booking and promotion for non-verbal speed-dating communication trainings in a simple, clear and trustworthy way.',
  'Entwicklung eines strukturierten Webauftritts mit Fokus auf intuitive Buchungs- und Bewerbungsprozesse sowie verständlicher Darstellung des Trainingsformats.':
    'Development of a structured web presence focused on intuitive booking and application processes as well as a clear presentation of the training format.',
  'Eine Plattform zur einfachen Teilnahme an non-verbalen Speed-Dating-Kommunikationstrainings mit optimierter Nutzerführung und klarer Informationsstruktur.':
    'A platform for simple participation in non-verbal speed-dating communication trainings with optimized user guidance and clear information structure.',
  'Händelstr. 3, D-06114 Halle/Saale': 'Handelstr. 3, D-06114 Halle/Saale',
  'Welche Leistungen bieten Sie rund um Webseiten an?': 'Which services do you offer for websites?',
  'Ich biete ganzheitliche Leistungen für professionelle Webseiten: von Strategie und Konzeption über modernes Webdesign bis zur technischen Umsetzung. Dazu gehören auch Suchmaschinenoptimierung (SEO), Ladezeit-Optimierung, Conversion-orientierte Struktur und laufende Website-Betreuung. So entsteht ein Webauftritt, der nicht nur gut aussieht, sondern auch messbar Ergebnisse liefert.':
    'I offer holistic services for professional websites: from strategy and concept to modern web design and technical implementation. This also includes SEO, loading-time optimization, conversion-oriented structure and ongoing website support. The result is a web presence that not only looks good, but delivers measurable results.',
  'Arbeiten Sie mit bestehenden Webseiten oder nur mit neuen Projekten?':
    'Do you work with existing websites or only with new projects?',
  'Beides ist möglich. Ich unterstütze sowohl bei einem kompletten Website-Relaunch als auch bei der gezielten Optimierung bestehender Seiten. Häufige Themen sind bessere Sichtbarkeit bei Google, ein moderneres Design, schnellere Ladezeiten und eine klarere Nutzerführung für mehr Anfragen.':
    'Both are possible. I support complete website relaunches as well as targeted optimization of existing pages. Common topics include better Google visibility, a more modern design, faster loading times and clearer user guidance for more inquiries.',
  'Für wen sind Ihre Leistungen geeignet?': 'Who are your services suitable for?',
  'Meine Leistungen richten sich vor allem an Selbstständige, Dienstleister, kleine und mittelständische Unternehmen, die eine hochwertige Website erstellen oder verbessern möchten. Wenn Sie online professioneller auftreten, besser gefunden werden und mehr qualifizierte Leads gewinnen möchten, sind Sie bei mir richtig. Die Zusammenarbeit ist praxisnah, transparent und auf Ihre Ziele ausgerichtet.':
    'My services are aimed primarily at self-employed professionals, service providers and small to medium-sized companies that want to create or improve a high-quality website. If you want to appear more professional online, be found more easily and generate more qualified leads, you are in the right place.',
  'Wie läuft ein typisches Projekt ab?': 'How does a typical project work?',
  'Ein Projekt startet mit einem unverbindlichen Erstgespräch, in dem Ziele, Zielgruppe und Anforderungen klären. Danach folgen Analyse, Struktur, Design und technische Umsetzung mit regelmäßigen Abstimmungen. Zum Abschluss erhalten Sie eine saubere Übergabe inklusive Einweisung sowie auf Wunsch langfristige Wartung, Support und SEO-Weiterentwicklung.':
    'A project starts with a non-binding first conversation to clarify goals, target audience and requirements. Analysis, structure, design and technical implementation then follow with regular alignment. At the end, you receive a clean handover including onboarding, plus long-term maintenance, support and SEO development if desired.',
  'Wie schnell kann ein Projekt starten?': 'How quickly can a project start?',
  'Kleinere Optimierungen an Ihrer Webseite können oft kurzfristig beginnen. Für größere Website-Projekte oder Relaunches definieren Sie gemeinsam mit mir einen realistischen Zeitplan mit klaren Meilensteinen. So haben Sie von Anfang an Planungssicherheit bei Budget, Umfang und Go-live-Termin.':
    'Smaller website optimizations can often start at short notice. For larger website projects or relaunches, we define a realistic timeline with clear milestones together, giving you planning security for budget, scope and go-live date from the start.',
  'Bieten Sie auch SEO und Performance-Optimierung an?':
    'Do you also offer SEO and performance optimization?',
  'Ja, SEO und Performance sind ein zentraler Bestandteil meiner Arbeit. Ich optimiere unter anderem Seitenstruktur, Meta-Daten, interne Verlinkung, Core Web Vitals und mobile Nutzerfreundlichkeit. Das Ziel ist eine schnell ladende, technisch saubere Website, die bei Google besser rankt und Besucher effizient zu Kunden macht.':
    'Yes, SEO and performance are a central part of my work. I optimize page structure, metadata, internal linking, Core Web Vitals and mobile usability, among other things. The goal is a fast-loading, technically clean website that ranks better on Google and efficiently turns visitors into customers.',
  'Kann ich Inhalte später selbst pflegen?': 'Can I maintain content myself later?',
  'Ja, Ihre Website wird so aufgebaut, dass Sie Inhalte selbstständig und ohne Programmierkenntnisse pflegen können. Texte, Bilder, Leistungen, Referenzen oder Blogbeiträge lassen sich im CMS einfach aktualisieren. Das spart langfristig Zeit und Kosten, weil Sie auf Änderungen schnell reagieren können.':
    'Yes, your website is built so that you can maintain content independently without programming knowledge. Texts, images, services, references or blog posts can be updated easily in the CMS. This saves time and cost long term because you can react quickly to changes.',
  'Unterstützen Sie auch bei Hosting und Domain?': 'Do you also support hosting and domains?',
  'Gern unterstütze ich Sie bei Domain, Hosting, E-Mail-Setup und technischer Grundkonfiguration. Ich achte auf zuverlässige Infrastruktur, Sicherheit, Backups und sinnvolle Performance-Einstellungen. Dadurch läuft Ihre Website stabil, schnell und wartungsfreundlich im Alltag.':
    'I am happy to support you with domain, hosting, email setup and technical base configuration. I pay attention to reliable infrastructure, security, backups and sensible performance settings so your website runs stably, quickly and remains easy to maintain.',
  'Was kostet eine neue Website oder ein Relaunch?': 'What does a new website or relaunch cost?',
  'Was kostet eine neue Website in Halle?': 'What does a new website in Halle cost?',
  'Ein Website-Projekt startet ab 1.490 Euro im Starter-Paket für Onepager oder kleine Websites. Das Business-Paket mit bis zu 8 Seiten liegt bei 3.290 Euro, umfangreiche Premium-Lösungen starten ab 5.900 Euro.':
    'A website project starts at 1,490 euros with the Starter package for one-pagers or small websites. The Business package with up to 8 pages is 3,290 euros, while more extensive premium solutions start at 5,900 euros.',
  'Wie wird abgerechnet: Festpreis oder Stundensatz?':
    'How is billing handled: fixed price or hourly rate?',
  'Projekte mit klar definiertem Umfang werden grundsätzlich als Festpreis abgerechnet. Für Beratung, Ad-hoc-Aufgaben oder Projekte ohne festen Scope gilt ein Stundensatz von 120 Euro netto, ein Tagessatz von 890 Euro und ein Wochensatz von 3.200 Euro.':
    'Projects with a clearly defined scope are generally billed at a fixed price. For consulting, ad-hoc tasks or projects without a fixed scope, the hourly rate is 120 euros net, the day rate is 890 euros and the weekly rate is 3,200 euros.',
  'Gibt es versteckte Zusatzkosten?': 'Are there hidden extra costs?',
  'Nein. Alle Kosten für Domain, Hosting, Lizenzen und Leistungsumfang werden vor Projektstart transparent im Angebot aufgeführt, ohne nachträgliche Überraschungen.':
    'No. All costs for domain, hosting, licenses and scope of services are listed transparently in the offer before the project starts, with no later surprises.',
  'Was kostet ein Corporate-Design- bzw. Branding-Paket?':
    'What does a corporate design or branding package cost?',
  'Logo-Entwicklung startet ab 690 Euro, ein Brand Refresh ab 890 Euro und ein komplettes Corporate Design ab 2.200 Euro. Der genaue Preis hängt von Umfang, Anzahl der Anwendungen und gewünschtem Styleguide ab.':
    'Logo development starts at 690 euros, a brand refresh at 890 euros and a complete corporate design at 2,200 euros. The exact price depends on scope, number of applications and desired style guide.',
  'Ist ein Erstgespräch kostenlos?': 'Is the initial consultation free?',
  'Ja, das Erstgespräch ist garantiert kostenlos und unverbindlich. Darin werden Umfang, Ziele und Budget gemeinsam eingeordnet, bevor ein individuelles Angebot folgt.':
    'Yes, the initial consultation is guaranteed free and non-binding. Scope, goals and budget are assessed together before an individual offer follows.',
  'Muss die gesamte Summe im Voraus bezahlt werden?':
    'Does the full amount need to be paid upfront?',
  'Nein. Üblich ist eine Anzahlung bei Projektstart und die Restzahlung bei Abnahme bzw. gestaffelt nach Projektphasen. Die genaue Aufteilung steht im Angebot.':
    'No. Usually there is a deposit at project start and the remaining payment upon approval or staggered by project phases. The exact split is stated in the offer.',
  'Gibt es Ratenzahlung oder Finanzierungsmöglichkeiten?':
    'Are installment payments or financing options available?',
  'Für größere Projekte ist eine Aufteilung der Zahlung in mehrere Raten auf Anfrage möglich. Details werden im persönlichen Gespräch individuell geklärt.':
    'For larger projects, payment can be split into several installments on request. Details are clarified individually in a personal conversation.',
  'Was kostet laufende SEO- oder Marketing-Betreuung im Monat?':
    'What does ongoing SEO or marketing support cost per month?',
  'Laufende Betreuung wird auf Stundenbasis mit 120 Euro netto pro Stunde oder als Tages- bzw. Wochensatz mit 890 Euro bzw. 3.200 Euro netto abgerechnet, sofern kein Festpreis-Scope vereinbart ist. Ein pauschaler Monatspreis wird individuell je nach Umfang festgelegt.':
    'Ongoing support is billed at 120 euros net per hour or as a day or weekly rate of 890 euros or 3,200 euros net, unless a fixed-price scope is agreed. A monthly flat rate is defined individually depending on scope.',
  'Sind die genannten Preise verbindlich oder nur Richtwerte?':
    'Are the listed prices binding or only estimates?',
  'Die Preise auf der Website sind Richtwerte für die Einordnung. Der verbindliche Festpreis steht im individuellen Angebot nach dem Erstgespräch, basierend auf dem tatsächlichen Projektumfang.':
    'The prices on the website are estimates for orientation. The binding fixed price is stated in the individual offer after the initial consultation, based on the actual project scope.',
  'Was kostet eine Anpassung oder Erweiterung nach dem Launch?':
    'What does an adjustment or extension after launch cost?',
  'Kleinere Anpassungen werden meist auf Stundenbasis mit 120 Euro netto abgerechnet. Größere Erweiterungen laufen als eigenes Angebot, vergleichbar mit gelisteten Zusatzleistungen wie Performance-Optimierung oder Redesign bestehender Seiten.':
    'Smaller adjustments are usually billed hourly at 120 euros net. Larger extensions are handled as a separate offer, comparable to listed add-on services such as performance optimization or redesign of existing pages.',
  'Was passiert, wenn nach dem Launch ein technisches Problem auftritt?':
    'What happens if a technical problem occurs after launch?',
  'Support erfolgt direkt und ohne Ticketsystem. Anfragen werden persönlich per Telefon oder E-Mail bearbeitet; dringende technische Probleme werden priorisiert und in der Regel innerhalb weniger Stunden beantwortet.':
    'Support is direct and without a ticket system. Requests are handled personally by phone or email; urgent technical issues are prioritized and usually answered within a few hours.',
  'Gibt es eine laufende Betreuung nach Projektabschluss?':
    'Is ongoing support available after project completion?',
  'Ja, optional als monatliches Wartungs- und Betreuungspaket für Hosting, Updates, Sicherheits-Patches und kleinere Anpassungen.':
    'Yes, optionally as a monthly maintenance and support package for hosting, updates, security patches and smaller adjustments.',
  'Wer besitzt die Website und den Code nach Projektabschluss?':
    'Who owns the website and code after project completion?',
  'Der Kunde erhält vollständige Rechte an Design, Code und Inhalten nach Projektabschluss und ist nicht an eine dauerhafte Zusammenarbeit gebunden.':
    'The client receives full rights to design, code and content after project completion and is not tied to ongoing collaboration.',
  'Wie schnell erfolgt eine Reaktion bei dringenden Anfragen, z. B. wenn die Website down ist?':
    'How quickly do you respond to urgent requests, for example if the website is down?',
  'Bei akuten technischen Problemen erfolgt eine Reaktion in der Regel innerhalb weniger Stunden, telefonisch erreichbar unter +49 3459 6393323.':
    'For acute technical problems, a response usually follows within a few hours, with phone availability at +49 3459 6393323.',
  'Wie oft gibt es Reportings zu Marketing- und SEO-Ergebnissen?':
    'How often are marketing and SEO results reported?',
  'Bei laufender Betreuung erfolgt in der Regel ein monatliches Reporting zu Sichtbarkeit, Traffic und Kampagnen-Kennzahlen, verständlich aufbereitet statt als reine Rohdaten-Tabelle.':
    'With ongoing support, there is usually monthly reporting on visibility, traffic and campaign metrics, prepared clearly instead of as a raw data table.',
  'Wer kümmert sich um Sicherheitsupdates und Backups?':
    'Who takes care of security updates and backups?',
  'Im Rahmen eines Betreuungspakets werden CMS-Updates, Sicherheits-Patches und regelmäßige Backups übernommen, sodass die Website laufend aktuell und abgesichert bleibt.':
    'As part of a support package, CMS updates, security patches and regular backups are handled so the website stays current and protected.',
  'Was passiert, wenn ich die Zusammenarbeit beenden möchte?':
    'What happens if I want to end the collaboration?',
  'Die Zusammenarbeit ist nicht an Mindestlaufzeiten gebunden. Der Kunde behält alle Rechte an Website und Inhalten und kann die Betreuung jederzeit mit angemessener Vorlaufzeit kündigen.':
    'The collaboration is not tied to minimum terms. The client keeps all rights to website and content and can cancel support at any time with reasonable notice.',
  'Freelancer oder Agentur: Was ist für kleine Unternehmen sinnvoller?':
    'Freelancer or agency: which makes more sense for small companies?',
  'Für kleine und mittlere Unternehmen ist ein erfahrener Freelancer oft die effizientere Wahl: direkte Kommunikation, keine Agentur-Overheadkosten und ein fester Ansprechpartner statt wechselnder Projektteams.':
    'For small and medium-sized companies, an experienced freelancer is often the more efficient choice: direct communication, no agency overhead costs and one fixed contact instead of changing project teams.',
  'Warum nicht einfach einen Website-Baukasten wie Wix oder Jimdo nutzen?':
    'Why not simply use a website builder like Wix or Jimdo?',
  'Baukästen eignen sich für sehr einfache Auftritte, stoßen aber bei individuellem Design, technischem SEO und Skalierbarkeit an Grenzen. Eine professionell entwickelte Website bietet mehr Kontrolle über Performance, Struktur und langfristiges Wachstum.':
    'Website builders are suitable for very simple presences, but reach their limits with custom design, technical SEO and scalability. A professionally developed website offers more control over performance, structure and long-term growth.',
  'Ich hatte bereits schlechte Erfahrungen mit einer Agentur: Was ist hier anders?':
    'I have had bad experiences with an agency before: what is different here?',
  'Statt wechselnder Ansprechpartner und Kommunikation über Projektmanager gibt es einen festen, direkten Ansprechpartner über den gesamten Prozess, von der Strategie bis zur technischen Umsetzung.':
    'Instead of changing contacts and communication through project managers, there is one fixed, direct contact throughout the entire process, from strategy to technical implementation.',
  'Woran erkenne ich ein seriöses Angebot für Webdesign oder Marketing?':
    'How do I recognize a serious offer for web design or marketing?',
  'Ein seriöses Angebot erkennen Sie an transparenten Preisen ohne versteckte Kosten, klar definiertem Leistungsumfang, nachweisbaren Referenzprojekten und einem unverbindlichen Erstgespräch statt Druck zum sofortigen Vertragsabschluss.':
    'You can recognize a serious offer by transparent prices without hidden costs, a clearly defined scope, verifiable reference projects and a non-binding initial consultation instead of pressure to sign immediately.',
  'Was sind die häufigsten Fehler bei der Wahl eines Webdesign-Partners?':
    'What are the most common mistakes when choosing a web design partner?',
  'Die häufigsten Fehler sind, ausschließlich nach dem niedrigsten Preis zu entscheiden, keine Referenzen zu prüfen und Design ohne SEO- und Marketing-Strategie isoliert zu betrachten. Das führt oft zu Websites, die gut aussehen, aber keine Anfragen generieren.':
    'The most common mistakes are deciding only by the lowest price, not checking references and looking at design in isolation without SEO and marketing strategy. This often leads to websites that look good but do not generate inquiries.',
  'Wie kann ich eine Anfrage stellen?': 'How can I send a request?',
  'Klar strukturiert, technisch sauber und auf messbare Ergebnisse ausgerichtet.':
    'Clearly structured, technically clean and focused on measurable results.',
  'Zu den Services': 'View Services',
  'Zu den Leistungen': 'View Services',
  'Projekt besprechen': 'Discuss project',
  'Ihre Website soll nicht nur gut aussehen, sondern Anfragen bringen?':
    'Should your website not only look good, but generate inquiries?',
  'Lassen Sie uns Struktur, Design und Umsetzung so planen, dass Besucher schnell verstehen, warum Sie die richtige Wahl sind.':
    'Let’s plan structure, design and implementation so visitors quickly understand why you are the right choice.',
  'Website-Projekt besprechen': 'Discuss Website Project',
  'Sie wollen bei passenden Suchanfragen sichtbarer werden?':
    'Do you want to become more visible for relevant searches?',
  'Ich prüfe, welche SEO-Hebel für Ihre Seite zuerst Wirkung entfalten: Technik, Inhalte, Struktur oder lokale Signale.':
    'I check which SEO levers will have the first impact for your site: technology, content, structure or local signals.',
  'SEO-Potenzial einschätzen lassen': 'Assess SEO Potential',
  'Ihre Kampagnen sollen bessere Anfragen statt nur Klicks erzeugen?':
    'Should your campaigns generate better inquiries instead of just clicks?',
  'Gemeinsam priorisieren wir Budget, Suchintentionen, Landingpages und Tracking für ein schlankes, auswertbares Setup.':
    'Together, we prioritize budget, search intent, landing pages and tracking for a lean, measurable setup.',
  'Kampagnen-Setup prüfen': 'Review Campaign Setup',
  'Ihre Inhalte sollen Fachlichkeit zeigen und Entscheidungen leichter machen?':
    'Should your content show expertise and make decisions easier?',
  'Ich entwickle Content-Strukturen, Texte und Themen, die Nutzerfragen beantworten und Ihre Leistungen klar positionieren.':
    'I develop content structures, copy and topics that answer user questions and position your services clearly.',
  'Content-Fahrplan anfragen': 'Request Content Roadmap',
  'Ihre Marke braucht einen konsistenten Auftritt über alle Kanäle?':
    'Does your brand need a consistent presence across all channels?',
  'Wir schärfen Positionierung, visuelle Leitplanken und Anwendungen, damit Ihr Auftritt wiedererkennbar und belastbar wird.':
    'We sharpen positioning, visual guidelines and applications so your presence becomes recognizable and reliable.',
  'Markenauftritt besprechen': 'Discuss Brand Presence',
  'Sie brauchen ein Logo, das mehr trägt als nur einen ersten Eindruck?':
    'Do you need a logo that carries more than a first impression?',
  'Ich entwickle Zeichen, Wortmarken und Varianten, die in Website, Social Media, Print und Präsentationen zuverlässig funktionieren.':
    'I develop marks, wordmarks and variants that work reliably on websites, social media, print and presentations.',
  'Logo-Projekt anfragen': 'Request Logo Project',
  'Ihre Marke soll klarer positioniert und leichter erklärbar werden?':
    'Should your brand become clearer to position and easier to explain?',
  'Gemeinsam verdichten wir Zielgruppen, Nutzenargumente und Tonalität zu einem nachvollziehbaren Markenrahmen.':
    'Together, we condense target audiences, value arguments and tonality into a clear brand framework.',
  'Strategiegespräch starten': 'Start Strategy Conversation',
  'Ihre Gestaltung soll digital und gedruckt aus einem Guss wirken?':
    'Should your design feel consistent in digital and print?',
  'Ich übersetze Ihre Marke in klare Layouts, Medien und Vorlagen, die professionell aussehen und praktisch nutzbar bleiben.':
    'I translate your brand into clear layouts, media and templates that look professional and remain practical to use.',
  'Designbedarf klären': 'Clarify Design Needs',
  'Ihre Präsentation soll klar führen statt Folien nur zu füllen?':
    'Should your presentation guide clearly instead of merely filling slides?',
  'Ich helfe bei Storyline, Struktur und visueller Ausarbeitung, damit Ihre Botschaft verständlich und überzeugend ankommt.':
    'I help with storyline, structure and visual development so your message lands clearly and convincingly.',
  'Präsentation besprechen': 'Discuss Presentation',
  'Sie möchten wissen, welche digitalen Hebel sich wirklich lohnen?':
    'Do you want to know which digital levers are truly worthwhile?',
  'Ich analysiere Website, Sichtbarkeit und Conversion-Pfade und leite daraus konkrete, priorisierte nächste Schritte ab.':
    'I analyze website, visibility and conversion paths and derive concrete, prioritized next steps.',
  Potentialanalyse: 'Growth Audit',
  Potenzialanalyse: 'Growth Audit',
  'Potentialanalyse anfragen': 'Request Growth Audit',
  'Potenzialanalyse anfragen': 'Request Growth Audit',
  'Kreative Konzepte, moderne Weblösungen und digitale Strategien – alles aus einer Hand.':
    'Creative concepts, modern web solutions and digital strategies from one source.',
  'Webdesign und Entwicklung': 'Web design and development',
  'Web Design und Entwicklung': 'Web design and development',
  'Printdesign, das auffällt – von Flyer bis Broschüre':
    'Print design that stands out, from flyers to brochures.',
  'Präsentationen, die wirken – visuell stark und auf den Punkt':
    'Presentations that work: visually strong and to the point.',
  'Presentations, die wirken – visuell stark und auf den Punkt':
    'Presentations that work: visually strong and to the point.',
  'Suchmaschinenoptimierung für mehr Sichtbarkeit, Traffic und Anfragen.':
    'Search engine optimization for more visibility, traffic and inquiries.',
  'Performance-Marketing auf Suchmaschinen': 'Performance marketing on search engines',
  'Visuelle Geschichten, Texte und Multimedia, die Ihre Marke lebendig machen – von Social Media bis Website.':
    'Visual stories, copy and multimedia that bring your brand to life, from social media to your website.',
  'Markenidentität klar, einheitlich und professionell gestaltet.':
    'Brand identity designed clearly, consistently and professionally.',
  'Einprägsame Logos, die Marke und Werte klar sichtbar machen':
    'Memorable logos that make your brand and values clearly visible.',
  'Marken klar definieren – Strategie, Positionierung und Storytelling.':
    'Clearly define brands through strategy, positioning and storytelling.',
  Automatisierung: 'Automation',
  'Smarter Workflow, weniger Routine, mehr Fokus auf das Wesentliche – ich digitalisiere Prozesse, damit Ihr Business schneller wächst.':
    'Smarter workflows, less routine and more focus on what matters: I digitize processes so your business can grow faster.',
  'Projekte im Überblick – kreative Konzepte, Weblösungen und digitale Highlights.':
    'Projects at a glance: creative concepts, web solutions and digital highlights.',
  'Individuelle Webseiten, modern gestaltet und funktional umgesetzt':
    'Custom websites with modern design and reliable implementation.',
  'Individuale Webseiten, modern gestaltet und funktional umgesetzt':
    'Custom websites with modern design and reliable implementation.',
  'Marketing Projekte': 'Marketing Projects',
  'Durchdachte Kampagnen mit klarer Botschaft und messbarem Ziel – von der Idee bis zur Performance-Optimierung.':
    'Well-planned campaigns with a clear message and measurable goal, from idea to performance optimization.',
  Marken: 'Brands',
  'Entwicklung von CI- & Logo-Projekten': 'Development of CI and logo projects',
  'Projekt vorschlagen': 'Suggest a Project',
  'Ihr Projekt könnte einen neuen Anstrich gebrauchen, etwas Anschub nötig oder soll erweitert werden?':
    'Could your project use a fresh look, more momentum or a thoughtful extension?',
  'Vorschlag einreichen': 'Submit Proposal',
  'Sie möchten Abläufe automatisieren, ohne Kontrolle zu verlieren?':
    'Do you want to automate processes without losing control?',
  'Ich prüfe Prozesse, Tools und Schnittstellen und entwickle ein Setup, das wiederkehrende Aufgaben zuverlässig vereinfacht.':
    'I review processes, tools and interfaces and develop a setup that reliably simplifies recurring tasks.',
  'Automatisierung besprechen': 'Discuss Automation',
  'Ein Webdesign-Projekt mit ähnlichem Anspruch geplant?':
    'Planning a web design project with similar ambition?',
  'Ich übertrage Strategie, UX und saubere Umsetzung auf Ihr konkretes Zielbild: von Relaunch bis Landingpage-System.':
    'I transfer strategy, UX and clean implementation to your concrete target: from relaunch to landing page system.',
  'Webdesign-Projekt anfragen': 'Request Web Design Project',
  'Ihre Marke soll klarer, hochwertiger und konsistenter auftreten?':
    'Should your brand appear clearer, higher-quality and more consistent?',
  'Ich entwickle Markenauftritte, die Positionierung, Logo, Designsystem und digitale Anwendung zusammenführen.':
    'I develop brand presences that bring positioning, logo, design system and digital application together.',
  'Branding-Projekt starten': 'Start Branding Project',
  'Sie planen ein Projekt mit ähnlichem Anspruch?':
    'Are you planning a project with similar ambition?',
  'Ich zeige Ihnen, welche Schritte für Strategie, Umsetzung und messbare Wirkung in Ihrem Fall sinnvoll sind.':
    'I show you which steps for strategy, implementation and measurable impact make sense in your case.',
  'Projektidee besprechen': 'Discuss Project Idea',
  'Häufige Fragen zu Branding, Websites, Social Media, SEO und Content':
    'Frequently Asked Questions About Branding, Websites, Social Media, SEO and Content',
  'Diese strukturierte FAQ beantwortet typische Fragen zu Leistungen, Preisen, Umsetzung und regionaler Ausrichtung. So können Nutzer und KI-Systeme die Leistungen schnell einordnen und passende Bausteine leichter finden.':
    'This structured FAQ answers typical questions about services, prices, implementation and regional focus. It helps users and AI systems quickly classify the services and identify suitable building blocks.',
  'Webdesign & Webentwicklung': 'Web Design & Web Development',
  'Welche Leistungen bietet Philipp Bacher als Werbeagentur in Halle (Saale) an?':
    'Which services does Philipp Bacher offer as a digital agency in Halle (Saale)?',
  'Das Angebot umfasst Branding, Webdesign und Webentwicklung, Social Media Marketing, SEO/SEA, Print und klassische Werbung sowie Content und Videoproduktion. Die Services sind modular aufgebaut, damit Sie genau die Bausteine buchen können, die Ihr Projekt wirklich braucht.':
    'The offer covers branding, web design and development, social media marketing, SEO/SEA, print and classic advertising, plus content and video production. The services are modular, so you can book exactly the building blocks your project actually needs.',
  'Das Angebot umfasst Branding, Webdesign und Webentwicklung, Social Media Marketing, SEO/SEA, Print und klassische Werbung sowie Content und Videoproduktion. Die Leistungen sind modular aufgebaut, damit Sie genau die Bausteine buchen können, die Ihr Projekt wirklich braucht.':
    'The offer covers branding, web design and development, social media marketing, SEO/SEA, print and classic advertising, plus content and video production. The services are modular, so you can book exactly the building blocks your project actually needs.',
  'Für welche Unternehmensgröße eignet sich Ihr Angebot?':
    'What company size is your offer suitable for?',
  'Kann man auch einzelne Leistungen buchen oder nur Gesamtpakete?':
    'Can individual services be booked, or only complete packages?',
  'SEO - Suchmaschinenoptimierung': 'SEO - Search Engine Optimization',
  'SEO Halle - Suchmaschinenoptimierung fuer KMU | Philipp Bacher':
    'SEO Halle - Search Engine Optimization for SMEs | Philipp Bacher',
  'Gute Rankings entstehen nicht durch einzelne Maßnahmen, sondern durch ein Zusammenspiel aus Strategie, Inhalt und Technik.':
    'Good rankings do not come from isolated measures, but from the interplay of strategy, content and technology.',
  'Der Fokus liegt nicht auf möglichst vielen Besuchern, sondern auf den richtigen – Menschen mit konkretem Bedarf und echter Kaufabsicht.':
    'The focus is not on as many visitors as possible, but on the right people with concrete needs and real buying intent.',
  'SEM - Suchmaschinenmarketing': 'SEM - Search Engine Marketing',
  'Google Ads & SEM Halle - Kampagnen mit klaren KPIs | Philipp Bacher':
    'Google Ads & SEM Halle - Campaigns With Clear KPIs | Philipp Bacher',
  'Printmedien & Grafikdesign': 'Print Media & Graphic Design',
  'Printmedien & Grafikdesign Halle | Philipp Bacher':
    'Print Media & Graphic Design Halle | Philipp Bacher',
  'Design, das Marken greifbar macht': 'Design That Makes Brands Tangible',
  'Ich gestalte Printmedien, die Marken nicht nur darstellen, sondern erlebbar machen – klar im Konzept, präzise im Design und stark in der Wirkung.':
    'I design print media that does more than present brands: it makes them tangible, clear in concept, precise in design and strong in impact.',
  'Printmedien & Grafikdesign, die sichtbar wirken – auf Papier und im Raum.':
    'Print Media & Graphic Design That Creates Visible Impact - on Paper and in Space.',
  'Gutes Design endet nicht am Bildschirm. Ich entwickle visuelle Konzepte für Printmedien, die Aufmerksamkeit erzeugen und Botschaften klar transportieren – von Geschäftsausstattung über Broschüren bis hin zu Kampagnenmaterial.':
    'Good design does not end at the screen. I develop visual concepts for print media that create attention and communicate messages clearly, from business stationery and brochures to campaign material.',
  'Im Mittelpunkt steht eine konsistente Gestaltung, die Ihre Marke stärkt und über alle Kanäle hinweg wiedererkennbar bleibt.':
    'At the center is consistent design that strengthens your brand and remains recognizable across all channels.',
  'Präsentationen & Keynotes': 'Presentations & Keynotes',
  'Praesentationen & Keynotes fuer digitale Strategie | Philipp Bacher':
    'Presentations & Keynotes for Digital Strategy | Philipp Bacher',
  'Klar strukturierte Präsentationen und Keynotes, die Inhalte auf den Punkt bringen und Aufmerksamkeit gezielt lenken. Visuelles Storytelling trifft auf strategische Dramaturgie – für Pitches, Meetings und Bühnen, die im Gedächtnis bleiben.':
    'Clearly structured presentations and keynotes that bring content to the point and guide attention with purpose. Visual storytelling meets strategic dramaturgy for pitches, meetings and stages that remain memorable.',
  'Klar strukturierte Presentations und Keynotes, die Inhalte auf den Punkt bringen und Aufmerksamkeit gezielt lenken. Visuelles Storytelling trifft auf strategische Dramaturgie – für Pitches, Meetings und Bühnen, die im Gedächtnis bleiben.':
    'Clearly structured presentations and keynotes that bring content to the point and guide attention with purpose. Visual storytelling meets strategic dramaturgy for pitches, meetings and stages that remain memorable.',
  'Presentations, die überzeugen – bevor Sie sprechen':
    'Presentations That Convince Before You Speak',
  'Presentations sind mehr als Folien. Sie sind ein Werkzeug für Wirkung, Vertrauen und Entscheidung.':
    'Presentations are more than slides. They are a tool for impact, trust and decision-making.',
  'Logo Design Halle - Markenauftritt mit System | Philipp Bacher':
    'Logo Design Halle - Brand Presence With System | Philipp Bacher',
  'Ein Logo, das mehr ist als ein Zeichen.': 'A Logo That Is More Than a Mark.',
  'Reduziert auf das Wesentliche – und stark genug, um Ihr Unternehmen sichtbar, wiedererkennbar und unverwechselbar zu machen.':
    'Reduced to the essentials and strong enough to make your company visible, recognizable and unmistakable.',
  'Der erste Eindruck einer Marke.': 'The First Impression of a Brand.',
  'Ein Logo ist oft der erste Kontaktpunkt einer Marke.':
    'A logo is often the first point of contact with a brand.',
  'Es entscheidet in Sekunden, ob ein Unternehmen professionell wirkt oder austauschbar erscheint.':
    'Within seconds, it decides whether a company feels professional or interchangeable.',
  'Doch gutes Logodesign entsteht nicht aus Geschmack, sondern aus Klarheit.':
    'But good logo design does not come from taste; it comes from clarity.',
  'Aus Verständnis für Marke, Zielgruppe und Positionierung.':
    'From understanding the brand, target audience and positioning.',
  'So entsteht ein Zeichen, das nicht nur gut aussieht –':
    'This creates a mark that does not just look good,',
  'sondern funktioniert.': 'but works.',
  'Portfolio fuer Web Design, Marketing & Branding | Philipp Bacher':
    'Portfolio for Web Design, Marketing & Branding | Philipp Bacher',
  'Web Design, Marketing und Branding mit messbarem Anspruch':
    'Web Design, Marketing and Branding With Measurable Ambition',
  'Drei Disziplinen, ein Ziel: digitale Auftritte und Kampagnen, die sichtbar wirken und zuverlässig Ergebnisse liefern.':
    'Three disciplines, one goal: digital presences and campaigns that create visible impact and reliably deliver results.',
  'Portfolio-Bereiche': 'Portfolio Areas',
  'PORTFOLIO-BEREICHE': 'PORTFOLIO AREAS',
  'Drei Disziplinen, ein gemeinsamer Ergebnisfokus':
    'Three Disciplines, One Shared Focus on Results',
  'Web Design, Marketing und Branding werden hier als zusammenhängendes Leistungssystem sichtbar. Jede Unterseite zeigt die gleiche Logik: Ausgangslage, Vorgehen und messbares Ergebnis.':
    'Web design, marketing and branding are shown here as a connected service system. Each subpage follows the same logic: starting point, approach and measurable result.',
  'Web Design & Entwicklung': 'Web Design & Development',
  'UX-orientierte Websites und digitale Produkte - von Informationsarchitektur und Interface-Design bis zur performanten, SEO-fähigen Umsetzung.':
    'UX-oriented websites and digital products, from information architecture and interface design to high-performance, SEO-ready implementation.',
  'Marketing, SEO & SEM': 'Marketing, SEO & SEM',
  'Datengetriebene Kampagnen aus SEO, SEM und Lead-Generierung mit klarem Prozess: Analyse, Kanalstrategie, Testing und Optimierung.':
    'Data-driven campaigns from SEO, SEM and lead generation with a clear process: analysis, channel strategy, testing and optimization.',
  'Branding & Corporate Identity': 'Branding & Corporate Identity',
  'Markenauftritte mit klarer Identität - von Logoentwicklung und visuellem System bis zur konsistenten Anwendung über alle Touchpoints.':
    'Brand presences with a clear identity, from logo design and visual system to consistent application across all touchpoints.',
  'Web Design-Projekte ansehen': 'View Web Design Projects',
  'Marketing-Projekte ansehen': 'View Marketing Projects',
  'Branding-Projekte ansehen': 'View Branding Projects',
  'Web Design mit messbarer Anfragewirkung': 'Web Design With Measurable Inquiry Impact',
  'Ein starker Webauftritt wirkt nur dann nachhaltig, wenn Inhalt, Nutzerführung und Technik als System geplant werden. Die gezeigten Cases zeigen, wie aus klarer Struktur und performanter Umsetzung konkrete Anfragen entstehen. Gute Gestaltung ist dabei kein Selbstzweck, sondern der Hebel für Vertrauen und Abschlussbereitschaft. So wird Ihre Website zu einem aktiven Vertriebskanal statt zu einer statischen Visitenkarte.':
    'A strong web presence only has lasting impact when content, user guidance and technology are planned as one system. The cases show how clear structure and high-performance implementation create concrete inquiries. Good design is not an end in itself, but a lever for trust and readiness to act. This turns your website into an active sales channel instead of a static business card.',
  'Marketing mit klarer Ergebniskette': 'Marketing With a Clear Chain of Results',
  'Relevantes Marketing beginnt mit belastbaren Daten und einer priorisierten Zielsetzung. Die Projekte machen sichtbar, wie SEO, Kampagnen und Content entlang einer klaren Ergebniskette orchestriert werden. Jede Massnahme wird laufend auf Reichweite, Leadqualitaet und Kosten-Effizienz optimiert. Dadurch entsteht ein Wachstumssystem, das nicht vom Zufall abhaengt, sondern reproduzierbar Ergebnisse liefert.':
    'Relevant marketing starts with reliable data and prioritized goals. The projects show how SEO, campaigns and content are orchestrated along a clear chain of results. Every measure is continuously optimized for reach, lead quality and cost efficiency. This creates a growth system that does not depend on chance, but delivers reproducible results.',
  'Logodesign-Referenzen aus realen Kundenaufträgen':
    'Logo Design References From Real Client Projects',
  'Vom ersten Entwurf bis zur finalen Anwendung: Diese Auswahl zeigt Logos, die für unterschiedliche Branchen entwickelt und in der Praxis erfolgreich eingesetzt wurden.':
    'From first draft to final application: this selection shows logos developed for different industries and successfully used in practice.',
  'Preise fuer Web Design, Marketing & Automatisierung | Philipp Bacher':
    'Prices for Web Design, Marketing & Automation | Philipp Bacher',
  PREISÜBERSICHT: 'PRICE OVERVIEW',
  'Klare Investition mit voller Transparenz und nachvollziehbarer Struktur.':
    'A clear investment with full transparency and a comprehensible structure.',
  'Jeder Euro fließt gezielt in Wachstum, Wirkung und messbare Ergebnisse.':
    'Every euro is directed toward growth, impact and measurable results.',
  'Was Sie investieren, zeigt Wirkung – messbar in Performance, Anfragen und Reichweite.':
    'What you invest creates impact, measurable in performance, inquiries and reach.',
  'mehr Anfragen': 'more inquiries',
  PERSÖNLICH: 'PERSONAL',
  'Web Design-Pakete für jedes Projektstadium': 'Web Design Packages for Every Project Stage',
  'Drei klar strukturierte Angebote mit transparenten Services, damit Sie Aufwand und Ergebnis direkt einschätzen können.':
    'Three clearly structured offers with transparent services, so you can assess effort and result directly.',
  'Was planen Sie?': 'What Are You Planning?',
  'Kategorie wählen, Leistungen anklicken – Richtwert erscheint sofort. Mehrere Kategorien kombinierbar. Sie können jede Auswahl individuell auf Budget, Ziele und Prioritäten abstimmen. Einzelne Leistungen lassen sich flexibel hinzufügen, austauschen oder weglassen, bis die Konfiguration exakt passt. So entsteht in wenigen Klicks ein persönlicher Leistungsmix als transparente Entscheidungsgrundlage.':
    'Choose a category, select services and see an estimate immediately. Multiple categories can be combined. You can adapt each selection to your budget, goals and priorities, adding, swapping or removing individual services until the configuration fits. In just a few clicks, you get a personal service mix as a transparent basis for your decision.',
  'Angebot anfragen ↗': 'Request Quote ↗',
  'Auswahl zurücksetzen': 'Reset selection',
  'Wählen Sie oben eine Kategorie und Leistungen aus.': 'Choose a category and services above.',
  'zzgl. MwSt.': 'plus VAT',
  Richtwert: 'estimate',
  laufend: 'ongoing',
  Stundensatz: 'Hourly rate',
  'Stundensatz & Tagessatz': 'Hourly Rate & Day Rate',
  'Tagessatz (8h)': 'Day rate (8h)',
  Wochensatz: 'Weekly rate',
  netto: 'net',
  'Der Preisrechner wird aktuell gepflegt. Bitte schauen Sie später wieder vorbei oder kontaktieren Sie mich direkt.':
    'The price calculator is currently being updated. Please check back later or contact me directly.',
  'Für flexible & laufende Zusammenarbeit': 'For Flexible & Ongoing Collaboration',
  'Website & Webdesign': 'Website & Web Design',
  'Google Ads / Paid Search': 'Google Ads / Paid Search',
  'Social Media Marketing': 'Social Media Marketing',
  'E-Mail-Marketing': 'Email Marketing',
  'Branding / Logo / CI': 'Branding / Logo / CI',
  'Print-Design': 'Print Design',
  Fotografie: 'Photography',
  Prozessautomatisierung: 'Process Automation',
  'CRM / ERP-Beratung': 'CRM / ERP Consulting',
  'Strategie-Beratung / Workshops': 'Strategy Consulting / Workshops',
  'Wartung & Pflege': 'Maintenance & Care',
  'Landing Page': 'Landing Page',
  '1 Seite, Conversion-optimiert, responsiv, CMS-Anbindung':
    '1 page, conversion-optimized, responsive, CMS integration',
  'Kleine Website (bis 5 Seiten)': 'Small Website (Up to 5 Pages)',
  'Unternehmensseite, responsiv, SEO-Grundlagen, CMS':
    'Company website, responsive, SEO basics, CMS',
  'Unternehmenswebsite (bis 15 Seiten)': 'Company Website (Up to 15 Pages)',
  'Vollständiger Auftritt, UI/UX-Konzept, Tracking-Setup':
    'Complete presence, UI/UX concept, tracking setup',
  'Onlineshop / E-Commerce': 'Online Shop / E-Commerce',
  'Produktkatalog, Checkout, Zahlungsanbindung, CMS':
    'Product catalog, checkout, payment integration, CMS',
  'Web-App / Kundenportal': 'Web App / Customer Portal',
  'Individuelle Applikation, Nutzerrollen, API-Anbindungen':
    'Custom application, user roles, API integrations',
  'Individuale Applikation, Nutzerrollen, API-Anbindungen':
    'Custom application, user roles, API integrations',
  'Redesign bestehende Website': 'Redesign of an Existing Website',
  'Performance & Core Web Vitals': 'Performance & Core Web Vitals',
  'Ladezeit, technische Optimierung, Lighthouse-Score':
    'Load time, technical optimization, Lighthouse score',
  'SEO-Audit': 'SEO Audit',
  'Technische Analyse, Keyword-Check, Wettbewerbsvergleich, Handlungsempfehlungen':
    'Technical analysis, keyword check, competitor comparison, recommendations',
  'Keyword-Strategie': 'Keyword Strategy',
  'Suchabsichtsanalyse, Themenclustering, Priorisierung':
    'Search intent analysis, topic clustering, prioritization',
  'Technisches SEO': 'Technical SEO',
  'Crawling, Indexierung, Strukturdaten, interne Verlinkung':
    'Crawling, indexing, structured data, internal linking',
  'On-Page-Optimierung': 'On-Page Optimization',
  'Meta-Tags, Überschriften, Content-Anpassung, Bilder':
    'Meta tags, headings, content adjustments, images',
  'Google Business Profile, lokale Citations, Bewertungsmanagement':
    'Google Business Profile, local citations, review management',
  'SEO-Betreuung laufend': 'Ongoing SEO Support',
  'Monatliches Reporting, Anpassungen, neue Inhalte, Linkaufbau':
    'Monthly reporting, adjustments, new content, link building',
  'Kampagnen-Setup': 'Campaign Setup',
  'Kontostruktur, Anzeigengruppen, Keywords, Anzeigentexte, Conversion-Tracking':
    'Account structure, ad groups, keywords, ad copy, conversion tracking',
  'Shopping-Kampagne (E-Commerce)': 'Shopping Campaign (E-Commerce)',
  'Feed-Optimierung, Produktgruppen, Gebotsstrategien':
    'Feed optimization, product groups, bidding strategies',
  'Zielgruppen, Banner-Konzept, Aussteuerung': 'Audiences, banner concept, delivery setup',
  'Kampagnen-Management laufend': 'Ongoing Campaign Management',
  'Optimierung, A/B-Tests, Reporting, Budgetkontrolle':
    'Optimization, A/B tests, reporting, budget control',
  'Audit bestehende Kampagnen': 'Audit of Existing Campaigns',
  'Analyse Struktur, Qualitätsfaktor, Verschwendung, Empfehlungen':
    'Analysis of structure, quality score, wasted spend and recommendations',
  'Strategie & Konzept': 'Strategy & Concept',
  'Plattformwahl, Zielgruppe, Content-Planung, Tonalität':
    'Platform selection, target audience, content planning, tone of voice',
  'Content-Erstellung (monatlich)': 'Content Creation (Monthly)',
  'Texte, Grafiken, Reels-Konzepte – bis 12 Posts/Monat':
    'Copy, graphics and reel concepts, up to 12 posts per month',
  'Kommentare, DMs, Interaktion – bis 5h/Woche':
    'Comments, DMs and interaction, up to 5 hours per week',
  'Kampagnensetup, Targeting, Creatives, Optimierung':
    'Campaign setup, targeting, creatives, optimization',
  'Profil-Setup & Optimierung': 'Profile Setup & Optimization',
  'Biografie, Highlights, erste 9 Posts, Branding':
    'Bio, highlights, first 9 posts, branding',
  'E-Mail-Strategie & Setup': 'Email Strategy & Setup',
  'Tool-Auswahl, Listen-Aufbau, Segmentierung, DSGVO':
    'Tool selection, list building, segmentation, GDPR',
  'Willkommens-Sequenz': 'Welcome Sequence',
  '3–5 automatisierte E-Mails, Copywriting, Design':
    '3-5 automated emails, copywriting, design',
  'Newsletter-Design & Template': 'Newsletter Design & Template',
  'Responsives HTML-Template passend zur CI':
    'Responsive HTML template aligned with the corporate identity',
  'Newsletter-Erstellung laufend': 'Ongoing Newsletter Creation',
  'Bis 2 Newsletter/Monat inkl. Text & Design':
    'Up to 2 newsletters per month including copy and design',
  'Automation & Funnel': 'Automation & Funnel',
  'Lead-Magnet, Nurturing-Sequenz, Trigger-basierte Flows':
    'Lead magnet, nurturing sequence, trigger-based flows',
  '3 Konzepte, 2 Revisionsrunden, Übergabe in allen Formaten':
    '3 concepts, 2 revision rounds, delivery in all formats',
  'Corporate Design komplett': 'Complete Corporate Design',
  'Logo, Farben, Typografie, Bildsprache, CI-Manual':
    'Logo, colors, typography, visual language, CI manual',
  'Modernisierung bestehendes Logo & Design, kein Neustart':
    'Modernization of existing logo and design, no full restart',
  'Positionierung, Zielgruppe, Wettbewerb, Claim-Entwicklung':
    'Positioning, target audience, competitors, claim development',
  'Design-System / Styleguide': 'Design System / Style Guide',
  'Komponentenbibliothek für Web & Print, Figma':
    'Component library for web and print, Figma',
  Visitenkarte: 'Business Card',
  'Vorder- & Rückseite, druckfertig, bis 2 Varianten':
    'Front and back, print-ready, up to 2 variants',
  'Briefpapier & Briefbogen': 'Letterhead & Stationery',
  'DIN A4, druckfertig, Word-Template': 'DIN A4, print-ready, Word template',
  'Flyer / Folder': 'Flyer / Folder',
  'DIN A5 oder A4, 1–4-seitig, inkl. Layoutkonzept':
    'DIN A5 or A4, 1-4 pages, including layout concept',
  'Broschüre / Katalog': 'Brochure / Catalog',
  'Ab 8 Seiten, Layoutkonzept, Satz, druckfertig':
    'From 8 pages, layout concept, typesetting, print-ready',
  'Rollup / Messe-Banner': 'Roll-Up / Trade Fair Banner',
  'Einzelmotiv, druckfertig, inkl. Bildauswahl':
    'Single design, print-ready, including image selection',
  'Präsentation / Pitch Deck': 'Presentation / Pitch Deck',
  'PowerPoint oder Keynote, bis 20 Folien, CI-konform':
    'PowerPoint or Keynote, up to 20 slides, CI-compliant',
  'Business-Portrait (halber Tag)': 'Business Portrait (Half Day)',
  'Bis 4h, 1 Location, 10 bearbeitete Fotos':
    'Up to 4 hours, 1 location, 10 edited photos',
  'Produkt-Fotografie': 'Product Photography',
  'Bis 20 Produkte, weißer Hintergrund + Lifestyle':
    'Up to 20 products, white background plus lifestyle',
  'Event-Fotografie': 'Event Photography',
  'Bis 4h, 50+ bearbeitete Fotos, Lieferung 5 Werktage':
    'Up to 4 hours, 50+ edited photos, delivery in 5 business days',
  'Location-/Imagefotografie': 'Location / Image Photography',
  'Unternehmen, Räumlichkeiten, Team – halber Tag':
    'Company, premises, team, half day',
  'Automatisierungs-Audit': 'Automation Audit',
  'Analyse bestehender Prozesse, Potenziale, Tool-Empfehlung':
    'Analysis of existing processes, potential and tool recommendations',
  'Einzelner Workflow (Make/n8n)': 'Single Workflow (Make/n8n)',
  '1 Automation, z. B. Lead → CRM → E-Mail, inkl. Test':
    '1 automation, e.g. lead to CRM to email, including test',
  'Komplexes Automatisierungsprojekt': 'Complex Automation Project',
  'Mehrere verknüpfte Flows, Fehlerhandling, Dokumentation':
    'Several connected flows, error handling, documentation',
  'Wartung & Monitoring laufend': 'Ongoing Maintenance & Monitoring',
  'Fehlerüberwachung, Anpassungen, Updates': 'Error monitoring, adjustments, updates',
  'KI-gestützte Workflows': 'AI-Supported Workflows',
  'LLM-Integration in bestehende Prozesse (z. B. Claude, GPT)':
    'LLM integration into existing processes, e.g. Claude or GPT',
  'CRM-Auswahl & Konzept': 'CRM Selection & Concept',
  'Anforderungsanalyse, Tool-Vergleich, Empfehlung':
    'Requirements analysis, tool comparison, recommendation',
  'CRM-Implementierung (HubSpot/Salesforce)': 'CRM Implementation (HubSpot/Salesforce)',
  'Setup, Felder, Pipelines, Rollen, Datenmigration':
    'Setup, fields, pipelines, roles, data migration',
  'ZOHO-Implementierung': 'ZOHO Implementation',
  'CRM, Mail, Projects oder Suite – Setup & Schulung':
    'CRM, Mail, Projects or Suite, setup and training',
  'SAP-Beratung / VC': 'SAP Consulting / VC',
  'Prozessanalyse, Konfiguration, Reporting, SAP Visual Composer':
    'Process analysis, configuration, reporting, SAP Visual Composer',
  'CRM-Schulung Team': 'CRM Team Training',
  'Halbtag vor Ort oder remote, bis 10 Personen':
    'Half day on-site or remote, up to 10 people',
  'CRM-Betreuung laufend': 'Ongoing CRM Support',
  'Pflege, neue Felder, Berichte, Nutzer-Support':
    'Maintenance, new fields, reports, user support',
  'Digital-Strategie Workshop (halber Tag)': 'Digital Strategy Workshop (Half Day)',
  'Ist-Analyse, Ziele, Maßnahmenplan – bis 8 Personen':
    'Current-state analysis, goals, action plan, up to 8 people',
  'Digital-Strategie Workshop (ganzer Tag)': 'Digital Strategy Workshop (Full Day)',
  'Vertiefung inkl. Roadmap & Präsentation der Ergebnisse':
    'Deep dive including roadmap and presentation of results',
  'Marketingplan-Entwicklung': 'Marketing Plan Development',
  'Jahresplan, Kanalwahl, Budget, KPIs, Redaktionskalender':
    'Annual plan, channel selection, budget, KPIs, editorial calendar',
  'Wettbewerbs- & Marktanalyse': 'Competitor & Market Analysis',
  'Desk Research, Positionierungsvergleich, Handlungsfelder':
    'Desk research, positioning comparison, action areas',
  'Retainer-Beratung laufend': 'Ongoing Retainer Consulting',
  'Fester monatlicher Kontingent für strategische Fragen & Reviews':
    'Fixed monthly allowance for strategic questions and reviews',
  'Website-Wartung Basic': 'Website Maintenance Basic',
  'Updates, Backups, Sicherheits-Monitoring, 1h Support':
    'Updates, backups, security monitoring, 1h support',
  'Website-Wartung Professional': 'Website Maintenance Professional',
  'Updates, Backups, Monitoring, 3h Inhaltspflege, Reporting':
    'Updates, backups, monitoring, 3h content maintenance, reporting',
  'Server-Konfiguration, SSL, Performance-Monitoring, Notfallplan':
    'Server configuration, SSL, performance monitoring, emergency plan',
  'Content-Pflege laufend': 'Ongoing Content Maintenance',
  'Texte, Bilder, neue Unterseiten – bis 5h/Monat':
    'Copy, images, new subpages, up to 5 hours per month',
  'SEO-Monitoring & Reporting': 'SEO Monitoring & Reporting',
  'Rankings, Traffic, Fehler – monatlicher Bericht':
    'Rankings, traffic, errors, monthly report',
  'Profil: Philipp Bacher - Digital Consultant in Halle':
    'Profile: Philipp Bacher - Digital Consultant in Halle',
  'Über mich': 'About Me',
  'Über 25 Jahre Erfahrung fließen in Lösungen, die Sichtbarkeit aufbauen, Prozesse vereinfachen und nachhaltiges Wachstum ermöglichen.':
    'More than 25 years of experience flow into solutions that build visibility, simplify processes and enable sustainable growth.',
  'Strategie und Umsetzung greifen hier direkt ineinander – Beratung und operative Realisierung aus einer Hand.':
    'Strategy and implementation work directly together here: consulting and operational realization from one source.',
  'Strategie trifft Umsetzung': 'Strategy Meets Implementation',
  'Strategie · Design · Entwicklung': 'Strategy · Design · Development',
  'International gedacht, lokal verankert': 'International Thinking, Locally Grounded',
  'Breite mit Tiefe': 'Breadth With Depth',
  'Direkt und verlässlich': 'Direct and Reliable',
  'Ich bin Philipp Bacher – und mein Ansatz ist einfach: Ich denke strategisch und handle operativ. Für meine Kunden bedeutet das, dass sie nicht zwischen Berater und Umsetzer wählen müssen. Ich bin beides.\n\nSeit 2010 arbeite ich selbstständig für Unternehmen in DACH, Benelux, Hongkong, Malaysia und Indonesien – in den Bereichen Webentwicklung, digitales Marketing, Corporate Design, Vertriebsaufbau und ERP-Beratung. Mein Studium der Betriebswirtschaft (BBA cum laude, Moskau & Groningen) und der Wirtschaftsinformatik (MLU Halle) bildet das analytische Fundament. Was daraus entstanden ist: ein Generalist mit echter Tiefe – und der Fähigkeit, komplexe digitale Projekte von der Strategie bis zur Übergabe zu verantworten.\n\nIch arbeite bevorzugt mit KMUs, die klare Ergebnisse erwarten, keine Umwege brauchen und einen Ansprechpartner schätzen, der mitdenkt – nicht nur ausführt.':
    'I am Philipp Bacher, and my approach is simple: I think strategically and act operationally. For my clients, this means they do not have to choose between consultant and implementer. I am both.\n\nSince 2010 I have worked independently for companies in DACH, Benelux, Hong Kong, Malaysia and Indonesia across web development, digital marketing, corporate design, sales development and ERP consulting. My studies in business administration (BBA cum laude, Moscow & Groningen) and business informatics (MLU Halle) form the analytical foundation. The result is a generalist with real depth and the ability to take responsibility for complex digital projects from strategy through handover.\n\nI prefer working with SMEs that expect clear results, need no detours and value one contact person who thinks along instead of merely executing.',
  'Was ich für Sie leiste': 'What I Do for You',
  'Webdesign, Printmedien und Präsentationen für einen starken Auftritt.':
    'Web design, print media and presentations for a strong presence.',
  'Marketing & Sichtbarkeit': 'Marketing & Visibility',
  'SEO, SEM und Content Creation für Reichweite und Anfragen.':
    'SEO, SEM and content creation for reach and inquiries.',
  'Branding & Identity': 'Branding & Identity',
  'CI, Logo-Entwicklung und Markenstrategie für klare Wiedererkennung.':
    'CI, logo design and brand strategy for clear recognition.',
  'Marketing-Cases mit nachvollziehbarer Wirkung': 'Marketing Cases With Traceable Impact',
  'Marketing-Projekte mit Fokus auf SEO, SEM und Leads':
    'Marketing Projects Focused on SEO, SEM and Leads',
  'Strategie, Umsetzung und Optimierung in einem datengetriebenen Prozess mit klaren Leistungskennzahlen.':
    'Strategy, implementation and optimization in a data-driven process with clear performance indicators.',
  'Die Cases folgen einer klaren Logik: Ziel, Kanalmix, Maßnahmen, Ergebnis. So bleibt sichtbar, welche Entscheidung welchen Effekt erzeugt hat.':
    'The cases follow a clear logic: goal, channel mix, measures, result. This keeps visible which decision created which effect.',
  'Nicht nur Reichweite zählen.': 'Reach Alone Does Not Count.',
  'Relevante Leads und stabile Performance zählen.': 'Relevant leads and stable performance count.',
  'Der Fokus liegt auf Wirkung und klaren Entscheidungsgrundlagen.':
    'The focus is on impact and clear decision-making foundations.',
  'Marketing-Ziele in einen Plan übersetzen': 'Translate Marketing Goals Into a Plan',
  'Gemeinsam priorisieren wir Kanäle, Budget und Quick Wins in einem kompakten Kickoff.':
    'Together, we prioritize channels, budget and quick wins in a compact kickoff.',
  'Webseiten und digitale Erlebnisse mit Fokus auf UX und Conversion':
    'Websites and Digital Experiences Focused on UX and Conversion',
  'Von Struktur und Interface bis Technik und Performance: jedes Projekt verbindet Designqualität mit klarer Funktion.':
    'From structure and interface to technology and performance: every project combines design quality with clear function.',
  'Jeder Case zeigt Ausgangslage, Konzept, UI-Umsetzung und das messbare Ergebnis. So wird nachvollziehbar, warum Designentscheidungen getroffen wurden.':
    'Each case shows starting point, concept, UI implementation and measurable result, making design decisions easy to understand.',
  'Design ist nicht Dekoration.': 'Design Is Not Decoration.',
  'Design ist ein System für Orientierung und Handlung.':
    'Design is a system for orientation and action.',
  'Typische Schwerpunkte in Web Design- und Umsetzungsprojekten.':
    'Typical focus areas in web design and implementation projects.',
  'Klare Positionierung, moderne Gestaltung und konsistente Nutzerführung.':
    'Clear positioning, modern design and consistent user guidance.',
  'Conversion-orientierte Seitenstrukturen für Kampagnen und Lead-Generierung.':
    'Conversion-oriented page structures for campaigns and lead generation.',
  'Saubere Umsetzung für Desktop, Tablet und Mobile mit konsistentem Verhalten.':
    'Clean implementation for desktop, tablet and mobile with consistent behavior.',
  'Optimierung für Ladezeit, Stabilität und Interaktion zur Verbesserung der User Experience.':
    'Optimization for loading time, stability and interaction to improve the user experience.',
  'Unternehmerisch statt in Einzelleistungen gedacht: Bei Trinkwasser-Verband.de wurde nicht nur eine Website gebaut, sondern Website, Lead-Erfassung und Follow-up-Prozess als ein zusammenhängendes System geplant.':
    'Business-minded instead of thinking in isolated services: for Trinkwasser-Verband.de, not just a website was built. Website, lead capture and follow-up process were planned as one connected system.',
  'Jedes Projekt startet mit einer Ist-Analyse bestehender Kanäle und Prozesse — bei MEDIFISCH.de führte das dazu, dass Werbung von META Marketingkanälen eingestellt wurden, weil sie keine messbaren Leads brachten.':
    'Every project starts with an analysis of existing channels and processes. For MEDIFISCH.de, this showed that META advertising should be stopped because it did not generate measurable leads.',
  'Bestehende Strategien werden geprüft, bevor neue aufgesetzt werden: Ein Website-Relaunch beginnt grundsätzlich mit einer Analyse der aktuellen SEO-Rankings und Nutzerpfade, nicht mit einem Neustart bei null.':
    'Existing strategies are reviewed before new ones are created: a website relaunch always starts with an analysis of current SEO rankings and user paths, not with a restart from zero.',
  'Erfolg wird an Anfragen und Abschlüssen gemessen, nicht an Klickzahlen — deshalb ist eine Marktanalyse fester Bestandteil jedes Projekts: ein monatliches Reporting mit den Kennzahlen, die tatsächlich zu Kundenkontakt führen (Formular-Absendungen, Anrufe), statt reinem Traffic.':
    'Success is measured by inquiries and conversions, not click counts. That is why market analysis is a fixed part of every project: monthly reporting focuses on metrics that actually lead to customer contact, such as form submissions and calls, rather than traffic alone.',
  'Websites entstehen auf einer skalierbaren technischen Basis (Next.js, Payload CMS) — neue Seiten, Funktionen oder ein Onlineshop lassen sich später ergänzen, ohne die Seite komplett neu zu bauen. Nachvollziehbar am Beispiel von Soulmating.de.':
    'Websites are built on a scalable technical foundation (Next.js, Payload CMS), so new pages, functions or an online shop can be added later without rebuilding the entire site. Soulmating.de is one example.',
  'Ein Ansprechpartner, keine Weiterleitungsschleifen: Anfragen werden direkt und persönlich beantwortet, das kostenlose Erstgespräch klärt Umfang und Budget meist innerhalb eines Termins statt mehrerer Abstimmungsrunden.':
    'One point of contact, no handoff loops: inquiries are answered directly and personally, and the free initial consultation usually clarifies scope and budget in one appointment instead of several coordination rounds.',
  'Kampagnen, Websites und Apps, die messbare Reichweite, Leads und Umsatz liefern.':
    'Campaigns, websites and apps that deliver measurable reach, leads and revenue.',
  'Persönlicher Ansprechpartner': 'Personal Point of Contact',
  'Kein Agentur-Wasserkopf, kein Wischi-Waschi — direkte, fundierte Beratung und Umsetzung.':
    'No bloated agency structure, no vague talk: direct, well-founded consulting and implementation.',
  'Schnelle Entscheidungen, klare Prozesse, kein unnötiger Overhead.':
    'Fast decisions, clear processes and no unnecessary overhead.',
  'SEO, SEA, Social Ads, Automatisierung — Launches in verschiedenen Branchen und 6 Ländern.':
    'SEO, SEA, social ads and automation: launches across different industries and six countries.',
  'Digitale Plattform für Buchung und Bewerbung zu non-verbalen Speed-Dating-Communication Trainings mit intuitiver Nutzerführung und klarer Kommunikation des Angebots.':
    'Digital platform for booking and applying to non-verbal speed-dating communication trainings, with intuitive user guidance and clear communication of the offer.',
  'Ergebnisse über mehrere Marketing-Cases': 'Results Across Multiple Marketing Cases',
  'Suchmaschinenoptimierung sorgt dafür, dass Unternehmen genau dort gefunden werden, wo Entscheidungen entstehen. Mit klarer Struktur, relevanten Inhalten und einer technisch sauberen Basis wird aus Präsenz messbare Nachfrage.':
    'Search engine optimization ensures that companies are found exactly where decisions are made. With clear structure, relevant content and a technically clean foundation, presence becomes measurable demand.',
  'Klar strukturiert, hochwertig umgesetzt und immer mit Blick auf Wirkung und Zielgruppe. Print ist kein Auslaufmodell – sondern ein präzises Medium für starke Markenauftritte.':
    'Clearly structured, implemented to a high standard and always focused on impact and target audience. Print is not outdated; it is a precise medium for strong brand presences.',
  'Ich entwickle Präsentationsdesigns, die Inhalte strukturieren, Kernaussagen schärfen und komplexe Themen verständlich machen. Dabei verbindet sich visuelle Klarheit mit strategischem Storytelling – damit nicht nur gezeigt, sondern überzeugt wird. Ob Investoren-Pitch, Unternehmenspräsentation oder Keynote: Der Fokus liegt immer auf einer klaren Linie, starken Aussagen und einer visuellen Sprache, die im Kopf bleibt.':
    'I develop presentation designs that structure content, sharpen key messages and make complex topics understandable. Visual clarity combines with strategic storytelling so content does not just get shown, but convinces. Whether investor pitch, company presentation or keynote, the focus is always on a clear line, strong statements and a visual language that sticks.',
  'Für Presentations, die Sicherheit geben und den Fokus auf das Wesentliche lenken.':
    'For presentations that create confidence and direct focus to what matters.',
  'Ein gutes Logo entsteht nicht aus Geschmack, sondern aus Klarheit, Strategie und Verständnis für Marke, Zielgruppe und Positionierung.':
    'A good logo does not come from taste, but from clarity, strategy and understanding of brand, target audience and positioning.',
  'Diese Auswahl zeigt Logo Designen aus Kundenprojekten - von reduzierten Zeichen bis zu flexiblen Varianten für unterschiedliche Anwendungskontexte.':
    'This selection shows logo designs from client projects, from reduced marks to flexible variants for different application contexts.',
  'Markenwirkung entscheidet in vielen Märkten bereits vor dem ersten Gespräch über Vertrauen und Relevanz. Die Referenzen zeigen, wie konsistente Gestaltung und klare Positionierung die Wahrnehmung von Kompetenz steigern. Ein einheitlicher Auftritt reduziert Erklärungsaufwand und macht Angebote schneller vergleichbar. Das stärkt Ihre Marktposition und verbessert die Qualität eingehender Anfragen nachhaltig.':
    'In many markets, brand impact shapes trust and relevance before the first conversation. The references show how consistent design and clear positioning increase the perception of competence. A unified presence reduces explanation effort and makes offers easier to compare. This strengthens your market position and sustainably improves the quality of incoming inquiries.',
  'Migration, Onpage-Optimierung und Content-Struktur zur Stabilisierung von Rankings.':
    'Migration, on-page optimization and content structure to stabilize rankings.',
  'Anzeigenstruktur, Suchintentionen und Budgetsteuerung für bessere Kosten-Umsatz-Relation.':
    'Ad structure, search intent and budget control for a better cost-revenue ratio.',
  'Kampagnen, Landingpages und Tracking zu einem performanten Akquise-Setup verbunden.':
    'Campaigns, landing pages and tracking connected into a high-performing acquisition setup.',
  'Ein Auszug zentraler Kennzahlen aus SEO-, SEM- und Lead-Projekten.':
    'A selection of key metrics from SEO, SEM and lead projects.',
  'durch Kampagnenrestrukturierung': 'through campaign restructuring',
  'durch Lead-Funnel-Optimierung': 'through lead funnel optimization',
  'Was Marketing-Projekte hier auszeichnet': 'What Sets These Marketing Projects Apart',
  'Branding-Cases, die Strategie und Gestaltung verbinden und eine klare Wiedererkennbarkeit schaffen.':
    'Branding cases that connect strategy and design and create clear recognition.',
  'Branding mit klarer Identität': 'Branding With a Clear Identity',
  'Die Cases zeigen, wie aus Positionierung, Tonalität und Design eine konsistente Markenwahrnehmung entsteht - vom ersten Logo bis zur Anwendung im Alltag.':
    'The cases show how positioning, tonality and design create a consistent brand perception, from the first logo to everyday application.',
  'Die Marke definiert Haltung, Nutzen und Wiedererkennbarkeit. Sie macht sichtbar, wofür ein Unternehmen steht, welche Zielgruppen es anspricht und warum Vertrauen entstehen soll.':
    'The brand defines attitude, value and recognition. It makes visible what a company stands for, which audiences it addresses and why trust should emerge.',
  'Marke ist ein System. Nicht nur ein einzelnes Zeichen.':
    'A Brand Is a System. Not Just a Single Mark.',
  'Marke ist ein System.\nNicht nur ein einzelnes Zeichen.':
    'A Brand Is a System.\nNot Just a Single Mark.',
  'Marke, Logo und Branding': 'Brand, Logo and Branding',
  'MARKE, LOGO UND BRANDING': 'BRAND, LOGO AND BRANDING',
  'Drei Bausteine, die zusammen aus einem Auftritt ein wiedererkennbares Markensystem machen.':
    'Three building blocks that turn a presence into a recognizable brand system.',
  Marke: 'Brand',
  'Das Logo übersetzt den Markenkern in ein prägnantes Zeichen. Entscheidend sind Klarheit, Skalierbarkeit und Varianten, die digital, gedruckt und im Alltag funktionieren.':
    'The logo translates the brand core into a concise mark. What matters is clarity, scalability and variants that work digitally, in print and in everyday use.',
  'Branding verbindet Logo, Farben, Typografie, Bildsprache und Tonalität zu einem System. So bleibt die Marke über Website, Sales und Kommunikation konsistent erlebbar.':
    'Branding connects logo, colors, typography, imagery and tonality into one system. This keeps the brand consistent across website, sales and communication.',
  'Ausgewählte Projektarten aus Markenaufbau und Weiterentwicklung.':
    'Selected project types from brand building and development.',
  'Leistungsfelder im Branding': 'Service Fields in Branding',
  'Marke & Designsystem': 'Brand & Design System',
  'Positionierung, Zielgruppenverständnis und zentrale Botschaften werden so verdichtet, dass die Marke intern klar steuerbar und extern schneller verständlich wird.':
    'Positioning, audience understanding and core messages are condensed so the brand can be managed clearly internally and understood faster externally.',
  'Aus einer klaren Idee entsteht ein flexibles Zeichensystem mit Varianten für Website, Social Media, Print und Presentations.':
    'A clear idea becomes a flexible sign system with variants for website, social media, print and presentations.',
  'Aus einer klaren Idee entsteht ein flexibles Zeichensystem mit Varianten für Website, Social Media, Print und Präsentationen.':
    'A clear idea becomes a flexible sign system with variants for website, social media, print and presentations.',
  'Logo-Erstellung': 'Logo Creation',
  'Erstellung von Logos & Icons': 'Creation of logos and icons',
  'Farbwelt, Typografie, Gestaltungsregeln und Tonalität werden zu einem konsistenten Auftritt verbunden, der im Alltag zuverlässig funktioniert.':
    'Color system, typography, design rules and tonality are connected into a consistent presence that works reliably in daily use.',
  'Referenzen umgesetzter Aufträge': 'References From Completed Projects',
  'Visuelle Leitplanken für konsistente Markenwahrnehmung':
    'Visual Guidelines for Consistent Brand Perception',
  'Ein editierbarer Bereich für Logo, Farbpalette, Typografie, Gestaltungsprinzipien und reale Anwendungen.':
    'An editable area for logo, color palette, typography, design principles and real applications.',
  'Die Marke positioniert sich als präziser, verlässlicher Partner mit klarer Haltung: reduziert im Ausdruck, stark in der Wirkung.':
    'The brand positions itself as a precise, reliable partner with a clear attitude: reduced in expression, strong in impact.',
  'Reduktion Nur Elemente mit klarer Funktion bleiben sichtbar.':
    'Reduction Only elements with a clear function remain visible.',
  'Nur Elemente mit klarer Funktion bleiben sichtbar.':
    'Only elements with a clear function remain visible.',
  'Die wichtigsten Leistungswerte auf einen Blick':
    'The Most Important Performance Values at a Glance',
  'Impact in Zahlen': 'Impact in Numbers',
  'IMPACT IN ZAHLEN': 'IMPACT IN NUMBERS',
  'seit 2003': 'since 2003',
  'SEIT 2003': 'SINCE 2003',
  '+12/Jahr': '+12/year',
  '+12/JAHR': '+12/YEAR',
  '+34 Pkt. Ø': '+34 pts. avg.',
  '+34 PKT. Ø': '+34 PTS. AVG.',
  'Jahre Erfahrung': 'Years of Experience',
  'Digitales Marketing & Web Design seit 2003': 'Digital Marketing & Web Design Since 2003',
  'Digitales Marketing & Web Design since 2003': 'Digital Marketing & Web Design Since 2003',
  Projekte: 'Projects',
  'Performance-Vorsprung auf Mobile & Desktop': 'Performance Advantage on Mobile & Desktop',
  'Ø Conversion-Lift im 1. Jahr nach Relaunch':
    'Average conversion lift in the first year after relaunch',
  'bis Online': 'Until Online',
  '≤4 Wo.': '≤4 wks.',
  'Starter & Business schnell einsatzbereit': 'Starter and Business ready to launch quickly',
  'Kein Overhead, kein Briefing-Loop, kein Team': 'No overhead, no briefing loop, no team layers',
  Direktbetreuung: 'Direct Support',
  persönlich: 'personal',
  Pakete: 'Packages',
  'ab 5.900': 'from 5,900',
  'Von Start-up-Landing-Page bis Enterprise-Relaunch':
    'From Startup Landing Page to Enterprise Relaunch',
  'Jedes Angebot basiert auf einem klaren Leistungsumfang und nachvollziehbarer Aufwandspaketen.':
    'Every offer is based on a clear scope of services and transparent effort packages.',
  'Jedes Angebot basiert auf einem klaren Leistungsumfang und nachvollziehbaren Aufwandspaketen. Sie sehen vor Projektstart, welche Positionen enthalten sind und welche Ergebnisse damit erreicht werden sollen. So entsteht Planungssicherheit statt Kostensprünge im laufenden Prozess. Optionalleistungen werden immer separat ausgewiesen und nur nach Freigabe umgesetzt.':
    'Every offer is based on a clear scope of services and transparent effort packages. Before the project starts, you see which items are included and which results they are meant to achieve. This creates planning security instead of cost jumps during the process. Optional services are always shown separately and only implemented after approval.',
  'Nicht jedes Unternehmen braucht sofort den größten Leistungsumfang. Die Pakete sind deshalb so strukturiert, dass Sie mit einer sinnvollen Basis starten und später gezielt erweitern können. Das reduziert unnötige Anfangsinvestitionen und hält den Fokus auf den nächsten wichtigen Wachstumsschritt. Strategie, Design und technische Umsetzung bleiben dabei aufeinander abgestimmt.':
    'Not every company immediately needs the largest scope. The packages are structured so you can start with a sensible foundation and expand later in a targeted way. This reduces unnecessary initial investment and keeps the focus on the next important growth step. Strategy, design and technical implementation remain aligned.',
  'Preise orientieren sich nicht an austauschbaren Templates, sondern am konkreten Nutzen für Ihr Geschäft. Im Mittelpunkt stehen messbare Wirkung, bessere Sichtbarkeit und höhere Conversion-Chancen. Jede Investition soll sich in der Praxis als Belastung des Budgets, aber auch als Hebel für Umsatz und Markenstärke beweisen. Genau deshalb werden Services priorisiert, bevor sie produziert werden.':
    'Prices are not based on interchangeable templates, but on the concrete value for your business. The focus is measurable impact, better visibility and stronger conversion opportunities. Every investment should prove itself in practice not only as a budget item, but as a lever for revenue and brand strength. That is why services are prioritized before they are produced.',
  'Ideal für kleine Websites und einen schnellen, professionellen Start.':
    'Ideal for small websites and a fast, professional start.',
  'Onepager oder kleine Website': 'One-pager or small website',
  'Individuelles Design-Konzept': 'Custom design concept',
  'Basis SEO Setup': 'Basic SEO setup',
  'Starter anfragen': 'Request Starter',
  'Business anfragen': 'Request Business',
  'Premium anfragen': 'Request Premium',
  Einmalig: 'One-time',
  'Einmalig · zzgl. MwSt. · Richtwert': 'One-time · plus VAT · estimate',
  einmalig: 'one-time',
  projektbasiert: 'project-based',
  Empfohlen: 'Recommended',
  Relaunch: 'Relaunch',
  Komplettdesign: 'Complete design',
  Interdisziplinaer: 'Interdisciplinary',
  'UX / UI': 'UX / UI',
  'E-Commerce': 'E-Commerce',
  'Responsive Umsetzung für Mobile': 'Responsive implementation for mobile',
  'Für Unternehmen, die mehr Seiten, Strategie und Conversion-Fokus benötigen.':
    'For companies that need more pages, strategy and conversion focus.',
  'Für Unternehmen, die mehr Seiten und Conversion-Fokus benötigen.':
    'For companies that need more pages and conversion focus.',
  'Bis zu 8 Seiten inkl. Struktur': 'Up to 8 pages including structure',
  'UX-Wireframes + visuelles Design': 'UX wireframes + visual design',
  'Conversion-optimierte CTA-Führung': 'Conversion-optimized CTA guidance',
  'Performance Optimierung': 'Performance optimization',
  'CMS-Einweisung': 'CMS onboarding',
  'Umfassende Lösung für anspruchsvolle Brands mit Wachstumsschwerpunkt.':
    'Comprehensive solution for ambitious brands with a growth focus.',
  'Skalierbare Seitenarchitektur': 'Scalable page architecture',
  'Designsystem + Komponentenbibliothek': 'Design system + component library',
  'Fortgeschrittenes SEO Setup': 'Advanced SEO setup',
  'Tracking + Analytics Setup': 'Tracking + analytics setup',
  'Priorisierter Support': 'Priority support',
  'Feature Vergleich': 'Feature Comparison',
  'Direkter Vergleich der wichtigsten Leistungsmerkmale pro Paket.':
    'Direct comparison of the most important service features per package.',
  Leistung: 'Service',
  'Design individuell statt Template': 'Custom design instead of template',
  Enthalten: 'Included',
  'Nicht enthalten': 'Not included',
  Individuell: 'Individual',
  'Anzahl Seiten': 'Number of pages',
  'bis 8': 'up to 8',
  'frei skalierbar': 'freely scalable',
  'SEO Grundlagen': 'SEO basics',
  'Conversion Strategie': 'Conversion Strategy',
  'Alle Pakete können individuell erweitert oder kombiniert werden.':
    'All packages can be individually expanded or combined.',
  'Kategorie wählen, Services anklicken – Richtwert erscheint sofort. Mehrere Kategorien kombinierbar. Sie können jede Auswahl individuell auf Budget, Ziele und Prioritäten abstimmen. Einzelne Services lassen sich flexibel hinzufügen, austauschen oder weglassen, bis die Konfiguration exakt passt. So entsteht in wenigen Klicks ein persönlicher Leistungsmix als transparente Entscheidungsgrundlage.':
    'Choose a category, select services and see an estimate immediately. Multiple categories can be combined. Every selection can be adjusted to budget, goals and priorities. Individual services can be added, exchanged or removed until the configuration fits exactly. This creates a personal service mix in just a few clicks as a transparent basis for decision-making.',
  Monatlich: 'Monthly',
  'Einmalig Unternehmenswebsite (bis 15 Seiten) Vollständiger Auftritt, UI/UX-Konzept, Tracking-Setup 2.800–5.500 €':
    'One-time Company website (up to 15 pages) Complete presence, UI/UX concept, tracking setup 2,800–5,500 €',
  'Seit 2010 entstehen digitale Projekte für Unternehmen in DACH, Benelux und Asien in den Bereichen Webentwicklung, Marketing, Corporate Design, Vertriebsaufbau und ERP-Beratung. Ein betriebswirtschaftliches und technisches Fundament verbindet sich mit über 25 Jahren Erfahrung zu einem klaren Ansatz: komplexe digitale Vorhaben strukturiert denken und zuverlässig umsetzen.':
    'Since 2010, digital projects have been created for companies in DACH, Benelux and Asia in web development, marketing, corporate design, sales development and ERP consulting. A business and technical foundation combines with more than 25 years of experience into a clear approach: thinking through complex digital initiatives structurally and implementing them reliably.',
  'Der Fokus liegt auf KMUs, die klare Ergebnisse erwarten und einen Partner suchen, der Verantwortung für den gesamten Prozess übernimmt.':
    'The focus is on SMEs that expect clear results and are looking for a partner who takes responsibility for the entire process.',
  'Ich entwickle keine Konzepte, die andere umsetzen müssen. Ich verantworte beides – vom ersten Briefing bis zum fertigen Ergebnis.':
    'I do not develop concepts that others then have to implement. I take responsibility for both, from the first briefing to the finished result.',
  'Erfahrung in sechs Märkten auf vier Kontinenten. Und dennoch: Ich kenne die Realität mittelständischer Unternehmen im deutschsprachigen Raum aus nächster Nähe.':
    'Experience in six markets on four continents. And yet I know the reality of medium-sized companies in German-speaking markets from close range.',
  'Marketing, Design, Entwicklung, Vertrieb, ERP – kein Baukastenprinzip, sondern ein integrierter Blick. Das verhindert Silos und spart Koordinationsaufwand.':
    'Marketing, design, development, sales, ERP: not a modular-box approach, but an integrated view. This prevents silos and saves coordination effort.',
  'Kein Staffelstab, keine Zwischenstufen. Sie sprechen mit mir – und ich liefere.':
    'No handoffs, no intermediate layers. You speak with me, and I deliver.',
  'JAHRE SELBSTSTÄNDIG': 'YEARS SELF-EMPLOYED',
  'INTERNATIONALE MÄRKTE': 'INTERNATIONAL MARKETS',
  'Als Digital Business Partner übernehme ich die Verantwortung für Ihren digitalen Auftritt und Ihre digitalen Prozesse – ganzheitlich, messbar und ohne Schnittstellenverluste. Meine Arbeit bewegt sich in vier eng verzahnten Bereichen:':
    'As a digital business partner, I take responsibility for your digital presence and digital processes: holistic, measurable and without interface losses. My work moves across four closely connected areas:',
  'Von der Konzeption bis zum Launch: nutzerzentrierte Websites und Web-Applikationen mit modernen Technologien (Next.js, Payload CMS, React, TypeScript). Mit dem Blick des Designers, der technischen Präzision des Entwicklers und dem Verständnis des Marketers.':
    'From concept to launch: user-centered websites and web applications with modern technologies (Next.js, Payload CMS, React, TypeScript). With the eye of a designer, the technical precision of a developer and the understanding of a marketer.',
  'Strategisch geplant, messbar ausgewertet. SEO, SEM, Content und Kampagnen – nicht als Einzelmaßnahmen, sondern als integriertes System, das organische Sichtbarkeit und bezahlte Reichweite sinnvoll verbindet.':
    'Strategically planned and measurably evaluated. SEO, SEM, content and campaigns not as isolated measures, but as an integrated system that meaningfully connects organic visibility and paid reach.',
  'SEO-Strategie (technisch & inhaltlich)': 'SEO Strategy (Technical & Content)',
  'Content-Strategie & Redaktionsplanung': 'Content Strategy & Editorial Planning',
  'Marken, die konsistent, wiedererkennbar und glaubwürdig auftreten. Von der Logoentwicklung über das Corporate Design bis zur Umsetzung in digitalen und analogen Medien – mit der vollen Adobe Creative Suite und 15 Jahren gestalterischer Praxis.':
    'Brands that appear consistent, recognizable and credible. From logo development and corporate design to implementation in digital and analog media, using the full Adobe Creative Suite and 15 years of design practice.',
  'Digitale Vertriebssysteme, die qualifizierte Leads generieren und Abschlüsse ermöglichen. Ergänzt durch ERP-Beratung (ZOHO, SAP) und CRM-Integration (Salesforce, HubSpot) für Unternehmen, die ihre internen Prozesse mit dem Marktauftritt synchronisieren wollen.':
    'Digital sales systems that generate qualified leads and enable conversions. Complemented by ERP consulting (ZOHO, SAP) and CRM integration (Salesforce, HubSpot) for companies that want to synchronize internal processes with market presence.',
  'Erfahrung nach Bereichen – von der Strategie bis zur technischen Umsetzung.':
    'Experience by Area - From Strategy to Technical Implementation',
  '2010 – heute Beruflich Selbstständiger Unternehmer & Digital Business Partner Philipp V.G. Bacher Beratung und Umsetzung digitaler Projekte für KMUs in DACH, Benelux, Hongkong, Malaysia und Indonesien. Tätigkeitsbereiche: Webentwicklung, digitales Marketing, Corporate Design, Vertriebsaufbau, ERP-Beratung und Prozessautomatisierung.':
    '2010 - today Professionally self-employed entrepreneur & digital business partner Philipp V.G. Bacher Consulting and implementation of digital projects for SMEs in DACH, Benelux, Hong Kong, Malaysia and Indonesia. Fields of work: web development, digital marketing, corporate design, sales development, ERP consulting and process automation.',
  'Selbstständiger Unternehmer & Digital Business Partner':
    'Self-Employed Entrepreneur & Digital Business Partner',
  Erfahrung: 'Experience',
  Ausbildung: 'Education',
  Werdegang: 'Career Path',
  '2010 – heute': '2010 - today',
  '2019 – 2021': '2019 - 2021',
  '2014 – 2016': '2014 - 2016',
  '2013 – 2014': '2013 - 2014',
  '2008 – 2011': '2008 - 2011',
  'Studium Informatik / Wirtschaftsinformatik': 'Computer Science / Business Informatics Studies',
  'Studium Zahnmedizin': 'Dentistry Studies',
  'Studium Humanmedizin': 'Human Medicine Studies',
  'Medizinstudium – Grundlagen der Naturwissenschaften und systematischen Diagnoselogik.':
    'Medical studies: foundations of natural sciences and systematic diagnostic logic.',
  'Doppelabschluss BBA – Schwerpunkte in internationalem Management, Marketing und strategischem Business Development. Abschluss mit Auszeichnung.':
    'Dual BBA degree with focus areas in international management, marketing and strategic business development. Graduated with distinction.',
  'Jahre selbstständig': 'Years self-employed',
  'Internationale Märkte': 'International markets',
  Sprachen: 'Languages',
  Kompetenzbereiche: 'Areas of expertise',
  'Direkter Ansprechpartner': 'Direct point of contact',
  'Kontrast Lesbarkeit und visuelle Hierarchie werden konsequent priorisiert.':
    'Contrast Readability and visual hierarchy are consistently prioritized.',
  'Lesbarkeit und visuelle Hierarchie werden konsequent priorisiert.':
    'Readability and visual hierarchy are consistently prioritized.',
  'Konsistenz Die gleiche Markenlogik gilt in Web, Social, Sales und Print.':
    'Consistency The same brand logic applies across web, social, sales and print.',
  'Die gleiche Markenlogik gilt in Web, Social, Sales und Print.':
    'The same brand logic applies across web, social, sales and print.',
  'Highlights und CTAs': 'Highlights and CTAs',
  'Backgrounds und Flächen': 'Backgrounds and Surfaces',
  'Einmalig Redesign bestehende Website Überarbeitung Optik & Technik, Inhalte übernommen 1.200–3.500 €':
    'One-time Redesign of existing website Visual and technical revision, content migrated 1,200-3,500 €',
  'Überarbeitung Optik & Technik, Inhalte übernommen':
    'Visual and technical revision, content migrated',
  'Stundensätze gelten für Beratung, Ad-hoc-Aufgaben und Projekte ohne definierten Scope. Bei Projekten mit klarem Umfang arbeite ich grundsätzlich auf Festpreisbasis – transparenter für Sie, planbarer für beide Seiten.':
    'Hourly rates apply to consulting, ad-hoc tasks and projects without a defined scope. For projects with a clear scope, I generally work on a fixed-price basis: more transparent for you and easier to plan for both sides.',
  Beruflich: 'Professionally',
  'Beratung und Umsetzung digitaler Projekte für KMUs in DACH, Benelux, Hongkong, Malaysia und Indonesien. Tätigkeitsbereiche: Webentwicklung, digitales Marketing, Corporate Design, Vertriebsaufbau, ERP-Beratung und Prozessautomatisierung.':
    'Consulting and implementation of digital projects for SMEs in DACH, Benelux, Hong Kong, Malaysia and Indonesia. Fields of work: web development, digital marketing, corporate design, sales development, ERP consulting and process automation.',
  'Ausbildung Studium Informatik / Wirtschaftsinformatik':
    'Education Computer Science / Business Informatics Studies',
  'Vertiefung der technischen und analytischen Grundlagen im Bereich Informatik und Wirtschaftsinformatik.':
    'Deepening of technical and analytical foundations in computer science and business informatics.',
  'Ausbildung Studium Zahnmedizin': 'Education Dentistry Studies',
  'Studium der Zahnmedizin mit Fokus auf naturwissenschaftliche Grundlagen und analytisches Denken.':
    'Dentistry studies focused on scientific foundations and analytical thinking.',
  'Strukturiert. Relevanzgetrieben. Nachhaltig wirksam.':
    'Structured. Relevance-Driven. Sustainably Effective.',
  'Aufmerksamkeit im entscheidenden Moment': 'Attention at the Decisive Moment',
  'SEM nutzt vorhandene Nachfrage gezielt aus.': 'SEM uses existing demand with precision.',
  'Im Fokus steht nicht Reichweite, sondern Relevanz – genau die Menschen zu erreichen, die bereits nach einer Lösung suchen.':
    'The focus is not reach, but relevance: reaching exactly the people already looking for a solution.',
  'Durch strukturierte Kampagnen, klare Botschaften und optimierte Zielseiten entsteht aus Sichtbarkeit eine konkrete Handlung.':
    'Structured campaigns, clear messages and optimized landing pages turn visibility into concrete action.',
  'Content schafft Bedeutung': 'Content Creates Meaning',
  'Wirkungsvolle Inhalte entstehen aus Klarheit, Struktur und einer bewussten Ausrichtung.':
    'Effective content comes from clarity, structure and deliberate alignment.',
  'Jeder Beitrag trägt dazu bei, Aufmerksamkeit in Relevanz zu verwandeln und eine starke, konsistente Markenwahrnehmung aufzubauen.':
    'Every piece helps turn attention into relevance and build a strong, consistent brand perception.',
  'Guter Content entsteht aus Strategie, Präzision und dem Anspruch, Wirkung gezielt zu gestalten.':
    'Good content comes from strategy, precision and the ambition to shape impact deliberately.',
  // WordPress-Agentur page (/wordpress-agentur, /en/wordpress-agency)
  'WordPress-Agentur': 'WordPress Agency',
  'Termin buchen': 'Book Appointment',
  // WordPress-Agentur page: process (consultingOverview) + services grid
  'So läuft die Zusammenarbeit an Ihrem WordPress-Projekt': 'How We Work Together on Your WordPress Project',
  'Transparent, strukturiert und mit klarem nächsten Schritt: jede Phase baut auf der vorherigen auf.':
    'Transparent, structured and with a clear next step: each phase builds on the last.',
  'Analyse & Planung': 'Analysis & Planning',
  'Fundament für eine stabile Umsetzung': 'The foundation for a stable implementation',
  'Bestehende Installation, Anforderungen und Ziele werden geklärt':
    'Clarifying the existing installation, requirements and goals',
  'Zu Beginn wird geprüft, was bereits vorhanden ist - Plugins, Theme, Performance, Sicherheit - und was das Projekt konkret braucht. So entsteht ein realistischer Plan statt Rätselraten.':
    "At the start, we check what's already there - plugins, theme, performance, security - and what the project actually needs. That produces a realistic plan instead of guesswork.",
  Umsetzung: 'Implementation',
  'Sauber entwickelt, gründlich getestet': 'Cleanly built, thoroughly tested',
  'Umsetzung in klaren Etappen': 'Implementation in clear stages',
  'Konzept & technische Planung': 'Concept & Technical Planning',
  'Funktionsumfang, Datenstruktur und Schnittstellen werden festgelegt, bevor der erste Code entsteht.':
    'Feature scope, data structure and integrations are defined before the first line of code is written.',
  Entwicklung: 'Development',
  'Individuelle Plugins, WooCommerce-Einrichtung oder -Anpassungen werden sauber dokumentiert umgesetzt.':
    'Custom plugins, WooCommerce setup or customizations are implemented and properly documented.',
  Testphase: 'Testing',
  'Funktionen, Performance und Sicherheit werden vor dem Go-live geprüft, damit es keine Überraschungen gibt.':
    'Functionality, performance and security are tested before go-live, so there are no surprises.',
  'Go-live': 'Go-Live',
  'Der Wechsel auf die neue oder überarbeitete Umgebung erfolgt kontrolliert und mit Rückfallebene.':
    'The switch to the new or updated environment happens in a controlled way, with a fallback in place.',
  'Laufende Betreuung': 'Ongoing Support',
  'Damit es dabei bleibt': 'To keep it that way',
  'Nach dem Launch sorgen Updates, Backups und Monitoring dafür, dass die Seite stabil und sicher bleibt':
    'After launch, updates, backups and monitoring keep the site stable and secure',
  'Leistungen im Überblick': 'Services at a Glance',
  'Von der individuellen Plugin-Entwicklung bis zur laufenden Betreuung - modular buchbar, je nach Bedarf.':
    'From custom plugin development to ongoing support - modular, booked as needed.',
  'Individuelle Plugins': 'Custom Plugins',
  'Maßgeschneiderte Funktionen, die Standard-Plugins nicht abdecken - dokumentiert und wartbar.':
    "Tailored functionality that off-the-shelf plugins don't cover - documented and maintainable.",
  'WooCommerce-Setup & Anpassungen': 'WooCommerce Setup & Customization',
  'Produktkatalog, Zahlungsanbindung, Checkout-Optimierung und individuelle Erweiterungen.':
    'Product catalog, payment integration, checkout optimization and custom extensions.',
  'Theme-Anpassungen': 'Theme Customization',
  'Bestehende oder neue Themes werden sauber angepasst, ohne unnötigen Plugin-Ballast.':
    'Existing or new themes are cleanly customized, without unnecessary plugin bloat.',
  'Betrieb & Sicherheit': 'Operations & Security',
  'Updates & Backups': 'Updates & Backups',
  'Regelmäßige, geprüfte Updates von Core, Theme und Plugins inklusive Backup-Strategie.':
    'Regular, tested updates to core, theme and plugins, including a backup strategy.',
  'Sicherheits-Monitoring': 'Security Monitoring',
  'Überwachung auf verdächtige Aktivitäten und Absicherung von Login und Dateizugriffen.':
    'Monitoring for suspicious activity and securing login and file access.',
  'Performance-Optimierung': 'Performance Optimization',
  'Ladezeiten, Datenbank und Caching werden geprüft und gezielt verbessert.':
    'Load times, database and caching are reviewed and specifically improved.',
  'WordPress-Entwicklung, die Sicherheit, Performance und Wartbarkeit systematisch verbindet.':
    'WordPress development that systematically combines security, performance and maintainability.',
  'Individuelle Plugins, WooCommerce-Shops und laufende Betreuung sorgen dafür, dass WordPress-Projekte stabil, aktuell und startklar für Wachstum bleiben. Statt Insellösungen entsteht ein System, das technisch sauber gepflegt wird und sich zuverlässig weiterentwickeln lässt.':
    'Custom plugins, WooCommerce shops and ongoing support keep WordPress projects stable, up to date and ready to grow. Instead of one-off fixes, you get a system that is properly maintained and can evolve reliably.',
  'ENTWICKELT MIT BEWÄHRTEN WORDPRESS- & WOOCOMMERCE-TECHNOLOGIEN':
    'BUILT WITH PROVEN WORDPRESS & WOOCOMMERCE TECHNOLOGIES',
  'Weniger Wartungsaufwand. Mehr WordPress-Stabilität.': 'Less Maintenance Effort. More WordPress Stability.',
  'Eine WordPress- oder WooCommerce-Seite bleibt nur dann zuverlässig, wenn Plugins, Theme und Core sauber aufeinander abgestimmt sind und regelmäßig gepflegt werden. Individuelle Funktionen werden als eigene, dokumentierte Plugins umgesetzt statt als provisorische Codeschnipsel - das hält die Seite auch nach Updates stabil und nachvollziehbar.\nGenauso wichtig ist der Betrieb danach: Updates, Backups und Sicherheits-Monitoring laufen im Hintergrund, sodass Ausfälle und Sicherheitsrisiken früh erkannt statt erst im Ernstfall bemerkt werden. So bleibt mehr Zeit fürs Kerngeschäft, während die technische Basis zuverlässig mitwächst.':
    'A WordPress or WooCommerce site only stays reliable when plugins, theme and core are properly aligned and maintained regularly. Custom functionality is built as its own documented plugin instead of a quick code snippet - so the site stays stable and traceable through future updates.\nWhat happens afterwards matters just as much: updates, backups and security monitoring run in the background, so outages and security risks get caught early instead of during an emergency. That leaves more time for your core business while the technical foundation keeps growing reliably.',
  'Individuelle Plugins, WooCommerce-Betreuung und laufende Wartung sorgen für eine WordPress-Seite, die sicher, aktuell und wartbar bleibt - ohne dass Sie sich selbst darum kümmern müssen.':
    'Custom plugins, WooCommerce support and ongoing maintenance keep a WordPress site secure, current and maintainable - without you having to manage it yourself.',
  'Lassen Sie uns Ihr WordPress-Projekt besprechen': "Let's Discuss Your WordPress Project",
  'In einem kurzen Gespräch klären wir Umfang, Ziele und den passenden nächsten Schritt für Ihre WordPress- oder WooCommerce-Website.':
    'In a short call we clarify scope, goals and the right next step for your WordPress or WooCommerce website.',
  'Häufige Fragen zur WordPress-Agentur': 'Frequently Asked Questions About the WordPress Agency',
  'Antworten zu Plugin-Entwicklung, WooCommerce, Sicherheit, Wartung und laufender Betreuung.':
    'Answers about plugin development, WooCommerce, security, maintenance and ongoing support.',
  'Plugins & WooCommerce': 'Plugins & WooCommerce',
  'Entwickeln Sie individuelle WordPress-Plugins?': 'Do you develop custom WordPress plugins?',
  'Ja, ich entwickle maßgeschneiderte Plugins für Funktionen, die Standardlösungen nicht abdecken - von individuellen Formularen über Schnittstellen bis zu speziellen Workflow-Anpassungen. Der Code wird sauber dokumentiert und wartbar gehalten, damit er auch bei künftigen WordPress-Updates zuverlässig funktioniert.':
    "Yes, I build tailored plugins for functionality that off-the-shelf solutions don't cover - from custom forms to integrations and specific workflow adjustments. The code is documented and kept maintainable, so it keeps working reliably through future WordPress updates.",
  'Übernehmen Sie auch WooCommerce-Shops?': 'Do you also take on WooCommerce shops?',
  'Ja, von der Einrichtung über Zahlungsanbindungen, Produktkatalog und Checkout-Optimierung bis zur laufenden Betreuung. Ziel ist ein Shop, der stabil läuft, sich einfach pflegen lässt und mit dem Sortiment mitwächst.':
    'Yes, from setup through payment integrations, product catalog and checkout optimization to ongoing support. The goal is a shop that runs stably, is easy to maintain and grows with your product range.',
  'Kann eine bestehende WordPress-Seite übernommen und weiterentwickelt werden?':
    'Can an existing WordPress site be taken over and developed further?',
  'Ja, bestehende Installationen werden zunächst technisch geprüft (Plugins, Theme, Performance, Sicherheit) und danach gezielt weiterentwickelt oder schrittweise modernisiert - meist ohne kompletten Neuaufbau.':
    'Yes, existing installations are first reviewed technically (plugins, theme, performance, security) and then developed further or modernized step by step - usually without a complete rebuild.',
  'Arbeiten Sie mit bestimmten Themes oder Page-Buildern?': 'Do you work with specific themes or page builders?',
  'Die Wahl richtet sich nach Projekt und Anforderungen - von schlanken Custom-Themes bis zu etablierten Page-Buildern. Wichtiger als das Werkzeug ist eine saubere, wartbare Umsetzung ohne unnötigen Plugin-Ballast.':
    'The choice depends on the project and requirements - from lean custom themes to established page builders. More important than the tool is a clean, maintainable implementation without unnecessary plugin bloat.',
  'Sicherheit & Wartung': 'Security & Maintenance',
  'Wie sorgen Sie für die Sicherheit von WordPress-Seiten?': 'How do you keep WordPress sites secure?',
  'Dazu gehören regelmäßige Updates von Core, Themes und Plugins, Backups, Absicherung von Login und Dateizugriffen sowie Monitoring auf verdächtige Aktivitäten. So bleibt das Risiko für Hacks und Datenverlust gering.':
    'This includes regular updates to core, themes and plugins, backups, securing login and file access, and monitoring for suspicious activity. That keeps the risk of hacks and data loss low.',
  'Was umfasst laufende Wartung?': 'What does ongoing maintenance include?',
  'Laufende Wartung umfasst Updates, Backups, Performance-Checks, Sicherheitsüberwachung und kleinere Anpassungen. Der genaue Umfang wird individuell festgelegt, je nach Größe und Wichtigkeit der Website.':
    'Ongoing maintenance includes updates, backups, performance checks, security monitoring and minor adjustments. The exact scope is defined individually, based on the size and importance of the website.',
  'Was passiert bei einem WordPress-Update, das Probleme verursacht?':
    'What happens if a WordPress update causes problems?',
  'Updates werden nach Möglichkeit vorab auf einer Testumgebung geprüft. Kommt es dennoch zu Problemen, sorgen aktuelle Backups dafür, dass sich der vorherige Stand schnell wiederherstellen lässt, während der Fehler behoben wird.':
    'Where possible, updates are tested on a staging environment first. If problems occur anyway, up-to-date backups make it possible to quickly restore the previous state while the issue is fixed.',
  'Ablauf & Kosten': 'Process & Pricing',
  'Wie läuft die Zusammenarbeit ab?': 'How does the collaboration work?',
  'Nach einem kurzen Erstgespräch werden Anforderungen und Umfang geklärt. Danach folgen Konzept bzw. technische Planung, Umsetzung, Testphase und Go-Live - bei Bedarf ergänzt durch laufende Betreuung.':
    'After a short initial conversation, requirements and scope are clarified. This is followed by concept or technical planning, implementation, testing and go-live - complemented by ongoing support if needed.',
  'Was kostet eine individuelle Plugin-Entwicklung oder ein WooCommerce-Shop?':
    'What does custom plugin development or a WooCommerce shop cost?',
  'Das hängt stark vom Funktionsumfang ab. Nach einer kurzen Anforderungsklärung erhalten Sie eine transparente Einschätzung, bevor die Umsetzung startet - ohne versteckte Zusatzkosten.':
    'That depends heavily on the scope of functionality. After a short requirements review you get a transparent estimate before implementation starts - with no hidden extra costs.',
  'Bieten Sie feste Wartungspakete an?': 'Do you offer fixed maintenance packages?',
  'Ja, es gibt planbare monatliche Wartungspakete für Updates, Backups und Sicherheits-Monitoring. So bleibt die Website dauerhaft aktuell, ohne dass Sie sich selbst darum kümmern müssen.':
    'Yes, there are predictable monthly maintenance packages for updates, backups and security monitoring. That keeps the website permanently up to date without you having to manage it yourself.',
  'WordPress Agentur fuer KMU': 'WordPress Agency for SMBs',
  'WordPress-Agentur fuer KMU: individuelle Plugins, WooCommerce-Shops, Anpassungen und laufende Betreuung fuer stabile, sichere Websites.':
    'WordPress agency for SMBs: custom plugins, WooCommerce shops, customizations and ongoing support for stable, secure websites.',
}

const STRING_KEYS_TO_SKIP = new Set([
  'alt',
  'backgroundColor',
  'blockName',
  'className',
  'color',
  'createdAt',
  'filename',
  'href',
  'icon',
  'id',
  'mimeType',
  'relationTo',
  'slug',
  'type',
  'updatedAt',
  'url',
])

export function translateStringForLocale(value: string, locale: Locale): string {
  if (locale === 'de') return value
  if (isLocalPath(value)) return localizePathname(value, locale)

  const trimmed = value.trim()
  const normalizedTrimmed = trimmed.replace(/\s+/g, ' ')
  const translated = TRANSLATIONS_DE_EN[trimmed] ?? TRANSLATIONS_DE_EN[normalizedTrimmed]
  if (!translated) {
    let nextValue = value
    const replacements = Object.entries(TRANSLATIONS_DE_EN)
      .filter(([source]) => source.length > 8)
      .sort(([a], [b]) => b.length - a.length)

    for (const [source, target] of replacements) {
      nextValue = nextValue.split(source).join(target)
    }

    return nextValue
  }

  const leading = value.match(/^\s*/)?.[0] ?? ''
  const trailing = value.match(/\s*$/)?.[0] ?? ''
  return `${leading}${translated}${trailing}`
}

function isLocalPath(value: string): boolean {
  if (!value.startsWith('/')) return false
  if (value.startsWith('//')) return false
  if (value.startsWith('/api/')) return false
  if (value.startsWith('/_next/')) return false
  if (/\.[a-z0-9]{2,5}(?:[?#].*)?$/i.test(value)) return false
  return true
}

function localizePossibleInternalPath(value: string, locale: Locale): string {
  if (isLocalPath(value)) return localizePathname(value, locale)
  if (/^(?:https?:)?\/\//i.test(value)) return value
  if (/^(?:mailto|tel):/i.test(value)) return value
  if (value.startsWith('#')) return value
  if (/\.[a-z0-9]{2,5}(?:[?#].*)?$/i.test(value)) return value
  if (!/^[a-z0-9][a-z0-9/_-]*(?:[?#].*)?$/i.test(value)) return value
  return localizePathname(`/${value}`, locale)
}

function isUrlLikeKey(key?: string): boolean {
  return Boolean(key && /(?:url|href|link)$/i.test(key))
}

export function translateValueForLocale<T>(value: T, locale: Locale, key?: string): T {
  if (locale === 'de') return value
  if (typeof value === 'string') {
    if (isUrlLikeKey(key)) return localizePossibleInternalPath(value, locale) as T

    if (key && STRING_KEYS_TO_SKIP.has(key)) {
      return (
        key === 'url' || key === 'href'
          ? localizePossibleInternalPath(value, locale)
          : isLocalPath(value)
            ? localizePathname(value, locale)
            : value
      ) as T
    }
    return translateStringForLocale(value, locale) as T
  }

  if (Array.isArray(value)) {
    return value.map((item) => translateValueForLocale(item, locale)) as T
  }

  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {}
    for (const [entryKey, entryValue] of Object.entries(value)) {
      result[entryKey] = translateValueForLocale(entryValue, locale, entryKey)
    }
    return result as T
  }

  return value
}
