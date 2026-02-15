/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
/* Resolving params/searchParams (Next.js 15) before passing to RootPage so document view loads. */
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({
    config,
    params: await params,
    searchParams: await searchParams,
  })

const Page = async ({ params, searchParams }: Args) =>
  RootPage({
    config,
    params: await params,
    searchParams: await searchParams,
    importMap,
  })

export default Page
