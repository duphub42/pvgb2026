'use client'

import React, { useEffect, useState } from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const FALLBACK_LOGO_SRC =
  'https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'

export function AdminLogo() {
  const [logoSrc, setLogoSrc] = useState<string>(FALLBACK_LOGO_SRC)

  useEffect(() => {
    let cancelled = false
    const base =
      typeof window !== 'undefined'
        ? `${window.location.origin}`
        : ''
    fetch(`${base}/api/globals/header?depth=1`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { logo?: { url?: string; updatedAt?: string } | null }) => {
        if (cancelled || !data?.logo || typeof data.logo !== 'object' || !data.logo.url) return
        const url = getMediaUrl(data.logo.url, data.logo.updatedAt)
        if (url) setLogoSrc(url)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <img
      src={logoSrc}
      alt="Logo"
      width={130}
      height={30}
      style={{ display: 'block', maxHeight: '30px', width: 'auto', objectFit: 'contain' }}
    />
  )
}

export default AdminLogo
