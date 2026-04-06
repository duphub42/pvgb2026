'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { HeaderActions } from '@/components/HeaderActions/HeaderActions'
import { cn } from '@/utilities/ui'
import { isNavLinkActive } from '@/utilities/navLinkActive'

type HeaderNavLink = NonNullable<HeaderType['navItems']>[number]['link']

function getHeaderNavHref(link: HeaderNavLink): string | null {
  const { type, reference, url } = link
  const relationTo = reference?.relationTo
  const pathPrefix = relationTo === 'site-pages' ? '' : relationTo === 'blog-posts' ? '/posts' : ''
  const val = reference?.value
  if (type === 'reference' && val && typeof val === 'object' && 'slug' in val && val.slug) {
    return `${pathPrefix}/${val.slug}`
  }
  return url ?? null
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname() ?? ''
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
    <nav className="header-nav flex h-full items-stretch gap-1">
      {navItems.map(({ link }, i) => {
        const href = getHeaderNavHref(link)
        const referenceValue = link.reference?.value
        const referenceSlug =
          typeof referenceValue === 'object' &&
          referenceValue !== null &&
          'slug' in referenceValue &&
          typeof referenceValue.slug === 'string'
            ? referenceValue.slug
            : undefined
        const key = href
          ? `header-nav-${href}-${i}`
          : referenceSlug
            ? `header-nav-${referenceSlug}-${i}`
            : link.url
              ? `header-nav-${link.url}-${i}`
              : link.label
                ? `header-nav-${link.label}-${i}`
                : `header-nav-${i}`
        const active = href != null && isNavLinkActive(pathname, href)
        return (
          <CMSLink
            key={key}
            {...link}
            appearance="link"
            className={cn(active && 'header-nav-link--active')}
          />
        )
      })}
      <HeaderActions contactCta={contactCta} />
    </nav>
  )
}
