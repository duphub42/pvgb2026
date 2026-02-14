import React from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const PhilippBacherHero: React.FC<Page['hero']> = (props) => {
  // Wir ziehen die Felder direkt aus props, falls sie existieren
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
  } = props as any // 'as any' hilft hier, falls die payload-types noch nicht aktualisiert sind

  return (
    <div className="relative flex items-center justify-center min-h-[90vh] text-white overflow-hidden">
      {/* HINTERGRUND (Bild oder Video) */}
      <div className="absolute inset-0 z-0">
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

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity ?? 0.5 }}
        />
      </div>

      {/* INHALT */}
      <div className="container relative z-10 flex flex-col items-center text-center pb-16 pt-32">
        {/* Subheadline */}
        {subheadline && (
          <span className="uppercase tracking-widest text-sm mb-4 font-bold text-gray-300">
            {subheadline}
          </span>
        )}

        {/* Headline */}
        {headline && (
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl">
            {headline}
          </h1>
        )}

        {/* Beschreibung */}
        {description && (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
            {description}
          </p>
        )}

        {/* Buttons / Links */}
        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {links.map(({ link }, i) => (
              <CMSLink key={i} {...link} />
            ))}
          </div>
        )}

        {/* Vordergrundbild */}
        {foregroundImage && typeof foregroundImage !== 'string' && (
          <div className="mt-12 w-full max-w-lg">
            <Media resource={foregroundImage} />
          </div>
        )}
      </div>
    </div>
  )
}
