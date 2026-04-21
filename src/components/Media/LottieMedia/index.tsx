'use client'

import React, { useEffect, useMemo, useState } from 'react'
import type { Props as MediaProps } from '../types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useTheme } from '@/providers/Theme'

const LOTTIE_PLAYER_SRC =
  'https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@1.6.0/dist/lottie-player.js'

function resolveLottieUrl(resource?: MediaProps['resource'] | string | number | null): string | null {
  if (!resource) return null

  if (typeof resource === 'string' || typeof resource === 'number') {
    return getMediaUrl(String(resource))
  }

  if (typeof resource === 'object' && resource !== null && 'url' in resource) {
    return getMediaUrl(String(resource.url ?? ''))
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
  const chosenResource = useMemo(
    () => resolveThemeResource(resource, themeResource, theme),
    [resource, themeResource, theme],
  )
  const src = useMemo(() => resolveLottieUrl(chosenResource), [chosenResource])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    if (!src) return

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
  }, [src])

  if (!src) return null

  return (
    <div className={className} onClick={onClick}>
      {loaded
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
