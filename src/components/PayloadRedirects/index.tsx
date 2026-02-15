import type React from 'react'
import type { Page, Post } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    const ref = redirectItem.to?.reference
    if (ref) {
      const relationTo = ref.relationTo
      const pathPrefix =
        relationTo !== 'site-pages' && relationTo !== 'blog-posts'
          ? `/${relationTo}`
          : relationTo === 'blog-posts'
            ? '/posts'
            : ''

      let redirectUrl: string
      if (typeof ref.value === 'object' && ref.value && 'slug' in ref.value) {
        redirectUrl = `${pathPrefix}/${(ref.value as Page | Post).slug ?? ''}`
      } else if (typeof ref.value === 'number') {
        const payload = await getPayload({ config: configPromise })
        const document = (await payload.findByID({
          collection: relationTo,
          id: ref.value,
          depth: 0,
        })) as Page | Post
        redirectUrl = `${pathPrefix}/${document?.slug ?? ''}`
      } else if (typeof ref.value === 'string') {
        const document = (await getCachedDocument(relationTo, ref.value)()) as Page | Post
        redirectUrl = `${pathPrefix}/${document?.slug ?? ''}`
      } else {
        redirectUrl = `${pathPrefix}/`
      }
      if (redirectUrl && redirectUrl !== '/') redirect(redirectUrl)
    }
  }

  if (disableNotFound) return null

  notFound()
}
