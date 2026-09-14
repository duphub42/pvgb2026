import Image from 'next/image'
import Link from 'next/link'
import { Blocks, Code2, LayoutTemplate, ShoppingCart, Store, Wrench } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

const cmsSystems = [
  {
    name: 'WordPress',
    logo: '/webdesign-platforms/wordpress.svg',
    text: 'Websites, redaktionelle Inhalte, Custom Themes und performante Unternehmensseiten.',
  },
  {
    name: 'WooCommerce',
    logo: '/webdesign-platforms/woocommerce.svg',
    text: 'Shops auf WordPress-Basis, Produktseiten, Checkout und Erweiterungen.',
  },
  {
    name: 'PayloadCMS',
    logo: '/webdesign-platforms/payloadcms.svg',
    text: 'Headless CMS, eigene Datenmodelle und flexible redaktionelle Oberflächen.',
  },
  {
    name: 'Shopify',
    logo: '/webdesign-platforms/shopify.svg',
    text: 'Schnelle Shop-Projekte, Theme-Anpassungen, Landingpages und Conversion-Flows.',
  },
  {
    name: 'Shopware',
    logo: '/webdesign-platforms/shopware.svg',
    text: 'E-Commerce-Auftritte mit klaren Kategorien, Produktwelten und Systemlogik.',
  },
  {
    name: 'Magento',
    text: 'Skalierbare Commerce-Strukturen, Produktkataloge und komplexere Shop-Prozesse.',
  },
  {
    name: 'Webflow',
    logo: '/webdesign-platforms/webflow.svg',
    text: 'Visuell starke Seiten, schnelle Prototypen und CMS-basierte Marketingseiten.',
  },
  {
    name: 'TYPO3',
    logo: '/webdesign-platforms/typo3.svg',
    text: 'Strukturierte Corporate-Websites, Mehrsprachigkeit und umfangreiche Inhaltsmodelle.',
  },
  {
    name: 'Drupal',
    logo: '/webdesign-platforms/drupal.svg',
    text: 'Komplexere Inhaltsarchitekturen, Rollenmodelle und modulare Website-Strukturen.',
  },
  {
    name: 'Joomla',
    logo: '/webdesign-platforms/joomla.svg',
    text: 'Betreuung, Anpassung und Weiterentwicklung bestehender Joomla-Websites.',
  },
]

const techStacks = [
  {
    name: 'React',
    logo: '/webdesign-platforms/react.svg',
    text: 'Interaktive Oberflächen, Komponenten, Dashboards und dynamische Frontends.',
  },
  {
    name: 'Next.js',
    logo: '/webdesign-platforms/nextjs.svg',
    text: 'Performante Websites, App-Router-Strukturen, SEO und moderne Webanwendungen.',
  },
  {
    name: 'TypeScript',
    logo: '/webdesign-platforms/typescript.svg',
    text: 'Robuster Code, klare Datenmodelle und wartbare Komponenten für langfristige Projekte.',
  },
  {
    name: 'PHP',
    logo: '/webdesign-platforms/php.svg',
    text: 'WordPress-Logik, Backend-Anpassungen, Templates, Schnittstellen und Integrationen.',
  },
  {
    name: 'Laravel',
    logo: '/webdesign-platforms/laravel.svg',
    text: 'Individuelle Webanwendungen, API-Backends und strukturierte Geschäftslogik.',
  },
  {
    name: 'Node.js',
    logo: '/webdesign-platforms/nodejs.svg',
    text: 'APIs, Automationen, Build-Prozesse und serverseitige JavaScript-Anwendungen.',
  },
  {
    name: 'Tailwind CSS',
    logo: '/webdesign-platforms/tailwindcss.svg',
    text: 'Designsysteme, responsive Layouts und präzise UI-Umsetzung ohne Ballast.',
  },
  {
    name: 'Payload CMS',
    logo: '/webdesign-platforms/payloadcms.svg',
    text: 'Headless CMS, eigene Datenmodelle und flexible redaktionelle Oberflächen.',
  },
]

