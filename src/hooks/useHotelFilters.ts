import { useReducer, useMemo } from 'react'
import { Hotel, FilterState, SortConfig } from '@/types/hotel'
import { PRICE_RANGE } from '@/data/hotels'

// State
interface HotelFiltersState {
  filters: FilterState
  sort: SortConfig
  page: number
}

const initialState: HotelFiltersState = {
  filters: {
    search: '',
    priceMin: PRICE_RANGE.min,
    priceMax: PRICE_RANGE.max,
    amenities: [],
    minRating: 0,
    checkIn: '',
    checkOut: '',
  },
  sort: {
    field: 'price',
    order: 'asc',
  },
  page: 1,
}

// Actions
type Action =
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_PRICE_RANGE'; payload: { min: number; max: number } }
  | { type: 'TOGGLE_AMENITY'; payload: string }
  | { type: 'SET_MIN_RATING'; payload: number }
  | { type: 'SET_DATE_RANGE'; payload: { checkIn: string; checkOut: string } }
  | { type: 'SET_SORT'; payload: SortConfig }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'RESET_FILTERS' }

// Reducer
function reducer(state: HotelFiltersState, action: Action): HotelFiltersState {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        ...state,
        filters: { ...state.filters, search: action.payload },
        page: 1,
      }
    case 'SET_PRICE_RANGE':
      return {
        ...state,
        filters: {
          ...state.filters,
          priceMin: action.payload.min,
          priceMax: action.payload.max,
        },
        page: 1,
      }
    case 'TOGGLE_AMENITY': {
      const amenities = state.filters.amenities.includes(action.payload)
        ? state.filters.amenities.filter((a) => a !== action.payload)
        : [...state.filters.amenities, action.payload]
      return {
        ...state,
        filters: { ...state.filters, amenities },
        page: 1,
      }
    }
    case 'SET_MIN_RATING':
      return {
        ...state,
        filters: { ...state.filters, minRating: action.payload },
        page: 1,
      }
    case 'SET_DATE_RANGE':
      return {
        ...state,
        filters: {
          ...state.filters,
          checkIn: action.payload.checkIn,
          checkOut: action.payload.checkOut,
        },
        page: 1,
      }
    case 'SET_SORT':
      return { ...state, sort: action.payload, page: 1 }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'RESET_FILTERS':
      return { ...initialState, sort: state.sort }
    default:
      return state
  }
}

// Hook
const ITEMS_PER_PAGE = 10

export function useHotelFilters(hotels: Hotel[]) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    setSearch,
    setPriceRange,
    toggleAmenity,
    setMinRating,
    setDateRange,
    setSort,
    setPage,
    resetFilters,
  } = useMemo(() => {
    return {
      setSearch: (search: string) => {
        dispatch({ type: 'SET_SEARCH', payload: search })
      },
      setPriceRange: (min: number, max: number) => {
        dispatch({ type: 'SET_PRICE_RANGE', payload: { min, max } })
      },
      toggleAmenity: (amenity: string) => {
        dispatch({ type: 'TOGGLE_AMENITY', payload: amenity })
      },
      setMinRating: (rating: number) => {
        dispatch({ type: 'SET_MIN_RATING', payload: rating })
      },
      setDateRange: (checkIn: string, checkOut: string) => {
        dispatch({ type: 'SET_DATE_RANGE', payload: { checkIn, checkOut } })
      },
      setSort: (field: SortConfig['field'], order: SortConfig['order']) => {
        dispatch({ type: 'SET_SORT', payload: { field, order } })
      },
      setPage: (page: number) => {
        dispatch({ type: 'SET_PAGE', payload: page })
      },
      resetFilters: () => {
        dispatch({ type: 'RESET_FILTERS' })
      },
    }
  }, [])

  // Filtered & sorted results
  const filteredHotels = useMemo(() => {
    const { filters, sort } = state

    let result = hotels.filter((hotel) => {
      // Search
      if (filters.search) {
        const search = filters.search.toLowerCase()
        if (
          !hotel.name.toLowerCase().includes(search) &&
          !hotel.city.toLowerCase().includes(search)
        ) {
          return false
        }
      }

      // Price range
      if (hotel.price < filters.priceMin || hotel.price > filters.priceMax) {
        return false
      }

      // Amenities
      if (filters.amenities.length > 0) {
        if (!filters.amenities.every((a) => hotel.amenities.includes(a))) {
          return false
        }
      }

      // Rating
      if (hotel.rating < filters.minRating) {
        return false
      }

      // Date availability
      if (filters.checkIn && filters.checkOut) {
        const hotelCheckIn = new Date(hotel.availability.checkIn)
        const hotelCheckOut = new Date(hotel.availability.checkOut)
        const filterCheckIn = new Date(filters.checkIn)
        const filterCheckOut = new Date(filters.checkOut)

        if (filterCheckIn < hotelCheckIn || filterCheckOut > hotelCheckOut) {
          return false
        }
      }

      return true
    })

    // Sort
    result = [...result].sort((a, b) => {
      let comparison = 0
      switch (sort.field) {
        case 'price':
          comparison = a.price - b.price
          break
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
      }
      return sort.order === 'asc' ? comparison : -comparison
    })

    return result
  }, [hotels, state])

  // Pagination
  const totalPages = Math.ceil(filteredHotels.length / ITEMS_PER_PAGE)
  const paginatedHotels = useMemo(() => {
    const start = (state.page - 1) * ITEMS_PER_PAGE
    return filteredHotels.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredHotels, state.page])

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (state.filters.search) count++
    if (state.filters.priceMin > PRICE_RANGE.min || state.filters.priceMax < PRICE_RANGE.max)
      count++
    if (state.filters.amenities.length > 0) count++
    if (state.filters.minRating > 0) count++
    if (state.filters.checkIn && state.filters.checkOut) count++
    return count
  }, [state.filters])

  return {
    // State
    filters: state.filters,
    sort: state.sort,
    page: state.page,
    totalPages,
    activeFiltersCount,

    // Data
    filteredHotels,
    paginatedHotels,
    totalResults: filteredHotels.length,

    // Actions
    setSearch,
    setPriceRange,
    toggleAmenity,
    setMinRating,
    setDateRange,
    setSort,
    setPage,
    resetFilters,
  }
}
