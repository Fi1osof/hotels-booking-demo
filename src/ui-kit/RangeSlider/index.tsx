import React from 'react'
import { RangeWrapper, RangeLabel, RangeInputs, RangeInput, RangeValues, RangeValue } from './styles'

export interface RangeSliderProps {
  label?: string
  min: number
  max: number
  minValue: number
  maxValue: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
  formatValue?: (value: number) => string
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  formatValue = (v) => `$${v}`,
}) => {
  return (
    <RangeWrapper>
      {label && <RangeLabel>{label}</RangeLabel>}
      <RangeInputs>
        <RangeInput
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={(e) => onMinChange(Math.min(Number(e.target.value), maxValue - 1))}
          aria-label="Minimum value"
        />
        <RangeInput
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={(e) => onMaxChange(Math.max(Number(e.target.value), minValue + 1))}
          aria-label="Maximum value"
        />
      </RangeInputs>
      <RangeValues>
        <RangeValue>{formatValue(minValue)}</RangeValue>
        <RangeValue>{formatValue(maxValue)}</RangeValue>
      </RangeValues>
    </RangeWrapper>
  )
}
