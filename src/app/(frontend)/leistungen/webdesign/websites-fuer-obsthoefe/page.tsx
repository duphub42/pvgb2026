import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ExternalLink,
  FileText,
  Leaf,
  Search,
  Smartphone,
  Store,
} from 'lucide-react'

import { PageFaqBox } from '@/components/PageFaqBox'
import { Button } from '@/components/ui/button'
import type { FaqCategory } from '@/components/ui/faq-8.data'
import { absoluteSiteURL, safeJsonLd } from '@/utilities/structuredData'

export const revalidate = false
export const dynamic = 'force-static'

const pagePath = '/leistungen/webdesign/websites-fuer-obsthoefe'

const packages = [
  {
    name: 'Hofstart',
    price: 'ab 2.990 EUR netto',
    description: 'Für kleinere Obsthöfe, Hofläden und saisonale Direktvermarkter.',
    features: [
      'Startseite, Hof, Sortiment, Hofladen und Kontakt',
      'Anpassung an Logo, Farben, Bilder und vorhandene Texte',
      'mobile Optimierung und schnelle Ladezeiten',
      'SEO-Basis für regionale Auffindbarkeit',
      'Impressum und Datenschutz vorbereitet',
    ],
  },
  {
    name: 'Direktvermarkter',
    price: 'ab 4.200 EUR netto',
    description: 'Für Betriebe, die Produkte, Saison und Verkaufsstellen stärker verkaufen wollen.',
    features: [
      'umfangreichere Produkt- und Saisonbereiche',
      'Hofladen, Wochenmärkte und regionale Verkaufsstellen',
      'FAQ- und Content-Struktur für lokale Suchanfragen',
      'Kontakt- oder Anfrageformulare',
      'Google-Unternehmensprofil-Basis und bessere Nutzerführung',
    ],
  },
  {
    name: 'Hofplattform',
    price: 'ab 6.900 EUR netto',
    description: 'Für größere Betriebe mit Erlebnissen, Veranstaltungen oder mehreren Angeboten.',
    features: [
      'individuellere Seiten- und Modulstruktur',
      'Landingpages für Saisonaktionen oder Erlebnisangebote',
      'Blog, Aktuelles oder saisonale Inhaltsplanung',
      'erweiterte SEO- und Conversion-Struktur',
      'laufende Weiterentwicklung nach Bedarf',
    ],
  },
]

const benefits = [
  {
    icon: Store,
    title: 'Hofladen sichtbar machen',
    text: 'Öffnungszeiten, Sortiment, Saison und Anfahrt sind sofort verständlich.',
  },
  {
    icon: Search,
    title: 'Regional gefunden werden',
    text: 'Strukturierte Inhalte helfen bei Suchanfragen nach Obsthof, Hofladen und Produkten in der Nähe.',
  },
  {
    icon: Smartphone,
    title: 'Mobil stark auftreten',
    text: 'Viele Besucher suchen unterwegs. Die Seite ist für Smartphone, Tablet und Desktop ausgelegt.',
  },
  {
    icon: Leaf,
    title: 'Hofgeschichte erzählen',
    text: 'Bilder, Werte und Menschen hinter dem Betrieb schaffen Vertrauen vor dem ersten Besuch.',
  },
]

const processSteps = [
  'Kurzes Erstgespräch und Blick auf euren aktuellen Auftritt',
  'Struktur, Paket und benötigte Inhalte festlegen',
  'Design und Inhalte auf Basis des Obsthof-Systems ausarbeiten',
  'WordPress-Website einrichten, testen und für den Livegang vorbereiten',
  'Übergabe, Pflegeoption und saisonale Weiterentwicklung klären',
]

