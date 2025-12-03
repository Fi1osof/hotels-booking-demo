import React from 'react'
import { RatingWrapper, RatingLabel, RatingStars, Star, RatingValue } from './styles'

export interface RatingProps {
  label?: string
  value: number
  maxStars?: number
  showValue?: boolean
  interactive?: boolean
  onChange?: (value: number) => void
}

export const Rating: React.FC<RatingProps> = ({
  label,
  value,
  maxStars = 5,
  showValue = false,
  interactive = false,
  onChange,
}) => {
  const handleClick = (starValue: number) => {
    if (interactive && onChange) {
      onChange(starValue)
    }
  }

  return (
    <RatingWrapper>
      {label && <RatingLabel>{label}</RatingLabel>}
      <RatingStars>
        {Array.from({ length: maxStars }, (_, i) => (
          <Star
            key={i}
            $filled={i < Math.round(value)}
            $interactive={interactive}
            onClick={() => handleClick(i + 1)}
            aria-label={`${i + 1} star${i === 0 ? '' : 's'}`}
            type="button"
            tabIndex={interactive ? 0 : -1}
          >
            ★
          </Star>
        ))}
        {showValue && <RatingValue>{value.toFixed(1)}</RatingValue>}
      </RatingStars>
    </RatingWrapper>
  )
}
