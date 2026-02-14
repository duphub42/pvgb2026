"use client"

import React, { useEffect, useState } from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const PhilippBacherHero: React.FC<Page['hero']> = (props) => {
  const {
    headline,
    subheadline,
    description,
    mediaType,
    backgroundImage,
    foregroundImage,
    backgroundVideo,
    overlayOpacity,
    links,
  } = props as any

  const [offset, setOffset] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => setOffset(window.pageYOffset)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parallax / Zoom Berechnungen
  const backgroundScale = 1 + Math.min(offset * 0.0005, 0.03)
  const backgroundBlur = Math.min(offset * 0.05, 4)
  const foregroundScale = 1 + Math.min(offset * 0.001, 0.07)
  const dynamicOverlayOpacity = Math.min((offset / 1000) + (overlayOpacity ?? 0.5), 0.8)

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] md:min-h-[90vh] text-white overflow-hidden bg-black">
      
      {/* HINTERGRUND */}
      <div
        className="absolute inset-0 z-0 origin-center transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${offset * 0.3}px) scale(${backgroundScale})`,
          filter: `blur(${backgroundBlur}px)`,
        }}
      >
        {mediaType === 'video' && backgroundVideo ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          backgroundImage &&
          typeof backgroundImage !== 'string' && (
            <Media
              resource={backgroundImage}
              fill
              imgClassName="object-cover w-full h-full"
              priority
            />
          )
        )}

        {/* Dynamisches Overlay + Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: 'black',
            opacity: dynamicOverlayOpacity,
            maskImage: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>

      {/* INHALT */}
      <div className="container relative z-10 flex flex-col items-center text-center px-4 md:px-0 pb-16 pt-24 md:pt-32">
        
        {/* Subheadline */}
        {subheadline && (
          <span
            className={`uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4 font-bold text-gray-300 transition-all duration-1000 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {subheadline}
          </span>
        )}

        {/* Headline */}
        {headline && (
          <h1
            className={`text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 max-w-3xl md:max-w-4xl transition-all duration-1000 delay-200 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {headline}
          </h1>
        )}

        {/* Beschreibung */}
        {description && (
          <p
            className={`text-sm md:text-lg lg:text-xl text-gray-200 max-w-xl md:max-w-2xl mb-6 md:mb-10 leading-relaxed transition-all duration-1000 delay-500 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {description}
          </p>
        )}

        {/* Buttons / Links */}
        {Array.isArray(links) && links.length > 0 && (
          <div
            className={`flex flex-col md:flex-row gap-3 md:gap-5 justify-center w-full max-w-md md:max-w-2xl transition-all duration-1000 delay-700 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {links.map(({ link }, i) => (
              <CMSLink key={i} {...link} className="w-full md:w-auto" />
            ))}
          </div>
        )}

        {/* Vordergrundbild mit Parallax/Zoom */}
        {foregroundImage && typeof foregroundImage !== 'string' && (
          <div
            className="mt-8 md:mt-12 w-full max-w-xs md:max-w-lg origin-center transition-transform duration-500"
            style={{ transform: `translateY(${offset * 0.2}px) scale(${foregroundScale})` }}
          >
            <Media resource={foregroundImage} />
          </div>
        )}
      </div>
    </div>
  )
}