const obsthofFaqCategories: FaqCategory[] = [
  {
    value: 'angebot',
    label: 'Angebot & Eignung',
    icon: 'BriefcaseBusiness',
    faqs: [
      {
        question: 'Für welche Betriebe ist das Obsthof-Website-Angebot gedacht?',
        answer:
          'Das Angebot richtet sich an Obsthöfe, Hofläden, Direktvermarkter, Plantagenbetriebe, Selbstpflückfelder, Mostereien und landwirtschaftliche Betriebe mit regionalem Verkauf. Besonders sinnvoll ist es, wenn Sortiment, Saison, Öffnungszeiten, Anfahrt und Kontakt verständlich erklärt werden sollen.',
      },
      {
        question: 'Ist das Angebot nur für große Obsthöfe geeignet?',
        answer:
          'Nein. Kleine Höfe profitieren oft besonders, weil Besucher schnell erkennen müssen, wann geöffnet ist, welche Produkte verfügbar sind und wie sie den Hof finden. Der Umfang kann kompakt starten und später um Saisonseiten, Blog, Veranstaltungen oder weitere Verkaufsstellen wachsen.',
      },
      {
        question: 'Warum braucht ein Obsthof eine eigene Website, wenn es schon Instagram oder Google gibt?',
        answer:
          'Instagram und Google-Unternehmensprofil sind hilfreich, ersetzen aber keine eigene Website. Die Website ist die verlässliche Anlaufstelle für Öffnungszeiten, Sortiment, Anfahrt, Saisoninformationen, rechtliche Angaben und Suchmaschineninhalte, die nicht von einer Plattform abhängig sind.',
      },
      {
        question: 'Kann die Website wie moriss.de aufgebaut werden?',
        answer:
          'Ja, moriss.de dient als Referenz für Struktur, Wirkung und typische Inhalte. Die neue Website wird aber an euren Hof, eure Bilder, euer Sortiment, eure Region und eure Ziele angepasst, statt die Referenz einfach zu kopieren.',
      },
      {
        question: 'Eignet sich die Seite auch für Hofläden ohne eigenen Obstbau?',
        answer:
          'Ja. Das System passt auch für Hofläden, regionale Erzeuger, Direktvermarkter und Betriebe mit gemischtem Sortiment. Wichtig ist eine klare Darstellung von Produkten, Öffnungszeiten, Herkunft, Kontakt und Besuchsgründen.',
      },
    ],
  },
  {
    value: 'inhalte',
    label: 'Inhalte & Saison',
    icon: 'LockKeyhole',
    faqs: [
      {
        question: 'Welche Inhalte sollte eine gute Obsthof-Website enthalten?',
        answer:
          'Wichtig sind Hofvorstellung, Sortiment, Saisonkalender, Hofladen, Öffnungszeiten, Anfahrt, Kontakt, aktuelle Hinweise, häufige Fragen und gute Bilder. Je nach Betrieb kommen Selbstpflücke, Veranstaltungen, Rezepte, Wochenmärkte, Verkaufsstellen oder Stellenangebote dazu.',
      },
      {
        question: 'Können Saisonangebote wie Erdbeeren, Kirschen, Äpfel oder Weihnachtsbäume dargestellt werden?',
        answer:
          'Ja. Saisonangebote können als eigene Inhaltsbereiche oder Landingpages aufgebaut werden. So lassen sich aktuelle Produkte, Erntefenster, Preise, Hinweise zur Selbstpflücke und passende Kontaktwege deutlich sichtbarer machen.',
      },
      {
        question: 'Kann ich Öffnungszeiten und aktuelle Hinweise selbst ändern?',
        answer:
          'Ja. Die Website wird so geplant, dass zentrale Inhalte wie Öffnungszeiten, Saisonhinweise, Produkte, Bilder oder kurze Meldungen selbst gepflegt werden können. Auf Wunsch gibt es eine kurze Einführung und eine laufende Betreuung.',
      },
      {
        question: 'Was ist, wenn wir noch keine guten Texte oder Bilder haben?',
        answer:
          'Dann werden Inhalte gemeinsam strukturiert. Bestehende Texte können überarbeitet werden, fehlende Texte entstehen auf Basis eines kurzen Briefings. Für Bilder können vorhandene Fotos genutzt, Bildauswahl unterstützt oder ein separates Fotoshooting eingeplant werden.',
      },
      {
        question: 'Kann ein Flyer oder QR-Code auf die Landingpage verweisen?',
        answer:
          'Ja. Die Landingpage eignet sich gut als Ziel für Flyer, E-Mail-Akquise, QR-Codes oder persönliche Anschreiben. Besucher landen dann direkt auf dem branchenspezifischen Angebot und müssen sich nicht erst durch allgemeine Webdesign-Inhalte klicken.',
      },
    ],
  },
  {
    value: 'technik',
    label: 'Technik & Pflege',
    icon: 'Headphones',
    faqs: [
      {
        question: 'Wird die Obsthof-Website mit WordPress umgesetzt?',
        answer:
          'Ja, dieses Angebot ist auf WordPress ausgelegt. Dadurch lassen sich Inhalte später gut pflegen, erweitern und bei Bedarf mit Funktionen wie Blog, Formularen, Galerien oder saisonalen Landingpages ergänzen.',
      },
      {
        question: 'Ist die Website auf Smartphones gut nutzbar?',
        answer:
          'Ja. Viele Besucher suchen unterwegs nach Öffnungszeiten, Anfahrt oder aktuellen Angeboten. Deshalb wird die Website responsive geplant und auf Smartphone, Tablet und Desktop geprüft.',
      },
      {
        question: 'Wird die Seite für Google optimiert?',
        answer:
          'Die Website erhält eine solide SEO-Basis mit sauberer Struktur, verständlichen Seitentiteln, Meta-Daten, schnellen Ladezeiten, interner Verlinkung und Inhalten für lokale Suchanfragen wie Obsthof, Hofladen, Direktvermarktung oder Selbstpflücke in der Region.',
      },
      {
        question: 'Können Kontaktformulare, Karten oder Newsletter eingebunden werden?',
        answer:
          'Ja. Kontaktformulare, Kartenlinks, Newsletter-Anbindungen, Downloadbereiche oder einfache Anfragewege können integriert werden. Welche Funktionen sinnvoll sind, hängt davon ab, wie Besucher euch erreichen und welche Abläufe intern praktikabel sind.',
      },
      {
        question: 'Übernehmen Sie Wartung, Updates und technische Betreuung?',
        answer:
          'Ja. Nach dem Launch kann die Website laufend betreut werden, etwa mit WordPress-Updates, Sicherheitschecks, Backups, kleinen Inhaltsanpassungen, Monitoring und saisonaler Weiterentwicklung.',
      },
    ],
  },
  {
    value: 'kosten',
    label: 'Kosten & Ablauf',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'Was kostet eine Website für einen Obsthof oder Hofladen?',
        answer:
          'Der Einstieg liegt im Paket Hofstart bei 2.990 EUR netto. Umfangreichere Websites mit mehr Produktbereichen, Saisonseiten, Verkaufsstellen, Formularen oder individuellerer Struktur liegen je nach Paket und Bedarf höher.',
      },
      {
        question: 'Wie lange dauert die Umsetzung?',
        answer:
          'Eine kompakte Obsthof-Website lässt sich meist innerhalb weniger Wochen umsetzen, wenn Inhalte und Entscheidungen zügig vorliegen. Größere Projekte mit vielen Seiten, Textentwicklung, Bildauswahl oder zusätzlichen Funktionen benötigen entsprechend mehr Zeit.',
      },
      {
        question: 'Wie läuft das Projekt konkret ab?',
        answer:
          'Nach einem kurzen Erstgespräch werden Ziele, Struktur, Paket und Inhalte festgelegt. Danach entstehen Design, Seitenaufbau und WordPress-Umsetzung. Vor dem Livegang folgen Prüfung, mobile Optimierung, technische Tests und eine kurze Übergabe.',
      },
      {
        question: 'Muss alles sofort komplett fertig sein?',
        answer:
          'Nein. Häufig ist ein guter Start mit den wichtigsten Seiten sinnvoller als ein zu großes Erstprojekt. Saisonseiten, Blog, Rezepte, Stellenangebote oder zusätzliche Verkaufsbereiche können später ergänzt werden.',
      },
      {
        question: 'Gibt es ein unverbindliches Erstgespräch?',
        answer:
          'Ja. Im Erstgespräch wird geklärt, ob das Angebot zu eurem Betrieb passt, welcher Umfang sinnvoll ist und welche Inhalte für den Start gebraucht werden. Danach kann ein konkretes Angebot erstellt werden.',
      },
    ],
  },
]

