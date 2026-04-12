'use client'

import { motion } from 'framer-motion'

export function AtmosphereBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.16),transparent_58%)]" />

      <motion.div
        className="absolute -top-28 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-36 left-0 h-[28rem] w-[28rem] rounded-full bg-cyan-300/10 blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2], x: [0, 36, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -right-24 top-1/3 h-[24rem] w-[24rem] rounded-full bg-indigo-300/10 blur-3xl"
        animate={{ opacity: [0.2, 0.38, 0.2], x: [0, -24, 0], y: [0, 18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
