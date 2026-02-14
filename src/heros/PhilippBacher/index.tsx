import React, { useEffect, useState, useRef } from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const PhilippBacherHero: React.FC<Page['hero']> = ({
  headline,
  subheadline,
  description,
  mediaType,
  backgroundImage,
  backgroundVideo,
  foregroundImage,
  overlayOpacity,
  links,
}) => {
  const [offsetY, setOffsetY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Parallax Scroll
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer für Fade-In
  useEffect(() => {
    if (!contentRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [contentRef])

  // Hilfsfunktion für staggered Delay
  const getDelay = (index: number) => ({
    transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
  })

  return (
    <div className="relative flex items-center justify-center min-h-[90vh] text-white overflow-hidden">
      {/* Hintergrund */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${offsetY * 0.3}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {mediaType === 'video' && backgroundVideo ? (
          <video
            src={backgroundVideo}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
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
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity || 0.5 }}
        />
      </div>

      {/* Inhalt + Vordergrund */}
      <div
        ref={contentRef}
        className="container relative z-10 flex flex-col items-center text-center pb-16 pt-32"
        style={{
          transform: `translateY(${offsetY * 0.1}px)`,
        }}
      >
        {/* Subheadline */}
        {subheadline && (
          <span
            className={`uppercase tracking-widest text-sm mb-4 font-bold text-gray-300 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={getDelay(0)}
          >
            {subheadline}
          </span>
        )}

        {/* Headline */}
        {headline && (
          <h1
            className={`text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={getDelay(1)}
          >
            {headline}
          </h1>
        )}

        {/* Beschreibung */}
        {description && (
          <p
            className={`text-lg md:text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={getDelay(2)}
          >
            {description}
          </p>
        )}

        {/* Buttons / Links */}
        {Array.isArray(links) && links.length > 0 && (
          <div
            className={`flex flex-col md:flex-row gap-4 justify-center transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={getDelay(3)}
          >
            {links.map(({ link }, i) => (
              <div key={i}>
                <CMSLink {...link} />
              </div>
            ))}
          </div>
        )}

        {/* Vordergrundbild */}
        {foregroundImage && typeof foregroundImage !== 'string' && (
          <div
            className={`mt-12 w-full max-w-lg transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ ...getDelay(4), transform: `translateY(${offsetY * 0.15}px)` }}
          >
            <Media resource={foregroundImage} />
          </div>
        )}
      </div>
    </div>
  )
}
