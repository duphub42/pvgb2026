"use client"

import React, { useEffect, useState } from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { RichText } from '@/components/RichText'

/**
 * PhilippBacherHero: 
 * Nutzt die Felder 'richText', 'media' und 'links' aus der Payload-Config.
 * Inklusive Parallax- und Blur-Effekten beim Scrollen.
 */
export const PhilippBacherHero: React.FC<any> = (props) => {
  // Hooks für Scroll-Effekte
  const [offset, setOffset] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => setOffset(window.pageYOffset)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Sicherheitscheck: Wenn keine Props da sind, nichts rendern
  if (!props) return null

  // Felder aus der Payload Hero-Config (heros/config.ts)
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

  // Hintergrund: neues Schema (backgroundImage/backgroundVideo) oder Fallback auf media
  const backgroundMedia =
    mediaType === 'video' && backgroundVideo
      ? backgroundVideo
      : (backgroundImage || media)

  const hasTextContent = headline || subheadline || description || richText

  // Parallax / Zoom Berechnungen
  const currentOffset = offset || 0
  const backgroundScale = 1 + Math.min(currentOffset * 0.0005, 0.05)
  const backgroundBlur = Math.min(currentOffset * 0.05, 5)
  const dynamicOverlayOpacity = Math.min((currentOffset / 1000) + overlayOpacity, 0.8)

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] md:min-h-[95vh] text-white overflow-hidden bg-black">
      
      {/* HINTERGRUND-LAYER (Parallax) */}
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

      {/* INHALT-LAYER */}
      <div className="container relative z-10 flex flex-col items-center text-center px-4 md:px-0 pb-16 pt-24">
        
        {/* Headline / Subheadline / Description (neues Schema) oder RichText */}
        {hasTextContent && (
          <div
            className={`prose prose-invert max-w-4xl mb-8 transition-all duration-1000 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {(headline || subheadline || description) ? (
              <>
                {subheadline && (
                  <p className="text-lg md:text-xl opacity-90 mb-2">{subheadline}</p>
                )}
                {headline && (
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{headline}</h1>
                )}
                {description && (
                  <p className="text-base md:text-lg max-w-2xl mx-auto">{description}</p>
                )}
              </>
            ) : (
              richText && <RichText content={richText} enableGutter={false} />
            )}
          </div>
        )}

        {/* Vordergrund-Bild (optional) */}
        {foregroundImage && typeof foregroundImage !== 'string' && (
          <div className="relative z-20 w-full max-w-2xl mx-auto mb-8">
            <Media
              resource={foregroundImage}
              imgClassName="object-contain w-full h-auto"
            />
          </div>
        )}

        {/* Buttons / Links */}
        {Array.isArray(links) && links.length > 0 && (
          <div
            className={`flex flex-col md:flex-row gap-4 justify-center w-full transition-all duration-1000 delay-500 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {links.map((linkItem, i) => {
              if (!linkItem?.link) return null
              return (
                <CMSLink 
                  key={i} 
                  {...linkItem.link} 
                  className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-opacity-90 transition-all shadow-xl" 
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Optional: Scroll-Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white to-transparent" />
      </div>
    </div>
  )
}
