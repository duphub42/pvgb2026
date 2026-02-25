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
    <input
      type="email"
      placeholder={placeholder ?? 'E-Mail'}
      className="min-w-0 flex-1 rounded border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:opacity-70"
    />
    <button
      type="submit"
      className="shrink-0 rounded bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30"
    >
      {buttonText ?? 'Anmelden'}
    </button>
  </form>
)
