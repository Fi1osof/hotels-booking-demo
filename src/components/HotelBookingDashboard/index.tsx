'use client'

import React, { useState, useEffect } from 'react'
import { Hotel } from '@/types/hotel'
import { ALL_AMENITIES, PRICE_RANGE } from '@/data/hotels'
import { useDebounce } from '@/hooks/useDebounce'
import { useHotelFilters } from '@/hooks/useHotelFilters'
import { Button, Input, Select, Checkbox, RangeSlider, DatePicker, Badge, Rating, Popover } from '@/ui-kit'
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  FiltersSection,
  FiltersHeader,
  FiltersTitle,
  FiltersGrid,
  FilterGroup,
  FilterLabel,
  AmenitiesGroup,
  SortSection,
  ResultsCount,
  SortControls,
  HotelsGrid,
  HotelCard,
  HotelName,
  HotelCity,
  HotelDetails,
  HotelPrice,
  HotelAmenities,
  AmenityTag,
  HotelAvailability,
  Pagination,
  PageInfo,
  EmptyState,
  EmptyStateTitle,
  EmptyStateText,
  LoadingOverlay,
} from './styles'

interface HotelBookingDashboardProps {
  initialHotels: Hotel[]
}

const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
  { value: 'rating-asc', label: 'Rating: Low to High' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
]

export const HotelBookingDashboard: React.FC<HotelBookingDashboardProps> = ({ initialHotels }) => {
  const [searchInput, setSearchInput] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearch = useDebounce(searchInput, 300)

  const {
    filters,
    sort,
    page,
    totalPages,
    activeFiltersCount,
    paginatedHotels,
    totalResults,
    setSearch,
    setPriceRange,
    toggleAmenity,
    setMinRating,
    setDateRange,
    setSort,
    setPage,
    resetFilters,
  } = useHotelFilters(initialHotels)

  // Sync debounced search
  useEffect(() => {
    setSearch(debouncedSearch)
    setIsSearching(false)
  }, [debouncedSearch, setSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    setIsSearching(true)
  }

  const handleSortChange = (value: string) => {
    const [field, order] = value.split('-') as [typeof sort.field, typeof sort.order]
    setSort(field, order)
  }

  const handleClearFilters = () => {
    setSearchInput('')
    resetFilters()
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Hotel Booking Dashboard</DashboardTitle>
        <DashboardSubtitle>Find your perfect stay</DashboardSubtitle>
      </DashboardHeader>

      <FiltersSection>
        <FiltersHeader>
          <FiltersTitle>
            Filters
            {activeFiltersCount > 0 && <Badge variant="primary">{activeFiltersCount}</Badge>}
          </FiltersTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Clear all
            </Button>
          )}
        </FiltersHeader>

        <FiltersGrid>
          <FilterGroup>
            <Input
              label="Search"
              placeholder="Hotel name or city..."
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Search hotels by name or city"
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Price Range</FilterLabel>
            <Popover
              trigger={
                <>
                  ${filters.priceMin} — ${filters.priceMax}
                </>
              }
            >
              <RangeSlider
                min={PRICE_RANGE.min}
                max={PRICE_RANGE.max}
                minValue={filters.priceMin}
                maxValue={filters.priceMax}
                onMinChange={(min) => setPriceRange(min, filters.priceMax)}
                onMaxChange={(max) => setPriceRange(filters.priceMin, max)}
              />
            </Popover>
          </FilterGroup>

          <FilterGroup>
            <Rating
              label="Minimum Rating"
              value={filters.minRating}
              interactive
              onChange={setMinRating}
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Dates</FilterLabel>
            <Popover
              trigger={
                <>
                  {filters.checkIn && filters.checkOut
                    ? `${filters.checkIn} — ${filters.checkOut}`
                    : 'Select dates'}
                </>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <DatePicker
                  label="Check-in"
                  value={filters.checkIn}
                  onChange={(value) => setDateRange(value, filters.checkOut)}
                  aria-label="Check-in date"
                />
                <DatePicker
                  label="Check-out"
                  value={filters.checkOut}
                  onChange={(value) => setDateRange(filters.checkIn, value)}
                  aria-label="Check-out date"
                />
              </div>
            </Popover>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Amenities</FilterLabel>
            <AmenitiesGroup>
              {ALL_AMENITIES.map((amenity) => (
                <Checkbox
                  key={amenity}
                  label={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                />
              ))}
            </AmenitiesGroup>
          </FilterGroup>
        </FiltersGrid>
      </FiltersSection>

      <SortSection>
        <ResultsCount>
          {totalResults} hotel{totalResults !== 1 ? 's' : ''} found
        </ResultsCount>
        <SortControls>
          <Select
            label="Sort by"
            options={SORT_OPTIONS}
            value={`${sort.field}-${sort.order}`}
            onChange={handleSortChange}
            aria-label="Sort hotels"
          />
        </SortControls>
      </SortSection>

      {isSearching ? (
        <LoadingOverlay>
          <HotelsGrid>
            {paginatedHotels.map((hotel) => (
              <HotelCardComponent key={hotel.id} hotel={hotel} />
            ))}
          </HotelsGrid>
        </LoadingOverlay>
      ) : paginatedHotels.length > 0 ? (
        <HotelsGrid>
          {paginatedHotels.map((hotel) => (
            <HotelCardComponent key={hotel.id} hotel={hotel} />
          ))}
        </HotelsGrid>
      ) : (
        <EmptyState>
          <EmptyStateTitle>No hotels found</EmptyStateTitle>
          <EmptyStateText>Try adjusting your filters to find more results.</EmptyStateText>
        </EmptyState>
      )}

      {totalPages > 1 && (
        <Pagination>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            Previous
          </Button>
          <PageInfo>
            Page {page} of {totalPages}
          </PageInfo>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            Next
          </Button>
        </Pagination>
      )}
    </DashboardContainer>
  )
}

// Memoized hotel card component
const HotelCardComponent = React.memo(function HotelCardComponent({ hotel }: { hotel: Hotel }) {
  return (
    <HotelCard>
      <HotelName>{hotel.name}</HotelName>
      <HotelCity>{hotel.city}</HotelCity>
      <HotelDetails>
        <HotelPrice>{hotel.price}</HotelPrice>
        <Rating value={hotel.rating} showValue />
      </HotelDetails>
      <HotelAmenities>
        {hotel.amenities.map((amenity) => (
          <AmenityTag key={amenity}>{amenity}</AmenityTag>
        ))}
      </HotelAmenities>
      <HotelAvailability>
        Available: {hotel.availability.checkIn} — {hotel.availability.checkOut}
      </HotelAvailability>
    </HotelCard>
  )
})
