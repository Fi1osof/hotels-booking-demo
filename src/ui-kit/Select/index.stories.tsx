import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './index'

const meta: Meta<typeof Select> = {
  title: 'UI Kit/Select',
  component: Select,
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    options: [
      { value: 'price-asc', label: 'Price: Low to High' },
      { value: 'price-desc', label: 'Price: High to Low' },
      { value: 'rating-desc', label: 'Rating: High to Low' },
      { value: 'name-asc', label: 'Name: A to Z' },
    ],
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Sort by',
    id: 'sort-select',
    options: [
      { value: 'price-asc', label: 'Price: Low to High' },
      { value: 'price-desc', label: 'Price: High to Low' },
      { value: 'rating-desc', label: 'Rating: High to Low' },
    ],
  },
}
