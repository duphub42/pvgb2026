'use client'

import React, { useCallback, useMemo } from 'react'
import { useField } from '@payloadcms/ui'

import { toHex } from './colorUtils'

import './styles.scss'

type ColorPickerProps = {
  path: string
  field: { label?: string; required?: boolean; admin?: { description?: string } }
}

/**
 * Zentrales Farbfeld für das Design-Global: Color Picker + Texteingabe.
 * Akzeptiert Hex (#fff, #ffffff), rgb(r,g,b) und hsl(h,s%,l%) als gespeicherten Wert.
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({ path, field }) => {
  const { value, setValue } = useField<string>({ path })

  const stringValue = value != null ? String(value).trim() : ''
  const hexForPicker = useMemo(() => toHex(value) ?? '#000000', [value])

  const handleColorInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    [setValue],
  )

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value || '')
    },
    [setValue],
  )

  const label = field?.label ?? 'Farbe'
  const required = field?.required === true
  const description = field?.admin?.description

  return (
    <div className="color-picker-field">
      {(label || required) && (
        <label className="color-picker-field__label">
          {label}
          {required && <span className="color-picker-field__required">*</span>}
        </label>
      )}
      {description && <p className="color-picker-field__description">{description}</p>}
      <div className="color-picker-field__inputs">
        <input
          type="color"
          className="color-picker-field__swatch"
          value={hexForPicker}
          onChange={handleColorInputChange}
          aria-label={`${label} (Farbwähler)`}
        />
        <input
          type="text"
          className="color-picker-field__text"
          value={stringValue}
          onChange={handleTextChange}
          placeholder="Hex, rgb() oder hsl()"
          aria-label={`${label} (Wert)`}
        />
      </div>
    </div>
  )
}

export default ColorPicker
