'use client'

import { useEffect } from 'react'
import { DEFAULT_CAL_LINK, openCalBookingModal } from '@/utilities/webmcp/calEmbed'
import { registerWebMcpTool } from '@/utilities/webmcp/modelContext'
import { executePriceCalculatorTool } from '@/utilities/webmcp/priceCalculatorTool'
import { runSiteSearchTool } from '@/utilities/webmcp/siteSearch'

export function WebMCPTools() {
  useEffect(() => {
    const unregisterCallbacks: Array<(() => void) | undefined> = []
    let cancelled = false

    const registerTools = async () => {
      unregisterCallbacks.push(
        await registerWebMcpTool({
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
        }),
      )

      unregisterCallbacks.push(
        await registerWebMcpTool({
          name: 'search_site',
          description:
            'Search philippbacher.com for pages and blog posts. Optionally opens the site search dialog or navigates to the search results page.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search phrase, e.g. webdesign, portfolio, seo.',
              },
              openDialog: {
                type: 'boolean',
                description: 'Open the header search dialog (Cmd/Ctrl+K) with the query prefilled.',
              },
              navigate: {
                type: 'boolean',
                description: 'Navigate to /search?q=... instead of opening the dialog.',
              },
            },
            required: ['query'],
          },
          execute: runSiteSearchTool,
        }),
      )

      unregisterCallbacks.push(
        await registerWebMcpTool({
          name: 'calculate_price',
          description:
            'Estimate project pricing from the philippbacher.com price calculator. Without items, returns the full catalog. With items or itemTitles, returns once/monthly totals.',
          inputSchema: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                description: 'Price calculator item IDs to include in the estimate.',
                items: { type: 'string' },
              },
              itemTitles: {
                type: 'array',
                description: 'Price calculator item titles to include in the estimate.',
                items: { type: 'string' },
              },
              applyToUi: {
                type: 'boolean',
                description:
                  'When true and the price calculator is visible on /preise, apply the selection in the UI.',
              },
            },
          },
          execute: executePriceCalculatorTool,
        }),
      )

      if (cancelled) {
        for (const unregister of unregisterCallbacks) {
          unregister?.()
        }
      }
    }

    void registerTools()

    return () => {
      cancelled = true
      for (const unregister of unregisterCallbacks) {
        unregister?.()
      }
    }
  }, [])

  return null
}
