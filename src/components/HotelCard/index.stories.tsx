import type { Meta, StoryObj } from '@storybook/react'
import { HotelCard } from './index'

const meta: Meta<typeof HotelCard> = {
  title: 'Components/HotelCard',
  component: HotelCard,
}

export default meta
type Story = StoryObj<typeof HotelCard>

export const Default: Story = {
  args: {
    hotel: {
      id: 1,
      name: 'Grand Palace Hotel',
      city: 'Bangkok',
      price: 150,
      rating: 4.5,
      amenities: ['WiFi', 'Pool', 'Spa'],
      availability: {
        checkIn: '2024-01-15',
        checkOut: '2024-01-20',
      },
    },
  },
}

export const HighRating: Story = {
  args: {
    hotel: {
      id: 2,
      name: 'Luxury Resort & Spa',
      city: 'Phuket',
      price: 350,
      rating: 5,
      amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar'],
      availability: {
        checkIn: '2024-02-01',
        checkOut: '2024-02-10',
      },
    },
  },
}

export const Budget: Story = {
  args: {
    hotel: {
      id: 3,
      name: 'City Hostel',
      city: 'Chiang Mai',
      price: 25,
      rating: 3.2,
      amenities: ['WiFi'],
      availability: {
        checkIn: '2024-01-10',
        checkOut: '2024-01-12',
      },
    },
  },
}
