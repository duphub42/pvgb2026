'use client'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getSpriteIdFromMediaUrl } from '@/utilities/getSpriteIdFromMediaUrl'
import Link from 'next/link'
import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'

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

const SOCIAL_SPRITE_IDS: Record<string, string> = {
  linkedin: 'hf-linkedin',
  twitter: 'hf-twitter',
  facebook: 'hf-facebook',
  instagram: 'hf-instagram',
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
  const footerAddress = (footer as any)?.footerAddress as string | null | undefined
  const footerPhone = (footer as any)?.footerPhone as string | null | undefined
  const logoOnDarkBackground = footer?.logoOnDarkBackground === true
  const logoUrl = mediaUrl(logoToShow)
  const useTextLogo = !logoToShow

  const newsletterIcon =
    (footer as any)?.newsletterIcon &&
    String((footer as any).newsletterIcon).trim().length > 0
      ? String((footer as any).newsletterIcon).trim()
      : null
  const newsletterIconUpload = (footer as any)?.newsletterIconUpload
  const newsletterIconUploadUrl =
    newsletterIconUpload && typeof newsletterIconUpload === 'object' && newsletterIconUpload?.url
      ? getMediaUrl((newsletterIconUpload as { url?: string }).url)
      : ''
  const newsletterSpriteId = getSpriteIdFromMediaUrl(newsletterIconUploadUrl)

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
              <Link className="logo-link flex items-center" href="/">
                {logoToShow != null ? (
                  <>
                    {/* Mobile footer logo (falls gesetzt), sonst Fallback auf Standard-Logo */}
                    <Logo
                      logo={mobileFooterLogo ?? logoToShow}
                      darkBackground={logoOnDarkBackground}
                      variant="footer"
                      className="block max-w-[100%] h-16 sm:h-18 md:h-22 md:hidden"
                    />
                    <Logo
                      logo={logoToShow}
                      darkBackground={logoOnDarkBackground}
                      variant="footer"
                      className="hidden max-w-[100%] h-20 md:h-28 md:block"
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
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 lg:grid-cols-[1fr_3fr] [&>*]:pt-4">
            <div className="md:col-span-12 lg:col-span-1 order-1 md:order-1 lg:order-1">
              <div className="space-y-4 md:space-y-0 lg:space-y-8">
                {footer.footerDescription != null && (
                  <div className="footer-description hidden lg:block prose prose-invert prose-sm max-w-none text-left prose-headings:mt-0 prose-p:mt-0">
                    <RichText data={footer.footerDescription} enableGutter={false} />
                  </div>
                )}
                <div className="flex flex-col items-center text-center gap-6 md:grid md:grid-cols-[2fr_5fr_13fr] md:items-start md:text-left lg:flex lg:flex-row lg:items-center lg:gap-6">
                  {/* Spalte 1: Logo */}
                  <div className="flex items-center justify-center md:justify-start">
                    <Link href="/" className="logo-link inline-block max-w-[100%]">
                      {logoToShow != null ? (
                        <>
                          {/* Mobile footer logo (falls gesetzt), sonst Fallback auf Standard-Logo */}
                          <Logo
                            logo={mobileFooterLogo ?? logoToShow}
                            darkBackground={logoOnDarkBackground}
                            variant="footer"
                            className="block max-w-[100%] h-16 sm:h-18 md:h-22 md:hidden"
                          />
                          <Logo
                            logo={logoToShow}
                            darkBackground={logoOnDarkBackground}
                            variant="footer"
                            className="hidden max-w-[100%] h-20 md:h-28 md:block"
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
                  </div>

                  {/* Spalte 2: Kontaktdaten + Social Icons */}
                  <div className="space-y-4">
                    {(footerAddress || footerPhone) && (
                      <div className="space-y-1 text-sm opacity-80">
                        {footerAddress && (
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5 text-xs opacity-80">
                              <svg className="inline-block size-5" aria-hidden="true">
                                <use href="/icons-sprite.svg#hf-map-pin" />
                              </svg>
                            </span>
                            <p className="whitespace-pre-line">{footerAddress}</p>
                          </div>
                        )}
                        {footerPhone && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs opacity-80">
                              <svg className="inline-block size-5" aria-hidden="true">
                                <use href="/icons-sprite.svg#hf-phone" />
                              </svg>
                            </span>
                            <a
                              href={`tel:${footerPhone.replace(/\s+/g, '')}`}
                              className="footer-link text-sm"
                            >
                              {footerPhone}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                    {(footer?.socialLinks?.length ?? 0) > 0 && (
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3" aria-label="Social Media">
                        {(footer.socialLinks ?? []).map((item, i) => {
                          const url = item?.url?.trim()
                          const platform = (item?.platform ?? '') as string
                          const customIconUrl =
                            item?.iconUpload && typeof item.iconUpload === 'object' && item.iconUpload?.url
                              ? getMediaUrl((item.iconUpload as { url?: string }).url)
                              : ''
                          const uploadSpriteId = customIconUrl ? getSpriteIdFromMediaUrl(customIconUrl) : null
                          const spriteId = uploadSpriteId ?? SOCIAL_SPRITE_IDS[platform] ?? null

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
                              {spriteId ? (
                                <svg className="size-5" aria-hidden="true">
                                  <use href={`/icons-sprite.svg#${spriteId}`} />
                                </svg>
                              ) : customIconUrl ? (
                                <img
                                  src={customIconUrl}
                                  alt=""
                                  className="size-5 object-contain"
                                  width={20}
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : (
                                <span className="text-xs">Link</span>
                              )}
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Spalte 3: Beschreibung nur auf iPad/Playbook (md) */}
                {footer.footerDescription != null && (
                  <div className="footer-description hidden md:block lg:hidden prose prose-invert prose-sm max-w-none text-left prose-headings:mt-0 prose-p:mt-0">
                    <RichText data={footer.footerDescription} enableGutter={false} />
                  </div>
                )}
                </div>
                {footer.footerDescription != null && (
                  <div className="footer-description block md:hidden prose prose-invert prose-sm max-w-none text-left prose-headings:mt-0 prose-p:mt-0">
                    <RichText data={footer.footerDescription} enableGutter={false} />
                  </div>
                )}
              </div>
            </div>

            {(columns.length > 0 || footer.newsletterTitle != null) && (
              <div className="md:col-span-12 lg:col-span-1 order-2 md:order-3 lg:order-2">
                <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {columns.map((col, i) => {
                    const colIcon =
                      (col as any)?.columnIcon &&
                      String((col as any).columnIcon).trim().length > 0
                        ? String((col as any).columnIcon).trim()
                        : null

                    const colIconUpload = (col as any)?.columnIconUpload
                    const colIconUploadUrl =
                      colIconUpload && typeof colIconUpload === 'object' && colIconUpload?.url
                        ? getMediaUrl((colIconUpload as { url?: string }).url)
                        : ''
                    const colIconSpriteId = colIconUploadUrl
                      ? getSpriteIdFromMediaUrl(colIconUploadUrl)
                      : null

                    return (
                      <div
                        key={col.id ?? i}
                        className={`space-y-4 ${i < 2 ? 'lg:row-start-2' : ''}`}
                      >
                        <div className="flex flex-row items-start gap-x-4">
                          {/* 1. Spalte: Icons */}
                          <div className="flex shrink-0 pt-0.5 lg:basis-[10%]">
                            {colIconSpriteId ? (
                              <svg className="h-6 w-6 text-white" aria-hidden="true">
                                <use href={`/icons-sprite.svg#${colIconSpriteId}`} />
                              </svg>
                            ) : colIconUploadUrl ? (
                              <img
                                src={colIconUploadUrl}
                                alt=""
                                className="h-6 w-6 object-contain filter invert"
                                aria-hidden="true"
                                loading="lazy"
                                decoding="async"
                              />
                            ) : colIcon ? (
                              <span aria-hidden="true" className="text-2xl leading-none">
                                {colIcon}
                              </span>
                            ) : null}
                          </div>
                          {/* 2. Spalte: Überschrift mit Links */}
                          <div className="min-w-[10rem] flex-1 space-y-2 lg:basis-[90%]">
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
                                    <ArrowRight className="footer-link-arrow inline-block size-[0.85em] shrink-0" aria-hidden />
                                    {linkRow.isExternal === true && (
                                      <span className="footer-link-ext" aria-hidden>ext.</span>
                                    )}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {footer.newsletterTitle != null && (
                    <div className="flex min-w-0 flex-col space-y-4 col-span-2 md:col-span-3 lg:col-span-2 lg:row-start-2 lg:col-start-3">
                      <div className="flex flex-row items-start gap-x-3">
                        {/* Icon-Spalte: nur Iconbreite, kein prozentualer Abstand wie bei den Nav-Spalten */}
                        <div className="flex shrink-0 pt-0.5">
                          {newsletterSpriteId ? (
                            <svg
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            >
                              <use href={`/icons-sprite.svg#${newsletterSpriteId}`} />
                            </svg>
                          ) : newsletterIconUploadUrl ? (
                            <img
                              src={newsletterIconUploadUrl}
                              alt=""
                              className="h-6 w-6 object-contain filter invert"
                              aria-hidden="true"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : newsletterIcon ? (
                            <span aria-hidden="true" className="text-2xl leading-none">
                              {newsletterIcon}
                            </span>
                          ) : null}
                        </div>

                        {/* Überschrift + Beschreibung + Formular */}
                        <div className="min-w-0 flex-1 space-y-2">
                          <h3 className="footer-heading text-sm font-semibold uppercase tracking-wider">
                            {footer.newsletterTitle}
                          </h3>

                          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-6">
                            {footer.newsletterDescription != null && (
                              <div className="footer-description prose prose-invert prose-sm max-w-none min-w-0 text-left prose-headings:mt-0 prose-p:mt-0">
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
                                  className="h-full w-full min-h-0 pt-2 pb-3"
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-sm opacity-80 md:flex-row md:flex-wrap md:items-center md:justify-between">
            {footer.copyrightText != null && (
              <span className="text-center md:text-left">{footer.copyrightText}</span>
            )}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 md:ml-auto md:justify-start">
              {footer.privacyLink != null && (
                <Link href={footer.privacyLink} className="footer-link text-sm transition-opacity hover:opacity-100">
                  <span className="footer-link-text">{messages[locale].footer.privacy}</span>
                  <ArrowRight className="footer-link-arrow inline-block size-[0.85em] shrink-0" aria-hidden />
                </Link>
              )}
              {footer.termsLink != null && (
                <Link href={footer.termsLink} className="footer-link text-sm transition-opacity hover:opacity-100">
                  <span className="footer-link-text">{messages[locale].footer.terms}</span>
                  <ArrowRight className="footer-link-arrow inline-block size-[0.85em] shrink-0" aria-hidden />
                </Link>
              )}
              <div className="ml-auto flex items-center gap-3 md:ml-0">
                <ThemeSelector />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </FooterBounce>
    </footer>
  )
}
