import type { ArchiveBlock as ArchiveBlockFields } from '@/payload-types'

import RichText from '@/components/RichText'

import {
  CollectionArchive,
  type Props as CollectionArchiveProps,
} from '@/components/CollectionArchive'

export type ArchiveBlockComponentProps = ArchiveBlockFields & {
  id?: string
  disableInnerContainer?: boolean
}

export async function ArchiveBlockComponent(props: ArchiveBlockComponentProps) {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: CollectionArchiveProps['posts'] = []

  if (populateBy === 'collection') {
    const payloadModule = await import('payload')
    const configModule = await import('@payload-config')
    const config = (configModule as { default?: unknown }).default ?? configModule
    const payload = payloadModule.getPayload({ config })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'blog-posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs as CollectionArchiveProps['posts']
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as CollectionArchiveProps['posts']

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
