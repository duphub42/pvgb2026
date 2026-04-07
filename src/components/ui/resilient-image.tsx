'use client'

import React from 'react'

import { getMediaUrlCandidates } from '@/utilities/mediaUrlCandidates'

type ResilientImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src?: string | null
}

export function ResilientImage({ src, onError, ...props }: ResilientImageProps) {
  const candidates = React.useMemo(() => getMediaUrlCandidates(src), [src])
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    setIndex(0)
  }, [src])

  const current = candidates[index] ?? src ?? ''

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (index < candidates.length - 1) {
      setIndex((i) => i + 1)
      return
    }

    const maybePromise = onError?.(e)
    if (maybePromise && typeof (maybePromise as Promise<unknown>)?.catch === 'function') {
      ;(maybePromise as Promise<unknown>).catch((error) => {
        console.error('[ResilientImage] onError promise rejected:', error)
      })
    }
  }

  return <img {...props} src={current} onError={handleError} />
}
