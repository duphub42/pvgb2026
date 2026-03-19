'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { HeaderActions } from '@/components/HeaderActions/HeaderActions'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const callbackFormId =
    typeof data?.megaMenuCallbackForm === 'object' &&
    data?.megaMenuCallbackForm != null &&
    'id' in data.megaMenuCallbackForm
      ? data.megaMenuCallbackForm.id
      : typeof data?.megaMenuCallbackForm === 'number'
        ? data.megaMenuCallbackForm
        : null

  const contactCta = {
    whatsapp:
      data?.megaMenuShowWhatsApp && data?.megaMenuWhatsAppUrl
        ? { label: data.megaMenuWhatsAppLabel ?? 'WhatsApp', url: data.megaMenuWhatsAppUrl }
        : undefined,
    callback:
      data?.megaMenuShowCallback && callbackFormId != null
        ? {
            title: data.megaMenuCallbackTitle ?? 'Rueckruf anfordern',
            placeholder: data.megaMenuCallbackPlaceholder ?? 'Ihre Telefonnummer',
            buttonText: data.megaMenuCallbackButtonText ?? 'Anfragen',
            formId: callbackFormId,
            phoneFieldName: data.megaMenuCallbackPhoneFieldName ?? 'phone',
          }
        : undefined,
  }

  return (
    <nav className="flex items-center gap-1">
      {navItems.map(({ link }, i) => (
        <CMSLink key={i} {...link} appearance="link" />
      ))}
      <HeaderActions contactCta={contactCta} />
    </nav>
  )
}
