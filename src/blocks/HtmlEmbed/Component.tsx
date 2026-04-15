'use client'

import type { HtmlEmbedBlock as HtmlEmbedBlockFields } from '@/payload-types'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'
import React from 'react'
import { BlockContainer } from '@/components/BlockContainer'

const STYLE_RE = /<style\b[^>]*>([\s\S]*?)<\/style>/gi

function splitMarkup(raw: string): { body: string; styles: string[] } {
  const styles: string[] = []
  const body = raw.replace(STYLE_RE, (_, css: string) => {
    styles.push(css.trim())
    return ''
  })
  return { body: body.trim(), styles }
}

type HtmlEmbedBlockComponentProps = HtmlEmbedBlockFields & {
  index?: number
}

/**
 * Rendert Admin-eingefügtes HTML; zieht <style>-Inhalte heraus, damit sie im Dokument gelten.
 * not-prose: Tailwind-Typography greift nicht in Custom-Markup ein.
 */
export function HtmlEmbedBlock(props: HtmlEmbedBlockComponentProps) {
  const { html, index = 0, ...styleProps } = props

  if (!html?.trim()) return null
  const { body, styles } = splitMarkup(html)

  // Style-Props direkt an BlockContainer übergeben
  const containerStyles = styleProps as unknown as BlockStyles

  return (
    <BlockContainer styles={containerStyles} index={index}>
      <div
        className="not-prose html-embed-block col-span-full max-w-full overflow-x-auto"
        data-html-embed
      >
        {styles.map((css, i) => (
          <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
        ))}
        {body ? (
          <div className="html-embed-block__markup" dangerouslySetInnerHTML={{ __html: body }} />
        ) : null}
      </div>
    </BlockContainer>
  )
}
