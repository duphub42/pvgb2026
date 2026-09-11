import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Code2, Gauge, LayoutGrid, Search } from 'lucide-react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ObsthofOfferTeaser } from '@/components/ObsthofOfferTeaser'
import { Button } from '@/components/ui/button'
import { absoluteSiteURL, safeJsonLd } from '@/utilities/structuredData'

export const revalidate = false
export const dynamic = 'force-static'

const pagePath = '/leistungen/webdesign'

const focusAreas = [
  {
    icon: LayoutGrid,
    title: 'Struktur & Nutzerführung',
    text: 'Websites werden so aufgebaut, dass Besucher schnell verstehen, was angeboten wird und welcher nächste Schritt sinnvoll ist.',
  },
  {
    icon: Code2,
    title: 'Individuelle Umsetzung',
    text: 'WordPress, Next.js oder passende Systeme werden nicht nach Schema F eingesetzt, sondern passend zu Inhalt, Pflege und Wachstum.',
  },
  {
    icon: Gauge,
    title: 'Performance',
    text: 'Schnelle Ladezeiten, saubere technische Basis und responsive Darstellung gehören von Anfang an zur Umsetzung.',
  },
  {
    icon: Search,
    title: 'Auffindbarkeit',
    text: 'Informationsarchitektur, Metadaten und lokale Suchsignale werden so vorbereitet, dass die Website nicht nur gut aussieht.',
  },
]

export const metadata: Metadata = {
  title: 'Webdesign & Webentwicklung',
  description:
    'Webdesign, WordPress, Next.js und individuelle Website-Systeme für Unternehmen, Praxen, Marken und spezialisierte Branchenangebote.',
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: 'Webdesign & Webentwicklung',
    description:
      'Individuelle Websites mit klarer Struktur, starker Gestaltung, Performance und sinnvoller technischer Basis.',
    url: pagePath,
  },
}

export default function WebdesignLeistungPage() {
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteSiteURL(pagePath)}#webpage`,
    url: absoluteSiteURL(pagePath),
    name: 'Webdesign & Webentwicklung',
    description:
      'Webdesign, WordPress, Next.js und individuelle Website-Systeme für Unternehmen und spezialisierte Branchenangebote.',
    isPartOf: {
      '@id': `${absoluteSiteURL('/')}#website`,
    },
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteSiteURL(pagePath)}#service`,
    name: 'Webdesign & Webentwicklung',
    serviceType: 'Webdesign und Webentwicklung',
    url: absoluteSiteURL(pagePath),
    provider: {
      '@id': `${absoluteSiteURL('/')}#localbusiness`,
    },
  }

  return (
    <article className="page-safe-top bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceJsonLd) }}
      />

      <section className="border-b border-border/60 bg-[linear-gradient(135deg,var(--background),var(--muted))]">
        <div className="container py-16 md:py-20">
          <Breadcrumbs
            items={[
              { label: 'Start', href: '/' },
              { label: 'Leistungen', href: '/leistungen' },
              { label: 'Webdesign' },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Leistungen / Webdesign
              </p>
              <h1 className="hero-headline mt-4 text-hero-display text-balance text-foreground">
                Webdesign und Webentwicklung mit klarer Struktur.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                Websites, die nicht nur gestaltet, sondern als funktionierendes System gedacht
                werden: verständliche Inhalte, saubere Technik, gute Pflegebarkeit und messbare
                Wirkung.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild variant="cta" ctaIcon>
                <Link href="/termin">Projekt besprechen</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/portfolio-webdesign">
                  Webdesign-Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ObsthofOfferTeaser />

      <section className="container py-16 md:py-20">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {focusAreas.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-2xl border border-border/70 bg-card p-6">
                <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                <h2 className="mt-5 type-heading-md text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>
    </article>
  )
}
