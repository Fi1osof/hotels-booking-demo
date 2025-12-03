import React, { useMemo } from 'react'
import { Hotel } from '@/types/hotel'
import { transformData } from '@/utils/transformData'
import {
  StatisticsContainer,
  StatSection,
  StatSectionTitle,
  StatGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatSubValue,
  GroupList,
  GroupItem,
  GroupName,
  GroupValue,
} from './styles'

interface StatisticsProps {
  hotels: Hotel[]
}

export const Statistics: React.FC<StatisticsProps> = ({ hotels }) => {
  const stats = useMemo(() => {
    // Overall stats
    const totalHotels = hotels.length
    const avgPrice = hotels.reduce((sum, h) => sum + h.price, 0) / totalHotels
    const avgRating = hotels.reduce((sum, h) => sum + h.rating, 0) / totalHotels
    const priceRange = {
      min: Math.min(...hotels.map((h) => h.price)),
      max: Math.max(...hotels.map((h) => h.price)),
    }

    // Group by city
    const byCity = transformData(hotels, {
      groupBy: 'city',
      aggregations: { price: 'avg', rating: 'avg' },
      sortBy: { field: 'price', order: 'desc' },
    })

    // Group by rating range
    const ratingGroups = transformData(
      hotels.map((h) => ({
        ...h,
        ratingGroup:
          h.rating >= 4.5 ? 'Premium (4.5+)' : h.rating >= 3.5 ? 'Good (3.5-4.5)' : 'Budget (<3.5)',
      })),
      {
        groupBy: 'ratingGroup',
        aggregations: { price: 'avg' },
        sortBy: { field: 'price', order: 'desc' },
      }
    )

    // Amenities stats
    const amenityCounts: Record<string, number> = {}
    for (const hotel of hotels) {
      for (const amenity of hotel.amenities) {
        amenityCounts[amenity] = (amenityCounts[amenity] || 0) + 1
      }
    }
    const topAmenities = Object.entries(amenityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return {
      totalHotels,
      avgPrice,
      avgRating,
      priceRange,
      byCity,
      ratingGroups,
      topAmenities,
    }
  }, [hotels])

  return (
    <StatisticsContainer>
      <StatSection>
        <StatSectionTitle>Overview</StatSectionTitle>
        <StatGrid>
          <StatCard>
            <StatLabel>Total Hotels</StatLabel>
            <StatValue>{stats.totalHotels}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Average Price</StatLabel>
            <StatValue>${stats.avgPrice.toFixed(0)}</StatValue>
            <StatSubValue>
              ${stats.priceRange.min} - ${stats.priceRange.max}
            </StatSubValue>
          </StatCard>
          <StatCard>
            <StatLabel>Average Rating</StatLabel>
            <StatValue>{stats.avgRating.toFixed(1)} ★</StatValue>
          </StatCard>
        </StatGrid>
      </StatSection>

      <StatSection>
        <StatSectionTitle>By City</StatSectionTitle>
        <GroupList>
          {stats.byCity.map((group) => (
            <GroupItem key={group.key}>
              <GroupName>
                {group.key} ({group.count})
              </GroupName>
              <GroupValue>
                Avg: ${group.aggregates.price?.toFixed(0)} | {group.aggregates.rating?.toFixed(1)} ★
              </GroupValue>
            </GroupItem>
          ))}
        </GroupList>
      </StatSection>

      <StatSection>
        <StatSectionTitle>By Rating Category</StatSectionTitle>
        <GroupList>
          {stats.ratingGroups.map((group) => (
            <GroupItem key={group.key}>
              <GroupName>
                {group.key} ({group.count})
              </GroupName>
              <GroupValue>Avg price: ${group.aggregates.price?.toFixed(0)}</GroupValue>
            </GroupItem>
          ))}
        </GroupList>
      </StatSection>

      <StatSection>
        <StatSectionTitle>Top Amenities</StatSectionTitle>
        <GroupList>
          {stats.topAmenities.map(([amenity, count]) => (
            <GroupItem key={amenity}>
              <GroupName>{amenity}</GroupName>
              <GroupValue>
                {count} hotels ({((count / stats.totalHotels) * 100).toFixed(0)}%)
              </GroupValue>
            </GroupItem>
          ))}
        </GroupList>
      </StatSection>
    </StatisticsContainer>
  )
}
