import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RangeSlider } from './index'

const meta: Meta<typeof RangeSlider> = {
  title: 'UI Kit/RangeSlider',
  component: RangeSlider,
}

export default meta
type Story = StoryObj<typeof RangeSlider>

function RangeSliderDemo() {
  const [minValue, setMinValue] = useState(50)
  const [maxValue, setMaxValue] = useState(200)

  return (
    <RangeSlider
      label="Price Range"
      min={0}
      max={500}
      minValue={minValue}
      maxValue={maxValue}
      onMinChange={setMinValue}
      onMaxChange={setMaxValue}
    />
  )
}

export const Default: Story = {
  render: () => <RangeSliderDemo />,
}
