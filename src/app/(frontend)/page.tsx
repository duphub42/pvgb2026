import PageComponent from './[slug]/page'

export { generateMetadata } from './[slug]/page'

export default async function RootPage(props: {
  params?: Promise<{ slug?: string }>
  searchParams?: Promise<{ previewId?: string; [key: string]: string | string[] | undefined }>
}) {
  return <PageComponent params={props.params ?? Promise.resolve({})} searchParams={props.searchParams ?? Promise.resolve({})} />
}
