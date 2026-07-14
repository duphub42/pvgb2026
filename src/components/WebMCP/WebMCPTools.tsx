'use client'

import { useEffect } from 'react'
import { DEFAULT_CAL_LINK, openCalBookingModal } from '@/utilities/webmcp/calEmbed'
import { registerWebMcpTool } from '@/utilities/webmcp/modelContext'

export function WebMCPTools() {
  useEffect(() => {
    let unregisterBookingTool: (() => void) | undefined
    let cancelled = false

    const registerTools = async () => {
      unregisterBookingTool = await registerWebMcpTool({
        name: 'book_consultation',
        description:
          'Open the Cal.com booking modal for a project consultation with Philipp Bacher (default: 30 minutes).',
        inputSchema: {
          type: 'object',
          properties: {
            calLink: {
              type: 'string',
              description:
                'Optional Cal.com booking path, e.g. philippbacher/30min. Defaults to the site booking link.',
            },
          },
        },
        execute: async (input) => {
          const requestedCalLink =
            typeof input.calLink === 'string' && input.calLink.trim().length > 0
              ? input.calLink.trim()
              : DEFAULT_CAL_LINK

          const result = await openCalBookingModal(requestedCalLink)
          return JSON.stringify(result)
        },
      })

      if (cancelled) {
        unregisterBookingTool?.()
      }
    }

    void registerTools()

    return () => {
      cancelled = true
      unregisterBookingTool?.()
    }
  }, [])

  return null
}
