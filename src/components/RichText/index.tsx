import type { ReactNode } from 'react'

import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { HtmlEmbedBlock } from '@/blocks/HtmlEmbed/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  HtmlEmbedBlock as HtmlEmbedBlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | HtmlEmbedBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields?.doc
  if (!doc?.value) return '#'
  const value = doc.value
  if (typeof value !== 'object' || value === null) return '#'
  const slug = 'slug' in value ? value.slug : undefined
  if (!slug || typeof slug !== 'string') return '#'
  const relationTo = doc.relationTo
  const isPost = relationTo === 'blog-posts' || relationTo === 'posts'
  return isPost ? `/posts/${slug}` : `/${slug}`
}

type LexicalUploadDoc = {
  alt?: string
  filename?: string
  height?: number
  mimeType?: string
  sizes?: Record<
    string,
    | {
        filename?: string
        filesize?: number
        height?: number
        mimeType?: string
        url?: string | null
        width?: number
      }
    | null
    | undefined
  >
  url?: string | null
  width?: number
}

/**
 * Payload's default upload JSX converter uses `typeof value !== 'object'`, which is false for
 * `null`, so deleted / unpopulated media throws on `.url`. This replaces that converter entirely
 * (no delegation) so the default implementation is never invoked.
 */
function lexicalUploadToJsx(node: { fields?: { alt?: string }; value?: unknown }): ReactNode {
  const v = node.value
  if (v === null || v === undefined || typeof v !== 'object' || Array.isArray(v)) {
    return null
  }
  const uploadDoc = v as LexicalUploadDoc
  const url = uploadDoc.url
  if (typeof url !== 'string' || !url) {
    return null
  }
  const mimeType = uploadDoc.mimeType
  if (typeof mimeType !== 'string' || !mimeType) {
    return null
  }

  const alt = node.fields?.alt || uploadDoc.alt || ''

  if (!mimeType.startsWith('image')) {
    return (
      <a href={url} rel="noopener noreferrer">
        {uploadDoc.filename ?? url}
      </a>
    )
  }

  if (!uploadDoc.sizes || !Object.keys(uploadDoc.sizes).length) {
    return <img alt={alt} height={uploadDoc.height} src={url} width={uploadDoc.width} />
  }

  const pictureChildren: ReactNode[] = []
  for (const size of Object.keys(uploadDoc.sizes)) {
    const imageSize = uploadDoc.sizes[size]
    if (
      !imageSize ||
      !imageSize.width ||
      !imageSize.height ||
      !imageSize.mimeType ||
      !imageSize.filesize ||
      !imageSize.filename ||
      !imageSize.url
    ) {
      continue
    }
    pictureChildren.push(
      <source
        key={size}
        media={`(max-width: ${imageSize.width}px)`}
        srcSet={imageSize.url}
        type={imageSize.mimeType}
      />,
    )
  }
  pictureChildren.push(
    <img key="image" alt={alt} height={uploadDoc.height} src={url} width={uploadDoc.width} />,
  )
  return <picture>{pictureChildren}</picture>
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  upload: ({ node }) => lexicalUploadToJsx(node),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    htmlEmbed: ({ node }) => <HtmlEmbedBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { data, className, enableProse = true, enableGutter = true, ...rest } = props
  if (!data?.root) {
    return null
  }
  return (
    <ConvertRichText
      converters={jsxConverters}
      data={data}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
