'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Loader2, Check, Sparkles } from 'lucide-react'

import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/ui'

export type SaveButtonStatus = 'idle' | 'saving' | 'saved'

export interface SaveButtonText {
  idle?: string
  saving?: string
  saved?: string
}

export interface SaveButtonProps {
  text?: SaveButtonText
  className?: string
  /** Optional class for the root wrapper (e.g. h-full for same height as sibling input). */
  wrapperClassName?: string
  /** Footer variant: always black bg, white text (glow border via wrapper in footer). */
  variant?: 'default' | 'footer'
  onSave?: () => Promise<void> | void
  /** Controlled mode: parent drives status (e.g. form submit). When set, button is presentational; form's onSubmit handles submit. */
  status?: SaveButtonStatus
  type?: 'button' | 'submit'
  disabled?: boolean
}

const defaultText: Required<SaveButtonText> = {
  idle: 'Save',
  saving: 'Saving...',
  saved: 'Saved!',
}

export function SaveButton({
  text = defaultText,
  className,
  wrapperClassName,
  variant = 'default',
  onSave,
  status: controlledStatus,
  type = 'button',
  disabled = false,
}: SaveButtonProps) {
  const [internalStatus, setInternalStatus] = useState<SaveButtonStatus>('idle')
  const [bounce, setBounce] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const isControlled = controlledStatus != null
  const status = isControlled ? controlledStatus : internalStatus
  const savedFiredRef = useRef(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isControlled && status === 'saved') {
      if (!savedFiredRef.current) {
        savedFiredRef.current = true
        triggerConfetti(wrapperRef.current)
        setBounce(true)
      }
    } else {
      savedFiredRef.current = false
      if (status !== 'saved') setBounce(false)
    }
  }, [isControlled, status])

  const triggerConfetti = async (anchor?: HTMLDivElement | null) => {
    try {
      const { default: confetti } = await import('canvas-confetti')
      let origin: { x: number; y: number } = { x: 0.5, y: 0.6 }
      if (anchor && typeof window !== 'undefined') {
        const rect = anchor.getBoundingClientRect()
        origin = {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      }
      confetti({
        particleCount: 100,
        spread: 70,
        origin,
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'],
        shapes: ['star', 'circle'],
      })
    } catch {
      // ignore
    }
  }

  const handleSave = async () => {
    if (status !== 'idle' || disabled) return
    if (!isControlled) {
      setInternalStatus('saving')
      try {
        if (onSave) {
          await onSave()
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
        setInternalStatus('saved')
        setBounce(true)
        triggerConfetti(wrapperRef.current)
        setTimeout(() => {
          setInternalStatus('idle')
          setBounce(false)
        }, 2000)
      } catch (error) {
        setInternalStatus('idle')
        console.error('Save failed:', error)
      }
    }
  }

  const buttonVariants =
    variant === 'footer'
      ? {
          idle: { backgroundColor: 'rgb(0, 0, 0)', color: 'white', scale: 1 },
          saving: { backgroundColor: 'rgb(0, 0, 0)', color: 'white', scale: 1 },
          saved: {
            backgroundColor: 'rgb(34, 197, 94)',
            color: 'white',
            scale: [1, 1.1, 1] as unknown as number,
            transition: { duration: 0.2, times: [0, 0.5, 1] },
          },
        }
      : {
          idle: {
            backgroundColor: isDark ? 'rgb(64, 64, 64)' : 'rgb(243, 244, 246)',
            color: isDark ? 'white' : 'black',
            scale: 1,
          },
          saving: {
            backgroundColor: 'rgb(59, 130, 246)',
            color: 'white',
            scale: 1,
          },
          saved: {
            backgroundColor: 'rgb(34, 197, 94)',
            color: 'white',
            scale: [1, 1.1, 1] as unknown as number,
            transition: { duration: 0.2, times: [0, 0.5, 1] },
          },
        }

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  }

  const labels: SaveButtonText = { ...defaultText, ...text }

  return (
    <div ref={wrapperRef} className={cn('relative', wrapperClassName)}>
      <motion.button
        type={type}
        onClick={type === 'button' ? handleSave : undefined}
        animate={status}
        variants={buttonVariants}
        disabled={disabled || status === 'saving'}
        className={cn(
          'group relative grid overflow-hidden rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:shadow-lg',
          variant === 'default' &&
            status === 'idle' &&
            'shadow-[0_1000px_0_0_hsl(0_0%_85%)_inset] dark:shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset]',
          variant === 'footer' &&
            status === 'idle' &&
            'shadow-[0_1000px_0_0_rgb(12,12,12)_inset]',
          className,
        )}
        style={variant === 'footer' ? undefined : { minWidth: '150px' }}
        whileHover={status === 'idle' ? { scale: 1.05 } : {}}
        whileTap={status === 'idle' ? { scale: 0.95 } : {}}
      >
        {status === 'idle' && (
          <span>
            <span
              className={cn(
                'spark mask-gradient absolute inset-0 h-full w-full animate-flip overflow-hidden rounded-full',
                '[mask:linear-gradient(black,transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,black_360deg)]',
                'before:rotate-[-90deg] before:animate-rotate dark:before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]',
                "before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%] dark:[mask:linear-gradient(white,transparent_50%)]",
              )}
            />
          </span>
        )}
        <span
          className={cn(
            'backdrop absolute inset-px rounded-[22px] transition-colors duration-200',
            status === 'idle' && variant === 'default' &&
              'bg-neutral-100 group-hover:bg-neutral-200 dark:bg-neutral-950 dark:group-hover:bg-neutral-900',
            status === 'idle' && variant === 'footer' && 'bg-black group-hover:bg-black/90',
          )}
        />
        <span className="z-10 flex items-center justify-center gap-2">
          <AnimatePresence mode="wait">
            {status === 'saving' && (
              <motion.span
                key="saving"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  rotate: { repeat: Number.POSITIVE_INFINITY, duration: 1, ease: 'linear' },
                }}
              >
                <Loader2 className="h-4 w-4" />
              </motion.span>
            )}
            {status === 'saved' && (
              <motion.span
                key="saved"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Check className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {status === 'idle' ? labels.idle : status === 'saving' ? labels.saving : labels.saved}
          </motion.span>
        </span>
      </motion.button>
      <AnimatePresence>
        {bounce && (
          <motion.div
            className="absolute top-0 right-0 -mr-1 -mt-1"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={sparkleVariants}
          >
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
