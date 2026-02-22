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
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

const placeholder = 'Suchen…'
const emptyText = 'Keine Ergebnisse.'

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const run = React.useCallback(
    (fn: () => void) => {
      setOpen(false)
      fn()
    },
    [],
  )

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="header-tool-toggle header-tool-toggle--theme shrink-0"
            onClick={() => setOpen(true)}
            aria-label="Suchen"
          >
            <Search />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={6}>
          Suchen <span className="text-muted-foreground">⌘K</span>
        </TooltipContent>
      </Tooltip>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandGroup heading="Seiten">
            <CommandItem
              onSelect={() => run(() => router.push('/'))}
              className="cursor-pointer"
            >
              Start
            </CommandItem>
            <CommandItem
              onSelect={() => run(() => router.push('/posts'))}
              className="cursor-pointer"
            >
              Blog
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
