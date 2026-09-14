import Image from 'next/image'
import Link from 'next/link'
import { Blocks, Gauge, Layers3, Moon, Settings2, Smartphone } from 'lucide-react'

import { Button } from '@/components/ui/button'

const facts = [
  {
    icon: Moon,
    label: 'Dark/Light Mode',
    text: 'Theme-System mit sauber abgestimmten hellen und dunklen Ansichten.',
  },
  {
    icon: Gauge,
    label: 'Lighthouse 99%',
    text: 'Performance-orientierte Umsetzung mit sehr guten Messwerten.',
  },
  {
    icon: Smartphone,
    label: 'Responsive',
    text: 'Layouts, Navigation und Inhalte funktionieren auf Smartphone, Tablet und Desktop.',
  },
  {
    icon: Layers3,
    label: 'Custom Made',
    text: 'Individuell nach Vorgaben, Marke, Inhalt und gewünschter Nutzerführung entwickelt.',
  },
]

const bricksFacts = [
  {
    icon: Blocks,
    label: 'Bricks Theme',
    text: 'Individuelle Templates, Komponenten und Layouts im Bricks-System statt Standard-Theme von der Stange.',
  },
  {
    icon: Settings2,
    label: 'Customizing',
    text: 'Design, Seitenstruktur und Inhaltsbereiche werden an Praxis, Leistungen und Zielgruppe angepasst.',
  },
  {
    icon: Smartphone,
    label: 'Responsive Aufbau',
    text: 'Die Website bleibt auf mobilen Geräten, Tablet und Desktop klar nutzbar.',
  },
  {
    icon: Gauge,
    label: 'Performance-Fokus',
    text: 'Schlanker Aufbau, saubere Assets und reduzierte Plugin-Abhängigkeit für schnelle Ladezeiten.',
  },
]

const builders = [
  {
    name: 'Bricks',
    icon: '/wordpress-builders/bricks.svg',
    focus: 'performante Theme-Erstellung, Templates, Komponenten und dynamische Inhalte',
  },
  {
    name: 'Oxygen',
    icon: '/wordpress-builders/oxygen.svg',
    focus: 'technisch schlanke Layouts, strukturierte Komponenten und saubere Weiterentwicklung',
  },
  {
    name: 'Elementor',
    icon: '/wordpress-builders/elementor.svg',
    focus: 'bestehende Seiten stabilisieren, neu strukturieren und wartbarer machen',
  },
  {
    name: 'Divi',
    icon: '/wordpress-builders/divi.svg',
    focus: 'Relaunches, Design-Anpassungen und systematische Optimierung vorhandener Auftritte',
  },
  {
    name: 'Gutenberg',
    icon: '/wordpress-builders/gutenberg.svg',
    focus: 'native WordPress-Blöcke, editierbare Inhaltsbereiche und langfristig robuste Pflege',
  },
  {
    name: 'Beaver Builder',
    icon: '/wordpress-builders/beaver-builder.svg',
    focus: 'solide Unternehmensseiten, modulare Layouts und pragmatische Bestandsbetreuung',
  },
]