const obsthofFaqFallback = {
  categories: obsthofFaqCategories,
  eyebrow: 'FAQ Obsthof-Websites',
  title: 'Häufige Fragen zu Websites für Obsthöfe, Hofläden und Direktvermarkter',
  description:
    'Antworten zu Umfang, Saisoninhalten, WordPress, Pflege, lokaler Sichtbarkeit, Kosten und Projektablauf.',
}

export const metadata: Metadata = {
  title: 'Websites für Obsthöfe, Hofläden und Direktvermarkter',
  description:
    'Spezialisierte WordPress-Websites für Obsthöfe: Hofladen, Sortiment, Saison, Öffnungszeiten, Anfahrt, lokale SEO und Betreuung.',
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: 'Websites für Obsthöfe, Hofläden und Direktvermarkter',
    description:
      'Ein spezialisiertes Website-Angebot für Obsthöfe, Direktvermarkter und landwirtschaftliche Betriebe mit Hofladen.',
    url: pagePath,
    images: [
      {
        url: '/media/moriss-obsthof-showcase.png',
        width: 1453,
        height: 609,
        alt: 'Showcase der Referenzwebsite Moriss Obstplantagen',
      },
    ],
  },
}

export default function ObsthofWebsitesPage() {
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteSiteURL(pagePath)}#webpage`,
    url: absoluteSiteURL(pagePath),
    name: 'Websites für Obsthöfe, Hofläden und Direktvermarkter',
    description:
      'Spezialisierte WordPress-Websites für Obsthöfe mit Hofladen, Sortiment, Saison, Kontakt, Anfahrt und lokaler Auffindbarkeit.',
    isPartOf: {
      '@id': `${absoluteSiteURL('/')}#website`,
    },
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteSiteURL(pagePath)}#service`,
    name: 'Obsthof Website',
    serviceType: 'Webdesign und WordPress-Entwicklung für Obsthöfe',
    description:
      'Individuelle WordPress-Websites für Obsthöfe, Hofläden und Direktvermarkter.',
    provider: {
      '@id': `${absoluteSiteURL('/')}#localbusiness`,
    },
    areaServed: ['Deutschland', 'DACH'].map((name) => ({ '@type': 'Place', name })),
    offers: packages.map((item) => ({
      '@type': 'Offer',
      name: item.name,
      priceCurrency: 'EUR',
      url: absoluteSiteURL(pagePath),
      itemOffered: {
        '@type': 'Service',
        name: item.name,
        description: item.description,
      },
    })),
  }

  return (
    <article className="overflow-visible bg-background pt-[var(--header-height)] text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceJsonLd) }}
      />

      <section className="relative isolate border-b border-border/60 bg-[radial-gradient(circle_at_16%_14%,rgba(24,24,27,0.08),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(113,113,122,0.10),transparent_32%),linear-gradient(135deg,var(--background),var(--muted))]">
        <div className="container grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur">
              <Leaf className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              Spezialangebot für Obsthöfe und Direktvermarkter
            </p>
            <h1 className="hero-headline text-hero-display text-balance text-foreground">
              Websites für Obsthöfe, Hofläden und Direktvermarkter
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
              Moderne WordPress-Websites, die Hof, Sortiment, Saisonangebote, Öffnungszeiten,
              Anfahrt und Kontakt klar sichtbar machen. Entwickelt auf Basis der Moriss-Referenz
              aus dem Obstbau.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="cta" ctaIcon>
                <Link href="/termin">Erstgespräch vereinbaren</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="https://moriss.de" target="_blank" rel="noopener noreferrer">
                  Referenz ansehen
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                WordPress Custom Theme
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                lokale SEO-Basis
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                Pflege optional
              </span>
            </div>
          </div>

          <div className="relative min-w-0 lg:-ml-10 xl:-ml-16">
            <div className="relative w-full max-w-[calc(100vw-2rem)] justify-self-end lg:ml-auto lg:w-[min(760px,100%)] xl:w-[min(840px,100%)]">
              <div className="group/showcase relative">
                <Image
                  src="/media/moriss-obsthof-showcase.png"
                  alt="Showcase der Referenzwebsite Moriss Obstplantagen"
                  width={1453}
                  height={609}
                  priority
                  sizes="(min-width: 1280px) 840px, (min-width: 1024px) 760px, 100vw"
                  className="h-auto w-full cursor-zoom-in transition-transform duration-300 ease-out group-hover/showcase:scale-[1.015]"
                />
                <div
                  className="pointer-events-none absolute right-0 top-1/2 z-30 hidden w-[min(92vw,1040px)] -translate-y-1/2 translate-x-0 scale-95 rounded-2xl border border-border/70 bg-background/92 p-4 opacity-0 shadow-2xl shadow-black/20 backdrop-blur transition duration-200 ease-out group-hover/showcase:translate-x-[-2rem] group-hover/showcase:scale-100 group-hover/showcase:opacity-100 lg:block"
                  aria-hidden="true"
                >
                  <Image
                    src="/media/moriss-obsthof-showcase.png"
                    alt=""
                    width={1453}
                    height={609}
                    sizes="(min-width: 1024px) 1040px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 max-w-xl rounded-2xl border border-border/70 bg-background/80 p-5 shadow-sm backdrop-blur lg:ml-auto">
              <p className="text-sm font-semibold text-foreground">Referenz: moriss.de</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Website-Showcase für Moriss Obstplantagen mit Hofladen, Produkten, Blog, Kontakt,
                Anfahrt und saisonalen Inhalten.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Warum dieses Angebot
            </p>
            <h2 className="mt-4 text-balance type-heading-xl text-foreground md:text-5xl">
              Eine Obsthof-Website muss mehr leisten als eine digitale Visitenkarte.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Kundinnen und Kunden wollen schnell wissen, was gerade verfügbar ist, wann der
              Hofladen geöffnet hat und ob sich der Weg lohnt. Genau darauf ist dieses
              Website-System ausgelegt.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                  <h3 className="mt-5 type-heading-md text-foreground">{item.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{item.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/35 py-20 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Pakete
            </p>
            <h2 className="mt-4 text-balance type-heading-xl text-foreground md:text-5xl">
              Drei Ausbaustufen für unterschiedliche Höfe.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.name}
                className="flex h-full flex-col rounded-2xl border border-border/70 bg-background p-6 shadow-sm"
              >
                <h3 className="type-heading-lg text-foreground">{item.name}</h3>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {item.price}
                </p>
                <p className="mt-4 leading-7 text-muted-foreground">{item.description}</p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-12 py-20 md:py-24 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Vorgehen
          </p>
          <h2 className="mt-4 text-balance type-heading-xl text-foreground md:text-5xl">
            Klarer Ablauf statt Webdesign-Nebel.
          </h2>
          <div className="mt-10 space-y-4">
            {processSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-foreground">
                  {index + 1}
                </span>
                <p className="self-center leading-7 text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm">
          <FileText className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-5 type-heading-lg text-foreground">Flyer in Vorbereitung</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Hier entsteht ein kompakter Überblick zum Website-Angebot für Obsthöfe, Hofläden und
            Direktvermarkter. Der Flyer wird nach Fertigstellung öffentlich als PDF bereitgestellt.
          </p>
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-background/70 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Demnächst verfügbar
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Geplant sind eine kurze Leistungsübersicht, die Moriss-Referenz, Paketinformationen
              und ein direkter Weg zum Erstgespräch.
            </p>
          </div>
        </aside>
      </section>

      <PageFaqBox fallback={obsthofFaqFallback} />

      <section className="container pb-20 md:pb-24">
        <div className="rounded-3xl border border-border/70 bg-foreground p-8 text-background md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-background/75">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Erstgespräch
              </p>
              <h2 className="mt-4 text-balance type-heading-xl text-background md:text-5xl">
                Obsthof-Website besprechen
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-background/75">
                In 20 Minuten klären wir, ob das System zu eurem Hof passt, welche Inhalte
                gebraucht werden und welches Paket sinnvoll ist.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild variant="secondary">
                <Link href="/termin">
                  Termin buchen
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <Link href="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
