import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Link from 'next/link'
import React from 'react'

import type { Footer, Header } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import RichText from '@/components/RichText'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { LogoWithGlitchWrapper } from '@/components/Logo/LogoWithGlitchWrapper'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import { FooterBounce } from '@/components/FooterBounce/FooterBounce'
import { messages } from '@/i18n/messages'

const SOCIAL_ICON_SVG: Record<string, string> = {
  linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  twitter: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  facebook: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
}

function mediaUrl(media: { url?: string | null } | number | null | undefined): string {
  if (media == null) return ''
  if (typeof media === 'object' && media?.url) return getMediaUrl(media.url) || ''
  return ''
}

export async function Footer({ locale = 'de' }: { locale?: Locale }) {
  let footerData: Footer | null = null
  let headerData: Header | null = null
  try {
    ;[footerData, headerData] = await Promise.all([
      getCachedGlobal('footer', 2)(),
      getCachedGlobal('header', 1)(),
    ])
  } catch (err) {
    console.error('[Footer] Failed to load footer/header globals:', err)
  }

  const footer = footerData ?? ({} as Footer)
  const navItems = footer?.navItems ?? []
  const columns = footer?.columns ?? []
  const socialLinks = footer?.socialLinks ?? []
  const hasNewStructure =
    columns.length > 0 ||
    socialLinks.length > 0 ||
    footer?.newsletterTitle != null ||
    footer?.copyrightText != null ||
    footer?.privacyLink != null ||
    footer?.termsLink != null

  const logoFromFooter = footer?.footerLogo
  const logoFromHeader = headerData?.logo ?? null
  const logoToShow = logoFromFooter ?? logoFromHeader
  const logoOnDarkBackground = footer?.logoOnDarkBackground === true
  const logoUrl = mediaUrl(logoToShow)
  const useTextLogo = !logoToShow

  const style: React.CSSProperties = {
    borderColor: 'var(--theme-border-color)',
    background: (footer?.backgroundColor as string) || 'var(--theme-footer-bg)',
    color: (footer?.textColor as string) || 'var(--theme-footer-text)',
    ...((footer?.linkHoverColor as string)
      ? { ['--footer-link-hover' as string]: footer.linkHoverColor as string }
      : {}),
  }

  if (!hasNewStructure) {
    return (
      <footer className="mt-auto border-t py-8" style={style}>
        <FooterBounce>
          <div className="container flex flex-col gap-6">
          <div className="gap-8 flex flex-col md:flex-row md:justify-between">
            <Link className="flex items-center" href="/">
              <LogoWithGlitchWrapper
                useTextLogo={useTextLogo}
                logoUrl={logoUrl}
                variant="footer"
                darkBackground={logoOnDarkBackground}
              >
                {logoToShow != null && (
                  <Logo logo={logoToShow} darkBackground={logoOnDarkBackground} variant="footer" />
                )}
              </LogoWithGlitchWrapper>
            </Link>
            <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
              <ThemeSelector />
              <nav className="flex flex-col md:flex-row gap-4">
                {navItems.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className="footer-link-underline text-[var(--theme-elevation-0)] transition-colors duration-200"
                  />
                ))}
              </nav>
            </div>
          </div>
          <div className="flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>
        </FooterBounce>
      </footer>
    )
  }

  return (
    <footer className="mt-auto border-t py-10 md:py-12 footer-custom" style={style}>
      <FooterBounce>
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Logo + Newsletter */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <LogoWithGlitchWrapper
                useTextLogo={useTextLogo}
                logoUrl={logoUrl}
                variant="footer"
                darkBackground={logoOnDarkBackground}
              >
                {logoToShow != null && (
                  <Logo logo={logoToShow} darkBackground={logoOnDarkBackground} variant="footer" />
                )}
              </LogoWithGlitchWrapper>
            </Link>
            {footer.newsletterTitle != null && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90">
                  {footer.newsletterTitle}
                </h3>
                {footer.newsletterDescription != null && (
                  <div className="prose prose-invert prose-sm max-w-none opacity-90">
                    <RichText data={footer.newsletterDescription} enableGutter={false} />
                  </div>
                )}
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder={footer.newsletterPlaceholder ?? 'E-Mail'}
                    className="min-w-0 flex-1 rounded border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:opacity-70"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30"
                  >
                    {footer.newsletterButtonText ?? 'Anmelden'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Spalten */}
          {columns.length > 0 && (
            <nav
              className="md:col-span-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              aria-label="Footer-Navigation"
            >
              {columns.map((col, i) => (
                <div key={col.id ?? i} className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90">
                    {col.columnTitle}
                  </h3>
                  <ul className="space-y-2">
                    {(col.links ?? []).map((linkRow, j) => (
                      <li key={linkRow.id ?? j}>
                        <a
                          href={linkRow.linkUrl}
                          target={linkRow.isExternal ? '_blank' : undefined}
                          rel={linkRow.isExternal ? 'noopener noreferrer' : undefined}
                          className="text-sm opacity-90 transition-opacity hover:opacity-100 hover:underline footer-link"
                        >
                          {linkRow.linkText}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}

          {/* Social + Theme + Sprache */}
          <div className="md:col-span-2 flex flex-col gap-4 md:items-end">
            {socialLinks.length > 0 && (
              <ul className="flex gap-3" aria-label="Social Media">
                {socialLinks.map((item, i) => {
                  const iconSrc = item.iconUpload && typeof item.iconUpload === 'object'
                    ? mediaUrl(item.iconUpload)
                    : null
                  return (
                    <li key={item.id ?? i}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block opacity-80 transition-opacity hover:opacity-100"
                        aria-label={item.platform}
                      >
                        {iconSrc ? (
                          <img src={iconSrc} alt="" className="h-5 w-5 object-contain" />
                        ) : (
                          <span
                            className="inline-block h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
                            dangerouslySetInnerHTML={{
                              __html: SOCIAL_ICON_SVG[item.platform] ?? '',
                            }}
                          />
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
            <ThemeSelector />
          </div>
        </div>

        {/* Rechtliches + Sprachwechsler unten rechts */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm opacity-80">
          {footer.copyrightText != null && <span>{footer.copyrightText}</span>}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 md:ml-auto">
            {footer.privacyLink != null && (
              <Link href={footer.privacyLink} className="hover:underline">
                {messages[locale].footer.privacy}
              </Link>
            )}
            {footer.termsLink != null && (
              <Link href={footer.termsLink} className="hover:underline">
                {messages[locale].footer.terms}
              </Link>
            )}
            <div className="ml-auto md:ml-0">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
      </FooterBounce>
    </footer>
  )
}
