import { Cpu, Zap } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React from 'react'

import { Media } from '@/components/Media'

// Konkreter Typ kommt nach payload generate:types (LyraFeatureBlock)
type LyraFeatureBlockProps = any

export const LyraFeatureBlock: React.FC<LyraFeatureBlockProps> = (props) => {
  const {
    title,
    paragraphOne,
    paragraphTwo,
    featureFastTitle,
    featureFastText,
    featurePowerfulTitle,
    featurePowerfulText,
    darkImage,
    lightImage,
    disableInnerContainer,
  } = props

  const hasDarkImage = Boolean(darkImage)
  const hasLightImage = Boolean(lightImage)
  const hasAnyImage = hasDarkImage || hasLightImage

  return (
    <section className={cn('py-16 md:py-32', disableInnerContainer && 'py-8')}>
      <div
        className={cn(
          'mx-auto max-w-5xl space-y-8 px-6 md:space-y-16',
          disableInnerContainer && 'px-0',
        )}
      >
        {title && (
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
            {title}
          </h2>
        )}

        <div className="relative">
          <div className="relative z-10 space-y-4 md:w-1/2 text-muted-foreground">
            {paragraphOne && (
              <p>
                {paragraphOne}
              </p>
            )}
            {paragraphTwo && <p>{paragraphTwo}</p>}

            <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
              {(featureFastTitle || featureFastText) && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="size-4" />
                    {featureFastTitle && (
                      <h3 className="text-sm font-medium text-foreground">
                        {featureFastTitle}
                      </h3>
                    )}
                  </div>
                  {featureFastText && (
                    <p className="text-sm text-muted-foreground">
                      {featureFastText}
                    </p>
                  )}
                </div>
              )}
              {(featurePowerfulTitle || featurePowerfulText) && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="size-4" />
                    {featurePowerfulTitle && (
                      <h3 className="text-sm font-medium text-foreground">
                        {featurePowerfulTitle}
                      </h3>
                    )}
                  </div>
                  {featurePowerfulText && (
                    <p className="text-sm text-muted-foreground">
                      {featurePowerfulText}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {hasAnyImage && (
            <div className="mt-12 h-fit md:absolute md:-inset-y-12 md:inset-x-0 md:mt-0 md:mask-l-from-35% md:mask-l-to-55%">
              <div className="relative rounded-2xl border border-dotted border-border/50 p-2">
                {hasDarkImage && (
                  <div className="hidden overflow-hidden rounded-[12px] dark:block">
                    <Media resource={darkImage} />
                  </div>
                )}
                {hasLightImage && (
                  <div className={cn('rounded-[12px] shadow', hasDarkImage && 'dark:hidden')}>
                    <Media resource={lightImage} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

