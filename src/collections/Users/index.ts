import type { Access, CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import type { User } from '@/payload-types'

const isProduction = process.env.NODE_ENV === 'production'
const adminEmails = new Set(
  (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
)

function isAdminUser(user: User | null | undefined): boolean {
  if (!user) return false
  const roles = (user as { roles?: unknown }).roles
  const hasAdminRole =
    Array.isArray(roles) &&
    roles.some(
      (role: unknown) => typeof role === 'string' && role.toLowerCase() === 'admin',
    )
  if (hasAdminRole) return true
  if (typeof user.email === 'string' && adminEmails.has(user.email.trim().toLowerCase())) return true
  // Dev fallback to avoid accidental lockout when no admin env is configured locally.
  if (!isProduction && adminEmails.size === 0) return true
  return false
}

const adminOnly: Access = ({ req: { user } }) => isAdminUser(user as User | null | undefined)
const adminOrSelf: Access = ({ req: { user } }) => {
  const typedUser = user as User | null | undefined
  if (!typedUser) return false
  if (isAdminUser(typedUser)) return true
  return { id: { equals: typedUser.id } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: adminOnly,
    delete: adminOnly,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    maxLoginAttempts: 5,
    // Cookie explizit für HTTPS/Vercel setzen, damit Admin-POSTs (z. B. Globals) nicht 401 liefern. Lokal (HTTP) ohne secure.
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}
