'use client'

import dynamic from 'next/dynamic'
import { CalBookingDialogHost } from '@/components/CalBookingDialog/CalBookingDialogHost'

const WebMCPTools = dynamic(
  () => import('@/components/WebMCP/WebMCPTools').then((mod) => mod.WebMCPTools),
  { ssr: false },
)

/**
 * Thin Cal host mounts immediately (event listener only).
 * WebMCP tools load after hydration so they stay off the LCP path.
 */
export function DeferredSiteTools() {
  return (
    <>
      <CalBookingDialogHost />
      <WebMCPTools />
    </>
  )
}
