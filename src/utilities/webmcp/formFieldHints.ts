type WebMcpFieldLike = {
  blockType: string
  name: string
  label?: string | null
  placeholder?: string | null
}

export const PHONE_FIELD_PATTERN = /phone|telefon|tel|ruf|nummer/i

export function getWebMcpFieldParamDescription(field: WebMcpFieldLike): string | undefined {
  const label = field.label?.trim()
  const placeholder = field.placeholder?.trim()
  const name = field.name.trim()

  if (field.blockType === 'checkbox') {
    return label || 'Bestätigung der Datenschutzbestimmungen vor dem Absenden.'
  }

  if (field.blockType === 'email') {
    return label || placeholder || 'E-Mail-Adresse für Rückfragen.'
  }

  if (PHONE_FIELD_PATTERN.test(name) || PHONE_FIELD_PATTERN.test(label ?? '')) {
    return 'Telefonnummer für den Rückruf, z. B. +49 151 23456789.'
  }

  if (field.blockType === 'textarea') {
    return label || placeholder || 'Zusätzliche Nachricht oder Kontext für den Rückruf.'
  }

  if (label) return label
  if (placeholder) return placeholder

  return undefined
}

export function getWebMcpFieldInputProps(field: WebMcpFieldLike): Record<string, string> {
  const description = getWebMcpFieldParamDescription(field)
  return description ? { toolparamdescription: description } : {}
}
