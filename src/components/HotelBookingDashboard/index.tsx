'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Hotel } from '@/types/hotel'
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
  SortSection,
  ResultsCount,
  SortControls,
  HotelsContainer,
  HotelsGrid,
  NoResults,
  Pagination,
  PageInfo,
} from './styles'
import { Button } from '@/ui-kit/Button'
import { Modal } from '@/ui-kit/Modal'
import { Select } from '@/ui-kit/Select'
import { FiltersMemo } from './Filters'

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

  const handleSortChange = useCallback(
    (value: string) => {
      const [field, order] = value.split('-') as [typeof sort.field, typeof sort.order]
      setSort(field, order)
    },
    [setSort, sort]
  )

  const handlePageChange = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const value = Number(e.currentTarget.value)
      setPage(value)
    },
    [setPage]
  )

  const handleOpenStats = useCallback(() => {
    setIsStatsOpen(true)
  }, [])

  const handleCloseStats = useCallback(() => {
    setIsStatsOpen(false)
  }, [])

  /**
   * Memoize the hotels list JSX to prevent unnecessary re-renders.
   * Without useMemo, every parent re-render creates a new JSX array,
   * causing React to treat each HotelCard as "new" and re-render it.
   * With useMemo, the same object reference is returned, so React
   * skips re-rendering when paginatedHotels hasn't changed.
   *
   * Note: React.memo on HotelCard is not used here because it adds
   * an extra node in the component tree, complicating React Fiber
   * traversal when accessing children via refs.
   *
   * This is an example of performance optimization technique.
   */
  const hotelsList = useMemo(() => {
    return paginatedHotels.length > 0 ? (
      <HotelsGrid>
        {paginatedHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </HotelsGrid>
    ) : (
      <NoResults>
        <h3>No hotels found</h3>
        <p>Try adjusting your filters to find more results.</p>
      </NoResults>
    )
  }, [paginatedHotels])

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

      <FiltersMemo
        filters={filters}
        activeFiltersCount={activeFiltersCount}
        setPriceRange={setPriceRange}
        toggleAmenity={toggleAmenity}
        setMinRating={setMinRating}
        setDateRange={setDateRange}
        resetFilters={resetFilters}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

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

      <HotelsContainer $loading={isSearching}>{hotelsList}</HotelsContainer>

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
