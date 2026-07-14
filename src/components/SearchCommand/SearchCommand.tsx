'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  WEBMCP_OPEN_SITE_SEARCH_EVENT,
  type OpenSiteSearchDetail,
} from '@/utilities/webmcp/events'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

const placeholder = 'Suchen…'
const emptyText = 'Keine Ergebnisse.'

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((current) => !current)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  React.useEffect(() => {
    const onOpenSearch = (event: Event) => {
      const detail = (event as CustomEvent<OpenSiteSearchDetail>).detail ?? {}

      if (detail.navigate && detail.query) {
        router.push(`/search?q=${encodeURIComponent(detail.query)}`)
        return
      }

      setOpen(true)
      if (detail.query) {
        setSearchValue(detail.query)
      }
    }

    window.addEventListener(WEBMCP_OPEN_SITE_SEARCH_EVENT, onOpenSearch)
    return () => window.removeEventListener(WEBMCP_OPEN_SITE_SEARCH_EVENT, onOpenSearch)
  }, [router])

  const run = React.useCallback((fn: () => void) => {
    setOpen(false)
    fn()
  }, [])

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="header-tool-toggle header-icon-btn shrink-0 text-current"
            onClick={() => setOpen(true)}
            aria-label="Suchen"
          >
            <Search className="h-5 w-5" aria-hidden />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={6}>
          Suchen <span className="text-muted-foreground">⌘K</span>
        </TooltipContent>
      </Tooltip>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={placeholder}
          value={searchValue}
          onValueChange={setSearchValue}
        />
        <CommandList>
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandGroup heading="Seiten">
            <CommandItem onSelect={() => run(() => router.push('/'))} className="cursor-pointer">
              Start
            </CommandItem>
            <CommandItem
              onSelect={() => run(() => router.push('/posts'))}
              className="cursor-pointer"
            >
              Blog
            </CommandItem>
            <CommandItem
              onSelect={() =>
                run(() =>
                  router.push(
                    searchValue.trim()
                      ? `/search?q=${encodeURIComponent(searchValue.trim())}`
                      : '/search',
                  ),
                )
              }
              className="cursor-pointer"
            >
              Vollständige Suche
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
