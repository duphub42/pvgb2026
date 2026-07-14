import { NextResponse } from 'next/server'

const BOOKING_URL = 'https://cal.com/philippbacher/30min'

export function GET() {
  return NextResponse.redirect(BOOKING_URL, 307)
}
