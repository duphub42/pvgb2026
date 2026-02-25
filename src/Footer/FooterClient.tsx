'use client'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import Link from 'next/link'
import React, { useState } from 'react'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

import type { Footer, Header } from '@/payload-types'
import { SaveButton } from '@/components/ui/save-button'
import type { Locale } from '@/utilities/locale'

import RichText from '@/components/RichText'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { LogoWithGlitchWrapper } from '@/components/Logo/LogoWithGlitchWrapper'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import { FooterBounce } from '@/components/FooterBounce/FooterBounce'
import { messages } from '@/i18n/messages'

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
}

function mediaUrl(media: { url?: string | null } | number | null | undefined): string {
  if (media == null) return ''
  if (typeof media === 'object' && media?.url) return getMediaUrl(media.url) || ''
  return ''
}

export type FooterClientProps = {
  footer: Footer | null
  header: Header | null
  locale: Locale
}

type NewsletterStatus = 'idle' | 'saving' | 'saved'

export function FooterClient({ footer: footerData, header: headerData, locale }: FooterClientProps) {
  const footer = footerData ?? ({} as Footer)
  const [newsletterStatus, setNewsletterStatus] = useState<NewsletterStatus>('idle')
  const navItems = footer?.navItems ?? []
  const columns = footer?.columns ?? []
  const hasNewStructure =
    (footer?.columns?.length ?? 0) > 0 ||
    (footer?.socialLinks?.length ?? 0) > 0 ||
    footer?.newsletterTitle != null ||
    footer?.copyrightText != null ||
    footer?.privacyLink != null ||
    footer?.termsLink != null

  const logoToShow = footer?.footerLogo ?? null
  const mobileFooterLogo = (footer as any)?.mobileFooterLogo ?? null
  const logoOnDarkBackground = footer?.logoOnDarkBackground === true
  const logoUrl = mediaUrl(logoToShow)
  const useTextLogo = !logoToShow

  const hasCustomBg = Boolean((footer?.backgroundColor as string)?.trim())
  const style: React.CSSProperties = {
    borderColor: 'var(--theme-border-color)',
    ...(hasCustomBg ? { background: footer?.backgroundColor as string } : {}),
    color: (footer?.textColor as string) || 'var(--theme-footer-text)',
    ...((footer?.linkHoverColor as string)
      ? { ['--footer-link-hover' as string]: footer.linkHoverColor as string }
      : {}),
  }

  if (!hasNewStructure) {
    return (
      <footer
        className={`mt-auto border-0 pt-16 pb-8 ${!hasCustomBg ? 'footer-gradient' : ''}`}
        style={style}
      >
        <FooterBounce>
          <div className="container flex flex-col gap-6">
            <div className="gap-8 flex flex-col md:flex-row md:justify-between">
              <Link className="flex items-center" href="/">
                {logoToShow != null ? (
                  <>
                    {/* Mobile footer logo (falls gesetzt), sonst Fallback auf Standard-Logo */}
                    <Logo
                      logo={mobileFooterLogo ?? logoToShow}
                      darkBackground={logoOnDarkBackground}
                      variant="footer"
                      className="block max-w-[80%] md:hidden"
                    />
                    <Logo
                      logo={logoToShow}
                      darkBackground={logoOnDarkBackground}
                      variant="footer"
                      className="hidden max-w-[80%] md:block"
                    />
                  </>
                ) : (
                  <LogoWithGlitchWrapper
                    useTextLogo={useTextLogo}
                    logoUrl={logoUrl}
                    variant="footer"
                    darkBackground={logoOnDarkBackground}
                  />
                )}
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
    <footer
      className={`mt-auto border-0 pt-20 pb-10 md:pt-24 md:pb-12 footer-custom ${!hasCustomBg ? 'footer-gradient' : ''}`}
      style={style}
    >
      <FooterBounce>
        {/* Dezente animierte Blobs im Hintergrund (unterhalb des Inhalts) */}
        {!hasCustomBg && hasNewStructure && (
          <div className="footer-ambient-shapes" aria-hidden="true">
            <div className="footer-ambient-circle footer-ambient-circle-1" />
            <div className="footer-ambient-circle footer-ambient-circle-2" />
            <div className="footer-ambient-circle footer-ambient-circle-3" />
          </div>
        )}
        <div className="container">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 [&>*]:pt-4">
            <div className="md:col-span-8 lg:col-span-4 flex flex-col space-y-6 items-center text-center md:items-start md:text-left order-1 md:order-1 lg:order-1">
              <Link href="/" className="inline-block max-w-[80%]">
                {logoToShow != null ? (
                  <>
                    {/* Mobile footer logo (falls gesetzt), sonst Fallback auf Standard-Logo */}
                    <Logo
                      logo={mobileFooterLogo ?? logoToShow}
                      darkBackground={logoOnDarkBackground}
                      variant="footer"
                      className="block max-w-[80%] md:hidden"
                    />
                    <Logo
                      logo={logoToShow}
                      darkBackground={logoOnDarkBackground}
                      variant="footer"
                      className="hidden max-w-[80%] md:block"
                    />
                  </>
                ) : (
                  <LogoWithGlitchWrapper
                    useTextLogo={useTextLogo}
                    logoUrl={logoUrl}
                    variant="footer"
                    darkBackground={logoOnDarkBackground}
                  />
                )}
              </Link>
              {footer.footerDescription != null && (
                <div className="prose prose-invert prose-sm max-w-none opacity-80">
                  <RichText data={footer.footerDescription} enableGutter={false} />
                </div>
              )}
              {(footer?.socialLinks?.length ?? 0) > 0 && (
                <div className="flex flex-wrap items-center gap-3" aria-label="Social Media">
                  {(footer.socialLinks ?? []).map((item, i) => {
                    const url = item?.url?.trim()
                    const platform = (item?.platform ?? '') as string
                    const Icon = socialIcons[platform]
                    const customIconUrl =
                      item?.iconUpload && typeof item.iconUpload === 'object' && item.iconUpload?.url
                        ? getMediaUrl((item.iconUpload as { url?: string }).url)
                        : ''
                    if (!url) return null
                    return (
                      <a
                        key={item.id ?? i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-80 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none"
                        aria-label={platform}
                      >
                        {customIconUrl ? (
                          <img
                            src={customIconUrl}
                            alt=""
                            className="size-5 object-contain"
                            width={20}
                            height={20}
                          />
                        ) : Icon ? (
                          <Icon className="size-5" />
                        ) : (
                          <span className="text-xs">Link</span>
                        )}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>

            {columns.length > 0 && (
              <nav
                className="footer-nav-grid md:col-span-12 lg:col-span-6 grid gap-8 grid-cols-2 md:grid-cols-3 order-2 md:order-3 lg:order-2"
                aria-label="Footer-Navigation"
              >
                {columns.map((col, i) => (
                  <div key={col.id ?? i} className="space-y-3">
                    <h3 className="footer-heading text-sm font-semibold uppercase tracking-wider">
                      {col.columnTitle}
                    </h3>
                    <ul className="space-y-2">
                      {(col.links ?? []).map((linkRow, j) => (
                        <li key={linkRow.id ?? j}>
                          <a
                            href={linkRow.linkUrl}
                            target={linkRow.isExternal ? '_blank' : undefined}
                            rel={linkRow.isExternal ? 'noopener noreferrer' : undefined}
                            className="text-sm transition-opacity hover:opacity-100 footer-link"
                          >
                            <span className="footer-link-text">{linkRow.linkText}</span>
                            <span className="footer-link-arrow" aria-hidden>→</span>
                            {linkRow.isExternal === true && (
                              <span className="footer-link-ext" aria-hidden>ext.</span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            )}

            {footer.newsletterTitle != null && (
              <div className="md:col-span-4 lg:col-span-2 flex min-w-0 flex-col space-y-3 order-3 md:order-2 lg:order-3">
                <h3 className="footer-heading text-sm font-semibold uppercase tracking-wider">
                  {footer.newsletterTitle}
                </h3>
                {footer.newsletterDescription != null && (
                  <div className="prose prose-invert prose-sm max-w-none opacity-90 min-w-0">
                    <RichText data={footer.newsletterDescription} enableGutter={false} />
                  </div>
                )}
                <form
                  className="flex min-w-0 flex-col gap-3"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    if (newsletterStatus !== 'idle') return
                    setNewsletterStatus('saving')
                    try {
                      // TODO: submit to Payload form or external newsletter API
                      await new Promise((r) => setTimeout(r, 1200))
                      setNewsletterStatus('saved')
                      setTimeout(() => setNewsletterStatus('idle'), 2000)
                    } catch {
                      setNewsletterStatus('idle')
                    }
                  }}
                >
                  <input
                    type="email"
                    name="newsletter-email"
                    placeholder={footer.newsletterPlaceholder ?? 'E-Mail'}
                    className="h-10 w-full min-w-0 max-w-full rounded-full border border-white/20 bg-black/40 px-4 text-sm text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-colors"
                    disabled={newsletterStatus === 'saving'}
                  />
                  <div className="footer-newsletter-btn-wrap h-10 w-full min-w-0 max-w-full">
                    <SaveButton
                      type="submit"
                      status={newsletterStatus}
                      variant="footer"
                      wrapperClassName="h-full w-full"
                      text={{
                        idle: footer.newsletterButtonText ?? 'Anmelden',
                        saving: 'Wird angemeldet…',
                        saved: 'Angemeldet!',
                      }}
                      className="h-full w-full min-h-0 py-2.5"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm opacity-80">
            {footer.copyrightText != null && <span>{footer.copyrightText}</span>}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 md:ml-auto">
              {footer.privacyLink != null && (
                <Link href={footer.privacyLink} className="footer-link text-sm transition-opacity hover:opacity-100">
                  <span className="footer-link-text">{messages[locale].footer.privacy}</span>
                  <span className="footer-link-arrow" aria-hidden>→</span>
                </Link>
              )}
              {footer.termsLink != null && (
                <Link href={footer.termsLink} className="footer-link text-sm transition-opacity hover:opacity-100">
                  <span className="footer-link-text">{messages[locale].footer.terms}</span>
                  <span className="footer-link-arrow" aria-hidden>→</span>
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
