'use client'
import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'
import { CopyButton } from './CopyButton'
import { cn } from '@/utilities/ui'

type Props = {
  code: string
  language?: string
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(() => {
    if (typeof document === 'undefined') return true
    const explicitTheme = document.documentElement.getAttribute('data-theme')
    if (explicitTheme === 'dark') return true
    if (explicitTheme === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  React.useEffect(() => {
    const readTheme = () => {
      const explicitTheme = document.documentElement.getAttribute('data-theme')
      if (explicitTheme === 'dark') return true
      if (explicitTheme === 'light') return false
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    const applyTheme = () => setIsDarkTheme(readTheme())
    applyTheme()

    const observer = new MutationObserver((records) => {
      if (!records.some((record) => record.attributeName === 'data-theme')) return
      applyTheme()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  if (!code) return null

  return (
    <Highlight code={code} language={language} theme={isDarkTheme ? themes.vsDark : themes.vsLight}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre
          className={cn(
            'overflow-x-auto rounded border border-border p-4 text-xs',
            isDarkTheme ? 'bg-black text-zinc-100' : 'bg-zinc-50 text-zinc-900',
          )}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ className: 'table-row', line })}>
              <span
                className={cn(
                  'table-cell select-none text-right',
                  isDarkTheme ? 'text-white/25' : 'text-zinc-500',
                )}
              >
                {i + 1}
              </span>
              <span className="table-cell pl-4">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
          <CopyButton code={code} />
        </pre>
      )}
    </Highlight>
  )
}
