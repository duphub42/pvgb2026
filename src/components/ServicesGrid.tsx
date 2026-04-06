'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const normalizeServiceSlug = (slug?: string): string => {
  const raw = slug?.trim() ?? ''
  return raw.replace(/^\/+|\/+$/g, '')
}

export interface ServiceItem {
  icon: { url: string; alt: string }
  title: string
  description: string
  link: { slug: string }
  featured?: boolean
}

export interface ServiceCategory {
  categoryLabel: string
  services: ServiceItem[]
}

export interface ServicesGridProps {
  data: ServiceCategory[]
  imagePosition?: 'left' | 'right'
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ data, imagePosition = 'left' }) => {
  // Responsive margin for Einleitungsbild je nach Position
  const imageMargin =
    imagePosition === 'right' ? 'mr-0 md:-mr-8 lg:-mr-[15vw]' : 'ml-0 md:-ml-8 lg:-ml-[15vw]'
  // Index für das Einleitungsbild (0 = links, letzte = rechts)
  const introIndex =
    imagePosition === 'right' && data[0]?.services.length > 1 ? data[0].services.length - 1 : 0
  // Hilfsfunktion für Service-Items, damit das Einleitungsbild an gewünschter Stelle steht
  const getServices = (services: ServiceItem[]) => {
    if (imagePosition === 'right' && services.length > 1) {
      // Einleitungsbild ans Ende
      const arr = [...services]
      const intro = arr.shift()
      arr.push(intro!)
      return arr
    }
    return services
  }
  return (
    <section className="relative py-16 px-6 max-w-7xl mx-auto text-foreground overflow-hidden">
      {data.map((category, catIndex) => (
        <div key={catIndex} className="mb-16">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              {category.categoryLabel}
            </span>
            <div className="h-[1px] w-12 bg-primary mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 relative overflow-visible items-stretch">
            {getServices(category.services).map((service, idx) => {
              const isIntro = idx === introIndex
              return (
                <div className="relative" key={idx}>
                  {/* SVG Punktmuster nur beim Einleitungsbild */}
                  {isIntro && (
                    <svg
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -z-10"
                      width="100%"
                      height="100%"
                      viewBox="0 0 400 600"
                      preserveAspectRatio="none"
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      <defs>
                        <radialGradient id="dot-fade" cx="50%" cy="50%" r="50%">
                          <stop offset="65%" stopColor="#fff" stopOpacity="0.18" />
                          <stop offset="75%" stopColor="#fff" stopOpacity="0.08" />
                          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      {Array.from({ length: 13 }).map((_, i) =>
                        Array.from({ length: 19 }).map((_, j) => (
                          <circle
                            key={`d-${i}-${j}`}
                            cx={i * 32}
                            cy={j * 32}
                            r={1.5}
                            fill="url(#dot-fade)"
                          />
                        )),
                      )}
                    </svg>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={cn(
                      'group block space-y-4 rounded-xl transition-transform hover:-translate-y-1 hover:shadow-xl p-4',
                      service.featured ? 'bg-secondary lg:col-span-1' : '',
                    )}
                  >
                    {(() => {
                      const slug = normalizeServiceSlug(service.link?.slug)
                      const href = slug ? `/${slug}` : undefined
                      const content = (
                        <div className="flex items-stretch gap-5">
                          <div
                            className={cn(
                              'relative shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300',
                              isIntro
                                ? `h-full w-auto ${imageMargin}`
                                : 'w-16 h-16 max-w-xs md:max-w-sm lg:max-w-md',
                            )}
                          >
                            {service.icon?.url ? (
                              <Image
                                src={service.icon.url}
                                alt={service.icon?.alt || service.title}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground text-xs rounded">
                                {service.icon?.alt ?? 'Icon'}
                              </div>
                            )}
                          </div>
                          <div className="space-y-3 h-full">
                            <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-sm line-clamp-5">
                              {service.description}
                            </p>
                            <div className="flex items-center text-xs font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">
                              Mehr erfahren <ChevronRight className="ml-1 w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      )
                      return href ? <Link href={href}>{content}</Link> : <div>{content}</div>
                    })()}
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}

export const dummyServices: ServiceCategory[] = [
  {
    categoryLabel: 'Design',
    services: [
      {
        icon: { url: '', alt: 'Webdesign Icon' },
        title: 'Webdesign',
        description:
          'Ich gestalte Websites, die Eindruck hinterlassen – klar, modern und benutzerfreundlich. Jede Seite ist mobiloptimiert und lädt blitzschnell. Ich kombiniere Design und Technik, damit Ihre Inhalte perfekt wirken. Struktur, Farben und Typografie werden gezielt auf Ihre Marke abgestimmt. So entsteht eine Website, die nicht nur gut aussieht, sondern auch funktioniert.',
        link: { slug: 'webdesign' },
      },
      {
        icon: { url: '', alt: 'Printmedien & Grafikdesign Icon' },
        title: 'Printmedien & Grafikdesign',
        description:
          'Von Flyern bis Broschüren gestalte ich alle Printprodukte professionell. Jedes Design wird individuell auf Ihre Marke und Botschaft zugeschnitten. Ich achte auf Harmonien in Farbe, Layout und Typografie. Ziel ist es, Ihre Inhalte klar zu kommunizieren. Am Ende halten Sie Printmedien in Händen, die professionell wirken und im Gedächtnis bleiben.',
        link: { slug: 'printmedien-grafikdesign' },
      },
      {
        icon: { url: '', alt: 'Präsentationen & Keynotes Icon' },
        title: 'Präsentationen & Keynotes',
        description:
          'Ich erstelle Präsentationen, die Ihr Publikum begeistern. Jede Folie wird klar strukturiert und visuell ansprechend gestaltet. Grafiken, Animationen und Storytelling sorgen dafür, dass Ihre Botschaft hängen bleibt. Ich helfe, Inhalte spannend und verständlich zu vermitteln. Ideal für Keynotes, Workshops oder interne Präsentationen, die Eindruck hinterlassen.',
        link: { slug: 'praesentationen-keynotes' },
      },
    ],
  },
  {
    categoryLabel: 'Marketing',
    services: [
      {
        icon: { url: '', alt: 'SEO Icon' },
        title: 'SEO – Rankings',
        description:
          'Meine SEO-Maßnahmen sorgen dafür, dass Ihre Website bei Google & Co. besser gefunden wird. Ich analysiere relevante Keywords und optimiere Inhalte systematisch. Technische Aspekte wie Ladezeiten, Meta-Tags und strukturierte Daten bringe ich in Top-Form. So gewinnen Sie organischen Traffic und neue Interessenten. Transparente Reportings zeigen Ihnen Fortschritte und Potenziale auf einen Blick.',
        link: { slug: 'seo-rankings' },
      },
      {
        icon: { url: '', alt: 'SEM Icon' },
        title: 'SEM – Online Werbung',
        description:
          'Ich plane und betreue Online-Kampagnen, die Ihre Reichweite und Conversions erhöhen. Jede Anzeige ist strategisch und zielgruppenorientiert gestaltet. Ich optimiere Kampagnen kontinuierlich, damit Ihr Budget effizient eingesetzt wird. Ihre Botschaften erreichen so die richtigen Menschen zur richtigen Zeit. Ergebnisse und Insights liefere ich verständlich und nachvollziehbar.',
        link: { slug: 'sem-online-werbung' },
      },
      {
        icon: { url: '', alt: 'Content Creation Icon' },
        title: 'Content Creation',
        description:
          'Ich produziere Content, der Ihre Marke lebendig macht – Texte, Bilder, Videos. Jede Kreation ist zielgruppenorientiert und unterstützt Ihre Botschaft. Storytelling und konsistente Markenkommunikation stehen im Fokus. Ich sorge dafür, dass Inhalte Emotionen wecken und Engagement erzeugen. So entsteht Content, der gesehen, gelesen und geteilt wird.',
        link: { slug: 'content-creation' },
      },
    ],
  },
  {
    categoryLabel: 'Branding',
    services: [
      {
        icon: { url: '', alt: 'CI Icon' },
        title: 'CI – Corporate Identity',
        description:
          'Ich entwickle eine einheitliche Markenidentität, die Sie wiedererkennbar macht. Farben, Typografie und Logo werden perfekt aufeinander abgestimmt. Jedes Detail stärkt das professionelle Auftreten Ihres Unternehmens. Ich achte darauf, dass alle Kanäle ein konsistentes Bild abgeben. Ihre Marke wirkt dadurch authentisch und vertrauenswürdig.',
        link: { slug: 'ci-corporate-identity' },
      },
      {
        icon: { url: '', alt: 'Logo-Entwicklung Icon' },
        title: 'Logo-Entwicklung',
        description:
          'Ich gestalte Logos, die Ihre Marke prägnant repräsentieren. Einprägsam, skalierbar und einzigartig – jedes Logo erzählt Ihre Geschichte. Farben, Formen und Schrift passen perfekt zu Ihren Werten. So erzeugt Ihr Logo sofort Wiedererkennung. Das Ergebnis ist ein professionelles Markenzeichen, das lange Bestand hat.',
        link: { slug: 'logo-entwicklung' },
      },
      {
        icon: { url: '', alt: 'Markenstrategie Icon' },
        title: 'Markenstrategie',
        description:
          'Ich definiere Strategien, die Ihre Marke klar positionieren. Analyse, Zieldefinition und Storytelling bilden die Basis. Jede Maßnahme ist auf nachhaltigen Erfolg ausgerichtet. Ich sorge für konsistente und authentische Kommunikation. So wird Ihre Marke erkennbar, stark und erfolgreich.',
        link: { slug: 'markenstrategie' },
      },
      {
        icon: { url: '', alt: 'Automatisierung Icon' },
        title: 'Automatisierung',
        description:
          'Ich digitalisiere Prozesse und optimiere Workflows für maximale Effizienz. Tools und Systeme verbinde ich intelligent, damit Aufgaben automatisch ablaufen. So sparen Sie Zeit und Ressourcen. Geschwindigkeit, Genauigkeit und Produktivität steigen spürbar. Das Ergebnis: reibungslose, skalierbare Abläufe, die Ihr Unternehmen voranbringen.',
        link: { slug: 'automatisierung' },
        featured: true,
      },
    ],
  },
]
