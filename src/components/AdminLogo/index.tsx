'use client'

import React from 'react'

/** Eigenes Logo – Admin. Synchrone Client-Komponente, damit das Admin-UI nicht nach dem ersten Render weiß wird (kein async RSC im Admin-Tree). */
const FALLBACK_LOGO_SRC = '/media/weblogo-philippbacher.svg'

export const AdminLogo: React.FC = () => {
  return (
    <img
      src={FALLBACK_LOGO_SRC}
      alt="Philipp Bacher"
      width={130}
      height={30}
      style={{ display: 'block', maxHeight: '30px', width: 'auto', objectFit: 'contain' }}
    />
  )
}

export default AdminLogo
