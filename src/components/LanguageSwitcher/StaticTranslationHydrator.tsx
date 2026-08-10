'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { translateStringForLocale } from '@/i18n/translationOverlay'

const IGNORED_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'SELECT'])

function shouldTranslateTextNode(node: Text): boolean {
  const parent = node.parentElement
  if (!parent) return false
  if (IGNORED_TAGS.has(parent.tagName)) return false
  if (parent.closest('[translate="no"], .notranslate, [data-no-translate]')) return false
  const value = node.nodeValue ?? ''
  return value.trim().length > 2
}

function translateTextNode(node: Text): void {
  if (!shouldTranslateTextNode(node)) return

  const value = node.nodeValue ?? ''
  const nextValue = translateStringForLocale(value, 'en')
  if (nextValue !== value) node.nodeValue = nextValue
}

function translateElement(root: ParentNode): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []

  while (walker.nextNode()) {
    const current = walker.currentNode
    if (current.nodeType === Node.TEXT_NODE) textNodes.push(current as Text)
  }

  textNodes.forEach(translateTextNode)
}

export function StaticTranslationHydrator() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname?.startsWith('/en')) return

    translateElement(document.body)

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData' && mutation.target.nodeType === Node.TEXT_NODE) {
          translateTextNode(mutation.target as Text)
          continue
        }

        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            translateTextNode(node as Text)
            return
          }

          if (node.nodeType === Node.ELEMENT_NODE) {
            translateElement(node as Element)
          }
        })
      }
    })

    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [pathname])

  return null
}
