'use client'

import React from 'react'

import type { ProfilCtaBandBlock as BlockData } from '@/payload-types'

import { profilCtaDefaults } from '@/blocks/ProfilBlocks/defaults'
import { CtaLink } from '@/blocks/ProfilBlocks/shared'
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
    <section className={cn('border-t border-border/60 bg-primary/5 py-16 md:py-20')}>
      <div className="container text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{h}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t}</p>
        <Button asChild size="lg" className="mt-8">
          <CtaLink href={href}>{btn}</CtaLink>
        </Button>
      </div>
    </section>
  )
}
