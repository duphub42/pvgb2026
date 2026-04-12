import type { HtmlEmbedBlock as HtmlEmbedBlockFields } from '@/payload-types'
import React from 'react'

const STYLE_RE = /<style\b[^>]*>([\s\S]*?)<\/style>/gi

function splitMarkup(raw: string): { body: string; styles: string[] } {
  const styles: string[] = []
  const body = raw.replace(STYLE_RE, (_, css: string) => {
    styles.push(css.trim())
    return ''
  })
  return { body: body.trim(), styles }
}

/**
 * Rendert Admin-eingefügtes HTML; zieht <style>-Inhalte heraus, damit sie im Dokument gelten.
 * not-prose: Tailwind-Typography greift nicht in Custom-Markup ein.
 */
export function HtmlEmbedBlock({ html }: Pick<HtmlEmbedBlockFields, 'html'>) {
  if (!html?.trim()) return null
  const { body, styles } = splitMarkup(html)

  return (
    <div
      className="not-prose html-embed-block col-span-full my-6 max-w-full overflow-x-auto"
      data-html-embed
    >
      {styles.map((css, i) => (
         
        <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      {body ? (
         
        <div className="html-embed-block__markup" dangerouslySetInnerHTML={{ __html: body }} />
      ) : null}
    </div>
  )
}
