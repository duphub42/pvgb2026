"use client"

import React, { useEffect, useState } from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

/**
 * PhilippBacherHero – Aufbau wie philippbacher.com:
 * Subheadline (Tagline) → Headline → optional Description → zwei CTAs (primär + Outline).
 * Parallax- und Blur-Effekte beim Scrollen.
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
    overlayOpacity = 0.4,
  } = props

  const backgroundMedia =
    mediaType === 'video' && backgroundVideo
      ? backgroundVideo
      : (backgroundImage || media)

  const hasTextContent = headline || subheadline || description || richText

  const currentOffset = offset || 0
  const backgroundScale = 1 + Math.min(currentOffset * 0.0005, 0.05)
  const backgroundBlur = Math.min(currentOffset * 0.05, 5)
  const dynamicOverlayOpacity = Math.min((currentOffset / 1000) + overlayOpacity, 0.8)

  const baseButtonClass =
    'px-6 py-3 font-semibold rounded-full transition-all duration-200 min-w-[140px]'
  const primaryButtonClass =
    'bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl'
  const outlineButtonClass =
    'border-2 border-white bg-transparent text-white hover:bg-white/10'

  return (
    <section
      className="relative flex items-center justify-center min-h-[85vh] md:min-h-[92vh] text-white overflow-hidden bg-black"
      aria-label="Hero"
    >
      {/* Hintergrund (Parallax) */}
      <div
        className="absolute inset-0 z-0 origin-center transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${currentOffset * 0.3}px) scale(${backgroundScale})`,
          filter: `blur(${backgroundBlur}px)`,
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
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: 'black',
            opacity: dynamicOverlayOpacity,
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>

      {/* Inhalt – zentriert wie philippbacher.com */}
      <div className="container relative z-10 flex flex-col items-center text-center px-4 md:px-6 pb-20 pt-28 md:pt-32">
        {hasTextContent && (
          <div
            className={`max-w-4xl mb-10 md:mb-12 transition-all duration-700 ease-out ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {(headline || subheadline || description) ? (
              <>
                {subheadline && (
                  <p className="text-sm md:text-base tracking-wide opacity-90 mb-3 md:mb-4">
                    {subheadline}
                  </p>
                )}
                {headline && (
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
                    {headline}
                  </h1>
                )}
                {description && (
                  <p className="text-base md:text-lg max-w-2xl mx-auto text-white/90 leading-relaxed">
                    {description}
                  </p>
                )}
              </>
            ) : (
              richText && (
                <div className="prose prose-invert max-w-none">
                  <RichText data={richText} enableGutter={false} />
                </div>
              )
            )}
          </div>
        )}

        {foregroundImage && typeof foregroundImage !== 'string' && (
          <div className="relative z-20 w-full max-w-2xl mx-auto mb-8">
            <Media
              resource={foregroundImage}
              imgClassName="object-contain w-full h-auto"
            />
          </div>
        )}

        {Array.isArray(links) && links.length > 0 && (
          <div
            className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center transition-all duration-700 ease-out delay-300 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {links.map((linkItem, i) => {
              if (!linkItem?.link) return null
              const isOutline = linkItem.link.appearance === 'outline'
              return (
                <CMSLink
                  key={i}
                  {...linkItem.link}
                  className={`${baseButtonClass} ${
                    isOutline ? outlineButtonClass : primaryButtonClass
                  }`}
                />
              )
            })}
          </div>
        )}
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40"
        aria-hidden
      >
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
