'use client'

import React from 'react'

import { Code } from './Component.client'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'
import { BlockContainer } from '@/components/BlockContainer'

export type CodeBlockProps = {
  code: string
  language?: string
  blockType: 'code'
}

type CodeBlockComponentProps = CodeBlockProps & {
  className?: string
  index?: number
}

export const CodeBlock: React.FC<CodeBlockComponentProps> = (props) => {
  const { className, code, language, index = 0, ...styleProps } = props

  // Style-Props direkt an BlockContainer übergeben
  const styles = styleProps as unknown as BlockStyles

  return (
    <BlockContainer styles={styles} index={index} className={className}>
      <div className="not-prose">
        <Code code={code} language={language} />
      </div>
    </BlockContainer>
  )
}
