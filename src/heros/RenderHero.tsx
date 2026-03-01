'use client'

import React from 'react'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher'
import { GridHero } from '@/heros/GridHero'
import SimpleHero from '@/heros/SimpleHero'
import { Hero75 } from '@/components/hero75'
import { Hero215 } from '@/components/hero215'
import { Hero238 } from '@/components/hero238'
import { Hero242 } from '@/components/hero242'
import { Hero243 } from '@/components/hero243'
import { Hero244 } from '@/components/hero244'
import { Hero256 } from '@/components/hero256'

const SHADCN_HERO_TYPES = new Set(['hero75', 'hero215', 'hero238', 'hero242', 'hero243', 'hero244', 'hero256'])

/** Fängt Laufzeitfehler in Shadcn-Heros ab und zeigt einen einfachen Fallback statt „Hero konnte nicht geladen werden“. */
class ShadcnHeroErrorBoundary extends React.Component<
  { children: React.ReactNode; heroData: Record<string, unknown>; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError = () => ({ hasError: true })

  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ShadcnHeroErrorBoundary]', error?.message)
    }
  }

  render() {
    if (this.state.hasError) {
      const { heroData, fallback } = this.props
      return (
        <section className="relative min-h-[40vh] bg-neutral-950 px-4 py-24 text-white" aria-label="Hero">
          <div className="container mx-auto max-w-2xl">
            {heroData?.headline && (
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{String(heroData.headline)}</h1>
            )}
            {heroData?.description && (
              <p className="mt-4 text-white/80">{String(heroData.description)}</p>
            )}
            {!heroData?.headline && !heroData?.description && fallback}
          </div>
        </section>
      )
    }
    return this.props.children
  }
}

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
  gridHero: GridHero,
  simpleHero: SimpleHero,
  hero75: Hero75,
  hero215: Hero215,
  hero238: Hero238,
  hero242: Hero242,
  hero243: Hero243,
  hero244: Hero244,
  hero256: Hero256,
}

export type HeroType = keyof typeof heroes

export const RenderHero: React.FC<any> = (props) => {
  const heroData = props.hero || props

  if (!heroData?.type || heroData.type === 'none') return null

  const typeKey = heroData.type as string
  let HeroToRender = (heroes as Record<string, React.ComponentType<any>>)[typeKey]
  if (!HeroToRender && typeof typeKey === 'string') {
    const lower = typeKey.charAt(0).toLowerCase() + typeKey.slice(1)
    HeroToRender = (heroes as Record<string, React.ComponentType<any>>)[lower]
  }

  if (!HeroToRender || typeof HeroToRender !== 'function') return null

  const isShadcn = SHADCN_HERO_TYPES.has(typeKey)
  const content = <HeroToRender {...heroData} />

  if (isShadcn) {
    return (
      <ShadcnHeroErrorBoundary
        heroData={heroData as Record<string, unknown>}
        fallback={<p className="text-sm text-white/60">Hero</p>}
      >
        {content}
      </ShadcnHeroErrorBoundary>
    )
  }

  return content
}
