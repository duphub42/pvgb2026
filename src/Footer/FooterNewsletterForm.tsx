'use client'

import React from 'react'

type Props = {
  placeholder?: string | null
  buttonText?: string | null
}

export const FooterNewsletterForm: React.FC<Props> = ({
  placeholder = 'E-Mail',
  buttonText = 'Anmelden',
}) => (
  <form
    className="flex flex-col gap-2 sm:flex-row"
    onSubmit={(e) => e.preventDefault()}
  >
    {/* FIX: footer-newsletter-input statt hardkodiertem bg-white/10 border-white/20 text-white */}
    <input
      type="email"
      placeholder={placeholder ?? 'E-Mail'}
      className="footer-newsletter-input min-w-0 flex-1 rounded px-3 py-2 text-sm"
    />
    {/* FIX: footer-newsletter-submit statt hardkodiertem bg-white/20 text-white */}
    <button
      type="submit"
      className="footer-newsletter-submit shrink-0 rounded px-4 py-2 text-sm font-medium transition-colors"
    >
      {buttonText ?? 'Anmelden'}
    </button>
  </form>
)
