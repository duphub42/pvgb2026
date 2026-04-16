import React from 'react'
import Link from 'next/link'

import type { ProfilCtaBandBlock as BlockData } from '@/payload-types'

import { profilCtaDefaults } from '@/blocks/ProfilBlocks/defaults'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

type Props = BlockData & { disableInnerContainer?: boolean }

export const ProfilCtaBandBlock: React.FC<Props> = ({
  disableInnerContainer: _d,
  headline,
  text,
  buttonLabel,
  buttonLink,
}) => {
  const h = headline?.trim() || profilCtaDefaults.headline
  const t = text?.trim() || profilCtaDefaults.text
  const btn = buttonLabel?.trim() || profilCtaDefaults.buttonLabel
  const href =
    typeof buttonLink === 'string' && buttonLink.trim()
      ? buttonLink.trim()
      : profilCtaDefaults.buttonLink || '/kontakt'

  return (
    <section className={cn('border-t border-border/60 py-16 md:py-20')}>
      <div className="container">
        <div className="relative overflow-hidden rounded-[1.4rem] border border-foreground/10 bg-foreground px-6 py-12 text-center shadow-[0_30px_70px_-42px_rgba(2,6,23,0.75)] md:px-10 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-16 h-56 w-56 rounded-full bg-primary/22 blur-3xl"
          />
          <h2 className="relative z-10 text-3xl font-semibold tracking-tight text-background md:text-4xl">
            {h}
          </h2>
          <p className="relative z-10 mx-auto mt-4 max-w-2xl text-base leading-relaxed text-background/70 md:text-lg">
            {t}
          </p>
          <Button asChild variant="inverted" size="lg" className="relative z-10 mt-9 px-8">
            <Link href={href}>{btn}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
