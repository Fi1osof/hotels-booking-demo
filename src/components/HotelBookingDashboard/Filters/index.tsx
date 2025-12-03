import React, { useCallback } from 'react'

import { ALL_AMENITIES, PRICE_RANGE } from '@/data/hotels'

import { Badge } from '@/ui-kit/Badge'
import { Input } from '@/ui-kit/Input'
import { Popover } from '@/ui-kit/Popover'
import { RangeSlider } from '@/ui-kit/RangeSlider'
import { Rating } from '@/ui-kit/Rating'
import { DatePicker } from '@/ui-kit/DatePicker'
import { Checkbox } from '@/ui-kit/Checkbox'

import {
  FiltersSection,
  FiltersHeader,
  FiltersTitle,
  FiltersGrid,
  FilterGroup,
  FilterLabel,
  AmenitiesGroup,
} from '../styles'
import { FilterState } from '@/types'
import { Button } from '@/ui-kit/Button'

type FiltersProps = {
  filters: FilterState
  activeFiltersCount: number
  setPriceRange: (min: number, max: number) => void
  toggleAmenity: (amenity: string) => void
  setMinRating: (rating: number) => void
  setDateRange: (checkIn: string, checkOut: string) => void
  resetFilters: () => void
  searchInput: string
  setSearchInput: React.Dispatch<React.SetStateAction<string>>
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  activeFiltersCount,
  resetFilters,
  setDateRange,
  setMinRating,
  setPriceRange,
  toggleAmenity,
  searchInput,
  setSearchInput,
}) => {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value)
    },
    [setSearchInput]
  )

  const handleClearFilters = useCallback(() => {
    setSearchInput('')
    resetFilters()
  }, [resetFilters, setSearchInput])

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

  return (
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
  )
}

/**
 * Memoized version of Filters component.
 * React.memo is a higher-order component that prevents re-rendering
 * if the incoming props have not changed (shallow comparison).
 * This optimization is useful for expensive components like Filters
 * that don't need to re-render on every parent update.
 */
export const FiltersMemo = React.memo(Filters)
