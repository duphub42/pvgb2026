import Image from 'next/image'
import Link from 'next/link'
import { Leaf } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ObsthofOfferTeaser() {
  return (
    <section className="w-full overflow-visible py-10 md:py-14 xl:py-18">
      <div className="mx-auto w-full max-w-[86rem] overflow-visible px-4 md:px-6 lg:px-8">
        <div
          className="relative isolate overflow-visible rounded-3xl border px-5 py-7 [--obsthof-cta-bg:#0a0a0a] [--obsthof-cta-border:rgba(255,255,255,0.1)] [--obsthof-cta-muted:rgba(255,255,255,0.78)] [--obsthof-cta-orb:rgba(255,255,255,0.18)] [--obsthof-cta-shadow:rgba(0,0,0,0.82)] [--obsthof-cta-soft:rgba(255,255,255,0.06)] [--obsthof-cta-text:#ffffff] dark:[--obsthof-cta-bg:#f5f5f5] dark:[--obsthof-cta-border:rgba(255,255,255,0.28)] dark:[--obsthof-cta-muted:rgba(23,23,23,0.72)] dark:[--obsthof-cta-orb:rgba(10,10,10,0.10)] dark:[--obsthof-cta-shadow:rgba(0,0,0,0.54)] dark:[--obsthof-cta-soft:rgba(10,10,10,0.05)] dark:[--obsthof-cta-text:#0a0a0a] sm:px-6 md:px-8 md:py-9 xl:min-h-[360px] xl:px-10"
          style={{
            color: 'var(--obsthof-cta-text)',
            backgroundColor: 'var(--obsthof-cta-bg)',
            borderColor: 'var(--obsthof-cta-border)',
            boxShadow:
              '0 22px 60px -42px var(--obsthof-cta-shadow), 0 12px 28px -24px var(--obsthof-cta-shadow)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_82%_18%,var(--obsthof-cta-orb),transparent_32%),linear-gradient(135deg,var(--obsthof-cta-soft),transparent_52%)]"
            aria-hidden="true"
          />
          <div className="grid gap-7 md:gap-8 xl:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] xl:items-center xl:gap-16">
            <div className="max-w-3xl xl:max-w-none">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--obsthof-cta-muted)] sm:text-sm sm:tracking-[0.16em]">
                <Leaf className="h-4 w-4" aria-hidden="true" />
                Branchenspezifisches Webdesign
              </p>
              <h2
                className="mt-4 text-balance type-heading-lg md:type-heading-xl"
                style={{
                  color: 'var(--obsthof-cta-text)',
                  backgroundImage: 'none',
                  WebkitBackgroundClip: 'border-box',
                  backgroundClip: 'border-box',
                  WebkitTextFillColor: 'var(--obsthof-cta-text)',
                }}
              >
                Websites für Obsthöfe, Hofläden und Direktvermarkter
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--obsthof-cta-muted)] sm:text-base md:text-lg">
                Ein eigenes WordPress-Angebot für Obstbaubetriebe, Hofläden und Direktvermarkter,
                die Sortiment, Saisonangebote, Öffnungszeiten und Anfahrt klar sichtbar machen wollen.
              </p>
              <div className="mt-7">
                <Button
                  asChild
                  variant="cta"
                  size="cta"
                  ctaIcon
                  className="hover:opacity-88"
                  style={{
                    backgroundColor: 'var(--obsthof-cta-text)',
                    color: 'var(--obsthof-cta-bg)',
                  }}
                >
                  <Link href="/leistungen/webdesign/websites-fuer-obsthoefe">
                    Obsthof-Angebot ansehen
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto mt-2 w-full min-w-0 max-w-[43.2rem] xl:-top-24 xl:-left-14 xl:mt-0 xl:-mr-16 xl:-mb-24 xl:w-[120%] xl:max-w-none xl:self-start 2xl:-left-8">
              <Image
                src="/media/moriss-obsthof-showcase.png"
                alt="Showcase der Referenzwebsite Moriss Obstplantagen"
                width={1453}
                height={609}
                sizes="(min-width: 1280px) 620px, (min-width: 1024px) 520px, 100vw"
                className="h-auto w-full drop-shadow-[0_20px_36px_rgba(0,0,0,0.44)] [filter:drop-shadow(0_0_28px_rgba(255,255,255,0.18))_drop-shadow(0_22px_42px_rgba(0,0,0,0.46))]"
              />
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--obsthof-cta-muted)] xl:text-right">
                Referenz: moriss.de
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
