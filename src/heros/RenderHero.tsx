'use client'

import dynamic from 'next/dynamic'
import React from 'react'

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
      const headline = typeof heroData?.headline === 'string' ? heroData.headline : null
      const description = typeof heroData?.description === 'string' ? heroData.description : null
      return (
        <section className="relative min-h-[40vh] bg-neutral-950 px-4 py-24 text-white" aria-label="Hero">
          <div className="container mx-auto max-w-2xl">
            {headline ? <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{headline}</h1> : null}
            {description ? <p className="mt-4 text-white/80">{description}</p> : null}
            {!headline && !description && fallback}
          </div>
        </section>
      )
    }
    return this.props.children
  }
}

const StylePreviewHeroLazy = dynamic(() =>
  import('@/heros/StylePreview/StylePreviewHero').then((m) => m.StylePreviewHero),
)

const heroes = {
  highImpact: dynamic(() => import('@/heros/HighImpact').then((m) => m.HighImpactHero)),
  mediumImpact: dynamic(() => import('@/heros/MediumImpact').then((m) => m.MediumImpactHero)),
  lowImpact: dynamic(() => import('@/heros/LowImpact').then((m) => m.LowImpactHero)),
  heroStylePreview: StylePreviewHeroLazy,
  philippBacher: StylePreviewHeroLazy,
  gridHero: dynamic(() => import('@/heros/GridHero').then((m) => m.GridHero)),
  simpleHero: dynamic(() => import('@/heros/SimpleHero')),
  hero75: dynamic(() => import('@/components/hero75').then((m) => m.Hero75)),
  hero215: dynamic(() => import('@/components/hero215').then((m) => m.Hero215)),
  hero238: dynamic(() => import('@/components/hero238').then((m) => m.Hero238)),
  hero242: dynamic(() => import('@/components/hero242').then((m) => m.Hero242)),
  hero243: dynamic(() => import('@/components/hero243').then((m) => m.Hero243)),
  hero244: dynamic(() => import('@/components/hero244').then((m) => m.Hero244)),
  hero256: dynamic(() => import('@/components/hero256').then((m) => m.Hero256)),
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
