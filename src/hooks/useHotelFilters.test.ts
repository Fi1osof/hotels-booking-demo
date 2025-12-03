import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useHotelFilters } from './useHotelFilters'
import { Hotel } from '@/types/hotel'

const mockHotels: Hotel[] = [
  {
    id: 1,
    name: 'Test Hotel',
    city: 'Bangkok',
    price: 100,
    rating: 4.5,
    amenities: ['WiFi', 'Pool'],
    availability: { checkIn: '2025-01-10', checkOut: '2025-01-20' },
  },
  {
    id: 2,
    name: 'Budget Inn',
    city: 'Phuket',
    price: 50,
    rating: 3.0,
    amenities: ['WiFi'],
    availability: { checkIn: '2025-01-05', checkOut: '2025-01-25' },
  },
]

describe('useHotelFilters', () => {
  it('returns all hotels initially', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))
    expect(result.current.paginatedHotels).toHaveLength(2)
  })

  it('filters by search', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))

    act(() => {
      result.current.setSearch('Budget')
    })

    expect(result.current.paginatedHotels).toHaveLength(1)
    expect(result.current.paginatedHotels[0].name).toBe('Budget Inn')
  })

  it('filters by price range', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))

    act(() => {
      result.current.setPriceRange(0, 60)
    })

    expect(result.current.paginatedHotels).toHaveLength(1)
    expect(result.current.paginatedHotels[0].price).toBe(50)
  })

  it('filters by minimum rating', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))

    act(() => {
      result.current.setMinRating(4)
    })

    expect(result.current.paginatedHotels).toHaveLength(1)
    expect(result.current.paginatedHotels[0].rating).toBe(4.5)
  })

  it('resets filters', () => {
    const { result } = renderHook(() => useHotelFilters(mockHotels))

    act(() => {
      result.current.setSearch('Budget')
      result.current.setMinRating(4)
    })

    expect(result.current.paginatedHotels).toHaveLength(0)

    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.paginatedHotels).toHaveLength(2)
  })
})
