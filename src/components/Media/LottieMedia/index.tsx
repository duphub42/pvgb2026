'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { Props as MediaProps } from '../types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useTheme } from '@/providers/Theme'

const LOTTIE_PLAYER_SRC =
  'https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@1.6.0/dist/lottie-player.js'

function resolveLottieUrl(resource?: MediaProps['resource'] | string | number | null): string | null {
  if (!resource) return null

  if (typeof resource === 'number') {
    return getMediaUrl(`/api/media/stream/${resource}`)
  }

  if (typeof resource === 'string') {
    const trimmed = resource.trim()
    if (/^\d+$/.test(trimmed)) {
      return getMediaUrl(`/api/media/stream/${trimmed}`)
    }
    return getMediaUrl(trimmed)
  }

  if (typeof resource === 'object' && resource !== null) {
    if ('id' in resource && resource.id != null) {
      return getMediaUrl(`/api/media/stream/${String(resource.id)}`)
    }
    if ('url' in resource && typeof resource.url === 'string' && resource.url.trim()) {
      return getMediaUrl(resource.url)
    }
    if ('filename' in resource && typeof resource.filename === 'string' && resource.filename.trim()) {
      return getMediaUrl(`/media/${encodeURIComponent(resource.filename)}`)
    }
  }

  return null
}

function resolveThemeResource(
  resource: MediaProps['resource'],
  themeResource?: MediaProps['themeResource'],
  theme?: 'light' | 'dark' | null,
) {
  if (!themeResource) return resource

  const targetTheme = theme === 'dark' ? 'dark' : 'light'
  return themeResource[targetTheme] ?? themeResource.light ?? themeResource.dark ?? resource
}

async function loadLottiePlayerScript(): Promise<void> {
  if (typeof document === 'undefined') return
  if (document.querySelector('script[data-lottie-player]')) return

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('src', LOTTIE_PLAYER_SRC)
    script.setAttribute('data-lottie-player', 'true')
    script.async = true
    script.onload = () => resolve()
    script.onerror = (event) => reject(new Error(`Failed to load lottie-player script: ${event}`))
    document.head.appendChild(script)
  })
}

export const LottieMedia: React.FC<MediaProps> = ({ className, onClick, resource, themeResource }) => {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chosenResource = useMemo(
    () => resolveThemeResource(resource, themeResource, theme),
    [resource, themeResource, theme],
  )
  const src = useMemo(() => resolveLottieUrl(chosenResource), [chosenResource])
  const [isInView, setIsInView] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!src) return

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true)
      return
    }

    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [src])

  useEffect(() => {
    let mounted = true
    if (!src || !isInView) return

    loadLottiePlayerScript()
      .then(() => {
        if (mounted) setLoaded(true)
      })
      .catch((error) => {
        console.error(error)
      })

    return () => {
      mounted = false
    }
  }, [src, isInView])

  if (!src) return null

  return (
    <div className={className} onClick={onClick} ref={containerRef}>
      {loaded && isInView
        ? React.createElement('lottie-player', {
            src,
            background: 'transparent',
            speed: '1',
            loop: true,
            autoplay: true,
            style: { width: '100%', height: '100%' },
          })
        : null}
    </div>
  )
}
