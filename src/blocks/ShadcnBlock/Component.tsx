'use client'

import React, { Suspense, lazy } from 'react'

type Props = {
  variant?: string | null
  disableInnerContainer?: boolean
}

const variantLoaders: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>
> = {
  feature215b: lazy(() =>
    import('@/components/feature215b').then((m) => ({ default: m.Feature215b })),
  ),
  feature210: lazy(() =>
    import('@/components/feature210').then((m) => ({ default: m.Feature210 })),
  ),
  about15: lazy(() =>
    import('@/components/about15').then((m) => ({ default: m.About15 })),
  ),
  about8: lazy(() =>
    import('@/components/about8').then((m) => ({ default: m.About8 })),
  ),
  about3: lazy(() =>
    import('@/components/about3').then((m) => ({ default: m.About3 })),
  ),
  hero238: lazy(() =>
    import('@/components/hero238').then((m) => ({ default: m.Hero238 })),
  ),
  hero256: lazy(() =>
    import('@/components/hero256').then((m) => ({ default: m.Hero256 })),
  ),
  feature268: lazy(() =>
    import('@/components/feature268').then((m) => ({ default: m.Feature268 })),
  ),
  feature267: lazy(() =>
    import('@/components/feature267').then((m) => ({ default: m.Feature267 })),
  ),
  feature271: lazy(() =>
    import('@/components/feature271').then((m) => ({ default: m.Feature271 })),
  ),
  feature270: lazy(() =>
    import('@/components/feature270').then((m) => ({ default: m.Feature270 })),
  ),
  feature282: lazy(() =>
    import('@/components/feature282').then((m) => ({ default: m.Feature282 })),
  ),
  feature294: lazy(() =>
    import('@/components/feature294').then((m) => ({ default: m.Feature294 })),
  ),
  feature147: lazy(() =>
    import('@/components/feature147').then((m) => ({ default: m.Feature147 })),
  ),
  feature148: lazy(() =>
    import('@/components/feature148').then((m) => ({ default: m.Feature148 })),
  ),
  feature190: lazy(() =>
    import('@/components/feature190').then((m) => ({ default: m.Feature190 })),
  ),
  feature229: lazy(() =>
    import('@/components/feature229').then((m) => ({ default: m.Feature229 })),
  ),
  feature250: lazy(() =>
    import('@/components/feature250').then((m) => ({ default: m.Feature250 })),
  ),
  feature251: lazy(() =>
    import('@/components/feature251').then((m) => ({ default: m.Feature251 })),
  ),
  feature253: lazy(() =>
    import('@/components/feature253').then((m) => ({ default: m.Feature253 })),
  ),
  feature256: lazy(() =>
    import('@/components/feature256').then((m) => ({ default: m.Feature256 })),
  ),
  feature261: lazy(() =>
    import('@/components/feature261').then((m) => ({ default: m.Feature261 })),
  ),
}

export const ShadcnBlockComponent: React.FC<Props> = (props) => {
  const variant = props.variant ?? 'feature215b'
  const Block = variantLoaders[variant]
  if (!Block) return null
  return (
    <Suspense fallback={<div className="min-h-[200px] animate-pulse bg-muted/30" aria-hidden />}>
      <Block />
    </Suspense>
  )
}
