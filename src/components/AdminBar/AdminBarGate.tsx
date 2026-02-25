'use client'

import dynamic from 'next/dynamic'
import React from 'react'

import type { PayloadAdminBarProps } from '@payloadcms/admin-bar'

/** Lädt die AdminBar nur bei aktivem Preview/Draft – spart ~100+ KB Script für normale Besucher. */
const PayloadAdminBarDynamic = dynamic(
  () => import('./AdminBarInner').then((m) => m.AdminBarInner),
  { ssr: false },
)

export const AdminBarGate: React.FC<{
  preview: boolean
  adminBarProps?: PayloadAdminBarProps
}> = ({ preview, adminBarProps }) => {
  if (!preview) return null
  return <PayloadAdminBarDynamic adminBarProps={adminBarProps} />
}
