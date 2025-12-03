'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Hotel } from '@/types/hotel'
import { ALL_AMENITIES, PRICE_RANGE } from '@/data/hotels'
import { useDebounce } from '@/hooks/useDebounce'
import { useHotelFilters } from '@/hooks/useHotelFilters'
import { HotelCard } from '@/components/HotelCard'
import { Statistics } from '@/components/Statistics'
import {
  DashboardContainer,
  DashboardHeader,
  HeaderTop,
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
  Pagination,
  PageInfo,
  EmptyState,
  EmptyStateTitle,
  EmptyStateText,
  LoadingOverlay,
} from './styles'
import { Button } from '@/ui-kit/Button'
import { Modal } from '@/ui-kit/Modal'
import { Badge } from '@/ui-kit/Badge'
import { Input } from '@/ui-kit/Input'
import { Popover } from '@/ui-kit/Popover'
import { RangeSlider } from '@/ui-kit/RangeSlider'
import { Rating } from '@/ui-kit/Rating'
import { DatePicker } from '@/ui-kit/DatePicker'
import { Checkbox } from '@/ui-kit/Checkbox'
import { Select } from '@/ui-kit/Select'

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
  const [isStatsOpen, setIsStatsOpen] = useState(false)
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
  }, [debouncedSearch, setSearch])

  const isSearching = searchInput !== debouncedSearch

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }, [])

  const handleSortChange = useCallback(
    (value: string) => {
      const [field, order] = value.split('-') as [typeof sort.field, typeof sort.order]
      setSort(field, order)
    },
    [setSort, sort]
  )

  const handleClearFilters = useCallback(() => {
    setSearchInput('')
    resetFilters()
  }, [resetFilters])

  const handlePageChange = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const value = Number(e.currentTarget.value)
      setPage(value)
    },
    [setPage]
  )

  const handleMinPriceChange = useCallback(
    (min: number) => {
      setPriceRange(min, filters.priceMax)
    },
    [setPriceRange, filters.priceMax]
  )

  const handleMaxPriceChange = useCallback(
    (max: number) => {
      setPriceRange(filters.priceMin, max)
    },
    [setPriceRange, filters.priceMin]
  )

  const handleCheckInChange = useCallback(
    (value: string) => {
      setDateRange(value, filters.checkOut)
    },
    [setDateRange, filters.checkOut]
  )

  const handleCheckOutChange = useCallback(
    (value: string) => {
      setDateRange(filters.checkIn, value)
    },
    [setDateRange, filters.checkIn]
  )

  const handleAmenityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      toggleAmenity(e.target.value)
    },
    [toggleAmenity]
  )

  const handleOpenStats = useCallback(() => {
    setIsStatsOpen(true)
  }, [])

  const handleCloseStats = useCallback(() => {
    setIsStatsOpen(false)
  }, [])

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderTop>
          <div>
            <DashboardTitle>Hotel Booking Dashboard</DashboardTitle>
            <DashboardSubtitle>Find your perfect stay</DashboardSubtitle>
          </div>
          <Button variant="secondary" onClick={handleOpenStats}>
            📊 Statistics
          </Button>
        </HeaderTop>
      </DashboardHeader>

      <Modal isOpen={isStatsOpen} onClose={handleCloseStats} title="Hotel Statistics">
        <Statistics hotels={initialHotels} />
      </Modal>

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
                onMinChange={handleMinPriceChange}
                onMaxChange={handleMaxPriceChange}
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
                  onChange={handleCheckInChange}
                  aria-label="Check-in date"
                />
                <DatePicker
                  label="Check-out"
                  value={filters.checkOut}
                  onChange={handleCheckOutChange}
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
                  value={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onChange={handleAmenityChange}
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
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </HotelsGrid>
        </LoadingOverlay>
      ) : paginatedHotels.length > 0 ? (
        <HotelsGrid>
          {paginatedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
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
            value={page - 1}
            onClick={handlePageChange}
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
            value={page + 1}
            onClick={handlePageChange}
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
