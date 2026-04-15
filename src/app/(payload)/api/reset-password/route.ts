import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    // Find user
    const users = await payload.find({
      collection: 'users',
      where: { email: { equals: 'mail@philippbacher.com' } },
      overrideAccess: true,
    })
    
    if (users.docs.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    const user = users.docs[0]
    
    // Reset password using Payload's auth system
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: 'admin123',
      },
      overrideAccess: true,
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Password reset to: admin123',
      email: 'mail@philippbacher.com'
    })
  } catch (error) {
    console.error('Reset error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
