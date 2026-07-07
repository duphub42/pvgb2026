import type React from 'react'

export function getBlockBackgroundImageStyle(
  backgroundImageUrl: string,
  placement: 'cover' | 'top-right' = 'cover',
): React.CSSProperties {
  const escapedUrl = backgroundImageUrl.replace(/"/g, '\\"')

  if (placement === 'top-right') {
    return {
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      backgroundImage: `url("${escapedUrl}")`,
    }
  }

  return {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    backgroundImage: `url("${escapedUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
}
