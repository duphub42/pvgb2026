import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'

// Konkreter Typ kommt nach payload generate:types (HeroMarketingBlock)
type HeroMarketingBlockProps = any

export const HeroMarketingBlock: React.FC<HeroMarketingBlockProps> = (props) => {
  const {
    disableInnerContainer,
    badgeLabel,
    title,
    subtitle,
    primaryCtaLabel,
    primaryCtaUrl,
    secondaryCtaLabel,
    secondaryCtaUrl,
  } = props ?? {}

  const resolvedBadge =
    badgeLabel && String(badgeLabel).trim().length > 0
      ? String(badgeLabel).trim()
      : 'Introducing Support for AI Models'

  const resolvedTitle =
    title && String(title).trim().length > 0
      ? String(title).trim()
      : 'Modern Solutions for Customer Engagement'

  const resolvedSubtitle =
    subtitle && String(subtitle).trim().length > 0
      ? String(subtitle).trim()
      : 'Highly customizable components for building modern websites and applications that look and feel the way you mean it.'

  const resolvedPrimaryLabel =
    primaryCtaLabel && String(primaryCtaLabel).trim().length > 0
      ? String(primaryCtaLabel).trim()
      : 'Start Building'

  const resolvedPrimaryUrl =
    primaryCtaUrl && String(primaryCtaUrl).trim().length > 0
      ? String(primaryCtaUrl).trim()
      : '#start'

  const resolvedSecondaryLabel =
    secondaryCtaLabel && String(secondaryCtaLabel).trim().length > 0
      ? String(secondaryCtaLabel).trim()
      : 'Request a demo'

  const resolvedSecondaryUrl =
    secondaryCtaUrl && String(secondaryCtaUrl).trim().length > 0
      ? String(secondaryCtaUrl).trim()
      : '#demo'

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Einfacher Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            aria-label="home"
            className="flex items-center gap-2"
          >
            <Logo />
          </Link>
          <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="#features" className="hover:text-foreground">
              Features
            </Link>
            <Link href="#solution" className="hover:text-foreground">
              Solution
            </Link>
            <Link href="#pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link href="#about" className="hover:text-foreground">
              About
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href="#login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="#signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero-Hintergrund */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
      />

      {/* Hero-Inhalt */}
      <main className={cn('mx-auto max-w-7xl px-6 pt-20 md:pt-28', disableInnerContainer && 'px-6')}>
        <div className="text-center lg:text-left">
          <div className="mx-auto max-w-xl lg:mr-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs font-medium shadow-sm">
              <span>{resolvedBadge}</span>
            </div>

            <h1 className="mx-auto mt-8 max-w-4xl text-balance text-4xl font-semibold md:text-6xl lg:mt-12">
              {resolvedTitle}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:mt-8">
              {resolvedSubtitle}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-2 md:flex-row lg:justify-start">
              <Button asChild size="lg" className="rounded-xl px-5 text-base">
                <Link href={resolvedPrimaryUrl}>{resolvedPrimaryLabel}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-xl px-5 text-base"
              >
                <Link href={resolvedSecondaryUrl}>{resolvedSecondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Hero-Bild */}
        <div className="relative mt-12 overflow-hidden px-2 sm:mt-16 md:mt-20">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border/40 bg-background shadow-lg shadow-black/10">
            <Image
              className="hidden aspect-[15/8] w-full rounded-2xl bg-background object-cover dark:block"
              src="/mail2.png"
              alt="App screen"
              width={2700}
              height={1440}
            />
            <Image
              className="aspect-[15/8] w-full rounded-2xl border border-border/25 object-cover dark:hidden"
              src="/mail2-light.png"
              alt="App screen"
              width={2700}
              height={1440}
            />
          </div>
        </div>

        {/* Customer Logos */}
        <section className="bg-background pb-16 pt-16 md:pb-24">
          <div className="group relative m-auto max-w-5xl">
            <div className="mx-auto grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-14">
              {[
                'https://html.tailus.io/blocks/customers/nvidia.svg',
                'https://html.tailus.io/blocks/customers/column.svg',
                'https://html.tailus.io/blocks/customers/github.svg',
                'https://html.tailus.io/blocks/customers/nike.svg',
                'https://html.tailus.io/blocks/customers/lemonsqueezy.svg',
                'https://html.tailus.io/blocks/customers/laravel.svg',
                'https://html.tailus.io/blocks/customers/lilly.svg',
                'https://html.tailus.io/blocks/customers/openai.svg',
              ].map((src, idx) => (
                <div key={idx} className="flex">
                  <img
                    className="mx-auto h-5 w-auto dark:invert"
                    src={src}
                    alt="Customer logo"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </section>
  )
}

