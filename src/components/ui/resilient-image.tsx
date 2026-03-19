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

  return (
    <img
      {...props}
      src={current}
      onError={(e) => {
        if (index < candidates.length - 1) {
          setIndex((i) => i + 1)
        } else {
          onError?.(e)
        }
      }}
    />
  )
}

