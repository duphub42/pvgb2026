'use client'

import React from 'react'

const HERO_IMAGE_SRC = 'https://placehold.co/450x726'
const MARQUEE_TEXT = 'Marquee • Marquee • Marquee • Marquee • Marquee'

/**
 * Hero – eine responsive Komponente für Desktop, MacBook, iPad, Android, iPhone.
 * - Desktop (lg+): HeroBox mit linker Spalte (Text, CTAs) und rechter Spalte (Hero-Bild).
 * - Tablet/Mobile (md und darunter): Hero-Bild als Hintergrund hinter der HeroBox;
 *   Box mit Gradient-Overlay und Inhalt darüber für Lesbarkeit.
 * - Marquee in der HeroBox, CTA-Buttons mit Hover. Tailwind-Breakpoints, keine festen Pixel.
 */
export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black" aria-label="Hero">
      {/* Hintergrund-Bild: nur < lg (Tablet/Mobile) – liegt hinter der Box */}
      <div className="absolute inset-0 z-0 lg:hidden" aria-hidden>
        <img
          src={HERO_IMAGE_SRC}
          alt=""
          className="w-full h-full object-cover object-right-bottom"
          fetchPriority="high"
        />
      </div>

      {/* Gradient-Overlay: nur wenn Bild hinter der Box (md und darunter) */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-black/80 lg:pointer-events-none lg:bg-transparent"
        aria-hidden
      />

      {/* HeroBox-Container: ohne Abstandshalter, direkt unter Header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 max-h-[700px] z-[6] px-0 overflow-hidden hero-box-animate">
        <div className="hero-box-inner h-full w-full max-w-7xl mx-auto rounded-2xl lg:rounded-3xl border border-white/5 hero-box-frame-shadow relative overflow-hidden flex flex-col lg:flex-row">
          {/* Linke Spalte: Subheading, Heading, Text, CTAs, Marquee */}
          <div className="relative z-10 flex flex-col gap-0 p-0 min-w-0 flex-1 lg:max-w-[min(100%,28rem)] xl:max-w-[32rem] pointer-events-auto">
            <div className="uppercase text-neutral-400 text-sm sm:text-base font-medium tracking-wide">
              Discover Endless Possibilities
            </div>
            <h1 className="hero-headline text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-semibold leading-tight">
              Your Journey Begins Here
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl max-w-xl">
              Unlock your potential with our innovative solutions tailored to your needs. Join us and step into a world of opportunities.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 text-base sm:text-lg md:text-xl text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all"
              >
                Learn More
              </button>
              <button
                type="button"
                className="px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 text-base sm:text-lg md:text-xl text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Marquee: am unteren Ende der linken Spalte, doppelt für nahtlosen Loop */}
            <div className="mt-auto pt-0 text-white">
              <div className="text-base sm:text-lg md:text-xl font-medium">Überschrift Marquee</div>
              <div className="overflow-hidden whitespace-nowrap mt-0">
                <div className="flex gap-8 animate-marquee w-max">
                  <span className="shrink-0">{MARQUEE_TEXT}</span>
                  <span className="shrink-0">{MARQUEE_TEXT}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rechte Spalte / Hero-Bild: nur lg+ (Desktop/MacBook), innerhalb der Box */}
          <div className="hidden lg:block relative w-full flex-shrink-0 lg:w-80 xl:w-96 lg:min-h-0">
            <img
              src={HERO_IMAGE_SRC}
              alt="Hero"
              className="absolute right-0 top-0 h-full w-[24rem] xl:w-96 object-cover object-right-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
