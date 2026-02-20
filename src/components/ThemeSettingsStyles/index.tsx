import React from 'react'

type ThemeSettingsDoc = { cssString?: string | null } | null

/**
 * Injiziert die aus Theme Colors (theme-settings) generierten CSS-Variablen.
 * Überschreibt die Defaults aus theme/colors.css und das Design-Global für --primary, --ring, etc.
 */
export const ThemeSettingsStyles: React.FC<{ themeSettings: ThemeSettingsDoc }> = ({ themeSettings }) => {
  const css = themeSettings?.cssString?.trim()
  if (!css) return null
  return <style dangerouslySetInnerHTML={{ __html: css }} data-theme-settings />
}