function LogoCard({
  name,
  logo,
  text,
  className,
}: {
  name: string
  logo?: string
  text: string
  className?: string
}) {
  return (
    <article
      className={cn(
        'group flex h-full min-w-0 max-w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-[0_16px_44px_-38px_rgba(0,0,0,0.54)] transition-colors hover:border-foreground/24',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-background">
          {logo ? (
            <Image
              src={logo}
              alt={`${name} Logo`}
              width={34}
              height={34}
              unoptimized
              className="h-8 w-8 object-contain opacity-82 dark:invert"
            />
          ) : (
            <Store className="h-7 w-7 text-foreground/78" aria-hidden="true" />
          )}
        </span>
        <h3 className="min-w-0 text-lg font-semibold leading-tight text-foreground break-words [overflow-wrap:anywhere]">
          {name === 'WooCommerce' ? (
            <>
              Woo-
              <br />
              Commerce
            </>
          ) : (
            name
          )}
        </h3>
      </div>
      <p className="mt-4 min-w-0 text-sm leading-6 text-muted-foreground break-words [overflow-wrap:anywhere]">
        {text}
      </p>
    </article>
  )
}

export function WebdesignPlatformShowcase() {
  return (
    <section className="w-full overflow-visible py-10 md:py-14 xl:py-18">
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-12 px-4 md:px-6 lg:px-8 xl:gap-16">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border/70 bg-foreground px-5 py-8 text-background shadow-[0_24px_72px_-54px_rgba(0,0,0,0.82)] md:px-8 md:py-10 xl:px-10">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_84%_20%,rgba(255,255,255,0.14),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_52%)]"
            aria-hidden="true"
          />

          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-center xl:gap-14">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-background/68">
                <LayoutTemplate className="h-4 w-4" aria-hidden="true" />
                WordPress-Leistungen
              </p>
              <h2
                className="mt-4 text-balance type-heading-xl !text-background md:text-5xl"
                style={{
                  backgroundImage: 'none',
                  WebkitTextFillColor: 'var(--background)',
                }}
              >
                Von der Website bis zum individuellen WordPress-System.
              </h2>
              <p className="mt-5 text-pretty text-base leading-8 text-background/74 md:text-lg">
                Webdesign kann als vollständiges WordPress-Projekt umgesetzt werden: mit Custom
                Theme, Builder-Setup, WooCommerce, Performance-Optimierung, Pflegekonzept und
                editierbaren Inhaltsbereichen für den Alltag.
              </p>
              <div className="mt-7">
                <Button asChild variant="cta" size="cta" ctaIcon>
                  <Link
                    href="/wordpress-agentur"
                    style={{
                      backgroundColor: 'var(--background)',
                      color: 'var(--foreground)',
                    }}
                  >
                    WordPress-Leistungen ansehen
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Blocks,
                  title: 'Custom Themes',
                  text: 'Individuelle Templates, Komponenten und WordPress-Strukturen.',
                },
                {
                  icon: Wrench,
                  title: 'Builder & Bestand',
                  text: 'Bricks, Gutenberg, Elementor, Oxygen, Divi und bestehende Setups.',
                },
                {
                  icon: ShoppingCart,
                  title: 'WooCommerce',
                  text: 'Shop-Strukturen, Produktseiten, Checkout und Erweiterungen.',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-background/14 bg-background/[0.06] p-5"
                  >
                    <Icon className="h-5 w-5 text-background/72" aria-hidden="true" />
                    <h3 className="mt-4 text-base font-semibold text-background">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-background/68">{item.text}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        <div
          data-webdesign-platform-section="cms-webshops"
          className="relative isolate max-w-full overflow-x-clip py-8 md:py-10"
        >
          <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] xl:items-start xl:gap-14">
            <div className="min-w-0 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                CMS & Webshops
              </p>
              <h2 className="mt-4 text-balance type-heading-xl text-foreground break-words md:text-5xl [overflow-wrap:anywhere]">
                Umsetzung mit den gängigen Systemen.
              </h2>
              <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground break-words md:text-lg [overflow-wrap:anywhere]">
                Je nach Projekt wird die Plattform gewählt, die zu Inhaltspflege, Shop-Anforderung,
                Budget, Erweiterbarkeit und bestehender Infrastruktur passt.
              </p>
            </div>

            <div className="grid min-w-0 auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-3 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,1fr))]">
              {cmsSystems.map((system, index) => (
                <LogoCard
                  key={system.name}
                  {...system}
                  className={cn(
                    index === 0 && 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
                    index === 2 && 'lg:row-span-2',
                    index === 5 && 'sm:col-span-2 lg:col-span-2',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          data-webdesign-platform-section="entwicklung"
          className="relative isolate max-w-full overflow-x-clip py-8 md:py-10"
        >
          <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1.32fr)_minmax(0,0.68fr)] xl:items-start xl:gap-14">
            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,1fr))] xl:order-1">
              {techStacks.map((tech) => (
                <LogoCard key={tech.name} {...tech} />
              ))}
            </div>

            <div className="min-w-0 max-w-2xl xl:order-2">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Code2 className="h-4 w-4" aria-hidden="true" />
                Entwicklung
              </p>
              <h2 className="mt-4 text-balance type-heading-xl text-foreground break-words md:text-5xl [overflow-wrap:anywhere]">
                React, PHP und moderne Webentwicklung.
              </h2>
              <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground break-words md:text-lg [overflow-wrap:anywhere]">
                Neben klassischen CMS-Projekten entstehen individuelle Frontends, Schnittstellen,
                Backend-Logik, Komponentenbibliotheken und technische Erweiterungen, wenn ein
                Standardsystem allein nicht reicht.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
