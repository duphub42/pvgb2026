import type { AdminViewServerProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import type { ThemeSetting } from '@/payload-types'
import { ThemeGeneratorClient, type ThemeSettingsData } from './ThemeGeneratorClient'

async function ThemeGeneratorPage(props: AdminViewServerProps) {
  const { initPageResult } = props
  let initialData: ThemeSettingsData = null
  try {
    const payload = await getPayload({ config })
    const globalData = await payload.findGlobal({
      slug: 'theme-settings',
      depth: 0,
    })
    if (globalData && typeof globalData === 'object') {
      const doc = globalData as ThemeSetting
      initialData = {
        primaryColor: doc.primaryColor,
        primaryMatchesBase: doc.primaryMatchesBase ?? false,
        themeMode: doc.themeMode ?? undefined,
        generatedTheme: doc.generatedTheme,
        cssString: doc.cssString ?? undefined,
        updatedAt: doc.updatedAt ?? undefined,
      }
    }
  } catch {
    initialData = null
  }

  return (
    <DefaultTemplate
      visibleEntities={initPageResult.visibleEntities}
      params={props.params}
      searchParams={props.searchParams}
      i18n={props.i18n}
      payload={props.payload}
      user={props.user}
      locale={props.locale}
      permissions={props.permissions}
      viewType={props.viewType}
    >
      <ThemeGeneratorClient initialData={initialData} />
    </DefaultTemplate>
  )
}

export default ThemeGeneratorPage
