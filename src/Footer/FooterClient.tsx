'use client'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Link2 } from 'lucide-react'

import type { Footer, Header } from '@/payload-types'
import { SaveButton } from '@/components/ui/save-button'
import type { Locale } from '@/utilities/locale'

import RichText from '@/components/RichText'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { FooterBounce } from '@/components/FooterBounce/FooterBounce'
import { messages } from '@/i18n/messages'

const SOCIAL_SPRITE_IDS: Record<string, string> = {
  linkedin: 'hf-linkedin',
  twitter: 'hf-twitter',
  facebook: 'hf-facebook',
  instagram: 'hf-instagram',
}
const MOBILE_FOOTER_B_LOGO_SRC = '/branding/philippbacher-logo-b-10.svg'
const _MOBILE_FOOTER_B_LOGO_MIN_OPACITY = 0.1
// When centered: fully visible (1). Otherwise very faint (0.1).
const _MOBILE_FOOTER_B_LOGO_MAX_OPACITY = 1
const MOBILE_FOOTER_HEADING_MIN_OPACITY = 0.3
const MOBILE_FOOTER_HEADING_MAX_OPACITY = 1
const MOBILE_FOOTER_B_LOGO_FADE_ZONE_RATIO = 0.72
const ENABLE_MOBILE_FOOTER_SCROLL_FADE = true

// Type definitions for raw database fields (snake_case from DB)
interface HeaderWithRawFields extends Header {
  logo_id?: number | null
}

interface FooterWithRawFields extends Footer {
  footer_logo_id?: number | null
}

export type FooterClientProps = {
  footer: Footer | null
  header?: Header | null
  locale: Locale
}

type NewsletterStatus = 'idle' | 'saving' | 'saved'

