'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import {
  CAL_BOOKING_OPEN_EVENT,
  DEFAULT_CAL_LINK,
  type CalBookingOpenDetail,
} from '@/utilities/webmcp/calEmbed'

type PanelProps = {
  open: boolean
  calLink: string
  onOpenChange: (open: boolean) => void
}

export function CalBookingDialogHost() {
  const [open, setOpen] = useState(false)
  const [calLink, setCalLink] = useState(DEFAULT_CAL_LINK)
  const [Panel, setPanel] = useState<ComponentType<PanelProps> | null>(null)
  const loadingRef = useRef(false)

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<CalBookingOpenDetail>).detail
      const nextLink =
        typeof detail?.calLink === 'string' && detail.calLink.trim().length > 0
          ? detail.calLink.trim()
          : DEFAULT_CAL_LINK
      setCalLink(nextLink)
      setOpen(true)

      if (loadingRef.current) return
      loadingRef.current = true
      void import('./CalBookingDialogPanel')
        .then((mod) => {
          setPanel(() => mod.CalBookingDialogPanel)
        })
        .catch(() => {
          loadingRef.current = false
        })
    }

    window.addEventListener(CAL_BOOKING_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(CAL_BOOKING_OPEN_EVENT, onOpen)
  }, [])

  if (!Panel) return null

  return <Panel open={open} calLink={calLink} onOpenChange={setOpen} />
}
