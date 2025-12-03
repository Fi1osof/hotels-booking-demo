import { HotelBookingDashboard } from '@/components/HotelBookingDashboard'
import { Hotel } from '@/types/hotel'

async function getHotels(): Promise<Hotel[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/hotels`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch hotels')
  }
  
  return res.json()
}

export default async function HomePage() {
  const hotels = await getHotels()
  
  return <HotelBookingDashboard initialHotels={hotels} />
}
