'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  generateCssString,
  generateJsonTheme,
  generateShadcnTokens,
  type ShadcnTokenSet,
} from '@/utils/themeGenerator'

const API = '/api/globals/theme-settings'

export type ThemeSettingsData = {
  primaryColor?: string
  primaryMatchesBase?: boolean
  themeMode?: 'light' | 'dark' | null
  generatedTheme?: unknown
  cssString?: string
  updatedAt?: string
} | null

const defaultPrimary = '#3B82F6'

function tokensToCssVars(tokens: ShadcnTokenSet): React.CSSProperties {
  const style: Record<string, string> = {}
  for (const [key, value] of Object.entries(tokens)) {
    style[`--${key}`] = value
  }
  return style as React.CSSProperties
}

export function ThemeGeneratorClient({ initialData }: { initialData: ThemeSettingsData }) {
  const [primaryHex, setPrimaryHex] = useState(
    () => initialData?.primaryColor || defaultPrimary,
  )
  const [primaryMatchesBase, setPrimaryMatchesBase] = useState(
    () => Boolean(initialData?.primaryMatchesBase),
  )
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
    () => initialData?.themeMode || 'light',
  )
  const [saving, setSaving] = useState(false)
  const [copyLabel, setCopyLabel] = useState<'Copy CSS' | 'Copy JSON' | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const normalizedHex = primaryHex.startsWith('#') ? primaryHex : `#${primaryHex}`
  const tokens = generateShadcnTokens(normalizedHex, themeMode, primaryMatchesBase)
  const previewStyle = tokensToCssVars(tokens)

  const saveTheme = useCallback(async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          primaryColor: normalizedHex,
          primaryMatchesBase,
          themeMode,
        }),
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || res.statusText)
      }
      setMessage('Theme gespeichert.')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Fehler beim Speichern.')
    } finally {
      setSaving(false)
    }
  }, [normalizedHex, primaryMatchesBase, themeMode])

  const copyCss = useCallback(() => {
    const css = generateCssString(normalizedHex, primaryMatchesBase)
    void navigator.clipboard.writeText(css).then(() => {
      setCopyLabel('Copy CSS')
      setMessage('CSS in Zwischenablage kopiert.')
      setTimeout(() => setCopyLabel(null), 2000)
    })
  }, [normalizedHex, primaryMatchesBase])

  const copyJson = useCallback(() => {
    const json = JSON.stringify(generateJsonTheme(normalizedHex, primaryMatchesBase), null, 2)
    void navigator.clipboard.writeText(json).then(() => {
      setCopyLabel('Copy JSON')
      setMessage('JSON in Zwischenablage kopiert.')
      setTimeout(() => setCopyLabel(null), 2000)
    })
  }, [normalizedHex, primaryMatchesBase])

  return (
    <div className="pvgb-theme-generator space-y-8 p-6 max-w-4xl">
      <h1 className="text-2xl font-semibold">Theme Colors</h1>
      <p className="text-muted-foreground">
        Eine Primary Color setzen – alle shadcn/ui Theme-Tokens werden daraus abgeleitet.
      </p>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={primaryMatchesBase}
            onChange={(e) => setPrimaryMatchesBase(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          <span className="text-sm font-medium">Primary = Base (Neutral)</span>
        </label>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Primary Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={normalizedHex}
              onChange={(e) => setPrimaryHex(e.target.value)}
              disabled={primaryMatchesBase}
              className="h-10 w-14 cursor-pointer rounded border border-input bg-background disabled:opacity-50"
            />
            <input
              type="text"
              value={primaryHex}
              onChange={(e) => setPrimaryHex(e.target.value)}
              placeholder="#3B82F6"
              disabled={primaryMatchesBase}
              className="h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Vorschau-Modus</label>
          <select
            value={themeMode}
            onChange={(e) => setThemeMode(e.target.value as 'light' | 'dark')}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="light">Hell</option>
            <option value="dark">Dunkel</option>
          </select>
        </div>
        <button
          type="button"
          onClick={saveTheme}
          disabled={saving}
          className="h-10 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          style={previewStyle}
        >
          {saving ? 'Speichern…' : 'Theme speichern'}
        </button>
        <button
          type="button"
          onClick={copyCss}
          className="h-10 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          style={previewStyle}
        >
          Copy CSS Variables
        </button>
        <button
          type="button"
          onClick={copyJson}
          className="h-10 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          style={previewStyle}
        >
          Copy JSON
        </button>
      </div>

      {message && (
        <p className="text-sm text-muted-foreground" role="status">
          {message}
        </p>
      )}

      <div>
        <h2 className="mb-3 text-lg font-medium">Live-Vorschau (shadcn-Style)</h2>
        <div
          className="rounded-lg border p-6 min-h-[200px]"
          style={{
            ...previewStyle,
            background: `hsl(${tokens.background})`,
            color: `hsl(${tokens.foreground})`,
          }}
        >
          <div className="space-y-4">
            <div
              className="rounded-lg border p-4 shadow-sm"
              style={{
                background: `hsl(${tokens.card})`,
                color: `hsl(${tokens['card-foreground']})`,
                borderColor: `hsl(${tokens.border})`,
              }}
            >
              <h3 className="text-lg font-semibold">Card</h3>
              <p className="text-sm opacity-80">Karteninhalt mit primary Button und Badge.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className="inline-flex items-center rounded-md px-3 py-1 text-sm font-medium"
                  style={{
                    background: `hsl(${tokens.primary})`,
                    color: `hsl(${tokens['primary-foreground']})`,
                  }}
                >
                  Primary Button
                </span>
                <span
                  className="inline-flex items-center rounded-md px-3 py-1 text-sm font-medium"
                  style={{
                    background: `hsl(${tokens.secondary})`,
                    color: `hsl(${tokens['secondary-foreground']})`,
                  }}
                >
                  Badge
                </span>
                <span
                  className="inline-flex items-center rounded-md px-3 py-1 text-sm font-medium"
                  style={{
                    background: `hsl(${tokens.destructive})`,
                    color: `hsl(${tokens['destructive-foreground']})`,
                  }}
                >
                  Destructive
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Input"
                readOnly
                className="rounded-md border px-3 py-2 text-sm"
                style={{
                  background: `hsl(${tokens.background})`,
                  borderColor: `hsl(${tokens.input})`,
                  color: `hsl(${tokens.foreground})`,
                }}
              />
              <button
                type="button"
                className="rounded-md px-4 py-2 text-sm font-medium"
                style={{
                  background: `hsl(${tokens.primary})`,
                  color: `hsl(${tokens['primary-foreground']})`,
                }}
              >
                Button
              </button>
            </div>
            <div
              className="rounded-lg border px-4 py-3 text-sm"
              style={{
                background: `hsl(${tokens.muted})`,
                color: `hsl(${tokens['muted-foreground']})`,
                borderColor: `hsl(${tokens.border})`,
              }}
            >
              <strong>Alert / Muted:</strong> Hinweistext mit abgesetzter Hintergrundfarbe.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
