'use client'

import React, { useEffect, useState } from 'react'

const FALLBACK_LOGO_SRC =
  'https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'

function buildLogoUrl(url: string | null | undefined, base?: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const origin = base ?? (typeof window !== 'undefined' ? window.location.origin : '')
  return origin ? `${origin.replace(/\/$/, '')}${url}` : url
}

export const AdminLogoClient: React.FC = () => {
  const [logoSrc, setLogoSrc] = useState<string>(FALLBACK_LOGO_SRC)

  useEffect(() => {
    let cancelled = false
    fetch('/api/globals/header?depth=1')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { logo?: { url?: string } } | null) => {
        if (cancelled || !data?.logo || typeof data.logo !== 'object') return
        const url = (data.logo as { url?: string }).url
        if (url) {
          setLogoSrc(buildLogoUrl(url))
        }
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

export default AdminLogoClient