export function FooterClient({
  footer: footerData,
  header: headerData,
  locale,
}: FooterClientProps) {
  const footer: Partial<Footer> = footerData ?? {}
  const [newsletterStatus, setNewsletterStatus] = useState<NewsletterStatus>('idle')
  const footerRootRef = useRef<HTMLElement | null>(null)
  const mobileFooterLogoRef = useRef<HTMLImageElement | null>(null)
  const navItems = footer?.navItems ?? []
  const columns = footer?.columns ?? []
  const hasNewStructure =
    (footer?.columns?.length ?? 0) > 0 ||
    (footer?.socialLinks?.length ?? 0) > 0 ||
    footer?.newsletterTitle != null ||
    footer?.copyrightText != null ||
    footer?.privacyLink != null ||
    footer?.termsLink != null

  // Support both footerLogo (camelCase) and footer_logo_id (snake_case from DB)
  // Also use header logo (B-logo) as fallback when footer has no logo
  const headerLogo =
    headerData?.logo ?? (headerData as unknown as HeaderWithRawFields)?.logo_id ?? null
  const footerLogo =
    footer?.footerLogo ?? (footer as unknown as FooterWithRawFields)?.footer_logo_id ?? null
  const logoToShow = footerLogo ?? headerLogo ?? null
  const footerAddress = footer?.footerAddress
  const footerPhone = footer?.footerPhone
  const mobileFooterLogoAlt = footer?.footerLogoAltText?.trim() || ''
  const mobileFooterLogoClassName =
    'mobile-footer-b-logo logo-contrast block max-w-[100%] h-16 sm:h-18 md:h-22'

  const newsletterIcon =
    footer?.newsletterIcon && String(footer.newsletterIcon).trim().length > 0
      ? String(footer.newsletterIcon).trim()
      : null
  const newsletterIconUpload = footer?.newsletterIconUpload
  const newsletterIconUploadUrl =
    newsletterIconUpload && typeof newsletterIconUpload === 'object' && newsletterIconUpload?.url
      ? getMediaUrl((newsletterIconUpload as { url?: string }).url)
      : ''
  const newsletterSpriteId = null

  const hasCustomBg = Boolean((footer?.backgroundColor as string)?.trim())

  useEffect(() => {
    if (!ENABLE_MOBILE_FOOTER_SCROLL_FADE) return
    if (typeof window === 'undefined') return

    const footerEl = footerRootRef.current
    if (!footerEl) return

    const headingEls = Array.from(
      footerEl.querySelectorAll<HTMLElement>('.footer-center-fade-heading'),
    )
    const logoEl = footerEl.querySelector<HTMLElement>('.mobile-footer-b-logo')
    let rafId: number | null = null
    let listenersAttached = false
    const lastHeadingOpacities = new Map<HTMLElement, string>()
    let lastLogoOpacity = ''

    const calcOpacityForRect = (rect: DOMRect, minOpacity: number, maxOpacity: number): number => {
      const targetCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      const distance = Math.abs(targetCenterY - viewportCenterY)
      const maxDistance = Math.max(160, window.innerHeight * MOBILE_FOOTER_B_LOGO_FADE_ZONE_RATIO)
      const linearProgress = Math.max(0, 1 - distance / maxDistance)
      // Smoothstep for softer fade-in/out around center.
      const smoothProgress = linearProgress * linearProgress * (3 - 2 * linearProgress)

      return minOpacity + (maxOpacity - minOpacity) * smoothProgress
    }

    const clearOpacityVars = () => {
      if (lastHeadingOpacities.size > 0) {
        for (const headingEl of headingEls) {
          headingEl.style.removeProperty('--mobile-footer-heading-opacity')
        }
        lastHeadingOpacities.clear()
      }
      if (logoEl && lastLogoOpacity !== '') {
        logoEl.style.removeProperty('--mobile-footer-logo-opacity')
        lastLogoOpacity = ''
      }
    }

    const applyOpacity = () => {
      rafId = null

      if (logoEl) {
        const logoOpacity = calcOpacityForRect(
          logoEl.getBoundingClientRect(),
          _MOBILE_FOOTER_B_LOGO_MIN_OPACITY,
          _MOBILE_FOOTER_B_LOGO_MAX_OPACITY,
        )
        const nextLogoOpacity = logoOpacity.toFixed(3)
        if (nextLogoOpacity !== lastLogoOpacity) {
          logoEl.style.setProperty('--mobile-footer-logo-opacity', nextLogoOpacity)
          lastLogoOpacity = nextLogoOpacity
        }
      }

      for (const headingEl of headingEls) {
        const rect = headingEl.getBoundingClientRect()
        if (rect.width === 0 && rect.height === 0) continue
        const headingOpacity = calcOpacityForRect(
          rect,
          MOBILE_FOOTER_HEADING_MIN_OPACITY,
          MOBILE_FOOTER_HEADING_MAX_OPACITY,
        )
        const nextHeadingOpacity = headingOpacity.toFixed(3)
        if (lastHeadingOpacities.get(headingEl) !== nextHeadingOpacity) {
          headingEl.style.setProperty('--mobile-footer-heading-opacity', nextHeadingOpacity)
          lastHeadingOpacities.set(headingEl, nextHeadingOpacity)
        }
      }
    }

    const queueOpacityUpdate = () => {
      if (rafId != null) return
      rafId = window.requestAnimationFrame(applyOpacity)
    }

    const attachListeners = () => {
      if (!listenersAttached) {
        window.addEventListener('scroll', queueOpacityUpdate, { passive: true })
        window.addEventListener('resize', queueOpacityUpdate)
        window.addEventListener('orientationchange', queueOpacityUpdate)
        listenersAttached = true
      }
      queueOpacityUpdate()
    }

    attachListeners()

    return () => {
      if (rafId != null) {
        window.cancelAnimationFrame(rafId)
      }
      if (listenersAttached) {
        window.removeEventListener('scroll', queueOpacityUpdate)
        window.removeEventListener('resize', queueOpacityUpdate)
        window.removeEventListener('orientationchange', queueOpacityUpdate)
      }
      clearOpacityVars()
    }
  }, [])

  // FIX: style ohne hartkodiertes color-Fallback — wird von CSS-Variablen übernommen
  const style: React.CSSProperties = {
    borderColor: 'var(--theme-border-color)',
    ...(hasCustomBg ? { background: footer?.backgroundColor as string } : {}),
    // Nur setzen wenn explizit im CMS gesetzt, sonst CSS-Variablen übernehmen
    ...(footer?.textColor ? { color: footer.textColor as string } : {}),
    ...((footer?.linkHoverColor as string)
      ? { ['--footer-link-hover' as string]: footer.linkHoverColor as string }
      : {}),
  }

  if (!hasNewStructure) {
    return (
      <footer
        ref={footerRootRef}
        className={`footer-elevated mt-auto border-0 pt-16 pb-8 ${!hasCustomBg ? 'footer-gradient' : ''}`}
        style={style}
      >
        <FooterBounce>
          <div className="container px-[clamp(1rem,4vw,2rem)] flex flex-col gap-6">
            <div className="gap-8 flex flex-col md:flex-row md:justify-between">
              <Link className="logo-link flex items-center" href="/">
                {logoToShow != null ? (
                  <Logo
                    logo={logoToShow}
                    variant="footer"
                    disableAnimation
                    className="mobile-footer-b-logo max-w-[100%] h-20 md:h-28"
                  />
                ) : MOBILE_FOOTER_B_LOGO_SRC ? (
                  <img
                    ref={mobileFooterLogoRef}
                    src={MOBILE_FOOTER_B_LOGO_SRC}
                    alt={mobileFooterLogoAlt || 'Philipp Bacher'}
                    className={mobileFooterLogoClassName}
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </Link>
              <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
                <ThemeSelector />
                <nav className="flex flex-col md:flex-row gap-4">
                  {navItems.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      {...link}
                      className="footer-link-underline text-[12px] md:text-sm transition-colors duration-200"
                    />
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </FooterBounce>
      </footer>
    )
  }

  return (
    <footer
      ref={footerRootRef}
      className={`footer-elevated mt-auto border-0 pt-20 pb-10 md:pt-24 md:pb-12 footer-custom ${!hasCustomBg ? 'footer-gradient' : ''}`}
      style={style}
    >
      <FooterBounce>
        <div className="container px-[clamp(1rem,4vw,2rem)]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 xl:grid-cols-[1fr_3fr] [&>*]:pt-4">
            <div className="md:col-span-12 xl:col-span-1 order-1 md:order-1 xl:order-1 w-full">
              <div className="h-full flex flex-col gap-1">
                <div className="flex-1 flex flex-col items-center xl:items-start text-center xl:text-left gap-6">
                  {/* Logo */}
                  <div className="flex items-end justify-center xl:justify-start">
                    <Link href="/" className="logo-link inline-block max-w-[100%]">
                      {logoToShow != null ? (
                        <Logo
                          logo={logoToShow}
                          variant="footer"
                          disableAnimation
                          className="mobile-footer-b-logo block max-w-[100%] h-12 sm:h-14 md:h-16"
                        />
                      ) : MOBILE_FOOTER_B_LOGO_SRC ? (
                        <img
                          ref={mobileFooterLogoRef}
                          src={MOBILE_FOOTER_B_LOGO_SRC}
                          alt={mobileFooterLogoAlt || 'Philipp Bacher'}
                          className="mobile-footer-b-logo logo-contrast block max-w-[100%] h-12"
                          width={48}
                          height={48}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                    </Link>
                  </div>

                  {/* Social Icons unter dem Logo */}
                  {(footer?.socialLinks?.length ?? 0) > 0 && (
                    <div
                      className="flex flex-wrap items-center justify-center xl:justify-start gap-1 md:gap-3"
                      aria-label="Social Media"
                    >
                      {(footer.socialLinks ?? []).map((item, i) => {
                        const url = item?.url?.trim()
                        const platform = String(item?.platform ?? '')
                          .trim()
                          .toLowerCase()
                        const customIconUrl =
                          item?.iconUpload &&
                          typeof item.iconUpload === 'object' &&
                          item.iconUpload?.url
                            ? getMediaUrl((item.iconUpload as { url?: string }).url)
                            : ''
                        const uploadSpriteId = null
                        const spriteId = uploadSpriteId ?? SOCIAL_SPRITE_IDS[platform] ?? null

                        if (!url) return null
                        return (
                          <a
                            key={item.id ?? i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-social-icon opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none"
                            aria-label={platform}
                          >
                            {spriteId ? (
                              <svg className="h-4 w-4" aria-hidden="true">
                                <use href={`/icons-sprite.svg#${spriteId}`} />
                              </svg>
                            ) : customIconUrl ? (
                              <img
                                src={customIconUrl}
                                alt=""
                                className="footer-icon-img h-4 w-4 object-contain"
                                width={16}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <Link2 className="h-4 w-4 opacity-60" aria-hidden="true" />
                            )}
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>

                {footer.footerDescription != null && (
                  <div className="block w-full min-w-0 mt-2">
                    <RichText
                      data={footer.footerDescription}
                      enableGutter={false}
                      enableProse={false}
                      className="w-full max-w-none text-[11px] md:text-sm leading-[1.5] opacity-60 text-center xl:text-left [&>*]:w-full [&>*]:max-w-none [&_p]:w-full [&_p]:max-w-none [&_p]:mt-0 [&_p]:mb-0 [&_p]:text-center [&_p]:xl:text-left [&_h1]:mt-0 [&_h2]:mt-0 [&_h3]:mt-0"
                    />
                  </div>
                )}

                {/* Kontakt (Adresse + Telefon) unter dem Beschreibungstext */}
                {(footerAddress || footerPhone) && (
                  <div className="flex flex-wrap items-center justify-center xl:justify-start gap-x-3 gap-y-1 text-[11px] md:text-sm leading-tight opacity-60 xl:mt-2">
                    {footerAddress && (
                      <span className="inline-flex items-center gap-1.5">
                        <svg className="inline-block h-3 w-3 opacity-80" aria-hidden="true">
                          <use href="/icons-sprite.svg#hf-map-pin" />
                        </svg>
                        <span>{footerAddress.replace(/\n/g, ', ')}</span>
                      </span>
                    )}
                    {footerAddress && footerPhone && (
                      <span className="opacity-40 md:hidden">|</span>
                    )}
                    {footerPhone && (
                      <span className="inline-flex items-center gap-1.5">
                        <svg className="inline-block h-3 w-3 opacity-80" aria-hidden="true">
                          <use href="/icons-sprite.svg#hf-phone" />
                        </svg>
                        <a
                          href={`tel:${footerPhone.replace(/\s+/g, '')}`}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="footer-link text-[12px] md:text-sm leading-3 opacity-60 tracking-[-0.03em] transition-opacity duration-200 ease-out hover:opacity-100 max-sm:flex max-sm:items-center max-sm:min-h-[28px]"
                        >
                          <span className="footer-link-text">{footerPhone}</span>
                          <ArrowUpRight
                            className="footer-link-arrow inline-block size-[0.85em] shrink-0"
                            aria-hidden
                          />
                        </a>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {(columns.length > 0 || footer.newsletterTitle != null) && (
              <div className="md:col-span-12 xl:col-span-1 order-2 md:order-3 xl:order-2 w-full">
                <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {columns.map((col, i) => {
                    const colIcon =
                      col?.columnIcon && String(col.columnIcon).trim().length > 0
                        ? String(col.columnIcon).trim()
                        : null
                    const colIconUpload = col?.columnIconUpload
                    const colIconUploadUrl =
                      colIconUpload && typeof colIconUpload === 'object' && colIconUpload?.url
                        ? getMediaUrl((colIconUpload as { url?: string }).url)
                        : ''
                    const colIconSpriteId = null

                    const columnWrapperClass =
                      i < 2 ? 'group space-y-4 lg:row-start-2' : 'group space-y-4'
                    return (
                      <div key={col.id ?? i} className={columnWrapperClass}>
                        <div className="flex flex-row items-start gap-x-2">
                          <div className="footer-column-icon flex shrink-0 pt-0.5 lg:basis-[10%] opacity-80 transition-opacity duration-[600ms] group-hover:opacity-100 group-hover:duration-300">
                            {colIconSpriteId ? (
                              // FIX: currentColor statt text-white
                              <svg className="h-4 w-4" aria-hidden="true">
                                <use href={`/icons-sprite.svg#${colIconSpriteId}`} />
                              </svg>
                            ) : colIconUploadUrl ? (
                              <img
                                src={colIconUploadUrl}
                                alt=""
                                // FIX: footer-icon-img statt filter-invert hardkodiert
                                className="footer-icon-img h-4 w-4 object-contain"
                                aria-hidden="true"
                                width={16}
                                height={16}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : colIcon ? (
                              <span aria-hidden="true" className="text-base leading-none">
                                {colIcon}
                              </span>
                            ) : null}
                          </div>
                          <div className="min-w-[10rem] flex-1 space-y-1 lg:basis-[90%]">
                            <h3 className="footer-heading footer-center-fade-heading text-sm font-semibold uppercase tracking-[-0.009em]">
                              {col.columnTitle}
                            </h3>
                            <ul className="space-y-0">
                              {(col.links ?? []).map((linkRow, j) => (
                                <li key={linkRow.id ?? j}>
                                  <a
                                    href={linkRow.linkUrl}
                                    target={linkRow.isExternal ? '_blank' : undefined}
                                    rel={linkRow.isExternal ? 'noopener noreferrer' : undefined}
                                    className="text-[12px] md:text-sm leading-3 opacity-60 tracking-[-0.03em] transition-opacity duration-200 ease-out hover:opacity-100 max-sm:flex max-sm:items-center max-sm:min-h-[28px] footer-link"
                                  >
                                    <span className="footer-link-text">{linkRow.linkText}</span>
                                    <ArrowRight
                                      className="footer-link-arrow inline-block size-[0.85em] shrink-0"
                                      aria-hidden
                                    />
                                    {linkRow.isExternal === true && (
                                      <span className="footer-link-ext" aria-hidden>
                                        ext.
                                      </span>
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
                      <div className="group flex flex-row items-start gap-x-2">
                        <div className="footer-column-icon flex shrink-0 pt-0.5 opacity-80 transition-opacity duration-[600ms] group-hover:opacity-100 group-hover:duration-300">
                          {newsletterSpriteId ? (
                            <svg className="h-4 w-4" aria-hidden="true">
                              <use href={`/icons-sprite.svg#${newsletterSpriteId}`} />
                            </svg>
                          ) : newsletterIconUploadUrl ? (
                            <img
                              src={newsletterIconUploadUrl}
                              alt=""
                              className="footer-icon-img h-4 w-4 object-contain"
                              aria-hidden="true"
                              width={16}
                              height={16}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : newsletterIcon ? (
                            <span aria-hidden="true" className="text-base leading-none">
                              {newsletterIcon}
                            </span>
                          ) : null}
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                          <h3 className="footer-heading footer-center-fade-heading text-sm font-semibold uppercase tracking-[-0.009em]">
                            {footer.newsletterTitle}
                          </h3>

                          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-6">
                            {footer.newsletterDescription != null && (
                              <div className="text-[11px] md:text-sm leading-[1.5] opacity-60 max-w-none min-w-0 text-left [&_p]:mt-0 [&_h1]:mt-0 [&_h2]:mt-0 [&_h3]:mt-0">
                                <RichText
                                  data={footer.newsletterDescription}
                                  enableGutter={false}
                                  enableProse={false}
                                />
                              </div>
                            )}

                            <form
                              className="flex min-w-0 flex-col gap-3"
                              onSubmit={async (e) => {
                                e.preventDefault()
                                if (newsletterStatus !== 'idle') return
                                setNewsletterStatus('saving')
                                try {
                                  await new Promise((r) => setTimeout(r, 1200))
                                  setNewsletterStatus('saved')
                                  setTimeout(() => setNewsletterStatus('idle'), 2000)
                                } catch {
                                  setNewsletterStatus('idle')
                                }
                              }}
                            >
                              {/* FIX: Theme-aware Input — dark:bg-black/40 + dark:border-white/20 */}
                              <input
                                type="email"
                                name="newsletter-email"
                                placeholder={footer.newsletterPlaceholder ?? 'E-Mail'}
                                className="footer-newsletter-input h-10 w-full min-w-0 max-w-full rounded-full px-4 text-sm focus-visible:outline-none focus-visible:ring-2 transition-colors"
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

          {/* Bottom Bar */}
          {/* FIX: footer-bottom-border statt border-white/10 hardkodiert */}
          <div className="mt-10 flex flex-col items-center gap-4 footer-bottom-border pt-6 text-[11px] md:text-sm opacity-60 md:flex-row md:flex-wrap md:items-center md:justify-between">
            {footer.copyrightText != null && (
              <span className="text-center md:text-left tracking-[-0.03em]">
                {footer.copyrightText}
              </span>
            )}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 md:ml-auto md:justify-start">
              {footer.privacyLink != null && (
                <Link
                  href={footer.privacyLink}
                  className="footer-link text-[12px] md:text-sm leading-3 opacity-60 tracking-[-0.03em] transition-opacity duration-200 ease-out hover:opacity-100 max-sm:flex max-sm:items-center max-sm:min-h-[44px]"
                >
                  <span className="footer-link-text">{messages[locale].footer.privacy}</span>
                  <ArrowRight
                    className="footer-link-arrow inline-block size-[0.85em] shrink-0"
                    aria-hidden
                  />
                </Link>
              )}
              {footer.termsLink != null && (
                <Link
                  href={footer.termsLink}
                  className="footer-link text-[12px] md:text-sm leading-3 opacity-60 tracking-[-0.03em] transition-opacity duration-200 ease-out hover:opacity-100 max-sm:flex max-sm:items-center max-sm:min-h-[44px]"
                >
                  <span className="footer-link-text">{messages[locale].footer.terms}</span>
                  <ArrowRight
                    className="footer-link-arrow inline-block size-[0.85em] shrink-0"
                    aria-hidden
                  />
                </Link>
              )}
              <div className="ml-auto flex items-center gap-3 md:ml-0">
                <ThemeSelector />
              </div>
            </div>
          </div>
        </div>
      </FooterBounce>
    </footer>
  )
}
