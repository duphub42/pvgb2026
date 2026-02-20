import React from 'react'

import type { Locale } from '@/utilities/locale'

import { TooltipProvider } from '@/components/ui/tooltip'
import { LayoutWrapper } from '@/components/LayoutWrapper/LayoutWrapper'
import { HeaderThemeProvider } from './HeaderTheme'
import { LayoutProvider } from './Layout'
import { LocaleProvider } from './Locale/LocaleContext'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
  initialLocale?: Locale
}> = ({ children, initialLocale = 'de' }) => {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <ThemeProvider>
        <HeaderThemeProvider>
          <LayoutProvider>
            <TooltipProvider delayDuration={300}>
              <LayoutWrapper>{children}</LayoutWrapper>
            </TooltipProvider>
          </LayoutProvider>
        </HeaderThemeProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}
