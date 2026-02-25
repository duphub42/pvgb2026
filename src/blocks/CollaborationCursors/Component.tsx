'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

// Konkreter Typ kommt nach payload generate:types (CollaborationCursorsBlock)
type CollaborationCursorsBlockProps = any

type User = {
  id: number
  name: string
  avatar: string
  message?: string
}

const users: User[] = [
  {
    id: 1,
    name: 'Hayden Bleasel',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    id: 2,
    name: 'shadcn',
    avatar: 'https://github.com/shadcn.png',
    message: 'Can we adjust the color?',
  },
  {
    id: 3,
    name: 'Lee Robinson',
    avatar: 'https://github.com/leerob.png',
  },
]

const colors = [
  {
    foreground: 'text-emerald-800',
    background: 'bg-emerald-50',
  },
  {
    foreground: 'text-rose-800',
    background: 'bg-rose-50',
  },
  {
    foreground: 'text-sky-800',
    background: 'bg-sky-50',
  },
]

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * 80) + 10,
    y: Math.floor(Math.random() * 80) + 10,
  }
}

export const CollaborationCursorsBlock: React.FC<CollaborationCursorsBlockProps> = (props) => {
  const { disableInnerContainer, className } = props ?? {}

  const [user1Position, setUser1Position] = useState({ x: 10, y: 8 })
  const [user2Position, setUser2Position] = useState({ x: 30, y: 40 })
  const [user3Position, setUser3Position] = useState({ x: 70, y: 50 })

  const positions = [user1Position, user2Position, user3Position]

  useEffect(() => {
    const interval = setInterval(() => {
      setUser1Position(getRandomPosition())
    }, Math.random() * 3000 + 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setUser2Position(getRandomPosition())
    }, Math.random() * 4000 + 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setUser3Position(getRandomPosition())
    }, Math.random() * 2500 + 1500)
    return () => clearInterval(interval)
  }, [])

  const usersWithPositions = users.map((user, index) => ({
    ...user,
    position: positions[index],
  }))

  return (
    <section className={cn('py-16', className)}>
      <div
        className={cn(
          'relative mx-auto aspect-[4/3] max-w-4xl rounded-3xl border border-border bg-[radial-gradient(var(--color-secondary),transparent_1px)] bg-[size:16px_16px] p-4',
          disableInnerContainer && 'max-w-none',
        )}
      >
        {/* Avatar stack oben rechts */}
        <div className="absolute right-6 top-6 flex -space-x-3">
          {usersWithPositions.map((user) => (
            <div
              key={user.id}
              className="h-8 w-8 overflow-hidden rounded-full border border-background shadow-sm"
            >
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Cursors */}
        {usersWithPositions.map((user, index) => (
          <div
            key={user.id}
            className="pointer-events-none absolute transition-all duration-1000"
            style={{
              top: `${user.position.y}%`,
              left: `${user.position.x}%`,
            }}
          >
            {/* Pointer */}
            <div
              className={cn(
                'h-3 w-3 rotate-45 border border-black/40 bg-white shadow-sm',
                'dark:border-white/30 dark:bg-zinc-900',
              )}
            />
            {/* Body */}
            <div
              className={cn(
                'mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs shadow-sm backdrop-blur',
                colors[index % colors.length].background,
                colors[index % colors.length].foreground,
              )}
            >
              <Image
                alt={user.name}
                className="h-4 w-4 rounded-full"
                height={16}
                src={user.avatar}
                unoptimized
                width={16}
              />
              <span className="font-medium">{user.name}</span>
              {user.message && (
                <span className="ml-1 text-[0.7rem] opacity-80">
                  {user.message}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

