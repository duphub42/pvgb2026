'use client'

import React from 'react'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getMediaUrlSafe } from '@/utils/media'

// -------------------------------
// Typdefinitionen für Props (Payload-kompatibel)
// -------------------------------
interface FloatingElement {
  label: string
  position: 'topLeft' | 'topRight' | 'midLeft' | 'midRight' | 'bottomLeft' | 'bottomRight'
  offsetX?: number | null
  offsetY?: number | null
  icon?: number | { url?: string | null; id?: number } | null
}

interface Logo {
  logo?: unknown
  alt?: string | null
}

interface LinkItem {
  link?: { url?: string; label?: string; appearance?: 'filled' | 'outline' }
}

export interface PhilippBacherHeroSimpleProps {
  subheadline?: string | null
  headline?: string | null
  headlineLine1?: string | null
  headlineLine2?: string | null
  headlineLine3?: string | null
  description?: string | null
  richText?: any
  links?: LinkItem[]
  foregroundImage?: { url?: string | null; id?: number } | null
  backgroundImage?: { url?: string | null } | null
  backgroundVideo?: { url?: string | null } | null
  floatingElements?: FloatingElement[]
  marqueeHeadline?: string | null
  marqueeLogos?: Logo[]
  overlayOpacity?: number | null
  mediaType?: 'halo' | 'animation' | 'orbit' | 'video' | 'image'
  mediaTypeMobile?: 'halo' | 'animation' | 'orbit' | 'video' | 'image' | 'auto'
  backgroundPreset?: string | null
}

const POSITION_CLASSES: Record<string, string> = {
  topLeft: 'top-10 left-10',
  topRight: 'top-10 right-10',
  midLeft: 'top-1/2 -translate-y-1/2 left-10',
  midRight: 'top-1/2 -translate-y-1/2 right-10',
  bottomLeft: 'bottom-10 left-10',
  bottomRight: 'bottom-10 right-10',
}

// -------------------------------
// Einfache Hero-Komponente (Copy-Paste-Referenz, Tailwind-only)
// -------------------------------
export const PhilippBacherHeroSimple: React.FC<PhilippBacherHeroSimpleProps> = ({
  subheadline,
  headline,
  headlineLine1,
  headlineLine2,
  headlineLine3,
  description,
  links,
  foregroundImage,
  backgroundImage,
  backgroundVideo,
  floatingElements,
  marqueeHeadline,
  marqueeLogos,
  overlayOpacity = 0.5,
}) => {
  const lines = [headlineLine1, headlineLine2, headlineLine3].filter(Boolean) as string[]
  const hasLines = lines.length >= 1
  const headlineText = hasLines ? undefined : headline

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-stretch overflow-hidden bg-neutral-950 text-white">
      {/* Hintergrundbild / Video */}
      {backgroundImage?.url && (
        <Image
          src={getMediaUrl(backgroundImage.url) || backgroundImage.url}
          alt=""
          fill
          className="object-cover -z-10"
        />
      )}
      {backgroundVideo?.url && (
        <video
          className="absolute inset-0 w-full h-full object-cover -z-20"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={getMediaUrl(backgroundVideo.url) || backgroundVideo.url} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black -z-[1]"
        style={{ opacity: Number(overlayOpacity) || 0.45 }}
        aria-hidden
      />

      {/* Haupt-Content: zentriert, max-width wie Referenz */}
      <div className="relative z-10 container max-w-6xl mx-auto px-4 md:px-6 py-20 lg:py-32 text-center md:text-left">
        {subheadline && (
          <p className="text-sm md:text-base uppercase tracking-widest text-white/80 mb-2">{subheadline}</p>
        )}
        {hasLines &&
          lines.map((line, idx) => (
            <h1 key={idx} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2">
              {line}
            </h1>
          ))}
        {headlineText && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2">{headlineText}</h1>
        )}
        {description && <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl">{description}</p>}

        {/* Links (Payload CMSLink-kompatibel) */}
        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {links.map((linkItem, idx) => {
              if (!linkItem?.link) return null
              const link = linkItem.link as { url?: string; label?: string; appearance?: string; newTab?: boolean; type?: string; reference?: unknown }
              const isOutline = link.appearance === 'outline'
              return (
                <CMSLink
                  key={idx}
                  {...link}
                  className={
                    isOutline
                      ? 'border border-white/80 text-white hover:bg-white hover:text-neutral-950 px-6 py-3 rounded-full font-medium transition'
                      : 'bg-white text-neutral-950 hover:bg-white/90 px-6 py-3 rounded-full font-medium transition'
                  }
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Vordergrundbild: unten rechts, wie Referenz */}
      {foregroundImage && getMediaUrlSafe(foregroundImage) && (
        <div className="absolute bottom-0 right-0 z-[2] w-full md:w-2/5 max-w-md flex justify-end items-end pointer-events-none">
          <Image
            src={getMediaUrlSafe(foregroundImage)}
            alt=""
            width={414}
            height={600}
            className="w-auto h-auto max-h-[85vh] object-contain object-bottom"
          />
        </div>
      )}

      {/* Floating Elements */}
      {Array.isArray(floatingElements) &&
        floatingElements.map((f, idx) => (
          <div
            key={idx}
            className={`absolute z-20 font-semibold bg-white/95 text-neutral-900 px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap ${POSITION_CLASSES[f.position] ?? 'bottom-10 right-10'}`}
            style={{
              transform: `translate(${f.offsetX ?? 0}px, ${f.offsetY ?? 0}px)`,
            }}
          >
            {f.label}
          </div>
        ))}

      {/* Marquee */}
      {(marqueeHeadline || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0)) && (
        <div className="absolute bottom-0 left-0 right-0 z-10 py-4 bg-neutral-900/80 backdrop-blur-sm flex items-center overflow-x-auto gap-6 px-4">
          {marqueeHeadline && (
            <span className="text-xs font-bold uppercase tracking-widest text-white/80 whitespace-nowrap shrink-0">
              {marqueeHeadline}
            </span>
          )}
          {Array.isArray(marqueeLogos) &&
            marqueeLogos.map((logo, idx) => {
              const url = logo?.logo != null ? getMediaUrlSafe(logo.logo) : ''
              if (!url) return null
              return (
                <img
                  key={idx}
                  src={url}
                  alt={logo?.alt ?? ''}
                  className="h-10 w-auto object-contain shrink-0 opacity-90"
                />
              )
            })}
        </div>
      )}
    </section>
  )
}
