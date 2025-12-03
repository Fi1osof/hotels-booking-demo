import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Rating } from './index'

const meta: Meta<typeof Rating> = {
  title: 'UI Kit/Rating',
  component: Rating,
}

export default meta
type Story = StoryObj<typeof Rating>

export const Default: Story = {
  args: {
    value: 4.5,
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Hotel Rating',
    value: 4.5,
    showValue: true,
  },
}

const InteractiveDemo = () => {
  const [rating, setRating] = useState(3)

  return (
    <Rating
      label="Minimum Rating"
      value={rating}
      interactive
      onChange={setRating}
      showValue
    />
  )
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
}

export const AllRatings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Rating value={5} showValue />
      <Rating value={4} showValue />
      <Rating value={3} showValue />
      <Rating value={2} showValue />
      <Rating value={1} showValue />
    </div>
  ),
}
