import { NextResponse } from 'next/server'
import { HOTELS } from '@/data/hotels'

export async function GET() {
  return NextResponse.json(HOTELS)
}
