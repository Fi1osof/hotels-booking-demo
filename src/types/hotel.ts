export type Hotel = {
  id: number
  name: string
  city: string
  price: number
  rating: number
  amenities: string[]
  availability: {
    checkIn: string
    checkOut: string
  }
}

export type SortField = 'price' | 'rating' | 'name'
export type SortOrder = 'asc' | 'desc'

export interface SortConfig {
  field: SortField
  order: SortOrder
}

export interface FilterState {
  search: string
  priceMin: number
  priceMax: number
  amenities: string[]
  minRating: number
  checkIn: string
  checkOut: string
}
