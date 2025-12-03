import React from 'react'
import { Hotel } from '@/types/hotel'
import { Rating } from '@/ui-kit'
import {
  HotelCardStyled,
  HotelName,
  HotelCity,
  HotelDetails,
  HotelPrice,
  HotelAmenities,
  AmenityTag,
  HotelAvailability,
} from './styles'

interface HotelCardProps {
  hotel: Hotel
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <HotelCardStyled>
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
    </HotelCardStyled>
  )
}
