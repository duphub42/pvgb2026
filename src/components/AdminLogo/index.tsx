import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getMediaUrl } from '@/utilities/getMediaUrl'

/** Eigenes Logo – Admin (Login etc.), wenn im Header-Global kein Logo gesetzt ist. */
const FALLBACK_LOGO_SRC = '/media/weblogo-philippbacher.svg'

export const AdminLogo: React.FC = async () => {
  let logoSrc = FALLBACK_LOGO_SRC

  try {
    const payload = await getPayload({ config: configPromise })
    const header = await payload.findGlobal({
      slug: 'header',
      depth: 1,
    })
    const logo = header?.logo
    if (logo && typeof logo === 'object' && logo !== null && 'url' in logo && logo.url) {
      logoSrc = getMediaUrl(logo.url, (logo as { updatedAt?: string }).updatedAt) || logoSrc
    }
  } catch {
    // Keep default logo if fetch fails (e.g. no DB on build)
  }

  return (
    <img
      src={logoSrc}
      alt="Philipp Bacher"
      width={130}
      height={30}
      style={{ display: 'block', maxHeight: '30px', width: 'auto', objectFit: 'contain' }}
    />
  )
}

export default AdminLogo
