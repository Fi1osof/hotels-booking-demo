import { HotelBookingDashboard } from '@/components/HotelBookingDashboard'
import { HOTELS } from '@/data/hotels'

export default function HomePage() {
  return <HotelBookingDashboard initialHotels={HOTELS} />
}
