"use client"

import React, { useEffect, useState } from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

/**
 * PhilippBacherHero – optisch am Hero von philippbacher.com orientiert:
 * Volle Viewport-Höhe, Subheadline (Tagline) → Headline → zwei CTAs.
 * Ruhiger Hintergrund, dezenter Parallax beim Scrollen.
 */
export const PhilippBacherHero: React.FC<any> = (props) => {
  const [offset, setOffset] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => setOffset(window.pageYOffset)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!props) return null

  const {
    richText,
    links,
    media,
    headline,
    subheadline,
    description,
    mediaType = 'image',
    backgroundImage,
    backgroundVideo,
    foregroundImage,
    overlayOpacity = 0.45,
  } = props

  const backgroundMedia =
    mediaType === 'video' && backgroundVideo
      ? backgroundVideo
      : (backgroundImage || media)

  const hasTextContent = headline || subheadline || description || richText

  const currentOffset = offset || 0
  const backgroundScale = 1 + Math.min(currentOffset * 0.0003, 0.03)
  const backgroundTranslateY = currentOffset * 0.2
  const dynamicOverlayOpacity = Math.min((currentOffset / 800) + Number(overlayOpacity), 0.75)

  return (
    <section
      className="relative flex min-h-[100vh] min-h-[100dvh] items-center justify-center overflow-hidden bg-neutral-950 text-white"
      aria-label="Hero"
    >
      {/* Hintergrund – ruhig, leichter Parallax */}
      <div
        className="absolute inset-0 z-0 origin-center will-change-transform"
        style={{
          transform: `translateY(${backgroundTranslateY}px) scale(${backgroundScale})`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {backgroundMedia && typeof backgroundMedia !== 'string' && (
          <Media
            resource={backgroundMedia}
            fill
            imgClassName="object-cover w-full h-full"
            priority
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none bg-black"
          style={{
            opacity: dynamicOverlayOpacity,
            transition: 'opacity 0.2s ease',
          }}
        />
      </div>

      {/* Inhalt – zentriert, wie philippbacher.com */}
      <div className="container relative z-10 flex flex-col items-center text-center">
        <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 md:py-28">
          {hasTextContent && (
            <div
              className={`mb-10 transition-all duration-500 ease-out md:mb-12 ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {(headline || subheadline || description) ? (
                <>
                  {subheadline && (
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/80 sm:text-sm md:mb-5">
                      {subheadline}
                    </p>
                  )}
                  {headline && (
                    <h1 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:mb-8 md:text-5xl lg:text-[2.75rem] lg:leading-[1.15]">
                      {headline}
                    </h1>
                  )}
                  {description && (
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                      {description}
                    </p>
                  )}
                </>
              ) : (
                richText && (
                  <div className="prose prose-invert prose-lg max-w-none text-white">
                    <RichText data={richText} enableGutter={false} />
                  </div>
                )
              )}
            </div>
          )}

          {foregroundImage && typeof foregroundImage !== 'string' && (
            <div className="relative z-20 mx-auto mb-10 w-full max-w-2xl md:mb-12">
              <Media
                resource={foregroundImage}
                imgClassName="object-contain w-full h-auto"
              />
            </div>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <div
              className={`flex flex-wrap items-center justify-center gap-3 transition-all duration-500 ease-out delay-150 sm:gap-4 ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {links.map((linkItem, i) => {
                if (!linkItem?.link) return null
                const isOutline = linkItem.link.appearance === 'outline'
                return (
                  <CMSLink
                    key={i}
                    {...linkItem.link}
                    className={
                      isOutline
                        ? 'inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 min-w-[120px] sm:min-w-[140px]'
                        : 'inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-md transition-colors hover:bg-white/95 min-w-[120px] sm:min-w-[140px]'
                    }
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Dezenter Scroll-Hinweis */}
      <div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 opacity-30"
        aria-hidden
      >
        <div className="h-8 w-px bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
