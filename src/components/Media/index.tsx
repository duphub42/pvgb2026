import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { LottieMedia } from './LottieMedia'
import { VideoMedia } from './VideoMedia'

function isLottieResource(resource: Props['resource']): boolean {
  if (!resource) return false

  if (typeof resource === 'string') {
    return resource.toLowerCase().endsWith('.json')
  }

  if (typeof resource === 'object' && resource !== null) {
    const mimeType = String(resource.mimeType ?? '').toLowerCase()
    const url = String(resource.url ?? '').toLowerCase()

    return mimeType.includes('json') || url.endsWith('.json')
  }

  return false
}

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource, themeResource } = props

  if (!resource && !themeResource) {
    return null
  }

  const isVideo = resource && typeof resource === 'object' && 'mimeType' in resource && resource?.mimeType?.includes('video')
  const isLottie = isLottieResource(resource) || Boolean(themeResource)
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isLottie ? <LottieMedia {...props} /> : isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