export function WordPressThemeShowcase() {
  return (
    <section className="w-full overflow-visible py-10 md:py-14 xl:py-18">
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-14 overflow-visible px-4 md:px-6 lg:px-8 xl:gap-20">
        <div
          className="relative isolate overflow-visible rounded-3xl border px-5 py-8 shadow-[0_24px_70px_-52px_rgba(0,0,0,0.9)] [--wp-case-bg:#0a0a0a] [--wp-case-border:rgba(255,255,255,0.12)] [--wp-case-muted:rgba(255,255,255,0.72)] [--wp-case-soft:rgba(255,255,255,0.08)] [--wp-case-text:#ffffff] dark:[--wp-case-bg:#f5f5f5] dark:[--wp-case-border:rgba(10,10,10,0.10)] dark:[--wp-case-muted:rgba(10,10,10,0.68)] dark:[--wp-case-soft:rgba(10,10,10,0.05)] dark:[--wp-case-text:#0a0a0a] md:px-8 md:py-10 xl:px-10"
          style={{
            backgroundColor: 'var(--wp-case-bg)',
            borderColor: 'var(--wp-case-border)',
            color: 'var(--wp-case-text)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_18%,var(--wp-case-soft),transparent_34%),linear-gradient(135deg,var(--wp-case-soft),transparent_48%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 grid gap-10">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-end xl:gap-14">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--wp-case-muted)]">
                  Custom WordPress Themes
                </p>
                <h2
                  className="mt-4 text-balance type-heading-xl md:text-5xl"
                  style={{
                    color: 'var(--wp-case-text)',
                    backgroundImage: 'none',
                    WebkitBackgroundClip: 'border-box',
                    backgroundClip: 'border-box',
                    WebkitTextFillColor: 'var(--wp-case-text)',
                  }}
                >
                  Komplette WordPress Themes statt nur Plugin-Anpassungen.
                </h2>
                <p className="mt-5 text-pretty text-base leading-8 text-[var(--wp-case-muted)] md:text-lg">
                  Am Beispiel Moriss zeigt sich, wie ein vollständiges WordPress Custom Theme
                  entstehen kann: individuelles Design, editierbare Inhalte, klare Komponenten und
                  eine technische Basis, die nach individuellen Vorgaben exakt zum Betrieb passt.
                </p>
              </div>
              <div className="relative mx-auto w-full max-w-[48rem] xl:-ml-[6%] xl:max-w-none xl:pl-2">
                <Image
                  src="/media/moriss-obsthof-showcase.png"
                  alt="Showcase der individuell entwickelten WordPress-Website Moriss"
                  width={1453}
                  height={609}
                  sizes="(min-width: 1280px) 800px, (min-width: 1024px) 680px, 100vw"
                  className="h-auto w-full drop-shadow-[0_22px_42px_rgba(0,0,0,0.48)]"
                />
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--wp-case-muted)] xl:text-right">
                  Moriss Obstplantagen als vollständiges Custom Theme
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row xl:justify-end">
                  <Button
                    asChild
                    variant="cta"
                    size="cta"
                    ctaIcon
                    className="w-full justify-center sm:w-56"
                  >
                    <Link
                      href="/leistungen/webdesign/websites-fuer-obsthoefe"
                      style={{
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                      }}
                    >
                      Moriss Case ansehen
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="cta"
                    className="w-full justify-center bg-transparent hover:bg-background/10 sm:w-56"
                    style={{
                      borderColor: 'var(--wp-case-muted)',
                      color: 'var(--wp-case-text)',
                    }}
                  >
                    <a href="https://moriss.de" target="_blank" rel="noopener noreferrer">
                      Live-Referenz öffnen
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {facts.map((fact) => {
                const Icon = fact.icon
                return (
                  <article
                    key={fact.label}
                    className="rounded-2xl border p-4"
                    style={{
                      backgroundColor: 'var(--wp-case-soft)',
                      borderColor: 'var(--wp-case-border)',
                    }}
                  >
                    <Icon className="h-5 w-5 text-[var(--wp-case-muted)]" aria-hidden="true" />
                    <h3 className="mt-4 text-base font-semibold text-[var(--wp-case-text)]">
                      {fact.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--wp-case-muted)]">
                      {fact.text}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        <div className="relative isolate overflow-visible px-1 py-14 md:px-2 md:py-20 xl:px-4 xl:py-24">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-start xl:gap-14">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Builder-Expertise
              </p>
              <h2 className="mt-4 text-balance type-heading-xl text-foreground md:text-5xl">
                WordPress-Umsetzung mit den gängigen Buildern.
              </h2>
              <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground md:text-lg">
                Nicht jedes WordPress-Projekt braucht dieselbe technische Grundlage. Bestehende
                Seiten werden dort weiterentwickelt, wo sie sinnvoll aufgebaut sind; neue Systeme
                entstehen mit dem Builder, der zu Performance, Pflege und Designfreiheit passt.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {builders.map((builder) => (
                <article
                  key={builder.name}
                  className="rounded-2xl border border-border/70 bg-card/82 p-5 shadow-[0_18px_52px_-46px_rgba(0,0,0,0.58)] backdrop-blur-sm transition-colors hover:border-foreground/20"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-border bg-background"
                      aria-hidden="true"
                    >
                      <Image
                        src={builder.icon}
                        alt=""
                        width={54}
                        height={54}
                        unoptimized
                        loading="eager"
                        className="h-12 w-12 object-contain opacity-75 grayscale dark:invert"
                      />
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{builder.name}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{builder.focus}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="relative isolate overflow-visible rounded-3xl border border-border/70 bg-card px-5 py-8 shadow-[0_22px_60px_-50px_rgba(0,0,0,0.62)] md:px-8 md:py-10 xl:px-10">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(0,0,0,0.06),transparent_32%),linear-gradient(135deg,rgba(0,0,0,0.04),transparent_52%)] dark:bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.08),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_52%)]"
            aria-hidden="true"
          />

          <div className="grid gap-10">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] xl:items-end xl:gap-14">
              <div className="relative mx-auto w-full max-w-[46rem] xl:ml-[6%] xl:max-w-none xl:pr-2">
                <Image
                  src="/media/kipp-dental-showcase.png"
                  alt="Showcase der WordPress-Website KIPP Dental mit Bricks Theme-Erstellung"
                  width={1080}
                  height={527}
                  sizes="(min-width: 1280px) 760px, (min-width: 1024px) 660px, 100vw"
                  className="h-auto w-full drop-shadow-[0_20px_38px_rgba(0,0,0,0.28)]"
                />
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  kipp-dental.de als individuelle Bricks Theme-Erstellung
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row xl:justify-start">
                  <Button
                    asChild
                    variant="cta"
                    size="cta"
                    ctaIcon
                    className="w-full justify-center sm:w-56"
                  >
                    <a href="https://kipp-dental.de" target="_blank" rel="noopener noreferrer">
                      KIPP Dental ansehen
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="cta"
                    className="w-full justify-center sm:w-56"
                  >
                    <Link href="/portfolio">Weitere Referenzen</Link>
                  </Button>
                </div>
              </div>

              <div className="max-w-3xl xl:justify-self-end">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  WP Theme-Erstellung mit Bricks
                </p>
                <h2
                  className="mt-4 text-balance type-heading-xl md:text-5xl"
                  style={{
                    color: 'var(--foreground)',
                    backgroundImage: 'none',
                    WebkitBackgroundClip: 'border-box',
                    backgroundClip: 'border-box',
                    WebkitTextFillColor: 'var(--foreground)',
                  }}
                >
                  Individuelle WordPress-Auftritte auch auf Bricks-Basis.
                </h2>
                <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground md:text-lg">
                  KIPP Dental zeigt eine weitere Art von WordPress-Projekt: kein fertiges Theme, das
                  nur oberflächlich angepasst wird, sondern eine gezielte Theme-Erstellung mit
                  Bricks, individuellen Templates und einer Nutzerführung, die zum
                  medizinisch-technischen Angebot passt.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {bricksFacts.map((fact) => {
                const Icon = fact.icon
                return (
                  <article
                    key={fact.label}
                    className="rounded-2xl border border-border/70 bg-background/70 p-4"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <h3 className="mt-4 text-base font-semibold text-foreground">{fact.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{fact.text}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
